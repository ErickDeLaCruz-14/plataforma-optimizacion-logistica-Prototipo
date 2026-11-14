import { Link } from 'react-router-dom'
import { BadgeEstado, BadgePrecio, Boton, Tarjeta } from '../components/ui.jsx'
import { pedidosRecientes, rd, resumenPanel } from '../data/demo.js'

export default function EmpresaPanel() {
  const r = resumenPanel
  return (
    <div className="mx-auto max-w-[1112px]">
      <header className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[31px] font-bold leading-tight">Panel</h1>
          <p className="mt-1 text-neutral-600">Tus pedidos activos, la próxima recogida y lo que llevas ahorrado.</p>
        </div>
        <Boton to="/empresa/nuevo-pedido" className="mt-3 text-[16px]">+ Nuevo pedido</Boton>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3" aria-label="Resumen">
        <Tarjeta className="p-6">
          <p className="eyebrow text-neutral-600">Pedidos activos</p>
          <p className="display mt-3 text-[49px] leading-none">{r.activos}</p>
          <p className="mt-4 text-[14px] text-neutral-600">{r.detalleActivos}</p>
        </Tarjeta>
        <Tarjeta className="p-6">
          <p className="eyebrow text-neutral-600">Próxima recogida</p>
          <p className="mt-3 font-mono text-[20px] font-medium">{r.proximaRecogida.cuando}</p>
          <p className="mt-2 text-[14px]">
            <span className="font-mono">{r.proximaRecogida.pedido}</span>{' '}
            <span className="text-neutral-600">{r.proximaRecogida.lugar}</span>
          </p>
          <Link to={`/empresa/pedidos/${r.proximaRecogida.pedido}`} className="mt-2 inline-block text-[14px] font-semibold text-primary-600 hover:underline">
            Ver plan de ruta
          </Link>
        </Tarjeta>
        <Tarjeta className="p-6">
          <p className="eyebrow text-neutral-600">Ahorro acumulado</p>
          <p className="mt-3 inline-block rounded bg-secondary-500 px-2 py-0.5 font-mono text-[25px] font-bold text-neutral-900">{rd(r.ahorro)}</p>
          <p className="mt-3 text-[14px] text-neutral-600">{r.detalleAhorro}</p>
        </Tarjeta>
      </section>

      <Tarjeta className="mt-6 px-6 pb-6 pt-5">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-[20px] font-semibold">Pedidos recientes</h2>
          <Link to="/empresa/pedidos" className="text-[14px] font-semibold text-primary-600 hover:underline">Ver todos</Link>
        </div>
        <table className="w-full text-left">
          <caption className="sr-only">Últimos cuatro pedidos</caption>
          <thead className="sr-only">
            <tr><th>Pedido</th><th>Ruta</th><th>Fecha</th><th>Estado</th><th>Precio</th></tr>
          </thead>
          <tbody>
            {pedidosRecientes.map((p) => (
              <tr key={p.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                <td className="py-3.5 font-mono text-[14px]">
                  <Link to={`/empresa/pedidos/${p.id}`} className="hover:underline">{p.id}</Link>
                </td>
                <td className="py-3.5 text-[14px]">{p.ruta}</td>
                <td className="py-3.5 font-mono text-[14px] text-neutral-600">{p.fecha}</td>
                <td className="py-3.5"><BadgeEstado estado={p.estado} /></td>
                <td className="py-3.5">
                  <span className="flex items-center justify-end gap-2">
                    <span className="font-mono text-[14px] font-bold">{rd(p.precio)}</span>
                    <BadgePrecio tipo={p.tipoPrecio} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tarjeta>
    </div>
  )
}
