// import { GiPokerHand } from 'react-icons/gi';

// // import * as constants from './constants'
// const axios = require('axios');




// export const register = (email, username, password) => {    
//     console.log('hit --> API_REGISTER', email, username, password)
//         return  axios.post('/api/register', {email, username, password})
//                 .then(res => res.data)
//                 .catch(err => console.log(err))
//     }
 
// export const login = (email, username, password) => {
//     console.log('hit --> API_LOGIN', email, username, password)
//     return (dispatch) => {
    
//         // Initial action dispatched
//         dispatch({ type: constants.LOGIN_PENDING });
//             console.log('pending...')            
    
//         // Return promise with success and failure actions
//         return axios.get('https://jsonplaceholder.typicode.com/users')
//             .then(res => {
//                 const users = res.data.map(e => e.id)
//                 dispatch(constants.LOGIN_FULFILLED(users))
//                 console.log('fulfilled...')
//             })
//             .catch(err => {
//                 const {message} = err
//                 dispatch(constants.LOGIN_FAILED(message))
//                 console.log('failed...')
//             })
//     };
// };

// // node ./src/Components/Poker/dux/playerReducer