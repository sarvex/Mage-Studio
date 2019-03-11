const ncp = require('ncp').ncp;
const path = require('path');
const npm = require('npm');

const PROJECT_TEMPLATE_PATH = 'server/.templates/.project';

class ProjectHelper {

    static create(destination) {
        return new Promise(function(resolve, reject) {
            const source = path.resolve(PROJECT_TEMPLATE_PATH);

            ncp(source, destination, function(err) {
                if (err) {
                    console.log('cannot create project', err);
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }

    static installDependencies(project) {
        // get npm and install dependencies inside project
        console.log(npm.commands.install);
    }

    static configTemplate() {
        // return string template with configuration
    }

    static getConfig() {
        // this returns config file inside src.
    }

    static updateConfig(config) {
        // update existing configuration inside src
    }

    static exists(name) {
        // check if project esists inside workspace
    }
}

module.exports = ProjectHelper;
