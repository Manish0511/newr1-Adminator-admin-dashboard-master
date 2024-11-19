import { memo, useCallback, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Index from "../../../Companents/Listing/Index";
import apiService from "../../../apis/apiService";
import { companiesAction } from "../../../store/auth/companies";
import CompanyFilters from "./Filters";

const Companies = () => {
    console.log('Companies')
    const data = useSelector(store => store.companies),
        dispatch = useDispatch(),
        [ canApiCall, setCanApiCall ] = useState(true),
        [ headerColumnNames ] = useState({checkbox_id:'', id:'#', code:'Code', name:'Name', location:'Location', action:"Action"}),
        [filters, setFilters] = useState({}),
        [currentPage, setCurrentPage] = useState(1),
        [configData] = useState({
            headerTitle: "Companies",
            headerColumnNames: headerColumnNames,
            hasFilters: false,
            setCurrentPage: setCurrentPage,
            createButton: 'Create Company',
            createUrl: '/companies/create',
            editUrl: '/companies/edit/'
        })

    const fetchMainData = useCallback(async () => {
        setCanApiCall(false)
        const response = await apiService(`companies?page=`+currentPage, 'get', filters)
        if((response || {}).success)
        {
            console.log(response.data)
            dispatch(companiesAction.set(response.data))
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
            <Index configData={configData} data={data}>
                {/* <CompanyFilters onFilters={setFilters} setCurrentPage={setCurrentPage}/> */}
            </Index>
        </>
    )
}

export default memo(Companies);