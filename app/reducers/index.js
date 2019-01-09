import { combineReducers } from 'redux';
import controls from './controls';
import shadows from './shadows';
import fog from './fog';
import snap from './snap';
import rightsidebar from './rightsidebar';
import projectModal from './projectModal';

export default combineReducers({
    fog,
    shadows,
    controls,
    snap,
    rightsidebar,
    projectModal
});
