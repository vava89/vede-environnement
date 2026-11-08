// Bulle « + point » du doigt et du stylet (m110), dans Chromium (données fictives, fond fictif de VCroquis.demoDxf()), outil Choisir :
// b : au doigt, toucher le tronçon choisi hors de ses poignées montre une bulle « + point » (bouton de 44 px au moins, dans l'éditeur, son
//     bas 44 px au-dessus du point touché, sa marque vers le pied), sans changer le croquis ; la toucher ajoute un sommet libre au pied de la
//     projection du point touché (à 1e-6), choisi, en un pas d'annulation (une annulation rend le JSON) ; un double toucher sur la bulle
//     n'ajoute qu'un sommet ; près de la barre, la bulle passe sous le point ; au stylet, de même qu'au doigt (décision D8) ;
// f : la bulle disparaît quand on touche ailleurs (croquis inchangé), un sommet du tronçon (il est choisi) ou le titre de la fiche (hors du
//     plan ; le tronçon reste choisi), sur un glissé du doigt, un pincement, sur Échap (le tracé reste choisi), la molette, un autre outil, un
//     autre choix, Ctrl+Z, une fenêtre redimensionnée, et au bout de 4 s (encore là à 3,5 s) ; jamais sous le doigt : posé sur elle à 3,85 s
//     et relevé à 4,1 s, il ajoute le sommet ; glissé hors d'elle puis relevé, aucun sommet, et elle part 4 s après le lever ;
// t : témoins, aucune bulle : double et triple toucher sur le tracé choisi (aucun sommet), toucher d'une poignée (sommet : il est choisi ;
//     milieu), toucher d'un tracé pas encore choisi (il est choisi), escalier choisi, objet choisi, tracés superposés (le toucher passe au
//     suivant) ; clic de la souris sur le trait, et à 10,5 px du trait, hors du « + » : ce clic passe par le toucher du plan, croquis
//     inchangé (décision D8 : bulle au doigt et au stylet seulement) ; aucune erreur dans la console.
// b et f échouent sur 6067bd5, sauf « le toucher ne change pas le croquis » et l'absence d'erreur dans la console ;
// t passe sur les deux versions.
// j (m115, J2) : écran tactile avec une souris : bulle « + point » ouverte au doigt, puis pause de la souris sur un sommet du même tracé :
//     le menu de poignée s'ouvre et ferme la bulle (jamais les deux ensemble) ; menu ouvert (état posé à la main) et bulle montrée : toucher
//     la bulle ajoute un sommet et ferme le menu ; témoin : bulle seule, la toucher ajoute un sommet. Les deux contrôles de la bulle avec le
//     menu échouent sur 52f0b00 (menu et bulle montrés ensemble ; le toucher de la bulle n'ajoutait rien) ; le témoin passe.
// usage : node tests/navigateur/bulle-point.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('bulle-point');

