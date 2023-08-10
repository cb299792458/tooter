import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUser, getUser } from "../../store/user";
import { fetchToots, getToots } from "../../store/toot";
import Toot from "../Toot";

function ProfilePage(){
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector((state)=>state.session.user);
    const toots = useSelector(getToots);

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

    return <div id="user_page">
        {user && <>
            <div id="banner">
                <div style={{height:200, maxWidth:600, backgroundColor: 'lightgray'}} />
                <img src={user.picture} alt='' id="picture"/>
                <div id="profile_options">{user.id===sessionUser.id ? <div>Edit Profile</div> :
                    <div id="profile_options">
                        <div>Message</div>
                        <div>
                            <span onClick={toggleFollow}>{user.followers.includes(sessionUser.id) ? 'Following' : 'Follow'}</span>
                        </div>
                    </div>}
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
                <h4>Toots</h4>
                <h4>Retoots</h4>
                <h4>Mentions</h4>
                <h4>Likes</h4>
            </div>
            <div>
                {toots && toots
                    .filter((toot)=>toot.author.id===parseInt(userId))
                    .sort((a,b)=>Date.parse(b.time)-Date.parse(a.time))
                    .map((toot)=>{
                        return <Toot toot={toot} key={toot.id}/>
                    }
                )}
            </div>

        </>}
    </div>
}

export default ProfilePage;