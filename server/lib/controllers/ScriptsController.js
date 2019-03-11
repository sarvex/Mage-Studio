const FileHelper = require('../helpers/files/FileHelper');
const AssetsHelper = require('../helpers/AssetsHelper');
const Config = require('../config');
const messages = require('../messages');
const electron = require('../electron');

class ScriptsController {

    static getAllScripts(req, res) {
        // get scripts from assets
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
                .getScripts()
                .then(function(scripts) {
                    if (scripts.length) {
                        return res
                            .status(200)
                            .json(scripts);
                    } else {
                        return res
                            .status(messages.SCRIPTS_NOT_FOUND.code)
                            .json({ message: messages.SCRIPTS_NOT_FOUND.text });
                    }
                })
                .catch(function(err) {
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
                .getScript(scriptid)
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
        return res
            .status(200)
            .json({ message: 'ok' });
    }
}

module.exports = ScriptsController;
