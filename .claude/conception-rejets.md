# Conception du lot « Rejets » (v1.7.1, souhaits 2, 3, 4)

Établie le 8 nov. 2026 sur 52cd3c8 (code de la v1.7.0), point de départ de m116 ; révisée les 13 et 14 nov. (puits NC ; réponses et consignes du 13
nov. ; relectures). Lignes citées : celles de 52cd3c8 (0e56c7b n'y change que le numéro 1.7.1) ; m116 à m129 (envoyés : 8f9094d, ab926ec, 6df324c,
a5a5d05, 7a6c041, b562636, bd16bb9, d036ee1, 65c4685, f9633c6, 419d752, 27fb4c5, 7b4f489, aabb18c) les décalent : chercher par nom de fonction ; tests
cités par nom de cas. Détail du code : `carte-*.md` (8 nov. ; le puits y est encore une destination). [p] = présomption à signaler à l'utilisateur. CJ
= croquis/croquis.js, IX = index.html ; vm/ et navigateur/ sont sous tests/.

## Réponses de l'utilisateur (7 et 13 nov. 2026)
- Décision du 13 nov., mot pour mot : « Un rejet EP dans un puits est une non conformité. » (`.claude/etat-travaux.md`, l. 8 ; CLAUDE.md, l. 17).
- Réponses du 13 nov. aux questions Q1 à Q5, mot pour mot, une par ligne comme dans le message :
  - Q1 a
  - Q2 a
  - Q3 b
  - Q4 b
  - Q5.1 si rejet dans un puits = non conforme et non modifiable
  - Q5.2 pour puits perdu, mettre puisard
- Consignes du 13 nov., second message, mot pour mot : « Gardons la même logique pour le global. Si la conformité d'un équipement est modifiable de
  manière générale, n'intégrons pas des exceptions. Les drains ne sont pas forcément raccordés au réseau EP, quand ils sont la destination d'un
  équipement EP, l'évacuation du drain se fait par dispersion dans le sol (drain d'épandage, tranchée drainante). Dans ce cas, dessiner le drain et
  compter comme une gestion des EP à la parcelle, aucun exutoire n'est attendu pour le drain. Mettre l'étiquette "dispersion dans le sol". De la même
  manière pour les descentes EP avec infiltration dans le sol, pas de connexion avec le réseau EP et ajout d'une étiquette. Quand une anomalie reste à
  arbitrer, ne pas la considérer comme conforme ! »
- Ce qu'ils fixent (le second message l'emporte sur le premier quand ils diffèrent ; règles métier de CLAUDE.md) :
  - arbitrage : une anomalie restée « à arbitrer », quelle qu'elle soit, n'est jamais comptée conforme ; Q1 passe de (a) à (b), étendue à toutes (D6,
    D7 ; m119) ;
  - puits (Q5.1) : EP non conformes, fixés par un type « Puits » que ni la fiche ni les Réglages ne changent ; gestes généraux gardés (retenir, à
    arbitrer, écarter dans Contrôles ; nature au dossier), sans verrou propre (D3, D6 ; m120) ; puits perdu (Q5.2) : « Puisard » (D3) ;
  - drains : dents d'un côté pour la collecte, des deux pour le drain d'infiltration (Q2 a, D8) ; collecte sans sortie dessinée présumée au réseau EP
    (Q3 b) ; un drain qui reçoit un équipement EP disperse dans le sol : exutoire lui-même, EP gérées à la parcelle, étiquette « Dispersion dans le
    sol », aucun exutoire attendu après lui (D4 ; drain de collecte qui reçoit un équipement : Q6) ; chaque drain de collecte compte au constat,
    analysé lui-même (Q4 b, D4, D7) ;
  - descente infiltrée : l'infiltration au sol (m117, m118) ne présume aucun réseau EP et porte son étiquette (D2).
- Recommandations du 7 nov., toujours retenues (`.claude/etat-travaux.md`, l. 10) : EU vers une destination ajoutée toujours NC (le champ p.eu du
  cadrage disparaît) ; EP infiltrées au sol conformes ; barème à 4 choix par anomalie standard (NC, réserve, à arbitrer, pas d'anomalie), copié dans
  chaque croquis : le jugement des EP d'une autre destination (D3) prend ces 4 choix ; le barème lui-même n'est pas dans ce lot.
- Autres questions : recommandations du cadrage (`.claude/cadrage-v170.md`, l. 108-171). Principe (l. 110) : tout réglage qui change un jugement est
  copié dans le croquis, jamais relu dans les réglages. Ne changent pas : codes, symboles et libellés existants, formulaire du constat, anciens
  croquis (sauf la conclusion voulue de l'arbitrage, D6), constat signé, croquis désactivé (D12).

## Décisions du lot
- D1 Table commune des exutoires (correctif A du cadrage).
  - `EXU`, près d'EXU_LIB (CJ:767), une ligne par code (INF, GARG, MILIEU ; SOL en m117, PUITS en m120, DISP en m122), donne le libellé du rejet
    (celui d'EXU_LIB, mot pour mot), la famille de couleur et de calque (EP), la règle EU (clé, texte, préconisation, codes, nc, cat : CJ:1322-1324)
    et la place au constat en EU et en EP (code, libellé, case EP_RECUP : CJ:1692-1693). Une ligne peut aussi porter une règle EP fixe (`ep`, de même
    forme que `eu`) : seul PUITS en a une (D6).
  - codeExu(res) : la partie de res avant le premier « : », sinon res. Pour une autre destination, terminal rend une clé (D5), pas 'X' : toute lecture
    de la table s'écrit EXU[codeExu(res)], car EXU[res] ou `res === 'X'` échouent toujours (un WC relié à une destination serait sans anomalie : sonde
    `revision-cle-wc.js`). La clé ne se découpe pas plus loin (un nom peut contenir « : ») : nom et jugements se lisent dans an.exu[clé].
  - resTrace(res) : 'EP' si EXU[codeExu(res)] existe, sinon res ; elle remplace les trois copies du test (CJ:1244, 1256, 1287).
  - Lecteurs d'un res venu de terminal (CJ:960, grep, m116) : clé entière pour nets, gests, resObj.res (CJ:1193, 1249 : deux destinations font
    « multiple »), libExu, gestDe (CJ:1115 : 'D', comme INF) ; code pour resTrace, les règles EU et EP (CJ:1320-1324), ep-exu (D6) et raccInfo
    (CJ:1691-1693), qui lisent aussi an.exu[clé] pour une destination ; réseau seul pour les autres (regards, « contredit », boitesConstat, resLigne,
    couleurPt, tuyau, DXF, avant-projet, collecteurs) ; IX ne voit que les codes RACC, epRecup et boitesConstat (D7, D12).
  - libExu(res, an) remplace `EXU_LIB[x] || x` (CJ:1379, 1396, 4783, 5935) : EXU_LIB pour un réseau, an.exu[clé] pour une destination, sinon
    EXU[codeExu(res)].
  - raccInfo (CJ:1686) rend aussi `recup`, la case EP_RECUP (IX:1912) ; `puisard: true` reste rendu pour INF. VC.EXU et VC.libExu servent aux tests.
- D2 Infiltration au sol (souhait 3 ; m117 et m118, faits).
  - `def('infiltration', {fam:'exu', lib:'Infiltration au sol', g:'f', role:'exutoire', forme:'infiltration', exu:'SOL', droit:true})`, après le
    puisard, dans FAMILLES 'equ' ; EXU.SOL : « infiltration au sol », famille EP, case 'infil' (« Infiltration diffuse », IX:1912) ; symbole droit sur
    le papier, sans rotation.
  - Descente infiltrée (consigne du 13 nov. : « pas de connexion avec le réseau EP et ajout d'une étiquette ») : vérifié sur m118 (sonde
    `sonde-inf-etiquette.js`). Descente, tronçon sans réseau, infiltration : ok:SOL, presume false, aucune anomalie, « Conformes » ; au constat,
    « Gouttière(s) avant » sans code, « oui », case infil. L'étiquette « Infiltration au sol » (texteEtiquette rend ty.lib) est placée par poserObjet
    comme par le bouton (placerEtiquette, m118). Le tronçon prend la couleur et le calque EP (resTrace) sans rejoindre aucun réseau.
  - Aucun autre texte : l'étiquette garde le nom de l'objet [p] ; « Infiltration dans le sol », si l'utilisateur le préfère : T.infiltration.lib et
    EXU.SOL, en m124 [p].
- D3 Puits et autre destination (souhait 2).
  - Puits (13 nov., Q5.1) : un type à part, à règle fixe, comme le puisard ou l'infiltration :
    `def('puits', {fam:'exu', lib:'Puits', role:'exutoire', forme:'puits', exu:'PUITS'})`, dans FAMILLES 'equ' juste après 'milieu'. EXU.PUITS porte
    la règle EU et une règle EP fixe, NC (D6). La fiche n'a aucun jugement à régler ; les Réglages n'en ont aucun modèle. ep-puits est une règle
    imposée : hors du barème des Réglages à venir (souhait 13, « Anomalies standard »), ou montrée verrouillée [p]. Les gestes généraux restent :
    retenir, mettre à arbitrer ou écarter l'anomalie dans Contrôles (CJ:4942), changer sa nature au dossier. Aucun verrou propre au puits.
  - Pourquoi un type : une règle fixe ne dépend ni d'un nom ni d'un réglage ; comme pour SOL, rien à copier dans l'objet, à réparer au chargement ni à
    garder dans les Réglages (m120).
  - Puits perdu (Q5.2) : il infiltre les eaux, il se dessine en « Puisard » (EP conformes, case puisard, CJ:1693). La fiche du puits et l'aide de
    l'outil le disent : « Un puits perdu (qui infiltre les eaux) se dessine en Puisard. » [p] ; LISEZMOI.txt et croquis/LISEZMOI.txt aussi (m120).
  - Autre destination (étang, fossé…) : `def('exutoire', {fam:'exu', lib:'Autre destination', g:'f', role:'exutoire', forme:'exutoire', exu:'X'})`.
    L'objet porte une copie complète de sa définition (cadrage, l. 114) :
    - p.nom : « Étang », 40 caractères au plus [p] ; absent, autre qu'un texte ou blanc : « Autre destination », article « l' » ;
    - p.ab : 2 ou 3 caractères, « Ét » ; vide : les deux premiers caractères du nom (« Au ») ;
    - p.art : 'le', 'la' ou 'l'' (sinon 'le' [p]), pour les textes (« dans l'étang »), jamais pour la clé ;
    - p.ep, jugement des EP : 'conforme', 'reserve', 'nc' ou 'arbitrer' ; sinon 'arbitrer', comme « + Nouvelle destination » (D10) [p] ; aucun repli
      par le nom ;
    - p.cst, case du constat en EP : 'MILIEU' ou 'GARG' (colonnes fixes), 'puisard', 'recup', 'infil' ou 'autre' (cases EP_RECUP ; sinon 'autre' [p]).
  - destDe(o) applique ces replis pour tous les lecteurs (clé, an.exu, textes, fiche, PDF, DXF ; sonde `sonde-c8-c12-doc.js`). La fiche et « +
    Nouvelle destination » refusent un nom vide, ou qui contient « puits » une fois normalisé comme la clé (D5) : toast « Pour un puits, posez l'objet
    Puits (EP non conformes) ; pour un puits perdu, un Puisard. » [p] ; la valeur est rendue, comme pour le texte libre (CJ:5274).
  - defautsPt('exutoire') (CJ:821) : {nom:'Autre destination', ab:'Au', art:'l\'', ep:'arbitrer', cst:'autre'} [p]. Le jugement suit la fiche, jamais
    le nom : une destination nommée « Puits » dans un fichier fait à la main garde le jugement de sa fiche (test de m125).
  - Modèles de la tablette : meta croquisConfig.exutoires (IX:3146-3147), vide au départ. Un modèle ne sert qu'à la pose : le changer ou le retirer ne
    touche aucun objet posé. Hors sauvegarde (IX:4442 n'emporte pas meta ; cadrage, l. 130-132) : chaque objet garde sa copie, et le transport
    coûterait un correctif. LISEZMOI.txt (m128) : « Les destinations ajoutées restent sur la tablette : la sauvegarde ne les emporte pas. Une
    destination déjà posée garde son nom et ses jugements sur toute tablette. » Labo et hôte : m128.
- D4 Drain (souhait 4).
  - Un drain est un tronçon 'tr' qui porte p.drain = 'collecte' ou 'infiltration' ; pas de nouveau type de ligne. defautsLn (CJ:832) recopie o.drain
    pour ces deux valeurs seulement : un tronçon sans drain garde exactement ses clés. Fiche du tronçon : puces « Drain : non, collecte,
    infiltration » (cadrage, l. 155). « Infiltration » (puce, ou outil drainInf : {drain:'infiltration', res:''}) met p.res '' et masque les puces
    Réseau : son rejet est fixé (DISP), et une v1.7.0 y lit un tronçon sans réseau, donc « À compléter » (D11). « Collecte » met EP à un tronçon sans
    réseau et garde EU ou unitaire [p] ; les puces Réseau y restent sans toucher p.drain. « Drain : non » retire p.drain et garde p.res. Statuts
    « projet » et « à supprimer » : comme un tronçon. Peigne, ligne de légende et calque VEDE-DRAINS suivent p.drain (D8, D9).
  - Comment l'éditeur sait qu'un drain disperse : par le choix de l'opérateur (outil « Drain d'infiltration », D10, ou puce « Infiltration »), jamais
    par le dessin seul. C'est le plus sûr pour le PDF : l'étiquette « Dispersion dans le sol », le peigne des deux côtés et la case « Infiltration
    diffuse » s'y impriment ; ils ne doivent ni paraître ni disparaître parce qu'un tuyau est relié ou qu'une sortie reste à dessiner. Le dessin
    contrôle ce choix (cas limite ci-dessous).
  - Drain de collecte (il recueille l'eau du sol) :
    - tuyau EP : l'outil le trace en p.res 'EP' (puce « Collecte » : ci-dessus). Sortie non dessinée : réseau EP présumé au bout libre (CJ:1210-1220),
      sans message, comme un « Tronçon EP » (Q3 b) ;
    - source linéaire (Q4 b) : analysé depuis un nœud virtuel 'dr:<id>' relié à chacun de ses nœuds (bouts, regards, raccords), sauf son bout
      amont si p.sens est donné (relecture de m123 : relié à ses seuls bouts, un drain orienté cachait la sortie d'un regard ou d'un raccord du
      milieu) ; son résultat est rangé sous l'id du tracé dans an.resObj et lu comme un point « Drain » (T.drain, CJ:797 : source EP, ligne
      « Autres : Drain ») par srcObj(an, id) (sonde `sonde-q4-drain-source.js`, variante 2 : aucun écart sur 800 analyses tirées) ;
    - pas de double compte : un drain dont un sommet tient un point « Drain » ne compte pas, le point compte ; ce point n'est pas un équipement
      relié : il prend le résultat du drain (Q3 b), quelle que soit la réponse à Q6 ; un point « Drain » seul compte comme aujourd'hui (décision du 6
      nov. : compter ce que l'opérateur a dessiné).
  - Drain d'infiltration (le drain qui disperse : épandage, tranchée drainante) :
    - exutoire linéaire, sur le modèle du collecteur (CJ:949, 958) : chaque sommet tenu mène au nœud terminal 'D:<id>' (ses segments ne sont pas des
      pièces), de code DISP (D1 : « dispersion dans le sol », famille EP, règle EU eu-sol [p], case 'infil') ; les EP qui y arrivent sont gérées à la
      parcelle ;
    - aucun exutoire n'est attendu après lui : ses bouts libres ne sont pas des nœuds, donc ni « exutoire non dessiné », ni « À compléter », ni réseau
      EP présumé ; aucune infiltration n'est posée au bout ;
    - ce n'est pas une source : il ne compte pas au constat [p].
  - Cas limite (Q6) : un équipement (descente, grille, WC…) relié à un drain de collecte dont la sortie n'est pas dessinée. Recommandation (b),
    soumise à l'utilisateur le 14 nov. et codée en m129 (aabb18c) sauf avis contraire, la lettre de la règle : pour un équipement qui l'atteint, le
    drain est lu en drain d'infiltration (« Dispersion dans le sol », EP gérées à la parcelle, WC non conforme) ; le relecteur recommandait (a),
    « exutoire non dessiné » (CJ:1378) et « À compléter » (Q6). Avant m129, il y était présumé au réseau EP (choix c). Le drain et le point « Drain »
    qu'il tient gardent Q3 (b) ; avec (b), le drain qui reçoit un équipement (étiquette, ligne du constat) est fixé en m129 (fiche de m129).
