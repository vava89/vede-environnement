// Fosse septique désignée, comparée à un oracle par force brute (sans navigateur ; croquis aléatoires fictifs, 12 rue Fictive,
// Ville-Exemple) : un WC, des regards et des fosses reliés par des tuyaux droits (quelques-uns orientés), une ou deux boîtes EU.
// Règle du 6 novembre 2026 : une fosse compte quand l'eau ne peut pas l'éviter (elle est sur tout chemin vers chaque exutoire) ; sinon,
// quand l'eau ne peut éviter toutes les fosses à la fois (fosses en parallèle), une fosse d'un chemin qui en traverse le moins ; la plus
// éloignée de la source d'abord, puis l'ordre des noms. L'oracle énumère les chemins simples (un exutoire n'est pas traversé, un tronçon
// orienté ne se remonte pas) et doit désigner la même fosse que l'analyse.
// usage : node tests/vm/fosse-oracle.js [n=3000] [graine=7] [-v] [--app=<dossier>]
'use strict';
const {charger, doc, copie, rapport} = require('./charger.js');
const {V} = charger(), R = rapport('fosse-oracle');
const args = process.argv.slice(2).filter(x => !/^-/.test(x)), N = +(args[0] || 3000);
let graine = +(args[1] || 7);
const rnd = () => { graine = (Math.imul(graine, 1103515245) + 12345) >>> 0; return graine / 4294967296; };

/* croquis aléatoire : ids, types, tuyaux [a, b, sens] (sens 1 : de a vers b ; -1 : de b vers a) */
function croquis(){
  const typ = {s: 'wc'}, o = [['s', 'wc', 0, 20]], ids = ['s'];
  const ajoute = (id, t, x, y, p) => { ids.push(id); typ[id] = t; o.push([id, t, x, y, p]); };
  const nR = 3 + Math.floor(rnd() * 4), nF = 1 + Math.floor(rnd() * 4), nB = 1 + Math.floor(rnd() * 2);
  for (let i = 0; i < nR; i++) ajoute('R' + i, 'regard', rnd() * 20, rnd() * 18);
  for (let i = 0; i < nF; i++) ajoute('F' + i, 'fosse', rnd() * 20, rnd() * 18);
  for (let i = 0; i < nB; i++) ajoute('B' + i, 'boite', rnd() * 20, -2 - i, {res: 'EU'});
  const E = [['s', 'R0', 0]], vu = {'s|R0': true}, nE = ids.length + Math.floor(rnd() * ids.length);
  for (let k = 1; k < nE; k++){
    const a = ids[1 + Math.floor(rnd() * (ids.length - 1))], b = ids[1 + Math.floor(rnd() * (ids.length - 1))];
    if (a === b || vu[a + '|' + b] || vu[b + '|' + a] || (typ[a] === 'boite' && typ[b] === 'boite')) continue;
    vu[a + '|' + b] = true; E.push([a, b, rnd() < 0.15 ? (rnd() < 0.5 ? 1 : -1) : 0]);
  }
  return {typ, ids, E, d: doc({o, l: E.map(([a, b, s], k) => ['L' + k, 'tr', '', '', [a, b], s])})};
}

/* fosse désignée d'après tous les chemins simples du WC vers les boîtes ; null : l'eau peut éviter toutes les fosses (ou aucune boîte) */
function oracle({typ, ids, E}){
  const term = n => typ[n] === 'boite', estF = n => typ[n] === 'fosse';
  const suiv = n => { if (n !== 's' && term(n)) return []; const out = []; E.forEach(([a, b, s]) => { if (a === n && s !== -1) out.push(b); if (b === n && s !== 1) out.push(a); }); return out; };
  const atteint = sauf => { const v = {s: true}, f = ['s']; while (f.length){ const n = f.shift(); suiv(n).forEach(u => { if (!v[u] && u !== sauf){ v[u] = true; f.push(u); } }); } return v; };
  const tous = atteint(null), cibles = ids.filter(n => term(n) && tous[n]); if (!cibles.length) return {sans: true};
  const dist = {s: 0}, f = ['s']; while (f.length){ const n = f.shift(); suiv(n).forEach(u => { if (dist[u] === undefined){ dist[u] = dist[n] + 1; f.push(u); } }); }
  const tri = a => a.sort((x, y) => (dist[y] - dist[x]) || (x < y ? -1 : x > y ? 1 : 0))[0] || null;
  const fosses = ids.filter(n => estF(n) && tous[n]);
  /* sur tout chemin vers chaque boîte : sans elle, aucune boîte n'est atteinte */
  const partout = fosses.filter(x => { const v = atteint(x); return cibles.every(t => !v[t]); });
  if (partout.length) return {fosse: tri(partout)};
  let kmin = Infinity, sur = {};
  (function dfs(n, vu, k, pile){
    if (n !== 's' && term(n)){ if (k < kmin){ kmin = k; sur = {}; } if (k === kmin) pile.forEach(x => { if (estF(x)) sur[x] = true; }); return; }
    suiv(n).forEach(u => { if (vu[u]) return; vu[u] = true; pile.push(u); dfs(u, vu, k + (estF(u) ? 1 : 0), pile); pile.pop(); delete vu[u]; });
  })('s', {s: true}, 0, []);
  return kmin >= 1 && kmin < Infinity ? {fosse: tri(Object.keys(sur)), repli: true} : {fosse: null};
}

let vus = 0, replis = 0, ecarts = [];
for (let i = 0; i < N; i++){
  const g = croquis(), an = V.analyser(copie(g.d), 'edl'), r = an.resObj.s;
  if (!r || r.etat !== 'ok') continue;
  const att = oracle(g); if (att.sans) continue;
  vus++; if (att.repli) replis++;
  if ((r.fosse || null) !== att.fosse) ecarts.push('croquis ' + i + ' : analyse ' + r.fosse + ', oracle ' + att.fosse + ' ; tuyaux ' + JSON.stringify(g.E));
}
R.ok(!ecarts.length, 'fosse désignée identique à l\'oracle sur ' + vus + ' croquis' + (ecarts.length ? ' : ' + ecarts.length + ' écarts, dont ' + ecarts.slice(0, 3).join(' | ') : ''));
R.ok(replis >= 20, 'fosses en parallèle (l\'eau ne peut les éviter toutes à la fois) : ' + replis + ' croquis');
R.fin();
