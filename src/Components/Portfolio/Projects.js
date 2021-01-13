import React from 'react'
import {withRouter} from 'react-router'
import {motion} from 'framer-motion'
import {FaAngleDoubleRight, FaLongArrowAltRight} from 'react-icons/fa'
import {SiAtom} from 'react-icons/si'
import './Main.scss'

const projVariants = {
    hidden: {opacity: 0}, 
    visible: {opacity: 1,
        transition: {duration: 1},
        // boxShadow: '0px 0px 10px 0px #202a32ff'
    },
    hover: {
        // transition: {duration: 0.5},
        boxShadow: '0px 0px 10px 0px #f3f5f7'
    }
}

const Projects = (props) => {
    const {push} = props.history

    return (
        <motion.div 
            className='projects-main'
            variants={projVariants}
            initial='hidden'
            animate='visible'
        >
            <div className='main-grid-row' >
                {/* <div className='flip-card' > */}
                    <div className='col-1' >
                        <SiAtom className='arrow' />
                        <p> eCommerce Demo </p>
                    </div>
                    {/* <p> Description </p>
                    <p> Features </p> */}
                {/* </div> */}
                <motion.div 
                    className='col-2'
                    id='eCommerce'
                    variants={projVariants}
                    whileHover='hover'
                    onClick={() => push('/gallery')} >
                </motion.div>
            </div>
            <div className='main-grid-row' >
                {/* <div className='flip-card' > */}
                    <div className='col-1' >
                        <SiAtom className='arrow' />
                        <p> Card Game Demo </p>
                    </div>
                    {/* <p> Description </p>
                    <p> Features </p> */}
                {/* </div> */}
                <motion.div 
                    className='col-2'
                    id='games'
                    variants={projVariants}
                    whileHover='hover'
                    onClick={() => push('/poker')} >
                </motion.div>
            </div>
            <div className='main-grid-row' >
                {/* <div className='flip-card' > */}
                    <div className='col-1' >
                        <SiAtom className='arrow' />
                        <p> To-Do List Demo </p>
                    </div>
                    {/* <p> Description </p>
                    <p> Features </p> */}
                {/* </div> */}
                <motion.div 
                    className='col-2'
                    id='productivity'
                    variants={projVariants}
                    whileHover='hover' 
                    onClick={() => push('/todo')} >
                </motion.div>
            </div>
        </motion.div>
    )
}
export default withRouter(Projects)