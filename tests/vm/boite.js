// Boîte de branchement en limite de propriété (souhait 10 ; décision D4 de .claude/conception-outils-dessin.md), sans navigateur ; plan PDF
// par la bibliothèque PDF de l'application ; croquis fictifs (12 rue Fictive, Ville-Exemple). m103 : champs p.limCote et p.limDist, ligne
// de l'étiquette ; m104 : parcelle de l'installation et distance de la boîte à sa limite (décision D5) ; m105 : boîte reprise au constat
// (décision D6, réponse 10.4) ; m140 : côté écrit en toutes lettres, boîte en zone unitaire (décisions D5 et D6 de
// .claude/conception-v172.md).
// l1 à l19 (m103) : VCroquis.texteLimite : « à 0,80 m de la limite, à l'intérieur de la propriété » ou « …, à l'extérieur de la
//   propriété » (m140 ; avant : « …, intérieur » ou « …, extérieur ») ; distance 0 : « en limite de propriété », avec ou sans côté ;
//   distance sans côté : « à 0,80 m de la limite » ; côté sans distance : « à l'intérieur de la propriété » ou « à l'extérieur de la
//   propriété » (m140 ; avant : « côté intérieur » ou « côté extérieur ») ; ni l'un ni l'autre : rien ; distance écrite avec deux décimales
//   et la virgule (saisies « 0,8 », « 2 », « 0.5 », « 1,5 » entouré d'espaces) ; valeur que la fiche refuse (« -1 », texte), venue d'un
//   croquis altéré : la distance est ignorée.
// l20 à l27 (m140, réponse boite-en-limite du 16 nov. 2026) : intérieur et extérieur avec une distance, puis côté seul, en toutes lettres
//   (échouent sur 1ee93f4) ; témoins : « en limite de propriété » (moins de 5 mm avec un côté, « -0 » sans côté), « à 0,80 m de la limite »
//   (distance seule), rien.
// e1 à e6 (m103) : la ligne s'ajoute en dernière ligne à l'étiquette de la boîte (texteEtiquette), boîte « Projet » comprise ; témoins : une
//   boîte sans ces champs garde son étiquette ; une étiquette personnalisée remplace tout, ligne comprise (comme la profondeur) ; un regard
//   et un regard public qui porteraient ces champs n'en écrivent rien. e2 et e4 attendent l'écriture de m140.
// s1 à s3 (m103) : toutes les lignes de l'étiquette, celle de la limite comprise, sont dans le texte du plan PDF de l'état des lieux et de
//   l'avant-projet (capture des textes comme vm/avant-projet.js) et dans des entités TEXT du DXF (calque VEDE-ETIQUETTES), telles quelles
//   (m140 : « à 0,80 m de la limite, à l'intérieur de la propriété », apostrophe comprise).
// Tous échouent sur df95377 (VCroquis.texteLimite absente, aucune ligne), sauf les témoins ; l1, l2, l8, l9, l12, l13, l15, l16, e2, e4 et
// s1 à s3 échouent aussi sur 1ee93f4 (ancienne écriture).
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
// c1 à c18 (m105) : VCroquis.boitesConstat(doc, an) : {EU: {n, dist, cote, prof, nDist, nProf}, EP: {…}} d'après les boîtes existantes ;
//   aucune boîte (c1) ; une boîte EU : « 0,80 m », côté « intérieur », et « 0,80 m » (c2) ; deux boîtes EU : rien de repris en EU (c3) ;
//   une boîte par réseau (c4) ; boîte unitaire comptée en EU et en EP (c5), avec une boîte EP en plus : rien en EP (c6) ; réseau déduit du
//   dessin, en EU et en EP (c7) ; boîte sans réseau, ni indiqué ni déduit : comptée nulle part (c8) ; boîtes « projet » et « à supprimer »
//   ignorées (c9) ; boîte « présumée » comptée (c10) ; regard et regard public ignorés (c11) ; distance et côté : « 1,25 m » et
//   « extérieur », « en limite » sans côté (la fiche en ait un ou non), « 0,80 m » (sans côté), côté « intérieur » sans distance, rien,
//   deux décimales et la virgule, distance négative ou illisible ignorée (c12) ;
//   profondeur : « 0,80 m », deux décimales, rien si elle manque ou est illisible (c13) ; ni le croquis ni l'analyse ne changent (c14) ;
//   sans analyse, le réseau indiqué seul (c15) ; entrées invalides sans exception (c16) ; nDist et nProf, nombre de boîtes du réseau qui
//   portent une distance et une profondeur (c17 ; m149 : un côté seul ne compte pas dans nDist) ; zone unitaire : deux boîtes sans réseau
//   indiqué, B1 qui reçoit le WC, B2 la descente, en parallèle, sont unitaires d'après leur étiquette ; m140 : B1 compte en EU, B2 en EP,
//   leurs valeurs sont reprises (avant m140 : deux boîtes en EU et en EP, rien de repris) ; le réseau indiqué dans leur fiche les sépare,
//   sans anomalie de collecteur (c18). Échouent sur ddb0b74 (VCroquis.boitesConstat absente), sauf les témoins de c18 (étiquettes,
//   anomalie). m149 : la distance s'écrit seule et le côté à part (avant : « 0,80 m intérieur ») ; c1 à c33 vérifient aussi le côté, sauf
//   c13 (profondeur), c14 et c17.
// c19 à c30 (m140, réponse pr12-5 du 16 nov. 2026, décision D6) : en zone unitaire, une boîte sans réseau indiqué que le dessin dit unitaire
//   compte pour le réseau des sources dont l'eau la traverse : B1 (WC) et B2 (descente) en parallèle, tuyaux réunis sur un raccord avant le
//   regard public : B1 en EU, B2 en EP (c19) ; en série, WC → B1 → B2 → collecteur unitaire, avec une descente vers un puisard (c20) ou sans
//   descente (c21) : B1 et B2 en EU, rien de repris, aucune boîte en EP (avant : deux en EP) ; autre appareil EU et autre ouvrage EP
//   (m132 ; c26) ; drain de collecte tracé, source linéaire EP (m123 ; c27) ; réseau lu dans an.ref (c28 : analyse retouchée par le test,
//   l'application ne passe jamais par là) ; tuyaux tracés à l'outil « Tronçon unitaire » (c30). Échouent sur 1ee93f4. Témoins (passent sur
//   1ee93f4) : boîte qui reçoit le WC et la descente : EU et EP (c22) ; boîte indiquée EP dans sa fiche, qui reçoit le WC : EP seulement
//   (c23) ; boîte indiquée unitaire dans sa fiche, qui ne reçoit que le WC : EU et EP (c24, F8) ; boîte qu'aucune source ne traverse
//   (appareils non dessinés, tuyau laissé libre côté maison) : EU et EP (c25) ; boîtes mixtes d'après le dessin (tuyaux d'amont tracés à
//   l'outil « Tronçon EU » et « Tronçon EP ») : comptées nulle part (c29, jusqu'à m164 ; depuis m164 : B1 en EU, B2 en EP, comme c30).
// c31 à c33 (m140, relecture) : une seule boîte, qui ne reçoit que le WC : EU seulement, aucune en EP (c31) ; B1 reçoit le WC, B3 à côté
//   ne reçoit rien : deux en EU, B3 seule en EP (c32) ; c31 et c32 échouent sur 1ee93f4. Boucle : boîte sur le tuyau qui relie la branche
//   du WC à celle de la descente, hors des plus courts chemins des deux sources : EU et EP, quel que soit le sens des flèches du plan (c33,
//   avec un témoin sur ces flèches ; passe sur 1ee93f4, échouait sur la première version de m140, qui suivait les flèches).
// c34 à c38 (m149, décision D17, réponses pr12-11 du 16 nov. et S3 du 17 nov. 2026) : la distance s'écrit seule et le côté à part, dans
//   cote ('intérieur', 'extérieur' ou '') : « 0,80 m » et « intérieur » (c34) ; en limite : pas de côté (c35) ; deux boîtes sur le réseau,
//   toutes deux à l'intérieur : ni distance ni côté (c36) ; côté sans distance : distance vide, côté gardé (c37). Échouent sur edae8d8
//   (« 0,80 m intérieur », pas de côté à part ; 88/148), comme c1 à c33, sauf c13, c14, c17 (hors de ses deux cas m149) et les témoins
//   (étiquettes, analyse inchangée, flèches du plan). Les deux cas m149 de c17 (boîtes avec un côté seul, défaut M1 de la relecture)
//   échouent aussi sur la première version de m149, qui comptait un côté seul comme une distance (146/148). Témoin : l'étiquette du plan et
//   texteLimite gardent « à 0,80 m de la limite, à l'intérieur de la propriété » (c38).
// c39 à c48 (m156, AC1 de la relecture d'ensemble de la v1.7.2) : en zone unitaire, une boîte sur le trop-plein orienté d'un puisard
//   compte pour la source quand l'analyse compte ce que ce trop-plein atteint (m145 : apres, ou « multiple » tiré du trop-plein) ; le
//   chemin de l'eau le comprend. WC → B1 → collecteur et descente → puisard → trop-plein → B2 → collecteur : B1 en EU, B2 en EP (c39 ;
//   avant : B2 qu'aucune source ne traverse, deux boîtes en EU) ; trop-plein vers B1, qui reçoit aussi le WC : B1 en EU et en EP (c40 ;
//   avant : en EU seulement) ; sans WC : B2 en EP, aucune en EU (c41) ; drain d'infiltration qui tient le puisard (« au-delà du drain »,
//   c42) ; deux trop-pleins de plus, vers deux autres destinations : « multiple » tiré du trop-plein, B2 en EP (c47) ; boucle sur le
//   trop-plein, à l'image de c33 : B3, sur le tuyau qui relie ses deux branches, hors des plus courts chemins, en EU et en EP (c48).
//   Échouent sur c5f8caf (155/163, avec la seconde vérification de c46). Témoins (passent sur c5f8caf) : descente vers B1 sans puisard ;
//   trop-plein sans sens, boîte mêlée d'après le dessin (c43) ; bifurcation avant le puisard vers un second collecteur (c44 : le
//   trop-plein atteint un exutoire de plus, le second parcours de l'analyse est gardé, mais la bifurcation filtre les réseaux :
//   « multiple », sans chemin par le trop-plein) ; trop-plein laissé libre (c45) ; l'analyse ne change pas, sans champ énumérable de plus
//   (c46). Une analyse passée par JSON donne le constat d'avant m156 : deux boîtes en EU (c46, qui échoue sur c5f8caf par l'analyse
//   directe, déjà à deux boîtes en EU). Relecture de m156 : c44 échoue sur une version qui suivrait le trop-plein dès que ce second
//   parcours est gardé (C1 ; 161/163), c47 sur une version qui ne le suivrait pas pour « multiple » (M1 ; 161/163). Vérification : c48
//   échoue sur une version qui suivrait aussi les chemins plus longs du trop-plein (162/163).
// c49 à c63 (m164, réponse du 23 nov. 2026 à la question née de m140 : « b. La compter ») : en zone unitaire, une boîte sans réseau indiqué
//   que le dessin dit mêlée (un tuyau tracé à l'outil « Tronçon EU », « Tronçon EP » ou « Drain » y arrive ; étiquette « Boîte de
//   branchement » seule) compte comme une boîte unitaire, pour le réseau des sources dont l'eau la traverse, quand ses tuyaux ne mènent qu'à
//   l'unitaire (ou à aucun exutoire), n'indiquent qu'EU, EP ou unitaire, et que l'unitaire est parmi ces réseaux : tuyaux d'amont en
//   « Tronçon EU » et « Tronçon EP » (c29 : B1 en EU, B2 en EP, comme c30) ; tuyaux d'aval en « Tronçon EU » (c49) ; seul le tuyau du WC en
//   « Tronçon EU » (c50) ; WC (« Tronçon EU ») et descente (« Tronçon EP ») vers la même boîte : en EU et en EP (c51) ; « Drain » (réseau
//   EP, comme l'outil) relié à B2 par son dernier sommet : B2 en EP (c52) ; c29 par l'analyse de l'avant-projet, par an.ref et par une
//   analyse recopiée (JSON) (c53) ; sans collecteur, « Tronçon EU » puis « Tronçon unitaire » laissé libre : comme la même boîte dont les
//   deux tuyaux sont en « Tronçon unitaire », en EU et en EP (c54) ; boîte posée sur un sommet du collecteur unitaire, WC en « Tronçon
//   EU » : en EU seulement, la pièce du collecteur (sans réseau dans l'analyse) est ignorée (c62, relecture de m164). Échouent sur 2345fa7
//   (193/203 : c29, c49 à c52, les trois vérifications de c53, c54 et c62 ; boîtes comptées nulle part). Témoins (passent sur 2345fa7) :
//   boîte mêlée comptée nulle part quand un tuyau mène aussi à un autre réseau (c55 : collecteur unitaire et collecteur EU ; c43 de même),
//   qu'aucun ne mène à l'unitaire (c56 : « Tronçon EU » et « Tronçon EP » seuls ; c57 : « Tronçon EP » vers le collecteur EU) ou qu'un
//   tuyau indique un autre réseau qu'EU, EP ou unitaire (c63 : comme c51, tuyau du WC « INC », fichier fait à la main) ; le réseau indiqué
//   dans la fiche l'emporte (c58) ; étiquettes inchangées, « Boîte de branchement » sans réseau pour une boîte mêlée (c59) ; ni le croquis
//   ni l'analyse ne changent, B1 et B2 restent mêlées dans l'analyse (c60, état des lieux et avant-projet) ; analyse altérée, sous 17
//   formes : comptée nulle part, sans exception, avec les pièces de la boîte dans l'analyse (c61). Relecture de m164 (202/203 chaque
//   fois) : c62 échoue sur une version qui refuserait la pièce sans entrée dans l'analyse, c63 sur une version sans le contrôle du réseau
//   indiqué, et la forme « entrée de resPiece null » de c61 sur la première version de m164, qui l'ignorait comme une pièce sans entrée.
// usage : node tests/vm/boite.js [-v] [--app=<dossier>]
'use strict';
const {charger, rapport, doc: abrege} = require('./charger.js');
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
/* m140 : écriture du côté, avec ou sans distance */
const INT = 'à l\'intérieur de la propriété', EXT = 'à l\'extérieur de la propriété';
function limite(){
  if (typeof V.texteLimite !== 'function'){ R.ok(false, 'l : VCroquis.texteLimite est absente'); return; }
  const cas = [
    ['l1 intérieur, 0,80', {limCote: 'int', limDist: '0,80'}, 'à 0,80 m de la limite, ' + INT],
    ['l2 extérieur, 1,25', {limCote: 'ext', limDist: '1,25'}, 'à 1,25 m de la limite, ' + EXT],
    ['l3 intérieur, 0', {limCote: 'int', limDist: '0'}, 'en limite de propriété'],
    ['l4 extérieur, 0', {limCote: 'ext', limDist: '0'}, 'en limite de propriété'],
    ['l5 0 sans côté', {limDist: '0'}, 'en limite de propriété'],
    ['l6 « 0,00 », côté vide', {limCote: '', limDist: '0,00'}, 'en limite de propriété'],
    ['l7 distance sans côté', {limCote: '', limDist: '0,80'}, 'à 0,80 m de la limite'],
    ['l8 côté intérieur sans distance', {limCote: 'int'}, INT],
    ['l9 côté extérieur, distance vide', {limCote: 'ext', limDist: ''}, EXT],
    ['l10 aucun champ', {}, ''],
    ['l11 champs vides', {limCote: '', limDist: ''}, ''],
    ['l12 virgule, un seul chiffre : « 0,8 »', {limCote: 'int', limDist: '0,8'}, 'à 0,80 m de la limite, ' + INT],
    ['l13 entier : « 2 »', {limCote: 'ext', limDist: '2'}, 'à 2,00 m de la limite, ' + EXT],
    ['l14 point décimal : « 0.5 »', {limDist: '0.5'}, 'à 0,50 m de la limite'],
    ['l15 espaces autour : « 1,5 »', {limCote: 'int', limDist: ' 1,5 '}, 'à 1,50 m de la limite, ' + INT],
    ['l16 « -1 » (refusé par la fiche, croquis altéré) : distance ignorée', {limCote: 'int', limDist: '-1'}, INT],
    ['l17 texte non numérique (croquis altéré) : distance ignorée', {limDist: 'loin'}, ''],
    ['l18 côté inconnu (croquis altéré) : ignoré', {limCote: 'nord', limDist: '0,80'}, 'à 0,80 m de la limite'],
    /* m140 (réponse boite-en-limite) : le côté s'écrit en toutes lettres, apostrophe droite */
    ['l20 m140 intérieur, 0,35 : « à 0,35 m de la limite, à l\'intérieur de la propriété »', {limCote: 'int', limDist: '0,35'},
      'à 0,35 m de la limite, à l\'intérieur de la propriété'],
    ['l21 m140 extérieur, 3,10 : « à 3,10 m de la limite, à l\'extérieur de la propriété »', {limCote: 'ext', limDist: '3,10'},
      'à 3,10 m de la limite, à l\'extérieur de la propriété'],
    ['l22 m140 côté intérieur seul (distance faite d\'espaces)', {limCote: 'int', limDist: '  '}, 'à l\'intérieur de la propriété'],
    ['l23 m140 côté extérieur seul (distance absente)', {limCote: 'ext', limDist: null}, 'à l\'extérieur de la propriété'],
    ['l24 m140 témoin : intérieur, « 0,004 » (moins de 5 mm) : en limite', {limCote: 'int', limDist: '0,004'}, 'en limite de propriété'],
    ['l25 m140 témoin : « -0 » sans côté : en limite', {limDist: '-0'}, 'en limite de propriété'],
    ['l26 m140 témoin : distance seule, « 3,1 »', {limDist: '3,1'}, 'à 3,10 m de la limite'],
    ['l27 m140 témoin : rien (côté et distance absents)', {limCote: null, limDist: undefined}, ''],
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
  R.ok(e1 === BASE + '\nà 0,80 m de la limite, ' + INT, 'e2 boîte intérieur, 0,80 : la ligne s\'ajoute en dernière ligne (obtenu ' + JSON.stringify(e1) + ')');
  const d2 = maison({dim: '', prof: '', tampon: '', limCote: 'ext', limDist: '0'}), e2 = etiquette(d2, 'B1');
  R.ok(e2 === 'Boîte de branchement EU\nen limite de propriété', 'e3 boîte sans dimension, profondeur ni tampon, en limite (obtenu ' + JSON.stringify(e2) + ')');
  const d3 = maison({limCote: 'ext', st: 'projet'}), e3 = etiquette(d3, 'B1', 'avp');
  R.ok(e3 === 'Projet : ' + BASE + '\n' + EXT, 'e4 boîte « Projet », côté sans distance (obtenu ' + JSON.stringify(e3) + ')');
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
  const d = maison(LIMITE), lignes = ['Boîte de branchement EU', '40×40, P : 0,80 m, tampon fonte', 'à 0,80 m de la limite, ' + INT];
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

/* m105 : boîte reprise au constat (VCroquis.boitesConstat), par réseau : n boîtes existantes, distance, côté (à part depuis m149) et
   profondeur si n = 1 */
function constat(){
  if (typeof V.boitesConstat !== 'function'){ R.ok(false, 'c : VCroquis.boitesConstat est absente (' + typeof V.boitesConstat + ')'); return; }
  /* résultat de boitesConstat après l'analyse de l'état des lieux, comme l'hôte (vcResumeCalc) */
  const bc = d => { const dd = copie(d); return sur(() => V.boitesConstat(dd, V.analyser(dd, 'edl'))); };
  const vu = x => typeof x === 'string' ? x : JSON.stringify(x);
  /* eu, ep : [nombre de boîtes, distance, profondeur, côté (m149 : 'intérieur', 'extérieur' ; '' s'il manque)] */
  const attendu = (eu, ep) => ({EU: {n: eu[0], dist: eu[1], prof: eu[2], cote: eu[3] || ''}, EP: {n: ep[0], dist: ep[1], prof: ep[2], cote: ep[3] || ''}});
  const pareil = (x, a) => !!x && typeof x === 'object' && Object.keys(x).sort().join() === 'EP,EU'
    && ['EU', 'EP'].every(r => !!x[r] && x[r].n === a[r].n && x[r].dist === a[r].dist && x[r].prof === a[r].prof && x[r].cote === a[r].cote);
  const cas = (n, d, eu, ep) => { const x = bc(d), a = attendu(eu, ep); R.ok(pareil(x, a), n + ' → ' + vu(a) + ' (obtenu ' + vu(x) + ')'); };
  const RIEN = [0, '', ''], EU80 = [1, '0,80 m', '0,80 m', 'intérieur'];
  /* boîte EP en limite, reliée à une descente (EP) */
  const boiteEP = (d, id, p) => { pt(d, 'D' + id, 'descente', 6, 10); pt(d, id, 'boite', 6, 4, Object.assign({res: 'EP', prof: '1,10', limCote: 'ext', limDist: '0'}, p || {})); ln(d, 't' + id, 'tr', '', ['D' + id, id]); };

  /* c1 à c6 : nombre de boîtes par réseau */
  const d1 = nouveau(); pt(d1, 'W', 'wc', 0, 10); pt(d1, 'Rp', 'regard_pub', 0, 0, {res: 'EU'}); ln(d1, 'tW', 'tr', 'EU', ['W', 'Rp']); ln(d1, 'C', 'col', 'EU', [[-10, 0], 'Rp', [10, 0]]);
  cas('c1 aucune boîte : rien, en EU comme en EP', d1, RIEN, RIEN);
  cas('c2 une boîte EU, intérieur, 0,80, profondeur 0,80 : « 0,80 m », côté « intérieur » (m149 ; avant : « 0,80 m intérieur ») et « 0,80 m »',
    maison(LIMITE), EU80, RIEN);
  const d3 = maison(LIMITE); pt(d3, 'B2', 'boite', 3, 4, {res: 'EU', prof: '0,60', limCote: 'ext', limDist: '1,00'}); ln(d3, 'tB2', 'tr', '', ['B2', 'Rp']);
  cas('c3 deux boîtes EU : rien de repris en EU (ni distance, ni côté, ni profondeur)', d3, [2, '', ''], RIEN);
  const d4 = maison(LIMITE); boiteEP(d4, 'B3');
  cas('c4 une boîte EU et une boîte EP : chacune son réseau (EP : « en limite », sans côté, « 1,10 m »)', d4, EU80, [1, 'en limite', '1,10 m']);
  cas('c5 une boîte unitaire : comptée en EU et en EP', maison(Object.assign({res: 'UN'}, LIMITE)), EU80, EU80);
  const d6 = maison(Object.assign({res: 'UN'}, LIMITE)); boiteEP(d6, 'B3');
  cas('c6 une boîte unitaire et une boîte EP : EU d\'après l\'unitaire, EP : deux boîtes, rien', d6, EU80, [2, '', '']);

  /* c7, c8 : réseau déduit du dessin (étiquette « Boîte de branchement EU »), ou inconnu */
  const d7 = nouveau();
  pt(d7, 'W', 'wc', 0, 10); pt(d7, 'B1', 'boite', 0, 4, Object.assign({prof: '0,80'}, LIMITE)); pt(d7, 'Rp', 'regard_pub', 0, 0, {res: 'EU'});
  ln(d7, 'tW', 'tr', '', ['W', 'B1']); ln(d7, 'tB', 'tr', '', ['B1', 'Rp']); ln(d7, 'C', 'col', 'EU', [[-10, 0], 'Rp', [10, 0]]);
  pt(d7, 'D', 'descente', 20, 10); pt(d7, 'B2', 'boite', 20, 4, {prof: '1,10', limCote: 'ext', limDist: '0'}); pt(d7, 'Rq', 'regard_pub', 20, 0, {res: 'EP'});
  ln(d7, 'tD', 'tr', '', ['D', 'B2']); ln(d7, 'tB2', 'tr', '', ['B2', 'Rq']); ln(d7, 'K', 'col', 'EP', [[10, 0], 'Rq', [30, 0]]);
  const e7 = etiquette(d7, 'B1').split('\n')[0], e7b = etiquette(d7, 'B2').split('\n')[0];
  R.ok(e7 === 'Boîte de branchement EU' && e7b === 'Boîte de branchement EP', 'c7 témoin : étiquettes des boîtes sans réseau indiqué (' + e7 + ' ; ' + e7b + ')');
  cas('c7 réseau déduit du dessin : boîte sans réseau entre le WC et le regard public EU, une autre entre la descente et le regard public EP', d7, EU80, [1, 'en limite', '1,10 m']);
  const d8 = maison(LIMITE); pt(d8, 'B9', 'boite', 30, 30, {prof: '0,50', limCote: 'int', limDist: '0,30'});
  cas('c8 boîte sans réseau, ni indiqué ni déduit du dessin (isolée) : comptée nulle part', d8, EU80, RIEN);

  /* c9 à c11 : seules comptent les boîtes existantes */
  const d9 = maison(LIMITE);
  pt(d9, 'B2', 'boite', 3, 4, {res: 'EU', st: 'projet', prof: '0,60', limCote: 'ext', limDist: '1,00'});
  pt(d9, 'B3', 'boite', -3, 4, {res: 'EU', st: 'supprimer', prof: '0,70', limCote: 'int', limDist: '2,00'}); ln(d9, 'tB3', 'tr', '', ['B3', 'Rp']);
  cas('c9 une boîte EU existante, une « projet » et une « à supprimer » : seule l\'existante compte', d9, EU80, RIEN);
  const d9b = maison(Object.assign({st: 'supprimer'}, LIMITE)); pt(d9b, 'B2', 'boite', 3, 4, {res: 'EU', st: 'projet', prof: '0,60', limDist: '1,00'});
  cas('c9 boîtes « projet » et « à supprimer » seulement : aucune boîte', d9b, RIEN, RIEN);
  cas('c10 boîte « présumée » : comptée, seules « projet » et « à supprimer » sont écartées', maison(Object.assign({st: 'presume'}, LIMITE)), EU80, RIEN);
  const d11 = maison(); pt(d11, 'R1', 'regard', 0, 7, Object.assign({dim: '40×40', prof: '0,90'}, LIMITE)); ln(d11, 'tR', 'tr', '', ['R1', 'B1']);
  Object.assign(elDe(d11, 'Rp').p, LIMITE, {prof: '1,50'});
  cas('c11 regard et regard public avec ces champs : pas des boîtes (la boîte sans limite : profondeur seule)', d11, [1, '', '0,80 m'], RIEN);

  /* c12 : distance à la limite et côté, à part depuis m149 (une boîte EU) ; en limite, pas de côté */
  [['intérieur, 0,80', {limCote: 'int', limDist: '0,80'}, '0,80 m', 'intérieur'],
    ['extérieur, 1,25', {limCote: 'ext', limDist: '1,25'}, '1,25 m', 'extérieur'],
    ['intérieur, 0', {limCote: 'int', limDist: '0'}, 'en limite', ''],
    ['extérieur, « 0,00 »', {limCote: 'ext', limDist: '0,00'}, 'en limite', ''],
    ['0 sans côté', {limDist: '0'}, 'en limite', ''],
    ['distance sans côté', {limCote: '', limDist: '0,80'}, '0,80 m', ''],
    ['côté intérieur sans distance', {limCote: 'int'}, '', 'intérieur'],
    ['côté extérieur, distance vide', {limCote: 'ext', limDist: ''}, '', 'extérieur'],
    ['aucun champ', {}, '', ''],
    ['champs vides', {limCote: '', limDist: ''}, '', ''],
    ['« 0,8 »', {limCote: 'int', limDist: '0,8'}, '0,80 m', 'intérieur'],
    ['« 2 »', {limDist: '2'}, '2,00 m', ''],
    ['« 0.5 », extérieur', {limCote: 'ext', limDist: '0.5'}, '0,50 m', 'extérieur'],
    ['« 1,5 » entouré d\'espaces', {limCote: 'int', limDist: ' 1,5 '}, '1,50 m', 'intérieur'],
    ['« -1 » (croquis altéré) : distance ignorée, côté gardé', {limCote: 'int', limDist: '-1'}, '', 'intérieur'],
    ['texte non numérique (croquis altéré) : distance ignorée', {limDist: 'loin'}, '', ''],
    ['côté inconnu (croquis altéré) : ignoré', {limCote: 'nord', limDist: '0,80'}, '0,80 m', '']].forEach(([n, p, att, cote]) => {
    const x = bc(maison(p)), d = x && x.EU ? x.EU.dist : x, c = x && x.EU ? x.EU.cote : x;
    R.ok(d === att && c === cote && !!x && !!x.EU && x.EU.n === 1, 'c12 distance, ' + n + ' → ' + JSON.stringify(att) + ', côté ' + JSON.stringify(cote)
      + ' (obtenu ' + vu(d) + ', ' + vu(c) + ')');
  });
  /* c13 : profondeur (une boîte EU) */
  [['« 0,80 »', '0,80', '0,80 m'], ['« 0,8 »', '0,8', '0,80 m'], ['« 1.2 »', '1.2', '1,20 m'], ['« 2 »', '2', '2,00 m'], ['vide', '', ''], ['texte', 'profonde', '']].forEach(([n, prof, att]) => {
    const x = bc(maison({prof})), q = x && x.EU ? x.EU.prof : x;
    R.ok(q === att, 'c13 profondeur ' + n + ' → ' + JSON.stringify(att) + ' (obtenu ' + vu(q) + ')');
  });

  /* c14 : fonction pure ; c15 : sans analyse ; c16 : entrées invalides */
  const d14 = copie(d7), an14 = V.analyser(d14, 'edl'), avant = JSON.stringify(d14), avantAn = JSON.stringify(an14.resPt);
  sur(() => V.boitesConstat(d14, an14));
  R.ok(JSON.stringify(d14) === avant && JSON.stringify(an14.resPt) === avantAn, 'c14 ni le croquis ni l\'analyse ne changent');
  const s1 = sur(() => V.boitesConstat(copie(d7), null)), s2 = sur(() => V.boitesConstat(maison(LIMITE)));
  R.ok(pareil(s1, attendu(RIEN, RIEN)) && pareil(s2, attendu(EU80, RIEN)), 'c15 sans analyse : seul le réseau indiqué compte (boîtes au réseau déduit : '
    + vu(s1) + ' ; boîte EU indiquée : ' + vu(s2) + ')');
  const d16 = maison(LIMITE); d16.el.push(null, 7, {k: 'pt', t: 'boite'}, {id: 'X', k: 'pt', t: 'inconnu', x: 0, y: 0, p: {}});
  [['croquis absent', () => V.boitesConstat(null, null)], ['croquis sans éléments', () => V.boitesConstat({}, null)],
    ['éléments invalides, boîte sans propriétés, type inconnu', () => V.boitesConstat(d16, null)]].forEach(([n, f], i) => {
    const x = sur(f); R.ok(pareil(x, i < 2 ? attendu(RIEN, RIEN) : attendu(EU80, RIEN)), 'c16 ' + n + ' : sans exception (obtenu ' + vu(x) + ')');
  });

  /* c17 : nDist et nProf, nombre de boîtes du réseau qui portent une distance et une profondeur (rappel au constat quand il y a plusieurs
     boîtes sur le réseau) ; m149 : un côté seul n'est plus une distance, il ne compte pas dans nDist (avant : la distance « intérieur ») */
  const mesures = (n, d, eu, ep) => {
    const x = bc(d), ok = !!x && !!x.EU && !!x.EP && x.EU.nDist === eu[0] && x.EU.nProf === eu[1] && x.EP.nDist === ep[0] && x.EP.nProf === ep[1];
    R.ok(ok, n + ' → EU ' + eu.join(' et ') + ', EP ' + ep.join(' et ') + ' (obtenu ' + (x && x.EU && x.EP ? 'EU ' + x.EU.nDist + ' et ' + x.EU.nProf + ', EP ' + x.EP.nDist + ' et ' + x.EP.nProf : vu(x)) + ')');
  };
  mesures('c17 aucune boîte', d1, [0, 0], [0, 0]);
  mesures('c17 une boîte EU, distance et profondeur', maison(LIMITE), [1, 1], [0, 0]);
  mesures('c17 deux boîtes EU, chacune avec distance et profondeur', d3, [2, 2], [0, 0]);
  const d17 = maison(LIMITE); pt(d17, 'B2', 'boite', 3, 4, {res: 'EU', limCote: 'ext'}); ln(d17, 'tB2', 'tr', '', ['B2', 'Rp']);
  mesures('c17 (m149) deux boîtes EU, la seconde avec un côté seul : seule la première porte une distance', d17, [1, 1], [0, 0]);
  const d17c = maison({limCote: 'int', prof: ''}); pt(d17c, 'B2', 'boite', 3, 4, {res: 'EU', limCote: 'ext'}); ln(d17c, 'tB2', 'tr', '', ['B2', 'Rp']);
  mesures('c17 (m149) deux boîtes EU, chacune avec un côté seul : aucune distance', d17c, [0, 0], [0, 0]);
  const d17b = maison({prof: ''}); pt(d17b, 'B2', 'boite', 3, 4, {res: 'EU'}); ln(d17b, 'tB2', 'tr', '', ['B2', 'Rp']);
  mesures('c17 deux boîtes EU sans distance ni profondeur', d17b, [0, 0], [0, 0]);
  mesures('c17 une boîte unitaire et une boîte EP : comptées en EP toutes les deux', d6, [1, 1], [2, 2]);
  mesures('c17 une boîte existante, une « projet » et une « à supprimer » : seule l\'existante compte', d9, [1, 1], [0, 0]);

  /* c18 : zone unitaire : deux boîtes sans réseau indiqué, sur le collecteur unitaire, sont toutes deux unitaires (comme leur étiquette,
     témoin de temoinsUnitaire) ; m140 : chacune compte pour le réseau de l'appareil dont l'eau la traverse, B1 (WC) en EU, B2 (descente) en
     EP (avant m140 : deux boîtes en EU et en EP, rien de repris) ; le réseau indiqué dans leur fiche (EU, EP) les sépare */
  const B2EP = [1, 'en limite', '1,10 m'];
  cas('c18 zone unitaire, deux boîtes sans réseau indiqué, en parallèle : B1 (WC) en EU, B2 (descente) en EP', unitaire('', ''), EU80, B2EP);
  cas('c18 zone unitaire, réseau indiqué dans chaque fiche (EU, EP) : chacune son réseau', unitaire('EU', 'EP'), EU80, B2EP);

  /* c19 à c30 (m140, D6) : boîte unitaire d'après le dessin seulement : réseau des sources dont l'eau la traverse */
  const d19 = unitaireRaccord(), dd19 = copie(d19), an19 = V.analyser(dd19, 'edl');
  const fige = a => JSON.stringify([a.resPt, a.sensPiece, a.resObj, Object.keys(a.adj).sort().map(k => k + ':' + a.adj[k].length)]), av19 = fige(an19);
  const x19 = sur(() => V.boitesConstat(dd19, an19)), a19 = attendu(EU80, B2EP);
  R.ok(pareil(x19, a19), 'c19 en parallèle, tuyaux réunis sur un raccord avant le regard public : B1 en EU, B2 en EP → ' + vu(a19) + ' (obtenu ' + vu(x19) + ')');
  R.ok(fige(an19) === av19 && JSON.stringify(dd19) === JSON.stringify(d19), 'c19 ni le croquis ni l\'analyse ne changent');
  cas('c20 en série, WC → B1 → B2 → collecteur unitaire, descente vers un puisard : B1 et B2 en EU, rien de repris ; aucune en EP',
    unitaireSerie(true), [2, '', ''], RIEN);
  cas('c21 en série, sans descente : B1 et B2 en EU, rien de repris ; aucune en EP', unitaireSerie(false), [2, '', ''], RIEN);
  cas('c22 témoin : une boîte qui reçoit le WC et la descente : en EU et en EP', unitaireUne(null, true), EU80, EU80);
  cas('c23 témoin : boîte indiquée EP dans sa fiche, qui reçoit le WC : en EP seulement', unitaireUne({res: 'EP'}, false), RIEN, EU80);
  cas('c24 témoin (F8) : boîte indiquée unitaire dans sa fiche, qui ne reçoit que le WC : en EU et en EP', unitaireUne({res: 'UN'}, false), EU80, EU80);
  const B3 = [1, '0,80 m', '0,90 m', 'intérieur'];
  cas('c25 témoin : boîte unitaire qu\'aucune source ne traverse (appareils non dessinés, tuyau laissé libre côté maison) : en EU et en EP',
    unitaireSansAppareil(), B3, B3);
  cas('c26 autre appareil (EU) vers B1, autre ouvrage EP vers B2 (m132) : B1 en EU, B2 en EP',
    unitaireSources('autre_eu', {nom: 'Bac fictif'}, 'autre_ep', {nom: 'Bassin fictif'}), EU80, B2EP);
  cas('c26 siphon de garage (EU) vers B1, siphon de sol (EP) vers B2 : B1 en EU, B2 en EP', unitaireSources('siphon_garage', {}, 'siphon_sol', {}), EU80, B2EP);
  cas('c27 drain de collecte tracé (EP, m123) vers un raccord puis B2, WC vers B1 : B1 en EU, B2 en EP', unitaireDrain(true), EU80, B2EP);
  cas('c27 drain de collecte tracé sans réseau, relié à B2 par son dernier sommet : B1 en EU, B2 en EP', unitaireDrain(false), EU80, B2EP);
  /* c28 : réseau de la boîte lu dans an.ref (l'analyse donnée ne le porte pas) : les chemins sont lus dans an.ref. L'application ne passe pas
     par là (une boîte existante a toujours un réseau dans l'analyse donnée) : analyse retouchée par le test */
  const d28 = unitaire('', ''), x28 = sur(() => V.boitesConstat(copie(d28), {resPt: {}, ref: V.analyser(copie(d28), 'edl')})), a28 = attendu(EU80, B2EP);
  R.ok(pareil(x28, a28), 'c28 réseau lu dans an.ref : chemins lus dans an.ref → ' + vu(a28) + ' (obtenu ' + vu(x28) + ')');
  const dd28 = copie(d28), x28b = sur(() => V.boitesConstat(dd28, V.analyser(dd28, 'avp')));
  R.ok(pareil(x28b, a28), 'c28 analyse de l\'avant-projet (an.ref présent) : comme l\'état des lieux → ' + vu(a28) + ' (obtenu ' + vu(x28b) + ')');
  /* c29 (B5) : tuyaux d'amont tracés à l'outil « Tronçon EU » (WC → B1) et « Tronçon EP » (descente → B2), tuyaux d'aval à l'outil
     « Tronçon » : boîtes mixtes d'après le dessin (EU ou EP, et unitaire), elles le restent (témoin). m164 (réponse du 23 nov. 2026 :
     « b. La compter ») : leurs tuyaux ne mènent qu'au collecteur unitaire, elles comptent comme des boîtes unitaires, B1 (WC) en EU,
     B2 (descente) en EP, comme c30 (avant m164 : comptées nulle part, comme avant m140) */
  const d29 = unitaireTroncons('EU', 'EP', ''), r29 = V.analyser(copie(d29), 'edl').resPt;
  R.ok(r29.B1 === 'MIX' && r29.B2 === 'MIX', 'c29 témoin : boîtes mixtes d\'après le dessin (B1 ' + r29.B1 + ', B2 ' + r29.B2 + ')');
  cas('c29 boîtes mixtes (tuyaux d\'amont tracés en EU et en EP), m164 : B1 (WC) en EU, B2 (descente) en EP, comme c30', d29, EU80, B2EP);
  /* c30 : tous les tuyaux tracés à l'outil « Tronçon unitaire » : la fiche des boîtes ne dit rien, elles suivent leurs appareils */
  cas('c30 tuyaux tracés à l\'outil « Tronçon unitaire » : B1 (WC) en EU, B2 (descente) en EP', unitaireTroncons('UN', 'UN', 'UN'), EU80, B2EP);
  /* c31 : une seule boîte, qui ne reçoit que le WC : la colonne EP n'a plus de boîte (avant m140 : la même boîte en EU et en EP) */
  cas('c31 une seule boîte sans réseau indiqué, qui ne reçoit que le WC : en EU seulement, aucune en EP', unitaireUne(null, false), EU80, RIEN);
  /* c32 : B1 reçoit le WC ; B3, à côté, au bout d'un tuyau laissé libre côté maison, ne reçoit rien : elle compte en EU et en EP */
  cas('c32 B1 (WC) et B3 qu\'aucune source ne traverse : deux boîtes en EU, rien de repris ; B3 seule en EP', unitaireAcote(), [2, '', ''], B3);
  /* c33 : boucle : la boîte B, sur le tuyau qui relie la branche du WC à celle de la descente, n'est sur le plus court chemin d'aucune
     source (l'analyse ne la donne à aucune) : en EU et en EP, comme avant m140, quel que soit le sens des flèches du plan (témoin : sans
     raccord, elles vont de B vers J et laissent B-K sans sens : en les suivant, l'eau de la descente passerait par B) */
  const a33 = V.analyser(unitaireBoucle(false), 'edl'), b33 = V.analyser(unitaireBoucle(true), 'edl');
  R.ok(a33.sensPiece['tJB:0'] === -1 && !a33.sensPiece['tBK:0'] && [a33, b33].every(a => a.resPt.B === 'UN' && !a.resObj.W.boite && !a.resObj.D.boite),
    'c33 témoin : flèches du plan B → J, B-K sans sens (' + a33.sensPiece['tJB:0'] + ', ' + a33.sensPiece['tBK:0'] + ') ; boîte unitaire, donnée à aucune source ('
    + [a33, b33].map(a => a.resPt.B + ' ' + a.resObj.W.boite + ' ' + a.resObj.D.boite).join(' ; ') + ')');
  cas('c33 boucle, boîte sur le tuyau qui relie les deux branches : en EU et en EP', unitaireBoucle(false), EU80, EU80);
  cas('c33 boucle, raccord de plus sur la branche du WC : en EU et en EP', unitaireBoucle(true), EU80, EU80);

  /* c34 à c38 (m149, D17) : la distance s'écrit seule, le côté à part ; il n'est repris que s'il n'y a qu'une boîte sur le réseau */
  const champs = x => x && x.EU ? {dist: x.EU.dist, cote: x.EU.cote} : x;
  const x34 = bc(maison(LIMITE));
  R.ok(!!x34 && !!x34.EU && x34.EU.dist === '0,80 m' && x34.EU.cote === 'intérieur',
    'c34 boîte EU à 0,80 m, à l\'intérieur : distance « 0,80 m » et côté « intérieur », à part (obtenu ' + vu(champs(x34)) + ')');
  const x35 = bc(maison({limCote: 'int', limDist: '0'})), x35b = bc(maison({limCote: 'ext', limDist: '0,00'}));
  R.ok([x35, x35b].every(x => !!x && !!x.EU && x.EU.dist === 'en limite' && x.EU.cote === ''),
    'c35 boîte en limite, côté intérieur ou extérieur dans la fiche : « en limite », pas de côté (obtenu ' + vu(champs(x35)) + ' ; ' + vu(champs(x35b)) + ')');
  const d36 = maison(LIMITE); pt(d36, 'B2', 'boite', 3, 4, {res: 'EU', prof: '0,80', limCote: 'int', limDist: '0,80'}); ln(d36, 'tB2', 'tr', '', ['B2', 'Rp']);
  cas('c36 deux boîtes EU, toutes deux à 0,80 m, à l\'intérieur : ni distance ni côté', d36, [2, '', ''], RIEN);
  const x37 = bc(maison({limCote: 'ext', limDist: ''}));
  R.ok(!!x37 && !!x37.EU && x37.EU.dist === '' && x37.EU.cote === 'extérieur',
    'c37 côté sans distance : distance vide, côté « extérieur » (obtenu ' + vu(champs(x37)) + ')');
  const e38 = String(etiquette(maison(LIMITE), 'B1')).split('\n').pop(), t38 = sur(() => V.texteLimite(LIMITE));
  R.ok(e38 === 'à 0,80 m de la limite, à l\'intérieur de la propriété' && t38 === e38, 'c38 témoin : l\'étiquette du plan et texteLimite gardent'
    + ' « à 0,80 m de la limite, à l\'intérieur de la propriété » (obtenu ' + JSON.stringify(e38) + ' ; ' + JSON.stringify(t38) + ')');

  /* c39 à c48 (m156, AC1 de la relecture d'ensemble de la v1.7.2) : boîte sur le trop-plein d'un puisard, en zone unitaire. Quand
     l'analyse compte ce que le trop-plein atteint (r.apres, au-delà de l'ouvrage ou du drain, ou « multiple » tiré du trop-plein), le
     chemin de l'eau de la source le comprend */
  const TB1 = [1, '0,80 m', '0,60 m', 'intérieur'], TB2 = [1, '1,50 m', '1,10 m', 'extérieur'], DEUX = [2, '', ''];
  cas('c39 trop-plein orienté du puisard vers B2, puis le collecteur unitaire : B1 (WC) en EU, B2 (descente) en EP', tropPlein('deux', 1), TB1, TB2);
  cas('c40 une seule boîte, qui reçoit le WC et le trop-plein orienté : en EU et en EP', tropPlein('une', 1), TB1, TB1);
  cas('c41 sans WC, descente → puisard → trop-plein orienté → B2 : en EP seulement, aucune en EU', tropPlein('seule', 1), RIEN, TB2);
  cas('c42 drain d\'infiltration qui tient le puisard, trop-plein orienté vers B2 : B1 (WC) en EU, B2 (descente) en EP', tropPlein('drain', 1), TB1, TB2);
  /* témoins : comme avant m156 */
  cas('c43 témoin : WC et descente vers la même boîte, sans puisard : en EU et en EP', tropPlein('meme', 0), TB1, TB1);
  cas('c43 témoin : trop-plein sans sens vers B2, boîte mêlée d\'après le dessin : B1 en EU, rien en EP', tropPlein('deux', 0), TB1, RIEN);
  cas('c43 témoin : trop-plein sans sens vers B1, boîte mêlée d\'après le dessin : comptée nulle part', tropPlein('une', 0), RIEN, RIEN);
  /* c44 : la bifurcation va au second collecteur C2 ; le trop-plein atteint C, un exutoire de plus : le second parcours de l'analyse est
     gardé, mais la bifurcation filtre les réseaux (« multiple », comme avant m156) et ce que le trop-plein atteint ne compte pas */
  cas('c44 témoin : bifurcation avant le puisard vers un second collecteur unitaire (« multiple »), trop-plein orienté vers B2, puis le premier'
    + ' collecteur : B2 qu\'aucune source ne traverse, en EU et en EP', tropPlein('bifurcation', 1), DEUX, TB2);
  const a44 = sur(() => V.analyser(copie(tropPlein('bifurcation', 1)), 'edl')), r44 = (a44 && a44.resObj && a44.resObj.S) || {};
  const ct44 = Object.getOwnPropertyDescriptor(r44, 'cheminTp');
  R.ok(r44.etat === 'multiple' && (r44.nets || []).join() === 'INF,UN' && ct44 === undefined, 'c44 témoin : la descente est « multiple » (puisard'
    + ' et collecteur unitaire), sans chemin par le trop-plein (obtenu ' + r44.etat + ' ' + JSON.stringify(r44.nets) + ', chemin ' + (ct44 ? 'posé' : 'absent') + ')');
  cas('c45 témoin : trop-plein orienté laissé libre (aucun exutoire au-delà du puisard) : B2 qu\'aucune source ne traverse, en EU et en EP',
    tropPlein('libre', 1), DEUX, TB2);
  /* c46 : l'analyse ne change pas (aucun champ énumérable de plus) ; passée par JSON, le constat des boîtes est celui d'avant m156 */
  const d46 = tropPlein('deux', 1), dd46 = copie(d46), an46 = V.analyser(dd46, 'edl'), j46 = JSON.stringify(an46), av46 = fige(an46);
  const x46 = sur(() => V.boitesConstat(dd46, an46)), y46 = sur(() => V.boitesConstat(copie(d46), JSON.parse(j46)));
  R.ok(fige(an46) === av46 && JSON.stringify(an46) === j46 && JSON.stringify(dd46) === JSON.stringify(d46) && !/cheminTp|preds/.test(j46)
    && Object.keys(an46.resObj.S || {}).filter(k => k !== 'apres' && k !== 'apresPar').join() === Object.keys(an46.resObj.W || {}).join()
    && Object.keys(an46).join() === Object.keys(V.analyser(copie(maison(LIMITE)), 'edl')).join(),
    'c46 ni le croquis ni l\'analyse ne changent ; aucun champ de plus, ni dans l\'analyse ni dans le résultat de la descente (' + Object.keys(an46.resObj.S || {}).join(', ') + ')');
  R.ok(pareil(x46, attendu(TB1, TB2)) && pareil(y46, attendu(DEUX, TB2)), 'c46 analyse passée par JSON : comme avant m156, deux boîtes en EU et B2 en EP (obtenu '
    + vu(y46) + ' ; sans JSON ' + vu(x46) + ')');
  /* c47 : deux trop-pleins de plus, vers deux autres destinations : « multiple » tiré du trop-plein (m145 ; décision D5 : deux destinations
     font « multiple ») ; le chemin de l'eau de la descente comprend le trop-plein qui passe par B2 */
  cas('c47 trois trop-pleins orientés du puisard (vers B2 puis le collecteur, vers deux autres destinations) : « multiple » tiré du trop-plein ;'
    + ' B1 (WC) en EU, B2 (descente) en EP', tropPlein('multiple', 1), TB1, TB2);
  const a47 = sur(() => V.analyser(copie(tropPlein('multiple', 1)), 'edl')), r47 = (a47 && a47.resObj && a47.resObj.S) || {};
  const ct47 = Object.getOwnPropertyDescriptor(r47, 'cheminTp'), n47 = r47.nets || [];
  R.ok(r47.etat === 'multiple' && n47.length === 4 && n47.filter(x => /^X:/.test(x)).length === 2 && n47.indexOf('UN') >= 0 && !r47.apres
    && !!ct47 && !ct47.enumerable && Object.keys(r47).indexOf('cheminTp') < 0, 'c47 la descente est « multiple » (puisard et, par le trop-plein,'
    + ' collecteur unitaire et deux autres destinations), avec un chemin par le trop-plein, non énumérable (obtenu ' + r47.etat + ' '
    + JSON.stringify(n47) + ', chemin ' + (ct47 ? (ct47.enumerable ? 'énumérable' : 'posé') : 'absent') + ')');
  /* c48 : boucle sur le trop-plein, à l'image de c33 : le chemin par le trop-plein suit les plus courts chemins de son parcours, comme le
     chemin ordinaire (sans puisard, la même boucle compte aussi B3 en EU et en EP) */
  cas('c48 boucle sur le trop-plein (à l\'image de c33) : B3, sur le tuyau qui relie ses deux branches, n\'est sur aucun plus court chemin :'
    + ' en EU et en EP ; B1 en EU, B2 en EP', tropPlein('boucle', 1), DEUX, DEUX);

  /* c49 à c54 (m164, réponse du 23 nov. 2026 à la question née de m140 : « b. La compter ») : en zone unitaire, une boîte sans réseau
     indiqué que le dessin dit mêlée (un tuyau tracé à l'outil « Tronçon EU », « Tronçon EP » ou « Drain » y arrive) compte comme une boîte
     unitaire, pour le réseau des sources dont l'eau la traverse, quand ses tuyaux ne mènent qu'au réseau unitaire (ou à aucun exutoire),
     n'indiquent qu'EU, EP ou unitaire, et que l'unitaire est parmi ces réseaux ; son étiquette ne change pas (c59) */
  cas('c49 tuyaux d\'aval tracés à l\'outil « Tronçon EU », tuyaux d\'amont sans réseau : B1 (WC) en EU, B2 (descente) en EP',
    unitaireTroncons('', '', 'EU'), EU80, B2EP);
  cas('c50 seul le tuyau du WC tracé à l\'outil « Tronçon EU » : B1 (mêlée) en EU, B2 (unitaire) en EP', unitaireTroncons('EU', '', ''), EU80, B2EP);
  cas('c51 une boîte qui reçoit le WC (« Tronçon EU ») et la descente (« Tronçon EP ») : en EU et en EP, ses valeurs dans les deux',
    meleeUne(), EU80, EU80);
  cas('c52 « Drain » (drain de collecte, réseau EP comme l\'outil) relié à B2 par son dernier sommet, WC vers B1 par un tuyau sans réseau :'
    + ' B1 en EU, B2 en EP', unitaireDrain(false, 'EP'), EU80, B2EP);
  /* c53 : c29 par l'analyse de l'avant-projet, par an.ref (analyse retouchée par le test, comme c28) et par une analyse recopiée (JSON) */
  const a53 = attendu(EU80, B2EP);
  [['l\'analyse de l\'avant-projet (an.ref présent)', () => { const dd = copie(d29); return V.boitesConstat(dd, V.analyser(dd, 'avp')); }],
    ['an.ref (réseau et chemins lus dans an.ref)', () => V.boitesConstat(copie(d29), {resPt: {}, ref: V.analyser(copie(d29), 'edl')})],
    ['une analyse recopiée (JSON)', () => { const dd = copie(d29); return V.boitesConstat(dd, copie(V.analyser(dd, 'edl'))); }]].forEach(([n, f]) => {
    const x = sur(f); R.ok(pareil(x, a53), 'c53 c29 par ' + n + ' : comme c29 → ' + vu(a53) + ' (obtenu ' + vu(x) + ')');
  });
  /* c54 : sans collecteur ; l'attendu est le constat, calculé ici, de la même boîte dont les deux tuyaux sont tracés à l'outil « Tronçon
     unitaire » (unitaire d'après le dessin ; sans exutoire dessiné, aucune source ne la traverse : elle compte en EU et en EP) */
  const x54 = bc(sansCollecteur('EU', 'UN')), y54 = bc(sansCollecteur('UN', 'UN'));
  R.ok(vu(x54) === vu(y54) && pareil(y54, attendu(EU80, EU80)), 'c54 sans collecteur, WC → « Tronçon EU » → B1 → « Tronçon unitaire » laissé libre :'
    + ' comme la même boîte dont les deux tuyaux sont en « Tronçon unitaire », en EU et en EP → ' + vu(y54) + ' (obtenu ' + vu(x54) + ')');

  /* c55 à c61 (m164) : témoins, qui passent aussi sur 2345fa7. Boîtes mêlées comptées nulle part, comme avant m164 : un tuyau mène aussi
     à un autre réseau (c55 ; c43 de même), ou aucun ne mène à l'unitaire (c56, c57) ; plus bas, un tuyau indique un autre réseau (c63) */
  const nullePart = (n, d) => {
    const r = sur(() => V.analyser(copie(d), 'edl').resPt.B1), x = bc(d), a = attendu(RIEN, RIEN);
    R.ok(r === 'MIX' && pareil(x, a), n + ' : boîte mêlée d\'après le dessin (' + vu(r) + '), comptée nulle part (obtenu ' + vu(x) + ')');
  };
  nullePart('c55 témoin : boîte reliée au collecteur unitaire et à un collecteur EU', deuxCollecteurs());
  nullePart('c56 témoin : WC → « Tronçon EU » et descente → « Tronçon EP » vers la même boîte, sans collecteur ni tuyau unitaire', euEpSeuls());
  nullePart('c57 témoin : descente → « Tronçon EP » → boîte → regard public du collecteur EU', collEuTronconEp());
  /* c58 : le réseau indiqué dans la fiche l'emporte */
  const d58 = unitaireUne({res: 'EU'}, true); elDe(d58, 'tD').p.res = 'EP';
  cas('c58 témoin : boîte indiquée EU dans sa fiche, qui reçoit le WC et un « Tronçon EP » (descente) : en EU seulement', d58, EU80, RIEN);
  /* c59 : étiquettes inchangées : « Boîte de branchement » (sans réseau) pour une boîte mêlée, « … unitaire » sinon, puis la profondeur et
     la ligne de la limite, comme sur 2345fa7 */
  const ET = (t, n) => [t, n === 1 ? 'P : 0,80 m' : 'P : 1,10 m', n === 1 ? 'à 0,80 m de la limite, ' + INT : 'en limite de propriété'].join('\n');
  const MEL = 'Boîte de branchement', UNI = 'Boîte de branchement unitaire';
  [['c29', d29, MEL, MEL], ['c49', unitaireTroncons('', '', 'EU'), MEL, MEL], ['c50', unitaireTroncons('EU', '', ''), MEL, UNI], ['c51', meleeUne(), MEL, null],
    ['c52', unitaireDrain(false, 'EP'), UNI, MEL]].forEach(([n, d, t1, t2]) => {
    const e1 = etiquette(d, 'B1'), e2 = t2 ? etiquette(d, 'B2') : null;
    R.ok(e1 === ET(t1, 1) && (!t2 || e2 === ET(t2, 2)), 'c59 témoin : étiquettes des boîtes de ' + n + ' inchangées ('
      + [e1, e2].filter(x => x != null).map(x => JSON.stringify(x)).join(' ; ') + ')');
  });
  /* c60 : ni le croquis ni l'analyse ne changent (état des lieux, puis avant-projet avec an.ref) ; les boîtes restent mêlées */
  ['edl', 'avp'].forEach(mode => {
    const dd = copie(d29), an = V.analyser(dd, mode), j = JSON.stringify(an), f = fige(an);
    sur(() => V.boitesConstat(dd, an));
    R.ok(JSON.stringify(an) === j && fige(an) === f && JSON.stringify(dd) === JSON.stringify(d29) && an.resPt.B1 === 'MIX' && an.resPt.B2 === 'MIX',
      'c60 témoin (' + mode + ') : ni le croquis ni l\'analyse ne changent, B1 et B2 restent mêlées (' + an.resPt.B1 + ', ' + an.resPt.B2 + ')');
  });
  /* c61 : analyse altérée (recopiée puis retouchée, comme un fichier modifié à la main) : sans exception, la boîte de c51 n'est pas mêlée
     en zone unitaire, elle n'est comptée nulle part */
  const d61 = meleeUne(), j61 = JSON.stringify(V.analyser(copie(d61), 'edl')), pB = JSON.parse(j61).adj.B1.map(q => q.id).sort().join();
  [['réduite à resPt', a => ({resPt: a.resPt})], ['an.ref réduit à resPt', a => ({resPt: {}, ref: {resPt: a.resPt}})],
    ['sans adj', a => { delete a.adj; }], ['adj texte', a => { a.adj = 'B1'; }], ['adj tableau', a => { a.adj = []; }],
    ['sans resPiece', a => { delete a.resPiece; }], ['resPiece null', a => { a.resPiece = null; }], ['resPiece texte', a => { a.resPiece = 'tW:0'; }],
    ['adj.B1 absent', a => { delete a.adj.B1; }], ['adj.B1 objet', a => { a.adj.B1 = {0: a.adj.B1[0]}; }], ['adj.B1 texte', a => { a.adj.B1 = 'tW:0'; }],
    ['pièce sans id', a => { a.adj.B1.push({a: 'B1', b: 'Rp'}); }], ['pièce null', a => { a.adj.B1.push(null); }],
    ['nets texte', a => { a.resPiece['tW:0'].nets = 'UN'; }], ['nets absent', a => { delete a.resPiece['tW:0'].nets; }],
    ['entrée de resPiece texte', a => { a.resPiece['tW:0'] = 'EU'; }], ['entrée de resPiece null', a => { a.resPiece['tW:0'] = null; }]].forEach(([n, f]) => {
    const a = JSON.parse(j61), b = f(a) || a, x = sur(() => V.boitesConstat(copie(d61), b));
    R.ok(pareil(x, attendu(RIEN, RIEN)), 'c61 témoin, analyse altérée (' + n + ') : sans exception, comptée nulle part (obtenu ' + vu(x) + ')');
  });
  R.ok(pB === 'tB:0,tD:0,tW:0', 'c61 témoin : pièces de la boîte de c51 dans l\'analyse (' + pB + ')');
  /* c62 (relecture de m164) : B1 posée sur un sommet du collecteur unitaire, sans regard public ; la pièce du collecteur n'a pas de réseau
     dans l'analyse (pas d'entrée dans resPiece) : elle est ignorée, la boîte ne touche que l'unitaire. Témoin : boîte mêlée d'après le
     dessin, avec ces deux pièces */
  const a62 = sur(() => V.analyser(copie(boiteSurCollecteur()), 'edl')), q62 = a62 && a62.adj && Array.isArray(a62.adj.B1) ? a62.adj.B1 : [];
  const p62 = q62.map(q => q.id + (Object.prototype.hasOwnProperty.call(a62.resPiece, q.id) ? ' ' + a62.resPiece[q.id].res : ' sans entrée')).sort().join(', ');
  R.ok(a62 && a62.resPt && a62.resPt.B1 === 'MIX' && p62 === 'C:c1 sans entrée, tW:0 EU', 'c62 témoin : boîte sur le collecteur, mêlée d\'après le'
    + ' dessin (' + (a62 && a62.resPt ? a62.resPt.B1 : vu(a62)) + ') ; ses pièces : ' + p62);
  cas('c62 boîte posée sur un sommet du collecteur unitaire, WC en « Tronçon EU » : en EU seulement (la pièce du collecteur est ignorée)',
    boiteSurCollecteur(), EU80, RIEN);
  /* c63 (relecture de m164) : témoin. Comme c51, tuyau du WC qui indique « INC » (fichier fait à la main ; les outils n'indiquent qu'EU, EP
     ou unitaire) : réseau indiqué hors d'EU, EP et unitaire, la boîte n'est pas mêlée en zone unitaire, comptée nulle part */
  const d63 = meleeUne(); elDe(d63, 'tW').p.res = 'INC';
  nullePart('c63 témoin : comme c51, tuyau du WC qui indique « INC » (fichier fait à la main)', d63);
}

/* c18, zone unitaire : WC vers la boîte B1, descente vers la boîte B2, chacune vers un regard public du collecteur (unitaire, sinon col) ;
   r1, r2 : réseau indiqué dans la fiche de chaque boîte */
function unitaire(r1, r2, col){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 10); pt(d, 'B1', 'boite', 0, 4, Object.assign({res: r1, prof: '0,80'}, LIMITE)); pt(d, 'Rp', 'regard_pub', 0, 0, {res: col || 'UN'});
  pt(d, 'D', 'descente', 6, 10, {cote: 'avant'}); pt(d, 'B2', 'boite', 6, 4, {res: r2, prof: '1,10', limCote: 'ext', limDist: '0'}); pt(d, 'Rq', 'regard_pub', 6, 0, {res: col || 'UN'});
  ln(d, 'tW', 'tr', '', ['W', 'B1']); ln(d, 'tB', 'tr', '', ['B1', 'Rp']); ln(d, 'tD', 'tr', '', ['D', 'B2']); ln(d, 'tB2', 'tr', '', ['B2', 'Rq']);
  ln(d, 'C', 'col', col || 'UN', [[-10, 0], 'Rp', 'Rq', [10, 0]]);
  return d;
}
/* c19 à c30 (m140) : zone unitaire, boîtes sans réseau indiqué. B1 : intérieur, 0,80, profondeur 0,80 ; B2 : en limite, profondeur 1,10.
   c19 : WC → B1 et descente → B2, tuyaux réunis sur un raccord J avant le regard public */
function unitaireRaccord(){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 10); pt(d, 'B1', 'boite', 0, 4, Object.assign({prof: '0,80'}, LIMITE));
  pt(d, 'D', 'descente', 6, 10, {cote: 'avant'}); pt(d, 'B2', 'boite', 6, 4, {prof: '1,10', limCote: 'ext', limDist: '0'});
  pt(d, 'J', 'jonction', 3, 2); pt(d, 'Rp', 'regard_pub', 3, 0, {res: 'UN'});
  ln(d, 'tW', 'tr', '', ['W', 'B1']); ln(d, 'tD', 'tr', '', ['D', 'B2']); ln(d, 'tB1', 'tr', '', ['B1', 'J']); ln(d, 'tB2', 'tr', '', ['B2', 'J']);
  ln(d, 'tJ', 'tr', '', ['J', 'Rp']); ln(d, 'C', 'col', 'UN', [[-10, 0], 'Rp', [10, 0]]);
  return d;
}
/* c20, c21 : WC → B1 → B2 → regard public ; descente vers un puisard (descente) */
function unitaireSerie(descente){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 12); pt(d, 'B1', 'boite', 0, 7, Object.assign({prof: '0,80'}, LIMITE)); pt(d, 'B2', 'boite', 0, 4, {prof: '1,10', limCote: 'ext', limDist: '0'});
  pt(d, 'Rp', 'regard_pub', 0, 0, {res: 'UN'});
  ln(d, 'tW', 'tr', '', ['W', 'B1']); ln(d, 'tB1', 'tr', '', ['B1', 'B2']); ln(d, 'tB2', 'tr', '', ['B2', 'Rp']); ln(d, 'C', 'col', 'UN', [[-10, 0], 'Rp', [10, 0]]);
  if (descente){ pt(d, 'D', 'descente', 8, 12, {cote: 'avant'}); pt(d, 'P', 'puisard', 8, 18); ln(d, 'tD', 'tr', '', ['D', 'P']); }
  return d;
}
/* c22 à c24 : WC → B1 → regard public ; p : fiche de B1 ; descente vers B1 (descente) */
function unitaireUne(p, descente){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 10); pt(d, 'B1', 'boite', 0, 4, Object.assign({prof: '0,80'}, LIMITE, p || {})); pt(d, 'Rp', 'regard_pub', 0, 0, {res: 'UN'});
  ln(d, 'tW', 'tr', '', ['W', 'B1']); ln(d, 'tB', 'tr', '', ['B1', 'Rp']); ln(d, 'C', 'col', 'UN', [[-10, 0], 'Rp', [10, 0]]);
  if (descente){ pt(d, 'D', 'descente', 4, 10, {cote: 'avant'}); ln(d, 'tD', 'tr', '', ['D', 'B1']); }
  return d;
}
/* c25 : boîte seule sur le collecteur unitaire, tuyau laissé libre côté maison */
function unitaireSansAppareil(){
  const d = nouveau();
  pt(d, 'B3', 'boite', 0, 4, Object.assign({prof: '0,90'}, LIMITE)); pt(d, 'Rp', 'regard_pub', 0, 0, {res: 'UN'});
  ln(d, 'tM', 'tr', '', [[0, 9], 'B3']); ln(d, 'tB', 'tr', '', ['B3', 'Rp']); ln(d, 'C', 'col', 'UN', [[-10, 0], 'Rp', [10, 0]]);
  return d;
}
/* c26 : source t1 (fiche p1) → B1, source t2 (fiche p2) → B2, chacune vers son regard public (comme c18) */
function unitaireSources(t1, p1, t2, p2){
  const d = unitaire('', '');
  [['W', t1, p1], ['D', t2, p2]].forEach(([id, t, p]) => { const e = elDe(d, id); e.t = t; e.p = Object.assign(V.defautsPt(t), {meth: ['eau']}, p); });
  return d;
}
/* c27 : WC → B1 ; drain de collecte tracé vers B2 : réseau EP (comme l'outil « Drain ») vers un raccord J puis un tuyau (raccord), ou sans
   réseau, son dernier sommet sur B2 ; c52 (m164) : réseau res (EP, comme l'outil), son dernier sommet sur B2 */
