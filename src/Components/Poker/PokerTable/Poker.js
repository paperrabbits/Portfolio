    //  NPM
import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
    //  LOCAL
import Demo from './Demo'
// import Game from '../../Live/Game'
import Status from './Status'
    //  STYLES
import './Poker.scss'
    //  ACTIONS
import {assignSm, assignBg, payEntry, isShuffling, assignButton, gainXP, countRound, setPlayers, setBigBlind, setSmallBlind, setPurse} from '../dux/pokerReducer'
import {setChipCount, setAlive, demoVersion} from '../dux/cashReducer'
import {setRules} from '../dux/rulesReducer'

const player1 = {
    username: 'Player1',
    cash: 500,
    isDealer: false,
    balance: 0,
    isBetting: false,
    isChecking: false,
    isRaising: false,
    isCalling: false,
    isFolding: false,
    isAllIn: false
}

const bots = [
    {
        username: "Hamilton",
        cash: 500,
        isDealer: false,
        balance: 0,
        isBetting: false,
        isChecking: false,
        isRaising: false,
        isCalling: false,
        isFolding: false,
        isAllIn: false
    },
    {
        username: "Burr",
        cash: 500,
        isDealer: false,
        balance: 0,
        isBetting: false,
        isChecking: false,
        isRaising: false,
        isCalling: false,
        isFolding: false,
        isAllIn: false
    },
    {
        username: "Jefferson",
        cash: 500,
        isDealer: false,
        balance: 0,
        isBetting: false,
        isChecking: false,
        isRaising: false,
        isCalling: false,
        isFolding: false,
        isAllIn: false
    }
]

const Poker = (props) => {
    const {cash} = props.user.player
    const {pathname} = props.location
    const {paidEntry} = props.game.status
    const {demoMode} = props.cash.status

    const [buyIn, setBuyIn] = useState(500)
    const [toggleDemo, setToggleDemo] = useState(false)
    const [liveToggle, setLiveToggle] = useState(false)

            //  REDUX
    const launchDemo = () => {

        props.setPlayers([{...player1} || props.user.player, ...bots])
        props.setSmallBlind(5)
        props.setBigBlind(10)
        props.setChipCount(buyIn)
        props.countRound(0)
        props.assignButton(0)
        props.assignSm(1)
        props.assignBg(2)
            let seats = `${buyIn}`
            let tablePurse = seats * 4
            
        props.setPurse(tablePurse)
        props.payEntry(true)
        props.isShuffling(true)
        props.setAlive([0, 1, 2, 3])

        // axios.get('/api/rules')
        // .then(list => props.setRules(list.data))
        // .catch(err => console.log(err))

        setToggleDemo(true)
        props.demoVersion(true)
    }

    const launchGame = () => {

        // props.setPlayers([{...player1} || props.user.player, ...bots])
        props.setSmallBlind(5)
        props.setBigBlind(10)
        props.setChipCount(buyIn)
        props.countRound(0)
        props.assignButton(0)
        props.assignSm(1)
        props.assignBg(2)
            let seats = `${buyIn}`
            let tablePurse = seats * 4
            
        props.setPurse(tablePurse)
        props.payEntry(true)
        props.isShuffling(true)
        props.setAlive([0, 1, 2, 3])

        axios.get('/api/rules')
        .then(list => props.setRules(list.data))
        .catch(err => console.log(err))

        setLiveToggle(true)
    }

    useEffect(() => {
        if (pathname === '/demo') {
            launchDemo()
        } else if (pathname === '/game') {
            launchGame()
        }
    }, [pathname])
    
    return (
        <div className='poker-master' >
            {
                toggleDemo
                ? <Demo />
                : null
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(
    mapStateToProps, {
        assignButton, 
        countRound, 
        gainXP,
        setBigBlind,
        setSmallBlind, 
        setChipCount,
        setPlayers, 
        setPurse, 
        isShuffling,
        payEntry,
        setRules,
        assignSm,
        assignBg,
        setAlive,
        demoVersion
    })(withRouter(Poker))