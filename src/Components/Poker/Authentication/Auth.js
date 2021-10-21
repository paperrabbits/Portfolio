//  NPM
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect, useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {GiFireAce} from 'react-icons/gi'

//  LOCAL
import {setPlayer, register, isLoggedIn} from '../dux/playerReducer'
import * as dispatchers from '../utils/constants'
import {setRules} from '../dux/rulesReducer'
// import {login, setPlayer, isLoggedIn} from '../dux/playerReducer'
import '../Home/Welcome.scss'


const Auth = (props) => {
    const {push} = props.history
    const {loggedIn, loading, player} = props.user

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        if (loggedIn) {
            push('/dashboard')
        }
    }, [loggedIn, loading])


    useEffect(() => {
        console.table(player)
    }, [player])
    
    const login = () => {
        console.log('firing login from auth comp =>> FRONT-END')
    
        axios.post('/api/login', {email, username, password})
            .then(player => {            
                props.setPlayer(player.data)
                props.isLoggedIn(true)
                console.log(player.data)
                
                if (player.statusText === 'Accepted') {
                    console.log(player.statusText, '++')
                    // checkRoute()
                } else {
                    console.log(player.statusText, '--')
                    window.alert('Incorrect username or password')
                }
            })
            .catch(error => console.log(error))

        // axios.get('/api/rules')
        //     .then(res => props.setRules(res.data))
        //     .catch(err => console.log(err))
    }

    const register = () => {        
        axios.post('/api/register', {email, username, password})
            .then(player => {
                props.setPlayer(player.data)
                props.loggedIn(player.data)
                console.log(player.data)
                
                if (player.statusText === 'Accepted') {
                    console.log(player.statusText, '++')
                    // checkRoute()
                } else {
                    console.log(player.statusText, '--')
                }
            })
            .catch(error => console.log(error))
    }

    // const handleLogin = () => {
    //     console.log('hit --> button')
    //     props.login(email, username, password)
    // }

    return (
        <div className='auth-body' >
            <header className='auth-header'>
                <GiFireAce id='logo' />
                <div id='auth-title'>
                    <h1 id='title' > Lighthouse </h1>
                    <h2> poker lounge </h2>
                </div>
            </header>
            <div className='auth-input-parent'>
                <div className='auth-input-divider' >
                    <p> Email </p>
                    <input
                        id='auth-input'
                        placeholder='email'
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)} />
                </div>
                <div className='auth-input-divider' >
                    <p> Username </p>
                    <input
                        id='auth-input'
                        placeholder='username'
                        value={username}
                        onChange={(evt) => setUsername(evt.target.value)} />
                </div>
                <div className='auth-input-divider' >
                    <p> Password </p>
                    <input
                        id='auth-input'
                        placeholder='password'
                        value={password}
                        type='password'
                        onChange={(evt) => setPassword(evt.target.value)} />
                </div>
            </div>
            <div className='submit-btns-container' >
                <div id='auth-btn-parent' >
                    <p> Already have an account? </p>
                    <button
                        className='submit'
                        onClick={() => login(email, username, password)} >
                        Login 
                    </button>
                </div>
                <div id='auth-btn-parent' >
                    <p> Create account </p>
                    <button
                        className='submit'
                        onClick={() => register(email, username, password)} 
                        >
                        Register 
                    </button>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    register,
    setRules,
    setPlayer, 
    isLoggedIn
})(withRouter(Auth))