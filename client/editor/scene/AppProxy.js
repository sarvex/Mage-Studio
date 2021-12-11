const config = {
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
    },

    ui: {
        enabled: false
    },

    selector: '#gameContainer'
};

const assets = {
    models: {
        'lightHolder': '/models/lamp.gltf'
    },
    textures: {
        'cube_prototype_green': '/textures/cube_prototype_green.png',
        'cube_prototype_dark': '/textures/cube_prototype_dark.png',
        'cube_prototype_light': '/textures/cube_prototype_light.png',
        'cube_prototype_orange': '/textures/cube_prototype_orange.png',
        'cube_prototype_purple': '/textures/cube_prototype_purple.png',
    }
};

let app;

export async function getOrCreateApp() {

    if (window && !app) {
        return Promise.all([
            import('mage-engine'),
            import('./EditorScene/App')
        ]).then(([{ Router }, { EditorScene }]) => {
            Router.on('/', EditorScene);
            console.log('creating app');
            return Router
                .start(config, assets)
                .then((application) => {
                    app = application;
                    console.log(application);
                    return Promise.resolve(app);
                })
        });
    }

    // console.log('we have the app');

    return Promise.resolve(app);
}
