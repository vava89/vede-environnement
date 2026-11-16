// Escaliers (souhait 12, première partie : le type et son rendu, sans outil ; décision D7 de .claude/conception-outils-dessin.md) et
// objet ou tracé d'un type inconnu (défaut D11), sans navigateur ; dessin de l'écran sur un canevas factice, plan PDF par la bibliothèque
// PDF de l'application ; croquis fictifs (12 rue Fictive, Ville-Exemple) et croquis de démonstration. m106 ; valeurs d'un escalier neuf : m107.
// g1 à g12 : VCroquis.geo.escalier(D, F, larg, n, cote, monte), escalier de 3 × 1 m à 4 marches : contour (0,0) (3,0) (3,1) (0,1) à
//   gauche, y = −1 à droite ; marches en x = 0,75 ; 1,5 ; 2,25 d'un bord à l'autre ; flèche de (0 ; 0,5) à (3 ; 0,5) si l'escalier monte
//   vers la fin, inversée sinon, avec sa pointe ; textes « 1,00 » et « 4 » ; escalier vers le nord ; une marche ; valeurs invalides : null.
// m1 à m3 : valeurs par défaut d'un escalier ; aucune étiquette (sauf p.etiq) ; gris du complément (resLigne 'LIM').
// d1 à d9 (m107) : VCroquis.geo.escalierDefauts(D, F, lignes, aideDepart, aideFin), valeurs d'un escalier tracé avec l'outil : marches
//   arrondi(L / 0,28) de 1 à 60 en texte (3 m → « 11 », 0,10 m → « 1 », 30 m → « 60 ») ; largeur « 1,00 », statut existant ; côté dont le
//   contour n'entre pas dans le bâti fictif (à gauche, puis à droite ; deux côtés dehors ou dedans : « g ») ; seules les lignes de bâti
//   fermées comptent (lignesRef comprise) ; montée vers le bout posé au coin ou sur une façade (départ seul : « depart », sinon « fin ») ;
//   entrées invalides : null ; fonction pure.
// d10 à d16 (m108) : sixième argument cotes = {O, w, facade} (départ posé par cotes ; w : direction de la convention 11.1) : la largeur part
//   à l'opposé du coin d'origine, le long d'un côté (façades sud et ouest, depuis l'un et l'autre coin, départ sur la façade ou devant, fin
//   en biais) puis dans son prolongement ; escalier presque parallèle à w (|nc·w| < 0,1) : règle de m107 (témoin : |nc·w| = 0,12) ; côté
//   opposé qui entrerait dans le bâti : règle de m107 ; montée vers le départ s'il est posé le long d'une façade (facade vrai), sauf fin au
//   coin ou sur une façade ; l'aide du départ est alors ignorée ; sans l'argument ou s'il est invalide : même résultat qu'en m107 ;
//   fonction pure.
// a1, a2 : analyse identique avec et sans escalier, objet ou tracé d'un type inconnu (croquis de démonstration).
// e1 à e5 : écran : contour, marches et flèche en gris ; marches omises sous 4 px, contour et flèche gardés ; ordre des tracés (escalier
//   et complément d'abord, jamais NaN) ; emprise du plan avec les quatre coins ; étiquette voisine écartée du bord de l'escalier.
// p1 à p8 : PDF : « Escalier » dans la légende des deux plans, absent sans escalier ; seul texte ajouté ; sur le plan, contour fermé, flèche
//   et pointe toujours, marches omises sous 1 mm environ ; ordre des tracés ; échantillon de la légende (rectangle, 3 marches, flèche, pointe).
// x1 à x8 : DXF : calque VEDE-ESCALIERS (gris 8) déclaré seulement s'il sert ; contour en polyligne fermée ; n − 1 marches et la flèche
//   en lignes ; toutes les marches à 40 marches ; étendue avec le contour ; escalier invalide : rien.
// i1 à i9 : objet et tracé d'un type inconnu (croquis d'une version plus récente) : dessin, PDF et DXF sans exception, symbole et trait
//   neutres, sans légende ni étiquette automatique, gardés tels quels à l'export.
// Échouent sur 689e83b : g, m1, m3, e1 à e5, p1, p2, p4 à p8, x1, x3 à x7, i1 à i3, i5 à i7 ; témoins : m2, a1, a2,
// p3, x2, x8, i4, i8, i9.
// Échoue sur 6e365ec : d (VCroquis.geo.escalierDefauts absente).
// Échouent sur b08e6cd : d10, d11, d12, d14 et d16 (le sixième argument est ignoré) ; témoins : d13 et d15.
// usage : node tests/vm/escalier.js [-v] [--app=<dossier>]
'use strict';
const {charger, rapport, rendus} = require('./charger.js');
const ch = charger({pdf: true}), {V} = ch, R = rapport('escalier'), {dessiner, pdf, dxf} = rendus(ch);
const copie = x => JSON.parse(JSON.stringify(x));
/* appel protégé : une exception devient le texte « exception : … » */
const sur = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };
const EPS = 1e-6;
const proche = (p, q) => !!p && Math.abs(p.x - q[0]) < EPS && Math.abs(p.y - q[1]) < EPS;
const txtPt = p => p ? '(' + +p.x.toFixed(4) + ' ; ' + +p.y.toFixed(4) + ')' : String(p);
const txtSeg = s => s ? txtPt(s[0]) + '-' + txtPt(s[1]) : String(s);
/* segment [a, b] égal à [A, B] dans un sens ou dans l'autre */
const memeSeg = (a, b, A, B) => (proche(a, A) && proche(b, B)) || (proche(a, B) && proche(b, A));

/* Croquis fictif : WC, boîte EU, regard public sur le collecteur EU ; échelle fixe (le texte de l'échelle ne change pas) */
function nouveau(){ return V.nouveauDoc({numero: 'F-001', adresse: '12 rue Fictive', commune: 'Ville-Exemple'}); }
function pt(d, id, t, x, y, p){ const e = {id, k: 'pt', t, x, y, p: Object.assign(V.defautsPt(t), {meth: ['eau']}, p || {}), lab: null}; d.el.push(e); return e; }
function ln(d, id, t, res, v){
  const pos = {}; d.el.forEach(e => { if (e.k === 'pt') pos[e.id] = e; });
  const p = V.defautsLn(t, {res: res || ''}); p.res = t === 'col' ? (res || 'EU') : (res || '');
  const e = {id, k: 'ln', t, v: v.map(q => typeof q === 'string' ? {x: pos[q].x, y: pos[q].y, a: q} : {x: q[0], y: q[1], a: null}), p, lab: null};
  d.el.push(e); return e;
}
/* escalier selon le modèle de la décision D7 (pas par defautsLn, absente des versions d'avant) */
function esc(d, id, D, F, p){
  const e = {id, k: 'ln', t: 'esc', v: [{x: D[0], y: D[1], a: null}, {x: F[0], y: F[1], a: null}],
    p: Object.assign({larg: '1,00', n: '4', cote: 'g', monte: 'fin', st: 'existant'}, p || {}), lab: null};
  d.el.push(e); return e;
}
function maison(){
  const d = nouveau(); d.echelle = 200;
  pt(d, 'W', 'wc', 0, 6); pt(d, 'B1', 'boite', 0, 2, {res: 'EU', dim: '40×40', tampon: 'fonte'}); pt(d, 'Rp', 'regard_pub', 0, 0, {res: 'EU'});
  ln(d, 'tW', 'tr', 'EU', ['W', 'B1']); ln(d, 'tB', 'tr', '', ['B1', 'Rp']); ln(d, 'C', 'col', 'EU', [[-10, 0], 'Rp', [10, 0]]);
  return d;
}
/* escalier de la maison : départ (4 ; 3), fin (7 ; 3), 1 m à gauche (vers le nord), 4 marches, monte vers la fin */
const CONTOUR = [[4, 3], [7, 3], [7, 4], [4, 4]], MARCHES = [[[4.75, 3], [4.75, 4]], [[5.5, 3], [5.5, 4]], [[6.25, 3], [6.25, 4]]], FLECHE = [[4, 3.5], [7, 3.5]];
function avecEscalier(p){ const d = maison(); esc(d, 'E1', [4, 3], [7, 3], p); return d; }

