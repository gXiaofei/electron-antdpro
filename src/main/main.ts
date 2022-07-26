/* eslint global-require: off, no-console: off*/

import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import path from 'path';
import { HEIGHT, LOGIN_HEIGHT, LOGIN_WIDTH, MIN_HEIGHT, MIN_WIDTH, WIDTH } from './constants';
import { subscribe as subscribeStore } from './electronStore';
import MenuBuilder from './menu';
import showNotification from './showNotification';
import { resolveHtmlPath } from './util';

// 协议
if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient('process-assistant', process.execPath, [
            path.resolve(process.argv[1]),
        ]);
    } else {
        app.setAsDefaultProtocolClient('process-assistant');
    }
}

// 更新
// class AppUpdater {
//     constructor() {
//         log.transports.file.level = 'info';
//         autoUpdater.logger = log;
//         autoUpdater.checkForUpdatesAndNotify();
//     }
// }

console.log('userData', app.getAppPath());

let mainWindow: BrowserWindow | null = null;
let unsubscribeStore: any = null;

ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('login', (event, args) => {
    if (args[0] === true) {
        if (mainWindow) {
            if (mainWindow) {
                mainWindow.setResizable(false);
                mainWindow.setMinimumSize(LOGIN_WIDTH, LOGIN_HEIGHT);
                mainWindow.setSize(LOGIN_WIDTH, LOGIN_HEIGHT, true);
            }
        }
    } else {
        if (mainWindow) {
            mainWindow.setResizable(true);
            mainWindow.setMinimumSize(MIN_WIDTH, MIN_HEIGHT);
            mainWindow.setSize(WIDTH, HEIGHT, true);
        }
    }
});

// nodejs下babel编译es6后异常定位
if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
    require('electron-debug')();
}

// 添加chromium扩展
const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload,
        )
        .catch(console.log);
};

// 创建窗口
const createWindow = async () => {
    if (process.env.NODE_ENV === 'development') {
        await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, 'assets')
        : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
    };

    mainWindow = new BrowserWindow({
        show: false,
        width: 480,
        height: 580,
        icon: getAssetPath('icon.png'),
        center: true,
        resizable: false,
        title: '投行承做助手',
        // frame: false,
        // titleBarStyle: 'hidden',
        // titleBarOverlay: true,
        webPreferences: {
            preload: app.isPackaged
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, '../../dll/preload.js'),
        },
    });

    mainWindow.loadURL(resolveHtmlPath());

    mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
        }
    });

    unsubscribeStore = subscribeStore(mainWindow);

    mainWindow.on('closed', () => {
        console.log('closed');
        mainWindow = null;
        unsubscribeStore();
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // 打开用户浏览器中的URL
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
    });

    // 自动更新
    // eslint-disable-next-line
    // new AppUpdater();
};

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    /**
     * Add event listeners...
     */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // 用户正在尝试运行第二个实例，我们需要让焦点指向我们的窗口
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.on('window-all-closed', () => {
        // Respect the OSX convention of having the application in memory even
        // after all windows have been closed
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.whenReady()
        .then(() => {
            createWindow();
            app.on('activate', () => {
                // On macOS it's common to re-create a window in the app when the
                // dock icon is clicked and there are no other windows open.
                if (mainWindow === null) createWindow();
            });
        })
        .then(() => {
            showNotification({
                title: '启动应用',
                subtitle: '子标题',
                body: '首次应用启动',
            });
        })
        .catch(console.log);

    // macOS 处理网页打开的url
    app.on('open-url', (event, url) => {
        dialog.showErrorBox('欢迎回来', `导向自: ${url}`);
    });
}
