// Boîte de branchement en limite de propriété (souhait 10 ; décision D4 de .claude/conception-outils-dessin.md), sans navigateur ; plan PDF
// par la bibliothèque PDF de l'application ; croquis fictifs (12 rue Fictive, Ville-Exemple). m103 : champs p.limCote et p.limDist, ligne
// de l'étiquette ; m104 : parcelle de l'installation et distance de la boîte à sa limite (décision D5) ; m105 complétera ce fichier
// (reprise au constat).
// l1 à l19 (m103) : VCroquis.texteLimite : « à 0,80 m de la limite, intérieur » ou « …, extérieur » ; distance 0 : « en limite de
//   propriété », avec ou sans côté ; distance sans côté : « à 0,80 m de la limite » ; côté sans distance : « côté intérieur » ou « côté
//   extérieur » ; ni l'un ni l'autre : rien ; distance écrite avec deux décimales et la virgule (saisies « 0,8 », « 2 », « 0.5 », « 1,5 »
//   entouré d'espaces) ; valeur que la fiche refuse (« -1 », texte), venue d'un croquis altéré : la distance est ignorée.
// e1 à e6 (m103) : la ligne s'ajoute en dernière ligne à l'étiquette de la boîte (texteEtiquette), boîte « Projet » comprise ; témoins : une
//   boîte sans ces champs garde son étiquette ; une étiquette personnalisée remplace tout, ligne comprise (comme la profondeur) ; un regard
//   et un regard public qui porteraient ces champs n'en écrivent rien.
// s1 à s3 (m103) : toutes les lignes de l'étiquette, celle de la limite comprise, sont dans le texte du plan PDF de l'état des lieux et de
//   l'avant-projet (capture des textes comme vm/avant-projet.js) et dans des entités TEXT du DXF (calque VEDE-ETIQUETTES).
// Tous échouent sur df95377 (VCroquis.texteLimite absente, aucune ligne), sauf les témoins.
// p1 à p10 (m104) : VCroquis.geo.parcelleInstallation(lignes, objets) : sur le fond et le croquis de démonstration, la parcelle de 12 m sur
//   34 m qui porte l'installation (p1) ; la boîte EU y est à 0,80 m, à l'intérieur (p2). Fond fictif construit dans le test (parcelles A, B,
//   D fermées, C ouverte ou fermée, bâti dans B) : la limite fermée qui contient le plus d'objets existants l'emporte ; les objets « projet »
//   et « à supprimer » ne comptent pas ; le bâti n'est pas une limite (p3 : 1 objet dans A, 2 dans B, tous deux dans le bâti : B) ;
//   égalité au plus haut : null (p4) ; égalité plus bas : sans effet (p5) ; parcelle ouverte : null, témoin fermée (p6) ; aucun objet,
//   objets dans la rue, objets « projet » seulement : null ; un raccord compte (p7) ; un escalier et un trait de complément fermé ne
//   comptent pas (p8) ; entrées invalides : null sans exception (p9) ; fond masqué : null (p10).
// m1 à m7 (m104) : VCroquis.geo.distanceLimite(p, ligne) sur la parcelle A : à 0,80 m à l'intérieur, d = 0,8 à 1e-9, côté 'int', pied sur
//   le côté 0 (m1) ; à 0,20 m : douteux (m2) ; à 0,30 m : pas douteux, seuil strict (m3) ; à l'extérieur : 'ext' (m4) ; côté le plus proche
//   (m5) ; sur la limite : 0, 'ext', douteux (m6) ; ligne ouverte, point ou ligne invalide : null sans exception (m7).
// p et m échouent sur 5026c32 (VCroquis.geo.parcelleInstallation et distanceLimite absentes).
// usage : node tests/vm/boite.js [-v] [--app=<dossier>]
'use strict';
const {charger, rapport} = require('./charger.js');
const {V, ctx} = charger({pdf: true}), R = rapport('boite');
const copie = x => JSON.parse(JSON.stringify(x));
/* appel protégé : une exception devient le texte « exception : … » */
const sur = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };

