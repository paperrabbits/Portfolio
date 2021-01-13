const initialState = {
    customer: {},
    products: [],
    categories: [],
    display: 5,
    startPosition: 0,
    wishList: [],
    cart: [],
    counter: 0,
    authModal: false
}

//  ACTIONS
const TRIGGER_AUTH = 'TRIGGER_AUTH'
export function triggerAuth(bool) {
    return {
        type: TRIGGER_AUTH,
        payload: bool
    }
}

const SET_COUNT = 'SET_COUNT'
export function setCount(num) {
    return {
        type: SET_COUNT,
        payload: num
    }
}

const SET_PRODUCTS = 'SET_PRODUCTS'
export function setProducts(arr) {
    return {
        type: SET_PRODUCTS,
        payload: arr
    }
}

const SET_LABELS = 'SET_LABELS'
export function setLabels(arr) {
    return {
        type: SET_LABELS,
        payload: arr
    }
}

const SET_CART = 'SET_CART'
export function setCart(arr) {
    return {
        type: SET_CART,
        payload: arr
    }
}

const SET_FAVES = 'SET_FAVES'
export function setFaves(arr) {
    return {
        type: SET_FAVES,
        payload: arr
    }
}

const SET_CUSTOMER = 'SET_CUSTOMER'
export function setCustomer(obj) {
    return {
        type: SET_CUSTOMER,
        payload: obj
    }
}


const SET_DISPLAY = 'SET_DISPLAY'
export function setDisplay(num) {
    return {
        type: SET_DISPLAY,
        payload: num
    }
}

const SET_POSITION = 'SET_POSITION'
export function setPosition(index) {
    return {
        type: SET_POSITION,
        payload: index
    }
}

//  REDUCER
export default function shopReducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case SET_PRODUCTS:
            return {...state, products: payload}

        case SET_DISPLAY:
            return {...state, display: payload}

        case SET_POSITION:
            return {...state, startPosition: payload}

        case SET_CUSTOMER:
            return {...state, customer: payload}

        case SET_CART:
            return {...state, cart: payload}

        case SET_FAVES:
            return {...state, wishList: payload}

        case SET_LABELS:
            return {...state, categories: payload}

        case TRIGGER_AUTH:
            return {...state, authModal: payload}

        case SET_COUNT:
            return {...state, counter: payload}

        default:
            return state;
    }
}