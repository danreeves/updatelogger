import path from 'path';
import Inferno from 'inferno';
import { renderToString } from 'inferno-server'
import { RouterContext, match } from 'inferno-router';
import Koa from 'koa';
import send from 'koa-send';
import createHistory from 'history/createMemoryHistory';
import jsonfile from 'jsonfile';
import makeRoutes from './routes';

const manifest = jsonfile.readFileSync(
    path.join(__dirname, 'build-manifest.json')
);
const app = new Koa();
const port = 3000;

function Html({ children }) {
    return (
        <html>
            <head>
                <title>My Application</title>
            </head>
            <body>
                <div id="root">{children}</div>
                <script src={'/' + manifest['client.js']}></script>
            </body>
        </html>
    );
}

app.use(async(ctx, next) => {
    if (!ctx.url.match(/\/favicon.ico/)) {
        console.log(`Request: ${ctx.url}`);
        if (ctx.url.match(/client\.[\w|\d]+\.js/)) {
            await send(ctx, ctx.url.replace('/',''), { root: __dirname });
        } else {
            const routes = makeRoutes(createHistory({
                initialEntries: [ctx.url],
                initialIndex: 0,
            }));
            const renderProps = match(routes, ctx.url);
            const content = (<Html><RouterContext {...renderProps} /></Html>);

            ctx.body = '<!DOCTYPE html>\n' + renderToString(content);
            await next();
        }
    } else {
        await next();
    }
});

app.listen(port);
console.log(`👻  Listening on http://localghost:${port}`)
