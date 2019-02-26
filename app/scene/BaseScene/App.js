import {
    App,
    ModelsEngine,
    ShadersEngine,
    SceneManager,
    ScriptManager,
    ControlsManager,
    ImagesEngine,
    AmbientLight,
    DirectionalLight,
    THREE,
    Mesh,
    PostProcessingEngine,
    BackgroundSound,
    AudioEngine,
    Universe
} from 'mage-engine';

import {
    isEqual
} from 'lodash';

import {
    observeStore
} from './reduxStore';

import { script } from './cube';

export default class FirstScene extends App {

    loadScene = () => Promise.resolve()

    progressAnimation(callback) {
        callback();
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
        console.log('loading script');
        const script = ScriptManager.createFromString(scriptContent);
        console.log(script);
        this.currentMesh.addScript(script.name());
    }

    updateCurrentMesh = (uuid = '', position, rotation, scale) => {
        const mesh = Universe.get(uuid);

        if (mesh) {
            mesh.position(position);
            mesh.rotation(rotation);
            mesh.scale(scale);

            this.dispatchEvent({
                type: 'meshChanged',
                element: mesh.uuid(),
                position,
                rotation,
                scale
            });
        }
    }

    onMeshClick = ({ meshes }) => {
        const mesh = meshes[0];
        this.currentMesh = mesh;
        this.transform.attach(mesh);

        this.dispatchEvent({
            type: 'meshAttached',
            element: mesh.uuid(),
            rotation: mesh.rotation(),
            scale: mesh.scale(),
            position: mesh.position()
        });
    }

    onMeshDeselect = () => {
        this.transform.detach();
        this.dispatchEvent({ type: 'meshDetached' });
    }

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

    dispatchMeshChange = () => {
        if (!this.transform.object || !this.currentMesh) return;

        this.dispatchEvent({
            type: 'meshChanged',
            element: this.currentMesh.uuid(),
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
            state.element,
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
        ScriptManager.create('cube', script);
        SceneManager.camera.position({y: 70, z: 150});
        SceneManager.camera.lookAt(0, 0, 0);

        this.setTranformControls();
        this.enableInput();

        this.sceneHelper.addGrid(200, 10);
    }
}
