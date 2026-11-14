import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Boton, Carriles, Logo, Tarjeta } from '../components/ui.jsx'
import { demo, estadisticasProblema, rd } from '../data/demo.js'

const contenedor = 'mx-auto w-full max-w-[1440px] px-6 lg:px-20'

function Nav() {
  return (
    <header className="border-b border-neutral-700 bg-neutral-900">
      <div className={`${contenedor} flex h-20 items-center justify-between`}>
        <Logo />
        <nav className="hidden items-center gap-8 text-[15px] text-white md:flex" aria-label="Principal">
          <a href="#como-funciona" className="hover:text-secondary-300">Cómo funciona</a>
          <a href="#para-quien" className="hover:text-secondary-300">Para empresas</a>
          <a href="#para-quien" className="hover:text-secondary-300">Para transportistas</a>
          <Link to="/iniciar-sesion" className="hover:text-secondary-300">Iniciar sesión</Link>
          <Boton variante="ambar" to="/registro">Crear cuenta</Boton>
        </nav>
      </div>
    </header>
  )
}

/* Tarjeta "manifiesto de ruta" del hero: tres orígenes que convergen en un destino. */
function Manifiesto() {
  return (
    <div className="w-full max-w-[520px] bg-neutral-50 p-7 shadow-xl [clip-path:polygon(0_6px,100%_6px,100%_calc(100%-6px),0_calc(100%-6px))]">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-neutral-600">Manifiesto de ruta</p>
        <span className="rounded bg-secondary-500 px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-neutral-900">Datos simulados</span>
      </div>
      <p className="display mt-2 text-[31px]">R-0031</p>
      <svg viewBox="0 0 460 110" className="mt-2 w-full font-mono text-[10px]" aria-label="Haina, Herrera, Los Alcarrizos y Villa Mella convergen hacia ZF Las Américas">
        <g fill="none" strokeWidth="2">
          <path d="M120 18 C170 18 200 30 240 62" stroke="var(--color-neutral-900)" strokeDasharray="6 5" />
          <path d="M120 44 C170 44 200 50 240 62" stroke="var(--color-neutral-300)" strokeDasharray="6 5" />
          <path d="M120 70 C170 70 200 66 240 62" stroke="var(--color-neutral-300)" strokeDasharray="6 5" />
          <path d="M120 96 C170 96 200 76 240 62" stroke="var(--color-neutral-300)" strokeDasharray="6 5" />
          <path d="M240 62 H440" stroke="var(--color-primary-600)" strokeWidth="3" />
        </g>
        <circle cx="120" cy="18" r="4" fill="white" stroke="var(--color-neutral-900)" strokeWidth="2" />
        {[44, 70, 96].map((y) => <circle key={y} cx="120" cy={y} r="4" fill="white" stroke="var(--color-neutral-300)" strokeWidth="2" />)}
        <circle cx="240" cy="62" r="6" fill="var(--color-secondary-500)" stroke="var(--color-neutral-900)" strokeWidth="2" />
        <circle cx="440" cy="62" r="5" fill="var(--color-primary-600)" />
        <text x="110" y="21" textAnchor="end" fontWeight="700">HAINA</text>
        <text x="110" y="47" textAnchor="end" fill="var(--color-neutral-400)">HERRERA</text>
        <text x="110" y="73" textAnchor="end" fill="var(--color-neutral-400)">LOS ALCARRIZOS</text>
        <text x="110" y="99" textAnchor="end" fill="var(--color-neutral-400)">VILLA MELLA</text>
        <text x="440" y="50" textAnchor="end" fontWeight="700">ZF LAS AMÉRICAS</text>
      </svg>
      <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-[12px] text-neutral-600">
        <div className="flex justify-between"><dt>PEDIDOS</dt><dd className="text-neutral-900">1</dd></div>
        <div className="flex justify-between"><dt>EMPRESAS</dt><dd className="text-neutral-900">1</dd></div>
        <div className="col-span-2 flex items-baseline justify-between"><dt>CAPACIDAD OCUPADA</dt><dd className="text-[20px] font-bold text-neutral-900">34 %</dd></div>
      </dl>
      <div className="mt-3 flex items-center gap-1" aria-hidden="true">
        <div className="flex h-9 flex-1 items-center gap-1 rounded border-2 border-neutral-900 px-2 font-mono text-[10px]">
          <span className="text-neutral-600">KG</span>
          <span className="flex h-5 w-[34%] items-center justify-center bg-primary-700 font-bold text-white">A</span>
          <span className="flex h-5 flex-1 items-center justify-center border border-secondary-500 bg-[repeating-linear-gradient(135deg,var(--color-secondary-300)_0_4px,transparent_4px_8px)] font-bold">
            <span className="bg-white px-1">LIBRE</span>
          </span>
        </div>
        <div className="h-9 w-12 rounded-r-lg bg-neutral-700" />
      </div>
      <p className="mt-4 font-mono text-[10px] text-neutral-600">COSTO REPARTIDO POR TON-KM ENTRE LOS PEDIDOS</p>
    </div>
  )
}

