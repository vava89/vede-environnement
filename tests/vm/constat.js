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

/* anomalie posée sur un objet du croquis (bibliothèque ou saisie libre, doc.anomManu) : elle va sur la ligne de cet objet, comme une anomalie
   déduite ; posée sur un lavabo, sur la ligne « Évier » (le mot « lavabo » de son texte ne la range plus en salle de bain ; échoue sur 26ad292).
   Posée sur un tronçon, aucune ligne : l'application décide d'après le texte, comme en v1.5.1. Dossier de la v1.6.2 : un enregistrement intact
   suit le dessin, une ligne choisie par le technicien reste la sienne */
const MANU = 'Lavabo : non siphonné', PRECO = 'Poser un siphon';
const manu = (objs, objId, ext) => { const d = vers(objs); d.anomManu = [{id: 'm1', objId, reseau: 'EU', obs: MANU, preco: PRECO, nc: true, st: 'retenue'}];
  return V.reconcilier(d, V.analyser(d, 'edl'), ext || [], {}); };
const cree = ops => { const c = ops.creer.find(x => x.croquis && x.croquis.cle === 'm1'); return c ? c.installation + '/' + c.croquis.auto.installation : 'absente'; };
const rec = inst => [{id: 'r1', reseau: 'EU', observation: MANU, preconisation: PRECO, localisation: '', installation: inst, nc: true, photos: [], categorie: 'autre',
  croquis: {cle: 'm1', objId: 'la', codes: [], auto: {obs: MANU, preco: PRECO, reseau: 'EU', nc: true, installation: ''}}}];
const maj = ops => { const m = ops.maj.find(x => x.id === 'r1'); return m ? (m.champs.installation === undefined ? '-' : m.champs.installation) + '/' + m.champs.croquis.auto.installation : 'aucune'; };
const LA = ['la', 'lavabo', 0, 0], DO = ['do', 'douche', 4, 0], WC = ['w', 'wc', 8, 0];
[
  {n: 'anomalie de la bibliothèque posée sur un lavabo seul : ligne « Évier »', vu: () => cree(manu([LA], 'la')), att: 'evier/evier'},
  {n: 'posée sur un lavabo à côté d\'une douche : ligne « Évier », pas la salle de bain', vu: () => cree(manu([LA, DO, WC], 'la')), att: 'evier/evier'},
  {n: 'posée sur un WC : ligne « WC »', vu: () => cree(manu([LA, DO, WC], 'w')), att: 'wc/wc'},
  {n: 'posée sur un tronçon : aucune ligne, l\'application décide d\'après le texte (témoin)', vu: () => cree(manu([LA, DO], 'Lla')), att: '/'},
  {n: 'dossier de la v1.6.2, enregistrement intact sans ligne : passe sur la ligne « Évier »', vu: () => maj(manu([LA, DO], 'la', rec(''))), att: 'evier/evier'},
  {n: 'dossier de la v1.6.2, ligne « Salle de bain » choisie par le technicien : gardée (témoin)', vu: () => maj(manu([LA, DO], 'la', rec('sdb'))), att: 'aucune'},
].forEach(k => { const vu = k.vu(); R.ok(vu === k.att, k.n + ' : ' + vu + (vu === k.att ? '' : ' (attendu ' + k.att + ')')); });
R.fin();
