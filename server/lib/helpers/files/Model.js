const File = require('./File');
const Config = require('../../config');

class Model extends File {
    constructor(name) {
        super(name);

        this.setPath(Config.getAssetsPath());
    }

    toJSON() {
        try {
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
