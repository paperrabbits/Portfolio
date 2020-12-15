import React from 'react'
import {withRouter} from 'react-router-dom'
import './SubHeader.scss'
import {GoArrowRight, GoArrowLeft} from 'react-icons/go'

const SubHeader = (props) => {
    const {push} = props.history

    const playDemo = () => {
        push('/welcome')
    }

    const toProjects = () => {
        push('/projects')
    }
    
    return (
        <div className='sub-head-master' >
            <div id='nav-links' >
                <span>
                    <GoArrowLeft id='goArrow' />
                    <button
                        className='sub-btns'
                        onClick={toProjects}
                        > Back to Portfolio </button>
                </span>
                <span>
                    <button 
                        id='poker-btn'
                        className='sub-btns'
                        onClick={playDemo} 
                        > Play Poker </button>
                    <GoArrowRight id='goArrow' />
                </span>
            </div>
        </div>
    )
}

export default withRouter(SubHeader)