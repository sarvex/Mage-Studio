#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const tar = require('tar');

const basePath = './server/.templates/.project/';
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
        file: path.resolve(basePath, 'modules.tgz')
    }, [nodeModulesPath])
};

const endProcess = (success) => () => {
    console.log(success ? 'Success!' : 'Error while zipping node modules');
    process.exit(+!success);
}

checkNodeModulesExist()
    .then(zipNodeModules)
    .then(endProcess(true))
    .catch(endProcess(false));
