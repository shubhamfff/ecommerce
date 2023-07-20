import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSearchResult } from "../../store/slices/SearchSlice";
import { Input, Button } from 'antd';


const SearchInput = () => {
    // const [values, setValues] = useSearch();
    const [search, setSearch] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_APP_API}/api/v1/product/search/${search}`
            );
            console.log(data)
            dispatch(addSearchResult(data))
            localStorage.setItem("search", JSON.stringify(data));
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form
                className="d-flex search-form"
                role="search"

            >
                <Input placeholder="Search for something beautiful" bordered={false} value={search} style={{ width: 250 }}
                    onChange={(e) => setSearch(e.target.value)} />
                {/* <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                /> */}
                <Button type="default" onClick={handleSubmit}>Search</Button>
            </form>
        </div>
    );
};

export default SearchInput;
