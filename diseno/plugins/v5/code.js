// PDOL · v5: sección Perfil y seguridad completa para Empresa y Transportista
figma.showUI(__html__, { width: 460, height: 520, title: 'v5 · Perfil y seguridad · PDOL' });
figma.ui.onmessage = (m) => { if (m === 'close') figma.closePlugin(); };
const say = (t) => figma.ui.postMessage({ type: 'log', text: t });
async function step(name, fn) { try { const r = await fn(); say('✔ ' + name + (r ? ' · ' + r : '')); return true; } catch (e) { say('✖ ' + name + ' · ' + (e && e.message ? e.message : e)); return false; } }
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
async function sendPNG(node, name, scale) { const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: scale } }); figma.ui.postMessage({ type: 'file', name, bytes }); return bytes.length; }

const ICONS = {"shield": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" />", "shield-check": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"m9 12 2 2 4-4\" />", "package-check": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M12 22V12\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"m16 17 2 2 4-4\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M3.29 7 12 12l8.71-5\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"m7.5 4.27 8.997 5.148\" />", "bell": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M10.268 21a2 2 0 0 0 3.464 0\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\" />", "users": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M16 3.128a4 4 0 0 1 0 7.744\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M22 21v-2a4 4 0 0 0-3-3.87\" /> <circle stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" cx=\"9\" cy=\"7\" r=\"4\" />", "lock": "<rect stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M7 11V7a5 5 0 0 1 10 0v4\" />", "monitor": "<rect stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" width=\"20\" height=\"14\" x=\"2\" y=\"3\" rx=\"2\" /> <line stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" x1=\"8\" x2=\"16\" y1=\"21\" y2=\"21\" /> <line stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" x1=\"12\" x2=\"12\" y1=\"17\" y2=\"21\" />", "smartphone": "<rect stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M12 18h.01\" />", "eye": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" /> <circle stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" cx=\"12\" cy=\"12\" r=\"3\" />", "eye-off": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"m2 2 20 20\" />", "copy": "<rect stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" />", "trash-2": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M10 11v6\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M14 11v6\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M3 6h18\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\" />", "triangle-alert": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M12 9v4\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M12 17h.01\" />", "key-round": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\" /> <circle stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" cx=\"16.5\" cy=\"7.5\" r=\".5\" />", "mail": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\" /> <rect stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" />", "user-plus": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <circle stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" cx=\"9\" cy=\"7\" r=\"4\" /> <line stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" x1=\"19\" x2=\"19\" y1=\"8\" y2=\"14\" /> <line stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" x1=\"22\" x2=\"16\" y1=\"11\" y2=\"11\" />", "laptop": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M20.054 15.987H3.946\" />", "circle-x": "<circle stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" cx=\"12\" cy=\"12\" r=\"10\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"m15 9-6 6\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"m9 9 6 6\" />", "file-text": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M14 2v5a1 1 0 0 0 1 1h5\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M10 9H8\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M16 13H8\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M16 17H8\" />", "log-in": "<path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"m10 17 5-5-5-5\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M15 12H3\" /> <path stroke=\"#15181E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" d=\"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\" />"};

