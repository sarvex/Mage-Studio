const express = require('express');
const electron = require('../electron');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        // here we get the list of scenes
        res.json({message: 'OK', isDesktop: electron.isDesktop()});
    })
    .post((req, res) => {
        // here we create a new scene
        res.status(201).json({message: 'OK'})
    })

// Middleware
router.use('/:id', (req, res, next)=>{
    // this is a middleware, we should get whatever using the id:
    // and set it in the request using req.scene = sceneWeFetched;
    next();
});


router.route('/:id')
    .get(function (req, res) {
        // the scene we want is in req.scene
        res.json({message: 'NO', name: "stagni", isDesktop: ""+electron.isDesktop()});
    })
    .put(function(req,res) {
        // updating the scene inside req.scene
        res.json({message: 'OK'});
    })
    .patch(function(req,res) {
        // patching the scene inside req.scene
        res.json({message: 'OK'});
    })
    .delete(function(req,res) {
        // removing the scene inside req.scene
        res.status(204).json({message: 'OK'});
    });

module.exports = {
    router: router,
    endpoint: '/api/scenes'
};
