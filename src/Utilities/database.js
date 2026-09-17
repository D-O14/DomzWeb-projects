/* IndexedDB */

export function getStore(db, storeName, mode) {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    return { transaction, store };
}

/* LocalStorage */

export function save(store, data) { localStorage.setItem(store, JSON.stringify(data)) };
export function read(store) { JSON.parse(localStorage.getItem(store)) || [] };