#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const tar = require('tar');

const basePath = '/Users/marcostagni/Documents/dev/personal/Mage-workspace/newprojectmarco4';

const extract = () => {
    return tar.x({
        cwd: basePath,
        file: path.resolve(basePath, 'modules.tgz')
    })
};

const endProcess = (success) => (e) => {
    console.log(success ? '[extract] Success!' : 'Error while extracting node modules');
    if (e) console.log(e);
    process.exit(+!success);
}

extract()
    .then(endProcess(true))
    .catch(endProcess(false));
