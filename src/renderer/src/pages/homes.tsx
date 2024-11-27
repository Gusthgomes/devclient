import { Link } from 'react-router-dom'

export function Home() {
  async function handleAdd() {
    const response = await window.api.getAllCustomers()
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
    </div>
  )
}
