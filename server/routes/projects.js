const express = require('express');
const electron = require('../electron');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        // here we get the list of projects
        res.json({message: 'OK', isDesktop: electron.isDesktop()});
    })
    .post((req, res) => {
        // here we create a new project

        // we need project Name
        // copy project to right path
        // update config file with the current project name

        res.status(201).json({message: 'OK'})
    })

// Middleware
router.use('/:id', (req, res, next)=>{
    // this is a middleware, we should get whatever using the id:
    // and set it in the request using req.project = projectWeFetched;
    next();
});


router.route('/:id')
    .get(function (req, res) {
        // the project we want is in req.project

        // if electron get project config from withing the project itself
        // return config as json

        res.json({message: 'OK', name: "stagni", isDesktop: ""+electron.isDesktop()});
    })
    .put(function(req,res) {
        // updating the project inside req.project
        res.json({message: 'OK'});
    })
    .patch(function(req,res) {
        // patching the project inside req.project
        res.json({message: 'OK'});
    })
    .delete(function(req,res) {
        // removing the project inside req.project
        res.status(204).json({message: 'OK'});
    });

module.exports = {
    router: router,
    endpoint: '/api/projects'
};
