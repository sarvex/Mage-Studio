Class("ScriptEditor", {

	MAX_NUM_TABS : 5,
	FILE_EXTENSIONS : ["js", "coffee"],
	MIN_HEIGHT : 600,
	MIN_WIDTH : 800,
	HEIGHT : 600,
	WIDTH : 800,
	LINT_CONFIG : {
		undef : false,
		unused : false
	},
	LINT_GLOBALS : "/*global alert $ window document console setInterval setTimeout require*/\n",

	ScriptEditor : function(container) {
		this.container = container;
		// adding monokai class to container
		$(container).addClass("monokai");

		this.availableThemes = ["monokai"];

		this.currentTheme = "monokai";
		this.currentTab = 0;
		this.numTab = 1;
		this.activeTabs = 1;
		this.editors = [];

		//creating helper
		this.helper = new ScriptHelper();

		//flag
		this.isNew = true;

		//setting listeners for open and close editor
		app.interface.events.scriptEditorOpened.add(function() {
			if (app.scriptEditor.isNew) {
				app.scriptEditor.init(),
				app.scriptEditor.isNew = false;
			}
			$(app.scriptEditor.container).fadeIn(200);
		});

		app.interface.events.scriptEditorClosed.add(function() {
			$(app.scriptEditor.container).fadeOut(200);
		});
	},


	init: function() {
		//creating layout
		this.layout = new ScriptLayout();
		this.layout.set();
		//creating editor
		this.createEditor(this.currentTab, "main.js", "javascript");
		//setting up lint worker
		this.setUpLintWorker();
		//reading scaffolds/wage/app/main.js content
		console.log("before require");
		var req = window.require || false;
		if (window.require !== undefined) {
			console.log("about to call require");
			var fs =  require("fs");
			fs.readFile("scaffolds/wage/app/main.js", {encoding: "utf8"}, function(err, data) {
				app.scriptEditor.editors[0].codeMirror.setValue(data);
			});
		} else {
			console.log("require not found");
		}
	},

	setListeners: function() {
		//Setting listener for resize event
		document.addEventListener("resize", app.scriptEditor.onResize, false);
		this.setTabListener();
	},

	setTabListener: function() {
		//setting tab listeners
		$('.tab').unbind("click");
		$(".tab").on("click", function() {
			var id = $(this).attr("id");
			var tab = parseInt(id.substr(4, id.length));
			app.scriptEditor.selectTab(tab);
		});

		$('.tab .close').unbind("click");
		$(".tab .close").on("click", function() {
			var id = $(this).parent().attr("id");
			var tab = parseInt(id.substr(4, id.length));
			app.scriptEditor.removeTab(tab);
		});
	},

	//on resize event
	onResize : function() {
		app.scriptEditor.layout.setSizes();
	},

	setUpLintWorker : function() {
		this.worker = new Worker("app/App.ScriptEditor.Worker.js");
		this.worker.addEventListener("message", function(e){
			var data = JSON.parse(e.data.result);
			//console.log(data);
			for (var k in data.errors) {
				var error = data.errors[k];
				//console.log(error.line-2);
				app.scriptEditor.editors[e.data.toCheck].codeMirror.addLineClass(error.line-2, "background", "errorLine");
				app.scriptEditor.editors[e.data.toCheck].saveError({
					line : error.line-2,
					reason : error.reason,
					index : k
				});
				$($('.errorLine')[k]).attr("title",error.reason);
				var t = new jBox('Tooltip', {
					theme : "TooltipDark",
					closeOnMouseLeave : true
				});
				t.attach($($('.errorLine')[k]));
				app.scriptEditor.editors[e.data.toCheck].saveTooltip(t);
			}
		});
	},

	lint : function(){
		for (var i=0; i< app.scriptEditor.numTab; i++) {
			if (app.scriptEditor.editors[i].type == "javascript") {
				app.scriptEditor.editors[i].removeAllErrors();
				app.scriptEditor.editors[i].removeAllJBoxes();
				app.scriptEditor.editors[i].saveText();
				var text = app.scriptEditor.editors[i].text.join("\n");
				text = app.scriptEditor.LINT_GLOBALS + text;
				this.worker.postMessage({
					task : "lint",
					code : text,
					config : app.scriptEditor.LINT_CONFIG,
					toCheck : i
				});
		 	} 
			
		}
		
	},

	_eval : function() {
		app.scriptEditor.lint();
		/*
		for (var i=0; i< app.numTab; i++) {
			switch (app.editors[i].type) {
				case "javascript" : {
					app.editors[i].saveText();
					eval(app.editors[i]._textToString());
				}
				case "coffeescript" : {
					app.editors[i].saveText();
					eval(app.editors[i].compiled);
				}
 			} 
		}*/
	},

	addNewTab : function() {
		var previous = this.currentTab;
		if ((this.activeTabs+1) > this.MAX_NUM_TABS) return;
		
		this.numTab ++;
		this.activeTabs ++;
		//selecting new tab
		var filename = prompt("Please insert script's name.");

		if (!(typeof filename == "string"))  {
			console.log("Please use a valid filename.");
			return;
		}
		if (app.scriptEditor.FILE_EXTENSIONS.indexOf(filename.split(".")[1]) == -1) {
			//trying to use a invalid file extension
			console.log("Please use a valid file extension.");
			return;
		}
		

		$('#add_tab').before(app.scriptEditor.helper.li("tab_"+(app.scriptEditor.numTab -1), "tab inactive", "<i class='fa fa-remove close'></i><span>"+filename+"</span>", {checkHtml : false}));
		$('#editor_'+app.scriptEditor.currentTab).after(app.scriptEditor.helper.div("editor_"+(app.scriptEditor.numTab-1), "editor invisible", "", {checkHtml : false}));
		this.setTabListener();
		var name = filename;
		var type = filename.split(".")[1] == "coffee" ? "coffeescript" : "javascript";
		this.createEditor((app.scriptEditor.numTab -1), name, type);
		this.selectTab((app.scriptEditor.numTab -1));
	},

	createEditor : function(tab, name, type) {
		this.editors[tab] = new ScriptTab("editor_"+tab, name, type);
	},

	selectTab : function(tab) {
		if (tab > this.MAX_NUM_TABS) return;
		for (var i=0; i<this.numTab; i++) {
			if (i != tab) {
				$("#editor_"+i).removeClass().addClass("editor invisible");
				$("#tab_"+i).removeClass().addClass("tab inactive");
			} else{
				$('#editor_'+i).removeClass().addClass("editor visible");
				$("#tab_"+i).removeClass().addClass("tab active");
			}
		}
		if (this.editors[tab].type == "coffeescript") {
			$("#coffee_compiler").removeClass().addClass("visible");
		} else {
			$("#coffee_compiler").removeClass().addClass("invisible");
		}
		this.currentTab = tab;
		//this.editors[tab].focus();
		$('#editor_'+tab).click();
	},

	removeTab : function(tab) {
		if (tab == 0) {
			//can we remove the first tab??
		} else {
			if (tab > this.MAX_NUM_TABS) return;

			if (this.editors[tab].type == "coffeescript") {
				$("#coffee_compiler").removeClass().addClass("invisible");
			}

			$('#editor_'+tab).remove();
			$('#tab_'+tab).remove();
			this.activeTabs -= 1; 
			//this.editors[tab] = {};
			this.selectTab(tab-1);
		}
	}
});