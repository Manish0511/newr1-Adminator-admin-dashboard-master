import { useSelector } from "react-redux";

export const hasPermission = ( requiredPermission ) => {
    // console.log('route requiredPermission ' + requiredPermission)
    const userPermissions = useSelector((store) => store.authUserPermissions)
    if(!userPermissions.length)
    {
        return false
    }
    // console.log(userPermissions)
    return requiredPermission.filter(item => userPermissions.includes(item)); // Check if the permission exists in the user's permissions array
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
};