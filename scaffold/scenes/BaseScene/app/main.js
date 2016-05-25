/********************************************************************************
	MAIN SCRIPT
	copyright© 2014 Marco Stagni. http://marcostagni.com
********************************************************************************/

include("app/scripts/cube/mybox")

Class("MyGame", {

	MyGame: function() {
		App.call(this);
		this.loader = new THREE.ObjectLoader();
	},

	onCreate: function() {

		// ricezione del messaggio dal router
		function eventListener(event) {
			console.log("inside scene");
			console.log(event);
			//event.source.postMessage("Hi, router!", event.origin);
		}
		window.addEventListener("message", eventListener, false);
		parent.postMessage("Hi router from child", "http://localhost:8080")

		//restoring meshes
		var meshes = JSON.parse(app._scene.meshes);
		var lights = JSON.parse(app._scene.lights);
        for (var i=0; i<meshes.length; i++) {
            var _mesh = this.loader.parse(meshes[i]);
            //every mesh must have castshadow and receive shadow enabled
            _mesh.castShadow = true;
            _mesh.receiveShadow = true;
			var mesh = new Mesh(_mesh.geometry, _mesh.material);
			mesh.mesh.position.set(_mesh.position.x, _mesh.position.y, _mesh.position.z);
			mesh.mesh.rotation.set(_mesh.rotation.x, _mesh.rotation.y, _mesh.rotation.z);
			mesh.mesh.scale.set(_mesh.scale.x, _mesh.scale.y, _mesh.scale.z);
        }
        //restoring lights
        for (var j=0; j<lights.length; j++) {
            var l = lights.map[j];
            //recreating light, holder, target, helper
            var o = {
                holder: (l.holder) ? app.loader.parse(l.holder) : false,
                //helper: (l.helper) ? app.loader.parse(l.helper) : false,
                target: (l.target) ? app.loader.parse(l.target) : false,
                light: (l.light) ? app.loader.parse(l.light) : false
            };
			var l = {};
            //setting helpers ecc
            if (o.light.object.type == "DirectionalLight") {
				console.warn("Directional Lights  still not supported");
                var size = 50;
                o.light.castShadow = true;
                o.light.shadowCameraVisible = true;
                o.light.shadowMapWidth = 512;
                o.light.shadowMapHeight = 512;
                var d = 200;
                o.light.shadowCameraLeft = -d;
                o.light.shadowCameraRight = d;
                o.light.shadowCameraTop = d;
                o.light.shadowCameraBottom = -d;
                o.light.shadowCameraFar = 1000;
                o.light.shadowDarkness = 0.2;
            } else if (l.light.object.type == "AmbientLight") {
                l = new AmbientLight(l.light.color, l.light.intensity, l.light.position);
            } else if (l.light.object.type == "PointLight") {
                //var sphereSize = 50;
                //o.helper = new THREE.PointLightHelper(o.light, sphereSize);
                //every light must cast shadow
				var d = 200;
				var position = l.holder ? l.holder.position : l.light.position;
				l = new PointLight(l.light.color, l.light.intensity, d, position);
                l.light.castShadow = true;
                l.light.shadowCameraLeft = -d;
                l.light.shadowCameraRight = d;
                l.light.shadowCameraTop = d;
                l.light.shadowCameraBottom = -d;
                l.light.shadowCameraFar = 1000;
                l.light.shadowDarkness = 0.2;
            }
        }
        //restoring models
        //restoring sounds

		/*
		include("app/SceneLoader", function() {
			app.sceneLoader = new THREE.SceneLoader();

		});
		*/
		//var geometry = new THREE.CubeGeometry(20, 20, 20);
		//var material = new THREE.MeshBasicMaterial({
		//	color: 0xff0000,
		//	wireframe : true
		//});

		//var cube = new Mesh(geometry, material, {script : "mybox", dir : "cube"});

		//console.log("Inside onCreate method");

		//document.addEventListener( 'mousemove', app.onDocumentMouseMove, false );
		//document.addEventListener( 'touchstart', app.onDocumentTouchStart, false );
		//document.addEventListener( 'touchmove', app.onDocumentTouchMove, false );
		//document.addEventListener( 'mousewheel', app.onDocumentMouseWheel, false);

		//example for camera movement
		//app.camera.addScript("cameraScript", "camera");
	},

	preload: function(next) {
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", function() {
			//console.log(this.responseText);
			var scene = JSON.parse(this.responseText);
			app.loadScene(scene, next);
		});
		oReq.open("GET", "scene.json");
		oReq.send();
	},

	loadScene: function(scene, next) {
		app._scene = scene;
		next();
	},

	prepareScene: function() {

	}

})._extends("App");
