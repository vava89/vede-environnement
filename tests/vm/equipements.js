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
// m131, WC à lave-mains intégré (souhait 18 ; décisions D1 à D5 et D10) : p.lm 'oui', lu sur un WC seulement (une autre valeur, ou un autre
// type : comme avant). VCroquis.libDe(e) donne le libellé d'un objet : « WC + lave-mains » pour ce WC, sinon le libellé du type, le code
// d'un type inconnu ; les anomalies et les contrôles (libObj), l'étiquette, la page 2 du plan PDF, l'en-tête de la fiche et le constat le lisent.
// l1 : étiquette : « WC + lave-mains » sans niveau, « WC + lave-mains (1er étage) », « (RDC) », « Projet : WC + lave-mains », « À
//   supprimer : WC + lave-mains » en avant-projet (sans ce préfixe en état des lieux), niveau inconnu « zz » sans parenthèses, l'étiquette
//   personnalisée l'emporte ; témoins : WC sans lave-mains, ou de lm 'non', '', 'Oui', true : pas d'étiquette (« WC (1er étage) » au 1er) ;
//   lm sur un lavabo ou une douche : ignoré ; VCroquis.libDe : « WC + lave-mains », « WC » (sans p, lm 'non'), « Lavabo », le code d'un
//   type inconnu (« zz », et 'toString', 'constructor', noms de propriétés des objets du langage), '' pour {t: ''} ; « WC + lave-mains » et
//   « WC + lave-mains (1er étage) » aussi à l'écran, au plan PDF et au DXF.
// l2 : anomalies et contrôles : « WC + lave-mains : rejet au réseau EP », sans le niveau même au 1er étage ; témoin « WC : rejet au réseau
//   EP » ; contrôle « WC + lave-mains : méthode de test à indiquer » ; anomalie du dossier restée intacte (VCroquis.reconcilier, comme
//   vm/copie.js) : son texte suit le lave-mains enlevé puis remis ; retouchée par le technicien : gardée telle quelle (témoin).
// l3 : constat déduit : un WC + lave-mains compte 1 sur la ligne « WC », « Évier » 0, aucune ligne « Autres », row.types ['WC',
//   'Lave-mains'] ; sans lave-mains, mêmes lignes hors types (['WC']) ; deux WC dont un à lave-mains : « WC » 2 ; lm écrit sur un lavabo :
//   ignoré (« Évier » 1, types ['Lavabo']).
// l4 : page 2 du plan PDF, colonne Équipement : « WC + lave-mains » (Niveau « 1er étage »), « WC », « Lavabo », drain de collecte « Drain »
//   (garde) ; VCroquis.libDe sur l'objet que rend srcObj : « Drain » pour le drain de collecte ; avant-projet : « Après travaux : WC +
//   lave-mains n'est plus relié… » ; aucun « undefined ».
// l5 (garde) : symbole (VCroquis.primitives, symboleSvg), plan PDF (mêmes textes hors « WC + lave-mains » du tableau, mêmes traits, légende
//   « WC »), DXF identique (bloc VEDE_WC), écran, analyse, anomalies, conclusion et constat (hors row.types) : les mêmes avec et sans
//   lave-mains, aux textes « WC + lave-mains » près.
// l1 à l4 échouent sur 824fabf (pas d'étiquette, « WC : rejet au réseau EP », types ['WC'], « WC » au tableau, VCroquis.libDe absente) ;
//   l5 y passe.
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

/* m131 : WC à lave-mains intégré (souhait 18 ; décisions D1 à D5 et D10) : p.lm 'oui', lu sur un WC seulement. VCroquis.libDe(e) : libellé de
   l'objet, « WC + lave-mains » pour ce WC, sinon celui du type */
const LM = 'WC + lave-mains';
const libDe = e => typeof V.libDe === 'function' ? sur(() => V.libDe(e)) : 'VCroquis.libDe absente';

