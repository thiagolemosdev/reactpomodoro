import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { Goals } from './pages/Goals'
import { Universe } from './pages/Universe'

export function Router() {
  return (
    <Routes>
      <Route path="" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/universe" element={<Universe />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
