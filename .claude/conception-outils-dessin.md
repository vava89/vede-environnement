# Conception du lot « Outils de dessin » (v1.7.0, souhaits 10, 11, 12, 16, 17)

Établie le 7 nov. 2026 sur 1e27c7b. Détail de l'éditeur (lignes, fonctions, risques) : carte du lot dans le carnet de la session
(`carte-outils-dessin.md`, §1 à §11). Ce fichier garde les décisions ; [p] = présomption à signaler à l'utilisateur.

## Réponses de l'utilisateur (7 nov. 2026)
- 11.1 : droite et gauche du technicien qui regarde la façade depuis le dehors du bâtiment (pas la recommandation).
- 11.3 : aucune cote gardée, seule la position compte ; « Mesurer depuis une façade » redonne la mesure ; la distance boîte-limite reste sur l'étiquette.
- 12.1 : largeur d'un seul côté de la ligne départ-fin ; le départ est un coin de l'escalier ; côté gauche ou droit au choix.
- 10.4 : « Reprendre du croquis » reprend distance, côté et profondeur de la boîte par réseau, avec une boîte par réseau seulement,
  jamais sur une valeur changée par le technicien.
- Autres questions du lot : recommandations du cadrage (`.claude/cadrage-v170.md`, l. 9-107).

## Convention 11.1 (repère du plan, indépendante de la rotation de la vue)
Notations : côté [A, B] (côtés consécutifs alignés à 2° près fusionnés), t = (B − A)/|AB|, n normale extérieure,
cw(v) = (v.y, −v.x) (droite de qui regarde selon v), ccw(v) = (−v.y, v.x).
- **Prolongement au-delà du coin O** : w part de O et s'éloigne du côté (w = −t au-delà de A, +t au-delà de B).
  Le technicien est dehors, dans le prolongement, face au bâtiment (il regarde selon −w) [p, lecture annoncée le 7 nov.].
  **P = O + d·w + e·(droite ? ccw(w) : cw(w))**. Même règle pour un bâti, une limite ou un trait de complément.
  Exemple : bâti (0,0) (10,0) (10,6) (0,6), façade sud ; au-delà du coin ouest, d 2, e 0,5, droite → (−2 ; −0,5) ;
  au-delà du coin est, d 2, e 0,5, droite → (12 ; 0,5). Un aperçu en direct montre le côté avant la pose.
- **Le long** (entre A et B) : face à la façade depuis le dehors, droite et gauche sont parallèles au côté ; elles nomment le coin d'origine
  (« Coin gauche », « Coin droit », vus du dehors) ; le décalage se dit « Devant » (vers n, dehors) ou « Derrière » (vers −n) [p].
  **P = O + d·w + e·(devant ? n : −n)**, w de O vers l'autre coin. A est le coin gauche si t·cw(−n) > 0.
  Exemple : depuis le coin gauche, d 3, e 1, devant → (3 ; −1) ; depuis le coin droit → (7 ; −1).
  Ligne sans intérieur (trait ouvert) : « Devant » = côté du toucher approximatif [p].
  Limite de parcelle : n = dehors de la parcelle ; puces « Intérieur » (côté propriété, derrière) et « Extérieur » (devant),
  le vocabulaire de la boîte en limite (D4) [p].
