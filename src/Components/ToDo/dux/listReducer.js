import {client} from '../utils/client';
import axios from 'axios';

const initialState = {
    user: {},
    taskLabels: [],
    tasks: [],
    showDrawer: false,
    filter: '',
    loggedIn: false,
    activeTasks: []
};

//  ACTIONS
const SHOW_DRAWER = 'SHOW_DRAWER';
    export function showDrawer(bool) {
        console.log(bool, 'PAYLOAD')
        return {
            type: SHOW_DRAWER,
            payload: bool
        };
    };

const SET_USER = 'SET_USER';
    export function setUser(userObj) {
        console.log(userObj, 'PAYLOAD')
        return {
            type: SET_USER,
            payload: userObj
        };
    };

const SET_FILTER = 'SET_FILTER';
    export function setFilter(str) {
        console.log(str, 'PAYLOAD')
        return {
            type: SET_FILTER,
            payload: str
        };
    };
    
const ADD_TASK = 'ADD_TASK';
    export function addTask(str) {
        console.log(str, 'PAYLOAD =>> TASK')
        return {
            type: ADD_TASK,
            payload: str
        };
    };

const ADD_LABEL = 'ADD_LABEL';
    export function addLabel(str) {
        console.log(str, 'PAYLOAD')
        return {
            type: ADD_LABEL,
            payload: str
        };
    };

const EXIT = 'EXIT';
    export function exit(bool) {
        return {
            type: EXIT,
            payload: bool
        };
    };

const SET_TASKS = 'SET_TASKS';
    export function setTasks(arr) {
        return {
            type: SET_TASKS,
            payload: arr
        };
    };

const TODOS_LOADED = 'TODOS_LOADED';
    export function todosLoaded(arr) {
        return {
            type: TODOS_LOADED,
            payload: arr
        };
    };

const TODO_ADDED = 'TODO_ADDED';
    export function todoAdded(obj) {
        return {
            type: TODO_ADDED,
            payload: obj
        }
    }
    
// const LOGIN = 'LOGIN';
//     export function login(obj) {
//         return {
//             type: LOGIN,
//             payload: obj
//         }
//     }

//  REDUCER
export default function listReducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case EXIT:
            return {...state, loggedIn: payload};

        case SET_USER:
            return {...state, user: payload, loggedIn: true};

        case SHOW_DRAWER:
            return {...state, showDrawer: payload};

        case ADD_TASK:
            return {...state, tasks: payload};

        case ADD_LABEL:
            return {...state, taskLabels: payload};

        case SET_FILTER:
            return {...state, filter: payload};

        case SET_TASKS:
            return {...state, activeTasks: payload};

        case TODOS_LOADED:
            return payload;

        case TODO_ADDED:
            return {...state, tasks: [...state.tasks, payload]};

        // case LOGIN:
        //     return {...state, user: payload};
            
        default:
            return state;
    }
}


    //  THUNKS
export async function fetchTodos(dispatch, getState) {
    const response = await axios.get('api/tasks');
    dispatch({ type: TODOS_LOADED, payload: response.todos });
}
    
export function saveNewTodo(id, text) {
    return async function saveNewTodoThunk(dispatch, getState) {
        console.log('init_line 138');
        const initialTodo = { text };
        const response = await client.post('/api/task', { todo: initialTodo });
        // console.log('dispatching thunk')
        // console.log(response.todo)
        console.log('awaiting_line 143');
        dispatch({ type: TODO_ADDED, payload: response.todo });
        console.log('dispatched_line 145');
    };
}

export function login(email, password) {
    return async function loginThunk(dispatch, getState) {
        console.log('login_1')
        
        const response = await client.post('api/login-l', {email, password});
        console.log('login_2')

        dispatch({type: SET_USER, payload: response.data});
        console.log('login_3');
    };
}