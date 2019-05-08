const fs = require('fs');
const http = require('http');
const path = require('path');

let server = null;

class ProjectServer {

    static start(projectPath) {

        const PORT = 8085;
        const URL = `http://localhost:${PORT}`;

        return new Promise((resolve, reject) => {
            try {
                if (!ProjectServer.isRunning()) {
                    server = http.createServer(function (req, res) {
                        const isRoot = req.url === '/';
                        const PATH = path.join(projectPath, isRoot ? 'index.html' : req.url);

                        fs.readFile(PATH, function (err, data) {
                            if (err) {
                                res.writeHead(404);
                                res.end(JSON.stringify(err));
                                return;
                            }
                            res.writeHead(200);
                            res.end(data);
                        });
                    });

                    server.listen(PORT);
                }
                resolve(URL);
            } catch(e) {
                reject(e);
            }
        });
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
                    server.close(() => {
                        server = null;
                        resolve();
                    });
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
