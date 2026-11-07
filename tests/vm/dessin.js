// Géométrie pure du plan (VCroquis.geo, m98 ; échoue sur 1e27c7b) : pose par cotes et mesure inverse (convention 11.1 de
// .claude/conception-outils-dessin.md : le technicien est dehors, face au bâtiment), bornes comprises (coin, mi-côté, point sur le côté,
// côtés obliques), côtés alignés d'une polyligne (un bâti donne les mêmes côtés quel que soit son sommet 0), point dans un polygone,
// distance au bord, pied de perpendiculaire, intersection de droites, milieu. Coordonnées du plan en mètres, y vers le nord. Aucune donnée réelle.
// usage : node tests/vm/dessin.js [-v] [--app=<dossier>]
'use strict';
const {charger, rapport} = require('./charger.js');
const {mkRnd} = require('./generateur.js');
const {V} = charger(), R = rapport('dessin');
const G = V.geo;

const P = (x, y) => ({x, y});
const proche = (a, b, tol) => !!a && !!b && Math.abs(a.x - b.x) <= (tol || 1e-9) && Math.abs(a.y - b.y) <= (tol || 1e-9);
const fr = x => String(+x.toFixed(6)).replace('.', ','), ecrit = p => p ? '(' + fr(p.x) + ' ; ' + fr(p.y) + ')' : String(p);
/* mesure en clair ; d et e nuls écrits « 0 », un reste de calcul en notation scientifique */
const ecr = m => m ? m.mode + ', ' + m.coin + ', d ' + (m.d === 0 ? '0' : Math.abs(m.d) < 1e-6 ? m.d.toExponential(1) : fr(m.d)) + ', e '
  + (m.e === 0 ? '0' : Math.abs(m.e) < 1e-6 ? m.e.toExponential(1) : fr(m.e)) + ', ' + m.cote : String(m);
/* appel protégé : une exception devient le texte « exception : … » */
const sur = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };

function essais(){
  /* bâti (0,0) (10,0) (10,6) (0,6), parcouru dans le sens trigonométrique ; façade sud : la rue est au sud */
  const sud = {A: P(0, 0), B: P(10, 0), n: P(0, -1)};
  const cas = [
    ['prolongement au-delà de A (coin ouest), d 2, e 0,5, droite', {mode: 'prol', coin: 'A', d: 2, e: 0.5, cote: 'droite'}, P(-2, -0.5)],
    ['prolongement au-delà de A, d 2, e 0,5, gauche', {mode: 'prol', coin: 'A', d: 2, e: 0.5, cote: 'gauche'}, P(-2, 0.5)],
    ['prolongement au-delà de B (coin est), d 2, e 0,5, droite', {mode: 'prol', coin: 'B', d: 2, e: 0.5, cote: 'droite'}, P(12, 0.5)],
    ['le long depuis le coin gauche (A), d 3, e 1, devant', {mode: 'long', coin: 'A', d: 3, e: 1, cote: 'devant'}, P(3, -1)],
    ['le long depuis le coin droit (B), d 3, e 1, devant', {mode: 'long', coin: 'B', d: 3, e: 1, cote: 'devant'}, P(7, -1)],
  ];
  cas.forEach(([n, c, att]) => { const q = sur(() => G.placer(sud, c)); R.ok(proche(q, att), 'façade sud, ' + n + ' → ' + ecrit(att) + ' (obtenu ' + ecrit(q) + ')'); });
  R.ok(G.coinGauche(sud) === 'A', 'façade sud : le coin gauche vu du dehors est A (obtenu ' + G.coinGauche(sud) + ')');
  R.ok(G.coinGauche({A: P(0, 0), B: P(10, 0), n: P(0, 1)}) === 'B', 'même côté, dehors au nord : le coin gauche est B');
  /* même bâti tourné de 90° : A (0,0), B (0,10), dehors à l'est ; chaque point est l'image du premier par la rotation */
  const rot = {A: P(0, 0), B: P(0, 10), n: P(1, 0)}, r90 = p => P(-p.y, p.x);
  R.ok(proche(G.placer(rot, cas[0][1]), P(0.5, -2)), 'bâti tourné de 90°, au-delà de A, d 2, e 0,5, droite → (0,5 ; -2) (obtenu ' + ecrit(G.placer(rot, cas[0][1])) + ')');
  R.ok(cas.every(([, c, att]) => proche(G.placer(rot, c), r90(att))), 'bâti tourné de 90° : les cinq poses sont l\'image des poses de la façade sud');
  R.ok(G.coinGauche(rot) === 'A', 'bâti tourné de 90° : le coin gauche reste A');
  R.ok(G.placer({A: sud.A, B: sud.B}, cas[0][1]) !== null && proche(G.placer({A: sud.A, B: sud.B}, cas[0][1]), P(-2, -0.5)),
    'prolongement sans normale : même point (la normale ne sert pas au prolongement)');
  R.ok(G.placer({A: sud.A, B: sud.B}, cas[3][1]) === null, 'le long sans normale : pas calculable (null)');
  R.ok(proche(G.placer(sud, {mode: 'long', coin: 'A', d: 3, e: 1, cote: 'derriere'}), P(3, 1)), 'le long depuis A, d 3, e 1, derrière → (3 ; 1)');

  /* mesure inverse */
  const m = sur(() => G.mesurer(sud, P(-2, -0.5)));
  R.ok(!!m && m.mode === 'prol' && m.coin === 'A' && Math.abs(m.d - 2) < 1e-12 && Math.abs(m.e - 0.5) < 1e-12 && m.cote === 'droite',
    'mesure de (-2 ; -0,5) : prolongement, A, d 2, e 0,5, droite (obtenu ' + JSON.stringify(m) + ')');
  R.ok(!!m && Math.abs(m.s + 2) < 1e-12 && Math.abs(m.h - 0.5) < 1e-12, 'mesure de (-2 ; -0,5) : s = -2 le long du côté, h = 0,5 vers le dehors');
  const m7 = G.mesurer(sud, P(7, -1)), m7a = G.mesurer(sud, P(7, -1), {coin: 'A'});
  R.ok(!!m7 && m7.mode === 'long' && m7.coin === 'B' && Math.abs(m7.d - 3) < 1e-12 && Math.abs(m7.e - 1) < 1e-12 && m7.cote === 'devant',
    'mesure de (7 ; -1) : le long, depuis le coin le plus proche (B), d 3, e 1, devant');
  R.ok(!!m7a && m7a.coin === 'A' && Math.abs(m7a.d - 7) < 1e-12, 'mesure de (7 ; -1), coin A choisi : gardé (d 7)');
  R.ok(G.mesurer(sud, P(12, 0.5)).coin === 'B' && G.mesurer(sud, P(12, 0.5), {coin: 'A'}).coin === 'B',
    'au-delà de B, le coin est B même si A était choisi (le coin choisi ne vaut que le long)');
  const m0 = G.mesurer(sud, P(5, 0), {cote: 'derriere'}), m0d = G.mesurer(sud, P(5, 0)), mp0 = G.mesurer(sud, P(-2, 0), {cote: 'gauche'});
  R.ok(m0.e === 0 && m0.cote === 'derriere' && m0d.cote === 'devant' && mp0.e === 0 && mp0.cote === 'gauche' && G.mesurer(sud, P(-2, 0)).cote === 'droite',
    'e = 0 : le côté affiché est gardé (derrière, gauche), sinon devant ou droite');
  R.ok(m0d.coin === 'A' && G.mesurer({A: P(0, 0), B: P(10, 0), n: P(0, 1)}, P(5, 0)).coin === 'B', 'à mi-côté, le coin pris est le coin gauche vu du dehors');
  R.ok(G.mesurer({A: sud.A, B: sud.B}, P(3, -1)) === null && G.mesurer({A: sud.A, B: sud.B}, P(-2, -0.5)).h === null,
    'sans normale : pas de mesure le long (null) ; au-delà d\'un coin, h vaut null');

  /* bornes sur un côté oblique (cas ordinaire du cadastre) : le bruit de calcul (de l'ordre de 1e-16) ne change ni le côté affiché,
     ni le mode, ni le coin ; o = ce qui est affiché (coin et côté, sans le mode, comme une première mesure) */
  const ob = {A: P(0, 0), B: P(8, 6), n: P(0.6, -0.8)}; /* 10 m, dehors du côté de cw(t) */
  const reprise = (ref, c, o) => { const q = G.placer(ref, c); return q && G.mesurer(ref, q, o || {coin: c.coin, cote: c.cote}); };
  const redonne = (m, c) => !!m && m.mode === c.mode && m.coin === c.coin && m.cote === c.cote && Math.abs(m.d - c.d) <= 1e-9 && Math.abs(m.e - c.e) <= 1e-9;
  const bornes = [
    [ob, '(0 ; 0) (8 ; 6), le long, A, d 3, e 0, derrière', {mode: 'long', coin: 'A', d: 3, e: 0, cote: 'derriere'}],
    [ob, '(0 ; 0) (8 ; 6), prolongement, B, d 2, e 0, gauche', {mode: 'prol', coin: 'B', d: 2, e: 0, cote: 'gauche'}],
    [ob, '(0 ; 0) (8 ; 6), le long, A, d 10 (= |AB|), e 0,5, derrière', {mode: 'long', coin: 'A', d: 10, e: 0.5, cote: 'derriere'}],
    [ob, '(0 ; 0) (8 ; 6), le long, B, d 0, e 0,5, devant', {mode: 'long', coin: 'B', d: 0, e: 0.5, cote: 'devant'}],
    [{A: P(1, 1), B: P(4, 5), n: P(0.8, -0.6)}, '(1 ; 1) (4 ; 5), le long, A, d 0, e 0,5, devant', {mode: 'long', coin: 'A', d: 0, e: 0.5, cote: 'devant'}],
  ];
  bornes.forEach(([ref, n, c]) => { const mb = reprise(ref, c); R.ok(redonne(mb, c) && (c.e || mb.e === 0) && (c.d || mb.d === 0),
    'côté oblique ' + n + ' : redonné tel quel (obtenu ' + ecr(mb) + ')'); });
  const ob2 = {A: P(0.3, 0), B: P(5.2, 3.7)}; ob2.n = G.cw(G.unite(ob2.A, ob2.B));
  R.ok(G.mesurer(ob2, G.milieu(ob2.A, ob2.B)).coin === 'A' && G.coinGauche(ob2) === 'A',
    'côté (0,3 ; 0) (5,2 ; 3,7) : le milieu, mesuré sans coin choisi, part du coin gauche (A)');
  /* au coin, le mode affiché est gardé ; sans normale, un point au coin se mesure dans le prolongement (d 0) au lieu de null */
  const pa = {mode: 'prol', coin: 'A', d: 0, e: 0.5, cote: 'droite'}, mpa = reprise(ob, pa, {mode: 'prol', cote: 'droite'}), mpl = reprise(ob, pa, {});
  R.ok(redonne(mpa, pa) && !!mpl && mpl.mode === 'long' && mpl.coin === 'A' && mpl.d === 0 && Math.abs(mpl.e - 0.5) <= 1e-9 && mpl.cote === 'devant',
    'au coin : prolongement, A, d 0 gardé si le mode affiché est le prolongement ; sinon le long, A, d 0, devant (le même point)');
  const sansN = {A: sud.A, B: sud.B}, pb = {mode: 'prol', coin: 'B', d: 0, e: 0.5, cote: 'gauche'};
  R.ok(redonne(reprise(sansN, pa, {}), pa) && redonne(reprise(sansN, pb, {mode: 'long'}), pb),
    'sans normale, un point posé au coin (prolongement, d 0) est mesuré dans le prolongement, même si le mode affiché est le long');
  /* un point à moins de 1e-9 m du côté ou d'un coin, mesuré avec le côté affiché opposé : la mesure le replace à 1e-9 près */
  const rb = mkRnd(7), ub = (a, b) => a + (b - a) * rb(), tb = P(0.8, 0.6);
  let bPire = 0;
  for (let i = 0; i < 2000; i++){
    const s = i % 2 ? ub(-1e-9, 1e-9) : ub(1, 9), h = ub(-1e-9, 1e-9), q = P(s * tb.x + h * ob.n.x, s * tb.y + h * ob.n.y);
    const mq = G.mesurer(ob, q, {coin: rb() < 0.5 ? 'A' : 'B', cote: h > 0 ? 'derriere' : 'devant'}), q2 = mq && G.placer(ob, mq);
    bPire = Math.max(bPire, q2 ? Math.hypot(q2.x - q.x, q2.y - q.y) : Infinity);
  }
  R.ok(bPire <= 1e-9, 'points à moins de 1e-9 m du côté ou d\'un coin, côté affiché opposé : replacés à 1e-9 près sur 2000 (écart maximal ' + bPire.toExponential(1) + ')');

  /* aller-retour sur des côtés quelconques (graine fixe) */
  const rnd = mkRnd(98), u = (a, b) => a + (b - a) * rnd();
  let ar = 0, arPire = 0, ex = '', inv = 0, invEx = '', nE0 = 0, nD0 = 0, nDL = 0;
  for (let i = 0; i < 1000; i++){
    const A = P(u(-50, 50), u(-50, 50)), th = u(0, 2 * Math.PI), L = u(0.3, 30), B = P(A.x + L * Math.cos(th), A.y + L * Math.sin(th));
    const sg = rnd() < 0.5 ? 1 : -1, ref = {A, B, n: P(sg * Math.sin(th), -sg * Math.cos(th))}, Lr = Math.hypot(B.x - A.x, B.y - A.y);
    const q = P(A.x + u(-1, 2) * (B.x - A.x) + u(-12, 12) * ref.n.x, A.y + u(-1, 2) * (B.y - A.y) + u(-12, 12) * ref.n.y);
    const me = G.mesurer(ref, q, {coin: rnd() < 0.5 ? 'A' : 'B'}), q2 = me && G.placer(ref, me);
    const ec = q2 ? Math.hypot(q2.x - q.x, q2.y - q.y) : Infinity; arPire = Math.max(arPire, ec);
    if (!(ec <= 1e-9)){ ar++; if (!ex) ex = ' ; ex. ' + JSON.stringify({ref, q, me, q2}); }
    /* dans l'autre sens : une saisie posée puis mesurée (mode, coin et côté affichés) redonne la saisie, bornes comprises */
    const k = rnd(), e = rnd() < 0.3 ? 0 : u(0, 8);
    const c = rnd() < 0.5 ? {mode: 'prol', coin: rnd() < 0.5 ? 'A' : 'B', d: k < 0.25 ? 0 : u(0.01, 20), e, cote: rnd() < 0.5 ? 'droite' : 'gauche'}
      : {mode: 'long', coin: rnd() < 0.5 ? 'A' : 'B', d: k < 0.25 ? 0 : k < 0.5 ? Lr : u(0, Lr), e, cote: rnd() < 0.5 ? 'devant' : 'derriere'};
    if (e === 0) nE0++; if (c.d === 0) nD0++; if (c.d === Lr) nDL++;
    const pc = G.placer(ref, c), mc = pc && G.mesurer(ref, pc, {mode: c.mode, coin: c.coin, cote: c.cote});
    if (!redonne(mc, c)){ inv++; if (!invEx) invEx = ' ; ex. ' + JSON.stringify({ref, c, mc}); }
  }
  R.ok(ar === 0, 'aller-retour placer(mesurer(P)) = P à 1e-9 près sur 1000 points autour de côtés quelconques (écart maximal ' + arPire.toExponential(1) + ')' + ex);
  R.ok(inv === 0, 'mesurer(placer(saisie)) redonne la saisie (mode, coin, côté, d et e à 1e-9 près) sur 1000 saisies, dont ' + nE0 + ' avec e = 0, '
    + nD0 + ' avec d = 0 et ' + nDL + ' avec d = |AB| (' + inv + ' écarts)' + invEx);

  /* côtés alignés */
  const deg = Math.PI / 180, dir = (p, a, l) => P(p.x + l * Math.cos(a * deg), p.y + l * Math.sin(a * deg));
  const s1 = G.cotesAlignes([P(0, 0), P(10, 0), dir(P(10, 0), 1, 10)], false), s3 = G.cotesAlignes([P(0, 0), P(10, 0), dir(P(10, 0), 3, 10)], false);
  R.ok(Array.isArray(s1) && s1.length === 1 && s1[0].i0 === 0 && s1[0].i1 === 2 && proche(s1[0].A, P(0, 0)) && proche(s1[0].B, dir(P(10, 0), 1, 10)),
    'deux segments à 1° : un seul côté, du sommet 0 au sommet 2 (obtenu ' + JSON.stringify(s1) + ')');
  R.ok(Array.isArray(s3) && s3.length === 2 && s3[0].i1 === 1 && s3[1].i0 === 1, 'deux segments à 3° : deux côtés (obtenu ' + (s3 && s3.length) + ')');
  R.ok(G.cotesAlignes([P(0, 0), P(10, 0), dir(P(10, 0), 3, 10)], false, 4).length === 1, 'tolérance donnée (4°) : les deux segments à 3° sont fusionnés');
  const rep = G.cotesAlignes([P(0, 0), P(5, 0), P(5, 0), P(10, 0), P(10, 6)], false);
  R.ok(rep.length === 2 && rep[0].i0 === 0 && rep[0].i1 === 3 && rep[1].i0 === 3 && rep[1].i1 === 4, 'sommet répété ignoré : (0,0) (5,0) (5,0) (10,0) (10,6) donne deux côtés, 0-3 et 3-4');
  const repc = G.cotesAlignes([P(0, 0), P(10, 0), P(10, 0), P(10, 6)], false);
  R.ok(repc.length === 2 && repc[0].i1 === 1 && repc[1].i0 === 1, 'sommet répété sur un coin : les deux côtés se touchent au premier des deux');
  const f0 = G.cotesAlignes([P(5, 0), P(10, 0), P(10, 6), P(0, 6), P(0, 0)], true), der = f0 && f0[f0.length - 1];
  R.ok(!!f0 && f0.length === 4 && der.i0 === 4 && der.i1 === 1 && proche(der.A, P(0, 0)) && proche(der.B, P(10, 0)),
    'polyligne fermée dont le sommet 0 est au milieu d\'un côté : la fusion le traverse (côté 4-1, de (0,0) à (10,0)) (obtenu ' + JSON.stringify(f0) + ')');
  const fr = G.cotesAlignes([P(0, 0), P(10, 0), P(10, 6), P(0, 6), P(0, 0)], true);
  R.ok(fr.length === 4 && fr[3].i0 === 3 && fr[3].i1 === 0, 'polyligne fermée qui répète son premier sommet : quatre côtés, le dernier finit au sommet 0');
  R.ok(G.cotesAlignes([P(5, 0), P(10, 0), P(10, 6), P(0, 6), P(0, 0)], false).length === 4, 'même polyligne ouverte : pas de fusion par le sommet 0 (quatre côtés)');
  const z1 = dir(P(0, 0), 0.75, 10), z2 = dir(z1, -0.75, 10), zz = G.cotesAlignes([P(0, 0), z1, z2, dir(z2, 0.75, 10)], false);
  R.ok(zz.length === 1, 'mur tracé en zigzag de ±0,75° : un seul côté');
  const arc = G.cotesAlignes([P(0, 0), P(10, 0), dir(P(10, 0), 1.5, 10), dir(dir(P(10, 0), 1.5, 10), 3, 10)], false);
  R.ok(arc.length === 2, 'segments qui tournent de 1,5° chacun : pas de dérive (règle de la corde), deux côtés (obtenu ' + arc.length + ')');
  /* bâti dont la façade sud a un faux coin (1,9° puis −1°, que la fusion garde) : mêmes côtés quel que soit le sommet 0 */
  const q0 = P(0, 0), q1 = dir(q0, 0, 10), q2 = dir(q1, 1.9, 10), q3 = dir(q2, -1, 10), bat = [q0, q1, q2, q3, P(q3.x, 10), P(0, 10)];
  const cles = L => (G.cotesAlignes(L, true) || []).map(s => [s.A.x, s.A.y, s.B.x, s.B.y].map(v => v.toFixed(9)).join(' ')).sort().join(' | ');
  const tours = bat.map((_, r) => cles(bat.slice(r).concat(bat.slice(0, r))));
  R.ok(G.cotesAlignes(bat, true).length === 4 && tours.every(t => t === tours[0]),
    'bâti à faux coin donné depuis chacun de ses 6 sommets : les mêmes 4 côtés, la façade sud entière (obtenu ' + tours.map(t => t.split(' | ').length).join(', ') + ' côtés)');
  /* rectangle tourné : ses coins sont égaux à l'arrondi près, le départ peut donc être n'importe lequel ; l'ordre rendu n'en dépend pas */
  let horsOrdre = 0, exOrdre = '';
  for (let k = 0; k < 500; k++){
    const th = 0.01 + k * 0.0123, c = Math.cos(th), s = Math.sin(th), ox = 300 * Math.sin(k), oy = 200 * Math.cos(1.7 * k);
    const r = (x, y) => P(ox + x * c - y * s, oy + x * s + y * c), o = G.cotesAlignes([r(5, 0), r(10, 0), r(10, 6), r(0, 6), r(0, 0)], true);
    const ordre = o ? o.map(q => q.i0 + '-' + q.i1).join(' ') : String(o);
    if (ordre !== '1-2 2-3 3-4 4-1'){ horsOrdre++; exOrdre = exOrdre || ordre; }
  }
  R.ok(horsOrdre === 0, 'rectangle tourné de 500 façons, sommet 0 au milieu d\'un côté : côtés 1-2, 2-3, 3-4 et 4-1, dans l\'ordre des sommets'
    + ' (hors ordre : ' + horsOrdre + (exOrdre ? ', par exemple ' + exOrdre : '') + ')');

  /* polygone en U : le creux est dehors */
  const U = [P(0, 0), P(9, 0), P(9, 9), P(6, 9), P(6, 3), P(3, 3), P(3, 9), P(0, 9)];
  R.ok(G.dansPolygone(P(4.5, 6), U) === false, 'polygone en U : un point dans le creux est dehors');
  R.ok(G.dansPolygone(P(1.5, 6), U) === true && G.dansPolygone(P(7.5, 6), U) === true && G.dansPolygone(P(4.5, 1.5), U) === true, 'polygone en U : les deux branches et la base sont dedans');
  R.ok(G.dansPolygone(P(12, 4), U) === false && G.dansPolygone(P(-1, 9.5), U) === false, 'polygone en U : un point extérieur est dehors');
  R.ok(G.dansPolygone(P(9, 4), U) === false && G.dansPolygone(P(4.5, 3), U) === false && G.dansPolygone(P(0, 0), U) === false, 'un point sur le bord (ou sur un sommet) est dehors');
  R.ok(G.dansPolygone(P(5, 3), [P(0, 0), P(10, 0), P(10, 6), P(0, 6), P(0, 0)]) === true, 'polygone qui répète son premier sommet : dedans');
  const dp = G.distPolygone(P(5, 6), U), dpe = G.distPolygone(P(12, 4), U);
  R.ok(!!dp && Math.abs(dp.d - 1) < 1e-12 && dp.seg === 3 && proche(dp.proj, P(6, 6)), 'distance au bord depuis le creux : 1 m, côté 3, pied (6 ; 6) (obtenu ' + JSON.stringify(dp) + ')');
  R.ok(!!dpe && Math.abs(dpe.d - 3) < 1e-12 && dpe.seg === 1 && proche(dpe.proj, P(9, 4)), 'distance au bord depuis le dehors : 3 m, côté 1, pied (9 ; 4)');
  R.ok(Math.abs(G.distPolygone(P(-3, -4), U).d - 5) < 1e-12 && G.distPolygone(P(-3, -4), U).seg === 0, 'distance à un sommet : 5 m (premier côté à égalité)');

  /* pied de perpendiculaire, intersection, milieu */
  const pp = G.piedPerp(P(15, 3), P(0, 0), P(10, 0)), po = G.piedPerp(P(6, 2), P(1, 1), P(3, 3));
  R.ok(proche(pp, P(15, 0)) && Math.abs(pp.t - 1.5) < 1e-12 && proche(V.outils.projSeg(P(15, 3), P(0, 0), P(10, 0)), P(10, 0)),
    'pied de perpendiculaire hors du segment : (15 ; 0), t = 1,5 (la projection bornée donne (10 ; 0))');
  R.ok(proche(po, P(4, 4)) && Math.abs(po.t - 1.5) < 1e-12, 'pied de perpendiculaire sur une droite oblique : (4 ; 4)');
  R.ok(G.interDroites(P(0, 0), P(10, 0), P(0, 1), P(10, 1)) === null && G.interDroites(P(0, 0), P(10, 0), P(20, 0), P(30, 0)) === null,
    'droites parallèles ou confondues : null');
  const ix = G.interDroites(P(0, 0), P(10, 0), P(15, 1), P(15, 2)), iy = G.interDroites(P(0, 0), P(4, 4), P(0, 4), P(4, 0));
  R.ok(proche(ix, P(15, 0)) && Math.abs(ix.t - 1.5) < 1e-12 && Math.abs(ix.u + 1) < 1e-12 && proche(iy, P(2, 2)), 'intersection des droites, même hors des segments : (15 ; 0) et (2 ; 2)');
  R.ok(proche(G.milieu(P(0, 0), P(10, 6)), P(5, 3)) && proche(G.milieu(P(-2, 4), P(2, -4)), P(0, 0)), 'milieu de deux points');
  R.ok(proche(G.cw(P(1, 2)), P(2, -1)) && proche(G.ccw(P(1, 2)), P(-2, 1)), 'cw (droite de qui regarde selon v) et ccw (sa gauche)');
  R.ok(proche(G.unite(P(1, 1), P(4, 5)), P(0.6, 0.8)) && G.unite(P(1, 1), P(1, 1)) === null, 'vecteur unitaire de a vers b ; null si a = b');

  /* entrées invalides : null, sans exception */
  const c0 = {mode: 'prol', coin: 'A', d: 2, e: 0.5, cote: 'droite'};
  const invalides = [
    ['côté de longueur nulle', () => G.placer({A: P(1, 1), B: P(1, 1), n: P(0, -1)}, c0)],
    ['côté absent', () => G.placer(null, c0)],
    ['saisie absente', () => G.placer(sud, null)],
    ['d non fini', () => G.placer(sud, Object.assign({}, c0, {d: NaN}))],
    ['e infini', () => G.placer(sud, Object.assign({}, c0, {e: Infinity}))],
    ['d en texte', () => G.placer(sud, Object.assign({}, c0, {d: '2'}))],
    ['d négatif', () => G.placer(sud, Object.assign({}, c0, {d: -1}))],
    ['e négatif', () => G.placer(sud, Object.assign({}, c0, {e: -0.5}))],
    ['mode inconnu', () => G.placer(sud, Object.assign({}, c0, {mode: 'travers'}))],
    ['coin inconnu', () => G.placer(sud, Object.assign({}, c0, {coin: 'C'}))],
    ['côté « devant » en prolongement', () => G.placer(sud, Object.assign({}, c0, {cote: 'devant'}))],
    ['côté « droite » le long', () => G.placer(sud, {mode: 'long', coin: 'A', d: 3, e: 1, cote: 'droite'})],
    ['coordonnée non finie', () => G.placer({A: P(0, NaN), B: P(10, 0)}, c0)],
    ['normale parallèle au côté', () => G.placer({A: P(0, 0), B: P(10, 0), n: P(1, 0)}, c0)],
    ['normale non finie', () => G.placer({A: P(0, 0), B: P(10, 0), n: P(0, Infinity)}, c0)],
    ['mesure d\'un point non fini', () => G.mesurer(sud, P(NaN, 0))],
    ['mesure sans côté', () => G.mesurer(undefined, P(1, 1))],
    ['coin gauche sans normale', () => G.coinGauche({A: P(0, 0), B: P(10, 0)})],
    ['côtés d\'une polyligne absente', () => G.cotesAlignes(null, false)],
    ['côtés avec un sommet non fini', () => G.cotesAlignes([P(0, 0), P(Infinity, 0)], false)],
    ['tolérance négative', () => G.cotesAlignes([P(0, 0), P(1, 0)], false, -1)],
    ['point dans un polygone absent', () => G.dansPolygone(P(1, 1), null)],
    ['point absent', () => G.dansPolygone(null, U)],
    ['distance à un polygone vide', () => G.distPolygone(P(1, 1), [])],
    ['pied sur une droite de longueur nulle', () => G.piedPerp(P(1, 1), P(2, 2), P(2, 2))],
    ['intersection avec un point absent', () => G.interDroites(P(0, 0), null, P(1, 1), P(2, 2))],
    ['milieu avec un point absent', () => G.milieu(P(0, 0), {x: 1})],
    ['unitaire d\'un point absent', () => G.unite(undefined, P(1, 1))],
    ['cw d\'un vecteur absent', () => G.cw(null)],
  ];
  const mal = invalides.filter(([, f]) => sur(f) !== null).map(([n, f]) => n + ' → ' + JSON.stringify(sur(f)));
  R.ok(!mal.length, 'entrées invalides : null sans exception (' + invalides.length + ' cas)' + (mal.length ? ' ; faux : ' + mal.join(' | ') : ''));
  R.ok(JSON.stringify(G.cotesAlignes([P(1, 1)], false)) === '[]' && JSON.stringify(G.cotesAlignes([P(1, 1), P(1, 1)], true)) === '[]', 'polyligne d\'un seul sommet distinct : aucun côté');
  R.ok(G.dansPolygone(P(1, 1), [P(0, 0), P(5, 5)]) === false, 'polygone de deux sommets : rien n\'est dedans');
  R.ok(proche(G.placer(sud, {mode: 'prol', coin: 'A', d: 0, e: 0, cote: 'droite'}), P(0, 0)), 'd et e nuls permis : le point est le coin');
}
if (!G || typeof G.placer !== 'function') R.ok(false, 'VCroquis.geo absent (fonctions de géométrie du plan)');
else { try { essais(); } catch (e){ R.ok(false, 'exception : ' + e.message + ' ' + (e.stack || '').split('\n')[1]); } }
R.fin();
