import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authUser',
    initialState: {},
    reducers: {
        login: (state, action) => {
            state = action.payload
            return state
        },
        logout: (state) => {
            return {}
        }
    }
})
export const authAction = authSlice.actions

export default authSlice