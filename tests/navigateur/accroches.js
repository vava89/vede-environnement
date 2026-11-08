// Palette d'accrochage de l'éditeur du croquis, dans Chromium (données fictives : fond de VCroquis.demoDxf(), croquis vide) : correctif
// m111 (souhait 17, première partie ; réponses 17.1, 17.3 et 17.4, décisions D9 et D11 de .claude/conception-outils-dessin.md), puis
// nouveaux accrochages de m112 (cas d, mi, pp, ai, li, es, tr, em et po, plus bas), puis de m113 (cas pl, ix, pi, mo et rm, tout en bas).
// b : bouton « Palette d'accrochage » (.vc-accr) dans la barre de navigation, juste au-dessus de l'aimant, de la même taille, avec sa
//     propre icône ; un toucher ouvre la palette (.vc-accroches), à gauche de la barre, au-dessus du plan, sous le panneau et le toast :
//     huit puces dans l'ordre de VCroquis.ACCROCHES (trois depuis m111, trois de plus depuis m112, deux depuis m113), avec les libellés
//     d'AIDES_LIB (le court s'il y en a un : « Prolongement », m113) et l'état de S.aides (les nouveaux accrochages ne sont cochés que
//     s'ils valent true), aucune pour l'accroche au réseau ; au clavier, Espace bascule une puce, qui garde le focus ; un second toucher
//     la ferme ; aria-expanded suit ;
// p : tablette en portrait (600 × 960), un panneau ouvert en bas (Réglages, Contrôles, fiche d'un regard), puis la palette : elle garde
//     la largeur du portrait (au moins 280 px), rien n'y est coupé, chaque puce y est entière et se touche en son centre ; elle est à
//     gauche de la barre de navigation, à côté du bouton, au-dessus du panneau et sous la barre du haut ;
// e : panneau Réglages de l'éditeur ouvert, puis la palette : le panneau reste ouvert, la palette suit la barre de navigation (à côté du
//     bouton, hors du panneau), le texte des Réglages nomme la palette ; « Parallèle au bâti » décochée dans la palette : S.aides, les
//     réglages gardés par l'application (opts.enregistrerAides) et la case des Réglages suivent ;
//     Échap ferme la palette d'abord (le panneau reste ouvert), puis le panneau ; le retour de l'appareil la ferme, le croquis reste ouvert ;
// a : une descente touchée près d'un coin du bâti s'y cale (témoin) ; « Accroche au bâti » décochée : S.aides.bati faux, enregistré par
//     l'application (bati: false), la descente reste où on l'a touchée ; réglage gardé à la réouverture du croquis ; puce recochée : la
//     descente est attirée de nouveau ;
// r : aimant coupé, palette ouverte : puces grisées (un toucher n'y change rien), une ligne dit de toucher l'aimant ; tracé libre, comme
//     le dit la case « Aides activées » de l'application : une descente touchée près d'un coin du bâti reste où on l'a touchée, un tuyau
//     tracé à 4° d'une façade n'est pas redressé ; un tuyau tracé jusqu'à un regard s'y raccorde quand même, un autre tracé jusqu'au premier
//     tuyau y crée un raccord (accroche au réseau, toujours active) ; aimant rétabli : puces actives, ligne retirée, et (témoins) la
//     descente est de nouveau attirée par le coin, le tuyau redressé parallèle à la façade ;
// t : palette ouverte, un toucher sur la palette elle-même (son titre) la laisse ouverte et ne pose rien ; un toucher sur le plan la ferme
//     et ne fait rien d'autre [p] : ni regard posé, ni objet choisi ; un glissé du doigt (outils Tronçon et Choisir) ne trace rien et ne
//     déplace pas la vue ; une pince à deux doigts ne zoome ni ne déplace la vue ; un clic de souris ne pose rien ; témoins : le toucher,
//     le glissé et la pince suivants agissent ;
// f : la palette se ferme aussi au choix d'un outil, à l'ouverture d'un panneau (Contrôles ; la fiche d'un objet choisi depuis lui), à
//     l'entrée dans la pose par cotes et à la réouverture du croquis ;
// m : table des puces : une clé ajoutée à VCroquis.ACCROCHES (ici « finir ») donne une puce de plus, sans autre code ;
//     la barre d'aide suit cette puce (outil Tronçon, un point posé : « le tronçon se termine sur un objet » disparaît, puis revient).
// Sur e6618ef, chaque cas échoue dès son premier contrôle (pas de bouton .vc-accr dans la barre de navigation) ; la suite n'est pas lancée.
// Le cas p échoue aussi quand la largeur du paysage s'applique en portrait, panneau ouvert (palette de 40 px de large, puces coupées).
// Nouveaux accrochages (m112 : souhait 17, deuxième partie ; réponses 17.2 et 17.4, décisions D3, D9 et D10), tous décochés d'origine et
// lus strictement (seul true les coche) : « Milieu d'un côté » (accMilieu, seuil du coin, 14 px), « Perpendiculaire » (accPerp, depuis le
// point précédent, seuil de la façade, 10 px) et « Limites de parcelle » (accParcelle). Cibles : côtés du bâti et traits de complément,
// limites de parcelle avec accParcelle ; jamais un tronçon ni un escalier. Le réseau passe toujours avant.
// d : AIDES_DEFAUT, AIDES_LIB et S.aides d'un croquis neuf : les trois clés valent false ; Réglages de l'éditeur : leurs cases sont
//     décochées, même à null, un toucher les coche ; d'anciens réglages de l'application (sans ces clés) les donnent fausses à l'éditeur ;
//     20 touchers (traits de complément, tronçons, descentes, regard) près des milieux, des pieds de perpendiculaire et des limites donnent
//     les mêmes points que sur e9e8b5d (FIGES), clés fausses, retirées ou à null ;
// mi : « Milieu d'un côté » cochée dans la palette : un trait de complément commencé loin, fini à 8 px du milieu de la façade sud, va au
//     milieu (1e-9), avec le repère « Milieu » ; témoin à 20 px : pas de milieu ;
// pp : « Perpendiculaire » cochée : depuis le point précédent, fin touchée à 6 px du pied sur la façade sud : point au pied (1e-9), repère
//     en tirets du point précédent au pied, petit carré d'angle droit et « Perpendiculaire » ; premier point d'un trait (pas de point
//     précédent) : rien ;
// ai : aimant coupé, les trois clés cochées : aucun nouvel accrochage (milieu, pied, coin de limite) ;
// li : « Limites de parcelle » : coin et côté d'une limite n'attirent qu'avec la clé (repère « Limite »), même « Accroche au bâti »
//     décochée [p] ; milieu d'un côté de limite avec « Milieu d'un côté », seulement si la clé est cochée ;
// es : un escalier n'est jamais cible (ni le milieu ni le pied de sa ligne départ-fin, ni un coin de son contour), toutes les clés cochées ;
// tr : tronçon : premier point touché près du milieu de la façade → au milieu ; près d'un coin de limite (clé cochée) → reste sous le doigt
//     (ni coin ni côté pour un tronçon) ; fin touchée près d'un regard posé sous le milieu → raccordée au regard (le réseau passe avant) ;
//     sommet d'un tronçon glissé près du milieu → au milieu (témoin : clé décochée, il reste sous le doigt).
// em : escalier dont un bout est calé par un nouvel accrochage (sens de la montée, décision D7) : départ au milieu de la façade sud, fin
//     au jardin → montée vers le départ ; départ sur une façade, fin au milieu ou au pied de la perpendiculaire sur la façade d'en face
//     → montée vers la fin (les deux bouts sont sur le bâti) ; témoins : clés décochées, départ sur la façade → vers le départ ; départ
//     au milieu d'un côté de limite → vers la fin (une limite n'est pas le bâti) ;
// po : ordre des accrochages, clés cochées : le coin passe avant le milieu (trait de 0,6 m) ; le milieu passe avant le redressement
//     (témoin : clé décochée, fin redressée) ; sommet d'un trait de complément glissé près du milieu → au milieu ; une descente (objet
//     de mur) va au milieu d'une façade, mais reste sous le doigt près du coin ou du milieu d'un côté de limite (elle ne va que sur le bâti).
// Sur e9e8b5d, les cas d à tr échouent dès leur premier contrôle (pas de clé accMilieu dans AIDES_DEFAUT, aucun accrochage au milieu
// d'un côté), em et po sur leurs contrôles du milieu et du pied, et b, p, r et m sur le nombre de puces (trois) ; les 20 touchers de d y
// passent (FIGES vient de là). Sur la première version de m112, em échouait sur la montée (milieu et pied n'y comptaient pas comme le
// bâti) et po sur la descente près d'une limite (posée sur la limite).
// Nouveaux accrochages, second lot (m113 : souhait 17 ; décisions D3, D9 et D10), décochés d'origine et lus strictement (seul true les
// coche) : « Prolongement d'un côté » (accProl : droite d'un côté au-delà de ses bouts, jusqu'à 30 m [p], seuil de la façade, 10 px) et
// « Intersection » (accInter : rencontre de deux côtés ou de leurs prolongements, 30 m au plus, angle de plus de 5°, seuil du coin,
// 14 px). Cibles de m112. Ordre : coin > intersection > milieu > perpendiculaire > prolongement > redressement > côté ; le réseau passe
// toujours avant. Repères du fond (façade ouest du bâti, de Ks à Kn ; bâti léger ; façade nord du voisin) : bloc m113, plus bas.
// d (étendu) : accProl et accInter valent false (AIDES_DEFAUT, S.aides), leurs cases des Réglages sont décochées ; accProl à null et
//     accInter à true : seule « Intersection » est cochée, un toucher coche l'autre ; 20 touchers de plus (TOUCHERS113, près des
//     prolongements et des rencontres) donnent les mêmes points que sur 4691c1a (FIGES113), clés fausses, retirées ou à null ;
// pl : puce cochée : un trait fini à 6 px de la droite de la façade ouest, 3 m au-delà de Ks, y va (1e-9), tirets de Ks au point,
//     « Prolongement » (témoin, clé décochée : sous le doigt) ; à 29,9 m du bout : sur la droite, à 30,1 m et 40 m : sous le doigt ;
//     à 9 px : sur la droite, à 11 px : sous le doigt ; entre les bouts, c'est le côté (« façade », comme clé décochée ; « Accroche au
//     bâti » décochée : sous le doigt) ; un côté qui croise la droite à 6 px du point (façade nord du voisin) ne l'empêche pas : trait,
//     avec ou sans « Accroche au bâti », et tronçon vont sur la droite, tirets depuis (59 ; 24) (témoins, clé décochée : la façade ou sous
//     le doigt) ; une limite avec « Limites de parcelle » seulement ; jamais un escalier (témoin : un trait à sa place) ; aimant coupé :
//     ni prolongement ni rencontre (témoin : aimant rétabli) ;
// ix : puce cochée : premier point touché près de la rencontre (65,5 ; 24) de deux prolongements → à la rencontre, tirets depuis les deux
//     bouts, « Intersection » (témoin : sous le doigt) ; rencontre (59 ; 14) d'un prolongement et d'une façade → à la rencontre, un seul
//     tiret (témoin : au pied, sur la façade) ; angle de 5,1° → à la rencontre, 4,9° et parallèles → sous le doigt ; rencontre à 29,9 m
//     du bout d'une façade → à la rencontre, à 30,1 m → sous le doigt ; à 13 px → à la rencontre, à 15 px → sous le doigt ; près du coin
//     Ks : « coin du bâti », pas « Intersection » (« Accroche au bâti » décochée : sous le doigt) ;
// pi : coin avant intersection, intersection avant milieu, intersection avant prolongement, prolongement avant redressement, chacun avec
//     un témoin (l'aide qui passe avant décochée) ; sommet d'un trait glissé près d'une rencontre → à la rencontre (témoin : ailleurs) ;
// mo : escalier dont le départ est calé (décision D7) : à la rencontre d'un prolongement et d'une façade → montée vers le départ (il est
//     sur le bâti) ; à la rencontre de deux prolongements, ou sur un prolongement → vers la fin ; témoin : départ sur la façade → vers le
//     départ ; « Limites de parcelle » cochée, à la rencontre d'un prolongement et d'une limite → vers la fin (témoin : un trait posé sur
//     la limite, vers le départ) ;
// rm : une descente (objet de mur) touchée près de la rencontre (59 ; 14) va sur la façade, pas à la rencontre ; près d'un prolongement,
//     elle reste sous le doigt (un trait y va : témoin ici pour la rencontre, cas pl pour le prolongement) ; tronçon : premier point
//     près d'un prolongement → sur la droite (témoin, clés décochées : sous le doigt), près de Ks → sous le doigt, près de la rencontre
//     (65,5 ; 24) → à la rencontre ; fin près d'un regard posé à côté de la rencontre → au regard (le réseau passe avant ; témoin,
//     sans le regard : à la rencontre) ; sommet glissé près de la rencontre → à la rencontre.
// Sur 4691c1a, pl, ix, pi, mo et rm échouent dès leur premier contrôle (pas de clé accProl ni accInter dans AIDES_DEFAUT), d sur ces clés,
// leurs libellés, leurs cases et les anciens réglages, b, p, r et m sur le nombre de puces (six) ; les 20 touchers de TOUCHERS113 y
// passent (FIGES113 vient de là). Le cas p échoue aussi avec le libellé long « Prolongement d'un côté » sur la puce (une rangée de plus
// en portrait : la palette coupe la dernière puce).
// usage : node tests/navigateur/accroches.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('accroches');

const DEMO = {x: 1700000, y: 8200000, th: 12 * Math.PI / 180};
const demoAbs = (u, v) => ({x: DEMO.x + u * Math.cos(DEMO.th) - v * Math.sin(DEMO.th), y: DEMO.y + u * Math.sin(DEMO.th) + v * Math.cos(DEMO.th)});
const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
const m = d => d == null ? 'aucune' : d.toFixed(3) + ' m';
/* puces de la palette : trois aides cochées d'origine (m111), puis les nouveaux accrochages, décochés d'origine (m112, puis m113) */
const NOUVEAUX = ['accMilieu', 'accPerp', 'accParcelle', 'accProl', 'accInter'];
const ORDRE = ['bati', 'parallele', 'angles'].concat(NOUVEAUX);
/* état attendu d'une puce : une aide cochée d'origine l'est tant qu'elle ne vaut pas false, un nouvel accrochage seulement s'il vaut true */
const cochee = (a, k) => NOUVEAUX.indexOf(k) >= 0 ? a[k] === true : a[k] !== false;
const BOUTON = '.vc .vc-nav .vc-accr', PUCE = k => '.vc .vc-accroches [data-accr="' + k + '"]';
/* distance au coin du point touché par descenteCoin : 0,2 m de chaque façade */
const DQ = 0.2 * Math.SQRT2;

/* Pince au doigt : deux doigts (id 1 et 2) de part et d'autre du point q du canevas, à d0 px l'un de l'autre, écartés jusqu'à d1 px en
   huit pas, par les événements tactiles de Chromium ; puis une pause */
async function pincerCv(p, q, d0, d1, ms){
  const c = await C.pageCv(p, q), pt = (d, id) => ({x: c.x + (id === 1 ? -d : d) / 2, y: c.y, id});
  for (const d of [d0, d1]) for (const id of [1, 2]) await C.surLePlan(p, pt(d, id), 'la pince');
  const s = await p.context().newCDPSession(p), t = (type, q) => s.send('Input.dispatchTouchEvent', {type, touchPoints: q});
  try {
    await t('touchStart', [pt(d0, 1)]); await C.pause(p, 30);
    await t('touchStart', [pt(d0, 1), pt(d0, 2)]);
    for (let k = 1; k <= 8; k++){ const d = d0 + (d1 - d0) * k / 8; await t('touchMove', [pt(d, 1), pt(d, 2)]); }
    await t('touchEnd', []);
  } finally { await s.detach(); }
  await C.pause(p, ms == null ? 450 : ms);
}

/* Dossier neuf, croquis vide sur le fond fictif de la démonstration ; A.plan(u, v) : point du repère de la démonstration vers celui du
   croquis ; vue centrée sur le bâti de la démonstration (u 65,5 à 74,5 ; v 4 à 14), à 40 px par mètre ; opt : options de C.ouvrir
   (taille de la fenêtre) */
async function croquisNeuf(opt){
  const A = await C.ouvrir(opt), p = A.p;
  await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
  const o = await p.evaluate(() => window.__vcEd.etat.doc.origine);
  A.plan = (u, v) => { const a = demoAbs(u, v); return {x: a.x - o.x, y: a.y - o.y}; };
  await C.injecter(p, {el: []}); await vueSur(A, 70, 6);
  return A;
}
async function vueSur(A, u, v){ const c = A.plan(u, v); await C.regler(A.p, c.x, c.y, 40); }
/* croquis enregistré (un dessin seulement injecté ne l'est pas : l'application redemanderait le fond), fermé, puis rouvert depuis le
   dossier ; attend que l'éditeur soit de nouveau affiché */
async function rouvrir(p){
  await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer(); }); await C.pause(p, 400);
  await C.fermerCroquis(p); await C.ouvrirCroquis(p, {dejaCommence: true});
  await p.waitForSelector('#modal-root .vc .vc-nav', {timeout: 10000}); await C.pause(p, 300);
}
/* Toucher (doigt) sur un élément de l'éditeur, puis une pause */
async function toucherEl(p, sel, ms, o){ await p.tap(sel, Object.assign({timeout: 3000}, o || {})); await C.pause(p, ms == null ? 350 : ms); }
/* Croquis vide, outil Descente : un toucher dehors, près du coin sud-ouest du bâti de la démonstration, à 0,2 m de chaque façade (DQ, soit
   0,28 m du coin, 11 px) ; rend la distance de la descente au coin (null si elle n'est pas posée). Le fond est arrondi au millimètre :
   une descente calée sur le coin en est à moins de 2 mm */
async function descenteCoin(A){
  const p = A.p, coin = A.plan(65.5, 4), q = A.plan(65.3, 3.8);
  await C.injecter(p, {el: []}); await vueSur(A, 70, 6); await C.outil(p, {k: 'pt', t: 'descente', pal: 'ep'});
  await C.toucherCv(p, await C.ecranCv(p, q.x, q.y), 700);
  const de = (await C.docCroquis(p)).el.filter(e => e.t === 'descente');
  return de.length === 1 ? Math.hypot(de[0].x - coin.x, de[0].y - coin.y) : null;
}
/* Croquis vide, outil Tronçon : un tuyau de deux touchers sous la façade sud du bâti de la démonstration (à 1,5 m puis à 1 m d'elle), à 4°
   de sa direction, fini à la main ; rend son angle avec la façade, en degrés (null sans tuyau de deux points) : 0 s'il est redressé
   parallèle à la façade, 4 environ en tracé libre */
async function tuyauOblique(A){
  const p = A.p, a = A.plan(66, 2.5), b = A.plan(73, 2.5 + 7 * Math.tan(4 * Math.PI / 180));
  await C.injecter(p, {el: []}); await vueSur(A, 70, 6); await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'});
  await C.toucherCv(p, await C.ecranCv(p, a.x, a.y), 600);
  await C.toucherCv(p, await C.ecranCv(p, b.x, b.y), 600);
  await p.evaluate(() => window.__vcEd.terminerTrace()); await C.pause(p, 300);
  const t = (await C.docCroquis(p)).el.filter(e => e.k === 'ln' && e.t === 'tr');
  return t.length === 1 && t[0].v.length === 2 ? (Math.atan2(t[0].v[1].y - t[0].v[0].y, t[0].v[1].x - t[0].v[0].x) - DEMO.th) * 180 / Math.PI : null;
}
const deg = a => a == null ? 'aucun tuyau' : a.toFixed(2) + '°';
/* Bouton, palette et puces : présence, aria-expanded, place du bouton, palette affichée, puces (clé, libellé, aria-pressed, grisée),
   ligne affichée sous les puces, rectangles (bouton, aimant, barre, palette) */
