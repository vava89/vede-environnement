// Moteur de l'aperçu du plan (m167 ; A1 à A4 et A17 de la conception de l'aperçu) : pdfPlan dessine sur un releveur (o.cible) qui note
// chaque ordre du plan PDF sur sa page, avec des marques (o.marque) autour des étiquettes, textes libres, bulles, symboles et éléments fixes ;
// rejouerPage rejoue une page sur un contexte 2D ; chevauchementsPlan compte les recouvrements de la page 1. Contrôles :
// (a) témoins du livrable : les ordres du releveur sont ceux du vrai jsPDF (espion du premier niveau), toutes pages, avec et sans marques,
// logo illisible compris ;
// (b) flux : départ et ligne de base de chaque ligne de texte, lus dans le PDF non compressé, égaux à ceux du releveur ; largeur imprimée ;
// (c) rejeu sur un faux contexte 2D (textes, halo, découpe au cadre, tracés et leur peinture, logo) ; (d) marques et leurs statuts
// (« ecart » compris) ; (e) chevauchements de plans construits : recouvrement exact, boîte d'une ligne, seuils de 0,3 mm ;
// (f) mode strict du releveur ; arguments que jsPDF refuse : la même erreur que lui, avec ou sans strict ;
// (g) ce que chevauchementsPlan rend aussi pour l'interface de l'aperçu (m168) : le cadre de dessin et la forme de chaque marque.
// (h) positions propres à chaque plan (m169 ; P2, 1re partie) : lectures (posOk, propreAvp, labPlan, decalPlan, bullePlan, echellePlan) ;
// l'avant-projet à ses places propres (étiquettes, textes libres, bulles, échelle), l'état des lieux inchangé ; obstacles ; ecrirePos (gel
// à la première écriture sur l'état des lieux, refus) ; menagePlans, reporterProjet, tournerPlans, reposerPropre ; DXF d'un texte décalé ;
// dansCadrePage (idempotente, la même que dans pdfPlan). Sur 0e3a9e8 (avant m169) : 47/64 ; des dix-huit contrôles nouveaux de (h),
// seule la garde de (h) i passe ; après : 64/64.
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

/* (g) ce que l'interface de l'aperçu lit dans le retour de chevauchementsPlan (m168) : cadre (repères) et formes (choix, surlignage,
   centrage du parcours) */
const CADRE_PDF = [7, 7, 212, 199];
/* boîte englobante des morceaux d'une forme ({c: [x, y, r]} ou {b: [x0, y0, x1, y1]}) */
const bornes = F => F.reduce((b, f) => { const q = f.c ? [f.c[0] - f.c[2], f.c[1] - f.c[2], f.c[0] + f.c[2], f.c[1] + f.c[2]] : f.b;
  return [Math.min(b[0], q[0]), Math.min(b[1], q[1]), Math.max(b[2], q[2]), Math.max(b[3], q[3])]; }, [Infinity, Infinity, -Infinity, -Infinity]);
const chevDe = t => { const rel = surReleveur(t, true).rel; return {rel, c: V.chevauchementsPlan(rel)}; };
ctrl('(g) cadre : [7, 7, 212, 199] sur la démonstration et sur le croquis construit, et faute de découpe (releveur écrit à la main)', () => {
  const r = TEMOINS.map(t => chevDe(t).c.cadre), m = V.releveurPdf(J0, {strict: true});
  m.setFontSize(8); m.marque({k: 'etiq', id: 'T'}); m.text('Texte fictif', 60, 100); m.marque(null);
  r.push(V.chevauchementsPlan(m).cadre);
  return [r.every(c => egal(c, CADRE_PDF)), court(r)];
});
ctrl('(g) formes : une entrée par marque ; null en page 2 et pour un symbole dont le centre est hors du cadre (« Lo »), présente sinon', () => {
  const ecarts = [];
  /* une étiquette en page 1, une en page 2 */
  const r = V.releveurPdf(J0, {strict: true});
  r.setFontSize(8); r.marque({k: 'etiq', id: 'T'}); r.text('Texte fictif', 60, 100); r.marque(null);
  r.addPage(); r.setFontSize(8); r.marque({k: 'etiq', id: 'U'}); r.text('Texte fictif', 60, 100); r.marque(null);
  const c = V.chevauchementsPlan(r);
  if (!Array.isArray(c.formes) || c.formes.length !== 2 || !c.formes[0] || c.formes[1] !== null || r.marques[1].page !== 2) ecarts.push('page 2 : ' + court(c.formes));
  for (const t of TEMOINS){
    const {rel, c: cc} = chevDe(t);
    if (!Array.isArray(cc.formes) || cc.formes.length !== rel.marques.length){ ecarts.push(t.nom + ' : ' + (cc.formes ? cc.formes.length : 'aucune') + ' formes pour ' + rel.marques.length + ' marques'); continue; }
    rel.marques.forEach((m, i) => {
      const attendue = m.page === 1 && (m.k !== 'symb' || (m.A.x >= 7 && m.A.x <= 212 && m.A.y >= 7 && m.A.y <= 199));
      if (attendue !== (Array.isArray(cc.formes[i]) && cc.formes[i].length > 0) || (!attendue && cc.formes[i] !== null)) ecarts.push(t.nom + ', marque ' + i + ' (' + m.k + ' ' + (m.id || m.cle) + ') : ' + court(cc.formes[i]));
    });
  }
  const {rel: r3, c: c3} = chevDe(TEMOINS[3]), lo = r3.marques.findIndex(m => m.k === 'symb' && m.id === 'Lo');
  if (lo < 0 || !c3.formes || c3.formes[lo] !== null) ecarts.push('symbole « Lo » : ' + (lo < 0 ? 'sans marque' : court(c3.formes && c3.formes[lo])));
  return [!ecarts.length, ecarts.slice(0, 4).join(' ; ')];
});
ctrl('(g) chaque paire et chaque coupe désigne des marques dont la forme existe (témoins et plans construits)', () => {
  const ecarts = [], cas = TEMOINS.map(t => Object.assign({nom: t.nom}, chevDe(t)));
  cas.push(Object.assign({nom: 'étiquette sur le « N »'}, plan([['Hn', 'regard', 21.1, 18.7, {etiq: 'Regard N'}], ['Hs', 'regard', -21.1, -18.7]], d => lab(d, 'Hn', {dx: -2.8, dy: 0}))));
  cas.push(Object.assign({nom: 'bulle coupée'}, plan([['Bc', 'regard', 20.6, 0.6], ['Bs', 'regard', -20.6, -0.6]], d => { d.anomManu = [manu('Bc', {dx: -0.3, dy: 0})]; })));
  let np = 0, nc = 0;
  cas.forEach(k => {
    const idx = k.c.paires.reduce((a, x) => a.concat([x.a, x.b]), []).concat(k.c.coupes.map(x => x.i));
    np += k.c.paires.length; nc += k.c.coupes.length;
    if (!Array.isArray(k.c.formes) || idx.some(i => !k.c.formes[i])) ecarts.push(k.nom + ' : ' + dit(k.c));
  });
  return [!ecarts.length && np > 0 && nc > 0, np + ' paires et ' + nc + ' coupes' + (ecarts.length ? ' ; ' + ecarts.join(' ; ') : '')];
});
ctrl('(g) forme d\'une bulle : le disque de centre (cx, cy) et de rayon 2,225 mm (TAILLE_BULLE + 0,125)', () => {
  const ecarts = []; let n = 0;
  for (const t of [TEMOINS[0], TEMOINS[3]]){
    const {rel, c} = chevDe(t);
    rel.marques.forEach((m, i) => {
      if (m.k !== 'bulle') return; n++;
      if (!c.formes || !egal(c.formes[i], [{c: [m.cx, m.cy, 2.225]}])) ecarts.push(t.nom + ', bulle ' + m.num + ' : ' + court(c.formes && c.formes[i]));
    });
  }
  return [!ecarts.length && n >= 2, n + ' bulles' + (ecarts.length ? ' ; ' + ecarts.join(' ; ') : '')];
});
ctrl('(g) étiquettes et textes libres : départ et ligne de base de chaque ligne de texte dans la boîte englobante de leur forme', () => {
  const ecarts = []; let n = 0;
  for (const t of TEMOINS){
    const {rel, c} = chevDe(t), O = rel.pages[0].ordres;
    rel.marques.forEach((m, i) => {
      if (m.page !== 1 || (m.k !== 'etiq' && m.k !== 'tx')) return;
      const F = c.formes && c.formes[i];
      if (!F){ ecarts.push(t.nom + ', ' + m.k + ' ' + m.id + ' : sans forme'); return; }
      const b = bornes(F);
      m.ordres.map(j => O[j]).filter(o => o.m === 'text').forEach(o => o.lignes.forEach(l => {
        if (!l.t) return; n++;
        if (!(l.x >= b[0] - TOL && l.x <= b[2] + TOL && l.y >= b[1] - TOL && l.y <= b[3] + TOL)) ecarts.push(t.nom + ', ' + m.k + ' ' + m.id + ' : ' + court([l.x, l.y]) + ' hors de ' + court(b));
      }));
    });
  }
  return [!ecarts.length && n > 20, n + ' lignes' + (ecarts.length ? ' ; ' + ecarts.slice(0, 3).join(' ; ') : '')];
});

