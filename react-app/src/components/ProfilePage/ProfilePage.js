import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, getUser } from "../../store/user";
import { fetchToots, getToots } from "../../store/toot";
import Toot from "../Toot";
import bird from "../../bird.gif";
import OpenModalButton from "../OpenModalButton";
import EditProfileModal from "../EditProfileModal";
import MessageModal from "../MessageModal";

function ProfilePage(){
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector((state)=>state.session.user);
    const toots = useSelector(getToots);
    const [TOOTS, RETOOTS, MENTIONS, LIKES] = ['toots','retoots','mentions','likes'];
    const [focus, setFocus] = useState(TOOTS);

    useEffect(()=>{
        dispatch(fetchUser(userId));
    },[dispatch,userId])
    useEffect(()=>{
        dispatch(fetchToots());
    },[dispatch])

    async function toggleFollow(e){
        e.preventDefault();
        const res = await fetch('/api/follows', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({follower: sessionUser.id, followee: userId})
        });

        if(res.ok){
            window.location.reload(); 
        }
    }
    function likers(toot){
        const res=[];
        for(let like of toot.likes) res.push(like.liker_id);
        return res;
    }

    return <div id="user_page">
        {user && <>
            <div id="banner">
                <div style={{height:200, maxWidth:600, backgroundColor: 'lightgray'}} />
                <img src={user.picture} alt='' id="picture"/>
                <div id="profile_options">{user.id===sessionUser.id ? <OpenModalButton id="white-button" buttonText={'<div>Edit Profile</div>'} modalComponent={<EditProfileModal />}/> :
                    <div id="message-follow">
                        <OpenModalButton id="blue-button" buttonText={'<span>Message</span>'} modalComponent={<MessageModal user={user}/>} />

                        {/* <div id="blue-button" onClick={()=>alert('Coming soon!')}><span>Message</span></div> */}
                        <div onClick={toggleFollow} id="blue-button">
                            <span>{user.followers.includes(sessionUser.id) ? 'Following' : 'Follow'}</span>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div id="description">
                <h5>{user.name}</h5>
                <span>@{user.username}</span>
                <div id="follows">
                    <p>{user.followees.length} <span><a href={`/user/${userId}/following`}>Following</a></span> {user.followers.length} <span><a href={`/user/${userId}/followers`}>Followers</a></span></p>
                </div>
            </div>
            <div id="toot_tabs">
                
                <div id="tab" onClick={()=>setFocus(TOOTS)}><h4 id={focus===TOOTS ? 'focus' : ''}>Toots</h4></div>
                <div id="tab" onClick={()=>setFocus(RETOOTS)}><h4 id={focus===RETOOTS ? 'focus' : ''}>Retoots</h4></div>
                <div id="tab" onClick={()=>setFocus(MENTIONS)}><h4 id={focus===MENTIONS ? 'focus' : ''}>Mentions</h4></div>
                <div id="tab" onClick={()=>setFocus(LIKES)}><h4 id={focus===LIKES ? 'focus' : ''}>Likes</h4></div>
            </div>
            <div>
                {!toots.length && <div id="loading"><h4>Please Wait...Preparing Toots!</h4><img src={bird} alt="Loading..."/></div>}
                {focus===TOOTS && (toots && toots
                    .filter((toot)=>toot.author.id===parseInt(userId))
                    .filter((toot)=>!toot.original)
                    .length===0 && toots.length ? ('Sorry, no toots here...😔') : toots
                    .filter((toot)=>!toot.original)
                    .filter((toot)=>toot.author.id===parseInt(userId))
                    .sort((a,b)=>Date.parse(b.time)-Date.parse(a.time))
                    .map((toot)=>{return <Toot toot={toot} showReplying={true} key={toot.id}/>})
                )}
                {focus===RETOOTS && (toots && toots
                    .filter((toot)=>toot.author.id===parseInt(userId))
                    .filter((toot)=>toot.original)
                    .length===0 && toots.length ? ('Sorry, no toots here...😔') : toots
                    .filter((toot)=>toot.original)
                    .filter((toot)=>toot.author.id===parseInt(userId))
                    .sort((a,b)=>Date.parse(b.time)-Date.parse(a.time))
                    .map((toot)=>{return <Toot toot={toot} showReplying={true} key={toot.id}/>})
                )}
                {focus===MENTIONS && (toots && toots
                    .filter((toot)=>toot.mentions.includes(user.username))
                    .length===0 && toots.length ? 'Sorry, no toots here...😔' : toots
                    .filter((toot)=>toot.mentions.includes(user.username))
                    .sort((a,b)=>Date.parse(b.time)-Date.parse(a.time))
                    .map((toot)=>{return <Toot toot={toot} showReplying={true} key={toot.id}/>})
                )}
                {focus===LIKES && (toots && toots
                    .filter((toot)=>likers(toot).includes(parseInt(userId)))
                    .length===0 && toots.length ? 'Sorry, no toots here...😔' : toots
                    .filter((toot)=>likers(toot).includes(parseInt(userId)))
                    .sort((a,b)=>Date.parse(b.time)-Date.parse(a.time))
                    .map((toot)=>{return <Toot toot={toot} key={toot.id}/>}
                ))}
            </div>

        </>}
    </div>
}

export default ProfilePage;