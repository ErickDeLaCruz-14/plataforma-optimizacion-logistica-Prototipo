// PDOL · Revisión v3: correcciones detectadas en las capturas + exportar de nuevo
figma.showUI(__html__, { width: 460, height: 520, title: 'Revisión v3 · PDOL' });
figma.ui.onmessage = (m) => { if (m === 'close') figma.closePlugin(); };
const say = (t) => figma.ui.postMessage({ type: 'log', text: t });
async function step(name, fn) { try { const r = await fn(); say('✔ ' + name + (r ? ' · ' + r : '')); } catch (e) { say('✖ ' + name + ' · ' + (e && e.message ? e.message : e)); } }
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
const V = {};
const fill = (name) => [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', V[name])];
const inInstance = (n) => { let p = n.parent; while (p && p.type !== 'PAGE') { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
const recolor = (node, name) => { for (const v of node.findAll(x => 'strokes' in x && x.strokes.length)) v.strokes = fill(name); };
async function sendPNG(node, name, scale) { const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: scale } }); figma.ui.postMessage({ type: 'file', name, bytes }); return bytes.length; }

async function main() {
  for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) V[v.name] = v;
  for (const s of ['Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold']) await figma.loadFontAsync({ family: 'Archivo', style: s });
  try { await figma.loadFontAsync({ family: 'Archivo' }); } catch (e) { }
  for (const s of ['Regular', 'Medium', 'Bold']) await figma.loadFontAsync({ family: 'JetBrains Mono', style: s });
  for (const p of figma.root.children) await p.loadAsync();
  const PG = figma.root.children.find(p => p.name === 'Guía de estilos');
  const PC = figma.root.children.find(p => p.name === 'Componentes');
  const PP = figma.root.children.find(p => p.name === 'Pantallas');
  if (!PC || !PP) throw new Error('No encuentro las páginas Componentes y Pantallas. ¿Es el archivo correcto?');
  const frames = PP.children.filter(n => n.type === 'FRAME');
  const sets = PC.findAllWithCriteria({ types: ['COMPONENT_SET'] }); const setBy = (n) => sets.find(s => s.name === n);
  const comps = PC.findAllWithCriteria({ types: ['COMPONENT'] });
  say('Archivo cargado. ' + frames.length + ' frames en Pantallas.');

  // 1. Íconos del sidebar
  await step('Sidebar: color de íconos (activo ámbar, inactivo gris claro)', async () => {
    const navSet = setBy('Nav item'); let n = 0;
    for (const inst of PP.findAllWithCriteria({ types: ['INSTANCE'] })) {
      const m = await inst.getMainComponentAsync(); if (!m || m.parent !== navSet) continue;
      const ico = inst.children.find(c => c.type === 'INSTANCE'); if (!ico) continue;
      recolor(ico, m.name.includes('Activo=Sí') ? 'Secondary/500' : 'Neutral/300'); n++;
    }
    return n + ' ítems';
  });

  // 2. Espaciadores vacíos de 100 px
  await step('Filas: quitar espaciadores vacíos de 100 px de alto', async () => {
    let n = 0;
    for (const page of [PC, PP]) {
      const list = page.findAll(f => f.type === 'FRAME' && f.children.length === 0 && f.height >= 90 && f.parent && f.parent.layoutMode === 'HORIZONTAL' && Array.isArray(f.fills) && f.fills.length === 0 && (!f.strokes || f.strokes.length === 0) && !inInstance(f));
      for (const f of list) { const h = f.layoutSizingHorizontal; f.resize(f.width, 1); f.layoutSizingVertical = 'FIXED'; if (h === 'FILL') f.layoutSizingHorizontal = 'FILL'; n++; }
    }
    return n + ' espaciadores';
  });

  // 3. Columnas de la fila de pedido y trayecto truncado
  await step('Fila de pedido: columnas y trayecto con "…" si no cabe', async () => {
    const Wc = [96, 172, 124, 52, 136]; const fset = setBy('Fila de pedido'); if (!fset) throw new Error('falta Fila de pedido');
    for (const v of fset.children) {
      v.children.filter(c => c.name === 'Celda').forEach((c, i) => { c.resize(Wc[i], c.height); });
      const t = v.findOne(x => x.type === 'TEXT' && x.name === 'Trayecto'); if (t) { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; t.textTruncation = 'ENDING'; t.maxLines = 1; }
    }
    const tb = comps.find(c => c.name === 'Tabla de pedidos'); const hr = tb && tb.findOne(x => x.name === 'Encabezado'); if (hr) hr.children.filter(c => c.name === 'Celda').forEach((c, i) => c.resize(Wc[i], c.height));
  });

  // 4. Card de camión aplastada
  await step('Mis camiones: cards con su alto natural', async () => {
    const card = comps.find(c => c.name === 'Card camión' && c.parent.type !== 'COMPONENT_SET'); if (!card) throw new Error('falta Card camión');
    if (card.layoutMode === 'VERTICAL') card.primaryAxisSizingMode = 'AUTO'; else if (card.layoutMode === 'HORIZONTAL') card.counterAxisSizingMode = 'AUTO';
    card.clipsContent = false;
    const insts = await card.getInstancesAsync(); for (const i of insts) { try { i.layoutSizingVertical = 'HUG'; } catch (e) { } }
    return insts.length + ' cards · alto ' + Math.round(card.height) + ' px';
  });

  // 5. Etiquetas cortas en segmentos angostos y miles con coma
  await step('Segmentos: etiqueta corta cuando no cabe la larga, miles con coma', async () => {
    const segSet = setBy('Segmento de carga'); const defs = segSet.componentPropertyDefinitions; const key = pre => Object.keys(defs).find(k => k.startsWith(pre));
    const L = key('Etiqueta#'), B = key('Mostrar etiqueta#'); let shortN = 0, milesN = 0;
    for (const page of [PC, PP]) for (const inst of page.findAllWithCriteria({ types: ['INSTANCE'] })) {
      if (inInstance(inst)) continue; const m = await inst.getMainComponentAsync(); if (!m || m.parent !== segSet) continue;
      const p = inst.componentProperties; let lab = p[L] ? String(p[L].value) : ''; let show = p[B] ? !!p[B].value : false; const pr = {};
      const fixed = lab.replace(/^LIBRE (\d)(\d{3})$/, 'LIBRE $1,$2'); if (fixed !== lab) { lab = fixed; pr[L] = lab; milesN++; }
      if (!show && lab && inst.visible && inst.height >= 24) { const s = lab.split(' ')[0]; if (inst.width >= s.length * 7.4 + 16) { pr[L] = s; pr[B] = true; shortN++; } }
      if (Object.keys(pr).length) inst.setProperties(pr);
    }
    return shortN + ' etiquetas cortas, ' + milesN + ' cifras con coma';
  });

  // 6. Textos cortados dentro de tarjetas
  await step('Textos que se cortaban: ocupan el ancho de su tarjeta', async () => {
    let n = 0;
    for (const f of frames) for (const t of f.findAll(x => x.type === 'TEXT' && x.textAutoResize === 'HEIGHT' && x.parent && x.parent.layoutMode === 'VERTICAL' && !inInstance(x))) {
      const p = t.parent; const inner = p.width - p.paddingLeft - p.paddingRight; if (t.width > inner + 0.5) { t.layoutSizingHorizontal = 'FILL'; n++; }
    }
    return n + ' textos';
  });

  // 7. Diagnóstico de retrasos
  await step('Diagnóstico de animaciones', async () => {
    const out = [];
    for (const f of frames) for (const r of (f.reactions || [])) if (r.trigger && r.trigger.type === 'AFTER_TIMEOUT') out.push(f.name + ' → ' + r.trigger.timeout);
    const hs = setBy('Hero · manifiesto animado'); if (hs) for (const v of hs.children) for (const r of (v.reactions || [])) if (r.trigger && r.trigger.type === 'AFTER_TIMEOUT') out.push(v.name + ' → ' + r.trigger.timeout);
    return out.join('; ') || 'sin retrasos';
  });

  // 8. Exportar para revisión
  await step('Exportar capturas', async () => {
    let n = 0, bytes = 0; const skip = ['Hero A · Convergencia', 'Hero B · Manifiesto', 'Barra A · Barra de datos', 'Barra B · Caja del camión'];
    const croot = PC.children.find(c => c.type === 'FRAME' && c.name === 'Componentes');
    if (croot) { let i = 0; for (const grp of croot.children) { if (grp.type !== 'FRAME') continue; i++; if (!/Fila|Tabla|Card cami|Hero|Demo|Segmento|Navegaci/.test(grp.name)) continue; bytes += await sendPNG(grp, 'c' + String(i).padStart(2, '0') + '-' + slug(grp.name).slice(0, 50) + '.png', 1); n++; } }
    for (const f of frames.filter(f => !skip.includes(f.name)).sort((a, b) => a.name.localeCompare(b.name, 'es'))) { bytes += await sendPNG(f, 'p-' + slug(f.name) + '.png', f.height > 2000 ? 0.6 : 0.8); n++; }
    return n + ' imágenes, ' + (bytes / 1048576).toFixed(1) + ' MB';
  });
}

main().then(() => { say('Listo.'); figma.ui.postMessage({ type: 'done' }); }).catch(e => { say('✖ Error general: ' + (e && e.message ? e.message : e)); figma.ui.postMessage({ type: 'done' }); });
