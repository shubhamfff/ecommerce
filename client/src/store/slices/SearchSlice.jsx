import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: { search: JSON.parse(localStorage.getItem('search')) || {} }
    ,
    reducers: {
        addSearchResult(state, action) {
            state.payload = action.payload
        }
    }
})

export { searchSlice }
export const { addSearchResult } = searchSlice.actions