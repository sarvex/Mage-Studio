const npm = require('npm');
const spawn = require('child_process').spawn;

let instance = null;

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

    static run(path) {
        return new Promise((resolve, reject) => {
            try {
                if (instance && !instance.killed) {
                    return resolve();
                }

                // we should get a random open port above 8080
                // and pass it to npm run dev
                const PORT = 8085;

                instance = spawn('npm', ['run', 'dev', '--prefix', `${path}`, `--`, `${PORT}`], { stdio: 'inherit' });
                resolve();
            } catch(e) {
                reject(e);
            }
        });
    }
};

module.exports = NpmHelper;