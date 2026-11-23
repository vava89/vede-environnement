// Gestes de l'éditeur du croquis, au doigt, dans Chromium (données fictives, fond fictif de VCroquis.demoDxf()) : corrections de v1.6.2.
// r : un ouvrage touché à côté d'un raccord posé d'office (deux tuyaux s'y rejoignent) prend sa place, les deux tuyaux passent par lui ;
// c : plan vu de près, un regard touché juste au-delà d'un coude libre prend ce coude, sans second sommet caché sous le symbole ;
// m : une descente touchée près d'une façade, à côté d'un tuyau qui passe, se cale sur la façade ; témoin : posée sur l'extrémité libre
//     d'un tuyau, elle la prend et reste au bout du tuyau ;
// t : triple toucher quand la fiche fait glisser le plan : un seul objet posé.
// p : une boîte qui a pris la place d'un raccord puis passe « Projet » : l'état des lieux garde ses tuyaux raccordés (« pas de boîte »
//     reste au dossier) ;
// s : un regard qui a pris la place d'un raccord, aussitôt supprimé : ses tuyaux restent raccordés (un raccord revient à sa place) ;
// b : un regard touché sur le bout libre d'un tuyau prend ce bout, même avec un raccord du même tuyau sous son symbole ;
// o : un clapet qui prend la place d'un raccord suit le tuyau touché (orientation automatique), dans le sens de l'eau (tuyau tracé à
//     l'envers et indiqué « Sens inverse » ; branchement d'une boîte tracé depuis le collecteur ; trop-plein d'un puisard tracé depuis le
//     puisard) ; une gargouille regarde vers la sortie de l'eau, même quand le raccord est le premier sommet ;
// s : aussi pour un exutoire (puisard) supprimé.
// Disque de rotation (m154 ; décision D22 ; réponse S10 b ; d et a échouent sur ee82072, qui n'a pas de disque, sauf les témoins de d) :
// d : un objet qui tourne (caniveau, regard…), choisi, est entouré d'un anneau fin à 22 px de sa zone de toucher, avec une poignée ronde
//     au-dessus de lui, qui tourne avec lui ; la poignée glissée d'un quart de tour : 90° ; l'anneau pris ailleurs : rotation sans saut ;
//     au degré près (37°), de 0 à 359 ; une bulle montre l'angle pendant le geste ; un pas d'annulation par geste, aucun sans changement ;
//     Échap rend l'angle ; puces de 15° dans la fiche d'un regard ; l'angle suit un changement de type vers un type qui tourne.
//     Témoins : ni anneau ni poignée sans objet choisi, pour un WC, une infiltration au sol, un autre outil, le mode Cotes ; le corps de
//     l'objet et son étiquette gardent la main, au petit zoom aussi ; vers un WC, l'angle s'efface ;
// a : aimant actif, l'angle se cale à 5° au plus sur la direction d'un linéaire à 3 m au plus de l'objet, ou sur sa perpendiculaire :
//     côté du bâti, trait de complément, tronçon raccordé ou qui passe, collecteur, limite de parcelle si elle est cochée ; la bulle le
//     dit (« 30°, parallèle », « 120°, perpendiculaire ») ; aimant coupé, à 45° de tout ou à 6° : l'angle du doigt. Point de test, dont
//     le mât est dessiné le long de son axe y : les deux mots s'échangent (« 30°, perpendiculaire ») ; plan tourné d'un demi-radian :
//     le trait est pris dans le repère du fond, l'angle se cale de même, aimant coupé il suit le doigt, la poignée tourne avec le plan.
// Relecture de m154, corrigée avant son commit (e, g et le point de test de a échouent sur la version relue, sauf leurs témoins ;
// le plan tourné de a, témoin de la relecture, y passait déjà ; sur ee82072, sans disque, tout échoue, sauf les deux témoins de e qui
// prennent l'étiquette et la bulle en leur centre, et son contrôle de la console ; g s'y arrête à sa mise en place) :
// e : la poignée se pose ailleurs sur l'anneau (à l'opposé, de côté) quand l'étiquette ou une bulle de l'objet occupe sa place : regard
//     à 270° (son étiquette d'office est à droite, là où irait la poignée), à 40 et 80 px/m ; regard sur un tuyau horizontal, avec la
//     bulle d'une anomalie au-dessus de lui, à 40 et 80 px/m ; clapet à 270°, au 1/100 : prise là où elle est dessinée, elle tourne
//     l'objet, sans déplacer l'étiquette ni la bulle, en un pas d'annulation, et reste sous le doigt pendant le geste. Témoins :
//     l'étiquette et la bulle prises en leur centre se déplacent toujours, sans tourner l'objet ; l'étiquette d'office d'un regard
//     droit, à sa droite, laisse la poignée au-dessus de lui. Marges : la place de la poignée près de l'étiquette ou de la bulle, sans
//     être dessus (regard à l'angle qui la met à 9 px de la boîte de l'étiquette, ou à 12 px du bord de la bulle) : la poignée se pose
//     ailleurs et, prise à 11 px de son centre du côté de l'étiquette ou de la bulle, tourne l'objet sans les déplacer ; un quart de
//     tour en trois pas : la place de la poignée se libère en chemin, la poignée reste sous le doigt et n'y revient qu'au lever ;
// g : gestes du disque qui ne changent rien : tourné puis ramené au départ, ou Échap à la souris, après une annulation : « Rétablir »
//     reste actif et rend l'angle annulé ; un toucher bref sur la poignée ou l'anneau, ou un glissé de 5 px sur la poignée : rien ne
//     tourne, l'objet reste choisi, sa fiche ouverte, sans pas d'annulation ; la poignée posée sur le tuyau d'un regard, touchée : le
//     tuyau ne se choisit pas. Témoins : sans annulation, « Rétablir » reste grisé ; un WC sous l'anneau, ou le tuyau touché sur
//     l'anneau, se choisit.
//     Les pixels du canevas sont lus (anneau gris, poignée, encre de la bulle) ; S.disque dit ce que l'éditeur a dessiné.
// m156 (EL1 de la relecture d'ensemble de la v1.7.2 ; échouent sur c5f8caf, sauf les témoins) :
// h : appui sur la poignée ou l'anneau du disque, puis Échap avant le seuil du glissé (4 px à la souris, 9 px au doigt) : l'attente du
//     geste est close ; le regard reste choisi, sa fiche ouverte, son disque visible ; le reste du glissé (40°) et le lever n'ont plus
//     d'effet : rien ne tourne (p.a toujours absent), rien ne se choisit, aucun pas d'annulation, « Rétablir » intact (il tient l'angle
//     d'une annulation faite avant) ; un second Échap ferme la fiche. À la souris (poignée, anneau), au doigt (poignée), au doigt sur
//     l'anneau par le retour d'Android (history.back : la fenêtre du croquis reste ouverte) ; fermerNiveau appelé directement rend true
//     et clôt l'attente. Avant : la fiche se fermait, et le glissé qui suivait tournait le regard, sans disque, en un pas d'annulation.
//     Témoins : Échap après le seuil (d et g, m154) ; l'attente d'un autre geste (appui sur le regard lui-même) n'est pas close par
//     fermerNiveau, qui ferme la fiche, comme avant.
// usage : node tests/navigateur/gestes.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('gestes'), V = process.argv.indexOf('-v') >= 0;

/* Dossier neuf et croquis ouvert sur le fond fictif. */
async function croquisNeuf(){
  const A = await C.ouvrir(); await C.etudeEtDossier(A.p); await C.ouvrirCroquis(A.p); return A;
}
const pts = d => d.el.filter(e => e.k === 'pt'), lns = d => d.el.filter(e => e.k === 'ln');

