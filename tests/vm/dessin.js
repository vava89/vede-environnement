// Géométrie pure du plan (VCroquis.geo, m98 ; échoue sur 1e27c7b) : pose par cotes et mesure inverse (convention 11.1 de
// .claude/conception-outils-dessin.md : le technicien est dehors, face au bâtiment), bornes comprises (coin, mi-côté, point sur le côté,
// côtés obliques), côtés alignés d'une polyligne (un bâti donne les mêmes côtés quel que soit son sommet 0), point dans un polygone,
// distance au bord, pied de perpendiculaire, intersection de droites, milieu. Coordonnées du plan en mètres, y vers le nord. Aucune donnée réelle.
// Lignes de référence du plan (VCroquis.geo.lignesRef et normaleExt, m99 ; échoue sur df95377) : natures sur le fond fictif de
// VCroquis.demoDxf(), complété de polylignes fictives (bâti trouvé ; parcelle trouvée ; SECTION, SUBDFISC, SUBDSECT, ZONCOMM et TEX écartés ;
// PARCELLENFP gardé), calques masqués, décalage du fond, mêmes côtés que l'aide au dessin de df95377 (aretesFond), aire et normale
// extérieure d'un carré parcouru dans les deux sens et des bâtis de la démonstration, trait de complément ajouté au croquis de
// démonstration, aucune ligne pour un tronçon, un collecteur ou un escalier ; polyligne fermée sans intérieur (sommets alignés aux arrondis
// près, ruban de 5 mm : aire 0, aucune normale ; ruban de 2 cm gardé) ; éléments qui ne sont pas des objets sautés, sans exception.
// Nouveaux accrochages (m112 ; échoue sur e9e8b5d) : clés accMilieu, accPerp et accParcelle à false dans AIDES_DEFAUT, libellés, puces de la
// palette ; milieu d'un côté et pied de la perpendiculaire (VCroquis.geo.milieuSegs et piedSegs) : seuils, côtés de 20 cm au plus écartés,
// égalités, pied hors du côté, point précédent sur la droite du côté, entrées invalides.
// usage : node tests/vm/dessin.js [-v] [--app=<dossier>]
'use strict';
const {charger, copie, rapport} = require('./charger.js');
const {mkRnd} = require('./generateur.js');
const {V, ctx} = charger(), R = rapport('dessin');
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

/* ---------- Lignes de référence (m99) ---------- */
/* repère de la démonstration (DEMO dans croquis.js) : u le long de la rue, v vers les maisons du nord ; le plan est tourné de 12° */
const DEMO = {x: 1700000, y: 8200000, th: 12 * Math.PI / 180};
const demoAbs = (u, v) => P(DEMO.x + u * Math.cos(DEMO.th) - v * Math.sin(DEMO.th), DEMO.y + u * Math.sin(DEMO.th) + v * Math.cos(DEMO.th));
/* point du plan d'un croquis d'origine o (u = 1) vers le repère de la démonstration */
const versDemo = (p, o) => { const x = p.x + o.x - DEMO.x, y = p.y + o.y - DEMO.y; return P(x * Math.cos(DEMO.th) + y * Math.sin(DEMO.th), -x * Math.sin(DEMO.th) + y * Math.cos(DEMO.th)); };
/* polyligne DXF R12 (comme demoDxf) aux points (u, v) de la démonstration ; ferme : drapeau 70 */
function polyDxf(lay, uv, ferme){
  const L = [], g = (c, v) => L.push(('   ' + c).slice(-3), String(v)), f = x => x.toFixed(3);
  g(0, 'POLYLINE'); g(8, lay); g(66, 1); g(10, '0.0'); g(20, '0.0'); g(30, '0.0'); g(70, ferme ? 1 : 0);
  uv.forEach(([u, v]) => { const p = demoAbs(u, v); g(0, 'VERTEX'); g(8, lay); g(10, f(p.x)); g(20, f(p.y)); g(30, '0.0'); });
  g(0, 'SEQEND'); g(8, lay);
  return L.join('\r\n') + '\r\n';
}
/* trait « Complément du fond » d'un croquis ; un sommet [x, y, id] est posé sur l'objet id */
const trait = (id, t, pts) => ({id, k: 'ln', t, v: pts.map(q => ({x: q[0], y: q[1], a: q[2] || null})), p: t === 'lim' ? {st: 'existant'} : {res: 'EU', st: 'existant'}, lab: null});

