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
// m132, autres appareils, 1re partie (souhait 7 ; décisions D1 à D5, D8 et D10) : types 'autre_eu' (« Autre appareil », EU) et 'autre_ep'
// (« Autre ouvrage EP », EP), hors palette : p.nom (40 caractères au plus ; blanc ou autre chose qu'un texte : sans nom), p.ab (1 à 3
// caractères), p.row (ligne du formulaire du même groupe). VCroquis.abObj(e) : lettres du symbole d'un objet ; VCroquis.nomRefuse(nom) :
// '' si la fiche (m133) accepte le nom, sinon le texte de son refus.
// g1 : deux « Bidet » (l'un entouré d'espaces) et un « bidet » reliés à la boîte EU : une ligne « Autres : Bidet » (clé autre:EU:bidet),
//   nb 3, raccordement EU_D, conforme « oui », aucune ligne du formulaire ; « bidet » dessiné d'abord : libellé « bidet » (premier objet).
// g1 bis : « Climatisation » en EU et en EP : deux lignes (autre:EU:… et autre:EP:…), chacune jugée sur son réseau (EU_D « oui », EP_D
//   « oui ») ; les deux reliées à la boîte EU : l'EU « oui », l'EP « non ».
// g2 : « Urinoir » de row « wc » : ligne « WC » 1, types ["Urinoir"] ; avec un WC : 2, ["WC","Urinoir"] ; relié à la boîte EP, son
//   anomalie « Urinoir : rejet au réseau EP » va sur l'installation « wc » (VCroquis.reconcilier) ; row d'un autre groupe (gout_av,
//   grilles), inconnu (zz, 12) ou nom d'une propriété des objets du langage (constructor, toString) : ignoré (« Autres : Bidet ») ;
//   « Avaloir de terrasse » de row « grilles » : ligne « Grilles », types ["Avaloir de terrasse"] ; de row « wc » : « Autres ».
// g3 : sans nom (absent, '', blancs, 12, null) : une ligne « Autres : Autre appareil » (EU) et une « Autres : Autre ouvrage EP » (EP) ;
//   contrôle « Autre appareil : nom à indiquer » (« Autre ouvrage EP : … »), niveau « manque », pour chacun ; aucun une fois nommés, et la
//   conclusion ne change pas ; un nom de 60 caractères est coupé à 40 (libellé, ligne, étiquette).
// g4 : étiquettes « Bidet (RDC) », « Autre appareil », « ? » et « Bi » (la règle « égal à l'abréviation » ne vaut pas), « Avaloir de
//   terrasse (1er étage) » ; lettres du symbole (abObj, primitives) : « Bi » pour « Bidet » et « bidet », l'abréviation saisie de 1 à 3
//   caractères lisibles au PDF, sinon tirée du nom, sinon « ? » ; symbole de la fiche (symboleSvg) : « ? » sans nom, abréviation à balises
//   échappée ; légende du plan PDF : « Bidet (Bi) » (une seule pour « Bidet » et « bidet »), « Bidet (bi) », « Autre appareil (?) »,
//   « Avaloir de terrasse (Av) » ; DXF : blocs VEDE_AUTRE_EU_BI, VEDE_AUTRE_EU_BI_2 (« bi »), VEDE_AUTRE_EU (sans nom), VEDE_AUTRE_EP_AV
//   et leurs INSERT, aucun VEDE_OBJET ; nom « <b>Bidet</b> & "x" » écrit tel quel à l'écran, au plan PDF et au DXF, sans exception.
// g5 : « Avaloir de terrasse » (autre_ep) relié au réseau EU : « Avaloir de terrasse : rejet au réseau EU » (ep-eu) ; « Bidet » relié au
//   réseau EP : eu-ep ; sans nom : « Autre ouvrage EP : rejet au réseau EU » ; conclusion « non_conformes ».
// g6 : « Bidet » conforme et une anomalie saisie à la main sur lui, « à arbitrer » : la ligne n'est jamais « oui » (arbitrer) ; témoins
//   « retenue » et « écartée » : « oui ».
// g7 : nomRefuse : « Douche italienne », « WC suspendu », « Évier double », « Puits perdu », « Chaudière », « Lavabos », « Chaudière
//   (purge, condensat) », « Autre appareil », « Lave-mains », « Salle d'eau », « Siphon de cour », « Trop-pleins », « Vasque », « Bac à
//   laver »… refusés, de même « Salle d’eau » et « Lave’linge » (apostrophe typographique, celle du clavier de l'iPad) et
//   « Lave‑mains » (trait d'union insécable) ; « Bidet », « Urinoir », « Avaloir de terrasse », « Climatisation », '' et null permis ;
//   textes du refus de « Douche italienne » et de « Puits perdu » ; un nom refusé venu d'un fichier est lu tel quel (« Autres : Douche
//   italienne »).
// g8 : 200 croquis du générateur avec des génériques (option sources, D10 ; nom, abréviation et ligne tirés d'une suite à part) :
//   la moitié au moins des génériques analysés (une source a un résultat, reliée ou non : seuls ceux « Projet » de l'état des lieux n'en
//   ont pas) ; aucune exception (analyse, anomalies, conclusion, constat, étiquettes, DXF), aucun « undefined » ; chaque générique compté sur une
//   ligne et une seule, celle de son row valide ou sa ligne « Autres » ; ni ses textes ni sa ligne ne disent « Autre destination ».
// g1 à g8 échouent sur 9ad0840 (type inconnu : aucune ligne, aucun contrôle, aucune étiquette, aucun générique analysé ; VCroquis.abObj
// et nomRefuse absentes) ; la première version de m132 acceptait les trois noms à signes typographiques de g7 (relecture, M1).
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