/* g : VCroquis.geo.escalier */
function geometrie(){
  const G = V.geo && V.geo.escalier;
  if (typeof G !== 'function'){ R.ok(false, 'g : VCroquis.geo.escalier est absente'); return; }
  const D = {x: 0, y: 0}, F = {x: 3, y: 0}, D0 = copie(D), F0 = copie(F);
  const g = sur(() => G(D, F, '1,00', '4', 'g', 'fin'));
  if (!g || typeof g !== 'object'){ R.ok(false, 'g1 escalier de 3 × 1 m : ' + String(g)); return; }
  const C = g.contour || [];
  R.ok(C.length === 4 && [[0, 0], [3, 0], [3, 1], [0, 1]].every((q, i) => proche(C[i], q)), 'g1 gauche : contour (0,0) (3,0) (3,1) (0,1) (obtenu ' + C.map(txtPt).join(' ') + ')');
  const M = g.marches || [];
  R.ok(M.length === 3 && [0.75, 1.5, 2.25].every((x, i) => memeSeg(M[i][0], M[i][1], [x, 0], [x, 1])), 'g2 4 marches : trois traits en x = 0,75 ; 1,5 ; 2,25, d\'un bord à l\'autre (obtenu '
    + M.map(txtSeg).join(' ') + ')');
  const Fl = g.fleche || [];
  R.ok(proche(Fl[0], [0, 0.5]) && proche(Fl[1], [3, 0.5]), 'g3 monte vers la fin : flèche de (0 ; 0,5) à (3 ; 0,5) (obtenu ' + txtSeg(Fl) + ')');
  /* pointe : deux traits menés de la tête de la flèche, en arrière d'elle, de part et d'autre de la ligne du milieu, dans le contour */
  const Pn = g.pointe || [], dedans = q => q && q.x > 0 && q.x < 3 && q.y > 0 && q.y < 1;
  R.ok(Pn.length === 2 && Pn.every(q => dedans(q) && q.x < 3) && Math.abs(Pn[0].x - Pn[1].x) < EPS && Math.abs(Pn[0].y + Pn[1].y - 1) < EPS && Math.abs(Pn[0].y - Pn[1].y) > 0.05,
    'g4 pointe de la flèche : deux traits menés de la tête, en arrière, symétriques par rapport à la ligne du milieu, dans le contour (obtenu ' + Pn.map(txtPt).join(' ') + ')');
  const gd = sur(() => G(D, F, '1,00', '4', 'd', 'fin'));
  R.ok(!!gd && gd.contour && [[0, 0], [3, 0], [3, -1], [0, -1]].every((q, i) => proche(gd.contour[i], q)) && gd.marches.length === 3
    && [0.75, 1.5, 2.25].every((x, i) => memeSeg(gd.marches[i][0], gd.marches[i][1], [x, 0], [x, -1])) && proche(gd.fleche[0], [0, -0.5]) && proche(gd.fleche[1], [3, -0.5]),
    'g5 droite : contour (0,0) (3,0) (3,−1) (0,−1), marches et flèche du même côté (obtenu ' + (gd && gd.contour ? gd.contour.map(txtPt).join(' ') + ' ; flèche ' + txtSeg(gd.fleche) : String(gd)) + ')');
  const gb = sur(() => G(D, F, '1,00', '4', 'g', 'depart'));
  R.ok(!!gb && gb.fleche && proche(gb.fleche[0], [3, 0.5]) && proche(gb.fleche[1], [0, 0.5]) && gb.pointe.every(q => q.x > 0),
    'g6 monte vers le départ : flèche inversée, de (3 ; 0,5) à (0 ; 0,5), pointe vers le départ (obtenu ' + (gb && gb.fleche ? txtSeg(gb.fleche) + ' ; pointe ' + gb.pointe.map(txtPt).join(' ') : String(gb)) + ')');
  const gn = sur(() => G(D, F, 1, 4, 'g', 'fin'));
  R.ok(JSON.stringify(gn) === JSON.stringify(g), 'g7 largeur et marches en nombres (1 ; 4) : même résultat qu\'en textes (« 1,00 » ; « 4 »)');
  const gN = sur(() => G({x: 2, y: 1}, {x: 2, y: 4}, '1,00', '3', 'g', 'fin')), gNd = sur(() => G({x: 2, y: 1}, {x: 2, y: 4}, '1,00', '3', 'd', 'fin'));
  R.ok(!!gN && !!gNd && [[2, 1], [2, 4], [1, 4], [1, 1]].every((q, i) => proche(gN.contour[i], q)) && [[2, 1], [2, 4], [3, 4], [3, 1]].every((q, i) => proche(gNd.contour[i], q))
    && gN.marches.length === 2 && memeSeg(gN.marches[0][0], gN.marches[0][1], [2, 2], [1, 2]),
    'g8 vers le nord, vu du départ : gauche à l\'ouest (x = 1), droite à l\'est (x = 3) ; 3 marches : traits en y = 2 et 3 (obtenu '
    + (gN && gN.contour ? gN.contour.map(txtPt).join(' ') + ' | ' + gNd.contour.map(txtPt).join(' ') : String(gN)) + ')');
  const g1 = sur(() => G(D, F, '1,00', '1', 'g', 'fin'));
  R.ok(!!g1 && g1.contour && g1.contour.length === 4 && g1.marches.length === 0 && proche(g1.fleche[1], [3, 0.5]), 'g9 une seule marche : aucun trait de marche, contour et flèche gardés');
  const mauvais = [
    ['départ et fin confondus', [D, {x: 0, y: 0}, '1,00', '4', 'g', 'fin']], ['largeur nulle', [D, F, '0', '4', 'g', 'fin']], ['largeur négative', [D, F, '-1', '4', 'g', 'fin']],
    ['largeur illisible', [D, F, 'large', '4', 'g', 'fin']], ['largeur vide', [D, F, '', '4', 'g', 'fin']], ['aucune marche', [D, F, '1,00', '0', 'g', 'fin']],
    ['marches non entières', [D, F, '1,00', '2,5', 'g', 'fin']], ['marches négatives', [D, F, '1,00', '-3', 'g', 'fin']], ['marches illisibles', [D, F, '1,00', 'x', 'g', 'fin']],
    ['plus de 100 marches', [D, F, '1,00', '101', 'g', 'fin']], ['côté inconnu', [D, F, '1,00', '4', 'haut', 'fin']], ['côté absent', [D, F, '1,00', '4', undefined, 'fin']],
    ['sens inconnu', [D, F, '1,00', '4', 'g', 'haut']], ['sens absent', [D, F, '1,00', '4', 'g']], ['départ invalide', [{x: NaN, y: 0}, F, '1,00', '4', 'g', 'fin']],
    ['fin absente', [D, null, '1,00', '4', 'g', 'fin']], ['largeur infinie', [D, F, Infinity, '4', 'g', 'fin']]];
  const ko = mauvais.filter(([, a]) => sur(() => G.apply(null, a)) !== null).map(([n, a]) => n + ' → ' + JSON.stringify(sur(() => G.apply(null, a))));
  R.ok(!ko.length, 'g10 valeurs invalides (' + mauvais.length + ' cas : départ et fin confondus, largeur nulle ou illisible, marches non entières ou hors de 1 à 100, côté ou sens inconnu, point invalide) : null, sans exception'
    + (ko.length ? ' (obtenu : ' + ko.join(' ; ') + ')' : ''));
  R.ok(JSON.stringify(D) === JSON.stringify(D0) && JSON.stringify(F) === JSON.stringify(F0) && C[0] !== D && C[1] !== F, 'g11 fonction pure : départ et fin inchangés, points rendus neufs');
  const gr = sur(() => G({x: 1, y: 1}, {x: 4, y: 5}, '0,90', '5', 'd', 'fin'));
  const ok12 = !!gr && gr.contour && Math.abs(Math.hypot(gr.contour[3].x - 1, gr.contour[3].y - 1) - 0.9) < EPS && Math.abs((gr.contour[3].x - 1) * 3 + (gr.contour[3].y - 1) * 4) < EPS
    && gr.marches.length === 4 && gr.marches.every((s, k) => proche(s[0], [1 + 3 * (k + 1) / 5, 1 + 4 * (k + 1) / 5]) && Math.abs(Math.hypot(s[1].x - s[0].x, s[1].y - s[0].y) - 0.9) < EPS);
  R.ok(ok12, 'g12 escalier en biais (5 m, 0,90 m, 5 marches) : largeur perpendiculaire à la ligne départ-fin, marches tous les 1/5 de DF, d\'un bord à l\'autre');
}

