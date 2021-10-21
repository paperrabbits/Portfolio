import axios from 'axios';
import {setUser, setTasks, addTask} from '../dux/listReducer';


export function registerToDo(e, p) {
    axios.post('/api/register-l', {e, p})
    .then(user => {
        console.log('register-list', user.data)
        setUser(user.data)
        // return user.data
    })
    .catch(err => console.log(err));
};

// const edit = () => {
//     axios.put(`/api/complete/${task_id}`, {bool})
//     .then(axios.get(`/api/tasks/${account_id}`)
//         .then(res => {
//             console.log('middleware-list', res.data)
//             addTask(res.data)
//             setTasks(res.data)
//         })
//     .catch(err => console.log(err)))
// }

export function toDoApi(account_id) {
    // axios.put(`/api/complete/${task_id}`, {bool})
    // .then(
        console.log('middleware-hit', account_id)
        axios.get(`/api/tasks/${account_id}`)
        .then(res => {
            console.log('middleware-list', res.data)
            addTask(res.data)
            setTasks(res.data)
            })
        .catch(err => console.log(err))
        // )
    // .catch(err => console.log(err));
};