import {
    App,
    ModelsEngine,
    ShadersEngine,
    SceneManager,
    ScriptManager,
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

    onCreate() {

        ScriptManager.create('cube', script);

        const geometry = new THREE.CubeGeometry(20, 20, 20);
		const material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe : true
		});

		const cube = new Mesh(geometry, material);
        cube.loadScript('cube');
    }
}