/* m : modèle */
function modele(){
  const att = {larg: '1,00', n: '4', cote: 'g', monte: 'fin', st: 'existant'}, vu = sur(() => V.defautsLn('esc'));
  R.ok(JSON.stringify(vu) === JSON.stringify(att), 'm1 defautsLn(\'esc\') : ' + JSON.stringify(att) + ' (obtenu ' + JSON.stringify(vu) + ')');
  const d = avecEscalier(), e = d.el.find(x => x.id === 'E1');
  const t1 = sur(() => V.texteEtiquette(e, V.analyser(copie(d), 'edl'))), t2 = sur(() => V.texteEtiquette(e, V.analyser(copie(d), 'avp')));
  const e3 = Object.assign(copie(e), {p: Object.assign(copie(e.p), {etiq: 'Escalier extérieur'})}), t3 = sur(() => V.texteEtiquette(e3, V.analyser(copie(d), 'edl')));
  R.ok(t1 === '' && t2 === '' && t3 === 'Escalier extérieur', 'm2 aucune étiquette automatique (état des lieux et avant-projet), sauf une étiquette saisie (obtenu '
    + [t1, t2, t3].map(x => JSON.stringify(x)).join(', ') + ')');
  const r = sur(() => V.resLigne(e, V.analyser(copie(d), 'edl')));
  R.ok(r === 'LIM', 'm3 gris du complément du fond : resLigne rend \'LIM\' (obtenu ' + JSON.stringify(r) + ')');
}

/* d : valeurs d'un escalier neuf, VCroquis.geo.escalierDefauts(D, F, lignes, aideDepart, aideFin) (m107). Bâti fictif de 10 × 6 m,
   (0,0) (10,0) (10,6) (0,6), fermé par son premier point répété comme les lignes de lignesRef ; la façade sud est en y = 0. */
const PT = q => ({x: q[0], y: q[1]});
const BATI = [{nat: 'bati', P: [[0, 0], [10, 0], [10, 6], [0, 6], [0, 0]].map(PT), ferme: true, src: {L: 0, i: 0}, aire: 60}];
function defauts(){
  const f = V.geo && V.geo.escalierDefauts;
  if (typeof f !== 'function'){ R.ok(false, 'd : VCroquis.geo.escalierDefauts est absente'); return; }
  const val = (D, F, L, a, b) => sur(() => f(PT(D), PT(F), L, a, b));
  const champ = (r, k) => r && typeof r === 'object' ? r[k] : String(r);
  /* d1 : marches, devant la façade sud (y = −1) */
  const n3 = val([0, -1], [3, -1], BATI), n01 = val([0, -1], [0.1, -1], BATI), n30 = val([0, -1], [30, -1], BATI), n14 = val([2, -1], [2, -2.4], BATI);
  R.ok(champ(n3, 'n') === '11' && champ(n01, 'n') === '1' && champ(n30, 'n') === '60' && champ(n14, 'n') === '5',
    'd1 marches : arrondi(L / 0,28), de 1 à 60, en texte : 3,00 m → « 11 » ; 0,10 m → « 1 » ; 30 m → « 60 » ; 1,40 m → « 5 » (obtenu '
    + JSON.stringify([n3, n01, n30, n14].map(r => champ(r, 'n'))) + ')');
  /* d2 : largeur et statut ; mêmes champs que le modèle de m106 */
  const cles = Object.keys(V.defautsLn('esc')).sort().join(', ');
  R.ok(!!n3 && typeof n3 === 'object' && n3.larg === '1,00' && n3.st === 'existant' && Object.keys(n3).sort().join(', ') === cles,
    'd2 largeur « 1,00 », statut existant, mêmes champs que defautsLn(\'esc\') (' + cles + ') ; obtenu ' + JSON.stringify(n3));
  /* d3 : côté du contour qui n'entre pas dans le bâti ; même résultat avec le bâti décrit dans l'autre sens */
  const CW = [{nat: 'bati', P: BATI[0].P.slice().reverse(), ferme: true, src: {L: 0, i: 0}, aire: -60}];
  const cas3 = [[[5, 0], [2, 0], 'g', 'façade sud vers l\'ouest'], [[2, 0], [5, 0], 'd', 'façade sud vers l\'est'],
    [[0, 1], [0, 4], 'g', 'façade ouest vers le nord'], [[0, 4], [0, 1], 'd', 'façade ouest vers le sud']];
  const ko3 = [];
  cas3.forEach(c => [BATI, CW].forEach((L, i) => { const r = champ(val(c[0], c[1], L), 'cote'); if (r !== c[2]) ko3.push(c[3] + (i ? ' (bâti dans l\'autre sens)' : '') + ' : ' + r); }));
  R.ok(!ko3.length, 'd3 côté hors du bâti : le long de la façade sud vers l\'ouest, à gauche (« g ») ; vers l\'est, à droite (« d ») ; le long de la façade ouest vers le nord, '
    + 'à gauche ; vers le sud, à droite ; idem avec le bâti décrit dans l\'autre sens' + (ko3.length ? ' (écarts : ' + ko3.join(' ; ') + ')' : ''));
  /* d4 : deux côtés hors du bâti, ou deux côtés dedans : « g » */
  const h4 = champ(val([2, 0], [2, -3], BATI), 'cote'), c4 = champ(val([10, 6], [13, 9], BATI), 'cote'), i4 = champ(val([2, 2], [5, 2], BATI), 'cote');
  R.ok(h4 === 'g' && c4 === 'g' && i4 === 'g', 'd4 deux côtés hors du bâti (départ sur la façade, d\'équerre, ou au coin, en biais) ou deux côtés dedans : « g » (obtenu '
    + JSON.stringify([h4, c4, i4]) + ')');
  /* d5 : seules comptent les lignes de bâti fermées */
  const LIM = {nat: 'limite', P: [[-5, -5], [15, -5], [15, 10], [-5, 10], [-5, -5]].map(PT), ferme: true, src: {L: 1, i: 1}, aire: 300};
  const OUV = {nat: 'bati', P: [[0, 0], [10, 0], [10, 6], [0, 6]].map(PT), ferme: false, src: {L: 0, i: 2}, aire: 0};
  const CPL = {nat: 'complement', P: [[0, 0], [10, 0], [10, 6], [0, 6], [0, 0]].map(PT), ferme: false, src: {id: 'L1'}, aire: 0};
  const cas5 = [['limite seule', [LIM], 'g'], ['bâti et limite', [LIM].concat(BATI), 'd'], ['bâti ouvert', [OUV], 'g'], ['complément', [CPL], 'g'],
    ['aucune ligne', [], 'g'], ['lignes null', null, 'g'], ['lignes en texte', 'bati', 'g'], ['élément null et bâti', [null, {nat: 'bati'}].concat(BATI), 'd'],
    ['sommet invalide', [{nat: 'bati', P: [{x: NaN, y: 0}, {x: 10, y: 0}, {x: 10, y: 6}], ferme: true, aire: 1}], 'g']];
  const ko5 = cas5.filter(c => champ(val([2, 0], [5, 0], c[1]), 'cote') !== c[2]).map(c => c[0] + ' : ' + champ(val([2, 0], [5, 0], c[1]), 'cote'));
  R.ok(!ko5.length, 'd5 seules les lignes de bâti fermées comptent : limite, bâti ouvert et complément sans effet ; liste absente, vide ou invalide : « g », sans exception'
    + (ko5.length ? ' (écarts : ' + ko5.join(' ; ') + ')' : ''));
  /* d6 : montée vers le bout posé avec une aide coin ou façade */
  const cas6 = [['coin', null, 'depart'], ['facade', null, 'depart'], ['facade', 'parallele', 'depart'], ['coin', 'angle', 'depart'], [null, 'facade', 'fin'],
    [null, 'coin', 'fin'], ['coin', 'facade', 'fin'], ['facade', 'coin', 'fin'], [null, null, 'fin'], [undefined, undefined, 'fin'], ['parallele', 'angle', 'fin']];
  const ko6 = cas6.filter(c => champ(val([0, -1], [3, -1], BATI, c[0], c[1]), 'monte') !== c[2]).map(c => c[0] + '/' + c[1] + ' : ' + champ(val([0, -1], [3, -1], BATI, c[0], c[1]), 'monte'));
  R.ok(!ko6.length, 'd6 montée : départ seul posé au coin ou sur une façade → « depart » ; fin seule, les deux ou aucun (aides parallèle et angle : aucune) → « fin »'
    + (ko6.length ? ' (écarts : ' + ko6.join(' ; ') + ')' : ''));
  /* d7 : lignes de VCroquis.geo.lignesRef sur un fond fictif fait ici : bâti fermé par le drapeau du DXF (premier point non répété), limite autour */
  const fond = {id: 'fictif', L: [{c: 0, d: 0, n: 4, f: true}, {c: 1, d: 4, n: 4, f: true}], xy: [0, 0, 10, 0, 10, 6, 0, 6, -5, -5, 15, -5, 15, 10, -5, 10],
    calques: [{nom: 'BATI-FICTIF', vis: true, style: 'bati'}, {nom: 'PARCELLE-FICTIVE', vis: true, style: 'parcelle'}]};
  const lr = sur(() => V.geo.lignesRef(null, fond, {x: 0, y: 0})), lb = sur(() => V.geo.lignesRef(null, fond, {x: 0, y: 0}, ['bati']));
  const r7 = [lr, lb].map(L => champ(val([2, 0], [5, 0], L), 'cote').concat('/', champ(val([5, 0], [2, 0], L), 'cote')));
  R.ok(Array.isArray(lr) && lr.length === 2 && r7.join(' ') === 'd/g d/g', 'd7 lignes de lignesRef (bâti fermé par le drapeau du DXF, limite autour) : même côté qu\'avec '
    + 'le bâti donné à la main (obtenu ' + r7.join(' ; ') + ')');
  /* d8 : entrées invalides */
  const mauvais = [['départ et fin confondus', [1, -1], [1, -1]], ['longueur sous 1e-9 m', [1, -1], [1 + 1e-12, -1]]].map(c => [c[0], () => f(PT(c[1]), PT(c[2]), BATI)])
    .concat([['départ absent', () => f(null, {x: 1, y: 1}, BATI)], ['fin invalide', () => f({x: 0, y: 0}, {x: NaN, y: 1}, BATI)], ['sans argument', () => f()]]);
  const ko8 = mauvais.map(c => [c[0], sur(c[1])]).filter(c => c[1] !== null).map(c => c[0] + ' : ' + JSON.stringify(c[1]));
  R.ok(!ko8.length, 'd8 entrées invalides (' + mauvais.length + ' cas : départ et fin confondus, longueur nulle, point absent ou invalide) : null, sans exception'
    + (ko8.length ? ' (écarts : ' + ko8.join(' ; ') + ')' : ''));
  /* d9 : fonction pure, valeurs lisibles par VCroquis.geo.escalier : contour hors du bâti */
  const D = {x: 2, y: 0}, F = {x: 5, y: 0}, Lc = copie(BATI), avant = JSON.stringify([D, F, Lc]), r9 = sur(() => f(D, F, Lc, 'coin', null));
  const g9 = r9 && typeof r9 === 'object' ? sur(() => V.geo.escalier(D, F, r9.larg, r9.n, r9.cote, r9.monte)) : null;
  const m9 = g9 && g9.contour ? PT([g9.contour.reduce((s, q) => s + q.x, 0) / 4, g9.contour.reduce((s, q) => s + q.y, 0) / 4]) : null;
  R.ok(JSON.stringify([D, F, Lc]) === avant && !!m9 && m9.y < 0 && r9.monte === 'depart' && r9.n === '11',
    'd9 fonction pure (départ, fin et lignes inchangés) ; ses valeurs dessinent l\'escalier par VCroquis.geo.escalier, contour hors du bâti (centre '
    + txtPt(m9) + ', montée ' + champ(r9, 'monte') + ')');
}

