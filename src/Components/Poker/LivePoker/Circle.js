import React from 'react'
import {connect} from 'react-redux'
import './Circle.scss'

const Circle = (props) => {
    const {players} = props.game.poker
    const {profile_pic} = props.game.poker.players

    return (
        <div className='circle-container' >
            {
                players.map((e, i) => (
                    <div key={i} >
                        <p> {e.username} </p>
                        {/* <p> ${e.cash} </p> */}
                    </div>
                ))
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {})(Circle)