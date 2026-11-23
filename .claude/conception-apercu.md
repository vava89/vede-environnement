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

## Conception relue (18 nov. 2026)
- Fabrication : un workflow de 8 agents, en lecture seule de 769d1af : deux lectures du code (rendu du PDF ; données et
  interface), deux conceptions indépendantes (A : la page du PDF rejouée ; B : un cadre sur le croquis), un juge-synthétiseur
  (A notée mieux que B), deux relecteurs (exactitude : 11 défauts, dont 2 majeurs ; conformité : 13, dont 2 majeurs), une
  correction (défauts majeurs contre-vérifiés : algorithme d'« Espacer », description de Q1) ; 25 défauts corrigés,
  4 écartés en partie. Titres de la conception finale décalés d'un niveau.

- Fiabilité 85 % - *Relue et corrigée le 18 nov. 2026 (lecture seule de 769d1af) ; lot suivant, après le constat délesté. C = croquis/croquis.js, I = index.html ; [p] = présomption ; ES5 ; données fictives.*

Réponses du 17 nov. : voir le rendu final et y déplacer « étiquettes, bulles ou textes » ; chevauchements entourés et comptés, replacés par « Écarter », « mais jamais celles que vous avez placées à la main » ; « une position par plan », le croquis suit l'état des lieux. S11 : un ancien dossier s'imprime comme avant tant que rien n'est déplacé. Ouvertes : Q1 à Q3.

### 1. Principe et forme [P1]

**A1. La page 1 du PDF, rejouée par pdfPlan lui-même.** pdfPlan (C:7099) prend une cible : `pdf = o.cible || new J({...})` (C:7101), `return o.cible ? o.cible : pdf.output('blob');` (C:7345). Superposition plein écran `.vc-pp`, z-index 9 (menu 8 dessous ; .vc-modal 10 et toast 11 dessus) ; le croquis caché n'est plus redessiné. Le PDF est le livrable : un cadre sur le croquis passerait par un autre dessin (Barlow, étiquettes masquées sous 6,5 px).

**A2. Releveur `releveurPdf(J)`** : les 27 méthodes de jsPDF appelées de C:7040 à C:7486, chaque appel noté par page avec la marque ouverte ; getTextWidth et splitTextToSize passent à une vraie instance jsPDF en cache. Chaque ligne de texte reçoit sa largeur imprimée, `getStringUnitWidth(l, {doKerning: false}) × pt × 25,4 / 72` (jsPDF 2.5.1 crène la mesure, pas l'écriture : « AVAVAV Tampon fonte » mesure 21,902 mm et s'imprime sur 23,120), son départ (x ; x − largeur en 'right', signature C:7339 ; x − largeur / 2 en 'center') et sa ligne de base (y + i × pt × 1,15 × 25,4 / 72). Options de text() connues : angle, renderingMode, align ; une autre lève une erreur en test. Tout pdfPlan s'exécute ; seule la page 1 s'affiche.

**A3. Rejeu `rejouerPage(ctx, page, vue)`** : tous les ordres, découpe (C:7158) comprise, en mm × k (px par mm, dpr compris) ; textes au départ et à la ligne de base notés, police `Helvetica, Arial, "Liberation Sans", Roboto, sans-serif`, étirés à la largeur imprimée ; halo (renderingMode 'stroke', C:7068) par strokeText.

**A4. Marques `o.marque`** (Sorties et index.html n'en passent pas) : `o.marque({...})` avant les ordres d'un élément (étiquette ou texte après le calcul de cx, cy, rappel compris ; bulle ; symbole ; nord, échelle graphique, mention), `o.marque(null)` après ; une fois `{k: 'segs', liste: segsPapier()}`. Contenu : {k: 'etiq' | 'tx' | 'bulle' | 'symb' | 'fixe', id ou cle, A (ancre papier), cx, cy, w, h (boîte bq), em, R, statut: 'main' | 'ecart' | 'office' | 'collecteur', support}. Toucher, contours et glisser s'en servent sans recalcul.

**A5. `optsPlan(mode)`** = {mode, logo: opts.logo, reseau: S.reseau, anomalies: ext(), conclusionConstat: conclHote()}, tirée de sortie() (C:6839) et partagée ; jamais telQuel, qui rendrait « horsdossier », sans bulle (C:2035), une anomalie que Sorties numérote.

### 2. Interface (libellés exacts)

**A6. Entrée et barres.**
- Sorties, premier bouton « Aperçu du plan », sous-titre « La page 1 du PDF, à l'échelle du livrable » [P1], suivi en P2 de « : déplacez étiquettes, bulles et textes » ; état S.pp.
- Haut [P1] : « Fermer » (aria-label « Fermer l'aperçu »), « Aperçu du plan », puces « État des lieux » | « Avant-projet » (s'il y a un projet, C:3146), compteur entre « ‹ » et « › », « PDF » (« Faire le PDF de ce plan », chemin de sortie()) ; [P2] « Annuler », « Rétablir » ; [P3] « Espacer ».
- Compteur : « 3 chevauchements », « 1 chevauchement » ou « Aucun chevauchement », plus s'il y a lieu « · 1 coupé par le cadre » (« · 2 coupés par le cadre ») ; « ‹ › » parcourt les deux.
- Bas [P1] : « Page » | « × 2 » | « × 4 », « Repères » (ancres, cadre utile, zones réservées), « Échelle : Auto (1/250) » en lecture seule ; [P2] puces d'échelle, « Masquées (n) », « ⋯ ». Bandeau si le plan affiché dépasse : avisCadre (A21).

**A7. Feuille** [P2], ouverte par un toucher : « Étiquette : <texte> », « Bulle <n> : <observation, 40 caractères> » ou « Texte : <texte> » ; « Placée à la main », « Posée d'office » ou « Placée par « Espacer » », plus « · comme l'état des lieux » sur l'avant-projet qui hérite ; « Replacer » (étiquette posée d'office sur ce plan ; bulle sans position) ; puce « Affichée » / « Masquée » avec aria-pressed (comme C:6225) ; « Comme l'état des lieux » (avant-projet : efface la valeur propre). « Masquées (n) » : la liste, chacune avec sa puce « Masquée », qui l'affiche. « ⋯ » : « Replacer toutes les étiquettes de ce plan » et, sur l'avant-projet, « Reprendre les positions de l'état des lieux » (confirmées, annulables) ; sur l'avant-projet, la pose est séquentielle comme C:6622 et stockée {dx, dy, E} (des {auto: true}, posés un à un au PDF, se chevaucheraient). Toasts : « Glissez une étiquette, une bulle ou un texte : le PDF l'imprimera là. » (première ouverture) ; « Déplacée sur le plan de l'état des lieux ; le plan d'avant-projet garde la sienne. » (premier déplacement sur l'état des lieux d'un dossier à projet).

**A8. Gestes** (en mm de page, touch-action: none).
- [P1] Un doigt dans le vide déplace la page, deux pincent (× 1 à × 8), molette ; double toucher dans le vide (380 ms, 24 px, comme C:4493) : « Page » ↔ « × 2 ». Un toucher choisit (en P2, ouvre la feuille) ; sur un élément, le second toucher d'un double toucher garde le choix, un toucher plus tardif au même endroit passe à l'élément dessous. Prise : boîte d'encre élargie à 44 px CSS, la plus proche, puis la dernière dessinée.
- [P2] Glisser au-delà de 9 px (doigt) ou 4 px (souris), seuils de C:4003 ; un second doigt l'abandonne : rien n'est écrit, aucun pas.
- [P1] Échap et retour de l'hôte : fermerNiveau (C:6846) ferme .vc-modal, la feuille, puis l'aperçu. Clavier (C:5986-5998) : Suppr, Retour arrière et Entrée neutres (supprimerSel ôterait l'objet choisi du croquis caché) ; Ctrl+Z et Ctrl+Maj+Z suivent A19, sinon toast « Rien à annuler dans l'aperçu ».

### 3. Ce qui se déplace [P2]

**A9.** Se déplacent : étiquettes des symboles et des tracés (collecteurs compris), étiquette commune (par son porteur), textes libres, bulles. Restent : fond, symboles, tracés, nord, échelle graphique, mention, colonne de droite, numéro de page, tableaux ; aucune cote n'est imprimée.

### 4. Données par plan [P2]

**A10. Champ nouveau `doc.plans = {avp: {lab: {<id>: Pos}, bulle: {<cle>: Pos}, echelle: n}}`**, parties facultatives ; absent, l'avant-projet suit l'état des lieux, comme aujourd'hui. Pos = {dx, dy, E, main?, ecart?} (comme e.lab), {off: true} ou {auto: true} (posée d'office sur ce plan). L'état des lieux garde e.lab et les bulles (decisions, anomManu) ; il gagne e.decal (texte : écart sur le papier depuis (e.x, e.y) ; l'emprise ne bouge pas) et E sur les bulles écrites par l'aperçu. Objet du seul projet (e.p.st === 'projet') : une seule position, e.lab.

