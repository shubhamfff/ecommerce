import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { EditOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Col, Button, Row, Card, Drawer, Space, Select, Popconfirm, Tag } from 'antd';
import { ToastContainer, toast } from 'react-toastify';



const Products = () => {
    const [products, setProducts] = useState([]);
    const { Meta } = Card;
    const [open, setOpen] = useState(false);

    const [id, setId] = useState()
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [editCat, setEditCat] = useState(false)

    //lifecycle method
    useEffect(() => {
        getAllProducts();
        getAllCategory();
    }, []);

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/product/get-product`);
            setProducts(data.products);
            console.log(products);
        } catch (error) {
            console.log(error);
            // toast.error("Someething Went Wrong");
        }
    };

    const handleDelete = async () => {
        try {

            const { data } = await axios.delete(
                `${import.meta.env.VITE_APP_API}/api/v1/product/delete-product/${id}`
            );
            if (data?.success) {
                toast.success("Product Deleted Succfully");
                getAllProducts();
                onClose();
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    //create product function
    const handleUpdate = async () => {
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category._id);
            const { data } = axios.put(
                `${import.meta.env.VITE_APP_API}/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product updated Succfully");
                getAllProducts();
                onClose();
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    const onClose = () => {
        setOpen(false);
    };

    const showLargeDrawer = async (product) => {

        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_APP_API}/api/v1/product/get-product/${product.slug}`
            );
            console.log(data)
            setOpen(true);
            setName(product.name);
            setId(product._id);
            setDescription(product.description);
            setPrice(product.price);
            setPrice(product.price);
            setQuantity(product.quantity);
            setShipping(product.shipping);
            setCategory(product.category);

        } catch (error) {

        }
    };

    const handleCancel = () => {
        console.log('canceled')
    };

    const showEditCat = () => {
        setEditCat(!editCat)
    }
    return (
        <>
            <ToastContainer />
            <Drawer
                title={`Large Drawer`}
                placement="right"
                size="large"
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <div className="container-fluid m-3 p-3">
                    <div className="">
                        <h1>Update Product</h1>
                        {category ? (!editCat ?
                            <>
                                {category.name} <EditOutlined key="edit" onClick={() => showEditCat()} />
                            </> :
                            <>
                                <Select
                                    bordered={false}
                                    placeholder="Select a category"
                                    size="small"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setCategory(value);
                                    }}
                                    value={category}
                                >
                                    {categories?.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>
                                <EditOutlined key="edit" onClick={() => showEditCat()} />
                            </>) : <><p>No category added</p> <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="small"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select></>}
                        <div className="m-1 w-75">
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`${import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${id}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? "yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">

                                <Button type="primary" onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </Button>
                            </div>
                            <div className="mb-3">
                                <Popconfirm
                                    title="Delete the task"
                                    description={`Are you sure to delete ${name}?`}
                                    onConfirm={() => handleDelete()}
                                    onCancel={handleCancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>

                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            <Row gutter={16} justify="start" style={{ margin: 0 }}>
                {products.map((p) => {
                    return (
                        <Col className="gutter-row" span={6} >
                            <Card key={p._id} title={p.name} bordered={true} extra={<EditOutlined key="edit" onClick={() => showLargeDrawer(p)} />} style={{ marginTop: 25, width: "90%" }}>
                                <img
                                    src={`${import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                {p.category ? <p className="card-text">{p.category.name}</p> : " No category allocated"}
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </>
    );
};

export default Products;
