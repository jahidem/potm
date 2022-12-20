import { BrowserWindow } from "electron";
import path = require("path");

export default class HomeWindow {
  static thisWindow: Electron.BrowserWindow | null;
  static potmWindow: Electron.BrowserWindow | null;
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
      backgroundColor: 'white',
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        devTools: true
      },
    });
    if (HomeWindow.thisWindow != null) {
      // HomeWindow.thisWindow.loadURL("file://" + __dirname + "/index.html#/home");
      HomeWindow.thisWindow.loadURL("http://localhost:3000/#/home");
      HomeWindow.thisWindow.on("closed", HomeWindow.onClose);
    }
  }
  private static closePotmWindow() {
    HomeWindow.potmWindow = null;
  }
  public static contentWindow(url: string){
    const win = new BrowserWindow({
      width: 1200,
      height: 750,
      minWidth: 1100,
      minHeight: 720,
      frame: true,
      backgroundColor: 'white',
      autoHideMenuBar: true,
      show: false ,
      parent: HomeWindow.thisWindow, 
      webPreferences: {
        devTools: false
      }})
    win.loadURL(url);
    win.once('ready-to-show', () => {
      win.show()
    })
  }
  public static createPotmWindow() {
    HomeWindow.potmWindow = new BrowserWindow({
      width: 1200,
      height: 750,
      minWidth: 1100,
      minHeight: 720,
      // show: false,
      frame: true,
      title: "POTM",
      backgroundColor: 'white',
      modal: true,
      autoHideMenuBar: true,
      parent: HomeWindow.thisWindow, // Make sure to add parent window here

      // Make sure to add webPreferences with below configuration
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        devTools: true
      },
    });

    if (HomeWindow.potmWindow != null) {
    // HomeWindow.potmWindow.loadURL("file://" + __dirname + "/index.html#/potm");
    HomeWindow.potmWindow.loadURL("http://localhost:3000/#/potm");
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
