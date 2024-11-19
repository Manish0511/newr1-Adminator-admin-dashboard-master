import { Outlet } from "react-router-dom";
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import { useState } from "react";

const Index = () => {
    const [ isActiveCollapse, setIsActiveCollapse ] = useState(false)
    const toggleSidebar = (e) => {
        e.preventDefault();
        setIsActiveCollapse(!isActiveCollapse)
        // Simulate a sidebar toggle and trigger a window resize event after 300ms
        setTimeout(() => {
          // Trigger a window resize event
          window.dispatchEvent(new Event('resize'));
        }, 300); // Adjust the delay according to the sidebar's animation duration
    }
    return (
        <div className={isActiveCollapse ? 'app is-collapsed' : 'app'}>
            {/* <div id='loader'>
                <div className="spinner"></div>
            </div> */}
            <div>
                <Sidebar />
                <div className="page-container">
                    <Topbar handleSidebarToggle={toggleSidebar} />
                    <main className='main-content bgc-grey-100'>
                        <div id='mainContent'>
                            {/* <div className="container-fluid"> */}
                                <Outlet />
                            {/* </div>   */}
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
export default Index