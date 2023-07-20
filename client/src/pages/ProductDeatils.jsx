import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Image, Space, Breadcrumb, Avatar, Skeleton, Button } from "antd";
import ProductCards from "../components/ProductCards";
import { DownloadOutlined, HeartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/CartSlice";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const tabList = [
  {
    key: "tab1",
    tab: "tab1",
  },
  {
    key: "tab2",
    tab: "tab2",
  },
];
const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};
const tabListNoTitle = [
  {
    key: "specification",
    label: "Specification",
  },
  {
    key: "writeUs",
    label: "Write Us",
  },
];
const contentListNoTitle = {
  specification: (
    <p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae nsequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
        nesciunt ipsum debitis quas aliquid. eprehenderit, quia. Quo neque error
        repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi
        at sunt xcepturi expedita sint? Sed quibusdam recusandae alias error
        harum maxime adipisci amet laborum. Perspiciatis minima nesciunt
        dolorem! Officiis iure rerum voluptates a cumque velit
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae nsequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
        nesciunt ipsum debitis quas aliquid. eprehenderit, quia. Quo neque error
        repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi
        at sunt xcepturi expedita sint? Sed quibusdam recusandae alias error
        harum maxime adipisci amet laborum. Perspiciatis minima nesciunt
        dolorem! Officiis iure rerum voluptates a cumque velit
      </p>
    </p>
  ),

  writeUs: <p>Write Us</p>,
};

