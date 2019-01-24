const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const scenes = require('./routes/scenes');
const projects = require('./routes/projects');
const config = require('./routes/config');
const electron = require('./electron');

const server = express();
const PORT = process.env.PORT || 8080;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '.' });
const handle = app.getRequestHandler();

// setting body parser middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const onListenComplete = function() {
    console.log(`> Ready on http://localhost:${PORT}`);
    electron.start(PORT);
}

const onWildcard = function(req, res) {
    return handle(req, res, req.url);
}

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
electron
    .setup()
    .then(function() {
        app.prepare()
            .then(setupServer);
    });
z
