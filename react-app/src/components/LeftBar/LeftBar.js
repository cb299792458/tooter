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

    return <>
        {sessionUser && <div id="left-bar">
            <div>Small Icon</div>
            <p>Home</p>
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
    </>
    
}

export default LeftBar;