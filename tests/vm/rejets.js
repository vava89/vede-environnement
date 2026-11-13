// Table commune des exutoires (décision D1 de .claude/conception-rejets.md ; m116), sans navigateur : une ligne de VCroquis.EXU suffit à un exutoire
// (réseau de la couleur, libellé du rejet, règle d'une source EU, place au constat), lue par son code (codeExu : la partie avant le premier
// « : »). Croquis fictifs (12 rue Fictive, Ville-Exemple) ; la ligne ZZ et les types d'essai n'existent que dans ce test.
// a1 : VCroquis.EXU porte INF, GARG et MILIEU, avec les libellés du rejet d'avant (EXU_LIB) mot pour mot ; libExu rend aussi ceux des
//   réseaux EU, EP et unitaire.
// a2 : une ligne ZZ ajoutée à VCroquis.EXU et un type d'essai (exu 'ZZ') suffisent : tuyau EP (resPiece et resPt 'EP' ; à l'écran, tuyau
//   et étiquette verts) ; libellé du rejet tiré de la table (libExu, « Rejet constaté » du plan PDF, message « relié à plusieurs réseaux »),
//   jamais le code ; anomalie eu-zz pour un WC relié ; constat : lignes du WC et de la descente d'après la table (code, libellé, case des
//   ouvrages de récupération des EP). Témoin : le même dessin vers un puisard.
// a3 : le même type avec exu 'ZZ:ESSAI' (clé imitée d'une destination ajoutée) : mêmes résultats ; descente → regard (tampon béton, sans
//   cunette) → type d'essai, en Tronçon, en Tronçon EP, puis en avant-projet avec un Tronçon EP laissé libre au regard : regard EP, seule
//   anomalie « Regard EP : tampon béton », en réserve, ni « contredit » ni « sortielibre » (sans codeExu : tampon et cunette NC).
// Échouent sur 52cd3c8 (VCroquis.EXU et VCroquis.libExu absentes) : a1, a2 et a3, sauf les témoins (puisard ; rejet de la source).
// Infiltration au sol (décisions D2 et D8 ; m117) :
// r1 : le type (famille des exutoires, « posée », droit, non orienté), sa place dans la palette Équipements (juste après le puisard), la ligne SOL
//   de la table ; le symbole : un masque (disque blanc sans trait), puis une tige et trois barres de plus en plus courtes, toutes tracées, dans
//   le disque ; rayon 2,1.
// r2 : plan tourné d'un demi-radian : le symbole reste droit à l'écran et au PDF, même avec un angle propre venu d'un fichier (p.a = 30 ; un
//   changement de type vers l'infiltration, lui, efface l'angle) ; au DXF, l'INSERT prend la rotation du plan. Témoins : un regard non orienté
//   reste penché, à l'écran et au PDF. (L'aperçu de pose : navigateur/rejets.js, n1.)
// r3 : DXF : bloc VEDE_INFILTRATION sans disque plein (le masque est sauté), INSERT sur VEDE-SYMBOLES en couleur 3, tuyau sur VEDE-EP, étiquette
//   en couleur 3 ; à l'écran, tuyau et étiquette verts.
// r4 : plan PDF : « Infiltration au sol » une fois à la légende ; « infiltration au sol » dans la colonne « Rejet constaté » de la page 2, jamais
//   le code SOL ; avant-projet : « Reste après travaux : WC : rejet au sol (infiltration) ».
// r5 : constat : la descente coche « Infiltration diffuse » (case infil), conforme ; le WC est en MILIEU, non conforme. Au dossier, l'anomalie
//   eu-sol créée pour le WC va sur la ligne « WC » du constat (règle de REGLES_LIGNE). Témoin : le même dessin vers un puisard (eu-inf).
// r6 (garde) : sans le type (croquis d'une version plus récente), écran, PDF et DXF sans exception, bloc VEDE_OBJET.
// Échouent sur 2f3faa1 (type « infiltration » absent) : r1 à r5, sauf les témoins (en r2, le regard penché à l'écran et au PDF ; en r5, le
//   puisard). r6 y passe.
// usage : node tests/vm/rejets.js [-v] [--app=<dossier>]
'use strict';
const {charger, doc, copie, rendus, rapport} = require('./charger.js');
const ch = charger({pdf: true}), {V} = ch, R = rapport('rejets'), {canevas, dessiner, pdf, dxf} = rendus(ch);
/* appel protégé : une exception devient le texte « exception : … » */
const sur = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };
const VERT = 'rgb(' + V.RES.EP.rgb.join(',') + ')';
const libExu = (res, an) => typeof V.libExu === 'function' ? sur(() => V.libExu(res, an)) : 'VCroquis.libExu absente';

