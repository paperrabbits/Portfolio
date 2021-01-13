//  EXPRESS =>> API CALLS TO DB / SERVER JSON FILES ==> VIA REDUX STORE
import * as apiActions from './api'
import axios from 'axios'

    //  POKER --> AUTHENTICATION
export const register = (email, username, password) => {    
console.log('hit --> API_REGISTER', email, username, password)
    return  axios.post('/api/register', {email, username, password})
            .then(res => res.data)
            .catch(err => console.log(err))
}



export const logout = () => {
    return  axios.get('/api/logout')
            .then(res => res.data)
            .catch(err => console.log(err))
}


    //  POKER --> GAMEPLAY
export const shuffle = () => {
    return  axios.get('/api/deck')
            .then(res => res.data)
            .catch(err => console.log(err))
}

export const getRules = () => {
    return  axios.get('/api/rules')
            .then(res => res.data)
            .catch(err => console.log(err))
}


    //  POKER --> USER PROFILE
export const updatePic = (id, url) => {
    return  axios.put(`/api/picture/${id}`, {url})
            .then(res => res.data)
            .catch(err => console.log(err))
}



    //  TO-DO APP
export const logoutToDo = () => {
    return  axios.get('/api/logout-l')
            .then(res => res.data)
            .catch(err => console.log(err))
}

export const loginToDo = (email, password) => {
    console.log('api-todo')
    return  axios.post('/api/login-l', {email, password})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
}

export const registerToDo = (email, password) => {
    return  axios.post('/api/register-l', {email, password})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
}