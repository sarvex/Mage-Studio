const PROJECT_NAME_MISSING = { code: 400, text: 'Project name is missing.' };
const SCENE_NAME_MISSING = { code: 400, text: 'Scene name is missing.' };

const PROJECT_CREATED = { code: 201, text: ''};
const PROJECT_NOT_CREATED = { code: 204, text: 'Something went wrong when creating the project.' };

const CONFIG_MISSING = { code: 404, text: 'Configuration is unavailable.' };
const CONFIG_AVAILABLE = { code: 200 };

const SCENE_NOT_FOUND = { code: 404, text: 'Scene could not be found.' };
const SCENE_DATA_MISSING = { code: 400, text: 'Scene data is missing.' };

const SCENE_JSON_NOT_CREATED = { code: 204, text: 'Something went wrong when creating the scene.json' };
const SCENE_JSON_CREATED = { code: 201, text: ''};

const FILE_WRITE_SUCCESS = { code: 201 };
const FILE_WRITE_FAILURE = { code: 204, text: 'Could not write file'};


module.exports = {
    PROJECT_NAME_MISSING: PROJECT_NAME_MISSING,
    SCENE_NAME_MISSING: SCENE_NAME_MISSING,
    PROJECT_CREATED: PROJECT_CREATED,
    CONFIG_MISSING: CONFIG_MISSING,
    CONFIG_AVAILABLE: CONFIG_AVAILABLE,
    PROJECT_NOT_CREATED: PROJECT_NOT_CREATED,
    SCENE_NOT_FOUND: SCENE_NOT_FOUND,
    SCENE_DATA_MISSING: SCENE_DATA_MISSING,
    SCENE_JSON_NOT_CREATED: SCENE_JSON_NOT_CREATED,
    SCENE_JSON_CREATED: SCENE_JSON_CREATED,
    FILE_WRITE_SUCCESS: FILE_WRITE_SUCCESS,
    FILE_WRITE_FAILURE: FILE_WRITE_FAILURE
};