/* a1 : les trois lignes d'aujourd'hui */
function lignes(){
  const LIB = {INF: 'puisard (infiltration)', GARG: 'gargouille', MILIEU: 'milieu naturel'}, X = V.EXU;
  const vus = X && typeof X === 'object' ? Object.keys(LIB).map(k => k + ' ' + JSON.stringify(X[k] && X[k].lib)).join(', ') : 'VCroquis.EXU absente';
  R.ok(!!X && Object.keys(LIB).every(k => X[k] && X[k].lib === LIB[k]), 'a1 VCroquis.EXU : INF, GARG et MILIEU, libellés d\'EXU_LIB mot pour mot (' + vus + ')');
  const RESX = {EU: 'réseau EU', EP: 'réseau EP', UN: 'réseau unitaire'}, l = Object.keys(LIB).concat(Object.keys(RESX)).map(k => libExu(k));
  R.ok(JSON.stringify(l) === JSON.stringify(Object.values(LIB).concat(Object.values(RESX))), 'a1 libExu : exutoires et réseaux (' + l.join(' ; ') + ')');
}

/* ligne d'essai, de la forme de celles du code, et deux types d'essai qui la portent : code simple et clé imitée */
const ZZ = {lib: 'exutoire de test', res: 'EP',
  eu: {cle: 'eu-zz', obs: 'rejet à l\'exutoire de test', preco: 'Suppression du rejet à l\'exutoire de test et raccordement au branchement EU', nc: true,
    codes: ['raccEUsep'], cat: 'inversion'},
  cEU: {code: 'MILIEU', lib: 'Exutoire de test : rejet au sol'}, cEP: {code: '', lib: 'Exutoire de test (infiltration)', recup: 'infil'}};
function poserEssai(){
  /* sans table (version d'avant), la ligne va dans un objet que l'application ne lit pas : les vérifications montrent ce qui manque */
  const X = V.EXU && typeof V.EXU === 'object' ? V.EXU : {};
  X.ZZ = ZZ;
  V.TYPES.essai = {id: 'essai', fam: 'exu', lib: 'Exutoire de test', role: 'exutoire', forme: 'puisard', exu: 'ZZ'};
  V.TYPES.essaiCle = {id: 'essaiCle', fam: 'exu', lib: 'Exutoire de test', role: 'exutoire', forme: 'puisard', exu: 'ZZ:ESSAI'};
}

/* WC et descente avant vers l'exutoire Z (type t, au sud), en Tronçon ; l'étiquette de l'exutoire est affichée */
function versExu(t){
  const d = doc({o: [['W', 'wc', 0, 6], ['Z', t, 0, 0], ['D', 'descente', 6, 6, {cote: 'avant'}]], l: [['T1', 'tr', '', '', ['W', 'Z']], ['T2', 'tr', '', '', ['D', 'Z']]]});
  d.el.find(e => e.id === 'Z').lab = null;
  return d;
}
/* le WC relié aussi au collecteur EU (par une jonction) : plusieurs réseaux */
const deuxReseaux = t => doc({o: [['W', 'wc', 0, 6], ['Z', t, 0, 0], ['j', 'jonction', 6, 0, {}]],
  l: [['T1', 'tr', '', '', ['W', 'Z']], ['T3', 'tr', '', '', ['W', 'j']], ['C', 'col', 'EU', '', [[6, -10], 'j', [6, 10]]]]});