function unitaireDrain(raccord, res){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 10); pt(d, 'B1', 'boite', 0, 4, Object.assign({prof: '0,80'}, LIMITE)); pt(d, 'Rp', 'regard_pub', 0, 0, {res: 'UN'});
  pt(d, 'B2', 'boite', 6, 4, {prof: '1,10', limCote: 'ext', limDist: '0'}); pt(d, 'Rq', 'regard_pub', 6, 0, {res: 'UN'});
  if (raccord){ pt(d, 'J', 'jonction', 6, 9); ln(d, 'Dr', 'tr', 'EP', [[2, 14], [10, 14], 'J']); ln(d, 'tJ', 'tr', '', ['J', 'B2']); }
  else ln(d, 'Dr', 'tr', res || '', [[2, 14], [10, 14], 'B2']);
  elDe(d, 'Dr').p.drain = 'collecte';
  ln(d, 'tW', 'tr', '', ['W', 'B1']); ln(d, 'tB', 'tr', '', ['B1', 'Rp']); ln(d, 'tB2', 'tr', '', ['B2', 'Rq']); ln(d, 'C', 'col', 'UN', [[-10, 0], 'Rp', 'Rq', [10, 0]]);
  return d;
}
/* c29, c30 : comme c18 (boîtes sans réseau indiqué), réseau indiqué des tuyaux : rW (WC → B1), rD (descente → B2), aval (boîte → regard public) */
function unitaireTroncons(rW, rD, aval){
  const d = unitaire('', '');
  d.el.forEach(e => { if (e.k === 'ln' && e.t === 'tr') e.p.res = e.id === 'tW' ? rW : e.id === 'tD' ? rD : aval; });
  return d;
}
/* c32 : WC → B1 → regard public ; à côté, B3 (profondeur 0,90) au bout d'un tuyau laissé libre côté maison, vers un autre regard public */
function unitaireAcote(){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 10); pt(d, 'B1', 'boite', 0, 4, Object.assign({prof: '0,80'}, LIMITE)); pt(d, 'Rp', 'regard_pub', 0, 0, {res: 'UN'});
  pt(d, 'B3', 'boite', 6, 4, Object.assign({prof: '0,90'}, LIMITE)); pt(d, 'Rq', 'regard_pub', 6, 0, {res: 'UN'});
  ln(d, 'tW', 'tr', '', ['W', 'B1']); ln(d, 'tB', 'tr', '', ['B1', 'Rp']); ln(d, 'tM', 'tr', '', [[6, 9], 'B3']); ln(d, 'tB3', 'tr', '', ['B3', 'Rq']);
  ln(d, 'C', 'col', 'UN', [[-10, 0], 'Rp', 'Rq', [10, 0]]);
  return d;
}
/* c33 : boucle. WC → raccord J → regard public Rp (par un raccord J2 si raccord) ; descente → raccord K → raccord Lq → regard public Rq ;
   la boîte B (comme B1) sur le tuyau qui relie J à K, hors des plus courts chemins des deux sources ; tuyaux sans sens dessiné */
