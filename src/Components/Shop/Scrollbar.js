import React, {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import {setProducts, setDisplay, setPosition} from './dux/shopReducer'
import './Scrollbar.scss'

//  FRAMER MOTION API
import {motion} from 'framer-motion'

const variants = {
    container: {
        hidden: {
            opacity: 0 
        },

        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5
            }
        }
    },

    left: {
        x: 0,
        transition: {x: {type: 'spring', stiffness: 100}}
    },

    right: {
        x: 0,
        transition: {x: {type: 'spring', stiffness: 100}}
    }
}

const FreshlyHome = (props) => {
    const {push} = props.history
    const {products, display, startPosition} = props.shop

    const [feed, setFeed] = useState(0)

    const increment = () => {
        let start = startPosition + 1
        setFeed(50)
        console.log(feed)

        for (let i = 0; i <= products.length - 1; i++) {
            if (display === products.length) {
                props.setPosition(products.length - display)
                props.setDisplay(products.length - startPosition)
            } else {
                props.setPosition(start)
                props.setDisplay(display + 1)
            }
        }
    }

    const decrement = () => {
        let start = startPosition - 1
        setFeed(-50)
        console.log(feed)

        for (let i = products.length - 1; i >= 0; i--) {
            if (startPosition === 0) {
                props.setPosition(products.length - display)
                props.setDisplay(products.length)
            } else {
                props.setPosition(start)
                props.setDisplay(display - 1)
            }
        }
    }

    const detailedView = (id) => {
        push(`/product/${id}`)
    }

    const showFeed = products.slice(startPosition, display).map((item => (
        <motion.ul 
            key={item.product_id} 
            id='marquee-container' 
            variants={variants}
            initial=''
            animate='visible'
            onClick={() => detailedView(item.product_id)} >
            <h3 id="home-name"> {item.name} </h3>
            <motion.img
                id='home-image'
                transition={{type: 'tween', duration: 0.25}}
                src={item.image} 
                alt='' />
        </motion.ul>
    )))

    return (
        <div className='Feed' >
            <div className='shop-scrollbar'>
                <button 
                    id='scroll-btn'
                    onClick={decrement}
                    > <FaArrowAltCircleLeft id='scroll-btns' /> </button>
                <div className='marquee'>
                    {showFeed}
                </div>
                <button 
                    id='scroll-btn'
                    onClick={increment}
                    > < FaArrowAltCircleRight id='scroll-btns' /> </button>
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    setProducts,
    setDisplay,
    setPosition
})(withRouter(FreshlyHome))