# Conception de la v1.7.2 (réponses du 16 et du 17 nov. 2026)

Statut : conception relue par deux relecteurs dans la nuit du 16 au 17 nov. 2026 (RX : exactitude technique ; RF : fidélité et clarté) ;
défauts appliqués : X1, X2, X3, X5, X6, X7, X8, X9, X10, F1, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15 ; écartés : X4 et
F2, réfutés par la réponse « D'accord » du 16 nov. à regard-suit-exutoire (un regard vers une infiltration est jugé EP, en réserve,
« même si un WC y est relié » ; « un regard sur un drain d'infiltration est jugé en EP ») : voir D8.

Mise à jour du 17 nov. 2026, après-midi : réponses du groupe « Suivi » du formulaire (S1 à S16) et réponses du fil aux trois questions qui
les ont suivies (constat délesté, prolongement, escalier), reportées mot pour mot dans « Réponses de l'utilisateur » ; décisions, cartes,
souhaits restants et questions revus en conséquence ; m137 à m140 faits ; nouvelle carte m155 (D2). Cette mise à jour a été relue par deux
relecteurs (exactitude, fidélité : `scratchpad/v172/suivi-17nov/relecture/relecture-x.md` et `…/relecture-f.md`) : 25 défauts, dont quatre
majeurs confirmés en tout ou en partie et aucun bloquant, tous corrigés. Les numéros de ligne cités restent ceux de 71a4ed6, sauf dans les
cartes « Fait » (numéros de leur commit) et dans m155 (numéros de 1ee93f4) : m137 à m140 en ont décalé, et chaque correctif les retrouve par
recherche.

- Fiabilité 80 % - Établie le 17 nov. 2026 sur 71a4ed6 (v1.7.1 fusionnée, numéro 1.7.2), sur le modèle de `.claude/conception-equipements.md`.
  Lignes citées : code actuel (CJ = croquis/croquis.js, 7 647 lignes ; IX = index.html, 5 071 lignes, numéros du fichier).
- Études du workflow, citées par section : EA = `scratchpad/v172/conception/etude-a.md` (constat, rejets, boîte) ; EB = `…/etude-b.md`
  (dessin, étiquettes, destinations) ; EC = `…/etude-c.md` (souhaits restants). Relectures : RX = `…/relecture-x.md` (X1 à X10) et
  RF = `…/relecture-f.md` (F1 à F15). [p] = présomption à signaler à l'utilisateur ; « vérifié » = relu par moi dans le code le 17 nov.
- Souhaits restants de la v1.7.0 (1, 5, 6, 9, 13, 14) et réponses du cadrage (cadrage-14-4, cadrage-validation-departement,
  cadrage-13-reserve, cadrage-sans-croquis) : EC, résumée à la section « Souhaits restants (après la v1.7.2) » ; lot suivant, après la fusion
  de la v1.7.2, le constat délesté en premier (fil du 17 nov.). fusion-ab est faite (m136, PR #13).
- Compte : établie à 0/20 correctifs depuis la fusion de la v1.7.1 (compte courant : .claude/etat-travaux.md). Ce lot : 19 numéros (m137 à
  m155 ; m155 ajouté le 17 nov. après le fil, D2) ; m156 reste pour une scission de m154 ou une relecture.
- Questions du groupe « Suivi » : `suivi.json`, 16 questions, étiquetées S1 à S16 dans l'ordre de lecture (d'abord celles qui bloquent un
  correctif proche). Il réunit `suivi-v172.json` et `suivi-c.json` corrigés : suivi-constat-signe est retirée (F7 : la règle est dans
  CLAUDE.md, D13) ; suivi-noms-proches est ajoutée (F9, D10). Liste à la fin, avec les réponses du 17 nov. et ce que chacune change.

## Réponses de l'utilisateur

### 16 nov. 2026, formulaire « Questions ouvertes VÉDÉ » (mot pour mot, vérifié dans a-faire-91.md ; archive : .claude/etat-archive.md)
- q7-trop-plein : choix b « Oui : chaque exutoire atteint par le trop-plein compte avec son jugement, comme en Q7 (a) » (appliqué : a).
- destinations-meme-nom : choix b « Oui, la refuser avec un message » (appliqué : a) ; commentaire : « Prévoir une comparaison suffisante avec
  les dénominations existantes pour ne pas manquer un nom identique qui aurait été mal orthographié ou sans accent, sans majuscule, etc... »
- symbole-puits : « À changer » ; commentaire : « Utiliser un symbole semblable à celui du cadastre avec une barre diamétrale et des manivelles
  aux extrémités ».
- puits-venu-fichier : choix b « Oui : la juger comme un puits, non conforme » (appliqué : a).
- e1 : choix b « Sur aucune ligne tant que l'opérateur n'a pas choisi » (appliqué : a) ; commentaire : « Ne jamais écrire "Autres :". Créée
  simplement une nouvelle ligne avec le nom de l'équipement ».
- e2 : choix a « La retirer partout, croquis désactivé compris ; une ligne déjà saisie reste, et le libellé peut toujours être tapé à la main »
  (appliqué : c).
- e4 : choix b « Présélection des appareils EU à moins de 3 m et au même niveau, à retirer d'un toucher » (appliqué : a) ; commentaire : « Ne
  jamais fusionner des appareils ensemble. L'opérateur choisit lui-même de dessiner tous les équipements ou alors de dessiner seulement une
  étiquette "cuisine" "salle de bain" etc... »
- ordre-etiquette-commune : choix b « L'ordre de l'exemple de la conception : « douche, lavabo, WC + lave-mains » ; « Salle de bain 1, Évier 1,
  WC 1 » » (appliqué : a).
- rangement-autres-par-texte : choix b « Les ranger d'après l'objet du croquis » (appliqué : a).
- pr12-2 : choix d « Les deux » (appliqué : a).
- pr12-5 : choix b « Oui : rattacher la boîte au réseau de ses appareils » (appliqué : a).
- pr12-9 : choix b « Non : changer la longueur ou le libellé, à préciser en commentaire » (appliqué : a) ; commentaire : « Ne pas donner de
  limite au prolongement ».
- pr12-10 : choix b « Oui, ne garder que « Évier » » (appliqué : a).
- pr12-11 : choix a « Le garder » ; commentaire : « Retirer la mention intérieur ou extérieur à la suite de la distance et créer une nouvelle
  ligne avec un choix à cocher pour indiquer si la boîte de branchement est à l'intérieur ou à l'extérieur de la propriété ».
- puits-milieu-naturel : « À changer » ; commentaire : « Créée une colone "Puits", garder le rejet EP dans la catégorie EP ».
- drain-infiltration-constat : « À changer » ; commentaire : « Ok sauf le libellé du "drain d'infiltration : rejet au sol" en EU. Si les eaux
  sont des EP, placer le libellé dans les EP ».
- drain-infiltration-dessin : « À changer » ; commentaire : « Tenir compte du réseau, si uniquement des EU alors drain en rouge, si au moins
  un EP alors vert ».
- boite-en-limite : « À changer » ; commentaire : « Changer "intérieur" par "à l'intérieur de la propriété". Idem pour extérieur. OK pour le
  reste ».
- escalier-rendu : « À changer » ; commentaire : « Le dessin d'un escalier ne doit jamais être assimilé à un réseau ».
- remarque-libre : « Créer un genre de disque autour d'un objet créé pour pouvoir le pivoter en utilisant ce disque » puis « Ajouter un outil
  de dessin par cote : intersection de 2 cotes avec choix du point calculé parmi les deux solutions possibles ».
- Réponses « D'accord » qui comptent ici (section-91.md) : prolongement-intersection (dont le point « L'intersection est la rencontre de deux
  côtés ou de leurs prolongements (30 m au plus) ») ; puits-perdu-texte (« Un puits perdu (qui infiltre les eaux) se dessine en Puisard. ») ;
  escalier-outil, escalier-inverser, escalier-depart-cotes ; pr12-6 « Le poser, avec l'avertissement » ; regard-suit-exutoire (« Un regard à
  tampon béton dont l'eau va à une infiltration ou à un puits est jugé en EP : « Regard EP : tampon béton », en réserve, même si un WC y
  est relié, comme aujourd'hui vers un puisard ; […] De même, un regard sur un drain d'infiltration est jugé en EP. »).
- Réponses du cadrage (EC ; section « Souhaits restants (après la v1.7.2) ») :
  - cadrage-14-4 : choix e « Je ne sais pas » ; commentaire : « Rechercher le texte portant le numéro de la parcelle cherchée. Texte dans le
    calque PARCELLENUM ou quelque chose du genre. La parcelle à chercher est donnée à l'ouverture du projet via le tableau excel ».
  - cadrage-validation-departement : choix c « Barème permissif refusé, constat abrégé admis » ; commentaire : « Le constat pdf n'est pas un
    standard du département mais une production de ma société ».
  - cadrage-13-reserve : choix c « Certaines seulement, à désigner en commentaire » (appliqué : a) ; commentaire : « Toutes sauf l'apport
    d'humidité ».
  - cadrage-sans-croquis : choix a « Oui, avec des valeurs par défaut identiques à la v1.5.1 ». Il vise la photo de façade, le constat abrégé
    et la nature réglable des anomalies types (souhaits 1, 9, 13), pas les points de ce document [p].

### Précision sur E1 (fil, 16 nov. 2026 au soir)
- Question : « la ligne au nom de l'équipement est-elle créée d'office, ou seulement quand l'opérateur l'a choisie ? »
- Réponse : « Créée d'office, avec le nom de l'équipement ».

### 17 nov. 2026, groupe « Suivi » du formulaire (mot pour mot ; base lue à 13 h 04 : 107 documents ; scratchpad/reponses-17nov-6)
- S1 suivi-e1-portee : choix d « Comme c, et la ligne laissée vide pour écrire à la main perd aussi « Autres : » » (appliqué : c) ;
  commentaire : « Cette ligne vide est à supprimer totalement, le rapport final doit être délesté de toutes les informations non nécessaires
  et tous les éléments non utilisés ».
- S2 suivi-sans-croquis : choix b « Oui, toutes, comme avec le croquis » (appliqué : a).
- S3 suivi-boite-cote-place : choix a « Juste sous la distance, les quatre lignes du tableau un peu resserrées dans le même cadre ».
- S4 suivi-puits-colonne : choix a « Dans la colonne « Puits », verte comme « Milieu naturel » et « Gargouille » » ; commentaire : « Penser à
  supprimer les colonnes inutiles pour que n'apparaissent que les colonnes ayant été cochées ».
- S5 suivi-drain-libelle : choix a « Rien : garder « Drain d'infiltration : rejet au sol (milieu naturel) » ».
- S6 suivi-noms-proches : choix b « Le signaler et demander si c'est la même destination : « la même » la reprend, « une autre » garde le
  nouveau nom » (appliqué : a).
- S7 suivi-fosse : choix a « La refuser avec le message : « Pour une fosse septique, posez l'objet Fosse septique ; pour un fossé, écrivez
  « Fossé ». » » (appliqué : b).
- S8 suivi-symbole-puits : choix a « En Z : vers le haut à gauche, vers le bas à droite ».
- S9 suivi-e4-niveau : choix a « Oui, seulement si le porteur de l'étiquette n'a pas de niveau non plus ».
- S10 suivi-disque-objets : choix b « Aussi les symboles qui ne sont pas ronds : regard, boîte, grille, fosse, té, siphon, puits… »
  (appliqué : a) ; commentaire : « La rotation doit se faire degré par degré et proposer un accrochage pour que l'objet soit orienté
  parallèlement ou perpendiculairement à un linéaire proche ».
- S11 suivi-escalier-ancienne-version : choix a « Garder l'enregistrement actuel et le dire dans la consigne de mise à jour des tablettes » ;
  commentaire : « Partir du principe que les tablettes seront toujours à jour ».
- S12 parcelle-essai-dxf : choix a « « parcelle », au moins une fois » (appliqué : b).
- S13 facade-constat : choix c « Oui, sur le constat complet comme sur l'abrégé » (appliqué : a).
- S14 bareme-permissif : choix b « Un réglage par anomalie dans les Réglages : non-conformité, réserve ou à arbitrer, jamais « pas
  d'anomalie » » (appliqué : a).
- S15 reserves-sans-croquis : choix a « Oui, partout : une anomalie type a la même nature dans tous les dossiers » (appliqué : b).
- S16 reserves-eu : choix b « Non : réserve en EP, non-conformité en EU » (appliqué : a).
- remarque-libre-suivi : sans réponse.

### 17 nov. 2026, fil (après les réponses « Suivi » ; questions, choix et textes mot pour mot)
- Constat délesté. Question : « Vos commentaires de S1 et S4 demandent un constat imprimé « délesté » : ni ligne vide, ni ligne d'appareil
  absent, ni colonne sans croix (c'est le souhait 9, étendu aux colonnes). La v1.7.2 ne peut compter que 20 correctifs. Quand faire ce
  constat délesté ? » Choix : « Lot suivant, en premier (Recommandé) » (« La v1.7.2 garde ses correctifs et se fusionne plus tôt. Dès m147,
  les lignes vides « Autres : » ne s'impriment plus. Lignes d'appareils absents et colonnes sans croix : 3 ou 4 correctifs conçus ensemble,
  juste après la fusion. ») ; autre choix : « Dans la v1.7.2 » (« Pour tenir dans les 20 correctifs, « Deux points » (pose par deux cotes,
  m146) et l'accrochage du disque de rotation passent à la fusion suivante. La v1.7.2 se fusionne plus tard. »). Suite : D14 et m147 pour les
  lignes vides ; « Souhaits restants (après la v1.7.2) », item 9, pour le reste.
- Prolongement. Question : « Prolongement d'un côté (m138, déjà fait) : quand le côté à prolonger est à plus de 30 m du doigt, l'application
  essaie d'abord le redressement « Parallèle au bâti » et l'accroche à la façade, puis le prolongement. Cet ordre vous convient-il ? »
  Choix : « Prolongement toujours d'abord » (« L'ordre de la v1.7.0 (m113), même au-delà de 30 m, et l'aide le dit. ») ; autres choix :
  « Garder cet ordre (Recommandé) » (« Au-delà de 30 m, le redressement et la façade passent avant le prolongement ; en deçà, rien ne change
  par rapport à la v1.7.1. ») et « Le plus proche du doigt » (« À toute distance, l'accroche la plus proche du doigt l'emporte, prolongement
  compris. »). Suite : D2 et m155.
- Escalier. Question : « Escalier (m139, déjà fait), trois changements visibles : 1) un escalier tracé depuis un coin le long d'une façade
  monte maintenant vers la fin (avant : vers le départ) ; 2) un contour de « Complément du fond » se ferme quand on retouche son premier
  point, même aimant coupé ; 3) fond de plan masqué, les contours fermés de complément comptent pour le côté proposé de l'escalier. Vous
  conviennent-ils ? » Choix : « Tous les trois (Recommandé) » (« Rien à changer. ») ; autre choix : « Un ou plusieurs à changer ». Suite : D3
  et la carte m139.

### Décisions antérieures qui jouent ici
- 6 nov. 2026, sur m85 (mot pour mot) : « Si j'ai un lavabo à côté d'un lave-vaisselle dans la réalité je ne crée qu'un objet cuisine. Si je
  dois créer deux objets differents lavabo et cuisine c'est qu'ils ne sont pas dans la même pièce et donc qu'il faut bien les distinguer. En
  conclusion, ne pas interpréter plus que nécessaire le croquis sur cet aspect et laisser l'opérateur indiquer les éléments vus sur site sans
  les modifier. Autre point, ne pas indiquer "autre :" en ajoutant une ligne. Je souhaite que les lavabos et les éviers ne soient pas
  distingués mais qu'ils se confondent. »
- 7 nov. : une anomalie saisie à la main qui nomme un lavabo va sur « Évier », croquis désactivé compris (m96). 16 nov., PR #12, point 11
  (« Le garder ») : la présentation actuelle des valeurs de la boîte vaut aussi croquis désactivé ou absent.
- 13 nov. : rejet des EP dans un puits = NC, non modifiable, sans exception aux gestes généraux de Contrôles ; Q5.2 : un puits perdu se
  dessine en puisard ; un drain qui reçoit un équipement EP disperse dans le sol ; une anomalie à arbitrer n'est jamais comptée conforme ;
  Q4 (b) : chaque drain de collecte compte au constat (ligne « Autres : Drain » du code : .claude/conception-rejets.md l. 219).

### E1 et la décision du 6 nov., lues ensemble
- Le 14 nov., la conception du lot Équipements lisait le « ne pas indiquer "autre :" » du 6 nov. comme visant le seul lavabo, et gardait
  « Autres : <nom> » (E1 a, m132). La réponse du 16 nov. tranche : « Ne jamais écrire "Autres :" », une ligne au nom de l'équipement. Le
  choix b (« Sur aucune ligne tant que l'opérateur n'a pas choisi ») est complété par la précision du soir (« Créée d'office, avec le nom de
  l'équipement ») : la ligne au nom est créée d'office ; D14 garde le fond du choix b pour les lignes du formulaire, prises seulement si
  l'opérateur les choisit.
- Vérifié : la ligne au nom est déjà créée d'office à « Reprendre du croquis » (IX:3808-3811) ; le suivi n'ajoute jamais de ligne (commentaire
  IX:3757) ; seul le mot « Autres : » est en cause (IX:3022-3023, le seul « Autres : » d'IX ; CJ:5494 ; CJ:5904 ; message IX:3908).
- S1 (d, 17 nov.) tranche ce qui restait ouvert : « jamais » se lit à la lettre. Aucune ligne n'a plus « Autres : », qu'elle soit reprise du
  croquis pour un objet que le formulaire n'a pas (« Autres : Drain » de Q4 b ; chaudière, attente, siphon de cour, trop-plein) ou tapée à la
  main ; et, selon le commentaire (« Cette ligne vide est à supprimer totalement… »), les lignes vides du bas de chaque groupe ne sont plus
  imprimées du tout, au lieu de perdre seulement le mot (D14, m147). Le reste du délestage demandé : souhait 9, au lot suivant (fil du 17
  nov.).

## Décisions

### Règles communes
- Compat (tests/vm/compat.js) : 245/245 sans régénération, pour chaque correctif. Ses croquis n'ont ni puits, ni destination, ni drain
  d'infiltration, ni autre appareil, ni côté de boîte, et leurs puisards ne gagnent aucun exutoire par le trop-plein (EA, « Effet commun »,
  avec sondes ; « limCote » absent de compat.js et du générateur, vérifié). Le mot « Autres : », ROW_KW, boitesConstat et le rapprochement
  ne sont pas dans la garde. Si une empreinte bouge, c'est un défaut à chercher, pas une mise à jour à faire.
- Différentiel : `node tests/vm/aleatoire.js 8000 --contre=<commit d'avant le correctif>`. Il compare par croquis : sources (resObj),
  anomalies, conclusion, contrôles, constat déduit {rows, epRecup, sansCote, methodes}, étiquettes ; ni le reste de `an`, ni boitesConstat,
  ni les opérations du rapprochement. Avec --contre, le générateur ne tire ni autres appareils ni champs (niveau, lave-mains, nom, étiquette
  commune) (vérifié : aleatoire.js l. 46-51) ; il tire exutoires (dont des puisards), puits et drains. Sans écart, sauf m145 et m150 : écarts
  attendus, vérifiés un par un.
- Croquis désactivé ou absent (`!vcPret()`, IX:3174, vérifié) : la v1.5.1, sauf les exceptions accordées : lavabo → « Évier » (m96) ;
  présentation des valeurs de la boîte (PR #12, point 11, « Le garder ») ; suggestion « Lavabo » retirée (E2) ; et, depuis S2 (b, 17 nov. :
  « Oui, toutes, comme avec le croquis »), les nouveautés du constat de la v1.7.2 : lignes sans « Autres : » ni ligne vide (m147 ; « ni ligne
  vide » sans croquis : [p], D14), « Évier » seul (m148), ligne du côté de la boîte (m149), colonne « Puits » (m150) (D15).
  - La règle de CLAUDE.md (« Croquis désactivé ou absent : comportement de la v1.5.1, sauf une anomalie saisie à la main qui nomme un
    lavabo… ») ne citait pas les deux dernières exceptions : un relecteur qui l'appliquait y aurait vu une faute (F15). m137 l'a mise à
    jour ; texte retenu (précisé à sa relecture) : « Croquis désactivé ou absent : comportement de la v1.5.1, sauf une anomalie saisie à la
    main qui nomme un lavabo : ligne « Évier », comme sur le croquis (décision du 7 nov. 2026) ; la suggestion « Lavabo » est retirée
    partout, et une valeur de la boîte trop large pour sa case en 9,5 pt, mais qui tient en 7 pt, s'imprime au constat sur la ligne de son
    libellé, comme en v1.7.0 (réponses du 16 nov. 2026). » S2 a donné (b) : chacun de m147 à m150 la complète pour sa nouveauté (texte
    proposé : D15) [p].
- Constat signé : lignes, boîte, croix (`c.fige.conf`) et conclusion ne changent plus (IX:2087-2095, vérifié). Le constat imprimé est
  redessiné à chaque impression [p, comme m115]. Règle de CLAUDE.md : « Le PDF est le livrable. Un constat signé n'est jamais modifié. »
  Une présentation nouvelle (E1, colonne « Puits », ligne de la boîte) ne touche donc pas un constat signé avant la v1.7.2 : la signature
  note la présentation (D13 ; question retirée, F7).
- Plan PDF et DXF : ils suivent la version qui imprime (étiquettes, symboles, couleurs), comme en v1.7.0 et v1.7.1, dossier signé compris [p].
- Tablettes plus anciennes : S11 (a, 17 nov.), commentaire : « Partir du principe que les tablettes seront toujours à jour ». Ce qu'une carte
  dit d'une tablette en v1.7.1 (ou plus ancienne) n'est qu'une information, sans travail pour elle. Un champ absent (dossier fait avant la
  v1.7.2) donne le comportement de la v1.7.1 ; doc.v reste 1.