function unitaireBoucle(raccord){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 12); pt(d, 'J', 'jonction', 0, 6); pt(d, 'B', 'boite', 4, 6, Object.assign({prof: '0,80'}, LIMITE)); pt(d, 'K', 'jonction', 8, 6);
  pt(d, 'Lq', 'jonction', 8, 3); pt(d, 'D', 'descente', 12, 12, {cote: 'avant'}); pt(d, 'Rp', 'regard_pub', 0, 0, {res: 'UN'});
  pt(d, 'Rq', 'regard_pub', 8, 0, {res: 'UN'});
  ln(d, 'tW', 'tr', '', ['W', 'J']); ln(d, 'tJB', 'tr', '', ['J', 'B']); ln(d, 'tBK', 'tr', '', ['B', 'K']); ln(d, 'tKL', 'tr', '', ['K', 'Lq']);
  ln(d, 'tL', 'tr', '', ['Lq', 'Rq']); ln(d, 'tD', 'tr', '', ['D', 'K']);
  if (raccord){ pt(d, 'J2', 'jonction', 0, 3); ln(d, 'tJ', 'tr', '', ['J', 'J2']); ln(d, 'tJ2', 'tr', '', ['J2', 'Rp']); }
  else ln(d, 'tJ', 'tr', '', ['J', 'Rp']);
  ln(d, 'C', 'col', 'UN', [[-10, 0], 'Rp', 'Rq', [20, 0]]);
  return d;
}
/* c49 à c61 (m164) : boîtes sans réseau indiqué, mêlées d'après le dessin ; B1 comme en c22 (à 0,80 m, à l'intérieur, profondeur 0,80).
   c51 : comme c22 (WC et descente vers B1, puis le collecteur unitaire), tuyau du WC tracé à l'outil « Tronçon EU », celui de la
   descente à l'outil « Tronçon EP » */
