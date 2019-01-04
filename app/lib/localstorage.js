class Storage {
    constructor() {
        this.PRIVATE_KEY = 'mage_studio_internal_storage';
    }

    hasLocalStorage() {
        return window && !!window.localStorage;
    }

    get(key) {
        if (this.hasLocalStorage()) {
            const _key = `${this.PRIVATE_KEY}_${key}`;
            return localStorage.getItem(_key) || false;
        }
    }

    getJSON(key) {
        if (this.hasLocalStorage()) {
            const _key = `${this.PRIVATE_KEY}_${key}`;
            return JSON.parse(localStorage.getItem(_key));
        }
    }

    set(key, value) {
        if (this.hasLocalStorage()) {
            const _key = `${this.PRIVATE_KEY}_${key}`;
            localStorage.setItem(_key, value);
        }
    }

    delete(key) {
        if (this.hasLocalStorage()) {
            const _key = `${this.PRIVATE_KEY}_${key}`;
            localStorage.removeItem(_key);
        }
    }

    clear() {
        if (this.hasLocalStorage()) {
            localStorage.clear();
        }
    }
}

export default new Storage();
