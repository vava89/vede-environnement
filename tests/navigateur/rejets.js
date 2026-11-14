// Rejets du lot « Rejets » dans l'éditeur du croquis, dans Chromium (décisions D2, D8 et D10 de .claude/conception-rejets.md ; m117, m118).
// Données fictives : fond de VCroquis.demoDxf() (12 rue Fictive, Ville-Exemple), croquis vidé, plan tourné d'un demi-radian.
// n1 : témoin d'abord : outil Regard, « Cotes », la façade sud du bâti, puis un endroit au-delà du coin ouest : l'aperçu de pose (le symbole
//     fantôme au point calculé) d'un type non orienté reste penché, de la rotation du plan. Puis « Infiltration au sol » est dans la palette
//     Équipements, juste après « Puisard » ; outil choisi par la palette, les mêmes cotes : le panneau dit « Infiltration au sol posée depuis :
//     Façade » ; l'aperçu est droit à l'écran : une tige verticale et trois barres horizontales, en vert. Après « Poser » : une infiltration
//     sans angle propre (p.a), droite sur le plan. Aucune erreur dans la console.
// Échoue sur 2f3faa1 (type « infiltration » absent), sauf le témoin du regard et l'absence d'erreur dans la console.
// Bouton « Rejet au sol » de la fiche d'une source EP qu'aucun tronçon ne tient (décision D10 ; m118), sur le même croquis vidé :
// b1 : descente à 0,5 m devant la façade sud du bâti : sa fiche montre le bouton ; après un toucher, une infiltration à 1 m ± 0,05 de la
//     descente, hors du bâti et plus loin de lui qu'elle, et un tronçon sans réseau attaché aux deux, en EP ; descente « ok:SOL » ;
//     l'infiltration est choisie. Sans le type (comme une v1.7.0) : descente « sansexu », pas de « Réseau EP départemental (présumé) » au
//     constat déduit. Ni la descente désormais reliée, ni une descente reliée d'avance, ni un WC ou un siphon de garage (EU) n'ont le
//     bouton ; une grille et un siphon de sol l'ont ; « Annuler » rend le dessin d'avant.
// b2 : descente « Projet » à 0,5 m de la façade et à 0,5 m d'un regard posé devant elle : l'infiltration tombe à plus de 0,6 m de tout
//     objet [p], hors du bâti ; elle et son tronçon sont « Projet », comme la descente.
// b3 [p] : descente posée sur la façade : l'infiltration à 1 m devant le mur, hors du bâti ; descente loin de tout bâti (au milieu de la
//     rue) : l'infiltration à 1 m sous elle, vers le bas de l'écran (plan tourné) ; fond masqué [p] : ni façade ni bâti, une descente à
//     0,5 m de la façade a aussi son infiltration 1 m sous elle à l'écran.
// b4 : bâtis fictifs ajoutés au fond de démonstration. Descente posée au coin rentrant d'un L ouvert à 91° : l'infiltration à 1 m, hors du
//     bâti et à plus de 0,25 m de ses côtés (l'essai dans le sens du rejet tombe sur l'autre mur : 1,7 cm). Descente sur la façade d'un
//     bâti, face à un autre bâti à 0,8 m : les essais à 0° et ±30° tombent dans l'autre bâti, l'infiltration est dans le passage, hors
//     des deux bâtis, à plus de 0,25 m de leurs côtés.
// b5 : descente sur un côté d'une extension dessinée en « Complément du fond », en trait fermé puis en trait ouvert en U, chacun tracé
//     dans un sens puis dans l'autre : l'infiltration à 1 m, hors de l'extension, à plus de 0,25 m du trait. Un trait fermé qui entoure
//     la descente (une limite, par exemple) ne compte pas comme un bâti : l'infiltration est à 1 m devant la façade, comme sans lui.
// b1 à b5 échouent sur ab926ec (pas de bouton), sauf l'absence du bouton sur une descente reliée, un WC et un siphon de garage, et
// l'absence d'erreur dans la console. Sans l'écart des essais à 0,25 m ou moins d'un côté, le coin rentrant de b4 échoue (1,7 cm du
// mur) ; sans le sens tiré du trait de complément (normale extérieure du trait fermé, sinon à l'opposé de son centre), le trait fermé
// tracé dans le sens trigonométrique et le U tracé à l'envers de b5 échouent (l'infiltration tombe dans l'extension).
// usage : node tests/navigateur/rejets.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('rejets');

/* repère de la démonstration (VCroquis.demoDxf) : origine et rotation du bâti */
const DEMO = {x: 1700000, y: 8200000, th: 12 * Math.PI / 180};
const demoAbs = (u, v) => ({x: DEMO.x + u * Math.cos(DEMO.th) - v * Math.sin(DEMO.th), y: DEMO.y + u * Math.sin(DEMO.th) + v * Math.cos(DEMO.th)});
const ROT = .5, VERT = '#00a050';

