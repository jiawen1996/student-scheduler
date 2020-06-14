class LocalStorageManager {
    constructor(storage = window.localStorage) {
        this.storage = storage
    }

    get(key) {
        try {
            return JSON.parse(this.storage.getItem(key))
        } catch (e) {
            return undefined
        }
    }

    set(key, value) {
        const valueStr = JSON.stringify(value)
        this.storage.setItem(key, valueStr)
    }

    remove(key) {
        return this.storage.removeItem(key)
    }

    logins() {
        return this.get('logins')
    }

}

export default LocalStorageManager
