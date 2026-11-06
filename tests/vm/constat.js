// Lignes du constat déduites du croquis (sans navigateur ; croquis fictifs, 12 rue Fictive, Ville-Exemple) : nombre d'appareils par ligne.
// Un lavabo est compté pour lui-même, sur une ligne « Autres » (décision du 6 novembre 2026 : celui d'une salle de bain ou d'une cuisine
// est compris dans l'objet de la pièce) ; une salle de bain (douche, baignoire, objet « Salle de bain ») compte une fois : ses appareils
// sont regroupés de proche en proche (4 m) et par niveau.
// usage : node tests/vm/constat.js [-v] [--app=<dossier>]
'use strict';
const {charger, doc, copie, rapport} = require('./charger.js');
const {V} = charger(), R = rapport('constat');

/* appareils reliés chacun par un tuyau sans réseau à une boîte EU : [id, type, x, y, propriétés] */
const vers = objs => doc({o: objs.concat([['B', 'boite', 0, -6, {res: 'EU'}]]), l: objs.map(o => ['L' + o[0], 'tr', '', '', [o[0], 'B']])});
const nb = (d, lib) => { const an = V.analyser(copie(d), 'edl'), c = V.constatDeduit(copie(d), an), r = c.rows.find(x => x.label === lib); return r ? r.nb : 0; };
const SDB = 'Salle de bain (douche ou baignoire et lavabo)';
const cas = [
  {n: 'lavabo seul : une ligne « Lavabo », pas de salle de bain', d: vers([['la', 'lavabo', 0, 0]]), att: {Lavabo: 1, [SDB]: 0}},
  {n: 'deux lavabos : comptés deux fois', d: vers([['l1', 'lavabo', 0, 0], ['l2', 'lavabo', 6, 0]]), att: {Lavabo: 2, [SDB]: 0}},
  {n: 'douche et lavabo côte à côte : la douche fait la salle de bain, le lavabo compte à part', d: vers([['do', 'douche', 0, 0], ['la', 'lavabo', 1, 0]]), att: {Lavabo: 1, [SDB]: 1}},
  {n: 'objet « Salle de bain » seul : une salle de bain', d: vers([['sb', 'sdb', 0, 0]]), att: {Lavabo: 0, [SDB]: 1}},
  {n: 'douche et baignoire à 2 m : une seule salle de bain', d: vers([['do', 'douche', 0, 0], ['ba', 'baignoire', 2, 0]]), att: {[SDB]: 1}},
  {n: 'douche et baignoire à 10 m : deux salles de bain', d: vers([['do', 'douche', 0, 0], ['ba', 'baignoire', 10, 0]]), att: {[SDB]: 2}},
  {n: 'deux douches au même endroit, rez-de-chaussée et étage : deux salles de bain', d: vers([['d1', 'douche', 0, 0, {niv: 'rdc'}], ['d2', 'douche', 0.5, 0, {niv: 'etage'}]]), att: {[SDB]: 2}},
];
cas.forEach(k => {
  const vu = {}; Object.keys(k.att).forEach(lib => { vu[lib] = nb(k.d, lib); });
  R.ok(Object.keys(k.att).every(lib => vu[lib] === k.att[lib]), k.n + ' : ' + JSON.stringify(vu));
});
R.fin();
