import { combineReducers } from 'redux';
import reducer from './reducer';
import currentMesh from './currentMesh';

export default combineReducers({
    currentMesh,
    reducer
});
