// Drains, 1re partie (décisions D4, D8 et D9 de la conception « Rejets » ; m121), sans navigateur. Un drain est un tronçon qui porte p.drain :
// 'collecte' (il recueille l'eau du sol) ou 'infiltration' (il la disperse dans le sol). Jusqu'à m122 et m123, il s'analyse comme un tronçon.
// Croquis fictifs (12 rue Fictive, Ville-Exemple), tracés libres (aucun objet à leurs bouts ; un regard au sommet du milieu pour les cas
// « coupé par un regard »). Les cas d6 à d13 sont réservés à m122 et m123.
// d1 : defautsLn('tr', o) recopie o.drain s'il vaut 'collecte' ou 'infiltration', après les autres clés ; toute autre valeur est écartée, et un
//   tronçon sans drain garde exactement ses clés (res, st, diam, mat, pose, long, sens, obs) ; collecteur, trait et escalier n'en prennent
//   pas. VCroquis.drainDe lit le drain d'un tronçon ('' pour une autre valeur, pour un autre tracé ou pour un objet).
// d2 : à l'écran (canevas factice, 40 px par mètre), un peigne : une dent de 0,4 m par mètre réel, la première à 0,5 m du départ, de la couleur
//   du trait ; à droite du tracé, en suivant ses sommets, pour la collecte ; des deux côtés pour l'infiltration. Tracé droit de 10 m (10 dents),
//   tracé en L de 6 + 6 m (12 dents), plan et vue tournés d'un demi-radian ; drain « à supprimer » : ses dents et ses hachures ; drain coupé
//   par un regard (deux pièces, de 5,25 et 4,75 m) : le pas continue d'une pièce à l'autre. Témoin : le même tracé sans p.drain, aucune dent.
// d3 : de même au plan PDF : au 1/200, dents de 2 mm tous les 5 mm ; au 1/500, dents de 0,8 mm tous les 2 mm ; au 1/2000, au moins 0,8 mm
//   tous les 2 mm sur le papier (1 m n'y fait que 0,5 mm : une dent de 0,2 mm resterait dans le trait de 0,45 mm) ; drain « à supprimer » au
//   plan d'avant-projet : dents et hachures ; drain coupé par un regard : pas continu. Témoin : sans p.drain, aucune dent.
// d4 : DXF : calque VEDE-DRAINS (couleur 3) déclaré seulement s'il sert ; la polyligne du drain y garde la couleur de son réseau (62) ; une
//   LINE par dent, de la même couleur ; drain « projet » sur VEDE-PROJET et drain « à supprimer » sur VEDE-A-SUPPRIMER, dents comprises, sans
//   VEDE-DRAINS ; les dents d'un drain « projet » en trait continu (6 = CONTINUOUS), car le calque est en tirets ; drain coupé par un regard :
//   pas continu, dents aux mêmes places que celles du même drain en projet ; fond en millimètres (u = 0,001) avec une origine : dents de 400
//   unités tous les 1 000. Témoins : sans p.drain, polyligne sur VEDE-EP, sans LINE ni VEDE-DRAINS ; un p.drain d'une autre valeur ne change
//   pas le texte du DXF. Couleur provisoire : un drain d'infiltration est attendu en couleur 8 (réseau à préciser) jusqu'à m122, car la fiche
//   lui retire son réseau ; m122 le passera en 3 (EP, D9).
// d5 : légende du plan PDF : « Drain » et « Drain d'infiltration » une fois chacune (deux drains de chaque sorte), après « Canalisation EP
//   (eaux pluviales) », qui reste ; à gauche de chaque ligne, un échantillon gris : un trait de 8 mm et 3 dents, d'un côté ou des deux.
//   Témoin : sans drain, ni l'une ni l'autre.
// g1 (garde, jusqu'à m122) : p.drain ne change pas l'analyse (résultat par source, anomalies, conclusion, contrôles, sens, constat déduit), en
//   état des lieux et en avant-projet, sur 40 croquis du générateur dont chaque tronçon devient un drain, une fois sur deux d'infiltration.
// Échouent sur b7ad8a4 (p.drain inconnu) : d1 à d5, sauf les témoins ; g1 y passe.
'use strict';
const {charger, doc, copie, rendus, rapport} = require('./charger.js');
const G = require('./generateur.js');
const ch = charger({pdf: true}), {V} = ch, R = rapport('drain'), {canevas, pdf, dxf} = rendus(ch);
const sur = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };
const EP = V.RES.EP.rgb.join(','), INC = V.RES.INC.rgb.join(','), css = c => 'rgb(' + c + ')';
const CLES = ['res', 'st', 'diam', 'mat', 'pose', 'long', 'sens', 'obs'];
const DROIT = [[0, 0], [10, 0]], EN_L = [[0, 0], [6, 0], [6, 6]], pts = v => v.map(q => ({x: q[0], y: q[1]}));

