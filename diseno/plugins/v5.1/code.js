// PDOL · v5.1: fondos translúcidos que salieron sólidos, textos de ayuda en campos y aire en tarjetas
figma.showUI(__html__, { width: 460, height: 520, title: 'v5.1 · PDOL' });
figma.ui.onmessage = (m) => { if (m === 'close') figma.closePlugin(); };
const say = (t) => figma.ui.postMessage({ type: 'log', text: t });
async function step(name, fn) { try { const r = await fn(); say('✔ ' + name + (r ? ' · ' + r : '')); } catch (e) { say('✖ ' + name + ' · ' + (e && e.message ? e.message : e)); } }
const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
async function sendPNG(node, name, scale) { const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: scale } }); figma.ui.postMessage({ type: 'file', name, bytes }); return bytes.length; }
const inInstance = (n) => { let p = n.parent; while (p && p.type !== 'PAGE') { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
const V = {}, VID = {};
const varOf = (p) => { const b = p && p.type === 'SOLID' && p.boundVariables && p.boundVariables.color; return b ? VID[b.id] : null; };
const bound = (name) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', V[name]);
// Pintura sin enlace con opacidad propia: Figma descarta la opacidad de las pinturas enlazadas a variables
const tint = (name, op) => { const v = V[name]; const c = v.valuesByMode[Object.keys(v.valuesByMode)[0]]; return { type: 'SOLID', color: { r: c.r, g: c.g, b: c.b }, opacity: op }; };
const usesVar = (n, name) => { for (const prop of ['fills', 'strokes']) { if (!(prop in n) || !Array.isArray(n[prop])) continue; for (const p of n[prop]) { const v = varOf(p); if (v && v.name === name) return true; } } return false; };

async function main() {
  for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) { V[v.name] = v; VID[v.id] = v; }
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  for (const s of ['Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold']) await figma.loadFontAsync({ family: 'Archivo', style: s });
  try { await figma.loadFontAsync({ family: 'Archivo' }); } catch (e) { }
  for (const s of ['Regular', 'Medium', 'Bold']) await figma.loadFontAsync({ family: 'JetBrains Mono', style: s });
  const S = {}; for (const s of await figma.getLocalTextStylesAsync()) S[s.name] = s;
  for (const p of figma.root.children) await p.loadAsync();
  const PP = figma.root.children.find(p => p.name === 'Pantallas'); if (!PP) throw new Error('No encuentro la página Pantallas');
  await figma.setCurrentPageAsync(PP);
  const frames = PP.children.filter(n => n.type === 'FRAME'); const changed = new Set();
  const top = (n) => { let p = n; while (p.parent && p.parent !== PP) p = p.parent; return p; };

  // 1. Etiquetas, avisos y fondos de ícono en verde o rojo: tinte translúcido
  await step('Etiquetas, aviso y fondos de ícono con tinte translúcido', async () => {
    let n = 0;
    for (const f of frames) for (const node of f.findAll(x => x.type === 'FRAME' && !inInstance(x))) {
      const fl = node.fills; if (!Array.isArray(fl) || fl.length !== 1) continue; const v = varOf(fl[0]); if (!v || (v.name !== 'Semantic/Exito' && v.name !== 'Semantic/Error')) continue;
      const kid = node.findOne(x => x !== node && usesVar(x, v.name)); if (!kid) continue; // el contenido usa el mismo color: es un tinte, no un bloque sólido
      node.fills = [tint(v.name, v.name === 'Semantic/Exito' ? 0.12 : 0.1)]; n++; changed.add(top(node));
    }
    return n + ' capas';
  });

  // 2. Fondos de overlays: opacidad de capa (conserva la variable)
  await step('Fondos de overlays translúcidos', async () => {
    let n = 0;
    for (const o of frames.filter(f => f.name.startsWith('Overlay ·'))) {
      const bg = o.children.find(c => c.name === 'Fondo'); if (!bg || !Array.isArray(bg.fills) || !bg.fills.length) continue; const v = varOf(bg.fills[0]); if (!v) continue;
      bg.fills = [bound(v.name)]; bg.opacity = v.name === 'Base/Blanco' ? 0.01 : o.name.includes('Vista rápida') ? 0.35 : 0.45; n++; changed.add(o);
    }
    return n + ' overlays';
  });

  // 3. Textos de ayuda que el componente Input no muestra
  await step('Textos de ayuda bajo los campos', async () => {
    const HELP = { 'Campo · RNC': ['Para cambiarlo, escribe a soporte.', 'Neutral/500'], 'Campo · Correo de la cuenta': ['Correo verificado', 'Semantic/Exito'], 'Campo · Confirmar nueva contraseña': ['Las contraseñas coinciden', 'Semantic/Exito'] };
    let n = 0;
    for (const f of frames) for (const inst of f.findAll(x => x.type === 'INSTANCE' && HELP[x.name] && !inInstance(x))) {
      const [txt, col] = HELP[inst.name]; if (inst.findAll(t => t.type === 'TEXT' && t.visible).some(t => t.characters === txt)) continue;
      const par = inst.parent; if (!par || par.name === 'Campo con ayuda') continue; const idx = par.children.indexOf(inst); const wasFill = inst.layoutSizingHorizontal === 'FILL';
      const w = figma.createFrame(); w.name = 'Campo con ayuda'; w.layoutMode = 'VERTICAL'; w.itemSpacing = 6; w.primaryAxisSizingMode = 'AUTO'; w.counterAxisSizingMode = 'AUTO'; w.fills = []; w.clipsContent = false;
      par.insertChild(idx, w); if (wasFill) w.layoutSizingHorizontal = 'FILL'; w.appendChild(inst); inst.layoutSizingHorizontal = 'FILL';
      const t = figma.createText(); await t.setTextStyleIdAsync(S['Texto/12'].id); t.characters = txt; t.fills = [bound(col)]; t.name = 'Ayuda'; w.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT';
      n++; changed.add(f);
    }
    return n + ' campos';
  });

  // 4. Aire entre el encabezado de tarjeta y la primera fila en tarjetas de lista
  await step('Espacio bajo el encabezado de las tarjetas de lista', async () => {
    let n = 0;
    for (const f of frames) for (const h of f.findAll(x => x.type === 'FRAME' && x.name === 'Encabezado de tarjeta' && !inInstance(x))) { if (h.parent && h.parent.itemSpacing === 4 && h.paddingBottom < 8) { h.paddingBottom = 8; n++; changed.add(f); } }
    return n + ' tarjetas';
  });

  // 5. Verificación
  await step('Verificación', async () => {
    let solid = 0;
    for (const f of frames) for (const node of f.findAll(x => x.type === 'FRAME' && (x.name.startsWith('Etiqueta · ') || x.name === 'Aviso · activada') && !inInstance(x))) { const p = node.fills && node.fills[0]; const v = varOf(p); if (v && (v.name === 'Semantic/Exito' || v.name === 'Semantic/Error')) solid++; }
    return solid ? solid + ' etiquetas siguen sólidas' : 'ninguna etiqueta verde o roja quedó sólida';
  });

  await step('Exportar capturas', async () => {
    let n = 0, b = 0; for (const f of [...changed].sort((a, c) => a.name.localeCompare(c.name, 'es'))) { b += await sendPNG(f, 'v51-' + slug(f.name) + '.png', f.height > 1800 ? 0.6 : 0.8); n++; }
    return n + ' imágenes, ' + (b / 1048576).toFixed(1) + ' MB';
  });
}
main().then(() => { say('Listo.'); figma.ui.postMessage({ type: 'done' }); }).catch(e => { say('✖ Error general: ' + (e && e.message ? e.message : e)); figma.ui.postMessage({ type: 'done' }); });
