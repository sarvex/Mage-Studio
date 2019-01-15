const ncp = require('ncp').ncp;
const path = require('path');

const PROJECT_TEMPLATE_PATH = 'server/.templates/.project';

const create = (destination) => {
    return new Promise(function(resolve, reject) {
        const source = path.resolve(PROJECT_TEMPLATE_PATH);

        ncp(source, destination, function(err) {
            if (err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
};

const configTemplate = () => {
    // return string template with configuration
}

const getConfig = () => {
    // this returns config file inside src.
}

const updateConfig = (config) => {
    // update existing configuration inside src
}

const exists = (name) => {
    // check if project esists inside workspace
}


module.exports = {
    create: create,
    exists: exists
};