**A11. Lectures contrôlées** (près de decalLab, C:2851) :
```js
function posOk(p){ return !!p && typeof p.dx === 'number' && typeof p.dy === 'number' && isFinite(p.dx) && isFinite(p.dy); }
function propreAvp(doc, sorte, cle){
  var a = doc.plans && doc.plans.avp, t = a && typeof a[sorte] === 'object' ? a[sorte] : null, v = t && Object.prototype.hasOwnProperty.call(t, cle) ? t[cle] : undefined;
  return v && (v.auto === true || v.off === true || posOk(v)) ? v : undefined;
}
function seulProjet(e){ return !!(e.p && e.p.st === 'projet'); }
function labPlan(doc, e, mode){ var v = mode === 'avp' && !seulProjet(e) ? propreAvp(doc, 'lab', e.id) : undefined;
  return v === undefined ? (e.lab || null) : (v.auto ? null : v); }
function decalPlan(doc, e, mode){ var v = mode === 'avp' && !seulProjet(e) ? propreAvp(doc, 'lab', e.id) : undefined;
  if (v === undefined) v = e.decal; return posOk(v) && !v.auto ? v : null; }
function bullePlan(doc, a, mode){ var v = mode === 'avp' ? propreAvp(doc, 'bulle', a.cle) : undefined;
  return v === undefined ? (a.bulle || null) : (v.auto || !posOk(v) ? null : v); }
```
L'état des lieux lit e.lab tel quel ; seuls les champs nouveaux sont contrôlés (E par vcEchelle, dans decalLab) ; invalide = absent. Emplois (mode passé par pdfPlan, absent = 'edl') :
- C:7232-7233 : `L = libre ? decalPlan(doc, e, mode) : labPlan(doc, e, mode)` ; masquée si `!libre && L && L.off` ; sinon L, ou `placerEtiquette(doc, an, e, Ech, idx, null, mode)` ;
- placerEtiquette passe le mode à obstaclesPlan(…, sauf, mode), qui lit labPlan ; placerBulles(…, mode) : `res[a.cle] = decalLab(bullePlan(doc, a, mode), E)` (C:3044), boîte d'obstacle comprise ;
- l'écran du croquis (texte décalé par e.decal, zone de toucher comprise, C:3008-3023), son glisser, sa pose d'office et le DXF passent toujours 'edl', même en mode « avant-projet » de l'écran.
planValide (I:4489-4530) garde les champs inconnus : index.html ne change pas.

