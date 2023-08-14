import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { fetchByUsername, getUserByUsername } from "../../store/user";
import { fetchToots, getToots } from "../../store/toot";
import Toot from "../Toot";
import bird from "../../bird.gif";

function Search(){
    let {query} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(getUserByUsername(query.slice(2)));
    const toots = useSelector(getToots);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    useEffect(()=>{
        dispatch(fetchToots());
    },[dispatch]);
    useEffect(()=>{
        dispatch(fetchByUsername(query.slice(2)));
    },[dispatch,query])

    if(query.slice(0,2)==='u=') return <>{user && <Redirect to={`/user/${user.id}`} />}</>
    if(query.slice(0,2)==='t=') query=query.slice(2).toLowerCase();

    return <div id="search">
        <div id="nav">
            <a href={`/`}><h2>⬅️</h2></a>
            <h3>Toots with the tag <span style={{fontWeight:'700'}}>#{query}</span></h3>
        </div>
        <div>
            {!toots.length && <div id="loading"><h4>Please Wait...Preparing Toots!</h4><img src={bird} alt="Loading..."/></div>}

            {toots
                .filter((toot)=>toot.tags.includes(query))
                .length===0 && toots.length ? 'Sorry, no toots here...😔' : toots
                .filter((toot)=>toot.tags.includes(query))
                .toSorted((a,b)=>Date.parse(b.time)-Date.parse(a.time))
                .map((toot)=>{
                    return <Toot toot={toot} key={toot.id}/>
                }
            )}
        </div>
    </div>
}

export default Search;