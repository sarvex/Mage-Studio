const express = require('express');

let server = null;

class ProjectServer {

    static start(path) {

        console.log('server start', path);

        return new Promise((resolve, reject) => {
            server = express();

            server.use(express.static(path));

            server.listen(8085);

            resolve();
        })
        /*
        *  creates the instance of the httpserver
        *  stores the instance of the swerver somewhere
        *
        * */
    }

    static isRunning() {
        return server !== null;
    }

    static stop(path) {
        /*
        * stop the current server instance
        * */
    }
}

module.exports = ProjectServer;
