// Règles du constat (sans navigateur), sur des croquis fictifs : nature des eaux de chaque équipement (siphon de garage en EU, siphon de sol
// en EP), rejets interdits (EU vers l'EP, un puisard, la gargouille ou le milieu naturel ; EP vers l'EU), descente non visitable (NC),
// tampon béton (NC en EU, réserve en EP), fosse septique traversée (NC), en cul-de-sac ou hors fonction grâce à un by-pass (rien), fosses
// en parallèle (une fosse d'un chemin qui en traverse le moins), boîte sur le mauvais collecteur, et la conclusion proposée qui en découle
// (by-pass sous toutes ses formes : fosse-contournee.js ; fosse désignée comparée à un oracle : fosse-oracle.js).
// Infiltration au sol (m117) : descente conforme, WC non conforme (eu-sol), par un regard au tampon béton (réserve en EP), et une descente
// vers une infiltration et un puisard (deux exutoires : état « multiple »). Ces cinq cas échouent sur 2f3faa1 (type inconnu : bout libre).
// Arbitrage (m119, consigne du 13 nov. 2026 : une anomalie à arbitrer n'est jamais comptée conforme) : WC vers le collecteur EU sans boîte,
// anomalie « à arbitrer » d'office : conclusion « boite » (« À compléter : absence de boîte de branchement à arbitrer »), et non plus
// « conformes ». Ce cas échoue sur e728d76.
// Puits (m120, décision du 13 nov. 2026 : un rejet EP dans un puits est une non-conformité) : descente non conforme (ep-puits), WC non
// conforme (eu-puits), et l'un et l'autre par un regard au tampon béton (le regard suit l'exutoire : réserve en EP). Ces quatre cas
// échouent sur 7df0996 (type inconnu : bout libre).
// Autre destination (m125, décisions D3, D5 et D6 : le jugement des EP vient de la fiche de l'objet) : descente vers un
// étang aux EP conformes (aucune anomalie), en réserve (ep-exu en réserve), non conformes (ep-exu NC), à arbitrer (ep-exu NC à arbitrer,
// conclusion « exu ») ; WC et descente vers une destination sans champ (« l'autre destination », EP à arbitrer) ; descente vers un regard au
// tampon béton et sans cunette, puis un étang aux EP conformes, en Tronçon, en Tronçon EP, puis en avant-projet avec un Tronçon EP laissé
// libre au regard : regard et pièces EP, aucune contredite, seule anomalie « Regard EP : tampon béton » en réserve, ni « contredit » ni
// « sortielibre » (témoin : vers un puisard) ; un WC sur ce regard : la même réserve et eu-exu NC. Champs facultatifs d'un cas : mode
// (d'analyse), pt (réseau attendu des objets), pc (réseau attendu de chaque pièce, aucune contredite), sans (contrôles absents). Ces cas
// échouent sur ebd5589 (type inconnu : bout libre, aucun rejet établi), sauf le témoin.
// Destination nommée comme un puits, venue d'un fichier fait à la main (m151, décision D19 : la fiche refuse ce nom ; un rejet des EP dans
// un puits est toujours non conforme) : « Puits » sans jugement ou aux EP conformes, « Puit » et « Ancien puits » aux EP conformes, jugés
// comme un puits (ep-puits NC, conclusion « Non conformes ») avec le rappel « À vérifier » ; un WC vers « Puits » : eu-puits ; « Puits
// perdu » aux EP conformes : le jugement de sa fiche, avec son rappel ; « Puisard » aux EP conformes (témoin) : le jugement de sa fiche,
// sans rappel. Champ facultatif info : textes des rappels attendus (contrôles « destpuits » de niveau « info », aucun autre). Ces cas
// échouent sur 93bbb5f (rejet dans « le puits » à arbitrer, ou conforme ; aucun rappel), sauf le témoin.
// usage : node tests/vm/regles.js [-v] [--app=<dossier>]
'use strict';
const {charger, doc, copie, rapport} = require('./charger.js');
const {V} = charger(), R = rapport('regles');

