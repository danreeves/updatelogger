import 'babel-polyfill';
import Inferno from 'inferno';
import createBrowserHistory from 'history/createBrowserHistory';
import makeRoutes from './routes';

const browserHistory = createBrowserHistory();
const routes = makeRoutes(browserHistory);

// Render HTML on the browser
Inferno.render(routes, document.getElementById('root'));
