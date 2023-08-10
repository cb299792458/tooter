import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchFollowing, fetchUser, getFollowing, getUser } from "../../store/user";

function Following(){
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector((state)=>state.session.user);
    const following = useSelector(getFollowing());

    useEffect(()=>{
        dispatch(fetchUser(userId));
        dispatch(fetchFollowing(userId));
    },[dispatch,userId])

    return <div id="following">
        {user && <div id="user_bar">
            <div id="back_button">
                <a href={`/user/${userId}`}>
                    <svg viewBox="0 0 24 24"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path></g></svg>
                </a>
            </div>
            <div id="user_info">
                <h4>{user.name}</h4>
                <h6>@{user.username}</h6>
            </div>
        </div>}
        <div>
            <span><a href={`/user/${userId}/followers`}>Followers</a></span>
            <span style={{fontWeight: "bold"}}>Following</span>
        </div>
        <div id="following_list">
            {following && following.map((user) => {
                return <div id="follow_banner" key={user.id}>
                    <img src={user.picture} alt='' id="small_picture"/>
                    <div id="description">
                        <h6>{user.name}</h6>
                        <span>@{user.username}</span>
                    </div>
                    <div>
                        {sessionUser && user.followers.includes(sessionUser.id) ? 'Following' : 'Follow'}
                    </div>
                </div>
            })}
        </div>
    </div>

}

export default Following;