// Moteur de l'aperçu du plan (m167 ; A1 à A4 et A17 de la conception de l'aperçu) : pdfPlan dessine sur un releveur (o.cible) qui note
// chaque ordre du plan PDF sur sa page, avec des marques (o.marque) autour des étiquettes, textes libres, bulles, symboles et éléments fixes ;
// rejouerPage rejoue une page sur un contexte 2D ; chevauchementsPlan compte les recouvrements de la page 1. Contrôles :
// (a) témoins du livrable : les ordres du releveur sont ceux du vrai jsPDF (espion du premier niveau), toutes pages, avec et sans marques,
// logo illisible compris ;
// (b) flux : départ et ligne de base de chaque ligne de texte, lus dans le PDF non compressé, égaux à ceux du releveur ; largeur imprimée ;
// (c) rejeu sur un faux contexte 2D (textes, halo, découpe au cadre, tracés et leur peinture, logo) ; (d) marques et leurs statuts
// (« ecart » compris) ; (e) chevauchements de plans construits : recouvrement exact, boîte d'une ligne, seuils de 0,3 mm ;
// (f) mode strict du releveur ; arguments que jsPDF refuse : la même erreur que lui, avec ou sans strict.
// Croquis fictifs seulement (« 12 rue Fictive », « Ville-Exemple », fond VCroquis.demoDxf()) ; le logo est un PNG fabriqué ici.
// usage : node tests/vm/apercu.js [-v] [--app=<dossier>]
'use strict';
const zlib = require('zlib');
const {charger, doc, copie, rapport} = require('./charger.js');
const {V, ctx} = charger({pdf: true}), R = rapport('apercu');
const J0 = ctx.jspdf.jsPDF, MM = 25.4 / 72, TOL = 1e-9;

/* date figée (cartouche « Établi le ») : le 1er novembre 2026 à midi UTC, le même jour dans tous les fuseaux d'Europe et d'Amérique */
const T0 = Date.UTC(2026, 10, 1, 12);
class Df extends Date { constructor(...a){ if (a.length) super(...a); else super(T0); } static now(){ return T0; } }
function fige(fn){ const D = ctx.Date; ctx.Date = Df; try { return fn(); } finally { ctx.Date = D; } }

/* logo : PNG de 4 × 2 pixels fabriqué ici (jamais celui de l'application) */
function crc32(b){ let c = ~0; for (let i = 0; i < b.length; i++){ c ^= b[i]; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1)); } return ~c >>> 0; }
function bloc(t, d){ const l = Buffer.alloc(4), c = Buffer.alloc(4), td = Buffer.concat([Buffer.from(t, 'latin1'), d]); l.writeUInt32BE(d.length); c.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, c]); }
function png(){
  const w = 4, h = 2, raw = Buffer.alloc((w * 3 + 1) * h), ih = Buffer.alloc(13);
  for (let i = 0; i < raw.length; i++) raw[i] = i % (w * 3 + 1) ? 40 + (i * 37) % 200 : 0;
  ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 2;
  return 'data:image/png;base64,' + Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), bloc('IHDR', ih), bloc('IDAT', zlib.deflateSync(raw)), bloc('IEND', Buffer.alloc(0))]).toString('base64');
}
const LOGO = {data: png(), ratio: 2, format: 'PNG'}, SIG = 'AVAV Signature fictive, exemple.org';

/* copie profonde qui garde undefined et NaN (les arguments tels que pdfPlan les passe) */
const cp = v => Array.isArray(v) ? v.map(cp) : v && typeof v === 'object' && Object.prototype.toString.call(v) === '[object Object]'
  ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, cp(x)])) : v;

/* Espion du premier niveau : le vrai jsPDF, enveloppé par un Proxy qui note les appels de pdfPlan (pas ceux de jsPDF lui-même), par page
   (addPage, setPage), sans les mesures (get…, splitTextToSize) ni output ; noms : tout ce que pdfPlan lit sur l'objet ; o.sansCompression :
   compress: false (lecture du flux) ; inst : la vraie instance. */
const MESURES = /^(get|splitTextToSize$|output$)/;
function espion(fn, o){
  o = o || {};
  const pages = [[]], noms = new Set(), insts = [];
  let cur = 0;
  const W = function(opts){
    const t = new J0(Object.assign({}, opts, o.sansCompression ? {compress: false} : {}));
    insts.push(t);
    const P = new Proxy(t, {get(tt, k){
      if (typeof k === 'string') noms.add(k);
      const v = tt[k];
      if (typeof v !== 'function') return v;
      return function(...a){
        /* arguments notés avant l'appel : jsPDF écrit dans l'objet d'options de text() (isInputVisual) */
        const ac = cp(a), r = v.apply(tt, a);
        if (k === 'addPage'){ pages.push([]); cur = pages.length - 1; }
        else if (k === 'setPage') cur = a[0] - 1;
        else if (!MESURES.test(k)) pages[cur].push({m: k, a: ac});
        return r === tt ? P : r;
      };
    }});
    return P;
  };
  W.API = J0.API; ctx.jspdf.jsPDF = W;
  let res;
  try { res = fige(fn); } finally { ctx.jspdf.jsPDF = J0; }
  return {pages, noms, inst: insts[0], n: insts.length, res};
}
function signe(s, fn){ const a = V.signature; V.signature = s; try { return fn(); } finally { V.signature = a; } }

/* ---------- témoins du livrable ---------- */
const lab = (d, id, l) => { d.el.find(e => e.id === id).lab = l; };
function construit(ech){
  const d = doc({
    o: [['W', 'wc', 0, 6], ['Ev', 'evier', 3, 6], ['De', 'descente', -2, 8], ['R1', 'regard', 2, 2, {etiq: 'AVAVAV Tampon fonte'}],
      ['B1', 'boite', 6, 2, {res: 'EU', etiq: 'ÉCOLE ÎLE ÀÉÈ\nsur deux lignes'}], ['Fs', 'fosse', 8, 5, {st: 'supprimer'}],
      ['Rp', 'regard_pub', 6, -3, {res: 'EU'}], ['Lo', 'regard', 4, 40, {etiq: 'Objet hors du cadre'}], ['Lb', 'regard', 4, -35]],
    l: [['L1', 'tr', 'EU', '', ['W', [0, 2], 'R1']], ['L2', 'tr', 'EU', '', ['Ev', 'R1']], ['L3', 'tr', 'EU', '', ['R1', 'B1']],
      ['L4', 'tr', '', '', ['B1', 'Rp']], ['L5', 'tr', 'EP', '', ['De', [-2, 2], 'R1']], ['L6', 'tr', 'EU', 'supprimer', ['Fs', 'B1']],
      ['L7', 'tr', 'EU', 'projet', ['Ev', [3, 4], 'B1']], ['C1', 'col', 'EU', '', [[-150, -3], 'Rp', [12, -3], [12, -60]]]]});
  d.el.forEach(e => { e.lab = null; });
  lab(d, 'Ev', {dx: 2, dy: 1.5, main: true}); lab(d, 'Lb', {off: true});
  d.el.push({id: 'X1', k: 'tx', x: 1, y: 10, txt: 'Jardin fictif', taille: 3});
  d.anomManu = [{id: 'm1', objId: 'W', reseau: 'EU', obs: 'Anomalie fictive', preco: 'Préconisation fictive', nc: true, st: 'retenue', bulle: {dx: 1.2, dy: 1.6}}];
  return Object.assign(d, {id: 'construit', rot: 0.5, echelle: ech});
}
const FOND = V.lireFondDxf(Buffer.from(V.demoDxf(), 'utf8'), 'Plan fictif');
const demoF = fige(() => copie(V.demoCroquis(FOND))), demoN = fige(() => copie(V.demoCroquis(null)));
const TEMOINS = [
  {nom: 'démonstration, état des lieux, échelle auto, fond', d: demoF, fond: FOND, o: {mode: 'edl'}},
  {nom: 'démonstration, avant-projet, 1/200, fond, logo, signature', d: Object.assign(copie(demoF), {echelle: 200}), fond: FOND, o: {mode: 'avp', logo: LOGO}, sig: SIG},
  {nom: 'démonstration, état des lieux, échelle auto, sans fond', d: demoN, fond: null, o: {mode: 'edl'}},
  {nom: 'construit, état des lieux, 1/200, plan tourné, logo, signature', d: construit(200), fond: null, o: {mode: 'edl', logo: LOGO}, sig: SIG},
  {nom: 'construit, avant-projet, échelle auto, plan tourné, signature', d: construit(0), fond: null, o: {mode: 'avp'}, sig: SIG}
];

