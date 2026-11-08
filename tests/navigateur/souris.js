// Souris dans l'éditeur du croquis, dans Chromium (données fictives, fond fictif de VCroquis.demoDxf()) : correctifs m100, m109 et m110.
// c : un clic droit ou du milieu ne pose rien et ne choisit rien ; sur le plan, le menu du navigateur est empêché ; témoins : un clic
//     gauche pose un regard, puis le choisit ;
// g : un glissé au bouton droit depuis l'objet choisi ou une poignée du tracé choisi (sommet, milieu) déplace la vue, le dessin ne change
//     pas ; témoins : au bouton droit avec un outil de tracé, la vue bouge sans tracé ; au bouton gauche, le sommet suit la souris ;
// s : survol à la souris, sans bouton : la position est gardée (état S.survol, en pixels du canevas), suit la souris sans redessiner le
//     plan, et s'efface quand la souris quitte le plan ; elle ne suit pas un glissé bouton appuyé, puis prend le point de lever ; elle
//     s'efface quand le bouton est levé hors du plan, et quand le croquis se rouvre ; témoin : le stylet qui survole ne la change pas ;
// d : témoins au doigt : un toucher pose un regard, un glissé depuis un sommet du tracé choisi le déplace.
// c, g et s échouent sur 1e27c7b (sauf les témoins) ; d passe sur les deux versions.
// Menu de poignée à la souris (m109), outil Choisir, tracé choisi, sur des tracés fictifs :
// p : pause de la souris sur la poignée d'un sommet : menu à 0,4 s, près du pointeur, dans l'éditeur, boutons de 44 px au moins, au-dessus
//     de la palette et sous le toast, croquis inchangé ; un mouvement de plus de 3 px relance la minuterie, pas un de 2 px ; pause de 0,2 s
//     seulement, sortie du plan, clic ou molette pendant la pause : aucun menu ; sommet libre : « Retirer le point » et « Ajouter un
//     point », sans « Détacher » ; Échap ferme le menu, le tracé reste choisi ; menu ouvert, un glissé au bouton gauche depuis le point ne
//     fait que fermer le menu, même sur le point (témoin : le glissé suivant le déplace) ;
// r : clic droit sur une poignée : menu ouvert une fois, croquis inchangé ; clic droit hors des poignées ou avec un autre outil : aucun
//     menu, croquis inchangé ; fermeture : clic gauche sur le plan (rien d'autre ; le suivant agit), bouton de l'éditeur (il agit), molette,
//     choix d'un outil, tracé qui n'est plus choisi, Ctrl+Z, fenêtre redimensionnée (le clic suivant agit) ; glissé au bouton droit depuis
//     une poignée : la vue bouge, aucun menu ; clic droit sur un bouton du menu : menu du navigateur empêché, rien ne change ; sommet à
//     60 px de la fiche : menu hors de la fiche, près du pointeur ;
// a : « Retirer le point » (deux sommets, aucun point choisi ; une annulation rend le JSON ; grisé avec sa raison sur un tracé de deux
//     sommets et sur un point porteur), « Ajouter un point » (sommet : milieu du segment suivant, du précédent pour le dernier ; poignée du
//     milieu : milieu du segment ; à 1e-9 ; point ajouté choisi), « Détacher » (v.a nul, point choisi, même JSON que le bouton de la
//     fiche) ; un pas d'annulation par action ; saisie en cours dans la fiche : enregistrée avant l'action (une annulation retire seulement
//     le point) ; double clic sur « Ajouter un point » : le second clic est ignoré, le point ajouté reste choisi ;
// t : témoins, aucun menu : escalier choisi (pause, clic droit), appui long du doigt, stylet qui survole une poignée.
// p, r et a échouent sur f3f8ae9 (sauf les cas « aucun menu » et « croquis inchangé », et les témoins) ; t passe sur les deux versions.
// « + » de la souris sur le tracé choisi (m110), outil Choisir :
// u : survol d'un segment du tronçon choisi, hors des poignées : « + » au pied de la projection (à 1e-6, état S.plus), curseur « copy », à
//     8 px du trait (pas à 14 px) ; il suit la souris le long du trait et d'un segment à l'autre, s'efface quand la souris quitte le plan ;
//     aucun « + » sur une poignée (sommet, milieu, à 12 px d'un sommet) ni quand le menu de poignée est ouvert ; glissé de 50 px depuis le
//     « + » : un sommet de plus, à l'endroit lâché (ou à l'accroche montrée), choisi, un pas d'annulation, une annulation rend le JSON ;
//     glissé jusqu'à un regard : le sommet s'y attache ; simple clic : un sommet libre au pied (à 1e-6), choisi, un pas d'annulation ;
//     double clic sur le « + » : un seul sommet ; aucun redessin la souris immobile ou déplacée à travers le trait (même pied), un redessin
//     le long du trait (compteur des dessins) ; double clic sur « Ajouter un point » du menu posé sur un segment : le second clic, sur le
//     « + », est ignoré (un seul point) ; menu de poignée fermé (Échap, ou clic gauche qui ne fait que le fermer), la souris immobile sur
//     un segment : le « + » revient aussitôt (curseur « copy »), le clic suivant ajoute le sommet à son pied ; témoins : double clic sur le
//     tronçon pas encore choisi (aucun sommet), glissé au bouton droit (la vue bouge), aucun « + » sur un tracé non choisi, avec l'outil
//     Tronçon, sur un escalier choisi, sur des tracés superposés.
// u échoue sur 6067bd5, sauf le survol d'une poignée (aucun « + »), les témoins et l'absence d'erreur dans la console.
// usage : node tests/navigateur/souris.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('souris'), V = process.argv.indexOf('-v') >= 0;

/* Dossier neuf et croquis ouvert sur le fond fictif. */
async function croquisNeuf(){
  const A = await C.ouvrir(); await C.etudeEtDossier(A.p); await C.ouvrirCroquis(A.p); return A;
}
const regards = d => d.el.filter(e => e.t === 'regard');
const elDoc = async (p, id) => (await C.docCroquis(p)).el.find(e => e.id === id);
const choisi = p => p.evaluate(() => { const s = window.__vcEd.etat.sel; return s ? s.id : null; });
const centre = async p => { const v = await C.vue(p); return {x: v.cx, y: v.cy}; };
const decale = (q, dx, dy) => ({x: q.x + dx, y: q.y + dy});
const proche = (a, b, tol) => !!a && typeof a === 'object' && Math.hypot(a.x - b.x, a.y - b.y) <= (tol || 1);
const txt = q => q && typeof q === 'object' ? q.x.toFixed(1) + ', ' + q.y.toFixed(1) : String(q);
const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));

/* c : clics droit, du milieu et gauche */
async function clics(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    await C.injecter(p, {el: []}); await C.regler(p, cx, cy, 63);
    /* contextmenu vu par la fenêtre, après le plan : le menu du navigateur est-il empêché ? */
    await p.evaluate(() => { window.__menus = []; window.addEventListener('contextmenu', e => { window.__menus.push(e.defaultPrevented); }); });
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'});
    await C.cliquerCv(p, await C.ecranCv(p, cx - 3, cy), 'right');
    const n1 = regards(await C.docCroquis(p)).length, m = await p.evaluate(() => window.__menus);
    R.ok(n1 === 0, 'c : clic droit avec l\'outil Regard : aucun regard posé (' + n1 + ')');
    R.ok(m.length === 1 && m[0] === true, 'c : clic droit sur le plan : le menu du navigateur est empêché (contextmenu '
      + (m.length ? m.map(x => x ? 'empêché' : 'permis').join(', ') : 'absent') + ')');
    await C.cliquerCv(p, await C.ecranCv(p, cx - 3, cy - 2), 'middle');
    const n2 = regards(await C.docCroquis(p)).length;
    R.ok(n2 === n1, 'c : clic du milieu avec l\'outil Regard : aucun regard posé (' + n1 + ' puis ' + n2 + ')');
    await C.cliquerCv(p, await C.ecranCv(p, cx - 1, cy + 2), 'left');
    const rg = regards(await C.docCroquis(p)), r = rg.find(e => Math.hypot(e.x - (cx - 1), e.y - (cy + 2)) < 0.3);
    R.ok(rg.length === n2 + 1 && !!r, 'c : témoin : clic gauche avec l\'outil Regard : un regard posé (' + n2 + ' puis ' + rg.length + ')');
    if (!r) return;
    /* outil Choisir, rien de choisi (clic gauche dans le vide) : un clic droit ou du milieu sur le regard ne le choisit pas, un clic gauche
       le choisit */
    await C.outil(p, {k: 'main'}); await C.cliquerCv(p, await C.ecranCv(p, cx - 3, cy + 2), 'left');
    const s0 = await choisi(p);
    await C.cliquerCv(p, await C.ecranCv(p, r.x, r.y), 'right');
    const s1 = await choisi(p);
    R.ok(s0 === null && s1 === null, 'c : outil Choisir : un clic droit sur le regard ne le choisit pas (avant ' + s0 + ', après ' + s1 + ')');
    /* le clic droit a choisi le regard (version d'avant m100) : un clic gauche dans le vide le libère, le cas suivant reste à part */
    if (s1 !== null) await C.cliquerCv(p, await C.ecranCv(p, cx - 3, cy + 2), 'left');
    await C.cliquerCv(p, await C.ecranCv(p, r.x, r.y), 'middle');
    const s1m = await choisi(p);
    R.ok(s1m === null, 'c : outil Choisir, rien de choisi : un clic du milieu sur le regard ne le choisit pas (' + s1m + ')');
    await C.cliquerCv(p, await C.ecranCv(p, r.x, r.y), 'left');
    const s2 = await choisi(p);
    R.ok(s2 === r.id, 'c : témoin : un clic gauche sur le regard le choisit (' + s2 + ')');
    const ev = await p.evaluate(() => {
      const e = new MouseEvent('contextmenu', {bubbles: true, cancelable: true, button: 2}); document.querySelector('.vc .vc-cv').dispatchEvent(e); return e.defaultPrevented;
    });
    R.ok(ev === true, 'c : événement contextmenu sur le canevas : defaultPrevented (' + ev + ')');
    erreurs(A, 'c');
  } finally { await A.fermer(); }
}

