const ncp = require('ncp').ncp;
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const Config = require('../config');
const FileHelper = require('./files/FileHelper');

function getAssets(type) {
    return new Promise(resolve => {
        switch(type) {
            case FileHelper.MODEL_TYPE():
                return getModels().then(resolve);
            case FileHelper.IMAGE_TYPE():
                return getImages().then(resolve);
            case FileHelper.TEXTURE_TYPE():
                return getTextures().then(resolve);
            default:
                return Promise.all([
                    getModels(),
                    getImages(),
                    getTextures(),
                    getScripts(),
                    getAudio(),
                    getVideo()
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

        resolve(null);
    });
}

function getModels() {
    const pattern = '*.*';
    const modelsPath = path.join(Config.getModelsPath(), pattern);

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

function getModel(name) {
    const file = FileHelper.fileFromPath(name, FileHelper.MODEL_TYPE());

    const content = file.toJSON();

    if (content) {
        return Promise.resolve(content);
    }

    return Promise.reject();
}

function getScripts() {
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

function getScript(name) {
    const file = FileHelper.fileFromPath(name, FileHelper.SCRIPT_TYPE());
    const content = file.toJSON();

    if (content) {
        return Promise.resolve(content);
    }

    return Promise.reject();
}

function getImage(name) {
    try {
        const file = FileHelper.fileFromPath(name, FileHelper.TEXTURE_TYPE());

        return Promise.resolve(file.fullPath);

    } catch(e) {
        return Promise.reject();
    }
}

function getImages() {
    return Promise.resolve([]);
}

function getTextures() {
    const pattern = '*.*';
    const modelsPath = path.join(Config.getTexturesPath(), pattern);

    return new Promise(function(resolve, reject) {
        glob(modelsPath, {}, function(err, files) {
            if (err) {
                reject(err);
            } else {
                const mapped = files
                    .map(function(file) {
                        const filename = path.basename(file);
                        return FileHelper.fileFromPath(filename, FileHelper.TEXTURE_TYPE()).toJSON();
                    });

                resolve(mapped);
            }
        });
    });
}

function getAudio() {
    return Promise.resolve([]);
}

function getVideo() {
    return Promise.resolve([]);
}

function exists() {

}

module.exports = {
    getAssets: getAssets,
    getModels: getModels,
    getModel: getModel,
    getScripts: getScripts,
    getScript: getScript,
    getImages: getImages,
    getImage: getImage,
    getTextures: getTextures,
    getAudio: getAudio,
    getVideo: getVideo,
    exists: exists
};
