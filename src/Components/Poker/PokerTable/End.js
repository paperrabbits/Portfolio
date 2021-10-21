    // NPM
    import React, {useState, useEffect} from 'react'
    import {connect} from 'react-redux'
    import {withRouter} from 'react-router-dom'
    import axios from 'axios';
    // import End from './End';
    
        // LOCAL
    import {handIsOver, isShuffling, isSuited, setBigBlind, setSmallBlind} from '../dux/pokerReducer'
    import {setHandType, setSubType} from '../dux/scoringReducer'
    import './ActionModal.scss'
    
    const ActionModal = (props) => {
        const {game, user} = props
        const {push} = props.history
    
        const toDash = () => {
            push('/dashboard')
        }
        const endGame = () => {
            axios.put()
        }
        return (
            <div className='end-btn' >
                <button 
                    onClick={(evt) => endGame(evt.target.value)}>
                    Exit Game
                </button>
            </div>
        )
    }
    const mapStateToProps = (reduxState) => reduxState
    
    export default connect(
        mapStateToProps, {
            isShuffling,
            isSuited,
            setBigBlind,
            setHandType,
            setSmallBlind,
            setSubType,
            handIsOver
        })(withRouter(ActionModal))