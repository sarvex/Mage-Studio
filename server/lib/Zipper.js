const path = require('path');
const tar = require('tar');

function unzip(source, filename) {
    return new Promise((resolve, reject) => {
        try {
            tar.x({
                file: path.resolve(source, filename),
                cwd: source
            });
            resolve();
        } catch(e) {
            reject();
        }
    });

}

function zip(source, filename) {
    // not implemented yet
}

module.exports = {
    zip: zip,
    unzip: unzip
};
