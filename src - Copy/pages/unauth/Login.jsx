import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import apiService from "../../apis/apiService";
import { authAction } from "../../store/auth/auth";
import { encrypt } from "../../Helpers/encryption";

const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
};

const Login = () => {
    const dispatch = useDispatch(),
        navigate = useNavigate(),
        emailRef = useRef(''),
        passwordRef = useRef(''),
        rememberMeRef = useRef('')
    if(isAuthenticated())
    {
        return <Navigate to="/login" replace />;   
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        const response = await apiService('login', 'post', userData)
        if((response || {}).success)
        {
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
            <h4 className="fw-300 c-grey-900 mB-40">Login</h4>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="text-normal text-dark form-label">Username</label>
                    <input ref={emailRef} type="email" className="form-control" placeholder="John Doe" />
                </div>
                <div className="mb-3">
                    <label className="text-normal text-dark form-label">Password</label>
                    <input ref={passwordRef} type="password" className="form-control" placeholder="Password" />
                </div>
                <div className="">
                    <div className="peers ai-c jc-sb fxw-nw">
                        <div className="peer">
                            <div className="checkbox checkbox-circle checkbox-info peers ai-c">
                            <input ref={rememberMeRef} type="checkbox" id="inputCall1" name="inputCheckboxesCall" className="peer" />
                            <label htmlFor="inputCall1" className=" peers peer-greed js-sb ai-c form-label">
                                <span className="peer peer-greed">Remember Me</span>
                            </label>
                            </div>
                        </div>
                        <div className="peer">
                            <button className="btn btn-primary btn-color">Login</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;