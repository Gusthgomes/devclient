import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function Home() {
  const queryClient = useQueryClient()
  // Buscar os clientes
  const { data, isFetching } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await window.api.getAllCustomers()
      return response
    }
  })

  return (
    <div className="flex-1 flex flex-col py-12 text-white">
      <div className="px-10">
        <h1 className="text-xl lg:text-3xl font-semibold text-white mb-4">Todos os clientes</h1>
      </div>

      <section className="flex flex-col gap-6 w-full h-screen overflow-y-auto px-10 pb-[200px]">
        {!isFetching && data?.length === 0 && (
          <p className="text-gray-300">Nenhum cliente cadastrado...</p>
        )}
        {data?.map((customer) => (
          <Link
            to={`/customer/${customer._id}`}
            key={customer._id}
            className="bg-gray-800 px-4 py-3 rounded-md"
          >
            <p className="font-semibold text-bold mb-2">Nome: {customer.name}</p>
            <p>
              <span className="font-semibold">E-mail: </span>
              {customer.email}
            </p>

            {customer.phone && (
              <p className="py-2">
                <span className="font-semibold">Telefone: </span>
                {customer.phone}
              </p>
            )}
          </Link>
        ))}
      </section>
    </div>
  )
}
