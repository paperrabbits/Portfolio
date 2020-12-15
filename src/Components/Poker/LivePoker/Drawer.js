//  NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {motion} from 'framer-motion'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import {IoMdCloseCircle} from 'react-icons/io'
import {FcMenu} from 'react-icons/fc'

//  LOCAL
import './Drawer.scss'

//  ACTIONS
    
const projVariants = {
    hidden: {opacity: 0}, 
    visible: {opacity: 1,
        transition: {duration: 1}
    }
}
    
const LiveGame = (props) => {    
    const {push} = props.history

    return (
        <div className='poker-drawer' >
            {props.status && <div className='tray-header' >
                <p>Leave Table</p>
                <button onClick={() => push('/dashboard')} > <FaArrowAltCircleLeft id='tab-btns' /> </button>
            </div>}
            {props.status && <button onClick={props.toggler} > <IoMdCloseCircle id='tab-btns' /> </button>}
            {!props.status && <button onClick={props.toggler} ><FcMenu id='hamburger' /> </button>}
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {})(withRouter(LiveGame))