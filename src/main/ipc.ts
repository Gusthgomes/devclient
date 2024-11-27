import { ipcMain } from 'electron'

ipcMain.handle('fetch-users', () => {
  console.log('Searching for users...')

  return [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Gusth' },
    { id: 3, name: 'Alice' }
  ]
})