import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import storeConfig from './Redux/storeConfig';

const store = storeConfig();

ReactDOM.render(
  <HashRouter>
    <Provider store={store} >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </HashRouter>, document.getElementById('root')
);
// serviceWorker.register()
serviceWorker.unregister();