/* d10 à d16 (m108) : départ posé par cotes, sixième argument cotes = {O, w, facade} de VCroquis.geo.escalierDefauts. O : coin d'origine ;
   w : direction de la convention 11.1 (le long : de O vers l'autre coin ; prolongement : de O vers le dehors du côté) ; facade : départ posé
   le long d'une façade, sans décalage. Même bâti fictif de 10 × 6 m : façade sud en y = 0, de (0 ; 0) à (10 ; 0) ; façade ouest en x = 0. */
function departCotes(){
  const f = V.geo && V.geo.escalierDefauts;
  if (typeof f !== 'function'){ R.ok(false, 'd10 : VCroquis.geo.escalierDefauts est absente'); return; }
  const champ = (r, k) => r && typeof r === 'object' ? r[k] : String(r);
  const dir = q => { const l = Math.hypot(q[0], q[1]); return {x: q[0] / l, y: q[1] / l}; };
  const cotes = (O, w, facade) => ({O: PT(O), w: dir(w), facade: !!facade});
  const val = (D, F, c, a, b) => sur(() => f(PT(D), PT(F), BATI, a, b, c));
  /* centre du contour dessiné par VCroquis.geo.escalier avec les valeurs rendues, projeté sur w depuis le départ : positif si la largeur
     part à l'opposé du coin d'origine */
  const avance = (D, F, r, w) => {
    const g = r && typeof r === 'object' ? sur(() => V.geo.escalier(PT(D), PT(F), r.larg, r.n, r.cote, r.monte)) : null;
    if (!g || !g.contour) return NaN;
    const m = PT([g.contour.reduce((s, q) => s + q.x, 0) / 4, g.contour.reduce((s, q) => s + q.y, 0) / 4]);
    return (m.x - D[0]) * w.x + (m.y - D[1]) * w.y;
  };
  /* cas : [nom, départ, fin, O, w, côté attendu] ; écarts : côté rendu et, si demandé, largeur qui ne part pas à l'opposé du coin */
  const ecarts = (cas, opp) => cas.map(c => {
    const k = cotes(c[3], c[4], false), r = val(c[1], c[2], k), a = avance(c[1], c[2], r, k.w);
    return champ(r, 'cote') === c[5] && (!opp || a > 0) ? null : c[0] + ' : ' + champ(r, 'cote') + (opp ? ', avance ' + (isFinite(a) ? a.toFixed(3) : a) : '');
  }).filter(x => x);
  /* d10 : le long d'un côté */
  const cas10 = [['façade sud depuis le coin ouest, départ sur la façade', [3, 0], [3, -2], [0, 0], [1, 0], 'g'],
    ['façade sud depuis le coin est, départ sur la façade', [7, 0], [7, -2], [10, 0], [-1, 0], 'd'],
    ['façade sud depuis le coin ouest, 1 m devant', [3, -1], [3, -3], [0, 0], [1, 0], 'g'],
    ['façade sud depuis le coin est, 1 m devant', [7, -1], [7, -3], [10, 0], [-1, 0], 'd'],
    ['façade ouest depuis le coin nord', [0, 4], [-2, 4], [0, 6], [0, -1], 'g'],
    ['façade ouest depuis le coin sud', [0, 2], [-2, 2], [0, 0], [0, 1], 'd'],
    ['façade sud depuis le coin ouest, fin en biais', [3, 0], [4, -2], [0, 0], [1, 0], 'g'],
    ['façade sud depuis le coin est, fin en biais', [7, 0], [6, -2], [10, 0], [-1, 0], 'd']];
  const ko10 = ecarts(cas10, true);
  R.ok(!ko10.length, 'd10 le long d\'un côté (' + cas10.length + ' cas : façades sud et ouest, depuis l\'un et l\'autre coin, départ sur la façade ou devant, fin d\'équerre '
    + 'ou en biais) : la largeur part à l\'opposé du coin d\'origine (nc·w > 0 ; centre du contour plus loin que le départ sur w)' + (ko10.length ? ' (écarts : ' + ko10.join(' ; ') + ')' : ''));
  /* d11 : dans le prolongement d'un côté, au-delà d'un coin */
  const cas11 = [['au-delà du coin ouest de la façade sud', [-2, -0.5], [-2, -2.5], [0, 0], [-1, 0], 'd'],
    ['au-delà du coin est de la façade sud', [12, -0.5], [12, -2.5], [10, 0], [1, 0], 'g'],
    ['au-delà du coin sud de la façade ouest, vers l\'est', [-0.5, -2], [1.5, -2], [0, 0], [0, -1], 'd'],
    ['au-delà du coin sud de la façade ouest, vers l\'ouest', [-0.5, -2], [-2.5, -2], [0, 0], [0, -1], 'g']];
  const ko11 = ecarts(cas11, true);
  R.ok(!ko11.length, 'd11 dans le prolongement (' + cas11.length + ' cas) : la largeur part à l\'opposé du coin d\'origine, vers le dehors du côté'
    + (ko11.length ? ' (écarts : ' + ko11.join(' ; ') + ')' : ''));
  /* d12 : escalier presque parallèle à w (|nc·w| < 0,1) : règle de m107 ; témoin au-dessus du seuil */
  const cas12 = [['nc·w = −0,08', [3, -1], [3, -4], [0, 0], [-0.08, -1], 'g'], ['nc·w = +0,08', [3, -1], [3, -4], [0, 0], [0.08, -1], 'g'],
    ['parallèle à w, dehors', [-2, 0], [-5, 0], [0, 0], [-1, 0], 'g'], ['parallèle à w, le long de la façade', [2, 0], [5, 0], [0, 0], [1, 0], 'd'],
    ['témoin : nc·w = −0,12', [3, -1], [3, -4], [0, 0], [-0.12, -1], 'd']];
  const ko12 = ecarts(cas12, false);
  R.ok(!ko12.length, 'd12 escalier presque parallèle à w (|nc·w| < 0,1) : règle de m107 (côté hors du bâti, sinon « g ») ; témoin : à −0,12, le côté opposé au coin (« d »)'
    + (ko12.length ? ' (écarts : ' + ko12.join(' ; ') + ')' : ''));
  /* d13 : le côté opposé au coin entrerait dans le bâti : règle de m107 */
  const cas13 = [['le long de la façade sud vers l\'est, w vers le nord', [2, 0], [5, 0], [0, 0], [0, 1], 'd'],
    ['le long de la façade sud vers l\'ouest, w vers le nord', [5, 0], [2, 0], [0, 0], [0, 1], 'g'],
    ['départ dans le bâti, les deux côtés dedans', [3, 2], [6, 2], [0, 0], [0, -1], 'g']];
  const ko13 = ecarts(cas13, false);
  R.ok(!ko13.length, 'd13 côté opposé au coin qui entrerait dans le bâti : règle de m107 (l\'autre côté s\'il est dehors, « g » si les deux entrent)'
    + (ko13.length ? ' (écarts : ' + ko13.join(' ; ') + ')' : ''));
  /* d14 : montée : le départ posé sur une façade (facade) compte comme un bout posé sur une façade ; l'aide du départ est ignorée */
  const W = [1, 0], cas14 = [[true, null, null, 'depart'], [true, undefined, 'parallele', 'depart'], [true, null, 'angle', 'depart'], [true, null, 'facade', 'fin'],
    [true, 'parallele', 'coin', 'fin'], [false, 'coin', null, 'fin'], [false, 'facade', null, 'fin'], [undefined, 'coin', null, 'fin']];
  const ko14 = [];
  cas14.forEach(c => {
    const k = c[0] === undefined ? {O: PT([0, 0]), w: dir(W)} : cotes([0, 0], W, c[0]), m = champ(val([3, 0], [3, -2], k, c[1], c[2]), 'monte');
    if (m !== c[3]) ko14.push('facade ' + c[0] + ', aides ' + c[1] + '/' + c[2] + ' : ' + m);
  });
  R.ok(!ko14.length, 'd14 montée : départ posé sur une façade (facade vrai) → « depart », sauf si la fin est au coin ou sur une façade ; facade faux ou absent → « fin », '
    + 'même avec une aide « coin » ou « facade » au départ (ignorée)' + (ko14.length ? ' (écarts : ' + ko14.join(' ; ') + ')' : ''));
  /* d15 : sans l'argument, ou s'il est invalide (w absent, nul ou non fini) : résultat de m107 */
  const base = [[[0, -1], [3, -1], 'coin', null], [[2, 0], [5, 0], null, null], [[5, 0], [2, 0], 'facade', 'coin'], [[2, 2], [5, 2], null, 'facade'],
    [[2, 0], [2, -3], 'facade', null], [[1, -1], [1, -1], null, null]];
  const invalides = [['undefined', undefined], ['null', null], ['texte', 'cotes'], ['nombre', 3], ['vrai', true], ['tableau', []], ['objet vide', {}],
    ['w absent', {O: {x: 0, y: 0}, facade: true}], ['w nul', {O: {x: 0, y: 0}, w: {x: 0, y: 0}, facade: true}], ['w non fini', {w: {x: NaN, y: 1}, facade: true}],
    ['w en texte', {w: 'est', facade: true}]];
  const ko15 = [];
  base.forEach(b => {
    const r5 = JSON.stringify(sur(() => f(PT(b[0]), PT(b[1]), BATI, b[2], b[3])));
    invalides.forEach(x => { const r6 = JSON.stringify(sur(() => f(PT(b[0]), PT(b[1]), BATI, b[2], b[3], x[1]))); if (r6 !== r5) ko15.push(x[0] + ' ' + JSON.stringify(b) + ' : ' + r6 + ' au lieu de ' + r5); });
  });
  R.ok(!ko15.length, 'd15 sans l\'argument ou s\'il est invalide (' + invalides.length + ' formes, ' + base.length + ' escaliers) : même résultat qu\'avec cinq arguments (m107), sans exception'
    + (ko15.length ? ' (écarts : ' + ko15.slice(0, 3).join(' ; ') + ')' : ''));
  /* d16 : fonction pure */
  const D = {x: 7, y: 0}, F = {x: 7, y: -2}, Lc = copie(BATI), K = {O: {x: 10, y: 0}, w: {x: -1, y: 0}, facade: true}, avant = JSON.stringify([D, F, Lc, K]);
  const r16 = sur(() => f(D, F, Lc, null, null, K)), cles = Object.keys(V.defautsLn('esc')).sort().join(', ');
  R.ok(JSON.stringify([D, F, Lc, K]) === avant && champ(r16, 'cote') === 'd' && champ(r16, 'monte') === 'depart' && champ(r16, 'n') === '7' && champ(r16, 'larg') === '1,00'
    && !!r16 && typeof r16 === 'object' && Object.keys(r16).sort().join(', ') === cles,
    'd16 fonction pure (départ, fin, lignes et cotes inchangés) ; mêmes champs qu\'en m107 (' + cles + ') ; obtenu ' + JSON.stringify(r16));
}

