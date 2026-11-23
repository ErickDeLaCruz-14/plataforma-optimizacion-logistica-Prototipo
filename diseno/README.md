# Diseño · prototipo en Figma

Respaldo del diseño de interfaz de la **Plataforma Digital de Optimización Logística**: capturas de todas las pantallas, tokens de diseño, guía de estilos, el archivo `.fig` y los plugins que generaron el prototipo.

- **Archivo de Figma:** https://www.figma.com/design/jgyMWiNMdltQbrvLgArYma
- **Prototipo navegable:** https://www.figma.com/proto/jgyMWiNMdltQbrvLgArYma?node-id=12-57&starting-point-node-id=12%3A57
- **Copia local:** [`figma/plataforma-optimizacion-logistica-ui.fig`](figma/) (se abre con *Import* en Figma).

> Hay una propuesta más reciente en [`v2-propuesta/`](v2-propuesta/), con nueva paleta y cinco roles. Esta carpeta sigue siendo la versión vigente hasta decidir los colores.

## Contenido

| Carpeta | Qué tiene |
|---|---|
| [`capturas/`](capturas/) | PNG de cada pantalla a 1440 px de ancho, exportadas del archivo de Figma. `capturas/overlays/` tiene los modales y un ejemplo de toast. |
| [`tokens/`](tokens/) | `tokens.json` (formato de tokens W3C) y `tokens.css` (variables CSS) generados de las variables y estilos de texto de Figma. |
| [`guia-de-estilos/`](guia-de-estilos/) | Captura de la página *Guía de estilos*, el logo en SVG y el resumen de color, tipografía y medidas. |
| [`figma/`](figma/) | Copia `.fig` del archivo. |
| [`plugins/`](plugins/) | Plugins de Figma (v1 a v5.1) con los que se construyó y corrigió el prototipo. Cada carpeta trae su `LEEME.txt`. |
| [`v2-propuesta/`](v2-propuesta/) | Propuesta v2 del diseño (23 nov 2026). |
| [`principios-ui.md`](principios-ui.md) | Principios de usabilidad aplicados (Krug, Tilley), reglas de color y contraste, y registro de mejoras. |

## Flujos del prototipo

En modo Presentación, el menú de flujos ofrece estos puntos de inicio:

| Flujo | Empieza en |
|---|---|
| Inicio · Landing | 01 Landing |
| A · Empresa crea un pedido | 06 Nuevo pedido |
| B · Transportista registra un camión | 12 Mis camiones |
| C · Activar verificación en dos pasos | 10c Verificación (desactivada) |
| D · Seguridad de la cuenta | 10b Seguridad |
| E · Correo de notificación | 15 Correo de notificación |
| F · Mis pedidos sin pedidos | 08b Mis pedidos · sin pedidos |
| G · Recuperar contraseña con error | 04b Correo no encontrado |

## Inventario de pantallas

La página *Pantallas* tiene 99 marcos. Aquí están las 57 pantallas del producto y una captura por cada tipo de overlay. No se incluyen las exploraciones iniciales (Hero A/B, Barra A/B), las dos versiones anteriores del perfil, las 18 variantes de toast (iguales salvo el mensaje) ni las copias de overlays que solo cambian el pedido o el camión.

### Públicas

| # | Pantalla | Captura |
|---|---|---|
| 01 | Landing | [ver](capturas/01-landing.png) |
| 02 | Registro (transportista) | [ver](capturas/02-registro.png) |
| 02b | Registro · segundo camión | [ver](capturas/02b-registro-segundo-camion.png) |
| 02c | Registro · empresa | [ver](capturas/02c-registro-empresa.png) |
| 03 | Inicio de sesión | [ver](capturas/03-inicio-de-sesion.png) |
| 03b | Verificación en dos pasos al iniciar sesión | [ver](capturas/03b-verificacion-dos-pasos-login.png) |
| 03c | Inicio de sesión con código de respaldo | [ver](capturas/03c-login-codigo-respaldo.png) |
| 04 | Recuperar contraseña | [ver](capturas/04-recuperar-contrasena.png) |
| 04b | Recuperar · correo no encontrado | [ver](capturas/04b-recuperar-correo-no-encontrado.png) |
| 04c | Recuperar · enlace enviado | [ver](capturas/04c-recuperar-enlace-enviado.png) |

### Empresa

| # | Pantalla | Captura |
|---|---|---|
| 05 | Panel | [ver](capturas/05-empresa-panel.png) |
| 06 | Nuevo pedido | [ver](capturas/06-empresa-nuevo-pedido.png) |
| 07a0 | Evaluando rutas · cargando | [ver](capturas/07a0-empresa-evaluando-rutas-cargando.png) |
| 07a | Evaluando rutas | [ver](capturas/07a-empresa-evaluando-rutas.png) |
| 07b | Pedido asignado | [ver](capturas/07b-empresa-pedido-asignado.png) |
| 08 | Mis pedidos | [ver](capturas/08-empresa-mis-pedidos.png) |
| 08b | Mis pedidos · sin pedidos | [ver](capturas/08b-empresa-mis-pedidos-vacio.png) |

### Detalle de pedido (Resumen · Plan de ruta · Recibo)

