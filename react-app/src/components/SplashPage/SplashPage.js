import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

function SplashPage(){
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    if (sessionUser) return <Redirect to="/" />;

    const demoLogin = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));

    };

    return(<>
        <div><a href="/login">Log In</a></div>
        <div><a href="/signup">Sign Up</a></div>
        <div><button onClick={demoLogin}>Demo User</button></div>
    </>)
}

export default SplashPage;