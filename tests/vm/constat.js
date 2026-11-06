// Lignes du constat déduites du croquis (sans navigateur ; croquis fictifs, 12 rue Fictive, Ville-Exemple) : nombre d'appareils par ligne.
// Règle du 6 novembre 2026 : le croquis compte ce que l'opérateur a dessiné, sans regrouper ni interpréter. Une salle de bain ou une cuisine
// se dessine d'un seul objet (son lavabo, son évier, son lave-vaisselle y sont compris) ; deux objets dessinés sont deux installations.
// Un lavabo se confond avec l'évier : il compte sur la ligne « Évier », jamais sur une ligne « Autres ».
// usage : node tests/vm/constat.js [-v] [--app=<dossier>]
'use strict';
const {charger, doc, copie, rapport} = require('./charger.js');
const {V} = charger(), R = rapport('constat');

/* appareils reliés chacun par un tuyau sans réseau à une boîte EU : [id, type, x, y, propriétés] */
const vers = objs => doc({o: objs.concat([['B', 'boite', 0, -6, {res: 'EU'}]]), l: objs.map(o => ['L' + o[0], 'tr', '', '', [o[0], 'B']])});
const lignes = d => { const an = V.analyser(copie(d), 'edl'); return V.constatDeduit(copie(d), an).rows; };
const nb = (rows, lib) => { const r = rows.find(x => x.label === lib); return r ? r.nb : 0; };
const SDB = 'Salle de bain (douche ou baignoire et lavabo)', CUI = 'Cuisine (évier, lave-vaisselle)', EV = 'Évier';
const cas = [
  {n: 'lavabo seul : une ligne « Évier », pas de salle de bain', d: vers([['la', 'lavabo', 0, 0]]), att: {[EV]: 1, [SDB]: 0}},
  {n: 'deux lavabos : comptés deux fois', d: vers([['l1', 'lavabo', 0, 0], ['l2', 'lavabo', 6, 0]]), att: {[EV]: 2, [SDB]: 0}},
  {n: 'un évier et un lavabo : deux sur la ligne « Évier »', d: vers([['ev', 'evier', 0, 0], ['la', 'lavabo', 8, 0]]), att: {[EV]: 2}},
  {n: 'douche et lavabo côte à côte : la douche fait la salle de bain, le lavabo compte comme un évier', d: vers([['do', 'douche', 0, 0], ['la', 'lavabo', 1, 0]]), att: {[EV]: 1, [SDB]: 1}},
  {n: 'objet « Salle de bain » seul : une salle de bain', d: vers([['sb', 'sdb', 0, 0]]), att: {[EV]: 0, [SDB]: 1}},
  {n: 'douche et baignoire à 2 m : deux objets dessinés, deux salles de bain', d: vers([['do', 'douche', 0, 0], ['ba', 'baignoire', 2, 0]]), att: {[SDB]: 2}},
  {n: 'douche et baignoire à 10 m : deux salles de bain', d: vers([['do', 'douche', 0, 0], ['ba', 'baignoire', 10, 0]]), att: {[SDB]: 2}},
  {n: 'deux douches au même endroit, rez-de-chaussée et étage : deux salles de bain', d: vers([['d1', 'douche', 0, 0, {niv: 'rdc'}], ['d2', 'douche', 0.5, 0, {niv: 'etage'}]]), att: {[SDB]: 2}},
  {n: 'objet « Cuisine » et lave-vaisselle à 1 m : deux objets dessinés, deux cuisines', d: vers([['cu', 'cuisine', 0, 0], ['lv', 'lavevaisselle', 1, 0]]), att: {[CUI]: 2, [EV]: 0}},
  {n: 'évier à côté d\'un lave-vaisselle : un évier et une cuisine, comme dessinés', d: vers([['ev', 'evier', 0, 0], ['lv', 'lavevaisselle', 1, 0]]), att: {[EV]: 1, [CUI]: 1}},
];
cas.forEach(k => {
  const rows = lignes(k.d), vu = {}; Object.keys(k.att).forEach(lib => { vu[lib] = nb(rows, lib); });
  const autres = rows.filter(r => !r.std && r.nb).map(r => r.label + ' ×' + r.nb);
  R.ok(Object.keys(k.att).every(lib => vu[lib] === k.att[lib]) && !autres.length, k.n + ' : ' + JSON.stringify(vu) + (autres.length ? ', lignes « Autres » : ' + autres.join(', ') : ''));
});
R.fin();