/* a : analyse */
const inconnus = [
  {id: 'U1', k: 'pt', t: 'cuve_future', x: 0, y: 0, p: {st: 'existant', obs: '', vol: '3000'}, lab: null},
  {id: 'U2', k: 'ln', t: 'drain_futur', v: [{x: 0, y: 0, a: null}, {x: 3, y: 0, a: null}], p: {st: 'existant', res: 'EU', diam: '100', long: '3'}, lab: null}];
function resume(d, mode){
  const dd = copie(d), an = V.analyser(dd, mode), liste = V.anomaliesDoc(dd, an);
  return JSON.stringify({an, liste, constat: V.constatDeduit(dd, an), concl: V.conclusion(dd, an)});
}
function analyse(){
  const demo = V.demoCroquis(), w = demo.el.find(e => e.k === 'pt' && e.t === 'wc');
  const avec = copie(demo); esc(avec, 'E1', [w.x + 2, w.y], [w.x + 5, w.y]);
  const ok1 = ['edl', 'avp'].every(m => sur(() => resume(demo, m)) === sur(() => resume(avec, m)));
  R.ok(ok1, 'a1 croquis de démonstration : analyse, anomalies, constat et conclusion identiques avec et sans escalier (état des lieux et avant-projet)');
  const avec2 = copie(demo); inconnus.forEach(u => { const c = copie(u); if (c.k === 'pt'){ c.x = w.x + 3; c.y = w.y + 1; } else c.v.forEach(v => { v.x += w.x; v.y += w.y - 2; }); avec2.el.push(c); });
  const ok2 = ['edl', 'avp'].every(m => sur(() => resume(demo, m)) === sur(() => resume(avec2, m)));
  R.ok(ok2, 'a2 témoin : analyse identique avec un objet et un tracé d\'un type inconnu');
}

