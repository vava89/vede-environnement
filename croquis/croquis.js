/* VÉDÉ Terrain : laboratoire du croquis de terrain.
   Module autonome, hors application : fond cadastral DXF, objets typés posés sur le plan, réseau déduit du dessin,
   anomalies et contrôles de complétude, constat déduit, sorties PDF et DXF.
   Coordonnées : mètres locaux (coordonnées du fichier moins une origine, multipliées par l'unité), y vers le nord. */
(function(global){
'use strict';
var VC = global.VCroquis = {version: '0.1.0'};

/* ---------- Outils ---------- */
function uid(){ return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]; }); }
function clamp(x, a, b){ return x < a ? a : x > b ? b : x; }
function num(s){ if (typeof s === 'number') return isFinite(s) ? s : null; var t = String(s == null ? '' : s).replace(/\s/g, '').replace(',', '.'); if (!/^-?\d*\.?\d+$/.test(t)) return null; var x = parseFloat(t); return isFinite(x) ? x : null; }
function frNum(x, d){ if (x == null || !isFinite(x)) return ''; var t = d == null ? String(x) : x.toFixed(d); return t.replace('.', ','); }
function nowISO(){ return new Date().toISOString(); }
function copie(o){ return JSON.parse(JSON.stringify(o)); }
function projSeg(p, a, b){
  var dx = b.x - a.x, dy = b.y - a.y, L2 = dx * dx + dy * dy, t = L2 ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / L2 : 0;
  t = clamp(t, 0, 1); var x = a.x + t * dx, y = a.y + t * dy;
  return {t: t, x: x, y: y, d: Math.hypot(p.x - x, p.y - y)};
}
function norm(s){ return String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
VC.outils = {uid: uid, esc: esc, clamp: clamp, num: num, frNum: frNum, copie: copie, projSeg: projSeg, norm: norm};

/* ---------- Couleurs AutoCAD (ACI), approchées : 1 à 9 exactes, 10 à 249 par teinte, 250 à 255 en gris ---------- */
var ACI = (function(){
  var t = [[0, 0, 0], [255, 0, 0], [255, 255, 0], [0, 255, 0], [0, 255, 255], [0, 0, 255], [255, 0, 255], [255, 255, 255], [128, 128, 128], [192, 192, 192]];
  function hsv(h, s, v){ var i = Math.floor(h / 60) % 6, f = h / 60 - Math.floor(h / 60), p = v * (1 - s), q = v * (1 - f * s), u = v * (1 - (1 - f) * s);
    var r = [[v, u, p], [q, v, p], [p, v, u], [p, q, v], [u, p, v], [v, p, q]][i]; return [Math.round(r[0] * 255), Math.round(r[1] * 255), Math.round(r[2] * 255)]; }
  var V = [1, 1, .8, .8, .65, .65, .5, .5, .3, .3];
  for (var n = 10; n < 250; n++){ var h = Math.floor((n - 10) / 10) * 15, k = n % 10; t[n] = hsv(h, k % 2 ? .5 : 1, V[k]); }
  [51, 91, 132, 173, 214, 255].forEach(function(g, k){ t[250 + k] = [g, g, g]; });
  return t;
})();
function aciRgb(n){ n = Math.abs(n | 0); return ACI[n] || ACI[7]; }
VC.aciRgb = aciRgb;

/* ---------- Lecture DXF (ASCII, R12 à R2018) ----------
   Entités lues : LINE, LWPOLYLINE, POLYLINE 2D et 3D, ARC, CIRCLE, ELLIPSE, SPLINE, SOLID, TRACE, LEADER, TEXT, ATTRIB, MTEXT,
   INSERT (blocs imbriqués, échelles, rotation, miroir, réseaux MINSERT) et DIMENSION (bloc anonyme). Le reste est compté puis ignoré. */
function decoderDxf(u8){
  var debut = new TextDecoder('latin1').decode(u8.subarray(0, Math.min(u8.length, 40000)));
  if (/^AutoCAD Binary DXF/.test(debut)) throw new Error('Ce DXF est enregistré en binaire : réenregistrez-le en DXF ASCII (texte).');
  if (u8.length >= 3 && u8[0] === 0xEF && u8[1] === 0xBB && u8[2] === 0xBF) return {txt: new TextDecoder('utf-8').decode(u8.subarray(3)), enc: 'UTF-8'};
  var ver = /\$ACADVER\s*\r?\n\s*1\s*\r?\n\s*(AC\d+)/.exec(debut), cp = /\$DWGCODEPAGE\s*\r?\n\s*3\s*\r?\n\s*(\S+)/.exec(debut);
  var haut = false; for (var i = 0; i < u8.length; i++) if (u8[i] >= 0x80){ haut = true; break; }
  if (!haut) return {txt: new TextDecoder('latin1').decode(u8), enc: 'ASCII', version: ver && ver[1]};
  /* des octets qui forment de l'UTF-8 valide sont de l'UTF-8 (versions 2007 et suivantes, ou export mal déclaré) : en Windows-1252, une telle suite est presque impossible */
  try { return {txt: new TextDecoder('utf-8', {fatal: true}).decode(u8), enc: 'UTF-8', version: ver && ver[1]}; } catch(e){}
  var m = cp && /^ANSI_(\d{3,4})$/i.exec(cp[1]), lab = 'windows-1252';
  if (m) lab = {'932': 'shift_jis', '936': 'gbk', '949': 'euc-kr', '950': 'big5'}[m[1]] || (/^(874|125\d)$/.test(m[1]) ? 'windows-' + m[1] : lab);
  try { return {txt: new TextDecoder(lab).decode(u8), enc: lab, version: ver && ver[1]}; } catch(e2){ return {txt: new TextDecoder('windows-1252').decode(u8), enc: 'windows-1252', version: ver && ver[1]}; }
}
function dxfTexte(s){
  return String(s == null ? '' : s).replace(/%%(\d{3})/g, function(_, d){ return String.fromCharCode(+d); })
    .replace(/%%[cC]/g, 'Ø').replace(/%%[dD]/g, '°').replace(/%%[pP]/g, '±').replace(/%%[uUoOkK]/g, '').replace(/%%%/g, '%')
    .replace(/\\U\+([0-9A-Fa-f]{4})/g, function(_, h){ return String.fromCharCode(parseInt(h, 16)); });
}
function mtexteBrut(s){
  s = String(s == null ? '' : s).replace(/\\U\+([0-9A-Fa-f]{4})/g, function(_, h){ return String.fromCharCode(parseInt(h, 16)); });
  s = s.replace(/\\\\/g, '\u0001').replace(/\\\{/g, '\u0002').replace(/\\\}/g, '\u0003');
  s = s.replace(/\\P/g, '\n').replace(/\\~/g, ' ');
  s = s.replace(/\\S([^;]*?)[\^#\/]([^;]*?);/g, '$1/$2');
  s = s.replace(/\\[ACcFfHhQqTtWwp][^;\\{}]*;/g, '');
  s = s.replace(/\\[LlOoKkNX]/g, '');
  s = s.replace(/[{}]/g, '');
  s = s.replace(/\u0001/g, '\\').replace(/\u0002/g, '{').replace(/\u0003/g, '}');
  return dxfTexte(s);
}
function gv(g, c){ var k = g.c.indexOf(c); return k < 0 ? null : g.v[k]; }
function gn(g, c, d){ var k = g.c.indexOf(c); if (k < 0) return d; var x = parseFloat(g.v[k]); return isFinite(x) ? x : d; }
function mulM(A, B){ /* A∘B : B puis A */
  return [A[0] * B[0] + A[2] * B[1], A[1] * B[0] + A[3] * B[1], A[0] * B[2] + A[2] * B[3], A[1] * B[2] + A[3] * B[3], A[0] * B[4] + A[2] * B[5] + A[4], A[1] * B[4] + A[3] * B[5] + A[5]];
}
function tfM(M, x, y){ return [M[0] * x + M[2] * y + M[4], M[1] * x + M[3] * y + M[5]]; }
var M_ID = [1, 0, 0, 1, 0, 0];
/* Arc par segments : angles en radians, sens trigonométrique */
function arcPts(cx, cy, r, a0, a1, out){
  var sw = a1 - a0; if (!isFinite(sw) || !isFinite(r) || r <= 0) return out;
  var n = Math.max(2, Math.min(256, Math.ceil(Math.abs(sw) / (Math.PI / 32))));
  for (var k = 0; k <= n; k++){ var a = a0 + sw * k / n; out.push(cx + r * Math.cos(a), cy + r * Math.sin(a)); }
  return out;
}
/* Segment courbe d'une polyligne (renflement) : points intermédiaires après le premier, sans le dernier */
function bulgePts(x1, y1, x2, y2, b, out){
  if (!b || Math.abs(b) < 1e-9) return out;
  var th = 4 * Math.atan(b), dx = x2 - x1, dy = y2 - y1, c = Math.hypot(dx, dy); if (c < 1e-12) return out;
  var r = c / (2 * Math.sin(th / 2)), mx = (x1 + x2) / 2, my = (y1 + y2) / 2, h = r * Math.cos(th / 2);
  var cx = mx - h * dy / c, cy = my + h * dx / c;
  var a0 = Math.atan2(y1 - cy, x1 - cx), n = Math.max(2, Math.min(128, Math.ceil(Math.abs(th) / (Math.PI / 32))));
  for (var k = 1; k < n; k++){ var a = a0 + th * k / n; out.push(cx + Math.abs(r) * Math.cos(a), cy + Math.abs(r) * Math.sin(a)); }
  return out;
}
/* B-spline (NURBS) évaluée par de Boor ; à défaut de nœuds valides, le polygone de contrôle */
function splinePts(deg, knots, ctrl, w, out){
  var n = ctrl.length / 2;
  if (n < 2) return out;
  if (deg < 1 || knots.length !== n + deg + 1){ for (var q = 0; q < ctrl.length; q++) out.push(ctrl[q]); return out; }
  var t0 = knots[deg], t1 = knots[n], steps = Math.max(8, Math.min(400, n * 8));
  for (var s = 0; s <= steps; s++){
    var t = t0 + (t1 - t0) * s / steps; if (s === steps) t = t1 - 1e-10 * Math.max(1, Math.abs(t1));
    var k = deg; while (k < n - 1 && t >= knots[k + 1]) k++;
    var d = [];
    for (var j = 0; j <= deg; j++){ var i = k - deg + j, ww = w && w[i] ? w[i] : 1; d.push([ctrl[2 * i] * ww, ctrl[2 * i + 1] * ww, ww]); }
    for (var r = 1; r <= deg; r++) for (var j2 = deg; j2 >= r; j2--){
      var i2 = k - deg + j2, den = knots[i2 + deg - r + 1] - knots[i2], al = den ? (t - knots[i2]) / den : 0;
      d[j2] = [(1 - al) * d[j2 - 1][0] + al * d[j2][0], (1 - al) * d[j2 - 1][1] + al * d[j2][1], (1 - al) * d[j2 - 1][2] + al * d[j2][2]];
    }
    var p = d[deg]; if (p[2]) out.push(p[0] / p[2], p[1] / p[2]);
  }
  return out;
}
/* Lecture brute : en-tête, calques, blocs, entités ; renvoie lignes et textes en coordonnées du fichier */
function lireDxf(input){
  var u8 = input instanceof Uint8Array ? input : new Uint8Array(input);
  var dec = decoderDxf(u8), L = dec.txt.split(/\r\n|\n|\r/), n = L.length, i = 0;
  var hdr = {}, calques = {}, ordreCalques = [], blocs = {}, ents = [], ign = {};
  function code(k){ return parseInt(L[k], 10); }
  function groupe(){
    var g = {t: (L[i + 1] || '').trim(), c: [], v: []}; i += 2;
    while (i + 1 < n){ var c = code(i); if (c === 0) break; if (!isNaN(c)){ g.c.push(c); g.v.push(L[i + 1]); } i += 2; }
    return g;
  }
  function lireHeader(){
    var nom = null;
    while (i + 1 < n){ var c = code(i), v = L[i + 1]; if (c === 0 && v.trim() === 'ENDSEC'){ i += 2; return; } if (c === 9){ nom = v.trim(); hdr[nom] = {}; } else if (nom) hdr[nom][c] = v.trim(); i += 2; }
  }
  function lireTables(){
    while (i + 1 < n){
      if (code(i) !== 0){ i += 2; continue; }
      var t = (L[i + 1] || '').trim(); if (t === 'ENDSEC'){ i += 2; return; } if (t === 'EOF') return;
      var g = groupe();
      if (g.t === 'LAYER'){ var nm = (gv(g, 2) || '').trim(); if (!nm) continue; var col = gn(g, 62, 7), fl = gn(g, 70, 0); if (!calques[nm]) ordreCalques.push(nm); calques[nm] = {nom: nm, aci: Math.abs(col) || 7, rgb: g.c.indexOf(420) >= 0 ? gn(g, 420, 0) : null, visible: col >= 0 && !(fl & 1), lt: (gv(g, 6) || '').trim()}; }
    }
  }
  function lireEnts(liste, stop){
    while (i + 1 < n){
      if (code(i) !== 0){ i += 2; continue; }
      var t = (L[i + 1] || '').trim();
      if (t === stop){ groupe(); return; }
      if (t === 'ENDSEC' || t === 'EOF') return;
      var g = groupe();
      if (g.t === 'POLYLINE'){ g.vx = []; while (i + 1 < n && code(i) === 0){ var t2 = (L[i + 1] || '').trim(); if (t2 === 'VERTEX') g.vx.push(groupe()); else { if (t2 === 'SEQEND') groupe(); break; } } }
      else if (g.t === 'INSERT' && gn(g, 66, 0) === 1){ g.att = []; while (i + 1 < n && code(i) === 0){ var t3 = (L[i + 1] || '').trim(); if (t3 === 'ATTRIB') g.att.push(groupe()); else { if (t3 === 'SEQEND') groupe(); break; } } }
      liste.push(g);
    }
  }
  function lireBlocs(){
    while (i + 1 < n){
      if (code(i) !== 0){ i += 2; continue; }
      var t = (L[i + 1] || '').trim(); if (t === 'ENDSEC'){ i += 2; return; } if (t === 'EOF') return;
      var g = groupe();
      if (g.t === 'BLOCK'){ var b = {nom: (gv(g, 2) || '').trim(), bx: gn(g, 10, 0), by: gn(g, 20, 0), ents: []}; lireEnts(b.ents, 'ENDBLK'); if (b.nom) blocs[b.nom.toUpperCase()] = b; }
    }
  }
  while (i + 1 < n){
    var c0 = code(i), v0 = (L[i + 1] || '').trim();
    if (c0 === 0 && v0 === 'SECTION'){
      i += 2; var nm = code(i) === 2 ? (L[i + 1] || '').trim() : ''; if (nm) i += 2;
      if (nm === 'HEADER') lireHeader(); else if (nm === 'TABLES') lireTables(); else if (nm === 'BLOCKS') lireBlocs(); else if (nm === 'ENTITIES') lireEnts(ents, 'ENDSEC');
      else { while (i + 1 < n && !(code(i) === 0 && (L[i + 1] || '').trim() === 'ENDSEC')) i += 2; i += 2; }
    } else if (c0 === 0 && v0 === 'EOF') break;
    else i += 2;
  }
  /* Géométrie */
  var lignes = [], textes = [], nEnt = 0;
  function calque(nm){ nm = (nm || '0').trim() || '0'; if (!calques[nm]){ calques[nm] = {nom: nm, aci: 7, rgb: null, visible: true, lt: ''}; ordreCalques.push(nm); } return nm; }
  function couleur(g, lay, ctx){
    if (g.c.indexOf(420) >= 0) return {aci: 0, rgb: gn(g, 420, 0)};
    var c = gn(g, 62, 256);
    if (c === 256){ var L2 = calques[lay]; return {aci: L2 ? L2.aci : 7, rgb: L2 ? L2.rgb : null}; }
    if (c === 0) return ctx.col || {aci: 7, rgb: null};
    return {aci: Math.abs(c) || 7, rgb: null};
  }
  function poly(pts, ferme, lay, col, M){
    if (pts.length < 4) return;
    var out = new Array(pts.length);
    for (var k = 0; k < pts.length; k += 2){ var p = tfM(M, pts[k], pts[k + 1]); out[k] = p[0]; out[k + 1] = p[1]; }
    for (var q = 0; q < out.length; q++) if (!isFinite(out[q])) return;
    lignes.push({lay: lay, aci: col.aci, rgb: col.rgb, pts: out, ferme: !!ferme});
  }
  function ocs(g, M){ return gn(g, 230, 1) < 0 ? mulM(M, [-1, 0, 0, 1, 0, 0]) : M; }
  function texte(g, M, lay, col, attrib){
    if (attrib && (gn(g, 70, 0) & 1)) return;
    var s = dxfTexte(gv(g, 1) || ''); if (!s.trim()) return;
    var h = gn(g, 40, 1), rot = gn(g, 50, 0) * Math.PI / 180, ha = gn(g, 72, 0) | 0, va = gn(g, attrib ? 74 : 73, 0) | 0, wf = gn(g, 41, 1) || 1;
    var x = gn(g, 10, 0), y = gn(g, 20, 0);
    if ((ha || va) && g.c.indexOf(11) >= 0){
      var x2 = gn(g, 11, x), y2 = gn(g, 21, y);
      if (ha === 3 || ha === 5){ if (Math.hypot(x2 - x, y2 - y) > 1e-9) rot = Math.atan2(y2 - y, x2 - x); x = (x + x2) / 2; y = (y + y2) / 2; ha = 1; }
      else { x = x2; y = y2; }
    }
    if (ha === 4){ ha = 1; va = 2; }
    M = ocs(g, M);
    textePose(s, x, y, h, rot, ha, va, wf, M, lay, col);
  }
  function textePose(s, x, y, h, rot, ha, va, wf, M, lay, col){
    var p = tfM(M, x, y), ux = Math.cos(rot), uy = Math.sin(rot);
    var U = [M[0] * ux + M[2] * uy, M[1] * ux + M[3] * uy], Vv = [M[0] * -uy + M[2] * ux, M[1] * -uy + M[3] * ux];
    var hs = Math.hypot(Vv[0], Vv[1]) || 1, us = Math.hypot(U[0], U[1]) || 1;
    if (!isFinite(p[0]) || !isFinite(p[1]) || !(h > 0)) return;
    textes.push({lay: lay, aci: col.aci, rgb: col.rgb, x: p[0], y: p[1], h: h * hs, r: Math.atan2(U[1], U[0]), t: s, ha: clamp(ha, 0, 2), va: clamp(va, 0, 3), wf: wf * us / hs});
  }
  function entite(g, M, ctx, prof){
    if (gn(g, 67, 0) === 1 || gn(g, 60, 0) === 1) return;
    var lay = calque(gv(g, 8)); if (lay === '0' && ctx.lay) lay = ctx.lay;
    var col = couleur(g, lay, ctx), t = g.t, pts, k;
    nEnt++;
    switch (t){
      case 'LINE': poly([gn(g, 10, 0), gn(g, 20, 0), gn(g, 11, 0), gn(g, 21, 0)], false, lay, col, M); break;
      case 'LWPOLYLINE': {
        var v = [], b = [];
        for (k = 0; k < g.c.length; k++){ var c = g.c[k], x = parseFloat(g.v[k]); if (c === 10){ v.push(x, 0); b.push(0); } else if (c === 20 && v.length) v[v.length - 1] = x; else if (c === 42 && b.length) b[b.length - 1] = x; }
        var ferme = !!(gn(g, 70, 0) & 1); pts = [];
        var nv = v.length / 2;
        for (k = 0; k < nv; k++){ pts.push(v[2 * k], v[2 * k + 1]); var k2 = k + 1 < nv ? k + 1 : (ferme ? 0 : -1); if (k2 >= 0 && b[k]) bulgePts(v[2 * k], v[2 * k + 1], v[2 * k2], v[2 * k2 + 1], b[k], pts); }
        if (ferme && nv > 1) pts.push(v[0], v[1]);
        poly(pts, ferme, lay, col, ocs(g, M)); break;
      }
      case 'POLYLINE': {
        var fl = gn(g, 70, 0); if (fl & (16 | 64)){ ign['POLYLINE maillée'] = (ign['POLYLINE maillée'] || 0) + 1; break; }
        var vx = (g.vx || []).filter(function(vv){ return !(gn(vv, 70, 0) & 16); }), fe = !!(fl & 1); pts = [];
        for (k = 0; k < vx.length; k++){
          var a = vx[k], x1 = gn(a, 10, 0), y1 = gn(a, 20, 0), bb = gn(a, 42, 0); pts.push(x1, y1);
          var nx = k + 1 < vx.length ? vx[k + 1] : (fe ? vx[0] : null);
          if (nx && bb) bulgePts(x1, y1, gn(nx, 10, 0), gn(nx, 20, 0), bb, pts);
        }
        if (fe && vx.length > 1) pts.push(pts[0], pts[1]);
        poly(pts, fe, lay, col, (fl & 8) ? M : ocs(g, M)); break;
      }
      case 'ARC': case 'CIRCLE': {
        var r = gn(g, 40, 0), cx = gn(g, 10, 0), cy = gn(g, 20, 0), a0 = 0, a1 = 2 * Math.PI;
        if (t === 'ARC'){ a0 = gn(g, 50, 0) * Math.PI / 180; a1 = gn(g, 51, 360) * Math.PI / 180; while (a1 <= a0) a1 += 2 * Math.PI; }
        poly(arcPts(cx, cy, r, a0, a1, []), t === 'CIRCLE', lay, col, ocs(g, M)); break;
      }
      case 'ELLIPSE': {
        var ecx = gn(g, 10, 0), ecy = gn(g, 20, 0), mx = gn(g, 11, 1), my = gn(g, 21, 0), ra = gn(g, 40, 1), p0 = gn(g, 41, 0), p1 = gn(g, 42, 2 * Math.PI);
        while (p1 <= p0) p1 += 2 * Math.PI;
        var ma = Math.hypot(mx, my), ang = Math.atan2(my, mx), mi = ma * ra, nseg = Math.max(8, Math.min(256, Math.ceil((p1 - p0) / (Math.PI / 32)))); pts = [];
        for (k = 0; k <= nseg; k++){ var tt = p0 + (p1 - p0) * k / nseg, ex = ma * Math.cos(tt), ey = mi * Math.sin(tt); pts.push(ecx + ex * Math.cos(ang) - ey * Math.sin(ang), ecy + ex * Math.sin(ang) + ey * Math.cos(ang)); }
        poly(pts, Math.abs(p1 - p0 - 2 * Math.PI) < 1e-6, lay, col, M); break;
      }
      case 'SPLINE': {
        var deg = gn(g, 71, 3) | 0, kn = [], cp = [], fp = [], w = [];
        for (k = 0; k < g.c.length; k++){ var cc = g.c[k], xx = parseFloat(g.v[k]);
          if (cc === 40) kn.push(xx); else if (cc === 10) cp.push(xx, 0); else if (cc === 20) cp[cp.length - 1] = xx; else if (cc === 11) fp.push(xx, 0); else if (cc === 21) fp[fp.length - 1] = xx; else if (cc === 41) w.push(xx); }
        pts = cp.length >= 4 ? splinePts(deg, kn, cp, w.length === cp.length / 2 ? w : null, []) : fp.slice();
        poly(pts, !!(gn(g, 70, 0) & 1), lay, col, M); break;
      }
      case 'SOLID': case 'TRACE': {
        pts = [gn(g, 10, 0), gn(g, 20, 0), gn(g, 11, 0), gn(g, 21, 0), gn(g, 13, gn(g, 12, 0)), gn(g, 23, gn(g, 22, 0)), gn(g, 12, 0), gn(g, 22, 0)];
        pts.push(pts[0], pts[1]); poly(pts, true, lay, col, ocs(g, M)); break;
      }
      case 'LEADER': {
        pts = []; for (k = 0; k < g.c.length; k++){ if (g.c[k] === 10) pts.push(parseFloat(g.v[k]), 0); else if (g.c[k] === 20 && pts.length) pts[pts.length - 1] = parseFloat(g.v[k]); }
        poly(pts, false, lay, col, M); break;
      }
      case 'TEXT': texte(g, M, lay, col, false); break;
      case 'ATTRIB': texte(g, M, lay, col, true); break;
      case 'MTEXT': {
        var parts = []; for (k = 0; k < g.c.length; k++) if (g.c[k] === 3) parts.push(g.v[k]);
        var s = mtexteBrut(parts.join('') + (gv(g, 1) || '')); if (!s.trim()) break;
        var att = gn(g, 71, 1) | 0, rotm = gn(g, 50, 0); if (g.c.indexOf(11) >= 0) rotm = Math.atan2(gn(g, 21, 0), gn(g, 11, 1));
        var mha = (att - 1) % 3, mva = att <= 3 ? 3 : att <= 6 ? 2 : 1;
        textePose(s, gn(g, 10, 0), gn(g, 20, 0), gn(g, 40, 1), rotm, mha, mva, 1, ocs(g, M), lay, col); break;
      }
      case 'INSERT': case 'DIMENSION': {
        var bn = (gv(g, 2) || '').trim().toUpperCase(), bl = blocs[bn];
        if (bl && prof < 12 && !ctx.pile[bn]){
          var Mi;
          if (t === 'DIMENSION') Mi = M;
          else {
            var ix = gn(g, 10, 0), iy = gn(g, 20, 0), sx = gn(g, 41, 1), sy = gn(g, 42, 1), ro = gn(g, 50, 0) * Math.PI / 180, cs = Math.cos(ro), sn = Math.sin(ro);
            Mi = mulM(ocs(g, M), [cs * sx, sn * sx, -sn * sy, cs * sy, ix, iy]); Mi = mulM(Mi, [1, 0, 0, 1, -bl.bx, -bl.by]);
          }
          var nc = Math.max(1, gn(g, 70, 1) | 0), nr = Math.max(1, gn(g, 71, 1) | 0), dc = gn(g, 44, 0), dr = gn(g, 45, 0);
          if (nc * nr > 400){ nc = 1; nr = 1; }
          var sub = {lay: lay, col: col, pile: Object.assign({}, ctx.pile)}; sub.pile[bn] = true;
          for (var ci = 0; ci < nc; ci++) for (var ri = 0; ri < nr; ri++){
            var Mc = Mi;
            if (ci || ri){ var ro2 = gn(g, 50, 0) * Math.PI / 180, ox = ci * dc, oy = ri * dr; Mc = mulM([1, 0, 0, 1, ox * Math.cos(ro2) - oy * Math.sin(ro2), ox * Math.sin(ro2) + oy * Math.cos(ro2)], Mi); }
            for (var e = 0; e < bl.ents.length; e++) entite(bl.ents[e], Mc, sub, prof + 1);
          }
        } else if (!bl) ign['bloc absent'] = (ign['bloc absent'] || 0) + 1;
        (g.att || []).forEach(function(at){ texte(at, M, lay, col, true); });
        break;
      }
      default: ign[t] = (ign[t] || 0) + 1; nEnt--;
    }
  }
  for (var e = 0; e < ents.length; e++) entite(ents[e], M_ID, {lay: null, col: null, pile: {}}, 0);
  var ins = hdr.$INSUNITS && parseInt(hdr.$INSUNITS[70], 10);
  var U = {1: .0254, 2: .3048, 4: .001, 5: .01, 6: 1, 14: .1}[ins] || 1;
  return {version: (hdr.$ACADVER && hdr.$ACADVER[1]) || dec.version || '', encodage: dec.enc, insunits: ins || 0, u: U,
    calques: ordreCalques.map(function(nm){ return calques[nm]; }), lignes: lignes, textes: textes, ignores: ign, nEnt: nEnt};
}
VC.lireDxf = lireDxf;

/* ---------- Fond de plan : forme compacte en mètres locaux, autour d'une origine arrondie ----------
   fond = {id, nom, type: 'cadastre'|'reseau', origine: {x, y} (unités du fichier), u (mètres par unité), calques: [{nom, aci, rgb, vis, nL, nT, style}],
           L: {c: calque, aci, rgb, d: indice de départ, n: nombre de points, f: fermé}[], xy: Float32Array, T: textes, bbox, bboxDense, stats} */
function percentile(arr, p){ if (!arr.length) return 0; var a = arr.slice().sort(function(x, y){ return x - y; }); return a[Math.min(a.length - 1, Math.max(0, Math.floor(p * (a.length - 1))))]; }
function styleCalque(nom){
  var n = String(nom).toUpperCase();
  if (/BATIDUR|BATI_DUR|BATIMENT|\bBATI\b|BATI$/.test(n) && !/TEX/.test(n)) return 'bati';
  if (/BATILEGER|BATI_LEGER/.test(n) && !/TEX/.test(n)) return 'batileger';
  if (/NUMVOIE/.test(n)) return 'numvoie';
  if (/TRONROUTEX|VOIETEX|LIEUDITTEX|RUE|VOIE.*TEX|ZONCOMMTEX/.test(n)) return 'voie';
  if (/PARCELLETEX|SUBDFISCTEX|PARCNFPTEX|PARC.*TEX/.test(n)) return 'parcelletex';
  if (/PARCELLE|SUBDFISC|SECTION|SUBDSECT|COMM|PARCELLENFP/.test(n)) return 'parcelle';
  return 'autre';
}
function preparerFond(brut, nom, type){
  var xs = [], ys = [], i, k, pas = 1, tot = 0;
  brut.lignes.forEach(function(l){ tot += l.pts.length / 2; }); tot += brut.textes.length;
  pas = Math.max(1, Math.floor(tot / 40000));
  var cpt = 0;
  brut.lignes.forEach(function(l){ for (k = 0; k < l.pts.length; k += 2){ if ((cpt++ % pas) === 0){ xs.push(l.pts[k]); ys.push(l.pts[k + 1]); } } });
  brut.textes.forEach(function(t){ if ((cpt++ % pas) === 0){ xs.push(t.x); ys.push(t.y); } });
  if (!xs.length) throw new Error('Ce DXF ne contient aucun trait ni texte lisible dans l\'espace objet.');
  var u = brut.u || 1, med = function(a){ return percentile(a, .5); };
  var arr = function(x){ var g = Math.pow(10, Math.max(0, Math.floor(Math.log10(Math.max(1, 100 / u))))); return Math.round(x / g) * g; };
  var ox = arr(med(xs)), oy = arr(med(ys));
  var nomsCalques = brut.calques.map(function(c){ return c.nom; }), idx = {};
  nomsCalques.forEach(function(nm, j){ idx[nm] = j; });
  var calques = brut.calques.map(function(c){ return {nom: c.nom, aci: c.aci, rgb: c.rgb, vis: c.visible !== false, nL: 0, nT: 0, style: styleCalque(c.nom)}; });
  var nPts = 0; brut.lignes.forEach(function(l){ nPts += l.pts.length / 2; });
  var xy = new Float32Array(nPts * 2), L = [], d = 0, x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  brut.lignes.forEach(function(l){
    var c = idx[l.lay]; calques[c].nL++;
    var rec = {c: c, aci: l.aci, rgb: l.rgb, d: d, n: l.pts.length / 2, f: l.ferme ? 1 : 0};
    for (k = 0; k < l.pts.length; k += 2){ var X = (l.pts[k] - ox) * u, Y = (l.pts[k + 1] - oy) * u; xy[2 * d] = X; xy[2 * d + 1] = Y; d++; if (X < x0) x0 = X; if (X > x1) x1 = X; if (Y < y0) y0 = Y; if (Y > y1) y1 = Y; }
    L.push(rec);
  });
  var T = brut.textes.map(function(t){
    var c = idx[t.lay]; calques[c].nT++;
    var X = (t.x - ox) * u, Y = (t.y - oy) * u; if (X < x0) x0 = X; if (X > x1) x1 = X; if (Y < y0) y0 = Y; if (Y > y1) y1 = Y;
    return {c: c, aci: t.aci, rgb: t.rgb, x: X, y: Y, h: t.h * u, r: t.r, t: t.t, ha: t.ha, va: t.va, wf: t.wf};
  });
  var lx = xs.map(function(x){ return (x - ox) * u; }), ly = ys.map(function(y){ return (y - oy) * u; });
  var dense = [percentile(lx, .02), percentile(ly, .02), percentile(lx, .98), percentile(ly, .98)];
  if (!(dense[2] > dense[0])){ dense[0] -= 25; dense[2] += 25; } if (!(dense[3] > dense[1])){ dense[1] -= 25; dense[3] += 25; }
  return {id: uid(), nom: nom || 'Fond de plan', type: type || 'cadastre', cree: nowISO(), origine: {x: ox, y: oy}, u: u,
    version: brut.version, encodage: brut.encodage, insunits: brut.insunits, calques: calques, L: L, xy: xy, T: T,
    bbox: [x0, y0, x1, y1], bboxDense: dense, stats: {lignes: L.length, points: nPts, textes: T.length, entites: brut.nEnt, ignores: brut.ignores}};
}
VC.preparerFond = preparerFond;
VC.lireFondDxf = function(buf, nom, type){ return preparerFond(lireDxf(buf), nom, type); };

/* ---------- Catalogue : réseaux, méthodes, objets ---------- */
var RES = {
  EU: {lib: 'EU', nom: 'eaux usées', rgb: [224, 0, 0], aci: 1},
  EP: {lib: 'EP', nom: 'eaux pluviales', rgb: [0, 160, 80], aci: 3},
  UN: {lib: 'Unitaire', court: 'UN', nom: 'unitaire', rgb: [192, 16, 154], aci: 6},
  PRJ: {lib: 'Projet', nom: 'projet', rgb: [29, 84, 196], aci: 5},
  INC: {lib: 'Réseau à préciser', court: '?', nom: 'réseau non déterminé', rgb: [110, 118, 129], aci: 8},
  MIX: {lib: 'Plusieurs réseaux', court: 'EU + EP', nom: 'plusieurs réseaux atteints', rgb: [150, 90, 0], aci: 32},
  ANN: {lib: 'Annotations', nom: 'annotations', rgb: [212, 101, 10], aci: 30},
  LIM: {lib: 'Complément du fond', nom: 'complément du fond', rgb: [40, 40, 40], aci: 7}
};
var EXU_LIB = {EU: 'réseau EU', EP: 'réseau EP', UN: 'réseau unitaire', INF: 'puisard (infiltration)', GARG: 'gargouille', MILIEU: 'milieu naturel'};
/* Codes de l'application (constat) ; caméra et déclaré s'y ajoutent */
var METH = [['visuel', 'Visuel', 'V'], ['eau', 'Eau', 'E'], ['fluo', 'Colorant', 'Fl'], ['fumee', 'Fumée', 'Fu'], ['reso', 'Résonance', 'R'], ['camera', 'Caméra', 'Ca'], ['declare', 'Déclaré', 'D']];
var NIV = [['ss', 'Sous-sol'], ['rdc', 'RDC'], ['etage', 'Étage']];
var TAMPON = [['beton', 'Béton'], ['fonte', 'Fonte'], ['hydrau', 'Hydraulique'], ['absent', 'Absent']];
var DIAM = ['100', '125', '150', '160', '200', '300'];
var MAT = [['PVC', 'PVC'], ['fonte', 'Fonte'], ['gres', 'Grès'], ['beton', 'Béton'], ['fibro', 'Fibrociment'], ['PEHD', 'PEHD']];
var STATUT = [['existant', 'Existant'], ['presume', 'Présumé'], ['projet', 'Projet'], ['supprimer', 'À supprimer']];
var GEST = [['D', 'Départemental'], ['T', 'Territorial'], ['P', 'Privé']];
var T = {};
function def(id, o){ o.id = id; T[id] = o; }
/* fam : famille de la palette ; nat : eaux produites ; role : source, passage, exutoire ou note ; row : ligne du constat ; autre : libellé d'une ligne « Autres » */
def('wc', {fam: 'eu', lib: 'WC', ab: 'WC', nat: 'EU', role: 'source', forme: 'app', row: 'wc'});
def('lavabo', {fam: 'eu', lib: 'Lavabo', ab: 'La', nat: 'EU', role: 'source', forme: 'app', row: 'sdb'});
def('douche', {fam: 'eu', lib: 'Douche', ab: 'Do', g: 'f', nat: 'EU', role: 'source', forme: 'app', row: 'sdb'});
def('baignoire', {fam: 'eu', lib: 'Baignoire', ab: 'Ba', g: 'f', nat: 'EU', role: 'source', forme: 'app', row: 'sdb'});
def('sdb', {fam: 'eu', lib: 'Salle de bain', ab: 'SdB', g: 'f', nat: 'EU', role: 'source', forme: 'app', row: 'sdb'});
def('evier', {fam: 'eu', lib: 'Évier', ab: 'Év', nat: 'EU', role: 'source', forme: 'app', row: 'evier'});
def('cuisine', {fam: 'eu', lib: 'Cuisine', ab: 'Cu', g: 'f', nat: 'EU', role: 'source', forme: 'app', row: 'cuisine'});
def('lavelinge', {fam: 'eu', lib: 'Lave-linge', ab: 'LL', nat: 'EU', role: 'source', forme: 'app', row: 'lavelinge'});
def('lavevaisselle', {fam: 'eu', lib: 'Lave-vaisselle', ab: 'LV', nat: 'EU', role: 'source', forme: 'app', row: 'cuisine'});
def('chaudiere', {fam: 'eu', lib: 'Chaudière', ab: 'Ch', g: 'f', nat: 'EU', role: 'source', forme: 'app', autre: 'Chaudière (purge, condensat)'});
def('siphon_garage', {fam: 'eu', lib: 'Siphon de garage', nat: 'EU', role: 'source', forme: 'siphon', row: 'siphon'});
def('attente', {fam: 'eu', lib: 'Attente', ab: 'At', g: 'f', nat: 'EU', role: 'source', forme: 'app', autre: 'Attente'});
def('descente', {fam: 'ep', lib: 'Descente EP', g: 'f', nat: 'EP', role: 'source', forme: 'descente', row: 'gout'});
def('grille', {fam: 'ep', lib: 'Grille', g: 'f', nat: 'EP', role: 'source', forme: 'grille', row: 'grilles'});
def('caniveau', {fam: 'ep', lib: 'Caniveau-grille', nat: 'EP', role: 'source', forme: 'caniveau', row: 'grilles', oriente: true});
def('siphon_sol', {fam: 'ep', lib: 'Siphon de sol', nat: 'EP', role: 'source', forme: 'siphon', row: 'siphon_sol'});
def('siphon_cour', {fam: 'ep', lib: 'Siphon de cour', nat: 'EP', role: 'source', forme: 'siphon', autre: 'Siphon de cour'});
def('drain', {fam: 'ep', lib: 'Drain', ab: 'Dr', nat: 'EP', role: 'source', forme: 'app', autre: 'Drain'});
def('tropplein', {fam: 'ep', lib: 'Trop-plein', ab: 'TP', nat: 'EP', role: 'source', forme: 'app', autre: 'Trop-plein'});
def('regard', {fam: 'reg', lib: 'Regard', nat: null, role: 'passage', forme: 'regard', regard: true});
def('boite', {fam: 'reg', lib: 'Boîte de branchement', court: 'Boîte', g: 'f', role: 'passage', forme: 'boite', regard: true, boite: true});
def('te', {fam: 'reg', lib: 'Té de visite', role: 'passage', forme: 'te'});
def('pr', {fam: 'equ', lib: 'Poste de relevage', ab: 'PR', role: 'passage', forme: 'app2'});
def('clapet', {fam: 'equ', lib: 'Clapet anti-retour', role: 'passage', forme: 'clapet', oriente: true});
def('fosse', {fam: 'equ', lib: 'Fosse septique', ab: 'FS', g: 'f', role: 'passage', forme: 'fosse', fosse: true});
def('jonction', {fam: 'equ', lib: 'Raccord', role: 'passage', forme: 'point', sansEtiquette: true});
def('puisard', {fam: 'exu', lib: 'Puisard', role: 'exutoire', forme: 'puisard', exu: 'INF'});
def('gargouille', {fam: 'exu', lib: 'Gargouille', g: 'f', role: 'exutoire', forme: 'gargouille', exu: 'GARG', oriente: true});
def('milieu', {fam: 'exu', lib: 'Rejet en milieu naturel', ab: 'MN', role: 'exutoire', forme: 'app', exu: 'MILIEU'});
def('regard_pub', {fam: 'pub', lib: 'Regard public', role: 'passage', forme: 'regpub', regard: true});
def('test', {fam: 'ann', lib: 'Point de test', role: 'note', forme: 'test'});
def('zone', {fam: 'ann', lib: 'Zone suspecte', g: 'f', role: 'note', forme: 'zone'});
var FAMILLES = [
  {id: 'eu', lib: 'Appareils EU', court: 'EU', types: ['wc', 'lavabo', 'douche', 'baignoire', 'sdb', 'evier', 'cuisine', 'lavelinge', 'lavevaisselle', 'chaudiere', 'siphon_garage', 'attente']},
  {id: 'ep', lib: 'Ouvrages EP', court: 'EP', types: ['descente', 'grille', 'caniveau', 'siphon_sol', 'siphon_cour', 'drain', 'tropplein']},
  {id: 'reg', lib: 'Regards', court: 'Regards', types: ['regard', 'boite', 'te']},
  {id: 'equ', lib: 'Équipements et exutoires', court: 'Équip.', types: ['pr', 'clapet', 'fosse', 'jonction', 'puisard', 'gargouille', 'milieu']},
  {id: 'pub', lib: 'Réseau public', court: 'Public', types: ['regard_pub']},
  {id: 'ann', lib: 'Annotations', court: 'Notes', types: ['test', 'zone']}
];
VC.RES = RES; VC.METH = METH; VC.TYPES = T; VC.FAMILLES = FAMILLES;
function defautsPt(t){
  var ty = T[t] || {}, p = {st: 'existant', obs: ''};
  if (ty.role === 'source'){ p.meth = []; p.niv = ''; }
  if (t === 'descente'){ p.visitable = ''; p.cote = ''; }
  if (ty.regard){ p.tampon = ''; p.cunette = ''; p.acces = ''; p.dim = ''; p.prof = ''; p.meth = []; }
  if (t === 'boite' || t === 'regard_pub') p.res = '';
  if (t === 'test'){ p.meth = []; p.resultat = ''; }
  if (t === 'zone') p.r = 1.5;
  if (ty.oriente) p.a = 0;
  return p;
}
function defautsLn(t, o){
  o = o || {};
  if (t === 'col') return {res: o.res || 'EU', gest: o.gest || 'D', diam: '', st: 'existant'};
  if (t === 'lim') return {st: 'existant'};
  return {res: o.res || '', st: o.st || 'existant', diam: '', mat: '', pose: '', long: '', sens: 0, obs: ''};
}
VC.defautsPt = defautsPt; VC.defautsLn = defautsLn;

/* ---------- Document ---------- */
function nouveauDoc(o){
  o = o || {};
  return {format: 'vede-croquis', v: 1, id: uid(), nom: o.nom || 'Croquis', numero: o.numero || '', adresse: o.adresse || '', commune: o.commune || '',
    date: o.date || new Date().toISOString().slice(0, 10), technicien: o.technicien || '', fondId: o.fondId || null, reseauId: o.reseauId || null,
    origine: o.origine || {x: 0, y: 0}, u: o.u || 1, rot: 0, echelle: 0, vue: null, gest: {EU: 'D', EP: 'D', UN: 'D'},
    el: [], decisions: {}, ordre: [], anomManu: [], cree: nowISO(), modifie: nowISO(), rev: 0};
}
VC.nouveauDoc = nouveauDoc;
function indexDoc(doc){ var m = {}; doc.el.forEach(function(e){ m[e.id] = e; }); return m; }
/* Position d'un sommet : celle de l'objet auquel il est attaché */
function vpos(v, idx){ var o = v.a && idx[v.a]; return o && o.k === 'pt' ? {x: o.x, y: o.y} : {x: v.x, y: v.y}; }
function lignePts(l, idx){ return l.v.map(function(v){ return vpos(v, idx); }); }
function longueur(pts){ var s = 0; for (var i = 1; i < pts.length; i++) s += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); return s; }
function actif(e, mode){ var st = e.p && e.p.st; if (mode === 'avp') return st !== 'supprimer'; return st !== 'projet'; }
VC.vpos = vpos; VC.lignePts = lignePts; VC.longueur = longueur; VC.indexDoc = indexDoc;

/* ---------- Déduction du réseau, anomalies, contrôles ----------
   Graphe : nœuds = objets ponctuels actifs, extrémités libres des tronçons (x:ligne:i) et un nœud terminal par collecteur (C:ligne).
   Une pièce relie deux sommets attachés successifs d'un tronçon. Exutoires (terminaux) : collecteur, puisard, gargouille, milieu naturel,
   boîte de branchement dont le réseau est indiqué. Tout autre objet est traversé. Un tronçon orienté (p.sens) ne se remonte pas. */
function analyser(doc, mode){
  mode = mode || 'edl';
  var idx = indexDoc(doc), objs = {}, lignes = {}, adj = {}, pieces = [];
  doc.el.forEach(function(e){ if (!actif(e, mode)) return; if (e.k === 'pt' && T[e.t]) objs[e.id] = e; else if (e.k === 'ln' && (e.t === 'tr' || e.t === 'col')) lignes[e.id] = e; });
  function lier(n, p){ (adj[n] = adj[n] || []).push(p); }
  function noeud(l, i){ var v = l.v[i]; return v.a && objs[v.a] ? v.a : 'x:' + l.id + ':' + i; }
  Object.keys(lignes).forEach(function(id){
    var l = lignes[id], att = [];
    l.v.forEach(function(v, i){ if (v.a && objs[v.a]) att.push(i); });
    if (l.t === 'col'){ att.forEach(function(i){ var p = {id: id + ':c' + i, l: l, a: l.v[i].a, b: 'C:' + id, col: true, i0: i, i1: i, sens: 0}; lier(p.a, p); lier(p.b, p); }); return; }
    if (l.v.length < 2) return;
    var b = att.slice(); if (b[0] !== 0) b.unshift(0); if (b[b.length - 1] !== l.v.length - 1) b.push(l.v.length - 1);
    for (var k = 0; k + 1 < b.length; k++){
      var p = {id: id + ':' + b[k], l: l, a: noeud(l, b[k]), b: noeud(l, b[k + 1]), i0: b[k], i1: b[k + 1], sens: l.p.sens === 1 || l.p.sens === -1 ? l.p.sens : 0};
      pieces.push(p); lier(p.a, p); lier(p.b, p);
    }
  });
  function terminal(n){
    if (n.indexOf('C:') === 0){ var l = lignes[n.slice(2)]; return l ? {res: RES[l.p.res] ? l.p.res : 'EU', gest: l.p.gest || 'D', via: 'collecteur', id: l.id, col: true} : null; }
    var o = objs[n], ty = o && T[o.t]; if (!ty) return null;
    if (ty.exu) return {res: ty.exu, via: o.t, id: o.id};
    if (ty.boite && /^(EU|EP|UN)$/.test(o.p.res || '')) return {res: o.p.res, via: 'boite', id: o.id, boite: true};
    return null;
  }
  /* Parcours en largeur : les départs terminaux sont atteints sans être traversés, sauf traverserDepart */
  function parcours(departs, traverserDepart){
    var vus = {}, file = [], term = [], tvus = {}, pcs = {}, fosse = null, boite = null, expl = {}, entree = {};
    departs.forEach(function(d){
      if (vus[d]) return; vus[d] = true;
      var t = !traverserDepart && terminal(d);
      if (t){ tvus[d] = true; term.push(t); } else file.push(d);
    });
    while (file.length){
      var n = file.shift();
      (adj[n] || []).forEach(function(p){
        var autre = p.a === n ? p.b : p.a;
        if (p.sens === 1 && p.b === n && p.a !== n) return;
        if (p.sens === -1 && p.a === n && p.b !== n) return;
        pcs[p.id] = p;
        if (!p.col && RES[p.l.p.res]) expl[p.l.p.res] = true;
        if (vus[autre]) return;
        vus[autre] = true;
        var t = terminal(autre);
        if (t){ if (!tvus[autre]){ tvus[autre] = true; term.push(t); if (t.col) entree[t.id] = n; } return; }
        var o = objs[autre], ty = o && T[o.t];
        if (ty && ty.fosse && !fosse) fosse = o.id;
        if (ty && ty.boite && !boite) boite = o.id;
        file.push(autre);
      });
    }
    return {term: term, pieces: pcs, fosse: fosse, boite: boite, expl: Object.keys(expl), entree: entree};
  }
  /* Gestionnaire et cohérence des boîtes au réseau indiqué : collecteurs atteints au-delà de la boîte */
  var boites = {};
  Object.keys(objs).forEach(function(id){
    var o = objs[id]; if (!T[o.t].boite || !terminal(id)) return;
    var r = parcours([id], true), cols = r.term.filter(function(t){ return t.col; });
    boites[id] = {cols: cols, gest: cols.length ? cols[0].gest : null};
  });
  function gestDe(t){ if (t.col) return t.gest; if (t.boite && boites[t.id] && boites[t.id].gest) return boites[t.id].gest; return (doc.gest && doc.gest[t.res]) || 'D'; }
  /* Sources */
  var resObj = {};
  Object.keys(objs).forEach(function(id){
    var o = objs[id], ty = T[o.t]; if (ty.role !== 'source') return;
    var r = parcours([id]), nets = [], gests = {};
    r.term.forEach(function(t){ if (nets.indexOf(t.res) < 0) nets.push(t.res); gests[t.res] = gestDe(t); });
    var presume = false;
    if (!nets.length && r.expl.length === 1){ nets = r.expl.slice(); presume = true; gests[nets[0]] = (doc.gest && doc.gest[nets[0]]) || 'D'; }
    var etat = !Object.keys(r.pieces).length ? 'nonrelie' : !nets.length ? 'sansexu' : nets.length > 1 ? 'multiple' : 'ok';
    resObj[id] = {etat: etat, res: nets.length === 1 ? nets[0] : null, nets: nets, gest: nets.length === 1 ? gests[nets[0]] : null, presume: presume, fosse: r.fosse, boite: r.boite, term: r.term, entree: r.entree};
  });
  /* Réseau de chaque pièce (couleur), regards traversés, flèches d'écoulement */
  var resPiece = {}, resNoeud = {};
  pieces.forEach(function(p){
    var dep = p.sens === 1 ? [p.b] : p.sens === -1 ? [p.a] : [p.a, p.b];
    var r = parcours(dep), nets = [];
    r.term.forEach(function(t){ var k = /^(EU|EP|UN)$/.test(t.res) ? t.res : (t.res === 'INF' || t.res === 'GARG' || t.res === 'MILIEU' ? 'EP' : t.res); if (nets.indexOf(k) < 0) nets.push(k); });
    var expl = RES[p.l.p.res] ? p.l.p.res : null, res = expl || (nets.length === 1 ? nets[0] : nets.length > 1 ? 'MIX' : 'INC');
    resPiece[p.id] = {res: res, deduit: !expl, nets: nets, contredit: !!(expl && nets.length && nets.indexOf(expl) < 0 && !(nets.length === 1 && nets[0] === 'UN'))};
    [p.a, p.b].forEach(function(n){ if (!objs[n]) return; var q = resNoeud[n] || (resNoeud[n] = {}); nets.forEach(function(x){ q[x] = true; }); if (expl) q[expl] = true; });
  });
  /* Distances aux exutoires pour le sens d'écoulement */
  /* une boîte reliée à un collecteur n'arrête pas l'écoulement : seuls comptent les exutoires finaux */
  function final(n){ var t = terminal(n); return !!t && !(t.boite && boites[n] && boites[n].cols.length); }
  var dist = {}, file = [];
  Object.keys(adj).forEach(function(n){ if (final(n)){ dist[n] = 0; file.push(n); } });
  while (file.length){
    var n0 = file.shift();
    (adj[n0] || []).forEach(function(p){ var autre = p.a === n0 ? p.b : p.a; if (dist[autre] != null) return; if (final(autre)) return; dist[autre] = dist[n0] + 1; file.push(autre); });
  }
  var sensPiece = {};
  pieces.forEach(function(p){
    if (p.sens) { sensPiece[p.id] = p.sens; return; }
    var da = dist[p.a], db = dist[p.b];
    if (da != null && db != null && da !== db) sensPiece[p.id] = da > db ? 1 : -1;
  });
  /* Réseau des regards et des objets traversés */
  var resPt = {};
  Object.keys(objs).forEach(function(id){
    var o = objs[id], ty = T[o.t];
    if (ty.role === 'source'){ resPt[id] = ty.nat; return; }
    if (ty.boite && terminal(id)){ resPt[id] = o.p.res; return; }
    if (ty.exu){ resPt[id] = ty.exu === 'INF' || ty.exu === 'GARG' || ty.exu === 'MILIEU' ? 'EP' : null; return; }
    if (o.t === 'regard_pub' && RES[o.p.res]) { resPt[id] = o.p.res; return; }
    var q = resNoeud[id] ? Object.keys(resNoeud[id]).filter(function(k){ return k !== 'INC' && k !== 'MIX'; }) : [];
    resPt[id] = q.length === 1 ? q[0] : q.length > 1 ? 'MIX' : (ty.role === 'note' ? 'ANN' : 'INC');
  });
  Object.keys(lignes).forEach(function(id){ if (lignes[id].t === 'col') lignes[id].v.forEach(function(v){ if (v.a && objs[v.a] && (resPt[v.a] === 'INC' || objs[v.a].t === 'regard_pub' && !RES[objs[v.a].p.res])) resPt[v.a] = RES[lignes[id].p.res] ? lignes[id].p.res : 'EU'; }); });
  var an = {mode: mode, objs: objs, lignes: lignes, pieces: pieces, adj: adj, resObj: resObj, resPiece: resPiece, sensPiece: sensPiece, resPt: resPt, boites: boites, dist: dist};
  /* après l'avant-projet : l'état des lieux sert de référence (numéros d'anomalie, réseau des tracés à supprimer) */
  if (mode === 'avp') an.ref = analyser(doc, 'edl');
  an.anomalies = reglesAnomalies(doc, an);
  an.controles = controles(doc, an);
  return an;
}
VC.analyser = analyser;

function libObj(o){ var ty = T[o.t] || {lib: o.t}; return ty.lib; }
function libRes(r){ return r === 'UN' ? 'unitaire' : r; }
/* Anomalies déduites : clé stable = règle + objet ; texte « Objet : constat » ; préconisation et codes du constat de l'application */
function reglesAnomalies(doc, an){
  var out = [], vu = {};
  function ajoute(a){ if (vu[a.cle]) return; vu[a.cle] = true; a.auto = true; out.push(a); }
  Object.keys(an.resObj).forEach(function(id){
    var o = an.objs[id], ty = T[o.t], r = an.resObj[id], lib = libObj(o);
    if (r.etat === 'ok'){
      if (ty.nat === 'EU'){
        if (r.res === 'EP') ajoute({cle: 'eu-ep:' + id, objId: id, reseau: 'EU', obs: lib + ' : rejet au réseau EP' + (r.presume ? ' (présumé)' : ''), preco: 'Déconnexion du réseau EP et raccordement au branchement EU', nc: true, codes: ['sepEU', 'raccEUsep'], cat: 'inversion'});
        else if (r.res === 'INF') ajoute({cle: 'eu-inf:' + id, objId: id, reseau: 'EU', obs: lib + ' : rejet dans un puisard', preco: 'Suppression du rejet dans le puisard et raccordement au branchement EU', nc: true, codes: ['raccEUsep'], cat: 'inversion'});
        else if (r.res === 'GARG') ajoute({cle: 'eu-garg:' + id, objId: id, reseau: 'EU', obs: lib + ' : rejet à la gargouille', preco: 'Déconnexion des EU de la gargouille et raccordement au branchement EU', nc: true, codes: ['decoGarg'], cat: 'inversion'});
        else if (r.res === 'MILIEU') ajoute({cle: 'eu-milieu:' + id, objId: id, reseau: 'EU', obs: lib + ' : rejet en milieu naturel', preco: 'Suppression du rejet en milieu naturel et raccordement au branchement EU', nc: true, codes: ['suppMilieu'], cat: 'inversion'});
      } else if (ty.nat === 'EP' && r.res === 'EU'){
        ajoute({cle: 'ep-eu:' + id, objId: id, reseau: 'EP', obs: lib + ' : rejet au réseau EU' + (r.presume ? ' (présumé)' : ''), preco: 'Déconnexion des EP du réseau EU ; raccordement au branchement EP ou gestion à la parcelle', nc: true, codes: ['decoEP', 'raccEPep'], cat: 'inversion'});
      }
      if (ty.nat === 'EU' && r.fosse && an.objs[r.fosse]) ajoute({cle: 'fosse:' + r.fosse, objId: r.fosse, reseau: 'EU', obs: 'Fosse septique : eaux usées traversant la fosse', preco: 'Suppression de la fosse septique et raccordement direct au branchement EU', nc: true, codes: ['suppFosse'], cat: 'autre'});
      if (r.term.some(function(t){ return t.col; }) && !r.boite){
        var t0 = r.term.filter(function(t){ return t.col; })[0], ent = r.entree[t0.id] || id;
        ajoute({cle: 'sansboite:' + t0.id + ':' + t0.res, objId: an.objs[ent] ? ent : id, reseau: t0.res === 'EP' ? 'EP' : 'EU', obs: 'Branchement ' + libRes(t0.res) + ' : pas de boîte de branchement en limite de propriété', preco: 'Création d\'une boîte de branchement ' + libRes(t0.res) + ' en limite de propriété, sur le branchement existant', nc: true, codes: ['boiteEx_' + (t0.res === 'UN' ? 'UN' : t0.res)], cat: 'regard', arbitrer: true});
      }
    }
    if (o.t === 'descente' && o.p.visitable === 'non') ajoute({cle: 'dep-nv:' + id, objId: id, reseau: 'EP', obs: 'Descente EP' + (o.p.cote ? ' ' + (o.p.cote === 'arriere' ? 'arrière' : 'avant') : '') + ' : non visitable', preco: 'Pose d\'un té de visite en pied de descente', nc: true, codes: [], cat: 'descente'});
  });
  Object.keys(an.objs).forEach(function(id){
    var o = an.objs[id], ty = T[o.t]; if (!ty.regard || o.t === 'regard_pub') return;
    var res = an.resPt[id], lr = /^(EU|EP|UN)$/.test(res) ? ' ' + libRes(res) : '', lib = (ty.boite ? 'Boîte de branchement' : 'Regard') + lr, net = res === 'EP' ? 'EP' : 'EU';
    if (o.p.tampon === 'beton'){
      var ep = res === 'EP';
      ajoute({cle: 'tampon:' + id, objId: id, reseau: net, obs: lib + ' : tampon béton' + (ep ? ' (réserve)' : ''), preco: 'Remplacement du tampon béton par un tampon fonte', nc: !ep, codes: [], cat: 'regard'});
    }
    if (o.p.cunette === 'non' && res !== 'EP') ajoute({cle: 'cunette:' + id, objId: id, reseau: net, obs: lib + ' : sans cunette', preco: 'Création d\'une cunette', nc: true, codes: [], cat: 'regard'});
    if (o.p.acces === 'non') ajoute({cle: 'acces:' + id, objId: id, reseau: net, obs: lib + ' : non accessible', preco: 'Dégagement et mise à niveau du regard pour le rendre visitable', nc: true, codes: [], cat: 'regard'});
    if (ty.boite && an.boites[id]){
      an.boites[id].cols.forEach(function(t){
        if (t.res !== o.p.res && t.res !== 'UN') ajoute({cle: 'boite-col:' + id + ':' + t.id, objId: id, reseau: o.p.res === 'EP' ? 'EP' : 'EU', obs: 'Boîte de branchement ' + libRes(o.p.res) + ' : rejet au collecteur ' + libRes(t.res), preco: 'Reprise du branchement sur le collecteur ' + libRes(o.p.res), nc: true, codes: [], cat: 'inversion'});
      });
    }
  });
  return out;
}
/* Contrôles de complétude : « manque » à compléter avant de rendre le plan, « info » à vérifier */
function controles(doc, an){
  var out = [];
  function c(id, niv, txt, cle){ out.push({id: id, niveau: niv, txt: txt, cle: cle + ':' + id}); }
  Object.keys(an.objs).forEach(function(id){
    var o = an.objs[id], ty = T[o.t], lib = libObj(o), r = an.resObj[id];
    if (ty.role === 'source'){
      if (!(o.p.meth || []).length) c(id, 'manque', lib + ' : méthode de test à indiquer', 'meth');
      if (r){
        if (r.etat === 'nonrelie') c(id, 'manque', lib + ' : non relié au réseau sur le dessin', 'relie');
        else if (r.etat === 'sansexu') c(id, 'manque', lib + ' : exutoire non dessiné (prolonger le tracé ou indiquer le réseau du tronçon)', 'exu');
        else if (r.etat === 'multiple') c(id, 'manque', lib + ' : relié à plusieurs réseaux (' + r.nets.map(function(x){ return EXU_LIB[x] || x; }).join(', ') + ') : indiquer le sens d\'écoulement d\'un tronçon', 'multi');
      }
      if (o.t === 'descente'){
        if (!o.p.visitable) c(id, 'manque', 'Descente EP : visitable ou non à indiquer', 'visit');
        if (!o.p.cote) c(id, 'info', 'Descente EP : façade avant ou arrière à indiquer', 'cote');
      }
    }
    if (ty.regard && o.t !== 'regard_pub' && !o.p.tampon) c(id, 'info', lib + ' : tampon à indiquer', 'tampon');
    if (ty.boite && !/^(EU|EP|UN)$/.test(o.p.res || '') && an.resPt[id] === 'INC') c(id, 'manque', 'Boîte de branchement : réseau à indiquer', 'boiteres');
  });
  an.pieces.forEach(function(p){
    var rp = an.resPiece[p.id];
    if (rp && rp.contredit) c(p.l.id, 'info', 'Tronçon ' + libRes(p.l.p.res) + ' : le dessin le relie à ' + rp.nets.map(function(x){ return EXU_LIB[x] || x; }).join(', '), 'contredit');
  });
  Object.keys(an.lignes).forEach(function(id){
    var l = an.lignes[id]; if (l.t !== 'tr' || l.v.length < 2) return;
    var libres = [0, l.v.length - 1].filter(function(i){ return !(l.v[i].a && an.objs[l.v[i].a]); });
    if (libres.length) c(id, 'info', 'Tronçon : extrémité' + (libres.length > 1 ? 's' : '') + ' libre' + (libres.length > 1 ? 's' : '') + ', non reliée' + (libres.length > 1 ? 's' : '') + ' à un objet', 'libre');
  });
  var ordre = {manque: 0, info: 1};
  out.sort(function(a, b){ return ordre[a.niveau] - ordre[b.niveau]; });
  return out;
}

/* ---------- Anomalies retenues : déduites (avec la décision du technicien) et ajoutées à la main ; numérotation stable ---------- */
function anomaliesDoc(doc, an){
  var liste = [];
  an.anomalies.forEach(function(a){
    var d = doc.decisions[a.cle] || {};
    var st = d.st || (a.arbitrer ? 'arbitrer' : 'retenue');
    liste.push(Object.assign({}, a, {st: st, obs: d.obs || a.obs, preco: d.preco != null && d.preco !== '' ? d.preco : a.preco, bulle: d.bulle || null, nc: d.nc != null ? d.nc : a.nc}));
  });
  (doc.anomManu || []).forEach(function(m){ if (m.objId && !an.objs[m.objId] && !indexDoc(doc)[m.objId]) return; liste.push(Object.assign({auto: false, cle: m.id}, m, {st: m.st || 'retenue'})); });
  var ordre = doc.ordre || (doc.ordre = []);
  liste.forEach(function(a){ if (ordre.indexOf(a.cle) < 0) ordre.push(a.cle); });
  liste.sort(function(a, b){ return ordre.indexOf(a.cle) - ordre.indexOf(b.cle); });
  var k = 0;
  if (an.ref){
    var nums = {}; anomaliesDoc(doc, an.ref).forEach(function(a){ if (a.num){ nums[a.cle] = a.num; k = Math.max(k, a.num); } });
    liste.forEach(function(a){ a.num = a.st === 'retenue' ? (nums[a.cle] || ++k) : null; });
  } else liste.forEach(function(a){ a.num = a.st === 'retenue' ? ++k : null; });
  return liste;
}
function conclusion(liste, an){
  var ret = liste.filter(function(a){ return a.st === 'retenue'; });
  if (ret.some(function(a){ return a.nc; })) return 'non_conformes';
  if (ret.length) return 'reserves';
  return Object.keys(an.resObj).length ? 'conformes' : '';
}
VC.anomaliesDoc = anomaliesDoc; VC.conclusion = conclusion;
var CONCL = {conformes: 'Conformes', non_conformes: 'Non conformes', reserves: 'Conformes avec réserves'};
VC.CONCL = CONCL;

/* ---------- Constat déduit : lignes de l'application (nombre, raccordement, conformité, méthodes) ---------- */
var ROWS_STD = [['wc', 'EU', 'WC'], ['lavelinge', 'EU', 'Lave-linge'], ['evier', 'EU', 'Évier'], ['sdb', 'EU', 'Salle de bain (douche ou baignoire et lavabo)'], ['cuisine', 'EU', 'Cuisine (évier, lave-vaisselle)'], ['siphon', 'EU', 'Siphon de garage'],
  ['gout_av', 'EP', 'Gouttière(s) avant'], ['gout_ar', 'EP', 'Gouttière(s) arrière'], ['grilles', 'EP', 'Grilles'], ['siphon_sol', 'EP', 'Siphon de sol']];
var RACC_LIB = {EU_D: 'Réseau EU départemental', EU_T: 'Réseau EU territorial', EP_D: 'Réseau EP départemental', EP_T: 'Réseau EP territorial', UN_D: 'Réseau unitaire départemental', UN_T: 'Réseau unitaire territorial', FOSSE: 'Fosse septique', MILIEU: 'Milieu naturel', GARG: 'Gargouille', INF: 'Puisard (infiltration)'};
function raccCode(r){
  if (!r || r.etat !== 'ok') return '';
  if (r.fosse) return 'FOSSE';
  if (r.res === 'GARG' || r.res === 'MILIEU' || r.res === 'INF') return r.res;
  var g = r.gest === 'T' ? 'T' : 'D';
  return /^(EU|EP|UN)$/.test(r.res) ? r.res + '_' + g : '';
}
function raccOk(groupe, code){ if (!code) return null; if (groupe === 'EU') return /^(EU|UN)_/.test(code); return /^(EP|UN)_|^GARG$|^MILIEU$|^INF$/.test(code); }
function constatDeduit(doc, an){
  var rows = ROWS_STD.map(function(s){ return {id: s[0], groupe: s[1], label: s[2], std: true, nb: 0, codes: [], meth: [], objets: []}; }), autres = {};
  function ligne(o){
    var ty = T[o.t];
    if (ty.row === 'gout') return rows[o.p.cote === 'arriere' ? 7 : 6];
    if (ty.row){ for (var i = 0; i < rows.length; i++) if (rows[i].id === ty.row) return rows[i]; }
    var lab = ty.autre || ty.lib, k = 'autre:' + lab;
    if (!autres[k]){ autres[k] = {id: k, groupe: ty.nat, label: lab, std: false, nb: 0, codes: [], meth: [], objets: []}; rows.push(autres[k]); }
    return autres[k];
  }
  Object.keys(an.resObj).forEach(function(id){
    var o = an.objs[id], r = an.resObj[id], row = ligne(o), code = raccCode(r);
    row.nb++; row.objets.push(id);
    if (row.codes.indexOf(code) < 0) row.codes.push(code);
    (o.p.meth || []).forEach(function(m){ if (row.meth.indexOf(m) < 0) row.meth.push(m); });
  });
  rows.forEach(function(r){
    var codes = r.codes.filter(Boolean);
    r.raccord = codes.length === 1 && r.codes.length === 1 ? codes[0] : codes.length ? 'plusieurs' : '';
    var oks = r.codes.map(function(c){ return raccOk(r.groupe, c); });
    r.conforme = !r.nb ? '' : oks.some(function(x){ return x === false; }) ? 'non' : oks.every(function(x){ return x === true; }) ? 'oui' : '';
    r.meth.sort(function(a, b){ return METH.map(function(m){ return m[0]; }).indexOf(a) - METH.map(function(m){ return m[0]; }).indexOf(b); });
  });
  var meth = {}; rows.forEach(function(r){ r.meth.forEach(function(m){ meth[m] = true; }); });
  var recup = {}; Object.keys(an.resObj).forEach(function(id){ if (an.resObj[id].res === 'INF') recup.puisard = true; });
  return {rows: rows, methodes: meth, epRecup: recup};
}
VC.constatDeduit = constatDeduit; VC.RACC_LIB = RACC_LIB;

/* ---------- Étiquettes : texte tiré du catalogue, centre décalé dans le repère du plan (mètres, x à droite, y en haut) ---------- */
var NIV_LIB = {ss: 'sous-sol', rdc: 'RDC', etage: 'étage'}, TAMPON_LIB = {beton: 'béton', fonte: 'fonte', hydrau: 'hydraulique', absent: 'absent'};
var MAT_LIB = {PVC: 'PVC', fonte: 'fonte', gres: 'grès', beton: 'béton', fibro: 'fibrociment', PEHD: 'PEHD'}, GEST_LIB = {D: 'départemental', T: 'territorial', P: 'privé'};
var STATUT_LIB = {existant: 'existant', presume: 'présumé', projet: 'projet', supprimer: 'à supprimer'};
function methLib(m){ return (m || []).map(function(k){ for (var i = 0; i < METH.length; i++) if (METH[i][0] === k) return METH[i][1].toLowerCase(); return k; }).join(', '); }
function resLigne(e, an){
  if (e.t === 'col') return RES[e.p.res] ? e.p.res : 'EU';
  if (e.t === 'lim') return 'LIM';
  if (e.p.st === 'projet') return 'PRJ';
  if (RES[e.p.res] && e.p.res !== 'PRJ') return e.p.res;
  if (!an) return 'INC';
  var vu = {}, k = null; an.pieces.forEach(function(p){ if (p.l.id === e.id){ var r = an.resPiece[p.id].res; vu[r] = (vu[r] || 0) + 1; } });
  Object.keys(vu).forEach(function(r){ if (!k || vu[r] > vu[k]) k = r; });
  if (!k && an.ref) return resLigne(e, an.ref);
  return k || 'INC';
}
function texteEtiquette(e, an){
  if (e.p && e.p.etiq) return String(e.p.etiq);
  if (e.k === 'tx') return e.txt || '';
  var ty, det = [], avp = !!(an && an.mode === 'avp');
  if (e.k === 'pt'){
    ty = T[e.t]; if (!ty || ty.sansEtiquette) return '';
    var res = an && (an.resPt[e.id] || (an.ref && an.ref.resPt[e.id])), lr = /^(EU|EP|UN)$/.test(res) ? ' ' + libRes(res) : '';
    var pre = e.p.st === 'projet' ? 'Projet : ' : e.p.st === 'supprimer' && avp ? 'À supprimer : ' : '';
    if (ty.role === 'source'){
      var s = ty.lib;
      if (e.t === 'descente'){ s = 'Descente EP' + (e.p.cote === 'arriere' ? ' arrière' : e.p.cote === 'avant' ? ' avant' : ''); if (e.p.visitable === 'non') s += '\nnon visitable'; }
      if (e.p.niv) s += ' (' + NIV_LIB[e.p.niv] + ')';
      if (s === ty.ab && !pre) return '';
      return pre + s;
    }
    if (ty.regard){
      var base = (ty.boite ? 'Boîte de branchement' : e.t === 'regard_pub' ? 'Regard public' : 'Regard') + lr;
      if (e.p.dim) det.push(e.p.dim); if (num(e.p.prof) != null) det.push('P : ' + frNum(num(e.p.prof), 2) + ' m'); if (e.p.tampon) det.push('tampon ' + TAMPON_LIB[e.p.tampon]);
      return pre + base + (det.length ? '\n' + det.join(', ') : '');
    }
    if (e.t === 'test') return 'Test' + ((e.p.meth || []).length ? ' ' + methLib(e.p.meth) : '') + (e.p.resultat ? ' : ' + e.p.resultat : '');
    if (e.t === 'zone') return e.p.obs || 'Zone suspecte';
    if (e.t === 'pr' && e.p.fn) return pre + 'Poste de relevage (' + e.p.fn + ')';
    return pre + ty.lib;
  }
  if (e.k === 'ln'){
    if (e.t === 'lim') return '';
    if (e.t === 'col') return 'Collecteur ' + libRes(RES[e.p.res] ? e.p.res : 'EU') + (e.p.diam ? ' Ø' + e.p.diam : '') + (e.p.gest ? ' ' + GEST_LIB[e.p.gest] : '');
    var r = resLigne(e, an);
    if (e.p.diam) det.push('Ø' + e.p.diam); if (e.p.mat) det.push(MAT_LIB[e.p.mat] || e.p.mat); if (num(e.p.long) != null) det.push('L ' + frNum(num(e.p.long)) + ' m');
    if (e.p.pose === 'aerien') det.push('aérien'); if (e.p.pose === 'encorbellement') det.push('en encorbellement');
    var st = e.p.st === 'presume' ? ' (présumé)' : e.p.st === 'supprimer' && avp ? ' à supprimer' : '';
    var nom = e.p.st === 'projet' ? 'Projet' + (RES[e.p.res] && e.p.res !== 'PRJ' ? ' ' + libRes(e.p.res) : '') : (/^(EU|EP|UN)$/.test(r) ? libRes(r) : '');
    if (!det.length && !st && e.p.st !== 'projet') return '';
    return (nom + (det.length ? ' ' + det.join(' ') : '') + st).trim();
  }
  return '';
}
VC.texteEtiquette = texteEtiquette; VC.resLigne = resLigne;

/* ---------- Symboles : primitives en millimètres papier, y en haut, centrées sur l'objet ---------- */
var BLANC = [255, 255, 255];
function rayonSymbole(t){ var f = (T[t] || {}).forme; return {app: 1.9, app2: 2.3, descente: 1.25, grille: 1.6, caniveau: 2.7, siphon: 1.5, regard: 1.7, boite: 1.9, te: 1.4, clapet: 1.3, fosse: 2.6, point: .7, puisard: 2.1, gargouille: 1.9, regpub: 1.7, test: 2, zone: 1}[f] || 1.6; }
function couleurPt(e, an){
  var ty = T[e.t] || {};
  if (e.p && e.p.st === 'projet') return RES.PRJ.rgb;
  if (ty.role === 'note') return RES.ANN.rgb;
  if (ty.role === 'source') return RES[ty.nat].rgb;
  if (ty.exu) return RES.EP.rgb;
  var r = an && (an.resPt[e.id] || (an.ref && an.ref.resPt[e.id]));
  return (RES[r] || RES.INC).rgb;
}
/* angPlan : orientation du symbole dans le repère du plan (radians) ; par défaut, l'angle propre de l'objet */
function primitives(e, rgb, angPlan){
  var ty = T[e.t] || {forme: 'app'}, P = [], a = angPlan != null ? angPlan : ((e.p && e.p.a) || 0) * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
  function R(pts){ if (!a) return pts; var o = []; for (var i = 0; i < pts.length; i += 2) o.push(pts[i] * ca - pts[i + 1] * sa, pts[i] * sa + pts[i + 1] * ca); return o; }
  function cercle(r, o){ P.push(Object.assign({k: 'c', x: 0, y: 0, r: r}, o)); }
  function poly(pts, ferme, o){ P.push(Object.assign({k: 'p', pts: R(pts), f: !!ferme}, o)); }
  function rect(w, h, o){ poly([-w / 2, -h / 2, w / 2, -h / 2, w / 2, h / 2, -w / 2, h / 2], true, o); }
  function texte(s, h, o){ P.push(Object.assign({k: 't', s: s, x: 0, y: 0, h: h}, o)); }
  var ep = .25;
  switch (ty.forme){
    case 'app': case 'app2': {
      var r = ty.forme === 'app2' ? 2.3 : 1.9; cercle(r, {trait: rgb, fond: BLANC, ep: ep});
      var ab = ty.ab || ''; texte(ab, ab.length > 2 ? 1.3 : 1.65, {coul: rgb, gras: true}); break;
    }
    case 'descente': cercle(1.25, {trait: rgb, fond: rgb, ep: .2}); cercle(.42, {fond: BLANC}); break;
    case 'grille': rect(3, 3, {trait: rgb, fond: BLANC, ep: ep}); poly([-.5, -1.5, -.5, 1.5], false, {trait: rgb, ep: .18}); poly([.5, -1.5, .5, 1.5], false, {trait: rgb, ep: .18}); break;
    case 'caniveau': rect(5.2, 1.8, {trait: rgb, fond: BLANC, ep: ep}); [-1.6, -.8, 0, .8, 1.6].forEach(function(x){ poly([x, -.9, x, .9], false, {trait: rgb, ep: .15}); }); break;
    case 'siphon': cercle(1.5, {trait: rgb, fond: BLANC, ep: ep}); poly([-1.06, -1.06, 1.06, 1.06], false, {trait: rgb, ep: .2}); poly([-1.06, 1.06, 1.06, -1.06], false, {trait: rgb, ep: .2}); break;
    case 'regard': rect(3.2, 3.2, {trait: rgb, fond: BLANC, ep: .3}); break;
    case 'boite': rect(3.6, 3.6, {trait: rgb, fond: BLANC, ep: .3}); poly([-1.8, -1.8, 1.8, 1.8], false, {trait: rgb, ep: .2}); poly([-1.8, 1.8, 1.8, -1.8], false, {trait: rgb, ep: .2}); break;
    case 'te': cercle(1.4, {trait: rgb, fond: BLANC, ep: ep}); poly([-.75, .45, .75, .45], false, {trait: rgb, ep: .25}); poly([0, .45, 0, -.8], false, {trait: rgb, ep: .25}); break;
    case 'clapet': poly([-1.2, -1, 1, 0, -1.2, 1], true, {trait: rgb, fond: BLANC, ep: ep}); poly([1.2, -1.1, 1.2, 1.1], false, {trait: rgb, ep: .3}); break;
    case 'fosse': rect(5, 3, {trait: rgb, fond: BLANC, ep: .3}); texte('FS', 1.5, {coul: rgb, gras: true}); break;
    case 'point': cercle(.6, {fond: rgb}); break;
    case 'puisard': cercle(2.1, {trait: rgb, fond: BLANC, ep: ep}); cercle(1.1, {trait: rgb, ep: ep}); break;
    case 'gargouille': poly([-1.7, -.8, .5, -.8, 1.8, 0, .5, .8, -1.7, .8], true, {trait: rgb, fond: BLANC, ep: ep}); break;
    case 'regpub': cercle(1.7, {trait: rgb, fond: BLANC, ep: .3}); cercle(.5, {fond: rgb}); break;
    case 'test': poly([0, 0, 0, 3.4], false, {trait: rgb, ep: .25}); poly([0, 3.4, 2.2, 2.8, 0, 2.2], true, {trait: rgb, fond: rgb, ep: .15}); break;
    default: cercle(1.6, {trait: rgb, fond: BLANC, ep: ep});
  }
  return P;
}
VC.primitives = primitives; VC.rayonSymbole = rayonSymbole; VC.couleurPt = couleurPt;

/* ---------- Vue : centre (mètres), échelle (px par mètre), rotation du plan (radians, sens trigonométrique) ---------- */
function Vue(w, h){ this.w = w || 800; this.h = h || 600; this.cx = 0; this.cy = 0; this.s = 4; this.rot = 0; }
Vue.prototype.ecran = function(x, y){
  var dx = x - this.cx, dy = y - this.cy, c = Math.cos(this.rot), s = Math.sin(this.rot);
  return {x: this.w / 2 + (dx * c + dy * s) * this.s, y: this.h / 2 - (-dx * s + dy * c) * this.s};
};
Vue.prototype.monde = function(sx, sy){
  var rx = (sx - this.w / 2) / this.s, ry = -(sy - this.h / 2) / this.s, c = Math.cos(this.rot), s = Math.sin(this.rot);
  return {x: this.cx + rx * c - ry * s, y: this.cy + rx * s + ry * c};
};
Vue.prototype.matrice = function(){
  var c = Math.cos(this.rot), s = Math.sin(this.rot), k = this.s;
  return [k * c, k * s, k * s, -k * c, this.w / 2 - k * c * this.cx - k * s * this.cy, this.h / 2 - k * s * this.cx + k * c * this.cy];
};
Vue.prototype.boite = function(){
  var p = [this.monde(0, 0), this.monde(this.w, 0), this.monde(0, this.h), this.monde(this.w, this.h)];
  return [Math.min(p[0].x, p[1].x, p[2].x, p[3].x), Math.min(p[0].y, p[1].y, p[2].y, p[3].y), Math.max(p[0].x, p[1].x, p[2].x, p[3].x), Math.max(p[0].y, p[1].y, p[2].y, p[3].y)];
};
/* Ajuste la vue sur une emprise (mètres), marge en pixels */
Vue.prototype.ajuster = function(b, marge){
  marge = marge == null ? 40 : marge;
  var c = Math.cos(this.rot), s = Math.sin(this.rot), xs = [], ys = [];
  [[b[0], b[1]], [b[2], b[1]], [b[0], b[3]], [b[2], b[3]]].forEach(function(p){ xs.push(p[0] * c + p[1] * s); ys.push(-p[0] * s + p[1] * c); });
  var w = Math.max(1, Math.max.apply(null, xs) - Math.min.apply(null, xs)), h = Math.max(1, Math.max.apply(null, ys) - Math.min.apply(null, ys));
  this.s = clamp(Math.min((this.w - 2 * marge) / w, (this.h - 2 * marge) / h), .02, 2000);
  this.cx = (b[0] + b[2]) / 2; this.cy = (b[1] + b[3]) / 2;
};
VC.Vue = Vue;
/* Repère du plan : (x, y) monde → (px, py) tourné de -rot */
function versPlan(x, y, rot){ var c = Math.cos(rot), s = Math.sin(rot); return {x: x * c + y * s, y: -x * s + y * c}; }
function depuisPlan(x, y, rot){ var c = Math.cos(rot), s = Math.sin(rot); return {x: x * c - y * s, y: x * s + y * c}; }
VC.versPlan = versPlan; VC.depuisPlan = depuisPlan;

/* ---------- Fond : chemins par calque et par tuile, textes ---------- */
var STYLE_FOND = {
  bati: {fond: '#e8e4dc', trait: '#77736b', ep: 1.1}, batileger: {fond: '#f2efe9', trait: '#9c978d', ep: .9},
  parcelle: {trait: '#9da3a8', ep: .9}, autre: {trait: '#c3c7cb', ep: .8},
  numvoie: {texte: '#3a3f44', gras: true}, voie: {texte: '#2a2f33', italique: true}, parcelletex: {texte: '#8b9196'}
};
function rgbCss(c, a){ return a == null ? 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')' : 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
function couleurEnt(o){ if (o.rgb != null && o.rgb >= 0) return [(o.rgb >> 16) & 255, (o.rgb >> 8) & 255, o.rgb & 255]; var c = aciRgb(o.aci); if (o.aci === 7 || (c[0] > 235 && c[1] > 235 && c[2] > 235)) return [40, 40, 40]; return c; }
VC.couleurEnt = couleurEnt;
function cacheFond(fond){
  if (fond.__cache) return fond.__cache;
  var TU = 200, groupes = {}, reseau = fond.type === 'reseau';
  fond.L.forEach(function(l){
    var cal = fond.calques[l.c], st = cal.style, cle = reseau ? l.c + '|' + couleurEnt(l).join(',') : l.c + '';
    var g = groupes[cle] || (groupes[cle] = {c: l.c, style: st, rgb: reseau ? couleurEnt(l) : null, tuiles: {}});
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, k;
    for (k = 0; k < l.n; k++){ var X = fond.xy[2 * (l.d + k)], Y = fond.xy[2 * (l.d + k) + 1]; if (X < x0) x0 = X; if (X > x1) x1 = X; if (Y < y0) y0 = Y; if (Y > y1) y1 = Y; }
    var tk = (x1 - x0 > TU || y1 - y0 > TU) ? 'grand' : Math.floor((x0 + x1) / 2 / TU) + ',' + Math.floor((y0 + y1) / 2 / TU);
    var t = g.tuiles[tk] || (g.tuiles[tk] = {b: [Infinity, Infinity, -Infinity, -Infinity], ids: []});
    t.ids.push(l); t.b[0] = Math.min(t.b[0], x0); t.b[1] = Math.min(t.b[1], y0); t.b[2] = Math.max(t.b[2], x1); t.b[3] = Math.max(t.b[3], y1);
  });
  var liste = [];
  Object.keys(groupes).forEach(function(cle){
    var g = groupes[cle];
    Object.keys(g.tuiles).forEach(function(tk){
      var t = g.tuiles[tk], trait = typeof Path2D !== 'undefined' ? new Path2D() : null, plein = trait ? new Path2D() : null, nPlein = 0;
      if (trait) t.ids.forEach(function(l){
        var d = l.d;
        trait.moveTo(fond.xy[2 * d], fond.xy[2 * d + 1]); for (var k = 1; k < l.n; k++) trait.lineTo(fond.xy[2 * (d + k)], fond.xy[2 * (d + k) + 1]);
        if (l.f && (g.style === 'bati' || g.style === 'batileger')){ plein.moveTo(fond.xy[2 * d], fond.xy[2 * d + 1]); for (var k2 = 1; k2 < l.n; k2++) plein.lineTo(fond.xy[2 * (d + k2)], fond.xy[2 * (d + k2) + 1]); plein.closePath(); nPlein++; }
      });
      liste.push({c: g.c, style: g.style, rgb: g.rgb, b: t.b, trait: trait, plein: nPlein ? plein : null});
    });
  });
  var ordre = {bati: 1, batileger: 0, parcelle: 2, autre: 3};
  liste.sort(function(a, b){ return (ordre[a.style] || 3) - (ordre[b.style] || 3); });
  fond.__cache = {liste: liste};
  return fond.__cache;
}
function inter(a, b){ return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1]; }
/* off : décalage de l'origine du fond par rapport à celle du croquis (mètres) */
function dessinerFond(ctx, fond, vue, dpr, o){
  o = o || {}; if (!fond) return;
  var C = cacheFond(fond), off = o.off || {x: 0, y: 0}, M = vue.matrice(), vb = vue.boite();
  vb = [vb[0] - off.x, vb[1] - off.y, vb[2] - off.x, vb[3] - off.y];
  ctx.save();
  ctx.setTransform(dpr * M[0], dpr * M[1], dpr * M[2], dpr * M[3], dpr * (M[4] + M[0] * off.x + M[2] * off.y), dpr * (M[5] + M[1] * off.x + M[3] * off.y));
  ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  var reseau = fond.type === 'reseau';
  C.liste.forEach(function(t){
    if (!fond.calques[t.c].vis || !inter(t.b, vb)) return;
    var st = STYLE_FOND[t.style] || STYLE_FOND.autre;
    if (t.plein && !reseau){ ctx.fillStyle = st.fond; ctx.fill(t.plein); }
    ctx.strokeStyle = reseau ? rgbCss(t.rgb) : st.trait; ctx.lineWidth = (reseau ? 1.6 : st.ep || .8) / vue.s;
    ctx.stroke(t.trait);
  });
  ctx.restore();
  /* textes, toujours lisibles : jamais à l'envers */
  ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
  var police = o.police || 'Barlow, "Segoe UI", Roboto, Arial, sans-serif';
  for (var i = 0; i < fond.T.length; i++){
    var t = fond.T[i]; if (!fond.calques[t.c].vis) continue;
    var L = t.h * Math.max(1, t.t.length) * .8;
    if (t.x + L < vb[0] || t.x - L > vb[2] || t.y + L < vb[1] || t.y - L > vb[3]) continue;
    var X = t.x + off.x, Y = t.y + off.y;
    var px = Math.min(t.h * vue.s / .72, o.capPx || Infinity); if (px < 5 || px > 600) continue;
    var st2 = STYLE_FOND[fond.calques[t.c].style] || {}, col = reseau ? rgbCss(couleurEnt(t)) : (st2.texte || '#8f959a');
    texteMonde(ctx, t, X, Y, px, vue, police, col, st2);
  }
  ctx.restore();
}
function texteMonde(ctx, t, X, Y, px, vue, police, col, st){
  var lignes = String(t.t).split('\n'), ang = t.r - vue.rot, p = vue.ecran(X, Y);
  ctx.font = (st.italique ? 'italic ' : '') + (st.gras ? '600 ' : '500 ') + px.toFixed(1) + 'px ' + police;
  var w = 0; lignes.forEach(function(l){ w = Math.max(w, ctx.measureText(l).width); }); w *= t.wf || 1;
  var lh = px * 1.25, hT = lh * (lignes.length - 1) + px * .72;
  /* centre du bloc dans le repère du texte (x selon la ligne, y vers le haut), à partir de l'ancrage */
  var cx = t.ha === 1 ? 0 : t.ha === 2 ? -w / 2 : w / 2;
  var cy = t.va === 3 ? -hT / 2 : t.va === 2 ? 0 : t.va === 1 ? hT / 2 : px * .36 - lh * (lignes.length - 1) / 2;
  var ca = Math.cos(ang), sa = Math.sin(ang);
  var sx = p.x + cx * ca - cy * sa, sy = p.y - (cx * sa + cy * ca);
  var a = -ang; while (a > Math.PI) a -= 2 * Math.PI; while (a <= -Math.PI) a += 2 * Math.PI;
  if (a > Math.PI / 2 + .02) a -= Math.PI; else if (a < -Math.PI / 2 - .02) a += Math.PI;
  ctx.save(); ctx.translate(sx, sy); ctx.rotate(a); if (t.wf && t.wf !== 1) ctx.scale(t.wf, 1);
  ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (var k = 0; k < lignes.length; k++) ctx.fillText(lignes[k], 0, (k - (lignes.length - 1) / 2) * lh);
  ctx.restore();
}
VC.cacheFond = cacheFond; VC.dessinerFond = dessinerFond;

/* ---------- Dessin du croquis à l'écran ; renvoie les zones touchables de l'image dessinée ---------- */
var TXT_RES = {EU: '#c20000', EP: '#00813b', UN: '#9c0a7c', PRJ: '#1a4bb0', INC: '#4b5563', MIX: '#7a4a00', ANN: '#a14d06', LIM: '#222222'};
VC.TXT_RES = TXT_RES;
var TAILLE_ETIQ = 2.1, TAILLE_BULLE = 2.1;
function boiteTexte(s, hmm){ var L = String(s).split('\n'), w = 0; L.forEach(function(l){ w = Math.max(w, l.length); }); return {w: Math.max(1, w) * hmm * .56 + hmm * .3, h: L.length * hmm * 1.22 + hmm * .2, n: L.length}; }
/* Ancre d'une étiquette (monde) : objet, milieu du plus long segment d'un tracé, texte libre */
function ancre(e, idx){
  if (e.k === 'pt' || e.k === 'tx') return {x: e.x, y: e.y};
  var P = lignePts(e, idx), best = null, bl = -1;
  for (var i = 1; i < P.length; i++){ var l = Math.hypot(P[i].x - P[i - 1].x, P[i].y - P[i - 1].y); if (l > bl){ bl = l; best = i; } }
  if (best == null) return P[0] || {x: 0, y: 0};
  return {x: (P[best].x + P[best - 1].x) / 2, y: (P[best].y + P[best - 1].y) / 2, ang: Math.atan2(P[best].y - P[best - 1].y, P[best].x - P[best - 1].x)};
}
VC.ancre = ancre;
/* Placement proposé d'une étiquette, dans le repère du plan (mètres) : la position la moins encombrée autour de l'ancre */
function placerEtiquette(doc, an, e, E, idx, obstacles){
  var txt = texteEtiquette(e, an); if (!txt) return null;
  var m = E / 1000, rot = doc.rot || 0, b = boiteTexte(txt, TAILLE_ETIQ * m), a = ancre(e, idx), A = versPlan(a.x, a.y, rot), cands = [];
  if (e.k === 'pt'){
    var r = (rayonSymbole(e.t) + 1.1) * m;
    [[1, 0], [1, 1], [1, -1], [-1, 0], [0, 1], [0, -1], [-1, 1], [-1, -1]].forEach(function(d){
      var dx = d[0] ? d[0] * (r * (d[1] ? .75 : 1) + b.w / 2) : 0, dy = d[1] ? d[1] * (r * (d[0] ? .75 : 1) + b.h / 2) : 0; cands.push({dx: dx, dy: dy});
    });
  } else {
    var ang = (a.ang || 0) - rot, nx = -Math.sin(ang), ny = Math.cos(ang), tx = Math.cos(ang), ty = Math.sin(ang), d0 = 1.4 * m, ext = Math.abs(nx) * b.w / 2 + Math.abs(ny) * b.h / 2;
    [1, -1].forEach(function(sg){ [0, .35, -.35].forEach(function(f){ var L = b.w * f; cands.push({dx: sg * nx * (d0 + ext) + tx * L, dy: sg * ny * (d0 + ext) + ty * L}); }); });
    if (ny < 0) cands = cands.slice(3).concat(cands.slice(0, 3));
  }
  obstacles = obstacles || obstaclesPlan(doc, an, E, idx, e.id);
  var best = null, bs = Infinity;
  cands.forEach(function(c, k){
    var bx = [A.x + c.dx - b.w / 2, A.y + c.dy - b.h / 2, A.x + c.dx + b.w / 2, A.y + c.dy + b.h / 2], sc = k * .01;
    obstacles.boites.forEach(function(o){ var ix = Math.min(bx[2], o[2]) - Math.max(bx[0], o[0]), iy = Math.min(bx[3], o[3]) - Math.max(bx[1], o[1]); if (ix > 0 && iy > 0) sc += 3 + ix * iy / (b.w * b.h) * 4; });
    obstacles.segs.forEach(function(sg){ if (segBoite(sg, bx)) sc += 1; });
    if (sc < bs){ bs = sc; best = c; }
  });
  return best ? {dx: best.dx, dy: best.dy} : null;
}
function segBoite(s, b){
  var x1 = s[0], y1 = s[1], x2 = s[2], y2 = s[3];
  if (Math.max(x1, x2) < b[0] || Math.min(x1, x2) > b[2] || Math.max(y1, y2) < b[1] || Math.min(y1, y2) > b[3]) return false;
  if (x1 >= b[0] && x1 <= b[2] && y1 >= b[1] && y1 <= b[3]) return true;
  var c = [[b[0], b[1], b[2], b[1]], [b[2], b[1], b[2], b[3]], [b[2], b[3], b[0], b[3]], [b[0], b[3], b[0], b[1]]];
  for (var i = 0; i < 4; i++) if (segSeg(x1, y1, x2, y2, c[i][0], c[i][1], c[i][2], c[i][3])) return true;
  return false;
}
function segSeg(a, b, c, d, e, f, g, h){ var den = (c - a) * (h - f) - (d - b) * (g - e); if (!den) return false; var t = ((e - a) * (h - f) - (f - b) * (g - e)) / den, u = ((e - a) * (d - b) - (f - b) * (c - a)) / den; return t >= 0 && t <= 1 && u >= 0 && u <= 1; }
/* Encombrement du plan (repère du plan) : symboles, étiquettes déjà posées, segments de tracés */
function obstaclesPlan(doc, an, E, idx, sauf){
  var m = E / 1000, rot = doc.rot || 0, boites = [], segs = [];
  doc.el.forEach(function(e){
    if (e.k === 'pt'){ var A = versPlan(e.x, e.y, rot), r = rayonSymbole(e.t) * m; boites.push([A.x - r, A.y - r, A.x + r, A.y + r]); }
    if (e.k === 'ln'){ var P = lignePts(e, idx).map(function(p){ return versPlan(p.x, p.y, rot); }); for (var i = 1; i < P.length; i++) segs.push([P[i - 1].x, P[i - 1].y, P[i].x, P[i].y]); }
    if (e.id !== sauf && e.lab && !e.lab.off){
      var txt = texteEtiquette(e, an); if (!txt) return;
      var b = boiteTexte(txt, TAILLE_ETIQ * m), a = ancre(e, idx), A2 = versPlan(a.x, a.y, rot);
      boites.push([A2.x + e.lab.dx - b.w / 2, A2.y + e.lab.dy - b.h / 2, A2.x + e.lab.dx + b.w / 2, A2.y + e.lab.dy + b.h / 2]);
    }
  });
  return {boites: boites, segs: segs};
}
VC.placerEtiquette = placerEtiquette;

function trace(ctx, pts){ ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y); }
function hachures(ctx, pts, pas, long){
  /* tracé « à supprimer » : petits traits en travers, à pas régulier */
  var reste = pas / 2;
  for (var i = 1; i < pts.length; i++){
    var a = pts[i - 1], b = pts[i], L = Math.hypot(b.x - a.x, b.y - a.y); if (!L) continue;
    var ux = (b.x - a.x) / L, uy = (b.y - a.y) / L, d = reste;
    while (d <= L){ var x = a.x + ux * d, y = a.y + uy * d; ctx.moveTo(x - (uy - ux * .6) * long / 2, y + (ux + uy * .6) * long / 2); ctx.lineTo(x + (uy - ux * .6) * long / 2, y - (ux + uy * .6) * long / 2); d += pas; }
    reste = d - L;
  }
}
function milieuChemin(pts){
  var L = 0, i; for (i = 1; i < pts.length; i++) L += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  var h = L / 2;
  for (i = 1; i < pts.length; i++){ var l = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); if (h <= l && l){ var t = h / l; return {x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t, y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t, ux: (pts[i].x - pts[i - 1].x) / l, uy: (pts[i].y - pts[i - 1].y) / l, L: L}; } h -= l; }
  return null;
}
function dessinerPrims(ctx, P, cx, cy, k){
  P.forEach(function(q){
    ctx.beginPath();
    if (q.k === 'c') ctx.arc(cx + q.x * k, cy - q.y * k, q.r * k, 0, 2 * Math.PI);
    else if (q.k === 'p'){ ctx.moveTo(cx + q.pts[0] * k, cy - q.pts[1] * k); for (var i = 2; i < q.pts.length; i += 2) ctx.lineTo(cx + q.pts[i] * k, cy - q.pts[i + 1] * k); if (q.f) ctx.closePath(); }
    else if (q.k === 't'){
      if (!q.s) return;
      ctx.font = (q.gras ? '700 ' : '600 ') + (q.h * k).toFixed(1) + 'px Barlow, "Segoe UI", Roboto, Arial, sans-serif'; ctx.fillStyle = rgbCss(q.coul || [0, 0, 0]); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(q.s, cx + q.x * k, cy - q.y * k + q.h * k * .06); return;
    }
    if (q.fond){ ctx.fillStyle = rgbCss(q.fond); ctx.fill(); }
    if (q.trait){ ctx.strokeStyle = rgbCss(q.trait); ctx.lineWidth = Math.max(1, (q.ep || .25) * k); ctx.stroke(); }
  });
}
/* o : {E, mode, sel, anomalies, etiquettes, brouillon, accent} */
function dessinerCroquis(ctx, doc, an, vue, dpr, o){
  o = o || {};
  var E = o.E || 200, k = vue.s * E / 1000, idx = indexDoc(doc), zones = [], mode = o.mode || 'edl', rot = doc.rot || 0;
  var parLigne = {}; an.pieces.forEach(function(p){ (parLigne[p.l.id] = parLigne[p.l.id] || []).push(p); });
  function px(mm, mn, mx){ return clamp(mm * k, mn, mx == null ? 1e6 : mx); }
  function attenue(e){ var st = e.p && e.p.st; return (mode === 'edl' && st === 'projet') || (mode === 'avp' && st === 'supprimer'); }
  ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  /* zones suspectes */
  doc.el.forEach(function(e){
    if (e.k !== 'pt' || e.t !== 'zone') return;
    var c = vue.ecran(e.x, e.y), r = Math.max(10, (num(e.p.r) || 1.5) * vue.s);
    ctx.globalAlpha = attenue(e) ? .35 : 1; ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, 2 * Math.PI); ctx.fillStyle = 'rgba(212,101,10,.10)'; ctx.fill();
    ctx.setLineDash([px(1.4, 5), px(1, 4)]); ctx.strokeStyle = rgbCss(RES.ANN.rgb); ctx.lineWidth = px(.3, 1.5, 4); ctx.stroke(); ctx.setLineDash([]);
    zones.push({type: 'pt', id: e.id, x: c.x, y: c.y, r: r, zone: true});
  });
  ctx.globalAlpha = 1;
  /* tracés */
  var ordreL = {lim: 0, col: 1, tr: 2};
  doc.el.filter(function(e){ return e.k === 'ln' && e.v.length >= 2; }).sort(function(a, b){ return ordreL[a.t] - ordreL[b.t]; }).forEach(function(e){
    var W = lignePts(e, idx).map(function(p){ return vue.ecran(p.x, p.y); }), st = e.p.st || 'existant';
    ctx.globalAlpha = attenue(e) ? .3 : 1;
    var morceaux = (parLigne[e.id] || []).map(function(p){ return {pts: W.slice(p.i0, p.i1 + 1), res: an.resPiece[p.id].res, p: p}; });
    if (!morceaux.length || e.t !== 'tr') morceaux = [{pts: W, res: resLigne(e, an)}];
    var larg = e.t === 'col' ? px(.9, 3, 14) : e.t === 'lim' ? px(.3, 1.2, 5) : px(.5, 2, 9);
    morceaux.forEach(function(m){
      if (m.pts.length < 2) return;
      var res = st === 'projet' ? 'PRJ' : m.res, col = rgbCss((RES[res] || RES.INC).rgb);
      ctx.strokeStyle = col; ctx.lineWidth = larg;
      var dash = st === 'projet' ? [px(4, 10), px(2.5, 6)] : st === 'presume' || res === 'INC' ? [px(2.2, 6), px(1.8, 5)] : [];
      ctx.setLineDash(dash); trace(ctx, m.pts); ctx.stroke(); ctx.setLineDash([]);
      if (st === 'supprimer'){ ctx.beginPath(); hachures(ctx, m.pts, px(3, 12), px(2.2, 9)); ctx.lineWidth = Math.max(1.2, larg * .6); ctx.stroke(); }
      if (m.p && an.sensPiece[m.p.id] && o.fleches !== false){
        var c = milieuChemin(m.pts), sg = an.sensPiece[m.p.id];
        if (c && c.L > 36){ var ux = c.ux * sg, uy = c.uy * sg, a = px(1.6, 6, 13); ctx.beginPath(); ctx.moveTo(c.x - ux * a - uy * a * .6, c.y - uy * a + ux * a * .6); ctx.lineTo(c.x, c.y); ctx.lineTo(c.x - ux * a + uy * a * .6, c.y - uy * a - ux * a * .6); ctx.lineWidth = Math.max(1.5, larg * .7); ctx.stroke(); }
      }
    });
    zones.push({type: 'ln', id: e.id, pts: W, larg: larg});
  });
  ctx.globalAlpha = 1;
  /* symboles */
  doc.el.forEach(function(e){
    if (e.k !== 'pt' || e.t === 'zone') return;
    var c = vue.ecran(e.x, e.y), R = rayonSymbole(e.t), kk = Math.max(k, (e.t === 'jonction' ? 4 : 8.5) / R), rgb = couleurPt(e, an);
    ctx.globalAlpha = attenue(e) ? .35 : 1;
    dessinerPrims(ctx, primitives(e, rgb, ((e.p.a || 0) * Math.PI / 180) - rot), c.x, c.y, kk);
    if (e.p.st === 'supprimer'){ ctx.beginPath(); ctx.moveTo(c.x - R * kk, c.y - R * kk); ctx.lineTo(c.x + R * kk, c.y + R * kk); ctx.moveTo(c.x - R * kk, c.y + R * kk); ctx.lineTo(c.x + R * kk, c.y - R * kk); ctx.strokeStyle = rgbCss(rgb); ctx.lineWidth = 1.5; ctx.stroke(); }
    zones.push({type: 'pt', id: e.id, x: c.x, y: c.y, r: R * kk});
  });
  ctx.globalAlpha = 1;
  /* textes libres et étiquettes */
  var hpx = TAILLE_ETIQ * k, montrer = o.etiquettes !== false && hpx >= 6.5;
  doc.el.forEach(function(e){
    var libre = e.k === 'tx', txt = libre ? e.txt : texteEtiquette(e, an);
    if (!txt || (!libre && (!montrer || (e.lab && e.lab.off)))) return;
    var h = libre ? Math.max(9, (num(e.taille) || 2.5) * k) : hpx; if (libre && h < 6.5 && o.sel !== e.id) h = 6.5;
    var a = ancre(e, idx), A = vue.ecran(a.x, a.y), lab = libre ? {dx: 0, dy: 0} : (e.lab || placerEtiquette(doc, an, e, E, idx) || {dx: 0, dy: 0});
    var cx = A.x + lab.dx * vue.s, cy = A.y - lab.dy * vue.s, L = String(txt).split('\n');
    var col = libre ? '#1f2328' : e.k === 'pt' ? (TXT_RES[(function(){ var r = an.resPt[e.id]; var ty = T[e.t]; if (e.p.st === 'projet') return 'PRJ'; if (ty.role === 'source') return ty.nat; if (ty.role === 'note') return 'ANN'; return r; })()] || TXT_RES.INC) : TXT_RES[resLigne(e, an)] || TXT_RES.INC;
    ctx.globalAlpha = attenue(e) ? .4 : 1;
    ctx.font = (libre ? '500 ' : '600 ') + h.toFixed(1) + 'px Barlow, "Segoe UI", Roboto, Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var w = 0; L.forEach(function(l){ w = Math.max(w, ctx.measureText(l).width); }); var lh = h * 1.22, bh = lh * L.length;
    var bx = [cx - w / 2 - 3, cy - bh / 2 - 2, cx + w / 2 + 3, cy + bh / 2 + 2];
    if (!libre && e.k === 'pt'){
      var R = rayonSymbole(e.t) * Math.max(k, 8.5 / rayonSymbole(e.t)), dx = cx - A.x, dy = cy - A.y, dd = Math.hypot(dx, dy);
      var bord = boiteBord(bx, A.x, A.y, cx, cy);
      if (bord && dd > R + 3 * k + 4 && Math.hypot(bord.x - A.x, bord.y - A.y) > R + 6){ ctx.beginPath(); ctx.moveTo(A.x + dx / dd * R, A.y + dy / dd * R); ctx.lineTo(bord.x, bord.y); ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.stroke(); }
    }
    ctx.lineWidth = Math.max(2.5, h * .28); ctx.strokeStyle = 'rgba(255,255,255,.92)'; ctx.lineJoin = 'round';
    L.forEach(function(l, i){ ctx.strokeText(l, cx, cy + (i - (L.length - 1) / 2) * lh); });
    ctx.fillStyle = col; L.forEach(function(l, i){ ctx.fillText(l, cx, cy + (i - (L.length - 1) / 2) * lh); });
    zones.push({type: libre ? 'tx' : 'etiq', id: e.id, b: bx});
  });
  ctx.globalAlpha = 1;
  /* bulles d'anomalie */
  var posB = placerBulles(doc, an, o.anomalies, E, idx);
  (o.anomalies || []).forEach(function(a){
    if (!a.num || !a.objId || !idx[a.objId]) return;
    var ob = idx[a.objId], A = vue.ecran(ob.x, ob.y), d = posB[a.cle] || bulleDefaut(ob, E), r = Math.max(9, TAILLE_BULLE * k), cx = A.x + d.dx * vue.s, cy = A.y - d.dy * vue.s;
    var R = ob.k === 'pt' ? rayonSymbole(ob.t) * Math.max(k, 8.5 / rayonSymbole(ob.t)) : 6, dd = Math.hypot(cx - A.x, cy - A.y), O = rgbCss(RES.ANN.rgb);
    if (dd > R + r + 2){ ctx.beginPath(); ctx.moveTo(A.x + (cx - A.x) / dd * R, A.y + (cy - A.y) / dd * R); ctx.lineTo(cx - (cx - A.x) / dd * r, cy - (cy - A.y) / dd * r); ctx.strokeStyle = O; ctx.lineWidth = 1.2; ctx.stroke(); }
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * Math.PI); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = O; ctx.lineWidth = Math.max(1.5, .3 * k); ctx.stroke();
    ctx.fillStyle = O; ctx.font = '700 ' + (r * 1.1).toFixed(1) + 'px Barlow, "Segoe UI", Roboto, Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(a.num), cx, cy + r * .05);
    zones.push({type: 'bulle', id: a.cle, objId: a.objId, x: cx, y: cy, r: r});
  });
  ctx.restore();
  return zones;
}
/* Position des bulles non déplacées à la main : autour de l'objet, à l'endroit le moins encombré, sans se chevaucher */
function placerBulles(doc, an, liste, E, idx){
  var m = E / 1000, rot = doc.rot || 0, obs = obstaclesPlan(doc, an, E, idx, null), res = {}, r = TAILLE_BULLE * m;
  function boite(q){ return [q.x - r, q.y - r, q.x + r, q.y + r]; }
  (liste || []).forEach(function(a){ if (a.num && a.bulle && a.objId && idx[a.objId]){ var ob = idx[a.objId], A = versPlan(ob.x, ob.y, rot); obs.boites.push(boite({x: A.x + a.bulle.dx, y: A.y + a.bulle.dy})); res[a.cle] = a.bulle; } });
  (liste || []).forEach(function(a){
    if (!a.num || a.bulle || !a.objId || !idx[a.objId]) return;
    var ob = idx[a.objId], A = versPlan(ob.x, ob.y, rot), R = (ob.k === 'pt' ? rayonSymbole(ob.t) : 1.2) * m, best = null, bs = Infinity;
    [1.15, 2.1, 3.1].forEach(function(f, fi){
      [135, 45, 180, 0, 225, 315, 90, 270].forEach(function(deg, k){
        var d = R + r * f, t = deg * Math.PI / 180, c = {dx: Math.cos(t) * d, dy: Math.sin(t) * d}, bx = boite({x: A.x + c.dx, y: A.y + c.dy}), sc = fi * 2.5 + k * .05;
        obs.boites.forEach(function(o){ var ix = Math.min(bx[2], o[2]) - Math.max(bx[0], o[0]), iy = Math.min(bx[3], o[3]) - Math.max(bx[1], o[1]); if (ix > 0 && iy > 0) sc += 4 + ix * iy / (4 * r * r) * 4; });
        obs.segs.forEach(function(sg){ if (segBoite(sg, bx)) sc += 1.5; });
        if (sc < bs){ bs = sc; best = c; }
      });
    });
    res[a.cle] = best; obs.boites.push(boite({x: A.x + best.dx, y: A.y + best.dy}));
  });
  return res;
}
VC.placerBulles = placerBulles;
function bulleDefaut(ob, E){ var m = E / 1000, r = (ob.k === 'pt' ? rayonSymbole(ob.t) : 1.5) + 2.6; return {dx: -r * m * .8, dy: r * m * .8}; }
/* Point du bord d'une boîte sur le segment centre → (x, y) */
function boiteBord(b, x, y, cx, cy){
  var dx = x - cx, dy = y - cy, hw = (b[2] - b[0]) / 2, hh = (b[3] - b[1]) / 2; if (!dx && !dy) return null;
  var t = Math.min(dx ? hw / Math.abs(dx) : Infinity, dy ? hh / Math.abs(dy) : Infinity); if (t >= 1) return null;
  return {x: cx + dx * t, y: cy + dy * t};
}
VC.dessinerCroquis = dessinerCroquis; VC.bulleDefaut = bulleDefaut;

