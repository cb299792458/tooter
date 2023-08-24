const GET_MESSAGES='/api/messages';

export const getMessages = ({messages}) => {
    return Object.values(messages);
}

export const fetchMessages = () => async(dispatch) => {
    let res = await fetch(GET_MESSAGES);
    let messages = await res.json();
    dispatch({type: GET_MESSAGES, messages})
}

const messageReducer = (state = {}, action) => {
    // let newState = {...state};
    switch(action.type){
        case GET_MESSAGES:
            return {...state, ...action.messages}
        default:
            return state;
    }
}

export default messageReducer;