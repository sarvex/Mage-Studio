const express = require('express');
const electron = require('../electron');
const router = express.Router();
const yaml = require('js-yaml');
const fs = require('fs');

router.route('/')
    .get((req, res) => {
        // return config for this user
        // this path is still missing authentication
        console.log('inside server side config');
        if (electron.isDesktop()) {
            // we're using electron, loading config from yml file
            const content = yaml.safeLoad(fs.readFileSync('.config.yml', 'utf8'));
            res.json(content);
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
