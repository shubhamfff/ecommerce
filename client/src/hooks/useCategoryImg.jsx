import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategoryImg() {
  const [categoryImg, setCategoryImg] = useState();

  useEffect(() => {
    getAllCategoryImages();
  }, []);

  const getAllCategoryImages = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_STRAPI_API}/api/categories?populate=*`
      );
      setCategoryImg(data);
    } catch (error) {
      console.log(error);
    }
  };
  if (categoryImg) console.log(categoryImg.data);

  return categoryImg;
}
