// Sens de l'eau des pièces (flèches du plan, du PDF et du DXF) : croquis fictifs (12 rue Fictive, Ville-Exemple).
// Une flèche suit l'eau d'une source sur les pièces que ses chemins vers toutes ses cibles empruntent ; ailleurs, le sens indiqué sur le tuyau
// ou la distance aux exutoires, sinon aucune flèche. Une flèche à l'envers est fausse ; une flèche absente est permise là où l'eau peut aller
// ailleurs (bout libre qui peut être une arrivée). Les flèches ne dépendent pas de l'ordre du dessin.
// usage : node tests/vm/sens.js [-v] [--app=<dossier>]
'use strict';
const {charger, doc, copie, reordonne, rapport} = require('./charger.js');
const {V} = charger(), R = rapport('sens');
const fleches = (d, mode) => { const an = V.analyser(copie(d), mode || 'edl'), o = {}; an.pieces.forEach(p => { o[p.id] = an.sensPiece[p.id] || 0; }); return o; };
const ecrit = o => Object.keys(o).sort().map(k => k + (o[k] > 0 ? '+' : o[k] < 0 ? '-' : '0')).join(' ');
/* att : pièce > sens de l'eau (1 dans le sens du tracé, -1 à l'inverse) ; '1?' ou '-1?' : ce sens ou aucune flèche */
const bon = (s, a) => typeof a === 'string' ? s === 0 || s === +a.slice(0, -1) : s === a;
const cas = [
  {n: 'réseau présumé, arrivée non identifiée laissée libre sur le regard : aucune flèche vers la maison',
    d: doc({o: [['wc', 'wc', 0, 10], ['R1', 'regard', 0, 6]],
      l: [['L1', 'tr', 'EU', '', ['wc', 'R1']], ['Arr', 'tr', 'EU', '', [[-5, 6], 'R1']], ['S', 'tr', 'EU', '', ['R1', [0, 0]]]]}),
    att: {'L1:0': 1, 'Arr:0': '1?', 'S:0': '1?'}},
  {n: 'réseau présumé, fosse dont l\'entrée vient de la maison : aucune flèche vers la maison',
    d: doc({o: [['wc', 'wc', 0, 12], ['R1', 'regard', 0, 8], ['F', 'fosse', -3, 5], ['R3', 'regard', 0, 2]],
      l: [['L1', 'tr', 'EU', '', ['wc', 'R1']], ['Lr', 'tr', 'EU', '', ['R1', 'R3']], ['Lf2', 'tr', 'EU', '', ['F', 'R3']], ['Lin', 'tr', 'EU', '', [[-6, 8], 'F']], ['S', 'tr', 'EU', '', ['R3', [0, -2]]]]}),
    att: {'L1:0': 1, 'Lr:0': 1, 'Lf2:0': '1?', 'Lin:0': '1?', 'S:0': '1?'}},
  {n: 'réseau présumé, une seule sortie laissée libre : flèches vers la sortie',
    d: doc({o: [['wc', 'wc', 0, 10], ['R1', 'regard', 0, 6]], l: [['L1', 'tr', 'EU', '', ['wc', 'R1']], ['S', 'tr', 'EU', '', ['R1', [0, 0]]]]}),
    att: {'L1:0': 1, 'S:0': 1}},
  {n: 'siphon de garage raccordé après la boîte EU : le branchement s\'écoule vers le collecteur',
    d: doc({o: [['wc', 'wc', 0, 12], ['B', 'boite', 0, 6, {res: 'EU'}], ['jX', 'jonction', 0, 3], ['j', 'jonction', 0, 0], ['sg', 'siphon_garage', 4, 3]],
      l: [['L1', 'tr', '', '', ['wc', 'B']], ['Br', 'tr', '', '', ['B', 'jX', 'j']], ['Ls', 'tr', '', '', ['sg', 'jX']], ['C', 'col', 'EU', '', [[-10, 0], 'j', [10, 0]]]]}),
    att: {'L1:0': 1, 'Br:0': 1, 'Br:1': 1, 'Ls:0': 1}},
  {n: 'même croquis, boîte sans réseau indiqué',
    d: doc({o: [['wc', 'wc', 0, 12], ['B', 'boite', 0, 6, {res: ''}], ['jX', 'jonction', 0, 3], ['j', 'jonction', 0, 0], ['sg', 'siphon_garage', 4, 3]],
      l: [['L1', 'tr', '', '', ['wc', 'B']], ['Br', 'tr', '', '', ['B', 'jX', 'j']], ['Ls', 'tr', '', '', ['sg', 'jX']], ['C', 'col', 'EU', '', [[-10, 0], 'j', [10, 0]]]]}),
    att: {'L1:0': 1, 'Br:0': 1, 'Br:1': 1, 'Ls:0': 1}},
  {n: 'deux boîtes EU sur un même branchement',
    d: doc({o: [['wc', 'wc', -4, 12], ['ev', 'evier', 4, 12], ['B1', 'boite', -4, 6, {res: 'EU'}], ['B2', 'boite', 4, 6, {res: 'EU'}], ['jX', 'jonction', 0, 3], ['j', 'jonction', 0, 0]],
      l: [['L1', 'tr', '', '', ['wc', 'B1']], ['L2', 'tr', '', '', ['ev', 'B2']], ['A1', 'tr', '', '', ['B1', 'jX']], ['A2', 'tr', '', '', ['B2', 'jX']], ['Br', 'tr', '', '', ['jX', 'j']], ['C', 'col', 'EU', '', [[-10, 0], 'j', [10, 0]]]]}),
    att: {'L1:0': 1, 'L2:0': 1, 'A1:0': 1, 'A2:0': 1, 'Br:0': 1}},
  {n: 'tuyau tracé de la boîte vers le WC : la flèche suit l\'eau, à l\'inverse du tracé',
    d: doc({o: [['wc', 'wc', 0, 6], ['B', 'boite', 0, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['B', 'wc']]]}),
    att: {'L1:0': -1}},
];
cas.forEach(k => {
  const f = fleches(k.d), faux = Object.keys(k.att).filter(id => !bon(f[id] || 0, k.att[id]));
  R.ok(!faux.length, k.n + ' : ' + ecrit(f) + (faux.length ? ' (attendu ' + faux.map(id => id + ' ' + k.att[id]).join(', ') + ')' : ''));
  const ordres = [1, 2, 3].filter(o => ecrit(fleches(reordonne(k.d, o))) !== ecrit(f));
  R.ok(!ordres.length, k.n + ' : mêmes flèches dans quatre ordres du dessin' + (ordres.length ? ' (diffèrent : ordre ' + ordres.join(', ') + ')' : ''));
});
R.fin();
