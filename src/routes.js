import Inferno from 'inferno';
import { Router, Route, IndexRoute, Link } from 'inferno-router';
import { Provider } from 'inferno-redux';

import store from './store';
import App from './components/App';
import NoMatch from './components/NoMatch';
import Home from './components/Home';

export default (history) => (
    <Provider store={ store }>
        <Router history={ history }>
            <Route component={ App }>
                <IndexRoute component={ Home }/>
                <Route path="*" component={ NoMatch } />
            </Route>
        </Router>
    </Provider>
);
