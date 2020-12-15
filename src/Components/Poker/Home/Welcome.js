import React from 'react'
import Auth from '../Authentication/Auth'
import './Welcome.scss'
import {connect} from 'react-redux'

const Welcome = (props) => {
    return (
        <div className='Auth-container' >
            <Auth className='auth-master' />
        </div>
    )
}

export default Welcome