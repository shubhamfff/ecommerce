import { useState, useEffect } from "react";
import axios from 'axios';

export default function useCategory() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getAllCategory();
    }, [])


    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/category/get-category`);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }

    return category;
}