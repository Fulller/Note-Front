function getLocalStorage(key, defaultValue = '') {
    let result = localStorage.getItem(key);
    if (result) {
        return JSON.parse(result);
    } else {
        return defaultValue;
    }
}
export default getLocalStorage;
