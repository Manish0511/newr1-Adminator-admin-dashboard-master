
import { useState } from "react"
import { Link } from "react-router-dom"
import { CtButton, H4Header } from "../UIs/Headers"

const Header = ({configData, handleDataDelete, htmlFilterBlock}) => {
    const [showFilters, setShowFilters] = useState('d-none')
    const handleShowHide = () => {
        if(showFilters == '')
        {
            setShowFilters('d-none')
        }else
        {
            setShowFilters('')
        }   
    }
    return (
        <>
            <H4Header title={configData.headerTitle} />
            <div className="mB-10 gap-10 peers">
                {configData.hasFilters && 
                    <div className={`${!showFilters && 'pB-10'} peer`}>
                        <button type="button" className="btn cur-p btn-primary btn-color" onClick={handleShowHide}>Filters</button>
                    </div>
                }
                {configData.createButton && 
                    <div className={`${!showFilters && 'pB-10'} peer`}>
                        <Link type="button" className="btn cur-p btn-primary btn-color" to={configData.createUrl}>{configData.createButton}</Link>
                    </div>
                }
                {configData.deleteButton && 
                    <div className={`${!showFilters && 'pB-10'} peer`}>
                        <CtButton onClick={handleDataDelete}>{configData.deleteButton}</CtButton>
                    </div>
                }
            </div>
            {configData.hasFilters &&
                <div>
                    <div className={showFilters}>
                        {htmlFilterBlock}
                    </div>
                </div>
            }
        </>
    )
}

export default Header;