/* croquis d'un seul tracé libre T : sommets v, réseau, statut, propriétés en plus (p.drain) ; o : champs du croquis (rot, echelle, u, origine) */
const unTrace = (v, res, st, props, o) => Object.assign(doc({l: [['T', 'tr', res, st, v, 0, props]]}), o || {});
/* drain de collecte EP de 10 m, de statut st, coupé par un regard R à 5,25 m (sommet du milieu) : deux pièces, de 5,25 et 4,75 m */
const avecRegard = (st, o) => Object.assign(doc({o: [['R', 'regard', 5.25, 0, {res: 'EP'}]], l: [['T', 'tr', 'EP', st, [[0, 0], 'R', [10, 0]], 0, {drain: 'collecte'}]]}), o || {});
/* dents de longueur long seulement (t1 = long) : les côtés du carré du regard, plus courts, ne sont pas des dents */
const deLong = (D, long, tol) => D.filter(q => Math.abs(q.t1 - long) < tol);
/* écran en état des lieux : vue de 800 × 600 px centrée sur c, à s px par mètre, tournée comme le plan ; traits ramenés en mètres du croquis */
function ecran(d, s, c){
  const an = V.analyser(copie(d), 'edl'), vue = new V.Vue(800, 600); vue.s = s; vue.cx = c[0]; vue.cy = c[1]; vue.rot = d.rot || 0;
  const cv = canevas(); V.dessinerCroquis(cv.ctx, d, an, vue, 1, {});
  return cv.traits.map(t => ({a: vue.monde(t.a.x, t.a.y), b: vue.monde(t.b.x, t.b.y), coul: t.coul}));
}
/* segments des formes du plan PDF (en mm) */
const segments = F => [].concat(...F.map(f => f.pts.slice(1).map((q, i) => ({a: f.pts[i], b: q, coul: f.coul}))
  .concat(f.ferme && f.pts.length > 2 ? [{a: f.pts[f.pts.length - 1], b: f.pts[0], coul: f.coul}] : [])));
/* place d'un point q le long du tracé P : distance d, abscisse s depuis le départ, écart t compté positif à droite en suivant les sommets
   (basY : y vers le bas, papier ; sinon y vers le haut, croquis et DXF) */
function place(P, q, basY){
  let best = null, s0 = 0;
  for (let i = 1; i < P.length; i++){
    const a = P[i - 1], b = P[i], L = Math.hypot(b.x - a.x, b.y - a.y); if (!L) continue;
    const ux = (b.x - a.x) / L, uy = (b.y - a.y) / L, k = Math.max(0, Math.min(L, (q.x - a.x) * ux + (q.y - a.y) * uy));
    const x = a.x + ux * k, y = a.y + uy * k, d = Math.hypot(q.x - x, q.y - y), nx = basY ? -uy : uy, ny = basY ? ux : -ux;
    if (!best || d < best.d - 1e-9) best = {d, s: s0 + k, t: (q.x - x) * nx + (q.y - y) * ny};
    s0 += L;
  }
  return best;
}
/* traits proches du tracé P (à moins de 2 × long) : ceux du trait (les deux bouts sur lui), les dents (les deux bouts à la même abscisse,
   l'un au moins hors du trait : {s, t0 ≤ t1, coul}, par abscisse croissante) et les autres (hachures) */
