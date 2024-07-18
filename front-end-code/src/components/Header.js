import { LOGO_URL } from "../utils/constants";
import '../App.css';
const Header = () => {

    return (
        <div className="header-container">
            <div>
                <img style={{maxHeight: '10vh'}} src={LOGO_URL}/>
            </div>
            <div>
                <h1>Foodie Delight</h1>
            </div>
            <div>
                <h5>Vinay Kumar B R</h5>
            </div>
        </div>
    )
}

export default Header;