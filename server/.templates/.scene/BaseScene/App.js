import { App } from 'mage-engine';

export default class FirstScene extends App {

    loadScene = () => Promise.resolve()

    progressAnimation(callback) {
        callback();
    }
    
    onCreate() {

    }
}
