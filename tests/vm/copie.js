// Fiche et dossier (sans navigateur) : une anomalie retirée du dossier puis revenue avec un autre texte (m80a, v1.6.2). Croquis fictifs.
// usage : node tests/vm/copie.js [-v] [--app=<dossier>]
// Le dossier est simulé : les opérations de reconcilier (créer, mettre à jour, retirer) sont appliquées à une liste d'enregistrements.
// t : tampon béton d'un regard non relié (EU, NC), « fonte », puis regard relié au collecteur EP et « béton » : « Regard EP : tampon béton »,
//     EP, réserve (avant : l'ancien texte, EU, NC, gardés jusqu'à la retouche suivante) ;
// d : descente avant non visitable, « visitable », puis arrière et non visitable : texte et ligne du constat de l'arrière ;
// w : WC « Tronçon EU » vers un regard et une sortie « Tronçon EP » laissée libre (présumé), sortie effacée puis tracée jusqu'au collecteur
//     EP : « WC : rejet au réseau EP » sans « (présumé) » ;
// e : témoin : observation retouchée dans le dossier, anomalie écartée, regard relié au collecteur EP, retenue de nouveau : la retouche
//     revient (réseau et nature suivent le dessin) ; f : témoin sans copie (création ordinaire).
'use strict';
const {charger, rapport} = require('./charger.js');
const {V} = charger(), R = rapport('copie');
function base(){ return {format: 'vede-croquis', v: 1, id: 'd', nom: 'Croquis fictif', numero: 'F-1', adresse: '12 rue Fictive', commune: 'Ville-Exemple', date: '2026-11-02', technicien: 'Nom Fictif', fondId: null, reseauId: null, origine: {x: 0, y: 0}, u: 1, rot: 0, echelle: 0, vue: null, gest: {EU: 'D', EP: 'D', UN: 'D'}, el: [], decisions: {}, ordre: [], anomManu: [], cree: '', modifie: '', rev: 0}; }
const pt = (id, t, x, y, p) => ({id, k: 'pt', t, x, y, p: Object.assign({st: 'existant', obs: '', meth: ['eau'], visitable: 'oui', cote: 'avant', tampon: 'fonte'}, p || {}), lab: {off: true}});
function ln(d, id, t, res, v, sens){ const pos = {}; d.el.forEach(e => { if (e.k === 'pt') pos[e.id] = e; }); return {id, k: 'ln', t, v: v.map(q => typeof q === 'string' ? {x: pos[q].x, y: pos[q].y, a: q} : {x: q[0], y: q[1], a: null}), p: t === 'col' ? {res: res || 'EU', gest: 'D', st: 'existant'} : {res: res || '', st: 'existant', sens: sens || 0, obs: ''}, lab: {off: true}}; }
let k = 0;
function synchro(d, ext){
  const ops = V.reconcilier(d, null, ext);
  ops.retirer.forEach(id => { const i = ext.findIndex(r => r.id === id); if (i >= 0) ext.splice(i, 1); });
  ops.maj.forEach(m => { const r = ext.find(x => x.id === m.id); if (r) Object.assign(r, m.champs); });
  ops.creer.forEach(c => { ext.push(Object.assign({id: c.id || ('r' + (++k)), createdAt: c.createdAt || '2026-11-02'}, c)); });
  return ops;
}
const rec = (ext, cle) => ext.find(r => r.croquis && r.croquis.cle === cle);
const vu = r => r ? JSON.stringify({obs: r.observation, reseau: r.reseau, nc: r.nc, inst: r.installation || ''}) : 'absent';
function verifier(nom, r, attendu, apres){
  const s = vu(r), bon = s === JSON.stringify(attendu);
  R.ok(bon, nom + ' : ' + s + (bon ? '' : '  (attendu ' + JSON.stringify(attendu) + ')') + (apres ? ' | ' + apres : ''));
}
/* t : tampon béton */
(function(){
  const d = base(), ext = []; d.el.push(pt('r1', 'regard', 0, 4, {tampon: 'beton'})); synchro(d, ext);
  d.el[0].p.tampon = 'fonte'; synchro(d, ext);
  d.el.push(pt('j', 'jonction', 0, 0, {})); d.el.push(ln(d, 'b', 'tr', '', ['r1', 'j'])); d.el.push(ln(d, 'C', 'col', 'EP', [[-10, 0], 'j', [10, 0]]));
  d.el[0].p.tampon = 'beton'; synchro(d, ext);
  const r = rec(ext, 'tampon:r1'); verifier('t tampon béton revenu (regard relié au collecteur EP)', r, {obs: 'Regard EP : tampon béton', reseau: 'EP', nc: false, inst: ''});
  const s2 = vu(r); synchro(d, ext); verifier('t idem après une synchronisation de plus (inchangé)', rec(ext, 'tampon:r1'), JSON.parse(s2));
})();
/* d : descente non visitable */
(function(){
  const d = base(), ext = []; d.el.push(pt('de', 'descente', 0, 6, {visitable: 'non', cote: 'avant'})); d.el.push(pt('r1', 'regard', 0, 2)); d.el.push(ln(d, 'tD', 'tr', 'EP', ['de', 'r1'])); synchro(d, ext);
  const r0 = rec(ext, 'dep-nv:de'), inst0 = r0 ? r0.installation : '';
  d.el[0].p.visitable = 'oui'; synchro(d, ext);
  d.el[0].p.cote = 'arriere'; d.el[0].p.visitable = 'non'; synchro(d, ext);
  const r = rec(ext, 'dep-nv:de'), instAttendue = (inst0 || '').replace('_av', '_ar');
  verifier('d descente revenue non visitable, côté arrière', r, {obs: 'Descente EP arrière : non visitable', reseau: 'EP', nc: r && typeof r.nc === 'boolean' ? r.nc : r && r.nc, inst: instAttendue}, 'ligne d\'origine ' + inst0);
})();
/* w : présumé puis exutoire dessiné */
(function(){
  const d = base(), ext = []; d.el.push(pt('wc', 'wc', 0, 8), pt('R1', 'regard', 0, 4)); d.el.push(ln(d, 'tW', 'tr', 'EU', ['wc', 'R1'])); d.el.push(ln(d, 'sor', 'tr', 'EP', ['R1', [0, -2]])); synchro(d, ext);
  const r0 = rec(ext, 'eu-ep:wc');
  d.el = d.el.filter(e => e.id !== 'sor'); synchro(d, ext);
  d.el.push(pt('j', 'jonction', 0, -2, {})); d.el.push(ln(d, 'sor2', 'tr', 'EP', ['R1', 'j'])); d.el.push(ln(d, 'C', 'col', 'EP', [[-10, -2], 'j', [10, -2]])); synchro(d, ext);
  const r = rec(ext, 'eu-ep:wc');
  verifier('w NC revenue avec l\'exutoire EP dessiné', r, {obs: 'WC : rejet au réseau EP', reseau: 'EU', nc: true, inst: r0 ? r0.installation : ''}, 'avant : ' + (r0 ? r0.observation : 'absent'));
})();
/* e : témoin, observation retouchée par le technicien, écartée puis retenue de nouveau */
(function(){
  const d = base(), ext = []; d.el.push(pt('r1', 'regard', 0, 4, {tampon: 'beton'})); synchro(d, ext);
  const r0 = rec(ext, 'tampon:r1'); r0.observation = 'Regard : tampon béton fissuré (vu sur place)';
  d.decisions['tampon:r1'] = {st: 'ecartee'}; synchro(d, ext);
  d.el.push(pt('j', 'jonction', 0, 0, {})); d.el.push(ln(d, 'b', 'tr', '', ['r1', 'j'])); d.el.push(ln(d, 'C', 'col', 'EP', [[-10, 0], 'j', [10, 0]]));
  delete d.decisions['tampon:r1']; synchro(d, ext);
  const r = rec(ext, 'tampon:r1'); verifier('e observation retouchée revenue telle quelle, réseau et nature du dessin d\'aujourd\'hui', r, {obs: 'Regard : tampon béton fissuré (vu sur place)', reseau: 'EP', nc: false, inst: ''}, 'même enregistrement : ' + (r && r.id === r0.id));
  const s2 = vu(rec(ext, 'tampon:r1')); synchro(d, ext); verifier('e idem après une synchronisation de plus (retouche gardée)', rec(ext, 'tampon:r1'), JSON.parse(s2));
})();
/* f : témoin sans copie */
(function(){
  const d = base(), ext = []; d.el.push(pt('r1', 'regard', 0, 4, {tampon: 'beton'})); d.el.push(pt('j', 'jonction', 0, 0, {})); d.el.push(ln(d, 'b', 'tr', '', ['r1', 'j'])); d.el.push(ln(d, 'C', 'col', 'EP', [[-10, 0], 'j', [10, 0]])); synchro(d, ext);
  verifier('f témoin : création ordinaire', rec(ext, 'tampon:r1'), {obs: 'Regard EP : tampon béton', reseau: 'EP', nc: false, inst: ''});
})();
R.fin();
