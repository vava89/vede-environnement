// Table commune des exutoires (décision D1 de .claude/conception-rejets.md ; m116), sans navigateur : une ligne de VCroquis.EXU suffit à un exutoire
// (réseau de la couleur, libellé du rejet, règle d'une source EU, place au constat), lue par son code (codeExu : la partie avant le premier
// « : »). Croquis fictifs (12 rue Fictive, Ville-Exemple) ; la ligne ZZ et les types d'essai n'existent que dans ce test.
// a1 : VCroquis.EXU porte INF, GARG et MILIEU, avec les libellés du rejet d'avant (EXU_LIB) mot pour mot ; libExu rend aussi ceux des
//   réseaux EU, EP et unitaire.
// a2 : une ligne ZZ ajoutée à VCroquis.EXU et un type d'essai (exu 'ZZ') suffisent : tuyau EP (resPiece et resPt 'EP' ; à l'écran, tuyau
//   et étiquette verts) ; libellé du rejet tiré de la table (libExu, « Rejet constaté » du plan PDF, message « relié à plusieurs réseaux »),
//   jamais le code ; anomalie eu-zz pour un WC relié ; constat : lignes du WC et de la descente d'après la table (code, libellé, case des
//   ouvrages de récupération des EP). Témoin : le même dessin vers un puisard.
// a3 : le même type avec exu 'ZZ:ESSAI' (clé imitée d'une destination ajoutée) : mêmes résultats ; descente → regard (tampon béton, sans
//   cunette) → type d'essai, en Tronçon, en Tronçon EP, puis en avant-projet avec un Tronçon EP laissé libre au regard : regard EP, seule
//   anomalie « Regard EP : tampon béton », en réserve, ni « contredit » ni « sortielibre » (sans codeExu : tampon et cunette NC).
// Échouent sur 52cd3c8 (VCroquis.EXU et VCroquis.libExu absentes) : a1, a2 et a3, sauf les témoins (puisard ; rejet de la source).
// Infiltration au sol (décisions D2 et D8 ; m117) :
// r1 : le type (famille des exutoires, « posée », droit, non orienté), sa place dans la palette Équipements (juste après le puisard), la ligne SOL
//   de la table ; le symbole : un masque (disque blanc sans trait), puis une tige et trois barres de plus en plus courtes, toutes tracées, dans
//   le disque ; rayon 2,1.
// r2 : plan tourné d'un demi-radian : le symbole reste droit à l'écran et au PDF, même avec un angle propre venu d'un fichier (p.a = 30 ; un
//   changement de type vers l'infiltration, lui, efface l'angle) ; au DXF, l'INSERT prend la rotation du plan. Témoins : un regard non orienté
//   reste penché, à l'écran et au PDF. (L'aperçu de pose : navigateur/rejets.js, n1.)
// r3 : DXF : bloc VEDE_INFILTRATION sans disque plein (le masque est sauté), INSERT sur VEDE-SYMBOLES en couleur 3, tuyau sur VEDE-EP, étiquette
//   en couleur 3 ; à l'écran, tuyau et étiquette verts.
// r4 : plan PDF : « Infiltration au sol » une fois à la légende ; « infiltration au sol » dans la colonne « Rejet constaté » de la page 2, jamais
//   le code SOL ; avant-projet : « Reste après travaux : WC : rejet au sol (infiltration) ».
// r5 : constat : la descente coche « Infiltration diffuse » (case infil), conforme ; le WC est en MILIEU, non conforme. Au dossier, l'anomalie
//   eu-sol créée pour le WC va sur la ligne « WC » du constat (règle de REGLES_LIGNE). Témoin : le même dessin vers un puisard (eu-inf).
// r6 (garde) : sans le type (croquis d'une version plus récente), écran, PDF et DXF sans exception, bloc VEDE_OBJET.
// Échouent sur 2f3faa1 (type « infiltration » absent) : r1 à r5, sauf les témoins (en r2, le regard penché à l'écran et au PDF ; en r5, le
//   puisard). r6 y passe.
// Arbitrage (m119, consigne du 13 nov. 2026 : une anomalie à arbitrer n'est jamais comptée conforme) :
// z1 : regard sans tampon (à arbitrer d'office) : conclusion « tampon » (plan : « À compléter : regard sans tampon à arbitrer ») ; la ligne
//   du WC, que l'anomalie du regard ne vise pas, garde sa conformité.
// z2 : descente non visitable mise à arbitrer : « arbitrer » ; la ligne de la descente garde son code EP_D, ok null, marquée « à arbitrer »
//   (rows[].arbitrer) ; fiche de la descente « en attente » (VCroquis.etatSource) ; vers un puisard, la case puisard reste. Témoin : retenue.
// z3 : tampon béton en EP (réserve) mis à arbitrer : « arbitrer » (témoins : retenue « reserves », écartée « conformes »).
// z4 : anomalie saisie à la main sur le WC, à arbitrer : « arbitrer », ligne du WC à ok null ; témoins : retenue, écartée, sans objet.
// z5 : sans boîte, à arbitrer : « boite » ; avec une NC retenue : « non_conformes » ; sans boîte retenue : « non_conformes » ; écartée : « conformes ».
// z6 (garde) : ep-eu retenue et dep-nv à arbitrer : ligne EU_D, ok false, non conforme. z7 : deux anomalies à arbitrer : « plusieurs ».
// z8 (garde) : aucun appareil sur le plan, tampon béton EU mis à arbitrer : aucune conclusion (« sans objet »), comme avant : le code
//   d'arbitrage remplace seulement « Conformes » et « Conformes avec réserves ». Témoin : retenu, « non_conformes ».
// z9 : WC vers une fosse peut-être traversée (fosse:F, posée sur la fosse, « à arbitrer » d'office) : ligne du WC marquée « à arbitrer »,
//   comme celle d'une descente (ep-fosse) ; témoins : fosse retenue (FOSSE « non »), écartée (EU_D « oui »), descente.
// Échouent sur e728d76 par le comportement (conclusion « conformes », ligne conforme ou sans marque) : z1 à z5, z7 et z9, sauf le témoin
//   de z1 et la seconde vérification de z5 (NC retenue, retenue, écartée). z6 et le témoin « retenue » de z2 (gardes) n'y échouent que
//   parce que VCroquis.etatSource y est absente. z8 y passe. z9 échoue aussi sur la première version de m119 (ligne du WC sans marque).
// Puits (m120, décision du 13 nov. 2026 : un rejet EP dans un puits est une non-conformité ; décisions D6 à D9) :
// q1 : descente vers un puits : ep-puits retenue d'office, « Non conformes », fiche « anomalie n° 1 » ; au constat, ligne en MILIEU, ok null
//   (le dossier la juge par l'anomalie), aucune case des ouvrages EP ; écartée : « conformes », ligne « oui » ; mise à arbitrer :
//   « arbitrer », ligne MILIEU gardée, ok null, marquée « à arbitrer » (m119) ; WC vers un puits : eu-puits, ligne MILIEU « non ».
// q2 : le type (après « Rejet en milieu naturel » dans la palette Équipements, rappel du puits perdu), la ligne PUITS de la table (règles
//   EU et EP non conformes, cat « inversion » et « autre », place MILIEU), le symbole (deux cercles concentriques verts, rayon 2,1, l'intérieur
//   loin de celui du puisard) ; DXF : bloc VEDE_PUITS de deux cercles, INSERT sur VEDE-SYMBOLES, tuyau sur VEDE-EP ; écran : tuyau et
//   étiquette verts ; plan PDF : « Puits » une fois à la légende, « puits · anomalie n° … » au « Rejet constaté » de la page 2.
// q3 : avant-projet qui garde le puits : préconisation au tableau, « Reste après travaux : Descente EP : rejet dans un puits » ; témoin : le
//   rejet supprimé par le projet, plus rien ne reste ; au dossier (reconcilier), ep-puits créée en catégorie « autre », sur la ligne
//   « Gouttière(s) avant », non conforme, case gestEP.
// Échouent sur 7df0996 (type « puits » absent) : q1 à q3, sauf le témoin de q3.
// Autre destination (m125, décisions D3, D5 à D7 ; objets écrits dans le croquis ; dans la palette Équipements depuis m127, juste après « Puits ») :
// x1 : constat déduit d'une descente vers un étang aux EP non conformes, ep-exu retenue : ligne ok null (le dossier la juge par l'anomalie),
//   case « autre » des ouvrages EP, « Étang (rejet des EP) », fiche « Rejet : étang · anomalie n° 1 » ; écartée, ou EP conformes : ligne
//   « oui » ; EP à arbitrer : « exu » (« À compléter : rejet des eaux pluviales à arbitrer »), ok null, ligne marquée « à arbitrer » (m119),
//   contrôle « manque » qui demande de retenir ou d'écarter l'anomalie, aucun une fois décidée (retenue : NC) ; case MILIEU ou GARG du
//   constat : son code (milieu naturel : en EP « Milieu naturel », aucune case EP) ; WC vers un étang à case GARG : MILIEU, non conforme,
//   eu-exu (codes raccEUsep).
// x2 : descente vers deux étangs identiques (noms égaux une fois normalisés) : un seul exutoire (ok) ; un étang et un puisard : « multiple » ;
//   deux « Étang » de jugements des EP différents : « relié à plusieurs réseaux (étang (conforme), étang (à arbitrer)) », de mêmes jugements
//   et de cases différentes : la case.
// x3 : le même plan (deux destinations de même clé, une autre) dessiné dans quatre ordres (objets et tracés) : même an.exu, mêmes rejets ;
//   un plan sans destination n'a pas de clé an.exu (garde).
// x4 (m126, décisions D8 et D9) : le symbole d'une destination est un hexagone vert de rayon 2,1, blanc dedans, qui porte l'abréviation.
//   « Étang » (Ét) et « Fossé » (Fo), chacun au bout d'une descente : blocs VEDE_EXUTOIRE_ET et VEDE_EXUTOIRE_FO du DXF (hexagone et
//   abréviation ; INSERT sur VEDE-SYMBOLES, couleur 3) ; au plan PDF, deux lignes de légende, chacune avec son hexagone et son
//   abréviation, et « étang » en page 2 ; à l'écran, hexagone et abréviations en vert. Nom « Étang <b> & "x" » et abréviation « <& » :
//   écrits tels quels à l'écran et au PDF, en CP1252 au DXF (bloc VEDE_EXUTOIRE___) ; l'abréviation échappée en HTML (symboleSvg). Le
//   nom n'entre pas dans le symbole : son échappement en HTML se vérifie dans la fiche de la descente (navigateur/constat-boite.js, cas 14).
//   Abréviations « Ét » et « Et » : VEDE_EXUTOIRE_ET puis VEDE_EXUTOIRE_ET_2. Sans nom ni abréviation : « Autre destination (Au) »,
//   VEDE_EXUTOIRE_AU. Noms longs : la ligne de légende finit à 287 mm au plus (filets du cartouche) ; 40 majuscules en taille réduite
//   (5,5 pt au moins), nom entier ; 40 « W » en 5,5 pt, nom coupé (« … »), abréviation gardée ; témoin : « Étang (Ét) » en 7,2 pt.
//   Abréviation illisible au PDF (« ΩΩ », un émoji, « Ω » et un émoji ; m128) : destDe prend les deux premiers caractères du nom, « Ét »,
//   au symbole comme à la légende du plan PDF (« Étang (Ét) ») ; « <& » (lisible) reste. Échoue sur b6e3e3c (« ΩΩ » gardée, rien d'écrit).
//   Nom « 💧 Mare » (accepté par la fiche), abréviation absente, illisible ou qui n'est pas du texte : ses deux premiers caractères sont
//   illisibles aussi ; destDe prend les deux premiers que le PDF sait écrire, « Ma », comme la fiche, au symbole et à la légende
//   (« Mare (Ma) »). Échoue sur b6e3e3c et sur la première version de m128 (« 💧 » gardé, légende « Mare () »).
// x5 : avant-projet qui garde l'étang aux EP non conformes : préconisation au tableau du plan PDF, « Reste après travaux : Descente EP : rejet
//   dans l'étang » ; témoin : le rejet supprimé par le projet, plus rien ne reste ; au dossier (reconcilier), ep-exu créée en catégorie
//   « autre », sur la ligne « Gouttière(s) avant », non conforme, case gestEP.
// x6 (m127, D3 : le jugement suit la fiche) : nature au dossier du rejet d'une descente dans l'étang quand le jugement des EP change. Le
//   dossier est simulé comme par vcAppliquer : à la création, la nature n'est écrite que si elle diffère de la règle de l'application (ici
//   VCroquis.ncAnomalie, qui juge un « rejet » non conforme, comme anomNC) ou de celle du dessin (croquis.auto.nc). « Non conforme » puis
//   « Réserve » ; « Non conforme », « Conforme » (anomalie retirée, gardée en copie), puis « Réserve » ; « Non conforme », « À arbitrer »,
//   puis « Réserve » : le dossier dit « réserve » et la conclusion « reserves ». Témoins : « Réserve » d'abord, puis « Non conforme » ou un
//   retour ; copie dont le texte retouché au dossier faisait une réserve : elle revient en réserve.
// x6 échoue sur 9f2b32d (jugement changé à la main) et sur la première version de m127 : le dossier restait non conforme, sauf les témoins.
// x7 (m127) : même dossier simulé, sous la règle de l'application (norm, NC_MOTIFS et anomNC lus dans index.html, qu'elle installe dans
//   VCroquis.ncAnomalie) ; nature au dessin / au dossier après chaque geste. Le dessin n'impose au dossier qu'un jugement (une nature que
//   cette règle ne donne pas sur le texte du dessin), jamais une réserve hors EP : il l'écrit quand il en change et quand l'enregistrement
//   revient en EP ; une nature écrite qui suivait le dessin est effacée (la règle) quand il passe à une nature qui n'est pas un jugement ;
//   une nature écrite reste quand le réseau change au dossier. Tampon béton d'un regard dont le texte, retouché au dossier ou au croquis,
//   nomme un défaut (« fissuré », « cassé »), puis regard passé en EP (en place, « non conforme » écrit au dossier, aller et retour EP, EU,
//   EP, par une copie écartée puis retenue) : non conforme. Rejet dans l'étang passé en EU au dossier, puis « Réserve » (en place, par une
//   copie), ou « Réserve » (écrite ou à la création), EU au dossier, « Non conforme », « Réserve » : non conforme ; revenu en EP au dossier
//   (en place, par une copie, après « Conforme », puis aller et retour du jugement) : réserve. Texte du rejet retouché au dossier en réserve
//   (« … tampon béton »), avant ou après « Réserve », puis « Non conforme » (en place, copie gardée sous l'un ou l'autre jugement, passage
//   par « À arbitrer », aller et retour ; ou au croquis pendant que l'anomalie est écartée, retenue de sa copie) : la réserve de ce texte ;
//   « Réserve », puis texte rendu « … rejet dans l'étang » : réserve.
//   Témoins : le même par « À arbitrer » seulement ; copie d'une nature écrite au dossier, dessin inchangé : elle la garde ; « Réserve »
//   puis « Non conforme », à texte égal ou reformulé (« … dans l'étang communal »), en place et par une copie : le dossier suit le jugement.
// x7 échoue sur la deuxième version de m127 (le dessin imposait toute nature changée), sauf les témoins ; sur la troisième (une nature
//   écrite qui suivait le dessin en prenait toute nature, le jugement n'était écrit qu'au changement du dessin), les treize cas ajoutés
//   ensuite hors témoins ; sur 419d752 (m126), ces treize cas et les trois témoins du jugement suivi (le dossier restait non conforme).
// Échouent sur ebd5589 (type « exutoire » absent : bout libre) : x1, x2, x3 et x5, sauf la garde de x3 et le témoin de x5.
// Échouent sur 4a55a83 (cercle par défaut sans texte, bloc VEDE_EXUTOIRE, légende « Autre destination », symboleSvg sans p) : les onze
//   cas de x4. « étang » en page 2 et l'étiquette (le nom écrit tel quel) y étaient déjà justes.
// n1 à n7 (m144, décision D10 ; réponses du 16 nov. 2026, S6 b et S7 a) : destinations de même nom refusées, noms proches, « Fosse ».
// n1 : 42 paires de noms (21 de même nom, 5 proches, 16 différentes), dans les deux sens : degreDest ; canonDest et distDest sur
//   quelques exemples ; le premier nom tapé dans « + Nouvelle destination » face au modèle de l'autre : même nom refusé, nom proche :
//   la question, sinon accepté.
// n2 : etang, ETANG, L'étang, Étangs, « étang » face au modèle Étang : refusés dans la palette (« choisissez-la dans la palette »,
//   champ nom), dans les Réglages (« existe déjà dans la liste ») et dans la fiche (« écrivez « Étang » pour la même »). Témoins :
//   sans listes, accepté, résultat inchangé ({m, refus}) ; Réglages, nom inchangé : accepté.
// n3 : Fosse, FOSSE, fosse, La fosse, Fosses, avec ou sans un modèle Fossé : « Pour une fosse septique, posez l'objet Fosse septique ;
//   pour un fossé, écrivez « Fossé ». » dans la palette, les Réglages et la fiche ; « Fossé » seul : accepté (témoin) ; Fossé, fossé,
//   Fossés, FOSSÉ, le Fossé face au modèle Fossé : refusés ; « Fosse du puits », « Puits » : le refus du puits d'abord. Fiche d'une
//   ancienne Fosse, face à une autre Fosse posée et au modèle Fosse : « Fossé » accepté (même clé de rejet), « fosse » refusé.
// n4 (garde) : modelesDe garde Étang et etang, Fosse, Fossé et fossé, Puisard (les dossiers et la tablette ne sont pas filtrés).
// n5 : destination Étang posée sur le plan, absente de la palette : même nom exact, même abréviation (saisie ou vide), mêmes jugements :
//   accepté ; autre jugement, autre case, autre abréviation, etang, Étangs : « déjà posée sur ce plan ». Fiche de la Mare : « Étang »,
//   mêmes jugements : reprise (abréviation « Ét », article « l' ») ; autre jugement : « déjà posée » ; « etang » : « écrivez « Étang » ».
//   Fiche : la destination posée d'autres jugements passe avant le modèle de mêmes jugements (« déjà posée » ; témoin : sans elle, le
//   modèle est repris). Palette : l'abréviation laissée vide reprend celle de la destination posée (EG) ; une autre, tapée : « déjà
//   posée ». Fiche d'une Etang posée, face à une autre Etang posée et au modèle Etang : Étang, ÉTANG acceptés (même clé de rejet) ;
//   Étangs, ou sans le nom d'avant : « écrivez « Etang » » ; l'autre déjà écrite Étang : reprise.
// n6 : nom proche (Fossé de la rue, de la route) : la question dans la palette (modèle, puis destination posée), dans la fiche et dans les
//   Réglages ; « La même », « Une autre » : l'outil du modèle ou de la destination, les cinq champs repris (une seule clé et un seul
//   rejet au constat : « 1 clé(s) ; Fossé de la route (rejet des EP) »), le nom tapé gardé ; dans les Réglages, « La même » : rien
//   d'enregistré, le toast « existe déjà dans la liste ».
// n7 : objets de la palette : « Puisart » : la question face à l'objet Puisard dans les trois lieux, chaque réponse (l'outil de l'objet,
//   l'ancien nom gardé avec le refus, dans les Réglages rien d'enregistré, avec le même refus) ; Puisard, puisards, Gargouile,
//   « l'infiltration au sol », Rejet en milieu naturel, Fosse septique, Autre destination : « est un objet de la palette ».
// Échouent sur 769d1af : n1 à n3, n5 à n7, sauf les témoins de n2 et de n3 et l'acceptation de n5 ; n4 y passe. Échouent sur m144
//   tel que relu (avant ses corrections) : les cas des relectures M1, M5 et M7 (n3, n5) et les Réglages de n6 et de n7 (M3, M9).
// usage : node tests/vm/rejets.js [-v] [--app=<dossier>]
'use strict';
const fs = require('fs'), path = require('path');
const {charger, doc, copie, rendus, rapport, melange} = require('./charger.js');
const ch = charger({pdf: true}), {V} = ch, R = rapport('rejets'), {canevas, dessiner, pdf, dxf} = rendus(ch);
/* appel protégé : une exception devient le texte « exception : … » */
const sur = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };
const VERT = 'rgb(' + V.RES.EP.rgb.join(',') + ')';
const libExu = (res, an) => typeof V.libExu === 'function' ? sur(() => V.libExu(res, an)) : 'VCroquis.libExu absente';

