// PDOL · Revisión v2: arreglos pendientes + exportar capturas para revisión
figma.showUI(__html__, { width: 460, height: 520, title: 'Revisión v2 · PDOL' });
figma.ui.onmessage = (m) => { if (m === 'close') figma.closePlugin(); };
const say = (t) => figma.ui.postMessage({ type: 'log', text: t });
async function step(name, fn) { try { const r = await fn(); say('✔ ' + name + (r ? ' · ' + r : '')); } catch (e) { say('✖ ' + name + ' · ' + (e && e.message ? e.message : e)); } }
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();

async function sendPNG(node, name, scale) {
  const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: scale } });
  figma.ui.postMessage({ type: 'file', name, bytes });
  return bytes.length;
}

async function main() {
  for (const p of figma.root.children) await p.loadAsync();
  const PG = figma.root.children.find(p => p.name === 'Guía de estilos');
  const PC = figma.root.children.find(p => p.name === 'Componentes');
  const PP = figma.root.children.find(p => p.name === 'Pantallas');
  if (!PC || !PP) throw new Error('No encuentro las páginas Componentes y Pantallas. ¿Es el archivo correcto?');
  const frames = PP.children.filter(n => n.type === 'FRAME');
  const byName = (n) => frames.find(f => f.name === n);
  say('Archivo cargado. ' + frames.length + ' frames en Pantallas.');

  // 1. Separador de la landing
  await step('Landing: separador ocupa el ancho disponible', async () => {
    const L = byName('01 · Landing'); if (!L) throw new Error('falta 01 · Landing');
    const seps = L.findAll(n => n.name === 'Línea de consolidación · separador');
    for (const s of seps) { for (const c of s.findAll(() => true)) if ('constraints' in c) c.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; s.layoutSizingHorizontal = 'FILL'; }
    return seps.length + ' separador(es)';
  });

  // 2. Diagnóstico rápido
  await step('Diagnóstico', async () => {
    const out = [];
    for (const f of frames) for (const r of (f.reactions || [])) if (r.trigger && r.trigger.type === 'AFTER_TIMEOUT') out.push(f.name + ' → ' + r.trigger.timeout);
    const pc = PC.findAllWithCriteria({ types: ['COMPONENT_SET'] }).find(s => s.name === 'Hero · manifiesto animado');
    if (pc) for (const v of pc.children) for (const r of (v.reactions || [])) if (r.trigger && r.trigger.type === 'AFTER_TIMEOUT') out.push(v.name + ' → ' + r.trigger.timeout);
    const insts = PP.findAllWithCriteria({ types: ['INSTANCE'] }).length;
    return 'retrasos guardados: ' + (out.join('; ') || 'ninguno') + ' · instancias en Pantallas: ' + insts;
  });

  // 3. Exportar capturas
  await step('Exportar capturas', async () => {
    let n = 0, bytes = 0; const skip = ['Hero A · Convergencia', 'Hero B · Manifiesto', 'Barra A · Barra de datos', 'Barra B · Caja del camión'];
    if (PG) { const g = PG.children.find(c => c.type === 'FRAME'); if (g) { bytes += await sendPNG(g, '00-guia-de-estilos.png', 0.6); n++; } }
    const croot = PC.children.find(c => c.type === 'FRAME' && c.name === 'Componentes');
    if (croot) { let i = 0; for (const grp of croot.children) { if (grp.type !== 'FRAME') continue; i++; bytes += await sendPNG(grp, 'c' + String(i).padStart(2, '0') + '-' + slug(grp.name).slice(0, 50) + '.png', 1); n++; } }
    const sorted = frames.filter(f => !skip.includes(f.name)).sort((a, b) => a.name.localeCompare(b.name, 'es'));
    for (const f of sorted) { const sc = f.height > 2000 ? 0.6 : 0.8; bytes += await sendPNG(f, 'p-' + slug(f.name) + '.png', sc); n++; say('   ' + f.name); }
    return n + ' imágenes, ' + (bytes / 1048576).toFixed(1) + ' MB';
  });
}

main().then(() => { say('Listo.'); figma.ui.postMessage({ type: 'done' }); }).catch(e => { say('✖ Error general: ' + (e && e.message ? e.message : e)); figma.ui.postMessage({ type: 'done' }); });
