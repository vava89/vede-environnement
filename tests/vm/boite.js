// Boîte de branchement en limite de propriété (souhait 10 ; décision D4 de .claude/conception-outils-dessin.md), sans navigateur ; plan PDF
// par la bibliothèque PDF de l'application ; croquis fictifs (12 rue Fictive, Ville-Exemple). m103 : champs p.limCote et p.limDist, ligne
// de l'étiquette ; m104 et m105 compléteront ce fichier (côté et distance proposés depuis le plan, reprise au constat).
// l1 à l19 (m103) : VCroquis.texteLimite : « à 0,80 m de la limite, intérieur » ou « …, extérieur » ; distance 0 : « en limite de
//   propriété », avec ou sans côté ; distance sans côté : « à 0,80 m de la limite » ; côté sans distance : « côté intérieur » ou « côté
//   extérieur » ; ni l'un ni l'autre : rien ; distance écrite avec deux décimales et la virgule (saisies « 0,8 », « 2 », « 0.5 », « 1,5 »
//   entouré d'espaces) ; valeur que la fiche refuse (« -1 », texte), venue d'un croquis altéré : la distance est ignorée.
// e1 à e6 (m103) : la ligne s'ajoute en dernière ligne à l'étiquette de la boîte (texteEtiquette), boîte « Projet » comprise ; témoins : une
//   boîte sans ces champs garde son étiquette ; une étiquette personnalisée remplace tout, ligne comprise (comme la profondeur) ; un regard
//   et un regard public qui porteraient ces champs n'en écrivent rien.
// s1 à s3 (m103) : toutes les lignes de l'étiquette, celle de la limite comprise, sont dans le texte du plan PDF de l'état des lieux et de
//   l'avant-projet (capture des textes comme vm/avant-projet.js) et dans des entités TEXT du DXF (calque VEDE-ETIQUETTES).
// Tous échouent sur df95377 (VCroquis.texteLimite absente, aucune ligne), sauf les témoins.
// usage : node tests/vm/boite.js [-v] [--app=<dossier>]
'use strict';
const {charger, rapport} = require('./charger.js');
const {V, ctx} = charger({pdf: true}), R = rapport('boite');
const copie = x => JSON.parse(JSON.stringify(x));
/* appel protégé : une exception devient le texte « exception : … » */
const sur = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };

/* Croquis fictif : WC, boîte EU, regard public sur le collecteur EU */
function nouveau(){ return V.nouveauDoc({numero: 'F-001', adresse: '12 rue Fictive', commune: 'Ville-Exemple'}); }
function pt(d, id, t, x, y, p){ const e = {id, k: 'pt', t, x, y, p: Object.assign(V.defautsPt(t), {meth: ['eau']}, p || {}), lab: null}; d.el.push(e); return e; }
function ln(d, id, t, res, v){
  const pos = {}; d.el.forEach(e => { if (e.k === 'pt') pos[e.id] = e; });
  const p = V.defautsLn(t, {res: res || ''}); p.res = t === 'col' ? (res || 'EU') : (res || '');
  d.el.push({id, k: 'ln', t, v: v.map(q => typeof q === 'string' ? {x: pos[q].x, y: pos[q].y, a: q} : {x: q[0], y: q[1], a: null}), p, lab: null});
}
const LIMITE = {limCote: 'int', limDist: '0,80'};
function maison(pb){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 10); pt(d, 'B1', 'boite', 0, 4, Object.assign({res: 'EU', dim: '40×40', prof: '0,80', tampon: 'fonte'}, pb || {}));
  pt(d, 'Rp', 'regard_pub', 0, 0, {res: 'EU'});
  ln(d, 'tW', 'tr', 'EU', ['W', 'B1']); ln(d, 'tB', 'tr', '', ['B1', 'Rp']); ln(d, 'C', 'col', 'EU', [[-10, 0], 'Rp', [10, 0]]);
  return d;
}
const elDe = (d, id) => d.el.find(e => e.id === id);
/* étiquette d'un élément du croquis, après l'analyse de l'état des lieux (ou de l'avant-projet) */
const etiquette = (d, id, mode) => sur(() => V.texteEtiquette(elDe(d, id), V.analyser(copie(d), mode || 'edl')));

