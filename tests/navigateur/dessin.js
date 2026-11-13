// Grille de 400 touchers dans l'éditeur du croquis, dans Chromium (fond fictif de VCroquis.demoDxf(), croquis de démonstration et deux
// traits « Complément du fond » fictifs) : garde des aides au dessin, posée par le correctif m99 (lignes de référence du plan).
// Avec l'outil Complément du fond, puis l'outil Tronçon, 100 tracés de deux touchers chacun, par l'API de test de l'éditeur (tap, aux
// points du canevas) : un départ, puis un point d'une grille de 10 × 10 autour du bâti de démonstration (u 63 à 77, v -3 à 15 dans le
// repère de la démonstration ; départ à 2,6 m du point, dans une direction qui tourne de 37° d'un point au suivant). Vue fixe (22 px
// par mètre), aides au dessin par défaut, ni double toucher ni garde de temps entre deux touchers (états remis à zéro).
// Chaque toucher donne : le point posé (repère de la démonstration, au 0,1 mm) et son genre (coin, façade, parallèle, angle, objet,
// sommet ou segment d'un tracé, libre), ou le tronçon terminé (ses sommets), ou rien. Les 400 résultats doivent redonner ceux de
// df95377 : empreinte sha256 de l'ensemble, et une par outil et par rangée de la grille pour situer un écart.
// Puis les côtés du bâti que suivent les aides (cache de l'éditeur) : les 92 de df95377, mêmes valeurs, même ordre, même grille de cases ;
// depuis m99, chacun porte le rang de sa polyligne dans fond.L et celui de son premier sommet.
// Enfin 9 glissés au doigt d'un sommet des deux traits de complément (outil Choisir, trait choisi, même vue) : le trait glissé n'accroche
// ni ses coins ni ses côtés (trait exclu des aides, « sauf » de segsPres), l'autre trait et le bâti restent des cibles. Les sommets obtenus
// doivent redonner ceux de df95377.
// Le test passe sur df95377 et après ; il garde m111 et m112 (palette et nouveaux accrochages décochés : mêmes points).
// usage : node tests/navigateur/dessin.js [-v] [--app=<dossier>] [--detail=<fichier>]
//   --detail=<fichier> : écrit les 400 résultats en clair ; lancé sur deux versions, « diff » montre l'écart.
'use strict';
const crypto = require('crypto'), fs = require('fs'), path = require('path');
const C = require('./commun.js');
const R = C.rapport('dessin'), V = process.argv.indexOf('-v') >= 0;
const option = n => { const a = process.argv.find(x => x.indexOf('--' + n + '=') === 0); return a ? a.slice(n.length + 3) : null; };

/* Repère de la démonstration (DEMO dans croquis.js) : u le long de la rue, v vers les maisons du nord ; le plan est tourné de 12°. */
const DEMO = {x: 1700000, y: 8200000, th: 12 * Math.PI / 180};
const demoAbs = (u, v) => ({x: DEMO.x + u * Math.cos(DEMO.th) - v * Math.sin(DEMO.th), y: DEMO.y + u * Math.sin(DEMO.th) + v * Math.cos(DEMO.th)});

/* Grille : 10 valeurs de u et de v, choisies près des côtés du bâti (u 65,5 et 74,5 ; v 4 et 14), des objets et des tracés de la
   démonstration (boîtes, regard, descentes, collecteurs), des deux traits de complément, et loin de tout. */
const GU = [63.1, 64.6, 65.3, 66.2, 67.3, 69.8, 72.4, 74.2, 74.9, 76.6];
const GV = [-3.2, -0.4, 0.9, 2.6, 3.7, 4.3, 8.2, 12.9, 13.8, 15.1];
const OUTILS = [['lim', 'Complément du fond'], ['tr', 'Tronçon']];

/* Valeurs figées sur df95377 (v1.7.0, m100), les mêmes sur 1e27c7b (m97) : empreinte de l'ensemble, puis, par outil, une par rangée de
   la grille (v de -3,2 à 15,1). */
