const FileHelper = require('../helpers/files/FileHelper');
const AssetsHelper = require('../helpers/AssetsHelper');
const Config = require('../config');
const messages = require('../messages');
const electron = require('../electron');

class ModelsController {

    static getAllModels(req, res) {
        // get models from assets
        const id = req.params.id;
        const currentconfig = Config.getLocalConfig();

        if (!id) {
            return res
                .status(messages.PROJECT_NAME_MISSING.code)
                .json({ message: messages.PROJECT_NAME_MISSING.text });
        }

        if (id !== currentconfig.project) {
            return res
                .status(messages.WRONG_PROJECT_NAME.code)
                .json({ message: messages.WRONG_PROJECT_NAME.text });
        }

        if (electron.isDesktop()) {
            AssetsHelper
                .getModels()
                .then(function(models) {
                    if (models.length) {
                        return res
                            .status(200)
                            .json(models);
                    } else {
                        return res
                            .status(messages.MODELS_NOT_FOUND.code)
                            .json({ message: messages.MODELS_NOT_FOUND.text });
                    }
                })
                .catch(function(err) {
                    return res
                        .status(messages.MODELS_NOT_FOUND.code)
                        .json({ message: messages.MODELS_NOT_FOUND.text });
                });

         } else {
            return res
                .status(200)
                .json({ message: 'OK' });
        }
    }

    static getSingleModel(req, res) {
        const id = req.params.id;
        const currentconfig = Config.getLocalConfig();
        const modelid = req.params.modelid;

        if (!id) {
            return res
                .status(messages.PROJECT_NAME_MISSING.code)
                .json({ message: messages.PROJECT_NAME_MISSING.text });
        }

        if (!modelid) {
            return res
                .status(messages.MODEL_NAME_MISSING.code)
                .json({ message: messages.MODEL_NAME_MISSING.text });
        }

        if (id !== currentconfig.project) {
            return res
                .status(messages.WRONG_PROJECT_NAME.code)
                .json({ message: messages.WRONG_PROJECT_NAME.text });
        }

        if (electron.isDesktop()) {
            AssetsHelper
                .getModel(modelid)
                .then(function(json) {
                    return res
                        .status(200)
                        .json(json);
                })
                .catch(function() {
                    return res
                        .status(messages.MODEL_NOT_FOUND.code)
                        .json({ message: messages.MODEL_NOT_FOUND.text });
                })


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
                        .json(file.toJSON(true))
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
