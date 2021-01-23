import {
    SCENE_CONTROLS_CHANGED,
    SCENE_CONTROLS_SPACE_CHANGED,
    SCENE_SNAP_CHANGED
} from '../actions/types';
import {
    TRANSLATE_CONTROL,
    GLOBAL_SPACE,
    LOCAL_SPACE
} from '../lib/constants';

const DEFAULT = {
    current: TRANSLATE_CONTROL,
    space: GLOBAL_SPACE,
    snapEnabled: false,
    snap: 10
};

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case SCENE_CONTROLS_CHANGED:
            return {
                ...state,
                current: action.control || TRANSLATE_CONTROL
            };
        case SCENE_CONTROLS_SPACE_CHANGED:
            return {
                ...state,
                space: state.space === GLOBAL_SPACE ? LOCAL_SPACE : GLOBAL_SPACE
            };
        case SCENE_SNAP_CHANGED:
            return {
                ...state,
                snap: action.value < 10 ? 10 : action.value,
                snapEnabled: action.snapEnabled
            };
        default:
            return state;
    }
}