function lignes(){
  ctx.TextDecoder = TextDecoder; /* lecture du DXF dans le bac à sable */
  /* fond de démonstration, complété de calques fictifs du cadastre que la démonstration n'a pas (avant la fin de la section ENTITIES) */
  const fin = '  0\r\nENDSEC\r\n  0\r\nEOF\r\n', dxf0 = V.demoDxf();
  const ajout = polyDxf('1SECTION', [[-25, -50], [150, -50], [150, 50], [-25, 50]], true) + polyDxf('1SUBDFISC', [[64, 0], [76, 0], [76, 17], [64, 17]], true)
    + polyDxf('1SUBDSECT', [[0, -45], [120, -45], [120, 40], [0, 40]], true) + polyDxf('3PARCELLETEX', [[66, 20], [68, 22]], false)
    + polyDxf('1PARCELLENFP', [[40, 34], [52, 34], [52, 40]], false) + polyDxf('1PARCELLENFP', [[80, 40], [90, 40], [90, 48], [80, 48], [80, 40]], false);
  R.ok(dxf0.endsWith(fin), 'DXF de démonstration : il finit par la section ENTITIES (polylignes fictives ajoutées avant sa fin)');
  const fond = V.lireFondDxf(Buffer.from(dxf0.slice(0, -fin.length) + ajout + fin, 'utf8'), 'Plan fictif');
  const doc = copie(V.demoCroquis(fond)), o = fond.origine, cal = r => fond.calques[r.src.L] ? fond.calques[r.src.L].nom : '?';
  const lr = G.lignesRef(doc, fond), parNat = n => (lr || []).filter(r => r.nat === n);
  if (!R.ok(Array.isArray(lr), 'lignes de référence du fond de démonstration et du croquis de démonstration : une liste (obtenu ' + typeof lr + ')')) return;
  const bati = parNat('bati'), lim = parNat('limite'), compl = parNat('complement');
  const noms = a => Array.from(new Set(a.map(cal))).sort().join(', ');
  R.ok(bati.length === 23 && noms(bati) === '3BATIDUR, 3BATILEGER', 'bâti : 23 polylignes, calques 3BATIDUR et 3BATILEGER (obtenu ' + bati.length + ' : ' + noms(bati) + ')');
  R.ok(lim.length === 20 && noms(lim) === '1PARCELLE, 1PARCELLENFP', 'limites : les 18 parcelles et les 2 polylignes de 1PARCELLENFP (obtenu ' + lim.length + ' : ' + noms(lim) + ')');
  R.ok(compl.length === 0 && lr.length === bati.length + lim.length, 'croquis de démonstration sans trait de complément : aucune ligne de complément, aucune autre nature');
  const ecartes = ['1SECTION', '1SUBDFISC', '1SUBDSECT', '1ZONCOMM', '3PARCELLETEX', '3MURMI'];
  R.ok(ecartes.every(n => fond.calques.some(c => c.nom === n && c.nL > 0)) && !lr.some(r => ecartes.indexOf(cal(r)) >= 0),
    'calques écartés, bien présents dans le fond avec des polylignes : ' + ecartes.join(', '));
  /* chaque ligne du fond : sommets du fond (plus le décalage, nul ici), calque et rang de la polyligne */
  const malFond = lr.filter(r => { const l = fond.L[r.src.i]; return !l || l.c !== r.src.L || r.P.length !== l.n
    || r.P.some((q, k) => q.x !== fond.xy[2 * (l.d + k)] || q.y !== fond.xy[2 * (l.d + k) + 1]) || r.ferme !== (l.f === 1 || r.src.L === fond.calques.findIndex(c => c.nom === '1PARCELLENFP') && r.P.length === 5); });
  R.ok(!malFond.length, 'lignes du fond : sommets du fond dans l\'ordre, src = {L : calque, i : rang dans fond.L}, fermée si le DXF le dit ou si le dernier point répète le premier'
    + (malFond.length ? ' ; faux : ' + malFond.length + ', ex. ' + JSON.stringify(malFond[0]).slice(0, 200) : ''));
  /* bâti du croquis de démonstration (u 65,5 à 74,5, v 4 à 14), parcouru dans le sens trigonométrique ; bâti du sud parcouru dans l'autre sens */
  const centre = r => versDemo(P(r.P.slice(0, -1).reduce((s, q) => s + q.x, 0) / (r.P.length - 1), r.P.slice(0, -1).reduce((s, q) => s + q.y, 0) / (r.P.length - 1)), o);
  const pres = (r, u, v) => { const c = centre(r); return Math.abs(c.x - u) < 0.01 && Math.abs(c.y - v) < 0.01; };
  const b5 = bati.find(r => pres(r, 70, 9)), bs = bati.find(r => pres(r, 7, -19.5)), p5 = lim.find(r => pres(r, 70, 17));
  const rue = P(Math.sin(DEMO.th), -Math.cos(DEMO.th)), nord = P(-rue.x, -rue.y), est = P(Math.cos(DEMO.th), Math.sin(DEMO.th));
  /* le DXF arrondit les sommets au millimètre : directions à 1e-3 près, aires à 0,1 m² près */
  const vers = (n, d) => !!n && Math.abs(n.x - d.x) < 1e-3 && Math.abs(n.y - d.y) < 1e-3;
  R.ok(!!b5 && b5.ferme && Math.abs(b5.aire - 90) < 0.1 && vers(G.normaleExt(b5, 0), rue) && vers(G.normaleExt(b5, 1), est) && vers(G.normaleExt(b5, 2), nord),
    'bâti de démonstration (9 × 10 m, sens trigonométrique) : aire +90, normales extérieures vers la rue, l\'est et le nord'
    + (b5 ? ' (aire ' + b5.aire.toFixed(3) + ')' : ' (introuvable)'));
  R.ok(!!bs && bs.ferme && Math.abs(bs.aire + 121) < 0.1 && vers(G.normaleExt(bs, 0), nord) && vers(G.normaleExt(bs, 1), est),
    'bâti au sud de la rue (11 × 11 m, sens des aiguilles) : aire -121, façade sur rue vers le nord, côté suivant vers l\'est'
    + (bs ? ' (aire ' + bs.aire.toFixed(3) + ')' : ' (introuvable)'));
  R.ok(!!p5 && p5.ferme && Math.abs(p5.aire - 408) < 0.1 && vers(G.normaleExt(p5, 0), rue), 'parcelle de la démonstration (12 × 34 m) : aire +408, limite sur rue, dehors vers la rue');
  const nfp = lim.filter(r => cal(r) === '1PARCELLENFP'), nfpO = nfp.find(r => r.P.length === 3), nfpF = nfp.find(r => r.P.length === 5);
  R.ok(!!nfpO && !nfpO.ferme && nfpO.aire === 0 && G.normaleExt(nfpO, 0) === null && !!nfpF && nfpF.ferme && Math.abs(nfpF.aire - 80) < 0.1 && vers(G.normaleExt(nfpF, 3), P(-est.x, -est.y)),
    'polyligne ouverte : aire 0, pas de normale ; polyligne close par son dernier point (sans drapeau) : fermée, aire +80, normale extérieure');

  /* mêmes côtés que l'aide au dessin de df95377 (aretesFond : bâti et bâti léger des calques visibles, sommets du fond plus le décalage) */
  const off = {x: 3.25, y: -1.5}, ancien = [], neuf = [];
  fond.L.forEach(l => { const cq = fond.calques[l.c]; if ((cq.style !== 'bati' && cq.style !== 'batileger') || !cq.vis) return;
    for (let k = 1; k < l.n; k++){ const i0 = 2 * (l.d + k - 1), i1 = 2 * (l.d + k); ancien.push([fond.xy[i0] + off.x, fond.xy[i0 + 1] + off.y, fond.xy[i1] + off.x, fond.xy[i1 + 1] + off.y]); } });
  (G.lignesRef(doc, fond, off, ['bati']) || []).forEach(r => { for (let k = 1; k < r.P.length; k++) neuf.push([r.P[k - 1].x, r.P[k - 1].y, r.P[k].x, r.P[k].y]); });
  R.ok(ancien.length === 92 && JSON.stringify(neuf) === JSON.stringify(ancien), 'bâti : les mêmes ' + ancien.length + ' côtés, dans le même ordre et aux mêmes valeurs, que l\'aide au dessin de df95377 (obtenu ' + neuf.length + ')');
  /* décalage : celui du croquis par défaut (decalageFond), sinon celui donné */
  const doc2 = Object.assign({}, doc, {origine: {x: o.x + 10, y: o.y - 5}}), l2 = G.lignesRef(doc2, fond, null, ['bati']) || [], l3 = G.lignesRef(doc, fond, {x: -10, y: 5}, ['bati']) || [];
  R.ok(l2.length === 23 && JSON.stringify(l2) === JSON.stringify(l3) && proche(l2[0].P[0], P(bati[0].P[0].x - 10, bati[0].P[0].y + 5), 1e-9),
    'croquis d\'une autre origine : sommets décalés de (-10 ; 5), comme avec le décalage donné');
  /* calques masqués : écartés ; fond masqué (null) : les traits du croquis seulement */
  const iLeg = fond.calques.findIndex(c => c.nom === '3BATILEGER'), iPar = fond.calques.findIndex(c => c.nom === '1PARCELLE');
  fond.calques[iLeg].vis = false; fond.calques[iPar].vis = false;
  const lm = G.lignesRef(doc, fond) || [];
  fond.calques[iLeg].vis = true; fond.calques[iPar].vis = true;
  R.ok(lm.filter(r => r.nat === 'bati').length === 18 && lm.filter(r => r.nat === 'limite').length === 2, 'calques 3BATILEGER et 1PARCELLE masqués : 18 bâtis et les 2 lignes de 1PARCELLENFP');
  R.ok(JSON.stringify(G.lignesRef(doc, null)) === '[]', 'fond masqué (null) et croquis sans complément : aucune ligne');
  const nb = nats => { const l = G.lignesRef(doc, fond, null, nats); return l ? l.length + ':' + Array.from(new Set(l.map(r => r.nat))).join('+') : String(l); };
  R.ok(nb(['bati']) === '23:bati' && nb(['limite']) === '20:limite' && nb([]) === '0:', 'natures demandées : bâti seul, limites seules, aucune (obtenu ' + [nb(['bati']), nb(['limite']), nb([])].join(' ; ') + ')');

  /* trait de complément ajouté au croquis de démonstration (clôture au fond du jardin) ; tronçons, collecteurs : aucune ligne */
  const q = (u, v) => { const a = demoAbs(u, v); return [a.x - doc.origine.x, a.y - doc.origine.y]; };
  const docC = copie(doc), tr0 = docC.el.filter(e => e.k === 'ln').length;
  docC.el.push(trait('clo', 'lim', [q(64, 30), q(70, 31), q(76, 30)]));
  const lc = (G.lignesRef(docC, fond) || []).filter(r => r.nat === 'complement');
  R.ok(tr0 === 14 && lc.length === 1 && lc[0].src.id === 'clo' && Object.keys(lc[0].src).join() === 'id' && !lc[0].ferme && lc[0].aire === 0 && G.normaleExt(lc[0], 0) === null
    && lc[0].P.length === 3 && proche(lc[0].P[1], P(q(70, 31)[0], q(70, 31)[1]), 1e-9),
    'croquis de démonstration (' + tr0 + ' tronçons et collecteurs) et un trait de complément : une seule ligne de complément, src = {id}, ouverte, sommets du trait');
  /* carré de complément parcouru dans les deux sens (dernier point répété) ; un sommet posé sur un objet prend la place de l'objet */
  const docQ = {el: [{id: 'o1', k: 'pt', t: 'regard', x: 4, y: 4, p: {}, lab: null},
    trait('ccw', 'lim', [[0, 0], [4, 0], [4, 4, 'o1'], [0, 4], [0, 0]]), trait('cw', 'lim', [[0, 0], [0, 4], [9, 9, 'o1'], [4, 0], [0, 0]]),
    trait('ouv', 'lim', [[0, 0], [4, 0], [4, 4], [0, 4]]), trait('t1', 'tr', [[0, 0], [4, 0], [4, 4], [0, 0]]), trait('c1', 'col', [[-5, -1], [9, -1]]),
    trait('e1', 'esc', [[1, 1], [3, 1]])]};
  const lq = G.lignesRef(docQ, null) || [], cq = id => lq.find(r => r.src.id === id);
  const norm = (r, i) => { const n = G.normaleExt(r, i); return n ? Math.round(n.x) + ',' + Math.round(n.y) : String(n); };
  const tous = r => r ? [0, 1, 2, 3, 4].map(i => norm(r, i)).join(' ') : '';
  R.ok(lq.length === 3 && lq.every(r => r.nat === 'complement'), 'tronçon fermé, collecteur et escalier : aucune ligne ; les trois traits de complément seulement (obtenu ' + lq.map(r => r.src.id).join(', ') + ')');
  R.ok(!!cq('ccw') && cq('ccw').ferme && cq('ccw').aire === 16 && tous(cq('ccw')) === '0,-1 1,0 0,1 -1,0 null',
    'carré dans le sens trigonométrique : fermé, aire +16, normales extérieures sud, est, nord, ouest (obtenu ' + tous(cq('ccw')) + ')');
  R.ok(!!cq('cw') && cq('cw').ferme && cq('cw').aire === -16 && tous(cq('cw')) === '-1,0 0,1 1,0 0,-1 null' && proche(cq('cw').P[2], P(4, 4)),
    'carré dans l\'autre sens : aire -16, normales ouest, nord, est, sud ; sommet posé sur l\'objet en (4 ; 4) (obtenu ' + tous(cq('cw')) + ')');
  R.ok(!!cq('ouv') && !cq('ouv').ferme && cq('ouv').aire === 0 && tous(cq('ouv')) === 'null null null null null', 'carré ouvert (sans retour au départ) : aire 0, aucune normale');
  const sansErr = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };
  const inv = [['fond sans polylignes', () => G.lignesRef(doc, {})], ['décalage non fini', () => G.lignesRef(doc, fond, {x: NaN, y: 0})],
    ['natures en texte', () => G.lignesRef(doc, fond, null, 'bati')], ['croquis sans éléments', () => G.lignesRef({}, null)],
    ['normale d\'une ligne absente', () => G.normaleExt(null, 0)], ['normale d\'un segment hors de la ligne', () => G.normaleExt(cq('ccw'), 5)],
    ['normale d\'un indice négatif', () => G.normaleExt(cq('ccw'), -1)], ['normale d\'un indice non entier', () => G.normaleExt(cq('ccw'), 0.5)]];
  const malI = inv.filter(([, f]) => sansErr(f) !== null).map(([n, f]) => n + ' → ' + JSON.stringify(sansErr(f)));
  R.ok(!malI.length, 'entrées invalides : null sans exception (' + inv.length + ' cas)' + (malI.length ? ' ; faux : ' + malI.join(' | ') : ''));
  R.ok(JSON.stringify(G.lignesRef(null, null)) === '[]', 'ni croquis ni fond : aucune ligne');
  /* éléments qui ne sont pas des objets : sautés, sans exception (polylignes du fond, éléments du croquis, trait dont un sommet est null) */
  const fondN = Object.assign({}, fond, {L: fond.L.concat([null, 7, 'x'])});
  const docN = {el: [null, 5].concat(copie(docQ.el), [trait('nul', 'lim', [[0, 0], [2, 0], [2, 2]])])};
  docN.el[docN.el.length - 1].v[1] = null;
  const lF = sansErr(() => G.lignesRef(null, fondN)), lN = sansErr(() => G.lignesRef(docN, null));
  R.ok(JSON.stringify(lF) === JSON.stringify(G.lignesRef(null, fond)), 'polylignes du fond qui ne sont pas des objets (null, nombre, texte) : sautées, sans exception, les autres lignes inchangées'
    + (Array.isArray(lF) ? '' : ' (obtenu ' + JSON.stringify(lF).slice(0, 80) + ')'));
  R.ok(JSON.stringify(lN) === JSON.stringify(lq), 'éléments du croquis qui ne sont pas des objets (null, nombre), trait dont un sommet est null : sautés, sans exception, les autres lignes inchangées'
    + (Array.isArray(lN) ? ' (traits gardés : ' + lN.map(r => r.src.id).join(', ') + ')' : ' (obtenu ' + JSON.stringify(lN).slice(0, 80) + ')'));

  /* polyligne fermée sans intérieur (GEO_MINCE : largeur moyenne de 1 cm au plus) : aire 0, aucune normale ; une polyligne mince
     de 2 cm garde son aire et ses normales */
  const brute = Q => { let s = 0; for (let k = 1; k < Q.length - 1; k++) s += (Q[k].x - Q[0].x) * (Q[k + 1].y - Q[0].y) - (Q[k + 1].x - Q[0].x) * (Q[k].y - Q[0].y); return s / 2; };
  const mm = x => Math.round(x * 1000) / 1000, sur12 = s => [mm(s * Math.cos(DEMO.th)), mm(s * Math.sin(DEMO.th))];
  const docM = {el: [trait('aligne', 'lim', [sur12(0), sur12(7.3), sur12(18.1), sur12(0)]),
    trait('ruban', 'lim', [[0, 0], [10, 0], [10, 0.005], [0, 0.005], [0, 0]]), trait('mince', 'lim', [[0, 0], [10, 0], [10, 0.02], [0, 0.02], [0, 0]])]};
  const lM = G.lignesRef(docM, null) || [], m = id => lM.find(r => r.src.id === id) || {P: []};
  const sansN = r => r.P.every((q, k) => G.normaleExt(r, k) === null);
  R.ok(m('aligne').ferme && m('aligne').aire === 0 && brute(m('aligne').P) !== 0 && sansN(m('aligne')),
    'trait de complément fermé aux sommets alignés (direction 12°, arrondis au millimètre) : fermé, aire 0 (bruit de calcul '
    + brute(m('aligne').P).toExponential(1) + ' m²), aucune normale');
  R.ok(m('ruban').ferme && m('ruban').aire === 0 && sansN(m('ruban')), 'ruban fermé de 10 m sur 5 mm : sans intérieur, aire 0, aucune normale');
  R.ok(m('mince').ferme && Math.abs(m('mince').aire - 0.2) < 1e-12 && norm(m('mince'), 0) === '0,-1' && norm(m('mince'), 1) === '1,0',
    'ruban fermé de 10 m sur 2 cm : aire +0,2 m², normales extérieures sud et est (obtenu ' + m('mince').aire + ')');
  /* même cas sur le fond : polyligne fermée par le drapeau du DXF, sommets alignés dans le repère tourné de la démonstration, arrondis au
     millimètre par le DXF, gardés en simple précision par le fond */
  const fond2 = V.lireFondDxf(Buffer.from(dxf0.slice(0, -fin.length) + polyDxf('1PARCELLE', [[30, 34], [36.4, 34], [47.9, 34]], true) + fin, 'utf8'), 'Plan fictif');
  const la = (G.lignesRef(null, fond2, null, ['limite']) || []).find(r => r.src.i === fond2.L.length - 1) || {P: []};
  R.ok(la.P.length === 4 && la.ferme && la.aire === 0 && brute(la.P) !== 0 && sansN(la),
    'polyligne du fond fermée par le drapeau, aux sommets alignés : fermée, aire 0 (bruit de calcul ' + brute(la.P).toExponential(1) + ' m²), aucune normale');
}
/* Nouveaux accrochages (m112 ; échoue sur e9e8b5d) : clés décochées d'origine, libellés, puces de la palette ; milieu d'un côté et pied de
   la perpendiculaire (VCroquis.geo.milieuSegs et piedSegs) sur des côtés [x0, y0, x1, y1] en mètres : seuil, côté de 20 cm au plus écarté,
   le plus proche puis le premier à égalité, pied hors du côté, point précédent sur la droite du côté ou tout près, entrées invalides */
