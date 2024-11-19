import { useState } from "react"
const Collapse = ({buttonName, children}) => {
    const [show, setShow] = useState('d-none')
    // console.log(show)
    // console.log(children)
    const handleShowHide = () => {
        if(show == '')
        {
            setShow('d-none')
        }else{
            setShow('')
        }
    }
    return (
        <>
            <div className="mB-10">
                <div className={`${!show && 'pB-10'}`}>
                    <button type="button" className="btn cur-p btn-primary btn-color" onClick={handleShowHide}>{buttonName}</button>        
                </div>
                <div className={show}>
                    {children}
                </div>
            </div>
        </>
    )
}
export default Collapse