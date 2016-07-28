var STRINGS = {
    defaultProject: "BaseProject",
    defaultScene:   "BaseScene",

    NOT_EMPTY_FOLDER: {title: 'Folder not empty', message: 'Please, use a non empty folder'},
    NO_DIRECTORY: {title: 'Error!', message: 'Ooops, I can\'t find the folder you need :('},
    CHOOSE_WORKSPACE: {title: 'Workspace', message: 'Please, Choose a valid workspace'},
    CHOOSE_PROJECT: {title: 'Project', message: 'Please, Choose a valid name for your project'},
    CHOOSE_SCENE: {title: 'Scene', message: 'Please, Choose a valid name for your scene'},
    MISSING_SCENE_NAME: {title: 'Save scene', message: 'You should choose a name for your scene first.'},
    ERROR_NEW_PROJECT: {title: 'Error!', message:'Couldn\'t save your project'},
    ERROR_CREATING_PLAYER: {title: 'Error!', message:'Couldn\'t create server.'}
}

var V = {
    SERVER: {
        ADDRESS: 'http://localhost',
        PORT: 8080
    }
}

var JSONS = {
    game: {
        "name": "First Game",
        "author": "Marco Stagni",
        "description": "this is just a sample game",
        "firstScene": "BaseScene",
        "scenes": [
            {
                "name": "BaseScene"
            }
        ]
    },

    assets: {
    	Audio : {
    		//name : path
    		"rain" : "assets/audio/rain.mp3"
    	},

    	Video : {

    	},

    	Images : {

    	},

    	General : {
    		//whatever file you need to load
    	}
    }
}
