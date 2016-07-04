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
        app.scriptEditor.sidebar.setListeners();
        app.scriptEditor.sidebar.setSidebar();
    },

    setListeners: function() {
        $('ul#project li').unbind().click(function() {
            //clicked a subfolder
            var path = $(this).data("path");
            if ($(this).hasClass("directory")) {
                if (!$(this).find('.subfolder').hasClass('hidden')) {
                    // subfolder è gia presente
                    $(this).find('.subfolder').addClass('hidden');
                    $(this).find('.subfolder').empty();
                } else {
                    // subfolder non presente
                    app.scriptEditor.sidebar.expandSubDirectory($(this), path);
                    $(this).find('.subfolder').removeClass('hidden');
                }
            } else if ($(this).hasClass("file")) {
                app.scriptEditor.sidebar.openFile($(this).text(), path)
            }
        });
    },

    setSidebar: function() {
        $(app.scriptEditor.sidebar.rootFolder).text(' '+
            app.storage.currentScene +
            '/app/');
        // retrieve scene script folder content
        $(app.scriptEditor.sidebar.projectList).html('');
        app.scriptEditor.sidebar._createFileTree(app.storage.getScriptsDir(), $(app.scriptEditor.sidebar.projectList));
    },

    _createFileTree: function(path, container) {
        var content = app.filehelper.listContent(path);
        for (var i=0; i<content.length; i++) {
            var el = content[i];
            var li = document.createElement('li');
            $(li).addClass(el.type);
            $(li).data('path', el.path + "/" + el.name);
            if (el.type == 'directory') {
                $(li).append('<i class="fa fa-folder-o"> ' + el.name + '</i>')
                $(li).append('<ul class="subfolder hidden"></ul>');
            } else {
                $(li).addClass('js');
                $(li).append('<i class="fa fa-file-code-o"> ' + el.name + '</i>')
            }
            console.log(li);
            container.append(li);
        }
        app.scriptEditor.sidebar.setListeners();
    },

    openFile: function(name, path) {
        app.scriptEditor.openFile(name, path);
    },

    expandSubDirectory: function(element, path) {
        var container = element.find('.subfolder');
        app.scriptEditor.sidebar._createFileTree(path, container);
    },

    newFolder: function() {

    },

    newScript: function() {
        //if we clicked a subfolder
        //if we are in root
    }
});