/* plan d'un témoin sur le vrai jsPDF (espion) ou sur le releveur (strict), avec ou sans marques ; mémorisé */
const memo = new Map();
function une(cle, fn){ if (!memo.has(cle)){ try { memo.set(cle, {v: fn()}); } catch (e){ memo.set(cle, {e}); } } const r = memo.get(cle); if (r.e) throw r.e; return r.v; }
function surJsPDF(t, marque, sansCompression){
  return une('j|' + t.nom + '|' + !!marque + '|' + !!sansCompression, () => espion(() => signe(t.sig, () =>
    V.pdfPlan(copie(t.d), t.fond, Object.assign({}, t.o, marque ? {marque(){}} : {}))), {sansCompression}));
}
function surReleveur(t, marque){
  return une('r|' + t.nom + '|' + !!marque, () => {
    const rel = V.releveurPdf(J0, {strict: true});
    const res = fige(() => signe(t.sig, () => V.pdfPlan(copie(t.d), t.fond, Object.assign({}, t.o, {cible: rel}, marque ? {marque: rel.marque} : {}))));
    return {rel, res, pages: rel.pages.map(p => p.ordres.map(o => ({m: o.m, a: o.a})))};
  });
}

/* égalité à TOL près pour les nombres */
function egal(x, y){
  if (typeof x === 'number' && typeof y === 'number') return Math.abs(x - y) <= TOL || (isNaN(x) && isNaN(y));
  if (Array.isArray(x)) return Array.isArray(y) && x.length === y.length && x.every((v, i) => egal(v, y[i]));
  if (x && typeof x === 'object'){
    if (!y || typeof y !== 'object' || Array.isArray(y)) return false;
    const kx = Object.keys(x).filter(k => x[k] !== undefined).sort(), ky = Object.keys(y).filter(k => y[k] !== undefined).sort();
    return kx.join() === ky.join() && kx.every(k => egal(x[k], y[k]));
  }
  return x === y;
}
const court = v => { const s = JSON.stringify(v); return s && s.length > 160 ? s.slice(0, 160) + '…' : s; };
function ecartOrdres(A, B){
  if (A.length !== B.length) return A.length + ' pages contre ' + B.length;
  for (let p = 0; p < A.length; p++){
    const n = Math.max(A[p].length, B[p].length);
    for (let i = 0; i < n; i++){
      const a = A[p][i], b = B[p][i];
      if (!a || !b || a.m !== b.m || !egal(a.a, b.a)) return 'page ' + (p + 1) + ', ordre ' + i + ' : ' + court(a) + ' / ' + court(b) + ' (' + A[p].length + ' et ' + B[p].length + ' ordres)';
    }
  }
  return '';
}

/* ---------- lecture du flux d'un PDF non compressé ---------- */
const CP1252 = {0x80: '€', 0x82: '‚', 0x83: 'ƒ', 0x84: '„', 0x85: '…', 0x86: '†', 0x87: '‡', 0x88: 'ˆ', 0x89: '‰', 0x8A: 'Š', 0x8B: '‹', 0x8C: 'Œ', 0x8E: 'Ž',
  0x91: '‘', 0x92: '’', 0x93: '“', 0x94: '”', 0x95: '•', 0x96: '–', 0x97: '—', 0x98: '˜', 0x99: '™', 0x9A: 'š', 0x9B: '›', 0x9C: 'œ', 0x9E: 'ž', 0x9F: 'Ÿ'};
