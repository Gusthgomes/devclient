import { Menu, Tray, nativeImage, BrowserWindow } from 'electron'
import path from 'node:path'

export function createTray(window: BrowserWindow) {
  const appIcon = path.join(__dirname, 'resources', 'menuTemplate.png')

  let icon = nativeImage.createFromPath(appIcon)

  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Dev client', enabled: false },
    { type: 'separator' },
    {
      label: 'Cadastrar cliente',
      click: () => {
        console.log('cadastrando um novo cliente')
      }
    },
    { label: 'Abrir', click: () => window.show() },
    { type: 'separator' },
    { label: 'Sair', role: 'quit' }
  ])

  tray.setToolTip('Dev clients')

  tray.setContextMenu(menu)
}
