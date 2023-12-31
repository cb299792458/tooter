import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

function ReplyModal({parent,setReplies}){
    const [text,setText] = useState('');
    const sessionUser = useSelector(state=>state.session.user);
    const {closeModal} = useModal();
    const handleSubmit = async function(e){
        e.preventDefault();
        if(text){
            const res = await fetch('/api/toots/new', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({text: text, author_id: sessionUser.id, parent_id: parent.id})
            });
            
            if(res.ok){

                setReplies(r=>r+1);
                closeModal();
            }
        } else {
            alert('There is an issue with your upload. Check the error messages at the bottom of the form.')
        }
    }

    return <div id="reply_form">
        <img src={sessionUser.picture} id="small_picture" alt='your profile pic'/>
        <form onSubmit={handleSubmit} id="toot-bar">
            <input type="text" value={text} placeholder="Post your reply!"
            onChange={(e)=>setText(e.target.value)} size={60}/>
            <button type="submit" id="small-blue-button">Reply</button>
        </form>
    </div>
}

export default ReplyModal;