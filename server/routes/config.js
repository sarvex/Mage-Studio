const express = require('express');
const router = express.Router();

const ConfigController = require('../lib/controllers/ConfigController');

router.route('/')
    .get(ConfigController.getConfig)

module.exports = {
    router: router,
    endpoint: '/api/config'
};
