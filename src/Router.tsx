import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { History } from './pages/History'
import { Home } from './pages/Home'

export function Router() {
  return (
    <Routes>
      {/* definindo que vamos utilizar rotas  */}
      <Route path="" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        {/* definindo as rotas quer vamos utilizar e o que elas vão renderizar  */}
      </Route>
    </Routes>
  )
}
