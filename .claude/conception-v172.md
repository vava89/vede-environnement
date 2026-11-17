# Conception de la v1.7.2 (réponses du 16 nov. 2026)

Statut : conception relue par deux relecteurs dans la nuit du 16 au 17 nov. 2026 (RX : exactitude technique ; RF : fidélité et clarté) ;
défauts appliqués : X1, X2, X3, X5, X6, X7, X8, X9, X10, F1, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15 ; écartés : X4 et
F2, réfutés par la réponse « D'accord » du 16 nov. à regard-suit-exutoire (un regard vers une infiltration est jugé EP, en réserve,
« même si un WC y est relié » ; « un regard sur un drain d'infiltration est jugé en EP ») : voir D8.

- Fiabilité 80 % - Établie le 17 nov. 2026 sur 71a4ed6 (v1.7.1 fusionnée, numéro 1.7.2), sur le modèle de `.claude/conception-equipements.md`.
  Lignes citées : code actuel (CJ = croquis/croquis.js, 7 647 lignes ; IX = index.html, 5 071 lignes, numéros du fichier).
- Études du workflow, citées par section : EA = `scratchpad/v172/conception/etude-a.md` (constat, rejets, boîte) ; EB = `…/etude-b.md`
  (dessin, étiquettes, destinations) ; EC = `…/etude-c.md` (souhaits restants). Relectures : RX = `…/relecture-x.md` (X1 à X10) et
  RF = `…/relecture-f.md` (F1 à F15). [p] = présomption à signaler à l'utilisateur ; « vérifié » = relu par moi dans le code le 17 nov.