/* a1 : les trois lignes d'aujourd'hui */
function lignes(){
  const LIB = {INF: 'puisard (infiltration)', GARG: 'gargouille', MILIEU: 'milieu naturel'}, X = V.EXU;
  const vus = X && typeof X === 'object' ? Object.keys(LIB).map(k => k + ' ' + JSON.stringify(X[k] && X[k].lib)).join(', ') : 'VCroquis.EXU absente';
  R.ok(!!X && Object.keys(LIB).every(k => X[k] && X[k].lib === LIB[k]), 'a1 VCroquis.EXU : INF, GARG et MILIEU, libellés d\'EXU_LIB mot pour mot (' + vus + ')');
  const RESX = {EU: 'réseau EU', EP: 'réseau EP', UN: 'réseau unitaire'}, l = Object.keys(LIB).concat(Object.keys(RESX)).map(k => libExu(k));
  R.ok(JSON.stringify(l) === JSON.stringify(Object.values(LIB).concat(Object.values(RESX))), 'a1 libExu : exutoires et réseaux (' + l.join(' ; ') + ')');
}

/* ligne d'essai, de la forme de celles du code, et deux types d'essai qui la portent : code simple et clé imitée */
const ZZ = {lib: 'exutoire de test', res: 'EP',
  eu: {cle: 'eu-zz', obs: 'rejet à l\'exutoire de test', preco: 'Suppression du rejet à l\'exutoire de test et raccordement au branchement EU', nc: true,
    codes: ['raccEUsep'], cat: 'inversion'},
  cEU: {code: 'MILIEU', lib: 'Exutoire de test : rejet au sol'}, cEP: {code: '', lib: 'Exutoire de test (infiltration)', recup: 'infil'}};
function poserEssai(){
  /* sans table (version d'avant), la ligne va dans un objet que l'application ne lit pas : les vérifications montrent ce qui manque */
  const X = V.EXU && typeof V.EXU === 'object' ? V.EXU : {};
  X.ZZ = ZZ;
  V.TYPES.essai = {id: 'essai', fam: 'exu', lib: 'Exutoire de test', role: 'exutoire', forme: 'puisard', exu: 'ZZ'};
  V.TYPES.essaiCle = {id: 'essaiCle', fam: 'exu', lib: 'Exutoire de test', role: 'exutoire', forme: 'puisard', exu: 'ZZ:ESSAI'};
}

/* WC et descente avant vers l'exutoire Z (type t, au sud), en Tronçon ; l'étiquette de l'exutoire est affichée */
function versExu(t){
  const d = doc({o: [['W', 'wc', 0, 6], ['Z', t, 0, 0], ['D', 'descente', 6, 6, {cote: 'avant'}]], l: [['T1', 'tr', '', '', ['W', 'Z']], ['T2', 'tr', '', '', ['D', 'Z']]]});
  d.el.find(e => e.id === 'Z').lab = null;
  return d;
}
/* le WC relié aussi au collecteur EU (par une jonction) : plusieurs réseaux */
const deuxReseaux = t => doc({o: [['W', 'wc', 0, 6], ['Z', t, 0, 0], ['j', 'jonction', 6, 0, {}]],
  l: [['T1', 'tr', '', '', ['W', 'Z']], ['T3', 'tr', '', '', ['W', 'j']], ['C', 'col', 'EU', '', [[6, -10], 'j', [6, 10]]]]});

/* ce que l'application fait d'un exutoire : analyse, anomalie du WC, écran, plan PDF, contrôle « plusieurs réseaux », constat */
async function releve(t){
  const d = versExu(t), an = V.analyser(copie(d), 'edl'), cd = V.constatDeduit(copie(d), an), out = {an};
  out.resObj = an.resObj.W ? an.resObj.W.etat + ' ' + an.resObj.W.res : 'absent';
  out.resPt = an.resPt.Z;
  out.resPiece = Object.keys(an.resPiece).filter(k => /^T1:/.test(k)).map(k => an.resPiece[k].res).join(' ');
  out.eu = an.anomalies.filter(a => a.objId === 'W').map(a => ({cle: a.cle, reseau: a.reseau, obs: a.obs, preco: a.preco, nc: a.nc, codes: a.codes, cat: a.cat}));
  out.lib = libExu(an.resObj.W ? an.resObj.W.res : null, an);
  const e = sur(() => dessiner(d, 20, [3, 3]));
  out.tuyau = typeof e === 'string' ? e : [...new Set(e.traits.filter(q => Math.abs(q.a.x) < 1e-6 && Math.abs(q.b.x) < 1e-6).map(q => q.coul))].join(' ');
  out.etiq = typeof e === 'string' ? e : (e.textes.find(x => x.t === V.TYPES[t].lib) || {}).coul;
  const p = await pdf(d, {mode: 'edl'});
  out.pdf = p.err.length ? p.err.join(' | ') : p.txt.filter(s => /^(exutoire de test|puisard \(infiltration\)|ZZ)/.test(s)).join(' | ');
  out.pdfCode = p.txt.some(s => /\bZZ\b/.test(s));
  const am = V.analyser(copie(deuxReseaux(t)), 'edl'), cm = am.controles.find(c => c.cle === 'multi:W');
  out.multi = cm ? cm.txt : 'aucun contrôle multi:W (' + (am.resObj.W ? am.resObj.W.etat : '?') + ')';
  const rw = cd.rows.find(r => r.id === 'wc'), rd = cd.rows.find(r => r.id === 'gout_av');
  out.cWC = rw ? rw.codes.join(',') + ' | ' + rw.libs.join(' ; ') + ' | ' + rw.conforme : 'ligne absente';
  out.cDesc = rd ? rd.raccord + ' | ' + rd.libs.join(' ; ') + ' | ' + rd.conforme : 'ligne absente';
  out.recup = JSON.stringify(cd.epRecup);
  return out;
}

/* a2, a3 : l'exutoire d'essai, comme un puisard d'après sa ligne de la table */
async function essai(n, t){
  const o = await releve(t), q = '« exutoire de test »';
  R.ok(o.resObj === 'ok ' + V.TYPES[t].exu, n + ' témoin : rejet du WC, la clé entière de l\'exutoire (' + o.resObj + ')');
  R.ok(o.resPt === 'EP' && o.resPiece === 'EP', n + ' tuyau EP : resPiece ' + JSON.stringify(o.resPiece) + ', resPt ' + JSON.stringify(o.resPt));
  R.ok(o.tuyau === VERT && o.etiq === '#00813b', n + ' à l\'écran : tuyau et étiquette de l\'exutoire en vert des EP (tuyau ' + o.tuyau + ', étiquette ' + o.etiq + ')');
  const a = o.eu.length === 1 ? o.eu[0] : null;
  R.ok(!!a && a.cle === 'eu-zz:W' && a.reseau === 'EU' && a.obs === 'WC : rejet à l\'exutoire de test' && a.preco === ZZ.eu.preco && a.nc === true
    && JSON.stringify(a.codes) === '["raccEUsep"]' && a.cat === 'inversion', n + ' WC relié : anomalie eu-zz de la table, seule (' + JSON.stringify(o.eu) + ')');
  R.ok(o.lib === 'exutoire de test', n + ' libExu : ' + q + ' (obtenu ' + JSON.stringify(o.lib) + ')');
  R.ok(/^exutoire de test/.test(o.pdf) && !o.pdfCode, n + ' plan PDF, « Rejet constaté » : ' + q + ', jamais le code (' + o.pdf + ')');
  R.ok(/\(.*exutoire de test.*\)/.test(o.multi) && !/ZZ/.test(o.multi), n + ' relié à plusieurs réseaux : ' + q + ' dans le message (' + o.multi + ')');
  R.ok(o.cWC === 'MILIEU | Exutoire de test : rejet au sol | non' && o.cDesc === ' | Exutoire de test (infiltration) | oui' && o.recup === '{"infil":true}',
    n + ' constat d\'après la table : WC ' + JSON.stringify(o.cWC) + ', descente ' + JSON.stringify(o.cDesc) + ', ouvrages EP ' + o.recup);
}
async function temoin(){
  const o = await releve('puisard');
  const a = o.eu.length === 1 ? o.eu[0] : {};
  R.ok(o.resPt === 'EP' && o.resPiece === 'EP' && o.tuyau === VERT && o.etiq === '#00813b' && a.cle === 'eu-inf:W' && a.obs === 'WC : rejet dans un puisard'
    && /^puisard \(infiltration\)/.test(o.pdf) && /\(.*puisard \(infiltration\).*\)/.test(o.multi)
    && o.cWC === 'MILIEU | Puisard : rejet au sol (milieu naturel) | non' && o.cDesc === ' | Puisard (infiltration à la parcelle) | oui' && o.recup === '{"puisard":true}',
    'a2 témoin, le même dessin vers un puisard : ' + JSON.stringify({resPt: o.resPt, resPiece: o.resPiece, tuyau: o.tuyau, etiq: o.etiq, eu: a.cle, pdf: o.pdf,
      multi: o.multi, cWC: o.cWC, cDesc: o.cDesc, recup: o.recup}));
}

/* a3 : descente → regard (tampon béton, sans cunette) → exutoire d'essai à clé imitée ; tronçons de réseau res ; libre : un Tronçon EP
   laissé libre au regard */
function regard(res, libre, mode){
  const l = [['T1', 'tr', res, '', ['D', 'R']], ['T2', 'tr', res, '', ['R', 'Z']]];
  if (libre) l.push(['T3', 'tr', 'EP', '', ['R', [4, 4]]]);
  const d = doc({o: [['D', 'descente', 0, 8, {cote: 'avant'}], ['R', 'regard', 0, 4, {tampon: 'beton', cunette: 'non'}], ['Z', 'essaiCle', 0, 0]], l});
  const an = V.analyser(copie(d), mode), A = an.anomalies, C = an.controles.filter(c => /^(contredit|sortielibre):/.test(c.cle));
  const ok = an.resPt.R === 'EP' && A.length === 1 && A[0].cle === 'tampon:R' && A[0].obs === 'Regard EP : tampon béton' && A[0].nc === false && !C.length;
  R.ok(ok, 'a3 descente → regard → exutoire à clé imitée, ' + (res ? 'Tronçon ' + res : 'Tronçon') + (libre ? ', un Tronçon EP laissé libre au regard' : '')
    + (mode === 'avp' ? ', avant-projet' : '') + ' : regard EP, seule anomalie « Regard EP : tampon béton » en réserve, ni contredit ni sortielibre (regard '
    + an.resPt.R + ' ; ' + A.map(a => a.cle + ' « ' + a.obs + ' » ' + (a.nc ? 'NC' : 'réserve')).join(', ') + (C.length ? ' ; ' + C.map(c => c.cle).join(', ') : '') + ')');
}

/* ---------- m117 : infiltration au sol ---------- */
const EPC = V.RES.EP.rgb.join(','), axe = (a, b) => Math.abs(a.x - b.x) < 1e-6 || Math.abs(a.y - b.y) < 1e-6;
/* angle d'un segment de l'écran (degrés, y vers le haut) */
const deg = t => Math.round(Math.atan2(-(t.b.y - t.a.y), t.b.x - t.a.x) * 180 / Math.PI);

/* r1 : le type, sa place, sa ligne de la table, son symbole */
function symbole(){
  const T = V.TYPES.infiltration, eq = (V.FAMILLES.find(f => f.id === 'equ') || {types: []}).types, X = V.EXU && V.EXU.SOL;
  R.ok(!!T && T.fam === 'exu' && T.lib === 'Infiltration au sol' && T.g === 'f' && T.role === 'exutoire' && T.forme === 'infiltration' && T.exu === 'SOL'
    && T.droit === true && !T.oriente, 'r1 type « infiltration » : exutoire, « posée », droit, non orienté (' + JSON.stringify(T || null) + ')');
  R.ok(eq.indexOf('puisard') >= 0 && eq[eq.indexOf('puisard') + 1] === 'infiltration', 'r1 palette Équipements : juste après le puisard (' + eq.join(', ') + ')');
  R.ok(!!X && X.lib === 'infiltration au sol' && X.res === 'EP' && X.eu.cle === 'eu-sol' && X.eu.obs === 'rejet au sol (infiltration)' && X.eu.nc === true
    && X.eu.cat === 'inversion' && X.cEU.code === 'MILIEU' && X.cEP.code === '' && X.cEP.recup === 'infil', 'r1 table des exutoires, ligne SOL (' + JSON.stringify(X || null) + ')');
  const r = V.rayonSymbole('infiltration'), P = V.primitives({k: 'pt', t: 'infiltration', p: {st: 'existant', obs: ''}}, V.RES.EP.rgb, 0);
  const M = P.filter(q => q.masque), L = P.filter(q => !q.masque), seg = L.filter(q => q.k === 'p' && !q.f && q.pts.length === 4);
  const vert = seg.filter(q => q.pts[0] === q.pts[2]), hor = seg.filter(q => q.pts[1] === q.pts[3]).sort((a, b) => b.pts[1] - a.pts[1]);
  const larg = hor.map(q => Math.abs(q.pts[2] - q.pts[0])), dedans = seg.every(q => Math.hypot(q.pts[0], q.pts[1]) <= r + 1e-9 && Math.hypot(q.pts[2], q.pts[3]) <= r + 1e-9);
  R.ok(r === 2.1 && M.length === 1 && P[0] === M[0] && M[0].k === 'c' && M[0].r === r && String(M[0].fond) === '255,255,255' && !M[0].trait
    && L.length === 4 && seg.length === 4 && L.every(q => String(q.trait) === EPC && q.ep > 0) && vert.length === 1 && hor.length === 3
    && larg[0] > larg[1] && larg[1] > larg[2] && dedans,
    'r1 symbole : masque blanc sans trait en premier, puis une tige et trois barres de plus en plus courtes, tracées, dans le disque ; rayon 2,1 (rayon '
    + r + ' ; ' + P.map(q => q.k + (q.masque ? ' masque' : '') + (q.trait ? ' trait' : '') + (q.pts ? ' ' + q.pts.map(v => +v.toFixed(2)).join(',') : ' r ' + q.r)).join(' | ') + ')');
}

/* r2 : plan tourné ; I : infiltration ; J : infiltration avec un angle propre venu d'un fichier ; G : regard non orienté (témoin) */
async function droit(){
  const d = doc({o: [['I', 'infiltration', 0, 0], ['J', 'infiltration', 8, 0, {a: 30}], ['G', 'regard', 0, 8]]}); d.rot = .5;
  const an = V.analyser(copie(d), 'edl'), vue = new V.Vue(800, 600); vue.s = 20; vue.cx = 4; vue.cy = 4; vue.rot = d.rot;
  const cv = canevas(), ex = sur(() => { V.dessinerCroquis(cv.ctx, copie(d), an, vue, 1, {}); return ''; });
  /* traits de l'écran autour de l'objet id (pixels) */
  const pres = id => { const e = d.el.find(x => x.id === id), c = vue.ecran(e.x, e.y);
    return cv.traits.filter(t => Math.hypot(t.a.x - c.x, t.a.y - c.y) < 14 && Math.hypot(t.b.x - c.x, t.b.y - c.y) < 14); };
  [['I', 'sans angle propre'], ['J', 'avec p.a = 30']].forEach(([id, q]) => {
    const s = pres(id), v = s.filter(t => Math.abs(t.a.x - t.b.x) < 1e-6), h = s.filter(t => Math.abs(t.a.y - t.b.y) < 1e-6);
    R.ok(!ex && s.length === 4 && v.length === 1 && h.length === 3 && s.every(t => t.coul === VERT),
      'r2 écran, plan tourné : infiltration ' + q + ', tige verticale et barres horizontales, en vert (' + (ex || s.map(t => deg(t) + '° ' + t.coul).join(', ') || 'aucun trait') + ')');
  });
  const g = pres('G');
  R.ok(g.length === 4 && g.every(t => !axe(t.a, t.b)), 'r2 témoin à l\'écran : le regard non orienté reste penché (' + g.map(deg).join('°, ') + '°)');
  const p = await pdf(d, {mode: 'edl'}), f = p.formes.filter(q => q.coul === EPC && !q.ferme && q.pts.length === 2), pe = f.filter(q => !axe(q.pts[0], q.pts[1]));
  R.ok(!p.err.length && f.length >= 12 && !pe.length, 'r2 PDF, plan tourné : traits verts des symboles (deux au plan, un à la légende) droits ('
    + (p.err.join(' | ') || f.length + ' traits, ' + pe.length + ' penchés') + ')');
  const c = p.formes.filter(q => q.ferme && q.pts.length === 4 && Math.abs(Math.hypot(q.pts[1].x - q.pts[0].x, q.pts[1].y - q.pts[0].y) - 3.2) < .01);
  R.ok(c.some(q => !axe(q.pts[0], q.pts[1])), 'r2 témoin au PDF : le carré du regard reste penché au plan (' + c.length + ' carrés de 3,2 mm, '
    + c.filter(q => !axe(q.pts[0], q.pts[1])).length + ' penchés)');
  const x = dxf(d), ins = x.ents.filter(e => e.type === 'INSERT' && e.c['2'] === 'VEDE_INFILTRATION'), rd = d.rot * 180 / Math.PI;
  R.ok(ins.length === 2 && ins.every(e => Math.abs(+e.c['50'] - rd) < 1e-3), 'r2 DXF : les deux INSERT VEDE_INFILTRATION à la rotation du plan, ' + rd.toFixed(4)
    + '° (' + (ins.map(e => e.c['50']).join(', ') || 'aucun ; blocs ' + x.blocs.join(', ')) + ')');
}

/* entités d'un bloc du DXF (type et codes), entre BLOCK et ENDBLK ; null si le bloc manque */
function blocDxf(texte, nom){
  const L = texte.split('\n'), out = []; let dans = false, e = null;
  for (let i = 0; i + 1 < L.length; i += 2){
    const c = L[i].trim(), v = L[i + 1];
    if (c === '0'){ if (dans && v === 'ENDBLK') return out; e = {type: v, c: {}}; if (dans) out.push(e); continue; }
    if (e && e.type === 'BLOCK' && c === '2' && v === nom) dans = true;
    if (e && !(c in e.c)) e.c[c] = v;
  }
  return dans ? out : null;
}
/* descente avant D → infiltration I ; l'étiquette de l'infiltration est affichée */
function versSol(){
  const d = doc({o: [['D', 'descente', 0, 6, {cote: 'avant'}], ['I', 'infiltration', 0, 0]], l: [['T1', 'tr', '', '', ['D', 'I']]]});
  d.el.find(e => e.id === 'I').lab = null;
  return d;
}
/* r3 : DXF et couleurs */
function rendu(){
  const d = versSol(), x = dxf(d), b = blocDxf(x.texte, 'VEDE_INFILTRATION'), pl = (b || []).filter(q => q.type === 'POLYLINE');
  const disques = pl.filter(q => '40' in q.c || (+q.c['70'] & 1) === 1);
  R.ok(!!b && pl.length === 4 && !disques.length && !b.some(q => q.type === 'CIRCLE'), 'r3 DXF : bloc VEDE_INFILTRATION, quatre polylignes ouvertes, sans disque plein ('
    + (b ? b.filter(q => !/^(VERTEX|SEQEND)$/.test(q.type)).map(q => q.type + (q.type === 'POLYLINE' ? ' 70=' + q.c['70'] + ('40' in q.c ? ' 40=' + q.c['40'] : '') : '')).join(', ')
      : 'bloc absent ; blocs ' + x.blocs.join(', ')) + ')');
  const ins = x.ents.find(e => e.type === 'INSERT' && e.c['2'] === 'VEDE_INFILTRATION');
  R.ok(!!ins && ins.cal === 'VEDE-SYMBOLES' && +ins.c['62'] === 3, 'r3 DXF : INSERT sur VEDE-SYMBOLES, couleur 3 (' + (ins ? ins.cal + ', ' + ins.c['62'] : 'absent') + ')');
  const tu = x.ents.filter(e => e.type === 'POLYLINE');
  R.ok(tu.length === 1 && tu[0].cal === 'VEDE-EP', 'r3 DXF : tuyau sur VEDE-EP (' + tu.map(e => e.cal).join(', ') + ')');
  const tx = x.ents.find(e => e.type === 'TEXT' && e.c['1'] === 'Infiltration au sol');
  R.ok(!!tx && +tx.c['62'] === 3, 'r3 DXF : étiquette « Infiltration au sol » en couleur 3 (' + (tx ? tx.cal + ', ' + tx.c['62'] : 'absente') + ')');
  const e = sur(() => dessiner(d, 20, [0, 3]));
  const tuy = typeof e === 'string' ? e : [...new Set(e.traits.filter(q => Math.abs(q.a.x) < 1e-6 && Math.abs(q.b.x) < 1e-6 && Math.abs(q.a.y - q.b.y) > 1).map(q => q.coul))].join(' ');
  const et = typeof e === 'string' ? e : (e.textes.find(q => q.t === 'Infiltration au sol') || {}).coul;
  R.ok(tuy === VERT && et === '#00813b', 'r3 écran : tuyau et étiquette verts (tuyau ' + tuy + ', étiquette ' + et + ')');
}

