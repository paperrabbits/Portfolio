//  NPM
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {motion, AnimateSharedLayouts} from 'framer-motion';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa';
import {IoMdCloseCircle} from 'react-icons/io';
import Circle from './Circle';
import StatusBar from './StatusBar';

//  LOCAL
import Drawer from './Drawer';
import './LiveGame.scss';
    
const projVariants = {
    hidden: {
        x: -185,
        opacity: 0.85,
        transition: {x: {ease: 'easeOut', duration: 0.5}}
    },
    visible: {
        x: 0,
        transition: {x: {type: 'spring', stiffness: 75, opacity: 0.75}}
    },
    peek: {
        x: -30,
        transition: {x: {type: 'spring', stiffness: 75, opacity: 0.75}}
    }
};
    
const LiveGame = (props) => {
    const {push} = props.history;

    const [toggleDrawer, showToggleDrawer] = useState(true);
    const [bounce, setBounce] = useState('');

    useEffect(() => {
    }, [toggleDrawer]);

    const toggler = () => {
        if (!toggleDrawer) {
            setBounce('visible');
        } else {
            setBounce('hidden');
        }
        showToggleDrawer(!toggleDrawer);
    };

    return (
        <div className='live-table' >
            <motion.div 
                className={toggleDrawer ? 'drawer-container' : 'drawer-container-closed'}
                variants={projVariants}
                animate={`${bounce}`} >
                <Drawer toggler={toggler} status={toggleDrawer} />
            </motion.div>
            <section>
                <StatusBar  />
                <Circle />
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {})(withRouter(LiveGame));