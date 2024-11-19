import { useRef } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import apiService from '../../apis/apiService'
import { authAction } from "../../store/auth/auth"
import { encrypt } from "../../Helpers/encryption"

const Register = () => {

    const dispatch = useDispatch(),
        navigate = useNavigate(),
        firstNameRef = useRef(''),
        lastNameRef = useRef(''),
        clientNameRef = useRef(''),
        usernameRef = useRef(''),
        emailRef = useRef(''),
        passwordRef = useRef(''),
        confirmPasswordRef = useRef('')

    const handleRegister = async (e) => {
        e.preventDefault()
        const clientName = {name: clientNameRef.current.value}
        const userData = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            client: clientName,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            // confirm_password: confirmPasswordRef.current.value,
        }
        const response = await apiService('register', 'post', userData)
        if((response || {}).success)
        {
            console.log(response)
            dispatch(authAction.login(response.data))
            localStorage.setItem( 'authToken', encrypt(response.data.token) )
            navigate('/')
        }else
        {
            console.log('rrr', response)
        }
    }

    return (
        <div className="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r" style={{minWidth: '320px'}}>
            <h4 className="fw-300 c-grey-900 mB-20">Register</h4>
            <form onSubmit={handleRegister}>
            <div className="mb-3">
                <label className="form-label text-normal text-dark">First name</label>
                <input ref={firstNameRef} defaultValue={'a'} type="text" className="form-control" placeholder='John' />
            </div>
            <div className="mb-3">
                <label className="form-label text-normal text-dark">Last name</label>
                <input ref={lastNameRef} defaultValue={'b'} type="text" className="form-control" placeholder='Doe' />
            </div>
            <div className="mb-3">
                <label className="form-label text-normal text-dark">Client name</label>
                <input ref={clientNameRef} defaultValue={'c'} type="text" className="form-control" placeholder='JohnDoe' />
            </div>
            <div className="mb-3">
                <label className="form-label text-normal text-dark">Username</label>
                <input ref={usernameRef} defaultValue={'ff'} type="text" className="form-control" placeholder='John_Doe' />
            </div>
            <div className="mb-3">
                <label className="form-label text-normal text-dark">Email Address</label>
                <input ref={emailRef} type="email" defaultValue={'ee@ee.cc'} className="form-control" placeholder='name@email.com' />
            </div>
            <div className="mb-3">
                <label className="form-label text-normal text-dark">Password</label>
                <input ref={passwordRef} defaultValue={'fff'} type="password" className="form-control" placeholder="Password" />
            </div>
            <div className="mb-3">
                <label className="form-label text-normal text-dark">Confirm Password</label>
                <input ref={confirmPasswordRef} defaultValue={'fff'} type="password" className="form-control" placeholder="Password" />
            </div>
            <div className="mb-3">
                <button className="btn btn-primary btn-color">Register</button>
            </div>
            </form>
        </div>
    )
}
export default Register;