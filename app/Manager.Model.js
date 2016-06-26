Class("ModelManager", {
    ModelManager: function() {
        //creating hashmap for storing meshes
        //creating list of allowed meshes
        //remember last clicked mesh
        this.map = new HashMap();
        this.models = [];
        this.allowedModels = [
            "json"
        ];
        this.modelsCount = 0;
    },

    store: function(uuid, element) {
        this.map.put(uuid, element);
    },

    update: function() {
        // update method
    },

    addModel: function(type) {
        /*
            if type is allowed, proceed to call the proper creation method
            then store it inside our map, adding a callback method
            to the stored mesh -> listening to user click;
        */
        if (this.allowedModels.indexOf(type) != -1) {
            //we're creating a valid mesh
            this["_add"+__upperCaseFirstLetter__(type)]();
        }
    },

    completeAddModel: function(model) {
        console.log(model);
        //every model must have castshadow and receive shadow enabled
        model.castShadow = true;
        model.receiveShadow = true;
        //changing model name
        model.name = "Model_"+this.modelsCount;
        model.group = "World";
        model.flag = "model";
        //store new model in our map
        app.modm.store(model.uuid, model);
        //add new model to the scene and to modeles list
        app.sm.scene.add(app.modm.map.get(model.uuid));
        app.modm.models.push(app.modm.map.get(model.uuid));
        //forcing scene to update itself
        app.sm.update();
        //attach new model to transform control
        //app.sm.transformControl.attach(model);
        //creating a callback for our model
        app.interface.meshEvents.bind(app.modm.map.get(model.uuid), "click", function(event) {
            //now only adding this model to the transform control
            if (app.sm.lastClicked.uuid == event.target.uuid) return;
            app.sm.deselect();
            //Setting uuid to the scene
            app.sm.uuid = event.target.uuid;
            app.sm.typeClicked = "model";
            app.sm.select(event.target, "translate");
        });
        //increasing modelcount
        this.modelsCount++;
        //calling addedmodel event
        app.interface.events.modelAdded.dispatch();
    },

    //Creation methods

    _addJson: function() {
        this._remote = require('electron').remote;
        this._dialog = this._remote.dialog;
        this._dialog.showOpenDialog({properties: ['openFile']}, app.util.bind(function (value) {
            var path = value[0],
                loader = new THREE.JSONLoader();

            console.log(path);

            loader.load(path, app.util.bind(function(geometry, materials) {
                var material = materials[ 0 ];
                material.morphTargets = true;
                material.color.setHex(0xffaaaa);
                material.wireframe = true;

                console.log(geometry, materials);

                var faceMaterial = new THREE.MultiMaterial(materials);

                var mesh = new THREE.Mesh(geometry, faceMaterial);

                this.completeAddModel(mesh);
            }, this));
        }, this));
    },

});