/* gris du complément, à l'écran */
const GRIS = 'rgb(40,40,40)';
const aTrait = (T, A, B) => T.some(t => memeSeg(t.a, t.b, A, B));

/* e : écran (dessiner, de vm/charger.js : zones de toucher, traits ramenés en mètres du croquis) */
function ecran(){
  const d = avecEscalier();
  const r = sur(() => dessiner(d, 20, [5.5, 3.5]));
  if (typeof r === 'string'){ R.ok(false, 'e1 dessin : ' + r); return; }
  const g = r.traits.filter(t => t.coul === GRIS), bords = [0, 1, 2, 3].map(i => [CONTOUR[i], CONTOUR[(i + 1) % 4]]);
  const vus = {bords: bords.filter(b => aTrait(g, b[0], b[1])).length, marches: MARCHES.filter(b => aTrait(g, b[0], b[1])).length, fleche: aTrait(g, FLECHE[0], FLECHE[1])};
  R.ok(vus.bords === 4 && vus.marches === 3 && vus.fleche, 'e1 à 20 px par mètre (marches à 15 px) : contour, 3 marches et flèche, en gris du complément (obtenu ' + JSON.stringify(vus)
    + ' ; ' + g.length + ' traits gris)');
  const r2 = sur(() => dessiner(d, 4, [5.5, 3.5]));
  const g2 = typeof r2 === 'string' ? [] : r2.traits.filter(t => t.coul === GRIS);
  const vus2 = {bords: bords.filter(b => aTrait(g2, b[0], b[1])).length, marches: MARCHES.filter(b => aTrait(g2, b[0], b[1])).length, fleche: aTrait(g2, FLECHE[0], FLECHE[1])};
  R.ok(typeof r2 !== 'string' && vus2.bords === 4 && vus2.marches === 0 && vus2.fleche, 'e2 à 4 px par mètre (marches à 3 px) : marches omises, contour et flèche gardés (obtenu '
    + (typeof r2 === 'string' ? r2 : JSON.stringify(vus2)) + ')');
  /* ordre : tronçon, escalier, complément, tracé inconnu, collecteur dans le croquis ; dessinés : escalier, complément, inconnu, collecteur, tronçon */
  const d3 = nouveau();
  ln(d3, 'T', 'tr', 'EP', [[0, 5], [6, 5]]); esc(d3, 'E', [0, 8], [6, 8]); ln(d3, 'L', 'lim', '', [[0, 12], [6, 12]]);
  d3.el.push({id: 'U', k: 'ln', t: 'drain_futur', v: [{x: 0, y: 14, a: null}, {x: 6, y: 14, a: null}], p: {st: 'existant'}, lab: null}); ln(d3, 'C', 'col', 'EU', [[0, -3], [6, -3]]);
  const r3 = sur(() => dessiner(d3, 20, [3, 5])), ordre = typeof r3 === 'string' ? r3 : r3.zones.filter(z => z.type === 'ln').map(z => z.id).join(' ');
  R.ok(ordre === 'E L U C T', 'e3 ordre des tracés à l\'écran : escalier, complément et tracé inconnu d\'abord, puis collecteur, puis tronçon (obtenu ' + ordre + ')');
  /* emprise : les quatre coins du contour (escalier de 2 m de large, à droite, sous les autres éléments) */
  const d4 = nouveau(); pt(d4, 'W', 'wc', 0, 5); esc(d4, 'E', [10, 0], [13, 0], {larg: '2', cote: 'd'});
  const b = sur(() => V.emprisePlan(d4, V.indexDoc(d4), 'edl'));
  R.ok(Array.isArray(b) && [0, -2, 13, 5].every((v, i) => Math.abs(b[i] - v) < EPS), 'e4 emprise du plan : les quatre coins du contour comptent ([0, −2, 13, 5] ; obtenu ' + JSON.stringify(b) + ')');
  /* étiquette d'une boîte au bord d'un grand escalier : la place choisie sans escalier est barrée par le bord du contour (ligne départ-fin
     à 50 m de là) ; elle doit changer (les traits de l'escalier sont des obstacles, pas seulement sa ligne départ-fin) */
  const d5 = nouveau(); pt(d5, 'B', 'boite', 0, 0, {res: 'EU', dim: '40×40', tampon: 'fonte'});
  const lab0 = sur(() => V.placerEtiquette(d5, V.analyser(copie(d5), 'edl'), d5.el[0], 200, V.indexDoc(d5)));
  const ok0 = !!lab0 && typeof lab0 === 'object', d5b = copie(d5);
  if (ok0) esc(d5b, 'E', [-30, lab0.dy - 50], [30, lab0.dy - 50], {larg: '50', n: '1'});
  const lab1 = ok0 ? sur(() => V.placerEtiquette(d5b, V.analyser(copie(d5b), 'edl'), d5b.el[0], 200, V.indexDoc(d5b))) : null;
  const bouge = ok0 && !!lab1 && typeof lab1 === 'object' && Math.abs(lab1.dy - lab0.dy) > EPS;
  R.ok(bouge, 'e5 étiquette d\'une boîte au bord de l\'escalier : déplacée hors du bord du contour (sans escalier ' + JSON.stringify(lab0) + ' ; avec ' + JSON.stringify(lab1) + ')');
}

/* p : plan PDF (relevé par pdf, de vm/charger.js : textes, place des textes, traits et formes) */
/* Escalier dessiné sur le papier, sans rotation, qui monte vers la droite, parmi les formes F (traits gris du complément) : contour fermé
   (rectangle de dim = [largeur, hauteur] mm, ou de toute taille sans dim), flèche d'un bord à l'autre sur sa ligne du milieu, pointe à la tête
   de la flèche (deux ailes en arrière, symétriques), marches (traits d'un bord à l'autre, abscisses depuis le bord gauche, triées) ;
   n : nombre de formes grises. null si aucun contour ne convient. */
const GRIS_PDF = '40,40,40';
function escPapier(F, dim){
  const gr = F.filter(f => f.coul === GRIS_PDF), pres = (a, b) => Math.abs(a - b) < EPS;
  const boite = f => { const xs = f.pts.map(p => p.x), ys = f.pts.map(p => p.y); return [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]; };
  const ct = gr.find(f => {
    if (!f.ferme || f.pts.length !== 4) return false;
    const b = boite(f), w = b[1] - b[0], h = b[3] - b[2];
    return w > EPS && h > EPS && (!dim || (pres(w, dim[0]) && pres(h, dim[1])))
      && f.pts.every((p, i) => { const q = f.pts[(i + 1) % 4], dx = Math.abs(q.x - p.x), dy = Math.abs(q.y - p.y); return (pres(dx, w) && pres(dy, 0)) || (pres(dx, 0) && pres(dy, h)); });
  });
  if (!ct) return null;
  const [x0, x1, y0, y1] = boite(ct), ym = (y0 + y1) / 2;
  const fl = gr.some(f => f.pts.length === 2 && memeSeg(f.pts[0], f.pts[1], [x0, ym], [x1, ym]));
  const po = gr.some(f => f.pts.length === 3 && proche(f.pts[1], [x1, ym]) && f.pts[0].x < x1 - EPS && pres(f.pts[0].x, f.pts[2].x) && pres(f.pts[0].y + f.pts[2].y, 2 * ym)
    && !pres(f.pts[0].y, ym));
  const marches = gr.filter(f => f.pts.length === 2 && f.pts[0].x > x0 + EPS && f.pts[0].x < x1 - EPS && memeSeg(f.pts[0], f.pts[1], [f.pts[0].x, y0], [f.pts[0].x, y1]))
    .map(f => f.pts[0].x - x0).sort((a, b) => a - b);
  return {dim: [x1 - x0, y1 - y0], fl, po, marches, n: gr.length};
}
const txtEsc = e => e ? 'contour ' + e.dim.map(v => +v.toFixed(2)).join(' × ') + ' mm, flèche ' + e.fl + ', pointe ' + e.po + ', marches ' + JSON.stringify(e.marches.map(v => +v.toFixed(2)))
  : 'pas de contour';
