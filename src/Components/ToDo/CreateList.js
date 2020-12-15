import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
//  LOCAL
import './CreateList.scss'
import {addTask, addLabel} from '../../ducks/listReducer'

const CreateList = (props) => {
    const {taskLabels, tasks} = props.list
    const {account_id} = props.list.user

    const [state, setState] = useState({
        title: '',
        description: '',
        due_date: '',
        task_priority: 0
    })

    const handleChange = (evt) => {
        const which = evt.target
        setState({...state, [which.name]: which.value})
    }

    const submitForm = () => {
        const {description, due_date, title, task_priority} = state
        axios.post('/api/task', {title, description, due_date, task_priority, account_id})
            .then(res => {
                props.addTask([...tasks, res.data[0]])
            })
            .catch(err => console.log(err))
        clearInputs()
        props.toggler()
    }

    const clearInputs = () => {
        setState({
            title: '', 
            description: '', 
            due_date: '', 
            task_priority: 0
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
                    <h4>Due Date</h4>
                    <input 
                        name='due_date' 
                        value={state.due_date} 
                        type='input' 
                        placeholder=' date...' 
                        onChange={handleChange} />
                </div>
                <div className='input-labels' >
                    <h4>+List</h4>
                    <input 
                        name='description' 
                        value={state.description} 
                        type='text' 
                        placeholder=' description...' 
                        onChange={handleChange} />
                    <select
                        name='task_priority'
                        value={state.task_priority}
                        type='input'
                        onChange={handleChange} >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                    </select>
                </div>
            </div>
            <button onClick={submitForm} > +Add Item </button>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    addTask, 
    addLabel
})(withRouter(CreateList))