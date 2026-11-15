// Générateur de croquis aléatoires fictifs (format abrégé de charger.js : doc()), reproductibles par une graine. Aucune donnée réelle.
// Le réseau va de haut en bas : appareils et ouvrages EP en haut, regards et équipements au milieu, collecteurs, exutoires ou extrémités
// libres en bas ; des tuyaux en plus font des boucles (tuyaux parallèles, by-pass), des arrivées libres et des branches en cul-de-sac.
'use strict';

/* Suite pseudo-aléatoire reproductible (mulberry32). */
function mkRnd(graine){
  let a = (graine >>> 0) || 1;
  return function(){ a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const SOURCES = ['wc', 'wc', 'lavabo', 'evier', 'douche', 'lavelinge', 'siphon_garage', 'descente', 'descente', 'grille', 'siphon_sol', 'siphon_cour', 'tropplein'];
const PASSAGES = ['regard', 'regard', 'regard', 'boite', 'fosse', 'jonction', 'te', 'regard_pub', 'clapet', 'pr'];
const EXUTOIRES = ['puisard', 'milieu', 'gargouille'];

/* o : maxS (sources), maxN (regards et équipements), maxC (collecteurs), pLoop (part de tuyaux en plus), pRes (part de tuyaux au réseau
   indiqué), pSens (part de tuyaux orientés), avp (statuts « Projet » et « À supprimer »), passages (types du milieu), exutoires (types
   des exutoires dessinés ; sans elle, EXUTOIRES : mêmes tirages, mêmes croquis qu'avant m118 ; « exutoire », l'autre destination, m128 :
   ses champs viennent d'une suite à part, voir destTiree ; sans « exutoire », aucun tirage de plus), drains (m124 : des drains ; sans
   elle, aucun tirage de plus : mêmes croquis qu'avant m124). */
function gen(graine, o){
  o = Object.assign({maxS: 3, maxN: 5, maxC: 2, pLoop: 0.5, pRes: 0.4, pSens: 0.25, avp: false, passages: PASSAGES, exutoires: EXUTOIRES, drains: false}, o || {});
  const rnd = mkRnd(graine * 7919 + 17), pick = a => a[Math.floor(rnd() * a.length)], ent = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  const objs = [], lignes = [], noeuds = [];
  let nl = 0;
  const res = () => rnd() < o.pRes ? pick(['EU', 'EU', 'EP', 'EP', 'UN']) : '';
  const sens = () => rnd() < o.pSens ? (rnd() < 0.8 ? 1 : -1) : 0;
  const stL = () => o.avp && rnd() < 0.3 ? pick(['projet', 'projet', 'supprimer']) : '';
  const stO = () => o.avp && rnd() < 0.12 ? pick(['projet', 'supprimer']) : undefined;
  function obj(n, t, x, y, p){ const pp = Object.assign({}, p || {}), st = stO(); if (st) pp.st = st; objs.push([n, t, x, y, pp]); return n; }
  /* props (7e champ, facultatif) : propriétés en plus du tracé, par exemple {drain: 'collecte'} */
  function ligne(t, r, v, s, st, props){ const id = (t === 'col' ? 'C' : 'L') + (++nl), l = [id, t, r, st || '', v, s || 0]; if (props) l.push(props); lignes.push(l); return id; }
  /* collecteurs (en bas), chacun avec des raccords ou regards publics posés dessus */
  const nC = ent(0, o.maxC), attaches = [];
  for (let c = 0; c < nC; c++){
    const y = -2 - 3 * c, pts = [], k = ent(1, 3);
    for (let i = 0; i < k; i++){ const x = -8 + i * 6 + ent(0, 2), t = rnd() < 0.7 ? 'jonction' : 'regard_pub'; const n = obj('j' + c + i, t, x, y, t === 'regard_pub' && rnd() < 0.3 ? {res: pick(['EU', 'EP'])} : {}); pts.push(n); attaches.push(n); }
    ligne('col', pick(['EU', 'EU', 'EP', 'UN']), [[-14, y]].concat(pts, [[14, y]]), 0, o.avp && rnd() < 0.15 ? 'projet' : '');
  }
  /* exutoires ; une autre destination tire ses champs d'une suite à part, créée à la première (m128) */
  const exus = []; let rx = null;
  if (rnd() < 0.35){ const k = ent(1, 2); for (let i = 0; i < k; i++){ const t = pick(o.exutoires); exus.push(obj('x' + i, t, 10 + 3 * i, 2, t === 'exutoire' ? destTiree(rx || (rx = mkRnd(graine * 6151 + 29)), objs) : {})); } }
  /* regards et équipements, du bas (indice 0) vers le haut */
  const nN = ent(0, o.maxN);
  for (let i = 0; i < nN; i++){
    const t = pick(o.passages), p = {};
    if (t === 'regard' || t === 'regard_pub') p.tampon = rnd() < 0.2 ? 'beton' : 'fonte';
    if (t === 'boite' || t === 'regard_pub') p.res = rnd() < 0.4 ? pick(['EU', 'EP']) : '';
    noeuds.push(obj('N' + i, t, ent(-8, 8), 3 + 2.5 * i, p));
  }
  /* sorties d'un nœud : vers un nœud plus bas, un collecteur, un exutoire ou une extrémité libre */
  function aval(i, x, y){
    const choix = [];
    for (let j = 0; j < i; j++) choix.push(noeuds[j]);
    attaches.forEach(a => choix.push(a)); exus.forEach(a => choix.push(a));
    if (!choix.length || rnd() < 0.25) return [x + ent(-3, 3), y - ent(2, 4)];
    return pick(choix);
  }
  const coude = v => rnd() < 0.2 ? [v[0], [ent(-10, 10), ent(0, 12)], v[1]] : v;
  noeuds.forEach((n, i) => {
    const k = rnd() < 0.8 ? 1 : 2;
    for (let j = 0; j < k; j++) ligne('tr', res(), coude([n, aval(i, 0, 3 + 2.5 * i)]), sens(), stL());
  });
  /* sources (en haut), chacune reliée à un nœud, à un collecteur ou laissée libre */
  const nS = ent(1, o.maxS);
  for (let s = 0; s < nS; s++){
    const t = pick(SOURCES), p = {};
    if (t === 'descente'){ p.visitable = pick(['oui', 'oui', 'non']); p.cote = pick(['avant', 'arriere']); }
    const n = obj('S' + s, t, -8 + 5 * s, 4 + 2.5 * nN, p);
    ligne('tr', res(), coude([n, aval(nN, -8 + 5 * s, 4 + 2.5 * nN)]), sens(), stL());
    if (rnd() < 0.15) ligne('tr', res(), [n, aval(nN, -8 + 5 * s, 4 + 2.5 * nN)], sens(), stL());
  }
  /* boucles : tuyaux en plus entre deux nœuds (parallèles, by-pass), arrivées libres, branches en cul-de-sac */
  const nBoucle = Math.round(o.pLoop * (nN + 1) * rnd() * 2);
  for (let b = 0; b < nBoucle && noeuds.length; b++){
    const i = ent(0, noeuds.length - 1), j = ent(0, noeuds.length - 1), u = rnd();
    if (u < 0.6 && i !== j) ligne('tr', res(), coude([noeuds[Math.max(i, j)], noeuds[Math.min(i, j)]]), sens(), stL());
    else if (u < 0.8) ligne('tr', res(), [[ent(-12, 12), 4 + 2.5 * i], noeuds[i]], sens(), stL());
    else ligne('tr', res(), [noeuds[i], [ent(-12, 12), 2.5 * i]], sens(), stL());
  }
  if (o.drains) drains(graine, o, objs, lignes, noeuds, attaches, exus, ligne);
  return {o: objs, l: lignes};
}
/* Drains (m124, option drains) : une suite de tirages à part, tirée après le reste du croquis, qui ne change donc rien au reste. Des
   tronçons tirés deviennent des drains (sommets et sens gardés) : de collecte, le plus souvent en EP, ou d'infiltration, le plus souvent
   sans réseau. Des drains neufs passent par un nœud du milieu : un regard ou un équipement déjà tiré, ou un raccord neuf d'où part un
   tuyau vers l'aval (nœud plus bas, collecteur, exutoire ou extrémité libre) ; d'autres sont libres. Ils sont orientés ou non (sens du
   tracé, ou à l'envers), avec les statuts de l'avant-projet. Un point « Drain » est parfois posé sur le premier sommet libre d'un drain
   de collecte : un bout, ou un coude au milieu du drain (le point compte alors à la place du drain). */
function drains(graine, o, objs, lignes, noeuds, attaches, exus, ligne){
  const r = mkRnd(graine * 104729 + 3), pick = a => a[Math.floor(r() * a.length)], ent = (a, b) => a + Math.floor(r() * (b - a + 1));
  const pos = id => objs.find(q => q[0] === id);
  const sorte = () => r() < 0.6 ? 'collecte' : 'infiltration';
  const res = s => s === 'collecte' ? (r() < 0.6 ? 'EP' : pick(['', '', 'EU', 'UN'])) : (r() < 0.7 ? '' : pick(['EP', 'EU']));
  const sens = () => r() < 0.4 ? (r() < 0.5 ? 1 : -1) : 0;
  const stL = () => o.avp && r() < 0.3 ? pick(['projet', 'projet', 'supprimer']) : '';
  lignes.forEach(l => { if (l[1] === 'tr' && r() < 0.25){ const s = sorte(); l[2] = res(s); l[6] = Object.assign({}, l[6] || {}, {drain: s}); } });
  const aval = (x, y) => {
    const choix = noeuds.filter(n => pos(n)[3] < y).concat(attaches, exus);
    return !choix.length || r() < 0.25 ? [x + ent(-3, 3), y - ent(2, 4)] : pick(choix);
  };
  const nM = ent(0, 2);
  for (let k = 0; k < nM; k++){
    const s = sorte(); let m, x, y;
    if (noeuds.length && r() < 0.6){ m = pick(noeuds); x = pos(m)[2]; y = pos(m)[3]; }
    else { x = ent(-10, 10); y = ent(1, 12) + 0.5; m = 'Jd' + k; objs.push([m, 'jonction', x, y, {}]); ligne('tr', r() < 0.5 ? 'EP' : '', [m, aval(x, y)], sens(), stL()); }
    const v = [[x - ent(2, 4), y + ent(0, 2) / 2], m, [x + ent(2, 4), y + ent(0, 2) / 2]];
    ligne('tr', res(s), r() < 0.5 ? v : v.reverse(), sens(), stL(), {drain: s});
  }
  if (r() < 0.5){ const s = sorte(), x = ent(-12, 8), y = ent(0, 14); ligne('tr', res(s), [[x, y], [x + ent(2, 5), y + ent(-2, 2)]], sens(), stL(), {drain: s}); }
  /* point « Drain » : sur le premier sommet libre, un bout ou un coude (tronçon tiré parti d'un nœud, puis coudé) */
  lignes.forEach(l => {
    if (!(l[6] && l[6].drain === 'collecte') || r() >= 0.15) return;
    const i = l[4].findIndex(q => typeof q !== 'string'); if (i < 0) return;
    const id = 'pd' + l[0], q = l[4][i]; objs.push([id, 'drain', q[0], q[1], l[3] ? {st: l[3]} : {}]); l[4][i] = id;
  });
}

/* Autre destination (m128, option exutoires avec « exutoire ») : champs tirés de la suite r, à part, qui ne change donc rien au reste du
   croquis. Nom fictif, parfois absent (« Autre destination ») ; abréviation parfois absente, de longueur fausse ou illisible au PDF ;
   article, jugement des EP et case du constat parmi les valeurs permises, parfois un texte inconnu de cette version (comme d'une tablette
   plus récente : lu par les replis de destDe). Parfois les mêmes champs qu'une autre destination du croquis (même rejet). */
const DEST_NOMS = ['Étang', 'étang', 'Fossé', 'Mare', 'Noue', 'Bassin d\'orage', 'Cours d\'eau'];
const DEST_ABS = ['Ét', 'Fo', 'Ma', 'No', 'BO', 'CE', 'ét1'], DEST_ILLISIBLES = ['ΩΩ', '\u{1F4A7}', 'ΩΩΩ', 'Ω\u{1F4A7}'], DEST_LONGS = ['X', 'ABCD', ''];
function destTiree(r, objs){
  const pick = a => a[Math.floor(r() * a.length)], p = {}, deja = objs.filter(q => q[1] === 'exutoire');
  if (deja.length && r() < 0.3){ ['nom', 'ab', 'art', 'ep', 'cst'].forEach(k => { if (k in deja[0][4]) p[k] = deja[0][4][k]; }); return p; }
  if (r() < 0.9) p.nom = pick(DEST_NOMS);
  const u = r();
  if (u < 0.4) p.ab = pick(DEST_ABS); else if (u < 0.6) p.ab = pick(DEST_ILLISIBLES); else if (u < 0.7) p.ab = pick(DEST_LONGS);
  if (r() < 0.9) p.art = r() < 0.92 ? pick(['le', 'la', 'l\'']) : 'les';
  if (r() < 0.95) p.ep = r() < 0.92 ? pick(['conforme', 'reserve', 'nc', 'arbitrer']) : 'nc-futur';
  if (r() < 0.95) p.cst = r() < 0.92 ? pick(['MILIEU', 'GARG', 'puisard', 'recup', 'infil', 'autre']) : 'fosse-futur';
  return p;
}

/* Résumé lisible d'un croquis généré, pour les messages ; un drain est marqué (drain collecte) ou (drain infiltration). */
function fmt(spec){
  return spec.o.map(o => o[0] + ':' + o[1] + (o[4] && o[4].st ? '[' + o[4].st + ']' : '')).join(' ') + ' ; ' + spec.l.map(l => l[0] + (l[1] === 'col' ? '(col ' + l[2] + ')' : (l[2] ? '[' + l[2] + ']' : '') + (l[5] ? (l[5] > 0 ? '>' : '<') : '') + (l[3] ? '{' + l[3] + '}' : '') + (l[6] && l[6].drain ? '(drain ' + l[6].drain + ')' : '')) + '=' + l[4].map(q => typeof q === 'string' ? q : '·').join('-')).join(' ');
}

module.exports = {mkRnd, gen, fmt, SOURCES, PASSAGES, EXUTOIRES};
