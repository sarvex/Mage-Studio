const ncp = require('ncp').ncp;
const path = require('path');

const SCENE_TEMPLATE_PATH = 'server/.templates/.scene';
const SRC_PATH = 'src';

const create = (destination, sceneName) => {
    return new Promise(function(resolve, reject) {
        const source = path.resolve(SCENE_TEMPLATE_PATH);
        const final_destination = path.join(destination, SRC_PATH);

        ncp(source, final_destination, function(err) {
            if (err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
};

const configTemplate = () => {
    // return string template for scene config
};

const getConfig = (name) => {
    // get index file inside scene folder
};

const updateConfig = () => {};

const exists = (projectName, sceneName) => {
    // check if a folder called sceneName exists inside projectName
};


module.exports = {
    create: create,
    exists: exists
};
