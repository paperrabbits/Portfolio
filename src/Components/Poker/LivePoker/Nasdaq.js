import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './Nasdaq.scss';


const Nasdaq = (props) => {

    const [feed, setFeed] = useState([])

    return (
        <div className='main-feed' >
            
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {})(withRouter(Nasdaq))