const etat = p => p.evaluate(() => {
  const R0 = document.querySelector('.vc'), nav = R0.querySelector('.vc-nav'), b = nav.querySelector('.vc-accr'), aim = nav.querySelector('.vc-aimant'), pal = R0.querySelector('.vc-accroches');
  const r = e => { if (!e) return null; const q = e.getBoundingClientRect(); return {l: q.left, t: q.top, r: q.right, b: q.bottom, w: q.width, h: q.height}; };
  const vu = e => !!e && !e.hidden && e.getClientRects().length > 0;
  return {bouton: !!b, expanded: b ? b.getAttribute('aria-expanded') : null, label: b ? b.getAttribute('aria-label') : null, avantAimant: !!b && b.nextElementSibling === aim,
    rb: r(b), ra: r(aim), rn: r(nav), ouverte: vu(pal), rp: vu(pal) ? r(pal) : null,
    puces: vu(pal) ? Array.from(pal.querySelectorAll('.vc-chip')).map(c => ({k: c.dataset.accr, lib: c.textContent.trim(), on: c.getAttribute('aria-pressed'), off: c.disabled})) : [],
    ligne: vu(pal) ? Array.from(pal.querySelectorAll('p')).filter(vu).map(x => x.textContent.trim()).join(' | ') : ''};
});
const puce = (e, k) => e.puces.find(c => c.k === k) || {};
const aides = p => p.evaluate(() => ({ed: Object.assign({}, window.__vcEd.etat.aides), hote: Object.assign({}, window.__VT.S.croq && window.__VT.S.croq.aides || {})}));
const panneau = p => p.evaluate(() => window.__vcEd.etat.panneau);
/* le bouton est-il là ? Sinon le cas s'arrête (version d'avant m111) */
async function boutonLa(p, k){ const e = await etat(p); return R.ok(e.bouton, k + ' : bouton « Palette d\'accrochage » (.vc-accr) dans la barre de navigation') ? e : null; }

/* b : bouton et palette */
async function boutonEtPalette(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const e0 = await boutonLa(p, 'b'); if (!e0) return;
    R.ok(e0.avantAimant && e0.rb.b <= e0.ra.t + 0.5, 'b : le bouton est juste au-dessus de l\'aimant');
    R.ok(Math.abs(e0.rb.w - e0.ra.w) < 0.5 && Math.abs(e0.rb.h - e0.ra.h) < 0.5, 'b : même taille que l\'aimant (' + Math.round(e0.rb.w) + ' × ' + Math.round(e0.rb.h) + ' px)');
    const ic = await p.evaluate(() => { const b = document.querySelector('.vc .vc-accr svg'), a = document.querySelector('.vc .vc-aimant svg'); return {b: b ? b.innerHTML : '', a: a ? a.innerHTML : ''}; });
    R.ok(ic.b.length > 20 && ic.b !== ic.a, 'b : icône propre, différente de celle de l\'aimant');
    R.ok(e0.label === 'Palette d\'accrochage' && e0.expanded === 'false' && !e0.ouverte, 'b : aria-label « Palette d\'accrochage », palette fermée à l\'ouverture (aria-expanded ' + e0.expanded + ')');
    await toucherEl(p, BOUTON);
    const e1 = await etat(p), a1 = await aides(p), lib = await p.evaluate(() => { const o = {}; window.VCroquis.AIDES_LIB.forEach(a => { o[a[0]] = a[3] || a[1]; }); return o; });
    R.ok(e1.ouverte && e1.expanded === 'true', 'b : un toucher sur le bouton ouvre la palette (aria-expanded ' + e1.expanded + ')');
    R.ok(JSON.stringify(e1.puces.map(c => c.k)) === JSON.stringify(ORDRE) && e1.puces.every(c => c.lib === lib[c.k]) && lib.accProl === 'Prolongement',
      'b : huit puces, aux libellés d\'AIDES_LIB (le court s\'il y en a un : « Prolongement », m113), et aucune pour l\'accroche au réseau : ' + e1.puces.map(c => c.lib).join(', '));
    R.ok(e1.puces.length === ORDRE.length && e1.puces.every(c => c.on === String(cochee(a1.ed, c.k)) && !c.off) && !e1.ligne
      && NOUVEAUX.every(k => puce(e1, k).on === 'false'),
      'b : puces à l\'état de S.aides (nouveaux accrochages décochés), actives, sans ligne « Aides coupées » (' + e1.puces.map(c => c.k + ' ' + c.on).join(', ') + ')');
    R.ok(JSON.stringify(await p.evaluate(() => window.VCroquis.ACCROCHES)) === JSON.stringify(ORDRE), 'b : table des puces VCroquis.ACCROCHES = ' + ORDRE.join(', '));
    const rp = e1.rp, cb = e1.rb ? (e1.rb.t + e1.rb.b) / 2 : 0;
    R.ok(!!rp && rp.r <= e1.rn.l + 0.5 && rp.t <= cb && rp.b >= cb, 'b : palette à gauche de la barre de navigation, à côté du bouton'
      + (rp ? ' (palette ' + Math.round(rp.l) + '-' + Math.round(rp.r) + ' × ' + Math.round(rp.t) + '-' + Math.round(rp.b) + ', barre dès ' + Math.round(e1.rn.l) + ')' : ''));
    const z = await p.evaluate(() => { const g = s => parseInt(getComputedStyle(document.querySelector('.vc ' + s)).zIndex, 10) || 0;
      return {pal: g('.vc-accroches'), nav: g('.vc-nav'), aide: g('.vc-aide'), pan: g('.vc-panneau'), toast: g('.vc-toast')}; });
    const dessus = rp ? await p.evaluate(r => { const e = document.elementFromPoint((r.l + r.r) / 2, (r.t + r.b) / 2); return !!e && !!e.closest('.vc-accroches'); }, rp) : false;
    R.ok(dessus && z.pal > z.nav && z.pal > z.aide && z.pal < z.pan && z.pal < z.toast, 'b : au-dessus du plan et des barres, sous le panneau et le toast (z ' + JSON.stringify(z) + ')');
    /* clavier : Espace bascule la puce qui a le focus ; la palette est reconstruite, la puce de même clé garde le focus */
    const foc = () => p.evaluate(() => { const a = document.activeElement, c = document.querySelector('.vc .vc-accroches [data-accr="angles"]');
      return {k: a ? a.getAttribute('data-accr') || a.tagName : '', on: c ? c.getAttribute('aria-pressed') : null, ed: window.__vcEd.etat.aides.angles}; });
    await p.focus(PUCE('angles')); await p.keyboard.press('Space'); await C.pause(p, 200);
    const f1 = await foc();
    await p.keyboard.press('Space'); await C.pause(p, 200);
    const f2 = await foc();
    R.ok(f1.k === 'angles' && f1.on === 'false' && f1.ed === false && f2.k === 'angles' && f2.on === 'true' && f2.ed === true,
      'b : au clavier, Espace bascule « Angles droits et 45° » deux fois, la puce garde le focus (focus ' + f1.k + ', ' + f1.on + ' ; puis ' + f2.k + ', ' + f2.on + ')');
    await toucherEl(p, BOUTON);
    const e2 = await etat(p);
    R.ok(!e2.ouverte && e2.expanded === 'false', 'b : un second toucher sur le bouton ferme la palette (aria-expanded ' + e2.expanded + ')');
    erreurs(A, 'b');
  } finally { await A.fermer(); }
}

/* p : tablette en portrait (600 × 960), un panneau ouvert en bas, puis la palette. Mesures : palette (largeur, contenu, bords), centre du
   bouton, barre de navigation, panneau, barre du haut ; pour chaque puce, entière dans la palette, et touchée en son centre */
const mesurePortrait = p => p.evaluate(() => {
  const R0 = document.querySelector('.vc'), a = R0.querySelector('.vc-accroches'), r = e => e.getBoundingClientRect();
  const q = r(a), rb = r(R0.querySelector('.vc-nav .vc-accr')), n = r(R0.querySelector('.vc-nav')), pn = r(R0.querySelector('.vc-panneau')), hb = r(R0.querySelector('.vc-barre'));
  const puces = Array.from(a.querySelectorAll('.vc-chip')).map(c => { const k = r(c), h = document.elementFromPoint((k.left + k.right) / 2, (k.top + k.bottom) / 2);
    return {k: c.dataset.accr, dedans: k.left >= q.left - 0.5 && k.right <= q.right + 0.5 && k.top >= q.top - 0.5 && k.bottom <= q.bottom + 0.5, atteinte: !!h && c.contains(h)}; });
  return {ouverte: !a.hidden && a.getClientRects().length > 0, pan: window.__vcEd.etat.panneau, w: q.width, sw: a.scrollWidth, cw: a.clientWidth,
    l: q.left, r: q.right, t: q.top, b: q.bottom, cb: (rb.top + rb.bottom) / 2, navL: n.left, panT: pn.top, barreB: hb.bottom, puces};
});
async function portrait(){
  const A = await croquisNeuf({viewport: {width: 600, height: 960}}), p = A.p;
  try {
    if (!await boutonLa(p, 'p')) return;
    const rg = A.plan(70, 9);
    await C.injecter(p, {el: [C.P('R', 'regard', rg.x, rg.y)]});
    const panneaux = [['Réglages', () => toucherEl(p, '.vc [data-p="reglages"]')], ['Contrôles', () => toucherEl(p, '.vc [data-p="controles"]')],
      ['fiche d\'un regard', async () => { await p.evaluate(() => window.__vcEd.selectionner('R')); await C.pause(p, 300); }]];
    for (const [nom, ouvrirPan] of panneaux){
      await ouvrirPan(); await toucherEl(p, BOUTON);
      const e = await mesurePortrait(p);
      R.ok(e.ouverte && !!e.pan, 'p : portrait, ' + nom + ' : panneau et palette ouverts (' + e.pan + ')');
      R.ok(e.w >= 280 && e.sw <= e.cw, 'p : ' + nom + ' : palette de ' + Math.round(e.w) + ' px de large, rien n\'y est coupé (contenu ' + e.sw + ' px pour ' + e.cw + ')');
      R.ok(e.puces.length === ORDRE.length && e.puces.every(c => c.dedans && c.atteinte), 'p : ' + nom + ' : chaque puce (' + e.puces.length + ') est entière dans la palette et se touche en son centre ('
        + e.puces.map(c => c.k + (c.dedans ? '' : ' coupée') + (c.atteinte ? '' : ' hors d\'atteinte')).join(', ') + ')');
      R.ok(e.r <= e.navL + 0.5 && e.t <= e.cb && e.b >= e.cb && e.b <= e.panT + 0.5 && e.t >= e.barreB - 0.5 && e.l >= 0,
        'p : ' + nom + ' : palette à gauche de la barre de navigation, à côté du bouton, au-dessus du panneau, sous la barre du haut (palette '
        + Math.round(e.l) + '-' + Math.round(e.r) + ' × ' + Math.round(e.t) + '-' + Math.round(e.b) + ', barre dès ' + Math.round(e.navL) + ', panneau dès ' + Math.round(e.panT) + ')');
      /* Échap : la palette, puis le panneau */
      await p.keyboard.press('Escape'); await C.pause(p, 250); await p.keyboard.press('Escape'); await C.pause(p, 250);
    }
    erreurs(A, 'p');
  } finally { await A.fermer(); }
}

/* e : Réglages de l'éditeur, Échap, retour de l'appareil */
async function reglagesEtEchap(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'e')) return;
    await toucherEl(p, '.vc [data-p="reglages"]');
    const pan0 = await panneau(p);
    await toucherEl(p, BOUTON);
    const e1 = await etat(p), pan1 = await panneau(p);
    R.ok(pan0 === 'reglages' && e1.ouverte && pan1 === 'reglages', 'e : panneau Réglages ouvert, puis la palette : les deux restent ouverts (' + pan0 + ', ' + pan1 + ')');
    const rpan = await p.evaluate(() => { const q = document.querySelector('.vc .vc-panneau').getBoundingClientRect(); return {l: q.left}; }), rp1 = e1.rp, cb1 = e1.rb ? (e1.rb.t + e1.rb.b) / 2 : 0;
    R.ok(!!rp1 && rp1.r <= e1.rn.l + 0.5 && rp1.t <= cb1 && rp1.b >= cb1 && rp1.r < rpan.l, 'e : panneau ouvert : la palette suit la barre de navigation, à côté du bouton, hors du panneau'
      + (rp1 ? ' (palette ' + Math.round(rp1.l) + '-' + Math.round(rp1.r) + ', barre dès ' + Math.round(e1.rn.l) + ', panneau dès ' + Math.round(rpan.l) + ')' : ''));
    const t = await p.evaluate(() => { const c = document.querySelector('.vc .vc-pcorps [data-a="aide"][data-k="actives"]'), ch = c && c.closest('.vc-champ'), l = ch && ch.querySelector('.vc-lab small'); return l ? l.textContent : ''; });
    R.ok(t === 'aussi par le bouton aimant et la palette d\'accrochage, à droite du plan', 'e : Réglages de l\'éditeur, « Aides au dessin » : ' + JSON.stringify(t));
    await toucherEl(p, PUCE('parallele'));
    const a2 = await aides(p), e2 = await etat(p),
      reg = await p.evaluate(() => { const c = document.querySelector('.vc .vc-pcorps [data-a="aide"][data-k="parallele"]'); return c ? c.getAttribute('aria-pressed') : null; });
    R.ok(a2.ed.parallele === false && a2.hote.parallele === false && reg === 'false' && e2.ouverte && puce(e2, 'parallele').on === 'false',
      'e : « Parallèle au bâti » décochée dans la palette : S.aides (' + a2.ed.parallele + '), réglages de l\'application (' + a2.hote.parallele + ') et case des Réglages (' + reg + ') suivent, la palette reste ouverte');
    await p.keyboard.press('Escape'); await C.pause(p, 300);
    const e3 = await etat(p), pan3 = await panneau(p);
    R.ok(!e3.ouverte && e3.expanded === 'false' && pan3 === 'reglages', 'e : Échap ferme la palette d\'abord ; le panneau reste ouvert (' + pan3 + ')');
    await p.keyboard.press('Escape'); await C.pause(p, 300);
    const pan4 = await panneau(p), ouvert4 = await p.evaluate(() => !!document.querySelector('#modal-root .vc'));
    R.ok(pan4 === null && ouvert4, 'e : témoin : Échap suivant ferme le panneau, le croquis reste ouvert (' + pan4 + ')');
    /* « Parallèle au bâti » recochée, palette ouverte ; retour de l'appareil (historique du navigateur) */
    await toucherEl(p, BOUTON); await toucherEl(p, PUCE('parallele'));
    const a5 = await aides(p), e5 = await etat(p);
    R.ok(a5.ed.parallele === true && a5.hote.parallele === true && e5.ouverte, 'e : « Parallèle au bâti » recochée (' + a5.ed.parallele + ', ' + a5.hote.parallele + ')');
    await p.evaluate(() => history.back()); await C.pause(p, 600);
    const e6 = await etat(p), ouvert6 = await p.evaluate(() => !!document.querySelector('#modal-root .vc'));
    R.ok(!e6.ouverte && e6.expanded === 'false' && ouvert6, 'e : le retour de l\'appareil ferme la palette ; le croquis reste ouvert (' + ouvert6 + ')');
    erreurs(A, 'e');
  } finally { await A.fermer(); }
}

/* a : accroche au bâti, réglage gardé par l'application */
async function accrocheBati(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'a')) return;
    /* descente touchée près du coin sud-ouest du bâti de la démonstration (descenteCoin) */
    const poser = () => descenteCoin(A), dq = DQ;
    const d0 = await poser();
    R.ok(d0 != null && d0 < 0.002, 'a : témoin : « Accroche au bâti » cochée, la descente touchée à ' + m(dq) + ' du coin s\'y cale (' + m(d0) + ' du coin)');
    await toucherEl(p, BOUTON); await toucherEl(p, PUCE('bati'));
    const a1 = await aides(p), e1 = await etat(p);
    R.ok(a1.ed.bati === false && a1.hote.bati === false && puce(e1, 'bati').on === 'false',
      'a : « Accroche au bâti » décochée : S.aides.bati ' + a1.ed.bati + ', enregistré par l\'application (bati: ' + a1.hote.bati + ')');
    R.ok(['actives', 'parallele', 'angles', 'finir', 'glisser', 'orienter', 'coude'].every(k => a1.ed[k] !== false && a1.hote[k] !== false),
      'a : les autres aides restent cochées, dans l\'éditeur et dans l\'application');
    await toucherEl(p, BOUTON);
    const d1 = await poser();
    R.ok(d1 != null && Math.abs(d1 - dq) < 0.03, 'a : puce décochée : la descente reste où on l\'a touchée (' + m(d1) + ' du coin, touchée à ' + m(dq) + ')');
    /* réouverture du croquis : l'application rend ses réglages à l'éditeur */
    await rouvrir(p);
    await toucherEl(p, BOUTON);
    const a2 = await aides(p), e2 = await etat(p);
    R.ok(a2.ed.bati === false && puce(e2, 'bati').on === 'false', 'a : croquis rouvert : « Accroche au bâti » toujours décochée (S.aides.bati ' + a2.ed.bati + ', puce ' + puce(e2, 'bati').on + ')');
    await toucherEl(p, PUCE('bati'));
    const a3 = await aides(p);
    await toucherEl(p, BOUTON);
    R.ok(a3.ed.bati === true && a3.hote.bati === true, 'a : puce recochée : S.aides.bati ' + a3.ed.bati + ', application ' + a3.hote.bati);
    const d2 = await poser();
    R.ok(d2 != null && d2 < 0.002, 'a : puce recochée : la descente est de nouveau attirée par le coin (' + m(d2) + ' du coin)');
    erreurs(A, 'a');
  } finally { await A.fermer(); }
}

