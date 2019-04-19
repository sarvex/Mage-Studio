import {
    ASSETS_TEXTURE_MODAL_SHOW,
    ASSETS_TEXTURE_MODAL_HIDE,
    ASSETS_TEXTURE_MODAL_LOADING,
    ASSETS_TEXTURE_MODAL_COMPLETED,
    ASSETS_TEXTURE_MODAL_FAILED
} from '../actions/types';

const DEFAULT = {
    textureModalVisible: false,
    textureModalLoading: false,
    textureModalCompleted: false,
    textureModalError: false
};

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case ASSETS_TEXTURE_MODAL_SHOW:
            return {
                ...state,
                ...DEFAULT,
                textureModalVisible: true
            };
            break;
        case ASSETS_TEXTURE_MODAL_HIDE:
            return {
                ...state,
                DEFAULT,
                textureModalVisible: false
            };
            break;
        case ASSETS_TEXTURE_MODAL_FAILED:
            return {
                ...state,
                DEFAULT,
                textureModalError: true
            };
            break;
        case ASSETS_TEXTURE_MODAL_LOADING:
            return {
                ...state,
                DEFAULT,
                textureModalLoading: true
            };
            break;
        case ASSETS_TEXTURE_MODAL_COMPLETED:
            return {
                ...state,
                DEFAULT,
                textureModalCompleted: true
            };
            break;
        default:
            return state;
            break;
    }
}