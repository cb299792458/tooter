import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import TootPage from "./components/TootPage";
import SplashPage from "./components/SplashPage";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar"
import { authenticate } from "./store/session";
// import Navigation from "./components/Navigation";
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
              <>
                <Home />
              </>
            </Route>
            <Route path="/toot/:tootId">
              <>
                {/* <LeftBar /> */}
                <TootPage />
                {/* <RightBar /> */}
              </>
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