function meleeUne(){ const d = unitaireUne(null, true); elDe(d, 'tW').p.res = 'EU'; elDe(d, 'tD').p.res = 'EP'; return d; }
/* c54 : sans collecteur : WC → tuyau tW (réseau rW) → B1 → tuyau tL (réseau rL) laissé libre */
function sansCollecteur(rW, rL){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 10); pt(d, 'B1', 'boite', 0, 4, Object.assign({prof: '0,80'}, LIMITE));
  ln(d, 'tW', 'tr', rW, ['W', 'B1']); ln(d, 'tL', 'tr', rL, ['B1', [0, 0]]);
  return d;
}
/* c55 : comme c31 (WC → B1 → regard public Rp du collecteur unitaire), et B1 → regard public Rs d'un collecteur EU K */
function deuxCollecteurs(){
  const d = unitaireUne(null, false);
  pt(d, 'Rs', 'regard_pub', 6, -4, {res: 'EU'}); ln(d, 'tS', 'tr', '', ['B1', 'Rs']); ln(d, 'K', 'col', 'EU', [[-10, -4], 'Rs', [10, -4]]);
  return d;
}
/* c56 : WC → « Tronçon EU » → B1 ← « Tronçon EP » ← descente, sans collecteur ni autre tuyau */
function euEpSeuls(){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 10); pt(d, 'B1', 'boite', 0, 4, Object.assign({prof: '0,80'}, LIMITE)); pt(d, 'D', 'descente', 4, 10, {cote: 'avant'});
  ln(d, 'tW', 'tr', 'EU', ['W', 'B1']); ln(d, 'tD', 'tr', 'EP', ['D', 'B1']);
  return d;
}
/* c57 : descente → « Tronçon EP » → B1 → regard public Rp du collecteur EU */
function collEuTronconEp(){
  const d = nouveau();
  pt(d, 'D', 'descente', 0, 10, {cote: 'avant'}); pt(d, 'B1', 'boite', 0, 4, Object.assign({prof: '0,80'}, LIMITE)); pt(d, 'Rp', 'regard_pub', 0, 0, {res: 'EU'});
  ln(d, 'tD', 'tr', 'EP', ['D', 'B1']); ln(d, 'tB', 'tr', '', ['B1', 'Rp']); ln(d, 'C', 'col', 'EU', [[-10, 0], 'Rp', [10, 0]]);
  return d;
}
/* c62 : WC → « Tronçon EU » → B1 (comme en c22), posée sur un sommet du collecteur unitaire C, sans regard public */
function boiteSurCollecteur(){
  const d = nouveau();
  pt(d, 'W', 'wc', 0, 10); pt(d, 'B1', 'boite', 0, 0, Object.assign({prof: '0,80'}, LIMITE));
  ln(d, 'tW', 'tr', 'EU', ['W', 'B1']); ln(d, 'C', 'col', 'UN', [[-10, 0], 'B1', [10, 0]]);
  return d;
}
/* c39 à c48 (m156) : zone unitaire, boîtes sans réseau indiqué : B1 (à 0,80 m, à l'intérieur, profondeur 0,60), B2 (à 1,50 m, à
   l'extérieur, profondeur 1,10). WC → B1 → regard public Rp ; descente S → puisard P ; trop-plein Q de P vers B2 (ou B1), orienté depuis
   P (sens 1) ou sans sens (sens 0) ; B2 → regard public Rq ; Rp et Rq sur le collecteur unitaire C. Formes : 'deux' (WC et descente, deux
   boîtes), 'une' (le trop-plein arrive en B1), 'seule' (sans WC), 'meme' (descente reliée à B1, sans puisard), 'drain' (drain
   d'infiltration de S au puisard posé sur son dernier sommet), 'bifurcation' (S → regard R, puis R → P et R → regard public Rr d'un second
   collecteur unitaire C2 : le trop-plein atteint C, que la bifurcation n'atteint pas ; le second parcours de l'analyse est donc gardé, et
   la bifurcation filtre les réseaux), 'multiple' (deux trop-pleins de plus, du même sens que Q, de P vers deux autres destinations E1 et
   E2 : « multiple » tiré du trop-plein), 'libre' (B2 → tuyau « Tronçon unitaire » laissé libre), 'boucle' (un second trop-plein, du même
   sens que Q, de P vers le regard K, puis le regard public Rk du collecteur ; B3, à 2,00 m, à l'extérieur, profondeur 0,90, sur le tuyau
   B2 → B3 → K qui relie les deux branches, hors des plus courts chemins du trop-plein) */
