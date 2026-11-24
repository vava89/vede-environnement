// Constat délesté (m158 à m161 ; DL1 à DL9, DL12 à DL16, DL18, DL20 pour la page 1 ; DL6, DL8, DL10, DL11, DL16, DL18 et DL20 pour
// la page 2 ; DL17, page unique, et DL4, marque notée à la signature, pour m161 ;
// DL25, cartes et notes du § 12 de .claude/conception-v173.md), dans l'application (Chromium, données fictives : « Nom
// Fictif », « 12 rue Fictive », « Ville-Exemple », téléphone fictif). Le PDF est relevé appel par appel (C.relevePdf de commun.js). Les
// textes fixes du constat n'y sont jamais écrits en clair : le témoin les garde par empreinte, les cas D ne nomment que des libellés
// génériques et les valeurs saisies (les textes fixes de la page 2 ne se lisent que dans le relevé du formulaire du même dossier), et
// un écart sur un relevé entier est dit en empreintes.
// T0 (témoin des constats signés, DL25) : cinq dossiers fictifs imprimés, relevés sur toutes les pages (textes, traits, rectangles,
//     images par empreinte, pages) et comparés appel par appel au témoin tests/navigateur/temoins/constat-signe.json, relevé sur la base
//     (aa8095c) : le premier écart est dit, en empreintes. (1) signé (c-lock), marque retirée : présentation 1, 12 rangées ; (2) signé,
//     marque 2 : rejet des EP dans un puits, boîte et côté, réserves, préconisations (boîte et gargouille à créer, D et T), désagréments
//     « oui », propriété publique, croquis de position ; (3) signé, gel retiré ; (4) signé, marque 2, refus de visite ; (5) non signé.
//     Les quatre signés le sont étude en « Formulaire complet » et s'impriment étude en « Délesté » : un constat signé ne suit jamais
//     l'option. Le non signé s'imprime avec « Formulaire complet » rangé (C.formeConstat), et reste ainsi valable quand le défaut changera
//     (m163). Fixés : identifiants (« ID » dans les textes), date de signature (réécrite après c-lock), dates de la visite et de la
//     demande, fuseau 'Europe/Paris' ; un second relevé, dans un profil neuf, est identique au premier. Toute chaîne du témoin autre que
//     les valeurs fictives saisies par le test (FICTIFS) est une empreinte : contrôlé à chaque passage.
//     Drapeau --relever (avec --app=<dossier de la base>) : ne lance que T0 et écrit le témoin (une ligne par appel). À refaire, sur la
//     version d'avant le changement, après une mise à jour de jsPDF, des polices ou du fuseau (§ 13 de la conception).
// Page 1 attendue (m159, DL8 et DL9) : la page 1 du formulaire du même dossier, coupée en rubriques par leurs boîtes au formulaire
//     (en-tête au-dessus de 153,8), puis transformée : en-tête sans gabarit de date, motif seulement si la visite n'est pas effectuée,
//     sa case cochée à la place de la première ; champ vide parti avec son libellé ; catégorie choisie seule, dans une case de 85 × 23,5 ;
//     cases cochées seules, aux premières places (contrôle, désagréments) ou enchaînées dès 245,6 (récupération) ; légende réduite aux
//     codes imprimés ; tableau : celui de cstTableDeleste en 360 + dy, place du calcul ; position entière ; chaque rubrique décalée de son
//     dy. Comparée appel par appel, au 0,004 pt près (arrondis du relevé). Une rubrique remplie au formulaire et absente du calcul
//     (constatDeleste, appelé dans la page comme le dessin, mesure de production), ou l'inverse, est une faute.
// Page 2 attendue (m160, DL10) : un calcul attendu (planP2), tiré des données du dossier : boîte (visite effectuée : rangées ayant une
//     valeur, colonnes employées), conclusion, préconisations privées et publiques (lignes gardées selon les gardes de la conception),
//     observations (texte imprimé non vide) ; le premier élément gardé en 22,5, chaque suivant au bas du précédent plus son écart,
//     chaque ligne à la fin de la gardée d'avant plus le plus grand interligne qui l'en sépare. Le calcul constatDeleste lui est égal
//     (éléments, ordre, dy, h, lignes, rangées, colonnes) et ne descend jamais sous la place du formulaire (dy ≤ 0, rien sous 581). La
//     page 2 du délesté est la page 2 du formulaire du même dossier, coupée en lignes par leurs ordonnées (FEN2), transformée (cadre ;
//     boîte réduite à ses rangées et à ses colonnes ; champ vide parti avec son libellé, sans pointillé ; cases cochées seules, aux
//     premières places ; conclusion réduite à sa case choisie) et décalée de y − y0 ; puis le pied du formulaire, sans « Je, soussigné… »
//     ni légende du propriétaire si la visite n'est pas effectuée (DL20). Comparée appel par appel, état compris (couleurs, épaisseur,
//     motif). Une ligne remplie au formulaire (un texte de la couleur des valeurs, telle que le relevé la lit : la bibliothèque PDF
//     arrondit 20, 40, 140 en 19, 40, 139 ; ou une case cochée) et absente du calcul attendu est une faute.
// Page unique (m161, DL17) : le calcul finit par le pied, {id: 'pied', page: 1 ou 2, dy: 0, h: 231,5}, seul et dernier, les éléments de
//     la page 2 dans la page du pied (forme du calcul). Calcul entier attendu (planEntier) : les pages 1 et 2 attendues ; s = (bas de la
//     dernière rubrique + 8, ou 153,8 sans rubrique) − 22,5 ; fin : bas du dernier élément de la page 2 + s, ou bas de la page 1 si la
//     page 2 est vide ; fin ≤ 580,5, ou rien : une seule page, chaque élément de la page 2 en page 1, dy + s, ses lignes en y + s ; sinon
//     deux pages, comme en m160. Le calcul constatDeleste lui est égal ; aucune page neuve si et seulement si le pied est en page 1, au plus
//     une ; relevé entier attendu : la page 1 attendue, puis la page 2 attendue sans sa page neuve ni son cadre, décalée de s et mise en
//     page 1 (le pied non décalé), ou, sur deux pages, les deux pages attendues l'une après l'autre ; garde-fous : rien sous 816 (sauf le
//     cadre), aucune page 3. Pour les contrôles écrits pour deux pages (m159, m160), une page unique est ramenée à deux (aide ramener : la
//     suite de la page 1 remonte de s, en page 2, sous la page neuve et le cadre du formulaire du même dossier ; le pied en page 2). Chaque
//     cas passe aussi par ces contrôles (verifP1) : 50 en tout, 31 sur une page et 19 sur deux ; les 41 cas de m159 et m160 : 26 et 15 ;
//     D7 : 4 et 4 ; D4 : 1 sur une page.
// D1 (DL2, DL3) : liste « Constat imprimé » (#m-cforme) de « En-tête des fiches » : '' « Par défaut (formulaire complet) » en tête et
//     choisie pour une étude neuve, puis « Délesté : seulement ce qui est rempli ou coché » et « Formulaire complet » ; enregistrer sans
//     toucher la liste ne range aucune forme (clé absente) ; « Délesté » range 'deleste', montré à la réouverture ; « Par défaut » retire
//     la clé ; le département, la commune, le logo et une clé posée avant restent (en mémoire et dans la base de la tablette).
// D2 (DL12 à DL15) : constat non signé, étude en « Délesté » : WC (1, EU D, conforme) et une ligne ajoutée « Fontaine » (EP, 1,
//     Gargouille, conforme) : ces deux rangées seules, dans cet ordre, de 17,5 pt ; en-têtes Installation, Nb, Raccordée sur, Réseau EU,
//     D, Gar-, gouille, Conforme et Oui, sans autre ; verticales et largeurs de cstColonnes (somme 479), égales au calcul du test
//     (surplus d'une colonne seule) ; croix au centre de leur colonne (0,1 pt), Nb et croix en 10,5 pt, posés comme au formulaire ;
//     page 2 : au formulaire, la boîte de la présentation 2 ; au délesté (m160), sans valeur de boîte, aucun trait de boîte, et la
//     conclusion seule (titre 30,5, installations 51,4). Le même dossier en « Formulaire complet », puis sans choix : le tableau du
//     formulaire.
//     m159 : le tableau du délesté se trouve par la description du calcul (en-tête en 360 + dy, rangées dès 402 + dy) ; page 1 attendue.
// D3 : aucune ligne active (désagréments « non ») : ni description ni tableau, et les cases qui suivent gardent le fond du formulaire ;
//     visite non effectuée (refus), une ligne remplie : rien non plus ; ni croix ni conformité : Installation et Nb seuls (libellés de
//     456 pt) ; raccordement « plusieurs » : aucune colonne « Raccordée sur », sa conformité automatique (« non ») seule ; une seule
//     conformité « oui », sans raccordement : « Conforme » et Oui seuls ; une ligne EP mise à la main sur « Puits » : Puits et Non ;
//     toutes les colonnes employées : verticales de la présentation 2 (0,001 pt), en-têtes et croix à 0,05 pt de leur place au
//     formulaire (ordonnées décalées de dy), fond jaune sous « Conforme », rangées de 17,5 pt, ou de 21,5 pt si le libellé ne tient pas
//     sur une ligne ; 30 rangées actives : libellés en 8 pt au plus, rien sous le bas calculé, Nb et croix en min(10,5 ; (h − 1) / 0,72) ;
//     page 1 attendue dans les cas imprimés ; cstColonnes appelée directement (mesures factices) : surplus d'une colonne seule, partage
//     dans un groupe et dans une région, libellés d'au moins 107,5 pt, somme 479, fonction pure.
// D5 (m159) : dossier minimal (« Nom Fictif », adresse du branchement, une ligne active sans méthode, visite effectuée et datée, sans
//     demande) : calcul du nom, de l'adresse et de la description seuls (description en 191,9, place 565,3) ; page 1 attendue ; hors de
//     l'en-tête et du tableau, les libellés du nom et de l'adresse, leurs valeurs et le titre de la description seuls ; ni « Demande du »,
//     ni légende, ni case du motif, ni pointillé, ni gabarit. Le même sans adresse : le nom, puis la description en 171,6 (place 585,6).
//     m160 : page 2 minimale, la conclusion seule en 22,5 (titre 30,5, installations 51,4), sans pointillé (« Je, soussigné » nommé) ;
//     sans nom, un seul pointillé, celui de « Je, soussigné », en 596,5, de 140 pt (DL11).
// D6 (m159) : dossier complet (identification, catégorie « collectif 21 à 50 », trois méthodes, deux rangées, deux cases de récupération,
//     désagréments « oui » localisés, croquis de position) : calcul direct (ordre, 153,8, écarts, dy, h, place ≥ 234,5, rien sous 816,
//     exemples de la conception : catégorie 254,5-278, contrôle en 285,9, description en 320,2, rangées dès 379, place 257,5, bas en
//     414, récupération en 420,7, désagréments en 438,3, position en 456,1) ; page 1 attendue ; tableau en 360 + dy : celui que
//     cstTableDeleste dessine en 360, décalé de dy ; légende réduite à deux codes sur cinq. Variantes, chacune avec son calcul et sa page 1
//     attendue : mail vide (ligne gardée), adresse du propriétaire vide (ligne partie), sans nom ni référence (adresse en 153,8), rien
//     d'identifié (catégorie en 153,8), désagréments « oui » sans localisation puis « non », catégories habitation, centre hospitalier et
//     propriétés publiques (deux lignes à 9,3 pt l'une de l'autre), catégorie sans nombre (partie) ; 30 rangées, ramenées à la place : les
//     rubriques qui suivent descendent sous leur place du formulaire (récupération en 643,2, dy +16), et sans désagréments ni position,
//     la récupération finit en 816 (805-816, dy +177,8 ; place 419,3).
//     m160 : page 2 du dossier complet (boîte en EU et en EP, réseau territorial avec gestionnaire et rue, réserves, préconisations :
//     boîte en EU, sur branchement à créer en EU, gargouille à créer, création à l'EU départementale et à l'EP territoriale ;
//     observations) : l'exemple de la conception (boîte 22,5-66,5 ; conclusion, titre 82,5, dy −26,5, sans ligne des réserves ; privées,
//     titre 154, dy −45,1 ; publiques, titre 263,1, dy −202,2 ; observations en 333,5, dy −216,9) ; le gestionnaire en 100,1, la rue
//     en 114,9, la réserve sur la ligne des installations (135,8), l'observation en 341,5. Les variantes ont aussi leur page 2 attendue.
// D9 (m159 ; E2) : sans plan de terrain, croquis de position, étude en « Délesté » : imprimé module du croquis présent, absent et
//     désactivé (vc-actif, puis réactivé) : trois relevés identiques ; position présente et décalée (image en 40 ; 676 + dy, dy < 0).
// D13 (m159 ; DL20) : refus de visite, dossier par ailleurs complet : identification et catégorie seules au calcul ; le motif « refus »
//     seul, à la première place ; ni « Visite du », ni contrôle, ni tableau, ni récupération, ni désagréments, ni position ; variante :
//     absence, avec ses dates d'absence. m160 : page 2 du refus, la conclusion (titre 30,5, réseau 48,1, rue 62,9), puis les observations
//     en 72,9 ; pied sans « Je, soussigné… » ni légende du propriétaire (DL20).
// D8 (m160 ; DL20) : refus de visite avec le réseau départemental et la rue, la boîte et des préconisations : la conclusion réduite au
//     réseau et à la rue (« Conclusion : » en 30,5, réseau en 48,1, rue en 62,9), sans boîte, sans « Installations considérées » ni
//     préconisation ; pied sans « Je, soussigné… » ni légende du propriétaire : la légende et la seule signature du technicien. Sans
//     réseau ni rue : rien entre le cadre et le pied.
// D10 (m160 ; DL8, DL18) : boîte EP seule (côté « extérieur », profondeur « 1,35 m environ ») : sa colonne à la place de celle des EU
//     (sept traits jusqu'à 386,5, l'en-tête « EP » seul, du vert du formulaire, en 356,8) ; le côté en sa seule case, cochée, centrée en
//     356,8 ; la profondeur, trop large pour sa case en 9,5 pt mais qui tient en 7 pt, sur la ligne de son libellé (63,375), de 7 à
//     9,5 pt (règle de CLAUDE.md).
// D11 (m160 ; DL8, DL10) : conclusion. Vide : le titre, les installations et la ligne des réserves, trois cases vides, sans pointillé ;
//     « avec réserves » : sa case cochée en 184,3 et « Réserve fictive » sur la ligne des installations, sans ligne des réserves ; réseau
//     seul (départemental, territorial avec gestionnaire, territorial sans gestionnaire) : la case cochée en 249,5, sur la ligne du réseau
//     (48,1), puis son texte ou le gestionnaire ; rue seule : le libellé du réseau seul, sans case, en 48,1, puis « Rue fictive » en 62,9.
// D12 (m160 ; DL8, DL10) : préconisations (WC conforme). Privées : « - sur branchement à créer » seule (la tête sans case, la sous-ligne
//     et sa case en 269,4) ; raccordement des EP au branchement EP seul (une ligne, à la fin du paragraphe + 17,8, sa case en 170,2 sur la
//     ligne du libellé) ; non conforme sans préconisation (anomalie EU posée en mémoire, retirée ensuite) : le titre et le paragraphe
//     seuls, les observations gardées ; conforme sans préconisation : ni préconisations privées ni publiques. Publiques : création à
//     l'unitaire départementale (UN au titre + 17,4, la note D à UN + 17,2) ; création à l'EU territoriale (EU au titre + 17,4, sa case
//     « territorial » à la première place, 269,4, la note T à EU + 17,2).
// D7 (m161 ; DL17) : une seule page : dossier minimal (s 253,7), refus de visite (s 263,5) : aucune page neuve, le pied en page 1,
//     « Conclusion : » en 30,5 + s ; rien en page 1, une boîte et des observations : aucune rubrique, s = 153,8 − 22,5 = 131,3, la
//     boîte en 22,5 + s = 153,8, « Conclusion : » en 82,5 + s. Deux pages : dossier complet (position comprise ; la position seule
//     n'impose pas deux pages : D9 tient sur une page), 30 rangées, quinze lignes avec toutes les préconisations et 600 caractères
//     d'observations (préconisations et observations : les appels du formulaire décalés de leur dy) : une page neuve, suivie du cadre,
//     le pied en page 2. Deux dossiers voisins : treize lignes, fin attendue 580,5 exactement, une page ; quatorze lignes, fin 598, deux
//     pages.
// D4 (m161 ; DL4) : signé (c-lock) étude en « Délesté » : marque 3, imprimé délesté (contrôles de la page unique) ; l'étude passée à
//     « Formulaire complet » : le constat signé ne change pas, appel par appel ; « Modifier », puis signé de nouveau : marque 2, le
//     formulaire du même dossier ; dossiers neufs signés étude en « Formulaire complet » puis sans choix : marque 2 ; [p] la fiche qui
//     suit le constat signé (fichePdfBlob, constat compris : C.relevePdf avec o.fiche) se dessine après un constat en 3 comme après le même
//     en 2 (une page, deux pages, refus de visite), et le constat en 3 laisse le document dans l'état où le laisse le même en 2 (o.etat :
//     trait, couleurs, police, taille, motif, interligne, espacement des lettres ; en visite non effectuée, le délesté le laissait en trait
//     cyan de 0,75, le formulaire en gris de 0,6, celui de ses pointillés : état remis en fin de drawConstatDeleste) ; un constat signé
//     sans gel, gelé à l'ouverture du croquis (constatGeler) : gel posé, sans marque.
// Échouaient sur 74dc8ef (avant m159), 99 contrôles sur 150 : D2, D3 (le tableau et la page 1 attendue), D5, D6, D9 et D13 (pas de
// calcul constatDeleste, page 1 du formulaire). Y passaient : T0, D1, les garde-fous du tableau du formulaire et de cstColonnes, la
// page 2 (alors celle du formulaire), l'égalité des trois relevés de D9 (le croquis de terrain n'y change rien) et l'absence d'erreur.
// Échouent sur 1c691b7 (avant m160), 104 contrôles sur 305, tous de la page 2 : le calcul de la page 2 (vide), sauf dans les deux cas
// où rien n'y est gardé (D3 refus, D8 sans réseau ni rue) ; la page 2 attendue, dans les 41 cas ; les contrôles propres de la page 2 de
// D2, D5, D6, D13, D8 et D10 à D12 (page 2 du formulaire). Y passent : T0, D1, la page 1 de chaque cas, les propriétés du calcul de la
// page 2 (vide), la prémisse de D10 et le cas conforme sans préconisation de D12.
// Échouent sur 67e85ae (avant m161), 225 contrôles sur 627 : dans les 50 cas, la forme du calcul, le calcul entier attendu et les
// garde-fous (pas de pied au calcul) ; dans les 31 cas qui tiennent sur une page, la règle d'une page et le relevé entier attendu (deux
// pages imprimées) ; D7 : les quatre « une seule page », les trois valeurs de s (la boîte en 153,8 comprise) et les dossiers voisins ;
// D4 : la marque 3 (2 notée), les pages 1 et 2 délestées du constat signé (le formulaire imprimé) et son identité quand l'étude change ;
// D4 [p] : l'état de fin du refus de visite (le délesté imprimé en 3, le formulaire en 2). Y passent : T0, D1, les contrôles de m159 et
// m160 des autres cas, les cas de D7 sur deux pages, la marque 2 de D4 (après « Modifier » et dossiers neufs), la fiche de D4 [p] et
// l'état de fin de ses deux autres dossiers, le gel sans marque et l'absence d'erreur.
'use strict';
const C = require('./commun.js'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const R = C.rapport('constat-deleste');
const RELEVER = process.argv.indexOf('--relever') >= 0;
const TEMOIN = path.join(__dirname, 'temoins', 'constat-signe.json');
/* signature fictive (image PNG d'un point), comme dans constat-boite.js ; sert aussi de croquis de position */
const SIG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
/* valeurs fictives saisies par le test : seules chaînes que le témoin garde en clair (chacune doit se dire fictive) */
const FICTIFS = ['Nom Fictif', '12 rue Fictive', '99000 Ville-Exemple', 'nom.fictif@exemple.org', '06 39 98 12 34', 'Parcelle fictive 12', 'Maison fictive',
  'Cave fictive', 'Rue fictive', 'Gestionnaire fictif', 'Réserve fictive', 'Observation fictive', 'Ligne fictive'];
const FICTIF = /fictif|fictive|exemple|^06 39 98|^01 99 00/i;
const H = s => 'h:' + crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, 12);
const EMPREINTE = /^h:[0-9a-f]{12}$/;
const GENRES = ['t', 'l', 'r', 'i', 'p', '?'];
const pres = (a, b, e) => typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) <= e;

/* ---------- T0 : témoin des constats signés ---------- */

/* relevé mis en empreintes : chaque chaîne (sauf le genre de l'appel), identifiants de l'étude et du dossier remplacés par « ID », devient
   son empreinte, sauf une valeur de FICTIFS */
function empreintes(L, ids){
  const ch = x => { if (typeof x === 'string'){ let s = x; ids.forEach(id => { if (id) s = s.split(id).join('ID'); }); return FICTIFS.indexOf(s) >= 0 ? s : H(s); }
    return Array.isArray(x) ? x.map(ch) : x; };
  return L.map(a => a.map((x, i) => i === 0 ? x : ch(x)));
}
/* contrôle du témoin : appels connus, toute chaîne une empreinte ou une valeur de FICTIFS, rien d'autre (ni objet) ; rend les fautes */
function controle(T){
  const fautes = [];
  if (!FICTIFS.every(s => FICTIF.test(s))) fautes.push('FICTIFS : valeur non fictive');
  Object.keys(T).forEach(n => (Array.isArray(T[n]) ? T[n] : [null]).forEach((a, j) => {
    const ou = 'dossier ' + n + ', appel ' + (j + 1);
    if (!Array.isArray(a) || GENRES.indexOf(a[0]) < 0){ fautes.push(ou + ' : genre inconnu'); return; }
    const voir = x => { if (typeof x === 'string'){ if (!EMPREINTE.test(x) && FICTIFS.indexOf(x) < 0) fautes.push(ou + ' : chaîne en clair'); }
      else if (Array.isArray(x)) x.forEach(voir); else if (x !== null && typeof x !== 'number' && typeof x !== 'boolean') fautes.push(ou + ' : valeur inattendue'); };
    a.slice(1).forEach(voir);
  }));
  return fautes;
}
/* témoin écrit compact : un appel par ligne, sans indentation */
const texteTemoin = T => '{' + Object.keys(T).map(n => JSON.stringify(n) + ':[\n' + T[n].map(a => JSON.stringify(a)).join(',\n') + '\n]').join(',\n') + '}\n';

/* dossier n de T0 (1 à 5), préparé sur le dossier unique de l'étude ; 1 à 4 signés par le geste « Signer » (c-lock, page sur le
   dossier), étude en « Formulaire complet » ; rend l'état du constat (« marque 2 », « sans marque », « sans gel », « non signé ») */
