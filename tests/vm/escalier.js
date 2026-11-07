// Escaliers (souhait 12, première partie : le type et son rendu, sans outil ; décision D7 de .claude/conception-outils-dessin.md) et
// objet ou tracé d'un type inconnu (défaut D11), sans navigateur ; dessin de l'écran sur un canevas factice, plan PDF par la bibliothèque
// PDF de l'application ; croquis fictifs (12 rue Fictive, Ville-Exemple) et croquis de démonstration. m106 ; m107 ajoutera l'outil.
// g1 à g12 : VCroquis.geo.escalier(D, F, larg, n, cote, monte), escalier de 3 × 1 m à 4 marches : contour (0,0) (3,0) (3,1) (0,1) à
//   gauche, y = −1 à droite ; marches en x = 0,75 ; 1,5 ; 2,25 d'un bord à l'autre ; flèche de (0 ; 0,5) à (3 ; 0,5) si l'escalier monte
//   vers la fin, inversée sinon, avec sa pointe ; textes « 1,00 » et « 4 » ; escalier vers le nord ; une marche ; valeurs invalides : null.
// m1 à m3 : valeurs par défaut d'un escalier ; aucune étiquette (sauf p.etiq) ; gris du complément (resLigne 'LIM').
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
// usage : node tests/vm/escalier.js [-v] [--app=<dossier>]
'use strict';
const {charger, rapport} = require('./charger.js');
const {V, ctx} = charger({pdf: true}), R = rapport('escalier');
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

/* Canevas factice : les segments de chaque chemin tracé (stroke), avec la couleur et l'épaisseur du moment */
function canevas(){
  const traits = [], etat = {}; let chemin = [], dernier = null, debut = null;
  const m = {
    beginPath(){ chemin = []; dernier = debut = null; },
    moveTo(x, y){ dernier = debut = {x, y}; },
    lineTo(x, y){ const q = {x, y}; if (dernier) chemin.push([dernier, q]); dernier = q; },
    closePath(){ if (dernier && debut) chemin.push([dernier, debut]); dernier = debut; },
    stroke(){ chemin.forEach(s => traits.push({a: s[0], b: s[1], coul: etat.strokeStyle, larg: etat.lineWidth})); },
    measureText(){ return {width: 10}; }
  };
  return {ctx: new Proxy(etat, {get: (t, k) => k in m ? m[k] : k in t ? t[k] : () => {}, set: (t, k, v) => { t[k] = v; return true; }}), traits};
}
/* dessin de l'écran (vue de 800 × 600 px centrée sur c, à s px par mètre) : zones de toucher et traits, ramenés en mètres du croquis */
function dessiner(d, s, c){
  const an = V.analyser(copie(d), 'edl'), vue = new V.Vue(800, 600); vue.s = s; vue.cx = c[0]; vue.cy = c[1];
  const cv = canevas(), zones = V.dessinerCroquis(cv.ctx, d, an, vue, 1, {});
  return {zones, traits: cv.traits.map(t => ({a: vue.monde(t.a.x, t.a.y), b: vue.monde(t.b.x, t.b.y), coul: t.coul, larg: t.larg}))};
}
const GRIS = 'rgb(40,40,40)';
const aTrait = (T, A, B) => T.some(t => memeSeg(t.a, t.b, A, B));

/* e : écran */
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

/* p : plan PDF : textes, place des textes (pos), traits (couleur/épaisseur, dans l'ordre) et formes (couleur, fermée ou non, sommets en mm) */
async function pdf(doc, o){
  const J0 = ctx.jspdf.jsPDF, txt = [], pos = [], traits = [], formes = [];
  const W = function(){
    const d = new J0(...arguments), ot = d.text, ol = d.lines, lw = d.setLineWidth, dc = d.setDrawColor; let w = null, c = null;
    d.text = function(t, x, y){ try { const s = [].concat(t).join(' '); txt.push(s); pos.push({t: s, x, y}); } catch (e){} return ot.apply(d, arguments); };
    d.setLineWidth = function(x){ w = x; return lw.apply(d, arguments); };
    d.setDrawColor = function(){ c = Array.from(arguments).join(','); return dc.apply(d, arguments); };
    /* d.line passe aussi par ici ; s : segments relatifs, k : échelle (d'une courbe, on garde le point d'arrivée) */
    d.lines = function(s, x, y, k, st, ferme){
      const ech = k || [1, 1], pts = [{x, y}];
      (s || []).forEach(q => { const z = pts[pts.length - 1]; pts.push({x: z.x + ech[0] * q[q.length - 2], y: z.y + ech[1] * q[q.length - 1]}); });
      traits.push(c + '/' + w); formes.push({coul: c, ferme: !!ferme, pts}); return ol.apply(d, arguments);
    };
    return d;
  };
  W.API = J0.API; ctx.jspdf.jsPDF = W;
  try { await V.pdfPlan(copie(doc), null, o || {}); } catch (e){ txt.push('ERR ' + e.message); } finally { ctx.jspdf.jsPDF = J0; }
  return {txt, pos, traits, formes, err: txt.filter(t => /^ERR/.test(t))};
}
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

/* x : DXF (latin1 ; paires code/valeur) */
function dxf(doc){
  const x = Buffer.from(V.ecrireDxf(copie(doc))).toString('latin1').split('\r\n'), ents = [];
  let sec = null, e = null;
  for (let i = 0; i + 1 < x.length; i += 2){
    const c = x[i].trim(), v = x[i + 1];
    if (c === '0'){ e = {sec, type: v, c: {}}; ents.push(e); continue; }
    if (!e) continue;
    if (e.type === 'SECTION' && c === '2'){ sec = e.sec = v; continue; }
    if (sec === 'HEADER' && c === '9'){ e = {sec, type: 'VAR', nom: v, c: {}}; ents.push(e); continue; }
    if (!(c in e.c)) e.c[c] = v;
  }
  const out = {calques: {}, blocs: [], ents: [], ext: {}, texte: x.join('\n')}; let pl = null;
  ents.forEach(q => {
    if (q.type === 'VAR') out.ext[q.nom] = {x: +q.c['10'], y: +q.c['20']};
    if (q.sec === 'TABLES' && q.type === 'LAYER') out.calques[q.c['2']] = +q.c['62'];
    if (q.sec === 'BLOCKS' && q.type === 'BLOCK') out.blocs.push(q.c['2']);
    if (q.sec !== 'ENTITIES') return;
    if (q.type === 'POLYLINE'){ pl = {type: 'POLYLINE', cal: q.c['8'], ferme: (+q.c['70'] & 1) === 1, sommets: []}; out.ents.push(pl); return; }
    if (q.type === 'VERTEX'){ if (pl) pl.sommets.push({x: +q.c['10'], y: +q.c['20']}); return; }
    if (q.type === 'SEQEND'){ pl = null; return; }
    out.ents.push({type: q.type, cal: q.c['8'], c: q.c, a: {x: +q.c['10'], y: +q.c['20']}, b: {x: +q.c['11'], y: +q.c['21']}});
  });
  return out;
}
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
  analyse();
  ecran();
  await plans();
  sortiesDxf();
  await typesInconnus();
  R.fin();
})().catch(e => { console.log('ERREUR ' + (e && e.stack || e)); process.exitCode = 1; });
