# Aperçu du plan à l'échelle du livrable (lot suivant, après le constat délesté)

Conception à faire relire avant le code ; ce fichier garde la demande, les réponses de l'utilisateur et la reconnaissance du code.

## Demande de l'utilisateur (17 nov. 2026, mot pour mot)
« Préparer un outil de prévisualisation du plan pour avoir un aperçu du rendu à l'échelle du livrable et pouvoir adapter la position des
étiquettes qui se chevauchent ou simplement rendre le plan lisible »

## Réponses de l'utilisateur (17 nov. 2026, vers 23 h, heure de Paris ; mot pour mot)
1. « Outil d'aperçu du plan : que doit montrer l'écran ? » (proposés : « La page du PDF, à l'identique (Recommandé) » ; « Le cadre du PDF
   sur le croquis ») → réponse libre : « L'un ou l'autre, la solution optimale pour visualiser le rendu final et pouvoir déplacer les
   étiquettes,bulles ou textes qui seraient mal disposés lorsqu'ils sont dessinés à l'échelle du livrable »
2. « Dans l'aperçu du plan, que faire des étiquettes et des numérotations d'anomalies qui se chevauchent ? » → « Signaler + bouton
   « Écarter » (Recommandé) » : « Celles qui se chevauchent sont entourées et comptées. « Écarter » les replace automatiquement, mais
   jamais celles que vous avez placées à la main. On peut toujours les glisser du doigt, et annuler. »
3. « Une étiquette déplacée dans l'aperçu du plan de l'état des lieux doit-elle bouger aussi sur le plan d'avant-projet ? » → « Non, une
   position par plan » : « Chaque plan garde ses propres réglages ; le croquis à l'écran suit l'état des lieux. Plus de travail, et un
   nouveau champ dans les dossiers. »
4. « Où placer l'outil d'aperçu du plan ? … » → « Lot suivant, après le constat délesté (Recommandé) » : « La v1.7.2 se termine comme
   prévu. L'outil vient juste après le constat délesté, que vous avez mis en premier dans le lot suivant. Je prépare la conception dès
   maintenant. »

## Reconnaissance du code (f71a6e7)
- Plan PDF : pdfPlan (croquis.js), A4 paysage ; cadre de 205 × 192 mm (CADRE) ; échelle doc.echelle, sinon echelleAuto, par plan (l'état
  des lieux et l'avant-projet peuvent avoir deux échelles) ; plan centré sur son emprise ; page 1 : plan, nord, échelle graphique,
  cartouche, légende ; pages suivantes : tableau des anomalies.
- Étiquette d'un objet : e.lab = {dx, dy, E, main} ; écart gardé en mm de papier à toute échelle (decalLab) ; posée d'office à la
  création (placerEtiquette : 8 places autour d'un symbole, 6 le long d'un trait), puis gardée : un dessin ajouté ensuite à côté ne la
  fait pas bouger. Glissée à la main : main: true. lab.off la masque. Texte libre (e.k === 'tx') : position e.x, e.y du plan.
- Le PDF ramène les étiquettes dans le cadre et hors du nord et de l'échelle graphique (dansCadre), pose celles des collecteurs de la
  rue le long de leur partie visible, trace un trait de rappel vers un symbole éloigné.
- Bulles des anomalies : placerBulles (autour de l'objet, sans se chevaucher) ; position à la main : doc.decisions[clé].bulle, ou
  anomManu[].bulle ; au plan d'avant-projet, ce sont les bulles de l'état des lieux (une préconisation par anomalie).
- Ce que l'écran du croquis montre autrement que le PDF : symboles grossis de loin, étiquettes masquées sous 6,5 px, police Barlow
  (Helvetica au PDF), ni cadre ni recadrage du PDF.
- Existe déjà : glisser une étiquette ou une bulle sur le croquis ; fiche : « Affichée / Masquée », « Replacer » ; Réglages : « Replacer
  toutes les étiquettes » (repose aussi celles placées à la main) ; puces d'échelle (Auto, 1/100 à 1/5000).
- Constat signé : son croquis est une image à lui, figée à la signature (croquisAJour) ; l'aperçu du plan n'y touche pas.

## Première proposition (avant la conception relue)
- Bouton « Aperçu du plan » (Sorties, barre d'outils) : plein écran, la page 1 du PDF dessinée par le même code que le PDF, écrit vers
  une cible « écran » (ordres de dessin enregistrés, textes mesurés par jsPDF), rejouée sur un canevas : ce qu'on voit est ce qui
  s'imprime. Bascule état des lieux / avant-projet ; zoom (page entière, 100 %, pincer) ; puces d'échelle avec l'avertissement « dépasse
  le cadre ».
- Glisser une étiquette, une bulle ou un texte libre : position à la main pour ce plan seulement (réponse 3) ; toucher : « Replacer »,
  « Masquer » ; annuler.
- Chevauchements (étiquettes, bulles, textes, symboles) entourés et comptés, « Suivant » ; « Écarter » replace d'office ceux qui ne sont
  pas à la main (réponse 2).
- Deux ou trois correctifs : rendu de la page ; glisser, menu et positions par plan ; chevauchements et « Écarter ».
