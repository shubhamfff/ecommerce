import React, { useEffect, useState } from "react";
import useCategory from "../hooks/useCategory";
import useCategoryImg from "../hooks/useCategoryImg";
import { Avatar, Card, Col, Divider, Row } from "antd";
import { useNavigate } from "react-router-dom";
import "./categoryCircle.css";
import axios from "axios";

const CategoryCircle = () => {
  const categories = useCategory();
  const navigate = useNavigate();
  const categoryImg = useCategoryImg();
  const [strapiCategoryImg, setCategoryImg] = useState();
  const [catImgArr, setCatImgArr] = useState();

  useEffect(() => {
    getContentImages();
  }, []);

  useEffect(() => {
    setCatImgArr(categoryImg);
  }, [categoryImg]);

  const getContentImages = async () => {
    try {
      console.log("first");
      let endpoints = [];
      categories.map((category) => {
        endpoints.push(
          `${import.meta.env.VITE_STRAPI_API}/api/categories/${
            category.slug
          }?populate=*`
        );
      });
      if (endpoints) {
        console.log(endpoints);
        axios
          .all(endpoints.map((endpoint) => axios.get(endpoint)))
          .then((data) => setCategoryImg(data));
      }
    } catch (error) {}
  };

  return (
    <div className="container">
      <Divider orientation="left">Categories</Divider>
      <div className="row align-items-center">
        {categories
          ? categories.slice(0, 5).map((cat) => {
              return (
                <div key={cat._id} className="col-2">
                  <div
                    className="card card-style"
                    onClick={() => navigate(`/category/${cat.slug}`)}
                  >
                    {catImgArr &&
                      catImgArr.data.map((img) => {
                        if (cat.slug === img.attributes.slug)
                          return (
                            <img
                              style={{ width: "100%" }}
                              src={`${import.meta.env.VITE_STRAPI_API}${
                                img.attributes.categoryPhoto.data.attributes.url
                              }`}
                            />
                          );
                      })}
                    {/* <div className="card-body text-center">
                      <span>{cat.name}</span>
                    </div> */}
                  </div>
                </div>
              );
            })
          : "Loading"}
        <div className="col-2">
          <div
            className="card  card-style"
            onClick={() => navigate(`/categories`)}
          >
            {catImgArr &&
              catImgArr.data.map((img) => {
                if (img.attributes.slug === "all-collection")
                  return (
                    <img
                      style={{ width: "100%" }}
                      src={`${import.meta.env.VITE_STRAPI_API}${
                        img.attributes.categoryPhoto.data.attributes.url
                      }`}
                    />
                  );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCircle;
