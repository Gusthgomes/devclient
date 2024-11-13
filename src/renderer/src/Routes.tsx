import { Router, Route } from 'electron-router-dom'

import { About } from './pages/about'
import { Create } from './pages/create'
import { Detail } from './pages/detail'
import { Home } from './pages/homes'

import { Layout } from './components/layout'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail" element={<Detail />} />
        </Route>
      }
    />
  )
}
