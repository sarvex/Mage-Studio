const express = require('express');

let server = null;

class ProjectServer {

    static start(path) {

        const PORT = 8085;
        const url = `http://localhost:${PORT}`;

        return new Promise((resolve, reject) => {
            try {
                if (!ProjectServer.isRunning()) {
                    server = express();
                    server.use(express.static(path));
                    server.listen(PORT);

                    resolve(url);
                } else {
                    resolve(url);
                }
            } catch(e) {
                reject(e);
            }
        })
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
                    server = null;
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
