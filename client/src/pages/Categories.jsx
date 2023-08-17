import React, { useState, useEffect } from "react";
import useCategory from "../hooks/useCategory";
import useCategoryImg from "../hooks/useCategoryImg";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./categories.css";

const Categories = () => {
  const navigate = useNavigate();
  const categories = useCategory();
  const categoryImg = useCategoryImg();
  const [loading, setLoading] = useState(false);
  const [catImgArr, setCatImgArr] = useState();

  useEffect(() => {
    setCatImgArr(categoryImg);
  }, [categoryImg]);

  return (
    <>
      {loading ? (
        "true"
      ) : (
        <div
          style={{
            background: "linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)",
          }}
        >
          <div className="container" style={{ paddingTop: "100px" }}>
            <div className="row">
              {categories.map((c) => (
                <div key={c._id} className="col-3">
                  <div
                    className="card card-style margin-bottom"
                    // onClick={() => navigate(`/category/${c.slug}`)}
                  >
                    <div className="card-body text-center">
                      {catImgArr &&
                        catImgArr.data.map((img) => {
                          if (c.slug === img.attributes.slug)
                            return (
                              <img
                                style={{ width: "100%" }}
                                src={`${import.meta.env.VITE_STRAPI_API}${
                                  img.attributes.categoryPhoto.data.attributes
                                    .url
                                }`}
                              />
                            );
                        })}
                      {/* <h5>{c.name}</h5> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
