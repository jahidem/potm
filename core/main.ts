import { app, BrowserWindow, ipcMain } from "electron";
// import Main from "./mainWindow";
import channels from "./lib/constant";
import {
  addStudent,
  addUser,
  deleteStudent,
  findAllStudent,
} from "./lib/useCases";
import prisma from "./lib/db";
import fs = require("fs");
import path = require("path");
import os = require("os");
import PDFWindow = require("electron-pdf-window");
import * as dotenv from "dotenv";
import HomeWindow from "./homeWindow";

// /*Wiring up for DB */
// const dbPath = path.join(app.getPath("userData"), "sqlite.db")

dotenv.config(); // Load the environment variables
process.env.DATABASE_URL = "file:./sqlite.db"; //"file:"+dbPath
// console.log(`The connection URL is ${process.env.DATABASE_URL}`)

HomeWindow.main(app, BrowserWindow);

/*  All IPC */

ipcMain.handle(channels.GET_STUDENT_LIST, async (event) => {
  return "foo";
});

ipcMain.handle("channels.ADD_USER", (event, args) => {
  addUser(args)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
});

ipcMain.handle("ADD_STUDENT", (event, args) => {
  addStudent(args)
    .then(async () => {
      await prisma.$disconnect;
      return args;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return args;
    });
});

ipcMain.handle("FIND_ALL_STUDENT", (event, args) => {
  return findAllStudent();
});

ipcMain.handle("DELETE_STUDENT", (event, args) => {
  deleteStudent(args);
});

ipcMain.handle("PRINT_WEB_CONTENT", (event) => {
  const pdfPath = path.join(os.homedir(), "Desktop", "temp.pdf");
  const win = BrowserWindow.fromWebContents(event.sender);
  win.webContents
    .printToPDF({})
    .then((data) => {
      fs.writeFile(pdfPath, data, (error) => {
        if (error) throw error;
        console.log(`Wrote PDF successfully to ${pdfPath}`);
        const win = new PDFWindow({
          width: 800,
          height: 600,
        });

        win.loadURL(pdfPath);
      });
    })
    .catch((error) => {
      console.log(`Failed to write PDF to ${pdfPath}: `, error);
    });
});

//Window controll

ipcMain.on("CLOSE_WINDOW", () => {
  HomeWindow.thisWindow.close();
});

ipcMain.on("MINIMIZE_WINDOW", () => {
  HomeWindow.thisWindow.minimize();
});

ipcMain.on("MAXIMIZE_WINDOW", () => {
  if (!HomeWindow.thisWindow.fullScreen){
    
    HomeWindow.thisWindow.maximize();}
});