/* r : aimant coupé ; accroche au réseau toujours active */
async function aimantEtReseau(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'r')) return;
    const rg = A.plan(70, 19), dep = A.plan(66, 19);
    await C.injecter(p, {el: [C.P('R', 'regard', rg.x, rg.y)]}); await vueSur(A, 68, 19);
    await toucherEl(p, BOUTON); await toucherEl(p, '.vc .vc-nav .vc-aimant');
    const a1 = await aides(p), e1 = await etat(p);
    R.ok(a1.ed.actives === false && a1.hote.actives === false && e1.ouverte && e1.puces.length === ORDRE.length && e1.puces.every(c => c.off),
      'r : aimant coupé, palette ouverte : les huit puces sont grisées (' + e1.puces.map(c => c.k + (c.off ? ' grisée' : ' active')).join(', ') + ')');
    R.ok(e1.ligne === 'Aides coupées : touchez l\'aimant pour les rétablir', 'r : la palette dit : ' + JSON.stringify(e1.ligne));
    R.ok(e1.puces.every(c => c.on === String(NOUVEAUX.indexOf(c.k) < 0)), 'r : les puces grisées gardent leur état (aides d\'origine cochées, nouveaux accrochages décochés : '
      + e1.puces.map(c => c.k + ' ' + c.on).join(', ') + ')');
    await toucherEl(p, PUCE('angles'), 350, {force: true});
    const a2 = await aides(p);
    R.ok(a2.ed.angles !== false && a2.hote.angles !== false, 'r : un toucher sur une puce grisée n\'y change rien (angles ' + a2.ed.angles + ')');
    await toucherEl(p, BOUTON);
    /* tracé libre, sans redressement ni accroche au bâti, comme le dit la case « Aides activées » de l'application */
    const dc1 = await descenteCoin(A), ao1 = await tuyauOblique(A);
    R.ok(dc1 != null && Math.abs(dc1 - DQ) < 0.03, 'r : aimant coupé : la descente touchée à ' + m(DQ) + ' du coin reste où on l\'a touchée (' + m(dc1) + ' du coin)');
    R.ok(ao1 != null && Math.abs(ao1 - 4) < 0.5, 'r : aimant coupé : le tuyau tracé à 4° de la façade n\'est pas redressé (' + deg(ao1) + ')');
    await C.injecter(p, {el: [C.P('R', 'regard', rg.x, rg.y)]}); await vueSur(A, 68, 19);
    /* tuyau du point libre au regard, touché à 9 px de son centre ; aide « Terminer sur un objet » coupée avec l'aimant : le tracé est fini
       à la main */
    await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'});
    await C.toucherCv(p, await C.ecranCv(p, dep.x, dep.y), 600);
    const qr = await C.ecranCv(p, rg.x, rg.y);
    await C.toucherCv(p, {x: qr.x - 7, y: qr.y + 5}, 600);
    const nb = await p.evaluate(() => { const b = window.__vcEd.etat.brouillon; return b ? b.pts.length : 0; });
    R.ok(nb === 2, 'r : témoin : aimant coupé, le tracé ne se termine pas seul sur le regard (' + nb + ' points en cours)');
    await p.evaluate(() => window.__vcEd.terminerTrace()); await C.pause(p, 300);
    const d1 = await C.docCroquis(p), t1 = d1.el.find(e => e.k === 'ln' && e.t === 'tr');
    R.ok(!!t1 && t1.v.length === 2 && !t1.v[0].a && t1.v[1].a === 'R' && Math.hypot(t1.v[1].x - rg.x, t1.v[1].y - rg.y) < 1e-6,
      'r : aimant coupé : le tuyau tracé jusqu\'au regard s\'y raccorde quand même (accroche au réseau)' + (t1 ? ' (' + t1.v.map(w => w.a || 'libre').join(' → ') + ')' : ' (aucun tuyau)'));
    /* second tuyau, d'un point libre jusqu'au milieu du premier : un raccord */
    const mil = A.plan(68, 19), dep2 = A.plan(68, 21.5);
    await C.toucherCv(p, await C.ecranCv(p, dep2.x, dep2.y), 600);
    const qm = await C.ecranCv(p, mil.x, mil.y);
    await C.toucherCv(p, {x: qm.x + 4, y: qm.y - 6}, 600);
    await p.evaluate(() => window.__vcEd.terminerTrace()); await C.pause(p, 300);
    const d2 = await C.docCroquis(p), j = d2.el.filter(e => e.t === 'jonction'), ls = d2.el.filter(e => e.k === 'ln' && e.t === 'tr'),
      t2 = ls.find(l => !l.v.some(w => w.a === 'R')), t1b = ls.find(l => l.v.some(w => w.a === 'R'));
    R.ok(j.length === 1 && !!t2 && t2.v[t2.v.length - 1].a === j[0].id && !!t1b && t1b.v.some(w => w.a === j[0].id),
      'r : aimant coupé : un tuyau tracé jusqu\'au premier y crée un raccord (' + j.length + ' raccord, ' + ls.length + ' tuyaux)');
    /* fiche du second tuyau fermée : une barre d'aide affichée avec la fiche couvre le bas de la barre de navigation (aimant compris) */
    await p.evaluate(() => { const ed = window.__vcEd; if (ed.etat.panneau || ed.etat.sel) ed.fermerNiveau(); }); await C.pause(p, 250);
    await toucherEl(p, BOUTON); await toucherEl(p, '.vc .vc-nav .vc-aimant');
    const a3 = await aides(p), e3 = await etat(p);
    R.ok(a3.ed.actives === true && e3.ouverte && e3.puces.length === ORDRE.length && e3.puces.every(c => !c.off) && !e3.ligne,
      'r : aimant rétabli : puces actives, ligne retirée (' + JSON.stringify(e3.ligne) + ')');
    /* témoins, aimant rétabli (palette fermée) : la descente est de nouveau attirée, le tuyau redressé */
    await toucherEl(p, BOUTON);
    const dc2 = await descenteCoin(A), ao2 = await tuyauOblique(A);
    R.ok(dc2 != null && dc2 < 0.002 && ao2 != null && Math.abs(ao2) < 0.05,
      'r : témoins, aimant rétabli : la descente se cale sur le coin (' + m(dc2) + ' du coin), le tuyau est redressé parallèle à la façade (' + deg(ao2) + ')');
    erreurs(A, 'r');
  } finally { await A.fermer(); }
}

/* t : un toucher sur le plan, palette ouverte */
async function toucherPlan(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 't')) return;
    const q1 = A.plan(67, 19), regards = async () => (await C.docCroquis(p)).el.filter(e => e.t === 'regard');
    await vueSur(A, 68, 19);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'});
    await toucherEl(p, BOUTON);
    await toucherEl(p, '.vc .vc-accroches h3');
    const e0 = await etat(p), n0 = (await regards()).length;
    R.ok(e0.ouverte && n0 === 0, 't : outil Regard : un toucher sur la palette elle-même (son titre) la laisse ouverte et ne pose rien (' + n0 + ')');
    await C.toucherCv(p, await C.ecranCv(p, q1.x, q1.y), 700);
    const e1 = await etat(p), n1 = (await regards()).length, s1 = await p.evaluate(() => ({sel: window.__vcEd.etat.sel, pan: window.__vcEd.etat.panneau}));
    R.ok(!e1.ouverte && e1.expanded === 'false' && n1 === 0 && !s1.sel && !s1.pan, 't : outil Regard, palette ouverte : un toucher sur le plan la ferme, sans poser de regard (' + n1 + ')');
    await C.toucherCv(p, await C.ecranCv(p, q1.x, q1.y), 700);
    const n2 = (await regards()).length;
    R.ok(n2 === 1, 't : témoin : le toucher suivant pose le regard (' + n2 + ')');
    /* outil Choisir : un toucher sur un regard, palette ouverte */
    await C.injecter(p, {el: [C.P('R', 'regard', q1.x, q1.y)]}); await C.outil(p, {k: 'main'});
    await toucherEl(p, BOUTON);
    await C.toucherCv(p, await C.ecranCv(p, q1.x, q1.y), 700);
    const e3 = await etat(p), s3 = await p.evaluate(() => ({sel: window.__vcEd.etat.sel, pan: window.__vcEd.etat.panneau}));
    R.ok(!e3.ouverte && !s3.sel && !s3.pan, 't : outil Choisir, palette ouverte : un toucher sur un regard ferme la palette sans le choisir (' + JSON.stringify(s3) + ')');
    await C.toucherCv(p, await C.ecranCv(p, q1.x, q1.y), 700);
    const s4 = await p.evaluate(() => window.__vcEd.etat.sel);
    R.ok(!!s4 && s4.id === 'R', 't : témoin : le toucher suivant choisit le regard');
    /* outil Tronçon (aide « Tracer en glissant le doigt ») : un glissé du doigt, palette ouverte */
    await C.injecter(p, {el: []}); await vueSur(A, 68, 19); await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'});
    const g0 = A.plan(66, 18), g1 = A.plan(70, 18.5), v0 = await C.vue(p);
    await toucherEl(p, BOUTON);
    await C.glisserDoigtCv(p, await C.ecranCv(p, g0.x, g0.y), await C.ecranCv(p, g1.x, g1.y), 600);
    const e5 = await etat(p), v5 = await C.vue(p), b5 = await p.evaluate(() => window.__vcEd.etat.brouillon), n5 = (await C.docCroquis(p)).el.length;
    R.ok(!e5.ouverte && !b5 && n5 === 0 && v5.cx === v0.cx && v5.cy === v0.cy && v5.s === v0.s,
      't : outil Tronçon, palette ouverte : un glissé du doigt la ferme, sans tracé ni déplacement de la vue (' + (b5 ? 'tracé en cours' : 'aucun tracé') + ', vue ' + (v5.cx === v0.cx && v5.cy === v0.cy ? 'fixe' : 'déplacée') + ')');
    await C.glisserDoigtCv(p, await C.ecranCv(p, g0.x, g0.y), await C.ecranCv(p, g1.x, g1.y), 600);
    const b6 = await p.evaluate(() => { const b = window.__vcEd.etat.brouillon; return b ? b.pts.length : 0; });
    R.ok(b6 === 2, 't : témoin : le glissé suivant trace un segment (' + b6 + ' points)');
    await p.evaluate(() => window.__vcEd.fermerNiveau()); await C.pause(p, 200);
    /* souris : un clic avec l'outil Regard, palette ouverte */
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'});
    await toucherEl(p, BOUTON);
    await C.cliquerCv(p, await C.ecranCv(p, q1.x, q1.y), 'left', 600);
    const e7 = await etat(p), n7 = (await regards()).length;
    R.ok(!e7.ouverte && n7 === 0, 't : à la souris, palette ouverte : un clic sur le plan la ferme, sans poser de regard (' + n7 + ')');
    /* outil Choisir, plan vide : un glissé du doigt, puis une pince à deux doigts, palette ouverte (en dernier : les témoins déplacent la
       vue et zooment). On compare cx, cy et s : un second doigt qui ne serait plus avalé déplacerait la vue sans zoomer */
    await C.injecter(p, {el: []}); await vueSur(A, 68, 19); await C.outil(p, {k: 'main'});
    const memeVue = (a, b) => a.cx === b.cx && a.cy === b.cy && a.s === b.s, w0 = await C.vue(p);
    await toucherEl(p, BOUTON);
    await C.glisserDoigtCv(p, await C.ecranCv(p, g0.x, g0.y), await C.ecranCv(p, g1.x, g1.y), 600);
    const e8 = await etat(p), w8 = await C.vue(p);
    R.ok(!e8.ouverte && memeVue(w8, w0), 't : outil Choisir, palette ouverte : un glissé du doigt la ferme sans déplacer la vue');
    await C.glisserDoigtCv(p, await C.ecranCv(p, g0.x, g0.y), await C.ecranCv(p, g1.x, g1.y), 600);
    const w9 = await C.vue(p);
    R.ok(w9.cx !== w8.cx || w9.cy !== w8.cy, 't : témoin : le glissé suivant déplace la vue');
    const mi = {x: w9.w / 2, y: w9.h / 2};
    await toucherEl(p, BOUTON);
    await pincerCv(p, mi, 80, 270, 600);
    const e10 = await etat(p), w10 = await C.vue(p);
    R.ok(!e10.ouverte && memeVue(w10, w9), 't : outil Choisir, palette ouverte : une pince à deux doigts la ferme sans zoomer ni déplacer la vue (s '
      + w9.s + ' -> ' + w10.s + ', cx ' + w9.cx.toFixed(2) + ' -> ' + w10.cx.toFixed(2) + ')');
    await pincerCv(p, mi, 80, 270, 600);
    R.ok((await C.vue(p)).s > w10.s * 1.5, 't : témoin : la pince suivante zoome');
    erreurs(A, 't');
  } finally { await A.fermer(); }
}

/* f : autres fermetures */
async function fermetures(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'f')) return;
    const q1 = A.plan(67, 19);
    await C.injecter(p, {el: [C.P('R', 'regard', q1.x, q1.y)]}); await vueSur(A, 68, 19);
    await toucherEl(p, BOUTON);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'});
    const e1 = await etat(p);
    R.ok(!e1.ouverte && e1.expanded === 'false', 'f : le choix d\'un outil ferme la palette');
    await toucherEl(p, BOUTON);
    await toucherEl(p, '.vc [data-p="controles"]');
    const e2 = await etat(p), pan2 = await panneau(p);
    R.ok(!e2.ouverte && pan2 === 'controles', 'f : l\'ouverture d\'un panneau (Contrôles) ferme la palette (' + pan2 + ')');
    await toucherEl(p, BOUTON);
    const e3a = await etat(p);
    await p.evaluate(() => window.__vcEd.selectionner('R')); await C.pause(p, 300);
    const e3 = await etat(p), pan3 = await panneau(p);
    R.ok(e3a.ouverte && !e3.ouverte && pan3 === 'fiche', 'f : panneau Contrôles et palette ouverts, la fiche d\'un objet choisi s\'ouvre : la palette se ferme (' + pan3 + ')');
    /* pose par cotes : outil Regard, palette ouverte, bouton « Cotes » de la barre d'aide */
    await C.injecter(p, {el: [C.P('R', 'regard', q1.x, q1.y)]}); await vueSur(A, 70, 6);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'});
    await toucherEl(p, BOUTON);
    const e4a = await etat(p);
    await p.evaluate(() => document.querySelector('.vc .vc-aide [data-a="cotes"]').click()); await C.pause(p, 300);
    const e4 = await etat(p), c4 = await p.evaluate(() => !!window.__vcEd.etat.cotes);
    R.ok(e4a.ouverte && c4 && !e4.ouverte, 'f : l\'entrée dans la pose par cotes ferme la palette (mode ' + (c4 ? 'ouvert' : 'absent') + ')');
    await p.evaluate(() => window.__vcEd.fermerNiveau()); await C.pause(p, 200);
    /* réouverture du croquis, palette ouverte à la fermeture */
    await toucherEl(p, BOUTON);
    const e5a = await etat(p);
    await rouvrir(p);
    const e5 = await etat(p);
    R.ok(e5a.ouverte && !e5.ouverte && e5.expanded === 'false', 'f : croquis fermé palette ouverte, puis rouvert : la palette est fermée');
    erreurs(A, 'f');
  } finally { await A.fermer(); }
}

/* m : table des puces, pour m112 */
async function table(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'm')) return;
    await p.evaluate(() => { window.VCroquis.ACCROCHES.push('finir'); });
    /* outil Tronçon, un premier point posé : la barre d'aide dit que le tronçon se termine sur un objet (aide « Terminer sur un objet ») ;
       puce décochée, elle ne le dit plus */
    const d0 = A.plan(66, 19), txt = () => p.evaluate(() => document.querySelector('.vc .vc-aide').textContent);
    await vueSur(A, 68, 19); await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'});
    await C.toucherCv(p, await C.ecranCv(p, d0.x, d0.y), 600);
    await toucherEl(p, BOUTON);
    const e1 = await etat(p), t1 = await txt();
    await toucherEl(p, PUCE('finir'));
    const a2 = await aides(p), t2 = await txt();
    await toucherEl(p, PUCE('finir'));
    const a3 = await aides(p), t3 = await txt();
    await toucherEl(p, BOUTON);
    await p.evaluate(() => { window.VCroquis.ACCROCHES.pop(); });
    const k4 = e1.puces[ORDRE.length] || {};
    R.ok(e1.puces.length === ORDRE.length + 1 && k4.k === 'finir' && k4.lib === 'Terminer sur un objet' && k4.on === 'true',
      'm : une clé ajoutée à VCroquis.ACCROCHES donne une puce de plus, au libellé d\'AIDES_LIB (' + e1.puces.map(c => c.lib).join(', ') + ')');
    R.ok(/se termine sur un objet/.test(t1) && a2.ed.finir === false && a2.hote.finir === false && !/se termine sur un objet/.test(t2) && a3.ed.finir === true && /se termine sur un objet/.test(t3),
      'm : la barre d\'aide suit la puce (décochée : ' + JSON.stringify(t2.slice(0, 70)) + ' ; recochée : ' + JSON.stringify(t3.slice(0, 70)) + ')');
    await toucherEl(p, BOUTON);
    const e2 = await etat(p);
    await toucherEl(p, BOUTON);
    R.ok(e2.puces.length === ORDRE.length, 'm : clé retirée : huit puces de nouveau (' + e2.puces.length + ')');
    erreurs(A, 'm');
  } finally { await A.fermer(); }
}

/* ---------- m112 : nouveaux accrochages (Milieu d'un côté, Perpendiculaire, Limites de parcelle) ---------- */
/* libellés d'AIDES_LIB des nouveaux accrochages (m112, puis m113) */
const LIB112 = {accMilieu: 'Milieu d\'un côté', accPerp: 'Perpendiculaire', accParcelle: 'Limites de parcelle', accProl: 'Prolongement d\'un côté', accInter: 'Intersection'};
/* anciens réglages de l'application (avant m112) : sans les nouvelles clés */
const ANCIENS = {actives: true, glisser: true, finir: true, parallele: true, bati: true, angles: true, orienter: true, coude: true};
const LIM = {k: 'ln', id: 'lim', pal: 'tr'}, TRONCON = {k: 'ln', id: 'tr', pal: 'tr'}, ESC = {k: 'ln', id: 'esc', pal: 'tr'}, DESC = {k: 'pt', t: 'descente', pal: 'ep'};
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const proche = (a, b, e) => !!a && !!b && Math.abs(a.x - b.x) <= (e || 1e-9) && Math.abs(a.y - b.y) <= (e || 1e-9);
const ecart = (a, b) => a && b ? dist(a, b).toExponential(1) + ' m' : 'aucun point';
/* aides de l'éditeur : o (clé → valeur, null compris) ; sans : clés retirées */
const reglerAides = (p, o, sans) => p.evaluate(([o, sans]) => { const a = window.__vcEd.etat.aides; Object.assign(a, o); sans.forEach(k => { delete a[k]; }); }, [o || {}, sans || []]);
/* plan vide (ou les éléments els), sans tracé en cours ni repère, vue de croquisNeuf ; puis l'outil o */
async function plan112(A, o, els){
  await C.injecter(A.p, {el: els || []});
  await A.p.evaluate(() => { const S = window.__vcEd.etat; S.brouillon = null; S.accrocheVue = null; });
  await vueSur(A, 70, 6);
  if (o) await C.outil(A.p, o);
}
/* côtés des lignes de référence du fond affiché, de nature nat ('bati' ou 'limite'), en mètres du croquis : {a, b}, sommets du fond plus
   son décalage (les valeurs des aides au dessin) */
const cotesRef = (p, nat) => p.evaluate(nat => {
  const S = window.__vcEd.etat, V = window.VCroquis, off = V.decalageFond(S.fond, S.doc) || {x: 0, y: 0}, out = [];
  (V.geo.lignesRef(null, S.fond, off, [nat]) || []).forEach(r => { for (let k = 1; k < r.P.length; k++) out.push({a: r.P[k - 1], b: r.P[k]}); });
  return out;
}, nat);
/* le côté de cs dont les bouts sont à 1 cm au plus des points a et b du repère de la démonstration, dans un sens ou dans l'autre */
function cote(A, cs, a, b){
  const qa = A.plan(a[0], a[1]), qb = A.plan(b[0], b[1]);
  return cs.find(c => (dist(c.a, qa) < .01 && dist(c.b, qb) < .01) || (dist(c.a, qb) < .01 && dist(c.b, qa) < .01)) || null;
}
const milieuDe = c => ({x: (c.a.x + c.b.x) / 2, y: (c.a.y + c.b.y) / 2});
/* pied de la perpendiculaire menée de q sur la droite du côté c (calcul de VCroquis.geo.piedPerp) ; distance de q à cette droite */
const piedSur = (q, c) => { const dx = c.b.x - c.a.x, dy = c.b.y - c.a.y, t = ((q.x - c.a.x) * dx + (q.y - c.a.y) * dy) / (dx * dx + dy * dy); return {x: c.a.x + t * dx, y: c.a.y + t * dy}; };
const horsDroite = (q, c) => q ? Math.abs((c.b.x - c.a.x) * (q.y - c.a.y) - (c.b.y - c.a.y) * (q.x - c.a.x)) / dist(c.a, c.b) : Infinity;
/* dernier point du tracé en cours {x, y, aide, doigt (point touché), surBati}, nombre de points, repère affiché (S.accrocheVue : type, de ;
   bouts d'où partent les tirets d'un prolongement, m113) */
