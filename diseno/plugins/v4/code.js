// PDOL · v4: logo nuevo, paleta modernizada, sin flechas "→", y los dos detalles pendientes
figma.showUI(__html__, { width: 460, height: 520, title: 'v4 · PDOL' });
figma.ui.onmessage = (m) => { if (m === 'close') figma.closePlugin(); };
const say = (t) => figma.ui.postMessage({ type: 'log', text: t });
async function step(name, fn) { try { const r = await fn(); say('✔ ' + name + (r ? ' · ' + r : '')); } catch (e) { say('✖ ' + name + ' · ' + (e && e.message ? e.message : e)); } }
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
const V = {};
const bound = (name, op) => { const p = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', V[name]); return op != null && op !== 1 ? Object.assign({}, p, { opacity: op }) : p; };
const fill = (name) => [bound(name)];
const inInstance = (n) => { let p = n.parent; while (p && p.type !== 'PAGE') { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
const hexOf = (c) => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const rgb = (h) => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
async function sendPNG(node, name, scale) { const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: scale } }); figma.ui.postMessage({ type: 'file', name, bytes }); return bytes.length; }

// Paleta anterior → nueva (misma estructura de variables)
const OLD = { 'Primary/50': '#E9F9FC', 'Primary/100': '#D2F2F9', 'Primary/200': '#8FDFEF', 'Primary/300': '#36C6E2', 'Primary/400': '#1DACC9', 'Primary/500': '#16869C', 'Primary/600': '#106070', 'Primary/700': '#0A3943', 'Primary/800': '#06262D', 'Primary/900': '#04171B', 'Secondary/100': '#FEF3D7', 'Secondary/300': '#FBCE74', 'Secondary/500': '#F9AB10', 'Secondary/700': '#9F6B04', 'Neutral/50': '#F6F7F8', 'Neutral/100': '#EBEDEF', 'Neutral/200': '#DDE0E4', 'Neutral/300': '#B8BFC7', 'Neutral/400': '#8D99A5', 'Neutral/500': '#5A6672', 'Neutral/600': '#434D56', 'Neutral/700': '#2D3339', 'Neutral/900': '#161A1D', 'Base/Papel': '#F9F8F6', 'Semantic/Exito': '#25935C', 'Semantic/Error': '#D32E22' };
const NEW = { 'Primary/50': '#ECFBFD', 'Primary/100': '#D5F6FB', 'Primary/200': '#A2ECF6', 'Primary/300': '#4FDBEE', 'Primary/400': '#15BFD5', 'Primary/500': '#1196A7', 'Primary/600': '#0D7482', 'Primary/700': '#09535D', 'Primary/800': '#063A41', 'Primary/900': '#04252A', 'Secondary/100': '#FFF0D6', 'Secondary/300': '#FFCB70', 'Secondary/500': '#FFAB1A', 'Secondary/700': '#915108', 'Neutral/50': '#F9FAFB', 'Neutral/100': '#F0F1F4', 'Neutral/200': '#E1E4EA', 'Neutral/300': '#C4C9D4', 'Neutral/400': '#929BB0', 'Neutral/500': '#636E88', 'Neutral/600': '#4D566A', 'Neutral/700': '#333947', 'Neutral/900': '#15181E', 'Base/Papel': '#F7F8FA', 'Base/Blanco': '#FFFFFF', 'Semantic/Exito': '#15803D', 'Semantic/Error': '#DC2626', 'Semantic/Aviso': '#FFAB1A', 'Semantic/Info': '#15BFD5' };

