import React from "react";
import { useSelector } from "react-redux";
import ProductCards from "../components/ProductCards";

const Search = () => {
  const data = useSelector((state) => state.search);
  console.log(data.payload);
  return (
    <div className="container">
      <div className="text-center">
        <h1>Search Resuts</h1>
        <h6>
          {data?.payload?.length < 1
            ? "No Products Found"
            : `Found ${data?.payload?.length}`}
        </h6>
        <div className="d-flex flex-wrap mt-4">
          <ProductCards prodArr={data.payload} gridCount="3" />
        </div>
      </div>
    </div>
  );
};

export default Search;