**A12. Gel à la première divergence.** `ecrirePos(mode, sorte, cle, valeur)` : sur l'état des lieux d'un dossier à projet, pour un élément non seulProjet sans valeur propre d'avant-projet, il recopie d'abord l'héritage dans doc.plans.avp (e.lab, {off: true} compris, e.decal ou la bulle ; sinon {auto: true}), puis écrit l'état des lieux ; sur l'avant-projet, il écrit doc.plans.avp (e.lab si seulProjet). Échelle : même règle (0 = Auto recopié). Tout ce qui a été déplacé dans l'aperçu, sur l'un ou l'autre plan, a donc sa place propre sur l'avant-projet (Q1).

**A13. Écritures du croquis** : à l'état des lieux, sans gel ; l'avant-projet suit hors valeurs propres (Q1, choix 1). Ce sont le glisser d'étiquette (C:4352, `{dx, dy, E: E(), main: true}`) et de bulle (C:4353, `{dx, dy}`, inchangé), « Affichée / Masquée », « Replacer », les Réglages (C:6552-6624) et les reposes (type, rotation, « Réunir », « Détacher », replacerEtiq, apresProp). « Replacer toutes les étiquettes » des Réglages laisse les valeurs propres, avec le toast « Étiquettes replacées ; celles réglées dans l'aperçu de l'avant-projet gardent leur place sur ce plan. »

