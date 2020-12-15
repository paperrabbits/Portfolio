    //  NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

    //  LOCAL
import {motion} from 'framer-motion'

    //  ACTIONS
import {loggedIn, payFee} from '../../../ducks/liveReducer'        
    
const projVariants = {
    hidden: {opacity: 0}, 
    visible: {opacity: 1,
        transition: {duration: 1}
    }
}
    
const BuyIn = (props) => {
    const {push} = props.history
    const {player, entryFee} = props.live

    useEffect(() => {
        console.log(player, 'liveReducer')
    },[player])

    return (
        <div>
            <button 
                style={{color: 'silver'}}
                onClick={() => props.payFee(true)} > Buy-In </button>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {loggedIn, payFee})(withRouter(BuyIn))