// ---------- base ----------
const K = { p9: 'Primary/900', p8: 'Primary/800', p7: 'Primary/700', p6: 'Primary/600', p5: 'Primary/500', p4: 'Primary/400', p3: 'Primary/300', p2: 'Primary/200', p1: 'Primary/100', p0: 'Primary/50', s7: 'Secondary/700', s5: 'Secondary/500', s3: 'Secondary/300', s1: 'Secondary/100', n9: 'Neutral/900', n7: 'Neutral/700', n6: 'Neutral/600', n5: 'Neutral/500', n4: 'Neutral/400', n3: 'Neutral/300', n2: 'Neutral/200', n1: 'Neutral/100', n0: 'Neutral/50', pa: 'Base/Papel', w: 'Base/Blanco', ok: 'Semantic/Exito', er: 'Semantic/Error' };
const ST = { d39: 'Display/39', t31: 'Título/31', t25: 'Título/25', t20: 'Título/20', b20: 'Texto/20', b16: 'Texto/16', b16m: 'Texto/16 Medium', b16s: 'Texto/16 SemiBold', b14: 'Texto/14', b14s: 'Texto/14 SemiBold', b12: 'Texto/12', m25: 'Dato/25', m20: 'Dato/20', m14: 'Dato/14', m12b: 'Dato/12 Bold', m12: 'Dato/12' };
const V = {}, VID = {}, S = {}, CM = {}, SETS = {}, F = {};
let PCOMP, PPANT;
const fill = (k, op) => { const name = K[k] || k; const v = V[name]; if (!v) throw new Error('Falta la variable ' + name); const p = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v); return [op != null ? Object.assign({}, p, { opacity: op }) : p]; };
async function T(str, st, c, o = {}) { const t = figma.createText(); const s = S[ST[st]]; if (!s) throw new Error('Falta el estilo de texto ' + ST[st]); await t.setTextStyleIdAsync(s.id); t.characters = str; t.fills = fill(c); if (o.name) t.name = o.name; return t; }
async function TW(parent, str, st, c, o = {}) { const t = await T(str, st, c, o); parent.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; if (o.one) { t.textTruncation = 'ENDING'; t.maxLines = 1; } return t; }
function AL(dir, o = {}) {
  const f = figma.createFrame(); f.resize(1, 1); f.layoutMode = dir === 'V' ? 'VERTICAL' : 'HORIZONTAL'; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO'; f.clipsContent = false;
  f.fills = o.fill ? fill(o.fill, o.op) : []; f.itemSpacing = o.gap != null ? o.gap : 0;
  if (o.pad != null) { const p = typeof o.pad === 'number' ? [o.pad, o.pad, o.pad, o.pad] : o.pad.length === 2 ? [o.pad[0], o.pad[1], o.pad[0], o.pad[1]] : o.pad; f.paddingTop = p[0]; f.paddingRight = p[1]; f.paddingBottom = p[2]; f.paddingLeft = p[3]; }
  if (o.name) f.name = o.name; if (o.r != null) f.cornerRadius = o.r; if (o.stroke) { f.strokes = fill(o.stroke); f.strokeWeight = o.sw || 1; f.strokeAlign = 'INSIDE'; }
  if (o.main) f.primaryAxisAlignItems = o.main; if (o.cross) f.counterAxisAlignItems = o.cross;
  if (o.w) { f.resize(o.w, 1); if (dir === 'V') { f.counterAxisSizingMode = 'FIXED'; f.primaryAxisSizingMode = 'AUTO'; } else { f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'AUTO'; } }
  return f;
}
function box(w, h, o = {}) { const f = figma.createFrame(); f.layoutMode = 'HORIZONTAL'; f.resize(w, h); f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED'; f.primaryAxisAlignItems = o.main || 'CENTER'; f.counterAxisAlignItems = 'CENTER'; f.fills = o.fill ? fill(o.fill, o.op) : []; if (o.r != null) f.cornerRadius = o.r; if (o.stroke) { f.strokes = fill(o.stroke); f.strokeWeight = o.sw || 1; f.strokeAlign = 'INSIDE'; } if (o.pad) { f.paddingLeft = f.paddingRight = o.pad; } f.name = o.name || 'Caja'; f.clipsContent = false; return f; }
const add = (p, c, h, v) => { p.appendChild(c); if (h) c.layoutSizingHorizontal = h; if (v) c.layoutSizingVertical = v; return c; };
const recolor = (inst, col) => { for (const v of inst.findAll(x => 'strokes' in x && x.strokes.length)) v.strokes = fill(col); };
const icon = (n, col, sz = 20) => { const c = CM['Ícono/' + n]; if (!c) throw new Error('Falta el ícono ' + n); const i = c.createInstance(); i.resize(sz, sz); recolor(i, col); i.name = 'Ícono · ' + n; return i; };
const iconTile = (n, col, bg, op) => { const b = box(40, 40, { fill: bg, op, r: 8, name: 'Ícono' }); b.appendChild(icon(n, col, 20)); return b; };
function divider(p) { const d = figma.createRectangle(); d.name = 'Divisor'; d.resize(100, 1); d.fills = fill('n2'); p.appendChild(d); d.layoutSizingHorizontal = 'FILL'; return d; }
const TR = { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.2 };
const DIS = { type: 'DISSOLVE', easing: { type: 'EASE_OUT' }, duration: 0.2 };
const nav = (dest, nv = 'NAVIGATE', tr = null) => ({ type: 'NODE', destinationId: dest.id, navigation: nv, transition: tr, preserveScrollPosition: false });
const cleanR = (r) => ({ trigger: r.trigger, actions: (r.actions && r.actions.length ? r.actions : (r.action ? [r.action] : [])) });
async function onClick(node, dest, nv = 'NAVIGATE', tr = null) {
  if (!node || !dest) return false;
  const keep = (node.reactions || []).filter(r => r.trigger && r.trigger.type !== 'ON_CLICK').map(cleanR);
  const act = dest === 'CLOSE' ? { type: 'CLOSE' } : nav(dest, nv, tr);
  await node.setReactionsAsync([...keep, { trigger: { type: 'ON_CLICK' }, actions: [act] }]); return true;
}
const LINKS = []; // [node, destRef(string key or node), nv, tr]
const later = (node, dest, nv, tr) => { LINKS.push([node, dest, nv, tr]); return node; };

function VAR(set, ...parts) { const s = SETS[set]; if (!s) throw new Error('Falta el componente ' + set); const c = s.children.find(c => parts.every(p => c.name.includes(p))); if (!c) throw new Error('Falta la variante ' + set + ' · ' + parts.join(', ')); return c; }
function setTxt(t, s) {
  const ref = t.componentPropertyReferences && t.componentPropertyReferences.characters;
  if (ref) { let p = t.parent; while (p && p.type !== 'INSTANCE') p = p.parent; if (p) { const o = {}; o[ref] = s; try { p.setProperties(o); return; } catch (e) { } } }
  t.characters = s;
}
function setTexts(inst, arr) { const ts = inst.findAll(n => n.type === 'TEXT' && n.visible); arr.forEach((s, i) => { if (!ts[i] || s === undefined) return; if (s === null) ts[i].visible = false; else setTxt(ts[i], s); }); for (let i = arr.length; i < ts.length; i++) ts[i].visible = false; return inst; }
let BTXT = null;
function btn(v, label, est = 'Default') { const m = VAR('Botón', 'Variante=' + v, 'Estado=' + est); const i = m.createInstance(); if (BTXT) { const p = {}; p[BTXT] = label; i.setProperties(p); } else { const t = i.findOne(n => n.type === 'TEXT'); if (t) setTxt(t, label); } i.name = 'Botón · ' + label; return i; }
const input = (est, label, value, helper) => { const i = VAR('Input', 'Estado=' + est).createInstance(); setTexts(i, helper ? [label, value, helper] : [label, value]); i.name = 'Campo · ' + label; return i; };
const select = (label, value) => { const i = VAR('Select', 'Estado=Default').createInstance(); setTexts(i, [label, value]); i.name = 'Select · ' + label; return i; };
const badge = (state) => { const i = VAR('Badge de estado', state).createInstance(); i.name = 'Badge · ' + state; return i; };
async function pill(text, kind) {
  const C = { ok: ['ok', 0.12, 'ok'], av: ['s1', null, 's7'], er: ['er', 0.1, 'er'], ne: ['n1', null, 'n6'], pr: ['p0', null, 'p7'] }[kind];
  const b = AL('H', { fill: C[0], op: C[1], r: 999, pad: [2, 8], name: 'Etiqueta · ' + text }); b.appendChild(await T(text, 'b12', C[2])); return b;
}
async function link(text, col = 'p6') { const t = await T(text, 'b14s', col, { name: 'Enlace · ' + text }); return t; }
function row2(parent, a, b, gap = 16) { const r = AL('H', { gap, name: 'Fila de campos' }); add(parent, r, 'FILL'); add(r, a, 'FILL'); if (b) add(r, b, 'FILL'); return r; }
async function card(parent, title, desc, o = {}) {
  const c = AL('V', { fill: 'w', stroke: o.danger ? 'er' : 'n2', r: 10, pad: 24, gap: o.gap != null ? o.gap : 20, name: 'Tarjeta · ' + (title || o.name || '') }); add(parent, c, 'FILL');
  if (title) { const h = AL('H', { gap: 16, cross: 'CENTER', name: 'Encabezado de tarjeta' }); add(c, h, 'FILL'); const tx = AL('V', { gap: 4, name: 'Texto' }); add(h, tx, 'FILL'); await TW(tx, title, 't20', o.danger ? 'er' : 'n9'); if (desc) await TW(tx, desc, 'b14', 'n6'); if (o.action) h.appendChild(o.action); }
  return c;
}
async function itemRow(parent, o) {
  const r = AL('H', { gap: 16, cross: 'CENTER', pad: [14, 0], name: o.title }); add(parent, r, 'FILL');
  if (o.ic) r.appendChild(iconTile(o.ic, o.icCol || 'n6', o.bg || 'n1', o.bgOp));
  const tx = AL('V', { gap: 2, name: 'Texto' }); add(r, tx, 'FILL');
  const h = AL('H', { gap: 8, cross: 'CENTER', name: 'Título' }); add(tx, h, 'FILL'); const tt = await T(o.title, 'b16m', 'n9'); h.appendChild(tt);
  for (const p of (o.pills || [])) h.appendChild(await pill(p[0], p[1]));
  if (o.sub) await TW(tx, o.sub, 'b14', 'n6');
  for (const x of (o.right || [])) r.appendChild(x);
  return r;
}
async function list(parent, items, fn) { for (let i = 0; i < items.length; i++) { if (i) divider(parent); await fn(parent, items[i]); } }
async function toggleRow(parent, [title, desc, state]) {
  const r = AL('H', { gap: 24, cross: 'CENTER', pad: [14, 0], name: title }); add(parent, r, 'FILL');
  const tx = AL('V', { gap: 2, name: 'Texto' }); add(r, tx, 'FILL');
  const h = AL('H', { gap: 8, cross: 'CENTER' }); add(tx, h, 'FILL'); h.appendChild(await T(title, 'b16m', 'n9')); if (state === 'Bloqueado') h.appendChild(await pill('Siempre activa', 'ne'));
  if (desc) await TW(tx, desc, 'b14', 'n6');
  const sw = VAR('Interruptor', 'Estado=' + state).createInstance(); sw.name = 'Interruptor · ' + title; r.appendChild(sw); return r;
}
async function stat(parent, label, value, sub) { const c = AL('V', { fill: 'w', stroke: 'n2', r: 10, pad: 20, gap: 6, name: 'Métrica · ' + label }); add(parent, c, 'FILL'); await TW(c, label.toUpperCase(), 'm12b', 'n5'); await TW(c, value, 'm25', 'n9'); await TW(c, sub, 'b12', 'n6'); return c; }
async function table(parent, cols, rows) {
  const t = AL('V', { fill: 'w', stroke: 'n2', r: 10, name: 'Tabla' }); t.clipsContent = true; add(parent, t, 'FILL');
  const cell = (row, c) => { const b = c.fill ? AL('V', { gap: 2, name: 'Celda' }) : AL('V', { gap: 2, w: c.w, name: 'Celda' }); row.appendChild(b); if (c.fill) b.layoutSizingHorizontal = 'FILL'; if (c.end) b.counterAxisAlignItems = 'MAX'; return b; };
  const hr = AL('H', { fill: 'n0', pad: [10, 16], gap: 12, cross: 'CENTER', name: 'Encabezado' }); add(t, hr, 'FILL');
  for (const c of cols) { const b = cell(hr, c); if (c.h) await TW(b, c.h.toUpperCase(), 'm12b', 'n5', { one: true }); }
  for (const rw of rows) {
    divider(t); const r = AL('H', { pad: [12, 16], gap: 12, cross: 'CENTER', name: 'Fila ' + (typeof rw[0] === 'string' ? rw[0] : (rw[0] && rw[0].type ? '' : rw[0].main)) }); add(t, r, 'FILL');
    for (let i = 0; i < cols.length; i++) {
      const b = cell(r, cols[i]); const v = rw[i]; if (v == null) continue;
      if (typeof v === 'string') await TW(b, v, cols[i].mono ? 'm14' : 'b14', cols[i].muted ? 'n6' : 'n9', { one: true });
      else if (Array.isArray(v)) { for (const x of v) b.appendChild(x); }
      else if (v.type) b.appendChild(v);
      else { await TW(b, v.main, v.mono ? 'm14' : 'b14s', 'n9', { one: true }); if (v.sub) await TW(b, v.sub, 'b12', 'n5', { one: true }); }
    }
  }
  return t;
}

// ---------- init ----------
async function init() {
  for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) { V[v.name] = v; VID[v.id] = v; }
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  for (const s of ['Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold']) await figma.loadFontAsync({ family: 'Archivo', style: s });
  try { await figma.loadFontAsync({ family: 'Archivo' }); } catch (e) { }
  for (const s of ['Regular', 'Medium', 'Bold']) await figma.loadFontAsync({ family: 'JetBrains Mono', style: s });
  for (const s of await figma.getLocalTextStylesAsync()) S[s.name] = s;
  for (const p of figma.root.children) await p.loadAsync();
  PCOMP = figma.root.children.find(p => p.name === 'Componentes'); PPANT = figma.root.children.find(p => p.name === 'Pantallas');
  if (!PCOMP || !PPANT) throw new Error('No encuentro las páginas Componentes y Pantallas. ¿Es el archivo correcto?');
  refresh();
  for (const f of PPANT.children) if (f.type === 'FRAME') F[f.name] = f;
  const bset = SETS['Botón']; if (bset) { const k = Object.keys(bset.componentPropertyDefinitions).find(k => bset.componentPropertyDefinitions[k].type === 'TEXT'); if (k) BTXT = k; }
}
function refresh() {
  for (const n of PCOMP.findAllWithCriteria({ types: ['COMPONENT'] })) CM[(n.parent && n.parent.type === 'COMPONENT_SET' ? n.parent.name + '/' : '') + n.name] = n;
  for (const s of PCOMP.findAllWithCriteria({ types: ['COMPONENT_SET'] })) SETS[s.name] = s;
}

// ---------- datos de ejemplo ----------
const ROLE = {
  E: {
    pre: '10', role: 'Empresa', name: 'Distribuidora Ozama, SRL', initials: 'DO', mail: 'operaciones@distribuidoraozama.do', mailMask: 'o••••••••@distribuidoraozama.do',
    sub: [['Datos de la cuenta', 'user', 'datos'], ['Seguridad', 'lock', 'seg'], ['Verificación en dos pasos', 'shield-check', '2fa'], ['Pedidos completados', 'package-check', 'hist'], ['Notificaciones', 'bell', 'noti'], ['Equipo y permisos', 'users', 'equipo'], ['Privacidad y datos', 'shield', 'priv']],
    sessions: [['monitor', 'Chrome en Windows', 'Santo Domingo · IP 190.166.xx.xx · ahora', true], ['smartphone', 'Safari en iPhone', 'Santiago · IP 152.0.xx.xx · hace 2 horas', false], ['laptop', 'Firefox en macOS', 'La Romana · IP 200.88.xx.xx · hace 3 días', false]],
  },
  T: {
    pre: '14', role: 'Transportista', name: 'Transportes Yaque', initials: 'TY', mail: 'despacho@transportesyaque.do', mailMask: 'd••••••@transportesyaque.do',
    sub: [['Datos de la cuenta', 'user', 'datos'], ['Seguridad', 'lock', 'seg'], ['Verificación en dos pasos', 'shield-check', '2fa'], ['Rutas completadas', 'route', 'hist'], ['Notificaciones', 'bell', 'noti'], ['Privacidad y datos', 'shield', 'priv']],
    sessions: [['smartphone', 'Chrome en Android', 'Santiago · IP 148.101.xx.xx · ahora', true], ['monitor', 'Chrome en Windows', 'Santiago · IP 148.101.xx.xx · ayer', false], ['smartphone', 'Safari en iPhone', 'Moca · IP 186.6.xx.xx · hace 5 días', false]],
  }
};
const SCREENS = {
  datos: ['', 'Datos de la cuenta', 'Datos de la cuenta', 'Información de tu cuenta y de la persona de contacto.'],
  seg: ['b', 'Seguridad', 'Seguridad', 'Contraseña, verificación en dos pasos, sesiones abiertas y actividad reciente.'],
  '2fa': ['c', 'Verificación en dos pasos (desactivada)', 'Verificación en dos pasos', 'Una segunda comprobación al iniciar sesión, además de la contraseña.'],
  act: ['d', 'Activar verificación', 'Activar la verificación en dos pasos', 'Conecta tu app de autenticación. Toma menos de dos minutos.'],
  codes: ['e', 'Códigos de respaldo', 'Guarda tus códigos de respaldo', 'Te sirven para entrar si pierdes el teléfono.'],
  hist: ['f', null, null, null],
  noti: ['g', 'Notificaciones', 'Notificaciones', 'Elige qué correos quieres recibir.'],
  equipo: ['h', 'Equipo y permisos', 'Equipo y permisos', 'Quién de tu empresa usa la cuenta y qué puede hacer.'],
  priv: ['i', 'Privacidad y datos', 'Privacidad y datos', 'Tus datos personales, tus consentimientos y el cierre de la cuenta.'],
};
const SUBKEY = { act: '2fa', codes: '2fa' };

