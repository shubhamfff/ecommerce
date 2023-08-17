import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ProductCards from "../components/ProductCards";
import AllProductCards from "../components/AllProducts";
import Loader from "../components/Loader";

const contentStyle = {
  height: "70vh",
  color: "#fff",
  lineHeight: "70vh",
  textAlign: "center",
  background: "#364d79",
};

const AllProducts = () => {
  const navigate = useNavigate();
  // const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  useEffect(() => {
    setLoading(true);
    if (Object.keys(products).length !== 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [products]);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-list/${page}`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //load more
  const loadMore = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-list/${page}`
      );
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    } catch (error) {}
  };

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* banner image */}
      <div className="container-fluid row mt-5 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="col-md-9 ">
            <h3 className="text-center">All Products</h3>
            <h5 className="text-center">{total} Products found</h5>
            <div className="d-flex flex-wrap">
              <AllProductCards prodArr={products} gridCount="4" />
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : <>Loadmore</>}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
