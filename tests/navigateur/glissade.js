// Toucher après un glissé vif (m171), dans Chromium : données fictives (étude et dossier de C.etudeEtDossier, « 12 rue Fictive »,
// « 99000 Ville-Exemple »), fond fictif de VCroquis.demoDxf(), croquis de démonstration.
// Le défaut : un glissé au doigt levé en mouvement, sur une surface en touch-action: none, lance une glissade inertielle (fling) que
// Chromium garde pour lui. Rien ne défile, on ne la voit pas ; mais le toucher suivant, tant qu'elle dure, ne fait que l'arrêter :
// pointerdown et pointerup arrivent, ni mousedown ni click, et le bouton touché n'agit pas. m171 empêche le défilement au touchmove sur
// chaque surface de dessin : aucune glissade n'est lancée [p] ; ce fichier vérifie que le toucher qui suit agit.
// Chaque section fait trois cycles : glissé vif (touchStart, dix touchMove, touchEnd aussitôt, par le protocole du navigateur), 50 ms,
// puis toucher au centre d'un bouton. À chaque cycle, deux contrôles : le glissé a fait son geste (l'application ne lit que les
// événements de pointeur, avant comme après m171) ; le bouton touché a agi (en cas d'échec, le message compte les événements reçus).
// a : aperçu du plan, page en « × 2 », glissé loin des étiquettes, bulles et textes : la page se déplace ; « Repères » touché ;
// b : canevas du croquis vide, outil « main » : la vue se déplace ; onglet « Sorties » touché : le panneau s'ouvre ;
// c : pavé « Signature du technicien » : le trait encre le pavé (pixels lus dans la page) ; « Effacer » touché : le pavé est vide ;
// d : éditeur du croquis de position, « Trait droit » : « Défaire » s'active ; « Défaire » touché : il est de nouveau désactivé ;
// e : vue d'ensemble de cet éditeur (mode « Détail ») : la vue se centre ailleurs (empreinte des pixels du canevas) ; bouton du zoom
//     (« Ensemble ») touché : aria-pressed passe à false.
// Hors de portée : un glissé vif ailleurs (barre, en-tête, boutons) ; les glissés vifs des autres tests restent tels quels.
// Sur 2cda811 (avant m171) : 20/35 ; les quinze touchers échouent, trois cycles sur trois dans chaque section (pointerdown et pointerup
// reçus, ni mousedown ni click) ; après : 35/35. Ni capture d'écran ni image : les pixels se lisent dans la page.
// usage : node tests/navigateur/glissade.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('glissade');

/* trois cycles ; une seconde entre deux cycles (une glissade lancée dure moins de 300 ms) ; toucher 50 ms après le lever ; effet attendu
   une seconde au plus */
const CYCLES = 3, ENTRE = 1000, APRES = 50, EFFET = 1000;

/* ---------- outils posés dans la page ---------- */
/* compteurs des événements reçus (phase de capture, remis à zéro après chaque glissé) ; encre du pavé de signature (pixels non
   transparents) ; empreinte des pixels du canevas de l'éditeur du croquis de position, deux images après l'appel */
function outilsPage(){
  if (window.__gl) return;
  window.__glN = {};
  ['pointerdown', 'pointerup', 'mousedown', 'click'].forEach(t => window.addEventListener(t, () => { window.__glN[t] = (window.__glN[t] || 0) + 1; }, true));
  window.__gl = {
    raz(){ window.__glN = {}; },
    recus(){ return ['pointerdown', 'pointerup', 'mousedown', 'click'].map(t => t + ' ' + (window.__glN[t] || 0)).join(', '); },
    encre(){
      const cv = document.querySelector('#modal-root canvas.sigpad'); if (!cv) return -1;
      const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; let n = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i]) n++;
      return n;
    },
    empreinte(){
      return new Promise(res => requestAnimationFrame(() => requestAnimationFrame(() => {
        const cv = document.querySelector('#modal-root .ce-cv'); if (!cv){ res(null); return; }
        const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; let h = 0;
        for (let i = 0; i < d.length; i += 4) h = (Math.imul(h, 31) + d[i] + 7 * d[i + 1] + 13 * d[i + 2]) | 0;
        res(h);
      })));
    }
  };
}
const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ').slice(0, 300) : ''));
const boite = (p, sel) => p.evaluate(sel => { const e = document.querySelector(sel); if (!e) return null; const b = e.getBoundingClientRect(); return {l: b.left, t: b.top, w: b.width, h: b.height}; }, sel);
const centreDe = (p, sel) => p.evaluate(sel => { const e = document.querySelector(sel); if (!e) return null; e.scrollIntoView({block: 'nearest'}); const r = e.getBoundingClientRect();
  return {x: r.left + r.width / 2, y: r.top + r.height / 2}; }, sel);

