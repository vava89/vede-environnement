// Garde de compatibilité à valeurs figées (m98 ; décision D10 de .claude/conception-outils-dessin.md). Un croquis fait sans les champs du lot
// « Outils de dessin » garde les sorties du module de 1e27c7b (v1.7.0, m97) : analyse (état des lieux et avant-projet : réseau, pièces,
// sens, anomalies, contrôles, conclusion), texte d'étiquette de chaque objet et DXF écrit par le module (entités ; en-tête, tables et blocs).
// Croquis, tous fictifs : la démonstration (VCroquis.demoCroquis) ; un croquis fixe qui complète (traits « Complément du fond », texte libre,
// zone, étiquette personnalisée, étiquette déplacée ou masquée, anomalie saisie à la main, échelle, origine et rotation données), puis le même
// dans un fond en millimètres et en miles (u = 0,001 et 1609,344 : le DXF divise par u et règle ses décimales sur u) ; un croquis fixe des
// types que les autres ne posent pas (salle de bain, baignoire, cuisine, lave-vaisselle, chaudière, attente, drain, caniveau et clapet
// orientés) ; 30 croquis du générateur (vm/generateur.js, graines 1 à 30, réglages d'aleatoire.js, étiquettes placées d'office).
// Dans vm/compat.json, par croquis : une empreinte sha256 (16 premiers caractères) du croquis d'entrée (« entree ») et une par sortie.
// La garde passe sur 1e27c7b et doit passer après chaque correctif du lot.
// usage : node tests/vm/compat.js [-v] [--app=<dossier>] [--detail=<dossier>] [--regenerer[=<origine>]]
//   --detail=<dossier> : écrit chaque sortie en clair (<croquis>.<sortie>.txt) ; lancé sur deux versions, « diff -r » montre l'écart.
//   --regenerer[=<origine>] : réécrit vm/compat.json avec la version lue et liste ce qui change ; l'origine est gardée dans le fichier
//   (par défaut : le dossier lu et la date). Seulement sur décision, car une empreinte qui change veut dire qu'un croquis déjà fait sort
//   autrement (analyse, étiquette ou DXF). Et sur la bonne version :
//   - le test change (générateur partagé avec aleatoire.js, croquis fixes, sorties gardées) : régénérer sur une copie de 1e27c7b, sinon
//     on fige aussi les écarts entrés depuis. Par exemple, depuis la racine du dépôt :
//       mkdir <dossier> && git archive 1e27c7b | tar -x -C <dossier>
//       node tests/vm/compat.js --app=<dossier> --regenerer="1e27c7b (v1.7.0, m97)"
//   - une sortie doit changer (décision) : régénérer sur la nouvelle version, le correctif pour origine (--regenerer="m1xx : …").
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const {charger, doc, copie, rapport} = require('./charger.js');
const Gen = require('./generateur.js');
const {V, ctx, dir} = charger(), R = rapport('compat');
const FICHIER = path.join(__dirname, 'compat.json');
const option = n => { const a = process.argv.find(x => x === '--' + n || x.indexOf('--' + n + '=') === 0); return a == null ? null : a.indexOf('=') > 0 ? a.slice(a.indexOf('=') + 1) : true; };
const SORTIES = ['analyse-edl', 'analyse-avp', 'etiquettes', 'dxf-entites', 'dxf-tables'];

/* Croquis de démonstration. Le module tire ses identifiants au hasard (uid) : le tirage est figé pendant la création, puis les identifiants
   sont renommés d1, d2… dans l'ordre du dessin (les sorties n'en dépendent pas : seule l'empreinte de l'analyse les cite). */
function demo(){
  const M = ctx.Math, D = ctx.Date, T0 = Date.UTC(2026, 10, 1);
  let s = 98;
  const m = Object.create(Math); m.random = () => { s = (Math.imul(s, 1103515245) + 12345) >>> 0; return s / 4294967296; };
  class Df extends Date { constructor(...a){ if (a.length) super(...a); else super(T0); } static now(){ return T0; } }
  ctx.Math = m; ctx.Date = Df;
  let d;
  try { d = copie(V.demoCroquis(null)); } finally { ctx.Math = M; ctx.Date = D; }
  const nom = {};
  d.el.forEach((e, i) => { nom[e.id] = 'd' + (i + 1); e.id = nom[e.id]; });
  d.el.forEach(e => { if (e.k === 'ln') e.v.forEach(v => { if (v.a) v.a = nom[v.a] || v.a; }); });
  d.id = 'demo';
  return d;
}

