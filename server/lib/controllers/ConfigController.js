const Config = require('../config');
const messages = require('../messages');
const electron = require('../electron');

class ConfigController {

    static getConfig(req, res) {
        // return config for this user
        // this path is still missing authentication
        if (electron.isDesktop()) {
            // we're using electron, loading config from yml file
            const localconfig = Config.getLocalConfig();

            if (!localconfig || !Object.keys(localconfig).length) {
                res
                    .status(messages.CONFIG_MISSING.code)
                    .json({ message: messages.CONFIG_MISSING.text });
            } else {
                res
                    .status(messages.CONFIG_AVAILABLE.code)
                    .json(localconfig);
            }
        } else {
            // web path, config should be fetched from db
            res.json({message: 'OK', isDesktop: electron.isDesktop()});
        }
    }
}

module.exports = ConfigController;
