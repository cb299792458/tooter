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

    return <div id="user_page">
        {user && <>
            <div id="banner">
                <img src={user.picture} alt='' id="picture"/>
                <div>{user.id===sessionUser.id ? <div>Edit Profile</div> :
                    <>
                        <div>Message</div>
                        <div>
                            {user.followers.includes(sessionUser.id) ? 'Following' : 'Follow'}
                        </div>
                    </>}
                </div>
            </div>
            <div id="description">
                <h6>{user.name}</h6>
                <span>@{user.username}</span>
                <div id="follows">
                    <p>{user.followees.length} Following {user.followers.length} Followers</p>
                </div>
            </div>
            <h4>Toots</h4>
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