async function main() {
  for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) V[v.name] = v;
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  for (const s of ['Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold']) await figma.loadFontAsync({ family: 'Archivo', style: s });
  try { await figma.loadFontAsync({ family: 'Archivo' }); } catch (e) { }
  for (const s of ['Regular', 'Medium', 'Bold']) await figma.loadFontAsync({ family: 'JetBrains Mono', style: s });
  for (const p of figma.root.children) await p.loadAsync();
  const PG = figma.root.children.find(p => p.name === 'Guía de estilos');
  const PC = figma.root.children.find(p => p.name === 'Componentes');
  const PP = figma.root.children.find(p => p.name === 'Pantallas');
  if (!PC || !PP) throw new Error('No encuentro las páginas Componentes y Pantallas. ¿Es el archivo correcto?');
  const PAGES = [PG, PC, PP].filter(Boolean);
  const frames = PP.children.filter(n => n.type === 'FRAME');
  const sets = PC.findAllWithCriteria({ types: ['COMPONENT_SET'] }); const setBy = (n) => sets.find(s => s.name === n);
  const comps = PC.findAllWithCriteria({ types: ['COMPONENT'] });
  const croot = PC.children.find(c => c.type === 'FRAME' && c.name === 'Componentes');
  say('Archivo cargado. ' + frames.length + ' frames en Pantallas.');

  // 1. Logo nuevo
  let logoSet;
  await step('Logo nuevo: carga consolidada sobre una ruta', async () => {
    await figma.setCurrentPageAsync(PC);
    const g = figma.createFrame(); g.name = 'Logo · carga consolidada'; g.layoutMode = 'VERTICAL'; g.itemSpacing = 12; g.primaryAxisSizingMode = 'AUTO'; g.counterAxisSizingMode = 'AUTO'; g.fills = [];
    const title = figma.createText(); title.fontName = { family: 'Archivo', style: 'SemiBold' }; title.fontSize = 20; title.characters = 'Logo · tres cargas de distinto tamaño encajadas en un mismo camión, sobre una ruta con dos paradas'; g.appendChild(title);
    const row = figma.createFrame(); row.name = 'Variantes'; row.layoutMode = 'HORIZONTAL'; row.itemSpacing = 24; row.primaryAxisSizingMode = 'AUTO'; row.counterAxisSizingMode = 'AUTO'; row.fills = []; g.appendChild(row);
    if (croot) croot.insertChild(1, g); g.layoutSizingHorizontal = 'FILL';
    const mk = (variant) => {
      const dark = variant === 'Oscuro'; const c = figma.createComponent(); c.name = 'Variante=' + variant; c.resize(40, 40); c.cornerRadius = 10; c.fills = fill(dark ? 'Secondary/500' : 'Primary/700'); c.clipsContent = true;
      const r = (name, x, y, w, h, rad, col) => { const n = figma.createRectangle(); n.name = name; n.x = x; n.y = y; n.resize(w, h); n.cornerRadius = rad; n.fills = fill(col); c.appendChild(n); n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; };
      r('Carga A', 7, 8, 15, 15, 2, dark ? 'Primary/700' : 'Primary/300');
      r('Carga B', 23, 8, 10, 9, 2, dark ? 'Neutral/900' : 'Secondary/500');
      r('Carga C', 23, 18, 10, 5, 1.5, dark ? 'Base/Blanco' : 'Base/Blanco');
      const road = figma.createRectangle(); road.name = 'Ruta'; road.x = 8; road.y = 29; road.resize(24, 2); road.cornerRadius = 1; road.fills = fill(dark ? 'Neutral/900' : 'Base/Blanco'); c.appendChild(road); road.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
      for (const x of [5.5, 29.5]) { const e = figma.createEllipse(); e.name = 'Parada'; e.x = x; e.y = 27.5; e.resize(5, 5); e.fills = fill(dark ? 'Neutral/900' : 'Base/Blanco'); c.appendChild(e); e.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; }
      row.appendChild(c); return c;
    };
    const a = mk('Claro'), b = mk('Oscuro');
    logoSet = figma.combineAsVariants([a, b], row); logoSet.name = 'Logo'; logoSet.layoutMode = 'HORIZONTAL'; logoSet.itemSpacing = 24; logoSet.paddingTop = logoSet.paddingBottom = logoSet.paddingLeft = logoSet.paddingRight = 24; logoSet.primaryAxisSizingMode = 'AUTO'; logoSet.counterAxisSizingMode = 'AUTO'; logoSet.fills = fill('Neutral/100'); logoSet.cornerRadius = 8;
    try { logoSet.description = 'Tres cargas de distinto tamaño encajadas sin espacio libre (consolidación) sobre una ruta con dos paradas. Claro: fondos claros. Oscuro: fondos oscuros.'; } catch (e) { }
    // vista ampliada en la guía de componentes
    const big = a.createInstance(); big.resize(120, 120); row.appendChild(big); const big2 = b.createInstance(); big2.resize(120, 120); row.appendChild(big2);
    // reemplazar las marcas viejas en todas las páginas
    let n = 0;
    for (const page of PAGES) for (const old of page.findAll(x => (x.name === 'Marca' || x.name === 'Marca · línea de consolidación') && x.type === 'FRAME' && !inInstance(x))) {
      const tile = old.findOne(x => x.type === 'RECTANGLE' || x.type === 'VECTOR'); let isAmber = false;
      if (tile && Array.isArray(tile.fills) && tile.fills[0] && tile.fills[0].type === 'SOLID') isAmber = tile.fills[0].color.r > 0.9;
      const inst = (isAmber ? b : a).createInstance(); inst.resize(old.width, old.height); inst.name = 'Logo';
      const par = old.parent; par.insertChild(par.children.indexOf(old), inst); old.remove(); n++;
    }
    return n + ' logos reemplazados';
  });

  // 2. Paleta moderna
  await step('Paleta modernizada (variables)', async () => {
    let n = 0; for (const [k, h] of Object.entries(NEW)) { const v = V[k]; if (!v) continue; v.setValueForMode(Object.keys(v.valuesByMode)[0], rgb(h)); n++; } return n + ' variables';
  });

  // 3. Colores sueltos (tramas, mapa, líneas, ticket) enlazados a las variables
  await step('Colores sueltos enlazados a la paleta (tramas, mapa, ticket)', async () => {
    const map = {}; for (const [k, h] of Object.entries(OLD)) map[h] = k; let n = 0;
    const fix = (paints) => { if (!Array.isArray(paints)) return null; let ch = false; const out = paints.map(p => { if (p.type !== 'SOLID' || (p.boundVariables && p.boundVariables.color)) return p; const k = map[hexOf(p.color)]; if (!k) return p; ch = true; return bound(k, p.opacity); }); return ch ? out : null; };
    for (const page of PAGES) for (const node of page.findAll(x => !inInstance(x))) {
      if ('fills' in node) { const f = fix(node.fills); if (f) { node.fills = f; n++; } }
      if ('strokes' in node) { const s = fix(node.strokes); if (s) { node.strokes = s; n++; } }
    }
    return n + ' capas';
  });

  // 4. Guía de estilos: hex y nota de contraste al día
  await step('Guía: códigos hex y nota de contraste', async () => {
    if (!PG) return 'sin guía'; const rev = {}; for (const [k, h] of Object.entries(OLD)) rev[h] = NEW[k]; let n = 0;
    for (const t of PG.findAll(x => x.type === 'TEXT')) {
      if (rev[t.characters]) { t.characters = rev[t.characters]; n++; }
      else if (t.characters.startsWith('Texto blanco sobre Primary/500')) { t.characters = 'Texto blanco sobre Primary/500 da 3.5:1 y no pasa AA. Usa Primary/600 (5.5:1) o más oscuro para botones, enlaces y texto. Secondary/500 (ámbar) solo como fondo con texto Neutral/900 (9.4:1), nunca como texto sobre blanco.'; n++; }
    }
    return n + ' textos';
  });

  // 5. Quitar flechas "→"
  await step('Quitar flechas "→" de textos y propiedades', async () => {
    const clean = (s) => s.replace(/\s*→\s*$/, '').replace(/\s*→\s*/g, ' – ');
    let props = 0, texts = 0;
    for (const s of sets) { const defs = s.componentPropertyDefinitions; for (const [k, d] of Object.entries(defs)) if (d.type === 'TEXT' && String(d.defaultValue).includes('→')) { s.editComponentProperty(k, { defaultValue: clean(String(d.defaultValue)) }); props++; } }
    for (const page of PAGES) for (const inst of page.findAllWithCriteria({ types: ['INSTANCE'] })) {
      if (inInstance(inst)) continue; const p = inst.componentProperties; const pr = {};
      for (const [k, d] of Object.entries(p)) if (d.type === 'TEXT' && String(d.value).includes('→')) pr[k] = clean(String(d.value));
      if (Object.keys(pr).length) { inst.setProperties(pr); props++; }
    }
    for (const page of PAGES) for (const t of page.findAll(x => x.type === 'TEXT' && x.characters.includes('→') && !inInstance(x))) {
      if (t.componentPropertyReferences && t.componentPropertyReferences.characters) continue; t.characters = clean(t.characters); texts++;
    }
    return texts + ' textos, ' + props + ' propiedades';
  });

  // 6. Encabezado "RECOGIDA" completo
  await step('Tabla: columna Recogida con espacio para su encabezado', async () => {
    const Wc = [96, 172, 124, 60, 128]; const fset = setBy('Fila de pedido');
    for (const v of fset.children) v.children.filter(c => c.name === 'Celda').forEach((c, i) => c.resize(Wc[i], c.height));
    const tb = comps.find(c => c.name === 'Tabla de pedidos'); const hr = tb && tb.findOne(x => x.name === 'Encabezado'); if (hr) hr.children.filter(c => c.name === 'Celda').forEach((c, i) => c.resize(Wc[i], c.height));
  });

  // 7. Grupo "Card camión" visible en Componentes
  await step('Componentes: grupo Card camión con alto automático', async () => {
    const g = croot && croot.children.find(c => c.type === 'FRAME' && c.name === 'Card camión'); if (!g) return 'no encontrado';
    if (g.layoutMode === 'NONE') { g.layoutMode = 'VERTICAL'; g.itemSpacing = 12; } g.primaryAxisSizingMode = 'AUTO'; g.counterAxisSizingMode = 'AUTO'; g.clipsContent = false; return Math.round(g.height) + ' px';
  });

  // 8. Exportar para revisión
  await step('Exportar capturas', async () => {
    let n = 0, bytes = 0; const skip = ['Hero A · Convergencia', 'Hero B · Manifiesto', 'Barra A · Barra de datos', 'Barra B · Caja del camión'];
    if (PG) { const g = PG.children.find(c => c.type === 'FRAME'); if (g) { bytes += await sendPNG(g, '00-guia-de-estilos.png', 0.6); n++; } }
    if (croot) { let i = 0; for (const grp of croot.children) { if (grp.type !== 'FRAME') continue; i++; if (!/Logo|Botón|Badge|Segmento|Barra de capacidad ·|Card camión|Tabla|Navegaci|Hero/.test(grp.name)) continue; bytes += await sendPNG(grp, 'c' + String(i).padStart(2, '0') + '-' + slug(grp.name).slice(0, 40) + '.png', 1); n++; } }
    for (const f of frames.filter(f => !skip.includes(f.name)).sort((a, b) => a.name.localeCompare(b.name, 'es'))) { bytes += await sendPNG(f, 'p-' + slug(f.name) + '.png', f.height > 2000 ? 0.6 : 0.8); n++; }
    return n + ' imágenes, ' + (bytes / 1048576).toFixed(1) + ' MB';
  });
}

main().then(() => { say('Listo.'); figma.ui.postMessage({ type: 'done' }); }).catch(e => { say('✖ Error general: ' + (e && e.message ? e.message : e)); figma.ui.postMessage({ type: 'done' }); });
