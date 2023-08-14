import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import icon from "../../icon.png";
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
            <a href="/"><img src={icon} alt="icon" height={50} width={50}/></a>
            <a href="/"><p>🏠Home</p></a>
            <a href="/search/t=tooter"><p>👩‍🏫Find Tutors</p></a>
            <a href="/search/t=tootee"><p>🧑‍🎓Find Students</p></a>
            <p onClick={()=>alert('Coming soon!')}>✉️Messages</p>
            <a href={`/user/${sessionUser.id}`}><p>👤Profile</p></a>
            <a href="https://twitter.com/"><p>🤮X (fka Twitter)</p></a>
            <a href="https://github.com/cb299792458/tooter"><p>🖥️GitHub</p></a>
            <a href="https://tinyurl.com/brian-lam"><p>📁My Portfolio</p></a>

            {/* <div>Post</div>*/}
            <OpenModalButton buttonText="Toot" modalComponent={<TootModal/>} />

            <div onClick={handleLogout}>Log Out</div>
        </div>}
    </div>
    
}

export default LeftBar;