/* Croquis fictif : WC, boîte EU, regard public sur le collecteur EU */
function nouveau(){ return V.nouveauDoc({numero: 'F-001', adresse: '12 rue Fictive', commune: 'Ville-Exemple'}); }
function pt(d, id, t, x, y, p){ const e = {id, k: 'pt', t, x, y, p: Object.assign(V.defautsPt(t), {meth: ['eau']}, p || {}), lab: null}; d.el.push(e); return e; }
function ln(d, id, t, res, v){
  const pos = {}; d.el.forEach(e => { if (e.k === 'pt') pos[e.id] = e; });
  const p = V.defautsLn(t, {res: res || ''}); p.res = t === 'col' ? (res || 'EU') : (res || '');
  d.el.push({id, k: 'ln', t, v: v.map(q => typeof q === 'string' ? {x: pos[q].x, y: pos[q].y, a: q} : {x: q[0], y: q[1], a: null}), p, lab: null});
}
const LIMITE = {limCote: 'int', limDist: '0,80'};
function maison(pb){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 10); pt(d, 'B1', 'boite', 0, 4, Object.assign({res: 'EU', dim: '40×40', prof: '0,80', tampon: 'fonte'}, pb || {}));
  pt(d, 'Rp', 'regard_pub', 0, 0, {res: 'EU'});
  ln(d, 'tW', 'tr', 'EU', ['W', 'B1']); ln(d, 'tB', 'tr', '', ['B1', 'Rp']); ln(d, 'C', 'col', 'EU', [[-10, 0], 'Rp', [10, 0]]);
  return d;
}
const elDe = (d, id) => d.el.find(e => e.id === id);
/* étiquette d'un élément du croquis, après l'analyse de l'état des lieux (ou de l'avant-projet) */
const etiquette = (d, id, mode) => sur(() => V.texteEtiquette(elDe(d, id), V.analyser(copie(d), mode || 'edl')));

/* l : texteLimite */
function limite(){
  if (typeof V.texteLimite !== 'function'){ R.ok(false, 'l : VCroquis.texteLimite est absente'); return; }
  const cas = [
    ['l1 intérieur, 0,80', {limCote: 'int', limDist: '0,80'}, 'à 0,80 m de la limite, intérieur'],
    ['l2 extérieur, 1,25', {limCote: 'ext', limDist: '1,25'}, 'à 1,25 m de la limite, extérieur'],
    ['l3 intérieur, 0', {limCote: 'int', limDist: '0'}, 'en limite de propriété'],
    ['l4 extérieur, 0', {limCote: 'ext', limDist: '0'}, 'en limite de propriété'],
    ['l5 0 sans côté', {limDist: '0'}, 'en limite de propriété'],
    ['l6 « 0,00 », côté vide', {limCote: '', limDist: '0,00'}, 'en limite de propriété'],
    ['l7 distance sans côté', {limCote: '', limDist: '0,80'}, 'à 0,80 m de la limite'],
    ['l8 côté intérieur sans distance', {limCote: 'int'}, 'côté intérieur'],
    ['l9 côté extérieur, distance vide', {limCote: 'ext', limDist: ''}, 'côté extérieur'],
    ['l10 aucun champ', {}, ''],
    ['l11 champs vides', {limCote: '', limDist: ''}, ''],
    ['l12 virgule, un seul chiffre : « 0,8 »', {limCote: 'int', limDist: '0,8'}, 'à 0,80 m de la limite, intérieur'],
    ['l13 entier : « 2 »', {limCote: 'ext', limDist: '2'}, 'à 2,00 m de la limite, extérieur'],
    ['l14 point décimal : « 0.5 »', {limDist: '0.5'}, 'à 0,50 m de la limite'],
    ['l15 espaces autour : « 1,5 »', {limCote: 'int', limDist: ' 1,5 '}, 'à 1,50 m de la limite, intérieur'],
    ['l16 « -1 » (refusé par la fiche, croquis altéré) : distance ignorée', {limCote: 'int', limDist: '-1'}, 'côté intérieur'],
    ['l17 texte non numérique (croquis altéré) : distance ignorée', {limDist: 'loin'}, ''],
    ['l18 côté inconnu (croquis altéré) : ignoré', {limCote: 'nord', limDist: '0,80'}, 'à 0,80 m de la limite'],
  ];
  cas.forEach(([n, p, att]) => { const vu = sur(() => V.texteLimite(p)); R.ok(vu === att, n + ' → ' + JSON.stringify(att) + ' (obtenu ' + JSON.stringify(vu) + ')'); });
  const vu = sur(() => V.texteLimite(undefined));
  R.ok(vu === '', 'l19 sans propriétés : rien (obtenu ' + JSON.stringify(vu) + ')');
}

