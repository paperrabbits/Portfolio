import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Texas from './Components/Poker/Home/Texas'
import Main from './Components/Portfolio/Main'
import Welcome from './Components/Poker/Home/Welcome'
import Dashboard from './Components/Poker/Home/Dash/Dashboard'
import Poker from './Components/Poker/PokerTable/Poker'
import MyTime from './Components/ToDo/MyTime'
import ToDo from './Components/ToDo/ToDo'
import Gallery from './Components/Shop/Gallery'
import Highlight from './Components/Shop/Highlight'
import Live from './Components/Poker/LivePoker/Live'
import Wishlist from './Components/Shop/Wishlist'
import Cart from './Components/Shop/Cart'
import StoreFront from './Components/Shop/StoreFront'

export default (
    <Switch>
        <Route exact path='/'       component={Main} />
        <Route path='/projects'     component={Main} />
        <Route path='/poker'        component={Texas} />
        <Route path='/welcome'      component={Welcome} />
        <Route path='/dashboard'    component={Dashboard} />
        <Route path='/demo'         component={Poker} />
        <Route path='/live-poker'   component={Live} />
        <Route path='/my-time'      component={ToDo} />
        <Route path='/todo'         component={MyTime} />
        <Route path='/shop'         component={StoreFront} />
        <Route path='/gallery'      component={Gallery} />
        <Route path='/product/:id'  component={Highlight} />
        <Route path='/cart'         component={Cart} />
        <Route path='/wish-list'    component={Wishlist} />
    </Switch>
)