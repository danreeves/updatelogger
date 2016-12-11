import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import cookieMiddleware from 'redux-effects-universal-cookie';
import reducers from '../reducers';

const initialState = global.$$initialState || undefined;

export default function (cookies) {
    const cmid = (cookies) ? cookieMiddleware(cookies) : cookieMiddleware();
    return createStore(
        reducers,
        initialState,
        applyMiddleware(
            thunk,
            cmid,
            logger(),
        ),
    );
}