/* Croquis fixe qui complète la démonstration et le générateur */
function complement(){
  const d = doc({
    o: [['W', 'wc', 1, 8, {niv: 'etage'}], ['Lv', 'lavabo', 4, 8, {niv: 'rdc'}], ['De', 'descente', -0.5, 5, {visitable: 'non', cote: 'arriere'}],
      ['R1', 'regard', 2, 4, {dim: '50×50', prof: '1,20', tampon: 'beton'}], ['B1', 'boite', 2, 1, {res: 'EU', dim: '40×40', etiq: 'Boîte EU\nsous le portail'}],
      ['Rp', 'regard_pub', 2, -2, {res: 'EU'}], ['Pr', 'pr', 7, 3, {fn: 'cave'}], ['Ss', 'siphon_sol', 7, 6], ['Zo', 'zone', 6, 9, {r: 2, obs: 'Zone humide'}],
      ['Te', 'test', 5, 5, {meth: ['fluo'], resultat: 'colorant au regard'}]],
    l: [['L1', 'tr', '', 'presume', ['W', 'R1']], ['L2', 'tr', 'EU', '', ['Lv', [4, 4], 'R1']], ['L3', 'tr', '', '', ['De', [-0.5, 1], 'B1']],
      ['L4', 'tr', '', '', ['R1', 'B1'], 1], ['L5', 'tr', '', '', ['B1', 'Rp']], ['C1', 'col', 'EU', '', [[-6, -2], 'Rp', [12, -2]]],
      ['L6', 'tr', '', 'projet', ['Ss', [7, 1], 'B1']], ['L7', 'tr', 'EP', 'supprimer', ['Pr', [7, 4], 'R1']]]});
  const el = id => d.el.find(e => e.id === id), lim = (id, pts) => ({id, k: 'ln', t: 'lim', v: pts.map(([x, y]) => ({x, y, a: null})), p: {st: 'existant'}, lab: null});
  Object.assign(el('L2').p, {diam: '100', mat: 'PVC', long: '4,5', pose: 'aerien'});
  Object.assign(el('L4').p, {diam: '125', mat: 'gres', pose: 'encorbellement'});
  el('C1').p.diam = '200';
  d.el.push(lim('M1', [[-1, 6], [9, 6], [9, 10], [-1, 10], [-1, 6]]), lim('M2', [[-4, -0.5], [12, -0.5]]));
  d.el.push({id: 'X1', k: 'tx', x: 3, y: 12, txt: 'Jardin fictif', taille: 3});
  d.el.forEach(e => { if (e.k !== 'tx') e.lab = null; });
  el('W').lab = {dx: 3, dy: 2}; el('Te').lab = {off: true};
  d.anomManu = [{id: 'm1', objId: 'Lv', reseau: 'EU', obs: 'Lavabo : écoulement lent (anomalie fictive)', preco: 'Vérifier le siphon', nc: false, st: 'retenue'}];
  Object.assign(d, {id: 'complement', rot: 0.35, origine: {x: 1000, y: 2000}, echelle: 200});
  return d;
}
/* Le même dans un fond d'une autre unité (u : mètres par unité du fichier ; origine dans l'unité du fichier) */
function unite(id, u, origine){ return Object.assign(complement(), {id, u, origine}); }

/* Croquis fixe des types que ni la démonstration, ni le croquis qui complète, ni le générateur ne posent ; caniveau et clapet orientés
   (p.a en degrés, écrit dans l'INSERT du DXF), étiquettes placées d'office (le rayon du symbole du caniveau compte) */
