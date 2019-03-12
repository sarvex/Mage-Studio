const ncp = require('ncp').ncp;
const path = require('path');
const npm = require('npm');
const Config = require('../config');

const PROJECT_TEMPLATE_PATH = 'server/.templates/.project';

class ProjectHelper {

    static create(destination) {
        return new Promise(function(resolve, reject) {
            const source = path.resolve(PROJECT_TEMPLATE_PATH);

            console.log('about to create prohect');

            ncp(source, destination, function(err) {
                if (err) {
                    console.log('cannot create project', err);
                    reject(err);
                } else {
                    console.log('done creating projet');
                    resolve();
                }
            });
        });
    }

    static installDependencies(project) {
        // get npm and install dependencies inside project
        return new Promise((resolve, reject) => {
            const path = Config.getProjectPath(project);

            console.log('about to install deps');

            npm.load({}, function (err) {
                npm
                    .commands
                    .install(path, [], function(er, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(err, data);
                        }
                });
            });
        });
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
