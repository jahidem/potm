import { Student, User } from "@prisma/client";
import {  contextBridge, ipcRenderer } from "electron";
import { ContestantFront } from "lib/useCaseContestant";
import os = require("os");
import channels from "./lib/constant";

contextBridge.exposeInMainWorld("api", {
  getMain: "kjkj",
  // getStudentList: (args) => ipcRenderer.invoke(channels.GET_STUDENT_LIST,args) ,
  addUser: (data: User) => ipcRenderer.invoke("channels.ADD_USER", data),
  addStudent: (data: Student): Promise<Student> => ipcRenderer.invoke("ADD_STUDENT",data),
  findAllStudent: () => ipcRenderer.invoke("FIND_ALL_STUDENT"),
  
  printWebContent: () => ipcRenderer.invoke("PRINT_WEB_CONTENT"),
  closeWindow: () => {ipcRenderer.send("CLOSE_WINDOW")},
  minimizeWindow: () => {ipcRenderer.send("MINIMIZE_WINDOW")},
  maximizeWindow: () => {ipcRenderer.send("MAXIMIZE_WINDOW")},

  //Constestant IPC
  deleteContestant: (data: ContestantFront) => ipcRenderer.invoke("DELETE_CONTESTANT", data),
  findAllContestant: ():Promise<ContestantFront[]> => ipcRenderer.invoke("FIND_ALL_CONTESTANT"),
  saveAllContestant: (data: ContestantFront[]): Promise< ContestantFront[]> => ipcRenderer.invoke("SAVE_ALL_CONTESTANT", data),
});
