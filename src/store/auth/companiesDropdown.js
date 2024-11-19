import { createSlice } from "@reduxjs/toolkit";

const companiesDropdownSlice = createSlice({
    name: 'companiesDropdown',
    initialState: [],
    reducers: {
        fetch: (state, action) => {
            state = action.payload
            return state
        }
    }
})
export const companiesDropdownAction = companiesDropdownSlice.actions
export default companiesDropdownSlice