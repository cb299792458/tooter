import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchToots, getToots } from "../../store/toot";
function Home(){
    const toots = useSelector(getToots);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchToots());
    },[dispatch]);

    const [text,setText] = useState('');

    const sessionUser = useSelector((state) => state.session.user);
    if(!sessionUser) return <Redirect to="/splashpage" />

    const handleSubmit = async function(e){
        e.preventDefault();
        if(text){
    
            const res = await fetch('/api/toots/new', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({text: text})
            });
    
            if(res.ok){
                setText("");
                dispatch(fetchToots())
            }
        } else {
            alert('There is an issue with your upload. Check the error messages at the bottom of the form.')
        }
    }

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
                    <span>All Toots | Following</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={text} placeholder="Write a toot..." 
                    onChange={(e)=>setText(e.target.value)} size={70}/>
                    <button type="submit">Toot!</button>
                </form>
                <div>
                    {toots.map((toot)=>{
                        return <div key={toot.id}>{toot.text}</div>
                    })}
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