function tropPlein(forme, sens){
  const B = (n, x, y, p) => [n, 'boite', x, y, Object.assign({limDist: '0,80', limCote: 'int', prof: '0,60'}, p || {})];
  const X = (n, x, y, nom, art) => [n, 'exutoire', x, y, {nom, ab: nom.slice(0, 2), art, ep: 'conforme', cst: 'autre'}];
  const b2 = B('B2', 8, 4, {limDist: '1,50', limCote: 'ext', prof: '1,10'}), rq = ['Rq', 'regard_pub', 8, 0, {res: 'UN'}];
  const o = forme === 'seule' ? [] : [['W', 'wc', 0, 10], B('B1', 0, 4), ['Rp', 'regard_pub', 0, 0, {res: 'UN'}]];
  const l = forme === 'seule' ? [] : [['tW', 'tr', '', '', ['W', 'B1']], ['tB1', 'tr', '', '', ['B1', 'Rp']]], pc = forme === 'seule' ? [] : ['Rp'];
  o.push(['S', 'descente', 8, 14]);
  if (forme === 'meme') l.push(['tS', 'tr', '', '', ['S', 'B1']]);
  else {
    o.push(['P', 'puisard', 8, 9]);
    if (forme === 'drain') l.push(['T', 'tr', '', '', ['S', [8, 11.5], 'P'], 0, {drain: 'infiltration'}]);
    else if (forme === 'bifurcation'){
      o.push(['R', 'regard', 8, 12], ['Rr', 'regard_pub', 16, 12, {res: 'UN'}]);
      l.push(['tS', 'tr', '', '', ['S', 'R']], ['tR', 'tr', '', '', ['R', 'P']], ['tRr', 'tr', '', '', ['R', 'Rr']], ['C2', 'col', 'UN', '', [[16, 18], 'Rr', [16, 6]]]);
    } else l.push(['tS', 'tr', '', '', ['S', 'P']]);
    if (forme === 'multiple'){
      o.push(X('E1', 13, 9, 'Étang Fictif', 'l\''), X('E2', 13, 12, 'Mare Fictive', 'la'));
      l.push(['Q2', 'tr', '', '', ['P', 'E1'], sens], ['Q3', 'tr', '', '', ['P', 'E2'], sens]);
    }
    if (forme === 'une') l.push(['Q', 'tr', '', '', ['P', 'B1'], sens]);
    else {
      o.push(b2); l.push(['Q', 'tr', '', '', ['P', 'B2'], sens]);
      if (forme === 'libre') l.push(['tB2', 'tr', 'UN', '', ['B2', [8, 1]]]);
      else { o.push(rq); l.push(['tB2', 'tr', '', '', ['B2', 'Rq']]); pc.push('Rq'); }
      if (forme === 'boucle'){
        o.push(['K', 'regard', 14, 4], ['Rk', 'regard_pub', 14, 0, {res: 'UN'}], B('B3', 11, 4, {limDist: '2,00', limCote: 'ext', prof: '0,90'}));
        l.push(['Q4', 'tr', '', '', ['P', 'K'], sens], ['tK', 'tr', '', '', ['K', 'Rk']], ['tL1', 'tr', '', '', ['B2', 'B3']], ['tL2', 'tr', '', '', ['B3', 'K']]);
        pc.push('Rk');
      }
    }
  }
  l.push(['C', 'col', 'UN', '', [[-10, 0]].concat(pc, [[20, 0]])]);
  return abrege({o, l});
}
/* témoins de c18, sans VCroquis.boitesConstat (lancés aussi sur ddb0b74) : les deux boîtes sans réseau indiqué sont unitaires d'après le
   dessin ; le réseau indiqué dans leur fiche (EU, EP) ne donne aucune anomalie de collecteur sur le collecteur unitaire */