/* glissé vif au doigt de a à b (points de la page) : touchStart, dix touchMove et touchEnd aussitôt ; le doigt se lève en mouvement */
async function glisseVif(cdp, a, b){
  const t = (type, q) => cdp.send('Input.dispatchTouchEvent', {type, touchPoints: q ? [{x: q.x, y: q.y, id: 1}] : []});
  await t('touchStart', a);
  for (let k = 1; k <= 10; k++) await t('touchMove', {x: a.x + (b.x - a.x) * k / 10, y: a.y + (b.y - a.y) * k / 10});
  await t('touchEnd', null);
}
/* un cycle : glissé vif de a à b ; pendant les 50 ms qui suivent, relevé de l'état (fonction de la page) et compteurs remis à zéro ;
   toucher au centre q du bouton ; attente de l'effet (fonction de la page, vraie quand le bouton a agi ; elle reçoit le relevé) ;
   rend le relevé, l'effet obtenu et les événements reçus depuis le glissé */
async function cycle(p, cdp, a, b, releve, q, effet){
  await glisseVif(cdp, a, b);
  const [apres] = await Promise.all([p.evaluate(releve), p.evaluate(() => window.__gl.raz()), C.pause(p, APRES)]);
  await p.touchscreen.tap(q.x, q.y);
  const agi = await p.waitForFunction(effet, apres, {timeout: EFFET}).then(() => true, () => false);
  return {apres, agi, recus: await p.evaluate(() => window.__gl.recus())};
}
const recus = r => r.agi ? '' : ' (reçus après le glissé : ' + r.recus + ')';

/* ---------- ouvertures ---------- */
/* croquis de démonstration (fond fictif), échelle automatique, état des lieux (comme dans navigateur/apercu.js) */
async function demo(p){
  await p.evaluate(() => {
    const ed = window.__vcEd, S = ed.etat, d = window.VCroquis.demoCroquis(S.fond);
    S.doc.el = d.el; S.doc.anomManu = d.anomManu || []; S.doc.decisions = d.decisions || {}; S.doc.ordre = d.ordre || []; S.doc.rot = d.rot || 0; S.doc.echelle = 0;
    S.undo = []; S.redo = []; S.sel = null; S.panneau = null; S.mode = 'edl'; ed.synchroniser();
  });
  await C.pause(p, 300);
}
/* fin du calcul et du rendu de l'aperçu (comme dans navigateur/apercu.js) */
const attendre = p => p.waitForFunction(() => { const S = window.__vcEd.etat, o = document.querySelector('.vc .vc-pp'), cv = o && o.querySelector('.vc-pp-cv');
  return !!S.pp && !S.pp.calcul && !!S.pp.rel && o.getAttribute('aria-busy') !== 'true' && !!cv && !cv.style.transform; }, null, {timeout: 10000});
/* aperçu ouvert par le vrai chemin : panneau Sorties, toucher « Aperçu du plan » */
async function ouvrirApercu(p){
  if (await p.evaluate(() => window.__vcEd.etat.panneau) !== 'sorties') await p.click('.vc .vc-barre [data-p="sorties"]');
  await p.waitForSelector('.vc .vc-pcorps [data-a="apercu"]', {timeout: 2500});
  const q = await centreDe(p, '.vc .vc-pcorps [data-a="apercu"]');
  await p.touchscreen.tap(q.x, q.y);
  await attendre(p);
}
/* écran du constat du dossier */
async function versConstat(p){
  await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; });
  await p.waitForSelector('[data-act="c-sign"][data-who="tech"]', {timeout: 10000});
  await C.pause(p, 600);
}
/* éditeur du croquis de position, depuis l'écran du constat */
async function ouvrirPosition(p){
  await versConstat(p);
  await p.click('button[data-act="c-croquis"]');
  await p.waitForSelector('#modal-root .ce .ce-cv', {timeout: 5000});
  await C.pause(p, 600);
}

/* ---------- a : aperçu du plan ---------- */
/* point de départ d'un glissé de d (px) dans la zone de l'aperçu, loin (40 px) de la portée de prise de chaque étiquette, bulle ou texte
   de la page 1 (celle de candidatsApercu : la boîte de ses formes, au moins 22 px de chaque côté de son centre) ; départ et arrivée à
   plus de 20 px des bords de la zone ; départ sur la zone (pas sur un bouton) */