const dernier = p => p.evaluate(() => {
  const S = window.__vcEd.etat, b = S.brouillon, q = b && b.pts.length ? b.pts[b.pts.length - 1] : null, av = S.accrocheVue;
  return {q: q ? {x: q.x, y: q.y, aide: q.aide, doigt: q.doigt || null, surBati: q.surBati} : null, n: b ? b.pts.length : 0,
    vue: av ? {type: av.type || null, de: av.de || null, bouts: av.bouts || null} : null};
});
const genre = r => r && r.q ? 'aide ' + (r.q.aide || 'aucune') : 'aucun point';
/* toucher (doigt) au point q du croquis ; rend le point touché, en pixels du canevas */
async function toucherPt(p, q, ms){ const s = await C.ecranCv(p, q.x, q.y); await C.toucherCv(p, s, ms == null ? 300 : ms); return s; }
const px = (s, t) => Math.hypot(s.x - t.x, s.y - t.y).toFixed(1) + ' px';
/* espion du canevas : traits courts (2 à 7 points, en pixels du canevas ; en tirets ou non) et textes écrits depuis la dernière lecture */
const espionner = p => p.evaluate(() => {
  window.__esp = {traits: [], textes: []};
  const P = CanvasRenderingContext2D.prototype; if (P.__esp112) return; P.__esp112 = true;
  const o = {beginPath: P.beginPath, moveTo: P.moveTo, lineTo: P.lineTo, stroke: P.stroke, fillText: P.fillText}; let cur = null;
  P.beginPath = function(){ cur = []; return o.beginPath.apply(this, arguments); };
  P.moveTo = function(x, y){ if (cur && cur.length < 8) cur.push([x, y]); return o.moveTo.apply(this, arguments); };
  P.lineTo = function(x, y){ if (cur && cur.length < 8) cur.push([x, y]); return o.lineTo.apply(this, arguments); };
  P.stroke = function(){ const E = window.__esp; if (E && cur && cur.length >= 2 && cur.length < 8 && E.traits.length < 4000) E.traits.push({pts: cur.slice(), tirets: this.getLineDash().length > 0}); return o.stroke.apply(this, arguments); };
  P.fillText = function(s, x, y){ const E = window.__esp; if (E && E.textes.length < 4000) E.textes.push({s: String(s), x: x, y: y}); return o.fillText.apply(this, arguments); };
});
const lireEspion = p => p.evaluate(() => { const E = window.__esp || {traits: [], textes: []}; window.__esp = {traits: [], textes: []}; return E; });
/* libellé lib écrit à 40 px au plus du point s du canevas */
const ecrit = (E, lib, s) => E.textes.some(t => t.s === lib && Math.hypot(t.x - s.x, t.y - s.y) < 40);

/* d : 20 touchers près des milieux, des pieds de perpendiculaire et des limites, dans le repère de la démonstration : [outil, points…], chaque
   suite sur un plan vide. Un trait commencé en (62 ; 1,5) ou en (68 ; 1) est loin de toute cible. FIGES : les points posés sur e9e8b5d
   (mètres du croquis, au nanomètre, et genre : aide, accroche ou libre) */
const TOUCHERS = [
  ['lim', [62, 1.5], [70.1414, 3.8586]],   // fin à 8 px du milieu de la façade sud, en biais, dehors
  ['lim', [62, 1.5], [70.15, 4.1]],        // fin dans le bâti, à 7 px du milieu
  ['lim', [68, 1], [68, 3.85]],            // fin à 6 px du pied de la perpendiculaire sur la façade sud
  ['lim', [68, 1], [68.1, 3.9]],           // fin près du pied, en biais
  ['lim', [63.8, 0.2]],                    // premier point à 11 px du coin de limite (64 ; 0)
  ['lim', [64.1, 1.5]],                    // premier point à 4 px du côté de limite u = 64
  ['lim', [62, 1.5], [70, 0.15]],          // fin près du milieu du côté de limite v = 0
  ['lim', [74.6, 9.05]],                   // premier point près du milieu de la façade est
  ['tr', [70.15, 3.85], [66, 1]],          // tronçon : départ près du milieu de la façade sud
  ['tr', [68, 1], [68.1, 3.85]],           // tronçon : fin près du pied
  ['descente', [70.2, 3.8]],               // descente (objet de mur) près du milieu
  ['descente', [63.8, 0.2]],               // descente près du coin de limite
  ['regard', [70.1, 3.9]]                  // regard près du milieu
];
const FIGES = [
  'b1 -39.666716291;14.357746231 libre', 'b2 -32.223028784;18.495931072 facade', 'b1 -39.666716291;14.357746231 libre', 'b2 -32.214620163;18.497718250 facade',
  'b1 -33.693874841;15.116142577 libre', 'b2 -34.286382128;17.903871959 parallele', 'b1 -33.693874841;15.116142577 libre', 'b2 -34.296777299;17.952780932 parallele',
  'b1 -37.635765411;13.460395395 libre', 'b1 -37.612606329;14.794360782 libre', 'b1 -39.666716291;14.357746231 libre', 'b2 -31.560854702;14.700540497 libre',
  'b1 -29.009932925;24.341587107 facade', 'b1 -32.183405818;18.350873373 libre', 'b2 -35.650170042;14.700319195 libre', 'b1 -33.693874841;15.116142577 libre',
  'b2 -34.286382435;17.903873399 parallele', 'descente -32.165708311;18.508114033', 'descente -37.635765411;13.460395395', 'regard -32.242708783;18.389385169'
];
/* d (m113) : 20 touchers près des prolongements des côtés et de leurs rencontres : {o: outil, c: centre de la vue, q: points}, chaque suite
   sur un plan vide, la vue centrée sur c (repère de la démonstration). Façade ouest du bâti : u = 65,5, de Ks (65,5 ; 4) à Kn (65,5 ; 14) ;
   côtés sud (v = 24) et ouest (u = 59) du bâti léger (59 ; 24)-(62,5 ; 28) ; façade nord du voisin à l'ouest : v = 14, u 51 à 62,5.
   FIGES113 : les points posés sur 4691c1a (avant m113), au même format que FIGES (un escalier : ses deux sommets et le sens de la montée) */
const TOUCHERS113 = [
  {o: 'lim', c: [68, 2], q: [[66.7, -1.8], [65.65, 1]]},   // fin à 6 px du prolongement de la façade ouest, 3 m au-delà de Ks
  {o: 'lim', c: [68, 2], q: [[65.65, 1]]},                 // premier point au même endroit
  {o: 'lim', c: [66, 44], q: [[65.65, 43.9]]},             // premier point 29,9 m au-delà de Kn
  {o: 'lim', c: [66, 20], q: [[65.6, 24.05]]},             // près de la rencontre de deux prolongements (65,5 ; 24)
  {o: 'lim', c: [60, 16], q: [[59.1, 14.05]]},             // près de la rencontre (59 ; 14) d'un prolongement et de la façade nord du voisin
  {o: 'lim', c: [68, 2], q: [[65.4, 3.9]]},                // près du coin Ks (coin existant)
  {o: 'lim', c: [68, 2], q: [[67.5, 4.15]]},               // entre les bouts de la façade sud
  {o: 'lim', c: [66, -2], q: [[64.1, -3]]},                // près du prolongement du côté ouest de la parcelle (u = 64), 3 m au-delà de (64 ; 0)
  {o: 'lim', c: [68, 2], q: [[68, -2], [65.6, 1]]},        // fin redressée à 135°, près du prolongement de la façade ouest
  {o: 'tr', c: [68, 2], q: [[65.65, 1], [68, 1]]},         // tronçon : départ près du prolongement
  {o: 'tr', c: [64, 22], q: [[68, 22], [65.6, 24.05]]},    // tronçon : fin près de la rencontre de deux prolongements
  {o: 'descente', c: [60, 16], q: [[59.15, 14.05]]},       // descente (objet de mur) près de la rencontre (59 ; 14), sur la façade
  {o: 'descente', c: [68, 2], q: [[65.65, 1]]},            // descente près du prolongement de la façade ouest
  {o: 'regard', c: [68, 2], q: [[65.65, 1]]},              // regard au même endroit
  {o: 'esc', c: [64, 22], q: [[65.6, 24.05], [65.5, 21]]}  // escalier : départ près de la rencontre de deux prolongements
];
const FIGES113 = [
  'b1 -34.383313987;12.107044096 libre', 'b2 -35.992521703;14.627550103 libre', 'b1 -35.992521703;14.627550103 libre',
  'b1 -44.911933239;56.590082174 libre', 'b1 -40.833793556;37.163456715 libre', 'b1 -45.102341938;25.982128006 facade',
  'b1 -36.763000488;17.531000137 coin', 'b1 -34.806720134;17.946790269 facade', 'b1 -36.677003720;10.392696579 libre',
  'b1 -33.070139769;12.181699774 libre', 'b2 -36.272474483;14.261387266 parallele', 'b1 -35.992521703;14.627550103 libre',
  'b2 -33.693867650;15.116108743 parallele', 'b1 -38.060020348;35.657242192 libre', 'b2 -40.698658217;37.371465352 parallele',
  'descente -45.053434702;25.992524266', 'descente -35.992521703;14.627550103', 'regard -35.992521703;14.627550103',
  'b1 -40.833793556;37.163456715 libre', 'esc -40.833793556;37.163456715 -40.200193305;34.179975588 fin'
];
/* suites de touchers par l'API de l'éditeur, comme la grille de dessin.js : chaque toucher seul (ni double toucher, ni fin automatique
   récente) ; suites : [{o: outil, c: centre de la vue (sans c : la vue d'avant), q: points}], dans le repère de la démonstration ; chacun
   rend le point posé et son genre */
async function toucherSuites(A, suites){
  const liste = suites.map(s => ({o: s.o, c: s.c ? A.plan(s.c[0], s.c[1]) : null, pts: s.q.map(q => A.plan(q[0], q[1]))}));
  return A.p.evaluate(async liste => {
    const ed = window.__vcEd, S = ed.etat, out = [], base = JSON.stringify(S.doc.el), vue = {cx: S.vue.cx, cy: S.vue.cy, s: S.vue.s};
    const image = () => new Promise(f => requestAnimationFrame(() => requestAnimationFrame(f)));
    const pt = q => q.x.toFixed(9) + ';' + q.y.toFixed(9);
    const OUT = {lim: {k: 'ln', id: 'lim', pal: 'tr'}, tr: {k: 'ln', id: 'tr', pal: 'tr'}, esc: {k: 'ln', id: 'esc', pal: 'tr'}, descente: {k: 'pt', t: 'descente', pal: 'ep'},
      regard: {k: 'pt', t: 'regard', pal: 'reg'}};
    for (const {o, c, pts} of liste){
      S.brouillon = null; S.sel = null; S.panneau = null; S.accrocheVue = null;
      ed.choisirOutil(OUT[o]);
      S.vue.cx = c ? c.x : vue.cx; S.vue.cy = c ? c.y : vue.cy; S.vue.s = vue.s; ed.redessiner(); await image();
      for (const q of pts){
        S.dernierTap = null; S.finAuto = null; S.dernierePose = null; S.clicHors = null; S.gardeFiche = null;
        const n0 = S.doc.el.length, e = S.vue.ecran(q.x, q.y); ed.tap(e.x, e.y);
        const b = S.brouillon, w = b && b.pts.length ? b.pts[b.pts.length - 1] : null, nv = S.doc.el.length > n0 ? S.doc.el[S.doc.el.length - 1] : null;
        out.push(w ? 'b' + b.pts.length + ' ' + pt(w) + ' ' + (w.aide || (w.snap ? w.snap.type : 'libre'))
          : nv ? nv.t + ' ' + (nv.k === 'pt' ? pt(nv) : nv.v.map(pt).join(' ')) + (nv.t === 'esc' && nv.p ? ' ' + nv.p.monte : '') : 'rien');
        await image();
      }
      S.brouillon = null; S.doc.el = JSON.parse(base); S.undo = []; S.redo = []; S.sel = null; S.panneau = null; ed.synchroniser();
    }
    S.vue.cx = vue.cx; S.vue.cy = vue.cy; S.vue.s = vue.s; ed.redessiner();
    return out;
  }, liste);
}
/* les 20 touchers de TOUCHERS (m112), dans la vue d'avant */
const toucher20 = A => toucherSuites(A, TOUCHERS.map(([o, ...q]) => ({o, q})));
/* mêmes points que les points figés fig, posés sur la version ref */
function memesPoints(res, quoi, fig, ref){
  fig = fig || FIGES; ref = ref || 'e9e8b5d';
  const diff = res.map((r, i) => r === fig[i] ? -1 : i).filter(i => i >= 0);
  R.ok(res.length === 20 && fig.length === 20 && !diff.length, 'd : ' + quoi + ' : ' + res.length + ' touchers, mêmes points que sur ' + ref
    + (diff.length ? ' ; différents : ' + diff.map(i => '#' + (i + 1) + ' ' + JSON.stringify(res[i]) + ' (attendu ' + JSON.stringify(fig[i]) + ')').join(' | ') : ''));
}

/* d : nouveaux accrochages décochés d'origine ; Réglages de l'éditeur ; anciens réglages de l'application ; 20 touchers inchangés */
async function defauts(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'd')) return;
    const v0 = await p.evaluate(() => ({def: Object.assign({}, window.VCroquis.AIDES_DEFAUT), lib: window.VCroquis.AIDES_LIB, ed: Object.assign({}, window.__vcEd.etat.aides)}));
    R.ok(NOUVEAUX.every(k => v0.def[k] === false && v0.ed[k] === false), 'd : AIDES_DEFAUT et S.aides d\'un croquis neuf : '
      + NOUVEAUX.map(k => k + ' ' + v0.def[k] + ' / ' + v0.ed[k]).join(', ') + ' (attendu false)');
    const libs = NOUVEAUX.map(k => v0.lib.find(x => x[0] === k) || [k, '', '']);
    R.ok(libs.every(x => x[1] === LIB112[x[0]] && x[2].length > 10), 'd : AIDES_LIB : ' + libs.map(x => JSON.stringify(x[1])).join(', ') + ', chacun avec sa ligne d\'explication');
    /* Réglages de l'éditeur : cases des nouveaux accrochages, décochées ; un toucher en coche une ; à null, décochées, et un toucher les coche */
    const cases = () => p.evaluate(ks => ks.map(k => { const c = document.querySelector('.vc .vc-pcorps [data-a="aide"][data-k="' + k + '"]'); return c ? c.getAttribute('aria-pressed') : 'absente'; }), NOUVEAUX);
    const CASE = k => '.vc .vc-pcorps [data-a="aide"][data-k="' + k + '"]';
    await toucherEl(p, '.vc [data-p="reglages"]');
    const c1 = await cases();
    R.ok(c1.every(x => x === 'false'), 'd : Réglages de l\'éditeur : cases des nouveaux accrochages décochées (' + c1.join(', ') + ')');
    if (c1.every(x => x !== 'absente')){
      await toucherEl(p, CASE('accPerp'));
      const c2 = await cases(), a2 = await aides(p);
      await reglerAides(p, {accPerp: null, accMilieu: null});
      await p.keyboard.press('Escape'); await C.pause(p, 250); await toucherEl(p, '.vc [data-p="reglages"]');
      const c3 = await cases();
      await toucherEl(p, CASE('accMilieu'));
      const a4 = await aides(p), c4 = await cases();
      R.ok(c2[1] === 'true' && a2.ed.accPerp === true && a2.hote.accPerp === true, 'd : Réglages de l\'éditeur : un toucher coche « Perpendiculaire » (case '
        + c2[1] + ', S.aides ' + a2.ed.accPerp + ', application ' + a2.hote.accPerp + ')');
      R.ok(c3.every(x => x === 'false') && a4.ed.accMilieu === true && c4[0] === 'true', 'd : clés à null : cases décochées (' + c3.join(', ')
        + '), un toucher coche « Milieu d\'un côté » (S.aides ' + a4.ed.accMilieu + ', case ' + c4[0] + ')');
      /* m113 : accProl à null, accInter à true : seule « Intersection » est cochée ; un toucher coche « Prolongement d'un côté » */
      await reglerAides(p, {accProl: null, accInter: true});
      await p.keyboard.press('Escape'); await C.pause(p, 250); await toucherEl(p, '.vc [data-p="reglages"]');
      const c5 = await cases();
      await toucherEl(p, CASE('accProl'));
      const a6 = await aides(p), c6 = await cases();
      R.ok(c5[3] === 'false' && c5[4] === 'true' && a6.ed.accProl === true && a6.hote.accProl === true && c6[3] === 'true', 'd : accProl à null, accInter à true : '
        + '« Prolongement d\'un côté » ' + c5[3] + ', « Intersection » ' + c5[4] + ' ; un toucher coche « Prolongement d\'un côté » (S.aides ' + a6.ed.accProl
        + ', application ' + a6.hote.accProl + ', case ' + c6[3] + ')');
    }
    await p.keyboard.press('Escape'); await C.pause(p, 250);
    /* anciens réglages de l'application (sans les nouvelles clés) : l'éditeur rouvert les a fausses, les puces sont décochées */
    await p.evaluate(a => { window.__VT.S.croq.aides = a; }, ANCIENS);
    await rouvrir(p); await vueSur(A, 70, 6);
    await toucherEl(p, BOUTON);
    const a5 = await aides(p), e5 = await etat(p);
    await toucherEl(p, BOUTON);
    R.ok(NOUVEAUX.every(k => a5.ed[k] === false && puce(e5, k).on === 'false'), 'd : anciens réglages de l\'application : l\'éditeur rouvert a '
      + NOUVEAUX.map(k => k + ' ' + a5.ed[k] + ' (puce ' + (puce(e5, k).on || 'absente') + ')').join(', '));
    /* 20 touchers de m112 et 20 de m113 : clés fausses (éditeur rouvert), retirées, puis à null */
    memesPoints(await toucher20(A), 'clés fausses');
    memesPoints(await toucherSuites(A, TOUCHERS113), 'clés fausses, près des prolongements et des rencontres', FIGES113, '4691c1a');
    await reglerAides(p, {}, NOUVEAUX);
    memesPoints(await toucher20(A), 'clés retirées (anciens réglages)');
    memesPoints(await toucherSuites(A, TOUCHERS113), 'clés retirées, près des prolongements et des rencontres', FIGES113, '4691c1a');
    await reglerAides(p, {accMilieu: null, accPerp: null, accParcelle: null, accProl: null, accInter: null});
    memesPoints(await toucher20(A), 'clés à null');
    memesPoints(await toucherSuites(A, TOUCHERS113), 'clés à null, près des prolongements et des rencontres', FIGES113, '4691c1a');
    erreurs(A, 'd');
  } finally { await A.fermer(); }
}

/* mi, pp et ai : « Milieu d'un côté » et « Perpendiculaire » sur la façade sud du bâti de la démonstration (u 65,5 à 74,5, v = 4) ;
   aimant coupé */
