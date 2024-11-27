export function Create() {
  async function handleAddCustomer() {
    const doc = {
      name: 'Gustavo Gomes',
      email: 'Gusth@mail.com',
      phone: '999131556',
      address: 'Rua das flores, 123',
      role: 'developer',
      status: true
    }

    const response = await window.api.addCustomer(doc)
    console.log(response)
  }
  return (
    <div>
      <h1>Página create</h1>

      <button onClick={handleAddCustomer}>Cadastrar cliente</button>
    </div>
  )
}
