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
// usage : node tests/vm/rejets.js [-v] [--app=<dossier>]
'use strict';
const {charger, doc, copie, rendus, rapport} = require('./charger.js');
const ch = charger({pdf: true}), {V} = ch, R = rapport('rejets'), {dessiner, pdf} = rendus(ch);
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
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
