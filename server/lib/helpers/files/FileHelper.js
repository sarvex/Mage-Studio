const File = require('./File');
const Script = require('./Script');
const Model = require('./Model');

class FileHelper {

    static MODEL_TYPE() { return 'model' }
    static ASSET_TYPE() { return 'asset' }
    static IMAGE_TYPE() { return 'image' }
    static TEXTURE_TYPE() { return 'texture' }
    static SCRIPT_TYPE() { return 'texture' }

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
                file.read();
                break;
            case FileHelper.SCRIPT_TYPE():
                file = new Script(name);
                file.read();
                break;
            default:
                break;
        }

        return file;
    }

}

module.exports = FileHelper;