async function milieuPerp(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'mi')) return;
    const v0 = await p.evaluate(() => window.VCroquis.AIDES_DEFAUT.accMilieu);
    if (!R.ok(v0 === false, 'mi : clé accMilieu dans AIDES_DEFAUT, à false (' + v0 + ')')) return;
    const sud = cote(A, await cotesRef(p, 'bati'), [65.5, 4], [74.5, 4]);
    if (!R.ok(!!sud, 'mi : témoin : la façade sud du bâti de la démonstration est une ligne de référence du bâti')) return;
    const M = milieuDe(sud), d8 = 0.2 / Math.SQRT2, d20 = 0.5 / Math.SQRT2, debut = A.plan(62, 1.5), q8 = A.plan(70 + d8, 4 - d8);
    await espionner(p);
    await toucherEl(p, BOUTON); await toucherEl(p, PUCE('accMilieu'));
    const a1 = await aides(p), e1 = await etat(p);
    await toucherEl(p, BOUTON);
    R.ok(a1.ed.accMilieu === true && a1.hote.accMilieu === true && puce(e1, 'accMilieu').on === 'true',
      'mi : puce « Milieu d\'un côté » cochée : S.aides.accMilieu ' + a1.ed.accMilieu + ', application ' + a1.hote.accMilieu + ', puce ' + puce(e1, 'accMilieu').on);
    /* trait de complément commencé loin, fini à 8 px du milieu de la façade sud (en biais, dehors) */
    await plan112(A, LIM); await toucherPt(p, debut, 600);
    const sM = await C.ecranCv(p, M.x, M.y); await lireEspion(p);
    const s8 = await toucherPt(p, q8, 250), r8 = await dernier(p), E8 = await lireEspion(p);
    R.ok(r8.n === 2 && proche(r8.q, M) && r8.q.aide === 'milieu', 'mi : fin touchée à ' + px(s8, sM) + ' du milieu de la façade : point au milieu (écart ' + ecart(r8.q, M) + ', ' + genre(r8) + ')');
    R.ok(!!r8.vue && r8.vue.type === 'milieu' && ecrit(E8, 'Milieu', sM), 'mi : repère « Milieu » (repère ' + (r8.vue ? r8.vue.type : 'aucun') + ', libellé '
      + (ecrit(E8, 'Milieu', sM) ? 'écrit' : 'absent') + ')');
    /* témoin : fin touchée à 20 px du milieu */
    await plan112(A, LIM); await toucherPt(p, debut, 600);
    const s20 = await toucherPt(p, A.plan(70 + d20, 4 - d20), 250), r20 = await dernier(p);
    R.ok(r20.n === 2 && !!r20.q && dist(r20.q, M) > 0.3 && r20.q.aide !== 'milieu', 'mi : témoin : fin touchée à ' + px(s20, sM) + ' du milieu : pas de milieu ('
      + (r20.q ? dist(r20.q, M).toFixed(3) + ' m du milieu, ' : '') + genre(r20) + ')');
    /* pp : « Perpendiculaire » seule ; trait commencé en (68 ; 1), fin touchée à 6 px du pied sur la façade sud, vers le point précédent */
    await reglerAides(p, {accMilieu: false, accPerp: true});
    await plan112(A, LIM); await toucherPt(p, A.plan(68, 1), 600);
    const pr = (await dernier(p)).q || A.plan(68, 1), F = piedSur(pr, sud), u = {x: (pr.x - F.x) / dist(pr, F), y: (pr.y - F.y) / dist(pr, F)};
    const sF = await C.ecranCv(p, F.x, F.y), sP = await C.ecranCv(p, pr.x, pr.y); await lireEspion(p);
    const s6 = await toucherPt(p, {x: F.x + 0.15 * u.x, y: F.y + 0.15 * u.y}, 250), r6 = await dernier(p), E6 = await lireEspion(p);
    R.ok(r6.n === 2 && proche(r6.q, F) && r6.q.aide === 'perp', 'pp : fin touchée à ' + px(s6, sF) + ' du pied de la perpendiculaire : point au pied (écart ' + ecart(r6.q, F) + ', ' + genre(r6) + ')');
    const pres = (q, s) => Math.hypot(q[0] - s.x, q[1] - s.y) < 1;
    const tirets = E6.traits.some(t => t.tirets && t.pts.length === 2 && ((pres(t.pts[0], sP) && pres(t.pts[1], sF)) || (pres(t.pts[0], sF) && pres(t.pts[1], sP))));
    const carre = E6.traits.some(t => {
      if (t.tirets || t.pts.length !== 3) return false;
      const [a, b, c] = t.pts, ab = [a[0] - b[0], a[1] - b[1]], cb = [c[0] - b[0], c[1] - b[1]], la = Math.hypot(ab[0], ab[1]), lc = Math.hypot(cb[0], cb[1]);
      return t.pts.every(q => { const d = Math.hypot(q[0] - sF.x, q[1] - sF.y); return d > 3 && d < 16; }) && la > 3 && lc > 3 && Math.abs(ab[0] * cb[0] + ab[1] * cb[1]) < 1e-6 * la * lc;
    });
    const lp = ecrit(E6, 'Perpendiculaire', sF);
    R.ok(!!r6.vue && r6.vue.type === 'perp' && proche(r6.vue.de, pr) && tirets && carre && lp, 'pp : repère : tirets du point précédent au pied (' + (tirets ? 'oui' : 'non')
      + '), petit carré d\'angle droit (' + (carre ? 'oui' : 'non') + '), « Perpendiculaire » (' + (lp ? 'oui' : 'non') + ' ; repère ' + (r6.vue ? r6.vue.type : 'aucun') + ')');
    /* sans point précédent : premier point d'un trait touché près du pied : pas de pied (la façade, à 4 px, l'attire comme avant) */
    await plan112(A, LIM);
    await toucherPt(p, A.plan(68.1, 3.9), 250);
    const r7 = await dernier(p);
    R.ok(r7.n === 1 && !!r7.q && r7.q.aide !== 'perp' && dist(r7.q, F) > 0.05, 'pp : premier point d\'un trait (pas de point précédent), touché près du pied : pas de pied ('
      + (r7.q ? dist(r7.q, F).toFixed(3) + ' m du pied, ' : '') + genre(r7) + ')');
    /* ai : aimant coupé, les trois clés cochées : ni milieu, ni pied, ni coin de limite */
    const lims = await cotesRef(p, 'limite'), cs = cote(A, lims, [64, 0], [76, 0]), K = cs ? [cs.a, cs.b].find(q => dist(q, A.plan(64, 0)) < .01) : A.plan(64, 0);
    await reglerAides(p, {accMilieu: true, accPerp: true, accParcelle: true});
    await toucherEl(p, BOUTON); await toucherEl(p, '.vc .vc-nav .vc-aimant'); await toucherEl(p, BOUTON);
    const a9 = await aides(p);
    await plan112(A, LIM); await toucherPt(p, debut, 600); await toucherPt(p, q8, 250);
    const i1 = await dernier(p);
    await plan112(A, LIM); await toucherPt(p, pr, 600); await toucherPt(p, {x: F.x + 0.15 * u.x, y: F.y + 0.15 * u.y}, 250);
    const i2 = await dernier(p);
    await plan112(A, LIM); await toucherPt(p, A.plan(63.8, 0.2), 250);
    const i3 = await dernier(p);
    R.ok(a9.ed.actives === false && !!i1.q && dist(i1.q, M) > 0.1 && !i1.q.aide && !!i2.q && dist(i2.q, F) > 0.1 && !i2.q.aide && !!i3.q && dist(i3.q, K) > 0.2 && !i3.q.aide,
      'ai : aimant coupé (' + a9.ed.actives + '), les trois clés cochées : ni milieu (' + (i1.q ? dist(i1.q, M).toFixed(3) : '?') + ' m), ni pied (' + (i2.q ? dist(i2.q, F).toFixed(3) : '?')
      + ' m), ni coin de limite (' + (i3.q ? dist(i3.q, K).toFixed(3) : '?') + ' m)');
    /* témoin : aimant rétabli, le milieu attire de nouveau */
    await toucherEl(p, BOUTON); await toucherEl(p, '.vc .vc-nav .vc-aimant'); await toucherEl(p, BOUTON);
    await plan112(A, LIM); await toucherPt(p, debut, 600); await toucherPt(p, q8, 250);
    const i4 = await dernier(p);
    R.ok(!!i4.q && proche(i4.q, M) && i4.q.aide === 'milieu', 'ai : témoin : aimant rétabli, la fin touchée près du milieu y va de nouveau (' + genre(i4) + ', écart ' + ecart(i4.q, M) + ')');
    erreurs(A, 'mi');
  } finally { await A.fermer(); }
}

/* li et es : limites de parcelle (parcelle du bâti de la démonstration : u 64 à 76, v 0 à 34) ; escalier jamais cible */
async function limites(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'li')) return;
    const v0 = await p.evaluate(() => window.VCroquis.AIDES_DEFAUT.accParcelle);
    if (!R.ok(v0 === false, 'li : clé accParcelle dans AIDES_DEFAUT, à false (' + v0 + ')')) return;
    const L = await cotesRef(p, 'limite'), cs = cote(A, L, [64, 0], [76, 0]), cw = cote(A, L, [64, 0], [64, 34]);
    if (!R.ok(!!cs && !!cw, 'li : témoin : les côtés sud et ouest de la parcelle du bâti sont des limites de parcelle')) return;
    const K = [cs.a, cs.b].find(q => dist(q, A.plan(64, 0)) < .01), Ms = milieuDe(cs);
    const premier = async (u, v) => { await plan112(A, LIM); await toucherPt(p, A.plan(u, v), 250); return dernier(p); };
    /* clé décochée (d'origine) : la limite n'attire rien */
    const k0 = await premier(63.8, 0.2), c0 = await premier(64.1, 1.5);
    R.ok(k0.n === 1 && dist(k0.q, K) > 0.2 && !k0.q.aide && c0.n === 1 && horsDroite(c0.q, cw) > 0.05 && !c0.q.aide,
      'li : « Limites de parcelle » décochée : ni le coin (' + (k0.q ? dist(k0.q, K).toFixed(3) : '?') + ' m) ni le côté de limite (' + horsDroite(c0.q, cw).toFixed(3) + ' m) n\'attirent ('
      + genre(k0) + ', ' + genre(c0) + ')');
    /* clé cochée dans la palette */
    await espionner(p);
    await toucherEl(p, BOUTON); await toucherEl(p, PUCE('accParcelle')); await toucherEl(p, BOUTON);
    const a1 = await aides(p), sK = await C.ecranCv(p, K.x, K.y);
    await lireEspion(p);
    const k1 = await premier(63.8, 0.2), E1 = await lireEspion(p);
    R.ok(a1.ed.accParcelle === true && a1.hote.accParcelle === true && k1.n === 1 && proche(k1.q, K) && k1.q.aide === 'parcelle',
      'li : « Limites de parcelle » cochée (S.aides ' + a1.ed.accParcelle + ', application ' + a1.hote.accParcelle + ') : premier point touché à 11 px du coin de limite : au coin (écart '
      + ecart(k1.q, K) + ', ' + genre(k1) + ')');
    R.ok(!!k1.vue && k1.vue.type === 'parcelle' && ecrit(E1, 'Limite', sK), 'li : repère « Limite » (repère ' + (k1.vue ? k1.vue.type : 'aucun') + ', libellé ' + (ecrit(E1, 'Limite', sK) ? 'écrit' : 'absent') + ')');
    const c1 = await premier(64.1, 1.5);
    R.ok(c1.n === 1 && horsDroite(c1.q, cw) < 1e-9 && c1.q.aide === 'parcelle', 'li : premier point touché à 4 px du côté de limite : sur le côté (à ' + horsDroite(c1.q, cw).toExponential(1) + ' m, ' + genre(c1) + ')');
    /* « Accroche au bâti » décochée : la limite attire toujours (sa propre clé) [p] */
    await reglerAides(p, {bati: false});
    const k2 = await premier(63.8, 0.2);
    await reglerAides(p, {bati: true});
    R.ok(k2.n === 1 && proche(k2.q, K) && k2.q.aide === 'parcelle', 'li : « Accroche au bâti » décochée : le coin de limite attire toujours (' + genre(k2) + ', écart ' + ecart(k2.q, K) + ')');
    /* milieu du côté sud de la limite (70 ; 0) : avec « Milieu d'un côté » et « Limites de parcelle » ; témoin : « Limites de parcelle » décochée */
    await reglerAides(p, {accMilieu: true});
    const m1 = await premier(70.15, 0.15);
    await reglerAides(p, {accParcelle: false});
    const m2 = await premier(70.15, 0.15);
    R.ok(m1.n === 1 && proche(m1.q, Ms) && m1.q.aide === 'milieu' && m2.n === 1 && dist(m2.q, Ms) > 0.15 && !m2.q.aide,
      'li : milieu du côté de limite : attire avec « Limites de parcelle » (' + genre(m1) + ', écart ' + ecart(m1.q, Ms) + '), pas sans elle (' + genre(m2) + ', '
      + (m2.q ? dist(m2.q, Ms).toFixed(3) : '?') + ' m)');
    /* es : escalier de (60 ; 1) à (63 ; 1), 1 m de large à gauche (contour jusqu'à v = 2) ; toutes les clés cochées : ni le milieu ni le pied
       de sa ligne départ-fin, ni un coin de son contour n'attirent */
    await reglerAides(p, {accMilieu: true, accPerp: true, accParcelle: true, bati: true});
    const D = A.plan(60, 1), Fe = A.plan(63, 1), lg = dist(D, Fe), nE = {x: -(Fe.y - D.y) / lg, y: (Fe.x - D.x) / lg};
    const esc = {id: 'E', k: 'ln', t: 'esc', v: [{x: D.x, y: D.y, a: null}, {x: Fe.x, y: Fe.y, a: null}], p: {larg: '1,00', n: '4', cote: 'g', monte: 'fin', st: 'existant'}, lab: null};
    const mE = {x: (D.x + Fe.x) / 2, y: (D.y + Fe.y) / 2}, cE = {x: Fe.x + nE.x, y: Fe.y + nE.y}, pE = A.plan(61.55, 1);
    await plan112(A, LIM, [esc]); await toucherPt(p, A.plan(61.5, 1.15), 250);
    const x1 = await dernier(p);
    await plan112(A, LIM, [esc]); await toucherPt(p, A.plan(63.1, 2.1), 250);
    const x2 = await dernier(p);
    await plan112(A, LIM, [esc]); await toucherPt(p, A.plan(61.55, 2.6), 600); await toucherPt(p, A.plan(61.55, 1.15), 250);
    const x3 = await dernier(p);
    R.ok(x1.n === 1 && !!x1.q && !x1.q.aide && dist(x1.q, mE) > 0.1 && x2.n === 1 && !!x2.q && !x2.q.aide && dist(x2.q, cE) > 0.1 && x3.n === 2 && !!x3.q && x3.q.aide !== 'perp' && dist(x3.q, pE) > 0.1,
      'es : escalier, toutes les clés cochées : ni le milieu de sa ligne départ-fin (' + (x1.q ? dist(x1.q, mE).toFixed(3) : '?') + ' m, ' + genre(x1) + '), ni un coin de son contour ('
      + (x2.q ? dist(x2.q, cE).toFixed(3) : '?') + ' m, ' + genre(x2) + '), ni le pied sur sa ligne (' + (x3.q ? dist(x3.q, pE).toFixed(3) : '?') + ' m, ' + genre(x3) + ') n\'attirent');
    erreurs(A, 'li');
  } finally { await A.fermer(); }
}

/* tr : points de tronçon (outil Tronçon) et sommet de tronçon glissé */
async function troncon(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'tr')) return;
    const v0 = await p.evaluate(() => window.VCroquis.AIDES_DEFAUT.accMilieu);
    if (!R.ok(v0 === false, 'tr : clé accMilieu dans AIDES_DEFAUT, à false (' + v0 + ')')) return;
    const sud = cote(A, await cotesRef(p, 'bati'), [65.5, 4], [74.5, 4]), L = await cotesRef(p, 'limite'), cs = cote(A, L, [64, 0], [76, 0]);
    if (!R.ok(!!sud && !!cs, 'tr : témoin : façade sud du bâti et côté sud de sa parcelle trouvés')) return;
    const M = milieuDe(sud), K = [cs.a, cs.b].find(q => dist(q, A.plan(64, 0)) < .01), d8 = 0.2 / Math.SQRT2, q8 = A.plan(70 + d8, 4 - d8);
    /* premier point d'un tronçon touché à 8 px du milieu de la façade sud ; témoin : clé décochée */
    await reglerAides(p, {accMilieu: true});
    await plan112(A, TRONCON); await toucherPt(p, q8, 250);
    const r1 = await dernier(p);
    await reglerAides(p, {accMilieu: false});
    await plan112(A, TRONCON); await toucherPt(p, q8, 250);
    const r0 = await dernier(p);
    R.ok(r1.n === 1 && proche(r1.q, M) && r1.q.aide === 'milieu' && !!r1.vue && r1.vue.type === 'milieu' && r0.n === 1 && dist(r0.q, M) > 0.1 && !r0.q.aide,
      'tr : « Milieu d\'un côté » cochée : premier point d\'un tronçon touché à 8 px du milieu de la façade : au milieu (écart ' + ecart(r1.q, M) + ', ' + genre(r1)
      + ') ; témoin, clé décochée : sous le doigt (' + (r0.q ? dist(r0.q, M).toFixed(3) : '?') + ' m, ' + genre(r0) + ')');
    /* « Limites de parcelle » cochée : un point de tronçon près d'un coin de limite reste sous le doigt (ni coin ni côté pour un tronçon) */
    await reglerAides(p, {accParcelle: true});
    await plan112(A, TRONCON); await toucherPt(p, A.plan(63.8, 0.2), 250);
    const r2 = await dernier(p);
    await reglerAides(p, {accParcelle: false});
    R.ok(r2.n === 1 && !!r2.q && dist(r2.q, K) > 0.2 && !r2.q.aide, 'tr : « Limites de parcelle » cochée : un point de tronçon près d\'un coin de limite reste sous le doigt ('
      + (r2.q ? dist(r2.q, K).toFixed(3) : '?') + ' m du coin, ' + genre(r2) + ')');
    /* regard (70 ; 3,7), sous le milieu ; tronçon commencé en (66 ; 1), fin touchée en (70 ; 3,85), à 6 px du regard et du milieu */
    await reglerAides(p, {accMilieu: true});
    const rg = A.plan(70, 3.7);
    await plan112(A, TRONCON, [C.P('R', 'regard', rg.x, rg.y)]);
    await toucherPt(p, A.plan(66, 1), 600); await toucherPt(p, A.plan(70, 3.85), 600);
    if ((await dernier(p)).n){ await p.evaluate(() => window.__vcEd.terminerTrace()); await C.pause(p, 300); }
    const t3 = (await C.docCroquis(p)).el.find(e => e.k === 'ln' && e.t === 'tr');
    R.ok(!!t3 && t3.v.length === 2 && t3.v[1].a === 'R' && proche(t3.v[1], rg, 1e-6), 'tr : fin touchée à 6 px d\'un regard posé sous le milieu : raccordée au regard, le réseau passe avant ('
      + (t3 ? t3.v.map(w => w.a || 'libre').join(' → ') + (t3.v[1] ? ', ' + dist(t3.v[1], rg).toFixed(3) + ' m du regard' : '') : 'aucun tronçon') + ')');
    /* sommet d'un tronçon (66 ; 1) → (68 ; 2), choisi, glissé jusqu'à 8 px du milieu : au milieu ; témoin, clé décochée : sous le doigt */
    const glisse = async () => {
      const a = A.plan(66, 1), b = A.plan(68, 2);
      await plan112(A, null, [C.L('T', 'tr', [[a.x, a.y], [b.x, b.y]], {}, {})]);
      const d = await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; ed.choisirOutil({k: 'main'}); S.sel = {id: 'T'}; ed.synchroniser();
        const w = S.doc.el.find(e => e.id === 'T').v[1], e = S.vue.ecran(w.x, w.y); return {x: Math.round(e.x), y: Math.round(e.y)}; });
      await C.pause(p, 200);
      const f = await C.ecranCv(p, q8.x, q8.y);
      await C.glisserDoigtCv(p, d, {x: Math.round(f.x), y: Math.round(f.y)}, 400);
      const l = (await C.docCroquis(p)).el.find(e => e.id === 'T');
      return l && l.v[1];
    };
    const g1 = await glisse();
    await reglerAides(p, {accMilieu: false});
    const g2 = await glisse();
    R.ok(!!g1 && proche(g1, M) && !!g2 && dist(g2, M) > 0.1, 'tr : sommet d\'un tronçon glissé à 8 px du milieu : au milieu (écart ' + ecart(g1, M) + ') ; témoin, clé décochée : sous le doigt ('
      + (g2 ? dist(g2, M).toFixed(3) : '?') + ' m du milieu)');
    erreurs(A, 'tr');
  } finally { await A.fermer(); }
}

/* em : sens de la montée d'un escalier (décision D7 : montée vers le bout posé sur une façade) dont un bout est calé par un nouvel
   accrochage. Façade sud du bâti (u 65,5 à 74,5 ; v 4), façade est du bâti voisin à l'ouest (u 62,5 ; v 4 à 14), côté sud de la parcelle
   (u 64 à 76 ; v 0) */
