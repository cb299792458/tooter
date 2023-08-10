import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { authenticate } from "./store/session";
// import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import TootPage from "./components/TootPage";
import SplashPage from "./components/SplashPage";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar"
import Search from "./components/Search";
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import Followers from "./components/Followers";
import Following from "./components/Following";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      <div id="app">
        <LeftBar />
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
                <Route path="/user/:userId/followers">
                    <Followers />
                </Route>
                <Route path="/user/:userId/following">
                    <Following />
                </Route>
                <Route path="/user/:userId">
                    <ProfilePage />
                </Route>
                <Route path="/search/:query">
                    <Search />
                </Route>
                <Route path="/splashpage">
                    <SplashPage />
                </Route>
                <Route path="/">
                    <Redirect to='/home' />
                </Route>
            </Switch>
        )}
        <RightBar />
      </div>
    </>
  );
}

export default App;
