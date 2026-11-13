# Conception du lot « Rejets » (v1.7.1, souhaits 2, 3, 4)

Établie le 8 nov. 2026 sur 52cd3c8 (code de la v1.7.0), point de départ de m116 ; révisée le 13 nov. (puits NC, puis relecture). PR #12 fusionnée le
13 nov. (b08133d). Lignes citées : celles de 52cd3c8 (3dda49b n'y change que le numéro 1.7.1) ; m116, reporté sur la branche le 13 nov., les décale :
chercher par nom de fonction. Détail du code : cartes du carnet (`carte-*.md`, du 8 nov. : le puits y est encore « à arbitrer »). [p] = présomption à
signaler à l'utilisateur. CJ = croquis/croquis.js, IX = index.html ; vm/ et navigateur/ sont sous tests/.

## Réponses de l'utilisateur (7 et 13 nov. 2026)
- Décision du 13 nov., mot pour mot : « Un rejet EP dans un puits est une non conformité. » (`.claude/etat-travaux.md`, l. 8 ; CLAUDE.md, l. 17). Elle
  remplace « à arbitrer » par défaut pour les EP vers un puits (7 nov.) : le modèle « Puits » est NC (D3, D6). Présomptions qu'elle fait naître, à
  soumettre à l'utilisateur : une autre destination part « à arbitrer », sauf un nom qui commence par « puits » (D3, D10) ; le plan conclut alors « À
  compléter » (code 'exu', Q1) ; le jugement suit la fiche, pas le nom (D10) ; jugement du puits modifiable, puits perdu en « Puits » (Q5).
- Recommandations du 7 nov., retenues sauf avis contraire (`.claude/etat-travaux.md`, l. 10) :
  - EU vers une destination ajoutée : toujours NC (le champ p.eu du cadrage disparaît) ;
  - EP infiltrées au sol : conformes ;
  - barème à 4 choix par anomalie standard (NC, réserve, à arbitrer, pas d'anomalie), copié dans chaque croquis : le jugement des EP d'une destination
    (D3) prend ces 4 choix ; le barème lui-même n'est pas dans ce lot.
- Autres questions : recommandations du cadrage (`.claude/cadrage-v170.md`, l. 108-171). Principe (l. 110) : tout réglage qui change un jugement est
  copié dans le croquis, jamais relu dans les réglages. Ne changent pas : codes, symboles et libellés existants, formulaire du constat, anciens
  croquis, constat signé, croquis désactivé (D12).

## Décisions du lot
- D1 Table commune des exutoires (correctif A du cadrage).
  - `EXU`, près d'EXU_LIB (CJ:767), une ligne par code (INF, GARG, MILIEU ; SOL en m117), donne le libellé du rejet (celui d'EXU_LIB, mot pour mot),
    la famille de couleur et de calque (EP), la règle EU (clé, texte, préconisation, codes, nc, cat : CJ:1322-1324) et la place au constat en EU et en
    EP (code, libellé, case EP_RECUP : CJ:1692-1693).
  - codeExu(res) : la partie de res avant le premier « : », sinon res. Pour une destination, terminal rend une clé (D5), pas 'X' : toute lecture de la
    table s'écrit EXU[codeExu(res)], car EXU[res] ou `res === 'X'` échouent toujours (un WC relié à un puits serait sans anomalie : sonde
    `revision-cle-wc.js`). La clé ne se découpe pas plus loin (un nom peut contenir « : ») : nom et jugements se lisent dans an.exu[clé].
  - resTrace(res) : 'EP' si EXU[codeExu(res)] existe, sinon res ; elle remplace les trois copies du test (CJ:1244, 1256, 1287).
  - Lecteurs d'un res venu de terminal (CJ:960, grep) :
    - clé entière : nets, gests, resObj.res (CJ:1193, 1249 : deux destinations font « multiple »), libExu, gestDe (CJ:1115 : 'D', comme INF) ;
    - code : resTrace, règles EU (CJ:1320-1324), ep-exu (D6) et raccInfo (CJ:1691-1693), qui lisent aussi an.exu[clé] pour une destination (raccInfo
      la reçoit en paramètre) ;
    - réseau seul, rien à changer une fois CJ:1256 corrigée : regards, « contredit », boitesConstat, resLigne, étiquette du regard, couleurPt, tuyau,
      DXF, avant-projet (CJ:1341, 1394, 1757, 1775, 1805, 1849, 2153, 5726, 6060, 5919) ; collecteurs (t.col), final et terminalCollecteur ne lisent
      aucune clé ;
    - IX : rien (resObj, resPiece, resPt : 0 au grep) ; il ne voit que les codes RACC, epRecup et boitesConstat (D7, D12).
  - libExu(res, an) remplace `EXU_LIB[x] || x` (CJ:1379, 1396, 4783, 5935) : EXU_LIB pour un réseau, an.exu[clé] pour une destination, sinon
    EXU[codeExu(res)].
  - raccInfo (CJ:1686) rend aussi `recup`, la case EP_RECUP (IX:1912) ; `puisard: true` reste rendu pour INF. VC.EXU et VC.libExu sont exposés pour
    les tests [p].
  - couleurPt rend toujours la référence RES.EP.rgb (une copie donnerait la couleur 7 au DXF) ; EXU_LIB garde les réseaux (EU, EP, UN).
- D2 Infiltration au sol (souhait 3).
  - `def('infiltration', {fam:'exu', lib:'Infiltration au sol', g:'f', role:'exutoire', forme:'infiltration', exu:'SOL', droit:true})`, après le
    puisard (CJ:806) ; dans FAMILLES 'equ' (CJ:816), juste après 'puisard'. g : « posée » au panneau des cotes (CJ:4312).
  - EXU.SOL : « infiltration au sol », famille EP, case 'infil' (« Infiltration diffuse », IX:1912).
  - `droit` : symbole droit sur le papier ; type non « orienté » : pas de rotation dans la fiche (CJ:4865), pas de p.a à la pose (CJ:4053).
