import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth/auth"
import authUserPermissionsSlice from "./auth/userPermissions"
import usersSlice from "./auth/users"
import companiesDropdownSlice from "./auth/companiesDropdown"
import companiesSlice from "./auth/companies"

const indexStore = configureStore({
    reducer: {
        authUser : authSlice.reducer,
        authUserPermissions : authUserPermissionsSlice.reducer,
        users : usersSlice.reducer,
        companies : companiesSlice.reducer,
        companiesDropdown : companiesDropdownSlice.reducer,
    }
})

export default indexStore