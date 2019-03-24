const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');
const npm = require('npm');
const Config = require('../config');
const StringTemplates = require('./StringTemplates');

const PROJECT_TEMPLATE_PATH = 'server/.templates/.project';

class ProjectHelper {

    static create(destination) {
        return new Promise(function(resolve, reject) {
            const source = path.resolve(PROJECT_TEMPLATE_PATH);

            ncp(source, destination, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static installDependencies(project) {
        // get npm and install dependencies inside project
        return new Promise((resolve, reject) => {
            const path = Config.getProjectPath(project);

            npm.load({ logLevel: 'silent', progress: false }, function (err) {
                npm
                    .commands
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

    static updateIndexFile() {
        StringTemplates
            .buildInitScript()
            .then(data => {
                // write script in index file inside src
                const filename = 'index.js';

                const indexPath = path.join(
                    Config.getSrcRoot(),
                    filename
                );

                try {
                    fs.writeFileSync(indexPath, data);
                    return Promise.resolve();
                } catch(e) {
                    return Promise.reject(e);
                }
            });
    }

    static exists(name) {
        // check if project esists inside workspace
    }
}

module.exports = ProjectHelper;
