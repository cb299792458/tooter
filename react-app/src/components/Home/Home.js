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
    const [onlyFollows,setOnlyFollows] = useState(false);

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

    function filterToots(toot){
        if(!onlyFollows) return toot.parent_id===null;
        if(toot.author_id===sessionUser.id) return true;
        return toot.parent_id===null && sessionUser.followees.includes(toot.id)
    }

    return(
        <div id="home">
            <h4>Home</h4>
            <div id="follow_bar">
                <span onClick={()=>setOnlyFollows(false)} style={onlyFollows ? {} : {fontWeight: "bold"}} >All Toots</span>
                <span onClick={()=>setOnlyFollows(true)} style={onlyFollows ? {fontWeight: "bold"} : {}} >Following</span>
            </div>
            <div id="toot_form">
            <img src={sessionUser.picture} id="picture" alt='your profile pic'/>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={text} placeholder="Write a toot..." 
                    onChange={(e)=>setText(e.target.value)} size={60}/>
                    <button type="submit">Toot!</button>
                </form>
            </div>
            <div>
                {toots
                    // .filter((toot)=>toot.parent_id===null)
                    .filter(filterToots)
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