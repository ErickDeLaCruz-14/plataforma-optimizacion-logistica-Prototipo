import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import EmpresaPanel from './pages/EmpresaPanel.jsx'
import Pendiente from './pages/Pendiente.jsx'
import AppLayout from './components/AppLayout.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/iniciar-sesion" element={<Login />} />
      <Route path="/registro" element={<Pendiente titulo="Registro" pantalla="02 · Registro" />} />
      <Route path="/recuperar" element={<Pendiente titulo="Recuperar contraseña" pantalla="04 · Recuperar contraseña" />} />

      <Route path="/empresa" element={<AppLayout />}>
        <Route index element={<Navigate to="panel" replace />} />
        <Route path="panel" element={<EmpresaPanel />} />
        <Route path="nuevo-pedido" element={<Pendiente titulo="Nuevo pedido" pantalla="06 · Empresa · Nuevo pedido" enApp />} />
        <Route path="pedidos" element={<Pendiente titulo="Mis pedidos" pantalla="08 · Empresa · Mis pedidos" enApp />} />
        <Route path="pedidos/:id" element={<Pendiente titulo="Detalle del pedido" pantalla="09a · Empresa · Detalle · Resumen" enApp />} />
        <Route path="perfil" element={<Pendiente titulo="Perfil" pantalla="10 · Empresa · Perfil" enApp />} />
      </Route>

      <Route path="*" element={<Pendiente titulo="Página no encontrada" />} />
    </Routes>
  )
}