| Pedido | Estado | Resumen | Plan de ruta | Recibo |
|---|---|---|---|---|
| PED-0148 | Asignado (precio estimado) | [ver](capturas/09a-detalle-resumen-PED-0148.png) | [ver](capturas/09b-detalle-plan-de-ruta-PED-0148.png) | [ver](capturas/09c-detalle-recibo-PED-0148.png) |
| PED-0142 | Asignado (precio final) | [ver](capturas/09a-detalle-resumen-PED-0142.png) | [ver](capturas/09b-detalle-plan-de-ruta-PED-0142.png) | [ver](capturas/09c-detalle-recibo-PED-0142.png) |
| PED-0139 | Asignado | [ver](capturas/09a-detalle-resumen-PED-0139.png) | [ver](capturas/09b-detalle-plan-de-ruta-PED-0139.png) | [ver](capturas/09c-detalle-recibo-PED-0139.png) |
| PED-0131 | En tránsito | [ver](capturas/09a-detalle-resumen-PED-0131.png) | [ver](capturas/09b-detalle-plan-de-ruta-PED-0131.png) | [ver](capturas/09c-detalle-recibo-PED-0131.png) |
| PED-0124 | Entregado | [ver](capturas/09a-detalle-resumen-PED-0124.png) | [ver](capturas/09b-detalle-plan-de-ruta-PED-0124.png) | [ver](capturas/09c-detalle-recibo-PED-0124.png) |
| PED-0117 | Entregado | [ver](capturas/09a-detalle-resumen-PED-0117.png) | [ver](capturas/09b-detalle-plan-de-ruta-PED-0117.png) | [ver](capturas/09c-detalle-recibo-PED-0117.png) |

### Perfil y seguridad · Empresa

| # | Pantalla | Captura |
|---|---|---|
| 10 | Perfil | [ver](capturas/10-empresa-perfil.png) |
| 10b | Seguridad | [ver](capturas/10b-empresa-seguridad.png) |
| 10c | Verificación en dos pasos (desactivada) | [ver](capturas/10c-empresa-verificacion-desactivada.png) |
| 10d | Activar verificación | [ver](capturas/10d-empresa-activar-verificacion.png) |
| 10e | Códigos de respaldo | [ver](capturas/10e-empresa-codigos-respaldo.png) |
| 10f | Pedidos completados | [ver](capturas/10f-empresa-pedidos-completados.png) |
| 10g | Notificaciones | [ver](capturas/10g-empresa-notificaciones.png) |
| 10h | Equipo y permisos | [ver](capturas/10h-empresa-equipo-permisos.png) |
| 10i | Privacidad y datos | [ver](capturas/10i-empresa-privacidad-datos.png) |

### Transportista

| # | Pantalla | Captura |
|---|---|---|
| 11 | Panel | [ver](capturas/11-transportista-panel.png) |
| 11b | Rutas asignadas | [ver](capturas/11b-transportista-rutas-asignadas.png) |
| 12 | Mis camiones | [ver](capturas/12-transportista-mis-camiones.png) |
| 13 | Ruta asignada | [ver](capturas/13-transportista-ruta-asignada.png) |
| 14 | Perfil | [ver](capturas/14-transportista-perfil.png) |
| 14b | Seguridad | [ver](capturas/14b-transportista-seguridad.png) |
| 14c | Verificación en dos pasos (desactivada) | [ver](capturas/14c-transportista-verificacion-desactivada.png) |
| 14d | Activar verificación | [ver](capturas/14d-transportista-activar-verificacion.png) |
| 14e | Códigos de respaldo | [ver](capturas/14e-transportista-codigos-respaldo.png) |
| 14f | Rutas completadas | [ver](capturas/14f-transportista-rutas-completadas.png) |
| 14g | Notificaciones | [ver](capturas/14g-transportista-notificaciones.png) |
| 14i | Privacidad y datos | [ver](capturas/14i-transportista-privacidad-datos.png) |

### Transversal

| # | Pantalla | Captura |
|---|---|---|
| 15 | Correo de notificación | [ver](capturas/15-correo-notificacion.png) |

### Overlays

| Overlay | Captura |
|---|---|
| Vista rápida de PED-0142 | [ver](capturas/overlays/vista-rapida-PED-0142.png) |
| Acciones de fila (menú ⋮; hay uno por pedido) | [ver](capturas/overlays/acciones-de-fila.png) |
| Cerrar las demás sesiones | [ver](capturas/overlays/cerrar-demas-sesiones.png) |
| Eliminar cuenta | [ver](capturas/overlays/eliminar-cuenta.png) |
| Administrar verificación (Empresa y Transportista) | [ver](capturas/overlays/administrar-verificacion.png) |
| Actividad de la cuenta (Empresa y Transportista) | [ver](capturas/overlays/actividad-de-la-cuenta.png) |
| Invitar usuario | [ver](capturas/overlays/invitar-usuario.png) |
| Política de privacidad | [ver](capturas/overlays/politica-de-privacidad.png) |
| Editar camión (uno por camión) | [ver](capturas/overlays/editar-camion.png) |
| Toast (ejemplo: Clave copiada) | [ver](capturas/overlays/toast-ejemplo-clave-copiada.png) |

## Cómo actualizar este respaldo

1. En Figma: **File › Save local copy** y reemplaza el archivo de `figma/`.
2. Vuelve a exportar las capturas de las pantallas que cambiaron, con el mismo nombre de archivo.
3. Si cambian las variables de color, medidas o estilos de texto, regenera `tokens/` y actualiza el bloque `@theme` de `app/src/index.css`.
