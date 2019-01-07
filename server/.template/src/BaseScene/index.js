import FirstScene from './App';

const assets = {
	Audio: {},
	Video: {},
	Images: {},
	Textures: {},
	Models: {},
	General: {},
	Scripts: {}
};

const game = {
	screen: {
		frameRate : 60,
		alpha: true
	},

	lights: {
		shadows: true
	},

	physics: {
		enabled: false
	},

	tween: {
		enabled: false
	},

	camera : {
		//handling useful informations about our camera.
		fov : 75,
		near : 0.1,
		far : 3000000
	}
};

export {
    assets,
    game,
    FirstScene
};
