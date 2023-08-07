import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Toot from "../Toot/Toot";
import { fetchToot, getToot, fetchReplies, getToots, fetchParent, getParent } from "../../store/toot";

function TootPage(){
    const dispatch = useDispatch();
    const {tootId} = useParams();
    const toot = useSelector(getToot(tootId));
    const replies = useSelector(getToots);
    const parent = useSelector(getParent());
    const scrollTarget = useRef(null);

    useEffect(()=>{
        dispatch(fetchToot(tootId));
        dispatch(fetchReplies(tootId))
    },[dispatch,tootId])
    useEffect(()=>{
        if(toot) dispatch(fetchParent(toot.parent_id))
    },[dispatch,toot])


    function scroll(){
        if(scrollTarget.current){
            scrollTarget.current.scrollIntoView({
                behavior: 'auto',
                block: 'start'
            });
        }
        return ''
    }
    useEffect(()=>{
        scroll();
    },[scrollTarget.current])

    const sessionUser = useSelector(state=>state.session.user);
    const [text,setText] = useState('');
    const handleSubmit = async function(e){
        e.preventDefault();
        if(text){
            const res = await fetch('/api/toots/new', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({text: text, author_id: sessionUser.id, parent_id:tootId})
            });
            
            if(res.ok){
                setText("");
                dispatch(fetchReplies(tootId))
            }
        } else {
            alert('There is an issue with your upload. Check the error messages at the bottom of the form.')
        }
    }

    return(
        <div id="toot_page">
            {parent && <Toot toot={parent}/>}
            {toot && <Toot ref={scrollTarget} toot={toot}/>}
            <div id="reply_form">
                <img src={sessionUser.picture} id="picture" alt='your profile pic'/>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={text} placeholder="Post your reply!"
                    onChange={(e)=>setText(e.target.value)} size={60}/>
                    <button type="submit">Reply</button>
                </form>
            </div>
            {replies && replies.filter(reply=>reply.id!==parseInt(tootId)).map((reply)=>{
                return <Toot toot={reply} key={reply.id}/>
            })}
        </div>
    )
}

export default TootPage;