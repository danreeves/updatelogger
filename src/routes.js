// @flow
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import type { Store } from 'redux';

import App from './components/App';
import NoMatch from './components/NoMatch';
import Home from './components/Home';

export default ({ store, history } : { store: Store<>, history: Object }) => (
    <Provider store={store}>
        <Router history={history}>
            <Route component={App}>
                <IndexRoute component={Home} />
                <Route path="*" component={NoMatch} />
            </Route>
        </Router>
    </Provider>
);
