#!/usr/bin/env node
const npm = require('npm');
const templatePath = './server/templates/project/';
const options = {
    logLevel: 'silent',
    progress: false,
    dir: templatePath
};

const install = () => {
    return new Promise((resolve, reject) => {
        npm.load(options, function (err) {
            npm.commands
                .install(templatePath, [], function(er, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
        });
    })
};

const endProcess = (success) => () => {
    console.log(success ? '[install] Success!' : 'Error while installing node modules');
    process.exit(+!success);
};

install()
    .then(endProcess(true))
    .catch(endProcess(false));
