import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import './Drawer.scss'
import {GiHomeGarage} from 'react-icons/gi'

const Drawer = (props) => {
    const [toggle, setToggle] = useState(false)
    
    return (
        <div className='drawer' >
            <button>
                <GiHomeGarage />
                <h5> Return to Portfolio </h5>
            </button>
        </div>
    )
}
export default withRouter(Drawer)