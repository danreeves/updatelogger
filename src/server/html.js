import path from 'path';
import jsonfile from 'jsonfile';
import serialize from 'serialize-javascript';

const manifest = jsonfile.readFileSync(path.join(__dirname, 'build-manifest.json'));

export default function HTML ({ html, initialState }) {
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
