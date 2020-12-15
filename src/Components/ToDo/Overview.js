import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import axios from 'axios'
import preview from '../../assets/overview.png'
import './Overview.scss'

    //  ACTIONS  ( DUX )
import {setUser, showDrawer} from '../../ducks/listReducer'

const Overview = (props) => {
    const {push} = props.history
    const {showDrawer} = props.list

    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [toggle, setToggle] = useState(false)
    const [slide, setSlide] = useState(false)


    const login = () => {
        axios.post('/api/login-l', {email: emailInput, password: passwordInput})
            .then(res => {
                props.setUser(res.data)
                push('/my-time')
            })
            .catch(err => console.log(err))
    }


    const register = () => {
        axios.post('/api/register-l', {email: emailInput, password: passwordInput})
            .then(res => {
                props.setUser(res.data)
                push('/my-time')
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        setSlide(!slide)
    }, [showDrawer])


    return (
        <div className='Todo-Home' >
            <header style={{marginBottom: toggle ? '50px' : '15px'}} >
                <h1> My Time </h1>
                <div className='nav-links' >
                    <button 
                        onClick={() => setToggle(!toggle)} >
                        Login </button>
                    <button 
                        onClick={() => setToggle(!toggle)} >
                        Register </button>
                    <button 
                        onClick={() => push('/projects')} >
                        Portfolio Home </button>
                </div>
            </header>
            {
                toggle ?   
                <section className='auth-container' >
                    <div className='input-fields' >
                        <p className='input-labels' > Email: </p>
                        <input
                            id='auth-input' 
                            value={emailInput}
                            placeholder="Email"
                            onChange={(evt) => setEmailInput(evt.target.value)} />
                    </div>
                    <div className='input-fields' >
                        <p className='input-labels' > Password: </p>
                        <input
                            id='auth-input' 
                            value={passwordInput}
                            placeholder='Password'
                            type='password'
                            onChange={(evt) => setPasswordInput(evt.target.value)} />
                    </div>
                    <div className='auth-btn-container' >
                        <button 
                            onClick={login} > 
                            Login </button>
                        <button 
                            onClick={register} > 
                            Register </button>
                    </div>
                </section>
                : 
                null
            }
            <section className='description' >
                <h2> A simple to do app. </h2>
                <h2> Nothing more, nothing less. </h2>
                <p> Focus on simplicity. Only the features you need to get things done. </p>
            </section>
            <img src={preview} alt='preview' id='preview' />
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    setUser, 
    showDrawer
})(withRouter(Overview))