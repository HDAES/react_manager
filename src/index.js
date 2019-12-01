import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router'
import  { Provider } from 'react-redux'
import config from './redux/store'
const store = config()
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>, 
document.getElementById('root'));

