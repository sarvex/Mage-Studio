const FileHelper = require('../helpers/files/FileHelper');
const messages = require('../messages');
const SceneHelper = require('../helpers/SceneHelper');
const electron = require('../electron');

class SceneController {

    static getAllScenes(req, res) {
        return res.json({ message: 'ok' });
    }

    static getSceneData(req, res) {
        // getting name of the scene
        const name = req.params.id;

        if (!name) {
            // return malformed input
            return res
                .status(messages.SCENE_NAME_MISSING.code)
                .json({ message: messages.SCENE_NAME_MISSING.text });

        } else {
            if (electron.isDesktop()) {
                if (SceneHelper.exists(name)) {
                    const { content } = SceneHelper.readSceneData(name);

                    if (content) {
                        // if success, then return ok
                        return res
                            .status(messages.SCENE_JSON_READ.code)
                            .json(content);
                    } else {
                        // if failure then return error message
                        return res
                            .status(messages.SCENE_NOT_FOUND.code)
                            .json({ message: messages.SCENE_NOT_FOUND.text });
                    }
                } else {
                    // scene doesnt exist, return not created
                    return res
                        .status(messages.SCENE_NOT_FOUND.code)
                        .json({ message: messages.SCENE_NOT_FOUND.text });
                }
            } else {
                // we should call real backend here
            }
        }
    }

    static updateSceneData(req, res) {
        // getting name of the scen
        const name = req.params.id;
        const files = req.files;

        if (!files) {
            return res
                .status(messages.SCENE_DATA_MISSING.code)
                .json({ message: messages.SCENE_DATA_MISSING.text });
        }

        const data = files.data;
        const buffer = data.data;

        if (!name) {
            // return malformed input
            return res
                .status(messages.SCENE_NAME_MISSING.code)
                .json({ message: messages.SCENE_NAME_MISSING.text });

        } else {
            if (electron.isDesktop()) {
                if (SceneHelper.exists(name)) {

                    const file = FileHelper.fileFromBuffer(data.name, FileHelper.SCENE_TYPE(), buffer);

                    if (file.write()) {
                        return res
                            .status(messages.SCENE_JSON_CREATED.code)
                            .json({ message: messages.SCENE_JSON_CREATED.text });
                    }

                    return res
                        .status(messages.SCENE_JSON_NOT_CREATED.code)
                        .json({ message: messages.SCENE_JSON_NOT_CREATED.text });

                } else {
                    // scene doesnt exist, return not created
                    return res
                        .status(messages.SCENE_NOT_FOUND.code)
                        .json({ message: messages.SCENE_NOT_FOUND.text });
                }
            } else {
                // we should call real backend here
            }
        }

    }
}

module.exports = SceneController;
