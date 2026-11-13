// Mise en page de la barre de navigation, de la barre d'aide et de la palette d'accrochage de l'éditeur du croquis (m114), dans Chromium
// (données fictives : fond de VCroquis.demoDxf(), un regard et un tronçon injectés). Tailles : 1280 × 800 et 1024 × 600 (paysage),
// 600 × 960, 600 × 1005, 768 × 1024, 800 × 1280 et 400 × 800 (portrait). États : repos (outil Choisir) ; panneau Contrôles ; fiche du
// tronçon ; outil Tronçon après un premier point ; le même avec le panneau Fond ; dans chacun, palette d'accrochage fermée puis ouverte.
// d : chaque bouton visible de la barre de navigation (.vc-nav) et de la barre d'aide (.vc-aide) est entier à l'écran et se touche en son
//     centre (document.elementFromPoint donne le bouton) ; les boutons de la barre de navigation gardent 44 × 44 px ; palette ouverte, elle
//     est dans l'écran et ne recoupe ni la barre d'aide, ni la barre de navigation, ni le panneau, ni la barre du haut ;
// r : hauteur suffisante (1280 × 800, 1024 × 600, 768 × 1024, 800 × 1280, et portrait sans panneau) : une seule colonne, au même endroit
//     qu'avant le correctif (rectangles relevés sur e9e8b5d, au demi-pixel ; CSS des barres identique sur 9a7c735) ; hauteur qui
//     manque (portrait 600 × 960, 600 × 1005 et 400 × 800, panneau ouvert) : deux colonnes ou plus, lues de haut en bas puis de gauche à
//     droite [p], le bouton de la palette juste au-dessus de l'aimant, l'aimant en bas de la colonne du bord droit ;
// c : paysage, panneau ouvert : la barre d'aide s'arrête à gauche de la barre de navigation, avec le même écart qu'hors panneau, et garde
//     au moins 300 px de large en 1024 × 600 ;
// l : barre d'aide de trois lignes ou plus (portrait 400 × 800, tronçon de deux points), palette ouverte : aucun recouvrement ; la barre
//     d'aide change de hauteur pendant que la palette est ouverte (aimant coupé puis rétabli, puis « Point ») : la palette suit, sans
//     recouvrement, et redescend quand la barre d'aide raccourcit ;
// b : bulle « + point » au doigt, portrait 600 × 960, fiche du tronçon ouverte, barre de navigation sur deux colonnes : touchers près du
//     bord droit, au-dessus de la barre de navigation et à sa gauche : la bulle est entière à l'écran, et son centre et ses coins la donnent ;
// s : palette qui défile (400 × 800, outil Tronçon après un point, panneau Fond ; vérifié d'abord, sinon le contrôle ne prouve rien),
//     défilée jusqu'en bas : un toucher sur sa dernière puce la bascule sans faire sauter la palette (même position de défilement, même
//     puce sous le doigt) ; un second toucher au même endroit la rétablit ;
// t : la tablette tourne (600 × 960, puis 960 × 600, puis de nouveau 600 × 960), outil Tronçon après un point, panneau Fond, palette
//     ouverte : le panneau et la palette restent ouverts ; les contrôles d et r sont refaits à chaque taille (deux colonnes en portrait ;
//     en paysage, une seule colonne au rectangle d'avant) ; puis le panneau se ferme, la palette restant ouverte : d et r de nouveau
//     (une seule colonne, au rectangle d'avant) ;
// aucune erreur dans la console.
// Les contrôles ne dépendent pas du nombre de puces de la palette (m112 et m113 en ajoutent) : ils mesurent des recouvrements.
// Échouent sur 9a7c735 : d (panneau ouvert : « Zoom avant » sous la barre du haut en 600 × 960, hors de l'écran en 400 × 800 ; 1280 × 800 et
// 1024 × 600, outil Tronçon et panneau Fond : l'aimant, et en 1024 × 600 le bouton de la palette, sous la barre d'aide ; palette ouverte
// avec l'outil Tronçon, ou avec la barre d'aide de trois lignes : elle recoupe la barre d'aide), r (une seule colonne en 600 × 960,
// 600 × 1005 et 400 × 800 avec un panneau), c (1280 × 800 et 1024 × 600) et b (le toucher près du bord droit, à 10 px de la barre d'une
// colonne, est pris par Chromium pour un toucher sur « Ajuster la vue » : aucune bulle). Les contrôles l, qui préparent la barre d'aide
// de trois lignes et la font changer, passent sur les deux : les recouvrements sont vérifiés par les contrôles d qui les suivent.
// s échoue sur la première version de m114 (la palette sautait : 44 px de défilement, puis 0, et une autre puce sous le doigt) ; sur
// 9a7c735, seul son premier contrôle échoue (la palette, large de 300 px, n'y défile pas avec trois puces). t échoue sur 9a7c735 (comme d
// et r), quand le redimensionnement ne replace pas les barres (deux colonnes et barre d'aide décalée restent en paysage) et quand la
// fermeture du panneau ne les replace pas (deux colonnes restent sans panneau).
// usage : node tests/navigateur/mise-en-page.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('mise-en-page');

