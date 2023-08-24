import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import send from "./send.png"

function MessageModal({user}){
    const [text,setText] = useState('');
    const sessionUser = useSelector(state=>state.session.user);
    const {closeModal} = useModal();

    const handleSubmit = async function(e){
        e.preventDefault();
        if(text){
            const res = await fetch('/api/messages/new', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({text: text, sender_id: sessionUser.id, receiver_id: user.id})
            });
            
            if(res.ok){
                closeModal();
                window.location.reload();
            }
        } else {
            alert('There is an issue with your upload. Check the error messages at the bottom of the form.')
        }
    }

    return <div id="message_form">
        <div id="message-top">
            <img src={sessionUser.picture} id="small_picture" alt='your profile pic'/>
            <img src={send} id="small_picture" alt="send"/>
            <img src={user.picture} id="small_picture" alt='their profile pic'/>
            <h3>Message {user.name}</h3>
        </div>
        <form onSubmit={handleSubmit} id="toot-bar">
            <input type="text" value={text} placeholder="Write your Message"
            onChange={(e)=>setText(e.target.value)} size={60}/>
            <button type="submit" id="small-blue-button">Send</button>
        </form>
    </div>
}

export default MessageModal;