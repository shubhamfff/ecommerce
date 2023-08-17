import React, { useState, useEffect } from "react";
import Carousal from "../components/Carousal";
import ProductCards from "../components/ProductCards";
import Loader from "../components/Loader";
import useCategory from "../hooks/useCategory";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryCircle from "../components/CategoryCircle";
import AdvertiseBanner from "../components/AdvertiseBanner";
import "./Home.css";

import { useSelector } from "react-redux";

const Home = () => {
  const categoriesList = useCategory();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstCatName, setFirstCatName] = useState("");
  const [secondCatName, setSecondCatName] = useState("");
  const [productListOne, setProductListOne] = useState([]);
  const [productListTwo, setProductListTwo] = useState([]);
  const [homepageMedia, setHomepageMedia] = useState([]);
  const [advertiseMedia, setAdvertiseMedia] = useState([]);

  const userData = useSelector((state) => state.user);

  useEffect(() => {
    getTotalProducts();
    getStrapiHomeContent();

    if (Object.keys(userData.user).length === 0) {
      console.log("not logged in user");
      localStorage.clear();
    } else {
      console.log("logged in user");
    }
    // setLoading(true);
  }, []);

  useEffect(() => {
    getProdByActiveCategory();
  }, [categoriesList]);

  useEffect(() => {
    if (
      Object.keys(homepageMedia).length !== 0 &&
      Object.keys(advertiseMedia).length !== 0 &&
      Object.keys(productListTwo).length !== 0
    ) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [homepageMedia, advertiseMedia, productListTwo]);

  const getStrapiHomeContent = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_STRAPI_API}/api/homepage-content?populate=*`
      );
      setHomepageMedia(data.data.attributes.Banners.data);
      setAdvertiseMedia(data.data.attributes.homepageAdvertise.data.attributes);
    } catch (error) {}
  };

  const getProdByActiveCategory = () => {
    let activeCat = [];
    try {
      console.log(categoriesList);
      categoriesList.map((cat) => {
        if (cat.onHomepage) activeCat.push(cat);
      });

      console.log(activeCat);
      getPrductsByCat1(activeCat[0]);
      getPrductsByCat2(activeCat[1]);
    } catch (error) {}
  };

  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getPrductsByCat1 = async (category) => {
    try {
      if (category) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/v1/product/product-category/${
            category.slug
          }`
        );
        setProductListOne(data?.products);
        setFirstCatName(category.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPrductsByCat2 = async (category) => {
    try {
      if (category) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/v1/product/product-category/${
            category.slug
          }`
        );
        setProductListTwo(data?.products);
        setSecondCatName(category.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {homepageMedia ? <Carousal media={homepageMedia} /> : ""}
          <div
            style={{
              background: "linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)",
              paddingBottom: 50,
              paddingTop: 20,
            }}
          >
            <CategoryCircle />
          </div>

          {productListOne ? (
            <>
              <div className="home-style">
                <div>
                  <ProductCards
                    prodArr={productListOne}
                    categoryName={firstCatName}
                    gridCount="3"
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {advertiseMedia ? <AdvertiseBanner media={advertiseMedia} /> : ""}
          {productListTwo ? (
            <ProductCards
              prodArr={productListTwo}
              categoryName={secondCatName}
              gridCount="3"
            />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default Home;
