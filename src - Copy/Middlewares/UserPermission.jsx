import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import apiService from '../apis/apiService'
import { useEffect } from "react";
import { authUserPermissionsAction } from "../store/auth/userPermissions";

const UserPermission = () => {
    const dispatch = useDispatch(),
        user = useSelector((store) => store.authUser),
        userPermissions = useSelector((store) => store.authUserPermissions)

    useEffect(() => {
        const getPermissions = async () => {
            const response = await apiService(`users/${user.id}/user-permissions`, 'get')
            if((response || {}).success)
            {
                dispatch(authUserPermissionsAction.set(response.data))
            }
        }
        if(user.id && !userPermissions.length) getPermissions()
    }, [user, userPermissions, dispatch])

    return <Outlet />
}
export default UserPermission