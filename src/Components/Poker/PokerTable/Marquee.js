    // NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

    // LOCAL
import './Marquee.scss'
import Winner from '../Math/Winner'
import ShowStopper from './ShowStopper'

const Marquee = (props) => {
    const {handIsOver, winner} = props.game.status
    const {username} = props.user.player

    const [isOn, setIsOn] = useState(false)

    return (
        <div className='Marquee-master'>
            <p> {username || 'Player1'} </p>
            <div className={handIsOver && winner === 'Player1' ? 'marquee-header-w' : 'marquee-header'} > <ShowStopper /> </div>
            <div id='winner-bucket' > {handIsOver ? <Winner /> : null} </div>
            {/* <div className='switch-container'>
                <input
                    className="react-switch-checkbox"
                    id={`react-switch-new`}
                    onChange={() => setIsOn(!isOn)}
                    type="checkbox" />
                <label
                    className="react-switch-label"
                    style={{ background: isOn && 'red' }}
                    htmlFor={`react-switch-new`} >
                    <span className={`react-switch-button`} />
                </label>
            </div> */}
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Marquee)