/* Dossier neuf et croquis ouvert sur le fond fictif. */
async function croquisNeuf(){
  const A = await C.ouvrir(); await C.etudeEtDossier(A.p); await C.ouvrirCroquis(A.p); return A;
}
const elDoc = async (p, id) => (await C.docCroquis(p)).el.find(e => e.id === id);
const jsonEl = async p => JSON.stringify((await C.docCroquis(p)).el);
const selEtat = p => p.evaluate(() => { const s = window.__vcEd.etat.sel; return s ? {id: s.id, sommet: s.sommet} : null; });
const nbUndo = p => p.evaluate(() => window.__vcEd.etat.undo.length);
const decale = (q, dx, dy) => ({x: q.x + dx, y: q.y + dy});
const pt = w => w ? '(' + w.x.toFixed(3) + ' ; ' + w.y.toFixed(3) + ')' : '-';
const pres = (a, b) => !!a && !!b && Math.abs(a.x - b.x) < 1e-6 && Math.abs(a.y - b.y) < 1e-6;
const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
/* dessin fictif injecté, vue centrée sur (x, y) à 63 px/m, outil Choisir, élément id choisi (fiche ouverte) */
async function dessinChoisi(p, els, id, x, y){
  await C.injecter(p, {el: els}); await C.regler(p, x, y, 63); await C.outil(p, {k: 'main'});
  await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 250);
}
const choisir = async (p, id) => { await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 250); };
const annuler = async p => { await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); };
/* tronçon A de trois sommets V ; point du segment j - 1 → j des sommets V, au paramètre t */
const sommetsA = (cx, cy) => [[cx - 3, cy], [cx, cy + 1], [cx + 3, cy]];
const surSeg = (V, j, t) => ({x: V[j - 1][0] + t * (V[j][0] - V[j - 1][0]), y: V[j - 1][1] + t * (V[j][1] - V[j - 1][1])});
/* bulle « + point » montrée : sa boîte et celle de sa marque (pixels de la page) ; null si elle n'est pas montrée */
const bulle = p => p.evaluate(() => {
  const b = document.querySelector('.vc .vc-bulle-point'); if (!b || b.hidden || !b.getClientRects().length) return null;
  const r = b.getBoundingClientRect(), m = b.querySelector('i'), rm = m ? m.getBoundingClientRect() : null, v = document.querySelector('.vc'), rv = v.getBoundingClientRect();
  const x = (r.left + r.right) / 2, y = (r.top + r.bottom) / 2, sous = document.elementFromPoint(x, y);
  return {l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height, x, y, txt: b.textContent.trim(), nom: b.getAttribute('aria-label') || '',
    dedans: r.left >= rv.left && r.top >= rv.top && r.right <= rv.right && r.bottom <= rv.bottom, racine: b.parentElement === v, dessus: !!sous && b.contains(sous),
    marque: rm && rm.width ? {x: (rm.left + rm.right) / 2, t: rm.top, b: rm.bottom} : null};
});
const bTxt = b => b ? 'bulle « ' + b.txt + ' »' : 'aucune bulle';
/* point de la page sur le titre de la fiche ouverte (hors du plan, sans bouton) ; null si la fiche est fermée ou son titre recouvert */
const titreFiche = p => p.evaluate(() => {
  const h = document.querySelector('.vc .vc-panneau:not([hidden]) .vc-ptete h2'), r = h && h.getBoundingClientRect(); if (!r || !r.width) return null;
  const x = r.left + Math.min(r.width / 2, 40), y = r.top + r.height / 2, e = document.elementFromPoint(x, y);
  return e && h.contains(e) ? {x, y} : null;
});
/* dernier toucher du plan (pixels du canevas), et pied, en mètres du plan et en pixels du canevas, de ce point sur le segment j - 1 → j du
   tracé id */
const piedDuToucher = (p, id, j) => p.evaluate(([id, j]) => {
  const S = window.__vcEd.etat, d = S.dernierTap, e = S.doc.el.find(x => x.id === id); if (!d || !e) return null;
  const a = e.v[j - 1], b = e.v[j], m = S.vue.monde(d.x, d.y), dx = b.x - a.x, dy = b.y - a.y;
  const t = Math.max(0, Math.min(1, ((m.x - a.x) * dx + (m.y - a.y) * dy) / (dx * dx + dy * dy))), w = {x: a.x + t * dx, y: a.y + t * dy};
  return {tap: {x: d.x, y: d.y}, pied: w, piedCv: S.vue.ecran(w.x, w.y)};
}, [id, j]);
/* toucher du doigt au centre de la bulle ; faux si elle n'est pas montrée */
async function toucherBulle(p, ms){
  const b = await bulle(p); if (!b) return false;
  await p.touchscreen.tap(b.x, b.y); await C.pause(p, ms == null ? 450 : ms); return true;
}
/* toucher du stylet (pointerType 'pen') au point a de la page, par le protocole de Chromium ; au point q du canevas, sur le plan */
async function styletPage(p, a){
  const s = await p.context().newCDPSession(p), m = (type, o) => s.send('Input.dispatchMouseEvent', Object.assign({type, x: a.x, y: a.y, pointerType: 'pen'}, o));
  try {
    await m('mouseMoved', {button: 'none', buttons: 0});
    await m('mousePressed', {button: 'left', buttons: 1, clickCount: 1});
    await m('mouseReleased', {button: 'left', buttons: 0, clickCount: 1});
  } finally { await s.detach(); }
  await C.pause(p, 450);
}
async function styletCv(p, q){ const a = await C.pageCv(p, q); await C.surLePlan(p, a, 'le toucher du stylet'); await styletPage(p, a); }
/* doigt posé au point a de la page à l'heure t1, relevé à l'heure t2 (heures de Date.now), par le protocole de Chromium ; glisse : son
   déplacement (pixels de la page) avant le lever, ou rien. Rend l'heure du lever. */
