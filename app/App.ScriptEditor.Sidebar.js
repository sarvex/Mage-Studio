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

        this.projectContainer = '#projectContainer';
        this.projectList = this.projectContainer + ' #project';
        this.rootFolder = this.projectContainer + ' #rootFolder';
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

        app.scriptEditor.sidebar.setSidebar();
    },

    setSidebar: function() {
        $(app.scriptEditor.sidebar.rootFolder).text(' '+
            app.storage.currentScene +
            '/app/');
        // retrieve scene script folder content
        var content = app.filehelper.listContent(app.storage.getScriptsDir());
        for (var i=0; i<content.length; i++) {
            var el = content[i];
            var li = document.createElement('li');
            $(li).addClass(el.type);
            if (el.type == 'directory') {
                $(li).append('<i class="fa fa-folder-o"> ' + el.name + '</i>')
                $(li).append('<ul class="subfolder"></ul>');
            } else {
                $(li).addClass('js');
                $(li).append('<i class="fa fa-file-code-o"> ' + el.name + '</i>')
            }
            $(app.scriptEditor.sidebar.projectList).append(li);
        }
    },

    newFolder: function() {

    },

    newScript: function() {
        //if we clicked a subfolder
        //if we are in root
    }
});
