import {  contextBridge, ipcRenderer } from "electron";
import { LogMessage } from "electron-log";
contextBridge.exposeInMainWorld("api", {
  loadLogListFromPotmWindow: () => ipcRenderer.send("LOAD_LOG_LIST"),
  
  readyLogList: (callback: (event,value)=>void) =>  ipcRenderer.on('READY_LOG_LIST', callback),

  // log
  logger: (data: LogMessage) => ipcRenderer.send('__ELECTRON_LOG__',data),
});