async function doigtPage(p, a, t1, t2, glisse){
  const s = await p.context().newCDPSession(p), t = (type, q) => s.send('Input.dispatchTouchEvent', {type, touchPoints: q ? [{x: q.x, y: q.y, id: 1}] : []});
  const attendre = h => new Promise(r => setTimeout(r, Math.max(0, h - Date.now())));
  try {
    await attendre(t1); await t('touchStart', a);
    if (glisse) for (let k = 1; k <= 6; k++) await t('touchMove', {x: a.x + glisse.x * k / 6, y: a.y + glisse.y * k / 6});
    await attendre(t2); const tl = Date.now(); await t('touchEnd', null); return tl;
  } finally { await s.detach(); }
}
/* pincement à deux doigts autour du point q du canevas (écart de 40 à 100 px), par le protocole de Chromium */
async function pincer(p, q){
  const a = await C.pageCv(p, q); await C.surLePlan(p, {x: a.x - 50, y: a.y}, 'le pincement'); await C.surLePlan(p, {x: a.x + 50, y: a.y}, 'le pincement');
  const s = await p.context().newCDPSession(p), t = (type, d) => s.send('Input.dispatchTouchEvent', {type, touchPoints: d == null ? [] : [{x: a.x - d, y: a.y, id: 1}, {x: a.x + d, y: a.y, id: 2}]});
  try {
    await t('touchStart', 20);
    for (let k = 1; k <= 6; k++) await t('touchMove', 20 + 5 * k);
    await t('touchEnd', null);
  } finally { await s.detach(); }
  await C.pause(p, 450);
}

/* b : la bulle, au doigt et au stylet */
async function ouverture(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, V = sommetsA(cx, cy);
    await dessinChoisi(p, [C.L('A', 'tr', V, {})], 'A', cx + 1.5, cy);
    const j0 = await jsonEl(p), u0 = await nbUndo(p), w1 = surSeg(V, 1, .25), q1 = await C.ecranCv(p, w1.x, w1.y);
    /* au quart du segment 1 : à 50 px de son premier sommet et de sa poignée du milieu */
    await C.toucherCv(p, q1);
    const b = await bulle(p), t = await piedDuToucher(p, 'A', 1), a = await C.pageCv(p, t.tap), ap = await C.pageCv(p, t.piedCv), s1 = await selEtat(p), j1 = await jsonEl(p);
    R.ok(!!b && b.txt === '+ point' && b.racine && b.dedans && b.dessus, 'b : au doigt, toucher le tronçon choisi hors de ses poignées : bulle « + point » montrée'
      + ' dans l\'éditeur, au-dessus de ce qui l\'entoure (' + bTxt(b) + (b ? ', nom « ' + b.nom + ' »' + (b.dedans ? '' : ', hors de l\'éditeur') : '') + ')');
    R.ok(!!b && b.w >= 44 && b.h >= 44, 'b : bulle de 44 px au moins (' + (b ? Math.round(b.w) + ' × ' + Math.round(b.h) + ' px' : '-') + ')');
    R.ok(!!b && b.b <= a.y - 43 && b.b >= a.y - 60, 'b : bas de la bulle à 44 px au-dessus du point touché (' + (b ? Math.round(a.y - b.b) + ' px' : '-') + ')');
    R.ok(!!b && !!b.marque && Math.abs(b.marque.x - ap.x) <= 2 && b.marque.t >= b.b - 1 && b.marque.b <= a.y, 'b : marque sous la bulle, vers le pied ('
      + (b && b.marque ? 'écart de ' + Math.abs(b.marque.x - ap.x).toFixed(1) + ' px' : 'aucune marque') + ')');
    R.ok(j1 === j0 && !!s1 && s1.id === 'A', 'b : le toucher ne change pas le croquis, le tronçon reste choisi (' + (j1 === j0 ? 'inchangé' : 'changé') + ', choisi : '
      + (s1 ? s1.id : 'rien') + ')');
    /* toucher la bulle : un sommet libre au pied, choisi, un pas d'annulation */
    const ok = await toucherBulle(p);
    const e2 = await elDoc(p, 'A'), s2 = await selEtat(p), u2 = await nbUndo(p), b2 = await bulle(p);
    R.ok(ok && e2.v.length === 4 && pres(e2.v[1], t.pied) && !e2.v[1].a, 'b : toucher la bulle ajoute un sommet libre au pied de la projection du point touché, à 1e-6 ('
      + e2.v.length + ' sommets, ' + pt(e2.v[1]) + ', attendu ' + pt(t.pied) + ')');
    R.ok(ok && !!s2 && s2.id === 'A' && s2.sommet === 1 && u2 === u0 + 1 && !b2, 'b : le sommet ajouté est choisi, un pas d\'annulation, la bulle est partie ('
      + JSON.stringify(s2) + ', ' + (u2 - u0) + ' pas' + (b2 ? ', bulle encore là' : '') + ')');
    await annuler(p); const j3 = await jsonEl(p);
    R.ok(ok && j3 === j0, 'b : une annulation rend le croquis d\'avant (' + (j3 === j0 ? 'même JSON' : 'JSON différent') + ')');
    /* double toucher sur la bulle : le second toucher tombe sur le plan, il est ignoré */
    await choisir(p, 'A'); await C.toucherCv(p, q1);
    const b4 = await bulle(p);
    if (b4){ await p.touchscreen.tap(b4.x, b4.y); await C.pause(p, 120); await p.touchscreen.tap(b4.x, b4.y); await C.pause(p, 500); }
    const e4 = await elDoc(p, 'A'), s4 = await selEtat(p);
    R.ok(!!b4 && e4.v.length === 4 && !!s4 && s4.id === 'A' && s4.sommet === 1, 'b : double toucher sur la bulle : un seul sommet ajouté, qui reste choisi ('
      + e4.v.length + ' sommets, ' + JSON.stringify(s4) + ')');
    await annuler(p);
    /* au stylet : bulle, puis sommet au pied */
    await choisir(p, 'A'); await styletCv(p, q1);
    const b5 = await bulle(p), t5 = await piedDuToucher(p, 'A', 1);
    if (b5) await styletPage(p, {x: b5.x, y: b5.y});
    const e5 = await elDoc(p, 'A'), s5 = await selEtat(p);
    R.ok(!!b5 && e5.v.length === 4 && pres(e5.v[1], t5.pied) && !!s5 && s5.sommet === 1, 'b : au stylet : bulle « + point », qui ajoute un sommet au pied, choisi ('
      + bTxt(b5) + ', ' + e5.v.length + ' sommets, ' + pt(e5.v[1]) + ', attendu ' + pt(t5 && t5.pied) + ')');
    await annuler(p);
    /* tronçon près de la barre de l'éditeur : la bulle passe sous le point, sa marque vers lui */
    const h1 = await p.evaluate(() => window.__vcEd.etat.vue.monde(300, 110)), h2 = await p.evaluate(() => window.__vcEd.etat.vue.monde(640, 110));
    await dessinChoisi(p, [C.L('H', 'tr', [[h1.x, h1.y], [h2.x, h2.y]], {})], 'H', cx + 1.5, cy);
    const qh = await C.ecranCv(p, (h1.x + h2.x) / 2 - (h2.x - h1.x) / 4, (h1.y + h2.y) / 2 - (h2.y - h1.y) / 4);
    await C.toucherCv(p, qh);
    const bh = await bulle(p), th = await piedDuToucher(p, 'H', 1), ah = th && await C.pageCv(p, th.tap);
    R.ok(!!bh && !!ah && bh.t >= ah.y + 43 && !!bh.marque && bh.marque.b <= bh.t + 1 && bh.marque.t >= ah.y, 'b : point touché près de la barre : la bulle passe'
      + ' 44 px sous lui, sa marque au-dessus d\'elle (' + (bh && ah ? Math.round(bh.t - ah.y) + ' px sous le point' : bTxt(bh)) + ')');
    erreurs(A, 'b');
  } finally { await A.fermer(); }
}