- Tests sur données fictives seulement (« 12 rue Fictive », « Ville-Exemple », « Nom Fictif », VCroquis.demoDxf()).
- Chaque correctif tient à jour LISEZMOI.txt (et croquis/LISEZMOI.txt au besoin), tests/LISEZMOI.md pour un test nouveau, sa carte « Fait »
  ci-dessous et .claude/etat-travaux.md.

### D1 Suggestion « Lavabo » retirée (e2 ; EA § 6)
- Retenu : choix a. `AUTRES_SUGG.EU` (IX:1909, vérifié) perd « Lavabo » ; restent « Chaudière (purge, condensat) », « Regard EU »,
  « Attente », « Douche », « Lave-vaisselle », « Ballon d'eau chaude », « Fontaine ».
- Croquis désactivé compris : accordé par la réponse même, comme m96 ; la règle de CLAUDE.md est mise à jour avec m137 (F15). Une ligne déjà
  saisie reste ; « Lavabo » peut toujours être tapé à la main (une anomalie qui nomme un lavabo va toujours sur « Évier », m96).
- Textes : aucun nouveau ; LISEZMOI : rien (la liste n'y figure pas, vérifié). Compat et différentiel : sans effet (IX seul).

### D2 Prolongement sans limite (pr12-9 ; EB § 7)
- Retenu : prolSegs sans Lmax prend Infinity (défaut à CJ:362, vérifié ; le contrôle de l. 363 accepte tout nombre positif). Libellés
  « Prolongement » et « Prolongement d'un côté » gardés : le commentaire ne vise que la limite.
- Côtés examinés : cibles() (CJ:3707, vérifié : `segsCibles(m, PROL_MAX + 14 / S.vue.s, …)`) passe à
  `Math.max(PROL_MAX, diag / S.vue.s) + 14 / S.vue.s`, diag étant la diagonale du canevas en pixels [p, EB] : jamais moins qu'en v1.7.1 ;
  au zoom serré, un côté hors de l'écran ne compte pas (seule borne qui reste, pour le coût) [p].
- Borne de 120 m (X5, vérifié) : segsPres la pose sur tout rayon (CJ:3659, `R = Math.min(R, 120);`) pour les côtés du bâti du fond
  (aretesFond), et segsCibles fait de même pour les limites (CJ:3668) ; seuls les traits de complément du croquis sont tous pris. cibles()
  passe par eux : sans changement, aucun côté du bâti ni aucune limite au-delà de 120 m ne serait examiné, et « sans limite de longueur »
  serait faux au zoom large.
  - Retenu : lever cette borne pour cibles() seulement, par un argument de segsPres et de segsCibles [p : nom] ; les autres appels la
    gardent. Mesurer le coût au zoom le plus large (grille de 8 m ; si le carré du rayon couvre plus de cases qu'il n'y en a d'occupées,
    parcourir les cases occupées [p]).
  - Repli, si le coût reste trop grand : garder 120 m et l'écrire (« jusqu'à 120 m ») dans les Réglages, le LISEZMOI et la carte « Fait »,
    et le signaler à l'utilisateur : c'est contraire à sa réponse (« Ne pas donner de limite au prolongement »).
- Intersection : 30 m au plus, gardés [p]. interSegs garde son défaut PROL_MAX (CJ:384, vérifié). Raison : « D'accord » à
  prolongement-intersection, qui nomme ces 30 m ; EB mettait aussi l'intersection sans limite. Un seul nombre à changer si l'utilisateur le veut.
- Inchangés : INTER_MAX (64 côtés) ; seuils de 10 et 14 px ; case décochée d'origine.
- Textes, mot pour mot : Réglages (CJ:3257, vérifié) « le point se cale sur le prolongement d'un côté, au-delà de l'un de ses bouts, sans
  limite de longueur » ; LISEZMOI l. 296-297 (vérifiées) « (au-delà d'un bout, sans limite de longueur) ». Repli : « jusqu'à 120 m » au lieu
  de « sans limite de longueur ».
- Constat, constat signé, croquis désactivé, sauvegarde : sans objet (aide au dessin). Tablette en v1.7.1 : 30 m. Compat, différentiel : sans effet.
- Ordre au-delà de 30 m (fil du 17 nov.) : m138 essayait le prolongement d'un côté dont le bout est à plus de 30 m après le redressement
  « Parallèle au bâti » et l'accroche à la façade (prolLoin, option 1 d'un relecteur [p]), parce qu'un prolongement lointain prenait sinon la
  plupart des points redressés ou posés sur une façade (fond fictif « ville », 10 px/m : 84/16 devenait 16/84, mesure de m138). Réponse :
  « Prolongement toujours d'abord » (« L'ordre de la v1.7.0 (m113), même au-delà de 30 m, et l'aide le dit. »). m155 rend au prolongement
  lointain la place qu'il a jusqu'à 30 m, celle de m113 ; la borne de 256 côtés et le passage unique restent [p]. Conséquence, non montrée
  dans la question du fil [p] : ce partage devrait revenir à 16/84 environ [p : mesuré sur la première version de m138 ; m155 le mesure] ;
  sur un fond dense, dès 5 px/m environ, un point resté libre se cale presque toujours sur un prolongement (déjà vrai avec m138). Le repli à
  120 m n'a pas servi.

### D3 Côté et montée proposés d'un escalier (pr12-2 ; EB § 6)
- Retenu : choix d, « Les deux ».
  - Côté proposé : un contour fermé de « Complément du fond », d'aire non nulle, compte comme le bâti : refsCotes(['bati', 'complement']) au
    fantôme (CJ:4528, vérifié) et à la pose (CJ:5377) ; escalierDefauts (CJ:1050-1071) l'accepte aussi (X6, vérifié) : son filtre ne garde
    aujourd'hui que nat 'bati' (CJ:1055 : `l.nat === 'bati' && l.ferme === true && l.aire !== 0`), alors qu'un complément venu de lignesRef
    a nat 'complement' (CJ:256). Le filtre change pour le côté et pour la règle du centimètre ci-dessous ; un complément ouvert ne compte pas.
  - Montée : un bout (départ ou fin) à 1 cm au plus (≤ 0,01 m [p]) d'un côté du bâti ou d'un complément fermé compte comme posé dessus,
    même sans accrochage ; calcul par distPolygone (CJ:136, vérifié), seulement si l'aide n'est pas déjà 'coin' ou 'facade' ; une limite de
    parcelle ne compte pas.