const ProductDetails = () => {
  const params = useParams();
  const { Meta } = Card;
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [activeTabKey2, setActiveTabKey2] = useState("Specifications");

  //initalp details
  useEffect(() => {
    window.scrollTo(0, 0);
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-product/${
          params.slug
        }`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToLocalCart = (product) => {
    let productArr = [];
    productArr.push(product);
    localStorage.setItem("cart", JSON.stringify([...cartData, ...productArr]));
    console.log(product);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <div className="container">
      <ToastContainer />
      {product ? (
        <div className="row product-details mt-5">
          <div className="col-md-6 mt-5">
            <Space size={12}>
              <Image
                width={600}
                src={`${
                  import.meta.env.VITE_APP_API
                }/api/v1/product/product-photo/${product._id}`}
                placeholder={
                  <Image
                    preview={false}
                    src={`${
                      import.meta.env.VITE_APP_API
                    }/api/v1/product/product-photo/${product._id}`}
                    width={200}
                  />
                }
              />
            </Space>

            <div className="d-inline-flex">
              <Space size={12}>
                <Image
                  width={150}
                  src={`${
                    import.meta.env.VITE_APP_API
                  }/api/v1/product/product-photo/${product._id}`}
                  placeholder={
                    <Image
                      preview={false}
                      src={`${
                        import.meta.env.VITE_APP_API
                      }/api/v1/product/product-photo/${product._id}`}
                      width={200}
                    />
                  }
                />
              </Space>
              <Space size={12}>
                <Image
                  width={150}
                  src={`${
                    import.meta.env.VITE_APP_API
                  }/api/v1/product/product-photo/${product._id}`}
                  placeholder={
                    <Image
                      preview={false}
                      src={`${
                        import.meta.env.VITE_APP_API
                      }/api/v1/product/product-photo/${product._id}`}
                      width={200}
                    />
                  }
                />
              </Space>
              <Space size={12}>
                <Image
                  width={150}
                  src={`${
                    import.meta.env.VITE_APP_API
                  }/api/v1/product/product-photo/${product._id}`}
                  placeholder={
                    <Image
                      preview={false}
                      src={`${
                        import.meta.env.VITE_APP_API
                      }/api/v1/product/product-photo/${product._id}`}
                      width={200}
                    />
                  }
                />
              </Space>
            </div>
          </div>
          <div className="col-md-6 product-details-info mt-5">
            <Breadcrumb
              items={[
                {
                  title: <a href="/">Home</a>,
                },
                {
                  title: (
                    <a
                      target="_blank"
                      href={`/category/${product?.category?.slug}`}
                    >
                      {product?.category?.name}
                    </a>
                  ),
                },
                {
                  title: `${product?.name}`,
                },
              ]}
            />
            <hr />
            <h2 className="mb-2">{product?.name}</h2>
            <h6 className="mt-4">Description:</h6>
            <p>{product?.description}</p>
            <h6>
              Price:{" "}
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </h6>

            <div class="container">
              <div class="row">
                <div class="col-sm-12 col-lg-6 col-md-6 col-xs-12 col-xl-6">
                  <Card
                    style={{
                      width: 300,
                      marginTop: 16,
                      backgroundColor: "#eee",
                    }}
                    loading={false}
                  >
                    <Meta
                      avatar={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-truck"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      }
                      title="Free Shipping"
                    />
                  </Card>
                </div>
                <div class="col-sm-12 col-lg-6 col-md-6 col-xs-12 col-xl-6">
                  <Card
                    style={{
                      width: 300,
                      marginTop: 16,
                      backgroundColor: "#eee",
                    }}
                    loading={false}
                  >
                    <Meta
                      avatar={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-envelope-paper-heart-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="m3 7.5 3.5 2L8 8.75l1.5.75 3.5-2v-6A1.5 1.5 0 0 0 11.5 0h-7A1.5 1.5 0 0 0 3 1.5v6ZM2 3.133l-.941.502A2 2 0 0 0 0 5.4v.313l2 1.173V3.133Zm12 3.753 2-1.173V5.4a2 2 0 0 0-1.059-1.765L14 3.133v3.753Zm-3.693 3.324L16 6.873v6.5l-5.693-3.163Zm5.634 4.274L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516ZM5.693 10.21 0 13.372v-6.5l5.693 3.338ZM8 1.982C9.664.309 13.825 3.236 8 7 2.175 3.236 6.336.31 8 1.982Z"
                          />
                        </svg>
                      }
                      title="Made in India"
                    />
                  </Card>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row ml-0">
                <div class="col-sm-12 col-lg-6 col-md-6 col-xs-12 col-xl-6">
                  <Card
                    style={{
                      width: 300,
                      marginTop: 16,
                      backgroundColor: "#eee",
                    }}
                    loading={false}
                  >
                    <Meta
                      avatar={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-piggy-bank"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z" />
                          <path
                            fill-rule="evenodd"
                            d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"
                          />
                        </svg>
                      }
                      title="Secure transactions"
                    />
                  </Card>
                </div>
                <div class="col-sm-12 col-lg-6 col-md-6 col-xs-12 col-xl-6">
                  <Card
                    style={{
                      width: 300,
                      marginTop: 16,
                      backgroundColor: "#eee",
                    }}
                    loading={false}
                  >
                    <Meta
                      avatar={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-check2-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                          <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                        </svg>
                      }
                      title="Quality assuered"
                    />
                  </Card>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row mt-5">
                <div class="col-sm-12 col-lg-6 col-md-6 col-xs-12 col-xl-6">
                  <Button
                    type="primary"
                    style={{ width: "100%", marginRight: "2%" }}
                    size="large"
                    onClick={() => {
                      dispatch(addToCart(product));
                      addToLocalCart(product);
                      toast.success("Item Added to cart");
                    }}
                  >
                    Add to Cart{" "}
                  </Button>
                </div>
                <div class="col-sm-12 col-lg-6 col-md-6 col-xs-12 col-xl-6">
                  <Button
                    type="primary"
                    danger
                    style={{ width: "100%" }}
                    size="large"
                  >
                    Add Favorite{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Card
            className="mt-5"
            style={{
              width: "100%",
            }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey2}
            onTabChange={onTab2Change}
          >
            {contentListNoTitle[activeTabKey2]}
          </Card>
        </div>
      ) : (
        "Loading"
      )}

      <div className="row container similar-products">
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          <ProductCards
            prodArr={relatedProducts}
            categoryName="Similar Products ➡️"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
