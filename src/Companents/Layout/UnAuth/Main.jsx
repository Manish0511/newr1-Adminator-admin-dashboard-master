import { Outlet } from "react-router-dom";
import loginBackground from '../../../assets/static/images/bg.jpg'
import loginBackgroundLogo from '../../../assets/static/images/logo.png'

const Main = () => {
    return (
        <div className="peers ai-s fxw-nw h-100vh">
            <div className="d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv" style={{backgroundImage: `url(${loginBackground})` }}>
                <div className="pos-a centerXY">
                <div className="bgc-white bdrs-50p pos-r" style={{ width: '120px', height: '120px'}}>
                    <img className="pos-a centerXY" src={loginBackgroundLogo} alt="" />
                </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
export default Main;