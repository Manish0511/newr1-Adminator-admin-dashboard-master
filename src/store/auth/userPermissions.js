import { createSlice } from "@reduxjs/toolkit";

const authUserPermissionsSlice = createSlice({
    name: 'authUserPermissions',
    initialState: {},
    reducers: {
        set: (state, action) => {
            state = action.payload
            return state
        },
        remove: (state) => {
            return {}
        }
    }
})
export const authUserPermissionsAction = authUserPermissionsSlice.actions
export default authUserPermissionsSlice