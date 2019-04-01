const path = require('path');
const File = require('./File');
const Config = require('../../config');

const UUID_MAP = {
    image: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
    texture: '6ba7b813-9dad-11d1-80b4-00c04fd430c8'
};

class Asset extends File {

    constructor(name, type) {
        super(name, Config.getFolderByAssetType(type), UUID_MAP[type]);
    }
}

module.exports = Asset;
