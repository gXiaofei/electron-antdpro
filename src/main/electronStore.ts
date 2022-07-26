import type { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { app, ipcMain } from 'electron';
import Store from 'electron-store';
import type { themeType } from './darkMode';
import darkMode from './darkMode';
const store = new Store({
    name: 'settings',
    cwd: app.getAppPath(),
    watch: true,
});

export const get = (key?: string) => {
    if (key) {
        return store.get(key);
    }
    return store.store;
};

export const set = (key: string, value: string) => store.set(key, value);

export const has = (key: string) => store.has(key);

export const del = (key: string) => store.delete(key);

export const subscribe = (mainWindow: BrowserWindow) => {
    // 初始化主题色
    darkMode(get('darkMode') as themeType);
    mainWindow.webContents.send('nativeThemeChange', get('darkMode'));
    store.onDidChange('darkMode', (newValue, oldValue) => {
        console.log(oldValue);
        darkMode(newValue as themeType);
        mainWindow.webContents.send('nativeThemeChange', get('darkMode'));
    });

    const unsubscribeStore = store.onDidAnyChange((newValue, oldValue) => {
        console.log(123, newValue, oldValue);
        mainWindow.webContents.send('storeChange', [newValue, oldValue]);
    });

    return unsubscribeStore;
};

ipcMain.handle('setStore', (event: IpcMainInvokeEvent, args: [string, string]) => {
    set(args[0], args[1]);
});

ipcMain.handle('getStore', (event: IpcMainInvokeEvent, args?: [string]) => {
    if (args?.[0] === undefined || !args) {
        return get();
    }
    return get(args[0]);
});

ipcMain.handle('hasStore', (event: IpcMainInvokeEvent, args: [string]) => {
    return has(args[0]);
});

ipcMain.handle('delStore', (event: IpcMainInvokeEvent, args: [string]) => {
    return del(args[0]);
});
