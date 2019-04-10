const path = require('path');
const File = require('./File');
const Config = require('../../config');

const MODEL_UUID = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

class Model extends File {

    constructor(name) {
        super(name, Config.getModelsPath(), MODEL_UUID);
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