- D3 Destination ajoutée (souhait 2).
  - Un seul type : `def('exutoire', {fam:'exu', lib:'Autre destination', g:'f', role:'exutoire', forme:'exutoire', exu:'X'})`.
  - L'objet porte une copie complète de sa définition (cadrage, l. 114) :
    - p.nom : « Puits », 40 caractères au plus [p] ; absent, autre qu'un texte ou blanc : « Autre destination », article « l' » ;
    - p.ab : 2 ou 3 caractères, « Pu » ; vide : les deux premiers caractères du nom (« Au ») ;
    - p.art : 'le', 'la' ou 'l'' (sinon 'le' [p]), pour les textes (« dans le puits », « dans l'étang »), jamais pour la clé ;
    - p.ep, jugement des EP : 'conforme', 'reserve', 'nc' ou 'arbitrer' ; sinon 'nc' si le nom normalisé (D5) commence par « PUITS », 'arbitrer' pour
      tout autre, comme « + Nouvelle destination » (D10) [p] ;
    - p.cst, case du constat en EP : 'MILIEU' ou 'GARG' (colonnes fixes), 'puisard', 'recup', 'infil' ou 'autre' (cases EP_RECUP ; sinon 'autre' [p]).
  - destDe(o) applique ces replis pour tous les lecteurs (clé, an.exu, textes, fiche, PDF, DXF ; sonde `sonde-c8-c12-doc.js`). La fiche et « +
    Nouvelle destination » refusent un nom vide (toast, valeur rendue, comme le texte libre, CJ:5274).
  - defautsPt('exutoire') (CJ:821) : le modèle « Puits », {nom:'Puits', ab:'Pu', art:'le', ep:'nc', cst:'autre'} (ep : décision du 13 nov. ; case
    'autre' : puits perdu ou ancien puits d'eau, présomption du cadrage ; un puits perdu en « Puits », pas en « Puisard » [p] : Q5).
  - Modèles de la tablette : meta croquisConfig.exutoires (IX:3146-3147) ; « Puits » d'office tant que la liste est absente. Un modèle ne sert qu'à la
    pose : le changer ou le retirer [p : Q5] ne touche aucun objet posé. Hors sauvegarde (IX:4442 n'emporte pas meta ; cadrage, l. 130-132) : chaque
    objet garde sa copie, et le transport coûterait un correctif. LISEZMOI.txt (m125) : « Des eaux pluviales rejetées dans un puits sont non
    conformes. Les destinations ajoutées restent sur la tablette : la sauvegarde ne les emporte pas. Un puits déjà posé garde son nom et ses jugements
    sur toute tablette. » Labo et hôte : m125.
- D4 Drain (souhait 4).
  - Un drain est un tronçon 'tr' qui porte p.drain = 'collecte' ou 'infiltration' ; pas de nouveau type de ligne. Les outils le tracent sans réseau
    (p.res '', comme l'outil « Tronçon » ; le cadrage, l. 155, le voulait EP : Q3) : son réseau vient de l'exutoire atteint (resPiece, CJ:1259).
    Peigne, ligne de légende et calque VEDE-DRAINS suivent p.drain seul. Les puces Réseau de la fiche restent ; EP y présume le réseau EP au bout
    libre (CJ:1210-1220). Elles ne touchent pas p.drain, même en EU (ep-eu, D6) : seul « Drain : non » le retire.
  - defautsLn (CJ:832) recopie o.drain pour ces deux valeurs seulement : un tronçon sans drain garde exactement ses clés.
  - La source reste le point « Drain » (CJ:797 : source EP ; constat : D10). Le drain d'infiltration mène à une infiltration (D2) : un point « Drain »
    qui porterait ty.exu serait terminal à distance 0, son aval jamais suivi (CJ:972-973).
  - Fiche du tronçon : puces « Drain : non, collecte, infiltration » (cadrage, l. 155). Statuts « projet » et « à supprimer » : comme un tronçon.
- D5 Analyse.
  - terminal (CJ:960) : pour le code X, `res` = 'X:' + nom normalisé (majuscules, sans accents, espaces réduits) + ':' + ep + ':' + cst (le puits :
    'X:PUITS:nc:autre'). Ni ab ni art n'entrent dans la clé [p]. Même nom et mêmes jugements : un seul exutoire (état ok). Sinon deux (état multiple,
    CJ:1379) ; à deux noms égaux, ce message ajoute le jugement des EP, à défaut la case : « (puits (non conforme), puits (conforme)) ».
  - an.exu : table clé → {nom, ab, art, ep, cst}, remplie dans l'ordre des identifiants, pas du dessin. Elle n'existe que si le plan porte une
    destination ajoutée : un ancien croquis ne reçoit aucune clé nouvelle (vm/compat.js hache tout an).
  - SOL est un code simple, comme INF. Un drain n'a de règles propres que le contrôle de ses bouts et celle du regard (D10, selon Q3) ; l'analyse le
    voit sinon comme tout tronçon (sans réseau d'office, D4).
- D6 Règles d'anomalies (reglesAnomalies, CJ:1306 ; règles EU, CJ:1319-1324).

  | Destination | Source EU (toujours NC, cat 'inversion') | Source EP |
  |---|---|---|
  | Infiltration (SOL) | `eu-sol:<id>` « WC : rejet au sol (infiltration) » ; préconisation « Suppression du rejet au sol et raccordement au branchement EU » ; codes ['suppMilieu'] | aucune anomalie |
  | Destination (X) | `eu-exu:<id>` « WC : rejet dans le puits » (article et nom de l'objet, initiale en minuscule [p]) ; préconisation « Suppression du rejet dans le puits et raccordement au branchement EU » ; codes ['raccEUsep'], comme eu-inf (la case MILIEU du constat ajoute suppMilieu, IX:2010) | `ep-exu:<id>` si p.ep n'est pas 'conforme' (NC pour le puits, 13 nov.) : « `<libellé de la source>` : rejet dans le puits » [p] ; préconisation « Suppression du rejet dans le puits ; raccordement au branchement EP ou gestion à la parcelle » en 'nc' (article et nom de l'objet), sans « Suppression… » sinon [p] ; codes ['gestEP'] |

  - ep-exu selon p.ep : 'reserve' → réserve (nc false) ; 'nc' → NC ; 'arbitrer' → arbitrer:true, comme sansboite (CJ:1335). Retenue, elle est NC par
    défaut, comme sansboite (vm/regles.js:52), et sa nature reste modifiable (decisions.nc, CJ:5166). Un jugement des EP changé efface ces décisions
    (D10).
  - Puits (modèle 'nc', 13 nov.) : ep-exu NC, retenue d'office et créée au dossier (it.creer, CJ:1526) ; « Non conformes » au plan (CJ:1434) ; ligne
    de la source « non » au constat (REGLES_LIGNE, CJ:1590 ; IX:2030) ; préconisation et case gestEP (IX:1917, 2019-2020) ; fiche de la source en 'ko'
    (CJ:4785) ; aucun contrôle 'manque'.
  - À arbitrer (jugement de la fiche, ou repli de D3), elle donne aussi un contrôle 'manque' « Descente EP : rejet dans l'étang à arbitrer (retenir ou
    écarter l'anomalie) » [p], comme la fosse (CJ:1382), et met la fiche de la source en 'att' (etatSource, CJ:4784), faute de quoi seule la liste « À
    arbitrer ou écartées » la montre (CJ:4981 ; sonde `sonde-c4-c6-arbitrage.js`). Le plan conclut alors « À compléter : rejet des EP à arbitrer »
    (recommandation (b) de Q1 [p]) : code CONCL 'exu' [p], testé après 'fosse' (CJ:1441, 1676-1678). Seul le plan change : le constat laisse la ligne
    sans conformité (D7) et le rappel avant signature la signale (IX:3746).
  - ep-exu est en cat 'autre', comme la fosse : des EP dans un ouvrage des EP ne sont pas une inversion EU / EP. La catégorie suit l'anomalie au
    dossier (CJ:1597) et à l'export Excel (IX:4238). L'avant-projet (CJ:5914 : cat 'inversion' ou /^fosse:/) la garde par sa clé : /^(fosse|ep-exu):/.
  - REGLES_LIGNE (CJ:1452) reçoit eu-sol, eu-exu et ep-exu : une anomalie NC retenue rend « non » la ligne de sa source au constat, une réserve non
    (IX:2030).
  - Drains : le point « Drain » donne ep-eu s'il rejoint l'EU (CJ:1326) ; des EU dans un drain d'infiltration donnent eu-sol.
  - Règles métier inchangées : descente non visitable, tampon béton, siphons, fosse hors fonction grâce à un by-pass. Le regard suit l'exutoire, pas
    l'appareil [p] : un WC relié par un regard au tampon béton à une infiltration ou à un puits donne « Regard EP : tampon béton » en réserve, comme
    aujourd'hui vers un puisard (sonde `relecture2-sonde-regard-eu-exu.js`) ; eu-sol ou eu-exu reste NC.
- D7 Constat (raccInfo, CJ:1686 ; constatDeduit, CJ:1702 ; formulaire inchangé).
  - SOL : en EU, {code:'MILIEU', ok:false, lib:'Infiltration au sol : rejet au sol (milieu naturel)'} ; en EP, {code:'', recup:'infil', ok:true,
    lib:'Infiltration au sol (infiltration diffuse)'}. X en EU : toujours {code:'MILIEU', ok:false, lib:'Puits : rejet en milieu naturel'} (cadrage,
    l. 129) ; p.cst ne sert qu'en EP. [p : libellés, sur le modèle du puisard, CJ:1693.]
  - X en EP :
    - exuArbitrage(doc, an, id) : '' sans ep-exu:<id>, sinon 'arbitrer', 'ecartee' ou 'retenue' (decisions.st, puis a.arbitrer : CJ:1417-1418), pas
      a.douteuse (fosseArbitrage, CJ:1366, rendrait 'retenue' sans décision) ; raccInfo la reçoit à part (arb 'retenue' y vaut FOSSE, CJ:1688) ;
    - code MILIEU ou GARG si p.cst l'est, libellé RACC_LIB (comme CJ:1692) ; sinon code '', case recup = p.cst, libellé « Puits (rejet des EP) » (nom
      de destDe) [p], comme le puisard (CJ:1693) : sans libellé, le panneau écrirait « à préciser » (CJ:4990) ;
    - ok, jamais d'après p.ep : '' ou 'ecartee' → true ; 'retenue' → null : la ligne suit alors l'anomalie du dossier (IX:2030 : NC → « non », ainsi
      le puits ; réserve → raccOk), dont la nature se change aussi au dossier (IX:1563, 1576) à l'insu de doc.decisions (seule écriture : IX:3176).
      Avec ok false, une réserve choisie au dossier laisserait le rappel « non conforme sur le croquis » (IX:3724) ;
    - à arbitrer : {code:'', ok:null, lib:'Étang : rejet des EP à arbitrer'} (nom de destDe), sans case, comme la fosse (CJ:1690) [p] : la ligne ne
      paraît jamais conforme avant la décision (raccOk, IX:1957).
  - constatDeduit (CJ:1715) : `recup[ri.recup] = true`. Un ancien croquis garde epRecup {puisard:true} ou {} (sortie « constat », m116).
  - IX, constatDepuisCroquis (IX:3617) : P.puisard reste la marque de la case puisard (IX:3655-3658), pour une tablette pas à jour ; les cases recup,
    infil et autre suivent la même règle dans P.recup = {case: true} : cochée d'après le croquis, la case le suit tant que personne n'y touche.
    Changement de plan (IX:3622) : P.recup effacé avec P.puisard. Restauration (IX:4540) : 'recup' en liste blanche, filtré par vcProvenance (IX:3604)
    comme P.boite (clés d'EP_RECUP hors 'puisard', valeurs true).
  - vcResumeCalc (IX:3564) : r.puisard inchangé ; r.recup = les autres cases cochées, s'il y en a.
  - vcEcarts (IX:3727) : un rappel par case, comme celui du puisard : « Infiltration diffuse : sur le croquis de terrain, non cochée au constat
    (ouvrages de récupération des EP). » Celui « à arbitrer » (IX:3746) couvre ep-exu.
  - Panneau (CJ:4995) : « Ouvrages de récupération des EP : puisard, infiltration diffuse » ; avec le puisard seul, le texte d'aujourd'hui. La note de
    CJ:4997 dit « (réseau privé, puisard, infiltration ou autre destination des EP) » (m117) : ces lignes n'ont pas de code au formulaire, raccOk rend
    null (IX:1957) et l'hôte ne reprend jamais la conformité (IX:3555-3559).
  - Inchangés : constat signé (IX:3618, 3707), saisie à la main, D12.
- D8 Rendu à l'écran et au PDF.
  - Couleur : SOL et X sont dans la table, lue par codeExu (D1) : tuyau vert, étiquette verte, ligne « Canalisation EP » à la légende. Sans codeExu :
    tuyau gris sans légende, regard en amont hors EP (sonde `revision-cle.js`).
  - Symbole « Infiltration au sol » (primitives, CJ:1854) [p : cotes à régler sur l'A4] : `cercle(2.1, {fond: BLANC, masque: true})` sur le bout du
    tuyau ; tige (0 ; 2) → (0 ; 0,4) et trois barres de demi-largeur 1,8, 1,15 et 0,5 aux y 0,4, −0,5 et −1,4, en `poly` à `{trait: rgb, ep: .3}`
    (sans trait : invisibles à l'écran, CJ:2108, trait d'avant au PDF, CJ:5583) ; rayonSymbole 2,1 (CJ:1843 ; défaut 1,6).
  - angleSymbole(e, rot) rend 0 pour un type `droit`, sinon la formule d'aujourd'hui : écran (CJ:2171), aperçu de pose (CJ:4444), PDF (CJ:5743). Au
    DXF, rien ne change : l'INSERT d'un type non orienté prend déjà rotDeg (CJ:6076), droit sur le papier (carte B).
  - Destination : hexagone vert qui porte p.ab, rayon 2,1 [p] ; symboleSvg(t, taille, p) (CJ:2477) reçoit p (palette, fiche). Étiquette
    (texteEtiquette, CJ:1799) : T.lib, comme les autres exutoires ; p.nom pour une destination.
  - Légende (CJ:5850-5866) : « Infiltration au sol » vient d'elle-même ; une ligne par destination, « Puits (Pu) », comme « Rejet en milieu naturel
    (MN) » [p : le cadrage écrivait « Pu : puits »] ; « Drain » et « Drain d'infiltration » en lignes de motif, comme « Tracé présumé (tirets) »
    (CJ:5867) : échantillon gris à peigne, une par sorte présente, quel que soit p.res [p : rang]. Le drain garde la ligne de son réseau (resLigne,
    CJ:1775-1785) : « Canalisation EP », ou « Réseau non déterminé » sans exutoire.
  - Peigne : une dent d'environ 0,4 m tous les mètres réels [p], dans la couleur du trait de la pièce. À l'écran, une fonction nouvelle près de
    CJ:2157 (hachures(), CJ:2081, ne change pas) ; au PDF, après les hachures « à supprimer » (CJ:5731-5733). Collecte ou infiltration : Q2.
  - Par libExu : fiche (CJ:4783), « Rejet : infiltration au sol », « Rejet : puits » ; page 2 du PDF, colonne « Rejet constaté » (CJ:5935), le libellé
    seul (« puits »), puis « · anomalie n° … » (CJ:5937).
  - Le jugement des EP n'est ni au symbole, ni à la légende, ni au DXF : le puits NC se lit au PDF par « Non-conformité » au tableau « Anomalies et
    préconisations » (CJ:5928-5931), son numéro en page 2 et la conclusion (CJ:5944).
- D9 DXF (ecrireDxf, CJ:5962).
  - Blocs (un par symbole employé, CJ:6000-6008) : VEDE_INFILTRATION vient de lui-même, la boucle sautant les primitives `masque` (sinon un disque
    plein vert couvrirait le symbole ; le test lit ce drapeau, pas BLANC : le disque blanc de la descente est figé). Destinations : un bloc par texte
    p.ab, VEDE_EXUTOIRE_ + ab en A-Z, 0-9 et _ (« Ét » → VEDE_EXUTOIRE_ET), 31 caractères au plus (R12), suffixe _2, _3 si deux ab donnent le même nom
    ; texte par dxfTxtSortie (CP1252). INSERT (CJ:6076) sur VEDE-SYMBOLES, couleur 3 (EP).
  - Drains : calque VEDE-DRAINS, déclaré seulement s'il sert, comme VEDE-ESCALIERS (CJ:5977). La polyligne y garde la couleur de chaque pièce en 62
    (mc.res, CJ:6057-6061 : grise, en tirets VEDE_PRESUME, tant que l'exutoire manque), comme VEDE-A-SUPPRIMER. Dents en LINE ; ligne(a, b, cal)
    (CJ:6034) reçoit une couleur facultative. Le statut prime [p] : un drain « projet » reste sur le calque du projet, un drain « à supprimer » sur
    VEDE-A-SUPPRIMER, dents comprises.
- D10 Gestes de l'éditeur.
  - Palette « Équipements et exutoires » : …, Puisard, Infiltration au sol, Gargouille, Rejet en milieu naturel, une ligne par modèle de destination
    (« Puits » d'office), « + Nouvelle destination ». PALETTES est figé au chargement (CJ:2545-2550) : ouvrirPalette (CJ:4605-4618) ajoute à chaque
    ouverture les items 'pt:exutoire:<id>', dont nom, symbole et état actif viennent du modèle, pas de T ni du type seul (CJ:4610). <id> est tiré par
    l'application, sans « : » ni guillemet (data-item non échappé, CJ:4613), jamais le nom ; le clic passe q[2] (CJ:4621-4622) ; choisirOutil
    (CJ:4596) garde le modèle (S.outil.modele).
  - Les deux poses copient ce modèle, sinon defautsPt : poserObjet (CJ:4050) et « Cotes » (aide de l'outil, CJ:4647), dont S.cotes.pour le garde ({t,
    modele} : CJ:4183) pour poserParCotes (CJ:4366) et l'aperçu (CJ:4441). L'aide (CJ:4646), le titre des cotes (aideCotes, CJ:4298) et le panneau
    (cotesHtml, CJ:4309-4312) donnent son nom (« posée » si p.art est 'la' [p]). Sans cela, un « Étang » posé par cotes deviendrait « Puits », NC
    créée au dossier (sonde `contre-verif-cotes-modele.js`).
  - « + Nouvelle destination » ouvre une fiche courte (nom, abréviation, article, jugement des EP, case du constat), au départ nom vide, abréviation
    tirée du nom, « le », « à arbitrer » (à trancher dans le croquis, Contrôles), « autre » [p] ; tant que le jugement n'est pas choisi, un nom qui
    commence par « puits » le met à « Non conforme », comme le repli (D3) [p]. Elle enregistre le modèle et arme l'outil. La fiche d'une destination a
    les mêmes cinq champs, un pas d'annulation chacun ; celle du puits garde les quatre jugements (barème du 7 nov. ; Q5) [p]. Le jugement suit la
    fiche, jamais le nom [p] : un puits renommé « Étang » reste NC ; passé en « Autre destination », un exutoire devient « Puits » NC (ci-dessous).
  - Changer le jugement des EP retire, dans ce pas, les décisions du croquis (écartée, nature) des ep-exu des sources qui y aboutissent [p], ce que la
    fiche dit : sinon un rejet écarté « à arbitrer » le resterait en « non conforme » (la décision suit la clé de la source, CJ:1417-1419). Relier la
    source ailleurs garde la décision, comme toute anomalie ; une nature choisie au dossier reste (l'enregistrement retouché fait foi, CJ:1450-1451).
  - Changement de type (CJ:5276-5287) : vers « Autre destination », p = defautsPt (« Puits ») ; a, meth, niv, obs, st et etiq restent.
  - Bouton « Rejet au sol » (souhait 3), dans la fiche d'une source EP (descente, grille, caniveau, siphons de sol et de cour, drain, trop-plein)
    qu'aucun tronçon ne tient. Il pose une infiltration à 1 m de la source, à l'opposé de la façade la plus proche à 3 m ou moins (areteProche,
    CJ:2927 ; calcul de la gargouille, CJ:4130-4145) ; sans façade proche, ou dans un bâti ou à 0,6 m ou moins d'un objet : essais à ±30°, ±60°, ±90°,
    enfin 1 m sous la source, vers le bas de la vue [p]. Un tronçon sans réseau (p.res '') les relie, attaché aux deux, vert par l'infiltration (D1 ;
    « À compléter » en v1.7.0, D11). Les deux prennent le statut de la source, l'infiltration est choisie à la fin [p] ; un seul pas d'annulation (un
    instantane), puis analyse, étiquette et changement().
  - Outils « Drain » et « Drain d'infiltration » : OUTILS_LN (CJ:2502) reçoit
    `drain: {k:'ln', t:'tr', p:{drain:'collecte'}, lib:'Drain', res:'INC', sous:'réseau déduit'}`, aperçu gris comme 'tr' (CJ:2503, 2785), et
    `drainInf` (p.drain 'infiltration', « Drain d'infiltration ») ; avec Q3 (b), p.res et res 'EP'. PALETTES.tr (CJ:2546) : juste après 'ln:trPrj' («
    Projet ») ; 'ln:lim' et 'ln:esc' restent voisins (navigateur/escalier.js:253-255). Icône drainSvg (CJ:4611), aide (CJ:4642-4643).
  - Point posé d'office, dans terminerTrace (CJ:4518), entre le refus du tracé trop court (CJ:4544) et analyse() (CJ:4549) :
    - collecte : un point « Drain » sur le bout libre, le départ si les deux sont libres ; infiltration : une infiltration sur le bout libre,
      l'arrivée si les deux sont libres ; aucun point si les deux bouts sont tenus, ni sur une prolongation (CJ:4536-4538) [p] ;
    - le point prend le statut du drain [p], attaché au bout, étiqueté comme dans poserObjet et marqué o.auto = true, comme un raccord du dessin
      (CJ:2348, lue sur les seuls raccords) ; un seul pas d'annulation pour les deux (l'instantane de CJ:4521) ;
    - toast « Drain ajouté » ou « Drain d'infiltration ajouté » : nomTrace(t, p) (CJ:885) lit p.drain, appelée en CJ:4556 avec l.p ; fa.lp = lf.p près
      de fa.lt (CJ:3813) pour les messages de fin (CJ:3819, 3826 : « Drain déjà terminé ») ;
    - le point « Drain » naît sans méthode (CJ:823) : « Drain : méthode de test à indiquer » (CJ:1375) paraît jusqu'au choix.
  - Prolongation (ajouterPointTrace, CJ:3792 ; terminerTrace, CJ:4536-4538) : seulement entre tuyaux du même p.drain.
  - Suppression liée (supprimerSel, CJ:4755-4759 ; cadrage, l. 155) : si un bout du drain tient un point o.auto qu'aucune autre ligne ne tient,
    demander() (CJ:4711) propose « Supprimer aussi le point posé avec le drain ? » [p] : « Les deux », « Le drain seul » ou « Annuler » ; un seul pas
    d'annulation. Jamais un point posé à la main, qui emporterait méthodes, observation et anomalies saisies (CJ:2390). Changer p.drain dans la fiche
    ne pose ni ne retire de point [p] ; pas d'étiquette propre au drain [p].
  - Constat : seul un point « Drain » compte, sur la ligne « Autres : Drain » (ty.autre, CJ:797, depuis la v0.1.0 ; le 6 nov. n'a ôté que « Autres :
    Lavabo », ffe3ec1). Un drain sans point (entre deux objets, ou passé en drain par la fiche) : Q4.
  - Contrôles (CJ:1399-1405) : aucun « Tronçon : extrémité libre » sur un drain (cadrage, l. 155). Sans réseau, son aval libre reste signalé par la
    source (« exutoire non dessiné », CJ:1378) et « À compléter » (CJ:1439) ; en EP : « ok, EP présumé », « Conformes » (sonde `revision-drains.js`,
    cas 1 et 1b).
  - Regard sur un drain sans réseau ni sortie : jamais un exutoire (CJ:960-962), il reste INC (CJ:1290) et se juge en EU ; un tampon béton ou « sans
    cunette » y est NC (CJ:1342-1348) et « Non conformes » passe avant « À compléter » (CJ:1434, 1439), comme aujourd'hui sur un « Tronçon » (sonde
    `contre-verif-regard-drain.js`). Avec Q3 (a), un regard INC dont toutes les pièces (an.adj) sont des drains est jugé EP pour ces deux règles
    seulement [p] : « Regard : tampon béton » en réserve, pas de « sans cunette ». Un drain suivi d'un « Tronçon », ou un ancien croquis, garde la
    règle d'aujourd'hui (sonde `sonde-r2-regard-drains.js`).
- D11 Compatibilité.
  - doc.v reste 1. Tout champ nouveau est facultatif : p.drain ; p.nom, p.ab, p.art, p.ep, p.cst ; P.recup ; croquisConfig.exutoires. Un croquis de la
    v1.7.0 s'ouvre et s'analyse à l'identique ; aucun champ nouveau n'y est écrit tant qu'on ne touche pas l'objet.
  - Garde à valeurs figées (vm/compat.js, 35 croquis, SORTIES l. 28), verte à chaque correctif. m116 y ajoute une sortie « constat » (constatDeduit de
    l'état des lieux : rows, epRecup, sansCote), que rien ne fige aujourd'hui. Régénération une seule fois, sur une copie de 52cd3c8 (git archive),
    dont les cinq sorties sont celles de 1e27c7b (210/210) :
    `node tests/vm/compat.js --app=<copie> --regenerer="1e27c7b (v1.7.0, m97) ; constat : 52cd3c8"`. Elle ne liste aucun changement (une sortie
    nouvelle n'en est pas un, compat.js:152) ; ensuite 245/245 (35 × 7).
  - Différentiel du cadrage (l. 110), en m116 : `node tests/vm/aleatoire.js 8000 --contre=<copie de 52cd3c8>` (option nouvelle, par charger({dir}),
    vm/charger.js:14-16) compare chaque croquis dans les deux modes (aleatoire.js:63) : résultat par source, anomalies, conclusion, contrôles, constat
    déduit. Aucun écart attendu (il voit les glissements des sondes `sonde-m10-*.js`). Relancé contre le commit d'avant, générateur sans ses options
    nouvelles, en m117, m121 et m122.
  - Un croquis nouveau lu par une v1.7.0 (sondes `contre-verif-d11-*.js`, `revision-drains.js`) ne fait aucun échec : types inconnus gardés (m106,
    croquis/LISEZMOI.txt:23), dessinés en neutre, bloc VEDE_OBJET. Leur nœud devient un bout libre (CJ:932, 937), jugé selon le tronçon qui y mène
    (CJ:1210-1220) : sans réseau (« Tronçon », drains, « Rejet au sol »), « À compléter » ; Tronçon EP, EU ou unitaire, raccordement présumé à ce
    réseau (en EP, descente conforme et « Réseau EP départemental (présumé) : oui » ; en EU, WC conforme ; en unitaire, les deux ; sinon eu-ep ou
    ep-eu), jamais eu-sol, eu-exu ni ep-exu. À l'ouverture (synchroniser, CJ:2637-2642), elle retire du dossier ces anomalies restées intactes
    (CJ:1535-1536 ; copieRetrait, CJ:1568) ; avant, le dossier les garde (« Non conformes », constat « non » : sonde `sonde-puits-d11-telquel.js`) ;
    une anomalie retouchée reste, orpheline ; en v1.7.1, le dessin les rend telles quelles, même id (CJ:1599-1611). Un drain y est un tronçon sans
    peigne ni légende ; sans sortie, son regard y suit la règle d'aujourd'hui (NC) ; p.drain reste dans le fichier [p]. P.recup y est effacé à la
    restauration (IX:4540 : case cochée, sans suivi) ; croquisConfig y est réécrit sans les modèles (IX:3147) : un retour en arrière les perd [p].
  - Une v1.6.3 (en ligne) analyse de même (sondes sur une copie de 22df7f2). Un type inconnu y fait échouer la légende du plan PDF (`T[e.t].lib`,
    croquis.js:4329 de la v1.6.3) et sa fiche (`ty.role`, l. 3439) [p : lu, non essayé] ; un drain seul passe.
  - Risque qui reste : un Tronçon EP, EU ou unitaire tracé à la main vers une infiltration ou une destination ; un constat signé sur une tablette pas
    à jour le garde (IX:3618). Consigne de LISEZMOI.txt, MISE À JOUR DE L'APPLICATION (m117, complétée en m119 et m125), reprise dans l'annonce de la
    v1.7.1 (corps de la PR) :
    « Mettez à jour toutes les tablettes avant de poser une infiltration au sol, une destination ajoutée (puits…) ou un drain, et avant d'échanger une
    sauvegarde ou un dossier qui en contient (la version se lit au pied du plan PDF). Une tablette restée en v1.7.0, ou plus ancienne, ne connaît pas
    ces objets : un « Tronçon EP », « Tronçon EU » ou « Tronçon unitaire » qui y mène y est présumé raccordé à ce réseau. Une descente vers un puits,
    un WC vers une infiltration, non conformes sur une tablette à jour, y restent non conformes tant que le croquis n'y est pas ouvert ; son ouverture
    retire du dossier les anomalies « rejet au sol » ou « rejet dans le puits » que personne n'a modifiées, et le plan comme le constat y paraissent
    alors conformes (« À compléter » par un simple « Tronçon ») ; elles reviennent sur une tablette à jour. Un drain y est un simple tuyau ; vers une
    infiltration, comme le bouton « Rejet au sol », il y donne « À compléter ». N'y signez aucun constat de ces dossiers : un constat signé ne change
    plus. »
    La version ne s'affiche qu'au pied du plan PDF (IX:4832, CJ:5842) [p : aucun autre affichage trouvé]. « Ou plus ancienne » attend l'essai de m125
    sur la v1.6.3 [p] : si le plan PDF n'y sort pas, la consigne le dira.
- D12 Croquis désactivé ou absent : comportement de la v1.5.1.
  - vcPret (IX:3149 : module chargé et croquis actif) garde constatDepuisCroquis (IX:3618), vcEcarts (IX:3708) et vcConstatApres (IX:3766) : P.recup,
    les rappels par case et la reprise des cases n'agissent pas. Les Réglages ne montrent « Destinations ajoutées » qu'avec le module et le croquis
    actif (IX:3529), comme les aides. vcResume (IX:3576) calcule r.recup, que seules des fonctions gardées par vcPret lisent.
  - Inchangés : RACC et EP_RECUP (IX:1904-1912), raccOk (IX:1957), precosAuto (IX:2006-2023), constatEval (IX:2025), PDF du constat (IX:2958), croquis
    simple (IX:2342, 2368), exception du lavabo (ligne « Évier », m96). croqAuto.recup et croquisConfig.exutoires restent inertes ; les anomalies déjà
    au dossier restent telles quelles.

## Découpage (m116 à m125 ; dix correctifs, batterie verte après chacun)
Ordre : le commun, sans changement visible (m116) ; l'infiltration (m117, m118), que pose le drain d'infiltration (m120) ; les drains (m119 à m121) ;
les destinations (m122 à m125), la palette après l'analyse et le rendu. Chaque test nouveau échoue sur le commit d'avant ; vm/compat.js reste vert
partout ; tests/LISEZMOI.md suit chaque test ajouté. Dès m117, poser un objet nouveau demande des tablettes à jour (D11). Les lignes du code sont dans
les décisions.

- **m116 Table commune des exutoires et suivi des cases EP du constat**, avant tout type nouveau (D1, D7).
  - Fichiers : CJ : EXU, codeExu, resTrace, libExu et leurs lecteurs (D1), règles EU, raccInfo, constatDeduit, panneau ; codeExu vient ici, pour que
    m122 n'ajoute que la clé (terminal, an.exu). IX : vcResumeCalc, constatDepuisCroquis, vcEcarts, vcProvenance, restauration (D7). Tests :
    vm/compat.js et compat.json (sortie « constat » ; en-tête, l. 8-19) ; nouveau vm/rejets.js (tests/tout.sh:14) ; vm/aleatoire.js (--contre) ;
    canevas factice, enveloppe jsPDF et lecture du DXF de vm/escalier.js (l. 310-328, 367-385, 458) déplacés dans vm/charger.js [p], le canevas
    relevant aussi fillText et fillStyle.
  - Pour l'utilisateur : rien.
  - Test :
    - vm/rejets.js a1 : V.EXU porte INF, GARG et MILIEU, avec les libellés d'EXU_LIB mot pour mot ;
    - a2 : une ligne ZZ ajoutée à V.EXU et un type d'essai qui la porte suffisent : tuyau EP (resPiece et resPt 'EP'), « Rejet : » tiré de la table,
      eu-zz pour un WC relié ;
    - a3 : le même type avec exu 'ZZ:ESSAI' (clé imitée) : mêmes résultats ; descente → regard (tampon béton, sans cunette) → type d'essai : regard
      EP, seule anomalie « Regard EP : tampon béton » en réserve, ni « contredit » ni « sortielibre » (sans codeExu : tampon et cunette NC) ;
    - navigateur/constat-boite.js cas 9 (l. 233-248) : un croqAuto avec recup {infil:true, x:1} est restauré en {infil:true} ; clés « boite, crees,
      plan, puisard, recup, refus, rows ».
  - Garde : compat.js à 245/245 avant et après le changement du code ; différentiel de D11 sans écart.
  - Risques : un libellé changé d'une lettre change l'empreinte de l'analyse ; ordre des règles EU (eu-ep d'abord, CJ:1321) ; pièges de D1 et D5 (a3).
- **m117 Infiltration au sol : type, règle, constat, rendu** (souhait 3, 1re partie du cadrage, l. 138 ; D2, D6 à D9).
  - Fichiers (CJ) : def et FAMILLES, EXU.SOL et eu-sol, REGLES_LIGNE, primitives, rayonSymbole, angleSymbole, blocs DXF (masque sauté), note du
    panneau ; croquis/LISEZMOI.txt (l. 11, 26-28) ; LISEZMOI.txt (consigne de D11).
  - Pour l'utilisateur : « Infiltration au sol » dans la palette Équipements, après Puisard ; symbole et tuyau verts. Un WC relié est NC (« WC : rejet
    au sol (infiltration) »). Une descente reliée est conforme sur le plan ; au constat, elle coche « Infiltration diffuse », raccordement et
    conformité restant à cocher à la main, comme pour un puisard.
  - Test :
    - vm/regles.js : descente vers l'infiltration (et 's=ok:SOL', a [], c 'conformes') ; WC vers l'infiltration (et 's=ok:SOL', a [['eu-sol:s', true,
      'WC : rejet au sol (infiltration)']], c 'non_conformes') ; descente vers une infiltration et un puisard (état multiple) ; par un regard au
      tampon béton (D6) : descente, a [['tampon:R', false, 'Regard EP : tampon béton']], c 'reserves' ; WC, la même réserve et eu-sol, c
      'non_conformes' ;
    - vm/rejets.js : r1 primitives (un trait sur chacune hors masque), rayon 2,1 ; r2 vue tournée de 0,5 rad : symbole droit à l'écran, au PDF et à
      l'aperçu de pose (navigateur/rejets.js n1, créé ici, tests/tout.sh:19, espion d'accroches.js:590-595), INSERT à rotDeg ; r3 bloc
      VEDE_INFILTRATION sans disque plein, INSERT sur VEDE-SYMBOLES en couleur 3, tuyau sur VEDE-EP, étiquette verte ; r4 légende « Infiltration au
      sol » une fois, « infiltration au sol » en page 2 (colonne « Rejet constaté ») ; r5 constatDeduit : case infil en EP, MILIEU non conforme en EU
      ; garde r6 : sans le type (delete V.TYPES.infiltration), écran, PDF et DXF sans exception, bloc VEDE_OBJET.
  - Risques : étiquette longue et ligne de légende de plus (débordement du cadre) [p] ; eu-sol doit paraître au contrôle de l'avant-projet (CJ:5914,
    cat 'inversion').
- **m118 Bouton « Rejet au sol »** (souhait 3, 2e partie du cadrage : le raccourci ; D10).
  - Fichiers : CJ ficheHtml (CJ:4831) et son action, fonction de pose nouvelle. vm/generateur.js : option `exutoires` (liste ; l'ancienne par défaut,
    l. 14 ; sans tirage de plus quand elle manque, l. 38), passée par vm/aleatoire.js:59 avec 'infiltration' ; commentaire de compat.js:89 (ni cette
    option, ni `drains` en m121). LISEZMOI.txt (CROQUIS DE TERRAIN).
  - Pour l'utilisateur : la fiche d'une descente (grille, siphon de sol…) non reliée propose « Rejet au sol » : infiltration et tuyau posés d'un
    toucher ; « Annuler » retire les deux.
  - Test : navigateur/rejets.js b1 : descente à 0,5 m d'une façade du fond de démonstration (VCroquis.demoDxf()) ; après le bouton, infiltration à 1 m
    ± 0,05 de la descente et plus loin du bâti qu'elle ; tronçon sans réseau attaché aux deux, pièce 'EP' ; état ok:SOL ; sans le type (comme une
    v1.7.0) : descente sansexu, pas « Réseau EP départemental (présumé) » ; une annulation rend le JSON d'avant ; pas de bouton sur un WC ni sur une
    descente reliée. b2 : descente à 0,5 m d'un regard : l'infiltration tombe à plus de 0,6 m de tout objet [p].
  - Risques : pose sur un bâti ou un objet (D10) ; générateur partagé avec compat.js (l. 91) : sans l'option, mêmes 30 croquis.
- **m119 Drains (1) : champ, peigne, légende, DXF, fiche** (souhait 4, 1re partie du cadrage, l. 157 ; D4, D8, D9).
  - Fichiers (CJ) : defautsLn ; peigne à l'écran et au PDF (Q2) ; légende et échantillons (CJ:5823-5836) ; ecrireDxf ; fiche du tronçon (CJ:4900-4911)
    ; nomTrace. LISEZMOI.txt (consigne de D11 : drains). vm/charger.js : une ligne de doc() prend un 7e champ facultatif, des propriétés ({drain:
    'collecte'}), car p y est rebâti (l. 37-39).
  - Pour l'utilisateur : la fiche d'un tronçon propose « Drain : non, collecte, infiltration » ; le tronçon prend un peigne à l'écran, au PDF et au
    DXF ; la légende dit « Drain » ou « Drain d'infiltration ».
  - Test :
    - nouveau vm/drain.js (tests/tout.sh:14) : d1 defautsLn garde 'collecte' et 'infiltration', écarte toute autre valeur, ne change pas un tronçon
      sans drain ; d2 environ L / 1 m dents sur le canevas factice, d3 de même au PDF ; d4 DXF : VEDE-DRAINS dans les tables seulement avec un drain,
      polyligne sur VEDE-DRAINS, nombre de LINE, drain « projet » et « à supprimer » sur leur calque ; d5 légende : « Drain » et « Drain
      d'infiltration » une fois chacune, en p.res '' comme en 'EP' ; sans exutoire, « Réseau non déterminé » en plus ;
    - nouveau navigateur/drain.js (tests/tout.sh:19) : f1 la puce « Collecte » pose p.drain 'collecte', en un pas d'annulation ; Réseau EU puis Déduit
      le gardent, « Non » le retire.
  - Risques : fiche du tronçon plus haute (navigateur/mise-en-page.js) [p] ; légende qui déborde du cadre [p] ; au 1/500, 1 m = 2 mm, peigne serré [p]
    ; unité du fond (u) au DXF ; peigne et hachures sur un drain « à supprimer » (lisibilité sur l'A4).
- **m120 Drains (2) : outils, point posé d'office, annulation, suppression liée** (souhait 4, 2e partie du cadrage ; D10).
  - Fichiers (CJ) : OUTILS_LN, PALETTES.tr, drainSvg, aide, terminerTrace, ajouterPointTrace, supprimerSel avec demander (D10).
  - Pour l'utilisateur : deux outils dans la palette Tracés. Tracer un drain pose son point (« Drain » au départ, infiltration à l'arrivée) ; «
    Annuler » retire le tout ; supprimer le drain propose de retirer aussi son point. Un drain tracé entre deux objets n'a pas de point et ne compte
    pas au constat (Q4).
  - Test (navigateur/drain.js) : o1 « Drain » et « Drain d'infiltration » juste après « Projet », « Complément du fond » et « Escalier » toujours
    voisins ; o2 drain de collecte entre deux points libres : p.res '', p.drain 'collecte', point « Drain » attaché au départ, toast « Drain ajouté »,
    une annulation rend le JSON d'avant ; o3 tracé trop court : ni point ni pas d'annulation ; o4 drain d'infiltration depuis une descente :
    infiltration attachée à l'arrivée, ok:SOL (sans le type : sansexu) ; o5 « Les deux » retire le point (une annulation rend les deux), « Le drain
    seul » le garde ; un point « Drain » posé à la main reste, sans question ; o6 drain commencé au bout libre d'un Tronçon EP : deux lignes ; o7
    drain entre deux objets : aucun point, aucune ligne « Autres : Drain ».
  - Risques : un seul pas d'annulation (pas d'instantane dans la pose du point) ; flèche à l'envers d'un tuyau tracé depuis un exutoire (défaut connu,
    hors lot), à vérifier sur un drain d'infiltration.
- **m121 Drains (3) : contrôles, regard, générateur, documentation** (souhait 4, 3e partie du cadrage ; D10).
  - Fichiers : CJ controles (bouts d'un drain sautés), reglesAnomalies (regard des drains, selon Q3). vm/generateur.js : option `drains` (sans tirage
    de plus quand elle manque), passée par aleatoire.js. vm/constat.js : « Autres : Drain » compte chaque point « Drain » (garde). LISEZMOI.txt,
    croquis/LISEZMOI.txt (l. 15, 51).
  - Pour l'utilisateur : plus de message « extrémité libre » au bout d'un drain ; un drain dont la sortie n'est pas dessinée laisse le plan « À
    compléter », et un regard posé dessus au tampon béton y est une réserve (Q3) ; mode d'emploi des drains (seul le point « Drain » compte au
    constat).
  - Test : vm/drain.js d6 : drain de collecte tracé comme l'outil (defautsLn('tr', {drain: 'collecte'}) : p.res '', p.drain gardé), point « Drain » au
    départ, aval libre : aucun contrôle 'libre:<drain>' ; source sansexu, « Drain : exutoire non dessiné (…) » ; conclusion 'incomplet' ; « Autres :
    Drain » sans code ni conformité ; en p.res 'EP' : « ok, EP présumé », 'conformes'. Échoue sur m120 (contrôle 'libre') et sur 52cd3c8 (p.drain
    perdu). d6b : un regard (tampon béton, sans cunette) sur ce drain ; avec Q3 (a), « Regard : tampon béton » en réserve, pas de « sans cunette »,
    'incomplet' ; avec (b), « Regard EP : tampon béton », 'reserves'. Témoin vert sur 52cd3c8 : un Tronçon au lieu du drain, NC.
  - Risques : un contrôle de moins, que remplacent celui de la source et la conclusion « À compléter » (D10).