/* WC W et descente D vers l'exutoire I de type t (une infiltration par défaut) ; étiquettes masquées */
const wcEtDescente = (t = 'infiltration') => doc({o: [['W', 'wc', 0, 6], ['I', t, 0, 0], ['D', 'descente', 6, 6, {cote: 'avant'}]],
  l: [['T1', 'tr', '', '', ['W', 'I']], ['T2', 'tr', '', '', ['D', 'I']]]});
/* r4 : légende, page 2, contrôle de l'avant-projet */
async function planPdf(){
  const d = wcEtDescente(), p = await pdf(d, {mode: 'edl'}), n = p.txt.filter(s => s === 'Infiltration au sol').length;
  R.ok(!p.err.length && n === 1, 'r4 légende du plan : « Infiltration au sol » une fois (' + (p.err.join(' | ') || n + ' fois') + ')');
  const rej = p.txt.filter(s => /^infiltration au sol/.test(s)), code = p.txt.filter(s => /\bSOL\b/.test(s));
  R.ok(rej.indexOf('infiltration au sol') >= 0 && rej.some(s => /^infiltration au sol · anomalie n° \d/.test(s)) && !code.length,
    'r4 page 2, « Rejet constaté » : descente et WC vers « infiltration au sol », jamais le code (' + rej.concat(code).map(s => JSON.stringify(s)).join(', ') + ')');
  const a = await pdf(d, {mode: 'avp'}), reste = a.txt.filter(s => /^Reste après travaux/.test(s));
  R.ok(!a.err.length && reste.indexOf('Reste après travaux : WC : rejet au sol (infiltration)') >= 0,
    'r4 avant-projet sans travaux, contrôle : « Reste après travaux : WC : rejet au sol (infiltration) » (' + (a.err.join(' | ') || reste.join(' ; ') || 'rien') + ')');
}

/* r5 : constat déduit du croquis ; ligne du constat de l'anomalie créée au dossier */
function constat(){
  const d = wcEtDescente(), an = V.analyser(copie(d), 'edl'), cd = V.constatDeduit(copie(d), an);
  const rw = cd.rows.find(r => r.id === 'wc'), rd = cd.rows.find(r => r.id === 'gout_av');
  const w = rw ? rw.codes.join(',') + ' | ' + rw.libs.join(' ; ') + ' | ' + rw.conforme : 'ligne absente', ds = rd ? rd.raccord + ' | ' + rd.libs.join(' ; ') + ' | ' + rd.conforme : 'ligne absente';
  R.ok(ds === ' | Infiltration au sol (infiltration diffuse) | oui' && JSON.stringify(cd.epRecup) === '{"infil":true}',
    'r5 constat, descente : « Infiltration diffuse » cochée, raccordement à cocher, conforme (' + JSON.stringify(ds) + ', ouvrages EP ' + JSON.stringify(cd.epRecup) + ')');
  R.ok(w === 'MILIEU | Infiltration au sol : rejet au sol (milieu naturel) | non', 'r5 constat, WC : MILIEU, non conforme (' + JSON.stringify(w) + ')');
  /* au dossier (reconcilier) : sans la règle dans REGLES_LIGNE, l'anomalie partirait sans ligne (installation vide). Témoin : vers un puisard */
  [['infiltration', 'eu-sol:W'], ['puisard', 'eu-inf:W']].forEach(([t, cle]) => {
    const ops = sur(() => V.reconcilier(wcEtDescente(t), null, [])), cr = typeof ops === 'string' ? [] : ops.creer;
    const c = cr.find(x => x.croquis && x.croquis.cle === cle);
    R.ok(!!c && c.installation === 'wc' && c.croquis.auto.installation === 'wc' && c.nc === true,
      'r5 dossier' + (t === 'puisard' ? ', témoin vers un puisard' : '') + ' : l\'anomalie ' + cle + ' créée va sur la ligne « WC » du constat, non conforme ('
      + (typeof ops === 'string' ? ops : cr.map(x => (x.croquis && x.croquis.cle) + ' ' + JSON.stringify(x.installation) + (x.nc ? ' NC' : ' réserve')).join(', ') || 'rien de créé') + ')');
  });
}

/* ---------- m119 : une anomalie à arbitrer n'est jamais comptée conforme (consigne du 13 nov. 2026) ---------- */
/* bout du branchement : boîte du réseau res (B), puis regard public (Rp) sur le collecteur res */
const auBout = res => ({o: [['B', 'boite', 0, 4, {res}], ['Rp', 'regard_pub', 0, 0, {res}]], l: [['tB', 'tr', '', '', ['B', 'Rp']], ['C', 'col', res, '', [[-10, 0], 'Rp', [10, 0]]]]});
/* source S (type t, propriétés p) → [regard R aux propriétés pr] → boîte du réseau res */
function versBoite(t, p, res, pr){
  const b = auBout(res), o = [['S', t, 0, 10, p || {}]], l = [];
  if (pr){ o.push(['R', 'regard', 0, 7, pr]); l.push(['t1', 'tr', '', '', ['S', 'R']], ['t2', 'tr', '', '', ['R', 'B']]); }
  else l.push(['t1', 'tr', '', '', ['S', 'B']]);
  return doc({o: o.concat(b.o), l: l.concat(b.l)});
}
/* WC relié par une jonction au collecteur EU, sans boîte (anomalie sansboite:C:EU, « à arbitrer » d'office) ; pr : un regard R en chemin ;
   plus : objets et tracés de plus */
function sansBoite(pr, plus){
  const o = [['S', 'wc', 0, 10], ['j', 'jonction', 0, 0, {}]], l = [['C', 'col', 'EU', '', [[-10, 0], 'j', [10, 0]]]];
  if (pr){ o.push(['R', 'regard', 0, 7, pr]); l.push(['t1', 'tr', '', '', ['S', 'R']], ['t2', 'tr', '', '', ['R', 'j']]); }
  else l.push(['t1', 'tr', '', '', ['S', 'j']]);
  return doc({o: o.concat(plus ? plus.o : []), l: l.concat(plus ? plus.l : [])});
}
/* le même croquis avec les décisions dec ({clé : état}) et les anomalies saisies à la main manu */
function decide(d, dec, manu){
  Object.keys(dec || {}).forEach(k => { d.decisions[k] = {st: dec[k]}; });
  if (manu) d.anomManu = manu;
  return d;
}
/* anomalie fictive saisie à la main, d'état st, sur l'objet objId (aucun : sans objet) */
const aLaMain = (st, objId) => [Object.assign({id: 'm1', reseau: 'EU', obs: 'Anomalie fictive saisie à la main', preco: '', nc: true, st}, objId ? {objId} : {})];
/* ce que l'application tire d'un croquis : état des anomalies, conclusion proposée (VCroquis.conclusion, plan PDF), ligne du constat (codes,
   ok de chaque appareil, conformité, marque « à arbitrer » ; libellés à part), ouvrages EP, fiche de la source S (VCroquis.etatSource) */
async function bilan(d, ligne){
  const an = V.analyser(copie(d), 'edl'), l = V.anomaliesDoc(copie(d), an, null), cd = V.constatDeduit(copie(d), an), r = cd.rows.find(x => x.id === ligne);
  const p = await pdf(d, {mode: 'edl'}), cp = p.txt.filter(s => /^Conclusion (proposée|du constat)/.test(s));
  const es = typeof V.etatSource === 'function' ? sur(() => V.etatSource(copie(d), an, l, 'edl', 'S')) : 'VCroquis.etatSource absente';
  return {st: l.map(a => a.cle + ' ' + a.st).join(', '), c: V.conclusion(l, an), plan: p.err.join(' | ') || cp.join(' | '),
    ligne: r ? r.codes.join(',') + ' | ' + JSON.stringify(r.oks) + ' | ' + JSON.stringify(r.conforme) + (r.arbitrer ? ' | à arbitrer' : '') : 'ligne absente',
    libs: r ? r.libs.join(' ; ') : '', recup: JSON.stringify(cd.epRecup), etat: es && typeof es === 'object' ? es.cls + ' « ' + es.txt + ' »' : String(es)};
}
const vu = (o, k) => JSON.stringify(k ? k.reduce((m, x) => Object.assign(m, {[x]: o[x]}), {}) : o);
const CP = 'Conclusion proposée : ', DEP = 'Rejet : réseau EP départemental', WCR = 'Rejet : réseau EU départemental';
async function arbitrage(){
  /* z1 : regard sans tampon (« à arbitrer » d'office) entre le WC et la boîte EU */
  let o = await bilan(versBoite('wc', {}, 'EU', {tampon: 'absent'}), 'wc');
  R.ok(o.st === 'sanstampon:R arbitrer' && o.c === 'tampon' && o.plan === CP + 'À compléter : regard sans tampon à arbitrer',
    'z1 regard sans tampon à arbitrer : conclusion « tampon », au plan « À compléter : regard sans tampon à arbitrer » (' + vu(o, ['st', 'c', 'plan']) + ')');
  R.ok(o.ligne === 'EU_D | [true] | "oui"', 'z1 témoin : la ligne du WC, que l\'anomalie du regard ne vise pas, garde sa conformité (' + vu(o, ['ligne']) + ')');
  /* z2 : descente non visitable (NC) mise « à arbitrer » par l'opérateur ; témoin : retenue (d'office) */
  o = await bilan(decide(versBoite('descente', {visitable: 'non'}, 'EP'), {'dep-nv:S': 'arbitrer'}), 'gout_av');
  R.ok(o.st === 'dep-nv:S arbitrer' && o.c === 'arbitrer' && o.plan === CP + 'À compléter : une anomalie reste à arbitrer',
    'z2 descente non visitable à arbitrer : conclusion « arbitrer », au plan « À compléter : une anomalie reste à arbitrer » (' + vu(o, ['st', 'c', 'plan']) + ')');
  R.ok(o.ligne === 'EP_D | [null] | "" | à arbitrer' && o.libs === 'Réseau EP départemental',
    'z2 constat : la ligne de la descente garde son raccordement (EP_D), ok null, ni conforme ni non conforme, marquée « à arbitrer » (' + vu(o, ['ligne', 'libs']) + ')');
  R.ok(o.etat === 'att « ' + DEP + ' · anomalie à arbitrer »', 'z2 fiche de la descente : en attente, « anomalie à arbitrer » (' + o.etat + ')');
  o = await bilan(versBoite('descente', {visitable: 'non'}, 'EP'), 'gout_av');
  R.ok(o.st === 'dep-nv:S retenue' && o.c === 'non_conformes' && o.ligne === 'EP_D | [true] | "oui"' && o.etat === 'ko « ' + DEP + ' · anomalie n° 1 »',
    'z2 témoin, retenue : non conformes, ligne inchangée (le dossier la rend non conforme par l\'anomalie), fiche « anomalie n° 1 » (' + vu(o, ['st', 'c', 'ligne', 'etat']) + ')');
  const verP = d => decide(doc({o: [['S', 'descente', 0, 10, {visitable: 'non'}], ['P', 'puisard', 0, 4]], l: [['t1', 'tr', '', '', ['S', 'P']]]}), d);
  o = await bilan(verP({'dep-nv:S': 'arbitrer'}), 'gout_av');
  R.ok(o.c === 'arbitrer' && o.ligne === ' | [null] | "" | à arbitrer' && o.libs === 'Puisard (infiltration à la parcelle)' && o.recup === '{"puisard":true}',
    'z2 vers un puisard : « arbitrer », ligne marquée sans conformité, la case puisard reste (' + vu(o, ['c', 'ligne', 'libs', 'recup']) + ')');
  /* z3 : réserve (tampon béton d'un regard EP) mise à arbitrer ; témoins : retenue (réserves), écartée (conformes) */
  const z3 = dec => bilan(decide(versBoite('descente', {}, 'EP', {tampon: 'beton'}), dec), 'gout_av');
  o = await z3({'tampon:R': 'arbitrer'});
  const o3r = await z3({}), o3e = await z3({'tampon:R': 'ecartee'});
  R.ok(o.st === 'tampon:R arbitrer' && o.c === 'arbitrer' && o.plan === CP + 'À compléter : une anomalie reste à arbitrer' && o3r.c === 'reserves' && o3e.c === 'conformes',
    'z3 tampon béton en EP (réserve) à arbitrer : « arbitrer » ; retenue : « reserves » ; écartée : « conformes » (' + vu({arbitrer: [o.st, o.c, o.plan], retenue: o3r.c, ecartee: o3e.c}) + ')');
  /* z4 : anomalie saisie à la main sur le WC, à arbitrer ; témoins : retenue, écartée, à arbitrer sans objet */
  const z4 = (st, objId) => bilan(decide(versBoite('wc', {}, 'EU'), {}, aLaMain(st, objId)), 'wc');
  o = await z4('arbitrer', 'S');
  R.ok(o.c === 'arbitrer' && o.ligne === 'EU_D | [null] | "" | à arbitrer' && o.etat === 'att « ' + WCR + ' · anomalie à arbitrer »',
    'z4 anomalie saisie à la main sur le WC, à arbitrer : « arbitrer », ligne du WC à ok null et marquée, fiche en attente (' + vu(o, ['c', 'ligne', 'etat']) + ')');
  const o4r = await z4('retenue', 'S'), o4e = await z4('ecartee', 'S'), o4s = await z4('arbitrer');
  R.ok(o4r.c === 'non_conformes' && o4r.ligne === 'EU_D | [true] | "oui"' && /^ko /.test(o4r.etat) && o4e.c === 'conformes' && o4e.ligne === 'EU_D | [true] | "oui"'
    && o4s.c === 'arbitrer' && o4s.ligne === 'EU_D | [true] | "oui"',
    'z4 témoins : retenue « non_conformes » (fiche ko), écartée « conformes », à arbitrer sans objet « arbitrer » sans ligne marquée ('
    + vu({retenue: [o4r.c, o4r.ligne, o4r.etat], ecartee: [o4e.c, o4e.ligne], sansObjet: [o4s.c, o4s.ligne]}) + ')');
  /* z5 : branchement sans boîte (à arbitrer d'office) : seul ; avec une NC retenue (descente non visitable vers un puisard) ; retenu ; écarté */
  const nv = {o: [['D', 'descente', 6, 10, {visitable: 'non'}], ['P', 'puisard', 6, 4]], l: [['t3', 'tr', '', '', ['D', 'P']]]};
  const o5 = await bilan(sansBoite(), 'wc'), o5n = await bilan(sansBoite(null, nv), 'wc');
  const o5r = await bilan(decide(sansBoite(), {'sansboite:C:EU': 'retenue'}), 'wc'), o5e = await bilan(decide(sansBoite(), {'sansboite:C:EU': 'ecartee'}), 'wc');
  R.ok(o5.st === 'sansboite:C:EU arbitrer' && o5.c === 'boite' && o5.plan === CP + 'À compléter : absence de boîte de branchement à arbitrer',
    'z5 sans boîte, à arbitrer : « boite », au plan « À compléter : absence de boîte de branchement à arbitrer » (' + vu(o5, ['st', 'c', 'plan']) + ')');
  R.ok(o5n.c === 'non_conformes' && o5r.c === 'non_conformes' && o5e.c === 'conformes' && o5e.plan === CP + 'Conformes',
    'z5 avec une NC retenue : « non_conformes » ; sans boîte retenue : « non_conformes » ; écartée : « conformes » (' + vu({nc: o5n.c, retenue: o5r.c, ecartee: [o5e.c, o5e.plan]}) + ')');
  /* z6 (garde) : descente non visitable reliée à la boîte EU : ep-eu retenue, dep-nv à arbitrer : la ligne reste non conforme */
  o = await bilan(decide(versBoite('descente', {visitable: 'non'}, 'EU'), {'dep-nv:S': 'arbitrer'}), 'gout_av');
  R.ok(o.st === 'ep-eu:S retenue, dep-nv:S arbitrer' && o.c === 'non_conformes' && /^EU_D \| \[false\] \| "non"/.test(o.ligne) && /^ko /.test(o.etat),
    'z6 (garde) ep-eu retenue et dep-nv à arbitrer : non conformes, ligne EU_D à ok false, fiche ko (' + vu(o, ['st', 'c', 'ligne', 'etat']) + ')');
  /* z7 : branchement sans boîte et regard sans tampon, tous deux à arbitrer */
  o = await bilan(sansBoite({tampon: 'absent'}), 'wc');
  R.ok(o.st === 'sansboite:C:EU arbitrer, sanstampon:R arbitrer' && o.c === 'plusieurs' && o.plan === CP + 'À compléter : plusieurs anomalies restent à arbitrer',
    'z7 deux anomalies à arbitrer : « plusieurs », au plan « À compléter : plusieurs anomalies restent à arbitrer » (' + vu(o, ['st', 'c', 'plan']) + ')');
  /* z8 (garde) : aucun appareil sur le plan, regard EU au tampon béton (NC) mis à arbitrer : rien n'est proposé, comme avant (« sans objet ») ;
     témoin : retenue, « non_conformes » */
  const z8 = dec => { const b = auBout('EU'); return bilan(decide(doc({o: [['R', 'regard', 0, 7, {tampon: 'beton'}]].concat(b.o), l: [['t2', 'tr', '', '', ['R', 'B']]].concat(b.l)}), dec), 'wc'); };
  o = await z8({'tampon:R': 'arbitrer'});
  const o8r = await z8({});
  R.ok(o.st === 'tampon:R arbitrer' && o.c === '' && o.plan === CP + 'sans objet' && o8r.st === 'tampon:R retenue' && o8r.c === 'non_conformes',
    'z8 (garde) sans appareil, tampon béton à arbitrer : aucune conclusion (« sans objet ») ; retenu : « non_conformes » (' + vu({arbitrer: [o.st, o.c, o.plan], retenue: [o8r.st, o8r.c]}) + ')');
  /* z9 : WC vers une fosse peut-être traversée (une arrivée laissée libre dans le regard d'amont), « à arbitrer » d'office : l'anomalie
     fosse:F est posée sur la fosse, mais la ligne du WC est marquée, comme celle d'une descente (ep-fosse:S) ; témoins : retenue, écartée */
  const z9 = (t, dec) => { const r = t === 'wc' ? 'EU' : 'EP';
    return bilan(decide(doc({o: [['S', t, 0, 12, t === 'wc' ? {} : {cote: 'avant'}], ['R1', 'regard', 0, 8], ['F', 'fosse', 0, 5], ['R3', 'regard', 0, 2]],
      l: [['L1', 'tr', r, '', ['S', 'R1']], ['A', 'tr', r, '', ['R1', 'F']], ['B', 'tr', r, '', ['F', 'R3']], ['Sx', 'tr', r, '', ['R3', [0, -2]]], ['Arr', 'tr', r, '', [[-5, 8], 'R1'], 0]]}), dec),
      t === 'wc' ? 'wc' : 'gout_av'); };
  o = await z9('wc', {});
  R.ok(o.st === 'fosse:F arbitrer' && o.c === 'fosse' && o.ligne === ' | [null] | "" | à arbitrer' && /^Fosse septique à arbitrer/.test(o.libs) && /^att .* · fosse septique à arbitrer/.test(o.etat),
    'z9 WC vers une fosse peut-être traversée, à arbitrer : conclusion « fosse », ligne du WC sans code ni conformité, marquée « à arbitrer », fiche en attente ('
    + vu(o, ['st', 'c', 'ligne', 'libs', 'etat']) + ')');
  const o9r = await z9('wc', {'fosse:F': 'retenue'}), o9e = await z9('wc', {'fosse:F': 'ecartee'}), o9d = await z9('descente', {});
  R.ok(o9r.ligne === 'FOSSE | [false] | "non"' && o9e.ligne === 'EU_D | [true] | "oui"' && o9d.st === 'ep-fosse:S arbitrer' && o9d.ligne === ' | [null] | "" | à arbitrer',
    'z9 témoins : fosse retenue, ligne FOSSE « non » ; écartée, EU_D « oui », sans marque ; descente vers la fosse, marquée (' + vu({retenue: o9r.ligne, ecartee: o9e.ligne, descente: [o9d.st, o9d.ligne]}) + ')');
}

