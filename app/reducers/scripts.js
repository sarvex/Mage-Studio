import {
    SCRIPTS_FETCH_FAILED,
    SCRIPTS_FETCH_STARTED,
    SCRIPTS_FETCH_COMPLETED,
    SCRIPTS_SINGLE_FETCH_COMPLETED,
    SCRIPTS_NEW_FILE_MODAL,
    SCRIPTS_EDITOR_SCRIPT_CHANGED,
    SCRIPTS_EDITOR_SCRIPT_LOADED,
    SCRIPTS_EDITOR_FINISHED_LOADING
} from '../actions/types';

const DEFAULT = {
    loading: false,
    error: false,
    completed: false,
    data: null,
    list: [],
    modalVisible: false,
    editor: {
        loaded: false,
        filename: '',
        code: ''
    }
};

export default function reducer(state = DEFAULT, action = {}) {
    switch(action.type) {
        case SCRIPTS_FETCH_STARTED:
            return {
                ...DEFAULT,
                ...state,
                loading: true
            };
            break;
        case SCRIPTS_FETCH_FAILED:
            return {
                ...DEFAULT,
                ...state,
                error: true
            };
            break;
        case SCRIPTS_FETCH_COMPLETED:
            return {
                ...DEFAULT,
                ...state,
                list: action.list,
                completed: true
            };
            break;
        case SCRIPTS_SINGLE_FETCH_COMPLETED:
            return {
                ...DEFAULT,
                ...state,
                data: action.data,
                completed: true
            };
            break;
        case SCRIPTS_NEW_FILE_MODAL:
            return {
                ...DEFAULT,
                ...state,
                modalVisible: action.visible
            };
            break;
        case SCRIPTS_EDITOR_SCRIPT_CHANGED:
        case SCRIPTS_EDITOR_SCRIPT_LOADED:
            return {
                ...DEFAULT,
                ...state,
                editor: {
                    ...state.editor,
                    filename: action.filename,
                    code: action.code
                }
            };
            break;
        case SCRIPTS_EDITOR_FINISHED_LOADING:
            return {
                ...DEFAULT,
                ...state,
                editor: {
                    ...state.editor,
                    loaded: true
                }
            };
            break;
        default:
            return state;
            break;
    }
}