function types(){
  const d = doc({
    o: [['Sb', 'sdb', 1, 9, {niv: 'etage'}], ['Ba', 'baignoire', 3, 9], ['Cu', 'cuisine', 5, 9, {niv: 'rdc'}], ['Lv', 'lavevaisselle', 7, 9],
      ['Ch', 'chaudiere', 9, 9, {obs: 'Purge fictive'}], ['At', 'attente', 11, 9], ['R1', 'regard', 6, 5, {dim: '40×40'}], ['Cl', 'clapet', 6, 3, {a: 270}],
      ['B1', 'boite', 6, 1, {res: 'EU'}], ['Rp', 'regard_pub', 6, -2, {res: 'EU'}], ['Ca', 'caniveau', 13, 3, {a: 30}], ['Dr', 'drain', 13, 7],
      ['Pu', 'puisard', 16, 3]],
    l: [['L1', 'tr', 'EU', '', ['Sb', [1, 5], 'R1']], ['L2', 'tr', '', '', ['Ba', [3, 6], 'R1']], ['L3', 'tr', 'EU', 'presume', ['Cu', 'R1']],
      ['L4', 'tr', '', '', ['Lv', [7, 6], 'R1']], ['L5', 'tr', '', '', ['Ch', [9, 6], 'R1']], ['L6', 'tr', '', 'projet', ['At', [11, 5], 'R1']],
      ['L7', 'tr', 'EU', '', ['R1', 'Cl'], 1], ['L8', 'tr', 'EU', '', ['Cl', 'B1'], 1], ['L9', 'tr', '', '', ['B1', 'Rp']],
      ['C1', 'col', 'EU', '', [[-4, -2], 'Rp', [16, -2]]], ['L10', 'tr', 'EP', '', ['Ca', 'Pu']], ['L11', 'tr', '', '', ['Dr', [16, 7], 'Pu']]]});
  d.el.forEach(e => { e.lab = null; });
  Object.assign(d, {id: 'types', rot: -0.6});
  return d;
}

/* Croquis du générateur (réglages d'aleatoire.js), étiquettes placées d'office par le module */
function genere(g){
  const avp = g % 3 === 0, d = doc(Gen.gen(g, {avp, pLoop: (g % 10) / 10, maxN: 2 + g % 7, maxS: 1 + g % 4, maxC: g % 3}));
  d.el.forEach(e => { e.lab = null; });
  d.id = 'gen-' + g;
  return d;
}

/* Écriture stable d'une valeur : clés triées, élément du croquis désigné par « #id », boucle coupée */
function canon(v, els, pile){
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'number') return isFinite(v) ? String(v) : '"' + v + '"';
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'boolean') return String(v);
  if (typeof v === 'function') return '"(fonction)"';
  if (els.has(v)) return '"#' + v.id + '"';
  if (pile.indexOf(v) >= 0) return '"(boucle)"';
  pile.push(v);
  const s = Array.isArray(v) ? '[' + v.map(x => canon(x, els, pile)).join(',') + ']'
    : '{' + Object.keys(v).sort().filter(k => v[k] !== undefined).map(k => JSON.stringify(k) + ':' + canon(v[k], els, pile)).join(',') + '}';
  pile.pop();
  return s;
}

/* Sorties du module pour un croquis, chacune sur une copie neuve (anomaliesDoc complète doc.ordre) */
function sorties(d0){
  const o = {};
  ['edl', 'avp'].forEach(mode => {
    const d = copie(d0), an = V.analyser(d, mode), L = V.anomaliesDoc(d, an);
    o['analyse-' + mode] = canon({analyse: an, anomalies: L, conclusion: V.conclusion(L, an)}, new Set(d.el), []);
  });
  const d = copie(d0), anE = V.analyser(d, 'edl'), anA = V.analyser(d, 'avp');
  o.etiquettes = d.el.map(e => e.id + '\t' + JSON.stringify(V.texteEtiquette(e, anE)) + '\t' + JSON.stringify(V.texteEtiquette(e, anA))).join('\n');
  const x = Buffer.from(V.ecrireDxf(copie(d0))).toString('latin1'), i = x.indexOf('  0\r\nSECTION\r\n  2\r\nENTITIES\r\n');
  o['dxf-entites'] = i >= 0 ? x.slice(i) : '(section ENTITIES absente)';
  o['dxf-tables'] = i >= 0 ? x.slice(0, i) : x;
  return o;
}
const empreinte = s => crypto.createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 16);

const croquis = [demo(), complement(), unite('complement-mm', 0.001, {x: 1000000, y: 2000000}), unite('complement-mi', 1609.344, {x: 0.6, y: 1.2}), types()];
for (let g = 1; g <= 30; g++) croquis.push(genere(g));
const obtenu = {}, detail = option('detail');
if (detail && detail !== true) fs.mkdirSync(path.resolve(detail), {recursive: true});
croquis.forEach(d => {
  /* empreinte du croquis d'entrée, prise avant les sorties : elle change si c'est le test (ou la démonstration) qui change */
  const entree = empreinte(canon(d, new Set(), []));
  let s;
  try { s = sorties(d); } catch (e){ R.ok(false, 'croquis ' + d.id + ' : exception ' + e.message + ' ' + (e.stack || '').split('\n')[1]); return; }
  obtenu[d.id] = {entree};
  SORTIES.forEach(k => {
    obtenu[d.id][k] = empreinte(s[k]);
    if (detail && detail !== true) fs.writeFileSync(path.join(path.resolve(detail), d.id + '.' + k + '.txt'), s[k]);
  });
});

