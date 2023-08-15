import React from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

function RetootModal({original}){
    const sessionUser = useSelector(state=>state.session.user);
    const {closeModal} = useModal();
    const handleSubmit = async function(e){
        e.preventDefault();

        const res = await fetch('/api/toots/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: 'this is a retoot', author_id: sessionUser.id, parent_id: null, original_id: original.id})
        });
        
        if(res.ok){
            closeModal();
            window.location.reload();
        }

    }

    return <div id="toot-bar" onClick={handleSubmit}>
        <h3>🔄Retoot this toot? &nbsp;</h3>
        <button type="submit" id="small-blue-button">Retoot</button>
    </div>
}

export default RetootModal;