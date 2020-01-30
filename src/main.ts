import {join} from 'path';
import {app, BrowserWindow, ipcMain} from 'electron';
import {configDao} from './dao/config-dao';
let mainWindow: Electron.BrowserWindow;

// In main process.
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg); // prints "ping"
  event.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg); // prints "ping"
  event.returnValue = 'pong';
});

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: [
    // 'https://*.github.com/*',
    // '*://electron.github.io',
    '*/employee/login*',
  ],
};

// session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
//   details.requestHeaders['User-Agent'] = 'MyAgent'
//   callback({ requestHeaders: details.requestHeaders })
// })

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // fullscreen: true,
    height: 600,
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      preload: join(__dirname, './preload.js'),
      nodeIntegration: true,
      // webSecurity: false
    },
    // width: 800,
  });

  //TODO 过滤器怎么不起作用呢 ?
  // session.defaultSession.webRequest.onResponseStarted(filter,(details:OnResponseStartedDetails) => {
  //
  //   if(details.url.includes("employee/login") && details.method==='POST'){
  //     console.log('返回值为: ',details);
  //     setTimeout(()=>{
  //       mainWindow.loadURL('http://localhost:3002/pages/moon/list');
  //     },1000);
  //   }
  // })

  //@ts-ignore
  // mainWindow.webContents.session.setPreloads(join(__dirname,'./preload.js'));

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://127.0.0.1:8787/');
  } else {
    let uri = configDao.data.uri;
    if (!uri) {
      mainWindow.loadFile(join(__dirname, '../static-web/index.html'));
    } else if (uri.startsWith('http')) {
      mainWindow.loadURL(uri);
    } else {
      mainWindow.loadFile(join(__dirname, '../static-web/index.html'));
    }
  }
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    process.exit(0);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
