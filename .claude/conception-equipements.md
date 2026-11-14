# Conception du lot « Équipements » (souhaits 7, 8, 15, 18)

Établie le 14 nov. 2026, relue sur e728d76 (après m118). Lignes citées : code actuel (CJ = croquis/croquis.js, IX = index.html).
Détail du code : cartes A, B et C (`carte-*.md`). Lot Rejets : `.claude/conception-rejets.md`, révisée le 14 nov. (m116 à m129).
[p] = présomption à signaler à l'utilisateur. Révisée après relecture (trois défauts, 25 remarques : `suivi-relecture.md`).

## Réponses de l'utilisateur
- 6 nov. 2026, sur m85 (cb7caf4 : le lavabo créait une ligne « Autres : Lavabo » et les appareils voisins à 4 m étaient regroupés) :
  « ne pas interpréter plus que nécessaire le croquis sur cet aspect et laisser l'opérateur indiquer les éléments vus sur site sans les
  modifier. Autre point, ne pas indiquer "autre :" en ajoutant une ligne. Je souhaite que les lavabos et les éviers ne soient pas
  distingués mais qu'ils se confondent. » Appliquée par m86 (ffe3ec1) : lavabo compté Évier, un objet = une installation (CJ:1767).
- 7 nov. : une anomalie saisie à la main qui nomme un lavabo va sur « Évier », même croquis désactivé (m96, 0a317cc). Recommandations du
  cadrage retenues sauf avis contraire (`.claude/cadrage-v170.md`, l. 172-233) :
  - 7 : au cas par cas, un objet générique nommé dans sa fiche ; « Autres » par défaut, ou une ligne du formulaire de même nature choisie
    dans la fiche ; pas d'ouvrage personnalisé de passage ni d'exutoire (lot Rejets : « Autre destination », m125 à m128).
  - 8 : des appareils dessinés à part, choisis par l'opérateur (modèle « porteur ») ; un seul trait de rappel, vers le porteur ; présélection
    des appareils EU à moins de 3 m et au même niveau (cadrage, l. 194 ; écart proposé : E4).
  - 15 : puces jusqu'au 3e et Combles, plus « Autre… » ; « 1er étage » ; pas de niveau dans le texte des anomalies.
  - 18 : une puce « + lave-mains » sur le WC ; le WC + lave-mains compte le WC seul.
- 13 et 14 nov. (lot Rejets, utiles ici) : une anomalie à arbitrer n'est jamais comptée conforme (m119) ; chaque drain de collecte compte
  « Autres : Drain » (Q4 b) ; un drain qui reçoit un équipement EP disperse dans le sol ; Q6 (équipement relié à un drain de collecte sans
  sortie) reste ouverte, recommandation (b), codée en m129 sauf avis contraire.

## « Autres » par défaut et la décision du 6 nov.
- À quoi elle répondait : à m85. Ses phrases visent ce cas : ne pas réinterpréter le dessin, ne pas ajouter une ligne « Autres » pour un
  appareil que le formulaire range déjà, lavabo et évier confondus. m86 l'a lue ainsi : il a gardé les lignes « Autres » des types que le
  formulaire n'a pas (chaudière, attente, siphon de cour, drain, trop-plein : champ `autre`, CJ:821-830 ; clé CJ:1750).
- Ce qui confirme cette lecture : le cadrage, retenu le 7 nov., propose « Autres » par défaut ; le 13 nov., Q4 (b) accepte « Autres :
  Drain » pour chaque drain de collecte ; le formulaire du Département imprime lui-même « Autres : » devant toute ligne hors liste (IX:2999).
- Ce qu'elle implique pour un objet générique : son nom reste celui que l'opérateur a saisi ; aucun reclassement d'office (un « Bidet » ne
  passe en Salle de bain que sur son choix) ; aucun nom d'un appareil que le formulaire range déjà (« Lavabo », « Douche italienne ») ni
  d'un lave-mains : ce serait la voie de retour de « Autres : Lavabo » (D2, E3).
- Ce que je retiens : elle ne tranche pas le cas d'un appareil absent du formulaire, que le 7 nov. a réglé (« Autres » par défaut). Le plus
  sûr pour le PDF : rien de dessiné n'est omis du constat, une non-conformité non plus, et le libellé est celui de l'opérateur ; sa fiche
  permet de choisir une ligne du formulaire (un urinoir en WC). Sans nom : « Autres : Autre appareil », comme son étiquette (cadrage,
  l. 178), et un contrôle demande le nom (D4). À confirmer : E1.

## Décisions du lot
- D1 Modèle de données (tout champ nouveau facultatif ; doc.v reste 1 ; aucun champ écrit tant qu'on ne touche pas l'objet).
  - Deux types génériques, rôle source, forme 'app', nature fixée par le type : def('autre_eu', {fam: 'eu', lib: 'Autre appareil', ab: '?',
    nat: 'EU', role: 'source', forme: 'app', nomLibre: true}) en fin de « Appareils EU » (FAMILLES[0], CJ:846) ; 'autre_ep' (« Autre
    ouvrage EP », nat 'EP') en fin de « Ouvrages EP » (CJ:847) [p : ab « ? »].
  - Leurs champs, dans defautsPt (CJ:854) de ces deux types seulement : nom '' (40 caractères au plus [p]), ab '' (1 à 3 caractères),
    row '' (code de ROWS_STD du même groupe, CJ:1715 ; '' = « Autres : <nom> »).
  - Niveau : p.niv garde ses trois codes (NIV, CJ:802) ; p.etage ('1' à '99', ou 'combles') [p] n'est lu que si niv vaut 'etage'.
  - Lave-mains : p.lm 'oui', lu sur un WC seulement.
  - Étiquette commune : p.etiqAvec (id du porteur) sur chaque membre ; p.etiqTitre sur le porteur : 'sdb', 'eau', 'cuisine', 'buanderie'
    ou 'aucun' ; absent, vide ou inconnu = titre d'office [p].
  - Écarts au cadrage (l. 192, 205, 221), pour la garde des croquis anciens : rien dans defautsPt d'un type existant (etage:'' sur les
    sources : 244/245, la démonstration passe par defautsPt, CJ:6354) et rien dans `an` (an.etiqGroupes : 175/245, compat hache `an`
    entier) ; sondes : `notes-C.md`. Un champ absent donne déjà le comportement actuel.
