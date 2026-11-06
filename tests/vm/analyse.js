// Matrice d'analyse (sans navigateur) : pour chaque croquis fictif, état de chaque appareil ou descente (exutoire trouvé, réseau, présumé),
// messages « manque » d'exutoire et conclusion proposée ; chaque cas est aussi analysé dans trois autres ordres du dessin, qui doivent
// donner le même résultat détaillé (réseaux, boîte, fosse, anomalies et leur objet, contrôles d'exutoire, conclusion).
// Origine : banc m76 (cas c, h, n1, n2, u4 ; attendus de v1.6.1), m77 (k1 à k7 : chemins de même longueur) et m79 (k8 à k13 : la pièce la
// plus proche qui passe le partage du tronc donne son réseau). Les autres cas de ces bancs (m, o, p, s, t, n3 à n9, u1 à u3) sont perdus
// depuis l'effacement du dossier de travail du 6 novembre 2026 : à refaire.
// usage : node tests/vm/analyse.js [-v] [--app=<dossier>]
'use strict';
const {charger, doc, reordonne, copie, rapport} = require('./charger.js');
const {V} = charger(), R = rapport('analyse');
const O = (extra) => [['wc', 'wc', 0, 8], ['R', 'regard', 0, 2], ['d1', 'descente', 4, 5]].concat(extra || []);
const cas = {
  /* réseaux indiqués réunis vers une même extrémité libre */
  'c1 WC[EU] + descente[EP] > regard > branche[-] libre': doc({o: O(), l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Ld', 'tr', 'EP', '', ['d1', 'R']], ['Br', 'tr', '', '', ['R', [0, -3]]]]}),
  'c2 idem branche[EU]': doc({o: O(), l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Ld', 'tr', 'EP', '', ['d1', 'R']], ['Br', 'tr', 'EU', '', ['R', [0, -3]]]]}),
  'c3 idem branche[EP]': doc({o: O(), l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Ld', 'tr', 'EP', '', ['d1', 'R']], ['Br', 'tr', 'EP', '', ['R', [0, -3]]]]}),
  'c4 idem branche[UN]': doc({o: O(), l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Ld', 'tr', 'EP', '', ['d1', 'R']], ['Br', 'tr', 'UN', '', ['R', [0, -3]]]]}),
  'c5 WC[EU] + lavabo[-] > regard > branche[-]': doc({o: [['wc', 'wc', 0, 8], ['R', 'regard', 0, 2], ['la', 'lavabo', 4, 5]], l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Ll', 'tr', '', '', ['la', 'R']], ['Br', 'tr', '', '', ['R', [0, -3]]]]}),
  'c6 WC[EU] + descente[-] > regard > branche[-]': doc({o: O(), l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Ld', 'tr', '', '', ['d1', 'R']], ['Br', 'tr', '', '', ['R', [0, -3]]]]}),
  'c7 WC[EU] + WC2[EU] > regard > branche[-]': doc({o: [['wc', 'wc', 0, 8], ['R', 'regard', 0, 2], ['w2', 'wc', 4, 5]], l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['L2', 'tr', 'EU', '', ['w2', 'R']], ['Br', 'tr', '', '', ['R', [0, -3]]]]}),
  'c8 WC[EU] + descente[UN] > regard > branche[-]': doc({o: O(), l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Ld', 'tr', 'UN', '', ['d1', 'R']], ['Br', 'tr', '', '', ['R', [0, -3]]]]}),
  'c9 WC[EU] > libre ; descente[EP] > libre (séparés)': doc({o: O(), l: [['L1', 'tr', 'EU', '', ['wc', [0, 0]]], ['Ld', 'tr', 'EP', '', ['d1', [6, 0]]]]}),
  'c10 WC[EU] > regard[-] > regard2 < descente[EP], branche[-] de regard2': doc({o: O([['R2', 'regard', 0, -2]]), l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['La', 'tr', '', '', ['R', 'R2']], ['Ld', 'tr', 'EP', '', ['d1', 'R2']], ['Br', 'tr', '', '', ['R2', [0, -5]]]]}),
  'c11 WC[EU] > regard > branche[EP] libre + arrivée libre[-]': doc({o: [['wc', 'wc', 0, 8], ['R', 'regard', 0, 2]], l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Br', 'tr', 'EP', '', ['R', [0, -3]]], ['In', 'tr', '', '', [[5, 6], 'R']]]}),
  'c12 WC[EU] + descente[EP] > regard > branche[-] orientée, sortie EP orientée vers une 2e extrémité': doc({o: O(), l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Ld', 'tr', 'EP', '', ['d1', 'R']], ['Br', 'tr', '', '', ['R', [0, -3]], 1]]}),
  'c13 WC[EU] + descente[EP] > regard > collecteur EU dessiné': doc({o: O([['j', 'jonction', 0, -3, {}]]), l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Ld', 'tr', 'EP', '', ['d1', 'R']], ['Br', 'tr', '', '', ['R', 'j']], ['C', 'col', 'EU', '', [[-10, -3], 'j', [10, -3]]]]}),
  'c14 lavabo[-] + WC[EU] + descente[EP] > regard > branche[-]': doc({o: O([['la', 'lavabo', -4, 5]]), l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Ld', 'tr', 'EP', '', ['d1', 'R']], ['Ll', 'tr', '', '', ['la', 'R']], ['Br', 'tr', '', '', ['R', [0, -3]]]]}),
  /* branche de sortie indiquée, avec une arrivée, une seconde sortie ou un trop-plein laissés libres (relecture de b2b591c) */
  'h1 WC[EU] + évier[-] > regard > sortie[EP] libre ; arrivée[-] libre': doc({o: [['wc', 'wc', 0, 8], ['R', 'regard', 0, 2], ['ev', 'evier', 4, 5]], l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Le', 'tr', '', '', ['ev', 'R']], ['Br', 'tr', 'EP', '', ['R', [0, -3]]], ['In', 'tr', '', '', [[-6, 2], 'R']]]}),
  'h2 WC[EU] + évier[-] > regard > sortie[EP] libre ; seconde sortie[-] libre': doc({o: [['wc', 'wc', 0, 8], ['R', 'regard', 0, 2], ['ev', 'evier', 4, 5]], l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['Le', 'tr', '', '', ['ev', 'R']], ['Br', 'tr', 'EP', '', ['R', [0, -3]]], ['B2', 'tr', '', '', ['R', [4, -3]]]]}),
  'h3 siphon de cour[-] + descente[EP] > regard > sortie[EU] libre ; arrivée[-] libre': doc({o: [['si', 'siphon_cour', 0, 8], ['R', 'regard', 0, 2], ['d1', 'descente', 4, 5]], l: [['Ls', 'tr', '', '', ['si', 'R']], ['Ld', 'tr', 'EP', '', ['d1', 'R']], ['Br', 'tr', 'EU', '', ['R', [0, -3]]], ['In', 'tr', '', '', [[-6, 2], 'R']]]}),
  'h4 WC[EU] + évier[-] > fosse > sortie[EP] libre ; trop-plein[-] libre': doc({o: [['wc', 'wc', 0, 8], ['F', 'fosse', 0, 2], ['ev', 'evier', 4, 5]], l: [['L1', 'tr', 'EU', '', ['wc', 'F']], ['Le', 'tr', '', '', ['ev', 'F']], ['Br', 'tr', 'EP', '', ['F', [0, -3]]], ['Tp', 'tr', '', '', ['F', [5, 0]]]]}),
  /* annotations au bout d'un tuyau */
  'n1 WC > Tronçon EP > point de test (seul)': doc({o: [['wc', 'wc', 0, 8], ['T', 'test', 0, 0]], l: [['L1', 'tr', 'EP', '', ['wc', 'T']]]}),
  'n2 WC > Tronçon EP > zone suspecte (seule, croquis ancien)': doc({o: [['wc', 'wc', 0, 8], ['Z', 'zone', 0, 0, {r: 1.5}]], l: [['L1', 'tr', 'EP', '', ['wc', 'Z']]]}),
  'u4 WC[EU] > R ; R > P[EP] non orientée libre ; R > Q[EU] orientée libre': doc({o: [['wc', 'wc', 0, 10], ['R', 'regard', 0, 6]], l: [['L1', 'tr', 'EU', '', ['wc', 'R']], ['P', 'tr', 'EP', '', ['R', [5, 3]]], ['Q', 'tr', 'EU', '', ['R', [-4, 3]], 1]]}),
  /* chemins de même longueur (m77a) : le résultat ne dépend pas de l'ordre du dessin */
  'k1 WC[EU] > R1 = deux tuyaux parallèles (EP, sans réseau) = R2 > libre': doc({o: [['wc', 'wc', 0, 10], ['R1', 'regard', 0, 6], ['R2', 'regard', 0, 2]], l: [['tWC', 'tr', 'EU', '', ['wc', 'R1']], ['Pa', 'tr', 'EP', '', ['R1', 'R2']], ['Pb', 'tr', '', '', ['R1', [2, 4], 'R2']], ['out', 'tr', '', '', ['R2', [0, -3]]]]}),
  'k2 WC[-]> R1 = parallèles (EU orientée, sans réseau) = R2 > libre ; R1 > UN orientée libre': doc({o: [['wc', 'wc', 0, 10], ['R1', 'regard', 0, 6], ['R2', 'regard', 0, 2]], l: [['tWC', 'tr', '', '', ['wc', 'R1'], 1], ['Pa', 'tr', 'EU', '', ['R1', 'R2'], 1], ['Pb', 'tr', '', '', ['R1', [2, 4], 'R2']], ['x1', 'tr', 'UN', '', ['R1', [-5, 6]], 1], ['x2', 'tr', '', '', ['R2', [0, -3]]]]}),
  'k3 WC[EU] > R > collecteur EU et collecteur unitaire à même distance': doc({o: [['wc', 'wc', 0, 10], ['R', 'regard', 0, 6], ['j1', 'jonction', -4, 0, {}], ['j2', 'jonction', 4, 0, {}]], l: [['tWC', 'tr', 'EU', '', ['wc', 'R']], ['b1', 'tr', '', '', ['R', 'j1']], ['b2', 'tr', '', '', ['R', 'j2']], ['C1', 'col', 'EU', '', [[-10, 0], 'j1', [-2, 0]]], ['C2', 'col', 'UN', '', [[2, 0], 'j2', [10, 0]]]]}),
  'k4 WC[EU] > R > boîte > collecteur EU ; R > regard > même collecteur (même longueur)': doc({o: [['wc', 'wc', 0, 10], ['R', 'regard', 0, 6], ['B', 'boite', -3, 3, {res: ''}], ['Rx', 'regard', 3, 3], ['j1', 'jonction', -3, 0, {}], ['j2', 'jonction', 3, 0, {}]], l: [['tWC', 'tr', 'EU', '', ['wc', 'R']], ['b1', 'tr', '', '', ['R', 'B']], ['b2', 'tr', '', '', ['B', 'j1']], ['c1', 'tr', '', '', ['R', 'Rx']], ['c2', 'tr', '', '', ['Rx', 'j2']], ['C', 'col', 'EU', '', [[-10, 0], 'j1', 'j2', [10, 0]]]]}),
  'k5 WC[EU] > R > deux branchements sans boîte sur le même collecteur': doc({o: [['wc', 'wc', 0, 10], ['R', 'regard', 0, 6], ['j1', 'jonction', -3, 0, {}], ['j2', 'jonction', 3, 0, {}]], l: [['tWC', 'tr', 'EU', '', ['wc', 'R']], ['b1', 'tr', '', '', ['R', 'j1']], ['b2', 'tr', '', '', ['R', 'j2']], ['C', 'col', 'EU', '', [[-10, 0], 'j1', 'j2', [10, 0]]]]}),
  'k6 WC[-] > R1 > Rf[EU]> > R2 ; by-pass R1 > Rb > R2 ; R2 > R3 > rue orientée, voisin libre ; entrée libre ; descente[-] > R2': doc({o: [['wc', 'wc', -3, 10], ['d1', 'descente', 3, 10], ['R1', 'regard', 0, 6], ['Rf', 'regard', 0, 4], ['Rb', 'regard', 4, 4], ['R2', 'regard', 0, 2], ['R3', 'regard', 0, -2]], l: [['tWC', 'tr', '', '', ['wc', 'R1']], ['tDE', 'tr', '', '', ['d1', 'R2']], ['P1F', 'tr', 'EU', '', ['R1', 'Rf'], 1], ['PF2', 'tr', '', '', ['Rf', 'R2'], 1], ['bp1', 'tr', '', '', ['R1', 'Rb']], ['bp2', 'tr', '', '', ['Rb', 'R2']], ['P23', 'tr', '', '', ['R2', 'R3']], ['ent', 'tr', '', '', [[-6, 6], 'R1']], ['rue', 'tr', '', '', ['R3', [0, -8]], 1], ['voi', 'tr', '', '', [[6, -2], 'R3']]]}),
  'k7 WC[EU] > R1 > Rf > [EU] R2 ; by-pass R1 > Rb > R2 ; R2 > R3 < descente[EP] ; rue orientée, voisin[EU], entrée, seconde sortie libres': doc({o: [['wc', 'wc', -3, 10], ['d1', 'descente', 3, 10], ['R1', 'regard', 0, 6], ['Rf', 'regard', 0, 4], ['Rb', 'regard', 4, 4], ['R2', 'regard', 0, 2], ['R3', 'regard', 0, -2]], l: [['tWC', 'tr', 'EU', '', ['wc', 'R1']], ['tDE', 'tr', 'EP', '', ['d1', 'R3']], ['P1F', 'tr', '', '', ['R1', 'Rf']], ['PF2', 'tr', 'EU', '', ['Rf', 'R2']], ['bp1', 'tr', '', '', ['R1', 'Rb']], ['bp2', 'tr', '', '', ['Rb', 'R2']], ['P23', 'tr', '', '', ['R2', 'R3']], ['ent', 'tr', '', '', [[-6, 6], 'R1']], ['rue', 'tr', '', '', ['R3', [0, -8]], 1], ['voi', 'tr', 'EU', '', [[6, -2], 'R3']], ['s2', 'tr', '', '', ['R1', [-6, 2]]]]}),
  'k8 WC[-] > R1 ; R1-Ra[EU]-R2, R1-Rb[EP]-R2 ; Ra > seconde sortie[EU] orientée ; R2 > rue libre': doc({o: [['wc', 'wc', 0, 10], ['R1', 'regard', 0, 6], ['Ra', 'regard', -3, 3], ['Rb', 'regard', 3, 3], ['R2', 'regard', 0, 0]], l: [['tWC', 'tr', '', '', ['wc', 'R1']], ['a1', 'tr', 'EU', '', ['R1', 'Ra']], ['a2', 'tr', '', '', ['Ra', 'R2']], ['s2', 'tr', 'EU', '', ['Ra', [-7, 3]], 1], ['b1', 'tr', 'EP', '', ['R1', 'Rb']], ['b2', 'tr', '', '', ['Rb', 'R2']], ['rue', 'tr', '', '', ['R2', [0, -4]]]]}),
  'k9 idem, descente[-]': doc({o: [['d1', 'descente', 0, 10], ['R1', 'regard', 0, 6], ['Ra', 'regard', -3, 3], ['Rb', 'regard', 3, 3], ['R2', 'regard', 0, 0]], l: [['tDE', 'tr', '', '', ['d1', 'R1']], ['a1', 'tr', 'EU', '', ['R1', 'Ra']], ['a2', 'tr', '', '', ['Ra', 'R2']], ['s2', 'tr', 'EU', '', ['Ra', [-7, 3]], 1], ['b1', 'tr', 'EP', '', ['R1', 'Rb']], ['b2', 'tr', '', '', ['Rb', 'R2']], ['rue', 'tr', '', '', ['R2', [0, -4]]]]}),
  'k10 évier[-] > R1 ; R1-Ra[EU]-R2, R1-Rb[EU]-R2 ; Ra > branche[EP] libre ; R2 > rue libre': doc({o: [['ev', 'evier', 0, 10], ['R1', 'regard', 0, 6], ['Ra', 'regard', -3, 4], ['Rb', 'regard', 3, 4], ['R2', 'regard', 0, 2]], l: [['tEV', 'tr', '', '', ['ev', 'R1']], ['a1', 'tr', 'EU', '', ['R1', 'Ra']], ['a2', 'tr', '', '', ['Ra', 'R2']], ['b1', 'tr', 'EU', '', ['R1', 'Rb']], ['b2', 'tr', '', '', ['Rb', 'R2']], ['sa', 'tr', 'EP', '', ['Ra', [-8, 4]]], ['rue', 'tr', '', '', ['R2', [0, -4]]]]}),
  'k11 descente[-] > R1 ; R1-Ra[EP]-R2, R1-Rb[EP]-R2 ; Ra > branche[EU] libre ; R2 > rue libre': doc({o: [['d1', 'descente', 0, 10], ['R1', 'regard', 0, 6], ['Ra', 'regard', -3, 4], ['Rb', 'regard', 3, 4], ['R2', 'regard', 0, 2]], l: [['tDE', 'tr', '', '', ['d1', 'R1']], ['a1', 'tr', 'EP', '', ['R1', 'Ra']], ['a2', 'tr', '', '', ['Ra', 'R2']], ['b1', 'tr', 'EP', '', ['R1', 'Rb']], ['b2', 'tr', '', '', ['Rb', 'R2']], ['sa', 'tr', 'EU', '', ['Ra', [-8, 4]]], ['rue', 'tr', '', '', ['R2', [0, -4]]]]}),
  'k12 idem k10, branche[EP] et rue orientées vers leur extrémité': doc({o: [['ev', 'evier', 0, 10], ['R1', 'regard', 0, 6], ['Ra', 'regard', -3, 4], ['Rb', 'regard', 3, 4], ['R2', 'regard', 0, 2]], l: [['tEV', 'tr', '', '', ['ev', 'R1']], ['a1', 'tr', 'EU', '', ['R1', 'Ra']], ['a2', 'tr', '', '', ['Ra', 'R2']], ['b1', 'tr', 'EU', '', ['R1', 'Rb']], ['b2', 'tr', '', '', ['Rb', 'R2']], ['sa', 'tr', 'EP', '', ['Ra', [-8, 4]], 1], ['rue', 'tr', '', '', ['R2', [0, -4]], 1]]}),
  'k13 témoin de k10 sans le tuyau Ra-R2 (pas de boucle)': doc({o: [['ev', 'evier', 0, 10], ['R1', 'regard', 0, 6], ['Ra', 'regard', -3, 4], ['Rb', 'regard', 3, 4], ['R2', 'regard', 0, 2]], l: [['tEV', 'tr', '', '', ['ev', 'R1']], ['a1', 'tr', 'EU', '', ['R1', 'Ra']], ['b1', 'tr', 'EU', '', ['R1', 'Rb']], ['b2', 'tr', '', '', ['Rb', 'R2']], ['sa', 'tr', 'EP', '', ['Ra', [-8, 4]]], ['rue', 'tr', '', '', ['R2', [0, -4]]]]}),
};

/* Attendu ; 3e élément facultatif : conclusion proposée. 1er : état de chaque source ; 2e : messages « manque » d'exutoire attendus,
   c:<réseaux> = tronçons réunis vers la même extrémité libre, a:<réseaux> = extrémités libres de réseaux différents (+x : prolonger le
   tracé jusqu'à l'exutoire), g = message habituel (exutoire non dessiné). */
const A = {
  'c1': ['wc=sansexu d1=sansexu', 'c:EU et EP'], 'c2': ['wc=ok:EU(p) d1=ok:EU(p)', ''], 'c3': ['wc=ok:EP(p) d1=ok:EP(p)', ''],
  'c4': ['wc=ok:UN(p) d1=ok:UN(p)', ''], 'c5': ['wc=ok:EU(p) la=sansexu', 'g'], 'c6': ['wc=ok:EU(p) d1=sansexu', 'g'],
  'c7': ['wc=ok:EU(p) w2=ok:EU(p)', ''], 'c8': ['wc=sansexu d1=sansexu', 'c:EU et unitaire'], 'c9': ['wc=ok:EU(p) d1=ok:EP(p)', ''],
  'c10': ['wc=sansexu d1=sansexu', 'c:EU et EP'], 'c11': ['wc=ok:EP(p)', '', 'non_conformes'], 'c12': ['wc=sansexu d1=sansexu', 'c:EU et EP'],
  'c13': ['wc=ok:EU d1=ok:EU', ''], 'c14': ['wc=sansexu d1=sansexu la=sansexu', 'c:EU et EP+g'],
  'h1': ['wc=ok:EP(p) ev=ok:EP(p)', '', 'non_conformes'], 'h2': ['wc=ok:EP(p) ev=ok:EP(p)', '', 'non_conformes'],
  'h3': ['si=ok:EU(p) d1=ok:EU(p)', '', 'non_conformes'], 'h4': ['wc=ok:EP(p) ev=ok:EP(p)', '', 'non_conformes'], 'n1': ['wc=ok:EP(p)', ''],
  'n2': ['wc=ok:EP(p)', ''], 'u4': ['wc=sansexu', 'a:EU et EP', 'incomplet'], 'k1': ['wc=sansexu', 'c:EU et EP', 'incomplet'],
  'k2': ['wc=sansexu', 'a:EU et unitaire', 'incomplet'], 'k3': ['wc=multiple', '', 'incomplet'], 'k4': ['wc=ok:EU', '', 'conformes'],
  'k5': ['wc=ok:EU', '', 'conformes'], 'k6': ['wc=ok:EU(p) d1=sansexu', 'g', 'incomplet'],
  'k7': ['wc=ok:EU(p) d1=sansexu', 'c:EU et EP', 'incomplet'], 'k8': ['wc=sansexu', 'a:EU et EP', 'incomplet'],
  'k9': ['d1=sansexu', 'a:EU et EP', 'incomplet'], 'k10': ['ev=sansexu', 'a:EU et EP', 'incomplet'], 'k11': ['d1=sansexu', 'a:EU et EP', 'incomplet'],
  'k12': ['ev=sansexu', 'a:EU et EP+x', 'incomplet'], 'k13': ['ev=sansexu', 'a:EU et EP', 'incomplet'],
};
/* Compléments attendus dans le résultat détaillé. */
const PLUS = {k3: /wc=multiple:EU,UN /, k4: /sansboite:C:EU@j2:/, k5: /sansboite:C:EU@j1:/};

function detail(d, mode){
  const an = V.analyser(copie(d), mode), L = V.anomaliesDoc(copie(d), an), c = V.conclusion(L, an);
  return Object.keys(an.resObj).sort().map(id => { const r = an.resObj[id]; return id + '=' + r.etat + ':' + (r.nets || []).join(',') + (r.presume ? '(p)' : '') + (r.fosse ? ' fosse=' + r.fosse : '') + (r.boite ? ' boite' : '') + (r.conflit ? ' c=' + r.conflit.join(',') : '') + (r.ambigu ? ' a=' + r.ambigu.join(',') + (r.ambiguArrivee ? '+' : '') : ''); }).join(' ')
    + ' | ' + L.map(a => a.cle + '@' + a.objId + ':' + a.st).sort().join(',') + ' | ' + an.controles.filter(x => /exutoire/.test(x.txt)).map(x => x.txt).sort().join(' ; ') + ' | ' + c;
}

let ordOk = 0, ordN = 0;
Object.keys(cas).forEach(n => {
  const mode = 'edl', k = n.split(' ')[0], d = copie(cas[n]), an = V.analyser(d, mode), L = V.anomaliesDoc(d, an), c = V.conclusion(L, an);
  const et = Object.keys(an.resObj).map(id => id + '=' + an.resObj[id].etat + (an.resObj[id].res ? ':' + an.resObj[id].res + (an.resObj[id].presume ? '(p)' : '') : '')).join(' ');
  const mq = an.controles.filter(x => x.niveau === 'manque' && /exutoire/.test(x.txt)).map(x => x.txt);
  const mc = mq.filter(t => /réunis vers la même extrémité libre \(indiquer le réseau du tronçon commun, ou le sens du tracé d'une arrivée\)$/.test(t)), mg = mq.filter(t => /exutoire non dessiné \(prolonger le tracé ou indiquer le réseau du tronçon\)$/.test(t)),
    ma = mq.filter(t => /exutoire non dessiné, extrémités libres de réseaux .+ \(prolonger le tracé, ou indiquer le sens du tracé d'une arrivée\)$/.test(t)),
    mx = mq.filter(t => /exutoire non dessiné, extrémités libres de réseaux .+ \(prolonger le tracé jusqu'à l'exutoire\)$/.test(t));
  const e = A[k], m = e[1].split('+').filter(Boolean), mamb = m.indexOf('x') >= 0 ? mx : ma;
  const okM = (m.indexOf('g') >= 0) === (mg.length > 0) && (m.some(x => /^c:/.test(x)) ? mc.length > 0 && mc.every(t => t.indexOf('tronçons ' + m.filter(x => /^c:/.test(x))[0].slice(2) + ' réunis') >= 0) : mc.length === 0)
    && (m.some(x => /^a:/.test(x)) ? mamb.length > 0 && mamb.length === mq.filter(t => /extrémités libres/.test(t)).length && mamb.every(t => t.indexOf('réseaux ' + m.filter(x => /^a:/.test(x))[0].slice(2) + ' (') >= 0) : ma.length === 0 && mx.length === 0);
  const det = detail(d, mode), plus = !PLUS[k] || PLUS[k].test(det);
  R.ok(et === e[0] && okM && (e[2] == null || c === e[2]) && plus, k + ' : ' + et + ' | ' + JSON.stringify(c) + ' | manques ' + JSON.stringify(mq) + (plus ? '' : ' | détail ' + det));
  const autres = [1, 2, 3].map(j => detail(reordonne(cas[n], j), mode)).filter(x => x !== det); ordN++;
  if (R.ok(!autres.length, k + ' même résultat dans quatre ordres du dessin')) ordOk++;
  else R.info(det + '\n      autre ordre : ' + autres[0]);
});
console.log('ordre du dessin : ' + ordOk + '/' + ordN + ' identiques');
R.fin();
