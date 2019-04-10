const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v5');

class File {

    static getExtension(name) {
        return '.'.concat(name.split('.').slice(1).join('.'));
    }

    constructor(name, path, uuidNamespace) {
        this.name = name;
        this.extension = File.getExtension(this.name);

        this.setPath(path);

        this.uuid = uuid(this.fullPath, uuidNamespace);
    }

    toJSON() {
        // potwntially add more informations about the file
        return {
            name: this.name,
            extension: this.extension,
            uuid: this.uuid,
            folder: this.folder,
            fullPath: this.fullPath
        };
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

    read() {
        const content = fs.readFileSync(this.fullPath);

        this.setContent(content);
        return content;
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
            return false;
        }
    }

    writeText(text) {

    }

    move(destination) {

    }
}

module.exports = File;
