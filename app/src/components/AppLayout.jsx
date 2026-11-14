import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Logo } from './ui.jsx'
import { empresa } from '../data/demo.js'

const iconos = {
  panel: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
  nuevo: <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 0v18M4 7.5l8 4.5 8-4.5M16 17v4M14 19h4" />,
  pedidos: <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm-8 4.5 8 4.5 8-4.5M12 12v9" />,
  perfil: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0" />,
}

const menu = [
  { to: '/empresa/panel', texto: 'Panel', icono: 'panel' },
  { to: '/empresa/nuevo-pedido', texto: 'Nuevo pedido', icono: 'nuevo' },
  { to: '/empresa/pedidos', texto: 'Mis pedidos', icono: 'pedidos' },
  { to: '/empresa/perfil', texto: 'Perfil', icono: 'perfil' },
]

export default function AppLayout() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 flex h-screen w-62 shrink-0 flex-col bg-neutral-900 px-4 py-6">
        <div className="px-0">
          <Logo to="/empresa/panel" compacto />
        </div>
        <nav className="mt-7 flex flex-col gap-2" aria-label="Menú principal">
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              className={({ isActive }) =>
                `relative flex h-11 items-center gap-3 rounded-input px-3 text-[16px] font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-700 text-secondary-500 before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:rounded before:bg-secondary-500'
                    : 'text-neutral-200 hover:bg-neutral-700/60'
                }`
              }
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
                {iconos[m.icono]}
              </svg>
              {m.texto}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-neutral-600 px-2 pt-5">
          <p className="text-[14px] font-semibold text-white">{empresa.nombre}</p>
          <p className="mt-1 font-mono text-xs text-neutral-300">{empresa.rol} · prueba</p>
          <button onClick={() => navigate('/iniciar-sesion')} className="mt-2 text-[14px] font-semibold text-secondary-500 hover:underline">
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-10 py-8">
        <Outlet />
      </main>
    </div>
  )
}