/* r : ouvrage sur un raccord posé d'office */
async function raccord(){
  const A = await croquisNeuf(), p = A.p;
  try {
    /* plan vu d'assez près pour qu'un toucher tombe sous le symbole de la fosse sans viser le raccord lui-même (zone du symbole + 4 px) */
    await C.zoomerJusqua(p, async () => (await C.rayonPx(p, 'fosse')) > 2 * ((await C.rayonPx(p, 'jonction')) + 4) + 6);
    const v = await C.vue(p), x0 = v.cx, y0 = v.cy, k = Math.min(1, 300 / v.s / 4);
    await C.outil(p, {k: 'pt', t: 'wc', pal: 'eu'}); await C.toucher(p, x0 - 2 * k, y0 + 2 * k);
    await C.outil(p, {k: 'pt', t: 'evier', pal: 'eu'}); await C.toucher(p, x0 + 2 * k, y0);
    await C.outil(p, {k: 'ln', id: 'tr', pal: 'trace'});
    await C.toucher(p, x0 - 2 * k, y0 + 2 * k, 1100); await C.toucher(p, x0 - 2 * k, y0 - 2 * k); await C.toucher(p, x0 - 2 * k, y0 - 2 * k, 1100);
    await C.toucher(p, x0 + 2 * k, y0); await C.toucher(p, x0 - 2 * k, y0, 1100);
    const d1 = await C.docCroquis(p), j = pts(d1).filter(e => e.t === 'jonction');
    R.ok(j.length === 1, 'r : raccord posé d\'office où le tuyau de l\'évier rejoint celui du WC (' + j.length + ')');
    const rJ = await C.rayonPx(p, 'jonction'), rF = await C.rayonPx(p, 'fosse'), dpx = (rJ + 4 + rF) / 2;
    if (V) R.info('r : vue ' + v.s.toFixed(1) + ' px/m, raccord ' + rJ.toFixed(1) + ' px, fosse ' + rF.toFixed(1) + ' px, toucher à ' + dpx.toFixed(1) + ' px du raccord');
    await C.outil(p, {k: 'pt', t: 'fosse', pal: 'equ'}); await C.toucher(p, x0 - 2 * k, y0 - dpx / v.s);
    const d2 = await C.docCroquis(p), f = pts(d2).find(e => e.t === 'fosse'), j2 = pts(d2).filter(e => e.t === 'jonction');
    const tw = lns(d2).find(l => l.v[0].a === (pts(d2).find(e => e.t === 'wc') || {}).id), te = lns(d2).find(l => l.v[0].a === (pts(d2).find(e => e.t === 'evier') || {}).id);
    const bon = !!f && !j2.length && !!tw && !!te && tw.v.some(v => v.a === f.id) && te.v[te.v.length - 1].a === f.id;
    R.ok(bon, 'r : la fosse prend la place du raccord, les deux tuyaux passent par elle'
      + (bon ? '' : ' (raccords ' + j2.length + ', tuyau du WC ' + (tw ? tw.v.map(v => v.a ? (v.a === (f || {}).id ? 'F' : 'o') : '·').join('') : '?') + ', tuyau de l\'évier finit sur ' + (te ? (te.v[te.v.length - 1].a === (f || {}).id ? 'la fosse' : 'autre chose') : '?') + ')'));
    R.ok(!A.erreurs.length, 'r : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* c : coude libre, plan vu de près */
async function coude(){
  const A = await croquisNeuf(), p = A.p;
  try {
    /* points du tuyau à 80 px l'un de l'autre : un toucher près du dernier point termine le tracé */
    const v = await C.vue(p), x0 = v.cx, y0 = v.cy, k = 80 / v.s;
    await C.outil(p, {k: 'ln', id: 'tr', pal: 'trace'});
    await C.toucher(p, x0 - k, y0 + k); await C.toucher(p, x0 - k, y0); await C.toucher(p, x0 + k, y0); await C.toucher(p, x0 + k, y0, 1100);
    const d1 = await C.docCroquis(p), l1 = lns(d1)[0];
    R.ok(!!l1 && l1.v.length === 3 && !l1.v[1].a, 'c : tuyau tracé avec un coude libre (' + (l1 ? l1.v.length + ' sommets' : 'absent') + ')');
    if (!l1 || l1.v.length !== 3) return;
    /* plan amené sur le coude, puis zoom avant jusqu'à ce que le symbole du regard (à l'échelle du croquis dessiné) dépasse nettement la
       zone d'accroche des sommets (16 px) */
    await p.evaluate(([x, y]) => { const S = window.__vcEd.etat; S.vue.cx = x; S.vue.cy = y; window.__vcEd.redessiner(); }, [l1.v[1].x, l1.v[1].y]);
    await C.zoomerJusqua(p, async () => (await C.rayonPx(p, 'regard')) * 0.6 > 30);
    /* regard touché en dehors du coin : au-delà de l'accroche des sommets et des segments, sous le symbole dessiné */
    const rN = await C.rayonPx(p, 'regard'), s = (await C.vue(p)).s, D = (16 + rN * 0.6) / 2, dd = D / s / Math.SQRT2;
    if (V) R.info('c : vue ' + s.toFixed(1) + ' px/m, symbole du regard ' + rN.toFixed(1) + ' px, toucher à ' + D.toFixed(1) + ' px du coude');
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.toucher(p, l1.v[1].x - dd, l1.v[1].y - dd);
    const d2 = await C.docCroquis(p), l2 = lns(d2)[0], rg = pts(d2).find(e => e.t === 'regard'), w1 = l1 && l1.v[1];
    const bon = !!rg && !!l2 && !!w1 && l2.v.length === 3 && l2.v[1].a === rg.id && Math.hypot(rg.x - w1.x, rg.y - w1.y) < 0.01;
    R.ok(bon, 'c : le regard prend le coude, sans second sommet' + (bon ? '' : ' (' + (l2 ? l2.v.length + ' sommets, ' + l2.v.map(w => w.a ? 'o' : '·').join('') : 'tuyau absent') + (rg && w1 ? ', regard à ' + Math.hypot(rg.x - w1.x, rg.y - w1.y).toFixed(2) + ' m du coude' : ', pas de regard') + ')'));
    R.ok(!A.erreurs.length, 'c : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* Côté de bâti du fond (repère du croquis) d'au moins 5 m, le plus proche du centre de la vue, avec la normale vers l'extérieur. */
async function facade(p){
  return p.evaluate(() => {
    const S = window.__vcEd.etat, f = S.fond, off = window.VCroquis.decalageFond(f, S.doc) || {x: 0, y: 0}, c = {x: S.vue.cx, y: S.vue.cy}, polys = [];
    f.L.forEach(l => { const cq = f.calques[l.c]; if (!cq || (cq.style !== 'bati' && cq.style !== 'batileger') || !cq.vis) return;
      const P = []; for (let k = 0; k < l.n; k++) P.push({x: f.xy[2 * (l.d + k)] + off.x, y: f.xy[2 * (l.d + k) + 1] + off.y}); polys.push(P); });
    const dedans = (q, P) => { let o = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++){ if ((P[i].y > q.y) !== (P[j].y > q.y) && q.x < (P[j].x - P[i].x) * (q.y - P[i].y) / (P[j].y - P[i].y) + P[i].x) o = !o; } return o; };
    let best = null;
    polys.forEach(P => { for (let k = 1; k < P.length; k++){ const a = P[k - 1], b = P[k], L = Math.hypot(b.x - a.x, b.y - a.y); if (L < 5) continue;
      const m = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2}, d = Math.hypot(m.x - c.x, m.y - c.y); if (best && d >= best.d) continue;
      const t = {x: (b.x - a.x) / L, y: (b.y - a.y) / L}; let n = {x: -t.y, y: t.x};
      if (polys.some(Q => dedans({x: m.x + 0.8 * n.x, y: m.y + 0.8 * n.y}, Q))) n = {x: t.y, y: -t.x};
      if (polys.some(Q => dedans({x: m.x + 0.8 * n.x, y: m.y + 0.8 * n.y}, Q))) continue;
      best = {d, m, t, n, a, b}; } });
    return best;
  });
}
const distSeg = (q, a, b) => { const dx = b.x - a.x, dy = b.y - a.y, t = Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / (dx * dx + dy * dy))); return Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy); };

/* m : règle du mur */
async function mur(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const F = await facade(p);
    R.ok(!!F, 'm : façade du fond fictif trouvée près du centre de la vue');
    if (!F) return;
    const v = await C.vue(p), px = 1 / v.s, P = (u, w) => ({x: F.m.x + u * F.t.x + w * F.n.x, y: F.m.y + u * F.t.y + w * F.n.y});
    /* le plan montre la façade au centre */
    await p.evaluate(([x, y]) => { const S = window.__vcEd.etat; S.vue.cx = x; S.vue.cy = y; window.__vcEd.redessiner(); }, [F.m.x, F.m.y]);
    /* tuyau sans réseau le long de la façade, à 2 px du mur, libre aux deux bouts, puis descente touchée à 6 px du mur, à côté du tuyau */
    const a = P(-2.5, 2 * px), b = P(2.5, 2 * px);
    await C.outil(p, {k: 'ln', id: 'tr', pal: 'trace'}); await C.toucher(p, a.x, a.y); await C.toucher(p, b.x, b.y); await C.toucher(p, b.x, b.y, 1100);
    const d1 = await C.docCroquis(p), l1 = lns(d1)[0];
    R.ok(!!l1 && l1.v.length === 2 && !l1.v[0].a && !l1.v[1].a, 'm : tuyau tracé le long de la façade, libre aux deux bouts');
    const q = P(0.5, 6 * px);
    await C.outil(p, {k: 'pt', t: 'descente', pal: 'ep'}); await C.toucher(p, q.x, q.y, 1100);
    const d2 = await C.docCroquis(p), de = pts(d2).find(e => e.t === 'descente'), l2 = lns(d2)[0];
    const dm = de ? distSeg(de, F.a, F.b) : null;
    R.ok(!!de && dm < 0.02 && l2.v.every(w => !w.a), 'm : la descente se cale sur la façade malgré le tuyau qui passe' + (de ? ' (à ' + dm.toFixed(2) + ' m du mur)' : ' (pas de descente)'));
    /* témoin : descente touchée sur l'extrémité libre du tuyau : elle la prend et reste au bout du tuyau */
    await C.outil(p, {k: 'pt', t: 'descente', pal: 'ep'}); await C.toucher(p, b.x, b.y);
    const d3 = await C.docCroquis(p), l3 = lns(d3)[0], de2 = pts(d3).filter(e => e.t === 'descente').find(e => !de || e.id !== de.id);
    R.ok(!!de2 && l3.v[1].a === de2.id && Math.hypot(de2.x - l3.v[1].x, de2.y - l3.v[1].y) < 1e-6, 'm : témoin, la descente posée sur l\'extrémité libre la prend');
    R.ok(!A.erreurs.length, 'm : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* t : triple toucher quand la fiche fait glisser le plan */
async function triple(){
  const A = await croquisNeuf(), p = A.p;
  try {
    /* un regard touché aux deux tiers de la largeur : la fiche (à droite) le couvrirait, le plan glisse pour le montrer ; le doigt reste sur le
       plan, et les deux touchers suivants, au même endroit de l'écran, ne posent pas de second regard. Touché à 40 % de la hauteur : fiche
       ouverte, la barre de navigation longe la fiche et, depuis son huitième bouton (palette d'accrochage, m111), monte jusqu'à la mi-hauteur */
    const r = await p.evaluate(() => { const b = document.querySelector('.vc .vc-cv').getBoundingClientRect(); return {l: b.left, t: b.top, w: b.width, h: b.height}; });
    const q = {x: r.l + 0.65 * r.w, y: r.t + 0.4 * r.h}, v0 = await C.vue(p);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'});
    await C.toucherPage(p, q, 420);
    const v1 = await C.vue(p), glisse = Math.hypot(v1.cx - v0.cx, v1.cy - v0.cy) * v1.s;
    R.ok(glisse > 10, 't : la fiche s\'ouvre et le plan glisse (' + Math.round(glisse) + ' px)');
    await C.toucherPage(p, q, 420); await C.toucherPage(p, q, 600);
    const n = pts(await C.docCroquis(p)).filter(e => e.t === 'regard').length;
    R.ok(n === 1, 't : triple toucher, un seul regard posé (' + n + ')');
    R.ok(!A.erreurs.length, 't : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* dessin commun de p, s : WC et autre appareil reliés à un raccord j1, branchement de j1 au raccord jK du collecteur EU (vue à 63 px/m) */
async function branchement(p, app2){
  const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, o = (x, y) => [cx + x, cy + y];
  const els = [C.P('w1', 'wc', ...o(-3, 0)), C.P('e1', app2, ...o(0, 3)), C.J('j1', ...o(0, 0)), C.J('jK', ...o(4, 0))], I = C.index(els);
  els.push(C.L('K', 'col', [o(4, -8), 'jK', o(4, 8)], I, {res: 'EU'}), C.L('A', 'tr', ['w1', 'j1'], I), C.L('B', 'tr', ['e1', 'j1'], I), C.L('C', 'tr', ['j1', 'jK'], I));
  await C.injecter(p, {el: els}); await C.regler(p, cx, cy, 63);
  return {cx, cy, I};
}
const tient = (d, id) => lns(d).filter(l => l.v.some(w => w.a === id)).map(l => l.id).sort().join('');

/* p : ouvrage passé « Projet » après avoir pris la place d'un raccord */
async function projet(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const {I} = await branchement(p, 'douche');
    await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.decisions['sansboite:K:EU'] = {st: 'retenue'}; window.__vcEd.synchroniser(); }); await C.pause(p, 300);
    const q = await C.aCote(p, I.j1, I.jK, I.e1, 3, 12);
    await C.outil(p, {k: 'pt', t: 'boite', pal: 'reg'}); await C.toucherCv(p, q, 600);
    const d1 = await C.docCroquis(p), bo = pts(d1).find(e => e.t === 'boite');
    R.ok(!!bo && !pts(d1).some(e => e.id === 'j1') && tient(d1, bo.id) === 'ABC', 'p : la boîte prend la place du raccord (tuyaux A, B, C)');
    for (const [k, v] of [['st', 'projet'], ['res', 'EU']]){ const b = await p.$('.vc button.vc-chip[data-a="prop"][data-k="' + k + '"][data-v="' + v + '"]'); if (b){ await b.click(); await C.pause(p, 300); } }
    const st = (await C.docCroquis(p)).el.find(e => bo && e.id === bo.id);
    const e = await C.analyseCroquis(p, 'edl'), dos = await C.dossierAnomalies(p);
    R.ok(!!st && st.p.st === 'projet' && e.o.wc === 'ok EU' && e.o.douche === 'ok EU', 'p : boîte « Projet », l\'état des lieux garde WC et douche raccordés au collecteur EU (' + JSON.stringify(e.o) + ')');
    R.ok(dos.some(a => a.cle === 'sansboite:K:EU'), 'p : « pas de boîte de branchement » reste au dossier');
    R.ok(!A.erreurs.length, 'p : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* s : ouvrage supprimé après avoir pris la place d'un raccord (regard, puis puisard) */
async function supprime(){
  for (const t of ['regard', 'puisard']){
    const A = await croquisNeuf(), p = A.p;
    try {
      const {I} = await branchement(p, 'evier');
      const q = await C.aCote(p, I.j1, I.w1, I.e1, 3, 12);
      await C.outil(p, {k: 'pt', t, pal: t === 'regard' ? 'reg' : 'equ'}); await C.toucherCv(p, q, 600);
      const d1 = await C.docCroquis(p), rg = pts(d1).find(e => e.t === t);
      R.ok(!!rg && tient(d1, rg.id) === 'ABC', 's : ' + t + ' à la place du raccord (tuyaux A, B, C)');
      await p.click('.vc button[data-a="supprimer"]'); await C.pause(p, 500);
      const d2 = await C.docCroquis(p), j = pts(d2).find(e => e.t === 'jonction' && e.id !== 'jK' && tient(d2, e.id) === 'ABC'), e = await C.analyseCroquis(p, 'edl');
      R.ok(!pts(d2).some(e => e.t === t) && !!j && e.o.wc === 'ok EU' && e.o.evier === 'ok EU', 's : ' + t + ' supprimé, un raccord le remplace, WC et évier restent raccordés (' + JSON.stringify(e.o) + ')');
      R.ok(!A.erreurs.length, 's : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
    } finally { await A.fermer(); }
  }
}

/* b : bout libre touché, un raccord du même tuyau sous le symbole */
async function bout(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, o = (x, y) => [cx + x, cy + y];
    const els = [C.P('w1', 'wc', ...o(-3, 0)), C.P('e1', 'evier', ...o(0, 3)), C.J('j1', ...o(0, 0))], I = C.index(els);
    els.push(C.L('A', 'tr', ['w1', 'j1', o(0.3, 0)], I), C.L('B', 'tr', ['e1', 'j1'], I));
    await C.injecter(p, {el: els}); await C.regler(p, cx, cy, 20);
    const F = await C.ecranCv(p, cx + 0.3, cy);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.toucherCv(p, {x: F.x + 3, y: F.y}, 600);
    const d = await C.docCroquis(p), rg = pts(d).find(e => e.t === 'regard'), la = lns(d).find(l => l.id === 'A');
    const dF = rg ? Math.hypot(rg.x - (cx + 0.3), rg.y - cy) : null;
    R.ok(!!rg && dF < 0.01 && la.v[la.v.length - 1].a === rg.id && pts(d).some(e => e.id === 'j1'), 'b : le regard prend le bout libre touché (à ' + (dF == null ? '?' : dF.toFixed(2)) + ' m du bout), le raccord reste');
    R.ok(!A.erreurs.length, 'b : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* o : clapet ou gargouille à la place d'un raccord, sur un tuyau en diagonale (l'eau va du coin bas gauche vers le raccord : 45°) */
async function oriente(){
  const cas = [
    {n: 'clapet, tuyau tracé du WC au raccord', t: 'clapet', A: ['w1', 'j1'], q: {}},
    {n: 'clapet, tuyau tracé du raccord au WC, « Sens inverse »', t: 'clapet', A: ['j1', 'w1'], q: {sens: -1}},
    {n: 'gargouille, tuyau tracé du rejet vers la descente (raccord au premier sommet)', t: 'gargouille', A: ['j1', 'w1'], q: {res: 'EP'}, source: 'descente'},
    /* aucune source ne parcourt le branchement (l'eau du WC s'arrête à la boîte) : le clapet suit la distance au collecteur, pas le tracé */
    {n: 'clapet, branchement de la boîte EU au collecteur tracé depuis le collecteur', t: 'clapet', A: ['j1', 'w1'], q: {}, source: 'boite', p1: {res: 'EU'}, collecteur: true},
    /* trop-plein : l'eau part du puisard, la distance aux exutoires ne le dit pas ; le clapet suit le tracé */
    {n: 'clapet, trop-plein d\'un puisard tracé du puisard vers le regard', t: 'clapet', A: ['w1', 'j1'], q: {}, source: 'puisard'},
  ];
  for (const k of cas){
    const A = await croquisNeuf(), p = A.p;
    try {
      const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, o = (x, y) => [cx + x, cy + y];
      const els = [C.P('w1', k.source || 'wc', ...o(-2.1, -2.1), k.p1), C.J('j1', ...o(0, 0)), k.t === 'gargouille' ? C.P('w2', 'descente', ...o(2, -2)) : k.collecteur ? C.J('r1', ...o(2, 2)) : C.P('r1', 'regard', ...o(2, 2), {tampon: 'fonte'})];
      if (k.collecteur) els.push(C.P('w0', 'wc', ...o(-4.2, -4.2)));
      const I = C.index(els);
      els.push(C.L('A', 'tr', k.A, I, k.q), k.t === 'gargouille' ? C.L('B', 'tr', ['w2', 'j1'], I, {res: 'EP'}) : C.L('C', 'tr', k.collecteur ? ['r1', 'j1'] : ['j1', 'r1'], I));
      if (k.collecteur) els.push(C.L('L0', 'tr', ['w0', 'w1'], I), C.L('K', 'col', [o(0, 4), 'r1', o(4, 0)], I, {res: 'EU'}));
      await C.injecter(p, {el: els}); await C.regler(p, cx, cy, 63);
      const q = await C.aCote(p, I.j1, I.w1, k.t === 'gargouille' ? I.w2 : I.r1, 3, 12);
      await C.outil(p, {k: 'pt', t: k.t, pal: 'equ'}); await C.toucherCv(p, q, 600);
      const d = await C.docCroquis(p), cl = pts(d).find(e => e.t === k.t), ang = cl ? (((cl.p.a || 0) % 360) + 360) % 360 : null;
      R.ok(!!cl && !pts(d).some(e => e.id === 'j1') && Math.abs(ang - 45) < 1, 'o : ' + k.n + ' : à la place du raccord, orienté à 45° (' + (cl ? cl.p.a : '?') + '°)');
      R.ok(!A.erreurs.length, 'o : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
    } finally { await A.fermer(); }
  }
}

/* q : gargouille touchée au milieu de la queue d'un tuyau, au-delà du raccord (l'eau va du raccord vers le bout : 0°) */
async function queue(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, o = (x, y) => [cx + x, cy + y];
    const els = [C.P('d1', 'descente', ...o(-2, 0)), C.P('d2', 'descente', ...o(0, -2)), C.J('j1', ...o(0, 0))], I = C.index(els);
    els.push(C.L('A', 'tr', ['d1', 'j1', o(0.45, 0)], I, {res: 'EP'}), C.L('B', 'tr', ['d2', 'j1'], I, {res: 'EP'}));
    /* croquis au 1:200 : à 100 px/m, le symbole de la gargouille (38 px) couvre le raccord et le bout */
    await C.injecter(p, {el: els, echelle: 200}); await C.regler(p, cx, cy, 100);
    const a = await C.ecranCv(p, cx, cy), f = await C.ecranCv(p, cx + 0.45, cy);
    await C.outil(p, {k: 'pt', t: 'gargouille', pal: 'equ'}); await C.toucherCv(p, {x: (a.x + f.x) / 2, y: (a.y + f.y) / 2}, 600);
    const d = await C.docCroquis(p), g = pts(d).find(e => e.t === 'gargouille'), ang = g ? (((g.p.a || 0) % 360) + 360) % 360 : null;
    R.ok(!!g && (ang < 1 || ang > 359), 'q : gargouille sur la queue du tuyau, orientée vers la sortie de l\'eau, 0° (' + (g ? g.p.a : '?') + '°)');
    R.ok(!A.erreurs.length, 'q : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* ---------- Disque de rotation (m154) ---------- */
const DEG = 180 / Math.PI, mod360 = a => ((a % 360) + 360) % 360, ecart = (a, b) => mod360(a - b + 180) - 180, pres = (a, b, t) => Math.abs(a - b) <= (t || 0.6);
/* Point de la rue du fond fictif, loin de tout bâti : aucun linéaire à 3 m, donc aucun accrochage de l'angle. */
const RUE = {x: -42.2, y: 7};
/* Côtés du bâti du fond à R mètres au plus du point q (repère du croquis) : distance, direction en degrés (de 0 à 180). */
const cotesPres = (p, q, R, nat) => p.evaluate(([q, R, nat]) => {
  const S = window.__vcEd.etat, out = [];
  (window.VCroquis.geo.lignesRef(S.doc, S.fond, null, [nat]) || []).forEach(l => { for (let k = 1; k < l.P.length; k++){
    const a = l.P[k - 1], b = l.P[k], dx = b.x - a.x, dy = b.y - a.y, L2 = dx * dx + dy * dy, t = L2 ? Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / L2)) : 0;
    const d = Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy);
    if (d <= R && L2 > 0.04) out.push({d, dir: ((Math.atan2(dy, dx) * 180 / Math.PI) % 180 + 180) % 180, m: {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2}, L: Math.sqrt(L2)});
  } });
  return out;
}, [q, R, nat || 'bati']);
/* Croquis injecté au 1/200 (au 1/ech si ech est donné), vue à s pixels par mètre, outil « Choisir » ; le point o du croquis tombe à 240 px
   à gauche du milieu du plan : hors de la fiche (à droite), de la palette et des barres. anoms : anomalies saisies à la main (aucune par
   défaut). */
async function scene(p, els, o, s, anoms, ech){
  await C.injecter(p, {el: els, echelle: ech || 200, anomManu: anoms || []}); await C.regler(p, o.x + 240 / s, o.y, s); await C.outil(p, {k: 'main'});
}
/* Bouton de l'aimant de la barre : aides au dessin actives ou coupées. */
async function aimant(p, actif){
  const lu = () => p.evaluate(() => window.__vcEd.etat.aides.actives !== false);
  if (await lu() !== actif){ await p.click('.vc .vc-aimant'); await C.pause(p, 150); }
  if (await lu() !== actif) throw new Error('mise en place : l\'aimant ne passe pas à ' + actif);
}
/* État du disque de l'objet id. att : ce qu'on attend d'après sa zone de toucher (zr) et son angle (anneau à zr + 22 px, poignée à 90° de
   l'angle à l'écran, dans le sens contraire des aiguilles d'une montre). d : ce que l'éditeur dit avoir dessiné (S.disque). Et ce que
   montre le canevas : points gris sur douze points de l'anneau attendu (anneau), points de la couleur de la poignée sur huit points de
   son bord (poignee), clarté de son centre (765 : blanc), points d'encre dans la bulle de l'angle (encre) ; poigneeD : les mêmes points
   de la poignée, autour de la place où l'éditeur dit l'avoir dessinée (d.px, d.py ; d.dec : son écart à la place attendue). */
const etatDisque = (p, id) => p.evaluate(id => {
  const S = window.__vcEd.etat, e = S.doc.el.find(x => x.id === id); if (!e) return null;
  const c = S.vue.ecran(e.x, e.y), z = S.zones.find(z => z.type === 'pt' && z.id === id), zr = z ? z.r : 0, r = zr + 22;
  const a = typeof e.p.a === 'number' && isFinite(e.p.a) ? e.p.a : 0, t = a * Math.PI / 180 - (S.doc.rot || 0);
  const att = {x: c.x, y: c.y, r, px: c.x - r * Math.sin(t), py: c.y - r * Math.cos(t)};
  const racine = document.querySelector('.vc'), cv = racine.querySelector('.vc-cv'), k = cv.width / cv.clientWidth, g = cv.getContext('2d');
  /* neuf pixels autour du point, vus sur fond blanc : la somme rouge + vert + bleu la plus sombre et le rouge le plus faible */
  const vu = (x, y) => { const d = g.getImageData(Math.round(x * k) - 1, Math.round(y * k) - 1, 3, 3).data; let s = 765, rg = 255;
    for (let i = 0; i < d.length; i += 4){ const al = d[i + 3] / 255; s = Math.min(s, 765 - (765 - d[i] - d[i + 1] - d[i + 2]) * al); rg = Math.min(rg, 255 - (255 - d[i]) * al); }
    return {s, rg}; };
  let anneau = 0, poignee = 0, encre = 0;
  for (let i = 0; i < 12; i++){ const u = t + (15 + 30 * i) * Math.PI / 180; if (vu(c.x - r * Math.sin(u), c.y - r * Math.cos(u)).s < 640) anneau++; }
  for (let i = 0; i < 8; i++){ const u = i * Math.PI / 4; if (vu(att.px + 5 * Math.cos(u), att.py + 5 * Math.sin(u)).rg < 90) poignee++; }
  const D = S.disque || null, b = D && D.bulle || null;
  let poigneeD = 0;
  if (D) for (let i = 0; i < 8; i++){ const u = i * Math.PI / 4; if (vu(D.px + 5 * Math.cos(u), D.py + 5 * Math.sin(u)).rg < 90) poigneeD++; }
  if (b){ const d = g.getImageData(Math.round(b.x * k), Math.round(b.y * k), Math.max(1, Math.round(b.w * k)), Math.max(1, Math.round(b.h * k))).data;
    for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 200 && d[i] + d[i + 1] + d[i + 2] < 300) encre++; }
  /* place libre du plan : sous la barre du haut, à gauche de la fiche ouverte */
  const rr = racine.getBoundingClientRect(), ba = racine.querySelector('.vc-barre'), pn = racine.querySelector('.vc-panneau'), rp = pn && !pn.hidden ? pn.getBoundingClientRect() : null;
  const cadre = {gauche: 8, haut: (ba ? ba.getBoundingClientRect().bottom - rr.top : 0) + 8, droite: (rp && rp.width < rr.width * .9 ? rp.left - rr.left : cv.clientWidth) - 8, bas: cv.clientHeight - 8};
  return {att, zr, anneau, poignee, poigneeD, centre: vu(att.px, att.py).s, encre, cadre,
    d: D ? {id: D.id, x: D.x, y: D.y, r: D.r, px: D.px, py: D.py, rp: D.rp, dec: D.dec, bulle: b ? {txt: b.txt, x: b.x, y: b.y, w: b.w, h: b.h} : null} : null,
    a: e.p.a, aDonne: 'a' in e.p, t: e.t, x: e.x, y: e.y, lab: e.lab || null, sel: S.sel ? S.sel.id : null, pan: !!S.panneau, undo: S.undo.length, rev: S.doc.rev || 0,
    aimant: S.aides.actives !== false, cotes: !!S.cotes};
}, id);
/* Objet choisi par un toucher en son centre (sa fiche s'ouvre) ; rend l'état de son disque. */
async function choisir(p, id){
  const s = await etatDisque(p, id); if (!s) throw new Error('mise en place : objet ' + id + ' absent');
  await C.toucherCv(p, {x: Math.round(s.att.x), y: Math.round(s.att.y)});
  const s1 = await etatDisque(p, id);
  if (s1.sel !== id) throw new Error('mise en place : ' + id + ' n\'est pas choisi après le toucher (' + s1.sel + ')');
  return s1;
}
/* Pixel entier du canevas où mener le doigt pour avoir tourné de deg degrés autour de c depuis le pixel q0 (positif : sens contraire des
   aiguilles d'une montre), à 0,15° près : cherché de 10 à 60 px au-delà du rayon r0, le doigt s'écarte donc de l'anneau. 0° : q0. */
function arrivee(c, q0, deg, r0){
  if (!deg) return q0;
  const u0 = Math.atan2(c.y - q0.y, q0.x - c.x), u = u0 + deg / DEG; let best = null;
  for (let r = r0 + 10; r <= r0 + 60; r += 0.25){
    const q = {x: Math.round(c.x + r * Math.cos(u)), y: Math.round(c.y - r * Math.sin(u))}, e = Math.abs(ecart((Math.atan2(c.y - q.y, q.x - c.x) - u0) * DEG, deg));
    if (!best || e < best.e) best = {q, e};
  }
  if (best.e > 0.15) throw new Error('mise en place : aucun pixel à ' + deg + '° du départ (' + best.e.toFixed(2) + '° au mieux)');
  return best.q;
}
/* Glissé du doigt autour du centre c (pixels du canevas) : appui en q0, puis, pour chaque étape {q, deg}, un arc de deg degrés en douze
   pas (angle et rayon interpolés) qui finit sur le pixel q ; o.apres(k) : appelée à la fin de l'étape k, le doigt encore posé. */
async function glisserArc(p, c, q0, etapes, o){
  o = o || {};
  const cp = await C.pageCv(p, c), a0 = await C.pageCv(p, q0), fins = [];
  await C.surLePlan(p, a0, 'le glissé');
  for (const e of etapes){ const b = await C.pageCv(p, e.q); await C.surLePlan(p, b, 'le glissé'); fins.push(b); }
  const s = await p.context().newCDPSession(p), t = (type, q) => s.send('Input.dispatchTouchEvent', {type, touchPoints: q ? [{x: q.x, y: q.y, id: 1}] : []});
  try {
    await t('touchStart', a0);
    let a = a0;
    for (let k = 0; k < etapes.length; k++){
      const b = fins[k], ua = Math.atan2(cp.y - a.y, a.x - cp.x), ra = Math.hypot(a.x - cp.x, a.y - cp.y), rb = Math.hypot(b.x - cp.x, b.y - cp.y), du = etapes[k].deg / DEG;
      for (let i = 1; i < 12; i++){ const u = ua + du * i / 12, r = ra + (rb - ra) * i / 12; await t('touchMove', {x: cp.x + r * Math.cos(u), y: cp.y - r * Math.sin(u)}); }
      await t('touchMove', b); a = b;
      if (o.apres){ await C.pause(p, 150); await o.apres(k); }
    }
    await t('touchEnd', null);
  } finally { await s.detach(); }
  await C.pause(p, o.ms == null ? 450 : o.ms);
}
/* L'objet choisi id tourné par un glissé sur son disque, pris sur la poignée, ou sur l'anneau à o.depuis degrés d'elle : degs, un angle
   ou une suite d'angles à tourner l'un après l'autre. La poignée est prise là où son angle la met (att), ou, avec o.dessinee, là où
   l'éditeur dit l'avoir dessinée (S.disque). Rend les pixels du doigt (q), l'état lu à la fin de chaque étape, le doigt encore posé
   (lus ; pendant : le dernier), et l'état après le lever (apres). */
async function tourner(p, id, degs, o){
  o = o || {}; degs = [].concat(degs);
  const s = await etatDisque(p, id), c = {x: s.att.x, y: s.att.y}, h = o.dessinee && s.d ? {x: s.d.px, y: s.d.py} : {x: s.att.px, y: s.att.py};
  const u = Math.atan2(c.y - h.y, h.x - c.x) + (o.depuis || 0) / DEG;
  const q0 = {x: Math.round(c.x + s.att.r * Math.cos(u)), y: Math.round(c.y - s.att.r * Math.sin(u))}, q = [q0], etapes = [], lus = [];
  let cumul = 0;
  degs.forEach(d => { cumul += d; const f = arrivee(c, q0, cumul, s.att.r); q.push(f); etapes.push({q: f, deg: d}); });
  await glisserArc(p, c, q0, etapes, {apres: async () => { lus.push(await etatDisque(p, id)); }});
  return {q, avant: s, lus, pendant: lus[lus.length - 1], apres: await etatDisque(p, id)};
}
/* Bulle de l'angle lue pendant le geste (état s, doigt en q) : dessinée, près de la poignée, hors du doigt, dans la place libre du plan. */
const distBoite = (q, b) => Math.hypot(Math.max(b.x - q.x, 0, q.x - b.x - b.w), Math.max(b.y - q.y, 0, q.y - b.y - b.h));
const bulleDe = s => s && s.d && s.d.bulle ? s.d.bulle : null, texteBulle = s => (bulleDe(s) || {txt: null}).txt;
function bulleOk(s, q){
  const b = bulleDe(s);
  return !!b && s.encre >= 12 && distBoite(q, b) >= 28 && distBoite({x: s.d.px, y: s.d.py}, b) <= 140
    && b.x >= s.cadre.gauche - 0.5 && b.y >= s.cadre.haut - 0.5 && b.x + b.w <= s.cadre.droite + 0.5 && b.y + b.h <= s.cadre.bas + 0.5;
}
const voirBulle = (s, q) => { const b = bulleDe(s); return b ? '« ' + b.txt + ' » en ' + [b.x, b.y, b.w, b.h].map(Math.round).join(', ') + ', à ' + Math.round(distBoite(q, b)) + ' px du doigt et ' + Math.round(distBoite({x: s.d.px, y: s.d.py}, b)) + ' px de la poignée, ' + s.encre + ' points d\'encre' : 'aucune bulle'; };
const voirDisque = s => s.d ? 'rayon ' + s.d.r.toFixed(1) + ' pour une zone de ' + s.zr.toFixed(1) + ', poignée en ' + Math.round(s.d.px - s.d.x) + ', ' + Math.round(s.d.py - s.d.y) + ' du centre' : 'aucun disque';
const voirPoints = s => s.anneau + ' points gris sur 12, ' + s.poignee + ' points de poignée sur 8';
/* la poignée dessinée est sur l'anneau, là où l'angle de l'objet la met */
const poigneeOk = s => !!s.d && pres(s.d.px, s.att.px) && pres(s.d.py, s.att.py) && pres(s.d.r, s.zr + 22) && s.poignee >= 7 && s.anneau >= 10;

/* d : disque de rotation */
async function disque(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const O = RUE, pr = await cotesPres(p, O, 7);
    if (pr.length) throw new Error('mise en place : un côté du bâti à ' + pr[0].d.toFixed(1) + ' m du point de la rue');
    const etat = id => etatDisque(p, id), annuler = async () => { await p.evaluate(() => { window.__vcEd.annuler(); }); await C.pause(p, 150); };
    const quatre = () => [C.P('K1', 'caniveau', O.x, O.y, {a: 0}), C.P('R1', 'regard', O.x - 3, O.y), C.P('W1', 'wc', O.x + 3, O.y), C.P('I1', 'infiltration', O.x, O.y - 3)];

    /* anneau et poignée d'un caniveau */
    await scene(p, quatre(), O, 40);
    const s0 = await etat('K1');
    R.ok(!s0.d && s0.anneau <= 2 && s0.poignee <= 2, 'd : témoin, rien de choisi : ni anneau ni poignée (' + voirPoints(s0) + ')');
    const s1 = await choisir(p, 'K1');
    R.ok(!!s1.d && s1.d.id === 'K1' && pres(s1.d.x, s1.att.x) && pres(s1.d.y, s1.att.y) && pres(s1.d.r, s1.zr + 22) && s1.anneau >= 10,
      'd : un caniveau choisi est entouré d\'un anneau fin, à 22 px de sa zone de toucher (' + voirDisque(s1) + ' ; ' + voirPoints(s1) + ' ; avant : aucun anneau)');
    R.ok(poigneeOk(s1) && pres(s1.d.px, s1.att.x) && pres(s1.d.py, s1.att.y - s1.att.r) && s1.d.rp === 6 && s1.centre > 700,
      'd : sa poignée ronde de 12 px est sur l\'anneau, au-dessus de lui (' + voirDisque(s1) + ' ; ' + voirPoints(s1) + ', centre ' + Math.round(s1.centre) + ')');

    /* quart de tour, poignée prise */
    const t1 = await tourner(p, 'K1', 90);
    R.ok(t1.pendant.a === 90 && t1.apres.a === 90, 'd : la poignée glissée d\'un quart de tour dans le sens contraire des aiguilles d\'une montre : 90° (pendant le geste ' + t1.pendant.a + ', au lever ' + t1.apres.a + ' ; avant : le plan glissait)');
    R.ok(poigneeOk(t1.apres) && pres(t1.apres.d.px, t1.apres.att.x - t1.apres.att.r) && pres(t1.apres.d.py, t1.apres.att.y) && t1.apres.sel === 'K1',
      'd : la poignée a tourné avec le caniveau, resté choisi : elle est à sa gauche (' + voirDisque(t1.apres) + ' ; ' + voirPoints(t1.apres) + ')');
    R.ok(bulleOk(t1.pendant, t1.q[1]) && texteBulle(t1.pendant) === '90°', 'd : pendant le geste, une bulle près de la poignée, hors du doigt, montre l\'angle : « 90° » (' + voirBulle(t1.pendant, t1.q[1]) + ')');
    R.ok(!!t1.apres.d && !t1.apres.d.bulle, 'd : la bulle part au lever du doigt (' + voirBulle(t1.apres, t1.q[1]) + ')');

    /* anneau pris à l'opposé de la poignée */
    const t3 = await tourner(p, 'K1', [10, 10], {depuis: 180});
    R.ok(t3.lus[0].a === 100 && t3.lus[1].a === 110 && t3.apres.a === 110, 'd : l\'anneau pris à l\'opposé de la poignée et glissé de 20° : l\'angle passe de 90 à 110, sans saut (à mi-course ' + t3.lus[0].a + ', à la fin ' + t3.lus[1].a + ', au lever ' + t3.apres.a + ')');
    R.ok(t3.apres.undo === t1.apres.undo + 1 && t1.apres.undo === s1.undo + 1, 'd : un pas d\'annulation par geste (' + s1.undo + ', ' + t1.apres.undo + ' puis ' + t3.apres.undo + ')');
    await annuler(); const u1 = await etat('K1'); await annuler(); const u2 = await etat('K1');
    R.ok(u1.a === 90 && u2.a === 0, 'd : chaque annulation rend l\'angle d\'avant : 90 puis 0 (' + u1.a + ' puis ' + u2.a + ')');

    /* aimant coupé */
    await scene(p, quatre(), O, 40); await aimant(p, false); await choisir(p, 'K1');
    const t4 = await tourner(p, 'K1', 37);
    R.ok(t4.apres.a === 37 && !t4.apres.aimant && texteBulle(t4.pendant) === '37°', 'd : aimant coupé, un glissé de 37° donne 37° : plus de pas de 15° (' + t4.apres.a + ', ' + voirBulle(t4.pendant, t4.q[1]) + ')');
    await annuler(); const u4 = await etat('K1');
    R.ok(t4.apres.a === 37 && u4.a === 0, 'd : une annulation rend l\'angle (' + t4.apres.a + ' puis ' + u4.a + ')');
    await aimant(p, true);

    /* aller et retour dans le même geste */
    await scene(p, quatre(), O, 40); const s5 = await choisir(p, 'R1'), t5 = await tourner(p, 'R1', [30, -30]);
    R.ok(t5.lus[0].a === 30 && t5.apres.a === undefined && !t5.apres.aDonne && t5.apres.undo === s5.undo && t5.apres.rev === s5.rev,
      'd : un regard tourné de 30° puis ramené au départ dans le même geste : rien d\'écrit, ni angle, ni pas d\'annulation, ni révision (pendant ' + t5.lus[0].a + ' ; après : angle ' + t5.apres.a
      + ', annulations ' + s5.undo + ' puis ' + t5.apres.undo + ', révision ' + s5.rev + ' puis ' + t5.apres.rev + ')');

    /* Échap pendant le geste, à la souris */
    await scene(p, quatre(), O, 40);
    const s6 = await choisir(p, 'K1'), c6 = {x: s6.att.x, y: s6.att.y}, q6 = {x: Math.round(s6.att.px), y: Math.round(s6.att.py)}, f6 = arrivee(c6, q6, 40, s6.att.r);
    let m6 = null;
    await C.glisserSourisCv(p, q6, f6, 'left', {avantLever: async () => { await C.pause(p, 150); m6 = await etat('K1'); await p.keyboard.press('Escape'); await C.pause(p, 150); }});
    const e6 = await etat('K1');
    R.ok(m6.a === 40 && e6.a === 0 && e6.undo === s6.undo && e6.sel === 'K1' && e6.pan && poigneeOk(e6) && !e6.d.bulle,
      'd : à la souris, Échap pendant le geste rend l\'angle, sans pas d\'annulation ; le caniveau reste choisi, sa fiche ouverte (pendant ' + m6.a + ' ; après ' + e6.a + ', annulations ' + s6.undo + ' puis ' + e6.undo
      + ', choisi : ' + e6.sel + ', fiche : ' + e6.pan + ')');

    /* regard ; sens des aiguilles d'une montre */
    await scene(p, quatre(), O, 40); const s7 = await choisir(p, 'R1');
    R.ok(poigneeOk(s7) && pres(s7.d.px, s7.att.x) && pres(s7.d.py, s7.att.y - s7.att.r) && !s7.aDonne,
      'd : un regard choisi, jamais tourné, a aussi son anneau et sa poignée, au-dessus de lui (' + voirDisque(s7) + ' ; ' + voirPoints(s7) + ' ; avant : aucun anneau)');
    const t7 = await tourner(p, 'R1', -30);
    R.ok(t7.apres.a === 330 && texteBulle(t7.pendant) === '330°' && poigneeOk(t7.apres), 'd : tourné de 30° dans le sens des aiguilles d\'une montre : 330°, entier de 0 à 359 (' + t7.apres.a + ', ' + voirBulle(t7.pendant, t7.q[1]) + ')');

    /* témoins : symbole rond, symbole droit, autre outil, mode Cotes */
    const s8 = await choisir(p, 'W1'), s9 = await choisir(p, 'I1');
    R.ok(!s8.d && s8.anneau <= 2 && s8.poignee <= 2 && !s9.d && s9.anneau <= 2 && s9.poignee <= 2,
      'd : témoin, un WC et une infiltration au sol choisis n\'ont ni anneau ni poignée (WC : ' + voirDisque(s8) + ', ' + voirPoints(s8) + ' ; infiltration : ' + voirDisque(s9) + ', ' + voirPoints(s9) + ')');
    await choisir(p, 'K1'); await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 200); const s10 = await etat('K1');
    R.ok(!s10.d && s10.anneau <= 2 && s10.poignee <= 2, 'd : témoin, un autre outil que « Choisir » : ni anneau ni poignée (' + voirPoints(s10) + ')');
    await C.outil(p, {k: 'main'}); await choisir(p, 'K1');
    const PUCE_COTES = '.vc .vc-panneau button[data-a="cotesObjet"][data-v="deplacer"]';
    if (!await p.$(PUCE_COTES)) throw new Error('mise en place : pas de puce « Déplacer par cotes » dans la fiche du caniveau');
    await p.click(PUCE_COTES); await C.pause(p, 300); const s11 = await etat('K1');
    R.ok(s11.cotes && !s11.sel && !s11.d && s11.anneau <= 2 && s11.poignee <= 2, 'd : témoin, « Déplacer par cotes » : aucun objet choisi, ni anneau ni poignée (cotes : ' + s11.cotes + ', choisi : ' + s11.sel + ', ' + voirPoints(s11) + ')');

    /* témoin : le corps de l'objet garde la main */
    await scene(p, quatre(), O, 40); const s12 = await choisir(p, 'K1'), c12 = {x: Math.round(s12.att.x), y: Math.round(s12.att.y) + Math.round(s12.zr) + 5};
    await C.glisserDoigtCv(p, c12, {x: c12.x + 60, y: c12.y + 40}); const s13 = await etat('K1');
    R.ok(Math.hypot(s13.x - s12.x, s13.y - s12.y) > 1 && s13.a === 0, 'd : témoin, un glissé parti du bord du corps, à 5 px du symbole, déplace toujours l\'objet, sans le tourner (déplacé de '
      + Math.hypot(s13.x - s12.x, s13.y - s12.y).toFixed(2) + ' m, angle ' + s13.a + ')');

    /* témoin : l'étiquette, placée sous l'anneau, garde la main */
    const r2 = C.P('R2', 'regard', O.x, O.y); delete r2.lab;
    await scene(p, [r2], O, 40); const s14 = await choisir(p, 'R2');
    const b14 = await p.evaluate(() => { const z = window.__vcEd.etat.zones.find(z => z.type === 'etiq' && z.id === 'R2'); return z ? z.b : null; });
    let q14 = null;
    if (b14) for (let u = 0; u < 360 && !q14; u += 3){ const q = {x: Math.round(s14.att.x + s14.att.r * Math.cos(u / DEG)), y: Math.round(s14.att.y - s14.att.r * Math.sin(u / DEG))}; if (q.x > b14[0] + 2 && q.x < b14[2] - 2 && q.y > b14[1] + 2 && q.y < b14[3] - 2) q14 = q; }
    if (!q14) throw new Error('mise en place : l\'étiquette du regard n\'est pas sous l\'anneau (' + JSON.stringify(b14) + ')');
    await C.glisserDoigtCv(p, q14, {x: q14.x + 40, y: q14.y + 60}); const s15 = await etat('R2');
    R.ok(!!s15.lab && s15.lab.main === true && !s15.aDonne && pres(s15.x, O.x, 1e-9), 'd : témoin, un glissé parti de l\'étiquette, placée sous l\'anneau, déplace toujours l\'étiquette, sans tourner le regard (' + JSON.stringify(s15.lab) + ', angle ' + s15.a + ')');

    /* petit zoom : la zone de toucher vaut au moins 8,5 px */
    const k3 = () => [C.P('K3', 'caniveau', O.x, O.y, {a: 0})];
    await scene(p, k3(), O, 8); const s16 = await choisir(p, 'K3');
    R.ok(poigneeOk(s16) && s16.d.r - (s16.d.rp + 8) >= s16.zr + 8 - 0.01,
      'd : au petit zoom, la poignée et le corps ne se confondent pas : la prise de la poignée commence où finit celle du corps (' + voirDisque(s16) + ' ; ' + voirPoints(s16) + ')');
    const c16 = {x: Math.round(s16.att.x), y: Math.round(s16.att.y) - 12};
    await C.glisserDoigtCv(p, c16, {x: c16.x + 30, y: c16.y + 30}); const s17 = await etat('K3');
    R.ok(Math.hypot(s17.x - s16.x, s17.y - s16.y) > 2 && s17.a === 0, 'd : témoin, au petit zoom, un glissé parti du corps, du côté de la poignée, déplace l\'objet (déplacé de ' + Math.hypot(s17.x - s16.x, s17.y - s16.y).toFixed(2) + ' m, angle ' + s17.a + ')');
    await scene(p, k3(), O, 8); await choisir(p, 'K3'); const t18 = await tourner(p, 'K3', 50);
    R.ok(t18.apres.a === 50 && pres(t18.apres.x, O.x, 1e-9), 'd : au petit zoom, la poignée tourne l\'objet sans le déplacer : 50° (' + t18.apres.a + ')');

    /* fiche : puces de 15° */
    await scene(p, [C.P('R4', 'regard', O.x, O.y)], O, 40); await choisir(p, 'R4');
    const PUCE = '.vc .vc-panneau button[data-a="orienter"]', n19 = await p.locator(PUCE).count();
    if (n19) for (let i = 0; i < 2; i++){ await p.click(PUCE + '[data-v="15"]'); await C.pause(p, 200); }
    const s19 = await etat('R4');
    R.ok(n19 === 3 && s19.a === 30 && poigneeOk(s19), 'd : la fiche d\'un regard a les trois puces d\'orientation ; la puce « 15° » de gauche, deux fois : 30°, la poignée suit (' + n19 + ' puces, angle ' + s19.a + ', ' + voirDisque(s19) + ' ; avant : aucune puce)');

    /* fiche : changement de type */
    const SEL = '.vc .vc-panneau select[data-a="type"]';
    const changer = async (e0, type) => {
      await scene(p, [e0], O, 40); await choisir(p, e0.id);
      const dispo = await p.$$eval(SEL + ' option', os => os.map(o => o.value));
      if (dispo.indexOf(type) < 0) throw new Error('mise en place : la fiche ne propose pas le type ' + type + ' (' + dispo.join(', ') + ')');
      await p.selectOption(SEL, type); await C.pause(p, 250); return etat(e0.id);
    };
    const v1 = await changer(C.P('R5', 'regard', O.x, O.y, {a: 30}), 'boite');
    R.ok(v1.t === 'boite' && v1.a === 30 && poigneeOk(v1), 'd : un regard tourné à 30° changé en boîte garde 30° (' + v1.t + ', angle ' + v1.a + ' ; avant : angle perdu)');
    const v2 = await changer(C.P('K5', 'caniveau', O.x, O.y, {a: 45}), 'grille');
    R.ok(v2.t === 'grille' && v2.a === 45, 'd : un caniveau à 45° changé en grille garde 45° (' + v2.t + ', angle ' + v2.a + ' ; avant : angle perdu)');
    const v3 = await changer(C.P('G5', 'siphon_garage', O.x, O.y, {a: 30}), 'wc');
    R.ok(v3.t === 'wc' && !v3.aDonne && !v3.d, 'd : témoin, un siphon de garage tourné à 30° changé en WC : plus d\'angle ni d\'anneau (' + v3.t + ', angle ' + v3.a + ', ' + voirDisque(v3) + ')');
    const v4 = await changer(C.P('R6', 'regard', O.x, O.y), 'boite');
    R.ok(v4.t === 'boite' && !v4.aDonne, 'd : témoin, un regard jamais tourné changé en boîte reste sans angle (' + v4.t + ', angle ' + v4.a + ')');
    const v5 = await changer(C.P('G6', 'grille', O.x, O.y, {a: 30}), 'caniveau');
    R.ok(v5.t === 'caniveau' && v5.a === 30, 'd : témoin, une grille à 30° changée en caniveau garde 30°, comme avant (' + v5.t + ', angle ' + v5.a + ')');
    R.ok(!A.erreurs.length, 'd : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* a : accrochage de l'angle */
async function accroche(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const O = RUE, pr = await cotesPres(p, O, 7);
    if (pr.length) throw new Error('mise en place : un côté du bâti à ' + pr[0].d.toFixed(1) + ' m du point de la rue');
    /* un essai : scène neuve, aimant actif ou coupé, regard RA choisi puis tourné de deg par sa poignée ; rend l'angle écrit et la bulle */
    const essai = async (els, o, deg, coupe) => {
      await scene(p, els, o, 40); await aimant(p, !coupe); await choisir(p, 'RA');
      const t = await tourner(p, 'RA', deg), f = t.q[t.q.length - 1];
      await aimant(p, true);
      return {a: t.apres.a, txt: texteBulle(t.pendant), ok: bulleOk(t.pendant, f), voir: t.apres.a + ', ' + voirBulle(t.pendant, f)};
    };

    /* côté du bâti du fond (sa direction n'est pas choisie : celle du fond fictif) */
    const F = await facade(p), Q = {x: F.m.x + 1.5 * F.n.x, y: F.m.y + 1.5 * F.n.y}, th = ((Math.atan2(F.t.y, F.t.x) * DEG) % 180 + 180) % 180, c0 = Math.round(th);
    /* à 3,3 m du regard : des côtés parallèles ou perpendiculaires à celui-là seulement, et le plus proche lui est parallèle */
    const vois = (await cotesPres(p, Q, 3.3)).sort((a, b) => a.d - b.d);
    if (!vois.length || Math.abs(ecart(2 * (vois[0].dir - th), 0)) > 1 || vois.some(v => Math.abs(ecart(4 * (v.dir - th), 0)) > 2) || Math.abs(th - c0) > 0.4)
      throw new Error('mise en place : côtés du bâti près du regard ' + JSON.stringify(vois.map(v => [+v.d.toFixed(2), +v.dir.toFixed(2)])) + ', direction ' + th.toFixed(2));
    const bati = () => [C.P('RA', 'regard', Q.x, Q.y)], cote = 'un regard à 1,5 m d\'un côté du bâti orienté à ' + th.toFixed(1) + '°';
    const e1 = await essai(bati(), Q, c0 + 2);
    R.ok(e1.a === c0 && e1.txt === c0 + '°, parallèle' && e1.ok, 'a : aimant actif, ' + cote + ', lâché à ' + (c0 + 2) + '° : ' + c0 + '°, bulle « ' + c0 + '°, parallèle » (' + e1.voir + ')');
    const e2 = await essai(bati(), Q, c0 + 45);
    R.ok(e2.a === mod360(c0 + 45) && e2.txt === mod360(c0 + 45) + '°' && e2.ok, 'a : lâché à 45° de toute direction proche : pas d\'accrochage, l\'angle du doigt, ' + mod360(c0 + 45) + '° (' + e2.voir + ')');
    const e3 = await essai(bati(), Q, c0 + 4), e4 = await essai(bati(), Q, c0 + 6);
    R.ok(e3.a === c0 && e4.a === mod360(c0 + 6), 'a : à 5° au plus : lâché à 4° du côté, l\'angle se cale (' + e3.voir + ') ; à 6°, non (' + e4.voir + ')');
    const e5 = await essai(bati(), Q, c0 + 87);
    R.ok(e5.a === mod360(c0 + 90) && e5.txt === mod360(c0 + 90) + '°, perpendiculaire' && e5.ok, 'a : lâché à 3° de la perpendiculaire au côté : ' + mod360(c0 + 90) + '°, bulle « …, perpendiculaire » (' + e5.voir + ')');
    const e6 = await essai(bati(), Q, c0 + 2, true);
    R.ok(e6.a === mod360(c0 + 2) && e6.txt === mod360(c0 + 2) + '°', 'a : aimant coupé, lâché à 2° du côté : pas d\'accrochage, ' + mod360(c0 + 2) + '° (' + e6.voir + ')');

    /* trait de complément à 30°, dans la rue, loin du bâti : les nombres de la spécification */
    const trait = (id, dir, d) => { const u = {x: Math.cos(dir / DEG), y: Math.sin(dir / DEG)}, a = {x: O.x - d * u.y - 3 * u.x, y: O.y + d * u.x - 3 * u.y}, b = {x: O.x - d * u.y + 3 * u.x, y: O.y + d * u.x + 3 * u.y};
      return {id, k: 'ln', t: 'lim', v: [{x: a.x, y: a.y, a: null}, {x: b.x, y: b.y, a: null}], p: {st: 'existant'}, lab: null}; };
    const ra = () => C.P('RA', 'regard', O.x, O.y);
    const e7 = await essai([ra(), trait('T1', 30, 1)], O, 32);
    R.ok(e7.a === 30 && e7.txt === '30°, parallèle' && e7.ok, 'a : un regard à 1 m d\'un trait de complément orienté à 30°, lâché à 32° : 30°, bulle « 30°, parallèle » (' + e7.voir + ')');
    const e8 = await essai([ra(), trait('T1', 30, 1), trait('T2', 36, -2)], O, 34), e9 = await essai([ra(), trait('T1', 30, 1), trait('T2', 36, -2)], O, 32);
    R.ok(e8.a === 36 && e9.a === 30, 'a : entre un trait à 30° et un autre à 36°, la direction la plus proche de l\'angle du doigt l\'emporte : lâché à 34° : 36 (' + e8.voir + ') ; à 32° : 30 (' + e9.voir + ')');
    const e10 = await essai([ra(), trait('T1', 30, 4)], O, 32);
    R.ok(e10.a === 32 && e10.txt === '32°', 'a : un trait à 4 m du regard, au-delà des 3 m : pas d\'accrochage (' + e10.voir + ')');

    /* tronçon raccordé au regard, à 30° */
    const u30 = {x: Math.cos(30 / DEG), y: Math.sin(30 / DEG)};
    const tuyau = () => { const els = [C.P('W9', 'wc', O.x + 5 * u30.x, O.y + 5 * u30.y), ra()]; els.push(C.L('T9', 'tr', ['W9', 'RA'], C.index(els), {res: 'EU'})); return els; };
    const e11 = await essai(tuyau(), O, 33);
    R.ok(e11.a === 30 && e11.txt === '30°, parallèle' && e11.ok, 'a : un regard raccordé à un tronçon à 30°, lâché à 33° : 30°, bulle « 30°, parallèle » (' + e11.voir + ')');
    const e12 = await essai(tuyau(), O, 118);
    R.ok(e12.a === 120 && e12.txt === '120°, perpendiculaire' && e12.ok, 'a : lâché à 118° : 120°, bulle « 120°, perpendiculaire » (' + e12.voir + ')');
    const e13 = await essai(tuyau(), O, 32, true);
    R.ok(e13.a === 32 && e13.txt === '32°', 'a : aimant coupé, lâché à 32° : 32°, sans accrochage (' + e13.voir + ')');

    /* tuyaux qui passent près du regard, sans y être raccordés */
    const passe = (t, d) => [ra(), C.L('T8', t, [[O.x - d * u30.y - 3 * u30.x, O.y + d * u30.x - 3 * u30.y], [O.x - d * u30.y + 3 * u30.x, O.y + d * u30.x + 3 * u30.y]], {}, t === 'tr' ? {res: 'EP'} : {})];
    const e14 = await essai(passe('tr', 2), O, 33), e15 = await essai(passe('col', 2), O, 33), e16 = await essai(passe('tr', 4), O, 33);
    R.ok(e14.a === 30 && e15.a === 30 && e16.a === 33, 'a : un tronçon ou un collecteur qui passe à 2 m du regard le cale aussi (' + e14.voir + ' ; ' + e15.voir + ') ; un tronçon à 4 m, non (' + e16.voir + ')');

    /* limite de parcelle : seulement si « Limites de parcelle » est cochée */
    const lim = await limiteLibre(p);
    if (!lim) throw new Error('mise en place : aucune limite de parcelle du fond à plus de 3,5 m du bâti');
    const cl = Math.round(lim.th), surLimite = () => [C.P('RA', 'regard', lim.Q.x, lim.Q.y)];
    const e17 = await essai(surLimite(), lim.Q, cl + 2);
    await p.evaluate(() => { window.__vcEd.etat.aides.accParcelle = true; });
    const e18 = await essai(surLimite(), lim.Q, cl + 2);
    await p.evaluate(() => { window.__vcEd.etat.aides.accParcelle = false; });
    R.ok(e17.a === mod360(cl + 2) && e18.a === cl && e18.txt === cl + '°, parallèle', 'a : un regard à 1 m d\'une limite de parcelle orientée à ' + lim.th.toFixed(1) + '°, lâché à ' + (cl + 2) + '° : sans accrochage tant que « Limites de parcelle » n\'est pas cochée ('
      + e17.voir + ') ; cochée : ' + cl + '° (' + e18.voir + ')');

    /* point de test (relecture de m154) : son mât est dessiné le long de son axe y ; le mot de la bulle dit ce qu'on voit */
    const pt = () => C.P('RA', 'test', O.x, O.y);
    const e19 = await essai([pt(), trait('T1', 30, 1)], O, 32), e20 = await essai([pt(), trait('T1', 30, 1)], O, 118);
    R.ok(e19.a === 30 && e19.txt === '30°, perpendiculaire' && e19.ok && e20.a === 120 && e20.txt === '120°, parallèle' && e20.ok,
      'a : un point de test, dont le mât est dessiné le long de son axe y, à 1 m d\'un trait orienté à 30° : lâché à 32°, 30° et la bulle « 30°, perpendiculaire » (son mât est perpendiculaire au trait) ; lâché à 118°, « 120°, parallèle » ('
      + e19.voir + ' ; ' + e20.voir + ' ; avant : les deux mots échangés)');

    /* plan tourné d'un demi-radian (relecture de m154 ; témoin) : le trait à 30° est dans le repère du fond, l'objet au milieu de la
       place libre comme dans scene() ; la rotation du plan est rendue ensuite */
    const tourne = async (els, o, deg, coupe) => {
      await C.injecter(p, {el: els, echelle: 200});
      await p.evaluate(o => { const S = window.__vcEd.etat; S.doc.rot = 0.5; S.vue.rot = 0.5; S.vue.s = 40; S.vue.cx = o.x; S.vue.cy = o.y; window.__vcEd.redessiner();
        const w = S.vue.monde(S.vue.w / 2 + 240, S.vue.h / 2); S.vue.cx = w.x; S.vue.cy = w.y; window.__vcEd.redessiner(); }, o);
      await C.pause(p, 150); await C.outil(p, {k: 'main'}); await aimant(p, !coupe);
      const s = await choisir(p, 'RA'), t = await tourner(p, 'RA', deg), f = t.q[t.q.length - 1];
      await aimant(p, true);
      return {s, apres: t.apres, a: t.apres.a, txt: texteBulle(t.pendant), ok: bulleOk(t.pendant, f), voir: t.apres.a + ', ' + voirBulle(t.pendant, f)};
    };
    let e21 = null, e22 = null;
    try { e21 = await tourne([ra(), trait('T1', 30, 1)], O, 32); e22 = await tourne([ra(), trait('T1', 30, 1)], O, 37, true); }
    finally { await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rot = 0; S.vue.rot = 0; window.__vcEd.redessiner(); }); }
    /* poignée d'un objet jamais tourné, sur un plan tourné de 0,5 rad dans ce sens : en haut à droite (sin 0,5 = 0,48 ; cos 0,5 = 0,88) */
    const hautDroite = s => !!s.d && s.d.px - s.d.x > 0.4 * s.d.r && s.d.y - s.d.py > 0.8 * s.d.r;
    R.ok(poigneeOk(e21.s) && hautDroite(e21.s) && e21.a === 30 && e21.txt === '30°, parallèle' && e21.ok && poigneeOk(e21.apres),
      'a : plan tourné d\'un demi-radian, un regard à 1 m d\'un trait orienté à 30° dans le repère du fond : sa poignée, tournée avec le plan, est en haut à droite ; lâché à 32°, 30°, bulle « 30°, parallèle », la poignée suit ('
      + voirDisque(e21.s) + ' ; ' + e21.voir + ')');
    R.ok(e22.a === 37 && e22.txt === '37°' && e22.ok && poigneeOk(e22.apres), 'a : plan tourné, aimant coupé, lâché à 37° : 37°, l\'angle du doigt (' + e22.voir + ')');
    R.ok(!A.erreurs.length, 'a : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}
/* Point à 1 m d'un côté de limite de parcelle du fond d'au moins 4 m, à plus de 3,5 m de tout bâti, où tous les côtés de limite à 3,3 m
   ont la même direction, à 90° près : {Q, th} (th : direction du côté, de 0 à 180), ou null. */
async function limiteLibre(p){
  const v = await C.vue(p), cs = (await cotesPres(p, {x: v.cx, y: v.cy}, 60, 'limite')).filter(c => c.L >= 4).sort((a, b) => a.d - b.d);
  for (const c of cs) for (const s of [1, -1]){
    const u = {x: Math.cos(c.dir / DEG), y: Math.sin(c.dir / DEG)}, Q = {x: c.m.x - s * u.y, y: c.m.y + s * u.x};
    if ((await cotesPres(p, Q, 3.5)).length) continue;
    const lims = await cotesPres(p, Q, 3.3, 'limite');
    if (lims.length && !lims.some(l => Math.abs(ecart(4 * (l.dir - c.dir), 0)) > 2) && Math.abs(c.dir - Math.round(c.dir)) <= 0.4) return {Q, th: c.dir};
  }
  return null;
}

/* Étiquette (boîte [x0, y0, x1, y1]) et bulles (centre, rayon) de l'objet id, en pixels du canevas ; son lab ; anomalies dont la bulle
   a une place notée (glissée à la main). */
const entour = (p, id) => p.evaluate(id => {
  const S = window.__vcEd.etat, e = S.doc.el.find(x => x.id === id), et = S.zones.find(z => z.type === 'etiq' && z.id === id), D = S.doc.decisions || {};
  return {etiq: et ? et.b.slice() : null, bulles: S.zones.filter(z => z.type === 'bulle' && z.objId === id).map(z => ({x: z.x, y: z.y, r: z.r})),
    lab: e && e.lab ? JSON.parse(JSON.stringify(e.lab)) : null,
    notees: (S.doc.anomManu || []).filter(m => m.bulle).map(m => m.id).concat(Object.keys(D).filter(k => D[k] && D[k].bulle))};
}, id);
const boiteDe = b => ({x: b[0], y: b[1], w: b[2] - b[0], h: b[3] - b[1]});
/* direction (degrés) du point q vu du centre c, à l'écran, dans le sens contraire des aiguilles d'une montre */
const dirEcran = (c, q) => Math.atan2(c.y - q.y, q.x - c.x) * DEG;
/* la poignée dessinée (état s) est sur l'anneau, dans la direction du doigt q, à 1,2° près */
const sousDoigt = (s, q) => !!s.d && pres(Math.hypot(s.d.px - s.d.x, s.d.py - s.d.y), s.d.r) && Math.abs(ecart(dirEcran(s.d, {x: s.d.px, y: s.d.py}), dirEcran(s.d, q))) <= 1.2;
const voirPoignee = s => voirDisque(s) + ', écart ' + (s.d && typeof s.d.dec === 'number' ? Math.round(s.d.dec * DEG) + '°' : 'aucun') + ', ' + s.poigneeD + ' points de poignée sur 8 là où elle est dite dessinée';

/* e : poignée écartée de l'étiquette et des bulles de l'objet (relecture de m154) */
async function poigneeLibre(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const O = RUE, etat = id => etatDisque(p, id), lab0 = e => { delete e.lab; return e; };
    const anom = (id, obj) => ({id, objId: obj, reseau: 'EU', obs: 'Anomalie fictive ' + id, preco: '', nc: true, st: 'retenue'});
    /* regard sur un tuyau horizontal (WC à gauche, boîte à droite) : la bulle de son anomalie se pose au-dessus de lui */
    const ligneH = pr => { const els = [C.P('W1', 'wc', O.x - 6, O.y), C.P('R1', 'regard', O.x, O.y, pr), C.P('B1', 'boite', O.x + 6, O.y)];
      els.push(C.L('T1', 'tr', ['W1', 'R1'], C.index(els), {res: 'EU'}), C.L('T2', 'tr', ['R1', 'B1'], C.index(els), {res: 'EU'})); return els; };
    /* objet seul avec son étiquette d'office, vu à s px/m (au 1/ech, 1/200 par défaut), choisi, puis tourné de deg par sa poignée prise
       là où elle est dessinée ; la place attendue de la poignée doit être dans la prise de l'étiquette (sa boîte + 4 px) */
    const etiq = async (e0, s, deg, nom, ech) => {
      await scene(p, [lab0(e0)], O, s, null, ech);
      const s0 = await choisir(p, e0.id), v0 = await entour(p, e0.id);
      if (!v0.etiq || distBoite({x: s0.att.px, y: s0.att.py}, boiteDe(v0.etiq)) > 4)
        throw new Error('mise en place : ' + nom + ', la place attendue de la poignée n\'est pas sur l\'étiquette (' + JSON.stringify(v0.etiq) + ', ' + voirPoignee(s0) + ')');
      const t = await tourner(p, e0.id, deg, {dessinee: true}), v1 = await entour(p, e0.id);
      return {s0, v0, t, v1, dist: s0.d ? distBoite({x: s0.d.px, y: s0.d.py}, boiteDe(v0.etiq)) : NaN};
    };

    /* pixel entier à d px du point q, vers le point n ; point de la boîte b le plus proche du point q ; place attendue de la poignée d'un
       objet tourné de a degrés, d'après son état s (plan droit) ; l'objet choisi id tourné de deg degrés par un glissé qui part du pixel
       q0 (rend l'état après le lever) */
    const vers = (q, n, d) => { const L = Math.hypot(n.x - q.x, n.y - q.y); return {x: Math.round(q.x + d * (n.x - q.x) / L), y: Math.round(q.y + d * (n.y - q.y) / L)}; };
    const auBord = (q, b) => ({x: Math.min(Math.max(q.x, b.x), b.x + b.w), y: Math.min(Math.max(q.y, b.y), b.y + b.h)});
    const placeA = (s, a) => ({x: s.att.x - s.att.r * Math.sin(a / DEG), y: s.att.y - s.att.r * Math.cos(a / DEG)});
    const tournerDe = async (id, q0, deg) => { const s = await etat(id), c = {x: s.att.x, y: s.att.y}; await glisserArc(p, c, q0, [{q: arrivee(c, q0, deg, s.att.r), deg}]); return etat(id); };

    /* étiquette d'office d'un regard tourné à 270° : à sa droite, là où va la poignée */
    for (const s of [40, 80]){
      const r = await etiq(C.P('R2', 'regard', O.x, O.y, {a: 270}), s, 20, 'regard à 270°');
      R.ok(!!r.s0.d && r.dist > 18 - 0.01 && pres(Math.hypot(r.s0.d.px - r.s0.att.x, r.s0.d.py - r.s0.att.y), r.s0.att.r) && r.s0.poigneeD >= 7,
        'e : à ' + s + ' px/m, un regard tourné à 270°, son étiquette d\'office à droite, à la place de la poignée : la poignée se pose ailleurs sur l\'anneau, hors de la prise de l\'étiquette (à '
        + Math.round(r.dist) + ' px de sa boîte ; ' + voirPoignee(r.s0) + ' ; avant : dessus)');
      R.ok(r.t.apres.a === 290 && JSON.stringify(r.v1.lab) === JSON.stringify(r.v0.lab) && r.t.apres.undo === r.s0.undo + 1 && sousDoigt(r.t.pendant, r.t.q[1]),
        'e : à ' + s + ' px/m, cette poignée prise là où elle est dessinée, glissée de 20° : 290°, l\'étiquette n\'a pas bougé, un pas d\'annulation ; pendant le geste, la poignée reste sous le doigt (angle '
        + r.t.apres.a + ', étiquette ' + JSON.stringify(r.v0.lab) + ' puis ' + JSON.stringify(r.v1.lab) + ', annulations ' + r.s0.undo + ' puis ' + r.t.apres.undo + ', pendant : ' + voirPoignee(r.t.pendant)
        + ' ; avant : 270°, l\'étiquette déplacée « à la main »)');
    }
    /* l'écart de la poignée reste celui du départ pendant tout le geste : le regard à 270°, à 40 px/m, tourné d'un quart de tour en trois
       pas de 30° ; en chemin, la place de la poignée se libère (à 0°, au-dessus de lui, loin de l'étiquette) : la poignée reste sous le
       doigt jusqu'au lever, puis revient à sa place */
    const r9 = await etiq(C.P('R2', 'regard', O.x, O.y, {a: 270}), 40, [30, 30, 30], 'regard à 270°'), sous9 = r9.t.lus.map((s, k) => sousDoigt(s, r9.t.q[k + 1]));
    R.ok(r9.t.apres.a === 0 && sous9.length === 3 && sous9.every(Boolean) && !!r9.t.apres.d && r9.t.apres.d.dec === 0 && r9.t.apres.undo === r9.s0.undo + 1,
      'e : à 40 px/m, ce regard tourné d\'un quart de tour en trois pas de 30° : 0°, un pas d\'annulation ; la poignée reste sous le doigt à chaque pas, même une fois sa place libérée, et n\'y revient qu\'au lever (angle '
      + r9.t.apres.a + ', sous le doigt : ' + sous9.join(', ') + ' ; après le lever : ' + voirPoignee(r9.t.apres) + ' ; annulations ' + r9.s0.undo + ' puis ' + r9.t.apres.undo + ')');
    /* témoin : l'étiquette prise en son centre se déplace toujours */
    await scene(p, [lab0(C.P('R2', 'regard', O.x, O.y, {a: 270}))], O, 40); await choisir(p, 'R2'); const v3 = await entour(p, 'R2');
    if (!v3.etiq) throw new Error('mise en place : le regard n\'a pas d\'étiquette');
    const m3 = {x: Math.round((v3.etiq[0] + v3.etiq[2]) / 2), y: Math.round((v3.etiq[1] + v3.etiq[3]) / 2)};
    await C.glisserDoigtCv(p, m3, {x: m3.x + 30, y: m3.y + 40}); const s4 = await etat('R2');
    R.ok(!!s4.lab && s4.lab.main === true && s4.a === 270, 'e : témoin, l\'étiquette prise en son centre se déplace toujours, sans tourner le regard (' + JSON.stringify(s4.lab) + ', angle ' + s4.a + ')');

    /* marge de l'étiquette (18 px : la prise de la poignée, 14 px, et celle de l'étiquette, sa boîte + 4 px) : la place de la poignée hors
       de l'étiquette, à 9 px de sa boîte (angle du regard choisi pour cela, de 271° à 359°) : la poignée se pose ailleurs et, prise à
       11 px de son centre du côté de l'étiquette, tourne le regard sans déplacer l'étiquette */
    await scene(p, [lab0(C.P('R2', 'regard', O.x, O.y, {a: 270}))], O, 40); const s10 = await choisir(p, 'R2'), v10 = await entour(p, 'R2');
    if (!v10.etiq) throw new Error('mise en place : le regard n\'a pas d\'étiquette');
    const b10 = boiteDe(v10.etiq), loin10 = a => Math.abs(distBoite(placeA(s10, a), b10) - 9); let a10 = 271;
    for (let a = 272; a < 360; a++) if (loin10(a) < loin10(a10)) a10 = a;
    await scene(p, [lab0(C.P('R2', 'regard', O.x, O.y, {a: a10}))], O, 40); const s11 = await choisir(p, 'R2'), v11 = await entour(p, 'R2');
    const b11 = v11.etiq ? boiteDe(v11.etiq) : null, d11 = b11 ? distBoite({x: s11.att.px, y: s11.att.py}, b11) : NaN;
    if (!(d11 >= 6 && d11 <= 13)) throw new Error('mise en place : regard à ' + a10 + '°, la place attendue de sa poignée est à ' + d11 + ' px de la boîte de l\'étiquette (6 à 13 attendus)');
    const h11 = s11.d ? {x: s11.d.px, y: s11.d.py} : null, D11 = h11 ? distBoite(h11, b11) : NaN;
    const f11 = h11 ? await tournerDe('R2', vers(h11, auBord(h11, b11), 11), 20) : null, v12 = await entour(p, 'R2');
    R.ok(D11 > 18 - 0.01 && s11.poigneeD >= 7 && !!f11 && f11.a === (a10 + 20) % 360 && JSON.stringify(v12.lab) === JSON.stringify(v11.lab) && f11.undo === s11.undo + 1,
      'e : à 40 px/m, un regard à ' + a10 + '°, la place de sa poignée à ' + d11.toFixed(1) + ' px de la boîte de son étiquette : la poignée se pose à 18 px au moins de la boîte et, prise à 11 px de son centre du côté de l\'étiquette, glissée de 20°, tourne le regard sans déplacer l\'étiquette (à '
      + (isNaN(D11) ? '?' : D11.toFixed(1)) + ' px ; ' + voirPoignee(s11) + ' ; angle ' + (f11 ? f11.a : '?') + ', étiquette ' + JSON.stringify(v11.lab) + ' puis ' + JSON.stringify(v12.lab) + ', annulations ' + s11.undo + ' puis ' + (f11 ? f11.undo : '?') + ')');

    /* bulle d'une anomalie au-dessus d'un regard posé sur un tuyau horizontal */
    for (const s of [40, 80]){
      await scene(p, ligneH(), O, s, [anom('M1', 'R1')]);
      const s0 = await choisir(p, 'R1'), v0 = await entour(p, 'R1'), b0 = v0.bulles[0];
      if (v0.bulles.length !== 1 || Math.hypot(s0.att.px - b0.x, s0.att.py - b0.y) > b0.r + 6)
        throw new Error('mise en place : à ' + s + ' px/m, la bulle de l\'anomalie n\'est pas à la place attendue de la poignée (' + JSON.stringify(v0.bulles) + ', ' + voirPoignee(s0) + ')');
      const t = await tourner(p, 'R1', 40, {dessinee: true}), v1 = await entour(p, 'R1'), b1 = v1.bulles[0];
      const bouge = b1 ? Math.hypot(b1.x - b0.x, b1.y - b0.y) : NaN, dist = s0.d ? Math.hypot(s0.d.px - b0.x, s0.d.py - b0.y) - b0.r : NaN;
      R.ok(!!s0.d && dist > 20 - 0.01 && s0.poigneeD >= 7, 'e : à ' + s + ' px/m, un regard sur un tuyau horizontal, avec une anomalie retenue dont la bulle est au-dessus de lui, à la place de la poignée : la poignée se pose ailleurs sur l\'anneau, hors de la prise de la bulle (à '
        + Math.round(dist) + ' px de son bord ; ' + voirPoignee(s0) + ' ; avant : dessus)');
      R.ok(t.apres.a === 40 && bouge <= 0.5 && !v1.notees.length && t.apres.undo === s0.undo + 1 && sousDoigt(t.pendant, t.q[1]),
        'e : à ' + s + ' px/m, cette poignée glissée de 40° : 40°, la bulle n\'a pas bougé, aucune place notée, un pas d\'annulation ; la poignée reste sous le doigt (angle ' + t.apres.a + ', bulle déplacée de '
        + (isNaN(bouge) ? '?' : bouge.toFixed(1)) + ' px, places notées : ' + (v1.notees.join(', ') || 'aucune') + ', annulations ' + s0.undo + ' puis ' + t.apres.undo + ', pendant : ' + voirPoignee(t.pendant)
        + ' ; avant : angle resté absent, la bulle déplacée et sa place notée)');
    }
    /* témoin : la bulle prise en son centre se déplace toujours */
    await scene(p, ligneH(), O, 40, [anom('M1', 'R1')]); await choisir(p, 'R1'); const v5 = await entour(p, 'R1');
    if (v5.bulles.length !== 1) throw new Error('mise en place : ' + v5.bulles.length + ' bulles pour le regard');
    const m5 = {x: Math.round(v5.bulles[0].x), y: Math.round(v5.bulles[0].y)};
    await C.glisserDoigtCv(p, m5, {x: m5.x - 40, y: m5.y - 30}); const s6 = await etat('R1'), v6 = await entour(p, 'R1');
    R.ok(v6.notees.length === 1 && !s6.aDonne, 'e : témoin, la bulle prise en son centre se déplace toujours, sa place notée, sans tourner le regard (places notées : ' + (v6.notees.join(', ') || 'aucune') + ', angle ' + s6.a + ')');
    /* marge d'une bulle (20 px : la prise de la poignée, 14 px, et celle de la bulle, son rayon + 6 px) : la place de la poignée hors de la
       bulle, à 12 px de son bord (angle du regard choisi pour cela, de 1° à 89°) : la poignée se pose ailleurs et, prise à 11 px de son
       centre du côté de la bulle, tourne le regard sans la déplacer ; glissée de 20°, ou de -20° si l'aimant calait l'angle sur les
       tuyaux */
    await scene(p, ligneH(), O, 40, [anom('M1', 'R1')]); const s13 = await choisir(p, 'R1'), v13 = await entour(p, 'R1');
    if (v13.bulles.length !== 1) throw new Error('mise en place : ' + v13.bulles.length + ' bulles pour le regard');
    const bb13 = v13.bulles[0], loin13 = a => { const q = placeA(s13, a); return Math.abs(Math.hypot(q.x - bb13.x, q.y - bb13.y) - bb13.r - 12); }; let a13 = 1;
    for (let a = 2; a < 90; a++) if (loin13(a) < loin13(a13)) a13 = a;
    await scene(p, ligneH({a: a13}), O, 40, [anom('M1', 'R1')]); const s14 = await choisir(p, 'R1'), v14 = await entour(p, 'R1'), b14 = v14.bulles[0];
    const d14 = b14 ? Math.hypot(s14.att.px - b14.x, s14.att.py - b14.y) - b14.r : NaN;
    if (v14.bulles.length !== 1 || !(d14 >= 8 && d14 <= 16)) throw new Error('mise en place : regard à ' + a13 + '°, la place attendue de sa poignée est à ' + d14 + ' px du bord de la bulle (8 à 16 attendus ; ' + JSON.stringify(v14.bulles) + ')');
    const g14 = a13 + 20 > 82 && a13 + 20 < 98 ? -20 : 20, h14 = s14.d ? {x: s14.d.px, y: s14.d.py} : null, D14 = h14 ? Math.hypot(h14.x - b14.x, h14.y - b14.y) - b14.r : NaN;
    const f14 = h14 ? await tournerDe('R1', vers(h14, b14, 11), g14) : null, v15 = await entour(p, 'R1'), b15 = v15.bulles[0], bouge14 = b15 ? Math.hypot(b15.x - b14.x, b15.y - b14.y) : NaN;
    R.ok(D14 > 20 - 0.01 && s14.poigneeD >= 7 && !!f14 && f14.a === mod360(a13 + g14) && bouge14 <= 0.5 && !v15.notees.length && f14.undo === s14.undo + 1,
      'e : à 40 px/m, le regard sur un tuyau horizontal, à ' + a13 + '°, la place de sa poignée à ' + d14.toFixed(1) + ' px du bord de la bulle : la poignée se pose à 20 px au moins de la bulle et, prise à 11 px de son centre du côté de la bulle, glissée de ' + g14 + '°, tourne le regard sans déplacer la bulle (à '
      + (isNaN(D14) ? '?' : D14.toFixed(1)) + ' px ; ' + voirPoignee(s14) + ' ; angle ' + (f14 ? f14.a : '?') + ', bulle déplacée de ' + (isNaN(bouge14) ? '?' : bouge14.toFixed(1)) + ' px, places notées : ' + (v15.notees.join(', ') || 'aucune') + ', annulations ' + s14.undo + ' puis ' + (f14 ? f14.undo : '?') + ')');

    /* clapet à 270° (comme posé sur un tuyau qui descend à l'écran), au 1/100 : son étiquette d'office, « Clapet anti-retour », commence
       à 17 px du centre, à droite, là où va la poignée (au 1/200, elle commence plus loin, à 37 px) */
    const r7 = await etiq(C.P('K7', 'clapet', O.x, O.y, {a: 270}), 40, 20, 'clapet à 270°', 100);
    R.ok(r7.dist > 18 - 0.01 && r7.t.apres.a === 290 && JSON.stringify(r7.v1.lab) === JSON.stringify(r7.v0.lab) && r7.t.apres.undo === r7.s0.undo + 1,
      'e : au 1/100, à 40 px/m, un clapet à 270°, son étiquette d\'office à droite : sa poignée se pose hors de l\'étiquette et, glissée de 20°, donne 290°, l\'étiquette immobile (à ' + Math.round(r7.dist) + ' px de sa boîte, angle '
      + r7.t.apres.a + ', étiquette ' + JSON.stringify(r7.v0.lab) + ' puis ' + JSON.stringify(r7.v1.lab) + ' ; avant : 270°, l\'étiquette déplacée)');

    /* témoin : l'étiquette d'office d'un regard jamais tourné est à sa droite, loin de la poignée, qui reste au-dessus de lui */
    await scene(p, [lab0(C.P('R8', 'regard', O.x, O.y))], O, 40); const s8 = await choisir(p, 'R8'), v8 = await entour(p, 'R8');
    R.ok(!!v8.etiq && poigneeOk(s8) && pres(s8.d.px, s8.att.x) && pres(s8.d.py, s8.att.y - s8.att.r), 'e : témoin, un regard jamais tourné, son étiquette d\'office à droite : la poignée reste à sa place, au-dessus de lui ('
      + voirPoignee(s8) + ', étiquette ' + JSON.stringify(v8.etiq && v8.etiq.map(Math.round)) + ')');
    R.ok(!A.erreurs.length, 'e : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* g : gestes du disque qui ne changent rien (relecture de m154) */
async function sansChangement(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const O = RUE, etat = id => etatDisque(p, id), k1 = () => [C.P('K1', 'caniveau', O.x, O.y, {a: 0})];
    /* un bouton grisé n'est pas pressé (le constat le dit) : le scénario continue */
    const BA = '.vc .vc-barre [data-a="annuler"]', BR = '.vc .vc-barre [data-a="refaire"]';
    const bouton = async q => { if (await p.evaluate(s => !document.querySelector(s).disabled, q)) await p.click(q); await C.pause(p, 250); };
    const barre = () => p.evaluate(([ba, br]) => ({annuler: !document.querySelector(ba).disabled, retablir: !document.querySelector(br).disabled, redo: window.__vcEd.etat.redo.length}), [BA, BR]);
    const voirBarre = b => b.redo + ' pas à rétablir, « Rétablir » ' + (b.retablir ? 'actif' : 'grisé');
    /* caniveau tourné de 40°, puis l'annulation : « Rétablir » tient l'angle de 40° */
    const annule = async () => {
      await scene(p, k1(), O, 40); await choisir(p, 'K1'); const t = await tourner(p, 'K1', 40);
      await bouton(BA); const u = await etat('K1'), b = await barre();
      if (t.apres.a !== 40 || u.a !== 0 || b.redo !== 1 || !b.retablir) throw new Error('mise en place : tourné de 40° puis annulé (' + t.apres.a + ', ' + u.a + ', ' + voirBarre(b) + ')');
    };

    /* tourné puis ramené au départ, après une annulation */
    await annule(); await choisir(p, 'K1'); const t1 = await tourner(p, 'K1', [30, -30]), b1 = await barre();
    await bouton(BR); const r1 = await etat('K1');
    R.ok(t1.lus[0].a === 30 && t1.apres.a === 0 && b1.redo === 1 && b1.retablir && r1.a === 40,
      'g : après une annulation, un geste du disque ramené à son départ garde « Rétablir », actif, qui rend l\'angle annulé (pendant ' + t1.lus[0].a + ', après ' + t1.apres.a + ' ; ' + voirBarre(b1)
      + ' ; « Rétablir » : ' + r1.a + ' ; avant : plus rien à rétablir, le bouton resté actif, l\'angle resté à 0)');
    /* Échap pendant le geste, à la souris */
    await annule();
    const s2 = await choisir(p, 'K1'), c2 = {x: s2.att.x, y: s2.att.y}, q2 = {x: Math.round(s2.att.px), y: Math.round(s2.att.py)}, f2 = arrivee(c2, q2, 25, s2.att.r);
    let m2 = null;
    await C.glisserSourisCv(p, q2, f2, 'left', {avantLever: async () => { await C.pause(p, 150); m2 = await etat('K1'); await p.keyboard.press('Escape'); await C.pause(p, 150); }});
    const e2 = await etat('K1'), b2 = await barre(); await bouton(BR); const r2 = await etat('K1');
    R.ok(m2.a === 25 && e2.a === 0 && b2.redo === 1 && b2.retablir && r2.a === 40,
      'g : de même, à la souris, Échap pendant le geste rend l\'angle et garde « Rétablir », qui rend l\'angle annulé (pendant ' + m2.a + ', après Échap ' + e2.a + ' ; ' + voirBarre(b2) + ' ; « Rétablir » : ' + r2.a
      + ' ; avant : plus rien à rétablir)');
    /* témoin : sans annulation, rien à rétablir */
    await scene(p, k1(), O, 40); await choisir(p, 'K1'); const t3 = await tourner(p, 'K1', [30, -30]), b3 = await barre();
    R.ok(t3.apres.a === 0 && b3.redo === 0 && !b3.retablir, 'g : témoin, sans annulation, le même geste laisse « Rétablir » grisé (' + voirBarre(b3) + ')');

    /* toucher bref, glissé de 5 px : sur la poignée, sur l'anneau */
    const surAnneau = (s, deg) => { const u = Math.atan2(s.att.y - s.att.py, s.att.px - s.att.x) + deg / DEG; return {x: Math.round(s.att.x + s.att.r * Math.cos(u)), y: Math.round(s.att.y - s.att.r * Math.sin(u))}; };
    const resteChoisi = (s, s0) => s.sel === s0.sel && s.pan && poigneeOk(s) && s.a === s0.a && s.undo === s0.undo;
    const voirChoix = s => 'choisi : ' + s.sel + ', fiche ' + (s.pan ? 'ouverte' : 'fermée') + ', angle ' + s.a + ', annulations ' + s.undo + ', ' + voirDisque(s);
    await scene(p, k1(), O, 40); const s4 = await choisir(p, 'K1');
    await C.toucherCv(p, surAnneau(s4, 0)); const s5 = await etat('K1');
    await C.toucherCv(p, surAnneau(s4, 180)); const s6 = await etat('K1');
    R.ok(resteChoisi(s5, s4) && resteChoisi(s6, s4), 'g : un toucher bref sur la poignée, puis sur l\'anneau à l\'opposé : rien ne tourne, le caniveau reste choisi, sa fiche ouverte, sans pas d\'annulation (poignée : '
      + voirChoix(s5) + ' ; anneau : ' + voirChoix(s6) + ' ; avant : plus rien de choisi)');
    const q7 = surAnneau(s4, 0); await C.glisserDoigtCv(p, q7, {x: q7.x + 5, y: q7.y}); const s7 = await etat('K1');
    R.ok(resteChoisi(s7, s4), 'g : un glissé de 5 px sur la poignée, plus court que le seuil d\'un glissé au doigt (9 px) : de même (' + voirChoix(s7) + ' ; avant : plus rien de choisi)');
    /* témoin : un WC posé sous l'anneau, à droite du caniveau, se choisit */
    const w8 = C.P('W8', 'wc', O.x + s4.att.r / 40, O.y);
    await scene(p, k1().concat([w8]), O, 40); const s8 = await choisir(p, 'K1'), c8 = await C.ecranCv(p, w8.x, w8.y);
    if (Math.abs(Math.hypot(c8.x - s8.att.x, c8.y - s8.att.y) - s8.att.r) > 2) throw new Error('mise en place : le WC n\'est pas sous l\'anneau (' + JSON.stringify(c8) + ', ' + voirDisque(s8) + ')');
    await C.toucherCv(p, {x: Math.round(c8.x), y: Math.round(c8.y)}); const s9 = await etat('W8');
    R.ok(s9.sel === 'W8', 'g : témoin, un toucher bref sur l\'anneau, là où est un WC : le WC se choisit (choisi : ' + s9.sel + ')');

    /* regard sur un tuyau vertical : sa poignée, au-dessus de lui, est sur le tuyau */
    const ligneV = () => { const els = [C.P('R2', 'regard', O.x, O.y + 6), C.P('R1', 'regard', O.x, O.y), C.P('R3', 'regard', O.x, O.y - 6)];
      els.push(C.L('T1', 'tr', ['R2', 'R1'], C.index(els), {res: 'EU'}), C.L('T2', 'tr', ['R1', 'R3'], C.index(els), {res: 'EU'})); return els; };
    await scene(p, ligneV(), O, 40); const s10 = await choisir(p, 'R1');
    if (!s10.d || Math.abs(s10.d.px - s10.att.x) > 1 || !(s10.d.py < s10.att.y)) throw new Error('mise en place : la poignée du regard n\'est pas au-dessus de lui, sur le tuyau (' + voirDisque(s10) + ')');
    await C.toucherCv(p, surAnneau(s10, 0)); const s11 = await etat('R1');
    R.ok(resteChoisi(s11, s10), 'g : la poignée d\'un regard, posée sur son tuyau qui monte à l\'écran, touchée brièvement : le regard reste choisi, le tuyau ne se choisit pas (' + voirChoix(s11) + ' ; avant : le tuyau choisi)');
    await C.toucherCv(p, surAnneau(s10, 180)); const s12 = await etat('R1');
    R.ok(s12.sel === 'T1' || s12.sel === 'T2', 'g : témoin, l\'anneau touché brièvement là où passe ce tuyau, sous le regard : le tuyau se choisit (choisi : ' + s12.sel + ')');
    R.ok(!A.erreurs.length, 'g : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* m156 (EL1) : appui sur le disque de l'objet choisi id, sur la poignée (o.depuis absent) ou sur l'anneau à o.depuis degrés d'elle, à la
   souris (o.souris) ou au doigt ; o.avant() : appelée l'appui posé, sans mouvement (avant le seuil) ; puis un arc de deg degrés en douze
   pas, l'état lu le bouton (ou le doigt) encore posé (pendant), et le lever (apres). Rend aussi ce qu'a rendu o.avant (ap). */
async function appuiPuisArc(p, id, deg, o){
  o = o || {};
  const s = await etatDisque(p, id), c = {x: s.att.x, y: s.att.y}, u = Math.atan2(c.y - s.att.py, s.att.px - c.x) + (o.depuis || 0) / DEG;
  const q0 = {x: Math.round(c.x + s.att.r * Math.cos(u)), y: Math.round(c.y - s.att.r * Math.sin(u))}, f = arrivee(c, q0, deg, s.att.r);
  const cp = await C.pageCv(p, c), a0 = await C.pageCv(p, q0), b = await C.pageCv(p, f);
  await C.surLePlan(p, a0, 'l\'appui'); await C.surLePlan(p, b, 'le glissé');
  const ua = Math.atan2(cp.y - a0.y, a0.x - cp.x), ra = Math.hypot(a0.x - cp.x, a0.y - cp.y), rb = Math.hypot(b.x - cp.x, b.y - cp.y);
  const pas = i => { const v = ua + deg / DEG * i / 12, r = ra + (rb - ra) * i / 12; return {x: cp.x + r * Math.cos(v), y: cp.y - r * Math.sin(v)}; };
  let ap = null, pendant = null;
  if (o.souris){
    await p.mouse.move(a0.x, a0.y); await p.mouse.down(); await C.pause(p, 100);
    if (o.avant) ap = await o.avant();
    for (let i = 1; i < 12; i++){ const q = pas(i); await p.mouse.move(q.x, q.y); }
    await p.mouse.move(b.x, b.y); await C.pause(p, 150); pendant = await etatDisque(p, id);
    await p.mouse.up();
  } else {
    const ss = await p.context().newCDPSession(p), t = (type, q) => ss.send('Input.dispatchTouchEvent', {type, touchPoints: q ? [{x: q.x, y: q.y, id: 1}] : []});
    try {
      await t('touchStart', a0); await C.pause(p, 100);
      if (o.avant) ap = await o.avant();
      for (let i = 1; i < 12; i++) await t('touchMove', pas(i));
      await t('touchMove', b); await C.pause(p, 150); pendant = await etatDisque(p, id);
      await t('touchEnd', null);
    } finally { await ss.detach(); }
  }
  await C.pause(p, 450);
  return {ap, pendant, apres: await etatDisque(p, id)};
}
/* h (m156, EL1) : Échap (ou le retour d'Android, ou fermerNiveau) avant le seuil d'un glissé du disque */
async function avantLeSeuil(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const O = RUE, etat = id => etatDisque(p, id), r1 = () => [C.P('R1', 'regard', O.x, O.y)];
    const BA = '.vc .vc-barre [data-a="annuler"]', BR = '.vc .vc-barre [data-a="refaire"]';
    const bouton = async q => { if (await p.evaluate(s => !document.querySelector(s).disabled, q)) await p.click(q); await C.pause(p, 250); };
    const barre = () => p.evaluate(([ba, br]) => ({annuler: !document.querySelector(ba).disabled, retablir: !document.querySelector(br).disabled, redo: window.__vcEd.etat.redo.length}), [BA, BR]);
    const voirBarre = b => b.redo + ' pas à rétablir, « Rétablir » ' + (b.retablir ? 'actif' : 'grisé');
    const geste = () => p.evaluate(() => { const g = window.__vcEd.etat.geste; return g ? g.type + '/' + (g.cible ? g.cible.k : '') : null; });
    const ouvert = () => p.evaluate(() => { const r = document.querySelector('.vc'); return !!r && r.isConnected && r.getBoundingClientRect().width > 0 && !!window.__vcEd.etat; });
    const voir = s => s ? 'angle ' + (s.aDonne ? s.a : 'absent') + ', choisi : ' + s.sel + ', fiche ' + (s.pan ? 'ouverte' : 'fermée') + ', annulations ' + s.undo + ', disque ' + (poigneeOk(s) ? 'visible' : 'absent') : 'aucun état';
    /* regard tourné de 40°, puis l'annulation : il n'a plus d'angle (p.a absent) et « Rétablir » tient les 40° */
    const annule = async () => {
      await scene(p, r1(), O, 40); await choisir(p, 'R1'); const t = await tourner(p, 'R1', 40);
      await bouton(BA); const u = await etat('R1'), b = await barre();
      if (t.apres.a !== 40 || u.aDonne || b.redo !== 1 || !b.retablir) throw new Error('mise en place : tourné de 40° puis annulé (' + t.apres.a + ', ' + voir(u) + ', ' + voirBarre(b) + ')');
    };
    /* les trois voies : Échap, retour d'Android (popstate de la fenêtre du croquis : retenir), fermerNiveau appelé directement */
    const echap = async () => { await p.keyboard.press('Escape'); await C.pause(p, 150); return {g: await geste(), s: await etat('R1')}; };
    const retour = async () => { await p.evaluate(() => history.back()); await C.pause(p, 400); return {g: await geste(), s: await etat('R1'), ouvert: await ouvert()}; };
    const direct = async () => { const x = await p.evaluate(() => window.__vcEd.fermerNiveau()); await C.pause(p, 100); return {x, g: await geste(), s: await etat('R1')}; };
    for (const [nom, souris, depuis, voie] of [
      ['à la souris, sur la poignée, Échap', true, 0, echap],
      ['à la souris, sur l\'anneau (à 120° de la poignée), Échap', true, 120, echap],
      ['au doigt, sur la poignée, Échap', false, 0, echap],
      ['au doigt, sur l\'anneau (à 240° de la poignée), retour d\'Android', false, 240, retour],
      ['à la souris, sur la poignée, fermerNiveau appelé directement', true, 0, direct]]){
      await annule(); const s0 = await choisir(p, 'R1');
      const t = await appuiPuisArc(p, 'R1', 40, {souris, depuis, avant: voie}), b1 = await barre();
      const reste = s => !!s && !s.aDonne && s.sel === 'R1' && s.pan && poigneeOk(s) && s.undo === s0.undo;
      const ap = t.ap || {}, okVoie = ap.g === null && reste(ap.s) && (voie !== retour || ap.ouvert) && (voie !== direct || ap.x === true);
      R.ok(okVoie && reste(t.pendant) && reste(t.apres) && b1.redo === 1 && b1.retablir,
        'h : ' + nom + ' avant le seuil, puis glissé de 40° et lever : l\'attente est close, rien ne tourne, le regard reste choisi, sa fiche ouverte, son disque visible, sans pas d\'annulation, « Rétablir » intact ('
        + (voie === direct ? 'fermerNiveau rend ' + ap.x + ', ' : '') + (voie === retour ? 'croquis ' + (ap.ouvert ? 'ouvert' : 'fermé') + ', ' : '')
        + 'geste ' + ap.g + ' ; aussitôt : ' + voir(ap.s) + ' ; pendant : ' + voir(t.pendant) + ' ; après le lever : ' + voir(t.apres) + ' ; ' + voirBarre(b1)
        + ' ; avant : fiche fermée, puis le regard tourné sans disque, en un pas d\'annulation)');
      /* fiche déjà fermée (avant m156) : un second Échap fermerait le croquis */
      if (!t.apres || !t.apres.pan){ R.ok(false, 'h : ' + nom + ' : second Échap non essayé, la fiche est déjà fermée (' + voir(t.apres) + ')'); continue; }
      await p.keyboard.press('Escape'); await C.pause(p, 200); const s2 = await etat('R1');
      R.ok(s2.sel === null && !s2.pan && !s2.aDonne && s2.undo === s0.undo, 'h : ' + nom + ' : un second Échap ferme la fiche (' + voir(s2) + ')');
    }
    /* témoin : l'attente d'un autre geste (appui sur le regard lui-même, choisi) n'est pas close par fermerNiveau, qui ferme la fiche */
    await scene(p, r1(), O, 40); const s3 = await choisir(p, 'R1'), a3 = await C.pageCv(p, {x: Math.round(s3.att.x), y: Math.round(s3.att.y)});
    await p.mouse.move(a3.x, a3.y); await p.mouse.down(); await C.pause(p, 100);
    const g3 = await geste(), x3 = await p.evaluate(() => window.__vcEd.fermerNiveau()), g4 = await geste(), s4 = await etat('R1');
    await p.mouse.up(); await C.pause(p, 450);
    R.ok(/^attente\//.test(g3 || '') && g3 !== 'attente/tourner' && g4 === g3 && x3 === true && !s4.pan,
      'h : témoin, appui sur le regard lui-même (geste ' + g3 + ') : fermerNiveau ferme la fiche (' + x3 + ', fiche ' + (s4.pan ? 'ouverte' : 'fermée') + ') et l\'attente reste (' + g4 + '), comme avant');
    R.ok(!A.erreurs.length, 'h : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [raccord, coude, mur, triple, projet, supprime, bout, oriente, queue, disque, accroche, poigneeLibre, sansChangement, avantLeSeuil]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception du test : ' + (e && e.stack || e)); }
  }
  R.fin();
})();
