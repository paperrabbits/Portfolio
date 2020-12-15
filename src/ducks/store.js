import {createStore, applyMiddleware, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
// import LogRocket from 'logrocket'
import playerReducer from './playerReducer'
import cardsReducer from './cardsReducer'
import scoringReducer from './scoringReducer'
import cashReducer from './cashReducer'
import pokerReducer from './pokerReducer'
import rulesReducer from './rulesReducer'
import dealerReducer from './dealerReducer'
import listReducer from './listReducer'
import shopReducer from './shopReducer'
import styleReducer from './styleReducer'
import liveReducer from './liveReducer'

const rootReducer = combineReducers({
    user: playerReducer,
    cards: cardsReducer,
    score: scoringReducer,
    cash: cashReducer,
    game: pokerReducer,
    rules: rulesReducer,
    dealer: dealerReducer,
    list: listReducer,
    shop: shopReducer,
    styled: styleReducer,
    live: liveReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))