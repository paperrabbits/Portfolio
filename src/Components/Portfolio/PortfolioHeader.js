//  NPM
import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {DiReact} from 'react-icons/di'
import {GiEarthAmerica} from 'react-icons/gi'
import {GiWireframeGlobe} from 'react-icons/gi'
import {GiCircleClaws} from 'react-icons/gi'
import {motion} from 'framer-motion'
import {didVisit} from './dux/styleReducer'
import {connect} from 'react-redux'

//  LOCAL
import './PortfolioHeader.scss'

const variants = {
    firstLoad: {
        y: 10, 
        opacity: 1,
        transition: {y: {type: "spring", stiffness: 100, opacity: 0, delay: 0.5}}
    }
    // loaded: {
    //     opacity: 1,
    //     y: 10
    // }
}

const PortfolioHeader = (props) => {
    const {push} = props.history
    const {pathname} = props.location
    const {visited} = props.styled

    // const [hit, setHit] = useState(0)

    useEffect(() => {
        if (pathname === '/' || pathname === '/projects') {
            props.didVisit(true)
            // setHit(hit + 1)
        }
        // console.log(visited, hit, 'visited::hit')
    }, [pathname])

    // const title = ''

return (
    <motion.div className="Portfolio-Header"
        initial={!visited ? {y: -250} : {y: 10}}
        variants={variants}
        animate='firstLoad'
    >
        <motion.button
            onClick={() => push('/')}
            > <p id='t-left' > Home </p> </motion.button>
        <button 
            onClick={() => push('/projects')}
            whileHover={{
                textShadow: '0px 0px 8px rgb(255, 255, 255)',
                boxShadow: '0px 0px 8px rgb(255, 255, 255)'
            }}> <p id='t-left'> Projects </p> </button>
        <div className='port-logo' >
        <motion.h3  
            // initial={!visited && {color: '#000000'}}
            // animate={{color: '#f3f5f7'}} 
            // transition={{type: 'tween', duration: 3}} 
            > Josh Bowler </motion.h3>
            {/* <img src={logo} alt='logo' id='main-logo' style={{visibility: 'hidden'}} /> */}
            {/* <GiEarthAmerica id='port-logo' /> */}
            <h5> Full-Stack Developer </h5>
        </div>
        <button> <p id='t-right' > About </p> </button>
        <button> <p id='t-right' > Contact </p> </button>
    </motion.div>
)
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {didVisit})(withRouter(PortfolioHeader))