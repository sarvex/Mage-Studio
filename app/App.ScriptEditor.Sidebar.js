Class("ScriptSidebar", {
    ScriptSidebar: function() {
        //storing files
        this.files = []
        //storing folders
        this.folders = [];
        //storing subfolders
        this.subfolders = [];
        //holding current path
        this.currentPath = "";
        this.lastClicked = undefined;
    },

    init: function() {
        //Setting listener for new folder button
        $('#newFolder').click(app.scriptEditor.sidebar.newFolder);
        //setting listener for new script button
        $('#newScript').click(app.scriptEditor.sidebar.newScript);
        //setting listener for li elements clicks
        $('ul#project li').click(function() {
            //clicked a subfolder
            if ($(this).hasClass("folder")) {
                //storing last clicked
                app.scriptEditor.sidebar.lastClicked = $(this);
                //storing current path
                app.scriptEditor.sidebar.currentPath = $(this).data("path");
            }
            //clicked a file
            else if ($(this).hasClass("file")) {
                //we should open a new tab with this file
            }
        });
        //click on root folder
        $('#rootFolder').click(function() {
            //storing last clicked
            app.scriptEditor.sidebar.lastClicked = $(this);
            //storing current path
            app.scriptEditor.sidebar.currentPath = $(this).data("path");
        });
    },

    newFolder: function() {

    },

    newScript: function() {
        //if we clicked a subfolder
        //if we are in root
    }
});

