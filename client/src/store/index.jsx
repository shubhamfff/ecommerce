import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserSlice";
import { searchSlice } from "./slices/SearchSlice";
import { cartSlice } from "./slices/CartSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        search: searchSlice.reducer,
        cart: cartSlice.reducer
    }
})

export default store