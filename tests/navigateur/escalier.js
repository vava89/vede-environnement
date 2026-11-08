// Escalier et types inconnus dans l'éditeur du croquis, dans Chromium (données fictives, fond fictif de VCroquis.demoDxf()) : correctif
// m106 (souhait 12, première partie, et défaut D11 ; décisions D3 et D7 de .claude/conception-outils-dessin.md) ; outil « Escalier » : m107.
// d : escaliers (dont deux non dessinés), tuyau à bouts libres, objet et tracé d'un type inconnu (croquis d'une version plus récente)
//     injectés : dessinés sans erreur ;
// s : un toucher sur la ligne de la flèche (au milieu de la largeur, loin de la ligne départ-fin) choisit l'escalier ; fiche « Escalier »,
//     sans champ Étiquette ;
// a : le bout d'un tuyau lâché sur la ligne départ-fin de l'escalier ne s'y attache pas (aucun raccord, l'escalier garde ses deux sommets) ;
//     témoin : le bout a bien bougé ;
// n : fiche d'un escalier non dessiné : « départ et fin confondus », sinon « valeurs illisibles » ;
// i : fiches de l'objet et du tracé d'un type inconnu ouvertes sans erreur (« Objet », « Tracé », « gardé tel quel ») ; ils restent tels quels ;
// m : dans un second croquis, sans type inconnu ni tuyau : l'escalier choisi n'a pas de poignée au milieu (aucune n'est dessinée ; témoin :
//     un trait du complément choisi en a une), et un glissé depuis le milieu de sa ligne départ-fin n'ajoute aucun sommet.
// m107, outil « Escalier » de la palette « Tracés », sur un croquis neuf du fond de démonstration :
// o : la palette « Tracés » a « Escalier », juste après « Complément du fond », avec son pictogramme ; barre d'aide du départ, avec le seul
//     bouton « Cotes » (m108 ; avant : aucun bouton, et ce contrôle échoue sur b08e6cd) ;
// t : deux touchers, le départ sur le coin sud-ouest du bâti, la fin vers la rue à 3,8° de l'équerre : départ au coin (1e-6 m) ; barre
//     d'aide « touchez la fin », avec « Point » et « Abandonner », sans « Terminer » ; un escalier de deux sommets, fin redressée d'équerre à
//     la façade (1e-6 rad), fiche ouverte ; largeur « 1,00 », marches arrondi(L / 0,28), à gauche, contour hors du bâti, montée vers le
//     départ posé au coin ; ni attache, ni raccord ;
// f : fiche : Largeur, Marches, Longueur (depuis le plan), Côté, Sens ; ni Étiquette, ni « Inverser » ; « Supprimer ». Largeur 1,5 →
//     « 1,50 » ; Marches 12 ; Longueur 4,00 : fin à 4 m sur la même direction (1e-9), départ gardé, p.long absent ; Côté Droite ; Sens Monte
//     puis Descend : un pas d'annulation chacun, qui remet le croquis d'avant ; valeurs hors bornes, négatives ou non numériques refusées
//     (toast qui nomme les bornes, valeur gardée, aucun pas d'annulation) ;
// z : « Point » retire le départ ; second toucher au départ : aucun escalier ; fin confondue avec le départ (terminerTrace) : rien, sans
//     exception ;
// g : au glissé du doigt (aide « Tracer en glissant le doigt » active), de l'appui au lever : contour fantôme pendant le glissé ; même
//     résultat que t ;
// c : le long de la façade sud vers l'est : escalier à droite (le côté gauche entrerait dans le bâti), montée vers le départ ;
// v : à la souris, départ posé, survol vers la rue : contour fantôme en tirets ; survol, puis départ posé au doigt : entre deux touchers,
//     seul le départ est marqué ; la souris qui bouge ensuite montre de nouveau le contour (écran tactile et souris) ; glissé à la souris :
//     contour fantôme pendant le glissé, escalier au lever ;
// r : fiche d'un escalier non dessiné : ses champs restent, Longueur grisée si le départ et la fin sont confondus ; Largeur 1,20 répare un
//     escalier de largeur nulle ; aucune erreur dans la console.
// Sur 6e365ec : o échoue (pas d'outil « Escalier » dans la palette) et les cas m107 suivants ne sont pas lancés ; ceux de m106 passent.
// Sur 689e83b : d, s, a, n et i échouent (l'objet d'un type inconnu arrête le dessin et la fiche), sauf le témoin du bout déplacé ; m échoue
// (poignée dessinée, sommet ajouté), sauf le témoin du trait du complément et l'absence d'erreur.
// usage : node tests/navigateur/escalier.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('escalier');

async function croquisNeuf(){
  const A = await C.ouvrir(); await C.etudeEtDossier(A.p); await C.ouvrirCroquis(A.p); return A;
}
const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
const elDoc = async (p, id) => (await C.docCroquis(p)).el.find(e => e.id === id);
const choisi = p => p.evaluate(() => { const S = window.__vcEd.etat; return S.sel ? S.sel.id : null; });
/* panneau ouvert : nom, titre, texte du corps, champ Étiquette */
const panneau = p => p.evaluate(() => {
  const S = window.__vcEd.etat, pan = document.querySelector('.vc .vc-panneau'), h = pan && pan.querySelector('h2'), c = document.querySelector('.vc .vc-pcorps');
  return {n: S.panneau, titre: h ? h.textContent : null, texte: c ? c.textContent : '', etiq: !!(c && c.querySelector('input[data-k="etiq"]'))};
});
const milieu = (a, b) => ({x: (a.x + b.x) / 2, y: (a.y + b.y) / 2});
/* escalier selon le modèle de la décision D7 : départ D, fin F ; 1 m à gauche, 4 marches, monte vers la fin, sauf p */
const esc = (id, D, F, p) => ({id, k: 'ln', t: 'esc', v: [{x: D[0], y: D[1], a: null}, {x: F[0], y: F[1], a: null}],
  p: Object.assign({larg: '1,00', n: '4', cote: 'g', monte: 'fin', st: 'existant'}, p || {}), lab: null});
