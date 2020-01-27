import {
    App,
    ModelsEngine,
    ShadersEngine,
    SceneManager,
    ScriptManager,
    ControlsManager,
    ImagesEngine,
    AmbientLight,
    SunLight,
    THREE,
    Mesh,
    PostProcessingEngine,
    BackgroundSound,
    AudioEngine,
    Universe
} from 'mage-engine';

import {
    observeStore
} from './reduxStore';

export class EditorScene extends App {

    constructor(...props) {
        super(...props);
    }

    loadScene = () => Promise.resolve()

    progressAnimation(callback) {
        callback();
    }

    addAmbientLight() {
        const light = new AmbientLight({
            color:0xeeeeee,
            intensity: 1
        });

        light.addHelper();
    }

    addSunLight() {

        const light = new SunLight({
            color: 0xeeeeee,
            intensity: 1,
            position: { x: 40, y: 40, z: 40},
            target: { x: 1, y: 1, z: 1 }
        });
        light.addHelper();
        light.position({
            x: (Math.random() * 200) - 100,
            y: (Math.random() * 200) - 100,
            z: (Math.random() * 200) - 100
        });
    }

    addCube() {
        const cube = this.sceneHelper.addCube(20, 0x00ff00, { wireframe: true });
        cube.position({
            x: (Math.random() * 200) - 100,
            y: (Math.random() * 200) - 100,
            z: (Math.random() * 200) - 100
        });

        return cube;
    }

    addSphere() {
        const sphere = this.sceneHelper.addSphere(20, 0xffff00, { wireframe: true });
        sphere.position({
            x: (Math.random() * 200) - 100,
            y: (Math.random() * 200) - 100,
            z: (Math.random() * 200) - 100
        });

        return sphere;
    }

    addCylinder() {
        const cylinder = this.sceneHelper.addCylinder(10, 10, 30, 0x0fff00, { wireframe: true });
        cylinder.position({
            x: (Math.random() * 200) - 100,
            y: (Math.random() * 200) - 100,
            z: (Math.random() * 200) - 100
        });

        return cylinder;
    }

    loadModel = (model) => {
        const parsed = ModelsEngine.parseModel(model);
        parsed.scale({x: 5, y: 5, z: 5 });
        parsed.position({x: 0, y: 0, z: 0})
    }

    loadScript = (scriptContent) => {
        const script = ScriptManager.createFromString(scriptContent);
        this.currentMesh.addScript(script.name());
    }

    updateCurrentMesh = (name = '', position, rotation, scale) => {
        if (this.currentMesh && this.hasSelection) {
            this.currentMesh.position(position);
            this.currentMesh.rotation(rotation);
            this.currentMesh.scale(scale);
            this.currentMesh.setName(name, { replace: true })

            this.dispatchEvent({
                type: 'meshChanged',
                name: this.currentMesh.name,
                position,
                rotation,
                scale
            });
        }
    }

    onMeshClick = ({ meshes }) => {
        const mesh = meshes[0];
        this.currentMesh = mesh;
        this.hasSelection = true;
        this.transform.attach(mesh);

        this.dispatchEvent({
            type: 'meshAttached',
            name: mesh.name,
            rotation: mesh.rotation(),
            scale: mesh.scale(),
            position: mesh.position()
        });
    }

    onMeshDeselect = () => {
        this.hasSelection = false;
        this.dispatchEvent({ type: 'meshDetached' });
    }

    onKeyDown = (e) => {}
    onKeyUp = (e) => {}

    onKeyPress = ({ event }) => {
        switch (event.key) {
			case "q": // Q
				this.transform.setSpace(this.transform.space === "local" ? "world" : "local");
				break;
			case "ctrl": // Ctrl
				this.transform.setTranslationSnap(100);
				this.transform.setRotationSnap(THREE.Math.degToRad(15));
				break;
			case "w": // W
				this.transform.setMode("translate");
				break;
			case "e": // E
				this.transform.setMode("rotate");
				break;
			case "r": // R
				this.transform.setMode("scale");
				break;
			case 187:
			case 107: // +, =, num+
				this.transform.setSize(this.transform.size + 0.1);
				break;
			case 189:
			case 109: // -, _, num-
				this.transform.setSize(Math.max(this.transform.size - 0.1, 0.1));
				break;
			case 'x': // X
				this.transform.showX = ! this.transform.showX;
				break;
			case 'y': // Y
				this.transform.showY = ! this.transform.showY;
				break;
			case 'z': // Z
				this.transform.showZ = ! this.transform.showZ;
				break;
			case 32: // Spacebar
				this.transform.enabled = ! this.transform.enabled;
				break;
            case 'escape':
                this.transform.detach()
                break;
		}
    }

    setTranformControls() {
        ControlsManager.setOrbitControl();
        ControlsManager.setTransformControl();

        this.transform = ControlsManager.getControl('transform');
        this.transform.addEventListener('objectChange', this.dispatchMeshChange.bind(this));
    }

    changeTransformControl = (controls) => {
        if (this.transform) {
            if (controls.control) this.transform.setMode(controls.control);
            if (controls.space) this.transform.setSpace(controls.space);
        }
    }

    changeTransformSnap = ({ snapValue = 100, snapEnabled = false}) => {
        if (this.transform) {
            if (snapEnabled) {
                this.transform.setTranslationSnap(snapValue);
                this.transform.setRotationSnap(THREE.Math.degToRad(snapValue / 10));
            } else {
                this.transform.setTranslationSnap(null);
                this.transform.setRotationSnap(null);
            }
        }
    }

    changeFog = (fog) => {
        if (fog.color && fog.density && fog.enabled) {
            SceneManager.fog(fog.color, fog.density/1000);
        }
    }

    changeTexture = (textureId, texturePath) => {
        if (this.currentMesh) {
            ImagesEngine
                .loadSingleTexture(textureId, texturePath)
                .then((texture) => {
                    this.currentMesh.setTexture(textureId);
                });
        }
    }

    changeMaterial = (materialName) => {
        if (this.currentMesh) {
            this.currentMesh.setMaterialFromName(materialName);
        }
    }

    dispatchMeshChange = () => {
        if (!this.transform.object || !this.currentMesh) return;

        this.dispatchEvent({
            type: 'meshChanged',
            name: this.currentMesh.name,
            rotation: this.currentMesh.rotation(),
            scale: this.currentMesh.scale(),
            position: this.currentMesh.position()
        });
    }

    setStore(store) {
        this.store = store;
        this.unsubscribe = observeStore(store, this.handleStoreChange);
    }

    handleStoreChange = (state) => {
        this.changeTransformControl(state.controls);

        this.updateCurrentMesh(
            state.name,
            state.position,
            state.rotation,
            state.scale);

        this.changeFog(state.fog);

        this.changeTransformSnap(state.snap);

        this.handleSceneChange(state.scene);
    }

    handleSceneChange = (state) => {
        if (state.requested) {
            this.dispatchEvent({
                type: 'sceneExported',
                data: this.toJSON()
            });
        }
    }

    onCreate() {
        SceneManager.camera.position({y: 70, z: 150});
        SceneManager.camera.lookAt(0, 0, 0);

        this.setTranformControls();
        this.enableInput();

        this.sceneHelper.addGrid(2000, 100);
    }
}
