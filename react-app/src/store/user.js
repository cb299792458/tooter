const GET_USER = 'GET_USER'
const GET_FOLLOWERS = 'GET_FOLLOWERS'
const GET_FOLLOWING = 'GET_FOLLOWING'

export const getUser = function(userId){
    return((store) => {
        return store.users[userId];
    })
}
export const getFollowers = function(){
    return((store) => {
        return store.users['followers'];
    })
}
export const getFollowing = function(){
    return((store) => {
        return store.users['following'];
    })
}

export const fetchUser = (userId) => async(dispatch) => {
    let res = await fetch(`/api/users/${userId}`);
    let user = await res.json();
    dispatch({type: GET_USER, user});
}

export const fetchFollowers = (userId) => async(dispatch) => {
    let res = await fetch(`/api/users/${userId}/followers`)
    let followers = await res.json();
    dispatch({type: GET_FOLLOWERS, followers})
}

export const fetchFollowing = (userId) => async(dispatch) => {
    let res = await fetch(`/api/users/${userId}/followees`)
    let following = await res.json();
    dispatch({type: GET_FOLLOWING, following})
}


const userReducer = (state = {}, action) => {
    let newState = {...state};
    switch(action.type){

        case GET_USER:
            newState[action.user.id] = action.user;
            return newState;
            case GET_FOLLOWERS:
                newState['followers'] = action.followers;
                return newState;
            case GET_FOLLOWING:
                newState['following'] = action.following;
                return newState;

        default:
            return state;
    }
}

export default userReducer;