const dec = s => Array.from(s, c => CP1252[c.charCodeAt(0)] || c).join('');
function pagesPdf(s){
  const obj = {}, re = /(\d+) 0 obj\r?\n([\s\S]*?)\r?\nendobj/g; let m;
  while ((m = re.exec(s))) obj[m[1]] = m[2];
  const racine = Object.values(obj).find(o => /\/Type \/Pages\b/.test(o));
  return /\/Kids \[([^\]]*)\]/.exec(racine)[1].match(/\d+ 0 R/g).map(r => {
    const pg = obj[r.split(' ')[0]], mb = /\/MediaBox \[([^\]]*)\]/.exec(pg) || /\/MediaBox \[([^\]]*)\]/.exec(racine);
    const c = /\/Contents (\d+) 0 R/.exec(pg)[1];
    return {H: +mb[1].trim().split(/\s+/)[3], filtre: /\/Filter/.test(obj[c].split('stream')[0]), flux: /stream\r?\n([\s\S]*?)\r?\nendstream/.exec(obj[c])[1]};
  });
}
function jetons(s){
  const out = [], ESC = {n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', '(': '(', ')': ')', '\\': '\\'};
  let i = 0;
  while (i < s.length){
    const c = s[i];
    if (/\s/.test(c)){ i++; continue; }
    if (c === '('){
      let p = 1, j = i + 1, t = '';
      while (j < s.length){
        const d = s[j];
        if (d === '\\'){
          const e = s[j + 1];
          if (e in ESC){ t += ESC[e]; j += 2; }
          else if (/[0-7]/.test(e)){ let o = ''; j++; while (o.length < 3 && /[0-7]/.test(s[j])) o += s[j++]; t += String.fromCharCode(parseInt(o, 8)); }
          else j += 2;
          continue;
        }
        if (d === '(') p++;
        if (d === ')' && !--p) break;
        t += d; j++;
      }
      out.push({s: t}); i = j + 1; continue;
    }
    if (c === '[' || c === ']'){ out.push({x: c}); i++; continue; }
    if (c === '/'){ let j = i + 1; while (j < s.length && !/[\s\/\[\]()<>]/.test(s[j])) j++; out.push({n: s.slice(i + 1, j)}); i = j; continue; }
    let j = i; while (j < s.length && !/[\s\/\[\]()<>%]/.test(s[j])) j++;
    if (j === i){ out.push({x: c}); i++; continue; }
    const w = s.slice(i, j); out.push(/^[+-]?(\d+\.?\d*|\.\d+)$/.test(w) ? {v: parseFloat(w)} : {op: w}); i = j;
  }
  return out;
}
/* lignes de texte d'une page du flux : départ, ligne de base (mm, y du papier), angle, taille, mode ; err : opérateur de texte non lu */
function lignesFlux(pg){
  const L = []; let pile = [], bt = false, tf = null, tl = 0, tr = 0, M = null, cm = 0;
  const qs = [];
  for (const j of jetons(pg.flux)){
    if (!('op' in j)){ pile.push(j); continue; }
    const op = j.op, n = pile.map(x => x.v);
    if (op === 'q') qs.push(cm);
    else if (op === 'Q') cm = qs.length ? qs.pop() : 0;
    else if (op === 'cm') cm++;
    else if (op === 'BT'){ if (cm) return {err: 'texte sous une transformation (cm)'}; bt = true; M = [1, 0, 0, 1, 0, 0]; }
    else if (op === 'ET') bt = false;
    else if (bt){
      if (op === 'Tf') tf = {pt: n[1]};
      else if (op === 'TL') tl = n[0];
      else if (op === 'Tr') tr = n[0];
      else if (op === 'Td') M = [M[0], M[1], M[2], M[3], M[4] + n[0] * M[0] + n[1] * M[2], M[5] + n[0] * M[1] + n[1] * M[3]];
      else if (op === 'Tm') M = n.slice(0, 6);
      else if (op === 'T*') M = [M[0], M[1], M[2], M[3], M[4] - tl * M[2], M[5] - tl * M[3]];
      else if (op === 'Tj') L.push({t: dec(pile[0].s), x: M[4] * MM, y: (pg.H - M[5]) * MM, ang: Math.atan2(M[1], M[0]) * 180 / Math.PI, pt: tf.pt, mode: tr === 1 ? 'trait' : tr === 0 ? 'plein' : 'autre'});
      else if (!/^(g|rg|k|G|RG|K)$/.test(op)) return {err: 'opérateur de texte non lu : ' + op};
    }
    pile = [];
  }
  return {L};
}
const lignesReleveur = page => [].concat(...page.ordres.filter(o => o.m === 'text').map(o => o.lignes.map(l => Object.assign({pt: o.police.pt, mode: o.mode}, l))));
function ecartLignes(A, B){
  const n = Math.max(A.length, B.length);
  for (let i = 0; i < n; i++){
    const a = A[i], b = B[i];
    if (!a || !b || a.t !== b.t || a.mode !== b.mode || Math.abs(a.x - b.x) > TOL || Math.abs(a.y - b.y) > TOL || Math.abs((a.ang || 0) - (b.ang || 0)) > TOL || Math.abs(a.pt - b.pt) > TOL)
      return 'ligne ' + i + ' : ' + court(a) + ' / ' + court(b) + ' (' + A.length + ' et ' + B.length + ' lignes)';
  }
  return '';
}

/* ---------- faux contexte 2D : note ses appels (avec l'état du moment) et les valeurs données ---------- */
const largeurCtx = t => t.length * 1.7 + 0.5;
function fauxCtx(){
  const j = [], etat = {};
  const P = new Proxy(etat, {
    get(t, k){
      if (k === 'measureText') return s => { j.push({f: k, a: [s]}); return {width: largeurCtx(String(s))}; };
      if (k in t) return t[k];
      if (typeof k !== 'string') return undefined;
      return (...a) => { j.push({f: k, a, e: Object.assign({}, t)}); };
    },
    set(t, k, v){ t[k] = v; j.push({f: '=' + k, a: [v]}); return true; }
  });
  return {ctx: P, j};
}
const VUE = {k: 3.7, x: 12.5, y: -8.25};
function ecartRejeu(page, j, vue){
  const L = lignesReleveur(page).filter(l => l.t), D = j.filter(c => c.f === 'fillText' || c.f === 'strokeText');
  if (L.length !== D.length) return L.length + ' lignes notées, ' + D.length + ' dessinées';
  let tr = null, k = 0;
  for (const c of j){
    if (c.f === 'setTransform') tr = c.a;
    if (c.f !== 'fillText' && c.f !== 'strokeText') continue;
    const l = L[k++], e = l.x * vue.k + vue.x, f = l.y * vue.k + vue.y, sx = Math.hypot(tr[0], tr[1]), ang = Math.atan2(-tr[1], tr[0]) * 180 / Math.PI;
    if (c.a[0] !== l.t || Math.abs(tr[4] - e) > TOL || Math.abs(tr[5] - f) > TOL || Math.abs(sx * largeurCtx(l.t) - l.w * vue.k) > TOL || Math.abs(ang - (l.ang || 0)) > 1e-7)
      return 'ligne ' + (k - 1) + ' « ' + l.t + ' » : transformation ' + court(tr) + ', attendu départ ' + e + ', ' + f + ', largeur ' + l.w * vue.k;
    if ((c.f === 'strokeText') !== (l.mode === 'trait')) return 'ligne ' + (k - 1) + ' « ' + l.t + ' » : ' + c.f + ' pour le mode ' + l.mode;
  }
  return '';
}

/* ---------- contrôles ---------- */
const controles = [];
const ctrl = (nom, fn) => controles.push({nom, fn});

/* (a) ordres du releveur = ordres du vrai jsPDF, toutes pages, dans l'ordre, avec et sans marques */
TEMOINS.forEach(t => ctrl('(a) ' + t.nom + ' : ordres du releveur = ordres de jsPDF, avec et sans marques', () => {
  const s0 = surJsPDF(t, false), s1 = surJsPDF(t, true), r0 = surReleveur(t, false), r1 = surReleveur(t, true);
  const e = ecartOrdres(r0.pages, s0.pages) || ecartOrdres(r1.pages, s0.pages) || ecartOrdres(s1.pages, s0.pages);
  if (e) return [false, e];
  if (r0.res !== r0.rel || r1.res !== r1.rel) return [false, 'pdfPlan ne rend pas le releveur'];
  if (s0.n !== 1) return [false, s0.n + ' documents jsPDF créés'];
  return [true, s0.pages.map(p => p.length).join(' + ') + ' ordres'];
}));
/* le releveur offre exactement ce que pdfPlan lit sur le vrai jsPDF (Proxy, tous les témoins) */
ctrl('(a) le releveur offre exactement les méthodes que pdfPlan appelle sur jsPDF (relevées sur tous les témoins)', () => {
  const lus = new Set();
  TEMOINS.forEach(t => surJsPDF(t, false).noms.forEach(n => lus.add(n)));
  const rel = V.releveurPdf(J0), offre = Object.keys(rel).filter(k => typeof rel[k] === 'function' && k !== 'marque').sort(), lu = [...lus].sort();
  return [offre.join() === lu.join() && lu.length === 27, 'lues : ' + lu.join(' ') + ' ; offertes : ' + offre.join(' ')];
});
ctrl('(a) logo illisible : le releveur lève l\'erreur de jsPDF, que pdfPlan rattrape (mêmes ordres, aucun addImage)', () => {
  const t = {nom: 'logo illisible', d: construit(200), fond: null, o: {mode: 'edl', logo: {data: 'data:image/png;base64,AAAA', ratio: 2, format: 'PNG'}}, sig: SIG};
  const s = surJsPDF(t, false), r = surReleveur(t, true), e = ecartOrdres(r.pages, s.pages), n = r.pages[0].filter(o => o.m === 'addImage').length;
  return [!e && n === 0 && s.pages[0].length > 0, e || n + ' addImage'];
});

/* (b) flux : départ et ligne de base de chaque ligne de texte = ceux du releveur ; largeur imprimée */
TEMOINS.forEach(t => ctrl('(b) ' + t.nom + ' : lignes du flux non compressé = lignes du releveur', () => {
  const s = surJsPDF(t, false, true), r = surReleveur(t, false), P = pagesPdf(s.inst.output());
  if (!P.length || P.some(p => p.filtre)) return [false, 'flux compressé'];
  if (P.length !== r.rel.pages.length) return [false, P.length + ' pages lues, ' + r.rel.pages.length + ' notées'];
  let n = 0;
  for (let i = 0; i < P.length; i++){
    const f = lignesFlux(P[i]);
    if (f.err) return [false, 'page ' + (i + 1) + ' : ' + f.err];
    const e = ecartLignes(f.L, lignesReleveur(r.rel.pages[i]));
    if (e) return [false, 'page ' + (i + 1) + ', ' + e];
    n += f.L.length;
  }
  return [true, n + ' lignes'];
}));
ctrl('(b) largeur imprimée : getStringUnitWidth sans crénage, « AVAVAV » plus large que getTextWidth', () => {
  const r = surReleveur(TEMOINS[3], false), o = r.rel.pages[0].ordres.find(x => x.m === 'text' && x.lignes.some(l => /^AVAVAV/.test(l.t)));
  if (!o) return [false, 'ligne « AVAVAV » absente'];
  const l = o.lignes[0], p = new J0({orientation: 'landscape', unit: 'mm', format: 'a4'});
  p.setFont(o.police.nom, o.police.style); p.setFontSize(o.police.pt);
  const w = p.getStringUnitWidth(l.t, {doKerning: false}) * o.police.pt * MM, g = p.getTextWidth(l.t);
  return [Math.abs(l.w - w) <= TOL && l.w > g + 0.1, 'largeur notée ' + l.w + ', sans crénage ' + w + ', getTextWidth ' + g];
});
ctrl('(b) signature alignée à droite : départ du flux = 290 − largeur imprimée (et non 290 − getTextWidth)', () => {
  const t = TEMOINS[3], s = surJsPDF(t, false, true), r = surReleveur(t, false);
  const l = lignesReleveur(r.rel.pages[0]).find(x => x.t === SIG), f = (lignesFlux(pagesPdf(s.inst.output())[0]).L || []).find(x => x.t === SIG);
  if (!l || !f) return [false, 'signature absente'];
  const p = new J0({orientation: 'landscape', unit: 'mm', format: 'a4'}); p.setFontSize(6.5);
  return [Math.abs(f.x + l.w - 290) <= TOL && Math.abs(f.x + p.getTextWidth(SIG) - 290) > 0.05, 'départ ' + f.x + ', largeur ' + l.w + ', getTextWidth ' + p.getTextWidth(SIG)];
});

/* (c) rejeu sur un faux contexte 2D */
ctrl('(c) rejeu des pages 1 et 2 : départ, ligne de base et largeur dessinée = releveur × k + décalage, halo en strokeText', () => {
  const r = surReleveur(TEMOINS[3], false), msg = [];
  for (const i of [0, 1]){
    const f = fauxCtx(); V.rejouerPage(f.ctx, r.rel.pages[i], VUE);
    const e = ecartRejeu(r.rel.pages[i], f.j, VUE); if (e) return [false, 'page ' + (i + 1) + ', ' + e];
    msg.push(f.j.filter(c => c.f === 'fillText' || c.f === 'strokeText').length + ' textes');
  }
  return [true, msg.join(', ')];
});
ctrl('(c) halo : épaisseur notée × k au moment du strokeText, un par ligne en mode trait', () => {
  const r = surReleveur(TEMOINS[3], false), pg = r.rel.pages[0], f = fauxCtx(); V.rejouerPage(f.ctx, pg, VUE);
  const T = pg.ordres.filter(o => o.m === 'text' && o.mode === 'trait'), S = f.j.filter(c => c.f === 'strokeText');
  const L = [].concat(...T.map(o => o.lignes.filter(l => l.t).map(() => o.ep)));
  if (!L.length || L.length !== S.length) return [false, L.length + ' lignes en trait, ' + S.length + ' strokeText'];
  const k = S.findIndex((c, i) => Math.abs(c.e.lineWidth - L[i] * VUE.k) > TOL);
  return [k < 0, k < 0 ? S.length + ' halos' : 'halo ' + k + ' : épaisseur ' + S[k].e.lineWidth + ' au lieu de ' + L[k] * VUE.k];
});
ctrl('(c) découpe au cadre (rect, clip, chemin vidé) et save/restore appariés', () => {
  const r = surReleveur(TEMOINS[3], false), pg = r.rel.pages[0], f = fauxCtx(); V.rejouerPage(f.ctx, pg, VUE);
  const i = f.j.findIndex(c => c.f === 'clip'), rc = f.j.slice(0, i).reverse().find(c => c.f === 'rect');
  const bon = rc && egal(rc.a, [7 * VUE.k + VUE.x, 7 * VUE.k + VUE.y, 205 * VUE.k, 192 * VUE.k]) && f.j[i + 1] && f.j[i + 1].f === 'beginPath';
  let p = 0, neg = false; f.j.forEach(c => { if (c.f === 'save') p++; if (c.f === 'restore'){ p--; if (p < 0) neg = true; } });
  const nS = f.j.filter(c => c.f === 'save').length, nG = pg.ordres.filter(o => o.m === 'saveGraphicsState').length;
  const nC = f.j.filter(c => c.f === 'clip').length, nCo = pg.ordres.filter(o => o.m === 'clip').length;
  return [!!bon && !neg && p === 0 && nS === nG + 1 && nC === nCo && nC > 0, 'rect ' + court(rc && rc.a) + ', profondeur finale ' + p + ', save ' + nS + ' pour ' + nG + ' ordres, clip ' + nC + '/' + nCo];
});
/* tracés attendus d'une page : appels de chemin et de peinture (beginPath à part), coordonnées × k + décalage ; styles de jsPDF : null ne
   peint pas, F et f remplissent, f* en pair-impair, FD, DF et B remplissent puis tracent, B* aussi en pair-impair, les autres tracent */
function tracesAttendus(page, v){
  const X = x => x * v.k + v.x, Y = y => y * v.k + v.y, out = [];
  const peindre = st => {
    if (st === null) return;
    if (st === 'F' || st === 'f') out.push(['fill']);
    else if (st === 'f*') out.push(['fill', 'evenodd']);
    else if (st === 'FD' || st === 'DF' || st === 'B') out.push(['fill'], ['stroke']);
    else if (st === 'B*') out.push(['fill', 'evenodd'], ['stroke']);
    else out.push(['stroke']);
  };
  page.ordres.forEach(({m, a}) => {
    if (m === 'rect'){ out.push(['rect', X(a[0]), Y(a[1]), a[2] * v.k, a[3] * v.k]); peindre(a[4]); }
    else if (m === 'line'){ out.push(['moveTo', X(a[0]), Y(a[1])], ['lineTo', X(a[2]), Y(a[3])]); peindre(a[4] || 'S'); }
    else if (m === 'circle'){ out.push(['moveTo', X(a[0]) + a[2] * v.k, Y(a[1])], ['arc', X(a[0]), Y(a[1]), a[2] * v.k, 0, 2 * Math.PI, true]); peindre(a[3]); }
    else if (m === 'triangle'){ out.push(['moveTo', X(a[0]), Y(a[1])], ['lineTo', X(a[2]), Y(a[3])], ['lineTo', X(a[4]), Y(a[5])], ['lineTo', X(a[0]), Y(a[1])], ['closePath']); peindre(a[6]); }
    else if (m === 'lines'){
      let [L, x, y, s] = a; s = s || [1, 1];
      out.push(['moveTo', X(x), Y(y)]);
      L.forEach(g => {
        if (g.length === 2){ x = g[0] * s[0] + x; y = g[1] * s[1] + y; out.push(['lineTo', X(x), Y(y)]); return; }
        const x2 = g[0] * s[0] + x, y2 = g[1] * s[1] + y, x3 = g[2] * s[0] + x, y3 = g[3] * s[1] + y;
        x = g[4] * s[0] + x; y = g[5] * s[1] + y; out.push(['bezierCurveTo', X(x2), Y(y2), X(x3), Y(y3), X(x), Y(y)]);
      });
      if (a[5]) out.push(['closePath']);
      peindre(a[4]);
    }
    else if (m === 'clip') out.push(['clip', a[0] === 'evenodd' ? 'evenodd' : 'nonzero']);
  });
  return out;
}
const TRACES = new Set(['rect', 'moveTo', 'lineTo', 'arc', 'bezierCurveTo', 'closePath', 'fill', 'stroke', 'clip']);
ctrl('(c) tracés rejoués : rect, line, circle, triangle et lines aux coordonnées × k + décalage, peints selon leur style', () => {
  const vus = {}, msg = [];
  for (const t of [TEMOINS[1], TEMOINS[3]]){
    const r = surReleveur(t, false);
    for (let i = 0; i < r.rel.pages.length; i++){
      const pg = r.rel.pages[i], f = fauxCtx(); V.rejouerPage(f.ctx, pg, VUE);
      const A = tracesAttendus(pg, VUE), D = f.j.filter(c => TRACES.has(c.f)).map(c => [c.f, ...c.a]);
      const k = A.findIndex((x, j) => !egal(x, D[j]));
      if (k >= 0 || A.length !== D.length) return [false, t.nom + ', page ' + (i + 1) + ', appel ' + (k >= 0 ? k : A.length) + ' : attendu ' + court(A[k >= 0 ? k : A.length]) + ', rejoué ' + court(D[k >= 0 ? k : A.length])];
      pg.ordres.forEach(o => { vus[o.m] = (vus[o.m] || 0) + 1; });
      msg.push(A.length);
    }
  }
  const sortes = ['rect', 'line', 'circle', 'triangle', 'lines'], manque = sortes.filter(s => !vus[s]);
  return [!manque.length, manque.length ? 'sortes absentes des témoins : ' + manque.join(', ') : msg.join(' + ') + ' appels ; ' + sortes.map(s => s + ' ' + vus[s]).join(', ')];
});
ctrl('(c) logo : rien tant que l\'image n\'est pas chargée (promesse : false), puis drawImage à sa place (promesse : true)', async () => {
  const r = surReleveur(TEMOINS[3], false), pg = r.rel.pages[0], o = pg.ordres.find(x => x.m === 'addImage');
  if (!o) return [false, 'aucun addImage noté'];
  class FausseImage { set src(v){ this.s = v; setTimeout(() => { this.width = 4; this.height = 2; if (this.onload) this.onload(); }, 5); } get src(){ return this.s; } }
  const I0 = ctx.Image; ctx.Image = FausseImage;
  try {
    const f1 = fauxCtx(), p1 = await V.rejouerPage(f1.ctx, pg, VUE), d1 = f1.j.filter(c => c.f === 'drawImage').length;
    const f2 = fauxCtx(), p2 = await V.rejouerPage(f2.ctx, pg, VUE), d2 = f2.j.filter(c => c.f === 'drawImage');
    const a = o.a, bon = p1 === false && d1 === 0 && p2 === true && d2.length === 1 && d2[0].a[0].src === LOGO.data
      && egal(d2[0].a.slice(1), [a[2] * VUE.k + VUE.x, a[3] * VUE.k + VUE.y, a[4] * VUE.k, a[5] * VUE.k]);
    return [bon, 'premier rejeu : ' + p1 + ', ' + d1 + ' image ; second : ' + p2 + ', ' + court(d2.map(c => c.a.slice(1)))];
  } finally { ctx.Image = I0; }
});

/* (d) marques */
const CONS = [TEMOINS[3], TEMOINS[4]];
const marquesDe = t => surReleveur(t, true).rel.marques;
ctrl('(d) sans o.marque : aucune marque, aucun ordre marqué, pas de segments', () => {
  const bon = TEMOINS.every(t => { const r = surReleveur(t, false).rel; return r.marques.length === 0 && r.segs == null && r.pages.every(p => p.ordres.every(o => o.mq === -1)); });
  return [bon, ''];
});
ctrl('(d) une seule marque par étiquette, texte libre, symbole et bulle ; ses ordres sont ceux qui la citent, d\'un seul tenant', () => {
  for (const t of TEMOINS){
    const rel = surReleveur(t, true).rel, vus = new Set();
    for (const [i, m] of rel.marques.entries()){
      const c = m.k + '|' + (m.k === 'bulle' ? m.cle : m.k === 'fixe' ? m.cle : m.id);
      if (vus.has(c)) return [false, t.nom + ' : marque en double ' + c];
      vus.add(c);
      const pg = rel.pages[m.page - 1], cit = pg.ordres.map((o, j) => o.mq === i ? j : -1).filter(j => j >= 0);
      if (!m.ordres.length || m.ordres.join() !== cit.join() || m.ordres[m.ordres.length - 1] - m.ordres[0] !== m.ordres.length - 1)
        return [false, t.nom + ' : ordres de la marque ' + c + ' : ' + m.ordres.join(',') + ' / ' + cit.join(',')];
    }
    if (!['nord', 'echelle', 'mention'].every(k => vus.has('fixe|' + k))) return [false, t.nom + ' : éléments fixes sans marque'];
  }
  return [true, ''];
});
ctrl('(d) symboles : une marque par objet dessiné, centre, rayon et forme ; croix « à supprimer » dans la marque', () => {
  for (const t of CONS){
    const M = marquesDe(t).filter(m => m.k === 'symb'), avp = t.o.mode === 'avp';
    const attendus = t.d.el.filter(e => e.k === 'pt' && e.t !== 'zone' && (avp || e.p.st !== 'projet')).map(e => e.id).sort();
    if (M.map(m => m.id).sort().join() !== attendus.join()) return [false, t.nom + ' : ' + M.map(m => m.id).sort().join() + ' / ' + attendus.join()];
    const w = M.find(m => m.id === 'W'), b = M.find(m => m.id === 'B1');
    if (!w || w.forme !== 'disque' || Math.abs(w.R - 1.9) > TOL || !b || b.forme !== 'carre' || Math.abs(b.R - 1.9) > TOL) return [false, t.nom + ' : forme ou rayon ' + court([w, b])];
    const fs = M.find(m => m.id === 'Fs'), pg = surReleveur(t, true).rel.pages[0], der = fs.ordres.slice(-2).map(j => pg.ordres[j].m);
    if (avp !== (der.join() === 'line,line' && pg.ordres[fs.ordres[fs.ordres.length - 3]].m === 'setLineWidth')) return [false, t.nom + ' : croix « à supprimer » ' + der.join()];
  }
  return [true, ''];
});
ctrl('(d) étiquettes et textes libres : une marque par élément imprimé, son texte, sa boîte et sa taille', () => {
  for (const t of CONS){
    const d = copie(t.d), an = V.analyser(d, t.o.mode), rel = surReleveur(t, true).rel, M = rel.marques.filter(m => m.k === 'etiq' || m.k === 'tx');
    const vis = e => e.k === 'tx' || (t.o.mode === 'avp' || e.p.st !== 'projet');
    const attendus = d.el.filter(e => vis(e) && V.texteEtiquette(e, an) && !(e.k !== 'tx' && e.lab && e.lab.off)).map(e => e.id).sort();
    if (M.map(m => m.id).sort().join() !== attendus.join()) return [false, t.nom + ' : ' + M.map(m => m.id).sort().join() + ' / ' + attendus.join()];
    for (const m of M){
      const e = d.el.find(x => x.id === m.id), pg = rel.pages[m.page - 1], T = m.ordres.map(j => pg.ordres[j]).filter(o => o.m === 'text');
      const plein = [].concat(...T.filter(o => o.mode === 'plein').map(o => o.lignes.map(l => l.t))).join('\n');
      if (plein !== V.pdfTxt(V.texteEtiquette(e, an))) return [false, t.nom + ' : texte de ' + m.id + ' « ' + plein + ' »'];
      if (m.k !== (e.k === 'tx' ? 'tx' : 'etiq') || !(m.w > 0 && m.h > 0 && m.em > 0) || T.some(o => Math.abs(o.police.pt * MM - m.em) > 1e-3)) return [false, t.nom + ' : boîte ou taille de ' + m.id + ' ' + court(m)];
      if (T.filter(o => o.mode === 'trait').length !== T.filter(o => o.mode === 'plein').length) return [false, t.nom + ' : halo de ' + m.id];
    }
  }
  return [true, ''];
});
ctrl('(d) bulles : une marque par anomalie numérotée, disque de TAILLE_BULLE et numéro', () => {
  for (const t of CONS){
    const d = copie(t.d), an = V.analyser(d, t.o.mode), L = t.o.mode === 'avp' ? V.anomaliesDoc(d, an.ref) : V.anomaliesDoc(d, an), rel = surReleveur(t, true).rel;
    const att = L.filter(a => a.num && a.objId).map(a => a.cle).sort(), M = rel.marques.filter(m => m.k === 'bulle');
    if (!att.length || M.map(m => m.cle).sort().join() !== att.join()) return [false, t.nom + ' : ' + M.map(m => m.cle).sort().join() + ' / ' + att.join()];
    for (const m of M){
      const pg = rel.pages[m.page - 1], O = m.ordres.map(j => pg.ordres[j]), c = O.filter(o => o.m === 'circle'), x = O.filter(o => o.m === 'text');
      if (c.length !== 1 || Math.abs(c[0].a[2] - 2.1) > TOL || c[0].a[3] !== 'FD' || Math.abs(c[0].a[0] - m.cx) > TOL || x.length !== 1 || x[0].lignes[0].t !== String(m.num))
        return [false, t.nom + ' : bulle ' + m.cle + ' ' + court(O.map(o => o.m))];
    }
  }
  return [true, ''];
});
ctrl('(d) statuts : « main » (étiquette déplacée, texte libre, bulle gardée), « office », « collecteur » avec son morceau visible', () => {
  const M = marquesDe(TEMOINS[3]), q = (k, id) => M.find(m => m.k === k && (m.id === id || m.cle === id));
  const w = q('etiq', 'Ev'), x = q('tx', 'X1'), r1 = q('etiq', 'R1'), c1 = q('etiq', 'C1'), b1 = q('bulle', 'm1'), bo = M.filter(m => m.k === 'bulle' && m.cle !== 'm1');
  const bon = w && w.statut === 'main' && x && x.statut === 'main' && r1 && r1.statut === 'office' && r1.support === null && c1 && c1.statut === 'collecteur'
    && c1.support && ['x0', 'y0', 'x1', 'y1', 'ux', 'uy'].every(k => typeof c1.support[k] === 'number') && b1 && b1.statut === 'main' && bo.length > 0 && bo.every(m => m.statut === 'office');
  return [!!bon, court([w, x, r1, c1, b1].map(m => m && m.statut)) + ' ; autres bulles ' + court(bo.map(m => m.statut))];
});
ctrl('(d) statut « ecart » (champ écrit à partir de P3) : étiquette et bulle qui le portent ; « main » l\'emporte ; aucun ordre ne change', () => {
  /* plan construit de (e) : A garde sa place sans main, B avec main ; une bulle gardée sur chacun ; ecart sur toutes ou sur aucune */
  const o = [['A', 'regard', -5, 0, {etiq: 'Regard A fictif'}], ['B', 'regard', 5, 0, {etiq: 'Regard B fictif'}]];
  const pose = ec => d => {
    const e = ec ? {ecart: true} : {};
    lab(d, 'A', Object.assign({dx: 0, dy: 1.5}, e)); lab(d, 'B', Object.assign({dx: 0, dy: 1.5, main: true}, e));
    d.anomManu = [manu('A', Object.assign({dx: 0.6, dy: -0.6}, e)), Object.assign(manu('B', {dx: -0.6, dy: -0.6}), {id: 'm2'})];
  };
  const p = plan(o, pose(true)), q = plan(o, pose(false)), st = (P, k, id) => (P.rel.marques[P.i(k, id)] || {}).statut;
  const vus = [st(p, 'etiq', 'A'), st(p, 'etiq', 'B'), st(p, 'bulle', 'm1'), st(p, 'bulle', 'm2'), st(q, 'etiq', 'A'), st(q, 'etiq', 'B'), st(q, 'bulle', 'm1')];
  const ord = P => P.rel.pages.map(g => g.ordres.map(x => ({m: x.m, a: x.a}))), e = ecartOrdres(ord(p), ord(q));
  return [vus.join() === 'ecart,main,ecart,main,office,main,main' && !e, vus.join() + (e ? ' ; ' + e : '')];
});
ctrl('(d) segments des traits gardés à part (rel.segs), sans ouvrir de marque', () => {
  const rel = surReleveur(TEMOINS[3], true).rel, ids = new Set(TEMOINS[3].d.el.filter(e => e.k === 'ln' && e.p.st !== 'projet').map(e => e.id));
  const bon = Array.isArray(rel.segs) && rel.segs.length > 0 && rel.segs.every(s => s.length === 5 && ids.has(s[4]) && s.slice(0, 4).every(Number.isFinite))
    && !rel.marques.some(m => m.k === 'segs');
  return [bon, (rel.segs || []).length + ' segments'];
});

/* (e) chevauchements de plans construits (1/200, sans rotation, état des lieux) */
function plan(o, prep){
  const d = doc({o}); prep && prep(d); Object.assign(d, {echelle: 200, rot: 0});
  const rel = V.releveurPdf(J0, {strict: true});
  fige(() => V.pdfPlan(d, null, {mode: 'edl', cible: rel, marque: rel.marque}));
  return {rel, c: V.chevauchementsPlan(rel), i: (k, id) => rel.marques.findIndex(m => m.k === k && (m.id === id || m.cle === id))};
}
const manu = (objId, bulle) => ({id: 'm1', objId, reseau: 'EU', obs: 'Anomalie fictive', preco: '', nc: true, st: 'retenue', bulle});
const dit = c => court(c.paires) + ' ; coupes ' + court(c.coupes);
/* taille du texte d'une marque en mm (em d'A17) : celle que pdfPlan donne à la bibliothèque (pt × 25,4 / 72) */
const emDe = (p, i) => { const m = p.rel.marques[i], pg = p.rel.pages[m.page - 1]; return m.ordres.map(j => pg.ordres[j]).find(o => o.m === 'text').police.pt * MM; };
/* deux regards à 2 mm l'un de l'autre, étiquettes placées à la main au-dessus, celle de B à dyB (en m ; celle de A à 1,5 m) */
const deux = (ta, tb, dyB) => plan([['A', 'regard', 0, 0, {etiq: ta}], ['B', 'regard', 0.4, 0, {etiq: tb}]],
  d => { lab(d, 'A', {dx: 0, dy: 1.5, main: true}); lab(d, 'B', {dx: 0, dy: dyB, main: true}); });
/* une seule paire, entre les étiquettes de A et de B, de pénétration attendue (h × em, à 1e-9), et aucune coupe */
function paireAB(p, h){
  const a = p.i('etiq', 'A'), b = p.i('etiq', 'B'), pr = p.c.paires.filter(x => x.a === a && x.b === b), em = a >= 0 ? emDe(p, a) : NaN;
  return [a >= 0 && b > a && pr.length === 1 && Math.abs(pr[0].p - h * em) < 1e-9 && p.c.paires.length === 1 && !p.c.coupes.length, dit(p.c) + ' ; em ' + em];
}
ctrl('(e) deux étiquettes qui se chevauchent : une paire, p = 1,21 em (ligne de 0,72 + 0,21 em, halo de 0,14 em de chaque côté)', () =>
  paireAB(deux('Regard A fictif', 'Regard B fictif', 1.5), 1.21));
ctrl('(e) deux étiquettes à capitale accentuée qui se chevauchent : p = 1,42 em (0,93 + 0,21 em et le halo)', () =>
  paireAB(deux('École A fictive', 'École B fictive', 1.5), 1.42));
ctrl('(e) seuil de 0,3 mm entre deux étiquettes : 0,25 mm de recouvrement ne compte pas, 0,35 mm compte', () => {
  /* l'étiquette de B plus bas de 1,21 em − q (au 1/200, 0,2 m par mm de papier) : les deux boîtes se recouvrent de q en hauteur */
  const p0 = deux('Regard A fictif', 'Regard B fictif', 1.5), em = emDe(p0, p0.i('etiq', 'A'));
  const r = [0.25, 0.35].map(q => deux('Regard A fictif', 'Regard B fictif', 1.5 - (1.21 * em - q) * 0.2));
  const ab = p => p.c.paires.filter(x => x.a === p.i('etiq', 'A') && x.b === p.i('etiq', 'B'));
  return [ab(r[0]).length === 0 && ab(r[1]).length === 1 && Math.abs(ab(r[1])[0].p - 0.35) < 1e-9 && r.every(p => p.c.paires.length === ab(p).length && !p.c.coupes.length),
    r.map(p => dit(p.c)).join(' / ')];
});
ctrl('(e) boîte d\'une ligne : de la ligne de base − 0,72 em (− 0,93 em avec une capitale accentuée) à + 0,21 em, de x à x + largeur imprimée, 0,14 em de plus avec le halo', () => {
  /* sur un releveur, une ligne écrite à la main (8 pt) et quatre sondes (bulles : disques de 2,225 mm) qui y entrent de 0,6 mm par le
     haut, le bas, la gauche et la droite */
  const ecarts = [];
  for (const [t, haut, halo] of [['Texte fictif', .72, false], ['Été fictif', .93, false], ['Texte fictif', .72, true]]){
    const r = V.releveurPdf(J0, {strict: true}), em = 8 * MM, h = halo ? .14 * em : 0, q = 0.6, D = 2.225 - q;
    r.marque({k: 'etiq', id: 'T'}); r.setFontSize(8);
    if (halo){ r.setLineWidth(.28 * em); r.text(t, 60, 100, {renderingMode: 'stroke'}); }
    r.text(t, 60, 100); r.marque(null);
    const l = r.pages[0].ordres.filter(o => o.m === 'text').pop().lignes[0];
    [[l.x + l.w / 2, l.y - haut * em - h - D], [l.x + l.w / 2, l.y + .21 * em + h + D], [l.x - h - D, l.y - .25 * em], [l.x + l.w + h + D, l.y - .25 * em]]
      .forEach(([cx, cy], k) => { r.marque({k: 'bulle', cle: 's' + k, cx, cy, r: 2.1}); r.marque(null); });
    const c = V.chevauchementsPlan(r);
    if (c.paires.length !== 4 || c.paires.some((x, k) => x.a !== 0 || x.b !== k + 1 || Math.abs(x.p - q) > 1e-9) || c.coupes.length) ecarts.push(t + (halo ? ' (halo)' : '') + ' : ' + dit(c));
  }
  return [!ecarts.length, ecarts.join(' ; ')];
});
ctrl('(e) une étiquette sur le « N » : une paire avec la rose du nord ; symbole hors du cadre ignoré', () => {
  const p = plan([['Hn', 'regard', 21.1, 18.7, {etiq: 'Regard N'}], ['Hs', 'regard', -21.1, -18.7]], d => lab(d, 'Hn', {dx: -2.8, dy: 0}));
  const a = p.i('etiq', 'Hn'), b = p.i('fixe', 'nord');
  return [a >= 0 && b > a && p.c.paires.length === 1 && p.c.paires[0].a === a && p.c.paires[0].b === b && p.c.paires[0].p > 0.3 && !p.c.coupes.length, dit(p.c)];
});
ctrl('(e) une bulle coupée par le cadre : comptée à part ; le symbole hors du cadre ne compte pas', () => {
  const p = plan([['Bc', 'regard', 20.6, 0.6], ['Bs', 'regard', -20.6, -0.6]], d => { d.anomManu = [manu('Bc', {dx: -0.3, dy: 0})]; });
  const b = p.i('bulle', 'm1'), cp1 = p.c.coupes.filter(x => x.i === b);
  return [b >= 0 && cp1.length === 1 && Math.abs(cp1[0].d - 1.225) < 1e-6 && !p.c.paires.some(x => x.a === b || x.b === b), dit(p.c)];
});
ctrl('(e) seuil de 0,3 mm au cadre : une bulle qui en sort de 0,25 mm ne compte pas, de 0,35 mm elle est coupée', () => {
  /* le regard est à 0,5 mm au-delà du bord droit : la bulle (2,225 mm de rayon) sort du cadre de 2,725 + dx / 0,2 mm */
  const r = [-0.495, -0.475].map(dx => {
    const p = plan([['Bc', 'regard', 20.6, 0.6], ['Bs', 'regard', -20.6, -0.6]], d => { d.anomManu = [manu('Bc', {dx, dy: 0})]; }), b = p.i('bulle', 'm1');
    return {p, b, cp: p.c.coupes.filter(x => x.i === b)};
  });
  return [r.every(x => x.b >= 0 && !x.p.c.paires.some(y => y.a === x.b || y.b === x.b)) && r[0].cp.length === 0 && r[1].cp.length === 1 && Math.abs(r[1].cp[0].d - 0.35) < 1e-9,
    r.map(x => dit(x.p.c)).join(' / ')];
});
ctrl('(e) une bulle en diagonale d\'un appareil proche, sans le toucher : ne compte pas', () => {
  const p = plan([['Wc', 'wc', 0, 0]], d => { d.anomManu = [manu('Wc', {dx: 0.608, dy: -0.608})]; });
  const b = p.i('bulle', 'm1'), s = p.i('symb', 'Wc'), m = p.rel.marques[b];
  const D = m && Math.hypot(m.cx - m.A.x, m.cy - m.A.y);
  return [b >= 0 && s >= 0 && D > 4.2 && D < 1.9 + 2.225 + 0.3 && !p.c.paires.some(x => x.a === s || x.b === s), 'distance ' + D + ' ; ' + dit(p.c)];
});
ctrl('(e) un plan sans chevauchement : rien', () => {
  const p = plan([['A', 'regard', -5, 0, {etiq: 'Regard fictif'}], ['B', 'regard', 5, 0, {etiq: 'Regard fictif'}]], d => { lab(d, 'A', null); lab(d, 'B', null); });
  return [p.i('etiq', 'A') >= 0 && p.i('etiq', 'B') >= 0 && !p.c.paires.length && !p.c.coupes.length, dit(p.c)];
});
ctrl('(e) deux symboles qui se touchent : ne comptent pas', () => {
  const p = plan([['A', 'regard', 0, 0], ['B', 'regard', 0.5, 0]]), a = p.i('symb', 'A'), b = p.i('symb', 'B');
  return [a >= 0 && b >= 0 && !p.c.paires.some(x => (x.a === a || x.a === b) && (x.b === a || x.b === b)), dit(p.c)];
});

/* (f) mode strict */
const leve = fn => { try { fn(); return false; } catch (e){ return true; } };
ctrl('(f) strict : une option de text() inconnue lève une erreur (angle, renderingMode, align admis)', () => {
  const r = V.releveurPdf(J0, {strict: true});
  return [leve(() => r.text('a', 1, 2, {maxWidth: 5})) && !leve(() => r.text('a', 1, 2, {angle: 0, renderingMode: 'stroke', align: 'right'})), ''];
});
ctrl('(f) strict : une méthode absente lève une erreur ; sans strict, l\'appel est noté tel quel', () => {
  const r = V.releveurPdf(J0, {strict: true}), s = V.releveurPdf(J0);
  const bon = leve(() => r.ellipse(1, 2, 3, 4)) && !leve(() => s.ellipse(1, 2, 3, 4)) && egal(s.pages[0].ordres.map(o => [o.m, o.a]), [['ellipse', [1, 2, 3, 4]]]);
  return [bon, ''];
});
ctrl('(f) strict : plusieurs lignes tournées, un alignement inconnu, une marque dans une marque lèvent une erreur', () => {
  const r = V.releveurPdf(J0, {strict: true});
  const bon = leve(() => r.text(['a', 'b'], 1, 2, {angle: 30})) && leve(() => r.text('a', 1, 2, {align: 'justify'})) && leve(() => { r.marque({k: 'tx', id: 'x'}); r.marque({k: 'tx', id: 'y'}); });
  return [bon, ''];
});
ctrl('(f) arguments que jsPDF refuse (tracés, pointillé, bouts, jonctions) : la même erreur que lui, avec ou sans strict, sans rien noter', () => {
  const REFUS = [['rect', [1, 2, NaN, 4, 'S']], ['rect', [1, 2, 3, 4, 'X']], ['circle', [1, undefined, 3]], ['line', [1, 2, 3, 4, 'Z']],
    ['triangle', [1, 2, 3, 4, 5, NaN, 'F']], ['lines', [[[1, 2]], 1, 2, [1, 1], 'S', 1]], ['lines', ['x', 1, 2]], ['lines', [1, 2, [[1, 2]], 'n']],
    ['setLineDashPattern', ['a', 0]], ['setLineDashPattern', [[1], 'b']], ['setLineCap', ['pointu']], ['setLineJoin', [7]]];
  const ADMIS = [['rect', [1, 2, 3, 4, null]], ['circle', [1, 2, 3]], ['line', ['1', 2, 3, 4, 'D']], ['triangle', [1, 2, 3, 4, 5, 6, 'f*']],
    ['lines', [[[1, 2], [1, 2, 3, 4, 5, 6]], 1, 2]], ['lines', [1, 2, [[1, 2]], [1, 1], 'B*', true]], ['setLineDashPattern', []], ['setLineCap', ['round']], ['setLineJoin', [2]]];
  const msg = fn => { try { fn(); return null; } catch (e){ return e.message; } };
  for (const strict of [true, false]) for (const c of REFUS.concat(ADMIS)){
    const [m, a] = c, j = new J0({orientation: 'landscape', unit: 'mm', format: 'a4'}), r = V.releveurPdf(J0, {strict}), refuse = REFUS.includes(c);
    const ej = msg(() => j[m](...a)), er = msg(() => r[m](...a)), n = r.pages[0].ordres.length;
    if (ej !== er || !!ej !== refuse || n !== (refuse ? 0 : 1)) return [false, (strict ? 'strict, ' : '') + m + ' ' + court(a) + ' : jsPDF « ' + ej + ' », releveur « ' + er + ' », ' + n + ' ordre(s)'];
  }
  return [true, REFUS.length + ' refus et ' + ADMIS.length + ' cas admis'];
});

(async () => {
  for (const c of controles){
    let r;
    try { r = await c.fn(); } catch (e){ r = [false, 'exception : ' + e.message + ' ' + ((e.stack || '').split('\n')[1] || '').trim()]; }
    R.ok(r[0], c.nom + (r[1] ? ' — ' + r[1] : ''));
  }
  R.fin();
})();
