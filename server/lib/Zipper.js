const path = require('path');
const tar = require('tar');

function unzip(source, filename) {
    return tar.x({
        file: path.resolve(source, filename),
        cwd: source
    });

}

function zip(source, filename) {
    // not implemented yet
}

module.exports = {
    zip: zip,
    unzip: unzip
};
