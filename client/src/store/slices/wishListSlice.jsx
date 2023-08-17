import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: JSON.parse(localStorage.getItem("wishlist")) || [],
  reducers: {
    addToWishlist(state, action) {
      state.push(action.payload);
    },
    removeFromWishlist(state, action) {
      console.log("delete reducer", action.payload);
      let index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
  },
});

export { wishlistSlice };
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
