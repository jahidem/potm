import { Student, User } from "@prisma/client";
import {  contextBridge, ipcRenderer } from "electron";
import os = require("os");
import channels from "./lib/constant";

contextBridge.exposeInMainWorld("api", {
  getMain: "kjkj",
  // getStudentList: (args) => ipcRenderer.invoke(channels.GET_STUDENT_LIST,args) ,
  addUser: (data: User) => ipcRenderer.invoke("channels.ADD_USER", data),
  addStudent: (data: Student): Promise<Student> => ipcRenderer.invoke("ADD_STUDENT",data),
  findAllStudent: () => ipcRenderer.invoke("FIND_ALL_STUDENT"),
  deleteStudent: (data: Student) => ipcRenderer.invoke("DELETE_STUDENT", data),
  printWebContent: () => ipcRenderer.invoke("PRINT_WEB_CONTENT"),
  closeWindow: () => {ipcRenderer.send("CLOSE_WINDOW")},
  minimizeWindow: () => {ipcRenderer.send("MINIMIZE_WINDOW")},
  maximizeWindow: () => {ipcRenderer.send("MAXIMIZE_WINDOW")}
});
