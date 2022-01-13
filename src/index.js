import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';


export const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);