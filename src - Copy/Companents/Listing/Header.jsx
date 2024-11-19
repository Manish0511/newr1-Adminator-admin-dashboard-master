
import { useState } from "react"
import { Link } from "react-router-dom"
import Collapse from "../Utilities/Collapse"
import { H4Header } from "../UIs/Headers"

const Header = ({headerTitle, hasFilters, createButton, htmlFilterBlock}) => {
    const [showFilterrs, setShowFilterrs] = useState('d-none')
    const handleShowHide = () => {
        if(showFilterrs == '')
        {
            setShowFilterrs('d-none')
        }else{
            setShowFilterrs('')
        }
    }
    return (
        <>
            <H4Header title={headerTitle} />
            <div className="mB-10 gap-10 peers">
                {hasFilters && 
                    <div className={`${!showFilterrs && 'pB-10'} peer`}>
                        <button type="button" className="btn cur-p btn-primary btn-color" onClick={handleShowHide}>Filters</button>        
                    </div>
                }
                {createButton && 
                    <div className={`${!showFilterrs && 'pB-10'} peer`}>
                        <Link type="button" className="btn cur-p btn-primary btn-color" to={`/users/create`}>{createButton}</Link>        
                    </div>
                }
            </div>
            {hasFilters &&
                <div>
                    <div className={showFilterrs}>
                        {htmlFilterBlock}
                    </div>
                </div>
            }
        </>
    )
}

export default Header;