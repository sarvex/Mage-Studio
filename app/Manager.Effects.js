Class("EffectsManager", {
    EffectsManager: function() {
        this.M = require('mage-engine'); 
        // light map
        this.map = new HashMap();
        this.loader = new THREE.ImageLoader();
        this.textureLoader = new THREE.TextureLoader();
        // effects list
        this.effects = [];
        // allowed effects
        this.allowedEffects = [
            "skybox",
            "water",
            "ocean"
        ];
        //effects count
        this.effectCount = 0;
    },

    setListeners: function() {
        //do nothing, right now
    },

    store: function(uuid, element) {
        this.map.put(uuid, element);
    },

    update: function() {
        //updating effects
        var keys_list = this.map.keys.concat();   //create a clone of the original
        if (keys_list.length != 0) {
            var start = +new Date();
            do {
                var o = this.map.get(keys_list.shift());
                o.render && o.render();
                o.update && o.update();
            } while (keys_list.length > 0 && (+new Date() - start < 50));
        }
    },

    addEffect: function(type) {
        if (this.allowedEffects.indexOf(type) > -1) {
            this["_add"+__upperCaseFirstLetter__(type)](app.util.bind(function(effect, parent) {
                app.mm.store(effect.uuid, effect);
                app.em.store(effect.uuid, parent || effect);
                app.sm.scene.add(app.mm.map.get(effect.uuid));

                app.sm.update();

                //changing effect name
                effect.name = "effect_"+app.em.effectCount;
                effect.group = "World";
                effect.flag = "effect";

                app.em.effectCount++;

                //attach new effect to transform control
                app.sm.transformControl.attach(effect);
                //creating a callback for our effect
                app.interface.meshEvents.bind(app.mm.map.get(effect.uuid), "click", function(event) {
                    //now only adding this mesh to the transform control
                    if (app.sm.lastClicked.uuid == event.target.uuid) return;
                    app.sm.deselect();
                    //Setting uuid to the scene
                    app.sm.uuid = event.target.uuid;
                    app.sm.typeClicked = "mesh";
                    app.sm.select(event.target, "translate");
                });

                app.interface.events.meshAdded.dispatch();
            }), this);
        }
    },

    _addSkybox: function (callback) {
        app.em.loader.load(app.storage.getAssetsDir() + '/images/skybox_1.png', app.util.bind(function(image) {
            var skybox = app.em.M.engine.fx.shadersEngine.get('Skybox').instance({texture: image});

            callback(skybox);
        }), this); 
    },

    _addWater: function (callback) {
        app.em.textureLoader.load(app.storage.getAssetsDir() + '/images/waternormals.jpg', app.util.bind(function(texture) {
            var water = app.em.M.engine.fx.shadersEngine.get('Water').instance(app.sm.renderer, app.sm.camera, app.sm.scene, {height:512, width: 512, texture: texture});

            callback(water);
        }), this);
    },

    _addOcean: function(callback) {
        var ocean = app.em.M.engine.fx.shadersEngine.get('Ocean').instance(app.sm.renderer, app.sm.camera, app.sm.scene);
        callback(ocean.oceanMesh, ocean);
    },

    _addRain: function(callback) {
        
    } 
});