/* eslint no-param-reassign: 0 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import Koa from 'koa';
import { cookie } from 'redux-effects-universal-cookie';

import favicon from './server/favicon';
import bundle from './server/js-bundle';
import HTML from './server/html';
import routes from './routes';
import createStore from './store';

const app = new Koa();
const port = 3000;

app.use(favicon);
app.use(bundle);

app.use(async (ctx, next) => {
    console.log(`Request: ${ctx.url}`);
    // Set up initial store
    const store = createStore(ctx.cookies);
    if (ctx.cookies.get('user')) {
        const user = JSON.parse(decodeURIComponent(await store.dispatch(cookie('user'))));
        store.dispatch({ type: 'LOG_IN_SUCCESS', user });
    }
    // Match route in router
    match({ routes, location: ctx.url }, async (error, redirectLocation, renderProps) => {
        if (error) console.log(error);
        const html = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);
        const initialState = store.getState();
        ctx.body = HTML({ html, initialState });
        await next();
    });
});

app.listen(port);
console.log(`👻  Listening on http://localhost:${port}`);
