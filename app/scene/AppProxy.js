let app;

export async function getOrCreateApp() {

    if (window && !app) {
        const { Router } = await import('mage-engine');
        const appConfig = await import('./config');

        app = Router.start(appConfig.default, '#gameContainer');
    }

    return app;
}

export const doSomething = () => {
    if (app) {
        app.doSomething()
    }
}