- D2 Fonctions communes, près de libObj (CJ:1335), de la même famille que destDe (m125).
  - libDe(e) : type nomLibre → nom nettoyé (String, trim, espaces réduits, 40 caractères) ou ty.lib ; WC avec lm 'oui' → « WC +
    lave-mains » ; sinon ty.lib ; type inconnu → e.t. Elle remplace ty.lib dans libObj (donc reglesAnomalies CJ:1339 et controles
    CJ:1402), texteEtiquette (CJ:1840), libEquipement (CJ:6006), l'en-tête de la fiche (CJ:4942) et constatDeduit (CJ:1750 ; CJ:1762 pour un
    générique, D4).
  - abDe(e) : type nomLibre → p.ab nettoyé (1 à 3 caractères), sinon les deux premières lettres du nom, initiale en capitale [p], sinon
    ty.ab ; ailleurs ty.ab.
  - libNiv(e) : « sous-sol », « RDC », « 1er étage », « 2e étage »…, « combles », « étage » (ancien 'etage' sans numéro) ; code inconnu → ''
    (aujourd'hui « (undefined) », CJ:1851 ; aucun croquis de la garde n'en a).
  - nomRefuse(nom) refuse : un nom égal (norm : casse, accents, espaces, s final) à un libellé du catalogue, génériques compris, ou à un
    `autre`, avec ou sans ses parenthèses (« Chaudière (purge, condensat) », « Chaudière ») ; un nom qui contient un mot d'un appareil
    que le formulaire range déjà, ceux de ROW_KW et rowSides (IX:1969-1981 : wc, toilettes, évier, lavabo, douche, baignoire, salle de bain,
    cuisine, lave-linge, machine à laver, lave-vaisselle, siphon de garage ou de sol, grille, caniveau, descente, gouttière), plus lave-mains,
    vasque, salle d'eau, bac à laver et puits [p] (liste recopiée dans CJ, texte normalisé comme anomRows, IX:1998). « Douche italienne »,
    « WC suspendu », « Évier double », « Puits perdu » sont refusés ; Bidet, Urinoir, Avaloir de terrasse restent permis (sonde
    `sonde-nomrefuse-v2.js`). Toast qui nomme l'objet à poser (« Douche italienne : posez une Douche, comptée en Salle de bain. » ; lavabo,
    vasque, lave-mains : « … se dessine en Lavabo, compté Évier ; le lave-mains d'un WC est sa puce « + lave-mains » » ; puits : celui de
    m127, puits perdu en Puisard), valeur précédente rendue. Un nom refusé venu d'un fichier fait à la main est lu tel quel, comme une
    destination nommée « Puits » (m125) ; la fiche le refuse dès qu'on le retouche.
