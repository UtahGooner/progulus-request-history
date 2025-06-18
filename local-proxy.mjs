/**
 * Created by steve on 5/26/2016.
 */

import 'dotenv/config';
import Debug from 'debug';
import express from 'express';
import httpProxy from 'http-proxy';
import http from 'node:http';
import path from 'node:path';


const auth = process.env.PROGULUS_API_AUTH;

const debug = Debug('progulus:local-proxy');

const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    auth: auth,
    secure: false,

});

proxy.on('error', (e, req, res) => {
    debug('onError()', req.url, e.message);
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    res.setHeader('Access-Control-Allow-Origin', '*');
});

proxy.on('proxyRes', (proxyRes, req, res, options) => {
    proxyRes.headers["access-control-allow-origin"] = 'http://localhost:8080';
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
})

const app = express();

app.locals.pretty = true;
app.set('json spaces', 2);
app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), '/views'));

app.use((req, res, next) => {
    debug(req.method, req.url);
    next();
});

app.use('/api', (req, res) => {
    proxy.web(req, res, { target: 'https://progulus.com/api' });
});

app.use('/images', (req, res) => {
    proxy.web(req, res, { target: 'https://progulus.com/ui/public/images' });
});


app.use('/rprweb', (req, res) => {
    proxy.web(req, res, { target: 'https://progulus.com/rprweb' });
});

const server = http.createServer(app);
server.listen(8001, 'localhost');
debug('listening on localhost:' + 8001);