async function escalierMontee(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'em')) return;
    const B = await cotesRef(p, 'bati'), L = await cotesRef(p, 'limite');
    const sud = cote(A, B, [65.5, 4], [74.5, 4]), est = cote(A, B, [62.5, 4], [62.5, 14]), ls = cote(A, L, [64, 0], [76, 0]);
    if (!R.ok(!!sud && !!est && !!ls, 'em : témoin : façade sud du bâti, façade est de son voisin à l\'ouest et côté sud de la parcelle trouvés')) return;
    const M = milieuDe(sud), Me = milieuDe(est), Ml = milieuDe(ls), d8 = 0.2 / Math.SQRT2;
    /* escalier touché au doigt du départ d à la fin f (repère de la démonstration), vue centrée sur c, clés o cochées (les autres nouvelles
       décochées) : départ du brouillon (point et aide), puis escalier créé (sommets et montée) */
    const esc = async (o, d, f, c) => {
      await reglerAides(p, Object.assign({accMilieu: false, accPerp: false, accParcelle: false}, o));
      await plan112(A, ESC); await vueSur(A, c[0], c[1]);
      await toucherPt(p, A.plan(d[0], d[1]), 600);
      const dep = (await dernier(p)).q;
      await toucherPt(p, A.plan(f[0], f[1]), 600);
      const e = (await C.docCroquis(p)).el.filter(x => x.k === 'ln' && x.t === 'esc');
      return {dep, n: e.length, v: e.length === 1 ? e[0].v : [], monte: e.length === 1 && e[0].p ? e[0].p.monte : null};
    };
    const dit = r => 'départ ' + (r.dep ? r.dep.aide || 'libre' : 'absent') + ', montée ' + r.monte + ', ' + r.n + ' escalier';
    /* départ touché dehors à 8 px du milieu de la façade sud, fin au jardin (70 ; 1) : le départ est sur la façade, montée vers lui */
    const a1 = await esc({accMilieu: true}, [70 + d8, 4 - d8], [70, 1], [70, 3]);
    R.ok(a1.n === 1 && !!a1.dep && a1.dep.aide === 'milieu' && proche(a1.dep, M) && a1.monte === 'depart', 'em : « Milieu d\'un côté » cochée : départ calé au milieu de la façade sud, fin au jardin : '
      + 'montée vers le départ (' + dit(a1) + ', départ à ' + ecart(a1.dep, M) + ' du milieu)');
    const a0 = await esc({}, [70 + d8, 4 - d8], [70, 1], [70, 3]);
    R.ok(a0.n === 1 && !!a0.dep && a0.dep.aide === 'facade' && a0.monte === 'depart', 'em : témoin, clés décochées : départ sur la façade, montée vers le départ (' + dit(a0) + ')');
    /* départ sur la façade ouest du bâti, fin touchée à 7 px du milieu de la façade est du voisin (calée sur la façade seule, elle serait à
       0,15 m du milieu) : les deux bouts sont sur le bâti, montée vers la fin */
    const b1 = await esc({accMilieu: true}, [65.4, 4.5], [62.6, 9.15], [64, 7]);
    R.ok(b1.n === 1 && !!b1.dep && b1.dep.aide === 'facade' && proche(b1.v[1], Me) && b1.monte === 'fin', 'em : départ sur une façade, fin calée au milieu de la façade d\'en face : '
      + 'montée vers la fin (' + dit(b1) + ', fin à ' + ecart(b1.v[1], Me) + ' du milieu)');
    /* départ sur la façade ouest, fin touchée à 4 px du pied de la perpendiculaire sur la façade d'en face (« Perpendiculaire » cochée) :
       montée vers la fin */
    const c1 = await esc({accPerp: true}, [65.6, 7.5], [62.6, 7.55], [64, 7]), F = c1.dep ? piedSur(c1.dep, est) : null;
    R.ok(c1.n === 1 && !!c1.dep && c1.dep.aide === 'facade' && proche(c1.v[1], F) && c1.monte === 'fin', 'em : départ sur une façade, fin calée au pied de la perpendiculaire sur la façade '
      + 'd\'en face : montée vers la fin (' + dit(c1) + ', fin à ' + ecart(c1.v[1], F) + ' du pied)');
    /* témoin : départ au milieu du côté sud de la parcelle (« Limites de parcelle » cochée) : une limite n'est pas le bâti, montée vers la fin */
    const d1 = await esc({accMilieu: true, accParcelle: true}, [70.1, 0.1], [70.1, 2.5], [70, 2]);
    R.ok(d1.n === 1 && !!d1.dep && d1.dep.aide === 'milieu' && proche(d1.dep, Ml) && d1.monte === 'fin', 'em : témoin : départ calé au milieu d\'un côté de limite : montée vers la fin ('
      + dit(d1) + ', départ à ' + ecart(d1.dep, Ml) + ' du milieu)');
    erreurs(A, 'em');
  } finally { await A.fermer(); }
}

/* po : ordre des accrochages et chemins secondaires, clés cochées : coin avant milieu ; milieu avant redressement ; sommet d'un trait de
   complément glissé ; descente (objet de mur), qui ne va que sur le bâti */
async function priorites(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'po')) return;
    const B = await cotesRef(p, 'bati'), L = await cotesRef(p, 'limite'), sud = cote(A, B, [65.5, 4], [74.5, 4]), ls = cote(A, L, [64, 0], [76, 0]);
    if (!R.ok(!!sud && !!ls, 'po : témoin : façade sud du bâti et côté sud de sa parcelle trouvés')) return;
    const M = milieuDe(sud), Ml = milieuDe(ls), K = [ls.a, ls.b].find(q => dist(q, A.plan(64, 0)) < .01), d8 = 0.2 / Math.SQRT2, q8 = A.plan(70 + d8, 4 - d8);
    const trait = (id, a, b) => ({id, k: 'ln', t: 'lim', v: [{x: a.x, y: a.y, a: null}, {x: b.x, y: b.y, a: null}], p: {st: 'existant'}, lab: null});
    /* coin avant milieu : trait de complément de 0,6 m (24 px) ; premier point d'un trait touché à 0,12 m de son bout ouest, donc à moins de
       14 px du bout et du milieu : au bout */
    const k0 = A.plan(60, 1), k1 = A.plan(60.6, 1), km = {x: (k0.x + k1.x) / 2, y: (k0.y + k1.y) / 2};
    await reglerAides(p, {accMilieu: true});
    await plan112(A, LIM, [trait('K', k0, k1)]); await vueSur(A, 62, 3);
    const sk = await C.ecranCv(p, k0.x, k0.y), sm = await C.ecranCv(p, km.x, km.y), s1 = await toucherPt(p, A.plan(60.12, 1), 250), r1 = await dernier(p);
    R.ok(dist(s1, sk) < 14 && dist(s1, sm) < 14 && r1.n === 1 && proche(r1.q, k0) && r1.q.aide === 'coin', 'po : coin avant milieu : premier point touché à ' + px(s1, sk)
      + ' du bout d\'un trait de 0,6 m et à ' + px(s1, sm) + ' de son milieu : au bout (' + genre(r1) + ', écart ' + ecart(r1.q, k0) + ')');
    /* milieu avant redressement : trait commencé en (70 ; 1), fin touchée en (70,1 ; 3,9), à 6 px du milieu de la façade sud ; clé
       décochée, le redressement la prend (témoin) ; clé cochée, le milieu l'emporte */
    const fin = async () => { await plan112(A, LIM); await toucherPt(p, A.plan(70, 1), 600); await toucherPt(p, A.plan(70.1, 3.9), 250); return dernier(p); };
    await reglerAides(p, {accMilieu: false});
    const r2 = await fin();
    await reglerAides(p, {accMilieu: true});
    const r3 = await fin();
    R.ok(r2.n === 2 && !!r2.q && (r2.q.aide === 'parallele' || r2.q.aide === 'angle') && dist(r2.q, M) > 0.05 && r3.n === 2 && proche(r3.q, M) && r3.q.aide === 'milieu',
      'po : milieu avant redressement : fin touchée à 6 px du milieu de la façade sud ; clé décochée, redressée (' + genre(r2) + ', ' + (r2.q ? dist(r2.q, M).toFixed(3) : '?')
      + ' m du milieu) ; clé cochée, au milieu (' + genre(r3) + ', écart ' + ecart(r3.q, M) + ')');
    /* sommet d'un trait de complément (66 ; 1) → (68 ; 2), choisi, glissé jusqu'à 8 px du milieu de la façade sud : au milieu ; témoin, clé
       décochée : ailleurs */
    const glisse = async () => {
      const a = A.plan(66, 1), b = A.plan(68, 2);
      await plan112(A, null, [trait('T', a, b)]);
      const d = await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; ed.choisirOutil({k: 'main'}); S.sel = {id: 'T'}; ed.synchroniser();
        const w = S.doc.el.find(e => e.id === 'T').v[1], e = S.vue.ecran(w.x, w.y); return {x: Math.round(e.x), y: Math.round(e.y)}; });
      await C.pause(p, 200);
      const f = await C.ecranCv(p, q8.x, q8.y);
      await C.glisserDoigtCv(p, d, {x: Math.round(f.x), y: Math.round(f.y)}, 400);
      const l = (await C.docCroquis(p)).el.find(e => e.id === 'T');
      return l && l.v[1];
    };
    const g1 = await glisse();
    await reglerAides(p, {accMilieu: false});
    const g2 = await glisse();
    R.ok(!!g1 && proche(g1, M) && !!g2 && dist(g2, M) > 0.1, 'po : sommet d\'un trait de complément glissé à 8 px du milieu de la façade sud : au milieu (écart ' + ecart(g1, M)
      + ') ; témoin, clé décochée : ailleurs (' + (g2 ? dist(g2, M).toFixed(3) : '?') + ' m du milieu)');
    /* descente (objet de mur), toutes les clés cochées : près du milieu de la façade sud → au milieu ; près du coin (64 ; 0) ou du milieu
       du côté sud d'une limite → sous le doigt (un objet de mur ne va que sur le bâti) */
    await reglerAides(p, {accMilieu: true, accPerp: true, accParcelle: true, bati: true});
    const descente = async (u, v) => {
      const q = A.plan(u, v); await plan112(A, DESC); await vueSur(A, 70, 3); await toucherPt(p, q, 700);
      const de = (await C.docCroquis(p)).el.filter(e => e.t === 'descente');
      return {q, o: de.length === 1 ? de[0] : null};
    };
    const o1 = await descente(70.2, 3.8), o2 = await descente(63.8, 0.2), o3 = await descente(70.15, 0.15);
    R.ok(!!o1.o && proche(o1.o, M), 'po : toutes les clés cochées : descente touchée à 11 px du milieu de la façade sud : au milieu (écart ' + ecart(o1.o, M) + ')');
    R.ok(!!o2.o && dist(o2.o, o2.q) < 0.03 && dist(o2.o, K) > 0.2 && !!o3.o && dist(o3.o, o3.q) < 0.03 && dist(o3.o, Ml) > 0.15, 'po : toutes les clés cochées : une descente touchée '
      + 'près du coin d\'une limite (' + (o2.o ? dist(o2.o, K).toFixed(3) + ' m du coin' : 'absente') + ') ou du milieu d\'un côté de limite (' + (o3.o ? dist(o3.o, Ml).toFixed(3)
      + ' m du milieu' : 'absente') + ') reste sous le doigt : un objet de mur ne va que sur le bâti');
    erreurs(A, 'po');
  } finally { await A.fermer(); }
}

/* ---------- m113 : nouveaux accrochages, second lot (Prolongement d'un côté, Intersection) ---------- */
/* Repères du fond (repère de la démonstration) : façade ouest du bâti, u = 65,5, de Ks (65,5 ; 4) à Kn (65,5 ; 14) ; façade sud, v = 4 ;
   bâti léger (59 ; 24)-(62,5 ; 28), son côté sud (v = 24) et son côté ouest (u = 59) ; façade nord du bâti voisin à l'ouest, v = 14, u 51
   à 62,5 ; côté ouest de la parcelle du bâti, u = 64, v 0 à 34. Au nord de v = 34, le fond est vide. Vue à 40 px par mètre : 10 px font
   0,25 m, 14 px 0,35 m. */
/* point de rencontre des droites des côtés c et e ({a, b}, mètres du croquis) ; null s'ils sont parallèles */
const interDe = (c, e) => {
  const r = {x: c.b.x - c.a.x, y: c.b.y - c.a.y}, s = {x: e.b.x - e.a.x, y: e.b.y - e.a.y}, k = r.x * s.y - r.y * s.x;
  if (!k) return null;
  const t = ((e.a.x - c.a.x) * s.y - (e.a.y - c.a.y) * s.x) / k;
  return {x: c.a.x + t * r.x, y: c.a.y + t * r.y};
};
/* trait de complément du point a au point b (mètres du croquis), à injecter ; son côté {a, b} */
const traitDe = (id, a, b) => ({id, k: 'ln', t: 'lim', v: [{x: a.x, y: a.y, a: null}, {x: b.x, y: b.y, a: null}], p: {st: 'existant'}, lab: null});
const segDe = t => ({a: t.v[0], b: t.v[1]});
/* bout du côté c qui est à 1 cm au plus du point (u, v) du repère de la démonstration */
const boutDe = (A, c, u, v) => [c.a, c.b].find(q => dist(q, A.plan(u, v)) < .01) || null;
/* trait en tirets de deux points, entre s et t (pixels du canevas, à 1 px près, dans un sens ou dans l'autre) */
const presDe = (q, s) => Math.hypot(q[0] - s.x, q[1] - s.y) < 1;
const tiretsDe = (E, s, t) => E.traits.some(r => r.tirets && r.pts.length === 2 && ((presDe(r.pts[0], s) && presDe(r.pts[1], t)) || (presDe(r.pts[0], t) && presDe(r.pts[1], s))));
/* point du brouillon resté sous le doigt (aucune aide) ; point au pied, sur la droite du côté c, de la perpendiculaire menée du doigt */
const libre = r => !!r && !!r.q && !r.q.aide && !!r.q.doigt && proche(r.q, r.q.doigt);
const surDroite = (r, c) => !!r && !!r.q && !!r.q.doigt && proche(r.q, piedSur(r.q.doigt, c));
const enPx = d => (d * 40).toFixed(1) + ' px';
/* plan vide (ou les éléments o.els), outil o.outil (trait de complément d'origine), vue centrée sur o.vue ; un premier point touché en
   (u, v) ; rend dernier(), le point touché en pixels du canevas (s) et ce que l'espion a vu (E) */
async function premier113(A, u, v, o){
  o = o || {}; await plan112(A, o.outil || LIM, o.els); if (o.vue) await vueSur(A, o.vue[0], o.vue[1]);
  await lireEspion(A.p);
  const s = await toucherPt(A.p, A.plan(u, v), 250), r = await dernier(A.p);
  r.s = s; r.E = await lireEspion(A.p); return r;
}
/* de même, un trait commencé en d et fini en f */
async function fin113(A, d, f, o){
  o = o || {}; await plan112(A, o.outil || LIM, o.els); if (o.vue) await vueSur(A, o.vue[0], o.vue[1]);
  await toucherPt(A.p, A.plan(d[0], d[1]), 600); await lireEspion(A.p);
  const s = await toucherPt(A.p, A.plan(f[0], f[1]), 250), r = await dernier(A.p);
  r.s = s; r.E = await lireEspion(A.p); return r;
}
/* puce k de la palette touchée (palette ouverte puis fermée) ; rend les aides et l'état de la palette ouverte */
async function basculer(p, k){ await toucherEl(p, BOUTON); await toucherEl(p, PUCE(k)); const a = await aides(p), e = await etat(p); await toucherEl(p, BOUTON); return {a, e}; }
/* aimant touché, palette ouverte puis fermée */
async function aimant(p){ await toucherEl(p, BOUTON); await toucherEl(p, '.vc .vc-nav .vc-aimant'); await toucherEl(p, BOUTON); }
/* plan avec le seul tracé l (id 'T'), outil Choisir, l choisi, vue centrée sur c ; son second sommet glissé au doigt jusqu'au point (u, v) ;
   rend ce sommet */
async function glisserSommet(A, l, u, v, c){
  const p = A.p;
  await plan112(A, null, [l]); await vueSur(A, c[0], c[1]);
  const d = await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; ed.choisirOutil({k: 'main'}); S.sel = {id: 'T'}; ed.synchroniser();
    const w = S.doc.el.find(e => e.id === 'T').v[1], e = S.vue.ecran(w.x, w.y); return {x: Math.round(e.x), y: Math.round(e.y)}; });
  await C.pause(p, 200);
  const q = A.plan(u, v), f = await C.ecranCv(p, q.x, q.y);
  await C.glisserDoigtCv(p, d, {x: Math.round(f.x), y: Math.round(f.y)}, 400);
  const l2 = (await C.docCroquis(p)).el.find(e => e.id === 'T');
  return l2 && l2.v[1];
}

/* pl : « Prolongement d'un côté » (accProl) : droite d'un côté au-delà de ses bouts, jusqu'à 30 m, seuil de la façade (10 px) ; entre les
   bouts, c'est le côté ; une limite avec « Limites de parcelle » seulement ; jamais un escalier ; aimant coupé : rien */