/* ---------- Échelle du plan : la plus grande qui fait tenir le croquis dans le cadre du PDF ---------- */
var ECHELLES = [100, 150, 200, 250, 300, 400, 500, 750, 1000, 1500, 2000, 2500, 5000];
var CADRE = {w: 205, h: 192};
function emprisePlan(doc, idx, mode){
  idx = idx || indexDoc(doc); var rot = doc.rot || 0, x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  function ajoute(x, y){ var p = versPlan(x, y, rot); if (p.x < x0) x0 = p.x; if (p.x > x1) x1 = p.x; if (p.y < y0) y0 = p.y; if (p.y > y1) y1 = p.y; }
  /* les collecteurs de la rue ne comptent que par leurs piquages : sinon leur longueur imposerait une petite échelle */
  var autres = doc.el.some(function(e){ return !(e.k === 'ln' && e.t === 'col') && (!mode || actif(e, mode)); });
  doc.el.forEach(function(e){
    if (mode && !actif(e, mode)) return;
    if (e.k === 'ln' && e.t === 'col' && autres) return;
    if (e.k === 'pt' || e.k === 'tx') ajoute(e.x, e.y); else if (e.k === 'ln') lignePts(e, idx).forEach(function(p){ ajoute(p.x, p.y); });
  });
  return x0 === Infinity ? null : [x0, y0, x1, y1];
}
function echelleAuto(doc, mode){
  var b = emprisePlan(doc, null, mode); if (!b) return 200;
  var w = (b[2] - b[0]) + 6, h = (b[3] - b[1]) + 6;
  for (var i = 0; i < ECHELLES.length; i++) if (w * 1000 / ECHELLES[i] <= CADRE.w * .92 && h * 1000 / ECHELLES[i] <= CADRE.h * .92) return ECHELLES[i];
  return ECHELLES[ECHELLES.length - 1];
}
function echelleDoc(doc){ return doc.echelle > 0 ? doc.echelle : echelleAuto(doc); }
VC.echelleAuto = echelleAuto; VC.echelleDoc = echelleDoc; VC.emprisePlan = emprisePlan; VC.ECHELLES = ECHELLES;

