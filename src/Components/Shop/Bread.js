import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import './Crumbs.scss'

const Bread = (props) => {
    const {pathname} = props.location
    const {push} = props.history

    const [url, setUrl] = useState('')

    useEffect(() => {
        setUrl(`${pathname}`)
    },[pathname])

    return (
        <div>
            <Breadcrumb className='crumbs' >
                <Breadcrumb.Item> Home </Breadcrumb.Item>
                <Breadcrumb.Item active={url.includes('gallery') ? true : false} > Gallery </Breadcrumb.Item>
                <Breadcrumb.Item active={url.includes('highlight') ? true : false} > Product </Breadcrumb.Item>
                <Breadcrumb.Item active={url.includes('cart') ? true : false} > Cart </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}
export default withRouter(Bread)