- **m122 Destinations (1) : modèle, analyse, règles, constat**, hors palette (souhait 2, 1re partie du cadrage, l. 116 ; D3, D5 à D7).
  - Fichiers (CJ) : def('exutoire'), hors de FAMILLES pour l'instant (ni palette, ni sélecteur « Type », CJ:4840) ; defautsPt ; terminal, destDe et
    an.exu ; libExu ; eu-exu et ep-exu ; REGLES_LIGNE ; exuArbitrage ; controles (CJ:1379, 1382) ; raccInfo, constatDeduit ; conclusion et CONCL
    ('exu', D6) ; texteEtiquette ; filtre de l'avant-projet.
  - Pour l'utilisateur : rien encore (la palette propose la destination en m124).
  - Test :
    - vm/regles.js, puits de defautsPt : WC (et 's=ok:X:PUITS:nc:autre', a [['eu-exu:s', true, 'WC : rejet dans le puits']], c 'non_conformes') ;
      descente (a [['ep-exu:s', true, 'Descente EP : rejet dans le puits']], c 'non_conformes') ; descente vers un étang conforme (a [], c
      'conformes'), en réserve (ep-exu, nc false, c 'reserves'), à arbitrer (ep-exu, nc true, st 'arbitrer', c 'exu') ; WC vers une destination sans
      champ (p {}) : et 's=ok:X:AUTRE DESTINATION:arbitrer:autre', « WC : rejet dans l'autre destination » (une descente : ep-exu à arbitrer, c 'exu'
      ; nom « Puits perdu » sans p.ep : ep-exu NC) ;
    - vm/regles.js : descente → regard (tampon béton, sans cunette) → étang ('conforme', 'autre' : sans ep-exu), en Tronçon, en Tronçon EP, puis en
      avant-projet avec un Tronçon EP laissé libre au regard : et 's=ok:X:ETANG:conforme:autre', a [['tampon:R', false, 'Regard EP : tampon béton']],
      c 'reserves' ; regard et pièces 'EP', aucune contredite, ni « contredit » ni « sortielibre » (regles.js prend les champs facultatifs mode, pt,
      pc et sans ; FAM, l. 55, prend 'cunette'). Témoin vert sur 52cd3c8 : le même cas vers un puisard. Un WC sur ce regard : la même réserve et
      eu-exu NC (D6) ;
    - vm/rejets.js : x1 constatDeduit d'une descente vers un puits : NC, ok null, case 'autre', « Puits (rejet des EP) », sans contrôle 'manque' ;
      p.ep 'reserve' : ok null ; écartée ou p.ep 'conforme' : ok true ; vers un étang à arbitrer : ok null, sans case, « Étang : rejet des EP à
      arbitrer », contrôle 'manque' (aucun une fois décidée) ; case MILIEU : code MILIEU, « Milieu naturel » ; WC vers un puits à case GARG : MILIEU,
      codes ['raccEUsep'] ; x2 descente reliée à deux puits identiques : ok ; à un puits et un puisard : multiple ; à deux « Puits » de jugements
      différents, le message de D5 ; x3 quatre ordres du dessin, même an.exu ; x5 avant-projet qui garde le puits (NC) : ep-exu au tableau du PDF ;
      reconcilier la crée en catégorie 'autre' ;
    - navigateur/dossier.js, cas nouveau (modèle des cas 7 et 8, l. 10-11) : puits à case MILIEU, p.ep 'nc' : ligne de la descente « non », case
      gestEP cochée, préconisation « Suppression du rejet dans le puits ; … » ; réserve choisie au dossier : constat « oui », aucun rappel « non
      conforme sur le croquis ».
  - Risques : une règle qui compare r.res à 'X' (D1).
