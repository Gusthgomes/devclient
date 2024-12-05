import { BrowserWindow, app, globalShortcut } from 'electron'

export function createShortCuts(window: BrowserWindow) {
  app.on('browser-window-focus', () => {
    globalShortcut.register('Space+R', () => {
      window.webContents.send('new-customer')
    })
  })

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
  })
}