/* f : fermeture de la bulle */
async function fermeture(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, V = sommetsA(cx, cy);
    await dessinChoisi(p, [C.L('A', 'tr', V, {})], 'A', cx + 1.5, cy);
    const j0 = await jsonEl(p), w1 = surSeg(V, 1, .25), q1 = await C.ecranCv(p, w1.x, w1.y), vide = decale(q1, 0, 130);
    /* bulle ouverte au toucher de q1 (le tronçon de nouveau choisi d'abord, s'il ne l'est plus) */
    const montrer = async () => { const s = await selEtat(p); if (!s || s.id !== 'A') await choisir(p, 'A'); await C.toucherCv(p, q1); return !!(await bulle(p)); };
    let o = await montrer(); await C.toucherCv(p, vide); let b = await bulle(p); const j1 = await jsonEl(p);
    R.ok(o && !b && j1 === j0, 'f : toucher ailleurs sur le plan : la bulle disparaît, croquis inchangé (' + (o ? 'ouverte' : 'jamais ouverte') + ', puis ' + bTxt(b)
      + (j1 === j0 ? '' : ', croquis changé') + ')');
    /* toucher un sommet du tronçon, puis le titre de la fiche (hors du plan) : le choix et la vue ne changent pas, seul l'appui hors de la
       bulle la ferme ; le toucher du sommet agit ensuite comme d'habitude (le sommet est choisi) */
    const qS = await C.ecranCv(p, V[1][0], V[1][1]);
    o = await montrer(); await C.toucherCv(p, qS); b = await bulle(p); const sS = await selEtat(p), jS = await jsonEl(p);
    R.ok(o && !b && !!sS && sS.id === 'A' && sS.sommet === 1 && jS === j0, 'f : toucher un sommet du tronçon : la bulle disparaît, le sommet est choisi, croquis'
      + ' inchangé (' + (o ? 'ouverte' : 'jamais ouverte') + ', puis ' + bTxt(b) + ', ' + JSON.stringify(sS) + (jS === j0 ? '' : ', croquis changé') + ')');
    o = await montrer(); const aT = await titreFiche(p); if (aT){ await p.touchscreen.tap(aT.x, aT.y); await C.pause(p, 300); }
    b = await bulle(p); const sT = await selEtat(p), jT = await jsonEl(p);
    R.ok(o && !!aT && !b && !!sT && sT.id === 'A' && jT === j0, 'f : toucher le titre de la fiche : la bulle disparaît, le tronçon reste choisi, croquis inchangé ('
      + (o ? 'ouverte' : 'jamais ouverte') + (aT ? '' : ', titre de la fiche introuvable') + ', puis ' + bTxt(b) + ', choisi : ' + (sT ? sT.id : 'rien')
      + (jT === j0 ? '' : ', croquis changé') + ')');
    o = await montrer(); await C.glisserDoigtCv(p, vide, decale(vide, 60, 0)); b = await bulle(p);
    R.ok(o && !b, 'f : glissé du doigt sur le plan : la bulle disparaît (' + (o ? 'ouverte' : 'jamais ouverte') + ', puis ' + bTxt(b) + ')');
    await C.regler(p, cx + 1.5, cy, 63);
    o = await montrer(); await pincer(p, vide); b = await bulle(p); const jP = await jsonEl(p);
    R.ok(o && !b && jP === j0, 'f : pincement sur le plan : la bulle disparaît, croquis inchangé (' + (o ? 'ouverte' : 'jamais ouverte') + ', puis ' + bTxt(b)
      + (jP === j0 ? '' : ', croquis changé') + ')');
    await C.regler(p, cx + 1.5, cy, 63);
    o = await montrer(); await p.keyboard.press('Escape'); await C.pause(p, 300); b = await bulle(p); const sE = await selEtat(p);
    R.ok(o && !b && !!sE && sE.id === 'A', 'f : Échap ferme la bulle, le tronçon reste choisi (' + (o ? 'ouverte' : 'jamais ouverte') + ', puis ' + bTxt(b)
      + ', choisi : ' + (sE ? sE.id : 'rien') + ')');
    o = await montrer(); const aw = await C.pageCv(p, vide); await p.mouse.move(aw.x, aw.y); await p.mouse.wheel(0, 120); await C.pause(p, 300); b = await bulle(p);
    R.ok(o && !b, 'f : la molette ferme la bulle (' + (o ? 'ouverte' : 'jamais ouverte') + ', puis ' + bTxt(b) + ')');
    await C.regler(p, cx + 1.5, cy, 63);
    o = await montrer(); await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 300); b = await bulle(p);
    R.ok(o && !b, 'f : un autre outil ferme la bulle (' + (o ? 'ouverte' : 'jamais ouverte') + ', puis ' + bTxt(b) + ')');
    await C.outil(p, {k: 'main'}); await C.pause(p, 150);
    o = await montrer(); await choisir(p, null); b = await bulle(p);
    R.ok(o && !b, 'f : un autre choix (plus rien de choisi) ferme la bulle (' + (o ? 'ouverte' : 'jamais ouverte') + ', puis ' + bTxt(b) + ')');
    o = await montrer(); await p.keyboard.press('Control+z'); await C.pause(p, 300); b = await bulle(p);
    R.ok(o && !b, 'f : Ctrl+Z ferme la bulle (' + (o ? 'ouverte' : 'jamais ouverte') + ', puis ' + bTxt(b) + ')');
    o = await montrer(); await p.setViewportSize({width: 1240, height: 790}); await C.pause(p, 400); b = await bulle(p);
    await p.setViewportSize({width: 1280, height: 800}); await C.pause(p, 400); await C.regler(p, cx + 1.5, cy, 63);
    R.ok(o && !b, 'f : fenêtre redimensionnée : la bulle disparaît (' + (o ? 'ouverte' : 'jamais ouverte') + ', puis ' + bTxt(b) + ')');
    o = await montrer(); await C.pause(p, 3000); const b35 = await bulle(p); await C.pause(p, 1000); b = await bulle(p); const j2 = await jsonEl(p);
    R.ok(o && !!b35 && !b && j2 === j0, 'f : sans autre geste, la bulle disparaît au bout de 4 s (' + (o ? 'ouverte' : 'jamais ouverte') + ', à 3,5 s : ' + bTxt(b35)
      + ', à 4,5 s : ' + bTxt(b) + (j2 === j0 ? '' : ', croquis changé') + ')');
    /* doigt posé sur la bulle à 3,85 s, relevé à 4,1 s : la bulle attend le doigt (pas de fermeture sous lui), le sommet est ajouté au pied */
    const aq = await C.pageCv(p, q1); await C.surLePlan(p, aq, 'le toucher');
    let tO = await doigtPage(p, aq, Date.now(), Date.now() + 40); const bA = await bulle(p), tA = await piedDuToucher(p, 'A', 1);
    if (bA) await doigtPage(p, {x: bA.x, y: bA.y}, tO + 3850, tO + 4100);
    await C.pause(p, 450); const eA = await elDoc(p, 'A'), sA = await selEtat(p), bA2 = await bulle(p);
    R.ok(!!bA && eA.v.length === 4 && pres(eA.v[1], tA && tA.pied) && !!sA && sA.sommet === 1 && !bA2, 'f : doigt posé sur la bulle à 3,85 s et relevé à 4,1 s :'
      + ' elle attend le doigt, le sommet est ajouté au pied (' + bTxt(bA) + ', ' + eA.v.length + ' sommets, ' + pt(eA.v[1]) + ', attendu ' + pt(tA && tA.pied)
      + (bA2 ? ', bulle encore là' : '') + ')');
    if (eA.v.length === 4) await annuler(p);
    /* doigt posé sur la bulle à 0,3 s, glissé hors d'elle, relevé à 0,6 s : aucun sommet ; la bulle reste et part 4 s après le lever (encore
       là 3,7 s après, partie à 4,3 s) */
    await choisir(p, 'A'); tO = await doigtPage(p, aq, Date.now(), Date.now() + 40); const bG = await bulle(p);
    const tL = bG ? await doigtPage(p, {x: bG.x, y: bG.y}, tO + 300, tO + 600, {x: -100, y: 0}) : Date.now();
    await C.pause(p, Math.max(0, tL + 3700 - Date.now())); const bG37 = await bulle(p), jG = await jsonEl(p);
    await C.pause(p, Math.max(0, tL + 4300 - Date.now())); const bG43 = await bulle(p);
    R.ok(!!bG && !!bG37 && !bG43 && jG === j0, 'f : doigt posé sur la bulle, glissé hors d\'elle puis relevé : aucun sommet, la bulle part 4 s après le lever ('
      + bTxt(bG) + ', 3,7 s après le lever : ' + bTxt(bG37) + ', à 4,3 s : ' + bTxt(bG43) + (jG === j0 ? '' : ', croquis changé') + ')');
    erreurs(A, 'f');
  } finally { await A.fermer(); }
}

