import Pagination from "./Pagination";
import Header from "./Header";

const Index = ({headerTitle, headerColumnNames, data, hasFilters, setCurrentPage, createButton, children}) => {
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="bgc-white bd bdrs-3 p-20 mB-20">
                        <Header headerTitle={headerTitle} htmlFilterBlock={children} hasFilters={hasFilters} createButton={createButton}/>

                        <table className="table table-hover">
                            <thead className="table-primary">
                            <tr>
                            {headerColumnNames && Object.keys(headerColumnNames).length > 0 && 
                                Object.entries(headerColumnNames).map(([key, value]) => (
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
                                                headerColumnNames && Object.keys(headerColumnNames).length > 0 && 
                                                Object.entries(headerColumnNames).map(([key, value], cellIndex) => (
                                                    <td scope="row" key={cellIndex}>{rowData[key]}</td>
                                                    )
                                                )
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Pagination data={data} setCurrentPage={setCurrentPage}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Index