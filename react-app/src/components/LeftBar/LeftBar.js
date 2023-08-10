import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";

function LeftBar(){
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    const handleLogout = (e) => {
      e.preventDefault();
      dispatch(logout());
    };

    return <div id="left-holder">
        {sessionUser && <div id="left-bar">
            <a href="/"><div>Small Icon</div></a>
            <a href="/"><p>Home</p></a>
            <p>Explore</p>
            <p>Notifications</p>
            <p>Messages</p>
            <p>Lists</p>
            <p>Bookmarks</p>
            <p>Communities</p>
            <p>Verified</p>
            <p>Profile</p>
            <p>More</p>

            <div>Post</div>
            <div onClick={handleLogout}>Log Out</div>
        </div>}
    </div>
    
}

export default LeftBar;