/* t : témoins, aucune bulle */
async function temoins(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, V = sommetsA(cx, cy), W = [[cx - 3, cy - 2], [cx + 3, cy - 2]];
    await dessinChoisi(p, [C.L('A', 'tr', V, {}), C.L('B', 'tr', W, {})], 'A', cx + 1.5, cy);
    const j0 = await jsonEl(p), w1 = surSeg(V, 1, .25), q1 = await C.ecranCv(p, w1.x, w1.y);
    /* double et triple toucher sur le tronçon choisi (120 ms entre les touchers) : aucun sommet, aucune bulle à la fin */
    await C.toucherCv(p, q1, 120); await C.toucherCv(p, q1, 500);
    const bD = await bulle(p), jD = await jsonEl(p);
    await choisir(p, 'A'); await C.toucherCv(p, q1, 120); await C.toucherCv(p, q1, 120); await C.toucherCv(p, q1, 500);
    const bT = await bulle(p), jT = await jsonEl(p);
    R.ok(!bD && jD === j0 && !bT && jT === j0, 't : double et triple toucher sur le tronçon choisi : aucun sommet, aucune bulle (' + bTxt(bD) + ', ' + bTxt(bT)
      + (jD === j0 && jT === j0 ? '' : ', croquis changé') + ')');
    /* poignées : un sommet (il est choisi) ; le milieu d'un segment */
    await choisir(p, 'A'); await C.pause(p, 300);
    const e = await elDoc(p, 'A'), qs = await C.ecranCv(p, e.v[1].x, e.v[1].y), qm = await C.ecranCv(p, (e.v[0].x + e.v[1].x) / 2, (e.v[0].y + e.v[1].y) / 2);
    await C.toucherCv(p, qs); const bS = await bulle(p), sS = await selEtat(p);
    await C.toucherCv(p, qm); const bM = await bulle(p), sM = await selEtat(p), jM = await jsonEl(p);
    R.ok(!bS && !!sS && sS.id === 'A' && sS.sommet === 1 && !bM && !!sM && sM.id === 'A' && jM === j0, 't : toucher une poignée du tronçon choisi : aucune bulle ;'
      + ' le sommet touché est choisi (' + JSON.stringify(sS) + ', puis ' + JSON.stringify(sM) + ', ' + bTxt(bS) + ', ' + bTxt(bM) + ')');
    /* tracé pas encore choisi : il est choisi, aucune bulle */
    const wB = surSeg(W, 1, .25); await C.toucherCv(p, await C.ecranCv(p, wB.x, wB.y)); const bB = await bulle(p), sB = await selEtat(p);
    R.ok(!bB && !!sB && sB.id === 'B', 't : toucher un tracé pas encore choisi : il est choisi, aucune bulle (' + bTxt(bB) + ', choisi : ' + (sB ? sB.id : 'rien') + ')');
    /* escalier choisi, objet choisi */
    const Es = {id: 'E', k: 'ln', t: 'esc', v: [{x: cx - 2, y: cy, a: null}, {x: cx + 1, y: cy, a: null}], p: {larg: '1,00', n: '4', cote: 'g', monte: 'fin', st: 'existant'}, lab: null};
    await dessinChoisi(p, [Es], 'E', cx + 1.5, cy);
    const jE = await jsonEl(p); await C.toucherCv(p, await C.ecranCv(p, cx - 1.25, cy)); const bE = await bulle(p), sE = await selEtat(p), jE2 = await jsonEl(p);
    await dessinChoisi(p, [C.P('r1', 'regard', cx - 1, cy, {tampon: 'fonte'})], 'r1', cx + 1.5, cy);
    await C.toucherCv(p, await C.ecranCv(p, cx - 1, cy)); const bO = await bulle(p), sO = await selEtat(p);
    R.ok(!bE && !!sE && sE.id === 'E' && jE2 === jE && !bO && !!sO && sO.id === 'r1', 't : escalier choisi, regard choisi : un toucher ne montre aucune bulle ('
      + bTxt(bE) + ', ' + bTxt(bO) + (jE2 === jE ? '' : ', croquis changé') + ')');
    /* tracés superposés (« À supprimer » et son remplaçant « Projet »), l'un choisi : le toucher passe au suivant, aucune bulle */
    await dessinChoisi(p, [C.L('S1', 'tr', W, {}, {st: 'supprimer'}), C.L('S2', 'tr', W, {}, {st: 'projet'})], 'S1', cx + 1.5, cy);
    const jS = await jsonEl(p); await C.toucherCv(p, await C.ecranCv(p, wB.x, wB.y)); const bSu = await bulle(p), sSu = await selEtat(p), jS2 = await jsonEl(p);
    R.ok(!bSu && !!sSu && sSu.id === 'S2' && jS2 === jS, 't : tracés superposés, l\'un choisi : le toucher passe au suivant, aucune bulle (' + bTxt(bSu) + ', choisi : '
      + (sSu ? sSu.id : 'rien') + ')');
    /* souris (décision D8 : bulle au doigt et au stylet seulement) : un clic sur le trait, là où est le « + », ne montre pas de bulle ;
       à 10,5 px du trait, le « + » n'est plus montré (10 px au plus) mais le clic touche encore le tronçon (11 px) : il passe par le
       toucher du plan (S.dernierTap au point cliqué), aucune bulle, croquis inchangé, le tronçon reste choisi */
    await dessinChoisi(p, [C.L('A', 'tr', V, {})], 'A', cx + 1.5, cy);
    await C.cliquerCv(p, q1, 'left'); const bC = await bulle(p);
    await dessinChoisi(p, [C.L('A', 'tr', V, {})], 'A', cx + 1.5, cy);
    const jH0 = await jsonEl(p), a0 = await C.ecranCv(p, V[0][0], V[0][1]), a1 = await C.ecranCv(p, V[1][0], V[1][1]), lg = Math.hypot(a1.x - a0.x, a1.y - a0.y);
    const qh = {x: a0.x + .4 * (a1.x - a0.x) - 10.5 * (a1.y - a0.y) / lg, y: a0.y + .4 * (a1.y - a0.y) + 10.5 * (a1.x - a0.x) / lg};
    await C.survolerCv(p, qh); const plusH = await p.evaluate(() => !!window.__vcEd.etat.plus);
    await C.cliquerCv(p, qh, 'left'); const bH = await bulle(p), sH = await selEtat(p), jH = await jsonEl(p);
    const dH = await p.evaluate(() => { const d = window.__vcEd.etat.dernierTap; return d ? {x: d.x, y: d.y} : null; }), parPlan = !!dH && Math.hypot(dH.x - qh.x, dH.y - qh.y) < 1;
    R.ok(!bC && !plusH && parPlan && !bH && !!sH && sH.id === 'A' && jH === jH0, 't : souris : un clic sur le tronçon choisi, sur le trait ou à 10,5 px hors du'
      + ' « + », ne montre pas de bulle (' + bTxt(bC) + ', ' + bTxt(bH) + (plusH ? ', « + » montré à 10,5 px' : '') + (parPlan ? '' : ', clic à 10,5 px pas reçu par'
      + ' le toucher du plan') + (sH && sH.id === 'A' ? '' : ', tronçon plus choisi') + (jH === jH0 ? '' : ', croquis changé') + ')');
    erreurs(A, 't');
  } finally { await A.fermer(); }
}

