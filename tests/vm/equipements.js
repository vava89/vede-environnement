// Lot « Équipements » (souhaits 7, 8, 15 et 18 ; `.claude/conception-equipements.md`), sans navigateur. Croquis fictifs (12 rue Fictive,
// Ville-Exemple), objets sans tuyau sauf mention.
// m130, niveau d'étage précis (souhait 15 ; décisions D1, D2 et D5) : p.niv garde ses trois codes ('ss', 'rdc', 'etage') ; p.etage ('1' à
// '99', ou 'combles') précise l'étage et ne se lit que si niv vaut 'etage'. VCroquis.libNiv(e) : « sous-sol », « RDC », « 1er étage »,
// « 2e étage »…, « combles », « étage » pour un 'etage' sans numéro (croquis d'avant m130) ou au numéro illisible ; '' pour un code inconnu.
// n1 : étiquette (texteEtiquette) d'un WC au 1er étage : « WC (1er étage) » ; de même « WC (2e étage) », « WC (3e étage) », « WC (12e
//   étage) », « WC (combles) » ; « Projet : WC (1er étage) » ; descente non visitable au 2e : le niveau après « non visitable », comme
//   avant ; témoins : « WC (étage) » sans numéro ou avec un numéro illisible ('0', '100', 'abc', '05', '', le nombre 2), « WC (RDC) »,
//   « Lavabo (sous-sol) », un étage laissé par une version d'avant ignoré tant que niv n'est pas 'etage' (« WC (RDC) » ; un WC sans
//   niveau reste sans étiquette), l'étiquette personnalisée l'emporte : ces textes par texteEtiquette seul. « WC (1er étage) » et
//   « Lavabo (combles) » aussi à l'écran (canevas factice, 40 px par mètre), au plan PDF et en TEXT du DXF (calque VEDE-ETIQUETTES), trois
//   rendus qui lisent texteEtiquette.
// n2 : code de niveau inconnu (croquis altéré, ou d'une version plus récente) : « Lavabo », sans « (undefined) » ; un WC n'a alors pas
//   d'étiquette ; un code qui est le nom d'une propriété des objets du langage ('constructor', 'toString') de même, ou la valeur d'une
//   puce de la fiche ('etage:2', jamais écrite dans niv) ; à l'écran, au plan PDF et au DXF, aucun « undefined ».
// n3 : page 2 du plan PDF, colonne Niveau du tableau des équipements : « 1er étage », « 2e étage », « combles », « étage », « sous-sol »,
//   « RDC », vide sans niveau et pour un code inconnu ; drain de collecte (lu comme un point « Drain », srcObj) : « Drain », Niveau vide ;
//   aucun « undefined » dans le plan PDF ; VCroquis.libNiv sur l'objet que rend srcObj : ''.
// n4 (garde) : l'étage précis ne change ni l'analyse (état des lieux, avant-projet : sorties écrites comme dans vm/compat.js), ni les
//   anomalies et leur texte, ni la conclusion, ni le constat déduit : mêmes sorties avec et sans p.etage (et avec un étage laissé sur un
//   niveau RDC) ; aucun texte d'anomalie ni de contrôle ne nomme l'étage.
// n1 à n3 échouent sur ee7b979 (« WC (étage) », « Lavabo (undefined) », « étage » au tableau ; VCroquis.libNiv absente) ; n4 y passe.
// usage : node tests/vm/equipements.js [-v] [--app=<dossier>]
'use strict';
const {charger, doc, copie, rendus, rapport} = require('./charger.js');
const ch = charger({pdf: true}), {V} = ch, R = rapport('equipements'), {dessiner, pdf, dxf} = rendus(ch);
/* appel protégé : une exception devient le texte « exception : … » */
const sur = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };
const elDe = (d, id) => d.el.find(e => e.id === id);
const etiquette = (d, id, mode) => sur(() => V.texteEtiquette(elDe(d, id), V.analyser(copie(d), mode || 'edl')));
/* objets d'un croquis fictif, chacun à 3 m du précédent : [id, type, propriétés] */
const rangee = objs => doc({o: objs.map(([id, t, p], i) => [id, t, 3 * i, 6, p])});