// ---------- componentes nuevos ----------
let SUBK = {};
async function buildComponents() {
  await figma.setCurrentPageAsync(PCOMP);
  const croot = PCOMP.children.find(c => c.type === 'FRAME' && c.name === 'Componentes');
  if (!croot) throw new Error('No encuentro el frame raíz "Componentes"');
  const grp = AL('V', { gap: 24, name: 'Perfil y seguridad' }); croot.appendChild(grp); grp.layoutSizingHorizontal = 'FILL';
  grp.appendChild(await T('Perfil y seguridad · subnavegación, interruptor, código de verificación, botón Peligro', 't20', 'n9'));
  const styleSet = (s, dir) => { s.layoutMode = dir || 'HORIZONTAL'; s.itemSpacing = 24; s.counterAxisAlignItems = 'MIN'; s.paddingTop = s.paddingBottom = s.paddingLeft = s.paddingRight = 20; s.primaryAxisSizingMode = 'AUTO'; s.counterAxisSizingMode = 'AUTO'; s.fills = fill('w'); s.strokes = fill('n3'); s.dashPattern = [6, 4]; s.cornerRadius = 8; s.clipsContent = false; };
  const out = [];

  // 1. Íconos nuevos
  const iconSet = PCOMP.findOne(n => n.name === 'Set de íconos');
  let ni = 0;
  for (const [name, inner] of Object.entries(ICONS)) {
    if (CM['Ícono/' + name]) continue;
    const n = figma.createNodeFromSvg('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>');
    const c = figma.createComponentFromNode(n); c.name = 'Ícono/' + name; c.fills = [];
    for (const v of c.findAll(() => true)) { if ('constraints' in v) v.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; if ('strokes' in v && v.strokes.length) v.strokes = fill('n9'); if ('fills' in v && Array.isArray(v.fills) && v.fills.length && v.type !== 'FRAME') v.fills = []; }
    if (iconSet) { if (iconSet.layoutMode && iconSet.layoutMode !== 'NONE') iconSet.appendChild(c); else { const last = iconSet.children.reduce((m, x) => Math.max(m, x.x + x.width), 0); iconSet.appendChild(c); c.x = last + 16; c.y = iconSet.children[0] ? iconSet.children[0].y : 0; if (c.x + 24 > iconSet.width) iconSet.resize(c.x + 40, iconSet.height); } }
    else grp.appendChild(c);
    CM['Ícono/' + name] = c; ni++;
  }
  out.push(ni + ' íconos');

  // 2. Subnav item
  {
    const row = AL('H', { gap: 24, name: 'Subnav item · fila' }); grp.appendChild(row);
    const vs = {};
    for (const [act, est] of [['Sí', 'Default'], ['Sí', 'Hover'], ['No', 'Default'], ['No', 'Hover']]) {
      const c = figma.createComponent(); c.name = `Activo=${act}, Estado=${est}`; c.layoutMode = 'HORIZONTAL'; c.resize(232, 40); c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO';
      c.paddingTop = c.paddingBottom = 10; c.paddingLeft = c.paddingRight = 12; c.itemSpacing = 10; c.counterAxisAlignItems = 'CENTER'; c.cornerRadius = 6;
      c.fills = act === 'Sí' ? fill(est === 'Hover' ? 'n2' : 'n1') : est === 'Hover' ? fill('n0') : [];
      const ic = icon('user', act === 'Sí' ? 'p6' : est === 'Hover' ? 'n7' : 'n5', 18); ic.name = 'Ícono'; c.appendChild(ic);
      const t = await T('Datos de la cuenta', act === 'Sí' ? 'b14s' : 'b14', act === 'Sí' || est === 'Hover' ? 'n9' : 'n6', { name: 'Etiqueta' }); c.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; t.textTruncation = 'ENDING'; t.maxLines = 1;
      if (act === 'Sí') { const bar = figma.createRectangle(); bar.name = 'Indicador'; bar.resize(3, 20); bar.cornerRadius = 2; bar.fills = fill('p6'); c.insertChild(0, bar); c.paddingLeft = 9; }
      row.appendChild(c); vs[act + est] = c;
    }
    const set = figma.combineAsVariants(Object.values(vs), row); set.name = 'Subnav item'; styleSet(set);
    const kE = set.addComponentProperty('Etiqueta', 'TEXT', 'Datos de la cuenta'); const kI = set.addComponentProperty('Ícono', 'INSTANCE_SWAP', CM['Ícono/user'].id);
    for (const v of set.children) { v.findOne(n => n.name === 'Etiqueta').componentPropertyReferences = { characters: kE }; v.findOne(n => n.name === 'Ícono').componentPropertyReferences = { mainComponent: kI }; }
    try { set.description = 'Subnavegación del perfil. Activo: fondo Neutral/100, indicador y ícono Primary/600. Hover: Neutral/50.'; } catch (e) { }
    SUBK = { E: kE, I: kI }; out.push('Subnav item');
  }

  // 3. Interruptor
  {
    const row = AL('H', { gap: 24, name: 'Interruptor · fila' }); grp.appendChild(row); const vs = {};
    for (const [est, on, col] of [['Activado', 1, 'p6'], ['Desactivado', 0, 'n3'], ['Bloqueado', 1, 'p3']]) {
      const c = figma.createComponent(); c.name = 'Estado=' + est; c.layoutMode = 'HORIZONTAL'; c.resize(44, 24); c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'FIXED';
      c.paddingLeft = c.paddingRight = 3; c.primaryAxisAlignItems = on ? 'MAX' : 'MIN'; c.counterAxisAlignItems = 'CENTER'; c.cornerRadius = 12; c.fills = fill(col);
      const k = box(18, 18, { fill: 'w', r: 9, name: 'Perilla' }); k.effects = [{ type: 'DROP_SHADOW', color: { r: 0.08, g: 0.09, b: 0.12, a: 0.2 }, offset: { x: 0, y: 1 }, radius: 2, spread: 0, visible: true, blendMode: 'NORMAL' }];
      if (est === 'Bloqueado') k.appendChild(icon('lock', 'p6', 10)); c.appendChild(k); row.appendChild(c); vs[est] = c;
    }
    const set = figma.combineAsVariants(Object.values(vs), row); set.name = 'Interruptor'; styleSet(set);
    await vs.Activado.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [nav(vs.Desactivado, 'CHANGE_TO', TR)] }]);
    await vs.Desactivado.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [nav(vs.Activado, 'CHANGE_TO', TR)] }]);
    try { set.description = 'Activado / Desactivado cambian con un clic. Bloqueado: notificaciones obligatorias o de seguridad, no se pueden apagar.'; } catch (e) { }
    out.push('Interruptor');
  }

  // 4. Código de verificación
  {
    const row = AL('H', { gap: 24, name: 'Código · fila' }); grp.appendChild(row); const vs = []; const dg = '482917';
    for (const est of ['Vacío', 'Completo', 'Error']) {
      const c = figma.createComponent(); c.name = 'Estado=' + est; c.layoutMode = 'HORIZONTAL'; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'AUTO'; c.itemSpacing = 8; c.fills = []; c.counterAxisAlignItems = 'CENTER';
      for (let i = 0; i < 6; i++) {
        if (i === 3) { const sep = figma.createRectangle(); sep.name = 'Separador'; sep.resize(10, 2); sep.cornerRadius = 1; sep.fills = fill('n3'); c.appendChild(sep); }
        const focus = est === 'Vacío' && i === 0; const b = box(48, 56, { fill: 'w', r: 8, stroke: est === 'Error' ? 'er' : focus ? 'p6' : 'n3', sw: est === 'Error' || focus ? 2 : 1, name: 'Dígito ' + (i + 1) });
        if (est === 'Vacío') { if (focus) { const caret = figma.createRectangle(); caret.name = 'Cursor'; caret.resize(2, 26); caret.fills = fill('n9'); b.appendChild(caret); } }
        else b.appendChild(await T(dg[i], 'm25', est === 'Error' ? 'er' : 'n9', { name: 'Valor' }));
        c.appendChild(b);
      }
      row.appendChild(c); vs.push(c);
    }
    const set = figma.combineAsVariants(vs, row); set.name = 'Código de verificación'; styleSet(set, 'VERTICAL');
    try { set.description = 'Seis casillas. Acepta pegar el código completo y avanza solo al escribir cada dígito. Error: borde Semantic/Error y mensaje debajo.'; } catch (e) { }
    out.push('Código de verificación');
  }

  // 5. Botón Peligro
  {
    const bset = SETS['Botón']; if (!bset) throw new Error('Falta el componente Botón');
    if (!bset.children.some(c => c.name.includes('Variante=Peligro'))) {
      const srcs = ['Default', 'Hover', 'Focus', 'Disabled'].map(e => bset.children.find(c => c.name.includes('Variante=Primario') && c.name.includes('Estado=' + e))).filter(Boolean);
      const free = bset.layoutMode === 'NONE' || !bset.layoutMode; const maxB = bset.children.reduce((m, c) => Math.max(m, c.y + c.height), 0); const rowGap = 24; let maxR = 0;
      const swap = (node, est) => {
        for (const n of [node, ...node.findAll(() => true)]) for (const prop of ['fills', 'strokes']) {
          if (!(prop in n) || !Array.isArray(n[prop])) continue; let ch = false;
          const out2 = n[prop].map(p => { const b = p.boundVariables && p.boundVariables.color; const v = b && VID[b.id]; if (p.type === 'SOLID' && v && v.name.startsWith('Primary/')) { ch = true; return fill('er', est === 'Disabled' ? 0.4 : (prop === 'strokes' && est === 'Focus' ? 0.45 : p.opacity))[0]; } return p; });
          if (ch) n[prop] = out2;
        }
      };
      for (const s of srcs) {
        const cl = s.clone(); bset.appendChild(cl); cl.name = s.name.replace('Primario', 'Peligro'); const est = (s.name.match(/Estado=(\w+)/) || [])[1];
        swap(cl, est); if (est === 'Hover') cl.fills = [...cl.fills, { type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.12 }];
        if (free) { cl.x = s.x; cl.y = maxB + rowGap; maxR = Math.max(maxR, cl.x + cl.width); }
      }
      if (free) { const pad = 24; const bottom = bset.children.reduce((m, c) => Math.max(m, c.y + c.height), 0); bset.resize(Math.max(bset.width, maxR + pad), bottom + pad); }
      out.push('Botón · Peligro (4 estados)');
    }
  }
  refresh();
  return { grp, text: out.join(', ') };
}

