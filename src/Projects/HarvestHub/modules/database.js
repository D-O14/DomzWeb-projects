export function save(store, data) {
    try { localStorage.setItem(store, JSON.stringify(data)) }
    catch (e) {  throw new Error(`${e} Couldn't save. Please try again!`) };
};

export function read(store, placeholder = []) {
    try { return JSON.parse(localStorage.getItem(store)) || placeholder }
    catch (e) { throw new Error(`${ e } Couldn't read data. Make sure it exists!`) };
};