/* ce que l'application fait d'un exutoire : analyse, anomalie du WC, écran, plan PDF, contrôle « plusieurs réseaux », constat */
async function releve(t){
  const d = versExu(t), an = V.analyser(copie(d), 'edl'), cd = V.constatDeduit(copie(d), an), out = {an};
  out.resObj = an.resObj.W ? an.resObj.W.etat + ' ' + an.resObj.W.res : 'absent';
  out.resPt = an.resPt.Z;
  out.resPiece = Object.keys(an.resPiece).filter(k => /^T1:/.test(k)).map(k => an.resPiece[k].res).join(' ');
  out.eu = an.anomalies.filter(a => a.objId === 'W').map(a => ({cle: a.cle, reseau: a.reseau, obs: a.obs, preco: a.preco, nc: a.nc, codes: a.codes, cat: a.cat}));
  out.lib = libExu(an.resObj.W ? an.resObj.W.res : null, an);
  const e = sur(() => dessiner(d, 20, [3, 3]));
  out.tuyau = typeof e === 'string' ? e : [...new Set(e.traits.filter(q => Math.abs(q.a.x) < 1e-6 && Math.abs(q.b.x) < 1e-6).map(q => q.coul))].join(' ');
  out.etiq = typeof e === 'string' ? e : (e.textes.find(x => x.t === V.TYPES[t].lib) || {}).coul;
  const p = await pdf(d, {mode: 'edl'});
  out.pdf = p.err.length ? p.err.join(' | ') : p.txt.filter(s => /^(exutoire de test|puisard \(infiltration\)|ZZ)/.test(s)).join(' | ');
  out.pdfCode = p.txt.some(s => /\bZZ\b/.test(s));
  const am = V.analyser(copie(deuxReseaux(t)), 'edl'), cm = am.controles.find(c => c.cle === 'multi:W');
  out.multi = cm ? cm.txt : 'aucun contrôle multi:W (' + (am.resObj.W ? am.resObj.W.etat : '?') + ')';
  const rw = cd.rows.find(r => r.id === 'wc'), rd = cd.rows.find(r => r.id === 'gout_av');
  out.cWC = rw ? rw.codes.join(',') + ' | ' + rw.libs.join(' ; ') + ' | ' + rw.conforme : 'ligne absente';
  out.cDesc = rd ? rd.raccord + ' | ' + rd.libs.join(' ; ') + ' | ' + rd.conforme : 'ligne absente';
  out.recup = JSON.stringify(cd.epRecup);
  return out;
}

