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
//     l'envers et indiqué « Sens inverse ») ; une gargouille regarde vers la sortie de l'eau, même quand le raccord est le premier sommet ;
// s : aussi pour un exutoire (puisard) supprimé.
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
       plan, et les deux touchers suivants, au même endroit de l'écran, ne posent pas de second regard */
    const r = await p.evaluate(() => { const b = document.querySelector('.vc .vc-cv').getBoundingClientRect(); return {l: b.left, t: b.top, w: b.width, h: b.height}; });
    const q = {x: r.l + 0.65 * r.w, y: r.t + 0.5 * r.h}, v0 = await C.vue(p);
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
  ];
  for (const k of cas){
    const A = await croquisNeuf(), p = A.p;
    try {
      const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, o = (x, y) => [cx + x, cy + y];
      const els = [C.P('w1', k.source || 'wc', ...o(-2.1, -2.1)), C.J('j1', ...o(0, 0)), k.t === 'gargouille' ? C.P('w2', 'descente', ...o(2, -2)) : C.P('r1', 'regard', ...o(2, 2), {tampon: 'fonte'})], I = C.index(els);
      els.push(C.L('A', 'tr', k.A, I, k.q), k.t === 'gargouille' ? C.L('B', 'tr', ['w2', 'j1'], I, {res: 'EP'}) : C.L('C', 'tr', ['j1', 'r1'], I));
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

(async () => {
  for (const f of [raccord, coude, mur, triple, projet, supprime, bout, oriente, queue]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception du test : ' + (e && e.stack || e)); }
  }
  R.fin();
})();
