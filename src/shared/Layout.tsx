import { Outlet, Link } from "react-router-dom";
import "./Layout.css"
import ProfileDropdown from "./ProfileDropdown";

function Layout(){
    return (<>
            <div className="Header">
                <div className="navBar">
                    <Link className="navLink" to="/">Home</Link>
                    <Link className="navLink" to="table">URL Table</Link>
                </div>
                <div className="leftSideHeader">
                    <ProfileDropdown/>
                </div>
            </div>
                <Outlet />
            </>)
};

export default Layout;
