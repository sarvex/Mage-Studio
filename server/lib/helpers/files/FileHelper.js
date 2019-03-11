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
        switch(type) {
            case FileHelper.MODEL_TYPE():
                const file = new Model(filename);
                file.setContent(buffer);
                return file;
                break;
            case FileHelper.ASSET_TYPE():
            default:
                break;
        }
    }

    static fileFromPath(name, type) {
        switch(type) {
            case FileHelper.MODEL_TYPE():
                const model = new Model(name);
                model.read();

                return model;
                break;
            case FileHelper.SCRIPT_TYPE():
                const script = new Script(name);
                script.read();

                return script;
                break;
            default:
                break;
        }
    }

}

module.exports = FileHelper;
