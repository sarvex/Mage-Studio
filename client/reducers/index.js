import { combineReducers } from 'redux';
import controls from './controls';
import shadows from './shadows';
// import fog from './fog';
import snap from './snap';
import rightsidebar from './rightsidebar';
import projectModal from './projectModal';
import models from './models';
import scene from './scene';
import config from './config';
import project from './project';
import scripts from './scripts';
import assets from './assets';
import textures from './textures';

export default combineReducers({
    // fog,
    shadows,
    controls,
    snap,
    rightsidebar,
    projectModal,
    models,
    scene,
    project,
    scripts,
    config,
    assets,
    textures
});
