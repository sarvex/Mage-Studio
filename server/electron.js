const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

let electronWindow;

const isElectronAvailable = function() {
    return app && BrowserWindow;
}

const start = function(PORT) {
    if (!isElectronAvailable()) {
        return;
    }

    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

    console.log('> window size: ', width, height);

    electronWindow = new BrowserWindow({width, height})
    electronWindow.loadURL(`http://localhost:${PORT}`);
    console.log('> window size: ', width, height);

    electronWindow.on('closed', () => {
        electronWindow = null;
    });
}

const setup = function() {
    return new Promise(function(resolve, reject) {
        if (!isElectronAvailable()) {
            resolve();
        } else {
            app.on('ready', resolve);
            // Quit when all windows are closed.
            app.on('window-all-closed', () => {
                if (process.platform !== 'darwin') {
                    app.quit();
                }
            });

            app.on('activate', () => {
                if (electronWindow === null) {
                    start();
                }
            });
        }
    });
}

module.exports = {
    setup: setup,
    start: start
};

// module.exports = function(PORT) {
//     return new Promise(function(resolve, reject) {
//         if (!app && !BrowserWindow) {
//             resolve();
//         } else {
//             console.log('> creating Electron');
//             function createWindow() {
//                 const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
//
//                 console.log('> window size: ', width, height);
//
//                 electronWindow = new BrowserWindow({width, height})
//
//                 electronWindow.loadURL(`http://google.com`);
//
//                 console.log('> window size: ', width, height);
//
//                 electronWindow.on('closed', () => {
//                     electronWindow = null;
//                 });
//             }
//
//             app.on('ready', resolve);
//
//             // Quit when all windows are closed.
//             app.on('window-all-closed', () => {
//                 if (process.platform !== 'darwin') {
//                     app.quit();
//                 }
//             });
//
//             app.on('activate', () => {
//                 if (electronWindow === null) {
//                     createWindow();
//                 }
//             });
//         }
//     });
// };