const libre = (p, d) => p.evaluate(d => {
  const s = window.__vcEd.etat.pp, zone = document.querySelector('.vc .vc-pp-zone'), z = zone.getBoundingClientRect(), B = [];
  s.rel.marques.forEach((m, i) => {
    const F = s.chev.formes[i]; if (!F || m.page !== 1 || !/^(etiq|tx|bulle)$/.test(m.k)) return;
    const b = F.reduce((a, f) => { const r = f.c ? [f.c[0] - f.c[2], f.c[1] - f.c[2], f.c[0] + f.c[2], f.c[1] + f.c[2]] : f.b;
      return [Math.min(a[0], r[0]), Math.min(a[1], r[1]), Math.max(a[2], r[2]), Math.max(a[3], r[3])]; }, [Infinity, Infinity, -Infinity, -Infinity]);
    const cx = s.ox + (b[0] + b[2]) / 2 * s.k, cy = s.oy + (b[1] + b[3]) / 2 * s.k;
    const hw = Math.max((b[2] - b[0]) / 2 * s.k, 22) + 40, hh = Math.max((b[3] - b[1]) / 2 * s.k, 22) + 40;
    B.push([cx - hw, cy - hh, cx + hw, cy + hh]);
  });
  const dedans = (x, y) => x > 20 && y > 20 && x < z.width - 20 && y < z.height - 20;
  for (let j = 1; j < 20; j++) for (let i = 1; i < 20; i++){
    const x = z.width * i / 20, y = z.height * j / 20;
    if (!dedans(x, y) || !dedans(x + d.x, y + d.y) || B.some(b => x >= b[0] && x <= b[2] && y >= b[1] && y <= b[3])) continue;
    const e = document.elementFromPoint(z.left + x, z.top + y);
    if (!e || !zone.contains(e)) continue;
    return {a: {x: z.left + x, y: z.top + y}, b: {x: z.left + x + d.x, y: z.top + y + d.y}};
  }
  return null;
}, d);
async function apercu(){
  const A = await C.ouvrir(), p = A.p; let cdp = null;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p); await demo(p);
    await ouvrirApercu(p);
    const q2 = await centreDe(p, '.vc .vc-pp [data-pp="zoom"][data-v="2"]'); await p.touchscreen.tap(q2.x, q2.y);
    await p.waitForFunction(() => window.__vcEd.etat.pp.z === 2, null, {timeout: 3000}); await attendre(p);
    await p.evaluate(outilsPage); cdp = await p.context().newCDPSession(p);
    const etat = () => { const s = window.__vcEd.etat.pp, b = document.querySelector('.vc .vc-pp [data-pp="reperes"]');
      return {ox: s.ox, oy: s.oy, pas: s.pas, reperes: s.reperes, aria: b.getAttribute('aria-pressed')}; };
    for (let n = 1; n <= CYCLES; n++){
      await C.pause(p, ENTRE); await attendre(p);
      const sens = n % 2 ? 1 : -1, g = await libre(p, {x: 100 * sens, y: 60 * sens});
      if (!g) throw new Error('a' + n + ' : aucun point libre dans la zone de l\'aperçu');
      const q = await centreDe(p, '.vc .vc-pp [data-pp="reperes"]'), avant = await p.evaluate(etat);
      const r = await cycle(p, cdp, g.a, g.b, etat, q, av => { const s = window.__vcEd.etat.pp, b = document.querySelector('.vc .vc-pp [data-pp="reperes"]');
        return !!s && s.reperes !== av.reperes && b.getAttribute('aria-pressed') === String(s.reperes); });
      const dep = Math.hypot(r.apres.ox - avant.ox, r.apres.oy - avant.oy);
      R.ok(dep > 5 && r.apres.pas === avant.pas, 'a' + n + ' : le glissé vif déplace la page de l\'aperçu (' + Math.round(dep) + ' px), sans déplacer de marque (pas ' + avant.pas + ' → ' + r.apres.pas + ')');
      R.ok(r.agi, 'a' + n + ' : « Repères » touché 50 ms après agit (aria-pressed ' + r.apres.aria + ' → ' + (r.agi ? String(!r.apres.reperes) : r.apres.aria) + ')' + recus(r));
    }
    erreurs(A, 'a : aperçu du plan');
  } finally { if (cdp) await cdp.detach().catch(() => {}); await A.fermer(); }
}