/* échantillon de la légende : formes à gauche du texte t, sur sa ligne (le texte est écrit 1 mm sous le milieu de la ligne) */
function aGaucheDe(r, t){
  const lab = r.pos.find(q => q.t === t);
  return lab ? r.formes.filter(f => f.pts.every(p => p.x > lab.x - 12 && p.x < lab.x - 1 && Math.abs(p.y - (lab.y - 1)) < 1.6)) : [];
}
/* textes de a absents de b (multiensemble) */
function enPlus(a, b){ const r = b.slice(), out = []; a.forEach(t => { const i = r.indexOf(t); if (i >= 0) r.splice(i, 1); else out.push(t); }); return out; }
async function plans(){
  const d = avecEscalier(), d0 = maison();
  for (const [k, kE, mode, nom] of [['p1', 'p7', 'edl', 'l\'état des lieux'], ['p2', 'p8', 'avp', 'l\'avant-projet']]){
    const r = await pdf(d, {mode});
    R.ok(!r.err.length && r.txt.indexOf('Escalier') >= 0 && r.txt.indexOf('Réseau non déterminé') < 0, k + ' plan PDF de ' + nom + ' : « Escalier » dans la légende, et pas « Réseau non déterminé »'
      + (r.err.length ? ' ' + r.err.join(' | ') : ''));
    /* échantillon, sur la ligne « Escalier » : 6 traits gris (rectangle fermé, 3 marches à pas égal, flèche vers la droite et sa pointe) */
    const F = aGaucheDe(r, 'Escalier'), e = escPapier(F), m = e ? e.marches : [];
    R.ok(!!e && e.n === 6 && F.length === 6 && e.fl && e.po && m.length === 3 && m.every((v, i) => Math.abs(v - e.dim[0] * (i + 1) / 4) < EPS),
      kE + ' légende de ' + nom + ' : échantillon à gauche de « Escalier » : rectangle fermé, 3 marches à pas égal, flèche et pointe, 6 traits gris (obtenu '
      + txtEsc(e) + ' ; ' + F.length + ' traits sur la ligne)');
  }
  const s1 = await pdf(d0, {mode: 'edl'}), s2 = await pdf(d0, {mode: 'avp'});
  R.ok(!s1.err.length && !s2.err.length && s1.txt.indexOf('Escalier') < 0 && s2.txt.indexOf('Escalier') < 0, 'p3 témoin : sans escalier, pas de ligne « Escalier » dans la légende des deux plans');
  const a1 = await pdf(d, {mode: 'edl'}), plus = enPlus(a1.txt, s1.txt), moins = enPlus(s1.txt, a1.txt);
  R.ok(plus.join('|') === 'Escalier' && !moins.length, 'p4 escalier ajouté au croquis : le seul texte ajouté au plan est « Escalier » (en plus : ' + JSON.stringify(plus) + ' ; en moins : ' + JSON.stringify(moins) + ')');
  /* marches à 3,75 mm (4 marches sur 3 m au 1/200) : dessinées ; à 0,38 mm (40 marches) : omises. Contour fermé de 15 × 5 mm (3 × 1 m),
     flèche sur sa ligne du milieu et pointe à l'est (l'escalier monte vers la fin) : toujours, sur le plan de l'état des lieux comme sur
     celui de l'avant-projet. Échelle fixe, pas de rotation. */
  const loin = n => { const x = maison(); esc(x, 'E1', [12, 8], [15, 8], {n: String(n)}); return x; };
  const q4 = await pdf(loin(4), {mode: 'edl'}), q40 = await pdf(loin(40), {mode: 'edl'}), qA = await pdf(loin(4), {mode: 'avp'});
  const n0 = (await pdf(maison(), {mode: 'edl'})).traits.length, dif = q4.traits.length - q40.traits.length;
  const [e4, e40, eA] = [q4, q40, qA].map(q => escPapier(q.formes, [15, 5]));
  const m4 = e => !!e && e.marches.length === 3 && [3.75, 7.5, 11.25].every((v, i) => Math.abs(e.marches[i] - v) < EPS);
  R.ok(![q4, q40, qA].some(q => q.err.length) && dif === 3 && m4(e4) && m4(eA) && !!e40 && !e40.marches.length && [e4, e40, eA].every(e => !!e && e.fl && e.po),
    'p5 au 1/200 : 4 marches sur 3 m dessinées (à 3,75 ; 7,5 ; 11,25 mm du départ), 40 marches (0,38 mm) omises ; contour fermé de 15 × 5 mm, flèche et pointe toujours,'
    + ' sur les deux plans (état des lieux, 4 marches : ' + txtEsc(e4) + ' ; 40 marches : ' + txtEsc(e40) + ' ; avant-projet, 4 marches : ' + txtEsc(eA)
    + ' ; traits : ' + q4.traits.length + ' contre ' + q40.traits.length + ', sans escalier ' + n0 + ')');
  /* ordre des tracés sur le papier : tronçon EP (vert) en dernier, après le collecteur EU (rouge), lui-même après le gris (escalier, complément, inconnu) */
  const d6 = nouveau(); d6.echelle = 200;
  ln(d6, 'T', 'tr', 'EP', [[0, 5], [6, 5]]); esc(d6, 'E', [0, 8], [6, 8]); ln(d6, 'L', 'lim', '', [[0, 12], [6, 12]]);
  d6.el.push({id: 'U', k: 'ln', t: 'drain_futur', v: [{x: 0, y: 14, a: null}, {x: 6, y: 14, a: null}], p: {st: 'existant'}, lab: null}); ln(d6, 'C', 'col', 'EU', [[0, -3], [6, -3]]);
  const r6 = await pdf(d6, {mode: 'edl'}), seq = r6.traits.map(t => t.split('/')[0]), iV = seq.indexOf('0,160,80'), avant = seq.slice(0, Math.max(0, iV));
  const iR = avant.indexOf('224,0,0'), gris = avant.filter(c => c === '40,40,40').length;
  R.ok(!r6.err.length && iV > 0 && iR > 0 && avant.slice(0, iR).every(c => c === '40,40,40') && avant.slice(iR + 1).every(c => c !== '40,40,40') && gris >= 3,
    'p6 ordre des tracés sur le papier : gris (escalier, complément, inconnu), puis collecteur, puis tronçon (traits : ' + seq.slice(0, 12).join(' ') + ')' + (r6.err.length ? ' ' + r6.err.join(' | ') : ''));
}

