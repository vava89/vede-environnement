// Souris dans l'éditeur du croquis, dans Chromium (données fictives, fond fictif de VCroquis.demoDxf()) : correctif m100.
// c : un clic droit ou du milieu ne pose rien et ne choisit rien ; sur le plan, le menu du navigateur est empêché ; témoins : un clic
//     gauche pose un regard, puis le choisit ;
// g : un glissé au bouton droit depuis l'objet choisi ou une poignée du tracé choisi (sommet, milieu) déplace la vue, le dessin ne change
//     pas ; témoins : au bouton droit avec un outil de tracé, la vue bouge sans tracé ; au bouton gauche, le sommet suit la souris ;
// s : survol à la souris, sans bouton : la position est gardée (état S.survol, en pixels du canevas), suit la souris sans redessiner le
//     plan, et s'efface quand la souris quitte le plan ; elle ne suit pas un glissé bouton appuyé, puis prend le point de lever ; elle
//     s'efface quand le bouton est levé hors du plan, et quand le croquis se rouvre ; témoin : le stylet qui survole ne la change pas ;
// d : témoins au doigt : un toucher pose un regard, un glissé depuis un sommet du tracé choisi le déplace.
// c, g et s échouent sur 1e27c7b (sauf les témoins) ; d passe sur les deux versions.
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

(async () => {
  for (const f of [clics, glisses, survol, doigt]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception du test : ' + (e && e.stack || e)); }
  }
  R.fin();
})();