/* polyligne fermée du calque de bâti 3BATIDUR (DXF R12), sommets uv dans le repère de la démonstration */
function batiDxf(uv){
  const L = [], g = (c, v) => L.push(('   ' + c).slice(-3), String(v));
  g(0, 'POLYLINE'); g(8, '3BATIDUR'); g(66, 1); g(10, '0.0'); g(20, '0.0'); g(30, '0.0'); g(70, 1);
  uv.forEach(q => { const a = demoAbs(q[0], q[1]); g(0, 'VERTEX'); g(8, '3BATIDUR'); g(10, a.x.toFixed(3)); g(20, a.y.toFixed(3)); g(30, '0.0'); });
  g(0, 'SEQEND'); g(8, '3BATIDUR');
  return L.join('\r\n') + '\r\n';
}
/* dossier neuf, croquis sur le fond de démonstration (plus les bâtis fictifs batis, polygones du repère de la démonstration), vidé, plan
   et vue tournés de ROT ; A.plan(u, v) : point de la démonstration dans le repère du croquis ; A.uv(q) : l'inverse */
async function croquisTourne(batis){
  const A = await C.ouvrir(), p = A.p;
  await C.etudeEtDossier(p);
  if (!batis) await C.ouvrirCroquis(p);
  else {
    await p.click('[data-act="vc-ouvrir"]');
    await p.waitForSelector('#modal-root input[data-m="dxf"]', {state: 'attached'});
    const dxf0 = await p.evaluate(() => window.VCroquis.demoDxf()), i = dxf0.lastIndexOf('  0\r\nENDSEC');
    const dxf = dxf0.slice(0, i) + batis.map(batiDxf).join('') + dxf0.slice(i);
    await p.setInputFiles('#modal-root input[data-m="dxf"]', {name: 'plan-fictif.dxf', mimeType: 'application/octet-stream', buffer: Buffer.from(dxf, 'utf8')});
    await p.waitForFunction(() => window.__vcEd && window.__vcEd.doc() && window.__vcEd.etat.fond);
    await C.pause(p, 400);
  }
  const o = await p.evaluate(() => window.__vcEd.etat.doc.origine);
  A.plan = (u, v) => { const a = demoAbs(u, v); return {x: a.x - o.x, y: a.y - o.y}; };
  A.uv = q => { const x = q.x + o.x - DEMO.x, y = q.y + o.y - DEMO.y; return {u: x * Math.cos(DEMO.th) + y * Math.sin(DEMO.th), v: -x * Math.sin(DEMO.th) + y * Math.cos(DEMO.th)}; };
  await p.evaluate(rot => {
    const ed = window.__vcEd, S = ed.etat;
    S.doc.el = []; S.doc.anomManu = []; S.doc.decisions = {}; S.doc.ordre = []; S.doc.rot = rot;
    S.undo = []; S.redo = []; S.sel = null; S.panneau = null; S.dernierePose = null; S.dernierTap = null; S.finAuto = null; S.gardeFiche = null;
    ed.synchroniser(); S.vue.rot = rot;
  }, ROT);
  await vue(A);
  return A;
}
/* vue centrée sur le bâti, à 40 px par mètre */
async function vue(A){ const c = A.plan(70, 6); await C.regler(A.p, c.x, c.y, 40); }