**A14. Ménage** : supprimerSel et ouvrir ôtent de doc.plans.avp.lab les id absents ; les bulles restent, comme les decisions ; un doc.plans vide est supprimé.

**A14 bis. Passage au statut « Projet »** (apresProp) : la valeur propre d'avant-projet est reportée dans e.lab ({auto: true} : e.lab reposée d'office), puis ôtée, dans le même instantané.

### 5. Lâcher → impression [P2]

**A15.** Pendant le glisser, (X, Y) = départ (marque) + déplacement, en mm. Au lâcher, (X', Y') = dansCadrePage(F, reserve, X, Y, w, h), la fonction du PDF (C:7142-7152) sortie telle quelle, idempotente (1e-6) ; w, h = bq (bulle : 2r + 0,6). Écrit : `{dx: (X' − A.x) × m, dy: (A.y − Y') × m, E: Ech, main: true}`, m = Ech / 1000 ; à l'impression, decalLab rend la même valeur et C:7234 donne cx = X', cy = Y'. C:7238-7239 deviennent :
```js
if (dansRC(A) || (labDedans && L && L.main)){ var q0 = dansCadre(cx, cy, bq.w, bq.h); cx = q0.x; cy = q0.y; }
else if (labDedans && L && L.ecart){ /* place posée par « Espacer » : imprimée telle quelle */ }
else if (!libre && e.k === 'ln'){ /* collecteur : inchangé */ }
```
Sans champ nouveau, même résultat qu'aujourd'hui. C:7269 ne change pas : l'aperçu ramène toujours une bulle lâchée dans le cadre. Tolérance : 1e-3 mm.

**A16.** Rien n'est figé après un lâcher : tout se recalcule (collecteurs, bulles) ; ce qui a bougé de plus de 0,3 mm clignote 0,3 s.

### 6. Chevauchements [P1]

**A17. Formes**, d'après les ordres notés :
- texte : chaque ligne de x à x + largeur imprimée, de la ligne de base − 0,72 em (− 0,93 em avec une capitale accentuée) à + 0,21 em, plus 0,14 em pour un texte à halo ; élément = union de ses lignes ;
- disques : bulle (rayon 2,225 mm) et symboles ronds (app, app2, descente, siphon, te, point, puisard, puits, infiltration, regpub, forme par défaut ; rayon de rayonSymbole, C:2624) ; autres symboles : carré ± R ;
- fixes, chacun par l'union des ordres de sa marque : nord (cercle, triangles, « N » et son halo), échelle graphique, mention.
Chevauchement : paire déplaçable–déplaçable, –symbole ou –fixe qui pénètre de plus de 0,3 mm (r1 + r2 − D entre deux disques ; r moins la distance du centre à la boîte ; recouvrement dans les deux sens entre deux boîtes). Coupé, compté à part : forme qui sort de RC (C:7108) de plus de 0,3 mm. Ne comptent pas : traits, fond, symbole–symbole. Éléments en cause entourés d'orange (2 px CSS, pointillé si coupé). « ‹ › » : ordre de lecture (y puis x, à 0,1 mm) ; vue « × 2 » centrée, déplaçable choisi.

### 7. « Espacer » [P3]

