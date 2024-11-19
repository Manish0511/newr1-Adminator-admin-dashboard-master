import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth/auth"
import authUserPermissionsSlice from "./auth/userPermissions"
import usersSlice from "./auth/users"
import companiesDropdownSlice from "./auth/companiesDropdown"

const indexStore = configureStore({
    reducer: {
        authUser : authSlice.reducer,
        authUserPermissions : authUserPermissionsSlice.reducer,
        users : usersSlice.reducer,
        companiesDropdown : companiesDropdownSlice.reducer,
    }
})

export default indexStore