/* g : glissés au bouton droit (vue) et au bouton gauche (dessin) */
async function glisses(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    await C.injecter(p, {el: [C.P('r1', 'regard', cx - 1, cy + 2.5, {tampon: 'fonte'}), C.L('A', 'tr', [[cx - 2, cy], [cx + 2, cy]], {})]});
    await C.regler(p, cx, cy, 63);
    await C.outil(p, {k: 'main'});
    /* glissé au bouton droit de q à q + d (pixels) depuis le point pt du plan (repère du croquis) : déplacement de la vue (m) et écart (px)
       entre pt et la souris à l'arrivée ; la vue suit la souris si l'écart est nul */
    async function droit(q, d, pt){
      const c0 = await centre(p);
      await C.glisserSourisCv(p, q, decale(q, d.x, d.y), 'right');
      const c1 = await centre(p), e = await C.ecranCv(p, pt.x, pt.y);
      return {vue: Math.hypot(c1.x - c0.x, c1.y - c0.y), ecart: Math.hypot(e.x - q.x - d.x, e.y - q.y - d.y)};
    }
    const bilan = g => 'vue déplacée de ' + g.vue.toFixed(2) + ' m, écart ' + g.ecart.toFixed(1) + ' px';
    /* le regard choisi */
    const r0 = await elDoc(p, 'r1');
    await C.cliquerCv(p, await C.ecranCv(p, r0.x, r0.y), 'left');
    const s1 = await choisi(p);
    R.ok(s1 === 'r1', 'g : clic gauche : le regard est choisi (' + s1 + ')');
    const g1 = await droit(await C.ecranCv(p, r0.x, r0.y), {x: 60, y: -40}, r0);
    const r1 = await elDoc(p, 'r1'), dr = Math.hypot(r1.x - r0.x, r1.y - r0.y);
    R.ok(dr < 1e-9 && g1.vue > 0.5 && g1.ecart < 2, 'g : glissé au bouton droit depuis le regard choisi : la vue suit la souris, le regard reste'
      + ' (regard déplacé de ' + dr.toFixed(3) + ' m, ' + bilan(g1) + ')');
    /* le tracé choisi : sommet, puis milieu */
    const A0 = (await elDoc(p, 'A')).v;
    await C.cliquerCv(p, await C.ecranCv(p, (A0[0].x + A0[1].x) / 2, (A0[0].y + A0[1].y) / 2), 'left');
    const s2 = await choisi(p);
    R.ok(s2 === 'A', 'g : clic gauche : le tracé est choisi (' + s2 + ')');
    const g2 = await droit(await C.ecranCv(p, A0[0].x, A0[0].y), {x: -60, y: 40}, A0[0]);
    const A1 = (await elDoc(p, 'A')).v, dv = Math.hypot(A1[0].x - A0[0].x, A1[0].y - A0[0].y);
    if (V) R.info('g : sommet (' + A0[0].x.toFixed(3) + ' ; ' + A0[0].y.toFixed(3) + ') puis (' + A1[0].x.toFixed(3) + ' ; ' + A1[0].y.toFixed(3) + ')');
    R.ok(A1.length === 2 && dv < 1e-9 && g2.vue > 0.5 && g2.ecart < 2, 'g : glissé au bouton droit depuis un sommet du tracé choisi : la vue suit la souris, le sommet reste'
      + ' (sommet déplacé de ' + dv.toFixed(3) + ' m, ' + bilan(g2) + ')');
    const M = {x: (A1[0].x + A1[1].x) / 2, y: (A1[0].y + A1[1].y) / 2};
    const g3 = await droit(await C.ecranCv(p, M.x, M.y), {x: 60, y: 40}, M);
    const A2 = (await elDoc(p, 'A')).v;
    R.ok(A2.length === A1.length && g3.vue > 0.5 && g3.ecart < 2, 'g : glissé au bouton droit depuis le milieu du tracé choisi : la vue suit la souris, aucun point ajouté'
      + ' (' + A1.length + ' puis ' + A2.length + ' sommets, ' + bilan(g3) + ')');
    /* témoin : au bouton gauche, le sommet suit la souris */
    const q4 = await C.ecranCv(p, A2[0].x, A2[0].y);
    await C.glisserSourisCv(p, q4, decale(q4, -50, -30), 'left');
    const A3 = (await elDoc(p, 'A')).v, d4 = Math.hypot(A3[0].x - A2[0].x, A3[0].y - A2[0].y);
    R.ok(d4 > 0.3, 'g : témoin : glissé au bouton gauche depuis un sommet du tracé choisi : le sommet suit la souris (déplacé de ' + d4.toFixed(2) + ' m)');
    /* témoin : outil de tracé, glissé au bouton droit : la vue bouge, aucun tracé commencé */
    await C.outil(p, {k: 'ln', id: 'trEU', pal: 'trace'});
    const nl0 = (await C.docCroquis(p)).el.filter(e => e.k === 'ln').length, c5 = await centre(p), q5 = await C.ecranCv(p, A3[0].x - 1.5, A3[0].y);
    await C.glisserSourisCv(p, q5, decale(q5, 50, 40), 'right');
    const nl1 = (await C.docCroquis(p)).el.filter(e => e.k === 'ln').length, c6 = await centre(p), br = await p.evaluate(() => !!window.__vcEd.etat.brouillon);
    R.ok(nl1 === nl0 && !br && Math.hypot(c6.x - c5.x, c6.y - c5.y) > 0.5, 'g : témoin : glissé au bouton droit avec l\'outil Tronçon EU : la vue bouge, aucun tracé'
      + ' (' + nl0 + ' puis ' + nl1 + ' tracés' + (br ? ', tracé commencé' : '') + ')');
    erreurs(A, 'g');
  } finally { await A.fermer(); }
}

/* s : survol à la souris */
async function survol(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    await C.injecter(p, {el: []}); await C.regler(p, cx, cy, 63);
    await C.outil(p, {k: 'main'});
    const etat = () => p.evaluate(() => { const S = window.__vcEd.etat; return {survol: 'survol' in S ? S.survol : 'absent', geste: !!S.geste, ptr: Object.keys(S.ptr).length}; });
    /* dessins du plan, comptés au remplissage de tout le canevas par lequel chacun commence */
    await p.evaluate(() => { const cv = document.querySelector('.vc .vc-cv'), c = cv.getContext('2d'), f = c.fillRect; window.__dessins = 0;
      c.fillRect = function(x, y, w, h){ if (!x && !y && w === cv.width && h === cv.height) window.__dessins++; return f.apply(this, arguments); }; });
    await C.pause(p, 200); await p.evaluate(() => { window.__dessins = 0; });
    const q1 = await C.ecranCv(p, cx - 2, cy + 1), q2 = decale(q1, 37, -21), q3 = decale(q1, -40, 30);
    await C.survolerCv(p, q1); const e1 = await etat();
    R.ok(proche(e1.survol, q1), 's : survol à la souris, sans bouton : position gardée en pixels du canevas (' + txt(e1.survol) + ', attendu ' + txt(q1) + ')');
    await C.survolerCv(p, q2); const e2 = await etat();
    R.ok(proche(e2.survol, q2) && !e2.geste && !e2.ptr, 's : la position suit la souris, sans geste commencé (' + txt(e2.survol) + ', attendu ' + txt(q2)
      + (e2.geste ? ', geste' : '') + (e2.ptr ? ', pointeur suivi' : '') + ')');
    await C.pause(p, 150);
    const nd = await p.evaluate(() => window.__dessins);
    await p.evaluate(() => window.__vcEd.redessiner()); await C.pause(p, 150);
    const nd2 = await p.evaluate(() => window.__dessins);
    R.ok(nd === 0 && nd2 > nd, 's : le survol ne redessine pas le plan (' + nd + ' dessin pendant le survol, ' + (nd2 - nd) + ' après une demande de dessin)');
    await C.sortirDuPlan(p); const e3 = await etat();
    R.ok(e3.survol === null, 's : souris sortie du plan (sur la barre de l\'éditeur) : survol effacé (' + txt(e3.survol) + ')');
    /* bouton appuyé : la position ne suit pas le glissé (ici, la vue se déplace) */
    await C.survolerCv(p, q1); let pendant;
    await C.glisserSourisCv(p, q1, q3, 'left', {avantLever: async () => { pendant = (await etat()).survol; }});
    R.ok(proche(pendant, q1), 's : bouton gauche appuyé : le survol ne suit pas le glissé (' + txt(pendant) + ', attendu ' + txt(q1) + ')');
    const e5 = await etat();
    R.ok(proche(e5.survol, q3), 's : bouton levé sur le plan : le survol prend le point de lever (' + txt(e5.survol) + ', attendu ' + txt(q3) + ')');
    /* glissé au bouton droit, levé hors du plan (sur la barre) : le pointerleave qui suit le lever efface le survol */
    await C.glisserSourisHorsPlan(p, q1, 'right'); const e6 = await etat();
    R.ok(e6.survol === null, 's : bouton levé hors du plan (sur la barre de l\'éditeur) : survol effacé (' + txt(e6.survol) + ')');
    /* stylet qui survole le plan sans le toucher : rien n'est gardé (décision D8 : survol à la souris seulement) */
    await C.sortirDuPlan(p); await C.survolerStyletCv(p, q2); const e4 = await etat();
    R.ok(!proche(e4.survol, q2, 3), 's : témoin : le stylet qui survole le plan ne change pas le survol (' + txt(e4.survol) + ')');
    /* croquis enregistré, puis fermé au clavier (Échap) la souris sur le plan : le canevas quitte la page sans pointerleave. Rouvert par
       le bouton de l'hôte (la souris va sur le bouton) : l'ancienne position n'est plus gardée. */
    await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer(); }); await C.pause(p, 500);
    await C.survolerCv(p, q1); const e7 = await etat();
    await p.keyboard.press('Escape'); await p.waitForFunction(() => !document.querySelector('#modal-root .vc'), null, {timeout: 10000}); await C.pause(p, 600);
    await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 300);
    const e8 = await etat();
    R.ok(proche(e7.survol, q1) && e8.survol === null, 's : croquis fermé au clavier, la souris sur le plan, puis rouvert : survol effacé (avant '
      + txt(e7.survol) + ', après ' + txt(e8.survol) + ')');
    erreurs(A, 's');
  } finally { await A.fermer(); }
}

