import "./index.css"
import ProfileDropdown from "../../shared/ProfileDropdown";
import {Link} from "react-router-dom";

function HomePage(){
    return <><ProfileDropdown/>
    <div className="mainText">
        <div className="label">Url Shortener</div>
        <div className="linksContainer">
            <Link to="table" className="link">Url Table</Link>
            <Link to="about" className="link">About</Link>
        </div>
    </div>
    </>
}
export default HomePage;