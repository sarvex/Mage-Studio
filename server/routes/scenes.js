const express = require('express');
const fs = require('fs');
const path = require('path');
const electron = require('../electron');
const router = express.Router();

const messages = require('../lib/messages');
const SceneHelper = require('../lib/SceneHelper');
const FileHelper = require('../lib/files/FileHelper');

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
    .post(function(req, res) {
        // getting name of the scen
        const name = req.params.id;

        if (!name) {
            // return malformed input
            return res
                .status(messages.SCENE_NAME_MISSING.code)
                .json({ message: messages.SCENE_NAME_MISSING.text });

        } else {
            if (electron.isDesktop()) {
                if (scene.exists(name)) {
                    // check id scene data is available
                    const data = req.body.scene;

                    if (!data) {
                        // no data available
                        return res
                            .status(messages.SCENE_DATA_MISSING.code)
                            .json({ message: messages.SCENE_DATA_MISSING.text });

                    } else {
                        // try to copy data to scene json inside workspace/project/src/scene
                        const status = scene.updateSceneData(name, data);

                        if (status) {
                            // if success, then return ok
                            return res
                                .status(messages.SCENE_JSON_CREATED.code)
                                .json({ message: messages.SCENE_JSON_CREATED.text });
                        } else {
                            // if failure then return error message
                            return res
                                .status(messages.SCENE_JSON_NOT_CREATED.code)
                                .json({ message: messages.SCENE_JSON_NOT_CREATED.text });
                        }
                    }
                } else {
                    // scene doesnt exist, return not created
                    return res
                        .status(messages.SCENE_NOT_FOUND.code)
                        .json({ message: messages.SCENE_NOT_FOUND.text });
                }
            } else {
                // we should call real backend here
            }
        }

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


router.route('/:id/models')
    .post(function(req, res) {
        const files = req.files;
        const data = files.data;
        const buffer = data.data;

        if (electron.isDesktop()) {
            const file = FileHelper.fileFromBuffer(data.name, FileHelper.MODEL_TYPE(), buffer);

            if (file.writeToFile()) {
                res
                    .status(messages.FILE_WRITE_SUCCESS.code)
                    .json({ data: JSON.stringify(file.toJSON()) })
            } else {
                res
                    .status(messages.FILE_WRITE_FAILURE.code)
                    .json({ message: messages.FILE_WRITE_FAILURE.text });
            }
        } else {
            res.json({ message: 'ok' });
        }

    });

module.exports = {
    router: router,
    endpoint: '/api/scenes'
};