/* a2, a3 : l'exutoire d'essai, comme un puisard d'après sa ligne de la table */
async function essai(n, t){
  const o = await releve(t), q = '« exutoire de test »';
  R.ok(o.resObj === 'ok ' + V.TYPES[t].exu, n + ' témoin : rejet du WC, la clé entière de l\'exutoire (' + o.resObj + ')');
  R.ok(o.resPt === 'EP' && o.resPiece === 'EP', n + ' tuyau EP : resPiece ' + JSON.stringify(o.resPiece) + ', resPt ' + JSON.stringify(o.resPt));
  R.ok(o.tuyau === VERT && o.etiq === '#00813b', n + ' à l\'écran : tuyau et étiquette de l\'exutoire en vert des EP (tuyau ' + o.tuyau + ', étiquette ' + o.etiq + ')');
  const a = o.eu.length === 1 ? o.eu[0] : null;
  R.ok(!!a && a.cle === 'eu-zz:W' && a.reseau === 'EU' && a.obs === 'WC : rejet à l\'exutoire de test' && a.preco === ZZ.eu.preco && a.nc === true
    && JSON.stringify(a.codes) === '["raccEUsep"]' && a.cat === 'inversion', n + ' WC relié : anomalie eu-zz de la table, seule (' + JSON.stringify(o.eu) + ')');
  R.ok(o.lib === 'exutoire de test', n + ' libExu : ' + q + ' (obtenu ' + JSON.stringify(o.lib) + ')');
  R.ok(/^exutoire de test/.test(o.pdf) && !o.pdfCode, n + ' plan PDF, « Rejet constaté » : ' + q + ', jamais le code (' + o.pdf + ')');
  R.ok(/\(.*exutoire de test.*\)/.test(o.multi) && !/ZZ/.test(o.multi), n + ' relié à plusieurs réseaux : ' + q + ' dans le message (' + o.multi + ')');
  R.ok(o.cWC === 'MILIEU | Exutoire de test : rejet au sol | non' && o.cDesc === ' | Exutoire de test (infiltration) | oui' && o.recup === '{"infil":true}',
    n + ' constat d\'après la table : WC ' + JSON.stringify(o.cWC) + ', descente ' + JSON.stringify(o.cDesc) + ', ouvrages EP ' + o.recup);
}
async function temoin(){
  const o = await releve('puisard');
  const a = o.eu.length === 1 ? o.eu[0] : {};
  R.ok(o.resPt === 'EP' && o.resPiece === 'EP' && o.tuyau === VERT && o.etiq === '#00813b' && a.cle === 'eu-inf:W' && a.obs === 'WC : rejet dans un puisard'
    && /^puisard \(infiltration\)/.test(o.pdf) && /\(.*puisard \(infiltration\).*\)/.test(o.multi)
    && o.cWC === 'MILIEU | Puisard : rejet au sol (milieu naturel) | non' && o.cDesc === ' | Puisard (infiltration à la parcelle) | oui' && o.recup === '{"puisard":true}',
    'a2 témoin, le même dessin vers un puisard : ' + JSON.stringify({resPt: o.resPt, resPiece: o.resPiece, tuyau: o.tuyau, etiq: o.etiq, eu: a.cle, pdf: o.pdf,
      multi: o.multi, cWC: o.cWC, cDesc: o.cDesc, recup: o.recup}));
}

/* a3 : descente → regard (tampon béton, sans cunette) → exutoire d'essai à clé imitée ; tronçons de réseau res ; libre : un Tronçon EP
   laissé libre au regard */
function regard(res, libre, mode){
  const l = [['T1', 'tr', res, '', ['D', 'R']], ['T2', 'tr', res, '', ['R', 'Z']]];
  if (libre) l.push(['T3', 'tr', 'EP', '', ['R', [4, 4]]]);
  const d = doc({o: [['D', 'descente', 0, 8, {cote: 'avant'}], ['R', 'regard', 0, 4, {tampon: 'beton', cunette: 'non'}], ['Z', 'essaiCle', 0, 0]], l});
  const an = V.analyser(copie(d), mode), A = an.anomalies, C = an.controles.filter(c => /^(contredit|sortielibre):/.test(c.cle));
  const ok = an.resPt.R === 'EP' && A.length === 1 && A[0].cle === 'tampon:R' && A[0].obs === 'Regard EP : tampon béton' && A[0].nc === false && !C.length;
  R.ok(ok, 'a3 descente → regard → exutoire à clé imitée, ' + (res ? 'Tronçon ' + res : 'Tronçon') + (libre ? ', un Tronçon EP laissé libre au regard' : '')
    + (mode === 'avp' ? ', avant-projet' : '') + ' : regard EP, seule anomalie « Regard EP : tampon béton » en réserve, ni contredit ni sortielibre (regard '
    + an.resPt.R + ' ; ' + A.map(a => a.cle + ' « ' + a.obs + ' » ' + (a.nc ? 'NC' : 'réserve')).join(', ') + (C.length ? ' ; ' + C.map(c => c.cle).join(', ') : '') + ')');
}

/* ---------- m117 : infiltration au sol ---------- */
const EPC = V.RES.EP.rgb.join(','), axe = (a, b) => Math.abs(a.x - b.x) < 1e-6 || Math.abs(a.y - b.y) < 1e-6;
/* angle d'un segment de l'écran (degrés, y vers le haut) */
const deg = t => Math.round(Math.atan2(-(t.b.y - t.a.y), t.b.x - t.a.x) * 180 / Math.PI);

