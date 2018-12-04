const express = require('express');
const sceneRouter = express.Router();

sceneRouter.route('/')
    .get((req, res) => {
        // here we get the list of scenes
        res.status(200).json({message: 'OK'});
    })
    .post((req, res) => {
        // here we create a new scene
        res.status(201).json({message: 'OK'})
    })

// Middleware
sceneRouter.use('/:id', (req, res, next)=>{
    // this is a middleware, we should get whatever using the id:
    // and set it in the request using req.scene = sceneWeFetched;
    next();
});


sceneRouter.route('/:id')
    .get(function (req, res) {
        // the scene we want is in req.scene
        res.json({message: 'OK'});
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

module.exports = sceneRouter;
