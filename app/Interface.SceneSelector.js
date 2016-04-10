Class("SceneSelector", {
    SceneSelector: function() {
        this.modal = $('#sceneSelectorModal');
        this.list = document.querySelector("#sceneSelectorList");
    },

    setListeners: function() {
        this.modal.on('show.bs.modal', function() {
            var scenes = app.filehelper.listScenes();
            for (var i in scenes) {
                var block = app.interface.sceneSelector.createSceneBlock(scenes[i], 'scene-item');
                app.interface.sceneSelector.list.appendChild(block);
            }
            var block = app.interface.sceneSelector.createSceneBlock("+", 'scene-item');
            app.interface.sceneSelector.list.appendChild(block);
        });
    },

    createSceneBlock: function(name, className) {
        var li = document.createElement("li");
        li.innerText = name;
        li.className = className;
        return li;
    }
});