const preparerT0 = (p, n) => p.evaluate(async ([n, png]) => {
  const T = window.__VT, v = T.S.visites[0];
  Object.assign(v, {statut: n === 4 ? 'refus' : 'visitee', dateVisite: '2026-11-18', absences: [], nom: 'Nom Fictif', tel: '06 39 98 12 34', mail: 'nom.fictif@exemple.org',
    domicile: '12 rue Fictive', domVille: '99000 Ville-Exemple', adresse: '12 rue Fictive', commune: '99000 Ville-Exemple'});
  delete v.constat; const c = v.constat = T.constatEval(v, []).c;
  const L = (id, o) => Object.assign(c.rows.find(r => r.id === id), o);
  Object.assign(c, {demande: '10/11/2026', refCad: 'Parcelle fictive 12', typePropriete: 'Maison fictive', nbLogements: '1', desagr: 'non', soussigne: 'Nom Fictif', sigTech: png, sigProp: png});
  if (n === 1){ L('wc', {nb: '1', raccord: 'EU_D', methodes: ['visuel', 'eau']}); L('gout_av', {nb: '2', raccord: 'EP_D', methodes: ['visuel']}); c.observations = 'Observation fictive'; }
  if (n === 2){
    L('wc', {nb: '1', raccord: 'EU_T', methodes: ['fluo']}); L('lavelinge', {nb: '1', raccord: 'UN_D'}); L('gout_ar', {nb: '1', raccord: 'PUITS', methodes: ['visuel']});
    L('grilles', {nb: '3', raccord: 'GARG', methodes: ['eau', 'fumee']});
    c.boite = {distEU: '0,80 m', coteEU: 'intérieur', profEU: '0,80 m', teEU: 'oui', distEP: '1,20 m', coteEP: 'extérieur', profEP: '1,10 m'};
    c.conclusion = 'reserves'; c.reserves = 'Réserve fictive';
    c.precos = {boite_EU: true, boiteCr_EU: true, gargCr: true, pubEU_D: true, pubEU_T: true, pubEP_D: true, pubEP_T: true};
    c.desagr = 'oui'; c.desagrLoc = 'Cave fictive'; c.categorie = 'pub_acc'; c.categorieNb = '2'; c.epRecup = {puisard: true, recup: true};
    c.reseau = 'territorial'; c.reseauGest = 'Gestionnaire fictif'; c.reseauRue = 'Rue fictive'; c.croquis = png; c.methodes = {reso: true};
  }
  if (n === 3){ L('evier', {nb: '1', raccord: 'FOSSE'}); L('siphon_sol', {nb: '1', raccord: 'MILIEU', conforme: 'oui'}); c.conclusion = 'non_conformes'; }
  if (n === 4){ L('wc', {nb: '1', raccord: 'EU_D'}); c.reseauRue = 'Rue fictive'; c.observations = 'Observation fictive'; }
  if (n === 5){
    L('wc', {nb: '2', raccord: 'EU_D', methodes: ['visuel']}); L('sdb', {nb: '1', raccord: 'UN_T', conforme: 'non'});
    c.rows.push({id: 'ajout-fictif-1', groupe: 'EP', label: 'Ligne fictive', std: false, nb: '1', raccord: 'EP_T', conforme: '', methodes: ['reso']});
    c.boite = {distEU: 'en limite', profEU: '0,60 m'}; c.sigProp = '';
  }
  if (n <= 4){
    await T.ACTIONS['c-lock']();
    if (!v.constat.signeLe) return 'non signé par c-lock';
    v.constat.signeLe = '2026-11-18T09:30:00.000Z';
    if (n === 1) delete v.constat.fige.mep;
    if (n === 3) delete v.constat.fige;
  }
  await T.DB.put('visites', v); await T.flushSaves();
  const k = v.constat;
  return !k.signeLe ? 'non signé' : !k.fige ? 'sans gel' : k.fige.mep === undefined ? 'sans marque' : 'marque ' + k.fige.mep;
}, [n, SIG]);

/* T0 relevé dans un profil neuf : {1: relevé en empreintes, …, 5: …} et l'état des constats */
async function releveT0(){
  const A = await C.ouvrir({fuseau: 'Europe/Paris'}), p = A.p, T = {}, etats = [];
  try {
    await C.etudeEtDossier(p);
    const ids = await p.evaluate(() => [window.__VT.S.etude.id, window.__VT.S.visites[0].id]);
    for (const n of [1, 2, 3, 4, 5]){
      await C.formeConstat(p, 'complet');
      etats.push(await preparerT0(p, n));
      await C.formeConstat(p, n <= 4 ? 'deleste' : 'complet');
      T[n] = empreintes(await C.relevePdf(p), ids);
    }
    if (A.erreurs.length) R.info('erreurs de la page : ' + A.erreurs.length);
  } finally { await A.fermer(); }
  return {T, etats, erreurs: A.erreurs.length};
}

async function t0(){
  const a = await releveT0(), b = await releveT0();
  R.ok(a.etats.join(', ') === 'sans marque, marque 2, sans gel, marque 2, non signé' && !a.erreurs,
    'T0 : dossiers 1 à 5 préparés (' + a.etats.join(', ') + ' ; ' + a.erreurs + ' erreur(s) de la page)');
  const ec = [1, 2, 3, 4, 5].map(n => { const e = C.premierEcart(b.T[n], a.T[n]); return e ? 'dossier ' + n + ', ' + e : ''; }).filter(Boolean);
  R.ok(!ec.length, 'T0 : un second relevé, dans un profil neuf, est identique au premier' + (ec.length ? ' (' + ec[0] + ')' : ''));
  const f = controle(a.T);
  R.ok(!f.length, 'T0 : toute chaîne du relevé est une empreinte ou une valeur fictive saisie par le test' + (f.length ? ' (' + f.slice(0, 3).join(' ; ') + ')' : ''));
  if (RELEVER){
    if (!ec.length && !f.length){ fs.mkdirSync(path.dirname(TEMOIN), {recursive: true}); fs.writeFileSync(TEMOIN, texteTemoin(a.T));
      R.info('témoin écrit : ' + path.relative(C.RACINE, TEMOIN) + ' (' + [1, 2, 3, 4, 5].map(n => a.T[n].length).join(', ') + ' appels)'); }
    else R.info('témoin non écrit');
    return;
  }
  let tem = null;
  try { tem = JSON.parse(fs.readFileSync(TEMOIN, 'utf8')); } catch (e){}
  if (!R.ok(!!tem, 'T0 : témoin présent et lisible (' + path.relative(C.RACINE, TEMOIN) + ' ; à relever sur la base par --relever)')) return;
  const ft = controle(tem);
  R.ok(!ft.length && Object.keys(tem).join() === '1,2,3,4,5', 'T0 : le témoin ne garde en clair que des valeurs fictives (dossiers ' + Object.keys(tem).join(', ') + ')'
    + (ft.length ? ' (' + ft.slice(0, 3).join(' ; ') + ')' : ''));
  for (const n of [1, 2, 3, 4, 5]){
    const e = C.premierEcart(a.T[n], tem[n] || []);
    R.ok(!e, 'T0 : dossier ' + n + ' (' + a.etats[n - 1] + ', imprimé étude en « ' + (n <= 4 ? 'Délesté' : 'Formulaire complet') + ' ») identique au témoin, appel par appel ('
      + a.T[n].length + ' appels)' + (e ? ' ; premier écart : ' + e : ''));
  }
}

/* ---------- Outils des cas D (relevé brut, lu seulement dans le tableau des installations) ---------- */

/* dossier d'un cas D : constat neuf, non signé, visite effectuée (s.statut sinon) ; s.visite : champs du dossier (nom, tel, mail,
   domicile, domVille, adresse, commune, absences), remis d'abord à ceux du dossier créé (adresse et commune fictives, le reste vide) ;
   s.lignes : {id: champs} des lignes du formulaire ; s.ajouts : lignes ajoutées [{groupe, label, nb, raccord, conforme, methodes}] ;
   s.champs : autres champs du constat */
const poser = (p, s) => p.evaluate(async s => {
  const T = window.__VT, v = T.S.visites[0];
  Object.assign(v, {statut: s.statut || 'visitee', dateVisite: '2026-11-18', absences: [], nom: '', tel: '', mail: '', domicile: '', domVille: '',
    adresse: '12 rue Fictive', commune: '99000 Ville-Exemple'}, s.visite || {});
  delete v.constat; const c = v.constat = T.constatEval(v, []).c;
  Object.keys(s.lignes || {}).forEach(id => Object.assign(c.rows.find(r => r.id === id), s.lignes[id]));
  (s.ajouts || []).forEach((a, i) => c.rows.push(Object.assign({id: 'ajout-fictif-' + (i + 1), std: false, nb: '', raccord: '', conforme: '', methodes: []}, a)));
  Object.assign(c, s.champs || {});
  await T.flushSaves();
}, s);
/* bornes du tableau des installations du formulaire (page 1) : la légende des méthodes (texte de droite en 563 ; 351,2) et la rubrique
   des ouvrages de récupération des EP (premier texte en y 635,2), ou null si l'une manque ; tableau : les appels entre les deux. Depuis
   m159, le tableau d'un délesté se lit par la description du calcul (tableauDel, plus loin) */
function bornes(L){
  const i0 = L.findIndex(a => a[0] === 't' && a[1] === 1 && a[2] === 563 && a[3] === 351.2);
  const i1 = i0 < 0 ? -1 : L.findIndex((a, i) => i > i0 && a[0] === 't' && a[1] === 1 && a[3] === 635.2);
  return i0 >= 0 && i1 > i0 ? [i0, i1] : null;
}
function tableau(L){ const b = bornes(L); return b ? L.slice(b[0] + 1, b[1]) : null; }
const textes = TB => TB.filter(a => a[0] === 't').map(a => ({t: a[4], x: a[2], y: a[3], f: a[5], st: a[6], sz: a[7], col: a[8]}));
const entetes = TB => textes(TB).filter(t => t.f === 'times' && t.st === 'italic');
const libelles = TB => textes(TB).filter(t => t.f === 'times' && t.st === 'normal');
const croixDe = TB => textes(TB).filter(t => t.t === 'X' && t.f !== 'times');
const nombres = TB => textes(TB).filter(t => t.f !== 'times' && t.t !== 'X' && t.sz > 5.5);
const verticales = TB => TB.filter(a => a[0] === 'l' && a[2] === a[4]).map(a => ({x: a[2], y1: Math.min(a[3], a[5]), y2: Math.max(a[3], a[5])}));
const horizontales = TB => TB.filter(a => a[0] === 'l' && a[3] === a[5]).map(a => ({y: a[3], x1: Math.min(a[2], a[4]), x2: Math.max(a[2], a[4])}));
const xsVert = TB => Array.from(new Set(verticales(TB).map(v => v.x))).sort((a, b) => a - b);
/* traits sous les rangées (pleine largeur, sous l'en-tête, qui finit en y0 : 402 au formulaire, 402 + dy au délesté) */
const fondsRangees = (TB, y0) => horizontales(TB).filter(h => h.y > (y0 === undefined ? 402 : y0) + 0.0005 && h.x1 === 65 && h.x2 === 544).map(h => h.y);
const lst = a => a.map(x => typeof x === 'number' ? +x.toFixed(3) : x).join(', ');
/* deux listes de nombres de même longueur, égales à e près (0,001 par défaut) */
const proches = (a, b, e) => a.length === b.length && a.every((x, i) => pres(x, b[i], e === undefined ? 0.001 : e));
/* largeur en Times italique (police de l'en-tête), mesurée avec la bibliothèque PDF de la page */
const mesures = (p, l) => p.evaluate(l => { const d = new window.jspdf.jsPDF({unit: 'pt', format: 'a4'}); return l.map(([t, sz]) => { d.setFont('times', 'italic'); d.setFontSize(sz); return d.getTextWidth(t); }); }, l);
/* cstColonnes de la page (null si absente) ; mesure : 'pdf' (Times italique de la bibliothèque) ou une mesure factice nommée */
const colonnes = (p, rangs, mesure) => p.evaluate(([rangs, mesure]) => {
  const T = window.__VT; if (typeof T.cstColonnes !== 'function') return null;
  const d = new window.jspdf.jsPDF({unit: 'pt', format: 'a4'});
  const M = {pdf: (t, sz) => { d.setFont('times', 'italic'); d.setFontSize(sz); return d.getTextWidth(t); },
    longueur: (t, sz) => t.length * sz * 0.5, reseau100: (t, sz) => /^(Réseau|Unitaire)$/.test(t) ? 100 : t.length * sz * 0.5,
    region300: t => t === 'Raccordée sur' ? 300 : 1, tout400: () => 400};
  return JSON.parse(JSON.stringify(T.cstColonnes(rangs, M[mesure])));
}, [rangs, mesure]);
const FORM_X = [65, 172.5, 195.5, 223.5, 252, 280.5, 309, 337, 365.5, 397.4, 429.3, 461.1, 493, 518.5, 544];
/* verticales du formulaire (présentation 2) : x et haut (360 bord ou frontière de région, 371 groupe, 391 sous-colonne) */
const FORM_V = [[65, 360], [172.5, 360], [195.5, 360], [223.5, 391], [252, 371], [280.5, 391], [309, 371], [337, 391], [365.5, 371], [397.4, 371], [429.3, 371],
  [461.1, 371], [493, 360], [518.5, 371], [544, 360]];
const imprimer = async (p, forme) => { await C.formeConstat(p, forme); return C.relevePdf(p); };

/* ---------- Outils de la page 1 délestée (m159) ---------- */

/* rubriques de la page 1 (§ 5 de la conception) : [id, haut au formulaire, hauteur délestée (null : description, 58,8 + rangées),
   écart avec la rubrique gardée d'avant, bas au formulaire] ; l'en-tête (15 à 155) est fixe, hors de la liste. Bas de la description
   au formulaire : 627 et non 620,5, car le dernier texte d'un tableau du formulaire très rempli descend un peu sous son dernier trait */
const P1 = [['nomRef', 153.8, 11, 0, 164.8], ['adresse', 174.1, 11, 9.3, 185.1], ['domicile', 194.4, 11, 9.3, 205.4], ['telMail', 214.6, 11, 9.2, 225.6],
  ['typeLog', 238.2, 11, 12.6, 249.2], ['categorie', 254.5, 23.5, 5.3, 301], ['controle', 308.9, 27.5, 7.9, 336.4], ['description', 343.2, null, 6.8, 627],
  ['recuperation', 627.2, 11, 6.7, 638.2], ['desagrements', 644.8, 11, 6.6, 655.8], ['position', 662.6, 137.4, 6.8, 800]];
const IDS = P1.map(e => e[0]);
const P1de = id => P1.find(e => e[0] === id) || [id, 0, 0, 0, 0];
/* plan attendu pour les rubriques ids gardées et des rangées de hauteur naturelle somH : la première en 153,8, chaque suivante au bas
   de la précédente plus son écart ; place de la description : 816 − (son haut + 58,8) − (écart + hauteur) des rubriques qui la suivent */
function planAttendu(ids, somH){
  const G = P1.filter(e => ids.indexOf(e[0]) >= 0), out = [];
  let bas = null;
  G.forEach((e, i) => {
    const haut = bas === null ? 153.8 : bas + e[3], o = {id: e[0], page: 1, dy: haut - e[1], h: e[2]};
    if (e[0] === 'description'){ o.place = 816 - (haut + 58.8) - G.slice(i + 1).reduce((a, f) => a + f[3] + f[2], 0); o.h = 58.8 + Math.min(somH, o.place); }
    out.push(o); bas = haut + o.h;
  });
  return out;
}
/* rubriques de la page 1, ou éléments de la page 2, d'un calcul, choisis par leur identifiant (m161 : en page unique, les éléments de la
   page 2 passent en page 1) : la page 1, les identifiants de IDS ; la page 2, les autres, sauf le pied (m160 : constatDeleste rend aussi
   ceux de la page 2, après ceux de la page 1 ; m161 : puis le pied) ; les aides de la page 1 ne lisent que les premiers */
const page1 = plan => Array.isArray(plan) ? plan.filter(e => IDS.indexOf(e.id) >= 0) : plan;
const page2 = plan => Array.isArray(plan) ? plan.filter(e => IDS.indexOf(e.id) < 0 && e.id !== 'pied') : [];
/* deux plans de la page 1 égaux (1e-6 près), en page 1, sans autre clé que id, page, dy, h et place (description seule). Depuis m161, la
   forme du calcul entier (page 1, puis page 2, puis le pied) est contrôlée à part (formeCalcul, dans verifP1, qui suit chaque emploi) */
const plansEgaux = (a, b) => Array.isArray(a)
  && (q => q.length === b.length && q.every((e, i) => e.id === b[i].id && e.page === 1 && pres(e.dy, b[i].dy, 1e-6)
    && pres(e.h, b[i].h, 1e-6) && (b[i].place === undefined ? !('place' in e) : pres(e.place, b[i].place, 1e-6))
    && Object.keys(e).every(k => ['id', 'page', 'dy', 'h', 'place'].indexOf(k) >= 0)))(page1(a));
/* plan de la page 1 dit court : rubrique, haut + hauteur, place */
const dire = plan => Array.isArray(plan) ? page1(plan).map(e => e.id + ' ' + +(P1de(e.id)[1] + e.dy).toFixed(3) + '+' + +Number(e.h).toFixed(3)
  + (e.place !== undefined ? ' (place ' + +Number(e.place).toFixed(3) + ')' : '')).join(', ') || 'aucune rubrique' : 'pas de calcul';
/* propriétés du plan de la page 1 : place d'au moins 234,5, rien sous 816 ; rend la faute ou ''. Sans rubrique (m161, D7 : rien en
   page 1), rien à contrôler si le calcul rend autre chose (la page 2, le pied) */
const proprietes = plan => { const q = page1(plan); if (!Array.isArray(q)) return 'plan absent'; if (!q.length) return plan.length ? '' : 'plan vide';
  const d = q.find(e => e.id === 'description'), z = q[q.length - 1], bas = P1de(z.id)[1] + z.dy + z.h;
  return d && !(d.place >= 234.5 - 1e-9) ? 'place ' + d.place + ' sous 234,5' : bas > 816 + 1e-6 ? 'bas ' + bas + ' sous 816' : ''; };
/* calcul par la page, comme le dessin : constatDeleste(vv, E, mesure de production d'un document neuf), pages 1 et 2 ; null s'il manque
   une fonction (version d'avant m159) */
const calcul = p => p.evaluate(() => {
  const T = window.__VT, v = T.S.visites[0];
  if (!['constatDeleste', 'constatPourDessin', 'cstMesure', 'newPdf', 'anomsOf'].every(f => typeof T[f] === 'function')) return null;
  const D = T.constatPourDessin(v, T.anomsOf(v.id));
  return JSON.parse(JSON.stringify(T.constatDeleste(D.vv, D.E, T.cstMesure(T.newPdf()))));
});
/* relevé du seul tableau délesté du dossier, cstTableDeleste(doc, E, haut, place) sur un document neuf, par C.relevePdf : le PDF du
   bouton est remplacé le temps du relevé ; null s'il manque une fonction */
async function releveTable(p, haut, place){
  const ok = await p.evaluate(([haut, place]) => {
    const T = window.__VT;
    if (!['cstTableDeleste', 'constatPourDessin', 'newPdf', 'anomsOf'].every(f => typeof T[f] === 'function')) return false;
    window.__blobAvantTest = T.constatPdfBlob;
    T.constatPdfBlob = async v => { const D = T.constatPourDessin(v, T.anomsOf(v.id)); T.cstTableDeleste(T.newPdf(), D.E, haut, place); return null; };
    return true;
  }, [haut, place]);
  if (!ok) return null;
  try { return await C.relevePdf(p); }
  finally { await p.evaluate(() => { window.__VT.constatPdfBlob = window.__blobAvantTest; delete window.__blobAvantTest; }); }
}
/* somme des hauteurs naturelles des rangées : tableau sans limite, en-tête en 0, dernier trait des rangées moins 42 */
const sommeNaturelle = async p => { const L = await releveTable(p, 0, 1e6); if (!L) return null; const rg = fondsRangees(L, 42); return rg.length ? Math.max(...rg) - 42 : 0; };
/* ordonnée qui range un appel dans une rubrique : texte et rectangle par leur y, trait par son point le plus haut, image par son y */
const yRef = a => a[0] === 't' || a[0] === 'r' ? a[3] : a[0] === 'l' ? Math.min(a[3], a[5]) : a[0] === 'i' ? a[5] : null;
/* appels d'une page 1 coupés par rubriques : en-tête au-dessus de 153,8, puis chaque appel dans la boîte [id, haut, bas] qui le contient ;
   rend {entete, seg: {id: appels}, faute} (faute : appel hors de toute boîte, ou rubriques dans le désordre) */
function decouper(L1, boites){
  const seg = {}, entete = []; let k = -1, faute = '';
  boites.forEach(b => { seg[b[0]] = []; });
  L1.forEach((a, i) => {
    const y = yRef(a), ou = 'appel ' + (i + 1) + ' (' + a[0] + ', y ' + y + ')';
    if (y === null){ faute = faute || ou + ' sans ordonnée'; return; }
    if (y < 153.8 - 0.002){ if (k >= 0) faute = faute || ou + ' : en-tête après les rubriques'; entete.push(a); return; }
    const j = boites.findIndex(b => y >= b[1] - 0.002 && y <= b[2] + 0.002);
    if (j < 0){ faute = faute || ou + ' hors de toute boîte'; return; }
    if (j < k) faute = faute || ou + ' : ' + boites[j][0] + ' après ' + boites[k][0];
    k = Math.max(k, j); seg[boites[j][0]].push(a);
  });
  return {entete, seg, faute};
}
/* appel décalé de dx en x et de dy en y (copie) */
const decale = (a, dx, dy) => { const b = a.slice();
  if (a[0] === 't' || a[0] === 'r'){ b[2] = a[2] + dx; b[3] = a[3] + dy; }
  else if (a[0] === 'l'){ b[2] = a[2] + dx; b[3] = a[3] + dy; b[4] = a[4] + dx; b[5] = a[5] + dy; }
  else if (a[0] === 'i'){ b[4] = a[4] + dx; b[5] = a[5] + dy; }
  return b; };
/* pointillé de cDots (motif [0,6 ; 1,8]) */
const pointille = a => a[0] === 'l' && JSON.stringify(a[8]) === '[[0.6,1.8],0]';
const GABARIT = /…\.{4}\//;
/* case à cocher relevée dès l'appel i (cOpt : rectangle, deux traits si elle est cochée, texte) : {appels, x, coche}, ou null */
const caseDe = (S, i) => { if (!S[i] || S[i][0] !== 'r') return null;
  const coche = !!S[i + 1] && S[i + 1][0] === 'l', n = coche ? 4 : 2, A = S.slice(i, i + n);
  return A.length === n && A[n - 1][0] === 't' && (!coche || A[2][0] === 'l') ? {appels: A, x: S[i][2], coche} : null; };
