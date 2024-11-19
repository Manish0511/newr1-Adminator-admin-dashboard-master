import { memo, useCallback, useEffect, useState } from "react";
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
        [ headerColumnNames ] = useState({checkbox_id:'',id:'#', code:'Code', username:'Username', first_name:'First Name', last_name:'Last Name', action:"Action"}),
        [filters, setFilters] = useState({}),
        [currentPage, setCurrentPage] = useState(1),
        [configData] = useState({
            headerTitle: "Users",
            headerColumnNames: headerColumnNames,
            hasFilters: true,
            currentPage: currentPage,
            setCurrentPage: setCurrentPage,
            createButton: 'Create User',
            createUrl: '/users/create',
            editUrl: '/users/edit/',
            deleteButton: 'Delete',
            deleteUrl: 'users/delete',
        })

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
            {/* <Index headerTitle='Users' headerColumnNames={headerColumnNames} data={data} handleFetchMainData={fetchMainData} hasFilters={true} setCurrentPage={setCurrentPage} createButton={'Create User'}> */}
            <Index configData={configData} data={data} fetchMainData={fetchMainData}>
                <UserFilters onFilters={setFilters} setCurrentPage={setCurrentPage}/>
            </Index>
        </>
    )
}

export default memo(Users);