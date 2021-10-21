import React, {useState, useEffect, useRef, useDispatch} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './ListAuth.scss';
import * as dispatchers from './utils/middleware';
import axios from 'axios';
import {setUser, login} from './dux/listReducer';


const ListAuth = (props) => {
    const {push} = props.history;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = () => {
        axios.post('/api/register-l', {email, password})
        .then(user => {
            console.log('list-api', user.data)
            props.setUser(user.data)
        })
        .catch(err => console.log(err));
    };

    // const login = () => {
    //     axios.post('/api/login-l', {email, password})
    //     .then(user => {
    //         console.log('list-api', user.data)
    //         props.setUser(user.data)
    //     })
    //     .catch(err => console.log(err));
    // };


    return (
        <section className='auth-container' >
            <div className='input-fields' >
                <p className='input-labels' > Email: </p>
                <input
                    id='auth-input' 
                    value={email}
                    placeholder="Email"
                    onChange={(evt) => setEmail(evt.target.value)} />
            </div>
            <div className='input-fields' >
                <p className='input-labels' > Password: </p>
                <input
                    id='auth-input' 
                    value={password}
                    placeholder='Password'
                    type='password'
                    onChange={(evt) => setPassword(evt.target.value)} />
            </div>
            <div className='auth-btn-container' >
                <button 
                    onClick={() => props.login(email, password)} 
                    > 
                    Login </button>
                <button 
                    onClick={() => register(email, password)} 
                    > 
                    Register </button>
            </div>
        </section>
    )
};

const mapDux = reduxState => reduxState;

export default connect(mapDux, {setUser, login})(withRouter(ListAuth));