/* d : témoins au doigt */
async function doigt(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    await C.injecter(p, {el: [C.L('A', 'tr', [[cx - 2, cy], [cx + 2, cy]], {})]}); await C.regler(p, cx, cy, 63);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.toucherCv(p, await C.ecranCv(p, cx - 1, cy + 2.5), 600);
    const n = regards(await C.docCroquis(p)).length;
    R.ok(n === 1, 'd : témoin : au doigt, un toucher avec l\'outil Regard pose un regard (' + n + ')');
    await C.outil(p, {k: 'main'}); await C.toucherCv(p, await C.ecranCv(p, cx, cy), 700);
    const s = await choisi(p);
    R.ok(s === 'A', 'd : au doigt, le tracé est choisi (' + s + ')');
    const w0 = (await elDoc(p, 'A')).v[0], q = await C.ecranCv(p, w0.x, w0.y);
    await C.glisserDoigtCv(p, q, decale(q, -50, 40), 600);
    const w1 = (await elDoc(p, 'A')).v[0], dm = Math.hypot(w1.x - w0.x, w1.y - w0.y);
    R.ok(dm > 0.3, 'd : témoin : au doigt, un glissé depuis un sommet du tracé choisi le déplace (' + dm.toFixed(2) + ' m)');
    erreurs(A, 'd');
  } finally { await A.fermer(); }
}

/* --- menu de poignée (m109) --- */
/* menu de poignée affiché : null s'il est caché ou absent ; sinon ses boutons (texte, grisé, title, hauteur), sa boîte (pixels de la page),
   s'il tient dans l'éditeur, et les z-index du menu, de la palette et du toast */
const menu = p => p.evaluate(() => {
  const m = document.querySelector('.vc .vc-menu'); if (!m || m.hidden || !m.getClientRects().length) return null;
  const b = m.getBoundingClientRect(), r = document.querySelector('.vc').getBoundingClientRect();
  const z = s => { const e = s ? document.querySelector('.vc ' + s) : m; return e ? Number(getComputedStyle(e).zIndex) : NaN; };
  return {items: [...m.querySelectorAll('button')].map(x => ({txt: x.textContent.trim(), dis: x.disabled, title: x.title || '', h: x.getBoundingClientRect().height})),
    l: b.left, t: b.top, r: b.right, b: b.bottom, dedans: b.left >= r.left && b.top >= r.top && b.right <= r.right && b.bottom <= r.bottom,
    z: z(''), zPal: z('.vc-palette'), zToast: z('.vc-toast')};
});
const libs = m => m ? m.items.map(x => x.txt).join(', ') : 'aucun menu';
const item = (m, t) => m ? m.items.find(x => x.txt === t) : undefined;
const jsonEl = async p => JSON.stringify((await C.docCroquis(p)).el);
const selEtat = p => p.evaluate(() => { const s = window.__vcEd.etat.sel; return s ? {id: s.id, sommet: s.sommet} : null; });
const nbUndo = p => p.evaluate(() => window.__vcEd.etat.undo.length);
const sommetCv = async (p, id, i) => { const e = await elDoc(p, id); return C.ecranCv(p, e.v[i].x, e.v[i].y); };
const milieuCv = async (p, id, j) => { const e = await elDoc(p, id), a = e.v[j - 1], b = e.v[j]; return C.ecranCv(p, (a.x + b.x) / 2, (a.y + b.y) / 2); };
const mil = (a, b) => ({x: (a.x + b.x) / 2, y: (a.y + b.y) / 2});
const egal = (a, b) => !!a && !!b && Math.abs(a.x - b.x) < 1e-9 && Math.abs(a.y - b.y) < 1e-9;
const pt = w => w ? '(' + w.x.toFixed(3) + ' ; ' + w.y.toFixed(3) + ')' : '-';
/* souris amenée au point q du canevas (sur le plan), sans pause */
async function amener(p, q){ const a = await C.pageCv(p, q); await C.surLePlan(p, a, 'le survol'); await p.mouse.move(a.x, a.y); }
/* horloge de la page : instants (performance.now) des survols de la souris (pointermove sans bouton) et des ouvertures du menu (boutons
   écrits dans .vc-menu) */
const horloge = p => p.evaluate(() => {
  const h = window.__h = {mv: [], ouv: []};
  window.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' && !e.buttons) h.mv.push(performance.now()); }, true);
  new MutationObserver(rs => rs.forEach(r => { if (r.type === 'childList' && r.addedNodes.length && r.target.classList && r.target.classList.contains('vc-menu')) h.ouv.push(performance.now()); }))
    .observe(document.querySelector('.vc'), {childList: true, subtree: true});
});
const dernierSurvol = p => p.evaluate(() => window.__h.mv[window.__h.mv.length - 1]);
const ouvertures = p => p.evaluate(() => window.__h.ouv.length);
/* clic droit au point q du canevas, puis le menu */
async function menuSur(p, q){ await C.cliquerCv(p, q, 'right'); return menu(p); }
/* centre du bouton t du menu (pixels de la page) ; null s'il n'y est pas */
const centreBouton = (p, t) => p.evaluate(t => { const m = document.querySelector('.vc .vc-menu'), x = m && !m.hidden && [...m.querySelectorAll('button')].find(e => e.textContent.trim() === t);
  if (!x) return null; const r = x.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2}; }, t);
/* clic de la souris sur le bouton t du menu ; faux s'il n'y est pas */
async function choisirMenu(p, t){
  const b = await centreBouton(p, t); if (!b) return false;
  await p.mouse.click(b.x, b.y); await C.pause(p, 400); return true;
}
/* boîte de la fiche ouverte (pixels de la page) ; null si elle est fermée */
const boiteFiche = p => p.evaluate(() => { const e = document.querySelector('.vc .vc-panneau'); if (!e || e.hidden) return null;
  const b = e.getBoundingClientRect(); return {l: b.left, t: b.top, r: b.right, b: b.bottom}; });
/* distance du point a (pixels de la page) à la boîte du menu m */
const ecartMenu = (m, a) => Math.hypot(Math.max(m.l - a.x, 0, a.x - m.r), Math.max(m.t - a.y, 0, a.y - m.b));
/* Échap, seulement si le menu est ouvert (sinon Échap libérerait l'élément choisi) */
async function echap(p){ if (await menu(p)){ await p.keyboard.press('Escape'); await C.pause(p, 300); } }
/* dessin fictif injecté, vue centrée sur (x, y) à 63 px/m, outil Choisir, élément id choisi (fiche ouverte) */
async function dessinChoisi(p, els, id, x, y){
  await C.injecter(p, {el: els}); await C.regler(p, x, y, 63); await C.outil(p, {k: 'main'});
  await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 250);
}
/* tracé A de trois sommets, (cx - 3 ; cy), (cx ; cy + 1), (cx + 3 ; cy), vue décalée vers la droite (la fiche cache la droite du plan) */
const traceA = (cx, cy) => [C.L('A', 'tr', [[cx - 3, cy], [cx, cy + 1], [cx + 3, cy]], {})];