/* m132 : autres appareils (1re partie ; souhait 7 ; D1 à D5, D8 et D10) : types 'autre_eu' et 'autre_ep', nom, abréviation et ligne du
   formulaire dans p. VCroquis.abObj(e) : lettres du symbole ; VCroquis.nomRefuse(nom) : '' si le nom est permis, sinon le texte du refus */
const abObj = e => typeof V.abObj === 'function' ? sur(() => V.abObj(e)) : 'VCroquis.abObj absente';
const nomRefuse = n => typeof V.nomRefuse === 'function' ? sur(() => V.nomRefuse(n)) : 'VCroquis.nomRefuse absente';
/* croquis fictif à deux réseaux : boîte EU Bu vers le regard public Rp (collecteur EU), boîte EP Bp vers Rq (collecteur EP) ; objets
   [id, type, p, vers] à 3 m les uns des autres, chacun relié par le tracé 't' + id à la boîte vers ('Bu' ou 'Bp') ; les tracés du
   croquis lui-même commencent par « x », pour ne pas prendre l'identifiant d'un tracé d'objet (un objet 'U' a le tracé 'tU') */
function deuxReseaux(objs){
  return doc({o: objs.map(([id, t, p], i) => [id, t, 3 * i - 6, 9, p || {}]).concat([['Bu', 'boite', 0, 2, {res: 'EU'}], ['Rp', 'regard_pub', 0, -2, {res: 'EU'}],
    ['Bp', 'boite', 30, 2, {res: 'EP'}], ['Rq', 'regard_pub', 30, -2, {res: 'EP'}]]),
    l: objs.map(([id, , , vers]) => ['t' + id, 'tr', '', '', [id, vers]]).concat([['xBu', 'tr', '', '', ['Bu', 'Rp']], ['xBp', 'tr', '', '', ['Bp', 'Rq']],
      ['xC1', 'col', 'EU', '', [[-6, -2], 'Rp', [12, -2]]], ['xC2', 'col', 'EP', '', [[24, -2], 'Rq', [40, -2]]]])});
}
const constatDe = d => sur(() => { const c = copie(d); return V.constatDeduit(c, V.analyser(c, 'edl')); });
const rowDe = (cd, id) => (cd && cd.rows || []).find(r => r.id === id) || {};
const vueRows = cd => typeof cd === 'string' ? cd : cd.rows.filter(r => r.nb).map(r => r.id + ' ×' + r.nb + ' ' + r.raccord + ' ' + JSON.stringify(r.conforme)
  + (r.label !== (r.std ? r.label : r.id) ? ' « ' + r.label + ' »' : '') + ' ' + JSON.stringify(r.types)).join(', ') || 'aucune ligne';

