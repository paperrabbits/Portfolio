    // NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {FiPlusCircle} from 'react-icons/fi'
// import Badge from 'react-bootstrap/Badge'

    // LOCAL
import {watchTotal, startBetting, alertDealer, setAlive, setPlayerTurn, setCurrentBet, setPot, checkPot, setPrevTurn} from '../dux/cashReducer'
import {handIsOver, wReady, banker, movePhase, setCount, setBalance, setStatus, setWinner, endHand} from '../dux/pokerReducer'
import {checkSeats} from '../Math/CountingCards'
import './CashMeter.scss'


const CashMeter = (props) => {
    const {players, bigPosition, phase, count} = props.game.poker
    const {whosTurn, previousTurn, tableReady, dealerReady, lastManStanding, demoMode} = props.cash.status
    const {pot, currentBet, isActive, watcher} = props.cash.cashFlow
    const {deck} = props.cards
        let headCount = isActive.length

    const [bet, setBet] = useState(0)
    const [active, setActive] = useState(0)
    const [sitter, setSitter] = useState(0)
    const [toggleMeter, setToggleMeter] = useState(false)
        let name = players[whosTurn].username
        let activeBalance = players[whosTurn].balance
        let activeMoney = players[whosTurn].cash

        let potBalance = [
            players[0].balance,
            players[1].balance,
            players[2].balance,
            players[3].balance
        ]
            let copyBalance = [...potBalance]

    useEffect(() => {
        !props.cards.pocket.length 
        ? setToggleMeter(false)
        : setToggleMeter(true)
    }, [props.cards.pocket])

    useEffect(() => {
    }, [lastManStanding])


    useEffect(() => {
        let newMin = findMinimum(copyBalance)
            console.log(copyBalance, 'first-arr')
            console.log(potBalance, 'first-arr')
        props.setCurrentBet(newMin)

        if (active !== 0) {
            console.log('fired-runner')
            runningTotal(newMin)
        }
    }, [active])


    useEffect(() => {
        // let newMin = findMinimum(copyBalance)
        //     // console.log(copyBalance, 'first-arr')
        // props.setCurrentBet(newMin)

        // if (active !== 0) {
        //     console.log('fired-runner')
        //     runningTotal(newMin)
        // }

        if (sitter !== 0) {
            alertFold(sitter - 1)
            setSitter(0)
        } else if (count !== 0) {
            console.log('fired-manager')
            manageTurn()
        }
        
            // console.log(copyBalance, '2nd-arr')
    }, [count])


    useEffect(() => {
        // if (phase > 0) {
        //     props.setCurrentBet(0)
        // }
        setActive(0)
    }, [phase])


    useEffect(() => {
        if (dealerReady) {
            props.checkPot(true)
        }
    }, [dealerReady])


    const findMinimum = (arr) => {
        return Math.max(...arr)
    }

        //  ACTION-BTNS =>>
        const setFold = () => {
            let headCount = isActive.length
            let folder = isActive.indexOf(whosTurn)                                
            let copy = isActive.filter(e => e !== whosTurn)                

            setSitter(folder + 1)
            props.setStatus(whosTurn, 'isFolding', true)
            props.setAlive(copy)
            props.setPrevTurn(whosTurn)
            props.setCount(count + 1)
        }
        // const goAllIn = () => {

        // }
        const placeBet = () => {
            let pay = activeMoney - bet
            let community = bet + currentBet

            setActive(active + 1)
            props.setStatus(whosTurn, 'isBetting', true)
            props.setBalance(community, whosTurn)
            props.setPot(pot + bet)
            props.banker(pay, whosTurn)
            props.setPrevTurn(whosTurn)
            props.setCount(count + 1)
            reset(0)
        }
        const setCheck = () => {
            setActive(active + 1)
            props.setStatus(whosTurn, 'isChecking', true)
            props.setPrevTurn(isActive.indexOf(whosTurn))
            props.setCount(count + 1)
        }
        const setRaise = () => {
            let community = (bet - activeBalance) + currentBet
            let pay = activeMoney - community
            let increase = bet + currentBet                

            setActive(active + 1)
            props.setStatus(whosTurn, 'isRaising', true)
            props.setBalance(increase, whosTurn)
            props.setPot(pot + community)
            props.banker(pay, whosTurn)
            props.setPrevTurn(isActive.indexOf(whosTurn))
            props.setCount(count + 1)
            reset(0)
        }
        const setCall = () => {
            let community = currentBet - activeBalance
                console.log(community, 'community')
            let pay
                if (community < 0) {
                    pay = activeMoney + community
                } else {
                    pay = activeMoney - community
                }
                console.log(pay, 'PAY-DUX')

            setActive(active + 1)
            props.setStatus(whosTurn, 'isCalling', true)
            props.setBalance(currentBet, whosTurn)
            props.banker(pay, whosTurn)
            props.setPot(pot + community)
            props.setPrevTurn(isActive.indexOf(whosTurn))
            props.setCount(count + 1)
            reset(0)
        }

        const autoPick = (whosTurn) => {
                console.log(currentBet, 'curr-1')
                console.log(copyBalance, 'balances')
            let sitOut = (currentBet / activeBalance)
                console.log(sitOut.toFixed(2))
                console.log(activeMoney)

            // if (sitOut >= 0.26) {
            //     console.log('folded')
            //     setFold()
            // } else if (sitOut > 0 && sitOut <= 0.25) {
            //     console.log('called')
            //     setCall()
            // } else if (sitOut === 0) {
            //     console.log('checked')
            //     setCheck()
            // }

            if (sitOut === 1 || !sitOut) {
                
                setCheck()
                console.log('checked')
            } else {
                setCall()
                console.log('called')
                // setFold()
            }

            console.log(currentBet, 'curr-2')
            console.log(players[whosTurn])
        }

    // useEffect(() => {
    //     if (whosTurn !== 0) {
    //         autoPick([setCall, setFold], players[whosTurn])
    //     }
    //     // console.log(whosTurn)
    // }, [whosTurn])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (whosTurn !== 0) {
                autoPick(whosTurn)
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [whosTurn])
    
    const manageTurn = () => {
        let newTurn = isActive.filter(e => e !== whosTurn)
        let end = isActive[isActive.length]
        let copyPrevious = previousTurn
            let increment = isActive[++copyPrevious]

            if (headCount > 2) {
                if (increment === end || whosTurn === end) {                    
                    props.setPlayerTurn(isActive[0])
                } else {                    
                    props.setPlayerTurn(increment)
                }
            } else if (headCount === 2) {
                props.setPlayerTurn(newTurn[0])
            }
    }

    const alertFold = (index) => {            
        let headCount = isActive.length
        let start = isActive[0]
        let finder = isActive.indexOf(previousTurn)
        let end = isActive[isActive.length - 1]
        let prevFolded = isActive[index]
            let copyPrevious = previousTurn
                let increment = isActive[++copyPrevious]
                
        if (headCount > 2) {
            if (index > end) {
                props.setPlayerTurn(start)
            } else if (index) {
                props.setPlayerTurn(prevFolded)
            } else if (finder === -1) {
                props.setPlayerTurn(prevFolded)
            } else if (!increment) {
                console.lo('!increment')
                props.setPlayerTurn(start)
            } else if (increment === end) {
                props.setPlayerTurn(start)
            } else {
                props.setPlayerTurn(increment)
            }
        } else if (headCount === 2) {
            if (index === 0 || !prevFolded) {
                props.setPlayerTurn(isActive[0])
            } else {
                props.setPlayerTurn(isActive[1])
            }
        } else {
            props.endHand(isActive[0] + 1)
            props.handIsOver(true)
        }
    }

    const runningTotal = (newMin) => {
        let activeChips = []
        console.log(newMin, 'PASSED-IN')

            for (let i = 0; i < isActive.length; i++) {
                activeChips.push(copyBalance[isActive[i]])
            }
        
        let lvlPot = activeChips.every(e => e === newMin)
        let headCount = activeChips.length
            
        if (active >= headCount && lvlPot) {
            props.movePhase(phase + 1)
            props.alertDealer(true)
            props.setCurrentBet(0)
            console.log(active, headCount, lvlPot, 'active, headcount, lvl')
        } else {
            console.log(active, headCount, lvlPot, 'active, headcount, lvl')
        }
    }

    const reset = () => {
        setBet(0)
    }
        
    const handleChange = () => {
        setBet(bet + 10)
    }

    return (
        <div className='slide-rule' >
            {
                toggleMeter ?
                <div className='counter-parent' >
                    <p id='whos-turn' style={{color: 'silver', fontWeight: 'bold'}}> {`${name}'s Move`} </p>
                    <p style={{color: 'silver', fontWeight: 'bold'}} > Current Bet: ${currentBet.toFixed(2)} </p>
                    {
                        demoMode
                        ?   <>
                            </>
                        :   <div className='modal-counter' >
                                <button
                                    id='ticker-btn-increment'
                                    onClick={handleChange}
                                    > <FiPlusCircle id='ticker' />
                                    </button>
                                <p> ${bet} </p>
                                <button 
                                    id='ticker-btn-reset'
                                    onClick={reset}
                                    > Reset </button>
                            </div>
                    }
                    <div className='meter-actions' >
                        {
                            demoMode && activeBalance < currentBet 
                            ?   <>
                                    <button
                                        id="ticker-btn"
                                        disabled={whosTurn !== 0}
                                        onClick={setCall} >
                                        {`Call ${currentBet - activeBalance}`} </button>
                                    <button
                                        id="ticker-btn"
                                        disabled={whosTurn !== 0}
                                        onClick={setFold} >
                                        Fold </button>    
                                </>
                            : demoMode
                            ?   <>
                                    <button
                                        id="ticker-btn"
                                        disabled={whosTurn !== 0}
                                        onClick={setCheck} >
                                        Check </button>
                                </>
                            : activeBalance < currentBet 
                            ?   <>
                                    <button
                                        id="ticker-btn"
                                        onClick={setCall} >
                                        {`Call ${currentBet - activeBalance}`} </button>
                                    <button
                                        id="ticker-btn"
                                        onClick={setRaise} >
                                        Raise </button>
                                    {/* <button
                                        id="ticker-btn"
                                        onClick={goAllIn} >
                                        All-in </button> */}
                                    <button
                                        id="ticker-btn"
                                        onClick={setFold} >
                                        Fold </button>    
                                </>
                            :
                            <>
                                 <button
                                    id="ticker-btn"
                                    onClick={setCheck} >
                                    Check </button>
                                <button
                                    id="ticker-btn"
                                    onClick={placeBet} >
                                    Bet </button>
                                <button
                                    id="ticker-btn"
                                    onClick={placeBet} >
                                    Fold </button>
                                {/* <button
                                    id="ticker-btn"
                                    onClick={goAllIn} >
                                    All-in </button> */}
                            </>
                        }                       
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    setPlayerTurn,
    setPot,
    banker,
    setCurrentBet,
    setStatus,
    setBalance,
    checkPot,
    movePhase,
    setAlive,
    startBetting,
    watchTotal,
    setWinner,
    handIsOver,
    setCount,
    alertDealer,
    endHand,
    setPrevTurn,
    wReady
})(CashMeter)