/* source s (type, propriétés) reliée par un tuyau sans réseau à une boîte de branchement du réseau r, ou à un autre aval */
const vers = (s, r, p) => doc({o: [['s', s, 0, 8, p], ['B', 'boite', 0, 0, {res: r}]], l: [['L', 'tr', '', '', ['s', 'B']]]});
/* autre destination (m125) : un étang aux EP jugées ep, à la case cst du constat ; source s reliée à la destination X aux champs p ; source s
   reliée par un regard R au tampon béton et sans cunette à l'exutoire X de type t, en tronçons de réseau res ; libre : un Tronçon EP laissé
   libre au regard. REG : regard et exutoire EP, chaque pièce EP et aucune contredite, ni « contredit » ni « sortielibre » */
const etang = (ep, cst) => ({nom: 'Étang', ab: 'Ét', art: 'l\'', ep, cst: cst || 'autre'});
const versDest = (s, p) => doc({o: [['s', s, 0, 8], ['X', 'exutoire', 0, 0, p]], l: [['L', 'tr', '', '', ['s', 'X']]]});
const parRegard = (s, t, p, res, libre) => doc({o: [['s', s, 0, 8], ['R', 'regard', 0, 4, {tampon: 'beton', cunette: 'non'}], ['X', t, 0, 0, p]],
  l: [['L1', 'tr', res, '', ['s', 'R']], ['L2', 'tr', res, '', ['R', 'X']]].concat(libre ? [['L3', 'tr', 'EP', '', ['R', [4, 4]]]] : [])});
