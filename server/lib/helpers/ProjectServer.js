const express = require('express');

let server = null;

class ProjectServer {

    static start(path) {

        console.log('server start', path);

        return new Promise((resolve, reject) => {
            server = express();

            server.use(express.static(path));

            server.listen(8085);

            resolve('http://localhost:8085');
        })
        /*
        *  creates the instance of the httpserver
        *  stores the instance of the swerver somewhere
        *
        * */
    }

    static isRunning() {
        return server !== null && server.close;
    }

    static stop() {
        /*
        * stop the current server instance
        * */
        return new Promise((resolve, reject) => {
            try {
                if (ProjectServer.isRunning()) {
                    server.close(resolve);
                } else {
                    resolve();
                }
            } catch(e) {
                reject(e);
            }
        });
    }
}

module.exports = ProjectServer;
