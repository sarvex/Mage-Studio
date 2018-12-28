import { combineReducers } from 'redux';
import currentMesh from './currentMesh';
import controls from './controls';
import shadows from './shadows';
import fog from './fog';
import rightsidebar from './rightsidebar';

export default combineReducers({
    currentMesh,
    fog,
    shadows,
    controls,
    rightsidebar
});