const casesDe = (S, i) => { const out = []; let c; while ((c = caseDe(S, i))){ out.push(c); i += c.appels.length; } return out; };
const nAppels = cs => cs.reduce((s, c) => s + c.appels.length, 0);
/* en-tête attendu : sans gabarit de date ; motif (libellé en 220,4 ; 141,5 et ses cases) gardé seulement avec une case cochée, mise à la
   place de la première case ; le reste tel quel */
function attenduEntete(E0){
  const out = []; let i = 0;
  while (i < E0.length){
    const a = E0[i];
    if (a[0] === 't' && GABARIT.test(a[4])){ i++; continue; }
    if (a[0] === 't' && a[2] === 220.4 && a[3] === 141.5){
      const cs = casesDe(E0, i + 1), cc = cs.filter(c => c.coche);
      if (cs.length !== 3) return null;
      if (cc.length){ out.push(a); cc[0].appels.forEach(b => out.push(decale(b, cs[0].x - cc[0].x, 0))); }
      i += 1 + nAppels(cs); continue;
    }
    out.push(a); i++;
  }
  return out;
}
/* identification, type et logements : libellé (et son soulignement), puis valeur (texte, ou pointillé si vide) ; un groupe n'est gardé
   qu'avec une valeur écrite, décalé de dy ; null si le formulaire n'a pas cette forme */
function attenduIdent(S, dy){
  const out = []; let i = 0;
  while (i < S.length){
    if (S[i][0] !== 't') return null;
    let j = i + 1;
    if (S[j] && S[j][0] === 'l' && !pointille(S[j]) && pres(S[j][3], S[i][3] + 1.4, 0.002)) j++;
    const val = S[j];
    if (!val || (val[0] !== 't' && !pointille(val))) return null;
    if (val[0] === 't') S.slice(i, j + 1).forEach(a => out.push(decale(a, 0, dy)));
    i = j + 1;
  }
  return out;
}
/* catégorie : le nombre (9,5 pt, bleu) et son libellé (deux lignes à 9,3 pt pour une propriété publique), au même écart du coin de leur
   case de la grille que du coin de la case délestée (49,5 ; 254,5 + dy) ; d'abord ses quatre traits, dans l'état du premier trait de la
   grille */
const GX = [49.5, 134.5, 219.5, 304.5, 389.5, 474.5];
function attenduCateg(S, dy){
  const traits = S.filter(a => a[0] === 'l'), T = S.filter(a => a[0] === 't');
  const k = T.findIndex(a => a[7] === 9.5 && JSON.stringify(a[8]) === '[0,0,255]');
  if (k < 0) return [];
  if (k < 1 || !traits.length) return null;
  const lab = [T[k - 1]];
  if (k >= 2 && T[k - 2][2] === T[k - 1][2] && pres(T[k - 1][3] - T[k - 2][3], 9.3, 0.002)) lab.unshift(T[k - 2]);
  const gx = Math.max(...GX.filter(x => x <= lab[0][2] + 1e-9)), gy = lab[0][3] < 278 ? 254.5 : 278;
  const tr = (x1, y1, x2, y2) => { const b = traits[0].slice(); b[2] = x1; b[3] = y1 + dy; b[4] = x2; b[5] = y2 + dy; return b; };
  return [tr(49.5, 254.5, 134.5, 254.5), tr(49.5, 278, 134.5, 278), tr(49.5, 254.5, 49.5, 278), tr(134.5, 254.5, 134.5, 278)]
    .concat(lab.concat([T[k]]).map(a => decale(a, 49.5 - gx, 254.5 - gy + dy)));
}
/* contrôle : titre (texte et soulignement), puis les méthodes cochées aux premières places */
const PLACES_METH = [70.9, 170.2, 269.4, 368.7, 453.8];
function attenduControle(S, dy){
  const cs = casesDe(S, 2), cc = cs.filter(c => c.coche);
  if (cs.length !== 5 || 2 + nAppels(cs) !== S.length) return null;
  if (!cc.length) return [];
  const out = S.slice(0, 2).map(a => decale(a, 0, dy));
  cc.forEach((c, k) => c.appels.forEach(a => out.push(decale(a, PLACES_METH[k] - c.x, dy))));
  return out;
}
/* description : titre (texte et soulignement), légende réduite aux codes de méthode du tableau de référence (aucune sans code), puis ce
   tableau (cstTableDeleste en 360 + dy, déjà à sa place) ; rien sans tableau */
function attenduDescription(S, dy, ref){
  if (!ref || !ref.length) return [];
  if (S.length < 3 || S[0][0] !== 't' || S[1][0] !== 'l' || S[2][0] !== 't' || S[2][2] !== 563 || S[2][3] !== 351.2) return null;
  const codes = new Set();
  ref.filter(a => a[0] === 't' && a[7] === 5.5).forEach(a => a[4].split(' ').forEach(k => codes.add(k)));
  const leg = S[2], i = leg[4].indexOf(' : '), mots = leg[4].slice(i + 3).split(', ').filter(m => codes.has(m.split(' ')[0]));
  const out = S.slice(0, 2).map(a => decale(a, 0, dy));
  if (mots.length){ const b = decale(leg, 0, dy); b[4] = leg[4].slice(0, i + 3) + mots.join(', '); out.push(b); }
  return out.concat(ref);
}
/* récupération des EP : libellé souligné et « : », puis les cases cochées enchaînées dès 245,6 (pas du formulaire : largeur de la case
   et 9 pt, lus sur les places du formulaire) */
function attenduRecup(S, dy){
  const cs = casesDe(S, 3), cc = cs.filter(c => c.coche);
  if (cs.length !== 4 || 3 + nAppels(cs) !== S.length) return null;
  if (!cc.length) return [];
  const out = S.slice(0, 3).map(a => decale(a, 0, dy));
  let x = 245.6;
  cc.forEach(c => { const j = cs.indexOf(c); c.appels.forEach(a => out.push(decale(a, x - c.x, dy))); if (j + 1 < cs.length) x += cs[j + 1].x - c.x; });
  return out;
}
/* désagréments : les deux textes, la case choisie à la place de la première, et la localisation écrite si « oui » est choisi */
function attenduDesagr(S, dy){
  const cs = casesDe(S, 2);
  if (cs.length !== 2) return null;
  const k = cs.findIndex(c => c.coche), val = S[2 + nAppels(cs)];
  if (k < 0) return [];
  const out = S.slice(0, 2).map(a => decale(a, 0, dy)), dx = cs[0].x - cs[k].x;
  cs[k].appels.forEach(a => out.push(decale(a, dx, dy)));
  if (k === 1 && val && val[0] === 't') out.push(decale(val, dx, dy));
  return out;
}
/* position : toute la rubrique, décalée, seulement avec le croquis (une image) */
const attenduPosition = (S, dy) => S.some(a => a[0] === 'i') ? S.map(a => decale(a, 0, dy)) : [];
/* page 1 attendue : {att: [[rubrique, appel]], faute} d'après la page 1 du formulaire du même dossier (Lc1), le plan et le tableau de
   référence ; faute : formulaire d'une autre forme, rubrique remplie au formulaire et absente du calcul, ou calculée sans contenu */
function attenduP1(Lc1, plan, ref){
  const D = decouper(Lc1, P1.map(e => [e[0], e[1], e[4]]));
  if (D.faute) return {att: [], faute: 'formulaire : ' + D.faute};
  const pl = {}, fautes = [], E0 = attenduEntete(D.entete);
  page1(plan || []).forEach(e => { pl[e.id] = e; });
  if (!E0) return {att: [], faute: 'en-tête du formulaire inattendu'};
  const att = E0.map(a => ['en-tête', a]);
  P1.forEach(e => {
    const id = e[0], dy = pl[id] ? pl[id].dy : 0, S = D.seg[id];
    const A = id === 'categorie' ? attenduCateg(S, dy) : id === 'controle' ? attenduControle(S, dy) : id === 'description' ? attenduDescription(S, dy, ref)
      : id === 'recuperation' ? attenduRecup(S, dy) : id === 'desagrements' ? attenduDesagr(S, dy) : id === 'position' ? attenduPosition(S, dy) : attenduIdent(S, dy);
    if (A === null){ fautes.push(id + ' : formulaire inattendu'); return; }
    if (A.length && !pl[id]) fautes.push(id + ' : rempli au formulaire, absent du calcul');
    if (!A.length && pl[id]) fautes.push(id + ' : au calcul, sans contenu');
    A.forEach(a => att.push([id, a]));
  });
  return {att, faute: fautes.join(' ; ')};
}
/* deux appels égaux : même genre et mêmes valeurs, nombres au 0,004 pt près (arrondis au millième du relevé, cumulés) */
const TOL = 0.004;
const egal = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length
  && a.every((x, i) => typeof x === 'number' && typeof b[i] === 'number' ? Math.abs(x - b[i]) <= TOL : JSON.stringify(x) === JSON.stringify(b[i]));
/* premier écart entre un relevé et l'attendu (noms : rubrique de chaque appel attendu), dit en empreintes, ou '' */
function ecartTol(L, att, noms){
  const e = a => a ? JSON.stringify(empreintes([a], [])[0]) : 'aucun';
  for (let i = 0; i < Math.max(L.length, att.length); i++) if (!egal(L[i], att[i]))
    return (noms && noms[Math.min(i, noms.length - 1)] ? noms[Math.min(i, noms.length - 1)] + ', ' : '') + 'appel ' + (i + 1) + ' : ' + e(L[i]) + ' au lieu de ' + e(att[i])
      + ' (' + L.length + ' appels, ' + att.length + ' attendus)';
  return '';
}
/* ---------- Outils de la page 2 délestée (m160) ---------- */

/* places de la page 2 au formulaire (carte m160 de la conception) : pour la conclusion et les préconisations, [écart avec l'élément
   gardé d'avant, lignes [id, ligne de base, fin, interligne (avec la fin de la ligne d'avant)]], la première ligne étant le titre ; la
   boîte va de 22,5 à 40 + 13,25 par rangée (93 au formulaire), les observations de 550,4 à 581 (écart 7) ; le pied (584,5 à 816) est fixe */
const P2L = {
  conclusion: [8, [['titre', 109, 109, 0], ['reseau', 126.6, 126.6, 17.6], ['rue', 141.4, 141.4, 14.8], ['installations', 162.3, 162.3, 20.9], ['reserves', 180.9, 180.9, 18.6]]],
  privees: [7.2, [['titre', 199.1, 199.1, 0], ['parag', 216.9, 240.3, 17.8], ['boite', 257.6, 257.6, 17.3], ['boiteEx', 272.4, 272.4, 14.8], ['boiteCr', 287.2, 287.2, 14.8],
    ['sep', 304.9, 304.9, 17.7], ['decoEU', 322.7, 322.7, 17.8], ['supp', 340.3, 340.3, 17.6], ['decoEP', 358.1, 358.1, 17.8], ['gestEP', 375.8, 397.7, 17.7],
    ['garg', 414.8, 414.8, 17.1], ['racc', 432.5, 447.3, 17.7]]],
  publiques: [7, [['titre', 465.3, 465.3, 0], ['EU', 482.7, 482.7, 17.4], ['EP', 497.5, 497.5, 14.8], ['UN', 512.2, 512.2, 14.7], ['noteD', 529.4, 529.4, 17.2],
    ['noteT', 540.4, 540.4, 11]]]};
/* haut de chaque élément au formulaire : dy = haut délesté − ce haut */
const HAUT2 = {boite: 22.5, conclusion: 101, privees: 191.1, publiques: 457.3, observations: 550.4};
const BOITE_K = ['dist', 'cote', 'prof', 'te'];
/* préconisations de chaque ligne (la tête « création de boîte » se garde aussi pour ses sous-lignes) */
const PRIV_K = {boite: ['boite_EU', 'boite_EP', 'boite_UN', 'boiteEx_EU', 'boiteEx_EP', 'boiteEx_UN', 'boiteCr_EU', 'boiteCr_EP', 'boiteCr_UN'],
  boiteEx: ['boiteEx_EU', 'boiteEx_EP', 'boiteEx_UN'], boiteCr: ['boiteCr_EU', 'boiteCr_EP', 'boiteCr_UN'], sep: ['sepEU', 'sepEP'], decoEU: ['decoGarg', 'decoGout'],
  supp: ['suppFosse', 'suppMilieu'], decoEP: ['decoEP'], gestEP: ['gestEP'], garg: ['gargEx', 'gargCr'], racc: ['raccEUsep', 'raccEUun', 'raccEPep', 'raccEPun']};
const PRIV_TOUT = Array.from(new Set([].concat(...Object.values(PRIV_K))));
const PUB_K = {EU: ['pubEU_D', 'pubEU_T'], EP: ['pubEP_D', 'pubEP_T'], UN: ['pubUN_D', 'pubUN_T'], noteD: ['pubEU_D', 'pubEP_D', 'pubUN_D'], noteT: ['pubEU_T', 'pubEP_T', 'pubUN_T']};
const PUB_TOUT = PUB_K.EU.concat(PUB_K.EP, PUB_K.UN);
/* préconisations d'un constat : celles de oui cochées, toutes les autres (automatiques comprises) à false */
const precosSeules = oui => { const o = {}; PRIV_TOUT.concat(PUB_TOUT).forEach(k => { o[k] = oui.indexOf(k) >= 0; }); return o; };
const n3 = x => +Number(x).toFixed(3);
/* données de la page 2, telles que le dessin les reçoit (constatPourDessin) : visite effectuée, boîte, réseau, gestionnaire, rue,
   conclusion, réserves, préconisations, une rangée active jugée « non », observations imprimées (pdfText, fins de ligne en « ; ») ; null
   s'il manque une fonction */
const donneesP2 = p => p.evaluate(() => {
  const T = window.__VT, v = T.S.visites[0];
  if (!['constatPourDessin', 'anomsOf', 'pdfText'].every(f => typeof T[f] === 'function')) return null;
  const E = T.constatPourDessin(v, T.anomsOf(v.id)).E, c = E.c, actif = r => { const n = String(r.nb == null ? '' : r.nb).trim(); return n !== '' && n !== '0'; };
  return JSON.parse(JSON.stringify({eff: !E.nonEffectue, B: c.boite || {}, reseau: c.reseau || '', gest: c.reseauGest || '', rue: c.reseauRue || '',
    concl: E.conclusion || '', reserves: E.reservesText || '', precos: E.precos || {}, non: !E.nonEffectue && E.rows.some(x => actif(x.r) && x.conf === 'non'),
    obs: T.pdfText(E.obsText || '').replace(/\s*\n\s*/g, ' ; ')}));
});
/* largeur de « int. » et de « ext. » en Times 9 pt (case du côté de la boîte), mesurée avec la bibliothèque PDF de la page */
let WCOTE = null;
const largeursCote = async p => WCOTE || (WCOTE = await p.evaluate(() => { const d = new window.jspdf.jsPDF({unit: 'pt', format: 'a4'}); d.setFont('times', 'normal');
  d.setFontSize(9); return {'int.': d.getTextWidth('int.'), 'ext.': d.getTextWidth('ext.')}; }));
/* plan attendu de la page 2, tiré des données du dossier : la boîte (visite effectuée : rangées ayant une valeur en EU ou en EP, colonnes
   employées), la conclusion, les préconisations privées et publiques (lignes gardées selon les gardes de la conception) et les
   observations (texte imprimé non vide) ; le premier élément gardé en 22,5, chaque suivant au bas du précédent gardé plus son écart ;
   titre au haut + 8 ; chaque ligne suivante à la fin de la gardée d'avant plus le plus grand interligne des lignes qui l'en séparent (elle
   comprise) ; étendue du formulaire gardée, sauf le raccordement (14,8 avec 3 ou 4 cases cochées, 0 sinon) ; bas = fin de la dernière
   ligne + 3 */
function planP2(D){
  const r6 = x => Math.round(x * 1e6) / 1e6, pr = D.precos || {}, vrai = ks => ks.some(k => !!pr[k]), plein = s => !!String(s || '').trim();
  const val = (k, n) => String(D.B[k + n] || '').trim();
  const rangees = D.eff ? BOITE_K.filter(k => val(k, 'EU') || val(k, 'EP')) : [], colonnes = ['EU', 'EP'].filter(n => rangees.some(k => val(k, n)));
  const reseau = D.reseau === 'departemental' || D.reseau === 'territorial' || plein(D.rue), priv = D.eff && (D.concl === 'non_conformes' || D.non || vrai(PRIV_TOUT));
  const sous = K => Object.assign({titre: true}, ...Object.keys(K).map(k => ({[k]: vrai(K[k])})));
  const G = {conclusion: {titre: D.eff || reseau, reseau, rue: plein(D.rue), installations: D.eff, reserves: D.eff && ['conformes', 'non_conformes', 'reserves'].indexOf(D.concl) < 0},
    privees: priv ? Object.assign(sous(PRIV_K), {parag: true}) : {}, publiques: vrai(PUB_TOUT) ? sous(PUB_K) : {}};
  const nRacc = PRIV_K.racc.filter(k => !!pr[k]).length, out = [];
  let bas = null;
  if (rangees.length){ out.push({id: 'boite', page: 2, dy: 0, h: r6(17.5 + 13.25 * rangees.length), rangees, colonnes}); bas = r6(40 + 13.25 * rangees.length); }
  ['conclusion', 'privees', 'publiques'].forEach(id => {
    const [ecart, L] = P2L[id], g = G[id], haut = bas === null ? 22.5 : r6(bas + ecart), lignes = [];
    let fin = null, prec = -1;
    L.forEach((l, j) => {
      if (!g[l[0]]) return;
      const y = prec < 0 ? r6(haut + 8) : r6(fin + Math.max(...L.slice(prec + 1, j + 1).map(m => m[3])));
      fin = r6(y + (id === 'privees' && l[0] === 'racc' ? (nRacc >= 3 ? 14.8 : 0) : l[2] - l[1]));
      lignes.push({id: l[0], y0: l[1], y}); prec = j;
    });
    if (!lignes.length) return;
    out.push({id, page: 2, dy: r6(lignes[0].y - L[0][1]), h: r6(fin + 3 - haut), lignes}); bas = r6(fin + 3);
  });
  if (plein(D.obs)) out.push({id: 'observations', page: 2, dy: r6((bas === null ? 22.5 : r6(bas + 7)) - 550.4), h: 30.6});
  return out;
}
/* deux plans de la page 2 égaux (1e-6 près) : mêmes éléments, mêmes clés ; lignes {id, y0, y}, rangées et colonnes */
const plansP2Egaux = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((e, i) => { const f = b[i];
  return e.id === f.id && e.page === 2 && pres(e.dy, f.dy, 1e-6) && pres(e.h, f.h, 1e-6) && Object.keys(e).sort().join() === Object.keys(f).sort().join()
    && (!f.lignes || (Array.isArray(e.lignes) && e.lignes.length === f.lignes.length && e.lignes.every((l, j) => l.id === f.lignes[j].id
      && pres(l.y0, f.lignes[j].y0, 1e-6) && pres(l.y, f.lignes[j].y, 1e-6) && Object.keys(l).sort().join() === 'id,y,y0')))
    && JSON.stringify(e.rangees) === JSON.stringify(f.rangees) && JSON.stringify(e.colonnes) === JSON.stringify(f.colonnes); });
/* plan de la page 2 dit court : élément, haut + hauteur, lignes et leur y, rangées et colonnes */
const direP2 = plan => !Array.isArray(plan) ? 'pas de calcul' : !plan.length ? 'vide' : plan.map(e => e.id + ' ' + n3((HAUT2[e.id] || 0) + e.dy) + '+' + n3(e.h)
  + (e.lignes ? ' [' + e.lignes.map(l => l.id + ' ' + n3(l.y)).join(', ') + ']' : '') + (e.rangees ? ' [' + e.rangees.join(' ') + ' ; ' + (e.colonnes || []).join(' ') + ']' : ''))
  .join(', ');
/* propriétés du plan de la page 2 : dy ≤ 0, hauteur positive, aucune ligne sous sa place du formulaire, rien sous 581 ; rend la faute ou '' */
const proprietesP2 = plan => { if (!Array.isArray(plan)) return 'pas de calcul';
  for (const e of plan){
    const bas = (e.id in HAUT2 ? HAUT2[e.id] : NaN) + e.dy + e.h;
    if (!(e.dy <= 1e-9)) return e.id + ' : dy ' + e.dy + ' positif';
    if (!(e.h > 0)) return e.id + ' : hauteur ' + e.h;
    if ((e.lignes || []).some(l => !(l.y <= l.y0 + 1e-9))) return e.id + ' : une ligne sous sa place du formulaire';
    if (!(bas <= 581 + 1e-6)) return e.id + ' : bas ' + bas + ' sous 581';
  }
  return ''; };
/* fenêtres de la page 2 du formulaire, dans l'ordre de la page : la boîte (au-dessus de 93), chaque ligne de la conclusion et des
   préconisations ([ligne de base − 9 ; fin + 2]), les observations (550,4 à 581) */
const FEN2 = [['boite', -1e9, 93]].concat(...['conclusion', 'privees', 'publiques'].map(id => P2L[id][1].map(l => [id + '.' + l[0], l[1] - 9, l[2] + 2])),
  [['observations', 550.4, 581]]);
/* page 2 du formulaire (L2, page neuve comprise) coupée : tête (page neuve, cadre en 15 ; 15), puis chaque appel dans la première
   fenêtre qui le contient à partir de la dernière employée (la note D finit en 531,4, où la note T commence), jusqu'au rectangle cyan
   (36,5 ; 584,5), d'où part le pied ; rend {tete, seg: {fenêtre: appels}, pied, faute} (faute : forme inattendue, appel hors des
   fenêtres ou dans le désordre) */
function decouperP2(L2){
  const seg = {}, tete = L2.slice(0, 2), j = L2.findIndex(a => a[0] === 'r' && a[2] === 36.5 && a[3] === 584.5);
  let k = 0, faute = '';
  FEN2.forEach(f => { seg[f[0]] = []; });
  if (!(tete.length === 2 && tete[0][0] === 'p' && tete[1][0] === 'r' && tete[1][2] === 15 && tete[1][3] === 15)) faute = 'tête (page neuve, cadre) inattendue';
  if (j < 2) faute = faute || 'pas de rectangle cyan';
  L2.slice(2, j < 2 ? L2.length : j).forEach((a, i) => {
    const y = yRef(a);
    let q = k;
    while (q < FEN2.length && !(y !== null && y >= FEN2[q][1] - 0.002 && y <= FEN2[q][2] + 0.002)) q++;
    if (q >= FEN2.length){ faute = faute || 'appel ' + (i + 3) + ' (' + a[0] + ', y ' + y + ') hors des fenêtres ou dans le désordre'; return; }
    k = q; seg[FEN2[q][0]].push(a);
  });
  return {tete, seg, pied: j < 2 ? [] : L2.slice(j), faute};
}
/* couleur des valeurs saisies (CPC.val, 20, 40, 140) telle que le relevé la lit : la bibliothèque PDF l'arrondit (19, 40, 139) ; mesurée
   une fois avec la bibliothèque de la page (deux), avant tout attenduP2 */
