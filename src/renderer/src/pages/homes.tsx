import { Link } from 'react-router-dom'

export function Home() {
  async function handleAdd() {
    const response = await window.api.getAllCustomers()
    console.log(response)
  }

  async function handleCustomerById() {
    const docId = 'c6e66f02-4c58-4f29-b123-075f07174fbc'
    const response = await window.api.getCustomerById(docId)
    console.log(response)
  }

  async function handleDelete() {
    const docId = 'c6e66f02-4c58-4f29-b123-075f07174fbc'
    const response = await window.api.deleteCustomer(docId)
    console.log(response)
  }
  return (
    <div>
      <h1>Página principal</h1>

      <Link to="/create" className="bg-blue-600 rounded-md p-2 flex gap-3 w-52">
        Ir para a página create
      </Link>

      <br></br>

      <button onClick={handleAdd}>Buscar usuários</button>
      <br></br>

      <button onClick={handleCustomerById}>Buscar cliente</button>

      <br></br>

      <button onClick={handleDelete}>Delete cliente</button>
    </div>
  )
}
