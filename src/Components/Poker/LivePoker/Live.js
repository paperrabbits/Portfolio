//  NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

//  LOCAL
import {motion} from 'framer-motion'
import BuyIn from './BuyIn'
import LiveGame from './LiveGame'

//  ACTIONS
import {loggedIn, setRoute} from '../../../ducks/liveReducer'        
    
const projVariants = {
    hidden: {opacity: 0}, 
    visible: {opacity: 1,
        transition: {duration: 1}
    }
}
    
const Live = (props) => {
    const {push} = props.history
    const {player, entryFee} = props.live
    const {username} = props.live.player

    useEffect(() => {
        if (!entryFee) {
            props.setRoute('/live-poker')
            push('/welcome')
        }
    }, [])
    
    return (
        <div className='Live-container' >
            {
                !entryFee 
                ?   <BuyIn />
                :   <LiveGame />
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {loggedIn, setRoute})(withRouter(Live))