/* ---------- b : canevas du croquis ---------- */
async function canevas(){
  const A = await C.ouvrir(), p = A.p; let cdp = null;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
    await p.evaluate(outilsPage); cdp = await p.context().newCDPSession(p);
    const etat = () => { const S = window.__vcEd.etat; return {cx: S.vue.cx, cy: S.vue.cy, panneau: S.panneau || ''}; };
    for (let n = 1; n <= CYCLES; n++){
      await C.pause(p, ENTRE);
      /* panneau ouvert par le cycle précédent : refermé à la souris */
      if (await p.evaluate(() => window.__vcEd.etat.panneau)){
        await p.click('.vc .vc-barre [data-p="sorties"]'); await p.waitForFunction(() => !window.__vcEd.etat.panneau, null, {timeout: 3000}); await C.pause(p, 300);
      }
      await C.outil(p, {k: 'main'});
      const c = await boite(p, '.vc .vc-cv'), sens = n % 2 ? 1 : -1;
      const a = {x: c.l + c.w / 2 - 120 * sens, y: c.t + c.h / 2 - 50 * sens}, b = {x: c.l + c.w / 2 + 120 * sens, y: c.t + c.h / 2 + 50 * sens};
      await C.surLePlan(p, a, 'le glissé'); await C.surLePlan(p, b, 'le glissé');
      const q = await centreDe(p, '.vc .vc-barre [data-p="sorties"]'), avant = await p.evaluate(etat);
      const r = await cycle(p, cdp, a, b, etat, q, () => window.__vcEd.etat.panneau === 'sorties');
      const dep = Math.hypot(r.apres.cx - avant.cx, r.apres.cy - avant.cy);
      R.ok(dep > 1e-6 && !avant.panneau, 'b' + n + ' : le glissé vif déplace la vue du croquis (' + dep.toFixed(2) + ' m)');
      R.ok(r.agi, 'b' + n + ' : l\'onglet « Sorties » touché 50 ms après ouvre son panneau' + recus(r));
    }
    erreurs(A, 'b : canevas du croquis');
  } finally { if (cdp) await cdp.detach().catch(() => {}); await A.fermer(); }
}

/* ---------- c : pavé de signature ---------- */
async function signature(){
  const A = await C.ouvrir(), p = A.p; let cdp = null;
  try {
    await C.etudeEtDossier(p); await versConstat(p);
    await p.evaluate(outilsPage); cdp = await p.context().newCDPSession(p);
    for (let n = 1; n <= CYCLES; n++){
      await C.pause(p, ENTRE);
      await p.click('[data-act="c-sign"][data-who="tech"]');
      await p.waitForSelector('#modal-root canvas.sigpad', {timeout: 3000}); await C.pause(p, 400);
      const c = await boite(p, '#modal-root canvas.sigpad'), sens = n % 2 ? 1 : -1;
      const a = {x: c.l + c.w * (sens > 0 ? 0.2 : 0.8), y: c.t + c.h * (sens > 0 ? 0.35 : 0.65)}, b = {x: c.l + c.w * (sens > 0 ? 0.8 : 0.2), y: c.t + c.h * (sens > 0 ? 0.65 : 0.35)};
      const q = await centreDe(p, '#modal-root .m-foot .btn[data-mi="1"]'), avant = await p.evaluate(() => window.__gl.encre());
      const r = await cycle(p, cdp, a, b, () => window.__gl.encre(), q, () => window.__gl.encre() === 0);
      R.ok(avant === 0 && r.apres > 0, 'c' + n + ' : le glissé vif trace un trait dans le pavé (' + avant + ' → ' + r.apres + ' pixels encrés)');
      R.ok(r.agi, 'c' + n + ' : « Effacer » touché 50 ms après vide le pavé' + (r.agi ? '' : ' (' + (await p.evaluate(() => window.__gl.encre())) + ' pixels encrés)') + recus(r));
      await p.click('#modal-root .m-foot .btn[data-mi="0"]');
      await p.waitForFunction(() => !document.querySelector('#modal-root canvas.sigpad'), null, {timeout: 3000});
    }
    erreurs(A, 'c : pavé de signature');
  } finally { if (cdp) await cdp.detach().catch(() => {}); await A.fermer(); }
}