- D5 Analyse.
  - terminal (CJ:960) : pour le code X, `res` = 'X:' + nom normalisé (majuscules, sans accents, espaces réduits) + ':' + ep + ':' + cst (un étang :
    'X:ETANG:arbitrer:autre'). Ni ab ni art n'entrent dans la clé [p]. Même nom et mêmes jugements : un seul exutoire (état ok). Sinon deux (état
    multiple, CJ:1379) ; à deux noms égaux, ce message ajoute le jugement des EP, à défaut la case : « (étang (conforme), étang (à arbitrer)) ».
  - an.exu : table clé → {nom, ab, art, ep, cst}, remplie dans l'ordre des identifiants, pas du dessin. Elle n'existe que si le plan porte une
    destination ajoutée : un ancien croquis ne reçoit aucune clé nouvelle (vm/compat.js hache tout an).
  - SOL, PUITS et DISP sont des codes simples, comme INF. Drains : nœuds 'dr:<id>' (collecte) et 'D:<id>' (infiltration), D4 ; aucun lecteur ne doit
    les prendre pour un objet ou un bout libre (lecteurs de 'C:' : CJ:949, 958, 1106, 4045).
- D6 Règles d'anomalies et arbitrage (reglesAnomalies, CJ:1306 ; règles EU, CJ:1319-1324 ; conclusion, CJ:1432).
  - Règles par destination (source EU : toujours NC, cat 'inversion') :
    - infiltration (SOL) et drain d'infiltration (DISP, même texte [p]) : EU, `eu-sol:<id>` « WC : rejet au sol (infiltration) », préconisation
      « Suppression du rejet au sol et raccordement au branchement EU », codes ['suppMilieu'] ; EP : aucune anomalie ;
    - puits (PUITS) : EU, `eu-puits:<id>` « WC : rejet dans un puits », préconisation « Suppression du rejet dans le puits et raccordement au
      branchement EU », codes ['raccEUsep'], comme eu-inf (la case MILIEU du constat ajoute suppMilieu, IX:2010) ; EP, `ep-puits:<id>`, NC fixe :
      « Descente EP : rejet dans un puits », préconisation « Suppression du rejet dans le puits ; raccordement au branchement EP ou gestion à la
      parcelle », codes ['gestEP'] ;
    - autre destination (X) : EU, `eu-exu:<id>` « WC : rejet dans l'étang » (article et nom de l'objet, initiale en minuscule [p]), préconisation
      « Suppression du rejet dans l'étang et raccordement au branchement EU », codes ['raccEUsep'] ; EP, `ep-exu:<id>` si p.ep n'est pas 'conforme' :
      « Descente EP : rejet dans l'étang » [p], préconisation « Suppression du rejet dans l'étang ; raccordement au branchement EP ou gestion à la
      parcelle » en 'nc', sans « Suppression… » sinon [p], codes ['gestEP'].
  - reglesAnomalies lit la règle EP de la table (EXU[code].ep) comme la règle EU : aucune règle ne compare un code à 'PUITS'.
  - Puits : ep-puits NC, retenue d'emblée et créée au dossier (it.creer, CJ:1526) ; « Non conformes » au plan (CJ:1434) ; ligne de la source « non »
    au constat (REGLES_LIGNE, CJ:1590 ; IX:2030) ; préconisation et case gestEP (IX:1917, 2019-2020) ; fiche de la source en 'ko' (CJ:4785) ; aucun
    contrôle 'manque'. Gestes généraux : « À arbitrer » → arbitrage (ci-dessous) ; « Écartée » → plus d'anomalie, la descente est conforme ; nature
    changée au dossier → réserve.
  - ep-exu selon p.ep : 'reserve' → réserve (nc false) ; 'nc' → NC ; 'arbitrer' → arbitrer:true, comme sansboite (CJ:1335). Retenue, elle est NC par
    défaut, comme sansboite, et sa nature reste modifiable (decisions.nc, CJ:5166). Un jugement des EP changé efface ces décisions (D10). À arbitrer,
    elle donne aussi un contrôle 'manque' « Descente EP : rejet dans l'étang à arbitrer (retenir ou écarter l'anomalie) » [p], comme la fosse
    (CJ:1382) ; la fiche de la source passe en 'att' par la règle générale (ci-dessous).
  - ep-puits et ep-exu sont en cat 'autre', comme la fosse : des EP dans un ouvrage des EP ne sont pas une inversion EU / EP. La catégorie suit
    l'anomalie au dossier (CJ:1597) et à l'export Excel (IX:4238). L'avant-projet (CJ:5914 : cat 'inversion' ou /^fosse:/) les garde par leur clé :
    /^(fosse|ep-puits|ep-exu):/.
  - REGLES_LIGNE (CJ:1452) reçoit eu-sol (m117), eu-puits et ep-puits (m120), eu-exu et ep-exu (m125) : une anomalie NC retenue rend « non » la ligne
    de sa source au constat, une réserve non (IX:2030).
  - Drains : un drain de collecte compté suit les règles d'une source EP, comme le point « Drain » : ep-eu s'il rejoint l'EU (CJ:1326 ; sonde C1) ;
    des EU dans un drain d'infiltration donnent eu-sol.
  - Règles métier inchangées : descente non visitable, tampon béton, siphons, fosse hors fonction grâce à un by-pass. Le regard suit l'exutoire, pas
    l'appareil [p] : un WC relié par un regard au tampon béton à une infiltration ou à un puits donne « Regard EP : tampon béton » en réserve, comme
    aujourd'hui vers un puisard (sonde `relecture2-sonde-regard-eu-exu.js`) ; eu-sol ou eu-puits reste NC.
  - Arbitrage (consigne du 13 nov.) : une anomalie restée « à arbitrer » n'est jamais comptée conforme. Cela vaut pour toutes : celles créées ainsi
    (fosse et ep-fosse douteuses, CJ:1330-1331 ; sansboite, CJ:1333-1335 ; sanstampon, CJ:1347 ; ep-exu selon p.ep) et toute anomalie mise « À
    arbitrer » à la main (CJ:4942), saisie à la main comprise (anomManu, m.st, CJ:1421).
    - Aujourd'hui, conclusion() n'en tient compte que pour la fosse douteuse (CJ:1441) : une boîte manquante ou un tampon absent créés à arbitrer, et
      toute anomalie mise à arbitrer, laissent « Conformes » ou « Conformes avec réserves » (tests de m119).
    - Nouvel ordre : 'non_conformes' garde la priorité (une NC retenue suffit) ; puis 'croquis', 'incomplet' et 'fosse', comme aujourd'hui ; ensuite,
      tant qu'une anomalie reste à arbitrer, un code d'arbitrage ; 'reserves' et 'conformes' seulement après.
    - Textes [p] : pour une seule anomalie à arbitrer, 'exu' « À compléter : rejet des eaux pluviales à arbitrer » (m125), 'boite' « À compléter :
      absence de boîte de branchement à arbitrer », 'tampon' « À compléter : regard sans tampon à arbitrer », sinon 'arbitrer' « À compléter : une
      anomalie reste à arbitrer » ; pour deux ou plus, 'plusieurs' « À compléter : plusieurs anomalies restent à arbitrer ». « À compléter » : le
      contrôle n'est pas fini ; « à arbitrer » reprend le texte de la fosse et les boutons du croquis [p]. CONCL (CJ:1676-1678) les reçoit ; le
      panneau (CJ:4972, classe neutre) et le PDF (CJ:5944, par CONCL) n'ont rien d'autre à changer.
    - Fiche de la source (etatSource, CJ:4777-4785) : une anomalie de la source restée à arbitrer donne 'att', « … · anomalie à arbitrer » [p], comme
      la fosse (CJ:4784) ; une anomalie retenue garde 'ko'. Sinon, seule la liste « À arbitrer ou écartées » la montre (CJ:4981 ; sonde
      `sonde-c4-c6-arbitrage.js`).
    - Changement voulu : sur 10 666 analyses tirées, 656 changent (645 depuis 'conformes', 11 depuis 'reserves'), toutes par sansboite (sonde
      `sonde-arbitrage-aleatoire.js`) ; aucune des 70 de vm/compat.js, dont les 10 sansboite concluent déjà 'non_conformes' ou 'incomplet' (sonde
      `sonde-arbitrage-compat.js`) : 245/245 sans régénération.