- D3 Analyse.
  - Inchangée : analyser (CJ:962) prend les génériques comme toute source (actif et T[e.t], CJ:965) ; règles et conclusion inchangées. Le nom,
    le niveau, le lave-mains et le groupe ne changent que des textes.
  - Texte des anomalies par libObj : « Bidet : rejet au réseau EP », « WC + lave-mains : rejet au réseau EP » ; jamais de niveau (cadrage,
    l. 205). Une anomalie intacte suit le nom quand il change (reconcilier, CJ:1612).
  - Un contrôle 'manque' (controles, CJ:1402) : « Autre appareil : nom à indiquer » (« Autre ouvrage EP : … »). Comme les autres contrôles,
    il ne joue pas sur la conclusion.
  - autre_ep reçoit le bouton « Rejet au sol » sans code de plus (rejetSolPossible, CJ:4203 : source EP qu'aucun tracé ne tient) ; Q6 vaut
    pour lui comme pour toute source EP.
- D4 Constat (constatDeduit, CJ:1743 ; formulaire inchangé). Ligne de chaque objet :
  - Types existants, inchangés (clé CJ:1750 gardée) : WC → WC ; Lavabo, Évier → Évier ; Douche, Baignoire, Salle de bain → Salle de
    bain ; Cuisine, Lave-vaisselle → Cuisine ; Lave-linge, Siphon de garage, Siphon de sol → leur ligne ; Descente EP → Gouttière(s) avant
    ou arrière, sans façade aucune ligne (sansCote, CJ:1757, rappel IX:3777) ; Grille, Caniveau-grille → Grilles ; Chaudière, Attente,
    Siphon de cour, Drain (et drain de collecte, m123), Trop-plein → « Autres : <libellé> ». WC + lave-mains → WC (une installation,
    Évier 0 ; row.types reçoit « WC » et « Lave-mains », cadrage, l. 223).
  - Autre appareil, Autre ouvrage EP : la ligne p.row si c'est une ligne de ROWS_STD du même groupe (row.types reçoit le nom ; ligneDe,
    CJ:1622, y range ses anomalies) ; sinon « Autres : <nom> », clé 'autre:' + nat + ':' + nom normalisé (norm, espaces) : « Bidet »,
    « bidet » et « Bidet » font une ligne, nb 3 (un objet = une installation, m86) ; libellé : le nom tel que saisi du premier objet (ordre
    de an.resObj) [p]. La nature est dans la clé : une « Climatisation » EU et une EP font deux lignes, chacune jugée sur son réseau ; sans
    elle, une seule, au groupe du premier objet, et la source de l'autre réseau, conforme, y serait « non » jusqu'au PDF (CJ:1750-1755,
    1726 ; sonde `sonde-cle-groupe.js`). Sans nom : « Autres : Autre appareil »
    (« Autre ouvrage EP »), même clé pour tous les sans-nom d'un réseau ; aucun champ nouveau dans cd.
  - Les anomalies d'un objet en « Autres » n'ont pas d'installation (ligneDe ne lit que les lignes std) : l'application les range par le
    texte (anomRows, IX:1995 ; carte A, sonde-autres 7), comme aujourd'hui pour la chaudière.
  - Application, sous vcPret (IX:3149) :
    - vcApparier(c, res), nouvelle, apparie en une fois les lignes du résumé à celles du dossier, en trois passes : croq === s.id, puis
      libellé égal (norm), puis ressemblance (autresMatch, IX:1984, dans les deux sens comme IX:3590) ; dans chaque passe, les lignes du
      résumé dans l'ordre de leur id, non du dessin ; une ligne du dossier n'est prise qu'une fois. constatDepuisCroquis (IX:3649) et vcEcarts
      (IX:3733) la lisent au lieu d'appeler vcLigneConstat ligne par ligne (vcEcarts ne pose aucun lien : avant la reprise, deux lignes
      du croquis s'y comparent à la même ligne). Aujourd'hui une Chaudière et une Attente reconnaissent toutes deux une ligne saisie
      « Chaudière et attente » (IX:1985-1990) : liée aux deux, poser (IX:3637) y garde la dernière valeur. Dossier ancien : seuls changent
      ce cas et celui de deux lignes du dossier qui reconnaissaient la même ligne du croquis (« Drain », « Drain agricole » : la ligne liée,
      puis le libellé égal, l'emporte) [p] ; un constat signé ne change pas (IX:3631).
    - vcAutresDouble (IX:3600) lit row.types : « Autres : Lave-mains », « Autres : Lavabo du WC » ou « Autres : WC du jardin » saisie à la
      main à côté d'un WC + lave-mains est rappelée, « Autres : Lavabo » non (sonde `sonde-relecture-types.js`) ; de même « Autres :
      Urinoir » à côté d'un urinoir compté en WC.
  - Puce « Lavabo » d'AUTRES_SUGG (IX:1909 ; boîte IX:4139) : elle invite à saisir « Autres : Lavabo », contraire au 6 nov. ; elle sert
    aussi croquis désactivé : sans réponse, je n'y touche pas (E2). Croquis actif, le rappel existe déjà si le croquis a un lavabo
    (row.types de la ligne Évier).
- D5 Étiquettes et rendu.
  - texteEtiquette (CJ:1840) : p.etiq d'abord, préfixes « Projet : » et « À supprimer : » inchangés ; puis libDe(e) et, s'il existe,
    « (libNiv) ». La règle « texte égal à l'abréviation : pas d'étiquette » (CJ:1852) ne vaut pas pour un type nomLibre (« Bidet »,
    « Autre appareil ») ; « WC + lave-mains » s'affiche toujours. apresProp (CJ:5367) pose l'étiquette quand un nom, la puce lave-mains ou
    un niveau la fait apparaître, comme aujourd'hui. Écran (CJ:2227), plan PDF (pdfPlan, CJ:5730) et DXF lisent tous texteEtiquette.
  - Symbole : primitives (CJ:1895, cas 'app') prend abDe(e) pour un type nomLibre ; corps de 1,3 au-delà de 2 lettres, inchangé ; palette
    « ? » (symboleSvg, CJ:2525, avec le paramètre p de m126 pour la fiche). WC + lave-mains : symbole, bloc VEDE_WC et légende « WC »
    inchangés.
  - Légende du plan PDF (legende, CJ:5958) : une entrée par (type, nom, ab) pour les génériques, « Bidet (Bi) », comme les destinations de
    m126 ; autres types inchangés [p : légende plus longue].
  - Page 2 du PDF (pageTableaux, CJ:6012) : Équipement par libEquipement → libDe ; Niveau par libNiv (aujourd'hui NIV_LIB, CJ:1812).
  - DXF (ecrireDxf, CJ:6070) : TEXT de l'étiquette comme au PDF (plusieurs lignes déjà prévues, CJ:6146) ; bloc d'un générique
    'VEDE_AUTRE_EU_' + ab nettoyé (A-Z, 0-9, _), suffixe _2 quand deux ab donnent le même nom de bloc [p], 'VEDE_AUTRE_EU' sans ab ; même
    aide que les blocs VEDE_EXUTOIRE_ + ab de m126 (INSERT, CJ:6185).
  - Nom libre échappé partout : esc (fiche, palette, toasts, légende, panneau Constat CJ:5091), pdfTxt, l'échappement DXF et CP1252 de m126.
- D6 Étiquette commune (souhait 8).
  - Groupe calculé à la volée à chaque dessin, sur an.objs (texteEtiquette reçoit an) : membre valide si p.etiqAvec est une chaîne différente
    de son id, si le porteur est dans an.objs sans etiqAvec, avec le même p.st, et si les deux sont des sources EU (Autre appareil compris)
    [p]. Un groupe « Projet » se défait sur l'état des lieux, au canevas comme au DXF (an edl par défaut, CJ:6070) [p], un groupe « À
    supprimer » sur l'avant-projet (cadrage, l. 192).
  - Membre valide : texteEtiquette → '', avant le test de p.etiq (CJ:1841) : ni étiquette ni obstacle (obstaclesPlan saute les textes
    vides, CJ:2119) ; son p.etiq revient quand il est séparé. Porteur et objet seul : p.etiq d'abord, comme aujourd'hui ; il l'emporte sur
    le texte commun. L'e.lab d'un membre peut être vidé (texte vide : placerEtiquette rend null, CJ:2077 ; changement de type CJ:5392,
    « Replacer les étiquettes » CJ:5322, « Replacer » CJ:5253) : à Séparer, son étiquette est replacée.
  - Texte du porteur, deux lignes (boiteTexte CJ:2063, écran CJ:2231, PDF CJ:5702 et DXF CJ:6146 coupent déjà au saut de ligne) :
    ligne 1 = préfixe, titre et niveau commun (« Salle de bain (1er étage) ») ; titre d'office « Salle de bain » si le groupe a une douche,
    une baignoire ou une salle de bain, sinon aucun [p] ; ligne 2 = la liste (« douche, lavabo, WC + lave-mains ») : porteur, puis ordre du
    catalogue, puis id ; initiale en minuscule sauf sigle [p] ; un nom égal au titre n'est pas répété ; niveau après chaque nom s'ils
    diffèrent ; au-delà de quatre appareils, leurs abréviations [p]. Sans titre : une seule ligne, niveau commun à la fin.
  - Inchangés : le trait de rappel, unique, vers le porteur ; le DXF hors les TEXT du porteur ; légende, page 2, analyse, anomalies et
    constat (chaque objet compte). La fiche du porteur dit « Compté au constat : Salle de bain 1, Évier 1, WC 1 » ;
    à Terminé, un groupe titré Salle de bain ou Cuisine qui compte un Évier le dit aussi : « Lavabo et évier comptent à part (Évier) ; pour
    une seule installation, dessinez l'objet Salle de bain ou Cuisine. » [p] (le PDF n'imprime que le titre et la liste).
  - Placement : le porteur est replacé (placerEtiquette, CJ:2076, avec obstaclesPlan, CJ:2113) à Terminé et à Séparer, sauf une étiquette
    déplacée à la main (lab.main) ou masquée (lab.off) ; ailleurs, la règle d'aujourd'hui : une étiquette n'est posée que si e.lab est
    vide [p].
- D7 Fiche et gestes (ficheHtml CJ:4934 ; clic 'prop' CJ:5234 ; rafraichirFiche CJ:5192).
  - Niveau (CJ:4948) : puces Sous-sol | RDC | 1er | 2e | 3e | Combles | Autre… ; valeurs 'etage:1'…, 'etage:combles', lues dans la branche
    'prop' comme 'sens' ; RDC ou Sous-sol retirent p.etage ; second toucher sur la puce pressée : niv et etage vidés ; « Autre… » par
    demander (CJ:4814), entier de 1 à 99, toast sinon ; un numéro au-delà du 3e paraît en puce pressée (« 5e ») ; un ancien 'etage' sans
    numéro : puce pressée « Étage (à préciser) », montrée dans ce cas seulement [p]. aria-pressed : comparaison propre à ces puces
    (CJ:5192).
  - Lave-mains : puce « + lave-mains » sous le Niveau, fiche du WC seulement ; un second toucher l'enlève. Aide sous la puce : « Lave-mains
    intégré au WC ; raccordé à part : dessinez un Lavabo. » (cadrage, l. 223 ; E5), même phrase au LISEZMOI (l. 127-130).
  - Autre appareil : champ « Nom » en tête, fiche ouverte à la pose sans dialogue ni clavier d'office [p] ; puces de suggestions (EU : Bidet,
    Urinoir, Ballon d'eau chaude, Fontaine, Climatisation (condensats), Adoucisseur, Piscine (vidange), liste du cadrage sans le bac à laver,
    un évier ; EP : Évacuation de balcon, Avaloir de terrasse, Cour anglaise) [p], puis les noms déjà employés dans le croquis ; champ « Abréviation »
    (placeholder abDe) ; puces EU | EP (changement de type entre génériques) ; « Compté au constat » : « Autres : <nom> », puis les lignes
    de ROWS_STD du même groupe, puce qui reste pressée au second toucher. Nom refusé : D2.
  - Étiquette commune : bouton « Étiquette commune… » dans la fiche d'un appareil EU, quel que soit son statut [p]. Mode S.reunir {porteur,
    ids}, sur le modèle de S.placer : bandeau « Touchez les appareils à réunir » avec Terminé et Annuler ; halos ; un toucher ajoute ou
    retire ; toast de refus pour un EP, un autre statut, un objet hors du mode ou un membre d'un autre groupe ; zoom et déplacement permis ;
    un seul instantane (CJ:2705) à Terminé ; Annuler ne change rien. Le mode se ferme sur annuler, refaire, entrerCotes, choisirOutil,
    fermerNiveau et le chargement d'un croquis (carte C). Fiche du porteur : puces de titre (Salle de bain | Salle d'eau | Cuisine |
    Buanderie | Aucun), « Compté au constat », « Modifier le groupe », « Défaire ». Fiche d'un membre : « Étiquette réunie avec la Douche »,
    « Voir » (sélectionne le porteur), « Séparer » ; son champ Étiquette grisé [p]. Supprimer le porteur rend leur étiquette aux membres
    (etiqAvec effacé dans le même pas d'annulation).
  - Pas de présélection des voisins à 3 m, écart à la recommandation retenue le 7 nov. (cadrage, l. 194 ; E4) [p] : un voisin
    présélectionné (derrière une cloison) serait validé à Terminé sans avoir été vu, contre le 6 nov. Appareil éloigné, que l'unique trait
    ne désigne pas (cadrage, l. 196) : à plus de 3 m du porteur, toast « Loin du porteur : le plan ne le désignera que par la liste. » [p].
  - Changement de type (CJ:5384-5396) extrait en changerType(e, v) en m130, après m127 (règles des destinations) : etage (m130), etiqAvec et
    etiqTitre (m134) gardés quand ils existent, sans clé vide écrite ; lm hors des gardes : effacé hors du WC avec le toast d'aujourd'hui
    (m131) ; entre génériques, nom et ab suivent par la copie des champs de defautsPt (CJ:5386), row est vidé quand le groupe change et
    compté dans le toast (m133).
- D8 Compatibilité.
  - Un croquis fait avant le lot s'ouvre, s'analyse et s'imprime à l'identique : garde à valeurs figées (tests/vm/compat.js, 35 croquis ×
    7 empreintes, SORTIES l. 31) à 245/245 à chaque correctif, sans régénération ; différentiel `node tests/vm/aleatoire.js 8000
    --contre=<commit d'avant>` sans écart, générateur sans ses options nouvelles.
  - planValide (IX:4311-4325) ne corrige aujourd'hui que p.a. La réparation de m126 (p.nom, p.ab… d'une destination) ne doit toucher que
    t === 'exutoire' [p : à écrire dans m126] : sinon un « Autre appareil » sans nom restauré prendrait « Autre destination ». Les
    génériques n'y sont pas réparés : libDe, abDe et constatDeduit appliquent les replis à la lecture (nom coupé à 40, blanc = sans nom ;
    ab de 1 à 3 caractères ; row du groupe ; etage connu ; etiqAvec valide) [p], et la fiche montre le nom nettoyé.
  - Une version plus ancienne qui lit un croquis du lot ne fait aucun échec. La v1.7.0 (b08133d ; sondes des cartes A et C) montre :
    - un générique comme « Objet, gardé tel quel » (type inconnu, m106) : ni compté ni jugé, cercle neutre sans lettres, sans étiquette,
      bloc VEDE_OBJET ; le bout de son tuyau devient une extrémité libre (« À compléter » ou sansexu possibles). À l'ouverture, elle retire
      du dossier ses anomalies intactes ; une tablette à jour les recrée, même id ;
    - au constat : ouvrir la page Constat (b08133d:index.html:773) ou fermer le croquis (IX:3431) le fait suivre ; la ligne « Autres :
      Bidet » créée par « Reprendre du croquis » et non retouchée est vidée puis retirée (b08133d:index.html:3653), une ligne du formulaire
      nourrie par p.row baisse (WC 2 → 1). De retour sur une tablette à jour, le suivi remet la ligne du formulaire, pas la ligne
      « Autres » (aucune création en suivi, IX:3652) : seul « Reprendre du croquis » (IX:3544) la remet ; d'ici là, un rappel de vcEcarts
      (IX:3739). Lu dans les deux versions, sondé hors dépôt. Même effet pour « Autres : Drain » d'un
      drain de collecte (Rejets D11, m123), à y ajouter ;
    - « WC (étage) » pour un étage précisé, « étage » au tableau ;
    - « WC » sans étiquette pour un WC + lave-mains ; le texte de ses anomalies intactes redevient « WC : … » (carte A §9) ;
    - pour une étiquette commune, l'étiquette propre de chaque membre, placée à la volée si e.lab est vide (CJ:2230, 5859, 6191, de même
      en b08133d) ;
    - son changement de type efface etage, lm, etiqAvec et etiqTitre (toast) ; ses puces Niveau laissent un etage périmé, ignoré tant que
      niv n'est pas 'etage' ; si elle remet « Étage », l'ancien numéro revient [p].
  - v1.6.3 : un type inconnu y fait échouer la légende du plan PDF et sa fiche (lot Rejets, D11 : lu, non essayé) [p] ; seuls les
    génériques sont en cause.
  - Consigne de LISEZMOI.txt (MISE À JOUR DE L'APPLICATION, l. 226 : celle du lot Rejets, D11), complétée en m130, m131, m133 et m135 et
    reprise dans l'annonce ; croquis/LISEZMOI.txt ne décrit que la palette et la fiche. Ajouts : « avant de poser […] un « Autre
    appareil », un étage précis, un lave-mains ou une étiquette commune » et « Une tablette pas à jour y montre un « Autre appareil »
    comme un objet inconnu, ni compté ni jugé ; dès l'ouverture du Constat, elle retire du constat les lignes reprises du croquis pour ces
    appareils et, à l'ouverture du croquis, leurs anomalies que personne n'a modifiées ; sur une tablette à jour, les anomalies
    reviennent, les lignes par « Reprendre du croquis ». Un WC + lave-mains y paraît « WC », ses anomalies réécrites « WC : … » ; un étage
    précis y paraît « étage » ; une étiquette commune y est séparée. » Puis, une fois : « N'y signez aucun constat de ces dossiers. »
- D9 Croquis désactivé ou absent : comportement de la v1.5.1.
  - En dépendent : la boîte « Autre installation EU/EP » et ses puces (AUTRES_SUGG, IX:1909 ; IX:4139), le rangement des anomalies
    (anomRows IX:1995, ROW_KW IX:1974 avec l'exception m96 : lavabo → Évier), le formulaire et son PDF (constatRowsForPrint, IX:2908 ;
    « Autres : », IX:2999).
  - Ce lot n'y touche pas, sauf les puces de E2 si la réponse est (a) ou (d) (exception à la règle, comme m96). IX ne lit ni niv, ni etage,
    ni lm, ni nom ; vcApparier, constatDepuisCroquis (IX:3630) et vcEcarts (IX:3726) sont gardés par vcPret. Les anomalies déjà au
    dossier restent telles quelles.
- D10 Points de contact avec le lot Rejets. Ordre : tout le lot Rejets (m119 à m129) d'abord, puis m130 à m135, chacun sur la branche à jour.
  - constatDeduit et lignes « Autres » : m119 (rows[].arbitrer), m122 (dispersion dans le sol), m123 (« Autres : Drain » des drains de
    collecte, source par srcObj), m125 (case des destinations, raccInfo). m119 doit marquer aussi les lignes « Autres » : il trouve la
    ligne de la source comme ligneDe, qui ne lit que les lignes std (CJ:1622-1625) [p] ; sinon m132 l'étend (test g6). Ensuite m131 et
    m132 : ligne(o) lit l'objet que srcObj désigne ; libDe ne lit p.nom que d'un type nomLibre (celui d'une destination reste à destDe).
  - Lecteurs de srcObj (m123) : libDe, libNiv et libObj (CJ:1335) reçoivent l'objet qu'il rend (le point « Drain » d'un drain de
    collecte), jamais idxA[id] ni an.objs[id], page 2 du PDF comprise (CJ:6027, 6029, 6045) ; m130 et m131 (tests n3, l4).
  - IX : vcResumeCalc (IX:3562) : m116 (recup), m119 (arbitrer) ; ce lot n'y touche pas (sans nom : D4). constatDepuisCroquis et vcEcarts :
    m116 (cases EP, fait), puis vcApparier en m132.
  - texteEtiquette : m122 (« Dispersion dans le sol »), m125 (p.nom d'une destination). placerEtiquette n'y est qu'appelée (m118, fait ;
    m122 par apresProp). Ensuite m130, m131 et m132 ajoutent libNiv et libDe après le test de p.etiq ; m134 teste le groupe avant lui
    (D6) ; m135 replace le porteur.
  - planValide : m126 (réparation bornée à 'exutoire', D8) ; rien dans ce lot.
  - ficheHtml et le clic : m118 (fait), m121 (fiche du tronçon), m127 (fiche des destinations, nom « puits » refusé, changement de type).
    Ensuite m130 extrait changerType avec les règles de m127 ; m131, m133 et m135 complètent la fiche.
  - defautsPt : m125 ('exutoire'), puis m132 ('autre_eu', 'autre_ep').
  - Rendu : m126 (blocs VEDE_EXUTOIRE_ + ab, légende par nom et ab, symboleSvg(t, taille, p), échappement DXF), réutilisé par m132.
  - Générateur (tests/vm/generateur.js) : options exutoires (m118, m128) et drains (m124), puis `sources` (m132, SOURCES l. 12 par défaut)
    et `champs` (m134 : niveau, lave-mains, nom), sans tirage de plus quand elles manquent, comme `exutoires` (l. 16-20) [p]. Elles ne tournent
    que sans --contre (aleatoire.js:86) et dans vm/equipements.js : une version d'avant m132 lirait un générique comme un type inconnu ;
    compat.js ne les prend pas.
  - vm/compat.js : sortie « constat » de m116 gardée à 245/245 sans régénération ; les deux lots n'y touchent que le commentaire des
    options du générateur (l. 10, 92).
  - Plus tard : le souhait 9 (cadrage l. 299) touchera constatDeduit et pageTableaux ; le barème du souhait 13 devra couvrir les génériques.

## Découpage (m130 à m135, numéros provisoires ; 20 correctifs depuis m116, sans fusion)
Chaque correctif est livrable seul et garde la batterie verte (`sh tests/tout.sh --navigateur`) ; garde commune : compat 245/245 et
différentiel sans écart. Les tests nouveaux vont dans tests/vm/equipements.js et tests/navigateur/equipements.js, créés en m130 et ajoutés à
tests/tout.sh (l. 14 et 19) et à tests/LISEZMOI.md. Le lot tient en six numéros ; s'il en manque (lot Rejets plus long, correctif scindé),
m135 puis m134 attendent la fusion suivante (l'étiquette commune forme un tout), ou la fusion se fait après m133.
- **m130 Niveau d'étage précis** (souhait 15 ; D1, D2, D5, D7).
  - But : « 1er étage » sur l'étiquette et au tableau, d'un toucher.
  - Fichiers : CJ libNiv ; texteEtiquette ; pageTableaux ; ficheHtml (Niveau) ; clic 'prop' ; rafraichirFiche ; changerType (extrait).
    croquis/LISEZMOI.txt (fiche) ; LISEZMOI.txt (consigne).
  - Pour l'utilisateur : puces 1er, 2e, 3e, Combles, Autre… ; « WC (1er étage) » sur le plan, « 1er étage » au tableau ; le niveau reste
    quand le type change.
  - Test : vm/equipements.js n1 : WC {niv 'etage', etage '1'} → « WC (1er étage) » (échoue avant : « WC (étage) ») ; n2 : lavabo de niv
    'zz' → « Lavabo » (avant : « Lavabo (undefined) ») ; n3 : colonne Niveau « 2e étage », « combles », « étage » ; drain de collecte
    (srcObj) : « Drain », Niveau vide, aucun « undefined » ; n4 : analyse et constat identiques avec et sans etage.
    navigateur/equipements.js e1 : puce « 2e » pressée, second toucher qui vide, « Autre… » 5 → « 5e », « abc » refusé ; Lavabo → Évier par
    le sélecteur Type : etage gardé, aucun toast.
  - Risques : étiquettes plus longues (collisions au 1/200) ; branche 'prop' partagée avec 'sens'.
  - Lot Rejets : changerType reprend le code de m127.
- **m131 WC + lave-mains** (souhait 18 ; D2, D4, D5, D7).
  - But : un WC à lave-mains intégré, dit sur le plan, compté WC seul.
  - Fichiers : CJ libDe ; libObj ; texteEtiquette ; libEquipement ; en-tête de fiche ; constatDeduit (types) ; ficheHtml (puce, aide) ;
    changerType. LISEZMOI.txt (aide, l. 127-130 ; consigne).
  - Pour l'utilisateur : puce « + lave-mains » ; « WC + lave-mains » sur le plan, au tableau et dans les anomalies ; WC 1 au constat.
  - Test : vm l1 : texteEtiquette d'un WC lm 'oui' sans niveau → « WC + lave-mains » (échoue avant : '') ; l2 : WC sur EP → « WC +
    lave-mains : rejet au réseau EP » ; l3 : constatDeduit : WC nb 1, Évier 0, types ['WC', 'Lave-mains'] ; l4 : page 2, avec un drain
    de collecte ; l5 : symbole, légende et bloc VEDE_WC inchangés. Navigateur : puce, aide, étiquette posée, second toucher ; WC → Lavabo :
    lm effacé, toast. navigateur/dossier.js : « Autres : Lave-mains » saisie à la main rappelée (avant : non), « Autres : Lavabo du WC »
    toujours.
  - Risques : une anomalie intacte change de texte quand lm change ; une tablette pas à jour la réécrit « WC : … » (D8).
  - Lot Rejets : constatDeduit après m123 et m125.
- **m132 Autres appareils (1) : type, constat, rendu**, hors palette, comme la destination de m125 (souhait 7 ; D1 à D5).
  - But : compter, juger et imprimer un appareil nommé par l'opérateur.
  - Fichiers : CJ def, defautsPt, libDe et abDe, nomRefuse, controles, constatDeduit (clé avec la nature, row), primitives, legende,
    pageTableaux, ecrireDxf. IX vcApparier, lue par constatDepuisCroquis et vcEcarts ; puce « Lavabo » selon E2. vm/generateur.js :
    option `sources`.
  - Pour l'utilisateur : rien dans l'éditeur ; un croquis qui en contient (tablette à jour, tests) est compté, dessiné et imprimé ; deux
    lignes « Autres » proches ne s'écrasent plus.
  - Test : vm g1 : deux « Bidet » et un « bidet » → « Autres : Bidet » nb 3 (échoue avant : type inconnu, aucune ligne) ; g1 bis :
    « Climatisation » EU et EP → deux lignes, chacune jugée sur son réseau (clé sans la nature : une, l'EP « non ») ; g2 : row 'wc' → WC,
    types ['Urinoir'] ; row d'un autre groupe ignoré ; g3 : sans nom → « Autres : Autre appareil » et contrôle « nom à indiquer » ; g4 :
    « Bidet (RDC) », lettres « Bi », légende « Bidet (Bi) », bloc VEDE_AUTRE_EU_BI, nom à balises échappé ; g5 : autre_ep sur le réseau EU →
    règle ep-eu ; g6 : « Bidet » conforme, anomalie saisie « Bidet : … » à arbitrer → ligne jamais « oui » (m119, étendu si besoin) ; g7 :
    nomRefuse : « Douche italienne », « WC suspendu », « Puits perdu », « Chaudière », « Lavabos » refusés, « Bidet », « Urinoir » permis.
    navigateur/dossier.js : Chaudière, Attente et ligne saisie « Chaudière et attente », dans les deux ordres de dessin : une ligne liée,
    l'autre créée (échoue avant : liée aux deux, valeur de la dernière) ; « Bidet » et « Bidet suspendu » : deux lignes ; dossier laissé par
    la v1.7.0, simulé (« Autres : Bidet » retirée, WC 1) : rappel de vcEcarts, ligne remise par « Reprendre du croquis » ; restauration d'un
    « Autre appareil » sans nom, ab « ABCD », nom de 300 caractères : nom '' gardé, aucune « Autre destination » ; PDF du constat à 20
    lignes : la table tient sur la page [p].
  - Risques : légende plus longue ; au-delà de 14 lignes, police 8 et lignes plus basses au PDF (IX:2976-2995) [p] ; renommer un générique
    déjà repris retire la ligne créée et en crée une autre, sauf retouche ; dossiers anciens (D4).
  - Lot Rejets : après m123, m125 et m126 ; g6 après m119.
- **m133 Autres appareils (2) : palette et fiche** (souhait 7 ; D7).
  - But : poser et nommer l'appareil au doigt.
  - Fichiers : CJ FAMILLES[0] et [1], ficheHtml (nom, suggestions, abréviation, EU | EP, « Compté au constat »), propTxt (CJ:5377),
    changerType (nom, ab, row), poserObjet (CJ:4098). croquis/LISEZMOI.txt (palette, fiche) ; LISEZMOI.txt (consigne).
  - Pour l'utilisateur : « Autre appareil » en fin d'« Appareils EU », « Autre ouvrage EP » en fin d'« Ouvrages EP » ; fiche ouverte sur le
    nom.
  - Test : navigateur e2 (échoue avant : pas d'outil, C.outil) : poser « Autre appareil », puce « Bidet » → étiquette et « Autres :
    Bidet » ; « Lavabo », « Douche italienne », « Puits perdu » refusés (toasts), nom rendu ; ab « BD » ; EU → EP : nom gardé, row vidé,
    toast ; « Compté au constat » WC ; « Autre ouvrage EP » seul : bouton « Rejet au sol ».
  - Risques : rang des outils (les tests choisissent par type) ; saisie au clavier sur tablette.
  - Lot Rejets : palette après m127.
- **m134 Étiquette commune (1) : texte, plan, PDF, DXF** (souhait 8 ; D6).
  - But : une étiquette pour les appareils d'une pièce, sans changer le compte.
  - Fichiers : CJ groupeEtiquette(e, an), texteEtiquette, obstaclesPlan, changerType (etiqAvec, etiqTitre). vm/generateur.js : option
    `champs`.
  - Pour l'utilisateur : rien dans l'éditeur ; un croquis qui en contient s'imprime avec l'étiquette commune.
  - Test : vm c1 : douche porteur, lavabo, WC lm au 1er → « Salle de bain (1er étage)\ndouche, lavabo, WC + lave-mains » (échoue avant :
    « Douche (1er étage) ») ; c2 : membres '' et hors des obstacles, même avec p.etiq ; c3 : autre statut ou EP → étiquette propre ; c4 :
    groupe « Projet » défait sur l'état des lieux ; c5 : niveaux différents, plus de quatre appareils ; c6 : analyse, anomalies et constat
    de même empreinte (canon) avec et sans etiqAvec ; DXF : TEXT du porteur seul.
  - Risques : collisions au 1/200 ; malentendu sur le compte (la fiche du porteur le dit).
  - Lot Rejets : texteEtiquette après m122 et m125.
- **m135 Étiquette commune (2) : mode « Réunir » et fiches** (souhait 8 ; D7).
  - But : réunir et séparer au doigt.
  - Fichiers : CJ S.reunir, tapPlan (CJ:3624), halos de la surcouche (CJ:2801), majAide (CJ:4727), ficheHtml, supprimerSel (CJ:4858),
    sorties du mode, toasts (plus de 3 m, Terminé). croquis/LISEZMOI.txt (fiche) ; LISEZMOI.txt (lavabo compté Évier, l. 127-130 ;
    consigne).
  - Pour l'utilisateur : bouton « Étiquette commune… », bandeau Terminé / Annuler, Voir et Séparer.
  - Test : navigateur e3 : douche, lavabo, WC au même niveau ; « Étiquette commune… », touchers (halos), Terminé → une étiquette et le toast
    du lavabo (échoue avant : pas de bouton) ; un Annuler rend les trois ; un EP refusé ; un appareil à plus de 3 m : toast ; Séparer, aussi
    après « Replacer les étiquettes » : étiquette du membre replacée ; porteur supprimé ; zoom pendant le mode.
  - Risques : sélection multiple nouvelle dans l'éditeur ; gestes au doigt ; une sortie du mode oubliée.
  - Lot Rejets : fiche après m121 et m127.
- Attendront la fusion suivante : la liste personnelle des Réglages et la variante « Contient » (non retenues par le cadrage) ; la
  présélection ou le bouton de E4 (b, c) ; la puce « Lavabo » si E2 arrive après m132.

## Questions qui restent
- E1 (à confirmer) Le 7 nov., vous avez retenu « Autres » par défaut ; je lis le « ne pas indiquer "autre :" » du 6 nov. comme visant le
  lavabo de m85. Je garde donc (a) sauf avis contraire : un « Autre appareil » nommé (« Bidet ») que le formulaire n'a pas va sur
  « Autres : <nom> », une ligne du formulaire de même nature au choix dans sa fiche ; sans nom, « Autres : Autre appareil » et un contrôle
  qui demande le nom. Autres voies : (b) aucune ligne tant que l'opérateur n'a pas choisi ; (c) toujours une ligne du formulaire.
- E2 Puce « Lavabo » de la boîte « Autre installation EU » du constat : elle crée « Autres : Lavabo », que le 6 nov. écarte. (a) la retirer
  partout, croquis désactivé compris ; une ligne déjà saisie reste, le libellé libre aussi ; (b) la retirer croquis actif seulement ;
  (c) la garder ; (d) comme (a), plus « Douche », « Lave-vaisselle » (comptés en Salle de bain, Cuisine) et, en EP, « Caniveau-grille »
  (Grilles) ; « Descente EP » reste : une descente de façade latérale n'a pas de ligne [p]. (a) et (d) dérogent à la règle de la v1.5.1,
  comme m96 : il y faut votre accord. Recommandation : (a). Sans réponse, elle reste.
- E3 Nom d'un « Autre appareil » qui reprend un appareil du catalogue (« Douche », « Chaudière ») ou un lave-mains. (a) refusé, avec un
  toast qui nomme l'objet à poser ; mots refusés [p] : wc, toilettes, évier, lavabo, douche, baignoire, salle de bain, cuisine, lave-linge,
  machine à laver, lave-vaisselle, siphon de garage ou de sol, grille, caniveau, descente, gouttière (ceux que le formulaire range), plus
  lave-mains, vasque, salle d'eau, bac à laver, puits ; (b) accepté et compté sur la ligne de cet appareil (« Lavabo » → Évier) ;
  (c) accepté tel quel (« Autres : Lavabo »). Recommandation : (a) : (c) contredit le 6 nov., (b) double le catalogue sans le dire.
- E4 Étiquette commune : la recommandation retenue le 7 nov. présélectionne les appareils EU à moins de 3 m et au même niveau (cadrage,
  l. 194). Je propose de m'en écarter : (a) l'opérateur touche chaque appareil ; un voisin présélectionné (derrière une cloison) pourrait
  être validé sans avoir été vu, contre le 6 nov. ; un toast signale un appareil à plus de 3 m du porteur. (b) la présélection, à retirer
  d'un toucher ; (c) un bouton « Proposer les voisins ». Recommandation : (a) ; (b) ou (c) attendraient la fusion suivante.
- E5 (à confirmer) Note métier du cadrage (l. 223) [p] : la puce « + lave-mains » ne vaut que pour un lave-mains intégré au WC ; un
  lave-mains raccordé à part se dessine en Lavabo, compté Évier. L'aide de la fiche et le LISEZMOI le disent. Est-ce votre pratique ?