/* j (m115, J2) : écran tactile avec une souris : bulle « + point » ouverte au doigt, puis pause de la souris sur un sommet du même tracé :
   le menu de poignée s'ouvre et ferme la bulle (le dernier geste l'emporte : jamais les deux ensemble) ; témoin : bulle seule, la toucher
   ajoute un sommet ; menu ouvert (état posé à la main) et bulle montrée : la toucher ajoute toujours un sommet, et ferme le menu */
async function bulleMenu(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, V = sommetsA(cx, cy);
    await dessinChoisi(p, [C.L('A', 'tr', V, {})], 'A', cx + 1.5, cy);
    const j0 = await jsonEl(p), w1 = surSeg(V, 1, .25), q1 = await C.ecranCv(p, w1.x, w1.y), s2 = await C.ecranCv(p, V[2][0], V[2][1]);
    const menuVu = () => p.evaluate(() => { const m = document.querySelector('.vc .vc-menu'); return !!window.__vcEd.etat.menu && !!m && !m.hidden; });
    /* bulle au doigt, puis pause de 0,7 s de la souris sur le dernier sommet */
    await C.toucherCv(p, q1); const b0 = await bulle(p);
    await C.survolerCv(p, decale(s2, 0, -60)); await C.survolerCv(p, s2); await C.pause(p, 700);
    const b1 = await bulle(p), m1 = await menuVu();
    R.ok(!!b0 && m1 && !b1, 'j : bulle « + point » ouverte au doigt, puis pause de la souris sur un sommet du tronçon : le menu de poignée s\'ouvre, la bulle se ferme ('
      + (b0 ? 'bulle montrée au toucher' : 'aucune bulle au toucher') + ', ' + (m1 ? 'menu ouvert' : 'aucun menu') + ', ' + (b1 ? 'bulle encore montrée' : 'bulle fermée') + ')');
    await p.keyboard.press('Escape'); await C.pause(p, 300); await choisir(p, 'A');
    /* témoin : bulle seule, la toucher ajoute un sommet */
    await C.sortirDuPlan(p); await C.toucherCv(p, q1);
    const ok2 = await toucherBulle(p), e2 = await elDoc(p, 'A');
    R.ok(ok2 && e2.v.length === 4, 'j : témoin, bulle seule : la toucher ajoute un sommet (' + (ok2 ? e2.v.length + ' sommets' : 'aucune bulle') + ')');
    await annuler(p); await choisir(p, 'A');
    /* menu ouvert (état posé à la main, comme s'il l'était resté) et bulle montrée : la toucher ajoute un sommet, le menu se ferme */
    await C.toucherCv(p, q1); const b3 = await bulle(p);
    await p.evaluate(() => { const S = window.__vcEd.etat, m = document.querySelector('.vc .vc-menu'); S.menu = {k: 'sommet', id: 'A', i: 2}; m.hidden = false; });
    const m3 = await menuVu(), ok3 = await toucherBulle(p), e3 = await elDoc(p, 'A'), m3b = await menuVu();
    R.ok(!!b3 && m3 && ok3 && e3.v.length === 4 && !m3b, 'j : menu ouvert et bulle montrée : toucher la bulle ajoute un sommet et ferme le menu ('
      + (b3 && m3 ? '' : 'état non posé, ') + (ok3 ? e3.v.length + ' sommets' : 'aucune bulle') + (m3b ? ', menu resté ouvert' : '') + ')');
    if (e3.v.length === 4) await annuler(p);
    const jF = await jsonEl(p);
    R.ok(jF === j0, 'j : une annulation rend le croquis de départ (' + (jF === j0 ? 'rendu' : 'différent') + ')');
    erreurs(A, 'j');
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [ouverture, fermeture, temoins, bulleMenu]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception du test : ' + (e && e.stack || e)); }
  }
  R.fin();
})();
