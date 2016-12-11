import 'babel-polyfill';
import ReactDOM from 'react-dom';
import makeRoutes from './routes';
import createStore from './store';

const store = createStore();
const routes = makeRoutes(store);

// Render HTML on the browser
ReactDOM.render(routes, document.getElementById('root'));
