import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
function Home(){
    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Redirect to="/splashpage" />
    return(
        <div id="home">
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
            <main>
                <h2>Home</h2>
                <div>
                    <span>All Toots </span><span> Following</span>
                </div>
            </main>
            <div id="right-bar">
                <input type="search" placeholder="Search Tooter"></input>
                <div>Get Verified</div>
                <div>What's Happening</div>
                <div>Who to Follow</div>
                <div>Footer</div>
            </div>
        </div>
    )
}

export default Home;