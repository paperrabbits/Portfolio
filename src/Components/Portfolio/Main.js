//  NPM
import React, {useState, useEffect, useRef} from 'react'
import {withRouter} from 'react-router-dom'

//  LOCAL
import PortfolioHeader from './PortfolioHeader'
import Footer from './Footer'
import Projects from './Projects'
import TestFramer from './TestFramer'
// import routes from './'
import './Main.scss'

const Main = (props) => {
    const {push} = props.history
    const {pathname} = props.location

    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);

    const handleScroll = () => {
        // console.log(ref.current)
        if (ref.current) {
          setSticky(ref.current.getBoundingClientRect().top <= 0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    return (
        <div className="Main">
            <div 
                className={`sticky-container${isSticky ? ' sticky' : ''}`} 
                style={{height: '100px', width: '100%'}}
                ref={ref} >    
                <PortfolioHeader  />
            </div>
            <>
            {
                pathname === '/projects'
                ?   <Projects />
                :   <TestFramer /> 
            }
            </>
            {/* {routes} */}
            <Footer />
        </div>
    )
}
export default withRouter(Main)