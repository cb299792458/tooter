// import csrfFetch from "./csrf";

const GET_TOOTS = '/api/toots';
const RECEIVE_TOOT = 'RECEIVE_TOOT';
const RECEIVE_REPLIES = 'RECEIVE_REPLIES';
const RECEIVE_PARENT = 'RECEIVE_PARENT';

export const getToots = ({toots}) => {
    const res=[];
    for(const [k,v] of Object.entries(toots)){
        if(k!=='parent') res.push(v);
    }
    return res;
}

export const getToot = (tootId) => {
    return(
        (store) => {
            return store.toots[tootId];
        }
    )
};
export const getParent = () => {
    return(
        (store) => {
            return store.toots.parent;
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

export const fetchParent = (parentId) => async(dispatch) => {
    const res = await fetch(`/api/toots/${parentId}`);
    const parent = await res.json();
    dispatch( {type: RECEIVE_PARENT, parent} );
}

export const fetchReplies = (tootId) => async(dispatch) => {
    let res = await fetch(`/api/toots/${tootId}/replies`);
    let replies = await res.json();
    dispatch({type: RECEIVE_REPLIES, replies})
}

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
        case RECEIVE_PARENT:
            newState['parent'] = action.parent;
            return newState; 
  
        default:
            return state;
    }
}
 
export default tootsReducer;