/* l : texteLimite */
function limite(){
  if (typeof V.texteLimite !== 'function'){ R.ok(false, 'l : VCroquis.texteLimite est absente'); return; }
  const cas = [
    ['l1 intérieur, 0,80', {limCote: 'int', limDist: '0,80'}, 'à 0,80 m de la limite, intérieur'],
    ['l2 extérieur, 1,25', {limCote: 'ext', limDist: '1,25'}, 'à 1,25 m de la limite, extérieur'],
    ['l3 intérieur, 0', {limCote: 'int', limDist: '0'}, 'en limite de propriété'],
    ['l4 extérieur, 0', {limCote: 'ext', limDist: '0'}, 'en limite de propriété'],
    ['l5 0 sans côté', {limDist: '0'}, 'en limite de propriété'],
    ['l6 « 0,00 », côté vide', {limCote: '', limDist: '0,00'}, 'en limite de propriété'],
    ['l7 distance sans côté', {limCote: '', limDist: '0,80'}, 'à 0,80 m de la limite'],
    ['l8 côté intérieur sans distance', {limCote: 'int'}, 'côté intérieur'],
    ['l9 côté extérieur, distance vide', {limCote: 'ext', limDist: ''}, 'côté extérieur'],
    ['l10 aucun champ', {}, ''],
    ['l11 champs vides', {limCote: '', limDist: ''}, ''],
    ['l12 virgule, un seul chiffre : « 0,8 »', {limCote: 'int', limDist: '0,8'}, 'à 0,80 m de la limite, intérieur'],
    ['l13 entier : « 2 »', {limCote: 'ext', limDist: '2'}, 'à 2,00 m de la limite, extérieur'],
    ['l14 point décimal : « 0.5 »', {limDist: '0.5'}, 'à 0,50 m de la limite'],
    ['l15 espaces autour : « 1,5 »', {limCote: 'int', limDist: ' 1,5 '}, 'à 1,50 m de la limite, intérieur'],
    ['l16 « -1 » (refusé par la fiche, croquis altéré) : distance ignorée', {limCote: 'int', limDist: '-1'}, 'côté intérieur'],
    ['l17 texte non numérique (croquis altéré) : distance ignorée', {limDist: 'loin'}, ''],
    ['l18 côté inconnu (croquis altéré) : ignoré', {limCote: 'nord', limDist: '0,80'}, 'à 0,80 m de la limite'],
  ];
  cas.forEach(([n, p, att]) => { const vu = sur(() => V.texteLimite(p)); R.ok(vu === att, n + ' → ' + JSON.stringify(att) + ' (obtenu ' + JSON.stringify(vu) + ')'); });
  const vu = sur(() => V.texteLimite(undefined));
  R.ok(vu === '', 'l19 sans propriétés : rien (obtenu ' + JSON.stringify(vu) + ')');
}

/* e : la ligne dans l'étiquette de la boîte */
function etiquettes(){
  const BASE = 'Boîte de branchement EU\n40×40, P : 0,80 m, tampon fonte';
  const d0 = maison(), d1 = maison(LIMITE);
  const e0 = etiquette(d0, 'B1'), e1 = etiquette(d1, 'B1');
  R.ok(e0 === BASE, 'e1 témoin : boîte sans ces champs, étiquette inchangée ' + JSON.stringify(e0));
  R.ok(e1 === BASE + '\nà 0,80 m de la limite, intérieur', 'e2 boîte intérieur, 0,80 : la ligne s\'ajoute en dernière ligne (obtenu ' + JSON.stringify(e1) + ')');
  const d2 = maison({dim: '', prof: '', tampon: '', limCote: 'ext', limDist: '0'}), e2 = etiquette(d2, 'B1');
  R.ok(e2 === 'Boîte de branchement EU\nen limite de propriété', 'e3 boîte sans dimension, profondeur ni tampon, en limite (obtenu ' + JSON.stringify(e2) + ')');
  const d3 = maison({limCote: 'ext', st: 'projet'}), e3 = etiquette(d3, 'B1', 'avp');
  R.ok(e3 === 'Projet : ' + BASE + '\ncôté extérieur', 'e4 boîte « Projet », côté sans distance (obtenu ' + JSON.stringify(e3) + ')');
  const d4 = maison(Object.assign({etiq: 'Boîte EU\nsous le portail'}, LIMITE)), e4 = etiquette(d4, 'B1');
  R.ok(e4 === 'Boîte EU\nsous le portail', 'e5 témoin : l\'étiquette personnalisée remplace tout, ligne comprise, comme la profondeur (obtenu ' + JSON.stringify(e4) + ')');
  /* regard sur le tuyau de la boîte, regard public : les champs (posés à la main dans le croquis) n'y écrivent rien */
  const d5 = maison(); pt(d5, 'R1', 'regard', 0, 7, {dim: '40×40', prof: '0,80'}); ln(d5, 'tR', 'tr', '', ['R1', 'B1']);
  const d6 = copie(d5); Object.assign(elDe(d6, 'R1').p, LIMITE); Object.assign(elDe(d6, 'Rp').p, LIMITE);
  const r0 = etiquette(d5, 'R1'), r1 = etiquette(d6, 'R1'), q0 = etiquette(d5, 'Rp'), q1 = etiquette(d6, 'Rp');
  R.ok(r0 === r1 && q0 === q1 && !/limite/.test(r1 + q1), 'e6 témoin : regard et regard public avec ces champs, étiquettes inchangées ('
    + JSON.stringify(r1) + ' ; ' + JSON.stringify(q1) + ')');
}

