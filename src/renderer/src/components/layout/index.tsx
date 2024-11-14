import { Outlet } from 'react-router-dom'
import { Header } from '../Header'

export function Layout() {
  return (
    <div className="flex-1 flex flex-col max-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}
