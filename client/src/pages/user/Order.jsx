import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Collapse, Divider } from "antd";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <>
      <div className="container mt-5 dashboard">
        <div className="row">
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col"> date</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
            </table>
            {orders?.map((o, i) => {
              return (
                <div className="">
                  <Collapse
                    style={{ background: "white" }}
                    items={[
                      {
                        key: "1",
                        label: (
                          <table
                            className="table"
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <tbody
                              style={{
                                borderBottom: "1px solid white",
                                marginBottom: 0,
                              }}
                            >
                              <tr>
                                <td>{i + 1}</td>
                                <td>{o?.buyer?.name}</td>
                                <td>{o?.createAt}</td>
                                <td>
                                  {o?.payment.success ? "Success" : "Failed"}
                                </td>
                                <td>{o?.products?.length}</td>
                              </tr>
                            </tbody>
                          </table>
                        ),
                        children: (
                          <div className="container">
                            <p>Order #: {o._id}</p>
                            {o?.products?.map((p, i) => (
                              <div
                                className="row mb-2 p-3 card flex-row"
                                key={p._id}
                              >
                                <div className="col-md-4">
                                  <img
                                    src={`${
                                      import.meta.env.VITE_APP_API
                                    }/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    width={250}
                                    height={"100%"}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <p>{p.name}</p>
                                  <p>{p.description.substring(0, 30)}</p>
                                  <p>Price : {p.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ),
                      },
                    ]}
                  />
                  <Divider />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
