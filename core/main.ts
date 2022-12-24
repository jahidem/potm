import {
  shell,
  app,
  BrowserWindow,
  ipcMain,
  IpcMainInvokeEvent,
  WebContents,
} from 'electron';
import prisma from './lib/db';
import path = require('path');
import os = require('os');
import PDFWindow = require('electron-pdf-window');
import * as dotenv from 'dotenv';
import HomeWindow from './homeWindow';
import { findAll, saveAll, deleteContestant } from './lib/useCaseContestant';
import {
  deleteContest,
  findAllContest,
  saveAllContest,
} from './lib/useCaseContest';
import { printPdf } from './lib/utils';

// /*Wiring up for DB */
// const dbPath = path.join(app.getPath("userData"), "sqlite.db")

dotenv.config(); // Load the environment variables
process.env.DATABASE_URL = 'file:./sqlite.db'; //"file:"+dbPath
// console.log(`The connection URL is ${process.env.DATABASE_URL}`)

HomeWindow.main(app, BrowserWindow);
ipcMain.handle('PRINT_WEB_CONTENT', (event) => printPdf(event.sender));

/*  All IPC */

// potm IPC

ipcMain.on('OPEN_POTM_WINDOW', (event) => {
  HomeWindow.createPotmWindow();
});

ipcMain.on('OPEN_CONTENT_WINDOW', (event, args) => {
  HomeWindow.contentWindow(args);
});

//Contestant IPC
ipcMain.handle('FIND_ALL_CONTESTANT', (event, args) => findAll());

ipcMain.handle('SAVE_ALL_CONTESTANT', (event, args) => {
  saveAll(args)
    .then(async () => {
      await prisma.$disconnect();
      return args;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return args;
    });
});

ipcMain.handle('DELETE_CONTESTANT', (event, args) => {
  return deleteContestant(args);
});

//Contest IPC
ipcMain.handle('SAVE_ALL_CONTEST', (event, args) => {
  saveAllContest(args)
    .then(async () => {
      await prisma.$disconnect();
      return args;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return args;
    });
});

ipcMain.handle('FIND_ALL_CONTEST', (event, args) => findAllContest());

ipcMain.handle('DELETE_CONTEST', (event, args) => {
  return deleteContest(args);
});

//Window control

ipcMain.on('CLOSE_WINDOW', (event) => {
  HomeWindow.thisWindow.close();
});

ipcMain.on('CLOSE_POTM_WINDOW', (event) => {
  HomeWindow.potmWindow.close();
});

ipcMain.on('MINIMIZE_WINDOW', () => {
  HomeWindow.thisWindow.minimize();
});

ipcMain.on('MAXIMIZE_WINDOW', () => {
  if (!HomeWindow.thisWindow.fullScreen) {
    HomeWindow.thisWindow.maximize();
  }
});

// handle IPC conmmunicate between  logWindow and potmWindow 

ipcMain.on('LOAD_LOG_LIST', () => {
  HomeWindow.potmWindow.webContents.send('GET_LOG_LIST');
});

ipcMain.on('SEND_LOG_LIST',(event , value)=>{
  HomeWindow.logWindow.webContents.send('READY_LOG_LIST', value)
})
