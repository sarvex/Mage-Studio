import { combineReducers } from 'redux';
import reducer from './reducer';
import currentMesh from './currentMesh';
import scenesettings from './scenesettings';

export default combineReducers({
    currentMesh,
    reducer,
    scenesettings
});
