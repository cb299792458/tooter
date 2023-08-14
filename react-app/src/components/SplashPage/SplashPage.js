import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import splash from "./splash.png"
import blueicon from "./blueicon.png"

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
            <img src={blueicon} alt="blueicon" height="200px" width="200px"/>
            <h1>Tutoring now</h1>
            <h3>Join Tootr today.</h3>
            <div id="links">
                <a href="/" onClick={demoLogin} id="white-button">Demo User</a>
                <a href="/signup" id="blue-button">Sign Up</a>
                <a href="/login" id="white-button">Log In</a>
            </div>
        </div>
    </div>
}

export default SplashPage;