import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import "../../css/Home/HomeNav.css";
import db, { auth, provider } from "../../firebase";

const HomeNav = ({browse, home, course}) => {

    const history = useHistory();

    const googleLogin = () => {
        auth.signInWithPopup(provider).catch(err => alert(err.message));
    }

    const user = useSelector(state => state.User.user);

    const logoutGoogle = () => {
        auth.signOut().catch(err => alert(err.message));
    }

    return (
        <div className="homeNav">
            <div className="homeNav__left">
                <img onClick={() => history.push("/")} src="/logo.png" alt="logo"/>
            </div>
            
            {home && <div className="homeNav__right">
            <button onClick={!user ? googleLogin : logoutGoogle} className="homeNav__button btn--blue text-poppins">{user ? "Logout" : "Login"}</button>
            <button onClick={() => history.push("/courses")} className="homeNav__button btn--primary text-poppins"> <span>Browse Courses</span></button>
            {user && <Avatar src={user.profile} style={{marginLeft: "20px", marginTop: "7px"}} />}
        </div>}

            {browse && <div className="homeNav__right">
            <button onClick={() => history.push("/create")} className="homeNav__button btn--blue text-poppins">Publish Your Course</button>
            <button onClick={() => history.push("/courses")} className="homeNav__button btn--primary text-poppins"> <span>Browse Courses</span></button>
            {user && <Avatar src={user.profile} style={{marginLeft: "20px", marginTop: "7px"}} />}
        </div>}

        {course && <div className="homeNav__right">
        <button onClick={() => history.push("/courses")} className="homeNav__button btn--primary text-poppins"> <span>Browse Courses</span></button>
        {user && <Avatar src={user.profile} style={{marginLeft: "20px", marginTop: "7px"}} />}
    </div>}
            
        </div>
    );
}

export default HomeNav;
