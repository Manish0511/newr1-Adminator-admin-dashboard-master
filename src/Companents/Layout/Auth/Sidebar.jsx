import { NavLink } from "react-router-dom";
import headerLogo from '../../../assets/static/images/logo.png'
const Sidebar = () => {
    
    return (
        <div className="sidebar">
            <div className="sidebar-inner">
                <div className="sidebar-logo">
                    <div className="peers ai-c fxw-nw">
                    <div className="peer peer-greed">
                        <a className="sidebar-link td-n" href="index.html">
                        <div className="peers ai-c fxw-nw">
                            <div className="peer">
                                <div className="logo">
                                    <img src={headerLogo} alt="" />
                                </div>
                            </div>
                            <div className="peer peer-greed">
                                <h5 className="lh-1 mB-0 logo-text">Adminator</h5>
                            </div>
                        </div>
                        </a>
                    </div>
                    <div className="peer">
                        <div className="mobile-toggle sidebar-toggle">
                            <a href="" className="td-n">
                                <i className="ti-arrow-circle-left"></i>
                            </a>
                        </div>
                    </div>
                    </div>
                </div>

                <ul className="sidebar-menu scrollable pos-r">
                    <li className="nav-item mT-30 ">
                        <NavLink className={({ isActive }) => 
                            [
                            "sidebar-link",
                            isActive ? "actived" : null
                            ].filter(Boolean).join(" ")
                        } to="/">
                            <span className="icon-holder">
                            <i className="c-blue-500 ti-home"></i>
                            </span>
                            <span className="title">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => 
                            [
                            "sidebar-link",
                            isActive ? "actived" : null
                            ].filter(Boolean).join(" ")
                        } to='/users'>
                            <span className="icon-holder">
                            <i className="c-brown-500 ti-email"></i>
                            </span>
                            <span className="title">Users</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => 
                            [
                            "sidebar-link",
                            isActive ? "actived" : null
                            ].filter(Boolean).join(" ")
                        } to='/companies'>
                            <span className="icon-holder">
                            <i className="c-brown-500 ti-email"></i>
                            </span>
                            <span className="title">Companies</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar