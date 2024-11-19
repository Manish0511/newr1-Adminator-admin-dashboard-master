import Pagination from "./Pagination";
import Header from "./Header";
import { Link } from "react-router-dom";
import { memo, useState } from "react";
import apiService from "../../apis/apiService";
import AutohideToast from "../Utilities/AutohideToast";

const Index = ({configData, data, fetchMainData, children}) => {
    const [selectedIds, setSelectedIds] = useState([]),
        [isAllSelected, setIsAllSelected] = useState(false),
        [showToast, setShowToast] = useState(false),
        [isLoading, setIsLoading] = useState(false),
        [alertType, setAlertType] = useState(""),
        [toastMessage, setToastMessage] = useState("")

    const paginationClickCallback = () => {
        setIsAllSelected(false)
        setSelectedIds([]);
    }

    const handleAllSelectedIds = (e) => {
        const checked = e.target.checked;
        setIsAllSelected(checked);
        const currentPageIds = data.data.map((item) => item.id);
        if (checked) {
            setSelectedIds(currentPageIds);
        } else {
            setSelectedIds([]);
        }
    };
    
    const handleSelectedIds = (id) => {
        setSelectedIds((prevSelectedIds) => {
            // Toggle logic: add ID if not in the list, remove if it is
            if (prevSelectedIds.includes(id)) {
                setIsAllSelected(false)
                return prevSelectedIds.filter((selectedId) => selectedId !== id);
            } else {
                return [...prevSelectedIds, id];
            }
        });
    };
        
    const handleDataDelete = () => {
        if(selectedIds.length == 0){
            alert('Please select atleast one reacord.')
        }else{
            const payload = {ids:selectedIds}

            const deleteRecords = async () => {
                try {
                    const response = await apiService(configData.deleteUrl, 'post', payload);
                    if ((response || {}).success) {
                        setIsLoading(false);
                        setToastMessage(response.message);
                        setAlertType("success");
                        setShowToast(true);
                        paginationClickCallback()
                        if(selectedIds.length == data.data.length)
                        {
                            configData.setCurrentPage((prevCurrentPage) => {
                                console.log('prevCurrentPage',prevCurrentPage)
                                return prevCurrentPage - 1
                            })
                        }
                        console.log('configData',configData)
                        fetchMainData()
                    } else {
                        // HandleValidation(response.data, fieldsName, setError);
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.log("error", error);
                    setToastMessage(error.message);
                    setShowToast(true);
                    setIsLoading(false);
                    setAlertType("danger");
                }
            };
            deleteRecords();
        }
    }
    return (
        <>
            <div className="row">
                <AutohideToast
                    show={showToast}
                    setShowToast={setShowToast}
                    alertType={alertType}
                    message={toastMessage}
                />
                <div className="col-md-12">
                    <div className="bgc-white bd bdrs-3 p-20 mB-20">
                        <Header handleDataDelete={handleDataDelete} configData={configData} htmlFilterBlock={children} />

                        <table className="table table-hover">
                            <thead className="table-primary">
                            <tr>
                            {configData.headerColumnNames && Object.keys(configData.headerColumnNames).length > 0 && 
                                Object.entries(configData.headerColumnNames).map(([key, value]) => (
                                    (key=='checkbox_id')
                                    ?
                                    <th scope="col" key={key}><input type="checkbox" value='all' checked={isAllSelected} onChange={handleAllSelectedIds}/></th>
                                    :
                                    <th scope="col" key={key}>{value}</th>
                                )
                            )}
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.data && (data.data).length > 0 && 
                                    Object.entries(data.data).map(([rowKey, rowData]) => (
                                        <tr scope="col" key={rowKey}>
                                            {
                                                configData.headerColumnNames && Object.keys(configData.headerColumnNames).length > 0 && 
                                                Object.entries(configData.headerColumnNames).map(([key, value], cellIndex) => (
                                                        key=='action' ?
                                                        <td scope="row" key={cellIndex}>
                                                            <Link type="button" className="btn cur-p btn-primary btn-color" to={`${configData.editUrl}${rowData['id']}`}>Edit</Link>
                                                            </td>
                                                        :
                                                        (key=='checkbox_id')
                                                        ?
                                                        <td scope="col" key={cellIndex}>
                                                            <input type="checkbox" name={`option ${rowData['id']}`} value={rowData['id']} checked={selectedIds.includes(rowData['id'])} onChange={()=>handleSelectedIds(rowData['id'])}/>
                                                        </td>
                                                        :
                                                        <td scope="row" key={cellIndex}>
                                                            {rowData[key]}
                                                        </td>
                                                    )
                                                )
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Pagination data={data} setCurrentPage={configData.setCurrentPage} paginationClickCallback={paginationClickCallback}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default memo(Index)