/* eslint no-param-reassign: 0 */
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import Koa from 'koa';
import send from 'koa-send';
import jsonfile from 'jsonfile';
import { cookie } from 'redux-effects-universal-cookie';
import serialize from 'serialize-javascript';
import makeRoutes from './routes';
import createStore from './store';

const manifest = jsonfile.readFileSync(path.join(__dirname, 'build-manifest.json'));
const app = new Koa();
const port = 3000;

function HTML ({ html, initialState }) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>My Application</title>
            </head>
            <body>
                <div id="root">${html}</div>
                <script>window.$$initialState = ${serialize(initialState, { isJSON: true })};</script>
                <script src="/${manifest['client.js']}"></script>
            </body>
        </html>
    `;
}

app.use(async (ctx, next) => {
    if (!ctx.url.match(/\/favicon.ico/)) {
        console.log(`Request: ${ctx.url}`);
        if (ctx.url.match(/client\.[\w|\d]+\.js/)) {
            await send(ctx, ctx.url.replace('/', ''), { root: __dirname });
        } else {
            const store = createStore(ctx.cookies);
            if (ctx.cookies.get('user')) {
                const user = JSON.parse(decodeURIComponent(await store.dispatch(cookie('user'))));
                store.dispatch({ type: 'LOG_IN_SUCCESS', user });
            }
            const routes = makeRoutes(store);
            const initialState = store.getState();
            await match({ routes, location: ctx.url }, async (error, redirectLocation, renderProps) => {
                if (error) console.log(error);
                const html = renderToString(<RouterContext {...renderProps} />);
                ctx.body = HTML({ html, initialState });
                await next();
            });
        }
    } else {
        await next();
    }
});

app.listen(port);
console.log(`👻  Listening on http://localhost:${port}`);
