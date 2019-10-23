const tar = require('tar');
const path = require('path');
const spawn = require('child_process').spawn;

const MODULES_TAR_FILENAME = 'modules.tgz';

class NpmHelper {

    static extract(projectPath) {
        return tar.x({
            file: path.resolve(projectPath, MODULES_TAR_FILENAME),
            cwd: projectPath
        });
    }

    static build(path) {
        return new Promise((resolve, reject) => {
            try {
                const buildProcess = spawn('npm', [
                    'run',
                    'build',
                    '--prefix',
                    `${path}`
                ], { stdio: 'inherit' });

                buildProcess.on('exit', () => resolve(path));
            } catch(e) {
                reject(e);
            }
        });
    }
};

module.exports = NpmHelper;