/* ---------- Opérations sur le document (sans interface) ---------- */
/* Jonction sur un tracé : sommet existant (attaché ou non) ou point d'un segment ; renvoie l'objet auquel s'attacher */
function jonctionSur(doc, snap){
  var idx = indexDoc(doc), l = idx[snap.ligne]; if (!l) return null;
  if (snap.type === 'som'){
    var v = l.v[snap.i]; if (!v) return null;
    if (v.a && idx[v.a]) return idx[v.a];
    var j = {id: uid(), k: 'pt', t: 'jonction', x: v.x, y: v.y, p: defautsPt('jonction'), lab: {off: true}}; doc.el.push(j); v.a = j.id; return j;
  }
  /* segment : reprojection sur le tracé tel qu'il est maintenant */
  var P = lignePts(l, idx), best = null;
  for (var i = 1; i < P.length; i++){ var q = projSeg(snap, P[i - 1], P[i]); if (!best || q.d < best.d) best = {i: i, x: q.x, y: q.y, d: q.d, t: q.t}; }
  if (!best) return null;
  if (best.t < 1e-6 || best.t > 1 - 1e-6) return jonctionSur(doc, {type: 'som', ligne: l.id, i: best.t < .5 ? best.i - 1 : best.i});
  var j2 = {id: uid(), k: 'pt', t: 'jonction', x: best.x, y: best.y, p: defautsPt('jonction'), lab: {off: true}}; doc.el.push(j2);
  l.v.splice(best.i, 0, {x: best.x, y: best.y, a: j2.id});
  return j2;
}
/* Insère un objet de passage dans un tracé (regard posé sur une canalisation) */
function insererDansLigne(doc, o, snap){
  var idx = indexDoc(doc), l = idx[snap.ligne]; if (!l) return;
  if (snap.type === 'som'){ var v = l.v[snap.i]; if (v){ v.a = o.id; v.x = o.x; v.y = o.y; } return; }
  var P = lignePts(l, idx), best = null;
  for (var i = 1; i < P.length; i++){ var q = projSeg(o, P[i - 1], P[i]); if (!best || q.d < best.d) best = {i: i, q: q}; }
  if (!best) return;
  o.x = best.q.x; o.y = best.q.y;
  l.v.splice(best.i, 0, {x: o.x, y: o.y, a: o.id});
}
function synchroSommets(doc){ var idx = indexDoc(doc); doc.el.forEach(function(e){ if (e.k === 'ln') e.v.forEach(function(v){ var o = v.a && idx[v.a]; if (o && o.k === 'pt'){ v.x = o.x; v.y = o.y; } else if (v.a) v.a = null; }); }); }
/* Suppression : les sommets attachés à un objet supprimé restent en place ; une jonction devenue inutile disparaît */
function supprimerElement(doc, id){
  var idx = indexDoc(doc), e = idx[id]; if (!e) return;
  doc.el = doc.el.filter(function(x){ return x.id !== id; });
  if (e.k === 'pt') doc.el.forEach(function(l){ if (l.k === 'ln') l.v.forEach(function(v){ if (v.a === id){ v.a = null; v.x = e.x; v.y = e.y; } }); });
  doc.anomManu = (doc.anomManu || []).filter(function(m){ return m.objId !== id; });
  nettoyerJonctions(doc);
}
function nettoyerJonctions(doc){
  var usage = {};
  doc.el.forEach(function(l){ if (l.k === 'ln') l.v.forEach(function(v, i){ if (v.a) (usage[v.a] = usage[v.a] || []).push({l: l, i: i}); }); });
  var retirer = {};
  doc.el.forEach(function(o){
    if (o.k !== 'pt' || o.t !== 'jonction') return;
    var u = usage[o.id] || [], lignes = {}; u.forEach(function(x){ lignes[x.l.id] = true; });
    if (Object.keys(lignes).length >= 2) return;
    u.forEach(function(x){ var v = x.l.v[x.i]; v.a = null; if (x.i > 0 && x.i < x.l.v.length - 1 && x.l.v.length > 2) v.__retirer = true; });
    retirer[o.id] = true;
  });
  if (!Object.keys(retirer).length) return;
  doc.el = doc.el.filter(function(o){ return !retirer[o.id]; });
  doc.el.forEach(function(l){ if (l.k === 'ln') l.v = l.v.filter(function(v){ return !v.__retirer; }); });
}
/* Sommets consécutifs identiques (même objet ou même point) : un seul */
function dedoublonner(l){ l.v = l.v.filter(function(v, i){ if (!i) return true; var p = l.v[i - 1]; return !(v.a && v.a === p.a) && !(!v.a && !p.a && Math.hypot(v.x - p.x, v.y - p.y) < 1e-3); }); }
VC.ops = {jonctionSur: jonctionSur, insererDansLigne: insererDansLigne, supprimerElement: supprimerElement, nettoyerJonctions: nettoyerJonctions, synchroSommets: synchroSommets, dedoublonner: dedoublonner};

