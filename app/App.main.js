window.onload = function() {
    include([
        "app/COSTANTS",
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
        "app/Manager.Model",
        "app/Manager.Light",
        "app/Manager.Model",
        "app/Manager.Assets",
        "app/Input.Keyboard",
        "app/Interface.SceneSelector",
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
            //file helper
            this.filehelper = new FileHelper();
            //interface
            this.interface = new Interface();
            //scene manager
            this.sm = new SceneManager();
            //mesh manager
            this.mm = new MeshManager();
            //light manager
            this.lm = new LightManager();
            // model manager
            this.modm = new ModelManager();
            // assets manager
            this.assets = new AssetsManager();
            //player
            this.player = new Player();
            //util
            this.util = new Global();
            //storage
            this.storage = new Storage();
            // dialogs
            this.dialog = new Dialog();
            //check if new project or not
            if (!this.storage.checkWorkspace()) {
                this._remote = require('electron').remote;
                this._dialog = this._remote.dialog;
                this.dialog.info(STRINGS.CHOOSE_WORKSPACE.title, STRINGS.CHOOSE_WORKSPACE.message, this.util.bind(function() {
                    this._dialog.showOpenDialog({properties: ['openDirectory']}, this.util.bind(function (value) {
                        this.storage.workspace = value[0];
                        this.storage.set("workspace", value[0]);
                        if (this.storage.isDefaultProject()) {
                            this.dialog.prompt(STRINGS.CHOOSE_PROJECT.title, STRINGS.CHOOSE_PROJECT.message, this.util.bind(function(value) {
                                swal.close();
                                if (!this.storage.createProject(value)) {
                                    this.dialog.error(STRINGS.NOT_EMPTY_FOLDER.title, STRINGS.NOT_EMPTY_FOLDER.message);
                                }
                            }, this));
                        }
                    }, this));
                }, this));
            } else if (this.storage.isDefaultProject()) {
                this.dialog.prompt(STRINGS.CHOOSE_PROJECT.title, STRINGS.CHOOSE_PROJECT.message, this.util.bind(function(value) {
                    swal.close();
                    if (!this.storage.createProject(value)) {
                        this.dialog.error(STRINGS.NOT_EMPTY_FOLDER, STRINGS.NOT_EMPTY_FOLDER.message);
                    }
                }, this));
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
            app.dialog.prompt(STRINGS.CHOOSE_PROJECT.title, STRINGS.CHOOSE_PROJECT.message, function(projectName) {
                app.storage.currentProject = projectName;
                app.storage.set("currentProject", app.storage.currentProject);
                swal.close();

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
            });
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
    Util.check.start(function(message) {
        console.log('%c' + message, 'color: green;');
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