/* espion du canevas : chemins courts (2 à 7 points, en pixels du canevas) tracés, avec la couleur du trait */
const espionner = p => p.evaluate(() => {
  window.__espR = [];
  const P = CanvasRenderingContext2D.prototype; if (P.__espRejets) return; P.__espRejets = true;
  const o = {beginPath: P.beginPath, moveTo: P.moveTo, lineTo: P.lineTo, stroke: P.stroke}; let cur = null;
  P.beginPath = function(){ cur = []; return o.beginPath.apply(this, arguments); };
  P.moveTo = function(x, y){ if (cur && cur.length < 8) cur.push([x, y]); return o.moveTo.apply(this, arguments); };
  P.lineTo = function(x, y){ if (cur && cur.length < 8) cur.push([x, y]); return o.lineTo.apply(this, arguments); };
  P.stroke = function(){ const E = window.__espR; if (E && cur && cur.length >= 2 && cur.length < 8 && E.length < 4000) E.push({pts: cur.slice(), coul: String(this.strokeStyle)}); return o.stroke.apply(this, arguments); };
});
/* canevas redessiné sous l'espion : chemins tracés à moins de r px du point s */
async function tracesPres(p, s, r){
  await espionner(p);
  await p.evaluate(() => { window.__espR = []; window.__vcEd.redessiner(); });
  await C.pause(p, 150);
  const E = await p.evaluate(() => { const E = window.__espR || []; window.__espR = null; return E; });
  return E.filter(t => t.pts.every(q => Math.hypot(q[0] - s.x, q[1] - s.y) <= r));
}
/* point du fantôme de l'aperçu de pose, en pixels du canevas (comme dessinerCotes) */
const pointApercu = p => p.evaluate(() => {
  const S = window.__vcEd.etat, K = S.cotes; if (!K || K.etape !== 'saisie' || !K.c) return null;
  const c = Object.assign({}, K.c); if (K.essai) c[K.essai.k] = K.essai.v;
  const P = window.VCroquis.geo.placer(K.ref, c); return P ? S.vue.ecran(P.x, P.y) : null;
});
const texteAide = p => p.evaluate(() => { const a = document.querySelector('.vc .vc-aide'); return a && !a.hidden ? a.textContent.replace(/\s+/g, ' ').trim() : ''; });
const textePanneau = p => p.evaluate(() => { const c = document.querySelector('.vc .vc-panneau:not([hidden]) .vc-pcorps'); return c ? c.textContent.replace(/\s+/g, ' ').trim() : ''; });
async function toucherPlan(p, q){ await C.toucherCv(p, await C.ecranCv(p, q.x, q.y)); }
async function entrerCotes(p){ const b = await p.$('.vc .vc-aide button[data-a="cotes"]'); if (!b) return false; await b.click(); await C.pause(p, 300); return true; }
const elements = p => p.evaluate(() => JSON.parse(JSON.stringify(window.__vcEd.doc().el)));
/* chemin à deux points vertical ou horizontal (à 0,01 px près) */
const vertical = t => t.pts.length === 2 && Math.abs(t.pts[0][0] - t.pts[1][0]) < .01;
const horizontal = t => t.pts.length === 2 && Math.abs(t.pts[0][1] - t.pts[1][1]) < .01;
const angles = L => L.map(t => Math.round(Math.atan2(-(t.pts[1][1] - t.pts[0][1]), t.pts[1][0] - t.pts[0][0]) * 180 / Math.PI) + '° ' + t.coul).join(', ') || 'aucun trait';
/* symbole droit : quatre traits verts, une tige verticale, trois barres horizontales */
const droit = L => { const v = L.filter(t => t.coul === VERT); return v.length === 4 && v.filter(vertical).length === 1 && v.filter(horizontal).length === 3; };

