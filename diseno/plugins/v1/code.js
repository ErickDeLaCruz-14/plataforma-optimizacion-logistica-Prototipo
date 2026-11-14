// Plataforma Digital de Optimización Logística · completar diseño
// Plugin de desarrollo: corre una sola vez sobre el archivo "Plataforma Digital de Optimización Logística — UI".
figma.showUI(__html__, { width: 460, height: 540, title: 'Completar diseño · PDOL' });
figma.ui.onmessage = (m) => { if (m === 'close') figma.closePlugin(); };
const LOG = [];
const say = (m) => { LOG.push(m); figma.ui.postMessage({ type: 'log', text: m }); };

// ---------- base ----------
const K = { p9: 'Primary/900', p7: 'Primary/700', p6: 'Primary/600', p5: 'Primary/500', p4: 'Primary/400', p3: 'Primary/300', p1: 'Primary/100', p0: 'Primary/50', s5: 'Secondary/500', s3: 'Secondary/300', s1: 'Secondary/100', n9: 'Neutral/900', n7: 'Neutral/700', n6: 'Neutral/600', n5: 'Neutral/500', n4: 'Neutral/400', n3: 'Neutral/300', n2: 'Neutral/200', n1: 'Neutral/100', n0: 'Neutral/50', pa: 'Base/Papel', w: 'Base/Blanco', ok: 'Semantic/Exito', er: 'Semantic/Error' };
const ST = { d61: 'Display/61', d49: 'Display/49', d39: 'Display/39', t31: 'Título/31', t25: 'Título/25', t20: 'Título/20', b20: 'Texto/20', b16: 'Texto/16', b16m: 'Texto/16 Medium', b16s: 'Texto/16 SemiBold', b14: 'Texto/14', b14s: 'Texto/14 SemiBold', b12: 'Texto/12', m25: 'Dato/25', m20: 'Dato/20', m14: 'Dato/14', m12b: 'Dato/12 Bold', m12: 'Dato/12' };
const V = {}, S = {}, CM = {}, F = {};
let PCOMP, PPANT, SEGKEYS;
const fill = (k, op) => { const p = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', V[K[k]]); return [op != null ? Object.assign({}, p, { opacity: op }) : p]; };
async function T(str, st, c, o = {}) { const t = figma.createText(); await t.setTextStyleIdAsync(S[ST[st]].id); t.characters = str; t.fills = fill(c); if (o.ls) t.letterSpacing = { unit: 'PERCENT', value: o.ls }; if (o.name) t.name = o.name; if (o.w) { t.resize(o.w, t.height); t.textAutoResize = 'HEIGHT'; } return t; }
function AL(dir, o = {}) {
  const f = figma.createFrame(); f.layoutMode = dir === 'V' ? 'VERTICAL' : 'HORIZONTAL'; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO'; f.clipsContent = false;
  f.fills = o.fill ? fill(o.fill, o.op) : []; f.itemSpacing = o.gap != null ? o.gap : 0;
  if (o.pad != null) { const p = typeof o.pad === 'number' ? [o.pad, o.pad, o.pad, o.pad] : o.pad.length === 2 ? [o.pad[0], o.pad[1], o.pad[0], o.pad[1]] : o.pad; f.paddingTop = p[0]; f.paddingRight = p[1]; f.paddingBottom = p[2]; f.paddingLeft = p[3]; }
  if (o.name) f.name = o.name; if (o.r != null) f.cornerRadius = o.r; if (o.stroke) { f.strokes = fill(o.stroke); f.strokeWeight = o.sw || 1; }
  if (o.main) f.primaryAxisAlignItems = o.main; if (o.cross) f.counterAxisAlignItems = o.cross; if (o.minH) f.minHeight = o.minH;
  if (o.w) { f.resize(o.w, Math.max(f.height, 1)); if (dir === 'V') { f.counterAxisSizingMode = 'FIXED'; f.primaryAxisSizingMode = 'AUTO'; } else { f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'AUTO'; } }
  return f;
}
const add = (p, c, h, v) => { p.appendChild(c); if (h) c.layoutSizingHorizontal = h; if (v) c.layoutSizingVertical = v; return c; };
const svgN = (w, h, inner, name) => { const n = figma.createNodeFromSvg(`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`); n.name = name; return n; };
const icon = (n, col, sz = 20) => { const i = CM['Ícono/' + n].createInstance(); i.resize(sz, sz); recolor(i, col); return i; };
const recolor = (inst, col) => { for (const v of inst.findAll(x => 'strokes' in x && x.strokes.length)) v.strokes = fill(col); };
const skel = (w, h = 12) => { const i = CM['Skeleton/Forma=Bloque'].createInstance(); i.resize(w, h); return i; };
const split = (tot, ps) => { const out = []; let u = 0; ps.forEach((p, i) => { const w = i === ps.length - 1 ? tot - u : Math.round(tot * p / 100); u += w; out.push(w); }); return out; };
const replaceNode = (oldN, newN, sizing) => { const par = oldN.parent; const idx = par.children.indexOf(oldN); par.insertChild(idx, newN); if (sizing && 'layoutMode' in par && par.layoutMode !== 'NONE') newN.layoutSizingHorizontal = sizing; oldN.remove(); return newN; };
const TR = { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.2 };
async function react(node, reactions) { await node.setReactionsAsync(reactions); }
const nav = (dest, nv = 'NAVIGATE', tr = null) => ({ type: 'NODE', destinationId: dest.id, navigation: nv, transition: tr, preserveScrollPosition: false });

async function step(name, fn) { try { const r = await fn(); say('✔ ' + name + (r ? ' · ' + r : '')); } catch (e) { say('✖ ' + name + ' · ' + (e && e.message ? e.message : e)); } }

// ---------- segmento y camión ----------
function SEG(p, w, h, lab, tt, td) {
  const main = CM[`Segmento de carga/Patrón=${p}, Estado=Default`]; const i = main.createInstance();
  i.resize(Math.max(w, 1), h); const pr = {}; pr[SEGKEYS.L] = lab || ''; pr[SEGKEYS.B] = !!lab && w >= 78 && h >= 24; if (tt) pr[SEGKEYS.T] = tt; if (td) pr[SEGKEYS.D] = td; i.setProperties(pr);
  i.name = 'Seg · ' + p; if (w <= 0) i.visible = false; return i;
}
async function truck(W, rows, h, name) {
  const tr = AL('V', { name: name || 'Barra de capacidad · camión' }); const tk = AL('H', { name: 'Camión', cross: 'MAX' }); tr.appendChild(tk);
  const box = AL('V', { name: 'Caja', fill: 'n0', stroke: 'n9', sw: 2, pad: 8, gap: 8 }); box.topLeftRadius = 6; box.bottomLeftRadius = 6; tk.appendChild(box);
  for (const row of rows) {
    const visible = row.segs.filter(s => s[1] > 0).length; const av = W - 152 - (visible - 1) * 4;
    const r = AL('H', { name: row.unit, gap: 4, cross: 'CENTER' }); const u = await T(row.unit, 'm12b', 'n6'); r.appendChild(u); u.resize(32, u.height); u.textAutoResize = 'HEIGHT';
    const ws = split(av, row.segs.map(s => s[1])); row.segs.forEach((s, i) => r.appendChild(SEG(s[0], s[1] > 0 ? ws[i] : 0, h, s[2], s[3], s[4]))); box.appendChild(r);
  }
  const ch = rows.length * h + (rows.length - 1) * 8 + 16; const cab = figma.createFrame(); cab.name = 'Cabina'; cab.resize(88, ch); cab.fills = fill('n7'); cab.topRightRadius = Math.min(18, ch / 3); cab.bottomRightRadius = 6;
  const win = figma.createRectangle(); win.name = 'Ventana'; win.resize(36, Math.min(24, ch * 0.35)); win.fills = fill('p1'); win.cornerRadius = 3; cab.appendChild(win); win.x = 40; win.y = 8; tk.appendChild(cab);
  const wh = figma.createFrame(); wh.name = 'Ruedas'; wh.resize(W, 14); wh.fills = []; wh.clipsContent = false;
  for (const x of [56, W - 236, W - 60]) { const e = figma.createEllipse(); e.name = 'Rueda'; e.resize(24, 24); e.fills = fill('n9'); e.strokes = fill('w'); e.strokeWeight = 4; wh.appendChild(e); e.x = x; e.y = -10; }
  tr.appendChild(wh); return tr;
}
function compactBar(W, segs) {
  const t = AL('H', { name: 'Barra compacta', cross: 'MAX' }); const box = AL('H', { stroke: 'n9', sw: 1.5, pad: 2, gap: 1, name: 'Caja', fill: 'w' }); box.topLeftRadius = 3; box.bottomLeftRadius = 3; t.appendChild(box);
  const vis = segs.filter(s => s[1] > 0).length; const av = W - 22 - 4 - (vis - 1); const ws = split(av, segs.map(s => s[1]));
  segs.forEach((s, i) => box.appendChild(SEG(s[0], s[1] > 0 ? ws[i] : 0, 12, '', s[2], s[3])));
  const cab = figma.createFrame(); cab.name = 'Cabina'; cab.resize(18, 19); cab.fills = fill('n7'); cab.topRightRadius = 7; cab.bottomRightRadius = 2; t.appendChild(cab); return t;
}
const perf = (top, w = 520) => { let c = ''; for (let k = 0; k < Math.ceil(w / 20); k++) c += `<circle cx="${10 + 20 * k}" cy="${top ? 0 : 12}" r="6" fill="#161A1D"/>`; const n = svgN(w, 12, `<rect width="${w}" height="12" fill="#F9F8F6"/>${c}`, 'Borde perforado'); n.clipsContent = true; return n; };
async function badgeSim() { const b = AL('H', { fill: 's5', r: 4, pad: [4, 8], name: 'Badge · datos simulados' }); b.appendChild(await T('DATOS SIMULADOS', 'm12b', 'n9')); return b; }

// ---------- init ----------
async function init() {
  for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) V[v.name] = v;
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  for (const s of ['Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold']) await figma.loadFontAsync({ family: 'Archivo', style: s });
  try { await figma.loadFontAsync({ family: 'Archivo' }); } catch (e) { /* estilos ya cargados */ }
  for (const s of ['Regular', 'Medium', 'Bold']) await figma.loadFontAsync({ family: 'JetBrains Mono', style: s });
  for (const s of await figma.getLocalTextStylesAsync()) S[s.name] = s;
  for (const p of figma.root.children) await p.loadAsync();
  PCOMP = figma.root.children.find(p => p.name === 'Componentes'); PPANT = figma.root.children.find(p => p.name === 'Pantallas');
  if (!PCOMP || !PPANT) throw new Error('No encuentro las páginas Componentes y Pantallas. ¿Es el archivo correcto?');
  refreshCM();
  const segSet = CM['Segmento de carga/Patrón=Tuyo, Estado=Default'].parent; const defs = segSet.componentPropertyDefinitions; const key = pre => Object.keys(defs).find(k => k.startsWith(pre));
  SEGKEYS = { L: key('Etiqueta#'), T: key('Tooltip título#'), D: key('Tooltip detalle#'), B: key('Mostrar etiqueta#') };
  for (const f of PPANT.children) if (f.type === 'FRAME') F[f.name] = f;
}
function refreshCM() { for (const n of PCOMP.findAllWithCriteria({ types: ['COMPONENT'] })) CM[(n.parent && n.parent.type === 'COMPONENT_SET' ? n.parent.name + '/' : '') + n.name] = n; }
const S_ = {
  landing: '01 · Landing', reg: '02 · Registro', login: '03 · Inicio de sesión', rec: '04 · Recuperar contraseña', ep: '05 · Empresa · Panel', nuevo: '06 · Empresa · Nuevo pedido', ev: '07a · Empresa · Evaluando rutas', asig: '07b · Empresa · Pedido asignado', mis: '08 · Empresa · Mis pedidos', res: '09a · Empresa · Detalle · Resumen', plan: '09b · Empresa · Detalle · Plan de ruta', recibo: '09c · Empresa · Detalle · Recibo', eperf: '10 · Empresa · Perfil', tp: '11 · Transportista · Panel', cam: '12 · Transportista · Mis camiones', ruta: '13 · Transportista · Ruta asignada', tperf: '14 · Transportista · Perfil', mail: '15 · Correo de notificación'
};
const FR = k => { const f = F[S_[k] || k]; if (!f) throw new Error('Falta la pantalla ' + (S_[k] || k)); return f; };

