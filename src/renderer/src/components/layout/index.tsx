import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="flex-1 flex flex-col max-h-screen">
      <h1>LAYOUT</h1>
      <Outlet />
    </div>
  )
}
