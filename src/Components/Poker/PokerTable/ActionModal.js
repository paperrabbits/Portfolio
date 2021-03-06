    // NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import End from './End';

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
    return (
        <div className='action-modal-master' >

            <div className='profile-menu' >
                <img 
                    id='action-pic' 
                    alt='' 
                    src={props.user.player.profile_pic}
                    onClick={toDash}  >
                </img>
                <h2> {user.player.username} </h2>
                <p> Bank: ${props.cash.cashFlow.chipCount} </p>
                <p> {game.poker.XP} XP </p>
            </div>
            
            <div className='room-title-container' >
                <h2 id='poker-room-title' > THE LIGHTHOUSE </h2>
                <h3 id='poker-room-title1' > TEXAS HOLD'EM </h3>
                <p> Purse: ${game.poker.prizeMoney} </p>
                <p> Blinds: ${game.poker.smallBlind} / ${game.poker.bigBlind} </p>
            </div>

            <div className='btn-menu' >
                {/* <button
                    onClick={props.deal}
                    className='action-btns'
                    > Deal </button>
                <button
                    onClick={props.flop}
                    className='action-btns'
                    > Flop </button>
                <button
                    onClick={props.turn}
                    className='action-btns'
                    > Turn </button>
                <button
                    onClick={props.river}
                    className='action-btns'
                    > River </button>                
                <button 
                    onClick={props.checkXP} 
                    className='action-btns' 
                    > Show'em </button>
                <button 
                    onClick={findWinner} 
                    className='action-btns' 
                    > Winner Winner </button>
                <button
                    onClick={props.clear}
                    className='action-btns'
                    > Reset </button>
                <button 
                    onClick={() => console.log(props.game.poker.players)} 
                    className='action-btns' 
                    > Show'em </button>
                <button
                    onClick={props.toggler}
                    className='action-btns'
                    > Menu </button> */}
                    {
                        props.clock
                        ? <h1 style={{color: 'silver'}} >{props.timer}</h1>
                        : < End />
                    }
            </div>
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