const TAILLES = [[1280, 800], [1024, 600], [600, 960], [600, 1005], [768, 1024], [800, 1280], [400, 800]];
/* rectangles de la barre de navigation [gauche, haut, droite, bas], sans panneau et avec un panneau, là où la hauteur suffit : relevés sur
   e9e8b5d ; CSS des barres identique sur 9a7c735. En 600 × 960, 600 × 1005 et 400 × 800 : sans panneau seulement (avec un panneau, la
   hauteur manque : COLONNES). En 960 × 600 (la tablette de 600 × 960 tournée, contrôle t) : avec un panneau seulement */
const AVANT = {
  '1280x800': {sans: [1226, 394, 1270, 788], avec: [816, 394, 860, 788]},
  '1024x600': {sans: [970, 194, 1014, 588], avec: [560, 194, 604, 588]},
  '768x1024': {sans: [714, 548, 758, 942], avec: [714, 80, 758, 474]},
  '800x1280': {sans: [746, 804, 790, 1198], avec: [746, 336, 790, 730]},
  '600x960': {sans: [546, 484, 590, 878]},
  '600x1005': {sans: [546, 529, 590, 923]},
  '400x800': {sans: [346, 324, 390, 718]},
  '960x600': {avec: [496, 194, 540, 588]},
};
/* portrait, panneau ouvert, moins de 1008 px de haut : la barre de navigation ne tient plus sur une colonne */
const COLONNES = ['600x960', '600x1005', '400x800'];

const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
const rect = q => q ? Math.round(q.l) + '-' + Math.round(q.r) + ' × ' + Math.round(q.t) + '-' + Math.round(q.b) : '-';
const recoupe = (a, b) => !!a && !!b && a.l < b.r - 0.01 && a.r > b.l + 0.01 && a.t < b.b - 0.01 && a.b > b.t + 0.01;
const dansEcran = (q, W, H) => q.l >= -0.5 && q.t >= -0.5 && q.r <= W + 0.5 && q.b <= H + 0.5;
/* clic du DOM sur un bouton de l'éditeur : il agit même si le bouton est couvert (la couverture est mesurée à part) */
const clic = async (p, sel, ms) => { await p.evaluate(s => document.querySelector(s).click(), sel); await C.pause(p, ms == null ? 250 : ms); };
const BOUTON = '.vc .vc-nav .vc-accr';

/* Mesure des barres : rectangles (pixels de la page) de la barre de navigation, de la barre d'aide, de la palette d'accrochage, du panneau
   et de la barre du haut ; pour chaque bouton visible des barres de navigation et d'aide, son rectangle et ce qui est en son centre ('' :
   le bouton lui-même) ; nombre de colonnes de la barre de navigation ; lignes de la barre d'aide (lignes du texte et rangées de boutons) */
