const express = require('express');
const electron = require('../electron');
const router = express.Router();
const Config = require('../lib/Config');
const messages = require('../lib/messages');

router.route('/')
    .get((req, res) => {
        // return config for this user
        // this path is still missing authentication
        if (electron.isDesktop()) {
            // we're using electron, loading config from yml file
            const localconfig = Config.getLocalConfig();
            if (!localconfig) {
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
    })
    .post((req, res) => {
        // create new config for user
        res.status(201).json({message: 'OK'})
    })

module.exports = {
    router: router,
    endpoint: '/api/config'
};
