import { Boton, Logo } from '../components/ui.jsx'

/* Marcador para las pantallas que ya están en Figma pero todavía no en código. */
export default function Pendiente({ titulo, pantalla, enApp = false }) {
  const contenido = (
    <div className="max-w-xl">
      <p className="eyebrow text-primary-600">En construcción</p>
      <h1 className="mt-3 text-[31px] font-bold">{titulo}</h1>
      <p className="mt-2 text-neutral-600">
        {pantalla
          ? <>Esta pantalla está diseñada en Figma (<span className="font-mono text-[14px]">{pantalla}</span>) y falta pasarla a código.</>
          : 'La dirección que abriste no existe.'}
      </p>
      {!enApp && <Boton to="/" variante="contornoClaro" className="mt-6">Volver al inicio</Boton>}
    </div>
  )
  if (enApp) return contenido
  return (
    <div className="min-h-screen px-8 py-8">
      <Logo tono="claro" />
      <div className="mt-24 flex justify-center">{contenido}</div>
    </div>
  )
}