/* élément id choisi, puis un dessin de l'écran relevé : poignées du milieu dessinées (cercles de 7 px, les seuls de cette taille) ;
   ici : l'une d'elles est au milieu de ses deux premiers sommets */
const poigneeMilieu = (p, id) => p.evaluate(async id => {
  const ed = window.__vcEd, S = ed.etat, A = CanvasRenderingContext2D.prototype, f = A.arc, vus = [], att = ms => new Promise(r => setTimeout(r, ms));
  ed.selectionner(id); await att(300);
  A.arc = function(x, y, r){ if (r === 7) vus.push({x, y}); return f.apply(this, arguments); };
  try { ed.redessiner(); await att(250); } finally { A.arc = f; }
  const e = S.doc.el.find(q => q.id === id), a = S.vue.ecran(e.v[0].x, e.v[0].y), b = S.vue.ecran(e.v[1].x, e.v[1].y), m = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2};
  return {n: vus.length, ici: vus.some(q => Math.hypot(q.x - m.x, q.y - m.y) < 2)};
}, id);

async function editeur(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    /* escalier de 6 m sur 2 m, au-dessus de la ligne départ-fin (côté gauche en allant vers l'est), 4 marches */
    const E1 = esc('E1', [cx - 3, cy], [cx + 3, cy], {larg: '2,00'});
    const T1 = C.L('T1', 'tr', [[cx - 1.5, cy - 5], [cx - 1.5, cy - 2.5]], {}, {res: 'EU'});
    const U1 = C.P('U1', 'cuve_future', cx + 4, cy - 3, {vol: '3000', etiq: 'Cuve'}); U1.lab = null;
    const U2 = {id: 'U2', k: 'ln', t: 'drain_futur', v: [{x: cx + 1, y: cy - 4, a: null}, {x: cx + 4, y: cy - 4.5, a: null}], p: {st: 'existant', res: 'EU', diam: '100'}, lab: null};
    /* pour n : escaliers non dessinés, départ sur la fin (E3) ou largeur nulle (E4) */
    const E3 = esc('E3', [cx + 8, cy + 3], [cx + 8, cy + 3]), E4 = esc('E4', [cx + 7, cy - 1], [cx + 9, cy - 1], {larg: '0'});
    const avant = JSON.stringify([U1, U2]);
    await C.injecter(p, {el: [E1, T1, U1, U2, E3, E4]});
    await C.regler(p, cx, cy, 40);
    await p.evaluate(() => window.__vcEd.redessiner()); await C.pause(p, 200);
    erreurs(A, 'd : escaliers (dont deux non dessinés), tuyau, objet et tracé d\'un type inconnu dessinés');
    const n0 = A.erreurs.length;
    /* s : toucher sur la ligne de la flèche, à 1 m (40 px) de la ligne départ-fin */
    await C.outil(p, {k: 'main'});
    await C.toucherCv(p, await C.ecranCv(p, cx - 1, cy + 1), 700);
    const s1 = await choisi(p), f1 = await panneau(p);
    R.ok(s1 === 'E1' && f1.n === 'fiche', 's : toucher sur la ligne de la flèche : l\'escalier est choisi, sa fiche ouverte (' + s1 + ', panneau ' + f1.n + ')');
    R.ok(f1.titre === 'Escalier' && !f1.etiq, 's : fiche titrée « Escalier », sans champ Étiquette (titre ' + JSON.stringify(f1.titre) + ', étiquette ' + f1.etiq + ')');
    /* a : bout du tuyau lâché sur la ligne départ-fin de l'escalier */
    await p.evaluate(() => window.__vcEd.selectionner('T1')); await C.pause(p, 300);
    const t0 = (await elDoc(p, 'T1')).v, q0 = await C.ecranCv(p, t0[1].x, t0[1].y), q1 = await C.ecranCv(p, cx - 1.5, cy);
    await C.glisserDoigtCv(p, q0, q1, 600);
    const d3 = await C.docCroquis(p), t1 = d3.el.find(e => e.id === 'T1'), e3 = d3.el.find(e => e.id === 'E1'), jn = d3.el.filter(e => e.t === 'jonction');
    const ecart = t1 ? Math.hypot(t1.v[1].x - (cx - 1.5), t1.v[1].y - cy) : Infinity, bouge = !!t1 && Math.hypot(t1.v[1].x - t0[1].x, t1.v[1].y - t0[1].y) > 1 && ecart < .5;
    R.ok(bouge, 'a : témoin : le bout du tuyau a suivi le doigt jusqu\'à la ligne départ-fin (à ' + (isFinite(ecart) ? ecart.toFixed(2) + ' m' : '?') + ' du point visé)');
    R.ok(!!t1 && t1.v[1].a === null && !!e3 && e3.v.length === 2 && e3.v.every(w => !w.a) && !jn.length, 'a : bout du tuyau lâché sur l\'escalier : il ne s\'y attache pas (attache '
      + JSON.stringify(t1 && t1.v[1].a) + ', ' + (e3 ? e3.v.length : 0) + ' sommets à l\'escalier, ' + jn.length + ' raccord)');
    /* n : fiches des escaliers non dessinés */
    await p.evaluate(() => window.__vcEd.selectionner('E3')); await C.pause(p, 300);
    const f6 = await panneau(p);
    await p.evaluate(() => window.__vcEd.selectionner('E4')); await C.pause(p, 300);
    const f7 = await panneau(p);
    R.ok(f6.titre === 'Escalier' && /départ et fin confondus : non dessiné/.test(f6.texte) && f7.titre === 'Escalier' && /valeurs illisibles : non dessiné/.test(f7.texte),
      'n : fiche d\'un escalier non dessiné : « départ et fin confondus » (départ sur la fin), « valeurs illisibles » (largeur nulle) (textes '
      + JSON.stringify([f6.titre, f6.texte.slice(0, 60), f7.titre, f7.texte.slice(0, 60)]) + ')');
    /* i : fiches des éléments d'un type inconnu */
    await p.evaluate(() => window.__vcEd.selectionner('U1')); await C.pause(p, 300);
    const f4 = await panneau(p);
    R.ok(f4.n === 'fiche' && f4.titre === 'Objet' && /gardé tel quel/.test(f4.texte), 'i : fiche de l\'objet d\'un type inconnu : « Objet », « gardé tel quel » (titre ' + JSON.stringify(f4.titre)
      + ', texte ' + JSON.stringify(f4.texte.slice(0, 120)) + ')');
    await p.evaluate(() => window.__vcEd.selectionner('U2')); await C.pause(p, 300);
    const f5 = await panneau(p);
    R.ok(f5.n === 'fiche' && f5.titre === 'Tracé' && /gardé tel quel/.test(f5.texte), 'i : fiche du tracé d\'un type inconnu : « Tracé », « gardé tel quel » (titre ' + JSON.stringify(f5.titre)
      + ', texte ' + JSON.stringify(f5.texte.slice(0, 120)) + ')');
    const d5 = await C.docCroquis(p), u = JSON.stringify(['U1', 'U2'].map(id => d5.el.find(e => e.id === id)));
    R.ok(u === avant, 'i : objet et tracé d\'un type inconnu gardés tels quels dans le croquis');
    R.ok(A.erreurs.length === n0, 's, a, n, i : aucune erreur dans la console' + (A.erreurs.length > n0 ? ' : ' + A.erreurs.slice(n0, n0 + 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* m : croquis à part, sans type inconnu (sur 689e83b, il arrête le dessin) ni tuyau (rien ne s'attache) : escalier neuf E2 de 6 m sur 1 m et
   trait du complément L2 de 6 m (témoin : il a sa poignée au milieu) */
async function poignees(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    await C.injecter(p, {el: [esc('E2', [cx - 3, cy], [cx + 3, cy]), C.L('L2', 'lim', [[cx - 3, cy - 3], [cx + 3, cy - 3]], {}, {})]});
    await C.regler(p, cx, cy, 40); await C.outil(p, {k: 'main'});
    const pL = await poigneeMilieu(p, 'L2'), pE = await poigneeMilieu(p, 'E2');
    R.ok(pL.ici, 'm : témoin : le trait du complément choisi a sa poignée au milieu (' + pL.n + ' poignée dessinée)');
    R.ok(!pE.ici && pE.n === 0, 'm : escalier choisi : aucune poignée dessinée au milieu (' + pE.n + ' poignée dessinée)');
    /* glissé vers le haut depuis le milieu de la ligne départ-fin, l'escalier étant choisi (la vue a pu bouger au choix : point recalculé) */
    const w0 = (await elDoc(p, 'E2')).v, mE = milieu(w0[0], w0[1]), qm = await C.ecranCv(p, mE.x, mE.y);
    await C.glisserDoigtCv(p, qm, {x: qm.x, y: qm.y - 50}, 600);
    const e2 = await elDoc(p, 'E2');
    R.ok(w0.length === 2 && !!e2 && e2.v.length === w0.length && e2.v.every(w => !w.a), 'm : pas de poignée au milieu : un glissé depuis le milieu de la ligne départ-fin n\'ajoute aucun sommet ('
      + w0.length + ' sommets avant, ' + (e2 ? e2.v.length : 'escalier absent') + ' après)');
    erreurs(A, 'm');
  } finally { await A.fermer(); }
}

/* --- m107 : outil « Escalier » de la palette « Tracés », sur un croquis neuf du fond fictif de la démonstration (VCroquis.demoDxf()) --- */
const DEMO = {x: 1700000, y: 8200000, th: 12 * Math.PI / 180};
const angle = (a, b) => Math.atan2(b.y - a.y, b.x - a.x);
const normAng = a => { a = (a + Math.PI) % (2 * Math.PI); if (a < 0) a += 2 * Math.PI; return a - Math.PI; };
const expo = x => isFinite(x) ? x.toExponential(1) : String(x);
const PAN = '.vc .vc-panneau:not([hidden]) .vc-pcorps ';
const texteAide = p => p.evaluate(() => { const a = document.querySelector('.vc .vc-aide'); return a && !a.hidden ? a.textContent.replace(/\s+/g, ' ').trim() : ''; });
const boutonsAide = p => p.evaluate(() => Array.from(document.querySelectorAll('.vc .vc-aide:not([hidden]) button[data-a]')).map(b => b.dataset.a).join(' '));
const toastVu = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); return t && t.classList.contains('on') ? t.textContent : ''; });
const effacerToast = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); if (t){ t.classList.remove('on'); t.textContent = ''; } });
const elements = p => p.evaluate(() => JSON.stringify(window.__vcEd.doc().el));
const nUndo = p => p.evaluate(() => window.__vcEd.etat.undo.length);
const annuler = async p => { await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); };
const choisir = async (p, id) => { await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 300); };
/* croquis vidé (historique, choix, fin automatique), outil Escalier choisi, vue fixe à 40 px par mètre */
async function repartir(p, c){
  await C.injecter(p, {el: []}); await C.outil(p, {k: 'ln', id: 'esc'}); await C.regler(p, c.x, c.y, 40);
}
/* coins du bâti de la démonstration (u 65,5 à 74,5 ; v 4 à 14), tels que les lit l'éditeur (VCroquis.geo.lignesRef) : sud-ouest (le coin du
   départ), sud-est et nord-ouest (les façades sud et ouest qui en partent) */
