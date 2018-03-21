
const storage = weex.requireModule('storage');


export function getCache(key) {
    return new Promise(function (resolve) {
        try {
            storage.getItem(key, e => {
                if (e.result === 'success') {
                    resolve(e.data);
                } else {
                    resolve(null);
                }
            });
        } catch (e) {
            console.log(e);
            resolve(null);
        }
    });
}

export function removeCache(key) {
    storage.removeItem(key)
}

export function setCache(key,value) {
    return new Promise(function (resolve) {
        try {
            storage.setItem(key, value);
            resolve(true)
        } catch (e) {
            console.log(e);
            resolve(false);
        }
    });
}