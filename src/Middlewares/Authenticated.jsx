import { useEffect, memo } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import apiService from '../apis/apiService'
import { authAction } from "../store/auth/auth";
import { isAuthenticated } from "../Helpers/hasPermission";

const Authenticated = memo(() => {
    // console.log('Middleware Authenticated started')
    const user = useSelector((store) => store.authUser),
        dispatch = useDispatch()

    if( !isAuthenticated() )
    {
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        const fetchUser = async () => {
            const response = await apiService(`auth-user`, 'get')  
            if(response?.success)
            {
                dispatch(authAction.login(response.data))
            }
        }
        if(!Object.keys(user).length) fetchUser() 
    }, [user, dispatch])

    return <Outlet />
})
export default Authenticated