/* s : plan PDF (état des lieux, avant-projet) et DXF */
async function textesPdf(doc, o){
  const J0 = ctx.jspdf.jsPDF, txt = [];
  const W = function(){ const d = new J0(...arguments); const ot = d.text; d.text = function(t){ try { txt.push([].concat(t).join(' ')); } catch (e){} return ot.apply(d, arguments); }; return d; };
  W.API = J0.API; ctx.jspdf.jsPDF = W;
  try { await V.pdfPlan(copie(doc), null, o || {}); } catch (e){ txt.push('ERR ' + e.message); } finally { ctx.jspdf.jsPDF = J0; }
  return txt;
}
/* entités TEXT du DXF : {cal : calque (code 8), txt : texte (code 1)} ; le DXF est en CP1252, lu en latin1 (mêmes octets pour « à », « é », « × ») */
function textesDxf(doc){
  const x = Buffer.from(V.ecrireDxf(copie(doc))).toString('latin1').split('\r\n'), out = [];
  for (let i = 0; i + 1 < x.length; i += 2){
    if (x[i].trim() !== '0' || x[i + 1] !== 'TEXT') continue;
    const t = {};
    for (let j = i + 2; j + 1 < x.length && x[j].trim() !== '0'; j += 2) t[x[j].trim()] = x[j + 1];
    out.push({cal: t['8'], txt: t['1']});
  }
  return out;
}
async function sorties(){
  const d = maison(LIMITE), lignes = ['Boîte de branchement EU', '40×40, P : 0,80 m, tampon fonte', 'à 0,80 m de la limite, intérieur'];
  for (const [n, mode] of [['s1 plan PDF de l\'état des lieux', 'edl'], ['s2 plan PDF de l\'avant-projet', 'avp']]){
    const txt = await textesPdf(d, {mode}), manque = lignes.filter(l => txt.indexOf(l) < 0), err = txt.filter(t => /^ERR/.test(t));
    R.ok(!manque.length && !err.length, n + ' : les trois lignes de l\'étiquette de la boîte sont imprimées'
      + (manque.length ? ' (absentes : ' + JSON.stringify(manque) + ')' : '') + (err.length ? ' ' + err.join(' | ') : ''));
  }
  const t = sur(() => textesDxf(d));
  if (typeof t === 'string'){ R.ok(false, 's3 DXF : ' + t); return; }
  const manque = lignes.filter(l => !t.some(q => q.cal === 'VEDE-ETIQUETTES' && q.txt === l));
  R.ok(!manque.length, 's3 DXF : chaque ligne de l\'étiquette de la boîte est une entité TEXT du calque VEDE-ETIQUETTES'
    + (manque.length ? ' (absentes : ' + JSON.stringify(manque) + ' ; textes : ' + JSON.stringify(t.map(q => q.txt).slice(0, 12)) + ')' : ''));
}

(async () => {
  limite();
  etiquettes();
  await sorties();
  R.fin();
})().catch(e => { console.log('ERREUR ' + (e && e.stack || e)); process.exitCode = 1; });
