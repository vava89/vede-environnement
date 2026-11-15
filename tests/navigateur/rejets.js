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
// Puits (m120, décisions D3 et D6) :
// p1 : « Puits » est dans la palette Équipements, juste après « Rejet en milieu naturel » ; l'outil choisi, l'aide dit « Touchez le plan pour
//     poser : Puits. Un puits perdu (qui infiltre les eaux) se dessine en Puisard. » ; la fiche d'un puits posé le rappelle et n'a aucun
//     jugement à régler. Échoue sur 7df0996 (type « puits » absent), sauf l'absence d'erreur dans la console.
// p2 (décision D7) : panneau Constat de l'éditeur, descente avant et WC reliés au puits : la case « Conf. » de la descente reste vide, celle
//     du WC dit « Non », et une phrase dit que la ligne EP suit son anomalie ; anomalie de la descente écartée : « Oui », sans la phrase ;
//     mise à arbitrer : case vide, avec la phrase. Le premier et le troisième cas échouent sans la phrase (première version de m120).
// Autre destination (m127, décision D10) :
// a1 : « Autre destination » est dans la palette Équipements, juste après « Puits » ; l'outil choisi par son bouton, l'aide dit « Touchez le
//     plan pour poser : Autre destination. » ; posée au toucher, sa fiche s'ouvre : sélecteur « Type » puis cinq champs, nom « Autre
//     destination », abréviation « Au », article « l' », jugement des EP « à arbitrer », case « autre » ; l'aide du jugement dit que le
//     changer efface les décisions de Contrôles « sur les rejets des EP ». Une descente reliée : ep-exu à arbitrer, fiche de la descente en
//     « att » (« Rejet : autre destination · anomalie à arbitrer »), conclusion « À compléter : rejet des eaux pluviales à arbitrer ». Nom
//     « Étang » (l'abréviation tirée du nom le suit : « Ét » [p]), article « le » puis « l' » (l'aide de l'article le dit), jugement « Non
//     conforme » : « Descente EP : rejet dans l'étang » retenue NC ; « Conforme » : plus d'anomalie, la même puce de nouveau n'ajoute aucun
//     pas d'annulation, une annulation rend l'anomalie. Rejet écarté dans Contrôles, nature « réserve » et texte retouchés : le jugement « À
//     arbitrer » retire la décision et la nature, garde le texte, et « Annuler » les rend. Nom vidé ou blanc, qui contient « puits » (« Puits
//     du jardin », « PUITS », « le puîts », « Étangpuits », espace insécable, tréma) ou « puit » comme mot (« Puit du jardin », « puit » [p]),
//     sans deux caractères lisibles au PDF (un émoji ou « Ω » seul, « A », un émoji, « Ω » et « A ») ; abréviation d'un caractère ou illisible
//     au PDF : refusés avec leur toast, la valeur affichée est rendue, ni le dessin, ni les décisions, ni l'historique ne changent.
//     Abréviation de trois caractères acceptée ; vidée : celle tirée du nom. Un WC relié : « WC : rejet dans l'étang », retenue NC ; sa fiche
//     n'a aucun des cinq champs. « Type » : changée en puisard, la destination perd ses cinq champs, avec le toast du changement de type ;
//     changée de nouveau en destination, elle reçoit ceux par défaut ; deux annulations rendent l'étang. Renommages : « Mare » met « le » au
//     lieu de « l' », avec le toast « Article « le » : touchez « la » s'il le faut », en un pas d'annulation (« Annuler » rend l'étang) ;
//     « la » choisi ; « Ancienne mare » et « Herbage » (devant un h, l'article ne change pas [p]) : « l' » ; « Fossé » : « le », avec le
//     toast ; l'abréviation suit le nom, tirée de ses caractères lisibles au PDF (« Ma » pour un émoji suivi de « Mare », vidée aussi) ;
//     « Puisard du fond » est accepté. Puces : seul le champ touché est écrit (« les » et « xx », inconnus de cette version, restent) ; sans
//     nom, l'article choisi écrit aussi le nom. Aucune erreur dans la console.
// a2 : outil armé d'un modèle « Étang » à arbitrer (choisirOutil, comme le fera la palette de m128) : l'outil le garde ; l'aide dit
//     « Touchez le plan pour poser : Étang. » ; « Cotes » : « Pose par cotes (Étang) », puis la façade sud et un endroit : « Étang posé
//     depuis : Façade », l'aperçu écrit « Ét » ; « Poser » : la destination garde nom, abréviation et jugement du modèle, sa fiche les montre.
//     Modèle « Mare » (la, réserve, récupérateur) : « Mare posée depuis : Façade » ; posée au toucher, elle garde ses cinq champs, l'outil
//     son modèle. L'outil choisi ensuite par la palette n'en a pas : « Autre destination » aux champs par défaut. Aucune erreur dans la console.
// a3 (application entière, mode intégré ; le jugement suit la fiche, D3) : trois étangs « Non conforme », chacun relié à sa descente :
//     l'anomalie entre au dossier sans nature écrite (la règle de l'application, sur « rejet », la dit non conforme). « Réserve » depuis
//     « Non conforme », par « Conforme » et par « À arbitrer » (l'anomalie quitte le dossier, puis revient de sa copie) : au dossier la
//     nature écrite « réserve » (anomNC faux), au croquis « retenue réserve », la conclusion du constat « reserves » ; aller et retour par
//     « Non conforme » ; croquis fermé, puis rouvert : de même. Aucune erreur dans la console.
// a4 (m127) : regard au tampon béton relié au WC, au dossier sans nature écrite, non conforme ; « Regard EU : tampon béton fissuré »
//     saisi dans sa fiche, puis le regard passe en EP (la source devient une descente, la boîte une boîte EP) : le texte nomme un défaut,
//     l'anomalie reste non conforme au dossier (sans nature écrite) et au croquis, la conclusion du constat « non_conformes » ; croquis
//     fermé : de même. Aucune erreur dans la console.
// a5 (m127) : étang « Non conforme » relié à sa descente ; « Réserve » : nature écrite « réserve » au dossier ; le texte du rejet rendu
//     « Descente EP vers l'étang, tampon béton » dans la fiche de la descente (la règle de l'application le dit en réserve), puis « Non
//     conforme » : la nature écrite est effacée, la réserve du texte reste au dossier et au croquis, la conclusion « reserves » ; croquis
//     fermé : de même. Aucune erreur dans la console.
// a1, a2 et a3 échouent sur 9f2b32d (ni bouton dans la palette, ni champ dans la fiche, ni modèle à la pose), sauf, dans a1, la descente
// reliée à la destination par défaut (règle de m125), dans a3, l'entrée au dossier, et l'absence d'erreur dans la console ; a4 y passe, a5
// aussi, sauf « Réserve », que le dossier ne suivait pas (47/66). Sur la première version de m127 (nombres d'avant a5) : a3 échoue (le
// dossier restait non conforme : 60/63 avec la fiche corrigée) ; dans a1, l'aide du jugement, les refus de « puit » et de « A », les
// renommages et les puces échouent (avec a3 : 53/63). Sur la deuxième : a4 échoue (le regard passé en EP devenait une réserve écrite au
// dossier, conclusion « reserves »), et a5 (« Non conforme » écrivait la non-conformité au dossier : true/NC, conclusion « non_conformes ») :
// 64/66. Sur la troisième : a5 seul échoue, de même (65/66).
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

