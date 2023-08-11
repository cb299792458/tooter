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
                <a href={`/user/${userId}`}>
                    <svg viewBox="0 0 24 24"><g>
                        <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z">
                    </path></g></svg>
                </a>
            </div>
            <div id="user_info">
                <h4>{user.name}</h4>
                <h6>@{user.username}</h6>
            </div>
        </div>}
        <div>
            <span style={{fontWeight: "bold"}}>Followers</span>
            <span><a href={`/user/${userId}/following`}>Following</a></span>
        </div>
        <div id="follower_list">
            {followers && followers.map((user) => {
                return <div id="follow_banner" key={user.id}>
                    <a href={`/user/${user.id}`}>
                        <img src={user.picture} alt='' id="small_picture"/>
                        <div id="description">
                            <h6>{user.name}</h6>
                            <span>@{user.username}</span>
                        </div>
                    </a>
                    <div>
                        {sessionUser && sessionUser.id!==user.id && <span onClick={toggleFollowUser(user.id)}>
                            {user.followers.includes(sessionUser.id) ? 'Following' : 'Follow'}
                        </span>}
                    </div>
                </div>
            })}
        </div>
    </div>

}

export default Followers;