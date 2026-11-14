import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Boton, Carriles, Logo } from '../components/ui.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  function enviar(e) {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(correo)) return setError('Escribe un correo válido, por ejemplo nombre@empresa.do.')
    if (clave.length < 8) return setError('La contraseña tiene al menos 8 caracteres.')
    // Sin backend todavía: cualquier correo y contraseña válidos entran al panel de empresa de prueba.
    navigate('/empresa/panel')
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[640px_1fr]">
      <aside className="relative hidden flex-col overflow-hidden bg-neutral-900 px-14 py-12 lg:flex">
        <Logo />
        <div className="my-auto">
          <p className="eyebrow text-primary-300">KM 0 · Santo Domingo</p>
          <p className="display mt-6 text-[49px] leading-[1.05] text-white">Comparte el camión. Paga solo tu parte.</p>
        </div>
        <Carriles className="absolute bottom-6 left-0 h-20 w-full" />
      </aside>

      <main className="flex items-center justify-center px-6 py-12">
        <form onSubmit={enviar} noValidate className="w-full max-w-[400px]">
          <div className="mb-8 lg:hidden"><Logo tono="claro" /></div>
          <h1 className="text-[31px] font-bold">Iniciar sesión</h1>

          <label htmlFor="correo" className="mt-6 block text-[14px] font-semibold">Correo</label>
          <input
            id="correo" type="email" autoComplete="email" value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="mt-2 h-11 w-full rounded-input border border-neutral-400 bg-white px-3 focus:border-primary-500 focus:outline-2 focus:outline-primary-500"
          />

          <label htmlFor="clave" className="mt-6 block text-[14px] font-semibold">Contraseña</label>
          <input
            id="clave" type="password" autoComplete="current-password" value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="mt-2 h-11 w-full rounded-input border border-neutral-400 bg-white px-3 focus:border-primary-500 focus:outline-2 focus:outline-primary-500"
          />

          {error && <p role="alert" className="mt-4 text-[14px] text-error">{error}</p>}

          <Link to="/recuperar" className="mt-6 inline-block text-[14px] font-semibold text-primary-600 hover:underline">¿Olvidaste tu contraseña?</Link>

          <Boton type="submit" className="mt-6 w-full">Iniciar sesión</Boton>

          <p className="mt-6 text-[14px] text-neutral-600">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="font-semibold text-primary-600 hover:underline">Crear cuenta</Link>
          </p>
        </form>
      </main>
    </div>
  )
}
