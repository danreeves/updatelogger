import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import makeRoutes from './routes';
import createStore from './store';

const history = createBrowserHistory();
const store = createStore();
const routes = makeRoutes({ store, history });

// Render HTML on the browser
ReactDOM.render(routes, document.getElementById('root'));
