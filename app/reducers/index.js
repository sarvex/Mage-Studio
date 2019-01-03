import { combineReducers } from 'redux';
import controls from './controls';
import shadows from './shadows';
import fog from './fog';
import rightsidebar from './rightsidebar';

export default combineReducers({
    fog,
    shadows,
    controls,
    rightsidebar
});
