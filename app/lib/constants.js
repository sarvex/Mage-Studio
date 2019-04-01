export const CONFIG_URL = 'api/config';
export const PROJECTS_URL = 'api/projects';
export const SCENES_URL = 'api/scenes';


export const buildUrl = (baseUrl, url) => (`http://${baseUrl}/${url}`);

export const getAssetsUrl = (project) => `${PROJECTS_URL}/${project}/assets`;