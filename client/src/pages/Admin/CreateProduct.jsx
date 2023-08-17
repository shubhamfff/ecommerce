import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Form, Input, Upload, message } from "antd";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");

  //get all category
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
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (values) => {
    console.log("Form values", values);
    try {
      const productData = new FormData();
      productData.append("name", values.name);
      productData.append("description", values.description);
      productData.append("price", values.price);
      productData.append("quantity", values.quantity);
      productData.append("photo", photo);
      productData.append("photo1", photo1);
      productData.append("photo2", photo2);
      productData.append("category", values.category);
      const { data } = axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success(data);
        // window.location.reload();
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <Form
        name="categoryForm"
        size="large"
        layout="vertical"
        onFinish={handleCreate}
        style={{ width: "90%", marginLeft: 15 }}
      >
        <Form.Item
          name="category"
          label="Add new category"
          rules={[
            {
              required: true,
              message: "category is required.",
            },
          ]}
        >
          <Select
            bordered={false}
            placeholder="Select a category"
            size="small"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setCategory(value);
            }}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
          {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {photo1 ? photo1.name : "Upload Photo"}
            <input
              type="file"
              name="photo1"
              accept="image/*"
              onChange={(e) => setPhoto1(e.target.files[0])}
              hidden
            />
          </label>
        </div>
        <div className="mb-3">
          {photo1 && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo1)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {photo2 ? photo2.name : "Upload Photo"}
            <input
              type="file"
              name="photo2"
              accept="image/*"
              onChange={(e) => setPhoto2(e.target.files[0])}
              hidden
            />
          </label>
        </div>
        <div className="mb-3">
          {photo2 && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo2)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>

        <Form.Item
          name="name"
          label="Add Product Name"
          rules={[
            {
              required: true,
              message: "name is required.",
            },
          ]}
        >
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Add Product Description"
          rules={[
            {
              required: true,
              message: "Product decription is required.",
            },
          ]}
        >
          <Input onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Add Product Price"
          rules={[
            {
              required: true,
              message: "Price is required.",
            },
          ]}
        >
          <Input onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Add Product Quantity"
          rules={[
            {
              required: true,
              message: "Product Quantity is required.",
            },
          ]}
        >
          <Input onChange={(e) => setQuantity(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="shipping"
          label="Select Shipping option"
          rules={[
            {
              required: true,
              message: "Product Quantity is required.",
            },
          ]}
        >
          <Select
            bordered={false}
            placeholder="Select Shipping "
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setShipping(value);
            }}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
      </Form>
    </>
  );
};

export default CreateProduct;
