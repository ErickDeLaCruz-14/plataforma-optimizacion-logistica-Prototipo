// Datos de prueba, los mismos del prototipo de Figma (diseno/principios-ui.md).
// Se reemplazarán por llamadas a la API cuando exista el backend.

export const empresa = {
  nombre: 'Distribuidora Ozama, SRL',
  rol: 'Empresa',
}

export const pedidosRecientes = [
  { id: 'PED-0148', ruta: 'Herrera – Villa Mella', fecha: '20 nov', estado: 'asignado', precio: 1612.8, tipoPrecio: 'estimado' },
  { id: 'PED-0142', ruta: 'Haina – ZF Las Américas', fecha: '18 nov', estado: 'asignado', precio: 2369.83, tipoPrecio: 'final' },
  { id: 'PED-0139', ruta: 'Herrera – San Isidro', fecha: '13 nov', estado: 'asignado', precio: 1184.0, tipoPrecio: 'final' },
  { id: 'PED-0131', ruta: 'Haina – Los Alcarrizos', fecha: '12 nov', estado: 'transito', precio: 1420.5, tipoPrecio: 'final' },
]

export const resumenPanel = {
  activos: 4,
  detalleActivos: '3 asignados a ruta · 1 en tránsito',
  proximaRecogida: { cuando: 'Vie 13 nov · 8:10 a. m.', pedido: 'PED-0139', lugar: 'Zona Industrial de Herrera' },
  ahorro: 2052.87,
  detalleAhorro: 'vs. envío individual · 4 pedidos de prueba',
}

export const estadisticasProblema = [
  { valor: '100 %', texto: 'de la carga interna se mueve por carretera.', fuente: 'PNLog / MEPyD' },
  { valor: '73 %', texto: 'de la flota opera en la informalidad.', fuente: 'ANJE, 2021' },
  { valor: '21 años', texto: 'de antigüedad promedio de la flota.', fuente: 'ANJE, 2021' },
  { valor: '3.14 %', texto: 'aportó la logística al PIB en 2023.', fuente: 'MICM, 2024' },
]

// Demo de la landing: los mismos 3 pedidos, individual vs. consolidado.
export const demo = {
  consolidado: {
    km: 96, kmNota: '-19 km vs. individual',
    camiones: 1, camionesNota: '-2 vs. individual',
    costo: 6144, costoNota: '-RD$ 1,216 vs. individual',
    desglose: [
      { empresa: 'Empresa A', monto: 2369.83 },
      { empresa: 'Empresa B', monto: 2457.6 },
      { empresa: 'Empresa C', monto: 1316.57 },
    ],
  },
  individual: {
    km: 115, kmNota: '+19 km vs. consolidado',
    camiones: 3, camionesNota: '+2 vs. consolidado',
    costo: 7360, costoNota: '+RD$ 1,216 vs. consolidado',
  },
  camion: {
    rotulo: '1 camión · L-284519 · 5,000 kg · 24 m³ · 72 % de peso ocupado',
    kg: [
      { id: 'A', valor: 1200 }, { id: 'B', valor: 1400 }, { id: 'C', valor: 1000 }, { id: 'LIBRE', valor: 1400 },
    ],
    m3: [
      { id: 'A', valor: 4.5 }, { id: 'B', valor: 6.0 }, { id: 'C', valor: 3.5 }, { id: 'LIBRE', valor: 10.0 },
    ],
  },
}

export const rd = (n, dec = 2) =>
  'RD$ ' + n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })
