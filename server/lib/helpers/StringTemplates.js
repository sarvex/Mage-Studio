const SceneHelper = require('./SceneHelper');
const AssetsHelper = require('./AssetsHelper');

const parseAssets = (assets) => {
    return JSON.stringify(assets.reduce((acc, asset) => {
        const key = asset.name.split('.')[0];
        const path = asset.fullPath.split('assets')[1];
        acc[key] = 'assets'.concat(path);

        return acc;
    }, {}));
}

const buildAssetStringTemplate = () => {
    // gettings assets from assets helper
    return new Promise(resolve => {
        AssetsHelper
            .getAssets()
            .then((assets) => {
                console.log(assets);
                resolve(`const assets = {
                    Audio: ${parseAssets(assets.audio)},
                
                    Video: ${parseAssets(assets.video)},
                
                    Images: ${parseAssets(assets.images)},
                    
                    Scripts: ${parseAssets(assets.scripts)},
                
                    Textures: ${parseAssets(assets.textures)},
                
                    Models: ${parseAssets(assets.models)},
                
                    General: {}
                };`);
            })
    })
};

const buildConfigTemplate = () => {
    return Promise.resolve(`
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
    `);
};

const buildImportsTemplate = () => {
    const scenes = SceneHelper.getAllScenes();
    const baseImport = `import { Router } from 'mage-engine';\n`;
    const mapImports = scene => `import ${scene} from './${scene}/App';\n`;
    const imports = scenes
        .map(mapImports)
        .join('');

    return Promise.resolve(` ${baseImport.concat(imports)}`);
};

const buildRouterTemplate = () => {
    const scenes = SceneHelper.getAllScenes();
    const getScenePath = (scene, i) => i ? `/${scene}` : '/';
    const mapRouter = (scene, i) => `Router.on('${getScenePath(scene, i)}', ${scene}); \n`;

    const routerConfig = scenes
        .map(mapRouter)
        .join('');

    return Promise.resolve( ` window.addEventListener('load', function() {
        
        ${routerConfig}
        
        Router.start(config, assets, '#gameContainer');
    });`);
};

const buildInitScript = () => {
    return new Promise(resolve => {
        Promise.all([
            buildImportsTemplate(),
            buildAssetStringTemplate(),
            buildConfigTemplate(),
            buildRouterTemplate()
        ]).then(script => {
            resolve(script.join(''));
        })
    })
}

module.exports = {
    buildAssetStringTemplate: buildAssetStringTemplate,
    buildConfigTemplate: buildConfigTemplate,
    buildImportsTemplate: buildImportsTemplate,
    buildRouterTemplate: buildRouterTemplate,
    buildInitScript: buildInitScript
};