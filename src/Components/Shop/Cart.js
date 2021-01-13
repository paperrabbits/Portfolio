import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setCart, setCount} from './dux/shopReducer'
import axios from 'axios'
import Auth from './Auth'
import './Cart.scss'
import ShopHeader from './ShopHeader'
import {ImArrowLeft2} from 'react-icons/im'
import {motion} from 'framer-motion'
import Footer from './Footer'

const Cart = (props) => {
    const {cart, products, wishlist, customer, counter} = props.shop
    const {cart_id, customer_id} = props.shop.customer
    const {push} = props.history
    const {pathname} = props.location

    const [showAuth, setShowAuth] = useState(false)
    const [feed, setFeed] = useState([])

    useEffect(() => {
        setFeed([...cart])
    },[cart])

    const toggler = () => {
        setShowAuth(!showAuth)
    }

    const removeFromCart = (id) => {
        axios.delete(`/api/remove-item/${id}`)
        .then(() => getCart())
        .catch(err => console.log(err))
        props.setCount(counter - 1)
    }

    const getCart = () => {
        axios.get(`/api/cart/${cart_id}`)
        .then(res => props.setCart(res.data))
        .catch(err => console.log(err))
    }

    const mapper = feed.map(e => (
        <div key={e.product_id} className='product-box' >
            <h2> {e.name} </h2>
            <img alt='' src={e.image} onClick={() => push(`/product/${e.product_id}`)} />
            <p> ${e.price} </p>
            <button onClick={() => removeFromCart(e.cart_item_id)} > Remove Item </button>
        </div>
    ))

    const subTotal = feed.map(item => +item.price).reduce((accu, val) => {
        return (accu += val)
    }, 0)

    return (
        <div className='cart-master' >
            <ShopHeader />
            {
                !cart_id
                ?   <Auth toggler={toggler} />
                :   cart_id && !cart.length
                ?   <div id='emtpy-modal' >
                        <h3> MY CART </h3>
                        <p> It appears that your cart is currently empty! </p>
                        <button id='back-btn' onClick={() => push('/gallery')}> ⤺ Continue Shopping </button>
                    </div>
                :   <section>
                        <ImArrowLeft2 id='nav-back'  onClick={() => push('/gallery')} />
                        <div className='cart-feed' > {mapper} </div>
                        <div className='order-modal' > 
                            <div>
                                <h1> Review Order For </h1>
                                <h3> {customer.email} </h3>
                            </div>
                            <p> {cart.length} Items </p>
                            <p> ${subTotal.toFixed(2)} </p>
                        </div>
                    </section>
            }
            {/* <Footer /> */}
        </div>
    )
}    
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {setCart, setCount})(withRouter(Cart))