- D7 Constat (raccInfo, CJ:1686 ; constatDeduit, CJ:1702 ; formulaire inchangé).
  - SOL : en EU, {code:'MILIEU', ok:false, lib:'Infiltration au sol : rejet au sol (milieu naturel)'} ; en EP, {code:'', recup:'infil', ok:true,
    lib:'Infiltration au sol (infiltration diffuse)'}. DISP de même : « Drain d'infiltration : rejet au sol (milieu naturel) » ; « Drain
    d'infiltration (dispersion dans le sol) », case infil, la gestion des EP à la parcelle [p : libellés].
  - PUITS : en EU, {code:'MILIEU', ok:false, lib:'Puits : rejet en milieu naturel'} (cadrage, l. 129) ; en EP, code MILIEU et même libellé [p : MILIEU
    plutôt que la case 'autre', « Indéterminé/Autres » : on sait où va l'eau]. ok d'après l'état de ep-puits : absente ou écartée → true ; retenue →
    null : la ligne suit l'anomalie du dossier (IX:2030 : NC → « non » ; réserve choisie au dossier → raccOk, IX:1957), dont la nature se change à
    l'insu de doc.decisions (seule écriture : IX:3176). Avec ok false, une réserve choisie au dossier laisserait le rappel « non conforme sur le
    croquis » (IX:3724).
  - X en EU : toujours {code:'MILIEU', ok:false, lib:'Étang : rejet en milieu naturel'} ; p.cst ne sert qu'en EP. X en EP : code MILIEU ou GARG si
    p.cst l'est, libellé RACC_LIB (comme CJ:1692) ; sinon code '', case recup = p.cst, libellé « Étang (rejet des EP) » (nom de destDe) [p], comme le
    puisard (CJ:1693) : sans libellé, le panneau écrirait « à préciser » (CJ:4990). ok, jamais d'après p.ep : d'après l'état de ep-exu, comme le
    puits.
  - etatAnomalie(doc, an, cle) (m119) rend '', 'arbitrer', 'retenue' ou 'ecartee' : decisions.st, puis a.arbitrer (CJ:1417-1418), m.st pour une saisie
    à la main ; pas a.douteuse (fosseArbitrage, CJ:1366, rendrait 'retenue' sans décision). Elle lit an.anomalies, doc.decisions et doc.anomManu sans
    écrire doc.ordre (anomaliesDoc l'écrit, CJ:1422) ni passer par ligneDe (qui appelle constatDeduit, CJ:1591).
  - Arbitrage (m119) : quand une anomalie de la ligne de la source (REGLES_LIGNE, CJ:1452, ou saisie à la main qui la nomme, comme ligneDe, CJ:1589)
    reste à arbitrer, raccInfo garde le code, le libellé et la case (des faits du dessin) ; ok true devient null, ok false reste (une NC retenue
    suffit) ; raccInfo ne change pas pour la fosse (CJ:1690). En v1.7.0, dep-nv mise à arbitrer laisse la descente « oui ». constatDeduit marque la
    ligne rows[].arbitrer, seulement quand c'est vrai (la sortie « constat » de compat.js ne bouge pas), aussi pour une source qui traverse peut-être
    une fosse douteuse (fosseArbitrage), en EU comme en EP ; vcResumeCalc le reprend. Une anomalie qui ne nomme pas de ligne (sansboite, sanstampon)
    ne joue que sur la conclusion.
  - Lignes du constat (constatEval, IX:2028-2032) : constat non signé et croquis prêt (vcPret), une ligne marquée arbitrer ne prend jamais « oui »
    d'office : le « oui » de raccOk devient '' ; « non » (NC du dossier ou raccOk false) reste. Le raccordement reste au formulaire : le ressaisir ne
    rend pas la ligne conforme. Déclarée « oui » à la main, elle reçoit un rappel avant signature (constatIssues, rien n'est bloqué) : « Gouttière(s)
    avant : déclarée conforme alors qu'une anomalie reste à arbitrer : décidez dans le croquis (Contrôles). »
  - Conclusion proposée du constat (constatEval, IX:2034) : pour un constat non signé, croquis prêt et résumé à r.arbitrer (IX:3569), 'reserves' ou
    'conformes' devient '' : rappel « Conclusion non précisée » (IX:2109) à côté de celui « à arbitrer » (IX:3746) ; 'non_conformes' reste. Une
    conclusion choisie à la main prime, comme aujourd'hui ; « Conformes » ou « Conformes avec réserves » reçoit alors le rappel « Conclusion
    « Conformes » choisie alors qu'une anomalie reste à arbitrer : décidez dans le croquis (Contrôles). » Un constat signé n'est pas touché : la
    garde !c.signeLe évite aussi « Le dossier a changé depuis la signature » (IX:2053).
  - Constat signé sans conclusion (signé pendant un arbitrage, il fige '' : c-lock, IX:4145-4149) : le plan imprime « Conclusion proposée », celle du
    dessin (vcConclConstat, IX:3488-3492), qui le suit après la signature : « À compléter » tant que l'anomalie reste à arbitrer, « Conformes » une
    fois écartée [p]. Le constat signé ne change pas ; avec une conclusion signée, rien ne change.
  - Drain de collecte compté (Q4 b) : ligne « Autres : Drain » (ty.autre de T.drain, depuis la v0.1.0 ; le 6 nov. n'a ôté que « Autres : Lavabo »,
    ffe3ec1), une installation par drain, raccordement et conformité d'après son résultat (raccInfo) ; méthodes : p.meth du drain, choisies dans sa
    fiche comme pour un point [p]. Drain d'infiltration : aucune ligne.
  - Suivi des cases (m116, fait) : P.recup suit les cases recup, infil et autre comme P.puisard (constatDepuisCroquis ; restauration filtrée par
    vcProvenance) ; vcResumeCalc rend r.recup ; vcEcarts fait un rappel par case ; celui « à arbitrer » (IX:3746) couvre toute anomalie à arbitrer.
    Note du panneau (CJ:4997, m117) : ces lignes n'ont pas de code au formulaire, raccOk rend null (IX:1957) et l'hôte ne reprend jamais la conformité
    (IX:3555-3559).
  - Inchangés : constat signé (IX:3618, 3707), saisie à la main, D12.
- D8 Rendu à l'écran et au PDF.
  - Couleur : SOL, PUITS, DISP et X sont dans la table, lue par codeExu (D1) : tuyau vert, étiquette verte, ligne « Canalisation EP » à la légende. Le
    drain d'infiltration est vert, relié ou non : resLigne (CJ:1775) rend 'EP' pour lui, ses segments n'étant pas des pièces (D4) [p] ; le drain de
    collecte suit son réseau (EP par l'outil).
  - Puits (m120) : deux cercles concentriques verts, rayon 2,1 [p], que le puisard ne confond pas. Destination (m126) : hexagone vert qui porte p.ab,
    rayon 2,1 [p] ; symboleSvg(t, taille, p) (CJ:2477) reçoit p (palette, fiche).
  - Étiquettes (texteEtiquette, CJ:1799 ; écran CJ:2179, PDF CJ:5749, DXF CJ:6079) : T.lib pour l'infiltration et le puits, p.nom pour une
    destination. Drain d'infiltration (13 nov.) : « Dispersion dans le sol » [p : majuscule, comme les autres étiquettes], suivie des détails du tuyau
    (Ø, matière, longueur, pose : CJ:1830-1831). Un tronçon sans détail n'a pas d'étiquette (CJ:1834) ; le drain d'infiltration en a toujours une,
    placée d'elle-même en fin de tracé (CJ:4550) et quand la fiche passe le tronçon en drain d'infiltration (apresProp, CJ:5261). Drain de collecte :
    l'étiquette d'un tronçon [p].
  - Légende (CJ:5850-5866) : « Infiltration au sol » et « Puits » viennent d'eux-mêmes ; une ligne par destination, « Étang (Ét) », comme « Rejet en
    milieu naturel (MN) » [p] ; « Drain » et « Drain d'infiltration » en lignes de motif, comme « Tracé présumé (tirets) » (CJ:5867) : échantillon
    gris à peigne, une par sorte présente [p : rang]. Le drain garde aussi la ligne de son réseau (resLigne, CJ:1775-1785) : « Canalisation EP ».
  - Peigne (Q2 a) : une dent d'environ 0,4 m tous les mètres réels [p], dans la couleur du trait ; d'un seul côté pour la collecte (à droite en
    suivant le tracé), des deux côtés pour le drain d'infiltration. À l'écran, une fonction nouvelle près de CJ:2157 (hachures(), CJ:2081, ne change
    pas) ; au PDF, après les hachures « à supprimer » (CJ:5731-5733).
  - Par libExu : fiche (CJ:4783), « Rejet : infiltration au sol », « Rejet : puits », « Rejet : dispersion dans le sol » ; page 2 du PDF, colonne
    « Rejet constaté » (CJ:5935), le libellé seul, puis « · anomalie n° … » (CJ:5937).
  - Le jugement des EP n'est ni au symbole, ni à la légende, ni au DXF : le puits NC se lit au PDF par « Non-conformité » au tableau « Anomalies et
    préconisations » (CJ:5928-5931), son numéro en page 2 et la conclusion (CJ:5944).
- D9 DXF (ecrireDxf, CJ:5962).
  - Blocs (un par symbole employé, CJ:6000-6008) : VEDE_INFILTRATION (m117) et VEDE_PUITS viennent d'eux-mêmes. Destinations : un bloc par texte p.ab,
    VEDE_EXUTOIRE_ + ab en A-Z, 0-9 et _ (« Ét » → VEDE_EXUTOIRE_ET), 31 caractères au plus (R12), suffixe _2, _3 si deux ab donnent le même nom ;
    texte par dxfTxtSortie (CP1252). INSERT (CJ:6076) sur VEDE-SYMBOLES, couleur 3 (EP).
  - Drains : calque VEDE-DRAINS, déclaré seulement s'il sert, comme VEDE-ESCALIERS (CJ:5977). La polyligne y garde la couleur de chaque pièce en 62
    (mc.res, CJ:6057-6061), comme VEDE-A-SUPPRIMER ; le drain d'infiltration en couleur 3. Dents en LINE, d'un côté ou des deux ; ligne(a, b, cal)
    (CJ:6034) reçoit une couleur facultative. Le statut prime [p] : un drain « projet » reste sur le calque du projet, un drain « à supprimer » sur
    VEDE-A-SUPPRIMER, dents comprises.
- D10 Gestes de l'éditeur.
  - Palette « Équipements et exutoires » : …, Puisard, Infiltration au sol, Gargouille, Rejet en milieu naturel, Puits (m120), Autre destination
    (m127), puis une ligne par modèle de destination et « + Nouvelle destination » (m128). PALETTES est figé au chargement (CJ:2545-2550) :
    ouvrirPalette (CJ:4605-4618) ajoute à chaque ouverture les items 'pt:exutoire:<id>', dont nom, symbole et état actif viennent du modèle, pas de T
    ni du type seul (CJ:4610). <id> est tiré par l'application, sans « : » ni guillemet (data-item non échappé, CJ:4613), jamais le nom ; le clic
    passe q[2] (CJ:4621-4622) ; choisirOutil (CJ:4596) garde le modèle (S.outil.modele).
  - Les deux poses copient ce modèle, sinon defautsPt : poserObjet (CJ:4050) et « Cotes » (aide de l'outil, CJ:4647), dont S.cotes.pour le garde ({t,
    modele} : CJ:4183) pour poserParCotes (CJ:4366) et l'aperçu (CJ:4441). L'aide (CJ:4646), le titre des cotes (aideCotes, CJ:4298) et le panneau
    (cotesHtml, CJ:4309-4312) donnent son nom (« posée » si p.art est 'la' [p]). Sans cela, un « Étang » posé par cotes perdrait son nom et son
    jugement (sonde `contre-verif-cotes-modele.js`).
  - « + Nouvelle destination » ouvre une fiche courte (nom, abréviation, article, jugement des EP, case du constat), au départ nom vide, abréviation
    tirée du nom, « le », « à arbitrer » (à trancher dans le croquis, Contrôles), « autre » [p] ; nom vide ou qui contient « puits » refusé (D3) ;
    elle enregistre le modèle et arme l'outil. La fiche d'une destination a les mêmes cinq champs, un pas d'annulation chacun. Le jugement suit la
    fiche, jamais le nom (D3) ; la fiche du puits n'en a aucun.
  - Changer le jugement des EP retire, dans ce pas, les décisions du croquis (écartée, nature) des ep-exu des sources qui y aboutissent [p], ce que la
    fiche dit : sinon un rejet écarté « à arbitrer » le resterait en « non conforme » (la décision suit la clé de la source, CJ:1417-1419). Relier la
    source ailleurs garde la décision, comme toute anomalie ; une nature choisie au dossier reste (l'enregistrement retouché fait foi, CJ:1450-1451).
  - Changement de type (CJ:5276-5287) : vers « Autre destination », p reçoit defautsPt ; d'une destination vers un autre type, ses champs s'effacent
    avec le toast d'aujourd'hui (CJ:5286) ; a, meth, niv, obs, st et etiq restent.
  - Bouton « Rejet au sol » (m118, fait), dans la fiche d'une source EP qu'aucun tracé ne tient : infiltration posée à 1 m, à l'opposé de la façade la
    plus proche, et tronçon sans réseau attaché aux deux (« À compléter » en v1.7.0, D11), en un seul pas d'annulation.
  - Outils « Drain » et « Drain d'infiltration » (m124) : OUTILS_LN (CJ:2502) reçoit
    `drain: {k:'ln', t:'tr', p:{drain:'collecte', res:'EP'}, lib:'Drain', res:'EP'}` (Q3 b : tuyau EP, comme 'trEP') et `drainInf` (p
    {drain:'infiltration', res:''} : D4 ; « Drain d'infiltration » ; aperçu vert par le res 'EP' de l'outil) [p]. PALETTES.tr (CJ:2546) : juste après
    'ln:trPrj' (« Projet ») ; 'ln:lim' et 'ln:esc' restent voisins (navigateur/escalier.js:253-255). Icône drainSvg (CJ:4611), aide (CJ:4642-4643).
  - L'outil ne pose aucun point : le drain de collecte compte lui-même au constat (Q4 b, D7), le drain d'infiltration est l'exutoire (D4). Fin de
    tracé (terminerTrace, CJ:4518) : toast « Drain ajouté » ou « Drain d'infiltration ajouté » ; nomTrace(t, p) (CJ:885) lit p.drain, appelée en
    CJ:4556 avec l.p ; fa.lp = lf.p près de fa.lt (CJ:3813) pour les messages de fin (CJ:3819, 3826 : « Drain déjà terminé »).
  - Prolongation (ajouterPointTrace, CJ:3792 ; terminerTrace, CJ:4536-4538) : seulement entre tuyaux du même p.drain. Dans la fiche (m121), changer
    p.drain ne pose ni ne retire aucun objet.
  - Contrôles (CJ:1399-1405) : aucun « Tronçon : extrémité libre » sur un drain (cadrage, l. 155) : la sortie du drain de collecte est présumée au
    réseau EP sans message (Q3 b), le drain d'infiltration n'attend aucun exutoire. Un équipement relié à un drain de collecte sans sortie dessinée :
    Q6 ; avec (b), recommandée, aucun message : il disperse dans le sol (cas limite de D4, m129).
  - Regard sur un drain : aucune règle propre. Sur un drain de collecte en EP, le regard est EP (tampon béton en réserve, pas de « sans cunette ») par
    les règles d'aujourd'hui (sonde `sonde-q4-drain-source.js`, cas C8) ; sur un sommet d'un drain d'infiltration, il mène à DISP et se juge en EP :
    resPt y rend 'EP' au lieu de 'INC', pendant de CJ:1292 pour le collecteur (m122) [p].
- D11 Compatibilité.
  - doc.v reste 1. Tout champ nouveau est facultatif : p.drain ; p.nom, p.ab, p.art, p.ep, p.cst ; P.recup ; croquisConfig.exutoires. Un croquis de la
    v1.7.0 s'ouvre et s'analyse à l'identique, sauf la conclusion voulue de l'arbitrage (D6) ; aucun champ nouveau n'y est écrit tant qu'on ne touche
    pas l'objet.
  - Garde à valeurs figées (vm/compat.js, 35 croquis, SORTIES l. 28), verte à chaque correctif. m116 y a ajouté la sortie « constat » (rows, epRecup,
    sansCote) : 245/245 (35 × 7). m119 n'y change rien (D6).
  - Tablette restée en v1.7.0 (m119) : une anomalie à arbitrer y laisse « Conformes » ; un constat signé sur une tablette à jour pendant un
    arbitrage y paraît changé depuis la signature (conclusion, parfois installations ou anomalies) : il est intact ; n'y pas toucher « Modifier »,
    qui efface les signatures (LISEZMOI.txt).
  - Différentiel du cadrage (l. 110), en m116 : `node tests/vm/aleatoire.js 8000 --contre=<copie de 52cd3c8>` compare chaque croquis dans les deux
    modes (résultat par source, anomalies, conclusion, contrôles, constat déduit), sans écart attendu. Relancé contre le commit d'avant, générateur
    sans ses options nouvelles, en m117, m119 (écarts attendus : la conclusion, de 'conformes' ou 'reserves' vers un code d'arbitrage, et
    rows[].arbitrer), m122, m123, m125 et m129.
  - Un croquis nouveau lu par une v1.7.0 (sondes `contre-verif-d11-*.js`, `revision-drains.js`) ne fait aucun échec : types inconnus gardés (m106,
    croquis/LISEZMOI.txt:23), dessinés en neutre, bloc VEDE_OBJET. Leur nœud devient un bout libre (CJ:932, 937), jugé selon le tronçon qui y mène
    (CJ:1210-1220) : sans réseau (« Tronçon », drain d'infiltration, « Rejet au sol »), « À compléter » ; Tronçon EP, EU ou unitaire, raccordement
    présumé à ce réseau (descente ou WC conforme selon le réseau, sinon eu-ep ou ep-eu), jamais eu-sol, eu-puits, ep-puits, eu-exu ni ep-exu. À
    l'ouverture (synchroniser, CJ:2637-2642), elle retire du dossier ces anomalies restées intactes (CJ:1535-1536 ; copieRetrait, CJ:1568) ; avant, le
    dossier les garde (« Non conformes », constat « non » : sonde `sonde-puits-d11-telquel.js`) ; une anomalie retouchée reste, orpheline ; en v1.7.1,
    le dessin les rend telles quelles, même id (CJ:1599-1611). Un drain y est un tronçon sans peigne ni légende : celui de collecte (p.res 'EP') y
    reste présumé au réseau EP, comme en v1.7.1, mais sans ligne au constat, et un équipement qui y est relié aussi (Q6) ; celui d'infiltration (p.res
    '', D4) y donne « À compléter ». p.drain reste dans le fichier [p]. Une anomalie à arbitrer y laisse « Conformes ». P.recup y est effacé à la
    restauration (IX:4540 : case cochée, sans suivi) ; croquisConfig y est réécrit sans les modèles (IX:3147) : un retour en arrière les perd [p].
  - Une v1.6.3 (en ligne) analyse de même (sondes sur une copie de 22df7f2). Un type inconnu y fait échouer la légende du plan PDF (`T[e.t].lib`,
    croquis.js:4329 de la v1.6.3) et sa fiche (`ty.role`, l. 3439) [p : lu, non essayé] ; un drain seul passe.
  - Risque qui reste : un Tronçon EP, EU ou unitaire tracé à la main vers une infiltration, un puits ou une destination ; un constat signé sur une
    tablette pas à jour le garde (IX:3618). Consigne de LISEZMOI.txt, MISE À JOUR DE L'APPLICATION (m117, complétée en m120, m124 et m128), reprise
    dans l'annonce de la v1.7.1 (corps de la PR) :
    « Mettez à jour toutes les tablettes avant de poser une infiltration au sol, un puits, une autre destination ou un drain, et avant d'échanger une
    sauvegarde ou un dossier qui en contient (la version se lit au pied du plan PDF). Une tablette restée en v1.7.0, ou plus ancienne, ne connaît pas
    ces objets : un « Tronçon EP », « Tronçon EU » ou « Tronçon unitaire » qui y mène y est présumé raccordé à ce réseau. Une descente vers un puits,
    un WC vers une infiltration, non conformes sur une tablette à jour, y restent non conformes tant que le croquis n'y est pas ouvert ; son ouverture
    retire du dossier les anomalies « rejet au sol » ou « rejet dans un puits » que personne n'a modifiées, et le plan comme le constat y paraissent
    alors conformes (« À compléter » par un simple « Tronçon » ; par un « Tronçon EP », un WC y reste non conforme, mais comme raccordé aux EP ; par
    un « Tronçon EU », une descente y reste non conforme, mais comme raccordée aux EU) ; elles reviennent sur une tablette à jour. Un drain y est un
    simple tuyau : un drain d'infiltration, comme le bouton « Rejet au sol », y donne « À compléter » ; un drain de collecte n'y compte pas au
    constat, et un équipement qui y est relié y est présumé raccordé au réseau EP. Une anomalie à arbitrer y laisse « Conformes ». N'y signez aucun
    constat de ces dossiers : un constat signé ne change plus. »
    La version ne s'affiche qu'au pied du plan PDF (IX:4832, CJ:5842) [p : aucun autre affichage trouvé]. « Ou plus ancienne » attend l'essai de m128
    sur la v1.6.3 [p] : si le plan PDF n'y sort pas, la consigne le dira.
- D12 Croquis désactivé ou absent : comportement de la v1.5.1.
  - vcPret (IX:3149 : module chargé et croquis actif) garde constatDepuisCroquis (IX:3618), vcEcarts (IX:3708) et vcConstatApres (IX:3766) : P.recup,
    les rappels par case et la reprise des cases n'agissent pas. Il garde aussi les lignes et la conclusion proposée de l'arbitrage (constatEval,
    m119 ; D7) : sans croquis, comme aujourd'hui. Les Réglages ne montrent « Destinations ajoutées » qu'avec le module et le croquis actif (IX:3529),
    comme les aides. vcResume (IX:3576) calcule r.recup, r.arbitrer et rows[].arbitrer, que seules des fonctions gardées par vcPret lisent.
  - Inchangés : RACC et EP_RECUP (IX:1904-1912), raccOk (IX:1957), precosAuto (IX:2006-2023), le reste de constatEval (IX:2025), PDF du constat
    (IX:2958), croquis simple (IX:2342, 2368), exception du lavabo (ligne « Évier », m96). croqAuto.recup et croquisConfig.exutoires restent inertes ;
    les anomalies déjà au dossier restent telles quelles.

## Découpage (m116 à m129, puis m136 ; quinze correctifs, batterie verte après chacun ; fusionnés en v1.7.1, PR #13, 16 nov. 2026)
Ordre : le commun, sans changement visible (m116) ; l'infiltration (m117, m118) ; l'arbitrage, règle générale, juste après m118 (m119) ; le puits
(m120) ; les drains (m121 à m124) ; les destinations (m125 à m128), la palette après l'analyse et le rendu ; les cas limites des drains, après les
réponses à Q6 et Q7 (m129). m116 à m129 sont envoyés (le lot est fini) : leur fiche ne change plus (celles de m116 à m123 renvoient au message de leur
commit pour les tests et la garde). Chaque test nouveau échoue sur le commit d'avant ; vm/compat.js reste vert partout ; tests/LISEZMOI.md suit chaque
test ajouté. Dès m117, poser un objet nouveau demande des tablettes à jour (D11). Après m129 : 14 correctifs depuis la fusion de la v1.7.0, 6 de
libres avant la suivante.

- **m116 Table commune des exutoires et suivi des cases EP du constat**, avant tout type nouveau (D1, D7).
  - Fichiers : CJ : EXU, codeExu, resTrace, libExu et leurs lecteurs (D1), règles EU, raccInfo, constatDeduit, panneau ; codeExu vient ici, pour que
    m125 n'ajoute que la clé (terminal, an.exu). IX : vcResumeCalc, constatDepuisCroquis, vcEcarts, vcProvenance, restauration (D7). Tests :
    vm/compat.js et compat.json (sortie « constat » ; en-tête, l. 8-19) ; nouveau vm/rejets.js (tests/tout.sh:14) ; vm/aleatoire.js (--contre) ;
    canevas factice, enveloppe jsPDF et lecture du DXF de vm/escalier.js (l. 310-328, 367-385, 458) déplacés dans vm/charger.js [p], le canevas
    relevant aussi fillText et fillStyle.
  - Pour l'utilisateur : rien.
  - Tests et garde : dans le message du commit 8f9094d.
  - Risques : un libellé changé d'une lettre change l'empreinte de l'analyse ; ordre des règles EU (eu-ep d'abord, CJ:1321) ; pièges de D1 et D5 (a3).
- **m117 Infiltration au sol : type, règle, constat, rendu** (souhait 3, 1re partie du cadrage, l. 138 ; D2, D6 à D9).
  - Fichiers (CJ) : def et FAMILLES, EXU.SOL et eu-sol, REGLES_LIGNE, primitives, rayonSymbole, angleSymbole, blocs DXF (masque sauté), note du
    panneau ; croquis/LISEZMOI.txt (l. 11, 26-28) ; LISEZMOI.txt (consigne de D11).
  - Pour l'utilisateur : « Infiltration au sol » dans la palette Équipements, après Puisard ; symbole et tuyau verts. Un WC relié est NC (« WC : rejet
    au sol (infiltration) »). Une descente reliée est conforme sur le plan ; au constat, elle coche « Infiltration diffuse », raccordement et
    conformité restant à cocher à la main, comme pour un puisard.
  - Tests et garde : dans le message du commit ab926ec.
  - Risques : étiquette longue et ligne de légende de plus (débordement du cadre) [p] ; eu-sol doit paraître au contrôle de l'avant-projet (CJ:5914,
    cat 'inversion').
- **m118 Bouton « Rejet au sol »** (souhait 3, 2e partie du cadrage : le raccourci ; D10).
  - Fichiers : CJ ficheHtml (CJ:4831) et son action, fonction de pose nouvelle. vm/generateur.js : option `exutoires` (liste ; l'ancienne par défaut,
    l. 14 ; sans tirage de plus quand elle manque, l. 38), passée par vm/aleatoire.js:59 avec 'infiltration' ; commentaire de compat.js:89 (ni cette
    option, ni `drains` en m124). LISEZMOI.txt (CROQUIS DE TERRAIN).
  - Pour l'utilisateur : la fiche d'une descente (grille, siphon de sol…) non reliée propose « Rejet au sol » : infiltration et tuyau posés d'un
    toucher ; « Annuler » retire les deux.
  - Tests et garde : dans le message du commit 6df324c.
  - Risques : pose sur un bâti ou un objet (D10) ; générateur partagé avec compat.js (l. 91) : sans l'option, mêmes 30 croquis.
- **m119 Arbitrage : une anomalie à arbitrer n'est jamais comptée conforme** (consigne du 13 nov., Q1 ; D6, D7, D12). Fait : a5a5d05, 14 nov.
  - Fichiers : CJ conclusion et CONCL ('boite', 'tampon', 'arbitrer', 'plusieurs'), etatAnomalie, ligneArbitrer et etatSourceDe (nouvelles),
    raccInfo, constatDeduit (rows[].arbitrer) ; IX constatEval, constatIssues (deux rappels), constatFigeCalc (fige.arbitrer), vcResumeCalc,
    vcArbitrage et vcResumeSiBesoin (nouvelles). LISEZMOI.txt (CROQUIS DE TERRAIN ; tablette restée en v1.7.0).
  - Pour l'utilisateur : tant qu'une anomalie reste « à arbitrer », le plan PDF dit « À compléter : … à arbitrer » au lieu de « Conformes » ou
    « Conformes avec réserves », et la conclusion proposée du constat reste vide ; y choisir « Conformes » ou « Conformes avec réserves » donne un
    rappel. Quand l'anomalie porte sur l'équipement (descente non visitable ou mauvais réseau mis « À arbitrer », fosse peut-être traversée, saisie
    à la main posée sur lui), sa fiche est aussi « en attente » et sa ligne du constat garde son raccordement sans être déclarée conforme, même
    ressaisi ; « Oui » à « Conforme » pour cette ligne donne un rappel. Une boîte manquante ou un tampon absent ne jouent que sur la conclusion.
    Un constat signé ne change pas (signé pendant un arbitrage, il paraît « changé depuis la signature » une fois l'anomalie retenue ou écartée) ;
    croquis désactivé ou absent : comme en v1.5.1.
  - Tests et garde : dans le message du commit a5a5d05.
  - Risques : textes [p] ; résumé du croquis calculé après coup : la conclusion proposée se vide à son retour (vcConstatApres) [p] ; une ligne ou
    une conclusion déclarée conforme à la main le reste (rappel seulement) ; sans équipement analysé ni anomalie retenue, une anomalie à arbitrer
    laisse « sans objet », comme avant, jamais « Conformes » [p, à signaler] ; un constat signé pendant un arbitrage imprime ensuite la conclusion
    que propose le dessin (D7) [p].
- **m120 Puits : type à règle fixe** (Q5.1, Q5.2 ; D1, D3, D6 à D9). Fait : 7a6c041, 14 nov.
  - Fichiers (CJ) : def('puits') (champ rappel : aide et fiche) et FAMILLES ; EXU.PUITS (règles EU et EP) ; reglesAnomalies ; REGLES_LIGNE ;
    raccInfo(r, groupe, arb, arbL, etEP) et constatDeduit (ligne EP d'après l'état de ep-puits) ; phrase du panneau Constat ; primitives (forme
    'puits'), rayonSymbole, bloc DXF VEDE_PUITS ; filtre de l'avant-projet (/^(fosse|ep-puits):/). vm/aleatoire.js : puits tiré, option
    --sans=<type>,…. LISEZMOI.txt (consigne de D11, « Tronçon EU » compris ; puits perdu), croquis/LISEZMOI.txt.
  - Pour l'utilisateur : « Puits » dans la palette Équipements, après « Rejet en milieu naturel » : deux cercles verts, anneau plus étroit que celui
    du puisard. Une descente reliée : « Descente EP : rejet dans un puits », NC, au dossier, « Non conformes » au plan ; un WC relié : « WC : rejet
    dans un puits ». Rien à régler dans la fiche ; l'anomalie se retient, se met à arbitrer ou s'écarte dans Contrôles. Constat : ligne « Puits :
    rejet en milieu naturel » ; en EP, « non » tant que l'anomalie est NC au dossier, « oui » si elle y devient une réserve ou est écartée, jamais
    « oui » à arbitrer ; le panneau Constat dit pourquoi. Aide et fiche : un puits perdu se dessine en Puisard. Avant-projet : un rejet que le projet
    garde reste dans « Reste après travaux ».
  - Tests et garde : dans le message du commit 7a6c041.
  - Risques : symbole proche de celui du puisard sur l'A4 (0,25 mm de blanc entre les traits, contre 0,75) [p, à signaler] ; code MILIEU en EP [p] ;
    un nom qui contient « puits » est refusé à une destination (m127, D3) ; un fichier fait à la main qui en garde un suit sa fiche ; ep-puits hors du
    futur barème des Réglages, ou montrée verrouillée [p].
- **m121 Drains (1) : champ, fiche, peigne, légende, DXF** (souhait 4, 1re partie du cadrage, l. 157 ; Q2 a ; D4, D8, D9). Fait : b562636, 14 nov.
  - Fichiers (CJ) : sorteDrain, drainDe, nomTrace(t, p), defautsLn ; fiche du tronçon (puces « Drain », action 'drain', puces Réseau masquées sur un
    drain d'infiltration) ; dentsPeigne (peigne du tracé entier) et dentsPiece (ses dents, pièce par pièce) à l'écran, au PDF et au DXF ; légende et
    échantillon ; ecrireDxf (VEDE-DRAINS ; ligne et dentsDxf prennent un type de ligne). vm/charger.js : 7e champ de doc().
  - Pour l'utilisateur : puces « Drain : Non, Collecte, Infiltration », en un pas d'annulation ; « Collecte » met en EP un tronçon « Déduit » (EU, EP,
    unitaire gardés) ; « Infiltration » le laisse sans réseau ; « Non » garde le réseau. Peigne : une dent de 0,4 m par mètre, à droite (collecte) ou
    des deux côtés, aux mêmes places à l'écran, au DXF et au PDF jusqu'au 1/500 (au-delà, une dent tous les 2 mm sur le papier) ; le pas ne repart pas
    à un regard. Légende : « Drain », « Drain d'infiltration ». DXF : VEDE-DRAINS (3) s'il sert ; un drain projet ou à supprimer reste sur son calque,
    dents en trait plein. Jusqu'à m122 et m123, il s'analyse comme un tronçon.
  - Tests et garde : dans le message du commit b562636.
  - Risques : fiche du tronçon plus haute [p] ; légende qui peut déborder du cadre [p] ; à l'écran, pas sans minimum en pixels [p] ; gris 8 du drain
    d'infiltration au DXF jusqu'à m122 (3, D9) ; peigne et hachures sur un drain « à supprimer ».
- **m122 Drains (2) : drain d'infiltration, exutoire linéaire, étiquette** (consigne du 13 nov. ; D1, D4, D5, D7 à D10). Fait : bd16bb9, 14 nov.
  - Fichiers (CJ) : EXU.DISP ; analyser (sommets tenus vers 'D:<id>' par des pièces col ':d', et entre eux par des liens col ':e' sans sens ; objet
    tenu sans réseau en EP, sauf la boîte de branchement) ; terminal ; terminalCollecteur ; controles ; resLigne ; texteEtiquette ; fiche du tronçon.
    Les trois LISEZMOI.
  - Pour l'utilisateur : une descente ou une grille qui rejoint le drain, par un tronçon ou sur un sommet, est conforme (« Rejet : dispersion dans le
    sol », case « Infiltration diffuse ») ; un WC est NC (eu-sol) ; bouts libres sans contrôle ; vert, étiquette « Dispersion dans le sol », couleur 3
    au DXF ; fiche « Dispersion dans le sol », sans puces de sens ; un regard tenu est EP, une boîte de branchement tenue garde INC. Ce que le drain
    tient ou prolonge (puits, boîte, trop-plein) reste vu : deux exutoires, « multiple » (Q7).
  - Tests et garde : dans le message du commit bd16bb9.
  - Risques : « multiple » qu'aucun sens vrai ne lève ; WC relié par le drain au réseau EU : « multiple », pas NC (Q7) ; « Tronçon EU : le dessin le
    relie à réseau EP » vers SOL, PUITS, DISP (mineur reporté, depuis m117) ; p.res 'EP' fait à la main ignoré [p] ; v1.7.0 : tronçon sans exutoire.
- **m123 Drains (3) : drain de collecte, source linéaire, constat** (Q3 b, Q4 b ; D4, D6, D7). Fait : d036ee1, 14 nov.
  - Fichiers (CJ) : drainSource, srcObj (VCroquis.srcObj) ; analyser (nœud 'dr:<id>' relié par des pièces virt à chacun de ses nœuds, sauf le bout
    amont d'un drain orienté, retirées après son analyse ; nbPieces ; resVers vidé ; pas de noterSens) ; reglesAnomalies (« pas de boîte » : point
    source d'abord) ; fosseArbitrage ; controles (source(), « contredit » par nomTrace, pas d'« extrémité libre » sur un drain) ; constatDeduit ;
    ficheHtml (puces « Méthode de test ») ; pageTableaux (page 2, avant-projet). Les trois LISEZMOI.
  - Pour l'utilisateur : chaque drain de collecte compte au constat (« Autres : Drain »), avec sa méthode de test ; sortie non dessinée : réseau du
    tracé (EP présumé, sans message ; « Déduit » : exutoire non dessiné) ; règles d'une source EP (puisard, sol, drain d'infiltration : conformes ;
    EU, puits : NC ; deux exutoires : « multiple ») ; un point « Drain » du plan affiché sur un sommet compte seul ; « Drain EP : le dessin le relie à
    réseau EU ».
  - Tests et garde : dans le message du commit d036ee1.
  - Risques : bout amont d'un drain orienté sans son eau [p] ; aucun drain tiré n'a de nœud au milieu (d14 seul couvre la relecture ; m124) ; un drain
    au réseau « EU » indiqué : NC (présumé).
- **m124 Drains (4) : outils, générateur, documentation** (souhait 4, 2e et 3e parties du cadrage ; D10). Fait : 65c4685, 14 nov.
  - Fichiers (CJ) : OUTILS_LN (drain, drainInf), PALETTES.tr, drainSvg, nomGeste (messages du geste), msgFin et msgFinSous (fa.lp), prolongation (même
    p.drain), toast de fin. vm/generateur.js : option drains, sur une suite de tirages à part ; vm/aleatoire.js (--sans=drains, comptageDrains). Les
    trois LISEZMOI ; commentaires de vm/compat.js.
  - Pour l'utilisateur : « Drain » et « Drain d'infiltration » juste après « Projet » ; « Drain ajouté : réseau EP », « Drain d'infiltration ajouté :
    dispersion dans le sol » ; aucun point posé ; prolongation seulement entre tuyaux de la même sorte (sinon un raccord).
  - Tests : navigateur/drain.js o1 à o4 (41 cas, 22 sur 28 avant) ; aléatoire 8000 avec drains : aucune exception, 16 062 drains comptés, aucun écart
    de comptage ; sans drains, contre avant : aucun écart ; compat 245/245.
  - Risques : toast « dispersion dans le sol » même si le drain d'infiltration atteint un autre exutoire [p] ; un Tronçon tracé au bout d'un drain
    part d'un raccord (avant : il le prolongeait) [p] ; un drain tracé a p.sens 0 [p].
- **m125 Destinations (1) : modèle, analyse, règles, constat**, hors palette (souhait 2, 1re partie du cadrage, l. 116 ; D3, D5 à D7). Fait : f9633c6,
  14 nov.
  - Fichiers (CJ) : EXU.X (lib, res 'EP', dest) ; DEST_EP, DEST_CST, destDe (VCroquis.destDe), nomCle, cleDest, ligneDest, ligneExu (ligne d'un
    rejet : la table, ou les champs de an.exu[clé] ; sans an, une destination sans champ, à arbitrer), libsRejets (message « multiple ») ;
    def('exutoire') hors de FAMILLES ; defautsPt ; analyser (cleX, an.exu dans l'ordre des identifiants ; terminal) ; reglesAnomalies (eu-exu ;
    ep-exu, arbitrer pour 'arbitrer') ; controles ('exuarbitrer') ; conclusion et CONCL ('exu') ; REGLES_LIGNE ; raccInfo (6e argument an),
    constatDeduit ; texteEtiquette ; constatHtml (« oui » promis pour une réserve seulement sur une ligne à code EP_, UN_, GARG ou MILIEU) ;
    pageTableaux (avant-projet : ep-exu).
  - Pour l'utilisateur : rien encore (palette en m127), sauf la phrase du panneau Constat pour une ligne sans code (puits et puisard sur la même
    façade).
  - Tests : vm/regles.js, 46 cas (34 avant) ; vm/rejets.js x1 à x5, 94 cas (79 avant) ; navigateur/dossier.js 61 à 65, 96 cas (90 avant).
  - Garde : compat 245/245 sans régénération ; aléatoire 8000 contre avant : aucun écart ; sonde m125/sonde-dest.js, 8000 tirages (2 855 plans à
    destinations, 3 254 sources) : aucune exception (963 PDF, 3 809 DXF) ; 1 364 sources EU, toutes NC ; EP : 301 conformes, 298 réserves, 290 NC,
    1 001 à arbitrer, jamais « Conformes » ; jumeaux conformes ↔ exutoire de la table : même conclusion.
  - Risques et [p] : « Puits » jugé conforme dans un fichier fait à la main reste conforme (D3 ; test de regles.js ; à soumettre) ; ep-exu à arbitrer
    puis retenue : préconisation sans « Suppression du rejet… » ; ab de 2 ou 3 caractères, sinon les deux premiers du nom ; nom coupé à 40 ; an.exu
    garde les champs du premier objet de chaque clé.