const coinsBati = (p, Q) => p.evaluate(Q => {
  const S = window.__vcEd.etat, G = window.VCroquis.geo, L = (G.lignesRef(S.doc, S.fond, null, ['bati']) || []).filter(l => l.ferme && l.aire !== 0);
  const pres = c => { let b = null; L.forEach((l, i) => l.P.forEach(q => { const d = Math.hypot(q.x - c.x, q.y - c.y); if (!b || d < b.d) b = {d, i, q: {x: q.x, y: q.y}}; })); return b; };
  const so = pres(Q[0]), se = pres(Q[1]), no = pres(Q[2]);
  return so && se && no && so.d < .01 && se.d < .01 && no.d < .01 && so.i === se.i && so.i === no.i ? {so: so.q, se: se.q, no: no.q} : null;
}, Q);
/* état après un geste : éléments du croquis, escalier, choix, panneau ; contour de l'escalier dans le bâti (centre dans une ligne de bâti fermée) */
const apres = p => p.evaluate(() => {
  const ed = window.__vcEd, S = ed.etat, G = window.VCroquis.geo, d = ed.doc(), E = d.el.filter(x => x.t === 'esc'), e = E[0] || null;
  const L = (G.lignesRef(S.doc, S.fond, null, ['bati']) || []).filter(l => l.ferme && l.aire !== 0);
  let dedans = null;
  if (e && e.v.length === 2){
    const g = G.escalier(e.v[0], e.v[1], e.p.larg, e.p.n, e.p.cote, e.p.monte);
    if (g){ const m = {x: g.contour.reduce((s, q) => s + q.x, 0) / 4, y: g.contour.reduce((s, q) => s + q.y, 0) / 4}; dedans = L.some(l => G.dansPolygone(m, l.P) === true); }
  }
  const h = document.querySelector('.vc .vc-panneau:not([hidden]) h2');
  return {n: d.el.length, nEsc: E.length, jonctions: d.el.filter(x => x.t === 'jonction').length, e: e ? JSON.parse(JSON.stringify(e)) : null, sel: S.sel ? S.sel.id : null,
    panneau: S.panneau, titre: h ? h.textContent : null, brouillon: S.brouillon ? S.brouillon.pts.length : 0, dedans};
});
/* escalier tracé du coin sud-ouest vers la rue, à peu près d'équerre à la façade sud (k : nom du cas) */
function verifier(k, r, B){
  const e = r.e;
  if (!R.ok(r.nEsc === 1 && r.n === 1 && !!e && e.v.length === 2, k + ' : un escalier créé, de deux sommets, et rien d\'autre (' + r.n + ' élément, ' + r.nEsc + ' escalier, '
    + (e ? e.v.length : 0) + ' sommets)')) return null;
  const d0 = Math.hypot(e.v[0].x - B.so.x, e.v[0].y - B.so.y), a = angle(e.v[0], e.v[1]);
  const eq = Math.abs(normAng(a - angle(B.so, B.se) + Math.PI / 2)), pa = Math.abs(normAng(a - angle(B.so, B.no) - Math.PI));
  const L = Math.hypot(e.v[1].x - e.v[0].x, e.v[1].y - e.v[0].y), n = String(Math.min(60, Math.max(1, Math.round(L / .28))));
  R.ok(d0 < 1e-6, k + ' : départ au coin du bâti, à 1e-6 m près (écart ' + expo(d0) + ' m)');
  R.ok(Math.min(eq, pa) < 1e-6 && L > 2.5 && L < 3.5, k + ' : fin redressée d\'équerre à la façade sud (ou parallèle à la façade ouest, l\'autre côté du coin), à 1e-6 rad près, '
    + 'à 3 m environ (écarts ' + expo(eq) + ' et ' + expo(pa) + ' rad ; ' + L.toFixed(3) + ' m)');
  R.ok(r.sel === e.id && r.panneau === 'fiche' && r.titre === 'Escalier' && !r.brouillon, k + ' : l\'escalier est choisi, sa fiche « Escalier » ouverte, plus aucun tracé en cours (choix '
    + r.sel + ', panneau ' + r.panneau + ', titre ' + JSON.stringify(r.titre) + ', ' + r.brouillon + ' point en attente)');
  R.ok(e.p.larg === '1,00' && e.p.n === n && e.p.cote === 'g' && e.p.monte === 'depart' && e.p.st === 'existant' && !('long' in e.p) && r.dedans === false,
    k + ' : largeur « 1,00 », ' + n + ' marches (arrondi de L / 0,28), à gauche (les deux côtés sont hors du bâti), montée vers le départ posé au coin, contour hors du bâti, '
    + 'sans p.long (obtenu ' + JSON.stringify(e.p) + ', contour dans le bâti : ' + r.dedans + ')');
  R.ok(e.v.every(w => w.a === null) && r.jonctions === 0, k + ' : aucune attache, aucun raccord (attaches ' + JSON.stringify(e.v.map(w => w.a)) + ', ' + r.jonctions + ' raccord)');
  return e;
}
/* relevé des chemins tracés sur le canevas (lignes droites seulement) : points, fermé ou non, en tirets ou non */
const releverDebut = p => p.evaluate(() => {
  const A = CanvasRenderingContext2D.prototype, f = {}, chemins = []; let cur = null;
  ['beginPath', 'moveTo', 'lineTo', 'closePath', 'stroke'].forEach(m => { f[m] = A[m]; });
  A.beginPath = function(){ cur = {pts: [], ferme: false}; return f.beginPath.apply(this, arguments); };
  A.moveTo = function(x, y){ if (cur) cur.pts.push({x, y}); return f.moveTo.apply(this, arguments); };
  A.lineTo = function(x, y){ if (cur) cur.pts.push({x, y}); return f.lineTo.apply(this, arguments); };
  A.closePath = function(){ if (cur) cur.ferme = true; return f.closePath.apply(this, arguments); };
  A.stroke = function(){ if (cur) chemins.push({pts: cur.pts.slice(), ferme: cur.ferme, tirets: this.getLineDash().length > 0}); return f.stroke.apply(this, arguments); };
  window.__escReleve = {f, chemins};
});
const releverFin = p => p.evaluate(() => {
  const r = window.__escReleve; if (!r) return []; const A = CanvasRenderingContext2D.prototype;
  Object.keys(r.f).forEach(m => { A[m] = r.f[m]; }); window.__escReleve = null; return r.chemins;
});
/* contour fantôme : chemin fermé en tirets de quatre points, le premier au départ (à 1,5 px), le second près du point visé (25 px), la
   largeur de 1 m (40 px) entre le premier et le dernier */