/* n1 : étiquette d'un étage précis */
function etiquettes(){
  const E = (niv, etage) => etage === undefined ? {niv} : {niv, etage};
  const cas = [
    ['1er étage', 'wc', E('etage', '1'), 'WC (1er étage)'],
    ['2e étage', 'wc', E('etage', '2'), 'WC (2e étage)'],
    ['3e étage', 'wc', E('etage', '3'), 'WC (3e étage)'],
    ['12e étage', 'wc', E('etage', '12'), 'WC (12e étage)'],
    ['99e étage', 'wc', E('etage', '99'), 'WC (99e étage)'],
    ['combles', 'wc', E('etage', 'combles'), 'WC (combles)'],
    ['lavabo au 1er étage', 'lavabo', E('etage', '1'), 'Lavabo (1er étage)'],
    ['« Projet », 1er étage', 'wc', Object.assign({st: 'projet'}, E('etage', '1')), 'Projet : WC (1er étage)'],
    ['descente avant non visitable au 2e étage', 'descente', Object.assign({cote: 'avant', visitable: 'non'}, E('etage', '2')), 'Descente EP avant\nnon visitable (2e étage)'],
    ['témoin : étage sans numéro (croquis d\'avant)', 'wc', E('etage'), 'WC (étage)'],
    ['témoin : numéro « 0 »', 'wc', E('etage', '0'), 'WC (étage)'],
    ['témoin : numéro « 100 »', 'wc', E('etage', '100'), 'WC (étage)'],
    ['témoin : numéro « abc »', 'wc', E('etage', 'abc'), 'WC (étage)'],
    ['témoin : numéro « 05 »', 'wc', E('etage', '05'), 'WC (étage)'],
    ['témoin : numéro vide', 'wc', E('etage', ''), 'WC (étage)'],
    ['témoin : numéro écrit en nombre (2)', 'wc', E('etage', 2), 'WC (étage)'],
    ['témoin : RDC', 'wc', E('rdc'), 'WC (RDC)'],
    ['témoin : sous-sol', 'lavabo', E('ss'), 'Lavabo (sous-sol)'],
    ['témoin : RDC avec un étage laissé par une version d\'avant', 'wc', E('rdc', '2'), 'WC (RDC)'],
    ['témoin : sans niveau, étage laissé : WC sans étiquette', 'wc', E('', '2'), ''],
    ['témoin : sans niveau', 'lavabo', E(''), 'Lavabo'],
    ['témoin : étiquette personnalisée', 'wc', Object.assign({etiq: 'WC du haut'}, E('etage', '1')), 'WC du haut'],
  ];
  const d = rangee(cas.map((c, i) => ['o' + i, c[1], c[2]]));
  cas.forEach(([n, , , att], i) => { const vu = etiquette(d, 'o' + i); R.ok(vu === att, 'n1 ' + n + ' → ' + JSON.stringify(att) + ' (obtenu ' + JSON.stringify(vu) + ')'); });
}

/* textes d'un croquis à l'écran, au plan PDF et au DXF (étiquettes placées d'office : lab null). Au PDF, plan : textes écrits avant le
   tableau des équipements de la page 2, une fois par position (le plan écrit chaque étiquette deux fois au même endroit, liseré puis texte) */