function peigne(traits, P, basY, tol, long){
  const r = {trait: [], dents: [], autres: []};
  traits.forEach(tr => {
    const A = place(P, tr.a, basY), B = place(P, tr.b, basY); if (!A || !B || Math.max(A.d, B.d) > 2 * long) return;
    if (A.d < tol && B.d < tol) r.trait.push(tr);
    else if (Math.abs(A.s - B.s) < tol) r.dents.push({s: (A.s + B.s) / 2, t0: Math.min(A.t, B.t), t1: Math.max(A.t, B.t), coul: tr.coul});
    else r.autres.push(tr);
  });
  r.dents.sort((x, y) => x.s - y.s);
  return r;
}
/* n dents régulières : abscisses pas × (k + 1/2), de 0 à long (à droite) ou de -long à long (des deux côtés), de la couleur coul */
const regulier = (D, n, pas, long, deux, coul, tol) => D.length === n && D.every((q, k) => Math.abs(q.s - pas * (k + .5)) < tol
  && Math.abs(q.t1 - long) < tol && Math.abs(q.t0 - (deux ? -long : 0)) < tol && q.coul === coul);
const f3 = v => +v.toFixed(3), fr = v => String(f3(v)).replace('.', ',');
const txtDents = D => D.length + ' dents' + (D.length ? ' (abscisses ' + D.slice(0, 3).map(q => f3(q.s)).join(', ') + (D.length > 3 ? '…' : '')
  + ' ; écarts ' + f3(D[0].t0) + ' à ' + f3(D[0].t1) + ' ; couleur ' + D[0].coul + ')' : '');

function defauts(){
  const cles = o => JSON.stringify(Object.keys(o));
  const ok = ['collecte', 'infiltration'].map(v => { const p = sur(() => V.defautsLn('tr', {drain: v})); return typeof p === 'object' && cles(p) === JSON.stringify(CLES.concat('drain')) && p.drain === v; });
  R.ok(ok[0] && ok[1], 'd1 defautsLn(\'tr\', {drain}) garde \'collecte\' et \'infiltration\', après les autres clés (obtenu '
    + ['collecte', 'infiltration'].map(v => JSON.stringify(sur(() => V.defautsLn('tr', {drain: v})))).join(' ; ') + ')');
  const autres = ['oui', 'Collecte', 'drain', true, 1, '', null, undefined], mauvais = autres.filter(v => { const p = V.defautsLn('tr', {drain: v, res: 'EP'}); return cles(p) !== JSON.stringify(CLES) || p.res !== 'EP'; });
  R.ok(!mauvais.length && cles(V.defautsLn('tr')) === JSON.stringify(CLES) && cles(V.defautsLn('tr', {res: 'EU', st: 'projet'})) === JSON.stringify(CLES),
    'd1 témoin : toute autre valeur de drain est écartée ; un tronçon sans drain garde exactement ses clés ' + CLES.join(', ') + (mauvais.length ? ' (gardées : ' + mauvais.map(String).join(', ') + ')' : ''));
  const t = ['col', 'lim', 'esc'].filter(x => 'drain' in V.defautsLn(x, {drain: 'collecte'}));
  R.ok(!t.length, 'd1 collecteur, trait et escalier ne prennent jamais de drain' + (t.length ? ' (pris : ' + t.join(', ') + ')' : ''));
  const de = x => typeof V.drainDe === 'function' ? sur(() => V.drainDe(x)) : 'VCroquis.drainDe absente';
  const L = (t, drain) => ({id: 'x', k: 'ln', t, v: [], p: {drain}}), vus = [de(L('tr', 'collecte')), de(L('tr', 'infiltration')), de(L('tr', 'oui')), de(L('tr')),
    de(L('col', 'collecte')), de(L('lim', 'infiltration')), de({id: 'y', k: 'pt', t: 'drain', x: 0, y: 0, p: {drain: 'collecte'}})];
  R.ok(JSON.stringify(vus) === JSON.stringify(['collecte', 'infiltration', '', '', '', '', '']),
    'd1 VCroquis.drainDe : \'collecte\', \'infiltration\', puis \'\' pour une autre valeur, sans drain, pour un collecteur, un trait et un objet (obtenu ' + JSON.stringify(vus) + ')');
}

