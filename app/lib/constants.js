export const CONFIG_URL = 'api/config';
export const PROJECTS_URL = 'api/projects';
export const SCENES_URL = 'api/scenes';

export const ASSETS_TYPES = [
    { code: 'texture', display: 'Texture' },
    { code: 'model', display: 'Model' },
    { code: 'audio', display: 'Audio' },
    { code: 'video', display: 'Video' },
    { code: 'script', display: 'Script' }
];

export const buildUrl = (baseUrl, url) => (`http://${baseUrl}/${url}`);

export const getAssetsUrl = (project) => `${PROJECTS_URL}/${project}/assets`;

export const getImageUrl = (project, image) => `${PROJECTS_URL}/${project}/images/${image}`;
