const initialState = {
    player: {},
    entryFee: true,
    destination: '',
    seats: []
}

//  ACTIONS
const LOGGED_IN = 'LOGGED_IN'
export function loggedIn(obj) {
    return {
        type: LOGGED_IN,
        payload: obj
    }
}

const SET_SEATING = 'SET_SEATING'
export function setSeating(arr) {
    return {
        type: SET_SEATING,
        payload: arr
    }
}

const SET_ROUTE = 'SET_ROUTE'
export function setRoute(str) {
    return {
        type: SET_ROUTE,
        payload: str
    }
}

const PAY_FEE = 'PAY_FEE'
export function payFee(bool) {
    return {
        type: PAY_FEE,
        payload: bool
    }
}

export default function liveReducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case LOGGED_IN:
            return {...state, player: payload};
        case PAY_FEE:
            return {...state, entryFee: payload};
        case SET_ROUTE:
            return {...state, destination: payload};

        case SET_SEATING: 
            return {...state, seats: payload};

        default: 
            return state;
    }
}