- **m126 Destinations (2) : symbole, PDF, DXF, textes libres, réparation au chargement** (souhait 2, 3e partie du cadrage ; D3, D8, D9). Fait :
  419d752, 14 nov.
  - Fichiers (CJ) : estDest (VCroquis.estDest) ; rayonSymbole et primitives (forme 'exutoire' : hexagone de rayon 2,1, sommets à 0°, 60°…, abréviation
    de destDe en 1,65, ou 1,3 pour trois caractères) ; symboleSvg(t, taille, p), ficheHtml (e.p) ; legende (clé nom et abréviation, it.p) ; pdfPlan
    (échantillon par it.p ; libellé en 7,2 pt jusqu'à 287 mm, sinon réduit jusqu'à 5,5 pt, puis nom coupé par « … », abréviation gardée) ; ecrireDxf
    (cleBloc, nomBloc : noms VEDE_<TYPE> réservés d'abord, puis VEDE_EXUTOIRE_ + abréviation réduite, _2, _3 dans l'ordre du dessin). IX planValide
    (replis de destDe écrits dans e.p ; p.drain inconnu retiré ; dès que le module est chargé, même croquis désactivé). vm/charger.js (largeur w et
    taille pt des textes du PDF).
  - Pour l'utilisateur : rien avant m127, sauf pour un fichier fait à la main.
  - Tests : vm/rejets.js x4, 105 cas (94 avant) ; navigateur/constat-boite.js, cas 14, 70 cas (65 avant).
  - Garde : compat 245/245 sans régénération ; aléatoire 8000 contre avant : aucun écart ; sonde m126/sonde-dest.js, 8000 tirages (2 855 plans, 4 279
    destinations) : symbole, ligne de légende, bloc et étiquette pour chacune, 963 PDF sans erreur (115 lignes réduites, 46 coupées) ; planValide :
    8 000 croquis sans destination rendus tels quels, aucun écart d'analyse ni de DXF après réparation, constats signés inchangés.
  - Risques et [p] : réparation écrite pour de bon (Q8) ; abréviation sans caractère imprimable : hexagone vide, « Nom () » à la légende, « ?? » au
    DXF (refus à la saisie en m127) ; « %% » d'un nom passe au DXF (codes d'AutoCAD), comme pour les textes libres ; « Étang (Ét) » et « étang (ét) »
    font deux lignes de légende.