const ATTENDU = {
  tout: '9861fcb24818fe0f',
  lim: ['100c7c551de0274f', '3b120eb3b2ecd4af', '1deba6b278d3a09b', '2c2a31dd3c513333', 'cf2cb87e1d53ebbc', 'b13d34c74e22388e', 'a4e7fc2f8d663b0e', '7a577970503ef565', '04a9206dd95a4766', '96615e9b58b09156'],
  tr: ['481ea759011ffdcb', '91cdaf91a9d67cd3', 'e90c47bf0ed1735e', 'dabc0b4a8728ba99', '530634135fc6c34c', 'ce75f4cd431dba78', '232a9c49122844b9', '8a444c7d9931c8b8', '53c2ac22580b12e1', '60f967d9dffd7362']
};

/* Glissés au doigt : [trait, rang du sommet, point visé (u, v)], puis les sommets du trait après le glissé, figés sur df95377 (les mêmes
   sur 1e27c7b). c1 : (68 ; 15,3), (76,5 ; 15,3), (76,5 ; 19) ; c2 : (71,5 ; -0,3), (76,2 ; -0,3). Sans l'exclusion du trait glissé,
   tous sauf le 4e changent : le sommet reste sur son ancien point ou se pose sur un sommet ou un côté de son propre trait. Si les
   traits de complément n'étaient plus des cibles, le 4e changerait. */
const GLISSES = [
  ['c1', 1, 76.0, 15.3], /* coin de c1 glissé de 0,5 m le long de son côté : parallèle au bâti */
  ['c1', 1, 68.4, 15.5], /* le même, près du premier sommet de c1 : libre */
  ['c1', 0, 76.3, 17.0], /* premier sommet de c1, près du dernier côté de c1 : libre */
  ['c2', 1, 76.3, 15.0], /* bout de c2, près du coin de c1 : il s'y pose */
  ['c2', 1, 71.9, -0.1], /* le même, près de l'autre bout de c2 : libre */
  ['c1', 0, 68.0, 14.2], /* premier sommet de c1, près de la façade nord du bâti : il s'y pose */
  ['c2', 0, 71.2, 0.2], /* premier sommet de c2 glissé de 0,6 m : libre */
  ['c1', 2, 76.3, 15.6], /* dernier sommet de c1, près du coin de c1 : libre */
  ['c1', 1, 76.7, 18.6] /* coin de c1, près du dernier sommet de c1 : libre */
];
const ATTENDU_GLISSES = [
  'c1 68.0000;15.3000 76.0000;15.2999 76.5000;19.0000', 'c1 68.0000;15.3000 68.4091;15.5000 76.5000;19.0000',
  'c1 76.3182;17.0000 76.5000;15.3000 76.5000;19.0000', 'c2 71.5000;-0.3000 76.5000;15.3000', 'c2 71.5000;-0.3000 71.9091;-0.0909',
  'c1 68.0000;13.9997 76.5000;15.3000 76.5000;19.0000', 'c2 71.1818;0.1818 76.2000;-0.3000', 'c1 68.0000;15.3000 76.5000;15.3000 76.3182;15.5909',
  'c1 68.0000;15.3000 76.6818;18.5909 76.5000;19.0000'
];

const empreinte = t => crypto.createHash('sha256').update(t).digest('hex').slice(0, 16);

