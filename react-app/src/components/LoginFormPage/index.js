import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import splash from "../SplashPage/splash.png"
import blueicon from "../SplashPage/blueicon.png"

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div id="splash">
        <img src={splash} alt="splash"/>
        <div>
            <img src={blueicon} alt="blueicon" height="200px" width="200px"/>
            <h1>Tutoring now</h1>
            <h3>Log In</h3>
            <form onSubmit={handleSubmit} id="auth-form">
                <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                </ul>
                <label>
                Email
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </label>
                <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </label>
                <button type="submit" id="blue-button">Log In</button>
            </form>
        </div>
    </div>
  );
}

export default LoginFormPage;
