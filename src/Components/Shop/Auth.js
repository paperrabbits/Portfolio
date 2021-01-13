import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setCustomer, setFaves, setCart, setCount} from './dux/shopReducer'
import axios from 'axios'
import './Auth.scss'

const Auth = (props) => {
    const {push} = props.history
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        props.toggler()
        axios.post('/api/login-fresh', {email, password})
        .then(res => {
            props.setCustomer(res.data)
            getCart(res.data.cart_id)
            getFaves(res.data.wishlist_id)
        })
        .catch(err => console.log(err))
    }

    const register = () => {
        props.toggler()
        axios.post('/api/register-fresh', {email, password})
        .then(res => props.setCustomer(res.data))
        .catch(err => console.log(err))
    }

    const getCart = (id) => {
        axios.get(`/api/cart/${id}`)
        .then(res => {
            props.setCart(res.data)
            props.setCount(res.data.length)
        }).catch(err => console.log(err))
    }

    const getFaves = (id) => {
        axios.get(`/api/wishlist/${id}`)
        .then(res => props.setFaves(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div className='sign-master' >
            <div className='sign-wrapper' >
            <h3> Sign Into Your Account </h3>
                <div className='input-parent' >
                    <div className='input-fields' >
                        <p className='input-labels' > Email: </p>
                        <input
                            id='shop-auth-input' 
                            value={email}
                            placeholder="Email"
                            onChange={(evt) => setEmail(evt.target.value)} />
                    </div>
                    <div className='input-fields' >
                        <p className='input-labels' > Password: </p>
                        <input
                            id='shop-auth-input' 
                            value={password}
                            placeholder='Password'
                            type='password'
                            onChange={(evt) => setPassword(evt.target.value)} />
                    </div>
                </div>
                <div className='shop-auth-btns' >
                    <div id='cancel-btn' > 
                        <button id='shop-auth-btns' onClick={() => push('/gallery')} > ⤺ Continue Shopping </button>                
                    </div>
                    <div className='main-btns' >
                        <button id='shop-auth-btns' onClick={login} > Login </button>
                        <button id='shop-auth-btns' onClick={register} > Signup </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    setCustomer, 
    setFaves, 
    setCart,
    setCount
})(withRouter(Auth))