const REG = {pt: {R: 'EP', X: 'EP'}, pc: 'EP', sans: ['contredit', 'sortielibre']}, TB = ['tampon:R', false, 'Regard EP : tampon béton'];
/* m151 : rappels « À vérifier » d'une destination nommée comme un puits (nom écrit comme sur l'objet), anomalies du puits */
const RPU = n => 'Autre destination « ' + n + ' » : jugée comme un puits (rejet des EP non conforme). Pour un puits, posez l\'objet Puits ; pour un puits perdu, un Puisard.';
const RPP = n => 'Autre destination « ' + n + ' » : jugée d\'après sa fiche. Un puits perdu (qui infiltre les eaux) se dessine en Puisard.';
const EPU = ['ep-puits:s', true, 'Descente EP : rejet dans un puits'];
const cas = [
  {n: 'siphon de garage vers la boîte EU', d: vers('siphon_garage', 'EU'), et: 's=ok:EU', a: [], c: 'conformes'},
  {n: 'siphon de garage vers la boîte EP', d: vers('siphon_garage', 'EP'), et: 's=ok:EP', a: [['eu-ep:s', true, 'Siphon de garage : rejet au réseau EP']], c: 'non_conformes'},
  {n: 'siphon de sol vers la boîte EP', d: vers('siphon_sol', 'EP'), et: 's=ok:EP', a: [], c: 'conformes'},
  {n: 'siphon de sol vers la boîte EU', d: vers('siphon_sol', 'EU'), et: 's=ok:EU', a: [['ep-eu:s', true, 'Siphon de sol : rejet au réseau EU']], c: 'non_conformes'},
  {n: 'WC vers un puisard', d: doc({o: [['s', 'wc', 0, 8], ['P', 'puisard', 0, 0]], l: [['L', 'tr', '', '', ['s', 'P']]]}), et: 's=ok:INF', a: [['eu-inf:s', true, 'WC : rejet dans un puisard']], c: 'non_conformes'},
  {n: 'évier vers la gargouille', d: doc({o: [['s', 'evier', 0, 8], ['G', 'gargouille', 0, 0]], l: [['L', 'tr', '', '', ['s', 'G']]]}), et: 's=ok:GARG', a: [['eu-garg:s', true, 'Évier : rejet à la gargouille']], c: 'non_conformes'},
  {n: 'lave-linge vers le milieu naturel', d: doc({o: [['s', 'lavelinge', 0, 8], ['M', 'milieu', 0, 0]], l: [['L', 'tr', '', '', ['s', 'M']]]}), et: 's=ok:MILIEU', a: [['eu-milieu:s', true, 'Lave-linge : rejet en milieu naturel']], c: 'non_conformes'},
  {n: 'descente vers un puisard (gestion à la parcelle)', d: doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0]], l: [['L', 'tr', '', '', ['s', 'P']]]}), et: 's=ok:INF', a: [], c: 'conformes'},
  {n: 'descente vers une infiltration au sol', d: doc({o: [['s', 'descente', 0, 8], ['I', 'infiltration', 0, 0]], l: [['L', 'tr', '', '', ['s', 'I']]]}), et: 's=ok:SOL', a: [], c: 'conformes'},
  {n: 'WC vers une infiltration au sol', d: doc({o: [['s', 'wc', 0, 8], ['I', 'infiltration', 0, 0]], l: [['L', 'tr', '', '', ['s', 'I']]]}), et: 's=ok:SOL', a: [['eu-sol:s', true, 'WC : rejet au sol (infiltration)']], c: 'non_conformes'},
  {n: 'descente vers une infiltration au sol et un puisard (deux exutoires)', d: doc({o: [['s', 'descente', 0, 8], ['R', 'regard', 0, 4], ['I', 'infiltration', -3, 0], ['P', 'puisard', 3, 0]],
    l: [['L1', 'tr', '', '', ['s', 'R']], ['L2', 'tr', '', '', ['R', 'I']], ['L3', 'tr', '', '', ['R', 'P']]]}), et: 's=multiple', a: [], c: 'incomplet'},
  {n: 'descente vers une infiltration au sol par un regard au tampon béton (réserve)', d: doc({o: [['s', 'descente', 0, 8], ['R', 'regard', 0, 4, {tampon: 'beton'}], ['I', 'infiltration', 0, 0]],
    l: [['L1', 'tr', '', '', ['s', 'R']], ['L2', 'tr', '', '', ['R', 'I']]]}), et: 's=ok:SOL', a: [['tampon:R', false, 'Regard EP : tampon béton']], c: 'reserves'},
  {n: 'WC vers une infiltration au sol par un regard au tampon béton', d: doc({o: [['s', 'wc', 0, 8], ['R', 'regard', 0, 4, {tampon: 'beton'}], ['I', 'infiltration', 0, 0]],
    l: [['L1', 'tr', '', '', ['s', 'R']], ['L2', 'tr', '', '', ['R', 'I']]]}), et: 's=ok:SOL',
    a: [['tampon:R', false, 'Regard EP : tampon béton'], ['eu-sol:s', true, 'WC : rejet au sol (infiltration)']], c: 'non_conformes'},
  {n: 'descente vers un puits (non conforme)', d: doc({o: [['s', 'descente', 0, 8], ['W', 'puits', 0, 0]], l: [['L', 'tr', '', '', ['s', 'W']]]}),
    et: 's=ok:PUITS', a: [['ep-puits:s', true, 'Descente EP : rejet dans un puits']], c: 'non_conformes'},
  {n: 'WC vers un puits', d: doc({o: [['s', 'wc', 0, 8], ['W', 'puits', 0, 0]], l: [['L', 'tr', '', '', ['s', 'W']]]}),
    et: 's=ok:PUITS', a: [['eu-puits:s', true, 'WC : rejet dans un puits']], c: 'non_conformes'},
  {n: 'descente vers un puits par un regard au tampon béton (réserve et NC)', d: doc({o: [['s', 'descente', 0, 8], ['R', 'regard', 0, 4, {tampon: 'beton'}], ['W', 'puits', 0, 0]],
    l: [['L1', 'tr', '', '', ['s', 'R']], ['L2', 'tr', '', '', ['R', 'W']]]}), et: 's=ok:PUITS',
    a: [['tampon:R', false, 'Regard EP : tampon béton'], ['ep-puits:s', true, 'Descente EP : rejet dans un puits']], c: 'non_conformes'},
  {n: 'WC vers un puits par un regard au tampon béton', d: doc({o: [['s', 'wc', 0, 8], ['R', 'regard', 0, 4, {tampon: 'beton'}], ['W', 'puits', 0, 0]],
    l: [['L1', 'tr', '', '', ['s', 'R']], ['L2', 'tr', '', '', ['R', 'W']]]}), et: 's=ok:PUITS',
    a: [['tampon:R', false, 'Regard EP : tampon béton'], ['eu-puits:s', true, 'WC : rejet dans un puits']], c: 'non_conformes'},
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
  {n: 'deux fosses en parallèle puis une fosse contournée en aval : la NC va à une fosse que l\'eau ne peut pas éviter', d: doc({o: [['s', 'wc', 0, 12], ['R1', 'regard', 0, 10], ['F1', 'fosse', -3, 8], ['F2', 'fosse', 3, 8], ['R2', 'regard', 0, 6], ['F3', 'fosse', -3, 4], ['Rb', 'regard', 3, 4], ['R3', 'regard', 0, 2], ['B', 'boite', 0, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['s', 'R1']], ['a1', 'tr', '', '', ['R1', 'F1']], ['a2', 'tr', '', '', ['F1', 'R2']], ['b1', 'tr', '', '', ['R1', 'F2']], ['b2', 'tr', '', '', ['F2', 'R2']], ['c1', 'tr', '', '', ['R2', 'F3']], ['c2', 'tr', '', '', ['F3', 'R3']], ['d1', 'tr', '', '', ['R2', 'Rb']], ['d2', 'tr', '', '', ['Rb', 'R3']], ['L2', 'tr', '', '', ['R3', 'B']]]}),
    et: 's=ok:EU', a: [['fosse:F1', true, 'Fosse septique : eaux usées traversant la fosse']], c: 'non_conformes'},
  {n: 'deux fosses en série sur chacune de deux branches parallèles, puis une fosse contournée en aval : la NC va à une fosse d\'un chemin qui en traverse le moins, jamais à la fosse contournée',
    d: doc({o: [['s', 'wc', 0, 14], ['R1', 'regard', 0, 12], ['F1', 'fosse', -3, 10], ['F2', 'fosse', -3, 8], ['F3', 'fosse', 3, 10], ['F4', 'fosse', 3, 8], ['R2', 'regard', 0, 6],
      ['F5', 'fosse', -3, 4], ['Rb', 'regard', 3, 4], ['R3', 'regard', 0, 2], ['B', 'boite', 0, 0, {res: 'EU'}]],
      l: [['L1', 'tr', '', '', ['s', 'R1']], ['a1', 'tr', '', '', ['R1', 'F1']], ['a2', 'tr', '', '', ['F1', 'F2']], ['a3', 'tr', '', '', ['F2', 'R2']], ['b1', 'tr', '', '', ['R1', 'F3']], ['b2', 'tr', '', '', ['F3', 'F4']],
        ['b3', 'tr', '', '', ['F4', 'R2']], ['c1', 'tr', '', '', ['R2', 'F5']], ['c2', 'tr', '', '', ['F5', 'R3']], ['d1', 'tr', '', '', ['R2', 'Rb']], ['d2', 'tr', '', '', ['Rb', 'R3']], ['L2', 'tr', '', '', ['R3', 'B']]]}),
    et: 's=ok:EU', a: [['fosse:F2', true, 'Fosse septique : eaux usées traversant la fosse']], c: 'non_conformes'},
  {n: 'by-pass de la fosse vers un autre exutoire dessiné du même réseau', d: doc({o: [['s', 'wc', 0, 10], ['R1', 'regard', 0, 7], ['F', 'fosse', -3, 4], ['Ba', 'boite', -3, 0, {res: 'EU'}], ['Bb', 'boite', 3, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['s', 'R1']], ['a1', 'tr', '', '', ['R1', 'F']], ['a2', 'tr', '', '', ['F', 'Ba']], ['b1', 'tr', '', '', ['R1', 'Bb']]]}),
    et: 's=ok:EU', a: [], c: 'conformes'},
  {n: 'descente vers la fosse puis le réseau EU', d: doc({o: [['s', 'descente', 0, 8], ['F', 'fosse', 0, 4], ['B', 'boite', 0, 0, {res: 'EU'}]], l: [['L1', 'tr', '', '', ['s', 'F']], ['L2', 'tr', '', '', ['F', 'B']]]}),
    et: 's=ok:EU', a: [['ep-eu:s', true, 'Descente EP : rejet au réseau EU'], ['ep-fosse:s', true, 'Descente EP : rejet dans la fosse septique']], c: 'non_conformes'},
  {n: 'boîte EP sur le collecteur EU', d: doc({o: [['s', 'descente', 0, 8], ['B', 'boite', 0, 4, {res: 'EP'}], ['j', 'jonction', 0, 0, {}]], l: [['L1', 'tr', '', '', ['s', 'B']], ['L2', 'tr', '', '', ['B', 'j']], ['C', 'col', 'EU', '', [[-10, 0], 'j', [10, 0]]]]}),
    et: 's=ok:EP', a: [['boite-col:B:C', true, 'Boîte de branchement EP : rejet au collecteur EU']], c: 'non_conformes'},
  {n: 'WC vers le collecteur EU sans boîte (à arbitrer)', d: doc({o: [['s', 'wc', 0, 8], ['j', 'jonction', 0, 0, {}]], l: [['L1', 'tr', '', '', ['s', 'j']], ['C', 'col', 'EU', '', [[-10, 0], 'j', [10, 0]]]]}),
    et: 's=ok:EU', a: [['sansboite:C:EU', true, 'Branchement EU : pas de boîte de branchement en limite de propriété', 'arbitrer']], c: 'boite'},
  {n: 'WC sans exutoire dessiné', d: doc({o: [['s', 'wc', 0, 8]], l: [['L1', 'tr', '', '', ['s', [0, 0]]]]}), et: 's=sansexu', a: [], c: 'incomplet'},
  /* autre destination (m125) : le jugement des EP de sa fiche ; un WC y est toujours non conforme */
  {n: 'descente vers un étang aux EP conformes', d: versDest('descente', etang('conforme')), et: 's=ok:X:ETANG:conforme:autre', a: [], c: 'conformes'},
  {n: 'descente vers un étang aux EP en réserve', d: versDest('descente', etang('reserve')), et: 's=ok:X:ETANG:reserve:autre',
    a: [['ep-exu:s', false, 'Descente EP : rejet dans l\'étang']], c: 'reserves'},
  {n: 'descente vers un étang aux EP non conformes', d: versDest('descente', etang('nc')), et: 's=ok:X:ETANG:nc:autre',
    a: [['ep-exu:s', true, 'Descente EP : rejet dans l\'étang']], c: 'non_conformes'},
  {n: 'descente vers un étang aux EP à arbitrer', d: versDest('descente', etang('arbitrer')), et: 's=ok:X:ETANG:arbitrer:autre',
    a: [['ep-exu:s', true, 'Descente EP : rejet dans l\'étang', 'arbitrer']], c: 'exu'},
  {n: 'WC vers une destination sans champ', d: versDest('wc', {}), et: 's=ok:X:AUTRE DESTINATION:arbitrer:autre',
    a: [['eu-exu:s', true, 'WC : rejet dans l\'autre destination']], c: 'non_conformes'},
  {n: 'descente vers une destination sans champ (EP à arbitrer)', d: versDest('descente', {}), et: 's=ok:X:AUTRE DESTINATION:arbitrer:autre',
    a: [['ep-exu:s', true, 'Descente EP : rejet dans l\'autre destination', 'arbitrer']], c: 'exu'},
  /* destination nommée comme un puits, d'un fichier fait à la main (m151, D19) : jugée comme un puits ; un puits perdu, d'après sa fiche */
  {n: 'descente vers une destination nommée « Puits » sans jugement (fichier fait à la main) : comme un puits (ep-puits)', d: versDest('descente', {nom: 'Puits'}),
    et: 's=ok:PUITS', a: [EPU], c: 'non_conformes', info: [RPU('Puits')]},
  {n: 'descente vers une destination nommée « Puits » aux EP conformes (fichier fait à la main) : comme un puits, malgré sa fiche', d: versDest('descente', {nom: 'Puits', ep: 'conforme'}),
    et: 's=ok:PUITS', a: [EPU], c: 'non_conformes', info: [RPU('Puits')]},
  {n: 'descente vers une destination nommée « Puit » aux EP conformes : comme un puits', d: versDest('descente', {nom: 'Puit', ep: 'conforme'}),
    et: 's=ok:PUITS', a: [EPU], c: 'non_conformes', info: [RPU('Puit')]},
  {n: 'descente vers une destination nommée « Ancien puits » aux EP conformes : comme un puits', d: versDest('descente', {nom: 'Ancien puits', ep: 'conforme'}),
    et: 's=ok:PUITS', a: [EPU], c: 'non_conformes', info: [RPU('Ancien puits')]},
  {n: 'WC vers une destination nommée « Puits » : eu-puits', d: versDest('wc', {nom: 'Puits'}),
    et: 's=ok:PUITS', a: [['eu-puits:s', true, 'WC : rejet dans un puits']], c: 'non_conformes', info: [RPU('Puits')]},
  {n: 'descente vers une destination nommée « Puits perdu » aux EP conformes : le jugement de sa fiche, avec son rappel', d: versDest('descente', {nom: 'Puits perdu', ep: 'conforme'}),
    et: 's=ok:X:PUITS PERDU:conforme:autre', a: [], c: 'conformes', info: [RPP('Puits perdu')]},
  {n: 'descente vers une destination nommée « Puisard » aux EP conformes (témoin) : le jugement de sa fiche, sans rappel', d: versDest('descente', {nom: 'Puisard', ep: 'conforme'}),
    et: 's=ok:X:PUISARD:conforme:autre', a: [], c: 'conformes'},
  {n: 'descente vers un puisard par un regard au tampon béton et sans cunette (témoin)', d: parRegard('descente', 'puisard', {}, ''), et: 's=ok:INF', a: [TB], c: 'reserves', ...REG},
  {n: 'descente vers un étang aux EP conformes par un regard au tampon béton et sans cunette, en Tronçon', d: parRegard('descente', 'exutoire', etang('conforme'), ''),
    et: 's=ok:X:ETANG:conforme:autre', a: [TB], c: 'reserves', ...REG},
  {n: 'descente vers un étang aux EP conformes par un regard au tampon béton et sans cunette, en Tronçon EP', d: parRegard('descente', 'exutoire', etang('conforme'), 'EP'),
    et: 's=ok:X:ETANG:conforme:autre', a: [TB], c: 'reserves', ...REG},
  {n: 'descente vers un étang aux EP conformes par un regard au tampon béton et sans cunette, en avant-projet, un Tronçon EP laissé libre au regard',
    d: parRegard('descente', 'exutoire', etang('conforme'), '', true), mode: 'avp', et: 's=ok:X:ETANG:conforme:autre', a: [TB], c: 'reserves', ...REG},
  {n: 'WC vers un étang aux EP conformes par un regard au tampon béton et sans cunette', d: parRegard('wc', 'exutoire', etang('conforme'), ''),
    et: 's=ok:X:ETANG:conforme:autre', a: [TB, ['eu-exu:s', true, 'WC : rejet dans l\'étang']], c: 'non_conformes', ...REG},
];
const FAM = /^(eu-|ep-|fosse|dep-nv|tampon|cunette|boite-col|sansboite)/;
cas.forEach(k => {
  const an = V.analyser(copie(k.d), k.mode || 'edl'), L = V.anomaliesDoc(copie(k.d), an), c = V.conclusion(L, an);
  const et = Object.keys(an.resObj).map(id => id + '=' + an.resObj[id].etat + (an.resObj[id].res ? ':' + an.resObj[id].res : '')).join(' ');
  const vus = L.filter(a => FAM.test(a.cle)), ecarts = [];
  k.a.forEach(([cle, nc, obs, st]) => { const a = vus.find(x => x.cle === cle);
    if (!a) ecarts.push('absente : ' + cle); else if (!!a.nc !== nc || a.obs !== obs || a.st !== (st || 'retenue')) ecarts.push(cle + ' : ' + JSON.stringify({nc: !!a.nc, obs: a.obs, st: a.st})); });
  vus.forEach(a => { if (!k.a.some(e => e[0] === a.cle)) ecarts.push('en trop : ' + a.cle + ' « ' + a.obs + ' »'); });
  /* champs facultatifs (m125) : réseau des objets (resPt), de chaque pièce (aucune contredite), contrôles absents */
  Object.keys(k.pt || {}).forEach(id => { if (an.resPt[id] !== k.pt[id]) ecarts.push('réseau de ' + id + ' : ' + an.resPt[id]); });
  if (k.pc) an.pieces.forEach(p => { const rp = an.resPiece[p.id] || {}; if (rp.res !== k.pc || rp.contredit) ecarts.push('pièce ' + p.id + ' : ' + rp.res + (rp.contredit ? ', contredite' : '')); });
  (an.controles || []).forEach(x => { if ((k.sans || []).indexOf(x.cle.split(':')[0]) >= 0) ecarts.push('contrôle ' + x.cle); });
  /* m151 : rappels d'une destination nommée comme un puits (contrôles « destpuits »), mot pour mot, de niveau « info », aucun autre */
  const rap = (an.controles || []).filter(x => x.cle.split(':')[0] === 'destpuits').map(x => x.niveau + ' ' + x.txt);
  if (JSON.stringify(rap) !== JSON.stringify((k.info || []).map(t => 'info ' + t))) ecarts.push('rappels : ' + (rap.length ? rap.join(' / ') : 'aucun'));
  R.ok(et === k.et && !ecarts.length && c === k.c, k.n + ' : ' + et + ' | ' + c + (ecarts.length ? ' | ' + ecarts.join(' ; ') : ''));
});
R.fin();
