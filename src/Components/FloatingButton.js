import React from 'react';
import './FloatingButton.scss';
import {withRouter} from 'react-router-dom';

const FloatingButton = (props) => {
    const {push} = props.history

    return (
        <div className='Special-btn' >
            <button onClick={() => push('/')} >
                Portfolio Home
            </button>
        </div>
    )
}

export default withRouter(FloatingButton);