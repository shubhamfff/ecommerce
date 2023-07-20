import React, { useState } from "react";
// import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import Img1 from '../../assets/login/login_bg_white.png'
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/UserSlice";
import { toast, ToastContainer } from "react-toastify";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [auth, setAuth] = useAuth();
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const onFinish = async (values) => {
        console.log('Received values of form: ', values.Username, values.password);
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/login`, {
                email: values.Username,
                password: values.password,
            });
            console.log(res);
            if (res.data.success) {
                // toast.success(res.data && res.data.message);
                console.log(res.data)
                dispatch(addUser(res.data))
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error.response.data.message);
            // toast.error("Something went wrong");
            toast.error(error.response.data.message);
        }
    };
    return (
        <>
        <ToastContainer />
            <div className="form-container ">
                <Row justify="left" align="middle">
                    <Col xs={24} xl={12}>
                        <img src={Img1} style={{ width: '80%', marginLeft: '5%' }} />
                    </Col>
                    <Col xs={24} xl={12}>
                        <h2>Login to enable extra super-powers...<span role="img" aria-label="rocket">🚀</span></h2>
                        <Form name="loginForm" size="large" layout="vertical" onFinish={onFinish} style={{ width: '90%', marginLeft: 15 }}>

                            <Form.Item name="Username" label="User name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Username is required.',
                                    }]}>
                                <Input onChange={(e) => setEmail(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="password" label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password is required.',
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9]+$/,
                                        message: 'Name can only include letters and numbers.',
                                    }]}>
                                <Input onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>

                            <Button htmlType="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </div>


        </>
    );
};

export default Login;
