import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Image,
  Space,
  Breadcrumb,
  Button,
  Input,
  Rate,
  Form,
} from "antd";
import ProductCards from "../components/ProductCards";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/CartSlice";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/Loader";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFingerprint,
  faHeartCircleCheck,
  faListCheck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

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
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState();
  const [successPincode, setSuccessPincode] = useState("");
  const [photo, setPhoto] = useState();
  const [photo1, setPhoto1] = useState();
  const [photo2, setPhoto2] = useState();

  const [activeTabKey2, setActiveTabKey2] = useState("Specifications");

  const [pincodeArray, setPincodeArray] = useState([]);

  const CustomToastWithLink = () => (
    <div>
      Item Added in <a href="/cart">Cart</a>
    </div>
  );

  //initalp details
  useEffect(() => {
    window.scrollTo(0, 0);
    if (params?.slug) {
      getProduct();
      pincodeArrayFn();
      setSuccessPincode("");
    }
  }, [params?.slug]);

  useEffect(() => {
    if (Object.keys(product) !== 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [product]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-product/${
          params.slug
        }`
      );
      setPhoto(
        btoa(
          new Uint8Array(data?.product?.photo1?.data?.data).reduce(function (
            data,
            byte
          ) {
            return data + String.fromCharCode(byte);
          },
          "")
        )
      );
      setPhoto1(
        btoa(
          new Uint8Array(data?.product?.photo2?.data?.data).reduce(function (
            data,
            byte
          ) {
            return data + String.fromCharCode(byte);
          },
          "")
        )
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

  const onFinish = (e) => {
    console.log(pincodeArray, e.pincode);
    if (pincodeArray.includes(e.pincode)) {
      setSuccessPincode("success");
    } else {
      setSuccessPincode("error");
    }
  };

  const onFinishFailed = () => {
    console.log("Please enter valid pincode");
  };

  // const ratingChange = (e) => {
  //   console.log(e);
  // };

  const pincodeArrayFn = async () => {
    try {
      let pincodeArr = [];
      const { data } = await axios.get(
        `${import.meta.env.VITE_STRAPI_API}/api/pincodes`
      );

      if (data.data) {
        data.data.map((pincode) => {
          pincodeArr.push(pincode.attributes.pincode);
        });

        setPincodeArray(pincodeArr);
      }
    } catch (error) {}
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <ToastContainer />
          {product ? (
            <div className="row product-details mt-5">
              <div className="col-md-6 mt-5">
                <div>
                  Share Product On
                  <p>
                    <FacebookShareButton
                      url={`${window.location.href}`}
                      style={{ marginRight: "5px" }}
                    >
                      <FacebookIcon round={true} size={30} />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      url={`${window.location.href}`}
                      style={{ marginRight: "5px" }}
                    >
                      <WhatsappIcon round={true} size={30} />
                    </WhatsappShareButton>
                    <TwitterShareButton
                      url={`${window.location.href}`}
                      style={{ marginRight: "5px" }}
                    >
                      <TwitterIcon round={true} size={30} />
                    </TwitterShareButton>
                    <EmailShareButton
                      url={`${window.location.href}`}
                      style={{ marginRight: "5px" }}
                    >
                      <EmailIcon round={true} size={30} />
                    </EmailShareButton>
                    <LinkedinShareButton
                      url={`${window.location.href}`}
                      style={{ marginRight: "5px" }}
                    >
                      <LinkedinIcon round={true} size={30} />
                    </LinkedinShareButton>

                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.href}`
                        );
                        toast.success("URL copied");
                      }}
                    >
                      Copy Link
                    </Button>
                  </p>
                </div>
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
                <Space size={11}>
                  <Image
                    width={300}
                    src={`data:image/png;base64,${photo}`}
                    placeholder={
                      <Image
                        preview={false}
                        src={`data:image/png;base64,${photo}`}
                        width={300}
                      />
                    }
                  />
                  <Image
                    width={300}
                    src={`data:image/png;base64,${photo1}`}
                    placeholder={
                      <Image
                        preview={false}
                        src={`data:image/png;base64,${photo1}`}
                        width={300}
                      />
                    }
                  />
                </Space>
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
                {/* 
                <Rate allowHalf onChange={(e) => ratingChange(e)} /> */}

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
                          avatar={<FontAwesomeIcon icon={faTruckFast} />}
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
                          avatar={<FontAwesomeIcon icon={faHeartCircleCheck} />}
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
                          avatar={<FontAwesomeIcon icon={faFingerprint} />}
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
                          avatar={<FontAwesomeIcon icon={faListCheck} />}
                          title="Quality assuered"
                        />
                      </Card>
                    </div>
                  </div>
                </div>

                <div class="container">
                  <div class="row mt-5">
                    <div class="col-sm-12 col-lg-6 col-md-6 col-xs-12 col-xl-6">
                      <Form
                        name="basic"
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Space direction="horizontal">
                          <Form.Item
                            name="pincode"
                            hasFeedback
                            validateStatus={`${successPincode}`}
                            rules={[
                              {
                                required: true,
                                message: "Please enter valid pincode",
                                pattern: "^[1-9][0-9]{5}$",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Pincde to check"
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item
                            wrapperCol={{
                              offset: 2,
                              span: 1,
                            }}
                          >
                            <Button size="large" htmlType="submit">
                              Check
                            </Button>
                          </Form.Item>
                        </Space>

                        {successPincode !== ""
                          ? successPincode == "success"
                            ? "Available for Delivery 😍"
                            : "Not Deliverable 😣"
                          : ""}
                      </Form>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6 col-xs-12 col-xl-6">
                      <Button
                        type="primary"
                        style={{ width: "100%", marginRight: "2%" }}
                        size="large"
                        onClick={() => {
                          dispatch(addToCart(product));
                          addToLocalCart(product);
                          toast.success(CustomToastWithLink);
                        }}
                      >
                        Add to Cart
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
                gridCount="3"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
