import { HIERARCHY_CHANGE } from "../actions/types";

const DEFAULT_STATE = {
    graph: {},
};

const reducer = (state = DEFAULT_STATE, action) => {
    console.log(state, action);
    switch (action.type) {
        case HIERARCHY_CHANGE:
            return {
                ...state,
                graph: action.graph,
            };
        default:
            return state;
    }
};

export default reducer;
