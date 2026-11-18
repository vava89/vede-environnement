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
// g1 : deux « Bidet » (l'un entouré d'espaces) et un « bidet » reliés à la boîte EU : une ligne « Bidet » (clé autre:EU:bidet),
//   nb 3, raccordement EU_D, conforme « oui », aucune ligne du formulaire ; « bidet » dessiné d'abord : libellé « bidet » (premier objet).
// g1 bis : « Climatisation » en EU et en EP : deux lignes (autre:EU:… et autre:EP:…), chacune jugée sur son réseau (EU_D « oui », EP_D
//   « oui ») ; les deux reliées à la boîte EU : l'EU « oui », l'EP « non ».
// g2 : « Urinoir » de row « wc » : ligne « WC » 1, types ["Urinoir"] ; avec un WC : 2, ["WC","Urinoir"] ; relié à la boîte EP, son
//   anomalie « Urinoir : rejet au réseau EP » va sur l'installation « wc » (VCroquis.reconcilier) ; row d'un autre groupe (gout_av,
//   grilles), inconnu (zz, 12) ou nom d'une propriété des objets du langage (constructor, toString) : ignoré (« Bidet ») ;
//   « Avaloir de terrasse » de row « grilles » : ligne « Grilles », types ["Avaloir de terrasse"] ; de row « wc » : « Autres ».
// g3 : sans nom (absent, '', blancs, 12, null) : une ligne « Autre appareil » (EU) et une « Autre ouvrage EP » (EP) ;
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
//   textes du refus de « Douche italienne » et de « Puits perdu » ; un nom refusé venu d'un fichier est lu tel quel (« Douche
//   italienne »).
// g8 : 200 croquis du générateur avec des génériques (option sources, D10 ; nom, abréviation et ligne tirés d'une suite à part) :
//   la moitié au moins des génériques analysés (une source a un résultat, reliée ou non : seuls ceux « Projet » de l'état des lieux n'en
//   ont pas) ; aucune exception (analyse, anomalies, conclusion, constat, étiquettes, DXF), aucun « undefined » ; chaque générique compté sur une
//   ligne et une seule, celle de son row valide ou sa ligne « Autres » ; ni ses textes ni sa ligne ne disent « Autre destination ».
// g1 à g8 échouent sur 9ad0840 (type inconnu : aucune ligne, aucun contrôle, aucune étiquette, aucun générique analysé ; VCroquis.abObj
// et nomRefuse absentes) ; la première version de m132 acceptait les trois noms à signes typographiques de g7 (relecture, M1).
// m133, autres appareils (2e partie) :
// g9 (M2 de la relecture de m132) : « Bidet », « Bidet suspendu », un urinoir compté en WC (row « wc »), une chaudière et un « Avaloir de
//   terrasse », reliés à la boîte EU ; anomalies saisies dans le croquis sur le bidet suspendu, l'urinoir et la chaudière.
//   VCroquis.reconcilier n'écrit aucune installation pour un générique compté en « Autres » (création : vide, comme avant ; l'urinoir sur
//   « wc ») ; rangées ensuite par l'application (identifiants fictifs du constat), la synchro suivante n'y touche pas, et ops.autres nomme
//   la ligne déduite de chacune (« autre:EU:bidet suspendu », « autre:EP:avaloir de terrasse » et, depuis m143, « autre:Chaudière
//   (purge, condensat) »), rien pour l'urinoir ;
//   bidet suspendu compté en WC : l'anomalie va sur « wc », sans ops.autres ; revenu en « Autres » : la ligne « wc » notée revient à
//   vide, ops.autres nomme la ligne, la synchro suivante ne change rien (M1 de la relecture de m133) ; témoin : une installation
//   retouchée à la main (« evier ») reste, et ops.autres nomme aussi sa ligne.
// g10 : VCroquis.NOMS_AUTRES, les noms proposés par la fiche, sont ceux du cadrage, dans cet ordre (Bidet… Piscine (vidange) en EU ;
//   Évacuation de balcon, Avaloir de terrasse, Cour anglaise en EP) ; nomRefuse n'en refuse aucun.
// g9 et g10 échouent sur 53fe487 (la synchro remet l'installation à vide, ops.autres absent, NOMS_AUTRES absent) ; y passent la création,
// le bidet compté en WC, la ligne retouchée du témoin de g9 et « aucun nom refusé » de g10. Le retour en « Autres » échoue avant la
// relecture de m133 (l'anomalie reste sur la ligne « wc »).
// m134, étiquette commune (souhait 8 ; décision D6) : p.etiqAvec (id du porteur) sur chaque membre, p.etiqTitre ('sdb', 'eau', 'cuisine',
// 'buanderie', 'aucun') sur le porteur. Un membre compte si son lien est un texte autre que son id, si le porteur est un objet analysé
// (an.objs) sans lien et du même statut, et si les deux sont des sources EU ; sans analyse, chacun garde son étiquette.
// VCroquis.groupeEtiquette(e, an) : {porteur, objets} (porteur en tête, puis les membres dans l'ordre de l'étiquette, puis l'id ; m141)
// ou null.
// c1 : douche porteur, lavabo et WC + lave-mains au 1er étage : « Salle de bain (1er étage) » puis « douche, lavabo, WC + lave-mains »,
//   membres sans étiquette (ordre de l'étiquette depuis m141 ; avant : « douche, WC + lave-mains, lavabo », ordre du catalogue de la
//   palette) ; titres « sdb », « eau », « cuisine », « buanderie » ; titre d'office (« Salle de bain » avec
//   une douche, une baignoire ou une salle de bain, sinon aucun) pour '', 'zz', 'constructor', 'toString', 3 et null ; « aucun » : une
//   ligne, le niveau à la fin ; un nom égal au titre n'est pas répété (porteur ou membre), une fois seulement : deux salles de bain, deux
//   cuisines, une salle de bain et un autre appareil nommé « Salle de bain » gardent le second ; il reste avec « aucun » ; « Cuisine »
//   puis « évier, lave-vaisselle » ; ordre et minuscules (« Lave-linge, urinoir, bidet, PAC » : ordre de l'étiquette, puis id ; sigle gardé) ;
//   porteur WC sans niveau : « Lavabo, WC » (m141 ; avant : « WC, lavabo ») ; une baignoire : « baignoire, lavabo » (avant : « lavabo,
//   baignoire ») ; l'étiquette personnalisée du porteur l'emporte et ses membres restent vides ; l'ordre du croquis ne change
//   rien ; à l'écran, au plan PDF et au DXF, les deux lignes une fois chacune, aucune étiquette d'un membre ; au plan PDF, la liste sous
//   le titre.
// c2 : un membre à étiquette personnalisée : texte vide ; VCroquis.obstaclesPlan : trois symboles et la seule étiquette du porteur (4
//   boîtes, 6 sans groupe), boîte de deux lignes ; porteur retiré : chacun son étiquette, « Lavabo du haut » revient ; à l'écran, au plan
//   PDF et au DXF, ni « Lavabo du haut », ni étiquette d'un membre.
// c3 (témoins) : étiquette propre de chacun pour un membre ou un porteur « Projet » (avant-projet), un membre « À supprimer » (état des
//   lieux), un membre ou un porteur EP (descente, siphon de sol, grille, autre ouvrage EP), un porteur boîte, absent, d'un type inconnu ou
//   lié (même à lui-même), un lien vers soi, vide, en nombre, 'toString', 'constructor', '__proto__', un membre d'un type inconnu ; chaîne
//   (lavabo lié au WC, WC lié à la douche) : le WC rejoint la douche, le lavabo garde son étiquette ; statut absent : « existant » [p] ;
//   sans analyse : chacun son étiquette.
// c4 : groupe « Projet » : défait en état des lieux (trois « Projet : … », aussi à l'écran et au DXF), formé en avant-projet (« Projet : »
//   et le texte commun, aussi au plan PDF) ; groupe « À supprimer » : formé en état des lieux, sans préfixe ; défait en avant-projet.
// c5 : niveaux différents : après chaque nom, rien sur le titre ; le nom égal au titre reste, avec son niveau [p] ; sans titre ; quatre
//   appareils : leurs noms ; cinq : leurs lettres (« Do, Ba, La, Év, WC » ; avant m141 : « Do, WC, La, Ba, Év »), de même à niveaux
//   différents ; cinq objets dont une salle de bain : quatre noms [p] ; six sans titre : lettres, nom du siphon de garage (sans lettres),
//   « ? » d'un autre appareil sans nom [p] ; « Projet : Lavabo, WC (1er étage) » en avant-projet.
// c6 (garde) : croquis témoin (douche, lavabo, WC + lave-mains et évier, boîtes EP et EU, deux anomalies) avec et sans liens : analyse,
//   textes et constat (sorties de vm/compat.js), plan PDF aux étiquettes masquées et page 2 du plan PDF identiques ; DXF identique hors
//   les TEXT des étiquettes du groupe ; à l'écran, un trait de rappel par étiquette, celui du porteur seul avec les liens.
// c7 : 250 croquis du générateur (option champs ; sources EU seules une graine sur quatre) : aucune exception, aucun « undefined » ;
//   membres vides, porteur non vide ; même texte dans l'ordre inverse du croquis ; sorties et DXF hors étiquettes égaux à ceux du croquis
//   sans liens ; plus de 50 porteurs, des textes sur deux lignes et des groupes de plus de quatre.
// c1 à c7 échouent sur 344c7b2 (54 cas : aucun groupe, VCroquis.groupeEtiquette et obstaclesPlan absentes) ; y passent les témoins de c3
// (sauf la chaîne et le statut absent), les groupes défaits de c4, les gardes de c6 (sorties, anomalies, plan PDF masqué, page 2),
// l'étiquette personnalisée et l'ordre de c1, le porteur retiré de c2. Les trois cas d'un second nom égal au titre échouent aussi avant la
// relecture de m134 (les deux noms omis : « Salle de bain (1er étage) » seul).
// m135, étiquette commune (2e partie : mode « Réunir » et fiches ; D7 ; e3 de navigateur/equipements.js) :
// c9 : VCroquis.delierPorteur(doc, id) retire les liens vers le porteur id (clé etiqAvec supprimée, jamais une valeur vide), liens
//   périmés compris (descente EP liée), et rend les objets déliés ; VCroquis.ops.supprimerElement(doc, id) d'un porteur les délie de même
//   et les rend : lavabo et WC reprennent leur étiquette propre, le membre d'un autre groupe garde son lien ; membre supprimé : rien de
//   délié, le groupe garde les autres ; id absent : rien de rendu, croquis inchangé ; delierPorteur sans croquis : rien, aucune exception.
// c9 échoue sur 82f9ae2 (delierPorteur absente ; supprimerElement ne rend rien et laisse les liens).
// m141, ordre de l'étiquette commune (réponse ordre-etiquette-commune du 16 nov. 2026, choix b ; décision D7 de
// `.claude/conception-v172.md`) : la liste suit l'ordre de l'étiquette, porteur compris (salle de bain, douche, baignoire, lavabo, évier,
// WC, cuisine, lave-vaisselle, lave-linge, chaudière, siphon de garage, attente, autre appareil ; à égalité, l'id) ; le porteur reste en
// tête de groupeEtiquette (titre, fiches).
// c10 : douche, lavabo et WC + lave-mains au 1er étage, quel que soit le porteur : « Salle de bain (1er étage) » puis « douche, lavabo,
//   WC + lave-mains » (avant : « lavabo, WC + lave-mains, douche » pour le lavabo porteur, « WC + lave-mains, lavabo, douche » pour le
//   WC) ; groupeEtiquette du WC porteur, ou d'un membre : porteur « W », objets W, D, L ; le titre est lu sur le porteur (« eau » du WC :
//   « Salle d'eau (1er étage) » ; un titre « cuisine » laissé sur la douche membre, fichier fait à la main : ignoré) ; l'ordre du croquis
//   ne change rien ; à l'écran, au plan PDF et au DXF ; évier et lave-vaisselle, porteur lave-vaisselle : « Évier, lave-vaisselle »
//   (avant : « Lave-vaisselle, évier »), titre « cuisine » : « Cuisine » puis « évier, lave-vaisselle » ; à égalité de type, l'id, porteur
//   compris (« douche, WC, WC + lave-mains » sous le WC + lave-mains « Wb ») ; les treize types, ids à rebours de l'ordre, titre « aucun »,
//   porteur « autre appareil » : « SdB, Do, Ba, La, Év, WC, Cu, LV, LL, Ch, siphon de garage, At, ? » ; deux types d'essai, absents de
//   l'ordre (mis au catalogue de ce test seulement, puis retirés), avec une douche et un autre appareil, sous la douche porteur puis sous
//   un type d'essai : « Salle de bain » puis « douche, autre appareil, essai B, essai A » (après l'autre appareil ; l'id les départage).
// c10 échoue sur 5549078 (ordre du catalogue de la palette, porteur en tête : 15 de ses 16 cas ; y passent les types d'essai sous la
// douche porteur : l'ordre du catalogue avait le même repli, après la liste, puis l'id) ; de même 33 cas de c1, c2, c4, c5 et c6, aux
// attentes changées (avant : « douche, WC + lave-mains, lavabo », « lavabo, baignoire », « WC, lavabo », « douche (1er étage), WC,
// lavabo (RDC) », « douche, WC, lavabo, baignoire », « Do, WC, La, Ba, Év », « WC, lavabo, douche, baignoire », « LL, WC, La, Év,
// siphon de garage, ? », « douche, WC + lave-mains, lavabo, évier »).
// m143, anomalies de toute ligne « Autres » (réponse rangement-autres-par-texte du 16 nov. 2026, choix b ; décision D9 de
// `.claude/conception-v172.md`) : VCroquis.reconcilier nomme dans ops.autres la ligne « Autres » du croquis où est compté l'objet de
// l'anomalie, quelle qu'elle soit, et non plus celle d'un autre appareil seulement.
// g11 : chaudière et attente reliées à un puisard, point « Drain », siphon de cour et trop-plein reliés à la boîte EU, drain de collecte
//   vers un regard puis la boîte EU ; témoins : un WC et un « Bidet » (m133) reliés au puisard. Création : installation et auto vides, le
//   WC sur « wc » ; synchro suivante : ops.autres nomme « autre:Chaudière (purge, condensat) », « autre:Attente », « autre:Drain » (deux
//   fois), « autre:Siphon de cour », « autre:Trop-plein » et « autre:EU:bidet », rien pour le WC, rien n'est écrit ; rangées par
//   l'application, la synchro suivante n'y touche pas ; « Aucune » choisie à la main gardée ; WC changé en chaudière : la ligne « wc »
//   notée revient à vide, ops.autres nomme la ligne de la chaudière, puis rien ne change.
// g11 échoue sur f71a6e7 (12 de ses 14 cas : ops.autres sans ces lignes, installations ramenées à vide à la synchro suivante ; y passent
// la création et la synchro suivante sans écriture) ; de même le cas de g9 dont le résultat attendu change (rien pour la chaudière).
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
   croquis lui-même commencent par « x », pour ne pas prendre l'identifiant d'un tracé d'objet (un objet 'U' a le tracé 'tU') ; plus
   (facultatif, m143) : {o, l}, objets et tracés ajoutés tels quels, au format de doc() */