// ---------- pantallas ----------
let SB = {}, GRID = null;
function subnavI(label, ic, active) {
  const m = VAR('Subnav item', 'Activo=' + (active ? 'Sí' : 'No'), 'Estado=Default'); const i = m.createInstance(); const p = {}; p[SUBK.E] = label; p[SUBK.I] = CM['Ícono/' + ic].id; i.setProperties(p);
  const ico = i.findOne(n => n.type === 'INSTANCE'); if (ico) recolor(ico, active ? 'p6' : 'n5'); i.name = 'Subnav · ' + label; return i;
}
async function shell(r, key) {
  const R = ROLE[r]; const sc = SCREENS[key]; const histName = r === 'E' ? 'Pedidos completados' : 'Rutas completadas';
  const crumbName = key === 'hist' ? histName : sc[1]; const title = key === 'hist' ? histName : sc[2];
  const sub = key === 'hist' ? (r === 'E' ? 'Pedidos entregados, con su costo final y su recibo.' : 'Rutas terminadas, con su recorrido y su pago.') : sc[3];
  const name = R.pre + sc[0] + ' · ' + R.role + ' · Perfil' + (key === 'datos' ? '' : ' · ' + crumbName);
  const f = figma.createFrame(); f.name = name; PPANT.appendChild(f); f.layoutMode = 'HORIZONTAL'; f.resize(1440, 900); f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'AUTO'; f.minHeight = 900; f.fills = fill('pa'); f.clipsContent = true; f.itemSpacing = 0;
  const sb = SB[r].clone(); f.appendChild(sb); try { sb.layoutSizingVertical = 'FILL'; } catch (e) { }
  const c = AL('V', { pad: [32, 40, 48, 40], gap: 24, name: 'Contenido' }); add(f, c, 'FILL'); if (GRID) c.layoutGrids = GRID;
  const bc = AL('H', { gap: 8, cross: 'CENTER', name: 'Breadcrumb' }); c.appendChild(bc); const bp = await T('Perfil', 'b14', 'n5', { name: 'Miga · Perfil' }); bc.appendChild(bp);
  const crumbs = key === 'act' || key === 'codes' ? ['Verificación en dos pasos', sc[1]] : [key === 'datos' ? 'Datos de la cuenta' : crumbName.replace(' (desactivada)', '')];
  const crumbNodes = [];
  for (let i = 0; i < crumbs.length; i++) { bc.appendChild(await T('/', 'b14', 'n4')); const t = await T(crumbs[i], i === crumbs.length - 1 ? 'b14s' : 'b14', i === crumbs.length - 1 ? 'n9' : 'n5'); bc.appendChild(t); crumbNodes.push(t); }
  const hd = AL('V', { gap: 6, name: 'Encabezado' }); add(c, hd, 'FILL'); await TW(hd, title, 't31', 'n9'); await TW(hd, sub, 'b16', 'n6');
  const body = AL('H', { gap: 24, name: 'Cuerpo' }); add(c, body, 'FILL');
  const nv = AL('V', { fill: 'w', stroke: 'n2', r: 10, pad: 8, gap: 2, w: 248, name: 'Subnavegación' }); body.appendChild(nv);
  const activeKey = SUBKEY[key] || key; const subs = {};
  for (const [lab, ic, k] of R.sub) { const i = subnavI(lab, ic, k === activeKey); add(nv, i, 'FILL'); subs[k] = i; }
  const panel = AL('V', { gap: 24, name: 'Panel' }); add(body, panel, 'FILL');
  return { f, panel, subs, bp, crumbNodes, r, key };
}

function qrPath() {
  const N = 25, s = 6; let seed = 20261112; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648; let d = '';
  const sq = (x, y) => { d += `M${x * s} ${y * s}h${s}v${s}h${-s}z`; };
  const finder = (fx, fy, x, y) => { const dx = x - fx, dy = y - fy; if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null; return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4); };
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    let f = null; for (const [fx, fy] of [[0, 0], [N - 7, 0], [0, N - 7]]) { const r = finder(fx, fy, x, y); if (r !== null) f = r; }
    const nearF = (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
    if (f === true || (f === null && !nearF && rnd() > 0.52)) sq(x, y);
  }
  return d;
}

