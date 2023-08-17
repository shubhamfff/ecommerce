import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeCart } from "../store/slices/CartSlice";
import { useSelector } from "react-redux";
import { Button, List, Card, Divider, Modal } from "antd";
import suceess from "../assets/animations/ezgif-1-9dfdc03355.gif";

const CartPage = ({
  fromPaymentPage,
  changeAddrFn,
  onPaymentResponseFn,
  userAddress,
}) => {
  const [auth, setAuth] = useAuth();
  const cartData = useSelector((state) => state.cart);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentPage, setPaymentPage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Meta } = Card;

  const data = cartData;

  useEffect(() => {
    if (fromPaymentPage) setPaymentPage(true);
  }, []);

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
      return total;
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
      localStorage.setItem("cart", JSON.stringify(myCart));
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
      // const { data } = await axios.post(
      //   `${import.meta.env.VITE_APP_API}/api/v1/product/braintree/payment`,
      //   {
      //     nonce,
      //     cartData,
      //   }
      // );
      const data = {
        success: true,
        result: {
          transaction: {
            id: "bp08hdsx",
            status: "submitted_for_settlement",
            type: "sale",
            currencyIsoCode: "INR",
            amount: "500.00",
            amountRequested: "500.00",
            merchantAccountId: "artistry",
            subMerchantAccountId: null,
            masterMerchantAccountId: null,
            orderId: null,
            createdAt: "2023-08-04T11:14:26Z",
            updatedAt: "2023-08-04T11:14:26Z",
            customer: {
              id: null,
              firstName: null,
              lastName: null,
              company: null,
              email: null,
              website: null,
              phone: null,
              fax: null,
            },
            billing: {
              id: null,
              firstName: null,
              lastName: null,
              company: null,
              streetAddress: null,
              extendedAddress: null,
              locality: null,
              region: null,
              postalCode: null,
              countryName: null,
              countryCodeAlpha2: null,
              countryCodeAlpha3: null,
              countryCodeNumeric: null,
            },
            refundId: null,
            refundIds: [],
            refundedTransactionId: null,
            partialSettlementTransactionIds: [],
            authorizedTransactionId: null,
            settlementBatchId: null,
            shipping: {
              id: null,
              firstName: null,
              lastName: null,
              company: null,
              streetAddress: null,
              extendedAddress: null,
              locality: null,
              region: null,
              postalCode: null,
              countryName: null,
              countryCodeAlpha2: null,
              countryCodeAlpha3: null,
              countryCodeNumeric: null,
            },
            customFields: "",
            accountFundingTransaction: false,
            avsErrorResponseCode: null,
            avsPostalCodeResponseCode: "I",
            avsStreetAddressResponseCode: "I",
            cvvResponseCode: "M",
            gatewayRejectionReason: null,
            processorAuthorizationCode: "FSX76Q",
            processorResponseCode: "1000",
            processorResponseText: "Approved",
            additionalProcessorResponse: null,
            voiceReferralNumber: null,
            purchaseOrderNumber: null,
            taxAmount: null,
            taxExempt: false,
            scaExemptionRequested: null,
            processedWithNetworkToken: false,
            creditCard: {
              token: null,
              bin: "411111",
              last4: "1111",
              cardType: "Visa",
              expirationMonth: "03",
              expirationYear: "2026",
              customerLocation: "US",
              cardholderName: null,
              imageUrl:
                "https://assets.braintreegateway.com/payment_method_logo/visa.png?environment=sandbox",
              isNetworkTokenized: false,
              prepaid: "Unknown",
              healthcare: "Unknown",
              debit: "Unknown",
              durbinRegulated: "Unknown",
              commercial: "Unknown",
              payroll: "Unknown",
              issuingBank: "Unknown",
              countryOfIssuance: "Unknown",
              productId: "Unknown",
              globalId: null,
              graphQLId: null,
              accountType: "credit",
              uniqueNumberIdentifier: null,
              venmoSdk: false,
              accountBalance: null,
              maskedNumber: "411111******1111",
              expirationDate: "03/2026",
            },
            statusHistory: [
              {
                timestamp: "2023-08-04T11:14:26Z",
                status: "authorized",
                amount: "500.00",
                user: "shubham_shetyanavar",
                transactionSource: "api",
              },
              {
                timestamp: "2023-08-04T11:14:26Z",
                status: "submitted_for_settlement",
                amount: "500.00",
                user: "shubham_shetyanavar",
                transactionSource: "api",
              },
            ],
            planId: null,
            subscriptionId: null,
            subscription: {
              billingPeriodEndDate: null,
              billingPeriodStartDate: null,
            },
            addOns: [],
            discounts: [],
            descriptor: {
              name: null,
              phone: null,
              url: null,
            },
            recurring: false,
            channel: null,
            serviceFeeAmount: null,
            escrowStatus: null,
            disbursementDetails: {
              disbursementDate: null,
              settlementAmount: null,
              settlementCurrencyIsoCode: null,
              settlementCurrencyExchangeRate: null,
              settlementBaseCurrencyExchangeRate: null,
              fundsHeld: null,
              success: null,
            },
            disputes: [],
            achReturnResponses: [],
            authorizationAdjustments: [],
            paymentInstrumentType: "credit_card",
            processorSettlementResponseCode: "",
            processorSettlementResponseText: "",
            networkResponseCode: "XX",
            networkResponseText: "sample network response text",
            merchantAdviceCode: null,
            merchantAdviceCodeText: null,
            threeDSecureInfo: null,
            shipsFromPostalCode: null,
            shippingAmount: null,
            discountAmount: null,
            networkTransactionId: "020230804111426",
            processorResponseType: "approved",
            authorizationExpiresAt: "2023-08-11T11:14:26Z",
            retryIds: [],
            retriedTransactionId: null,
            refundGlobalIds: [],
            partialSettlementTransactionGlobalIds: [],
            refundedTransactionGlobalId: null,
            authorizedTransactionGlobalId: null,
            globalId: "dHJhbnNhY3Rpb25fYnAwOGhkc3g",
            graphQLId: "dHJhbnNhY3Rpb25fYnAwOGhkc3g",
            retryGlobalIds: [],
            retriedTransactionGlobalId: null,
            retrievalReferenceNumber: "1234567",
            achReturnCode: null,
            installmentCount: null,
            installments: [],
            refundedInstallments: [],
            responseEmvData: null,
            acquirerReferenceNumber: null,
            merchantIdentificationNumber: "123456789012",
            terminalIdentificationNumber: "00000001",
            merchantName: "DESCRIPTORNAME",
            merchantAddress: {
              streetAddress: "",
              locality: "Braintree",
              region: "MA",
              postalCode: "02184",
              phone: "5555555555",
            },
            pinVerified: false,
            debitNetwork: null,
            processingMode: null,
            paymentReceipt: {
              id: "bp08hdsx",
              globalId: "dHJhbnNhY3Rpb25fYnAwOGhkc3g",
              amount: "500.00",
              currencyIsoCode: "INR",
              processorResponseCode: "1000",
              processorResponseText: "Approved",
              processorAuthorizationCode: "FSX76Q",
              merchantName: "DESCRIPTORNAME",
              merchantAddress: {
                streetAddress: "",
                locality: "Braintree",
                region: "MA",
                postalCode: "02184",
                phone: "5555555555",
              },
              merchantIdentificationNumber: "123456789012",
              terminalIdentificationNumber: "00000001",
              type: "sale",
              pinVerified: false,
              processingMode: null,
              networkIdentificationCode: null,
              cardType: "Visa",
              cardLast4: "1111",
              accountBalance: null,
            },
            paypalAccount: {},
            paypalHereDetails: {},
            localPayment: {},
            applePayCard: {},
            androidPayCard: {},
            visaCheckoutCard: {},
            samsungPayCard: {},
          },
          success: true,
        },
        cartData: [
          {
            _id: "64ad6c8df1c127403cd70000",
            name: "Handmade Basket",
            slug: "Handmade-Basket",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis  minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit  quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur  fugiat, temporibus enim commodi iusto libero magni deleniti quod quam  consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad  earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo  fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore  suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam  totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam  quasi aliquam eligendi, placeat qui corporis!",
            price: 500,
            category: {
              _id: "64ad6908f1c127403cd6ffd6",
              name: "Trendy Collection",
              slug: "trendy-collection",
              onHomepage: true,
              __v: 0,
            },
            quantity: 20,
            createdAt: "2023-07-11T14:51:57.811Z",
            updatedAt: "2023-07-11T14:51:57.811Z",
            __v: 0,
          },
        ],
      };
      if (data.result.success) {
        setLoading(false);
        // localStorage.removeItem("cart");
        toast.success("Payment Completed Successfully ");
        onPaymentResponseFn(data);
        showModal();
      } else {
        toast.warning("something went wrong!");
      }
    } catch (error) {
      toast.warning(
        error.message == "No payment method is available."
          ? error.message + " Please select payment method to proceed"
          : error.message
      );
      console.log(error.message);
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    changeAddrFn(2);
    window.scroll(0, 0);
  };

  return (
    <>
      <ToastContainer />
      <Modal
        open={isModalOpen}
        closable={false}
        maskClosable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        onOk={() => handleOk()}
      >
        <div className="text-center" style={{ backgroundColor: "#fefcfe" }}>
          <h4>Order Placed Successfully 🤝</h4>
          <div>
            <img src={suceess} style={{ width: "100%" }} />
          </div>
        </div>
      </Modal>

      <div className="container-fluid cart-page">
        {!paymentPage ? (
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
        ) : (
          ""
        )}

        <div className="container mt-5">
          <div className="row ">
            <div
              className={`${
                totalPrice() > 0 ? "col-md-9" : "col-md-12"
              }  "p-0 m-0"`}
            >
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

                      !paymentPage ? (
                        <Button
                          type="primary"
                          danger
                          onClick={() => removeCartItem(item._id)}
                        >
                          Remove
                        </Button>
                      ) : (
                        ""
                      ),
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
            {totalPrice() > 0 ? (
              <div className="col-md-3 cart-summary ">
                <h4>Cart Summary</h4>
                <hr />
                <h5>Total : {totalPrice()} </h5>
                {auth?.user?.address ? (
                  <>
                    <div className="mb-3">
                      <h5>Current Address</h5>
                      <h5>{auth?.user?.address}</h5>

                      {!paymentPage ? (
                        <Button
                          className="btn-warning mt-3"
                          type="primary"
                          onClick={() => navigate("/checkout")}
                        >
                          Continue To Checkout
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          onClick={() => navigate("/cart")}
                        >
                          Modify Cart
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      !paymentPage ? (
                        <Button
                          className="btn-warning mt-3"
                          type="primary"
                          onClick={() => navigate("/checkout")}
                        >
                          Continue To Checkout
                        </Button>
                      ) : (
                        ""
                      )
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
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {paymentPage && totalPrice() > 0 ? (
          <div className="row">
            <div className="col-sm-4">
              <Card title="Delivery Address Details" bordered={false}>
                <p>Name: {userAddress.name}</p>
                <p>email: {userAddress.email}</p>
                <p>Phone: {userAddress.phone}</p>
                <p>Address: {userAddress.address}</p>
                <p>Address: {userAddress.pincode}</p>
                <Button
                  onClick={() => {
                    changeAddrFn(0);
                    window.scroll(0, 0);
                  }}
                >
                  Change Address
                </Button>
              </Card>
            </div>
            <div className="col-sm-8">
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

                    {!(loading || !instance || !auth?.user?.address) ? (
                      <Button
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                        loading={loading || !instance || !auth?.user?.address}
                      >
                        Make Payment
                      </Button>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CartPage;
