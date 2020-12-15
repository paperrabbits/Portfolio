import React from 'react'
import {withRouter} from 'react-router-dom'
import './Footer.scss'

const Footer = (props) => {
    const {push} = props.history

    const toGit = () => {
        push('/https://github.com/jobowls')
    }

    return (
        <div className='Main-Footer' >
            <span> <a href='https://github.com/jobowls' > Github/jobowls </a> </span>
            <span> <a href='https://github.com/jobowls' > LinkedIn </a> </span>
        </div>
    )
}
export default withRouter(Footer)