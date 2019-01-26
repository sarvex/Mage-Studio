const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');
const config = require('./config');

const SCENE_TEMPLATE_PATH = 'server/.templates/.scene';
const SRC_PATH = 'src';
const DEFAULT_SCENE_NAME = 'BaseScene';

const create = (destination, sceneName) => {
    return new Promise(function(resolve, reject) {
        const source = path.resolve(SCENE_TEMPLATE_PATH);
        const final_destination = path.join(destination, SRC_PATH);

        ncp(source, final_destination, function(err) {
            if (err) {
                throw err;
            } else {
                // renaming baseScene
                renameScene(final_destination, DEFAULT_SCENE_NAME, sceneName);
                return resolve();
            }
        });
    });
};

const renameScene = (location, oldName, newName) => {
    const oldPath = path.join(location, oldName);
    const newPath = path.join(location, newName);

    fs.renameSync(oldPath, newPath);
};

const configTemplate = () => {
    // return string template for scene config
};

const getConfig = (sceneName) => {
    // get index file inside scene folder
};

const updateConfig = (sceneName, config) => {
    // update config inside sceneName
};

const updateSceneData = (sceneName, data) => {
    // copy scene.json inside the folder
    const configuration = config.getLocalConfig();
    const filename = 'scene.json';

    const sceneJsonPath = path.join(
        configuration.workspace,
        configuration.project,
        SRC_PATH,
        sceneName,
        filename
    );

    try {
        fs.writeFileSync(sceneJsonPath, data);
        return true;
    } catch(e) {
        return false;
    }
};

const exists = (sceneName) => {
    // check if a folder called sceneName exists inside projectName
    const configuration = config.getLocalConfig();
    const folderPath = path.join(
        configuration.workspace,
        configuration.project,
        SRC_PATH,
        sceneName
    );

    return fs.existsSync(folderPath);
};


module.exports = {
    create: create,
    exists: exists,
    updateSceneData: updateSceneData
};
