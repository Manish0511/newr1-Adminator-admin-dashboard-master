import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        set: (state, action) => {
            state = action.payload
            return state
        }
    }
})
export const usersAction = usersSlice.actions
export default usersSlice