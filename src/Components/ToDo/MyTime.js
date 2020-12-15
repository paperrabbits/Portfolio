import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Overview from './Overview'
import ToDo from './ToDo'
import './MyTime.scss'
import routes from '../../routes'
import SideRail from './SideRail'

const MyTime = (props) => {
    const {user} = props.list
    const {email} = props.list.user
    const {pathname} = props.location
    const {push} = props.history

    // useEffect(() => {
    //     if (!email) {
    //         push('/todo')
    //     }
    // }, [email, push])

    return (
        <div className='app-main' >
            {
                pathname === '/todo'
                ?   <Overview />
                :   {routes}
                // : !user.email
                // ?   <Overview />
                // : pathname === '/my-time'
                // ?   <ToDo />
                // : null
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(withRouter(MyTime))