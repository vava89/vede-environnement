// Escalier et types inconnus dans l'éditeur du croquis, dans Chromium (données fictives, fond fictif de VCroquis.demoDxf()) : correctif
// m106 (souhait 12, première partie, et défaut D11 ; décisions D3 et D7 de .claude/conception-outils-dessin.md). m107 ajoutera l'outil.
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

(async () => {
  for (const f of [editeur, poignees]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
