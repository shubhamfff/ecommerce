import { HeartOutlined } from "@ant-design/icons";
import { Popover, Card, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishListSlice";

import "./productCard.css";
import { useEffect } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const { Meta } = Card;

const ProductCards = ({ prodArr, categoryName, gridCount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const wishlistData = useSelector((state) => state.wishlist);

  const CustomToastWithLink = () => <div>Item Added in Wishlist</div>;

  // const content = (

  // );

  useEffect(() => {
    let wishListUpdated = [...wishlistData];
    localStorage.setItem("wishlist", JSON.stringify(wishListUpdated));
  }, [wishlistData]);

  useEffect(() => {
    if (Object.keys(data.user).length === 0) {
      console.log("not logged in user");
      localStorage.clear("wishlist");
    } else {
      console.log("logged in user");
    }
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`);
  };

  const handleWishlist = (product) => {
    try {
      if (data.user.user) {
        console.log(product);
        dispatch(addToWishlist(product.slug));
        addToLocalWishlist(product.slug);
        toast.success(CustomToastWithLink);
      } else {
        alert("please login");
      }
    } catch (error) {
      console.log(error);
    }
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

  const removeItemFromWishlist = (pid) => {
    try {
      let myCart = [];
      dispatch(removeFromWishlist(pid));
      // localStorage.setItem("cart", JSON.stringify(myCart));
      toast.warning("Item Removed to wislist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        {categoryName ? (
          <Divider orientation="left">{categoryName}</Divider>
        ) : (
          ""
        )}

        <div className="row">
          {prodArr.slice(0, 4).map((product) => {
            return (
              <>
                <div
                  className={`col-lg-${gridCount} col-sm-12 col-md-${gridCount} col-xs-12`}
                >
                  <Card
                    style={{
                      width: "100%",
                      margin: 20,
                    }}
                    title={product.name}
                    extra={
                      wishlistData.includes(product.slug) ? (
                        <span
                          onClick={() => {
                            removeItemFromWishlist(product.slug);
                          }}
                          style={{
                            fontSize: "150%",
                            color: "red",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="30"
                            fill="currentColor"
                            class="bi bi-heart-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                            />
                          </svg>
                        </span>
                      ) : (
                        <HeartOutlined
                          style={{ fontSize: "150%" }}
                          onClick={() => {
                            handleWishlist(product);
                          }}
                        />
                      )
                    }
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
                        onClick={() => handleProductClick(product)}
                      >
                        View Product
                      </div>,
                      <Popover
                        title="Share Product on"
                        content={
                          <div>
                            <p>
                              <FacebookShareButton
                                url={`${window.location.href}product/${product.slug}`}
                                style={{ marginRight: "5px" }}
                              >
                                <FacebookIcon round={true} size={40} />
                              </FacebookShareButton>
                              <WhatsappShareButton
                                url={`${window.location.href}product/${product.slug}`}
                                style={{ marginRight: "5px" }}
                              >
                                <WhatsappIcon round={true} size={40} />
                              </WhatsappShareButton>
                              <TwitterShareButton
                                url={`${window.location.href}product/${product.slug}`}
                                style={{ marginRight: "5px" }}
                              >
                                <TwitterIcon round={true} size={40} />
                              </TwitterShareButton>
                              <EmailShareButton
                                url={`${window.location.href}product/${product.slug}`}
                                style={{ marginRight: "5px" }}
                              >
                                <EmailIcon round={true} size={40} />
                              </EmailShareButton>
                            </p>
                          </div>
                        }
                      >
                        <div>Share Product</div>
                      </Popover>,
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
          })}
        </div>
      </div>
    </>
  );
};
export default ProductCards;
