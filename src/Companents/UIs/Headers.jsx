import { Button } from "react-bootstrap"
export const H4Header = ({title}) => {
    return (
        <h4 className="c-grey-900 mB-20">{ title }</h4>
    )
}

export const H6Header = ({title}) => {
    return (
        <h6 className="c-grey-900">{ title }</h6>
    )
}

export const CtButton = ({label, children, ...inputProps}) => {
    return (
        <Button className={`cur-p btn-color`} type="button" {...inputProps}>{children}</Button>
    )
}

export const ButtonLoader = ({children}) => {
    return (
        <CtButton type="button">
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {children}
        </CtButton>
    )
}
