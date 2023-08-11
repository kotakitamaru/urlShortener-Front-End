import "./ProfileDropdown.css"
import {Link} from "react-router-dom";
import {useSetToken, useSetUsername, useUsername} from "../contexts/authProvider";
function ProfileDropdown()
{
    const username = useUsername();
    const setUsername = useSetUsername();
    const setToken = useSetToken();
    const logOut = () => {
        setUsername(null);
        setToken(null);
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
    }

    return <div className="dropdown">
        <div id="profile" className="profile">{username?username:"Guest"}</div>
        <div className="dropdownContent">
            {username?
                <>
                    <Link className="dropdownLink" to="login" onClick={logOut}>LogOut</Link>
                </>:
                <>
                    <Link className="dropdownLink" to="login">Log In</Link>
                    <Link className="dropdownLink" to="signup">Sign Up</Link>
                </>
            }
        </div>
    </div>
}

export default ProfileDropdown;