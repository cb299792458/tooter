import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchFollowers, fetchUser, getFollowers, getUser } from "../../store/user";

function Followers(){
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector((state)=>state.session.user);
    const followers = useSelector(getFollowers());

    useEffect(()=>{
        dispatch(fetchUser(userId));
        dispatch(fetchFollowers(userId));
    },[dispatch,userId])
    
    function toggleFollowUser(id){
        return async function toggleFollow(e){
            e.preventDefault();
            const res = await fetch('/api/follows', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({follower: sessionUser.id, followee: id})
            });
    
            if(res.ok){
                window.location.reload(); 
            }
        }
    }


    return <div id="followers">
        {user && <div id="user_bar">
            <div id="back_button">
                <a href={`/user/${userId}`}><h2>⬅️</h2></a>
            </div>
            <div id="user_info">
                <h5>{user.name}</h5>
                <p id="username">@{user.username}</p>
            </div>
        </div>}
        <div id="follow-type">
            <div id="half">
                <span style={{fontWeight: "bold"}}>Followers</span>
            </div>
            <div id="half">
                <span><a href={`/user/${userId}/following`}>Following</a></span>
            </div>
        </div>
        <div id="follower_list">
            {followers && followers.map((user) => {
                return <div id="follow_banner" key={user.id}>
                    <a href={`/user/${user.id}`}>
                        <div id="follow-badge">
                            <img src={user.picture} alt='' id="small_picture"/>
                            <div id="user_info">
                                <h6>{user.name}</h6>
                                <p id="username">@{user.username}</p>
                            </div>

                        </div>
                    </a>
                    <div>
                        {sessionUser && sessionUser.id!==user.id && <span id="small-blue-button" onClick={toggleFollowUser(user.id)}>
                            {user.followers.includes(sessionUser.id) ? <p>Following</p> : <p>Follow</p>}
                        </span>}
                    </div>
                </div>
            })}
        </div>
    </div>

}

export default Followers;