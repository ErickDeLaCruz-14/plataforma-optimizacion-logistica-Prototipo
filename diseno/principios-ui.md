# Principios de interfaz y registro de mejoras

## Principios tomados de la bibliografía del proyecto

- **Krug, *Don't Make Me Think*, cap. 3.** Jerarquía visual clara: lo importante es más prominente, lo relacionado se agrupa y lo anidado se ve anidado. Áreas bien definidas, lo clicable es obvio, poco ruido visual y texto escaneable. La claridad gana a la consistencia.
- **Krug, cap. 6.** Identificador del sitio arriba a la izquierda y enlazado al inicio. Nombre de página prominente, que coincida con lo que se pulsó. El "usted está aquí" usa más de una señal visual. Migas de pan.
- **Krug, caps. 12–13.** Contraste suficiente; nunca texto pequeño y de bajo contraste. Etiquetas fuera de los campos. Los títulos van más cerca del texto que sigue que del anterior.
- **Tilley, *Systems Analysis and Design*, cap. 8.4.** Diseño común en todos los módulos: color, ubicación y fuentes. Títulos, mensajes e instrucciones en el mismo lugar en todas las pantallas. Pocas fuentes y tamaños, cada estilo con un significado. Colores para destacar áreas, sin estridencias. Densidad baja con espacio en blanco. Terminología consistente y mensajes específicos. Atenuar solo lo que no está disponible. Respuesta del sistema a cada acción y confirmación en acciones destructivas.
- **Guía "¿Cómo crear paletas de color?".** Primario con tints y shades (Primary 50…900), secundario, neutros y revisión de contraste.

## Regla de color para la acción principal

- **Sobre fondo oscuro** (barra y hero de la landing, demo): botón ámbar, `Secondary/500` con texto `Neutral/900`.
- **Sobre fondo claro** (formularios, app, CTA final): botón primario, `Primary/600` con texto blanco.
- **Un solo elemento ámbar por zona.** Los enlaces secundarios van en el color de texto normal.

## Reglas de contraste (WCAG 2.1 AA)

- Texto normal 4.5:1; texto grande (24 px, o 18.66 px en negrita) 3:1; bordes de controles y foco 3:1.
- `Neutral/400` (#8A93A8) solo para bordes, íconos y texto sobre fondo oscuro. Para texto pequeño sobre fondo claro, `Neutral/500` o más oscuro.
- Tinte verde de etiquetas y avisos al 7 % (con texto `Semantic/Exito` da 4.56:1); tinte rojo al 10 %.
- Anillo de foco de los campos en `Primary/500` (3.53:1).

## Mejoras visuales aplicadas (14 nov 2026)

1. **Estructura común.** Indicador activo en el menú lateral, migas unificadas con "›", descripción bajo el título en las pantallas de primer nivel y tarjetas de una misma fila con igual alto.
2. **Tablas y listas.** Columnas sin recortes, monto de las filas a 14 px en negrita, filtro "Estado" con etiqueta como los demás campos y estado vacío en su propia pantalla (08b).
3. **Landing y pantallas públicas.** "Iniciar sesión" de la barra en color neutro, sección "Para quién" con antetítulo y título, CTA final con descripción. Recuperar contraseña dividido en 04, 04b y 04c.
4. **Detalle de pedido.** Nota técnica del mapa fuera de la interfaz, paradas de ENTREGA con contorno en vez de gris y recibo alineado a la retícula.
5. **Contraste.** 32 textos pasados a `Neutral/500`, tintes verdes al 7 %, hover activo del menú más oscuro, `Neutral/400` a #8A93A8 y foco de campos a `Primary/500`.

## Revisión de lógica e interacciones

- El menú "Rutas asignadas" abre la lista 11b; la miga de 13 también.
- El registro termina en el panel del rol elegido. El registro como empresa está en 02c y se enlaza desde los radios de rol y desde los "Crear cuenta" genéricos.
- "Administrar" la verificación abre un overlay con Ver códigos, Cambiar de método y Desactivar.
- Pantallas nuevas: 03c (código de respaldo) y 02b (segundo camión).
- El logo del menú lateral lleva al panel de cada rol.
- Cada tarjeta de camión abre "Editar camión".
- El menú ⋮ de cada fila tiene sus propias opciones (antes las tres iban al recibo).
- Las variantes Hover y Focus del ítem de navegación quedaron ligadas a la propiedad Ícono.

## Detalle de cada pedido según su estado

Cada pedido de Mis pedidos tiene su propio Resumen, Plan de ruta y Recibo. La línea "Estado del pedido" usa la variante de línea de km que corresponde y el badge del encabezado coincide.

| Pedido | Estado | Ruta · camión | Carga | Precio | Envío individual | Ahorro | Participación |
|---|---|---|---|---|---|---|---|
| PED-0148 | Asignado (precio estimado) | R-0034 · L-301772 (3,500 kg · 16 m³) | 800 kg · 3.0 m³ | RD$ 1,612.80 | RD$ 2,176.00 | RD$ 563.20 | 40.28 % |
| PED-0142 | Asignado (precio final) | R-0031 · L-284519 (5,000 kg · 24 m³) | 1,200 kg · 4.5 m³ | RD$ 2,369.83 | RD$ 2,880.00 | RD$ 510.17 | 38.57 % |
| PED-0139 | Asignado | R-0030 · L-402118 (2,500 kg · 12 m³), 58 km × RD$ 45 | 600 kg · 2.0 m³ | RD$ 1,184.00 | RD$ 1,480.00 | RD$ 296.00 | 45.36 % |
| PED-0131 | En tránsito | R-0026 · L-256038 (8,000 kg · 38 m³), 74 km × RD$ 78 | 1,500 kg · 6.0 m³ | RD$ 1,420.50 | RD$ 1,860.00 | RD$ 439.50 | 24.61 % |
| PED-0124 | Entregado | R-0024 · L-387650 (3,500 kg · 16 m³), 81 km × RD$ 55 | 950 kg · 3.5 m³ | RD$ 2,010.00 | RD$ 2,610.00 | RD$ 600.00 | 45.12 % |
| PED-0117 | Entregado | R-0020 · L-415903 (5,000 kg · 24 m³), 88 km × RD$ 60 | 1,100 kg · 4.0 m³ | RD$ 1,745.20 | RD$ 2,240.00 | RD$ 494.80 | 33.05 % |

El precio es la participación por el costo de la ruta, y la ton-km de la ruta es tu ton-km dividida entre la participación.

## Verificación

- Grafo del prototipo revisado por script: sin destinos rotos, sin overlays sin salida y todas las pantallas alcanzables desde algún punto de inicio.
- Prueba en modo Presentación del flujo A completa.

**Limitación conocida:** en pantallas más altas que la ventana, el menú lateral se desplaza con la página en el prototipo.
