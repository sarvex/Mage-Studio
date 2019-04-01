const express = require('express');
const router = express.Router();

const ProjectController = require('../lib/controllers/ProjectController');
const ModelsController = require('../lib/controllers/ModelsController');
const ScriptsController = require('../lib/controllers/ScriptsController');

router.route('/')
    .get(ProjectController.getAllProjects)
    .post(ProjectController.createNewProject);

// Middleware
router.use('/:id', (req, res, next) => {
    // this is a middleware, we should get whatever using the id:
    // and set it in the request using req.project = projectWeFetched;
    next();
});

router.route('/:id')
    .get(ProjectController.getProject)
    .delete(ProjectController.deleteProject);

router.route('/:id/models')
    .post(ModelsController.uploadModel)
    .get(ModelsController.getAllModels);

router.route('/:id/models/:modelid')
    .get(ModelsController.getSingleModel)

router.route('/:id/scripts')
    .post(ScriptsController.createScript)
    .get(ScriptsController.getAllScripts);

router.route('/:id/scripts/:scriptid')
    .get(ScriptsController.getScript);

router.route('/:id/assets')
    .get(ProjectController.getAssets);

module.exports = {
    router: router,
    endpoint: '/api/projects'
};
