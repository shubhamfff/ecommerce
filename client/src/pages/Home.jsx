import React, { useState, useEffect } from "react";
import Carousal from "../components/Carousal";
import ProductCards from "../components/ProductCards";
import useCategory from "../hooks/useCategory";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryCircle from "../components/CategoryCircle";
import AdvertiseBanner from "../components/AdvertiseBanner";
import { Space, Spin } from "antd";

const Home = () => {
  const categoriesList = useCategory();
  const navigate = useNavigate();
  // const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstCatName, setFirstCatName] = useState("");
  const [secondCatName, setSecondCatName] = useState("");
  const [productListOne, setProductListOne] = useState([]);
  const [productListTwo, setProductListTwo] = useState([]);
  const [homepageMedia, setHomepageMedia] = useState([]);
  const [advertiseMedia, setAdvertiseMedia] = useState([]);

  useEffect(() => {
    getTotalProducts();
    getStrapiHomeContent();
  }, []);

  useEffect(() => {
    getProdByActiveCategory();
  }, [categoriesList]);

  const getStrapiHomeContent = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_STRAPI_API}/api/homepage-content?populate=*`
      );
      setHomepageMedia(data.data.attributes.Banners.data);
      setAdvertiseMedia(data.data.attributes.homepageAdvertise.data.attributes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getProdByActiveCategory = () => {
    setLoading(true);
    let activeCat = [];
    try {
      console.log(categoriesList);
      categoriesList.map((cat) => {
        if (cat.onHomepage) activeCat.push(cat);
      });

      console.log(activeCat);
      getPrductsByCat1(activeCat[0]);
      getPrductsByCat2(activeCat[1]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getTotalProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-product`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getPrductsByCat1 = async (category) => {
    setLoading(true);
    try {
      if (category) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/v1/product/product-category/${
            category.slug
          }`
        );
        setProductListOne(data?.products);
        setFirstCatName(category.name);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getPrductsByCat2 = async (category) => {
    setLoading(true);
    try {
      if (category) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/v1/product/product-category/${
            category.slug
          }`
        );
        setProductListTwo(data?.products);
        setSecondCatName(category.name);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      ) : (
        <>
          {homepageMedia ? <Carousal media={homepageMedia} /> : ""}
          <CategoryCircle />
          {productListOne ? (
            <ProductCards
              prodArr={productListOne}
              categoryName={firstCatName}
            />
          ) : (
            ""
          )}
          {advertiseMedia ? <AdvertiseBanner media={advertiseMedia} /> : ""}
          {productListTwo ? (
            <ProductCards
              prodArr={productListTwo}
              categoryName={secondCatName}
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
