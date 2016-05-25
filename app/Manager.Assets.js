Class('AssetsManager', {
    AssetsManager: function() {
        this.assets = [];
        this.allowedAssets = [
            "audio",
            "video",
            "images"
        ];
        this.assetsCount = 0;
        for (var i in this.allowedAssets) {
            this[this.allowedAssets[i]] = {};
        }
    },

    addAsset: function(type, callback) {
        if (this.allowedAssets.indexOf(type) != -1) {
            //we're creating a valid mesh
            this["_add"+__upperCaseFirstLetter__(type)](callback);
        }
    },

    _addAudio: function() {

    },

    _addVideo: function() {

    },

    _addImages: function(callback) {
        this._remote = require("remote");
        this._dialog = this._remote.require("dialog");
        this._dialog.showOpenDialog({properties: ['openFile']}, app.util.bind(function (pathList) {
            if (pathList[0]) {
                var path = pathList[0];
                var value = path.slice(path.indexOf('asset'), path.length);
                var key = value.slice(value.lastIndexOf('/') + 1, value.indexOf('.'));
                app.assets['images'][key] = value;

                callback(value);
            }
            //callback();
        }, this));
    }
})
