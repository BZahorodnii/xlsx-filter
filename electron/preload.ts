import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // API: ...,
  openDialog: (fileName: string) => {
    ipcRenderer.send('open-dialog', fileName) // adjust naming for your project
  },
  // Provide an easier way to listen to events
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
});