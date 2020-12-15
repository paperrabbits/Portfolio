import * as actionTypes from './pokerActions'
import * as utilities from './pokerAPI'

//  DISPATCHERS ==> TEXAS HOLD'EM ==> REDUX

export function register(email, username, password) {
    console.log(email, username, password, 'hit-dux-register')
    return {
        type: actionTypes.REGISTER,
        payload: utilities.register(email, username, password)
    }
}

export function login(email, username, password) {
    console.log(email, username, password, 'hit-dux-login')
    return {
        type: actionTypes.LOGIN,
        payload: utilities.login(email, username, password)
    }
}

export function logout() {
    console.log('hit-dux-logout')
    return {
        type: actionTypes.LOGOUT,
        payload: utilities.logout()
    }
}


export function setPlayer(playerObj) {
    return {
        type: actionTypes.SET_PLAYER,
        payload: playerObj
    }
}

export function setImage(profilePic) {
    return {
        type: actionTypes.SET_IMAGE,
        payload: profilePic
    }
}