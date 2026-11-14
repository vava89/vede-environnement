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
// Arbitrage (m119, consigne du 13 nov. 2026 : une anomalie à arbitrer n'est jamais comptée conforme) :
// z1 : regard sans tampon (à arbitrer d'office) : conclusion « tampon » (plan : « À compléter : regard sans tampon à arbitrer ») ; la ligne
//   du WC, que l'anomalie du regard ne vise pas, garde sa conformité.
// z2 : descente non visitable mise à arbitrer : « arbitrer » ; la ligne de la descente garde son code EP_D, ok null, marquée « à arbitrer »
//   (rows[].arbitrer) ; fiche de la descente « en attente » (VCroquis.etatSource) ; vers un puisard, la case puisard reste. Témoin : retenue.
// z3 : tampon béton en EP (réserve) mis à arbitrer : « arbitrer » (témoins : retenue « reserves », écartée « conformes »).
// z4 : anomalie saisie à la main sur le WC, à arbitrer : « arbitrer », ligne du WC à ok null ; témoins : retenue, écartée, sans objet.
// z5 : sans boîte, à arbitrer : « boite » ; avec une NC retenue : « non_conformes » ; sans boîte retenue : « non_conformes » ; écartée : « conformes ».
// z6 (garde) : ep-eu retenue et dep-nv à arbitrer : ligne EU_D, ok false, non conforme. z7 : deux anomalies à arbitrer : « plusieurs ».
// z8 (garde) : aucun appareil sur le plan, tampon béton EU mis à arbitrer : aucune conclusion (« sans objet »), comme avant : le code
//   d'arbitrage remplace seulement « Conformes » et « Conformes avec réserves ». Témoin : retenu, « non_conformes ».
// z9 : WC vers une fosse peut-être traversée (fosse:F, posée sur la fosse, « à arbitrer » d'office) : ligne du WC marquée « à arbitrer »,
//   comme celle d'une descente (ep-fosse) ; témoins : fosse retenue (FOSSE « non »), écartée (EU_D « oui »), descente.
// Échouent sur e728d76 par le comportement (conclusion « conformes », ligne conforme ou sans marque) : z1 à z5, z7 et z9, sauf le témoin
//   de z1 et la seconde vérification de z5 (NC retenue, retenue, écartée). z6 et le témoin « retenue » de z2 (gardes) n'y échouent que
//   parce que VCroquis.etatSource y est absente. z8 y passe. z9 échoue aussi sur la première version de m119 (ligne du WC sans marque).
// Puits (m120, décision du 13 nov. 2026 : un rejet EP dans un puits est une non-conformité ; décisions D6 à D9) :
// q1 : descente vers un puits : ep-puits retenue d'office, « Non conformes », fiche « anomalie n° 1 » ; au constat, ligne en MILIEU, ok null
//   (le dossier la juge par l'anomalie), aucune case des ouvrages EP ; écartée : « conformes », ligne « oui » ; mise à arbitrer :
//   « arbitrer », ligne MILIEU gardée, ok null, marquée « à arbitrer » (m119) ; WC vers un puits : eu-puits, ligne MILIEU « non ».
// q2 : le type (après « Rejet en milieu naturel » dans la palette Équipements, rappel du puits perdu), la ligne PUITS de la table (règles
//   EU et EP non conformes, cat « inversion » et « autre », place MILIEU), le symbole (deux cercles concentriques verts, rayon 2,1, l'intérieur
//   loin de celui du puisard) ; DXF : bloc VEDE_PUITS de deux cercles, INSERT sur VEDE-SYMBOLES, tuyau sur VEDE-EP ; écran : tuyau et
//   étiquette verts ; plan PDF : « Puits » une fois à la légende, « puits · anomalie n° … » au « Rejet constaté » de la page 2.
// q3 : avant-projet qui garde le puits : préconisation au tableau, « Reste après travaux : Descente EP : rejet dans un puits » ; témoin : le
//   rejet supprimé par le projet, plus rien ne reste ; au dossier (reconcilier), ep-puits créée en catégorie « autre », sur la ligne
//   « Gouttière(s) avant », non conforme, case gestEP.
// Échouent sur 7df0996 (type « puits » absent) : q1 à q3, sauf le témoin de q3.
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