function Hero() {
  return (
    <section className="bg-neutral-900">
      <div className={`${contenedor} grid items-center gap-12 py-20 lg:grid-cols-[1fr_520px]`}>
        <div>
          <p className="eyebrow text-primary-300">KM 0 · Santo Domingo</p>
          <h1 className="display mt-5 text-[40px] leading-[1.05] text-white md:text-[61px]">
            Comparte el camión.<br />Paga solo <mark className="whitespace-nowrap bg-secondary-500 px-2 text-neutral-900">tu parte.</mark>
          </h1>
          <p className="mt-6 max-w-[560px] text-[20px] leading-[1.45] text-neutral-300">
            Juntamos pedidos de distintas empresas en una misma ruta y repartimos el costo por ton-km.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Boton variante="ambar" to="/registro">Crear cuenta</Boton>
            <Boton variante="contornoOscuro" href="#como-funciona">
              Ver cómo funciona
            </Boton>
          </div>
        </div>
        <Manifiesto />
      </div>
      <Carriles className="h-20 w-full" />
    </section>
  )
}

function Problema() {
  return (
    <section className="bg-papel py-20">
      <div className={contenedor}>
        <p className="eyebrow text-primary-600">El problema</p>
        <h2 className="mt-4 max-w-[760px] text-[31px] font-bold leading-tight">Pagas el flete completo por media carga. El camión viaja semivacío.</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {estadisticasProblema.map((e) => (
            <Tarjeta key={e.valor} className="p-6">
              <p className="display text-[39px] leading-none">{e.valor}</p>
              <p className="mt-4 text-[14px]">{e.texto}</p>
              <p className="mt-3 font-mono text-[12px] text-neutral-600">Fuente: {e.fuente}</p>
            </Tarjeta>
          ))}
        </div>
      </div>
      <Carriles color="var(--color-neutral-900)" className="mt-20 h-16 w-full" />
    </section>
  )
}