- Souhaits restants de la v1.7.0 (1, 5, 6, 9, 13, 14) et réponses du cadrage (cadrage-14-4, cadrage-validation-departement,
  cadrage-13-reserve, cadrage-sans-croquis) : EC, résumée à la section « Souhaits restants (après la v1.7.2) » ; lot à part, après la
  v1.7.2 [p]. fusion-ab est faite (m136, PR #13).
- Compte : 0/20 correctifs depuis la fusion de la v1.7.1. Ce lot : 18 numéros (m137 à m154) ; m155 et m156 restent pour les relectures.
- Questions du groupe « Suivi » : `suivi.json`, 16 questions, étiquetées S1 à S16 dans l'ordre de lecture (d'abord celles qui bloquent un
  correctif proche). Il réunit `suivi-v172.json` et `suivi-c.json` corrigés : suivi-constat-signe est retirée (F7 : la règle est dans
  CLAUDE.md, D13) ; suivi-noms-proches est ajoutée (F9, D10). Liste à la fin.

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
- Ce qui reste ouvert (S1, suivi-e1-portee) : « jamais » vise-t-il aussi les lignes que le croquis crée pour d'autres objets que le
  formulaire n'a pas (« Autres : Drain » de Q4 b ; chaudière, attente, siphon de cour, trop-plein) et les lignes tapées à la main ? Le
  6 nov. dit « en ajoutant une ligne » : toute ligne ajoutée. À la lettre, « jamais » vise aussi la ligne vide imprimée en bas de chaque
  groupe, pour écrire à la main (S1 d) ; la lecture appliquée et recommandée (S1 c) est plus étroite : cette ligne n'est pas une ligne
  ajoutée (F10) [p].

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
  présentation des valeurs de la boîte (PR #12, point 11, « Le garder ») ; suggestion « Lavabo » retirée (E2). Toute autre nouveauté du
  constat qui jouerait sans croquis attend S2 (suivi-sans-croquis, D15).
  - La règle de CLAUDE.md (« Croquis désactivé ou absent : comportement de la v1.5.1, sauf une anomalie saisie à la main qui nomme un
    lavabo… ») ne cite pas les deux dernières exceptions : un relecteur qui l'applique y verrait une faute (F15). m137 la met à jour ;
    texte proposé [p] : « Croquis désactivé ou absent : comportement de la v1.5.1, sauf une anomalie saisie à la main qui nomme un lavabo :
    ligne « Évier », comme sur le croquis (décision du 7 nov. 2026) ; la suggestion « Lavabo » est retirée partout, et les valeurs de la
    boîte gardent au constat la présentation de la v1.7.0 (16 nov. 2026). » À revoir si S2 donne (b) ou (c) [p].
- Constat signé : lignes, boîte, croix (`c.fige.conf`) et conclusion ne changent plus (IX:2087-2095, vérifié). Le constat imprimé est
  redessiné à chaque impression [p, comme m115]. Règle de CLAUDE.md : « Le PDF est le livrable. Un constat signé n'est jamais modifié. »
  Une présentation nouvelle (E1, colonne « Puits », ligne de la boîte) ne touche donc pas un constat signé avant la v1.7.2 : la signature
  note la présentation (D13 ; question retirée, F7).
- Plan PDF et DXF : ils suivent la version qui imprime (étiquettes, symboles, couleurs), comme en v1.7.0 et v1.7.1, dossier signé compris [p].
- Tablettes plus anciennes : chaque carte dit ce que montre une tablette en v1.7.1 (et plus ancienne au besoin). Un champ absent donne le
  comportement de la v1.7.1 ; doc.v reste 1.
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

### D4 Escalier jamais lu comme un réseau (escalier-rendu ; EB § 8)
- Constat de l'étude (sonde-escalier.js, croquis fictif) : la v1.7.0 et la v1.7.1 ne lisent jamais l'escalier comme un réseau (resLigne
  'LIM', hors de l'analyse, légende « Escalier », calque VEDE-ESCALIERS). Une tablette en v1.6.3 ou plus ancienne le trace en « Réseau non
  déterminé » à l'écran, au DXF et dans la légende, sans le compter dans son analyse ; sa fiche y est celle d'un tronçon.
- On ne choisit que le format qu'écrit la v1.7.2. Aucun des quatre formats essayés n'est à la fois montré sans réseau par la v1.6.3 et lu
  comme un escalier par la v1.7.0 et la v1.7.1 (EB § 8.3, formats A à D).
- Appliqué en attendant S11 (suivi-escalier-ancienne-version), et vrai pour la v1.7.2 quelle que soit la réponse : (a), format actuel gardé ;
  consigne de mise à jour du LISEZMOI (l. 366-372, vérifiée) : ajouter « dessiner un escalier » et la phrase [p] « Une tablette en v1.6.3, ou
  plus ancienne, dessine un escalier comme un tronçon « Réseau non déterminé » (sans le compter dans le constat) ; ne l'y modifiez pas. » ;
  tests de garde. (b) ou (c) : gros travail (L), pour la fusion suivante, et la phrase serait revue.
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
- Appliqué en attendant S5 (suivi-drain-libelle) : (a), rien, qui garde le libellé refusé en EU ; aucune option recommandée (F4). Un test
  fixe les libellés actuels (m142). (b), (c) ou (d) : dans m150 (même table) ; (d) lirait an.eauxDrains.
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
- Nom proche : S6 (suivi-noms-proches, question ajoutée, F9). Faux refus connu : « Fossé de la rue » face à « Fossé de la route » (noms.js :
  proche). Appliqué en attendant : (a), refusé comme un même nom (M2 ci-dessous), ce que code m144 ; recommandé : (b), le signaler et
  demander si c'est la même destination (« la même » la reprend, « une autre » garde le nouveau nom) [p : textes et boutons] ; (c) : ne
  refuser que le même nom, sans tolérer de faute, contre « ne pas manquer un nom identique qui aurait été mal orthographié ». (b) ou (c) :
  dans m151.
- Listes comparées : modèles de la tablette ; dans le croquis, destinations posées sur le plan ouvert ; objets fixes de la palette [p]
  (Puisard, Infiltration au sol, Gargouille, Rejet en milieu naturel, Fosse septique, Autre destination). Jamais au chargement, à la
  restauration, à l'import, ni d'une tablette à l'autre.
- Messages, mot pour mot [p] (toast de 4 s) :
  - M1 « Une destination « Étang » existe déjà : choisissez-la dans la palette. »
  - M2 « Nom proche de « Étang », qui existe déjà : choisissez « Étang » dans la palette, ou un nom bien différent. »
  - M3 (posée sur ce plan, absente de la palette ; même nom exact, même abréviation et mêmes jugements : acceptée) « Une destination « Étang »
    est déjà posée sur ce plan : reprenez ce nom et ses jugements, ou choisissez un nom bien différent. »
  - M4 « « Puisard » est un objet de la palette : posez l'objet Puisard. » ; « Nom proche de « Puisard », objet de la palette : posez
    l'objet Puisard, ou choisissez un nom bien différent. »
  - Fiche, nom changé (le texte exact d'une autre destination reste accepté, pour réunir deux destinations) : « Une destination « Étang »
    existe déjà : écrivez « Étang » pour la même, ou un nom bien différent. » ; « Nom proche de « Étang », qui existe déjà : écrivez
    « Étang » pour la même, ou un nom bien différent. »
  - Réglages, modèle renommé : « Une destination « Étang » existe déjà dans la liste. » ; « Nom proche de « Étang », déjà dans la liste :
    choisissez un nom bien différent. »
- « Fosse » et « Fossé » ont la même forme (« fose »). Vérifié : nomCle (CJ:838) ôte déjà les accents, donc cleDest (CJ:839) confond déjà
  une « Fosse » et un « Fossé » de mêmes jugements. Appliqué en attendant S7 (suivi-fosse) : (b), « Fosse » vaut « Fossé » (refusé
  seulement si un « Fossé » existe) ; recommandé : (a), message M5 (m151) « Pour une fosse septique, posez l'objet Fosse septique ; pour un
  fossé, écrivez « Fossé ». »
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
- E1, la colonne « Puits » et la ligne de la boîte changeraient donc la réimpression d'un constat signé avant la v1.7.2. Une seule
  « présentation » décide des trois nouveautés :
  - La signature note c.fige.mep [p : nom et valeur] : 2 = présentation de la v1.7.2 ; absente = celle de la v1.7.1 (« Autres : », trois
    colonnes, trois rangées, côté collé à la distance).
  - Où la poser (X2, vérifié) : dans le geste de signature (c-lock, IX:4346), juste après `c.fige = constatFigeCalc(v)`, jamais dans
    constatFigeCalc ni dans constatGeler. constatGeler (IX:2097-2102) fait lui aussi `c.fige = constatFigeCalc(v)` pour un constat signé
    sans c.fige (signé en v1.3.0, avant le gel), et il est appelé à l'ouverture du croquis (vcOuvrir, IX:3432) : une marque posée par
    constatFigeCalc donnerait à ce constat la présentation du jour.
  - Constat non signé : présentation 2 croquis activé ; croquis désactivé, celle de la v1.7.1 tant que S2 est en (a).
  - À la signature, c'est la présentation du moment qui est notée (croquis désactivé et S2 en (a) : celle de la v1.7.1), pour qu'un
    constat signé se réimprime à l'identique même si le croquis est activé ensuite [p].
  - Déverrouiller (« Modifier le constat signé ? », IX:4349) puis signer de nouveau note la présentation du jour.
- Tablette en v1.7.1 : imprime toujours à sa façon, même un constat signé en v1.7.2 (« Autres : », trois colonnes) : à dire dans
  l'annonce ; une signature faite chez elle n'a pas de marque (présentation d'avant).
- Compat et différentiel : sans effet (impression hors de la garde).

### D14 Ligne d'un « Autre appareil » et « Autres : » (e1 ; EA § 5)
- Retenu : la ligne au nom de l'équipement est créée d'office (déjà le cas) ; le mot « Autres : » n'est plus écrit ; une ligne du formulaire
  n'est prise que si l'opérateur la choisit dans la fiche (« Compté au constat ») [p]. Sans nom : ligne « Autre appareil » et contrôle qui
  demande le nom, comme aujourd'hui. Deux « Bidet » de même nature : une ligne, nb 2.
- Où « Autres : » s'écrit (vérifié) : PDF page 1, IX:3023 (`pr.autres ? 'Autres : ' + r.label : r.label`, toute ligne non standard) et
  IX:3022 (ligne vide du bas d'un groupe) ; puce de la fiche (CJ:5904) ; « Compté au constat » (CJ:5494) ; vcEcarts (IX:3908, « … figure
  aussi au constat, en « Autres » : … ») ; LISEZMOI l. 118, 248-250, 431. L'écran du constat ne l'écrit pas.
- Portée (S1, suivi-e1-portee) ; appliqué en attendant et recommandé : (c), toutes les lignes ajoutées, reprises du croquis ou tapées à la
  main, croquis activé ; la ligne vide du bas de chaque groupe garde « Autres : » (place pour écrire à la main, pas une ligne ajoutée). (d)
  est la lecture à la lettre de « Ne jamais écrire "Autres :" » ; (c) en est une lecture plus étroite (F10) [p].
- Textes, mot pour mot : PDF « Bidet », « Drain », « Chaudière (purge, condensat) », « Attente » ; puce de la fiche « Bidet (ligne à son
  nom) » [p] ; « Compté au constat : … Bidet 1 » ; vcEcarts « … figure aussi au constat, sur sa propre ligne : vérifiez qu'il n'est pas
  compté deux fois » [p] ; LISEZMOI « il compte sur une ligne à son nom (une ligne par nom et par réseau) » et « ligne « Drain » ».
- Données : aucune (le libellé enregistré n'a jamais porté « Autres : ») ; une ligne tapée « Autres : X » par l'opérateur garde son texte.
  La case « Indéterminé/Autres » des ouvrages EP (IX:1912, vérifié) est un libellé du formulaire : elle reste.
- Croquis désactivé : D15. Constat signé : D13. Tablette en v1.7.1 : « Autres : ».
- Compat : inchangé (le mot est ajouté à l'impression et dans la fiche, pas dans constatDeduit). Différentiel : sans écart.

### D15 Nouveautés du constat, croquis désactivé (point 2 ; EA § 3, 5, 9, 10)
- Quatre nouveautés touchent le constat sans croquis : les lignes tapées à la main sans « Autres : » (si S1 le prévoit) ;
  « Évier » seul (D16) ; la ligne de la boîte (D17) ; la colonne « Puits » (D18). La présentation actuelle des valeurs de la boîte y vaut déjà
  (point 11) : on ne la redemande pas.
- Appliqué en attendant S2 (suivi-sans-croquis) : (a), aucune : croquis désactivé, le constat imprimé garde la présentation de la v1.7.1 (D13) et
  ROW_KW garde Évier et Cuisine. Recommandé : (b), toutes : un seul modèle de constat, ligne et colonne vides tant qu'on ne les remplit pas,
  comme l'utilisateur l'a accepté pour les nouveautés du cadrage (« valeurs par défaut identiques à la v1.5.1 ») et pour la boîte.
- Coût : (a) et (b) passent par la même présentation (D13) ; un cas de test de plus, croquis désactivé, dans m147 à m150.

### D16 Anomalie « Évier » localisée « Cuisine » (pr12-10 ; EA § 9)
- Retenu : choix b. ROW_KW (IX:1974-1981, vérifié ; m115 n'a fait l'exception que pour le lavabo) : cuisine = lave-vaisselle, ou « cuisine »
  sans lavabo ni évier ; salle de bain = douche, baignoire, ou « salle de bain » sans lavabo ni évier [p : même règle que m115]. Une douche,
  une baignoire ou un lave-vaisselle nommés avec l'évier gardent leur ligne.
- Appliqué en attendant S2 : croquis activé seulement (vcPret()) ; croquis désactivé, Évier et Cuisine, comme en v1.5.1.
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
- Page 2 du constat imprimé (IX:3045-3064, vérifié : traits 40 / 57,5 / 75 / 93, « Conclusion : » à y 109 : page pleine). Appliqué en
  attendant S3 (suivi-boite-cote-place), et recommandé : (a), 2e rangée ; quatre rangées de 13,25 pt dans le cadre (traits à 53,25 / 66,5 /
  79,75) ; libellé en 10 pt, réduit s'il ne tient pas ; deux cases « int. » et « ext. » par réseau [p], la choisie porte une croix ; « sans
  objet » en clair ; les autres valeurs sur une ligne (jusqu'à 5,5 pt) [p].
- Dossiers existants : une distance « 0,80 m intérieur » posée par le croquis et non retouchée devient « 0,80 m », et le côté se coche, à la
  reprise ou au suivi ; une distance tapée ou retouchée reste, côté vide.
- Croquis désactivé (S2 en (a), en attendant) : trois rangées, comme aujourd'hui ; un côté resté dans la distance s'imprime à sa suite [p].
  Constat signé sans marque : trois rangées (D13).
- Tablette en v1.7.1 : n'affiche ni n'imprime le côté ; efface sa provenance (vcProvenance, IX:3738) [p] ; son « Sans objet » efface le
  côté ; sa reprise réécrit « 0,80 m intérieur ». Compat : inchangé (boitesConstat hors de la garde). Différentiel : sans effet.

### D18 Colonne « Puits » (puits-milieu-naturel ; EA § 3 ; X1, F1, F3, X9)
- Vérifié (m120) : ligne PUITS de la table (CJ:794-796) : cEU et cEP = {code 'MILIEU', lib 'Puits : rejet en milieu naturel'} ; raccOk
  (IX:1957) : en EP, vrai pour MILIEU ; precosAuto (IX:2012) : une ligne EU sur MILIEU ajoute suppMilieu ; PDF page 1 : colonnes Fosse
  septique (rouge), Milieu naturel et Gargouille (vertes, comme « Réseau EP ») (IX:2999-3016), croix l. 3038.
- Réponse, mot pour mot (F3) : « Créée une colone "Puits", garder le rejet EP dans la catégorie EP ».
- Retenu : un code PUITS : RACC ['PUITS', 'Puits'] après MILIEU (IX:1904) [p] ; RACC_LIB.PUITS = 'Puits' (CJ:2217) ; table : cEU et cEP
  {code 'PUITS'}, libellé du panneau « Puits » [p]. « Garder le rejet EP dans la catégorie EP » : la ligne d'une gouttière reste dans le
  groupe EP, non conforme ; lecture de S4 (a), appliquée en attendant [p] : la colonne « Puits » est verte, comme « Réseau EP », « Milieu
  naturel » et « Gargouille » (IX:3010-3014, vérifié), et la croix d'un rejet des EP dans un puits y va, comme celle d'un rejet des EU.
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
- Appliqué en attendant S4 (suivi-puits-colonne) : (a) [p] ; aucune option recommandée (F3). (b) : pas de croix de raccordement, case
  « Indéterminé/Autres » des ouvrages EP cochée ; (c) : case « Puits » ajoutée aux ouvrages EP ; dans les deux, la colonne ne sert qu'aux
  eaux usées.
- Dossiers existants : MILIEU posé par le croquis et non retouché → PUITS à la reprise ou au suivi ; valeur retouchée ou choisie à la main :
  reste « Milieu naturel », et vcEcarts (IX:3913) le signale : « Gouttière(s) avant : raccordement « Puits » sur le croquis de terrain,
  « Milieu naturel » au constat. »
- Croquis désactivé (S2 en (a)) : ni colonne ni option, sauf pour une ligne qui porte déjà PUITS (posée croquis activé ; l'option reste
  pour elle [p]) ; sa croix va sous « Milieu naturel » [p] ; une ligne mise à la main sur « Puits » reste « non » (test de m150). Constat
  signé sans marque : trois colonnes (la ligne garde MILIEU).
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
- « Fosse » : M5 si S7 (suivi-fosse) donne (a) (refus de m144) ; (b) : rien de plus ; (c) : changer la clé des exutoires (nomCle), qui
  sépare des destinations déjà réunies dans les dossiers faits : fusion suivante. Noms proches : S6 (D10).
- Dossiers existants : un « Puits » jugé conforme devient non conforme à l'ouverture (voulu). Tablette en v1.7.1 : le jugement de la fiche [p].
- Compat : inchangé (aucune destination dans la garde). Différentiel : sans écart (le générateur ne nomme aucune destination « Puits » ni
  « Fosse », vérifié : generateur.js l. 130).

### D20 Symbole du puits (symbole-puits ; EB § 2)
- Vérifié : le puits est aujourd'hui deux cercles l'un dans l'autre (CJ:2542-2544), proche du puisard.
- Retenu : « un symbole semblable à celui du cadastre avec une barre diamétrale et des manivelles aux extrémités ». La barre dépasse le
  cercle de chaque côté (2,1 pour un rayon de 1,4), pour que les manivelles se voient : notre proposition [p], dite comme telle dans S8.
  L'option « barre seule, sans manivelles » est retirée : elle contredisait la demande ; le formulaire n'affiche que du texte, aucun dessin
  (F12). Appliqué en attendant S8 (suivi-symbole-puits), et recommandé : (a), manivelles en Z [p] ; (b) : toutes deux vers le haut. Code
  de (a) :
  ```
  case 'puits':
    cercle(1.4, {trait: rgb, fond: BLANC, ep: ep});
    poly([-2.1, .8, -2.1, 0, 2.1, 0, 2.1, -.8], false, {trait: rgb, ep: ep});
    break;
  ```
- Le même dessin partout : écran, palettes, fiches, plan PDF, légende, DXF (bloc VEDE_PUITS : un CIRCLE de rayon 1,4 et une POLYLINE de
  4 sommets). Le mot « Puits » est le même au plan et au constat (D18).
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
- « Même niveau » (S9, suivi-e4-niveau) ; appliqué en attendant, et recommandé : (a), même niveau affiché (libNiv, CJ:1700-1714) : deux appareils
  sans niveau sont au même niveau ; un appareil sans niveau ne l'est pas d'un appareil qui en a un ; « étage » sans numéro n'est pas
  « 1er étage ».
- Croquis désactivé : sans objet. Tablette en v1.7.1 : un groupe fait en v1.7.2 y est le même. Compat et différentiel : sans effet.

### D22 Disque de rotation (remarque-libre, 1re partie ; EB § 9 A)
- Retenu [p] : quand un objet qu'on peut faire pivoter est choisi (fiche ouverte), un anneau fin et gris l'entoure (rayon du symbole à
  l'écran + 22 px), avec une poignée ronde de 12 px dans la direction de son angle. Glisser la poignée, ou l'anneau à 8 px près, le fait
  tourner : par pas de 15° avec les aides au dessin (l'aimant), au degré sans elles [p] ; une bulle montre l'angle (« 35° ») [p] ; un pas
  d'annulation par geste ; l'angle est écrit au lâcher (0 à 359). Les puces de 15° (CJ:5970, vérifié) et l'orientation à la pose restent.
- Objets (S10, suivi-disque-objets) ; appliqué en attendant : (a), les trois types orientés (caniveau, clapet, gargouille : CJ:967, 983, 988,
  vérifié). Recommandé : (b), aussi les symboles non ronds (regard, boîte, grille, fosse, té, siphon, puits… [p : liste]) par un drapeau
  pivot de def(), le DXF suivant leur angle (CJ:7447-7448, vérifié : aujourd'hui pour un type orienté seulement) ; ni les symboles ronds,
  ni la zone, ni les textes. (c), les textes libres : fusion suivante.
- Données : e.p.a, qui existe déjà. Tablette en v1.7.1 : elle tourne déjà l'écran et le plan PDF selon e.p.a pour tout type non droit
  (angleSymbole, CJ:2566, vérifié), pas le DXF. Compat et différentiel : sans effet.

## Découpage (m137 à m154)
Chaque correctif est livrable seul : un test qui échoue sur la v1.7.1, la batterie verte (`sh tests/tout.sh --navigateur`), un commit en
français, l'envoi sur la branche de travail. Garde de chacun : compat 245/245 sans régénération ; aléatoire 8000 contre le commit d'avant le
correctif. Dans les cartes, « compat 245/245 » veut dire qu'aucune empreinte ne bouge, et « sans écart » qu'aucune sortie comparée par le
différentiel ne change ; seuls m145 et m150 changent des sorties comparées (écarts attendus, vérifiés un par un) ; une sortie qui change
hors de la garde (couleur, ordre d'une étiquette commune, impression) est dite dans la carte. Ordre : d'abord ce qui ne dépend d'aucune
réponse et touche peu de code (m137 à m142), puis les moyens (m143 à m145) et le gros (m146) ; à la fin, ceux qui attendent une réponse
« Suivi » (m147 à m154 ; questions S1 à S10), codés avec le choix appliqué si la réponse n'est pas venue, dans l'ordre de leurs dépendances
(m147 avant m149 et m150 ; m144 avant m151 ; m141 avant m147 et m153). Les tests nouveaux vont dans des fichiers qui existent ; un fichier
nouveau (tests/vm/tropplein.js, si m145 le choisit) s'ajoute à tests/tout.sh et à tests/LISEZMOI.md.

### Sans réponse attendue
- **m137 « Lavabo » retiré des suggestions ; règle de CLAUDE.md** (e2 ; D1 ; F15). Taille S.
  - Fichiers et fonctions : IX : AUTRES_SUGG.EU (l. 1909). tests/navigateur/dossier.js. CLAUDE.md : règle « Croquis désactivé ou absent »
    (texte proposé dans les Règles communes).
  - Pour l'utilisateur : la feuille « Autre installation EU » du constat ne propose plus « Lavabo », croquis activé ou non ; les autres
    puces restent ; une ligne « Lavabo » déjà saisie reste.
  - Tests : navigateur/dossier.js : plus de puce « Lavabo », croquis désactivé puis activé (échoue sur la v1.7.1) ; « Douche » présente (témoin).
  - Garde : compat 245/245 ; aucune sortie comparée ne change ; aléatoire contre 71a4ed6 : sans écart.
  - Risques et [p] : nul ; texte de la règle de CLAUDE.md [p], à revoir si S2 donne (b) ou (c). Dépendances : aucune.
- **m138 Prolongement sans limite** (pr12-9 ; D2 ; X5). Taille S.
  - Fichiers et fonctions : CJ : contrat et PROL_MAX (l. 336-348), prolSegs (défaut Infinity, l. 361-363), interSegs (défaut gardé, l. 383-385),
    segsPres et segsCibles (l. 3658-3668 : argument qui lève la borne de 120 m pour cibles() [p : nom]), cibles (l. 3707, commentaire
    l. 3701), texte des Réglages (l. 3257). LISEZMOI.txt l. 296-297. tests/vm/dessin.js, tests/navigateur/accroches.js.
  - Pour l'utilisateur : « Prolongement d'un côté » cale le point au-delà d'un bout, sans limite de longueur (tout côté visible compte, même
    à plus de 120 m) ; « Intersection » garde 30 m ; Réglages et LISEZMOI disent « sans limite de longueur ».
  - Tests : vm/dessin.js : prolSegs sans Lmax, point à 40 m au-delà du bout et à 5 cm de la droite : un point, ext ≈ 40 (v1.7.1 : null) ; avec
    un Lmax donné : inchangé ; interSegs, rencontre à 40 m : null (témoin). navigateur/accroches.js, cas pl (l. 1114-1149) : les témoins à
    30,1 m et 40 m se calent sur la droite (v1.7.1 : sous le doigt) ; point à 150 m au-delà du bout d'un côté du bâti du fond, au zoom le
    plus large : il se cale (v1.7.1 : non, borne de 120 m) ; temps de cibles() à ce zoom mesuré et noté dans la carte.
  - Garde : compat 245/245 ; aucune sortie comparée ne change ; aléatoire : sans écart (aide au dessin).
  - Risques et [p] : accroches parasites d'un côté lointain au zoom large ; calcul plus long (parcours des cases occupées de la grille si
    besoin [p]) ; repli à 120 m si le coût reste trop grand, écrit dans les Réglages, le LISEZMOI et la carte, et signalé à l'utilisateur ;
    borne par la diagonale de l'écran [p] ; intersection à 30 m [p]. Dépendances : aucune.
- **m139 Escalier : côté et montée proposés ; consigne pour les anciennes tablettes** (pr12-2, escalier-rendu ; D3, D4 ; X6). Taille S.
  - Fichiers et fonctions : CJ : escalierDefauts (l. 1050-1071 : filtre du bâti l. 1055, montée l. 1070), appels de refsCotes (l. 4528,
    5377), distPolygone (l. 136, lue). LISEZMOI.txt l. 166-173 et consigne de mise à jour (l. 366-372). tests/vm/escalier.js,
    tests/navigateur/escalier.js.
  - Pour l'utilisateur : un escalier posé contre une annexe dessinée en contour fermé de « Complément du fond » se propose du bon côté ; un
    bout posé à 1 cm au plus d'une façade compte comme posé sur le bâti pour la montée ; la consigne de mise à jour cite l'escalier et ce que
    montre une tablette en v1.6.3. Rien d'autre ne change à l'écran, au plan PDF ni au DXF.
  - Tests : vm/escalier.js d10 (complément fermé : côté 'd' ; v1.7.1 : 'g'), d11 (départ à 5 mm d'une façade : 'depart' ; v1.7.1 : 'fin'),
    d12 (départ sur un coin, fin à 5 mm d'une façade : 'fin' ; v1.7.1 : 'depart'), d13 (départ à 2 cm : témoin) ; gardes : l'escalier n'est
    ni dans an.lignes ni dans an.pieces, resLigne 'LIM', DXF sur VEDE-ESCALIERS et jamais sur un calque de réseau, légende « Escalier » ; la
    consigne du LISEZMOI cite l'escalier (échoue sur la v1.7.1) [p] ; navigateur/escalier.js : la fiche n'a pas de puce « Réseau ».
  - Garde : compat 245/245 (aucun escalier) ; aléatoire : sans écart (le générateur ne tire pas d'escalier).
  - Risques et [p] : seuil de 1 cm compris [p] ; phrase de la consigne [p] ; un escalier contre une annexe change de côté proposé (voulu).
  - Dépendances : aucune ; S11 (suivi-escalier-ancienne-version) ne change pas ce correctif (b et c : fusion suivante).
- **m140 Boîte en limite et boîte en zone unitaire** (boite-en-limite, pr12-5 ; D5, D6 ; X3, F8). Taille S.
  - Fichiers et fonctions : CJ : texteLimite (l. 2367-2375), fiche de la boîte (l. 5957), boitesConstat (l. 2320-2342 : réseau d'une boîte
    sans réseau indiqué d'après les sources dont le chemin la traverse, lu dans an.adj et an.sensPiece [p]). LISEZMOI.txt l. 149-155 et
    263-266. tests/vm/boite.js, tests/navigateur/boite.js.
  - Pour l'utilisateur : au plan (écran, PDF, DXF) « à 0,80 m de la limite, à l'intérieur de la propriété » (ou « à l'extérieur ») ; côté
    seul « à l'intérieur de la propriété » ; fiche « Sur le plan : ≈ 0,80 m, à l'intérieur de la propriété » ; en zone unitaire, une boîte
    sans réseau indiqué remplit la colonne des appareils dont les eaux y passent ; une boîte dite unitaire dans sa fiche compte pour les deux.
  - Tests : vm/boite.js : texteLimite int, ext, côté seul (échouent sur la v1.7.1), témoins 0 et distance seule ; collecteur unitaire, B1
    (WC) et B2 (descente) en parallèle : EU = B1 (distance et profondeur reprises), EP = B2 (v1.7.1 : rien de repris) ; en série (WC → B1 →
    B2 → collecteur unitaire), avec puis sans descente vers un puisard : B1 et B2 en EU, rien de repris, aucune valeur EP (comme en v1.7.1 ;
    avec le seul resObj.boite, B1 irait en EP) ; témoins : boîte unitaire qui reçoit les deux → EU et EP ; B1 indiquée EP → EP ; boîte
    indiquée UN dans sa fiche → EU et EP (F8) ; boîte qu'aucune source ne traverse → EU et EP. navigateur/boite.js : la fiche.
  - Garde : compat 245/245 ; étiquettes comparées, mais aucun côté dans la garde ni dans le générateur : inchangées ; aléatoire : sans écart.
  - Risques et [p] : étiquette plus longue (52 caractères au lieu de 32), non replacée : elle peut chevaucher un autre texte ; fiche [p] ;
    chemins lus dans an.adj et an.sensPiece [p] ; tablette en v1.7.1 qui vide une valeur reprise [p]. La distance du constat garde
    « 0,80 m intérieur » jusqu'à m149.
  - Dépendances : aucune.
- **m141 Ordre de l'étiquette commune** (ordre-etiquette-commune ; D7 ; X8). Taille S.
  - Fichiers et fonctions : CJ : ORDRE_ETIQ et rangEtiq (près de rangCatalogue, l. 2399), groupeEtiquette (l. 2400-2415), texteGroupe
    (l. 2438-2447), comptesGroupe (l. 5485-5494). LISEZMOI.txt l. 252-254. tests/vm/equipements.js, tests/navigateur/equipements.js.
  - Pour l'utilisateur : « douche, lavabo, WC + lave-mains » quel que soit le porteur, au plan (écran, PDF, DXF) ; « Compté au constat :
    Salle de bain 1, Évier 1, WC 1 ».
  - Tests : vm/equipements.js : chaque attente d'ordre du fichier refaite avec ORDRE_ETIQ (X8, lu dans le fichier) [p : à confirmer en
    codant] : « douche, WC + lave-mains, lavabo » devient « douche, lavabo, WC + lave-mains » (l. 101, 674, 695, 725, 749, 798) ; l. 701
    « Douche, lavabo, WC + lave-mains (1er étage) » ; l. 703 « baignoire, lavabo » ; l. 717 « lavabo, WC » ; l. 804 « douche (1er étage),
    lavabo (RDC), WC » ; l. 808 et 814 « douche, baignoire, lavabo, WC » ; l. 810 « Do, Ba, La, Év, WC » ; l. 812 « Do (1er étage), Ba (RDC),
    La (1er étage), Év (1er étage), WC (1er étage) » ; l. 816 « La, Év, WC, LL, siphon de garage, ? » ; l. 830 « douche, lavabo, évier, WC +
    lave-mains » ; inchangées : l. 779 (« douche, WC ») et l. 806 (« Lavabo (sous-sol), WC (RDC) »). Cas nouveau, porteur WC : « douche,
    lavabo, WC + lave-mains » (v1.7.1 : « WC + lave-mains, lavabo, douche ») et g.objets[0] reste le WC. navigateur/equipements.js l. 62 et 76.
  - Garde : compat 245/245 [p] ; aléatoire contre le commit d'avant : sans écart (pas d'étiquette commune tirée avec --contre) ; sans
    --contre, les étiquettes communes tirées changent d'ordre (attendu, non comparé).
  - Risques et [p] : ordre au-delà de l'exemple [p] ; le porteur perd la tête [p]. Dépendances : aucune (m147 et m153 viennent après).
- **m142 Couleur du drain d'infiltration d'après ses eaux** (drain-infiltration-dessin ; D8). Taille S.
  - Fichiers et fonctions : CJ : boucle des sources de l'analyse (terminaux de drain, l. 1440-1560), an.eauxDrains (l. 1610-1612), resLigne
    (l. 2350-2362). LISEZMOI.txt l. 141 et l. 104-106. tests/vm/drain.js.
  - Pour l'utilisateur : un drain d'infiltration qui ne reçoit que des eaux usées est rouge (écran, plan PDF, étiquette, fiche, DXF ; légende
    « Canalisation EU ») ; vert dès qu'il reçoit des EP, ou sans source. Libellés du panneau Constat inchangés.
  - Tests : vm/drain.js : un WC vers le drain : resLigne 'EU' (v1.7.1 : 'EP') ; DXF en couleur 1 sur VEDE-DRAINS, légende ; WC et descente :
    'EP' ; sans source : 'EP' ; projet : 'PRJ' ; libellés fixés en attendant S5 (descente : libellé EP, case infil, oui ; WC : libellé EU,
    MILIEU, non) ; témoin de la décision du 16 nov. (regard-suit-exutoire) : un regard sans réseau au tampon béton sur un drain rouge (WC
    seul) reste « Regard EP : tampon béton », en réserve.
  - Garde : compat 245/245 (an.eauxDrains absent sans drain d'infiltration) ; aléatoire : sans écart (resObj, constat, étiquettes inchangés).
  - Risques et [p] : réseau saisi ignoré, sens non lu [p] ; un dossier ancien change de couleur ; sous un drain rouge, le regard reste EP, en
    réserve (décision du 16 nov.) : à dire dans l'annonce. Dépendances : aucune.
- **m143 Anomalies rangées d'après l'objet du croquis** (rangement-autres-par-texte ; D9 ; X7). Taille M.
  - Fichiers et fonctions : CJ : ligneDe (l. 2061-2069 : la condition nomLibre de la l. 2066 est retirée pour toute ligne non standard),
    rapprochement (l. 2124-2131 : ops.autres). IX : vcAutreSuit (l. 3761), vcRangerAutres (l. 3767), vcApparier (l. 3671). LISEZMOI.txt
    l. 270-273. tests/vm/equipements.js, tests/navigateur/dossier.js.
  - Pour l'utilisateur : l'anomalie d'une chaudière, d'une attente, d'un drain, d'un siphon de cour ou d'un trop-plein du croquis va sur la
    ligne de cet objet, même si une autre ligne ajoutée lui ressemble ; une ligne choisie à la main reste ; une anomalie saisie au dossier est
    rangée par son texte.
  - Tests : vm : chaudière reliée à un puisard (anomalie eu-inf) : ops.autres nomme, pour l'enregistrement de son anomalie, la ligne de la
    chaudière (v1.7.1 : absent) ; navigateur/dossier.js : ligne tapée « Chaudière fioul » : l'anomalie du croquis sur « Chaudière (purge,
    condensat) », une anomalie saisie « Chaudière fioul : … » sur sa ligne ; deux drains sur une ligne « Drain ».
  - Garde : compat 245/245 ; aléatoire : sans écart (opérations non comparées).
  - Risques et [p] : chaque ligne non standard doit être liée à son objet ; tablette en v1.7.1 [p] ; anomalie sans ligne liée [p].
  - Dépendances : aucune.
- **m144 Destinations de même nom refusées** (destinations-meme-nom ; D10 ; F9). Taille M.
  - Fichiers et fonctions : CJ : canonDest, distDest, refusNomDest (près de champDest, l. 856-885), destSaisie (l. 873 : 3e argument
    facultatif), export (l. 938), enregistrement de « + Nouvelle destination » (l. 5770), destTxt (l. 6559-6575). IX : vcExuModifier
    (l. 3574-3600). LISEZMOI.txt l. 70-80. tests/vm/rejets.js, tests/navigateur/rejets.js.
  - Pour l'utilisateur : M1 à M4 dans la palette, la fiche et les Réglages ; un nom proche refusé comme un même nom (en attendant S6) ;
    « Fosse » accepté comme un fossé (en attendant S7).
  - Tests : vm/rejets.js n1 (42 paires), n2 (« etang » face au modèle « Étang » : M1 ; v1.7.1 : accepté), n3 (« Fosse » face à « Fossé »
    existant : refusé ; seul : accepté), n4 (deux modèles « Étang » et « etang » gardés au chargement), n5 (destination posée : même nom et
    mêmes jugements acceptés, autres jugements M3) ; navigateur/rejets.js : « + Nouvelle destination » « Étang » puis « etang » : M1 et un
    seul modèle ; fiche et Réglages.
  - Garde : compat 245/245 ; aléatoire : sans écart (noms écrits sans la saisie).
  - Risques et [p] : faux positifs (« Fossé de la rue », « Fossé de la route » : question S6) et faux négatifs (deux fautes) ; doublons venus
    d'une autre tablette, que seul M3 voit ; textes [p]. Dépendances : aucune (m151 y ajoute M5 et la suite de S6).
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

### Réponse « Suivi » attendue (codés avec le choix appliqué si la réponse n'est pas venue)
- **m147 Constat sans « Autres : » ; présentation notée à la signature** (e1, T1 ; D13, D14, D15 ; X2, F7). Taille M.
  - Attend : S1 (c appliqué), S2 (a). Constat signé : règle de CLAUDE.md (D13), sans question.
  - Fichiers et fonctions : IX : drawConstatTable (l. 3022-3023), présentation du constat (fonction nouvelle [p]), geste de signature
    c-lock (l. 4346 : c.fige.mep posé après constatFigeCalc [p : nom]), constatFigeCalc et constatGeler (l. 2087-2102, sans la marque),
    vcEcarts (l. 3908). CJ : comptesGroupe (l. 5494), fiche de l'autre appareil (l. 5904). LISEZMOI.txt l. 118, 248-250, 431.
    tests/navigateur/dossier.js, tests/navigateur/equipements.js.
  - Pour l'utilisateur : croquis activé, les lignes ajoutées s'impriment à leur seul nom (« Bidet », « Drain », « Chaudière (purge,
    condensat) ») ; la ligne vide du bas garde « Autres : » ; fiche « Bidet (ligne à son nom) » ; « Compté au constat : … Bidet 1 » ; message
    « … sur sa propre ligne … ». Croquis désactivé : « Autres : » comme en v1.5.1. Un constat signé avant la v1.7.2 se réimprime avec
    « Autres : ».
  - Tests : navigateur/dossier.js cas 74 (l. 733-756) réécrit : mêmes libellés sans le mot, aucun « Autres : » hors de la ligne vide
    (échoue sur la v1.7.1) ; croquis désactivé : « Autres : » ; constat signé sans marque : « Autres : » ; constat signé sans c.fige (signé
    avant le gel), croquis activé : à l'ouverture du croquis, constatGeler le gèle sans marque, et le PDF garde « Autres : » (X2) ; signé en
    v1.7.2 puis croquis désactivé : présentation gardée ; navigateur/equipements.js l. 389 et cas de la l. 76.
  - Garde : compat 245/245 (impression hors de la garde) ; aléatoire : sans écart.
  - Risques et [p] : nom de la marque [p] ; une ligne tapée « Autres : X » garde son texte ; tablette en v1.7.1 : « Autres : », même pour un
    constat signé en v1.7.2 (à dire dans l'annonce).
  - Dépendances : après m141 (comptesGroupe).
- **m148 Anomalie « Évier » localisée « Cuisine » : « Évier » seul** (pr12-10 ; D16). Taille S.
  - Attend : S2 (a : croquis activé seulement).
  - Fichiers et fonctions : IX : ROW_KW (l. 1978-1981). LISEZMOI.txt l. 273-276. tests/navigateur/dossier.js (près des cas 64-68).
  - Pour l'utilisateur : une anomalie saisie « Évier : siphon fuyard », localisation « Cuisine », ne touche plus que la ligne « Évier »
    (croquis activé) ; croquis désactivé : Évier et Cuisine.
  - Tests : dossier.js : croquis activé : Évier seul (échoue sur la v1.7.1) ; croquis désactivé : Évier et Cuisine (jusqu'à la réponse) ;
    témoins « Lave-vaisselle de la cuisine » → Cuisine, « Évier et lave-vaisselle » → Évier et Cuisine, « Cuisine : … » → Cuisine.
  - Garde : compat 245/245 ; aléatoire : sans écart.
  - Risques et [p] : une ligne Cuisine non conforme à tort redevient conforme à la réouverture d'un dossier non signé (voulu ; à dire dans
    l'annonce) ; salle de bain [p]. Dépendances : aucune.
- **m149 Ligne « Boîte à l'intérieur ou à l'extérieur de la propriété »** (pr12-11 ; D17). Taille M.
  - Attend : S3 (a), S2 (a). Constat signé : règle (D13).
  - Fichiers et fonctions : CJ : boitesConstat (l. 2320-2342). IX : écran de la boîte (l. 2196-2200), « Sans objet » (l. 4323),
    VC_BOITE_CHAMPS (l. 3756), vcProvenance (l. 3738), reprise (l. 3840-3852), résumé (l. 3651), vcBoiteCle (l. 3868), vcEcarts
    (l. 3933-3939), drawConstatP2 (l. 3045-3064). LISEZMOI.txt l. 260-262. tests/navigateur/constat-boite.js, tests/vm/boite.js.
  - Pour l'utilisateur : la distance s'écrit seule (« 0,80 m ») ; une rangée « Boîte à l'intérieur ou à l'extérieur de la propriété », deux
    boutons par réseau à l'écran, deux cases « int. » et « ext. » au constat imprimé, sous la distance.
  - Tests : constat-boite.js : boîte côté intérieur à 0,80 m : distance « 0,80 m », côté « intérieur », croix dans « int. » au PDF (v1.7.1 :
    « 0,80 m intérieur » ; échoue) ; « Sans objet » ; valeur retouchée gardée ; deux boîtes ; croquis désactivé : trois rangées ; constat
    signé sans marque : trois rangées. vm/boite.js : boitesConstat rend la distance et le côté à part ; en limite, pas de côté.
  - Garde : compat 245/245 ; aléatoire : sans écart (boitesConstat non comparé).
  - Risques et [p] : page 2 pleine (13,25 pt par rangée) ; cases petites ; valeurs sur une ligne [p] ; tablette en v1.7.1 [p].
  - Dépendances : m140 (mêmes mots), m147 (présentation).
- **m150 Colonne « Puits » au constat** (puits-milieu-naturel, drain-infiltration-constat ; D18, D8 ; X1, F1, F3, F4, X9). Taille M.
  - Attend : S4 (a appliqué, aucune recommandée), S5 (a : rien de plus, aucune recommandée), S2 (a). Constat signé : règle (D13).
  - Fichiers et fonctions : CJ : table, ligne PUITS (l. 794-796), RACC_LIB (l. 2217), note du panneau Constat (l. 6105-6125) ; ligne DISP
    (l. 799-801) ou raccInfo (l. 2228-2245) si S5 donne b, c ou d. IX : RACC (l. 1904), raccOk (l. 1957 : PUITS « non » d'office, sauf
    ligne venue du croquis [p : raccOk reçoit le constat]), constatEval (l. 2034-2038), vcProvenance (l. 3738, lue), precosAuto (l. 2012),
    drawConstatTable (l. 2999-3038), instRowHtml (l. 2146), vcValeurs (l. 3721). LISEZMOI.txt (colonnes du constat).
    tests/vm/rejets.js (l. 448-470, 480), tests/navigateur/rejets.js (l. 451), tests/navigateur/dossier.js (PDF et conformité).
  - Pour l'utilisateur : une colonne « Puits » au constat imprimé, entre « Milieu naturel » et « Gargouille », croix des rejets dans un puits
    (EU et EP) ; option « Puits » à l'écran ; panneau « Puits » ; une ligne mise à la main sur « Puits » est non conforme.
  - Tests : vm/rejets.js q1 (l. 448-470 : PUITS et « Puits » au lieu de MILIEU ; échoue sur la v1.7.1) et contrôle de la table (l. 480) ;
    navigateur/rejets.js l. 451 ; PDF : en-tête « Puits » vers x 445,2 et la croix dessous, une ligne MILIEU vers x 413,3 ; navigateur/
    dossier.js : ligne « Gouttière(s) » EP mise à la main sur « Puits », sans anomalie : « non », croquis activé puis désactivé (X1, F1) ;
    ligne venue du croquis, anomalie ep-puits écartée dans les Contrôles : « oui », retenue : « non » ; suivi : MILIEU posé par le croquis →
    PUITS, valeur retouchée gardée avec le message ; croquis désactivé : trois colonnes ; constat signé sans marque : trois colonnes.
  - Garde : compat 245/245 (aucun puits) ; aléatoire contre le commit d'avant : écarts attendus, code MILIEU → PUITS des lignes vers un puits
    dans le constat déduit, rien d'autre ; chacun vérifié.
  - Risques et [p] : en-têtes serrés (31,9 pt), à voir sur un PDF imprimé ; raccOk qui reçoit le constat [p] ; conformité fixée à la main
    gardée [p] ; tablette en v1.7.1 : une ligne « Puits » y est non conforme d'office, sans suppMilieu, jusqu'au suivi (X9).
  - Dépendances : m147 (présentation) ; m142 pour l'option d de S5.
- **m151 « Puits » venu d'un fichier ; noms proches ; « Fosse »** (puits-venu-fichier, destinations-meme-nom ; D19, D10 ; F6, F9). Taille S
  (M si S6 donne b).
  - Attend : S6 (a appliqué : rien de plus que m144), S7 (b appliqué : rien de plus pour « Fosse »).
  - Fichiers et fonctions : CJ : nomPuits [p] (rend 'puits', 'perdu' ou '' ; partagé par champDest, l. 856-857, et l'analyse,
    l. 1149-1153), contrôles de la destination (l. 1019-1020), fiche de la destination, refusNomDest (m144 : M5 si S7 donne a ; question
    « la même ou une autre ? » si S6 donne b ; même nom seul si S6 donne c). LISEZMOI.txt (destinations). tests/vm/regles.js,
    tests/vm/rejets.js, tests/navigateur/rejets.js (si S6 donne b).
  - Pour l'utilisateur : une « Autre destination » « Puits » venue d'un fichier est jugée comme un puits, non conforme, avec le message
    « À vérifier » ; « Puits perdu » garde le jugement de sa fiche, avec son rappel (D19) ; noms proches et « Fosse » : selon les réponses.
  - Tests : vm/regles.js l. 110-113 (« Puits » : règle du puits ; échouent sur la v1.7.1) ; « Puit », « Ancien puits » (puits), « Puits
    perdu » (jugement de sa fiche, rappel), « Puisard » (témoin : jugement de la fiche) ; le refus de la fiche et le jugement par la même
    fonction ; rejets.js n3 selon S7, n6 (« Fossé de la rue » face à « Fossé de la route ») selon S6.
  - Garde : compat 245/245 ; aléatoire : sans écart.
  - Risques et [p] : rappel du « Puits perdu » [p] ; objet laissé tel quel [p] ; textes de S6 (b) [p]. Dépendances : m144.
- **m152 Symbole du puits du cadastre** (symbole-puits ; D20). Taille S.
  - Attend : S8 (a).
  - Fichiers et fonctions : CJ : primitives, cas 'puits' (l. 2542-2544), rayonSymbole (l. 2506) si besoin, légende, bloc DXF. tests/vm/rejets.js
    q2 (l. 482-497).
  - Pour l'utilisateur : le puits a le dessin du cadastre (cercle, barre, manivelles), partout.
  - Tests : vm/rejets.js q2 réécrit : un cercle de 1,4 et une ligne de quatre points (v1.7.1 : deux cercles ; échoue) ; DXF : bloc
    VEDE_PUITS avec un CIRCLE et une POLYLINE de 4 VERTEX.
  - Garde : compat 245/245 ; aléatoire : sans écart (le symbole n'est pas comparé).
  - Risques et [p] : lisibilité au petit zoom [p] ; forme [p]. Dépendances : aucune.
- **m153 Présélection des voisins d'une étiquette commune** (e4 ; D21). Taille S.
  - Attend : S9 (a).
  - Fichiers et fonctions : CJ : voisinsEtiquette et refusEtiq (près de groupeEtiquette, l. 2386-2415 ; export), refusReunir (l. 5518-5527),
    entrerReunir (l. 5507-5512, toast), etiqReunir (l. 6364). LISEZMOI.txt l. 249-258. tests/vm/equipements.js, tests/navigateur/equipements.js.
  - Pour l'utilisateur : « Étiquette commune… » arrive avec les voisins déjà choisis et le toast de D21 ; un toucher en retire un.
  - Tests : vm/equipements.js, porteur WC en (0 ; 0) au RDC : lavabo à 2 m et douche en (2 ; 2) choisis ; évier à 4 m, baignoire au 1er étage,
    lave-linge en projet, descente EP, second WC déjà réuni : non ; ordre lavabo, douche (la v1.7.1 n'a pas la fonction) ; appareils sans
    niveau selon la réponse. navigateur/equipements.js : bandeau « 2 choisis » (v1.7.1 : « 0 choisi ») ; toucher le lavabo : « 1 choisi » ;
    « Terminé » : WC et douche seulement.
  - Garde : compat 245/245 ; aléatoire : sans effet.
  - Risques et [p] : un voisin derrière une cloison est choisi d'office (l'opérateur doit le voir et le retirer) ; textes [p].
  - Dépendances : après m141 (même tri des membres).
- **m154 Disque de rotation** (remarque-libre ; D22). Taille M.
  - Attend : S10 (a appliqué, b recommandé).
  - Fichiers et fonctions : CJ : gestes (S.geste, l. 3808-3872 : geste 'tourner' [p]), cibleGlisser (l. 4068-4083), terminerGlisser (l. 4266),
    dessin de la sélection [p : vers l. 2849-2900] ; pour (b) : drapeau pivot de def() (l. 960-995) et DXF (l. 7447-7448). LISEZMOI.txt
    l. 290-298 [p]. tests/navigateur/gestes.js, tests/vm/dessin.js (b).
  - Pour l'utilisateur : un anneau et sa poignée autour de l'objet choisi, qu'on glisse pour le faire tourner.
  - Tests : navigateur/gestes.js : un caniveau, poignée glissée d'un quart de tour : angle 90 (v1.7.1 : pas de poignée ; échoue) ; une
    annulation rend l'angle ; avec (b) : un regard tourné donne un INSERT DXF à cet angle (vm/dessin.js).
  - Garde : compat 245/245 ; aléatoire : sans effet.
  - Risques et [p] : conflit entre la poignée et le glisser de l'objet au petit zoom ; liste de (b) [p] ; tablette en v1.7.1 : écran et PDF
    tournés, DXF non [p]. Dépendances : aucune.

### Attendront la fusion suivante
- L'escalier enregistré autrement (S11, b ou c : L).
- Les textes libres tournés par le disque (S10, c) ; une clé des exutoires qui sépare « Fosse » et « Fossé » (S7, c).
- Les souhaits restants de la v1.7.0 (questions S12 à S16) : section suivante.
- S'il manque des numéros (correctif scindé, relecture plus longue) : m154, puis m146 (aucun autre n'en dépend).

## Souhaits restants (après la v1.7.2)
Résumé d'EC : ce que les réponses du cadrage (16 nov.) changent aux recommandations du cadrage (CA = .claude/cadrage-v170.md, numéros de
ligne). Lot à part, après la v1.7.2 [p] : 13 à 17 correctifs selon les réponses (14 : 2 ; 5 : 1 ; 6 : 4 ; 9 : 3 ; 1 : 2 ou 3 ; 13 : 1 à 4).
Ordre conseillé [p] : 14 ; 5 puis 6 (lot avant-projet) ; 9, après les changements du constat de la v1.7.2 (m147 à m150) ; 1 (juste après 5
si la photo ne va pas au constat) ; 13, après les réponses.
- **14, plan centré à l'ouverture** (CA:344-361 ; M, 2 correctifs ; S12). cadrage-14-4 confirme la source, la parcelle du tableau Excel,
  déjà importée (CA:346), et la parcelle d'abord (CA:356). Aujourd'hui, seuls les calques de texte de parcelle (PARCELLETEX ou voisin,
  CJ:708) donnent un numéro de parcelle ; sonde d'EC : sur un calque renommé …PARCELLENUM, les numéros ne sont que des textes, et son trait
  de rappel devient une limite de parcelle. Changements [p] : reconnaître aussi un calque du genre PARCELLENUM, et le sortir des limites et
  des contours (CJ:244) ; garder la ligne « Textes reconnus » (CA:346). Le repli sur l'adresse (CA:359-361) reste incertain : il peut
  attendre ce que montreront les fonds réels. Premier du lot : il ne touche ni l'analyse, ni le constat, ni le PDF.
- **5, avant-projet sans les « à supprimer »** (CA:238-252 ; M, 1 correctif). Aucune réponse ne le touche : restent la bulle seule
  (CA:244), l'écran non masqué (CA:247), pas d'ancien plan barré (CA:250). Depuis le cadrage : le défaut de CA:236 est corrigé (m95) ; les
  tests de CA:240 se numérotent à partir de p7 ; les objets venus depuis (drains, destinations, puits, autres appareils, WC + lave-mains,
  étiquette commune) doivent suivre montrer() [p] ; m136 touche le même PDF : les tester ensemble [p].
- **6, « à supprimer » sur une partie d'un tronçon** (CA:254-274 ; L, 4 correctifs ; après 5). Aucune réponse ne le touche (CA:260-274
  retenus). Depuis le cadrage : un drain coupé garde p.drain et sa couleur sur ses deux parties [p] ; l'escalier, jamais un réseau, ne se
  coupe pas [p], comme collecteurs et limites (CA:256). Le reste « tuyau tracé en deux traits » : question à poser à sa conception.
- **9, constat sans les lignes absentes** (CA:299-316 ; L, 3 correctifs). cadrage-validation-departement (« constat abrégé admis ») règle
  CA:278, point 6, et le premier risque de CA:303 ; la version courte de repli (CA:301, 307) devient inutile ; restent l'option par étude,
  le complet par défaut et le gel à la signature (CA:305-307). L'abrégé suit les nouveautés du constat de la v1.7.2 (lignes sans
  « Autres : », colonne « Puits », ligne de la boîte, libellés de la boîte en limite) : « sans nouvelle colonne » (CA:303) n'est plus vrai.
  Une seule marque de gel : c.fige.mise (CA:301) et c.fige.mep (D13) n'en font qu'une [p]. Les mentions « Formulaire du Département »
  (IX:1526) et « Formulaire « Contrôle de Branchement Particulier » du Département » (IX:2163) sont à reformuler [p].
- **1, photo de la façade** (CA:280-297 ; M, 2 correctifs, +1 si au constat ; S13). La raison de CA:288 (« le formulaire du Département
  reste tel quel ») tombe avec « une production de ma société » ; le choix du 7 nov. (fiche Préco et plan PDF) reste appliqué jusqu'à S13.
  Croquis désactivé : la photo vaut aussi (cadrage-sans-croquis) ; sans photo, les sorties restent celles de la v1.5.1. Restent : une seule
  photo (CA:289), celle du dossier d'abord (CA:292), facultative (CA:295).
- **13, réglage par anomalie standard** (CA:278, 318-338 ; de S, 1 correctif, à L, 4 ; S14 à S16). cadrage-13-reserve : cinq réserves
  par défaut, les candidates de CA:320 sauf « Descente EP (abri) apporte de l'humidité » ; CA:320 (« défaut identique à la v1.6.3 ») ne
  vaut plus pour elles. cadrage-validation-departement : le Département refuse un barème où une anomalie peut devenir une réserve, et le
  constat est une production de la société de l'utilisateur ; S14 demande le sens voulu (appliqué en attendant : pas de réglage, cinq
  réserves d'office, S). « Pas d'anomalie » (CA:324-326) est mis en doute : ne pas le construire avant la réponse [p]. La nature est écrite
  sur l'anomalie au choix, jamais recalculée (CA:328-329). Croquis désactivé : S15 (v1.5.1 en attendant) ; « obstrué ou encombré » et
  « racines » en EU : S16 (réserve aussi, en attendant : lecture à la lettre). Restent verrouillés : descente non visitable, tampon béton,
  by-pass, fosse douteuse (CA:330-332), rejet des EP dans un puits.

## Questions qui restent (groupe « Suivi » : suivi.json, S1 à S16)
Ordre de lecture : d'abord celles qui bloquent un correctif proche (S1 à S10, m147 à m154), puis l'escalier (S11) et les souhaits restants
(S12 à S16). « Appliqué » : choix codé si la réponse n'est pas venue.
- S1 suivi-e1-portee (Lignes sans « Autres : ») : appliqué et recommandé c (toutes les lignes ajoutées ; la ligne vide garde le mot) ;
  d = lecture à la lettre de « jamais ». m147.
- S2 suivi-sans-croquis (Nouveautés du constat, croquis désactivé) : appliqué a (aucune) ; recommandé b (toutes). Déroge à la v1.5.1 (b, c).
  m147 à m150.
- S3 suivi-boite-cote-place (Place de la ligne « intérieur ou extérieur ») : appliqué et recommandé a (sous la distance). m149.
- S4 suivi-puits-colonne (Colonne « Puits » du constat) : appliqué a (croix des EP aussi dans la colonne, verte) [p] ; aucune recommandée.
  m150.
- S5 suivi-drain-libelle (Appareil relié à un drain d'infiltration) : appliqué a (rien : garde le libellé refusé en EU) ; aucune
  recommandée. m150 (m142 fixe les libellés actuels).
- S6 suivi-noms-proches (Noms de destination proches ; ajoutée, F9) : appliqué a (refusé comme un même nom) ; recommandé b (le signaler et
  demander). m144 codé avec a ; m151.
- S7 suivi-fosse (Destination nommée « Fosse ») : appliqué b (comme « Fossé ») ; recommandé a (message M5). m151.
- S8 suivi-symbole-puits (Manivelles du symbole du puits) : appliqué et recommandé a (en Z) ; b (vers le haut). m152.
- S9 suivi-e4-niveau (Présélection d'une étiquette commune) : appliqué et recommandé a (sans niveau = même niveau si le porteur n'en a
  pas). m153.
- S10 suivi-disque-objets (Objets que le disque fait pivoter) : appliqué a (les trois orientés) ; recommandé b (symboles non ronds). m154.
- S11 suivi-escalier-ancienne-version (Escalier ouvert sur une ancienne version) : appliqué et recommandé a. m139 codé de toute façon ;
  b ou c : fusion suivante.
- S12 parcelle-essai-dxf (Numéro de parcelle sur vos plans DXF) : appliqué b (calque du genre PARCELLENUM à reconnaître) ; aucune
  recommandée ; essai à faire par l'utilisateur. Souhait 14.
- S13 facade-constat (Photo de la façade sur le constat) : appliqué a (fiche Préco et plan PDF) ; aucune recommandée. Souhait 1.
- S14 bareme-permissif (Sens de « barème permissif ») : appliqué a (cinq réserves d'office, pas de réglage) ; aucune recommandée. Touche la
  v1.5.1. Souhait 13.
- S15 reserves-sans-croquis (Les trois anomalies types en réserve, croquis désactivé) : appliqué b (v1.5.1) ; aucune recommandée (F11) ;
  a déroge à la v1.5.1. Souhait 13.
- S16 reserves-eu (« Obstrué ou encombré » et « racines » sur un ouvrage EU) : appliqué a (réserve en EU aussi, lecture à la lettre) ;
  aucune recommandée (F11). Souhait 13.
- Retirée : suivi-constat-signe (F7 : règle de CLAUDE.md, D13).
- Présomptions gardées sans question, à signaler dans l'annonce : intersection à 30 m et borne par la diagonale de l'écran (D2) ; repli à
  120 m si le coût du prolongement est trop grand (D2) ; « Puits perdu » jugé d'après sa fiche, avec un rappel (D19) ; lecture de « Deux
  points » (D12) ; ordre de l'étiquette au-delà de l'exemple, et le porteur qui perd la tête de la liste (D7) ; puces « Intérieur » et
  « Extérieur » gardées dans la fiche et au panneau des cotes (D5) ; p.res ignoré et puces « Réseau » masquées pour le drain d'infiltration,
  « tenir compte du réseau » lu comme « des eaux reçues » (D8) ; ligne venue du croquis sur « Puits » qui suit son anomalie, et conformité
  fixée à la main gardée (D18) ; boîte unitaire jugée d'après les chemins qui la traversent (D6) ; « Bidet (ligne à son nom) » et cases
  « int. », « ext. » (D14, D17) ; plan PDF et DXF selon la version qui imprime, dossier signé compris (Règles communes).
