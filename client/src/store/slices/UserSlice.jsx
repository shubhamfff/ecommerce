import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem('auth')) || {}
    },
    reducers: {
        addUser(state, action) {
            state.user = action.payload;
        },
        deleteUser(state, action) {

        }
    }
})

export { userSlice };
export const { addUser } = userSlice.actions