/* --- puits (m120) --- */
/* p1 : « Puits » dans la palette Équipements, juste après « Rejet en milieu naturel » ; l'aide de l'outil et la fiche d'un puits posé disent
   qu'un puits perdu se dessine en Puisard ; la fiche n'a aucun jugement à régler */
async function puits(){
  const A = await croquisTourne(), p = A.p, RAP = 'Un puits perdu (qui infiltre les eaux) se dessine en Puisard.';
  try {
    await p.click('.vc .vc-o[data-pal="equ"]'); await C.pause(p, 200);
    const items = await p.evaluate(() => Array.from(document.querySelectorAll('.vc .vc-pitem')).map(b => b.dataset.item + '=' + b.textContent.trim()));
    const i = items.map(s => s.split('=')[0]).indexOf('pt:milieu'), b = await p.$('.vc .vc-pitem[data-item="pt:puits"]');
    R.ok(i >= 0 && items[i + 1] === 'pt:puits=Puits' && !!b, 'p1 palette Équipements : « Puits » juste après « Rejet en milieu naturel » (' + items.join(', ') + ')');
    if (b){ await b.click(); await C.pause(p, 200); }
    const outil = await p.evaluate(() => { const o = window.__vcEd.etat.outil; return o.k + ':' + o.t; }), aide = await texteAide(p);
    R.ok(outil === 'pt:puits' && aide.indexOf('Touchez le plan pour poser : Puits. ' + RAP) === 0,
      'p1 outil ' + outil + ' : l\'aide rappelle qu\'un puits perdu se dessine en Puisard (' + JSON.stringify(aide) + ')');
    /* un puits posé à 3 m devant la façade sud du bâti : sa fiche */
    await p.evaluate(() => { for (let k = 0; k < 5 && window.__vcEd.fermerNiveau(); k++); });
    await C.outil(p, {k: 'main'});
    const q = A.plan(70, -3);
    await C.injecter(p, {el: [C.P('W', 'puits', q.x, q.y)]}); await vue(A);
    await fiche(p, 'W');
    const tp = await textePanneau(p);
    const champs = await p.evaluate(() => Array.from(document.querySelectorAll('.vc .vc-panneau:not([hidden]) .vc-pcorps .vc-lab')).map(x => x.textContent.trim()));
    R.ok(tp.indexOf(RAP) >= 0 && !champs.some(t => /conform|jugement|rejet/i.test(t)),
      'p1 fiche du puits : le rappel du puits perdu, aucun jugement à régler (' + JSON.stringify(tp.slice(0, 160)) + ' ; champs : ' + champs.join(', ') + ')');
    /* p2 : panneau Constat de l'éditeur, descente avant et WC reliés au puits ; la case « Conf. » de la descente reste vide (le constat la juge
       par son anomalie, décision D7) et une phrase le dit ; anomalie écartée : « Oui », sans la phrase ; mise à arbitrer : vide, la phrase */
    const NOTE = 'Rejet dans un puits : au constat, la ligne EP suit son anomalie. « Non » si elle reste non conforme, « oui » si le dossier en fait une réserve.';
    const qd = A.plan(66, -3), qw = A.plan(74, -3), els = [C.P('W', 'puits', q.x, q.y), C.P('d', 'descente', qd.x, qd.y, {cote: 'avant', visitable: 'oui'}), C.P('w', 'wc', qw.x, qw.y)];
    els.push(C.L('Ld', 'tr', ['d', 'W'], C.index(els)), C.L('Lw', 'tr', ['w', 'W'], C.index(els)));
    await C.injecter(p, {el: els}); await vue(A);
    const constat = st => p.evaluate(st => {
      const ed = window.__vcEd, S = ed.etat;
      if (st) { S.doc.decisions['ep-puits:d'] = {st}; ed.synchroniser(); }
      ed.ouvrirPanneau('constat');
      const lignes = [...document.querySelectorAll('.vc-panneau .vc-pcorps table.vc-tab tbody tr')].map(tr => [...tr.cells].map(c => c.textContent.trim()))
        .filter(c => c[1]).map(c => c.slice(0, 4).join(' | '));
      return {lignes, notes: [...document.querySelectorAll('.vc-panneau .vc-pcorps p.vc-muet')].map(x => x.textContent.trim())};
    }, st);
    const lgD = 'EP Gouttière(s) avant | 1 | Puits : rejet en milieu naturel | ', lgW = 'EU WC | 1 | Puits : rejet en milieu naturel | Non';
    let c = await constat('');
    R.ok(c.lignes.indexOf(lgD) >= 0 && c.lignes.indexOf(lgW) >= 0 && c.notes.indexOf(NOTE) >= 0,
      'p2 panneau Constat, rejet retenu : descente sans conformité, WC « Non », la phrase dit pourquoi (' + JSON.stringify(c) + ')');
    c = await constat('ecartee');
    R.ok(c.lignes.indexOf(lgD + 'Oui') >= 0 && c.lignes.indexOf(lgW) >= 0 && !c.notes.some(t => /puits/.test(t)),
      'p2 anomalie de la descente écartée : « Oui », sans la phrase (' + JSON.stringify(c) + ')');
    c = await constat('arbitrer');
    R.ok(c.lignes.indexOf(lgD) >= 0 && c.notes.indexOf(NOTE) >= 0, 'p2 anomalie de la descente à arbitrer : sans conformité, la phrase (' + JSON.stringify(c) + ')');
    R.ok(!A.erreurs.length, 'p1 et p2 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* --- autre destination (m127, décision D10) : palette, poses, fiche --- */
const PUITS_T = 'Pour un puits, posez l\'objet Puits (EP non conformes) ; pour un puits perdu, un Puisard.';
const VIDE_T = 'Le nom ne peut pas être vide', PDFN_T = 'Nom illisible au PDF : employez au moins deux lettres latines ou chiffres';
const PDFA_T = 'Abréviation illisible au PDF : employez des lettres latines ou des chiffres', LONG_T = 'Abréviation de 2 ou 3 caractères, par exemple Ét';
const CHAMPS_DEST = 'Type|Nom|Abréviation|Article|Jugement des EP|Case du constat|';
const AIDE_EP = 'les EU y sont toujours non conformes ; le changer efface les décisions de Contrôles sur les rejets des EP';
const toastVu = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); return t && t.classList.contains('on') ? t.textContent : ''; });
/* toast effacé avant une saisie : il reste affiché quelques secondes, on ne lit ensuite que celui de cette saisie */
const effacerToast = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); if (t){ t.classList.remove('on'); t.textContent = ''; } });
const FICHE = '.vc .vc-panneau:not([hidden]) .vc-pcorps ';
/* saisie d'un champ de la fiche, enregistrée quand il perd le focus (événement change) ; rend la valeur affichée ensuite (null : pas de champ) */
async function saisir(p, k, v){
  const i = await p.$(FICHE + 'input[data-k="' + k + '"]'); if (!i) return null;
  await i.fill(v); await i.evaluate(x => x.blur()); await C.pause(p, 250);
  return p.evaluate(s => { const i = document.querySelector(s); return i ? i.value : null; }, FICHE + 'input[data-k="' + k + '"]');
}
async function puceDest(p, k, v){ const b = await p.$(FICHE + 'button.vc-chip[data-a="dest"][data-k="' + k + '"][data-v="' + v + '"]'); if (!b) return false; await b.click(); await C.pause(p, 300); return true; }
/* fiche affichée : libellés des champs (suivis de « | »), valeurs du nom et de l'abréviation, puces pressées des destinations, aides */
const ficheDest = p => p.evaluate(F => {
  const c = document.querySelector(F); if (!c) return {champs: '', nom: null, ab: null, puces: '', aides: []};
  const v = k => { const i = c.querySelector('input[data-k="' + k + '"]'); return i ? i.value : null; };
  return {champs: Array.from(c.querySelectorAll('.vc-champ > .vc-lab')).map(l => (l.firstChild && l.firstChild.textContent || '').trim() + '|').join(''),
    nom: v('nom'), ab: v('ab'), puces: Array.from(c.querySelectorAll('button[data-a="dest"][aria-pressed="true"]')).map(b => b.dataset.k + '=' + b.dataset.v).join(' '),
    aides: Array.from(c.querySelectorAll('.vc-champ > .vc-lab small')).map(s => s.textContent.trim())};
}, FICHE.trim());
/* anomalies du croquis (S.liste) d'un objet : clé, état, nature et texte */
const anomsDe = (p, id) => p.evaluate(id => window.__vcEd.liste().filter(a => a.objId === id).map(a => a.cle + ' ' + a.st + (a.nc ? ' NC' : ' réserve') + ' « ' + a.obs + ' »'), id);
const champsDe = (p, id) => p.evaluate(id => { const o = window.__vcEd.doc().el.find(e => e.id === id); return o ? o.t + ' ' + ['nom', 'ab', 'art', 'ep', 'cst'].map(k => k + '=' + o.p[k]).join(' ') : 'absente'; }, id);
const nUndo = p => p.evaluate(() => window.__vcEd.etat.undo.length);
const annuler = async p => { await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); };
/* textes écrits sur le canevas au prochain dessin (fillText) */
async function textesDessines(p){
  await p.evaluate(() => {
    const P = CanvasRenderingContext2D.prototype; window.__txtR = [];
    if (!P.__txtRejets){ P.__txtRejets = true; const f = P.fillText; P.fillText = function(s){ const T = window.__txtR; if (T && T.length < 4000) T.push(String(s)); return f.apply(this, arguments); }; }
    window.__vcEd.redessiner();
  });
  await C.pause(p, 150);
  return p.evaluate(() => { const T = window.__txtR || []; window.__txtR = null; return T; });
}
/* a1 : palette, pose au toucher, fiche et ses cinq champs, jugements, décisions de Contrôles, refus, WC, changement de type */
async function destination(){
  const A = await croquisTourne(), p = A.p;
  try {
    await p.click('.vc .vc-o[data-pal="equ"]'); await C.pause(p, 200);
    const items = await p.evaluate(() => Array.from(document.querySelectorAll('.vc .vc-pitem')).map(b => b.dataset.item + '=' + (b.querySelector(':scope > span') || b).textContent.trim()));
    const i = items.map(s => s.split('=')[0]).indexOf('pt:puits'), b = await p.$('.vc .vc-pitem[data-item="pt:exutoire"]');
    R.ok(i >= 0 && items[i + 1] === 'pt:exutoire=Autre destination' && !!b, 'a1 palette Équipements : « Autre destination » juste après « Puits » (' + items.join(', ') + ')');
    if (b){ await b.click(); await C.pause(p, 200); }
    else { await C.outil(p, {k: 'pt', t: 'exutoire', pal: 'equ'}); await C.pause(p, 200); }
    const outil = await p.evaluate(() => { const o = window.__vcEd.etat.outil; return o.k + ':' + o.t + (o.modele ? ' modèle' : ''); }), aide = await texteAide(p);
    /* pose au toucher, devant la façade sud : la fiche de la destination s'ouvre */
    const els0 = await elements(p);
    await toucherPlan(p, A.plan(70, 1.5)); await C.pause(p, 400);
    const nv = (await elements(p)).filter(e => !els0.some(x => x.id === e.id) && e.t === 'exutoire'), X = nv.length === 1 ? nv[0] : null;
    const f0 = await ficheDest(p);
    R.ok(outil === 'pt:exutoire' && aide.indexOf('Touchez le plan pour poser : Autre destination.') === 0 && !!X && f0.champs.indexOf(CHAMPS_DEST) >= 0
      && f0.nom === 'Autre destination' && f0.ab === 'Au' && f0.puces === 'art=l\' ep=arbitrer cst=autre' && f0.aides.indexOf(AIDE_EP) >= 0,
      'a1 outil ' + outil + ', posée au toucher : fiche à cinq champs, nom « Autre destination », « Au », « l\' », à arbitrer, case « autre » ; l\'aide du jugement ('
      + JSON.stringify(aide) + ' ; ' + (X ? JSON.stringify(X.p) : nv.length + ' destination posée') + ' ; ' + JSON.stringify(f0) + ')');
    if (!X) throw new Error('aucune destination posée');
    /* une descente reliée : rejet des EP à arbitrer */
    const qd = A.plan(66, 1.5), qw = A.plan(74, 1.5), els = [X, C.P('d', 'descente', qd.x, qd.y, {cote: 'avant', visitable: 'oui'})];
    els.push(C.L('Ld', 'tr', ['d', X.id], C.index(els)));
    await C.injecter(p, {el: els}); await vue(A);
    await fiche(p, 'd');
    const etD = await p.evaluate(F => { const s = document.querySelector(F + '.vc-etat'); return s ? s.className + ' « ' + s.textContent.trim() + ' »' : ''; }, FICHE);
    const concl = await p.evaluate(() => { const S = window.__vcEd.etat, V = window.VCroquis; return V.CONCL[V.conclusion(S.liste, S.an)] || ''; });
    let an = await anomsDe(p, 'd');
    R.ok(an.join() === 'ep-exu:d arbitrer NC « Descente EP : rejet dans l\'autre destination »' && /\bvc-etat att\b/.test(etD)
      && etD.indexOf('« Rejet : autre destination · anomalie à arbitrer »') >= 0 && concl === 'À compléter : rejet des eaux pluviales à arbitrer',
      'a1 descente reliée : ep-exu à arbitrer, fiche de la descente en « att » (« Rejet : autre destination · anomalie à arbitrer »), conclusion « À compléter : rejet des eaux pluviales à arbitrer » ('
      + an.join(' ; ') + ' ; ' + etD + ' ; ' + concl + ')');
    /* nom « Étang » (l'abréviation tirée du nom le suit), article « le » puis « l' », jugement « Non conforme » */
    await fiche(p, X.id);
    const vN = await saisir(p, 'nom', '  Étang '), cN = await champsDe(p, X.id), aN = await anomsDe(p, 'd');
    await puceDest(p, 'art', 'le'); const aLe = await anomsDe(p, 'd'), fLe = await ficheDest(p);
    await puceDest(p, 'art', 'l\''); const fL = await ficheDest(p);
    await puceDest(p, 'ep', 'nc'); an = await anomsDe(p, 'd');
    const fNc = await ficheDest(p);
    R.ok(vN === 'Étang' && cN === 'exutoire nom=Étang ab=Ét art=l\' ep=arbitrer cst=autre' && aN.join() === 'ep-exu:d arbitrer NC « Descente EP : rejet dans l\'étang »'
      && aLe.join() === 'ep-exu:d arbitrer NC « Descente EP : rejet dans le étang »' && fLe.aides.indexOf('rejet dans le étang') >= 0 && fL.aides.indexOf('rejet dans l\'étang') >= 0
      && an.join() === 'ep-exu:d retenue NC « Descente EP : rejet dans l\'étang »' && fNc.puces === 'art=l\' ep=nc cst=autre',
      'a1 nom « Étang », article « le » puis « l\' », jugement « Non conforme » : « Descente EP : rejet dans l\'étang » retenue NC ('
      + [JSON.stringify(vN), cN, aN.join(), aLe.join(), JSON.stringify(fL.aides), an.join(), fNc.puces].join(' ; ') + ')');
    /* « Conforme » : plus d'anomalie ; une annulation la rend ; la puce déjà pressée : aucun pas d'annulation */
    await puceDest(p, 'ep', 'conforme'); const aC = await anomsDe(p, 'd'), u0 = await nUndo(p);
    await puceDest(p, 'ep', 'conforme'); const u1 = await nUndo(p);
    await annuler(p); const aU = await anomsDe(p, 'd'), cU = await champsDe(p, X.id);
    R.ok(!aC.length && u1 === u0 && aU.join() === 'ep-exu:d retenue NC « Descente EP : rejet dans l\'étang »' && cU === 'exutoire nom=Étang ab=Ét art=l\' ep=nc cst=autre',
      'a1 « Conforme » : plus d\'anomalie, la même puce n\'ajoute aucun pas ; « Annuler » la rend, retenue NC (' + [aC.join() || 'aucune', u0 + '/' + u1, aU.join(), cU].join(' ; ') + ')');
    /* rejet écarté dans Contrôles, nature et texte retouchés : un autre jugement retire la décision et la nature, garde le texte ; une annulation les rend */
    await p.evaluate(() => { const ed = window.__vcEd; ed.etat.doc.decisions['ep-exu:d'] = {st: 'ecartee', nc: false, obs: 'Rejet retouché'}; ed.synchroniser(); });
    await fiche(p, X.id);
    const aE = await anomsDe(p, 'd');
    await puceDest(p, 'ep', 'arbitrer');
    const aR = await anomsDe(p, 'd'), dR = await p.evaluate(() => JSON.stringify(window.__vcEd.doc().decisions['ep-exu:d'] || null));
    await annuler(p);
    const aR2 = await anomsDe(p, 'd'), dR2 = await p.evaluate(() => JSON.stringify(window.__vcEd.doc().decisions['ep-exu:d'] || null)), cR2 = await champsDe(p, X.id);
    R.ok(/^ep-exu:d ecartee /.test(aE.join()) && aR.join() === 'ep-exu:d arbitrer NC « Descente EP : rejet dans l\'étang »' && dR === '{"obs":"Rejet retouché"}'
      && aR2.join() === aE.join() && dR2 === '{"st":"ecartee","nc":false,"obs":"Rejet retouché"}' && /ep=nc/.test(cR2),
      'a1 rejet écarté dans Contrôles, nature « réserve » : jugement « À arbitrer », la décision et la nature retirées, le texte gardé ; « Annuler » les rend ('
      + [aE.join(), aR.join(), dR, aR2.join(), dR2].join(' ; ') + ')');
    /* refus : nom vide, qui contient « puits » (toutes casses, accents, espaces), ou que le PDF ne sait pas écrire ; rien ne change */
    await fiche(p, X.id);
    const essais = [['nom', '', VIDE_T, 'Étang'], ['nom', '   ', VIDE_T, 'Étang'], ['nom', 'Puits du jardin', PUITS_T, 'Étang'], ['nom', 'PUITS', PUITS_T, 'Étang'],
      ['nom', ' le puîts ', PUITS_T, 'Étang'], ['nom', 'Étangpuits', PUITS_T, 'Étang'], ['nom', 'Puits perdu', PUITS_T, 'Étang'], ['nom', 'Mare\u00a0aux\u00a0PuÏts ', PUITS_T, 'Étang'],
      ['nom', 'Puit du jardin', PUITS_T, 'Étang'], ['nom', 'puit', PUITS_T, 'Étang'], ['nom', '\u{1F642}', PDFN_T, 'Étang'], ['nom', 'Ω', PDFN_T, 'Étang'],
      ['nom', 'A', PDFN_T, 'Étang'], ['nom', '\u{1F642} Ω A', PDFN_T, 'Étang'], ['ab', 'A', LONG_T, 'Ét'], ['ab', 'ΩΩ', PDFA_T, 'Ét']];
    const rates = [];
    for (const [k, v, t, aff0] of essais){
      const e0 = await etatDessin(p), w0 = await nUndo(p); await effacerToast(p);
      const aff = await saisir(p, k, v), msg = await toastVu(p), e1 = await etatDessin(p), w1 = await nUndo(p);
      if (!(aff === aff0 && msg === t && e0 === e1 && w0 === w1)) rates.push(k + ' ' + JSON.stringify(v) + ' : affiché ' + JSON.stringify(aff) + ', toast ' + JSON.stringify(msg) + (e0 === e1 ? '' : ', dessin changé') + (w0 === w1 ? '' : ', pas d\'annulation ajouté'));
    }
    R.ok(!rates.length, 'a1 nom vide, qui contient « puits » ou « puit » comme mot, sans deux caractères lisibles au PDF, abréviation d\'un caractère ou illisible : refusés avec leur toast, la valeur rendue, rien ne change'
      + (rates.length ? ' (' + rates.join(' ; ') + ')' : ''));
    /* abréviation : trois caractères acceptés, vidée : celle tirée du nom */
    const vA = await saisir(p, 'ab', 'ÉTg'), cA = await champsDe(p, X.id), vA2 = await saisir(p, 'ab', ''), cA2 = await champsDe(p, X.id);
    R.ok(vA === 'ÉTg' && /ab=ÉTg /.test(cA) && vA2 === 'Ét' && /ab=Ét /.test(cA2), 'a1 abréviation « ÉTg » acceptée ; vidée : « Ét », tirée du nom (' + [vA, cA, vA2, cA2].join(' ; ') + ')');
    /* un WC relié : rejet dans l'étang, toujours non conforme ; sa fiche n'a aucun des champs d'une destination */
    const Xn = (await elements(p)).find(e => e.id === X.id), els2 = [Xn, C.P('w', 'wc', qw.x, qw.y)];
    els2.push(C.L('Lw', 'tr', ['w', X.id], C.index(els2)));
    await C.injecter(p, {el: els2}); await vue(A);
    const aW = await anomsDe(p, 'w'); await fiche(p, 'w'); const fW = await ficheDest(p);
    R.ok(aW.join() === 'eu-exu:w retenue NC « WC : rejet dans l\'étang »' && !/\|(Nom|Abréviation|Article|Jugement des EP|Case du constat)\|/.test('|' + fW.champs),
      'a1 WC relié : « WC : rejet dans l\'étang », retenue NC ; sa fiche sans les champs d\'une destination (' + aW.join() + ' ; ' + fW.champs + ')');
    /* « Type » : la destination changée en puisard perd ses cinq champs, avec le toast ; un puisard changé en destination reçoit ceux par défaut */
    await fiche(p, X.id);
    const opts = await p.evaluate(F => { const s = document.querySelector(F + 'select[data-a="type"]'); return s ? Array.from(s.options).map(o => o.value + (o.selected ? '*' : '')).join(' ') : ''; }, FICHE);
    await effacerToast(p);
    await p.selectOption(FICHE + 'select[data-a="type"]', 'puisard').catch(() => {}); await C.pause(p, 300);
    const cP = await champsDe(p, X.id), tP = await toastVu(p);
    await p.selectOption(FICHE + 'select[data-a="type"]', 'exutoire').catch(() => {}); await C.pause(p, 300);
    const cE = await champsDe(p, X.id), fE = await ficheDest(p);
    await annuler(p); await annuler(p); const cB = await champsDe(p, X.id);
    R.ok(/\bexutoire\* /.test(opts + ' ') && /\bpuits\b/.test(opts) && !/jonction/.test(opts) && cP === 'puisard nom=undefined ab=undefined art=undefined ep=undefined cst=undefined'
      && /^Type changé : 5 caractéristiques ne s'appliquent plus et sont effacées/.test(tP) && cE === 'exutoire nom=Autre destination ab=Au art=l\' ep=arbitrer cst=autre'
      && fE.nom === 'Autre destination' && cB === 'exutoire nom=Étang ab=Ét art=l\' ep=nc cst=autre',
      'a1 « Type » : en puisard, les cinq champs effacés, avec le toast ; en destination, ceux par défaut ; deux annulations rendent l\'étang ('
      + [opts, cP, JSON.stringify(tP), cE, cB].join(' ; ') + ')');
    /* renommages : l'article se règle sur la première lettre du nouveau nom (« le » au lieu de « l' » devant une consonne, avec un toast ;
       « l' » devant une voyelle ; devant un h, celui d'avant [p]) ; l'abréviation qui suivait le nom le suit, tirée de ses caractères
       lisibles au PDF ; un seul pas d'annulation ; « Puisard du fond » est accepté */
    await fiche(p, X.id);
    const ren = [], ART_T = 'Article « le » : touchez « la » s\'il le faut';
    const renommer = async v => {
      await effacerToast(p); const aff = await saisir(p, 'nom', v), t = await toastVu(p), c = await champsDe(p, X.id), w = await anomsDe(p, 'w');
      ren.push(aff + ' | ' + c.replace(/^exutoire nom=.*? ab=/, 'ab=') + ' | ' + w.join().replace(/^eu-exu:w retenue NC /, '') + (t ? ' | ' + t : ''));
    };
    const u2 = await nUndo(p); await renommer('Mare'); const u3 = await nUndo(p);
    await annuler(p); const cAn = await champsDe(p, X.id); await fiche(p, X.id);
    await renommer('Mare'); await puceDest(p, 'art', 'la'); const wLa = (await anomsDe(p, 'w')).join();
    for (const v of ['Ancienne mare', 'Herbage', 'Fossé', '\u{1F4A7} Mare']) await renommer(v);
    const vM = await saisir(p, 'ab', 'Mx'), vM2 = await saisir(p, 'ab', ''), pM2 = await p.evaluate(s => window.VCroquis.pdfTxt(s), vM2);
    await renommer('Puisard du fond');
    const attR = ['Mare | ab=Ma art=le ep=nc cst=autre | « WC : rejet dans le mare » | ' + ART_T, 'Mare | ab=Ma art=le ep=nc cst=autre | « WC : rejet dans le mare » | ' + ART_T,
      'Ancienne mare | ab=An art=l\' ep=nc cst=autre | « WC : rejet dans l\'ancienne mare »', 'Herbage | ab=He art=l\' ep=nc cst=autre | « WC : rejet dans l\'herbage »',
      'Fossé | ab=Fo art=le ep=nc cst=autre | « WC : rejet dans le fossé » | ' + ART_T, '\u{1F4A7} Mare | ab=Ma art=le ep=nc cst=autre | « WC : rejet dans le \u{1F4A7} Mare »',
      'Puisard du fond | ab=Pu art=le ep=nc cst=autre | « WC : rejet dans le puisard du fond »'];
    R.ok(ren.join(' ; ') === attR.join(' ; ') && u3 === u2 + 1 && cAn === 'exutoire nom=Étang ab=Ét art=l\' ep=nc cst=autre'
      && wLa === 'eu-exu:w retenue NC « WC : rejet dans la mare »' && vM === 'Mx' && vM2 === 'Ma' && pM2 === 'Ma',
      'a1 renommages : « Mare » en « le » avec le toast (un pas, « Annuler » rend l\'étang), « la » choisi ; « Ancienne mare » et « Herbage » en « l\' », « Fossé » en « le » ;'
      + ' l\'abréviation suit le nom, « Ma » pour « \u{1F4A7} Mare », vidée aussi ; « Puisard du fond » accepté ('
      + [ren.join(' ; '), u2 + '/' + u3, cAn, wLa, vM, vM2].join(' ; ') + ')');
    /* puces : seul le champ touché est écrit, une valeur inconnue de cette version reste ; sans nom, l'article écrit aussi le nom (sans nom,
       l'article est toujours « l' ») */
    const q9 = A.plan(70, 1.5);
    await C.injecter(p, {el: [C.P('X9', 'exutoire', q9.x, q9.y, {art: 'les', ep: 'nc', cst: 'xx'})]}); await vue(A);
    await fiche(p, 'X9'); await puceDest(p, 'ep', 'reserve'); const c9 = await champsDe(p, 'X9');
    await puceDest(p, 'art', 'la'); const c9b = await champsDe(p, 'X9'), f9 = await ficheDest(p);
    R.ok(c9 === 'exutoire nom=undefined ab=undefined art=les ep=reserve cst=xx' && c9b === 'exutoire nom=Autre destination ab=undefined art=la ep=reserve cst=xx'
      && f9.puces === 'art=la ep=reserve cst=autre', 'a1 puces : seul le champ touché est écrit, « les » et « xx » restent ; sans nom, l\'article « la » écrit aussi le nom ('
      + [c9, c9b, f9.puces].join(' ; ') + ')');
    R.ok(!A.erreurs.length, 'a1 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}
/* a2 : outil armé d'un modèle (comme le fera la palette de m128) : l'aide, la pose par cotes (aide, panneau, aperçu, « Poser ») et la pose au
   toucher le gardent ; l'outil choisi ensuite par la palette n'en a pas */
async function destinationModele(){
  const A = await croquisTourne(), p = A.p, CH = ['nom', 'ab', 'art', 'ep', 'cst'];
  const ETANG = {nom: 'Étang', ab: 'Ét', art: 'l\'', ep: 'arbitrer', cst: 'autre'}, MARE = {nom: 'Mare', ab: 'Ma', art: 'la', ep: 'reserve', cst: 'recup'};
  const garde = (o, m) => !!o && o.t === 'exutoire' && CH.every(k => o.p[k] === m[k]);
  const nouveaux = async els0 => (await elements(p)).filter(e => !els0.some(x => x.id === e.id));
  try {
    await C.outil(p, {k: 'pt', t: 'exutoire', pal: 'equ', modele: ETANG}); await C.pause(p, 150);
    const aide = await texteAide(p), mod = await p.evaluate(() => JSON.stringify(window.__vcEd.etat.outil.modele || null));
    const okC = await entrerCotes(p), aC = await texteAide(p);
    await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(63.2, 3.3));
    const tp = await textePanneau(p), txt = await textesDessines(p);
    R.ok(mod === JSON.stringify(ETANG) && aide.indexOf('Touchez le plan pour poser : Étang.') === 0 && okC && aC.indexOf('Pose par cotes (Étang).') === 0
      && /Étang posé depuis : Façade/.test(tp) && txt.indexOf('Ét') >= 0 && txt.indexOf('Au') < 0,
      'a2 outil armé du modèle « Étang » : l\'outil le garde ; aide, aide des cotes et panneau le nomment, l\'aperçu écrit « Ét » ('
      + [mod, JSON.stringify(aide), JSON.stringify(aC), JSON.stringify(tp.slice(0, 60)), 'textes ' + txt.filter(s => s.length <= 3).join(' ')].join(' ; ') + ')');
    let els0 = await elements(p);
    const poser = await p.$(FICHE + 'button[data-a="cotesPoser"]'); if (poser){ await poser.click(); await C.pause(p, 400); }
    let nv = await nouveaux(els0), o = nv.length === 1 ? nv[0] : null;
    const fO = await ficheDest(p);
    R.ok(garde(o, ETANG) && fO.nom === 'Étang' && fO.ab === 'Ét' && fO.puces === 'art=l\' ep=arbitrer cst=autre',
      'a2 « Poser » : la destination garde nom, abréviation et jugement du modèle, sa fiche les montre (' + (o ? o.t + ' ' + JSON.stringify(o.p) : nv.length + ' nouvel élément') + ' ; ' + JSON.stringify(fO) + ')');
    /* modèle « Mare » (la, réserve, récupérateur) : « posée » ; posée au toucher, elle garde ses cinq champs, l'outil son modèle */
    await C.outil(p, {k: 'pt', t: 'exutoire', pal: 'equ', modele: MARE}); await C.pause(p, 150);
    const aM = await texteAide(p);
    await entrerCotes(p); await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(63.2, 3.3));
    const tM = await textePanneau(p);
    const stop = await p.$('.vc .vc-aide button[data-a="cotesStop"]'); if (stop){ await stop.click(); await C.pause(p, 250); }
    els0 = await elements(p);
    await toucherPlan(p, A.plan(76, 1.5)); await C.pause(p, 400);
    nv = await nouveaux(els0); o = nv.length === 1 ? nv[0] : null;
    const mod2 = await p.evaluate(() => JSON.stringify(window.__vcEd.etat.outil.modele || null));
    R.ok(aM.indexOf('Touchez le plan pour poser : Mare.') === 0 && /Mare posée depuis : Façade/.test(tM) && garde(o, MARE) && mod2 === JSON.stringify(MARE),
      'a2 modèle « Mare » : « Mare posée depuis : Façade » ; posée au toucher, elle garde ses cinq champs ; l\'outil garde son modèle ('
      + [JSON.stringify(aM), JSON.stringify(tM.slice(0, 60)), o ? JSON.stringify(o.p) : nv.length + ' nouvel élément', mod2].join(' ; ') + ')');
    /* l'outil choisi ensuite par la palette : sans modèle, les champs par défaut */
    await p.evaluate(() => { for (let k = 0; k < 5 && window.__vcEd.fermerNiveau(); k++); });
    await p.click('.vc .vc-o[data-pal="equ"]'); await C.pause(p, 200);
    const b = await p.$('.vc .vc-pitem[data-item="pt:exutoire"]'); if (b){ await b.click(); await C.pause(p, 200); }
    const aP = await texteAide(p), mod3 = await p.evaluate(() => JSON.stringify(window.__vcEd.etat.outil.modele || null));
    els0 = await elements(p);
    await toucherPlan(p, A.plan(70, 1.5)); await C.pause(p, 400);
    nv = await nouveaux(els0); o = nv.length === 1 ? nv[0] : null;
    R.ok(!!b && mod3 === 'null' && aP.indexOf('Touchez le plan pour poser : Autre destination.') === 0 && garde(o, {nom: 'Autre destination', ab: 'Au', art: 'l\'', ep: 'arbitrer', cst: 'autre'}),
      'a2 outil choisi ensuite par la palette : sans modèle, « Autre destination » aux champs par défaut (' + [mod3, JSON.stringify(aP), o ? JSON.stringify(o.p) : nv.length + ' nouvel élément'].join(' ; ') + ')');
    R.ok(!A.erreurs.length, 'a2 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}
/* a3 : nature au dossier (mode intégré) du rejet des EP dans une destination dont le jugement change dans la fiche, même texte (m127) */
async function destinationNature(){
  const A = await croquisTourne(), p = A.p;
  try {
    /* trois étangs « Non conforme », chacun relié à sa descente : l'anomalie entre au dossier sans nature écrite, celle de la règle de
       l'application (« rejet » : non conforme) */
    const els = [];
    for (const k of [1, 2, 3]){
      const q = A.plan(58 + 6 * k, 3.5), qd = A.plan(58 + 6 * k, 1.5);
      els.push(C.P('X' + k, 'exutoire', q.x, q.y, {nom: 'Étang', ab: 'Ét', art: 'l\'', ep: 'nc', cst: 'autre'}), C.P('d' + k, 'descente', qd.x, qd.y, {cote: 'avant', visitable: 'oui'}));
    }
    for (const k of [1, 2, 3]) els.push(C.L('L' + k, 'tr', ['d' + k, 'X' + k], C.index(els)));
    await C.injecter(p, {el: els}); await vue(A);
    /* par anomalie : nature au dossier (écrite, sinon « absent » ; puis celle que lit l'application, anomNC), état et nature dans la liste du
       croquis (s'il est ouvert) ; conclusion proposée du constat */
    const natures = () => p.evaluate(() => {
      const T = window.__VT, ed = window.__vcEd, ouvert = !!T.VC.ctx, v = ouvert ? T.VC.ctx.v : T.S.visites[0], list = T.S.anoms.filter(a => a.visiteId === v.id), r = {};
      list.forEach(a => { r[(a.croquis && a.croquis.cle) || a.observation] = 'dossier ' + (a.nc == null ? 'absent' : a.nc) + '/' + (T.anomNC(a) ? 'NC' : 'réserve'); });
      if (ouvert) ed.liste().forEach(a => { r[a.cle] = (r[a.cle] || 'dossier aucun') + ', croquis ' + a.st + (a.nc ? ' NC' : ' réserve'); });
      return Object.keys(r).sort().map(k => k + ' : ' + r[k]).join(' ; ') + ' ; constat ' + T.constatEval(v, list).auto;
    });
    const att = (n, f) => [1, 2, 3].map(k => 'ep-exu:d' + k + ' : ' + (f || ((k > n) ? 'dossier absent/NC, croquis retenue NC' : 'dossier false/réserve, croquis retenue réserve'))).join(' ; ');
    const n0 = await natures();
    /* « Réserve » par trois chemins : depuis « Non conforme » ; par « Conforme » (l'anomalie quitte le dossier, puis revient de sa copie) ;
       par « À arbitrer » (de même) */
    const chemins = [[1, ['reserve']], [2, ['conforme', 'reserve']], [3, ['arbitrer', 'reserve']]], nk = [];
    for (const [k, suite] of chemins){ await fiche(p, 'X' + k); for (const v of suite) await puceDest(p, 'ep', v); nk.push(await natures()); }
    /* aller et retour : « Non conforme » puis « Réserve » */
    await fiche(p, 'X1'); await puceDest(p, 'ep', 'nc'); const nA = await natures(); await puceDest(p, 'ep', 'reserve'); const nR = await natures();
    await C.fermerCroquis(p); const nF = await natures();
    await C.ouvrirCroquis(p, {dejaCommence: true}); await C.pause(p, 400); const nO = await natures();
    R.ok(n0 === att(0) + ' ; constat non_conformes', 'a3 trois étangs « Non conforme » : l\'anomalie au dossier sans nature écrite, non conforme pour l\'application (' + n0 + ')');
    R.ok(nk[0] === att(1) + ' ; constat non_conformes' && nk[1] === att(2) + ' ; constat non_conformes' && nk[2] === att(3) + ' ; constat reserves',
      'a3 « Réserve » depuis « Non conforme », par « Conforme », par « À arbitrer » : nature écrite au dossier (réserve), « retenue réserve » au croquis ; la conclusion « reserves » ('
      + nk.join(' | ') + ')');
    R.ok(/^ep-exu:d1 : dossier (true|absent)\/NC, croquis retenue NC ; /.test(nA) && nA.indexOf(att(3).slice(att(3).indexOf(' ; '))) > 0 && / ; constat non_conformes$/.test(nA)
      && nR === att(3) + ' ; constat reserves', 'a3 aller et retour : « Non conforme » rend la non-conformité, « Réserve » la réserve (' + nA + ' | ' + nR + ')');
    R.ok(nF === [1, 2, 3].map(k => 'ep-exu:d' + k + ' : dossier false/réserve').join(' ; ') + ' ; constat reserves' && nO === att(3) + ' ; constat reserves',
      'a3 croquis fermé : le dossier garde les réserves, la conclusion « reserves » ; rouvert : de même au croquis (' + nF + ' | ' + nO + ')');
    R.ok(!A.erreurs.length, 'a3 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}
/* a4 (m127) : regard au tampon béton relié au WC, « … fissuré » saisi dans sa fiche, puis le regard passe en EP (la source devient une
   descente, la boîte une boîte EP) */
async function regardNature(){
  const A = await croquisTourne(), p = A.p;
  try {
    const [qw, qr, qb] = [0, 1, 2].map(k => A.plan(62 + 5 * k, 1.5));
    const els = [C.P('w', 'wc', qw.x, qw.y), C.P('R', 'regard', qr.x, qr.y, {tampon: 'beton'}), C.P('B', 'boite', qb.x, qb.y, {res: 'EU'})], I = C.index(els);
    els.push(C.L('t1', 'tr', ['w', 'R'], I), C.L('t2', 'tr', ['R', 'B'], I));
    await C.injecter(p, {el: els}); await vue(A);
    /* anomalie tampon:R au dossier : texte, réseau, nature écrite (sinon « absent ») / lue par l'application (anomNC) ; conclusion proposée */
    const nature = () => p.evaluate(() => {
      const T = window.__VT, v = T.VC.ctx ? T.VC.ctx.v : T.S.visites[0], list = T.S.anoms.filter(a => a.visiteId === v.id), a = list.find(x => x.croquis && x.croquis.cle === 'tampon:R');
      return (a ? '« ' + a.observation + ' » ' + a.reseau + ' ' + (a.nc == null ? 'absent' : a.nc) + '/' + (T.anomNC(a) ? 'NC' : 'réserve') : 'aucune')
        + ' ; constat ' + T.constatEval(v, list).auto;
    });
    const n0 = await nature(), F = '« Regard EU : tampon béton fissuré »';
    await fiche(p, 'R');
    const t = await p.$(FICHE + 'textarea[data-a="recTxt"][data-k="obs"]');
    if (t){ await t.fill('Regard EU : tampon béton fissuré'); await t.evaluate(x => x.blur()); await C.pause(p, 300); }
    const n1 = await nature();
    await p.evaluate(() => {
      const ed = window.__vcEd, d = ed.doc(), w = d.el.find(e => e.id === 'w');
      w.t = 'descente'; w.p.cote = 'avant'; w.p.visitable = 'oui'; d.el.find(e => e.id === 'B').p.res = 'EP'; d.rev = (d.rev || 0) + 1; ed.synchroniser(); ed.enregistrer();
    });
    await C.pause(p, 400); const n2 = await nature(), lc = (await anomsDe(p, 'R')).join(' ; ');
    await C.fermerCroquis(p); const n3 = await nature();
    R.ok(n0 === '« Regard EU : tampon béton » EU absent/NC ; constat non_conformes' && n1 === F + ' EU absent/NC ; constat non_conformes',
      'a4 regard au tampon béton en EU, « … fissuré » saisi dans sa fiche : non conforme au dossier (' + n0 + ' | ' + n1 + ')');
    R.ok(n2 === F + ' EP absent/NC ; constat non_conformes' && lc === 'tampon:R retenue NC ' + F && n3 === n2,
      'a4 le regard passe en EP : le texte nomme un défaut, non conforme au dossier (sans nature écrite) et au croquis, la conclusion '
      + '« non_conformes » ; de même croquis fermé (' + n2 + ' | ' + lc + ' | ' + n3 + ')');
    R.ok(!A.erreurs.length, 'a4 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}
/* a5 (m127) : étang « Non conforme » relié à sa descente ; « Réserve », puis le texte du rejet retouché dans la fiche de la descente
   (« … tampon béton » : la règle de l'application le dit en réserve), puis « Non conforme » */
async function destinationTexte(){
  const A = await croquisTourne(), p = A.p;
  try {
    const q = A.plan(64, 3.5), qd = A.plan(64, 1.5);
    const els = [C.P('X1', 'exutoire', q.x, q.y, {nom: 'Étang', ab: 'Ét', art: 'l\'', ep: 'nc', cst: 'autre'}), C.P('d1', 'descente', qd.x, qd.y, {cote: 'avant', visitable: 'oui'})];
    els.push(C.L('L1', 'tr', ['d1', 'X1'], C.index(els)));
    await C.injecter(p, {el: els}); await vue(A);
    /* anomalie ep-exu:d1 au dossier : texte, nature écrite (sinon « absent ») / lue par l'application (anomNC) ; état et nature au croquis
       (s'il est ouvert) ; conclusion proposée du constat */
    const nature = () => p.evaluate(() => {
      const T = window.__VT, ed = window.__vcEd, ouvert = !!T.VC.ctx, v = ouvert ? T.VC.ctx.v : T.S.visites[0], list = T.S.anoms.filter(a => a.visiteId === v.id);
      const a = list.find(x => x.croquis && x.croquis.cle === 'ep-exu:d1'), c = ouvert ? ed.liste().find(x => x.cle === 'ep-exu:d1') : null;
      return (a ? '« ' + a.observation + ' » ' + (a.nc == null ? 'absent' : a.nc) + '/' + (T.anomNC(a) ? 'NC' : 'réserve') : 'aucune')
        + (ouvert ? ', croquis ' + (c ? c.st + (c.nc ? ' NC' : ' réserve') : 'aucune') : '') + ' ; constat ' + T.constatEval(v, list).auto;
    });
    const n0 = await nature(), TB = 'Descente EP vers l\'étang, tampon béton';
    await fiche(p, 'X1'); await puceDest(p, 'ep', 'reserve'); const n1 = await nature();
    await fiche(p, 'd1');
    const t = await p.$(FICHE + 'textarea[data-a="recTxt"][data-k="obs"]');
    if (t){ await t.fill(TB); await t.evaluate(x => x.blur()); await C.pause(p, 300); }
    const n2 = await nature();
    await fiche(p, 'X1'); await puceDest(p, 'ep', 'nc'); const n3 = await nature();
    await C.fermerCroquis(p); const n4 = await nature();
    const d0 = n0.replace(/^« [^»]* » /, '');
    R.ok(d0 === 'absent/NC, croquis retenue NC ; constat non_conformes' && n1 === n0.replace(d0, 'false/réserve, croquis retenue réserve ; constat reserves')
      && n2 === '« ' + TB + ' » false/réserve, croquis retenue réserve ; constat reserves',
      'a5 « Réserve », puis le texte du rejet rendu « … tampon béton » dans la fiche de la descente : réserve écrite au dossier ('
      + n0 + ' | ' + n1 + ' | ' + n2 + ')');
    R.ok(n3 === '« ' + TB + ' » absent/réserve, croquis retenue réserve ; constat reserves' && n4 === '« ' + TB + ' » absent/réserve ; constat reserves',
      'a5 « Non conforme » : la nature écrite est effacée, la réserve du texte retouché reste, au dossier et au croquis, la conclusion '
      + '« reserves » ; de même croquis fermé (' + n3 + ' | ' + n4 + ')');
    R.ok(!A.erreurs.length, 'a5 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [apercu, boutonRejetSol, rejetPresDunRegard, rejetSansFacade, rejetPresDesMurs, rejetPresDunComplement, puits, destination, destinationModele, destinationNature,
    regardNature, destinationTexte]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
