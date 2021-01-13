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
    }
};

const assets = {
    models: {
        'ambientlightholder': 'public/models/lamp.glb',
        'lightholder': 'public/models/lamp.glb'
    }
};

let app;

export async function getOrCreateApp() {

    if (window && !app) {
        // const { Router } = await import('mage-engine');
        // const { EditorScene } = await import('./EditorScene/App');
        //
        // Router.on('/', EditorScene);
        //
        // app = await Router.start(config, {}, '#gameContainer');
        return Promise.all([
            import('mage-engine'),
            import('./EditorScene/App')
        ]).then(([{ Router }, { EditorScene }]) => {
            Router.on('/', EditorScene);
            console.log('creating app');
            return Router
                .start(config, assets, '#gameContainer')
                .then((application) => {
                    app = application;
                    console.log(application);
                    return Promise.resolve(app);
                })
        });
    }

    return Promise.resolve(app);
}