function ecranPeigne(){
  [['collecte, tracé droit', DROIT, 'EP', 'collecte', {}, [5, 0], 10, css(EP)],
    ['infiltration, tracé droit', DROIT, '', 'infiltration', {}, [5, 0], 10, css(INC)],
    ['collecte, tracé en L', EN_L, 'EP', 'collecte', {}, [3, 3], 12, css(EP)],
    ['infiltration, tracé en L', EN_L, '', 'infiltration', {}, [3, 3], 12, css(INC)],
    ['collecte, plan tourné', EN_L, 'EP', 'collecte', {rot: .5}, [3, 3], 12, css(EP)],
    ['infiltration, plan tourné', EN_L, '', 'infiltration', {rot: .5}, [3, 3], 12, css(INC)]].forEach(([nom, v, res, drain, o, c, n, coul]) => {
    const r = peigne(ecran(unTrace(v, res, '', {drain}, o), 40, c), pts(v), false, 1e-6, .4), deux = drain === 'infiltration';
    R.ok(regulier(r.dents, n, 1, .4, deux, coul, 1e-6) && r.trait.length > 0 && r.trait.every(t => t.coul === coul) && !r.autres.length,
      'd2 écran, ' + nom + ' : ' + n + ' dents de 0,4 m tous les mètres, ' + (deux ? 'des deux côtés' : 'à droite') + ', de la couleur du trait ' + coul + ' (obtenu ' + txtDents(r.dents) + ')');
  });
  const s = peigne(ecran(unTrace(DROIT, 'EP', 'supprimer', {drain: 'collecte'}), 40, [5, 0]), pts(DROIT), false, 1e-6, .4);
  R.ok(regulier(s.dents, 10, 1, .4, false, css(EP), 1e-6) && s.autres.length >= 10 && s.autres.every(t => t.coul === css(EP)),
    'd2 écran, drain « à supprimer » : 10 dents et les hachures, de la couleur du trait (obtenu ' + txtDents(s.dents) + ', ' + s.autres.length + ' hachures)');
  const rg = peigne(ecran(avecRegard(''), 40, [5, 0]), pts(DROIT), false, 1e-6, .4), Drg = deLong(rg.dents, .4, 1e-6);
  R.ok(regulier(Drg, 10, 1, .4, false, css(EP), 1e-6) && rg.trait.length === 2,
    'd2 écran, drain coupé par un regard (pièces de 5,25 et 4,75 m) : le pas continue d\'une pièce à l\'autre, 10 dents à 0,5 m, 1,5 m… 9,5 m (obtenu '
    + rg.trait.length + ' pièces, ' + txtDents(Drg) + (Drg.length > 5 ? ', 6e à ' + f3(Drg[5].s) + ' m' : '') + ')');
  const t = peigne(ecran(unTrace(DROIT, 'EP', '', {}), 40, [5, 0]), pts(DROIT), false, 1e-6, .4);
  R.ok(!t.dents.length && !t.autres.length && t.trait.length > 0, 'd2 témoin : le même tracé sans p.drain, aucune dent (obtenu ' + txtDents(t.dents) + ')');
}

