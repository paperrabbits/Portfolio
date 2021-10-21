import * as constants from '../utils/constants'
import axios from 'axios'

//  REDUX-STATE ==> TEXAS HOLE'EM
    const initialState = {
        player: {},
        loading: false,
        loggedIn: false,
        error: ''
    }

const IS_LOGGED_IN = "IS_LOGGED_IN"
export function isLoggedIn(bool) {
    return {
        type: IS_LOGGED_IN,
        payload: bool
    }
}

export const SET_IMAGE = 'SET_IMAGE';
export function setImage(url) {
    return {
        type: SET_IMAGE,
        payload: url
    }
};

export const SET_PLAYER = 'SET_PLAYER';
export function setPlayer(playerObj) {
    return {
        type: SET_PLAYER,
        payload: playerObj
    }
};

export const REGISTER = 'REGISTER';
export function register(playerObj) {
    return {
        type: REGISTER,
        payload: playerObj
    }
};


    //  POKER REDUCER F(n)
export default function playerReducer (state = initialState, action) {
    const {type, payload} = action
    const {player} = state

    switch(type) {
    //  LOCAL
        case SET_PLAYER:
            return {...state, player: payload};

        case SET_IMAGE:
            return {...state, player: {...player, profile_pic: payload}};

        case IS_LOGGED_IN:
            return {...state, loggedIn: payload};

    //  THUNKS

        // case constants.LOGIN:
        //     return {...state, player: payload};

        case constants.LOGIN_PENDING:
            return {...state, loading: true, loggedIn: false};

        case constants.LOGIN_FULFILLED:
            return {...state, player: payload, loading: false, loggedIn: true};

        case constants.LOGIN_FAILED:
            return {...state, loading: false, loggedIn: false, error: payload};

        // case actionTypes.LOGOUT:
        //     return {...state, player: payload, loading: false, loggedIn: false};

        // case actionTypes.SET_PLAYER:
        //     return {...state, player: payload};

        // case actionTypes.SET_IMAGE:
        //     return {...state, player: {...state.player, profile_pic: payload}};
        
        default:
            return state;
    }
}


//  THUNKS
