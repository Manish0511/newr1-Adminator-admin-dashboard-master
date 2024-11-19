import { memo, useCallback } from "react";

const Pagination = ({data, setCurrentPage, paginationClickCallback}) => {

    const handleOnclick = (pageNumber) => {
        setCurrentPage(pageNumber)
        paginationClickCallback()
    }

    const renderPagination = useCallback(() => {
        let pages = [],
            totalPages = data && data.last_page && data.last_page || 0;
        if(totalPages > 0)
        {
            pages.push(
                <li className={`page-item ${(data.current_page == 1) ? 'disabled' : ''}`} key={`first ${data.current_page}`}>
                    <button className="page-link" onClick={() => handleOnclick(data.current_page - 1)}>Previous</button>
                </li>
            )
            for (let i = 1; i <= totalPages; i++) {
                let currentActiveClass = (data.current_page == i )
                pages.push(
                    <li className="page-item" key={i}>
                        <button className={`page-link ${currentActiveClass ? 'active' : ''} `} onClick={() => handleOnclick(i)}>{i}</button>
                    </li>
                )
            }
            pages.push(
                <li className={`page-item ${(data.current_page == data.last_page) ? 'disabled' : ''}`}  key={`last ${data.last_page}`} >
                    <button className="page-link" onClick={() => handleOnclick(data.current_page + 1)}>Next</button>
                </li>
            )
        }
        return pages;
    }, [data])

    return (
        <>
        {
            data && data.data && (data.data).length > 0 &&
            <nav aria-label="...">
                <ul className="pagination justify-content-end">
                    { renderPagination() }
                </ul>
            </nav>
        }
        </>
    )
}

export default memo(Pagination)