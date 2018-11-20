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
            "ocean",
            "rain",
            'fountain'
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

    _addFountain: function(callback) {
        app.em.textureLoader.load(app.storage.getAssetsDir() + '/images/smokeparticle.png', app.util.bind(function(texture) {
            var options = {
                texture: texture,
                szie: 100,
                positionValue: new THREE.Vector3(0, 0, 0),
                velocityValue: new THREE.Vector3(0, 100, 0),
                accelerationValue: new THREE.Vector3(0, -15, 0),
                accelerationSpread: new THREE.Vector3(20, 0, 20),
                maxAge: 10
            };
            
            var rain = app.em.M.engine.fx.particlesEngine.get('Rain').instance(options);

            callback(rain.mesh, rain);
        }), this);
    },

    _addRain: function(callback) {
        app.em.textureLoader.load(app.storage.getAssetsDir() + '/images/rainparticle.png', app.util.bind(function(texture) {
            var options = {
                texture: texture,
                size: 100,
                positionValue: new THREE.Vector3(0, 400, 0),
                positionSpread: new THREE.Vector3(1000, 0, 1000),
                accelerationValue: new THREE.Vector3(0, -100, 0),
                accelerationSpread: new THREE.Vector3(0, 0, 0),
                velocityValue: new THREE.Vector3(0, -15, 0),
                velocitySpread: new THREE.Vector3(0, 1, 0),
                colors: [new THREE.Color('white')],
                maxAge: 6,
                particleCount: 10000
            };

            var rain = app.em.M.engine.fx.particlesEngine.get('Rain').instance(options);

            callback(rain.mesh, rain);
        }), this);
    }
});