const mesure = p => p.evaluate(() => {
  const R0 = document.querySelector('.vc');
  const vu = e => !!e && !e.hidden && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden';
  const rc = e => { const q = e.getBoundingClientRect(); return {l: q.left, t: q.top, r: q.right, b: q.bottom, w: q.width, h: q.height}; };
  const sous = b => { const q = b.getBoundingClientRect(), x = (q.left + q.right) / 2, y = (q.top + q.bottom) / 2;
    if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) return 'hors de l\'écran';
    const e = document.elementFromPoint(x, y); if (e && (e === b || b.contains(e))) return '';
    const c = e && e.closest('.vc-barre,.vc-aide,.vc-nav,.vc-panneau,.vc-accroches,.vc-outils,.vc-palette,.vc-menu,.vc-bulle-point');
    return c ? '.' + c.className.split(' ')[0] : e ? e.tagName.toLowerCase() : 'rien'; };
  const nav = R0.querySelector('.vc-nav'), aide = R0.querySelector('.vc-aide'), pal = R0.querySelector('.vc-accroches'), pan = R0.querySelector('.vc-panneau');
  const bn = Array.from(nav.querySelectorAll('.vc-b')).filter(vu), ba = vu(aide) ? Array.from(aide.querySelectorAll('button')).filter(vu) : [];
  let lignes = 0;
  if (vu(aide)){
    const sp = aide.querySelector('span'), lh = sp ? parseFloat(getComputedStyle(sp).lineHeight) || 19.5 : 19.5;
    if (sp) lignes += Math.round(sp.getBoundingClientRect().height / lh);
    lignes += new Set(ba.map(b => Math.round(b.getBoundingClientRect().top))).size;
  }
  return {W: innerWidth, H: innerHeight, nav: rc(nav), aide: vu(aide) ? rc(aide) : null, pal: vu(pal) ? rc(pal) : null, pan: vu(pan) ? rc(pan) : null,
    barre: rc(R0.querySelector('.vc-barre')), lignes, panneau: window.__vcEd.etat.panneau,
    bn: bn.map(b => ({a: b.dataset.a, r: rc(b), sous: sous(b)})), ba: ba.map(b => ({a: b.textContent.trim(), r: rc(b), sous: sous(b)})),
    colonnes: new Set(bn.map(b => Math.round(b.getBoundingClientRect().left))).size};
});

/* d : contrôles communs à chaque état ; k : taille et état, pour les messages */
function controler(e, k){
  const malNav = e.bn.filter(b => b.sous || !dansEcran(b.r, e.W, e.H)), malAide = e.ba.filter(b => b.sous || !dansEcran(b.r, e.W, e.H));
  R.ok(e.bn.length > 0 && !malNav.length, 'd : ' + k + ' : les ' + e.bn.length + ' boutons de la barre de navigation sont entiers à l\'écran et se touchent'
    + ' en leur centre' + (malNav.length ? ' (' + malNav.map(b => b.a + (b.sous ? ' sous ' + b.sous : ' coupé ' + rect(b.r))).join(', ') + ')' : '')
    + ' ; barre ' + rect(e.nav));
  R.ok(!malAide.length, 'd : ' + k + ' : ' + (e.ba.length ? 'les boutons de la barre d\'aide (' + e.ba.map(b => b.a).join(', ') + ') sont entiers à l\'écran et se'
    + ' touchent en leur centre' : 'aucun bouton dans la barre d\'aide') + (malAide.length ? ' (' + malAide.map(b => b.a + (b.sous ? ' sous ' + b.sous : ' coupé')).join(', ') + ')' : ''));
  const tailles = e.bn.filter(b => Math.abs(b.r.w - 44) > 0.5 || Math.abs(b.r.h - 44) > 0.5);
  R.ok(!tailles.length, 'd : ' + k + ' : boutons de la barre de navigation de 44 × 44 px' + (tailles.length ? ' (' + tailles.map(b => b.a + ' ' + b.r.w + ' × ' + b.r.h).join(', ') + ')' : ''));
  if (e.pal){
    const contre = [['barre d\'aide', e.aide], ['barre de navigation', e.nav], ['panneau', e.pan], ['barre du haut', e.barre]].filter(x => recoupe(e.pal, x[1]));
    R.ok(dansEcran(e.pal, e.W, e.H) && !contre.length, 'd : ' + k + ' : la palette ouverte est dans l\'écran et ne recoupe ni la barre d\'aide, ni la barre de'
      + ' navigation, ni le panneau, ni la barre du haut (palette ' + rect(e.pal) + (contre.length ? ' ; recoupe : ' + contre.map(x => x[0] + ' ' + rect(x[1])).join(', ') : '') + ')');
  }
}

