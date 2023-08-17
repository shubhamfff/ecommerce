import React, { useState } from "react";
import {
  CreditCardOutlined,
  SmileOutlined,
  SolutionOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Steps, Card, Button, Divider, Form, Input, List } from "antd";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import CartPage from "./CartPage";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const userData = useSelector((state) => state.user.user.user);
  const [mediaAddressImage, setImage] = useState();
  const [mediaPaymentImage, setPaymentImage] = useState();
  const [alternateAddr, setAlternateAddr] = useState();
  const [current, setCurrent] = useState(0);
  const [editAddress, setEditAddress] = useState(false);
  const [pincodeArray, setPincodeArray] = useState([]);
  const [pincodeError, setPincodeError] = useState();
  const [paymentRes, setPaymentRes] = useState();

  const { Step } = Steps;

  useEffect(() => {
    getAddressMedia();
    getPaymentMedia();
    pincodeArrayFn();
  }, []);

  const onFinish = (e) => {
    try {
      console.log("first", e);
      if (pincodeArray.includes(e.pincode)) {
        localStorage.setItem("alternateAddress", JSON.stringify(e));
        setAlternateAddr(e);
        setEditAddress(false);
        setPincodeError(false);
      } else {
        setPincodeError(true);
      }
    } catch (error) {}
  };

  const onFinishFailed = () => {
    console.log("first");
  };

  const getAddressMedia = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_STRAPI_API}/api/address-info?populate=*`
      );
      console.log(data.data.attributes.image.data.attributes.url);
      setImage(data.data.attributes.image.data.attributes.url);
    } catch (error) {}
  };

  const getPaymentMedia = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_STRAPI_API}/api/payment-info?populate=*`
      );
      console.log(data.data.attributes.image.data.attributes.url);
      setPaymentImage(data.data.attributes.image.data.attributes.url);
    } catch (error) {}
  };

  const handleEditAddress = (flag) => {
    setEditAddress(flag);
  };

  const proceedForPayment = (flag) => {
    setCurrent(1);
  };

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

  const stepperArr = [
    {
      id: 1,
      title: "delivery Information",
      icon: <SolutionOutlined />,
      disabled: current == 2 ? true : false,
    },
    {
      id: 2,
      title: "Payment",
      icon: <CreditCardOutlined />,
      disabled: current == 2 ? true : false,
    },
    {
      id: 3,
      title: "Order Summary",
      icon: <SmileOutlined />,
      disabled: true,
    },
  ];

  const onPaymentResponseFn = (res) => {
    console.log("payment response from payment page", res);
    setPaymentRes(res);
  };

  const changeAddrFn = (value) => {
    setCurrent(value);
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row mt-5">
          <Steps
            size="small"
            current={current}
            disabled={current}
            onChange={(c) => setCurrent(c)}
            labelPlacement="horizontal"
            className="mt-5"
          >
            {stepperArr.map((item) => (
              <Step
                key={item.id}
                title={`${item.title}`}
                disabled={item.disabled}
                style={{ backgroundColorcolor: item.disabled ? "red" : "blue" }}
                // icon={item.icon}
              />
            ))}
          </Steps>
        </div>
        <div className="container mt-5">
          {current == 0 ? (
            <div className="row">
              <div className="col-lg-6">
                <Card style={{ width: "90%", minHeight: "60%" }}>
                  <div class="d-flex">
                    <h3 className="">
                      {!userData
                        ? "👋 Hello Guest"
                        : `👋 Hello  ${userData?.name}`}
                    </h3>
                  </div>
                  <Divider />
                  <h6>
                    Make sure details which is filled is proper and ensures
                    smooth delivery.
                  </h6>
                  <Divider />
                  {editAddress ? (
                    <div>
                      <Form
                        layout="vertical"
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Form.Item
                          label="name"
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter valid name",
                              pattern: "^[a-zA-Z]+$",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please Enter valid email",
                              pattern: "^[a-z0-9]+@[a-z]+.[a-z]{2,3}$",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Phone Number"
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: "Please enter valid phone number",
                              pattern: "^[1-9][0-9]{9}$",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Adrees"
                          name="address"
                          rules={[
                            {
                              required: true,
                              message: "Please enter address atlease 25 chars",
                            },
                          ]}
                        >
                          <Input minLength={25} />
                        </Form.Item>
                        <Form.Item
                          label="Pincode"
                          name="pincode"
                          rules={[
                            {
                              required: true,
                              message: "Please enter valid pincode",
                              pattern: "^[1-9][0-9]{5}$",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        {pincodeError ? (
                          <p className="text-danger">
                            Order is not Deliverable to this pincode😣
                          </p>
                        ) : (
                          ""
                        )}
                        <Form.Item>
                          <Button htmlType="submit" type="primary">
                            Submit
                          </Button>{" "}
                          <Button
                            type="link"
                            icon={<FontAwesomeIcon icon={faXmark} />}
                            onClick={() => {
                              handleEditAddress(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  ) : (
                    <div>
                      {alternateAddr ? (
                        <>
                          <p>Name: {alternateAddr.name}</p>
                          <p>email: {alternateAddr.email}</p>
                          <p>Phone: {alternateAddr.phone}</p>
                          <p>Address: {alternateAddr.address}</p>
                          <p>Address: {alternateAddr.pincode}</p>
                        </>
                      ) : (
                        <>
                          <p>Name: {userData.name}</p>
                          <p>email: {userData.email}</p>
                          <p>Phone: {userData.phone}</p>
                          <p>Address: {userData.address}</p>
                        </>
                      )}

                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => {
                          handleEditAddress(true);
                        }}
                      >
                        Change Address
                      </Button>
                      {alternateAddr ? (
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            setAlternateAddr(null);
                          }}
                        >
                          delete
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </Card>
                <Button
                  className="mt-4"
                  type="primary"
                  onClick={() => proceedForPayment()}
                >
                  Proceed for payment
                </Button>
              </div>
              <div className="col-lg-6">
                <img
                  src={`${import.meta.env.VITE_STRAPI_API}${mediaAddressImage}`}
                  style={{ width: "90%" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {current == 1 ? (
            <div className="row">
              <CartPage
                fromPaymentPage={true}
                changeAddrFn={changeAddrFn}
                onPaymentResponseFn={onPaymentResponseFn}
                userAddress={alternateAddr ? alternateAddr : userData}
              />
            </div>
          ) : (
            ""
          )}
          {current == 2 ? (
            <div className="pb-5 pb-5">
              <h3>Order Summary</h3>
              <Divider />
              <div className="container mt-5">
                <div className="row ">
                  <div className="col-md-9 p-0 m-0">
                    <List
                      itemLayout="vertical"
                      size="large"
                      pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 3,
                      }}
                      dataSource={paymentRes.cartData}
                      renderItem={(item) => (
                        <List.Item
                          key={item.name}
                          extra={
                            <img
                              width={272}
                              alt="logo"
                              src={`${
                                import.meta.env.VITE_APP_API
                              }/api/v1/product/product-photo/${item._id}`}
                            />
                          }
                        >
                          <List.Item.Meta
                            title={
                              <Link
                                to={`/product/${item.slug}`}
                                style={{ textDecoration: "none" }}
                              >
                                {item.name}
                              </Link>
                            }
                            description={`${item.description.substring(
                              0,
                              300
                            )}...`}
                          />
                          {item?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </List.Item>
                      )}
                    />
                  </div>
                  <div className="col-md-3 cart-summary ">
                    <h4>Cart Summary</h4>
                    <hr />
                    <h5>Total : 500 </h5>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default Checkout;
