import * as utilities from '../utils/pokerAPI'
import * as dispatchers from '../utils/pokerDispatchers'
import * as actionTypes from '../utils/pokerActions'

    //  REDUX-STATE ==> TEXAS HOLE'EM
const initialState = {
    player: {},
    loading: false,
    loggedIn: false
}


    //  LOCAL DISPATCHERS
const IS_LOGGED_IN = "IS_LOGGED_IN"
export function isLoggedIn(bool) {
    return {
        type: IS_LOGGED_IN,
        payload: bool
    }
}


    //  POKER REDUCER F(n)
export default function playerReducer (state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case actionTypes.REGISTER_PENDING:
            return {...state, loading: true};
        case actionTypes.REGISTER_FULFILLED:
            return {...state, player: payload, loading: false};

        case actionTypes.LOGIN_PENDING:
            return {...state, loading: true};
        case actionTypes.LOGIN_FULFILLED:
            return {...state, player: payload, loading: false, loggedIn: true};

        case actionTypes.SET_PLAYER:
            return {...state, player: payload};

        case actionTypes.SET_IMAGE:
            return {...state, player: {...state.player, profile_pic: payload}};

        case IS_LOGGED_IN:
            return {...state, loggedIn: payload};
        
        default:
            return state;
    }
}