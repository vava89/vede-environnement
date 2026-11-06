// Avant-projet (sans navigateur ; plan PDF par la bibliothèque PDF de l'application ; croquis fictifs, 12 rue Fictive, Ville-Exemple).
// usage : node tests/vm/avant-projet.js [-v] [--app=<dossier>]
// s1 à s6 (m80b) : WC « Tronçon EU » > R1, ancienne sortie de R1, tuyau « Projet » de R1 au collecteur EU : sortie « Tronçon EP » gardée
// laissée libre (signalée : Contrôles et « Contrôle de l'avant-projet » du plan ; avant : « Après travaux, le dessin ne fait plus apparaître
// d'anomalie de raccordement »), passée « À supprimer », « Tronçon EU », sans réseau, arrivée EP orientée vers R1 (rien de signalé), arrivée
// EP non orientée (lue comme une sortie : signalée).
// l1, l2 (m80d) : fosse « À supprimer » entre deux tuyaux (raccordement direct) : pas d'« extrémité libre » ; tuyau seul sur la fosse
// supprimée : l'extrémité libre reste signalée.
// s7 (m82) : deux anciennes sorties (EP et unitaire) : textes au pluriel, dans les Contrôles et sur le plan.
// p1 (m82) : boîte « Projet » où se rejoignent des tuyaux existants (WC, douche, branchement) : sur l'état des lieux, ils restent raccordés
// au collecteur et ne sont pas des extrémités libres.
'use strict';
const {charger, rapport} = require('./charger.js');
const {V, ctx} = charger({pdf: true}), R = rapport('avant-projet');
async function textesPdf(doc, o){
  const J0 = ctx.jspdf.jsPDF, txt = [];
  const W = function(){ const d = new J0(...arguments); const ot = d.text; d.text = function(t){ try { txt.push([].concat(t).join(' ')); } catch (e){} return ot.apply(d, arguments); }; return d; };
  W.API = J0.API; ctx.jspdf.jsPDF = W;
  try { await V.pdfPlan(JSON.parse(JSON.stringify(doc)), null, o || {}); } catch (e){ txt.push('ERR ' + e.message); } finally { ctx.jspdf.jsPDF = J0; }
  return txt;
}
function nouveau(){ return V.nouveauDoc({numero: 'F-001', adresse: '12 rue Fictive', commune: 'Ville-Exemple'}); }
function pt(d, id, t, x, y, p, st){ const e = {id, k: 'pt', t, x, y, p: Object.assign(V.defautsPt(t), {meth: ['eau']}, p || {}), lab: null}; if (t === 'jonction'){ e.lab = {off: true}; e.auto = false; } if (st) e.p.st = st; d.el.push(e); return e; }
function ln(d, id, t, res, v, st, sens){ const pos = {}; d.el.forEach(e => { if (e.k === 'pt') pos[e.id] = e; }); const p = Object.assign(V.defautsLn(t, {res: res || ''}), st ? {st} : {}, sens ? {sens} : {}); p.res = t === 'col' ? (res || 'EU') : (res || ''); d.el.push({id, k: 'ln', t, v: v.map(q => typeof q === 'string' ? {x: pos[q].x, y: pos[q].y, a: q} : {x: q[0], y: q[1], a: null}), p, lab: null}); }
function maison(variante){
  const d = nouveau(); pt(d, 'wc', 'wc', 0, 10); pt(d, 'R1', 'regard', 0, 6, {tampon: 'fonte'}); pt(d, 'j', 'jonction', -6, 0, {});
  ln(d, 'tW', 'tr', 'EU', ['wc', 'R1']); ln(d, 'C', 'col', 'EU', [[-12, 0], 'j', [0, 0]]);
  if (variante === 's1' || variante === 's2') ln(d, 'sor', 'tr', 'EP', ['R1', [6, 4]], variante === 's2' ? 'supprimer' : null);
  if (variante === 's3') ln(d, 'sor', 'tr', 'EU', ['R1', [6, 4]]);
  if (variante === 's4') ln(d, 'sor', 'tr', '', ['R1', [6, 4]]);
  if (variante === 's5') ln(d, 'sor', 'tr', 'EP', [[6, 4], 'R1'], null, 1);
  if (variante === 's6') ln(d, 'sor', 'tr', 'EP', [[6, 4], 'R1']);
  if (variante === 's7'){ ln(d, 'sor', 'tr', 'EP', ['R1', [6, 4]]); ln(d, 'sor2', 'tr', 'UN', ['R1', [6, 8]]); }
  ln(d, 'pj', 'tr', '', ['R1', 'j'], 'projet');
  return d;
}
function fosseSupprimee(seul){
  const d = nouveau(); pt(d, 'wc', 'wc', 0, 10); pt(d, 'F', 'fosse', 0, 6, {}, 'supprimer'); pt(d, 'RP', 'regard_pub', 0, 0, {}); pt(d, 'j', 'jonction', 0, 0, {});
  ln(d, 'tW', 'tr', 'EU', ['wc', 'F']);
  if (!seul) ln(d, 'tF', 'tr', 'EU', ['F', 'RP']);
  ln(d, 'C', 'col', 'EU', [[-10, 0], 'RP', [10, 0]]);
  return d;
}
const SORTIE = 'WC : sortie EP laissée libre à côté de l\'exutoire dessiné (la passer « À supprimer », la prolonger, ou indiquer le sens du tracé d\'une arrivée)';
const PDF_S = 'Après travaux : WC garde une sortie EP laissée libre : la passer « À supprimer » ou la raccorder dans le projet', PDF_OK = 'Après travaux, le dessin ne fait plus apparaître d\'anomalie de raccordement.';
(async () => {
  for (const [v, signale] of [['s1', true], ['s2', false], ['s3', false], ['s4', false], ['s5', false], ['s6', true]]){
    const d = maison(v), an = V.analyser(JSON.parse(JSON.stringify(d)), 'avp'), mq = an.controles.filter(c => c.niveau === 'manque').map(c => c.txt);
    const txt = await textesPdf(d, {mode: 'avp'}), i = txt.indexOf('Contrôle du projet'), ctrl = i < 0 ? [] : txt.slice(i + 1).filter(t => /Après travaux|Reste après travaux/.test(t));
    const bon = an.resObj.wc.etat === 'ok' && (signale ? mq.indexOf(SORTIE) >= 0 && ctrl.indexOf(PDF_S) >= 0 && ctrl.indexOf(PDF_OK) < 0 : mq.indexOf(SORTIE) < 0 && ctrl.length === 1 && ctrl[0] === PDF_OK) && !txt.some(t => /^ERR/.test(t));
    R.ok(bon, v + (signale ? ' (signalée)' : ' (rien)') + ' : manques ' + JSON.stringify(mq) + ' | plan ' + JSON.stringify(ctrl));
  }
  for (const [v, seul] of [['l1', false], ['l2', true]]){
    const d = fosseSupprimee(seul), an = V.analyser(JSON.parse(JSON.stringify(d)), 'avp'), lib = an.controles.filter(c => /extrémités? libres?, non reliées? à un objet/.test(c.txt));
    const bon = seul ? lib.length === 1 : lib.length === 0;
    R.ok(bon, v + ' : ' + (seul ? 'tuyau seul sur la fosse supprimée' : 'fosse supprimée entre deux tuyaux') + ', wc=' + an.resObj.wc.etat + (an.resObj.wc.res ? ':' + an.resObj.wc.res : '') + ' | contrôles « libre » ' + JSON.stringify(lib.map(c => c.txt)));
  }
  {
    const d = maison('s7'), an = V.analyser(JSON.parse(JSON.stringify(d)), 'avp'), mq = an.controles.filter(c => c.niveau === 'manque').map(c => c.txt);
    const txt = await textesPdf(d, {mode: 'avp'}), i = txt.indexOf('Contrôle du projet'), ctrl = i < 0 ? [] : txt.slice(i + 1).filter(t => /Après travaux|Reste après travaux/.test(t));
    const M = 'WC : sorties EP et unitaire laissées libres à côté de l\'exutoire dessiné (les passer « À supprimer », les prolonger, ou indiquer le sens du tracé d\'une arrivée)';
    const Pd = 'Après travaux : WC garde des sorties EP et unitaire laissées libres : les passer « À supprimer » ou les raccorder dans le projet';
    R.ok(mq.indexOf(M) >= 0 && ctrl.indexOf(Pd) >= 0, 's7 (deux sorties, pluriel) : manques ' + JSON.stringify(mq) + ' | plan ' + JSON.stringify(ctrl));
  }
  {
    const d = nouveau(); pt(d, 'wc', 'wc', -3, 6); pt(d, 'do', 'douche', 0, 9); pt(d, 'B', 'boite', 0, 6, {res: 'EU'}, 'projet'); pt(d, 'jK', 'jonction', 4, 6, {});
    ln(d, 'A', 'tr', '', ['wc', 'B']); ln(d, 'Bd', 'tr', '', ['do', 'B']); ln(d, 'C', 'tr', '', ['B', 'jK']); ln(d, 'K', 'col', 'EU', [[4, -2], 'jK', [4, 14]]);
    const an = V.analyser(JSON.parse(JSON.stringify(d)), 'edl'), et = ['wc', 'do'].map(id => id + '=' + an.resObj[id].etat + ':' + (an.resObj[id].res || '')).join(' ');
    const lib = an.controles.filter(c => /extrémités? libres?, non reliées? à un objet/.test(c.txt));
    R.ok(et === 'wc=ok:EU do=ok:EU' && !lib.length, 'p1 (boîte « Projet » à la jonction, état des lieux) : ' + et + ' | contrôles « libre » ' + JSON.stringify(lib.map(c => c.txt)));
  }
  R.fin();
})().catch(e => { console.log('ERREUR ' + (e && e.stack || e)); process.exitCode = 1; });