async function prolongement(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'pl')) return;
    const v0 = await p.evaluate(() => window.VCroquis.AIDES_DEFAUT.accProl);
    if (!R.ok(v0 === false, 'pl : clé accProl dans AIDES_DEFAUT, à false (' + v0 + ')')) return;
    const B = await cotesRef(p, 'bati'), L = await cotesRef(p, 'limite'), ouest = cote(A, B, [65.5, 4], [65.5, 14]), sud = cote(A, B, [65.5, 4], [74.5, 4]);
    const lw = cote(A, L, [64, 0], [64, 34]);
    if (!R.ok(!!ouest && !!sud && !!lw, 'pl : témoin : façades ouest et sud du bâti, côté ouest de sa parcelle trouvés')) return;
    const Ks = boutDe(A, ouest, 65.5, 4), Kn = boutDe(A, ouest, 65.5, 14), K0 = boutDe(A, lw, 64, 0);
    await espionner(p);
    /* trait commencé en (66,9 ; -1,6), loin de toute droite ; fin touchée à 6 px de la droite de la façade ouest, 3 m au-delà de Ks. Témoin,
       clé décochée (d'origine) : sous le doigt (ni redressée, ni accrochée) */
    const D0 = [66.9, -1.6], F0 = [65.65, 1];
    const r0 = await fin113(A, D0, F0);
    const b1 = await basculer(p, 'accProl');
    R.ok(b1.a.ed.accProl === true && b1.a.hote.accProl === true && puce(b1.e, 'accProl').on === 'true', 'pl : puce « Prolongement d\'un côté » cochée : S.aides.accProl '
      + b1.a.ed.accProl + ', application ' + b1.a.hote.accProl + ', puce ' + puce(b1.e, 'accProl').on);
    const r1 = await fin113(A, D0, F0), F1 = r1.q && r1.q.doigt ? piedSur(r1.q.doigt, ouest) : null;
    const sF = F1 ? await C.ecranCv(p, F1.x, F1.y) : {x: NaN, y: NaN}, sK = await C.ecranCv(p, Ks.x, Ks.y);
    R.ok(r1.n === 2 && !!F1 && proche(r1.q, F1) && r1.q.aide === 'prol' && horsDroite(r1.q, ouest) < 1e-9 && Math.abs(dist(F1, Ks) - 3) < 0.05,
      'pl : fin touchée à ' + enPx(horsDroite(r1.q && r1.q.doigt, ouest)) + ' de la droite de la façade ouest, ' + (F1 ? dist(F1, Ks).toFixed(2) : '?')
      + ' m au-delà du coin : sur la droite (écart ' + ecart(r1.q, F1) + ', ' + genre(r1) + ')');
    const t1 = tiretsDe(r1.E, sK, sF), l1 = ecrit(r1.E, 'Prolongement', sF);
    R.ok(!!r1.vue && r1.vue.type === 'prol' && !!r1.vue.bouts && r1.vue.bouts.length === 1 && proche(r1.vue.bouts[0], Ks) && t1 && l1, 'pl : repère : tirets du coin au point ('
      + (t1 ? 'oui' : 'non') + '), « Prolongement » (' + (l1 ? 'oui' : 'non') + ' ; repère ' + (r1.vue ? r1.vue.type : 'aucun') + ')');
    R.ok(r0.n === 2 && libre(r0) && horsDroite(r0.q, ouest) > 0.1, 'pl : témoin, clé décochée : la même fin reste sous le doigt (' + genre(r0) + ', '
      + (r0.q ? horsDroite(r0.q, ouest).toFixed(3) : '?') + ' m de la droite)');
    /* jusqu'à 30 m du bout : premier point touché à 6 px de la droite, 29,9 m au-delà de Kn → sur la droite ; témoins : 30,1 m et 40 m → sous
       le doigt */
    const loin = async v => { const r = await premier113(A, 65.65, v, {vue: [66, v]}); r.ext = r.q && r.q.doigt ? dist(piedSur(r.q.doigt, ouest), Kn) : null; return r; };
    const e1 = await loin(43.9), e2 = await loin(44.1), e3 = await loin(54);
    R.ok(e1.n === 1 && !!e1.q && e1.q.aide === 'prol' && surDroite(e1, ouest) && e1.ext < 30 && libre(e2) && e2.ext > 30 && libre(e3) && e3.ext > 39,
      'pl : jusqu\'à 30 m du coin : à ' + m(e1.ext) + ', sur la droite (' + genre(e1) + ') ; à ' + m(e2.ext) + ' (' + genre(e2) + ') et à ' + m(e3.ext) + ' (' + genre(e3) + '), sous le doigt');
    /* seuil de la façade (10 px) : premier point touché à 9 px de la droite, 3 m au-delà de Ks → sur la droite ; à 11 px → sous le doigt */
    const s9 = await premier113(A, 65.725, 1), s11 = await premier113(A, 65.775, 1);
    const dp = r => r.q && r.q.doigt ? horsDroite(r.q.doigt, ouest) * 40 : NaN;
    R.ok(s9.n === 1 && !!s9.q && s9.q.aide === 'prol' && surDroite(s9, ouest) && dp(s9) < 10 && libre(s11) && dp(s11) > 10, 'pl : seuil de la façade : à ' + dp(s9).toFixed(1)
      + ' px de la droite, sur la droite (' + genre(s9) + ') ; à ' + dp(s11).toFixed(1) + ' px, sous le doigt (' + genre(s11) + ')');
    /* entre les bouts, c'est le côté : premier point touché dans le bâti, à 6 px de la façade sud : « façade », comme clé décochée ;
       « Accroche au bâti » décochée : sous le doigt (le prolongement de la façade sud du voisin, alignée sur elle, ne le prend pas) */
    const c1 = await premier113(A, 67.5, 4.15);
    await reglerAides(p, {bati: false}); const c2 = await premier113(A, 67.5, 4.15);
    await reglerAides(p, {bati: true, accProl: false}); const c0 = await premier113(A, 67.5, 4.15); await reglerAides(p, {accProl: true});
    R.ok(c1.n === 1 && !!c1.q && c1.q.aide === 'facade' && !!c0.q && c0.q.aide === 'facade' && proche(c1.q, c0.q) && horsDroite(c1.q, sud) < 1e-9 && libre(c2),
      'pl : entre les bouts, c\'est le côté : ' + genre(c1) + ' (clé décochée : ' + genre(c0) + ') ; « Accroche au bâti » décochée : sous le doigt (' + genre(c2) + ')');
    /* un côté qui croise la droite n'empêche pas le prolongement : premier point touché en (59,1 ; 14,15), à 4 px du prolongement du côté
       ouest du bâti léger (9,85 m au-delà de son coin (59 ; 24)) et à 6 px de la façade nord du voisin, qui croise cette droite en (59 ; 14) ;
       « Intersection » décochée. Sur la droite, tirets depuis (59 ; 24) : trait, « Accroche au bâti » cochée (le prolongement passe avant
       la façade) ou décochée, et tronçon. Témoins, clé décochée : la façade pour le trait (bâti coché), sous le doigt sinon */
    const o7 = cote(A, B, [59, 24], [59, 28]), H7 = o7 ? boutDe(A, o7, 59, 24) : null;
    if (!R.ok(!!o7 && !!H7, 'pl : témoin : côté ouest du bâti léger et son coin (59 ; 24) trouvés')) return;
    const croise = async (o, outil) => {
      await reglerAides(p, o); const r = await premier113(A, 59.1, 14.15, {outil, vue: [60, 16]});
      r.sF = r.q ? await C.ecranCv(p, r.q.x, r.q.y) : {x: NaN, y: NaN}; r.sH = await C.ecranCv(p, H7.x, H7.y); return r;
    };
    const vaSur = r => r.n === 1 && !!r.q && r.q.aide === 'prol' && surDroite(r, o7) && horsDroite(r.q, o7) < 1e-9 && !!r.vue && r.vue.type === 'prol' && !!r.vue.bouts
      && r.vue.bouts.length === 1 && proche(r.vue.bouts[0], H7) && tiretsDe(r.E, r.sH, r.sF);
    const k1 = await croise({accProl: true, accInter: false, bati: true}), k2 = await croise({bati: false}), k3 = await croise({bati: true}, TRONCON);
    const k0 = await croise({accProl: false, bati: true}), k4 = await croise({bati: false}), k5 = await croise({bati: true}, TRONCON);
    await reglerAides(p, {accProl: true, bati: true});
    R.ok(vaSur(k1) && ecrit(k1.E, 'Prolongement', k1.sF) && vaSur(k2) && vaSur(k3), 'pl : un côté croise la droite à 6 px du point : sur la droite, tirets depuis le coin '
      + '(59 ; 24) : trait (' + genre(k1) + ', ' + (k1.q ? horsDroite(k1.q, o7).toExponential(1) : '?') + ' m de la droite), « Accroche au bâti » décochée (' + genre(k2)
      + ') et tronçon (' + genre(k3) + ')');
    R.ok(!!k0.q && k0.q.aide === 'facade' && libre(k4) && libre(k5), 'pl : témoins, clé décochée : la façade pour le trait (' + genre(k0) + '), sous le doigt « Accroche au bâti » '
      + 'décochée (' + genre(k4) + ') et pour le tronçon (' + genre(k5) + ')');
    /* limite : premier point touché à 4 px du prolongement du côté ouest de la parcelle (u = 64), 3 m au-delà de son coin (64 ; 0) : sous
       le doigt sans « Limites de parcelle » ; avec elle, sur la droite, tirets depuis le coin de limite */
    const l0 = await premier113(A, 64.1, -3, {vue: [66, -2]});
    await reglerAides(p, {accParcelle: true}); const lp = await premier113(A, 64.1, -3, {vue: [66, -2]}); await reglerAides(p, {accParcelle: false});
    R.ok(libre(l0) && lp.n === 1 && !!lp.q && lp.q.aide === 'prol' && surDroite(lp, lw) && !!lp.vue && !!lp.vue.bouts && proche(lp.vue.bouts[0], K0),
      'pl : prolongement d\'un côté de limite : seulement avec « Limites de parcelle » (sans : ' + genre(l0) + ' ; avec : ' + genre(lp) + ', '
      + (lp.q ? horsDroite(lp.q, lw).toExponential(1) : '?') + ' m de la droite)');
    /* un escalier n'est jamais cible : escalier de (60 ; 1) à (63 ; 1) ; premier point touché 1,5 m au-delà de sa fin, à 4 px de sa droite :
       sous le doigt ; témoin : un trait de complément à sa place, le point va sur son prolongement */
    const D = A.plan(60, 1), Fe = A.plan(63, 1);
    const esc = {id: 'E', k: 'ln', t: 'esc', v: [{x: D.x, y: D.y, a: null}, {x: Fe.x, y: Fe.y, a: null}], p: {larg: '1,00', n: '4', cote: 'g', monte: 'fin', st: 'existant'}, lab: null};
    const x1 = await premier113(A, 64.5, 1.1, {els: [esc], vue: [64, 2]}), x2 = await premier113(A, 64.5, 1.1, {els: [traitDe('T', D, Fe)], vue: [64, 2]});
    R.ok(libre(x1) && x2.n === 1 && !!x2.q && x2.q.aide === 'prol' && surDroite(x2, {a: D, b: Fe}), 'pl : un escalier n\'est pas cible : sous le doigt (' + genre(x1)
      + ') ; témoin, un trait de complément à sa place : sur son prolongement (' + genre(x2) + ')');
    /* aimant coupé, « Prolongement d'un côté » et « Intersection » cochées : ni prolongement, ni rencontre (65,5 ; 24) de deux prolongements ;
       témoin : aimant rétabli, l'un et l'autre attirent de nouveau */
    await reglerAides(p, {accInter: true});
    await aimant(p); const a9 = await aides(p);
    const i1 = await fin113(A, D0, F0), i2 = await premier113(A, 65.6, 24.1, {vue: [64, 22]});
    await aimant(p);
    const i3 = await fin113(A, D0, F0), i4 = await premier113(A, 65.6, 24.1, {vue: [64, 22]});
    R.ok(a9.ed.actives === false && libre(i1) && libre(i2), 'pl : aimant coupé (' + a9.ed.actives + '), les deux clés cochées : ni prolongement (' + genre(i1) + '), ni rencontre ('
      + genre(i2) + ')');
    R.ok(!!i3.q && i3.q.aide === 'prol' && !!i4.q && i4.q.aide === 'inter', 'pl : témoin : aimant rétabli, le prolongement (' + genre(i3) + ') et la rencontre (' + genre(i4)
      + ') attirent de nouveau');
    erreurs(A, 'pl');
  } finally { await A.fermer(); }
}

/* ix : « Intersection » (accInter) : rencontre de deux côtés ou de leurs prolongements (30 m au plus), qui font plus de 5° ; seuil du coin
   (14 px) ; un coin existant reste un coin */
async function intersection(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'ix')) return;
    const v0 = await p.evaluate(() => window.VCroquis.AIDES_DEFAUT.accInter);
    if (!R.ok(v0 === false, 'ix : clé accInter dans AIDES_DEFAUT, à false (' + v0 + ')')) return;
    const B = await cotesRef(p, 'bati'), ouest = cote(A, B, [65.5, 4], [65.5, 14]), s7 = cote(A, B, [59, 24], [62.5, 24]), o7 = cote(A, B, [59, 24], [59, 28]);
    const nv = cote(A, B, [51, 14], [62.5, 14]);
    if (!R.ok(!!ouest && !!s7 && !!o7 && !!nv, 'ix : témoin : façade ouest du bâti, côtés sud et ouest du bâti léger, façade nord du voisin trouvés')) return;
    const X = interDe(ouest, s7), Kn = boutDe(A, ouest, 65.5, 14), B7 = boutDe(A, s7, 62.5, 24), Y = interDe(nv, o7), H7 = boutDe(A, o7, 59, 24), Ks = boutDe(A, ouest, 65.5, 4);
    await espionner(p);
    /* deux façades de bâtiments distincts, dont les prolongements se rencontrent dehors en (65,5 ; 24), 10 m au-delà de Kn et 3 m au-delà du
       coin (62,5 ; 24) du bâti léger : premier point touché à 6 px de la rencontre ; témoin, clé décochée : sous le doigt */
    const r0 = await premier113(A, 65.6, 24.1, {vue: [64, 22]});
    const b1 = await basculer(p, 'accInter');
    R.ok(b1.a.ed.accInter === true && b1.a.hote.accInter === true && puce(b1.e, 'accInter').on === 'true', 'ix : puce « Intersection » cochée : S.aides.accInter '
      + b1.a.ed.accInter + ', application ' + b1.a.hote.accInter + ', puce ' + puce(b1.e, 'accInter').on);
    const r1 = await premier113(A, 65.6, 24.1, {vue: [64, 22]}), sX = await C.ecranCv(p, X.x, X.y), sKn = await C.ecranCv(p, Kn.x, Kn.y), sB7 = await C.ecranCv(p, B7.x, B7.y);
    R.ok(r1.n === 1 && proche(r1.q, X) && r1.q.aide === 'inter', 'ix : premier point touché à ' + (r1.q && r1.q.doigt ? enPx(dist(r1.q.doigt, X)) : '?')
      + ' de la rencontre des prolongements de deux façades : à la rencontre (écart ' + ecart(r1.q, X) + ', ' + genre(r1) + ')');
    const bo = r1.vue && r1.vue.bouts || [], t1 = tiretsDe(r1.E, sKn, sX), t2 = tiretsDe(r1.E, sB7, sX), l1 = ecrit(r1.E, 'Intersection', sX);
    R.ok(!!r1.vue && r1.vue.type === 'inter' && bo.length === 2 && bo.some(q => proche(q, Kn)) && bo.some(q => proche(q, B7)) && t1 && t2 && l1, 'ix : repère : tirets depuis le coin '
      + 'de la façade (' + (t1 ? 'oui' : 'non') + ') et depuis celui du bâti léger (' + (t2 ? 'oui' : 'non') + '), « Intersection » (' + (l1 ? 'oui' : 'non') + ' ; repère '
      + (r1.vue ? r1.vue.type : 'aucun') + ')');
    R.ok(libre(r0), 'ix : témoin, clé décochée : le même point reste sous le doigt (' + genre(r0) + ')');
    /* sur une façade : premier point touché à 6 px de la rencontre (59 ; 14) du prolongement du côté ouest du bâti léger (10 m au-delà de son
       coin (59 ; 24)) et de la façade nord du voisin, à 4 px de celle-ci : à la rencontre, tirets depuis ce seul coin ; témoin, clé décochée :
       au pied, sur la façade */
    const f1 = await premier113(A, 59.1, 14.1, {vue: [60, 16]});
    await reglerAides(p, {accInter: false}); const f0 = await premier113(A, 59.1, 14.1, {vue: [60, 16]}); await reglerAides(p, {accInter: true});
    const sY = await C.ecranCv(p, Y.x, Y.y), sH = await C.ecranCv(p, H7.x, H7.y);
    R.ok(f1.n === 1 && proche(f1.q, Y) && f1.q.aide === 'inter' && !!f1.vue && !!f1.vue.bouts && f1.vue.bouts.length === 1 && proche(f1.vue.bouts[0], H7) && tiretsDe(f1.E, sH, sY)
      && !!f0.q && f0.q.aide === 'facade' && dist(f0.q, Y) > 0.05, 'ix : rencontre d\'un prolongement et d\'une façade : à la rencontre (écart ' + ecart(f1.q, Y) + ', ' + genre(f1)
      + ', ' + (f1.vue && f1.vue.bouts ? f1.vue.bouts.length : 0) + ' prolongement) ; témoin, clé décochée : ' + genre(f0) + ', ' + (f0.q ? dist(f0.q, Y).toFixed(3) : '?') + ' m de la rencontre');
    /* angle : trait T1 de (64 ; 40) à (69 ; 40), trait T2 de 1 m à 6 m de X0 = (70 ; 40) dans la direction α ; premier point touché à 2 px de
       X0 : α = 5,1° → à la rencontre ; α = 4,9° → sous le doigt ; T2 parallèle à T1, 0,1 m plus haut → sous le doigt */
    const X0 = A.plan(70, 40), T1 = traitDe('T1', A.plan(64, 40), A.plan(69, 40));
    const T2 = a => { const r = DEMO.th + a * Math.PI / 180, w = {x: Math.cos(r), y: Math.sin(r)}; return traitDe('T2', {x: X0.x + w.x, y: X0.y + w.y}, {x: X0.x + 6 * w.x, y: X0.y + 6 * w.y}); };
    const vers = els => premier113(A, 70, 40.05, {els, vue: [68, 40]});
    const g51 = await vers([T1, T2(5.1)]), g49 = await vers([T1, T2(4.9)]), gp = await vers([T1, traitDe('T2', A.plan(71, 40.1), A.plan(76, 40.1))]);
    const XA = interDe(segDe(T1), segDe(T2(5.1)));
    R.ok(g51.n === 1 && proche(g51.q, XA) && g51.q.aide === 'inter' && libre(g49) && libre(gp), 'ix : angle de plus de 5° : à 5,1°, à la rencontre (écart ' + ecart(g51.q, XA) + ', '
      + genre(g51) + ') ; à 4,9° (' + genre(g49) + ') et parallèles (' + genre(gp) + '), sous le doigt');
    /* jusqu'à 30 m des bouts : trait de (66 ; v) à (70 ; v), qui rencontre le prolongement de la façade ouest en (65,5 ; v), 0,5 m au-delà de
       son propre bout ; premier point touché à 5 px de la rencontre : v = 43,9 (29,9 m au-delà de Kn) → à la rencontre ; v = 44,1 (30,1 m)
       → sous le doigt */
    const haut = async v => { const t = traitDe('T', A.plan(66, v), A.plan(70, v)), r = await premier113(A, 65.6, v + 0.05, {els: [t], vue: [66, v]});
      r.X = interDe(ouest, segDe(t)); r.ext = dist(r.X, Kn); return r; };
    const h299 = await haut(43.9), h301 = await haut(44.1);
    R.ok(h299.n === 1 && proche(h299.q, h299.X) && h299.q.aide === 'inter' && h299.ext < 30 && libre(h301) && h301.ext > 30, 'ix : jusqu\'à 30 m des bouts : rencontre à '
      + m(h299.ext) + ' du coin, à la rencontre (' + genre(h299) + ', écart ' + ecart(h299.q, h299.X) + ') ; à ' + m(h301.ext) + ', sous le doigt (' + genre(h301) + ')');
    /* seuil du coin (14 px) : T2 vertical, de (70 ; 41) à (70 ; 46) ; premier point touché sur la diagonale, à 13 px de X0 → à X0 ; à 15 px →
       sous le doigt */
    const V2 = traitDe('T2', A.plan(70, 41), A.plan(70, 46)), XV = interDe(segDe(T1), segDe(V2)), d13 = 13 / 40 / Math.SQRT2, d15 = 15 / 40 / Math.SQRT2;
    const h13 = await premier113(A, 70 - d13, 40 - d13, {els: [T1, V2], vue: [68, 40]}), h15 = await premier113(A, 70 - d15, 40 - d15, {els: [T1, V2], vue: [68, 40]});
    const dx = r => r.q && r.q.doigt ? dist(r.q.doigt, XV) * 40 : NaN;
    R.ok(h13.n === 1 && proche(h13.q, XV) && h13.q.aide === 'inter' && dx(h13) < 14 && libre(h15) && dx(h15) > 14, 'ix : seuil du coin : à ' + dx(h13).toFixed(1)
      + ' px, à la rencontre (' + genre(h13) + ') ; à ' + dx(h15).toFixed(1) + ' px, sous le doigt (' + genre(h15) + ')');
    /* coin existant : premier point touché dehors à 6 px du coin Ks, où la façade ouest et la façade sud se touchent : repère « coin du
       bâti », pas « Intersection » ; « Accroche au bâti » décochée : sous le doigt (une rencontre sur un coin n'est pas une intersection) */
    const k1 = await premier113(A, 65.4, 3.9), sKs = await C.ecranCv(p, Ks.x, Ks.y);
    await reglerAides(p, {bati: false}); const k2 = await premier113(A, 65.4, 3.9); await reglerAides(p, {bati: true});
    const ki = ecrit(k1.E, 'Intersection', sKs);
    R.ok(k1.n === 1 && proche(k1.q, Ks) && k1.q.aide === 'coin' && !!k1.vue && k1.vue.type === 'coin' && ecrit(k1.E, 'coin du bâti', sKs) && !ki && libre(k2),
      'ix : coin existant : repère « coin du bâti » (' + genre(k1) + ', repère ' + (k1.vue ? k1.vue.type : 'aucun') + ', « Intersection » ' + (ki ? 'écrit' : 'absent')
      + ') ; « Accroche au bâti » décochée : sous le doigt (' + genre(k2) + ')');
    erreurs(A, 'ix');
  } finally { await A.fermer(); }
}

/* pi : ordre complet (coin > intersection > milieu > perpendiculaire > prolongement > redressement > côté) ; sommet d'un trait glissé */
async function priorites113(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'pi')) return;
    const v0 = await p.evaluate(() => window.VCroquis.AIDES_DEFAUT.accInter);
    if (!R.ok(v0 === false, 'pi : clé accInter dans AIDES_DEFAUT, à false (' + v0 + ')')) return;
    const B = await cotesRef(p, 'bati'), ouest = cote(A, B, [65.5, 4], [65.5, 14]), s7 = cote(A, B, [59, 24], [62.5, 24]);
    if (!R.ok(!!ouest && !!s7, 'pi : témoin : façade ouest du bâti et côté sud du bâti léger trouvés')) return;
    const X = interDe(ouest, s7);
    /* coin avant intersection : traits K1 de (60 ; 40) à (63 ; 40) et K2 de (63,4 ; 41) à (63,4 ; 43), dont les droites se rencontrent en
       (63,4 ; 40) ; premier point touché en (63,2 ; 40), à 8 px du bout (63 ; 40) et de la rencontre : au bout ; témoin, « Accroche au
       bâti » décochée : à la rencontre */
    await reglerAides(p, {accInter: true});
    const K1 = traitDe('K1', A.plan(60, 40), A.plan(63, 40)), K2 = traitDe('K2', A.plan(63.4, 41), A.plan(63.4, 43)), XK = interDe(segDe(K1), segDe(K2));
    const c1 = await premier113(A, 63.2, 40, {els: [K1, K2], vue: [62, 41]});
    await reglerAides(p, {bati: false}); const c2 = await premier113(A, 63.2, 40, {els: [K1, K2], vue: [62, 41]}); await reglerAides(p, {bati: true});
    R.ok(c1.n === 1 && proche(c1.q, K1.v[1]) && c1.q.aide === 'coin' && c2.n === 1 && proche(c2.q, XK) && c2.q.aide === 'inter', 'pi : coin avant intersection : touché à '
      + (c1.q && c1.q.doigt ? enPx(dist(c1.q.doigt, K1.v[1])) + ' du bout et à ' + enPx(dist(c1.q.doigt, XK)) + ' de la rencontre' : '?') + ', au bout (' + genre(c1)
      + ') ; témoin, « Accroche au bâti » décochée : à la rencontre (' + genre(c2) + ', écart ' + ecart(c2.q, XK) + ')');
    /* intersection avant milieu : traits M1 de (60 ; 40) à (61,5 ; 40) et M2 de (61,05 ; 41) à (61,05 ; 43), dont le prolongement rencontre
       M1 en (61,05 ; 40) ; premier point touché en (60,9 ; 40), à 6 px de la rencontre et du milieu (60,75 ; 40) de M1 : à la rencontre ;
       témoin, « Intersection » décochée : au milieu */
    await reglerAides(p, {accMilieu: true});
    const M1 = traitDe('M1', A.plan(60, 40), A.plan(61.5, 40)), M2 = traitDe('M2', A.plan(61.05, 41), A.plan(61.05, 43)), XM = interDe(segDe(M1), segDe(M2)), MM = milieuDe(segDe(M1));
    const m1 = await premier113(A, 60.9, 40, {els: [M1, M2], vue: [62, 41]});
    await reglerAides(p, {accInter: false}); const m2 = await premier113(A, 60.9, 40, {els: [M1, M2], vue: [62, 41]}); await reglerAides(p, {accInter: true, accMilieu: false});
    R.ok(m1.n === 1 && proche(m1.q, XM) && m1.q.aide === 'inter' && m2.n === 1 && proche(m2.q, MM) && m2.q.aide === 'milieu', 'pi : intersection avant milieu : à la rencontre ('
      + genre(m1) + ', écart ' + ecart(m1.q, XM) + ') ; témoin, « Intersection » décochée : au milieu (' + genre(m2) + ', écart ' + ecart(m2.q, MM) + ')');
    /* intersection avant prolongement : premier point touché à 9 px de la rencontre (65,5 ; 24) de deux prolongements, à 4 px de celui de la
       façade ouest ; « Prolongement d'un côté » cochée aussi : à la rencontre ; témoin, « Intersection » décochée : sur le prolongement */
    await reglerAides(p, {accProl: true});
    const j1 = await premier113(A, 65.6, 24.2, {vue: [64, 22]});
    await reglerAides(p, {accInter: false}); const j2 = await premier113(A, 65.6, 24.2, {vue: [64, 22]}); await reglerAides(p, {accInter: true});
    R.ok(j1.n === 1 && proche(j1.q, X) && j1.q.aide === 'inter' && j2.n === 1 && !!j2.q && j2.q.aide === 'prol' && surDroite(j2, ouest) && dist(j2.q, X) > 0.05,
      'pi : intersection avant prolongement : à la rencontre (' + genre(j1) + ', écart ' + ecart(j1.q, X) + ') ; témoin, « Intersection » décochée : sur le prolongement ('
      + genre(j2) + ')');
    /* prolongement avant redressement : trait commencé en (68 ; -2), fin touchée en (65,6 ; 1), à 4 px du prolongement de la façade ouest ;
       témoin, clé décochée : redressée à 135° ; cochée : sur le prolongement */
    await reglerAides(p, {accInter: false, accProl: false}); const q0 = await fin113(A, [68, -2], [65.6, 1]);
    await reglerAides(p, {accProl: true}); const q1 = await fin113(A, [68, -2], [65.6, 1]);
    R.ok(q0.n === 2 && !!q0.q && (q0.q.aide === 'parallele' || q0.q.aide === 'angle') && horsDroite(q0.q, ouest) > 0.05 && q1.n === 2 && !!q1.q && q1.q.aide === 'prol' && surDroite(q1, ouest),
      'pi : prolongement avant redressement : clé décochée, redressée (' + genre(q0) + ') ; cochée, sur le prolongement (' + genre(q1) + ')');
    /* sommet d'un trait de complément (62 ; 22) → (64 ; 21), choisi, glissé jusqu'à 6 px de la rencontre (65,5 ; 24) : à la rencontre ;
       témoin, « Intersection » et « Prolongement d'un côté » décochées : ailleurs */
    await reglerAides(p, {accInter: true, accProl: false});
    const tg = traitDe('T', A.plan(62, 22), A.plan(64, 21)), g1 = await glisserSommet(A, tg, 65.6, 24.1, [64, 22]);
    await reglerAides(p, {accInter: false}); const g2 = await glisserSommet(A, tg, 65.6, 24.1, [64, 22]);
    R.ok(!!g1 && proche(g1, X) && !!g2 && dist(g2, X) > 0.1, 'pi : sommet d\'un trait de complément glissé à 6 px de la rencontre : à la rencontre (écart ' + ecart(g1, X)
      + ') ; témoin, clés décochées : ailleurs (' + (g2 ? dist(g2, X).toFixed(3) : '?') + ' m de la rencontre)');
    erreurs(A, 'pi');
  } finally { await A.fermer(); }
}

/* mo : sens de la montée d'un escalier (décision D7 : vers le bout posé sur le bâti) dont le départ est calé par un nouvel accrochage ; une
   intersection n'est sur le bâti que si elle tombe sur l'un des deux côtés, un point au prolongement d'un côté ne l'est pas */
async function montee113(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'mo')) return;
    const v0 = await p.evaluate(() => window.VCroquis.AIDES_DEFAUT.accInter);
    if (!R.ok(v0 === false, 'mo : clé accInter dans AIDES_DEFAUT, à false (' + v0 + ')')) return;
    /* escalier touché au doigt du départ d à la fin f (repère de la démonstration), sur un plan vide ou avec les éléments els, vue centrée
       sur c, clés o cochées (les autres nouvelles décochées) : départ du brouillon, puis escalier créé (sens de la montée) */
    const esc = async (o, d, f, c, els) => {
      await reglerAides(p, Object.assign({accMilieu: false, accPerp: false, accParcelle: false, accProl: false, accInter: false}, o));
      await plan112(A, ESC, els); await vueSur(A, c[0], c[1]);
      await toucherPt(p, A.plan(d[0], d[1]), 600);
      const dep = (await dernier(p)).q;
      await toucherPt(p, A.plan(f[0], f[1]), 600);
      const e = (await C.docCroquis(p)).el.filter(x => x.k === 'ln' && x.t === 'esc');
      return {dep, n: e.length, monte: e.length === 1 && e[0].p ? e[0].p.monte : null};
    };
    const dit = r => 'départ ' + (r.dep ? r.dep.aide || 'libre' : 'absent') + (r.dep && r.dep.surBati ? ' sur le bâti' : '') + ', montée ' + r.monte + ', ' + r.n + ' escalier';
    /* départ calé à la rencontre (59 ; 14) du prolongement d'un côté et de la façade nord du voisin, fin au jardin : le départ est sur le
       bâti, montée vers lui */
    const a1 = await esc({accInter: true}, [59.1, 14.1], [59, 17], [60, 16]);
    R.ok(a1.n === 1 && !!a1.dep && a1.dep.aide === 'inter' && a1.dep.surBati === true && a1.monte === 'depart', 'mo : départ à la rencontre d\'un prolongement et d\'une façade : '
      + 'montée vers le départ (' + dit(a1) + ')');
    /* départ à la rencontre (65,5 ; 24) de deux prolongements : pas sur le bâti, montée vers la fin */
    const a2 = await esc({accInter: true}, [65.6, 24.1], [65.6, 21], [64, 22]);
    R.ok(a2.n === 1 && !!a2.dep && a2.dep.aide === 'inter' && a2.dep.surBati === false && a2.monte === 'fin', 'mo : départ à la rencontre de deux prolongements : montée vers la fin ('
      + dit(a2) + ')');
    /* départ sur le prolongement de la façade ouest, 2 m au-delà de Ks : pas sur le bâti, montée vers la fin ; témoin : départ sur la façade
       même, 2 m en deçà de Ks : montée vers le départ */
    const a3 = await esc({accProl: true}, [65.4, 2], [63.5, 2], [65, 4]), a4 = await esc({accProl: true}, [65.4, 6], [63.5, 6], [65, 4]);
    R.ok(a3.n === 1 && !!a3.dep && a3.dep.aide === 'prol' && a3.dep.surBati === false && a3.monte === 'fin' && a4.n === 1 && !!a4.dep && a4.dep.aide === 'facade' && a4.monte === 'depart',
      'mo : départ sur le prolongement d\'une façade : montée vers la fin (' + dit(a3) + ') ; témoin, départ sur la façade : vers le départ (' + dit(a4) + ')');
    /* « Limites de parcelle » cochée : départ calé à la rencontre (64 ; 14) du prolongement de la façade nord du voisin et du côté ouest de
       la parcelle. Une limite n'est pas le bâti : montée vers la fin. Témoin : un trait de complément posé sur ce côté, de (64 ; 10) à
       (64 ; 18), passe avant la limite (le bâti et les traits viennent avant les limites) : le départ est sur lui (à sa rencontre ZT avec la
       façade, à moins d'un millimètre de Z), montée vers le départ */
    const B = await cotesRef(p, 'bati'), L = await cotesRef(p, 'limite'), nv = cote(A, B, [51, 14], [62.5, 14]), lw = cote(A, L, [64, 0], [64, 34]);
    const tT = traitDe('T', A.plan(64, 10), A.plan(64, 18)), Z = nv && lw ? interDe(nv, lw) : null, ZT = nv ? interDe(nv, segDe(tT)) : null;
    if (!R.ok(!!Z && !!ZT, 'mo : témoin : façade nord du voisin et côté ouest de la parcelle trouvés')) return;
    const a5 = await esc({accInter: true, accParcelle: true}, [64.1, 14.1], [66.5, 18], [64, 16]);
    const a6 = await esc({accInter: true, accParcelle: true}, [64.1, 14.1], [66.5, 18], [64, 16], [tT]);
    R.ok(a5.n === 1 && !!a5.dep && a5.dep.aide === 'inter' && proche(a5.dep, Z, 1e-6) && a5.dep.surBati === false && a5.monte === 'fin' && a6.n === 1 && !!a6.dep
      && a6.dep.aide === 'inter' && proche(a6.dep, ZT, 1e-6) && a6.dep.surBati === true && a6.monte === 'depart', 'mo : départ à la rencontre d\'un prolongement et d\'une '
      + 'limite de parcelle : montée vers la fin (' + dit(a5) + ', écart ' + ecart(a5.dep, Z) + ') ; témoin, un trait sur la limite : vers le départ (' + dit(a6) + ', écart ' + ecart(a6.dep, ZT) + ')');
    erreurs(A, 'mo');
  } finally { await A.fermer(); }
}

/* rm : objets de mur et points du réseau, « Prolongement d'un côté » et « Intersection » cochées */
async function reseauMur113(){
  const A = await croquisNeuf(), p = A.p;
  try {
    if (!await boutonLa(p, 'rm')) return;
    const v0 = await p.evaluate(() => window.VCroquis.AIDES_DEFAUT.accProl);
    if (!R.ok(v0 === false, 'rm : clé accProl dans AIDES_DEFAUT, à false (' + v0 + ')')) return;
    const B = await cotesRef(p, 'bati'), ouest = cote(A, B, [65.5, 4], [65.5, 14]), s7 = cote(A, B, [59, 24], [62.5, 24]), o7 = cote(A, B, [59, 24], [59, 28]);
    const nv = cote(A, B, [51, 14], [62.5, 14]);
    if (!R.ok(!!ouest && !!s7 && !!o7 && !!nv, 'rm : témoin : façade ouest du bâti, côtés du bâti léger et façade nord du voisin trouvés')) return;
    const X = interDe(ouest, s7), Y = interDe(nv, o7), Ks = boutDe(A, ouest, 65.5, 4);
    await reglerAides(p, {accProl: true, accInter: true});
    /* descente (objet de mur) touchée à 6 px de la rencontre (59 ; 14), à 2 px de la façade nord du voisin : sur la façade, pas à la
       rencontre ; témoin : le premier point d'un trait de complément touché au même endroit va à la rencontre */
    const descente = async (u, v, c) => {
      const q = A.plan(u, v); await plan112(A, DESC); await vueSur(A, c[0], c[1]); await toucherPt(p, q, 700);
      const de = (await C.docCroquis(p)).el.filter(e => e.t === 'descente');
      return {q, o: de.length === 1 ? de[0] : null};
    };
    const o1 = await descente(59.15, 14.05, [60, 16]), w1 = await premier113(A, 59.15, 14.05, {vue: [60, 16]});
    R.ok(!!o1.o && horsDroite(o1.o, nv) < 1e-9 && dist(o1.o, Y) > 0.1 && w1.n === 1 && proche(w1.q, Y) && w1.q.aide === 'inter', 'rm : descente touchée près d\'une rencontre : sur la '
      + 'façade (' + (o1.o ? horsDroite(o1.o, nv).toExponential(1) + ' m de la façade, ' + dist(o1.o, Y).toFixed(3) + ' m de la rencontre' : 'absente') + ') ; témoin, trait de complément : '
      + 'à la rencontre (' + genre(w1) + ')');
    /* descente touchée à 6 px du prolongement de la façade ouest, 3 m au-delà de Ks : sous le doigt (un trait y va : cas pl) */
    const o2 = await descente(65.65, 1, [68, 2]);
    R.ok(!!o2.o && dist(o2.o, o2.q) < 0.03 && horsDroite(o2.o, ouest) > 0.1, 'rm : descente touchée près du prolongement d\'une façade : sous le doigt ('
      + (o2.o ? dist(o2.o, o2.q).toFixed(3) + ' m du point touché, ' + horsDroite(o2.o, ouest).toFixed(3) + ' m de la droite' : 'absente') + ')');
    /* tronçon : premier point touché à 6 px du prolongement de la façade ouest → sur la droite ; témoin, clés décochées : sous le doigt */
    const t1 = await premier113(A, 65.65, 1, {outil: TRONCON});
    await reglerAides(p, {accProl: false, accInter: false}); const t0 = await premier113(A, 65.65, 1, {outil: TRONCON}); await reglerAides(p, {accProl: true, accInter: true});
    R.ok(t1.n === 1 && !!t1.q && t1.q.aide === 'prol' && surDroite(t1, ouest) && libre(t0), 'rm : premier point d\'un tronçon près du prolongement d\'une façade : sur la droite ('
      + genre(t1) + ') ; témoin, clés décochées : sous le doigt (' + genre(t0) + ')');
    /* tronçon : premier point près du coin Ks → sous le doigt (ni coin, ni intersection) ; près de la rencontre (65,5 ; 24) de deux
       prolongements → à la rencontre */
    const t2 = await premier113(A, 65.4, 3.9, {outil: TRONCON}), t3 = await premier113(A, 65.6, 24.1, {outil: TRONCON, vue: [64, 22]});
    R.ok(libre(t2) && t3.n === 1 && proche(t3.q, X) && t3.q.aide === 'inter', 'rm : premier point d\'un tronçon : près d\'un coin du bâti, sous le doigt (' + genre(t2) + ', '
      + (t2.q ? dist(t2.q, Ks).toFixed(3) : '?') + ' m du coin) ; près de la rencontre de deux prolongements, à la rencontre (' + genre(t3) + ', écart ' + ecart(t3.q, X) + ')');
    /* regard posé en (65,5 ; 24,25) ; tronçon commencé en (68 ; 22), fin touchée en (65,5 ; 24,1), à 4 px de la rencontre et à 6 px du
       regard : raccordée au regard (le réseau passe avant) */
    const rg = A.plan(65.5, 24.25);
    await plan112(A, TRONCON, [C.P('R', 'regard', rg.x, rg.y)]); await vueSur(A, 64, 22);
    await toucherPt(p, A.plan(68, 22), 600); await toucherPt(p, A.plan(65.5, 24.1), 600);
    if ((await dernier(p)).n){ await p.evaluate(() => window.__vcEd.terminerTrace()); await C.pause(p, 300); }
    const tr = (await C.docCroquis(p)).el.find(e => e.k === 'ln' && e.t === 'tr');
    /* témoin : le même tronçon sans le regard : la fin va à la rencontre */
    await plan112(A, TRONCON); await vueSur(A, 64, 22);
    await toucherPt(p, A.plan(68, 22), 600); await toucherPt(p, A.plan(65.5, 24.1), 600);
    const fx = await dernier(p);
    if (fx.n){ await p.evaluate(() => window.__vcEd.terminerTrace()); await C.pause(p, 300); }
    R.ok(!!tr && tr.v.length === 2 && tr.v[1].a === 'R' && proche(tr.v[1], rg, 1e-6) && fx.n === 2 && !!fx.q && fx.q.aide === 'inter' && proche(fx.q, X), 'rm : fin d\'un tronçon '
      + 'touchée près d\'une rencontre et d\'un regard : raccordée au regard (' + (tr ? tr.v.map(w => w.a || 'libre').join(' → ') : 'aucun tronçon') + ') ; témoin, sans le '
      + 'regard : à la rencontre (' + genre(fx) + ', écart ' + ecart(fx.q, X) + ')');
    /* sommet d'un tronçon (62 ; 22) → (64 ; 21), choisi, glissé jusqu'à 6 px de la rencontre : à la rencontre ; témoin, clés décochées :
       sous le doigt */
    const a = A.plan(62, 22), b = A.plan(64, 21), lt = C.L('T', 'tr', [[a.x, a.y], [b.x, b.y]], {}, {});
    const g1 = await glisserSommet(A, lt, 65.6, 24.1, [64, 22]);
    await reglerAides(p, {accProl: false, accInter: false}); const g2 = await glisserSommet(A, lt, 65.6, 24.1, [64, 22]);
    R.ok(!!g1 && proche(g1, X) && !!g2 && dist(g2, X) > 0.1, 'rm : sommet d\'un tronçon glissé à 6 px de la rencontre : à la rencontre (écart ' + ecart(g1, X)
      + ') ; témoin, clés décochées : ailleurs (' + (g2 ? dist(g2, X).toFixed(3) : '?') + ' m de la rencontre)');
    erreurs(A, 'rm');
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [boutonEtPalette, portrait, reglagesEtEchap, accrocheBati, aimantEtReseau, toucherPlan, fermetures, table, defauts, milieuPerp, limites, troncon, escalierMontee, priorites,
    prolongement, intersection, priorites113, montee113, reseauMur113]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception du test : ' + (e && e.stack || e)); }
  }
  R.fin();
})();