/* r : une colonne au même endroit qu'avant là où la hauteur suffit, plusieurs colonnes là où elle manque */
function controlerColonnes(e, taille, k){
  const ref = AVANT[taille], portrait = e.H > e.W, ref1 = ref ? ref[e.pan ? 'avec' : 'sans'] : null;
  if (ref1){
    const n = e.nav, egal = Math.abs(n.l - ref1[0]) < 0.5 && Math.abs(n.t - ref1[1]) < 0.5 && Math.abs(n.r - ref1[2]) < 0.5 && Math.abs(n.b - ref1[3]) < 0.5;
    R.ok(e.colonnes === 1 && egal, 'r : ' + k + ' : barre de navigation sur une colonne, au même endroit qu\'avant le correctif (' + rect(n) + ', avant '
      + ref1[0] + '-' + ref1[2] + ' × ' + ref1[1] + '-' + ref1[3] + ', ' + e.colonnes + ' colonne' + (e.colonnes > 1 ? 's' : '') + ')');
    return;
  }
  if (COLONNES.indexOf(taille) >= 0 && portrait && e.pan){
    const b = a => e.bn.find(x => x.a === a), acc = b('accroches'), aim = b('aides');
    /* lecture de haut en bas, puis de gauche à droite : chaque bouton est sous le précédent, ou en haut de la colonne suivante, à droite */
    const ordre = e.bn.every((x, i) => !i || (Math.abs(x.r.l - e.bn[i - 1].r.l) < 0.5 ? x.r.t >= e.bn[i - 1].r.b - 0.5 : x.r.l >= e.bn[i - 1].r.r - 0.5));
    R.ok(e.colonnes >= 2 && ordre && !!acc && !!aim && Math.abs(acc.r.l - aim.r.l) < 0.5 && aim.r.t >= acc.r.b - 0.5 && aim.r.t - acc.r.b <= 6.5
      && Math.abs(aim.r.r - e.nav.r) < 0.5 && Math.abs(aim.r.b - e.nav.b) < 0.5,
    'r : ' + k + ' : barre de navigation sur ' + e.colonnes + ' colonne' + (e.colonnes > 1 ? 's' : '') + ', lues de haut en bas puis de gauche à droite ; le bouton'
      + ' de la palette juste au-dessus de l\'aimant, en bas de la colonne du bord droit (barre ' + rect(e.nav) + ', palette ' + rect(acc && acc.r) + ', aimant '
      + rect(aim && aim.r) + ')');
  }
}

/* Dossier neuf, croquis sur le fond fictif, à la taille w × h ; un regard et un tronçon fictifs ; vue centrée sur (2, 2) à 40 px/m */
async function croquis(w, h){
  const A = await C.ouvrir({viewport: {width: w, height: h}}), p = A.p;
  await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
  await C.injecter(p, {el: [C.P('R', 'regard', 3, 3), C.L('T', 'tr', [[0, 0], 'R'], {R: {x: 3, y: 3}})]});
  await C.regler(p, 2, 2, 40);
  return A;
}
/* palette fermée puis ouverte (et refermée) dans l'état présent ; rend les deux mesures */
async function avecPalette(p){
  const e0 = await mesure(p); await clic(p, BOUTON, 300);
  const e1 = await mesure(p); await clic(p, BOUTON, 200);
  return [e0, e1];
}