/* r1 : le type, sa place, sa ligne de la table, son symbole */
function symbole(){
  const T = V.TYPES.infiltration, eq = (V.FAMILLES.find(f => f.id === 'equ') || {types: []}).types, X = V.EXU && V.EXU.SOL;
  R.ok(!!T && T.fam === 'exu' && T.lib === 'Infiltration au sol' && T.g === 'f' && T.role === 'exutoire' && T.forme === 'infiltration' && T.exu === 'SOL'
    && T.droit === true && !T.oriente, 'r1 type « infiltration » : exutoire, « posée », droit, non orienté (' + JSON.stringify(T || null) + ')');
  R.ok(eq.indexOf('puisard') >= 0 && eq[eq.indexOf('puisard') + 1] === 'infiltration', 'r1 palette Équipements : juste après le puisard (' + eq.join(', ') + ')');
  R.ok(!!X && X.lib === 'infiltration au sol' && X.res === 'EP' && X.eu.cle === 'eu-sol' && X.eu.obs === 'rejet au sol (infiltration)' && X.eu.nc === true
    && X.eu.cat === 'inversion' && X.cEU.code === 'MILIEU' && X.cEP.code === '' && X.cEP.recup === 'infil', 'r1 table des exutoires, ligne SOL (' + JSON.stringify(X || null) + ')');
  const r = V.rayonSymbole('infiltration'), P = V.primitives({k: 'pt', t: 'infiltration', p: {st: 'existant', obs: ''}}, V.RES.EP.rgb, 0);
  const M = P.filter(q => q.masque), L = P.filter(q => !q.masque), seg = L.filter(q => q.k === 'p' && !q.f && q.pts.length === 4);
  const vert = seg.filter(q => q.pts[0] === q.pts[2]), hor = seg.filter(q => q.pts[1] === q.pts[3]).sort((a, b) => b.pts[1] - a.pts[1]);
  const larg = hor.map(q => Math.abs(q.pts[2] - q.pts[0])), dedans = seg.every(q => Math.hypot(q.pts[0], q.pts[1]) <= r + 1e-9 && Math.hypot(q.pts[2], q.pts[3]) <= r + 1e-9);
  R.ok(r === 2.1 && M.length === 1 && P[0] === M[0] && M[0].k === 'c' && M[0].r === r && String(M[0].fond) === '255,255,255' && !M[0].trait
    && L.length === 4 && seg.length === 4 && L.every(q => String(q.trait) === EPC && q.ep > 0) && vert.length === 1 && hor.length === 3
    && larg[0] > larg[1] && larg[1] > larg[2] && dedans,
    'r1 symbole : masque blanc sans trait en premier, puis une tige et trois barres de plus en plus courtes, tracées, dans le disque ; rayon 2,1 (rayon '
    + r + ' ; ' + P.map(q => q.k + (q.masque ? ' masque' : '') + (q.trait ? ' trait' : '') + (q.pts ? ' ' + q.pts.map(v => +v.toFixed(2)).join(',') : ' r ' + q.r)).join(' | ') + ')');
}

