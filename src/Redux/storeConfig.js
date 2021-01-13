import {createStore, applyMiddleware} from "redux";
import rootReducer from "./store";
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
// import {loadState, saveState} from "./localStorage";
// import throttle from "lodash/throttle";
// import promiseMiddleware from "redux-promise-middleware";
// import LogRocket from 'logrocket'


const storeConfig = () => {
    const composeEnhancers = composeWithDevTools({trace: true});
    // const persistedState = loadState();
    const store = createStore(
        rootReducer,
        // persistedState,
        composeEnhancers(applyMiddleware(thunkMiddleware))
    );

    // store.subscribe(throttle(() => {
    //     saveState({
    //         auth: store.getState().auth,
    //         heroes: store.getState().heroes,
    //         hero: store.getState().hero
    //     });
    // }, 1000));

   return store;
};


export default storeConfig;