/* d, r, c : chaque taille, chaque état */
async function dispositions(){
  for (const [w, h] of TAILLES){
    const taille = w + 'x' + h, A = await croquis(w, h), p = A.p, vus = {};
    try {
      const etats = [
        ['repos', async () => {}],
        ['panneau Contrôles', async () => { await clic(p, '.vc [data-p="controles"]', 300); }],
        ['fiche du tronçon', async () => { await p.evaluate(() => window.__vcEd.ouvrirPanneau(null)); await p.evaluate(() => window.__vcEd.selectionner('T')); await C.pause(p, 300); }],
        ['outil Tronçon, un point', async () => {
          await p.evaluate(() => window.__vcEd.selectionner(null)); await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'}); await C.pause(p, 200);
          await C.toucherCv(p, await C.ecranCv(p, 1, 1), 400); }],
        ['outil Tronçon, un point, panneau Fond', async () => { await clic(p, '.vc [data-p="calques"]', 300); }],
      ];
      for (const [nom, preparer] of etats){
        await preparer();
        const [e0, e1] = await avecPalette(p);
        vus[nom] = e0;
        for (const [e, k] of [[e0, taille + ', ' + nom], [e1, taille + ', ' + nom + ', palette ouverte']]){
          controler(e, k);
          controlerColonnes(e, taille, k);
        }
        /* panneau ouvert : il doit le rester, sinon les mesures « palette ouverte » se feraient sans lui */
        R.ok(!!e1.pal && (!e0.panneau || (e1.panneau === e0.panneau && !!e1.pan)), 'd : ' + taille + ', ' + nom + ' : le bouton ouvre la palette'
          + (e0.panneau ? ' et le panneau reste ouvert (' + (e1.pan ? e1.panneau : 'fermé') + ')' : ''));
      }
      /* c : paysage, la barre d'aide avant la barre de navigation, avec le même écart avec et sans panneau */
      const s = vus['outil Tronçon, un point'], f = vus['outil Tronçon, un point, panneau Fond'];
      if (w > h && s && f){
        const ec0 = s.aide ? s.nav.l - s.aide.r : null, ec1 = f.aide ? f.nav.l - f.aide.r : null;
        R.ok(ec0 != null && ec1 != null && ec1 > 0 && Math.abs(ec1 - ec0) < 0.5, 'c : ' + taille + ', outil Tronçon : la barre d\'aide s\'arrête à gauche de la barre'
          + ' de navigation, avec le même écart avec le panneau Fond (' + (ec1 == null ? '-' : Math.round(ec1)) + ' px) que sans panneau (' + (ec0 == null ? '-' : Math.round(ec0)) + ' px)');
        if (taille === '1024x600') R.ok(!!f.aide && f.aide.w >= 300, 'c : 1024 × 600, panneau Fond : la barre d\'aide garde ' + (f.aide ? Math.round(f.aide.w) : 0) + ' px de large (300 au moins)');
      }
      erreurs(A, taille);
    } finally { await A.fermer(); }
  }
}

/* l : barre d'aide de trois lignes ou plus, palette ouverte ; la barre d'aide change de hauteur, la palette ouverte */
async function lignes(){
  const A = await croquis(400, 800), p = A.p;
  try {
    await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'}); await C.pause(p, 200);
    await C.toucherCv(p, await C.ecranCv(p, 1, 1), 400); await C.toucherCv(p, await C.ecranCv(p, 1, 2.5), 400);
    await clic(p, BOUTON, 300);
    const e1 = await mesure(p);
    R.ok(e1.lignes >= 3 && !!e1.pal, 'l : 400 × 800, tronçon de deux points : barre d\'aide de ' + e1.lignes + ' lignes (trois au moins), palette ouverte');
    controler(e1, '400 × 800, barre d\'aide de ' + e1.lignes + ' lignes, palette ouverte');
    /* aimant coupé (la barre d'aide raccourcit), puis rétabli (elle s'allonge), la palette restant ouverte */
    await clic(p, '.vc .vc-nav .vc-aimant', 300); const e2 = await mesure(p);
    await clic(p, '.vc .vc-nav .vc-aimant', 300); const e3 = await mesure(p);
    R.ok(!!e2.pal && !!e3.pal && e3.aide.h > e2.aide.h + 1, 'l : aimant coupé puis rétabli, la palette ouverte : la barre d\'aide passe de ' + Math.round(e2.aide.h)
      + ' à ' + Math.round(e3.aide.h) + ' px de haut');
    controler(e2, '400 × 800, aimant coupé, palette ouverte');
    controler(e3, '400 × 800, aimant rétabli, palette ouverte');
    /* « Point » : un point retiré, la barre d'aide raccourcit ; la palette redescend jusqu'à elle, ou jusqu'à sa place à côté de son bouton */
    await clic(p, '.vc .vc-aide [data-a="retirerPoint"]', 300); const e4 = await mesure(p);
    const acc = e4.bn.find(b => b.a === 'accroches');
    R.ok(!!e4.pal && !!e4.aide && e4.aide.h < e3.aide.h - 1 && !!acc && e4.pal.b >= Math.min(e4.aide.t, acc.r.b) - 6.5, 'l : « Point », la palette ouverte : la barre'
      + ' d\'aide raccourcit (' + Math.round(e3.aide.h) + ' puis ' + (e4.aide ? Math.round(e4.aide.h) : 0) + ' px) et la palette suit (bas à ' + (e4.pal ? Math.round(e4.pal.b) : '-')
      + ', barre d\'aide dès ' + (e4.aide ? Math.round(e4.aide.t) : '-') + ', bouton jusqu\'à ' + (acc ? Math.round(acc.r.b) : '-') + ')');
    controler(e4, '400 × 800, un point retiré, palette ouverte');
    erreurs(A, 'l');
  } finally { await A.fermer(); }
}

