// Rejets du lot « Rejets » dans l'éditeur du croquis, dans Chromium (décisions D2 et D8 de .claude/conception-rejets.md ; m117). Données
// fictives : fond de VCroquis.demoDxf() (12 rue Fictive, Ville-Exemple), croquis vidé, plan tourné d'un demi-radian.
// n1 : témoin d'abord : outil Regard, « Cotes », la façade sud du bâti, puis un endroit au-delà du coin ouest : l'aperçu de pose (le symbole
//     fantôme au point calculé) d'un type non orienté reste penché, de la rotation du plan. Puis « Infiltration au sol » est dans la palette
//     Équipements, juste après « Puisard » ; outil choisi par la palette, les mêmes cotes : le panneau dit « Infiltration au sol posée depuis :
//     Façade » ; l'aperçu est droit à l'écran : une tige verticale et trois barres horizontales, en vert. Après « Poser » : une infiltration
//     sans angle propre (p.a), droite sur le plan. Aucune erreur dans la console.
// Échoue sur 2f3faa1 (type « infiltration » absent), sauf le témoin du regard et l'absence d'erreur dans la console.
// usage : node tests/navigateur/rejets.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('rejets');

/* repère de la démonstration (VCroquis.demoDxf) : origine et rotation du bâti */
const DEMO = {x: 1700000, y: 8200000, th: 12 * Math.PI / 180};
const demoAbs = (u, v) => ({x: DEMO.x + u * Math.cos(DEMO.th) - v * Math.sin(DEMO.th), y: DEMO.y + u * Math.sin(DEMO.th) + v * Math.cos(DEMO.th)});
const ROT = .5, VERT = '#00a050';

/* dossier neuf, croquis sur le fond de démonstration, vidé, plan et vue tournés de ROT ; A.plan(u, v) : point de la démonstration dans le
   repère du croquis */
async function croquisTourne(){
  const A = await C.ouvrir(), p = A.p;
  await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
  const o = await p.evaluate(() => window.__vcEd.etat.doc.origine);
  A.plan = (u, v) => { const a = demoAbs(u, v); return {x: a.x - o.x, y: a.y - o.y}; };
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

(async () => {
  for (const f of [apercu]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
