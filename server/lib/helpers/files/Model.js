const path = require('path');
const File = require('./File');
const Config = require('../../config');

class Model extends File {
    constructor(name) {
        super(name);

        this.setPath(path.join(Config.getAssetsPath(), 'models'));
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

module.exports = Model;