/* ---------- m119 : une anomalie à arbitrer n'est jamais comptée conforme (consigne du 13 nov. 2026) ---------- */
/* bout du branchement : boîte du réseau res (B), puis regard public (Rp) sur le collecteur res */
const auBout = res => ({o: [['B', 'boite', 0, 4, {res}], ['Rp', 'regard_pub', 0, 0, {res}]], l: [['tB', 'tr', '', '', ['B', 'Rp']], ['C', 'col', res, '', [[-10, 0], 'Rp', [10, 0]]]]});
/* source S (type t, propriétés p) → [regard R aux propriétés pr] → boîte du réseau res */
function versBoite(t, p, res, pr){
  const b = auBout(res), o = [['S', t, 0, 10, p || {}]], l = [];
  if (pr){ o.push(['R', 'regard', 0, 7, pr]); l.push(['t1', 'tr', '', '', ['S', 'R']], ['t2', 'tr', '', '', ['R', 'B']]); }
  else l.push(['t1', 'tr', '', '', ['S', 'B']]);
  return doc({o: o.concat(b.o), l: l.concat(b.l)});
}
/* WC relié par une jonction au collecteur EU, sans boîte (anomalie sansboite:C:EU, « à arbitrer » d'office) ; pr : un regard R en chemin ;
   plus : objets et tracés de plus */
function sansBoite(pr, plus){
  const o = [['S', 'wc', 0, 10], ['j', 'jonction', 0, 0, {}]], l = [['C', 'col', 'EU', '', [[-10, 0], 'j', [10, 0]]]];
  if (pr){ o.push(['R', 'regard', 0, 7, pr]); l.push(['t1', 'tr', '', '', ['S', 'R']], ['t2', 'tr', '', '', ['R', 'j']]); }
  else l.push(['t1', 'tr', '', '', ['S', 'j']]);
  return doc({o: o.concat(plus ? plus.o : []), l: l.concat(plus ? plus.l : [])});
}
/* le même croquis avec les décisions dec ({clé : état}) et les anomalies saisies à la main manu */
function decide(d, dec, manu){
  Object.keys(dec || {}).forEach(k => { d.decisions[k] = {st: dec[k]}; });
  if (manu) d.anomManu = manu;
  return d;
}
/* anomalie fictive saisie à la main, d'état st, sur l'objet objId (aucun : sans objet) */
const aLaMain = (st, objId) => [Object.assign({id: 'm1', reseau: 'EU', obs: 'Anomalie fictive saisie à la main', preco: '', nc: true, st}, objId ? {objId} : {})];
/* ce que l'application tire d'un croquis : état des anomalies, conclusion proposée (VCroquis.conclusion, plan PDF), ligne du constat (codes,
   ok de chaque appareil, conformité, marque « à arbitrer » ; libellés à part), ouvrages EP, fiche de la source S (VCroquis.etatSource) */