/* p : pause de la souris sur une poignée */
async function menuPause(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    await dessinChoisi(p, traceA(cx, cy), 'A', cx + 1.5, cy); await horloge(p);
    const j0 = await jsonEl(p), q1 = await sommetCv(p, 'A', 1), loin = decale(q1, 0, -100);
    await C.survolerCv(p, loin); await C.pause(p, 300);
    /* 0,2 s sur la poignée, puis départ : aucun menu */
    await amener(p, q1); await C.pause(p, 200); const m0 = await menu(p);
    await amener(p, loin); await C.pause(p, 500); const m0b = await menu(p);
    R.ok(!m0 && !m0b, 'p : pause de 0,2 s sur la poignée, puis départ : aucun menu (' + (m0 || m0b ? 'menu ouvert' : 'aucun') + ')');
    /* arrivée sur le sommet du milieu, mouvement de 5 px après 0,25 s (la minuterie repart), pause : menu 0,4 s après le mouvement */
    const q1b = decale(q1, 4, 3);
    await amener(p, q1); await C.pause(p, 250); await amener(p, q1b); const tMv = await dernierSurvol(p);
    await C.pause(p, 750);
    const m = await menu(p), ouv = await p.evaluate(() => window.__h.ouv.slice()), dt = ouv.length ? ouv[0] - tMv : NaN;
    R.ok(!!m && ouv.length === 1 && dt >= 380, 'p : pause de la souris sur la poignée d\'un sommet : menu ouvert 0,4 s après le dernier mouvement de plus de 3 px ('
      + (m ? 'ouvert' : 'aucun menu') + (ouv.length ? ', ' + Math.round(dt) + ' ms après le mouvement' : '') + ', ' + ouv.length + ' ouverture)');
    if (m){
      const a = await C.pageCv(p, q1b), d = ecartMenu(m, a);
      R.ok(libs(m) === 'Retirer le point, Ajouter un point' && !m.items[0].dis, 'p : sommet libre d\'un tracé de trois sommets : « Retirer le point » et'
        + ' « Ajouter un point », sans « Détacher » (' + libs(m) + (m.items[0] && m.items[0].dis ? ', grisé' : '') + ')');
      R.ok(m.items.every(x => x.h >= 44), 'p : boutons du menu de 44 px de haut au moins (' + m.items.map(x => Math.round(x.h)).join(', ') + ' px)');
      R.ok(m.dedans && d <= 40, 'p : menu dans l\'éditeur, près du pointeur (' + Math.round(d) + ' px du pointeur' + (m.dedans ? '' : ', hors de l\'éditeur') + ')');
      R.ok(m.z > m.zPal && m.z < m.zToast, 'p : menu au-dessus de la palette et sous le toast (z-index ' + m.z + ', palette ' + m.zPal + ', toast ' + m.zToast + ')');
    } else R.ok(false, 'p : contenu, taille et place du menu : aucun menu');
    const j1 = await jsonEl(p);
    R.ok(j1 === j0, 'p : le menu ouvert ne change pas le croquis');
    /* Échap ferme le menu ; le tracé reste choisi et l'éditeur ouvert */
    if (m){
      await p.keyboard.press('Escape'); await C.pause(p, 300);
      const m2 = await menu(p), s = await choisi(p), ouvert = await p.evaluate(() => !!document.querySelector('#modal-root .vc'));
      R.ok(!m2 && s === 'A' && ouvert, 'p : Échap ferme le menu, le tracé reste choisi (' + (m2 ? 'menu ouvert' : 'menu fermé') + ', choisi : ' + s + (ouvert ? '' : ', éditeur fermé') + ')');
    } else R.ok(false, 'p : Échap ferme le menu : aucun menu');
    /* mouvement de 2 px pendant la pause : la minuterie continue */
    await amener(p, loin); await C.pause(p, 300); const n2 = await ouvertures(p);
    await amener(p, q1); const tA = await dernierSurvol(p); await C.pause(p, 250); await amener(p, decale(q1, 2, 0)); const tB = await dernierSurvol(p);
    await C.pause(p, 500);
    const m3 = await menu(p), o3 = await p.evaluate(n => window.__h.ouv.slice(n), n2), d3 = o3.length ? o3[0] - tA : NaN;
    R.ok(!!m3 && o3.length === 1 && d3 >= 380 && o3[0] - tB < 300, 'p : mouvement de 2 px pendant la pause : la minuterie continue (' + (o3.length ? 'menu ouvert '
      + Math.round(d3) + ' ms après l\'arrivée, ' + Math.round(o3[0] - tB) + ' ms après le mouvement' : 'aucun menu') + ')');
    await echap(p);
    /* pause sur la poignée du milieu d'un segment : seul « Ajouter un point » */
    const qm = await milieuCv(p, 'A', 1);
    await amener(p, loin); await C.pause(p, 300); await amener(p, qm); await C.pause(p, 650);
    const m4 = await menu(p);
    R.ok(libs(m4) === 'Ajouter un point', 'p : pause sur la poignée du milieu d\'un segment : menu « Ajouter un point » (' + libs(m4) + ')');
    await echap(p);
    /* souris sortie du plan pendant la pause (directement sur le titre de la barre) : aucun menu */
    await amener(p, loin); await C.pause(p, 300); const n5 = await ouvertures(p);
    await amener(p, q1); await C.pause(p, 150); const b = await C.titreBarre(p); await p.mouse.move(b.x, b.y); await C.pause(p, 600);
    const m5 = await menu(p), n5b = await ouvertures(p);
    R.ok(!m5 && n5b === n5, 'p : souris sortie du plan pendant la pause : aucun menu (' + (n5b - n5) + ' ouverture)');
    /* clic sur la poignée pendant la pause : aucun menu */
    await C.survolerCv(p, loin); await C.pause(p, 300); const n6 = await ouvertures(p);
    await amener(p, q1); await C.pause(p, 150); await p.mouse.down(); await p.mouse.up(); await C.pause(p, 650);
    const m6 = await menu(p), n6b = await ouvertures(p);
    R.ok(!m6 && n6b === n6, 'p : clic sur la poignée pendant la pause : aucun menu (' + (n6b - n6) + ' ouverture)');
    /* molette pendant la pause (la vue grandit autour de la souris, qui reste sur la poignée) : aucun menu */
    await amener(p, loin); await C.pause(p, 300); const n7 = await ouvertures(p);
    await amener(p, q1); await C.pause(p, 150); await p.mouse.wheel(0, -100); await C.pause(p, 650);
    const m7 = await menu(p), n7b = await ouvertures(p);
    R.ok(!m7 && n7b === n7, 'p : molette pendant la pause : aucun menu (' + (n7b - n7) + ' ouverture)');
    /* menu ouvert par la pause, glissé au bouton gauche depuis le point : l'appui ne fait que fermer le menu, même sur le point, qui ne
       bouge pas [p] ; témoin : le glissé suivant le déplace */
    await C.regler(p, cx + 1.5, cy, 63);
    const q8 = await sommetCv(p, 'A', 1), q8b = decale(q8, -40, -30), w8 = (await elDoc(p, 'A')).v[1];
    await amener(p, decale(q8, 0, -100)); await C.pause(p, 300); await amener(p, q8); await C.pause(p, 650);
    const m8 = await menu(p), j8 = await jsonEl(p);
    await C.glisserSourisCv(p, q8, q8b, 'left');
    const m8b = await menu(p), j8b = await jsonEl(p);
    R.ok(!!m8 && !m8b && j8b === j8, 'p : menu ouvert par la pause, glissé au bouton gauche depuis le point : le menu se ferme, même sur le point, qui ne bouge pas ('
      + (m8 ? (m8b ? 'menu ouvert' : 'menu fermé') + (j8b === j8 ? '' : ', croquis changé') : 'aucun menu') + ')');
    await C.glisserSourisCv(p, q8, q8b, 'left');
    const w8b = (await elDoc(p, 'A')).v[1], d8 = Math.hypot(w8b.x - w8.x, w8b.y - w8.y);
    R.ok(d8 > 0.3, 'p : témoin : le glissé suivant déplace le point (déplacé de ' + d8.toFixed(2) + ' m)');
    erreurs(A, 'p');
  } finally { await A.fermer(); }
}

/* r : clic droit et fermeture du menu */
async function menuClicDroit(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, VX = cx + 1.5;
    await dessinChoisi(p, traceA(cx, cy), 'A', VX, cy); await horloge(p);
    const j0 = await jsonEl(p), q0 = await sommetCv(p, 'A', 0), q1 = await sommetCv(p, 'A', 1), vide = decale(q1, 0, -100);
    await C.survolerCv(p, vide); await C.pause(p, 200);
    /* clic droit sur un sommet : menu ouvert une fois, croquis inchangé */
    const m1 = await menuSur(p, q0), n1 = await ouvertures(p);
    R.ok(!!m1 && n1 === 1, 'r : clic droit sur la poignée d\'un sommet : menu ouvert une fois (' + n1 + ' ouverture ; ' + libs(m1) + ')');
    R.ok(await jsonEl(p) === j0, 'r : le clic droit ne change pas le croquis');
    /* clic gauche sur le plan, le menu ouvert : le menu se ferme, rien d'autre ; le clic suivant agit */
    if (m1){
      await C.cliquerCv(p, vide, 'left'); const m2 = await menu(p), s2 = await choisi(p), j2 = await jsonEl(p);
      R.ok(!m2 && s2 === 'A' && j2 === j0, 'r : clic gauche sur le plan, le menu ouvert : le menu se ferme, sans autre effet (' + (m2 ? 'menu ouvert' : 'menu fermé')
        + ', choisi : ' + s2 + (j2 === j0 ? '' : ', croquis changé') + ')');
      await C.cliquerCv(p, vide, 'left'); const s3 = await choisi(p);
      R.ok(s3 === null, 'r : témoin : le clic gauche suivant dans le vide libère le tracé (choisi : ' + s3 + ')');
    } else R.ok(false, 'r : fermeture par un clic gauche sur le plan : aucun menu');
    const rechoisir = async () => { if (await choisi(p) !== 'A'){ await p.evaluate(() => window.__vcEd.selectionner('A')); await C.pause(p, 250); } };
    /* clic droit hors des poignées : aucun menu, croquis inchangé */
    await rechoisir(); const n4 = await ouvertures(p);
    await C.cliquerCv(p, vide, 'right'); const m4 = await menu(p), n4b = await ouvertures(p), j4 = await jsonEl(p);
    R.ok(!m4 && n4b === n4 && j4 === j0, 'r : clic droit hors des poignées du tracé choisi : aucun menu, croquis inchangé (' + (n4b - n4) + ' ouverture'
      + (j4 === j0 ? '' : ', croquis changé') + ')');
    /* autre outil (Tronçon EU) : clic droit sur une poignée du tracé choisi, ni menu ni tracé */
    await C.outil(p, {k: 'ln', id: 'trEU', pal: 'trace'}); const n5 = await ouvertures(p), s5 = await choisi(p);
    await C.cliquerCv(p, q1, 'right');
    const m5 = await menu(p), n5b = await ouvertures(p), br = await p.evaluate(() => !!window.__vcEd.etat.brouillon), j5 = await jsonEl(p);
    R.ok(!m5 && n5b === n5 && !br && j5 === j0, 'r : outil Tronçon EU, clic droit sur une poignée (tracé choisi : ' + s5 + ') : ni menu ni tracé ('
      + (n5b - n5) + ' ouverture' + (br ? ', tracé commencé' : '') + (j5 === j0 ? '' : ', croquis changé') + ')');
    await C.outil(p, {k: 'main'}); await rechoisir();
    /* glissé au bouton droit depuis une poignée : la vue bouge, aucun menu */
    const n6 = await ouvertures(p), c0 = await centre(p);
    await C.glisserSourisCv(p, q1, decale(q1, 60, 40), 'right');
    const c1 = await centre(p), m6 = await menu(p), n6b = await ouvertures(p), dv = Math.hypot(c1.x - c0.x, c1.y - c0.y);
    R.ok(!m6 && n6b === n6 && dv > 0.5, 'r : glissé au bouton droit depuis une poignée : la vue bouge, aucun menu (vue déplacée de ' + dv.toFixed(2) + ' m, '
      + (n6b - n6) + ' ouverture)');
    await C.regler(p, VX, cy, 63);
    /* fermetures : molette, choix d'un outil, tracé qui n'est plus choisi */
    const ferme = async (k, agir) => {
      await rechoisir();
      const m = await menuSur(p, await sommetCv(p, 'A', 0));
      if (!m){ R.ok(false, 'r : fermeture par ' + k + ' : aucun menu'); return; }
      await agir(); await C.pause(p, 250); const mf = await menu(p);
      R.ok(!mf, 'r : ' + k + ' ferme le menu (' + (mf ? 'menu ouvert' : 'menu fermé') + ')');
    };
    await ferme('la molette', () => p.mouse.wheel(0, -100)); await C.regler(p, VX, cy, 63);
    await ferme('le choix d\'un outil (Choisir)', () => C.outil(p, {k: 'main'}));
    await ferme('la perte de la sélection', () => p.evaluate(() => window.__vcEd.selectionner(null)));
    /* « Ajouter un point », menu rouvert, puis Ctrl+Z : l'ajout est annulé et le menu se ferme */
    await rechoisir();
    const m7 = await menuSur(p, await sommetCv(p, 'A', 0)), ok7 = !!m7 && await choisirMenu(p, 'Ajouter un point'), n7 = (await elDoc(p, 'A')).v.length;
    if (ok7){
      const m8 = await menuSur(p, await sommetCv(p, 'A', 0));
      await p.keyboard.press('Control+z'); await C.pause(p, 300);
      const m9 = await menu(p), j9 = await jsonEl(p);
      R.ok(n7 === 4 && !!m8 && !m9 && j9 === j0, 'r : Ctrl+Z, le menu ouvert après « Ajouter un point » : l\'ajout est annulé, le menu se ferme (' + n7 + ' sommets après l\'ajout'
        + (m8 ? '' : ', menu non rouvert') + (m9 ? ', menu ouvert' : '') + (j9 === j0 ? '' : ', croquis différent de l\'original') + ')');
    } else R.ok(false, 'r : fermeture par Ctrl+Z : aucun menu');
    /* bouton de l'éditeur (Zoom avant), le menu ouvert : le menu se ferme et le bouton agit */
    await rechoisir();
    const m10 = await menuSur(p, await sommetCv(p, 'A', 0)), s0 = (await C.vue(p)).s;
    await p.click('.vc [data-a="zoomp"]'); await C.pause(p, 400);
    const m11 = await menu(p), s1 = (await C.vue(p)).s;
    R.ok(!!m10 && !m11 && s1 > s0 * 1.2, 'r : bouton « Zoom avant », le menu ouvert : le menu se ferme et le zoom se fait (' + (m10 ? (m11 ? 'menu ouvert' : 'menu fermé') : 'aucun menu')
      + ', échelle ' + s0.toFixed(1) + ' puis ' + s1.toFixed(1) + ' px/m)');
    /* clic droit sur un bouton du menu : le menu du navigateur est empêché, rien ne change, le menu reste ouvert */
    await C.regler(p, VX, cy, 63); await rechoisir();
    const m12 = await menuSur(p, await sommetCv(p, 'A', 0)), b12 = m12 && await centreBouton(p, 'Ajouter un point');
    await p.evaluate(() => { window.__menus = []; window.addEventListener('contextmenu', e => { window.__menus.push(e.defaultPrevented); }); });
    if (b12){ await p.mouse.click(b12.x, b12.y, {button: 'right'}); await C.pause(p, 300); }
    const cm = await p.evaluate(() => window.__menus), m13 = await menu(p), j13 = await jsonEl(p);
    R.ok(!!b12 && cm.length === 1 && cm[0] === true && !!m13 && j13 === j0, 'r : clic droit sur un bouton du menu : le menu du navigateur est empêché, rien ne change,'
      + ' le menu reste ouvert (' + (b12 ? 'contextmenu ' + (cm.length ? (cm[0] ? 'empêché' : 'non empêché') : 'absent') + (m13 ? '' : ', menu fermé')
      + (j13 === j0 ? '' : ', croquis changé') : 'aucun menu') + ')');
    await echap(p);
    /* dernier sommet à 60 px de la fiche : le menu s'ouvre de l'autre côté du pointeur, hors de la fiche, et reste près du pointeur */
    const f = await boiteFiche(p);
    if (f){
      const a2 = await C.pageCv(p, await sommetCv(p, 'A', 2)); await C.regler(p, VX + (a2.x - (f.l - 60)) / 63, cy, 63);
      const q2 = await sommetCv(p, 'A', 2), a2b = await C.pageCv(p, q2), m16 = await menuSur(p, q2);
      const hors = !!m16 && (m16.r <= f.l || m16.l >= f.r || m16.b <= f.t || m16.t >= f.b), d16 = m16 ? ecartMenu(m16, a2b) : NaN;
      R.ok(hors && m16.dedans && d16 <= 40, 'r : dernier sommet à 60 px de la fiche : le menu s\'ouvre hors de la fiche, près du pointeur ('
        + (m16 ? (hors ? 'hors de la fiche' : 'sur la fiche') + (m16.dedans ? '' : ', hors de l\'éditeur') + ', ' + Math.round(d16) + ' px du pointeur' : 'aucun menu') + ')');
      await echap(p); await C.regler(p, VX, cy, 63);
    } else R.ok(false, 'r : menu près de la fiche : fiche fermée');
    /* fenêtre redimensionnée (rotation de la tablette), le menu ouvert : le menu se ferme ; le clic suivant agit */
    await rechoisir();
    const m14 = await menuSur(p, await sommetCv(p, 'A', 0));
    await p.setViewportSize({width: 1180, height: 760}); await C.pause(p, 400);
    const m15 = await menu(p); await C.cliquerCv(p, decale(await sommetCv(p, 'A', 1), 0, -100), 'left'); const s15 = await choisi(p);
    R.ok(!!m14 && !m15 && s15 === null, 'r : fenêtre redimensionnée, le menu ouvert : le menu se ferme, le clic suivant agit ('
      + (m14 ? (m15 ? 'menu ouvert' : 'menu fermé') + ', choisi : ' + s15 : 'aucun menu') + ')');
    erreurs(A, 'r');
  } finally { await A.fermer(); }
}

