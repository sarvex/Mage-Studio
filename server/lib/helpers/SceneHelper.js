const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');
const Config = require('../config');

const SCENE_TEMPLATE_PATH = 'server/.templates/.scene';
const SRC_PATH = 'src';
const DEFAULT_SCENE_NAME = 'BaseScene';

class SceneHelper {

    static create(destination, sceneName) {
        return new Promise(function(resolve, reject) {
            const source = path.resolve(SCENE_TEMPLATE_PATH);
            const final_destination = path.join(destination, SRC_PATH);

            ncp(source, final_destination, function(err) {
                if (err) {
                    throw err;
                } else {
                    SceneHelper.rename(final_destination, DEFAULT_SCENE_NAME, sceneName);
                    return resolve();
                }
            });
        });
    }

    static rename(location, oldName, newName) {
        const oldPath = path.join(location, oldName);
        const newPath = path.join(location, newName);

        fs.renameSync(oldPath, newPath);
    }

    static updateSceneData(sceneName, data) {
        // copy scene.json inside the folder
        const configuration = Config.getLocalConfig();
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
    }

    static configTemplate() {
        // return string template for scene config
    }

    static getConfig(sceneName) {
        // get index file inside scene folder
    }

    static updateConfig(sceneName, config) {
        // update config inside sceneName
    }

    static exists(sceneName) {
        // check if a folder called sceneName exists inside projectName
        const configuration = Config.getLocalConfig();
        const folderPath = path.join(
            configuration.workspace,
            configuration.project,
            SRC_PATH,
            sceneName
        );

        return fs.existsSync(folderPath);
    }
}

module.exports = SceneHelper;
