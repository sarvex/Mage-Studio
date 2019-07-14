const File = require('./File');
const Config = require('../../config');

const UUID_SEED = '6ba7b814-9dad-11d1-80b4-00c04fd430c8';

class Scene extends File {

    constructor(name) {
        const localConfig = Config.getLocalConfig();
        const path = Config.getScenePath();

        super(name, path, UUID_SEED);
    }

    toJSON(skipContent) {
        try {
            if (skipContent) {
                return {
                    ...super.toJSON()
                };
            }

            const stringContent = this.content.toString('utf8');

            return {
                ...super.toJSON(),
                content: {
                    ...JSON.parse(stringContent)
                }
            }
        } catch (e) {
            return {};
        }
    }
}

module.exports = Scene;
