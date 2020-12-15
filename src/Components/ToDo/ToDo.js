import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import SideRail from './SideRail'
import CreateList from './CreateList'
import './ToDo.scss'
import {TiDeleteOutline, TiInputCheckedOutline} from 'react-icons/ti'
import {BsCheckCircle, BsXDiamondFill, BsXCircle} from 'react-icons/bs'
import axios from 'axios'
import {addTask, addLabel} from '../../ducks/listReducer'

const ToDo = (props) => {
    const {tasks, user, taskLabels} = props.list
    const {account_id} = props.list.user
    const {push} = props.history

    const [toggle, setToggle] = useState(false)
    const [feed, setFeed] = useState([])
    const [view, setView] = useState([])


    useEffect(() => {
        console.log(props.list)
    }, [props.list])

    useEffect(() => {
        if (props.list.filter) {
            let activeFilter = feed.filter(e => e['title'] === props.list.filter)
            setView([...activeFilter])
        }
    }, [props.list.filter])

    const setDashboard = () => {
        axios.get(`/api/tasks/${account_id}`)
            .then(res => props.addTask(res.data))
            .catch(err => console.log(err))
        console.log('hit-me')
    }

    useEffect(() => {
        let listArr = [...taskLabels]

        setFeed([...tasks]);

        tasks.forEach(el => {
            if (!listArr.includes(el['title'])) {
                listArr.push(el['title'])
            }
        });

        !tasks.length
        ? props.addLabel([])
        : props.addLabel([...listArr])
    }, [tasks])


    useEffect(() => {
        if (account_id) {
            setDashboard()
        } else if (!account_id) {
            push('/todo')
        }
    }, [account_id])

    
    const deleteItem = (id) => {
        axios.delete(`/api/delete/${id}`)
        .then(setDashboard())
        .catch(err => console.log(err))
    }


    const markComplete = (id, bool) => {
        let complete
        if (bool) {
            complete = false
        } else {
            complete = true
        }
        console.log(complete)
        axios.put(`/api/complete/${id}`, {complete})
        .then(setDashboard())
        .catch(err => console.log(err))
    }


    let mapper = feed.filter(e => e['complete'] === false).map((el, i) => (
        <ul key={i} className='list-item' >
            <div className='task-item-left' >
                <button onClick={() => markComplete(el.task_id)} ><BsXDiamondFill id='btn-icon-edit' /></button>
                <button onClick={() => deleteItem(el.task_id)} ><BsXCircle id='btn-icon-del' /></button>
                <button onClick={() => markComplete(el.task_id, el.complete)} ><BsCheckCircle id='btn-icon-check' /></button>
                <div id='scroll-box' >
                    <p id='task-description'> {el.description} </p>
                </div>
            </div>
            <p> {el.due_date.slice(0, 10)} </p>
        </ul>
    ))

    let done = feed.filter(e => e['complete'] === true).map((el, i) => (
        <ul key={i} className='list-item' >
            <div className='task-item-left' >
                <button onClick={() => markComplete(el.task_id)} ><BsXDiamondFill id='btn-icon-edit' /></button>
                <button onClick={() => deleteItem(el.task_id)} ><BsXCircle id='btn-icon-del' /></button>
                <button onClick={() => markComplete(el.task_id, el.complete)} ><BsCheckCircle id='btn-icon-check' /></button>
                <div id='scroll-box' >
                    <p id='task-description'> {el.description} </p>
                </div>
            </div>
            <p> {el.due_date.slice(0, 10)} </p>
        </ul>
    ))

    // const rasterize = (str) => {
    //     let filtered = tasks.filter(e => e['title'] === str)
    //     setView([...filtered])
    // }

    let display = view.map((el, i) => (
        <ul key={i} className='list-item' >
            <div className='task-item-left' >
                <button onClick={() => markComplete(el.task_id)} ><BsXDiamondFill id='btn-icon-edit' /></button>
                <button onClick={() => deleteItem(el.task_id)} ><BsXCircle id='btn-icon-del' /></button>
                <button onClick={() => markComplete(el.task_id)} ><BsCheckCircle id='btn-icon-check' /></button>
                <div id='scroll-box' >
                    <p id='task-description'> {el.description} </p>
                </div>
            </div>
            <p> {el.due_date.slice(0, 10)} </p>
        </ul>
    ))


    return (
        <div className='todo-main' >
            <SideRail id='top' />
            <div className='section-lists' >
                <h1 onClick={() => setToggle(!toggle)}> Create Task </h1>
                {
                    toggle 
                    ?   <CreateList toggler={() => setToggle(!toggle)}  />
                    :   null
                }
                <h3> Active </h3>
                <div className='list-wrapper' >
                    <div className='list-container'>
                    {
                        props.list.filter
                        ?   <>{display}</>
                        :   <>{mapper}</>
                    }
                    </div>
                </div>
                <h3> Completed </h3>
                <div className='list-wrapper' >
                    <div className='list-container' id='completed-tasks' >
                        {done}
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    addTask, 
    addLabel
})(withRouter(ToDo))