/* r2 : plan tourné ; I : infiltration ; J : infiltration avec un angle propre venu d'un fichier ; G : regard non orienté (témoin) */
async function droit(){
  const d = doc({o: [['I', 'infiltration', 0, 0], ['J', 'infiltration', 8, 0, {a: 30}], ['G', 'regard', 0, 8]]}); d.rot = .5;
  const an = V.analyser(copie(d), 'edl'), vue = new V.Vue(800, 600); vue.s = 20; vue.cx = 4; vue.cy = 4; vue.rot = d.rot;
  const cv = canevas(), ex = sur(() => { V.dessinerCroquis(cv.ctx, copie(d), an, vue, 1, {}); return ''; });
  /* traits de l'écran autour de l'objet id (pixels) */
  const pres = id => { const e = d.el.find(x => x.id === id), c = vue.ecran(e.x, e.y);
    return cv.traits.filter(t => Math.hypot(t.a.x - c.x, t.a.y - c.y) < 14 && Math.hypot(t.b.x - c.x, t.b.y - c.y) < 14); };
  [['I', 'sans angle propre'], ['J', 'avec p.a = 30']].forEach(([id, q]) => {
    const s = pres(id), v = s.filter(t => Math.abs(t.a.x - t.b.x) < 1e-6), h = s.filter(t => Math.abs(t.a.y - t.b.y) < 1e-6);
    R.ok(!ex && s.length === 4 && v.length === 1 && h.length === 3 && s.every(t => t.coul === VERT),
      'r2 écran, plan tourné : infiltration ' + q + ', tige verticale et barres horizontales, en vert (' + (ex || s.map(t => deg(t) + '° ' + t.coul).join(', ') || 'aucun trait') + ')');
  });
  const g = pres('G');
  R.ok(g.length === 4 && g.every(t => !axe(t.a, t.b)), 'r2 témoin à l\'écran : le regard non orienté reste penché (' + g.map(deg).join('°, ') + '°)');
  const p = await pdf(d, {mode: 'edl'}), f = p.formes.filter(q => q.coul === EPC && !q.ferme && q.pts.length === 2), pe = f.filter(q => !axe(q.pts[0], q.pts[1]));
  R.ok(!p.err.length && f.length >= 12 && !pe.length, 'r2 PDF, plan tourné : traits verts des symboles (deux au plan, un à la légende) droits ('
    + (p.err.join(' | ') || f.length + ' traits, ' + pe.length + ' penchés') + ')');
  const c = p.formes.filter(q => q.ferme && q.pts.length === 4 && Math.abs(Math.hypot(q.pts[1].x - q.pts[0].x, q.pts[1].y - q.pts[0].y) - 3.2) < .01);
  R.ok(c.some(q => !axe(q.pts[0], q.pts[1])), 'r2 témoin au PDF : le carré du regard reste penché au plan (' + c.length + ' carrés de 3,2 mm, '
    + c.filter(q => !axe(q.pts[0], q.pts[1])).length + ' penchés)');
  const x = dxf(d), ins = x.ents.filter(e => e.type === 'INSERT' && e.c['2'] === 'VEDE_INFILTRATION'), rd = d.rot * 180 / Math.PI;
  R.ok(ins.length === 2 && ins.every(e => Math.abs(+e.c['50'] - rd) < 1e-3), 'r2 DXF : les deux INSERT VEDE_INFILTRATION à la rotation du plan, ' + rd.toFixed(4)
    + '° (' + (ins.map(e => e.c['50']).join(', ') || 'aucun ; blocs ' + x.blocs.join(', ')) + ')');
}

