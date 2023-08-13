import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";

function TootModal(){
    const [text, setText] = useState('');
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
                body: JSON.stringify({text: text, author_id: sessionUser.id})
            });
            
            if(res.ok){
                closeModal();
                window.location.reload(false);
            }
        } else {
            alert('There is an issue with your upload. Check the error messages at the bottom of the form.')
        }
    }

    return <div id="toot_form">
        <img src={sessionUser.picture} id="small_picture" alt='your profile pic'/>
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} placeholder="Toot something!"
            onChange={(e)=>setText(e.target.value)} size={60}/>
            <button type="submit">Toot</button>
        </form>
    </div>
}

export default TootModal;