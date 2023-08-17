import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Image, Space, Breadcrumb, Avatar, Skeleton, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/slices/wishListSlice";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const WishlistItems = () => {
  const [wishListRes, setWislistRes] = useState();
  const wishlistData = useSelector((state) => state.wishlist);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Meta } = Card;

  let newArr = [];
  let wishArr = localStorage.getItem("wishlist");
  useEffect(() => {
    getAllWishlistItems();
  }, []);

  const getAllWishlistItems = () => {
    try {
      let endpoints = [];
      JSON.parse(wishArr).map((item) => {
        endpoints.push(
          `${import.meta.env.VITE_APP_API}/api/v1/product/get-product/${item}`
        );
      });
      axios
        .all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then((data) => interateWishlistArr(data));
      // console.log(endpoints);
    } catch (error) {}
  };

  const interateWishlistArr = (wishListArr) => {
    let newArray = [];
    wishListArr.map((item) => {
      newArray.push(item.data.product);
    });
    setWislistRes(newArray);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`);
  };

  const addToLocalWishlist = (product) => {
    try {
      let productArr = [];
      productArr.push(product);
      localStorage.setItem(
        "wishlist",
        JSON.stringify([...wishlistData, ...productArr])
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {wishListRes
          ? wishListRes.map((product) => {
              return (
                <>
                  <div className="col-3">
                    <Card
                      style={{
                        width: "100%",
                        marginTop: 20,
                      }}
                      title={product.name}
                      cover={
                        <img
                          alt="example"
                          className="card-img-style"
                          src={`${
                            import.meta.env.VITE_APP_API
                          }/api/v1/product/product-photo/${product._id}`}
                        />
                      }
                      actions={[
                        <div
                          className="font-color"
                          onClick={() => {
                            window.open(
                              `/product/${product.slug}`,
                              "_blank",
                              "rel=noopener noreferrer"
                            );
                          }}
                        >
                          View Product
                        </div>,
                        <div
                          className="font-color"
                          onClick={() => handleProductClick(product)}
                        >
                          Share
                        </div>,
                      ]}
                    >
                      <Meta
                        title={product.description}
                        description={`₹${product.price}`}
                      />
                    </Card>
                  </div>
                </>
              );
            })
          : "No items in wishlist"}
      </div>
    </div>
  );
};

export default WishlistItems;
