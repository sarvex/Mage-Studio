const FileHelper = require('../helpers/files/FileHelper');
const messages = require('../messages');
const electron = require('../electron');

class ModelsController {

    static getAllModels(req, res) {

    }

    static uploadModel(req, res) {
        const files = req.files;

        if (!files) {
            return res
                .status(messages.FILE_MISSING.code)
                .json({ message: messages.FILE_MISSING.text });
        } else {
            const data = files.data;
            const buffer = data.data;

            if (electron.isDesktop()) {
                const file = FileHelper.fileFromBuffer(data.name, FileHelper.MODEL_TYPE(), buffer);

                if (file.writeToFile()) {
                    return res
                        .status(messages.FILE_WRITE_SUCCESS.code)
                        .json({ data: file.toJSON() })
                } else {
                    return res
                        .status(messages.FILE_WRITE_FAILURE.code)
                        .json({ message: messages.FILE_WRITE_FAILURE.text });
                }
            } else {
                return res.json({ message: 'ok' });
            }
        }
    }
}

module.exports = ModelsController;