async function bilan(d, ligne){
  const an = V.analyser(copie(d), 'edl'), l = V.anomaliesDoc(copie(d), an, null), cd = V.constatDeduit(copie(d), an), r = cd.rows.find(x => x.id === ligne);
  const p = await pdf(d, {mode: 'edl'}), cp = p.txt.filter(s => /^Conclusion (proposée|du constat)/.test(s));
  const es = typeof V.etatSource === 'function' ? sur(() => V.etatSource(copie(d), an, l, 'edl', 'S')) : 'VCroquis.etatSource absente';
  return {st: l.map(a => a.cle + ' ' + a.st).join(', '), c: V.conclusion(l, an), plan: p.err.join(' | ') || cp.join(' | '),
    ligne: r ? r.codes.join(',') + ' | ' + JSON.stringify(r.oks) + ' | ' + JSON.stringify(r.conforme) + (r.arbitrer ? ' | à arbitrer' : '') : 'ligne absente',
    libs: r ? r.libs.join(' ; ') : '', recup: JSON.stringify(cd.epRecup), etat: es && typeof es === 'object' ? es.cls + ' « ' + es.txt + ' »' : String(es)};
}
const vu = (o, k) => JSON.stringify(k ? k.reduce((m, x) => Object.assign(m, {[x]: o[x]}), {}) : o);
const CP = 'Conclusion proposée : ', DEP = 'Rejet : réseau EP départemental', WCR = 'Rejet : réseau EU départemental';
async function arbitrage(){
  /* z1 : regard sans tampon (« à arbitrer » d'office) entre le WC et la boîte EU */
  let o = await bilan(versBoite('wc', {}, 'EU', {tampon: 'absent'}), 'wc');
  R.ok(o.st === 'sanstampon:R arbitrer' && o.c === 'tampon' && o.plan === CP + 'À compléter : regard sans tampon à arbitrer',
    'z1 regard sans tampon à arbitrer : conclusion « tampon », au plan « À compléter : regard sans tampon à arbitrer » (' + vu(o, ['st', 'c', 'plan']) + ')');
  R.ok(o.ligne === 'EU_D | [true] | "oui"', 'z1 témoin : la ligne du WC, que l\'anomalie du regard ne vise pas, garde sa conformité (' + vu(o, ['ligne']) + ')');
  /* z2 : descente non visitable (NC) mise « à arbitrer » par l'opérateur ; témoin : retenue (d'office) */
  o = await bilan(decide(versBoite('descente', {visitable: 'non'}, 'EP'), {'dep-nv:S': 'arbitrer'}), 'gout_av');
  R.ok(o.st === 'dep-nv:S arbitrer' && o.c === 'arbitrer' && o.plan === CP + 'À compléter : une anomalie reste à arbitrer',
    'z2 descente non visitable à arbitrer : conclusion « arbitrer », au plan « À compléter : une anomalie reste à arbitrer » (' + vu(o, ['st', 'c', 'plan']) + ')');
  R.ok(o.ligne === 'EP_D | [null] | "" | à arbitrer' && o.libs === 'Réseau EP départemental',
    'z2 constat : la ligne de la descente garde son raccordement (EP_D), ok null, ni conforme ni non conforme, marquée « à arbitrer » (' + vu(o, ['ligne', 'libs']) + ')');
  R.ok(o.etat === 'att « ' + DEP + ' · anomalie à arbitrer »', 'z2 fiche de la descente : en attente, « anomalie à arbitrer » (' + o.etat + ')');
  o = await bilan(versBoite('descente', {visitable: 'non'}, 'EP'), 'gout_av');
  R.ok(o.st === 'dep-nv:S retenue' && o.c === 'non_conformes' && o.ligne === 'EP_D | [true] | "oui"' && o.etat === 'ko « ' + DEP + ' · anomalie n° 1 »',
    'z2 témoin, retenue : non conformes, ligne inchangée (le dossier la rend non conforme par l\'anomalie), fiche « anomalie n° 1 » (' + vu(o, ['st', 'c', 'ligne', 'etat']) + ')');
  const verP = d => decide(doc({o: [['S', 'descente', 0, 10, {visitable: 'non'}], ['P', 'puisard', 0, 4]], l: [['t1', 'tr', '', '', ['S', 'P']]]}), d);
  o = await bilan(verP({'dep-nv:S': 'arbitrer'}), 'gout_av');
  R.ok(o.c === 'arbitrer' && o.ligne === ' | [null] | "" | à arbitrer' && o.libs === 'Puisard (infiltration à la parcelle)' && o.recup === '{"puisard":true}',
    'z2 vers un puisard : « arbitrer », ligne marquée sans conformité, la case puisard reste (' + vu(o, ['c', 'ligne', 'libs', 'recup']) + ')');
  /* z3 : réserve (tampon béton d'un regard EP) mise à arbitrer ; témoins : retenue (réserves), écartée (conformes) */
  const z3 = dec => bilan(decide(versBoite('descente', {}, 'EP', {tampon: 'beton'}), dec), 'gout_av');
  o = await z3({'tampon:R': 'arbitrer'});
  const o3r = await z3({}), o3e = await z3({'tampon:R': 'ecartee'});
  R.ok(o.st === 'tampon:R arbitrer' && o.c === 'arbitrer' && o.plan === CP + 'À compléter : une anomalie reste à arbitrer' && o3r.c === 'reserves' && o3e.c === 'conformes',
    'z3 tampon béton en EP (réserve) à arbitrer : « arbitrer » ; retenue : « reserves » ; écartée : « conformes » (' + vu({arbitrer: [o.st, o.c, o.plan], retenue: o3r.c, ecartee: o3e.c}) + ')');
  /* z4 : anomalie saisie à la main sur le WC, à arbitrer ; témoins : retenue, écartée, à arbitrer sans objet */
  const z4 = (st, objId) => bilan(decide(versBoite('wc', {}, 'EU'), {}, aLaMain(st, objId)), 'wc');
  o = await z4('arbitrer', 'S');
  R.ok(o.c === 'arbitrer' && o.ligne === 'EU_D | [null] | "" | à arbitrer' && o.etat === 'att « ' + WCR + ' · anomalie à arbitrer »',
    'z4 anomalie saisie à la main sur le WC, à arbitrer : « arbitrer », ligne du WC à ok null et marquée, fiche en attente (' + vu(o, ['c', 'ligne', 'etat']) + ')');
  const o4r = await z4('retenue', 'S'), o4e = await z4('ecartee', 'S'), o4s = await z4('arbitrer');
  R.ok(o4r.c === 'non_conformes' && o4r.ligne === 'EU_D | [true] | "oui"' && /^ko /.test(o4r.etat) && o4e.c === 'conformes' && o4e.ligne === 'EU_D | [true] | "oui"'
    && o4s.c === 'arbitrer' && o4s.ligne === 'EU_D | [true] | "oui"',
    'z4 témoins : retenue « non_conformes » (fiche ko), écartée « conformes », à arbitrer sans objet « arbitrer » sans ligne marquée ('
    + vu({retenue: [o4r.c, o4r.ligne, o4r.etat], ecartee: [o4e.c, o4e.ligne], sansObjet: [o4s.c, o4s.ligne]}) + ')');
  /* z5 : branchement sans boîte (à arbitrer d'office) : seul ; avec une NC retenue (descente non visitable vers un puisard) ; retenu ; écarté */
  const nv = {o: [['D', 'descente', 6, 10, {visitable: 'non'}], ['P', 'puisard', 6, 4]], l: [['t3', 'tr', '', '', ['D', 'P']]]};
  const o5 = await bilan(sansBoite(), 'wc'), o5n = await bilan(sansBoite(null, nv), 'wc');
  const o5r = await bilan(decide(sansBoite(), {'sansboite:C:EU': 'retenue'}), 'wc'), o5e = await bilan(decide(sansBoite(), {'sansboite:C:EU': 'ecartee'}), 'wc');
  R.ok(o5.st === 'sansboite:C:EU arbitrer' && o5.c === 'boite' && o5.plan === CP + 'À compléter : absence de boîte de branchement à arbitrer',
    'z5 sans boîte, à arbitrer : « boite », au plan « À compléter : absence de boîte de branchement à arbitrer » (' + vu(o5, ['st', 'c', 'plan']) + ')');
  R.ok(o5n.c === 'non_conformes' && o5r.c === 'non_conformes' && o5e.c === 'conformes' && o5e.plan === CP + 'Conformes',
    'z5 avec une NC retenue : « non_conformes » ; sans boîte retenue : « non_conformes » ; écartée : « conformes » (' + vu({nc: o5n.c, retenue: o5r.c, ecartee: [o5e.c, o5e.plan]}) + ')');
  /* z6 (garde) : descente non visitable reliée à la boîte EU : ep-eu retenue, dep-nv à arbitrer : la ligne reste non conforme */
  o = await bilan(decide(versBoite('descente', {visitable: 'non'}, 'EU'), {'dep-nv:S': 'arbitrer'}), 'gout_av');
  R.ok(o.st === 'ep-eu:S retenue, dep-nv:S arbitrer' && o.c === 'non_conformes' && /^EU_D \| \[false\] \| "non"/.test(o.ligne) && /^ko /.test(o.etat),
    'z6 (garde) ep-eu retenue et dep-nv à arbitrer : non conformes, ligne EU_D à ok false, fiche ko (' + vu(o, ['st', 'c', 'ligne', 'etat']) + ')');
  /* z7 : branchement sans boîte et regard sans tampon, tous deux à arbitrer */
  o = await bilan(sansBoite({tampon: 'absent'}), 'wc');
  R.ok(o.st === 'sansboite:C:EU arbitrer, sanstampon:R arbitrer' && o.c === 'plusieurs' && o.plan === CP + 'À compléter : plusieurs anomalies restent à arbitrer',
    'z7 deux anomalies à arbitrer : « plusieurs », au plan « À compléter : plusieurs anomalies restent à arbitrer » (' + vu(o, ['st', 'c', 'plan']) + ')');
  /* z8 (garde) : aucun appareil sur le plan, regard EU au tampon béton (NC) mis à arbitrer : rien n'est proposé, comme avant (« sans objet ») ;
     témoin : retenue, « non_conformes » */
  const z8 = dec => { const b = auBout('EU'); return bilan(decide(doc({o: [['R', 'regard', 0, 7, {tampon: 'beton'}]].concat(b.o), l: [['t2', 'tr', '', '', ['R', 'B']]].concat(b.l)}), dec), 'wc'); };
  o = await z8({'tampon:R': 'arbitrer'});
  const o8r = await z8({});
  R.ok(o.st === 'tampon:R arbitrer' && o.c === '' && o.plan === CP + 'sans objet' && o8r.st === 'tampon:R retenue' && o8r.c === 'non_conformes',
    'z8 (garde) sans appareil, tampon béton à arbitrer : aucune conclusion (« sans objet ») ; retenu : « non_conformes » (' + vu({arbitrer: [o.st, o.c, o.plan], retenue: [o8r.st, o8r.c]}) + ')');
  /* z9 : WC vers une fosse peut-être traversée (une arrivée laissée libre dans le regard d'amont), « à arbitrer » d'office : l'anomalie
     fosse:F est posée sur la fosse, mais la ligne du WC est marquée, comme celle d'une descente (ep-fosse:S) ; témoins : retenue, écartée */
  const z9 = (t, dec) => { const r = t === 'wc' ? 'EU' : 'EP';
    return bilan(decide(doc({o: [['S', t, 0, 12, t === 'wc' ? {} : {cote: 'avant'}], ['R1', 'regard', 0, 8], ['F', 'fosse', 0, 5], ['R3', 'regard', 0, 2]],
      l: [['L1', 'tr', r, '', ['S', 'R1']], ['A', 'tr', r, '', ['R1', 'F']], ['B', 'tr', r, '', ['F', 'R3']], ['Sx', 'tr', r, '', ['R3', [0, -2]]], ['Arr', 'tr', r, '', [[-5, 8], 'R1'], 0]]}), dec),
      t === 'wc' ? 'wc' : 'gout_av'); };
  o = await z9('wc', {});
  R.ok(o.st === 'fosse:F arbitrer' && o.c === 'fosse' && o.ligne === ' | [null] | "" | à arbitrer' && /^Fosse septique à arbitrer/.test(o.libs) && /^att .* · fosse septique à arbitrer/.test(o.etat),
    'z9 WC vers une fosse peut-être traversée, à arbitrer : conclusion « fosse », ligne du WC sans code ni conformité, marquée « à arbitrer », fiche en attente ('
    + vu(o, ['st', 'c', 'ligne', 'libs', 'etat']) + ')');
  const o9r = await z9('wc', {'fosse:F': 'retenue'}), o9e = await z9('wc', {'fosse:F': 'ecartee'}), o9d = await z9('descente', {});
  R.ok(o9r.ligne === 'FOSSE | [false] | "non"' && o9e.ligne === 'EU_D | [true] | "oui"' && o9d.st === 'ep-fosse:S arbitrer' && o9d.ligne === ' | [null] | "" | à arbitrer',
    'z9 témoins : fosse retenue, ligne FOSSE « non » ; écartée, EU_D « oui », sans marque ; descente vers la fosse, marquée (' + vu({retenue: o9r.ligne, ecartee: o9e.ligne, descente: [o9d.st, o9d.ligne]}) + ')');
}

