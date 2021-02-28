// Stores theme-related data to the browser's localStorage
export const setToLS = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
}
// Retrieves theme-telated data from the browser's localStorage
export const getFromLS = key => {
    const value = window.localStorage.getItem(key);
    if (value) return JSON.parse(value);
}