async function build(S0, D) {
  const { f, panel, r, key } = S0; const R = ROLE[r]; const E = r === 'E';
  if (key === 'datos') {
    const id = await card(panel, null, null, { name: 'Identidad' }); const ir = AL('H', { gap: 20, cross: 'CENTER' }); add(id, ir, 'FILL');
    const av = box(64, 64, { fill: 'p1', r: 32, name: 'Avatar' }); av.appendChild(await T(R.initials, 't20', 'p7')); ir.appendChild(av);
    const it = AL('V', { gap: 4 }); add(ir, it, 'FILL'); const nm = AL('H', { gap: 8, cross: 'CENTER' }); add(it, nm, 'FILL'); nm.appendChild(await T(R.name, 't20', 'n9')); nm.appendChild(await pill('Cuenta verificada', 'ok'));
    await TW(it, R.role + ' · RNC ' + (E ? '1-31-45678-9' : '1-02-33445-6') + ' · miembro desde marzo 2026', 'b14', 'n6');
    ir.appendChild(btn('Secundario', 'Cambiar logo'));
    const dc = await card(panel, E ? 'Datos de la empresa' : 'Datos del transportista', 'Aparecen en los recibos y en los correos que reciben ' + (E ? 'los transportistas.' : 'las empresas.'));
    if (E) {
      row2(dc, input('Default', 'Razón social', 'Distribuidora Ozama, SRL'), input('Disabled', 'RNC', '1-31-45678-9', 'Para cambiarlo, escribe a soporte.'));
      row2(dc, input('Default', 'Persona de contacto', 'Carla Méndez'), input('Default', 'Teléfono', '809-555-0142'));
      row2(dc, input('Válido', 'Correo de la cuenta', R.mail, 'Correo verificado'), input('Default', 'Dirección de recogida principal', 'Av. Charles de Gaulle 48, Santo Domingo Este'));
    } else {
      row2(dc, input('Default', 'Nombre comercial', 'Transportes Yaque'), input('Disabled', 'RNC', '1-02-33445-6', 'Para cambiarlo, escribe a soporte.'));
      row2(dc, input('Default', 'Persona de contacto', 'Ramón Peña'), input('Default', 'Teléfono', '809-555-0187'));
      row2(dc, input('Válido', 'Correo de la cuenta', R.mail, 'Correo verificado'), input('Default', 'Provincia base', 'Santiago'));
    }
    const ac = AL('H', { gap: 12, main: 'MAX', name: 'Acciones' }); add(panel, ac, 'FILL'); ac.appendChild(btn('Fantasma', 'Descartar cambios')); ac.appendChild(btn('Primario', 'Guardar cambios'));
  }
  if (key === 'seg') {
    const pw = await card(panel, 'Contraseña', 'Cambiada por última vez el 14 de agosto de 2026. Al cambiarla se cierran las demás sesiones.');
    add(pw, input('Default', 'Contraseña actual', '••••••••••'), 'FILL');
    row2(pw, input('Focus', 'Nueva contraseña', '••••••••••••'), input('Válido', 'Confirmar nueva contraseña', '••••••••••••', 'Las contraseñas coinciden'));
    const meter = AL('V', { gap: 8, name: 'Fortaleza' }); add(pw, meter, 'FILL'); const bars = AL('H', { gap: 4, name: 'Barras' }); add(meter, bars, 'FILL');
    for (let i = 0; i < 4; i++) { const b = figma.createRectangle(); b.name = 'Barra ' + (i + 1); b.resize(40, 4); b.cornerRadius = 2; b.fills = fill(i < 3 ? 'ok' : 'n2'); bars.appendChild(b); b.layoutSizingHorizontal = 'FILL'; }
    await TW(meter, 'Seguridad: fuerte', 'b12', 'ok');
    const req = AL('V', { gap: 6, name: 'Requisitos' }); add(pw, req, 'FILL');
    for (const [txt, ok] of [['Al menos 10 caracteres', 1], ['Una mayúscula y una minúscula', 1], ['Al menos un número', 1], ['Distinta del correo y del nombre de la cuenta', 1], ['No usada en tus últimas 3 contraseñas', 0]]) { const l = AL('H', { gap: 8, cross: 'CENTER' }); add(req, l, 'FILL'); l.appendChild(icon(ok ? 'circle-check' : 'circle-x', ok ? 'ok' : 'n4', 16)); l.appendChild(await T(txt, 'b14', ok ? 'n7' : 'n5')); }
    const pa = AL('H', { isPlain: true, main: 'MAX' }); add(pw, pa, 'FILL'); pa.appendChild(btn('Primario', 'Actualizar contraseña'));

    const tf = await card(panel, 'Verificación en dos pasos', 'Te pediremos un código de tu teléfono al iniciar sesión en un dispositivo nuevo.', { gap: 4 });
    await list(tf, [0, 1], async (p, i) => {
      if (i === 0) { const b = btn('Secundario', 'Administrar'); later(b, '2fa'); await itemRow(p, { ic: 'shield-check', icCol: 'ok', bg: 'ok', bgOp: 0.12, title: 'App de autenticación', pills: [['Activada', 'ok']], sub: 'Activada el 12 de noviembre de 2026.', right: [b] }); }
      else { const b = btn('Fantasma', 'Ver códigos'); later(b, 'codes'); await itemRow(p, { ic: 'key-round', title: 'Códigos de respaldo', sub: 'Te quedan 8 de 10. Cada código sirve una sola vez.', right: [b] }); }
    });

    const cerrar = btn('Secundario', 'Cerrar las demás sesiones'); later(cerrar, 'ovSes', 'OVERLAY', DIS);
    const ss = await card(panel, 'Sesiones abiertas', 'Dispositivos con acceso a tu cuenta ahora mismo.', { gap: 4, action: cerrar });
    await list(ss, R.sessions, async (p, s) => { await itemRow(p, { ic: s[0], title: s[1], pills: s[3] ? [['Esta sesión', 'pr']] : [], sub: s[2], right: s[3] ? [] : [btn('Fantasma', 'Cerrar sesión')] }); });

    const ar = await card(panel, 'Actividad reciente', 'Avísanos si ves algo que no reconoces: cambia la contraseña y cierra las demás sesiones.', { gap: 4 });
    await list(ar, [
      ['circle-check', 'ok', 'Inicio de sesión correcto', R.sessions[0][1] + ' · ' + R.sessions[0][2].split(' · ')[0] + ' · hoy, 8:42 a. m.', null],
      ['shield-check', 'ok', 'Verificación en dos pasos activada', '12 nov 2026, 4:15 p. m.', null],
      ['triangle-alert', 's7', 'Intento de inicio de sesión fallido', 'Contraseña incorrecta · IP 45.231.xx.xx · 9 nov 2026, 2:03 a. m.', ['Revisar', 'av']],
      ['lock', 'n6', 'Contraseña cambiada', R.sessions[0][1] + ' · 14 ago 2026', null],
    ], async (p, a) => { await itemRow(p, { ic: a[0], icCol: a[1], title: a[2], sub: a[3], pills: a[4] ? [a[4]] : [] }); });
    const al = AL('H', {}); add(ar, al, 'FILL'); al.paddingTop = 12; al.appendChild(await link('Ver todo el historial'));
  }
  if (key === '2fa') {
    const st = await card(panel, null, null, { name: 'Estado' }); const sr = AL('H', { gap: 20, cross: 'MIN' }); add(st, sr, 'FILL');
    const ib = box(56, 56, { fill: 'p0', r: 28, name: 'Ícono' }); ib.appendChild(icon('shield', 'p6', 28)); sr.appendChild(ib);
    const sx = AL('V', { gap: 6 }); add(sr, sx, 'FILL'); const h = AL('H', { gap: 8, cross: 'CENTER' }); add(sx, h, 'FILL'); h.appendChild(await T('Verificación en dos pasos', 't20', 'n9')); h.appendChild(await pill('Desactivada', 'av'));
    await TW(sx, 'Además de la contraseña, te pediremos un código de 6 dígitos cuando inicies sesión en un dispositivo nuevo. Si alguien obtiene tu contraseña, no podrá ver tus ' + (E ? 'pedidos, recibos ni datos de la empresa.' : 'rutas, pagos ni datos de tus camiones.'), 'b16', 'n6');
    const mc = await card(panel, 'Elige cómo recibir el código', 'Puedes cambiarlo después.');
    const opts = [['Sí', 'App de autenticación', 'Recomendado', 'Google Authenticator, Microsoft Authenticator u otra similar. Funciona sin señal y es la opción más segura.'], ['No', 'Código por correo', null, 'Lo enviamos a ' + R.mailMask + '. Más lento y depende de que tengas acceso al correo.']];
    for (const [sel, t1, tag, d1] of opts) {
      const o = AL('H', { gap: 12, pad: 16, r: 8, stroke: sel === 'Sí' ? 'p6' : 'n2', sw: sel === 'Sí' ? 2 : 1, fill: sel === 'Sí' ? 'p0' : 'w', cross: 'MIN', name: 'Opción · ' + t1 }); add(mc, o, 'FILL');
      const rd = VAR('Radio', 'Seleccionado=' + sel, 'Estado=Default').createInstance(); const rts = rd.findAll(n => n.type === 'TEXT'); for (const t of rts) t.visible = false; o.appendChild(rd);
      const ox = AL('V', { gap: 4 }); add(o, ox, 'FILL'); const oh = AL('H', { gap: 8, cross: 'CENTER' }); add(ox, oh, 'FILL'); oh.appendChild(await T(t1, 'b16s', 'n9')); if (tag) oh.appendChild(await pill(tag, 'pr')); await TW(ox, d1, 'b14', 'n6');
    }
    const ac = AL('H', { gap: 12, main: 'MAX', name: 'Acciones' }); add(mc, ac, 'FILL'); ac.appendChild(btn('Fantasma', 'Ahora no')); const go = btn('Primario', 'Activar'); later(go, 'act'); ac.appendChild(go);
  }
  if (key === 'act') {
    const c = await card(panel, null, null, { name: 'Activación', gap: 24 });
    const stp = AL('H', { gap: 12, cross: 'CENTER', name: 'Pasos' }); add(c, stp, 'FILL');
    const steps = [['1', 'Escanea el código', 'done'], ['2', 'Escribe el código', 'now'], ['3', 'Guarda los respaldos', 'todo']];
    for (let i = 0; i < steps.length; i++) {
      const [n, l, s] = steps[i]; const it = AL('H', { gap: 8, cross: 'CENTER', name: 'Paso ' + n }); stp.appendChild(it);
      const ci = box(28, 28, { fill: s === 'done' ? 'p6' : 'w', r: 14, stroke: s === 'done' ? null : s === 'now' ? 'p6' : 'n3', sw: s === 'now' ? 2 : 1, name: 'Número' });
      if (s === 'done') ci.appendChild(icon('check', 'w', 16)); else ci.appendChild(await T(n, 'm14', s === 'now' ? 'p6' : 'n5')); it.appendChild(ci);
      it.appendChild(await T(l, s === 'todo' ? 'b14' : 'b14s', s === 'todo' ? 'n5' : 'n9'));
      if (i < steps.length - 1) { const ln = figma.createRectangle(); ln.name = 'Conector'; ln.resize(24, 2); ln.cornerRadius = 1; ln.fills = fill(s === 'done' ? 'p6' : 'n2'); stp.appendChild(ln); ln.layoutSizingHorizontal = 'FILL'; }
    }
    divider(c);
    const two = AL('H', { gap: 32, cross: 'MIN', name: 'Escaneo' }); add(c, two, 'FILL');
    const qb = AL('V', { fill: 'w', stroke: 'n2', r: 8, pad: 12, gap: 8, cross: 'CENTER', name: 'Código QR' }); two.appendChild(qb);
    const q = figma.createNodeFromSvg(`<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><path d="${qrPath()}" fill="#15181E"/></svg>`); q.name = 'QR ilustrativo'; for (const v of q.findAll(x => 'fills' in x && Array.isArray(x.fills) && x.fills.length && x.type !== 'FRAME')) v.fills = fill('n9'); qb.appendChild(q);
    qb.appendChild(await T('QR ilustrativo', 'b12', 'n5'));
    const rc = AL('V', { gap: 16, name: 'Instrucciones' }); add(two, rc, 'FILL');
    await TW(rc, '1. Abre tu app de autenticación y escanea el código.', 'b16s', 'n9');
    await TW(rc, '¿No puedes escanear? Escribe esta clave en la app:', 'b14', 'n6');
    const kb = AL('H', { fill: 'n0', stroke: 'n2', r: 8, pad: [10, 16], gap: 12, cross: 'CENTER', name: 'Clave secreta' }); add(rc, kb, 'FILL'); await TW(kb, 'JBSW Y3DP EHPK 3PXP', 'm20', 'n9'); kb.appendChild(btn('Fantasma', 'Copiar'));
    await TW(rc, '2. Escribe el código de 6 dígitos que muestra la app.', 'b16s', 'n9');
    rc.appendChild(VAR('Código de verificación', 'Estado=Completo').createInstance());
    await TW(rc, 'El código cambia cada 30 segundos.', 'b12', 'n5');
    const ac = AL('H', { gap: 12, main: 'MAX', name: 'Acciones' }); add(c, ac, 'FILL'); const cn = btn('Fantasma', 'Cancelar'); later(cn, '2fa'); ac.appendChild(cn); const ok = btn('Primario', 'Verificar y activar'); later(ok, 'codes'); ac.appendChild(ok);
  }
  if (key === 'codes') {
    const bn = AL('H', { fill: 'ok', op: 0.1, r: 10, pad: 16, gap: 12, cross: 'MIN', name: 'Aviso · activada' }); add(panel, bn, 'FILL'); bn.appendChild(icon('shield-check', 'ok', 22));
    const bx = AL('V', { gap: 2 }); add(bn, bx, 'FILL'); await TW(bx, 'Verificación en dos pasos activada', 'b16s', 'n9'); await TW(bx, 'Desde ahora te pediremos un código al iniciar sesión en un dispositivo nuevo.', 'b14', 'n7');
    const c = await card(panel, 'Códigos de respaldo', 'Úsalos si pierdes el teléfono. Cada código sirve una sola vez. Guárdalos en un lugar seguro: después solo verás cuántos te quedan.');
    const grid = AL('H', { fill: 'n0', r: 8, pad: 20, gap: 48, name: 'Códigos' }); add(c, grid, 'FILL');
    const codes = ['4F7K-92QD', '8M2P-L6XT', 'R9WC-3HJ5', '7TQB-N4ZE', 'K2VD-8YRM', 'H6LS-1PGA', '3XNF-W7CU', 'Q5JE-9BKD', 'Z8HR-2MVP', 'D4GY-6TQN'];
    for (const col of [0, 1]) { const cc = AL('V', { gap: 10 }); grid.appendChild(cc); for (let i = 0; i < 5; i++) { const k = col * 5 + i; const l = AL('H', { gap: 12, cross: 'CENTER' }); cc.appendChild(l); const nn = await T(String(k + 1).padStart(2, '0'), 'm14', 'n4'); l.appendChild(nn); l.appendChild(await T(codes[k], 'm20', 'n9')); } }
    const tools = AL('H', { gap: 12, cross: 'CENTER' }); add(c, tools, 'FILL'); tools.appendChild(btn('Secundario', 'Descargar .txt')); tools.appendChild(btn('Secundario', 'Copiar')); tools.appendChild(btn('Fantasma', 'Imprimir'));
    divider(c);
    const conf = AL('H', { gap: 12, cross: 'CENTER', main: 'SPACE_BETWEEN', name: 'Confirmación' }); add(c, conf, 'FILL');
    const lf = AL('H', { gap: 8, cross: 'CENTER' }); conf.appendChild(lf);
    const cb = VAR('Checkbox', 'Marcado=Sí').createInstance(); const cts = cb.findAll(n => n.type === 'TEXT'); lf.appendChild(cb);
    if (cts.length) setTxt(cts[0], 'Guardé mis códigos en un lugar seguro'); else lf.appendChild(await T('Guardé mis códigos en un lugar seguro', 'b14', 'n9'));
    const ok = btn('Primario', 'Listo'); later(ok, 'seg'); conf.appendChild(ok);
  }
  if (key === 'hist') {
    const sr = AL('H', { gap: 16, name: 'Resumen' }); add(panel, sr, 'FILL');
    if (E) { await stat(sr, 'Pedidos entregados', '38', 'en los últimos 90 días'); await stat(sr, 'Ahorro estimado', 'RD$ 41,260', 'frente a enviar cada pedido solo'); await stat(sr, 'Entregas a tiempo', '95 %', '36 de 38 pedidos'); }
    else { await stat(sr, 'Rutas completadas', '24', 'en los últimos 90 días'); await stat(sr, 'Km recorridos', '2,184 km', 'con 81 % de capacidad media'); await stat(sr, 'Pagos liquidados', 'RD$ 186,400', '2 pagos en proceso'); }
    const fr = AL('H', { gap: 12, cross: 'MAX', name: 'Filtros' }); add(panel, fr, 'FILL');
    const se = select('Periodo', 'Últimos 90 días'); fr.appendChild(se); try { se.resize(200, se.height); } catch (e) { }
    add(fr, input('Default', 'Buscar', E ? 'ID de pedido o destino' : 'ID de ruta o ciudad'), 'FILL'); fr.appendChild(btn('Secundario', 'Exportar CSV'));
    const dl = () => icon('file-text', 'p6', 18);
    if (E) {
      const rows = [['PED-0139', '11 nov', { isPlain: true, main: 'Haina – ZF Las Américas', sub: '1,200 kg · ruta R-0031' }, 'RD$ 2,369.83'], ['PED-0136', '8 nov', { isPlain: true, main: 'Herrera – Santiago', sub: '850 kg · ruta R-0029' }, 'RD$ 3,104.50'], ['PED-0131', '4 nov', { isPlain: true, main: 'Los Alcarrizos – Bávaro', sub: '1,600 kg · ruta R-0027' }, 'RD$ 5,880.00'], ['PED-0128', '1 nov', { isPlain: true, main: 'Haina – San Pedro de Macorís', sub: '700 kg · ruta R-0025' }, 'RD$ 1,742.10'], ['PED-0122', '28 oct', { isPlain: true, main: 'Villa Mella – La Vega', sub: '2,100 kg · ruta R-0023' }, 'RD$ 4,915.75'], ['PED-0119', '24 oct', { isPlain: true, main: 'Haina – ZF Las Américas', sub: '950 kg · ruta R-0021' }, 'RD$ 1,988.40']];
      await table(panel, [{ h: 'Pedido', w: 88, mono: true }, { h: 'Entregado', w: 84, muted: true }, { h: 'Trayecto', fill: true }, { h: 'Costo final', w: 112, mono: true }, { h: 'Estado', w: 112 }, { h: '', w: 24 }], rows.map(r => [r[0], r[1], r[2], r[3], badge('Entregado'), dl()]));
    } else {
      const rows = [['R-0031', '11 nov', { isPlain: true, main: 'Haina – ZF Las Américas – Villa Mella', sub: '4 pedidos · 4,550 kg · L-284519' }, 'RD$ 9,840.00', 'Pagado'], ['R-0029', '8 nov', { isPlain: true, main: 'Santo Domingo – Santiago', sub: '3 pedidos · 3,900 kg · L-284519' }, 'RD$ 14,200.00', 'Pagado'], ['R-0027', '4 nov', { isPlain: true, main: 'Los Alcarrizos – Bávaro', sub: '2 pedidos · 2,700 kg · L-301122' }, 'RD$ 12,650.00', 'En proceso'], ['R-0025', '1 nov', { isPlain: true, main: 'Haina – San Pedro de Macorís', sub: '3 pedidos · 3,050 kg · L-284519' }, 'RD$ 7,980.00', 'Pagado'], ['R-0023', '28 oct', { isPlain: true, main: 'Villa Mella – La Vega', sub: '2 pedidos · 3,400 kg · L-301122' }, 'RD$ 10,120.00', 'Pagado']];
      const out = []; for (const r of rows) out.push([r[0], r[1], r[2], r[3], await pill(r[4], r[4] === 'Pagado' ? 'ok' : 'av'), dl()]);
      await table(panel, [{ h: 'Ruta', w: 72, mono: true }, { h: 'Fecha', w: 64, muted: true }, { h: 'Recorrido', fill: true }, { h: 'Pago', w: 124, mono: true }, { h: 'Liquidación', w: 104 }, { h: '', w: 24 }], out);
    }
    const pg = AL('H', { gap: 12, cross: 'CENTER', name: 'Paginación' }); add(panel, pg, 'FILL'); await TW(pg, E ? 'Mostrando 1–6 de 38 pedidos' : 'Mostrando 1–5 de 24 rutas', 'b14', 'n6'); pg.appendChild(btn('Secundario', 'Anterior', 'Disabled')); pg.appendChild(btn('Secundario', 'Siguiente'));
  }
  if (key === 'noti') {
    const c1 = await card(panel, E ? 'Tus pedidos' : 'Tus rutas', 'Llegan a ' + R.mail + '. Cambia el correo en Datos de la cuenta.', { gap: 4 });
    const items = E ? [['Pedido asignado a una ruta', 'Con el camión, el transportista y la fecha de recogida.', 'Activado'], ['Recordatorio un día antes de la recogida', 'Para que la carga esté lista cuando llegue el camión.', 'Bloqueado'], ['Pedido en tránsito', 'Cuando el camión sale con tu carga.', 'Activado'], ['Pedido entregado y recibo disponible', 'Con el costo final repartido por ton-km.', 'Activado'], ['Cambio en la fecha de recogida', 'Si el transportista o la ruta cambian.', 'Activado'], ['Resumen semanal', 'Pedidos de la semana y ahorro por consolidación.', 'Desactivado']]
      : [['Nueva ruta asignada', 'Es la forma en que recibes trabajo en la plataforma.', 'Bloqueado'], ['Recordatorio un día antes de la recogida', 'Con las paradas y el orden de carga.', 'Activado'], ['Cambio en una ruta asignada', 'Si una empresa cambia o cancela un pedido.', 'Activado'], ['Pago liquidado', 'Cuando el pago de una ruta queda disponible.', 'Activado'], ['Documentos de un camión por vencer', 'Marbete y seguro, 15 días antes.', 'Activado'], ['Resumen semanal', 'Rutas, km y pagos de la semana.', 'Desactivado']];
    await list(c1, items, toggleRow);
    const c2 = await card(panel, 'Alertas de seguridad', 'Siempre activas, para que sepas de inmediato si alguien entra a tu cuenta.', { gap: 4 });
    await list(c2, [['Inicio de sesión desde un dispositivo nuevo', null, 'Bloqueado'], ['Cambio de contraseña o de verificación en dos pasos', null, 'Bloqueado']], toggleRow);
    const c3 = await card(panel, 'Novedades', null, { gap: 4 }); await list(c3, [['Nuevas funciones y mejoras', 'Uno o dos correos al mes como máximo.', 'Desactivado']], toggleRow);
    const nt = AL('H', { gap: 12, cross: 'CENTER', name: 'Acciones' }); add(panel, nt, 'FILL'); await TW(nt, 'Por ahora todas las notificaciones llegan por correo.', 'b14', 'n5'); nt.appendChild(btn('Primario', 'Guardar preferencias'));
  }
  if (key === 'equipo') {
    const inv = btn('Primario', 'Invitar usuario');
    const c = await card(panel, 'Usuarios', '3 de 5 usuarios incluidos en tu plan.', { action: inv });
    const usr = async (ini, n, m, tags) => { const w = AL('H', { gap: 12, cross: 'CENTER' }); const a = box(36, 36, { fill: 'p1', r: 18, name: 'Avatar' }); a.appendChild(await T(ini, 'b14s', 'p7')); w.appendChild(a); const tx = AL('V', { gap: 2 }); add(w, tx, 'FILL'); const h = AL('H', { gap: 8, cross: 'CENTER' }); add(tx, h, 'FILL'); h.appendChild(await T(n, 'b14s', 'n9')); for (const t of tags) h.appendChild(await pill(t[0], t[1])); await TW(tx, m, 'b12', 'n5', { one: true }); return w; };
    const kebab = () => icon('ellipsis-vertical', 'n6', 20);
    const rows = [
      [await usr('CM', 'Carla Méndez', 'carla.mendez@distribuidoraozama.do', [['Tú', 'ne']]), 'Administradora', 'Ahora', null],
      [await usr('LH', 'Luis Herrera', 'luis.herrera@distribuidoraozama.do', []), 'Operador', 'Hace 3 horas', kebab()],
      [await usr('AP', 'Ana Polanco', 'ana.polanco@distribuidoraozama.do', [['Invitación pendiente', 'av']]), 'Solo lectura', 'Enviada el 10 nov', kebab()],
    ];
    const tt = await table(c, [{ h: 'Usuario', fill: true }, { h: 'Rol', w: 120 }, { h: 'Último acceso', w: 116, muted: true }, { h: '', w: 20 }], rows);
    for (const fr of tt.children.filter(x => x.name.startsWith('Fila'))) { const cells = fr.children; if (cells[0] && cells[0].children[0] && cells[0].children[0].layoutSizingHorizontal !== undefined) try { cells[0].children[0].layoutSizingHorizontal = 'FILL'; } catch (e) { } }
    const rl = await card(panel, 'Qué puede hacer cada rol', null);
    const grid = AL('H', { gap: 16, name: 'Roles' }); add(rl, grid, 'FILL');
    for (const [t, ic, d] of [['Administrador', 'shield-check', 'Todo lo de Operador, más usuarios, datos de la empresa, seguridad y cierre de la cuenta.'], ['Operador', 'package-plus', 'Crea y edita pedidos, ve rutas, recibos y el historial de pedidos.'], ['Solo lectura', 'eye', 'Ve pedidos, rutas y recibos. No puede crear, editar ni cancelar.']]) {
      const b = AL('V', { fill: 'n0', r: 8, pad: 16, gap: 8, name: 'Rol · ' + t }); add(grid, b, 'FILL'); b.appendChild(icon(ic, 'p6', 20)); await TW(b, t, 'b16s', 'n9'); await TW(b, d, 'b14', 'n6');
    }
  }
  if (key === 'priv') {
    const c1 = await card(panel, 'Tus datos', 'La Ley 172-13 de protección de datos personales te permite pedir una copia de tu información, corregirla o pedir que se elimine.', { gap: 4 });
    await list(c1, [0, 1], async (p, i) => {
      if (i === 0) await itemRow(p, { ic: 'download', title: 'Descargar una copia de tus datos', sub: (E ? 'Pedidos, recibos' : 'Rutas, pagos, camiones') + ' y datos de la cuenta en un .zip con archivos CSV y JSON. Te avisamos por correo cuando esté listo, normalmente en menos de 24 horas.', right: [btn('Secundario', 'Solicitar copia')] });
      else await itemRow(p, { ic: 'file-text', title: 'Política de privacidad y términos de uso', sub: 'Última actualización: 1 de septiembre de 2026.', right: [await link('Leer')] });
    });
    const c2 = await card(panel, 'Consentimientos', null, { gap: 4 });
    await list(c2, [['Usar mis datos de forma anónima para mejorar las rutas', 'Pesos, volúmenes y trayectos, sin nombres ni RNC. Ayuda a que el algoritmo consolide mejor.', 'Activado'], ['Compartir mi teléfono con ' + (E ? 'el transportista asignado' : 'las empresas de mis rutas'), 'Solo mientras haya un pedido activo entre ustedes.', 'Activado']], toggleRow);
    const del = btn('Peligro', 'Eliminar cuenta'); later(del, 'ovDel', 'OVERLAY', DIS);
    const c3 = await card(panel, 'Eliminar cuenta', 'Se borran la cuenta, ' + (E ? 'sus usuarios' : 'tus camiones') + ' y tus preferencias. Los recibos y comprobantes fiscales se conservan el tiempo que exige la ley.', { danger: true, gap: 16 });
    for (const t of [E ? 'No puedes eliminarla si tienes pedidos asignados o en tránsito.' : 'No puedes eliminarla si tienes rutas asignadas o en curso.', 'Esta acción no se puede deshacer.']) { const l = AL('H', { gap: 8, cross: 'CENTER' }); add(c3, l, 'FILL'); l.appendChild(icon('circle-alert', 'er', 16)); await TW(l, t, 'b14', 'n7'); }
    const a = AL('H', {}); add(c3, a, 'FILL'); a.appendChild(del);
  }
}

