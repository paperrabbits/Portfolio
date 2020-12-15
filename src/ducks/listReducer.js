const initialState = {
    user: {},
    taskLabels: [],
    tasks: [],
    showDrawer: false,
    filter: ''
}

//  ACTIONS
const SHOW_DRAWER = 'SHOW_DRAWER'
    export function showDrawer(bool) {
        console.log(bool, 'PAYLOAD')
        return {
            type: SHOW_DRAWER,
            payload: bool
        }
    }

const SET_USER = 'SET_USER'
    export function setUser(userObj) {
        console.log(userObj, 'PAYLOAD')
        return {
            type: SET_USER,
            payload: userObj
        }
    }
const SET_FILTER = 'SET_FILTER'
    export function setFilter(str) {
        console.log(str, 'PAYLOAD')
        return {
            type: SET_FILTER,
            payload: str
        }
    }
    
const ADD_TASK = 'ADD_TASK'
    export function addTask(str) {
        console.log(str, 'PAYLOAD =>> TASK')
        return {
            type: ADD_TASK,
            payload: str
        }
    }

const ADD_LABEL = 'ADD_LABEL'
    export function addLabel(str) {
        console.log(str, 'PAYLOAD')
        return {
            type: ADD_LABEL,
            payload: str
        }
    }

//  REDUCER
export default function listReducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case SET_USER:
            return {...state, user: payload};

        case SHOW_DRAWER:
            return {...state, showDrawer: payload};

        case ADD_TASK:
            return {...state, tasks: payload};

        case ADD_LABEL:
            return {...state, taskLabels: payload};

        case SET_FILTER:
            return {...state, filter: payload};
            
        default:
            return state;
    }
}