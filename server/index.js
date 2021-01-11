const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const next = require('next');
const scenes = require('./routes/scenes');
const projects = require('./routes/projects');
const config = require('./routes/config');

const server = express();
const PORT = process.env.PORT || 8080;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '.' });
const handle = app.getRequestHandler();

// setting body parser middleware
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 }
}));

server.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
server.use(bodyParser.json({ limit: '100mb', extended: true }));

const onListenComplete = function() {
    console.log(`> Ready on http://localhost:${PORT}`);
}

const onWildcard = (req, res) => handle(req, res, req.url);

const setupServer = function() {
    server.use(config.endpoint, config.router);
    server.use(scenes.endpoint, scenes.router);
    server.use(projects.endpoint, projects.router);
    // add other endpoints here
    server.get('*', onWildcard);

    // Running the server
    server.listen(PORT, onListenComplete);
}

// API routes
app.prepare().then(setupServer);
