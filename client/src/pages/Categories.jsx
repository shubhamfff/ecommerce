import React, { useState, useEffect } from "react";
import useCategory from "../hooks/useCategory";
import { useParams, useNavigate } from "react-router-dom";

import './categories.css'


const Categories = () => {
    const navigate = useNavigate();
    const categories = useCategory();
    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row container">
                {categories.map((c) => (
                    <div key={c._id} className="col-4">
                        <div className="card card-style margin-bottom" onClick={() => navigate(`/category/${c.slug}`)}>
                            <div className="card-body text-center">
                                <h5>{c.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
