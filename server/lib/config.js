const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONFIG_FILE_NAME = './.config.yml';
const ASSETS = 'assets';
const SRC = 'src';
const SCRIPTS = 'scripts';
const TEXTURES = 'textures';
const IMAGES = 'images';
const MODELS = 'models';

function getDefaultLocalConfig() {
    return {
        workspace: '',
        project: '',
        scene: 'BaseScene'
    }
}

function getLocalConfig() {
    try {
        const configPath = path.resolve(CONFIG_FILE_NAME);
        const file = fs.readFileSync(configPath, 'utf8');
        const content = yaml.safeLoad(file);

        return content;
    } catch(e) {
        console.log('[Mage] An error occured reading config file.', e);
        return false;
    }
}

function updateLocalConfig(config) {
    try {
        if (config && Object.keys(config).length > 0) {
            const defaultconfig = getDefaultLocalConfig();
            const localconfig = getLocalConfig();
            const newConfig = Object.assign(defaultconfig, localconfig, config);

            const yamlContent = yaml.safeDump(newConfig);
            fs.writeFileSync(path.resolve(CONFIG_FILE_NAME), yamlContent);

            return true;
        } else {
            console.log('[Mage] provided configuration is empty.');
        }
    } catch(e) {
        console.log('[Mage] An error occured writing config file.', e);
        return false;
    }
}

function getProjectPath(project) {
    const local = getLocalConfig();
    const projectName = project || local.project || '';

    return path.join(local.workspace, projectName);
}

function getAssetsPath() {
    return path.join(getProjectPath(), ASSETS);
}

function getScriptsPath() {
    return path.join(getAssetsPath(), SCRIPTS);
}

function getTexturesPath() {
    return path.join(getAssetsPath(), TEXTURES);
}

function getImagesPath() {
    return path.join(getAssetsPath(), IMAGES);
}

function getModelsPath() {
    return path.join(getAssetsPath(), MODELS);
}

function getFolderByAssetType(type) {
    let folder = getAssetsPath();

    switch(type) {
        case 'model':
            folder = getModelsPath();
            break;
        case 'image':
            folder = getImagesPath();
            break;
        case 'texture':
            folder = getTexturesPath();
            break;
        case 'scene':
            folder = getSrcRoot();
            break;
        default:
            break;
    }

    return folder;
}

function getSrcRoot() {
    return path.join(
        getProjectPath(),
        SRC
    );
}

function getScenePath(sceneName) {
    return path.join(
        getSrcRoot(),
        sceneName
    )
}

module.exports = {
    getDefaultLocalConfig: getDefaultLocalConfig,
    getLocalConfig: getLocalConfig,
    updateLocalConfig: updateLocalConfig,
    getProjectPath: getProjectPath,
    getAssetsPath: getAssetsPath,
    getScriptsPath: getScriptsPath,
    getTexturesPath: getTexturesPath,
    getImagesPath: getImagesPath,
    getModelsPath: getModelsPath,
    getFolderByAssetType: getFolderByAssetType,
    getSrcRoot: getSrcRoot,
    getScenePath: getScenePath
};
