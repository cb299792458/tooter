const GET_USER = 'GET_USER'

export const getUser = function(userId){
    return((store) => {
        return store.users[userId];
    })
}

export const fetchUser = (userId) => async(dispatch) => {
    let res = await fetch(`/api/users/${userId}`);
    let user = await res.json();
    dispatch({type: GET_USER, user});
}



const userReducer = (state = {}, action) => {
    let newState = {...state};
    switch(action.type){

        case GET_USER:
            newState[action.user.id] = action.user;
            return newState;

        default:
            return state;
    }
}

export default userReducer;