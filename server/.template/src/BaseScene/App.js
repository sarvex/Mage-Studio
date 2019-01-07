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
    dispatch
} from 'redux';

import { script } from './cube';

export default class FirstScene extends App {

    loadScene = () => Promise.resolve()

    progressAnimation(callback) {
        callback();
    }
    
    onCreate() {

    }
}
