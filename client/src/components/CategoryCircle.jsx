import React from 'react'
import useCategory from '../hooks/useCategory'
import { Avatar, Card, Col, Divider, Row } from 'antd';
import { useNavigate } from "react-router-dom";
import './categoryCircle.css'

const CategoryCircle = () => {
    const categories = useCategory();
    const navigate = useNavigate();

    return (

        <div className='container'>
            <Divider orientation="left">Categories</Divider>
            <div className='row align-items-center'>

                {categories ? categories.slice(0, 5).map(cat => {
                    return (
                        <div className="col-2">
                            <div className="card card-style" onClick={() => navigate(`/category/${cat.slug}`)}>
                                <div className="card-body text-center">
                                    <h5>{cat.name}</h5>
                                </div>
                            </div>
                        </div>)
                }) : 'Loading'}
                <div className="col-2">
                    <div className="card  card-style" onClick={() => navigate(`/categories`)}>
                        <div className="card-body text-center">

                            <h5>All Categories</h5>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default CategoryCircle