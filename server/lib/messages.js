const PROJECT_NAME_MISSING = { code: 400, text: 'Project name is missing.' };
const PROJECT_CREATED = { code: 201, text: ''};
const PROJECT_NOT_CREATED = { code: 204, text: 'Something went wrong when creating the project.' };

const CONFIG_MISSING = { code: 404, text: 'Configuration is unavailable.' };
const CONFIG_AVAILABLE = { code: 200 };

module.exports = {
    PROJECT_NAME_MISSING: PROJECT_NAME_MISSING,
    PROJECT_CREATED: PROJECT_CREATED,
    CONFIG_MISSING: CONFIG_MISSING,
    CONFIG_AVAILABLE: CONFIG_AVAILABLE,
    PROJECT_NOT_CREATED: PROJECT_NOT_CREATED
};
