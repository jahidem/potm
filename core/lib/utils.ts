import { BrowserWindow, WebContents, app, shell } from "electron";
import fs = require('fs');
import path = require("path");

const printPdf = (event: WebContents) => {
  const pdfPath = path.join(app.getPath('userData'), 'potm.pdf');
  const win = BrowserWindow.fromWebContents(event);
  win.webContents
    .printToPDF({
      margins: {
        bottom: 1,
        left: 1,
        right: 1,
        top: 1,
      },
      pageSize: 'A4',
      printBackground: true,
    })
    .then((data) => {
      fs.writeFile(pdfPath, data, (error) => {
        if (error) throw error;
        shell.openExternal('file://' + pdfPath);
      });
    })
    .catch((error) => {
      console.log(`Failed to write PDF to ${pdfPath}: `, error);
    });
};


export {printPdf}