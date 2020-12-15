import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {setFilter} from '../../ducks/listReducer'
import './SideRail.scss'
import axios from 'axios'

const SideRail = (props) => {
    const {push} = props.history
    const {taskLabels} = props.list
    const {tasks} = props.list

    const [toggle, showToggle] = useState(false)
    const [title, setTitle] = useState('')
    const [listMap, setListMap] = useState([])


    const logout = () => {
        axios.get('/api/logout-l')
        .then(push('/todo'))
    }


    useEffect(() => {
        setListMap([...taskLabels])
    }, [taskLabels])


    const handleChange = (evt) => {
        setTitle(evt.target.value)
    }


    const saveList = () => {
        const {account_id} = props.list.user
            console.log(account_id, title, 'id__title')

        axios.post('/api/list-title', {account_id, title})
            .then(res => props.setFilter(res.data))
            .catch(err => console.log(err))

        showToggle(false)
    }


    const counter = (str) => {
        let filtered = tasks.filter(e => e['title'] === str)
        return filtered.length
    }


    const mapper = listMap.map((el, i) => (
        <div 
            key={i} 
            className='folders'
            id={props.list.filter === el ? 'is-active' : null}
            onClick={() => props.setFilter(`${el}`)} >
            <h2> {el} </h2>
            <p>{counter(el)}</p>
        </div>
    ))


    return (
        <div className='siderail-main' >
            <div className='side-rail-title'>
                <h1> My Time </h1>
            </div>
            <div className='list-section' >
                <div 
                    className='folders' 
                    onClick={() => props.setFilter('')}  >
                    <h2> All </h2>
                    <p> {tasks.length} </p>
                </div>
                {mapper}
            </div>
            <div className='rail-foot'>
                <button>Settings</button>
                <button onClick={logout} >Logout</button>
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {setFilter})(withRouter(SideRail))