const express = require('express');
const router = express.Router();

const SceneController = require('../lib/controllers/SceneController');

router.route('/')
    .get(SceneController.getAllScenes)

// Middleware
router.use('/:id', (req, res, next)=>{
    // this is a middleware, we should get whatever using the id:
    // and set it in the request using req.scene = sceneWeFetched;
    next();
});

router.route('/:id')
    .post(SceneController.updateSceneData)

module.exports = {
    router: router,
    endpoint: '/api/scenes'
};
