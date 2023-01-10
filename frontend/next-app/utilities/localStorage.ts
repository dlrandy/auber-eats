export const setLocalStorageItem = (key:string, value:string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
};
export const getLocalStorageItem = (key:string):string|null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
};

const storageKey = 'theme-preference'

export const getColorPreference = () => {
  if (getLocalStorageItem(storageKey))
    return getLocalStorageItem(storageKey) ||'light';
  else
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
}
