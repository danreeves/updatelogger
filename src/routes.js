// @flow
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import NoMatch from './components/NoMatch';
import Home from './components/Home';

const Routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="*" component={NoMatch} />
        </Route>
    </Router>
);

export default Routes;