/* ---------- m120 : puits (décision du 13 nov. 2026 : un rejet EP dans un puits est une non-conformité) ---------- */
/* source S (type t) reliée par un tronçon sans réseau au puits W, avec les décisions dec */
const versPuits = (t, dec) => decide(doc({o: [['S', t, 0, 10], ['W', 'puits', 0, 4]], l: [['t1', 'tr', '', '', ['S', 'W']]]}), dec);
const RPU = 'Rejet : puits', PUL = 'Puits : rejet en milieu naturel', PRE_EP = 'Suppression du rejet dans le puits ; raccordement au branchement EP ou gestion à la parcelle';
/* q1 : constat déduit, conclusion et fiche de la source : ep-puits retenue d'office, écartée, mise à arbitrer ; WC vers un puits */
async function puitsConstat(){
  const o = await bilan(versPuits('descente'), 'gout_av');
  R.ok(o.st === 'ep-puits:S retenue' && o.c === 'non_conformes' && o.plan === CP + 'Non conformes' && o.etat === 'ko « ' + RPU + ' · anomalie n° 1 »',
    'q1 descente vers un puits : ep-puits retenue d\'office, « Non conformes », fiche « anomalie n° 1 » (' + vu(o, ['st', 'c', 'plan', 'etat']) + ')');
  R.ok(o.ligne === 'MILIEU | [null] | ""' && o.libs === PUL && o.recup === '{}',
    'q1 constat : la ligne de la descente en MILIEU, ok null (le dossier la juge par l\'anomalie), aucune case des ouvrages EP (' + vu(o, ['ligne', 'libs', 'recup']) + ')');
  const e = await bilan(versPuits('descente', {'ep-puits:S': 'ecartee'}), 'gout_av');
  R.ok(e.st === 'ep-puits:S ecartee' && e.c === 'conformes' && e.ligne === 'MILIEU | [true] | "oui"' && e.etat === 'ok « ' + RPU + ' »',
    'q1 anomalie écartée dans Contrôles : « conformes », ligne MILIEU « oui », fiche ok (' + vu(e, ['st', 'c', 'ligne', 'etat']) + ')');
  const a = await bilan(versPuits('descente', {'ep-puits:S': 'arbitrer'}), 'gout_av');
  R.ok(a.st === 'ep-puits:S arbitrer' && a.c === 'arbitrer' && a.plan === CP + 'À compléter : une anomalie reste à arbitrer' && a.ligne === 'MILIEU | [null] | "" | à arbitrer'
    && a.etat === 'att « ' + RPU + ' · anomalie à arbitrer »',
    'q1 mise à arbitrer : « arbitrer », ligne MILIEU gardée, ok null, marquée « à arbitrer » ; fiche en attente (' + vu(a, ['st', 'c', 'plan', 'ligne', 'etat']) + ')');
  const w = await bilan(versPuits('wc'), 'wc');
  R.ok(w.st === 'eu-puits:S retenue' && w.c === 'non_conformes' && w.ligne === 'MILIEU | [false] | "non"' && w.libs === PUL,
    'q1 WC vers un puits : eu-puits retenue, ligne du WC en MILIEU, non conforme (' + vu(w, ['st', 'c', 'ligne', 'libs']) + ')');
}
/* q2 : le type, sa place, la ligne PUITS de la table, le symbole ; DXF, couleurs, légende et page 2 du plan PDF */
async function puitsRendu(){
  const T = V.TYPES.puits, eq = (V.FAMILLES.find(f => f.id === 'equ') || {types: []}).types, X = V.EXU && V.EXU.PUITS;
  R.ok(!!T && T.fam === 'exu' && T.lib === 'Puits' && T.role === 'exutoire' && T.forme === 'puits' && T.exu === 'PUITS' && !T.g && !T.droit && !T.oriente
    && T.rappel === 'Un puits perdu (qui infiltre les eaux) se dessine en Puisard.',
    'q2 type « puits » : exutoire PUITS, ni droit ni orienté, avec le rappel du puits perdu (' + JSON.stringify(T || null) + ')');
  R.ok(eq.indexOf('milieu') >= 0 && eq[eq.indexOf('milieu') + 1] === 'puits', 'q2 palette Équipements : juste après « Rejet en milieu naturel » (' + eq.join(', ') + ')');
  R.ok(!!(X && X.eu && X.ep && X.cEU && X.cEP) && X.lib === 'puits' && X.res === 'EP' && X.eu.cle === 'eu-puits' && X.eu.obs === 'rejet dans un puits' && X.eu.nc === true
    && X.eu.cat === 'inversion' && X.eu.codes.join() === 'raccEUsep' && X.eu.preco === 'Suppression du rejet dans le puits et raccordement au branchement EU'
    && X.ep.cle === 'ep-puits' && X.ep.obs === 'rejet dans un puits' && X.ep.nc === true && X.ep.cat === 'autre' && X.ep.codes.join() === 'gestEP' && X.ep.preco === PRE_EP
    && X.cEU.code === 'MILIEU' && X.cEU.lib === PUL && X.cEP.code === 'MILIEU' && X.cEP.lib === PUL && !X.cEP.recup,
    'q2 table des exutoires, ligne PUITS : règles EU et EP non conformes, place MILIEU au constat (' + JSON.stringify(X || null) + ')');
  /* symbole : deux cercles concentriques verts, tracés, l'extérieur blanc dedans (rayon 2,1) ; l'intérieur nettement plus grand que celui
     du puisard, pour ne pas les confondre */
  const prim = t => V.primitives({k: 'pt', t, p: {st: 'existant', obs: ''}}, V.RES.EP.rgb, 0), P = prim('puits'), Q = prim('puisard');
  const cer = P.filter(q => q.k === 'c');
  R.ok(V.rayonSymbole('puits') === 2.1 && P.length === 2 && cer.length === 2 && cer[0].r === 2.1 && String(cer[0].fond) === '255,255,255' && !cer[1].fond
    && cer[1].r < 2.1 && Q.length === 2 && cer[1].r - Q[1].r >= .4 && cer.every(q => q.x === 0 && q.y === 0 && String(q.trait) === EPC && q.ep > 0 && !q.masque),
    'q2 symbole : deux cercles concentriques verts, rayon 2,1, l\'intérieur loin de celui du puisard (rayon ' + V.rayonSymbole('puits') + ' ; '
    + P.map(q => q.k + ' r ' + q.r + (q.fond ? ' fond ' + q.fond : '') + (q.trait ? ' trait ' + q.trait : '')).join(' | ') + ' ; puisard ' + Q.map(q => q.r).join(', ') + ')');
  /* DXF : bloc VEDE_PUITS (les deux cercles), INSERT sur VEDE-SYMBOLES en couleur 3, tuyau sur VEDE-EP, étiquette « Puits » en couleur 3 */
  const d = doc({o: [['D', 'descente', 0, 6, {cote: 'avant'}], ['I', 'puits', 0, 0]], l: [['T1', 'tr', '', '', ['D', 'I']]]});
  d.el.find(q => q.id === 'I').lab = null;
  const x = dxf(d), b = blocDxf(x.texte, 'VEDE_PUITS'), ci = (b || []).filter(q => q.type === 'CIRCLE');
  const ins = x.ents.find(q => q.type === 'INSERT' && q.c['2'] === 'VEDE_PUITS'), tu = x.ents.filter(q => q.type === 'POLYLINE'), tx = x.ents.find(q => q.type === 'TEXT' && q.c['1'] === 'Puits');
  R.ok(!!b && b.length === 2 && ci.length === 2 && ci.map(q => +q.c['40']).join() === cer.map(q => q.r).join() && !!ins && ins.cal === 'VEDE-SYMBOLES' && +ins.c['62'] === 3
    && tu.length === 1 && tu[0].cal === 'VEDE-EP' && !!tx && +tx.c['62'] === 3,
    'q2 DXF : bloc VEDE_PUITS de deux cercles, INSERT sur VEDE-SYMBOLES en couleur 3, tuyau sur VEDE-EP, étiquette « Puits » en couleur 3 ('
    + (b ? b.map(q => q.type + ('40' in q.c ? ' ' + q.c['40'] : '')).join(', ') : 'bloc absent ; blocs ' + x.blocs.join(', ')) + ' ; ' + (ins ? ins.cal + ' ' + ins.c['62'] : 'INSERT absent')
    + ' ; ' + tu.map(q => q.cal).join(', ') + ' ; ' + (tx ? tx.cal + ' ' + tx.c['62'] : 'étiquette absente') + ')');
  const ec = sur(() => dessiner(d, 20, [0, 3]));
  const tuy = typeof ec === 'string' ? ec : [...new Set(ec.traits.filter(q => Math.abs(q.a.x) < 1e-6 && Math.abs(q.b.x) < 1e-6 && Math.abs(q.a.y - q.b.y) > 1).map(q => q.coul))].join(' ');
  const et = typeof ec === 'string' ? ec : (ec.textes.find(q => q.t === 'Puits') || {}).coul;
  R.ok(tuy === VERT && et === '#00813b', 'q2 écran : tuyau et étiquette verts (tuyau ' + tuy + ', étiquette ' + et + ')');
  /* plan PDF : légende, colonne « Rejet constaté » de la page 2 (WC et descente, chacun son anomalie), jamais le code */
  const p = await pdf(wcEtDescente('puits'), {mode: 'edl'}), n = p.txt.filter(s => s === 'Puits').length;
  const rej = p.txt.filter(s => /^puits\b/.test(s)), code = p.txt.filter(s => /\bPUITS\b/.test(s));
  R.ok(!p.err.length && n === 1 && rej.length === 2 && rej.every(s => /^puits · anomalie n° \d+$/.test(s)) && !code.length,
    'q2 plan PDF : « Puits » une fois à la légende ; « puits » au « Rejet constaté » de la page 2, pour le WC et la descente, jamais le code ('
    + (p.err.join(' | ') || n + ' fois ; ' + rej.concat(code).map(s => JSON.stringify(s)).join(', ')) + ')');
}
/* q3 : avant-projet qui garde le puits (aucun travaux) : la préconisation au tableau, « Reste après travaux » au contrôle du projet ; témoin :
   le tronçon vers le puits « à supprimer » et un tronçon « projet » vers une boîte EP « projet » : plus rien ne reste. Au dossier
   (reconcilier) : ep-puits créée, en catégorie « autre », sur la ligne « Gouttière(s) avant », non conforme */
async function puitsProjet(){
  const ctl = t => t.filter(s => /^(Reste après travaux|Après travaux)/.test(s));
  const a = await pdf(versPuits('descente'), {mode: 'avp'}), pr = a.txt.filter(s => /^Suppression du rejet dans le puits/.test(s));
  R.ok(!a.err.length && ctl(a.txt).indexOf('Reste après travaux : Descente EP : rejet dans un puits') >= 0 && pr.length === 1,
    'q3 avant-projet qui garde le puits : préconisation au tableau, « Reste après travaux : Descente EP : rejet dans un puits » ('
    + (a.err.join(' | ') || pr.concat(ctl(a.txt)).join(' ; ') || 'rien') + ')');
  const dT = doc({o: [['S', 'descente', 0, 10], ['W', 'puits', 0, 4], ['B', 'boite', 6, 4, {res: 'EP', st: 'projet'}]],
    l: [['t1', 'tr', '', 'supprimer', ['S', 'W']], ['t2', 'tr', '', 'projet', ['S', 'B']]]});
  const t = await pdf(dT, {mode: 'avp'});
  R.ok(!t.err.length && ctl(t.txt).join(' ; ') === 'Après travaux, le dessin ne fait plus apparaître d\'anomalie de raccordement.',
    'q3 témoin, rejet du puits supprimé par le projet : plus rien ne reste (' + (t.err.join(' | ') || ctl(t.txt).join(' ; ') || 'rien') + ')');
  const ops = sur(() => V.reconcilier(versPuits('descente'), null, [])), cr = typeof ops === 'string' ? [] : ops.creer;
  const c = cr.find(q => q.croquis && q.croquis.cle === 'ep-puits:S');
  R.ok(!!c && c.categorie === 'autre' && c.installation === 'gout_av' && c.nc === true && c.reseau === 'EP' && c.observation === 'Descente EP : rejet dans un puits'
    && c.preconisation === PRE_EP && c.croquis.codes.join() === 'gestEP' && c.croquis.auto.installation === 'gout_av',
    'q3 dossier : ep-puits créée, catégorie « autre », ligne « Gouttière(s) avant », non conforme, case gestEP ('
    + (typeof ops === 'string' ? ops : cr.map(q => (q.croquis && q.croquis.cle) + ' ' + q.categorie + ' ' + JSON.stringify(q.installation) + (q.nc ? ' NC' : ' réserve')).join(', ') || 'rien de créé') + ')');
}

