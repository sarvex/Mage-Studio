const File = require('./File');
const Config = require('../Config');

class Model extends File {
    constructor(name) {
        super(name);

        this.setPath(Config.getAssetsPath());
    }
}

module.exports = Model;
