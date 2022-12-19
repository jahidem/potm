import { Student, User } from "@prisma/client";
import {  contextBridge, ipcRenderer } from "electron";
import { ContestantFront } from "lib/useCaseContestant";
import os = require("os");
contextBridge.exposeInMainWorld("api", {
  printWebContent: () => ipcRenderer.invoke("PRINT_WEB_CONTENT"),
  //Window sizes
  closeWindow: () => {ipcRenderer.send("CLOSE_WINDOW")},
  minimizeWindow: () => {ipcRenderer.send("MINIMIZE_WINDOW")},
  maximizeWindow: () => {ipcRenderer.send("MAXIMIZE_WINDOW")},

  closePotm: () => {ipcRenderer.send("CLOSE_POTM_WINDOW")},

  //Constestant IPC
  deleteContestant: (data: ContestantFront) => ipcRenderer.invoke("DELETE_CONTESTANT", data),
  findAllContestant: ():Promise<ContestantFront[]> => ipcRenderer.invoke("FIND_ALL_CONTESTANT"),
  saveAllContestant: (data: ContestantFront[]): Promise< ContestantFront[]> => ipcRenderer.invoke("SAVE_ALL_CONTESTANT", data),

  //POTM Window

  openPotmWindow: ()=> ipcRenderer.send("OPEN_POTM_WINDOW"),
  openContentWindow: (data: string)=> ipcRenderer.send("OPEN_CONTENT_WINDOW", data)
});
