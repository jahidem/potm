import {  contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("api", {
  loadLogListFromPotmWindow: () => ipcRenderer.send("LOAD_LOG_LIST"),
  
  readyLogList: (callback: (event,value)=>void) =>  ipcRenderer.on('READY_LOG_LIST', callback)
});
