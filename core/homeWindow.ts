import { BrowserWindow } from "electron";
import path = require("path");

export default class HomeWindow {
  static thisWindow: Electron.BrowserWindow | null;
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
      height: 680,
      minWidth: 940,
      minHeight: 540, 
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });
    if (HomeWindow.thisWindow != null) {
      // HomeWindow.thisWindow.loadURL("file://" + __dirname + "/index.html#/home");
      HomeWindow.thisWindow.loadURL("http://localhost:3000/#/home");
      HomeWindow.thisWindow.on("closed", HomeWindow.onClose);
    }
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for
    HomeWindow.BrowserWindow = browserWindow;
    HomeWindow.application = app;
    HomeWindow.application.on("window-all-closed", HomeWindow.onWindowAllClosed);
    HomeWindow.application.on("ready", HomeWindow.onReady);
  }
}


// -webkit-app-region: drag;
// -webkit-user-select: none; 