Class("Header", {
    Header: function() {
        this.sceneTitle = $('#sceneTitle');
        this.projectTitle = $('#projectTitle');
    },

    set: function() {
        this.sceneTitle.text(app.storage.currentScene);
        this.projectTitle.text(app.storage.currentProject);
    }
})