/* ---------- d : éditeur du croquis de position ---------- */
async function position(){
  const A = await C.ouvrir(), p = A.p; let cdp = null;
  try {
    await C.etudeEtDossier(p); await ouvrirPosition(p);
    await p.evaluate(outilsPage); cdp = await p.context().newCDPSession(p);
    const etat = () => { const o = document.querySelector('#modal-root [data-ce="tool"][aria-pressed="true"]');
      return {defaire: document.querySelector('#modal-root [data-ce="undo"]').disabled ? 'désactivé' : 'actif', outil: o ? o.dataset.v : ''}; };
    for (let n = 1; n <= CYCLES; n++){
      await C.pause(p, ENTRE);
      /* trait laissé par le cycle précédent : défait à la souris */
      for (let k = 0; k < 5 && (await p.evaluate(etat)).defaire === 'actif'; k++){ await p.click('#modal-root [data-ce="undo"]'); await C.pause(p, 200); }
      const c = await boite(p, '#modal-root .ce-cv'), sens = n % 2 ? 1 : -1, y = c.t + c.h * [0.3, 0.5, 0.7][n - 1];
      const a = {x: c.l + c.w * (sens > 0 ? 0.25 : 0.65), y}, b = {x: c.l + c.w * (sens > 0 ? 0.65 : 0.25), y};
      const q = await centreDe(p, '#modal-root [data-ce="undo"]'), avant = await p.evaluate(etat);
      const r = await cycle(p, cdp, a, b, etat, q, () => document.querySelector('#modal-root [data-ce="undo"]').disabled);
      R.ok(avant.outil === 'ligne' && avant.defaire === 'désactivé' && r.apres.defaire === 'actif', 'd' + n + ' : le glissé vif trace un trait droit (outil ' + avant.outil + ', « Défaire » ' + avant.defaire + ' → ' + r.apres.defaire + ')');
      R.ok(r.agi, 'd' + n + ' : « Défaire » touché 50 ms après défait le trait (« Défaire » de nouveau désactivé)' + recus(r));
    }
    await p.click('#modal-root [data-ce="done"]');
    await p.waitForFunction(() => !document.querySelector('#modal-root .ce'), null, {timeout: 5000});
    erreurs(A, 'd : éditeur du croquis de position');
  } finally { if (cdp) await cdp.detach().catch(() => {}); await A.fermer(); }
}

/* ---------- e : vue d'ensemble de l'éditeur du croquis de position ---------- */
/* cadre du croquis dans la vue d'ensemble (comme paintMini : cadre de 520 × 124, centré en largeur) */
const cadreMini = p => p.evaluate(() => { const b = document.querySelector('#modal-root .ce-mini canvas').getBoundingClientRect(), k = Math.min(b.width / 520, b.height / 124);
  return {l: b.left + (b.width - 520 * k) / 2, t: b.top, w: 520 * k, h: 124 * k}; });
async function ensemble(){
  const A = await C.ouvrir(), p = A.p; let cdp = null;
  try {
    await C.etudeEtDossier(p); await ouvrirPosition(p);
    await p.evaluate(outilsPage); cdp = await p.context().newCDPSession(p);
    const zoom = '#modal-root [data-ce="zoom"]', aria = () => document.querySelector('#modal-root [data-ce="zoom"]').getAttribute('aria-pressed');
    for (let n = 1; n <= CYCLES; n++){
      await C.pause(p, ENTRE);
      /* mode « Détail », par un toucher sans glissé */
      if (await p.evaluate(aria) !== 'true'){
        const qz = await centreDe(p, zoom); await p.touchscreen.tap(qz.x, qz.y);
        await p.waitForFunction(() => document.querySelector('#modal-root [data-ce="zoom"]').getAttribute('aria-pressed') === 'true', null, {timeout: 3000}); await C.pause(p, 400);
      }
      const m = await cadreMini(p), sens = n % 2 ? 1 : -1;
      const a = {x: m.l + m.w * (sens > 0 ? 0.3 : 0.7), y: m.t + m.h / 2}, b = {x: m.l + m.w * (sens > 0 ? 0.7 : 0.3), y: m.t + m.h / 2};
      const q = await centreDe(p, zoom), avant = await p.evaluate(() => window.__gl.empreinte());
      const r = await cycle(p, cdp, a, b, () => window.__gl.empreinte(), q, () => document.querySelector('#modal-root [data-ce="zoom"]').getAttribute('aria-pressed') === 'false');
      R.ok(avant != null && r.apres != null && r.apres !== avant, 'e' + n + ' : le glissé vif sur la vue d\'ensemble centre la vue ailleurs (empreinte du canevas ' + (r.apres !== avant ? 'changée' : 'inchangée') + ')');
      R.ok(r.agi, 'e' + n + ' : le bouton du zoom (« Ensemble ») touché 50 ms après agit (aria-pressed à false)' + recus(r));
    }
    erreurs(A, 'e : vue d\'ensemble');
  } finally { if (cdp) await cdp.detach().catch(() => {}); await A.fermer(); }
}

(async () => {
  for (const f of [apercu, canevas, signature, position, ensemble]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception du test : ' + String(e && e.stack || e).split('\n').slice(0, 2).join(' ')); }
  }
  R.fin();
})();
