//  NPM
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {motion} from 'framer-motion';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa';
import {IoMdCloseCircle} from 'react-icons/io';
import {FcMenu} from 'react-icons/fc';
import './Drawer.scss';
import Rules from '../PokerTable/Rules'
import {GiPokerHand} from 'react-icons/gi'
// import '../PokerTable/Rules.scss'

//  LOCAL

//  ACTIONS
    
const projVariants = {
    hidden: {opacity: 0}, 
    visible: {opacity: 1,
        transition: {duration: 1}
    }
}
    
const LiveGame = (props) => {    
    const {push} = props.history

    const [viewOptions, setViewOptions] = useState('')
        let ddList = ['Poker Hands', 'Feed', 'Chat']

    return (
        <div className='poker-drawer' >
            {props.status && <Rules  />}
            {/* {
                props.status && 
                props.rules.listOfHands.map(rules => (
                    <div key={rules.badge_id} className='rules-list-col' >
                        <div className='rules-list-row' >
                            <GiPokerHand  id='icons'  />
                            <p> {rules.badge_name} </p>
                            <p> {rules.badge_score} XP </p>
                        </div>
                    </div>
                ))
            } */}
            {   
                props.status && 
                <div className='tray-header' >
                    {/* <p>Leave Table</p> */}
                    <button onClick={props.toggler} > 
                        <FaArrowAltCircleLeft id='tab-btns' /> 
                    </button>
                </div>
            }
            
            {/* {
                props.status && 
                <button onClick={props.toggler} > 
                    <IoMdCloseCircle id='tab-btns' /> 
                </button>
            } */}
            {
                !props.status && 
                <button onClick={props.toggler} >
                    <FcMenu id='hamburger' /> 
                </button>
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {})(withRouter(LiveGame))