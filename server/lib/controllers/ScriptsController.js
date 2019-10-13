const FileHelper = require('../helpers/files/FileHelper');
const AssetsHelper = require('../helpers/AssetsHelper');
const Config = require('../config');
const messages = require('../messages');
const electron = require('../electron');

class ScriptsController {

    static getAllScripts(req, res) {
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
                AssetsHelper.getScripts(),
                AssetsHelper.getSceneScript() // this should get all scripts of all scenes
            ]).then(function([_scripts, _sceneScript]) {
                    const scripts = (_scripts.length && _scripts) || [];
                    const sceneScript = (_sceneScript.length && _sceneScript) || [];

                    return res
                        .status(200)
                        .json(scripts.concat(sceneScript));

                })
                .catch(function(err) {
                    console.log(err);
                    return res
                        .status(messages.SCRIPTS_NOT_FOUND.code)
                        .json({ message: messages.SCRIPTS_NOT_FOUND.text });
                });
        } else {
            return res
                .status(200)
                .json({ message: 'OK' });
        }
    }

    static getScript(req, res) {
        const id = req.params.id;
        const currentconfig = Config.getLocalConfig();
        const scriptid = req.params.scriptid;
        const type = req.query.type;

        if (!id) {
            return res
                .status(messages.PROJECT_NAME_MISSING.code)
                .json({ message: messages.PROJECT_NAME_MISSING.text });
        }

        if (!scriptid) {
            return res
                .status(messages.SCRIPT_NAME_MISSING.code)
                .json({ message: messages.SCRIPT_NAME_MISSING.text });
        }

        if (id !== currentconfig.project) {
            return res
                .status(messages.WRONG_PROJECT_NAME.code)
                .json({ message: messages.WRONG_PROJECT_NAME.text });
        }

        if (electron.isDesktop()) {
            AssetsHelper
                .getScript(scriptid, type)
                .then(function(json) {
                    return res
                        .status(200)
                        .json(json);
                })
                .catch(function() {
                    return res
                        .status(messages.SCRIPT_NOT_FOUND.code)
                        .json({ message: messages.SCRIPT_NOT_FOUND.text });
                })


         } else {
            return res
                .status(200)
                .json({ message: 'OK' });
        }
    }

    static createScript(req, res) {
        const { filename } = req.body;
        const id = req.params.id;

        if (!id) {
            return res
                .status(messages.PROJECT_NAME_MISSING.code)
                .json({ message: messages.PROJECT_NAME_MISSING.text });
        }

        if (!filename) {
            return res
                .status(messages.SCRIPT_NAME_MISSING.code)
                .json({ message: messages.SCRIPT_NAME_MISSING.text });
        }

        const buffer = new Buffer('');
        const script = FileHelper.fileFromBuffer(filename, FileHelper.SCRIPT_TYPE(), buffer);

        if (script.write()) {
            return ScriptsController.getAllScripts(req, res);
        } else {
            return res
                .status(messages.FILE_WRITE_FAILURE.code)
                .json({ message: messages.FILE_WRITE_FAILURE.text });
        }
    }

    static updateScript(req, res) {
        const { content } = req.body;
        const id = req.params.id;
        const scriptid = req.params.scriptid;

        if (!id) {
            return res
                .status(messages.PROJECT_NAME_MISSING.code)
                .json({ message: messages.PROJECT_NAME_MISSING.text });
        }

        if (!scriptid) {
            return res
                .status(messages.SCRIPT_NAME_MISSING.code)
                .json({ message: messages.SCRIPT_NAME_MISSING.text });
        }

        if(!content || typeof content !== 'string') {
            return res
                .status(messages.SCRIPT_CONTENT_MISSING.code)
                .json({ message: messages.SCRIPT_CONTENT_MISSING.text });
        }

        const buffer = new Buffer(content);
        const script = FileHelper.fileFromBuffer(scriptid, FileHelper.SCRIPT_TYPE(), buffer);

        if (script.write()) {
            return ScriptsController.getAllScripts(req, res);
        } else {
            return res
                .status(messages.FILE_WRITE_FAILURE.code)
                .json({ message: messages.FILE_WRITE_FAILURE.text });
        }
    }
}

module.exports = ScriptsController;
