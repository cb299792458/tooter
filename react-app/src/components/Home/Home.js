import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchToots, getToots } from "../../store/toot";
import Toot from "../Toot";

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
                body: JSON.stringify({text: text, author_id: sessionUser.id})
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
                {toots
                    .filter((toot)=>toot.parent_id===null)
                    .sort((a,b)=>Date.parse(b.time)-Date.parse(a.time))
                    .map((toot)=>{
                        return <Toot toot={toot} key={toot.id}/>
                    }
                )}
            </div>
        </div>
    )
}

export default Home;