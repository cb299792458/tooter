import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchToots, getToots } from "../../store/toot";
import Toot from "../Toot";
import bird from "../../bird.gif";

function Home(){
    const toots = useSelector(getToots);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchToots());
    },[dispatch]);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const [text,setText] = useState('');
    const [onlyFollows,setOnlyFollows] = useState(true);

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

        return toot.parent_id===null && sessionUser.followees.includes(toot.author_id)
    }

    return(
        <div id="home">
            <h5>Home</h5>
            <div id="follow_bar">
                <div id="half" onClick={()=>setOnlyFollows(false)}>
                    <span style={onlyFollows ? {} : {fontWeight: "bold"}} >All Toots</span>
                </div>
                
                <div id="half" onClick={()=>setOnlyFollows(true)}>
                    <span style={onlyFollows ? {fontWeight: "bold"} : {}} >Following</span>
                </div>
            </div>
            <div id="toot_form">
                <a href={`/user/${sessionUser.id}`}>
                    <img src={sessionUser.picture} id="small_picture" alt='your profile pic'/>
                </a>
                <form onSubmit={handleSubmit} id="toot-bar">
                    <input type="text" value={text} placeholder="Write a toot..." 
                    onChange={(e)=>setText(e.target.value)}/>
                    <button type="submit" id="small-blue-button"><p>Toot</p></button>
                </form>
            </div>
            <div>
                {!toots.length && <div id="loading"><h4>Please Wait...Preparing Toots!</h4><img src={bird} alt="Loading..."/></div>}
                {toots
                    .filter(filterToots)
                    .toSorted((a,b)=>Date.parse(b.time)-Date.parse(a.time))
                    .map((toot)=>{
                        return <Toot toot={toot} key={toot.id} />
                    }
                )}
            </div>
        </div>
    )
}

export default Home;