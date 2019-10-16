const path = require('path');
const File = require('./File');
const Config = require('../../config');

const SCRIPT_UUID = '6ba7b814-9dad-11d1-80b4-00c04fd430c8';

class Script extends File {
    constructor(name) {
        super(name, Config.getScriptsPath(), SCRIPT_UUID);
        this.type = 'script';
    }

    setType(type) {
        this.type = type;
        this.setPath(Config.getPathByScriptType(type));
    }

    toJSON(skipContent) {
        try {
            if (skipContent) {
                return {
                    ...super.toJSON(),
                    type: this.type
                };
            }

            const stringContent = this.content.toString('utf8');

            return {
                ...super.toJSON(),
                content: stringContent,
                type: this.type
            }
        } catch (e) {
            console.log(e);
            return {};
        }
    }
}

module.exports = Script;
