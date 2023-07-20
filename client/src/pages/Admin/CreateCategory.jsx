import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Button, Form, Input, notification, Popconfirm, Switch, Modal } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedHomepage, setUpdatedHomepage] = useState("");
    const [withCount, setWithCount] = useState(0);
    const [photo, setPhoto] = useState("");


    const [onHomepage, showOnHome] = useState(false);

    useEffect(() => {
        getAllCategory();
        getAllProducts();
        countMatch();
    }, []);


    //handle Form

    const handleSubmit = async (e) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/category/create-category`, {
                name,
                onHomepage
            });
            if (data?.success) {
                toast.success("Category added successfully");
                getAllCategory();
            } else {
                toast.error("Some error occered");
            }
        } catch (error) {
            console.log(error);
            toast.error("Some error occered");
        }
    };

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Some error occered");
        }
    };

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/product/get-product`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            // toast.error("Someething Went Wrong");
        }
    };


    const countMatch = () => {
        /* console.log(category);
        console.log(products); */
        let newCatArr = [...categories]
        let newCatProdArr = [];
        let prodArr = []
        let output = [];


        newCatArr.map(cat => {
            products.map(p => {
                if (p.category._id === cat._id) {
                    prodArr.push({
                        "name": cat.name,
                        "showHome": cat.onHomepage,
                        "value": [p] || null
                    })
                }
            })

            console.log('this is prod array', prodArr);

            let array = prodArr
            let output = [];
            array.forEach(function (item) {
                let existing = output.filter(function (v, i) {
                    return v.name == item.name;
                });
                if (existing.length) {
                    let existingIndex = output.indexOf(existing[0]);
                    output[existingIndex].value = output[existingIndex].value.concat(item.value);
                } else {
                    if (typeof item.value == 'string')
                        item.value = [item.value];
                    output.push(item);
                }
            });
            setWithCount(output)
            console.log(output);
        })
    }


    //update category
    const handleUpdate = async () => {
        try {
            let name = updatedName;
            let onHomepage = updatedHomepage;
            const { data } = await axios.put(
                `${import.meta.env.VITE_APP_API}/api/v1/category/update-category/${selected._id}`,
                { name, onHomepage }

            );
            if (data?.success) {
                toast.success("Category added successfully");
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error("Some error occered");
            }
        } catch (error) {
            console.log(error);
        }
    };
    //delete category
    const handleDelete = async (product) => {
        try {

            if (withCount) {
                const result = withCount.find(({ name }) => name === product.name);
                console.log(result)
                if (result) {
                    console.log('product found');
                    alert('Please delete all products associated with this category to delete the category');
                } else {
                    console.log('no product found')
                    const { data } = await axios.delete(
                        `${import.meta.env.VITE_APP_API}/api/v1/category/delete-category/${product._id}`
                    );
                    if (data.success) {
                        toast.success("Category deleted successfully");

                        getAllCategory();
                    } else {
                        toast.error("Some error occered");
                    }
                }
            } else {
                console.log('no count')
            }



        } catch (error) {
            toast.error("Some error occered");
        }
    };

    const handleCancel = () => {
        console.log('canceled')
    }

    const showOnHomePage = (flag) => {
        console.log(flag)
    }



    return (
        <>
            <ToastContainer />
            <div className="container-fluid dashboard">
                <div className="row">
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                                homeValue={onHomepage}
                                showOnHome={showOnHome}
                                setPhoto={setPhoto}

                            />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Show on Home</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td><Switch size="large"
                                                    disabled
                                                    checked={c.onHomepage}
                                                    onChange={(e) => showOnHomePage(e)}

                                                /></td>
                                                <td>
                                                    <Button type="primary" onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setUpdatedHomepage(c.onHomepage)
                                                        setSelected(c);
                                                    }}>Edit</Button>
                                                    <Popconfirm
                                                        title="Delete the task"
                                                        description={`Are you sure to delete ${c.name}?`}
                                                        onConfirm={() => handleDelete(c)}
                                                        onCancel={handleCancel}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button danger>Delete</Button>
                                                    </Popconfirm>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}
                        >
                            {selected ? <>
                                <h4>{selected.name}</h4>
                                <CategoryForm
                                    value={selected.name}
                                    homeValue={selected.onHomepage}
                                    setValue={setUpdatedName}
                                    handleSubmit={handleUpdate}
                                    showOnHome={setUpdatedHomepage}
                                /> </> : 'loading'}
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;