async function grille(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
    const o = await p.evaluate(() => { const S = window.__vcEd.etat; return {doc: S.doc.origine, fond: S.fond ? S.fond.origine : null, u: S.doc.u, fu: S.fond ? S.fond.u : null}; });
    if (!o.fond || o.doc.x !== o.fond.x || o.doc.y !== o.fond.y || o.u !== 1 || o.fu !== 1) throw new Error('le croquis n\'a pas l\'origine du fond : ' + JSON.stringify(o));
    const plan = (u, v) => { const a = demoAbs(u, v); return [a.x - o.doc.x, a.y - o.doc.y]; };
    /* deux traits de complément fictifs : une clôture au fond du jardin (v 15,3) et un muret le long de la rue, devant la boîte EP */
    const lims = [
      {id: 'c1', k: 'ln', t: 'lim', v: [plan(68, 15.3), plan(76.5, 15.3), plan(76.5, 19)].map(q => ({x: q[0], y: q[1], a: null})), p: {st: 'existant'}, lab: null},
      {id: 'c2', k: 'ln', t: 'lim', v: [plan(71.5, -0.3), plan(76.2, -0.3)].map(q => ({x: q[0], y: q[1], a: null})), p: {st: 'existant'}, lab: null}
    ];
    /* croquis de démonstration (identifiants renommés d1, d2… dans l'ordre du dessin) et les deux traits ; vue fixe */
    await p.evaluate(([lims]) => {
      const ed = window.__vcEd, S = ed.etat, d = window.VCroquis.demoCroquis(S.fond), nom = {};
      d.el.forEach((e, i) => { nom[e.id] = 'd' + (i + 1); });
      d.el.forEach(e => { e.id = nom[e.id]; if (e.v) e.v.forEach(v => { if (v.a) v.a = nom[v.a]; }); });
      S.doc.el = d.el.concat(lims); S.doc.anomManu = []; S.doc.decisions = {}; S.doc.ordre = []; S.doc.rot = d.rot;
      S.undo = []; S.redo = []; S.sel = null; S.panneau = null; S.dernierePose = null; S.dernierTap = null; S.finAuto = null; S.gardeFiche = null;
      ed.synchroniser();
    }, [lims]);
    const c = plan(70, 6.5), vue = {cx: c[0], cy: c[1], s: 22};
    /* tâches : par outil, par rangée (v), par colonne (u) : départ à 2,6 m du point de la grille, puis le point */
    const taches = [];
    OUTILS.forEach(([t]) => GV.forEach((v, j) => GU.forEach((u, i) => {
      const k = 10 * j + i, phi = (37 * k % 360) * Math.PI / 180;
      taches.push({outil: t, j, a: plan(u + 2.6 * Math.cos(phi), v + 2.6 * Math.sin(phi)), g: plan(u, v)});
    })));
    const res = await p.evaluate(async ([taches, vue, o, th]) => {
      const ed = window.__vcEd, S = ed.etat, base = JSON.stringify(S.doc.el), out = [];
      const image = () => new Promise(f => requestAnimationFrame(() => requestAnimationFrame(f)));
      const el = id => S.doc.el.find(e => e.id === id);
      /* point du plan vers le repère de la démonstration, au 0,1 mm */
      const pt = q => { const x = q.x + o.x - 1700000, y = q.y + o.y - 8200000; return (x * Math.cos(th) + y * Math.sin(th)).toFixed(4) + ';' + (-x * Math.sin(th) + y * Math.cos(th)).toFixed(4); };
      const genre = q => {
        if (q.aide) return q.aide;
        const s = q.snap; if (!s) return 'libre';
        const e = el(s.type === 'obj' ? s.id : s.ligne); return s.type + ':' + (e ? e.t : '?');
      };
      const etat = () => {
        const b = S.brouillon, change = JSON.stringify(S.doc.el) !== base;
        if (b && b.pts.length){ const q = b.pts[b.pts.length - 1]; return 'b' + b.pts.length + ' ' + pt(q) + ' ' + genre(q) + (change ? ' modifié' : ''); }
        const l = S.sel && el(S.sel.id);
        /* tracé terminé : ses sommets (celui qui est posé sur un objet est à la place de l'objet) et le genre de l'objet porteur */
        if (change) return l && l.k === 'ln' ? 'fin ' + l.v.map(v => { const a = v.a && el(v.a); return pt(a && a.k === 'pt' ? a : v) + (v.a ? ':' + (a ? a.t : '?') : ''); }).join(' ') : 'modifié';
        return 'rien';
      };
      for (const t of taches){
        S.brouillon = null; S.sel = null; S.panneau = null;
        ed.choisirOutil({k: 'ln', id: t.outil, pal: 'tr'});
        S.vue.cx = vue.cx; S.vue.cy = vue.cy; S.vue.s = vue.s; ed.redessiner(); await image();
        for (const q of [t.a, t.g]){
          /* ni double toucher, ni fin automatique récente, ni garde de fiche : chaque toucher compte seul */
          S.dernierTap = null; S.finAuto = null; S.dernierePose = null; S.clicHors = null; S.gardeFiche = null;
          const e = S.vue.ecran(q[0], q[1]); ed.tap(e.x, e.y); out.push(etat());
        }
        S.brouillon = null;
        if (JSON.stringify(S.doc.el) !== base){ S.doc.el = JSON.parse(base); S.undo = []; S.redo = []; S.sel = null; S.panneau = null; ed.synchroniser(); }
      }
      S.sel = null; S.panneau = null; ed.synchroniser();
      return out;
    }, [taches, vue, o.doc, DEMO.th]);
    /* côtés du bâti que suivent les aides (cache de l'éditeur, rempli par la grille) : ceux de la boucle de df95377, aux mêmes valeurs et
       dans le même ordre, avec la même grille de cases de 8 m ; depuis m99 (VCroquis.geo.lignesRef), chacun porte aussi le rang de sa
       polyligne dans fond.L et celui de son premier sommet */
    const ar = await p.evaluate(() => {
      const S = window.__vcEd.etat, f = S.aff.fond ? S.fond : null, A = S.aretes;
      if (!f || !A) return null;
      const off = window.VCroquis.decalageFond(f, S.doc) || {x: 0, y: 0}, TU = 8, g = {};
      let segs = [];
      f.L.forEach(l => {
        const cq = f.calques[l.c], st = cq.style; if ((st !== 'bati' && st !== 'batileger') || !cq.vis) return;
        for (let k = 1; k < l.n; k++){ const i0 = 2 * (l.d + k - 1), i1 = 2 * (l.d + k); segs.push([f.xy[i0] + off.x, f.xy[i0 + 1] + off.y, f.xy[i1] + off.x, f.xy[i1 + 1] + off.y, l]); }
      });
      segs = segs.filter(sg => isFinite(sg[0]) && isFinite(sg[1]) && isFinite(sg[2]) && isFinite(sg[3]) && Math.abs(sg[2] - sg[0]) + Math.abs(sg[3] - sg[1]) < 2000);
      segs.forEach((sg, i) => {
        const x0 = Math.floor(Math.min(sg[0], sg[2]) / TU), x1 = Math.floor(Math.max(sg[0], sg[2]) / TU), y0 = Math.floor(Math.min(sg[1], sg[3]) / TU), y1 = Math.floor(Math.max(sg[1], sg[3]) / TU);
        if ((x1 - x0 + 1) * (y1 - y0 + 1) <= 16){ for (let a = x0; a <= x1; a++) for (let b = y0; b <= y1; b++){ const k2 = a + ',' + b; (g[k2] = g[k2] || []).push(i); } return; }
        const vu = {}, n = Math.ceil(Math.hypot(sg[2] - sg[0], sg[3] - sg[1]) / (TU / 2));
        for (let q = 0; q <= n; q++){
          const ca = Math.floor((sg[0] + (sg[2] - sg[0]) * q / n) / TU), cb = Math.floor((sg[1] + (sg[3] - sg[1]) * q / n) / TU);
          for (let a = ca - 1; a <= ca + 1; a++) for (let b = cb - 1; b <= cb + 1; b++){ const k2 = a + ',' + b; if (!vu[k2]){ vu[k2] = 1; (g[k2] = g[k2] || []).push(i); } }
        }
      });
      const memes = A.segs.length === segs.length && A.segs.every((s, i) => [0, 1, 2, 3, 4].every(j => s[j] === segs[i][j]));
      const m99 = !!(window.VCroquis.geo && window.VCroquis.geo.lignesRef), x = (l, k) => f.xy[2 * (l.d + k)] + off.x, y = (l, k) => f.xy[2 * (l.d + k) + 1] + off.y;
      const rang = s => s.length === 7 && f.L[s[5]] === s[4] && Number.isInteger(s[6]) && s[6] >= 0 && s[6] + 1 < s[4].n
        && s[0] === x(s[4], s[6]) && s[1] === y(s[4], s[6]) && s[2] === x(s[4], s[6] + 1) && s[3] === y(s[4], s[6] + 1);
      return {n: A.segs.length, memes, grille: A.TU === TU && JSON.stringify(A.g) === JSON.stringify(g), m99,
        rangs: A.segs.filter(rang).length, cinq: A.segs.filter(s => s.length === 5).length};
    });
    /* glissés au doigt d'un sommet des traits de complément (GLISSES) : croquis de la grille, outil Choisir, trait choisi, même vue ;
       départ sur le sommet et fin aux pixels entiers du canevas. Chaque glissé donne les sommets du trait (au 0,1 mm). Il signale aussi
       un nombre de pas d'annulation autre que 1, un autre élément changé, ou un canevas qui n'a plus sa taille de 1280 × 800. */
    await p.evaluate(() => { window.__dessinBase = JSON.stringify(window.__vcEd.etat.doc.el); });
    const glisses = [];
    for (const [id, i, u, v] of GLISSES){
      const d = await p.evaluate(([id, i, vue]) => {
        const ed = window.__vcEd, S = ed.etat;
        S.doc.el = JSON.parse(window.__dessinBase); S.undo = []; S.redo = []; S.brouillon = null; S.panneau = null;
        ed.choisirOutil({k: 'main'}); S.sel = {id}; S.vue.cx = vue.cx; S.vue.cy = vue.cy; S.vue.s = vue.s; ed.synchroniser();
        S.dernierTap = null; S.finAuto = null; S.dernierePose = null; S.clicHors = null; S.gardeFiche = null;
        const w = S.doc.el.find(e => e.id === id).v[i], e = S.vue.ecran(w.x, w.y);
        return {x: Math.round(e.x), y: Math.round(e.y)};
      }, [id, i, vue]);
      const q = plan(u, v), f = await C.ecranCv(p, q[0], q[1]);
      await C.glisserDoigtCv(p, d, {x: Math.round(f.x), y: Math.round(f.y)}, 300);
      glisses.push(await p.evaluate(([id, o, th]) => {
        const S = window.__vcEd.etat, l = S.doc.el.find(e => e.id === id), sans = el => JSON.stringify(el.filter(e => e.id !== id));
        const pt = q => { const x = q.x + o.x - 1700000, y = q.y + o.y - 8200000; return (x * Math.cos(th) + y * Math.sin(th)).toFixed(4) + ';' + (-x * Math.sin(th) + y * Math.cos(th)).toFixed(4); };
        const cv = document.querySelector('.vc .vc-cv').getBoundingClientRect();
        return id + ' ' + l.v.map(pt).join(' ') + (S.undo.length === 1 ? '' : ', annulations ' + S.undo.length)
          + (sans(S.doc.el) === sans(JSON.parse(window.__dessinBase)) ? '' : ', autres éléments changés') + (cv.width === 1280 && cv.height === 800 ? '' : ', canevas ' + cv.width + ' × ' + cv.height);
      }, [id, o.doc, DEMO.th]));
    }
    await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; S.doc.el = JSON.parse(window.__dessinBase); S.undo = []; S.redo = []; S.sel = null; S.panneau = null; ed.synchroniser(); });
    return {res, taches, ar, glisses, erreurs: A.erreurs.slice()};
  } finally { await A.fermer(); }
}

