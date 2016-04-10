Class("SceneSelector", {
    SceneSelector: function() {
        this.modal = $('#sceneSelectorModal');
    },

    setListeners: function() {
        this.modal.on('show.bs.modal', function() {
            console.log("culo");
        });
    }
})
