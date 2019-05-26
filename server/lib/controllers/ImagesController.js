const ProjectHelper = require("../helpers/ProjectHelper");
const FileHelper = require('../helpers/files/FileHelper');
const AssetsHelper = require('../helpers/AssetsHelper');
const Config = require('../config');
const messages = require('../messages');
const electron = require('../electron');

class ModelsController {

    static getAllImages(req, res) {
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
            Promise.all([
                AssetsHelper.getTextures(),
                AssetsHelper.getImages()
            ])
            .then(function(data) {
                if (data.length) {
                    return res
                        .status(200)
                        .json(data);
                } else {
                    return res
                        .status(messages.IMAGES_NOT_FOUND.code)
                        .json({ message: messages.IMAGES_NOT_FOUND.text });
                }
            })
            .catch(function(err) {
                return res
                    .status(messages.IMAGES_NOT_FOUND.code)
                    .json({ message: messages.IMAGES_NOT_FOUND.text });
            });
         } else {
            return res
                .status(200)
                .json({ message: 'OK' });
        }
    }

    static getSingleImage(req, res) {
        const id = req.params.id;
        const currentconfig = Config.getLocalConfig();
        const imageid = req.params.imageid;

        if (!id) {
            return res
                .status(messages.PROJECT_NAME_MISSING.code)
                .json({ message: messages.PROJECT_NAME_MISSING.text });
        }

        if (!imageid) {
            return res
                .status(messages.IMAGE_NAME_MISSING.code)
                .json({ message: messages.IMAGE_NAME_MISSING.text });
        }

        if (id !== currentconfig.project) {
            return res
                .status(messages.WRONG_PROJECT_NAME.code)
                .json({ message: messages.WRONG_PROJECT_NAME.text });
        }

        if (electron.isDesktop()) {
            AssetsHelper
                .getImage(imageid)
                .then(function(path) {
                    return res.sendFile(path);
                })
                .catch(function() {
                    return res
                        .status(messages.IMAGE_NOT_FOUND.code)
                        .json({ message: messages.IMAGE_NOT_FOUND.text });
                })


        } else {
            return res
                .status(200)
                .json({ message: 'OK' });
        }
    }

    static uploadImage(req, res) {
        const files = req.files;

        if (!files) {
            return res
                .status(messages.FILE_MISSING.code)
                .json({ message: messages.FILE_MISSING.text });
        } else {
            const data = files.data;
            const buffer = data.data;

            if (electron.isDesktop()) {
                const file = FileHelper.fileFromBuffer(data.name, FileHelper.TEXTURE_TYPE(), buffer);

                Promise.all([
                    Promise.resolve(file.write()),
                    ProjectHelper.updateIndexFile()
                ])
                .then(() => {
                    return res
                        .status(messages.FILE_WRITE_SUCCESS.code)
                        .json({ message: 'ok' });
                })
                .catch(() => {
                    return res
                        .status(messages.FILE_WRITE_FAILURE.code)
                        .json({ message: messages.FILE_WRITE_FAILURE.text });
                });
            } else {
                return res.json({ message: 'ok' });
            }
        }
    }
}

module.exports = ModelsController;