/* b : bulle « + point » au doigt, près du bord droit, portrait, fiche ouverte */
const bulle = p => p.evaluate(() => {
  const b = document.querySelector('.vc .vc-bulle-point'); if (!b || b.hidden || !b.getClientRects().length) return null;
  const q = b.getBoundingClientRect(), d = 3, pts = [[(q.left + q.right) / 2, (q.top + q.bottom) / 2], [q.left + d + 8, q.top + d], [q.right - d - 8, q.top + d],
    [q.left + d + 8, q.bottom - d], [q.right - d - 8, q.bottom - d]];
  const touche = pts.filter(([x, y]) => { const e = document.elementFromPoint(x, y); return !!e && b.contains(e); }).length;
  return {l: q.left, t: q.top, r: q.right, b: q.bottom, touche, n: pts.length};
});
async function bullePoint(){
  const A = await croquis(600, 960), p = A.p;
  try {
    /* tronçons fictifs posés d'après l'écran : B horizontal à 150 px du haut, jusqu'à 15 px du bord droit ; D vertical, 130 px avant le bord */
    const m = (x, y) => p.evaluate(([x, y]) => { const r = document.querySelector('.vc .vc-cv').getBoundingClientRect();
      const w = window.__vcEd.etat.vue.monde(x - r.left, y - r.top); return [w.x, w.y]; }, [x, y]);
    const b0 = await m(100, 150), b1 = await m(585, 150), d0 = await m(470, 110), d1 = await m(470, 400);
    await C.injecter(p, {el: [C.L('B', 'tr', [b0, b1], {}), C.L('D', 'tr', [d0, d1], {})]});
    await C.regler(p, 2, 2); await C.outil(p, {k: 'main'});
    const cas = [['B', 0.9, 'près du bord droit, au-dessus de la barre de navigation'], ['D', 0.75, 'à gauche de la barre de navigation, à sa hauteur']];
    for (const [id, t, ou] of cas){
      await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 300);
      const e = await mesure(p), doc = await C.docCroquis(p), l = doc.el.find(x => x.id === id);
      const a = await C.ecranCv(p, l.v[0].x, l.v[0].y), c = await C.ecranCv(p, l.v[1].x, l.v[1].y), q = {x: a.x + t * (c.x - a.x), y: a.y + t * (c.y - a.y)};
      await C.toucherCv(p, q, 300);
      const bu = await bulle(p);
      R.ok(!!e.pan && !!bu && dansEcran(bu, e.W, e.H) && bu.touche === bu.n, 'b : fiche ouverte, barre de navigation sur ' + e.colonnes + ' colonne'
        + (e.colonnes > 1 ? 's' : '') + ' (' + rect(e.nav) + '), toucher ' + ou + ' : bulle « + point » entière à l\'écran, son centre et ses coins la donnent ('
        + (bu ? rect(bu) + ', ' + bu.touche + '/' + bu.n : 'aucune bulle') + ')');
      await p.keyboard.press('Escape'); await C.pause(p, 250);
    }
    erreurs(A, 'b');
  } finally { await A.fermer(); }
}

/* outil Tronçon après un premier point, panneau Fond, palette ouverte (s et t) */
async function tronconFondPalette(p){
  await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'}); await C.pause(p, 200);
  await C.toucherCv(p, await C.ecranCv(p, 1, 1), 400);
  await clic(p, '.vc [data-p="calques"]', 300); await clic(p, BOUTON, 300);
}

/* s : palette qui défile, touchée sur sa dernière puce : elle ne doit pas sauter. Défilement de la palette et dernière puce (clé, état,
   centre) ; puceEn : la puce en un point de la page (clé et état), ou ce qui s'y trouve */