- Ce ne sont que des valeurs proposées à la pose : la fiche les change, un escalier posé garde les siennes. Dossiers existants : rien.
- Textes : LISEZMOI l. 166-173 : dire qu'un contour fermé de « Complément du fond » compte comme le bâti [p].
- Compat et différentiel : sans effet (aucun escalier dans la garde ; le générateur n'en tire pas, vérifié).
- Fait par m139. Ses trois changements visibles (un escalier tracé depuis un coin le long d'une façade monte vers la fin ; un contour de
  « Complément du fond » se ferme quand on retouche son premier point, même aimant coupé ; fond masqué, les contours fermés de complément
  comptent pour le côté proposé) sont acceptés (fil du 17 nov.) : « Tous les trois (Recommandé) » (« Rien à changer. »).

### D4 Escalier jamais lu comme un réseau (escalier-rendu ; EB § 8)
- Constat de l'étude (sonde-escalier.js, croquis fictif) : la v1.7.0 et la v1.7.1 ne lisent jamais l'escalier comme un réseau (resLigne
  'LIM', hors de l'analyse, légende « Escalier », calque VEDE-ESCALIERS). Une tablette en v1.6.3 ou plus ancienne le trace en « Réseau non
  déterminé » à l'écran, au DXF et dans la légende, sans le compter dans son analyse ; sa fiche y est celle d'un tronçon.
- On ne choisit que le format qu'écrit la v1.7.2. Aucun des quatre formats essayés n'est à la fois montré sans réseau par la v1.6.3 et lu
  comme un escalier par la v1.7.0 et la v1.7.1 (EB § 8.3, formats A à D).
- S11 (a, 17 nov.) : « Garder l'enregistrement actuel et le dire dans la consigne de mise à jour des tablettes » ; commentaire : « Partir du
  principe que les tablettes seront toujours à jour ». Format actuel gardé. m139 a écrit la consigne (LISEZMOI, puce « Mettez aussi à jour
  toutes les tablettes avant de dessiner un escalier… ») avec la phrase « Une tablette en v1.6.3, ou plus ancienne, dessine un escalier comme
  un tronçon « Réseau non déterminé » (sans le compter dans le constat) ; ne l'y modifiez pas. », et les tests de garde. (b) et (c) ne sont
  pas choisis : rien pour la fusion suivante.
- Les trois autres choix de m106 (marches omises sous 4 px à l'écran et sous 1 mm sur le papier ; type inconnu ; ni ligne de référence ni
  cible d'accrochage) restent [p : la réponse ne les vise pas].

### D5 Boîte en limite (boite-en-limite ; EA § 11)
- Retenu, mot pour mot, étiquette du plan (écran, plan PDF, DXF) par texteLimite (CJ:2367-2375, côté l. 2369, vérifié) :
  - « à 0,80 m de la limite, à l'intérieur de la propriété » ; « à 0,80 m de la limite, à l'extérieur de la propriété » ;
  - côté seul : « à l'intérieur de la propriété » ou « à l'extérieur de la propriété » (au lieu de « côté intérieur ») ;
  - inchangés : « en limite de propriété » (0) et « à 0,80 m de la limite » (distance seule).
- Fiche de la boîte (CJ:5957, vérifiée) : « Sur le plan : ≈ 0,80 m, à l'intérieur de la propriété » [p] ; « côté à confirmer » inchangé.
  Puces « Intérieur » et « Extérieur » gardées, dans la fiche et au panneau des cotes (boutons courts) [p].
- Constat : la distance reprise du croquis (boitesConstat, CJ:2324, vérifié) garde « 0,80 m intérieur » jusqu'à m149, qui la sépare du
  côté [p : « 0,80 m, à l'intérieur de la propriété » ne tiendrait pas dans la case].
- « OK pour le reste » : moins de 5 mm = en limite, « -0 » accepté, étiquette non replacée, ligne de la limite face à une étiquette
  personnalisée : inchangés. Données : aucune (p.limCote reste 'int' ou 'ext'). Une étiquette personnalisée n'est pas touchée.
- Compat : la sortie « étiquettes » est gardée, mais aucun croquis de la garde n'a de côté : inchangée. Différentiel : sans écart (le
  générateur ne tire pas de côté, vérifié). Tablette en v1.7.1 : « intérieur ».

### D6 Boîte en zone unitaire (pr12-5 ; EA § 8)
- Retenu : choix b, pour une boîte dont le réseau est déduit (p.res vide : boitesConstat, CJ:2320-2342, prend alors an.resPt, 'UN' en zone
  unitaire). Une boîte indiquée UN dans sa fiche garde EU et EP, comme aujourd'hui (F8 : pr12-5 parlait de « deux boîtes sans réseau
  indiqué », et le 6 nov. demande de « laisser l'opérateur indiquer les éléments vus sur site sans les modifier »). Une boîte indiquée EU ou
  EP garde son réseau.
- Sources comptées (X3, sonde RX serie.js) : toutes celles dont le chemin traverse la boîte, pas seulement celles dont elle est
  an.resObj[s].boite, qui est la boîte la plus lointaine du chemin (CJ:1557). Sources EU seules → EU ; EP seules → EP ; les deux → EU et EP ;
  aucune source ne la traverse → EU et EP, comme aujourd'hui. Calcul dans boitesConstat, hors de la garde, d'après an.adj et an.sensPiece
  (CJ:1610) [p] ; aucun champ nouveau sur an ni sur resObj (compat écrit an en entier, tests/vm/compat.js l. 119-126 ; --contre compare
  resObj en entier).
- Effet : deux boîtes unitaires en parallèle, B1 qui reçoit le WC et B2 la descente : la distance et la profondeur de B1 vont à la colonne
  EU du constat, celles de B2 à la colonne EP (v1.7.1 : n = 2 partout, rien n'est repris). En série (WC → B1 → B2 → collecteur unitaire),
  avec une descente vers un puisard ou sans descente : B1 et B2 en EU, n = 2, rien n'est repris en EU ; aucune boîte en EP, rien n'y est
  repris [p] ; v1.7.1 : n = 2 partout, rien de repris : pas de recul. Avec le seul resObj[s].boite, B1 serait restée EU et EP, et ses valeurs
  seraient allées en EP (RX X3).
- Textes : aucun nouveau ; LISEZMOI l. 263-266 : « … une boîte sans réseau indiqué compte pour le réseau des appareils dont les eaux y
  passent ».
- Dossiers existants : les valeurs se remplissent à la reprise, ou au suivi si la boîte a déjà été reprise. Constat signé : intact. Croquis
  désactivé : sans objet. Tablette en v1.7.1 : n = 2, elle vide une valeur reprise et non retouchée [p] ; la v1.7.2 la remet.
- Compat : inchangé (boitesConstat hors de la garde) ; différentiel : non comparé.
- Fait par m140 (carte « Fait ») : le chemin suivi est celui de l'analyse, les plus courts chemins de chaque source jusqu'à ses exutoires
  dessinés (resObj[s].term), dans le sens dessiné des tuyaux (traversees) ; an.sensPiece, arbitraire dans une boucle, n'est pas lu
  (relecture, M1). Une boîte que le dessin dit mêlée (un « Tronçon EU », un « Tronçon EP » ou un drain y arrive) n'est pas reprise, comme en
  v1.7.1 : question nouvelle (fin du document).

### D7 Ordre de l'étiquette commune (ordre-etiquette-commune ; EB § 5)
- Retenu : choix b. ORDRE_ETIQ : sdb, douche, baignoire, lavabo, evier, wc, cuisine, lavevaisselle, lavelinge, chaudiere, siphon_garage,
  attente, autre_eu ; à égalité, l'id. L'exemple ne fixe que douche, lavabo, WC : le reste est un choix [p].
- rangEtiq remplace rangCatalogue dans le tri des membres (groupeEtiquette, CJ:2400-2415) ; texteGroupe (CJ:2438-2447) et comptesGroupe
  (CJ:5485-5494) trient une copie, porteur compris ; g.objets[0] reste le porteur (titre, « Défaire », « Modifier le groupe », fin du mode
  « Réunir »). Le porteur perd la tête de la liste [p].
- Exemples : douche, lavabo et WC + lave-mains, quel que soit le porteur : « douche, lavabo, WC + lave-mains » ; « Compté au constat :
  Salle de bain 1, Évier 1, WC 1 » ; évier et lave-vaisselle : « évier, lave-vaisselle ». Titre et règles du texte inchangés.
- Textes : LISEZMOI l. 252-254. Étiquette personnalisée : intacte. Constat : rien (seul l'ordre des noms change). Tablette en v1.7.1 :
  l'ancien ordre pour le même groupe.
- Compat : inchangé [p : aucun lien d'étiquette commune dans la garde]. Différentiel : sans écart, car avec --contre le générateur ne tire
  aucune étiquette commune (vérifié) ; c'est le test nouveau qui juge le changement.

### D8 Drain d'infiltration : couleur et libellé (drain-infiltration-dessin, drain-infiltration-constat ; EB § 3, EA § 4)
- Couleur, retenue : an.eauxDrains = {id du drain : {EU: n, EP: n}}, compté d'après les terminaux de drain de chaque source (nature de la
  source), écrit seulement s'il n'est pas vide (comme an.drainsDisp, CJ:1612 d'après EB). resLigne (CJ:2350-2362 ; vérifié : l. 2356 rend
  toujours 'EP') : projet → 'PRJ' ; au moins une source EP → 'EP', vert ; des sources EU seulement → 'EU', rouge ; aucune source → le réseau
  de an.ref s'il en donne un, sinon 'EP' [p].
  - Tous les rendus suivent : écran, plan PDF, texte de l'étiquette, fiche, DXF (couleur ACI 1 en EU, calque VEDE-DRAINS), légende
    (« Canalisation EU » ajoutée pour un drain rouge). Le peigne, la ligne « Drain d'infiltration » de la légende et l'étiquette « Dispersion
    dans le sol » ne changent pas.
  - p.res reste ignoré et les puces « Réseau » masquées [p : « tenir compte du réseau » lu comme « des eaux reçues »] ; le sens n'est pas lu
    [p]. Une source linéaire (drain de collecte) compte EP [p]. Une source qui n'atteint le drain que par un trop-plein compte (m145).
  - Regard tenu par le drain : il reste EP, quelle que soit la couleur du drain (CJ:1609, vérifié : un objet sans réseau, hors boîte, tenu
    par un drain d'infiltration prend 'EP') ; son tampon béton reste une réserve. C'est la décision du 16 nov. (regard-suit-exutoire,
    « D'accord ») : un regard vers une infiltration est jugé EP, en réserve, « même si un WC y est relié » ; « un regard sur un drain
    d'infiltration est jugé en EP ». Les relectures X4 et F2, qui le passaient en EU sous un drain rouge, sont écartées pour cette raison ;
    un test témoin le fixe (m142).
- Libellé, vérifié : raccInfo (CJ:2228-2245) prend cEP ou cEU d'après le groupe de la ligne de l'appareil (`ep = groupe !== 'EU'`). Une
  gouttière a donc déjà « Drain d'infiltration (dispersion dans le sol) », case « Infiltration diffuse », conforme ; seul un appareil EU a
  « Drain d'infiltration : rejet au sol (milieu naturel) » (CJ:801), non conforme ; ces libellés ne se voient qu'au panneau Constat du
  croquis. La réponse a deux phrases (F4) : « Ok sauf le libellé du "drain d'infiltration : rejet au sol" en EU » refuse ce libellé en EU ;
  « Si les eaux sont des EP, placer le libellé dans les EP » décrit ce qui se fait déjà, sauf à la lire « dès que le drain reçoit des EP »
  (S5 d) [p].
- S5 (a, 17 nov.) : « Rien : garder « Drain d'infiltration : rejet au sol (milieu naturel) » » : le libellé d'un appareil EU reste celui-là,
  non conforme, et celui d'un appareil EP reste « Drain d'infiltration (dispersion dans le sol) ». m142 fixe ces libellés par un test ; rien
  dans m150.
- Dossiers existants : un drain qui ne reçoit que des EU devient rouge à l'ouverture ; rien n'est écrit. Constat signé : non touché. Croquis
  désactivé : sans objet. Tablette en v1.7.1 : toujours vert.
- Compat : inchangé (aucun drain d'infiltration dans la garde ; an.eauxDrains absent quand il est vide). Différentiel : sans écart (resObj,
  constat et étiquettes inchangés ; la couleur n'est pas comparée).

### D9 Anomalies rangées d'après l'objet du croquis (rangement-autres-par-texte ; EA § 7)
- Retenu : choix b, par le mécanisme de m132-m133, étendu (X7, vérifié). ligneDe (CJ:2061-2069) est dans le module et ne connaît que les
  lignes de constatDeduit : pour un objet dont la ligne n'est pas une ligne du formulaire, elle rend null, ops.autres[id de
  l'enregistrement] nomme la ligne du croquis (CJ:2124-2131), et vcRangerAutres (IX:3767) range l'anomalie sur la ligne que vcApparier
  (IX:3671) lui a liée (vcAutreSuit, IX:3761). Aujourd'hui, cela ne vaut que pour les types nomLibre (condition de CJ:2066,
  `T[idxD[id].t].nomLibre`) : la condition est retirée pour toute ligne non standard, soit aussi chaudière, attente, drain, siphon de cour,
  trop-plein, drain de collecte.
- Une ligne choisie par le technicien, « Aucune » comprise, reste la sienne. Une anomalie saisie au dossier garde le rangement par le texte
  (v1.5.1). Une anomalie du croquis sans ligne liée (ligne supprimée, objet en projet) : par le texte [p]. Plusieurs drains sur une ligne
  « Drain » : toutes leurs anomalies sur elle [p].
- Données : la valeur d'installation que le croquis note pour l'anomalie prend l'id de la ligne. Dossiers existants : au suivi, une anomalie
  qui suit encore le croquis est rangée sur la ligne de son objet. Constat signé : rien ne bouge. Croquis désactivé : sans objet.
- Tablette en v1.7.1 : rangement par le texte tant que le technicien n'a pas choisi [p] : la ligne peut changer d'une tablette à l'autre.
- Compat : inchangé (rapprochement hors de la garde [p]). Différentiel : sans écart (les opérations ne sont pas comparées).

### D10 Destinations de même nom (destinations-meme-nom ; EB § 1)
- Retenu : choix b ; « comparaison suffisante » : canonDest(nom) rend {forme, repères} en sept étapes : accents ôtés et minuscules (œ → oe,
  æ → ae) ; signes changés en espaces ; articles de tête ôtés (le, la, les, l, un, une, des, du, de, d) ; lettre doublée comptée une fois ;
  s ou x final ôté (mot sans chiffre de 4 lettres ou plus) ; mots collés ; repères = mots qui portent un chiffre ou n'ont qu'une lettre, triés.
- Deux degrés : même nom (formes égales) ; nom proche (mêmes repères, distance OSA : sous 5 lettres, jamais ; de 5 à 9 lettres, 1 au plus ;
  dès 10 lettres, 2 au plus). Des repères différents ne sont jamais proches (« Noue 1 », « Noue 2 »). Essai : 42 paires fictives (noms.js).
- Nom proche : S6 (b, 17 nov.) : « Le signaler et demander si c'est la même destination : « la même » la reprend, « une autre » garde le
  nouveau nom », codé par m144 (plus rien dans m151). « Fossé de la rue » face à « Fossé de la route » (noms.js : proche) : la question est
  posée. « La même », selon l'endroit [p] : dans la palette (« + Nouvelle destination »), la destination existante est posée ; dans la fiche,
  la destination reprend de l'existante son nom exact, son abréviation, son article et ses jugements (ep, cst) : une seule clé cleDest
  (CJ:839 ; regroupement des rejets, CJ:1152, vérifié), donc un seul rejet au constat ; dans les Réglages, le modèle garde son ancien nom.
  « Une autre » garde le nom tapé. Nom proche d'un objet de la palette : boutons « Le même » et « Un autre » [p] ; « Le même » prend, dans la
  palette, l'outil de l'objet, sans modèle ; dans la fiche, l'ancien nom reste et M4 s'affiche ; dans les Réglages, aucun modèle n'est créé
  ni renommé ; « Un autre » garde le nom tapé.
- Listes comparées : modèles de la tablette ; dans le croquis, destinations posées sur le plan ouvert ; objets fixes de la palette [p]
  (Puisard, Infiltration au sol, Gargouille, Rejet en milieu naturel, Fosse septique, Autre destination). Jamais au chargement, à la
  restauration, à l'import, ni d'une tablette à l'autre.
- Messages, mot pour mot [p] (toast de 4 s, sauf la question Q) :
  - M1 « Une destination « Étang » existe déjà : choisissez-la dans la palette. »
  - M3 (posée sur ce plan, absente de la palette ; même nom exact, même abréviation et mêmes jugements : acceptée) « Une destination
    « Étang » est déjà posée sur ce plan : reprenez ce nom et ses jugements, ou choisissez un nom bien différent. »
  - M4 « « Puisard » est un objet de la palette : posez l'objet Puisard. »
  - M5 (S7 a, texte de la réponse) « Pour une fosse septique, posez l'objet Fosse septique ; pour un fossé, écrivez « Fossé ». »
  - Fiche, nom changé (le texte exact d'une autre destination reste accepté, pour réunir deux destinations, si ses jugements sont les mêmes :
    la destination reprend alors son abréviation et son article ; sinon M3 [p]) : « Une destination « Étang » existe déjà : écrivez « Étang »
    pour la même, ou un nom bien différent. » ; Réglages, modèle renommé : « Une destination « Étang » existe déjà dans la liste. »
  - Q (S6 b ; remplace M2 et les formes « Nom proche » de M4, de la fiche et des Réglages), dans un bandeau à deux boutons [p] : « Nom proche
    de « Étang », qui existe déjà : est-ce la même destination ? », boutons « La même » et « Une autre » ; pour un objet de la palette :
    « Nom proche de « Puisard », objet de la palette : est-ce le même ? », boutons « Le même » et « Un autre » [p].
- « Fosse » et « Fossé » ont la même forme (« fose »). Vérifié : nomCle (CJ:838) ôte déjà les accents, donc cleDest (CJ:839) confond déjà une
  « Fosse » et un « Fossé » de mêmes jugements. S7 (a, 17 nov.) : « La refuser avec le message : « Pour une fosse septique, posez l'objet
  Fosse septique ; pour un fossé, écrivez « Fossé ». » » : M5, codé par m144 ; il vise un nom de forme « fose » écrit sans accent (« Fosse »,
  « FOSSE ») [p] ; « Fossé » reste accepté (M1 s'il existe déjà).
- Données : aucune ; cleDest et nomCle inchangés. Dossiers existants : identiques ; deux modèles proches déjà enregistrés restent tous deux.
  Croquis désactivé : cette saisie n'existe qu'avec le croquis (v1.5.1). Tablette en v1.7.1 : sa saisie accepte toujours les doublons.
- Compat et différentiel : sans effet (le générateur écrit les noms sans passer par la saisie).

### D11 Trop-plein d'un puisard ou d'une infiltration au sol (q7-trop-plein ; EA § 1)
- Retenu : choix b, comme Q7 (a). parcours (CJ:1212-1235, interne à analyser, CJ:1142) reçoit une option [p : traverserInf] : un puisard (INF) ou une infiltration au sol
  (SOL) est noté comme terminal, puis la marche continue par ses autres tuyaux, en respectant le sens. Ce second parcours n'a lieu que si le
  parcours ordinaire a atteint un INF ou un SOL (aucun coût sinon).
- Le bloc Q7 de m129 (CJ:1468-1487 ; vérifié : il ne joue aujourd'hui que pour DISP) est généralisé à DISP, INF et SOL : avant, un seul code
  qui infiltre ; au-delà, les exutoires atteints (un par code) vont dans apres, chacun jugé par sa règle (réseau EU, puits : non conforme ;
  réseau EP, puisard, infiltration : conforme) ; deux destinations ou plus au-delà : « Relié à plusieurs réseaux » ; bifurcation avant :
  inchangé. Chaîne puisard → infiltration au sol → réseau EU : apres = [SOL, EU] [p].
- Jamais traversés [p] : puits, milieu naturel, gargouille, destination, boîte au réseau indiqué, collecteur. Garde-fou [p] : ne pas
  continuer par un tuyau sans sens dont l'autre bout mène à un appareil (une arrivée ne se distingue pas d'un trop-plein).
- Textes, mot pour mot [p] : « Rejet : puisard et, par le trop-plein, réseau EU départemental » ; « Rejet : infiltration au sol et, par le
  trop-plein, réseau EP départemental » (marque r.apresPar = 'tp' [p] ; le drain garde « et, au-delà du drain, … ») ; l'anomalie est celle de
  l'exutoire atteint, sans texte nouveau ; LISEZMOI, après l. 104-118 : « Le trop-plein d'un puisard ou d'une infiltration au sol est suivi
  de même : chaque exutoire qu'il atteint compte avec sa règle (réseau EU ou puits : non conforme). »
- an.eauxDrains (D8) compte une source qui atteint un drain d'infiltration par un trop-plein [p].
- Dossiers existants : une source dont le trop-plein va au réseau EU devient non conforme à l'ouverture (voulu). Constat signé : jamais
  touché. Croquis désactivé : rien (v1.5.1). Tablette en v1.7.1 : la source y redevient conforme [p] ; le LISEZMOI le dit.
- Compat : inchangé (sonde de l'étude : 0 croquis touché, 5 puisards, aucun exutoire gagné). Différentiel : écarts attendus, seulement sur
  les sources dont le parcours atteint un INF ou un SOL prolongé par un tuyau (le générateur tire des puisards, vérifié l. 14).

### D12 « Deux points » : poser par deux cotes (remarque-libre, 2e partie ; EB § 9 B)
- Lecture retenue [p], sans question : « intersection de 2 cotes » est le point situé à d1 d'un point 1 et à d2 d'un point 2 (deux cercles),
  comme au mètre ruban depuis deux coins ; « deux solutions possibles » le confirme (une de chaque côté de la droite qui joint les points).
- Entrée : bouton « Deux points » au premier pas du mode Cotes, à côté de « Autre trait » et « Abandonner » [p]. Points : coin ou objet [p].
- Textes, mot pour mot [p] : « Touchez le point 1 (coin ou objet). » ; « Touchez le point 2. » ; refus « Touchez un coin ou un objet » et
  « Touchez deux points différents » (à 1 cm près) ; panneau « Distance depuis le point 1 (m) », « Distance depuis le point 2 (m) », puces
  « Solution 1 » et « Solution 2 », boutons « Poser » (ou « Déplacer », « Poser le départ ») et « Fermer » ; sans solution : « Les deux cotes
  ne se croisent pas : les deux points sont à 7,42 m l'un de l'autre. » (distance réelle, deux décimales).
- Calcul : VC.geo.deuxCotes(A, B, d1, d2) rend [], [P] ou [P1, P2] : a = (d1² − d2² + d²) / (2d) ; h = √(d1² − a²) ; M = A + a·u ;
  P1 = M + h·n (Solution 1, à gauche de 1 → 2 [p]) ; P2 = M − h·n ; tangence (h sous 1 mm) : une solution, sans puces. Exemple : A (0 ; 0),
  B (10 ; 0), d1 = 6, d2 = 8 : (3,6 ; 4,8) et (3,6 ; −4,8).
- Dessin : deux cercles en pointillé, les deux places en fantôme, la choisie en plein. Même portée que le mode Cotes : poser un objet, le
  déplacer, poser le départ d'un escalier ; n'écrit que x et y. Données : rien de nouveau. Compat et différentiel : sans effet.

### D13 Réimpression d'un constat signé (T1 ; EA T1 ; F7, X2)
- Règle, sans question (F7) : « Le PDF est le livrable. Un constat signé n'est jamais modifié. » (CLAUDE.md). La question
  suivi-constat-signe est retirée ; son choix (a) devient la règle : un constat signé se réimprime toujours comme le jour de la signature.
- Vérifié : un constat signé garde c.signeLe et c.fige (IX:2087-2095 : logo, conclusion, conformité de chaque ligne, précos, méthodes,
  observations, réserves, soussigné, visite, anomalies à arbitrer) ; ses lignes et sa boîte ne changent plus ; le PDF est redessiné à chaque
  impression [p]. Précédent : le logo d'un constat signé est déjà pris dans c.fige (IX:2946).
- E1 (et, depuis S1 d, les lignes vides, qui ne sont plus imprimées), la colonne « Puits » et la ligne de la boîte changeraient donc la
  réimpression d'un constat signé avant la v1.7.2. Une seule « présentation » décide de toutes ces nouveautés :
  - La signature note c.fige.mep [p : nom et valeur] : 2 = présentation de la v1.7.2 ; absente = celle de la v1.7.1 (« Autres : » et lignes
    vides, trois colonnes, trois rangées, côté collé à la distance).
  - Où la poser (X2, vérifié) : dans le geste de signature (c-lock, IX:4346), juste après `c.fige = constatFigeCalc(v)`, jamais dans
    constatFigeCalc ni dans constatGeler. constatGeler (IX:2097-2102) fait lui aussi `c.fige = constatFigeCalc(v)` pour un constat signé sans
    c.fige (signé en v1.3.0, avant le gel), et il est appelé à l'ouverture du croquis (vcOuvrir, IX:3432) : une marque posée par
    constatFigeCalc donnerait à ce constat la présentation du jour.
  - Constat non signé : présentation 2, croquis activé, désactivé ou absent (S2 b).
  - À la signature, c'est la présentation du moment qui est notée (2, croquis activé ou non), pour qu'un constat signé se réimprime à
    l'identique [p].
  - Déverrouiller (« Modifier le constat signé ? », IX:4349) puis signer de nouveau note la présentation du jour.
- Tablette en v1.7.1 : imprime toujours à sa façon, même un constat signé en v1.7.2 (« Autres : » et lignes vides, trois colonnes) : à dire
  dans l'annonce ; une signature faite chez elle n'a pas de marque (présentation d'avant).
- Compat et différentiel : sans effet (impression hors de la garde).

### D14 Ligne d'un « Autre appareil » et « Autres : » (e1 ; EA § 5)
- Retenu : la ligne au nom de l'équipement est créée d'office (déjà le cas) ; le mot « Autres : » n'est plus écrit ; une ligne du formulaire
  n'est prise que si l'opérateur la choisit dans la fiche (« Compté au constat ») [p]. Sans nom : ligne « Autre appareil » et contrôle qui
  demande le nom, comme aujourd'hui. Deux « Bidet » de même nature : une ligne, nb 2.
- Où « Autres : » s'écrit (vérifié) : PDF page 1, IX:3023 (`pr.autres ? 'Autres : ' + r.label : r.label`, toute ligne non standard) et
  IX:3022 (ligne vide du bas d'un groupe) ; puce de la fiche (CJ:5904) ; « Compté au constat » (CJ:5494) ; vcEcarts (IX:3908, « … figure
  aussi au constat, en « Autres » : … ») ; LISEZMOI l. 118, 248-250, 431. L'écran du constat ne l'écrit pas.
- Portée : S1 (d, 17 nov.) : « Comme c, et la ligne laissée vide pour écrire à la main perd aussi « Autres : » » ; commentaire : « Cette
  ligne vide est à supprimer totalement, le rapport final doit être délesté de toutes les informations non nécessaires et tous les éléments
  non utilisés ». Aucune ligne, reprise du croquis ou tapée à la main, n'a plus « Autres : », croquis activé, désactivé ou absent (S2 b) ;
  les lignes vides que constatRowsForPrint (IX:2931) ajoute au bas de chaque groupe ne sont plus imprimées (vérifié : en EU, de quoi
  atteindre 2 lignes ajoutées, ou 1 s'il y a au moins 6 lignes types ; en EP, 1 ; la première porte « Autres : » quand le groupe n'a aucune
  ligne ajoutée, IX:3022). Hauteur des lignes (drawConstatTable, IX:3001, vérifié) : celles du formulaire pour 12 lignes exactement, sinon à
  parts égales ; le cas courant (6 lignes types en EU, 4 en EP) passe de 12 à 10 lignes. Hauteurs proposées [p] : chaque ligne type garde sa
  hauteur du formulaire (Évier 18 pt ; Salle de bain et Cuisine 21,5 ; les autres 17,5 : IX:3001, vérifié), une ligne ajoutée a 17,5 ; le
  tout est mis à l'échelle pour remplir les 218,5 pt du tableau (cas courant : 183,5 pt, × 1,19 environ) ; la taille du texte ne change pas
  (8 pt au-delà de 14 lignes, sinon 9,5 : IX:3018, vérifié). L'écran du constat ne change pas. Lignes d'appareils absents et colonnes sans
  croix : souhait 9, au lot suivant.
- Textes, mot pour mot : PDF « Bidet », « Drain », « Chaudière (purge, condensat) », « Attente » ; puce de la fiche « Bidet (ligne à son
  nom) » [p] ; « Compté au constat : … Bidet 1 » ; vcEcarts « … figure aussi au constat, sur sa propre ligne : vérifiez qu'il n'est pas
  compté deux fois » [p] ; LISEZMOI « il compte sur une ligne à son nom (une ligne par nom et par réseau) » et « ligne « Drain » ».
- Données : aucune (le libellé enregistré n'a jamais porté « Autres : ») ; une ligne tapée « Autres : X » par l'opérateur garde son texte.
  La case « Indéterminé/Autres » des ouvrages EP (IX:1912, vérifié) est un libellé du formulaire : elle reste.
- Croquis désactivé ou absent : comme croquis activé (S2 b, D15) ; pour les lignes vides, c'est une présomption [p] : S2 visait « Les lignes
  tapées à la main sans « Autres : » (si la question S1 le prévoit) », et leur suppression vient du commentaire de S1. Constat signé : D13.
  Tablette en v1.7.1 : « Autres : » et lignes vides (information).
- Compat : inchangé (le mot est ajouté à l'impression et dans la fiche, pas dans constatDeduit). Différentiel : sans écart.

### D15 Nouveautés du constat, croquis désactivé (point 2 ; EA § 3, 5, 9, 10)
- Quatre nouveautés touchent le constat sans croquis : les lignes sans « Autres : » ni ligne vide (D14 ; « ni ligne vide » sans croquis :
  [p]) ; « Évier » seul (D16) ; la ligne de la boîte (D17) ; la colonne « Puits » (D18). La présentation actuelle des valeurs de la boîte y
  vaut déjà (point 11).
- S2 (b, 17 nov.) : « Oui, toutes, comme avec le croquis » : un seul modèle de constat, croquis activé, désactivé ou absent ; ligne et
  colonne vides tant qu'on ne les remplit pas (note de S2 b ; réponse du 16 nov. à cadrage-sans-croquis : « valeurs par défaut identiques à
  la v1.5.1 », comme pour les nouveautés du cadrage et pour la boîte). Cela déroge à la v1.5.1 : la règle « Croquis désactivé ou absent » de
  CLAUDE.md change avec m147 à m150.
- Texte proposé pour CLAUDE.md, une fois m147 à m150 faits [p] : la règle actuelle, dont le point final devient « ; les nouveautés du constat
  de la v1.7.2 y valent aussi : ni « Autres : » ni ligne laissée vide pour écrire à la main, une anomalie qui nomme l'évier et la cuisine ou
  la salle de bain (texte ou localisation) ne compte plus sur la ligne de la pièce, sauf si elle nomme aussi un appareil de celle-ci
  (lave-vaisselle ; douche ou baignoire), ligne « Boîte à l'intérieur ou à l'extérieur de la propriété », colonne « Puits » (réponses du 17
  nov. 2026). » m147 écrit d'abord « ; les nouveautés du constat de la v1.7.2 y valent aussi : ni « Autres : » ni ligne laissée vide pour
  écrire à la main (réponses du 17 nov. 2026). », et m148, m149, m150 ajoutent chacun la sienne, avec ces mots. La phrase de m148 suit D16
  (une douche, une baignoire ou un lave-vaisselle nommés avec l'évier gardent leur ligne ; « Lave-vaisselle : fuite », localisée « Cuisine »,
  reste sur Cuisine) ; « « Évier » seul » la trahissait.
- Coût : un cas de test « croquis désactivé » par correctif (m147 à m150) ; la présentation notée à la signature (D13) reste, pour les
  constats signés avant la v1.7.2.

### D16 Anomalie « Évier » localisée « Cuisine » (pr12-10 ; EA § 9)
- Retenu : choix b. ROW_KW (IX:1974-1981, vérifié ; m115 n'a fait l'exception que pour le lavabo) : cuisine = lave-vaisselle, ou « cuisine »
  sans lavabo ni évier ; salle de bain = douche, baignoire, ou « salle de bain » sans lavabo ni évier [p : même règle que m115]. Une douche,
  une baignoire ou un lave-vaisselle nommés avec l'évier gardent leur ligne.
- S2 (b, 17 nov.) : croquis activé, désactivé ou absent ; la règle ne lit pas vcPret().
- Textes : LISEZMOI l. 273-276 (« La pièce nommée avec le lavabo ou l'évier… le situe seulement »). Données : aucune ; une anomalie dont la
  ligne n'a pas été choisie à la main est rangée de nouveau à l'ouverture [p]. Constat signé : c.fige.conf, rien ne bouge (IX:2089, vérifié).
- Tablette en v1.7.1 : Évier et Cuisine. Compat : inchangé (ROW_KW est dans IX). Différentiel : sans effet.

### D17 Ligne « Boîte à l'intérieur ou à l'extérieur de la propriété » (pr12-11 ; EA § 10)
- Retenu : « Le garder » (présentation actuelle, croquis désactivé compris) et le commentaire : la distance perd « intérieur » ou
  « extérieur » ; une nouvelle ligne à cocher dit le côté.
- Données [p] : c.boite.coteEU et c.boite.coteEP : 'intérieur', 'extérieur', 'sans objet' ou ''. boitesConstat (CJ:2320-2342) rend la
  distance seule (« 0,80 m », « en limite ») et le côté à part, repris seulement s'il n'y a qu'une boîte ; en limite (0), pas de côté [p].
- Écran du constat (IX:2196-2200) : rangée « Boîte à l'intérieur ou à l'extérieur de la propriété », entre la distance et la profondeur ;
  par réseau, boutons « Intérieur » et « Extérieur » (un second toucher décoche) [p] ; « Sans objet (pas de boîte en limite) » (IX:4323)
  met aussi le côté à « sans objet » [p].
- Reprise et suivi : VC_BOITE_CHAMPS (IX:3756) reçoit coteEU et coteEP, même règle que la distance. Écart [p] : « Boîte de branchement EU :
  côté « intérieur » sur le croquis de terrain, « extérieur » au constat. » ; une distance ancienne qui porte le côté se compare à la
  distance du croquis suivie de son côté (vcBoiteCle, IX:3868), sans faux écart.
- Page 2 du constat imprimé (IX:3045-3064, vérifié : traits 40 / 57,5 / 75 / 93, « Conclusion : » à y 109 : page pleine). S3 (a, 17 nov.) :
  « Juste sous la distance, les quatre lignes du tableau un peu resserrées dans le même cadre » : 2e rangée ; quatre rangées de 13,25 pt dans
  le cadre (traits à 53,25 / 66,5 / 79,75) ; libellé en 10 pt, réduit s'il ne tient pas ; deux cases « int. » et « ext. » par réseau [p], la
  choisie porte une croix ; « sans objet » en clair ; les autres valeurs sur une ligne (jusqu'à 5,5 pt) [p].
- Dossiers existants : une distance « 0,80 m intérieur » posée par le croquis et non retouchée devient « 0,80 m », et le côté se coche, à la
  reprise ou au suivi ; une distance tapée ou retouchée reste, côté vide.
- Croquis désactivé ou absent (S2 b) : la même rangée, vide d'office (rien n'est repris) ; une distance tapée qui porte le côté (« 0,80 m
  intérieur ») reste telle quelle, côté vide [p]. Constat signé sans marque : trois rangées (D13).
- Tablette en v1.7.1 : n'affiche ni n'imprime le côté ; efface sa provenance (vcProvenance, IX:3738) [p] ; son « Sans objet » efface le
  côté ; sa reprise réécrit « 0,80 m intérieur ». Compat : inchangé (boitesConstat hors de la garde). Différentiel : sans effet.

### D18 Colonne « Puits » (puits-milieu-naturel ; EA § 3 ; X1, F1, F3, X9)
- Vérifié (m120) : ligne PUITS de la table (CJ:794-796) : cEU et cEP = {code 'MILIEU', lib 'Puits : rejet en milieu naturel'} ; raccOk
  (IX:1957) : en EP, vrai pour MILIEU ; precosAuto (IX:2012) : une ligne EU sur MILIEU ajoute suppMilieu ; PDF page 1 : colonnes Fosse
  septique (rouge), Milieu naturel et Gargouille (vertes, comme « Réseau EP ») (IX:2999-3016), croix l. 3038.
- Réponse, mot pour mot (F3) : « Créée une colone "Puits", garder le rejet EP dans la catégorie EP ».
- Retenu : un code PUITS : RACC ['PUITS', 'Puits'] après MILIEU (IX:1904) [p] ; RACC_LIB.PUITS = 'Puits' (CJ:2217) ; table : cEU et cEP {code
  'PUITS'}, libellé du panneau « Puits » [p]. « Garder le rejet EP dans la catégorie EP » : la ligne d'une gouttière reste dans le groupe EP,
  non conforme ; S4 (a), confirmé le 17 nov. : la colonne « Puits » est verte, comme « Réseau EP », « Milieu naturel » et « Gargouille »
  (IX:3010-3014, vérifié), et la croix d'un rejet des EP dans un puits y va, comme celle d'un rejet des EU.
- Conformité (X1, F1 ; règle de CLAUDE.md : « Rejet des EP dans un puits = NC ») :
  - raccOk : PUITS donne « non » d'office, en EU et en EP. Le code est nouveau : avant lui, aucune ligne ne nommait un puits ; une ligne
    mise à la main sur « Puits » n'est jamais conforme, croquis activé ou non.
  - En EP, seule une ligne dont le raccordement vient du croquis (c.croqAuto.rows[id].raccord === 'PUITS' et valeur non retouchée,
    vcProvenance IX:3738) suit son anomalie ep-puits, gestes généraux de Contrôles compris, comme en m120 : anomalie écartée, « oui » ;
    retenue, NC, « non » [p : raccOk reçoit le constat, ou constatEval fait ce test]. Raison : constatEval (IX:2034-2038) donne « oui »
    d'office à une ligne active dont raccOk est vrai et qu'aucune anomalie NC ne touche.
  - La conformité fixée à la main (« fixé », IX:2155) reste un geste général du constat [p].
  - precosAuto : une ligne EU sur PUITS ajoute aussi suppMilieu [p].
- PDF page 1 : quatre colonnes dans la largeur des trois (365,5 à 493) : 31,875 pt chacune ; traits à 365,5 / 397,4 / 429,3 / 461,1 / 493 ;
  COLX {FOSSE 381,4 ; MILIEU 413,3 ; PUITS 445,2 ; GARG 477,1} ; en-têtes en 8 pt sur deux lignes [p] : « Fosse / septique » (rouge),
  « Milieu / naturel », « Puits », « Gar- / gouille » (verts).
- Écran : option « Puits » du raccordement de chaque ligne (instRowHtml, IX:2146) ; note D7 du panneau Constat du croquis (CJ:6105-6125) ;
  vcValeurs (IX:3721) connaît PUITS.
- S4 (a, 17 nov.) : « Dans la colonne « Puits », verte comme « Milieu naturel » et « Gargouille » » ; (b) et (c) ne sont pas choisis.
  Commentaire : « Penser à supprimer les colonnes inutiles pour que n'apparaissent que les colonnes ayant été cochées » : c'est le constat
  délesté, au lot suivant (fil du 17 nov. ; souhait 9) ; m150 imprime les quatre colonnes.
- Dossiers existants : MILIEU posé par le croquis et non retouché → PUITS à la reprise ou au suivi ; valeur retouchée ou choisie à la main :
  reste « Milieu naturel », et vcEcarts (IX:3913) le signale : « Gouttière(s) avant : raccordement « Puits » sur le croquis de terrain,
  « Milieu naturel » au constat. »
- Croquis désactivé ou absent (S2 b) : la colonne et l'option « Puits » aussi ; une ligne mise à la main sur « Puits » est « non » (test de
  m150). Constat signé sans marque : trois colonnes (la ligne garde MILIEU).
- Tablette en v1.7.1 (X9, vérifié) : raccOk y rejette PUITS en EU et en EP (IX:1957 : `/^(EP|UN)_|^GARG$|^MILIEU$/`) : une ligne
  « Puits » y est « non » d'office, même anomalie écartée, sans la préconisation suppMilieu (IX:2012 : seul MILIEU l'ajoute) ; valeur vide
  dans la liste, pas de croix [p] ; son suivi remet MILIEU, puis la v1.7.2 remet PUITS.
- Compat : inchangé (aucun puits dans la garde). Différentiel : écarts attendus, code MILIEU → PUITS des lignes vers un puits dans le constat
  déduit (le générateur tire des puits), et rien d'autre.

### D19 « Puits » venu d'un fichier, « Puits perdu », « Fosse » (puits-venu-fichier ; EA § 2 ; EB § 1)
- Vérifié : champDest (CJ:857) refuse à la saisie tout nom de puits avec REFUS_PUITS (CJ:856) « Pour un puits, posez l'objet Puits (EP non
  conformes) ; pour un puits perdu, un Puisard. » ; mais l'analyse juge une destination par sa clé cleDest (CJ:839) : un fichier fait à la
  main garde un « Puits » jugé « Conforme ».
- Retenu : choix b. Une seule fonction pour le refus et le jugement [p : nomPuits(s), qui rend 'puits', 'perdu' ou ''] ; dans l'analyse
  (CJ:1149-1153 d'après EA), un nom de puits donne cleX = 'PUITS', sans exutoire de destination : la ligne PUITS de la table s'applique
  (eu-puits et ep-puits non conformes) ; le jugement et la case de la fiche n'ont plus d'effet. L'objet n'est pas modifié [p].
- « Puits », « Puit », « Ancien puits » : comme un puits. « Puits perdu » (F6) : garde le jugement de sa fiche, sans question nouvelle :
  puits-venu-fichier ne visait que « Puits », et Q5.2 (un puits perdu se dessine en puisard) dit comment le dessiner, pas comment juger une
  destination ainsi nommée. Rappel « À vérifier » [p] : « Autre destination « Puits perdu » : jugée d'après sa fiche. Un puits perdu (qui
  infiltre les eaux) se dessine en Puisard. » (la seconde phrase est le texte accepté, puits-perdu-texte).
- Texte « À vérifier » d'un puits [p] : « Autre destination « Puits » : jugée comme un puits (rejet des EP non conforme). Pour un puits,
  posez l'objet Puits ; pour un puits perdu, un Puisard. » ; le même rappel dans la fiche, au-dessus des champs du jugement, laissés visibles.
- « Fosse » : S7 (a, 17 nov.), message M5, codé par m144 (D10) ; (c), une clé des exutoires qui sépare « Fosse » et « Fossé » dans les
  dossiers faits, n'est pas choisi. Noms proches : S6 (b), codé par m144 (D10).
- Dossiers existants : un « Puits » jugé conforme devient non conforme à l'ouverture (voulu). Tablette en v1.7.1 : le jugement de la fiche [p].
- Compat : inchangé (aucune destination dans la garde). Différentiel : sans écart (le générateur ne nomme aucune destination « Puits » ni
  « Fosse », vérifié : generateur.js l. 130).

### D20 Symbole du puits (symbole-puits ; EB § 2)
- Vérifié : le puits est aujourd'hui deux cercles l'un dans l'autre (CJ:2542-2544), proche du puisard.
- Retenu : « un symbole semblable à celui du cadastre avec une barre diamétrale et des manivelles aux extrémités ». La barre dépasse le
  cercle de chaque côté (2,1 pour un rayon de 1,4), pour que les manivelles se voient : notre proposition [p], dite comme telle dans S8.
  L'option « barre seule, sans manivelles » est retirée : elle contredisait la demande ; le formulaire n'affiche que du texte, aucun dessin
  (F12). S8 (a, 17 nov.) : « En Z : vers le haut à gauche, vers le bas à droite » ; (b), toutes deux vers le haut, n'est pas choisi. Code de
  (a), vérifié (axe y vers le haut : commentaire des primitives, CJ:2504 ; dessinerPrims, CJ:2801-2802 ; primsPdf, CJ:6880-6881 ; bloc DXF
  écrit avec les mêmes coordonnées, CJ:7364-7368) :
  ```
  case 'puits':
    cercle(1.4, {trait: rgb, fond: BLANC, ep: ep});
    poly([-2.1, .8, -2.1, 0, 2.1, 0, 2.1, -.8], false, {trait: rgb, ep: ep});
    break;
  ```
- Le même dessin partout : écran, palettes, fiches, plan PDF, légende, DXF (bloc VEDE_PUITS : un CIRCLE de rayon 1,4 et une POLYLINE de 4
  sommets). Le mot « Puits » est le même au plan et au constat (D18). Taille : les bouts des manivelles (±2,1 ; ±0,8) sont à 2,25 du centre,
  au-delà de rayonSymbole('puits') = 2,1 (CJ:2506, vérifié) mais dans son carré, qui sert à l'évitement des étiquettes et à la légende ; seul
  le trait d'une étiquette ou d'une bulle venu de leur côté, arrêté à 2,1 du centre, peut les toucher (0,15 au plus). Retenu [p] : barre à
  ±2,1 (proposée ainsi dans S8) et rayonSymbole('puits') gardé à 2,1 ; repli : une barre à ±1,94, dont les bouts restent à 2,1.
- Compat : inchangé (le DXF n'écrit que les blocs des symboles utilisés, CJ:7344, vérifié ; aucun puits dans la garde). Différentiel : sans
  effet. Tablette en v1.7.1 : deux cercles.

### D21 Présélection d'une étiquette commune (e4 ; EB § 4)
- Retenu : choix b. voisinsEtiquette(doc, an, P) [p] retient un objet o s'il n'est pas P, s'il peut être réuni (tests de refusReunir, dans
  le même ordre, mis en commun dans refusEtiq [p] : appareil EU, sur le plan affiché, même statut, pas déjà réuni avec un autre porteur,
  pas porteur), au même niveau, et à 3 m au plus de centre à centre (la mesure du toast « Loin du porteur », CJ:5544, vérifié) ; tri par
  distance, puis par id.
- « Ne jamais fusionner » : chaque appareil reste un objet et une installation, compté à sa ligne ; l'étiquette commune ne change que
  l'étiquette du plan. « Dessiner seulement une étiquette « cuisine » » : poser l'objet Cuisine ou Salle de bain du catalogue, déjà possible [p].
- Seulement à la création : etiqReunir (CJ:6364, vérifié) passe les voisins à entrerReunir ; « Modifier le groupe » (CJ:6366) reprend le
  groupe tel qu'il est [p]. Rien n'est écrit avant « Terminé » ; « Annuler » ne laisse rien.
- Textes, mot pour mot [p] : toast de 4 s « 2 appareils à moins de 3 m, au même niveau : déjà choisis. Touchez-en un pour le retirer. » ;
  « 1 appareil à moins de 3 m, au même niveau : déjà choisi. Touchez-le pour le retirer. » ; aucun : pas de message ; bandeau « … · 2 choisis ».
- « Même niveau » : S9 (a, 17 nov.) : « Oui, seulement si le porteur de l'étiquette n'a pas de niveau non plus » : même niveau affiché
  (libNiv, CJ:1700-1714) ; deux appareils sans niveau sont au même niveau ; un appareil sans niveau ne l'est pas d'un appareil qui en a un ;
  « étage » sans numéro n'est pas « 1er étage ».
- Croquis désactivé : sans objet. Tablette en v1.7.1 : un groupe fait en v1.7.2 y est le même. Compat et différentiel : sans effet.

### D22 Disque de rotation (remarque-libre, 1re partie ; EB § 9 A)
- Retenu [p] : quand un objet qu'on peut faire pivoter est choisi (fiche ouverte), un anneau fin et gris l'entoure (rayon du symbole à
  l'écran + 22 px), avec une poignée ronde de 12 px dans la direction de son angle. Glisser la poignée, ou l'anneau à 8 px près, le fait
  tourner degré par degré, aides au dessin comprises : plus de pas de 15° ; une bulle montre l'angle (« 35° ») [p] ; un pas d'annulation par
  geste ; l'angle est écrit au lâcher (0 à 359). Les puces de 15° de la fiche (CJ:5970, vérifié : aujourd'hui pour les trois types orientés
  seulement) valent aussi pour les types pivotants (ty.oriente || ty.pivot) [p] ; l'orientation à la pose reste aux trois types orientés [p].
- Accrochage (commentaire de S10 : « La rotation doit se faire degré par degré et proposer un accrochage pour que l'objet soit orienté
  parallèlement ou perpendiculairement à un linéaire proche ») : aimant actif, l'angle se cale, à 5° près [p], sur la direction d'un linéaire
  proche de l'objet ou sur sa perpendiculaire. Linéaires retenus [p] : ceux des aides au dessin, segsCibles (côtés du bâti, traits de
  complément, limites de parcelle si elles sont cochées), et les pièces des tronçons et des collecteurs proches [p : fonction], tuyaux
  raccordés à l'objet compris : un regard se cale donc d'office sur son tuyau quand on le tourne près de sa direction. Chaque linéaire à la
  distance des aides au dessin propose sa direction et sa perpendiculaire ; la plus proche de l'angle du doigt l'emporte, à 5° au plus ; à
  égalité, celle du linéaire le plus proche de l'objet [p]. La bulle le dit (« 30°, parallèle ») [p]. Aimant coupé : au degré, sans
  accrochage.
- Objets : S10 (b, 17 nov.) : « Aussi les symboles qui ne sont pas ronds : regard, boîte, grille, fosse, té, siphon, puits… » : les trois
  types orientés (caniveau, clapet, gargouille : CJ:967, 983, 988, vérifié) et les symboles non ronds [p : liste], par un drapeau pivot de
  def() ; le DXF suit leur angle quand il est donné : e.p.a s'il existe (comme pour un type orienté), sinon rotDeg, comme aujourd'hui
  (CJ:7447-7448, vérifié : `oriente ? (e.p.a || 0) : rotDeg`) ; l'écran et le plan PDF lisent déjà e.p.a (angleSymbole) ; le disque n'écrit
  l'angle au lâcher que s'il a changé ; ni les symboles ronds, ni la zone, ni les textes ((c) n'est pas choisi).
- Taille : L avec l'accrochage ; m154 peut se scinder en m154 (disque, objets, DXF) et m156 (accrochage) [p].
- Données : e.p.a, qui existe déjà ; un objet jamais tourné n'en a pas. Tablette en v1.7.1 : elle tourne déjà l'écran et le plan PDF selon
  e.p.a pour tout type non droit (angleSymbole, CJ:2566, vérifié), pas le DXF. Vérifié : sans angle, l'écran et le plan PDF dessinent un
  symbole non droit à −rot (angleSymbole) et le DXF l'écrit à rotDeg ; un angle de 0, même dessin à l'écran, donnerait 0 au DXF : m154
  vérifie sur un plan tourné que l'écran, le plan PDF et le DXF concordent pour un objet tourné au disque ; pour un objet jamais tourné, un
  écart serait antérieur à m154 : le signaler à l'utilisateur, sans changer son DXF [p]. Compat : 245/245, car un objet non orienté sans
  angle garde rotDeg [p : aucun objet non orienté de la garde n'a d'angle ; m154 le vérifie] ; écrire `e.p.a || 0` pour ces types aurait
  changé cinq empreintes dxf-entites (demo, complement, complement-mm, complement-mi, types ; contre-vérifié à la relecture). Différentiel :
  sans effet.

## Découpage (m137 à m155)
Chaque correctif est livrable seul : un test qui échoue sur la v1.7.1, la batterie verte (`sh tests/tout.sh --navigateur`), un commit en
français, l'envoi sur la branche de travail. Garde de chacun : compat 245/245 sans régénération ; aléatoire 8000 contre le commit d'avant le
correctif. Dans les cartes, « compat 245/245 » veut dire qu'aucune empreinte ne bouge, et « sans écart » qu'aucune sortie comparée par le
différentiel ne change ; seuls m145 et m150 changent des sorties comparées (écarts attendus, vérifiés un par un) ; une sortie qui change hors
de la garde (couleur, ordre d'une étiquette commune, impression) est dite dans la carte. Ordre : d'abord ce qui ne dépend d'aucune réponse et
touche peu de code (m137 à m142), puis les moyens (m143 à m145) et le gros (m146) ; à la fin, ceux de la réponse « Suivi » (m147 à m154 ;
questions S1 à S10 ; réponses venues le 17 nov., codées directement ; m154 est devenu gros, D22), dans l'ordre de leurs dépendances (m147
avant m148 à m150 ; m144 avant m151 ; m141 avant m147 et m153) ; m155 (fil du 17 nov., D2), juste après m140 et avant m141 [p : ordre]. Les
tests nouveaux vont dans des fichiers qui existent ; un fichier nouveau (tests/vm/tropplein.js, si m145 le choisit) s'ajoute à tests/tout.sh
et à tests/LISEZMOI.md.

### Sans réponse attendue
- **m137 « Lavabo » retiré des suggestions ; règle de CLAUDE.md** (e2 ; D1 ; F15). Taille S. Fait : 4772d81, 17 nov.
  - Fichiers : IX : AUTRES_SUGG.EU (l. 1909 ; commentaire en fin de ligne : aucun numéro de ligne ne bouge). CLAUDE.md : règle « Croquis
    désactivé ou absent » (texte retenu : Règles communes). navigateur/dossier.js 83 à 87 ; tests/LISEZMOI.md. LISEZMOI.txt : rien (la liste
    des puces n'y figure pas, vérifié) ; CJ inchangé (NOMS_AUTRES, noms d'un « Autre appareil », n'a pas « Lavabo »).
  - Pour l'utilisateur : la feuille « Autre installation EU » du constat ne propose plus « Lavabo », croquis activé, désactivé ou absent
    (elle ne lit pas le croquis) ; les sept autres puces restent, dans l'ordre ; une ligne « Lavabo » déjà saisie reste, et le libellé se
    tape toujours à la main. Une tablette en v1.7.1 propose encore la puce : la ligne créée se lit comme une ligne saisie à la main.
  - Tests : navigateur/dossier.js 83 (croquis désactivé dans les Réglages) et 86 (croquis activé, un lavabo dessiné) échouent sur 2f2a638 ;
    témoins 84 (« Douche », feuille EP inchangée), 85 (« Lavabo » tapé à la main), 87 (la ligne reste) ; 146 contrôles. Garde : compat
    245/245 ; aléatoire 8000 contre 2f2a638 (même code que 71a4ed6) : sans écart.
  - Relecture : aucun défaut bloquant ni majeur. Trois remarques appliquées : la règle de CLAUDE.md précise « en 9,5 pt, mais qui tient en 7
    pt » (une valeur plus longue s'imprime sur deux lignes de 7 pt, de part et d'autre du libellé, comme en v1.5.1 ; cas 12 de
    navigateur/constat-boite.js) ; message du cas 85.
  - Risques et [p] : texte de la règle de CLAUDE.md, plus précis que celui de la conception [p], revu après la réponse S2 (b, 17 nov.) : m147
    à m150 le complètent (D15) ; commentaire en fin de ligne d'IX:1909 [p].
  - Suite : S2 (b, 17 nov.) : m147 à m150 complètent la règle de CLAUDE.md, chacun pour sa nouveauté (D15).
- **m138 Prolongement sans limite** (pr12-9 ; D2 ; X5). Taille S. Fait : 80ffc7d, 17 nov.
  - Fichiers et fonctions : CJ : contrat et commentaire de PROL_MAX (l. 336-351), prolSegs (défaut Infinity, l. 364-366), interSegs (défaut
    PROL_MAX gardé, l. 386), Réglages (accProl et accInter, l. 3260-3261), traitsComplement (tirée de segsPres, sans changement,
    l. 3663-3669), accrochesNouvelles (prolSegs avec PROL_MAX, l. 3710-3719), prolLoin et PROL_LOIN_MAX = 256 (nouveaux, l. 3720-3755),
    appelés par accrocheLibre (après la façade, l. 3766), accroche d'un point saisi d'un tronçon (après le redressement, l. 3817) et le
    sommet glissé (repli, l. 4224). cibles(), segsCibles et dansGrille : ceux de la v1.7.1 (l'argument qui levait la borne de 120 m pour
    cibles() a disparu à la correction). LISEZMOI.txt l. 295-303 ; croquis/LISEZMOI.txt l. 27 ; tests/vm/dessin.js,
    tests/navigateur/accroches.js, tests/LISEZMOI.md.
  - Pour l'utilisateur : « Prolongement d'un côté » cale le point au-delà d'un bout, sans limite de longueur (tout côté visible compte, même
    à plus de 120 m). Jusqu'à 30 m, il garde sa place de m113, avant le redressement et la façade ; au-delà, il passe après eux, et seulement
    pour un point resté libre. « Intersection » garde 30 m ; son explication des Réglages le dit (« … se croisent, à 30 m au plus de leurs
    bouts »). Une tablette en v1.7.1 garde 30 m : rien de neuf n'est enregistré dans le croquis.
  - Tests : vm/dessin.js (187) : prolongement sans longueur donnée à 30,1 m, 40 m et 10 km au-delà du bout, explications des Réglages mot
    pour mot (échouent sur a3f86c6) ; témoins : une longueur donnée reste une borne, l'intersection garde 30 m. navigateur/accroches.js, cas
    pl (28 ; fichier : 217) : 29,9 m, 30,1 m et 40 m au-delà du bout ; côté du bâti à 150 m (0,11 px/m) et à 750 m (0,02 px/m) ; fond dense
    au zoom le plus large, plus de 256 côtés (zd, zp) ; point libre et tronçon calés à 65 m (l9, t9) : échouent sur a3f86c6 ; façade et
    redressement avant un prolongement de plus de 30 m (f9, r9), intersection qui cherche ses côtés à 120 m au plus au zoom large (n120),
    borne exacte par la diagonale du canevas (e5) : échouent sur la première version ; témoin : intersection à 30 m. Garde : compat 245/245 ;
    aléatoire 8000 contre a3f86c6 : sans écart.
  - Relecture : deux défauts majeurs de la première version, corrigés. (1) Sur un fond dense, de 10 à 20 px/m, le prolongement de côtés
    lointains prenait la plupart des points redressés ou posés sur une façade (fond fictif « ville », façade à 10 px/m : 84/16 devenait
    16/84) : au-delà de 30 m, il passe après eux (option 1 du relecteur [p]). (2) Le glissé devenait 9 à 28 fois plus lent (rayon de cibles()
    porté à une diagonale de l'écran, sans la borne de 120 m) : cibles() a repris celui de la v1.7.1, et prolLoin fait un seul passage sur
    les côtés, sans la grille. Remarques appliquées : phrase fausse du LISEZMOI du croquis, borne de l'intersection dite dans les Réglages et
    le LISEZMOI, liste des appels qui gardent 120 m (cibles(), milieu, perpendiculaire, coin, façade, areteProche, coinProche, segsPres(q,
    .25)).
  - Mesures (processeur ralenti 4 fois, fond fictif de 60 × 60 bâtis, 7 218 polylignes, limites cochées ; moyenne par mouvement) : glissé
    avec Prolongement, Intersection et Limites, de 10 à 1 px/m : 0,8 à 2,5 ms (a3f86c6 : 1,1 à 2,5 ; première version : 6,0 à 73) ; point
    resté libre (prolLoin tourne) : 2,8 à 5,0 ms de 5 à 1 px/m (a3f86c6 : 0,8 à 1,0), jusqu'à 11,7 ms au zoom large (a3f86c6 : 7,3) ;
    cibles() à 0,02 px/m : 1,6 ms (a3f86c6 : 1,3, même code : bruit [p]) ; demoDxf : 0,6 à 5,6 ms (a3f86c6 : 1,0 à 6,1). Banc Node, pire cas
    de prolLoin : 4,9 ms avec la borne de 256 côtés, 92 ms sans elle.
  - Risques et [p] : ordre au-delà de 30 m (option 1 [p] ; autres : « le plus proche du doigt l'emporte », ou l'ordre de m113 gardé et dit
    dans l'aide : à demander à l'utilisateur) ; sur un fond dense, dès 5 px/m environ, un point resté libre se cale presque toujours sur le
    prolongement d'un côté lointain (18 sur 18 à 5 px/m, 39 sur 39 à 1 px/m : effet de D2) ; borne par la diagonale du canevas [p] ; seuil de
    10 px, 120 m au plus, comme la façade [p] ; borne de 256 côtés (4 points sur 2 100 restent libres, à 0,2 px/m, fond de 40 × 40 tourné au
    hasard) [p] ; intersection à 30 m [p] ; texte de l'explication d'« Intersection » ajouté [p]. Dépendances : aucune.
  - Suite : m155 (fil du 17 nov. : « Prolongement toujours d'abord ») rend au prolongement lointain la place de m113 ; l'ordre de m138
    au-delà de 30 m (option 1 [p]) n'est plus retenu (D2).
- **m139 Escalier : côté et montée proposés ; consigne pour les anciennes tablettes** (pr12-2, escalier-rendu ; D3, D4 ; X6). Taille S.
  Fait : dc6c18f, 17 nov.
  - Fichiers et fonctions : CJ : ESC_POSE (nouvelle, l. 1060) et escalierDefauts (l. 1061-1099 : lignes retenues, centres des deux côtés,
    dedans et fond, pres(), côté, règle des cotes, montée ; contrat à jour) ; surPremier (nouvelle, l. 4571), appelée par pointTrace
    (l. 4573) et par le glissé d'une poignée (l. 4253) ; refsEscalier (nouvelle, l. 5065), par où passent le fantôme (fantomeEscalier,
    l. 4601) et la pose (l. 5461). LISEZMOI.txt l. 173-178 (outil « Escalier ») et l. 474-478 (consigne de mise à jour) ;
    croquis/LISEZMOI.txt l. 26 (nouvelle puce « Complément du fond ») et l. 30 (outil « Escalier ») ; tests/vm/escalier.js,
    tests/navigateur/escalier.js, tests/LISEZMOI.md.
  - Pour l'utilisateur : un escalier posé contre une annexe dessinée en contour fermé de « Complément du fond » se propose hors de l'annexe.
    Un contour qui entoure l'escalier (limite redessinée, terrasse autour de la maison) ne compte pas pour le côté, et le côté proposé reste
    hors du bâti du fond quand c'est possible. Un bout à 1 cm au plus du bâti ou d'un contour fermé compte comme posé pour la montée : un
    escalier tracé depuis un coin le long d'une façade monte maintenant vers la fin (v1.7.1 : vers le départ). Un contour de « Complément du
    fond » se ferme en touchant de nouveau son premier point (14 px, même aimant coupé), ou en lâchant la poignée d'un bout sur l'autre
    bout ; il compte alors aussi pour « Rejet au sol ». La consigne de mise à jour cite l'escalier et ce que montre une tablette en v1.6.3.
    Rien d'autre ne change à l'écran, au plan PDF ni au DXF ; un escalier déjà posé garde ses valeurs.
  - Tests : vm/escalier.js (75) : d9 changé (montée « fin ») ; d17, d18, d19, d22, d23, l1, l2, l3 : échouent sur 771b7a7 ; témoins d20,
    d21 ; gardes nouvelles r1 (ni an.lignes ni an.pieces, resLigne 'LIM') et r2 (DXF : VEDE-ESCALIERS seul, aucun calque de réseau) ; gardes
    qui existaient : m3 (resLigne 'LIM'), x1, x3 à x6 (VEDE-ESCALIERS), p1, p2, p7, p8 (légende « Escalier »), a1 (analyse identique avec et
    sans escalier). navigateur/escalier.js (73) : c changé ; k (contour fermé fictif de 12 m², fantôme et escalier posé du même côté, contour
    ajouté pendant le tracé, fiche sans « Réseau »), h (fermeture au toucher, aimant coupé, poignée ; témoins à 20 px) et e (contour qui
    entoure) : échouent sur 771b7a7. Garde : compat 245/245 ; aléatoire 8000 contre 771b7a7 : sans écart (10 666 analyses comparées).
  - Relecture : trois défauts majeurs de la première version, corrigés. (1) Un contour tracé à la main ne se fermait jamais (le redressement
    « Parallèle au bâti » laissait le dernier point à 4e-5 m du premier) : D3 restait sans effet ; fermeture ajoutée au tracé et au glissé
    (surPremier), sans tolérance dans lignesRef. (2) et (3) Un contour fermé qui entourait l'escalier ou touchait la maison (limite
    redessinée, terrasse) faisait proposer le côté situé dans la maison, et la règle des cotes de m108 ne jouait plus (régression sur la
    v1.7.1) : un complément qui contient les deux centres ne compte plus pour le côté, et le bâti du fond tranche d'abord. Remarques : M1 et
    M2 notées en [p] ci-dessous ; M3 : place de la consigne dite.
  - Risques et [p] : pr12-2 d prime sur les points 2 et 3 du « D'accord » à escalier-outil (montée : seules les accroches « coin » et
    « façade » comptaient ; côté lu sur le seul bâti du fond, « Gauche » fond masqué) ; fond masqué, les contours fermés de complément
    comptent encore [p] ; seuil de 1 cm compris, pour le départ comme pour la fin [p] ; départ posé par cotes : seul cotes.facade compte
    [p] ; un contour qui entoure l'escalier compte encore pour la montée, comme un bout accroché à ce trait en v1.7.1 (d23) [p] ; fermeture
    même aimant coupé, rayon de 14 px (celui du coin), repère « coin du bâti » [p] ; phrases du LISEZMOI [p] ; phrase de la consigne reprise
    de D4, non vérifiée sur une v1.6.3 [p] ; place de la consigne : puce à part, entre l'étiquette commune et l'anomalie à arbitrer, pas dans
    la première puce, qui dit qu'une tablette en v1.7.0 ne connaît pas ces objets (faux pour l'escalier) ; refsEscalier relit le croquis à
    chaque mouvement pendant le tracé ; fond invalide : refsEscalier garde les compléments du croquis, alors que refsCotes ne rend rien [p].
  - Dépendances : aucune. S11 (a, 17 nov.) : rien de plus. Ses trois changements visibles sont acceptés (fil du 17 nov. : « Tous les trois
    (Recommandé) », « Rien à changer. »).
- **m140 Boîte en limite et boîte en zone unitaire** (boite-en-limite, pr12-5 ; D5, D6 ; X3, F8). Taille S. Fait : b5e5215, 17 nov.
  - Fichiers et fonctions : CJ : coteLimite (nouvelle, l. 2454) et texteLimite (l. 2455) ; boitesConstat (l. 2352), avec traversees
    (nouvelle, l. 2369 : plus courts chemins de l'analyse de chaque source jusqu'à ses exutoires dessinés, resObj[s].term, dans le sens
    dessiné des tuyaux ; un drain de collecte part des sommets de ses pièces ; calculé une fois par analyse) ; fiche de la boîte (l. 6102).
    IX : vcBoiteCle (l. 3870). LISEZMOI.txt l. 149-152, 156-163 et 269-280 ; croquis/LISEZMOI.txt l. 22 et 51 ; tests/vm/boite.js,
    tests/navigateur/boite.js, tests/navigateur/constat-boite.js, tests/LISEZMOI.md.
  - Pour l'utilisateur : l'étiquette de la boîte (écran, plan PDF, DXF) écrit « à 0,80 m de la limite, à l'intérieur de la propriété » (ou
    « …, à l'extérieur de la propriété ») ; côté seul : « à l'intérieur de la propriété » (v1.7.1 : « côté intérieur ») ; « en limite de
    propriété », la distance seule et le cas sans champ ne changent pas ; fiche : « Sur le plan : ≈ 0,80 m, à l'intérieur de la propriété »,
    « côté à confirmer » et les puces gardés. En zone unitaire, une boîte sans réseau indiqué que le dessin dit unitaire remplit la colonne
    du constat des appareils dont les eaux y passent (les deux si elle reçoit des EU et des EP, ou si aucun n'y passe) ; une boîte indiquée
    unitaire dans sa fiche compte pour les deux (F8) ; une boîte que le dessin dit mêlée n'est pas reprise, comme avant (le LISEZMOI le dit).
    Le constat garde « 0,80 m intérieur » (m149) ; vcBoiteCle reconnaît la nouvelle écriture recopiée au constat.
  - Tests : vm/boite.js (142) : l1, l2, l8, l9, l12, l13, l15, l16, e2, e4, s1 à s3 changés (nouvelle écriture) ; c18 changé (avant : deux
    boîtes en EU et en EP, rien de repris) ; l20 à l23, c19 à c21, c26 à c28, c30 à c32 : échouent sur 1ee93f4 ; témoins l24 à l27, c22 à
    c25, c29 (boîte mêlée), c33 (boucle : passe sur 1ee93f4, échoue sur la première version). navigateur/boite.js (51) : e, p, a, g, k, b
    changés, échouent sur 1ee93f4 ; navigateur/constat-boite.js (73) : cas 10, paires m140 (vcBoiteCle), échoue sur 1ee93f4. Garde : compat
    245/245 ; aléatoire 8000 contre 1ee93f4 : sans écart (10 666 analyses) ; sondes : la boîte, le regard d'arrivée et les exutoires de
    l'analyse sont toujours sur le chemin de traversees (2000 graines × 3 options, 10 427 sources, 0 écart).
  - Relecture : ni défaut bloquant ni défaut majeur ; neuf remarques corrigées : M1 (la première version suivait les flèches du plan,
    an.sensPiece, arbitraires dans une boucle : le réseau de la boîte dépendait du découpage des tuyaux ; traversees suit maintenant les plus
    courts chemins de l'analyse ; la variante « sensSource seul » cassait c27), M2 (vcBoiteCle), M3 et M7 (c31, c32), M4, M5 et M9 (lignes
    recoupées, c19 rangé), M6 (LISEZMOI restreints à la boîte dite unitaire ; boîte mêlée non reprise), M8 (présomptions reportées
    ci-dessous).
  - Risques et [p] : étiquette de 52 caractères au lieu de 32, non replacée (recours : « Replacer toutes les étiquettes ») ; dans une boucle,
    une boîte posée sur le tuyau qui relie deux branches n'est sur aucun chemin : EU et EP, comme en v1.7.1 [p] ; une source sans exutoire
    dessiné (réseau présumé) ne compte pour aucune boîte [p] ; une boîte qu'aucune source ne traverse compte pour les deux [p] ; an.ref n'est
    jamais atteint dans l'application (c28 est synthétique) ; dossier existant : une valeur EP reprise et non retouchée d'une boîte unitaire
    seule qui ne reçoit que des EU se vide au suivi, sans écart affiché (voulu par pr12-5) ; tablette en v1.7.1 : n = 2, elle vide une valeur
    reprise par la v1.7.2 si personne n'y a touché [p]. Question pour l'utilisateur : rattacher aussi à ses appareils la boîte que le dessin
    dit mêlée (un « Tronçon EU », un « Tronçon EP » ou un drain y arrive) ?
  - Dépendances : aucune.
- **m141 Ordre de l'étiquette commune** (ordre-etiquette-commune ; D7 ; X8). Taille S. Fait : 52b79cc, 17 nov.
  - Fichiers et fonctions : CJ : ORDRE_ETIQ, rangEtiq et triEtiq (l. 2490-2496, à la place de rangCatalogue, retirée) ; groupeEtiquette
    (l. 2497-2511 : membres triés par triEtiq, porteur en objets[0]) ; texteGroupe (l. 2536-2544 : copie triée, porteur compris, titre lu sur
    g.objets[0]) ; comptesGroupe (l. 5646 : copie triée). LISEZMOI.txt l. 260 ; croquis/LISEZMOI.txt l. 21 ; tests/vm/equipements.js (c10 ;
    attentes de c1, c2, c4, c5 et c6), tests/navigateur/equipements.js (c11 ; attentes de c8 et e3), tests/LISEZMOI.md.
  - Pour l'utilisateur : « douche, lavabo, WC + lave-mains » quel que soit le porteur, à l'écran, au plan PDF et au DXF ; « Compté au
    constat : Salle de bain 1, Évier 1, WC 1 » ; « évier, lave-vaisselle ». Ordre : salle de bain, douche, baignoire, lavabo, évier, WC (WC +
    lave-mains compris), cuisine, lave-vaisselle, lave-linge, chaudière, siphon de garage, attente, autre appareil ; un type absent de la
    liste vient après ; à égalité, l'id.
  - Tests : vm/equipements.js (259) : c10 (16 cas) échoue sur 5549078 pour 15 cas (y passent les types d'essai sous la douche porteur, même
    repli qu'avant) ; 33 attentes d'ordre refaites (X8, fichier lu en entier) ; 211/259 sur 5549078. navigateur/equipements.js (134) : c11
    (14 cas, WC + lave-mains porteur) échoue sur 5549078 pour 8 cas ; attentes refaites dans c8 (5) et e3 (6) ; 115/134 sur 5549078. Garde :
    compat 245/245 ; aléatoire 8000 contre 5549078 : sans écart (10 666 analyses ; aucune étiquette commune tirée avec --contre) ;
    différentiel sur 2 000 croquis : 735 textes de porteurs ne changent que par l'ordre, constat identique.
  - Relecture : ni défaut bloquant ni défaut majeur ; deux suggestions traitées : test du type absent de la liste (deux types d'essai, au
    catalogue du test seulement) ; renvoi « décision D7 » précisé (« de la conception v1.7.2 »). Écartée, hors de l'objet de m141 : la même
    précision pour les renvois de m140 (« décision D6 ») et de m138 (« décision D2 »).
  - Risques et [p] : ordre au-delà de l'exemple [p] ; le porteur perd la tête de la liste [p]. Dépendances : aucune (m147 et m153 viennent
    après).
- **m142 Couleur du drain d'infiltration d'après ses eaux** (drain-infiltration-dessin ; D8). Taille S. Fait : cbbdd7c, 17 nov.
  - Fichiers et fonctions : CJ : analyser (eauxDrains, l. 1479 ; boucle des sources, l. 1504-1511 : un compte par drain d'infiltration
    atteint, d'après la nature de la source, un drain de collecte compté en EP ; an.eauxDrains, l. 1652, écrit seulement s'il n'est pas
    vide) ; resLigne (l. 2451-2462). LISEZMOI.txt l. 106-110 ; croquis/LISEZMOI.txt l. 16, 69 et 73 ; tests/vm/drain.js (d18),
    tests/vm/charger.js (pdf() relève la couleur du texte, pos[].coul), tests/navigateur/drain.js (c1), tests/LISEZMOI.md.
  - Pour l'utilisateur : un drain d'infiltration qui ne reçoit que des eaux usées est rouge (écran, plan PDF, couleur de l'étiquette, tête de
    la fiche, DXF en couleur 1 sur VEDE-DRAINS ; légende « Canalisation EU ») ; vert dès qu'il reçoit des EP, ou sans source ; « Projet » en
    projet. Au plan d'avant-projet, un drain « à supprimer » garde la couleur de l'état des lieux, comme un tuyau ; un drain gardé que plus
    rien n'atteint est vert [p]. Une anomalie ajoutée à la main sur un drain rouge part en EU [p]. Inchangés : libellés du panneau Constat
    (S5 a), texte « Dispersion dans le sol », resObj, constat, données ; regard posé sur le drain : EP, tampon béton en réserve ; tuyau sans
    réseau qui mène au drain : vert.
  - Tests : vm/drain.js (146) : d18 (14 cas) échoue sur a7635a4 pour 13 cas (y passe le témoin des libellés S5 a) ; 133/146 sur a7635a4.
    navigateur/drain.js (45) : c1 (4 cas) échoue sur a7635a4 pour 3 cas ; 42/45 sur a7635a4. Garde : compat 245/245 (aucun drain
    d'infiltration) ; aléatoire 8000 contre a7635a4 : sans écart (10 666 analyses, 9 892 drains d'infiltration ; la couleur n'y est pas
    comparée).
  - Relecture : ni défaut bloquant ni défaut majeur ; suggestions traitées : le cas de la légende vérifie le tuyau resté vert ; tuyau vert et
    regard EP écrits dans les LISEZMOI ; au plan d'avant-projet, un drain gardé que plus rien n'atteint est vert, au lieu de la couleur de
    an.ref que D8 présumait (une ligne de resLigne : comme un tuyau, le drain ne reprend an.ref que s'il est absent du plan d'avant-projet).
  - Risques et [p] : réseau saisi ignoré, sens non lu, drain de collecte en EP, toute source qui atteint le drain compte, quel que soit son
    résultat [p] ; un dossier existant change de couleur à l'ouverture (rien n'est écrit) ; une tablette en v1.7.1 le montre vert
    (information, S11) ; sous un drain rouge, le regard reste EP, en réserve, et le tuyau sans réseau du WC reste vert (son exutoire, DISP,
    est EP) : à dire dans l'annonce, avec la question de la couleur de ce tuyau. Dépendances : m145 (trop-plein) s'appuie sur an.eauxDrains.
- **m143 Anomalies rangées d'après l'objet du croquis** (rangement-autres-par-texte ; D9 ; X7). Taille M. Fait : 332e467, 17 nov.
  - Fichiers et fonctions : CJ : reconcilier, ligneDe (l. 2103-2111 : la condition nomLibre est retirée, toute ligne non standard remplit
    autresG) ; commentaires de ligneDe et de ops.autres (l. 2171). index.html non modifié : vcApparier, vcRangerAutres et vcAutreSuit (m133)
    traitent déjà toute ligne non standard. LISEZMOI.txt l. 261-265 ; croquis/LISEZMOI.txt l. 20 ; tests/vm/equipements.js (g11, g9),
    tests/navigateur/dossier.js (cas 88 à 94 ; constatVu reçoit o.finAvant, croixPdf), tests/LISEZMOI.md.
  - Pour l'utilisateur : l'anomalie d'une chaudière, d'une attente, d'un drain (point ou drain de collecte), d'un siphon de cour ou d'un
    trop-plein du croquis va sur la ligne du constat liée à la ligne « Autres » qui compte cet objet : celle que la reprise a créée, ou une
    ligne déjà tapée, du même nom ou d'un nom qui lui ressemble. Une ligne choisie à la main reste (« Aucune » comprise) ; une anomalie
    saisie au dossier est rangée par son texte ; sans ligne liée, rangée par le texte, puis rappel ; constat signé inchangé.
  - Tests : vm/equipements.js (273) : g11 (14 cas) et une assertion de g9 ; 260/273 sur f71a6e7. navigateur/dossier.js (161) : cas 88 à 94 :
    8/15 sur f71a6e7 (88, 90, 91, 92 et 94 échouent). Garde : compat 245/245 ; aléatoire 8000 contre f71a6e7 : sans écart (10 666 analyses ;
    les opérations n'y sont pas comparées).
  - Relecture : ni défaut bloquant ni défaut majeur ; un mineur confirmé, corrigé : le cas 91 lit l'état du constat au suivi seul, avant la
    reprise (o.finAvant) ; cas 94 ajouté, témoin du livrable (croix du PDF du constat sous « Non »). D9, point 4, à lire ainsi : objet passé
    en projet, anomalie intacte retirée ; retouchée, gardée sur sa ligne, comme pour une ligne du formulaire. Laissé : les commentaires
    d'index.html (l. 3645-3646, 3762-3766, 3785-3786, 3854, 3897-3899) ne parlent que de l'« autre appareil » : à reprendre au prochain
    correctif qui touche index.html.
  - Risques et [p] : deux lignes tapées qui ressemblent à une même ligne « Autres » (« Chaudière gaz », « Chaudière fioul ») : la première
    dans l'ordre du constat reçoit toutes les anomalies, seul l'écart de nombre est rappelé [p] ; dossier existant : au premier suivi,
    l'installation des anomalies qui suivent le croquis est écrite (date de l'étude changée ; constat signé inchangé) ; tablettes en v1.7.1
    et v1.7.2 sur un même dossier : la ligne peut changer d'une tablette à l'autre [p]. Dépendances : aucune.
- **m144 Destinations de même nom refusées ; noms proches et « Fosse »** (destinations-meme-nom ; D10 ; F9 ; S6 b, S7 a). Taille L. Fait :
  6a50c46, 18 nov.
  - Fichiers et fonctions : CJ : canonDest, distDest, degreFormes, degreDest, DEST_OBJETS, REFUS_FOSSE, refusObjet, refusNomDest,
    reponseNomProche (après destSaisie, qui prend un 3e argument facultatif l : sans lui, résultat inchangé ; avec lui, champ et q) ; exports
    VC.canonDest, distDest, degreDest, refusNomDest, reponseNomProche ; éditeur : demander (o.cls, o.sansAnnuler, o.annulerFn, d.vcFermer ;
    rend le dialogue), questionNom, listesDest (avec nom0), nouvelleDestination (creer), destTxt, ecrireDestTxt, reprendreDest, fermerNiveau
    (le dialogue du dessus), ouvrir (tous les dialogues retirés), palette (« Autre destination » non pressée quand l'outil porte un modèle).
    IX : vcExuModifier (listes ; close d'onMount), vcExuQuestion ; commentaires de m133 (autresAnom, vcRangerAutres, constatDepuisCroquis,
    rappel des anomalies sans ligne) mis à jour, laissés par m143. LISEZMOI.txt (paragraphe des destinations), croquis/LISEZMOI.txt,
    tests/vm/rejets.js, tests/navigateur/rejets.js, tests/LISEZMOI.md.
  - Pour l'utilisateur : deux noms qui ne diffèrent que par les accents, les majuscules, les signes, l'article du début, une lettre doublée
    ou le pluriel sont le même ; un numéro ou une lettre seule distingue toujours deux noms. Refusés, avec un toast de 4 s, la saisie gardée
    (fiche : la valeur rendue) : « Fosse » sans accent (texte de S7 a) ; le nom d'un objet de la palette ; un même nom (palette : modèle,
    « choisissez-la dans la palette » ; destination seulement posée : acceptée si écrite de même, de même abréviation, ou laissée vide, et de
    mêmes jugements, sinon « déjà posée sur ce plan » ; fiche : écrite comme une autre de mêmes jugements, elle en prend l'abréviation et
    l'article, sinon « écrivez « … » pour la même » ; corriger accents, majuscules ou espaces y est accepté ; Réglages : « existe déjà dans
    la liste »). Nom proche : la question « Nom proche » ; « La même » arme l'outil de l'existante (palette), reprend ses cinq champs en un
    pas d'annulation, d'où un seul rejet au constat (fiche), remet l'ancien nom avec le toast, la fenêtre restant ouverte (Réglages) ; « Une
    autre » garde le nom tapé ; face à un objet, « Le même » arme son outil (palette), donne le refus de l'objet et l'ancien nom (fiche,
    Réglages). Rien n'est comparé au chargement, à la restauration ni à l'import.
  - Tests : vm/rejets.js (176) : n1 à n7 ; 152/176 sur 769d1af (n4, garde du chargement, et les témoins passent). navigateur/rejets.js
    (106) : m4 à m7 ; 87/102 sur 769d1af (m5 s'arrête : sans la question, Échap ferme l'éditeur). Garde : compat 245/245 ; aléatoire 8000
    contre 769d1af : sans écart (10 666 analyses ; le générateur écrit les noms sans la saisie).
  - Relecture : ni défaut bloquant ni défaut majeur ; huit mineurs et trois suggestions. Corrigés : M1 (orthographe corrigée dans la fiche :
    même nomCle que le nom d'avant), M2 et M11 (« Autre destination » pressée après « La même »), M3 et M9 (« La même » des Réglages : toast,
    ancien nom remis, fenêtre ouverte), M5 (abréviation laissée vide reprise), M7 (fiche : une destination posée de même texte passe avant le
    modèle), M10 (LISEZMOI.txt). Écartés : M4 (fiche face à un modèle de même texte et d'autres jugements : « choisissez-la dans la palette »
    gardé, là où D10 dit M3, qui parle d'une destination posée [p]) ; M6 (« Puisard 2 », « Fosse 2 », « Fosse septique 2 » acceptés : un
    numéro distingue deux noms, lettre de D10) ; M8 (textes à faire valider ; face à une ancienne « Fosse », les refus renvoient de « Fossé »
    à « Fosse »).
  - Risques et [p] : faux négatifs (deux fautes sous 10 lettres, une sous 5 ; une lettre élidée au milieu devient un repère : « Étang
    d'Ouest » et « Étang Ouest » sont différents) ; doublons venus d'une autre tablette, que seul le refus « déjà posée sur ce plan » voit ;
    forme de la question (titre « Nom proche », « La même » en bouton principal, le focus sur « Une autre », sans « Annuler », Échap ou le
    fond la ferment seule) [p] ; M5 pour « Fosse » sans accent seulement (« Fosse 1 », « Fosse du jardin » acceptés) [p] ; objets reconnus
    par leur seul libellé (« Infiltration » acceptée) [p] ; textes des messages [p]. Dépendances : aucune (m151 ne garde que le « Puits »
    venu d'un fichier).
- **m145 Trop-plein d'un puisard ou d'une infiltration suivi** (q7-trop-plein ; D11). Taille M.
  - Fichiers et fonctions : CJ : parcours (l. 1212-1235, option [p]), terminal (l. 1200-1208), bloc Q7 (l. 1468-1487), resObj[id].apres
    (l. 1552-1558), rejetsDe et auDelaTxt (l. 921-923), texte « Rejet : … » (l. 2205), page 2 du plan (l. 7277), an.eauxDrains (m142).
    LISEZMOI.txt après l. 104-118. tests/vm/rejets.js [p : ou tests/vm/tropplein.js].
  - Pour l'utilisateur : « Rejet : puisard et, par le trop-plein, réseau EU départemental », non conforme, avec l'anomalie du réseau atteint ;
    au constat, la ligne suit.
  - Tests : t1 (descente → puisard → collecteur EU : apres [EU], anomalie ep-eu, ligne « non » ; v1.7.1 : conforme), t2 (infiltration au sol),
    t3 (trop-plein vers EP : conforme), t4 (tuyau orienté vers le puisard : rien), t5 (deux destinations : multiple), t6 (bifurcation avant :
    multiple, comme en v1.7.1), t7 (puisard → puisard → EU), t8 (le texte) ; garde-fou du tuyau sans sens ; drain atteint par un trop-plein
    compté dans an.eauxDrains.
  - Garde : compat 245/245 (sonde) ; aléatoire contre le commit d'avant : écarts attendus, seulement sur les sources qui atteignent un puisard
    ou une infiltration prolongés par un tuyau ; chacun vérifié (sources, anomalies, conclusion, constat), aucune exception.
  - Risques et [p] : tuyau sans sens [p] ; nom de l'option et de la marque [p] ; tablette en v1.7.1 [p]. Dépendances : m142.
- **m146 « Deux points » : poser par deux cotes** (remarque-libre ; D12). Taille L.
  - Fichiers et fonctions : CJ : VC.geo.deuxCotes (près de l. 410-413), mode Cotes (l. 4962-5393 : état, aideCotes, cotesHtml, dessinerCotes,
    pose, déplacement, départ). LISEZMOI.txt l. 166-173 et 290-298 [p]. tests/vm/dessin.js, tests/navigateur/cotes.js.
  - Pour l'utilisateur : bouton « Deux points » au premier pas du mode Cotes ; deux points, deux distances, « Solution 1 » ou « Solution 2 »,
    « Poser » ; textes de D12.
  - Tests : vm/dessin.js deuxCotes : l'exemple (3,6 ; ±4,8), sans solution, tangence, points confondus (la v1.7.1 n'a pas la fonction) ;
    navigateur/cotes.js : un regard posé en (3,6 ; 4,8) à 1 cm près, puis « Solution 2 » en (3,6 ; −4,8).
  - Garde : compat 245/245 ; aléatoire : sans écart (rien de l'analyse).
  - Risques et [p] : lecture de « deux cotes » [p] ; points acceptés [p] ; côté de la Solution 1 [p]. Dépendances : aucune. À scinder si la
    relecture le demande (calcul, puis mode Cotes).

### Réponse « Suivi » venue le 17 nov. (codés avec elle)
- **m147 Constat sans « Autres : » ni ligne vide ; présentation notée à la signature** (e1, T1 ; D13, D14, D15 ; X2, F7 ; S1 d, S2 b). Taille
  M.
  - Réponses : S1 (d) et son commentaire : aucune ligne n'a « Autres : », et les lignes vides du bas de chaque groupe ne sont plus
    imprimées ; S2 (b) : croquis activé, désactivé ou absent (sans croquis, « ni ligne vide » est une présomption [p] : D14). Constat signé :
    règle de CLAUDE.md (D13), sans question.
  - Fichiers et fonctions : IX : constatRowsForPrint (l. 2931 : grp et minAutres, vérifié), drawConstatTable (l. 2999-3044 : hauteurs
    l. 3001, chaque ligne type à sa hauteur du formulaire, une ligne ajoutée à 17,5, le tout mis à l'échelle pour remplir 218,5 pt [p] ;
    ligne vide l. 3022, libellé l. 3023), présentation du constat (fonction nouvelle [p]), geste de signature c-lock (l. 4346 : c.fige.mep
    posé après constatFigeCalc [p : nom]), constatFigeCalc et constatGeler (l. 2087-2102, sans la marque), vcEcarts (l. 3908). CJ :
    comptesGroupe (l. 5494), fiche de l'autre appareil (l. 5904). LISEZMOI.txt l. 118, 248-250, 431. CLAUDE.md (règle « Croquis désactivé ou
    absent », D15). tests/navigateur/dossier.js, tests/navigateur/equipements.js. Numéros de 71a4ed6 : à retrouver par recherche.
  - Pour l'utilisateur : au constat imprimé, les lignes ajoutées portent leur seul nom (« Bidet », « Drain », « Chaudière (purge,
    condensat) ») et les lignes vides du bas de chaque groupe disparaissent, croquis activé, désactivé ou absent ; fiche « Bidet (ligne à son
    nom) » ; « Compté au constat : … Bidet 1 » ; message « … sur sa propre ligne … ». Un constat signé avant la v1.7.2 se réimprime avec
    « Autres : » et ses lignes vides.
  - Tests : navigateur/dossier.js cas 74 (l. 733-756) réécrit : mêmes libellés sans le mot, ni « Autres : » ni ligne vide au PDF (échoue sur
    le commit d'avant) ; croquis désactivé : pareil (S2 b ; échoue aussi) ; constat signé sans marque : « Autres : » et lignes vides gardés ;
    constat signé sans c.fige (signé avant le gel), croquis activé : à l'ouverture du croquis, constatGeler le gèle sans marque, et le PDF
    garde « Autres : » (X2) ; signé en v1.7.2 puis croquis désactivé : présentation gardée ; hauteurs des 10 lignes du cas courant : celles
    du formulaire × 218,5/183,5 (× 1,19 environ), texte en 9,5 pt [p] ; navigateur/equipements.js l. 389 et cas de la l. 76.
  - Garde : compat 245/245 (impression hors de la garde) ; aléatoire : sans écart.
  - Règle de CLAUDE.md : « ; les nouveautés du constat de la v1.7.2 y valent aussi : ni « Autres : » ni ligne laissée vide pour écrire à la
    main (réponses du 17 nov. 2026). » au bout de la règle « Croquis désactivé ou absent » (D15).
  - Risques et [p] : nom de la marque [p] ; hauteurs sans les lignes vides, mises à l'échelle (D14) [p] ; une ligne tapée « Autres : X »
    garde son texte ; tablette en v1.7.1 : « Autres : » et lignes vides, même pour un constat signé en v1.7.2 (information).
  - Dépendances : après m141 (comptesGroupe).
- **m148 Anomalie « Évier » localisée « Cuisine » : « Évier » seul** (pr12-10 ; D16 ; S2 b). Taille S.
  - Réponse : S2 (b) : croquis activé, désactivé ou absent.
  - Fichiers et fonctions : IX : ROW_KW (l. 1978-1981). LISEZMOI.txt l. 273-276. CLAUDE.md (D15). tests/navigateur/dossier.js (près des cas
    64-68).
  - Pour l'utilisateur : une anomalie saisie « Évier : siphon fuyard », localisation « Cuisine », ne touche plus que la ligne « Évier »,
    croquis activé, désactivé ou absent.
  - Tests : dossier.js : croquis activé : Évier seul (échoue sur le commit d'avant) ; croquis désactivé : Évier seul (échoue aussi) ; témoins
    « Lave-vaisselle de la cuisine » → Cuisine, « Évier et lave-vaisselle » → Évier et Cuisine, « Cuisine : … » → Cuisine.
  - Garde : compat 245/245 ; aléatoire : sans écart.
  - Règle de CLAUDE.md : « une anomalie qui nomme l'évier et la cuisine ou la salle de bain (texte ou localisation) ne compte plus sur la
    ligne de la pièce, sauf si elle nomme aussi un appareil de celle-ci (lave-vaisselle ; douche ou baignoire) » ajouté à la liste des
    nouveautés (D15).
  - Risques et [p] : une ligne Cuisine non conforme à tort redevient conforme à la réouverture d'un dossier non signé (voulu ; à dire dans
    l'annonce) ; salle de bain [p]. Dépendances : après m147 (texte de la règle de CLAUDE.md).
- **m149 Ligne « Boîte à l'intérieur ou à l'extérieur de la propriété »** (pr12-11 ; D17 ; S3 a, S2 b). Taille M.
  - Réponses : S3 (a) « Juste sous la distance, les quatre lignes du tableau un peu resserrées dans le même cadre » ; S2 (b) : croquis
    activé, désactivé ou absent. Constat signé : règle (D13).
  - Fichiers et fonctions : CJ : boitesConstat (l. 2320-2342 sur 71a4ed6 ; m140 y a ajouté traversees, et coteLimite près de texteLimite).
    IX : écran de la boîte (l. 2196-2200), « Sans objet » (l. 4323), VC_BOITE_CHAMPS (l. 3756), vcProvenance (l. 3738), reprise
    (l. 3840-3852), résumé (l. 3651), vcBoiteCle (l. 3868 ; m140 lui fait déjà ignorer « de la propriété »), vcEcarts (l. 3933-3939),
    drawConstatP2 (l. 3045-3064). LISEZMOI.txt l. 260-262. CLAUDE.md (D15). tests/navigateur/constat-boite.js, tests/vm/boite.js. Numéros de
    71a4ed6 : à retrouver par recherche.
  - Pour l'utilisateur : la distance s'écrit seule (« 0,80 m ») ; juste sous elle, une rangée « Boîte à l'intérieur ou à l'extérieur de la
    propriété », deux boutons par réseau à l'écran, deux cases « int. » et « ext. » au constat imprimé, les quatre rangées resserrées dans le
    même cadre ; croquis désactivé ou absent : la même rangée, vide d'office.
  - Tests : constat-boite.js : boîte côté intérieur à 0,80 m : distance « 0,80 m », côté « intérieur », croix dans « int. » au PDF (avant :
    « 0,80 m intérieur » ; échoue) ; « Sans objet » ; valeur retouchée gardée ; deux boîtes ; croquis désactivé : quatre rangées, côté vide
    (échoue sur le commit d'avant) ; constat signé sans marque : trois rangées. vm/boite.js : boitesConstat rend la distance et le côté à
    part ; en limite, pas de côté ; l'étiquette du plan garde « à 0,80 m de la limite, à l'intérieur de la propriété » (m140).
  - Garde : compat 245/245 ; aléatoire : sans écart (boitesConstat non comparé).
  - Règle de CLAUDE.md : « ligne « Boîte à l'intérieur ou à l'extérieur de la propriété » » ajouté à la liste des nouveautés (D15).
  - Risques et [p] : page 2 pleine (13,25 pt par rangée) ; cases petites ; valeurs sur une ligne [p] ; une distance tapée qui porte le côté
    reste telle quelle [p] ; tablette en v1.7.1 (information).
  - Dépendances : m140 (mêmes mots), m147 (présentation, règle de CLAUDE.md).
- **m150 Colonne « Puits » au constat** (puits-milieu-naturel, drain-infiltration-constat ; D18, D8 ; X1, F1, F3, F4, X9 ; S4 a, S5 a, S2 b).
  Taille M.
  - Réponses : S4 (a) « Dans la colonne « Puits », verte comme « Milieu naturel » et « Gargouille » » (son commentaire, les colonnes sans
    croix : lot suivant, souhait 9) ; S5 (a) : le libellé du drain d'infiltration ne change pas, rien dans ce correctif ; S2 (b) : croquis
    activé, désactivé ou absent. Constat signé : règle (D13).
  - Fichiers et fonctions : CJ : table, ligne PUITS (l. 794-796), RACC_LIB (l. 2217), note du panneau Constat (l. 6105-6125). IX : RACC
    (l. 1904), raccOk (l. 1957 : PUITS « non » d'office, sauf ligne venue du croquis [p : raccOk reçoit le constat]), constatEval
    (l. 2034-2038), vcProvenance (l. 3738, lue), precosAuto (l. 2012), drawConstatTable (l. 2999-3038), instRowHtml (l. 2146), vcValeurs
    (l. 3721). LISEZMOI.txt (colonnes du constat). CLAUDE.md (D15). tests/vm/rejets.js (l. 448-470, 480), tests/navigateur/rejets.js
    (l. 451), tests/navigateur/dossier.js (PDF et conformité). Numéros de 71a4ed6 : à retrouver par recherche.
  - Pour l'utilisateur : une colonne « Puits », verte, au constat imprimé, entre « Milieu naturel » et « Gargouille » : croix des rejets dans
    un puits, en EU comme en EP ; option « Puits » à l'écran ; panneau « Puits » ; une ligne mise à la main sur « Puits » est non conforme ;
    croquis activé, désactivé ou absent.
  - Tests : vm/rejets.js q1 (l. 448-470 : PUITS et « Puits » au lieu de MILIEU ; échoue sur le commit d'avant) et contrôle de la table
    (l. 480) ; navigateur/rejets.js l. 451 ; PDF : en-tête « Puits » vers x 445,2 et la croix dessous, une ligne MILIEU vers x 413,3 ;
    navigateur/dossier.js : ligne « Gouttière(s) » EP mise à la main sur « Puits », sans anomalie : « non », croquis activé puis désactivé
    (X1, F1) ; ligne venue du croquis, anomalie ep-puits écartée dans les Contrôles : « oui », retenue : « non » ; suivi : MILIEU posé par le
    croquis → PUITS, valeur retouchée gardée avec le message ; croquis désactivé : quatre colonnes et option « Puits » (échoue sur le commit
    d'avant) ; constat signé sans marque : trois colonnes.
  - Garde : compat 245/245 (aucun puits) ; aléatoire contre le commit d'avant : écarts attendus, code MILIEU → PUITS des lignes vers un puits
    dans le constat déduit, rien d'autre ; chacun vérifié.
  - Règle de CLAUDE.md : « colonne « Puits » » ajouté à la liste des nouveautés (D15) : le texte proposé y est alors entier.
  - Risques et [p] : en-têtes serrés (31,9 pt), à voir sur un PDF imprimé ; raccOk qui reçoit le constat [p] ; conformité fixée à la main
    gardée [p] ; tablette en v1.7.1 : une ligne « Puits » y est non conforme d'office, sans suppMilieu, jusqu'au suivi (X9 ; information).
  - Dépendances : m147 (présentation, règle de CLAUDE.md).
- **m151 « Puits » venu d'un fichier** (puits-venu-fichier ; D19 ; F6). Taille S.
  - Réponses : noms proches (S6 b) et « Fosse » (S7 a) sont codés par m144 ; il ne reste que D19.
  - Fichiers et fonctions : CJ : nomPuits [p] (rend 'puits', 'perdu' ou '' ; partagé par champDest, l. 856-857, et l'analyse, l. 1149-1153),
    contrôles de la destination (l. 1019-1020), fiche de la destination. LISEZMOI.txt (destinations). tests/vm/regles.js, tests/vm/rejets.js.
    Numéros de 71a4ed6 : à retrouver par recherche.
  - Pour l'utilisateur : une « Autre destination » « Puits » venue d'un fichier est jugée comme un puits, non conforme, avec le message « À
    vérifier » ; « Puits perdu » garde le jugement de sa fiche, avec son rappel (D19).
  - Tests : vm/regles.js l. 110-113 (« Puits » : règle du puits ; échouent sur le commit d'avant) ; « Puit », « Ancien puits » (puits),
    « Puits perdu » (jugement de sa fiche, rappel), « Puisard » (témoin : jugement de la fiche) ; le refus de la fiche et le jugement par la
    même fonction.
  - Garde : compat 245/245 ; aléatoire : sans écart.
  - Risques et [p] : rappel du « Puits perdu » [p] ; objet laissé tel quel [p]. Dépendances : m144 (même champ de saisie).
- **m152 Symbole du puits du cadastre** (symbole-puits ; D20). Taille S.
  - Réponse : S8 (a) « En Z : vers le haut à gauche, vers le bas à droite » ; l'axe y des primitives monte (vérifié, D20) : la manivelle de
    gauche monte.
  - Fichiers et fonctions : CJ : primitives, cas 'puits' (l. 2542-2544), rayonSymbole (l. 2506 : 2,1 gardé, D20), légende, bloc DXF.
    tests/vm/rejets.js q2 (l. 482-497).
  - Pour l'utilisateur : le puits a le dessin du cadastre (cercle, barre, manivelles), partout.
  - Tests : vm/rejets.js q2 réécrit : un cercle de 1,4 et une ligne de quatre points (v1.7.1 : deux cercles ; échoue) ; DXF : bloc VEDE_PUITS
    avec un CIRCLE et une POLYLINE de 4 VERTEX.
  - Garde : compat 245/245 ; aléatoire : sans écart (le symbole n'est pas comparé).
  - Risques et [p] : lisibilité au petit zoom [p] ; forme [p] ; bouts des manivelles à 2,25 du centre, 0,15 au-delà de rayonSymbole : repli,
    une barre à ±1,94 (D20) [p]. Dépendances : aucune.
- **m153 Présélection des voisins d'une étiquette commune** (e4 ; D21). Taille S.
  - Réponse : S9 (a) « Oui, seulement si le porteur de l'étiquette n'a pas de niveau non plus ».
  - Fichiers et fonctions : CJ : voisinsEtiquette et refusEtiq (près de groupeEtiquette, l. 2386-2415 ; export), refusReunir (l. 5518-5527),
    entrerReunir (l. 5507-5512, toast), etiqReunir (l. 6364). LISEZMOI.txt l. 249-258. tests/vm/equipements.js, tests/navigateur/equipements.js.
  - Pour l'utilisateur : « Étiquette commune… » arrive avec les voisins déjà choisis et le toast de D21 ; un toucher en retire un.
  - Tests : vm/equipements.js, porteur WC en (0 ; 0) au RDC : lavabo à 2 m et douche en (2 ; 2) choisis ; évier à 4 m, baignoire au 1er
    étage, lave-linge en projet, descente EP, second WC déjà réuni : non ; ordre lavabo, douche (la v1.7.1 n'a pas la fonction) ; un appareil
    sans niveau n'est choisi que si le porteur n'a pas de niveau non plus (S9 a). navigateur/equipements.js : bandeau « 2 choisis » (v1.7.1 :
    « 0 choisi ») ; toucher le lavabo : « 1 choisi » ; « Terminé » : WC et douche seulement.
  - Garde : compat 245/245 ; aléatoire : sans effet.
  - Risques et [p] : un voisin derrière une cloison est choisi d'office (l'opérateur doit le voir et le retirer) ; textes [p].
  - Dépendances : après m141 (même tri des membres).
- **m154 Disque de rotation** (remarque-libre ; D22 ; S10 b). Taille L.
  - Réponse : S10 (b) « Aussi les symboles qui ne sont pas ronds : regard, boîte, grille, fosse, té, siphon, puits… » ; commentaire : « La
    rotation doit se faire degré par degré et proposer un accrochage pour que l'objet soit orienté parallèlement ou perpendiculairement à un
    linéaire proche ».
  - Fichiers et fonctions : CJ : gestes (S.geste, l. 3808-3872 : geste 'tourner' [p]), cibleGlisser (l. 4068-4083), terminerGlisser
    (l. 4266), dessin de la sélection [p : vers l. 2849-2900] ; drapeau pivot de def() (l. 960-995) ; DXF (l. 7447-7448 : e.p.a s'il est
    donné, sinon rotDeg) ; puces de la fiche (l. 5970 : ty.oriente || ty.pivot) ; accrochage aux linéaires proches (segsCibles et pièces des
    tronçons et collecteurs proches [p : fonction], tuyaux raccordés compris). LISEZMOI.txt l. 290-298 [p]. tests/navigateur/gestes.js,
    tests/vm/dessin.js. Numéros de 71a4ed6 : à retrouver par recherche.
  - Pour l'utilisateur : un anneau et sa poignée autour de l'objet choisi, qu'on glisse pour le faire tourner degré par degré ; aimant actif,
    l'objet se cale parallèle ou perpendiculaire au tuyau (le sien compris), au côté du bâti, à la limite ou au trait proche ; caniveau,
    clapet, gargouille et les symboles qui ne sont pas ronds (regard, boîte, grille, fosse, té, siphon, puits… [p : liste]) ; les puces de
    15° de la fiche valent aussi pour eux [p] ; le DXF suit l'angle donné ; un objet jamais tourné ne change pas.
  - Tests : navigateur/gestes.js : un caniveau, poignée glissée d'un quart de tour : angle 90 (avant : pas de poignée ; échoue) ; aimant
    coupé, un glissé de 37° donne 37 ; une annulation rend l'angle ; aimant actif, un regard près d'un côté du bâti orienté à 30°, lâché à
    32° : 30 [p] ; à 45° de toute direction proche : pas d'accrochage ; vm/dessin.js : un regard tourné donne un INSERT DXF à cet angle
    (avant : rotDeg, 0 sans rotation ; échoue) ; témoin : R1 sans angle sur un plan tourné de −0,6° : INSERT à rotDeg, comme avant ; fiche
    d'un regard : puces de 15° (avant : aucune ; échoue) ; aimant actif, un regard raccordé à un tronçon à 30°, lâché à 33° : 30 [p] ; plan
    tourné : l'écran, le plan PDF et le DXF concordent pour un regard tourné au disque ; un écart pour un objet jamais tourné serait
    antérieur : le signaler, sans changer son DXF (D22) [p].
  - Garde : compat 245/245 (un objet sans angle garde rotDeg au DXF ; une empreinte qui bouge est un défaut) ; aléatoire : sans effet.
  - Risques et [p] : conflit entre la poignée et le glisser de l'objet au petit zoom ; liste des symboles non ronds [p] ; seuil de 5° et
    linéaires retenus pour l'accrochage [p] ; tablette en v1.7.1 : écran et PDF tournés, DXF non (information). À scinder si la relecture le
    demande : m154 (disque, objets, DXF) et m156 (accrochage).
  - Dépendances : aucune.

### Ajouté le 17 nov. (fil)
- **m155 Prolongement toujours d'abord** (fil du 17 nov. ; D2). Taille S. Fait : 9b7e772, 17 nov.
  - Fichiers et fonctions : CJ : contrat de PROL_MAX (l. 348-350) ; prolSegs (l. 364, même API) et prolCands (nouvelle, l. 367 : les
    candidats avant le choix) ; accrochesNouvelles (l. 3803 ; étape du prolongement l. 3810 : candidats de 30 m au plus sur cibles() et ceux
    de prolLoin, départagés par plusProche) ; prolLoin (l. 3828 : rend des candidats, sans garde) ; appels de prolLoin retirés dans
    accrocheLibre (l. 3856), au point saisi d'un tronçon (l. 3909) et au sommet glissé (l. 4318). LISEZMOI.txt l. 316-319 ;
    croquis/LISEZMOI.txt l. 28 ; tests/navigateur/accroches.js (cas pl, glisserSommet), tests/LISEZMOI.md.
  - Pour l'utilisateur : le prolongement d'un côté passe avant le redressement « Parallèle au bâti » et l'accroche à la façade, à toute
    distance, comme en v1.7.0 ; entre deux prolongements, celui dont la droite passe le plus près du point ; l'aide le dit (LISEZMOI :
    « Ordre des aides : coin, intersection, milieu, perpendiculaire, prolongement (à toute distance d'un bout), puis parallèle au bâti et
    angles, puis façade ou côté d'une limite. »).
  - Mesures (fond fictif « ville » de m138, 3 200 lignes, limites cochées ; gestionnaire pointermove, processeur ralenti 4 fois) : façade /
    prolongement pour 100 points touchés à 4 px d'une façade : 22/78 à 10 px/m (71 prolongements de plus de 30 m), 77/23 à 20 px/m, 94/6 à
    40 px/m (58c2ddd : 84/16, 95/5, 95/5 ; attendu [p] : 16/84) ; le point finit jusqu'à 13 px de la façade, le bout du côté prolongé souvent
    hors de l'écran ; points redressés pris par un prolongement, sur 60 : 52, 36, 14 (58c2ddd : 30, 17, 12). Coût : de 5 à 40 px/m, médiane
    de 2,3 à 3,3 ms (+0,8 à +1,7 ms), 95e centile de 4,1 à 7,6 ms (58c2ddd : 2,3 à 4,3 ms) ; zoom large : moins cher que 58c2ddd (médianes de
    5,3 à 7,7 ms contre 7,6 à 13 ms) ; 95e centile sous 16 ms, sauf une passe à 18,8 ms non reproduite (12,6 ms). Scripts et sorties :
    dossier m155 du scratchpad.
  - Tests : navigateur/accroches.js (221) : pl : f9 et r9 renversés, d1 (deux prolongements, 50 m contre 20 m) et g1 à g3 (sommet glissé :
    trait, tronçon, tronçon parti d'un regard qui porte un collecteur proche) échouent sur 58c2ddd (pl 28/32) ; témoins l9, t9, d2, g4 :
    passent sur les deux. Garde : compat 245/245 ; aléatoire 8000 contre 58c2ddd : sans écart (10 666 analyses ; le générateur ne passe pas
    par les accroches).
  - Relecture : ni défaut bloquant ni défaut majeur ; trois remarques : M1 (sous 0,083 px/m, la règle du côté aligné ne voit, pour prolLoin,
    que les côtés à 120 m au plus : un trait touché près d'un côté aligné à plus de 120 m va sur le prolongement de son voisin, 58c2ddd sur
    la façade ; reproduit à 0,05 px/m ; gardé, dit en [p] dans les commentaires) ; M2 (phrase d'ordre du LISEZMOI) ; M3 (chiffres de
    l'annonce, recalculés).
  - Risques et [p] : sur un fond dense, un point libre près d'une façade se cale le plus souvent sur un prolongement (effet du choix, dit à
    l'utilisateur) ; au zoom très large (sous 0,156 px/m environ), un candidat de 30 m au plus que seul prolLoin voit passe aussi avant le
    redressement et la façade [p] ; réunion des candidats exacte par raisonnement sur plusProche, vérifiée par les témoins et un différentiel
    de 6 600 points [p] ; test du glissé : repère lu deux images avant le lever du doigt [p].
  - Dépendances : m138.

### Attendront la fusion suivante
- Les souhaits restants de la v1.7.0 et le constat délesté (fil du 17 nov. : lot suivant, en premier) : section suivante.
- Plus rien pour l'escalier (S11 a), les textes libres tournés par le disque (S10 : b, pas c) ni une clé des exutoires qui sépare « Fosse »
  et « Fossé » (S7 : a, pas c).
- Ce lot compte 19 numéros (m137 à m155) ; m156 reste en réserve, pour un premier correctif scindé (m144 ou m154). S'il en faut plus (second
  correctif scindé, relecture plus longue) : le demander à l'utilisateur ; ne pas repousser d'office m146 ni m154, que la réponse du fil
  garde dans la v1.7.2 (« La v1.7.2 garde ses correctifs et se fusionne plus tôt »).

## Souhaits restants (après la v1.7.2)
Résumé d'EC : ce que les réponses du cadrage (16 nov.) et celles du groupe « Suivi » (17 nov. : S12 à S16) changent aux recommandations du
cadrage (CA = .claude/cadrage-v170.md, numéros de ligne). Lot suivant, après la fusion de la v1.7.2 : d'abord le constat délesté (fil du 17
nov. : « Lot suivant, en premier »), puis [p] 14 ; 5 puis 6 (lot avant-projet) ; 1 ; 13. Environ 15 à 17 correctifs [p] (délesté : 3 ou 4 ;
14 : 1 ou 2 ; 5 : 1 ; 6 : 4 ; 1 : 3 ; 13 : 3 environ).
- **9, constat délesté** (CA:299-316 ; L, 3 ou 4 correctifs conçus ensemble ; premier du lot, fil du 17 nov.). Les commentaires de S1 (« le
  rapport final doit être délesté de toutes les informations non nécessaires et tous les éléments non utilisés ») et de S4 (« Penser à
  supprimer les colonnes inutiles pour que n'apparaissent que les colonnes ayant été cochées ») étendent le souhait 9 : pas de ligne vide
  (fait par m147), pas de ligne d'appareil absent, pas de colonne sans croix, pas d'information inutile [p : liste à dresser à sa
  conception]. cadrage-validation-departement (« constat abrégé admis ») règle CA:278, point 6, et le premier risque de CA:303 ; la version
  courte de repli (CA:301, 307) devient inutile. Délesté par défaut [p] : le complet par défaut de CA:305-307 est à revoir avec ces
  commentaires ; l'option par étude et le gel à la signature restent. Il suit les nouveautés du constat de la v1.7.2 (lignes sans
  « Autres : », colonne « Puits », ligne de la boîte, libellés de la boîte en limite) : la rangée du côté de la boîte vide et la colonne
  « Puits » vide sont candidates au délestage [p]. Une seule marque de gel : c.fige.mise (CA:301) et c.fige.mep (D13) n'en font qu'une [p].
  Les mentions « Formulaire du Département » (IX:1526) et « Formulaire « Contrôle de Branchement Particulier » du Département » (IX:2163)
  sont à reformuler [p]. Croquis désactivé ou absent : défaut complet (cadrage-sans-croquis : « valeurs par défaut identiques à la v1.5.1 »)
  ou délesté (commentaire de S1, S2 b) : à demander à sa conception.
- **14, plan centré à l'ouverture** (CA:344-361 ; S ou M, 1 ou 2 correctifs ; S12 a). cadrage-14-4 confirme la source, la parcelle du tableau
  Excel, déjà importée (CA:346), et la parcelle d'abord (CA:356). S12 (17 nov.) : « « parcelle », au moins une fois » : sur les plans de
  l'utilisateur, le numéro cherché est reconnu comme numéro de parcelle ; son calque l'est donc déjà (CJ:708 : PARCELLETEX ou voisin).
  Reconnaître un calque du genre PARCELLENUM et le sortir des limites et des contours (CJ:244) n'est plus nécessaire [p]. Restent : centrer
  le plan sur le numéro de la parcelle du tableau, garder la ligne « Textes reconnus » (CA:346) ; le repli sur l'adresse (CA:359-361) reste
  incertain : il peut attendre ce que montreront les fonds réels. Il ne touche ni l'analyse, ni le constat, ni le PDF.
- **5, avant-projet sans les « à supprimer »** (CA:238-252 ; M, 1 correctif). Aucune réponse ne le touche : restent la bulle seule
  (CA:244), l'écran non masqué (CA:247), pas d'ancien plan barré (CA:250). Depuis le cadrage : le défaut de CA:236 est corrigé (m95) ; les
  tests de CA:240 se numérotent à partir de p7 ; les objets venus depuis (drains, destinations, puits, autres appareils, WC + lave-mains,
  étiquette commune) doivent suivre montrer() [p] ; m136 touche le même PDF : les tester ensemble [p].
- **6, « à supprimer » sur une partie d'un tronçon** (CA:254-274 ; L, 4 correctifs ; après 5). Aucune réponse ne le touche (CA:260-274
  retenus). Depuis le cadrage : un drain coupé garde p.drain et sa couleur sur ses deux parties [p] ; l'escalier, jamais un réseau, ne se
  coupe pas [p], comme collecteurs et limites (CA:256). Le reste « tuyau tracé en deux traits » : question à poser à sa conception.
- **1, photo de la façade** (CA:280-297 ; M, 3 correctifs ; S13 c ; après le délesté [p]). S13 (17 nov.) : « Oui, sur le constat complet
  comme sur l'abrégé » : la photo va aussi au constat, complet ou abrégé, en plus de la fiche Préco et du plan PDF (choix du 7 nov.) ; sa
  place sur le constat se conçoit avec le délesté [p]. La raison de CA:288 (« le formulaire du Département reste tel quel ») tombe avec « une
  production de ma société ». Croquis désactivé : la photo vaut aussi (cadrage-sans-croquis) ; sans photo, les sorties restent celles de la
  v1.5.1 ; la règle « Croquis désactivé ou absent » de CLAUDE.md change avec ce lot (photo au constat). Constat signé : la photo suit la
  présentation notée à la signature (D13) ; un constat signé avant ce lot se réimprime sans photo [p]. Restent : une seule photo (CA:289),
  celle du dossier d'abord (CA:292), facultative (CA:295).
- **13, réglage par anomalie standard** (CA:278, 318-338 ; M, 3 correctifs environ [p] ; S14 b, S15 a, S16 b). S14 (17 nov.) : « Un réglage
  par anomalie dans les Réglages : non-conformité, réserve ou à arbitrer, jamais « pas d'anomalie » » : le barème du 7 nov. sans le choix qui
  rend une anomalie conforme (note de b), ce qui donne le sens du « permissif » refusé par cadrage-validation-departement ; « Pas
  d'anomalie » (CA:324-326) n'est pas construit. (c), où un rejet trouvé par le croquis reste toujours non conforme, n'est pas choisi : ces
  rejets se règlent aussi [p], sauf ceux qui restent verrouillés (ci-dessous). cadrage-13-reserve : cinq réserves par défaut, les candidates
  de CA:320 sauf « Descente EP (abri) apporte de l'humidité » ; CA:320 (« défaut identique à la v1.6.3 ») ne vaut plus pour elles. S15 (a) :
  « Oui, partout : une anomalie type a la même nature dans tous les dossiers » : croquis désactivé ou absent compris ; cela déroge à la
  v1.5.1, et la règle « Croquis désactivé ou absent » de CLAUDE.md change avec ce lot. S16 (b) : « Non : réserve en EP, non-conformité en
  EU » : « obstrué ou encombré » et « racines » sont par défaut une réserve sur un ouvrage EP, une non-conformité sur tout autre ouvrage (EU,
  unitaire, réseau inconnu), comme le tampon béton (CJ:1782-1786, vérifié) ; le réglage a deux lignes pour chacune, EP et autres réseaux
  (note de S16 b : « Le réglage, s'il existe, aura une ligne par réseau pour ces deux anomalies. »). La nature est écrite sur l'anomalie au
  choix, jamais recalculée (CA:328-329). Restent verrouillés : descente non visitable, tampon béton, by-pass, fosse douteuse (CA:330-332),
  rejet des EP dans un puits.

## Questions du groupe « Suivi » (S1 à S16) : réponses du 17 nov.
Réponses mot pour mot : section « Réponses de l'utilisateur ». Ce que chacune change (« appliqué » : le choix codé avant la réponse, quand il
en diffère) :
- S1 suivi-e1-portee (Lignes sans « Autres : ») : d (appliqué : c) ; aucune ligne n'a plus « Autres : », et les lignes vides du bas de chaque
  groupe ne sont plus imprimées (commentaire). D14, m147.
- S2 suivi-sans-croquis (Nouveautés du constat, croquis désactivé) : b (appliqué : a) ; les nouveautés du constat valent aussi croquis
  désactivé ou absent ; déroge à la v1.5.1 : m147 à m150 complètent la règle de CLAUDE.md. D15.
- S3 suivi-boite-cote-place (Place de la ligne « intérieur ou extérieur ») : a, comme appliqué ; m149.
- S4 suivi-puits-colonne (Colonne « Puits » du constat) : a, comme appliqué ; le commentaire (colonnes sans croix) va au constat délesté, au
  lot suivant. m150.
- S5 suivi-drain-libelle (Appareil relié à un drain d'infiltration) : a, comme appliqué ; rien ne change. m142.
- S6 suivi-noms-proches (Noms de destination proches) : b (appliqué : a) ; la question « la même ou une autre ? » (Q). D10, m144.
- S7 suivi-fosse (Destination nommée « Fosse ») : a (appliqué : b) ; message M5. D10, m144.
- S8 suivi-symbole-puits (Manivelles du symbole du puits) : a, comme appliqué ; manivelles en Z. m152.
- S9 suivi-e4-niveau (Présélection d'une étiquette commune) : a, comme appliqué ; m153.
- S10 suivi-disque-objets (Objets que le disque fait pivoter) : b (appliqué : a) ; aussi les symboles non ronds ; le commentaire demande la
  rotation degré par degré et un accrochage aux linéaires proches : m154 devient gros (L). D22.
- S11 suivi-escalier-ancienne-version (Escalier ouvert sur une ancienne version) : a, comme appliqué ; commentaire : les tablettes seront
  toujours à jour (Règles communes). m139 ; rien pour la suite.
- S12 parcelle-essai-dxf (Numéro de parcelle sur vos plans DXF) : a (appliqué : b) ; le calque est déjà reconnu. Souhait 14.
- S13 facade-constat (Photo de la façade sur le constat) : c (appliqué : a) ; la photo va aussi au constat, complet ou abrégé. Souhait 1.
- S14 bareme-permissif (Sens de « barème permissif ») : b (appliqué : a) ; un réglage par anomalie, jamais « pas d'anomalie ». Souhait 13.
- S15 reserves-sans-croquis (Les trois anomalies types en réserve, croquis désactivé) : a (appliqué : b) ; même nature dans tous les
  dossiers, croquis désactivé compris ; déroge à la v1.5.1. Souhait 13.
- S16 reserves-eu (« Obstrué ou encombré » et « racines » sur un ouvrage EU) : b (appliqué : a) ; réserve en EP, non-conformité en EU.
  Souhait 13.
- remarque-libre-suivi : sans réponse.
- Retirée : suivi-constat-signe (F7 : règle de CLAUDE.md, D13).
- Question nouvelle, née de m140, à poser à l'utilisateur telle quelle : « En zone unitaire, une boîte sans réseau indiqué dans sa fiche, où
  arrive un tuyau tracé à l'outil « Tronçon EU », « Tronçon EP » ou « Drain », porte l'étiquette « Boîte de branchement », sans réseau ; sa
  distance et sa profondeur ne vont pas au constat ; on indique son réseau dans sa fiche. a) Garder ainsi. b) La compter, comme une boîte
  unitaire, pour le réseau des appareils dont les eaux y passent. » Aujourd'hui : (a), comme en v1.7.1 (D6, m140).
- Présomptions gardées sans question, à signaler dans l'annonce : intersection à 30 m et borne par la diagonale de l'écran (D2) ; borne de
  256 côtés et passage unique du prolongement, qui passe d'abord à toute distance (D2, m155) ; « Puits perdu » jugé d'après sa fiche, avec un
  rappel (D19) ; lecture de « Deux points » (D12) ; ordre de l'étiquette au-delà de l'exemple, et le porteur qui perd la tête de la liste
  (D7) ; puces « Intérieur » et « Extérieur » gardées dans la fiche et au panneau des cotes (D5) ; p.res ignoré et puces « Réseau » masquées
  pour le drain d'infiltration, « tenir compte du réseau » lu comme « des eaux reçues » (D8) ; ligne venue du croquis sur « Puits » qui suit
  son anomalie, et conformité fixée à la main gardée (D18) ; boîte unitaire jugée sur les plus courts chemins de l'analyse jusqu'aux
  exutoires dessinés (D6, m140) ; « Bidet (ligne à son nom) » et cases « int. », « ext. » (D14, D17) ; hauteurs des lignes du constat sans
  les lignes vides : celles du formulaire, mises à l'échelle pour remplir le tableau, texte inchangé (D14) ; lignes vides retirées aussi sans
  croquis (D14, D15) ; ce que fait « La même » selon l'endroit, et M5 pour « Fosse » sans accent (D10) ; accrochage du disque à 5° près,
  linéaires retenus, tuyaux raccordés compris (D22) ; puces de 15° de la fiche étendues aux symboles non ronds, à côté du disque qui tourne
  au degré (D22) ; bouts des manivelles du puits à 2,25 du centre (D20) ; plan PDF et DXF selon la version qui imprime, dossier signé compris
  (Règles communes).