/* plan PDF d'un tracé droit de Lm mètres (10 par défaut) : le trait (forme de 2 sommets longue de Lm à l'échelle) qui porte le plus de dents */
async function surPapier(d, mode, Lm){
  Lm = Lm || 10;
  const r = await pdf(d, {mode}), m = d.echelle / 1000, S = segments(r.formes), long = Math.max(.4 / m, .8);
  const cand = r.formes.filter(f => f.pts.length === 2 && Math.abs(Math.hypot(f.pts[1].x - f.pts[0].x, f.pts[1].y - f.pts[0].y) - Lm / m) < 1e-6);
  let best = null;
  cand.forEach(f => { const pk = peigne(S.filter(q => q.coul === f.coul), f.pts, true, 1e-6, long); if (!best || pk.dents.length > best.dents.length) best = Object.assign(pk, {coul: f.coul}); });
  return {r, pk: best, m};
}
async function papierPeigne(){
  for (const [nom, res, st, drain, ech, mode, coul] of [['collecte au 1/200', 'EP', '', 'collecte', 200, 'edl', EP], ['infiltration au 1/200', '', '', 'infiltration', 200, 'edl', INC],
    ['collecte au 1/500', 'EP', '', 'collecte', 500, 'edl', EP], ['infiltration au 1/500', '', '', 'infiltration', 500, 'edl', INC]]){
    const {r, pk, m} = await surPapier(unTrace(DROIT, res, st, {drain}, {echelle: ech}), mode), deux = drain === 'infiltration';
    R.ok(!r.err.length && !!pk && pk.coul === coul && regulier(pk.dents, 10, 1 / m, .4 / m, deux, coul, 1e-6) && !pk.autres.length,
      'd3 plan PDF, ' + nom + ' : 10 dents de ' + fr(.4 / m) + ' mm tous les ' + fr(1 / m) + ' mm, ' + (deux ? 'des deux côtés' : 'à droite') + ', de la couleur du trait '
      + coul + ' (obtenu ' + (pk ? txtDents(pk.dents) : 'pas de trait') + ')' + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  }
  /* au 1/2000, 1 m ne fait que 0,5 mm : le peigne garde au moins 0,8 mm tous les 2 mm sur le papier ; tracé de 100 m (50 mm) : 25 dents */
  for (const [nom, res, drain, coul] of [['collecte au 1/2000', 'EP', 'collecte', EP], ['infiltration au 1/2000', '', 'infiltration', INC]]){
    const {r, pk} = await surPapier(unTrace([[0, 0], [100, 0]], res, '', {drain}, {echelle: 2000}), 'edl', 100), deux = drain === 'infiltration';
    R.ok(!r.err.length && !!pk && pk.coul === coul && regulier(pk.dents, 25, 2, .8, deux, coul, 1e-6) && !pk.autres.length,
      'd3 plan PDF, ' + nom + ', tracé de 100 m : 25 dents de 0,8 mm tous les 2 mm, ' + (deux ? 'des deux côtés' : 'à droite') + ', qui sortent du trait de 0,45 mm (obtenu '
      + (pk ? txtDents(pk.dents) : 'pas de trait') + ')' + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  }
  /* drain coupé par un regard, au 1/200 : ses deux pièces (traits horizontaux de 2 sommets, à la hauteur du plus long, ce qui écarte
     l'échantillon « Canalisation EP » de la légende) mises bout à bout */
  const rp = await pdf(avecRegard('', {echelle: 200}), {mode: 'edl'}), lg = f => Math.abs(f.pts[1].x - f.pts[0].x);
  const Hx = rp.formes.filter(f => f.coul === EP && f.pts.length === 2 && Math.abs(f.pts[1].y - f.pts[0].y) < 1e-9 && lg(f) > 5).sort((a, b) => lg(b) - lg(a));
  const H = Hx.filter(f => Math.abs(f.pts[0].y - Hx[0].pts[0].y) < 1e-9);
  const xs = [].concat(...H.map(f => f.pts.map(q => q.x))), Pr = H.length ? [{x: Math.min(...xs), y: H[0].pts[0].y}, {x: Math.max(...xs), y: H[0].pts[0].y}] : [];
  const Drp = H.length ? deLong(peigne(segments(rp.formes).filter(q => q.coul === EP), Pr, true, 1e-6, 2).dents, 2, 1e-6) : [];
  R.ok(!rp.err.length && H.length === 2 && Math.abs(Pr[1].x - Pr[0].x - 50) < 1e-6 && regulier(Drp, 10, 5, 2, false, EP, 1e-6),
    'd3 plan PDF, drain coupé par un regard au 1/200 : le pas continue d\'une pièce à l\'autre, 10 dents tous les 5 mm (obtenu ' + H.length + ' pièces, '
    + txtDents(Drp) + (Drp.length > 5 ? ', 6e à ' + f3(Drp[5].s) + ' mm' : '') + ')' + (rp.err.length ? ' ' + rp.err.join(' | ') : ''));
  const s = await surPapier(unTrace(DROIT, 'EP', 'supprimer', {drain: 'collecte'}, {echelle: 200}), 'avp');
  R.ok(!s.r.err.length && !!s.pk && regulier(s.pk.dents, 10, 5, 2, false, s.pk.coul, 1e-6) && s.pk.autres.length >= 10,
    'd3 plan d\'avant-projet, drain « à supprimer » : 10 dents et les hachures (obtenu ' + (s.pk ? txtDents(s.pk.dents) + ', ' + s.pk.autres.length + ' hachures' : 'pas de trait') + ')');
  const t = await surPapier(unTrace(DROIT, 'EP', '', {}, {echelle: 200}), 'edl');
  R.ok(!t.r.err.length && !!t.pk && !t.pk.dents.length && !t.pk.autres.length, 'd3 témoin : sans p.drain, aucune dent (obtenu ' + (t.pk ? txtDents(t.pk.dents) : 'pas de trait') + ')');
}

function dxfDrains(){
  const ents = (r, type, cal) => r.ents.filter(q => q.type === type && q.cal === cal);
  const dentsDxf = (r, cal, P, long) => peigne(ents(r, 'LINE', cal).map(q => ({a: q.a, b: q.b, coul: q.c['62']})), P, false, 1e-3, long).dents;
  const vu = r => Object.keys(r.calques).filter(n => /DRAINS|PROJET|SUPPRIMER|VEDE-EP|PRECISER/.test(n)).map(n => n + ':' + r.calques[n]).join(' ')
    + ' ; ' + r.ents.filter(q => q.type === 'POLYLINE' || q.type === 'LINE').map(q => q.type + '@' + q.cal + (q.c['62'] ? '/' + q.c['62'] : '')).filter((x, i, a) => a.indexOf(x) === i).join(' ');
  /* drain d'infiltration : couleur 8 (réseau à préciser) jusqu'à m122, qui lui donnera le réseau EP, donc la couleur 3 (D9) */
  for (const [nom, res, drain, aci, deux] of [['de collecte', 'EP', 'collecte', '3', false], ['d\'infiltration', '', 'infiltration', String(V.RES.INC.aci), true]]){
    const r = dxf(unTrace(DROIT, res, '', {drain})), P = ents(r, 'POLYLINE', 'VEDE-DRAINS'), D = dentsDxf(r, 'VEDE-DRAINS', pts(DROIT), .4);
    R.ok(r.calques['VEDE-DRAINS'] === 3 && P.length === 1 && P[0].c['62'] === aci && P[0].sommets.length === 2 && ents(r, 'LINE', 'VEDE-DRAINS').length === 10
      && regulier(D, 10, 1, .4, deux, aci, 1e-3) && !r.ents.some(q => q.type === 'LINE' && q.cal !== 'VEDE-DRAINS'),
      'd4 DXF, drain ' + nom + ' : calque VEDE-DRAINS (3), polyligne dessus en couleur ' + aci + ', 10 LINE de 0,4 m tous les mètres, ' + (deux ? 'des deux côtés' : 'à droite')
      + ' (obtenu ' + vu(r) + ' ; ' + txtDents(D) + ')');
  }
  const pj = dxf(unTrace(DROIT, 'EP', 'projet', {drain: 'collecte'})), Dp = dentsDxf(pj, 'VEDE-PROJET', pts(DROIT), .4);
  R.ok(!('VEDE-DRAINS' in pj.calques) && ents(pj, 'POLYLINE', 'VEDE-PROJET').length === 1 && ents(pj, 'LINE', 'VEDE-PROJET').length === 10 && Dp.length === 10
    && Dp.every(q => q.coul === undefined) && !pj.ents.some(q => q.type === 'LINE' && q.cal !== 'VEDE-PROJET'),
    'd4 DXF, drain « projet » : polyligne et 10 dents sur VEDE-PROJET, couleur du calque, sans VEDE-DRAINS (obtenu ' + vu(pj) + ' ; ' + txtDents(Dp) + ')');
  const Lp = ents(pj, 'LINE', 'VEDE-PROJET'), Pj = ents(pj, 'POLYLINE', 'VEDE-PROJET'), lts = Lp.map(q => q.c['6'] || 'BYLAYER').filter((x, i, a) => a.indexOf(x) === i);
  R.ok(Lp.length === 10 && Lp.every(q => q.c['6'] === 'CONTINUOUS') && Pj.length === 1 && Pj[0].c['6'] === 'VEDE_PROJET',
    'd4 DXF, drain « projet » : dents en trait continu (6 = CONTINUOUS), car le calque est en tirets ; polyligne en VEDE_PROJET (obtenu dents en '
    + (lts.join(', ') || 'rien') + ', polyligne en ' + (Pj.length ? Pj[0].c['6'] || 'BYLAYER' : 'rien') + ')');
  const rx = dxf(avecRegard('')), Drx = dentsDxf(rx, 'VEDE-DRAINS', pts(DROIT), .4), rxp = dxf(avecRegard('projet')), Drxp = dentsDxf(rxp, 'VEDE-PROJET', pts(DROIT), .4);
  R.ok(ents(rx, 'POLYLINE', 'VEDE-DRAINS').length === 2 && regulier(Drx, 10, 1, .4, false, '3', 1e-3) && Drxp.length === 10 && Drxp.every((q, k) => Math.abs(q.s - Drx[k].s) < 1e-3),
    'd4 DXF, drain coupé par un regard : deux polylignes, le pas continue (10 dents à 0,5 m, 1,5 m… 9,5 m), aux mêmes places que celles du même drain en projet (obtenu '
    + ents(rx, 'POLYLINE', 'VEDE-DRAINS').length + ' polylignes, ' + txtDents(Drx) + (Drx.length > 5 ? ', 6e à ' + f3(Drx[5].s) + ' m' : '') + ' ; projet : ' + txtDents(Drxp) + ')');
  const sp = dxf(unTrace(DROIT, 'EP', 'supprimer', {drain: 'collecte'})), Ds = dentsDxf(sp, 'VEDE-A-SUPPRIMER', pts(DROIT), .4), Ps = ents(sp, 'POLYLINE', 'VEDE-A-SUPPRIMER');
  R.ok(!('VEDE-DRAINS' in sp.calques) && Ps.length === 1 && Ps[0].c['62'] === '3' && regulier(Ds, 10, 1, .4, false, '3', 1e-3) && !sp.ents.some(q => q.type === 'LINE' && q.cal !== 'VEDE-A-SUPPRIMER'),
    'd4 DXF, drain « à supprimer » : polyligne et 10 dents sur VEDE-A-SUPPRIMER, en couleur 3, sans VEDE-DRAINS (obtenu ' + vu(sp) + ' ; ' + txtDents(Ds) + ')');
  const O = {x: 1000, y: 2000}, mm = dxf(unTrace(DROIT, 'EP', '', {drain: 'collecte'}, {u: .001, origine: O}));
  const Dm = dentsDxf(mm, 'VEDE-DRAINS', [{x: O.x, y: O.y}, {x: O.x + 10000, y: O.y}], 400);
  R.ok(regulier(Dm, 10, 1000, 400, false, '3', 1e-3), 'd4 DXF, fond en millimètres (u = 0,001) avec une origine : 10 dents de 400 unités tous les 1 000, à droite (obtenu ' + txtDents(Dm) + ')');
  const t = dxf(unTrace(DROIT, 'EP', '', {})), t2 = dxf(unTrace(DROIT, 'EP', '', {drain: 'oui'}));
  R.ok(!('VEDE-DRAINS' in t.calques) && ents(t, 'POLYLINE', 'VEDE-EP').length === 1 && ents(t, 'POLYLINE', 'VEDE-EP')[0].c['62'] === undefined && !t.ents.some(q => q.type === 'LINE'),
    'd4 témoin : sans p.drain, polyligne sur VEDE-EP (couleur du calque), sans LINE ni VEDE-DRAINS (obtenu ' + vu(t) + ')');
  R.ok(t2.texte === t.texte, 'd4 témoin : un p.drain d\'une autre valeur (\'oui\') ne change pas le texte du DXF');
}

/* échantillon de la légende : formes à gauche du texte t, sur sa ligne (le texte est écrit 1 mm sous le milieu de la ligne, l'échantillon va de
   13 à 5 mm à sa gauche) */
function echantillon(r, t){
  const lab = r.pos.find(q => q.t === t); if (!lab) return null;
  const F = r.formes.filter(f => f.pts.every(p => p.x > lab.x - 12 && p.x < lab.x - 1 && Math.abs(p.y - (lab.y - 1)) < 1.6));
  return peigne(segments(F), [{x: lab.x - 10, y: lab.y - 1}, {x: lab.x - 2, y: lab.y - 1}], true, 1e-6, 1.2);
}
async function legendeDrains(){
  const d = doc({l: [['A', 'tr', 'EP', '', [[0, 0], [10, 0]], 0, {drain: 'collecte'}], ['B', 'tr', 'EP', '', [[0, 3], [10, 3]], 0, {drain: 'collecte'}],
    ['C', 'tr', '', '', [[0, 6], [10, 6]], 0, {drain: 'infiltration'}], ['D', 'tr', '', '', [[0, 9], [10, 9]], 0, {drain: 'infiltration'}], ['E', 'tr', 'EP', '', [[0, 12], [10, 12]]]]});
  const r = await pdf(d, {mode: 'edl'}), n = t => r.txt.filter(x => x === t).length, i = t => r.txt.indexOf(t), CEP = 'Canalisation EP (eaux pluviales)';
  R.ok(!r.err.length && n('Drain') === 1 && n('Drain d\'infiltration') === 1 && n(CEP) === 1 && i(CEP) < i('Drain') && i('Drain') < i('Drain d\'infiltration'),
    'd5 légende : « Drain » et « Drain d\'infiltration » une fois chacune, après « ' + CEP + ' » (obtenu ' + n('Drain') + ', ' + n('Drain d\'infiltration') + ', ' + n(CEP)
    + ' ; rangs ' + [i(CEP), i('Drain'), i('Drain d\'infiltration')].join(', ') + ')' + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  for (const [t, deux] of [['Drain', false], ['Drain d\'infiltration', true]]){
    const e = echantillon(r, t);
    R.ok(!!e && e.trait.length === 1 && e.trait[0].coul === INC && regulier(e.dents, 3, 2.5, 1.2, deux, INC, 1e-6) && !e.autres.length,
      'd5 échantillon de « ' + t + ' » : trait gris de 8 mm et 3 dents de 1,2 mm, ' + (deux ? 'des deux côtés' : 'd\'un côté') + ' (obtenu '
      + (e ? e.trait.length + ' trait(s), ' + txtDents(e.dents) + ', ' + e.autres.length + ' autre(s)' : 'pas de ligne') + ')');
  }
  const t = await pdf(doc({l: [['E', 'tr', 'EP', '', [[0, 0], [10, 0]]], ['F', 'tr', '', '', [[0, 3], [10, 3]]]]}), {mode: 'edl'});
  R.ok(!t.err.length && t.txt.indexOf('Drain') < 0 && t.txt.indexOf('Drain d\'infiltration') < 0 && t.txt.indexOf(CEP) >= 0,
    'd5 témoin : sans drain, ni « Drain » ni « Drain d\'infiltration » à la légende');
}

/* garde : ce que l'analyse tire d'un croquis (les éléments du croquis n'y sont pas recopiés : seulement leurs identifiants) */
function resultat(d, mode){
  try {
    const an = V.analyser(copie(d), mode), L = V.anomaliesDoc(copie(d), an), cd = V.constatDeduit(copie(d), an);
    const src = Object.keys(an.resObj).sort().map(id => { const r = an.resObj[id];
      return id + '=' + r.etat + ':' + (r.nets || []).join(',') + (r.presume ? '(p)' : '') + (r.fosse ? ' F=' + r.fosse : '') + (r.boite ? ' B=' + r.boite : '')
        + (r.conflit ? ' c=' + r.conflit.join(',') : '') + (r.ambigu ? ' a=' + r.ambigu.join(',') : '') + (r.sortiesLibres ? ' sl=' + r.sortiesLibres.length : ''); }).join(' ');
    return [src, L.map(a => a.cle + '@' + a.objId + ':' + a.st + ':' + a.txt).sort().join(','), V.conclusion(L, an), an.controles.map(x => x.niveau + ':' + x.txt).sort().join(' ; '),
      an.pieces.map(p => p.id + (an.sensPiece[p.id] > 0 ? '>' : an.sensPiece[p.id] < 0 ? '<' : '=') + an.resPiece[p.id].res).sort().join(' ; '),
      JSON.stringify({rows: cd.rows, epRecup: cd.epRecup, sansCote: cd.sansCote, methodes: cd.methodes})].join(' | ');
  } catch (e){ return 'exception : ' + e.message; }
}
function garde(){
  let n = 0, drains = 0; const ecarts = [];
  for (let g = 1; g <= 40; g++){
    const d = doc(G.gen(g, {avp: g % 3 === 0, maxN: 2 + g % 7, exutoires: G.EXUTOIRES.concat(['infiltration', 'puits'])})), dd = copie(d);
    let k = 0; dd.el.forEach(e => { if (e.k === 'ln' && e.t === 'tr'){ e.p.drain = ++k % 2 ? 'collecte' : 'infiltration'; drains++; } });
    ['edl', 'avp'].forEach(mode => { n++; const a = resultat(d, mode), b = resultat(dd, mode); if (a !== b || /^exception/.test(a)) ecarts.push(g + ' ' + mode + ' : ' + (a === b ? a : 'écart')); });
  }
  R.ok(!ecarts.length && n === 80, 'g1 garde : p.drain ne change pas l\'analyse (' + n + ' analyses, ' + drains + ' drains) ; écarts : ' + (ecarts.slice(0, 3).join(' ; ') || 'aucun'));
}

(async () => {
  try {
    defauts();
    ecranPeigne();
    await papierPeigne();
    dxfDrains();
    await legendeDrains();
    garde();
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
