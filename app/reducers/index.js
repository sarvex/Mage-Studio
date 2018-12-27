import { combineReducers } from 'redux';
import currentMesh from './currentMesh';
import controls from './controls';
import shadows from './shadows';
import fog from './fog';

export default combineReducers({
    currentMesh,
    fog,
    shadows,
    controls
});
