import SceneHelper from './SceneHelper';

const getAssetStringTemplate = () => {
    // gettings assets from assets helper
    return `
        const assets = {
            Audio : {},
        
            Video : {},
        
            Images : {},
        
            Textures: {},
        
            Models : {},
        
            General : {}
        };
    `;
};

const getConfigTeamplate = () => {
    return `
        const config = {
    
            screen: {
                h : window ? window.innerHeight : 800,
                w : window ? window.innerWidth : 600,
                ratio : window ? (window.innerWidth/window.innerHeight) : (600/800),
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
                fov : 75,
                near : 0.1,
                far : 3000000
            }
        };
    `
};

const getImportsTemplate = () => {
    // first get scenee
    const scenes = SceneHelper.getAllScenes();
    // import each scene

    return `
        
    `;
};

const getRouterTemplate = () => {
    // same here, get scenes
    const scenes = SceneHelper.getAllScenes();
    return `
        window.addEventListener('load', function() {
            Router.start(config, assets, '#gameContainer');
        });
    `
}