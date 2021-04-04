/*
 *  TODO: Refactor this file
 */

import {app, BrowserWindow} from 'electron'
import {join} from 'path'
// import {URL} from 'url'



const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {


  /**
   * Workaround for TypeScript bug
   * @see https://github.com/microsoft/TypeScript/issues/41468#issuecomment-727543400
   */
  const env = import.meta.env

  let mainWindow: BrowserWindow | null = null

  async function createWindow() {
    mainWindow = new BrowserWindow({
      show: true,
      webPreferences: {
        preload: join(__dirname, '../../preload/dist/index.cjs'),
        contextIsolation: env.MODE !== 'test',   // Spectron tests can't work with contextIsolation: true
        enableRemoteModule: env.MODE === 'test', // Spectron tests can't work with enableRemoteModule: false
      },
      frame: false,
    })

    await mainWindow.loadURL('https://wolframcloud.com/')
  }


  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })


  app.whenReady()
    .then(createWindow)
    .catch((e) => console.error('Failed create window:', e))


  // Auto-updates
  if (env.PROD) {
    app.whenReady()
      .then(() => import('electron-updater'))
      .then(({autoUpdater}) => autoUpdater.checkForUpdatesAndNotify())
      .catch((e) => console.error('Failed check updates:', e))
  }
}
