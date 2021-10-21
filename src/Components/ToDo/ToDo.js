import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import SideRail from './SideRail';
import CreateList from './CreateList';
import './ToDo.scss';
import {TiDeleteOutline, TiInputCheckedOutline} from 'react-icons/ti';
import {BsCheckCircle, BsXDiamondFill, BsXCircle, BsPlus} from 'react-icons/bs';
import axios from 'axios';
import {addTask, addLabel, setTasks, todoAdded, todosLoaded} from './dux/listReducer';
import {toDoApi} from './utils/middleware';
import Completed from './Completed';
import {fetchTodos} from './dux/listReducer';

const ToDo = (props) => {
    const {tasks} = props.list;
    const {account_id} = props.list.user;
    const {push} = props.history;

    const [toggle, setToggle] = useState(false);

    const loadTasks = tasks.map((e) => (
        <div key={e.task_id} >
            {e}
        </div>
    ));

    useEffect(() => {
        fetchTodos(account_id);
    }, [])

    useEffect(() => {
        if (account_id) {
            // setDashboard()
        } else if (!account_id) {
            push('/todo')
        }
    }, [account_id]);

    const handleToggle = () => {
        setToggle(!toggle)
        console.log(toggle)
    }

    return (
        <div className='todo-main' >
            
            {
                toggle 
                ? < CreateList toggler={handleToggle} /> 
                : <button onClick={handleToggle} > New Task </button>
            }
            {loadTasks}
        </div>
    )
};
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {todoAdded})(ToDo);


// const ToDo = (props) => {
//     const {cTasks, tasks, user, taskLabels, activeTasks} = props.list;
//     const {account_id} = props.list.user;
//     const {push} = props.history;

//     const [toggle, setToggle] = useState(false);
//     const [feed, setFeed] = useState([]);
//     const [view, setView] = useState([]);


//     useEffect(() => {
//         console.log(props.list)
//     }, [props.list]);

//     useEffect(() => {
//         if (props.list.filter) {
//             let activeFilter = feed.filter(e => e['title'] === props.list.filter);
//             setView([...activeFilter]);
//         };
//     }, [props.list.filter, feed]);

//     const setDashboard = () => {
//         axios.get(`/api/tasks/${account_id}`)
//             .then(res => props.addTask(res.data))
//             .catch(err => console.log(err))
//         console.log('hit-me')
//     };

//     useEffect(() => {
//         let listArr = [...taskLabels];

//         setFeed([...tasks]);

//         tasks.forEach(el => {
//             if (!listArr.includes(el['title'])) {
//                 listArr.push(el['title'])
//             }
//         });

//         !tasks.length
//         ? props.addLabel([])
//         : props.addLabel([...listArr])
//     }, [tasks]);


//     useEffect(() => {
//         if (account_id) {
//             setDashboard()
//             // toDoApi(account_id)
//         } else if (!account_id) {
//             push('/todo')
//         }
//     }, [account_id]);

    
//     const deleteItem = (id) => {
//         axios.delete(`/api/delete/${id}`)
//         .then(setDashboard())
//         // .then(toDoApi())
//         .catch(err => console.log(err))
//     };


//     const toggleComplete = (id, bool) => {
//         let complete;

//         if (bool) {
//             complete = false
//         } else if (!bool) {
//             complete = true
//         };

//         console.log(complete);

//         // toDoApi(id, complete, account_id);

//         axios.put(`/api/complete/${id}`, {complete})
//         .then(console.log('pending...'))
//         .catch(err => console.log(err));

//         setDashboard();
//     };

//     // useEffect(() => {
//     //     console.log('active-tasks', props.list)
//     // }, [activeTasks])


//     let mapper = feed.filter(e => e['complete'] === false).map((el, i) => (
//         <ul key={i} className='list-item' >
//             <div className='task-item-left' >
//                 <button  ><BsXDiamondFill id='btn-icon-edit' /></button>
//                 <button onClick={() => deleteItem(el.task_id)} ><BsXCircle id='btn-icon-del' /></button>
//                 <button onClick={() => toggleComplete(el.task_id, el.complete)} ><BsCheckCircle id='btn-icon-check' /></button>
//                 <div id='scroll-box' >
//                     <p id='task-description'> {el.description} </p>
//                 </div>
//             </div>
//             <p> {el.due_date.slice(0, 10)} </p>
//         </ul>
//     ));

//     let done = feed.filter(e => e['complete'] === true).map((el, i) => (
//         <ul key={i} className='list-item' >
//             {/* {
//                 el.complete ?
//                 <div className='task-item-left' >
//                     <button  ><BsXDiamondFill id='btn-icon-edit' /></button>
//                     <button onClick={() => deleteItem(el.task_id)} ><BsXCircle id='btn-icon-del' /></button>
//                     <button onClick={() => toggleComplete(el.task_id, el.complete)} ><BsCheckCircle id='btn-icon-check' /></button>
//                     <div id='scroll-box' >
//                         <p id='task-description'> {el.description} </p>
//                     </div>
//                 </div>
//                 :
//                 null
//             } */}
//             <div className='task-item-left' >
//                 <button  ><BsXDiamondFill id='btn-icon-edit' /></button>
//                 <button onClick={() => deleteItem(el.task_id)} ><BsXCircle id='btn-icon-del' /></button>
//                 <button onClick={() => toggleComplete(el.task_id, el.complete)} ><BsCheckCircle id='btn-icon-check' /></button>
//                 <div id='scroll-box' >
//                     <p id='task-description'> {el.description} </p>
//                 </div>
//             </div>
//             <p> {el.due_date.slice(0, 10)} </p>
//         </ul>
//     ));

//     // const rasterize = (str) => {
//     //     let filtered = tasks.filter(e => e['title'] === str)
//     //     setView([...filtered])
//     // }

//     let display = view.map((el, i) => (
//         <ul key={i} className='list-item' >
//             <div className='task-item-left' >
//                 <button  ><BsXDiamondFill id='btn-icon-edit' /></button>
//                 <button onClick={() => deleteItem(el.task_id)} ><BsXCircle id='btn-icon-del' /></button>
//                 <button onClick={() => toggleComplete(el.task_id)} ><BsCheckCircle id='btn-icon-check' /></button>
//                 <div id='scroll-box' >
//                     <p id='task-description'> {el.description} </p>
//                 </div>
//             </div>
//             <p> {el.due_date.slice(0, 10)} </p>
//         </ul>
//     ));


//     return (
//         <div className='todo-main' >
//             <SideRail id='top' />
//             <div className='section-lists' >
//                 <h1 onClick={() => setToggle(!toggle)}> Create Task </h1>
//                 {
//                     toggle 
//                     ?   <CreateList toggler={() => setToggle(!toggle)}  />
//                     :   null
//                 }
//                 <h3> Active </h3>
//                 <div className='list-wrapper' >
//                     <div className='list-container'>
//                     {
//                         props.list.filter
//                         ?   <>{display}</>
//                         :   <>{mapper}</>
//                     }
//                     </div>
//                 </div>
//                 <h3> Completed </h3>
//                 <div className='list-wrapper' >
//                     <div className='list-container' id='completed-tasks' >
//                         {done}
//                         {/* <Completed /> */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// const mapStateToProps = (reduxState) => reduxState;

// export default 
// connect(
//     mapStateToProps, {
//         addTask, 
//         addLabel,
//         setTasks
//     })(withRouter(ToDo));