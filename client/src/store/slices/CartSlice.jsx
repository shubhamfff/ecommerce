import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeCart(state, action) {
      console.log("delete reducer", action.payload);
      state.splice(action.payload, 1);
    },
  },
});

export { cartSlice };
export const { addToCart, removeCart } = cartSlice.actions;