- **m127 Destinations (3) : palette et fiche** (souhait 2, 2e partie du cadrage, côté éditeur ; D10). Fait : 27fb4c5, 15 nov.
  - Fichiers (CJ) : FAMILLES 'equ' ('exutoire' après 'puits') ; defautsPt(t, m) (champs du modèle de l'outil, S.outil.modele), poserObjet, tapPlan,
    entrerCotes (S.cotes.pour), poserParCotes et l'aperçu ; nomPose (aide de l'outil, aideCotes, cotesHtml) ; saisie (option max) ; ficheHtml (cinq
    champs) ; actions 'dest' et 'destTxt' ; abDe, artDevant, oublierJugement ; ncJugee, integEdl et reconcilier (correction de la relecture).
    LISEZMOI.txt (l'objet, sa fiche, la consigne de D11), croquis/LISEZMOI.txt (règle, conclusion « À compléter : rejet des eaux pluviales à
    arbitrer »), tests/LISEZMOI.md ; tests/vm/copie.js (t et e).
  - Pour l'utilisateur : « Autre destination » juste après « Puits » ; fiche à cinq champs (nom, abréviation, article, jugement des EP, « À arbitrer »
    au départ, case du constat) ; refus par un toast, sans rien écrire : nom vide, qui contient « puits » ou « puit », ou illisible au PDF ;
    abréviation hors de 2 ou 3 caractères, ou illisible ; jugement changé : décisions de Contrôles sur les rejets des EP qui y aboutissent retirées
    dans le même pas ; « Type » : vers une destination, champs par défaut ; vers un autre type, champs effacés avec le toast d'aujourd'hui.
  - Tests : vm/rejets.js x1 repris, modèle de la pose, x6, x7 (145 cas, 123 avant) ; navigateur/rejets.js a1 à a5 (66 cas, 47 avant) ; vm/copie.js t
    et e ajustés (7 cas, 5 avant).
  - Garde : compat 245/245 sans régénération ; aléatoire 8000 contre avant : aucune exception, aucun écart (10 666 analyses) ; sondes : seule la
    palette Équipements change (« Autre destination » en dernier) ; sur 37 fiches, seuls le sélecteur « Type » des équipements et la fiche de la
    destination changent ; vérification ciblée de la correction (integEdl, reconcilier) : un défaut majeur trouvé (un tampon béton dont le texte
    retouché nomme un défaut passait en réserve écrite quand le regard devenait EP), corrigé : le dessin n'impose au dossier qu'un jugement
    (ncJugee) ; la correction relue par deux relecteurs (un défaut dit majeur, une réserve gardée, revenue ou réécrite sur un enregistrement passé en
    EU au dossier, ramené à un mineur par la contre-vérification : la réécriture corrigée, la réserve gardée comme en m126 ; trois mineurs d'ordre des
    gestes corrigés) ; gestes tirés au hasard sur la nature, contre m126 : seuls des écarts voulus.
  - Relecture : défaut bloquant corrigé : « Réserve » choisie après « Non conforme » laissait l'anomalie non conforme au dossier ; le dessin y écrit
    maintenant un jugement (ncJugee : une nature que la règle du dossier ne donne pas sur le texte du dessin, jamais une réserve hors EP), en place
    (reconcilier, aussi quand l'enregistrement revient en EP) comme à la recréation d'une copie (integEdl) ; une nature écrite qui suivait le dessin
    est effacée (null : la règle) quand il passe à une nature qui n'est pas un jugement. Écartés : le même repli dans destDe (il changerait le rendu
    de m125 et m126 ; avec Q8 en m128) ; « le » proposé en pointillé (un champ de plus ; à la place, un toast et l'aide de la ligne Article).
  - Risques et [p] : « puit » refusé comme mot ; article réglé par la première lettre du nom (h, y, chiffre : inchangé) ; l'abréviation qui suivait le
    nom suit le nouveau ; textes retouchés gardés quand le jugement change ; nature : sous « Réserve », un texte de rejet retouché qui nomme un défaut
    (« cassé ») garde la réserve (le jugement prime) ; un texte de rejet retouché qui mentionne un « tampon béton » reste en réserve après « Non
    conforme » (la règle du dossier lit le texte, a5) ; une réserve écrite par le jugement reste quand le réseau passe en EU au dossier (une nature
    écrite prime, comme en m126) ; une copie de retrait au texte retouché « … tampon béton fissuré » est recréée non conforme (avant : réserve
    écrite).
- **m128 Destinations (4) : modèles de la tablette, documentation** (souhait 2, 2e et 4e parties du cadrage ; D3, D10 à D12 ; Q8 b). Fait : 7b4f489,
  15 nov.
  - Fichiers : IX : CROQ_DEF, croqCfgLire, croqCfgEcrire (exutoires) ; vcEditeur (enregistrerExutoires), vcOuvrir (option exutoires) ;
    croqReglagesHtml (« Destinations ajoutées »), vcExuModifier, vcExuRetirer ; planValide (vcPasTexte : Q8 b). CJ : champDest, destSaisie, modelesDe,
    DEST_ARTS, DEST_EPS, DEST_CSTS (exportés, avec artDevant) ; ouvrirPalette ('pt:exutoire:<id>', 'nv:exutoire'), modeleExu, nouvelleDestination,
    S.exutoires, S.outil.mid ; destDe (abréviation illisible au PDF) ; toast au-dessus des fenêtres. Labo : 'vcl-exutoires'. vm/generateur.js et
    vm/aleatoire.js : type 'exutoire'. Les trois LISEZMOI.
  - Pour l'utilisateur : « + Nouvelle destination » : fiche courte, mêmes refus que la fiche ; « Enregistrer » ajoute la destination à la palette de
    la tablette et arme sa pose ; Réglages, « Destinations ajoutées » : « Modifier », « Retirer », sans toucher un objet posé ; hors sauvegarde.
  - Tests : navigateur/rejets.js m1 à m3 (84 cas, 66 avant) ; navigateur/constat-boite.js, cas 14 ajusté (13 vérifications, 6 fausses avant) ;
    vm/rejets.js x4 (147 cas, 145 avant). Garde : compat 245/245 ; aléatoire 8000 sans et avec 'exutoire' contre avant : aucune exception, aucun écart
    (669 destinations, dont 139 abréviations illisibles) ; mêmes tirages sans 'exutoire' (32 000) ; v1.6.3 : plan PDF du croquis du lot refusé
    (« reading 'lib' »), fiches de l'infiltration, du puits et des destinations refusées dans le croquis, fiche et constat du dossier sortis (consigne
    de D11 complétée).
  - Relecture : aucun défaut bloquant ni majeur ; six mineurs corrigés (article dans « Modifier » ; repli lisible de l'abréviation d'un nom qui
    commence par un émoji ; notice de l'hôte ; refus du nom dans LISEZMOI.txt).
  - Risques et [p] : doublons de nom acceptés ; un modèle invalide ou un champ inconnu est perdu à la première écriture de la liste (modelesDe) ; une
    tablette remise en v1.7.0 efface les modèles au premier changement d'un réglage du croquis ; l'objet posé ne garde pas l'identifiant du modèle ;
    un ancien article rechoisi à la main après un nouveau nom est réglé à l'enregistrement ; v1.6.0 à v1.6.2 et v1.7.0 lues, pas essayées.
- **m129 Drains (5) : cas limites des drains** (Q6 b, Q7 a ; D4, D5, D10). Fait : aabb18c, 15 nov.
  - Fichiers : CJ : rejetsDe, auDelaTxt, liens ':e' du drain d'infiltration (un lien saute un exutoire tenu), parcours sans liens, estDrainSrc,
    drainsDuBout, boutDispersant, suitDrain, parBoutsDisp, an.drainsDisp ; reglesAnomalies, controles, constatDeduit, texteEtiquette, panneau Constat
    et pageTableaux lisent chaque rejet. vm/aleatoire.js (r.drains, r.apres). Les trois LISEZMOI.
  - Pour l'utilisateur : Q6 b : équipement relié au bout libre d'un drain de collecte sans sortie dessinée : dispersion dans le sol (descente
    conforme, « Infiltration diffuse » ; WC NC) ; le drain suit, au constat aussi ; étiquette au drain dont un bout disperse. Q7 a : ce qui n'est
    atteint qu'au-delà du drain d'infiltration garde sa règle et sa case ; bifurcation avant le drain ou deux autres destinations au-delà :
    « multiple ».
  - Tests : vm/drain.js d16, d17 (d14 et d15 étaient pris) ; d8, d11, d13, g1, g2 ajustés ; 132 cas, 95 sur m128. Garde : compat 245/245 ; aléatoire
    8000 contre m128 : 1 780 écarts, des trois familles attendues (classement : m129/classe.js du carnet) ; sans drains : aucun.
  - Relecture : C1 bloquant (deux destinations au-delà : NC perdue), C2 et C3 majeurs (faux « sortie EU laissée libre » en avant-projet) et un défaut
    voisin corrigés ; M2 à M4 corrigés ; M1 : 2e voie [p] ; M5, M6 à soumettre.
  - Risques et [p] : M5 (mélange avec un autre bout libre : réseau présumé) ; M6 (drain que suit un WC : conforme) ; libellé du constat, peigne,
    légende et tête de fiche du drain de collecte qui disperse ; fosse au-delà non comptée ; flèches d'un drain qui disperse.

- **m136 Avant-projet : anomalie de raccordement restée à arbitrer** (défaut J1 de la relecture d'ensemble de la v1.7.1 ; D6, m119 :
  une anomalie à arbitrer n'est jamais comptée conforme ; corrigé avant la fusion, réponse (B) du 16 nov., par exception à la limite de 20).
  Fait : d657694, 16 nov.
  - Fichiers : CJ : pageTableaux (anomalies de raccordement de l'avant-projet partagées en apres et arbA d'après le statut d'anomaliesDoc) ;
    vm/avant-projet.js a1 à a12 ; les trois LISEZMOI.
  - Pour l'utilisateur : au plan PDF d'avant-projet, tableau « Contrôle de l'avant-projet », une anomalie de raccordement que le projet garde
    ou crée et qui reste à arbitrer a la ligne « À arbitrer après travaux : … (retenir ou écarter l'anomalie dans Contrôles) », après « Reste
    après travaux » ; « Après travaux, le dessin ne fait plus apparaître d'anomalie de raccordement. » ne sort que si le tableau n'a aucune
    autre ligne.
  - Tests : vm/avant-projet.js a1 à a12 (39 contrôles ; 14 échouent sur af9c776). Sonde : 700 croquis, 3 500 PDF comparés à af9c776 : seules
    changent ces lignes et la phrase.
  - Relecture : aucun défaut bloquant ni majeur ; M2 à M6 appliqués ; laissés pour la v1.7.2 : M1 (retenue à l'état des lieux, à arbitrer sur
    le seul avant-projet : « À arbitrer », et « écarter » efface la NC ; mode autonome, déjà ainsi à l'écran), M7 (libellé de la fosse
    douteuse), M8 (décision liée à la source, D10).
  - [p] : libellé et ordre des lignes ; anomalie créée par le seul projet listée ; fosse douteuse sous son texte ; statut du mode intégré pris
    d'anomaliesDoc.

## Questions qui restent
- Q1 à Q5 : tranchées le 13 nov. (Q1 : D6, m119 ; Q2 : D8, m121 ; Q3 : D4, m122, m123 ; Q4 : D4, D7, m123 ; Q5 : D3, D6, m120).
- Q6 Un équipement relié à un drain de collecte dont la sortie n'est pas dessinée (D4, m129).
  Choix : (a) « À compléter » (« exutoire non dessiné ») ; (b) dispersion d'office : le drain est lu en drain d'infiltration dès qu'un équipement y
  est relié (la lettre de la règle du 13 nov.) ; (c) réseau EP présumé, comme pour le drain (Q3). (b) et (c) jugent de même (descente conforme, WC
  NC).
  Recommandation : (b), soumise le 14 nov., codée en m129 (aabb18c) sauf avis contraire ; le relecteur préférait (a) : le PDF n'imprime rien que le
  technicien n'a pas choisi. Réponse du 16 nov. : (b), confirmée.
- Q7 Un drain d'infiltration qui atteint aussi un autre exutoire (m122, m129).
  Ce qu'on voit (m122) : trop-plein parti du drain vers un réseau, ou puits, puisard, boîte posés dessus : « Relié à plusieurs réseaux », à compléter,
  sans sens vrai qui le lève (l'eau va aux deux). Le trop-plein d'un puisard ou d'une infiltration au sol n'est pas lu (v1.5.1).
  Choix : (a) chaque exutoire atteint par le drain compte avec son jugement (réseau EU ou puits : NC ; réseau EP, puisard, infiltration : conforme),
  une bifurcation avant le drain reste « multiple » ; (b) garder « multiple » ; (c) le drain arrête l'eau (un trop-plein vers le réseau EU passe
  inaperçu).
  Recommandation : (a), codée en m129 (aabb18c) sauf avis contraire ; l'étendre au puisard déroge à la v1.5.1 (accord de l'utilisateur).
  Réponses du 16 nov. : (a), confirmée ; trop-plein d'un puisard ou d'une infiltration au sol : « Oui : chaque exutoire atteint par le
  trop-plein compte avec son jugement, comme en Q7 (a) » (pour la v1.7.2).
- Q8 Réparation d'une sauvegarde (m126, D11). À la restauration, planValide écrit pour de bon les replis de D3 dans une destination aux champs
  inconnus (nom coupé à 40 caractères ou « Autre destination », EP « à arbitrer », case « autre ») et retire un p.drain inconnu. Une tablette pas à
  jour qui restaure la sauvegarde d'une tablette plus récente perdrait une valeur qu'elle ne connaît pas (un article, une case…).
  Choix : (a) garder ; (b) ne remplacer que les champs qui ne sont pas du texte et garder une valeur inconnue, lue par les replis de destDe et
  sorteDrain (comme un objet d'un type inconnu est gardé).
  Recommandation : (b), soumise le 14 nov., codée en m128 (7b4f489) sauf avis contraire. Réponse du 16 nov. : (b), confirmée.
