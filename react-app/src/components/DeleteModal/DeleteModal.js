import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";


function DeleteModal({toot}){
    const history = useHistory();
    const {closeModal} = useModal();
    const handleSubmit = async function(e){
        e.preventDefault();

        const res = await fetch(`/api/toots/${toot.id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })


        if(res.ok){
            closeModal();
            history.push(`/user/${toot.author.id}`);
            window.location.reload();
        }
    }

    return <div id="toot-bar" onClick={handleSubmit}>
        <h3>🔄Delete this toot? &nbsp;</h3>
        <button type="submit" id="small-blue-button">Delete</button>
    </div>
}

export default DeleteModal;