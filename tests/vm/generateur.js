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
   des exutoires dessinés ; sans elle, EXUTOIRES : mêmes tirages, mêmes croquis qu'avant m118). */
function gen(graine, o){
  o = Object.assign({maxS: 3, maxN: 5, maxC: 2, pLoop: 0.5, pRes: 0.4, pSens: 0.25, avp: false, passages: PASSAGES, exutoires: EXUTOIRES}, o || {});
  const rnd = mkRnd(graine * 7919 + 17), pick = a => a[Math.floor(rnd() * a.length)], ent = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  const objs = [], lignes = [], noeuds = [];
  let nl = 0;
  const res = () => rnd() < o.pRes ? pick(['EU', 'EU', 'EP', 'EP', 'UN']) : '';
  const sens = () => rnd() < o.pSens ? (rnd() < 0.8 ? 1 : -1) : 0;
  const stL = () => o.avp && rnd() < 0.3 ? pick(['projet', 'projet', 'supprimer']) : '';
  const stO = () => o.avp && rnd() < 0.12 ? pick(['projet', 'supprimer']) : undefined;
  function obj(n, t, x, y, p){ const pp = Object.assign({}, p || {}), st = stO(); if (st) pp.st = st; objs.push([n, t, x, y, pp]); return n; }
  function ligne(t, r, v, s, st){ const id = (t === 'col' ? 'C' : 'L') + (++nl); lignes.push([id, t, r, st || '', v, s || 0]); return id; }
  /* collecteurs (en bas), chacun avec des raccords ou regards publics posés dessus */
  const nC = ent(0, o.maxC), attaches = [];
  for (let c = 0; c < nC; c++){
    const y = -2 - 3 * c, pts = [], k = ent(1, 3);
    for (let i = 0; i < k; i++){ const x = -8 + i * 6 + ent(0, 2), t = rnd() < 0.7 ? 'jonction' : 'regard_pub'; const n = obj('j' + c + i, t, x, y, t === 'regard_pub' && rnd() < 0.3 ? {res: pick(['EU', 'EP'])} : {}); pts.push(n); attaches.push(n); }
    ligne('col', pick(['EU', 'EU', 'EP', 'UN']), [[-14, y]].concat(pts, [[14, y]]), 0, o.avp && rnd() < 0.15 ? 'projet' : '');
  }
  /* exutoires */
  const exus = [];
  if (rnd() < 0.35){ const k = ent(1, 2); for (let i = 0; i < k; i++) exus.push(obj('x' + i, pick(o.exutoires), 10 + 3 * i, 2, {})); }
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
  return {o: objs, l: lignes};
}

/* Résumé lisible d'un croquis généré, pour les messages. */
function fmt(spec){
  return spec.o.map(o => o[0] + ':' + o[1] + (o[4] && o[4].st ? '[' + o[4].st + ']' : '')).join(' ') + ' ; ' + spec.l.map(l => l[0] + (l[1] === 'col' ? '(col ' + l[2] + ')' : (l[2] ? '[' + l[2] + ']' : '') + (l[5] ? (l[5] > 0 ? '>' : '<') : '') + (l[3] ? '{' + l[3] + '}' : '')) + '=' + l[4].map(q => typeof q === 'string' ? q : '·').join('-')).join(' ');
}

module.exports = {mkRnd, gen, fmt, SOURCES, PASSAGES, EXUTOIRES};