const palette = p => p.evaluate(() => {
  const a = document.querySelector('.vc .vc-accroches'), bs = a.querySelectorAll('[data-accr]'), b = bs[bs.length - 1];
  if (a.hidden || !b) return {ouverte: false, sh: 0, ch: 0, st: 0};
  const q = b.getBoundingClientRect();
  return {ouverte: true, sh: a.scrollHeight, ch: a.clientHeight, st: a.scrollTop, k: b.dataset.accr, on: b.getAttribute('aria-pressed'),
    x: (q.left + q.right) / 2, y: (q.top + q.bottom) / 2};
});
const puceEn = (p, x, y) => p.evaluate(([x, y]) => {
  const e = document.elementFromPoint(x, y), b = e && e.closest('.vc-accroches [data-accr]');
  return b ? b.dataset.accr + ' ' + b.getAttribute('aria-pressed') : e ? (e.className ? '.' + String(e.className).split(' ')[0] : e.tagName.toLowerCase()) : 'rien';
}, [x, y]);
async function defilement(){
  const A = await croquis(400, 800), p = A.p;
  try {
    await tronconFondPalette(p);
    await p.evaluate(() => { const a = document.querySelector('.vc .vc-accroches'); a.scrollTop = a.scrollHeight; }); await C.pause(p, 100);
    const e0 = await palette(p), sous0 = e0.ouverte ? await puceEn(p, e0.x, e0.y) : '-';
    R.ok(e0.ouverte && e0.sh > e0.ch + 1 && e0.st > 0 && sous0 === e0.k + ' ' + e0.on, 's : 400 × 800, outil Tronçon, un point, panneau Fond : la palette'
      + ' ouverte défile (' + e0.sh + ' px de contenu pour ' + e0.ch + ' px de haut) ; défilée jusqu\'en bas (' + e0.st + ' px), sa dernière puce ('
      + (e0.k || '-') + ') se touche en son centre (' + sous0 + ')');
    if (e0.ouverte){
      await p.touchscreen.tap(e0.x, e0.y); await C.pause(p, 300);
      const e1 = await palette(p), sous1 = await puceEn(p, e0.x, e0.y);
      R.ok(e1.ouverte && e1.on !== e0.on && Math.abs(e1.st - e0.st) < 1 && sous1 === e0.k + ' ' + e1.on, 's : la dernière puce touchée bascule ('
        + e0.on + ' puis ' + e1.on + ') et la palette ne saute pas (défilement de ' + e0.st + ' puis ' + e1.st + ' px ; sous le doigt : ' + sous1 + ')');
      await p.touchscreen.tap(e0.x, e0.y); await C.pause(p, 300);
      const e2 = await palette(p), sous2 = await puceEn(p, e0.x, e0.y);
      R.ok(e2.ouverte && e2.on === e0.on && Math.abs(e2.st - e0.st) < 1 && sous2 === e0.k + ' ' + e0.on, 's : un second toucher au même endroit rétablit'
        + ' la puce (' + e2.on + ') ; défilement de ' + e2.st + ' px ; sous le doigt : ' + sous2);
    }
    erreurs(A, 's');
  } finally { await A.fermer(); }
}

/* t : la tablette tourne, la palette et le panneau Fond ouverts : barres et palette replacées à chaque taille ; puis le panneau se ferme
   (la palette reste ouverte) : elles sont replacées aussi */
async function rotation(){
  const A = await croquis(600, 960), p = A.p;
  try {
    await tronconFondPalette(p);
    const etapes = [[600, 960, 'au départ'], [960, 600, 'tournée en paysage'], [600, 960, 'revenue en portrait'], [600, 960, 'puis panneau Fond fermé']];
    for (const [w, h, quand] of etapes){
      const ferme = quand === 'puis panneau Fond fermé';
      if (ferme) await clic(p, '.vc [data-p="calques"]', 300);
      else if (quand !== 'au départ'){ await p.setViewportSize({width: w, height: h}); await C.pause(p, 400); }
      const e = await mesure(p), k = w + 'x' + h + ', ' + quand + ', outil Tronçon, un point, ' + (ferme ? '' : 'panneau Fond, ') + 'palette ouverte';
      R.ok(e.W === w && e.H === h && !!e.pal && (ferme ? !e.pan && !e.panneau : !!e.pan && e.panneau === 'calques'), 't : ' + k + ' : '
        + (ferme ? 'la palette reste ouverte' : 'le panneau Fond et la palette restent ouverts') + ' (' + (e.pan ? 'panneau ' + e.panneau : 'aucun panneau')
        + ', palette ' + (e.pal ? 'ouverte' : 'fermée') + ')');
      controler(e, k);
      controlerColonnes(e, w + 'x' + h, k);
    }
    erreurs(A, 't');
  } finally { await A.fermer(); }
}

(async () => {
  try {
    await dispositions();
    await lignes();
    await bullePoint();
    await defilement();
    await rotation();
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
