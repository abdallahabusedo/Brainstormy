const tokenLocalStorageKey = 'accessToken';

export const getToken = () => localStorage.getItem(tokenLocalStorageKey);

export const setToken = (token) => localStorage.setItem(tokenLocalStorageKey, token);