/* entités d'un bloc du DXF (type et codes), entre BLOCK et ENDBLK ; null si le bloc manque */
function blocDxf(texte, nom){
  const L = texte.split('\n'), out = []; let dans = false, e = null;
  for (let i = 0; i + 1 < L.length; i += 2){
    const c = L[i].trim(), v = L[i + 1];
    if (c === '0'){ if (dans && v === 'ENDBLK') return out; e = {type: v, c: {}}; if (dans) out.push(e); continue; }
    if (e && e.type === 'BLOCK' && c === '2' && v === nom) dans = true;
    if (e && !(c in e.c)) e.c[c] = v;
  }
  return dans ? out : null;
}
/* descente avant D → infiltration I ; l'étiquette de l'infiltration est affichée */
function versSol(){
  const d = doc({o: [['D', 'descente', 0, 6, {cote: 'avant'}], ['I', 'infiltration', 0, 0]], l: [['T1', 'tr', '', '', ['D', 'I']]]});
  d.el.find(e => e.id === 'I').lab = null;
  return d;
}
/* r3 : DXF et couleurs */
function rendu(){
  const d = versSol(), x = dxf(d), b = blocDxf(x.texte, 'VEDE_INFILTRATION'), pl = (b || []).filter(q => q.type === 'POLYLINE');
  const disques = pl.filter(q => '40' in q.c || (+q.c['70'] & 1) === 1);
  R.ok(!!b && pl.length === 4 && !disques.length && !b.some(q => q.type === 'CIRCLE'), 'r3 DXF : bloc VEDE_INFILTRATION, quatre polylignes ouvertes, sans disque plein ('
    + (b ? b.filter(q => !/^(VERTEX|SEQEND)$/.test(q.type)).map(q => q.type + (q.type === 'POLYLINE' ? ' 70=' + q.c['70'] + ('40' in q.c ? ' 40=' + q.c['40'] : '') : '')).join(', ')
      : 'bloc absent ; blocs ' + x.blocs.join(', ')) + ')');
  const ins = x.ents.find(e => e.type === 'INSERT' && e.c['2'] === 'VEDE_INFILTRATION');
  R.ok(!!ins && ins.cal === 'VEDE-SYMBOLES' && +ins.c['62'] === 3, 'r3 DXF : INSERT sur VEDE-SYMBOLES, couleur 3 (' + (ins ? ins.cal + ', ' + ins.c['62'] : 'absent') + ')');
  const tu = x.ents.filter(e => e.type === 'POLYLINE');
  R.ok(tu.length === 1 && tu[0].cal === 'VEDE-EP', 'r3 DXF : tuyau sur VEDE-EP (' + tu.map(e => e.cal).join(', ') + ')');
  const tx = x.ents.find(e => e.type === 'TEXT' && e.c['1'] === 'Infiltration au sol');
  R.ok(!!tx && +tx.c['62'] === 3, 'r3 DXF : étiquette « Infiltration au sol » en couleur 3 (' + (tx ? tx.cal + ', ' + tx.c['62'] : 'absente') + ')');
  const e = sur(() => dessiner(d, 20, [0, 3]));
  const tuy = typeof e === 'string' ? e : [...new Set(e.traits.filter(q => Math.abs(q.a.x) < 1e-6 && Math.abs(q.b.x) < 1e-6 && Math.abs(q.a.y - q.b.y) > 1).map(q => q.coul))].join(' ');
  const et = typeof e === 'string' ? e : (e.textes.find(q => q.t === 'Infiltration au sol') || {}).coul;
  R.ok(tuy === VERT && et === '#00813b', 'r3 écran : tuyau et étiquette verts (tuyau ' + tuy + ', étiquette ' + et + ')');
}

/* WC W et descente D vers l'exutoire I de type t (une infiltration par défaut) ; étiquettes masquées */
const wcEtDescente = (t = 'infiltration') => doc({o: [['W', 'wc', 0, 6], ['I', t, 0, 0], ['D', 'descente', 6, 6, {cote: 'avant'}]],
  l: [['T1', 'tr', '', '', ['W', 'I']], ['T2', 'tr', '', '', ['D', 'I']]]});
/* r4 : légende, page 2, contrôle de l'avant-projet */
async function planPdf(){
  const d = wcEtDescente(), p = await pdf(d, {mode: 'edl'}), n = p.txt.filter(s => s === 'Infiltration au sol').length;
  R.ok(!p.err.length && n === 1, 'r4 légende du plan : « Infiltration au sol » une fois (' + (p.err.join(' | ') || n + ' fois') + ')');
  const rej = p.txt.filter(s => /^infiltration au sol/.test(s)), code = p.txt.filter(s => /\bSOL\b/.test(s));
  R.ok(rej.indexOf('infiltration au sol') >= 0 && rej.some(s => /^infiltration au sol · anomalie n° \d/.test(s)) && !code.length,
    'r4 page 2, « Rejet constaté » : descente et WC vers « infiltration au sol », jamais le code (' + rej.concat(code).map(s => JSON.stringify(s)).join(', ') + ')');
  const a = await pdf(d, {mode: 'avp'}), reste = a.txt.filter(s => /^Reste après travaux/.test(s));
  R.ok(!a.err.length && reste.indexOf('Reste après travaux : WC : rejet au sol (infiltration)') >= 0,
    'r4 avant-projet sans travaux, contrôle : « Reste après travaux : WC : rejet au sol (infiltration) » (' + (a.err.join(' | ') || reste.join(' ; ') || 'rien') + ')');
}

