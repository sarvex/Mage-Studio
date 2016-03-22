window.onload = function() {
    include([
        "app/lib/jsColorPicker.min",
        "app/App.Global",
        "app/App.Restorer",
        "app/App.Storage",
        "app/App.Player",
        "app/App.Exporter",
        "app/App.FileHelper",
        "app/App.Exporter.WageHelper",
        "app/App.ScriptEditor",
        "app/App.ScriptEditor.Sidebar",
        "app/App.ScriptEditor.Helper",
        "app/App.ScriptEditor.Layout",
        "app/App.ScriptEditor.Tab",
        "app/Interface",
        "app/Manager.Scene",
        "app/Manager.Mesh",
        "app/Manager.Light",
        "app/Manager.Model",
        "app/Input.Keyboard",
        "app/Interface.Dialog",
        "app/Interface.Footer",
        "app/Interface.Sidebar",
        "app/Interface.Sidebar.MeshListener",
        "app/Interface.Sidebar.LightListener",
        "app/Interface.Sidebar.Loader",
        "app/Interface.Sidebar.Helper",
        "app/Interface.Sidebar.Right",
        "app/Interface.Sidebar.Left"
    ], start);
}

function start() {

    Class("Editor", {
        Editor: function() {
            //interface
            this.interface = new Interface();
            //scene manager
            this.sm = new SceneManager();
            //mesh manager
            this.mm = new MeshManager();
            //light manager
            this.lm = new LightManager();
            //player
            this.player = new Player();
            //util
            this.util = new Global();
            //storage
            this.storage = new Storage();
            //file helper
            this.filehelper = new FileHelper();
            // dialogs
            this.dialog = new Dialog();
            //check if new project or not
            if (!this.storage.workspace) {
                this._remote = require("remote");
                this._dialog = this._remote.require("dialog");
                this.dialog.info("Workspace", "Please choose a valid workspace", function() {
                    app._dialog.showOpenDialog({properties: ['openDirectory']},function (value) {
                        app.storage.workspace = value[0];
                        app.storage.set("workspace", value[0]);
                        if (app.storage.currentProject == "BaseProject") {
                            app.dialog.prompt("Project", "Please choose a name for your project", function(value) {
                                app.storage.currentProject = value;
                                app.storage.set("currentProject", app.storage.currentProject);
                                swal.close();
                            });
                        }
                    });
                });
            } else if (this.storage.currentProject == "BaseProject") {
                app.dialog.prompt("Project", "Please choose a name for your project", function(value) {
                    app.storage.currentProject = value;
                    app.storage.set("currentProject", app.storage.currentProject);
                    swal.close();
                });
            }
        },

        init: function() {
            this.interface.init();
            this.sm.init();
            this.interface.afterSceneCreation();
            //script editor
            this.scriptEditor = new ScriptEditor("#scriptcontainer");
            //restorer
            this.restorer = new Restorer(this.storage.load());
            //exporter
            this.exporter = new Exporter();
        },

        setListeners: function() {
            this.interface.setListeners();
            this.sm.setListeners();
            this.lm.setListeners();
            this.storage.setListeners();
        },

        new: function() {
            // TODO find replacement for prompt
            var projectName = "TEST";//prompt("Choose project's name.");
            app.storage.currentProject = projectName;
            app.storage.set("currentProject", projectName);
            //stopping animation
            cancelAnimationFrame(app.sm.animId);
            app.sm.renderer.domElement.addEventListener('dblclick', null, false);//remove listener to render
            app.sm.scene = null;
            app.sm.projector = null;
            app.sm.camera = null;
            app.sm.controls = null;
            app.sm.transformControl = null;
            var empty = function(element) {
                while (element.lastChild) element.removeChild(element.lastChild);
            }
            empty(app.sm.container);
            //wiping all stored data
            app.storage.clear();
            //trying to recreate scene
            app.sm.init();
            //dispatching new project signal
            app.interface.events.newProject.dispatch();
        },

        //showing script editor
        openEditor: function() {
            //setting flag to true
            app.interface.disableEvents = true;
            //triggering event
            app.interface.events.scriptEditorOpened.dispatch();
        },

        closeEditor: function() {
            app.interface.disableEvents = false;
            //triggering closing event
            app.interface.events.scriptEditorClosed.dispatch();
        }
    });

    // App object
    window.app = {};
    Util.start();
    Util.check.start(function() {
        //on check success
        app = new Editor();
        app.init();
        app.setListeners();
        //trying to restore old data
        app.restorer.restore();
    }, function() {
        //on check failure
    });
}
