// Fosse septique contournée par un by-pass (sans navigateur ; croquis fictifs, 12 rue Fictive, Ville-Exemple). Règle décidée le
// 6 novembre 2026 : une fosse hors fonction grâce à un by-pass ne donne pas d'anomalie ; la fosse ne compte que si l'eau ne peut pas
// l'éviter (elle est sur tout chemin jusqu'à l'exutoire). Variante « toujours » (la fosse compterait dès que l'eau peut la traverser) :
// écartée, gardée ici pour comparer (node tests/vm/fosse-contournee.js toujours).
// usage : node tests/vm/fosse-contournee.js [jamais|toujours] [-v] [--app=<dossier>]
// Topologies : A by-pass par un regard (même longueur que le passage par la fosse), B by-pass direct (plus court), C by-pass plus long
// (deux regards), D fosse en série sans by-pass (témoin), E fosse en cul-de-sac (témoin), G fosse en amont, son entrée laissée libre
// (témoin) ; sources : WC « Tronçon EU », WC sans réseau, descente « Tronçon EP » ; exutoires : collecteur EU dessiné, extrémité libre
// « Tronçon EU », extrémité libre sans réseau. Chaque cas est analysé dans quatre ordres du dessin, qui doivent donner le même résultat.
// Fosse évitée seulement vers une extrémité libre qui peut être une arrivée (entrée de la maison laissée libre, réseau présumé) : l'eau la
// traverse si c'est une arrivée ; l'analyse ne le sait pas : anomalie « à arbitrer », aucune conformité proposée, raccordement laissé à
// l'opérateur, un contrôle « manque » ; sa décision (retenue, écartée) fait foi. Lecture assumée : G « Tronçon EU » partout est aussi à
// arbitrer (la sortie laissée libre peut être une arrivée : l'eau traverserait alors la fosse vers l'entrée laissée libre).
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
const V = process.argv.slice(2).find(x => x === 'toujours' || x === 'jamais') || 'jamais';
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

/* fosse en série WC -> R1 -> F -> R3 -> sortie, arrivée de la maison laissée libre dans R1 (arr : réseau, sens ; null : pas d'arrivée) ;
   so : réseau de la sortie laissée libre, ou 'col' (collecteur EU dessiné) ; src : 'wc' (« Tronçon EU ») ou 'd1' (descente, « Tronçon EP ») */
function serie(arr, so, src, plus){
  const r = src === 'd1' ? 'EP' : 'EU', o = [[src || 'wc', src === 'd1' ? 'descente' : 'wc', 0, 12], ['R1', 'regard', 0, 8], ['F', 'fosse', 0, 5], ['R3', 'regard', 0, 2]];
  const l = [['L1', 'tr', r, '', [src || 'wc', 'R1']], ['A', 'tr', r, '', ['R1', 'F']], ['B', 'tr', r, '', ['F', 'R3']]];
  if (so === 'col'){ o.push(['j', 'jonction', 0, -2, {}]); l.push(['S', 'tr', '', '', ['R3', 'j']], ['C', 'col', 'EU', '', [[-10, -2], 'j', [10, -2]]]); }
  else l.push(['S', 'tr', so, '', ['R3', [0, -2]]]);
  if (arr) l.push(['Arr', 'tr', arr[0], '', [[-5, 8], 'R1'], arr[1] || 0]);
  return {o: o.concat(plus && plus.o || []), l: l.concat(plus && plus.l || []), src: src || 'wc'};
}
const G_EU = {o: [['wc', 'wc', 0, 12], ['R1', 'regard', 0, 8], ['F', 'fosse', -3, 5], ['R3', 'regard', 0, 2]], src: 'wc',
  l: [['L1', 'tr', 'EU', '', ['wc', 'R1']], ['Lr', 'tr', 'EU', '', ['R1', 'R3']], ['Lf2', 'tr', 'EU', '', ['F', 'R3']], ['Lin', 'tr', 'EU', '', [[-6, 8], 'F']], ['S', 'tr', 'EU', '', ['R3', [0, -2]]]]};
/* second WC dont le tuyau arrive dans la fosse : son eau la traverse sûrement, la fosse est retenue pour les deux */
const WC2 = {o: [['wc2', 'wc', 4, 5]], l: [['L2', 'tr', 'EU', '', ['wc2', 'F']]]};
const ARB = 'fosse:F:arbitrer | fosse | raccordement - | contrôle fossedouteuse:wc', RET = 'fosse:F:retenue | non_conformes | raccordement FOSSE | contrôle -';
const douteuses = [
  {n: 'arrivée « Tronçon EU » laissée libre, sortie « Tronçon EU »', s: serie(['EU'], 'EU'), att: ARB},
  {n: 'arrivée « Tronçon EU » laissée libre, sortie sans réseau', s: serie(['EU'], ''), att: ARB},
  {n: 'G « Tronçon EU » partout (fosse en amont, son entrée laissée libre)', s: G_EU, att: ARB},
  {n: 'descente « Tronçon EP », arrivée « Tronçon EP » laissée libre', s: serie(['EP'], 'EP', 'd1'), att: 'ep-fosse:d1:arbitrer | fosse | raccordement - | contrôle fossedouteuse:d1'},
  {n: 'anomalie retenue par l\'opérateur', s: serie(['EU'], 'EU'), dec: {'fosse:F': {st: 'retenue'}}, att: RET},
  {n: 'anomalie écartée par l\'opérateur', s: serie(['EU'], 'EU'), dec: {'fosse:F': {st: 'ecartee'}}, att: 'fosse:F:ecartee | conformes | raccordement EU_D | contrôle -'},
  {n: 'second WC dont l\'eau traverse sûrement la fosse', s: serie(['EU'], 'EU', 'wc', WC2), att: RET},
  {n: 'témoin : arrivée sans réseau laissée libre', s: serie([''], 'EU'), att: RET},
  {n: 'témoin : arrivée orientée vers R1', s: serie(['EU', 1], 'EU'), att: RET},
  {n: 'témoin : collecteur EU dessiné', s: serie(['EU'], 'col'), att: RET},
  {n: 'témoin : pas d\'arrivée', s: serie(null, 'EU'), att: RET},
];
function douteuse(k, spec){
  const l = k === 0 ? spec.l : k === 1 ? spec.l.slice().reverse() : melange(spec.l, k), d = doc({o: k % 2 ? spec.o.slice().reverse() : spec.o, l});
  if (spec.dec) d.decisions = copie(spec.dec);
  const an = VC.analyser(copie(d), 'edl'), L = VC.anomaliesDoc(copie(d), an), row = VC.constatDeduit(copie(d), an).rows.find(x => x.objets.indexOf(spec.src) >= 0);
  return [L.filter(a => /fosse/.test(a.cle)).map(a => a.cle + ':' + a.st).sort().join(',') || '-', VC.conclusion(L, an), 'raccordement ' + (row && row.raccord || '-'),
    'contrôle ' + (an.controles.filter(x => x.cle.indexOf('fossedouteuse:') === 0).map(x => x.cle).sort().join(',') || '-')].join(' | ');
}
douteuses.forEach(k => {
  const spec = Object.assign({}, k.s, {dec: k.dec}), r0 = douteuse(0, spec), autres = [1, 2, 3].map(i => douteuse(i, spec)).filter(x => x !== r0);
  R.ok(r0 === k.att && !autres.length, 'fosse évitée vers une arrivée possible, ' + k.n + ' : ' + r0 + (r0 === k.att ? '' : ' (attendu : ' + k.att + ')') + (autres.length ? '\n      autre ordre : ' + autres[0] : ''));
});
R.fin();