let VALC = null;
const couleurVal = async p => VALC || (VALC = await p.evaluate(() => { const d = new window.jspdf.jsPDF({unit: 'pt', format: 'a4'});
  d.setTextColor(20, 40, 140); const t = d.getTextColor(); return [1, 3, 5].map(i => parseInt(t.slice(i, i + 2), 16)); }));
/* appel qui montre une saisie au formulaire : texte non vide de la couleur des valeurs, ou trait d'une case cochée (1,2 pt) */
const rempli = a => (a[0] === 't' && VALC && JSON.stringify(a[8]) === JSON.stringify(VALC) && String(a[4]).trim() !== '') || (a[0] === 'l' && a[6] === 1.2);
/* cases cochées seules (cs : casesDe), la k-ième à la k-ième place (un x, ou [x, ligne de base]) ; rend {appels, dx de la dernière} */
function auxPlaces(cs, places){
  const appels = []; let dx = 0;
  cs.filter(c => c.coche).forEach((c, k) => {
    const pl = places[k], yc = c.appels[c.appels.length - 1][3], px = Array.isArray(pl) ? pl[0] : pl, py = Array.isArray(pl) ? pl[1] : yc;
    dx = px - c.x; c.appels.forEach(a => appels.push(decale(a, dx, py - yc)));
  });
  return {appels, dx};
}
/* une ligne gardée de la page 2, d'après son segment S au formulaire (seg : tous les segments), avant le décalage de sa ligne ; null si
   le formulaire n'a pas cette forme. Titres, paragraphe, rue, déconnexion des EP, gestion à la parcelle et notes : tels quels ; réseau :
   le libellé, puis la case cochée en 249,5 (« territorial » : le gestionnaire à sa suite, ou le seul mot sans lui), le libellé seul
   pour une rue sans réseau ; installations : la case choisie en 184,3 (réserves : leur case et leur texte remontés de la ligne d'en
   dessous), ou les deux cases vides sans conclusion ; réserves : sans le pointillé ; cases des préconisations : les cochées seules,
   aux premières places (note de la gargouille à créer à la suite de sa case) */
function attenduLigne(el, lid, S, D, seg){
  const k = el + '.' + lid, t0 = S[0];
  if (['conclusion.titre', 'conclusion.rue', 'privees.titre', 'privees.parag', 'privees.decoEP', 'privees.gestEP', 'publiques.titre', 'publiques.noteD',
    'publiques.noteT'].indexOf(k) >= 0) return S.length ? S.slice() : null;
  if (k === 'conclusion.reserves') return S.filter(a => !pointille(a));
  if (!t0 || t0[0] !== 't') return null;
  const cs = casesDe(S, 1), seule = (n, m) => cs.length === n && 1 + nAppels(cs) + (m || 0) === S.length;
  if (k === 'conclusion.reseau'){
    if (cs.length !== 2) return null;
    const apres = S.slice(1 + nAppels(cs)), dx = 249.5 - 367.5;
    if (D.reseau === 'departemental') return [t0].concat(cs[0].appels);
    if (D.reseau !== 'territorial') return [t0];
    if (String(D.gest).trim()) return [t0].concat(cs[1].appels.map(a => decale(a, dx, 0)), apres.filter(a => a[0] === 't').map(a => decale(a, dx, 0)));
    return [t0].concat(cs[1].appels.map((a, i, A) => { const b = decale(a, dx, 0); if (i === A.length - 1) b[4] = 'territorial'; return b; }));
  }
  if (k === 'conclusion.installations'){
    if (!seule(2)) return null;
    if (D.concl === 'conformes') return [t0].concat(cs[0].appels);
    if (D.concl === 'non_conformes') return [t0].concat(cs[1].appels.map(a => decale(a, 184.3 - 315.3, 0)));
    if (D.concl !== 'reserves') return S.slice();
    const Rs = seg['conclusion.reserves'] || [], cr = casesDe(Rs, 0);
    if (cr.length !== 1) return null;
    return [t0].concat(Rs.slice(0, cr[0].appels.length).concat(Rs.slice(cr[0].appels.length).filter(a => a[0] === 't')).map(a => decale(a, 0, 162.3 - 180.9)));
  }
  if (['privees.boite', 'privees.boiteEx', 'privees.boiteCr'].indexOf(k) >= 0) return seule(3) ? [t0].concat(auxPlaces(cs, [269.4, 326.2, 382.9]).appels) : null;
  if (['privees.sep', 'privees.decoEU', 'privees.supp'].indexOf(k) >= 0) return seule(2) ? [t0].concat(auxPlaces(cs, [269.4, 382.9]).appels) : null;
  if (k === 'privees.garg'){
    if (!seule(2, 1)) return null;
    const A = auxPlaces(cs, [269.4, 382.9]);
    return [t0].concat(A.appels, cs[1].coche ? [decale(S[S.length - 1], A.dx, 0)] : []);
  }
  if (k === 'privees.racc') return seule(4) ? [t0].concat(auxPlaces(cs, [[170.2, 432.5], [382.9, 432.5], [170.2, 447.3], [382.9, 447.3]]).appels) : null;
  if (['publiques.EU', 'publiques.EP', 'publiques.UN'].indexOf(k) >= 0) return seule(2) ? [t0].concat(auxPlaces(cs, [269.4, 358]).appels) : null;
  return null;
}
/* boîte délestée attendue (e : son élément du plan), d'après la boîte du formulaire (S : douze traits, deux en-têtes, puis les rangées) :
   les traits dans l'état du premier trait du formulaire, jusqu'au bord droit 386,5 (une colonne) ou 446,5 ; les en-têtes des colonnes
   employées (EP seule en 356,8) ; pour chaque rangée gardée, son libellé remonté à son rang, puis ses valeurs (« intérieur » ou
   « extérieur » : la case cochée seule, centrée dans sa colonne ; case vide : rien) ; null si S n'a pas cette forme */
function attenduBoite(S, e, wCote){
  if (S.length < 14 || S.slice(0, 12).some(a => a[0] !== 'l') || S[12][0] !== 't' || S[12][2] !== 356.8 || S[13][0] !== 't' || S[13][2] !== 416.5) return null;
  const n = e.rangees.length, R = e.colonnes.length === 2 ? 446.5 : 386.5, bas = 40 + 13.25 * n, st = S[0];
  const tr = (x1, y1, x2, y2) => { const b = st.slice(); b[2] = x1; b[3] = y1; b[4] = x2; b[5] = y2; return b; };
  const out = [tr(327, 22.5, R, 22.5)];
  for (let i = 0; i <= n; i++) out.push(tr(43.5, 40 + 13.25 * i, R, 40 + 13.25 * i));
  out.push(tr(43.5, 40, 43.5, bas));
  [327, 386.5, 446.5].filter(x => x <= R).forEach(x => out.push(tr(x, 22.5, x, bas)));
  e.colonnes.forEach((c, j) => { const a = S[c === 'EU' ? 12 : 13]; out.push(decale(a, (j ? 416.5 : 356.8) - a[2], 0)); });
  const corps = S.slice(14), rang = a => Math.floor((yRef(a) - 40) / 13.25);
  let ok = true;
  e.rangees.forEach((k, i2) => {
    const i = BOITE_K.indexOf(k), dyR = 13.25 * (i2 - i), Rg = corps.filter(a => rang(a) === i), lab = Rg.find(a => a[0] === 't' && a[2] === 48);
    if (!lab){ ok = false; return; }
    out.push(decale(lab, 0, dyR));
    e.colonnes.forEach((c, j) => {
      const cxF = c === 'EU' ? 356.8 : 416.5, cxD = j ? 416.5 : 356.8, V = Rg.filter(a => a !== lab && (a[2] < 386.5) === (c === 'EU'));
      if (V.length && V[0][0] === 'r') casesDe(V, 0).filter(q => q.coche).forEach(q => {
        const dx = cxD - (9.8 + (wCote[q.appels[q.appels.length - 1][4]] || 0)) / 2 - q.x; q.appels.forEach(a => out.push(decale(a, dx, dyR))); });
      else V.forEach(a => out.push(decale(a, cxD - cxF, dyR)));
    });
  });
  return ok ? out : null;
}
/* page 2 attendue : {att: [[élément, appel]], faute}, d'après la page 2 du formulaire du même dossier (Lc2), le plan attendu et les
   données : tête ; chaque élément gardé (boîte : attenduBoite ; ligne : attenduLigne, décalée de y − y0 ; observations décalées de dy) ;
   pied du formulaire, sans « Je, soussigné… » (deux textes et le pointillé) ni la légende du propriétaire si la visite n'est pas
   effectuée (DL20) ; faute : formulaire d'une autre forme, ligne remplie au formulaire et absente du plan (sauf la ligne des réserves,
   dont la case passe sur celle des installations) */
function attenduP2(Lc2, plan, D, wCote){
  const Z = decouperP2(Lc2);
  if (Z.faute) return {att: [], faute: 'formulaire : ' + Z.faute};
  const pl = {}, fautes = [], att = Z.tete.map(a => ['tête', a]);
  page2(plan).forEach(e => { pl[e.id] = e; });
  FEN2.forEach(f => {
    const [el, lid] = f[0].split('.'), garde = lid ? !!pl[el] && pl[el].lignes.some(l => l.id === lid) : !!pl[el];
    if (f[0] !== 'conclusion.reserves' && !garde && Z.seg[f[0]].some(rempli)) fautes.push(f[0] + ' : rempli au formulaire, absent du calcul attendu');
  });
  if (pl.boite){ const A = attenduBoite(Z.seg.boite, pl.boite, wCote); if (A) A.forEach(a => att.push(['boite', a])); else fautes.push('boite : formulaire inattendu'); }
  ['conclusion', 'privees', 'publiques'].forEach(el => (pl[el] ? pl[el].lignes : []).forEach(l => {
    const A = attenduLigne(el, l.id, Z.seg[el + '.' + l.id], D, Z.seg);
    if (A) A.forEach(a => att.push([el + '.' + l.id, decale(a, 0, l.y - l.y0)])); else fautes.push(el + '.' + l.id + ' : formulaire inattendu');
  }));
  if (pl.observations) Z.seg.observations.forEach(a => att.push(['observations', decale(a, 0, pl.observations.dy)]));
  let pied = Z.pied;
  if (!D.eff){
    const P = pied.filter(a => !(a[0] === 't' && pres(a[3], 595.9, 0.002)) && !(pointille(a) && pres(a[3], 596.5, 0.002)) && !(a[0] === 't' && a[2] === 326.2 && a[3] === 688));
    if (pied.length - P.length !== 4) fautes.push('pied du formulaire : ' + (pied.length - P.length) + ' appels de « Je, soussigné… » et de la légende du propriétaire, au lieu de 4');
    pied = P;
  }
  pied.forEach(a => att.push(['pied', a]));
  return {att, faute: fautes.join(' ; ')};
}
/* ---------- Outils de la page unique (m161, DL17) ---------- */

const r6 = x => Math.round(x * 1e6) / 1e6, r3 = x => Math.round(x * 1000) / 1000;
/* appel copié en page n */
const enPage = (a, n) => { const b = a.slice(); b[1] = n; return b; };
/* calcul attendu entier : la page 1 attendue (planAttendu des rubriques ids, rangées de hauteur naturelle somH), arrondie au millionième ;
   la page 2 attendue (planP2, tirée des données D) ; bas1, bas de la dernière rubrique (null sans rubrique) ; s = (bas1 + 8, ou 153,8 sans
   rubrique) − 22,5 ; fin : bas du dernier élément de la page 2 (son haut au formulaire + dy + h) + s, ou bas1 si la page 2 est vide ; une
   seule page si fin ≤ 580,5 (valeur arrondie), ou sans rien : chaque élément de la page 2 en page 1, dy + s, chaque ligne y + s (y0, h,
   rangées et colonnes inchangés) ; enfin le pied {id: 'pied', page: 1 ou 2, dy: 0, h: 231,5}. Rend {plan, bas1, s, fin, une} */
function planEntier(ids, somH, D){
  const P1a = planAttendu(ids, somH).map(e => Object.assign({}, e, {dy: r6(e.dy), h: r6(e.h)}, e.place === undefined ? {} : {place: r6(e.place)}));
  const z = P1a[P1a.length - 1], bas1 = z ? r6(P1de(z.id)[1] + z.dy + z.h) : null, s = r6((bas1 === null ? 153.8 : r6(bas1 + 8)) - 22.5);
  const P2a = D ? planP2(D) : [], y = P2a[P2a.length - 1], fin = y ? r6(HAUT2[y.id] + y.dy + y.h + s) : bas1, une = fin === null || fin <= 580.5;
  const P2m = !une ? P2a : P2a.map(e => Object.assign({}, e, {page: 1, dy: r6(e.dy + s)}, e.lignes ? {lignes: e.lignes.map(l => ({id: l.id, y0: l.y0, y: r6(l.y + s)}))} : {}));
  return {plan: P1a.concat(P2m, [{id: 'pied', page: une ? 1 : 2, dy: 0, h: 231.5}]), bas1, s, fin, une};
}
/* deux calculs entiers égaux (1e-6 près) : mêmes éléments, dans le même ordre, mêmes pages et mêmes clés ; dy, h et place ; lignes
   {id, y0, y}, rangées et colonnes */
const plansEntiersEgaux = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((e, i) => { const f = b[i];
  return e.id === f.id && e.page === f.page && pres(e.dy, f.dy, 1e-6) && pres(e.h, f.h, 1e-6) && Object.keys(e).sort().join() === Object.keys(f).sort().join()
    && (f.place === undefined || pres(e.place, f.place, 1e-6))
    && (!f.lignes || (Array.isArray(e.lignes) && e.lignes.length === f.lignes.length && e.lignes.every((l, j) => l.id === f.lignes[j].id
      && pres(l.y0, f.lignes[j].y0, 1e-6) && pres(l.y, f.lignes[j].y, 1e-6) && Object.keys(l).sort().join() === 'id,y,y0')))
    && JSON.stringify(e.rangees) === JSON.stringify(f.rangees) && JSON.stringify(e.colonnes) === JSON.stringify(f.colonnes); });
/* forme du calcul : les rubriques de la page 1 (en page 1), puis les éléments de la page 2, puis le pied, seul et dernier, {id: 'pied',
   page: 1 ou 2, dy: 0, h: 231,5} ; les éléments de la page 2 sont dans la page du pied ; rend la faute ou '' */
const formeCalcul = plan => {
  if (!Array.isArray(plan)) return 'pas de calcul';
  const z = plan[plan.length - 1], n1 = page1(plan).length, n2 = page2(plan).length;
  if (!z || z.id !== 'pied') return 'pas de pied en dernier';
  if (plan.filter(e => e.id === 'pied').length !== 1) return 'plus d\'un pied';
  if (!((z.page === 1 || z.page === 2) && z.dy === 0 && z.h === 231.5 && Object.keys(z).sort().join() === 'dy,h,id,page')) return 'pied ' + JSON.stringify(z);
  if (!plan.slice(0, n1).every(e => IDS.indexOf(e.id) >= 0 && e.page === 1)) return 'rubriques de la page 1 : d\'abord, et en page 1';
  if (!plan.slice(n1, n1 + n2).every(e => e.id in HAUT2 && e.page === z.page)) return 'éléments de la page 2 : ensuite, connus, dans la page du pied';
  return '';
};
/* calcul entier dit court : page 1, page 2 (haut + hauteur, lignes), pied et sa page */
const direEntier = plan => !Array.isArray(plan) ? 'pas de calcul' : dire(plan) + ' | ' + direP2(page2(plan)) + ' | '
  + (plan.filter(e => e.id === 'pied').map(e => 'pied en page ' + e.page).join(', ') || 'pas de pied');
/* bas d'un appel : texte par sa ligne de base, trait par son point le plus bas, rectangle et image par leur bas */
const basDe = a => a[0] === 't' ? a[3] : a[0] === 'l' ? Math.max(a[3], a[5]) : a[0] === 'r' ? a[3] + a[5] : a[0] === 'i' ? a[5] + a[7] : null;
const cadre = a => !!a && a[0] === 'r' && a[2] === 15 && a[3] === 15 && a[4] === 565 && a[5] === 811;
/* garde-fous d'un relevé délesté et de son calcul (B : {L, plan}) : rien sous 816 (sauf le cadre de la page), aucune page 3, une page
   neuve si et seulement si le pied du calcul est en page 2 ; rend la faute ou '' */
const gardes = B => {
  const pied = Array.isArray(B.plan) ? B.plan.find(e => e.id === 'pied') : null, nP = B.L.filter(a => a[0] === 'p').length;
  const sous = B.L.find(a => !cadre(a) && basDe(a) !== null && basDe(a) > 816.002), p3 = B.L.find(a => a[1] > 2);
  return sous ? 'appel sous 816 (' + sous[0] + ', bas ' + n3(basDe(sous)) + ')' : p3 ? 'page ' + p3[1] : !pied ? 'pas de pied au calcul'
    : nP !== (pied.page === 2 ? 1 : 0) ? nP + ' page(s) neuve(s), pied en page ' + pied.page : '';
};
/* s d'un calcul : (bas de sa dernière rubrique de la page 1 + 8, ou 153,8 sans rubrique) − 22,5 */
const decalage = plan => { const q = page1(plan || []), z = q[q.length - 1]; return r6((z ? r6(r6(P1de(z.id)[1] + z.dy + z.h) + 8) : 153.8) - 22.5); };
/* aide qui ramène une page unique à deux pages, pour les contrôles écrits pour deux pages (m159, m160). Page unique : pied du calcul en page
   1, ou aucune page neuve au relevé. Relevé : la page 1 garde ses appels ; ceux qui la suivent (dès le premier, en remontant depuis le
   pied, dont l'ordonnée est sous 22,5 + s), jusqu'au rectangle cyan (36,5 ; 584,5) exclu, passent en y − s (au millième) et en page 2 ;
   le pied, dès ce rectangle, passe en page 2 sans décalage ; la page neuve et le cadre du formulaire du même dossier (Lc) sont insérés
   avant eux, comme la page 2 attendue les attend. Plan : les éléments de la page 2 mis en page 1 passent en dy − s, leurs lignes en
   y − s, en page 2 ; le pied en page 2. Sur deux pages, tout est rendu tel quel. Rend {L, plan, une, s} */
const Y_DE = {t: [3], r: [3], l: [3, 5], i: [5]};
function ramener(L, plan, Lc){
  const pied = Array.isArray(plan) ? plan.find(e => e.id === 'pied') : null;
  if (!Array.isArray(plan) || !((pied && pied.page === 1) || !L.some(a => a[0] === 'p'))) return {L, plan, une: false, s: 0};
  const s = decalage(plan), j = L.findIndex(a => a[0] === 'r' && a[2] === 36.5 && a[3] === 584.5), fin = j < 0 ? L.length : j;
  let k = fin;
  while (k > 0 && yRef(L[k - 1]) !== null && yRef(L[k - 1]) >= 22.5 + s - 0.002) k--;
  const i = Lc.findIndex(a => a[0] === 'p'), tete = i >= 0 ? Lc.slice(i, i + 2) : [];
  const monte = a => { const b = enPage(decale(a, 0, -s), 2); (Y_DE[a[0]] || []).forEach(q => { b[q] = r3(b[q]); }); return b; };
  const L2 = L.slice(0, k).concat(tete, L.slice(k, fin).map(monte), L.slice(fin).map(a => enPage(a, 2)));
  const plan2 = plan.map(e => e.id === 'pied' ? Object.assign({}, e, {page: 2}) : IDS.indexOf(e.id) >= 0 || e.page !== 1 ? e
    : Object.assign({}, e, {page: 2, dy: r6(e.dy - s)}, e.lignes ? {lignes: e.lignes.map(l => ({id: l.id, y0: l.y0, y: r6(l.y - s)}))} : {}));
  return {L: L2, plan: plan2, une: true, s};
}
/* premier écart entre deux relevés, appel par appel et sans tolérance, dit en empreintes, ou '' */
const ecartEmp = (L, att) => { for (let i = 0; i < Math.max(L.length, att.length); i++) if (JSON.stringify(L[i]) !== JSON.stringify(att[i]))
  return 'appel ' + (i + 1) + ' : ' + (L[i] ? JSON.stringify(empreintes([L[i]], [])[0]) : 'aucun') + ' au lieu de ' + (att[i] ? JSON.stringify(empreintes([att[i]], [])[0]) : 'aucun')
    + ' (' + L.length + ' appels, ' + att.length + ' attendus)';
  return ''; };
/* relevé du formulaire d'un constat signé : sa marque (c.fige.mep) mise à 2 en mémoire le temps du relevé, puis remise */
async function formulaireSigne(p){
  const m = await p.evaluate(() => { const f = window.__VT.S.visites[0].constat.fige, m = f.mep; f.mep = 2; return m === undefined ? null : m; });
  try { return await C.relevePdf(p); }
  finally { await p.evaluate(m => { const f = window.__VT.S.visites[0].constat.fige; if (m === null) delete f.mep; else f.mep = m; }, m); }
}

/* un dossier imprimé deux fois : délesté (L) et formulaire (Lc), avec le calcul (plan, pages 1 et 2), la description du calcul (d), le
   tableau de référence (ref : cstTableDeleste en 360 + dy, place du calcul ; sans description du calcul, en 360 sur la place du
   formulaire), les données de la page 2 (D2) et la largeur des cases du côté de la boîte (wCote) ; mesure aussi la couleur des valeurs (VALC).
   m161 : L et plan ramenés à deux pages (ramener), pour les contrôles de m159 et m160 ; brut : {L, plan} tels qu'imprimés et calculés ;
   une, s : page unique et son décalage ; som : hauteur naturelle des rangées (calcul entier attendu). signe : constat signé (D4), imprimé
   tel qu'il est (sa marque), le formulaire relevé par formulaireSigne */
