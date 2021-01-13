import React, {useState, useEffect, useRef} from 'react'
import {withRouter} from 'react-router-dom'
import './ShopHeader.scss'
import logo from '../../assets/freshly-picked-logo.jpg'
import {motion} from 'framer-motion'
import {connect} from 'react-redux'
import axios from 'axios'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiXCircle} from 'react-icons/bi'

    //  ACTIONS  ( DUX )
import {setCustomer, setCart, setCount, triggerAuth, setFaves} from './dux/shopReducer'


const variants = {
    hidden: {
        y: -50,
        transition: {y: {type: 'tween', ease: 'linear', duration: 1}}
    },

    visible: {
        y: 0,
        transition: {y: {type: 'tween', ease: 'easeOut', duration: 0.75}}
    },

    pulse_init: { x: 0,  y: 0 },

    pulse: {
        x: 0, y: 0,
        scale: 1.5,
        transition: {type: 'tween', ease: 'easeOut', duration: 0.25}
    }
}


const ShopHeader = (props) => {
    const {push} = props.history
    const {email, cart_id, wishlist_id} = props.shop.customer
    const {counter, wishList} = props.shop

    //  REF => EVENT LISTENER FOR CLICK OUTSIDE DROPDOWN MENU 
    const node = useRef()
    const [isOpen, setIsOpen] = useState(false)


    const handleClickOutside = (evt) => {
        if (node.current.contains(evt.target)) { return }
        setIsOpen(false)
    }


    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])


    useEffect(() => {
        if (cart_id) {
            axios.get(`/api/cart/${cart_id}`)
            .then(res => props.setCart(res.data))
            .catch(err => console.log(err))
        }
    }, [cart_id])


    useEffect(() => {
        if (counter < 0) { props.setCount(0) }
    }, [counter])


    const logout = () => {
        axios.get('/api/logout-fresh')
        .then(res => props.setCustomer(res.data))
        .catch(err => console.log(err))
    }


    const login = () => {
        axios.post('/api/login-fresh')
        .then(res => props.setCustomer(res.data))
        .catch(err => console.log(err))
    }


    return (
        <div className='Shop-Header' ref={node} >
            <img id='logo' alt='' src={logo} onClick={() => push('/gallery')} />
            <h2> FRESHLY PICKED PRINTS </h2>
            {/* <div className='subHeader' > </div> */}
            {
                email ?
                <div className='head-nav' > 
                    <button 
                        onClick={() => push('/gallery')}> 
                        Gallery </button>
                    <button 
                        onClick={() => push('/projects')}> 
                        Portfolio </button>
                    <button 
                        id='cart-btn' 
                        onClick={() => setIsOpen(!isOpen)}> 
                        Wish List
                        <p> {wishList.length} </p> 
                    </button>
                    <button 
                        id='cart-btn' 
                        onClick={() => push('/cart')}> 
                        <AiOutlineShoppingCart id='cart-icon' /> 
                        <motion.p 
                            variant={variants} 
                            initial='pulse-init'
                            animate='pulse' > 
                            {counter} </motion.p>
                    </button>
                    <button onClick={logout} > Logout </button>
                </div>
            :   
                <div className='head-nav' > 
                    <button 
                        onClick={login} > 
                        Login </button>
                    <button 
                        onClick={() => push('/gallery')}> 
                        Gallery </button>
                    <button 
                        onClick={() => push('/cart')}> 
                        <AiOutlineShoppingCart id='cart-icon' /> </button>
                    <button 
                        onClick={() => push('/projects')}> 
                        Portfolio </button>
                </div>

            }
            {
                isOpen && 
                <motion.div 
                    className='dd-wish'
                    variants={variants}
                    initial='hidden'
                    animate='visible' >
                    <h4> Favorites </h4>
                {
                    !wishList.length 
                    ?   <p> ( Empty ) </p>
                    :   wishList.map(e => (
                        <div 
                            key={e.wishList_item_id} 
                            className='list-menu' >
                            <button  
                                onClick={() => props.delete(e.wishlist_item_id, 'wishlist')}
                                > <BiXCircle id='circle-x' /> </button>
                            <img 
                                src={e.image} 
                                alt='' 
                                onClick={() => push(`/product/${e.product_id}`)} />
                            <p> ${e.price} </p>
                        </div>
                    ))
                }
                </motion.div>
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    setCustomer,
    setCart,
    setCount,
    triggerAuth,
    setFaves
})(withRouter(ShopHeader))