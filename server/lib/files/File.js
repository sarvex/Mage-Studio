const path = require('path');
const fs = require('fs');

class File {
    constructor(name) {
        this.name = name;
    }

    setPath(folder) {
        this.folder = folder;
        this.fullPath = path.join(this.folder, this.name);

        this.content = undefined;
        this.isBuffer = false;
    }

    exists() {
        return fs.existsSync(this.fullPath);
    }

    setContent(content) {
        if (content instanceof Buffer) {
            this.isBuffer = true;
        }

        this.content = content;
    }

    writeToFile() {
        if (this.isBuffer) {
            return this.writeBuffer();
        }
        return this.writeText();
    }

    writeBuffer() {
        try {
            const descriptor = fs.openSync(this.fullPath, 'w');
            fs.writeSync(descriptor, this.content, 0, this.content.length, null);
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