/* g1 : une ligne « Autres » par nom normalisé et par réseau ; un objet = une installation */
function g1(){
  const d = deuxReseaux([['G1', 'autre_eu', {nom: 'Bidet'}, 'Bu'], ['G2', 'autre_eu', {nom: '  Bidet '}, 'Bu'], ['G3', 'autre_eu', {nom: 'bidet'}, 'Bu']]), cd = constatDe(d);
  const r = rowDe(cd, 'autre:EU:bidet'), std = typeof cd === 'string' ? [] : cd.rows.filter(x => x.std && x.nb), aut = typeof cd === 'string' ? [] : cd.rows.filter(x => !x.std && x.nb);
  R.ok(r.nb === 3 && r.label === 'Bidet' && r.groupe === 'EU' && r.std === false && r.raccord === 'EU_D' && r.conforme === 'oui' && !std.length && aut.length === 1,
    'g1 deux « Bidet » et un « bidet » : une ligne « Autres : Bidet » (autre:EU:bidet), nb 3, EU_D, « oui », aucune ligne du formulaire (obtenu ' + vueRows(cd) + ')');
  const d2 = deuxReseaux([['G3', 'autre_eu', {nom: 'bidet'}, 'Bu'], ['G1', 'autre_eu', {nom: 'Bidet'}, 'Bu']]), c2 = constatDe(d2), r2 = rowDe(c2, 'autre:EU:bidet');
  R.ok(r2.nb === 2 && r2.label === 'bidet', 'g1 « bidet » dessiné d\'abord : libellé « bidet », celui du premier objet (obtenu ' + vueRows(c2) + ')');
}
/* g1 bis : même nom en EU et en EP : deux lignes, chacune jugée sur son réseau */
function g1bis(){
  const d = deuxReseaux([['Ce', 'autre_eu', {nom: 'Climatisation'}, 'Bu'], ['Cp', 'autre_ep', {nom: 'Climatisation'}, 'Bp']]), cd = constatDe(d);
  const e = rowDe(cd, 'autre:EU:climatisation'), p = rowDe(cd, 'autre:EP:climatisation');
  R.ok(e.nb === 1 && e.groupe === 'EU' && e.raccord === 'EU_D' && e.conforme === 'oui' && p.nb === 1 && p.groupe === 'EP' && p.raccord === 'EP_D' && p.conforme === 'oui'
    && e.label === 'Climatisation' && p.label === 'Climatisation', 'g1 bis « Climatisation » EU et EP : deux lignes, EU_D « oui » et EP_D « oui » (obtenu ' + vueRows(cd) + ')');
  const d2 = deuxReseaux([['Ce', 'autre_eu', {nom: 'Climatisation'}, 'Bu'], ['Cp', 'autre_ep', {nom: 'Climatisation'}, 'Bu']]), c2 = constatDe(d2);
  const e2 = rowDe(c2, 'autre:EU:climatisation'), p2 = rowDe(c2, 'autre:EP:climatisation');
  R.ok(e2.conforme === 'oui' && p2.nb === 1 && p2.raccord === 'EU_D' && p2.conforme === 'non', 'g1 bis les deux reliées à la boîte EU : l\'EU « oui », l\'EP « non » (obtenu ' + vueRows(c2) + ')');
}
/* g2 : p.row, ligne du formulaire du même groupe */
function g2(){
  const c1 = constatDe(deuxReseaux([['U', 'autre_eu', {nom: 'Urinoir', row: 'wc'}, 'Bu']])), w1 = rowDe(c1, 'wc');
  R.ok(w1.nb === 1 && JSON.stringify(w1.types) === '["Urinoir"]' && w1.conforme === 'oui' && !(c1.rows || []).some(x => !x.std && x.nb),
    'g2 « Urinoir » de row « wc » : ligne « WC » 1, types ["Urinoir"], aucune ligne « Autres » (obtenu ' + vueRows(c1) + ')');
  const c2 = constatDe(deuxReseaux([['W', 'wc', {}, 'Bu'], ['U', 'autre_eu', {nom: 'Urinoir', row: 'wc'}, 'Bu']])), w2 = rowDe(c2, 'wc');
  R.ok(w2.nb === 2 && JSON.stringify(w2.types) === '["WC","Urinoir"]', 'g2 avec un WC : « WC » 2, types ["WC","Urinoir"] (obtenu ' + vueRows(c2) + ')');
  const ops = sur(() => V.reconcilier(copie(deuxReseaux([['U', 'autre_eu', {nom: 'Urinoir', row: 'wc'}, 'Bp']])), null, []));
  const a = ops && ops.creer ? ops.creer.find(c => c.croquis && c.croquis.cle === 'eu-ep:U') : null;
  R.ok(!!a && a.installation === 'wc' && a.observation === 'Urinoir : rejet au réseau EP', 'g2 urinoir relié à la boîte EP : anomalie « Urinoir : rejet au réseau EP » sur l\'installation « wc » (obtenu '
    + (a ? JSON.stringify([a.observation, a.installation]) : typeof ops === 'string' ? ops : 'aucune') + ')');
  const rows = ['gout_av', 'grilles', 'zz', 12, 'constructor', 'toString'], c3 = constatDe(deuxReseaux(rows.map((row, i) => ['B' + i, 'autre_eu', {nom: 'Bidet', row}, 'Bu'])));
  R.ok(rowDe(c3, 'autre:EU:bidet').nb === rows.length && !(c3.rows || []).some(x => x.std && x.nb), 'g2 row d\'un autre groupe, inconnu ou nom d\'une propriété des objets du langage ('
    + rows.join(', ') + ') : ignoré, « Autres : Bidet » ×' + rows.length + ' (obtenu ' + vueRows(c3) + ')');
  const c4 = constatDe(deuxReseaux([['A', 'autre_ep', {nom: 'Avaloir de terrasse', row: 'grilles'}, 'Bp'], ['A2', 'autre_ep', {nom: 'Avaloir de terrasse', row: 'wc'}, 'Bp']])), g = rowDe(c4, 'grilles');
  R.ok(g.nb === 1 && JSON.stringify(g.types) === '["Avaloir de terrasse"]' && rowDe(c4, 'autre:EP:avaloir de terrasse').nb === 1 && rowDe(c4, 'wc').nb === 0,
    'g2 « Avaloir de terrasse » de row « grilles » : ligne « Grilles » ; de row « wc » (groupe EU) : « Autres » (obtenu ' + vueRows(c4) + ')');
}
/* g3 : sans nom ; contrôle « nom à indiquer » ; nom coupé à 40 caractères */
function g3(){
  const sans = [['A0', {}], ['A1', {nom: ''}], ['A2', {nom: '   '}], ['A3', {nom: 12}], ['A4', {nom: null}]];
  const d = deuxReseaux(sans.map(([id, p]) => [id, 'autre_eu', p, 'Bu']).concat([['P0', 'autre_ep', {}, 'Bp'], ['P1', 'autre_ep', {nom: ' '}, 'Bp']])), cd = constatDe(d);
  const e = rowDe(cd, 'autre:EU:autre appareil'), p = rowDe(cd, 'autre:EP:autre ouvrage ep'), aut = typeof cd === 'string' ? [] : cd.rows.filter(x => !x.std && x.nb);
  R.ok(aut.length === 2 && e.nb === 5 && e.label === 'Autre appareil' && p.nb === 2 && p.label === 'Autre ouvrage EP', 'g3 sans nom : « Autres : Autre appareil » ×5 et « Autres : Autre ouvrage EP » ×2 (obtenu '
    + vueRows(cd) + ')');
  const an = sur(() => V.analyser(copie(d), 'edl')), ctl = an.controles ? an.controles.filter(c => /^nom:/.test(c.cle)).map(c => c.cle + ' ' + c.niveau + ' ' + c.txt).sort() : [an];
  const att = sans.map(([id]) => 'nom:' + id + ' manque Autre appareil : nom à indiquer').concat(['nom:P0 manque Autre ouvrage EP : nom à indiquer', 'nom:P1 manque Autre ouvrage EP : nom à indiquer']).sort();
  R.ok(JSON.stringify(ctl) === JSON.stringify(att), 'g3 contrôle « Autre appareil : nom à indiquer » (« Autre ouvrage EP : … »), niveau « manque », pour chacun (obtenu ' + JSON.stringify(ctl.slice(0, 3)) + ')');
  const dn = copie(d); dn.el.forEach(x => { if (/^autre_e[up]$/.test(x.t)) x.p.nom = 'Bidet'; });
  const conc = x => sur(() => { const c = copie(x), a = V.analyser(c, 'edl'); return V.conclusion(V.anomaliesDoc(c, a), a); }), aN = sur(() => V.analyser(copie(dn), 'edl'));
  R.ok(aN.controles && !aN.controles.some(c => /^nom:/.test(c.cle)) && conc(d) === conc(dn) && !/^exception/.test(conc(d)), 'g3 nommés : aucun contrôle « nom à indiquer », même conclusion (« '
    + conc(d) + ' » sans nom, « ' + conc(dn) + ' » nommés)');
  const LONG = 'Pompe de relevage fictive numéro 1234 pour un essai de coupe', L40 = LONG.slice(0, 40).trim(), dl = deuxReseaux([['Lg', 'autre_eu', {nom: '  ' + LONG + '  '}, 'Bu']]);
  const cl = constatDe(dl), lg = rowDe(cl, 'autre:EU:' + V.outils.norm(L40)), et = etiquette(dl, 'Lg');
  R.ok(LONG.length === 60 && L40.length === 40 && libDe(elDe(dl, 'Lg')) === L40 && lg.nb === 1 && lg.label === L40 && et === L40, 'g3 nom de 60 caractères coupé à 40 : « ' + L40
    + ' » (libellé ' + JSON.stringify(libDe(elDe(dl, 'Lg'))) + ', étiquette ' + JSON.stringify(et) + ', ligne ' + vueRows(cl) + ')');
}
/* g4 : étiquette, symbole, légende, DXF, nom à balises */
async function g4(){
  const d = rangee([['G', 'autre_eu', {nom: 'Bidet', niv: 'rdc'}], ['G0', 'autre_eu', {}], ['Gq', 'autre_eu', {nom: '?'}], ['Gb', 'autre_eu', {nom: 'Bi'}],
    ['P', 'autre_ep', {nom: 'Avaloir de terrasse', niv: 'etage', etage: '1'}]]);
  for (const [id, att] of [['G', 'Bidet (RDC)'], ['G0', 'Autre appareil'], ['Gq', '?'], ['Gb', 'Bi'], ['P', 'Avaloir de terrasse (1er étage)']]){
    const vu = etiquette(d, id); R.ok(vu === att, 'g4 étiquette de ' + id + ' → « ' + att + ' » (obtenu ' + JSON.stringify(vu) + ')');
  }
  const ab = (t, p) => abObj({k: 'pt', t, p}), cas = [['autre_eu', {nom: 'Bidet'}, 'Bi'], ['autre_eu', {nom: 'bidet'}, 'Bi'], ['autre_eu', {nom: 'Bidet', ab: 'BD'}, 'BD'],
    ['autre_eu', {nom: 'Bidet', ab: ' x '}, 'x'], ['autre_eu', {nom: 'Bidet', ab: 'ABCD'}, 'Bi'], ['autre_eu', {nom: 'Bidet', ab: 'ΩΩ'}, 'Bi'], ['autre_eu', {nom: 'Bidet', ab: 12}, 'Bi'],
    ['autre_eu', {}, '?'], ['autre_eu', {nom: '', ab: ''}, '?'], ['autre_eu', null, '?'], ['autre_ep', {nom: 'avaloir'}, 'Av'], ['wc', {nom: 'Bidet', ab: 'Bi'}, 'WC'], ['zz', {}, '']];
  const malAb = cas.filter(([t, p, att]) => ab(t, p) !== att).map(([t, p, att]) => t + ' ' + JSON.stringify(p) + ' → ' + JSON.stringify(ab(t, p)) + ' (attendu ' + JSON.stringify(att) + ')');
  R.ok(!malAb.length, 'g4 lettres du symbole (abObj) : « Bi » pour « Bidet » et « bidet », abréviation saisie de 1 à 3 caractères lisibles au PDF, sinon tirée du nom, sinon « ? » ; '
    + 'type ordinaire : la sienne' + (malAb.length ? ' (' + malAb.slice(0, 3).join(' ; ') + ')' : ''));
  const lettres = p => { const r = sur(() => V.primitives({id: 'G', k: 'pt', t: 'autre_eu', x: 0, y: 0, p: Object.assign({st: 'existant', obs: ''}, p)}, [20, 20, 20], 0));
    return Array.isArray(r) ? r.filter(q => q.k === 't').map(q => q.s).join('|') : String(r); };
  R.ok(lettres({nom: 'Bidet'}) === 'Bi' && lettres({}) === '?' && lettres({nom: 'Pompe', ab: 'PAC'}) === 'PAC', 'g4 symbole (VCroquis.primitives) : « Bi », « ? » sans nom, « PAC » saisie (obtenu '
    + JSON.stringify([lettres({nom: 'Bidet'}), lettres({}), lettres({nom: 'Pompe', ab: 'PAC'})]) + ')');
  const sv = sur(() => V.symboleSvg('autre_eu', 40)), svb = sur(() => V.symboleSvg('autre_eu', 40, {nom: 'Bidet', ab: '<i>'}));
  R.ok(/<svg/.test(sv) && />\?<\/text>/.test(sv) && /&lt;i&gt;/.test(svb) && !/<i>/.test(svb), 'g4 symbole de la fiche (symboleSvg) : « ? » sans nom ; abréviation « <i> » échappée (obtenu '
    + JSON.stringify(String(svb).slice(-80)) + ')');
  /* légende du plan PDF et blocs du DXF : G1 et G2 (« Bidet », « bidet » : « Bi »), G3 (« Bidet », abréviation « bi »), G4 sans nom, P1 */
  const dR = deuxReseaux([['G1', 'autre_eu', {nom: 'Bidet'}, 'Bu'], ['G2', 'autre_eu', {nom: 'bidet'}, 'Bu'], ['G3', 'autre_eu', {nom: 'Bidet', ab: 'bi'}, 'Bu'], ['G4', 'autre_eu', {}, 'Bu'],
    ['P1', 'autre_ep', {nom: 'Avaloir de terrasse'}, 'Bp']]);
  const p = await pdf(dR, {mode: 'edl'}), fin = p.txt.indexOf(TITRE_EQ), p1 = p.txt.slice(0, fin < 0 ? p.txt.length : fin);
  const LEG = ['Bidet (Bi)', 'Bidet (bi)', 'Autre appareil (?)', 'Avaloir de terrasse (Av)'], vusL = p1.filter(t => /\((Bi|bi|\?|Av)\)$/.test(t));
  R.ok(JSON.stringify(vusL.slice().sort()) === JSON.stringify(LEG.slice().sort()) && !p.err.length, 'g4 légende du plan PDF : ' + LEG.map(t => '« ' + t + ' »').join(', ') + ', une fois chacune (obtenu '
    + JSON.stringify(vusL) + ')' + (p.err.length ? ' ' + p.err.join(' | ') : ''));
  const x = sur(() => dxf(dR)), blocs = x.blocs || [], ins = n => (x.ents || []).filter(q => q.type === 'INSERT' && q.c['2'] === n).length;
  const attB = [['VEDE_AUTRE_EU_BI', 2], ['VEDE_AUTRE_EU_BI_2', 1], ['VEDE_AUTRE_EU', 1], ['VEDE_AUTRE_EP_AV', 1]];
  R.ok(attB.every(([n, k]) => blocs.indexOf(n) >= 0 && ins(n) === k) && blocs.indexOf('VEDE_OBJET') < 0, 'g4 DXF : ' + attB.map(([n, k]) => n + ' (' + k + ' INSERT)').join(', ') + ', aucun VEDE_OBJET (obtenu '
    + (typeof x === 'string' ? x : blocs.filter(n => /AUTRE|OBJET/.test(n)).map(n => n + ' (' + ins(n) + ')').join(', ')) + ')');
  const NH = '<b>Bidet</b> & "x"', rH = await troisRendus(deuxReseaux([['H', 'autre_eu', {nom: NH}, 'Bu']]));
  R.ok(rH.ecran.indexOf(NH) >= 0 && rH.plan.indexOf(NH) >= 0 && rH.pdf.indexOf(NH + ' (<b)') >= 0 && rH.dxf.indexOf(NH) >= 0 && !rH.err.length, 'g4 nom « ' + NH
    + ' » tel quel : étiquette à l\'écran, au plan PDF et au DXF, légende « ' + NH + ' (<b)' + ' » (obtenu ' + JSON.stringify([rH.ecran.filter(t => /Bidet/.test(t)), rH.dxf.filter(t => /Bidet/.test(t))]).slice(0, 200) + ')'
    + (rH.err.length ? ' ' + rH.err.join(' | ') : ''));
}
/* g5 : règles des anomalies selon la nature du type */
function g5(){
  const d = deuxReseaux([['A', 'autre_ep', {nom: 'Avaloir de terrasse'}, 'Bu'], ['B', 'autre_eu', {nom: 'Bidet'}, 'Bp'], ['A0', 'autre_ep', {}, 'Bu']]);
  const r = sur(() => { const c = copie(d), an = V.analyser(c, 'edl'), L = V.anomaliesDoc(c, an); return {L, conc: V.conclusion(L, an)}; }), obs = cle => ((r.L || []).find(a => a.cle === cle) || {}).obs;
  for (const [cle, att] of [['ep-eu:A', 'Avaloir de terrasse : rejet au réseau EU'], ['eu-ep:B', 'Bidet : rejet au réseau EP'], ['ep-eu:A0', 'Autre ouvrage EP : rejet au réseau EU']])
    R.ok(obs(cle) === att, 'g5 ' + cle + ' : « ' + att + ' » (obtenu ' + JSON.stringify(obs(cle)) + ')');
  R.ok(r.conc === 'non_conformes', 'g5 conclusion « non_conformes » (obtenu ' + JSON.stringify(typeof r === 'string' ? r : r.conc) + ')');
}
/* g6 : anomalie saisie à la main, à arbitrer, sur un « Bidet » conforme */
function g6(){
  const base = deuxReseaux([['G', 'autre_eu', {nom: 'Bidet'}, 'Bu']]);
  const avec = st => { const d = copie(base); d.anomManu = [{id: 'm1', objId: 'G', reseau: 'EU', obs: 'Bidet : écoulement lent (anomalie fictive)', preco: '', nc: true, st}]; return d; };
  const r0 = rowDe(constatDe(base), 'autre:EU:bidet'), ra = rowDe(constatDe(avec('arbitrer')), 'autre:EU:bidet');
  R.ok(r0.conforme === 'oui' && ra.nb === 1 && ra.conforme !== 'oui' && ra.arbitrer === true, 'g6 « Bidet » conforme, anomalie saisie « à arbitrer » : ligne jamais « oui », arbitrer (obtenu '
    + JSON.stringify([r0.conforme, ra.conforme, ra.arbitrer]) + ')');
  for (const st of ['retenue', 'ecartee']){ const r = rowDe(constatDe(avec(st)), 'autre:EU:bidet');
    R.ok(r.nb === 1 && r.conforme === 'oui' && !r.arbitrer, 'g6 témoin : anomalie « ' + st + ' » : « oui » (obtenu ' + JSON.stringify([r.conforme, r.arbitrer]) + ')'); }
}
/* g7 : noms refusés par la fiche (m133) ; jamais à la lecture */
function g7(){
  const REFUS = ['Douche italienne', 'WC suspendu', 'Évier double', 'Puits perdu', 'Chaudière', 'Lavabos', 'Chaudière (purge, condensat)', 'Autre appareil', 'autre ouvrage ep',
    'Lave-mains', 'Salle d\'eau', 'Siphon de cour', 'Trop-pleins', 'Vasque', 'Bac à laver', 'Toilettes du jardin', 'Gouttière', 'Grille', 'Regard', '  wc  ',
    /* signes typographiques (relecture de m132) : apostrophe du clavier de l'iPad, trait d'union insécable */
    'Salle d\u2019eau', 'Lave\u2019linge', 'Lave\u2011mains'];
  const PERMIS = ['Bidet', 'Urinoir', 'Avaloir de terrasse', 'Climatisation', 'Pompe à chaleur', '', '   ', null, undefined, 12];
  const refuse = n => { const r = nomRefuse(n); return typeof r === 'string' && r !== '' && !/^exception|absente$/.test(r); };
  const malR = REFUS.filter(n => !refuse(n)), malP = PERMIS.filter(n => nomRefuse(n) !== '');
  R.ok(!malR.length, 'g7 ' + REFUS.length + ' noms refusés (« Douche italienne », « WC suspendu », « Puits perdu », « Chaudière », « Lavabos »…)' + (malR.length ? ' ; acceptés : '
    + JSON.stringify(malR.slice(0, 6)) + ' (' + JSON.stringify(nomRefuse(malR[0])) + ')' : ''));
  R.ok(!malP.length, 'g7 noms permis : « Bidet », « Urinoir », « Avaloir de terrasse », « Climatisation », « Pompe à chaleur », vide, null' + (malP.length ? ' ; refusés : '
    + JSON.stringify(malP.map(n => [n, nomRefuse(n)]).slice(0, 4)) : ''));
  for (const [n, att] of [['Douche italienne', 'Douche italienne : posez une Douche, comptée en Salle de bain.'],
    ['Puits perdu', 'Pour un puits, posez l\'objet Puits (EP non conformes) ; pour un puits perdu, un Puisard.'],
    ['Vasque', 'Vasque : se dessine en Lavabo, compté Évier ; le lave-mains d\'un WC est sa puce « + lave-mains ».']])
    R.ok(nomRefuse(n) === att, 'g7 refus de « ' + n + ' » : « ' + att + ' » (obtenu ' + JSON.stringify(nomRefuse(n)) + ')');
  const d = deuxReseaux([['G', 'autre_eu', {nom: 'Douche italienne'}, 'Bu']]), cd = constatDe(d);
  R.ok(libDe(elDe(d, 'G')) === 'Douche italienne' && rowDe(cd, 'autre:EU:douche italienne').nb === 1 && rowDe(cd, 'sdb').nb === 0, 'g7 nom refusé venu d\'un fichier : lu tel quel, « Autres : '
    + 'Douche italienne », salle de bain 0 (obtenu ' + vueRows(cd) + ')');
}
/* g8 : croquis du générateur avec des génériques (option sources) */
function g8(){
  const G = require('./generateur.js'), SRC = G.SOURCES.concat(['autre_eu', 'autre_ep']), EXU = G.EXUTOIRES.concat(['infiltration', 'puits', 'exutoire']), T = V.TYPES || {};
  const cle = s => V.outils.norm(s).replace(/\s+/g, ' ').trim(), ex = [], mal = [];
  let n = 0, k = 0, ka = 0;
  for (let graine = 1; graine <= 200; graine++){
    const spec = G.gen(graine, {sources: SRC, avp: graine % 3 === 0, maxS: 2 + graine % 4, maxN: 2 + graine % 5, exutoires: EXU, drains: graine % 2 === 0});
    const gens = spec.o.filter(o => o[1] === 'autre_eu' || o[1] === 'autre_ep');
    if (!gens.length) continue;
    n++; k += gens.length;
    try {
      const d = doc(spec), dA = copie(d), an = V.analyser(dA, 'edl'), L = V.anomaliesDoc(dA, an), dP = copie(d), aP = V.analyser(dP, 'avp');
      V.conclusion(L, an); V.anomaliesDoc(dP, aP);
      const dC = copie(d), cd = V.constatDeduit(dC, V.analyser(dC, 'edl')), ou = {}, txt = [];
      cd.rows.forEach(r => r.objets.forEach(id => { (ou[id] = ou[id] || []).push(r); }));
      gens.forEach(([id, t]) => {
        const e = elDe(d, id), ty = T[t] || {}, mots = [libDe(e), V.texteEtiquette(e, an), V.texteEtiquette(e, aP), abObj(e)];
        if (mots.some(s => typeof s !== 'string' || /Autre destination|undefined|\[object|^exception/.test(s))) mal.push('graine ' + graine + ' ' + id + ' : ' + JSON.stringify(mots));
        if (!an.resObj[id]) return;
        ka++;
        const rs = ou[id] || [], row = typeof e.p.row === 'string' ? e.p.row : '';
        const att = cd.rows.some(r => r.std && r.id === row && r.groupe === ty.nat) ? row : 'autre:' + ty.nat + ':' + cle(libDe(e));
        if (rs.length !== 1 || rs[0].id !== att || /Autre destination/.test(rs[0].label)) mal.push('graine ' + graine + ' ' + id + ' ' + JSON.stringify(e.p.nom) + ' row ' + JSON.stringify(e.p.row)
          + ' : ' + JSON.stringify(rs.map(r => r.id)) + ' (attendu ' + att + ')');
      });
      cd.rows.forEach(r => txt.push(r.label)); L.forEach(a => txt.push(a.obs)); an.controles.forEach(c => txt.push(c.txt)); txt.push(dxf(d).texte);
      if (txt.some(s => typeof s !== 'string' || /undefined|\[object/.test(s))) mal.push('graine ' + graine + ' : « undefined » dans ' + JSON.stringify(txt.filter(s => typeof s !== 'string' || /undefined|\[object/.test(s))).slice(0, 120));
    } catch (e){ ex.push('graine ' + graine + ' : ' + e.message); }
  }
  R.ok(n >= 50 && ka >= k / 2 && !ex.length, 'g8 ' + n + ' croquis à génériques (' + k + ' génériques, dont ' + ka + ' analysés, la moitié au moins attendue) : aucune exception'
    + (ex.length ? ' (' + ex.length + ' : ' + ex.slice(0, 3).join(' | ') + ')' : ''));
  R.ok(!mal.length, 'g8 chaque générique compté sur une ligne, celle de son row valide ou sa ligne « Autres » ; ni « undefined » ni « Autre destination »'
    + (mal.length ? ' (' + mal.length + ' : ' + mal.slice(0, 3).join(' | ') + ')' : ''));
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
    for (const g of [g1, g1bis, g2, g3, g4, g5, g6, g7, g8]){
      try { await g(); } catch (e){ R.ok(false, g.name + ' : exception : ' + (e && e.stack || e).toString().split('\n').slice(0, 3).join(' | ')); }
    }
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
