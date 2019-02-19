const File = require('./File');

class Asset extends File {
    constructor(name) {
        super(name);
        this.setPath();
    }
}

module.exports = Asset;
