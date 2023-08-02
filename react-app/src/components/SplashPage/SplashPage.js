import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function SplashPage(){
    const sessionUser = useSelector((state) => state.session.user);
    if (sessionUser) return <Redirect to="/" />;
    return(<>
        <div><a href="/login">Log In</a></div>
        <div><a href="/signup">Sign Up</a></div>
        <div>Demo User</div>
    </>)
}

export default SplashPage;