import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import splash from "./splash.png"

function SplashPage(){
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    if (sessionUser) return <Redirect to="/" />;

    const demoLogin = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));
    };

    return <div id="splash">
        <img src={splash} alt="splash"/>
        <div>
            <h1>Happening now</h1>
            <h3>Join Tootr today.</h3>
            <a href="/login">Log In</a>
            <a href="/signup">Sign Up</a>
            <a href="/" onClick={demoLogin}>Demo User</a>
        </div>
    </div>
}

export default SplashPage;