const npm = require('npm');
const spawn = require('child_process').spawn;

let buildProcess = null;

const options = {
    logLevel: 'silent',
    progress: false
};

class NpmHelper {

    static getOptions(path) {
        return {
            ...options,
            dir: path
        }
    }

    static install(path) {
        return new Promise((resolve, reject) => {
            npm.load(NpmHelper.getOptions(path), function (err) {
                npm.commands
                    .install(path, [], function(er, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
            });
        });
    }

    static build(path) {
        return new Promise((resolve, reject) => {
            try {
                if (buildProcess && !buildProcess.killed) {
                    return resolve();
                }

                // we should get a random open port above 8080
                // and pass it to npm run dev
                // const PORT = 8085;

                buildProcess = spawn('npm', ['run', 'build', '--prefix', `${path}`], { stdio: 'inherit' });

                // const url = `http://localhost:${PORT}`;

                buildProcess.on('exit', () => resolve(path));
            } catch(e) {
                reject(e);
            }
        });
    }
};

module.exports = NpmHelper;
