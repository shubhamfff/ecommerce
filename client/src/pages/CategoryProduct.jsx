import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AllProductCards from "../components/AllProducts";
import axios from "axios";
import Loader from "../components/Loader";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-category/${
          params.slug
        }`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(products).length !== 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [products]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-5 category">
          <h4 className="text-center">Category - {category?.name}</h4>
          <h6 className="text-center">{products?.length} result found </h6>
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex flex-wrap">
                <AllProductCards prodArr={products} gridCount="3" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryProduct;