/* x : DXF (lu par dxf, de vm/charger.js) */
function sortiesDxf(){
  const r = sur(() => dxf(avecEscalier()));
  if (typeof r === 'string'){ R.ok(false, 'x DXF : ' + r); return; }
  R.ok(r.calques['VEDE-ESCALIERS'] === 8, 'x1 calque VEDE-ESCALIERS déclaré dans la table des calques, gris 8 (obtenu ' + JSON.stringify(r.calques['VEDE-ESCALIERS']) + ')');
  const r0 = dxf(maison());
  R.ok(!('VEDE-ESCALIERS' in r0.calques) && r0.texte.indexOf('VEDE-ESCALIERS') < 0, 'x2 témoin : sans escalier, le calque n\'est pas déclaré et rien ne s\'y trouve');
  const E = r.ents.filter(q => q.cal === 'VEDE-ESCALIERS'), P = E.filter(q => q.type === 'POLYLINE'), L = E.filter(q => q.type === 'LINE');
  R.ok(P.length === 1 && P[0].ferme && P[0].sommets.length === 4 && CONTOUR.every((q, i) => proche(P[0].sommets[i], q)), 'x3 contour : une polyligne fermée, (4,3) (7,3) (7,4) (4,4) (obtenu '
    + P.map(q => (q.ferme ? 'fermée ' : 'ouverte ') + q.sommets.map(txtPt).join(' ')).join(' | ') + ')');
  R.ok(MARCHES.every(m => L.some(l => memeSeg(l.a, l.b, m[0], m[1]))), 'x4 marches : n − 1 = 3 lignes, en x = 4,75 ; 5,5 ; 6,25 (lignes : ' + L.map(l => txtSeg([l.a, l.b])).join(' ') + ')');
  const tete = L.filter(l => proche(l.b, FLECHE[1]) || proche(l.a, FLECHE[1]));
  R.ok(L.some(l => memeSeg(l.a, l.b, FLECHE[0], FLECHE[1])) && tete.length === 3 && L.length === 6, 'x5 flèche : ligne de (4 ; 3,5) à (7 ; 3,5) et deux traits de pointe à (7 ; 3,5) ; 6 lignes en tout (obtenu '
    + L.length + ')');
  const d40 = avecEscalier({n: '40'}), r40 = dxf(d40), L40 = r40.ents.filter(q => q.cal === 'VEDE-ESCALIERS' && q.type === 'LINE');
  R.ok(L40.length === 39 + 3, 'x6 40 marches : les 39 traits sont tous écrits au DXF (à l\'échelle réelle, sans seuil), avec la flèche (obtenu ' + L40.length + ' lignes)');
  const d7 = maison(); esc(d7, 'E1', [4, -1], [7, -1], {larg: '2', cote: 'd'});
  const r7 = dxf(d7), e7 = r7.ext.$EXTMIN;
  R.ok(!!e7 && Math.abs(e7.y - (-8)) < EPS, 'x7 étendue du dessin ($EXTMIN) : le contour compte (y = −3 − 5 = −8 ; obtenu ' + JSON.stringify(e7) + ')');
  const r8 = sur(() => dxf(avecEscalier({larg: '0'})));
  R.ok(typeof r8 !== 'string' && !('VEDE-ESCALIERS' in r8.calques) && r8.texte.indexOf('VEDE-ESCALIERS') < 0, 'x8 escalier de largeur nulle (croquis altéré) : rien d\'écrit, calque absent, sans exception'
    + (typeof r8 === 'string' ? ' (' + r8 + ')' : ''));
}

/* i : types inconnus */
async function typesInconnus(){
  const base = () => { const d = maison(); inconnus.forEach(u => { const c = copie(u); if (c.k === 'pt'){ c.x = 4; c.y = 5; } else c.v.forEach(v => { v.y += 9; }); d.el.push(c); }); return d; };
  const d = base(), dE = base(); dE.el.find(e => e.id === 'U1').p.etiq = 'Cuve';
  const r1 = sur(() => dessiner(d, 20, [2, 4])), r1e = sur(() => dessiner(dE, 20, [2, 4]));
  R.ok(typeof r1 !== 'string' && typeof r1e !== 'string' && r1.zones.some(z => z.type === 'pt' && z.id === 'U1') && r1e.zones.some(z => z.type === 'pt' && z.id === 'U1'),
    'i1 objet d\'un type inconnu : dessiné à l\'écran (symbole neutre), avec ou sans étiquette saisie, sans exception (obtenu ' + [r1, r1e].map(x => typeof x === 'string' ? x : 'ok').join(' ; ') + ')');
  const pE = await pdf(dE, {mode: 'edl'}), pA = await pdf(dE, {mode: 'avp'});
  R.ok(!pE.err.length && !pA.err.length && !pE.txt.concat(pA.txt).some(t => /undefined|cuve_future|drain_futur/.test(t)) && pE.txt.indexOf('Cuve') >= 0,
    'i2 plans PDF des deux modes sans exception, sans ligne de légende pour ces éléments, étiquette saisie imprimée' + (pE.err.concat(pA.err).length ? ' : ' + pE.err.concat(pA.err).join(' | ') : ''));
  const x = sur(() => dxf(dE));
  const ins = typeof x === 'string' ? [] : x.ents.filter(q => q.type === 'INSERT' && q.c['2'] === 'VEDE_OBJET');
  R.ok(typeof x !== 'string' && x.blocs.indexOf('VEDE_OBJET') >= 0 && ins.length === 1 && proche(ins[0].a, [4, 5]) && !/UNDEFINED|CUVE_FUTURE/.test(x.texte),
    'i3 DXF sans exception : l\'objet est un bloc neutre VEDE_OBJET inséré à sa place' + (typeof x === 'string' ? ' (' + x + ')' : ' (blocs : ' + x.blocs.join(', ') + ')'));
  const j = sur(() => V.exportJson(d)), u1 = typeof j === 'object' && j.el.find(e => e.id === 'U1'), u2 = typeof j === 'object' && j.el.find(e => e.id === 'U2');
  R.ok(JSON.stringify(u1) === JSON.stringify(d.el.find(e => e.id === 'U1')), 'i4 témoin : l\'objet est gardé tel quel à l\'export JSON');
  /* tracé inconnu : trait neutre (gris fin, plein), sans étiquette automatique, calque 0 au DXF */
  const tU = typeof r1 === 'string' ? [] : r1.traits.filter(t => memeSeg(t.a, t.b, [0, 9], [3, 9]));
  R.ok(tU.length > 0 && tU.every(t => t.coul === GRIS) && r1.zones.some(z => z.type === 'ln' && z.id === 'U2'), 'i5 tracé d\'un type inconnu : trait neutre, en gris du complément, à l\'écran (obtenu '
    + JSON.stringify(tU.map(t => t.coul)) + ')');
  const u = d.el.find(e => e.id === 'U2'), et = sur(() => V.texteEtiquette(u, V.analyser(copie(d), 'edl'))), etS = sur(() => V.texteEtiquette(Object.assign(copie(u), {p: Object.assign(copie(u.p), {etiq: 'Drain'})}), null));
  const pS = await pdf(maison(), {mode: 'edl'}), pU = await pdf(d, {mode: 'edl'}), plus = enPlus(pU.txt, pS.txt);
  R.ok(et === '' && etS === 'Drain' && !pU.err.length && !plus.length, 'i6 tracé inconnu : aucune étiquette automatique (saisie : gardée), aucune ligne de légende ni texte ajoutés au plan (étiquette '
    + JSON.stringify(et) + ' ; textes en plus : ' + JSON.stringify(plus) + ')' + (pU.err.length ? ' ' + pU.err.join(' | ') : ''));
  const x2 = sur(() => dxf(d)), pl = typeof x2 === 'string' ? [] : x2.ents.filter(q => q.type === 'POLYLINE' && q.sommets.length === 2 && proche(q.sommets[0], [0, 9]) && proche(q.sommets[1], [3, 9]));
  R.ok(pl.length === 1 && pl[0].cal === '0', 'i7 DXF : le tracé inconnu est une polyligne du calque 0 (obtenu ' + JSON.stringify(pl.map(q => q.cal)) + ')' + (typeof x2 === 'string' ? ' ' + x2 : ''));
  R.ok(JSON.stringify(u2) === JSON.stringify(u), 'i8 témoin : le tracé est gardé tel quel à l\'export JSON');
  const r9 = sur(() => dessiner(d, 20, [2, 4]));
  R.ok(typeof r9 !== 'string' && JSON.stringify(d.el.filter(e => e.id === 'U1' || e.id === 'U2')) === JSON.stringify(inconnus.map(copie).map(c => { if (c.k === 'pt'){ c.x = 4; c.y = 5; } else c.v.forEach(v => { v.y += 9; }); return c; })),
    'i9 témoin : le dessin ne modifie pas ces éléments');
}

(async () => {
  geometrie();
  modele();
  defauts();
  departCotes();
  analyse();
  ecran();
  await plans();
  sortiesDxf();
  await typesInconnus();
  R.fin();
})().catch(e => { console.log('ERREUR ' + (e && e.stack || e)); process.exitCode = 1; });
