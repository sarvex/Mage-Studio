#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const tar = require('tar');

const basePath = 'server/templates/project/';
const nodeModulesPath = path.resolve(basePath, 'node_modules');

const checkNodeModulesExist = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.access(nodeModulesPath, fs.F_OK, (err) => {
                if (err) {
                    console.error(err)
                    return reject(err);
                }
                resolve();
            })
        } catch(e) {
            return reject(e);
        }
    });
};

const zipNodeModules = () => {
    return tar.c({
        gzip: true,
        cwd: basePath,
        file: path.resolve(basePath, 'modules.tgz')
    }, ['node_modules'])
};

const endProcess = (success) => (e) => {
    console.log(success ? '[tar] Success!' : 'Error while zipping node modules');
    if (e) console.log(e);
    process.exit(+!success);
}

checkNodeModulesExist()
    .then(zipNodeModules)
    .then(endProcess(true))
    .catch(endProcess(false));
