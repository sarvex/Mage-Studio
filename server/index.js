const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const sceneRouter = require('./routes/sceneRouter');
const electron = require('./electron');

const server = express();
const PORT = process.env.PORT || 8080;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '.' });
const handle = app.getRequestHandler();

// setting body parser middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.prepare().then(function() {

    server.use('/api/scenes', sceneRouter);

    server.get('*', (req, res) => (handle(req, res, req.url)));

    // Running the server
    server.listen(PORT, function() {
    	console.log(`> Ready on http://localhost:${PORT}`);
        //electron(PORT);
    });
});