async function overlay(name, build2) {
  const o = figma.createFrame(); o.name = name; PPANT.appendChild(o); o.resize(1440, 900); o.fills = []; o.clipsContent = true;
  const bg = figma.createRectangle(); bg.name = 'Fondo'; bg.resize(1440, 900); bg.fills = fill('n9', 0.45); o.appendChild(bg);
  const m = AL('V', { fill: 'w', r: 12, pad: 28, gap: 20, w: 480, name: 'Modal' }); o.appendChild(m);
  m.effects = [{ type: 'DROP_SHADOW', color: { r: 0.08, g: 0.09, b: 0.12, a: 0.25 }, offset: { x: 0, y: 16 }, radius: 40, spread: 0, visible: true, blendMode: 'NORMAL' }];
  await build2(m); m.x = Math.round((1440 - m.width) / 2); m.y = Math.round((900 - m.height) / 2);
  await bg.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'CLOSE' }] }]);
  return o;
}

// ---------- main ----------
async function main() {
  await init(); say('Archivo cargado. ' + Object.keys(F).length + ' frames en Pantallas.');
  if (F['10b · Empresa · Perfil · Seguridad']) { say('✖ La v5 ya se ejecutó en este archivo (existe 10b). Deshaz con Ctrl+Z o el historial de versiones antes de correrla otra vez.'); return; }
  const oldE = F['10 · Empresa · Perfil'], oldT = F['14 · Transportista · Perfil'];
  if (!oldE || !oldT) throw new Error('Faltan las pantallas 10 · Empresa · Perfil o 14 · Transportista · Perfil');
  SB.E = oldE.findOne(n => n.name === 'Sidebar'); SB.T = oldT.findOne(n => n.name === 'Sidebar');
  if (!SB.E || !SB.T) throw new Error('No encuentro el Sidebar en las pantallas de perfil');
  const ce = oldE.findOne(n => n.name === 'Contenido'); if (ce && ce.layoutGrids && ce.layoutGrids.length) GRID = JSON.parse(JSON.stringify(ce.layoutGrids));
  const existingBottom = PPANT.children.reduce((m, n) => Math.max(m, n.y + n.height), 0);
  const x0 = F['01 · Landing'] ? F['01 · Landing'].x : 0;

  let comps = null;
  const okC = await step('Componentes nuevos', async () => { comps = await buildComponents(); return comps.text; });
  if (!okC) { say('Me detengo: sin los componentes no puedo armar las pantallas.'); return; }

  await figma.setCurrentPageAsync(PPANT);
  const NEW = { E: {}, T: {} }; const ORDER = { E: ['datos', 'seg', '2fa', 'act', 'codes', 'hist', 'noti', 'equipo', 'priv'], T: ['datos', 'seg', '2fa', 'act', 'codes', 'hist', 'noti', 'priv'] };
  // carcasas primero, para poder enlazar entre ellas
  await step('Carcasas de pantallas (sidebar, subnavegación, encabezado)', async () => { let n = 0; for (const r of ['E', 'T']) for (const k of ORDER[r]) { NEW[r][k] = await shell(r, k); n++; } return n + ' pantallas'; });
  const OV = {};
  await step('Overlays: cerrar sesiones y eliminar cuenta', async () => {
    OV.ovSes = await overlay('Overlay · Cerrar las demás sesiones', async (m) => {
      const ib = box(44, 44, { fill: 'p0', r: 22, name: 'Ícono' }); ib.appendChild(icon('log-out', 'p6', 22)); m.appendChild(ib);
      await TW(m, '¿Cerrar las demás sesiones?', 't25', 'n9'); await TW(m, 'Se cerrará la sesión en los otros 2 dispositivos. Para volver a entrar tendrán que usar la contraseña y el código de verificación. Tú sigues conectado aquí.', 'b16', 'n6');
      const a = AL('H', { gap: 12, main: 'MAX' }); add(m, a, 'FILL'); const c = btn('Fantasma', 'Cancelar'); a.appendChild(c); later(c, 'CLOSE'); const ok = btn('Primario', 'Cerrar sesiones'); a.appendChild(ok); later(ok, 'CLOSE');
    });
    OV.ovDel = await overlay('Overlay · Eliminar cuenta', async (m) => {
      const ib = box(44, 44, { fill: 'er', op: 0.1, r: 22, name: 'Ícono' }); ib.appendChild(icon('triangle-alert', 'er', 22)); m.appendChild(ib);
      await TW(m, 'Eliminar tu cuenta', 't25', 'n9'); await TW(m, 'No se puede deshacer. Se borran tus datos de cuenta, usuarios y preferencias. Los recibos y comprobantes fiscales se conservan el tiempo que exige la ley.', 'b16', 'n6');
      add(m, input('Válido', 'Escribe ELIMINAR para confirmar', 'ELIMINAR'), 'FILL'); add(m, input('Default', 'Contraseña', '••••••••••'), 'FILL');
      const a = AL('H', { gap: 12, main: 'MAX' }); add(m, a, 'FILL'); const c = btn('Fantasma', 'Cancelar'); a.appendChild(c); later(c, 'CLOSE'); const ok = btn('Peligro', 'Eliminar cuenta definitivamente'); a.appendChild(ok); later(ok, 'landing');
    });
    return '2 overlays';
  });

  for (const r of ['E', 'T']) for (const k of ORDER[r]) { const S0 = NEW[r][k]; await step(S0.f.name, async () => { await build(S0); }); }

  // 03b · inicio de sesión con código
  let L2 = null;
  await step('03b · Verificación en dos pasos al iniciar sesión', async () => {
    const login = F['03 · Inicio de sesión']; if (!login) throw new Error('Falta 03 · Inicio de sesión');
    L2 = login.clone(); L2.name = '03b · Verificación en dos pasos (inicio de sesión)';
    const bt = L2.findAll(n => n.type === 'INSTANCE').find(i => i.findAll(t => t.type === 'TEXT').some(t => t.characters === 'Iniciar sesión'));
    let form = null; if (bt) { let p = bt.parent; while (p && p !== L2) { if (p.type === 'FRAME' && p.layoutMode === 'VERTICAL' && p.width <= 560) form = p; p = p.parent; } }
    if (!form) { for (const c of [...L2.children]) c.remove(); L2.layoutMode = 'VERTICAL'; L2.primaryAxisAlignItems = 'CENTER'; L2.counterAxisAlignItems = 'CENTER'; form = AL('V', { fill: 'w', stroke: 'n2', r: 12, pad: 40, gap: 20, w: 440, name: 'Formulario' }); L2.appendChild(form); }
    for (const c of [...form.children]) c.remove(); if (!form.itemSpacing || form.itemSpacing < 16) form.itemSpacing = 20;
    const ib = box(48, 48, { fill: 'p0', r: 24, name: 'Ícono' }); ib.appendChild(icon('shield-check', 'p6', 24)); form.appendChild(ib);
    await TW(form, 'Verificación en dos pasos', 't25', 'n9'); await TW(form, 'Escribe el código de 6 dígitos que muestra tu app de autenticación.', 'b16', 'n6');
    form.appendChild(VAR('Código de verificación', 'Estado=Vacío').createInstance()); await TW(form, 'El código cambia cada 30 segundos.', 'b12', 'n5');
    const cbw = AL('H', { gap: 8, cross: 'CENTER' }); add(form, cbw, 'FILL'); const cb = VAR('Checkbox', 'Marcado=No').createInstance(); cbw.appendChild(cb); const cts = cb.findAll(n => n.type === 'TEXT'); if (cts.length) setTxt(cts[0], 'Recordar este dispositivo durante 30 días'); else await TW(cbw, 'Recordar este dispositivo durante 30 días', 'b14', 'n7');
    const v = btn('Primario', 'Verificar'); add(form, v, 'FILL'); later(v, 'ep');
    const lk = AL('V', { gap: 12, name: 'Enlaces' }); add(form, lk, 'FILL'); lk.appendChild(await link('Usar un código de respaldo')); const back = await link('Volver a iniciar sesión', 'n6'); lk.appendChild(back); later(back, 'login');
    const lb = login.findAll(n => n.type === 'INSTANCE').find(i => i.findAll(t => t.type === 'TEXT').some(t => t.characters === 'Iniciar sesión')); if (lb) await onClick(lb, L2);
    return form.name;
  });

  // posiciones
  await step('Ubicar en el canvas', async () => {
    const yA = existingBottom + 700; const tA = await T('Perfil y seguridad · Empresa', 'd39', 'n9'); PPANT.appendChild(tA); tA.x = x0; tA.y = yA - 160;
    const rowA = [L2, ...ORDER.E.map(k => NEW.E[k].f), OV.ovSes, OV.ovDel].filter(Boolean); rowA.forEach((f, i) => { f.x = x0 + i * 1540; f.y = yA; });
    const yB = rowA.reduce((m, f) => Math.max(m, f.y + f.height), 0) + 700; const tB = await T('Perfil y seguridad · Transportista', 'd39', 'n9'); PPANT.appendChild(tB); tB.x = x0 + 1540; tB.y = yB - 160;
    ORDER.T.forEach((k, i) => { const f = NEW.T[k].f; f.x = x0 + (i + 1) * 1540; f.y = yB; });
    oldE.name = '10 · Empresa · Perfil (versión anterior)'; oldT.name = '14 · Transportista · Perfil (versión anterior)';
    for (const o of [oldE, oldT]) { try { o.annotations = [{ label: 'Reemplazada por la sección Perfil y seguridad. Puedes borrarla.' }]; } catch (e) { } }
    return 'filas en y = ' + Math.round(yA) + ' y ' + Math.round(yB);
  });

  // prototipo
  await step('Prototipo: subnavegación, flujos y reemplazo del Perfil viejo', async () => {
    let n = 0, ret = 0;
    // reemplazar destinos al perfil viejo en todo Pantallas
    const map = {}; map[oldE.id] = NEW.E.datos.f.id; map[oldT.id] = NEW.T.datos.f.id;
    for (const node of PPANT.findAll(x => 'reactions' in x && x.reactions && x.reactions.length)) {
      let ch = false; const rs = node.reactions.map(r => { const c = cleanR(r); c.actions = c.actions.map(a => { if (a && a.type === 'NODE' && map[a.destinationId]) { ch = true; return Object.assign({}, a, { destinationId: map[a.destinationId] }); } return a; }); return c; });
      if (ch) { try { await node.setReactionsAsync(rs); ret++; } catch (e) { } }
    }
    for (const r of ['E', 'T']) for (const k of ORDER[r]) {
      const S0 = NEW[r][k];
      for (const [sk, inst] of Object.entries(S0.subs)) { const d = NEW[r][sk]; if (d && d.f !== S0.f) { await onClick(inst, d.f); n++; } }
      await onClick(S0.bp, NEW[r].datos.f, 'NAVIGATE'); if (S0.crumbNodes.length > 1) await onClick(S0.crumbNodes[0], NEW[r]['2fa'].f);
    }
    for (const [node, dest, nv, tr] of LINKS) {
      let d = dest; if (typeof dest === 'string') {
        if (dest === 'CLOSE') d = 'CLOSE'; else if (OV[dest]) d = OV[dest]; else if (dest === 'landing') d = F['01 · Landing']; else if (dest === 'ep') d = F['05 · Empresa · Panel']; else if (dest === 'login') d = F['03 · Inicio de sesión'];
        else { let p = node; let r = null; while (p && p.parent) { if (p.parent === PPANT) break; p = p.parent; } for (const rr of ['E', 'T']) for (const k of ORDER[rr]) if (NEW[rr][k].f === p) r = rr; d = r ? (NEW[r][dest] && NEW[r][dest].f) : null; }
      }
      if (d) { try { await onClick(node, d, nv || 'NAVIGATE', tr || (nv === 'OVERLAY' ? DIS : null)); n++; } catch (e) { say('   sin enlazar: ' + node.name + ' · ' + e.message); } }
    }
    // hover en instancias nuevas
    let hov = 0; const targets = [...ORDER.E.map(k => NEW.E[k].f), ...ORDER.T.map(k => NEW.T[k].f), OV.ovSes, OV.ovDel, L2].filter(Boolean);
    for (const fr of targets) for (const inst of fr.findAllWithCriteria({ types: ['INSTANCE'] })) {
      const m = await inst.getMainComponentAsync(); if (!m || !m.parent || m.parent.type !== 'COMPONENT_SET') continue;
      if (!['Botón', 'Nav item', 'Tab', 'Card', 'Subnav item'].includes(m.parent.name) || !m.name.includes('Estado=Default')) continue;
      const h = m.parent.children.find(c => c.name === m.name.replace('Estado=Default', 'Estado=Hover')); if (!h) continue;
      try { const keep = (inst.reactions || []).filter(r => r.trigger.type !== 'ON_HOVER').map(cleanR); await inst.setReactionsAsync([...keep, { trigger: { type: 'ON_HOVER' }, actions: [nav(h, 'CHANGE_TO', TR)] }]); hov++; } catch (e) { }
    }
    const fsp = (PPANT.flowStartingPoints || []).filter(p => !p.name.startsWith('C ·') && !p.name.startsWith('D ·'));
    PPANT.flowStartingPoints = [...fsp, { nodeId: NEW.E['2fa'].f.id, name: 'C · Activar verificación en dos pasos' }, { nodeId: NEW.E.seg.f.id, name: 'D · Seguridad de la cuenta' }];
    return n + ' enlaces, ' + ret + ' enlaces al perfil viejo redirigidos, ' + hov + ' hovers';
  });

  // prueba a 1280 px
  await step('Prueba de ancho mínimo (1280 px)', async () => {
    const report = []; let fixed = 0;
    const scan = (f, W) => { const right = f.absoluteBoundingBox.x + W + 1; const bad = []; const walk = (n) => { if (!n.visible) return; const b = n.absoluteBoundingBox; if (n !== f && b && b.x + b.width > right) bad.push(n); if (n.type === 'INSTANCE') return; if (n !== f && 'clipsContent' in n && n.clipsContent) return; if ('children' in n) for (const c of n.children) walk(c); }; walk(f); return bad; };
    const all = [...ORDER.E.map(k => NEW.E[k].f), ...ORDER.T.map(k => NEW.T[k].f)];
    for (const f of all) {
      const pm = f.primaryAxisSizingMode, cm = f.counterAxisSizingMode; const setW = (w) => { f.resize(w, f.height); f.primaryAxisSizingMode = pm; f.counterAxisSizingMode = cm; };
      setW(1280); let bad = scan(f, 1280);
      for (const t of bad.filter(n => n.type === 'TEXT' && n.parent && n.parent.layoutMode && n.parent.layoutMode !== 'NONE')) { try { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; fixed++; } catch (e) { } }
      bad = scan(f, 1280); setW(1440); const b14 = scan(f, 1440); const nm = a => a.slice(-3).map(n => n.name).join(', ');
      if (bad.length || b14.length) report.push(f.name + (b14.length ? ' [1440: ' + nm(b14) + ']' : '') + (bad.length ? ' [1280: ' + nm(bad) + ']' : ''));
    }
    if (report.length) { report.forEach(r => say('   desborda · ' + r)); return fixed + ' textos ajustados; ' + report.length + ' pantallas aún desbordan'; }
    return fixed + ' textos ajustados; ninguna pantalla desborda a 1280 ni a 1440';
  });

  // exportar
  await step('Exportar capturas', async () => {
    let n = 0, bytes = 0;
    if (comps && comps.grp) { bytes += await sendPNG(comps.grp, 'v5-c-perfil-y-seguridad.png', 1); n++; }
    const bset = SETS['Botón']; if (bset) { bytes += await sendPNG(bset, 'v5-c-boton.png', 1); n++; }
    const all = [L2, ...ORDER.E.map(k => NEW.E[k].f), ...ORDER.T.map(k => NEW.T[k].f), OV.ovSes, OV.ovDel].filter(Boolean);
    for (const f of all) { bytes += await sendPNG(f, 'v5-p-' + slug(f.name) + '.png', f.height > 1800 ? 0.6 : 0.8); n++; }
    return n + ' imágenes, ' + (bytes / 1048576).toFixed(1) + ' MB';
  });
}

main().then(() => { say('Listo.'); figma.ui.postMessage({ type: 'done' }); }).catch(e => { say('✖ Error general: ' + (e && e.message ? e.message : e)); figma.ui.postMessage({ type: 'done' }); });
