const ncp = require('ncp').ncp;
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const Config = require('../config');
const FileHelper = require('./files/FileHelper');

class AssetsHelper {

    static getAssets(type) {
        switch(type) {
            case FileHelper.MODEL_TYPE():
                return AssetsHelper.getModels();
                break;
            case FileHelper.IMAGE_TYPE():
                return AssetsHelper.getImages();
                break;
            case FileHelper.TEXTURE_TYPE():
                return AssetsHelper.getTextures();
                break;
            default:
                // we should return everything
                break;
        }
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
                            return FileHelper.fileFromPath(filename, FileHelper.SCRIPT_TYPE()).toJSON(true);
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

    }

    static getTextures() {

    }

    static exists() {

    }
}

module.exports = AssetsHelper;
