const FileHelper = require('../helpers/files/FileHelper');
const AssetsHelper = require('../helpers/AssetsHelper');
const Config = require('../config');
const messages = require('../messages');
const electron = require('../electron');

class ModelsController {

    static getAllModels(req, res) {
        // get models from assets
        if (electron.isDesktop()) {
            AssetsHelper
                .getModels()
                .then(function(models) {
                    if (models.length) {
                        return res
                            .status(200)
                            .json({ data: models });
                    } else {
                        return res
                            .status(404)
                            .json({ message: 'Models not found' });
                    }
                })
                .catch(function(err) {
                    return res
                        .status(404)
                        .json({ message: 'Models not found' });
                });

         } else {
            return res
                .status(200)
                .json({ message: 'OK' });
        }
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
                        .json({ data: file.toJSON(true) })
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
