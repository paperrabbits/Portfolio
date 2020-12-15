    // NPM 
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {GiFireAce} from 'react-icons/gi'

    // LOCAL
import {isLoggedIn} from '../../../../ducks/playerReducer'
import * as dispatchers from '../../../../utils/pokerDispatchers'
import './Dashboard.scss'

const Dashboard = (props) => {
    const {push} = props.history
    const {email, username, loggedIn} = props.user
    const {user} = props

    const [profile_pic, setPic] = useState('')
    const [toggle, setToggle] = useState(false)
    const [setUrl] = useState('')

    useEffect(() => {
        setPic(props.user.player.profile_pic)
    }, [props.user.player.profile_pic])

    useEffect(() => {
        console.log(user)
        if (!loggedIn) {
            push('/welcome')
        }
    }, [loggedIn])

    // useEffect(() => {
    //     console.log(user)
    //     if (!username) {
    //         props.isLoggedIn(false)
    //     }
    // }, [username])

    const goBtn = ({value}) => {
        push(`/${value}`)
    }

    const toDash = () => {
        push('/dashboard')
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    // const updatePic = () => {
    //     const {account_id} = props.user.player

    //     axios.put(`/api/picture/${account_id}`, {profile_pic})
    //         .then(res => props.setImage(res.data))
    //         .catch(err => console.log(err))
        
    //     handleToggle()
    // }

    // const logout = () => {
    //     axios.get('/api/logout')
    //         .then(player => {
    //             props.setPlayer(player.data)
    //             push('/poker')
    //         })
    //         .catch(err => console.log(err))
    // }
    // console.log(props)

    return (
        <div className='Dashboard-master' >
            <div id='dash-header' >
                <div className='dash-banner' >
                    <div className='main-logo-container' >
                        <div className='main-logo' >
                            <GiFireAce 
                                id='h-logo' 
                                onClick={toDash} />
                            <h1 id='lighthouse'> Lighthouse </h1>
                            <p id='lighthouse' > Poker Lounge </p> 
                        </div>
                    </div>
                    <div className='btn-container' >
                        <button
                            id='dash-btn'
                            onChange={(evt) => setUrl(evt.target.value)}
                            value='demo'
                            onClick={(evt) => goBtn(evt.target)} 
                            > Play Hold'em </button>
                        <button
                            id='dash-btn'
                            onChange={(evt) => setUrl(evt.target.value)}
                            value='live-poker'
                            onClick={(evt) => goBtn(evt.target)} 
                            > Live Poker </button>
                        <button
                            id='dash-btn'
                            onClick={props.logout}
                            > Exit Lounge </button>                    
                    </div>       
                </div>
                <div id='dash-stats' >
                {
                        toggle === false 
                        ?   <div id='img-container' >
                                <h3> {props.user.player.username} </h3>
                                <img
                                    id='profile-pic'
                                    src={props.user.player.profile_pic}
                                    alt=''
                                    // onMouseOver={displayTip}
                                    onClick={handleToggle}  />
                                <p> ${props.user.player.cash} </p>
                            </div>

                        :   <div>
                                <input 
                                    id='pic-input'
                                    placeholder='paste img url'
                                    value={profile_pic}
                                    onChange={(evt) => setPic(evt.target.value)} />
                                <button
                                    id='save-btn'
                                    onClick={() => dispatchers.setImage(profile_pic)}
                                    > Save </button>
                                <button
                                    id='save-btn'
                                    onClick={handleToggle} 
                                    > Cancel </button>
                            </div>
                    }
                    <h3> Rank: {props.user.player.rank} </h3>
                    <h3> W/L %: {props.user.player.win_loss} </h3>
                </div>                
            </div>
            <div className='dash-container' > </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    isLoggedIn
})(withRouter(Dashboard))