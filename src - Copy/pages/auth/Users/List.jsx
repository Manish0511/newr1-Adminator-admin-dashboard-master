import { memo, useCallback, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Index from "../../../Companents/Listing/Index";
import apiService from "../../../apis/apiService";
import { usersAction } from "../../../store/auth/users";
import UserFilters from "./Filters";

const Users = () => {
    console.log('Users')
    const data = useSelector(store => store.users),
        dispatch = useDispatch(),
        [ canApiCall, setCanApiCall ] = useState(true),
        [ headerColumnNames ] = useState({id:'#', code:'Code', username:'Username', first_name:'First Name', last_name:'Last Name'}),
        [filters, setFilters] = useState({}),
        [currentPage, setCurrentPage] = useState(1)

    const fetchMainData = useCallback(async () => {
        setCanApiCall(false)
        const response = await apiService(`users?page=`+currentPage, 'get', filters)
        if((response || {}).success)
        {
            console.log(response.data)
            dispatch(usersAction.set(response.data))
        }else
        {
            console.log('rrr', response)
        }
        setCanApiCall(true)
    }, [dispatch, currentPage, filters, data])
    useEffect(() => {   
        if(canApiCall && !data.length) fetchMainData() 
    }, [dispatch, currentPage, filters, data])

    return (
        <>
            <Index headerTitle='Users' headerColumnNames={headerColumnNames} data={data} handleFetchMainData={fetchMainData} hasFilters={true} setCurrentPage={setCurrentPage} createButton={'Create User'}>
                <UserFilters onFilters={setFilters} setCurrentPage={setCurrentPage}/>
            </Index>
        </>
    )
}

export default memo(Users);