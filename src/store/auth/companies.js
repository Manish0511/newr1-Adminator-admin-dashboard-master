import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
    name: 'companies',
    initialState: [],
    reducers: {
        set: (state, action) => {
            state = action.payload
            return state
        }
    }
})
export const companiesAction = companiesSlice.actions
export default companiesSlice