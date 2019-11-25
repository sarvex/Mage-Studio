const axios = require('axios');
const path = require('path');
const fs = require('fs');

function downloadFile(url) {
    return axios.get(url, { responseType: 'stream' });
};

function downloadFileToPath(url, destination, { verbose = true } = {}) {
    const target = path.resolve(__dirname, destination);
    const writer = fs.createWriteStream(target);

    if (verbose) console.log(`Downloading ${url} to ${destination}..`);
    return new Promise(function (resolve, reject) {
        downloadFile(url)
            .then(function(response) {
                if (verbose) console.log('..');
                response.data.pipe(writer);
                writer.on('finish', resolve);
                writer.on('error', reject);
            })
    });
}

module.exports = {
    downloadFile: downloadFile,
    downloadFileToPath: downloadFileToPath
};
