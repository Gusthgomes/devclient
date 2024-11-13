import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div>
      <h1>Página principal</h1>

      <Link to="/create" className="bg-blue-600 rounded-md p-2 flex gap-3 w-52">
        Ir para a página create
      </Link>
    </div>
  )
}
