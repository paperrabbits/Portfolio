import React from 'react'
import {withRouter} from 'react-router-dom'
import {FaFacebook, FaTwitter, FaPinterest} from 'react-icons/fa'
import {AiFillGoogleCircle} from 'react-icons/ai'
import './Footer.scss'

const Footer = (props) => {
    return (
        <div className='footer-main' >
            <h3> Freshly Picked Prints </h3>
            <FaFacebook className='foot-icons' id='fb' />
            <FaTwitter className='foot-icons' id='tweet' />
            <FaPinterest className='foot-icons' id='pin' />
            <AiFillGoogleCircle className='foot-icons' id='google' />
        </div>
    )
}
export default withRouter(Footer)