/* a : actions du menu */
async function menuActions(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, VX = cx + 1.5, o = (x, y) => [cx + x, cy + y];
    /* « Retirer le point » sur le sommet du milieu : deux sommets, aucun point choisi, un pas d'annulation, qui rend le croquis */
    await dessinChoisi(p, traceA(cx, cy), 'A', VX, cy);
    const j0 = await jsonEl(p), w0 = (await elDoc(p, 'A')).v;
    const m1 = await menuSur(p, await sommetCv(p, 'A', 1)), ok1 = !!m1 && await choisirMenu(p, 'Retirer le point');
    const e1 = await elDoc(p, 'A'), s1 = await selEtat(p), u1 = await nbUndo(p), mf1 = await menu(p);
    R.ok(ok1 && e1.v.length === 2 && egal(e1.v[0], w0[0]) && egal(e1.v[1], w0[2]) && !!s1 && s1.id === 'A' && s1.sommet === null && u1 === 1 && !mf1,
      'a : « Retirer le point » sur le sommet du milieu : il est retiré, en un pas d\'annulation (' + (ok1 ? e1.v.length + ' sommets, point choisi : ' + (s1 ? s1.sommet : '-')
      + ', ' + u1 + ' pas' + (mf1 ? ', menu ouvert' : '') : libs(m1)) + ')');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250);
    R.ok(ok1 && await jsonEl(p) === j0, 'a : une annulation rend le croquis d\'avant « Retirer le point »');
    /* tracé de deux sommets : « Retirer le point » grisé, avec sa raison ; un clic ne change rien */
    await dessinChoisi(p, [C.L('B', 'tr', [o(-3, 0), o(3, 0)], {})], 'B', VX, cy);
    const jB = await jsonEl(p), mB = await menuSur(p, await sommetCv(p, 'B', 0)), rB = item(mB, 'Retirer le point');
    R.ok(!!rB && rB.dis && /deux points/.test(rB.title), 'a : tracé de deux sommets : « Retirer le point » grisé, avec sa raison ('
      + (rB ? (rB.dis ? 'grisé' : 'actif') + ', « ' + rB.title + ' »' : libs(mB)) + ')');
    if (rB) await choisirMenu(p, 'Retirer le point');
    const uB = await nbUndo(p);
    R.ok(!!rB && await jsonEl(p) === jB && uB === 0, 'a : clic sur « Retirer le point » grisé : le croquis ne change pas (' + uB + ' pas d\'annulation)');
    await echap(p);
    /* point porteur d'un branchement (collecteur K, raccord j1 où finit le tracé T) : « Retirer le point » grisé, « Détacher » proposé */
    const pts = [C.J('j1', cx, cy), C.P('r1', 'regard', cx, cy - 3)], ix = C.index(pts);
    await dessinChoisi(p, pts.concat([C.L('K', 'col', [o(-3, 0), 'j1', o(3, 0)], ix), C.L('T', 'tr', ['r1', 'j1'], ix)]), 'K', VX, cy);
    const mK = await menuSur(p, await sommetCv(p, 'K', 1)), rK = item(mK, 'Retirer le point'), dK = item(mK, 'Détacher');
    R.ok(!!rK && rK.dis && /raccord/.test(rK.title) && !!dK && !dK.dis, 'a : point porteur d\'un branchement : « Retirer le point » grisé, avec sa raison, et « Détacher » proposé ('
      + (mK ? libs(mK) + (rK ? (rK.dis ? ' ; grisé' : ' ; actif') + ', « ' + rK.title + ' »' : '') : 'aucun menu') + ')');
    await echap(p);
    /* « Ajouter un point » : premier sommet (milieu du segment suivant), dernier sommet (milieu du segment précédent), poignée du milieu */
    const ajout = async (k, q, j, attendu) => {
      await dessinChoisi(p, traceA(cx, cy), 'A', VX, cy);
      const m = await menuSur(p, await q()), ok = !!m && await choisirMenu(p, 'Ajouter un point');
      const e = await elDoc(p, 'A'), s = await selEtat(p), u = await nbUndo(p), mf = await menu(p);
      R.ok(ok && e.v.length === 4 && egal(e.v[j], attendu) && e.v[j].a === null && !!s && s.sommet === j && u === 1 && !mf,
        'a : « Ajouter un point » ' + k + ' : sommet ' + (j + 1) + ' au milieu du segment, choisi, en un pas d\'annulation ('
        + (ok ? e.v.length + ' sommets, ' + pt(e.v[j]) + ' pour ' + pt(attendu) + ', point choisi : ' + (s ? s.sommet : '-') + ', ' + u + ' pas' + (mf ? ', menu ouvert' : '') : libs(m)) + ')');
      return m;
    };
    await ajout('sur le premier sommet', () => sommetCv(p, 'A', 0), 1, mil(w0[0], w0[1]));
    await ajout('sur le dernier sommet', () => sommetCv(p, 'A', 2), 2, mil(w0[1], w0[2]));
    const mM = await ajout('sur la poignée du milieu du premier segment', () => milieuCv(p, 'A', 1), 1, mil(w0[0], w0[1]));
    R.ok(libs(mM) === 'Ajouter un point', 'a : poignée du milieu d\'un segment : seul « Ajouter un point » (' + libs(mM) + ')');
    /* « Détacher » le premier sommet du tracé D, posé sur le regard r2 : même croquis que le bouton « Détacher » de la fiche */
    const rg = [C.P('r2', 'regard', cx - 3, cy)], ir = C.index(rg);
    await dessinChoisi(p, rg.concat([C.L('D', 'tr', ['r2', o(3, 0)], ir)]), 'D', VX, cy);
    const jD = await jsonEl(p), mD = await menuSur(p, await sommetCv(p, 'D', 0)), okD = !!item(mD, 'Détacher') && await choisirMenu(p, 'Détacher');
    const eD = await elDoc(p, 'D'), sD = await selEtat(p), uD = await nbUndo(p), X = await jsonEl(p);
    R.ok(okD && eD.v[0].a === null && !!sD && sD.sommet === 0 && uD === 1, 'a : « Détacher » : le premier sommet quitte le regard, il reste choisi, en un pas d\'annulation ('
      + (okD ? 'lien : ' + eD.v[0].a + ', point choisi : ' + (sD ? sD.sommet : '-') + ', ' + uD + ' pas' : libs(mD)) + ')');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250);
    const jD2 = await jsonEl(p);
    await p.evaluate(() => { const ed = window.__vcEd; ed.selectionner('D'); ed.etat.sel.sommet = 0; ed.ouvrirPanneau('fiche'); }); await C.pause(p, 700);
    const bF = await p.$('.vc .vc-panneau [data-a="sommetDetacher"]');
    if (bF){ await p.click('.vc .vc-panneau [data-a="sommetDetacher"]'); await C.pause(p, 400); }
    const Y = await jsonEl(p);
    R.ok(okD && jD2 === jD && !!bF && X === Y, 'a : « Détacher » du menu : même croquis que le bouton « Détacher » de la fiche ('
      + (okD ? (jD2 === jD ? '' : 'annulation incomplète, ') + (bF ? (X === Y ? 'identiques' : 'différents') : 'bouton de la fiche absent') : 'aucun « Détacher » au menu') + ')');
    /* saisie en cours dans la fiche (Diamètre 125, champ non quitté), menu ouvert par une pause (le menu ne prend pas le focus),
       « Ajouter un point » : la saisie est enregistrée d'abord ; une annulation retire seulement le point et garde 125 */
    await dessinChoisi(p, traceA(cx, cy), 'A', VX, cy);
    const champ = '.vc .vc-panneau input[data-k="diam"]', aChamp = !!(await p.$(champ));
    if (aChamp){ await p.click(champ); await p.keyboard.type('125'); }
    const qS = await sommetCv(p, 'A', 1);
    await amener(p, decale(qS, 0, -100)); await C.pause(p, 300); await amener(p, qS); await C.pause(p, 650);
    const mS = await menu(p), okS = aChamp && !!mS && await choisirMenu(p, 'Ajouter un point'), eS1 = await elDoc(p, 'A');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250);
    const eS2 = await elDoc(p, 'A');
    R.ok(okS && eS1.v.length === 4 && eS1.p.diam === '125' && eS2.v.length === 3 && eS2.p.diam === '125', 'a : saisie en cours dans la fiche (Diamètre 125),'
      + ' menu ouvert par une pause, « Ajouter un point » : une annulation retire seulement le point et garde 125 (' + (okS ? 'après l\'ajout : ' + eS1.v.length
      + ' sommets, Ø « ' + eS1.p.diam + ' » ; après une annulation : ' + eS2.v.length + ' sommets, Ø « ' + eS2.p.diam + ' »' : aChamp ? libs(mS) : 'champ Diamètre absent') + ')');
    /* double clic sur « Ajouter un point » : le second clic tombe sur le plan découvert sous le menu ; il est ignoré, le point ajouté reste choisi */
    await dessinChoisi(p, traceA(cx, cy), 'A', VX, cy);
    const mC = await menuSur(p, await sommetCv(p, 'A', 0)), bC = mC && await centreBouton(p, 'Ajouter un point');
    if (bC){ await p.mouse.dblclick(bC.x, bC.y); await C.pause(p, 400); }
    const eC = await elDoc(p, 'A'), sC = await selEtat(p), uC = await nbUndo(p);
    R.ok(!!bC && eC.v.length === 4 && !!sC && sC.id === 'A' && sC.sommet === 1 && uC === 1, 'a : double clic sur « Ajouter un point » : un seul point ajouté, qui reste choisi ('
      + (bC ? eC.v.length + ' sommets, choisi : ' + (sC ? sC.id + ', point ' + sC.sommet : 'rien') + ', ' + uC + ' pas' : libs(mC)) + ')');
    erreurs(A, 'a');
  } finally { await A.fermer(); }
}

