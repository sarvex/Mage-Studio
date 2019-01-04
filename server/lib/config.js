import fs from 'fs';

export const getLocalConfig = () => {
    try {
        const file = fs.readFileSync('.config.yml', 'utf8');
        const content = yaml.safeLoad(file);

        return content;
    } catch(e) {
        console.log('[Mage] An error occured reading config file.', e);
        return {};
    }

}