async function deux(p, signe){
  const L = signe ? await C.relevePdf(p) : await imprimer(p, 'deleste'), plan = await calcul(p), Lc = signe ? await formulaireSigne(p) : await imprimer(p, 'complet');
  const d = Array.isArray(plan) ? page1(plan).find(e => e.id === 'description') || null : null;
  const ref = d ? await releveTable(p, 360 + d.dy, 42 + d.place) : await releveTable(p, 360, 260.5);
  await couleurVal(p);
  const Q = ramener(L, plan, Lc);
  return {L: Q.L, plan: Q.plan, brut: {L, plan}, une: Q.une, s: Q.s, Lc, d, ref: ref || [], D2: await donneesP2(p), wCote: await largeursCote(p), som: d ? await sommeNaturelle(p) : 0};
}
/* contrôles communs d'un dossier : propriétés du calcul, page 1 attendue ; page 2 (m160) : calcul attendu (tiré des données du dossier),
   ses propriétés, page 2 attendue (sur le relevé et le calcul ramenés à deux pages : m161). m161 (DL17) : forme du calcul entier ; calcul
   entier attendu (planEntier : la page 1 de planAttendu sur les rubriques du calcul, dont le choix est contrôlé par la page 1 attendue et
   par chaque cas, et les rangées naturelles ; la page 2 de planP2) ; la règle « une page si et seulement si la fin attendue ≤ 580,5 » ;
   le relevé entier attendu (deux pages : la page 1 attendue, puis la page 2 attendue ; une page : la page 1 attendue, puis la page 2
   attendue sans sa tête, décalée de s, puis le pied du formulaire non décalé, tous en page 1), au 0,004 près ; les garde-fous (gardes) */
function verifP1(nom, X){
  const pr = proprietes(X.plan);
  R.ok(!pr, nom + ' : calcul : place d\'au moins 234,5, rien de la page 1 sous 816 (' + (pr || dire(X.plan)) + ')');
  const A = attenduP1(X.Lc.filter(a => a[1] === 1), X.plan, X.ref);
  const e = A.faute || ecartTol(X.L.filter(a => a[1] === 1), A.att.map(x => x[1]), A.att.map(x => x[0]));
  R.ok(!!X.plan && !e, nom + ' : page 1 délestée : chaque rubrique gardée vaut celle du formulaire du même dossier, transformée et décalée de son dy'
    + (X.plan ? '' : ' (pas de calcul constatDeleste)') + (e ? ' (' + e + ')' : ''));
  const P2 = page2(X.plan), att2 = X.D2 ? planP2(X.D2) : null, pr2 = proprietesP2(Array.isArray(X.plan) ? P2 : null);
  R.ok(!!att2 && plansP2Egaux(P2, att2), nom + ' : calcul de la page 2 : éléments, ordre, dy, h, lignes, rangées et colonnes attendus (' + direP2(P2)
    + ' ; attendu ' + direP2(att2) + ')');
  R.ok(!pr2, nom + ' : calcul de la page 2 : dy ≤ 0, aucune ligne sous sa place du formulaire, rien sous 581 (' + (pr2 || direP2(P2)) + ')');
  const A2 = att2 ? attenduP2(X.Lc.filter(a => a[1] === 2), att2, X.D2, X.wCote) : {att: [], faute: 'pas de données de la page 2'};
  const e2 = A2.faute || ecartTol(X.L.filter(a => a[1] === 2), A2.att.map(x => x[1]), A2.att.map(x => x[0]));
  R.ok(!e2, nom + ' : page 2 délestée : chaque élément gardé vaut celui du formulaire du même dossier, transformé et décalé ; pied du formulaire'
    + (e2 ? ' (' + e2 + ')' : ''));
  /* m161 (DL17) : le calcul et le relevé tels quels (X.brut) */
  const B = X.brut, fc = formeCalcul(B.plan);
  R.ok(!fc, nom + ' : forme du calcul : rubriques de la page 1, puis éléments de la page 2, dans la page du pied, puis le pied, seul et dernier '
    + '{id: \'pied\', page, dy: 0, h: 231,5} (' + (fc ? fc + ' ; ' : '') + direEntier(B.plan) + ')');
  const PE = planEntier(Array.isArray(B.plan) ? page1(B.plan).map(e => e.id) : [], X.som, X.D2), okE = plansEntiersEgaux(B.plan, PE.plan);
  R.ok(okE, nom + ' : calcul entier attendu : page 1, page 2 (en page 1 et décalée de s en page unique), pied (bas1 ' + PE.bas1 + ', s ' + PE.s + ', fin ' + PE.fin
    + ' ; ' + direEntier(B.plan) + (okE ? '' : ' ; attendu ' + direEntier(PE.plan)) + ')');
  const nP = B.L.filter(a => a[0] === 'p').length;
  R.ok((nP === 0) === PE.une && nP <= 1, nom + ' : une seule page si et seulement si la fin attendue tient (≤ 580,5) (fin attendue ' + PE.fin + ', ' + (nP + 1) + ' page(s))');
  const att = A.faute || A2.faute ? null : PE.une ? A.att.concat(A2.att.filter(x => x[0] !== 'tête').map(x => [x[0], enPage(x[0] === 'pied' ? x[1] : decale(x[1], 0, PE.s), 1)]))
    : A.att.concat(A2.att);
  const e3 = att ? ecartTol(B.L, att.map(x => x[1]), att.map(x => x[0])) : 'attendu incomplet (' + (A.faute || A2.faute) + ')';
  R.ok(!e3, nom + ' : relevé entier attendu, ' + (PE.une ? 'une page : la page 1 attendue, puis la page 2 attendue sans sa tête, décalée de s (' + PE.s
    + '), puis le pied du formulaire, non décalé, tous en page 1' : 'deux pages : la page 1 attendue, puis la page 2 attendue') + (e3 ? ' (' + e3 + ')' : ''));
  const g = gardes(B);
  R.ok(!g, nom + ' : rien sous 816 (sauf le cadre), aucune page 3, une page neuve si et seulement si le pied du calcul est en page 2' + (g ? ' (' + g + ')' : ''));
}
/* appels de la page 1 dans le tableau délesté : entre 360 + dy et le bas de la description du calcul */
const tableauDel = (L, d) => d ? L.filter(a => { const y = a[1] === 1 ? yRef(a) : null; return y !== null && y >= 360 + d.dy - 0.002 && y <= 343.2 + d.dy + d.h + 0.002; }) : null;
/* texte de la page 1 posé en (x ; y) au formulaire (titre de la description : 42,6 ; 351,2), ou null */
const texteEn = (L, x, y) => { const a = L.find(a => a[0] === 't' && a[1] === 1 && a[2] === x && a[3] === y); return a ? a[4] : null; };
const dit = t => FICTIFS.indexOf(t) >= 0 ? t : H(t);

/* ---------- D1 : option « Constat imprimé » dans « En-tête des fiches » ---------- */
async function d1(p){
  await p.evaluate(async () => { const T = window.__VT, e = T.S.etude; e.fiche = Object.assign({}, e.fiche, {cleFictive: 'Valeur fictive'}); await T.DB.put('etudes', e); });
  const ouvrirEntete = async () => { await p.click('[data-act="etude-menu"]'); await p.click('[data-m="ch"][data-v="entete"]'); await p.waitForSelector('#m-dep'); };
  const liste = () => p.evaluate(() => { const s = document.querySelector('#m-cforme'); return s ? {opts: Array.from(s.options).map(o => [o.value, o.textContent]), val: s.value} : null; });
  const enregistrer = async () => { await p.click('#modal-root button.primary'); await p.waitForSelector('#m-dep', {state: 'detached'}); await p.evaluate(() => window.__VT.flushSaves()); };
  const fiche = () => p.evaluate(async () => { const T = window.__VT, d = await T.DB.get('etudes', T.S.etude.id); return {mem: T.S.etude.fiche, db: d && d.fiche}; });
  const AUTRES = {departement: 'Département fictif', commune: 'Commune fictive', constatLogo: 'formulaire', cleFictive: 'Valeur fictive'};
  const garde = f => !!f && Object.keys(AUTRES).every(k => f[k] === AUTRES[k]);
  const dire = f => JSON.stringify(f || null).replace(/"cleFictive"/, '"cle"');
  const OPTS = [['', 'Par défaut (formulaire complet)'], ['deleste', 'Délesté : seulement ce qui est rempli ou coché'], ['complet', 'Formulaire complet']];

  await ouvrirEntete();
  const l1 = await liste();
  R.ok(!!l1 && JSON.stringify(l1.opts) === JSON.stringify(OPTS) && l1.val === '', 'D1 : liste « Constat imprimé » : « Par défaut (formulaire complet) » en tête et choisie pour une '
    + 'étude neuve, puis « Délesté… » et « Formulaire complet » (obtenu ' + JSON.stringify(l1) + ')');
  await p.fill('#m-dep', AUTRES.departement); await p.fill('#m-com', AUTRES.commune); await p.selectOption('#m-clogo', 'formulaire');
  await enregistrer();
  const f1 = await fiche();
  R.ok(!('constatForme' in (f1.mem || {})) && !('constatForme' in (f1.db || {})) && garde(f1.mem) && garde(f1.db),
    'D1 : en-tête enregistré sans toucher la liste : aucune forme rangée, département, commune, logo et clé posée avant gardés (' + dire(f1.db) + ')');
  await ouvrirEntete();
  if (l1) await p.selectOption('#m-cforme', 'deleste');
  await enregistrer();
  const f2 = await fiche();
  R.ok(!!f2.mem && f2.mem.constatForme === 'deleste' && !!f2.db && f2.db.constatForme === 'deleste' && garde(f2.mem) && garde(f2.db),
    'D1 : « Délesté » range \'deleste\' dans l\'étude, le reste de la fiche gardé (' + dire(f2.db) + ')');
  await ouvrirEntete();
  const l3 = await liste();
  R.ok(!!l3 && l3.val === 'deleste', 'D1 : à la réouverture, la liste montre « Délesté » (' + (l3 ? l3.val : 'pas de liste') + ')');
  if (l3) await p.selectOption('#m-cforme', '');
  await enregistrer();
  const f3 = await fiche();
  R.ok(!('constatForme' in (f3.mem || {})) && !('constatForme' in (f3.db || {})) && garde(f3.mem) && garde(f3.db),
    'D1 : « Par défaut » retire la forme rangée, le reste de la fiche gardé (' + dire(f3.db) + ')');
}

/* ---------- D2 : WC et « Fontaine » ---------- */
async function d2(p){
  await poser(p, {lignes: {wc: {nb: '1', raccord: 'EU_D', conforme: 'oui'}}, ajouts: [{groupe: 'EP', label: 'Fontaine', nb: '1', raccord: 'GARG', conforme: 'oui'}]});
  const X = await deux(p), L = X.L, d = X.d, dy = d ? d.dy : 0, TB = tableauDel(L, d) || [];
  const lib = libelles(TB).map(t => t.t), ent = entetes(TB).map(t => t.t);
  R.ok(!!d && lib.join(' | ') === 'WC | Fontaine', 'D2 : seules les rangées WC et « Fontaine » s\'impriment, dans cet ordre, dans le tableau de la description du calcul ('
    + lib.join(' | ') + ' ; ' + dire(X.plan) + ')');
  const ATT = ['Installation', 'Nb', 'Raccordée sur', 'Réseau EU', 'D', 'Gar-', 'gouille', 'Conforme', 'Oui'];
  R.ok(ent.slice().sort().join(' | ') === ATT.slice().sort().join(' | ') && ent.length === ATT.length,
    'D2 : en-têtes exactement Installation, Nb, Raccordée sur, Réseau EU, D, Gar-, gouille, Conforme et Oui (' + ent.join(' | ') + ')');
  const K = await colonnes(p, [{place: 'EU_D', conf: 'oui'}, {place: 'GARG', conf: 'oui'}], 'pdf');
  const xs = xsVert(TB);
  const kx = K ? K.colonnes.map(k => k.x).concat([544]) : [];
  const somme = K ? K.colonnes.reduce((s, k) => s + k.w, 0) : 0;
  R.ok(!!K && kx.length === xs.length && kx.every((x, i) => pres(x, xs[i], 0.001)) && pres(somme, 479, 1e-6) && K.colonnes.map(k => k.cle).join() === 'lib,nb,EU_D,GARG,oui',
    'D2 : verticales et largeurs de cstColonnes (lib, nb, EU_D, GARG, oui), de somme 479 (tracé ' + lst(xs) + ' ; cstColonnes ' + (K ? lst(kx) + ', somme ' + somme.toFixed(3) : 'absente') + ')');
  const [wEU, wGa, wGo, wRac, wOui, wConf] = await mesures(p, [['Réseau EU', 10], ['Gar-', 8], ['gouille', 8], ['Raccordée sur', 10], ['Oui', 10], ['Conforme', 10]]);
  const wD = Math.max(28, wEU + 4), wG = Math.max(31.9, Math.max(wGa, wGo) + 4), wO = Math.max(Math.max(25.5, wOui + 4), wConf + 4), wL = 479 - 23 - Math.max(wD + wG, wRac + 4) - wO;
  const att = [65, 65 + wL, 88 + wL, 88 + wL + wD, 88 + wL + wD + wG, 544];
  R.ok(xs.length === att.length && att.every((x, i) => pres(x, xs[i], 0.001)) && wD + wG > wRac + 4,
    'D2 : largeurs du calcul : D seul de « Réseau EU » ' + wD.toFixed(2) + ', Gargouille ' + wG.toFixed(2) + ', Oui seul ' + wO.toFixed(2) + ', libellés ' + wL.toFixed(2) + ' (attendu ' + lst(att) + ')');
  const cx = xs.slice(0, -1).map((x, i) => (x + xs[i + 1]) / 2), Xc = croixDe(TB), rg = fondsRangees(TB, 402 + dy);
  const ok = Xc.length === 4 && [[2, 0], [4, 0], [3, 1], [4, 1]].every(([k, r]) => Xc.some(t => pres(t.x, cx[k], 0.1) && t.y > (r ? rg[0] : 402 + dy) && t.y < rg[r]));
  R.ok(ok, 'D2 : croix au centre de leur colonne à 0,1 pt (WC : D et Oui ; Fontaine : Gargouille et Oui) (' + Xc.map(t => t.x.toFixed(2) + '/' + t.y.toFixed(2)).join(', ') + ' ; centres ' + lst(cx) + ')');
  const N = nombres(TB);
  R.ok(!!d && rg.length === 2 && pres(rg[0], 419.5 + dy, 0.001) && pres(rg[1], 437 + dy, 0.001) && N.length === 2 && N.concat(Xc).every(t => t.sz === 10.5)
    && pres(N[0].y, 402 + dy + 8.75 + 3.6, 0.001) && pres(N[1].y, 419.5 + dy + 8.75 + 3.6, 0.001) && pres(N[0].x, xs[1] + 11.5, 0.001),
    'D2 : rangées de 17,5 pt (libellés sur une ligne) en 419,5 + dy et 437 + dy, Nb centré en x_Nb + 11,5, Nb et croix en 10,5 pt au milieu + 3,6 (dy ' + dy + ' ; traits ' + lst(rg) + ' ; Nb '
    + N.map(t => t.x.toFixed(2) + '/' + t.y.toFixed(2) + '/' + t.sz).join(', ') + ')');
  const p2 = horizontales(X.Lc.filter(a => a[1] === 2 && a[0] === 'l')).filter(h => h.x1 === 43.5 && h.x2 === 565.5 && h.y < 100).map(h => h.y);
  const tb = L.filter(a => a[1] === 2 && a[0] === 'l' && yRef(a) < 100 && [43.5, 327, 386.5, 446.5, 506, 565.5].some(x => a[2] === x || a[4] === x));
  R.ok(lst(p2) === '40, 53.25, 66.5, 79.75, 93' && !tb.length, 'D2 : page 2 : au formulaire, la boîte de la présentation 2 (rangées de 13,25 pt, côté compris) ('
    + lst(p2) + ') ; au délesté, sans valeur de boîte, aucun trait de boîte (' + tb.length + ')');
  const Lc = X.Lc, TBc = tableau(Lc) || [], Ln = await imprimer(p, ''), TBn = tableau(Ln) || [];
  R.ok(lst(xsVert(TBc)) === lst(FORM_X) && fondsRangees(TBc).length === 11 && entetes(TBc).length === 23,
    'D2 : le même dossier en « Formulaire complet » : le tableau du formulaire (verticales ' + lst(xsVert(TBc)) + ', ' + fondsRangees(TBc).length + ' rangées, ' + entetes(TBc).length + ' en-têtes)');
  R.ok(TBn.length > 0 && JSON.stringify(TBn) === JSON.stringify(TBc), 'D2 : sans choix : le même tableau du formulaire (défaut \'complet\')');
  verifP1('D2', X);
}

