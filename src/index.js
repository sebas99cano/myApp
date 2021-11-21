import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/routes/App';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reducer from './core/reducer/'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import 'antd/dist/antd.css'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

