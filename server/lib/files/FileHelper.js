const File = require('./File');
const Model = require('./Model');

class FileHelper {

    static MODEL_TYPE() { return 'model' }
    static ASSET_TYPE() { return 'asset' }

    static fileFromBuffer(filename, type, buffer) {
        switch(type) {
            case FileHelper.MODEL_TYPE():
                const file = new Model(filename);
                console.log(file);
                if (file.writeBuffer(buffer)) {
                    return file;
                }
                return false;

                break;
            case FileHelper.ASSET_TYPE():
            default:
                break;
        }
    }

    static fileFromPath(path) {
        switch(type) {
            case MODEL_TYPE:
            case ASSET_TYPE:
            default:
                break;
        }
    }

}

module.exports = FileHelper;
