import { Link } from 'react-router-dom'

/* Logo: isotipo + nombre. tono="oscuro" para fondos oscuros. */
export function Logo({ tono = 'oscuro', to = '/', compacto = false }) {
  const claro = tono === 'claro'
  return (
    <Link to={to} className="flex items-center gap-3" aria-label="Plataforma Digital de Optimización Logística, ir al inicio">
      <img src="/logo.svg" alt="" width="40" height="40" />
      <span className="leading-tight">
        <span className={`block font-mono text-[11px] tracking-[0.14em] ${claro ? 'text-neutral-600' : 'text-neutral-300'}`}>
          {compacto ? 'PLATAFORMA DIGITAL' : 'PLATAFORMA DIGITAL DE'}
        </span>
        <span className={`block text-[15px] font-semibold ${claro ? 'text-neutral-900' : 'text-white'}`}>Optimización Logística</span>
      </span>
    </Link>
  )
}

const variantes = {
  // Acción principal sobre fondo oscuro (regla: un solo ámbar por zona).
  ambar: 'bg-secondary-500 text-neutral-900 hover:bg-secondary-300',
  // Acción principal sobre fondo claro.
  primario: 'bg-primary-600 text-white hover:bg-primary-700',
  contornoOscuro: 'border border-neutral-300 text-white hover:bg-white/10',
  contornoClaro: 'border border-neutral-700 text-neutral-900 bg-white hover:bg-neutral-100',
}

export function Boton({ variante = 'primario', to, href, className = '', children, ...props }) {
  const cls = `inline-flex items-center justify-center rounded-input px-4 h-11 text-[15px] font-semibold transition-colors ${variantes[variante]} ${className}`
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>
  if (href) return <a href={href} className={cls} {...props}>{children}</a>
  return <button className={cls} {...props}>{children}</button>
}

const estados = {
  asignado: { texto: 'Asignado a ruta', cls: 'bg-primary-100 text-primary-800', punto: 'bg-primary-600' },
  transito: { texto: 'En tránsito', cls: 'bg-secondary-100 text-neutral-900', punto: 'bg-secondary-500' },
  entregado: { texto: 'Entregado', cls: 'bg-exito/7 text-exito', punto: 'bg-exito' },
}

export function BadgeEstado({ estado }) {
  const e = estados[estado]
  return (
    <span className={`inline-flex items-center gap-2 rounded px-2 py-1 font-mono text-xs font-bold uppercase tracking-wide ${e.cls}`}>
      <span className={`size-2 ${e.punto}`} aria-hidden="true" />
      {e.texto}
    </span>
  )
}

export function BadgePrecio({ tipo }) {
  const estimado = tipo === 'estimado'
  return (
    <span
      className={`rounded px-1.5 py-0.5 font-mono text-xs font-bold uppercase ${estimado ? 'bg-secondary-500 text-neutral-900' : 'bg-primary-700 text-white'}`}
      title={estimado ? 'Precio estimado: puede bajar si se suman más pedidos a la ruta' : 'Precio final'}
    >
      {estimado ? 'Estimado' : 'Final'}
    </span>
  )
}

export function Tarjeta({ className = '', children }) {
  return <div className={`rounded-card border border-neutral-200 bg-white ${className}`}>{children}</div>
}

/* Líneas de carril que convergen en una sola: el motivo gráfico de la marca. */
export function Carriles({ color = 'var(--color-secondary-500)', className = '' }) {
  return (
    <svg className={className} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <g stroke={color} strokeWidth="4" fill="none">
        <path d="M0 12 H500 Q600 12 700 36" strokeDasharray="34 26" />
        <path d="M0 40 H760" strokeDasharray="34 26" />
        <path d="M0 68 H500 Q600 68 700 44" strokeDasharray="34 26" />
        <path d="M760 40 H1440" />
        <path d="M752 28 V52 M764 28 V52" strokeWidth="6" />
      </g>
    </svg>
  )
}