/* ---------- Icônes (traits, 24 × 24) ---------- */
var ICO = {
  main: '<path d="M6 3l12 9-5.2 1.2L15.5 20l-2.6 1.2-2.8-6.4L6 18z"/>',
  tr: '<path d="M3 18l6-6 4 4 8-8"/><circle cx="3" cy="18" r="1.6"/><circle cx="21" cy="8" r="1.6"/>',
  eu: '<circle cx="12" cy="12" r="8"/><path d="M8.6 9.5v5h2.6M8.6 12h2.2M13.4 9.5v3.6c0 1.9 3 1.9 3 0V9.5"/>',
  ep: '<path d="M12 3c3.2 4.2 6 7.4 6 11a6 6 0 0 1-12 0c0-3.6 2.8-6.8 6-11z"/>',
  reg: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 4l16 16M20 4L4 20"/>',
  equ: '<circle cx="12" cy="12" r="8"/><path d="M9 8.5l6 3.5-6 3.5z"/>',
  pub: '<path d="M2 15h20"/><circle cx="8" cy="15" r="2.6"/><path d="M8 12.4V5"/>',
  ann: '<path d="M6 21V4h10l-2.5 4 2.5 4H6"/>',
  texte: '<path d="M5 6h14M12 6v13M9 19h6"/>',
  annuler: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
  refaire: '<path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h3"/>',
  calques: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  controles: '<path d="M4 12.5l5 5L20 6.5"/>',
  constat: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM8.5 11h7M8.5 15h7"/>',
  sorties: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
  reglages: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', moins: '<path d="M5 12h14"/>',
  ajuster: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  rotg: '<path d="M4 4v5h5"/><path d="M5.5 15a7 7 0 1 0 1.6-7.3L4 9"/>', rotd: '<path d="M20 4v5h-5"/><path d="M18.5 15a7 7 0 1 1-1.6-7.3L20 9"/>',
  nord: '<path d="M12 3l5 16-5-3.5L7 19z"/>', aligner: '<path d="M3 18l18-12"/><circle cx="3" cy="18" r="1.8"/><circle cx="21" cy="6" r="1.8"/>',
  poubelle: '<path d="M5 7h14M10 11v6M14 11v6M6.5 7l1 13h9l1-13M9 7V4h6v3"/>',
  fermer: '<path d="M6 6l12 12M18 6L6 18"/>', valider: '<path d="M4 12.5l5 5L20 6.5"/>', retour: '<path d="M15 5l-7 7 7 7"/>',
  chercher: '<circle cx="11" cy="11" r="6"/><path d="M15.5 15.5L20 20"/>', lien: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
};
function ico(n, s){ return '<svg viewBox="0 0 24 24" width="' + (s || 22) + '" height="' + (s || 22) + '" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICO[n] || '') + '</svg>'; }
VC.ico = ico;
/* Aperçu d'un symbole du catalogue en SVG (palette, légende) */
function symboleSvg(t, taille){
  var e = {k: 'pt', t: t, p: defautsPt(t)}, ty = T[t] || {}, rgb = ty.role === 'source' ? RES[ty.nat].rgb : ty.role === 'note' ? RES.ANN.rgb : ty.exu ? RES.EP.rgb : (t === 'regard_pub' ? RES.EU.rgb : [70, 76, 84]);
  var k = 4.2, s = taille || 34, c = s / 2, h = '';
  if (t === 'zone') return '<svg viewBox="0 0 ' + s + ' ' + s + '" width="' + s + '" height="' + s + '" aria-hidden="true"><circle cx="' + c + '" cy="' + c + '" r="' + (c - 3) + '" fill="rgba(212,101,10,.12)" stroke="' + rgbCss(rgb) + '" stroke-width="1.6" stroke-dasharray="4 3"/></svg>';
  primitives(e, rgb, 0).forEach(function(q){
    var tr = q.trait ? ' stroke="' + rgbCss(q.trait) + '" stroke-width="' + Math.max(1, (q.ep || .25) * k).toFixed(2) + '"' : ' stroke="none"', fi = ' fill="' + (q.fond ? rgbCss(q.fond) : 'none') + '"';
    if (q.k === 'c') h += '<circle cx="' + (c + q.x * k) + '" cy="' + (c - q.y * k) + '" r="' + (q.r * k) + '"' + fi + tr + '/>';
    else if (q.k === 'p'){ var d = ''; for (var i = 0; i < q.pts.length; i += 2) d += (i ? 'L' : 'M') + (c + q.pts[i] * k).toFixed(2) + ' ' + (c - q.pts[i + 1] * k).toFixed(2); if (q.f) d += 'Z'; h += '<path d="' + d + '"' + fi + tr + ' stroke-linejoin="round"/>'; }
    else if (q.k === 't' && q.s) h += '<text x="' + c + '" y="' + (c + q.h * k * .36) + '" text-anchor="middle" font-family="Barlow, Arial, sans-serif" font-weight="700" font-size="' + (q.h * k).toFixed(1) + '" fill="' + rgbCss(q.coul || [0, 0, 0]) + '">' + esc(q.s) + '</text>';
  });
  return '<svg viewBox="0 0 ' + s + ' ' + s + '" width="' + s + '" height="' + s + '" aria-hidden="true">' + h + '</svg>';
}
function traitSvg(res, st, taille){
  var s = taille || 34, col = rgbCss((RES[res] || RES.INC).rgb), d = st === 'projet' ? ' stroke-dasharray="7 4"' : st === 'presume' || res === 'INC' ? ' stroke-dasharray="4 3"' : '';
  return '<svg viewBox="0 0 ' + s + ' ' + s + '" width="' + s + '" height="' + s + '" aria-hidden="true"><path d="M4 ' + (s - 8) + 'L' + (s - 4) + ' 8" stroke="' + col + '" stroke-width="' + (res === 'COL' ? 5 : 3) + '" stroke-linecap="round" fill="none"' + d + '/></svg>';
}
VC.symboleSvg = symboleSvg; VC.traitSvg = traitSvg;

/* ---------- Éditeur tactile ---------- */
var OUTILS_LN = {
  tr: {k: 'ln', t: 'tr', p: {}, lib: 'Tronçon', sous: 'réseau déduit', res: 'INC'},
  trEU: {k: 'ln', t: 'tr', p: {res: 'EU'}, lib: 'Tronçon EU', res: 'EU'},
  trEP: {k: 'ln', t: 'tr', p: {res: 'EP'}, lib: 'Tronçon EP', res: 'EP'},
  trUN: {k: 'ln', t: 'tr', p: {res: 'UN'}, lib: 'Tronçon unitaire', res: 'UN'},
  trPres: {k: 'ln', t: 'tr', p: {st: 'presume'}, lib: 'Tronçon présumé', res: 'INC', st: 'presume'},
  trPrj: {k: 'ln', t: 'tr', p: {st: 'projet'}, lib: 'Projet', sous: 'avant-projet', res: 'PRJ', st: 'projet'},
  colEU: {k: 'ln', t: 'col', p: {res: 'EU'}, lib: 'Collecteur EU', res: 'EU', col: true},
  colEP: {k: 'ln', t: 'col', p: {res: 'EP'}, lib: 'Collecteur EP', res: 'EP', col: true},
  colUN: {k: 'ln', t: 'col', p: {res: 'UN'}, lib: 'Collecteur unitaire', res: 'UN', col: true},
  lim: {k: 'ln', t: 'lim', p: {}, lib: 'Complément du fond', sous: 'bâti, limite', res: 'LIM'}
};
var PALETTES = {
  tr: {lib: 'Tracés', court: 'Tracé', ico: 'tr', items: ['ln:tr', 'ln:trEU', 'ln:trEP', 'ln:trUN', 'ln:trPres', 'ln:trPrj', 'ln:lim']},
  eu: {lib: 'Appareils EU', court: 'EU', ico: 'eu', items: FAMILLES[0].types.map(function(t){ return 'pt:' + t; })},
  ep: {lib: 'Ouvrages EP', court: 'EP', ico: 'ep', items: FAMILLES[1].types.map(function(t){ return 'pt:' + t; })},
  reg: {lib: 'Regards', court: 'Regards', ico: 'reg', items: FAMILLES[2].types.map(function(t){ return 'pt:' + t; })},
  equ: {lib: 'Équipements et exutoires', court: 'Équip.', ico: 'equ', items: FAMILLES[3].types.map(function(t){ return 'pt:' + t; })},
  pub: {lib: 'Réseau public', court: 'Public', ico: 'pub', items: ['ln:colEU', 'ln:colEP', 'ln:colUN', 'pt:regard_pub']},
  ann: {lib: 'Annotations', court: 'Notes', ico: 'ann', items: ['pt:test', 'pt:zone', 'tx:texte']}
};
var ORDRE_PAL = ['tr', 'eu', 'ep', 'reg', 'equ', 'pub', 'ann'];
var BIBLIO_MANU = {
  reg: [['cassé ou fissuré', 'Réhabilitation du regard'], ['obstrué ou encombré', 'Curage du regard'], ['tampon cassé', 'Remplacement du tampon'], ['sans tampon', 'Pose d\'un tampon fonte'], ['non étanche', 'Reprise de l\'étanchéité du regard']],
  tr: [['présumé cassé ou déboîté', 'Inspection caméra et réparation'], ['contre-pente, stagnation', 'Reprise de la pente'], ['racines', 'Curage et réparation'], ['fonte corrodée', 'Remplacement de la canalisation']],
  ep: [['té de visite cassé', 'Remplacement du té de visite'], ['rejet en pied de façade', 'Raccordement au branchement EP ou gestion à la parcelle']],
  eu: [['non siphonné', 'Pose d\'un siphon'], ['en sous-sol sans clapet anti-retour', 'Pose d\'un clapet anti-retour'], ['sans ventilation primaire', 'Création d\'une ventilation primaire']],
  equ: [['hors service', 'Remise en état ou remplacement'], ['sans clapet anti-retour', 'Pose d\'un clapet anti-retour']]
};
function famDe(e){ if (e.k === 'ln') return 'tr'; var ty = T[e.t] || {}; if (ty.regard) return 'reg'; return ty.fam || 'equ'; }

function editeur(racine, opts){
  opts = opts || {};
  injecterStyle();
  var S = {doc: null, fond: null, reseau: null, an: null, liste: [], vue: new Vue(), dpr: 1, outil: {k: 'main'}, sel: null, brouillon: null, zones: [], ptr: {}, geste: null,
    undo: [], redo: [], panneau: null, mode: 'edl', aff: {fond: true, reseau: true, etiquettes: true, attenuer: false}, dessinDemande: false, dernierTap: null, accrocheVue: null, aligner: null, palette: null};
  racine.innerHTML = '<div class="vc" tabindex="-1">'
    + '<canvas class="vc-cv" aria-label="Plan du croquis"></canvas>'
    + '<header class="vc-barre">'
    + '<button type="button" class="vc-b" data-a="retour" aria-label="Retour">' + ico('retour') + '</button>'
    + '<div class="vc-titre"><strong></strong><span></span></div>'
    + '<button type="button" class="vc-b" data-a="annuler" aria-label="Annuler">' + ico('annuler') + '</button>'
    + '<button type="button" class="vc-b" data-a="refaire" aria-label="Rétablir">' + ico('refaire') + '</button>'
    + '<span class="vc-sep"></span>'
    + '<button type="button" class="vc-b vc-bl" data-p="calques">' + ico('calques') + '<span>Fond</span></button>'
    + '<button type="button" class="vc-b vc-bl" data-p="controles">' + ico('controles') + '<span>Contrôles</span><em class="vc-badge" hidden></em></button>'
    + '<button type="button" class="vc-b vc-bl" data-p="constat">' + ico('constat') + '<span>Constat</span></button>'
    + '<button type="button" class="vc-b vc-bl" data-p="sorties">' + ico('sorties') + '<span>Sorties</span></button>'
    + '<button type="button" class="vc-b" data-p="reglages" aria-label="Réglages du croquis">' + ico('reglages') + '</button>'
    + '</header>'
    + '<nav class="vc-outils" aria-label="Outils">'
    + '<button type="button" class="vc-o" data-outil="main" aria-pressed="true">' + ico('main') + '<span>Choisir</span></button>'
    + ORDRE_PAL.map(function(k){ return '<button type="button" class="vc-o" data-pal="' + k + '" aria-pressed="false">' + ico(PALETTES[k].ico) + '<span>' + PALETTES[k].court + '</span></button>'; }).join('')
    + '</nav>'
    + '<div class="vc-palette" hidden></div>'
    + '<div class="vc-nav">'
    + '<button type="button" class="vc-b" data-a="zoomp" aria-label="Zoom avant">' + ico('plus') + '</button>'
    + '<button type="button" class="vc-b" data-a="zoomm" aria-label="Zoom arrière">' + ico('moins') + '</button>'
    + '<button type="button" class="vc-b" data-a="ajuster" aria-label="Ajuster la vue">' + ico('ajuster') + '</button>'
    + '<button type="button" class="vc-b" data-a="rotg" aria-label="Tourner le plan à gauche">' + ico('rotg') + '</button>'
    + '<button type="button" class="vc-b" data-a="rotd" aria-label="Tourner le plan à droite">' + ico('rotd') + '</button>'
    + '<button type="button" class="vc-b vc-nord" data-a="nord" aria-label="Nord en haut">' + ico('nord') + '</button>'
    + '</div>'
    + '<div class="vc-aide" role="status"></div>'
    + '<aside class="vc-panneau" hidden><div class="vc-ptete"><h2></h2><button type="button" class="vc-b" data-a="fermerPanneau" aria-label="Fermer">' + ico('fermer') + '</button></div><div class="vc-pcorps"></div></aside>'
    + '<div class="vc-toast" role="status" aria-live="polite"></div>'
    + '</div>';
  var R = racine.firstChild, cv = R.querySelector('.vc-cv'), ctx = cv.getContext('2d'), pal = R.querySelector('.vc-palette'), aide = R.querySelector('.vc-aide');
  var pan = R.querySelector('.vc-panneau'), pcorps = pan.querySelector('.vc-pcorps'), ptitre = pan.querySelector('h2');

  /* --- état et document --- */
  function E(){ return S.doc ? echelleDoc(S.doc) : 200; }
  function idx(){ return indexDoc(S.doc); }
  function el(id){ for (var i = 0; i < S.doc.el.length; i++) if (S.doc.el[i].id === id) return S.doc.el[i]; return null; }
  function offFond(f){ if (!f || !S.doc) return {x: 0, y: 0}; var u = f.u || 1; return {x: (f.origine.x - S.doc.origine.x) * u, y: (f.origine.y - S.doc.origine.y) * u}; }
  function analyse(){ S.an = analyser(S.doc, S.mode); S.liste = anomaliesDoc(S.doc, S.an); }
  function instantane(){
    S.undo.push(JSON.stringify({el: S.doc.el, decisions: S.doc.decisions, ordre: S.doc.ordre, anomManu: S.doc.anomManu, rot: S.doc.rot}));
    if (S.undo.length > 100) S.undo.shift(); S.redo = [];
  }
  function restaurer(json){ var o = JSON.parse(json); S.doc.el = o.el; S.doc.decisions = o.decisions || {}; S.doc.ordre = o.ordre || []; S.doc.anomManu = o.anomManu || []; S.doc.rot = o.rot || 0; S.vue.rot = S.doc.rot; }
  function etatCourant(){ return JSON.stringify({el: S.doc.el, decisions: S.doc.decisions, ordre: S.doc.ordre, anomManu: S.doc.anomManu, rot: S.doc.rot}); }
  var tEnr = null;
  function changement(o){
    o = o || {};
    S.doc.modifie = nowISO(); S.doc.rev = (S.doc.rev || 0) + 1;
    synchroSommets(S.doc);
    analyse();
    if (S.sel && !el(S.sel.id)) S.sel = null;
    majBarre();
    if (!o.garderPanneau) majPanneau();
    redessiner();
    clearTimeout(tEnr); tEnr = setTimeout(enregistrer, 350);
  }
  function enregistrer(){ clearTimeout(tEnr); tEnr = null; if (S.doc && opts.enregistrer) try { S.doc.vue = {cx: S.vue.cx, cy: S.vue.cy, s: S.vue.s}; opts.enregistrer(S.doc); } catch(e){} }
  function annuler(){ if (!S.undo.length) return toast('Rien à annuler'); S.redo.push(etatCourant()); restaurer(S.undo.pop()); S.sel = null; S.brouillon = null; changement(); }
  function refaire(){ if (!S.redo.length) return toast('Rien à rétablir'); S.undo.push(etatCourant()); restaurer(S.redo.pop()); S.sel = null; changement(); }

  /* --- affichage --- */
  function redim(){
    var r = R.getBoundingClientRect(), w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height)), d = Math.min(3, global.devicePixelRatio || 1);
    if (cv.width !== Math.round(w * d) || cv.height !== Math.round(h * d)){ cv.width = Math.round(w * d); cv.height = Math.round(h * d); cv.style.width = w + 'px'; cv.style.height = h + 'px'; }
    S.dpr = d; S.vue.w = w; S.vue.h = h; redessiner();
  }
  function redessiner(){ if (S.dessinDemande) return; S.dessinDemande = true; (global.requestAnimationFrame || setTimeout)(function(){ S.dessinDemande = false; dessiner(); }); }
  function dessiner(){
    if (!S.doc) return;
    var d = S.dpr, w = S.vue.w, h = S.vue.h;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#fbfbf8'; ctx.fillRect(0, 0, cv.width, cv.height);
    S.vue.rot = S.doc.rot || 0;
    var cap = 2.8 * S.vue.s * E() / 1000;
    if (S.fond && S.aff.fond) dessinerFond(ctx, S.fond, S.vue, d, {off: offFond(S.fond), alpha: S.aff.attenuer ? .45 : 1, capPx: cap});
    if (S.reseau && S.aff.reseau) dessinerFond(ctx, S.reseau, S.vue, d, {off: offFond(S.reseau), alpha: .85, capPx: cap});
    S.zones = dessinerCroquis(ctx, S.doc, S.an, S.vue, d, {E: E(), mode: S.mode, anomalies: S.liste, etiquettes: S.aff.etiquettes, sel: S.sel && S.sel.id});
    surcouche(d);
    boussole(d, w, h);
  }
  function surcouche(d){
    ctx.save(); ctx.setTransform(d, 0, 0, d, 0, 0);
    var ac = '#0F5C63';
    if (S.sel){
      var e = el(S.sel.id);
      if (e && e.k === 'pt'){ var c = S.vue.ecran(e.x, e.y), z = zonePt(e.id), r = (z ? z.r : 12) + 7; ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, 2 * Math.PI); ctx.strokeStyle = 'rgba(15,92,99,.85)'; ctx.lineWidth = 3; ctx.setLineDash([6, 4]); ctx.stroke(); ctx.setLineDash([]); }
      if (e && e.k === 'tx'){ var zt = S.zones.filter(function(z){ return z.type === 'tx' && z.id === e.id; })[0]; if (zt){ ctx.strokeStyle = ac; ctx.lineWidth = 2; ctx.setLineDash([5, 3]); ctx.strokeRect(zt.b[0], zt.b[1], zt.b[2] - zt.b[0], zt.b[3] - zt.b[1]); ctx.setLineDash([]); } }
      if (e && e.k === 'ln'){
        var P = lignePts(e, idx()).map(function(p){ return S.vue.ecran(p.x, p.y); });
        trace(ctx, P); ctx.strokeStyle = 'rgba(15,92,99,.28)'; ctx.lineWidth = 16; ctx.stroke();
        P.forEach(function(p, i){
          if (i){ var m = {x: (p.x + P[i - 1].x) / 2, y: (p.y + P[i - 1].y) / 2}; if (Math.hypot(p.x - P[i - 1].x, p.y - P[i - 1].y) > 44){ ctx.beginPath(); ctx.arc(m.x, m.y, 7, 0, 2 * Math.PI); ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.fill(); ctx.strokeStyle = ac; ctx.lineWidth = 1.5; ctx.stroke(); ctx.beginPath(); ctx.moveTo(m.x - 3.5, m.y); ctx.lineTo(m.x + 3.5, m.y); ctx.moveTo(m.x, m.y - 3.5); ctx.lineTo(m.x, m.y + 3.5); ctx.stroke(); } }
        });
        P.forEach(function(p, i){
          var att = e.v[i].a, choisi = S.sel.sommet === i;
          ctx.beginPath(); ctx.arc(p.x, p.y, choisi ? 10 : 8, 0, 2 * Math.PI); ctx.fillStyle = att ? ac : '#fff'; ctx.fill(); ctx.strokeStyle = choisi ? '#d4650a' : ac; ctx.lineWidth = choisi ? 3 : 2; ctx.stroke();
        });
      }
    }
    if (S.brouillon){
      var b = S.brouillon, Q = b.pts.map(function(q){ return S.vue.ecran(q.x, q.y); }), o = OUTILS_LN[b.outil] || OUTILS_LN.tr, col = rgbCss((RES[o.res] || RES.INC).rgb);
      if (Q.length > 1){ trace(ctx, Q); ctx.strokeStyle = col; ctx.lineWidth = o.col ? 6 : 4; ctx.setLineDash(o.st ? [9, 6] : []); ctx.stroke(); ctx.setLineDash([]); }
      Q.forEach(function(p, i){ var s = b.pts[i].snap; ctx.beginPath(); ctx.arc(p.x, p.y, s ? 8 : 6, 0, 2 * Math.PI); ctx.fillStyle = s ? ac : '#fff'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.stroke(); });
    }
    if (S.accrocheVue){ var a = S.vue.ecran(S.accrocheVue.x, S.accrocheVue.y); ctx.beginPath(); ctx.arc(a.x, a.y, 14, 0, 2 * Math.PI); ctx.strokeStyle = '#d4650a'; ctx.lineWidth = 2.5; ctx.stroke(); }
    if (S.aligner){ S.aligner.forEach(function(p){ var q = S.vue.ecran(p.x, p.y); ctx.beginPath(); ctx.arc(q.x, q.y, 9, 0, 2 * Math.PI); ctx.fillStyle = '#d4650a'; ctx.fill(); }); }
    ctx.restore();
  }
  /* Nord et barre d'échelle à l'écran */
  function boussole(d, w, h){
    ctx.save(); ctx.setTransform(d, 0, 0, d, 0, 0);
    var nb = R.querySelector('.vc-nord svg'); if (nb) nb.style.transform = 'rotate(' + (S.doc.rot || 0) * 180 / Math.PI + 'deg)';
    var pas = [.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000], L = pas[0];
    for (var i = 0; i < pas.length; i++){ if (pas[i] * S.vue.s <= 160) L = pas[i]; }
    var px = L * S.vue.s, x0 = 18 + (R.querySelector('.vc-outils').getBoundingClientRect().right - R.getBoundingClientRect().left), y0 = h - 22;
    if (global.matchMedia && global.matchMedia('(max-width: 760px), (orientation: portrait)').matches) { x0 = 14; y0 = h - (R.querySelector('.vc-outils').getBoundingClientRect().height + 30); }
    ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(x0 - 6, y0 - 20, px + 64, 30);
    ctx.strokeStyle = '#222'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0 - 6); ctx.lineTo(x0, y0); ctx.lineTo(x0 + px, y0); ctx.lineTo(x0 + px, y0 - 6); ctx.stroke();
    ctx.fillStyle = '#222'; ctx.font = '600 13px Barlow, Arial, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(frNum(L) + ' m · 1/' + E(), x0 + px + 6, y0 + 1);
    ctx.restore();
  }
  function zonePt(id){ for (var i = 0; i < S.zones.length; i++) if (S.zones[i].type === 'pt' && S.zones[i].id === id) return S.zones[i]; return null; }

  /* --- toucher : recherche de l'élément sous le doigt --- */
  function distPoly(x, y, P){ var b = Infinity; for (var i = 1; i < P.length; i++){ var q = projSeg({x: x, y: y}, P[i - 1], P[i]); if (q.d < b) b = q.d; } return b; }
  /* contact direct d'abord (bulle, symbole, étiquette, dans l'ordre inverse du dessin), puis proximité */
  function toucher(x, y, tol){
    tol = tol || 0; var best = null, bd = Infinity, i, z, d;
    for (i = S.zones.length - 1; i >= 0; i--){ z = S.zones[i]; if (z.type === 'bulle' && Math.hypot(x - z.x, y - z.y) <= z.r + 1) return z; }
    for (i = 0; i < S.zones.length; i++){ z = S.zones[i]; if (z.type !== 'pt' || z.zone) continue; d = Math.hypot(x - z.x, y - z.y); if (d <= z.r + 1 && d < bd){ bd = d; best = z; } }
    if (best) return best;
    for (i = S.zones.length - 1; i >= 0; i--){ z = S.zones[i]; if ((z.type === 'etiq' || z.type === 'tx') && x >= z.b[0] && x <= z.b[2] && y >= z.b[1] && y <= z.b[3]) return z; }
    for (i = S.zones.length - 1; i >= 0; i--){ z = S.zones[i]; if (z.type === 'bulle' && Math.hypot(x - z.x, y - z.y) <= z.r + 5 + tol) return z; }
    /* objets à proximité ; une zone suspecte se touche dedans ou sur son bord, après les objets qu'elle contient */
    for (i = 0; i < S.zones.length; i++){ z = S.zones[i]; if (z.type !== 'pt') continue; d = Math.max(0, Math.hypot(x - z.x, y - z.y) - z.r) + (z.zone ? 6 : 0); if (d <= 10 + tol && d < bd){ bd = d; best = z; } }
    if (best) return best;
    for (i = S.zones.length - 1; i >= 0; i--){ z = S.zones[i]; if ((z.type === 'etiq' || z.type === 'tx') && x >= z.b[0] - 5 && x <= z.b[2] + 5 && y >= z.b[1] - 5 && y <= z.b[3] + 5) return z; }
    for (i = 0; i < S.zones.length; i++){ z = S.zones[i]; if (z.type !== 'ln') continue; d = distPoly(x, y, z.pts); if (d <= Math.max(11, z.larg / 2 + 7) + tol && d < bd){ bd = d; best = z; } }
    return best;
  }
  /* Accroche d'un point de tracé : objet, sommet, segment ; sinon point libre redressé à 45° près du point précédent */
  function accroche(x, y, o){
    o = o || {}; var I = idx(), best = null, bd = Infinity;
    for (var i = 0; i < S.zones.length; i++){
      var z = S.zones[i]; if (z.type !== 'pt' || z.zone || o.saufObj === z.id) continue;
      var d = Math.hypot(x - z.x, y - z.y); if (d <= Math.max(z.r, 10) + 12 && d < bd){ bd = d; var ob = I[z.id]; best = {type: 'obj', id: z.id, x: ob.x, y: ob.y}; }
    }
    if (best) return best;
    S.doc.el.forEach(function(l){
      if (l.k !== 'ln' || l.t === 'lim' || o.saufLigne === l.id || (o.col && l.t !== 'col')) return;
      var P = lignePts(l, I);
      P.forEach(function(p, i){ var s = S.vue.ecran(p.x, p.y), d = Math.hypot(x - s.x, y - s.y); if (d <= 16 && d < bd){ bd = d; best = {type: 'som', ligne: l.id, i: i, x: p.x, y: p.y, a: l.v[i].a || null}; } });
    });
    if (best) return best;
    S.doc.el.forEach(function(l){
      if (l.k !== 'ln' || l.t === 'lim' || o.saufLigne === l.id || (o.col && l.t !== 'col')) return;
      var P = lignePts(l, I).map(function(p){ return S.vue.ecran(p.x, p.y); });
      for (var i = 1; i < P.length; i++){ var q = projSeg({x: x, y: y}, P[i - 1], P[i]); if (q.d <= 13 && q.d < bd){ bd = q.d; var w = S.vue.monde(q.x, q.y); best = {type: 'seg', ligne: l.id, i: i, x: w.x, y: w.y}; } }
    });
    if (best) return best;
    var m = S.vue.monde(x, y);
    if (o.prec){
      var pp = o.prec, rot = S.doc.rot || 0, a = Math.atan2(m.y - pp.y, m.x - pp.x) - rot, L = Math.hypot(m.x - pp.x, m.y - pp.y), q4 = Math.round(a / (Math.PI / 4)) * Math.PI / 4;
      if (Math.abs(a - q4) < 6 * Math.PI / 180 && L > 0){ return {x: pp.x + L * Math.cos(q4 + rot), y: pp.y + L * Math.sin(q4 + rot), redresse: true}; }
    }
    return {x: m.x, y: m.y};
  }

  /* --- gestes --- */
  function pos(ev){ var r = cv.getBoundingClientRect(); return {x: ev.clientX - r.left, y: ev.clientY - r.top}; }
  cv.addEventListener('pointerdown', function(ev){
    if (!S.doc) return;
    try { cv.setPointerCapture(ev.pointerId); } catch(e){}
    var p = pos(ev); S.ptr[ev.pointerId] = {x: p.x, y: p.y};
    var ids = Object.keys(S.ptr);
    if (ids.length === 2){
      finirGeste(true);
      var a = S.ptr[ids[0]], b = S.ptr[ids[1]];
      S.geste = {type: 'pince', d0: Math.hypot(a.x - b.x, a.y - b.y) || 1, m0: {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2}, s0: S.vue.s, w0: S.vue.monde((a.x + b.x) / 2, (a.y + b.y) / 2)};
      return;
    }
    if (ids.length > 2) return;
    S.geste = {type: 'attente', x0: p.x, y0: p.y, t0: Date.now(), cible: cibleGlisser(p.x, p.y), souris: ev.pointerType === 'mouse'};
  });
  cv.addEventListener('pointermove', function(ev){
    if (!S.ptr[ev.pointerId]) return;
    var p = pos(ev); S.ptr[ev.pointerId] = {x: p.x, y: p.y};
    var g = S.geste; if (!g) return;
    if (g.type === 'pince'){
      var ids = Object.keys(S.ptr); if (ids.length < 2) return;
      var a = S.ptr[ids[0]], b = S.ptr[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y) || 1, m = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2};
      S.vue.s = clamp(g.s0 * d / g.d0, .02, 2000);
      var w = S.vue.monde(m.x, m.y); S.vue.cx += g.w0.x - w.x; S.vue.cy += g.w0.y - w.y; redessiner(); return;
    }
    if (g.type === 'attente'){
      if (Math.hypot(p.x - g.x0, p.y - g.y0) < (g.souris ? 4 : 9)) return;
      if (g.cible){ instantane(); g.type = 'glisser'; g.modifie = false; demarrerGlisser(g); }
      else { g.type = 'pan'; g.w0 = S.vue.monde(g.x0, g.y0); }
    }
    if (g.type === 'pan'){ var w2 = S.vue.monde(p.x, p.y); S.vue.cx += g.w0.x - w2.x; S.vue.cy += g.w0.y - w2.y; redessiner(); return; }
    if (g.type === 'glisser'){ glisser(g, p); g.modifie = true; }
  });
  function fin(ev){
    if (!S.ptr[ev.pointerId]) return;
    delete S.ptr[ev.pointerId];
    var g = S.geste, p = pos(ev);
    if (!g) return;
    if (g.type === 'pince'){
      var reste = Object.keys(S.ptr);
      if (reste.length === 1){ var q = S.ptr[reste[0]]; S.geste = {type: 'pan', w0: S.vue.monde(q.x, q.y)}; } else S.geste = null;
      enregistrerVue(); return;
    }
    if (ev.type === 'pointercancel'){ finirGeste(true); return; }
    if (g.type === 'attente'){ S.geste = null; tap(p.x, p.y); return; }
    if (g.type === 'glisser'){ terminerGlisser(g, p); S.geste = null; return; }
    if (g.type === 'pan') enregistrerVue();
    S.geste = null;
  }
  cv.addEventListener('pointerup', fin); cv.addEventListener('pointercancel', fin);
  cv.addEventListener('wheel', function(ev){
    ev.preventDefault(); var p = pos(ev), w = S.vue.monde(p.x, p.y);
    S.vue.s = clamp(S.vue.s * Math.pow(1.0018, -ev.deltaY), .02, 2000);
    var w2 = S.vue.monde(p.x, p.y); S.vue.cx += w.x - w2.x; S.vue.cy += w.y - w2.y; redessiner(); enregistrerVue();
  }, {passive: false});
  var tVue = null;
  function enregistrerVue(){ clearTimeout(tVue); tVue = setTimeout(function(){ if (S.doc){ S.doc.vue = {cx: S.vue.cx, cy: S.vue.cy, s: S.vue.s}; if (opts.enregistrerVue) try { opts.enregistrerVue(S.doc); } catch(e){} } }, 600); }
  function finirGeste(annule){
    var g = S.geste; S.geste = null; S.accrocheVue = null;
    if (g && g.type === 'glisser'){ if (annule && g.modifie){ S.undo.length && restaurer(S.undo.pop()); } else if (!g.modifie) S.undo.pop(); changement(); }
  }

  /* --- glisser : objet choisi, sommet ou milieu de tracé, étiquette, bulle --- */
  function cibleGlisser(x, y){
    if (S.outil.k !== 'main' || !S.sel) return null;
    var e = el(S.sel.id); if (!e) return null;
    if (e.k === 'ln'){
      var P = lignePts(e, idx()).map(function(p){ return S.vue.ecran(p.x, p.y); });
      for (var i = 0; i < P.length; i++) if (Math.hypot(x - P[i].x, y - P[i].y) <= 18) return {k: 'sommet', id: e.id, i: i};
      for (var j = 1; j < P.length; j++){ var m = {x: (P[j].x + P[j - 1].x) / 2, y: (P[j].y + P[j - 1].y) / 2}; if (Math.hypot(P[j].x - P[j - 1].x, P[j].y - P[j - 1].y) > 44 && Math.hypot(x - m.x, y - m.y) <= 14) return {k: 'milieu', id: e.id, i: j}; }
    }
    /* l'élément choisi d'abord : son corps, puis son étiquette, puis ses bulles */
    var zs = S.zones.filter(function(z){ return z.id === e.id || z.objId === e.id; }), i, z;
    for (i = 0; i < zs.length; i++){ z = zs[i]; if (z.type === 'pt' && Math.hypot(x - z.x, y - z.y) <= (z.zone ? z.r : z.r + 8)) return {k: 'objet', id: e.id}; }
    for (i = 0; i < zs.length; i++){ z = zs[i]; if ((z.type === 'etiq' || z.type === 'tx') && x >= z.b[0] - 4 && x <= z.b[2] + 4 && y >= z.b[1] - 4 && y <= z.b[3] + 4) return z.type === 'tx' ? {k: 'objet', id: e.id} : {k: 'etiq', id: e.id}; }
    for (i = 0; i < zs.length; i++){ z = zs[i]; if (z.type === 'bulle' && Math.hypot(x - z.x, y - z.y) <= z.r + 6) return {k: 'bulle', id: z.id, objId: e.id}; }
    return null;
  }
  function demarrerGlisser(g){
    var c = g.cible, e = el(c.id) || el(c.objId);
    if (c.k === 'milieu'){ var I = idx(), P = lignePts(e, I), a = P[c.i - 1], b = P[c.i]; e.v.splice(c.i, 0, {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, a: null}); c.k = 'sommet'; S.sel = {id: e.id, sommet: c.i}; }
    if (c.k === 'sommet'){ var v = e.v[c.i]; if (v.a){ var o = el(v.a); if (o){ v.x = o.x; v.y = o.y; } v.a = null; } S.sel = {id: e.id, sommet: c.i}; }
    if (c.k === 'etiq'){ var I2 = idx(), an0 = ancre(e, I2); g.lab0 = e.lab && !e.lab.off ? {dx: e.lab.dx, dy: e.lab.dy} : (placerEtiquette(S.doc, S.an, e, E(), I2) || {dx: 0, dy: 0}); g.a0 = an0; }
    if (c.k === 'bulle'){ var ob = el(c.objId); g.b0 = placerBulles(S.doc, S.an, S.liste, E(), idx())[c.id] || bulleDefaut(ob, E()); }
    if (c.k === 'objet'){ g.o0 = {x: e.x, y: e.y}; }
  }
  function glisser(g, p){
    var c = g.cible, w = S.vue.monde(p.x, p.y), w0 = S.vue.monde(g.x0, g.y0), dxw = w.x - w0.x, dyw = w.y - w0.y, rot = S.doc.rot || 0, dP = versPlan(dxw, dyw, rot);
    if (c.k === 'objet'){ var e = el(c.id); e.x = g.o0.x + dxw; e.y = g.o0.y + dyw; synchroSommets(S.doc); }
    else if (c.k === 'sommet'){ var l = el(c.id), prec = c.i > 0 ? vpos(l.v[c.i - 1], idx()) : null, a = l.t === 'lim' ? S.vue.monde(p.x, p.y) : accroche(p.x, p.y, {saufLigne: l.id, prec: prec, col: l.t === 'col'}); l.v[c.i].x = a.x; l.v[c.i].y = a.y; S.accrocheVue = a.type ? a : null; g.accroche = a; }
    else if (c.k === 'etiq'){ var e2 = el(c.id); e2.lab = {dx: g.lab0.dx + dP.x, dy: g.lab0.dy + dP.y}; }
    else if (c.k === 'bulle'){ var nb = {dx: g.b0.dx + dP.x, dy: g.b0.dy + dP.y}, man = (S.doc.anomManu || []).filter(function(m){ return m.id === c.id; })[0]; if (man) man.bulle = nb; else { var d = S.doc.decisions[c.id] || (S.doc.decisions[c.id] = {}); d.bulle = nb; } }
    analyseLegere(); redessiner();
  }
  function analyseLegere(){ S.liste = anomaliesDoc(S.doc, S.an); }
  function terminerGlisser(g){
    var c = g.cible; S.accrocheVue = null;
    if (!g.modifie){ S.undo.pop(); return; }
    if (c.k === 'sommet' && g.accroche && g.accroche.type && el(c.id).t !== 'lim'){
      var l = el(c.id), a = g.accroche;
      if (a.type === 'obj'){ l.v[c.i].a = a.id; }
      else { var j = jonctionSur(S.doc, a); if (j && j.id !== l.id){ l.v[c.i].a = j.id; l.v[c.i].x = j.x; l.v[c.i].y = j.y; } }
      dedoublonner(l);
      if (S.sel && S.sel.sommet != null && S.sel.sommet >= l.v.length) S.sel.sommet = null;
    }
    if (c.k === 'objet'){
      /* objet lâché sur une extrémité libre de tronçon : il s'y attache */
      var e = el(c.id), s = S.vue.ecran(e.x, e.y), aa = accroche(s.x, s.y, {saufObj: e.id});
      if (aa.type === 'som' && !aa.a){ var l2 = el(aa.ligne); if (l2 && (aa.i === 0 || aa.i === l2.v.length - 1)) l2.v[aa.i].a = e.id; }
    }
    changement();
  }

  /* --- toucher bref : selon l'outil --- */
  function tap(x, y){
    var now = Date.now(), double = S.dernierTap && now - S.dernierTap.t < 380 && Math.hypot(x - S.dernierTap.x, y - S.dernierTap.y) < 24;
    S.dernierTap = {t: now, x: x, y: y};
    var o = S.outil;
    if (S.aligner){ var w = S.vue.monde(x, y); S.aligner.push(w); if (S.aligner.length === 2){ var a = S.aligner[0], b = S.aligner[1]; S.aligner = null; if (Math.hypot(b.x - a.x, b.y - a.y) > 1e-6){ instantane(); var ang = Math.atan2(b.y - a.y, b.x - a.x); while (ang > Math.PI / 2) ang -= Math.PI; while (ang <= -Math.PI / 2) ang += Math.PI; S.doc.rot = ang; S.vue.rot = ang; changement(); toast('Plan orienté selon la voie'); } majAide(); } else { majAide(); redessiner(); } return; }
    if (o.k === 'main'){
      var z = toucher(x, y);
      if (!z){ if (S.sel){ S.sel = null; majPanneau(); redessiner(); } return; }
      if (z.type === 'bulle'){ selectionner(z.objId); return; }
      if (z.type === 'ln' && S.sel && S.sel.id === z.id){
        var e = el(z.id), P = lignePts(e, idx()).map(function(p){ return S.vue.ecran(p.x, p.y); });
        for (var i = 0; i < P.length; i++) if (Math.hypot(x - P[i].x, y - P[i].y) <= 18){ S.sel.sommet = S.sel.sommet === i ? null : i; majPanneau(); redessiner(); return; }
      }
      selectionner(z.id); return;
    }
    if (o.k === 'pt'){
      var z2 = toucher(x, y);
      if (z2 && z2.type === 'pt' && !z2.zone && Math.hypot(x - z2.x, y - z2.y) <= z2.r + 4){ selectionner(z2.id); return; }
      poserObjet(o.t, x, y); return;
    }
    if (o.k === 'tx'){ poserTexte(x, y); return; }
    if (o.k === 'ln'){
      var b2 = S.brouillon;
      if (b2 && b2.pts.length){ var last = S.vue.ecran(b2.pts[b2.pts.length - 1].x, b2.pts[b2.pts.length - 1].y); if (Math.hypot(x - last.x, y - last.y) <= 18 || (double && b2.pts.length >= 2)){ terminerTrace(); return; } }
      var oo = OUTILS_LN[o.id], prec = b2 && b2.pts.length ? b2.pts[b2.pts.length - 1] : null;
      var a2 = oo.t === 'lim' ? (function(){ var m = S.vue.monde(x, y); return {x: m.x, y: m.y}; })() : accroche(x, y, {prec: prec, col: oo.t === 'col'});
      if (!b2){
        S.brouillon = b2 = {outil: o.id, pts: []};
        if (a2.type === 'som' && !a2.a && oo.t === 'tr'){ var l0 = el(a2.ligne); if (l0 && l0.t === 'tr' && (a2.i === 0 || a2.i === l0.v.length - 1)) b2.prolonge = {id: l0.id, debut: a2.i === 0}; }
      }
      b2.pts.push({x: a2.x, y: a2.y, snap: a2.type ? a2 : null});
      S.sel = null; majAide(); majPanneau(); redessiner();
    }
  }
  function poserObjet(t, x, y){
    instantane();
    var w = S.vue.monde(x, y), o = {id: uid(), k: 'pt', t: t, x: w.x, y: w.y, p: defautsPt(t), lab: null};
    if (T[t].oriente) o.p.a = Math.round(((S.doc.rot || 0) * 180 / Math.PI) * 10) / 10;
    var a = accroche(x, y, {}), passage = T[t].role === 'passage' || T[t].role === 'exutoire';
    S.doc.el.push(o);
    if (a.type === 'som' && !a.a){ var l = el(a.ligne), ext = l && (a.i === 0 || a.i === l.v.length - 1); if (ext || passage){ o.x = a.x; o.y = a.y; insererDansLigne(S.doc, o, a); } }
    else if (a.type === 'seg' && passage && t !== 'zone'){ insererDansLigne(S.doc, o, a); }
    analyse();
    if (!T[t].sansEtiquette) o.lab = placerEtiquette(S.doc, S.an, o, E(), idx()) || null;
    S.sel = {id: o.id, sommet: null}; S.panneau = 'fiche';
    changement(); rendreVisible(o.id);
    vibrer();
  }
  function poserTexte(x, y){
    demander('Texte sur le plan', '', function(txt){
      if (!String(txt || '').trim()) return;
      instantane(); var w = S.vue.monde(x, y), o = {id: uid(), k: 'tx', x: w.x, y: w.y, txt: String(txt).trim(), taille: 2.5}; S.doc.el.push(o); S.sel = {id: o.id, sommet: null}; S.panneau = 'fiche'; changement();
    });
  }
  function terminerTrace(){
    var b = S.brouillon; S.brouillon = null;
    if (!b || b.pts.length < 2){ majAide(); redessiner(); return; }
    instantane();
    var oo = OUTILS_LN[b.outil], sommets = [];
    b.pts.forEach(function(q){
      var s = q.snap;
      if (s && s.type === 'obj' && el(s.id)){ var ob = el(s.id); sommets.push({x: ob.x, y: ob.y, a: ob.id}); }
      else if (s && (s.type === 'som' || s.type === 'seg') && oo.t !== 'lim'){
        if (b.prolonge && s.type === 'som' && s.ligne === b.prolonge.id){ var lp = el(s.ligne); sommets.push({x: q.x, y: q.y, a: lp && lp.v[s.i] ? lp.v[s.i].a : null, propre: true}); return; }
        var j = jonctionSur(S.doc, s); sommets.push(j ? {x: j.x, y: j.y, a: j.id} : {x: q.x, y: q.y, a: null});
      }
      else sommets.push({x: q.x, y: q.y, a: null});
    });
    var l;
    if (b.prolonge && el(b.prolonge.id)){
      l = el(b.prolonge.id); var neufs = sommets.slice(1).map(function(v){ return {x: v.x, y: v.y, a: v.a || null}; });
      if (b.prolonge.debut) l.v = neufs.reverse().concat(l.v); else l.v = l.v.concat(neufs);
    } else {
      l = {id: uid(), k: 'ln', t: oo.t, v: sommets.map(function(v){ return {x: v.x, y: v.y, a: v.a || null}; }), p: defautsLn(oo.t, oo.p), lab: null};
      S.doc.el.push(l);
    }
    dedoublonner(l);
    if (l.v.length < 2){ S.doc.el = S.doc.el.filter(function(x){ return x.id !== l.id; }); S.undo.pop(); majAide(); redessiner(); return; }
    analyse();
    if (!l.lab && texteEtiquette(l, S.an)) l.lab = placerEtiquette(S.doc, S.an, l, E(), idx());
    S.sel = {id: l.id, sommet: null}; S.panneau = 'fiche';
    changement(); rendreVisible(l.id);
    var r = l.t === 'tr' ? resLigne(l, S.an) : null;
    toast((l.t === 'col' ? 'Collecteur' : l.t === 'lim' ? 'Trait' : 'Tronçon') + ' ajouté' + (r ? (r === 'INC' ? ' : réseau à préciser' : r === 'MIX' ? ' : plusieurs réseaux atteints' : ' : réseau ' + libRes(r) + (RES[l.p.res] ? '' : ' déduit')) : '') + ' · ' + frNum(Math.round(longueur(lignePts(l, idx())) * 10) / 10) + ' m');
  }
  function annulerTrace(){ S.brouillon = null; majAide(); redessiner(); }
  function retirerPoint(){ if (S.brouillon){ S.brouillon.pts.pop(); if (!S.brouillon.pts.length) S.brouillon = null; majAide(); redessiner(); } }
  function vibrer(){ try { if (global.navigator && navigator.vibrate) navigator.vibrate(12); } catch(e){} }

  /* --- sélection et outils --- */
  function selectionner(id){ S.sel = id ? {id: id, sommet: null} : null; if (id) S.panneau = 'fiche'; majPanneau(); if (id) rendreVisible(id); redessiner(); }
  /* l'élément choisi ne doit pas rester caché sous la fiche : la vue glisse juste assez */
  function rendreVisible(id){
    var e = el(id); if (!e || pan.hidden) return;
    var a = e.k === 'ln' ? ancre(e, idx()) : {x: e.x, y: e.y}, p = S.vue.ecran(a.x, a.y), r = pan.getBoundingClientRect(), r0 = R.getBoundingClientRect(), dx = 0, dy = 0;
    if (r.width < r0.width * .9){ var lim = r.left - r0.left - 70; if (p.x > lim) dx = p.x - lim; }
    else { var limy = r.top - r0.top - 70; if (p.y > limy) dy = p.y - limy; }
    if (!dx && !dy) return;
    var c0 = S.vue.monde(S.vue.w / 2, S.vue.h / 2), c1 = S.vue.monde(S.vue.w / 2 + dx, S.vue.h / 2 + dy);
    S.vue.cx += c1.x - c0.x; S.vue.cy += c1.y - c0.y; enregistrerVue();
  }
  function choisirOutil(o){
    if (S.brouillon && S.brouillon.pts.length >= 2) terminerTrace(); else S.brouillon = null;
    S.outil = o; S.aligner = null;
    R.querySelectorAll('.vc-o').forEach(function(b){ var on = o.k === 'main' ? b.dataset.outil === 'main' : b.dataset.pal === o.pal; b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    fermerPalette(); majAide(); redessiner();
  }
  function ouvrirPalette(k){
    if (S.palette === k){ fermerPalette(); return; }
    S.palette = k; var P = PALETTES[k];
    pal.innerHTML = '<h3>' + esc(P.lib) + '</h3><div class="vc-pgrille">' + P.items.map(function(it){
      var q = it.split(':'), lib, sous = '', svg, actif = false;
      if (q[0] === 'pt'){ lib = T[q[1]].lib; svg = symboleSvg(q[1], 38); actif = S.outil.k === 'pt' && S.outil.t === q[1]; }
      else if (q[0] === 'ln'){ var oo = OUTILS_LN[q[1]]; lib = oo.lib; sous = oo.sous || ''; svg = traitSvg(oo.col ? oo.res : oo.res, oo.st, 38); actif = S.outil.k === 'ln' && S.outil.id === q[1]; }
      else { lib = 'Texte libre'; svg = '<span class="vc-ptx">' + ico('texte', 30) + '</span>'; actif = S.outil.k === 'tx'; }
      return '<button type="button" class="vc-pitem" data-item="' + it + '" aria-pressed="' + actif + '">' + svg + '<span>' + esc(lib) + (sous ? '<small>' + esc(sous) + '</small>' : '') + '</span></button>';
    }).join('') + '</div>';
    pal.hidden = false;
    R.querySelectorAll('.vc-o').forEach(function(b){ if (b.dataset.pal) b.classList.toggle('ouvert', b.dataset.pal === k); });
  }
  function fermerPalette(){ S.palette = null; pal.hidden = true; R.querySelectorAll('.vc-o').forEach(function(b){ b.classList.remove('ouvert'); }); }
  pal.addEventListener('click', function(ev){
    var b = ev.target.closest('[data-item]'); if (!b) return;
    var q = b.dataset.item.split(':'), k = S.palette;
    if (q[0] === 'pt') choisirOutil({k: 'pt', t: q[1], pal: k}); else if (q[0] === 'ln') choisirOutil({k: 'ln', id: q[1], pal: k}); else choisirOutil({k: 'tx', pal: k});
  });
  function majAide(){
    var o = S.outil, h = '';
    if (S.aligner) h = '<span>Touchez deux points le long de la voie : le plan tournera pour la mettre à l\'horizontale.</span><button type="button" class="vc-b vc-bt" data-a="alignerStop">Annuler</button>';
    else if (o.k === 'ln'){
      var oo = OUTILS_LN[o.id], n = S.brouillon ? S.brouillon.pts.length : 0;
      h = '<span><strong>' + esc(oo.lib) + '</strong> : ' + (n ? n + ' point' + (n > 1 ? 's' : '') + '. Touchez le point suivant ; touchez à nouveau le dernier point pour terminer.' : 'touchez le point de départ (un objet, un tracé ou un point libre).') + '</span>'
        + (n ? '<button type="button" class="vc-b vc-bt" data-a="retirerPoint">' + ico('annuler', 18) + 'Point</button><button type="button" class="vc-b vc-bt" data-a="annulerTrace">' + ico('fermer', 18) + 'Abandonner</button>' + (n >= 2 ? '<button type="button" class="vc-b vc-bt vc-prim" data-a="terminerTrace">' + ico('valider', 18) + 'Terminer</button>' : '') : '');
    }
    else if (o.k === 'pt') h = '<span>Touchez le plan pour poser : <strong>' + esc(T[o.t].lib) + '</strong>' + (T[o.t].role === 'passage' ? ' (posé sur un tracé, il s\'y insère)' : '') + '.</span>';
    else if (o.k === 'tx') h = '<span>Touchez le plan à l\'endroit du texte.</span>';
    aide.innerHTML = h; aide.hidden = !h;
  }
  aide.addEventListener('click', function(ev){ var b = ev.target.closest('[data-a]'); if (!b) return; var a = b.dataset.a; if (a === 'terminerTrace') terminerTrace(); else if (a === 'annulerTrace') annulerTrace(); else if (a === 'retirerPoint') retirerPoint(); else if (a === 'alignerStop'){ S.aligner = null; majAide(); redessiner(); } });
  R.querySelector('.vc-outils').addEventListener('click', function(ev){
    var b = ev.target.closest('.vc-o'); if (!b) return;
    if (b.dataset.outil === 'main'){ choisirOutil({k: 'main'}); return; }
    ouvrirPalette(b.dataset.pal);
  });
  R.querySelector('.vc-nav').addEventListener('click', function(ev){
    var b = ev.target.closest('[data-a]'); if (!b) return; var a = b.dataset.a;
    if (a === 'zoomp' || a === 'zoomm'){ S.vue.s = clamp(S.vue.s * (a === 'zoomp' ? 1.5 : 1 / 1.5), .02, 2000); redessiner(); enregistrerVue(); }
    else if (a === 'ajuster') ajusterVue();
    else if (a === 'rotg' || a === 'rotd' || a === 'nord'){ instantane(); S.doc.rot = a === 'nord' ? 0 : (S.doc.rot || 0) + (a === 'rotg' ? 1 : -1) * Math.PI / 12; S.vue.rot = S.doc.rot; changement({garderPanneau: true}); }
  });
  function ajusterVue(){
    var b = emprisePlan(S.doc);
    if (b){ var c = depuisPlan((b[0] + b[2]) / 2, (b[1] + b[3]) / 2, S.doc.rot || 0), hw = Math.max(8, (b[2] - b[0]) / 2 + 4), hh = Math.max(8, (b[3] - b[1]) / 2 + 4);
      S.vue.rot = S.doc.rot || 0; S.vue.cx = c.x; S.vue.cy = c.y; S.vue.s = clamp(Math.min((S.vue.w - 160) / (2 * hw), (S.vue.h - 160) / (2 * hh)), .02, 2000); }
    else if (S.fond){ var o = offFond(S.fond), d = S.fond.bboxDense; S.vue.ajuster([d[0] + o.x, d[1] + o.y, d[2] + o.x, d[3] + o.y], 40); }
    else { S.vue.cx = 0; S.vue.cy = 0; S.vue.s = 20; }
    redessiner(); enregistrerVue();
  }

  /* --- barre, panneaux, fenêtres --- */
  function majBarre(){
    var t = R.querySelector('.vc-titre');
    t.querySelector('strong').textContent = S.doc.nom || 'Croquis';
    t.querySelector('span').textContent = [S.doc.numero ? 'n° ' + S.doc.numero : '', S.doc.adresse, S.doc.commune].filter(Boolean).join(' · ') || (S.fond ? S.fond.nom : 'Sans fond de plan');
    var nb = S.an.controles.filter(function(c){ return c.niveau === 'manque'; }).length, na = S.liste.filter(function(a){ return a.st === 'retenue'; }).length, ba = R.querySelector('.vc-badge');
    ba.hidden = !(nb + na); ba.textContent = na + (nb ? ' · ' + nb : ''); ba.title = na + ' anomalie(s) retenue(s), ' + nb + ' point(s) à compléter';
    R.querySelector('[data-a="annuler"]').disabled = !S.undo.length; R.querySelector('[data-a="refaire"]').disabled = !S.redo.length;
  }
  var tToast = null;
  function toast(msg, ms){ var t = R.querySelector('.vc-toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(tToast); tToast = setTimeout(function(){ t.classList.remove('on'); }, ms || 2600); }
  function demander(titre, val, fn, o){
    o = o || {};
    var d = document.createElement('div'); d.className = 'vc-modal';
    d.innerHTML = '<div class="vc-mboite" role="dialog" aria-modal="true" aria-label="' + esc(titre) + '"><h3>' + esc(titre) + '</h3>' + (o.texte ? '<p>' + esc(o.texte) + '</p>' : '')
      + (o.confirmer ? '' : (o.long ? '<textarea rows="3"></textarea>' : '<input type="text" autocomplete="off">'))
      + '<div class="vc-mact"><button type="button" class="vc-b vc-bt" data-r="0">Annuler</button><button type="button" class="vc-b vc-bt vc-prim' + (o.danger ? ' vc-danger' : '') + '" data-r="1">' + esc(o.ok || 'Valider') + '</button></div></div>';
    R.appendChild(d);
    var inp = d.querySelector('input,textarea'); if (inp){ inp.value = val || ''; setTimeout(function(){ inp.focus(); inp.select && inp.select(); }, 30); }
    function fermer(ok){ d.remove(); if (ok) fn(inp ? inp.value : true); }
    d.addEventListener('click', function(ev){ var b = ev.target.closest('[data-r]'); if (b) fermer(b.dataset.r === '1'); else if (ev.target === d) fermer(false); });
    d.addEventListener('keydown', function(ev){ if (ev.key === 'Escape') fermer(false); if (ev.key === 'Enter' && !(inp && inp.tagName === 'TEXTAREA')){ ev.preventDefault(); fermer(true); } });
  }
  R.querySelector('.vc-barre').addEventListener('click', function(ev){
    var b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.p){ S.panneau === b.dataset.p ? fermerPanneau() : ouvrirPanneau(b.dataset.p); return; }
    var a = b.dataset.a;
    if (a === 'annuler') annuler(); else if (a === 'refaire') refaire();
    else if (a === 'retour'){ enregistrer(); if (opts.retour) opts.retour(); }
  });
  function ouvrirPanneau(n){ S.panneau = n; fermerPalette(); majPanneau(); }
  function fermerPanneau(){ S.panneau = null; if (S.sel){ S.sel = null; redessiner(); } majPanneau(); }
  pan.querySelector('[data-a="fermerPanneau"]').addEventListener('click', fermerPanneau);
  document.addEventListener('keydown', function(ev){
    if (!R.isConnected || !S.doc || ev.target.closest && ev.target.closest('input,textarea,select')) return;
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'z'){ ev.preventDefault(); ev.shiftKey ? refaire() : annuler(); }
    else if (ev.key === 'Escape'){ if (S.brouillon) annulerTrace(); else if (S.palette) fermerPalette(); else if (S.sel || S.panneau) fermerPanneau(); }
    else if (ev.key === 'Enter' && S.brouillon) terminerTrace();
    else if ((ev.key === 'Delete' || ev.key === 'Backspace') && S.sel){ ev.preventDefault(); supprimerSel(); }
  });
  function supprimerSel(){
    if (!S.sel) return; var e = el(S.sel.id); if (!e) return;
    instantane();
    if (e.k === 'ln' && S.sel.sommet != null && e.v.length > 2){ e.v.splice(S.sel.sommet, 1); S.sel.sommet = null; nettoyerJonctions(S.doc); changement(); return; }
    supprimerElement(S.doc, e.id); S.sel = null; changement(); toast('Supprimé · « Annuler » le rétablit');
  }
  global.addEventListener('resize', redim);
  if (global.ResizeObserver) new ResizeObserver(redim).observe(R);

  /* --- panneau : fiche de l'élément choisi, contrôles, constat, fond, sorties, réglages --- */
  function chipsHtml(k, options, val, o){
    o = o || {}; var multi = Array.isArray(val);
    return '<div class="vc-chips" role="group"' + (o.label ? ' aria-label="' + esc(o.label) + '"' : '') + '>' + options.map(function(op){
      var on = multi ? val.indexOf(op[0]) >= 0 : String(val) === String(op[0]);
      return '<button type="button" class="vc-chip' + (o.cls ? ' ' + o.cls : '') + '" data-a="' + (o.a || 'prop') + '" data-k="' + k + '" data-v="' + esc(op[0]) + '"' + (multi ? ' data-multi="1"' : '') + (o.garder ? ' data-garder="1"' : '') + ' aria-pressed="' + on + '">' + esc(op[1]) + '</button>';
    }).join('') + '</div>';
  }
  function champ(lib, html, aide){ return '<div class="vc-champ"><div class="vc-lab">' + lib + (aide ? ' <small>' + aide + '</small>' : '') + '</div>' + html + '</div>'; }
  function saisie(k, val, o){ o = o || {}; return '<input class="vc-in" type="text"' + (o.num ? ' inputmode="decimal"' : '') + ' data-a="' + (o.a || 'propTxt') + '" data-k="' + k + '" value="' + esc(val == null ? '' : val) + '"' + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + (o.lab ? ' aria-label="' + esc(o.lab) + '"' : '') + '>'; }
  function zone(k, val, o){ o = o || {}; return '<textarea class="vc-in" rows="2" data-a="' + (o.a || 'propTxt') + '" data-k="' + k + '"' + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + (o.lab ? ' aria-label="' + esc(o.lab) + '"' : '') + '>' + esc(val || '') + '</textarea>'; }
  var OUI_NON = [['oui', 'Oui'], ['non', 'Non']];
  function etatSource(e){
    var r = S.an.resObj[e.id], a = S.liste.filter(function(x){ return x.objId === e.id && x.st === 'retenue'; });
    if (!r) return {cls: 'att', txt: S.mode === 'avp' ? 'Hors de l\'avant-projet' : 'Projet : non analysé dans l\'état des lieux'};
    if (r.etat === 'nonrelie') return {cls: 'ko', txt: 'Non relié : tracez un tronçon depuis cet objet'};
    if (r.etat === 'sansexu') return {cls: 'att', txt: 'Exutoire non dessiné : prolongez le tracé ou indiquez le réseau du tronçon'};
    if (r.etat === 'multiple') return {cls: 'ko', txt: 'Relié à plusieurs réseaux : indiquez le sens d\'écoulement'};
    var txt = 'Rejet : ' + (EXU_LIB[r.res] || r.res) + (/^(EU|EP|UN)$/.test(r.res) && r.gest ? ' ' + GEST_LIB[r.gest] : '') + (r.presume ? ' (d\'après le tronçon)' : '');
    return a.length ? {cls: 'ko', txt: txt + ' · anomalie' + (a.length > 1 ? 's' : '') + ' n° ' + a.map(function(x){ return x.num; }).join(', ')} : {cls: 'ok', txt: txt};
  }
  function ficheHtml(e){
    var h = '', ty, I = idx();
    if (e.k === 'pt'){
      ty = T[e.t];
      var fam = FAMILLES.filter(function(f){ return f.types.indexOf(e.t) >= 0; })[0], et = ty.role === 'source' ? etatSource(e) : null, res = S.an.resPt[e.id];
      h += '<div class="vc-ftete">' + symboleSvg(e.t, 40) + '<div><strong>' + esc(ty.lib) + '</strong>' + (et ? '<span class="vc-etat ' + et.cls + '">' + esc(et.txt) + '</span>' : ty.regard || ty.role === 'passage' ? '<span class="vc-etat ' + (/^(EU|EP|UN)$/.test(res) ? 'ok' : 'att') + '">' + (/^(EU|EP|UN)$/.test(res) ? 'Réseau ' + libRes(res) + (ty.boite && RES[e.p.res] ? '' : ' déduit') : res === 'MIX' ? 'Plusieurs réseaux' : 'Réseau à préciser') + '</span>' : '') + '</div></div>';
      if (fam && fam.types.length > 1 && e.t !== 'jonction') h += champ('Type', '<select class="vc-in" data-a="type" aria-label="Type">' + fam.types.filter(function(t){ return t !== 'jonction'; }).map(function(t){ return '<option value="' + t + '"' + (t === e.t ? ' selected' : '') + '>' + esc(T[t].lib) + '</option>'; }).join('') + '</select>');
      if (ty.role === 'source' || e.t === 'test') h += champ('Méthode de test', chipsHtml('meth', METH.map(function(m){ return [m[0], m[1]]; }), e.p.meth || [], {label: 'Méthode de test'}), ty.role === 'source' ? 'comment l\'écoulement a été établi' : '');
      if (e.t === 'descente'){ h += champ('Façade', chipsHtml('cote', [['avant', 'Avant'], ['arriere', 'Arrière']], e.p.cote)); h += champ('Visitable', chipsHtml('visitable', OUI_NON, e.p.visitable)); }
      if (ty.role === 'source') h += champ('Niveau', chipsHtml('niv', NIV, e.p.niv));
      if (ty.boite || e.t === 'regard_pub') h += champ('Réseau', chipsHtml('res', [['EU', 'EU'], ['EP', 'EP'], ['UN', 'Unitaire']], e.p.res), RES[e.p.res] ? '' : 'déduit du dessin tant qu\'il n\'est pas indiqué');
      if (ty.regard && e.t !== 'regard_pub'){
        h += champ('Tampon', chipsHtml('tampon', TAMPON, e.p.tampon));
        h += champ('Cunette', chipsHtml('cunette', OUI_NON, e.p.cunette));
        h += champ('Accessible', chipsHtml('acces', OUI_NON, e.p.acces));
        h += champ('Dimension', chipsHtml('dim', [['30×30', '30×30'], ['40×40', '40×40'], ['50×50', '50×50'], ['60×60', '60×60'], ['80×80', '80×80']], e.p.dim) + saisie('dim', e.p.dim, {ph: 'autre dimension', lab: 'Dimension'}));
        h += champ('Profondeur (m)', saisie('prof', e.p.prof, {num: true, ph: 'ex. 0,80', lab: 'Profondeur en mètres'}));
        h += champ('Méthode de test', chipsHtml('meth', METH.map(function(m){ return [m[0], m[1]]; }), e.p.meth || []), 'facultatif');
      }
      if (e.t === 'pr') h += champ('Fonction', chipsHtml('fn', [['eaux ménagères', 'Eaux ménagères'], ['chaudière', 'Chaudière'], ['nappe', 'Nappe'], ['toutes EU', 'Toutes EU']], e.p.fn));
      if (ty.oriente) h += champ('Orientation', '<div class="vc-chips"><button type="button" class="vc-chip" data-a="orienter" data-v="15">' + ico('rotg', 18) + ' 15°</button><button type="button" class="vc-chip" data-a="orienter" data-v="-15">' + ico('rotd', 18) + ' 15°</button><button type="button" class="vc-chip" data-a="orienter" data-v="90">90°</button></div>');
      if (e.t === 'test') h += champ('Résultat', saisie('resultat', e.p.resultat, {ph: 'ex. colorant ressorti en boîte EP'}));
      if (e.t === 'zone') h += champ('Rayon', '<div class="vc-chips"><button type="button" class="vc-chip" data-a="rayon" data-v="-.5">−</button><span class="vc-val">' + frNum(num(e.p.r) || 1.5) + ' m</span><button type="button" class="vc-chip" data-a="rayon" data-v=".5">+</button></div>');
      if (e.t !== 'jonction' && ty.role !== 'note') h += champ('Statut', chipsHtml('st', [['existant', 'Existant'], ['projet', 'Projet'], ['supprimer', 'À supprimer']], e.p.st || 'existant', {garder: true}));
      h += champ('Observation', zone('obs', e.p.obs, {ph: 'note libre, reprise dans le rapport'}));
    } else if (e.k === 'ln'){
      var L = longueur(lignePts(e, I)), rl = resLigne(e, S.an);
      if (e.t === 'col'){
        h += '<div class="vc-ftete">' + traitSvg(e.p.res, '', 40) + '<div><strong>Collecteur public</strong><span class="vc-etat ok">' + esc(libRes(e.p.res)) + ' · ' + frNum(Math.round(L * 10) / 10) + ' m sur le plan</span></div></div>';
        h += champ('Réseau', chipsHtml('res', [['EU', 'EU'], ['EP', 'EP'], ['UN', 'Unitaire']], e.p.res, {garder: true}));
        h += champ('Gestionnaire', chipsHtml('gest', GEST, e.p.gest, {garder: true}));
        h += champ('Diamètre', chipsHtml('diam', [['200', 'Ø200'], ['250', 'Ø250'], ['300', 'Ø300'], ['400', 'Ø400'], ['500', 'Ø500']], e.p.diam) + saisie('diam', e.p.diam, {num: true, ph: 'autre diamètre (mm)', lab: 'Diamètre'}));
      } else if (e.t === 'lim'){
        h += '<div class="vc-ftete">' + traitSvg('LIM', '', 40) + '<div><strong>Complément du fond</strong><span class="vc-etat att">Bâti, limite ou repère ajouté au plan</span></div></div>';
      } else {
        var dd = RES[e.p.res] ? '' : ' déduit', cls = rl === 'INC' || rl === 'MIX' ? 'att' : 'ok';
        h += '<div class="vc-ftete">' + traitSvg(e.p.st === 'projet' ? 'PRJ' : rl, e.p.st, 40) + '<div><strong>Tronçon</strong><span class="vc-etat ' + cls + '">' + esc(rl === 'INC' ? 'Réseau à préciser' : rl === 'MIX' ? 'Plusieurs réseaux atteints' : rl === 'PRJ' ? 'Projet' : 'Réseau ' + libRes(rl) + dd) + ' · ' + frNum(Math.round(L * 10) / 10) + ' m sur le plan</span></div></div>';
        h += champ('Réseau', chipsHtml('res', [['', 'Déduit'], ['EU', 'EU'], ['EP', 'EP'], ['UN', 'Unitaire']], e.p.res || '', {garder: true}), 'à indiquer seulement si le dessin ne va pas jusqu\'à l\'exutoire');
        h += champ('Statut', chipsHtml('st', STATUT, e.p.st || 'existant', {garder: true}));
        h += champ('Diamètre', chipsHtml('diam', DIAM.map(function(d){ return [d, 'Ø' + d]; }), e.p.diam) + saisie('diam', e.p.diam, {num: true, ph: 'autre diamètre (mm)', lab: 'Diamètre'}));
        h += champ('Matériau', chipsHtml('mat', MAT, e.p.mat));
        h += champ('Pose', chipsHtml('pose', [['enterre', 'Enterrée'], ['aerien', 'Aérienne'], ['encorbellement', 'En encorbellement']], e.p.pose));
        h += champ('Longueur mesurée (m)', saisie('long', e.p.long, {num: true, ph: 'sur le plan : ' + frNum(Math.round(L * 10) / 10), lab: 'Longueur mesurée'}), 'prioritaire sur la longueur du plan');
        h += champ('Sens d\'écoulement', chipsHtml('sens', [['0', 'Déduit'], ['1', 'Sens du tracé'], ['-1', 'Sens inverse']], String(e.p.sens || 0), {garder: true}), 'la flèche du plan montre le sens retenu');
        h += champ('Observation', zone('obs', e.p.obs, {ph: 'note libre'}));
      }
      if (S.sel.sommet != null && e.v[S.sel.sommet]){
        var v = e.v[S.sel.sommet];
        h += '<div class="vc-sommet"><strong>Point ' + (S.sel.sommet + 1) + ' sur ' + e.v.length + '</strong>' + (v.a ? ' · relié à ' + esc(libObj(el(v.a) || {t: ''})) : '')
          + '<div class="vc-chips">' + (e.v.length > 2 ? '<button type="button" class="vc-chip" data-a="sommetSuppr">Retirer ce point</button>' : '') + (v.a ? '<button type="button" class="vc-chip" data-a="sommetDetacher">Détacher</button>' : '') + '</div></div>';
      }
    } else if (e.k === 'tx'){
      h += '<div class="vc-ftete">' + ico('texte', 34) + '<div><strong>Texte libre</strong></div></div>';
      h += champ('Texte', zone('txt', e.txt, {a: 'texteLibre', lab: 'Texte'}));
      h += champ('Taille', chipsHtml('taille', [['2', 'Petit'], ['2.5', 'Moyen'], ['3.5', 'Grand']], String(e.taille || 2.5), {a: 'tailleTexte', garder: true}));
    }
    if (e.k !== 'tx' && !(e.k === 'pt' && T[e.t].sansEtiquette) && e.t !== 'lim'){
      var auto = texteEtiquette(Object.assign({}, e, {p: Object.assign({}, e.p, {etiq: ''})}), S.an), off = e.lab && e.lab.off;
      h += champ('Étiquette', saisie('etiq', e.p.etiq || '', {ph: auto || 'pas d\'étiquette automatique', lab: 'Texte de l\'étiquette'})
        + '<div class="vc-chips"><button type="button" class="vc-chip" data-a="etiqOnOff" aria-pressed="' + !off + '">' + (off ? 'Masquée' : 'Affichée') + '</button>' + (!off ? '<button type="button" class="vc-chip" data-a="etiqReplacer">Replacer</button>' : '') + '</div>', 'glissez-la sur le plan pour la déplacer');
    }
    if (e.k === 'pt' || (e.k === 'ln' && e.t === 'tr')) h += anomsObjet(e);
    h += '<div class="vc-fact"><button type="button" class="vc-b vc-bt vc-danger" data-a="supprimer">' + ico('poubelle', 18) + 'Supprimer</button></div>';
    return h;
  }
  function anomHtml(a, avecObjet){
    var cls = a.st === 'ecartee' ? 'ec' : a.st === 'arbitrer' ? 'arb' : 'ret';
    return '<div class="vc-anom ' + cls + '">'
      + '<div class="vc-anum">' + (a.num ? '<b>' + a.num + '</b>' : '<b class="vide">–</b>') + '</div><div class="vc-acorps">'
      + '<textarea class="vc-in" rows="2" data-a="decTxt" data-cle="' + esc(a.cle) + '" data-k="obs" aria-label="Observation">' + esc(a.obs) + '</textarea>'
      + '<textarea class="vc-in vc-preco" rows="2" data-a="decTxt" data-cle="' + esc(a.cle) + '" data-k="preco" placeholder="Préconisation" aria-label="Préconisation">' + esc(a.preco || '') + '</textarea>'
      + '<div class="vc-chips">' + [['retenue', 'Retenue'], ['arbitrer', 'À arbitrer'], ['ecartee', 'Écartée']].map(function(o){ return '<button type="button" class="vc-chip" data-a="dec" data-cle="' + esc(a.cle) + '" data-v="' + o[0] + '" aria-pressed="' + (a.st === o[0]) + '">' + o[1] + '</button>'; }).join('')
      + '</div><div class="vc-chips">' + [['1', 'Non-conformité'], ['0', 'Réserve']].map(function(o){ return '<button type="button" class="vc-chip" data-a="decNc" data-cle="' + esc(a.cle) + '" data-v="' + o[0] + '" aria-pressed="' + (!!a.nc === (o[0] === '1')) + '">' + o[1] + '</button>'; }).join('')
      + (avecObjet && a.objId ? '<button type="button" class="vc-chip" data-a="voir" data-id="' + esc(a.objId) + '">Voir</button>' : '')
      + (!a.auto ? '<button type="button" class="vc-chip" data-a="anomSuppr" data-cle="' + esc(a.cle) + '">Supprimer</button>' : '') + '</div>'
      + (a.auto ? '<small class="vc-auto">Déduite du dessin</small>' : '<small class="vc-auto">Ajoutée à la main</small>') + '</div></div>';
  }
  function anomsObjet(e){
    var L = S.liste.filter(function(a){ return a.objId === e.id; }), h = '<div class="vc-champ"><div class="vc-lab">Anomalies</div>' + (L.length ? L.map(function(a){ return anomHtml(a, false); }).join('') : '<p class="vc-muet">Aucune anomalie sur cet objet.</p>');
    if (S.ajoutAnom === e.id){
      var lib = BIBLIO_MANU[famDe(e)] || [], nom = e.k === 'ln' ? 'Tronçon' : libObj(e);
      h += '<div class="vc-ajout"><div class="vc-chips">' + lib.map(function(b, i){ return '<button type="button" class="vc-chip" data-a="anomLib" data-i="' + i + '">' + esc(nom + ' : ' + b[0]) + '</button>'; }).join('') + '</div>'
        + '<input class="vc-in" id="vc-aobs" placeholder="Autre observation" aria-label="Autre observation"><input class="vc-in" id="vc-apreco" placeholder="Préconisation" aria-label="Préconisation">'
        + '<div class="vc-chips"><button type="button" class="vc-chip" data-a="anomLibre">Ajouter</button><button type="button" class="vc-chip" data-a="anomAjoutStop">Fermer</button></div></div>';
    } else h += '<button type="button" class="vc-b vc-bt" data-a="anomAjout">' + ico('plus', 18) + 'Ajouter une anomalie</button>';
    return h + '</div>';
  }
  function controlesHtml(){
    var c = conclusion(S.liste, S.an), ret = S.liste.filter(function(a){ return a.st === 'retenue'; }), autres = S.liste.filter(function(a){ return a.st !== 'retenue'; });
    var manque = S.an.controles.filter(function(x){ return x.niveau === 'manque'; }), info = S.an.controles.filter(function(x){ return x.niveau === 'info'; });
    var h = '<div class="vc-chips vc-mode">' + [['edl', 'État des lieux'], ['avp', 'Après l\'avant-projet']].map(function(m){ return '<button type="button" class="vc-chip" data-a="mode" data-v="' + m[0] + '" aria-pressed="' + (S.mode === m[0]) + '">' + m[1] + '</button>'; }).join('') + '</div>';
    if (S.mode === 'avp') h += '<p class="vc-muet">Contrôle du projet : les tracés « à supprimer » sont retirés, les objets et tracés « projet » sont pris en compte.</p>';
    h += '<div class="vc-concl ' + (c === 'non_conformes' ? 'ko' : c ? 'ok' : '') + '">Conclusion proposée : <strong>' + esc(CONCL[c] || 'aucun appareil sur le plan') + '</strong></div>';
    h += '<h4>Anomalies retenues (' + ret.length + ')</h4>' + (ret.length ? ret.map(function(a){ return anomHtml(a, true); }).join('') : '<p class="vc-muet">Aucune.</p>');
    if (autres.length) h += '<h4>À arbitrer ou écartées (' + autres.length + ')</h4>' + autres.map(function(a){ return anomHtml(a, true); }).join('');
    h += '<h4>À compléter (' + manque.length + ')</h4>' + (manque.length ? '<ul class="vc-ctl">' + manque.map(function(x){ return '<li><button type="button" data-a="voir" data-id="' + esc(x.id) + '">' + esc(x.txt) + '</button></li>'; }).join('') + '</ul>' : '<p class="vc-muet">Rien : chaque appareil a sa méthode de test et son exutoire.</p>');
    if (info.length) h += '<h4>À vérifier (' + info.length + ')</h4><ul class="vc-ctl info">' + info.map(function(x){ return '<li><button type="button" data-a="voir" data-id="' + esc(x.id) + '">' + esc(x.txt) + '</button></li>'; }).join('') + '</ul>';
    return h;
  }
  function constatHtml(){
    var cd = constatDeduit(S.doc, S.an), rows = cd.rows.filter(function(r){ return r.nb || r.std; });
    var h = '<p class="vc-muet">Ce que le croquis permet de remplir dans le constat : nombre d\'installations, raccordement, conformité et méthodes. Les lignes reprennent celles du constat de l\'application.</p>';
    h += '<table class="vc-tab"><thead><tr><th>Installation</th><th>Nb</th><th>Raccordement</th><th>Conf.</th><th>Méthodes</th></tr></thead><tbody>' + rows.map(function(r){
      var rac = r.raccord === 'plusieurs' ? 'plusieurs, voir le plan' : (RACC_LIB[r.raccord] || (r.nb ? 'à préciser' : ''));
      return '<tr class="' + (r.nb ? '' : 'vide') + '"><td><span class="vc-g ' + r.groupe + '">' + r.groupe + '</span> ' + esc(r.label) + '</td><td>' + (r.nb || '') + '</td><td>' + esc(rac) + '</td><td>' + (r.conforme === 'oui' ? 'Oui' : r.conforme === 'non' ? '<strong class="ko">Non</strong>' : '') + '</td><td>' + esc(r.meth.map(function(m){ for (var i = 0; i < METH.length; i++) if (METH[i][0] === m) return METH[i][2]; return m; }).join(' ')) + '</td></tr>';
    }).join('') + '</tbody></table>';
    var ms = METH.filter(function(m){ return cd.methodes[m[0]]; }).map(function(m){ return m[1].toLowerCase(); });
    h += '<p><strong>Méthodes de contrôle :</strong> ' + (ms.length ? esc(ms.join(', ')) : 'aucune indiquée') + '</p>';
    if (cd.epRecup.puisard) h += '<p><strong>Ouvrage de récupération des EP :</strong> puisard</p>';
    h += '<p><strong>Conclusion proposée :</strong> ' + esc(CONCL[conclusion(S.liste, S.an)] || '—') + '</p>';
    return h;
  }
  function calquesHtml(){
    var f = S.fond, h = '<h4>Fond de plan</h4>';
    if (f){
      h += '<p><strong>' + esc(f.nom) + '</strong><br><span class="vc-muet">' + f.stats.lignes + ' traits, ' + f.stats.textes + ' textes · DXF ' + esc(f.version || '') + (f.u !== 1 ? ' · unités converties en mètres' : '') + '</span></p>';
      h += '<div class="vc-chips"><button type="button" class="vc-chip" data-a="aff" data-k="fond" aria-pressed="' + S.aff.fond + '">Afficher</button><button type="button" class="vc-chip" data-a="aff" data-k="attenuer" aria-pressed="' + S.aff.attenuer + '">Atténuer</button><button type="button" class="vc-chip" data-a="fondRetirer">Retirer</button></div>';
      h += '<div class="vc-champ"><div class="vc-lab">Chercher sur le plan <small>n° de parcelle, n° de voirie, nom de voie</small></div><input class="vc-in" data-a="chercher" placeholder="ex. 112" aria-label="Chercher sur le plan"><div class="vc-res"></div></div>';
      var cal = f.calques.filter(function(c){ return c.nL || c.nT; });
      h += '<details><summary>Calques du fond (' + cal.length + ')</summary><div class="vc-cal">' + cal.map(function(c){ return '<label><input type="checkbox" data-a="calque" data-k="' + f.calques.indexOf(c) + '"' + (c.vis ? ' checked' : '') + '> ' + esc(c.nom) + ' <small>' + (c.nL ? c.nL + ' tr.' : '') + (c.nT ? ' ' + c.nT + ' txt' : '') + '</small></label>'; }).join('') + '</div></details>';
    } else h += '<p class="vc-muet">Aucun fond. Chargez le plan cadastral DXF de la rue : il reste sur l\'appareil.</p>';
    h += '<label class="vc-b vc-bt vc-fichier">' + ico('calques', 18) + (f ? 'Remplacer le fond (DXF)' : 'Charger un plan DXF') + '<input type="file" accept=".dxf,.DXF" data-a="fondFichier" hidden></label>';
    h += '<h4>Réseaux du Département</h4>';
    if (S.reseau) h += '<p><strong>' + esc(S.reseau.nom) + '</strong><br><span class="vc-muet">' + S.reseau.stats.lignes + ' traits, ' + S.reseau.stats.textes + ' textes</span></p><div class="vc-chips"><button type="button" class="vc-chip" data-a="aff" data-k="reseau" aria-pressed="' + S.aff.reseau + '">Afficher</button><button type="button" class="vc-chip" data-a="reseauRetirer">Retirer</button></div>';
    else h += '<p class="vc-muet">Couche des réseaux publics, en DXF ou en GeoJSON, affichée en couleur sous le croquis.</p>';
    h += '<label class="vc-b vc-bt vc-fichier">' + ico('pub', 18) + (S.reseau ? 'Remplacer les réseaux' : 'Charger les réseaux (DXF, GeoJSON)') + '<input type="file" accept=".dxf,.DXF,.geojson,.json" data-a="reseauFichier" hidden></label>';
    h += '<h4>Affichage</h4><div class="vc-chips"><button type="button" class="vc-chip" data-a="aff" data-k="etiquettes" aria-pressed="' + S.aff.etiquettes + '">Étiquettes</button><button type="button" class="vc-chip" data-a="aligner">' + ico('aligner', 18) + 'Aligner le plan sur une voie</button></div>';
    return h;
  }
  function sortiesHtml(){
    var manque = S.an.controles.filter(function(x){ return x.niveau === 'manque'; }).length, Ech = E();
    var h = '<p class="vc-muet">Échelle du plan : 1/' + Ech + (S.doc.echelle > 0 ? '' : ' (automatique)') + ' · A4 paysage.' + (manque ? ' <strong>' + manque + ' point' + (manque > 1 ? 's' : '') + ' à compléter</strong> (voir Contrôles).' : '') + '</p>';
    h += '<div class="vc-sorties">'
      + '<button type="button" class="vc-b vc-bt vc-grand" data-a="pdfEdl">' + ico('sorties', 20) + '<span>Plan de l\'état des lieux<small>PDF : plan, légende, cartouche, anomalies et méthodes de test</small></span></button>'
      + '<button type="button" class="vc-b vc-bt vc-grand" data-a="pdfAvp">' + ico('sorties', 20) + '<span>Plan d\'avant-projet<small>PDF : tracés projet et préconisations</small></span></button>'
      + '<button type="button" class="vc-b vc-bt vc-grand" data-a="dxf">' + ico('sorties', 20) + '<span>Plan pour la DAO<small>DXF R12 en coordonnées du fond, calques VEDE-…, à ouvrir sur le cadastre</small></span></button>'
      + '<button type="button" class="vc-b vc-bt vc-grand" data-a="json">' + ico('sorties', 20) + '<span>Sauvegarde du croquis<small>fichier .json, sans le fond de plan</small></span></button>'
      + '</div>';
    return h;
  }
  function reglagesHtml(){
    var d = S.doc, Ech = echelleAuto(d), h = '';
    h += champ('Nom du croquis', saisie('nom', d.nom, {a: 'docTxt', lab: 'Nom du croquis'}));
    h += champ('N° de dossier', saisie('numero', d.numero, {a: 'docTxt', lab: 'Numéro de dossier'}));
    h += champ('Adresse du branchement', saisie('adresse', d.adresse, {a: 'docTxt', lab: 'Adresse'}));
    h += champ('Commune', saisie('commune', d.commune, {a: 'docTxt', lab: 'Commune'}));
    h += champ('Date de visite', '<input class="vc-in" type="date" data-a="docTxt" data-k="date" value="' + esc(d.date || '') + '" aria-label="Date de visite">');
    h += champ('Technicien', saisie('technicien', d.technicien, {a: 'docTxt', lab: 'Technicien'}));
    h += champ('Échelle du plan', chipsHtml('echelle', [['0', 'Auto (1/' + Ech + ')'], ['100', '1/100'], ['150', '1/150'], ['200', '1/200'], ['250', '1/250'], ['500', '1/500']], String(d.echelle || 0), {a: 'docEchelle', garder: true}));
    h += champ('Gestionnaire par défaut', ['EU', 'EP', 'UN'].map(function(r){ return '<div class="vc-ligne"><span class="vc-g ' + r + '">' + (r === 'UN' ? 'UN' : r) + '</span>' + chipsHtml(r, [['D', 'Départemental'], ['T', 'Territorial']], (d.gest || {})[r] || 'D', {a: 'docGest', garder: true}) + '</div>'; }).join(''), 'quand le collecteur n\'est pas dessiné');
    h += champ('Orientation', '<div class="vc-chips"><span class="vc-val">' + frNum(Math.round(((d.rot || 0) * 180 / Math.PI) * 10) / 10) + '°</span><button type="button" class="vc-chip" data-a="aligner">' + ico('aligner', 18) + 'Aligner sur une voie</button><button type="button" class="vc-chip" data-a="nordHaut">Nord en haut</button></div>');
    h += champ('Étiquettes', '<button type="button" class="vc-b vc-bt" data-a="replacerTout">Replacer toutes les étiquettes</button>');
    if (opts.supprimer) h += '<div class="vc-fact"><button type="button" class="vc-b vc-bt vc-danger" data-a="docSuppr">' + ico('poubelle', 18) + 'Supprimer ce croquis</button></div>';
    return h;
  }
  var TITRES = {fiche: '', controles: 'Contrôles', constat: 'Constat déduit', calques: 'Fond et réseaux', sorties: 'Sorties', reglages: 'Réglages du croquis'};
  function majPanneau(){
    var n = S.panneau;
    if (n === 'fiche' && !(S.sel && el(S.sel.id))) n = S.panneau = null;
    R.querySelectorAll('.vc-barre [data-p]').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.p === n ? 'true' : 'false'); });
    if (!n){ pan.hidden = true; R.classList.remove('vc-avecpanneau'); return; }
    var top = pan.dataset.n === n + (S.sel ? S.sel.id : '') ? pcorps.scrollTop : 0;
    var e = n === 'fiche' ? el(S.sel.id) : null;
    ptitre.textContent = n === 'fiche' ? (e.k === 'pt' ? 'Objet' : e.k === 'ln' ? (e.t === 'col' ? 'Collecteur' : 'Tracé') : 'Texte') : TITRES[n];
    pcorps.innerHTML = n === 'fiche' ? ficheHtml(e) : n === 'controles' ? controlesHtml() : n === 'constat' ? constatHtml() : n === 'calques' ? calquesHtml() : n === 'sorties' ? sortiesHtml() : reglagesHtml();
    pan.hidden = false; pan.dataset.n = n + (S.sel ? S.sel.id : ''); pcorps.scrollTop = top; R.classList.add('vc-avecpanneau');
  }
  function centrerSur(id){
    var e = el(id); if (!e) return;
    var a = e.k === 'ln' ? ancre(e, idx()) : {x: e.x, y: e.y}; S.vue.cx = a.x; S.vue.cy = a.y; if (S.vue.s < 25) S.vue.s = 40;
    selectionner(id);
  }
  pcorps.addEventListener('click', function(ev){
    var b = ev.target.closest('[data-a]'); if (!b || b.tagName === 'INPUT' && b.type !== 'checkbox' || b.tagName === 'TEXTAREA' || b.tagName === 'SELECT') return;
    var a = b.dataset.a, e = S.sel && el(S.sel.id);
    if (a === 'prop' && e){
      instantane(); var k = b.dataset.k, v = b.dataset.v;
      if (b.dataset.multi){ var arr = (e.p[k] || []).slice(), i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); e.p[k] = arr; }
      else if (k === 'sens') e.p.sens = parseInt(v, 10) || 0;
      else if (b.dataset.garder) e.p[k] = v;
      else e.p[k] = e.p[k] === v ? '' : v;
      apresProp(e); return;
    }
    if (a === 'orienter' && e){ instantane(); e.p.a = (((e.p.a || 0) + parseFloat(b.dataset.v)) % 360 + 360) % 360; changement(); return; }
    if (a === 'rayon' && e){ instantane(); e.p.r = clamp((num(e.p.r) || 1.5) + parseFloat(b.dataset.v), .5, 30); changement(); return; }
    if (a === 'tailleTexte' && e){ instantane(); e.taille = parseFloat(b.dataset.v) || 2.5; changement(); return; }
    if (a === 'etiqOnOff' && e){ instantane(); if (e.lab && e.lab.off) e.lab = placerEtiquette(S.doc, S.an, e, E(), idx()); else e.lab = {off: true}; changement(); return; }
    if (a === 'etiqReplacer' && e){ instantane(); e.lab = null; e.lab = placerEtiquette(S.doc, S.an, e, E(), idx()); changement(); return; }
    if (a === 'supprimer'){ supprimerSel(); return; }
    if (a === 'sommetSuppr' && e && S.sel.sommet != null){ instantane(); e.v.splice(S.sel.sommet, 1); S.sel.sommet = null; nettoyerJonctions(S.doc); changement(); return; }
    if (a === 'sommetDetacher' && e && S.sel.sommet != null){ instantane(); e.v[S.sel.sommet].a = null; nettoyerJonctions(S.doc); changement(); return; }
    if (a === 'dec' || a === 'decNc'){
      instantane(); var cle = b.dataset.cle, m = (S.doc.anomManu || []).filter(function(x){ return x.id === cle; })[0], cur = S.liste.filter(function(x){ return x.cle === cle; })[0];
      if (a === 'dec'){ if (m) m.st = b.dataset.v; else (S.doc.decisions[cle] = S.doc.decisions[cle] || {}).st = b.dataset.v; }
      else { var nv = b.dataset.v === '1'; if (cur && !!cur.nc === nv){ S.undo.pop(); return; } if (m) m.nc = nv; else (S.doc.decisions[cle] = S.doc.decisions[cle] || {}).nc = nv; }
      changement(); return;
    }
    if (a === 'anomSuppr'){ instantane(); S.doc.anomManu = (S.doc.anomManu || []).filter(function(x){ return x.id !== b.dataset.cle; }); changement(); return; }
    if (a === 'anomAjout' && e){ S.ajoutAnom = e.id; majPanneau(); return; }
    if (a === 'anomAjoutStop'){ S.ajoutAnom = null; majPanneau(); return; }
    if ((a === 'anomLib' || a === 'anomLibre') && e){
      var obs, preco, nom = e.k === 'ln' ? 'Tronçon' : libObj(e);
      if (a === 'anomLib'){ var bl = (BIBLIO_MANU[famDe(e)] || [])[+b.dataset.i]; if (!bl) return; obs = nom + ' : ' + bl[0]; preco = bl[1]; }
      else { obs = (pcorps.querySelector('#vc-aobs') || {}).value || ''; preco = (pcorps.querySelector('#vc-apreco') || {}).value || ''; if (!obs.trim()) { toast('Écrivez l\'observation'); return; } obs = obs.trim(); preco = preco.trim(); }
      instantane();
      var ty = e.k === 'pt' ? T[e.t] : null, net = ty && ty.nat ? ty.nat : (/^(EU|EP)$/.test(e.k === 'pt' ? S.an.resPt[e.id] : resLigne(e, S.an)) ? (e.k === 'pt' ? S.an.resPt[e.id] : resLigne(e, S.an)) : 'EU');
      (S.doc.anomManu = S.doc.anomManu || []).push({id: uid(), objId: e.id, reseau: net, obs: obs, preco: preco, nc: true, st: 'retenue'});
      S.ajoutAnom = null; changement(); return;
    }
    if (a === 'voir'){ centrerSur(b.dataset.id); return; }
    if (a === 'mode'){ S.mode = b.dataset.v === 'avp' ? 'avp' : 'edl'; analyse(); majBarre(); majPanneau(); redessiner(); return; }
    if (a === 'aff'){ S.aff[b.dataset.k] = !S.aff[b.dataset.k]; majPanneau(); redessiner(); return; }
    if (a === 'fondRetirer'){ demander('Retirer le fond de plan ?', '', function(){ S.fond = null; S.doc.fondId = null; if (opts.fondRetire) opts.fondRetire(S.doc); changement(); }, {confirmer: true, ok: 'Retirer', texte: 'Le croquis reste en place ; le fond peut être rechargé.'}); return; }
    if (a === 'reseauRetirer'){ S.reseau = null; S.doc.reseauId = null; changement(); return; }
    if (a === 'aligner'){ S.aligner = []; fermerPanneau(); choisirOutil({k: 'main'}); S.aligner = []; majAide(); return; }
    if (a === 'nordHaut'){ instantane(); S.doc.rot = 0; changement(); return; }
    if (a === 'replacerTout'){ instantane(); var I = idx(); S.doc.el.forEach(function(x){ if (x.k !== 'tx' && !(x.lab && x.lab.off)) x.lab = null; }); S.doc.el.forEach(function(x){ if (x.k !== 'tx' && x.lab === null && texteEtiquette(x, S.an)) x.lab = placerEtiquette(S.doc, S.an, x, E(), I); }); changement(); toast('Étiquettes replacées'); return; }
    if (a === 'docEchelle'){ instantane(); S.doc.echelle = parseInt(b.dataset.v, 10) || 0; changement(); return; }
    if (a === 'docGest'){ instantane(); S.doc.gest = Object.assign({EU: 'D', EP: 'D', UN: 'D'}, S.doc.gest); S.doc.gest[b.dataset.k] = b.dataset.v; changement(); return; }
    if (a === 'docSuppr'){ demander('Supprimer ce croquis ?', '', function(){ if (opts.supprimer) opts.supprimer(S.doc); }, {confirmer: true, danger: true, ok: 'Supprimer', texte: 'Le croquis sera effacé de cet appareil. Le fond de plan est conservé.'}); return; }
    if (a === 'pdfEdl' || a === 'pdfAvp' || a === 'dxf' || a === 'json'){ sortie(a); return; }
    if (a === 'resultat'){ var w = {x: parseFloat(b.dataset.x), y: parseFloat(b.dataset.y)}; S.vue.cx = w.x; S.vue.cy = w.y; if (S.vue.s < 30) S.vue.s = 45; redessiner(); enregistrerVue(); return; }
  });
  function apresProp(e){
    if (e.p.st === '') e.p.st = 'existant';
    if (!e.lab && texteEtiquette(e, S.an)){ analyse(); e.lab = placerEtiquette(S.doc, S.an, e, E(), idx()); }
    changement();
  }
  pcorps.addEventListener('change', function(ev){
    var b = ev.target.closest('[data-a]'); if (!b) return;
    var a = b.dataset.a, e = S.sel && el(S.sel.id), v = b.value;
    if (a === 'propTxt' && e){
      var k = b.dataset.k; if (k === 'prof' || k === 'long' || k === 'diam'){ v = String(v).trim(); if (v && num(v) == null){ toast('Nombre attendu, par exemple 0,80'); b.value = e.p[k] || ''; return; } }
      if ((e.p[k] || '') === v) return; instantane(); e.p[k] = v; apresProp(e); return;
    }
    if (a === 'texteLibre' && e){ if (!String(v).trim()){ toast('Le texte est vide'); b.value = e.txt; return; } instantane(); e.txt = String(v).trim(); changement(); return; }
    if (a === 'type' && e){ instantane(); var ancien = e.p; e.t = v; e.p = Object.assign(defautsPt(v), {meth: ancien.meth || [], niv: ancien.niv || '', obs: ancien.obs || '', st: ancien.st || 'existant', etiq: ancien.etiq || ''}); if (e.lab && !e.lab.off) e.lab = placerEtiquette(S.doc, S.an, e, E(), idx()); changement(); return; }
    if (a === 'decTxt'){ instantane(); var cle = b.dataset.cle, m = (S.doc.anomManu || []).filter(function(x){ return x.id === cle; })[0]; if (m) m[b.dataset.k] = v; else (S.doc.decisions[cle] = S.doc.decisions[cle] || {})[b.dataset.k] = v; changement({garderPanneau: true}); return; }
    if (a === 'docTxt'){ instantane(); S.doc[b.dataset.k] = String(v).trim(); changement({garderPanneau: true}); majBarre(); return; }
    if (a === 'calque' && S.fond){ S.fond.calques[+b.dataset.k].vis = b.checked; if (opts.fondModifie) opts.fondModifie(S.fond); redessiner(); return; }
    if ((a === 'fondFichier' || a === 'reseauFichier') && b.files && b.files[0]){ chargerFichier(b.files[0], a === 'fondFichier' ? 'cadastre' : 'reseau'); b.value = ''; return; }
  });
  pcorps.addEventListener('input', function(ev){
    var b = ev.target.closest('[data-a="chercher"]'); if (!b || !S.fond) return;
    var q = norm(b.value).trim(), out = pcorps.querySelector('.vc-res'), off = offFond(S.fond); if (!out) return;
    if (!q){ out.innerHTML = ''; return; }
    var res = S.fond.T.filter(function(t){ var n = norm(t.t).replace(/\s+/g, ' '); return /^\d+$/.test(q) ? n.split(/[^a-z0-9]+/).indexOf(q) >= 0 : n.indexOf(q) >= 0; }).slice(0, 12);
    out.innerHTML = res.length ? res.map(function(t){ var st = S.fond.calques[t.c].style; return '<button type="button" class="vc-chip" data-a="resultat" data-x="' + (t.x + off.x) + '" data-y="' + (t.y + off.y) + '">' + esc(t.t) + ' <small>' + (st === 'parcelletex' ? 'parcelle' : st === 'numvoie' ? 'n° de voirie' : st === 'voie' ? 'voie' : 'texte') + '</small></button>'; }).join('') : '<p class="vc-muet">Aucun texte trouvé.</p>';
  });
  function chargerFichier(f, type){
    if (!opts.chargerFond){ toast('Chargement indisponible'); return; }
    toast('Lecture de « ' + f.name + ' »…', 8000);
    Promise.resolve(opts.chargerFond(f, type)).then(function(fo){
      if (!fo) return;
      if (type === 'reseau'){ S.reseau = fo; S.doc.reseauId = fo.id; }
      else { S.fond = fo; S.doc.fondId = fo.id; }
      caler(fo);
      changement(); if (type !== 'reseau' && !S.doc.el.length) ajusterVue();
      var ign = Object.keys(fo.stats.ignores || {}).filter(function(k){ return !/^(POINT|VIEWPORT|ATTDEF|SEQEND)$/.test(k); });
      toast((type === 'reseau' ? 'Réseaux chargés : ' : 'Fond chargé : ') + fo.stats.lignes + ' traits, ' + fo.stats.textes + ' textes' + (ign.length ? ' (non affiché : ' + ign.join(', ') + ')' : ''), 5000);
    }).catch(function(err){ toast('DXF illisible : ' + (err && err.message ? err.message : err), 7000); });
  }
  /* Calage : un croquis sans origine prend celle du fond ; s'il contient déjà des objets, il est posé au centre du fond */
  function caler(fo){
    var d = S.doc;
    if (d.origine && (d.origine.x || d.origine.y)) return;
    var b = emprisePlan(d);
    d.u = fo.u || 1;
    if (!b){ d.origine = {x: fo.origine.x, y: fo.origine.y}; return; }
    var c = depuisPlan((b[0] + b[2]) / 2, (b[1] + b[3]) / 2, d.rot || 0), dd = fo.bboxDense, cx = (dd[0] + dd[2]) / 2, cy = (dd[1] + dd[3]) / 2;
    d.origine = {x: fo.origine.x + (cx - c.x) / d.u, y: fo.origine.y + (cy - c.y) / d.u};
    toast('Le croquis n\'était pas calé : il est posé au centre du plan.', 5000);
  }
  function telecharger(blob, nom){
    if (opts.telecharger) return opts.telecharger(blob, nom);
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nom; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  }
  function nomFichier(base, ext){ var d = S.doc; return (base + (d.numero ? ' ' + d.numero : '') + (d.commune ? ' - ' + d.commune : '')).replace(/[\\\/:*?"<>|]+/g, '-').slice(0, 100) + '.' + ext; }
  function sortie(a){
    enregistrer();
    try {
      if (a === 'json'){ telecharger(new Blob([JSON.stringify(exportJson(S.doc), null, 1)], {type: 'application/json'}), nomFichier('Croquis', 'json')); return; }
      if (a === 'dxf'){ var an = analyser(S.doc, 'edl'); telecharger(new Blob([ecrireDxf(S.doc, an, anomaliesDoc(S.doc, an))], {type: 'application/dxf'}), nomFichier('Croquis', 'dxf')); toast('DXF enregistré'); return; }
      if (!global.jspdf){ toast('La bibliothèque PDF n\'est pas chargée'); return; }
      var mode = a === 'pdfAvp' ? 'avp' : 'edl';
      Promise.resolve(pdfPlan(S.doc, S.fond, {mode: mode, logo: opts.logo, reseau: S.reseau})).then(function(blob){ telecharger(blob, nomFichier(mode === 'avp' ? 'Avant-projet' : 'Etat des lieux', 'pdf')); toast('PDF enregistré'); }).catch(function(err){ toast('PDF impossible : ' + (err && err.message || err), 6000); });
    } catch(err){ toast('Sortie impossible : ' + (err && err.message || err), 6000); }
  }

  /* --- ouverture --- */
  function ouvrir(doc, fond, reseau){
    S.doc = doc; S.fond = fond || null; S.reseau = reseau || null; S.undo = []; S.redo = []; S.sel = null; S.brouillon = null; S.panneau = null; S.mode = 'edl'; S.ajoutAnom = null; S.aligner = null;
    clearTimeout(tToast); R.querySelector('.vc-toast').classList.remove('on');
    doc.el = doc.el || []; doc.decisions = doc.decisions || {}; doc.ordre = doc.ordre || []; doc.anomManu = doc.anomManu || []; doc.gest = doc.gest || {EU: 'D', EP: 'D', UN: 'D'};
    S.vue.rot = doc.rot || 0;
    analyse(); redim();
    if (doc.vue && isFinite(doc.vue.s)){ S.vue.cx = doc.vue.cx; S.vue.cy = doc.vue.cy; S.vue.s = doc.vue.s; } else ajusterVue();
    choisirOutil({k: 'main'}); majBarre(); majPanneau(); redessiner();
  }
  return {ouvrir: ouvrir, etat: S, redessiner: redessiner, redim: redim, doc: function(){ return S.doc; }, choisirOutil: choisirOutil, toast: toast, enregistrer: enregistrer,
    tap: tap, terminerTrace: terminerTrace, selectionner: selectionner, ouvrirPanneau: ouvrirPanneau, annuler: annuler, refaire: refaire, ajusterVue: ajusterVue, sortie: sortie};
}
VC.editeur = editeur;
function exportJson(doc){ var d = copie(doc); d.exporte = nowISO(); d.app = 'VÉDÉ Terrain, labo du croquis ' + VC.version; return d; }
VC.exportJson = exportJson;

/* ---------- Style de l'éditeur (jetons de l'application, valeurs de repli) ---------- */
var CSS = [
'.vc{position:relative;width:100%;height:100%;overflow:hidden;background:#fbfbf8;font-family:Barlow,"Segoe UI",Roboto,Arial,sans-serif;color:var(--ink,#12202A);touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;outline:none}',
'.vc *{box-sizing:border-box}',
'.vc-cv{position:absolute;inset:0;display:block;touch-action:none}',
'.vc-barre{position:absolute;left:0;right:0;top:0;height:58px;display:flex;align-items:center;gap:2px;padding:6px 8px;background:var(--surface,#fff);border-bottom:1px solid var(--line,#C7D1D8);z-index:6}',
'.vc-titre{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.15;padding:0 6px}',
'.vc-titre strong{font-size:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.vc-titre span{font-size:13px;color:var(--muted,#5C6C78);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.vc-b{position:relative;min-width:44px;min-height:44px;border:0;background:transparent;color:inherit;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;gap:6px;font:inherit;font-weight:600;font-size:15px;cursor:pointer;padding:0 8px;text-decoration:none}',
'.vc-b:hover{background:var(--surface-2,#F3F6F8)}',
'.vc-b[aria-pressed="true"]{background:var(--brand-soft,#D9ECEB);color:var(--brand,#0F5C63)}',
'.vc-b:disabled{opacity:.35;cursor:default}',
'.vc-b:focus-visible,.vc-o:focus-visible,.vc-chip:focus-visible,.vc-pitem:focus-visible{outline:3px solid var(--brand,#0F5C63);outline-offset:1px}',
'.vc-badge{white-space:nowrap;font-style:normal;background:#D4650A;color:#fff;border-radius:999px;font-size:12px;line-height:18px;padding:0 7px;min-width:20px;text-align:center}',
'.vc-sep{width:1px;height:28px;background:var(--line,#C7D1D8);margin:0 4px}',
'.vc-outils{position:absolute;left:0;top:58px;bottom:0;width:78px;display:flex;flex-direction:column;gap:3px;padding:6px;background:var(--surface,#fff);border-right:1px solid var(--line,#C7D1D8);z-index:5;overflow-y:auto}',
'.vc-o{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:58px;border:0;border-radius:12px;background:transparent;color:inherit;font:inherit;font-size:12.5px;font-weight:600;cursor:pointer;padding:4px 2px;flex:none}',
'.vc-o:hover{background:var(--surface-2,#F3F6F8)}',
'.vc-o[aria-pressed="true"],.vc-o.ouvert{background:var(--brand,#0F5C63);color:var(--on-brand,#fff)}',
'.vc-palette{position:absolute;left:84px;top:64px;max-height:calc(100% - 78px);overflow:auto;width:min(440px,calc(100% - 100px));background:var(--surface,#fff);border:1px solid var(--line,#C7D1D8);border-radius:14px;box-shadow:var(--shadow,0 18px 50px -22px rgba(9,18,24,.55));padding:10px;z-index:7;touch-action:pan-y}',
'.vc-palette[hidden],.vc-panneau[hidden],.vc-aide[hidden]{display:none}',
'.vc-palette h3{margin:2px 4px 8px;font-size:15px}',
'.vc-pgrille{display:grid;grid-template-columns:repeat(auto-fill,minmax(124px,1fr));gap:6px}',
'.vc-pitem{display:flex;align-items:center;gap:8px;min-height:56px;padding:6px 8px;border:1px solid var(--line-2,#DEE5EA);border-radius:10px;background:var(--surface,#fff);color:inherit;font:inherit;font-size:14px;font-weight:600;text-align:left;cursor:pointer;line-height:1.15}',
'.vc-pitem small{display:block;font-weight:500;color:var(--muted,#5C6C78);font-size:12px}',
'.vc-pitem[aria-pressed="true"]{border-color:var(--brand,#0F5C63);background:var(--brand-soft,#D9ECEB)}',
'.vc-pitem svg,.vc-ptx{flex:none;background:#fff;border-radius:8px;color:#222;display:inline-flex}',
'.vc-nav{position:absolute;right:10px;bottom:12px;display:flex;flex-direction:column;gap:6px;z-index:4}',
'.vc-nav .vc-b{background:var(--surface,#fff);border:1px solid var(--line,#C7D1D8);box-shadow:0 2px 8px rgba(0,0,0,.12)}',
'.vc-nord svg{transition:transform .2s}',
'.vc-aide{position:absolute;left:90px;right:72px;bottom:12px;display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 12px;background:var(--surface,#fff);border:1px solid var(--line,#C7D1D8);border-radius:12px;box-shadow:0 6px 18px -10px rgba(0,0,0,.35);z-index:4;font-size:15px;line-height:1.3}',
'.vc-aide>span{flex:1 1 220px}',
'.vc-bt{border:1px solid var(--line,#C7D1D8);background:var(--surface,#fff);padding:0 12px}',
'.vc-prim{background:var(--brand,#0F5C63);color:var(--on-brand,#fff);border-color:var(--brand,#0F5C63)}',
'.vc-prim:hover{background:var(--brand,#0F5C63);filter:brightness(1.1)}',
'.vc-danger{color:var(--danger,#B42318)}',
'.vc-prim.vc-danger{background:var(--danger,#B42318);border-color:var(--danger,#B42318);color:#fff}',
'.vc-panneau{position:absolute;right:0;top:58px;bottom:0;width:min(410px,100%);background:var(--surface,#fff);border-left:1px solid var(--line,#C7D1D8);z-index:6;display:flex;flex-direction:column;box-shadow:-10px 0 28px -18px rgba(0,0,0,.45)}',
'.vc-ptete{display:flex;align-items:center;padding:4px 4px 4px 14px;border-bottom:1px solid var(--line-2,#DEE5EA)}',
'.vc-ptete h2{flex:1;margin:0;font-size:18px}',
'.vc-pcorps{flex:1;overflow-y:auto;padding:10px 14px 28px;-webkit-user-select:text;user-select:text;touch-action:pan-y;font-size:15px}',
'.vc-pcorps h4{margin:16px 0 6px;font-size:15px}',
'.vc-pcorps p{margin:6px 0;line-height:1.35}',
'.vc-muet{color:var(--muted,#5C6C78);font-size:14px}',
'.vc-ftete{display:flex;gap:10px;align-items:center;margin:2px 0 10px}',
'.vc-ftete>svg{flex:none;background:#fff;border-radius:10px;border:1px solid var(--line-2,#DEE5EA)}',
'.vc-ftete strong{display:block;font-size:17px}',
'.vc-etat{display:block;font-size:13.5px;line-height:1.3;margin-top:2px}',
'.vc-etat.ok{color:var(--ok,#21704A)}.vc-etat.ko{color:var(--danger,#B42318);font-weight:600}.vc-etat.att{color:var(--warn,#8A5300)}',
'.vc-champ{margin:10px 0}',
'.vc-lab{font-weight:600;font-size:14px;margin-bottom:5px}',
'.vc-lab small{font-weight:500;color:var(--muted,#5C6C78)}',
'.vc-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center}',
'.vc-chip{min-height:40px;padding:0 12px;border:1px solid var(--line,#C7D1D8);border-radius:999px;background:var(--surface,#fff);color:inherit;font:inherit;font-size:14.5px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px}',
'.vc-chip small{font-weight:500;color:var(--muted,#5C6C78)}',
'.vc-chip[aria-pressed="true"]{background:var(--brand,#0F5C63);border-color:var(--brand,#0F5C63);color:var(--on-brand,#fff)}',
'.vc-val{min-width:54px;text-align:center;font-weight:600}',
'.vc-in{width:100%;min-height:42px;margin-top:6px;padding:8px 10px;border:1px solid var(--line,#C7D1D8);border-radius:10px;background:var(--surface,#fff);color:inherit;font:inherit;font-size:15px}',
'textarea.vc-in{resize:vertical}',
'.vc-sommet{margin:12px 0;padding:10px;border-radius:12px;background:var(--surface-2,#F3F6F8)}',
'.vc-fact{display:flex;gap:8px;margin-top:18px;padding-top:12px;border-top:1px solid var(--line-2,#DEE5EA)}',
'.vc-anom{display:flex;gap:8px;padding:8px;margin:6px 0;border-radius:12px;border:1px solid var(--line-2,#DEE5EA);background:var(--surface,#fff)}',
'.vc-anom.ec{opacity:.6}.vc-anom.arb{border-style:dashed}',
'.vc-anum b{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;border:2px solid #D4650A;color:#D4650A;font-size:15px}',
'.vc-anum b.vide{border-color:var(--line,#C7D1D8);color:var(--muted,#5C6C78)}',
'.vc-acorps{flex:1;min-width:0}',
'.vc-acorps .vc-in{margin:0 0 6px;min-height:38px;font-weight:600;resize:vertical}',
'.vc-acorps .vc-chips+.vc-chips{margin-top:6px}',
'.vc-acorps .vc-preco{font-weight:400}',
'.vc-auto{display:block;color:var(--muted,#5C6C78);font-size:12px;margin-top:4px}',
'.vc-ajout{padding:8px;border-radius:12px;background:var(--surface-2,#F3F6F8);margin:6px 0}',
'.vc-concl{padding:10px 12px;border-radius:12px;background:var(--surface-2,#F3F6F8);margin:10px 0}',
'.vc-concl.ko{background:#fdecea;color:#8c1d13}.vc-concl.ok{background:var(--ok-soft,#DBF0E4)}',
'.vc-ctl{list-style:none;margin:0;padding:0}',
'.vc-ctl button{display:block;width:100%;text-align:left;min-height:42px;margin:4px 0;padding:8px 10px;border:1px solid var(--warn-line,#EBC27A);background:var(--warn-soft,#FFF0D1);color:inherit;border-radius:10px;font:inherit;font-size:14.5px;cursor:pointer}',
'.vc-ctl.info button{border-color:var(--line-2,#DEE5EA);background:var(--surface-2,#F3F6F8)}',
'.vc-tab{width:100%;border-collapse:collapse;font-size:14px;margin:8px 0}',
'.vc-tab th,.vc-tab td{border-bottom:1px solid var(--line-2,#DEE5EA);padding:6px 4px;text-align:left;vertical-align:top}',
'.vc-tab tr.vide td{color:var(--muted,#5C6C78)}',
'.vc-tab .ko{color:var(--danger,#B42318)}',
'.vc-g{display:inline-block;min-width:26px;padding:0 4px;border-radius:6px;font-size:11.5px;font-weight:700;text-align:center;color:#fff}',
'.vc-g.EU{background:#c20000}.vc-g.EP{background:#00813b}.vc-g.UN{background:#9c0a7c}',
'.vc-ligne{display:flex;gap:8px;align-items:center;margin:4px 0}',
'.vc-cal{display:flex;flex-direction:column;gap:2px;max-height:260px;overflow:auto;margin-top:6px}',
'.vc-cal label{display:flex;gap:8px;align-items:center;min-height:34px;font-size:14px}',
'.vc-cal small{color:var(--muted,#5C6C78)}',
'.vc-res{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}',
'.vc-fichier{margin:8px 0;cursor:pointer}',
'.vc-sorties{display:flex;flex-direction:column;gap:8px;margin-top:10px}',
'.vc-grand{justify-content:flex-start;min-height:62px;text-align:left;padding:8px 12px}',
'.vc-grand span{display:flex;flex-direction:column}',
'.vc-grand small{font-weight:500;color:var(--muted,#5C6C78);font-size:13px}',
'.vc-mode{margin:2px 0 6px}',
'.vc-toast{position:absolute;left:50%;top:70px;transform:translate(-50%,-12px);max-width:min(560px,calc(100% - 24px));padding:10px 16px;border-radius:12px;background:#1f2a31;color:#fff;font-size:15px;font-weight:600;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:9;text-align:center}',
'.vc-toast.on{opacity:1;transform:translate(-50%,0)}',
'.vc-modal{position:absolute;inset:0;background:var(--scrim,rgba(9,18,24,.5));display:flex;align-items:center;justify-content:center;z-index:10;padding:16px;-webkit-user-select:text;user-select:text;touch-action:auto}',
'.vc-mboite{width:min(460px,100%);background:var(--surface,#fff);border-radius:16px;padding:16px;box-shadow:var(--shadow,0 18px 50px -22px rgba(9,18,24,.55))}',
'.vc-mboite h3{margin:0 0 8px;font-size:18px}',
'.vc-mboite input,.vc-mboite textarea{width:100%;min-height:44px;padding:8px 10px;border:1px solid var(--line,#C7D1D8);border-radius:10px;font:inherit;font-size:16px;background:var(--surface,#fff);color:inherit}',
'.vc-mact{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}',
'.vc-avecpanneau .vc-nav{right:420px}',
'.vc-avecpanneau .vc-aide{right:420px}',
'@media (max-width:760px),(orientation:portrait){',
'  .vc-outils{top:auto;left:0;right:0;bottom:0;width:auto;height:70px;flex-direction:row;border-right:0;border-top:1px solid var(--line,#C7D1D8);overflow-x:auto;overflow-y:hidden}',
'  .vc-o{min-width:64px;min-height:56px}',
'  .vc-palette{left:8px;right:8px;width:auto;top:auto;bottom:78px;max-height:52%}',
'  .vc-nav{bottom:82px;flex-direction:column}',
'  .vc-aide{left:8px;right:64px;bottom:80px}',
'  .vc-panneau{top:auto;left:0;right:0;width:auto;height:min(56%,540px);bottom:0;border-left:0;border-top:1px solid var(--line,#C7D1D8);border-radius:16px 16px 0 0;box-shadow:0 -10px 28px -18px rgba(0,0,0,.45)}',
'  .vc-avecpanneau .vc-nav{right:10px;bottom:calc(min(56%,540px) + 10px)}',
'  .vc-avecpanneau .vc-aide{right:64px;bottom:calc(min(56%,540px) + 10px)}',
'  .vc-bl span{display:none}',
'  .vc-sep{display:none}',
'}',
'@media (max-width:420px){.vc-barre .vc-b{min-width:40px;padding:0 4px}.vc-titre strong{font-size:15px}}'
].join('\n');
function injecterStyle(){
  if (typeof document === 'undefined' || document.getElementById('vc-style')) return;
  var s = document.createElement('style'); s.id = 'vc-style'; s.textContent = CSS; document.head.appendChild(s);
}
VC.injecterStyle = injecterStyle;

/* ---------- PDF : plan A4 paysage (cadre, fond, croquis, nord, échelle, cartouche, légende) et page des tableaux ---------- */
var PDF_TRANS = {'≈': '~', '→': '->', '←': '<-', '↔': '<->', ' ': ' ', ' ': ' ', '−': '-', '‐': '-', '‑': '-', '×': 'x'};
function pdfTxt(s){
  return String(s == null ? '' : s).normalize('NFC').replace(/[≈→←↔  −‐‑]/g, function(c){ return PDF_TRANS[c]; })
    .replace(/[^\n -~ -ÿŒœŠšŸŽž–—‘’“”•…€]/g, function(c){
      var b = c.normalize('NFD').replace(/[̀-ͯ]/g, ''); return /^[ -~ -ÿ]+$/.test(b) ? b : '';
    });
}
VC.pdfTxt = pdfTxt;
function polyPdf(pdf, pts, style, ferme){ if (pts.length < 2) return; var d = []; for (var i = 1; i < pts.length; i++) d.push([pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y]); pdf.lines(d, pts[0].x, pts[0].y, [1, 1], style || 'S', !!ferme); }
function primsPdf(pdf, P, cx, cy, k){
  P.forEach(function(q){
    var st = q.fond && q.trait ? 'FD' : q.fond ? 'F' : 'S';
    if (q.trait){ pdf.setDrawColor(q.trait[0], q.trait[1], q.trait[2]); pdf.setLineWidth(Math.max(.08, (q.ep || .25) * k)); }
    if (q.fond) pdf.setFillColor(q.fond[0], q.fond[1], q.fond[2]);
    if (q.k === 'c') pdf.circle(cx + q.x * k, cy - q.y * k, q.r * k, st);
    else if (q.k === 'p'){ var pts = []; for (var i = 0; i < q.pts.length; i += 2) pts.push({x: cx + q.pts[i] * k, y: cy - q.pts[i + 1] * k}); polyPdf(pdf, pts, st, q.f); }
    else if (q.k === 't' && q.s){ pdf.setFont('helvetica', 'bold'); pdf.setFontSize(q.h * k / .3528); var c = q.coul || [0, 0, 0]; pdf.setTextColor(c[0], c[1], c[2]); var s = pdfTxt(q.s), w = pdf.getTextWidth(s); pdf.text(s, cx + q.x * k - w / 2, cy - q.y * k + q.h * k * .36); }
  });
}
/* Texte centré sur (cx, cy), angle en degrés (sens trigonométrique), halo blanc facultatif */
function textePdf(pdf, s, cx, cy, em, ang, o){
  o = o || {}; s = pdfTxt(s); if (!s) return;
  pdf.setFont('helvetica', o.gras ? 'bold' : o.italique ? 'italic' : 'normal'); pdf.setFontSize(em / .3528);
  var L = s.split('\n'), lh = em * 1.18, a = (ang || 0) * Math.PI / 180, ux = Math.cos(a), uy = -Math.sin(a), nx = -Math.sin(a), ny = -Math.cos(a);
  L.forEach(function(l, i){
    var w = pdf.getTextWidth(l), off = ((L.length - 1) / 2 - i) * lh, bx = cx + nx * off, by = cy + ny * off;
    var x = bx - ux * w / 2 - nx * em * .36, y = by - uy * w / 2 - ny * em * .36;
    if (o.halo){ pdf.setDrawColor(255, 255, 255); pdf.setLineWidth(em * .28); pdf.text(l, x, y, {angle: ang || 0, renderingMode: 'stroke'}); }
    var c = o.coul || [0, 0, 0]; pdf.setTextColor(c[0], c[1], c[2]);
    pdf.text(l, x, y, {angle: ang || 0});
  });
}
function lisible(deg){ while (deg > 180) deg -= 360; while (deg <= -180) deg += 360; if (deg > 90.5) deg -= 180; else if (deg < -90.5) deg += 180; return deg; }
function couleurTexte(e, an){
  if (e.k === 'ln') return resLigne(e, an);
  var ty = T[e.t] || {};
  if (e.p && e.p.st === 'projet') return 'PRJ';
  if (ty.role === 'source') return ty.nat; if (ty.role === 'note') return 'ANN'; if (ty.exu) return 'EP';
  return (an && an.resPt[e.id]) || 'INC';
}
function hexRgb(h){ h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
function pdfPlan(doc, fond, o){
  o = o || {};
  var mode = o.mode || 'edl', J = global.jspdf.jsPDF, pdf = new J({orientation: 'landscape', unit: 'mm', format: 'a4', compress: true});
  var an = analyser(doc, mode), liste = anomaliesDoc(doc, an), idx = indexDoc(doc), rot = doc.rot || 0, rotDeg = rot * 180 / Math.PI;
  var Ech = doc.echelle > 0 ? doc.echelle : echelleAuto(doc, mode), m = Ech / 1000;
  var F = {x: 7, y: 7, w: CADRE.w, h: CADRE.h}, RC = [F.x, F.y, F.x + F.w, F.y + F.h];
  var b = emprisePlan(doc, idx, mode) || [-10, -10, 10, 10], cP = {x: (b[0] + b[2]) / 2, y: (b[1] + b[3]) / 2};
  function papier(x, y){ var p = versPlan(x, y, rot); return {x: F.x + F.w / 2 + (p.x - cP.x) / m, y: F.y + F.h / 2 - (p.y - cP.y) / m}; }
  var titre = mode === 'avp' ? 'Plan d\'avant-projet' : 'Plan de l\'état des lieux';
  pdf.setProperties({title: pdfTxt(titre + (doc.numero ? ' ' + doc.numero : '')), creator: 'VEDE Terrain, labo du croquis'});
  pdf.setLineCap('round'); pdf.setLineJoin('round');
  /* zone de dessin : tout ce qui suit est découpé au cadre */
  pdf.saveGraphicsState(); pdf.rect(F.x, F.y, F.w, F.h, null); pdf.clip(); pdf.discardPath();
  function dedans(P){ var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity; P.forEach(function(p){ if (p.x < x0) x0 = p.x; if (p.x > x1) x1 = p.x; if (p.y < y0) y0 = p.y; if (p.y > y1) y1 = p.y; }); return x1 >= RC[0] && x0 <= RC[2] && y1 >= RC[1] && y0 <= RC[3]; }
  if (fond && o.fond !== false) fondPdf(fond, {x: (fond.origine.x - doc.origine.x) * (fond.u || 1), y: (fond.origine.y - doc.origine.y) * (fond.u || 1)}, false);
  if (o.reseau) fondPdf(o.reseau, {x: (o.reseau.origine.x - doc.origine.x) * (o.reseau.u || 1), y: (o.reseau.origine.y - doc.origine.y) * (o.reseau.u || 1)}, true);
  function fondPdf(f, off, reseau){
    for (var i = 0; i < f.L.length; i++){
      var l = f.L[i], cal = f.calques[l.c]; if (!cal.vis) continue;
      var P = []; for (var k = 0; k < l.n; k++) P.push(papier(f.xy[2 * (l.d + k)] + off.x, f.xy[2 * (l.d + k) + 1] + off.y));
      if (!dedans(P)) continue;
      var st = cal.style, plein = !reseau && l.f && (st === 'bati' || st === 'batileger');
      if (reseau){ var c = couleurEnt(l); pdf.setDrawColor(c[0], c[1], c[2]); pdf.setLineWidth(.25); }
      else { var g = st === 'bati' ? 125 : st === 'batileger' ? 150 : st === 'parcelle' ? 150 : 185; pdf.setDrawColor(g, g, g); pdf.setLineWidth(st === 'bati' ? .18 : .12); }
      if (plein){ var gf = st === 'bati' ? 236 : 244; pdf.setFillColor(gf, gf - 2, gf - 6); }
      polyPdf(pdf, P, plein ? 'FD' : 'S', !!l.f);
    }
    f.T.forEach(function(t){
      if (!f.calques[t.c].vis) return;
      var p = papier(t.x + off.x, t.y + off.y); if (p.x < RC[0] - 20 || p.x > RC[2] + 20 || p.y < RC[1] - 10 || p.y > RC[3] + 10) return;
      var em = Math.min(t.h / m / .72, 2.8); if (em < .9) return;
      var ang = (t.r - rot) * 180 / Math.PI, st = f.calques[t.c].style, gris = st === 'numvoie' ? 70 : st === 'voie' ? 60 : 130;
      /* centre du bloc à partir de l'ancrage et de l'alignement */
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(em / .3528);
      var w = pdf.getTextWidth(pdfTxt(String(t.t).split('\n')[0])) * (t.wf || 1), a = ang * Math.PI / 180, cx = t.ha === 1 ? 0 : t.ha === 2 ? -w / 2 : w / 2, cy = t.va === 3 ? -em * .36 : t.va === 2 ? 0 : em * .36;
      var px = p.x + cx * Math.cos(a) - cy * Math.sin(a), py = p.y - (cx * Math.sin(a) + cy * Math.cos(a));
      textePdf(pdf, t.t, px, py, em, lisible(ang), {coul: reseau ? couleurEnt(t) : [gris, gris, gris], italique: st === 'voie'});
    });
  }
  /* croquis */
  var parLigne = {}; an.pieces.forEach(function(p){ (parLigne[p.l.id] = parLigne[p.l.id] || []).push(p); });
  function montrer(e){ var st = e.p && e.p.st; if (mode === 'edl') return st !== 'projet'; return true; }
  doc.el.forEach(function(e){
    if (e.k !== 'pt' || e.t !== 'zone' || !montrer(e)) return;
    var c = papier(e.x, e.y), r = (num(e.p.r) || 1.5) / m; pdf.setDrawColor(212, 101, 10); pdf.setLineWidth(.25); pdf.setLineDashPattern([1.2, .9], 0); pdf.circle(c.x, c.y, r, 'S'); pdf.setLineDashPattern([], 0);
  });
  var ordreL = {lim: 0, col: 1, tr: 2};
  doc.el.filter(function(e){ return e.k === 'ln' && e.v.length >= 2 && montrer(e); }).sort(function(a, b2){ return ordreL[a.t] - ordreL[b2.t]; }).forEach(function(e){
    var W = lignePts(e, idx).map(function(p){ return papier(p.x, p.y); }), st = e.p.st || 'existant';
    var morceaux = (parLigne[e.id] || []).map(function(p){ return {pts: W.slice(p.i0, p.i1 + 1), res: an.resPiece[p.id].res, p: p}; });
    if (!morceaux.length || e.t !== 'tr') morceaux = [{pts: W, res: resLigne(e, an)}];
    var larg = e.t === 'col' ? .7 : e.t === 'lim' ? .25 : .45;
    morceaux.forEach(function(mc){
      if (mc.pts.length < 2) return;
      var res = st === 'projet' ? 'PRJ' : mc.res, c = (RES[res] || RES.INC).rgb;
      pdf.setDrawColor(c[0], c[1], c[2]); pdf.setLineWidth(larg);
      pdf.setLineDashPattern(st === 'projet' ? [3, 1.8] : st === 'presume' || res === 'INC' ? [1.6, 1.2] : [], 0);
      polyPdf(pdf, mc.pts, 'S', false); pdf.setLineDashPattern([], 0);
      if (st === 'supprimer' && mode === 'avp'){
        pdf.setLineWidth(.3); var reste = 1.5;
        for (var i = 1; i < mc.pts.length; i++){ var A = mc.pts[i - 1], B = mc.pts[i], L = Math.hypot(B.x - A.x, B.y - A.y); if (!L) continue; var ux = (B.x - A.x) / L, uy = (B.y - A.y) / L, d = reste; while (d <= L){ var x = A.x + ux * d, y = A.y + uy * d; pdf.line(x - (uy - ux * .6) * 1.1, y + (ux + uy * .6) * 1.1, x + (uy - ux * .6) * 1.1, y - (ux + uy * .6) * 1.1); d += 3; } reste = d - L; }
      }
      if (mc.p && an.sensPiece[mc.p.id]){
        var mi = milieuChemin(mc.pts), sg = an.sensPiece[mc.p.id];
        if (mi && mi.L > 6){ var ux2 = mi.ux * sg, uy2 = mi.uy * sg, s = 1.3; pdf.setFillColor(c[0], c[1], c[2]); pdf.triangle(mi.x + ux2 * s, mi.y + uy2 * s, mi.x - ux2 * s - uy2 * s * .7, mi.y - uy2 * s + ux2 * s * .7, mi.x - ux2 * s + uy2 * s * .7, mi.y - uy2 * s - ux2 * s * .7, 'F'); }
      }
    });
  });
  doc.el.forEach(function(e){
    if (e.k !== 'pt' || e.t === 'zone' || !montrer(e)) return;
    var c = papier(e.x, e.y), rgb = couleurPt(e, an);
    primsPdf(pdf, primitives(e, rgb, ((e.p.a || 0) * Math.PI / 180) - rot), c.x, c.y, 1);
    if (mode === 'avp' && e.p.st === 'supprimer'){ var R = rayonSymbole(e.t); pdf.setDrawColor(rgb[0], rgb[1], rgb[2]); pdf.setLineWidth(.3); pdf.line(c.x - R, c.y - R, c.x + R, c.y + R); pdf.line(c.x - R, c.y + R, c.x + R, c.y - R); }
  });
  /* étiquettes et textes libres, horizontaux sur le papier */
  doc.el.forEach(function(e){
    if (!montrer(e) && e.k !== 'tx') return;
    var libre = e.k === 'tx', txt = libre ? e.txt : texteEtiquette(e, an);
    if (!txt || (!libre && e.lab && e.lab.off)) return;
    var a = ancre(e, idx), A = papier(a.x, a.y), lab = libre ? {dx: 0, dy: 0} : (e.lab || placerEtiquette(doc, an, e, Ech, idx) || {dx: 0, dy: 0});
    var cx = A.x + lab.dx / m, cy = A.y - lab.dy / m, em = libre ? (num(e.taille) || 2.5) : TAILLE_ETIQ, col = libre ? [25, 25, 25] : hexRgb(TXT_RES[couleurTexte(e, an)] || TXT_RES.INC);
    if (!libre && e.k === 'pt'){
      var bt = boiteTexte(txt, em), bx = [cx - bt.w / 2, cy - bt.h / 2, cx + bt.w / 2, cy + bt.h / 2], R = rayonSymbole(e.t), dd = Math.hypot(cx - A.x, cy - A.y), bord = boiteBord(bx, A.x, A.y, cx, cy);
      if (bord && dd > R + 3 && Math.hypot(bord.x - A.x, bord.y - A.y) > R + .8){ pdf.setDrawColor(col[0], col[1], col[2]); pdf.setLineWidth(.15); pdf.line(A.x + (cx - A.x) / dd * R, A.y + (cy - A.y) / dd * R, bord.x, bord.y); }
    }
    textePdf(pdf, txt, cx, cy, em, 0, {coul: col, halo: true, gras: !libre});
  });
  /* bulles : sur l'avant-projet, celles de l'état des lieux (une préconisation par anomalie) */
  var listeB = mode === 'avp' ? anomaliesDoc(doc, an.ref) : liste, posB = placerBulles(doc, an, listeB, Ech, idx);
  listeB.forEach(function(an2){
    if (!an2.num || !an2.objId || !idx[an2.objId]) return;
    var ob = idx[an2.objId]; if (!montrer(ob)) return;
    var A = papier(ob.x, ob.y), d = posB[an2.cle] || bulleDefaut(ob, Ech), cx = A.x + d.dx / m, cy = A.y - d.dy / m, r = TAILLE_BULLE, R = ob.k === 'pt' ? rayonSymbole(ob.t) : 1, dd = Math.hypot(cx - A.x, cy - A.y);
    pdf.setDrawColor(212, 101, 10); pdf.setLineWidth(.25);
    if (dd > R + r + .3) pdf.line(A.x + (cx - A.x) / dd * R, A.y + (cy - A.y) / dd * R, cx - (cx - A.x) / dd * r, cy - (cy - A.y) / dd * r);
    pdf.setFillColor(255, 255, 255); pdf.circle(cx, cy, r, 'FD');
    textePdf(pdf, String(an2.num), cx, cy, r * 1.05, 0, {coul: [212, 101, 10], gras: true});
  });
  pdf.restoreGraphicsState();
  /* cadre, nord, échelle, nota */
  pdf.setDrawColor(40, 40, 40); pdf.setLineWidth(.35); pdf.rect(F.x, F.y, F.w, F.h, 'S');
  var nx = F.x + F.w - 11, ny = F.y + 12, dn = versPlan(0, 1, rot), vx = dn.x, vy = -dn.y;
  pdf.setFillColor(255, 255, 255); pdf.setDrawColor(40, 40, 40); pdf.setLineWidth(.25); pdf.circle(nx, ny, 7, 'FD');
  pdf.setFillColor(30, 30, 30); pdf.triangle(nx + vx * 6, ny + vy * 6, nx - vx * 3.5 - vy * 2.8, ny - vy * 3.5 + vx * 2.8, nx - vx * 1.5, ny - vy * 1.5, 'F');
  pdf.setFillColor(255, 255, 255); pdf.triangle(nx + vx * 6, ny + vy * 6, nx - vx * 3.5 + vy * 2.8, ny - vy * 3.5 - vx * 2.8, nx - vx * 1.5, ny - vy * 1.5, 'FD');
  textePdf(pdf, 'N', nx + vx * 9.5, ny + vy * 9.5, 2.6, 0, {gras: true, coul: [30, 30, 30], halo: true});
  var pas = [1, 2, 5, 10, 20, 50, 100], Lm = 1; pas.forEach(function(v){ if (v / m <= 45) Lm = v; });
  var sx = F.x + 6, sy = F.y + F.h - 8, Lp = Lm / m;
  pdf.setFillColor(255, 255, 255); pdf.setDrawColor(255, 255, 255); pdf.rect(sx - 2, sy - 6, Lp + 34, 10, 'F');
  pdf.setDrawColor(30, 30, 30); pdf.setLineWidth(.2); pdf.setFillColor(30, 30, 30); pdf.rect(sx, sy, Lp / 2, 1.4, 'FD'); pdf.setFillColor(255, 255, 255); pdf.rect(sx + Lp / 2, sy, Lp / 2, 1.4, 'FD');
  textePdf(pdf, '0', sx, sy - 2, 2, 0, {coul: [30, 30, 30]}); textePdf(pdf, frNum(Lm) + ' m', sx + Lp, sy - 2, 2, 0, {coul: [30, 30, 30]});
  textePdf(pdf, 'Échelle 1/' + Ech, sx + Lp + 16, sy + .7, 2.3, 0, {gras: true, coul: [30, 30, 30]});
  textePdf(pdf, 'Schéma de principe : limites et positions non garanties', F.x + F.w - 50, F.y + F.h - 3.2, 1.9, 0, {italique: true, coul: [90, 90, 90], halo: true});
  /* colonne de droite : cartouche et légende */
  var X = F.x + F.w + 4, W = 297 - 7 - X, y = 7;
  pdf.setDrawColor(40, 40, 40); pdf.setLineWidth(.35); pdf.rect(X, F.y, W, F.h, 'S');
  if (o.logo && o.logo.data){ try { var lh = 13, lw = Math.min(W - 6, lh * (o.logo.ratio || 1)); pdf.addImage(o.logo.data, o.logo.format || 'PNG', X + (W - lw) / 2, y + 3, lw, lh); y += lh + 4; } catch(e){ y += 2; } } else y += 2;
  pdf.setTextColor(15, 92, 99); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8.5); pdf.text(pdfTxt('CONTRÔLE DE BRANCHEMENT'), X + 3, y + 4);
  pdf.setFontSize(12.5); pdf.setTextColor(20, 20, 20); pdf.text(pdfTxt(titre), X + 3, y + 10); y += 13;
  pdf.setDrawColor(200, 200, 200); pdf.setLineWidth(.2); pdf.line(X + 3, y, X + W - 3, y); y += 4;
  var infos = [['Dossier', doc.numero], ['Adresse', doc.adresse], ['Commune', doc.commune], ['Visite du', doc.date ? doc.date.split('-').reverse().join('/') : ''], ['Technicien', doc.technicien], ['Échelle', '1/' + Ech + ' (A4)'], ['Établi le', new Date().toLocaleDateString('fr-FR')]];
  infos.forEach(function(r){
    if (!r[1]) return;
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.5); pdf.setTextColor(110, 110, 110); pdf.text(pdfTxt(r[0]), X + 3, y);
    pdf.setFont('helvetica', 'bold'); pdf.setTextColor(20, 20, 20); var lines = pdf.splitTextToSize(pdfTxt(r[1]), W - 24); pdf.text(lines, X + 21, y); y += 3.6 * lines.length + .8;
  });
  y += 1; pdf.line(X + 3, y, X + W - 3, y); y += 5;
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.setTextColor(20, 20, 20); pdf.text('Légende', X + 3, y); y += 4;
  var leg = legende(doc, an, mode), hRow = clamp((F.y + F.h - 24 - y) / Math.max(1, leg.length), 3.6, 5.6);
  leg.forEach(function(it){
    var cy = y + hRow / 2 - .4;
    if (it.k === 'ln'){ var c = (RES[it.res] || RES.INC).rgb; pdf.setDrawColor(c[0], c[1], c[2]); pdf.setLineWidth(it.col ? .7 : .45); pdf.setLineDashPattern(it.st === 'projet' ? [3, 1.8] : it.st === 'presume' || (it.res === 'INC' && it.st !== 'supprimer') ? [1.6, 1.2] : [], 0); pdf.line(X + 3, cy, X + 11, cy); pdf.setLineDashPattern([], 0); if (it.st === 'supprimer'){ pdf.setLineWidth(.3); [5, 7.5, 10].forEach(function(dx){ pdf.line(X + dx - .8, cy + 1.1, X + dx + .4, cy - 1.1); }); } }
    else if (it.k === 'pt'){ primsPdf(pdf, primitives({k: 'pt', t: it.t, p: defautsPt(it.t)}, it.rgb, 0), X + 7, cy, Math.min(1, (hRow - .6) / (2 * rayonSymbole(it.t)))); }
    else if (it.k === 'bulle'){ pdf.setDrawColor(212, 101, 10); pdf.setFillColor(255, 255, 255); pdf.setLineWidth(.25); pdf.circle(X + 7, cy, 1.7, 'FD'); textePdf(pdf, '1', X + 7, cy, 1.8, 0, {gras: true, coul: [212, 101, 10]}); }
    else if (it.k === 'fleche'){ pdf.setFillColor(80, 80, 80); pdf.triangle(X + 9, cy, X + 6, cy - 1.2, X + 6, cy + 1.2, 'F'); }
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.2); pdf.setTextColor(30, 30, 30); pdf.text(pdfTxt(it.lib), X + 13, cy + 1);
    y += hRow;
  });
  var nota = 'Équipements déclarés par le propriétaire et accessibles visuellement. Chaque écoulement est établi par la méthode indiquée en page 2.';
  pdf.setFont('helvetica', 'italic'); pdf.setFontSize(6.6); pdf.setTextColor(90, 90, 90); var nl = pdf.splitTextToSize(pdfTxt(nota), W - 6); pdf.text(nl, X + 3, F.y + F.h - 4 - (nl.length - 1) * 2.8);
  pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(140, 140, 140); pdf.text(pdfTxt('Croquis de terrain, VÉDÉ Terrain (labo)'), 290, 205, {align: 'right'});
  /* page 2 */
  pdf.addPage('a4', 'landscape');
  pageTableaux(pdf, doc, an, liste, mode);
  var nb = pdf.getNumberOfPages();
  for (var pg = 1; pg <= nb; pg++){ pdf.setPage(pg); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(140, 140, 140); pdf.text('Page ' + pg + ' / ' + nb, 7, 205); }
  return pdf.output('blob');
}
function legende(doc, an, mode){
  var vus = {}, out = [], st = {};
  doc.el.forEach(function(e){
    if (mode === 'edl' && e.p && e.p.st === 'projet') return;
    if (e.k === 'ln'){
      if (e.t === 'col'){ var k = 'col' + e.p.res; if (!vus[k]){ vus[k] = 1; out.push({k: 'ln', res: e.p.res, col: true, lib: 'Collecteur ' + libRes(e.p.res), o: 0}); } return; }
      if (e.t === 'lim') { if (!vus.lim){ vus.lim = 1; out.push({k: 'ln', res: 'LIM', lib: 'Complément du fond', o: 9}); } return; }
      var r = e.p.st === 'projet' ? 'PRJ' : resLigne(e, an);
      if (e.p.st === 'presume') st.presume = 1; if (e.p.st === 'supprimer' && mode === 'avp') st.supprimer = 1;
      if (/^(EU|EP|UN|INC|MIX|PRJ)$/.test(r) && !vus['l' + r]){ vus['l' + r] = 1; out.push({k: 'ln', res: r, lib: r === 'PRJ' ? 'Canalisation projetée' : r === 'INC' ? 'Réseau non déterminé' : r === 'MIX' ? 'Plusieurs réseaux atteints' : 'Canalisation ' + libRes(r) + (r === 'UN' ? '' : ' (' + RES[r].nom + ')'), o: 1}); }
      return;
    }
    if (e.k === 'pt' && e.t !== 'jonction' && !vus[e.t]){ vus[e.t] = 1; out.push({k: 'pt', t: e.t, rgb: couleurPt(Object.assign({}, e, {p: Object.assign({}, e.p, {st: 'existant'})}), an), lib: T[e.t].lib + (T[e.t].ab && T[e.t].ab !== T[e.t].lib ? ' (' + T[e.t].ab + ')' : ''), o: 3}); }
  });
  if (st.presume) out.push({k: 'ln', res: 'INC', st: 'presume', lib: 'Tracé présumé (tirets)', o: 2});
  if (st.supprimer) out.push({k: 'ln', res: 'INC', st: 'supprimer', lib: 'Tracé barré : à supprimer', o: 2});
  if (an.pieces.some(function(p){ return an.sensPiece[p.id]; })) out.push({k: 'fleche', lib: 'Sens d\'écoulement', o: 4});
  if (anomaliesDoc(doc, an).some(function(a){ return a.num; })) out.push({k: 'bulle', lib: mode === 'avp' ? 'Préconisation, voir la page 2' : 'Anomalie, voir la page 2', o: 5});
  out.sort(function(a, b){ return a.o - b.o; });
  return out;
}
/* Tableau à lignes de hauteur variable, avec saut de page */
function tableauPdf(pdf, y, cols, lignes, titre){
  var X0 = 10, lh = 3.5, fs = 8;
  function entete(){
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(fs); pdf.setFillColor(232, 238, 240); pdf.setDrawColor(200, 205, 210); pdf.setLineWidth(.2);
    var x = X0; pdf.rect(X0, y, cols.reduce(function(s, c){ return s + c.w; }, 0), 6, 'F');
    cols.forEach(function(c){ pdf.setTextColor(30, 30, 30); pdf.text(pdfTxt(c.t), x + 1.5, y + 4.1); x += c.w; }); y += 6;
  }
  if (titre){ pdf.setFont('helvetica', 'bold'); pdf.setFontSize(11); pdf.setTextColor(15, 92, 99); pdf.text(pdfTxt(titre), X0, y + 4); y += 7; }
  entete();
  lignes.forEach(function(r){
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(fs);
    var cell = cols.map(function(c, i){ return pdf.splitTextToSize(pdfTxt(r.cells[i] == null ? '' : r.cells[i]), c.w - 3); });
    var h = Math.max.apply(null, cell.map(function(c){ return c.length; })) * lh + 2.2;
    if (y + h > 198){ pdf.addPage('a4', 'landscape'); y = 12; entete(); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(fs); }
    var x = X0;
    cols.forEach(function(c, i){
      var col = (r.coul && r.coul[i]) || [30, 30, 30]; pdf.setTextColor(col[0], col[1], col[2]); pdf.setFont('helvetica', r.gras && r.gras[i] ? 'bold' : 'normal');
      pdf.text(cell[i], x + 1.5, y + 3.6); x += c.w;
    });
    y += h; pdf.setDrawColor(215, 220, 224); pdf.setLineWidth(.15); pdf.line(X0, y, X0 + cols.reduce(function(s, c){ return s + c.w; }, 0), y);
  });
  return y + 6;
}
function libEquipement(e){
  var ty = T[e.t]; if (e.t !== 'descente') return ty.lib;
  return 'Descente EP' + (e.p.cote === 'arriere' ? ' arrière' : e.p.cote === 'avant' ? ' avant' : '') + (e.p.visitable === 'non' ? ', non visitable' : e.p.visitable === 'oui' ? ', visitable' : '');
}
function pageTableaux(pdf, doc, an, liste, mode){
  var y = 10, ret = liste.filter(function(a){ return a.st === 'retenue'; }), idx = indexDoc(doc);
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(13); pdf.setTextColor(20, 20, 20);
  pdf.text(pdfTxt((mode === 'avp' ? 'Avant-projet' : 'État des lieux') + (doc.numero ? ' · dossier ' + doc.numero : '') + (doc.adresse ? ' · ' + doc.adresse : '') + (doc.commune ? ', ' + doc.commune : '')), 10, y + 4); y += 10;
  var O = [212, 101, 10];
  if (mode === 'avp'){
    /* le dessin du projet doit corriger les raccordements ; les défauts d'ouvrage (tampon, cunette, accès) le sont par la préconisation */
    var apres = anomaliesDoc(doc, analyser(doc, 'avp')).filter(function(a){ return a.st === 'retenue' && a.auto && (a.cat === 'inversion' || /^fosse:/.test(a.cle)); });
    var edl = anomaliesDoc(doc, analyser(doc, 'edl')).filter(function(a){ return a.st === 'retenue'; });
    y = tableauPdf(pdf, y, [{t: 'N°', w: 10}, {t: 'Préconisation', w: 120}, {t: 'Anomalie traitée', w: 120}, {t: 'Réseau', w: 26}],
      edl.map(function(a){ return {cells: [String(a.num), a.preco || 'à définir', a.obs, a.reseau], coul: [O], gras: [true, true]}; }), 'Préconisations');
    y = tableauPdf(pdf, y, [{t: 'Contrôle du projet', w: 276}], apres.length ? apres.map(function(a){ return {cells: ['Reste après travaux : ' + a.obs]}; }) : [{cells: ['Après travaux, le dessin ne fait plus apparaître d\'anomalie de raccordement.']}], 'Contrôle de l\'avant-projet');
    return;
  }
  y = tableauPdf(pdf, y, [{t: 'N°', w: 10}, {t: 'Réseau', w: 16}, {t: 'Observation', w: 112}, {t: 'Préconisation', w: 112}, {t: 'Nature', w: 26}],
    ret.length ? ret.map(function(a){ return {cells: [String(a.num), a.reseau, a.obs, a.preco || '', a.nc ? 'Non-conformité' : 'Réserve'], coul: [O], gras: [true]}; }) : [{cells: ['', '', 'Aucune anomalie relevée.', '', '']}], 'Anomalies et préconisations');
  var sources = doc.el.filter(function(e){ return e.k === 'pt' && T[e.t] && T[e.t].role === 'source' && an.resObj[e.id]; });
  y = tableauPdf(pdf, y, [{t: 'Équipement', w: 62}, {t: 'Niveau', w: 22}, {t: 'Rejet constaté', w: 74}, {t: 'Méthode de contrôle', w: 58}, {t: 'Observation', w: 60}],
    sources.length ? sources.map(function(e){
      var r = an.resObj[e.id], rej = r.etat === 'ok' ? (EXU_LIB[r.res] || r.res) + (/^(EU|EP|UN)$/.test(r.res) && r.gest ? ' ' + GEST_LIB[r.gest] : '') + (r.presume ? ' (présumé)' : '') : r.etat === 'nonrelie' ? 'non relevé' : r.etat === 'multiple' ? 'à préciser' : 'exutoire non relevé';
      var nums = ret.filter(function(a){ return a.objId === e.id; }).map(function(a){ return a.num; });
      return {cells: [libEquipement(e), NIV_LIB[e.p.niv] || '', rej + (nums.length ? ' · anomalie n° ' + nums.join(', ') : ''), methLib(e.p.meth) || 'non indiquée', e.p.obs || ''], coul: [null, null, nums.length ? [180, 35, 24] : null]};
    }) : [{cells: ['Aucun équipement dessiné.', '', '', '', '']}], 'Équipements, rejets et méthodes de contrôle');
  var c = conclusion(liste, an);
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(10.5); pdf.setTextColor(20, 20, 20);
  if (y > 190){ pdf.addPage('a4', 'landscape'); y = 14; }
  pdf.text(pdfTxt('Conclusion proposée : ' + (CONCL[c] || 'sans objet')), 10, y);
}
VC.pdfPlan = pdfPlan;

