// Fosse septique contournée par un by-pass (sans navigateur ; croquis fictifs, 12 rue Fictive, Ville-Exemple). EN ATTENTE DE DÉCISION :
// « toujours » (la fosse compte dès que l'eau peut la traverser) ou « jamais » (seulement si l'eau ne peut pas l'éviter) ; tant que la
// règle n'est pas tranchée, ce fichier n'est pas lancé par tests/tout.sh (l'application actuelle suit le premier chemin trouvé).
// usage : node tests/vm/fosse-contournee.js toujours|jamais [-v] [--app=<dossier>]
// Topologies : A by-pass par un regard (même longueur que le passage par la fosse), B by-pass direct (plus court), C by-pass plus long
// (deux regards), D fosse en série sans by-pass (témoin), E fosse en cul-de-sac (témoin), G fosse en amont, son entrée laissée libre
// (témoin) ; sources : WC « Tronçon EU », WC sans réseau, descente « Tronçon EP » ; exutoires : collecteur EU dessiné, extrémité libre
// « Tronçon EU », extrémité libre sans réseau. Chaque cas est analysé dans quatre ordres du dessin, qui doivent donner le même résultat.
'use strict';
const {charger, doc, melange, copie, rapport} = require('./charger.js');
const base = [['R1', 'regard', 0, 8], ['F', 'fosse', -3, 5], ['R3', 'regard', 0, 2]];
const sorties = {
  col: {o: [['j', 'jonction', 0, -2, {}]], l: [['S', 'tr', '', '', ['R3', 'j']], ['C', 'col', 'EU', '', [[-10, -2], 'j', [10, -2]]]]},
  pEU: {o: [], l: [['S', 'tr', 'EU', '', ['R3', [0, -2]]]]},
  p0: {o: [], l: [['S', 'tr', '', '', ['R3', [0, -2]]]]},
};
const topo = {
  A: {o: [['Rb', 'regard', 3, 5]], l: [['Lf1', 'tr', '', '', ['R1', 'F']], ['Lf2', 'tr', '', '', ['F', 'R3']], ['Lb1', 'tr', '', '', ['R1', 'Rb']], ['Lb2', 'tr', '', '', ['Rb', 'R3']]]},
  B: {o: [], l: [['Lf1', 'tr', '', '', ['R1', 'F']], ['Lf2', 'tr', '', '', ['F', 'R3']], ['Lb', 'tr', '', '', ['R1', [2, 5], 'R3']]]},
  C: {o: [['Ra', 'regard', 3, 7], ['Rc', 'regard', 3, 3]], l: [['Lf1', 'tr', '', '', ['R1', 'F']], ['Lf2', 'tr', '', '', ['F', 'R3']], ['Lb1', 'tr', '', '', ['R1', 'Ra']], ['Lb2', 'tr', '', '', ['Ra', 'Rc']], ['Lb3', 'tr', '', '', ['Rc', 'R3']]]},
  D: {o: [], l: [['Lf1', 'tr', '', '', ['R1', 'F']], ['Lf2', 'tr', '', '', ['F', 'R3']]]},
  E: {o: [], l: [['Lf1', 'tr', '', '', ['R1', 'F']], ['Lr', 'tr', '', '', ['R1', 'R3']]]},
  G: {o: [], l: [['Lr', 'tr', '', '', ['R1', 'R3']], ['Lf2', 'tr', '', '', ['F', 'R3']], ['Lin', 'tr', '', '', [[-6, 8], 'F']]]},
};
const sources = {wc: [['wc', 'wc', 0, 12]], d1: [['d1', 'descente', 0, 12]]};
const tuy = {wc: [['L1', 'tr', 'EU', '', ['wc', 'R1']]], wc0: [['L1', 'tr', '', '', ['wc', 'R1']]], d1: [['L1', 'tr', 'EP', '', ['d1', 'R1']]]};
const V = process.argv.slice(2).find(x => x === 'toujours' || x === 'jamais'); if (!V){ console.log('variante attendue : toujours ou jamais'); process.exit(2); }
/* fosse comptée : toujours = l'eau peut la traverser (A, B, C, D) ; jamais = elle ne peut pas l'éviter (D) ; E et G jamais */
const compte = t => V === 'toujours' ? /[ABCD]/.test(t) : t === 'D';
const VC = charger().V, R = rapport('fosse-contournee (' + V + ')'); let nt = 0, ordOk = 0;
function res(spec, k){
  const l = k === 0 ? spec.l : k === 1 ? spec.l.slice().reverse() : melange(spec.l, k), d = doc({o: spec.o, l});
  const an = VC.analyser(copie(d), 'edl'), L = VC.anomaliesDoc(copie(d), an), c = VC.conclusion(L, an);
  return Object.keys(an.resObj).sort().map(id => { const r = an.resObj[id]; return id + '=' + r.etat + (r.res ? ':' + r.res + (r.presume ? '(p)' : '') : '') + (r.fosse ? ' fosse=' + r.fosse : ''); }).join(' ')
    + ' | ' + L.filter(a => /^(fosse|ep-fosse|eu-|ep-eu)/.test(a.cle)).map(a => a.cle + ':' + a.st).sort().join(',') + ' | ' + c;
}
Object.keys(topo).forEach(tn => Object.keys(tuy).forEach(sn => Object.keys(sorties).forEach(so => {
  if (sn === 'd1' && so === 'p0') return; if (sn === 'wc0' && so === 'pEU') return;
  const src = sn === 'd1' ? 'd1' : 'wc', t = topo[tn], s = sorties[so];
  const spec = {o: base.concat(sources[src], t.o, s.o), l: tuy[sn].concat(t.l, s.l)};
  const r0 = res(spec, 0), autres = [1, 2, 3].map(k => res(spec, k)).filter(x => x !== r0); if (!autres.length) ordOk++;
  /* attendu : fosse comptée ou non ; sans réseau nulle part (wc0 vers une extrémité sans réseau) : pas d'exutoire présumé */
  const sansExu = sn === 'wc0' && so === 'p0', f = !sansExu && compte(tn);
  const nc = src === 'wc' ? /fosse:F:retenue/.test(r0) : /ep-fosse:d1:retenue/.test(r0);
  const bon = (new RegExp('^' + src + '=' + (sansExu ? 'sansexu' : 'ok')).test(r0)) && (/ fosse=F/.test(r0) === f) && nc === f && !autres.length; nt++;
  R.ok(bon, tn + ' ' + sn + ' ' + so + ' : ' + r0 + (autres.length ? '\n      autre ordre : ' + autres[0] : ''));
})));
console.log('ordre du dessin : ' + ordOk + '/' + nt + ' identiques');
R.fin();
