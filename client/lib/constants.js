export const CONFIG_URL = 'api/config';
export const PROJECTS_URL = 'api/projects';
export const SCENES_URL = 'api/scenes';

export const SCRIPTS_EDITOR_PATH = '/code';

export const ASSETS_TYPES = [
    { code: 'textures', display: 'Texture' },
    { code: 'models', display: 'Model' },
    { code: 'audio', display: 'Audio' },
    { code: 'videos', display: 'Video' },
    { code: 'scripts', display: 'Script' }
];

export const GLOBAL_SPACE = 'global';
export const LOCAL_SPACE = 'local';

export const AVAILABLE_SPACES = [
    GLOBAL_SPACE,
    LOCAL_SPACE
];

export const TRANSLATE_CONTROL = 'translate';
export const ROTATE_CONTROL = 'rotate';
export const SCALE_CONTROL = 'scale';

export const AVAILABLE_CONTROLS = [
    TRANSLATE_CONTROL,
    ROTATE_CONTROL,
    SCALE_CONTROL
];

export const buildUrl = (baseUrl, url) => (`http://${baseUrl}/${url}`);
export const getScenesUrl = (scene) => `${SCENES_URL}/${scene}`;
export const getProjectsUrl = (project) => `${PROJECTS_URL}/${project}`;
export const getAssetsUrl = (project) => `${getProjectsUrl(project)}/assets`;
export const getImagesUrl = (project) => `${getProjectsUrl(project)}/images`;
export const getImageUrl = (project, image) => `${getImagesUrl(project)}/${image}`;

export const MIMETYPES = {
    APPLICATION_JSON: 'application/json'
};
