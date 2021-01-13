import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {motion} from 'framer-motion'
import {withRouter, useRouteMatch, useParams} from 'react-router-dom'
import ShopHeader from './ShopHeader'
import {triggerAuth} from './dux/shopReducer'
import routes from '../../routes'

const StoreFront = (props) => {
    const {pathname} = props.location

    const [state, setState] = useState('')
    
    let match = useRouteMatch(`/shop/:${state}`)

    useEffect(() => {
        setState(pathname)
    },[pathname])

    useEffect(() => {
        console.log(state)
    },[state])

    return (
        <div>
            <ShopHeader />
            <>{match}</>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    triggerAuth
})(withRouter(StoreFront))