/* t : témoins sans menu (escalier, doigt, stylet) */
async function menuTemoins(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    await horloge(p);
    /* escalier choisi : ni la pause ni le clic droit sur une poignée n'ouvrent de menu */
    const E = {id: 'E', k: 'ln', t: 'esc', v: [{x: cx - 2, y: cy, a: null}, {x: cx + 1, y: cy, a: null}], p: {larg: '1,00', n: '4', cote: 'g', monte: 'fin', st: 'existant'}, lab: null};
    await dessinChoisi(p, [E], 'E', cx + 1.5, cy);
    const jE = await jsonEl(p), qE = await sommetCv(p, 'E', 0);
    await C.survolerCv(p, decale(qE, 0, -100)); await C.pause(p, 200);
    await amener(p, qE); await C.pause(p, 650); const mE1 = await menu(p);
    await C.cliquerCv(p, qE, 'right'); const mE2 = await menu(p), nE = await ouvertures(p), jE2 = await jsonEl(p);
    R.ok(!mE1 && !mE2 && nE === 0 && jE2 === jE, 't : témoin : escalier choisi : ni la pause ni le clic droit sur une poignée n\'ouvrent de menu ('
      + nE + ' ouverture' + (jE2 === jE ? '' : ', croquis changé') + ')');
    /* appui long du doigt sur une poignée du tracé choisi : aucun menu, pendant ni après */
    await dessinChoisi(p, traceA(cx, cy), 'A', cx + 1.5, cy);
    const q1 = await sommetCv(p, 'A', 1), a1 = await C.pageCv(p, q1), n0 = await ouvertures(p); await C.surLePlan(p, a1, 'l\'appui long');
    const s = await p.context().newCDPSession(p); let mL1;
    try {
      await s.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: [{x: a1.x, y: a1.y, id: 1}]});
      await C.pause(p, 800); mL1 = await menu(p);
      await s.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
    } finally { await s.detach(); }
    await C.pause(p, 500); const mL2 = await menu(p), nL = await ouvertures(p);
    R.ok(!mL1 && !mL2 && nL === n0, 't : témoin : appui long du doigt sur une poignée du tracé choisi : aucun menu (' + (nL - n0) + ' ouverture)');
    /* stylet qui survole une poignée : aucun menu */
    await C.survolerStyletCv(p, q1); await C.pause(p, 650);
    const mS = await menu(p), nS = await ouvertures(p);
    R.ok(!mS && nS === n0, 't : témoin : stylet qui survole une poignée du tracé choisi : aucun menu (' + (nS - n0) + ' ouverture)');
    erreurs(A, 't');
  } finally { await A.fermer(); }
}

/* u : « + » de la souris sur le tracé choisi (m110) */
const plusEtat = p => p.evaluate(() => { const S = window.__vcEd.etat, c = document.querySelector('.vc .vc-cv'), q = S.plus;
  return {plus: q ? {id: q.id, i: q.i, x: q.x, y: q.y} : null, curseur: c.style.cursor || ''}; });
const plusTxt = e => e.plus ? 'segment ' + e.plus.i + ' ' + pt(e.plus) : 'aucun « + »';
const survolPx = p => p.evaluate(() => { const s = window.__vcEd.etat.survol; return s ? {x: s.x, y: s.y} : null; });
/* pied, en mètres du plan, du point q du canevas sur le segment j - 1 → j du tracé id (projection orthogonale, bornée au segment) */
const piedSur = (p, id, j, q) => p.evaluate(([id, j, q]) => {
  const S = window.__vcEd.etat, e = S.doc.el.find(x => x.id === id), a = e.v[j - 1], b = e.v[j], m = S.vue.monde(q.x, q.y), dx = b.x - a.x, dy = b.y - a.y;
  const t = Math.max(0, Math.min(1, ((m.x - a.x) * dx + (m.y - a.y) * dy) / (dx * dx + dy * dy))); return {x: a.x + t * dx, y: a.y + t * dy}; }, [id, j, q]);