- **m123 Destinations (2) : symbole, PDF, DXF, textes libres, réparation au chargement** (souhait 2, 3e partie du cadrage ; D3, D8, D9).
  - Fichiers : CJ primitives (forme 'exutoire'), symboleSvg, légende (clé nom et ab ; it.p jusqu'à l'échantillon, CJ:5827), blocs et INSERT,
    échappement (esc à l'écran, pdfTxt au PDF, dxfTxtSortie au DXF). IX planValide (IX:4286-4314) écrit dans p.nom, p.ab, p.art, p.ep et p.cst les
    replis de D3, et retire un p.drain invalide [p].
  - Pour l'utilisateur : rien avant m124 (pas de destination à poser).
  - Test :
    - vm/rejets.js x4 : « Puits » (Pu) et « Étang » (Ét) : blocs VEDE_EXUTOIRE_PU et VEDE_EXUTOIRE_ET, deux lignes de légende, « puits » en page 2
      (colonne « Rejet constaté ») ; nom « Étang <b> & "x" » échappé en HTML, intact au PDF et au DXF (CP1252) ; ab « Ét » et « Et » :
      VEDE_EXUTOIRE_ET et VEDE_EXUTOIRE_ET_2 ; sans nom ni ab : « Autre destination (Au) », VEDE_EXUTOIRE_AU, « autre destination » en page 2 ;
    - navigateur/constat-boite.js, cas 11 nouveau : une sauvegarde dont le plan porte deux destinations aux champs faux (ep 'x', cst 7, noms « Puits »
      suivi de 300 caractères et blanc) et un tronçon à p.drain 'oui' est restaurée sans erreur, champs réparés (cst 'autre' ; ep 'nc' pour le
      premier, 'arbitrer' pour « Autre destination »).
  - Risques : un échappement oublié dans l'un des trois rendus ; planValide répare au lieu de refuser [p].
- **m124 Destinations (3) : palette et fiche** (souhait 2, 2e partie du cadrage, côté éditeur ; D10).
  - Fichiers (CJ) : FAMILLES 'equ' ('exutoire' après 'milieu'), ouvrirPalette, choisirOutil, poserObjet, pose par cotes (entrerCotes, poserParCotes,
    aperçu, aides), etatSource, ficheHtml (CJ:4831 : les cinq champs), changement de type (D10).
  - Pour l'utilisateur : « Puits » dans la palette Équipements, après « Rejet en milieu naturel » ; une descente reliée y est non conforme (13 nov.),
    au plan comme au constat. La fiche règle nom, abréviation, article, jugement des EP et case du constat (les EU y sont toujours non conformes). Une
    case autre que Milieu naturel ou Gargouille laisse, comme l'infiltration, le raccordement à cocher (la conformité aussi, sauf rejet non conforme).
  - Test : navigateur/rejets.js p1 : poser « Puits » et y relier une descente : ep 'nc', ep-exu NC retenue, fiche de la descente en 'ko', « Non
    conformes » ; nom « Étang », article « l' » : « Descente EP : rejet dans l'étang » ; Jugement des EP « À arbitrer » : fiche en 'att' ; écartée
    puis « Non conforme » : retenue NC ; « Conforme » : plus d'anomalie, une annulation la rend ; nom vidé : refusé ; un WC relié : « WC : rejet dans
    l'étang ». p2 : outil choisi avec un modèle « Étang » à arbitrer (C.outil, navigateur/commun.js:105), posé par « Cotes » sur le fond de
    démonstration (comme navigateur/cotes.js) : nom, abréviation et jugement gardés, « Étang » à l'aide et au panneau, descente reliée en 'att',
    aucune NC créée (sans le report : « Puits » NC).
  - Risques : le sélecteur « Type » des exutoires propose « Autre destination » (CJ:4840) ; les tests choisissent un outil par son type (C.outil), pas
    par son rang [p].
- **m125 Destinations (4) : modèles de la tablette, documentation** (souhait 2, 2e et 4e parties du cadrage : Réglages, LISEZMOI, générateur, test du
  dossier ; D3, D10 à D12).
  - Fichiers : IX : CROQ_DEF (IX:3143), croqCfgLire et croqCfgEcrire (IX:3146-3147) gardent `exutoires` ; vcEditeur (IX:3353) et ed.ouvrir (IX:3416)
    passent les options `exutoires` et `enregistrerExutoires(liste)`, comme les aides ; croqReglagesHtml (IX:3523-3529) : liste « Destinations
    ajoutées » (modifier, retirer [p : Q5] ; D12) ; actions près de IX:3551. CJ : items 'pt:exutoire:<id>' et « + Nouvelle destination » (D10). Labo :
    localStorage 'vcl-exutoires', comme 'vcl-aides' (croquis/index.html:267-268). vm/generateur.js : option `exutoires` avec 'exutoire'. LISEZMOI.txt
    (texte de D3, consigne de D11), croquis/LISEZMOI.txt (l. 11, 26-28, 51 ; l. 29 : « eaux pluviales vers l'EU ou un puits (un puisard reste
    conforme) ; vers une autre destination ajoutée, selon le jugement de sa fiche (« à arbitrer » au départ) »).
  - Pour l'utilisateur : ses destinations (étang, fossé…) restent dans la palette d'un croquis à l'autre ; les Réglages les listent.
  - Test (navigateur/rejets.js) : m1 « + Nouvelle destination » : fiche de départ (nom vide refusé, « le », « à arbitrer », « autre » ; « Puits perdu
    » y met « Non conforme ») ; « Étang » (Ét, l', NC, autre) enregistrée dans croquisConfig.exutoires, posée depuis la palette rouverte sans
    recharger (« Étang » actif, pas « Puits ») puis par « Cotes », gardée au rechargement ; m2 modèle changé dans les Réglages : l'objet déjà posé ne
    change pas (même analyse) ; m3 sauvegarde restaurée sur un profil neuf, sans modèles : même analyse, même constat.
  - Garde : un croquis du lot ouvert sur une copie de 22df7f2 (v1.6.3) : plan PDF et fiche, pour la consigne de D11 [p].
  - Risques : croqCfgEcrire n'écrit aujourd'hui que {actif, aides} (IX:3147 ; retour en arrière : D11).

## Questions qui restent
- Q1 Conclusion du plan tant qu'un rejet d'EP dans une destination ajoutée autre qu'un puits (NC depuis le 13 nov.) est « à arbitrer ».
  Ce qu'on voit : une destination nouvelle (étang, fossé…) part « à arbitrer » [p] ; l'anomalie « Descente EP : rejet dans l'étang » reste hors du
  dossier tant que le technicien ne l'a ni retenue ni écartée dans le croquis (Contrôles). Sans conclusion choisie au constat, le plan PDF en propose
  une.
  Choix : (a) « Conformes », comme pour une boîte de branchement manquante à arbitrer ; (b) « À compléter : rejet des EP à arbitrer », comme pour une
  fosse septique à arbitrer.
  Recommandation : (b), que suit la conception (D6) [p] : le plan ne dit pas « Conformes » avant la décision. Seul le plan change : le constat laisse
  la ligne sans conformité et le rappel avant signature la signale.
- Q2 Dessin du drain de collecte et du drain d'infiltration.
  Ce qu'on voit : un drain est un tuyau à peigne (une petite dent environ tous les mètres), à l'écran, au plan PDF et au DXF, nommé à la légende.
  Choix : (a) dents d'un seul côté pour la collecte (à droite en suivant le tracé), des deux côtés pour l'infiltration ; (b) le même peigne : seuls la
  légende et le symbole du bout (point « Drain » ou infiltration) les distinguent.
  Recommandation : (a) : les deux se distinguent sur le plan imprimé en noir et blanc.
- Q3 Réseau d'un drain dont la sortie n'est pas dessinée.
  Ce qu'on voit : l'outil « Drain » trace un tuyau dont la sortie (puisard, infiltration, boîte de branchement…) peut rester à dessiner ; un regard
  posé sur le drain n'en est pas une. Le cadrage voulait le drain « réseau EP » d'office.
  Choix : (a) sans réseau, comme l'outil « Tronçon » : tuyau gris, « Drain : exutoire non dessiné » et « À compléter » au plan, ligne « Autres : Drain
  » du constat sans raccordement ; un regard du drain au tampon béton y est une réserve, comme en EP, par une règle de plus [p] (sans elle : non
  conforme, et « Non conformes » au plan, comme aujourd'hui sur un « Tronçon ») ; (b) réseau EP d'office, comme un « Tronçon EP » : présumé raccordé
  au réseau EP départemental, sans message, « Conformes » au plan (« Réserves » avec ce regard), « Réseau EP départemental (présumé) » au constat.
  Recommandation : (a). Un drain dont la sortie manque reste signalé ; une tablette restée en v1.7.0 dit « À compléter » devant un drain
  d'infiltration, ou vers un puits (NC depuis le 13 nov.), au lieu de cocher à tort le réseau EP (D11) ; le réseau EP reste à un geste, dans la fiche
  du tuyau. Son coût : ce geste quand la sortie reste inconnue, et la règle du regard.
- Q4 Un drain sans point « Drain » compte-t-il au constat ?
  Ce qu'on voit : chaque point « Drain » du croquis compte pour une installation « Autres : Drain », comme aujourd'hui ; l'outil « Drain » pose ce
  point au bout libre du tracé. Un drain tracé entre deux objets (d'un regard à un puits), ou un tuyau passé en drain dans sa fiche, n'en a pas. Le
  cadrage dit « chaque drain dessiné compte » ; la décision du 6 nov. (compter ce que l'opérateur a dessiné, sans regrouper) ne tranche pas ce cas.
  Choix : (a) seul le point compte ; (b) chaque drain de collecte compte, même sans point.
  Recommandation : (a). Avec (b), le croquis créerait une ligne qu'aucun objet ne porte, sans raccordement ni conformité, sauf à analyser le drain
  lui-même (deux correctifs de plus, selon le cadrage). Pour avoir la ligne, il suffit de poser un point « Drain ». Son coût : sans point, un drain
  qui mène à un puits n'est pas jugé, seules les sources l'étant (CJ:1187) ; plan et constat se taisent sur ce rejet.
- Q5 Le puits : jugement fixe ? Le puits perdu ?
  Ce qu'on voit : la fiche d'un puits offre aussi « Réserve », « À arbitrer » et « Conforme », qui efface l'anomalie sans trace ; l'écarter dans le
  croquis (Contrôles) la garde, listée (CJ:4981). Les Réglages peuvent changer ou retirer le modèle « Puits ». Un puits perdu (infiltration) se
  dessine en « Puits » (EP non conformes) ou en « Puisard » (conformes, CJ:1693).
  Choix : (a) jugement modifiable, comme toute destination ; (b) « Non conforme » fixé pour un nom qui commence par « puits » (D3), fiche et Réglages,
  un cas particulier s'écartant dans Contrôles. Puits perdu : (c) « Puits » ; (d) « Puisard ».
  Recommandation : (b), la décision du 13 nov. étant une règle métier (CLAUDE.md, l. 17) ; son coût : le nom compte (renommé « Étang », un puits se
  libère). Puits perdu : à l'utilisateur, le cadrage ne le distinguant pas d'un puits d'eau (l. 121-123). D'ici là, la conception suit (a) et (c) [p]
  ; la réponse ira dans m124 et le LISEZMOI.