async function main() {
  await init(); say('Archivo cargado. ' + Object.keys(F).length + ' frames en Pantallas.');
  await figma.setCurrentPageAsync(PCOMP);
  const croot = await figma.getNodeByIdAsync('10:2');
  const group = async t => { const g = AL('V', { gap: 12, name: t }); g.appendChild(await T(t, 't20', 'n9')); croot.appendChild(g); g.layoutSizingHorizontal = 'FILL'; return g; };
  const styleSet = (s, dir) => { s.layoutMode = dir || 'HORIZONTAL'; s.itemSpacing = 40; s.counterAxisAlignItems = 'MIN'; s.paddingTop = s.paddingBottom = s.paddingLeft = s.paddingRight = 24; s.primaryAxisSizingMode = 'AUTO'; s.counterAxisSizingMode = 'AUTO'; s.fills = fill('n9'); s.strokes = fill('p3'); s.dashPattern = [6, 4]; s.cornerRadius = 8; s.clipsContent = false; };

  // 1. Tabla: anchos de columna
  await step('Tabla de pedidos: columnas ajustadas a 1280 px', async () => {
    const Wc = [96, 156, 124, 60, 144]; const fset = CM['Fila de pedido/Estado=Default'].parent;
    for (const v of fset.children) { v.itemSpacing = 8; v.children.filter(c => c.name === 'Celda').forEach((c, i) => c.resize(Wc[i], c.height)); }
    const tb = CM['Tabla de pedidos']; const hr = tb.findOne(n => n.name === 'Encabezado'); hr.itemSpacing = 8; hr.children.filter(c => c.name === 'Celda').forEach((c, i) => c.resize(Wc[i], c.height));
  });

  // 2. Hero animado
  let heroSet;
  await step('Hero · manifiesto animado (34 % → 62 % → 91 %)', async () => {
    const g = await group('Hero · manifiesto animado (After delay + Smart animate)'); const row = AL('H', { gap: 40 }); add(g, row);
    const DATA = { 1: { ped: 1, emp: 1, pct: 34, segs: [34, 0, 0, 0, 66], on: [1, 0, 0, 0] }, 2: { ped: 2, emp: 2, pct: 62, segs: [34, 28, 0, 0, 38], on: [1, 1, 0, 0] }, 3: { ped: 4, emp: 4, pct: 91, segs: [34, 28, 17, 12, 9], on: [1, 1, 1, 1] } };
    const O = [['Haina', 14], ['Herrera', 44], ['Los Alcarrizos', 76], ['Villa Mella', 106]];
    const SG = [['Tuyo', 'A', 'Empresa A', '1,700 kg · sale de Haina'], ['Empresa B', 'B', 'Empresa B', '1,400 kg · sale de Herrera'], ['Empresa C', 'C', 'Empresa C', '850 kg · sale de Los Alcarrizos'], ['Empresa D', 'D', 'Empresa D', '600 kg · sale de Villa Mella'], ['Libre', 'LIBRE', 'Capacidad libre', 'espacio disponible en el camión']];
    const comps = [];
    for (const stp of [1, 2, 3]) {
      const D = DATA[stp]; const tk = AL('V', { name: 'Manifiesto de ruta' }); tk.appendChild(perf(true));
      const b = AL('V', { fill: 'pa', pad: [20, 28, 24, 28], gap: 14, w: 520, name: 'Cuerpo' }); tk.appendChild(b);
      const h = AL('H', { main: 'SPACE_BETWEEN', cross: 'CENTER' }); add(b, h, 'FILL'); h.appendChild(await T('MANIFIESTO DE RUTA', 'm14', 'n9', { ls: 6 })); h.appendChild(await badgeSim());
      b.appendChild(await T('R-0031', 'd39', 'n9'));
      const dg = figma.createFrame(); dg.name = 'Convergencia'; dg.resize(464, 120); dg.fills = []; dg.clipsContent = false;
      for (let i = 0; i < 4; i++) { const y = O[i][1]; const ln = svgN(464, 120, `<path d="M124 ${y} C200 ${y} 210 60 260 60" stroke="#434D56" stroke-width="2.5" stroke-dasharray="8 6" stroke-linecap="round"/><circle cx="124" cy="${y}" r="5" fill="#FFFFFF" stroke="#161A1D" stroke-width="2"/>`, 'Ruta ' + O[i][0]); dg.appendChild(ln); ln.x = 0; ln.y = 0; ln.opacity = D.on[i] ? 1 : 0.15; const t = await T(O[i][0].toUpperCase(), 'm12b', 'n9', { name: 'Origen ' + O[i][0] }); dg.appendChild(t); t.x = 112 - t.width; t.y = Math.round(y - t.height / 2); t.opacity = D.on[i] ? 1 : 0.35; }
      const trunk = svgN(464, 120, '<path d="M260 60 H452" stroke="#106070" stroke-width="5" stroke-linecap="round"/><circle cx="260" cy="60" r="8" fill="#F9AB10" stroke="#161A1D" stroke-width="2"/><circle cx="452" cy="60" r="6" fill="#0A3943"/>', 'Tronco'); dg.appendChild(trunk); trunk.x = 0; trunk.y = 0;
      const zf = await T('ZF LAS AMÉRICAS', 'm12b', 'n9'); dg.appendChild(zf); zf.x = 452 - zf.width; zf.y = 34; b.appendChild(dg);
      const cnt = AL('H', { gap: 24 }); add(b, cnt, 'FILL'); for (const [k, v] of [['PEDIDOS', D.ped], ['EMPRESAS', D.emp]]) { const c = AL('H', { main: 'SPACE_BETWEEN' }); c.appendChild(await T(k, 'm14', 'n6')); c.appendChild(await T(String(v), 'm14', 'n9', { name: 'Valor ' + k })); add(cnt, c, 'FILL'); }
      const cap = AL('H', { main: 'SPACE_BETWEEN', cross: 'CENTER' }); add(b, cap, 'FILL'); cap.appendChild(await T('CAPACIDAD OCUPADA', 'm14', 'n6')); cap.appendChild(await T(D.pct + ' %', 'm25', 'n9', { name: 'Valor ocupación' }));
      b.appendChild(await truck(464, [{ unit: 'KG', segs: SG.map((s, i) => [s[0], D.segs[i], s[1], s[2], s[3]]) }], 28));
      b.appendChild(await T('COSTO REPARTIDO POR TON-KM ENTRE LOS PEDIDOS', 'm12', 'n6'));
      tk.appendChild(perf(false)); row.appendChild(tk); const c = figma.createComponentFromNode(tk); c.name = 'Paso=' + stp; comps.push(c);
    }
    heroSet = figma.combineAsVariants(comps, row); heroSet.name = 'Hero · manifiesto animado'; styleSet(heroSet);
    const errs = [];
    for (const [a, b] of [[0, 1], [1, 2]]) { try { await react(comps[a], [{ trigger: { type: 'AFTER_TIMEOUT', timeout: 0.8 }, actions: [nav(comps[b], 'CHANGE_TO', { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.6 })] }]); } catch (e) { errs.push(e.message); } }
    try { heroSet.annotations = [{ label: 'En producción: animación ligada al scroll. Los pedidos convergen y la barra pasa de 34 % a 91 %. Con prefers-reduced-motion se muestra el Paso 3 estático. En el prototipo corre sola con After delay.' }]; } catch (e) { }
    return errs.length ? 'interacciones con error: ' + errs.join('; ') : '3 pasos con After delay';
  });

  // 3. Demo interactiva
  let demoSet;
  await step('Demo · Envío individual / Consolidado', async () => {
    const g = await group('Demo interactiva · Envío individual / Consolidado'); const row = AL('V', { gap: 40 }); add(g, row);
    const ROWS = [{ unit: 'KG', segs: [['Tuyo', 24, 'A 1,200', 'Empresa A', '1,200 kg · 4.5 m³'], ['Empresa B', 28, 'B 1,400', 'Empresa B', '1,400 kg · 6.0 m³'], ['Empresa C', 20, 'C 1,000', 'Empresa C', '1,000 kg · 3.5 m³'], ['Libre', 28, 'LIBRE 1,400', 'Capacidad libre', '1,400 kg disponibles']] }, { unit: 'M³', segs: [['Tuyo', 18.75, 'A 4.5', 'Empresa A', '1,200 kg · 4.5 m³'], ['Empresa B', 25, 'B 6.0', 'Empresa B', '1,400 kg · 6.0 m³'], ['Empresa C', 14.58, 'C 3.5', 'Empresa C', '1,000 kg · 3.5 m³'], ['Libre', 41.67, 'LIBRE 10.0', 'Capacidad libre', '10.0 m³ disponibles']] }];
    const comps = {};
    for (const mode of ['Consolidado', 'Individual']) {
      const ind = mode === 'Individual'; const d = AL('V', { gap: 24, w: 1120, name: 'Demo' });
      const sw = AL('H', { name: 'Switch', fill: 'n7', r: 6, pad: 4, gap: 4 });
      const o1 = AL('H', { pad: [10, 16], r: 4, fill: ind ? 's5' : null, name: 'Opción individual' }); o1.appendChild(await T('Envío individual', 'b16s', ind ? 'n9' : 'n3'));
      const o2 = AL('H', { pad: [10, 16], r: 4, fill: ind ? null : 's5', name: 'Opción consolidado' }); o2.appendChild(await T('Consolidado', 'b16s', ind ? 'n3' : 'n9'));
      sw.appendChild(o1); sw.appendChild(o2); d.appendChild(sw);
      const gm = AL('H', { gap: 24, name: 'Métricas' }); add(d, gm, 'FILL');
      const met = async (k, big, cmp) => { const c = AL('V', { fill: 'n7', r: 10, pad: 24, gap: 8, name: k }); add(gm, c, 'FILL'); c.appendChild(await T(k, 'm12b', 'n3', { ls: 8 })); c.appendChild(await T(big, 'd39', 'pa', { name: 'Valor' })); c.appendChild(await T(cmp, 'm14', 'n3', { name: 'Comparación' })); return c; };
      await met('KM RECORRIDOS', ind ? '115 km' : '96 km', ind ? 'consolidado: 96 km' : '−19 km vs. individual');
      await met('CAMIONES USADOS', ind ? '3' : '1', ind ? 'consolidado: 1' : '−2 vs. individual');
      const c3 = await met('COSTO TOTAL', ind ? 'RD$ 7,360' : 'RD$ 6,144', ind ? 'consolidado: RD$ 6,144' : '−RD$ 1,216 vs. individual');
      for (const [e, a, b] of [['Empresa A', '2,880.00', '2,369.83'], ['Empresa B', '2,560.00', '2,457.60'], ['Empresa C', '1,920.00', '1,316.57']]) { const r = AL('H', { main: 'SPACE_BETWEEN', name: e }); add(c3, r, 'FILL'); r.appendChild(await T(e, 'b14', 'n3')); r.appendChild(await T('RD$ ' + (ind ? a : b), 'm14', 'pa', { name: 'Costo ' + e })); }
      const tc = AL('V', { fill: 'w', r: 10, pad: 24, gap: 16, name: 'Camiones' }); add(d, tc, 'FILL');
      if (!ind) { tc.appendChild(await T('1 CAMIÓN · L-284519 · 5,000 KG · 24 M³ · 72 % DE PESO OCUPADO', 'm12b', 'n6', { name: 'Leyenda camiones' })); tc.appendChild(await truck(900, ROWS, 32)); }
      else { tc.appendChild(await T('3 CAMIONES · UNO POR EMPRESA · VIAJAN CON 72–80 % LIBRE', 'm12b', 'n6', { name: 'Leyenda camiones' })); for (const [p, pct, l, e, kg] of [['Tuyo', 24, 'A 1,200', 'Empresa A', 1200], ['Empresa B', 28, 'B 1,400', 'Empresa B', 1400], ['Empresa C', 20, 'C 1,000', 'Empresa C', 1000]]) tc.appendChild(await truck(900, [{ unit: 'KG', segs: [[p, pct, l, e, kg.toLocaleString('en-US') + ' kg · camión propio'], ['Libre', 100 - pct, 'LIBRE ' + (5000 - kg).toLocaleString('en-US'), 'Capacidad libre', 'viaja vacía']] }], 28)); }
      row.appendChild(d); const c = figma.createComponentFromNode(d); c.name = 'Modo=' + mode; comps[mode] = c;
    }
    demoSet = figma.combineAsVariants([comps.Consolidado, comps.Individual], row); demoSet.name = 'Demo · envío individual vs consolidado'; styleSet(demoSet, 'VERTICAL');
    const t2 = { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.25 };
    await react(comps.Consolidado.findOne(n => n.name === 'Opción individual'), [{ trigger: { type: 'ON_CLICK' }, actions: [nav(comps.Individual, 'CHANGE_TO', t2)] }]);
    await react(comps.Individual.findOne(n => n.name === 'Opción consolidado'), [{ trigger: { type: 'ON_CLICK' }, actions: [nav(comps.Consolidado, 'CHANGE_TO', t2)] }]);
    try { demoSet.annotations = [{ label: 'Switch Envío individual / Consolidado. Los números se animan 150–250 ms ease-out. Etiqueta visible: Datos simulados.' }]; } catch (e) { }
  });
  refreshCM();

  // ---------- Pantallas ----------
  await figma.setCurrentPageAsync(PPANT);

  // 4. Sidebar con íconos
  await step('Sidebar: ícono propio en cada ítem', async () => {
    const navSet = CM['Nav item/Activo=Sí, Estado=Default'].parent; const navKey = Object.keys(navSet.componentPropertyDefinitions).find(k => k.startsWith('Ícono#'));
    const MAP = { 'Panel': 'layout-dashboard', 'Nuevo pedido': 'package-plus', 'Mis pedidos': 'package', 'Perfil': 'user', 'Rutas asignadas': 'route', 'Mis camiones': 'truck' }; let n = 0;
    for (const inst of PPANT.findAllWithCriteria({ types: ['INSTANCE'] })) {
      const m = await inst.getMainComponentAsync(); if (!m || !m.parent || m.parent !== navSet) continue;
      const lab = inst.findOne(x => x.type === 'TEXT' && x.name === 'Etiqueta'); const ic = lab && MAP[lab.characters]; if (!ic) continue;
      const pr = {}; pr[navKey] = CM['Ícono/' + ic].id; inst.setProperties(pr); const ico = inst.findOne(x => x.name === 'Ícono'); if (ico) recolor(ico, m.name.includes('Activo=Sí') ? 's5' : 'n3'); n++;
    }
    return n + ' ítems';
  });

  // 5. Landing
  await step('Landing: hero animado, demo, tipografía expandida', async () => {
    const L = FR('landing'); const hero = L.findOne(n => n.name === 'Hero');
    for (const t of hero.findAll(n => n.type === 'TEXT' && n.textStyleId === S['Display/61'].id)) await t.setTextStyleIdAsync(S['Display/49'].id);
    const hb = F['Hero B · Manifiesto']; if (hb) for (const t of hb.findAll(n => n.type === 'TEXT' && n.textStyleId === S['Display/61'].id)) await t.setTextStyleIdAsync(S['Display/49'].id);
    const tk = hero.findOne(n => n.name === 'Manifiesto de ruta'); const hi = CM['Hero · manifiesto animado/Paso=1'].createInstance(); hi.name = 'Manifiesto de ruta · animado'; replaceNode(tk, hi);
    // mensaje fluido: a 1280 px el titular parte en más líneas en vez de desbordar
    const msg = hero.findOne(n => n.name === 'Mensaje'); if (msg) { msg.layoutSizingHorizontal = 'FILL'; const tit = msg.findOne(n => n.name === 'Titular'); if (tit) { tit.layoutSizingHorizontal = 'FILL'; for (const c of tit.children) { if (c.type === 'TEXT') { c.layoutSizingHorizontal = 'FILL'; c.textAutoResize = 'HEIGHT'; } else if (c.type === 'FRAME') { c.layoutSizingHorizontal = 'FILL'; c.layoutWrap = 'WRAP'; c.counterAxisSpacing = 4; } } } for (const t of msg.children.filter(c => c.type === 'TEXT' && c.textStyleId === S['Texto/20'].id)) { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; } }
    // guía: muestras de Display más cortas para que quepan con el ancho expandido
    const guide = await figma.getNodeByIdAsync('9:2'); if (guide) for (const t of guide.findAll(n => n.type === 'TEXT' && n.characters.startsWith('Comparte el camión. Paga') && String(n.textStyleId).length && [S['Display/61'].id, S['Display/49'].id, S['Display/39'].id].includes(n.textStyleId))) t.characters = 'Comparte el camión.';
    try { hi.annotations = [{ label: 'Animación de scroll (34 % → 91 %). Con prefers-reduced-motion: Paso 3 estático.' }]; } catch (e) { }
    const road = hero.findOne(n => n.name === 'Línea de consolidación · carretera'); if (road) { for (const c of road.findAll(() => true)) if ('constraints' in c) c.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; road.layoutSizingHorizontal = 'FILL'; }
    const prob = L.findOne(n => n.name === 'Problema'); if (prob) for (const t of prob.findAll(n => n.type === 'TEXT' && n.textStyleId === S['Display/49'].id)) await t.setTextStyleIdAsync(S['Display/39'].id);
    const demo = L.findOne(n => n.name === 'Demo interactiva'); [...demo.children].slice(1).forEach(c => c.remove()); const di = CM['Demo · envío individual vs consolidado/Modo=Consolidado'].createInstance(); add(demo, di, 'FILL');
  });

  // 6. Barras de capacidad en pantallas
  await step('Barras de capacidad: segmentos con tooltip en todas las pantallas', async () => {
    let n = 0;
    const res = FR('res'); const old9 = res.findOne(x => x.name === 'Barra de capacidad'); if (old9) { const bi = CM['Barra de capacidad/Estado=Default'].createInstance(); replaceNode(old9, bi); n++; }
    const asig = FR('asig'); const o7 = asig.findOne(x => x.name === 'Barra de capacidad'); if (o7) { replaceNode(o7, await truck(520, [{ unit: 'KG', segs: [['Tuyo', 23, 'TÚ 800', 'Tu pedido · PED-0148', '800 kg · 3.0 m³ · paradas 2 y 5'], ['Empresa B', 31, 'B 1,100', 'Otra empresa', '1,100 kg · 5.0 m³'], ['Empresa C', 20, 'C 700', 'Otra empresa', '700 kg · 3.0 m³'], ['Libre', 26, 'LIBRE 900', 'Capacidad libre', '900 kg disponibles']] }, { unit: 'M³', segs: [['Tuyo', 19, 'TÚ 3.0', 'Tu pedido · PED-0148', '800 kg · 3.0 m³'], ['Empresa B', 31, 'B 5.0', 'Otra empresa', '1,100 kg · 5.0 m³'], ['Empresa C', 19, 'C 3.0', 'Otra empresa', '700 kg · 3.0 m³'], ['Libre', 31, 'LIBRE 5.0', 'Capacidad libre', '5.0 m³ disponibles']] }], 36)); n++; }
    const ruta = FR('ruta'); const o13 = ruta.findOne(x => x.name === 'Barra de capacidad'); if (o13) { replaceNode(o13, await truck(900, [{ unit: 'KG', segs: [['Tuyo', 24, '0142 1,200', 'PED-0142', '1,200 kg · 4.5 m³ · paradas 1 y 6'], ['Empresa B', 28, '0140 1,400', 'PED-0140', '1,400 kg · 6.0 m³ · paradas 2 y 5'], ['Empresa C', 20, '0144 1,000', 'PED-0144', '1,000 kg · 3.5 m³ · paradas 3 y 4'], ['Libre', 28, 'LIBRE 1,400', 'Capacidad libre', '1,400 kg disponibles']] }, { unit: 'M³', segs: [['Tuyo', 18.75, '0142 4.5', 'PED-0142', '4.5 m³'], ['Empresa B', 25, '0140 6.0', 'PED-0140', '6.0 m³'], ['Empresa C', 14.58, '0144 3.5', 'PED-0144', '3.5 m³'], ['Libre', 41.67, 'LIBRE 10.0', 'Capacidad libre', '10.0 m³ disponibles']] }], 36)); n++; }
    const ev = FR('ev'); const minis = ev.findAll(x => x.name === 'Barra de capacidad · compacta'); const evData = [[[0, 'Tuyo'], [62, 'Empresa B'], [30, 'Empresa C'], [8, 'Libre']], [[0, 'Tuyo'], [35, 'Empresa B'], [20, 'Empresa C'], [45, 'Libre']], [[23, 'Tuyo'], [31, 'Empresa B'], [20, 'Empresa C'], [26, 'Libre']]];
    minis.forEach((m, i) => { const d = evData[i] || evData[2]; replaceNode(m, compactBar(220, d.map(([p, pat]) => [pat, p, pat === 'Tuyo' ? 'Tu pedido · PED-0148' : pat === 'Libre' ? 'Capacidad libre' : 'Otra empresa', p + ' % del peso']))); n++; });
    const tp = FR('tp'); const tdata = [[0, 40, 28, 32], [24, 28, 20, 28], [30, 34, 24, 12]]; tp.findAll(x => x.name === 'Barra de capacidad · compacta').forEach((m, i) => { const d = tdata[i] || tdata[1]; replaceNode(m, compactBar(140, [['Tuyo', d[0], 'Pedido 1', d[0] + ' % del peso'], ['Empresa B', d[1], 'Pedido 2', d[1] + ' % del peso'], ['Empresa C', d[2], 'Pedido 3', d[2] + ' % del peso'], ['Libre', d[3], 'Capacidad libre', d[3] + ' % libre']])); n++; });
    return n + ' barras';
  });

  // 7. Mis pedidos: tabla, drawer y menú como overlays
  let ovDrawer, ovMenu;
  await step('Mis pedidos: tabla con instancias, drawer y menú ⋮ como overlays', async () => {
    const mis = FR('mis');
    const oldT = mis.findOne(x => x.name === 'Tabla de pedidos' && x.type === 'FRAME'); const ti = CM['Tabla de pedidos'].createInstance(); if (oldT) replaceNode(oldT, ti, 'FILL');
    for (const x of mis.findAll(x => x.name === 'Velo' || x.name === 'Drawer · vista rápida')) x.remove();
    const es = mis.findOne(x => x.name === 'Estado vacío (referencia)'); if (es) es.insertChild(1, icon('package', 'n6', 32));
    const X = 13860;
    ovDrawer = figma.createFrame(); ovDrawer.name = 'Overlay · Vista rápida PED-0142'; ovDrawer.resize(1440, 900); ovDrawer.fills = []; PPANT.appendChild(ovDrawer); ovDrawer.x = X; ovDrawer.y = 5700;
    const dim = figma.createRectangle(); dim.name = 'Fondo'; dim.resize(1440, 900); dim.fills = fill('n9', 0.35); ovDrawer.appendChild(dim);
    const dr = CM['Drawer/Estado=Default'].createInstance(); ovDrawer.appendChild(dr); dr.x = 1000; dr.y = 0;
    ovMenu = figma.createFrame(); ovMenu.name = 'Overlay · Acciones de fila'; ovMenu.resize(1440, 900); ovMenu.fills = []; PPANT.appendChild(ovMenu); ovMenu.x = X; ovMenu.y = 6800;
    const catcher = figma.createRectangle(); catcher.name = 'Fondo'; catcher.resize(1440, 900); catcher.fills = fill('w', 0.01); ovMenu.appendChild(catcher);
    const mi = CM['Menú de acciones'].createInstance(); ovMenu.appendChild(mi); mi.x = 1150; mi.y = 300;
    const cl = [{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'CLOSE' }] }]; await react(dim, cl); await react(catcher, cl);
    const close = dr.findOne(x => x.name === 'Cerrar'); if (close) await react(close, cl);
    try { dr.annotations = [{ label: 'Drawer lateral: vista rápida sin perder la tabla. Clic fuera o en ✕ lo cierra. Variante Cargando con skeletons.' }]; } catch (e) { }
    let rows = 0, kebabs = 0;
    for (const r of ti.findAll(x => x.type === 'INSTANCE' && x.name.startsWith('Fila '))) { try { await react(r, [{ trigger: { type: 'ON_CLICK' }, actions: [nav(ovDrawer, 'OVERLAY', { type: 'DISSOLVE', easing: { type: 'EASE_OUT' }, duration: 0.2 })] }]); rows++; } catch (e) { } const k = r.findOne(x => x.name === 'Acciones'); if (k) { try { await react(k, [{ trigger: { type: 'ON_CLICK' }, actions: [nav(ovMenu, 'OVERLAY', null)] }]); kebabs++; } catch (e) { } } }
    return rows + ' filas → drawer, ' + kebabs + ' menús ⋮';
  });
  F[ovDrawer ? ovDrawer.name : 'x'] = ovDrawer; F[ovMenu ? ovMenu.name : 'y'] = ovMenu;

  // 8. Pantalla de carga del motor
  let loader;
  await step('Evaluando rutas · estado de carga (pasa solo en 1.8 s)', async () => {
    const ev = FR('ev'); loader = ev.clone(); loader.name = '07a0 · Empresa · Evaluando rutas · cargando'; loader.x = 3080; loader.y = 3200;
    const card = loader.findOne(x => x.name === 'Motor de consolidación');
    for (const c of card.children.filter(x => x.name.startsWith('Candidata'))) { const r = AL('H', { fill: 'w', stroke: 'n2', r: 10, pad: 16, gap: 16, cross: 'CENTER', name: c.name }); r.appendChild(skel(90, 22)); r.appendChild(skel(220, 14)); const s3 = skel(360, 14); r.appendChild(s3); replaceNode(c, r, 'FILL'); }
    const done = loader.findOne(x => x.type === 'TEXT' && x.characters.startsWith('Evaluación completada')); if (done) { done.characters = 'Evaluando 3 rutas con fecha compatible…'; const sib = done.parent.children.find(x => x.type === 'INSTANCE'); if (sib) sib.remove(); }
    const alt = loader.findOne(x => x.name === 'Caso alterno'); if (alt) alt.remove();
    await react(loader, [{ trigger: { type: 'AFTER_TIMEOUT', timeout: 1.8 }, actions: [nav(ev, 'NAVIGATE', { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.25 })] }]);
    try { loader.annotations = [{ label: 'RNF-03: el motor responde en menos de 3 s. Skeletons en lugar de spinner; pasa sola a Evaluando rutas.' }]; } catch (e) { }
    F[loader.name] = loader;
  });

  // 9. Detalle, recibo, mapas y cards
  await step('Detalle, recibo, mapas y cards de camión como instancias', async () => {
    const out = [];
    const res = FR('res'); const lk = res.findOne(x => x.name === 'Línea de km' && x.type === 'FRAME'); if (lk) { replaceNode(lk, CM['Línea de km/Paso=Asignado a ruta'].createInstance(), 'FILL'); out.push('línea de km'); }
    const plan = FR('plan'); const mp = plan.findOne(x => x.name === 'Mapa estático' && x.type === 'FRAME'); if (mp) { replaceNode(mp, CM['Mapa estático'].createInstance()); out.push('mapa 09b'); }
    const ruta = FR('ruta'); const mp2 = ruta.findOne(x => x.name === 'Mapa estático' && x.type === 'FRAME'); if (mp2) { const mi = CM['Mapa estático'].createInstance(); mi.resize(mp2.width, mp2.height); replaceNode(mp2, mi); for (const k of ['Marcador 1', 'Marcador 6']) { const mk = mi.findOne(x => x.name === k); if (mk) { mk.fills = fill('p7'); const t = mk.findOne(x => x.type === 'TEXT'); if (t) t.fills = fill('w'); } } out.push('mapa 13'); }
    const rc = FR('recibo'); const ro = rc.findOne(x => x.name === 'Recibo-manifiesto' && x.type === 'FRAME'); if (ro) { replaceNode(ro, CM['Recibo-manifiesto'].createInstance()); out.push('recibo'); }
    const cam = FR('cam'); let cards = 0;
    for (const old of cam.findAll(x => x.type === 'FRAME' && x.name.startsWith('Card camión'))) { const inst = CM['Card camión'].createInstance(); const ot = old.findAll(x => x.type === 'TEXT'), nt = inst.findAll(x => x.type === 'TEXT'); nt.forEach((t, i) => { if (ot[i]) t.characters = ot[i].characters; }); if (ot[1] && nt[1]) nt[1].parent.fills = JSON.parse(JSON.stringify(ot[1].parent.fills)); inst.name = old.name; replaceNode(old, inst, 'FILL'); cards++; }
    out.push(cards + ' cards'); return out.join(', ');
  });

  // 10. Grid de 12 columnas
  await step('Grid de 12 columnas (márgenes 80 / 40 en app, gutter 24)', async () => {
    const col = { r: 0.83, g: 0.18, b: 0.13, a: 0.08 }; let n = 0;
    for (const k of ['landing', 'reg', 'login', 'rec', 'mail']) { FR(k).layoutGrids = [{ pattern: 'COLUMNS', alignment: 'STRETCH', gutterSize: 24, count: 12, offset: 80, visible: true, color: col }]; n++; }
    for (const k of ['ep', 'nuevo', 'ev', 'asig', 'mis', 'res', 'plan', 'recibo', 'eperf', 'tp', 'cam', 'ruta', 'tperf']) { const c = FR(k).findOne(x => x.name === 'Contenido'); if (c) { c.layoutGrids = [{ pattern: 'COLUMNS', alignment: 'STRETCH', gutterSize: 24, count: 12, offset: 40, visible: true, color: col }]; n++; } }
    if (loader) { const c = loader.findOne(x => x.name === 'Contenido'); if (c) c.layoutGrids = FR('ev').findOne(x => x.name === 'Contenido').layoutGrids; }
    return n + ' frames';
  });

  // 11. Anotaciones de interacción
  await step('Anotaciones para desarrollo (movimiento, toasts, validación)', async () => {
    const put = (node, label) => { if (node) node.annotations = [{ label }]; };
    put(FR('asig').findOne(x => x.name === 'Toast'), 'Toast abajo a la derecha, 4 s, 200 ms ease-out.');
    put(FR('nuevo').findOne(x => x.name === 'Formulario'), 'RNF-02: una sola pantalla. Validación en línea al salir de cada campo; confirmación visible en menos de 3 s.');
    put(FR('ruta').findOne(x => x.name === 'Orden de carga'), 'Regla: carga en orden inverso a la entrega. Lo último que se carga es lo primero que se entrega.');
    put(FR('plan').findOne(x => x.name === 'Paradas'), 'Lista sincronizada con el mapa: hover en una parada resalta su marcador. Mapa estático (Google Maps Static API), sin seguimiento en vivo.');
  });

  // 12. Prototipo
  await step('Prototipo: enlaces, hover de botones y menú', async () => {
    let links = 0, hov = 0; const miss = [];
    const link = async (k, label, dest, mode = 'any') => {
      const f = F[S_[k] || k], d = F[S_[dest] || dest]; if (!f || !d || f === d) return;
      for (const t of f.findAll(n => n.type === 'TEXT' && n.characters === label)) {
        let p = t.parent; while (p && p.type !== 'INSTANCE' && p !== f) p = p.parent; const inst = p && p.type === 'INSTANCE' ? p : null;
        if (mode === 'inst' && !inst) continue; if (mode === 'text' && inst) continue; const node = inst || t;
        try { const keep = (node.reactions || []).filter(r => r.trigger.type !== 'ON_CLICK'); await node.setReactionsAsync([...keep, { trigger: { type: 'ON_CLICK' }, actions: [nav(d)] }]); links++; } catch (e) { miss.push(k + '›' + label); }
      }
    };
    await link('landing', 'Crear cuenta', 'reg'); await link('landing', 'Iniciar sesión', 'login'); await link('landing', 'Crear cuenta de empresa', 'reg'); await link('landing', 'Crear cuenta de transportista', 'reg');
    await link('reg', 'Crear cuenta', 'login', 'inst'); await link('reg', 'Iniciar sesión', 'login');
    await link('login', 'Iniciar sesión', 'ep', 'inst'); await link('login', '¿Olvidaste tu contraseña?', 'rec'); await link('login', 'Crear cuenta', 'reg');
    await link('rec', 'Volver a iniciar sesión', 'login'); await link('rec', 'Iniciar sesión', 'login');
    for (const k of ['ep', 'nuevo', 'ev', 'asig', 'mis', 'res', 'plan', 'recibo', 'eperf', loader ? loader.name : 'ev']) { await link(k, 'Panel', 'ep', 'inst'); await link(k, 'Nuevo pedido', 'nuevo', 'inst'); await link(k, 'Mis pedidos', 'mis', 'inst'); await link(k, 'Perfil', 'eperf', 'inst'); await link(k, 'Cerrar sesión', 'login'); }
    await link('ep', '+ Nuevo pedido', 'nuevo'); await link('ep', 'Ver todos', 'mis'); await link('ep', 'Ver plan de ruta', 'plan');
    if (loader) await link('nuevo', 'Crear pedido', loader.name); else await link('nuevo', 'Crear pedido', 'ev');
    await link('nuevo', 'Cancelar', 'mis'); await link('ev', 'Ver pedido asignado', 'asig');
    await link('asig', 'Ver plan de ruta', 'plan'); await link('asig', 'Crear otro pedido', 'nuevo'); await link('mis', '+ Nuevo pedido', 'nuevo');
    for (const k of ['res', 'plan', 'recibo']) { await link(k, 'Resumen', 'res', 'inst'); await link(k, 'Plan de ruta', 'plan', 'inst'); await link(k, 'Recibo', 'recibo', 'inst'); await link(k, 'Pedidos', 'mis', 'text'); }
    for (const k of ['tp', 'cam', 'ruta', 'tperf']) { await link(k, 'Panel', 'tp', 'inst'); await link(k, 'Rutas asignadas', 'ruta', 'inst'); await link(k, 'Mis camiones', 'cam', 'inst'); await link(k, 'Perfil', 'tperf', 'inst'); await link(k, 'Cerrar sesión', 'login'); }
    await link('tp', 'Ver ruta', 'ruta'); await link('cam', 'Registrar camión', 'tp', 'inst'); await link('ruta', 'Rutas asignadas', 'tp', 'text'); await link('mail', 'Ver plan de ruta', 'plan');
    if (ovDrawer) { await link(ovDrawer.name, 'Abrir detalle', 'res'); await link(ovDrawer.name, 'Ver recibo', 'recibo'); }
    if (ovMenu) { await link(ovMenu.name, 'Ver detalle', 'res'); await link(ovMenu.name, 'Ver plan de ruta', 'plan'); await link(ovMenu.name, 'Ver recibo', 'recibo'); }
    // hover en botones, nav, tabs y cards colocados en pantallas
    for (const inst of PPANT.findAllWithCriteria({ types: ['INSTANCE'] })) {
      const m = await inst.getMainComponentAsync(); if (!m || !m.parent || m.parent.type !== 'COMPONENT_SET') continue;
      if (!['Botón', 'Nav item', 'Tab', 'Card'].includes(m.parent.name) || !m.name.includes('Estado=Default')) continue;
      const h = m.parent.children.find(c => c.name === m.name.replace('Estado=Default', 'Estado=Hover')); if (!h) continue;
      try { const keep = (inst.reactions || []).filter(r => r.trigger.type !== 'ON_HOVER'); await inst.setReactionsAsync([...keep, { trigger: { type: 'ON_HOVER' }, actions: [nav(h, 'CHANGE_TO', TR)] }]); hov++; } catch (e) { }
    }
    PPANT.flowStartingPoints = [{ nodeId: FR('nuevo').id, name: 'A · Empresa crea un pedido' }, { nodeId: FR('cam').id, name: 'B · Transportista registra un camión' }, { nodeId: FR('landing').id, name: 'Inicio · Landing' }];
    return links + ' enlaces, ' + hov + ' hovers' + (miss.length ? ', sin enlazar: ' + miss.slice(0, 6).join(', ') : '');
  });

  // 13. Ajustes puntuales para que todo quepa a 1280 px
  await step('Ajustes de ancho para 1280 px', async () => {
    const out = [];
    const ep = FR('ep'); let n1 = 0; for (const c of ep.findAll(x => x.type === 'FRAME' && x.layoutMode === 'HORIZONTAL' && Math.round(x.width) === 260)) { c.resize(220, c.height); n1++; } out.push('panel empresa ' + n1);
    const tp = FR('tp'); let n2 = 0; for (const r of tp.findAll(x => x.type === 'FRAME' && x.name.startsWith('Ruta R-'))) { r.itemSpacing = 12; for (const c of r.children) { if (c.type !== 'FRAME') continue; if (Math.round(c.width) === 200) c.resize(170, c.height); else if (Math.round(c.width) === 150) c.resize(120, c.height); } n2++; } out.push('panel transportista ' + n2);
    const rec = FR('rec'); let n3 = 0; for (const c of rec.findAll(x => x.type === 'FRAME' && x.layoutMode === 'VERTICAL' && Math.round(x.width) === 400)) { c.resize(352, c.height); c.primaryAxisSizingMode = 'AUTO'; for (const t of c.findAll(x => x.type === 'TEXT' && Math.round(x.width) === 336)) { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; } n3++; } out.push('recuperar ' + n3);
    const ruta = FR('ruta'); let n4 = 0; for (const b of ruta.findAll(x => x.type === 'FRAME' && x.name.startsWith('Bulto '))) { b.resize(220, b.height); b.primaryAxisSizingMode = 'AUTO'; n4++; } out.push('orden de carga ' + n4);
    return out.join(', ');
  });

  // 14. Prueba a 1280 px (las tramas recortadas dentro de instancias no cuentan)
  await step('Prueba de ancho mínimo (1280 px)', async () => {
    const report = []; let fixed = 0;
    const scan = (f, W) => { const right = f.absoluteBoundingBox.x + W + 1; const bad = []; const walk = (n) => { if (!n.visible) return; const b = n.absoluteBoundingBox; if (n !== f && b && b.x + b.width > right) bad.push(n); if (n.type === 'INSTANCE') return; if (n !== f && 'clipsContent' in n && n.clipsContent) return; if ('children' in n) for (const c of n.children) walk(c); }; walk(f); return bad; };
    const keys = ['landing', 'reg', 'login', 'rec', 'ep', 'nuevo', 'ev', 'asig', 'mis', 'res', 'plan', 'recibo', 'eperf', 'tp', 'cam', 'ruta', 'tperf'];
    for (const k of keys) {
      const f = FR(k); const pm = f.primaryAxisSizingMode, cm = f.counterAxisSizingMode;
      const setW = (w) => { f.resize(w, f.height); f.primaryAxisSizingMode = pm; f.counterAxisSizingMode = cm; };
      setW(1280); let bad = scan(f, 1280);
      for (const t of bad.filter(n => n.type === 'TEXT' && n.parent && n.parent.layoutMode && n.parent.layoutMode !== 'NONE')) { try { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; fixed++; } catch (e) { } }
      bad = scan(f, 1280); setW(1440); const bad14 = scan(f, 1440);
      const nm = arr => arr.slice(-3).map(n => n.name).join(', ');
      if (bad.length || bad14.length) report.push(S_[k] + (bad14.length ? ' [1440: ' + nm(bad14) + ']' : '') + (bad.length ? ' [1280: ' + nm(bad) + ']' : ''));
    }
    if (report.length) { report.forEach(r => say('   desborda · ' + r)); return fixed + ' textos ajustados para que partan línea; ' + report.length + ' pantallas aún desbordan (ver arriba)'; }
    return fixed + ' textos ajustados; ninguna pantalla desborda a 1280 ni a 1440';
  });
}

main().then(() => { say('\nListo. Revisa el canvas y usa Ctrl+Z o el historial de versiones si algo no te convence.'); figma.notify('Diseño completado'); }).catch(e => say('✖ Error general: ' + (e && e.message ? e.message : e)));