const monde = (p, q) => p.evaluate(q => window.__vcEd.etat.vue.monde(q.x, q.y), q);
const pres = (a, b) => !!a && !!b && Math.abs(a.x - b.x) < 1e-6 && Math.abs(a.y - b.y) < 1e-6;
/* point du segment j - 1 → j des sommets V (mètres du plan), au paramètre t */
const surSeg = (V, j, t) => ({x: V[j - 1][0] + t * (V[j][0] - V[j - 1][0]), y: V[j - 1][1] + t * (V[j][1] - V[j - 1][1])});
/* survol au point q du canevas, en venant de 100 px au-dessus ; puis l'état du « + » */
async function survolPlus(p, q){ await C.survolerCv(p, decale(q, 0, -100)); await C.survolerCv(p, q); await C.pause(p, 60); return plusEtat(p); }
/* compteur des dessins du plan (remplissage de tout le canevas par lequel chacun commence), remis à zéro */
async function compterDessins(p){
  await p.evaluate(() => { const cv = document.querySelector('.vc .vc-cv'), c = cv.getContext('2d'); if (!window.__fr){ window.__fr = c.fillRect;
    c.fillRect = function(x, y, w, h){ if (!x && !y && w === cv.width && h === cv.height) window.__dessins++; return window.__fr.apply(this, arguments); }; } window.__dessins = 0; });
}
const dessins = p => p.evaluate(() => window.__dessins);
async function plus(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, V = [[cx - 3, cy], [cx, cy + 1], [cx + 3, cy]];
    await dessinChoisi(p, traceA(cx, cy), 'A', cx + 1.5, cy);
    const j0 = await jsonEl(p);
    /* au quart du segment 1 : à 50 px de son premier sommet et de sa poignée du milieu */
    const w1 = surSeg(V, 1, .25), q1 = await C.ecranCv(p, w1.x, w1.y);
    const e1 = await survolPlus(p, q1), s1 = await survolPx(p), f1 = s1 && await piedSur(p, 'A', 1, s1);
    R.ok(!!e1.plus && e1.plus.id === 'A' && e1.plus.i === 1 && pres(e1.plus, f1) && e1.curseur === 'copy', 'u : survol d\'un segment du tronçon choisi, hors des'
      + ' poignées : « + » au pied de la projection (à 1e-6), curseur « copy » (' + plusTxt(e1) + ', attendu ' + pt(f1) + ', curseur « ' + e1.curseur + ' »)');
    /* 8 px à côté du trait (perpendiculaire) : même pied ; 14 px : aucun « + » */
    const L1 = Math.hypot(V[1][0] - V[0][0], V[1][1] - V[0][1]), n1 = await C.ecranCv(p, w1.x - (V[1][1] - V[0][1]) / L1, w1.y + (V[1][0] - V[0][0]) / L1);
    const nx = (n1.x - q1.x) / Math.hypot(n1.x - q1.x, n1.y - q1.y), ny = (n1.y - q1.y) / Math.hypot(n1.x - q1.x, n1.y - q1.y);
    const e8 = await survolPlus(p, decale(q1, 8 * nx, 8 * ny)), s8 = await survolPx(p), f8 = s8 && await piedSur(p, 'A', 1, s8);
    const e14 = await survolPlus(p, decale(q1, 14 * nx, 14 * ny));
    R.ok(!!e8.plus && pres(e8.plus, f8) && !e14.plus && e14.curseur === '', 'u : à 8 px du trait, « + » au pied ; à 14 px, aucun « + » et curseur ordinaire ('
      + plusTxt(e8) + ' ; ' + plusTxt(e14) + ')');
    /* le long du segment 1 (20 px plus loin), puis sur le segment 2 : le « + » suit */
    const w2 = surSeg(V, 1, .35), q2 = await C.ecranCv(p, w2.x, w2.y);
    await C.survolerCv(p, q2); await C.pause(p, 60); const e2 = await plusEtat(p), s2 = await survolPx(p), f2 = s2 && await piedSur(p, 'A', 1, s2);
    const w3 = surSeg(V, 2, .25), q3 = await C.ecranCv(p, w3.x, w3.y);
    await C.survolerCv(p, q3); await C.pause(p, 60); const e3 = await plusEtat(p), s3 = await survolPx(p), f3 = s3 && await piedSur(p, 'A', 2, s3);
    R.ok(!!e2.plus && e2.plus.i === 1 && pres(e2.plus, f2) && !!e3.plus && e3.plus.i === 2 && pres(e3.plus, f3), 'u : le « + » suit la souris le long du'
      + ' segment, puis sur le segment suivant (' + plusTxt(e2) + ' ; ' + plusTxt(e3) + ')');
    /* poignées : sommet, milieu du segment, point à 12 px d'un sommet le long du trait ; aucun « + » (la poignée a la priorité) */
    const qs = await sommetCv(p, 'A', 1), qm = await milieuCv(p, 'A', 1), w12 = surSeg(V, 1, 12 / (L1 * 63)), q12 = await C.ecranCv(p, w12.x, w12.y);
    const eS = await survolPlus(p, qs); await echap(p);
    const eM = await survolPlus(p, qm); await echap(p);
    const e12 = await survolPlus(p, q12); await echap(p);
    R.ok(!eS.plus && !eM.plus && !e12.plus && !eS.curseur && !eM.curseur, 'u : survol d\'une poignée (sommet, milieu du segment, à 12 px d\'un sommet) : aucun'
      + ' « + » (' + [eS, eM, e12].map(plusTxt).join(' ; ') + ')');
    /* souris sortie du plan : le « + » s'efface */
    const eAv = await survolPlus(p, q1); await C.sortirDuPlan(p); await C.pause(p, 100); const eAp = await plusEtat(p);
    R.ok(!!eAv.plus && !eAp.plus && !eAp.curseur, 'u : souris sortie du plan : le « + » s\'efface, curseur ordinaire (avant ' + plusTxt(eAv) + ', après '
      + plusTxt(eAp) + ')');
    /* menu de poignée ouvert (clic droit sur un sommet) : aucun « + » sur le segment ; menu fermé (Échap), il revient au survol */
    await C.cliquerCv(p, qs, 'right'); const mOuv = !!(await menu(p));
    await C.survolerCv(p, q1); await C.pause(p, 60); const eMn = await plusEtat(p);
    await echap(p); await C.survolerCv(p, decale(q1, 3, 0)); await C.pause(p, 60); const eMf = await plusEtat(p);
    R.ok(mOuv && !eMn.plus && !!eMf.plus, 'u : menu de poignée ouvert : aucun « + » sur le segment ; menu fermé, il revient (' + (mOuv ? 'menu ouvert' : 'aucun menu')
      + ', ' + plusTxt(eMn) + ' ; ' + plusTxt(eMf) + ')');

    /* glissé de 50 px depuis le « + » : un sommet de plus, à l'endroit lâché (ou à l'accroche montrée), choisi ; un pas d'annulation */
    const u0 = await nbUndo(p); let av = null;
    await survolPlus(p, q1);
    await C.glisserSourisCv(p, q1, decale(q1, 0, -50), 'left', {avantLever: async () => { av = await p.evaluate(() => { const a = window.__vcEd.etat.accrocheVue; return a ? {x: a.x, y: a.y, type: a.type} : null; }); }});
    const eG = await elDoc(p, 'A'), sG = await selEtat(p), uG = await nbUndo(p), lever = await survolPx(p), wL = lever && await monde(p, lever), attendu = av || wL;
    R.ok(eG.v.length === 4 && pres(eG.v[1], attendu) && !eG.v[1].a, 'u : glissé de 50 px depuis le « + » : un sommet de plus, à l\'endroit lâché'
      + (av ? ' (accroche « ' + av.type + ' »)' : ' (aucune accroche, à 1e-6)') + ' (' + eG.v.length + ' sommets, ' + pt(eG.v[1]) + ', attendu ' + pt(attendu) + ')');
    R.ok(!!sG && sG.id === 'A' && sG.sommet === 1 && uG === u0 + 1, 'u : le sommet glissé est choisi, un pas d\'annulation (' + JSON.stringify(sG) + ', '
      + (uG - u0) + ' pas)');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250);
    const jG = await jsonEl(p); await C.regler(p, cx + 1.5, cy, 63);
    R.ok(eG.v.length === 4 && jG === j0, 'u : une annulation après le glissé rend le croquis d\'avant (' + (eG.v.length === 4 ? '' : 'aucun sommet ajouté, ')
      + (jG === j0 ? 'même JSON' : 'JSON différent') + ')');

    /* simple clic sur le « + » : un sommet libre au pied (sans accroche), choisi ; un pas d'annulation */
    await p.evaluate(() => window.__vcEd.selectionner('A')); await C.pause(p, 250);
    const uC0 = await nbUndo(p); await survolPlus(p, q1); const sC0 = await survolPx(p), fC = sC0 && await piedSur(p, 'A', 1, sC0);
    await C.cliquerCv(p, q1, 'left');
    const eC = await elDoc(p, 'A'), sC = await selEtat(p), uC = await nbUndo(p);
    R.ok(eC.v.length === 4 && pres(eC.v[1], fC) && !eC.v[1].a, 'u : simple clic sur le « + » : un sommet libre de plus, au pied (à 1e-6) (' + eC.v.length
      + ' sommets, ' + pt(eC.v[1]) + ', attendu ' + pt(fC) + ')');
    R.ok(!!sC && sC.id === 'A' && sC.sommet === 1 && uC === uC0 + 1, 'u : le sommet ajouté est choisi, un pas d\'annulation (' + JSON.stringify(sC) + ', '
      + (uC - uC0) + ' pas)');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250);
    const jC = await jsonEl(p); await C.regler(p, cx + 1.5, cy, 63);
    R.ok(eC.v.length === 4 && jC === j0, 'u : une annulation après le clic rend le croquis d\'avant (' + (eC.v.length === 4 ? '' : 'aucun sommet ajouté, ')
      + (jC === j0 ? 'même JSON' : 'JSON différent') + ')');

    /* double clic sur le « + » : un seul sommet, qui reste choisi */
    await p.evaluate(() => window.__vcEd.selectionner('A')); await C.pause(p, 250);
    await survolPlus(p, q1); const aD = await C.pageCv(p, q1); await p.mouse.dblclick(aD.x, aD.y); await C.pause(p, 450);
    const eD = await elDoc(p, 'A'), sD = await selEtat(p);
    R.ok(eD.v.length === 4 && !!sD && sD.id === 'A' && sD.sommet === 1, 'u : double clic sur le « + » : un seul sommet ajouté, qui reste choisi (' + eD.v.length
      + ' sommets, ' + JSON.stringify(sD) + ')');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); await C.regler(p, cx + 1.5, cy, 63);

    /* témoin : double clic sur le tronçon pas encore choisi : il est choisi, aucun sommet (le « + » montré après le premier clic n'agit pas) */
    await p.evaluate(() => window.__vcEd.selectionner(null)); await C.pause(p, 250);
    await C.survolerCv(p, q1); await p.mouse.dblclick(aD.x, aD.y); await C.pause(p, 450);
    const eD2 = await elDoc(p, 'A'), sD2 = await selEtat(p), jD2 = await jsonEl(p);
    R.ok(jD2 === j0 && !!sD2 && sD2.id === 'A', 'u : témoin : double clic sur le tronçon pas encore choisi : il est choisi, aucun sommet ajouté (' + eD2.v.length
      + ' sommets, choisi : ' + (sD2 ? sD2.id : 'rien') + ')');

    /* témoin : glissé au bouton droit depuis le « + » : la vue bouge, le croquis ne change pas */
    await survolPlus(p, q1); const c0 = await centre(p);
    await C.glisserSourisCv(p, q1, decale(q1, 40, -30), 'right'); const c1 = await centre(p), jR = await jsonEl(p);
    R.ok(jR === j0 && Math.hypot(c1.x - c0.x, c1.y - c0.y) > .3, 'u : témoin : glissé au bouton droit depuis le « + » : la vue bouge, croquis inchangé (vue déplacée de '
      + Math.hypot(c1.x - c0.x, c1.y - c0.y).toFixed(2) + ' m' + (jR === j0 ? '' : ', croquis changé') + ')');

    /* glissé depuis le « + » jusqu'à un regard : le nouveau sommet s'y attache (tronçon), comme un sommet glissé */
    await dessinChoisi(p, traceA(cx, cy), 'A', cx + 1.5, cy);
    const wR = await monde(p, decale(q1, 0, -60));
    const els = traceA(cx, cy).concat([C.P('r1', 'regard', wR.x, wR.y, {tampon: 'fonte'})]);
    await dessinChoisi(p, els, 'A', cx + 1.5, cy);
    const jA0 = await jsonEl(p), qR = await C.ecranCv(p, wR.x, wR.y);
    await survolPlus(p, q1); const eA0 = await plusEtat(p);
    await C.glisserSourisCv(p, q1, qR, 'left');
    const eA = await elDoc(p, 'A'), uA = await nbUndo(p);
    R.ok(!!eA0.plus && eA.v.length === 4 && eA.v[1].a === 'r1' && Math.abs(eA.v[1].x - wR.x) < 1e-9 && Math.abs(eA.v[1].y - wR.y) < 1e-9 && uA === 1,
      'u : glissé depuis le « + » jusqu\'à un regard : le nouveau sommet s\'y attache, un pas d\'annulation (' + eA.v.length + ' sommets, attaché à '
      + (eA.v[1] && eA.v[1].a) + ', ' + uA + ' pas)');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250);
    const jA = await jsonEl(p);
    R.ok(eA.v.length === 4 && jA === jA0, 'u : une annulation rend le croquis d\'avant le glissé jusqu\'au regard (' + (eA.v.length === 4 ? '' : 'aucun sommet ajouté, ')
      + (jA === jA0 ? 'même JSON' : 'JSON différent') + ')');

    /* redessins : « + » montré, aucun redessin sans mouvement ni pour un mouvement qui garde le pied ; un mouvement le long du trait redessine */
    const W = [[cx - 3, cy], [cx + 3, cy]];
    await dessinChoisi(p, [C.L('B', 'tr', W, {})], 'B', cx + 1.5, cy);
    const wb = surSeg(W, 1, .25), qb = await C.ecranCv(p, wb.x, wb.y), eb = await survolPlus(p, qb);
    await compterDessins(p); await C.pause(p, 300); const d0 = await dessins(p);
    const ab = await C.pageCv(p, qb); await p.mouse.move(ab.x, ab.y - 3); await C.pause(p, 150); const d1 = await dessins(p), eb1 = await plusEtat(p);
    await p.mouse.move(ab.x + 20, ab.y - 3); await C.pause(p, 150); const d2 = await dessins(p), eb2 = await plusEtat(p);
    R.ok(!!eb.plus && d0 === 0 && d1 === 0 && !!eb1.plus && pres(eb1.plus, eb.plus), 'u : « + » montré, la souris immobile puis déplacée de 3 px à travers le trait'
      + ' (même pied) : aucun redessin (' + d0 + ' puis ' + d1 + ' dessin, ' + plusTxt(eb) + ' ; ' + plusTxt(eb1) + ')');
    R.ok(d2 > d1 && !!eb2.plus && Math.abs(eb2.plus.x - eb.plus.x - 20 / 63) < .02, 'u : déplacée de 20 px le long du trait : le « + » suit, le plan est redessiné ('
      + (d2 - d1) + ' dessin, ' + plusTxt(eb2) + ')');

    /* témoins, aucun « + » : tracé non choisi, autre outil, escalier choisi, tracés superposés (un clic passerait au suivant) */
    const Wc = [[cx - 3, cy - 2], [cx + 3, cy - 2]];
    await dessinChoisi(p, [C.L('B', 'tr', W, {}), C.L('Bc', 'tr', Wc, {})], 'B', cx + 1.5, cy);
    const wc = surSeg(Wc, 1, .25), eNc = await survolPlus(p, await C.ecranCv(p, wc.x, wc.y));
    await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'}); await C.pause(p, 150); const eOu = await survolPlus(p, qb);
    await C.outil(p, {k: 'main'}); await C.pause(p, 150);
    R.ok(!eNc.plus && !eOu.plus, 'u : témoin : tracé non choisi, outil Tronçon : aucun « + » (' + plusTxt(eNc) + ' ; ' + plusTxt(eOu) + ')');
    const Es = {id: 'E', k: 'ln', t: 'esc', v: [{x: cx - 2, y: cy, a: null}, {x: cx + 1, y: cy, a: null}], p: {larg: '1,00', n: '4', cote: 'g', monte: 'fin', st: 'existant'}, lab: null};
    await dessinChoisi(p, [Es], 'E', cx + 1.5, cy);
    const eE1 = await survolPlus(p, await C.ecranCv(p, cx - 1.25, cy)), eE2 = await survolPlus(p, await C.ecranCv(p, cx - .5, cy)), jE = await jsonEl(p);
    await C.cliquerCv(p, await C.ecranCv(p, cx - 1.25, cy), 'left'); const jE2 = await jsonEl(p);
    R.ok(!eE1.plus && !eE2.plus && !eE1.curseur && jE2 === jE, 'u : témoin : escalier choisi : aucun « + » sur sa ligne, un clic n\'y ajoute rien (' + plusTxt(eE1) + ' ; '
      + plusTxt(eE2) + (jE2 === jE ? '' : ', croquis changé') + ')');
    await dessinChoisi(p, [C.L('S1', 'tr', W, {}, {st: 'supprimer'}), C.L('S2', 'tr', W, {}, {st: 'projet'})], 'S1', cx + 1.5, cy);
    const eSu = await survolPlus(p, qb), jS = await jsonEl(p);
    await C.cliquerCv(p, qb, 'left'); const sSu = await selEtat(p), jS2 = await jsonEl(p);
    R.ok(!eSu.plus && !!sSu && sSu.id === 'S2' && jS2 === jS, 'u : témoin : tracés superposés, l\'un choisi : aucun « + », le clic passe au suivant (' + plusTxt(eSu)
      + ', choisi : ' + (sSu ? sSu.id : 'rien') + (jS2 === jS ? '' : ', croquis changé') + ')');

    /* double clic sur « Ajouter un point » du menu, le bouton posé sur un segment du tracé choisi : le second clic tombe sur le « + » du plan
       découvert ; il reste ignoré (garde du bouton qui vient de disparaître), un seul point est ajouté. Le tracé est refait pour que son
       segment 2 passe sous le bouton, au tiers, loin de ses poignées. */
    await dessinChoisi(p, traceA(cx, cy), 'A', cx + 1.5, cy);
    const qK = await milieuCv(p, 'A', 1), mK = await menuSur(p, qK), bK = mK && await centreBouton(p, 'Ajouter un point');
    await p.keyboard.press('Escape'); await C.pause(p, 200);
    let plK = null, bK2 = null;
    if (bK){
      const o = await C.pageCv(p, {x: 0, y: 0}), qB = {x: bK.x - o.x, y: bK.y - o.y}, wB = await monde(p, qB), v1 = V[1];
      await dessinChoisi(p, [C.L('A', 'tr', [V[0], v1, [v1[0] + 3 * (wB.x - v1[0]), v1[1] + 3 * (wB.y - v1[1])]], {})], 'A', cx + 1.5, cy);
      plK = await survolPlus(p, qB); await C.sortirDuPlan(p);
      const mK2 = await menuSur(p, qK); bK2 = mK2 && await centreBouton(p, 'Ajouter un point');
    }
    const uK0 = await nbUndo(p), memeK = !!bK2 && Math.hypot(bK2.x - bK.x, bK2.y - bK.y) < 2;
    if (memeK){ await p.mouse.dblclick(bK2.x, bK2.y); await C.pause(p, 450); }
    const eK = await elDoc(p, 'A'), sK = await selEtat(p), uK = await nbUndo(p);
    R.ok(!!plK && !!plK.plus && memeK && eK.v.length === 4 && !!sK && sK.id === 'A' && sK.sommet === 1 && uK === uK0 + 1, 'u : double clic sur « Ajouter un'
      + ' point » posé sur un segment du tracé choisi : le second clic, sur le « + », est ignoré, un seul point ajouté (' + (plK ? 'sous le bouton : '
      + plusTxt(plK) : 'aucun menu') + (bK2 && !memeK ? ', menu déplacé' : '') + ', ' + eK.v.length + ' sommets, ' + JSON.stringify(sK) + ', ' + (uK - uK0)
      + ' pas)');

    /* menu de poignée fermé, la souris immobile sur un segment : le « + » revient aussitôt, curseur « copy » ; le clic suivant, sans
       bouger, ajoute le sommet au pied de ce « + ». Menu fermé par Échap, puis par le clic gauche qui ne fait que le fermer. */
    await dessinChoisi(p, traceA(cx, cy), 'A', cx + 1.5, cy);
    const jF0 = await jsonEl(p), uF0 = await nbUndo(p), qsF = await sommetCv(p, 'A', 1);
    const mF = await menuSur(p, qsF); await C.survolerCv(p, q1); await C.pause(p, 60); const eFo = await plusEtat(p);
    await p.keyboard.press('Escape'); await C.pause(p, 150); const eFe = await plusEtat(p);
    await p.mouse.down(); await p.mouse.up(); await C.pause(p, 450);
    const eF = await elDoc(p, 'A'), sF = await selEtat(p), uF = await nbUndo(p);
    R.ok(!!mF && !eFo.plus && !!eFe.plus && eFe.curseur === 'copy' && eF.v.length === 4 && pres(eF.v[1], eFe.plus) && !!sF && sF.sommet === 1 && uF === uF0 + 1,
      'u : menu fermé par Échap, souris immobile sur le segment : le « + » revient aussitôt (curseur « copy »), un clic sans bouger ajoute le sommet à son pied ('
      + (mF ? 'menu ouvert' : 'aucun menu') + ', puis ' + plusTxt(eFe) + ', curseur « ' + eFe.curseur + ' » ; ' + eF.v.length + ' sommets, ' + pt(eF.v[1]) + ', '
      + JSON.stringify(sF) + ', ' + (uF - uF0) + ' pas)');
    await dessinChoisi(p, traceA(cx, cy), 'A', cx + 1.5, cy);
    const mF2 = await menuSur(p, qsF); await C.survolerCv(p, q1); await C.pause(p, 60);
    await p.mouse.down(); await p.mouse.up(); await C.pause(p, 150);
    const mF2b = await menu(p), jF2 = await jsonEl(p), eFc = await plusEtat(p);
    await C.pause(p, 300); await p.mouse.down(); await p.mouse.up(); await C.pause(p, 450);
    const eF2 = await elDoc(p, 'A'), sF2 = await selEtat(p);
    R.ok(!!mF2 && !mF2b && jF2 === jF0 && !!eFc.plus && eFc.curseur === 'copy' && eF2.v.length === 4 && pres(eF2.v[1], eFc.plus) && !!sF2 && sF2.sommet === 1,
      'u : menu fermé par un clic gauche sur le segment : ce clic n\'ajoute rien, le « + » revient aussitôt (curseur « copy »), le clic suivant ajoute le'
      + ' sommet à son pied (' + (mF2 ? (mF2b ? 'menu resté ouvert' : 'menu fermé') : 'aucun menu') + (jF2 === jF0 ? '' : ', croquis changé au premier clic') + ', '
      + plusTxt(eFc) + ', curseur « ' + eFc.curseur + ' » ; ' + eF2.v.length + ' sommets, ' + pt(eF2.v[1]) + ', ' + JSON.stringify(sF2) + ')');
    erreurs(A, 'u');
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [clics, glisses, survol, doigt, menuPause, menuClicDroit, menuActions, menuTemoins, plus]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception du test : ' + (e && e.stack || e)); }
  }
  R.fin();
})();