/* ---------- m120 : puits (décision du 13 nov. 2026 : un rejet EP dans un puits est une non-conformité) ---------- */
/* source S (type t) reliée par un tronçon sans réseau au puits W, avec les décisions dec */
const versPuits = (t, dec) => decide(doc({o: [['S', t, 0, 10], ['W', 'puits', 0, 4]], l: [['t1', 'tr', '', '', ['S', 'W']]]}), dec);
const RPU = 'Rejet : puits', PUL = 'Puits : rejet en milieu naturel', PRE_EP = 'Suppression du rejet dans le puits ; raccordement au branchement EP ou gestion à la parcelle';
/* q1 : constat déduit, conclusion et fiche de la source : ep-puits retenue d'office, écartée, mise à arbitrer ; WC vers un puits */
async function puitsConstat(){
  const o = await bilan(versPuits('descente'), 'gout_av');
  R.ok(o.st === 'ep-puits:S retenue' && o.c === 'non_conformes' && o.plan === CP + 'Non conformes' && o.etat === 'ko « ' + RPU + ' · anomalie n° 1 »',
    'q1 descente vers un puits : ep-puits retenue d\'office, « Non conformes », fiche « anomalie n° 1 » (' + vu(o, ['st', 'c', 'plan', 'etat']) + ')');
  R.ok(o.ligne === 'MILIEU | [null] | ""' && o.libs === PUL && o.recup === '{}',
    'q1 constat : la ligne de la descente en MILIEU, ok null (le dossier la juge par l\'anomalie), aucune case des ouvrages EP (' + vu(o, ['ligne', 'libs', 'recup']) + ')');
  const e = await bilan(versPuits('descente', {'ep-puits:S': 'ecartee'}), 'gout_av');
  R.ok(e.st === 'ep-puits:S ecartee' && e.c === 'conformes' && e.ligne === 'MILIEU | [true] | "oui"' && e.etat === 'ok « ' + RPU + ' »',
    'q1 anomalie écartée dans Contrôles : « conformes », ligne MILIEU « oui », fiche ok (' + vu(e, ['st', 'c', 'ligne', 'etat']) + ')');
  const a = await bilan(versPuits('descente', {'ep-puits:S': 'arbitrer'}), 'gout_av');
  R.ok(a.st === 'ep-puits:S arbitrer' && a.c === 'arbitrer' && a.plan === CP + 'À compléter : une anomalie reste à arbitrer' && a.ligne === 'MILIEU | [null] | "" | à arbitrer'
    && a.etat === 'att « ' + RPU + ' · anomalie à arbitrer »',
    'q1 mise à arbitrer : « arbitrer », ligne MILIEU gardée, ok null, marquée « à arbitrer » ; fiche en attente (' + vu(a, ['st', 'c', 'plan', 'ligne', 'etat']) + ')');
  const w = await bilan(versPuits('wc'), 'wc');
  R.ok(w.st === 'eu-puits:S retenue' && w.c === 'non_conformes' && w.ligne === 'MILIEU | [false] | "non"' && w.libs === PUL,
    'q1 WC vers un puits : eu-puits retenue, ligne du WC en MILIEU, non conforme (' + vu(w, ['st', 'c', 'ligne', 'libs']) + ')');
}
/* q2 : le type, sa place, la ligne PUITS de la table, le symbole ; DXF, couleurs, légende et page 2 du plan PDF */
async function puitsRendu(){
  const T = V.TYPES.puits, eq = (V.FAMILLES.find(f => f.id === 'equ') || {types: []}).types, X = V.EXU && V.EXU.PUITS;
  R.ok(!!T && T.fam === 'exu' && T.lib === 'Puits' && T.role === 'exutoire' && T.forme === 'puits' && T.exu === 'PUITS' && !T.g && !T.droit && !T.oriente
    && T.rappel === 'Un puits perdu (qui infiltre les eaux) se dessine en Puisard.',
    'q2 type « puits » : exutoire PUITS, ni droit ni orienté, avec le rappel du puits perdu (' + JSON.stringify(T || null) + ')');
  R.ok(eq.indexOf('milieu') >= 0 && eq[eq.indexOf('milieu') + 1] === 'puits', 'q2 palette Équipements : juste après « Rejet en milieu naturel » (' + eq.join(', ') + ')');
  R.ok(!!(X && X.eu && X.ep && X.cEU && X.cEP) && X.lib === 'puits' && X.res === 'EP' && X.eu.cle === 'eu-puits' && X.eu.obs === 'rejet dans un puits' && X.eu.nc === true
    && X.eu.cat === 'inversion' && X.eu.codes.join() === 'raccEUsep' && X.eu.preco === 'Suppression du rejet dans le puits et raccordement au branchement EU'
    && X.ep.cle === 'ep-puits' && X.ep.obs === 'rejet dans un puits' && X.ep.nc === true && X.ep.cat === 'autre' && X.ep.codes.join() === 'gestEP' && X.ep.preco === PRE_EP
    && X.cEU.code === 'MILIEU' && X.cEU.lib === PUL && X.cEP.code === 'MILIEU' && X.cEP.lib === PUL && !X.cEP.recup,
    'q2 table des exutoires, ligne PUITS : règles EU et EP non conformes, place MILIEU au constat (' + JSON.stringify(X || null) + ')');
  /* symbole : deux cercles concentriques verts, tracés, l'extérieur blanc dedans (rayon 2,1) ; l'intérieur nettement plus grand que celui
     du puisard, pour ne pas les confondre */
  const prim = t => V.primitives({k: 'pt', t, p: {st: 'existant', obs: ''}}, V.RES.EP.rgb, 0), P = prim('puits'), Q = prim('puisard');
  const cer = P.filter(q => q.k === 'c');
  R.ok(V.rayonSymbole('puits') === 2.1 && P.length === 2 && cer.length === 2 && cer[0].r === 2.1 && String(cer[0].fond) === '255,255,255' && !cer[1].fond
    && cer[1].r < 2.1 && Q.length === 2 && cer[1].r - Q[1].r >= .4 && cer.every(q => q.x === 0 && q.y === 0 && String(q.trait) === EPC && q.ep > 0 && !q.masque),
    'q2 symbole : deux cercles concentriques verts, rayon 2,1, l\'intérieur loin de celui du puisard (rayon ' + V.rayonSymbole('puits') + ' ; '
    + P.map(q => q.k + ' r ' + q.r + (q.fond ? ' fond ' + q.fond : '') + (q.trait ? ' trait ' + q.trait : '')).join(' | ') + ' ; puisard ' + Q.map(q => q.r).join(', ') + ')');
  /* DXF : bloc VEDE_PUITS (les deux cercles), INSERT sur VEDE-SYMBOLES en couleur 3, tuyau sur VEDE-EP, étiquette « Puits » en couleur 3 */
  const d = doc({o: [['D', 'descente', 0, 6, {cote: 'avant'}], ['I', 'puits', 0, 0]], l: [['T1', 'tr', '', '', ['D', 'I']]]});
  d.el.find(q => q.id === 'I').lab = null;
  const x = dxf(d), b = blocDxf(x.texte, 'VEDE_PUITS'), ci = (b || []).filter(q => q.type === 'CIRCLE');
  const ins = x.ents.find(q => q.type === 'INSERT' && q.c['2'] === 'VEDE_PUITS'), tu = x.ents.filter(q => q.type === 'POLYLINE'), tx = x.ents.find(q => q.type === 'TEXT' && q.c['1'] === 'Puits');
  R.ok(!!b && b.length === 2 && ci.length === 2 && ci.map(q => +q.c['40']).join() === cer.map(q => q.r).join() && !!ins && ins.cal === 'VEDE-SYMBOLES' && +ins.c['62'] === 3
    && tu.length === 1 && tu[0].cal === 'VEDE-EP' && !!tx && +tx.c['62'] === 3,
    'q2 DXF : bloc VEDE_PUITS de deux cercles, INSERT sur VEDE-SYMBOLES en couleur 3, tuyau sur VEDE-EP, étiquette « Puits » en couleur 3 ('
    + (b ? b.map(q => q.type + ('40' in q.c ? ' ' + q.c['40'] : '')).join(', ') : 'bloc absent ; blocs ' + x.blocs.join(', ')) + ' ; ' + (ins ? ins.cal + ' ' + ins.c['62'] : 'INSERT absent')
    + ' ; ' + tu.map(q => q.cal).join(', ') + ' ; ' + (tx ? tx.cal + ' ' + tx.c['62'] : 'étiquette absente') + ')');
  const ec = sur(() => dessiner(d, 20, [0, 3]));
  const tuy = typeof ec === 'string' ? ec : [...new Set(ec.traits.filter(q => Math.abs(q.a.x) < 1e-6 && Math.abs(q.b.x) < 1e-6 && Math.abs(q.a.y - q.b.y) > 1).map(q => q.coul))].join(' ');
  const et = typeof ec === 'string' ? ec : (ec.textes.find(q => q.t === 'Puits') || {}).coul;
  R.ok(tuy === VERT && et === '#00813b', 'q2 écran : tuyau et étiquette verts (tuyau ' + tuy + ', étiquette ' + et + ')');
  /* plan PDF : légende, colonne « Rejet constaté » de la page 2 (WC et descente, chacun son anomalie), jamais le code */
  const p = await pdf(wcEtDescente('puits'), {mode: 'edl'}), n = p.txt.filter(s => s === 'Puits').length;
  const rej = p.txt.filter(s => /^puits\b/.test(s)), code = p.txt.filter(s => /\bPUITS\b/.test(s));
  R.ok(!p.err.length && n === 1 && rej.length === 2 && rej.every(s => /^puits · anomalie n° \d+$/.test(s)) && !code.length,
    'q2 plan PDF : « Puits » une fois à la légende ; « puits » au « Rejet constaté » de la page 2, pour le WC et la descente, jamais le code ('
    + (p.err.join(' | ') || n + ' fois ; ' + rej.concat(code).map(s => JSON.stringify(s)).join(', ')) + ')');
}
/* q3 : avant-projet qui garde le puits (aucun travaux) : la préconisation au tableau, « Reste après travaux » au contrôle du projet ; témoin :
   le tronçon vers le puits « à supprimer » et un tronçon « projet » vers une boîte EP « projet » : plus rien ne reste. Au dossier
   (reconcilier) : ep-puits créée, en catégorie « autre », sur la ligne « Gouttière(s) avant », non conforme */
