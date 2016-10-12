Class("Player", {
    Player: function() {
        //scene parameters
        this.camera = undefined;
        this.renderer = undefined;
        this.scene = undefined;
        this.controls = undefined;
        this.container = document.getElementById( 'scenecontainer' );
        this.iframe = document.createElement("iframe");
        this.iframe.height = this.container.clientHeight;
        this.iframe.width = this.container.clientWidth;
        this.iframe.className = "scenePlayer";
        //storing animation id
        this.animId = undefined;
        //object loader
        this.loader = new THREE.ObjectLoader();

        this.connect = require("connect");
        this.serveStatic = require("serve-static");
        this.http = require("http");
        this._app = undefined;
        this._server = undefined;
    },

    play: function() {
        app.storage.save();
        this.iframe.height = this.container.clientHeight;
        this.iframe.width = this.container.clientWidth;
        var dir = app.storage.workspace + "/" + app.storage.currentProject;
        this._app = this.connect().use(this.serveStatic(dir));
        this._server = this.http.createServer(this._app);
        try {
            this._server.listen(V.SERVER.PORT, function(error){
                console.log('Server running on 8080...');
                console.log(arguments);
                app.player.iframe.src = V.SERVER.ADDRESS + ':' + V.SERVER.PORT;
                app.player.container.appendChild(app.player.iframe);
            });
        } catch (e) {
            console.error(e);
            app.dialog.error(STRINGS.ERROR_CREATING_PLAYER.title, STRINGS.ERROR_CREATING_PLAYER.message, true, true);
        }
    },

    pause: function() {
        if (this._server) this._server.close();
        app.player.container.removeChild(app.player.iframe);
    }
});
