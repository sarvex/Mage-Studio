const path = require('path');
const fs = require('fs');

class File {
    constructor(name) {
        this.name = name;
    }

    setPath(folder) {
        this.folder = folder;
        this.fullPath = path.join(this.folder, this.name);
    }

    exists() {
        return fs.existsSync(this.fullPath);
    }

    writeBuffer(buffer) {
        try {
            console.log(this.fullPath);
            const descriptor = fs.openSync(this.fullPath, 'w');
            fs.writeSync(descriptor, buffer, 0, buffer.length, null);
            fs.closeSync(descriptor);

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    writeText(text) {

    }

    move(destination) {

    }
}

module.exports = File;
