import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

const Completed = (props) => {
    const listItems = props.list.tasks.filter((e) => e.complete === true).map((e) => {
        return  <div key={e.task_id}> {e.description} </div>
    });

    return (
        <li>
            <ol> {listItems} </ol>
        </li>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {})(Completed)