**A18. Algorithme déterministe, sur le modèle** (formes du rendu courant ; seul l'élément essayé y bouge).
1. Candidats : étiquettes non main (posées d'office, stockées ou calculées, {auto: true}, ecart, collecteurs) et bulles sans position ou en ecart ; une bulle stockée sans ecart compte comme placée à la main. Jamais : textes, éléments main, étiquettes masquées, symboles, fixes.
2. c(M) = nombre de problèmes où figure M (paires d'A17, plus 1 s'il est coupé) ; T = total du compteur.
3. Places de M, en ordre fixe, ramenées par dansCadrePage, doublons à 0,01 mm et place actuelle ôtés. Symbole : DIR16 (16 directions, pas de 22,5°, en dur) × d ∈ [1.1, 4, 8, 12] mm, centre A + u × (R + d + |ux|·w/2 + |uy|·h/2). Tracé : fractions [.5, .35, .65, .2, .8, .1, .9] du support (morceauVisible pour un collecteur, sinon le segment de l'ancre coupé au cadre) × côtés [1, −1] × écarts [1.4, 4, 7] mm. Bulle : DIR16 × f ∈ [1.15, 2.1, 3.1, 4.5, 6], centre à R + r·f.
4. M ne bouge que vers une place où c(M) baisse strictement ; parmi les places de c minimal, la plus petite note « 5 par segment de segsPapier traversé + distance en mm au centre actuel de M » (pas à l'ancre : un collecteur n'est pas tiré vers le bord) ; à égalité, la première.
5. Passes : candidats de c > 0 par c décroissant, puis ordre de lecture, puis id ou cle, c recalculé à chaque tour ; on répète jusqu'à une passe immobile.
6. Preuve : déplacer M ne change que les problèmes où il figure, donc ΔT = Δc(M) ≤ −1 : au plus T0 déplacements et T0 + 1 passes (borne de garde, erreur en test si atteinte). Le total ne monte jamais ; ce qui ne chevauche rien et n'est pas coupé ne bouge pas.
7. Écriture par ecrirePos (gel d'abord) : `{dx, dy, E: Ech, ecart: true}` pour chaque déplacé. Puis le rendu est refait : un posé d'office (bulle sans position, collecteur, étiquette sans lab ou {auto: true}) à plus de 1e-3 mm de sa place du modèle y est figé en ecart, jusqu'à égalité (chaque tour en fige au moins un ; la branche ecart d'A15 l'imprime tel quel). Les figés ne comptent pas parmi les « espacés ». Un instantané : un seul « Annuler » ; rien n'est écrit s'il n'y a rien à changer ; un second appel ne change rien.
8. Messages (participe selon Q2) : « 5 éléments espacés. » ; « 5 éléments espacés ; restent 2 chevauchements · 1 coupé par le cadre : glissez-les du doigt. » (parties nulles omises) ; rien n'a bougé, aucun candidat en cause : « Ces chevauchements ne touchent que des éléments placés à la main ou des textes : glissez-les du doigt. » ; rien n'a bougé, des candidats en cause : « Aucune place ne réduit ces chevauchements : glissez-les du doigt. » ; T = 0 : bouton grisé, « Aucun chevauchement à espacer ». Un ecart reste candidat ; un glisser le rend main.

### 8. Annuler [P2]

**A19.** Pile du croquis (S.undo, 100 pas, le plus ancien ôté au-delà, C:3505) et deux compteurs de l'aperçu, S.pp.pas (jamais plus que S.undo.length) et S.pp.redo. Un pas : instantané au lâcher, avant l'écriture, ou au début d'une action, puis changement({garderPanneau: true}) ; pas + 1, redo = 0. « Annuler » appelle annuler si pas > 0 (pas − 1, redo + 1), « Rétablir » refaire si redo > 0 ; sinon grisés, et Ctrl+Z suit la même règle : l'aperçu ne défait jamais un geste du croquis. etatCourant et restaurer (C:3501-3515) prennent `plans` (e.decal et les bulles sont déjà dans el, decisions, anomManu). À la fermeture, les compteurs tombent ; la pile reste entière.

### 9. Enregistrement, export, anciens dossiers [P2]

**A20.** enregistrer garde doc.plans et e.decal ; exportJson copie tout ; le code n'a ni duplication de dossier ni copier-coller d'objets. Un ancien dossier donne les mêmes ordres qu'aujourd'hui : empreinte 'pdf-plan' (A25).

### 10. Échelle et dépassement

**A21. Une échelle par plan** [P2] :
```js
function echellePlan(doc, mode){ var a = mode === 'avp' && doc.plans && doc.plans.avp;
  var v = a && typeof a.echelle === 'number' && (a.echelle === 0 || vcEchelle(a.echelle)) ? a.echelle : doc.echelle;
  return v > 0 ? v : echelleAuto(doc, mode); }
```
- Elle remplace les formules de C:7104, de depasseCadre (C:3141) et d'echellesPlans (C:3145-3149) ; le cartouche et l'envoi (I:4479) suivent. E() (C:3474-3479) ne change pas : le croquis suit l'état des lieux.
- echellesPlans(doc) rend {edl, avp, autoEdl, autoAvp, avpPropre, coupeEdl, coupeAvp} ; avisCadre en tire, pour chaque plan coupé, « Même au 1/… » (Auto) ou le conseil, et renvoie aux « Réglages du croquis » ou, pour un avant-projet à échelle propre, à l'« aperçu du plan ». L'aperçu ne lui passe que le plan affiché (« … ou une échelle plus petite pour ce plan. » ; en P1, sans `ici`).
- Aperçu : puces Auto, 1/100, 1/150, 1/200, 1/250, 1/500 et, sur l'avant-projet, « Comme l'état des lieux » (« Échelle : 1/200 (comme l'état des lieux) »).
- Avant-projet à échelle propre : aux Réglages, champ « Échelle du plan de l'état des lieux », puce « Auto (1/250) », ligne « Avant-projet : 1/500, réglée dans l'aperçu du plan. » ; dans Sorties : « Échelle du plan de l'état des lieux : 1/250 (automatique) ; avant-projet : 1/500, réglée dans l'aperçu du plan · A4 paysage. »

### 11. Rotation et changement de type [P2]

**A22.** replacerTraces (C:5591-5604) : ecart suit comme main ; e.decal tourne ; dans doc.plans.avp, les Pos main ou ecart tournent, une Pos d'office de tracé devient {auto: true}, celle d'un symbole ne change pas (comme e.lab), les bulles propres tournent. changerType : C:6709 repose e.lab sauf off, même main ; l'entrée propre de l'avant-projet suit la même règle ({auto: true}, sauf {off: true}).

### 12. Performances [P1]

**A23.** Calcul complet à l'ouverture, au lâcher et après une action ; pendant le glisser, seul le canevas de l'élément saisi bouge (ordres de sa marque translatés), entre la page sans lui et les repères ; pince en transformation CSS. `o.cacheFond` (aperçu seulement) reprend les ordres du fond tant que la clé est la même : Ech, cP, rot, calques, offF et offR (C:7160), identité et révision du fond et du réseau ; il vit le temps de l'aperçu ; Sorties ne s'en sert jamais. « Calcul… » au-delà de 300 ms. Node : 6,4 ms sans fond, 54,1 ms à 200 000 sommets [p : × 3 à × 5 sur tablette].

### 13. Constat signé, croquis désactivé [P1]

**A24.** Le constat a son propre dessin, figé à la signature (croquisAJour, I:2374-2378, ne fait rien si c.signeLe) ; l'aperçu n'écrit que S.doc. Croquis désactivé ou absent : pas d'aperçu, index.html inchangé (v1.5.1). jsPDF absent : toast « La bibliothèque PDF n'est pas chargée », pas d'aperçu.

### 14. Tests par correctif

**A25.** tests/vm/apercu.js et tests/navigateur/apercu.js, dans tests/tout.sh ; croquis fictif sur VCroquis.demoDxf().
- P1, témoin du livrable : les deux plans, Auto et 1/200, avec et sans fond, plan tourné, logo, « AVAV », capitales accentuées, deux lignes, signature, collecteur et objet hors cadre, ancienne bulle {dx, dy} : appels du releveur = ceux d'un espion du vrai jsPDF, toutes pages, à 1e-9. Empreinte compat 'pdf-plan' dans SORTIES (tests/vm/compat.js) : date figée, espion complet de la page 1, fond lireFondDxf(demoDxf()), régénérée sur une copie du commit d'avant P1 (--app=<dossier>). Rejeu sur un faux contexte 2D : x, y et largeur de chaque ligne. Chevauchements construits : deux étiquettes, étiquette sur le « N », bulle coupée, bulle en diagonale d'un appareil (ne compte pas). Cache = ordres frais, réseau chargé après coup compris. Navigateur : ouverture, pixels sombres aux étiquettes, zoom, double toucher, Échap, Suppr neutre, Ctrl+Z sans effet, croquis désactivé, jsPDF absent.
- P2 : chaque sorte (étiquette de symbole, de tracé, de collecteur, texte, bulle) lâchée en un point s'imprime là à 1e-3 mm, bords et zones réservées compris ; plans indépendants ; gel ; avant-projet qui suit le croquis ; pose d'office de l'avant-projet qui évite ses étiquettes propres ; statut « Projet » ; bulle du 1/200 au 1/500 ; champs invalides ignorés ; rotation ; Annuler, Rétablir, glisser abandonné sans pas ; « Replacer toutes les étiquettes de ce plan » ; empreinte inchangée. Navigateur : glisser au doigt (variante de glisserDoigtCv), puis sortie('pdfEdl') espionné, à ± 0,05 mm ; tracer puis ouvrir l'aperçu : « Annuler » grisé ; constat signé intact.
- P3 : ce qui ne chevauche rien ne bouge pas ; avec un seul chevauchement, seuls ses deux éléments peuvent bouger ; un collecteur hors du cadre n'est pas tiré vers le bord ; le compteur ne monte jamais (trois symboles contre une paire de candidats) ; second appel sans effet, sur un cas de plus de trois passes ; zone dense ; ni main ni texte touché ; un seul « Annuler » ; PDF = modèle.

### 15. Découpage

**A26.** Trois correctifs au lot suivant, après le constat délesté, chacun utile et testable seul, marqués entre crochets : P1, lecture seule (échelle en lecture seule et bandeau compris) ; P2, déplacer ; P3, « Espacer ».

### 16. Risques [p]

- Police de la tablette étirée (Roboto sous Android) : positions et largeurs exactes, dessin approché ; Liberation Sans embarquée si besoin.
- « Établi le » porte la date du jour. Cibles petites à « Page » : prise élargie, zoom.
- Collecteur figé qui sort du cadre (rotation, échelle) : la pose le long du morceau visible reprend. Porteur d'étiquette commune qui change (m141) : la position peut redevenir d'office.

## Questions posées le 18 nov. 2026 (sans réponse)
- Q1. Dans un dossier qui a un avant-projet, vous glissez une étiquette ou une bulle sur le croquis (et non dans l'aperçu). Que doit faire le plan d'avant-projet ? Choix : « Il suit le croquis, sauf pour ce que vous avez déjà déplacé dans l'aperçu, sur l'un ou l'autre plan (Recommandé) » ; « Il ne bouge pas : seul l'état des lieux change, même depuis le croquis ». Effet : Choix 1 : pour qui n'ouvre pas l'aperçu, le PDF ne change pas : le PDF d'avant-projet suit le croquis, comme aujourd'hui. Un élément que vous déplacez dans l'aperçu, sur l'un ou l'autre plan, garde sa place sur le PDF d'avant-projet (déplacé sur l'état des lieux, l'avant-projet garde l'ancienne) et ne suit plus le croquis sur ce plan tant que vous n'avez pas touché « Comme l'état des lieux ». C'est le moins de travail. Choix 2 : glisser une étiquette ou une bulle sur le croquis, « Affichée / Masquée », « Replacer », « Replacer toutes les étiquettes », le changement de type, « Réunir » et « Détacher », ou l'échelle des Réglages ne changent plus que le PDF de l'état des lieux ; pour les reporter sur l'avant-projet, on touche « Reprendre les positions de l'état des lieux » dans l'aperçu. Plus de travail et de tests. Dans les deux cas, un texte libre glissé sur le croquis bouge sur les deux plans, et la rotation du plan tourne les deux.
- Q2. Quel nom donner au bouton qui replace automatiquement les étiquettes et les bulles qui se chevauchent ? Choix : « « Espacer » (Recommandé) » ; « « Écarter », comme dans votre réponse du 17 nov. » ; « « Démêler » ». Effet : Seuls le nom du bouton et ses messages changent (« 5 éléments espacés », « écartés » ou « démêlés ») ; rien ne change dans le dossier ni dans le PDF. « Écarter » se confond avec « Écartée », statut d'une anomalie dans la fiche, et avec « retenir ou écarter l'anomalie », imprimé au tableau du PDF.
- Q3. D'où ouvrir l'aperçu du plan ? Choix : « Seulement depuis le croquis : premier bouton du panneau Sorties (Recommandé) » ; « Aussi depuis la fiche du dossier, à côté de « Plan PDF » ». Effet : Choix 1 : la fiche ne change pas ; on ouvre le croquis, puis Sorties, puis « Aperçu du plan ». Choix 2 : un bouton « Aperçu du plan », à côté de « Plan PDF », ouvre le croquis directement sur l'aperçu ; un peu plus de travail et un test de plus ; il n'apparaît pas quand le croquis est désactivé ou absent (comportement de la v1.5.1) et ne change rien à un constat signé. Le PDF est le même dans les deux cas ; ce bouton peut aussi venir plus tard.
