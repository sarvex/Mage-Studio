const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const getLocalConfig = () => {
    try {
        const file = fs.readFileSync(path.resolve('.config.yml'), 'utf8');
        const content = yaml.safeLoad(file);

        return content;
    } catch(e) {
        console.log('[Mage] An error occured reading config file.', e);
        return false;
    }
};

const updateLocalConfig = (config) => {
    try {
        console.log(config);
        if (config && Object.keys(config).length > 0) {
            const content = getLocalConfig();
            const newConfig = Object.assign(content, config);

            const yamlContent = yaml.safeDump(newConfig);
            fs.writeFileSync(path.resolve('.config.yml'), yamlContent);

            return true;
        } else {
            console.log('[Mage] provided configuration is empty.');
        }
    } catch(e) {
        console.log('[Mage] An error occured writing config file.', e);
        return false;
    }
}

module.exports = {
    getLocalConfig: getLocalConfig,
    updateLocalConfig: updateLocalConfig
};