const fantome = (chemins, dep, vise) => chemins.some(c => c.ferme && c.tirets && c.pts.length === 4 && Math.hypot(c.pts[0].x - dep.x, c.pts[0].y - dep.y) < 1.5
  && Math.hypot(c.pts[1].x - vise.x, c.pts[1].y - vise.y) < 25 && Math.abs(Math.hypot(c.pts[3].x - c.pts[0].x, c.pts[3].y - c.pts[0].y) - 40) < 1);
/* fiche de l'escalier : champs (valeur, grisé), puces (* : choisie), champ Étiquette, bouton Inverser, bouton Supprimer, texte */
const ficheEsc = p => p.evaluate(() => {
  const c = document.querySelector('.vc .vc-panneau:not([hidden]) .vc-pcorps'); if (!c) return null;
  const champ = k => { const i = c.querySelector('input[data-a="escNum"][data-k="' + k + '"]'); return i ? {val: i.value, off: i.disabled} : null; };
  const puces = k => Array.from(c.querySelectorAll('button[data-a="prop"][data-k="' + k + '"]')).map(b => (b.getAttribute('aria-pressed') === 'true' ? '*' : '') + b.textContent.trim()).join(' | ');
  return {larg: champ('larg'), n: champ('n'), long: champ('long'), cote: puces('cote'), monte: puces('monte'), etiq: !!c.querySelector('input[data-k="etiq"]'),
    inverser: /Inverser/.test(c.textContent), supprimer: !!c.querySelector('button[data-a="supprimer"]'), texte: c.textContent.replace(/\s+/g, ' ')};
});
/* saisie d'un champ de la fiche, enregistrée quand il perd le focus ; puis toast montré, valeur du champ, escalier, pas d'annulation */
async function saisirEsc(p, id, k, v){
  await effacerToast(p);
  const i = await p.$(PAN + 'input[data-a="escNum"][data-k="' + k + '"]'); if (!i) return null;
  await i.fill(v); await i.evaluate(x => x.blur()); await C.pause(p, 250);
  const i2 = await p.$(PAN + 'input[data-a="escNum"][data-k="' + k + '"]');
  return {toast: await toastVu(p), champ: i2 ? await i2.inputValue() : null, e: await elDoc(p, id), undo: await nUndo(p)};
}
async function puceEsc(p, k, lib){
  const bs = await p.$$(PAN + 'button[data-a="prop"][data-k="' + k + '"]');
  for (const b of bs) if ((await b.textContent()).trim() === lib){ await b.click(); await C.pause(p, 300); return true; }
  return false;
}