/* ---------- m125 : autre destination (décisions D3, D5 à D7) ---------- */
/* champs d'une destination : « Étang » (ou le nom n), ab « Ét », article « l' », EP jugées ep, case cst du constat */
const etang = (ep, cst, n) => ({nom: n || 'Étang', ab: 'Ét', art: 'l\'', ep, cst: cst || 'autre'});
/* source S (type t) reliée par un tronçon sans réseau à la destination E aux champs p, avec les décisions dec */
const versDest = (t, p, dec) => decide(doc({o: [['S', t, 0, 10], ['E', 'exutoire', 0, 4, p]], l: [['t1', 'tr', '', '', ['S', 'E']]]}), dec);
const RET = 'Rejet : étang', ETL = 'Étang (rejet des EP)', PRE_X = 'Suppression du rejet dans l\'étang ; raccordement au branchement EP ou gestion à la parcelle';
/* contrôles « manque » qui demandent d'arbitrer un rejet */
const arbRejet = d => V.analyser(copie(d), 'edl').controles.filter(c => c.niveau === 'manque' && / à arbitrer \(retenir ou écarter l'anomalie\)$/.test(c.txt)).map(c => c.txt);
/* x1 : le type, dans la palette après le puits (m127) ; constat déduit, conclusion, fiche de la source, contrôle de l'arbitrage ; étiquette */
async function destConstat(){
  const T = V.TYPES.exutoire, eq = (V.FAMILLES.find(f => f.id === 'equ') || {types: []}).types, dp = sur(() => V.defautsPt('exutoire'));
  R.ok(!!T && T.fam === 'exu' && T.lib === 'Autre destination' && T.g === 'f' && T.role === 'exutoire' && T.forme === 'exutoire' && T.exu === 'X' && eq.indexOf('puits') >= 0 && eq[eq.indexOf('puits') + 1] === 'exutoire'
    && vu(dp) === vu({st: 'existant', obs: '', nom: 'Autre destination', ab: 'Au', art: 'l\'', ep: 'arbitrer', cst: 'autre'}),
    'x1 type « exutoire » (Autre destination, code X), dans la palette Équipements juste après « Puits » (m127) ; champs par défaut (' + JSON.stringify(T || null) + ' ; ' + eq.join(', ') + ' ; ' + vu(dp) + ')');
  /* modèle d'une pose (m127, D10) : ses cinq champs, nettoyés comme destDe les lit, rien d'autre ; sans effet sur un autre type */
  const dm = sur(() => V.defautsPt('exutoire', {nom: '  Mare  du bas ', ab: 'Ma', art: 'la', ep: 'reserve', cst: 'recup', st: 'projet', obs: 'x'}));
  const dz = sur(() => V.defautsPt('exutoire', {nom: 'Étang', ep: 'oui', cst: 'lac'})), dq = sur(() => V.defautsPt('puisard', etang('nc')));
  R.ok(vu(dm) === vu({st: 'existant', obs: '', nom: 'Mare du bas', ab: 'Ma', art: 'la', ep: 'reserve', cst: 'recup'})
    && vu(dz) === vu({st: 'existant', obs: '', nom: 'Étang', ab: 'Ét', art: 'le', ep: 'arbitrer', cst: 'autre'}) && vu(dq) === vu(V.defautsPt('puisard')),
    'x1 modèle de la pose (m127) : ses cinq champs, nettoyés, sans son statut ni son observation ; replis de destDe ; sans effet sur un puisard ('
    + vu(dm) + ' ; ' + vu(dz) + ' ; ' + vu(dq) + ')');
  const n = await bilan(versDest('descente', etang('nc')), 'gout_av'), p = await pdf(versDest('descente', etang('nc')), {mode: 'edl'});
  const rej = p.txt.filter(s => /^étang\b/.test(s)), cle = p.txt.filter(s => /X:|ETANG/.test(s));
  R.ok(n.st === 'ep-exu:S retenue' && n.c === 'non_conformes' && n.ligne === ' | [null] | ""' && n.libs === ETL && n.recup === '{"autre":true}'
    && n.etat === 'ko « ' + RET + ' · anomalie n° 1 »' && !p.err.length && rej.join() === 'étang · anomalie n° 1' && !cle.length,
    'x1 descente vers un étang aux EP non conformes, ep-exu retenue : ligne ok null, case « autre », « ' + ETL + ' », fiche « anomalie n° 1 », « étang » au « Rejet constaté » du plan PDF, jamais la clé ('
    + vu(n, ['st', 'c', 'ligne', 'libs', 'recup', 'etat']) + ' ; ' + (p.err.join(' | ') || rej.concat(cle).map(s => JSON.stringify(s)).join(', ')) + ')');
  const e = await bilan(versDest('descente', etang('nc'), {'ep-exu:S': 'ecartee'}), 'gout_av'), k = await bilan(versDest('descente', etang('conforme')), 'gout_av');
  R.ok(e.st === 'ep-exu:S ecartee' && e.c === 'conformes' && e.ligne === ' | [true] | "oui"' && e.recup === '{"autre":true}' && e.etat === 'ok « ' + RET + ' »'
    && k.st === '' && k.c === 'conformes' && k.ligne === ' | [true] | "oui"' && k.libs === ETL && k.recup === '{"autre":true}' && k.etat === 'ok « ' + RET + ' »',
    'x1 anomalie écartée, ou EP conformes : « conformes », ligne « oui » (' + vu(e, ['st', 'c', 'ligne', 'recup', 'etat']) + ' ; ' + vu(k, ['st', 'c', 'ligne', 'libs', 'recup', 'etat']) + ')');
  const a = await bilan(versDest('descente', etang('arbitrer')), 'gout_av'), m = arbRejet(versDest('descente', etang('arbitrer')));
  R.ok(a.st === 'ep-exu:S arbitrer' && a.c === 'exu' && a.plan === CP + 'À compléter : rejet des eaux pluviales à arbitrer' && a.ligne === ' | [null] | "" | à arbitrer'
    && a.etat === 'att « ' + RET + ' · anomalie à arbitrer »' && m.join(' ; ') === 'Descente EP : rejet dans l\'étang à arbitrer (retenir ou écarter l\'anomalie)',
    'x1 EP à arbitrer : « exu », ligne ok null marquée « à arbitrer », fiche en attente, contrôle « manque » (' + vu(a, ['st', 'c', 'plan', 'ligne', 'etat']) + ' ; ' + (m.join(' ; ') || 'aucun contrôle') + ')');
  const r = await bilan(versDest('descente', etang('arbitrer'), {'ep-exu:S': 'retenue'}), 'gout_av');
  const mr = arbRejet(versDest('descente', etang('arbitrer'), {'ep-exu:S': 'retenue'})), me = arbRejet(versDest('descente', etang('arbitrer'), {'ep-exu:S': 'ecartee'}));
  R.ok(r.st === 'ep-exu:S retenue' && r.c === 'non_conformes' && r.ligne === ' | [null] | ""' && !mr.length && !me.length,
    'x1 arbitrage décidé : retenue, non conforme, ligne ok null ; aucun contrôle « manque », retenue ou écartée (' + vu(r, ['st', 'c', 'ligne']) + ' ; ' + (mr.concat(me).join(' ; ') || 'aucun contrôle') + ')');
  const mi = await bilan(versDest('descente', etang('nc', 'MILIEU')), 'gout_av'), g = await bilan(versDest('descente', etang('conforme', 'GARG')), 'gout_av');
  R.ok(mi.ligne === 'MILIEU | [null] | ""' && mi.libs === 'Milieu naturel' && mi.recup === '{}' && g.ligne === 'GARG | [true] | "oui"' && g.libs === 'Gargouille' && g.recup === '{}',
    'x1 case MILIEU ou GARG : son code et son libellé, aucune case des ouvrages EP (' + vu(mi, ['ligne', 'libs', 'recup']) + ' ; ' + vu(g, ['ligne', 'libs', 'recup']) + ')');
  const w = await bilan(versDest('wc', etang('conforme', 'GARG')), 'wc'), aw = V.analyser(copie(versDest('wc', etang('conforme', 'GARG'))), 'edl').anomalies.find(x => x.cle === 'eu-exu:S');
  R.ok(w.st === 'eu-exu:S retenue' && w.c === 'non_conformes' && w.ligne === 'MILIEU | [false] | "non"' && w.libs === 'Étang : rejet en milieu naturel'
    && !!aw && aw.obs === 'WC : rejet dans l\'étang' && aw.preco === 'Suppression du rejet dans l\'étang et raccordement au branchement EU' && aw.codes.join() === 'raccEUsep' && aw.cat === 'inversion',
    'x1 WC vers un étang à case GARG : ligne du WC en MILIEU, non conforme, eu-exu (codes raccEUsep) (' + vu(w, ['st', 'c', 'ligne', 'libs']) + ' ; '
    + JSON.stringify(aw ? {obs: aw.obs, preco: aw.preco, codes: aw.codes, cat: aw.cat} : null) + ')');
  const et = q => sur(() => V.texteEtiquette({k: 'pt', t: 'exutoire', p: Object.assign({st: 'existant'}, q)}, null));
  const ets = [et(etang('nc')), et({}), et(Object.assign(etang('nc'), {st: 'projet'}))];
  R.ok(vu(ets) === vu(['Étang', 'Autre destination', 'Projet : Étang']), 'x1 étiquette du plan : le nom de la destination, sinon « Autre destination » (' + vu(ets) + ')');
}
/* x2 : descente S reliée par le regard R aux exutoires a et b ([id, type, x, y, champs]) : état de S, message « relié à plusieurs réseaux » */
const fourche = (a, b) => doc({o: [['S', 'descente', 0, 10], ['R', 'regard', 0, 7], a, b],
  l: [['t1', 'tr', '', '', ['S', 'R']], ['t2', 'tr', '', '', ['R', a[0]]], ['t3', 'tr', '', '', ['R', b[0]]]]});
const multi = d => { const an = V.analyser(copie(d), 'edl'), r = an.resObj.S, c = an.controles.find(x => /^multi:/.test(x.cle)); return {et: r.etat + (r.res ? ':' + r.res : ''), msg: c ? c.txt : ''}; };
function destPlusieurs(){
  const MSG = s => 'Descente EP : relié à plusieurs réseaux (' + s + ') : indiquer le sens d\'écoulement d\'un tronçon';
  const i = multi(fourche(['E1', 'exutoire', -3, 4, etang('conforme')], ['E2', 'exutoire', 3, 4, etang('conforme', 'autre', ' ÉTANG ')]));
  R.ok(i.et === 'ok:X:ETANG:conforme:autre' && !i.msg, 'x2 deux étangs identiques (« Étang », « ÉTANG » : même nom une fois normalisé) : un seul exutoire (' + vu(i) + ')');
  const p = multi(fourche(['E1', 'exutoire', -3, 4, etang('conforme')], ['P', 'puisard', 3, 4]));
  R.ok(p.et === 'multiple' && p.msg === MSG('étang, puisard (infiltration)'), 'x2 un étang et un puisard : « multiple » (' + vu(p) + ')');
  const j = multi(fourche(['E1', 'exutoire', -3, 4, etang('conforme')], ['E2', 'exutoire', 3, 4, etang('arbitrer')]));
  R.ok(j.et === 'multiple' && j.msg === MSG('étang (conforme), étang (à arbitrer)'), 'x2 deux « Étang » de jugements des EP différents : le jugement au message (' + vu(j) + ')');
  const c = multi(fourche(['E1', 'exutoire', -3, 4, etang('conforme', 'MILIEU')], ['E2', 'exutoire', 3, 4, etang('conforme')]));
  R.ok(c.et === 'multiple' && c.msg === MSG('étang (milieu naturel), étang (indéterminé/autres)'), 'x2 deux « Étang » de mêmes jugements, cases différentes : la case au message (' + vu(c) + ')');
}
/* x3 : deux destinations de même clé (E1 « ETANG », E2 « Étang ») et une autre (F), chacune au bout d'une descente ; dessin dans quatre ordres */
function destOrdre(){
  const d = doc({o: [['S1', 'descente', 0, 10], ['E2', 'exutoire', 0, 4, etang('conforme')], ['S2', 'descente', 8, 10], ['E1', 'exutoire', 8, 4, {nom: ' ETANG ', ab: 'ET', art: 'le', ep: 'conforme', cst: 'autre'}],
    ['S3', 'descente', 16, 10], ['F', 'exutoire', 16, 4, {nom: 'Fossé', ab: 'Fo', art: 'le', ep: 'reserve', cst: 'MILIEU'}]],
    l: [['t1', 'tr', '', '', ['S1', 'E2']], ['t2', 'tr', '', '', ['S2', 'E1']], ['t3', 'tr', '', '', ['S3', 'F']]]});
  const ordres = [d, Object.assign({}, d, {el: d.el.slice().reverse()}), Object.assign({}, d, {el: melange(d.el, 2)}), Object.assign({}, d, {el: melange(d.el, 3)})];
  const vus = ordres.map(x => sur(() => { const an = V.analyser(copie(x), 'edl'); return JSON.stringify(an.exu) + ' | ' + ['S1', 'S2', 'S3'].map(id => id + '=' + (an.resObj[id] || {}).res).join(' '); }));
  const ATT = JSON.stringify({'X:ETANG:conforme:autre': {nom: 'ETANG', ab: 'ET', art: 'le', ep: 'conforme', cst: 'autre'}, 'X:FOSSE:reserve:MILIEU': {nom: 'Fossé', ab: 'Fo', art: 'le', ep: 'reserve', cst: 'MILIEU'}})
    + ' | S1=X:ETANG:conforme:autre S2=X:ETANG:conforme:autre S3=X:FOSSE:reserve:MILIEU';
  R.ok(vus.every(v => v === ATT), 'x3 quatre ordres du dessin : même an.exu (dans l\'ordre des identifiants, champs du premier objet de chaque clé), mêmes rejets ('
    + [...new Set(vus)].join(' // ') + ')');
  const an0 = V.analyser(copie(versPuits('descente')), 'edl');
  R.ok(!('exu' in an0), 'x3 garde : un plan sans destination n\'a pas de clé an.exu (' + Object.keys(an0).join(', ') + ')');
}
/* x4 (m126, décisions D8 et D9) : symbole, légende du plan PDF, écran et DXF d'une destination ; ses textes libres (nom, abréviation) sont
   intacts à l'écran et au PDF, en CP1252 au DXF ; l'abréviation est échappée en HTML (symboleSvg, où le nom n'entre pas) ; la ligne de
   légende d'un nom long reste dans le cartouche */
const rayons = q => { const r = []; for (let i = 0; i + 1 < q.pts.length; i += 2) r.push(Math.hypot(q.pts[i], q.pts[i + 1])); return r; };
/* bloc du DXF résumé : polylignes (fermées ou non) et cercles, nombre de sommets, textes */
function resumeBloc(texte, nom){
  const b = blocDxf(texte, nom); if (!b) return 'bloc ' + nom + ' absent';
  return b.filter(q => q.type === 'POLYLINE' || q.type === 'CIRCLE').map(q => q.type + (q.type === 'POLYLINE' && (+q.c['70'] & 1) ? ' fermée' : '')).join(', ')
    + ' (' + b.filter(q => q.type === 'VERTEX').length + ' sommets) ; textes ' + JSON.stringify(b.filter(q => q.type === 'TEXT').map(q => q.c['1']));
}
const HEX = t => 'POLYLINE fermée (6 sommets) ; textes ' + JSON.stringify([t]);
/* INSERT des destinations, de gauche à droite : bloc, calque, couleur */
const insDest = x => x.ents.filter(q => q.type === 'INSERT' && /^VEDE_EXUTOIRE/.test(q.c['2'])).sort((a, b) => +a.c['10'] - +b.c['10']).map(q => q.c['2'] + ' ' + q.cal + ' ' + q.c['62']);
/* côtés verts de l'écran dont les deux bouts sont à la même distance du point c : distances */
const autour = (tr, c) => tr.filter(q => q.coul === VERT).map(q => [Math.hypot(q.a.x - c[0], q.a.y - c[1]), Math.hypot(q.b.x - c[0], q.b.y - c[1])])
  .filter(r => r[0] > 1e-3 && Math.abs(r[0] - r[1]) < 1e-6);
async function destRendu(){
  const FOS = {nom: 'Fossé', ab: 'Fo', art: 'le', ep: 'conforme', cst: 'MILIEU'};
  /* symbole : hexagone vert, blanc dedans, de rayon 2,1, qui porte l'abréviation en vert gras */
  const P = sur(() => V.primitives({k: 'pt', t: 'exutoire', p: etang('nc')}, V.RES.EP.rgb, 0)), L = Array.isArray(P) ? P : [];
  const hx = L.filter(q => q.k === 'p'), tx = L.filter(q => q.k === 't');
  R.ok(V.rayonSymbole('exutoire') === 2.1 && L.length === 2 && hx.length === 1 && hx[0].f === true && hx[0].pts.length === 12 && rayons(hx[0]).every(r => Math.abs(r - 2.1) < 1e-9)
    && String(hx[0].trait) === EPC && String(hx[0].fond) === '255,255,255' && hx[0].ep > 0 && tx.length === 1 && tx[0].s === 'Ét' && String(tx[0].coul) === EPC && tx[0].gras === true,
    'x4 symbole : hexagone vert de rayon 2,1, blanc dedans, qui porte l\'abréviation « Ét » en vert gras (rayon ' + V.rayonSymbole('exutoire') + ' ; '
    + (Array.isArray(P) ? P.map(q => q.k + (q.pts ? ' ' + q.pts.length / 2 + ' sommets, rayon ' + [...new Set(rayons(q).map(r => r.toFixed(3)))].join('/') : '') + (q.r ? ' r ' + q.r : '')
      + (q.s != null ? ' « ' + q.s + ' »' : '')).join(' | ') : P) + ')');
  /* « Étang » (Ét) et « Fossé » (Fo), chacun au bout d'une descente */
  const d = doc({o: [['S1', 'descente', 0, 10], ['E', 'exutoire', 0, 4, etang('nc')], ['S2', 'descente', 8, 10], ['F', 'exutoire', 8, 4, FOS]],
    l: [['t1', 'tr', '', '', ['S1', 'E']], ['t2', 'tr', '', '', ['S2', 'F']]]});
  const x = dxf(d), bE = resumeBloc(x.texte, 'VEDE_EXUTOIRE_ET'), bF = resumeBloc(x.texte, 'VEDE_EXUTOIRE_FO'), iD = insDest(x);
  R.ok(bE === HEX('Ét') && bF === HEX('Fo') && x.blocs.indexOf('VEDE_EXUTOIRE') < 0 && vu(iD) === vu(['VEDE_EXUTOIRE_ET VEDE-SYMBOLES 3', 'VEDE_EXUTOIRE_FO VEDE-SYMBOLES 3']),
    'x4 DXF : blocs VEDE_EXUTOIRE_ET et VEDE_EXUTOIRE_FO (hexagone et abréviation), aucun bloc VEDE_EXUTOIRE ; INSERT sur VEDE-SYMBOLES en couleur 3 ('
    + bE + ' ; ' + bF + ' ; blocs ' + x.blocs.join(', ') + ' ; INSERT ' + (iD.join(', ') || 'aucun') + ')');
  const p = await pdf(d, {mode: 'edl'}), lg = p.txt.filter(s => /^(Étang|Fossé|Autre destination)( \(|$)/.test(s));
  /* échantillons de la légende (cartouche, à droite du cadre du plan) : abréviation et hexagone vert */
  const ech = p.pos.filter(q => q.x > 216 && q.x < 232 && /^(Ét|Fo|Au)$/.test(q.t)).map(q => q.t).sort();
  const hexL = p.formes.filter(f => f.ferme && f.pts.length === 6 && f.coul === EPC && f.pts.every(q => q.x > 216 && q.x < 232)).length;
  const rej = p.txt.filter(s => /^(étang|fossé)\b/.test(s));
  R.ok(!p.err.length && vu(lg) === vu(['Étang (Ét)', 'Fossé (Fo)']) && vu(ech) === vu(['Fo', 'Ét']) && hexL === 2 && rej.some(s => /^étang\b/.test(s)),
    'x4 plan PDF : deux lignes de légende, « Étang (Ét) » et « Fossé (Fo) », chacune avec son hexagone vert et son abréviation ; « étang » au « Rejet constaté » de la page 2 ('
    + (p.err.join(' | ') || vu(lg) + ' ; échantillons ' + vu(ech) + ', ' + hexL + ' hexagones ; page 2 ' + vu(rej)) + ')');
  const ec = sur(() => dessiner(d, 20, [4, 7])), sE = typeof ec === 'string' ? [] : autour(ec.traits, [0, 4]);
  const txE = typeof ec === 'string' ? ec : ec.textes.filter(q => /^(Ét|Fo|Au)$/.test(q.t)).map(q => q.t + ' ' + q.coul).sort();
  R.ok(sE.length === 6 && sE.every(r => Math.abs(r[0] - sE[0][0]) < 1e-6) && vu(txE) === vu(['Fo ' + VERT, 'Ét ' + VERT]),
    'x4 écran : hexagone vert (six côtés aux bouts à égale distance du centre) et abréviations en vert (' + sE.length + ' côtés ; ' + vu(txE) + ')');
  /* textes libres : nom « Étang <b> & "x" », abréviation « <& » ; étiquette affichée */
  const N = 'Étang <b> & "x"', pe = {nom: N, ab: '<&', art: 'l\'', ep: 'conforme', cst: 'autre'};
  const svg = sur(() => V.symboleSvg('exutoire', 40, pe)), tsv = String((String(svg).match(/<text[^>]*>([^<]*)<\/text>/) || [])[1]);
  R.ok(tsv === '&lt;&amp;' && String(svg).indexOf('<&') < 0, 'x4 HTML : l\'abréviation « <& » échappée dans le symbole (symboleSvg : ' + JSON.stringify(tsv) + ')');
  const d2 = versDest('descente', pe); d2.el.find(q => q.id === 'E').lab = null;
  const e2 = sur(() => dessiner(d2, 20, [0, 7])), t2 = typeof e2 === 'string' ? e2 : e2.textes.map(q => q.t).filter(t => t === N || t === '<&').sort();
  const p2 = await pdf(d2, {mode: 'edl'}), l2 = p2.txt.filter(s => s.indexOf(N) === 0 || s === '<&'), n2 = t => l2.filter(s => s === t).length;
  const x2 = dxf(d2), brut = Buffer.from(V.ecrireDxf(copie(d2))), b2 = resumeBloc(x2.texte, 'VEDE_EXUTOIRE___'), et2 = x2.ents.filter(q => q.type === 'TEXT' && q.c['1'] === N).map(q => q.cal);
  R.ok(vu(t2) === vu(['<&', N]), 'x4 écran : nom et abréviation écrits tels quels (' + vu(t2) + ')');
  R.ok(!p2.err.length && n2(N) >= 1 && n2(N + ' (<&)') === 1 && n2('<&') === 2 && l2.length === n2(N) + 3,
    'x4 plan PDF : nom (étiquette, avec son halo), « ' + N + ' (<&) » (légende) et « <& » (plan et légende), intacts ('
    + (p2.err.join(' | ') || vu(l2)) + ')');
  R.ok(vu(et2) === vu(['VEDE-ETIQUETTES']) && b2 === HEX('<&') && brut.includes(Buffer.from(N, 'latin1')) && !brut.includes(Buffer.from('É', 'utf8')),
    'x4 DXF : étiquette « ' + N + ' » intacte, en CP1252 (É en un octet) ; bloc VEDE_EXUTOIRE___ qui porte « <& » (' + vu(et2) + ' ; ' + b2 + ')');
  /* abréviations « Ét » et « Et » : le même nom de bloc une fois réduit à A-Z, 0-9 et _ */
  const d3 = doc({o: [['S1', 'descente', 0, 10], ['E1', 'exutoire', 0, 4, etang('conforme')], ['S2', 'descente', 8, 10], ['E2', 'exutoire', 8, 4, Object.assign(etang('conforme'), {ab: 'Et'})]],
    l: [['t1', 'tr', '', '', ['S1', 'E1']], ['t2', 'tr', '', '', ['S2', 'E2']]]});
  const x3 = dxf(d3), i3 = insDest(x3), b31 = resumeBloc(x3.texte, 'VEDE_EXUTOIRE_ET'), b32 = resumeBloc(x3.texte, 'VEDE_EXUTOIRE_ET_2');
  R.ok(b31 === HEX('Ét') && b32 === HEX('Et') && vu(i3) === vu(['VEDE_EXUTOIRE_ET VEDE-SYMBOLES 3', 'VEDE_EXUTOIRE_ET_2 VEDE-SYMBOLES 3']),
    'x4 DXF, abréviations « Ét » et « Et » : VEDE_EXUTOIRE_ET puis VEDE_EXUTOIRE_ET_2, chacun son texte (' + b31 + ' ; ' + b32 + ' ; INSERT ' + (i3.join(', ') || 'aucun') + ')');
  /* sans nom ni abréviation : les replis (« Autre destination », « Au ») */
  const d4 = versDest('descente', {}), p4 = await pdf(d4, {mode: 'edl'}), x4 = dxf(d4), i4 = insDest(x4);
  const l4 = p4.txt.filter(s => /^Autre destination\b/.test(s)), b4 = resumeBloc(x4.texte, 'VEDE_EXUTOIRE_AU');
  R.ok(!p4.err.length && vu(l4) === vu(['Autre destination (Au)']) && b4 === HEX('Au') && vu(i4) === vu(['VEDE_EXUTOIRE_AU VEDE-SYMBOLES 3']) && x4.blocs.indexOf('VEDE_EXUTOIRE') < 0,
    'x4 destination sans nom ni abréviation : « Autre destination (Au) » à la légende, bloc VEDE_EXUTOIRE_AU (' + (p4.err.join(' | ') || vu(l4)) + ' ; ' + b4 + ' ; INSERT '
    + (i4.join(', ') || 'aucun') + ')');
  /* noms longs : la ligne de légende reste dans le cartouche (de 216 à 290 mm ; libellés à 229 mm, filets jusqu'à 287 mm). 40 majuscules :
     taille réduite (5,5 pt au moins), nom entier ; 40 « W » : 5,5 pt, nom coupé (« … »), abréviation gardée ; témoin : « Étang (Ét) » en 7,2 pt */
  const LONG = 'FOSSÉ DE LA ROUTE DE VILLE-EXEMPLE OUEST', d5 = doc({o: [['S1', 'descente', 0, 10], ['E1', 'exutoire', 0, 4, {nom: LONG, ab: 'FRV', art: 'le', ep: 'conforme', cst: 'autre'}],
    ['S2', 'descente', 8, 10], ['E2', 'exutoire', 8, 4, {nom: 'W'.repeat(40), art: 'le', ep: 'conforme', cst: 'autre'}], ['S3', 'descente', 16, 10], ['E3', 'exutoire', 16, 4, etang('conforme')]],
    l: [['t1', 'tr', '', '', ['S1', 'E1']], ['t2', 'tr', '', '', ['S2', 'E2']], ['t3', 'tr', '', '', ['S3', 'E3']]]});
  const p5 = await pdf(d5, {mode: 'edl'}), col = p5.pos.filter(q => Math.abs(q.x - 229) < 1e-6), dans = q => !!q && q.x + q.w <= 287 + 1e-9;
  const lA = col.find(q => q.t.indexOf('FOSSÉ') === 0), lB = col.find(q => q.t.indexOf('WW') === 0), lE = col.find(q => q.t === 'Étang (Ét)');
  R.ok(LONG.length === 40 && !p5.err.length && dans(lA) && lA.t === LONG + ' (FRV)' && lA.pt < 7.2 && lA.pt >= 5.5 && dans(lB) && /^W+… \(WW\)$/.test(lB.t) && lB.pt === 5.5 && !!lE && lE.pt === 7.2,
    'x4 plan PDF, noms longs : lignes de légende dans le cartouche (fin à 287 mm au plus) ; 40 majuscules en taille réduite (5,5 pt au moins), nom entier ; 40 « W » en 5,5 pt, '
    + 'nom coupé (« … »), « (WW) » gardé ; témoin : « Étang (Ét) » en 7,2 pt (' + (p5.err.join(' | ') || [lA, lB, lE].map(q => q ? JSON.stringify(q.t) + ' en ' + +q.pt.toFixed(2) + ' pt, fin à '
    + (q.x + q.w).toFixed(1) + ' mm' : 'absent').join(' ; ')) + ')');
  /* abréviation illisible au PDF (m128) : repli de destDe, les deux premiers caractères du nom ; une abréviation lisible reste */
  const ILL = ['ΩΩ', '💧', 'Ω💧'], abLu = ab => sur(() => V.destDe({p: Object.assign(etang('nc'), {ab})}).ab);
  const sym = ab => { const q = sur(() => V.primitives({k: 'pt', t: 'exutoire', p: Object.assign(etang('nc'), {ab})}, V.RES.EP.rgb, 0)); return Array.isArray(q) ? q.filter(x => x.k === 't').map(x => x.s).join() : String(q); };
  const d6 = versDest('descente', Object.assign(etang('nc'), {ab: 'ΩΩ'})), p6 = await pdf(d6, {mode: 'edl'}), l6 = p6.txt.filter(s => /^Étang\b/.test(s));
  R.ok(vu(ILL.map(abLu)) === vu(['Ét', 'Ét', 'Ét']) && vu(ILL.map(sym)) === vu(['Ét', 'Ét', 'Ét']) && abLu('<&') === '<&' && !p6.err.length && l6.indexOf('Étang (Ét)') >= 0,
    'x4 abréviation illisible au PDF (« ΩΩ », un émoji, « Ω » et un émoji) : les deux premiers caractères du nom, « Ét », au symbole et à la légende du plan PDF ; « <& » reste ('
    + vu(ILL.map(abLu)) + ' ; ' + vu(ILL.map(sym)) + ' ; ' + JSON.stringify(abLu('<&')) + ' ; ' + (p6.err.join(' | ') || vu(l6)) + ')');
  /* nom qui commence par un caractère que le PDF ne sait pas écrire (« 💧 Mare », que la fiche accepte), abréviation absente, illisible
     ou qui n'est pas du texte : les deux premiers caractères du nom sont illisibles aussi ; le repli prend alors les deux premiers que le
     PDF sait écrire, « Ma », comme la fiche (abDe) */
  const MARE = {nom: '💧 Mare', art: 'la', ep: 'nc', cst: 'autre'}, avec = ab => ab === undefined ? Object.assign({}, MARE) : Object.assign({}, MARE, {ab});
  const abM = [undefined, 'ΩΩ', '💧', 5].map(ab => sur(() => V.destDe({p: avec(ab)}).ab));
  const symM = sur(() => V.primitives({k: 'pt', t: 'exutoire', p: avec()}, V.RES.EP.rgb, 0)), sM = Array.isArray(symM) ? symM.filter(x => x.k === 't').map(x => x.s).join() : String(symM);
  const p7 = await pdf(versDest('descente', avec()), {mode: 'edl'}), l7 = p7.txt.filter(s => /Mare \(/.test(s)).map(s => s.trim());
  R.ok(vu(abM) === vu(['Ma', 'Ma', 'Ma', 'Ma']) && sM === 'Ma' && !p7.err.length && vu(l7) === vu(['Mare (Ma)']),
    'x4 nom « 💧 Mare » (accepté par la fiche), abréviation absente, illisible au PDF ou qui n\'est pas du texte : « Ma », les deux premiers caractères que le PDF sait '
    + 'écrire, comme la fiche, au symbole et à la légende du plan PDF (' + vu(abM) + ' ; ' + JSON.stringify(sM) + ' ; ' + (p7.err.join(' | ') || vu(l7)) + ')');
}
/* x5 : avant-projet qui garde l'étang aux EP non conformes (aucun travaux) ; témoin : le tronçon vers l'étang « à supprimer » et un tronçon
   « projet » vers une boîte EP « projet » ; au dossier (reconcilier) : ep-exu créée, en catégorie « autre », sur la ligne « Gouttière(s) avant » */
async function destProjet(){
  const ctl = t => t.filter(s => /^(Reste après travaux|Après travaux)/.test(s));
  const a = await pdf(versDest('descente', etang('nc')), {mode: 'avp'}), pr = a.txt.filter(s => /^Suppression du rejet dans l'étang/.test(s));
  R.ok(!a.err.length && ctl(a.txt).indexOf('Reste après travaux : Descente EP : rejet dans l\'étang') >= 0 && pr.length === 1,
    'x5 avant-projet qui garde l\'étang : préconisation au tableau, « Reste après travaux : Descente EP : rejet dans l\'étang » (' + (a.err.join(' | ') || pr.concat(ctl(a.txt)).join(' ; ') || 'rien') + ')');
  const dT = doc({o: [['S', 'descente', 0, 10], ['E', 'exutoire', 0, 4, etang('nc')], ['B', 'boite', 6, 4, {res: 'EP', st: 'projet'}]],
    l: [['t1', 'tr', '', 'supprimer', ['S', 'E']], ['t2', 'tr', '', 'projet', ['S', 'B']]]});
  const t = await pdf(dT, {mode: 'avp'});
  R.ok(!t.err.length && ctl(t.txt).join(' ; ') === 'Après travaux, le dessin ne fait plus apparaître d\'anomalie de raccordement.',
    'x5 témoin, rejet dans l\'étang supprimé par le projet : plus rien ne reste (' + (t.err.join(' | ') || ctl(t.txt).join(' ; ') || 'rien') + ')');
  const ops = sur(() => V.reconcilier(versDest('descente', etang('nc')), null, [])), cr = typeof ops === 'string' ? [] : ops.creer;
  const c = cr.find(q => q.croquis && q.croquis.cle === 'ep-exu:S');
  R.ok(!!c && c.categorie === 'autre' && c.installation === 'gout_av' && c.nc === true && c.reseau === 'EP' && c.observation === 'Descente EP : rejet dans l\'étang'
    && c.preconisation === PRE_X && c.croquis.codes.join() === 'gestEP' && c.croquis.auto.installation === 'gout_av',
    'x5 dossier : ep-exu créée, catégorie « autre », ligne « Gouttière(s) avant », non conforme, case gestEP ('
    + (typeof ops === 'string' ? ops : cr.map(q => (q.croquis && q.croquis.cle) + ' ' + q.categorie + ' ' + JSON.stringify(q.installation) + (q.nc ? ' NC' : ' réserve')).join(', ') || 'rien de créé') + ')');
}

/* x6 (m127) : dossier simulé comme par vcAppliquer ; la nature d'un enregistrement est la sienne, sinon la règle de l'application */
function dossierSimule(){
  const ext = [], nature = r => r.nc === true || r.nc === false ? r.nc : V.ncAnomalie({reseau: r.reseau, observation: r.observation});
  let k = 0;
  const synchro = d => {
    const ops = V.reconcilier(d, null, ext);
    ops.retirer.forEach(id => { const i = ext.findIndex(r => r.id === id); if (i >= 0) ext.splice(i, 1); });
    ops.maj.forEach(m => { const r = ext.find(x => x.id === m.id); if (r) Object.assign(r, m.champs); });
    ops.creer.forEach(c => {
      const r = {id: c.id || 'r' + (++k), createdAt: c.createdAt || '2026-11-02', reseau: c.reseau, observation: c.observation, preconisation: c.preconisation,
        localisation: c.localisation || '', installation: c.installation || '', photos: [], brouillon: false, croquis: c.croquis};
      /* nature écrite seulement si elle diffère de la règle de l'application ou de celle du dessin (vcAppliquer) */
      if ((c.nc === true || c.nc === false) && (c.nc !== nature(r) || (c.croquis && c.croquis.auto && typeof c.croquis.auto.nc === 'boolean' && c.nc !== c.croquis.auto.nc))) r.nc = c.nc;
      ext.push(r);
    });
  };
  return {ext, nature, synchro};
}
/* x6 : jugements successifs de l'étang (décisions de Contrôles retirées à chaque changement, comme dans la fiche) ; avant chaque jugement,
   avant(D, d) peut retoucher le dossier ou décider. Rend, après chaque jugement : jugement, anomalie du dessin / nature au dossier, conclusion */
function jugements(eps, avant){
  const d = versDest('descente', etang('arbitrer')), E = d.el.find(e => e.id === 'E'), D = dossierSimule(), vus = [];
  D.synchro(d);
  eps.forEach((ep, i) => {
    if (avant) avant(i, D, d);
    if (ep){ E.p.ep = ep; delete d.decisions['ep-exu:S']; }
    D.synchro(d);
    const an = V.analyser(copie(d), 'edl'), a = an.anomalies.find(x => x.cle === 'ep-exu:S'), r = D.ext.find(x => x.croquis && x.croquis.cle === 'ep-exu:S');
    vus.push((ep || 'décision') + ' ' + (a ? (a.arbitrer ? 'arbitrer' : a.nc ? 'NC' : 'réserve') : 'aucune') + '/' + (r ? (D.nature(r) ? 'NC' : 'réserve') : 'aucune')
      + ' ' + V.conclusion(V.anomaliesDoc(d, an, D.ext), an));
  });
  return vus.join(', ');
}
function destNature(){
  const cas = [
    ['« Non conforme » puis « Réserve »', ['nc', 'reserve'], 'nc NC/NC non_conformes, reserve réserve/réserve reserves'],
    ['« Non conforme », « Conforme », « Réserve »', ['nc', 'conforme', 'reserve'], 'nc NC/NC non_conformes, conforme aucune/aucune conformes, reserve réserve/réserve reserves'],
    ['« Non conforme », « À arbitrer », « Réserve »', ['nc', 'arbitrer', 'reserve'], 'nc NC/NC non_conformes, arbitrer arbitrer/aucune exu, reserve réserve/réserve reserves'],
    ['aller et retour', ['nc', 'reserve', 'nc', 'reserve'], 'nc NC/NC non_conformes, reserve réserve/réserve reserves, nc NC/NC non_conformes, reserve réserve/réserve reserves']];
  cas.forEach(c => {
    const vu = sur(() => jugements(c[1]));
    R.ok(vu === c[2], 'x6 ' + c[0] + ' : le dossier suit le jugement de la fiche, conclusion « reserves » (' + vu + ')');
  });
  const tem = [
    ['« Réserve » d\'abord, puis « Non conforme » et retour', ['reserve', 'nc', 'reserve'], 'reserve réserve/réserve reserves, nc NC/NC non_conformes, reserve réserve/réserve reserves'],
    ['« Réserve », « Conforme », « Non conforme »', ['reserve', 'conforme', 'nc'], 'reserve réserve/réserve reserves, conforme aucune/aucune conformes, nc NC/NC non_conformes'],
    ['« Non conforme », « Conforme », « Non conforme »', ['nc', 'conforme', 'nc'], 'nc NC/NC non_conformes, conforme aucune/aucune conformes, nc NC/NC non_conformes']];
  tem.forEach(c => {
    const vu = sur(() => jugements(c[1]));
    R.ok(vu === c[2], 'x6 témoin, ' + c[0] + ' (' + vu + ')');
  });
  /* copie retouchée : au dossier, le texte retouché fait une réserve (sans « rejet », avec un tampon béton) ; l'anomalie écartée part en
     copie ; « À arbitrer », puis « Non conforme » la retient de nouveau : elle revient avec ce texte, en réserve, sans nature écrite (la
     nature suit toujours ce texte : le dessin ne la remplace pas) */
  const TXT = 'Descente EP vers l\'étang, tampon béton';
  let D0 = null;
  const vu = sur(() => jugements(['nc', '', 'arbitrer', 'nc'], (i, D, d) => {
    D0 = D; if (i === 1){ D.ext.find(x => x.croquis && x.croquis.cle === 'ep-exu:S').observation = TXT; d.decisions['ep-exu:S'] = {st: 'ecartee'}; }
  }));
  const r = D0 && D0.ext.find(q => q.croquis && q.croquis.cle === 'ep-exu:S'), vr = r ? r.observation + ' / nc ' + r.nc : 'absente';
  R.ok(vu === 'nc NC/NC non_conformes, décision NC/aucune conformes, arbitrer arbitrer/aucune exu, nc NC/réserve reserves' && vr === TXT + ' / nc undefined',
    'x6 témoin, copie au texte retouché (réserve d\'après ce texte), écartée, puis « À arbitrer » et « Non conforme » : elle revient avec son texte, en réserve, '
    + 'sans nature écrite (' + vu + ' ; ' + vr + ')');
}

/* x7 (m127) : règle de nature de l'application (norm, NC_MOTIFS et anomNC d'index.html), comme l'application l'installe */
function regleApp(){
  const L = fs.readFileSync(path.join(ch.dir, 'index.html'), 'utf8').split('\n'), at = re => L.findIndex(l => re.test(l));
  const iN = at(/^function norm\(s\)/), iM = at(/^var NC_MOTIFS = /), iF = at(/^function anomNC\(a\)\{/);
  let fin = iF; while (fin >= 0 && fin < L.length && L[fin] !== '}') fin++;
  if (iN < 0 || iM < 0 || iF < 0 || fin >= L.length) throw new Error('norm, NC_MOTIFS ou anomNC introuvable dans index.html');
  return new Function([L[iN], L[iM]].concat(L.slice(iF, fin + 1), ['return anomNC;']).join('\n'))();
}
/* x7 : WC S (descente en EP) → regard R au tampon béton → boîte B : anomalie tampon:R, non conforme en EU, réserve en EP */
const versRegard = ep => doc({o: [['S', ep ? 'descente' : 'wc', 0, 10], ['R', 'regard', 0, 6, {tampon: 'beton'}], ['B', 'boite', 0, 2, {res: ep ? 'EP' : 'EU'}]],
  l: [['t1', 'tr', '', '', ['S', 'R']], ['t2', 'tr', '', '', ['R', 'B']]]});
/* x7 : gestes g(d, D, cle) : texte, réseau ou nature retouchés au dossier ; au croquis, anomalie écartée, retenue, ou texte retouché hors
   du dossier (il prime sur la copie, comme noterRetouche) ; regard passé en EP ou en EU ; jugement des EP de l'étang (décisions du rejet
   retirées, comme oublierJugement) */
const recX = (D, cle) => D.ext.find(x => x.croquis && x.croquis.cle === cle);
const G7 = {
  txt: t => (d, D, cle) => { recX(D, cle).observation = t; },
  res: x => (d, D, cle) => { recX(D, cle).reseau = x; },
  ncDos: v => (d, D, cle) => { recX(D, cle).nc = v; },
  txtC: t => (d, D, cle) => {
    const x = d.decisions[cle] = d.decisions[cle] || {}, sv = (d.sauvegardes || {})[cle];
    x.obs = t; if (sv) x.surCopie = Object.assign({}, x.surCopie, {obs: sv.seq || 0});
  },
  ecarter: (d, D, cle) => { d.decisions[cle] = Object.assign(d.decisions[cle] || {}, {st: 'ecartee'}); },
  retenir: (d, D, cle) => { (d.decisions[cle] = d.decisions[cle] || {}).st = 'retenue'; },
  enEP: d => { d.el.find(e => e.id === 'S').t = 'descente'; d.el.find(e => e.id === 'B').p.res = 'EP'; },
  enEU: d => { d.el.find(e => e.id === 'S').t = 'wc'; d.el.find(e => e.id === 'B').p.res = 'EU'; },
  juge: ep => d => {
    d.el.find(e => e.id === 'E').p.ep = ep;
    const x = d.decisions['ep-exu:S']; if (x){ delete x.st; delete x.nc; if (!Object.keys(x).length) delete d.decisions['ep-exu:S']; }
  }
};
/* x7 : rend, au départ puis après chaque geste, la nature de l'anomalie cle au dessin / au dossier (« aucune » : hors du dossier) */
function suiteNature(d, cle, gestes){
  const D = dossierSimule(), vus = [], lire = () => {
    const a = V.analyser(copie(d), 'edl').anomalies.find(x => x.cle === cle), r = recX(D, cle);
    vus.push((a ? (a.arbitrer ? 'arbitrer' : a.nc ? 'NC' : 'réserve') : 'aucune') + '/' + (r ? (D.nature(r) ? 'NC' : 'réserve') : 'aucune'));
  };
  D.synchro(d); lire();
  gestes.forEach(g => { g(d, D, cle); D.synchro(d); lire(); });
  return vus.join(', ');
}
function natureJugee(){
  const n0 = V.ncAnomalie, regle = sur(regleApp);
  if (typeof regle !== 'function'){ R.ok(false, 'x7 règle de l\'application lue dans index.html (' + regle + ')'); return; }
  const {txt, res, ncDos, txtC, ecarter, retenir, enEP, enEU, juge} = G7, TB = 'Descente EP vers l\'étang, tampon béton', COM = 'Descente EP : rejet dans l\'étang communal';
  const REJ = 'Descente EP : rejet dans l\'étang', reg = ep => [versRegard(ep), 'tampon:R'], rej = ep => [versDest('descente', etang(ep || 'nc')), 'ep-exu:S'];
  const cas = [
    /* un tampon béton passé en EP dont le texte nomme un défaut reste non conforme */
    ['regard : « … fissuré » au dossier, puis EP', reg(false), [txt('Regard EU : tampon béton fissuré'), enEP], 'NC/NC, NC/NC, réserve/NC'],
    ['regard : « … fissuré » au dossier, « non conforme » écrit au dossier, puis EP', reg(false), [txt('Regard EU : tampon béton fissuré'), ncDos(true), enEP],
      'NC/NC, NC/NC, NC/NC, réserve/NC'],
    ['regard : « … cassé » au dossier, puis EP', reg(false), [txt('Regard EU : tampon béton cassé'), enEP], 'NC/NC, NC/NC, réserve/NC'],
    ['regard EP : « … cassé » au dossier, EU, puis EP', reg(true), [txt('Regard EP : tampon béton cassé'), enEU, enEP], 'réserve/réserve, réserve/NC, NC/NC, réserve/NC'],
    ['regard : « … fissuré » au dossier, écartée, EP, retenue', reg(false), [txt('Regard EU : tampon béton fissuré'), ecarter, enEP, retenir],
      'NC/NC, NC/NC, NC/aucune, réserve/aucune, réserve/NC'],
    ['regard : « … cassé » au dossier, écartée, EP, retenue', reg(false), [txt('Regard EU : tampon béton cassé'), ecarter, enEP, retenir],
      'NC/NC, NC/NC, NC/aucune, réserve/aucune, réserve/NC'],
    ['regard EP : écartée, « … cassé » au croquis, retenue', reg(true), [ecarter, txtC('Regard EP : tampon béton cassé'), retenir],
      'réserve/réserve, réserve/aucune, réserve/aucune, réserve/NC'],
    ['regard : écartée, « … fissuré » au croquis, EP, retenue', reg(false), [ecarter, txtC('Regard : tampon béton fissuré'), enEP, retenir],
      'NC/NC, NC/aucune, NC/aucune, réserve/aucune, réserve/NC'],
    /* le dessin n'écrit jamais une réserve hors EP (une nature écrite en EP y reste quand le réseau change au dossier) ; revenu en EP,
       l'enregistrement reçoit le jugement */
    ['rejet : réseau EU au dossier, « Réserve »', rej(), [res('EU'), juge('reserve')], 'NC/NC, NC/NC, réserve/NC'],
    ['rejet : réseau EU au dossier, écartée, « Réserve », retenue', rej(), [res('EU'), ecarter, juge('reserve'), retenir], 'NC/NC, NC/NC, NC/aucune, réserve/NC, réserve/NC'],
    ['rejet : « Réserve », réseau EU au dossier, « Non conforme », « Réserve »', rej(), [juge('reserve'), res('EU'), juge('nc'), juge('reserve')],
      'NC/NC, réserve/réserve, réserve/réserve, NC/NC, réserve/NC'],
    ['rejet créé sous « Réserve », réseau EU au dossier, « Non conforme », « Réserve »', rej('reserve'), [res('EU'), juge('nc'), juge('reserve')],
      'réserve/réserve, réserve/réserve, NC/NC, réserve/NC'],
    ['rejet : réseau EU au dossier, « Réserve », réseau EP au dossier', rej(), [res('EU'), juge('reserve'), res('EP')], 'NC/NC, NC/NC, réserve/NC, réserve/réserve'],
    ['rejet : réseau EU au dossier, écartée, « Réserve » (retenue de sa copie), réseau EP au dossier', rej(), [res('EU'), ecarter, juge('reserve'), res('EP')],
      'NC/NC, NC/NC, NC/aucune, réserve/NC, réserve/réserve'],
    ['rejet : réseau EU au dossier, « Conforme » (gardée), « Réserve », réseau EP au dossier', rej(), [res('EU'), juge('conforme'), juge('reserve'), res('EP')],
      'NC/NC, NC/NC, aucune/NC, réserve/NC, réserve/réserve'],
    ['rejet : réseau EU au dossier, « Réserve », réseau EP au dossier, « Non conforme », « Réserve »', rej(), [res('EU'), juge('reserve'), res('EP'), juge('nc'), juge('reserve')],
      'NC/NC, NC/NC, réserve/NC, réserve/réserve, NC/NC, réserve/réserve'],
    /* texte du rejet retouché au dossier, qui fait une réserve : la nature de ce texte, par tous les chemins et dans les deux ordres */
    ['rejet : texte en réserve, « Réserve », « Non conforme »', rej(), [txt(TB), juge('reserve'), juge('nc')], 'NC/NC, NC/réserve, réserve/réserve, NC/réserve'],
    ['rejet : « Réserve », texte en réserve, « Non conforme »', rej(), [juge('reserve'), txt(TB), juge('nc')], 'NC/NC, réserve/réserve, réserve/réserve, NC/réserve'],
    ['rejet : « Réserve », texte en réserve, écartée (copie sous « Réserve »), « Non conforme »', rej(), [juge('reserve'), txt(TB), ecarter, juge('nc')],
      'NC/NC, réserve/réserve, réserve/réserve, réserve/aucune, NC/réserve'],
    ['rejet : « Réserve », texte en réserve, « À arbitrer », « Non conforme »', rej(), [juge('reserve'), txt(TB), juge('arbitrer'), juge('nc')],
      'NC/NC, réserve/réserve, réserve/réserve, arbitrer/aucune, NC/réserve'],
    ['rejet créé sous « Réserve », texte en réserve, « Non conforme », « Réserve », « Non conforme »', rej('reserve'), [txt(TB), juge('nc'), juge('reserve'), juge('nc')],
      'réserve/réserve, réserve/réserve, NC/réserve, réserve/réserve, NC/réserve'],
    /* de même pour un texte retouché au croquis pendant que l'anomalie est écartée (il prime sur la copie) */
    ['rejet créé sous « Réserve », écartée, texte en réserve au croquis, « Non conforme » (retenue de sa copie)', rej('reserve'), [ecarter, txtC(TB), juge('nc')],
      'réserve/réserve, réserve/aucune, réserve/aucune, NC/réserve'],
    ['rejet : texte en réserve, écartée (copie sous « Non conforme »), « Réserve », « Non conforme », retenue', rej(),
      [txt(TB), ecarter, juge('reserve'), juge('nc'), retenir], 'NC/NC, NC/réserve, NC/aucune, réserve/réserve, NC/réserve, NC/réserve'],
    ['rejet : texte en réserve, « Réserve », écartée (copie sous « Réserve »), « Non conforme », retenue', rej(),
      [txt(TB), juge('reserve'), ecarter, juge('nc'), retenir], 'NC/NC, NC/réserve, réserve/réserve, réserve/aucune, NC/réserve, NC/réserve'],
    ['rejet : texte en réserve, « Réserve », « À arbitrer », « Non conforme »', rej(), [txt(TB), juge('reserve'), juge('arbitrer'), juge('nc')],
      'NC/NC, NC/réserve, réserve/réserve, arbitrer/aucune, NC/réserve'],
    ['témoin, rejet : texte en réserve, « À arbitrer », « Non conforme »', rej(), [txt(TB), juge('arbitrer'), juge('nc')], 'NC/NC, NC/réserve, arbitrer/aucune, NC/réserve'],
    ['témoin, rejet : texte en réserve, « non conforme » écrit au dossier, écartée, retenue (sa copie garde sa nature)', rej(), [txt(TB), ncDos(true), ecarter, retenir],
      'NC/NC, NC/réserve, NC/NC, NC/aucune, NC/NC'],
    /* un jugement que la règle ne donne pas sur le texte de l'enregistrement y est écrit, avant comme après la retouche du texte */
    ['rejet : texte en réserve, « Réserve », texte rendu « Descente EP : rejet dans l\'étang »', rej(), [txt(TB), juge('reserve'), txt(REJ)],
      'NC/NC, NC/réserve, réserve/réserve, réserve/réserve'],
    /* témoins : le dossier suit le jugement, à texte égal ou reformulé sans autre défaut */
    ['témoin, rejet : « Réserve », « Non conforme »', rej(), [juge('reserve'), juge('nc')], 'NC/NC, réserve/réserve, NC/NC'],
    ['témoin, rejet : « … dans l\'étang communal » au dossier, « Réserve », « Non conforme »', rej(), [txt(COM), juge('reserve'), juge('nc')],
      'NC/NC, NC/NC, réserve/réserve, NC/NC'],
    ['témoin, rejet : « … dans l\'étang communal » au dossier, écartée, « Réserve », retenue', rej(), [txt(COM), ecarter, juge('reserve'), retenir],
      'NC/NC, NC/NC, NC/aucune, réserve/réserve, réserve/réserve']];
  V.ncAnomalie = regle;
  try {
    cas.forEach(([lib, [d, cle], gestes, att]) => {
      const vu = sur(() => suiteNature(d, cle, gestes));
      R.ok(vu === att, 'x7 ' + lib + ' : ' + att.split('/').pop() + ' au dossier (dessin/dossier : ' + vu + ')');
    });
  } finally { V.ncAnomalie = n0; }
}

/* r6 (garde) : type absent, comme dans une version qui ne le connaît pas ; remis après */
async function sansType(){
  const T0 = V.TYPES.infiltration;
  delete V.TYPES.infiltration;
  try {
    const d = wcEtDescente(); d.el.find(e => e.id === 'I').lab = null;
    const e = sur(() => dessiner(d, 20, [3, 3])), p = await pdf(d, {mode: 'edl'}), x = sur(() => dxf(d));
    R.ok(typeof e !== 'string' && !p.err.length && typeof x !== 'string' && x.blocs.indexOf('VEDE_OBJET') >= 0 && x.blocs.indexOf('VEDE_INFILTRATION') < 0,
      'r6 sans le type : écran, PDF et DXF sans exception, bloc VEDE_OBJET (' + [typeof e === 'string' ? e : 'écran ok', p.err.join(' | ') || 'PDF ok',
        typeof x === 'string' ? x : 'blocs ' + x.blocs.join(', ')].join(' ; ') + ')');
  } finally { if (T0) V.TYPES.infiltration = T0; }
}

/* ---------- m144 : destinations de même nom, noms proches, « Fosse » (D10 ; réponses du 16 nov. 2026, S6 b et S7 a) ---------- */
/* appel d'une fonction de VCroquis, protégé ; absente : son nom */
const fx = (f, ...a) => typeof V[f] === 'function' ? sur(() => V[f](...a)) : 'VCroquis.' + f + ' absente';
const M1 = n => 'Une destination « ' + n + ' » existe déjà : choisissez-la dans la palette.';
const M3 = n => 'Une destination « ' + n + ' » est déjà posée sur ce plan : reprenez ce nom et ses jugements, ou choisissez un nom bien différent.';
const M4 = n => '« ' + n + ' » est un objet de la palette : posez l\'objet ' + n + '.';
const M5 = 'Pour une fosse septique, posez l\'objet Fosse septique ; pour un fossé, écrivez « Fossé ».';
const MF = n => 'Une destination « ' + n + ' » existe déjà : écrivez « ' + n + ' » pour la même, ou un nom bien différent.';
const MR = n => 'Une destination « ' + n + ' » existe déjà dans la liste.';
const QD = n => 'Nom proche de « ' + n + ' », qui existe déjà : est-ce la même destination ?';
const QO = n => 'Nom proche de « ' + n + ' », objet de la palette : est-ce le même ?';
const PUITS_R = 'Pour un puits, posez l\'objet Puits (EP non conformes) ; pour un puits perdu, un Puisard.';
/* modèle de la tablette ; destination saisie (cinq champs) ; saisie dans la palette (« + Nouvelle destination »), les Réglages (modèle m0
   renommé) et la fiche (destination posée renommée : refusNomDest ; nom0, son nom d'avant, comme le donne l'éditeur) */
const modele = (id, nom, o) => Object.assign({id, nom, ab: 'Zz', art: 'le', ep: 'arbitrer', cst: 'autre'}, o);
const saisieD = (nom, o) => Object.assign({nom, ab: '', art: 'le', ep: 'arbitrer', cst: 'autre'}, o);
const palette = (s, modeles, plan) => fx('destSaisie', s, null, {ou: 'palette', modeles: modeles || [], plan: plan || []});
const reglages = (s, m0, modeles) => fx('destSaisie', s, m0, {ou: 'reglages', modeles: modeles || []});
const ficheNom = (s, modeles, plan, nom0) => fx('refusNomDest', s, Object.assign({ou: 'fiche', modeles: modeles || [], plan: plan || []}, nom0 != null ? {nom0} : {}));
/* objet écrit clés triées (comparaisons) ; verdict court : refus (texte), question (texte et boutons), reprise, sinon « accepté » */
const cn = o => o && typeof o === 'object' ? '{' + Object.keys(o).sort().map(k => k + ':' + cn(o[k])).join(',') + '}' : JSON.stringify(o);
const verdict = r => r == null ? 'accepté' : typeof r !== 'object' ? String(r) : r.refus ? 'refus « ' + r.refus + ' »'
  : r.q ? 'question « ' + r.q.texte + ' » [' + r.q.oui + '|' + r.q.non + ']' + (r.q.objet ? ' objet' : '') : r.reprise ? 'reprise ' + cn(r.reprise) : 'accepté' + (r.m ? ' ' + r.m.nom : '');
/* les 42 paires de la conception (essais/noms.js), avec leur degré : 'meme', 'proche' ou '' (différentes) */
const PAIRES = [['meme', 'Étang', 'etang'], ['meme', 'L\'étang', 'Étang'], ['meme', 'Étangs', 'Étang'], ['meme', 'Fosse', 'Fossé'], ['meme', 'Mare', 'Mares'],
  ['meme', 'Ruisseau', 'Ruisseaux'], ['meme', 'Ruisseau', 'Ruiseau'], ['meme', 'Rivière', 'La riviere'], ['meme', 'Lac', 'Lacs'], ['meme', 'Ru', 'Rû'],
  ['meme', 'Bassin 1', 'Bassin  1'], ['meme', 'Étang du bas', 'Étang-du-bas'], ['meme', 'Mare', 'La Mare'], ['meme', 'Noue', 'Noues'],
  ['meme', 'Bassin de rétention', 'Bassin de retention'], ['meme', 'Bassin de rétention', 'Bassin de rétentions'], ['meme', 'Marre', 'Mare'],
  ['meme', 'Fosé', 'Fossé'], ['meme', 'Etang', 'ETANG'], ['meme', 'Fossé', 'Fossés'], ['meme', 'La Mare', 'Le Mare'],
  ['proche', 'Etagn', 'Étang'], ['proche', 'Fossé communal', 'Fossé communale'], ['proche', 'Fossé de la rue', 'Fossé de la route'], ['proche', 'Etnag', 'Étang'],
  ['proche', 'Puisart', 'Puisard'],
  ['', 'Mare', 'Marc'], ['', 'Cuve', 'Cave'], ['', 'Noue 1', 'Noue 2'], ['', 'Noue A', 'Noue B'], ['', 'Noue est', 'Noue ouest'], ['', 'Fossé nord', 'Fossé sud'],
  ['', 'Fossé est', 'Fossé ouest'], ['', 'Bassin d\'orage', 'Bassin d\'arrosage'], ['', 'Marais', 'Mare'], ['', 'Canal', 'Chenal'], ['', 'Étang du bas', 'Etang du haut'],
  ['', 'Citerne', 'Citerne enterrée'], ['', 'Étang', 'Étang 2'], ['', 'Mare', 'Marne'], ['', 'Bassin', 'Bassin 1'], ['', 'Noue 1', 'Noue 11']];
/* n1 : degrés des 42 paires, dans les deux sens ; forme et repères ; distance OSA (restreinte) ; nom tapé dans la palette face au modèle de l'autre */
function nomsPaires(){
  const nb = {meme: 0, proche: 0, '': 0}, faux = [], fauxP = [];
  PAIRES.forEach(([att, a, b]) => {
    nb[att]++;
    const d1 = fx('degreDest', a, b), d2 = fx('degreDest', b, a);
    if (d1 !== att || d2 !== att) faux.push(a + ' / ' + b + ' : ' + JSON.stringify(d1) + ', ' + JSON.stringify(d2));
    const v = verdict(palette(saisieD(a), [modele('b1', b)]));
    if (!(att === 'meme' ? /^refus /.test(v) : att === 'proche' ? /^question /.test(v) : /^accepté/.test(v))) fauxP.push(a + ' face à ' + b + ' : ' + v);
  });
  const liste = (l, n) => l.length ? ' : ' + l.slice(0, n).join(' ; ') + (l.length > n ? ' ; … (' + l.length + ' en tout)' : '') : '';
  R.ok(PAIRES.length === 42 && nb.meme === 21 && nb.proche === 5 && nb[''] === 16 && !faux.length,
    'n1 les 42 paires de la conception gardent leur degré, dans les deux sens (VCroquis.degreDest : 21 de même nom, 5 proches, 16 différentes)' + liste(faux, 5));
  const c = fx('canonDest', 'L\'Étang-du-Bas  2'), c2 = fx('canonDest', 'Œillet A'), d = [['etang', 'etagn'], ['ca', 'abc'], ['fose', 'fosse'], ['', 'mare']].map(([x, y]) => fx('distDest', x, y));
  R.ok(cn(c) === cn({forme: 'etangdubas2', reperes: '2'}) && cn(c2) === cn({forme: 'oeileta', reperes: 'a'}) && JSON.stringify(d) === '[1,3,1,4]',
    'n1 canonDest : « L\'Étang-du-Bas  2 » → etangdubas2, repère 2 ; « Œillet A » → oeileta, repère a ; distDest (OSA, Damerau restreinte) : etang/etagn 1, ca/abc 3, fose/fosse 1, vide/mare 4 ('
    + [cn(c), cn(c2), JSON.stringify(d)].join(' ; ') + ')');
  R.ok(!fauxP.length, 'n1 le premier nom de chaque paire tapé dans la palette face au modèle de l\'autre : même nom refusé (M1, ou M5 pour « Fosse »), nom proche : la question, sinon accepté' + liste(fauxP, 4));
}
/* n2 : « etang » et ses variantes face au modèle « Étang » : palette (M1, sur le nom), Réglages (R), fiche (F) ; témoins */
function nomsEtang(){
  const ET = modele('e1', 'Étang', {ab: 'Ét', art: 'l\'', ep: 'nc'}), MA = modele('m1', 'Mare', {ab: 'Ma', art: 'la'}), MAP = {nom: 'Mare', ab: 'Ma', art: 'la', ep: 'conforme', cst: 'recup'};
  const noms = ['etang', 'ETANG', 'L\'étang', 'Étangs', ' étang '];
  const pal = noms.map(n => { const r = palette(saisieD(n, {ep: 'nc'}), [ET]); return n + ' : ' + (r && r.refus === M1('Étang') && r.m === null && r.champ === 'nom' ? 'M1' : verdict(r)); });
  R.ok(pal.every(s => / : M1$/.test(s)), 'n2 palette : « etang », « ETANG », « L\'étang », « Étangs », « étang » face au modèle « Étang » : M1, le focus sur le nom (' + pal.join(' ; ') + ')');
  const reg = noms.map(n => { const r = reglages(saisieD(n), MA, [ET]); return n + ' : ' + (r && r.refus === MR('Étang') && r.m === null ? 'R' : verdict(r)); });
  R.ok(reg.every(s => / : R$/.test(s)), 'n2 Réglages : modèle « Mare » renommé « etang », « ETANG »… face au modèle « Étang » : « existe déjà dans la liste » (' + reg.join(' ; ') + ')');
  const fi = noms.map(n => { const r = ficheNom(Object.assign({}, MAP, {nom: n}), [ET], []); return n + ' : ' + (r && r.refus === MF('Étang') ? 'F' : verdict(r)); });
  R.ok(fi.every(s => / : F$/.test(s)), 'n2 fiche : une Mare posée renommée « etang », « ETANG »… face au modèle « Étang » : « écrivez « Étang » pour la même » (' + fi.join(' ; ') + ')');
  const t = sur(() => V.destSaisie({nom: 'etang', ep: 'nc', cst: 'autre'})), t2 = reglages(saisieD('Étang', {ab: 'Ét', art: 'l\'', ep: 'conforme'}), ET, [MA]);
  R.ok(!!t && t.refus === '' && !!t.m && t.m.nom === 'etang' && Object.keys(t).sort().join() === 'm,refus' && !!t2 && t2.refus === '' && !!t2.m && t2.m.ep === 'conforme' && !t2.q,
    'n2 témoins : sans listes, destSaisie accepte « etang » comme avant ({m, refus}) ; Réglages, nom inchangé (« Étang », jugement changé) : accepté (' + verdict(t) + ' ; ' + verdict(t2) + ')');
}
/* n3 : « Fosse » (M5) partout, avec ou sans « Fossé » ; « Fossé » seul accepté ; « Fossé » face à « Fossé » : M1 ; le refus du puits d'abord */
function nomsFosse(){
  const FO = modele('f1', 'Fossé', {ab: 'Fo', ep: 'reserve', cst: 'MILIEU'}), MA = modele('m1', 'Mare');
  const vus = [];
  ['Fosse', 'FOSSE', 'fosse', 'La fosse', 'Fosses'].forEach(n => [[], [FO]].forEach(l => {
    const r = [palette(saisieD(n), l), reglages(saisieD(n), MA, l), ficheNom(saisieD(n), l, [])];
    vus.push(n + (l.length ? ' (avec « Fossé »)' : '') + ' : ' + r.map(x => x && x.refus === M5 ? 'M5' : verdict(x)).join('/'));
  }));
  R.ok(vus.every(s => / : M5\/M5\/M5$/.test(s)), 'n3 « Fosse », « FOSSE », « fosse », « La fosse », « Fosses », sans ou avec un modèle « Fossé » : M5 dans la palette, les Réglages et la fiche ('
    + vus.filter(s => !/ : M5\/M5\/M5$/.test(s)).slice(0, 3).join(' ; ') + ')');
  const seul = palette(saisieD('Fossé'), []);
  R.ok(!!seul && seul.refus === '' && !!seul.m && seul.m.nom === 'Fossé' && !seul.q, 'n3 témoin : « Fossé » seul est accepté (' + verdict(seul) + ')');
  const fs = ['Fossé', 'fossé', 'Fossés', 'FOSSÉ', 'le Fossé'].map(n => { const r = palette(saisieD(n), [FO]); return n + ' : ' + (r && r.refus === M1('Fossé') ? 'M1' : verdict(r)); });
  R.ok(fs.every(s => / : M1$/.test(s)), 'n3 « Fossé », « fossé », « Fossés », « FOSSÉ », « le Fossé » face au modèle « Fossé » : M1 (' + fs.join(' ; ') + ')');
  const pu = ['Fosse du puits', 'Puits'].map(n => { const r = palette(saisieD(n), [FO]); return n + ' : ' + (r && r.refus === PUITS_R ? 'puits' : verdict(r)); });
  R.ok(pu.every(s => / : puits$/.test(s)), 'n3 témoin : « Fosse du puits », « Puits » : le refus du puits, toujours le premier (' + pu.join(' ; ') + ')');
  /* une ancienne « Fosse » (d'un plan et d'une tablette d'avant m144) renommée dans sa fiche, face à une autre « Fosse » posée et au
     modèle « Fosse » : « Fossé » garde sa clé de rejet, accepté (relecture M1) ; « fosse » : M5 */
  const FOP = {nom: 'Fosse', ab: 'Fo', art: 'la', ep: 'reserve', cst: 'MILIEU'}, FOM = modele('f0', 'Fosse', {ab: 'Fo', art: 'la', ep: 'reserve', cst: 'MILIEU'});
  const vf = ['Fossé', 'fosse'].map(n => [n, ficheNom(Object.assign({}, FOP, {nom: n}), [FOM], [FOP], 'Fosse')]);
  R.ok(vf[0][1] === null && !!vf[1][1] && vf[1][1].refus === M5,
    'n3 fiche d\'une ancienne « Fosse », face à une autre « Fosse » posée et au modèle « Fosse » : « Fossé » accepté (même clé de rejet ; relecture M1), « fosse » : M5 ('
    + vf.map(([n, r]) => n + ' : ' + (r && r.refus === M5 ? 'M5' : verdict(r))).join(' ; ') + ')');
}
/* n4 (garde) : au chargement, modelesDe ne compare pas les noms */
function nomsChargement(){
  const l = sur(() => V.modelesDe([modele('a', 'Étang'), modele('b', 'etang'), modele('c', 'Fosse'), modele('d', 'Fossé de la route'), modele('e', 'Fossé de la rue'), modele('f', 'Puisard')]));
  R.ok(Array.isArray(l) && l.map(m => m.id + '=' + m.nom).join(' ') === 'a=Étang b=etang c=Fosse d=Fossé de la route e=Fossé de la rue f=Puisard',
    'n4 (garde) au chargement, modelesDe garde « Étang » et « etang », « Fosse », « Fossé de la route » et « Fossé de la rue », « Puisard » (' + (Array.isArray(l) ? l.map(m => m.nom).join(', ') : l) + ')');
}
/* n5 : destination posée « Étang », absente de la palette : palette (acceptée telle quelle, sinon M3) ; fiche (reprise, M3, F) */
function nomsPlan(){
  const POSE = {nom: 'Étang', ab: 'Ét', art: 'l\'', ep: 'nc', cst: 'autre'};
  const ok = [saisieD('Étang', {ab: 'Ét', art: 'l\'', ep: 'nc'}), saisieD('Étang', {ab: 'Ét', ep: 'nc'}), saisieD('Étang', {ep: 'nc'})].map(s => palette(s, [], [POSE]));
  R.ok(ok.every(r => !!r && r.refus === '' && !!r.m && r.m.nom === 'Étang' && r.m.ab === 'Ét' && !r.q),
    'n5 palette, « Étang » (Ét, NC, autre) posée sur le plan, absente de la palette : « Étang » de même abréviation (saisie ou tirée du nom) et mêmes jugements, article « l\' » ou « le » : accepté ('
    + ok.map(verdict).join(' ; ') + ')');
  const ko = [['jugement conforme', saisieD('Étang', {ab: 'Ét', ep: 'conforme'})], ['case milieu naturel', saisieD('Étang', {ab: 'Ét', ep: 'nc', cst: 'MILIEU'})],
    ['abréviation « Et »', saisieD('Étang', {ab: 'Et', ep: 'nc'})], ['« etang »', saisieD('etang', {ab: 'Ét', ep: 'nc'})], ['« Étangs »', saisieD('Étangs', {ab: 'Ét', ep: 'nc'})]]
    .map(([lib, s]) => { const r = palette(s, [], [POSE]); return lib + ' : ' + (r && r.refus === M3('Étang') && r.champ === 'nom' ? 'M3' : verdict(r)); });
  R.ok(ko.every(s => / : M3$/.test(s)), 'n5 palette, la même destination posée : autre jugement, autre case, autre abréviation, « etang », « Étangs » : M3 (' + ko.join(' ; ') + ')');
  const MAP = {nom: 'Mare', ab: 'Ma', art: 'la', ep: 'nc', cst: 'autre'};
  const fA = ficheNom(Object.assign({}, MAP, {nom: 'Étang'}), [], [POSE]), fB = ficheNom(Object.assign({}, MAP, {nom: 'Étang', ep: 'conforme'}), [], [POSE]);
  const fC = ficheNom(Object.assign({}, MAP, {nom: 'etang'}), [], [POSE]);
  R.ok(!!fA && !!fA.reprise && fA.reprise.ab === 'Ét' && fA.reprise.art === 'l\'' && !fA.refus && !fA.q && !!fB && fB.refus === M3('Étang') && !!fC && fC.refus === MF('Étang'),
    'n5 fiche, une Mare (NC, autre) posée renommée : « Étang », de mêmes jugements, accepté, il reprend « Ét » et « l\' » ; jugement conforme : M3 ; « etang » : F ('
    + [verdict(fA), verdict(fB), verdict(fC)].join(' ; ') + ')');
  /* relecture M7 : la destination posée « Étang » (NC) passe avant le modèle « Étang » (conforme) ; témoin : sans elle, le modèle donne
     son abréviation et son article */
  const ETC = modele('e1', 'Étang', {ab: 'Eg', art: 'l\'', ep: 'conforme'}), MAC = Object.assign({}, MAP, {ep: 'conforme'});
  const g7 = ficheNom(Object.assign({}, MAC, {nom: 'Étang'}), [ETC], [POSE], 'Mare'), g7t = ficheNom(Object.assign({}, MAC, {nom: 'Étang'}), [ETC], [], 'Mare');
  R.ok(!!g7 && g7.refus === M3('Étang') && !!g7t && !!g7t.reprise && g7t.reprise.ab === 'Eg' && g7t.reprise.art === 'l\'',
    'n5 fiche, une Mare conforme renommée « Étang », face à « Étang » posée (NC) et au modèle « Étang » (conforme) : M3 (relecture M7) ; témoin, sans la destination posée : '
    + 'le modèle donne « Eg » et « l\' » (' + [verdict(g7), verdict(g7t)].join(' ; ') + ')');
  /* relecture M5 : dans la palette, l'abréviation laissée vide reprend celle de la destination posée (« EG », qui ne se tire pas du nom) ;
     une autre abréviation tapée : M3 ; la même : acceptée */
  const PEG = Object.assign({}, POSE, {ab: 'EG'});
  const a5 = [saisieD('Étang', {ep: 'nc'}), saisieD('Étang', {ab: 'Ét', ep: 'nc'}), saisieD('Étang', {ab: 'EG', ep: 'nc'})].map(s => palette(s, [], [PEG]));
  const vu5 = r => verdict(r) + (r && r.m ? ' ' + r.m.ab + ', ' + r.m.art : '');
  R.ok(!!a5[0] && a5[0].refus === '' && !!a5[0].m && a5[0].m.ab === 'EG' && a5[0].m.art === 'l\'' && !a5[0].q && !!a5[1] && a5[1].refus === M3('Étang')
    && !!a5[2] && a5[2].refus === '' && !!a5[2].m && a5[2].m.ab === 'EG' && !a5[2].q,
    'n5 palette, « Étang » posée avec l\'abréviation « EG » : « Étang » sans abréviation, accepté, il reprend « EG » et « l\' » (relecture M5) ; « Ét » tapée : M3 ; « EG » tapée : '
    + 'accepté (' + a5.map(vu5).join(' ; ') + ')');
  /* relecture M1 : une destination posée « Etang » renommée « Étang » ou « ÉTANG » (même clé de rejet) : acceptée, même face à une autre
     « Etang » posée et au modèle « Etang » ; « Étangs », ou sans le nom d'avant : F ; l'autre déjà écrite « Étang », mêmes jugements : reprise */
  const EA = {nom: 'Etang', ab: 'Et', art: 'l\'', ep: 'nc', cst: 'autre'}, EM = modele('e2', 'Etang', {ab: 'Et', art: 'l\'', ep: 'nc'});
  const m1 = [['Étang', 'Etang', EA], ['ÉTANG', 'Etang', EA], ['Étangs', 'Etang', EA], ['Étang', null, EA], ['Étang', 'Etang', Object.assign({}, EA, {nom: 'Étang', ab: 'Ét'})]]
    .map(([n, n0, autre]) => verdict(ficheNom(Object.assign({}, EA, {nom: n}), [EM], [autre], n0)));
  const att1 = ['accepté', 'accepté', 'refus « ' + MF('Etang') + ' »', 'refus « ' + MF('Etang') + ' »', 'reprise ' + cn({ab: 'Ét', art: 'l\''})];
  R.ok(m1.every((v, i) => v === att1[i]),
    'n5 fiche, une destination posée « Etang » renommée, face à une autre « Etang » posée et au modèle « Etang » : « Étang », « ÉTANG » acceptés (même clé de rejet ; '
    + 'relecture M1) ; « Étangs » : F ; « Étang » sans le nom d\'avant : F ; l\'autre déjà écrite « Étang » : reprise de son abréviation (' + m1.join(' ; ') + ')');
}
/* deux descentes « avant », chacune vers sa destination (E1 « Fossé de la route », E2 aux champs p2) ; clés des rejets et libellés de la ligne */
const deuxDest = p2 => doc({o: [['S1', 'descente', 0, 10, {cote: 'avant'}], ['E1', 'exutoire', 0, 4, {nom: 'Fossé de la route', ab: 'Fo', art: 'le', ep: 'nc', cst: 'autre'}],
  ['S2', 'descente', 8, 10, {cote: 'avant'}], ['E2', 'exutoire', 8, 4, p2]], l: [['t1', 'tr', '', '', ['S1', 'E1']], ['t2', 'tr', '', '', ['S2', 'E2']]]});
const rejetsAvant = d => sur(() => { const an = V.analyser(copie(d), 'edl'), r = V.constatDeduit(copie(d), an).rows.find(x => x.id === 'gout_av');
  return Object.keys(an.exu).length + ' clé(s) ; ' + (r ? r.libs.join(' ; ') : 'ligne absente'); });
/* n6 : nom proche d'une destination : la question, puis chaque réponse, dans la palette, la fiche et les Réglages */
function nomsProches(){
  const RO = modele('r1', 'Fossé de la route', {ab: 'Fo', art: 'le', ep: 'nc', cst: 'autre'}), ROD = {nom: 'Fossé de la route', ab: 'Fo', art: 'le', ep: 'nc', cst: 'autre'};
  const s = saisieD('Fossé de la rue', {ep: 'conforme', cst: 'MILIEU'}), r = palette(s, [RO]);
  R.ok(!!r && r.refus === '' && !!r.q && r.q.texte === QD('Fossé de la route') && r.q.oui === 'La même' && r.q.non === 'Une autre' && !r.q.objet && !!r.m && r.m.nom === 'Fossé de la rue',
    'n6 palette : « Fossé de la rue » face au modèle « Fossé de la route » : la question « ' + QD('Fossé de la route') + ' », « La même », « Une autre » (' + verdict(r) + ')');
  const ok = !!r && !!r.q, non = ok ? fx('reponseNomProche', r, false) : null, oui = ok ? fx('reponseNomProche', r, true) : null;
  R.ok(!!non && !!non.m && cn(non.m) === cn(r.m) && !non.pose && !non.refus && !!oui && !oui.m && !oui.refus && cn(oui.pose) === cn({k: 'pt', t: 'exutoire', modele: ROD, mid: 'r1'}),
    'n6 palette : « Une autre » crée le modèle sous le nom tapé ; « La même » arme l\'outil du modèle « Fossé de la route » (' + [cn(non), cn(oui)].join(' ; ') + ')');
  const rP = palette(s, [], [ROD]), ouiP = rP && rP.q ? fx('reponseNomProche', rP, true) : null;
  R.ok(!!rP && !!rP.q && rP.q.texte === QD('Fossé de la route') && !!ouiP && !ouiP.m && cn(ouiP.pose) === cn({k: 'pt', t: 'exutoire', modele: ROD}),
    'n6 palette, face à une destination posée (absente de la palette) : la question ; « La même » arme l\'outil de ses champs, sans modèle (' + [verdict(rP), cn(ouiP)].join(' ; ') + ')');
  const E2 = {nom: 'Mare', ab: 'Ma', art: 'la', ep: 'conforme', cst: 'MILIEU'}, rF = ficheNom(Object.assign({}, E2, {nom: 'Fossé de la rue'}), [], [ROD]);
  const xF = rF && rF.q ? fx('reponseNomProche', rF, true) : null, nF = rF && rF.q ? fx('reponseNomProche', rF, false) : null;
  const avant = rejetsAvant(deuxDest(E2)), apres = xF && xF.m ? rejetsAvant(deuxDest(Object.assign({}, E2, xF.m))) : 'rien de repris';
  R.ok(!!rF && !!rF.q && rF.q.texte === QD('Fossé de la route') && rF.q.oui === 'La même' && !!xF && cn(xF.m) === cn(ROD) && apres === '1 clé(s) ; Fossé de la route (rejet des EP)'
    && !!nF && !nF.m && !nF.refus && !nF.pose,
    'n6 fiche, deux destinations aux jugements différents (la Mare, conforme, milieu naturel, renommée « Fossé de la rue ») : la question ; « La même » reprend nom, abréviation, article '
    + 'et jugements de l\'autre, d\'où une seule clé et un seul rejet au constat ; « Une autre » : rien de repris (avant : ' + avant + ' ; après : ' + apres + ' ; ' + cn(nF) + ')');
  const MA = modele('m1', 'Mare', {ab: 'Ma', art: 'la', ep: 'conforme', cst: 'recup'});
  const rR = reglages(saisieD('Fossé de la rue', {ab: 'Ma', art: 'la', ep: 'conforme', cst: 'recup'}), MA, [RO]);
  const ouiR = rR && rR.q ? fx('reponseNomProche', rR, true) : null, nonR = rR && rR.q ? fx('reponseNomProche', rR, false) : null;
  R.ok(!!rR && !!rR.q && rR.q.texte === QD('Fossé de la route') && rR.q.oui === 'La même' && !!ouiR && !ouiR.m && !ouiR.pose && ouiR.refus === MR('Fossé de la route')
    && !!nonR && !!nonR.m && nonR.m.nom === 'Fossé de la rue',
    'n6 Réglages, « Mare » renommée « Fossé de la rue » : la question ; « La même » : rien à enregistrer, le toast « ' + MR('Fossé de la route') + ' » (le modèle garde son ancien '
    + 'nom ; relecture M3, M9) ; « Une autre » enregistre le nom tapé (' + [verdict(rR), cn(ouiR), cn(nonR)].join(' ; ') + ')');
}
/* n7 : nom proche d'un objet de la palette (« Puisart ») : la question, chaque réponse ; noms des objets : M4 */
function nomsObjets(){
  const MA = modele('m1', 'Mare'), s = saisieD('Puisart'), rP = palette(s, []), rG = reglages(s, MA, []), rF = ficheNom(s, [], []);
  const q = [rP, rG, rF].map(r => r && r.q ? r.q.texte + ' [' + r.q.oui + '|' + r.q.non + ']' + (r.q.objet ? ' objet' : '') : verdict(r));
  R.ok(q.every(x => x === QO('Puisard') + ' [Le même|Un autre] objet'), 'n7 « Puisart » : la question « ' + QO('Puisard') + ' », « Le même », « Un autre », dans la palette, les Réglages et la fiche ('
    + q.join(' ; ') + ')');
  const rep = (r, oui) => r && r.q ? fx('reponseNomProche', r, oui) : null;
  const oP = rep(rP, true), nP = rep(rP, false), oF = rep(rF, true), nF = rep(rF, false), oG = rep(rG, true), nG = rep(rG, false);
  R.ok(!!oP && !oP.m && cn(oP.pose) === cn({k: 'pt', t: 'puisard'}) && !!nP && !!nP.m && nP.m.nom === 'Puisart' && !nP.pose,
    'n7 palette : « Le même » arme l\'outil Puisard, sans modèle ; « Un autre » crée le modèle « Puisart » (' + [cn(oP), cn(nP)].join(' ; ') + ')');
  R.ok(!!oF && !oF.m && oF.refus === M4('Puisard') && !!nF && !nF.m && !nF.refus, 'n7 fiche : « Le même » : M4, l\'ancien nom reste ; « Un autre » : le nom tapé (' + [cn(oF), cn(nF)].join(' ; ') + ')');
  R.ok(!!oG && !oG.m && !oG.pose && oG.refus === M4('Puisard') && !!nG && !!nG.m && nG.m.nom === 'Puisart',
    'n7 Réglages : « Le même » ne crée ni ne renomme aucun modèle, avec le toast M4 (relecture M3, M9) ; « Un autre » enregistre « Puisart » (' + [cn(oG), cn(nG)].join(' ; ') + ')');
  const m4 = [['Puisard', 'Puisard'], ['puisards', 'Puisard'], ['Gargouile', 'Gargouille'], ['l\'infiltration au sol', 'Infiltration au sol'], ['Rejet en milieu naturel', 'Rejet en milieu naturel'],
    ['Fosse septique', 'Fosse septique'], ['Autre destination', 'Autre destination']].map(([n, lib]) => n + ' : '
      + [palette(saisieD(n), []), reglages(saisieD(n), MA, []), ficheNom(saisieD(n), [], [])].map(r => r && r.refus === M4(lib) ? 'M4' : verdict(r)).join('/'));
  R.ok(m4.every(x => / : M4\/M4\/M4$/.test(x)), 'n7 « Puisard », « puisards », « Gargouile », « l\'infiltration au sol », « Rejet en milieu naturel », « Fosse septique », « Autre destination » : '
    + 'M4 dans la palette, les Réglages et la fiche (' + m4.filter(x => !/ : M4\/M4\/M4$/.test(x)).slice(0, 3).join(' ; ') + ')');
}

(async () => {
  try {
    lignes();
    poserEssai();
    await temoin();
    await essai('a2', 'essai');
    await essai('a3', 'essaiCle');
    regard('', false, 'edl');
    regard('EP', false, 'edl');
    regard('', true, 'avp');
    symbole();
    await droit();
    rendu();
    await planPdf();
    constat();
    await arbitrage();
    await puitsConstat();
    await puitsRendu();
    await puitsProjet();
    await destConstat();
    destPlusieurs();
    destOrdre();
    await destRendu();
    await destProjet();
    destNature();
    natureJugee();
    await sansType();
    nomsPaires();
    nomsEtang();
    nomsFosse();
    nomsChargement();
    nomsPlan();
    nomsProches();
    nomsObjets();
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