function accrochages(){
  const D = V.AIDES_DEFAUT || {}, L = V.AIDES_LIB || [], A = V.ACCROCHES || [];
  [['accMilieu', 'Milieu d\'un côté'], ['accPerp', 'Perpendiculaire'], ['accParcelle', 'Limites de parcelle']].forEach(([k, lib]) => {
    const l = L.find(x => x[0] === k);
    R.ok(D[k] === false && !!l && l[1] === lib && typeof l[2] === 'string' && l[2].length > 10 && A.indexOf(k) >= 0, 'clé ' + k + ' : ' + D[k]
      + ' dans AIDES_DEFAUT (attendu false), libellé ' + JSON.stringify(l ? l[1] : null) + ' et explication dans AIDES_LIB, puce de la palette : ' + (A.indexOf(k) >= 0 ? 'oui' : 'non'));
  });
  R.ok(['bati', 'parallele', 'angles'].every((k, i) => A[i] === k), 'palette : les puces de m111 restent en tête (' + A.join(', ') + ')');
  if (!G || typeof G.milieuSegs !== 'function' || typeof G.piedSegs !== 'function'){ R.ok(false, 'VCroquis.geo.milieuSegs ou piedSegs absente'); return; }
  const sud = [0, 0, 10, 0], est = [10, 0, 10, 6], nord = [0, 0.4, 10, 0.4], q = (f, att, n) => { const r = sur(f); R.ok(att ? proche(r, att) : r === null, n + ' → ' + (att ? ecrit(att) : 'aucun') + ' (obtenu ' + (r && r.x != null ? ecrit(r) : String(r)) + ')'); return r; };
  /* milieu */
  const m1 = q(() => G.milieuSegs(P(5.1, 0.2), [est, sud], 0.35), P(5, 0), 'milieu : point à 0,22 m du milieu de la façade sud, seuil 0,35 m');
  R.ok(!!m1 && m1.s === sud && Math.abs(m1.d - Math.hypot(0.1, 0.2)) < 1e-12, 'milieu : côté rendu (la façade sud) et distance (' + (m1 ? m1.d : '?') + ')');
  q(() => G.milieuSegs(P(5, 0.5), [sud, est], 0.35), null, 'milieu : point à 0,5 m, au-delà du seuil');
  q(() => G.milieuSegs(P(20.05, 0.05), [[20, 0, 20.2, 0]], 0.35), null, 'milieu : côté de 20 cm écarté');
  q(() => G.milieuSegs(P(20.15, 0.05), [[20, 0, 20.3, 0]], 0.35), P(20.15, 0), 'milieu : côté de 30 cm gardé');
  const m2 = sur(() => G.milieuSegs(P(5, 0.2), [sud, nord], 0.35)), m3 = sur(() => G.milieuSegs(P(5, 0.2), [nord, sud], 0.35));
  R.ok(!!m2 && m2.s === sud && !!m3 && m3.s === nord, 'milieu : deux milieux à égalité : le premier côté de la liste (' + ecrit(m2) + ', puis ' + ecrit(m3) + ')');
  q(() => G.milieuSegs(P(5, 0.15), [nord, sud], 0.35), P(5, 0), 'milieu : le plus proche des deux');
  /* perpendiculaire */
  const f1 = q(() => G.piedSegs(P(5, 0.2), P(5, 3), [est, sud], 0.25), P(5, 0), 'pied : depuis (5 ; 3), point à 0,2 m du pied sur la façade sud, seuil 0,25 m');
  R.ok(!!f1 && f1.s === sud, 'pied : côté rendu (la façade sud)');
  q(() => G.piedSegs(P(4.9, 0.15), P(5, 3), [sud], 0.25), P(5, 0), 'pied : point en biais, à 0,18 m du pied');
  q(() => G.piedSegs(P(5, 0.3), P(5, 3), [sud], 0.25), null, 'pied : point à 0,3 m, au-delà du seuil');
  q(() => G.piedSegs(P(12, 0.1), P(12, 3), [sud], 0.25), null, 'pied hors du côté (sur son prolongement)');
  q(() => G.piedSegs(P(10, 0.1), P(10, 3), [sud], 0.25), P(10, 0), 'pied au bout du côté (compris)');
  q(() => G.piedSegs(P(3.1, 0.1), P(3, 0), [sud], 0.25), null, 'pied : point précédent sur la droite du côté');
  q(() => G.piedSegs(P(5, 0.05), P(5, 0.15), [sud], 0.25), null, 'pied : point précédent à 15 cm du côté');
  q(() => G.piedSegs(P(5, 0.1), null, [sud], 0.25), null, 'pied : sans point précédent');
  /* le pied tombe dans le côté de 20 cm (en son milieu), à 0,1 m du point : seule la longueur l'écarte ; le côté de longueur nulle n'a pas
     de pied ; témoin : même cas, côté de 30 cm gardé */
  q(() => G.piedSegs(P(0.1, 0.1), P(0.1, 3), [[0, 0, 0.2, 0], [3, 0, 3, 0]], 0.25), null, 'pied : côtés de 20 cm au plus écartés (pied dans le côté de 20 cm, à 0,1 m du point)');
  q(() => G.piedSegs(P(0.1, 0.1), P(0.1, 3), [[0, 0, 0.3, 0]], 0.25), P(0.1, 0), 'pied : même cas, côté de 30 cm gardé');
  /* entrées invalides : null, sans exception */
  const bad = [() => G.milieuSegs(null, [sud], 1), () => G.milieuSegs(P(1, 1), null, 1), () => G.milieuSegs(P(1, 1), [sud], NaN), () => G.milieuSegs(P(NaN, 1), [sud], 1),
    () => G.milieuSegs(P(5, 0), [null, [1, 2], 'x', [0, 0, NaN, 0], {x: 1}], 1), () => G.piedSegs(P(5, 0), P(5, 3), [null, [0, 0, Infinity, 0]], 1), () => G.piedSegs(P(5, 0), {x: '5', y: 3}, [sud], 1),
    () => G.piedSegs(undefined, P(5, 3), [sud], 1), () => G.piedSegs(P(5, 0), P(5, 3), 'côtés', 1)];
  const res = bad.map(f => sur(f));
  R.ok(res.every(r => r === null), 'entrées invalides : null sans exception (' + res.map(r => r === null ? 'null' : String(r && r.x != null ? ecrit(r) : r)).join(', ') + ')');
}
if (!G || typeof G.placer !== 'function') R.ok(false, 'VCroquis.geo absent (fonctions de géométrie du plan)');
else { try { essais(); } catch (e){ R.ok(false, 'exception : ' + e.message + ' ' + (e.stack || '').split('\n')[1]); } }
if (!G || typeof G.lignesRef !== 'function' || typeof G.normaleExt !== 'function') R.ok(false, 'VCroquis.geo.lignesRef ou normaleExt absente (lignes de référence du plan)');
else { try { lignes(); } catch (e){ R.ok(false, 'exception : ' + e.message + ' ' + (e.stack || '').split('\n')[1]); } }
try { accrochages(); } catch (e){ R.ok(false, 'exception : ' + e.message + ' ' + (e.stack || '').split('\n')[1]); }
R.fin();