/* l1 : étiquette d'un WC + lave-mains (texteEtiquette seul, puis à l'écran, au plan PDF et au DXF) ; VCroquis.libDe */
function etiquettesLm(){
  const cas = [
    ['sans niveau', 'wc', {lm: 'oui'}, 'edl', LM],
    ['1er étage', 'wc', {lm: 'oui', niv: 'etage', etage: '1'}, 'edl', LM + ' (1er étage)'],
    ['RDC', 'wc', {lm: 'oui', niv: 'rdc'}, 'edl', LM + ' (RDC)'],
    ['« Projet »', 'wc', {lm: 'oui', st: 'projet'}, 'edl', 'Projet : ' + LM],
    ['« À supprimer », avant-projet', 'wc', {lm: 'oui', st: 'supprimer'}, 'avp', 'À supprimer : ' + LM],
    ['« À supprimer », état des lieux', 'wc', {lm: 'oui', st: 'supprimer'}, 'edl', LM],
    ['niveau inconnu « zz »', 'wc', {lm: 'oui', niv: 'zz'}, 'edl', LM],
    ['étiquette personnalisée', 'wc', {lm: 'oui', etiq: 'WC du bas'}, 'edl', 'WC du bas'],
    ['témoin : sans lave-mains', 'wc', {}, 'edl', ''],
    ['témoin : sans lave-mains, 1er étage', 'wc', {niv: 'etage', etage: '1'}, 'edl', 'WC (1er étage)'],
    ['témoin : lm « non »', 'wc', {lm: 'non'}, 'edl', ''],
    ['témoin : lm vide', 'wc', {lm: ''}, 'edl', ''],
    ['témoin : lm « Oui »', 'wc', {lm: 'Oui'}, 'edl', ''],
    ['témoin : lm écrit true', 'wc', {lm: true}, 'edl', ''],
    ['témoin : lm sur un lavabo', 'lavabo', {lm: 'oui'}, 'edl', 'Lavabo'],
    ['témoin : lm sur une douche au 1er étage', 'douche', {lm: 'oui', niv: 'etage', etage: '1'}, 'edl', V.TYPES.douche.lib + ' (1er étage)'],
  ];
  const d = rangee(cas.map((c, i) => ['o' + i, c[1], c[2]]));
  cas.forEach(([n, , , mode, att], i) => { const vu = etiquette(d, 'o' + i, mode); R.ok(vu === att, 'l1 ' + n + ' → ' + JSON.stringify(att) + ' (obtenu ' + JSON.stringify(vu) + ')'); });
  for (const [n, e, att] of [['WC lm « oui »', {t: 'wc', p: {lm: 'oui'}}, LM], ['WC sans p', {t: 'wc'}, 'WC'], ['WC lm « non »', {t: 'wc', p: {lm: 'non'}}, 'WC'],
    ['lavabo lm « oui »', {t: 'lavabo', p: {lm: 'oui'}}, 'Lavabo'], ['type inconnu « zz »', {t: 'zz', p: {lm: 'oui'}}, 'zz'], ['type vide (sommet relié à rien)', {t: ''}, ''],
    /* code qui est le nom d'une propriété des objets du langage : son code, comme un type inconnu, et non undefined */
    ['type inconnu « toString »', {t: 'toString', p: {}}, 'toString'], ['type inconnu « constructor »', {t: 'constructor'}, 'constructor']]){
    const vu = libDe(e); R.ok(vu === att, 'l1 VCroquis.libDe, ' + n + ' → ' + JSON.stringify(att) + ' (obtenu ' + JSON.stringify(vu) + ')');
  }
}
async function etiquettesLmRendues(){
  const d = rangee([['W', 'wc', {lm: 'oui'}], ['W1', 'wc', {lm: 'oui', niv: 'etage', etage: '1'}], ['W0', 'wc', {}]]), r = await troisRendus(d);
  for (const [n, liste] of [['à l\'écran', r.ecran], ['au plan PDF', r.plan], ['au DXF', r.dxf]]){
    const manque = [LM, LM + ' (1er étage)'].filter(t => liste.indexOf(t) < 0);
    R.ok(!manque.length && !r.err.length, 'l1 ' + n + ' : « ' + LM + ' » et « ' + LM + ' (1er étage) »' + (manque.length ? ' (absents : ' + JSON.stringify(manque)
      + ' ; textes : ' + JSON.stringify(liste.filter(t => /WC|lave/.test(t)).slice(0, 6)) + ')' : '') + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  }
}

/* l2 : anomalies et contrôles : libellé de l'objet, jamais le niveau ; anomalie du dossier restée intacte : elle suit le lave-mains */
function anomaliesLm(){
  const d = doc({o: [['W', 'wc', 0, 8, {lm: 'oui'}], ['W1', 'wc', 3, 8, {lm: 'oui', niv: 'etage', etage: '1'}], ['W0', 'wc', 6, 8, {}],
    ['Wm', 'wc', 9, 8, {lm: 'oui', meth: []}], ['Bp', 'boite', 0, 2, {res: 'EP'}]],
    l: [['tW', 'tr', '', '', ['W', 'Bp']], ['t1', 'tr', '', '', ['W1', 'Bp']], ['t0', 'tr', '', '', ['W0', 'Bp']], ['tm', 'tr', '', '', ['Wm', 'Bp']]]});
  const dA = copie(d), an = V.analyser(dA, 'edl'), L = V.anomaliesDoc(dA, an), obs = id => (L.find(a => a.cle === 'eu-ep:' + id) || {}).obs;
  for (const [n, id, att] of [['WC + lave-mains', 'W', LM + ' : rejet au réseau EP'], ['WC + lave-mains au 1er étage : sans le niveau', 'W1', LM + ' : rejet au réseau EP'],
    ['témoin : WC seul', 'W0', 'WC : rejet au réseau EP']]) R.ok(obs(id) === att, 'l2 ' + n + ' → « ' + att + ' » (obtenu ' + JSON.stringify(obs(id)) + ')');
  const ctl = an.controles.filter(c => c.id === 'Wm').map(c => c.txt), tout = L.map(a => a.obs).concat(an.controles.map(c => c.txt)).join(' | ');
  R.ok(ctl.indexOf(LM + ' : méthode de test à indiquer') >= 0, 'l2 contrôle : « ' + LM + ' : méthode de test à indiquer » (obtenu ' + JSON.stringify(ctl) + ')');
  R.ok(L.length >= 4 && !/étage|1er|\(RDC\)/.test(tout), 'l2 ' + L.length + ' anomalies : aucun texte d\'anomalie ni de contrôle ne nomme le niveau (' + JSON.stringify(L.map(a => a.obs).slice(0, 4)) + ')');
  /* dossier synchronisé comme par l'application (vm/copie.js) : intacte, l'anomalie suit le lave-mains enlevé puis remis ; retouchée, elle
     reste telle quelle (témoin) */
  const dR = doc({o: [['W', 'wc', 0, 8, {lm: 'oui'}], ['Wt', 'wc', 3, 8, {lm: 'oui'}], ['Bp', 'boite', 0, 2, {res: 'EP'}]],
    l: [['tW', 'tr', '', '', ['W', 'Bp']], ['tt', 'tr', '', '', ['Wt', 'Bp']]]});
  const ext = [], rec = id => ext.find(r => r.croquis && r.croquis.cle === 'eu-ep:' + id) || {}, pt = id => dR.el.find(e => e.id === id);
  let k = 0;
  const synchro = () => { const ops = V.reconcilier(dR, null, ext);
    ops.retirer.forEach(id => { const i = ext.findIndex(r => r.id === id); if (i >= 0) ext.splice(i, 1); });
    ops.maj.forEach(m => { const r = ext.find(x => x.id === m.id); if (r) Object.assign(r, m.champs); });
    ops.creer.forEach(c => { ext.push(Object.assign({id: c.id || ('r' + (++k)), createdAt: c.createdAt || '2026-11-02'}, c)); }); };
  const RETOUCHE = 'WC du bas : rejet au réseau EP, vu sur place';
  synchro(); const o1 = rec('W').observation; rec('Wt').observation = RETOUCHE;
  delete pt('W').p.lm; delete pt('Wt').p.lm; synchro(); const o2 = rec('W').observation, t2 = rec('Wt').observation;
  pt('W').p.lm = 'oui'; synchro(); const o3 = rec('W').observation;
  R.ok(o1 === LM + ' : rejet au réseau EP' && o2 === 'WC : rejet au réseau EP' && o3 === o1, 'l2 anomalie du dossier intacte : « ' + LM + ' : … », puis « WC : … » le lave-mains enlevé, '
    + 'puis « ' + LM + ' : … » remis (obtenu ' + JSON.stringify([o1, o2, o3]) + ')');
  R.ok(t2 === RETOUCHE, 'l2 anomalie retouchée par le technicien : gardée telle quelle, le lave-mains enlevé (témoin ; obtenu ' + JSON.stringify(t2) + ')');
}

/* l3 : constat déduit : un WC + lave-mains compte un WC (ligne « WC »), « Évier » à 0 ; row.types reçoit « WC » et « Lave-mains » */
function constatLm(){
  const base = (objs, liens) => doc({o: objs.concat([['Bu', 'boite', 0, 2, {res: 'EU'}], ['Rp', 'regard_pub', 0, -2, {res: 'EU'}]]),
    l: liens.concat([['tU', 'tr', '', '', ['Bu', 'Rp']], ['C', 'col', 'EU', '', [[-6, -2], 'Rp', [12, -2]]]])});
  const cst = d => { const c = copie(d); return V.constatDeduit(c, V.analyser(c, 'edl')); }, ligne = (cd, id) => cd.rows.find(r => r.id === id) || {};
  const vue = cd => cd.rows.filter(r => r.nb).map(r => r.id + ' ×' + r.nb + ' ' + JSON.stringify(r.types)).join(', ');
  const sansTypes = cd => canon(cd.rows.map(r => Object.assign({}, r, {types: null})), new Set(), []);
  const d1 = base([['W', 'wc', 0, 8, {lm: 'oui'}]], [['tW', 'tr', '', '', ['W', 'Bu']]]), c1 = cst(d1), w1 = ligne(c1, 'wc');
  R.ok(w1.nb === 1 && ligne(c1, 'evier').nb === 0 && JSON.stringify(w1.types) === '["WC","Lave-mains"]' && !c1.rows.some(r => !r.std && r.nb),
    'l3 WC + lave-mains : ligne « WC » 1, « Évier » 0, aucune ligne « Autres », types ["WC","Lave-mains"] (obtenu ' + vue(c1) + ')');
  const d0 = copie(d1); delete d0.el.find(e => e.id === 'W').p.lm; const c0 = cst(d0);
  R.ok(sansTypes(c0) === sansTypes(c1) && JSON.stringify(ligne(c0, 'wc').types) === '["WC"]' && ligne(c1, 'wc').conforme === 'oui',
    'l3 sans lave-mains : mêmes lignes (nombre, raccordement, conformité « oui », méthodes), hors types ["WC"] (obtenu ' + vue(c0) + ')');
  const d2 = base([['W', 'wc', 0, 8, {lm: 'oui'}], ['W2', 'wc', 3, 8, {}]], [['tW', 'tr', '', '', ['W', 'Bu']], ['t2', 'tr', '', '', ['W2', 'Bu']]]), c2 = cst(d2), w2 = ligne(c2, 'wc');
  R.ok(w2.nb === 2 && ligne(c2, 'evier').nb === 0 && JSON.stringify(w2.types) === '["WC","Lave-mains"]', 'l3 deux WC, l\'un à lave-mains : « WC » 2, « Évier » 0 (obtenu ' + vue(c2) + ')');
  const d3 = base([['L', 'lavabo', 0, 8, {lm: 'oui'}]], [['tL', 'tr', '', '', ['L', 'Bu']]]), c3 = cst(d3), e3 = ligne(c3, 'evier');
  R.ok(e3.nb === 1 && JSON.stringify(e3.types) === '["Lavabo"]' && ligne(c3, 'wc').nb === 0, 'l3 lm écrit sur un lavabo : ignoré, « Évier » 1, types ["Lavabo"] (obtenu ' + vue(c3) + ')');
}

/* l4 : page 2 du plan PDF (libEquipement) ; drain de collecte lu par l'objet que rend srcObj (garde) ; avant-projet */
async function page2Lm(){
  const d = doc({o: [['W', 'wc', 0, 6, {lm: 'oui', niv: 'etage', etage: '1'}], ['W0', 'wc', 3, 6, {}], ['L', 'lavabo', 6, 6, {lm: 'oui'}]],
    l: [['Dc', 'tr', 'EP', '', [[0, -4], [12, -4]], 0, {drain: 'collecte', meth: ['eau']}]]});
  const p = await pdf(d, {mode: 'edl'}), tab = tableauEquipements(p.txt);
  if (!tab){ R.ok(false, 'l4 page 2 du plan PDF : tableau « ' + TITRE_EQ + ' » absent' + (p.err.length ? ' (' + p.err.join(' | ') + ')' : '')); return; }
  const att = [[LM, '1er étage'], ['WC', ''], ['Lavabo', ''], ['Drain', '']], vu = tab.map(r => [r[0], r[1]]);
  R.ok(JSON.stringify(vu) === JSON.stringify(att) && !p.err.length, 'l4 colonnes Équipement et Niveau : ' + att.map(a => a[0] + ' « ' + a[1] + ' »').join(', ')
    + ' (obtenu ' + vu.map(a => a[0] + ' « ' + a[1] + ' »').join(', ') + ')' + (p.err.length ? ' ' + p.err.join(' | ') : ''));
  const mal = p.txt.filter(t => /undefined|function|\[native/.test(t));
  R.ok(!mal.length, 'l4 aucun « undefined » dans le plan PDF' + (mal.length ? ' (obtenu ' + JSON.stringify(mal.slice(0, 4)) + ')' : ''));
  const an = V.analyser(copie(d), 'edl'), libs = ['Dc', 'W', 'W0'].map(id => libDe(sur(() => V.srcObj(an, id))));
  R.ok(JSON.stringify(libs) === JSON.stringify(['Drain', LM, 'WC']), 'l4 VCroquis.libDe sur l\'objet que rend srcObj : drain de collecte « Drain », « ' + LM + ' », « WC » (obtenu ' + JSON.stringify(libs) + ')');
  /* avant-projet : le tuyau du WC est à supprimer, sans raccordement de projet */
  const dA = doc({o: [['W', 'wc', 0, 8, {lm: 'oui'}], ['Bu', 'boite', 0, 2, {res: 'EU'}]], l: [['tW', 'tr', '', 'supprimer', ['W', 'Bu']]]});
  const pa = await pdf(dA, {mode: 'avp'}), lignes = pa.txt.filter(t => /^Après travaux : /.test(t)), malA = pa.txt.filter(t => /undefined/.test(t));
  R.ok(lignes.some(t => t.indexOf('Après travaux : ' + LM + ' n\'est plus relié') === 0) && !malA.length && !pa.err.length, 'l4 avant-projet : « Après travaux : ' + LM
    + ' n\'est plus relié… » (obtenu ' + JSON.stringify(lignes) + ')' + (pa.err.length ? ' ' + pa.err.join(' | ') : ''));
}

/* l5 (garde) : le lave-mains ne change que des textes : ni le symbole (écran, fiche, plan PDF, DXF et son bloc VEDE_WC), ni la légende
   « WC », ni l'analyse, les anomalies, la conclusion et le constat, aux textes « WC + lave-mains » et à row.types près */
async function gardeLm(){
  const pt = p => ({id: 'W', k: 'pt', t: 'wc', x: 0, y: 0, p: Object.assign({st: 'existant', obs: '', meth: ['eau']}, p), lab: {off: true}});
  const prim = e => sur(() => JSON.stringify(V.primitives(e, [20, 20, 20], 0))), svg = p => sur(() => V.symboleSvg('wc', 40, p));
  const pr0 = prim(pt({})), pr1 = prim(pt({lm: 'oui'})), sv0 = svg(pt({}).p), sv1 = svg(pt({lm: 'oui'}).p);
  R.ok(pr0 === pr1 && !/^exception/.test(pr0), 'l5 symbole du WC (VCroquis.primitives) : identique avec et sans lave-mains' + (pr0 === pr1 ? '' : ' (' + pr0.slice(0, 120) + ' ; ' + pr1.slice(0, 120) + ')'));
  R.ok(sv0 === sv1 && /<svg/.test(sv0), 'l5 symbole de la fiche (VCroquis.symboleSvg) : identique avec et sans lave-mains');
  /* croquis sans étiquettes (lab off) : WC vers une boîte EP (anomalie), WC au RDC vers la boîte EU ; avec : les deux à lave-mains */
  const sans = doc({o: [['W', 'wc', 0, 8, {}], ['W2', 'wc', 6, 8, {niv: 'rdc'}], ['Bp', 'boite', 0, 2, {res: 'EP'}], ['Bu', 'boite', 6, 2, {res: 'EU'}],
    ['Rp', 'regard_pub', 6, -2, {res: 'EU'}]], l: [['tW', 'tr', '', '', ['W', 'Bp']], ['t2', 'tr', '', '', ['W2', 'Bu']], ['tU', 'tr', '', '', ['Bu', 'Rp']],
    ['C', 'col', 'EU', '', [[-6, -2], 'Rp', [12, -2]]]]});
  const avec = copie(sans), sansLm = s => String(s).split(LM).join('WC');
  avec.el.forEach(e => { if (e.t === 'wc') e.p.lm = 'oui'; });
  const pS = await pdf(sans, {mode: 'edl'}), pA = await pdf(avec, {mode: 'edl'}), fin = pA.txt.indexOf(TITRE_EQ), p1 = pA.txt.slice(0, fin < 0 ? 0 : fin);
  R.ok(JSON.stringify(pA.txt.map(sansLm)) === JSON.stringify(pS.txt) && !pA.err.length, 'l5 plan PDF : mêmes textes avec et sans lave-mains, hors « ' + LM + ' »');
  R.ok(JSON.stringify(pA.formes) === JSON.stringify(pS.formes) && JSON.stringify(pA.traits) === JSON.stringify(pS.traits), 'l5 plan PDF : mêmes traits (symboles, tracés, légende, tableaux)');
  R.ok(fin > 0 && p1.indexOf('WC') >= 0 && p1.indexOf(LM) < 0, 'l5 plan PDF, page 1 : légende « WC », aucun « ' + LM + ' » (étiquettes masquées)');
  const xS = sur(() => dxf(sans)), xA = sur(() => dxf(avec)), ins = x => x.ents ? x.ents.filter(q => q.type === 'INSERT' && q.c['2'] === 'VEDE_WC').length : 0;
  R.ok(xS.texte === xA.texte && xA.blocs.indexOf('VEDE_WC') >= 0 && ins(xA) === 2, 'l5 DXF identique avec et sans lave-mains : bloc VEDE_WC, deux INSERT VEDE_WC (obtenu ' + ins(xA) + ')');
  const eS = sur(() => dessiner(sans, 40, [3, 6])), eA = sur(() => dessiner(avec, 40, [3, 6]));
  R.ok(JSON.stringify(eS.traits) === JSON.stringify(eA.traits) && JSON.stringify(eS.textes) === JSON.stringify(eA.textes), 'l5 écran : mêmes traits et mêmes textes (étiquettes masquées)');
  const a = sur(() => sorties(sans)), b = sur(() => sorties(avec));
  if (typeof a === 'string' || typeof b === 'string'){ R.ok(false, 'l5 sorties : ' + (typeof a === 'string' ? a : b)); return; }
  ['analyse-edl', 'analyse-avp', 'textes-edl', 'textes-avp'].forEach(k => R.ok(sansLm(b[k]) === a[k], 'l5 ' + k + ' : identique avec et sans lave-mains, aux textes « ' + LM + ' » près'
    + (sansLm(b[k]) === a[k] ? '' : ' (sans : ' + a[k].slice(0, 160) + ' ; avec : ' + b[k].slice(0, 160) + ')')));
  const dC0 = copie(sans), dC1 = copie(avec), c0 = V.constatDeduit(dC0, V.analyser(dC0, 'edl')), c1 = V.constatDeduit(dC1, V.analyser(dC1, 'edl'));
  const hors = cd => canon({rows: cd.rows.map(r => Object.assign({}, r, {types: null})), epRecup: cd.epRecup, sansCote: cd.sansCote, methodes: cd.methodes}, new Set(), []);
  R.ok(hors(c0) === hors(c1), 'l5 constat déduit : identique avec et sans lave-mains, hors row.types');
}

(async () => {
  try {
    etiquettes();
    await etiquettesRendues();
    await codeInconnu();
    await colonneNiveau();
    garde();
    etiquettesLm();
    await etiquettesLmRendues();
    anomaliesLm();
    constatLm();
    await page2Lm();
    await gardeLm();
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
