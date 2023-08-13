import React from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function RetootModal({original}){
    const sessionUser = useSelector(state=>state.session.user);
    const {closeModal} = useModal();
    const history = useHistory();
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
            history.push(`/user/${sessionUser.id}`);
        }

    }

    return <div id="retoot_form" onClick={handleSubmit}>
        <p>🔄Retoot this toot?</p>
        <button type="submit">Retoot</button>
    </div>
}

export default RetootModal;