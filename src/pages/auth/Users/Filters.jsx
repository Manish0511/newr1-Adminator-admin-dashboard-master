import { useRef } from "react"

const UserFilters = ({onFilters, setCurrentPage}) => {
        const refCode = useRef(),
        refUsername = useRef(),
        refFirstName = useRef(),
        refLastName = useRef()

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const params = {'code': refCode.current.value, 'first_name': refFirstName.current.value, 'last_name': refLastName.current.value,'username': refUsername.current.value}
        setCurrentPage(1)
        onFilters(params)
    }
    
    return (
        <div className="row gap-20 masonry pos-r">
            <div className="masonry-item col-md-12">
                <div className="bgc-white p-20 bd">
                    {/* <h6 className="c-grey-900">Filters</h6> */}
                    <div className="mT-10">
                        <form className="container" id="needs-validation" onSubmit={handleSubmitForm}>
                            <div className="row">
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label className="form-label" htmlFor="code">Code</label>
                                    <input ref={refCode} type="text" className="form-control" id="code" placeholder="Code" />
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label className="form-label" htmlFor="username">Username</label>
                                    <input ref={refUsername} type="text" className="form-control" id="username" placeholder="Username" />
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label className="form-label" htmlFor="first_name">First name</label>
                                    <input ref={refFirstName} type="text" className="form-control" id="first_name" placeholder="First name" />
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label className="form-label" htmlFor="last_name">Last name</label>
                                    <input ref={refLastName} type="text" className="form-control" id="last_name" placeholder="Last name" />
                                </div>
                            </div>
                            <button className="btn btn-primary btn-color" type="submit">Submit form</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserFilters