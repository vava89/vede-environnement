// Palette d'accrochage de l'éditeur du croquis, dans Chromium (données fictives : fond de VCroquis.demoDxf(), croquis vide) : correctif
// m111 (souhait 17, première partie ; réponses 17.1, 17.3 et 17.4, décisions D9 et D11 de .claude/conception-outils-dessin.md). m112 y
// ajoutera les nouveaux accrochages.
// b : bouton « Palette d'accrochage » (.vc-accr) dans la barre de navigation, juste au-dessus de l'aimant, de la même taille, avec sa
//     propre icône ; un toucher ouvre la palette (.vc-accroches), à gauche de la barre, au-dessus du plan, sous le panneau et le toast :
//     trois puces dans l'ordre de VCroquis.ACCROCHES, avec les libellés d'AIDES_LIB et l'état de S.aides, aucune pour l'accroche au
//     réseau ; au clavier, Espace bascule une puce, qui garde le focus ; un second toucher la ferme ; aria-expanded suit ;
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
// m : table des puces : une clé ajoutée à VCroquis.ACCROCHES (ici « finir ») donne une quatrième puce, sans autre code (pour m112) ;
//     la barre d'aide suit cette puce (outil Tronçon, un point posé : « le tronçon se termine sur un objet » disparaît, puis revient).
// Sur e6618ef, chaque cas échoue dès son premier contrôle (pas de bouton .vc-accr dans la barre de navigation) ; la suite n'est pas lancée.
// Le cas p échoue aussi quand la largeur du paysage s'applique en portrait, panneau ouvert (palette de 40 px de large, puces coupées).
// usage : node tests/navigateur/accroches.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('accroches');

const DEMO = {x: 1700000, y: 8200000, th: 12 * Math.PI / 180};
const demoAbs = (u, v) => ({x: DEMO.x + u * Math.cos(DEMO.th) - v * Math.sin(DEMO.th), y: DEMO.y + u * Math.sin(DEMO.th) + v * Math.cos(DEMO.th)});
const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
const m = d => d == null ? 'aucune' : d.toFixed(3) + ' m';
const ORDRE = ['bati', 'parallele', 'angles'];
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
    const e1 = await etat(p), a1 = await aides(p), lib = await p.evaluate(() => { const o = {}; window.VCroquis.AIDES_LIB.forEach(a => { o[a[0]] = a[1]; }); return o; });
    R.ok(e1.ouverte && e1.expanded === 'true', 'b : un toucher sur le bouton ouvre la palette (aria-expanded ' + e1.expanded + ')');
    R.ok(JSON.stringify(e1.puces.map(c => c.k)) === JSON.stringify(ORDRE) && e1.puces.every(c => c.lib === lib[c.k]),
      'b : trois puces, aux libellés d\'AIDES_LIB, et aucune pour l\'accroche au réseau : ' + e1.puces.map(c => c.lib).join(', '));
    R.ok(e1.puces.length === 3 && e1.puces.every(c => c.on === String(a1.ed[c.k] !== false) && !c.off) && !e1.ligne,
      'b : puces à l\'état de S.aides, actives, sans ligne « Aides coupées » (' + e1.puces.map(c => c.k + ' ' + c.on).join(', ') + ')');
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
      R.ok(e.puces.length === 3 && e.puces.every(c => c.dedans && c.atteinte), 'p : ' + nom + ' : chaque puce est entière dans la palette et se touche en son centre ('
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
    R.ok(a1.ed.actives === false && a1.hote.actives === false && e1.ouverte && e1.puces.length === 3 && e1.puces.every(c => c.off),
      'r : aimant coupé, palette ouverte : les trois puces sont grisées (' + e1.puces.map(c => c.k + (c.off ? ' grisée' : ' active')).join(', ') + ')');
    R.ok(e1.ligne === 'Aides coupées : touchez l\'aimant pour les rétablir', 'r : la palette dit : ' + JSON.stringify(e1.ligne));
    R.ok(e1.puces.every(c => c.on === 'true'), 'r : les puces grisées gardent leur état (cochées)');
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
    R.ok(a3.ed.actives === true && e3.ouverte && e3.puces.length === 3 && e3.puces.every(c => !c.off) && !e3.ligne,
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
    const k4 = e1.puces[3] || {};
    R.ok(e1.puces.length === 4 && k4.k === 'finir' && k4.lib === 'Terminer sur un objet' && k4.on === 'true',
      'm : une clé ajoutée à VCroquis.ACCROCHES donne une quatrième puce, au libellé d\'AIDES_LIB (' + e1.puces.map(c => c.lib).join(', ') + ')');
    R.ok(/se termine sur un objet/.test(t1) && a2.ed.finir === false && a2.hote.finir === false && !/se termine sur un objet/.test(t2) && a3.ed.finir === true && /se termine sur un objet/.test(t3),
      'm : la barre d\'aide suit la puce (décochée : ' + JSON.stringify(t2.slice(0, 70)) + ' ; recochée : ' + JSON.stringify(t3.slice(0, 70)) + ')');
    await toucherEl(p, BOUTON);
    const e2 = await etat(p);
    await toucherEl(p, BOUTON);
    R.ok(e2.puces.length === 3, 'm : clé retirée : trois puces de nouveau (' + e2.puces.length + ')');
    erreurs(A, 'm');
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [boutonEtPalette, portrait, reglagesEtEchap, accrocheBati, aimantEtReseau, toucherPlan, fermetures, table]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception du test : ' + (e && e.stack || e)); }
  }
  R.fin();
})();