/* ---------- DXF R12 pour la DAO : coordonnées du fond, calques VEDE-*, symboles en blocs à l'échelle du plan ---------- */
var CP1252 = {0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A, 0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E,
  0x2018: 0x91, 0x2019: 0x92, 0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C, 0x017E: 0x9E, 0x0178: 0x9F};
function versCp1252(s){
  var out = new Uint8Array(s.length), n = 0;
  for (var i = 0; i < s.length; i++){
    var c = s.charCodeAt(i);
    if (c < 0x80 || (c >= 0xA0 && c <= 0xFF)) out[n++] = c;
    else if (CP1252[c]) out[n++] = CP1252[c];
    else { var b = s[i].normalize('NFD').replace(/[̀-ͯ]/g, ''); out[n++] = b && b.charCodeAt(0) < 0x80 ? b.charCodeAt(0) : 0x3F; }
  }
  return out.subarray(0, n);
}
function dxfTxtSortie(s){ return String(s == null ? '' : s).replace(/[\r\n]+/g, ' ').replace(/Ø/g, '%%c').replace(/°/g, '%%d').replace(/±/g, '%%p').replace(/ | /g, ' '); }
function ecrireDxf(doc, an, liste){
  an = an || analyser(doc, 'edl'); liste = liste || anomaliesDoc(doc, an);
  var Ech = echelleDoc(doc), m = Ech / 1000, u = doc.u || 1, O = doc.origine || {x: 0, y: 0}, idx = indexDoc(doc), rot = doc.rot || 0, rotDeg = rot * 180 / Math.PI;
  var L = [];
  function g(c, v){ var cs = String(c); L.push(cs.length < 3 ? ('   ' + cs).slice(-3) : cs, String(v)); }
  function f(x){ return (Math.round(x * 10000) / 10000).toFixed(4); }
  function X(x){ return f(x / u + O.x); } function Y(y){ return f(y / u + O.y); }
  var mu = m / u;
  var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  doc.el.forEach(function(e){ var P = e.k === 'ln' ? lignePts(e, idx) : [{x: e.x, y: e.y}]; P.forEach(function(p){ x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); }); });
  if (x0 === Infinity){ x0 = y0 = 0; x1 = y1 = 1; }
  var CAL = {'VEDE-EU': 1, 'VEDE-EP': 3, 'VEDE-UNITAIRE': 6, 'VEDE-RESEAU-A-PRECISER': 8, 'VEDE-PROJET': 5, 'VEDE-A-SUPPRIMER': 8, 'VEDE-COLLECTEURS': 7, 'VEDE-SYMBOLES': 7, 'VEDE-ETIQUETTES': 7, 'VEDE-ANOMALIES': 30, 'VEDE-ANNOTATIONS': 30, 'VEDE-COMPLEMENT-FOND': 7, 'VEDE-ECOULEMENT': 8};
  function calRes(r){ return r === 'EU' ? 'VEDE-EU' : r === 'EP' ? 'VEDE-EP' : r === 'UN' ? 'VEDE-UNITAIRE' : r === 'PRJ' ? 'VEDE-PROJET' : 'VEDE-RESEAU-A-PRECISER'; }
  /* en-tête */
  g(0, 'SECTION'); g(2, 'HEADER');
  g(9, '$ACADVER'); g(1, 'AC1009'); g(9, '$DWGCODEPAGE'); g(3, 'ANSI_1252');
  g(9, '$INSBASE'); g(10, '0.0'); g(20, '0.0'); g(30, '0.0');
  g(9, '$EXTMIN'); g(10, X(x0 - 5)); g(20, Y(y0 - 5)); g(30, '0.0'); g(9, '$EXTMAX'); g(10, X(x1 + 5)); g(20, Y(y1 + 5)); g(30, '0.0');
  g(9, '$LTSCALE'); g(40, '1.0'); g(9, '$TEXTSTYLE'); g(7, 'STANDARD');
  g(0, 'ENDSEC');
  /* tables : types de ligne, calques, style */
  g(0, 'SECTION'); g(2, 'TABLES');
  var LT = [['CONTINUOUS', 'Continu', []], ['VEDE_PRESUME', 'Tracé présumé', [2.2 * mu, -1.8 * mu]], ['VEDE_PROJET', 'Tracé projeté', [4 * mu, -2.5 * mu]]];
  g(0, 'TABLE'); g(2, 'LTYPE'); g(70, LT.length);
  LT.forEach(function(t){ g(0, 'LTYPE'); g(2, t[0]); g(70, 0); g(3, t[1]); g(72, 65); g(73, t[2].length); g(40, f(t[2].reduce(function(s, v){ return s + Math.abs(v); }, 0))); t[2].forEach(function(v){ g(49, f(v)); }); });
  g(0, 'ENDTAB');
  g(0, 'TABLE'); g(2, 'LAYER'); g(70, Object.keys(CAL).length + 1);
  g(0, 'LAYER'); g(2, '0'); g(70, 0); g(62, 7); g(6, 'CONTINUOUS');
  Object.keys(CAL).forEach(function(n){ g(0, 'LAYER'); g(2, n); g(70, 0); g(62, CAL[n]); g(6, n === 'VEDE-PROJET' ? 'VEDE_PROJET' : 'CONTINUOUS'); });
  g(0, 'ENDTAB');
  g(0, 'TABLE'); g(2, 'STYLE'); g(70, 1);
  g(0, 'STYLE'); g(2, 'STANDARD'); g(70, 0); g(40, '0.0'); g(41, '1.0'); g(50, '0.0'); g(71, 0); g(42, '2.5'); g(3, 'arial.ttf'); g(4, '');
  g(0, 'ENDTAB');
  g(0, 'ENDSEC');
  /* blocs : un par type de symbole utilisé, en millimètres papier, couleur « du bloc » */
  var types = {}; doc.el.forEach(function(e){ if (e.k === 'pt' && e.t !== 'zone' && T[e.t]) types[e.t] = true; });
  g(0, 'SECTION'); g(2, 'BLOCKS');
  Object.keys(types).forEach(function(t){
    g(0, 'BLOCK'); g(8, '0'); g(2, 'VEDE_' + t.toUpperCase()); g(70, 0); g(10, '0.0'); g(20, '0.0'); g(30, '0.0'); g(3, 'VEDE_' + t.toUpperCase());
    primitives({k: 'pt', t: t, p: defautsPt(t)}, [0, 0, 0], 0).forEach(function(q){
      if (q.k === 'c'){
        if (q.fond && !q.trait || (q.fond && q.trait && q.fond[0] === q.trait[0] && q.fond[1] === q.trait[1] && q.fond[2] === q.trait[2] && q.fond[0] !== 255)){
          /* disque plein : polyligne épaisse fermée (anneau sans trou) */
          g(0, 'POLYLINE'); g(8, '0'); g(62, 0); g(66, 1); g(10, '0.0'); g(20, '0.0'); g(30, '0.0'); g(70, 1); g(40, f(q.r)); g(41, f(q.r));
          [[-q.r / 2, 0], [q.r / 2, 0]].forEach(function(v){ g(0, 'VERTEX'); g(8, '0'); g(10, f(q.x + v[0])); g(20, f(q.y + v[1])); g(30, '0.0'); g(42, '1.0'); });
          g(0, 'SEQEND'); g(8, '0');
        } else if (q.trait){ g(0, 'CIRCLE'); g(8, '0'); g(62, 0); g(10, f(q.x)); g(20, f(q.y)); g(30, '0.0'); g(40, f(q.r)); }
      } else if (q.k === 'p'){
        g(0, 'POLYLINE'); g(8, '0'); g(62, 0); g(66, 1); g(10, '0.0'); g(20, '0.0'); g(30, '0.0'); g(70, q.f ? 1 : 0);
        for (var i = 0; i < q.pts.length; i += 2){ g(0, 'VERTEX'); g(8, '0'); g(10, f(q.pts[i])); g(20, f(q.pts[i + 1])); g(30, '0.0'); }
        g(0, 'SEQEND'); g(8, '0');
      } else if (q.k === 't' && q.s){
        g(0, 'TEXT'); g(8, '0'); g(62, 0); g(10, f(q.x)); g(20, f(q.y)); g(30, '0.0'); g(40, f(q.h * .72)); g(1, dxfTxtSortie(q.s)); g(72, 1); g(73, 2); g(11, f(q.x)); g(21, f(q.y)); g(31, '0.0');
      }
    });
    g(0, 'ENDBLK'); g(8, '0');
  });
  g(0, 'ENDSEC');
  /* entités */
  g(0, 'SECTION'); g(2, 'ENTITIES');
  function poly(P, cal, o){
    o = o || {}; if (P.length < 2) return;
    g(0, 'POLYLINE'); g(8, cal); if (o.col != null) g(62, o.col); if (o.lt) g(6, o.lt); g(66, 1); g(10, '0.0'); g(20, '0.0'); g(30, '0.0'); g(70, o.ferme ? 1 : 0);
    if (o.larg){ g(40, f(o.larg)); g(41, f(o.larg)); }
    P.forEach(function(p){ g(0, 'VERTEX'); g(8, cal); g(10, X(p.x)); g(20, Y(p.y)); g(30, '0.0'); });
    g(0, 'SEQEND'); g(8, cal);
  }
  function texte(s, x, y, h, cal, col, ang){
    String(s).split('\n').forEach(function(l, i, A){
      var dy = ((A.length - 1) / 2 - i) * h * 1.6, p = depuisPlan(0, dy, rot), px = x + p.x, py = y + p.y;
      g(0, 'TEXT'); g(8, cal); if (col != null) g(62, col); g(10, X(px)); g(20, Y(py)); g(30, '0.0'); g(40, f(h / u)); g(1, dxfTxtSortie(l)); if (ang) g(50, f(ang)); g(72, 1); g(73, 2); g(11, X(px)); g(21, Y(py)); g(31, '0.0');
    });
  }
  var parLigne = {}; an.pieces.forEach(function(p){ (parLigne[p.l.id] = parLigne[p.l.id] || []).push(p); });
  doc.el.forEach(function(e){
    if (e.k !== 'ln' || e.v.length < 2) return;
    var P = lignePts(e, idx), st = e.p.st || 'existant';
    if (e.t === 'lim'){ poly(P, 'VEDE-COMPLEMENT-FOND'); return; }
    if (e.t === 'col'){ poly(P, 'VEDE-COLLECTEURS', {col: (RES[e.p.res] || RES.EU).aci, larg: .6 * m}); return; }
    if (st === 'projet'){ poly(P, 'VEDE-PROJET', {lt: 'VEDE_PROJET'}); return; }
    var ms = (parLigne[e.id] || []).map(function(p){ return {pts: P.slice(p.i0, p.i1 + 1), res: an.resPiece[p.id].res, p: p}; });
    if (!ms.length) ms = [{pts: P, res: resLigne(e, an)}];
    ms.forEach(function(mc){
      var cal = st === 'supprimer' ? 'VEDE-A-SUPPRIMER' : calRes(mc.res);
      poly(mc.pts, cal, {lt: st === 'presume' || mc.res === 'INC' ? 'VEDE_PRESUME' : null, col: st === 'supprimer' ? (RES[mc.res] || RES.INC).aci : null});
      if (mc.p && an.sensPiece[mc.p.id]){
        var mi = milieuChemin(mc.pts), sg = an.sensPiece[mc.p.id];
        if (mi && mi.L > 1.5 * m * 4){ var ux = mi.ux * sg, uy = mi.uy * sg, s = 1.3 * m;
          g(0, 'SOLID'); g(8, 'VEDE-ECOULEMENT'); g(62, (RES[mc.res] || RES.INC).aci);
          var A = [mi.x + ux * s, mi.y + uy * s], B = [mi.x - ux * s - uy * s * .7, mi.y - uy * s + ux * s * .7], C = [mi.x - ux * s + uy * s * .7, mi.y - uy * s - ux * s * .7];
          g(10, X(A[0])); g(20, Y(A[1])); g(30, '0.0'); g(11, X(B[0])); g(21, Y(B[1])); g(31, '0.0'); g(12, X(C[0])); g(22, Y(C[1])); g(32, '0.0'); g(13, X(C[0])); g(23, Y(C[1])); g(33, '0.0'); }
      }
    });
  });
  doc.el.forEach(function(e){
    if (e.k !== 'pt') return;
    if (e.t === 'zone'){ g(0, 'CIRCLE'); g(8, 'VEDE-ANNOTATIONS'); g(10, X(e.x)); g(20, Y(e.y)); g(30, '0.0'); g(40, f((num(e.p.r) || 1.5) / u)); return; }
    var rgb = couleurPt(e, an), aci = 7; Object.keys(RES).forEach(function(k){ if (RES[k].rgb === rgb) aci = RES[k].aci; });
    g(0, 'INSERT'); g(8, e.p.st === 'projet' ? 'VEDE-PROJET' : e.p.st === 'supprimer' ? 'VEDE-A-SUPPRIMER' : 'VEDE-SYMBOLES'); g(62, aci); g(2, 'VEDE_' + e.t.toUpperCase());
    g(10, X(e.x)); g(20, Y(e.y)); g(30, '0.0'); g(41, f(mu)); g(42, f(mu)); g(43, f(mu)); g(50, f(T[e.t].oriente ? (e.p.a || 0) : rotDeg));
  });
  doc.el.forEach(function(e){
    var libre = e.k === 'tx', txt = libre ? e.txt : texteEtiquette(e, an);
    if (!txt || (!libre && e.lab && e.lab.off)) return;
    var a = ancre(e, idx), lab = libre ? {dx: 0, dy: 0} : (e.lab || placerEtiquette(doc, an, e, Ech, idx) || {dx: 0, dy: 0}), d = depuisPlan(lab.dx, lab.dy, rot);
    var r = couleurTexte(e, an), col = libre ? 7 : (RES[r] || RES.INC).aci;
    texte(txt, a.x + d.x, a.y + d.y, (libre ? (num(e.taille) || 2.5) : TAILLE_ETIQ) * .72 * m, libre ? 'VEDE-ANNOTATIONS' : 'VEDE-ETIQUETTES', col, rotDeg);
  });
  var posB = placerBulles(doc, an, liste, Ech, idx);
  liste.forEach(function(a){
    if (!a.num || !a.objId || !idx[a.objId]) return;
    var ob = idx[a.objId], d = posB[a.cle] || bulleDefaut(ob, Ech), w = depuisPlan(d.dx, d.dy, rot), cx = ob.x + w.x, cy = ob.y + w.y, r = TAILLE_BULLE * m;
    g(0, 'CIRCLE'); g(8, 'VEDE-ANOMALIES'); g(10, X(cx)); g(20, Y(cy)); g(30, '0.0'); g(40, f(r / u));
    var dd = Math.hypot(cx - ob.x, cy - ob.y), R = (ob.k === 'pt' ? rayonSymbole(ob.t) : 1) * m;
    if (dd > R + r){ g(0, 'LINE'); g(8, 'VEDE-ANOMALIES'); g(10, X(ob.x + (cx - ob.x) / dd * R)); g(20, Y(ob.y + (cy - ob.y) / dd * R)); g(30, '0.0'); g(11, X(cx - (cx - ob.x) / dd * r)); g(21, Y(cy - (cy - ob.y) / dd * r)); g(31, '0.0'); }
    texte(String(a.num), cx, cy, r * .75, 'VEDE-ANOMALIES', null, rotDeg);
  });
  g(0, 'ENDSEC'); g(0, 'EOF');
  return versCp1252(L.join('\r\n') + '\r\n');
}
VC.ecrireDxf = ecrireDxf; VC.versCp1252 = versCp1252;

