Class("Player", {
    Player: function() {
        //scene parameters
        this.camera = undefined;
        this.renderer = undefined;
        this.scene = undefined;
        this.controls = undefined;
        this.container = document.getElementById( 'scenecontainer' );
        this.iframe = document.createElement("iframe");
        this.iframe.height = this.container.clientHeight;
        this.iframe.width = this.container.clientWidth;
        this.iframe.className = "scenePlayer";
        //storing animation id
        this.animId = undefined;
        //object loader
        this.loader = new THREE.ObjectLoader();

        this.connect = require("connect");
        this.serveStatic = require("serve-static");
        this.http = require("http");
        this._app = undefined;
        this._server = undefined;
    },

    play: function() {
        var dir = app.storage.workspace + "/" + app.storage.currentProject;
        this._app = this.connect().use(this.serveStatic(dir));
        this._server = this.http.createServer(this._app);
        this._server.listen(8080, function(){
            console.log('Server running on 8080...');
            console.log(arguments);
            app.player.iframe.src = "http://localhost:8080";
            app.player.container.appendChild(app.player.iframe);
        });
    },

    pause: function() {
        if (this._server) this._server.close();
        app.player.container.removeChild(app.player.iframe);
    }
/*
    play: function() {
        var data = app.storage.load();
        //check if there's something to restore or not
        this.nothingToRestore = true;
        for (var k in app.storage.keys) {
            if (data[app.storage.currentProject+"_"+app.storage.currentScene+"_"+k]) {
                this.nothingToRestore = false;
            }
        }
        if (this.nothingToRestore) return;
        this.lights = data[app.storage.currentProject+"_lights"];
        this.meshes = data[app.storage.currentProject+"_meshes"];
        //flags
        this.meshesFlag = (this.meshes.keys.length > 0);
        this.lightsFlag = (this.lights.keys.length > 0); // true/false whether we recovered something or not

        //pause the main scene
        cancelAnimationFrame(app.sm.animId);
        //hiding
        app.interface.disableEvents = true;
        app.sm.renderer.domElement.style.display = "none";
        //create the new scene with every thing in the main scene
        this.camera = new THREE.PerspectiveCamera( 70, $(this.container).width() / $(this.container).height(), 1, 5000 );
        this.camera.position.copy(app.sm.camera.position);//.set( 1000, 500, 1000 );
        this.camera.rotation.copy(app.sm.camera.rotation);
        //this.camera.lookAt( new THREE.Vector3( 0, 200, 0 ) );

        // creating scene
        this.scene = new THREE.Scene();

        //now adding elements to the scene
        if (!this.nothingToRestore) {
            //meshes
            for (var i=0; i<this.meshes.total; i++) {
                var k = this.meshes.keys[i];
                //recreating mesh
                var mesh = this.loader.parse(this.meshes.map[k]);
                //every mesh must have castshadow and receive shadow enabled
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                this.scene.add(mesh);
            }
            //lights
            for (var j=0; j<this.lights.total; j++) {
                var k = this.lights.keys[j];
                var l = this.lights.map[k];
                var light = this.loader.parse(l.light);
                if (l.light.object.type == "DirectionalLight") {
                    //i have to add helper
                    var size = 50;
                    light.castShadow = true;
                    //light.shadowCameraVisible = true;

                    light.shadowMapWidth = 512;
                    light.shadowMapHeight = 512;

                    var d = 200;
                    light.shadowCameraLeft = -d;
                    light.shadowCameraRight = d;
                    light.shadowCameraTop = d;
                    light.shadowCameraBottom = -d;
                    // #TODO be able to change shadow camera far
                    light.shadowCameraFar = 1000;
                    light.shadowDarkness = 0.2;
                } else if (l.light.object.type == "PointLight") {
                    var sphereSize = 50;
                    //every light must cast shadow
                    light.castShadow = true;
                    var d = 200;
                    light.shadowCameraLeft = -d;
                    light.shadowCameraRight = d;
                    light.shadowCameraTop = d;
                    light.shadowCameraBottom = -d;
                    // #TODO be able to change shadow camera far
                    light.shadowCameraFar = 1000;
                    light.shadowDarkness = 0.2;
                }
                this.scene.add(light);
            }
        }

        // creating renderer
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        //this.renderer.setClearColor( this.scene.fog.color );
        this.renderer.sortObjects = false;
        this.renderer.setClearColor(new THREE.Color('#000000'));
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize($(this.container).width(), $(this.container).height());
        //enabling shadows
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;
        this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
        //appending player container to container
        this.renderer.domElement.id = "playerScene";
        this.container.appendChild( this.renderer.domElement );

        window.addEventListener("resize", app.player.onWindowResize);

        //calling render
        this.render();
    },

    pause: function() {
        //removing playerScene
        $('#playerScene').remove();
        //destroy the scene
        cancelAnimationFrame(app.player.animId);
        app.player.renderer.domElement.addEventListener('dblclick', null, false);
        app.player.scene = null;
        app.player.camera = null;
        //removing this window resize event
        window.removeEventListener("resize", app.player.onWindowResize);
        //resume the main scene
        app.sm.animId = requestAnimationFrame(app.sm.update);
        //showing
        app.sm.renderer.domElement.style.display = "block";
        app.interface.disableEvents = false;
    },

    render: function() {
        app.player.renderer.render(app.player.scene, app.player.camera);
        //requesting new animation frame
        app.player.animId = requestAnimationFrame(app.player.render);
    },

    //window resize event
    onWindowResize: function() {
        app.player.camera.aspect = $(app.player.container).width() / $(app.player.container).height();
        app.player.camera.updateProjectionMatrix();

        app.player.renderer.setSize( $(app.player.container).width(), $(app.player.container).height() );

        app.player.render();
    }
*/

});
