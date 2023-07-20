import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeCart } from "../store/slices/CartSlice";
import { useSelector } from "react-redux";
import { Button, List, Card, Divider } from "antd";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const cartData = useSelector((state) => state.cart);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Meta } = Card;

  const data = cartData;

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  useEffect(() => {
    totalPrice();
    localStorage.setItem("cart", JSON.stringify(cartData));
    console.log(cartData);
  }, [cartData]);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cartData?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [];
      dispatch(removeCart(pid));
      // localStorage.setItem("cart", JSON.stringify(myCart));
      myCart = [...cartData];
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cartData,
        }
      );
      console.log("payment data", data);
      setLoading(false);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="container-fluid cart-page">
        <div className="row mt-5">
          <div class="d-flex justify-content-center">
            <div
              style={{
                width: "60%",
                marginTop: 16,
              }}
              className="text-center"
            >
              <h3 className="p-2 mb-1">
                {!auth?.user
                  ? "👋 Hello Guest"
                  : `👋 Hello  ${auth?.token && auth?.user?.name}`}
                <p className="text-center">
                  {cartData?.length
                    ? `You Have ${cartData?.length} items in your cart ${
                        auth?.token ? "" : "please login to checkout !"
                      }`
                    : " Your Cart Is Empty"}
                </p>
              </h3>
            </div>
          </div>
          <Divider />
        </div>
        <div className="container mt-5">
          <div className="row ">
            <div className="col-md-9  p-0 m-0">
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    key={item.name}
                    actions={[
                      <Button type="primary">View product</Button>,
                      <Button
                        type="primary"
                        danger
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove
                      </Button>,
                    ]}
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
                      description={`${item.description.substring(0, 300)}...`}
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
              <h5>Total : {totalPrice()} </h5>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h5>Current Address</h5>
                    <h5>{auth?.user?.address}</h5>

                    <Button
                      className="btn-warning mt-3"
                      type="primary"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </Button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <Button
                      className="btn-warning mt-3"
                      type="primary"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </Button>
                  ) : (
                    <Button
                      danger
                      className="mt-3"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </Button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                        googlePay: {},
                        applePay: {},
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <Button
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
