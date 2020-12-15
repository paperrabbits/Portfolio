import React from 'react'
import {connect} from 'react-redux'
import {motion} from 'framer-motion'
import cardBack from '../../../assets/card-back.jpg'
import './Community.scss'


const transition = {
    flip: Infinity,
    duration: 2
}

const variants = {
    onDeal: {
        x: 0, y: 0,
        transition: {transition}
    },
    clearTable: {}
}

const Pocket = (props) => {
    const {pocket} = props.cards
    const {players} = props.game.poker
    
    return (
        <div className='pocket-container' >
            {
                players[0].isFolding 
                ?   <div className='pocket-hand' style={{opacity: '20%'}} >
                        <img src={cardBack} alt='' className='card-back' />
                        <img src={cardBack} alt='' className='card-back' />
                    </div>
                : pocket.map((card, i) => (
                    <motion.div 
                        key={i}
                        className='pocket-hand'
                        variants={variants}
                        animate='onDeal' 
                        // rotateX={45}
                        // rotateY={45}
                        // transition={transition}
                    >
                        <img className='card-face' alt='' src={card.card_face} />
                    </motion.div>
                ))
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Pocket)