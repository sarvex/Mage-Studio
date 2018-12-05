const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

let electronWindow;

module.exports = function(PORT) {
    return new Promise(function(resolve, reject) {
        if (!app && !BrowserWindow) {
            resolve();
        } else {
            console.log('> creating Electron');
            function createWindow() {
                const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

                console.log('> window size: ', width, height);

                electronWindow = new BrowserWindow({width, height})

                electronWindow.loadURL(`http://google.com`);

                console.log('> window size: ', width, height);

                electronWindow.on('closed', () => {
                    electronWindow = null;
                });
            }

            app.on('ready', createWindow);

            // Quit when all windows are closed.
            app.on('window-all-closed', () => {
                if (process.platform !== 'darwin') {
                    app.quit();
                }
            });

            app.on('activate', () => {
                if (electronWindow === null) {
                    createWindow();
                }
            });
        }
    });
};