/* e : la ligne dans l'étiquette de la boîte */
function etiquettes(){
  const BASE = 'Boîte de branchement EU\n40×40, P : 0,80 m, tampon fonte';
  const d0 = maison(), d1 = maison(LIMITE);
  const e0 = etiquette(d0, 'B1'), e1 = etiquette(d1, 'B1');
  R.ok(e0 === BASE, 'e1 témoin : boîte sans ces champs, étiquette inchangée ' + JSON.stringify(e0));
  R.ok(e1 === BASE + '\nà 0,80 m de la limite, intérieur', 'e2 boîte intérieur, 0,80 : la ligne s\'ajoute en dernière ligne (obtenu ' + JSON.stringify(e1) + ')');
  const d2 = maison({dim: '', prof: '', tampon: '', limCote: 'ext', limDist: '0'}), e2 = etiquette(d2, 'B1');
  R.ok(e2 === 'Boîte de branchement EU\nen limite de propriété', 'e3 boîte sans dimension, profondeur ni tampon, en limite (obtenu ' + JSON.stringify(e2) + ')');
  const d3 = maison({limCote: 'ext', st: 'projet'}), e3 = etiquette(d3, 'B1', 'avp');
  R.ok(e3 === 'Projet : ' + BASE + '\ncôté extérieur', 'e4 boîte « Projet », côté sans distance (obtenu ' + JSON.stringify(e3) + ')');
  const d4 = maison(Object.assign({etiq: 'Boîte EU\nsous le portail'}, LIMITE)), e4 = etiquette(d4, 'B1');
  R.ok(e4 === 'Boîte EU\nsous le portail', 'e5 témoin : l\'étiquette personnalisée remplace tout, ligne comprise, comme la profondeur (obtenu ' + JSON.stringify(e4) + ')');
  /* regard sur le tuyau de la boîte, regard public : les champs (posés à la main dans le croquis) n'y écrivent rien */
  const d5 = maison(); pt(d5, 'R1', 'regard', 0, 7, {dim: '40×40', prof: '0,80'}); ln(d5, 'tR', 'tr', '', ['R1', 'B1']);
  const d6 = copie(d5); Object.assign(elDe(d6, 'R1').p, LIMITE); Object.assign(elDe(d6, 'Rp').p, LIMITE);
  const r0 = etiquette(d5, 'R1'), r1 = etiquette(d6, 'R1'), q0 = etiquette(d5, 'Rp'), q1 = etiquette(d6, 'Rp');
  R.ok(r0 === r1 && q0 === q1 && !/limite/.test(r1 + q1), 'e6 témoin : regard et regard public avec ces champs, étiquettes inchangées ('
    + JSON.stringify(r1) + ' ; ' + JSON.stringify(q1) + ')');
}

