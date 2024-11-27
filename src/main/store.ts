import { app, ipcMain } from 'electron'
import PouchDb from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'

import { Customer, NewCustomer } from '../shared/types/ipc'

// Caminho base para o banco de dados com base no OS
let dbPath

if (process.platform === 'darwin') {
  // caminho MacOS
  dbPath = path.join(app.getPath('appData'), 'devclient', 'my_db')
} else if (process.platform === 'linux') {
  // caminho Linux
  dbPath = path.join(app.getPath('home'), '.devclient', 'my_db')
} else {
  // caminho Windows
  dbPath = path.join(app.getPath('userData'), 'my_db')
}

// Cria o diretório se não existir
const dbDir = path.dirname(dbPath)

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// Inicializar o banco de dados
const db = new PouchDb<Customer>(dbPath)
