import { useQueryClient, useMutation } from '@tanstack/react-query'
import { FormEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface DataMutation {
  name: string
  email: string
  phone: string
  address: string
  role: string
}

export function Create() {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)
  const addressRef = useRef<HTMLInputElement | null>(null)
  const roleRef = useRef<HTMLInputElement | null>(null)

  const { isPending, mutateAsync: createCustomer } = useMutation({
    mutationFn: async (data: DataMutation) => {
      await window.api
        .addCustomer({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          role: data.role,
          status: true
        })
        .then((response) => {
          console.log('Cliente cadastrado com sucesso!')
          navigate('/')
        })
        .catch((error) => {
          console.log('Erro ao cadastrar cliente!', error)
        })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    }
  })

  async function handleAddCustomer(e: FormEvent) {
    e.preventDefault()

    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const phone = phoneRef.current?.value
    const address = addressRef.current?.value
    const role = roleRef.current?.value

    if (!name || !email || !phone || !address || !role) {
      return
    }

    await createCustomer({ name, email, phone, address, role })
  }
  return (
    <div className="flex-1 flex flex-col py-12 px-10 gap-8 overflow-y-auto">
      <section className="flex flex-1 flex-col items-center ">
        <h1 className="text-white text-xl lg:text-3xl font-semibold">Cadastrar novo cliente</h1>

        <form className="w-full max-w-96 mt-4" onSubmit={handleAddCustomer}>
          <div className="mb-2">
            <label className="text-lg py-2">Nome: </label>
            <input
              className="w-full h-9 rounded-md text-black px-2"
              placeholder="Gustavo Gomes"
              type="text"
              ref={nameRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-lg py-2">Endereço: </label>
            <input
              className="w-full h-9 rounded-md text-black px-2"
              placeholder="Avenida das flores, 123"
              type="text"
              ref={addressRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-lg py-2">E-mail: </label>
            <input
              className="w-full h-9 rounded-md text-black px-2"
              placeholder="gustavoG@mail.com"
              type="email"
              ref={emailRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-lg py-2">Cargo: </label>
            <input
              className="w-full h-9 rounded-md text-black px-2"
              placeholder="Desenvolvedor"
              type="text"
              ref={roleRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-lg py-2">Telefone: </label>
            <input
              className="w-full h-9 rounded-md text-black px-2 mb-4"
              placeholder="(99) 99999-9999"
              type="text"
              ref={phoneRef}
              maxLength={11}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 rounded-md flex items-center justify-center w-full h-9 my-3 disabled:bg-gray-500"
            disabled={isPending}
          >
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  )
}
