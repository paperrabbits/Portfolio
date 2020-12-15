//  NPM
import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {GiFireAce} from 'react-icons/gi'
import {FaFacebook, FaTwitter, FaPinterest} from 'react-icons/fa'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {IoIosGlobe} from 'react-icons/io'
import {motion} from 'framer-motion'

//  LOCAL
import SubHeader from './SubHeader'
import './Texas.scss'

const variants = {
    hidden: {opacity: 0}, 
    visible: {opacity: 1,
        transition: {duration: 0.5}
    }
    // hover: {
    //     // transition: {duration: 0.5},
    //     boxShadow: '0px 0px 10px 0px #f3f5f7'
    // }
}

const Texas = (props) => {    
    return (
        <motion.div 
            className='texas-master'
            // variants={variants}
            // initial='hidden'
            // animate='visible' 
            >
            <header className='texas-head' >
                <div className='texas-head-title' >
                    <h3> Lighthouse </h3>
                    <GiFireAce id='texas-logo' />
                    <h3> Poker </h3>
                </div>
                <div className='lang-obj'>
                    <IoIosGlobe id='globo' />
                    <p> English </p>  
                </div>
            </header>
            <SubHeader  />
            <div className='texas-body' >
                {/* <h1 id='banner' > Lighthouse Poker Lounge </h1> */}
            </div>
            <footer>
                <div id='foot-content' >
                    <p> Our games are intended for individuals aged 18 and above for amusement purposes only. These games do not offer real money gambling or an opportunity to win real money. Practice or success at social games does not imply future success at real money gambling. </p>
                    <p> Copyright © 2001-2020, Rational Intellectual Holdings Limited. All Rights Reserved. Rational Poker School Limited, Douglas Bay Complex, King Edward Road, Onchan, Isle of Man, IM3 1DZ. </p>
                </div>
                <div id='foot-icons-wrapper' >
                    <FaFacebook className='foot-icons' id='fb' />
                    <FaTwitter className='foot-icons' id='tweet' />
                    <FaPinterest className='foot-icons' id='pin' />
                    <AiFillGoogleCircle className='foot-icons' id='google' />
                </div>
            </footer>
        </motion.div>
    )
}

export default (withRouter(Texas))