import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './StatusBar.scss'


const StatusBar = (props) => {
    const {players} = props.game.poker


    return (
        <div className='Status-bar' >
            {
                players.map((e, i) => (
                    <div key={i} >
                        <p style={{color: 'silver'}} > {e.username} </p>
                        <p> ${players[i].cash.toFixed(2)} </p>
                    </div>
                ))
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {})(withRouter(StatusBar))