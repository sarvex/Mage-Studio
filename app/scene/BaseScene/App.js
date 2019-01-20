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
    arraysEqual
} from '../../lib/util';

import { script } from './cube';

export default class FirstScene extends App {

    loadScene = () => Promise.resolve()

    progressAnimation(callback) {
        callback();
    }

    sampleCube() {
        const geometry = new THREE.CubeGeometry(20, 20, 20);
		const material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe : true
		});

		const cube = new Mesh(geometry, material);
        //cube.loadScript('cube');

        return cube;
    }

    isMeshChanging = (position, rotation, scale) => {
        const toCheck = [
            position.x, position.y, position.z,
            rotation.x, rotation.y, rotation.z,
            scale.x, scale.y, scale.z
        ];
        const current = [
            this.currentMesh.position().x, this.currentMesh.position().y, this.currentMesh.position().z,
            this.currentMesh.rotation().x, this.currentMesh.rotation().y, this.currentMesh.rotation().z,
            this.currentMesh.scale().x, this.currentMesh.scale().y, this.currentMesh.scale().z
        ];

        return !arraysEqual(toCheck, current);
    }

    updateCurrentMesh = (uuid = '', position, rotation, scale) => {
        if (isEqual(uuid, this.currentMesh.uuid()) && (
            !isEqual(position, this.currentMesh.position()) ||
            !isEqual(rotation, this.currentMesh.rotation()) ||
            !isEqual(scale, this.currentMesh.scale()))) {

            this.currentMesh.position(position);
            this.currentMesh.rotation(rotation);
            this.currentMesh.scale(scale);

            this.dispatchEvent({
                type: 'meshChanged',
                element: this.currentMesh.uuid()
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

    setTranformControls(cube) {
        ControlsManager.setOrbitControl();
        ControlsManager.setTransformControl();

        this.transform = ControlsManager.getControl('transform');
        this.transform.addEventListener('change', this.dispatchMeshChange.bind(this));
    }

    changeTransformControl = (controls) => {
        if (this.transform) {
            if (controls.control) this.transform.setMode(controls.control);
            if (controls.space) this.transform.setSpace(controls.space);
        }
    }

    changeTransformSnap = ({ snapValue = 100, snapEnabled = false}) => {
        if (snapEnabled) {
            this.transform.setTranslationSnap(snapValue);
            this.transform.setRotationSnap(THREE.Math.degToRad(snapValue / 10));
        } else {
            this.transform.setTranslationSnap(null);
            this.transform.setRotationSnap(null);
        }
    }

    changeFog = (fog) => {
        if (fog.color && fog.density && fog.enabled) {
            SceneManager.fog(fog.color, fog.density/1000);
        }
    }

    dispatchMeshChange = () => {
        if (!this.transform.object || !this.currentMesh) return;
        //const element = Universe.get(this.transform.object.uuid);
/*
        this.dispatchEvent({
            type: 'meshChanged',
            element: this.currentMesh
        });
        */
    }

    setStore(store) {
        this.store = store;
        this.unsubscribe = this.store.subscribe(this.handleStoreChange);

        this.currentValues = this.mapStoreState();
    }

    isReceivingSameValues = (values) => {
        return Object.keys(values).filter(k => (
            values[k] !== this.currentValues[k]
        )) === 0;
    }

    mapStoreState = () => {
        const state = this.store.getState();
        const { controls = {}, fog = {}, snap = {}, rightsidebar } = state;
        const { element, position, rotation, scale } = rightsidebar;
        return {
            snap,
            controls,
            fog,
            element,
            position,
            rotation,
            scale
        };
    }

    handleStoreChange = () => {
        const state = this.mapStoreState();
        console.log(state);
        this.changeTransformControl(state.controls);

        this.updateCurrentMesh(
            state.element,
            state.position,
            state.rotation,
            state.scale);

        /*
        const values = this.mapStoreState();

        this.changeFog(this.currentValues.fog);

        this.changeTransformSnap(this.currentValues.snap);
        */
    }

    onCreate() {
        ScriptManager.create('cube', script);
        SceneManager.camera.position({y: 70, z: 150});
        SceneManager.camera.lookAt(0, 0, 0);

        const cube = this.sampleCube();

        this.setTranformControls(cube);

        this.enableInput();

        this.sceneHelper.addGrid(200, 10);

    }
}
