const fs = require('fs');
const Scene = require('./Scene');
const File = require('./File');
const Asset = require('./Asset');
const Script = require('./Script');
const Model = require('./Model');

class FileHelper {

    static MODEL_TYPE() { return 'model' }
    static ASSET_TYPE() { return 'asset' }
    static IMAGE_TYPE() { return 'image' }
    static TEXTURE_TYPE() { return 'texture' }
    static SCRIPT_TYPE() { return 'script' }
    static SCENE_SCRIPT_TYPE() { return 'scene_script' }

    static SCENE_TYPE() { return 'scene' }

    static fileFromBuffer(filename, type, buffer) {
        let file = null;
        switch(type) {
            case FileHelper.MODEL_TYPE():
                file = new Model(filename);
                file.setContent(buffer);
                break;
            case FileHelper.TEXTURE_TYPE():
            case FileHelper.IMAGE_TYPE():
                file = new Asset(filename, type);
                file.setContent(buffer);
                break;
            case FileHelper.SCENE_TYPE():
                file = new Scene(filename);
                file.setContent(buffer);
                break;
            case FileHelper.SCRIPT_TYPE():
                file = new Script(filename);
                file.setContent(buffer);
            default:
                break;
        }

        return file;
    }

    static fileFromPath(name, type) {
        let file = null;
        switch(type) {
            case FileHelper.MODEL_TYPE():
                file = new Model(name);
                break;
            case FileHelper.SCRIPT_TYPE():
                file = new Script(name);
                break;
            case FileHelper.SCENE_SCRIPT_TYPE():
                file = new Script(name);
                file.setType('scene');
                break;
            case FileHelper.TEXTURE_TYPE():
            case FileHelper.IMAGE_TYPE():
                file = new Asset(name, type);
                break;
            case FileHelper.SCENE_TYPE():
                file = new Scene(name);
                break;
            default:
                break;
        }

        file.read();
        return file;
    }

    static fileHasExtension(filename = '') {
        return filename.split('.').length >= 2;
    }

    static pathExists(pathToCheck) {
        return new Promise((resolve, reject) => {
            fs.stat(pathToCheck, function(err) {
                if(err == null) {
                    resolve(true); // file exists
                } else if (err.code === 'ENOENT'){
                    resolve(false); // file does not exist
                } else {
                    reject(err);
                }
            });
        });
    }

    static createFolder(destination) {
        return new Promise((resolve, reject) => {
            FileHelper
                .pathExists(destination)
                .then(exists => {
                    if (!exists) {
                        fs.mkdirSync(destination, { recursive: true });
                    }
                    resolve();
                })
                .catch(reject);
        });
    }
}

module.exports = FileHelper;
