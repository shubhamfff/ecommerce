import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserSlice";
import { searchSlice } from "./slices/SearchSlice";
import { cartSlice } from "./slices/CartSlice";
import { wishlistSlice } from "./slices/wishListSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    search: searchSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
  },
});

export default store;
