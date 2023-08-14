import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

function EditProfileModal(){
    const sessionUser = useSelector(state=>state.session.user);
    const {closeModal} = useModal();
    const [username, setUsername] = useState(sessionUser.username);
    const [name, setName] = useState(sessionUser.name);
    const [picture, setPicture] = useState(sessionUser.picture);

    const handleSubmit = async function(e){
        e.preventDefault();
        const res = await fetch('/api/users/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: sessionUser.id,
                username: username,
                name: name,
                picture: picture,
            })
        });

        if(res.ok){
            closeModal();
            window.location.reload();
        } else {
            alert('There was an error with your parameters.');
            console.log(res);
        }
    }

    return <div id="edit_modal">
        {/* eslint-disable-next-line */}
        <img alt='Picture Not Found' src={picture} id="big_picture"/>
        <form id="profile_form" onSubmit={handleSubmit}>
            <label>
                Username: (warning: exising mentions will not be updated)
                <input type="text" value={username} onChange={e=>setUsername(e.target.value)} />
            </label>
            <label>
                Display Name: 
                <input type="text" value={name} onChange={e=>setName(e.target.value)} />
            </label>
            <label>
                Profile Picture URL: 
                <input type="text" value={picture} onChange={e=>setPicture(e.target.value)} />
            </label>
            <p>Tootr recommends using a square picture centered on your face.</p>
            <p>To change email or password, please contact the Administrator.</p>
            <button type="submit">Edit Profile</button>
        </form>
    </div>

}

export default EditProfileModal;