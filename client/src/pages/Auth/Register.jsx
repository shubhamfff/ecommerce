import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import { Typography } from 'antd';
import Img from '../../assets/register/register_bg.png'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // form function
    const onFinish = async (e) => {
        // e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
                address,
                answer,
            });
            if (res && res.data.success) {
                // toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                // toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error("Something went wrong");
        }
    };

    return (
        <>
            <div className="form-container mt-5">
                <Row justify="left" align="middle">
                    <Col xs={24} xl={12}>
                        <img src={Img} style={{ width: '80%', marginLeft: '5%' }} />
                    </Col>
                    <Col xs={24} xl={12}>
                        <h2 className="mt-3">Magical things waiting for you otherside<span role="img" aria-label="rocket">🪄</span></h2>
                        <Form name="loginForm" size="large" layout="vertical" onFinish={onFinish} style={{ width: '90%', marginTop: '2%' }}>

                            <Form.Item name="name" label="User name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Username is required.',
                                    }]}>
                                <Input onChange={(e) => setName(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="email" label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'email is required.',
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
                            <Form.Item name="phone" label="Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Phone number is required.',
                                    }, {
                                        pattern: /^[0-9]+$/,
                                        message: 'Phone can only include numbers.',
                                    }]}>
                                <Input onChange={(e) => setPhone(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="address" label="Address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Address is required.',
                                    }]}>
                                <Input onChange={(e) => setAddress(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="answer" label="Secret Question"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Secret question is required.',
                                    }]}>
                                <Input onChange={(e) => setAnswer(e.target.value)} />
                            </Form.Item>

                            <Button htmlType="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </div>

        </>
    );
};

export default Register;
