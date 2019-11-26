const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');
const Config = require('../config');
const FileHelper = require('./files/FileHelper');
const Downloader = require('../Downloader');
const Zipper = require('../Zipper');

const SCENES_PATH = 'src';
const DEFAULT_SCENE_NAME = 'BaseScene';
const DEFAULT_SCENE_FILENAME = 'scene.json';
const DEFAULT_SCENE_CLASSNAME = 'FirstScene';
const DEFAULT_SCENE_CLASS_FILENAME = 'App.js';

const SCENE_TEMPLATE_FILE = 'scene.template.tgz';

class SceneHelper {

    static create(destination, sceneName) {
        return new Promise(function(resolve, reject) {
            const sceneUrl = Config.getSceneTemplateUrl();
            const scenePath = path.join(destination, SCENES_PATH, sceneName);
            const destinationFile = path.join(scenePath, SCENE_TEMPLATE_FILE);

            FileHelper
                .createFolder(scenePath)
                .then(() => Downloader.downloadFileToPath(sceneUrl, destinationFile))
                .then(() => Zipper.unzip(scenePath, destinationFile))
                .then(() => Promise.all([
                    //SceneHelper.rename(scenePath, DEFAULT_SCENE_NAME, sceneName),
                    SceneHelper.renameSceneClassname(scenePath, sceneName)
                ]))
                .then(resolve)
                .catch(reject)
        });
    }

    static rename(location, oldName, newName) {
        try {
            const oldPath = path.join(location, oldName);
            const newPath = path.join(location, newName);
            fs.renameSync(oldPath, newPath);

            return Promise.resolve();
        } catch(e) {
            return Promise.reject(e);
        }
    }

    static renameSceneClassname(location, scene) {
        return new Promise((resolve, reject) => {
            const scenePath = path.join(location, scene, DEFAULT_SCENE_CLASS_FILENAME);

            fs.readFile(scenePath, 'utf8', function (err,data) {
                if (err) reject();

                const result = data.replace(DEFAULT_SCENE_CLASSNAME, scene);

                fs.writeFile(scenePath, result, 'utf8', function (err) {
                    if (err) reject();
                });
            });

            resolve(true);
        });
    }

    static readSceneData(sceneName) {
        const filename = SceneHelper.exists(sceneName);

        if (filename) {
            try {
                const file = FileHelper.fileFromPath(filename, FileHelper.SCENE_TYPE());
                return file.toJSON();
            } catch(e) {
                return {};
            }
        } else {
            return {};
        }
    }

    static getAllScenes() {
        const root = Config.getSrcRoot();

        const isDirectory = source => fs.lstatSync(source).isDirectory();
        const extractRoot = source => source.replace(`${root}/`, '');

        return fs.readdirSync(root)
                .map(name => path.join(root, name))
                .filter(isDirectory)
                .map(extractRoot)
    }

    static getConfig(sceneName) {
        // get index file inside scene folder
    }

    static updateConfig(sceneName, config) {
        // update config inside sceneName
    }

    static exists(sceneName) {
        // check if a folder called sceneName exists inside projectName
        const filename = FileHelper.fileHasExtension(sceneName) ? sceneName : `${sceneName}.json`;
        const scenePath = path.join(Config.getScenePath(), filename);

        return sceneName !== undefined  && fs.existsSync(scenePath) && filename;
    }
}

module.exports = SceneHelper;
