import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import icon from "../../blueicon.png";
import OpenModalButton from "../OpenModalButton";
import TootModal from "../TootModal";

function LeftBar(){
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/');
    };

    return <div id="left-holder">
        {sessionUser && <div id="left-bar">
            <a href="/"><img src={icon} alt="icon" height={50} width={50} id="icon"/></a>
            <a href="/"><h4> &nbsp; 🏠 Home</h4></a>
            <a href="/search/t=tooter"><h4> &nbsp; 👩‍🏫 Find Tutors</h4></a>
            <a href="/search/t=tootee"><h4> &nbsp; 🧑‍🎓 Find Students</h4></a>
            <h4 onClick={()=>alert('Coming soon!')}> &nbsp; ✉️ Messages</h4>
            <a href={`/user/${sessionUser.id}`}><h4> &nbsp; 👤 Profile</h4></a>
            <a href="https://twitter.com/"><h4> &nbsp; 🤮 X (fka Twitter)</h4></a>
            <a href="https://github.com/cb299792458/tooter"><h4> &nbsp; 🖥️ GitHub</h4></a>
            <a href="https://tinyurl.com/brian-lam"><h4> &nbsp; 📁 My Portfolio</h4></a>

            {/* <div>Post</div>*/}
            <br></br>
            <OpenModalButton buttonText="Toot" id="blue-button" modalComponent={<TootModal/>}/>

            <div onClick={handleLogout} style={{marginTop:"20px"}}id="white-button">Log Out</div>
        </div>}
    </div>
    
}

export default LeftBar;