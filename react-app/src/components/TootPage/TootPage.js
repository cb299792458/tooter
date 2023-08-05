import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Toot from "../Toot/Toot";
import { fetchToot, getToot, fetchReplies, getToots } from "../../store/toot";

function TootPage(){
    const dispatch=useDispatch();
    const {tootId}=useParams();
    const toot=useSelector(getToot(tootId));
    const replies=useSelector(getToots);

    useEffect(()=>{
        dispatch(fetchToot(tootId));
        dispatch(fetchReplies(tootId))
    },[dispatch,tootId])

    return(
        <div id="toot_page">
            {toot && <Toot toot={toot} />}
            {replies && replies.filter(reply=>reply.id!==parseInt(tootId)).map((reply)=>{
                return <Toot toot={reply} key={reply.id}/>
            })}
        </div>
    )
}

export default TootPage;