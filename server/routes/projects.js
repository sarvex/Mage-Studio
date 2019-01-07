const express = require('express');
const path = require('path');
const electron = require('../electron');
const router = express.Router();
const config = require('../lib/config');
const project = require('../lib/project');
const messages = require('../lib/messages');

router.route('/')
    .get((req, res) => {
        // here we get the list of projects
        // return all projects listed inside workspace
        res.json({message: 'OK', isDesktop: electron.isDesktop()});
    })
    .post((req, res) => {
        // we need project Name
        const name = req.body.name;

        if (!name || typeof name !== 'string') {
            res
                .status(messages.PROJECT_NAME_MISSING.code)
                .json({ message: messages.PROJECT_NAME_MISSING.text });
        } else {
            if (electron.isDesktop()) {
                // copy template folder to project folder
                const localconfig = config.getLocalConfig();
                if (!localconfig) {
                    res
                        .status(messages.CONFIG_MISSING.code)
                        .json({ message: messages.CONFIG_MISSING.text });
                } else {
                    const destination = path.join(localconfig.workspace, name);
                    project
                        .create(destination)
                        .then(function() {
                            res
                                .status(messages.PROJECT_CREATED.code)
                                .json({ message: messages.PROJECT_CREATED.text });
                        })
                        .catch(function(err) {
                            res
                                .status(messages.PROJECT_NOT_CREATED.code)
                                .json({ message: messages.PROJECT_NOT_CREATED.text });
                        })
                }
            }
            // use api to create projects ( sync desktop with be )
            // when is done update config
            config.updateLocalConfig({ project: name });
        }
    });

// Middleware
router.use('/:id', (req, res, next) => {
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
