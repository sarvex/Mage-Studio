Class("MeshListener", {
    MeshListener: function() {

    },

    setListeners: function() {
        //setting position change event listener
        app.interface.events.positionChange.add(this.onPositionChange);
        //setting rotation change event listener
        app.interface.events.rotationChange.add(this.onRotationChange);

        //setting material listeners
        app.interface.events.meshColorChange.add(this.onMeshColorChange);
        app.interface.events.meshVisibleChange.add(this.onMeshVisibleChange);
        app.interface.events.meshWireframeChange.add(this.onMeshWireframeChange);
        app.interface.events.meshFogChange.add(this.onMeshFogChange);

        //setting listener for material change
        //we must reload right sidebar
        app.interface.events.meshMaterialChange.add(app.interface.rightSidebar.onSelectedMesh);

        //#TODO we need also shadow option
        app.interface.events.meshReceiveShadowChange.add(this.onMeshReceiveShadowChange);
        app.interface.events.meshCastShadowChange.add(this.onMeshCastShadowChange);
    },

    //position change listener
    onPositionChange: function() {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        var position = app.sm.typeClicked == 'mesh' ?
            app.mm.map.get(app.sm.uuid).position :
            app.modm.map.get(app.sm.uuid).position;
        //writing new position
        $('#position_x').val(position.x);
        $('#position_y').val(position.y);
        $('#position_z').val(position.z);
    },

    //rotation change listener
    onRotationChange: function() {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        var rotation = app.sm.typeClicked == 'mesh' ?
            app.mm.map.get(app.sm.uuid).rotation :
            app.modm.map.get(app.sm.uuid).rotation;
        //writing new rotation
        $('#rotation_x').val(rotation.x);
        $('#rotation_y').val(rotation.y);
        $('#rotation_z').val(rotation.z);
    },

    //mesh color change event
    onMeshColorChange: function(_color) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        //changing color with new color
        var color = new THREE.Color(_color);
        if (app.sm.typeClicked == 'mesh') {
            app.mm.map.get(app.sm.uuid).material.color = color;
        } else {
            app.modm.map.get(app.sm.uuid).material.color = color;
        }
    },

    //mesh visible change
    onMeshVisibleChange: function(flag) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        //changing mesh visibility
        if (app.sm.typeClicked == 'mesh') {
            app.mm.map.get(app.sm.uuid).visible = flag;
        } else {
            app.modm.map.get(app.sm.uuid).visible = flag;
        }
    },

    //mesh wireframe change event
    onMeshWireframeChange: function(flag) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        //changing wireframe with new value
        if (app.sm.typeClicked == 'mesh') {
            app.mm.map.get(app.sm.uuid).material.wireframe = flag;
        } else {
            app.modm.map.get(app.sm.uuid).material.wireframe = flag;
        }
    },

    //mesh fog change
    onMeshFogChange: function(flag) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        //changing mesh fog
        if (app.sm.typeClicked == 'mesh') {
            app.mm.map.get(app.sm.uuid).fog = flag;
        } else {
            app.modm.map.get(app.sm.uuid).fog = flag;
        }
    },

    //mesh update rotation, position and name
    updateMeshRotPosName: function() {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        //changing mesh fog
        var o = app.sm.typeClicked == 'mesh' ?
            app.mm.map.get(app.sm.uuid) :
            app.modm.map.get(app.sm.uuid);

        //setting name
        o.name = $('#meshName').val();

        //setting group
        o.group = $('#meshGroup').val();

        //setting position
        o.position.set($('#position_x').val(), $('#position_y').val(), $('#position_z').val());

        //settting rotation
        o.rotation.set($('#rotation_x').val(), $('#rotation_y').val(), $('#rotation_z').val());
    },

    //texture events listeners
    onLightMapLoaded: function(event) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        var path = $(this).val().split("path")[1];
        /*
            #TODO whn using node webkit, we will read the file properly,
            now using $(this).val().spit(C:/)
        */
        var texture = THREE.ImageUtils.loadTexture("textures/"+path);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        var o = app.sm.typeClicked == 'mesh' ?
            app.mm.map.get(app.sm.uuid) :
            app.modm.map.get(app.sm.uuid);

        o.material.lightMap = texture;
        o.material.needsUpdate = true;
        //resetting click listener
        var typeClicked = app.sm.typeClicked;
        app.interface.meshEvents.unbind(o, "click");
        app.interface.meshEvents.bind(o, "click", function(event) {
            //now only adding this mesh to the transform control
            if (app.sm.lastClicked.uuid == event.target.uuid) return;
            app.sm.deselect();
            //Setting uuid to the scene
            app.sm.uuid = event.target.uuid;
            app.sm.typeClicked = typeClicked;
            app.sm.select(event.target, "translate");
        });
        //we added our texture
        $('#lightMap').next().html(
            "textures/"+ path +
            "<img style='height:30px; margin-left:5px;' src='textures/"+path+"'></img>"
        );
    },

    onTextureLoaded: function(key, _path) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        var path = app.storage.getSceneDir() + '/' + _path;//event.target.files[0].name;//$(this).val().split("path")[1];

        var texture = THREE.ImageUtils.loadTexture(path);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        //setting new material
        var o = app.sm.typeClicked == 'mesh' ?
            app.mm.map.get(app.sm.uuid) :
            app.modm.map.get(app.sm.uuid);
        o.material.map = texture;
        o.material.needsUpdate = true;
        o.textureKey = key;
        //resetting click listener
        var typeClicked = app.sm.typeClicked;
        app.interface.meshEvents.unbind(o, "click");
        app.interface.meshEvents.bind(o, "click", function(event) {
            //now only adding this mesh to the transform control
            if (app.sm.lastClicked.uuid == event.target.uuid) return;
            app.sm.deselect();
            //Setting uuid to the scene
            app.sm.uuid = event.target.uuid;
            app.sm.typeClicked = typeClicked;
            app.sm.select(event.target, "translate");
        });
        //we added our texture
        $('#textureMap').next().html(
            path +
            "<img style='height:30px; margin-left:5px;' src='"+path+"'></img>"
        );
    },

    onSpecularMapLoaded: function(_path) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        var path = app.storage.getSceneDir() + '/' + _path;//$(this).val().split("path")[1];
        /*
            #TODO whn using node webkit, we will read the file properly,
            now using $(this).val().spit(C:/)
        */
        var texture = THREE.ImageUtils.loadTexture(path);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        //setting new material
        var o = app.sm.typeClicked == 'mesh' ?
            app.mm.map.get(app.sm.uuid) :
            app.modm.map.get(app.sm.uuid);
        o.material.specularMap = texture;
        o.material.needsUpdate = true;
        //resetting click listener
        var typeClicked = app.sm.typeClicked;
        app.interface.meshEvents.unbind(o, "click");
        app.interface.meshEvents.bind(o, "click", function(event) {
            //now only adding this mesh to the transform control
            if (app.sm.lastClicked.uuid == event.target.uuid) return;
            app.sm.deselect();
            //Setting uuid to the scene
            app.sm.uuid = event.target.uuid;
            app.sm.typeClicked = typeClicked;
            app.sm.select(event.target, "translate");
        });
        //we added our texture
        $('#specularMap').next().html(
            "textures/"+ path +
            "<img style='height:30px; margin-left:5px;' src='"+path+"'></img>"
        );
    },

    onAlphaMapLoaded: function(_path) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        var path = app.storage.getSceneDir() + '/' + _path;//$(this).val().split("path")[1];
        /*
            #TODO whn using node webkit, we will read the file properly,
            now using $(this).val().spit(C:/)
        */
        var texture = THREE.ImageUtils.loadTexture(path);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        //setting new material
        var o = app.sm.typeClicked == 'mesh' ?
            app.mm.map.get(app.sm.uuid) :
            app.modm.map.get(app.sm.uuid);
        o.material.alphaMap = texture;
        o.material.needsUpdate = true;
        //resetting click listener
        var typeClicked = app.sm.typeClicked;
        app.interface.meshEvents.unbind(o, "click");
        app.interface.meshEvents.bind(o, "click", function(event) {
            //now only adding this mesh to the transform control
            if (app.sm.lastClicked.uuid == event.target.uuid) return;
            app.sm.deselect();
            //Setting uuid to the scene
            app.sm.uuid = event.target.uuid;
            app.sm.typeClicked = typeClicked;
            app.sm.select(event.target, "translate");
        });
        //we added our texture
        $('#alphaMap').next().html(
            "textures/"+ path +
            "<img style='height:30px; margin-left:5px;' src='"+path+"'></img>"
        );
    },

    onEnvMapLoaded: function(event) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        var path = app.storage.getSceneDir() + '/' + _path;//$(this).val().split("path")[1];
        /*
            #TODO whn using node webkit, we will read the file properly,
            now using $(this).val().spit(C:/)
        */
        var texture = THREE.ImageUtils.loadTexture(path);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        //setting new material
        var o = app.sm.typeClicked == 'mesh' ?
            app.mm.map.get(app.sm.uuid) :
            app.modm.map.get(app.sm.uuid);
        o.material.envMap = texture;
        o.material.needsUpdate = true;
        //resetting click listener
        var typeClicked = app.sm.typeClicked;
        app.interface.meshEvents.unbind(o, "click");
        app.interface.meshEvents.bind(o, "click", function(event) {
            //now only adding this mesh to the transform control
            if (app.sm.lastClicked.uuid == event.target.uuid) return;
            app.sm.deselect();
            //Setting uuid to the scene
            app.sm.uuid = event.target.uuid;
            app.sm.typeClicked = typeClicked;
            app.sm.select(event.target, "translate");
        });
        //we added our texture
        $('#envMap').next().html(
            "textures/"+ path +
            "<img style='height:30px; margin-left:5px;' src='"+path+"'></img>"
        );
    },

    //setting listener for material change
    changeMaterial: function(material) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        //setting new material, then reload sidebar triggering
        console.log(material);
        if (app.mm.allowedMaterials.indexOf(material) != -1) {
            var o = app.sm.typeClicked == 'mesh' ?
                app.mm.map.get(app.sm.uuid) :
                app.modm.map.get(app.sm.uuid);
            // #TODO should recreate mesh with exact properties of previous material
            var material_prop = {
                visible: o.material.visible,
                color: o.material.color,
                wireframe: o.material.wireframe,
                map: o.material.map,
                envMap: o.material.envMap,
                lightMap: o.material.lightMap,
                specularMap: o.material.specularMap,
                alphaMap: o.material.alphaMap
            };
            //now creating new material
            o.material = new THREE[material](material_prop);
            o.material.needsUpdate = true;
            //resetting click listener
            var typeClicked = app.sm.typeClicked;
            app.interface.meshEvents.unbind(o, "click");
            app.interface.meshEvents.bind(o, "click", function(event) {
                //now only adding this mesh to the transform control
                if (app.sm.lastClicked.uuid == event.target.uuid) return;
                app.sm.deselect();
                //Setting uuid to the scene
                app.sm.uuid = event.target.uuid;
                app.sm.typeClicked = typeClicked;
                app.sm.select(event.target, "translate");
            });
            //triggering event
            app.interface.events.meshMaterialChange.dispatch();
        } else {
            console.log("not allowed");
        }
    },

    changeScript: function(path, name) {
        var key = app.storage.getStorageKey(path).key,
            userData = {
                'script': key,
                'script_name': name,
                'script_key': app.storage.getStorageKey('').key
            };
        if (app.sm.typeClicked == 'mesh') {
            Object.assign(app.mm.map.get(app.sm.uuid).userData, userData);
        } else {
            Object.assign(app.modm.map.get(app.sm.uuid).userData, userData);
        }
        $('#changeScript').text(name);
    },

    changeShader: function(name) {
        var key = app.storage.getStorageKey(name).key,
            userData = {
                'shader': key,
                'shader_name': name,
                'shader_key': app.storage.getStorageKey('').key
            };
        // @todo user data should be extended and not overridden
        if (app.sm.typeClicked == 'mesh') {
            Object.assign(app.mm.map.get(app.sm.uuid).userData, userData);
        } else {
            Object.assign(app.modm.map.get(app.sm.uuid).userData, userData);
        }
        $('#changeShader').text(name);
    },

    changeShaderOption: function() {
        var container = document.querySelector('#shaderOptions'),
            inputs = $('#shaderOptions').find('input'),
            options = [];

        inputs.each(function(index, element) {
            var option = {};
            option[$(element).data('key')]= $(element).attr('type') === 'number' ? parseInt($(element).val()) : $(element).val();
            options.push(option);
        });
        
        var userData = {
            'shader_options': JSON.stringify(options)
        };

        if (app.sm.typeClicked == 'mesh') {
            Object.assign(app.mm.map.get(app.sm.uuid).userData, userData);
        } else {
            Object.assign(app.modm.map.get(app.sm.uuid).userData, userData);
        }

    },

    //receive shadow change event listener
    onMeshReceiveShadowChange: function(flag) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        //retrieving object
        if (app.sm.typeClicked == 'mesh') {
            app.mm.map.get(app.sm.uuid).receiveShadow = flag;
        } else {
            app.modm.map.get(app.sm.uuid).receiveShadow = flag;
        }
    },

    //cast shadow change event listener
    onMeshCastShadowChange: function(flag) {
        if ((app.sm.typeClicked != "mesh") + (app.sm.typeClicked != "model") > 1) return;
        //retrieving object
        if (app.sm.typeClicked == 'mesh') {
            app.mm.map.get(app.sm.uuid).castShadow = flag;
        } else {
            app.modm.map.get(app.sm.uuid).castShadow = flag;
        }
    }
});