/* s : plan PDF (état des lieux, avant-projet) et DXF */
async function textesPdf(doc, o){
  const J0 = ctx.jspdf.jsPDF, txt = [];
  const W = function(){ const d = new J0(...arguments); const ot = d.text; d.text = function(t){ try { txt.push([].concat(t).join(' ')); } catch (e){} return ot.apply(d, arguments); }; return d; };
  W.API = J0.API; ctx.jspdf.jsPDF = W;
  try { await V.pdfPlan(copie(doc), null, o || {}); } catch (e){ txt.push('ERR ' + e.message); } finally { ctx.jspdf.jsPDF = J0; }
  return txt;
}
/* entités TEXT du DXF : {cal : calque (code 8), txt : texte (code 1)} ; le DXF est en CP1252, lu en latin1 (mêmes octets pour « à », « é », « × ») */
function textesDxf(doc){
  const x = Buffer.from(V.ecrireDxf(copie(doc))).toString('latin1').split('\r\n'), out = [];
  for (let i = 0; i + 1 < x.length; i += 2){
    if (x[i].trim() !== '0' || x[i + 1] !== 'TEXT') continue;
    const t = {};
    for (let j = i + 2; j + 1 < x.length && x[j].trim() !== '0'; j += 2) t[x[j].trim()] = x[j + 1];
    out.push({cal: t['8'], txt: t['1']});
  }
  return out;
}
async function sorties(){
  const d = maison(LIMITE), lignes = ['Boîte de branchement EU', '40×40, P : 0,80 m, tampon fonte', 'à 0,80 m de la limite, intérieur'];
  for (const [n, mode] of [['s1 plan PDF de l\'état des lieux', 'edl'], ['s2 plan PDF de l\'avant-projet', 'avp']]){
    const txt = await textesPdf(d, {mode}), manque = lignes.filter(l => txt.indexOf(l) < 0), err = txt.filter(t => /^ERR/.test(t));
    R.ok(!manque.length && !err.length, n + ' : les trois lignes de l\'étiquette de la boîte sont imprimées'
      + (manque.length ? ' (absentes : ' + JSON.stringify(manque) + ')' : '') + (err.length ? ' ' + err.join(' | ') : ''));
  }
  const t = sur(() => textesDxf(d));
  if (typeof t === 'string'){ R.ok(false, 's3 DXF : ' + t); return; }
  const manque = lignes.filter(l => !t.some(q => q.cal === 'VEDE-ETIQUETTES' && q.txt === l));
  R.ok(!manque.length, 's3 DXF : chaque ligne de l\'étiquette de la boîte est une entité TEXT du calque VEDE-ETIQUETTES'
    + (manque.length ? ' (absentes : ' + JSON.stringify(manque) + ' ; textes : ' + JSON.stringify(t.map(q => q.txt).slice(0, 12)) + ')' : ''));
}

/* m104 : parcelle de l'installation (VCroquis.geo.parcelleInstallation) et distance d'une boîte à sa limite (VCroquis.geo.distanceLimite) */
const G = V.geo;
/* fond fictif : DXF R12, polylignes aux points (x, y) en mètres comptés depuis l'origine fictive de la démonstration ; le croquis a cette
   origine, ses coordonnées sont donc celles du fond (nombres exacts) */
const ORIG = {x: 1700000, y: 8200000};
function polyDxf(lay, pts, ferme){
  const L = [], g = (c, v) => L.push(('   ' + c).slice(-3), String(v)), f = x => x.toFixed(3);
  g(0, 'POLYLINE'); g(8, lay); g(66, 1); g(10, '0.0'); g(20, '0.0'); g(30, '0.0'); g(70, ferme ? 1 : 0);
  pts.forEach(([x, y]) => { g(0, 'VERTEX'); g(8, lay); g(10, f(ORIG.x + x)); g(20, f(ORIG.y + y)); g(30, '0.0'); });
  g(0, 'SEQEND'); g(8, lay);
  return L.join('\r\n') + '\r\n';
}
const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
const fondFictif = polys => V.lireFondDxf(Buffer.from('  0\r\nSECTION\r\n  2\r\nENTITIES\r\n' + polys.join('') + '  0\r\nENDSEC\r\n  0\r\nEOF\r\n', 'utf8'), 'Plan fictif');
/* parcelles A (0 à 20 m), B (20 à 40 m) et D (au nord de A), fermées ; C (40 à 60 m) ouverte, ou fermée (cFermee) ; un bâti fermé dans B ;
   un trait du calque SECTION (écarté des limites) autour de tout */
const parcellesFictives = cFermee => fondFictif([polyDxf('1PARCELLE', rect(0, 0, 20, 30), true), polyDxf('1PARCELLE', rect(20, 0, 40, 30), true),
  polyDxf('1PARCELLE', rect(40, 0, 60, 30), !!cFermee), polyDxf('1PARCELLE', rect(0, 40, 20, 60), true), polyDxf('3BATIDUR', rect(24, 8, 36, 20), true),
  polyDxf('1SECTION', rect(-10, -10, 70, 70), true)]);