/* aperçu de pose de l'outil courant, par « Cotes » : la façade sud, puis un endroit au-delà du coin ouest ; rend le point du fantôme */
async function apercuCotes(A){
  const p = A.p;
  if (!await entrerCotes(p)) return null;
  await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(63.2, 3.3));
  return pointApercu(p);
}
/* n1 : témoin du regard, palette, panneau, aperçu de pose et pose, plan tourné */
async function apercu(){
  const A = await croquisTourne(), p = A.p;
  try {
    /* témoin : l'aperçu d'un regard, type non orienté, reste penché de la rotation du plan */
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 150);
    const eR = await apercuCotes(A), g = eR ? (await tracesPres(p, eR, 1.6 * await C.rayonPx(p, 'regard'))).filter(t => t.pts.length === 4) : [];
    const penche = g.length === 1 && [0, 1, 2].every(k => Math.abs(g[0].pts[k + 1][0] - g[0].pts[k][0]) > 1 && Math.abs(g[0].pts[k + 1][1] - g[0].pts[k][1]) > 1);
    R.ok(penche, 'n1 témoin, plan tourné de 0,5 rad : l\'aperçu de pose d\'un regard reste penché ('
      + (g.length ? g.map(t => t.pts.map(q => q.map(v => v.toFixed(1)).join(';')).join(' ')).join(' | ') : eR ? 'aucun carré' : 'pas d\'aperçu') + ')');
    await p.evaluate(() => { for (let k = 0; k < 5 && window.__vcEd.fermerNiveau(); k++); });
    await C.outil(p, {k: 'main'}); await vue(A);
    /* palette Équipements : l'ordre des boutons ; l'outil choisi par son bouton (sans bouton, par l'éditeur, pour mesurer l'aperçu) */
    await p.click('.vc .vc-o[data-pal="equ"]'); await C.pause(p, 200);
    const items = await p.evaluate(() => Array.from(document.querySelectorAll('.vc .vc-pitem')).map(b => b.dataset.item + '=' + b.textContent.trim()));
    const i = items.indexOf('pt:puisard=Puisard'), b = await p.$('.vc .vc-pitem[data-item="pt:infiltration"]');
    R.ok(i >= 0 && items[i + 1] === 'pt:infiltration=Infiltration au sol' && !!b, 'n1 palette Équipements : « Infiltration au sol » juste après « Puisard » (' + items.join(', ') + ')');
    if (b){ await b.click(); await C.pause(p, 200); }
    else { await p.evaluate(() => { try { window.__vcEd.choisirOutil({k: 'pt', t: 'infiltration', pal: 'equ'}); } catch (e){} }); await C.pause(p, 200); }
    const outil = await p.evaluate(() => { const o = window.__vcEd.etat.outil; return o.k + ':' + o.t; });
    const eP = await apercuCotes(A), tp = await textePanneau(p);
    R.ok(outil === 'pt:infiltration' && /Infiltration au sol posée depuis : Façade/.test(tp), 'n1 outil ' + outil + ', « Cotes », façade sud, endroit : « Infiltration au sol posée depuis : Façade » ('
      + JSON.stringify(tp.slice(0, 80)) + ')');
    const r = 1.05 * await C.rayonPx(p, 'infiltration'), L = eP ? await tracesPres(p, eP, r) : [];
    R.ok(!!eP && droit(L), 'n1 aperçu de pose, plan tourné : symbole droit, une tige verticale et trois barres horizontales, en vert ('
      + (eP ? angles(L) : 'pas d\'aperçu') + ')');
    /* « Poser » : l'infiltration, sans angle propre, droite sur le plan */
    const els0 = await elements(p), poser = await p.$('.vc .vc-panneau:not([hidden]) .vc-pcorps button[data-a="cotesPoser"]');
    if (poser){ await poser.click(); await C.pause(p, 400); }
    const nv = (await elements(p)).filter(e => !els0.some(x => x.id === e.id)), o = nv.length === 1 ? nv[0] : null;
    const L2 = o ? await tracesPres(p, await C.ecranCv(p, o.x, o.y), r) : [];
    R.ok(!!o && o.t === 'infiltration' && !('a' in o.p) && droit(L2), 'n1 « Poser » : une infiltration sans angle propre, droite sur le plan ('
      + (o ? o.t + ', p ' + JSON.stringify(o.p) + ' ; ' + angles(L2) : nv.length + ' nouvel élément') + ')');
    R.ok(!A.erreurs.length, 'n1 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* --- bouton « Rejet au sol » (b1 à b3) --- */
/* fiche de l'élément id, ouverte par l'éditeur ; bouton « Rejet au sol » de la fiche ouverte (null sans lui) */
async function fiche(p, id){ await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 300); }
const boutonRejet = p => p.$('.vc .vc-panneau:not([hidden]) .vc-pcorps button[data-a="rejetSol"]');
/* le dessin, comme l'annulation le garde : éléments, décisions, ordre, anomalies saisies à la main */
const etatDessin = p => p.evaluate(() => { const d = window.__vcEd.doc(); return JSON.stringify({el: d.el, decisions: d.decisions, ordre: d.ordre, anomManu: d.anomManu}); });
/* point q (repère du croquis) et lignes de référence de nature nat ('bati', par défaut : bâti du fond, même masqué ; 'complement' : traits
   « Complément du fond ») : distance au côté le plus proche, et q dans une de ces lignes fermée */
const auBati = (p, q, nat) => p.evaluate(([q, nat]) => {
  const S = window.__vcEd.etat, V = window.VCroquis, off = V.decalageFond(S.fond, S.doc) || {x: 0, y: 0}, cpl = nat === 'complement';
  let d = Infinity, dedans = false;
  (V.geo.lignesRef(cpl ? S.doc : null, cpl ? null : S.fond, off, [nat]) || []).forEach(l => {
    for (let k = 1; k < l.P.length; k++) d = Math.min(d, V.outils.projSeg(q, l.P[k - 1], l.P[k]).d);
    if (l.ferme && l.aire !== 0 && V.geo.dansPolygone(q, l.P) === true) dedans = true;
  });
  return {d, dedans};
}, [q, nat || 'bati']);
/* bouton de la fiche de la source id touché : les éléments nouveaux (l'infiltration, le tronçon), ce que l'analyse en tire et la fiche ouverte */
async function rejeter(p, id){
  await fiche(p, id);
  const b = await boutonRejet(p), els0 = await elements(p);
  if (b){ await b.click(); await C.pause(p, 400); }
  const nv = (await elements(p)).filter(e => !els0.some(x => x.id === e.id)), inf = nv.find(e => e.t === 'infiltration') || null, tr = nv.find(e => e.k === 'ln') || null;
  const an = await p.evaluate(([id, tid]) => { const S = window.__vcEd.etat, r = S.an.resObj[id];
    return {etat: r ? r.etat + ':' + r.res : '-', pieces: Object.keys(S.an.resPiece).filter(k => tid && k.indexOf(tid + ':') === 0).map(k => S.an.resPiece[k].res), sel: S.sel && S.sel.id}; }, [id, tr && tr.id]);
  return {bouton: !!b, nv, inf, tr, an, panneau: await textePanneau(p)};
}
const dist = (a, b) => a && b ? Math.hypot(a.x - b.x, a.y - b.y) : NaN;
const f2 = v => isFinite(v) ? v.toFixed(2) : String(v);
/* b1 : descente à 0,5 m devant la façade sud ; WC et descente reliée d'avance, loin d'elle */
async function boutonRejetSol(){
  const A = await croquisTourne(), p = A.p;
  try {
    const qD = A.plan(70, 3.5), qW = A.plan(80, 18), qD2 = A.plan(83, 19), qR2 = A.plan(83, 17);
    const els = [C.P('D', 'descente', qD.x, qD.y, {cote: 'avant', visitable: 'oui'}), C.P('W', 'wc', qW.x, qW.y), C.P('D2', 'descente', qD2.x, qD2.y, {cote: 'avant', visitable: 'oui'}),
      C.P('R2', 'regard', qR2.x, qR2.y, {tampon: 'fonte', cunette: 'oui', acces: 'oui'})];
    /* une grille, un siphon de sol (EP) et un siphon de garage (EU), dans la rue, loin des autres */
    [['G', 'grille', 56], ['SS', 'siphon_sol', 59], ['SG', 'siphon_garage', 62]].forEach(([id, t, u]) => { const q = A.plan(u, -5); els.push(C.P(id, t, q.x, q.y)); });
    els.push(C.L('T2', 'tr', ['D2', 'R2'], C.index(els)));
    await C.injecter(p, {el: els}); await vue(A);
    const avant = await etatDessin(p), o = await rejeter(p, 'D'), D = (await elements(p)).find(e => e.id === 'D');
    R.ok(o.bouton, 'b1 fiche d\'une descente qu\'aucun tronçon ne tient : bouton « Rejet au sol »');
    const bD = await auBati(p, D), bI = o.inf ? await auBati(p, o.inf) : null;
    R.ok(o.nv.length === 2 && !!o.inf && !!o.tr && Math.abs(dist(o.inf, D) - 1) <= .05 && !!bI && !bI.dedans && bI.d > bD.d,
      'b1 après le bouton : une infiltration à 1 m ± 0,05 de la descente, hors du bâti et plus loin de lui qu\'elle ('
      + o.nv.map(e => e.k + ':' + e.t).join(', ') + (o.inf ? ' ; à ' + f2(dist(o.inf, D)) + ' m de la descente, ' + f2(bI.d) + ' m du bâti' + (bI.dedans ? ' (dedans)' : '') + ', la descente ' + f2(bD.d) + ' m' : '') + ')');
    const t = o.tr, att = !!t && !!o.inf && t.t === 'tr' && t.v.length === 2 && t.v[0].a === 'D' && t.v[1].a === o.inf.id && dist(t.v[0], D) < 1e-9 && dist(t.v[1], o.inf) < 1e-9;
    R.ok(att && t.p.res === '' && o.an.pieces.length > 0 && o.an.pieces.every(r => r === 'EP') && o.an.etat === 'ok:SOL',
      'b1 tronçon sans réseau, attaché à la descente et à l\'infiltration, en EP ; descente ok:SOL ('
      + (t ? t.t + ', res ' + JSON.stringify(t.p.res) + ', sommets ' + t.v.map(v => v.a).join(' > ') + ', pièces ' + o.an.pieces.join(' ') : 'pas de tronçon') + ' ; ' + o.an.etat + ')');
    R.ok(!!o.inf && !!t && o.inf.p.st === 'existant' && t.p.st === 'existant' && o.an.sel === o.inf.id && /Infiltration au sol/.test(o.panneau),
      'b1 statut de la descente (existant) pour les deux ; l\'infiltration est choisie, sa fiche ouverte (' + (o.inf ? o.inf.p.st + ', ' + (t ? t.p.st : '-') : '-') + ' ; choix '
      + o.an.sel + ' ; ' + JSON.stringify(o.panneau.slice(0, 40)) + ')');
    /* étiquette de l'infiltration : posée et affichée, son texte tiré de l'analyse */
    const etq = o.inf ? await p.evaluate(id => { const S = window.__vcEd.etat, e = S.doc.el.find(x => x.id === id); return e ? {lab: e.lab, txt: window.VCroquis.texteEtiquette(e, S.an)} : null; }, o.inf.id) : null;
    R.ok(!!etq && !!etq.lab && !etq.lab.off && etq.txt === 'Infiltration au sol', 'b1 étiquette de l\'infiltration posée et affichée : « Infiltration au sol » (' + JSON.stringify(etq) + ')');
    /* comme une v1.7.0 : le type inconnu devient une extrémité libre, au bout d'un tronçon sans réseau */
    const v17 = await p.evaluate(() => {
      const V = window.VCroquis, ty = V.TYPES.infiltration, d = JSON.parse(JSON.stringify(window.__vcEd.doc()));
      delete V.TYPES.infiltration;
      try { const an = V.analyser(d, 'edl'), cd = V.constatDeduit(d, an), r = an.resObj.D; return {etat: r ? r.etat : '-', libs: [].concat(...cd.rows.map(x => x.libs))}; }
      catch (e){ return {etat: 'exception ' + e.message, libs: []}; }
      finally { V.TYPES.infiltration = ty; }
    });
    R.ok(!!o.inf && v17.etat === 'sansexu' && v17.libs.indexOf('Réseau EP départemental (présumé)') < 0,
      'b1 sans le type (comme une v1.7.0) : descente sansexu, pas de « Réseau EP départemental (présumé) » au constat (' + v17.etat + ' ; ' + JSON.stringify(v17.libs) + ')');
    /* pas de bouton : la descente désormais reliée, une descente reliée d'avance, un WC */
    const sans = [];
    for (const id of ['D', 'D2', 'W', 'SG']){ await fiche(p, id); if (await boutonRejet(p)) sans.push(id); }
    R.ok(!sans.length, 'b1 pas de bouton sur la descente désormais reliée, ni sur une descente reliée d\'avance, ni sur un WC ou un siphon de garage (EU)'
      + (sans.length ? ' (bouton : ' + sans.join(', ') + ')' : ''));
    const avec = [];
    for (const id of ['G', 'SS']){ await fiche(p, id); if (await boutonRejet(p)) avec.push(id); }
    R.ok(avec.length === 2, 'b1 une grille et un siphon de sol qu\'aucun tronçon ne tient ont le bouton' + (avec.length < 2 ? ' (bouton : ' + (avec.join(', ') || 'aucun') + ')' : ''));
    const bA = await p.$('.vc .vc-barre [data-a="annuler"]:not([disabled])');
    if (bA){ await bA.click(); await C.pause(p, 300); }
    const apres = await etatDessin(p);
    R.ok(!!o.inf && !!bA && apres === avant, 'b1 « Annuler » retire l\'infiltration et le tronçon : le dessin d\'avant ('
      + (!bA ? '« Annuler » inactif' : apres === avant ? 'identique' : (await elements(p)).length + ' éléments') + ')');
    R.ok(!A.erreurs.length, 'b1 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}
/* b2 : descente « Projet » à 0,5 m devant la façade, regard à 0,5 m devant elle : là où l'infiltration irait d'abord */
async function rejetPresDunRegard(){
  const A = await croquisTourne(), p = A.p;
  try {
    const qD = A.plan(70, 3.5), qR = A.plan(70, 3);
    await C.injecter(p, {el: [C.P('D', 'descente', qD.x, qD.y, {cote: 'avant', visitable: 'oui', st: 'projet'}), C.P('R', 'regard', qR.x, qR.y, {tampon: 'fonte', cunette: 'oui', acces: 'oui'})]});
    await vue(A);
    const o = await rejeter(p, 'D'), els = await elements(p), D = els.find(e => e.id === 'D');
    const proches = o.inf ? els.filter(e => e.k === 'pt' && e.id !== o.inf.id).map(e => e.id + ' ' + f2(dist(e, o.inf))) : [], bI = o.inf ? await auBati(p, o.inf) : null;
    R.ok(o.bouton && !!o.inf && Math.abs(dist(o.inf, D) - 1) <= .05 && els.every(e => e.k !== 'pt' || e.id === o.inf.id || dist(e, o.inf) > .6) && !bI.dedans,
      'b2 descente à 0,5 m d\'un regard : l\'infiltration à 1 m d\'elle, à plus de 0,6 m de tout objet, hors du bâti ('
      + (o.inf ? 'distances ' + proches.join(', ') + (bI.dedans ? ' ; dans le bâti' : '') : o.bouton ? 'pas d\'infiltration' : 'pas de bouton') + ')');
    R.ok(!!o.inf && !!o.tr && o.inf.p.st === 'projet' && o.tr.p.st === 'projet', 'b2 descente « Projet » : l\'infiltration et le tronçon aussi ('
      + (o.inf ? o.inf.p.st + ', ' + (o.tr ? o.tr.p.st : '-') : '-') + ')');
  } finally { await A.fermer(); }
}
/* b3 : descente sur la façade ; descente loin de tout bâti, plan tourné */
async function rejetSansFacade(){
  const A = await croquisTourne(), p = A.p;
  try {
    const qD = A.plan(70, 4), qL = A.plan(70, -5), qF = A.plan(67, 3.5);
    await C.injecter(p, {el: [C.P('D', 'descente', qD.x, qD.y, {cote: 'avant', visitable: 'oui'}), C.P('L', 'descente', qL.x, qL.y, {cote: 'avant', visitable: 'oui'}),
      C.P('F', 'descente', qF.x, qF.y, {cote: 'avant', visitable: 'oui'})]});
    await vue(A);
    const o = await rejeter(p, 'D'), bI = o.inf ? await auBati(p, o.inf) : null, att = A.plan(70, 3);
    R.ok(!!o.inf && dist(o.inf, att) <= .05 && !bI.dedans && Math.abs(bI.d - 1) <= .05, 'b3 descente sur la façade : l\'infiltration à 1 m devant le mur, hors du bâti ('
      + (o.inf ? f2(dist(o.inf, att)) + ' m du point attendu, ' + f2(bI.d) + ' m du bâti' + (bI.dedans ? ', dedans' : '') : o.bouton ? 'pas d\'infiltration' : 'pas de bouton') + ')');
    const o2 = await rejeter(p, 'L'), L = (await elements(p)).find(e => e.id === 'L'), s = (await C.vue(p)).s;
    const eL = await C.ecranCv(p, L.x, L.y), eI = o2.inf ? await C.ecranCv(p, o2.inf.x, o2.inf.y) : null;
    R.ok(!!eI && Math.abs(eI.x - eL.x) < .5 && Math.abs(eI.y - eL.y - s) < .5, 'b3 descente loin de tout bâti, plan tourné : l\'infiltration 1 m sous elle, vers le bas de l\'écran ('
      + (eI ? 'décalage ' + (eI.x - eL.x).toFixed(1) + ' ; ' + (eI.y - eL.y).toFixed(1) + ' px pour ' + s + ' px par mètre' : o2.bouton ? 'pas d\'infiltration' : 'pas de bouton') + ')');
    /* fond masqué : comme les aides au dessin, le bouton ne voit ni façade ni bâti ; la descente F, à 0,5 m de la façade sud, a son
       infiltration 1 m sous elle à l'écran */
    await p.evaluate(() => { window.__vcEd.etat.aff.fond = false; window.__vcEd.redessiner(); }); await C.pause(p, 150);
    const o3 = await rejeter(p, 'F'), F = (await elements(p)).find(e => e.id === 'F');
    const eF = await C.ecranCv(p, F.x, F.y), eI3 = o3.inf ? await C.ecranCv(p, o3.inf.x, o3.inf.y) : null;
    R.ok(!!eI3 && Math.abs(eI3.x - eF.x) < .5 && Math.abs(eI3.y - eF.y - s) < .5, 'b3 fond masqué [p] : ni façade ni bâti, l\'infiltration d\'une descente à 0,5 m de la façade 1 m sous elle, vers le bas de l\'écran ('
      + (eI3 ? 'décalage ' + (eI3.x - eF.x).toFixed(1) + ' ; ' + (eI3.y - eF.y).toFixed(1) + ' px pour ' + s + ' px par mètre' : o3.bouton ? 'pas d\'infiltration' : 'pas de bouton') + ')');
  } finally { await A.fermer(); }
}
/* b4 : bâtis fictifs ajoutés au fond, loin des rues de la démonstration (u > 116) : un L dont le coin rentrant COIN s'ouvre à 91° (un mur
   vers l'est, l'autre vers le nord, penché d'un degré) ; deux bâtis séparés d'un passage de 0,8 m (u de 156 à 156,8) */
const COIN = [140, 30], OUV = 91 * Math.PI / 180, BOUT = [COIN[0] + 6 * Math.cos(OUV), COIN[1] + 6 * Math.sin(OUV)];
const BATIS_B4 = [[[136, 26], [146, 26], [146, 30], COIN, BOUT, [BOUT[0] - 4, BOUT[1]]], [[150, 26], [156, 26], [156, 32], [150, 32]], [[156.8, 26], [162, 26], [162, 32], [156.8, 32]]];
/* sommet du bâti du fond le plus proche du point q (repère du croquis), tel que lignesRef le lit */
const sommetFond = (p, q) => p.evaluate(q => {
  const S = window.__vcEd.etat, V = window.VCroquis, off = V.decalageFond(S.fond, S.doc) || {x: 0, y: 0};
  let b = null;
  (V.geo.lignesRef(null, S.fond, off, ['bati']) || []).forEach(l => l.P.forEach(P => { const d = Math.hypot(P.x - q.x, P.y - q.y); if (!b || d < b.d) b = {x: P.x, y: P.y, d}; }));
  return b;
}, q);
async function rejetPresDesMurs(){
  const A = await croquisTourne(BATIS_B4), p = A.p;
  try {
    /* coin rentrant : la descente sur le sommet, où l'outil la pose avec « Accroche au bâti » (cochée d'origine) */
    const c = A.plan(COIN[0], COIN[1]), V = await sommetFond(p, c);
    await C.injecter(p, {el: [C.P('D', 'descente', V.x, V.y, {cote: 'avant', visitable: 'oui'})]}); await C.regler(p, c.x, c.y, 40);
    const o = await rejeter(p, 'D'), bI = o.inf ? await auBati(p, o.inf) : null;
    R.ok(V.d < .01 && !!o.inf && Math.abs(dist(o.inf, V) - 1) <= .05 && !bI.dedans && bI.d > .25,
      'b4 descente au coin rentrant d\'un L ouvert à 91° : l\'infiltration à 1 m, hors du bâti, à plus de 0,25 m de ses côtés ('
      + (o.inf ? f2(dist(o.inf, V)) + ' m de la descente, ' + bI.d.toFixed(3) + ' m du bâti' + (bI.dedans ? ', dedans' : '') : o.bouton ? 'pas d\'infiltration' : 'pas de bouton') + ')');
    /* passage de 0,8 m : descente sur la façade est du premier bâti, face au second ; les essais à 0° et ±30° tombent dans le second */
    const qP = A.plan(156, 29);
    await C.injecter(p, {el: [C.P('P', 'descente', qP.x, qP.y, {cote: 'avant', visitable: 'oui'})]}); await C.regler(p, qP.x, qP.y, 40);
    const o2 = await rejeter(p, 'P'), b2 = o2.inf ? await auBati(p, o2.inf) : null, u = o2.inf ? A.uv(o2.inf).u : NaN;
    R.ok(!!o2.inf && Math.abs(dist(o2.inf, qP) - 1) <= .05 && !b2.dedans && b2.d > .25 && u > 156 && u < 156.8,
      'b4 descente face à un bâti à 0,8 m : les essais dans ce bâti écartés, l\'infiltration dans le passage, hors des deux bâtis, à plus de 0,25 m de leurs côtés ('
      + (o2.inf ? f2(dist(o2.inf, qP)) + ' m de la descente, u = ' + u.toFixed(3) + ', ' + b2.d.toFixed(3) + ' m du bâti' + (b2.dedans ? ', dedans' : '') : o2.bouton ? 'pas d\'infiltration' : 'pas de bouton') + ')');
    R.ok(!A.erreurs.length, 'b4 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}
/* b5 : extension fictive dessinée en « Complément du fond », au milieu de la rue (aucun bâti du fond à 3 m) : rectangle (40 ; −7) à (44 ;
   −3) du repère de la démonstration, en trait fermé, tracé dans un sens puis dans l'autre ; puis en trait ouvert, sans le côté sud (en U),
   tracé dans un sens puis dans l'autre. La descente est sur son côté nord */
async function rejetPresDunComplement(){
  const A = await croquisTourne(), p = A.p;
  try {
    const traits = [['fermé, sens horaire', [[40, -3], [44, -3], [44, -7], [40, -7], [40, -3]]], ['fermé, sens trigonométrique', [[40, -3], [40, -7], [44, -7], [44, -3], [40, -3]]],
      ['ouvert en U', [[40, -7], [40, -3], [44, -3], [44, -7]]], ['ouvert en U, tracé à l\'envers', [[44, -7], [44, -3], [40, -3], [40, -7]]]];
    const qD = A.plan(42, -3);
    for (const [nom, uv] of traits){
      const pts = uv.map(q => { const r = A.plan(q[0], q[1]); return [r.x, r.y]; });
      await C.injecter(p, {el: [C.P('D', 'descente', qD.x, qD.y, {cote: 'avant', visitable: 'oui'}), C.L('X', 'lim', pts, {}, {st: 'existant'})]}); await C.regler(p, qD.x, qD.y, 40);
      const o = await rejeter(p, 'D'), bX = o.inf ? await auBati(p, o.inf, 'complement') : null, q = o.inf ? A.uv(o.inf) : null, dedans = !!q && q.u > 40 && q.u < 44 && q.v > -7 && q.v < -3;
      R.ok(!!o.inf && Math.abs(dist(o.inf, qD) - 1) <= .05 && !dedans && bX.d > .25, 'b5 descente sur une extension en « Complément du fond », trait ' + nom
        + ' : l\'infiltration à 1 m, hors de l\'extension, à plus de 0,25 m du trait (' + (o.inf ? f2(dist(o.inf, qD)) + ' m de la descente, en (' + q.u.toFixed(2) + ' ; ' + q.v.toFixed(2) + '), '
        + f2(bX.d) + ' m du trait' + (dedans ? ', dedans' : '') : o.bouton ? 'pas d\'infiltration' : 'pas de bouton') + ')');
    }
    /* trait fermé qui entoure la descente et la façade sud du bâti (une limite dessinée, par exemple) : pas un bâti pour elle */
    const qE = A.plan(70, 3.5), att = A.plan(70, 2.5), pts = [[63, 1], [77, 1], [77, 16], [63, 16], [63, 1]].map(q => { const r = A.plan(q[0], q[1]); return [r.x, r.y]; });
    await C.injecter(p, {el: [C.P('E', 'descente', qE.x, qE.y, {cote: 'avant', visitable: 'oui'}), C.L('X', 'lim', pts, {}, {st: 'existant'})]}); await vue(A);
    const o = await rejeter(p, 'E');
    R.ok(!!o.inf && dist(o.inf, att) <= .05, 'b5 trait fermé autour de la descente (une limite) : pas un bâti pour elle, l\'infiltration à 1 m devant la façade, comme sans lui ('
      + (o.inf ? f2(dist(o.inf, att)) + ' m du point attendu' : o.bouton ? 'pas d\'infiltration' : 'pas de bouton') + ')');
    R.ok(!A.erreurs.length, 'b5 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [apercu, boutonRejetSol, rejetPresDunRegard, rejetSansFacade, rejetPresDesMurs, rejetPresDunComplement]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
