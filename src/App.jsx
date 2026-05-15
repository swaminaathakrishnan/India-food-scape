import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MapView from './components/Map'
import AdminPanel from './components/AdminPanel'
import Login from './components/Login'

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