const regen = option('regenerer'), depot = path.resolve(dir) === path.resolve(__dirname, '..', '..');
if (regen){
  if (depot) R.info('attention : --regenerer lit le dépôt lui-même ; si c\'est le test qui a changé, régénérer sur une copie de 1e27c7b (--app=<dossier>, voir l\'en-tête)');
  /* écarts avec les valeurs en place, pour la trace de la décision */
  let avant = {};
  try { avant = JSON.parse(fs.readFileSync(FICHIER, 'utf8')).empreintes || {}; } catch (e){ avant = {}; }
  Object.keys(obtenu).forEach(id => ['entree'].concat(SORTIES).forEach(k => {
    if (avant[id] && k in avant[id] && avant[id][k] !== obtenu[id][k]) R.info('change : croquis ' + id + ', ' + (k === 'entree' ? 'croquis d\'entrée' : 'sortie ' + k));
  }));
  Object.keys(obtenu).filter(id => !avant[id]).forEach(id => R.info('nouveau : croquis ' + id));
  const lignes = Object.keys(obtenu).map(id => '    ' + JSON.stringify(id) + ': ' + JSON.stringify(obtenu[id]));
  /* origine par défaut : le dossier lu (son nom seulement, sans chemin de la machine) et la date */
  const lu = depot ? 'version lue dans le dépôt' : 'version lue dans « ' + path.basename(path.resolve(dir)) + ' »';
  fs.writeFileSync(FICHIER, '{\n  "origine": ' + JSON.stringify(regen === true ? lu + ' le ' + new Date().toISOString().slice(0, 10) : regen)
    + ',\n  "empreintes": {\n' + lignes.join(',\n') + '\n  }\n}\n');
  console.log('compat : ' + path.relative(process.cwd(), FICHIER) + ' réécrit (' + Object.keys(obtenu).length + ' croquis, version lue : ' + dir + ')');
  R.ok(Object.keys(obtenu).length === croquis.length, 'empreintes réécrites pour les ' + croquis.length + ' croquis');
} else {
  let fige = null;
  try { fige = JSON.parse(fs.readFileSync(FICHIER, 'utf8')).empreintes; } catch (e){ R.ok(false, 'valeurs figées illisibles (' + FICHIER + ') : ' + e.message); }
  if (fige){
    let ecarts = 0;
    croquis.forEach(d => {
      if (!obtenu[d.id]) return;
      if (!fige[d.id]){ R.ok(false, 'croquis ' + d.id + ' : aucune valeur figée'); ecarts++; return; }
      /* croquis d'entrée changé : les sorties ne se comparent plus à celles de 1e27c7b */
      const memeEntree = fige[d.id].entree === obtenu[d.id].entree;
      if (!memeEntree) ecarts++;
      R.ok(memeEntree, 'croquis ' + d.id + ', croquis d\'entrée' + (memeEntree ? ' : identique' : ' : changé (figé ' + fige[d.id].entree + ', obtenu ' + obtenu[d.id].entree
        + ') ; si c\'est le test qui a changé (générateur, croquis fixe), régénérer sur une copie de 1e27c7b (--app=<dossier>, voir l\'en-tête)'));
      SORTIES.forEach(k => {
        const bon = fige[d.id][k] === obtenu[d.id][k];
        if (!bon) ecarts++;
        R.ok(bon, 'croquis ' + d.id + ', sortie ' + k + (bon ? ' : identique' : ' : diffère (figée ' + fige[d.id][k] + ', obtenue ' + obtenu[d.id][k] + ')'));
      });
    });
    Object.keys(fige).filter(id => !croquis.some(d => d.id === id)).forEach(id => { R.ok(false, 'croquis ' + id + ' : figé mais plus calculé'); ecarts++; });
    if (ecarts) R.info('Pour voir l\'écart : node tests/vm/compat.js --detail=<dossier> sur les deux versions (--app=<dossier> pour l\'ancienne), puis diff -r.');
  }
}
R.fin();
