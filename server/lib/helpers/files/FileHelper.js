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

    static fileFromBuffer(filename, type, buffer) {
        let file = null;
        switch(type) {
            case FileHelper.MODEL_TYPE():
                file = new Model(filename);
                file.setContent(buffer);
                break;
            case FileHelper.ASSET_TYPE():
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
            case FileHelper.TEXTURE_TYPE():
            case FileHelper.IMAGE_TYPE():
                file = new Asset(name, type);
                break;
            default:
                break;
        }

        file.read();
        return file;
    }

}

module.exports = FileHelper;