/* croquis fictif de même origine que le fond ; objets [id, type, x, y, statut] */
function croquisLim(objs){
  const d = nouveau(); d.origine = {x: ORIG.x, y: ORIG.y}; d.u = 1;
  objs.forEach(([id, t, x, y, st]) => pt(d, id, t, x, y, st ? {st} : {}));
  return d;
}
/* nom d'une parcelle fictive d'après ses sommets (A, B, C, D), ou ce que la fonction a rendu */
function nomParcelle(l){
  if (l === null || typeof l !== 'object') return typeof l === 'string' ? l : JSON.stringify(l);
  if (!Array.isArray(l.P)) return 'objet sans sommets';
  const xs = l.P.map(q => q.x), ys = l.P.map(q => q.y), x0 = Math.min(...xs), y0 = Math.min(...ys);
  return (l.nat === 'limite' ? '' : l.nat + ' ') + (y0 === 40 ? 'D' : x0 === 0 ? 'A' : x0 === 20 ? 'B' : x0 === 40 ? 'C' : '?(' + x0 + ', ' + y0 + ')');
}
function parcelle(){
  if (typeof G.parcelleInstallation !== 'function' || typeof G.distanceLimite !== 'function'){
    R.ok(false, 'p, m : VCroquis.geo.parcelleInstallation ou VCroquis.geo.distanceLimite est absente (' + typeof G.parcelleInstallation + ', ' + typeof G.distanceLimite + ')');
    return;
  }
  /* p1, p2 : démonstration (fond VCroquis.demoDxf(), croquis VCroquis.demoCroquis) : la parcelle de 12 m sur 34 m qui porte l'installation */
  const fd = V.lireFondDxf(Buffer.from(V.demoDxf(), 'utf8'), 'Plan fictif'), dd = copie(V.demoCroquis(fd)), ld = G.lignesRef(dd, fd);
  const pd = sur(() => G.parcelleInstallation(ld, dd.el)), bEU = dd.el.find(e => e.t === 'boite' && e.p.res === 'EU');
  const okD = !!pd && typeof pd === 'object' && ld.indexOf(pd) >= 0 && pd.nat === 'limite' && pd.ferme && Math.abs(Math.abs(pd.aire) - 408) < .5 && G.dansPolygone(bEU, pd.P) === true;
  R.ok(okD, 'p1 démonstration : la parcelle de l\'installation est la limite fermée de 12 m sur 34 m qui contient la boîte EU (obtenu '
    + (pd && typeof pd === 'object' ? pd.nat + ', ' + (pd.ferme ? 'fermée' : 'ouverte') + ', aire ' + Math.abs(pd.aire).toFixed(2) + ' m², rang ' + ld.indexOf(pd) : JSON.stringify(pd)) + ')');
  const md = okD ? sur(() => G.distanceLimite(bEU, pd)) : null;
  R.ok(!!md && typeof md === 'object' && Math.abs(md.d - .8) < .001 && md.cote === 'int' && md.douteux === false && G.distPolygone(md.proj, pd.P).d < 1e-6,
    'p2 démonstration : la boîte EU est à 0,80 m de cette limite, à l\'intérieur, côté sûr ; le pied est sur la limite (obtenu ' + JSON.stringify(md) + ')');

  /* p3 à p10 : fond fictif (parcelles A, B, D fermées, C ouverte) */
  const f1 = parcellesFictives(false), f2 = parcellesFictives(true);
  const cas = (n, f, objs, att, plus) => {
    const d = croquisLim(objs); if (plus) plus(d);
    const lr = G.lignesRef(d, f), vu = sur(() => G.parcelleInstallation(lr, d.el)), nom = vu === null ? 'null' : nomParcelle(vu);
    R.ok(nom === att && (vu === null || lr.indexOf(vu) >= 0), n + ' → ' + att + ' (obtenu ' + nom + ')');
  };
  cas('p3 parcelle A : 3 objets existants ; B : 2 existants, 2 « projet » et 1 « à supprimer », qui ne comptent pas', f1,
    [['W', 'wc', 5, 20], ['B1', 'boite', 10, .8], ['R1', 'regard', 10, 5], ['W2', 'wc', 30, 15], ['D2', 'descente', 26, 10], ['L2', 'lavabo', 30, 12, 'projet'],
      ['E2', 'evier', 32, 12, 'projet'], ['R2', 'regard', 35, 5, 'supprimer']], 'A');
  /* le bâti fermé de B (24 ; 8 à 36 ; 20) contient W2 et D2 : compté comme une limite, il ferait égalité au plus haut avec B */
  cas('p3 le bâti fermé n\'est pas une limite : 1 objet dans A ; 2 dans B, tous deux dans le bâti de B (compté, il ferait égalité avec B : null)', f1,
    [['W', 'wc', 5, 20], ['W2', 'wc', 30, 15], ['D2', 'descente', 26, 10]], 'B');
  cas('p4 égalité au plus haut : 2 objets dans A, 2 dans B', f1, [['W', 'wc', 5, 20], ['B1', 'boite', 10, .8], ['W2', 'wc', 30, 15], ['B2', 'boite', 30, .8]], 'null');
  cas('p5 égalité plus bas, sans effet : 3 objets dans A, 1 dans B, 1 dans D', f1,
    [['W', 'wc', 5, 20], ['B1', 'boite', 10, .8], ['R1', 'regard', 10, 5], ['W2', 'wc', 30, 15], ['P4', 'puisard', 10, 50]], 'A');
  const dansC = [['W', 'wc', 45, 20], ['B1', 'boite', 50, .8], ['R1', 'regard', 50, 5]];
  cas('p6 parcelle ouverte : 3 objets dans C, ouverte : aucune parcelle', f1, dansC, 'null');
  cas('p6 témoin : les mêmes objets, C fermée', f2, dansC, 'C');
  cas('p7 aucun objet', f1, [], 'null');
  cas('p7 objets hors de toute parcelle (dans la rue)', f1, [['B1', 'boite', 10, -3], ['R1', 'regard', 30, -5]], 'null');
  cas('p7 objets « projet » seulement', f1, [['B1', 'boite', 10, .8, 'projet'], ['R1', 'regard', 10, 5, 'projet']], 'null');
  cas('p7 un raccord compte comme les autres objets ponctuels (A : 1 objet et 1 raccord ; B : 1 objet)', f1,
    [['B1', 'boite', 10, .8], ['J1', 'jonction', 10, 10], ['W2', 'wc', 30, 15]], 'A');
  /* p8 : un escalier (tracé t 'esc') dans B, et un trait « Complément du fond » fermé autour des objets de B, ne comptent pas */
  cas('p8 escalier et trait de complément fermé dans B : ni objets ni limites (1 objet dans A, 1 dans B : égalité)', f1, [['W', 'wc', 5, 20], ['W2', 'wc', 30, 15]], 'null', d => {
    d.el.push({id: 'E1', k: 'ln', t: 'esc', v: [{x: 25, y: 22, a: null}, {x: 35, y: 22, a: null}], p: {st: 'existant', larg: '1,00', n: '6', cote: 'g', monte: 'fin'}, lab: null});
    d.el.push({id: 'K1', k: 'ln', t: 'lim', v: [[22, 2], [38, 2], [38, 28], [22, 28], [22, 2]].map(([x, y]) => ({x, y, a: null})), p: {st: 'existant'}, lab: null});
  });
  cas('p8 objets seulement dans un trait de complément fermé, hors des parcelles : aucune parcelle', f1, [['B1', 'boite', 10, -3]], 'null', d => {
    d.el.push({id: 'K1', k: 'ln', t: 'lim', v: [[2, -8], [18, -8], [18, -1], [2, -1], [2, -8]].map(([x, y]) => ({x, y, a: null})), p: {st: 'existant'}, lab: null});
  });
  const d9 = croquisLim([['B1', 'boite', 10, .8]]), l9 = G.lignesRef(d9, f1);
  const inv = [['lignes absentes', () => G.parcelleInstallation(null, d9.el)], ['objets absents', () => G.parcelleInstallation(l9, null)],
    ['lignes en texte', () => G.parcelleInstallation('A', d9.el)], ['éléments qui ne sont pas des objets', () => G.parcelleInstallation(l9, [null, 3, 'texte', {k: 'pt'}, {k: 'pt', x: NaN, y: 1}])],
    ['lignes qui ne sont pas des objets', () => G.parcelleInstallation([null, 7, {nat: 'limite', ferme: true}, {nat: 'limite', ferme: true, aire: 600, P: [null]}], d9.el)]];
  inv.forEach(([n, f]) => { const vu = sur(f); R.ok(vu === null, 'p9 entrée invalide (' + n + ') : null, sans exception (obtenu ' + (vu && typeof vu === 'object' ? nomParcelle(vu) : JSON.stringify(vu)) + ')'); });
  const v10 = sur(() => G.parcelleInstallation(G.lignesRef(d9, null), d9.el));
  R.ok(v10 === null, 'p10 fond masqué (lignes du fond absentes) : aucune parcelle (obtenu ' + (v10 && typeof v10 === 'object' ? nomParcelle(v10) : JSON.stringify(v10)) + ')');

  /* m : distance à la limite A (0 à 20 m sur 0 à 30 m), mesurée depuis le plan */
  const A = G.lignesRef(d9, f1, null, ['limite']).find(l => nomParcelle(l) === 'A'), C = G.lignesRef(d9, f1, null, ['limite']).find(l => nomParcelle(l) === 'C');
  const mes = (n, p, att) => {
    const vu = sur(() => G.distanceLimite(p, A));
    const ok = !!vu && typeof vu === 'object' && Math.abs(vu.d - att.d) <= 1e-9 && vu.cote === att.cote && vu.douteux === att.douteux && vu.seg === att.seg
      && !!vu.proj && Math.abs(vu.proj.x - att.proj[0]) <= 1e-9 && Math.abs(vu.proj.y - att.proj[1]) <= 1e-9;
    R.ok(ok, n + ' (obtenu ' + JSON.stringify(vu) + ')');
  };
  mes('m1 boîte à 0,80 m à l\'intérieur : d = 0,8 à 1e-9, côté intérieur, sûr, pied (10 ; 0) sur le côté 0', {x: 10, y: .8}, {d: .8, cote: 'int', douteux: false, seg: 0, proj: [10, 0]});
  mes('m2 boîte à 0,20 m à l\'intérieur : douteux (moins de 0,30 m)', {x: 10, y: .2}, {d: .2, cote: 'int', douteux: true, seg: 0, proj: [10, 0]});
  mes('m3 boîte à 0,30 m : pas douteux (seuil strict)', {x: 10, y: .3}, {d: .3, cote: 'int', douteux: false, seg: 0, proj: [10, 0]});
  mes('m4 boîte à 1,50 m à l\'extérieur : côté extérieur', {x: 10, y: -1.5}, {d: 1.5, cote: 'ext', douteux: false, seg: 0, proj: [10, 0]});
  mes('m5 côté le plus proche : à 1 m du côté est (côté 1)', {x: 19, y: 15}, {d: 1, cote: 'int', douteux: false, seg: 1, proj: [20, 15]});
  mes('m6 boîte sur la limite : distance 0, extérieur, douteux', {x: 10, y: 0}, {d: 0, cote: 'ext', douteux: true, seg: 0, proj: [10, 0]});
  const nuls = [['ligne ouverte', () => G.distanceLimite({x: 50, y: 5}, C)], ['point absent', () => G.distanceLimite(null, A)], ['point non fini', () => G.distanceLimite({x: NaN, y: 1}, A)],
    ['ligne absente', () => G.distanceLimite({x: 10, y: .8}, null)], ['ligne sans sommets', () => G.distanceLimite({x: 10, y: .8}, {nat: 'limite', ferme: true})]];
  nuls.forEach(([n, f]) => { const vu = sur(f); R.ok(vu === null, 'm7 ' + n + ' : null, sans exception (obtenu ' + JSON.stringify(vu) + ')'); });
}

(async () => {
  limite();
  etiquettes();
  await sorties();
  parcelle();
  R.fin();
})().catch(e => { console.log('ERREUR ' + (e && e.stack || e)); process.exitCode = 1; });
