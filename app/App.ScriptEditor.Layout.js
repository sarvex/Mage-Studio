Class("ScriptLayout", {
	
	// class init
	ScriptLayout : function(containerid) {
		//this.fullscreenToggle = $('#fullscreenToggle');
		//this.consoleToggle = $('#consoleToggle');
		//showing the script container
        //app.interface.show(app.scriptEditor.container);
        //$.ajax("views/scriptEditor.html").done(function(data) {
        //    $(app.scriptEditor.container).append(data);
        //});
	},

	set : function() {
		this.setSizes();
		this.setListeners();
	},

	setListeners : function() {
		//setting click listener on toggleFullScreen.
		//this.fullscreenToggle.on('click', app.scriptEditor.layout.onClickFullscreen);
		//this.canvasToggle.on("click", function() {app.scriptEditor.layout.toggleFrames("canvas");});
		//this.consoleToggle.on("click", function() {app.scriptEditor.layout.toggleFrames("console");});
		$('#closeEditor').on('click', function() {
			app.closeEditor();
		});
		//new tab button
		$('#add_tab').on("click", function() {
			app.scriptEditor.addNewTab();
		});
		//coffee compiler button
		$('#coffee_compiler').on("click", function() {
			if (app.scriptEditor.editors[app.scriptEditor.currentTab].type == "coffeescript") {
				app.scriptEditor.editors[app.scriptEditor.currentTab].compile();
			}
		});
	},

	//FULLSCREEN HANDLING
	_launchFullScreen : function(element) {
		if(element.requestFullScreen) { element.requestFullScreen(); }
		else if(element.mozRequestFullScreen) { element.mozRequestFullScreen(); }
		else if(element.webkitRequestFullScreen) { element.webkitRequestFullScreen(); }
	},

	_cancelFullScreen : function() {
		if(document.cancelFullScreen) { document.cancelFullScreen(); }
		else if(document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
		else if(document.webkitCancelFullScreen) { document.webkitCancelFullScreen(); }
	},

	_isFullScreen : function() {
		return document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitIsFullScreen ? true : false;
		//fullScreen = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled ? true : false;
		//if(this.debug) console.log('Fullscreen enabled? ' + fullScreen);
		//return fullScreen;
	},

	// callbacks
	onClickFullscreen : function(e) {
		//e.stopPropagation();
		if(app.scriptEditor.layout._isFullScreen()) {
			app.scriptEditor.layout.fullscreenToggle.removeClass("active");
			app.scriptEditor.layout._cancelFullScreen();
		}
		else {
			app.scriptEditor.layout.fullscreenToggle.addClass("active");
			app.scriptEditor.layout._launchFullScreen(document.documentElement);
		}
		app.scriptEditor.layout.setSizes();
	},

	//SET SIZE METHOD
	setSizes : function() {
		var height = ($(document).height() - 150) + "px";
		//$('#main_container').css("height", height);
		//$('#coffee_compiler').css("top", ($('#main_container').height() + 30) + "px");
	},

	//METHOD TO FLASH MESSAGES
	flash : function(message, type) {
		switch(type) {
			case "log" : {
				document.getElementById("messages").appendChild(app.scriptEditor.helper.li("", "log", message, {checkHtml : false}));
				break;
			}
			case "warn" : {
				document.getElementById("messages").appendChild(app.scriptEditor.helper.li("", "warn", message, {checkHtml : false}));
				break;
			}
			case "err" : {
				document.getElementById("messages").appendChild(app.scriptEditor.helper.li("", "err", message, {checkHtml : false}));
				break;
			}
			case "info" : {
				document.getElementById("messages").appendChild(app.scriptEditor.helper.li("", "info", message, {checkHtml : false}));
				break;
			}
			default : break;
		}
	}
});