async function troisRendus(d){
  d = copie(d); d.el.forEach(e => { e.lab = null; });
  const ecran = sur(() => dessiner(d, 40, [3, 6]).textes.map(t => t.t)), p = await pdf(d, {mode: 'edl'});
  const x = sur(() => dxf(d).ents.filter(q => q.type === 'TEXT' && q.cal === 'VEDE-ETIQUETTES').map(q => q.c['1']));
  const fin = p.txt.indexOf(TITRE_EQ), vus = new Set(), plan = [];
  p.pos.slice(0, fin < 0 ? p.pos.length : fin).forEach(q => { const c = q.t + '|' + Math.round(q.x * 100) + '|' + Math.round(q.y * 100); if (!vus.has(c)){ vus.add(c); plan.push(q.t); } });
  return {ecran: Array.isArray(ecran) ? ecran : [ecran], pdf: p.txt, plan, err: p.err, dxf: Array.isArray(x) ? x : [x]};
}
async function etiquettesRendues(){
  const d = rangee([['W', 'wc', {niv: 'etage', etage: '1'}], ['L', 'lavabo', {niv: 'etage', etage: 'combles'}]]), r = await troisRendus(d);
  for (const [n, liste] of [['à l\'écran', r.ecran], ['au plan PDF', r.pdf], ['au DXF', r.dxf]]){
    const manque = ['WC (1er étage)', 'Lavabo (combles)'].filter(t => liste.indexOf(t) < 0);
    R.ok(!manque.length && !r.err.length, 'n1 ' + n + ' : « WC (1er étage) » et « Lavabo (combles) »' + (manque.length ? ' (absents : ' + JSON.stringify(manque)
      + ' ; textes : ' + JSON.stringify(liste.filter(t => /WC|Lavabo/.test(t)).slice(0, 6)) + ')' : '') + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  }
}

/* n2 : code de niveau inconnu */
async function codeInconnu(){
  const cas = [['lavabo, niv « zz »', 'lavabo', {niv: 'zz'}, 'Lavabo'], ['WC, niv « zz » : pas d\'étiquette', 'wc', {niv: 'zz'}, ''],
    ['lavabo, niv « constructor »', 'lavabo', {niv: 'constructor'}, 'Lavabo'], ['lavabo, niv « toString »', 'lavabo', {niv: 'toString'}, 'Lavabo'],
    ['lavabo, niv « zz » et un étage', 'lavabo', {niv: 'zz', etage: '2'}, 'Lavabo'], ['lavabo, niv écrit en nombre (1)', 'lavabo', {niv: 1}, 'Lavabo'],
    ['lavabo, niv « etage:2 » (valeur d\'une puce de la fiche, écrite à la main)', 'lavabo', {niv: 'etage:2'}, 'Lavabo']];
  const d = rangee(cas.map((c, i) => ['o' + i, c[1], c[2]]));
  cas.forEach(([n, , , att], i) => { const vu = etiquette(d, 'o' + i); R.ok(vu === att, 'n2 ' + n + ' → ' + JSON.stringify(att) + ' (obtenu ' + JSON.stringify(vu) + ')'); });
  const r = await troisRendus(d);
  for (const [n, liste, etiq] of [['à l\'écran', r.ecran, r.ecran], ['au plan PDF', r.pdf, r.plan], ['au DXF', r.dxf, r.dxf]]){
    const mal = liste.filter(t => /undefined|function|\[native/.test(t)), nLav = etiq.filter(t => t === 'Lavabo').length;
    R.ok(!mal.length && nLav === 6 && !r.err.length, 'n2 ' + n + ' : six étiquettes « Lavabo », aucun « undefined » (obtenu ' + nLav + ' « Lavabo »'
      + (mal.length ? ', ' + JSON.stringify(mal.slice(0, 4)) : '') + ')' + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  }
}

/* n3 : page 2 du plan PDF, tableau des équipements : cellules de chaque ligne [Équipement, Niveau, Rejet constaté, Méthode, Observation],
   lues dans l'ordre d'écriture après l'en-tête du tableau (cinq cellules par ligne) */
const TITRE_EQ = 'Équipements, rejets et méthodes de contrôle';
function tableauEquipements(txt){
  const i = txt.indexOf(TITRE_EQ); if (i < 0) return null;
  const apres = txt.slice(i + 6), out = [];
  for (let k = 0; k + 4 < apres.length && !/^Conclusion/.test(apres[k]); k += 5) out.push(apres.slice(k, k + 5));
  return out;
}
async function colonneNiveau(){
  const objs = [['W1', 'wc', {niv: 'etage', etage: '1'}, '1er étage'], ['La', 'lavabo', {niv: 'etage', etage: '2'}, '2e étage'],
    ['Do', 'douche', {niv: 'etage', etage: 'combles'}, 'combles'], ['Ev', 'evier', {niv: 'etage'}, 'étage'], ['LL', 'lavelinge', {niv: 'ss'}, 'sous-sol'],
    ['W2', 'wc', {niv: 'rdc', etage: '3'}, 'RDC'], ['W3', 'wc', {niv: ''}, ''], ['W4', 'wc', {niv: 'zz'}, ''], ['W5', 'wc', {niv: 'constructor'}, '']];
  const d = doc({o: objs.map(([id, t, p], i) => [id, t, 3 * i, 6, p]), l: [['Dc', 'tr', 'EP', '', [[0, -4], [12, -4]], 0, {drain: 'collecte', meth: ['eau']}]]});
  const p = await pdf(d, {mode: 'edl'}), tab = tableauEquipements(p.txt);
  if (!tab){ R.ok(false, 'n3 page 2 du plan PDF : tableau « ' + TITRE_EQ + ' » absent' + (p.err.length ? ' (' + p.err.join(' | ') + ')' : '')); return; }
  const att = objs.map(o => [V.TYPES[o[1]].lib, o[3]]).concat([['Drain', '']]), vu = tab.map(r => [r[0], r[1]]);
  R.ok(JSON.stringify(vu) === JSON.stringify(att) && !p.err.length, 'n3 colonne Niveau : ' + att.map(a => a[0] + ' « ' + a[1] + ' »').join(', ')
    + ' (obtenu ' + vu.map(a => a[0] + ' « ' + a[1] + ' »').join(', ') + ')' + (p.err.length ? ' ' + p.err.join(' | ') : ''));
  const mal = p.txt.filter(t => /undefined|function|\[native/.test(t));
  R.ok(!mal.length, 'n3 aucun « undefined » dans le plan PDF' + (mal.length ? ' (obtenu ' + JSON.stringify(mal.slice(0, 4)) + ')' : ''));
  /* drain de collecte : l'objet que rend srcObj (point « Drain » qui porte les propriétés du tracé) */
  const an = V.analyser(copie(d), 'edl'), o = sur(() => V.srcObj(an, 'Dc')), lib = typeof V.libNiv === 'function' ? sur(() => V.libNiv(o)) : 'VCroquis.libNiv absente';
  R.ok(!!o && o.t === 'drain' && lib === '', 'n3 drain de collecte : srcObj rend un point « Drain », libNiv y lit un niveau vide (obtenu ' + (o && o.t) + ', ' + JSON.stringify(lib) + ')');
}

/* n4 : l'étage précis ne change ni l'analyse, ni les anomalies, ni la conclusion, ni le constat. Écriture stable d'une valeur (celle de
   vm/compat.js) : clés triées, élément du croquis désigné par « #id », boucle coupée */
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
function sorties(d0){
  const o = {};
  ['edl', 'avp'].forEach(mode => {
    const d = copie(d0), an = V.analyser(d, mode), L = V.anomaliesDoc(d, an);
    o['analyse-' + mode] = canon({analyse: an, anomalies: L, conclusion: V.conclusion(L, an)}, new Set(d.el), []);
    o['textes-' + mode] = L.map(a => a.obs).concat(an.controles.map(c => c.txt)).join(' | ');
  });
  const dC = copie(d0), cd = V.constatDeduit(dC, V.analyser(dC, 'edl'));
  o.constat = canon({rows: cd.rows, epRecup: cd.epRecup, sansCote: cd.sansCote}, new Set(dC.el), []);
  return o;
}
function garde(){
  /* WC et lavabo vers une boîte EP (non conformes), descente vers une boîte EU (non conforme), douche reliée à rien, drain de collecte */
  const sans = doc({o: [['W', 'wc', 0, 8, {niv: 'etage'}], ['L', 'lavabo', 3, 8, {niv: 'etage'}], ['D', 'descente', 6, 8, {niv: 'etage', cote: 'avant'}],
    ['S', 'douche', 9, 8, {niv: 'rdc'}], ['Bp', 'boite', 0, 2, {res: 'EP'}], ['Bu', 'boite', 6, 2, {res: 'EU'}], ['Rp', 'regard_pub', 3, -2, {res: 'EU'}]],
    l: [['tW', 'tr', '', '', ['W', 'Bp']], ['tL', 'tr', '', '', ['L', 'Bp']], ['tD', 'tr', '', '', ['D', 'Bu']], ['tU', 'tr', '', '', ['Bu', 'Rp']],
      ['C', 'col', 'EU', '', [[-6, -2], 'Rp', [12, -2]]], ['Dc', 'tr', 'EP', '', [[12, 0], [12, 8]], 0, {drain: 'collecte', meth: ['eau']}]]});
  const avec = copie(sans), et = {W: '1', L: 'combles', D: '12', S: '2'};
  avec.el.forEach(e => { if (et[e.id]) e.p.etage = et[e.id]; });
  const a = sur(() => sorties(sans)), b = sur(() => sorties(avec));
  if (typeof a === 'string' || typeof b === 'string'){ R.ok(false, 'n4 sorties : ' + (typeof a === 'string' ? a : b)); return; }
  Object.keys(a).forEach(k => R.ok(a[k] === b[k], 'n4 ' + k + ' : identique avec et sans l\'étage précis' + (a[k] === b[k] ? '' : ' (sans : ' + a[k].slice(0, 160) + ' ; avec : ' + b[k].slice(0, 160) + ')')));
  const txt = b['textes-edl'] + ' | ' + b['textes-avp'], dA = copie(avec), an = V.analyser(dA, 'edl'), obs = V.anomaliesDoc(dA, an).map(x => x.obs);
  R.ok(an.anomalies.length >= 3 && !/étage|combles|\(\d+e\)|1er/.test(txt), 'n4 ' + an.anomalies.length + ' anomalies : aucun texte d\'anomalie ni de contrôle ne nomme l\'étage ('
    + JSON.stringify(obs.slice(0, 4)) + ')');
}

(async () => {
  try {
    etiquettes();
    await etiquettesRendues();
    await codeInconnu();
    await colonneNiveau();
    garde();
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
