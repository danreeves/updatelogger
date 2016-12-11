// @flow
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import type { Store } from 'redux';

import App from './components/App';
import NoMatch from './components/NoMatch';
import Home from './components/Home';

const Routes = (store : Store<>) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="*" component={NoMatch} />
            </Route>
        </Router>
    </Provider>
);

export default Routes;
