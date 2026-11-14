# Front-end

Base del front-end en **React 19 + Vite + Tailwind CSS 4**, construida desde el diseño de [`../diseno`](../diseno).

## Ejecutar

```bash
cd app
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

Necesita Node 20 o superior.

## Qué hay

| Ruta | Pantalla de Figma | Estado |
|---|---|---|
| `/` | 01 · Landing | Lista, con la demo individual / consolidado funcionando |
| `/iniciar-sesion` | 03 · Inicio de sesión | Lista, con validación de correo y contraseña |
| `/empresa/panel` | 05 · Empresa · Panel | Lista, con menú lateral y enlaces a cada pedido |
| `/registro`, `/recuperar`, `/empresa/nuevo-pedido`, `/empresa/pedidos`, `/empresa/perfil` | 02, 04, 06, 08, 10 | Marcador "En construcción" |

Todavía no hay backend: el inicio de sesión acepta cualquier correo y contraseña válidos y entra al panel de prueba. Los datos salen de `src/data/demo.js`, los mismos del prototipo.

## Estructura

```
src/
  index.css            Tokens de Figma como tema de Tailwind (@theme)
  App.jsx              Rutas
  components/ui.jsx    Logo, Boton, BadgeEstado, BadgePrecio, Tarjeta, Carriles
  components/AppLayout.jsx  Menú lateral de la app de empresa
  pages/               Landing, Login, EmpresaPanel, Pendiente
  data/demo.js         Datos de prueba
```

## Reglas que respeta el código

- Colores, tipografía, espaciado y radios salen solo de los tokens (`bg-primary-600`, `text-neutral-500`, `rounded-card`, etc.).
- Acción principal ámbar (`variante="ambar"`) sobre fondo oscuro y primaria (`variante="primario"`) sobre fondo claro; un solo ámbar por zona.
- Texto pequeño sobre fondo claro en `neutral-500` o más oscuro; `neutral-400` solo para bordes y fondos oscuros.
- Foco visible en `primary-500`.

Detalle en [`../diseno/principios-ui.md`](../diseno/principios-ui.md).
