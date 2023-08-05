import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import TootPage from "./components/TootPage";
import SplashPage from "./components/SplashPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import { Redirect } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id="app">
        <div id="left-bar">
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
            <div>Account Switcher</div>
        </div>
        {isLoaded && (
          <Switch>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/toot/:tootId">
              <TootPage />
            </Route>
            <Route path="/splashpage">
              <SplashPage />
            </Route>
            <Route path="/">
              <Redirect to='/home' />
            </Route>
          </Switch>
        )}
        <div id="right-bar">
          <input type="search" placeholder="Search Tooter"></input>
          <div>Get Verified</div>
          <div>What's Happening</div>
          <div>Who to Follow</div>
          <div>Footer</div>
        </div>
      </div>
    </>
  );
}

export default App;
