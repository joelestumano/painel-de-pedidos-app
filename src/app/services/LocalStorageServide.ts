import { writeStorage, deleteFromStorage } from "@rehooks/local-storage";

const setStorage = (key: string, value: string): void => {
    writeStorage(key, value);
};

const getStorage = (key: string): any => {
    return localStorage.getItem(key);
};

const deleteStorage = (key: string): any => {
    deleteFromStorage(key);
};

export const LocalStorageService = {
    setStorage,
    getStorage,
    deleteStorage,
};
