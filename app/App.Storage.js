Class("Storage", {
    Storage: function() {
        this.keys = {
            "lights": "lm",
            "meshes": "mm",
            'models': "modm"
        };
        this.lastTime = new Date();
        this.autoSave = false;
        this.autoSaveId = undefined;
        this.autoSaveTimer = 10000; //saving every 10 seconds
        this.workspace = (localStorage.getItem("workspace")) ? localStorage.getItem("workspace") : null;
        this.currentProject = (localStorage.getItem("currentProject")) ? localStorage.getItem("currentProject") : STORAGE.base.project; //reference to current project
        this.currentScene = (localStorage.getItem("currentScene")) ? localStorage.getItem("currentScene") : STORAGE.base.scene;
        this.exporter = new THREE.SceneExporter();
        this.filehelper = new FileHelper();
    },

    //Setting listeners if we want auto save or not
    setListeners: function() {
        app.interface.events.autosaveChange.add(this.onAutosaveChange);
    },

    getBaseDir: function() {
        if (this.workspace && this.currentProject && this.currentScene) {
            return this.workspace + '/' + this.currentProject;
        }
        return false;
    },

    getSceneDir: function() {
        var dir = this.getBaseDir();
        if (dir) {
            return dir + '/scenes/' + this.currentScene;
        }
        return false;
    },

    getAssetsDir: function() {
        var sceneDir = app.storage.getSceneDir();
        return sceneDir ? sceneDir + '/assets' : false;
    },

    getScriptsDir: function() {
        var sceneDir = app.storage.getSceneDir();
        return sceneDir ? sceneDir + '/app/scripts' : false;
    },

    getStorageKey(value) {
        return {
            key: app.storage.currentProject + "_" + app.storage.currentScene + "_" + value,
            value: value,
        }
    },

    //listenning for autosave toggle
    onAutosaveChange: function(flag) {
        app.storage.autoSave = flag;
        if (flag) {
            //setting setInterval
            if (app.storage.autoSaveId) clearInterval(app.storage.autoSaveId);
            app.storage.autoSaveId = setInterval(app.storage.save, app.storage.autoSaveTimer);
        } else {
            //just clearing our timer
            if (app.storage.autoSaveId) clearInterval(app.storage.autoSaveId);
        }
    },

    load: function(projectName) {
        //getting elements
        var toReturn = {};
        for (k in app.storage.keys) {
            //getting json version of our map
            toReturn[app.storage.currentProject+"_"+app.storage.currentScene+"_"+k] = JSON.parse(app.storage.get(app.storage.currentProject+"_"+app.storage.currentScene+"_"+k));
        }
        //returning toReturn
        return toReturn;
    },

    //save elements
    save: function() {
        var dir = app.storage.workspace + "/" + app.storage.currentProject,
            promise = new $.Deferred();

        if (!app.filehelper.checkDirectory(dir)) {
            app.dialog.error(STRINGS.NO_DIRECTORY.title, STRINGS.NO_DIRECTORY.message);
            return false;
        }

        if (app.storage.isDefaultScene()) {
            app.dialog.warn(STRINGS.MISSING_SCENE_NAME.title, STRINGS.MISSING_SCENE_NAME.message, function() {
                app.dialog.prompt(STRINGS.CHOOSE_SCENE.title, STRINGS.CHOOSE_SCENE.message, function(name) {
                    var basedir = dir + "/scenes/";
                    var pre = basedir + "" + app.storage.currentScene;
                    var post = basedir + "" + name;
                    app.filehelper.rename(pre, post, function() {
                        app.storage.currentScene = name;
                        app.storage.set("currentScene", name);
                        app.storage.save();
                    })
                });
            }, false, false);
        } else {
            //sending save started event
            app.interface.events.saveStarted.dispatch();

            app.storage.createSceneJSON();
            app.storage.createGameJSON();
            app.storage.createAssetsJSON();

            //saving lastTime we did a save
            app.storage.lastTime = new Date();
            app.interface.events.saveEvent.dispatch();
        }
    },

    //basic method to store elements
    set: function(key, value) {
        //using localstorage
        // what happens when we don't have localstorage? -> electron HAS localstorage, you idiot
        localStorage.setItem(key, value);
    },

    //getting elements from localstorage
    get: function(key) {
        return localStorage.getItem(key);
    },

    getScriptContent: function(scriptName, callback) {
        var path = this.getSceneDir() + '/app/scripts/' + scriptName;
        this.filehelper.read(path, callback);
    },

    //clearing all data for this project
    clear: function() {
        for (k in app.storage.keys) {
            //getting json version of our map
            app.storage.set(app.storage.currentProject+"_"+app.storage.currentScene+"_"+k, null);
        }
    },

    //wiping all data stored
    clearAll: function() {
        localStorage.clear();
    },

    // checking workspace existence in path and storage
    checkWorkspace: function() {
        if (!this.workspace) return false;

        return this.filehelper.checkDirectory(this.workspace);
    },

    isDefaultProject: function() {
        return this.currentProject === STORAGE.base.project;
    },

    isDefaultScene: function() {
        return this.currentScene === STORAGE.base.scene;
    },

    // create project folder, and copy scaffold in it
    createProject: function(name) {
        var dir = app.storage.workspace + "/" + name;
        if (app.filehelper.checkDirectory(dir)) {
            // project must not exist
            return false;
        }

        app.storage.currentProject = name;
        app.storage.set("currentProject", app.storage.currentProject);

        if (!app.storage.workspace) {
            app.dialog.error("Missing Workspace", "Please set your workspace under settings panel");
            return false;
        }
        if (app.storage.currentProject == "BaseProject") {
            app.dialog.error("Missing Project", "Please, create a new Project using File>New option");
            return false;
        }
        var fs = require('fs'),
            mage = require('mage-engine');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        mage.builder.create(dir, function(success) {
            if (success) {
                app.dialog.success("Done", "Your project is good to go");
            } else {
                app.dialog.error("Error!", "Error while creating project");
            }
        });
        return true;
    },

    createAssetsJSON: function() {
        // now storing assets
        var assets = {};
        var assets_string = 'var Assets = {';
        for (var i in app.assets.allowedAssets) {
            var key = app.assets.allowedAssets[i];
            var value = JSON.stringify(app.assets[key]);
            assets_string += __upperCaseFirstLetter__(key) + ':' + value + ",";
            app.storage.set(app.storage.currentProject+"_"+app.storage.currentScene+"_asset_"+k, value);
        }
        assets_string =assets_string.slice(0, assets_string.length - 1);
        assets_string += '}';
        var dir = app.storage.workspace + "/" + app.storage.currentProject + "/scenes/" + app.storage.currentScene +'/app';
        app.filehelper.write(dir + "/assets.js", assets_string, function(error) {
            if (error) console.log(error);
        });
    },

    createSceneJSON: function() {
        //storing elements
        var sceneJson = {};
        for (k in app.storage.keys) {
            //getting json version of our map
            //var value = JSON.stringify(app[app.storage.keys[k]].map);
            var value = '[';
            var type = app.storage.keys[k];
            var manager = app[type].map;
            for (var i in manager.keys) {
                var key = manager.keys[i];
                if (k == 'lights') {
                    value += '{'
                    var object = manager.map[key];
                    value += object.holder ? '"holder":' + JSON.stringify(object.holder.toJSON()) + ',' : '"holder":false,';
                    value += object.target ? '"target":' + JSON.stringify(object.target.toJSON()) + ',' : '"target":false,';
                    value += '"light":' + JSON.stringify(object.light.toJSON());
                    value += '},';
                } else if ((k == 'meshes') || (k == 'models')) {
                    var json = JSON.stringify(manager.map[key].toJSON());
                    value += json +",";
                }
            }
            value = value.length > 1 ? value.slice(0, value.length - 1) + "]" : "[]";
            sceneJson[k] = value;
            app.storage.set(app.storage.currentProject+"_"+app.storage.currentScene+"_"+k, value);
        }
        console.log(sceneJson);
        // saving to file
        var dir = app.storage.workspace + "/" + app.storage.currentProject + "/scenes/" + app.storage.currentScene;
        var json = JSON.stringify(sceneJson);//JSON.stringify(app.storage.exporter.parse(app.sm.scene));
        app.filehelper.write(dir + "/scene.json", json, function(error) {
            if (error) console.log(error);
        });
    },

    createGameJSON: function(scene) {
        var scenes = app.filehelper.listScenes();
        var firstScene = scene ? scene : scenes[0];

        var gameJSON = JSON.parse(JSON.stringify(JSONS.game));
        gameJSON['firstScene'] = firstScene;
        gameJSON['scenes'] = [];
        for (var i in scenes) {
            var s = scenes[i];
            gameJSON['scenes'].push({
                'name': s
            });
        }
        console.log(gameJSON);
        var dir = app.storage.workspace + "/" + app.storage.currentProject;
        app.filehelper.write(dir + "/game.json", JSON.stringify(gameJSON))
    },

    createScriptJSON: function() {

    }
})