/* ---------- D3 ---------- */
async function d3(p){
  /* aucune ligne active ; désagréments « non » : ses cases, après la description absente, gardent le fond du formulaire */
  await poser(p, {lignes: {wc: {nb: '0', raccord: 'EU_D'}, gout_av: {nb: '', raccord: 'EP_D'}}, champs: {desagr: 'non'}});
  let X = await deux(p), titre = texteEn(X.Lc, 42.6, 351.2);
  const sansDesc = X => !!X.plan && !X.d && !X.ref.length && !!titre && !X.L.some(a => a[0] === 't' && a[1] === 1 && a[4] === titre);
  R.ok(sansDesc(X), 'D3 : aucune ligne active : ni description au calcul, ni titre, ni tableau (' + dire(X.plan) + ')');
  verifP1('D3 (aucune ligne active)', X);

  /* visite non effectuée (refus) : aucune rangée */
  await poser(p, {statut: 'refus', lignes: {wc: {nb: '1', raccord: 'EU_D', conforme: 'oui'}}});
  X = await deux(p);
  R.ok(sansDesc(X), 'D3 : visite non effectuée (refus), une ligne remplie : ni description au calcul, ni titre, ni tableau (' + dire(X.plan) + ')');
  verifP1('D3 (refus, une ligne remplie)', X);

  /* ni croix ni conformité */
  await poser(p, {lignes: {wc: {nb: '1'}}, ajouts: [{groupe: 'EP', label: 'Fontaine', nb: '2'}]});
  X = await deux(p);
  let d = X.d, dy = d ? d.dy : 0, TB = tableauDel(X.L, d) || [];
  let ent = entetes(TB).map(t => t.t), hz = horizontales(TB).filter(h => h.y <= 402 + dy + 0.0005);
  const dh = hz => hz.map(h => +(h.y - dy).toFixed(3) + ':' + h.x1 + '-' + h.x2).join(' ');
  R.ok(!!d && ent.join(' | ') === 'Installation | Nb' && proches(xsVert(TB), [65, 521, 544]) && verticales(TB).every(v => pres(v.y1, 360 + dy, 0.001)) && !croixDe(TB).length
    && dh(hz) === '360:65-544 402:65-544' && !TB.some(a => a[0] === 'r'),
    'D3 : rangées sans croix ni conformité (raccordement vide) : Installation et Nb seuls, libellés de 456 pt, traits de l\'en-tête en 360 + dy et 402 + dy seulement, sans fond ('
    + ent.join(' | ') + ' ; ' + lst(xsVert(TB)) + ' ; ' + dh(hz) + ')');
  verifP1('D3 (ni croix ni conformité, sans fond jaune)', X);

  /* raccordement inconnu ('plusieurs') : aucune croix « Raccordée sur » ; sa conformité automatique (« non ») reste */
  await poser(p, {lignes: {wc: {nb: '1', raccord: 'plusieurs'}}});
  X = await deux(p); TB = tableauDel(X.L, X.d) || [];
  ent = entetes(TB).map(t => t.t);
  const [wConf] = await mesures(p, [['Conforme', 10]]), xo = 544 - Math.max(25.5, wConf + 4);
  let Xc = croixDe(TB);
  R.ok(ent.join(' | ') === 'Conforme | Installation | Nb | Non' && proches(xsVert(TB), [65, xo - 23, xo, 544]) && Xc.length === 1 && pres(Xc[0].x, (xo + 544) / 2, 0.001),
    'D3 : raccordement « plusieurs » : aucune colonne « Raccordée sur », sa conformité « non » seule (' + ent.join(' | ') + ' ; ' + lst(xsVert(TB)) + ')');

  /* une seule conformité « oui », sans raccordement */
  await poser(p, {lignes: {wc: {nb: '1', conforme: 'oui'}}});
  X = await deux(p); d = X.d; dy = d ? d.dy : 0; TB = tableauDel(X.L, d) || [];
  ent = entetes(TB).map(t => t.t); hz = horizontales(TB).filter(h => h.y <= 402 + dy + 0.0005);
  const fond = TB.filter(a => a[0] === 'r');
  R.ok(!!d && ent.join(' | ') === 'Conforme | Installation | Nb | Oui' && proches(xsVert(TB), [65, xo - 23, xo, 544]) && hz.length === 3
    && proches(hz.map(h => h.y - dy), [360, 371, 402]) && proches(hz.map(h => h.x1), [65, xo, 65]) && hz.every(h => h.x2 === 544)
    && fond.length === 1 && pres(fond[0][2], xo, 0.001) && pres(fond[0][4], 544 - xo, 0.001) && JSON.stringify(fond[0][9]) === '[255,255,204]',
    'D3 : une seule conformité « oui » : « Conforme » et Oui seuls, sans Non, trait en 371 + dy sous « Conforme » seulement, fond jaune sous « Conforme » ('
    + ent.join(' | ') + ' ; ' + lst(xsVert(TB)) + ' ; ' + dh(hz) + ')');

  /* une ligne EP mise à la main sur « Puits » */
  await poser(p, {lignes: {gout_av: {nb: '1', raccord: 'PUITS'}}});
  X = await deux(p); TB = tableauDel(X.L, X.d) || [];
  ent = entetes(TB).map(t => t.t);
  Xc = croixDe(TB); const xs = xsVert(TB);
  R.ok(ent.join(' | ') === 'Raccordée sur | Conforme | Installation | Nb | Puits | Non' && xs.length === 5 && Xc.length === 2
    && pres(Xc[0].x, (xs[2] + xs[3]) / 2, 0.001) && pres(Xc[1].x, (xs[3] + xs[4]) / 2, 0.001),
    'D3 : une ligne EP mise à la main sur « Puits » : colonnes Puits et Non, croix au centre (' + ent.join(' | ') + ' ; ' + lst(xs) + ')');

  /* toutes les colonnes employées : comparé au formulaire du même dossier */
  const TOUT = {wc: {nb: '1', raccord: 'EU_D'}, lavelinge: {nb: '1', raccord: 'EU_T'}, evier: {nb: '1', raccord: 'UN_D'}, sdb: {nb: '1', raccord: 'UN_T'}, cuisine: {nb: '1', raccord: 'FOSSE'},
    siphon: {nb: '1', raccord: 'MILIEU'}, gout_av: {nb: '1', raccord: 'EP_D'}, gout_ar: {nb: '1', raccord: 'EP_T'}, grilles: {nb: '1', raccord: 'PUITS'}, siphon_sol: {nb: '1', raccord: 'GARG'}};
  await poser(p, {lignes: TOUT});
  X = await deux(p); d = X.d; dy = d ? d.dy : 0; TB = tableauDel(X.L, d) || [];
  const TF = tableau(X.Lc) || [];
  const vd = verticales(TB).map(v => [v.x, v.y1 - dy]);
  R.ok(!!d && vd.length === FORM_V.length && vd.every((v, i) => pres(v[0], FORM_V[i][0], 0.001) && pres(v[1], FORM_V[i][1], 0.001)),
    'D3 : toutes les colonnes employées : les verticales de la présentation 2 à 0,001 pt, chacune dès son rang décalé de dy (' + vd.map(v => v[0] + '/' + +v[1].toFixed(3)).join(' ') + ')');
  const ed = entetes(TB), ef = entetes(TF);
  const okE = ed.length === ef.length && ed.length === 23 && ed.every((t, i) => t.t === ef[i].t && pres(t.x, ef[i].x, 0.05 + 1e-6) && pres(t.y - dy, ef[i].y, 0.001) && t.sz === ef[i].sz && JSON.stringify(t.col) === JSON.stringify(ef[i].col));
  const ecE = ed.length && ef.length ? Math.max(...ed.map((t, i) => ef[i] ? Math.abs(t.x - ef[i].x) : 99)) : 99;
  R.ok(okE, 'D3 : toutes les colonnes : en-têtes du formulaire, dans son ordre, ses tailles et ses couleurs, à 0,05 pt de leur x, ordonnées décalées de dy (écart maximal ' + ecE.toFixed(3) + ')');
  const xd = Array.from(new Set(croixDe(TB).map(t => t.x))).sort((a, b) => a - b), xf = Array.from(new Set(croixDe(TF).map(t => t.x))).sort((a, b) => a - b);
  R.ok(xd.length === 12 && xf.length === 12 && xd.every((x, i) => pres(x, xf[i], 0.05 + 1e-6)) && croixDe(TB).length === croixDe(TF).length,
    'D3 : toutes les colonnes : croix à 0,05 pt de leur place au formulaire (' + lst(xd) + ' ; formulaire ' + lst(xf) + ')');
  const fd = TB.filter(a => a[0] === 'r'), ff = TF.filter(a => a[0] === 'r'), bas = Math.max(...fondsRangees(TB, 402 + dy));
  R.ok(fd.length === 1 && ff.length === 1 && fd[0][2] === ff[0][2] && pres(fd[0][3], 360 + dy, 0.001) && fd[0][4] === ff[0][4] && pres(fd[0][3] + fd[0][5], bas, 0.001) && TB.indexOf(fd[0]) === 0,
    'D3 : toutes les colonnes : fond jaune sous « Conforme » (493, largeur 51), du haut de l\'en-tête (360 + dy) au bas de la dernière rangée, dessiné d\'abord');
  const hauts = await p.evaluate(() => { const T = window.__VT, c = T.S.visites[0].constat, d = new window.jspdf.jsPDF({unit: 'pt', format: 'a4'});
    return c.rows.filter(r => String(r.nb).trim() !== '' && String(r.nb).trim() !== '0').map(r => { d.setFont('times', 'normal'); d.setFontSize(9.5); return d.splitTextToSize(r.label, 100).length === 1 ? 17.5 : 21.5; }); });
  const attR = []; hauts.reduce((y, h) => { attR.push(y + h); return y + h; }, 402 + dy);
  R.ok(!!d && proches(fondsRangees(TB, 402 + dy), attR), 'D3 : toutes les colonnes : rangées de 17,5 pt, ou 21,5 pt si le libellé ne tient pas sur une ligne, dès 402 + dy ('
    + lst(fondsRangees(TB, 402 + dy)) + ')');
  verifP1('D3 (toutes les colonnes)', X);

  /* 30 rangées actives */
  const T30 = {}; Object.keys(TOUT).forEach((id, i) => { T30[id] = {nb: '1', raccord: i < 6 ? 'EU_D' : 'EP_D', methodes: ['visuel']}; });
  const aj = []; for (let i = 1; i <= 20; i++) aj.push({groupe: i <= 10 ? 'EU' : 'EP', label: 'Ligne fictive ' + i, nb: '1', raccord: i <= 10 ? 'EU_T' : 'GARG'});
  await poser(p, {lignes: T30, ajouts: aj});
  X = await deux(p); d = X.d; dy = d ? d.dy : 0; TB = tableauDel(X.L, d) || [];
  const rg = fondsRangees(TB, 402 + dy), lb = libelles(TB), Nb = nombres(TB), X30 = croixDe(TB), basC = d ? 343.2 + d.dy + d.h : 0;
  const ys = TB.map(a => a[0] === 'l' ? Math.max(a[3], a[5]) : a[0] === 't' ? a[3] : a[0] === 'r' ? a[3] + a[5] : 0);
  R.ok(!!d && rg.length === 30 && Math.max(...ys) <= basC + 0.001 && pres(rg[29], basC, 0.001) && pres(d.h, 58.8 + d.place, 1e-6),
    'D3 : 30 rangées : ramenées à la place du calcul, rien du tableau sous le bas calculé (' + rg.length + ' rangées, plus bas ' + (ys.length ? Math.max(...ys).toFixed(3) : '-') + ' ; bas calculé '
    + basC.toFixed(3) + ')');
  R.ok(lb.length >= 30 && lb.every(t => t.sz <= 8 + 1e-9), 'D3 : 30 rangées : libellés en 8 pt au plus (' + Array.from(new Set(lb.map(t => t.sz))).join(', ') + ')');
  const tailleDe = y => { let h0 = 402 + dy; for (const h of rg){ if (y > h0 && y < h) return Math.min(10.5, (h - h0 - 1) / 0.72); h0 = h; } return null; };
  /* h pris sur les traits relevés (au millième) : taille attendue à 0,003 près */
  const mauv = Nb.concat(X30).filter(t => { const s = tailleDe(t.y); return s === null || Math.abs(t.sz - s) > 0.003; });
  R.ok(Nb.length === 30 && X30.length === 60 && !mauv.length, 'D3 : 30 rangées : Nb et croix en min(10,5 ; (h − 1) / 0,72) pt (' + Array.from(new Set(Nb.map(t => t.sz))).join(', ') + ' pt ; '
    + mauv.length + ' hors de leur taille)');
  verifP1('D3 (30 rangées)', X);

  /* cstColonnes appelée directement */
  const c1 = await colonnes(p, [{place: 'MILIEU', conf: ''}], 'longueur');
  const dc = K => K ? K.colonnes.map(k => k.cle + ' ' + +k.x.toFixed(3) + ' ' + +k.w.toFixed(3)).join(', ') : 'absente';
  R.ok(!!c1 && dc(c1) === 'lib 65 387, nb 452 23, MILIEU 475 69', 'D3 : cstColonnes, mesure factice : Milieu seul reçoit le surplus de « Raccordée sur » (69 pt) (' + dc(c1) + ')');
  const c2 = await colonnes(p, [{place: 'UN_D', conf: ''}, {place: 'UN_T', conf: ''}], 'reseau100');
  R.ok(!!c2 && dc(c2) === 'lib 65 352, nb 417 23, UN_D 440 51.75, UN_T 491.75 52.25'
    && c2.verticales.map(v => v.x + '/' + v.dy).join(' ') === '65/0 417/0 440/0 491.75/31 544/0'
    && c2.traits.map(t => t.dy + ':' + t.x1 + '-' + t.x2).join(' ') === '0:65-544 11:440-544 31:440-544 42:65-544',
    'D3 : cstColonnes : le surplus d\'un groupe se partage à parts égales entre ses sous-colonnes ; verticales et traits par rang (' + dc(c2) + ')');
  const c3 = await colonnes(p, [{place: 'EU_D', conf: ''}, {place: 'EU_T', conf: ''}, {place: 'FOSSE', conf: ''}], 'region300');
  R.ok(!!c3 && dc(c3) === 'lib 65 152, nb 217 23, EU_D 240 81.9, EU_T 321.9 82.4, FOSSE 404.3 139.7',
    'D3 : cstColonnes : le surplus d\'une région se partage entre ses groupes, puis entre leurs sous-colonnes (' + dc(c3) + ')');
  const TOUS = ['EU_D', 'EU_T', 'EP_D', 'EP_T', 'UN_D', 'UN_T', 'FOSSE', 'MILIEU', 'PUITS', 'GARG'].map((k, i) => ({place: k, conf: i % 2 ? 'oui' : 'non'}));
  const c4 = await colonnes(p, TOUS, 'tout400');
  const s4 = c4 ? c4.colonnes.reduce((s, k) => s + k.w, 0) : 0;
  R.ok(!!c4 && c4.colonnes.length === 14 && pres(c4.colonnes[0].w, 107.5, 1e-6) && pres(s4, 479, 1e-6) && c4.colonnes.every(k => k.w > 0) && pres(c4.verticales[c4.verticales.length - 1].x, 544, 1e-9),
    'D3 : cstColonnes : en-têtes trop larges : libellés de 107,5 pt au moins, somme 479 (libellés ' + (c4 ? c4.colonnes[0].w.toFixed(3) : '-') + ', somme ' + s4.toFixed(3) + ')');
  const c5 = await colonnes(p, [{place: 'plusieurs', conf: ''}, {place: '', conf: 'aucune'}], 'pdf');
  R.ok(!!c5 && dc(c5) === 'lib 65 456, nb 521 23' && !c5.fond && c5.entetes.map(e => e.t).join() === 'Installation,Nb',
    'D3 : cstColonnes : sans croix ni conformité, Installation et Nb seuls (libellés de 456 pt) (' + dc(c5) + ')');
  const c6 = await colonnes(p, TOUS, 'pdf'), c6b = await colonnes(p, TOUS, 'pdf');
  R.ok(!!c6 && lst(c6.verticales.map(v => v.x)) === lst(FORM_X) && c6.verticales.every((v, i) => pres(v.x, FORM_X[i], 0.001) && v.dy === FORM_V[i][1] - 360)
    && JSON.stringify(c6) === JSON.stringify(c6b), 'D3 : cstColonnes : tout gardé, les verticales de la présentation 2 et leurs rangs ; même résultat à chaque appel');
}

/* ---------- D5 à D13 : page 1 délestée (m159) ---------- */

/* dossier complet (D6, D13), fictif : identification, catégorie « collectif 21 à 50 », méthodes (visuel et résonance par les rangées,
   eau cochée), deux rangées, deux cases de récupération sur quatre, désagréments « oui » localisés, croquis de position ; page 2 (m160) :
   boîte (distance en EU et en EP, côté « intérieur » en EU), réseau territorial avec gestionnaire, rue, conclusion « avec réserves » et
   réserves, préconisations de l'exemple de la conception (création de boîte en EU, sur branchement à créer en EU, gargouille à créer ;
   création de branchement EU départemental, EP territorial ; les automatiques à false), observations */
const COMPLET = {visite: {nom: 'Nom Fictif', tel: '06 39 98 12 34', mail: 'nom.fictif@exemple.org', domicile: '12 rue Fictive', domVille: '99000 Ville-Exemple',
  adresse: '12 rue Fictive', commune: '99000 Ville-Exemple'},
  lignes: {wc: {nb: '1', raccord: 'EU_D', methodes: ['visuel']}, gout_av: {nb: '1', raccord: 'GARG', methodes: ['reso']}},
  champs: {demande: '10/11/2026', refCad: 'Parcelle fictive 12', typePropriete: 'Maison fictive', nbLogements: '1', categorie: 'c50', categorieNb: '3', methodes: {eau: true},
    epRecup: {recup: true, autre: true}, desagr: 'oui', desagrLoc: 'Cave fictive', croquis: SIG,
    boite: {distEU: '1,2 m', distEP: '0,8 m', coteEU: 'intérieur'}, reseau: 'territorial', reseauGest: 'Gestionnaire fictif', reseauRue: 'Rue fictive',
    conclusion: 'reserves', reserves: 'Réserve fictive', precos: precosSeules(['boite_EU', 'boiteCr_EU', 'gargCr', 'pubEU_D', 'pubEP_T']), observations: 'Observation fictive'}};
/* le dossier complet, changé par o (statut, visite, lignes, ajouts, champs) */
const avec = o => ({statut: o.statut, visite: Object.assign({}, COMPLET.visite, o.visite), lignes: o.lignes || COMPLET.lignes, ajouts: o.ajouts,
  champs: Object.assign({}, COMPLET.champs, o.champs)});
const rubrique = (plan, id) => Array.isArray(plan) ? plan.find(e => e.page === 1 && e.id === id) || null : null;
const hautDe = (plan, id) => { const e = rubrique(plan, id); return e ? P1de(id)[1] + e.dy : NaN; };
/* textes de la page 1 hors de l'en-tête (y ≥ 153,8) et du tableau délesté */
const textesHors = X => X.L.filter(a => a[0] === 't' && a[1] === 1 && a[3] >= 153.8 && !(X.d && a[3] >= 360 + X.d.dy - 0.002 && a[3] <= 343.2 + X.d.dy + X.d.h + 0.002));

/* D5 : dossier minimal (nom, adresse du branchement du dossier créé, une ligne sans méthode), puis le même sans adresse */
async function d5(p){
  const VIDES = {demande: '', refCad: '', typePropriete: '', nbLogements: '', categorieNb: ''};
  await poser(p, {visite: {nom: 'Nom Fictif'}, lignes: {wc: {nb: '1', raccord: 'EU_D'}}, champs: VIDES});
  const X = await deux(p), L1 = X.L.filter(a => a[1] === 1), Lc1 = X.Lc.filter(a => a[1] === 1);
  R.ok(plansEgaux(X.plan, planAttendu(['nomRef', 'adresse', 'description'], 17.5)) && !!X.d && pres(X.d.dy, -151.3, 1e-6) && pres(X.d.place, 565.3, 1e-6),
    'D5 : dossier minimal : calcul du nom, de l\'adresse et de la description seuls, description en 191,9 (dy −151,3), place 565,3 (' + dire(X.plan) + ')');
  verifP1('D5', X);
  /* page 2 minimale (m160) : le cadre, la conclusion du dossier (WC conforme : « conformes »), le pied ; « Je, soussigné » nommé */
  const P5 = page2(X.plan);
  R.ok(plansP2Egaux(P5, [{id: 'conclusion', page: 2, dy: -78.5, h: 31.9, lignes: [{id: 'titre', y0: 109, y: 30.5}, {id: 'installations', y0: 162.3, y: 51.4}]}]),
    'D5 : page 2 minimale : la conclusion seule, en 22,5 (titre 30,5, dy −78,5 ; installations 51,4) (' + direP2(P5) + ')');
  R.ok(!X.L.some(a => a[1] === 2 && pointille(a)) && X.Lc.some(a => a[1] === 2 && pointille(a)),
    'D5 : page 2 sans pointillé (« Je, soussigné » nommé), quand le formulaire du même dossier en a');
  const titres = ['Nom du propriétaire :', 'Nom Fictif', 'Adresse du branchement :', '12 rue Fictive - 99000 Ville-Exemple', texteEn(X.Lc, 42.6, 351.2)];
  const hors = textesHors(X).map(a => a[4]);
  R.ok(hors.join(' | ') === titres.join(' | '), 'D5 : hors de l\'en-tête et du tableau, seuls le libellé du nom, « Nom Fictif », le libellé de l\'adresse, l\'adresse et le titre '
    + 'de la description (' + hors.map(dit).join(' | ') + ')');
  const ent = L1.filter(a => a[0] === 't' && a[3] < 153.8), entF = Lc1.filter(a => a[0] === 't' && a[3] < 153.8);
  const visite = ent.filter(a => /^Visite du /.test(a[4])).map(a => a[4]);
  R.ok(!ent.some(a => /^Demande du/.test(a[4])) && entF.some(a => /^Demande du/.test(a[4])) && visite.join() === 'Visite du 18/11/2026',
    'D5 : en-tête sans « Demande du » (sans demande), avec « Visite du 18/11/2026 » (' + visite.join(' | ') + ')');
  const rects = L1.filter(a => a[0] === 'r' && a[3] < 153.8);
  R.ok(!texteEn(X.L, 220.4, 141.5) && rects.length === 1 && rects[0][2] === 15 && rects[0][3] === 15,
    'D5 : visite effectuée : ni libellé ni case du motif (rectangles de l\'en-tête : le cadre seul, ' + rects.length + ')');
  R.ok(!L1.some(a => a[0] === 't' && a[2] === 563 && a[7] === 6.5) && L1.filter(a => a[0] === 't' && a[6] === 'bolditalic' && a[3] >= 153.8).length === 1,
    'D5 : ni légende (aucun code de méthode), ni titre de rubrique vide (un seul titre sous l\'en-tête : la description)');
  R.ok(!L1.some(pointille) && !L1.some(a => a[0] === 't' && GABARIT.test(a[4])) && Lc1.some(pointille),
    'D5 : page 1 sans pointillé ni gabarit de date (le formulaire du même dossier en a)');
  /* le même sans adresse : le nom, puis directement la description */
  await poser(p, {visite: {nom: 'Nom Fictif', adresse: '', commune: ''}, lignes: {wc: {nb: '1', raccord: 'EU_D'}}, champs: VIDES});
  const Y = await deux(p);
  R.ok(plansEgaux(Y.plan, planAttendu(['nomRef', 'description'], 17.5)) && !!Y.d && pres(Y.d.dy, -171.6, 1e-6) && pres(Y.d.place, 585.6, 1e-6),
    'D5, sans adresse : calcul du nom et de la description seuls, description en 171,6 (dy −171,6), place 585,6 (' + dire(Y.plan) + ')');
  verifP1('D5, sans adresse', Y);
  /* sans nom (m160, DL11) : « Je, soussigné » sans nom garde ses pointillés de 140, seul pointillé de la page 2 */
  await poser(p, {lignes: {wc: {nb: '1', raccord: 'EU_D'}}, champs: VIDES});
  const Z = await deux(p), pz = Z.L.filter(a => a[1] === 2 && pointille(a));
  R.ok(pz.length === 1 && pres(pz[0][3], 596.5, 0.002) && pres(pz[0][5], 596.5, 0.002) && pres(pz[0][4] - pz[0][2], 140, 0.002),
    'D5, sans nom : page 2 : un seul pointillé, celui de « Je, soussigné » sans nom, en 596,5, de 140 pt (' + pz.map(a => a[2] + '-' + a[4] + '/' + a[3]).join(', ') + ')');
  verifP1('D5, sans nom', Z);
}

