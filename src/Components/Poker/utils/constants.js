import axios from 'axios'

export const    REGISTER = "REGISTER",
                REGISTER_PENDING = "REGISTER_PENDING",
                REGISTER_FULFILLED = "REGISTER_FULFILLED"

export const    REGISTER_TO_DO = "REGISTER_TO_DO",
                REGISTER_TO_DO_PENDING = "REGISTER_TO_DO_PENDING",
                REGISTER_TO_DO_FULFILLED = "REGISTER_TO_DO_FULFILLED"

export const    LOGIN = "LOGIN",
                LOGIN_PENDING = "LOGIN_PENDING",
                LOGIN_FULFILLED = "LOGIN_FULFILLED",
                LOGIN_FAILED = "LOGIN_FAILED"

// export const login = (playerObj) => {
//     return {
//         type: LOGIN,
//         payload: playerObj
//     }
// };

export const login = (email, username, password) => {
    console.log('hit --> API_LOGIN', email, username, password)
    return (dispatch) => {
    
        // Initial action dispatched
        dispatch({ type: LOGIN_PENDING });
            console.log('pending...')            
    
        // Return promise with success and failure actions
        return axios.post('api/login', {email, username, password})
            .then(res => {
                const users = res.data.map(e => e.id)
                dispatch(LOGIN_FULFILLED(users))
                console.log('fulfilled...')
            })
            .catch(err => {
                const {message} = err
                dispatch(LOGIN_FAILED(message))
                console.log('failed...')
            })
    };
};