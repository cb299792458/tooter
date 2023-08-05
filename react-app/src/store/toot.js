// import csrfFetch from "./csrf";

const GET_TOOTS = '/api/toots';
const RECEIVE_TOOT = 'RECEIVE_TOOT';
const RECEIVE_REPLIES = 'RECEIVE_REPLIES';

export const getToots = ({toots}) => {
    return Object.values(toots);
}

// export const getReplies = ({tootId}) => {
//     return(
//         (store) => {
//             return store.toots[tootId]['replies'];
//         }
//     )
// }

export const getToot = (tootId) => {
    return(
        (store) => {
            return store.toots[tootId];
        }
    )
};

export const fetchToots = () => async(dispatch) => {
    let res = await fetch(GET_TOOTS);
    let toots = await res.json();
    dispatch({type: GET_TOOTS, toots})
}

export const fetchToot = (tootId) => async(dispatch) => {
    const res = await fetch(`/api/toots/${tootId}`);
    const toot = await res.json();
    dispatch( {type: RECEIVE_TOOT, toot} );
}

export const fetchReplies = (tootId) => async(dispatch) => {
    let res = await fetch(`/api/toots/${tootId}/replies`);
    let replies = await res.json();
    dispatch({type: RECEIVE_REPLIES, replies})
}

// export const deleteVideo = (videoId) => async(dispatch) => {
//     const res = await csrfFetch(`/api/videos/${videoId}`, {
//         method: 'DELETE'
//     });
//     if(res.ok){
//         dispatch({ type: REMOVE_VIDEO, videoId });
//         return res;
//     }
// }

// export const updateVideo = (video) => async(dispatch) => {
//     let res = await csrfFetch(`/api/videos/${video.id}`, {
//         method: 'PATCH',
//         headers: {'Content-Type':'application/json'},
//         body: JSON.stringify(video)
//     });
//     let newVideo = await res.json();
//     dispatch({type: RECEIVE_VIDEO, video: newVideo});
//     return res;
// }

const tootsReducer = (state = {}, action) => {
    let newState = {...state};
    switch(action.type){
        case RECEIVE_TOOT:
            newState[action.toot.id] = action.toot;
            return newState; 
        case GET_TOOTS:
            return {...state, ...action.toots};
        case RECEIVE_REPLIES:
            for(let reply of action.replies){
                newState[reply.id] = reply;
            }
            return newState
        // case REMOVE_VIDEO:
        //     delete(newState[action.tootId]);
        //     return newState;        
        default:
            return state;
    }
}
 
export default tootsReducer;