- **Mesurer** : inverse exact (aller-retour à 1e-9) ; si e = 0, le côté affiché est gardé.
- Valeurs positives seulement (refuser « -1 ») ; 0 permis. Arrondis seulement dans la fiche (1 cm à l'affichage, 5 cm au pré-remplissage).

## Décisions du lot
- D1 Point qui tombe dans le bâti (coin rentrant) : avertir, ne jamais refuser [p].
- D2 Pose par cotes : position exacte, sans accroche, sans raccord ni insertion dans un tuyau, sans attache de mur ; objet orienté selon
  le côté s'il est orientable ; un seul pas d'annulation [p : un ouvrage posé par cotes sur un tuyau reste libre].
- D3 Lignes de référence : côtés du bâti, traits « Complément du fond », limites de parcelle (calques dont le nom contient PARCELLE sans TEX ;
  SECTION, SUBDFISC, SUBDSECT, ZONCOMM écartés ; PARCELLENFP : suivre le traitement existant du code, sinon écarter [p]).
  L'escalier n'est ni ligne de référence ni cible d'accrochage dans ce lot [p]. Second toucher au même endroit : ligne superposée suivante.
- D4 Boîte en limite (souhait 10) : champs facultatifs p.limCote ('int' | 'ext') et p.limDist (≥ 0) sur une boîte seulement (pas de regard public).
  Étiquette (écran, PDF, DXF) : « à 0,80 m de la limite, intérieur » | « …, extérieur » ; 0 → « en limite de propriété » ;
  distance sans côté → « à 0,80 m de la limite » ; côté sans distance → « côté intérieur » | « côté extérieur » [p].
  La ligne suit la règle de la ligne de profondeur face à une étiquette personnalisée (p.etiq) [p]. Aucune anomalie pour une boîte loin de la limite.
- D5 Côté proposé (10.1) : parcelle de l'installation = polygone fermé qui contient le plus d'objets existants dessinés ; égalité, aucun
  objet ou polygone ouvert → aucune proposition. Proposition en pointillé, confirmée d'un toucher ; la saisie du technicien l'emporte.
- D6 Constat (10.4) : format « 0,80 m intérieur » ; 0 → « en limite » ; sans côté → « 0,80 m » ; sans distance → « intérieur ».
  Boîte unitaire : compte en EU et en EP [p]. Seules les boîtes existantes comptent (ni « projet », ni « à supprimer »).
  Même provenance (P) que les autres champs repris ; constat signé jamais modifié ; croquis désactivé → rien (v1.5.1).
- D7 Escalier (souhait 12) : t:'esc', deux sommets jamais attachés, p {larg, n, cote 'g'|'d' vu du départ vers la fin, monte 'fin'|'depart'} ;
  pas de p.long ; flèche = sens de la montée ; par défaut, montée vers le bout posé sur une façade. Pas de bouton « Inverser » [p].
  Statut existant seulement, aucune étiquette, légende « Escalier », calque VEDE-ESCALIERS écrit seulement s'il sert. Hors analyse.
  Une ancienne version le dessine comme un trait « Réseau non déterminé » sans changer son analyse : accepté [p].
- D8 Souris (souhait 16) : survol, « + » qui suit et menu à 0,4 s pour la souris seulement ; stylet et doigt : bulle « + point » [p].
  Clic droit : menu de poignée ou de segment du tracé choisi, sans effet ailleurs ni avec un autre outil ; glissé au bouton droit = vue.
  Menu DOM : « Retirer le point » (grisé sous 3 sommets ou sommet porteur), « Détacher », « Ajouter un point » (milieu du segment suivant,
  du précédent pour le dernier sommet). Aucun déplacement de segment entier.
- D9 Accrochage (souhait 17) : bouton à côté de l'aimant, palette flottante de puces ; aides existantes inchangées (clés et portée) ;
  nouvelles clés Milieu, Perpendiculaire, Prolongement, Intersection, Limites, décochées par défaut, lues strictement (=== true) ;
  elles valent pour tout point saisi, points de tronçon compris, après le réseau (toujours prioritaire, non désactivable) [p] ;
  cibles prises sur les lignes de référence, jamais sur les tronçons ; mêmes seuils que l'accroche au coin.
- D10 Compatibilité : référence 1e27c7b, valeurs figées (tests/vm/compat.js) ; doc.v reste 1 ; tout champ nouveau facultatif ;
  grille de 400 touchers inchangée tant que les nouvelles aides sont décochées.
- D11 Défauts hors lot traités au passage : type d'objet inconnu sans échec (m106) ; texte trompeur des Réglages de l'hôte (m111) ;
  clés inconnues de restoreZip (m105) ; tests/LISEZMOI.md l. 23 (m98).

## Découpage (m96 et m97 faits ; au plus 20 correctifs avant fusion)
m98 VC.geo et garde de compatibilité · m99 lignes de référence · m100 souris (clic droit, survol) · m101 mode « Cotes » (pose) ·
m102 « Déplacer par cotes » et « Mesurer depuis une façade » · m103 boîte : champs et étiquette · m104 boîte : côté et distance
proposés depuis le plan · m105 constat : reprise de la boîte · m106 escalier : type et rendu · m107 outil « Escalier » ·
m108 escalier : départ par cotes · m109 menu de poignée à la souris · m110 « + » au survol et bulle « + point » ·
m111 palette d'accrochage · m112 nouveaux accrochages (scindé en m112 et m113 s'il est trop gros : 18 sur 20).
