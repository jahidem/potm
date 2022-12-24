import { BrowserWindow, Menu, IpcRenderer, ipcRenderer } from "electron";
import { printPdf } from "./lib/utils";
import path = require("path");

export default class HomeWindow {
  static thisWindow: Electron.BrowserWindow | null;
  static potmWindow: Electron.BrowserWindow | null;
  static logWindow: Electron.BrowserWindow | null;
  static application: Electron.App;
  static BrowserWindow;
  private static onWindowAllClosed() {
    if (process.platform !== "darwin") {
      HomeWindow.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object.
    HomeWindow.thisWindow = null;
  }

  private static onReady() {
    HomeWindow.thisWindow = new HomeWindow.BrowserWindow({
      width: 1200,
      height: 750,
      minWidth: 1100,
      minHeight: 720,
      frame: false,
      backgroundColor: "white",
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        devTools: false,
      },
    });
    if (HomeWindow.thisWindow != null) {
      HomeWindow.thisWindow.loadURL(
        'file://' + __dirname + '/../index.html#/home'
      );
      // HomeWindow.thisWindow.loadURL("http://localhost:3000/#/home");

      HomeWindow.thisWindow.on("closed", HomeWindow.onClose);
    }
  }
  private static closePotmWindow() {
    HomeWindow.potmWindow = null;
  }
  public static contentWindow(url: string) {
    const win = new BrowserWindow({
      width: 1200,
      height: 750,
      minWidth: 1100,
      minHeight: 720,
      frame: true,
      backgroundColor: "white",
      autoHideMenuBar: true,
      show: false,
      parent: HomeWindow.thisWindow,
      webPreferences: {
        devTools: false,
      },
    });
    win.loadURL(url);
    win.once("ready-to-show", () => {
      win.show();
    });
  }

  public static createLogWindow() {
    HomeWindow.logWindow = new BrowserWindow({
      width: 1200,
      height: 750,
      minWidth: 1100,
      minHeight: 720,

      autoHideMenuBar: true,
      frame: true,
      title: "Standings Log",
      backgroundColor: "white",
      modal: true,
      parent: HomeWindow.potmWindow,
      minimizable: false,
      webPreferences: {
        devTools: false,
        preload: path.join(__dirname, "preloadLog.js"),
      },
    });

    if (HomeWindow.logWindow != null) {
      HomeWindow.logWindow.loadURL('file://' + __dirname + '/../index.html#/log');
      // HomeWindow.logWindow.loadURL("http://localhost:3000/#/log");
    }
  }

  public static createPotmWindow() {
    HomeWindow.potmWindow = new BrowserWindow({
      width: 1200,
      height: 750,
      minWidth: 1100,
      minHeight: 720,
      frame: true,
      title: "POTM",
      backgroundColor: "white",
      modal: true,
      parent: HomeWindow.thisWindow,
      minimizable: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        devTools: false,
      },
    });

    if (HomeWindow.potmWindow != null) {
      const template = [
        {
          label: "File",
          submenu: [
            {
              label: "Print",
              click: () => {
                printPdf(HomeWindow.potmWindow.webContents);
              },
            },
            {
              label: "Logs",
              click: () => {
                HomeWindow.createLogWindow();
              },
            },
            {
              label: "Exit",
              click: () => {
                HomeWindow.potmWindow.close();
              },
            },
          ],
        },
      ];
      const menu = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menu);
      HomeWindow.potmWindow.loadURL('file://' + __dirname + '/../index.html#/potm');
      // HomeWindow.potmWindow.loadURL("http://localhost:3000/#/potm");
      // HomeWindow.potmWindow.on("closed", HomeWindow.closePotmWindow);
    }
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for
    HomeWindow.BrowserWindow = browserWindow;
    HomeWindow.application = app;
    HomeWindow.application.on(
      "window-all-closed",
      HomeWindow.onWindowAllClosed
    );
    HomeWindow.application.on("ready", HomeWindow.onReady);
  }
}
