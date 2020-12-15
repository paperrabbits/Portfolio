import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setFaves} from '../../ducks/shopReducer'
import axios from 'axios'
import Auth from './Auth'
import './Wishlist.scss'

const WishList = (props) => {


    return (
        <div className='w-dd' >

        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {setFaves})(withRouter(WishList))