import {combineReducers} from 'redux';

import playerReducer from '../Components/Poker/dux/playerReducer';
import cardsReducer from '../Components/Poker/dux/cardsReducer';
import scoringReducer from '../Components/Poker/dux/scoringReducer';
import cashReducer from '../Components/Poker/dux/cashReducer';
import pokerReducer from '../Components/Poker/dux/pokerReducer';
import rulesReducer from '../Components/Poker/dux/rulesReducer';
import dealerReducer from '../Components/Poker/dux/dealerReducer';
import listReducer from '../Components/ToDo/dux/listReducer';
import shopReducer from '../Components/Shop/dux/shopReducer';
import styleReducer from '../Components/Portfolio/dux/styleReducer';
import liveReducer from '../Components/Poker/dux/liveReducer';


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
});


export default rootReducer;