/* ---------- (h) P2, positions propres (m169 ; A11 à A14 bis et A19 à A22 de la conception de l'aperçu) ----------
   Chaque plan garde ses positions : doc.plans.avp.lab (étiquettes et textes libres de l'avant-projet), .bulle (bulles), .echelle ; e.decal,
   écart d'un texte libre depuis son point. L'état des lieux lit e.lab tel quel ; une valeur nouvelle invalide se lit comme absente. */
{
  const RD = require('./charger.js').rendus({V, ctx});
  const releve = (d, mode) => { const rel = V.releveurPdf(J0, {strict: true}); fige(() => V.pdfPlan(copie(d), null, {mode, cible: rel, marque: rel.marque})); return rel; };
  const ordres = rel => rel.pages.map(g => g.ordres.map(x => ({m: x.m, a: x.a})));
  const mq = (rel, k, id) => rel.marques.find(x => x.k === k && (x.id === id || x.cle === id));
  const el = (d, id) => d.el.find(e => e.id === id);
  /* croquis construit au 1/200, avec une étiquette sur le tracé L3 (sans texte, un tracé n'en a pas) */
  const base = () => { const d = construit(200); el(d, 'L3').p.etiq = 'Tuyau fictif L3'; return d; };
  const M = 0.2;
  /* écart (m) qui met le centre d'une marque d'ancre A au point T du papier (mm), à m mètres par mm */
  const vers = (A, T, m) => ({dx: (T[0] - A.x) * m, dy: (A.y - T[1]) * m});
  /* centre attendu d'une marque : A + decalLab(v, Ech) / m (y vers le bas) */
  const attendu = (A, v, Ech) => { const dl = V.decalLab(v, Ech), m = Ech / 1000; return {x: A.x + dl.dx / m, y: A.y - dl.dy / m}; };
  const pres = (q, c, tol) => !!q && Math.abs(q.cx - c.x) <= (tol || 1e-3) && Math.abs(q.cy - c.y) <= (tol || 1e-3);
  const texteDe = (rel, re) => rel.pages[0].ordres.some(o => o.m === 'text' && (o.lignes || []).some(l => re.test(l.t)));
  const st = (rel, k, id) => (mq(rel, k, id) || {}).statut;
  const P2 = d => (d.plans && d.plans.avp) || {};
  const sansProjet = d => { ['L6', 'L7', 'Fs'].forEach(id => { el(d, id).p.st = 'existant'; }); return d; };

  ctrl('(h) a. lectures : posOk, propreAvp (valeur ou conteneur invalide = absent), labPlan (e.lab tel quel à l\'état des lieux), seulProjet, decalPlan, bullePlan, echellePlan', () => {
    const ko = [], vrai = (c, quoi) => { if (!c) ko.push(quoi); }, d = construit(200);
    [[{dx: 0, dy: 0}, true], [{dx: 1.5, dy: -2, E: 200, main: true}, true], [null, false], [undefined, false], [{}, false], [{dx: 1}, false],
      [{dx: NaN, dy: 0}, false], [{dx: 0, dy: Infinity}, false], [{dx: '1', dy: 2}, false], [[1, 2], false], [5, false], ['dx', false]]
      .forEach(([v, att]) => vrai(V.posOk(v) === att, 'posOk(' + String(JSON.stringify(v)) + ')'));
    const pa = (plans, sorte, cle) => { d.plans = plans; return V.propreAvp(d, sorte, cle); };
    const A1 = {auto: true}, O1 = {off: true}, P1 = {dx: 1, dy: 2, E: 500, main: true};
    vrai(pa(undefined, 'lab', 'R1') === undefined && pa(null, 'lab', 'R1') === undefined && pa('x', 'lab', 'R1') === undefined && pa({avp: 'x'}, 'lab', 'R1') === undefined
      && pa({avp: {lab: [A1]}}, 'lab', 'R1') === undefined && pa({avp: {lab: null}}, 'lab', 'R1') === undefined && pa({avp: {lab: {}}}, 'lab', 'toString') === undefined, 'propreAvp : conteneurs invalides');
    vrai(pa({avp: {lab: {R1: A1}}}, 'lab', 'R1') === A1 && pa({avp: {lab: {R1: O1}}}, 'lab', 'R1') === O1 && pa({avp: {lab: {R1: P1}}}, 'lab', 'R1') === P1
      && pa({avp: {bulle: {m1: P1}}}, 'bulle', 'm1') === P1 && pa({avp: {bulle: {m1: P1}}}, 'lab', 'm1') === undefined, 'propreAvp : valeurs valides');
    [null, 0, 5, 'auto', [], {}, {auto: 'oui'}, {off: 1}, {dx: NaN, dy: 0}, {dx: 1, dy: Infinity}, {dx: '1', dy: 2}].forEach(v =>
      vrai(pa({avp: {lab: {R1: v}}}, 'lab', 'R1') === undefined, 'propreAvp(' + String(JSON.stringify(v)) + ')'));
    const r1 = el(d, 'R1'), bizarre = {dx: 'x'};
    d.plans = undefined; r1.lab = bizarre;
    vrai(V.labPlan(d, r1, 'edl') === bizarre && V.labPlan(d, r1, 'avp') === bizarre && V.labPlan(d, r1) === bizarre, 'labPlan : e.lab tel quel, même invalide');
    r1.lab = undefined; vrai(V.labPlan(d, r1, 'edl') === null, 'labPlan : e.lab absent');
    r1.lab = {dx: 3, dy: 3};
    d.plans = {avp: {lab: {R1: P1}}}; vrai(V.labPlan(d, r1, 'avp') === P1 && V.labPlan(d, r1, 'edl') === r1.lab, 'labPlan : Pos propre');
    d.plans = {avp: {lab: {R1: A1}}}; vrai(V.labPlan(d, r1, 'avp') === null, 'labPlan : auto');
    d.plans = {avp: {lab: {R1: O1}}}; vrai(V.labPlan(d, r1, 'avp') === O1, 'labPlan : off');
    d.plans = {avp: {lab: {R1: {dx: NaN, dy: 0}}}}; vrai(V.labPlan(d, r1, 'avp') === r1.lab, 'labPlan : valeur propre invalide');
    const l7 = el(d, 'L7'); l7.lab = {dx: 1, dy: 1};
    d.plans = {avp: {lab: {L7: P1}}}; vrai(V.labPlan(d, l7, 'avp') === l7.lab && V.decalPlan(d, l7, 'avp') === null, 'seulProjet : valeur propre ignorée');
    const x1 = el(d, 'X1'); d.plans = undefined;
    vrai(V.decalPlan(d, x1, 'edl') === null, 'decalPlan : sans écart');
    x1.decal = {dx: 1, dy: 2}; vrai(V.decalPlan(d, x1, 'edl') === x1.decal && V.decalPlan(d, x1, 'avp') === x1.decal, 'decalPlan : e.decal');
    [{dx: NaN, dy: 0}, {dx: 1}, 'x', 5, {auto: true}].forEach(v => { x1.decal = v; vrai(V.decalPlan(d, x1, 'edl') === null, 'decalPlan(' + String(JSON.stringify(v)) + ')'); });
    x1.decal = {dx: 1, dy: 2};
    d.plans = {avp: {lab: {X1: P1}}}; vrai(V.decalPlan(d, x1, 'avp') === P1 && V.decalPlan(d, x1, 'edl') === x1.decal, 'decalPlan : Pos propre');
    d.plans = {avp: {lab: {X1: A1}}}; vrai(V.decalPlan(d, x1, 'avp') === null, 'decalPlan : auto');
    d.plans = {avp: {lab: {X1: {dx: 'a', dy: 0}}}}; vrai(V.decalPlan(d, x1, 'avp') === x1.decal, 'decalPlan : valeur propre invalide');
    const a = {cle: 'm1', bulle: {dx: 1.2, dy: 1.6}}, b0 = {cle: 'k2', bulle: null}, inv = {cle: 'm1', bulle: {dx: 'x'}};
    d.plans = undefined;
    vrai(V.bullePlan(d, a, 'edl') === a.bulle && V.bullePlan(d, a, 'avp') === a.bulle && V.bullePlan(d, b0, 'avp') === null && V.bullePlan(d, inv, 'edl') === inv.bulle, 'bullePlan : bulle du dossier');
    d.plans = {avp: {bulle: {m1: P1}}}; vrai(V.bullePlan(d, a, 'avp') === P1 && V.bullePlan(d, a, 'edl') === a.bulle, 'bullePlan : Pos propre');
    d.plans = {avp: {bulle: {m1: A1}}}; vrai(V.bullePlan(d, a, 'avp') === null, 'bullePlan : auto');
    d.plans = {avp: {bulle: {m1: {dx: Infinity, dy: 0}}}}; vrai(V.bullePlan(d, a, 'avp') === a.bulle, 'bullePlan : valeur propre invalide');
    d.plans = undefined; const eA = V.echelleAuto(d, 'avp');
    vrai(V.echellePlan(d, 'edl') === 200 && V.echellePlan(d, 'avp') === 200, 'echellePlan : échelle du dossier');
    d.plans = {avp: {echelle: 500}}; vrai(V.echellePlan(d, 'avp') === 500 && V.echellePlan(d, 'edl') === 200, 'echellePlan : 500 propre');
    d.plans = {avp: {echelle: 0}}; vrai(V.echellePlan(d, 'avp') === eA && eA !== 200 && V.echellePlan(d, 'edl') === 200, 'echellePlan : 0 propre (Auto, 1/' + eA + ')');
    [30, '500', NaN, Infinity, -200, null, 200000].forEach(v => { d.plans = {avp: {echelle: v}}; vrai(V.echellePlan(d, 'avp') === 200, 'echellePlan : ' + String(v) + ' ignorée'); });
    d.echelle = 0; d.plans = {avp: {echelle: 250}}; vrai(V.echellePlan(d, 'avp') === 250 && V.echellePlan(d, 'edl') === V.echelleAuto(d, 'edl'), 'echellePlan : dossier en Auto');
    return [!ko.length, ko.slice(0, 6).join(' ; ')];
  });

  ctrl('(h) b. plans indépendants : une valeur propre de chaque sorte (symbole, tracé, collecteur placé à la main, texte, bulle) imprimée à l\'avant-projet à sa place ; état des lieux identique avec et sans doc.plans ; e.lab ne change que l\'avant-projet des éléments sans valeur propre', () => {
    const d0 = base(), r0 = releve(d0, 'avp'), ko = [];
    const A = {R1: mq(r0, 'etiq', 'R1').A, L3: mq(r0, 'etiq', 'L3').A, C1: mq(r0, 'etiq', 'C1').A, X1: mq(r0, 'tx', 'X1').A, m1: mq(r0, 'bulle', 'm1').A};
    /* L3 : écart noté au 1/100 (E), ramené au 1/200 ; C1 : ancre hors du cadre, placée à la main dans le cadre */
    const v = {R1: vers(A.R1, [60, 60], M), L3: Object.assign(vers(A.L3, [100, 160], M / 2), {E: 100}), C1: Object.assign(vers(A.C1, [150, 40], M), {E: 200, main: true}),
      X1: vers(A.X1, [60, 130], M), m1: vers(A.m1, [160, 150], M)};
    const d = base(); d.plans = {avp: {lab: {R1: v.R1, L3: v.L3, C1: v.C1, X1: v.X1}, bulle: {m1: v.m1}}};
    const r = releve(d, 'avp');
    [['etiq', 'R1'], ['etiq', 'L3'], ['etiq', 'C1'], ['tx', 'X1'], ['bulle', 'm1']].forEach(([k, id]) => {
      const q = mq(r, k, id), c = attendu(A[id], v[id], 200);
      if (!pres(q, c)) ko.push(id + ' en ' + court(q && [q.cx, q.cy]) + ' au lieu de ' + court([c.x, c.y]));
    });
    const eE = ecartOrdres(ordres(releve(d, 'edl')), ordres(releve(d0, 'edl')));
    if (eE) ko.push('état des lieux changé par doc.plans : ' + eE);
    const d1 = copie(d); el(d1, 'R1').lab = {dx: 0, dy: -3, main: true};
    const e1 = ecartOrdres(ordres(releve(d1, 'avp')), ordres(r));
    if (e1) ko.push('e.lab de R1 change l\'avant-projet : ' + e1);
    const d2 = copie(d); el(d2, 'B1').lab = {dx: 0, dy: 3, main: true};
    const qB = mq(releve(d2, 'avp'), 'etiq', 'B1'), cB = attendu(mq(r, 'etiq', 'B1').A, {dx: 0, dy: 3}, 200);
    if (!pres(qB, cB)) ko.push('e.lab de B1 sans effet à l\'avant-projet : ' + court(qB && [qB.cx, qB.cy]));
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) c. off et auto propres : étiquette masquée à l\'avant-projet ; Ev placée à la main, auto à l\'avant-projet : posée d\'office (statut « office ») ; bulle auto d\'office ; statuts « main » et « ecart » ; texte auto à son point', () => {
    const d = base(), ko = [];
    el(d, 'X1').decal = {dx: 4, dy: -3};
    d.plans = {avp: {lab: {R1: {off: true}, Ev: {auto: true}, X1: {auto: true}}, bulle: {m1: {auto: true}}}};
    const a = releve(d, 'avp'), e = releve(d, 'edl');
    if (mq(a, 'etiq', 'R1') || !mq(e, 'etiq', 'R1')) ko.push('R1 : marque ' + !!mq(a, 'etiq', 'R1') + ' à l\'avant-projet, ' + !!mq(e, 'etiq', 'R1') + ' à l\'état des lieux');
    /* même avant-projet qu'un dossier où R1 est masquée, Ev et la bulle de m1 posées d'office, X1 sans écart */
    const t = base(); el(t, 'R1').lab = {off: true}; el(t, 'Ev').lab = null; t.anomManu[0].bulle = null;
    const ea = ecartOrdres(ordres(a), ordres(releve(t, 'avp')));
    if (ea) ko.push('avant-projet : ' + ea);
    if (st(a, 'etiq', 'Ev') !== 'office' || st(e, 'etiq', 'Ev') !== 'main' || st(a, 'bulle', 'm1') !== 'office' || st(e, 'bulle', 'm1') !== 'main')
      ko.push('statuts Ev ' + st(a, 'etiq', 'Ev') + '/' + st(e, 'etiq', 'Ev') + ', m1 ' + st(a, 'bulle', 'm1') + '/' + st(e, 'bulle', 'm1'));
    const xa = mq(a, 'tx', 'X1'), xe = mq(e, 'tx', 'X1');
    if (!xa || !pres(xa, xa.A, TOL) || !xe || !pres(xe, attendu(xe.A, {dx: 4, dy: -3}, 200))) ko.push('X1 ' + court(xa && [xa.cx - xa.A.x, xa.cy - xa.A.y]) + ' / ' + court(xe && [xe.cx - xe.A.x, xe.cy - xe.A.y]));
    const d3 = base(); d3.plans = {avp: {lab: {R1: {dx: 2, dy: 2, main: true}, B1: {dx: 0, dy: 3, ecart: true}}, bulle: {m1: {dx: 1, dy: -1, ecart: true}, 'ep-eu:De': {dx: -1, dy: 1, main: true}}}};
    const c = releve(d3, 'avp'), vus = [st(c, 'etiq', 'R1'), st(c, 'etiq', 'B1'), st(c, 'bulle', 'm1'), st(c, 'bulle', 'ep-eu:De')].join();
    if (vus !== 'main,ecart,ecart,main') ko.push('statuts propres ' + vus);
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) d. obstacles de l\'avant-projet : la boîte d\'une étiquette à sa place propre (pas à celle de e.lab) ; aucune étiquette posée d\'office dessus', () => {
    const d = base(), ko = [], r1 = el(d, 'R1');
    r1.lab = {dx: 0, dy: 3}; d.plans = {avp: {lab: {R1: {dx: 6, dy: -4, E: 100}}}};
    const idx = V.indexDoc(d), a = V.ancre(r1, idx), A2 = V.versPlan(a.x, a.y, d.rot);
    const centres = mode => V.obstaclesPlan(d, V.analyser(d, mode), 200, idx, null, mode).boites.map(b => [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2]);
    const y = (C, x, yy) => C.some(c => Math.abs(c[0] - x) < 1e-9 && Math.abs(c[1] - yy) < 1e-9);
    const ca = centres('avp'), ce = centres('edl');
    if (!y(ca, A2.x + 12, A2.y - 8) || y(ca, A2.x, A2.y + 3)) ko.push('avant-projet : ' + court(ca));
    if (!y(ce, A2.x, A2.y + 3) || y(ce, A2.x + 12, A2.y - 8)) ko.push('état des lieux : ' + court(ce));
    /* A et B à 2 mm l'un de l'autre : la place d'office de B (A masquée) devient la place propre de l'étiquette de A */
    const o = [['A', 'regard', 0, 0, {etiq: 'Regard A fictif'}], ['B', 'regard', 0.4, 0, {etiq: 'Regard B fictif'}]];
    const prep = pa => { const x = doc({o}); lab(x, 'A', {off: true}); lab(x, 'B', null); Object.assign(x, {echelle: 200, rot: 0}); if (pa) x.plans = {avp: {lab: {A: pa}}}; return x; };
    const r0 = releve(prep(), 'avp'), qB = mq(r0, 'etiq', 'B'), sA = mq(r0, 'symb', 'A');
    const d2 = prep(Object.assign(vers(sA.A, [qB.cx, qB.cy], M), {E: 200, main: true})), r2 = releve(d2, 'avp'), qA2 = mq(r2, 'etiq', 'A'), qB2 = mq(r2, 'etiq', 'B');
    const recouvre = (p, q) => Math.abs(p.cx - q.cx) < (p.w + q.w) / 2 && Math.abs(p.cy - q.cy) < (p.h + q.h) / 2;
    if (!pres(qA2, {x: qB.cx, y: qB.cy})) ko.push('A pas à sa place propre : ' + court(qA2 && [qA2.cx, qA2.cy]));
    else if (!qB2 || recouvre(qA2, qB2)) ko.push('B posée sur A : ' + court(qB2 && [qB2.cx, qB2.cy]));
    if (!pres(mq(releve(d2, 'edl'), 'etiq', 'B'), {x: qB.cx, y: qB.cy})) ko.push('B a bougé à l\'état des lieux');
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) e. bulle propre {dx, dy, E: 200} sur un avant-projet au 1/500 propre : même écart sur le papier qu\'au 1/200 (sans E : même écart en mètres)', () => {
    const d = base(); d.plans = {avp: {echelle: 500, bulle: {m1: {dx: 1, dy: -1.5, E: 200}, 'ep-eu:De': {dx: 1, dy: -1.5}}}};
    const r = releve(d, 'avp'), q = mq(r, 'bulle', 'm1'), q2 = mq(r, 'bulle', 'ep-eu:De');
    const ok = q && Math.abs(q.cx - q.A.x - 5) < 1e-3 && Math.abs(q.cy - q.A.y - 7.5) < 1e-3 && q2 && Math.abs(q2.cx - q2.A.x - 2) < 1e-3 && Math.abs(q2.cy - q2.A.y - 3) < 1e-3;
    return [!!ok && texteDe(r, /chelle 1\/500\b/), court(q && [q.cx - q.A.x, q.cy - q.A.y]) + ' ; ' + court(q2 && [q2.cx - q2.A.x, q2.cy - q2.A.y])];
  });

  ctrl('(h) f. échelle propre de l\'avant-projet : 1/500 (distances et cartouche), état des lieux au 1/200 ; 0 = Auto ; valeur invalide ignorée ; depasseCadre, echellesPlans.avp et .coupeAvp suivent ; .edl et .auto inchangés', () => {
    const ko = [], p = v => { const x = base(); if (v !== undefined) x.plans = {avp: {echelle: v}}; return x; }, eA = V.echelleAuto(base(), 'avp');
    const dist = rel => { const w = mq(rel, 'symb', 'W'), v = mq(rel, 'symb', 'Ev'); return Math.hypot(w.A.x - v.A.x, w.A.y - v.A.y); };
    const ra = releve(p(500), 'avp'), re = releve(p(500), 'edl');
    if (Math.abs(dist(ra) - 6) > 1e-6 || !texteDe(ra, /chelle 1\/500\b/)) ko.push('avant-projet : ' + dist(ra));
    if (Math.abs(dist(re) - 15) > 1e-6 || !texteDe(re, /chelle 1\/200\b/)) ko.push('état des lieux : ' + dist(re));
    if (!texteDe(releve(p(0), 'avp'), new RegExp('chelle 1/' + eA + '\\b')) || eA === 200) ko.push('0 : Auto (1/' + eA + ') attendu');
    if (!texteDe(releve(p(30), 'avp'), /chelle 1\/200\b/)) ko.push('30 non ignorée');
    const vus = [V.depasseCadre(p(), 'avp'), V.depasseCadre(p(500), 'avp'), V.depasseCadre(p(0), 'avp'), V.depasseCadre(p(30), 'avp'), V.depasseCadre(p(500), 'edl')];
    if (vus.join() !== 'true,false,false,true,true') ko.push('depasseCadre ' + vus.join());
    const e5 = V.echellesPlans(p(500)), e0 = V.echellesPlans(p(0));
    if (!egal(e5, {auto: false, edl: 200, avp: 500, coupeEdl: true, coupeAvp: false}) || !egal(e0, {auto: false, edl: 200, avp: eA, coupeEdl: true, coupeAvp: false})) ko.push('echellesPlans ' + court([e5, e0]));
    const da = p(200); da.echelle = 0; const ea = V.echellesPlans(da);
    if (!egal(ea, {auto: true, edl: V.echelleAuto(da, 'edl'), avp: 200, coupeEdl: false, coupeAvp: true})) ko.push('echellesPlans, dossier en Auto ' + court(ea));
    const es = V.echellesPlans(sansProjet(p(500)));
    if (es.avp !== 0 || es.coupeAvp !== false) ko.push('sans projet ' + court(es));
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) g. ecrirePos sur l\'état des lieux d\'un dossier à projet : gel de chaque sorte (R1 sans étiquette → auto, Ev → copie non partagée, Lb → off, X1 → auto, m1 → copie, échelle → 200 ou 0 en Auto), puis écriture ; la deuxième écriture ne recopie plus', () => {
    const ko = [], d = base(), ev0 = el(d, 'Ev').lab, b0 = d.anomManu[0].bulle;
    const w = (x, ...a) => { const r = V.ecrirePos(x, ...a); if (r !== true) ko.push('refusé : ' + court(a) + ' → ' + r); };
    w(d, 'edl', 'lab', 'R1', {dx: 1, dy: 1}); w(d, 'edl', 'lab', 'Ev', {auto: true}); w(d, 'edl', 'lab', 'Lb', {dx: 0, dy: 2, E: 200, main: true});
    w(d, 'edl', 'lab', 'X1', {dx: 1, dy: 0}); w(d, 'edl', 'bulle', 'm1', {dx: 0, dy: -2}); w(d, 'edl', 'echelle', null, 500);
    const gel = {lab: {R1: {auto: true}, Ev: {dx: 2, dy: 1.5, main: true}, Lb: {off: true}, X1: {auto: true}}, bulle: {m1: {dx: 1.2, dy: 1.6}}, echelle: 200};
    if (!egal(P2(d), gel) || P2(d).lab.Ev === ev0 || P2(d).bulle.m1 === b0) ko.push('gel ' + court(d.plans));
    const edl = () => [el(d, 'R1').lab, el(d, 'Ev').lab, el(d, 'Lb').lab, el(d, 'X1').decal, d.anomManu[0].bulle, d.echelle];
    if (!egal(edl(), [{dx: 1, dy: 1}, null, {dx: 0, dy: 2, E: 200, main: true}, {dx: 1, dy: 0}, {dx: 0, dy: -2}, 500])) ko.push('état des lieux ' + court(edl()));
    ev0.dx = 99; b0.dx = 99; if (!egal(P2(d), gel)) ko.push('copie partagée');
    w(d, 'edl', 'lab', 'R1', {dx: 5, dy: 5}); w(d, 'edl', 'lab', 'Ev', {dx: 3, dy: 3}); w(d, 'edl', 'lab', 'Lb', {off: true}); w(d, 'edl', 'lab', 'X1', {auto: true});
    w(d, 'edl', 'bulle', 'm1', {dx: 4, dy: 4}); w(d, 'edl', 'echelle', null, 250);
    if (!egal(P2(d), gel)) ko.push('deuxième écriture : ' + court(d.plans));
    if (!egal(edl(), [{dx: 5, dy: 5}, {dx: 3, dy: 3}, {off: true}, undefined, {dx: 4, dy: 4}, 250])) ko.push('deuxième écriture, état des lieux ' + court(edl()));
    const da = construit(0); w(da, 'edl', 'echelle', null, 200);
    if (P2(da).echelle !== 0 || da.echelle !== 200) ko.push('échelle en Auto : ' + court([da.plans, da.echelle]));
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) g. ecrirePos sur l\'avant-projet : doc.plans seul (copie), sans gel ni état des lieux touché ; seulProjet (L7) : e.lab dans les deux modes, rien dans doc.plans ; null efface (sans rien créer)', () => {
    const ko = [], d = base(), j0 = JSON.stringify([d.el, d.anomManu, d.decisions, d.echelle]), v = {dx: 1, dy: 1, E: 200, main: true};
    const w = (...a) => V.ecrirePos(d, ...a);
    const r = [w('avp', 'lab', 'B1', v), w('avp', 'lab', 'R1', {off: true}), w('avp', 'lab', 'X1', {dx: 2, dy: 0, ecart: true}), w('avp', 'lab', 'Ev', {auto: true}),
      w('avp', 'bulle', 'm1', {dx: 3, dy: 3}), w('avp', 'bulle', 'ep-eu:De', {auto: true}), w('avp', 'echelle', null, 500)];
    if (r.some(x => x !== true)) ko.push('refus ' + r.join());
    if (JSON.stringify([d.el, d.anomManu, d.decisions, d.echelle]) !== j0) ko.push('état des lieux touché');
    if (!egal(d.plans, {avp: {lab: {B1: v, R1: {off: true}, X1: {dx: 2, dy: 0, ecart: true}, Ev: {auto: true}}, bulle: {m1: {dx: 3, dy: 3}, 'ep-eu:De': {auto: true}}, echelle: 500}}) || P2(d).lab.B1 === v)
      ko.push('doc.plans ' + court(d.plans));
    const l7 = el(d, 'L7'), sans7 = () => !('L7' in (P2(d).lab || {}));
    if (w('edl', 'lab', 'L7', {dx: 1, dy: 1}) !== true || !egal(l7.lab, {dx: 1, dy: 1}) || !sans7()) ko.push('L7 état des lieux ' + court(l7.lab));
    if (w('avp', 'lab', 'L7', {dx: 2, dy: 2, main: true}) !== true || !egal(l7.lab, {dx: 2, dy: 2, main: true}) || !sans7()) ko.push('L7 avant-projet ' + court(l7.lab));
    if (w('avp', 'lab', 'L7', {auto: true}) !== true || l7.lab !== null || w('edl', 'lab', 'L7', {off: true}) !== true || !egal(l7.lab, {off: true}) || !sans7()) ko.push('L7 auto, off ' + court(l7.lab));
    const n = [w('avp', 'lab', 'B1', null), w('avp', 'bulle', 'm1', null), w('avp', 'echelle', null, null)];
    if (n.some(x => x !== true) || 'B1' in P2(d).lab || 'm1' in P2(d).bulle || 'echelle' in P2(d)) ko.push('null ' + n.join() + ' ' + court(d.plans));
    const d2 = base(), n2 = [V.ecrirePos(d2, 'avp', 'lab', 'B1', null), V.ecrirePos(d2, 'avp', 'bulle', 'm1', null), V.ecrirePos(d2, 'avp', 'echelle', null, null)];
    if (n2.some(x => x !== true) || 'plans' in d2) ko.push('null sans entrée ' + n2.join() + ' ' + court(d2.plans));
    const d3 = base(); V.ecrirePos(d3, 'avp', 'lab', 'B1', {auto: true}); V.ecrirePos(d3, 'avp', 'lab', 'B1', null);
    if ('plans' in d3) ko.push('doc.plans vide gardé ' + court(d3.plans));
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) g. ecrirePos : refus (false, dossier inchangé) : mode ou sorte inconnus, id absent, clé de bulle vide ou non chaîne, valeur invalide, null sur l\'état des lieux ou pour un seulProjet, off pour un texte ou une bulle, échelle invalide', () => {
    const d = base(); d.plans = {avp: {lab: {R1: {auto: true}}}};
    const j0 = JSON.stringify(d), ko = [];
    const cas = [['x', 'lab', 'R1', {auto: true}], [undefined, 'lab', 'R1', {auto: true}], ['avp', 'y', 'R1', {auto: true}], ['edl', 'lab', 'ZZ', {dx: 1, dy: 1}],
      ['avp', 'lab', 'ZZ', {auto: true}], ['avp', 'lab', '', {auto: true}], ['avp', 'lab', 'toString', {auto: true}],
      ['avp', 'bulle', '', {dx: 1, dy: 1}], ['edl', 'bulle', 5, {dx: 1, dy: 1}], ['avp', 'bulle', null, {auto: true}],
      ['edl', 'bulle', '__proto__', {dx: 1, dy: 1}], ['avp', 'bulle', '__proto__', {auto: true}], ['avp', 'lab', '__proto__', {auto: true}]]
      .concat(...[{dx: 'a', dy: 1}, {dx: NaN, dy: 0}, {dx: 1, dy: Infinity}, {dx: 1}, {}, 'auto', 5, [], undefined, {auto: 'oui'}, {off: 1}]
        .map(v => [['edl', 'lab', 'R1', v], ['avp', 'lab', 'R1', v], ['edl', 'lab', 'X1', v], ['edl', 'bulle', 'm1', v], ['avp', 'bulle', 'm1', v]]))
      .concat([['edl', 'lab', 'R1', null], ['edl', 'lab', 'X1', null], ['edl', 'bulle', 'm1', null], ['edl', 'echelle', null, null], ['avp', 'lab', 'L7', null], ['edl', 'lab', 'L7', null],
        ['edl', 'lab', 'X1', {off: true}], ['avp', 'lab', 'X1', {off: true}], ['edl', 'bulle', 'm1', {off: true}], ['avp', 'bulle', 'm1', {off: true}]])
      .concat(...[30, '200', NaN, Infinity, -200, 200000, {auto: true}, undefined].map(v => [['edl', 'echelle', null, v], ['avp', 'echelle', null, v]]));
    cas.forEach(c => { const r = V.ecrirePos(d, ...c); if (r !== false || JSON.stringify(d) !== j0) ko.push(court(c) + ' → ' + r); });
    if (({}).bulle !== undefined || ({}).dx !== undefined || ({}).auto !== undefined) ko.push('prototype des objets touché');
    return [!ko.length, cas.length + ' cas' + (ko.length ? ' ; ' + ko.length + ' acceptés ou dossier changé : ' + ko.slice(0, 4).join(' ; ') : '')];
  });

  ctrl('(h) g. ecrirePos sur l\'état des lieux : auto, off, écart d\'un texte, bulle manuelle et de décision (aucune décision créée pour auto), échelle ; dossier sans projet : pas de gel', () => {
    const ko = [], d = sansProjet(base());
    d.decisions['ep-eu:De'] = {st: 'retenue', obs: 'Observation fictive'};
    const w = (...a) => { const r = V.ecrirePos(d, ...a); if (r !== true) ko.push('refusé ' + court(a)); };
    w('edl', 'lab', 'Ev', {auto: true}); if (el(d, 'Ev').lab !== null) ko.push('auto');
    w('edl', 'lab', 'R1', {off: true}); if (!egal(el(d, 'R1').lab, {off: true})) ko.push('off');
    w('edl', 'lab', 'B1', {dx: 1, dy: 2, E: 200, main: true, ecart: true}); if (!egal(el(d, 'B1').lab, {dx: 1, dy: 2, E: 200, main: true, ecart: true})) ko.push('Pos');
    w('edl', 'lab', 'X1', {dx: 1, dy: 2}); if (!egal(el(d, 'X1').decal, {dx: 1, dy: 2}) || 'lab' in el(d, 'X1')) ko.push('écart du texte ' + court(el(d, 'X1')));
    w('edl', 'lab', 'X1', {auto: true}); if ('decal' in el(d, 'X1')) ko.push('auto du texte');
    w('edl', 'bulle', 'm1', {dx: 2, dy: 2, E: 200}); if (!egal(d.anomManu[0].bulle, {dx: 2, dy: 2, E: 200}) || 'm1' in d.decisions) ko.push('bulle manuelle');
    w('edl', 'bulle', 'm1', {auto: true}); if ('bulle' in d.anomManu[0]) ko.push('bulle manuelle auto');
    w('edl', 'bulle', 'ep-eu:De', {dx: -1, dy: 1}); if (!egal(d.decisions['ep-eu:De'], {st: 'retenue', obs: 'Observation fictive', bulle: {dx: -1, dy: 1}})) ko.push('bulle de décision ' + court(d.decisions));
    w('edl', 'bulle', 'ep-eu:De', {auto: true}); if (!egal(d.decisions['ep-eu:De'], {st: 'retenue', obs: 'Observation fictive'})) ko.push('bulle de décision auto');
    w('edl', 'bulle', 'cle-fictive', {dx: 1, dy: 1}); if (!egal(d.decisions['cle-fictive'], {bulle: {dx: 1, dy: 1}})) ko.push('décision créée');
    w('edl', 'bulle', 'autre-fictive', {auto: true}); if ('autre-fictive' in d.decisions) ko.push('décision créée pour auto');
    w('edl', 'echelle', null, 0); if (d.echelle !== 0) ko.push('échelle 0');
    w('edl', 'echelle', null, 250); if (d.echelle !== 250) ko.push('échelle 250');
    if ('plans' in d) ko.push('gel sans projet : ' + court(d.plans));
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) g. ecrirePos : conteneurs invalides remplacés par {} (écriture et gel) ; ménage après chaque écriture acceptée, rien sur un refus', () => {
    const ko = [];
    for (const pl of ['x', 5, [], null, {avp: 'x'}, {avp: []}, {avp: {lab: 'x', bulle: 5}}, {avp: {lab: [], bulle: []}}]){
      const d = base(); d.plans = cp(pl);
      const ok = V.ecrirePos(d, 'avp', 'lab', 'B1', {auto: true}) === true && V.ecrirePos(d, 'avp', 'bulle', 'm1', {dx: 1, dy: 1}) === true;
      if (!ok || !egal(d.plans, {avp: {lab: {B1: {auto: true}}, bulle: {m1: {dx: 1, dy: 1}}}})) ko.push(court(pl) + ' : ' + court(d.plans));
      const g = base(); g.plans = cp(pl);
      if (V.ecrirePos(g, 'edl', 'lab', 'R1', {dx: 1, dy: 1}) !== true || !egal(g.plans, {avp: {lab: {R1: {auto: true}}}})) ko.push('gel, ' + court(pl) + ' : ' + court(g.plans));
    }
    const d = base(); d.plans = {avp: {lab: {ZZ: {auto: true}, R1: {auto: true}}, bulle: {zz: {auto: true}}}};
    const j = JSON.stringify(d);
    if (V.ecrirePos(d, 'avp', 'lab', 'R1', {dx: 'x'}) !== false || JSON.stringify(d) !== j) ko.push('un refus fait le ménage');
    if (V.ecrirePos(d, 'avp', 'echelle', null, 500) !== true || !egal(d.plans, {avp: {lab: {R1: {auto: true}}, bulle: {zz: {auto: true}}, echelle: 500}})) ko.push('ménage ' + court(d.plans));
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) h. menagePlans : conteneurs invalides ôtés, id absents ôtés de lab (les bulles restent), conteneurs vides ôtés, clés inconnues et valeurs invalides gardées ; supprimerElement fait le ménage', () => {
    const ko = [], m = pl => { const d = base(); if (pl !== undefined) d.plans = cp(pl); V.menagePlans(d); return d; };
    ['x', 5, null, [], {}, {avp: 'x'}, {avp: []}, {avp: {}}, {avp: {lab: 'x'}}, {avp: {lab: [], bulle: 5}}, {avp: {lab: {}, bulle: {}}}, {avp: {lab: {ZZ: {auto: true}}}}]
      .forEach(pl => { const d = m(pl); if ('plans' in d) ko.push(court(pl) + ' → ' + court(d.plans)); });
    const garde = (pl, att) => { const d = m(pl); if (!egal(d.plans, att)) ko.push(court(pl) + ' → ' + court(d.plans)); };
    garde({avp: {lab: {R1: {auto: true}, ZZ: {auto: true}}, bulle: {zz: {auto: true}}}}, {avp: {lab: {R1: {auto: true}}, bulle: {zz: {auto: true}}}});
    garde({avp: {lab: {R1: 'x', B1: {dx: NaN}}, autre: 1}, v: 2}, {avp: {lab: {R1: 'x', B1: {dx: NaN}}, autre: 1}, v: 2});
    garde({avp: {}, autre: 1}, {autre: 1});
    garde({avp: {echelle: 'x', lab: {ZZ: {off: true}}}}, {avp: {echelle: 'x'}});
    if ('plans' in m()) ko.push('doc.plans créé');
    const s = base(); s.plans = {avp: {lab: {R1: {auto: true}, B1: {off: true}, W: {auto: true}}, bulle: {m1: {dx: 1, dy: 1}}}};
    V.ops.supprimerElement(s, 'R1'); V.ops.supprimerElement(s, 'W');
    if (!egal(s.plans, {avp: {lab: {B1: {off: true}}, bulle: {m1: {dx: 1, dy: 1}}}})) ko.push('supprimerElement ' + court(s.plans));
    const s2 = base(); s2.plans = {avp: {lab: {R1: {auto: true}}}}; V.ops.supprimerElement(s2, 'R1');
    if ('plans' in s2) ko.push('supprimerElement, dernière entrée ' + court(s2.plans));
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) h. reporterProjet : au statut « Projet », la valeur propre passe dans e.lab (auto → null, off, Pos copiée, invalide ignorée), puis l\'entrée est ôtée ; hors du statut « Projet », rien ne change', () => {
    const ko = [], labs = d => P2(d).lab || {};
    const r = (id, v) => { const d = base(), e = el(d, id); e.lab = {dx: 9, dy: 9}; d.plans = {avp: {lab: {[id]: v}, bulle: {m1: {auto: true}}}}; V.reporterProjet(d, e); return {d, e}; };
    let t = r('L7', {auto: true}); if (t.e.lab !== null || 'L7' in labs(t.d) || !egal(t.d.plans, {avp: {bulle: {m1: {auto: true}}}})) ko.push('auto ' + court([t.e.lab, t.d.plans]));
    t = r('L7', {off: true}); if (!egal(t.e.lab, {off: true}) || 'L7' in labs(t.d)) ko.push('off ' + court(t.e.lab));
    const v = {dx: 1, dy: 2, E: 200, main: true}; t = r('L7', v);
    if (!egal(t.e.lab, v) || t.e.lab === v || 'L7' in labs(t.d)) ko.push('Pos ' + court(t.e.lab));
    t = r('L7', {dx: 'x'}); if (!egal(t.e.lab, {dx: 9, dy: 9}) || 'L7' in labs(t.d)) ko.push('invalide ' + court([t.e.lab, t.d.plans]));
    t = r('R1', v); if (!egal(t.e.lab, {dx: 9, dy: 9}) || !egal(labs(t.d).R1, v)) ko.push('hors du statut « Projet » ' + court([t.e.lab, t.d.plans]));
    const u = base(), l7 = el(u, 'L7'); l7.lab = {dx: 9, dy: 9}; V.reporterProjet(u, l7);
    if (!egal(l7.lab, {dx: 9, dy: 9}) || 'plans' in u) ko.push('sans entrée ' + court([l7.lab, u.plans]));
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) h. tournerPlans : e.decal et les Pos main, ecart ou de texte tournent (1e-9) ; Pos d\'office d\'un tracé → auto à chaque appel ; symbole, auto, off, invalides et id absents inchangés ; bulles propres tournées ; sans rotation, seules les Pos d\'office des tracés changent', () => {
    const ko = [], r0 = 0.5, r1 = 0.5 + Math.PI / 12;
    const tourne = v => { const w = V.depuisPlan(v.dx, v.dy, r0), q = V.versPlan(w.x, w.y, r1); return Object.assign({}, v, {dx: q.x, dy: q.y}); };
    const prep = () => { const d = base(); el(d, 'X1').decal = {dx: 1, dy: 2, E: 100};
      d.plans = {avp: {lab: {R1: {dx: 1, dy: 1, main: true}, B1: {dx: 2, dy: 0, ecart: true}, De: {dx: 1, dy: 0, E: 200}, L3: {dx: 0, dy: 1, E: 200}, C1: {dx: 1, dy: 1, main: true},
        X1: {dx: -1, dy: 1}, Ev: {auto: true}, Rp: {off: true}, Fs: {dx: 'x'}, ZZ: {dx: 1, dy: 1, main: true}},
        bulle: {m1: {dx: 1, dy: 2}, 'ep-eu:De': {auto: true}, k3: {dx: NaN, dy: 1}}, echelle: 500}};
      return d; };
    const d = prep(), a = cp(d.plans.avp);
    V.tournerPlans(d, r0, r1, V.indexDoc(d));
    const att = {lab: {R1: tourne(a.lab.R1), B1: tourne(a.lab.B1), De: a.lab.De, L3: {auto: true}, C1: tourne(a.lab.C1), X1: tourne(a.lab.X1), Ev: a.lab.Ev, Rp: a.lab.Rp, Fs: a.lab.Fs, ZZ: a.lab.ZZ},
      bulle: {m1: tourne(a.bulle.m1), 'ep-eu:De': {auto: true}, k3: a.bulle.k3}, echelle: 500};
    Object.keys(att.lab).forEach(k => { if (!egal(P2(d).lab[k], att.lab[k])) ko.push(k + ' ' + court(P2(d).lab[k]) + ' au lieu de ' + court(att.lab[k])); });
    if (!egal(P2(d).bulle, att.bulle) || P2(d).echelle !== 500) ko.push('bulles ' + court(P2(d).bulle));
    if (!egal(el(d, 'X1').decal, tourne({dx: 1, dy: 2, E: 100}))) ko.push('e.decal ' + court(el(d, 'X1').decal));
    const s = prep(), s0 = cp(s.plans); V.tournerPlans(s, r0, r0, V.indexDoc(s)); s0.avp.lab.L3 = {auto: true};
    if (!egal(s.plans, s0) || !egal(el(s, 'X1').decal, {dx: 1, dy: 2, E: 100})) ko.push('sans rotation ' + court(s.plans.avp.lab));
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) h. reposerPropre : une valeur propre autre que off et auto devient auto (main comprise) ; aucune entrée créée', () => {
    const d = base(); d.plans = {avp: {lab: {R1: {dx: 1, dy: 1, main: true}, B1: {off: true}, De: {auto: true}, Ev: {dx: 2, dy: 2}}}};
    ['R1', 'B1', 'De', 'Ev', 'W'].forEach(id => V.reposerPropre(d, id));
    return [egal(d.plans, {avp: {lab: {R1: {auto: true}, B1: {off: true}, De: {auto: true}, Ev: {auto: true}}}}), court(d.plans)];
  });

  ctrl('(h) i. DXF d\'un texte décalé : point d\'insertion décalé de depuisPlan(decalLab(decal, Ech), rot), aux unités et à l\'origine près', () => {
    const d = base(); Object.assign(d, {u: 2, origine: {x: 100, y: 50}}); el(d, 'X1').decal = {dx: 3, dy: -2, E: 100};
    const ins = x => { const t = RD.dxf(x).ents.find(q => q.type === 'TEXT' && q.c['1'] === 'Jardin fictif'); return t && t.a; };
    const s = copie(d); delete el(s, 'X1').decal;
    const p1 = ins(d), p0 = ins(s), dl = V.decalLab(el(d, 'X1').decal, 200), w = V.depuisPlan(dl.dx, dl.dy, d.rot);
    const ok = p1 && p0 && Math.abs(p0.x - 100.5) < 1e-4 && Math.abs(p0.y - 55) < 1e-4 && Math.abs(p1.x - p0.x - w.x / 2) < 1e-4 && Math.abs(p1.y - p0.y - w.y / 2) < 1e-4;
    return [!!ok, court([p1, p0, w])];
  });

  ctrl('(h) i. garde (passe aussi avant m169) : exportJson garde doc.plans et e.decal (copies profondes) ; le DXF ne lit ni doc.plans ni un e.decal invalide', () => {
    const ko = [], d = base();
    d.plans = {avp: {lab: {R1: {dx: 1, dy: 1, main: true}}, bulle: {m1: {auto: true}}, echelle: 500}}; el(d, 'X1').decal = {dx: 3, dy: -2, E: 100};
    const j = V.exportJson(d), jx = j.el.find(e => e.id === 'X1');
    if (!egal(j.plans, d.plans) || j.plans === d.plans || j.plans.avp.lab.R1 === d.plans.avp.lab.R1 || !egal(jx.decal, el(d, 'X1').decal) || jx.decal === el(d, 'X1').decal) ko.push('exportJson ' + court(j.plans));
    const t = base(), ref = Buffer.from(V.ecrireDxf(copie(t))).toString('latin1');
    const p = copie(t); p.plans = {avp: {lab: {R1: {dx: 1, dy: 1, main: true}, X1: {dx: 2, dy: 2}}, bulle: {m1: {dx: 3, dy: 3}}, echelle: 500}};
    const q = cp(t); el(q, 'X1').decal = {dx: NaN, dy: 1};
    [p, q].forEach((x, i) => { if (Buffer.from(V.ecrireDxf(cp(x))).toString('latin1') !== ref) ko.push(['doc.plans', 'e.decal invalide'][i] + ' change le DXF'); });
    return [!ko.length, ko.join(' ; ')];
  });

  ctrl('(h) j. dansCadrePage : idempotente à 1e-6 sur toute la page (grille d\'un mm ; boîtes de 4 × 2, 30 × 6, 60 × 12 mm et bulle) ; même résultat que le dansCadre de pdfPlan pour une étiquette placée à la main sur la rose du nord', () => {
    /* cadre et zones réservées de pdfPlan au 1/200 (zonesReservees ; barreEchelle : 5 m, soit 25 mm) */
    const F = {x: 7, y: 7, w: 205, h: 192}, Lp = 25, ko = [];
    const reserve = [[F.x + F.w - 22, F.y + 1, F.x + F.w, F.y + 23], [F.x + 4, F.y + F.h - 14, F.x + Lp + 38, F.y + F.h - 4]];
    let n = 0, nk = 0;
    for (const [w, h] of [[4, 2], [30, 6], [60, 12], [2 * 2.1 + .6, 2 * 2.1 + .6]]){
      for (let x = 0; x <= 297; x++) for (let y = 0; y <= 210; y++){
        const q = V.dansCadrePage(F, reserve, x, y, w, h), q2 = V.dansCadrePage(F, reserve, q.x, q.y, w, h); n++;
        if (!(Math.abs(q2.x - q.x) <= 1e-6 && Math.abs(q2.y - q.y) <= 1e-6)){ nk++; if (ko.length < 3) ko.push('non idempotente en ' + x + ', ' + y + ' (boîte ' + w + ' × ' + h + ') : ' + court([q.x, q.y]) + ' puis ' + court([q2.x, q2.y])); }
      }
    }
    if (nk) ko.push(nk + ' points non idempotents');
    const p = plan([['Hn', 'regard', 15, 10, {etiq: 'Regard N fictif'}], ['Hs', 'regard', -15, -10]], x => lab(x, 'Hn', {dx: 3.1, dy: 7, main: true}));
    const m = p.rel.marques[p.i('etiq', 'Hn')];
    if (!m) ko.push('pas de marque pour Hn');
    else {
      const c0 = {x: m.A.x + 3.1 / M, y: m.A.y - 7 / M}, c = V.dansCadrePage(F, reserve, c0.x, c0.y, m.w, m.h), z = reserve[0];
      const surRose = c0.x + m.w / 2 > z[0] && c0.x - m.w / 2 < z[2] && c0.y + m.h / 2 > z[1] && c0.y - m.h / 2 < z[3];
      if (!surRose || Math.abs(c.x - m.cx) > 1e-9 || Math.abs(c.y - m.cy) > 1e-9 || Math.hypot(c.x - c0.x, c.y - c0.y) < .5) ko.push('rose : ' + court([c0, c, [m.cx, m.cy]]));
    }
    return [!ko.length, n + ' points' + (ko.length ? ' ; ' + ko.join(' ; ') : '')];
  });
}

(async () => {
  for (const c of controles){
    let r;
    try { r = await c.fn(); } catch (e){ r = [false, 'exception : ' + e.message + ' ' + ((e.stack || '').split('\n')[1] || '').trim()]; }
    R.ok(r[0], c.nom + (r[1] ? ' — ' + r[1] : ''));
  }
  R.fin();
})();
