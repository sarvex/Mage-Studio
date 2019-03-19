const ncp = require('ncp').ncp;
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const Config = require('../config');
const FileHelper = require('./files/FileHelper');

class AssetsHelper {

    static getAssets(type) {
        return new Promise(resolve => {
            let assets = null;

            switch(type) {
                case FileHelper.MODEL_TYPE():
                    assets = AssetsHelper.getModels();
                    break;
                case FileHelper.IMAGE_TYPE():
                    assets = AssetsHelper.getImages();
                    break;
                case FileHelper.TEXTURE_TYPE():
                    assets = AssetsHelper.getTextures();
                    break;
                default:
                    return Promise.all([
                        AssetsHelper.getModels(),
                        AssetsHelper.getImages(),
                        AssetsHelper.getTextures(),
                        AssetsHelper.getScripts(),
                        AssetsHelper.getAudio(),
                        AssetsHelper.getVideo()
                    ]).then((values) => {
                        resolve({
                            models: values[0],
                            images: values[1],
                            textures: values[2],
                            scripts: values[3],
                            audio: values[4],
                            video: values[5]
                        });
                    });
            }

            resolve(assets);
        });
    }

    static getModels() {
        const pattern = '*.*';
        const modelsPath = path.join(Config.getAssetsPath(), 'models', pattern);

        return new Promise(function(resolve, reject) {
            glob(modelsPath, {}, function(err, files) {
                if (err) {
                    reject(err);
                } else {
                    const mapped = files
                        .map(function(file) {
                            const filename = path.basename(file);
                            return FileHelper.fileFromPath(filename, FileHelper.MODEL_TYPE()).toJSON(true);
                        });

                    resolve(mapped);
                }
            });
        });
    }

    static getModel(name) {
        const file = FileHelper.fileFromPath(name, FileHelper.MODEL_TYPE());

        const content = file.toJSON();

        if (content) {
            return Promise.resolve(content);
        }

        return Promise.reject();
    }

    static getScripts() {
        const pattern = '*.js';
        const scriptsPath = path.join(Config.getScriptsPath(), pattern);

        return new Promise(function(resolve, reject) {
            glob(scriptsPath, {}, function(err, files) {
                if (err) {
                    reject(err);
                } else {
                    const mapped = files
                        .map(function(file) {
                            const filename = path.basename(file);
                            return FileHelper
                                .fileFromPath(filename, FileHelper.SCRIPT_TYPE())
                                .toJSON(true);
                        });

                    resolve(mapped);
                }
            });
        });
    }

    static getScript(name) {
        const file = FileHelper.fileFromPath(name, FileHelper.SCRIPT_TYPE());
        const content = file.toJSON();

        if (content) {
            return Promise.resolve(content);
        }

        return Promise.reject();
    }

    static getImages() {
        return Promise.resolve([]);
    }

    static getTextures() {
        return Promise.resolve([]);
    }

    static getAudio() {
        return Promise.resolve([]);
    }

    static getVideo() {
        return Promise.resolve([]);
    }

    static exists() {

    }
}

module.exports = AssetsHelper;
