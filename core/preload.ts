import {  contextBridge, ipcRenderer } from "electron";
import Logger = require("electron-log");
import { ContestantFront } from "lib/useCaseContestant";
import os = require("os");
import { Contest } from "../src/common/types";
contextBridge.exposeInMainWorld("api", {
  printWebContent: () => ipcRenderer.invoke("PRINT_WEB_CONTENT"),
  //Window sizes
  closeWindow: () => {ipcRenderer.send("CLOSE_WINDOW")},
  minimizeWindow: () => {ipcRenderer.send("MINIMIZE_WINDOW")},
  maximizeWindow: () => {ipcRenderer.send("MAXIMIZE_WINDOW")},

  closePotm: () => {ipcRenderer.send("CLOSE_POTM_WINDOW")},

  //Constestant IPC
  deleteContestant: (data: ContestantFront): Promise<ContestantFront> => ipcRenderer.invoke("DELETE_CONTESTANT", data),
  findAllContestant: ():Promise<ContestantFront[]> => ipcRenderer.invoke("FIND_ALL_CONTESTANT"),
  saveAllContestant: (data: ContestantFront[]): Promise< ContestantFront[]> => ipcRenderer.invoke("SAVE_ALL_CONTESTANT", data),


  //Constest IPC
  deleteContest: (data: Contest): Promise<Contest> => ipcRenderer.invoke("DELETE_CONTEST", data),
  findAllContest: ():Promise<Contest[]> => ipcRenderer.invoke("FIND_ALL_CONTEST"),
  saveContestToDb: (data: Contest[]): Promise< Contest[]> => ipcRenderer.invoke("SAVE_ALL_CONTEST", data),
  

  //POTM Window

  openPotmWindow: ()=> ipcRenderer.send("OPEN_POTM_WINDOW"),
  openContentWindow: (data: string)=> ipcRenderer.send("OPEN_CONTENT_WINDOW", data),

  //listen for logWindow through main
  
  handleLogList: (callback: (event,value)=>void) =>  ipcRenderer.on('GET_LOG_LIST', callback),

  // log
  logger: (data: Logger.LogMessage) => ipcRenderer.send('__ELECTRON_LOG__',data),
});
