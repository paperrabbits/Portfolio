
//  EXPRESS =>> API CALLS TO DB / SERVER JSON FILES ==> VIA REDUX STORE
import axios from 'axios'


    //  AUTHENTICATION
export const register = (email, username, password) => {    
    return  axios.post('/api/register', {email, username, password})
            .then(res => res.data)
}

export const login = (email, username, password) => {
    return  axios.post('/api/login', {email, username, password})
            .then(res => res.data)
}

export const logout = () => {
    return  axios.get('/api/logout')
            .then(res => res.data)
}


    //  GAMEPLAY
export const shuffle = () => {
    return  axios.get('/api/deck')
            .then(res => res.data)
}

export const getRules = () => {
    return  axios.get('/api/rules')
            .then(res => res.data)
}


    //  USER PROFILE
export const updatePic = (id, url) => {
    return  axios.put(`/api/picture/${id}`, {url})
            .then(res => res.data)
}