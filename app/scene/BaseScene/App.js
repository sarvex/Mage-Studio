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
    AudioEngine
} from 'mage-engine';

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
        cube.loadScript('cube');

        return cube;
    }

    onCreate() {

        ScriptManager.create('cube', script);

        SceneManager.camera.position({y: 70, z: 150});
        SceneManager.camera.lookAt(0, 0, 0);

        const cube = this.sampleCube();

        ControlsManager.setOrbitControl();
        ControlsManager.setTransformControl();
        const transform = ControlsManager.getControl('transform');

        transform.attach(cube.mesh);

        this.sceneHelper.addGrid(200, 10);

    }
}
