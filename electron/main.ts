import { app, dialog, BrowserWindow, ipcMain } from 'electron';
var fs = require('fs');

let win: BrowserWindow;

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: `${__dirname}/preload.js`,
    },
  });

  if (app.isPackaged) {
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    win.webContents.openDevTools();
  }

}

function registerListeners() {
  ipcMain.on('open-dialog', (event, fileName) => {
    var options = {
      title: "Save file",
      defaultPath : fileName,
      buttonLabel : "Save",
  
      filters :[
        {name: 'Sheets', extensions: ['xls', 'xlsx']},
      ]
    };
    dialog
      .showSaveDialog(win, options)
      .then(({ filePath }) => {
        console.log(fileName);
        fs.writeFileSync(filePath, "hello world", 'utf-8');
        if (filePath) {
          event.reply('on-file-select', filePath);
        }
      });
  });
}

app.whenReady().then(() => {

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
  .whenReady()
  .then(registerListeners);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});