function deuxReseaux(objs, plus){
  return doc({o: objs.map(([id, t, p], i) => [id, t, 3 * i - 6, 9, p || {}]).concat([['Bu', 'boite', 0, 2, {res: 'EU'}], ['Rp', 'regard_pub', 0, -2, {res: 'EU'}],
    ['Bp', 'boite', 30, 2, {res: 'EP'}], ['Rq', 'regard_pub', 30, -2, {res: 'EP'}]], plus && plus.o || []),
    l: objs.map(([id, , , vers]) => ['t' + id, 'tr', '', '', [id, vers]]).concat([['xBu', 'tr', '', '', ['Bu', 'Rp']], ['xBp', 'tr', '', '', ['Bp', 'Rq']],
      ['xC1', 'col', 'EU', '', [[-6, -2], 'Rp', [12, -2]]], ['xC2', 'col', 'EP', '', [[24, -2], 'Rq', [40, -2]]]], plus && plus.l || [])});
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
    'g1 deux « Bidet » et un « bidet » : une ligne « Bidet » (autre:EU:bidet), nb 3, EU_D, « oui », aucune ligne du formulaire (obtenu ' + vueRows(cd) + ')');
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
    + rows.join(', ') + ') : ignoré, « Bidet » ×' + rows.length + ' (obtenu ' + vueRows(c3) + ')');
  const c4 = constatDe(deuxReseaux([['A', 'autre_ep', {nom: 'Avaloir de terrasse', row: 'grilles'}, 'Bp'], ['A2', 'autre_ep', {nom: 'Avaloir de terrasse', row: 'wc'}, 'Bp']])), g = rowDe(c4, 'grilles');
  R.ok(g.nb === 1 && JSON.stringify(g.types) === '["Avaloir de terrasse"]' && rowDe(c4, 'autre:EP:avaloir de terrasse').nb === 1 && rowDe(c4, 'wc').nb === 0,
    'g2 « Avaloir de terrasse » de row « grilles » : ligne « Grilles » ; de row « wc » (groupe EU) : « Autres » (obtenu ' + vueRows(c4) + ')');
}
/* g3 : sans nom ; contrôle « nom à indiquer » ; nom coupé à 40 caractères */
function g3(){
  const sans = [['A0', {}], ['A1', {nom: ''}], ['A2', {nom: '   '}], ['A3', {nom: 12}], ['A4', {nom: null}]];
  const d = deuxReseaux(sans.map(([id, p]) => [id, 'autre_eu', p, 'Bu']).concat([['P0', 'autre_ep', {}, 'Bp'], ['P1', 'autre_ep', {nom: ' '}, 'Bp']])), cd = constatDe(d);
  const e = rowDe(cd, 'autre:EU:autre appareil'), p = rowDe(cd, 'autre:EP:autre ouvrage ep'), aut = typeof cd === 'string' ? [] : cd.rows.filter(x => !x.std && x.nb);
  R.ok(aut.length === 2 && e.nb === 5 && e.label === 'Autre appareil' && p.nb === 2 && p.label === 'Autre ouvrage EP', 'g3 sans nom : « Autre appareil » ×5 et « Autre ouvrage EP » ×2 (obtenu '
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
  R.ok(libDe(elDe(d, 'G')) === 'Douche italienne' && rowDe(cd, 'autre:EU:douche italienne').nb === 1 && rowDe(cd, 'sdb').nb === 0, 'g7 nom refusé venu d\'un fichier : lu tel quel, « '
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

/* g9 (m133, M2) : anomalie d'un générique compté en « Autres ». VCroquis.reconcilier ne connaît pas l'identifiant de la ligne « Autres » du
   constat (l'application le donne, vcApparier) : il nomme la ligne déduite dans ops.autres et n'écrit rien dans installation, sauf pour
   ramener à vide une ligne du formulaire qu'il y avait notée (relecture de m133, M1 : sans constat, l'application ne range rien) ; depuis
   m143, de même pour la chaudière (ligne « Autres » du croquis, comme toute autre) */
function g9(){
  const d = deuxReseaux([['G1', 'autre_eu', {nom: 'Bidet'}, 'Bu'], ['G2', 'autre_eu', {nom: 'Bidet suspendu'}, 'Bu'], ['U', 'autre_eu', {nom: 'Urinoir', row: 'wc'}, 'Bu'],
    ['K', 'chaudiere', {}, 'Bu'], ['P', 'autre_ep', {nom: 'Avaloir de terrasse'}, 'Bu']]);
  d.anomManu = [['M1', 'G2', 'Bidet suspendu : fuite au raccord'], ['M2', 'U', 'Urinoir : fuite au raccord'], ['M3', 'K', 'Chaudière : fuite au raccord']]
    .map(([id, objId, obs]) => ({id, objId, reseau: 'EU', obs: obs + ' (anomalie fictive)', preco: '', nc: true, st: 'retenue'}));
  const ext = [], rec = cle => ext.find(r => r.croquis && r.croquis.cle === cle) || {}, pt = id => d.el.find(e => e.id === id);
  let k = 0, ops = null;
  const synchro = () => { ops = V.reconcilier(d, null, ext);
    ops.retirer.forEach(id => { const i = ext.findIndex(r => r.id === id); if (i >= 0) ext.splice(i, 1); });
    ops.maj.forEach(m => { const r = ext.find(x => x.id === m.id); if (r) Object.assign(r, m.champs); });
    ops.creer.forEach(c => { ext.push(Object.assign({id: c.id || ('r' + (++k)), createdAt: c.createdAt || '2026-11-02'}, c)); }); return ops; };
  const vu = cle => { const r = rec(cle); return JSON.stringify([r.installation, r.croquis && r.croquis.auto && r.croquis.auto.installation]); };
  const autres = () => ops && ops.autres && typeof ops.autres === 'object' ? ops.autres : null;
  const majInst = () => (ops.maj || []).filter(m => m.champs && m.champs.installation !== undefined).map(m => ext.find(r => r.id === m.id).croquis.cle + ' → ' + JSON.stringify(m.champs.installation));
  synchro();
  /* création : rien d'écrit pour les génériques comptés en « Autres » (garde : comme avant) ; l'urinoir de row « wc » sur « wc » */
  R.ok(vu('M1') === '["",""]' && vu('ep-eu:P') === '["",""]' && vu('M2') === '["wc","wc"]' && vu('M3') === '["",""]', 'g9 création : « Bidet suspendu » et « Avaloir de terrasse » '
    + 'sans ligne (installation et auto vides), « Urinoir » de row « wc » sur « wc », chaudière sans ligne (obtenu ' + ['M1', 'ep-eu:P', 'M2', 'M3'].map(vu).join(' ') + ')');
  /* l'application range les deux premières sur leur ligne « Autres » (identifiants fictifs du constat) : la synchro suivante n'y touche pas */
  for (const [cle, li] of [['M1', 'c1'], ['ep-eu:P', 'c2']]){ const r = rec(cle); r.installation = li; r.croquis = Object.assign({}, r.croquis, {auto: Object.assign({}, r.croquis.auto, {installation: li})}); }
  synchro();
  const a1 = autres();
  R.ok(!majInst().length && !ops.maj.length && !ops.creer.length && !ops.retirer.length, 'g9 rangées par l\'application : la synchro suivante ne change rien (obtenu '
    + JSON.stringify({maj: majInst(), nMaj: ops.maj.length, creer: ops.creer.length, retirer: ops.retirer.length}) + ')');
  /* m143 : la chaudière, comptée sur sa ligne « Autres », est nommée elle aussi (avant : rien) */
  R.ok(!!a1 && a1[rec('M1').id] === 'autre:EU:bidet suspendu' && a1[rec('ep-eu:P').id] === 'autre:EP:avaloir de terrasse'
    && a1[rec('M3').id] === 'autre:Chaudière (purge, condensat)' && Object.keys(a1).length === 3,
    'g9 ops.autres : « autre:EU:bidet suspendu », « autre:EP:avaloir de terrasse » et « autre:Chaudière (purge, condensat) » (m143 ; v1.7.1 : rien '
    + 'pour la chaudière), rien pour l\'urinoir (wc) (obtenu ' + JSON.stringify(a1) + ')');
  /* le générique passe sur la ligne « WC » (row) : l'anomalie suit, sans ops.autres ; puis revient en « Autres », synchro sans constat ni
     application (relecture de m133, M1) : la ligne « wc », notée par le croquis, revient à vide, comme avant m133 (sinon la ligne WC
     garderait l'anomalie d'un appareil qu'elle ne compte plus), et ops.autres la nomme ; la synchro suivante ne change plus rien */
  pt('G2').p.row = 'wc'; synchro();
  const a2 = autres() || {};
  R.ok(vu('M1') === '["wc","wc"]' && !(rec('M1').id in a2), 'g9 « Bidet suspendu » compté en WC : l\'anomalie va sur « wc », sans ops.autres (obtenu ' + vu('M1') + ' ' + JSON.stringify(a2) + ')');
  pt('G2').p.row = ''; synchro();
  const a3 = autres() || {}, m3 = majInst();
  R.ok(vu('M1') === '["",""]' && m3.length === 1 && m3[0] === 'M1 → ""' && a3[rec('M1').id] === 'autre:EU:bidet suspendu', 'g9 revenu en « Autres » : la ligne « wc » '
    + 'notée revient à vide, ops.autres « autre:EU:bidet suspendu » (obtenu ' + vu('M1') + ' ' + JSON.stringify(m3) + ' ' + JSON.stringify(a3) + ')');
  synchro();
  R.ok(vu('M1') === '["",""]' && !majInst().length && (autres() || {})[rec('M1').id] === 'autre:EU:bidet suspendu', 'g9 revenu en « Autres », synchro suivante : '
    + 'rien ne change (obtenu ' + vu('M1') + ' ' + JSON.stringify(majInst()) + ')');
  /* témoin : l'urinoir revient en « Autres » alors que le technicien a mis son anomalie sur une autre ligne (« evier ») que celle notée par
     le croquis (« wc ») : sa ligne reste (garde, comme avant m133) ; ops.autres la nomme quand même, l'application vérifie la retouche */
  const W = rec('M2'); W.installation = 'evier'; pt('U').p.row = ''; synchro();
  R.ok(rec('M2').installation === 'evier' && !majInst().length, 'g9 témoin : ligne retouchée (« evier ») gardée (obtenu ' + vu('M2') + ')');
  R.ok((autres() || {})[W.id] === 'autre:EU:urinoir', 'g9 témoin : ops.autres nomme aussi l\'anomalie retouchée (« autre:EU:urinoir ») (obtenu ' + JSON.stringify(autres()) + ')');
}

/* g10 (m133) : noms proposés par la fiche (VCroquis.NOMS_AUTRES) : ceux du cadrage, dans cet ordre ; aucun n'est refusé par la fiche */
function g10(){
  const N = V.NOMS_AUTRES || null, att = {EU: ['Bidet', 'Urinoir', 'Ballon d\'eau chaude', 'Fontaine', 'Climatisation (condensats)', 'Adoucisseur', 'Piscine (vidange)'],
    EP: ['Évacuation de balcon', 'Avaloir de terrasse', 'Cour anglaise']};
  R.ok(JSON.stringify(N) === JSON.stringify(att), 'g10 noms proposés : ' + att.EU.join(', ') + ' (EU) ; ' + att.EP.join(', ') + ' (EP) (obtenu ' + JSON.stringify(N) + ')');
  const mal = [].concat(att.EU, att.EP).filter(n => nomRefuse(n) !== '');
  R.ok(!mal.length, 'g10 aucun nom proposé n\'est refusé (nomRefuse)' + (mal.length ? ' (refusés : ' + JSON.stringify(mal.map(n => [n, nomRefuse(n)])) + ')' : ''));
}

/* g11 (m143 ; décision D9 de `.claude/conception-v172.md`, réponse rangement-autres-par-texte du 16 nov. 2026, choix b) : l'anomalie de
   tout objet compté sur une ligne « Autres » du croquis, et non plus du seul autre appareil (m133), est rangée d'après son objet :
   VCroquis.reconcilier nomme sa ligne dans ops.autres (l'application l'y range, vcRangerAutres). Chaudière et attente reliées à un
   puisard, point « Drain », siphon de cour et trop-plein reliés à la boîte EU, drain de collecte vers un regard puis la boîte EU ;
   témoins : un WC (ligne « wc » du formulaire) et un autre appareil « Bidet » (m133), reliés au puisard */
function g11(){
  const d = deuxReseaux([['K', 'chaudiere', {}, 'Pu'], ['A', 'attente', {}, 'Pu'], ['D', 'drain', {}, 'Bu'], ['S', 'siphon_cour', {}, 'Bu'], ['TP', 'tropplein', {}, 'Bu'],
    ['W', 'wc', {}, 'Pu'], ['G', 'autre_eu', {nom: 'Bidet'}, 'Pu']], {o: [['Pu', 'puisard', -20, 9, {}], ['Rg', 'regard', 10, 20, {}]],
    l: [['xDC', 'tr', 'EP', '', [[0, 20], 'Rg'], 0, {drain: 'collecte', meth: ['eau']}], ['xRg', 'tr', 'EU', '', ['Rg', 'Bu']]]});
  const ext = [], rec = cle => ext.find(r => r.croquis && r.croquis.cle === cle) || {}, pt = id => d.el.find(e => e.id === id);
  let k = 0, ops = null;
  const synchro = () => { ops = V.reconcilier(d, null, ext);
    ops.retirer.forEach(id => { const i = ext.findIndex(r => r.id === id); if (i >= 0) ext.splice(i, 1); });
    ops.maj.forEach(m => { const r = ext.find(x => x.id === m.id); if (r) Object.assign(r, m.champs); });
    ops.creer.forEach(c => { ext.push(Object.assign({id: c.id || ('r' + (++k)), createdAt: c.createdAt || '2026-11-02'}, c)); }); return ops; };
  const vu = cle => { const r = rec(cle); return JSON.stringify([r.installation, r.croquis && r.croquis.auto && r.croquis.auto.installation]); };
  const autres = () => ops && ops.autres && typeof ops.autres === 'object' ? ops.autres : {};
  const majInst = () => (ops.maj || []).filter(m => m.champs && m.champs.installation !== undefined).map(m => ext.find(r => r.id === m.id).croquis.cle + ' → ' + JSON.stringify(m.champs.installation));
  const bilan = () => JSON.stringify({maj: majInst(), nMaj: ops.maj.length, creer: ops.creer.length, retirer: ops.retirer.length});
  const CH = 'autre:Chaudière (purge, condensat)', ATT = [['eu-inf:K', CH, 'chaudière'], ['eu-inf:A', 'autre:Attente', 'attente'], ['ep-eu:D', 'autre:Drain', 'point « Drain »'],
    ['ep-eu:xDC', 'autre:Drain', 'drain de collecte compté'], ['ep-eu:S', 'autre:Siphon de cour', 'siphon de cour'], ['ep-eu:TP', 'autre:Trop-plein', 'trop-plein']];
  synchro();
  /* création : comme avant, installation et auto vides (l'application ne range qu'avec le constat) ; le WC sur « wc » */
  const c0 = ATT.concat([['eu-inf:G']]).map(([cle]) => cle + ' ' + vu(cle));
  R.ok(ATT.every(([cle]) => !!rec(cle).id) && c0.every(v => / \["",""\]$/.test(v)) && vu('eu-inf:W') === '["wc","wc"]', 'g11 création : les six anomalies et celle du bidet '
    + 'sans ligne (installation et auto vides), le WC sur « wc » (obtenu ' + c0.join(' ; ') + ' ; eu-inf:W ' + vu('eu-inf:W') + ')');
  /* synchro suivante, sans application : ops.autres nomme la ligne de chacune, rien n'est écrit */
  synchro();
  const a1 = autres();
  for (const [cle, li, nom] of ATT) R.ok(!!rec(cle).id && a1[rec(cle).id] === li, 'g11 ' + nom + ' : ops.autres nomme la ligne « ' + li + ' » (v1.7.1 : rien ; obtenu '
    + JSON.stringify(a1[rec(cle).id]) + ')');
  R.ok(!ops.maj.length && !ops.creer.length && !ops.retirer.length, 'g11 synchro suivante : rien n\'est écrit (obtenu ' + bilan() + ')');
  R.ok(a1[rec('eu-inf:G').id] === 'autre:EU:bidet' && !(rec('eu-inf:W').id in a1) && Object.keys(a1).length === ATT.length + 1, 'g11 témoins : le bidet (m133) '
    + '« autre:EU:bidet », rien pour le WC (obtenu ' + JSON.stringify(a1) + ')');
  /* l'application range chacune sur la ligne liée (identifiants fictifs du constat) : la synchro suivante n'y touche pas (v1.7.1 : elle
     les ramenait à vide, rangement par le texte) et ops.autres les nomme encore */
  ATT.forEach(([cle], i) => { const r = rec(cle), li = 'c' + (i + 1); r.installation = li; r.croquis = Object.assign({}, r.croquis, {auto: Object.assign({}, r.croquis.auto, {installation: li})}); });
  synchro();
  const a2 = autres();
  R.ok(!majInst().length && !ops.maj.length && !ops.creer.length && !ops.retirer.length, 'g11 rangées par l\'application : la synchro suivante ne change rien (v1.7.1 : '
    + 'installation ramenée à vide ; obtenu ' + bilan() + ')');
  R.ok(ATT.every(([cle, li], i) => a2[rec(cle).id] === li && rec(cle).installation === 'c' + (i + 1)), 'g11 rangées : ops.autres les nomme encore, installations gardées (obtenu '
    + JSON.stringify(ATT.map(([cle]) => [cle, rec(cle).installation, a2[rec(cle).id]])) + ')');
  /* ligne choisie à la main (« Aucune ») : gardée ; ops.autres la nomme quand même, l'application voit la retouche (vcAutreSuit) */
  rec('eu-inf:A').installation = 'aucune'; synchro();
  R.ok(rec('eu-inf:A').installation === 'aucune' && !majInst().length && autres()[rec('eu-inf:A').id] === 'autre:Attente', 'g11 ligne choisie à la main (« Aucune ») gardée, '
    + 'ops.autres la nomme (obtenu ' + vu('eu-inf:A') + ' ' + JSON.stringify(majInst()) + ' ' + JSON.stringify(autres()[rec('eu-inf:A').id]) + ')');
  /* WC changé en chaudière : la ligne « wc » notée revient à vide (l'anomalie n'y reste pas en attendant l'application), ops.autres nomme
     la ligne de la chaudière (v1.7.1 : vide, sans ops.autres) ; la synchro suivante ne change plus rien */
  pt('W').t = 'chaudiere'; synchro();
  const m5 = majInst(), a5 = autres();
  R.ok(vu('eu-inf:W') === '["",""]' && m5.length === 1 && m5[0] === 'eu-inf:W → ""' && a5[rec('eu-inf:W').id] === CH, 'g11 WC changé en chaudière : la ligne « wc » '
    + 'notée revient à vide, ops.autres « ' + CH + ' » (obtenu ' + vu('eu-inf:W') + ' ' + JSON.stringify(m5) + ' ' + JSON.stringify(a5[rec('eu-inf:W').id]) + ')');
  synchro();
  R.ok(vu('eu-inf:W') === '["",""]' && !majInst().length && autres()[rec('eu-inf:W').id] === CH, 'g11 WC changé en chaudière, synchro suivante : rien ne change (obtenu '
    + vu('eu-inf:W') + ' ' + JSON.stringify(majInst()) + ')');
}
/* m134 : étiquette commune (souhait 8 ; D1 et D6). Membre : p.etiqAvec, l'id du porteur ; porteur : p.etiqTitre ('sdb', 'eau', 'cuisine',
   'buanderie', 'aucun' ; sinon, titre d'office). VCroquis.groupeEtiquette(e, an) : null pour un objet seul ; VCroquis.obstaclesPlan :
   encombrement du plan (symboles, étiquettes posées, tracés) */
const N1 = {niv: 'etage', etage: '1'}, SDB = 'Salle de bain (1er étage)\ndouche, lavabo, WC + lave-mains';
/* douche D (porteur), lavabo L et WC + lave-mains W (membres), au 1er étage ; st : statut des trois ; plus : propriétés en plus, par id */
function salleDeBain(st, plus){
  const p = (id, q) => Object.assign({}, N1, st ? {st} : {}, q, (plus || {})[id]);
  return rangee([['D', 'douche', p('D', {})], ['L', 'lavabo', p('L', {etiqAvec: 'D'})], ['W', 'wc', p('W', {etiqAvec: 'D', lm: 'oui'})]]);
}
/* étiquettes de tous les objets d'un croquis dans un mode, {id: texte} ; l'objet vient du croquis, l'analyse d'une copie (comme la fiche,
   qui passe une copie de l'objet) */
const etiquettesDe = (d, mode) => { const an = V.analyser(copie(d), mode || 'edl'), o = {}; d.el.forEach(e => { o[e.id] = sur(() => V.texteEtiquette(e, an)); }); return o; };
/* le même croquis sans étiquette commune (etiqAvec et etiqTitre retirés) */
const sansLiens = d => { const c = copie(d); c.el.forEach(e => { if (e.p){ delete e.p.etiqAvec; delete e.p.etiqTitre; } }); return c; };
const js = x => JSON.stringify(x);
/* copie dont les étiquettes sont placées d'office (lab null), comme troisRendus */
const ouvert = d => { const c = copie(d); c.el.forEach(o => { o.lab = null; }); return c; };
/* mêmes étiquettes, objet par objet (l'ordre des clés suit celui du croquis) */
const memes = (a, b) => Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(id => a[id] === b[id]);
/* c1 : texte du porteur (titre et niveau commun, puis la liste), membres sans étiquette ; titres ; ordre ; casse ; rendus */
async function c1(){
  const e = etiquettesDe(salleDeBain());
  R.ok(e.D === SDB && e.L === '' && e.W === '', 'c1 douche porteur, lavabo et WC + lave-mains au 1er étage → ' + js(SDB) + ', membres sans étiquette (obtenu ' + js([e.D, e.L, e.W]) + ')');
  [['sdb', 'Salle de bain'], ['eau', 'Salle d\'eau'], ['cuisine', 'Cuisine'], ['buanderie', 'Buanderie']].forEach(([t, lib]) => {
    const x = etiquettesDe(salleDeBain('', {D: {etiqTitre: t}})).D, att = lib + ' (1er étage)\ndouche, lavabo, WC + lave-mains';
    R.ok(x === att, 'c1 titre « ' + t + ' » → ' + js(att) + ' (obtenu ' + js(x) + ')');
  });
  ['', 'zz', 'constructor', 'toString', 3, null].forEach(t => { const x = etiquettesDe(salleDeBain('', {D: {etiqTitre: t}})).D;
    R.ok(x === SDB, 'c1 titre ' + js(t) + ' : titre d\'office (obtenu ' + js(x) + ')'); });
  const L1 = Object.assign({etiqAvec: 'L'}, N1), cas = [
    ['titre « aucun » : une ligne, niveau commun à la fin', salleDeBain('', {D: {etiqTitre: 'aucun'}}), 'D', 'Douche, lavabo, WC + lave-mains (1er étage)'],
    ['ni douche, ni baignoire, ni salle de bain : pas de titre, une ligne', rangee([['L', 'lavabo', N1], ['W', 'wc', L1]]), 'L', 'Lavabo, WC (1er étage)'],
    ['une baignoire : titre d\'office', rangee([['B', 'baignoire', L1], ['L', 'lavabo', N1]]), 'L', 'Salle de bain (1er étage)\nbaignoire, lavabo'],
    ['porteur Salle de bain : son nom, égal au titre, n\'est pas répété', rangee([['S', 'sdb', N1], ['W', 'wc', Object.assign({etiqAvec: 'S'}, N1)]]), 'S', 'Salle de bain (1er étage)\nWC'],
    ['membre Salle de bain : de même', rangee([['D', 'douche', N1], ['S', 'sdb', Object.assign({etiqAvec: 'D'}, N1)]]), 'D', 'Salle de bain (1er étage)\ndouche'],
    /* un seul nom égal au titre est omis, le premier de la liste : deux objets ne se lisent pas comme un seul (relecture de m134, M1) */
    ['deux salles de bain réunies : l\'une est omise, l\'autre reste', rangee([['S', 'sdb', N1], ['S2', 'sdb', Object.assign({etiqAvec: 'S'}, N1)]]), 'S', 'Salle de bain (1er étage)\nsalle de bain'],
    ['deux cuisines, titre « cuisine » : de même', rangee([['K', 'cuisine', {etiqTitre: 'cuisine'}], ['K2', 'cuisine', {etiqAvec: 'K'}]]), 'K', 'Cuisine\ncuisine'],
    ['salle de bain et autre appareil nommé « Salle de bain » (fichier fait à la main) sous une douche : la salle de bain, la première, est omise',
      rangee([['G', 'autre_eu', Object.assign({nom: 'Salle de bain', etiqAvec: 'D'}, N1)], ['S', 'sdb', Object.assign({etiqAvec: 'D'}, N1)], ['D', 'douche', N1]]), 'D',
      'Salle de bain (1er étage)\ndouche, salle de bain'],
    ['titre « aucun » sur une salle de bain : son nom reste', rangee([['S', 'sdb', Object.assign({etiqTitre: 'aucun'}, N1)], ['W', 'wc', Object.assign({etiqAvec: 'S'}, N1)]]), 'S', 'Salle de bain, WC (1er étage)'],
    ['cuisine, titre « cuisine »', rangee([['V', 'lavevaisselle', {etiqAvec: 'K'}], ['K', 'cuisine', {etiqTitre: 'cuisine'}], ['E', 'evier', {etiqAvec: 'K'}]]), 'K', 'Cuisine\névier, lave-vaisselle'],
    ['ordre de l\'étiquette (m141), porteur compris, puis l\'id ; nom d\'un autre appareil en minuscule, sigle gardé', rangee([['G2', 'autre_eu', {nom: 'Bidet', etiqAvec: 'LL'}],
      ['P', 'autre_eu', {nom: 'PAC', etiqAvec: 'LL'}], ['LL', 'lavelinge', {}], ['G1', 'autre_eu', {nom: 'Urinoir', etiqAvec: 'LL'}]]), 'LL', 'Lave-linge, urinoir, bidet, PAC'],
    ['autre appareil dans une salle de bain', rangee([['D', 'douche', N1], ['G', 'autre_eu', Object.assign({nom: 'Bidet', etiqAvec: 'D'}, N1)]]), 'D', 'Salle de bain (1er étage)\ndouche, bidet'],
    ['porteur WC sans niveau (seul, il n\'aurait pas d\'étiquette)', rangee([['W', 'wc', {}], ['L', 'lavabo', {etiqAvec: 'W'}]]), 'W', 'Lavabo, WC'],
    ['sans niveau, avec un titre', rangee([['L', 'lavabo', {etiqAvec: 'D'}], ['D', 'douche', {}]]), 'D', 'Salle de bain\ndouche, lavabo'],
    ['étiquette personnalisée du porteur : elle l\'emporte', salleDeBain('', {D: {etiq: 'Salle de bain du haut'}}), 'D', 'Salle de bain du haut']];
  cas.forEach(([n, d, id, att]) => { const x = etiquettesDe(d); R.ok(x[id] === att, 'c1 ' + n + ' → ' + js(att) + ' (obtenu ' + js(x[id]) + ')'); });
  { const d = cas.find(c => /^ordre de l'étiquette/.test(c[0]))[1], r = copie(d); r.el.reverse(); const a = etiquettesDe(d), b = etiquettesDe(r);
    R.ok(memes(a, b), 'c1 l\'ordre du croquis ne change pas le texte (obtenu ' + js(a.LL) + ' et ' + js(b.LL) + ')'); }
  { const x = etiquettesDe(salleDeBain('', {D: {etiq: 'Salle de bain du haut'}})); R.ok(x.L === '' && x.W === '', 'c1 étiquette personnalisée du porteur : membres sans étiquette (obtenu ' + js([x.L, x.W]) + ')'); }
  /* rendus : deux lignes, sans les étiquettes propres des trois objets */
  const r = await troisRendus(salleDeBain()), l1 = 'Salle de bain (1er étage)', l2 = 'douche, lavabo, WC + lave-mains', propres = ['Douche (1er étage)', 'Lavabo (1er étage)', LM + ' (1er étage)'];
  for (const [n, liste] of [['à l\'écran', r.ecran], ['au plan PDF', r.plan], ['au DXF', r.dxf]]){
    const k1 = liste.filter(t => t === l1).length, k2 = liste.filter(t => t === l2).length, mal = liste.filter(t => propres.indexOf(t) >= 0 || /\n/.test(t));
    R.ok(k1 === 1 && k2 === 1 && !mal.length && !r.err.length, 'c1 ' + n + ' : « ' + l1 + ' » puis « ' + l2 + ' », une fois chacune, aucune étiquette propre (obtenu ' + k1 + ' et ' + k2
      + (mal.length ? ', ' + js(mal) : '') + ' ; ' + js(liste.filter(t => /bain|ouche|avabo|WC/.test(t))) + ')' + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  }
  const p = await pdf(ouvert(salleDeBain()), {mode: 'edl'}), q1 = p.pos.find(q => q.t === l1), q2 = p.pos.find(q => q.t === l2);
  R.ok(!!q1 && !!q2 && q2.y > q1.y && Math.abs(q2.y - q1.y) < 5, 'c1 plan PDF : la liste sous le titre (obtenu ' + (q1 && q2 ? (q2.y - q1.y).toFixed(2) + ' mm' : 'absentes') + ')');
}
/* c2 : un membre n'a ni étiquette ni place dans l'encombrement du plan, même avec une étiquette personnalisée ; elle revient quand le
   groupe se défait */
async function c2(){
  const d = salleDeBain('', {L: {etiq: 'Lavabo du haut'}}), e = etiquettesDe(d);
  R.ok(e.L === '' && e.W === '' && e.D === SDB, 'c2 membre à étiquette personnalisée : texte vide ; porteur ' + js(SDB) + ' (obtenu ' + js([e.D, e.L, e.W]) + ')');
  /* étiquettes posées (lab), plan au 1/200 : la boîte d'une étiquette de deux lignes a 2 × 1,22 + 0,2 hauteurs de texte (2,1 mm sur le papier) */
  const boites = x => { if (typeof V.obstaclesPlan !== 'function') return 'VCroquis.obstaclesPlan absente';
    const c = copie(x); c.el.forEach(o => { o.lab = {dx: 1.5, dy: 1, E: 200}; }); return sur(() => V.obstaclesPlan(c, V.analyser(copie(c), 'edl'), 200, V.indexDoc(c), null).boites); };
  const bG = boites(d), bS = boites(sansLiens(d)), n = b => Array.isArray(b) ? b.length : b, h2 = 2.1 * .2 * (2 * 1.22 + .2);
  R.ok(n(bG) === 4 && n(bS) === 6, 'c2 encombrement du plan (VCroquis.obstaclesPlan) : trois symboles et la seule étiquette du porteur, 4 boîtes (sans groupe : 6) (obtenu ' + js(n(bG)) + ', ' + js(n(bS)) + ')');
  R.ok(Array.isArray(bG) && bG.filter(b => Math.abs(b[3] - b[1] - h2) < 1e-9).length === 1, 'c2 boîte de l\'étiquette du porteur : deux lignes de haut (' + h2.toFixed(4) + ' m au 1/200)');
  const sep = copie(d); sep.el = sep.el.filter(o => o.id !== 'D'); const s = etiquettesDe(sep);
  R.ok(s.L === 'Lavabo du haut' && s.W === LM + ' (1er étage)', 'c2 porteur retiré : chacun son étiquette, « Lavabo du haut » revient (obtenu ' + js([s.L, s.W]) + ')');
  const r = await troisRendus(d);
  for (const [n, liste] of [['à l\'écran', r.ecran], ['au plan PDF', r.plan], ['au DXF', r.dxf]])
    R.ok(liste.indexOf('Lavabo du haut') < 0 && liste.indexOf('douche, lavabo, WC + lave-mains') >= 0, 'c2 ' + n + ' : ni « Lavabo du haut », ni étiquette d\'un membre ; étiquette commune (obtenu '
      + js(liste.filter(t => /bain|ouche|avabo|WC/.test(t))) + ')');
}
/* c3 : un lien qui ne fait pas de groupe (autre statut, EP, porteur absent, lié ou d'un autre rôle, lien illisible) : chacun garde son
   étiquette, celle du croquis sans lien ; chaîne ; sans analyse */
function c3(){
  const n1 = p => Object.assign({}, N1, p), cas = [
    ['membre « Projet », porteur existant (avant-projet)', [['D', 'douche', N1], ['L', 'lavabo', n1({st: 'projet', etiqAvec: 'D'})]], 'avp', 'Projet : Lavabo (1er étage)'],
    ['membre existant, porteur « Projet » (avant-projet)', [['D', 'douche', n1({st: 'projet'})], ['L', 'lavabo', n1({etiqAvec: 'D'})]], 'avp', 'Lavabo (1er étage)'],
    ['membre « À supprimer », porteur existant (état des lieux)', [['D', 'douche', N1], ['L', 'lavabo', n1({st: 'supprimer', etiqAvec: 'D'})]], 'edl', 'Lavabo (1er étage)'],
    ['membre EP : descente', [['D', 'douche', N1], ['L', 'descente', n1({etiqAvec: 'D'})]], 'edl', 'Descente EP avant (1er étage)'],
    ['membre EP : siphon de sol', [['D', 'douche', N1], ['L', 'siphon_sol', n1({etiqAvec: 'D'})]], 'edl', null],
    ['membre EP : autre ouvrage EP', [['D', 'douche', N1], ['L', 'autre_ep', n1({nom: 'Avaloir de terrasse', etiqAvec: 'D'})]], 'edl', 'Avaloir de terrasse (1er étage)'],
    ['porteur EP : grille', [['D', 'grille', {}], ['L', 'lavabo', n1({etiqAvec: 'D'})]], 'edl', 'Lavabo (1er étage)'],
    ['porteur EP : autre ouvrage EP', [['D', 'autre_ep', {nom: 'Cour anglaise'}], ['L', 'lavabo', n1({etiqAvec: 'D'})]], 'edl', 'Lavabo (1er étage)'],
    ['porteur qui n\'est pas une source : boîte', [['D', 'boite', {res: 'EU'}], ['L', 'lavabo', n1({etiqAvec: 'D'})]], 'edl', 'Lavabo (1er étage)'],
    ['porteur absent du croquis', [['D', 'douche', N1], ['L', 'lavabo', n1({etiqAvec: 'X9'})]], 'edl', 'Lavabo (1er étage)'],
    ['porteur d\'un type inconnu', [['D', 'zz', {}], ['L', 'lavabo', n1({etiqAvec: 'D'})]], 'edl', 'Lavabo (1er étage)'],
    ['lien vers lui-même', [['D', 'douche', N1], ['L', 'lavabo', n1({etiqAvec: 'L'})]], 'edl', 'Lavabo (1er étage)'],
    ['porteur lié à lui-même', [['D', 'douche', n1({etiqAvec: 'D'})], ['L', 'lavabo', n1({etiqAvec: 'D'})]], 'edl', 'Lavabo (1er étage)'],
    ['lien vide', [['D', 'douche', N1], ['L', 'lavabo', n1({etiqAvec: ''})]], 'edl', 'Lavabo (1er étage)'],
    ['lien écrit en nombre (7)', [['7', 'douche', N1], ['L', 'lavabo', n1({etiqAvec: 7})]], 'edl', 'Lavabo (1er étage)'],
    ['lien « toString »', [['D', 'douche', N1], ['L', 'lavabo', n1({etiqAvec: 'toString'})]], 'edl', 'Lavabo (1er étage)'],
    ['lien « constructor »', [['D', 'douche', N1], ['L', 'lavabo', n1({etiqAvec: 'constructor'})]], 'edl', 'Lavabo (1er étage)'],
    ['lien « __proto__ »', [['D', 'douche', N1], ['L', 'lavabo', n1({etiqAvec: '__proto__'})]], 'edl', 'Lavabo (1er étage)'],
    ['lien d\'un type inconnu', [['D', 'douche', N1], ['L', 'zz', {etiqAvec: 'D'}]], 'edl', '']];
  cas.forEach(([n, objs, mode, att]) => {
    const d = rangee(objs), a = etiquettesDe(d, mode), b = etiquettesDe(sansLiens(d), mode), bon = js(a) === js(b) && !/exception/.test(js(a)) && (att === null || a.L === att);
    R.ok(bon, 'c3 ' + n + ' : étiquette propre de chacun ' + js(b) + (bon ? '' : ' (obtenu ' + js(a) + ')'));
  });
  { const d = rangee([['D', 'douche', N1], ['W', 'wc', n1({etiqAvec: 'D'})], ['L', 'lavabo', n1({etiqAvec: 'W'})]]), a = etiquettesDe(d), att = {D: 'Salle de bain (1er étage)\ndouche, WC', W: '', L: 'Lavabo (1er étage)'};
    R.ok(js(a) === js(att), 'c3 chaîne : lavabo lié au WC, WC lié à la douche → ' + js(att) + ' (obtenu ' + js(a) + ')'); }
  { const d = rangee([['D', 'douche', n1({st: undefined})], ['L', 'lavabo', n1({etiqAvec: 'D'})]]), a = etiquettesDe(d);
    R.ok(a.D === 'Salle de bain (1er étage)\ndouche, lavabo' && a.L === '', 'c3 statut absent du porteur : vaut « existant » [p] (obtenu ' + js(a) + ')'); }
  { const d = salleDeBain(), a = ['D', 'L', 'W'].map(id => sur(() => V.texteEtiquette(elDe(d, id)))), att = ['Douche (1er étage)', 'Lavabo (1er étage)', LM + ' (1er étage)'];
    R.ok(js(a) === js(att), 'c3 sans analyse : chacun son étiquette ' + js(att) + ' (obtenu ' + js(a) + ')'); }
}
/* c4 : groupe « Projet » défait sur l'état des lieux, formé sur l'avant-projet (« Projet : ») ; groupe « À supprimer » défait sur
   l'avant-projet ; à l'écran, au plan PDF et au DXF */
async function c4(){
  const P = salleDeBain('projet'), S = salleDeBain('supprimer'), pE = etiquettesDe(P, 'edl'), pA = etiquettesDe(P, 'avp'), sE = etiquettesDe(S, 'edl'), sA = etiquettesDe(S, 'avp');
  const att = (pre, D) => ({D: D === undefined ? pre + 'Douche (1er étage)' : D, L: D === undefined ? pre + 'Lavabo (1er étage)' : '', W: D === undefined ? pre + LM + ' (1er étage)' : ''});
  [['groupe « Projet », état des lieux : défait', pE, att('Projet : ')], ['groupe « Projet », avant-projet : « Projet : » et le texte commun', pA, att('', 'Projet : ' + SDB)],
    ['groupe « À supprimer », état des lieux : formé, sans préfixe', sE, att('', SDB)], ['groupe « À supprimer », avant-projet : défait', sA, att('À supprimer : ')]].forEach(([n, a, b]) =>
    R.ok(js(a) === js(b), 'c4 ' + n + ' → ' + js(b) + (js(a) === js(b) ? '' : ' (obtenu ' + js(a) + ')')));
  const r = await troisRendus(P), propres = ['Projet : Douche (1er étage)', 'Projet : Lavabo (1er étage)', 'Projet : ' + LM + ' (1er étage)'];
  for (const [n, liste] of [['à l\'écran', r.ecran], ['au DXF', r.dxf]]){ const manque = propres.filter(t => liste.indexOf(t) < 0);
    R.ok(!manque.length && liste.indexOf('Projet : Salle de bain (1er étage)') < 0, 'c4 groupe « Projet » ' + n + ' (état des lieux) : les trois étiquettes « Projet : … »' + (manque.length ? ' (absentes : ' + js(manque) + ')' : '')); }
  const p = await pdf(ouvert(P), {mode: 'avp'}), fin = p.txt.indexOf(TITRE_EQ), plan = p.txt.slice(0, fin < 0 ? p.txt.length : fin);
  R.ok(plan.indexOf('Projet : Salle de bain (1er étage)') >= 0 && plan.indexOf('douche, lavabo, WC + lave-mains') >= 0 && !plan.some(t => propres.indexOf(t) >= 0) && !p.err.length,
    'c4 groupe « Projet », plan PDF de l\'avant-projet : « Projet : Salle de bain (1er étage) » et la liste (obtenu ' + js(plan.filter(t => /bain|ouche|avabo|WC/.test(t))) + ')' + (p.err.length ? ' ' + p.err.join(' | ') : ''));
}
/* c5 : niveaux différents ; au-delà de quatre appareils listés, leurs lettres */
function c5(){
  const n = (niv, q) => Object.assign(niv === '1' ? {niv: 'etage', etage: '1'} : niv ? {niv} : {}, q), cas = [
    ['niveaux différents : après chaque nom, rien sur la première ligne', [['D', 'douche', n('1')], ['L', 'lavabo', n('rdc', {etiqAvec: 'D'})], ['W', 'wc', n('', {etiqAvec: 'D'})]], 'Salle de bain\ndouche (1er étage), lavabo (RDC), WC'],
    ['niveaux différents : le nom égal au titre reste, avec son niveau [p]', [['S', 'sdb', n('1')], ['W', 'wc', n('rdc', {etiqAvec: 'S'})]], 'Salle de bain\nsalle de bain (1er étage), WC (RDC)'],
    ['niveaux différents, sans titre', [['L', 'lavabo', n('ss')], ['W', 'wc', n('rdc', {etiqAvec: 'L'})]], 'Lavabo (sous-sol), WC (RDC)'],
    ['quatre appareils : leurs noms', [['D', 'douche', n('1')], ['L', 'lavabo', n('1', {etiqAvec: 'D'})], ['W', 'wc', n('1', {etiqAvec: 'D'})], ['B', 'baignoire', n('1', {etiqAvec: 'D'})]],
      'Salle de bain (1er étage)\ndouche, baignoire, lavabo, WC'],
    ['cinq appareils : leurs lettres', [['D', 'douche', n('1')], ['L', 'lavabo', n('1', {etiqAvec: 'D'})], ['W', 'wc', n('1', {etiqAvec: 'D'})], ['B', 'baignoire', n('1', {etiqAvec: 'D'})],
      ['E', 'evier', n('1', {etiqAvec: 'D'})]], 'Salle de bain (1er étage)\nDo, Ba, La, Év, WC'],
    ['cinq appareils à niveaux différents', [['D', 'douche', n('1')], ['L', 'lavabo', n('1', {etiqAvec: 'D'})], ['W', 'wc', n('1', {etiqAvec: 'D'})], ['B', 'baignoire', n('rdc', {etiqAvec: 'D'})],
      ['E', 'evier', n('1', {etiqAvec: 'D'})]], 'Salle de bain\nDo (1er étage), Ba (RDC), La (1er étage), Év (1er étage), WC (1er étage)'],
    ['cinq objets dont une salle de bain, nom égal au titre : quatre noms listés [p]', [['S', 'sdb', n('1')], ['D', 'douche', n('1', {etiqAvec: 'S'})], ['L', 'lavabo', n('1', {etiqAvec: 'S'})],
      ['W', 'wc', n('1', {etiqAvec: 'S'})], ['B', 'baignoire', n('1', {etiqAvec: 'S'})]], 'Salle de bain (1er étage)\ndouche, baignoire, lavabo, WC'],
    ['six appareils sans titre : lettres ; siphon de garage, sans lettres : son nom ; autre appareil sans nom : « ? » [p]', [['LL', 'lavelinge', {}], ['W', 'wc', {etiqAvec: 'LL'}],
      ['L', 'lavabo', {etiqAvec: 'LL'}], ['E', 'evier', {etiqAvec: 'LL'}], ['G', 'siphon_garage', {etiqAvec: 'LL'}], ['A', 'autre_eu', {etiqAvec: 'LL'}]], 'La, Év, WC, LL, siphon de garage, ?'],
    ['« Projet », sans titre, avant-projet', [['L', 'lavabo', n('1', {st: 'projet'})], ['W', 'wc', n('1', {st: 'projet', etiqAvec: 'L'})]], 'Projet : Lavabo, WC (1er étage)', 'avp']];
  cas.forEach(([nom, objs, att, mode]) => { const d = rangee(objs), x = etiquettesDe(d, mode), id = objs.find(o => !('etiqAvec' in o[2]))[0], vides = objs.filter(o => o[0] !== id).every(o => x[o[0]] === '');
    R.ok(x[id] === att && vides, 'c5 ' + nom + ' → ' + js(att) + (x[id] === att && vides ? '' : ' (obtenu ' + js(x) + ')')); });
}
/* c6 (garde) : l'étiquette commune ne change ni l'analyse, ni les anomalies, ni la conclusion, ni le constat (chaque objet compte), ni la
   légende, ni la page 2 du plan PDF ; au DXF, seuls changent les TEXT des étiquettes du groupe ; à l'écran, un seul trait de rappel,
   vers le porteur */
async function c6(){
  /* WC et lavabo vers une boîte EP (non conformes), évier vers la boîte EU, douche reliée à rien ; groupe : douche porteur, les autres membres */
  const sans = doc({o: [['D', 'douche', 0, 8, N1], ['L', 'lavabo', 3, 8, N1], ['W', 'wc', 6, 8, Object.assign({lm: 'oui'}, N1)], ['E', 'evier', 9, 8, N1],
    ['Bp', 'boite', 0, 2, {res: 'EP'}], ['Bu', 'boite', 9, 2, {res: 'EU'}], ['Rp', 'regard_pub', 9, -2, {res: 'EU'}]],
    l: [['tL', 'tr', '', '', ['L', 'Bp']], ['tW', 'tr', '', '', ['W', 'Bp']], ['tE', 'tr', '', '', ['E', 'Bu']], ['tU', 'tr', '', '', ['Bu', 'Rp']], ['C', 'col', 'EU', '', [[-6, -2], 'Rp', [15, -2]]]]});
  const avec = copie(sans); avec.el.forEach(o => { if (o.id === 'D') o.p.etiqTitre = 'sdb'; if (/^[LWE]$/.test(o.id)) o.p.etiqAvec = 'D'; });
  const ea = etiquettesDe(avec), l1 = 'Salle de bain (1er étage)', l2 = 'douche, lavabo, évier, WC + lave-mains';
  R.ok(ea.D === l1 + '\n' + l2 && ea.L === '' && ea.W === '' && ea.E === '', 'c6 croquis témoin : groupe de quatre → ' + js(l1 + '\n' + l2) + ' (obtenu ' + js([ea.D, ea.L, ea.W, ea.E]) + ')');
  const a = sur(() => sorties(sans)), b = sur(() => sorties(avec));
  if (typeof a === 'string' || typeof b === 'string'){ R.ok(false, 'c6 sorties : ' + (typeof a === 'string' ? a : b)); return; }
  Object.keys(a).forEach(k => R.ok(a[k] === b[k], 'c6 ' + k + ' : identique avec et sans étiquette commune' + (a[k] === b[k] ? '' : ' (sans : ' + a[k].slice(0, 160) + ' ; avec : ' + b[k].slice(0, 160) + ')')));
  const an = V.analyser(copie(avec), 'edl'); R.ok(an.anomalies.length >= 2, 'c6 le croquis témoin a des anomalies (' + an.anomalies.length + ')');
  /* étiquettes masquées (lab off) : plan PDF identique ; affichées (lab null) : page 2 identique */
  const pS = await pdf(sans, {mode: 'edl'}), pA = await pdf(avec, {mode: 'edl'});
  R.ok(js(pS.txt) === js(pA.txt) && js(pS.formes) === js(pA.formes) && js(pS.traits) === js(pA.traits) && !pA.err.length, 'c6 plan PDF, étiquettes masquées : mêmes textes (légende, tableaux) et mêmes traits');
  const p2 = p => { const i = p.txt.indexOf(TITRE_EQ); return i < 0 ? [] : p.txt.slice(i); };
  const qS = await pdf(ouvert(sans), {mode: 'edl'}), qA = await pdf(ouvert(avec), {mode: 'edl'});
  R.ok(p2(qS).length > 10 && js(p2(qS)) === js(p2(qA)), 'c6 plan PDF, page 2 : identique avec et sans étiquette commune (' + p2(qS).length + ' textes)');
  /* DXF, étiquettes placées d'office (aucune n'est un obstacle) : tout est identique hors les TEXT des étiquettes du groupe */
  const propres = ['Douche (1er étage)', 'Lavabo (1er étage)', LM + ' (1er étage)', 'Évier (1er étage)'], xS = sur(() => dxf(ouvert(sans))), xA = sur(() => dxf(ouvert(avec)));
  if (typeof xS === 'string' || typeof xA === 'string'){ R.ok(false, 'c6 DXF : ' + (typeof xS === 'string' ? xS : xA)); return; }
  const etq = q => q.type === 'TEXT' && q.cal === 'VEDE-ETIQUETTES', ent = q => q.type + '|' + q.cal + '|' + js(q.c) + '|' + js(q.sommets || null);
  const resteS = xS.ents.filter(q => !(etq(q) && propres.indexOf(q.c['1']) >= 0)).map(ent), resteA = xA.ents.filter(q => !(etq(q) && [l1, l2].indexOf(q.c['1']) >= 0)).map(ent);
  const tS = xS.ents.filter(q => etq(q) && propres.indexOf(q.c['1']) >= 0).map(q => q.c['1']), tA = xA.ents.filter(q => etq(q) && [l1, l2].indexOf(q.c['1']) >= 0).map(q => q.c['1']);
  R.ok(js(resteS) === js(resteA) && js(xS.blocs) === js(xA.blocs) && js(xS.calques) === js(xA.calques) && js(tS) === js(propres) && js(tA) === js([l1, l2]),
    'c6 DXF : mêmes calques, blocs et entités hors les TEXT des étiquettes du groupe : quatre étiquettes propres sans lien, deux lignes du porteur avec (obtenu ' + js(tS) + ', ' + js(tA)
    + (js(resteS) === js(resteA) ? '' : ', ' + resteS.filter(x => resteA.indexOf(x) < 0).length + ' entités changées') + ')');
  /* écran, étiquettes des quatre appareils posées loin des symboles (les autres masquées) : un trait de rappel par étiquette ; avec le
     groupe, celui du porteur seul */
  const loin = d => { const c = copie(d); c.el.forEach(o => { if (/^[DLWE]$/.test(o.id)) o.lab = {dx: 2.5, dy: 4, E: 200}; }); return c; }, rappels = d => { const x = sur(() => dessiner(loin(d), 40, [5, 6]));
    if (typeof x === 'string') return x; return x.traits.filter(t => t.larg === 1 && t.coul === V.TXT_RES.EU).map(t => ['D', 'L', 'W', 'E'].find(id => { const o = elDe(d, id); return Math.hypot(t.a.x - o.x, t.a.y - o.y) < 1.2; }) || '?'); };
  const rS = rappels(sans), rA = rappels(avec);
  R.ok(js(rS) === js(['D', 'L', 'W', 'E']) && js(rA) === js(['D']), 'c6 écran : un trait de rappel par étiquette sans lien, celui du porteur seul avec (obtenu ' + js(rS) + ', ' + js(rA) + ')');
}
/* c7 : croquis du générateur avec l'option champs (niveaux, lave-mains, noms, liens et titres, parfois illisibles) : aucune exception ni
   « undefined » ; un membre (groupeEtiquette) n'a pas d'étiquette, le porteur a un texte ; l'ordre du croquis ne change rien ; l'analyse,
   les anomalies et le constat sont ceux du croquis sans lien ; le DXF aussi, hors les TEXT des étiquettes */
function c7(){
  const G = require('./generateur.js'), SRC = G.SOURCES.concat(G.GENERIQUES), mal = [], st = {croquis: 0, liens: 0, groupes: 0, membres: 0, deuxLignes: 0, lettres: 0};
  /* une graine sur quatre : sources EU seulement, jusqu'à huit (groupes de plus de quatre appareils) */
  const EU = ['wc', 'wc', 'lavabo', 'douche', 'baignoire', 'sdb', 'evier', 'cuisine', 'lavelinge', 'lavevaisselle', 'siphon_garage', 'autre_eu'];
  const etq = q => q.type === 'TEXT' && q.cal === 'VEDE-ETIQUETTES';
  const horsEtq = x => x.ents.filter(q => !etq(q)).map(q => q.type + '|' + q.cal + '|' + JSON.stringify(q.c) + '|' + JSON.stringify(q.sommets || null)).join('\n');
  for (let graine = 1; graine <= 250; graine++){
    const spec = G.gen(graine, {sources: graine % 4 ? SRC : EU, avp: graine % 3 === 0, maxS: graine % 4 ? 2 + graine % 6 : 8, maxN: 2 + graine % 5, drains: graine % 2 === 0, champs: true});
    st.croquis++; st.liens += spec.o.filter(o => 'etiqAvec' in o[4]).length;
    try {
      const d = doc(spec), r = copie(d); r.el.reverse();
      for (const mode of ['edl', 'avp']){
        const an = V.analyser(copie(d), mode), a = etiquettesDe(d, mode), b = etiquettesDe(r, mode);
        if (!memes(a, b)) mal.push('graine ' + graine + ' ' + mode + ' : l\'ordre du croquis change une étiquette');
        Object.keys(a).forEach(id => {
          if (typeof a[id] !== 'string' || /undefined|\[object|NaN|^exception/.test(a[id])) mal.push('graine ' + graine + ' ' + mode + ' ' + id + ' : ' + js(a[id]));
          const g = typeof V.groupeEtiquette === 'function' ? sur(() => V.groupeEtiquette(elDe(d, id), an)) : null;
          if (typeof g === 'string') mal.push('graine ' + graine + ' ' + mode + ' ' + id + ' : ' + g);
          if (!g || typeof g !== 'object') return;
          if (g.porteur !== id){ st.membres++; if (a[id] !== '') mal.push('graine ' + graine + ' ' + mode + ' membre ' + id + ' : ' + js(a[id])); return; }
          st.groupes++; if (/\n/.test(a[id])) st.deuxLignes++; if (g.objets.length > 4) st.lettres++;
          const p = elDe(d, id).p; if (!a[id] || (!p.etiq && a[id].split(/\n|, /).length < 2)) mal.push('graine ' + graine + ' ' + mode + ' porteur ' + id + ' : ' + js(a[id]));
        });
      }
      const s = sansLiens(d), so = sorties(d), ss = sorties(s);
      Object.keys(so).forEach(k => { if (so[k] !== ss[k]) mal.push('graine ' + graine + ' ' + k + ' : différent du croquis sans lien'); });
      if (horsEtq(dxf(ouvert(d))) !== horsEtq(dxf(ouvert(s)))) mal.push('graine ' + graine + ' : DXF différent du croquis sans lien, hors étiquettes');
    } catch (e){ mal.push('graine ' + graine + ' : exception ' + e.message + ' ' + (e.stack || '').split('\n')[1] + ' ' + G.fmt(spec)); }
  }
  R.ok(!mal.length && st.groupes > 50 && st.membres > st.groupes && st.deuxLignes > 0 && st.lettres > 0, 'c7 ' + st.croquis + ' croquis du générateur (option champs, ' + st.liens + ' liens) : '
    + st.groupes + ' porteurs et ' + st.membres + ' membres analysés, dont ' + st.deuxLignes + ' textes sur deux lignes et ' + st.lettres + ' groupes de plus de quatre ; aucun écart'
    + (mal.length ? ' (' + mal.length + ' écarts : ' + mal.slice(0, 4).join(' ; ') + ')' : ''));
}
/* c9 (m135) : suppression du porteur (VCroquis.ops.supprimerElement) et VCroquis.delierPorteur : liens vers lui retirés (clé supprimée),
   liens périmés compris ; objets déliés rendus ; leurs étiquettes propres reviennent ; un autre groupe reste */
function c9(){
  const base = () => rangee([['D', 'douche', Object.assign({}, N1)], ['L', 'lavabo', Object.assign({etiqAvec: 'D'}, N1)], ['W', 'wc', Object.assign({etiqAvec: 'D', lm: 'oui'}, N1)],
    ['X', 'douche', Object.assign({}, N1)], ['Y', 'wc', Object.assign({etiqAvec: 'X'}, N1)], ['Z', 'descente', {etiqAvec: 'D'}]]);
  const lien = (d, id) => { const e = d.el.find(o => o.id === id); return !e ? 'absent' : 'etiqAvec' in e.p ? e.p.etiqAvec : 'sans clé'; };
  const ids = l => Array.isArray(l) ? l.map(o => o && o.id).sort().join() : js(l);
  R.ok(typeof V.delierPorteur === 'function', 'c9 VCroquis.delierPorteur exportée (obtenu ' + typeof V.delierPorteur + ')');
  let d = base(), r = sur(() => V.ops.supprimerElement(d, 'D')), e = etiquettesDe(d);
  R.ok(ids(r) === 'L,W,Z' && lien(d, 'D') === 'absent' && lien(d, 'L') === 'sans clé' && lien(d, 'W') === 'sans clé' && lien(d, 'Z') === 'sans clé' && lien(d, 'Y') === 'X',
    'c9 porteur supprimé : lavabo, WC et descente (lien périmé) déliés, clé etiqAvec retirée, rendus par supprimerElement ; le membre d\'un autre groupe garde son lien (obtenu '
    + js({rendus: ids(r), D: lien(d, 'D'), L: lien(d, 'L'), W: lien(d, 'W'), Z: lien(d, 'Z'), Y: lien(d, 'Y')}) + ')');
  R.ok(e.L === 'Lavabo (1er étage)' && e.W === 'WC + lave-mains (1er étage)' && e.Y === '' && e.X === 'Salle de bain (1er étage)\ndouche, WC',
    'c9 porteur supprimé : étiquettes propres du lavabo et du WC ; l\'autre groupe inchangé (obtenu ' + js(e) + ')');
  d = base(); r = sur(() => V.ops.supprimerElement(d, 'L')); e = etiquettesDe(d);
  R.ok(ids(r) === '' && lien(d, 'W') === 'D' && e.D === 'Salle de bain (1er étage)\ndouche, WC + lave-mains', 'c9 membre supprimé : aucun objet délié, le groupe garde la douche et le WC (obtenu '
    + js({rendus: ids(r), W: lien(d, 'W'), D: e.D}) + ')');
  d = base(); const j0 = js(d); r = sur(() => V.ops.supprimerElement(d, 'inconnu'));
  R.ok(ids(r) === '' && js(d) === j0, 'c9 id absent : rien de rendu, croquis inchangé (obtenu ' + ids(r) + ')');
  d = base(); r = sur(() => V.delierPorteur(d, 'D')); e = etiquettesDe(d);
  R.ok(ids(r) === 'L,W,Z' && lien(d, 'L') === 'sans clé' && lien(d, 'Y') === 'X' && e.D === 'Douche (1er étage)' && e.L === 'Lavabo (1er étage)', 'c9 delierPorteur(doc, « D ») : '
    + 'les trois liens retirés, la douche reste et reprend son étiquette (obtenu ' + js({rendus: ids(r), L: lien(d, 'L'), Y: lien(d, 'Y'), D: e.D, Lab: e.L}) + ')');
  R.ok(ids(sur(() => V.delierPorteur({}, 'D'))) === '' && ids(sur(() => V.delierPorteur(null, 'D'))) === '', 'c9 delierPorteur sans croquis ou sans éléments : rien, aucune exception');
}
/* c10 (m141 ; réponse ordre-etiquette-commune du 16 nov. 2026, choix b ; D7 de la conception v1.7.2) : la liste suit l'ordre de
   l'étiquette, porteur compris, puis l'id ; le porteur reste en tête de groupeEtiquette, et le titre se lit sur lui */
async function c10(){
  const T1 = 'Salle de bain (1er étage)', L3 = 'douche, lavabo, WC + lave-mains';
  /* douche D, lavabo L et WC + lave-mains W au 1er étage, les deux autres liés au porteur por ; plus : propriétés en plus, par id */
  const trio = (por, plus) => rangee([['D', 'douche', {}], ['L', 'lavabo', {}], ['W', 'wc', {lm: 'oui'}]].map(([id, t, q]) =>
    [id, t, Object.assign({}, N1, q, id === por ? {} : {etiqAvec: por}, (plus || {})[id])]));
  for (const [por, avant] of [['D', 'douche, WC + lave-mains, lavabo'], ['L', 'lavabo, WC + lave-mains, douche'], ['W', 'WC + lave-mains, lavabo, douche']]){
    const e = etiquettesDe(trio(por)), vides = ['D', 'L', 'W'].filter(id => id !== por).every(id => e[id] === '');
    R.ok(e[por] === T1 + '\n' + L3 && vides, 'c10 porteur ' + por + ' : ' + js(T1 + '\n' + L3) + ', membres sans étiquette (v1.7.1 : « ' + avant + ' » ; obtenu ' + js(e) + ')');
  }
  /* le porteur reste en tête : groupeEtiquette du WC porteur, ou d'un membre */
  { const d = trio('W'), an = V.analyser(copie(d), 'edl'), vu = ['W', 'D', 'L'].map(id => { const g = sur(() => V.groupeEtiquette(elDe(d, id), an));
      return g && typeof g === 'object' ? g.porteur + ' : ' + g.objets.map(o => o.id).join(', ') : js(g); });
    R.ok(vu.every(x => x === 'W : W, D, L'), 'c10 groupeEtiquette du WC porteur, de la douche et du lavabo : porteur « W », objets W, D, L (le porteur en tête, puis l\'ordre de l\'étiquette ; '
      + 'v1.7.1 : W, L, D ; obtenu ' + js(vu) + ')'); }
  /* le titre se lit sur le porteur, pas sur le premier de la liste */
  { const x = etiquettesDe(trio('W', {W: {etiqTitre: 'eau'}})).W, att = 'Salle d\'eau (1er étage)\n' + L3;
    R.ok(x === att, 'c10 titre « eau » du WC porteur → ' + js(att) + ' (obtenu ' + js(x) + ')'); }
  { const x = etiquettesDe(trio('W', {D: {etiqTitre: 'cuisine'}})).W, att = T1 + '\n' + L3;
    R.ok(x === att, 'c10 titre « cuisine » laissé sur la douche membre (fichier fait à la main) : ignoré, titre d\'office → ' + js(att) + ' (obtenu ' + js(x) + ')'); }
  { const d = trio('W'), r = copie(d); r.el.reverse(); const a = etiquettesDe(d), b = etiquettesDe(r);
    R.ok(memes(a, b) && a.W === T1 + '\n' + L3, 'c10 porteur WC : l\'ordre du croquis ne change pas le texte (obtenu ' + js(a.W) + ' et ' + js(b.W) + ')'); }
  /* à l'écran, au plan PDF et au DXF */
  const r = await troisRendus(trio('W'));
  for (const [n, liste] of [['à l\'écran', r.ecran], ['au plan PDF', r.plan], ['au DXF', r.dxf]]){
    const k1 = liste.filter(t => t === T1).length, k2 = liste.filter(t => t === L3).length;
    R.ok(k1 === 1 && k2 === 1 && !r.err.length, 'c10 porteur WC ' + n + ' : « ' + T1 + ' » puis « ' + L3 + ' », une fois chacune (obtenu ' + k1 + ' et ' + k2 + ' ; '
      + js(liste.filter(t => /bain|ouche|avabo|WC/.test(t))) + ')' + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  }
  /* évier et lave-vaisselle, porteur lave-vaisselle ; à égalité de type, l'id, porteur compris ; les treize types */
  const ev = plus => rangee([['V', 'lavevaisselle', Object.assign({}, plus)], ['E', 'evier', {etiqAvec: 'V'}]]);
  const deuxWc = rangee([['Wb', 'wc', Object.assign({lm: 'oui'}, N1)], ['D', 'douche', Object.assign({etiqAvec: 'Wb'}, N1)], ['Wa', 'wc', Object.assign({etiqAvec: 'Wb'}, N1)]]);
  /* ids à rebours de l'ordre (m pour la salle de bain… a pour l'autre appareil, sans nom, porteur au titre « aucun ») : l'ordre suit le type */
  const ORDRE = ['sdb', 'douche', 'baignoire', 'lavabo', 'evier', 'wc', 'cuisine', 'lavevaisselle', 'lavelinge', 'chaudiere', 'siphon_garage', 'attente', 'autre_eu'];
  const treize = rangee(ORDRE.map((t, i) => [String.fromCharCode(109 - i), t, t === 'autre_eu' ? {etiqTitre: 'aucun'} : {etiqAvec: 'a'}]).reverse());
  for (const [n, d, id, att, avant] of [['évier et lave-vaisselle, porteur lave-vaisselle', ev(), 'V', 'Évier, lave-vaisselle', 'Lave-vaisselle, évier'],
    ['évier et lave-vaisselle, porteur lave-vaisselle au titre « cuisine »', ev({etiqTitre: 'cuisine'}), 'V', 'Cuisine\névier, lave-vaisselle', 'Cuisine\nlave-vaisselle, évier'],
    ['à égalité de type, l\'id, porteur compris (WC « Wa », WC + lave-mains « Wb » porteur)', deuxWc, 'Wb', T1 + '\ndouche, WC, WC + lave-mains', T1 + '\nWC + lave-mains, WC, douche'],
    ['les treize types, porteur « autre appareil » au titre « aucun »', treize, 'a', 'SdB, Do, Ba, La, Év, WC, Cu, LV, LL, Ch, siphon de garage, At, ?',
      '?, WC, La, Do, Ba, SdB, Év, Cu, LL, LV, Ch, siphon de garage, At']]){
    const x = etiquettesDe(d), vides = Object.keys(x).filter(k => k !== id).every(k => x[k] === '');
    R.ok(x[id] === att && vides, 'c10 ' + n + ' → ' + js(att) + ', membres sans étiquette (v1.7.1 : ' + js(avant) + ' ; obtenu ' + js(x[id]) + (vides ? '' : ', ' + js(x)) + ')');
  }
  /* type absent de l'ordre (M1 de la relecture) : deux types d'essai, sources EU mises au catalogue de ce test seulement (comme la ligne
     ZZ de rejets.js), retirées ensuite. Ils viennent après l'autre appareil, et l'id les départage : « a » (Essai B) avant « b » (Essai A),
     à rebours de leur code et du croquis. La douche « z » et l'autre appareil « y » passent avant eux malgré leur id. Porteur : la
     douche, puis le type d'essai « b » */
  V.TYPES.essaiA = {id: 'essaiA', fam: 'eu', lib: 'Essai A', ab: 'EA', nat: 'EU', role: 'source', forme: 'app', autre: 'Essai A'};
  V.TYPES.essaiB = {id: 'essaiB', fam: 'eu', lib: 'Essai B', ab: 'EB', nat: 'EU', role: 'source', forme: 'app', autre: 'Essai B'};
  try {
    const att = 'Salle de bain\ndouche, autre appareil, essai B, essai A';
    for (const [por, n, avant] of [['z', 'la douche', att.split('\n')[1]], ['b', 'le type d\'essai « b »', 'essai A, douche, autre appareil, essai B']]){
      const d = rangee([['b', 'essaiA'], ['a', 'essaiB'], ['y', 'autre_eu'], ['z', 'douche']].map(([id, t]) => [id, t, id === por ? {} : {etiqAvec: por}]));
      const x = etiquettesDe(d), vides = Object.keys(x).filter(k => k !== por).every(k => x[k] === '');
      R.ok(x[por] === att && vides, 'c10 deux types d\'essai absents de l\'ordre, après l\'autre appareil et départagés par l\'id, porteur ' + n + ' → ' + js(att)
        + ', membres sans étiquette (v1.7.1 : « ' + avant + ' » ; obtenu ' + js(x[por]) + (vides ? '' : ', ' + js(x)) + ')');
    }
  } finally { delete V.TYPES.essaiA; delete V.TYPES.essaiB; }
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
    for (const g of [g1, g1bis, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, c1, c2, c3, c4, c5, c6, c7, c9, c10]){
      try { await g(); } catch (e){ R.ok(false, g.name + ' : exception : ' + (e && e.stack || e).toString().split('\n').slice(0, 3).join(' | ')); }
    }
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