function temoinsUnitaire(){
  const u1 = unitaire('', ''), eu1 = etiquette(u1, 'B1').split('\n')[0], eu2 = etiquette(u1, 'B2').split('\n')[0];
  R.ok(eu1 === 'Boîte de branchement unitaire' && eu2 === 'Boîte de branchement unitaire', 'c18 témoin : étiquettes des deux boîtes sans réseau indiqué (' + eu1 + ' ; ' + eu2 + ')');
  const obs = d => { const L = sur(() => V.anomaliesDoc(copie(d), V.analyser(copie(d), 'edl'), [], {telQuel: true})); return Array.isArray(L) ? L.map(a => a.obs) : [JSON.stringify(L)]; };
  const o2 = obs(unitaire('EU', 'EP')), oEP = obs(unitaire('EU', 'EP', 'EP'));
  R.ok(!o2.some(t => /rejet au collecteur/.test(t)) && oEP.some(t => t === 'Boîte de branchement EU : rejet au collecteur EP'),
    'c18 témoin, réseau indiqué sur le collecteur unitaire : aucune anomalie de collecteur (' + (o2.join(' | ') || 'aucune') + ') ; collecteur EP : ' + (oEP.join(' | ') || 'aucune'));
  /* m140 : l'étiquette des boîtes ne change pas (unitaire d'après le dessin) ; elle ne dit pas le réseau des appareils */
  const tetes = [unitaireRaccord(), unitaireSerie(true), unitaireDrain(true)].map(d => ['B1', 'B2'].map(id => etiquette(d, id).split('\n')[0]).join(' ; '));
  R.ok(tetes.every(t => t === 'Boîte de branchement unitaire ; Boîte de branchement unitaire'), 'c19 à c27 témoin : étiquettes des boîtes inchangées, unitaires ('
    + tetes.join(' | ') + ')');
}

(async () => {
  limite();
  etiquettes();
  await sorties();
  parcelle();
  temoinsUnitaire();
  constat();
  R.fin();
})().catch(e => { console.log('ERREUR ' + (e && e.stack || e)); process.exitCode = 1; });
