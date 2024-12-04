import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowLeft, Trash } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

export function Detail() {
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  const queryClient = useQueryClient()
  // Buscar os clientes
  const { data, isFetching } = useQuery({
    queryKey: ['customer'],
    queryFn: async () => {
      const response = await window.api.getCustomerById(id!)

      return response
    }
  })

  const { isPending, mutateAsync: handleDeleteCustomer } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await window.api.deleteCustomer(id)
        console.log('Cliente deletado com sucesso', response)
      } catch (err) {
        console.log('Erro ao deletar cliente', err)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      navigate('/')
    }
  })
  return (
    <main className="flex-1 flex flex-col py-12 px-10 text-white">
      <Link to="/" className="flex items-center gap-2 mb-5">
        <ArrowLeft className="w-6 h-6 text-white" />
        <span>voltar</span>
      </Link>

      <h1 className="text-white text-xl lg:text-3xl font-semibold mb-4">Detalhes do cliente</h1>

      <section className="flex flex-col gap-6 w-full">
        {!isFetching && data && (
          <article className="w-full relative flex flex-col gap-1">
            <section className="bg-gray-800 rounded-md px-4 py-3">
              <p className="mb-2 font-semibold text-lg">Nome: {data.name}</p>

              <p className="mb-2">
                <span className="font-semibold">E-mail: </span>
                {data.email}
              </p>

              {data.phone && (
                <p className="mb-2">
                  <span className="font-semibold">Telefone: </span>
                  {data.phone}
                </p>
              )}

              {data.address && (
                <p className="mb-2">
                  <span className="font-semibold">Endereço: </span>
                  {data.address}
                </p>
              )}

              <div className="absolute top-2 right-2 z-20">
                <button
                  className="bg-red-500 hover:bg-red-600 rounded-full p-2 disabled:bg-gray-500"
                  onClick={() => handleDeleteCustomer(data._id)}
                  disabled={isPending}
                >
                  <Trash className="w-6 h-6 text-white" />
                </button>
              </div>
            </section>

            <section className="bg-gray-800 rounded-md px-4 py-3">
              <p className="mb-2">
                <span className="font-semibold">Cargo: </span>
                {data.role}
              </p>

              <p className="mb-2">
                <span className="font-semibold">Status atual: </span>
                {data.status ? 'Ativo' : 'Inativo'}
              </p>
            </section>
          </article>
        )}
      </section>
    </main>
  )
}