async function puitsProjet(){
  const ctl = t => t.filter(s => /^(Reste après travaux|Après travaux)/.test(s));
  const a = await pdf(versPuits('descente'), {mode: 'avp'}), pr = a.txt.filter(s => /^Suppression du rejet dans le puits/.test(s));
  R.ok(!a.err.length && ctl(a.txt).indexOf('Reste après travaux : Descente EP : rejet dans un puits') >= 0 && pr.length === 1,
    'q3 avant-projet qui garde le puits : préconisation au tableau, « Reste après travaux : Descente EP : rejet dans un puits » ('
    + (a.err.join(' | ') || pr.concat(ctl(a.txt)).join(' ; ') || 'rien') + ')');
  const dT = doc({o: [['S', 'descente', 0, 10], ['W', 'puits', 0, 4], ['B', 'boite', 6, 4, {res: 'EP', st: 'projet'}]],
    l: [['t1', 'tr', '', 'supprimer', ['S', 'W']], ['t2', 'tr', '', 'projet', ['S', 'B']]]});
  const t = await pdf(dT, {mode: 'avp'});
  R.ok(!t.err.length && ctl(t.txt).join(' ; ') === 'Après travaux, le dessin ne fait plus apparaître d\'anomalie de raccordement.',
    'q3 témoin, rejet du puits supprimé par le projet : plus rien ne reste (' + (t.err.join(' | ') || ctl(t.txt).join(' ; ') || 'rien') + ')');
  const ops = sur(() => V.reconcilier(versPuits('descente'), null, [])), cr = typeof ops === 'string' ? [] : ops.creer;
  const c = cr.find(q => q.croquis && q.croquis.cle === 'ep-puits:S');
  R.ok(!!c && c.categorie === 'autre' && c.installation === 'gout_av' && c.nc === true && c.reseau === 'EP' && c.observation === 'Descente EP : rejet dans un puits'
    && c.preconisation === PRE_EP && c.croquis.codes.join() === 'gestEP' && c.croquis.auto.installation === 'gout_av',
    'q3 dossier : ep-puits créée, catégorie « autre », ligne « Gouttière(s) avant », non conforme, case gestEP ('
    + (typeof ops === 'string' ? ops : cr.map(q => (q.croquis && q.croquis.cle) + ' ' + q.categorie + ' ' + JSON.stringify(q.installation) + (q.nc ? ' NC' : ' réserve')).join(', ') || 'rien de créé') + ')');
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
    await arbitrage();
    await puitsConstat();
    await puitsRendu();
    await puitsProjet();
    await sansType();
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
