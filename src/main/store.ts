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

// Evento IPC para adicionar um novo cliente
ipcMain.handle('add-customer', async (event, doc: Customer) => {
  const result = await addCustomer(doc)
  return result
})

// função para buscar todos os clientes
async function getAllCustomers(): Promise<Customer[] | void> {
  try {
    const result = await db.allDocs({ include_docs: true })
    return result.rows.map((row) => row.doc as Customer)
  } catch (error) {
    console.error('Erro ao buscar todos os clientes', error)
    return []
  }
}

// Evento IPC para buscar todos os

ipcMain.handle('get-all-customers', async () => {
  return await getAllCustomers()
})

// Buscar cliente pelo ID
async function getCustomerById(docId: string) {
  return db
    .get(docId)
    .then((doc) => doc)
    .catch((err) => {
      console.error('Erro ao buscar cliente pelo ID', err)
      return null
    })
}

ipcMain.handle('get-customer-by-id', async (event, docId) => {
  const result = await getCustomerById(docId)
  return result
})

// Deletar um cliente
async function deleteCustomer(docId: string): Promise<PouchDB.Core.Response | null> {
  try {
    const doc = await db.get(docId)

    const result = await db.remove(doc._id, doc._rev)

    return result
  } catch (error) {
    console.error('Erro ao deletar cliente', error)
    return null
  }
}

ipcMain.handle(
  'delete-customer',
  async (event, docId: string): Promise<PouchDB.Core.Response | null> => {
    return await deleteCustomer(docId)
  }
)
