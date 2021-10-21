import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect, useDispatch} from 'react-redux';
//  LOCAL
import './CreateList.scss';
import {addTask, addLabel, todoAdded, saveNewTodo} from './dux/listReducer';

const CreateList = (props) => {
    const {taskLabels, tasks} = props.list
    const {account_id, user_id} = props.list.user
    // const {dispatch} = useDispatch();

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const [state, setState] = useState({
        title: '',
        description: '',
        task_date: `${today}`,
        complete: false,
        task_label: ''
    })

    const handleChange = (evt) => {
        const which = evt.target
        setState({...state, [which.name]: which.value})
        console.log(state.task_date);
    }

    const handleKeyDown = (e) => {
        // If the user pressed the Enter key:
        // const trimmedText = text.trim()
        if (e.which === 13 && state) {
          // Create and dispatch the thunk function itself
          saveNewTodo(state)
          // And clear out the text input
            setState({
                title: '', 
                description: '', 
                task_date: '', 
                complete: false,
                task_label: ''
            })
        }
    }


    const submitForm = () => {
        const {description, task_date, title, complete, task_label} = state

        // axios.post('/api/task', {user_id, title, description, task_date, complete, task_label})
        //     .then(res => {
        //         props.addTask([...tasks, res.data[0]])
        //     })
        //     .catch(err => console.log(err))

        props.saveNewTodo(user_id, {title, description, task_date, complete, task_label})
        clearInputs()
        props.toggler()
    }

    
    // document.write(today);
console.log(today)
    const clearInputs = () => {
        setState({
            title: '', 
            description: '', 
            task_date: '', 
            complete: false,
            task_label: ''
        })
    }

    return (
        <div className='CreateList-main' >
            <div className='creation-modal' >
                <div className='input-labels' >
                    <h4>Task</h4>
                    <input 
                        name='title' 
                        value={state.title} 
                        type='text' 
                        placeholder=' task title...' 
                        onChange={handleChange} />
                </div>
                <div className='input-labels' >
                    <h4>Date</h4>
                    <input 
                        name='due_date' 
                        value={state.task_date} 
                        type='input' 
                        onChange={handleChange} />
                </div>
                <div className='input-labels' >
                    <h4>+List</h4>
                    <input 
                        name='description' 
                        value={state.description} 
                        type='text' 
                        placeholder=' description...' 
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} />
                    {/* <select
                        name='task_priority'
                        value={state.task_priority}
                        type='input'
                        onChange={handleChange} >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                    </select> */}
                </div>
            </div>
            <button onClick={submitForm} > +Add Item </button>
        </div>
    )
};
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {
    addTask, 
    addLabel,
    saveNewTodo
})(withRouter(CreateList));