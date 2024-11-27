import { app, ipcMain } from 'electron'
import PouchDb from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'
import { randomUUID } from 'node:crypto'

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

// função para adicionar um novo cliente
async function addCustomer(doc: NewCustomer): Promise<PouchDB.Core.Response | void> {
  const id = randomUUID()

  const data: Customer = {
    ...doc,
    _id: id
  }

  return db
    .put(data)
    .then((response) => response)
    .catch((error) => console.error('Erro ao cadastrar um novo cliente', error))
}

// Eventos IPC
ipcMain.handle('add-customer', async (event, doc: Customer) => {
  const result = await addCustomer(doc)
  return result
})
