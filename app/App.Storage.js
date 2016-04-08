Class("Storage", {
    Storage: function() {
        this.keys = {
            "lights": "lm",
            "meshes": "mm"
        };
        this.lastTime = new Date();
        this.autoSave = false;
        this.autoSaveId = undefined;
        this.autoSaveTimer = 10000; //saving every 10 seconds
        this.workspace = (localStorage.getItem("workspace")) ? localStorage.getItem("workspace") : null;
        this.currentProject = (localStorage.getItem("currentProject")) ? localStorage.getItem("currentProject") : "BaseProject"; //reference to current project
        this.currentScene = (localStorage.getItem("currentScene")) ? localStorage.getItem("currentScene") : "BaseScene";
    },

    //Setting listeners if we want auto save or not
    setListeners: function() {
        app.interface.events.autosaveChange.add(this.onAutosaveChange);
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
        if (app.storage.currentScene == "BaseScene") {
            app.dialog.warn("Save Scene", "You should choose a name for your scene", function() {
                app.dialog.prompt("Choose name", "Please choose a name for your scene", function(name) {
                    var basedir = app.storage.workspace + "/" + app.storage.currentProject + "/scenes/";
                    var pre = basedir + "" + app.storage.currentScene;
                    var post = basedir + "" + name;
                    app.filehelper.rename(pre, post, function() {
                        app.storage.currentScene = name;
                        app.storage.set("currentScene", name);
                        app.storage.save();
                    })
                });
            });
        } else {
            //sending save started event
            app.interface.events.saveStarted.dispatch();
            //storing elements
            for (k in app.storage.keys) {
                //getting json version of our map
                var value = JSON.stringify(app[app.storage.keys[k]].map);
                app.storage.set(app.storage.currentProject+"_"+app.storage.currentScene+"_"+k, value);
            }
            //saving lastTime we did a save
            app.storage.lastTime = new Date();
            //triggering saveEvent event
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

    // create project folder, and copy scaffold in it
    createProject: function() {
        if (!app.storage.workspace) {
            app.dialog.error("Missing Workspace", "Please set your workspace under settings panel");
            return;
        }
        if (app.storage.currentProject == "BaseProject") {
            app.dialog.error("Missing Project", "Please, create a new Project using File>New option");
            return;
        }
        var ncp = require("ncp").ncp;
        var fs = require("fs");
        var dir = app.storage.workspace + "/" + app.storage.currentProject;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        ncp("scaffold", dir, function(err) {
            console.log(err);
            if (err) app.dialog.error("Error!", "Error while creating project");
            else app.dialog.success("Done", "Your project is good to go");
        });
    }
})