function ComoFunciona() {
  const pasos = [
    ['KM 1', 'Crea tu pedido', 'Origen, destino, peso, volumen y fecha de recogida. Una sola pantalla.'],
    ['KM 2', 'Lo consolidamos con otros', 'El motor busca la ruta compartida más barata con fecha compatible.'],
    ['KM 3', 'Pagas solo tu parte', 'El costo de la ruta se reparte por ton-km entre los pedidos que la comparten.'],
  ]
  return (
    <section id="como-funciona" className="bg-white py-20">
      <div className={contenedor}>
        <p className="eyebrow text-primary-600">Cómo funciona</p>
        <h2 className="mt-4 text-[31px] font-bold">Tres pasos. El motor hace el resto.</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {pasos.map(([km, t, d]) => (
            <li key={km} className="rounded-card border border-neutral-200 bg-papel p-6">
              <span className="rounded bg-primary-700 px-2 py-1 font-mono text-[11px] font-bold text-white">{km}</span>
              <h3 className="mt-4 text-[20px] font-semibold">{t}</h3>
              <p className="mt-2 text-[14px] text-neutral-600">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ParaQuien() {
  const cuentas = [
    ['Para empresas', ['Paga por la carga que envías, no por el camión completo.', 'Sigue el estado y el plan de ruta de cada pedido.', 'Recibe la hora estimada de recogida un día antes.'], 'Crear cuenta de empresa', '/registro?rol=empresa'],
    ['Para transportistas', ['Registra tus camiones y su capacidad.', 'Recibe rutas con la carga ya consolidada.', 'Itinerario con orden de paradas y de carga.'], 'Crear cuenta de transportista', '/registro?rol=transportista'],
  ]
  return (
    <section id="para-quien" className="bg-papel py-20">
      <div className={contenedor}>
        <p className="eyebrow text-primary-600">Para quién</p>
        <h2 className="mt-4 text-[31px] font-bold">Una plataforma, dos tipos de cuenta.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cuentas.map(([t, items, cta, to]) => (
            <Tarjeta key={t} className="p-8">
              <h3 className="text-[25px] font-semibold">{t}</h3>
              <ul className="mt-5 space-y-3">
                {items.map((i) => (
                  <li key={i} className="flex gap-3 text-[15px]">
                    <span className="mt-3 h-0.5 w-3 shrink-0 bg-secondary-500" aria-hidden="true" />{i}
                  </li>
                ))}
              </ul>
              <Boton variante="contornoClaro" to={to} className="mt-6">{cta}</Boton>
            </Tarjeta>
          ))}
        </div>
      </div>
    </section>
  )
}

function Barra({ fila, unidad, total }) {
  const estilos = {
    A: 'bg-primary-700 text-white',
    B: 'bg-primary-400 bg-[radial-gradient(var(--color-primary-700)_1px,transparent_1px)] [background-size:6px_6px]',
    C: 'bg-primary-100 bg-[repeating-linear-gradient(0deg,var(--color-primary-300)_0_1px,transparent_1px_5px)]',
    LIBRE: 'border border-secondary-500 bg-[repeating-linear-gradient(135deg,var(--color-secondary-300)_0_4px,transparent_4px_8px)]',
  }
  return (
    <div className="flex items-center gap-2">
      <span className="w-6 font-mono text-[11px] text-neutral-600">{unidad}</span>
      <div className="flex h-7 flex-1 gap-1">
        {fila.map((s) => (
          <span key={s.id} style={{ width: `${(s.valor / total) * 100}%` }} className={`flex items-center justify-center font-mono text-[11px] font-bold ${estilos[s.id]}`}>
            <span className={s.id === 'A' ? '' : 'bg-white px-1 text-neutral-900'}>{s.id} {s.valor.toLocaleString('en-US', { minimumFractionDigits: unidad === 'M³' ? 1 : 0 })}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Demo() {
  const [modo, setModo] = useState('consolidado')
  const d = demo[modo]
  const stats = [
    ['Km recorridos', `${d.km} km`, d.kmNota],
    ['Camiones usados', d.camiones, d.camionesNota],
  ]
  return (
    <section className="bg-neutral-900 py-20 text-white">
      <div className={contenedor}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-primary-300">Demo</p>
            <h2 className="mt-2 text-[31px] font-bold">Los mismos 3 pedidos, enviados de dos formas.</h2>
          </div>
          <span className="rounded bg-secondary-500 px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-neutral-900">Datos simulados</span>
        </div>

        <div role="tablist" aria-label="Forma de envío" className="mt-8 inline-flex rounded-input bg-neutral-700 p-1">
          {[['individual', 'Envío individual'], ['consolidado', 'Consolidado']].map(([k, t]) => (
            <button
              key={k} role="tab" aria-selected={modo === k} onClick={() => setModo(k)}
              className={`rounded px-4 py-2 text-[15px] font-medium ${modo === k ? 'bg-secondary-500 text-neutral-900' : 'text-white hover:bg-neutral-600'}`}
            >{t}</button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {stats.map(([e, v, n]) => (
            <div key={e} className="rounded-card bg-neutral-700 p-6">
              <p className="eyebrow text-neutral-300">{e}</p>
              <p className="display mt-3 text-[39px] leading-none">{v}</p>
              <p className="mt-3 font-mono text-[12px] text-neutral-300">{n}</p>
            </div>
          ))}
          <div className="rounded-card bg-neutral-700 p-6">
            <p className="eyebrow text-neutral-300">Costo total</p>
            <p className="display mt-3 text-[39px] leading-none">{rd(d.costo, 0)}</p>
            <p className="mt-3 font-mono text-[12px] text-neutral-300">{d.costoNota}</p>
            {d.desglose && (
              <dl className="mt-4 space-y-1 text-[13px]">
                {d.desglose.map((x) => (
                  <div key={x.empresa} className="flex justify-between"><dt className="text-neutral-300">{x.empresa}</dt><dd className="font-mono">{rd(x.monto)}</dd></div>
                ))}
              </dl>
            )}
          </div>
        </div>

        {modo === 'consolidado' ? (
          <div className="mt-8 rounded-card bg-white p-6 text-neutral-900">
            <p className="font-mono text-[11px] uppercase tracking-wide text-neutral-600">{demo.camion.rotulo}</p>
            <div className="mt-4 space-y-2">
              <Barra fila={demo.camion.kg} unidad="KG" total={5000} />
              <Barra fila={demo.camion.m3} unidad="M³" total={24} />
            </div>
          </div>
        ) : (
          <p className="mt-8 rounded-card border border-neutral-600 p-6 text-[15px] text-neutral-300">
            Cada pedido sale en su propio camión: tres viajes, cada uno con la mayor parte de la caja vacía.
          </p>
        )}
      </div>
    </section>
  )
}

function CtaFinal() {
  return (
    <section className="bg-papel py-24 text-center">
      <h2 className="display text-[31px] md:text-[39px]">Empieza con tu primer pedido.</h2>
      <p className="mt-3 text-[18px] text-neutral-600">Regístrate como empresa o como transportista.</p>
      <Boton to="/registro" className="mt-6">Crear cuenta</Boton>
    </section>
  )
}

function Pie() {
  return (
    <footer className="bg-neutral-900">
      <div className={`${contenedor} flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between`}>
        <Logo />
        <p className="text-[13px] text-neutral-300">Proyecto de grado · INTEC · 2026. Prototipo académico con datos de prueba.</p>
      </div>
    </footer>
  )
}

export default function Landing() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problema />
        <ComoFunciona />
        <ParaQuien />
        <Demo />
        <CtaFinal />
      </main>
      <Pie />
    </>
  )
}
