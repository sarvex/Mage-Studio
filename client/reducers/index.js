import { combineReducers } from "redux";

import controls from "./controls";
import hierarchy from "./hierarchy";
import selection from "./selection";

export default combineReducers({
    controls,
    selection,
    hierarchy,
});