(async () => {
  let g;
  try { g = await grille(); } catch (e){ R.ok(false, 'grille : exception : ' + e.message); R.fin(); return; }
  const {res, taches} = g;
  const fic = option('detail');
  if (fic) fs.writeFileSync(path.resolve(fic), res.map((r, k) => {
    const t = taches[k >> 1], i = (k >> 1) % 10;
    return (k + 1) + '\t' + t.outil + '\t' + 'v ' + GV[t.j] + ', u ' + GU[i] + '\t' + (k % 2 ? 'point' : 'départ') + '\t' + r;
  }).join('\n') + '\n');
  R.ok(res.length === 400, 'grille : 400 touchers (obtenu ' + res.length + ')');
  /* genres de résultat, pour vérifier que la grille met les aides à l'épreuve */
  const genres = {};
  res.forEach(r => { const k = r === 'rien' || r === 'modifié' ? r : r.indexOf('fin ') === 0 ? 'fin' : r.split(' ')[2].split(':')[0]; genres[k] = (genres[k] || 0) + 1; });
  const liste = Object.keys(genres).sort().map(k => k + ' ' + genres[k]).join(', ');
  if (V) R.info('genres : ' + liste);
  const voulus = ['coin', 'facade', 'parallele', 'angle', 'libre', 'obj', 'seg', 'fin'];
  R.ok(voulus.every(k => genres[k] > 0), 'grille : chaque aide sert au moins une fois (' + voulus.join(', ') + ') ; obtenu ' + liste);
  const tout = empreinte(res.join('\n'));
  const parRang = t => GV.map((v, j) => empreinte(res.filter((r, k) => taches[k >> 1].outil === t && taches[k >> 1].j === j).join('\n')));
  const obtenu = {tout, lim: parRang('lim'), tr: parRang('tr')};
  if (V) R.info('empreintes : ' + JSON.stringify(obtenu));
  const ecarts = [];
  OUTILS.forEach(([t, lib]) => obtenu[t].forEach((h, j) => { if (h !== ATTENDU[t][j]) ecarts.push(lib + ', rangée v ' + GV[j]); }));
  R.ok(tout === ATTENDU.tout, 'grille : les 400 résultats redonnent ceux de df95377 (empreinte ' + tout + ', attendue ' + ATTENDU.tout + ')'
    + (ecarts.length ? ' ; écarts : ' + ecarts.join(' | ') : ''));
  if (tout !== ATTENDU.tout && ecarts.length && !fic) R.info('pour voir les résultats : --detail=<fichier>, sur cette version et sur df95377, puis diff');
  const ar = g.ar;
  R.ok(!!ar && ar.n === 92 && ar.memes && ar.grille, 'côtés du bâti des aides au dessin : les 92 côtés de df95377 (23 bâtis), mêmes valeurs, même ordre, même grille de cases'
    + (ar ? ' (obtenu ' + ar.n + (ar.memes ? '' : ', valeurs changées') + (ar.grille ? '' : ', grille changée') + ')' : ' (cache absent)'));
  R.ok(!!ar && (ar.m99 ? ar.rangs === ar.n : ar.cinq === ar.n), 'côtés du bâti : '
    + (ar && !ar.m99 ? 'avant m99, 5 termes chacun (obtenu ' + ar.cinq + ')' : 'chacun porte le rang de sa polyligne dans fond.L et celui de son premier sommet (obtenu ' + (ar ? ar.rangs : 0) + ')'));
  if (V) R.info('glissés : ' + g.glisses.join(' | '));
  const ecartsG = GLISSES.map((c, k) => g.glisses[k] === ATTENDU_GLISSES[k] ? null : (k + 1) + ' (' + c[0] + ', sommet ' + c[1] + ') : ' + g.glisses[k] + ', attendu ' + ATTENDU_GLISSES[k]).filter(Boolean);
  R.ok(g.glisses.length === GLISSES.length && !ecartsG.length, 'glissés d\'un sommet des traits de complément : les ' + GLISSES.length + ' redonnent les sommets de df95377 '
    + '(le trait glissé n\'accroche ni ses coins ni ses côtés, l\'autre trait et le bâti restent des cibles)' + (ecartsG.length ? ' ; écarts : ' + ecartsG.join(' | ') : ''));
  R.ok(!g.erreurs.length, 'grille et glissés : aucune erreur dans la console' + (g.erreurs.length ? ' : ' + g.erreurs.slice(0, 2).join(' | ') : ''));
  R.fin();
})();