/* D6 : dossier complet et ses variantes */
async function d6(p){
  await poser(p, avec({}));
  let X = await deux(p);
  const som = await sommeNaturelle(p), plan = X.plan, d = X.d;
  R.ok(som === 35 && plansEgaux(plan, planAttendu(IDS, som)), 'D6 : dossier complet : constatDeleste rend les onze rubriques dans l\'ordre de la page, la première en 153,8, '
    + 'chacune au bas de la précédente gardée plus son écart, avec dy, h et place (rangées naturelles ' + som + ' ; ' + dire(plan) + ')');
  const h = id => hautDe(plan, id), pc = rubrique(plan, 'categorie') || {};
  R.ok(!!d && pres(h('categorie'), 254.5, 1e-6) && pres(pc.dy, 0, 1e-6) && pres(pc.h, 23.5, 1e-6) && pres(h('controle'), 285.9, 1e-6) && pres(rubrique(plan, 'controle').dy, -23, 1e-6)
    && pres(h('description'), 320.2, 1e-6) && pres(360 + d.dy, 337, 1e-6) && pres(402 + d.dy, 379, 1e-6) && pres(d.place, 257.5, 1e-6) && pres(h('description') + d.h, 414, 1e-6)
    && pres(h('recuperation'), 420.7, 1e-6) && pres(h('desagrements'), 438.3, 1e-6) && pres(h('position'), 456.1, 1e-6) && d.place >= 234.5,
    'D6 : exemples de la conception : catégorie 254,5-278 (dy 0), contrôle en 285,9 (dy −23), description en 320,2 (en-tête en 337, rangées dès 379, place 257,5, bas en 414), '
    + 'récupération en 420,7, désagréments en 438,3, position en 456,1');
  verifP1('D6', X);
  /* page 2 (m160) : l'exemple de la conception */
  const lg = L => L.map(([id, y0, y]) => ({id, y0, y})), EX6 = [{id: 'boite', page: 2, dy: 0, h: 44, rangees: ['dist', 'cote'], colonnes: ['EU', 'EP']},
    {id: 'conclusion', page: 2, dy: -26.5, h: 64.3, lignes: lg([['titre', 109, 82.5], ['reseau', 126.6, 100.1], ['rue', 141.4, 114.9], ['installations', 162.3, 135.8]])},
    {id: 'privees', page: 2, dy: -45.1, h: 102.1, lignes: lg([['titre', 199.1, 154], ['parag', 216.9, 171.8], ['boite', 257.6, 212.5], ['boiteCr', 287.2, 227.3], ['garg', 414.8, 245.1]])},
    {id: 'publiques', page: 2, dy: -202.2, h: 71.4, lignes: lg([['titre', 465.3, 263.1], ['EU', 482.7, 280.5], ['EP', 497.5, 295.3], ['noteD', 529.4, 312.5], ['noteT', 540.4, 323.5]])},
    {id: 'observations', page: 2, dy: -216.9, h: 30.6}];
  R.ok(plansP2Egaux(page2(plan), EX6), 'D6 : page 2 : l\'exemple de la conception : boîte 22,5-66,5 ; conclusion (titre 82,5, dy −26,5) sans ligne des réserves ; '
    + 'préconisations privées (titre 154, dy −45,1) ; publiques (titre 263,1, dy −202,2) ; observations en 333,5 (dy −216,9) (' + direP2(page2(plan)) + ')');
  R.ok(texte2(X.L, 'Gestionnaire fictif', 100.1) && texte2(X.L, 'Rue fictive', 114.9) && texte2(X.L, 'Réserve fictive', 135.8) && texte2(X.L, 'Observation fictive', 341.5),
    'D6 : page 2 : le gestionnaire en 100,1, la rue en 114,9, la réserve sur la ligne des installations (135,8), l\'observation en 341,5');
  const r360 = d ? await releveTable(p, 360, 42 + d.place) : null;
  const e360 = r360 ? ecartTol(X.ref, r360.map(a => decale(a, 0, d.dy))) : 'pas de tableau';
  R.ok(!!r360 && r360.length > 0 && !e360, 'D6 : le tableau en 360 + dy est celui que cstTableDeleste dessine en 360, décalé de dy (' + (e360 || X.ref.length + ' appels') + ')');
  const leg = X.L.find(a => a[0] === 't' && a[1] === 1 && a[2] === 563 && d && pres(a[3], 351.2 + d.dy, 0.002)), legF = texteEn(X.Lc, 563, 351.2);
  const motsDe = t => t ? t.slice(t.indexOf(' : ') + 3).split(', ') : [], codesDe = t => motsDe(t).map(m => m.split(' ')[0]).join(' ');
  R.ok(!!leg && !!legF && codesDe(legF) === 'V E Fl Fu R' && codesDe(leg[4]) === 'V R' && leg[4] === legF.slice(0, legF.indexOf(' : ') + 3) + motsDe(legF).filter(m => /^(V|R) /.test(m)).join(', '),
    'D6 : légende réduite aux codes des rangées imprimées, deux sur cinq, dans l\'ordre du formulaire (' + (leg ? codesDe(leg[4]) : 'absente') + ')');

  /* variantes : chacune avec son calcul attendu */
  const sansDom = IDS.filter(i => i !== 'domicile'), V = [
    ['mail vide (ligne du téléphone gardée)', {visite: {mail: ''}}, IDS],
    ['adresse du propriétaire vide (ligne partie)', {visite: {domicile: '', domVille: ''}}, sansDom],
    ['sans nom ni référence cadastrale (adresse en 153,8)', {visite: {nom: ''}, champs: {refCad: ''}}, IDS.slice(1), X => pres(hautDe(X.plan, 'adresse'), 153.8, 1e-6) && pres(rubrique(X.plan, 'adresse').dy, -20.3, 1e-6)],
    ['rien d\'identifié (catégorie en 153,8)', {visite: {nom: '', tel: '', mail: '', domicile: '', domVille: '', adresse: '', commune: ''}, champs: {refCad: '', typePropriete: '', nbLogements: ''}},
      IDS.slice(5), X => pres(hautDe(X.plan, 'categorie'), 153.8, 1e-6) && pres(rubrique(X.plan, 'categorie').dy, -100.7, 1e-6)],
    ['désagréments « oui » sans localisation', {champs: {desagrLoc: ''}}, IDS],
    ['désagréments « non »', {champs: {desagr: 'non'}}, IDS],
    ['catégorie habitation', {champs: {categorie: 'habitation', categorieNb: '1'}}, IDS, X => cat(X, [[52.4, 269.3]])],
    ['catégorie centre hospitalier', {champs: {categorie: 'hosp', categorieNb: '2'}}, IDS, X => cat(X, [[52.4, 268.9]])],
    ['catégorie propriété publique avec accueil', {champs: {categorie: 'pub_acc', categorieNb: '4'}}, IDS, X => cat(X, [[50.2, 264.6], [50.2, 273.9]])],
    ['catégorie propriété publique sans accueil', {champs: {categorie: 'pub_sans', categorieNb: '5'}}, IDS, X => cat(X, [[50.2, 264.2], [50.2, 273.5]])],
    ['catégorie choisie sans nombre (rubrique partie)', {champs: {categorieNb: ' '}}, IDS.filter(i => i !== 'categorie')]];
  /* libellés de la catégorie (le texte d'avant le nombre, et celui d'avant encore pour deux lignes) en (x ; y + dy) */
  const cat = (X, att) => { const L1 = X.L.filter(a => a[0] === 't' && a[1] === 1), k = L1.findIndex(a => a[7] === 9.5 && JSON.stringify(a[8]) === '[0,0,255]'), e = rubrique(X.plan, 'categorie');
    const lab = k >= att.length ? L1.slice(k - att.length, k) : [];
    return !!e && lab.length === att.length && lab.every((a, i) => pres(a[2], att[i][0], 0.002) && pres(a[3], att[i][1] + e.dy, 0.002)) && pres(L1[k][3], att[att.length - 1][1] + e.dy, 0.002); };
  for (const [nom, o, ids, plus] of V){
    await poser(p, avec(o));
    X = await deux(p);
    const s = await sommeNaturelle(p);
    R.ok(plansEgaux(X.plan, planAttendu(ids, s)) && (!plus || plus(X)), 'D6, ' + nom + ' : calcul attendu (' + dire(X.plan) + ')');
    verifP1('D6, ' + nom, X);
  }

  /* 30 rangées : ramenées à la place, rubriques suivantes décalées vers le bas */
  const T30 = {}; ['wc', 'lavelinge', 'evier', 'sdb', 'cuisine', 'siphon', 'gout_av', 'gout_ar', 'grilles', 'siphon_sol'].forEach((id, i) => { T30[id] = {nb: '1', raccord: i < 6 ? 'EU_D' : 'EP_D', methodes: ['visuel']}; });
  const aj = []; for (let i = 1; i <= 20; i++) aj.push({groupe: i <= 10 ? 'EU' : 'EP', label: 'Ligne fictive ' + i, nb: '1', raccord: i <= 10 ? 'EU_T' : 'GARG'});
  await poser(p, avec({lignes: T30, ajouts: aj}));
  X = await deux(p);
  const s30 = await sommeNaturelle(p), d30 = X.d, rg = d30 ? fondsRangees(tableauDel(X.L, d30), 402 + d30.dy) : [];
  R.ok(s30 > 257.5 && plansEgaux(X.plan, planAttendu(IDS, s30)) && !!d30 && pres(d30.place, 257.5, 1e-6) && pres(d30.h, 58.8 + 257.5, 1e-6) && rg.length === 30
    && pres(rg[29], 402 + d30.dy + 257.5, 0.001) && pres(hautDe(X.plan, 'recuperation'), 643.2, 1e-6) && rubrique(X.plan, 'recuperation').dy > 0,
    'D6, 30 rangées : ramenées à la place (257,5), 30 traits, récupération en 643,2 (dy > 0) (naturelles ' + s30 + ' ; ' + dire(X.plan) + ')');
  verifP1('D6, 30 rangées', X);

  /* 30 rangées, sans désagréments ni position : la récupération, dernière rubrique gardée, finit en 816 (805-816, au lieu de 627,2-638,2
     au formulaire) ; place 816 − 379 − (6,7 + 11) */
  await poser(p, avec({lignes: T30, ajouts: aj, champs: {desagr: '', croquis: ''}}));
  X = await deux(p);
  const sB = await sommeNaturelle(p), dB = X.d, idsB = IDS.filter(i => i !== 'desagrements' && i !== 'position');
  R.ok(sB > 419.3 && plansEgaux(X.plan, planAttendu(idsB, sB)) && !!dB && pres(dB.place, 419.3, 1e-6) && pres(hautDe(X.plan, 'recuperation'), 805, 1e-6)
    && pres(rubrique(X.plan, 'recuperation').dy, 177.8, 1e-6),
    'D6, 30 rangées sans désagréments ni position : place 419,3, récupération en 805-816 (dy +177,8) (naturelles ' + sB + ' ; ' + dire(X.plan) + ')');
  verifP1('D6, 30 rangées sans désagréments ni position', X);
}

/* D9 : sans plan de terrain, croquis de position, module présent, absent et désactivé */
async function d9(p){
  await poser(p, {lignes: {wc: {nb: '1', raccord: 'EU_D', conforme: 'oui'}}, ajouts: [{groupe: 'EP', label: 'Fontaine', nb: '1', raccord: 'GARG', conforme: 'oui'}], champs: {croquis: SIG}});
  const X = await deux(p);
  verifP1('D9', X);
  await C.formeConstat(p, 'deleste');
  const ids = await p.evaluate(() => [window.__VT.S.etude.id, window.__VT.S.visites[0].id]);
  const L0 = await C.relevePdf(p), L1 = await C.relevePdf(p, {sansModule: true});
  let L2 = [];
  await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: false}); });
  try { L2 = await C.relevePdf(p); }
  finally { await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: true}); }); }
  const e1 = C.premierEcart(empreintes(L1, ids), empreintes(L0, ids)), e2 = C.premierEcart(empreintes(L2, ids), empreintes(L0, ids));
  R.ok(!e1 && !e2 && L0.length > 0, 'D9 : module du croquis présent, absent et désactivé : trois relevés identiques (' + (e1 ? 'absent, ' + e1 : e2 ? 'désactivé, ' + e2 : L0.length + ' appels') + ')');
  const pos = rubrique(X.plan, 'position'), im = L0.filter(a => a[0] === 'i' && a[1] === 1 && a[4] === 40 && a[6] === 520 && a[7] === 124);
  R.ok(!!pos && pos.dy < 0 && im.length === 1 && pres(im[0][5], 676 + pos.dy, 0.002), 'D9 : position présente et décalée : image en x 40, y 676 + dy, 520 × 124, dy < 0 ('
    + (pos ? 'dy ' + pos.dy : 'pas de position au calcul') + ' ; ' + im.map(a => a[4] + '/' + a[5]).join(', ') + ')');
}

/* D13 : refus de visite, dossier par ailleurs complet */
async function d13(p){
  await poser(p, avec({statut: 'refus'}));
  let X = await deux(p);
  const ids = ['nomRef', 'adresse', 'domicile', 'telMail', 'typeLog', 'categorie'];
  R.ok(plansEgaux(X.plan, planAttendu(ids, 0)), 'D13 : refus de visite : identification et catégorie seules au calcul (' + dire(X.plan) + ')');
  verifP1('D13', X);
  /* page 2 du refus (m160, DL20) : la conclusion réduite au réseau et à la rue, les observations ; ni boîte, ni installations, ni préconisations */
  const P13 = page2(X.plan), o13 = P13.find(e => e.id === 'observations');
  R.ok(P13.map(e => e.id).join() === 'conclusion,observations' && lignesDe(X.plan, 'conclusion') === 'titre 30.5, reseau 48.1, rue 62.9' && !!o13 && pres(550.4 + o13.dy, 72.9, 1e-6)
    && texte2(X.L, 'Observation fictive', 80.9), 'D13 : page 2 du refus : la conclusion (titre 30,5, réseau 48,1, rue 62,9), puis les observations en 72,9 (' + direP2(P13) + ')');
  const L1 = X.L.filter(a => a[1] === 1), Lc1 = X.Lc.filter(a => a[1] === 1);
  const i = L1.findIndex(a => a[0] === 't' && a[2] === 220.4 && a[3] === 141.5), j = Lc1.findIndex(a => a[0] === 't' && a[2] === 220.4 && a[3] === 141.5);
  const cs = i >= 0 ? casesDe(L1, i + 1) : [], csF = j >= 0 ? casesDe(Lc1, j + 1) : [];
  R.ok(cs.length === 1 && cs[0].coche && csF.length === 3 && cs[0].x === csF[0].x && cs[0].appels[3][4] === 'refus' && L1.filter(a => a[0] === 'r' && a[3] < 153.8).length === 2,
    'D13 : le motif « refus » seul, coché, à la place de la première case (' + cs.map(c => c.x + (c.coche ? ' cochée' : '')).join(', ') + ')');
  const cBas = hautDe(X.plan, 'categorie') + 23.5;
  R.ok(!L1.some(a => a[0] === 't' && /^Visite du/.test(a[4])) && !L1.some(a => yRef(a) > cBas + 0.002) && !L1.some(a => a[0] === 'i' && a[5] >= 153.8),
    'D13 : ni « Visite du », ni contrôle, ni tableau, ni récupération, ni désagréments, ni position : rien sous la catégorie (bas ' + cBas + ')');
  /* absence, avec ses dates : le motif « absence » à sa place, la ligne des absences gardée */
  await poser(p, avec({statut: 'absent', visite: {absences: ['2026-11-10', '2026-11-14']}}));
  X = await deux(p);
  R.ok(plansEgaux(X.plan, planAttendu(ids, 0)), 'D13, absence : identification et catégorie seules au calcul (' + dire(X.plan) + ')');
  verifP1('D13, absence avec ses dates', X);
}

/* ---------- D8, D10 à D12 : page 2 délestée (m160) ---------- */

/* appels de la page 2 d'un relevé ; ceux d'entre le cadre (15 ; 15) et le pied (rectangle cyan en 584,5) */
const page2De = L => L.filter(a => a[1] === 2);
const corps2 = L => page2De(L).filter(a => { const y = yRef(a); return y !== null && y > 15.002 && y < 584.5 - 0.002; });
/* lignes d'un élément de la page 2 du calcul, dites « id y », et ligne de base délestée de l'une d'elles (NaN sans elle) */
const lignesDe = (plan, el) => { const e = page2(plan).find(f => f.id === el); return e && e.lignes ? e.lignes.map(l => l.id + ' ' + n3(l.y)).join(', ') : ''; };
const ligneDe = (plan, el, id) => { const e = page2(plan).find(f => f.id === el), l = e && e.lignes ? e.lignes.find(m => m.id === id) : null; return l ? l.y : NaN; };
/* appels de la page 2 sur la ligne de base y (de y − 9 à y + 2), et texte t posé sur la ligne de base y de la page 2 */
const surLigne = (L, y) => page2De(L).filter(a => { const r = yRef(a); return r !== null && r >= y - 9 - 0.002 && r <= y + 2 + 0.002; });
const texte2 = (L, t, y) => page2De(L).some(a => a[0] === 't' && a[4] === t && pres(a[3], y, 0.002));
const NOM = {nom: 'Nom Fictif'}, OUI = {wc: {nb: '1', raccord: 'EU_D', conforme: 'oui'}};

/* D8 (DL20) : refus de visite avec le réseau et la rue, la boîte et des préconisations : la conclusion réduite au réseau et à la rue
   (« Conclusion : » en 30,5) ; pied sans « Je, soussigné… » ni légende du propriétaire, la seule signature du technicien. Puis sans
   réseau ni rue : rien entre le cadre et le pied */
async function d8(p){
  await poser(p, {statut: 'refus', lignes: {wc: {nb: '1', raccord: 'EU_D'}}, champs: {reseau: 'departemental', reseauRue: 'Rue fictive',
    boite: {distEU: '1,2 m', coteEP: 'extérieur'}, precos: precosSeules(['boite_EU', 'pubEU_D']), sigTech: SIG, sigProp: SIG}});
  let X = await deux(p);
  verifP1('D8', X);
  const L2 = page2De(X.L), Lc2 = page2De(X.Lc), conc = Lc2.find(a => a[0] === 't' && a[2] === 42.6 && a[3] === 109), tc = conc ? conc[4] : null;
  R.ok(!!tc && lignesDe(X.plan, 'conclusion') === 'titre 30.5, reseau 48.1, rue 62.9' && L2.some(a => a[0] === 't' && a[4] === tc && a[2] === 42.6 && pres(a[3], 30.5, 0.002))
    && texte2(X.L, 'Rue fictive', 62.9), 'D8 : refus avec le réseau et la rue : « Conclusion : » en 30,5, réseau en 48,1, rue en 62,9 (' + direP2(page2(X.plan)) + ')');
  const pied = L2.filter(a => yRef(a) !== null && yRef(a) >= 584.5 - 0.002), nI = L2.filter(a => a[0] === 'i').length;
  R.ok(!pied.some(a => a[0] === 't' && pres(a[3], 595.9, 0.002)) && !pied.some(pointille) && !pied.some(a => a[0] === 't' && a[2] === 326.2 && a[3] === 688)
    && pied.some(a => a[0] === 't' && a[2] === 42.6 && a[3] === 688) && nI === 1 && Lc2.filter(a => a[0] === 't' && pres(a[3], 595.9, 0.002)).length === 2,
    'D8 : pied délesté : ni « Je, soussigné… » ni légende du propriétaire ; la légende et la seule signature du technicien (' + nI + ' image(s) ; le formulaire a « Je, soussigné… »)');
  await poser(p, {statut: 'refus', lignes: {wc: {nb: '1', raccord: 'EU_D'}}});
  X = await deux(p);
  verifP1('D8, refus sans réseau ni rue', X);
  const C2 = corps2(X.L);
  R.ok(Array.isArray(X.plan) && !page2(X.plan).length && !C2.length && !page2De(X.L).some(a => a[0] === 't' && a[4] === tc),
    'D8, refus sans réseau ni rue : ni « Conclusion : » ni autre élément entre le cadre et le pied (' + direP2(page2(X.plan)) + ' ; ' + C2.length + ' appel(s))');
}

/* D10 : boîte EP seule : sa colonne à la place de celle des EU (bord droit 386,5, en-tête vert en 356,8) ; le côté en une case centrée ;
   une valeur trop large en 9,5 pt mais qui tient en 7 pt, sur la ligne de son libellé (règle de CLAUDE.md) */
async function d10(p){
  const VAL = '1,35 m environ';
  const w = await p.evaluate(s => { const T = window.__VT, d = T.newPdf(); d.setFont(d.__font, 'normal'); d.setFontSize(9.5);
    const a = d.getTextWidth(T.pdfText(s)); d.setFontSize(7); return [a, d.getTextWidth(T.pdfText(s))]; }, VAL);
  R.ok(w[0] > 56 && w[1] <= 56, 'D10 : prémisse : « ' + VAL + ' » ne tient pas dans 56 pt en 9,5 pt, mais y tient en 7 pt (' + w.map(x => x.toFixed(2)).join(' ; ') + ')');
  await poser(p, {visite: NOM, lignes: OUI, champs: {boite: {coteEP: 'extérieur', profEP: VAL}}});
  const X = await deux(p), B = page2De(X.L).filter(a => yRef(a) !== null && yRef(a) > 15.002 && yRef(a) <= 66.502);
  verifP1('D10', X);
  const tr = B.filter(a => a[0] === 'l' && a[6] === 0.6 && JSON.stringify(a[7]) === '[0,0,255]'), xm = Math.max(...tr.map(a => Math.max(a[2], a[4])));
  /* le vert de l'en-tête « EP » du formulaire (416,5 ; 33,4), tel que le relevé le lit */
  const ent = B.filter(a => a[0] === 't' && pres(a[3], 33.4, 0.002)), vertF = page2De(X.Lc).find(a => a[0] === 't' && a[4] === 'EP' && a[2] === 416.5 && pres(a[3], 33.4, 0.002));
  R.ok(tr.length === 7 && xm === 386.5 && ent.length === 1 && ent[0][4] === 'EP' && ent[0][2] === 356.8 && !!vertF && JSON.stringify(ent[0][8]) === JSON.stringify(vertF[8]),
    'D10 : boîte d\'une colonne : sept traits jusqu\'à 386,5, l\'en-tête « EP » seul, en vert, en 356,8 (' + tr.length + ' traits jusqu\'à ' + xm + ' ; '
    + ent.map(a => a[4] + ' ' + a[2] + ' ' + JSON.stringify(a[8])).join(', ') + ' ; formulaire : ' + (vertF ? JSON.stringify(vertF[8]) : 'pas d\'en-tête EP') + ')');
  const wx = (X.wCote || {})['ext.'] || 0, rc = B.filter(a => a[0] === 'r'), cx = 356.8 - (9.8 + wx) / 2, ext = B.filter(a => a[0] === 't' && a[4] === 'ext.');
  R.ok(rc.length === 1 && pres(rc[0][2], cx, 0.002) && pres(rc[0][3], 50.125 - 6.6, 0.002) && B.filter(a => a[0] === 'l' && a[6] === 1.2).length === 2 && ext.length === 1
    && pres(ext[0][2], cx + 9.8, 0.002) && pres(ext[0][3], 50.125, 0.002) && !B.some(a => a[0] === 't' && a[4] === 'int.'),
    'D10 : côté : la seule case « ext. », cochée, centrée en 356,8, sur la ligne 50,125 (case en ' + rc.map(a => a[2] + '/' + a[3]).join(', ') + ' ; attendu ' + n3(cx) + ')');
  const vt = B.filter(a => a[0] === 't' && a[4] === VAL);
  R.ok(vt.length === 1 && vt[0][2] === 356.8 && pres(vt[0][3], 63.375, 0.002) && vt[0][7] >= 7 && vt[0][7] < 9.5,
    'D10 : la profondeur sur la ligne de son libellé (63,375), centrée en 356,8, d\'une taille de 7 à 9,5 pt (' + vt.map(a => a[2] + '/' + a[3] + '/' + a[7]).join(', ') + ')');
}

/* D11 : conclusion. Vide : le titre, les trois cases vides, sans pointillé ; « avec réserves » : sa case et son texte sur la ligne des
   installations ; réseau seul (départemental, territorial avec et sans gestionnaire) : la case cochée en 249,5 ; rue seule : le
   libellé du réseau, sans case, puis la rue */
async function d11(p){
  await poser(p, {visite: NOM, champs: {precos: precosSeules([])}});
  let X = await deux(p);
  verifP1('D11, conclusion vide', X);
  const C2 = corps2(X.L);
  R.ok(lignesDe(X.plan, 'conclusion') === 'titre 30.5, installations 51.4, reserves 70' && C2.filter(a => a[0] === 'r').length === 3 && !C2.some(a => a[0] === 'l' && a[6] === 1.2)
    && !page2De(X.L).some(pointille), 'D11, conclusion vide : titre, installations et réserves ; trois cases vides, aucun pointillé (' + direP2(page2(X.plan)) + ')');
  await poser(p, {visite: NOM, champs: {conclusion: 'reserves', reserves: 'Réserve fictive'}});
  X = await deux(p);
  verifP1('D11, réserves', X);
  const yi = ligneDe(X.plan, 'conclusion', 'installations'), Li = surLigne(X.L, yi);
  R.ok(lignesDe(X.plan, 'conclusion') === 'titre 30.5, installations 51.4' && texte2(X.L, 'Réserve fictive', yi) && Li.filter(a => a[0] === 'r').length === 1
    && Li.some(a => a[0] === 'r' && a[2] === 184.3 && pres(a[3], yi - 8.3, 0.002)) && Li.filter(a => a[0] === 'l' && a[6] === 1.2).length === 2,
    'D11, réserves : la case cochée en 184,3 et « Réserve fictive » sur la ligne des installations, pas de ligne des réserves (' + direP2(page2(X.plan)) + ')');
  for (const [nom, ch, gest, mot] of [['départemental', {reseau: 'departemental'}, '', 'départemental'],
    ['territorial avec gestionnaire', {reseau: 'territorial', reseauGest: 'Gestionnaire fictif'}, 'Gestionnaire fictif', ''], ['territorial sans gestionnaire', {reseau: 'territorial'}, '', 'territorial']]){
    await poser(p, {visite: NOM, lignes: OUI, champs: ch});
    X = await deux(p);
    verifP1('D11, réseau ' + nom, X);
    const yr = ligneDe(X.plan, 'conclusion', 'reseau'), Lr = surLigne(X.L, yr), rr = Lr.filter(a => a[0] === 'r'), tt = Lr.filter(a => a[0] === 't');
    R.ok(pres(yr, 48.1, 1e-6) && rr.length === 1 && rr[0][2] === 249.5 && pres(rr[0][3], yr - 6.6, 0.002) && Lr.filter(a => a[0] === 'l' && a[6] === 1.2).length === 2
      && (mot ? tt.length === 2 && tt[1][4] === mot && pres(tt[1][2], 259.3, 0.002) : tt.length === 3 && tt[2][4] === gest && pres(tt[2][3], yr, 0.002)),
      'D11, réseau ' + nom + ' : la case cochée en 249,5, sur la ligne du réseau (48,1)' + (mot ? ', le texte « ' + mot + ' » en 259,3' : ', le gestionnaire à sa suite') + ' ('
      + tt.map(a => dit(a[4]) + ' ' + a[2]).join(', ') + ')');
  }
  await poser(p, {visite: NOM, lignes: OUI, champs: {reseauRue: 'Rue fictive'}});
  X = await deux(p);
  verifP1('D11, rue seule', X);
  const yr = ligneDe(X.plan, 'conclusion', 'reseau'), Lr = surLigne(X.L, yr);
  R.ok(pres(yr, 48.1, 1e-6) && !Lr.some(a => a[0] === 'r' || a[0] === 'l') && Lr.filter(a => a[0] === 't').length === 1 && texte2(X.L, 'Rue fictive', 62.9),
    'D11, rue seule : le libellé du réseau seul, sans case, en 48,1 ; « Rue fictive » en 62,9 (' + direP2(page2(X.plan)) + ')');
}

