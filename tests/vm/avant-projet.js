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
// p2 (m83) : tuyau existant « Tronçon EP » d'un WC fini seul sur un regard « Projet » : sur l'état des lieux, une extrémité libre (EP présumé,
// NC). p3 (m83) : regard « Projet » au milieu d'un tuyau existant : l'état des lieux est celui du même dessin sans lui (même boîte, même
// « pas de boîte », le message « le dessin le relie à » une seule fois). p4 (m84) : attente « Tronçon EU » vers un lavabo « Projet » : sur
// l'état des lieux, une arrivée, pas une sortie : la fosse en série reste comptée.
// p5, p6 (m95) : raccord au milieu d'un tuyau existant, d'où part un tuyau « Projet » (état des lieux) ou une branche « À supprimer »
// (avant-projet) : même analyse que sans le raccord (échouent sur ba2d32a).
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
  {
    const d = nouveau(); pt(d, 'wc', 'wc', 0, 8); pt(d, 'R', 'regard', 0, 2, {tampon: 'fonte'}, 'projet'); ln(d, 'A', 'tr', 'EP', ['wc', 'R']);
    const an = V.analyser(JSON.parse(JSON.stringify(d)), 'edl'), L = V.anomaliesDoc(JSON.parse(JSON.stringify(d)), an), r = an.resObj.wc;
    R.ok(r.etat === 'ok' && r.res === 'EP' && r.presume && L.some(a => a.cle === 'eu-ep:wc' && a.st === 'retenue'), 'p2 (tuyau existant fini seul sur un regard « Projet ») : wc=' + r.etat + ':' + r.res + (r.presume ? '(p)' : '') + ' | ' + L.map(a => a.cle).join(','));
  }
  {
    const dessin = avec => { const d = nouveau(); pt(d, 'wc', 'wc', 0, 10); pt(d, 'R1', 'regard', 0, 7, {tampon: 'fonte'}); pt(d, 'B', 'boite', -3, 4, {res: ''}); pt(d, 'Rx', 'regard', 3, 4, {tampon: 'fonte'}); pt(d, 'R3', 'regard', 0, 1, {tampon: 'fonte'}); pt(d, 'j', 'jonction', 0, -2, {});
      if (avec) pt(d, 'RP', 'regard', 1.5, 5.5, {tampon: 'fonte'}, 'projet');
      ln(d, 'L1', 'tr', 'EU', ['wc', 'R1']); ln(d, 'a1', 'tr', '', ['R1', 'B']); ln(d, 'a2', 'tr', '', ['B', 'R3']); ln(d, 'b1', 'tr', 'EP', avec ? ['R1', 'RP', 'Rx'] : ['R1', [1.5, 5.5], 'Rx']); ln(d, 'b2', 'tr', '', ['Rx', 'R3']); ln(d, 'S', 'tr', '', ['R3', 'j']); ln(d, 'C', 'col', 'EU', [[-10, -2], 'j', [10, -2]]); return d; };
    const sig = d => { const an = V.analyser(JSON.parse(JSON.stringify(d)), 'edl'), L = V.anomaliesDoc(JSON.parse(JSON.stringify(d)), an), r = an.resObj.wc;
      return 'wc=' + r.etat + ':' + r.res + (r.boite ? ' boite=' + r.boite : '') + ' | ' + L.map(a => a.cle + '@' + a.objId).sort().join(',') + ' | ' + an.controles.filter(c => /le dessin le relie/.test(c.txt)).map(c => c.txt).join(' ; '); };
    const avec = sig(dessin(true)), sans = sig(dessin(false));
    R.ok(avec === sans && (avec.match(/le dessin le relie/g) || []).length === 1, 'p3 (regard « Projet » au milieu d\'un tuyau existant) : ' + avec + (avec === sans ? '' : ' | sans lui : ' + sans));
  }
  {
    /* p5, p6 (m95) : raccord au milieu d'un tuyau existant (le même dessin que p3, sans le regard « Projet ») ; p5 : l'outil Projet part du
       milieu du tuyau (raccord posé d'office, tuyau « Projet » vers un regard « Projet ») : l'état des lieux est celui du dessin sans eux ;
       p6 : sur l'avant-projet, une branche « À supprimer » part du milieu du tuyau (raccord posé à la main) : l'avant-projet est celui du dessin
       sans elle. Avant, le raccord coupait le tuyau en deux pièces : la boîte B devenait le seul plus court chemin et le réseau présumé changeait */
    const base = () => { const d = nouveau(); pt(d, 'wc', 'wc', 0, 10); pt(d, 'R1', 'regard', 0, 7, {tampon: 'fonte'}); pt(d, 'B', 'boite', -3, 4, {res: ''}); pt(d, 'Rx', 'regard', 3, 4, {tampon: 'fonte'}); pt(d, 'R3', 'regard', 0, 1, {tampon: 'fonte'}); pt(d, 'j', 'jonction', 0, -2, {});
      ln(d, 'L1', 'tr', 'EU', ['wc', 'R1']); ln(d, 'a1', 'tr', '', ['R1', 'B']); ln(d, 'a2', 'tr', '', ['B', 'R3']); ln(d, 'b2', 'tr', '', ['Rx', 'R3']); ln(d, 'S', 'tr', '', ['R3', 'j']); ln(d, 'C', 'col', 'EU', [[-10, -2], 'j', [10, -2]]); return d; };
    const avecRaccord = (auto, branche) => { const d = base(); pt(d, 'J', 'jonction', 1.5, 5.5, {}).auto = auto; ln(d, 'b1', 'tr', 'EP', ['R1', 'J', 'Rx']); branche(d); return d; };
    const sansRaccord = () => { const d = base(); ln(d, 'b1', 'tr', 'EP', ['R1', [1.5, 5.5], 'Rx']); return d; };
    const sigM = (d, mode) => { const an = V.analyser(JSON.parse(JSON.stringify(d)), mode), L = V.anomaliesDoc(JSON.parse(JSON.stringify(d)), an), r = an.resObj.wc;
      return 'wc=' + r.etat + ':' + r.res + (r.presume ? '(p)' : '') + (r.boite ? ' boite=' + r.boite : '') + ' | ' + L.map(a => a.cle + '@' + a.objId + ':' + a.st).sort().join(',') + ' | ' + V.conclusion(L, an)
        + ' | ' + an.controles.map(c => c.niveau + ':' + c.txt).sort().join(' ; '); };
    const p5 = avecRaccord(true, d => { pt(d, 'RQ', 'regard', 5, 7, {tampon: 'fonte'}, 'projet'); ln(d, 'pj', 'tr', '', ['J', 'RQ'], 'projet'); });
    const p6 = avecRaccord(false, d => { pt(d, 'Rz', 'regard', 5, 7, {tampon: 'fonte'}, 'supprimer'); ln(d, 'bz', 'tr', 'EP', ['J', 'Rz'], 'supprimer'); });
    for (const [n, d, mode, txt] of [['p5', p5, 'edl', 'outil Projet parti du milieu d\'un tuyau existant, état des lieux'], ['p6', p6, 'avp', 'branche « À supprimer » partie du milieu d\'un tuyau, avant-projet']]){
      const vu = sigM(d, mode), att = sigM(sansRaccord(), mode);
      R.ok(vu === att, n + ' (' + txt + ') : ' + vu + (vu === att ? '' : ' | sans le raccord : ' + att));
    }
  }
  {
    const d = nouveau(); pt(d, 'wc', 'wc', 0, 10); pt(d, 'R1', 'regard', 0, 7, {tampon: 'fonte'}); pt(d, 'F', 'fosse', 0, 4, {}); pt(d, 'la', 'lavabo', 4, 7, {}, 'projet');
    ln(d, 'L1', 'tr', 'EU', ['wc', 'R1']); ln(d, 'A', 'tr', '', ['R1', 'F']); ln(d, 'S', 'tr', 'EU', ['F', [0, 0]]); ln(d, 'At', 'tr', 'EU', ['R1', 'la']);
    const an = V.analyser(JSON.parse(JSON.stringify(d)), 'edl'), L = V.anomaliesDoc(JSON.parse(JSON.stringify(d)), an), r = an.resObj.wc;
    R.ok(r.etat === 'ok' && r.fosse === 'F' && L.some(a => a.cle === 'fosse:F' && a.st === 'retenue'), 'p4 (attente vers un lavabo « Projet ») : wc=' + r.etat + ':' + r.res + (r.presume ? '(p)' : '') + (r.fosse ? ' fosse=' + r.fosse : '') + ' | ' + L.map(a => a.cle).join(','));
  }
  R.fin();
})().catch(e => { console.log('ERREUR ' + (e && e.stack || e)); process.exitCode = 1; });
