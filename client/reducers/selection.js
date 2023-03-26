import { SELECTION_CHANGE } from "../actions/types";

const INITIAL_STATE = {
    element: {},
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECTION_CHANGE:
            return {
                ...state,
                ...action.selection,
            };
        default:
            return state;
    }
};

export default reducer;
