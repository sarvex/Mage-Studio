import { combineReducers } from 'redux';
import controls from './controls';
import shadows from './shadows';
import fog from './fog';
import rightsidebar from './rightsidebar';
import projectModal from './projectModal';

export default combineReducers({
    fog,
    shadows,
    controls,
    rightsidebar,
    projectModal
});