async function outilEscalier(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const o = await p.evaluate(() => window.__vcEd.etat.doc.origine);
    const plan = (u, v) => ({x: DEMO.x + u * Math.cos(DEMO.th) - v * Math.sin(DEMO.th) - o.x, y: DEMO.y + u * Math.sin(DEMO.th) + v * Math.cos(DEMO.th) - o.y});
    const B = await coinsBati(p, [plan(65.5, 4), plan(74.5, 4), plan(65.5, 14)]), centre = plan(67, 3), finRue = plan(65.7, 1), finFacade = plan(68.5, 4.1);
    if (!R.ok(!!B, 'bâti de la démonstration lu par VCroquis.geo.lignesRef : coins sud-ouest, sud-est et nord-ouest trouvés')) return;
    await C.regler(p, centre.x, centre.y, 40);
    /* o : palette « Tracés » et barre d'aide */
    await p.click('.vc .vc-o[data-pal="tr"]'); await C.pause(p, 250);
    const pal = await p.evaluate(() => Array.from(document.querySelectorAll('.vc .vc-pitem')).map(b => ({it: b.dataset.item, lib: b.textContent.trim(), rect: !!b.querySelector('svg rect')})));
    const iE = pal.findIndex(x => x.it === 'ln:esc'), iL = pal.findIndex(x => x.it === 'ln:lim');
    R.ok(iE >= 0 && iE === iL + 1 && /^Escalier/.test(pal[iE].lib) && pal[iE].rect, 'o : la palette « Tracés » a « Escalier », juste après « Complément du fond », avec le pictogramme de l\'escalier (obtenu '
      + JSON.stringify(pal.map(x => x.it)) + ')');
    if (iE < 0){ erreurs(A, 'o'); return; }
    await p.click('.vc .vc-pitem[data-item="ln:esc"]'); await C.pause(p, 250);
    const ou = await p.evaluate(() => window.__vcEd.etat.outil), aide0 = await texteAide(p), bt0 = await boutonsAide(p);
    R.ok(ou.k === 'ln' && ou.id === 'esc' && aide0.indexOf('Escalier : touchez le départ (un coin de l\'escalier), puis la fin') === 0 && bt0 === 'cotes',
      'o : outil choisi ; barre d\'aide « Escalier : touchez le départ (un coin de l\'escalier), puis la fin », avec le seul bouton « Cotes » (m108) (obtenu '
      + JSON.stringify([ou, aide0, bt0]) + ')');
    /* t : deux touchers, le départ sur le coin sud-ouest, la fin vers la rue, à 3,8° de l'équerre */
    await C.toucherCv(p, await C.ecranCv(p, B.so.x, B.so.y));
    const b1 = await p.evaluate(() => { const b = window.__vcEd.etat.brouillon; return b ? b.pts.map(q => ({x: q.x, y: q.y, aide: q.aide})) : null; });
    const aide1 = await texteAide(p), bt1 = await boutonsAide(p);
    R.ok(!!b1 && b1.length === 1 && b1[0].aide === 'coin' && Math.hypot(b1[0].x - B.so.x, b1[0].y - B.so.y) < 1e-6 && /^Escalier : touchez la fin/.test(aide1) && bt1 === 'retirerPoint annulerTrace',
      't : premier toucher : départ posé sur le coin (aide « coin ») ; barre d\'aide « Escalier : touchez la fin », boutons « Point » et « Abandonner », pas de « Terminer » (obtenu '
      + JSON.stringify([b1, aide1, bt1]) + ')');
    await C.toucherCv(p, await C.ecranCv(p, finRue.x, finRue.y));
    const e1 = verifier('t', await apres(p), B);
    /* f : fiche de cet escalier */
    if (e1){
      await C.pause(p, 900);
      const L1 = Math.hypot(e1.v[1].x - e1.v[0].x, e1.v[1].y - e1.v[0].y), f0 = await ficheEsc(p);
      R.ok(!!f0 && !!f0.larg && f0.larg.val === '1,00' && !!f0.n && f0.n.val === e1.p.n && !!f0.long && f0.long.val === L1.toFixed(2).replace('.', ',') && !f0.long.off
        && f0.cote === '*Gauche | Droite' && f0.monte === 'Monte | *Descend' && !f0.etiq && !f0.inverser && f0.supprimer
        && /Largeur \(m\)/.test(f0.texte) && /Marches/.test(f0.texte) && /Longueur \(m\)/.test(f0.texte) && /Côté/.test(f0.texte) && /Sens/.test(f0.texte),
        'f : fiche : Largeur (m) « 1,00 », Marches, Longueur (m) depuis le plan, Côté Gauche | Droite, Sens Monte | Descend ; ni Étiquette, ni « Inverser » ; « Supprimer » (obtenu '
        + JSON.stringify(f0 && {larg: f0.larg, n: f0.n, long: f0.long, cote: f0.cote, monte: f0.monte, etiq: f0.etiq, inverser: f0.inverser, supprimer: f0.supprimer}) + ')');
      /* largeur */
      let j0 = await elements(p), u0 = await nUndo(p);
      const s1 = await saisirEsc(p, e1.id, 'larg', '1,5');
      R.ok(!!s1 && s1.e.p.larg === '1,50' && s1.champ === '1,50' && s1.undo === u0 + 1, 'f : Largeur 1,5 : p.larg « 1,50 » (deux décimales), un pas d\'annulation (obtenu '
        + JSON.stringify(s1 && {larg: s1.e.p.larg, champ: s1.champ, pas: s1.undo - u0}) + ')');
      await annuler(p);
      R.ok(await elements(p) === j0, 'f : Largeur : une annulation remet le croquis d\'avant (JSON)');
      await choisir(p, e1.id);
      const refus = async (k, vals, re, garde) => {
        const ko = [], uA = await nUndo(p), jA = await elements(p);
        for (const v of vals){
          const s = await saisirEsc(p, e1.id, k, v);
          if (!s || !re.test(s.toast) || s.champ !== garde || s.undo !== uA || await elements(p) !== jA) ko.push(v + ' → ' + JSON.stringify(s && {toast: s.toast, champ: s.champ, pas: s.undo - uA}));
        }
        return ko;
      };
      const r1 = await refus('larg', ['0,1', '-1', 'abc', '10,5'], /attendu.*0,30.*10,00/, '1,00');
      R.ok(!r1.length, 'f : Largeur « 0,1 », « -1 », « abc » et « 10,5 » refusées : toast qui nomme les bornes (0,30 à 10,00), valeur gardée, aucun pas d\'annulation'
        + (r1.length ? ' (écarts : ' + r1.join(' ; ') + ')' : ''));
      /* marches */
      j0 = await elements(p); u0 = await nUndo(p);
      const s2 = await saisirEsc(p, e1.id, 'n', '12');
      R.ok(!!s2 && s2.e.p.n === '12' && s2.undo === u0 + 1, 'f : Marches 12 : p.n « 12 », un pas d\'annulation (obtenu ' + JSON.stringify(s2 && {n: s2.e.p.n, pas: s2.undo - u0}) + ')');
      await annuler(p);
      R.ok(await elements(p) === j0, 'f : Marches : une annulation remet le croquis d\'avant (JSON)');
      await choisir(p, e1.id);
      const r2 = await refus('n', ['0', '61', '2,5', 'abc'], /attendu.*1 à 60/, e1.p.n);
      R.ok(!r2.length, 'f : Marches « 0 », « 61 », « 2,5 » et « abc » refusées : toast qui nomme les bornes (1 à 60), valeur gardée, aucun pas d\'annulation'
        + (r2.length ? ' (écarts : ' + r2.join(' ; ') + ')' : ''));
      /* longueur : la fin glisse sur la ligne départ-fin, le départ reste */
      j0 = await elements(p); u0 = await nUndo(p);
      const s3 = await saisirEsc(p, e1.id, 'long', '4,00'), v3 = s3 && s3.e.v;
      const t0 = {x: (e1.v[1].x - e1.v[0].x) / L1, y: (e1.v[1].y - e1.v[0].y) / L1}, L3 = v3 ? Math.hypot(v3[1].x - v3[0].x, v3[1].y - v3[0].y) : NaN;
      const x3 = v3 ? Math.abs(t0.x * (v3[1].y - v3[0].y) - t0.y * (v3[1].x - v3[0].x)) : NaN, sens3 = v3 ? t0.x * (v3[1].x - v3[0].x) + t0.y * (v3[1].y - v3[0].y) > 0 : false;
      R.ok(!!v3 && Math.abs(L3 - 4) < 1e-9 && x3 < 1e-9 && sens3 && v3[0].x === e1.v[0].x && v3[0].y === e1.v[0].y && v3[1].a === null && !('long' in s3.e.p) && s3.undo === u0 + 1
        && s3.champ === '4,00', 'f : Longueur 4,00 : fin à 4 m du départ sur la même direction (1e-9), départ inchangé, fin sans attache, p.long absent, un pas d\'annulation (obtenu '
        + (v3 ? L3.toFixed(12) + ' m, écart ' + expo(x3) + ', ' + JSON.stringify(s3.e.p) + ', ' + (s3.undo - u0) + ' pas' : 'pas de champ') + ')');
      await annuler(p);
      R.ok(await elements(p) === j0, 'f : Longueur : une annulation remet le croquis d\'avant (JSON)');
      await choisir(p, e1.id);
      const r3 = await refus('long', ['0,05', '51', '-2', 'abc'], /attendu.*0,10.*50,00/, L1.toFixed(2).replace('.', ','));
      R.ok(!r3.length, 'f : Longueur « 0,05 », « 51 », « -2 » et « abc » refusées : toast qui nomme les bornes (0,10 à 50,00), valeur gardée' + (r3.length ? ' (écarts : ' + r3.join(' ; ') + ')' : ''));
      /* côté */
      j0 = await elements(p); u0 = await nUndo(p);
      const g0 = await puceEsc(p, 'cote', 'Gauche'), uG = await nUndo(p), jG = await elements(p);
      const c1 = await puceEsc(p, 'cote', 'Droite'), ec = await elDoc(p, e1.id), uc = await nUndo(p), fc = await ficheEsc(p);
      R.ok(g0 && uG === u0 && jG === j0 && c1 && ec.p.cote === 'd' && uc === u0 + 1 && !!fc && fc.cote === 'Gauche | *Droite',
        'f : Côté : « Gauche », déjà choisie, ne change rien ; « Droite » : p.cote « d », un pas d\'annulation (obtenu ' + JSON.stringify([ec.p.cote, uG - u0, uc - u0, fc && fc.cote]) + ')');
      await annuler(p);
      R.ok(await elements(p) === j0, 'f : Côté : une annulation remet le croquis d\'avant (JSON)');
      await choisir(p, e1.id);
      /* sens : l'escalier monte vers le départ (« Descend ») ; « Monte », puis « Descend » */
      j0 = await elements(p); u0 = await nUndo(p);
      const m1 = await puceEsc(p, 'monte', 'Monte'), em1 = await elDoc(p, e1.id), jM = await elements(p);
      const m2 = await puceEsc(p, 'monte', 'Descend'), em2 = await elDoc(p, e1.id), uM = await nUndo(p);
      R.ok(m1 && m2 && em1.p.monte === 'fin' && em2.p.monte === 'depart' && uM === u0 + 2, 'f : Sens « Monte » : p.monte « fin » ; « Descend » : p.monte « depart » ; un pas d\'annulation chacun (obtenu '
        + JSON.stringify([em1.p.monte, em2.p.monte, uM - u0]) + ')');
      await annuler(p); const jM2 = await elements(p); await annuler(p);
      R.ok(jM2 === jM && await elements(p) === j0, 'f : Sens : chaque annulation remet le croquis d\'avant le changement (JSON)');
    }
    /* z : second toucher au départ ; « Point » retire le départ ; deux points confondus : aucun escalier */
    await repartir(p, centre);
    const n0 = A.erreurs.length;
    await C.toucherCv(p, await C.ecranCv(p, B.so.x, B.so.y));
    const pt = await p.$('.vc .vc-aide:not([hidden]) button[data-a="retirerPoint"]'); if (pt){ await pt.click(); await C.pause(p, 700); }
    const sP = await apres(p), aideP = await texteAide(p);
    R.ok(!!pt && !sP.brouillon && sP.n === 0 && aideP.indexOf('Escalier : touchez le départ') === 0, 'z : « Point » retire le départ : plus rien en attente, barre d\'aide du départ (obtenu '
      + JSON.stringify([!!pt, sP.brouillon, aideP]) + ')');
    await C.toucherCv(p, await C.ecranCv(p, B.so.x, B.so.y)); await effacerToast(p);
    await C.toucherCv(p, await C.ecranCv(p, B.so.x, B.so.y));
    const s2 = await apres(p), ts = await toastVu(p);
    R.ok(s2.n === 0 && !s2.brouillon && A.erreurs.length === n0, 'z : second toucher au départ : aucun escalier, plus rien en attente, aucune exception (toast ' + JSON.stringify(ts) + ')');
    const sF = await p.evaluate(() => {
      const ed = window.__vcEd, S = ed.etat, u = S.undo.length, q = {x: 5, y: 5, snap: null, aide: 'coin', doigt: null};
      S.brouillon = {outil: 'esc', pts: [q, Object.assign({}, q, {aide: null})]};
      let err = null; try { ed.terminerTrace(); } catch (e){ err = e.message; }
      return {err, n: ed.doc().el.length, pas: S.undo.length - u, brouillon: !!S.brouillon};
    });
    R.ok(!sF.err && sF.n === 0 && sF.pas === 0 && !sF.brouillon, 'z : fin confondue avec le départ (terminerTrace) : aucun escalier, aucun pas d\'annulation, sans exception (obtenu ' + JSON.stringify(sF) + ')');
    /* g : au glissé du doigt, de l'appui (le coin) au lever (vers la rue), avec l'aide « Tracer en glissant le doigt » (active d'origine) :
       même résultat */
    await repartir(p, centre);
    const gl = await p.evaluate(() => { const A = window.__vcEd.etat.aides; return A.actives !== false && A.glisser !== false; });
    R.ok(gl, 'g : l\'aide « Tracer en glissant le doigt » est active (' + gl + ')');
    const qDg = await C.ecranCv(p, B.so.x, B.so.y), qFg = await C.ecranCv(p, finRue.x, finRue.y);
    let chG = [];
    await C.glisserDoigtCv(p, qDg, qFg, 600, {avantLever: async () => { await releverDebut(p); await p.evaluate(() => window.__vcEd.redessiner()); await C.pause(p, 150); chG = await releverFin(p); }});
    R.ok(fantome(chG, qDg, qFg), 'g : pendant le glissé du doigt, le contour fantôme suit le doigt (' + chG.filter(c => c.ferme && c.tirets).length + ' chemin fermé en tirets relevé)');
    verifier('g', await apres(p), B);
    /* c : le long de la façade sud vers l'est : le côté gauche entrerait dans le bâti, l'escalier va à droite */
    await repartir(p, centre);
    await C.toucherCv(p, await C.ecranCv(p, B.so.x, B.so.y)); await C.toucherCv(p, await C.ecranCv(p, finFacade.x, finFacade.y));
    const rc = await apres(p), ecs = rc.e, aS = angle(B.so, B.se), ac = ecs && ecs.v.length === 2 ? Math.abs(normAng(angle(ecs.v[0], ecs.v[1]) - aS)) : NaN;
    R.ok(rc.nEsc === 1 && !!ecs && ecs.p.cote === 'd' && ecs.p.monte === 'depart' && rc.dedans === false && ac < 1e-3, 'c : le long de la façade sud vers l\'est : à droite (le côté gauche '
      + 'entrerait dans le bâti), contour hors du bâti, montée vers le départ (obtenu ' + JSON.stringify(ecs && ecs.p) + ', écart à la façade ' + expo(ac) + ' rad, contour dans le bâti : ' + rc.dedans + ')');
    /* v : à la souris, entre les deux points, le contour fantôme suit le pointeur ; au doigt, seul le départ est marqué ; pendant un glissé */
    await repartir(p, centre);
    const qD = await C.ecranCv(p, B.so.x, B.so.y);
    await C.cliquerCv(p, qD);
    const qF = await C.ecranCv(p, finRue.x, finRue.y), qD2 = await C.ecranCv(p, B.so.x, B.so.y);
    await releverDebut(p); await C.survolerCv(p, qF); await C.pause(p, 150);
    const ch1 = await releverFin(p), nb1 = await p.evaluate(() => window.__vcEd.etat.brouillon ? window.__vcEd.etat.brouillon.pts.length : 0);
    R.ok(nb1 === 1 && fantome(ch1, qD2, qF), 'v : à la souris, départ posé, survol vers la rue : le contour fantôme de l\'escalier est dessiné (chemin fermé en tirets, 1 m de large) sans '
      + 'autre geste (' + ch1.filter(c => c.ferme).length + ' chemin fermé relevé, ' + nb1 + ' point en attente)');
    /* survol à la souris, puis départ posé au doigt sans nouveau survol : la position de survol restée d'avant n'y fait rien */
    await repartir(p, centre);
    const qD3 = await C.ecranCv(p, B.so.x, B.so.y), qF3 = await C.ecranCv(p, finRue.x, finRue.y), qF3b = {x: qF3.x + 8, y: qF3.y + 4};
    await C.survolerCv(p, qF3); await C.toucherCv(p, qD3);
    await releverDebut(p); await p.evaluate(() => window.__vcEd.redessiner()); await C.pause(p, 150);
    const ch2 = await releverFin(p), nb2 = await p.evaluate(() => window.__vcEd.etat.brouillon ? window.__vcEd.etat.brouillon.pts.length : 0);
    R.ok(nb2 === 1 && !ch2.some(c => c.ferme && c.tirets && c.pts.length === 4 && Math.hypot(c.pts[0].x - qD3.x, c.pts[0].y - qD3.y) < 1.5), 'v : au doigt, entre deux touchers : '
      + 'seul le départ est marqué, aucun contour fantôme, même avec la souris restée sur le plan après un survol (' + nb2 + ' point en attente, '
      + ch2.filter(c => c.ferme && c.tirets).length + ' chemin fermé en tirets)');
    /* départ posé au doigt, puis la souris bouge (écran tactile et souris sur le même appareil) : le contour suit de nouveau la souris */
    await releverDebut(p); await C.survolerCv(p, qF3b); await C.pause(p, 150);
    const ch2b = await releverFin(p);
    R.ok(fantome(ch2b, qD3, qF3b), 'v : départ posé au doigt, puis survol à la souris : le contour fantôme suit la souris (' + ch2b.filter(c => c.ferme && c.tirets).length
      + ' chemin fermé en tirets relevé)');
    await repartir(p, centre);
    const qD4 = await C.ecranCv(p, B.so.x, B.so.y), qF4 = await C.ecranCv(p, finRue.x, finRue.y);
    let ch3 = [];
    await C.glisserSourisCv(p, qD4, qF4, 'left', {avantLever: async () => { await releverDebut(p); await p.evaluate(() => window.__vcEd.redessiner()); await C.pause(p, 150); ch3 = await releverFin(p); }});
    const r4 = await apres(p);
    R.ok(fantome(ch3, qD4, qF4) && r4.nEsc === 1 && !!r4.e && r4.e.p.monte === 'depart', 'v : glissé à la souris : contour fantôme pendant le glissé, escalier créé au lever ('
      + ch3.filter(c => c.ferme).length + ' chemin fermé relevé, ' + r4.nEsc + ' escalier)');
    /* r : fiche d'un escalier non dessiné : ses champs restent, pour le réparer ; Longueur grisée si départ et fin sont confondus */
    const vC = await C.vue(p), cx = vC.cx, cy = vC.cy;
    await C.injecter(p, {el: [esc('E5', [cx + 2, cy + 2], [cx + 2, cy + 2]), esc('E6', [cx - 2, cy - 1], [cx + 1, cy - 1], {larg: '0'})]});
    await choisir(p, 'E5');
    const fn5 = await ficheEsc(p);
    await choisir(p, 'E6');
    const fn6 = await ficheEsc(p), s6 = await saisirEsc(p, 'E6', 'larg', '1,20');
    await C.pause(p, 300);
    const fn6b = await ficheEsc(p);
    R.ok(!!fn5 && !!fn5.larg && !!fn5.n && !!fn5.long && fn5.long.off && !fn5.larg.off && /départ et fin confondus/.test(fn5.texte),
      'r : départ et fin confondus : fiche avec ses champs, Longueur grisée (obtenu ' + JSON.stringify(fn5 && {larg: fn5.larg, n: fn5.n, long: fn5.long}) + ')');
    R.ok(!!fn6 && !!fn6.larg && fn6.larg.val === '0' && !!fn6.long && !fn6.long.off && !!s6 && s6.e.p.larg === '1,20' && !!fn6b && /largeur 1,20 m/.test(fn6b.texte),
      'r : largeur illisible (« 0 ») : champs montrés avec la valeur gardée ; Largeur 1,20 répare l\'escalier, de nouveau dessiné (obtenu '
      + JSON.stringify([fn6 && fn6.larg, s6 && s6.e.p.larg, fn6b && fn6b.texte.slice(0, 80)]) + ')');
    erreurs(A, 'o, t, f, z, g, c, v, r');
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [editeur, poignees, outilEscalier]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
