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
        this.rootFolder = this.projectContainer + ' #rootFolder span';
    },

    init: function() {
        //Setting listener for new folder button
        $('#newFolder').click(app.scriptEditor.sidebar.newFolder);
        //setting listener for new script button
        $('#newScript').click(app.scriptEditor.sidebar.newScript);
        //setting listener for li elements clicks
        app.scriptEditor.sidebar.setSidebar();
        app.scriptEditor.sidebar.setListeners();
    },

    setListeners: function() {

        this.folderSelector = $('ul#project li.directory i.directoryName');
        this.fileSelector = $('ul#project li.file');
        this.contextMenu = $('#projectContainer .context-menu-container');

        app.scriptEditor.sidebar.folderSelector.unbind().click(function() {
            app.scriptEditor.sidebar._closeContextMenu();
            //clicked a subfolder
            var parent = $(this).parent(),
                path = parent.data("path");
            if (parent.hasClass("directory") && path) {
                if (!parent.find('.subfolder').hasClass('hidden')) {
                    // subfolder è gia presente
                    parent.find('.subfolder').addClass('hidden');
                    parent.find('.subfolder').empty();
                } else {
                    // subfolder non presente
                    app.scriptEditor.sidebar.expandSubDirectory(parent, path);
                    parent.find('.subfolder').removeClass('hidden');
                }
            }
        }).on('contextmenu', function(evt) {
            evt.preventDefault();
            app.scriptEditor.sidebar._showContextMenu(event, 'folder');
            return false;
        });

        app.scriptEditor.sidebar.fileSelector.unbind().click(function() {
            app.scriptEditor.sidebar._closeContextMenu();
            var path = $(this).data("path");

            if (path) {
                app.scriptEditor.sidebar.openFile($(this).text(), path)
            }
        }).on('contextmenu', function(evt) {
            evt.preventDefault();
            app.scriptEditor.sidebar._showContextMenu(event, 'file');
            return false;
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

    _closeContextMenu: function() {
        if (app.scriptEditor.sidebar.contextMenu.hasClass('visible')) {
            app.scriptEditor.sidebar.contextMenu.removeClass('visible')
        }
    },

    _showContextMenu: function(event, type) {
        var x = event.clientX,
            y = event.clientY;
        //var pos = app.filehelper._getMousePosition(event);

        app.scriptEditor.sidebar.contextMenu.css({
            'left': x + 'px',
            'top': y + 'px'
        }).addClass('visible');

        // primo click fuori dal context menu chiude il context menu

    },

    _createFileTree: function(path, container) {
        var content = app.filehelper.listContent(path);
        for (var i=0; i<content.length; i++) {
            var el = content[i];
            var li = document.createElement('li');
            $(li).addClass(el.type);
            $(li).data('path', el.path + "/" + el.name);
            if (el.type == 'directory') {
                $(li).append('<i class="fa fa-folder-o directoryName"><span class="name">' + el.name + '</span></i>')
                $(li).append('<ul class="subfolder hidden"></ul>');
            } else {
                $(li).addClass('js');
                $(li).append('<i class="fa fa-file-code-o"><span class="name">' + el.name + '</span></i>')
            }
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
