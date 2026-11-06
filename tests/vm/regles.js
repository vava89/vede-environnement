// Règles du constat (sans navigateur), sur des croquis fictifs : nature des eaux de chaque équipement (siphon de garage en EU, siphon de sol
// en EP), rejets interdits (EU vers l'EP, un puisard, la gargouille ou le milieu naturel ; EP vers l'EU), descente non visitable (NC),
// tampon béton (NC en EU, réserve en EP), fosse septique traversée (NC), en cul-de-sac ou hors fonction grâce à un by-pass (rien), boîte
// sur le mauvais collecteur, et la conclusion proposée qui en découle (by-pass sous toutes ses formes : fosse-contournee.js).
// usage : node tests/vm/regles.js [-v] [--app=<dossier>]
'use strict';
const {charger, doc, copie, rapport} = require('./charger.js');
const {V} = charger(), R = rapport('regles');

/* source s (type, propriétés) reliée par un tuyau sans réseau à une boîte de branchement du réseau r, ou à un autre aval */
const vers = (s, r, p) => doc({o: [['s', s, 0, 8, p], ['B', 'boite', 0, 0, {res: r}]], l: [['L', 'tr', '', '', ['s', 'B']]]});
const cas = [
  {n: 'siphon de garage vers la boîte EU', d: vers('siphon_garage', 'EU'), et: 's=ok:EU', a: [], c: 'conformes'},
  {n: 'siphon de garage vers la boîte EP', d: vers('siphon_garage', 'EP'), et: 's=ok:EP', a: [['eu-ep:s', true, 'Siphon de garage : rejet au réseau EP']], c: 'non_conformes'},
  {n: 'siphon de sol vers la boîte EP', d: vers('siphon_sol', 'EP'), et: 's=ok:EP', a: [], c: 'conformes'},
  {n: 'siphon de sol vers la boîte EU', d: vers('siphon_sol', 'EU'), et: 's=ok:EU', a: [['ep-eu:s', true, 'Siphon de sol : rejet au réseau EU']], c: 'non_conformes'},
  {n: 'WC vers un puisard', d: doc({o: [['s', 'wc', 0, 8], ['P', 'puisard', 0, 0]], l: [['L', 'tr', '', '', ['s', 'P']]]}), et: 's=ok:INF', a: [['eu-inf:s', true, 'WC : rejet dans un puisard']], c: 'non_conformes'},
  {n: 'évier vers la gargouille', d: doc({o: [['s', 'evier', 0, 8], ['G', 'gargouille', 0, 0]], l: [['L', 'tr', '', '', ['s', 'G']]]}), et: 's=ok:GARG', a: [['eu-garg:s', true, 'Évier : rejet à la gargouille']], c: 'non_conformes'},
  {n: 'lave-linge vers le milieu naturel', d: doc({o: [['s', 'lavelinge', 0, 8], ['M', 'milieu', 0, 0]], l: [['L', 'tr', '', '', ['s', 'M']]]}), et: 's=ok:MILIEU', a: [['eu-milieu:s', true, 'Lave-linge : rejet en milieu naturel']], c: 'non_conformes'},
  {n: 'descente vers un puisard (gestion à la parcelle)', d: doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0]], l: [['L', 'tr', '', '', ['s', 'P']]]}), et: 's=ok:INF', a: [], c: 'conformes'},
  {n: 'descente non visitable, côté avant', d: vers('descente', 'EP', {visitable: 'non', cote: 'avant'}), et: 's=ok:EP', a: [['dep-nv:s', true, 'Descente EP avant : non visitable']], c: 'non_conformes'},
  {n: 'descente non visitable, côté arrière', d: vers('descente', 'EP', {visitable: 'non', cote: 'arriere'}), et: 's=ok:EP', a: [['dep-nv:s', true, 'Descente EP arrière : non visitable']], c: 'non_conformes'},
  {n: 'descente visitable', d: vers('descente', 'EP'), et: 's=ok:EP', a: [], c: 'conformes'},
  {n: 'regard EU au tampon béton (NC)', d: doc({o: [['s', 'wc', 0, 8], ['R', 'regard', 0, 4, {tampon: 'beton'}], ['B', 'boite', 0, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['s', 'R']], ['L2', 'tr', '', '', ['R', 'B']]]}),
    et: 's=ok:EU', a: [['tampon:R', true, 'Regard EU : tampon béton']], c: 'non_conformes'},
  {n: 'regard EP au tampon béton (réserve)', d: doc({o: [['s', 'descente', 0, 8], ['R', 'regard', 0, 4, {tampon: 'beton'}], ['B', 'boite', 0, 0, {res: 'EP'}]], l: [['L1', 'tr', '', '', ['s', 'R']], ['L2', 'tr', '', '', ['R', 'B']]]}),
    et: 's=ok:EP', a: [['tampon:R', false, 'Regard EP : tampon béton']], c: 'reserves'},
  {n: 'fosse septique traversée par les eaux usées', d: doc({o: [['s', 'wc', 0, 8], ['F', 'fosse', 0, 4], ['B', 'boite', 0, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['s', 'F']], ['L2', 'tr', '', '', ['F', 'B']]]}),
    et: 's=ok:EU', a: [['fosse:F', true, 'Fosse septique : eaux usées traversant la fosse']], c: 'non_conformes'},
  {n: 'fosse septique en cul-de-sac à côté du chemin de l\'eau', d: doc({o: [['s', 'wc', 0, 8], ['R', 'regard', 0, 4], ['F', 'fosse', 4, 4], ['B', 'boite', 0, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['s', 'R']], ['L2', 'tr', '', '', ['R', 'B']], ['L3', 'tr', '', '', ['R', 'F']]]}),
    et: 's=ok:EU', a: [], c: 'conformes'},
  {n: 'fosse septique hors fonction grâce à un by-pass', d: doc({o: [['s', 'wc', 0, 10], ['R1', 'regard', 0, 7], ['F', 'fosse', -3, 4], ['R3', 'regard', 0, 2], ['B', 'boite', 0, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['s', 'R1']], ['Lf1', 'tr', '', '', ['R1', 'F']], ['Lf2', 'tr', '', '', ['F', 'R3']], ['Lb', 'tr', '', '', ['R1', [2, 4.5], 'R3']], ['L2', 'tr', '', '', ['R3', 'B']]]}),
    et: 's=ok:EU', a: [], c: 'conformes'},
  {n: 'deux fosses en parallèle : l\'eau en traverse forcément une', d: doc({o: [['s', 'wc', 0, 10], ['R1', 'regard', 0, 7], ['F1', 'fosse', -3, 4], ['F2', 'fosse', 3, 4], ['R3', 'regard', 0, 2], ['B', 'boite', 0, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['s', 'R1']], ['a1', 'tr', '', '', ['R1', 'F1']], ['a2', 'tr', '', '', ['F1', 'R3']], ['b1', 'tr', '', '', ['R1', 'F2']], ['b2', 'tr', '', '', ['F2', 'R3']], ['L2', 'tr', '', '', ['R3', 'B']]]}),
    et: 's=ok:EU', a: [['fosse:F1', true, 'Fosse septique : eaux usées traversant la fosse']], c: 'non_conformes'},
  {n: 'by-pass de la fosse vers un autre exutoire dessiné du même réseau', d: doc({o: [['s', 'wc', 0, 10], ['R1', 'regard', 0, 7], ['F', 'fosse', -3, 4], ['Ba', 'boite', -3, 0, {res: 'EU'}], ['Bb', 'boite', 3, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['s', 'R1']], ['a1', 'tr', '', '', ['R1', 'F']], ['a2', 'tr', '', '', ['F', 'Ba']], ['b1', 'tr', '', '', ['R1', 'Bb']]]}),
    et: 's=ok:EU', a: [], c: 'conformes'},
  {n: 'descente vers la fosse puis le réseau EU', d: doc({o: [['s', 'descente', 0, 8], ['F', 'fosse', 0, 4], ['B', 'boite', 0, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['s', 'F']], ['L2', 'tr', '', '', ['F', 'B']]]}),
    et: 's=ok:EU', a: [['ep-eu:s', true, 'Descente EP : rejet au réseau EU'], ['ep-fosse:s', true, 'Descente EP : rejet dans la fosse septique']], c: 'non_conformes'},
  {n: 'boîte EP sur le collecteur EU', d: doc({o: [['s', 'descente', 0, 8], ['B', 'boite', 0, 4, {res: 'EP'}], ['j', 'jonction', 0, 0, {}]], l: [['L1', 'tr', '', '', ['s', 'B']], ['L2', 'tr', '', '', ['B', 'j']], ['C', 'col', 'EU', '', [[-10, 0], 'j', [10, 0]]]]}),
    et: 's=ok:EP', a: [['boite-col:B:C', true, 'Boîte de branchement EP : rejet au collecteur EU']], c: 'non_conformes'},
  {n: 'WC vers le collecteur EU sans boîte (à arbitrer)', d: doc({o: [['s', 'wc', 0, 8], ['j', 'jonction', 0, 0, {}]], l: [['L1', 'tr', '', '', ['s', 'j']], ['C', 'col', 'EU', '', [[-10, 0], 'j', [10, 0]]]]}),
    et: 's=ok:EU', a: [['sansboite:C:EU', true, 'Branchement EU : pas de boîte de branchement en limite de propriété', 'arbitrer']], c: 'conformes'},
  {n: 'WC sans exutoire dessiné', d: doc({o: [['s', 'wc', 0, 8]], l: [['L1', 'tr', '', '', ['s', [0, 0]]]]}), et: 's=sansexu', a: [], c: 'incomplet'},
];
const FAM = /^(eu-|ep-|fosse|dep-nv|tampon|boite-col|sansboite)/;
cas.forEach(k => {
  const an = V.analyser(copie(k.d), 'edl'), L = V.anomaliesDoc(copie(k.d), an), c = V.conclusion(L, an);
  const et = Object.keys(an.resObj).map(id => id + '=' + an.resObj[id].etat + (an.resObj[id].res ? ':' + an.resObj[id].res : '')).join(' ');
  const vus = L.filter(a => FAM.test(a.cle)), ecarts = [];
  k.a.forEach(([cle, nc, obs, st]) => { const a = vus.find(x => x.cle === cle);
    if (!a) ecarts.push('absente : ' + cle); else if (!!a.nc !== nc || a.obs !== obs || a.st !== (st || 'retenue')) ecarts.push(cle + ' : ' + JSON.stringify({nc: !!a.nc, obs: a.obs, st: a.st})); });
  vus.forEach(a => { if (!k.a.some(e => e[0] === a.cle)) ecarts.push('en trop : ' + a.cle + ' « ' + a.obs + ' »'); });
  R.ok(et === k.et && !ecarts.length && c === k.c, k.n + ' : ' + et + ' | ' + c + (ecarts.length ? ' | ' + ecarts.join(' ; ') : ''));
});
R.fin();