/* D12 : préconisations (WC conforme). Privées : « - sur branchement à créer » seule (tête sans case) ; raccordement des EP au branchement
   EP seul (sa case en 170,2, sur la ligne du libellé) ; non conforme sans préconisation (anomalie EU ajoutée à la main) : titre et
   paragraphe seuls ; conforme sans préconisation : rubrique absente. Publiques : les notes D et T, à l'interligne du formulaire */
async function d12(p){
  const avecP = async cles => { await poser(p, {visite: NOM, lignes: OUI, champs: {precos: precosSeules(cles)}}); return deux(p); };
  let X = await avecP(['boiteCr_UN']);
  verifP1('D12, « - sur branchement à créer » seule', X);
  const yb = ligneDe(X.plan, 'privees', 'boite'), yc = ligneDe(X.plan, 'privees', 'boiteCr'), Lc = surLigne(X.L, yc);
  R.ok(lignesDe(X.plan, 'privees') === 'titre 69.6, parag 87.4, boite 128.1, boiteCr 142.9' && !surLigne(X.L, yb).some(a => a[0] === 'r')
    && Lc.filter(a => a[0] === 'r').length === 1 && Lc.some(a => a[0] === 'r' && a[2] === 269.4),
    'D12, « - sur branchement à créer » seule : la tête sans case, puis la sous-ligne, sa case en 269,4 (' + direP2(page2(X.plan)) + ')');
  X = await avecP(['raccEPep']);
  verifP1('D12, raccordement des EP au branchement EP seul', X);
  const yr = ligneDe(X.plan, 'privees', 'racc'), Lr = surLigne(X.L, yr);
  R.ok(lignesDe(X.plan, 'privees') === 'titre 69.6, parag 87.4, racc 128.6' && Lr.filter(a => a[0] === 'r').length === 1 && Lr.some(a => a[0] === 'r' && a[2] === 170.2 && pres(a[3], 122, 0.002)),
    'D12, raccordement des EP au branchement EP seul : une ligne, à la fin du paragraphe + 17,8, la case en 170,2 sur la ligne du libellé (' + direP2(page2(X.plan)) + ')');
  X = await avecP(['pubUN_D']);
  verifP1('D12, création à l\'unitaire, départemental', X);
  R.ok(lignesDe(X.plan, 'publiques') === 'titre 69.4, UN 86.8, noteD 104', 'D12, création à l\'unitaire, départemental : UN au titre + 17,4, la note D à UN + 17,2 ('
    + direP2(page2(X.plan)) + ')');
  X = await avecP(['pubEU_T']);
  verifP1('D12, création à l\'EU, territorial', X);
  const Le = surLigne(X.L, 86.8);
  R.ok(lignesDe(X.plan, 'publiques') === 'titre 69.4, EU 86.8, noteT 104' && Le.filter(a => a[0] === 'r').length === 1 && Le.some(a => a[0] === 'r' && a[2] === 269.4)
    && texte2(X.L, 'territorial', 86.8), 'D12, création à l\'EU, territorial : EU au titre + 17,4, sa case « territorial » à la première place (269,4), la note T à EU + 17,2 ('
    + direP2(page2(X.plan)) + ')');
  /* non conforme sans préconisation : une anomalie EU, tampon béton (NC en EU), ajoutée à la main au dossier, puis retirée */
  await poser(p, {visite: NOM, lignes: OUI, champs: {precos: precosSeules([])}});
  await p.evaluate(() => { const T = window.__VT, v = T.S.visites[0]; T.S.anoms.push({id: 'anom-fictive-1', etudeId: v.etudeId, visiteId: v.id, reseau: 'EU',
    observation: 'Regard EU : tampon béton', preconisation: '', localisation: '', photos: [], photoNonRequise: true, brouillon: false}); });
  try { X = await deux(p); }
  finally { await p.evaluate(() => { const A = window.__VT.S.anoms, i = A.findIndex(a => a.id === 'anom-fictive-1'); if (i >= 0) A.splice(i, 1); }); }
  verifP1('D12, non conforme sans préconisation', X);
  R.ok(!!X.D2 && X.D2.concl === 'non_conformes' && lignesDe(X.plan, 'privees') === 'titre 69.6, parag 87.4' && page2(X.plan).some(e => e.id === 'observations'),
    'D12, non conforme sans préconisation : titre et paragraphe des préconisations privées, sans ligne ; observations gardées (' + direP2(page2(X.plan)) + ')');
  X = await avecP([]);
  verifP1('D12, conforme sans préconisation', X);
  R.ok(!!X.D2 && X.D2.concl === 'conformes' && Array.isArray(X.plan) && !page2(X.plan).some(e => e.id === 'privees' || e.id === 'publiques'),
    'D12, conforme sans préconisation : ni préconisations privées ni publiques (' + direP2(page2(X.plan)) + ')');
}

/* ---------- D7 et D4 : page unique et marque notée à la signature (m161) ---------- */

/* D7 (DL17) : une seule page quand tout tient (fin ≤ 580,5), deux sinon ; chaque cas passe aussi par verifP1 (calcul et relevé entiers,
   garde-fous) */
async function d7(p){
  const VIDES = {demande: '', refCad: '', typePropriete: '', nbLogements: '', categorieNb: ''};
  const conclusionDe = Lc => { const a = page2De(Lc).find(t => t[0] === 't' && t[2] === 42.6 && t[3] === 109); return a ? a[4] : null; };
  /* une page : aucune page neuve ; le pied en page 1 (rectangle cyan en 36,5 ; 584,5) ; « Conclusion : » en page 1, en yc + s (yc : sa
     place sur deux pages, 30,5 sans boîte) */
  const une = async (nom, s, yc) => {
    await poser(p, s);
    const X = await deux(p), B = X.brut, nP = B.L.filter(a => a[0] === 'p').length, cy = B.L.filter(a => a[0] === 'r' && a[2] === 36.5 && a[3] === 584.5);
    verifP1(nom, X);
    const y0 = yc === undefined ? 30.5 : yc, tc = conclusionDe(X.Lc), c1 = B.L.filter(a => a[0] === 't' && a[1] === 1 && a[4] === tc && a[2] === 42.6);
    R.ok(X.une && nP === 0 && cy.length === 1 && cy[0][1] === 1 && !!tc && c1.length === 1 && pres(c1[0][3], y0 + X.s, 0.002),
      nom + ' : une seule page : aucune page neuve, le pied en page 1 (rectangle cyan en 584,5), « Conclusion : » en page 1 en ' + String(y0).replace('.', ',')
      + ' + s (s ' + X.s + ' ; '
      + nP + ' page(s) neuve(s), rectangle cyan en page ' + cy.map(a => a[1]).join() + ', « Conclusion : » en ' + c1.map(a => a[1] + '/' + a[3]).join() + ')');
    return X;
  };
  /* deux pages : une page neuve, en page 2, suivie du cadre ; le pied en page 2 */
  const deuxP = async (nom, s) => {
    await poser(p, s);
    const X = await deux(p), B = X.brut, i = B.L.findIndex(a => a[0] === 'p'), cy = B.L.filter(a => a[0] === 'r' && a[2] === 36.5 && a[3] === 584.5);
    verifP1(nom, X);
    R.ok(!X.une && i > 0 && B.L[i][1] === 2 && cadre(B.L[i + 1]) && B.L[i + 1][1] === 2 && B.L.filter(a => a[0] === 'p').length === 1 && cy.length === 1 && cy[0][1] === 2,
      nom + ' : deux pages : une page neuve, suivie du cadre en page 2, le pied en page 2 (' + B.L.filter(a => a[0] === 'p').length + ' page(s) neuve(s), rectangle cyan en page '
      + cy.map(a => a[1]).join() + ')');
    return X;
  };
  let X = await une('D7, dossier minimal', {visite: NOM, lignes: {wc: {nb: '1', raccord: 'EU_D'}}, champs: VIDES});
  R.ok(pres(X.s, 253.7, 1e-6) && !!X.d && pres(X.d.dy, -151.3, 1e-6), 'D7, dossier minimal : description en 191,9, bas de la page 1 en 268,2, s = 253,7 (s ' + X.s + ')');
  X = await une('D7, refus de visite', avec({statut: 'refus'}));
  R.ok(pres(X.s, 263.5, 1e-6), 'D7, refus de visite : bas de la page 1 en 278 (catégorie), s = 263,5 (s ' + X.s + ')');
  /* rien en page 1 (ni nom, ni adresse, ni coordonnées, ni type, ni catégorie, ni méthode, ni ligne remplie), une boîte (deux rangées, EP)
     et des observations : s = 153,8 − 22,5 = 131,3 ; la boîte en 22,5 + s = 153,8, place de la première rubrique ; « Conclusion : » sous
     elle, en 82,5 + s */
  X = await une('D7, rien en page 1, une boîte et des observations', {visite: {adresse: '', commune: ''},
    champs: Object.assign({boite: {distEP: '0,5 m', coteEP: 'extérieur'}, observations: 'Observation fictive'}, VIDES)}, 82.5);
  const bt = page2(X.brut.plan).find(e => e.id === 'boite');
  const b1 = X.brut.L.filter(a => a[0] === 'l' && a[1] === 1 && a[2] === 327 && pres(a[3], 153.8, 0.002) && pres(a[5], 153.8, 0.002));
  R.ok(Array.isArray(X.brut.plan) && !page1(X.brut.plan).length && pres(X.s, 131.3, 1e-6) && !!bt && pres(bt.dy, 131.3, 1e-6) && b1.length === 1,
    'D7, rien en page 1 : aucune rubrique, s = 131,3, la boîte en 22,5 + s = 153,8 (dy de la boîte ' + (bt ? bt.dy : 'absent') + ' ; ' + b1.length
    + ' trait du haut de la boîte en 153,8 ; ' + direEntier(X.brut.plan) + ')');
  X = await deuxP('D7, dossier complet avec croquis de position', avec({}));
  R.ok(!!rubrique(X.plan, 'position'), 'D7, dossier complet : la position au calcul (' + dire(X.plan) + ')');
  const T30 = {}; ['wc', 'lavelinge', 'evier', 'sdb', 'cuisine', 'siphon', 'gout_av', 'gout_ar', 'grilles', 'siphon_sol'].forEach((id, i) => { T30[id] = {nb: '1', raccord: i < 6 ? 'EU_D' : 'EP_D', methodes: ['visuel']}; });
  const aj = []; for (let i = 1; i <= 20; i++) aj.push({groupe: i <= 10 ? 'EU' : 'EP', label: 'Ligne fictive ' + i, nb: '1', raccord: i <= 10 ? 'EU_T' : 'GARG'});
  await deuxP('D7, 30 rangées', avec({lignes: T30, ajouts: aj}));
  /* quinze lignes, toutes les préconisations, 600 caractères d'observations : préconisations et observations gardées en entier, égales
     aux appels du formulaire du même dossier décalés de leur dy */
  const OBS = Array(30).fill('Observation fictive').join(' ') + '.';
  X = await deuxP('D7, quinze lignes, toutes les préconisations', {visite: NOM, lignes: T30, ajouts: aj.slice(0, 5),
    champs: {precos: precosSeules(PRIV_TOUT.concat(PUB_TOUT)), observations: OBS}});
  const fen = id => { const F = FEN2.filter(f => f[0] === id || f[0].indexOf(id + '.') === 0); return [Math.min(...F.map(f => f[1])), Math.max(...F.map(f => f[2]))]; };
  ['privees', 'publiques', 'observations'].forEach(id => {
    const e = page2(X.brut.plan).find(f => f.id === id), [y1, y2] = fen(id);
    const dans = (L, dy) => L.filter(a => a[1] === 2 && yRef(a) !== null && yRef(a) >= y1 + dy - 0.002 && yRef(a) <= y2 + dy + 0.002);
    const att = e ? dans(X.Lc, 0).map(a => decale(a, 0, e.dy)) : [], ec = e ? ecartTol(dans(X.brut.L, e.dy), att) : 'absent du calcul';
    R.ok(OBS.length === 600 && !!e && att.length > 0 && !ec, 'D7, quinze lignes, ' + id + ' : les appels du formulaire, décalés de dy (' + (e ? n3(e.dy) : '?') + ' ; '
      + att.length + ' appels)' + (ec ? ' (' + ec + ')' : ''));
  });
  /* deux dossiers voisins : treize lignes (fin attendue 580,5, une page), quatorze (fin 598, deux pages) ; rangées de 17,5, sans raccord
     ni conformité (conclusion vide : sa ligne des réserves ; bas de la page 2 en 73) */
  const voisin = n => {
    const L = {}; ['wc', 'lavelinge', 'evier', 'sdb', 'cuisine', 'siphon', 'gout_av', 'gout_ar', 'grilles', 'siphon_sol'].slice(0, Math.min(n, 10)).forEach(id => { L[id] = {nb: '1'}; });
    const A = []; for (let i = 1; i <= n - 10; i++) A.push({groupe: 'EU', label: 'Ligne fictive ' + i, nb: '1'});
    return {visite: {nom: 'Nom Fictif', tel: '06 39 98 12 34'}, lignes: L, ajouts: A,
      champs: {demande: '', refCad: '', typePropriete: 'Maison fictive', nbLogements: '', categorieNb: '', precos: precosSeules([])}};
  };
  const fin = X => planEntier(Array.isArray(X.brut.plan) ? page1(X.brut.plan).map(e => e.id) : [], X.som, X.D2);
  const X13 = await une('D7, treize lignes (fin 580,5)', voisin(13)), F13 = fin(X13);
  const X14 = await deuxP('D7, quatorze lignes (fin 598)', voisin(14)), F14 = fin(X14);
  R.ok(F13.fin === 580.5 && F13.une && X13.une && F14.fin > 580.5 && !F14.une && !X14.une, 'D7, deux dossiers voisins : fin attendue 580,5 exactement : une page ; '
    + 'au-delà : deux pages (fins attendues ' + F13.fin + ' et ' + F14.fin + ' ; ' + (X13.une ? 'une' : 'deux') + ' et ' + (X14.une ? 'une' : 'deux') + ' page(s))');
}

/* D4 (DL4) : la marque notée à la signature, d'après l'option de l'étude (« Délesté » : 3 ; « Formulaire complet » ou sans choix : 2) ; un
   constat signé en 3 s'imprime délesté et ne bouge plus quand l'étude change ; « Modifier », puis signer de nouveau, note celle du jour ;
   [p] la fiche qui suit un constat signé en 3 (fichePdfBlob, constat compris) se dessine comme après le même constat en 2 ; le gel
   (constatGeler, à l'ouverture du croquis) ne pose aucune marque. Le gel vient en dernier : ouvrir le croquis crée le document du plan */
async function d4(p){
  const DOS = {visite: NOM, lignes: {wc: {nb: '1', raccord: 'EU_D'}}, champs: {demande: '', refCad: '', typePropriete: '', nbLogements: '', categorieNb: '', soussigne: 'Nom Fictif'}};
  /* geste « Signer » (c-lock, page sur le dossier), date réécrite comme dans preparerT0 ; rend la marque (null sans marque) */
  const signer = () => p.evaluate(async png => {
    const T = window.__VT, v = T.S.visites[0];
    v.constat.sigTech = png; v.constat.sigProp = png;
    await T.ACTIONS['c-lock']();
    if (!v.constat.signeLe) return 'non signé';
    v.constat.signeLe = '2026-11-18T09:30:00.000Z';
    await T.DB.put('visites', v); await T.flushSaves();
    return !v.constat.fige ? 'sans gel' : v.constat.fige.mep === undefined ? null : v.constat.fige.mep;
  }, SIG);
  /* « Modifier » confirmé (comme modifierSigne de dossier.js) */
  const modifier = async () => {
    await p.evaluate(() => { window.__m161 = window.__VT.ACTIONS['c-unlock'](); });
    await p.waitForSelector('#modal-root .modal .m-foot [data-mi="1"]');
    await p.click('#modal-root .modal .m-foot [data-mi="1"]');
    await p.evaluate(async () => { await window.__m161; delete window.__m161; }); await C.pause(p, 400);
  };
  await poser(p, DOS); await C.formeConstat(p, 'deleste');
  const m1 = await signer();
  R.ok(m1 === 3, 'D4 : signé, étude en « Délesté » : marque 3 (' + m1 + ')');
  const X = await deux(p, true);
  verifP1('D4, signé en « Délesté »', X);
  await C.formeConstat(p, 'complet');
  const e1 = ecartEmp(await C.relevePdf(p), X.brut.L);
  R.ok(m1 === 3 && !e1, 'D4 : signé en 3, puis l\'étude passée à « Formulaire complet » : le constat signé ne change pas, appel par appel' + (e1 ? ' (' + e1 + ')' : ''));
  await modifier();
  const nu = await p.evaluate(() => { const c = window.__VT.S.visites[0].constat; return !c.signeLe && !c.fige; });
  const m2 = await signer(), e2 = ecartEmp(await C.relevePdf(p), X.Lc);
  R.ok(nu && m2 === 2 && !e2, 'D4 : « Modifier », puis signé de nouveau, étude en « Formulaire complet » : marque 2, le formulaire du même dossier (' + m2 + ')' + (e2 ? ' (' + e2 + ')' : ''));
  await poser(p, DOS); await C.formeConstat(p, 'complet');
  const m3 = await signer();
  await poser(p, DOS); await C.formeConstat(p, '');
  const m4 = await signer();
  R.ok(m3 === 2 && m4 === 2, 'D4 : dossiers neufs signés, étude en « Formulaire complet » puis sans choix (défaut \'complet\') : marque 2 (' + m3 + ', ' + m4 + ')');
  /* [p] relevé du dossier (o : options de C.relevePdf), la marque de son constat signé mise à m en mémoire le temps du relevé */
  const releveEn = async (m, o) => {
    const a = await p.evaluate(m => { const f = window.__VT.S.visites[0].constat.fige, a = f.mep; f.mep = m; return a === undefined ? null : a; }, m);
    try { return await C.relevePdf(p, o); }
    finally { await p.evaluate(a => { const f = window.__VT.S.visites[0].constat.fige; if (a === null) delete f.mep; else f.mep = a; }, a); }
  };
  /* [p] fiche du dossier, constat signé compris, en marque m ; rend les appels qui suivent le constat, dès la page neuve de la fiche (la
     n-ième, n : pages du constat), pages comptées depuis elle (null sans elle) */
  const ficheApres = async (m, n) => {
    const L = await releveEn(m, {fiche: {constat: true, photos: false}});
    const j = L.map((x, i) => x[0] === 'p' ? i : -1).filter(i => i >= 0)[n - 1];
    if (j === undefined) return null;
    const k = L[j][1] - 1;
    return L.slice(j).map(x => { const b = x.slice(); b[1] = x[1] - k; return b; });
  };
  /* [p] état où le constat signé, en marque m, laisse le document (C.relevePdf avec o.etat : trait, couleurs, police, taille, motif,
     interligne, espacement des lettres, au moment où le PDF est produit), sans sa page ; null sans lui. Les appels de la fiche ne le
     montrent pas : chaque trait de son tableau pose d'abord le sien */
  const etatFin = async m => { const L = await releveEn(m, {etat: true}), z = L[L.length - 1]; return z && z[0] === 'e' ? [z[0]].concat(z.slice(2)) : null; };
  for (const [nom, s] of [['une page', DOS], ['deux pages', avec({champs: {soussigne: 'Nom Fictif'}})], ['refus de visite, sans nom du signataire', avec({statut: 'refus', champs: {soussigne: ''}})]]){
    await poser(p, s); await C.formeConstat(p, 'deleste');
    const m = await signer(), nC = 1 + (await C.relevePdf(p)).filter(a => a[0] === 'p').length;
    const F3 = await ficheApres(3, nC), F2 = await ficheApres(2, 2), e = !F3 || !F2 ? 'page neuve de la fiche introuvable' : ecartEmp(F3, F2);
    R.ok(!e, 'D4 [p], ' + nom + ' : la fiche qui suit le constat en 3 (' + nC + ' page(s) ; signé en ' + m + ') se dessine comme après le même constat en 2, appel par appel'
      + (e ? ' (' + e + ')' : ' (' + F3.length + ' appels)'));
    const E3 = await etatFin(3), E2 = await etatFin(2), ee = !E3 || !E2 ? 'état introuvable' : JSON.stringify(E3) !== JSON.stringify(E2)
      ? 'en 3 : ' + JSON.stringify(E3) + ' ; en 2 : ' + JSON.stringify(E2) : '';
    R.ok(!ee, 'D4 [p], ' + nom + ' : le constat en 3 laisse le document dans l\'état où le laisse le même en 2 (trait, couleurs, police, taille, motif, interligne, '
      + 'espacement' + (ee ? ' ; ' + ee : ' : ' + JSON.stringify(E3)) + ')');
  }
  /* gel : un constat signé sans gel (c.fige retiré), étude en « Délesté », gelé par l'ouverture du croquis : gel posé, sans marque */
  await poser(p, DOS); await C.formeConstat(p, 'deleste');
  await signer();
  await p.evaluate(async () => { const T = window.__VT, v = T.S.visites[0]; delete v.constat.fige; await T.DB.put('visites', v); await T.flushSaves(); });
  let faute = '';
  try { await C.ouvrirCroquis(p, {fond: false}); await C.fermerCroquis(p); } catch (e){ faute = String(e && e.message || e).split('\n')[0].slice(0, 120); }
  const g = await p.evaluate(() => { const c = window.__VT.S.visites[0].constat; return {signe: !!c.signeLe, fige: !!c.fige, mep: !!c.fige && 'mep' in c.fige}; });
  R.ok(!faute && g.signe && g.fige && !g.mep, 'D4 : un constat signé sans gel, étude en « Délesté », gelé à l\'ouverture du croquis (constatGeler) : gel posé, sans marque ('
    + JSON.stringify(g) + (faute ? ' ; ' + faute : '') + ')');
}

async function casD(){
  const A = await C.ouvrir({fuseau: 'Europe/Paris'}), p = A.p;
  try {
    await C.etudeEtDossier(p);
    await d1(p);
    await d2(p);
    await d3(p);
    await d5(p);
    await d6(p);
    await d9(p);
    await d13(p);
    await d8(p);
    await d10(p);
    await d11(p);
    await d12(p);
    await d7(p);
    await d4(p);
    R.ok(!A.erreurs.length, 'D1 à D13, D4 et D7 compris : aucune erreur de la page (' + A.erreurs.slice(0, 2).join(' ; ').slice(0, 200) + ')');
  } finally { await A.fermer(); }
}

(async () => {
  try {
    await t0();
    if (!RELEVER) await casD();
  } catch (e){ R.ok(false, 'exception : ' + String(e && e.message || e).split('\n')[0].slice(0, 300)); }
  R.fin();
})();