/* r5 : constat déduit du croquis ; ligne du constat de l'anomalie créée au dossier */
function constat(){
  const d = wcEtDescente(), an = V.analyser(copie(d), 'edl'), cd = V.constatDeduit(copie(d), an);
  const rw = cd.rows.find(r => r.id === 'wc'), rd = cd.rows.find(r => r.id === 'gout_av');
  const w = rw ? rw.codes.join(',') + ' | ' + rw.libs.join(' ; ') + ' | ' + rw.conforme : 'ligne absente', ds = rd ? rd.raccord + ' | ' + rd.libs.join(' ; ') + ' | ' + rd.conforme : 'ligne absente';
  R.ok(ds === ' | Infiltration au sol (infiltration diffuse) | oui' && JSON.stringify(cd.epRecup) === '{"infil":true}',
    'r5 constat, descente : « Infiltration diffuse » cochée, raccordement à cocher, conforme (' + JSON.stringify(ds) + ', ouvrages EP ' + JSON.stringify(cd.epRecup) + ')');
  R.ok(w === 'MILIEU | Infiltration au sol : rejet au sol (milieu naturel) | non', 'r5 constat, WC : MILIEU, non conforme (' + JSON.stringify(w) + ')');
  /* au dossier (reconcilier) : sans la règle dans REGLES_LIGNE, l'anomalie partirait sans ligne (installation vide). Témoin : vers un puisard */
  [['infiltration', 'eu-sol:W'], ['puisard', 'eu-inf:W']].forEach(([t, cle]) => {
    const ops = sur(() => V.reconcilier(wcEtDescente(t), null, [])), cr = typeof ops === 'string' ? [] : ops.creer;
    const c = cr.find(x => x.croquis && x.croquis.cle === cle);
    R.ok(!!c && c.installation === 'wc' && c.croquis.auto.installation === 'wc' && c.nc === true,
      'r5 dossier' + (t === 'puisard' ? ', témoin vers un puisard' : '') + ' : l\'anomalie ' + cle + ' créée va sur la ligne « WC » du constat, non conforme ('
      + (typeof ops === 'string' ? ops : cr.map(x => (x.croquis && x.croquis.cle) + ' ' + JSON.stringify(x.installation) + (x.nc ? ' NC' : ' réserve')).join(', ') || 'rien de créé') + ')');
  });
}

/* r6 (garde) : type absent, comme dans une version qui ne le connaît pas ; remis après */
async function sansType(){
  const T0 = V.TYPES.infiltration;
  delete V.TYPES.infiltration;
  try {
    const d = wcEtDescente(); d.el.find(e => e.id === 'I').lab = null;
    const e = sur(() => dessiner(d, 20, [3, 3])), p = await pdf(d, {mode: 'edl'}), x = sur(() => dxf(d));
    R.ok(typeof e !== 'string' && !p.err.length && typeof x !== 'string' && x.blocs.indexOf('VEDE_OBJET') >= 0 && x.blocs.indexOf('VEDE_INFILTRATION') < 0,
      'r6 sans le type : écran, PDF et DXF sans exception, bloc VEDE_OBJET (' + [typeof e === 'string' ? e : 'écran ok', p.err.join(' | ') || 'PDF ok',
        typeof x === 'string' ? x : 'blocs ' + x.blocs.join(', ')].join(' ; ') + ')');
  } finally { if (T0) V.TYPES.infiltration = T0; }
}

(async () => {
  try {
    lignes();
    poserEssai();
    await temoin();
    await essai('a2', 'essai');
    await essai('a3', 'essaiCle');
    regard('', false, 'edl');
    regard('EP', false, 'edl');
    regard('', true, 'avp');
    symbole();
    await droit();
    rendu();
    await planPdf();
    constat();
    await sansType();
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