/* ---------- Systèmes de coordonnées : Lambert 93 et coniques conformes CC42 à CC50 (RGF93), WGS84 assimilé à RGF93 ---------- */
var GRS80 = {a: 6378137, e: Math.sqrt(2 / 298.257222101 - 1 / (298.257222101 * 298.257222101))};
function lcc(def){
  var a = GRS80.a, e = GRS80.e, rad = Math.PI / 180;
  function t(p){ var s = Math.sin(p); return Math.tan(Math.PI / 4 - p / 2) / Math.pow((1 - e * s) / (1 + e * s), e / 2); }
  function mm(p){ var s = Math.sin(p); return Math.cos(p) / Math.sqrt(1 - e * e * s * s); }
  var p1 = def.lat1 * rad, p2 = def.lat2 * rad, p0 = def.lat0 * rad, l0 = def.lon0 * rad;
  var n = (Math.log(mm(p1)) - Math.log(mm(p2))) / (Math.log(t(p1)) - Math.log(t(p2))), F = mm(p1) / (n * Math.pow(t(p1), n)), r0 = a * F * Math.pow(t(p0), n);
  return {
    vers: function(lon, lat){ var r = a * F * Math.pow(t(lat * rad), n), th = n * (lon * rad - l0); return [def.x0 + r * Math.sin(th), def.y0 + r0 - r * Math.cos(th)]; },
    depuis: function(x, y){
      var dx = x - def.x0, dy = r0 - (y - def.y0), r = (n > 0 ? 1 : -1) * Math.hypot(dx, dy), th = Math.atan2(dx, dy), tt = Math.pow(r / (a * F), 1 / n);
      var p = Math.PI / 2 - 2 * Math.atan(tt);
      for (var i = 0; i < 12; i++){ var s = Math.sin(p); p = Math.PI / 2 - 2 * Math.atan(tt * Math.pow((1 - e * s) / (1 + e * s), e / 2)); }
      return [(th / n + l0) / rad, p / rad];
    }
  };
}
var CRS = {L93: lcc({lat1: 44, lat2: 49, lat0: 46.5, lon0: 3, x0: 700000, y0: 6600000})};
for (var zz = 42; zz <= 50; zz++) CRS['CC' + zz] = lcc({lat1: zz - .75, lat2: zz + .75, lat0: zz, lon0: 3, x0: 1700000, y0: (zz - 41) * 1000000 + 200000});
/* Devine le système d'un point (coordonnées du fichier) */
function crsDe(x, y){
  if (Math.abs(x) <= 180 && Math.abs(y) <= 90) return 'WGS84';
  if (x > 1000000 && x < 2400000){ var z = Math.round((y - 200000) / 1000000) + 41; if (z >= 42 && z <= 50 && Math.abs(y - ((z - 41) * 1000000 + 200000)) < 650000) return 'CC' + z; }
  if (x > -400000 && x < 1400000 && y > 6000000 && y < 7200000) return 'L93';
  return null;
}
function convertir(x, y, de, vers){
  if (de === vers || !de || !vers) return [x, y];
  var ll = de === 'WGS84' ? [x, y] : CRS[de].depuis(x, y);
  return vers === 'WGS84' ? ll : CRS[vers].vers(ll[0], ll[1]);
}
VC.crsDe = crsDe; VC.convertir = convertir;
/* Lecture brute d'un GeoJSON (lignes, polygones, points) ; couleur selon le réseau lu dans les propriétés */
function lireGeojson(txt){
  var j = typeof txt === 'string' ? JSON.parse(txt) : txt, lignes = [], textes = [], calques = {}, ordre = [];
  var crsNom = j && j.crs && j.crs.properties && String(j.crs.properties.name || ''), m = /EPSG:{1,2}(\d+)/i.exec(crsNom || ''), declare = null;
  if (m){ var c = +m[1]; declare = c === 2154 ? 'L93' : c >= 3942 && c <= 3950 ? 'CC' + (c - 3900) : c === 4326 || c === 4171 ? 'WGS84' : null; }
  function reseauDe(p){
    var s = norm(Object.keys(p || {}).map(function(k){ return k + ' ' + p[k]; }).join(' '));
    if (/unitaire|\bun\b|\buni\b/.test(s)) return ['UNITAIRE', 6]; if (/pluvia|\bep\b|eaux? de pluie/.test(s)) return ['EP', 3]; if (/usee|\beu\b|vanne|menager/.test(s)) return ['EU', 1]; return ['RESEAU', 7];
  }
  function calque(n, aci){ if (!calques[n]){ calques[n] = {nom: n, aci: aci, rgb: null, visible: true, lt: ''}; ordre.push(n); } return n; }
  (j.type === 'FeatureCollection' ? j.features : j.type === 'Feature' ? [j] : [{type: 'Feature', geometry: j, properties: {}}]).forEach(function(ft){
    var gm = ft && ft.geometry; if (!gm) return;
    var r = reseauDe(ft.properties), lay = calque(r[0], r[1]);
    function ligne(cs, ferme){ var pts = []; cs.forEach(function(c){ pts.push(+c[0], +c[1]); }); if (pts.length >= 4) lignes.push({lay: lay, aci: r[1], rgb: null, pts: pts, ferme: !!ferme}); }
    function point(c){ var pts = arcPts(+c[0], +c[1], .45, 0, 2 * Math.PI, []); lignes.push({lay: lay, aci: r[1], rgb: null, pts: pts, ferme: true, point: true}); }
    var T2 = gm.type, C = gm.coordinates;
    if (T2 === 'LineString') ligne(C); else if (T2 === 'MultiLineString') C.forEach(function(l){ ligne(l); });
    else if (T2 === 'Polygon') C.forEach(function(l){ ligne(l, true); }); else if (T2 === 'MultiPolygon') C.forEach(function(p){ p.forEach(function(l){ ligne(l, true); }); });
    else if (T2 === 'Point') point(C); else if (T2 === 'MultiPoint') C.forEach(point);
  });
  return {version: 'GeoJSON', encodage: 'UTF-8', insunits: 6, u: 1, calques: ordre.map(function(n){ return calques[n]; }), lignes: lignes, textes: textes, ignores: {}, nEnt: lignes.length, crs: declare};
}
/* Réseaux du Département : DXF ou GeoJSON, ramenés dans le système du fond (Lambert 93, CC ou degrés) */
function lireReseau(buf, nom, fondRef){
  var u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf), debut = new TextDecoder('utf-8').decode(u8.subarray(0, 200)).trim(), brut;
  brut = /^[\[{]/.test(debut) ? lireGeojson(new TextDecoder('utf-8').decode(u8)) : lireDxf(u8);
  var conv = null;
  if (fondRef){
    var cible = crsDe(fondRef.origine.x, fondRef.origine.y), src = brut.crs, k, n = 0, sx = 0, sy = 0;
    if (!src){ brut.lignes.slice(0, 50).forEach(function(l){ sx += l.pts[0]; sy += l.pts[1]; n++; }); if (n) src = crsDe(sx / n, sy / n); }
    if (src && cible && src !== cible && CRS[cible]){
      brut.lignes.forEach(function(l){ for (k = 0; k < l.pts.length; k += 2){ var q = convertir(l.pts[k], l.pts[k + 1], src, cible); l.pts[k] = q[0]; l.pts[k + 1] = q[1]; } if (l.point){ var c0 = [0, 0]; for (k = 0; k < l.pts.length; k += 2){ c0[0] += l.pts[k]; c0[1] += l.pts[k + 1]; } c0[0] /= l.pts.length / 2; c0[1] /= l.pts.length / 2; l.pts = arcPts(c0[0], c0[1], .45, 0, 2 * Math.PI, []); } });
      brut.textes.forEach(function(t){ var q = convertir(t.x, t.y, src, cible); t.x = q[0]; t.y = q[1]; });
      brut.u = 1; conv = src + ' vers ' + cible;
    }
  }
  var f = preparerFond(brut, nom, 'reseau'); f.conversion = conv;
  return f;
}
VC.lireReseau = lireReseau; VC.lireGeojson = lireGeojson;

/* ---------- Démonstration : cadastre fictif (DXF R12) et croquis d'exemple, sans aucune donnée réelle ---------- */
var DEMO = {x: 1700000, y: 8200000, th: 12 * Math.PI / 180};
function demoPt(u, v){ var c = Math.cos(DEMO.th), s = Math.sin(DEMO.th); return {x: DEMO.x + u * c - v * s, y: DEMO.y + u * s + v * c}; }
function demoDxf(){
  var L = [];
  function g(c, v){ L.push(('   ' + c).slice(-3), String(v)); }
  function f(x){ return x.toFixed(3); }
  function poly(lay, uv, ferme){ g(0, 'POLYLINE'); g(8, lay); g(66, 1); g(10, '0.0'); g(20, '0.0'); g(30, '0.0'); g(70, ferme ? 1 : 0); uv.forEach(function(q){ var p = demoPt(q[0], q[1]); g(0, 'VERTEX'); g(8, lay); g(10, f(p.x)); g(20, f(p.y)); g(30, '0.0'); }); g(0, 'SEQEND'); g(8, lay); }
  function rect(lay, u0, v0, u1, v1){ poly(lay, [[u0, v0], [u1, v0], [u1, v1], [u0, v1]], true); }
  function texte(lay, s, u, v, h, deg, centre){ var p = demoPt(u, v); g(0, 'TEXT'); g(8, lay); g(10, f(p.x)); g(20, f(p.y)); g(30, '0.0'); g(40, f(h)); g(1, s); g(50, f(deg || 0)); if (centre){ g(72, 1); g(73, 2); g(11, f(p.x)); g(21, f(p.y)); g(31, '0.0'); } }
  var deg = DEMO.th * 180 / Math.PI;
  g(0, 'SECTION'); g(2, 'HEADER'); g(9, '$ACADVER'); g(1, 'AC1009'); g(9, '$DWGCODEPAGE'); g(3, 'ANSI_1252'); g(0, 'ENDSEC');
  g(0, 'SECTION'); g(2, 'TABLES'); g(0, 'TABLE'); g(2, 'LAYER'); g(70, 8);
  ['1PARCELLE', '3BATIDUR', '3BATILEGER', '3PARCELLETEX', '3NUMVOIE', '3ZONCOMMTEX', '1ZONCOMM', '3MURMI'].forEach(function(n){ g(0, 'LAYER'); g(2, n); g(70, 0); g(62, 7); g(6, 'CONTINUOUS'); });
  g(0, 'ENDTAB'); g(0, 'ENDSEC');
  g(0, 'SECTION'); g(2, 'BLOCKS'); g(0, 'BLOCK'); g(8, '0'); g(2, 'MURMI'); g(70, 0); g(10, '0.0'); g(20, '0.0'); g(30, '0.0');
  g(0, 'LINE'); g(8, '0'); g(10, '-0.6'); g(20, '0.0'); g(30, '0.0'); g(11, '0.6'); g(21, '0.0'); g(31, '0.0');
  g(0, 'LINE'); g(8, '0'); g(10, '0.0'); g(20, '0.0'); g(30, '0.0'); g(11, '0.0'); g(21, '0.8'); g(31, '0.0');
  g(0, 'ENDBLK'); g(8, '0'); g(0, 'ENDSEC');
  g(0, 'SECTION'); g(2, 'ENTITIES');
  var nord = [13, 12, 14, 12, 13, 12, 15, 12, 13], sud = [14, 12, 13, 12, 14, 13, 12, 14, 12], u0 = 0;
  nord.forEach(function(w, i){
    rect('1PARCELLE', u0, 0, u0 + w, 34);
    var mit = i % 3 === 1;
    rect('3BATIDUR', mit ? u0 : u0 + 1.5, 4, u0 + w - 1.5, 14);
    if (i % 2 === 0) rect('3BATILEGER', u0 + w - 5, 24, u0 + w - 1.5, 28);
    texte('3PARCELLETEX', String(101 + i), u0 + w / 2 - 1.5, 20, 2, 0, false);
    texte('3NUMVOIE', String(2 + 2 * i), u0 + w / 2, 1.6, 1.1, deg, true);
    if (mit){ var pm = demoPt(u0, 18); g(0, 'INSERT'); g(8, '3MURMI'); g(2, 'MURMI'); g(10, f(pm.x)); g(20, f(pm.y)); g(30, '0.0'); g(50, f(deg + 90)); }
    u0 += w;
  });
  var fin = u0; u0 = 0;
  sud.forEach(function(w, i){
    rect('1PARCELLE', u0, -10, u0 + w, -42);
    rect('3BATIDUR', u0 + 1.5, -14, u0 + w - 1.5, -25);
    texte('3PARCELLETEX', String(201 + i), u0 + w / 2 - 1.5, -33, 2, 0, false);
    texte('3NUMVOIE', String(1 + 2 * i), u0 + w / 2, -11.6, 1.1, deg, true);
    u0 += w;
  });
  poly('1ZONCOMM', [[-20, 0], [fin, 0]], false); poly('1ZONCOMM', [[-20, -10], [fin, -10]], false);
  poly('1ZONCOMM', [[fin, 60], [fin, 0]], false); poly('1ZONCOMM', [[fin + 8, 60], [fin + 8, -60]], false); poly('1ZONCOMM', [[fin, -10], [fin, -60]], false);
  texte('3ZONCOMMTEX', 'RUE FICTIVE', 40, -5, 2.5, deg, true);
  texte('3ZONCOMMTEX', 'ALLÉE DES ESSAIS', fin + 4, 30, 2.2, deg + 90, true);
  g(0, 'ENDSEC'); g(0, 'EOF');
  return L.join('\r\n') + '\r\n';
}
function demoCroquis(fond){
  var d = nouveauDoc({nom: 'Démonstration', numero: 'D-0012', adresse: '12 rue Fictive', commune: 'Ville-Exemple', technicien: 'Technicien A'});
  d.fondId = fond ? fond.id : null; d.origine = fond ? {x: fond.origine.x, y: fond.origine.y} : {x: DEMO.x, y: DEMO.y}; d.u = 1; d.rot = DEMO.th;
  function L(u, v){ var p = demoPt(u, v); return {x: p.x - d.origine.x, y: p.y - d.origine.y}; }
  function pt(t, u, v, p){ var q = L(u, v), e = {id: uid(), k: 'pt', t: t, x: q.x, y: q.y, p: Object.assign(defautsPt(t), p || {}), lab: null}; d.el.push(e); return e; }
  function ln(t, pts, p){ var e = {id: uid(), k: 'ln', t: t, v: pts.map(function(q){ if (q.k) return {x: q.x, y: q.y, a: q.id}; var w = L(q[0], q[1]); return {x: w.x, y: w.y, a: null}; }), p: Object.assign(defautsLn(t), p || {}), lab: null}; d.el.push(e); return e; }
  var jEU = pt('jonction', 67, -3.5), jEP = pt('jonction', 73, -6.5);
  ln('col', [[-20, -3.5], jEU, [130, -3.5]], {res: 'EU', gest: 'D', diam: '300'});
  ln('col', [[-20, -6.5], jEP, [130, -6.5]], {res: 'EP', gest: 'D', diam: '400'});
  var bEU = pt('boite', 67, .8, {res: 'EU', tampon: 'fonte', dim: '40×40'}), bEP = pt('boite', 73, .8, {res: 'EP', tampon: 'fonte', dim: '40×40'});
  ln('tr', [bEU, jEU], {diam: '160', mat: 'PVC'}); ln('tr', [bEP, jEP], {diam: '160', mat: 'PVC'});
  var R1 = pt('regard', 67, 2.8, {tampon: 'beton', cunette: 'non', acces: 'oui', dim: '40×40', prof: '0,80'});
  ln('tr', [R1, bEU], {diam: '100', mat: 'PVC'});
  var wc = pt('wc', 66.8, 9, {meth: ['visuel', 'eau'], niv: 'rdc'}), ll = pt('lavelinge', 69.5, 12.5, {meth: ['fluo'], niv: 'rdc'}), dch = pt('douche', 66, 12.6, {meth: ['eau'], niv: 'etage'});
  ln('tr', [wc, R1]); ln('tr', [ll, [69.5, 6], R1]); ln('tr', [dch, [66, 5.6], R1]);
  var ev = pt('evier', 72.8, 11.5, {meth: ['fluo'], niv: 'rdc'});
  ln('tr', [ev, [72.8, 5.5], bEP], {st: 'supprimer'});
  ln('tr', [ev, [71, 9.5], [68.6, 4.4], R1], {st: 'projet', diam: '100'});
  var d1 = pt('descente', 65.5, 4, {visitable: 'non', cote: 'avant', meth: ['visuel']}), d2 = pt('descente', 74.5, 4, {visitable: 'oui', cote: 'avant', meth: ['visuel']}), d3 = pt('descente', 74.5, 14, {visitable: 'oui', cote: 'arriere'});
  ln('tr', [d1, [65.5, 3], R1], {st: 'supprimer'});
  ln('tr', [d1, [65.2, 2], [65.2, 1.6], [71.2, 1.6], bEP], {st: 'projet', diam: '100'});
  ln('tr', [d2, [74.5, 2.2], bEP]);
  var pu = pt('puisard', 74, 22); ln('tr', [d3, pu]);
  pt('test', 71.4, 10.3, {meth: ['fluo'], resultat: 'colorant en boîte EP'});
  d.el.push({id: uid(), k: 'tx', x: L(68, 26).x, y: L(68, 26).y, txt: 'Jardin', taille: 2.5});
  var an = analyser(d, 'edl'), idx = indexDoc(d), Ech = echelleDoc(d);
  d.el.forEach(function(e){ if (e.k !== 'tx' && !(e.k === 'pt' && T[e.t].sansEtiquette) && texteEtiquette(e, an)) e.lab = placerEtiquette(d, an, e, Ech, idx); else if (e.k === 'pt' && T[e.t].sansEtiquette) e.lab = {off: true}; });
  var c = L(70, 6); d.vue = {cx: c.x, cy: c.y, s: 22};
  return d;
}
VC.demoDxf = demoDxf; VC.demoCroquis = demoCroquis;
})(typeof window !== 'undefined' ? window : globalThis);
