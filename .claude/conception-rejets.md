# Conception du lot « Rejets » (v1.7.1, souhaits 2, 3, 4)

Établie le 8 nov. 2026 sur 52cd3c8 (code de la v1.7.0), point de départ de m116 ; révisée les 13 et 14 nov. (puits NC ; réponses et consignes du 13
nov. ; relectures). Lignes citées : celles de 52cd3c8 (0e56c7b n'y change que le numéro 1.7.1) ; m116 à m120 (envoyés : 8f9094d, ab926ec, 6df324c,
a5a5d05, 7a6c041) les décalent : chercher par nom de fonction ; tests cités par nom de cas. Détail du code : `carte-*.md` (8 nov. ; le puits y est
encore une destination). [p] = présomption à signaler à l'utilisateur. CJ = croquis/croquis.js, IX = index.html ; vm/ et navigateur/ sont sous tests/.

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
  - drains : dents d'un côté pour la collecte, des deux pour le drain qui disperse (Q2 a, D8) ; collecte sans sortie dessinée présumée au réseau EP
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
    - source linéaire (Q4 b) : analysé depuis un nœud virtuel 'dr:<id>' relié à ses deux bouts, ou au seul bout aval si p.sens est donné ; son
      résultat est rangé sous l'id du tracé dans an.resObj et lu comme un point « Drain » (T.drain, CJ:797 : source EP, ligne « Autres : Drain ») par
      srcObj(an, id) (sonde `sonde-q4-drain-source.js`, variante 2 : aucun écart sur 800 analyses tirées) ;
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
    soumise à l'utilisateur le 14 nov. et codée en m129 sauf avis contraire, la lettre de la règle : pour un équipement qui l'atteint, le drain est lu
    en drain d'infiltration (« Dispersion dans le sol », EP gérées à la parcelle, WC non conforme) ; le relecteur recommandait (a), « exutoire non
    dessiné » (CJ:1378) et « À compléter » (Q6). Jusqu'à m129, il y est présumé au réseau EP (choix c). Le drain et le point « Drain » qu'il tient
    gardent Q3 (b) ; avec (b), le drain qui reçoit un équipement (étiquette, ligne du constat) se fixe en m129 [p].
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

## Découpage (m116 à m129 ; quatorze correctifs, batterie verte après chacun)
Ordre : le commun, sans changement visible (m116) ; l'infiltration (m117, m118) ; l'arbitrage, règle générale, juste après m118 (m119) ; le puits
(m120) ; les drains (m121 à m124) ; les destinations (m125 à m128), la palette après l'analyse et le rendu ; le cas limite des drains, après la
réponse à Q6 (m129). m116 à m120 sont envoyés : leur fiche ne change plus. Chaque test nouveau échoue sur le commit d'avant ; vm/compat.js reste vert
partout ; tests/LISEZMOI.md suit chaque test ajouté. Dès m117, poser un objet nouveau demande des tablettes à jour (D11). Après m129 : 14 correctifs
depuis la fusion de la v1.7.0, 6 de libres avant la suivante.

- **m116 Table commune des exutoires et suivi des cases EP du constat**, avant tout type nouveau (D1, D7).
  - Fichiers : CJ : EXU, codeExu, resTrace, libExu et leurs lecteurs (D1), règles EU, raccInfo, constatDeduit, panneau ; codeExu vient ici, pour que
    m125 n'ajoute que la clé (terminal, an.exu). IX : vcResumeCalc, constatDepuisCroquis, vcEcarts, vcProvenance, restauration (D7). Tests :
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
      sol » une fois, « infiltration au sol » en page 2 (colonne « Rejet constaté ») ; r5 constatDeduit : case infil en EP, MILIEU non conforme en
      EU ; garde r6 : sans le type (delete V.TYPES.infiltration), écran, PDF et DXF sans exception, bloc VEDE_OBJET.
  - Risques : étiquette longue et ligne de légende de plus (débordement du cadre) [p] ; eu-sol doit paraître au contrôle de l'avant-projet (CJ:5914,
    cat 'inversion').
- **m118 Bouton « Rejet au sol »** (souhait 3, 2e partie du cadrage : le raccourci ; D10).
  - Fichiers : CJ ficheHtml (CJ:4831) et son action, fonction de pose nouvelle. vm/generateur.js : option `exutoires` (liste ; l'ancienne par défaut,
    l. 14 ; sans tirage de plus quand elle manque, l. 38), passée par vm/aleatoire.js:59 avec 'infiltration' ; commentaire de compat.js:89 (ni cette
    option, ni `drains` en m124). LISEZMOI.txt (CROQUIS DE TERRAIN).
  - Pour l'utilisateur : la fiche d'une descente (grille, siphon de sol…) non reliée propose « Rejet au sol » : infiltration et tuyau posés d'un
    toucher ; « Annuler » retire les deux.
  - Test : navigateur/rejets.js b1 : descente à 0,5 m d'une façade du fond de démonstration (VCroquis.demoDxf()) ; après le bouton, infiltration à 1 m
    ± 0,05 de la descente et plus loin du bâti qu'elle ; tronçon sans réseau attaché aux deux, pièce 'EP' ; état ok:SOL ; sans le type (comme une
    v1.7.0) : descente sansexu, pas « Réseau EP départemental (présumé) » ; une annulation rend le JSON d'avant ; pas de bouton sur un WC ni sur une
    descente reliée. b2 : descente à 0,5 m d'un regard : l'infiltration tombe à plus de 0,6 m de tout objet [p].
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
  - Tests : vm/regles.js (« sans boîte » : 'boite'), vm/analyse.js (k4, k5), vm/rejets.js z1 à z9, navigateur/dossier.js 49 à 58.
  - Garde : compat.js 245/245 sans régénération ; aléatoire 8000 contre la version d'avant : aucune exception, 665 écarts, tous de la règle
    (656 conclusions : 625 'conformes' et 11 'reserves' vers 'boite', 20 'conformes' vers 'plusieurs' ; 9 lignes marquées : 2 ep-fosse, 7 fosse:F).
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
  - Tests : vm/regles.js (4 cas), vm/rejets.js q1 à q3, navigateur/dossier.js 59 et 60, navigateur/rejets.js p1 et p2.
  - Garde : compat.js 245/245 sans régénération ; aléatoire 8000 contre la version d'avant : avec --sans=puits, aucun écart ; avec le puits, aucune
    exception et 673 écarts, tous sur les 764 croquis qui en ont un.
  - Risques : symbole proche de celui du puisard sur l'A4 (0,25 mm de blanc entre les traits, contre 0,75) [p, à signaler] ; code MILIEU en EP [p] ;
    un nom qui contient « puits » est refusé à une destination (m127, D3) ; un fichier fait à la main qui en garde un suit sa fiche ; ep-puits hors du
    futur barème des Réglages, ou montrée verrouillée [p].
- **m121 Drains (1) : champ, fiche, peigne, légende, DXF** (souhait 4, 1re partie du cadrage, l. 157 ; Q2 a ; D4, D8, D9).
  - Fichiers (CJ) : defautsLn ; fiche du tronçon (CJ:4900-4911 : puces « Drain » ; puces Réseau masquées sur un drain d'infiltration) ; peigne à
    l'écran et au PDF ; légende et échantillons (CJ:5823-5836) ; ecrireDxf ; nomTrace. vm/charger.js : une ligne de doc() prend un 7e champ
    facultatif, des propriétés ({drain: 'collecte'}), car p y est rebâti (l. 37-39).
  - Pour l'utilisateur : la fiche d'un tronçon propose « Drain : non, collecte, infiltration » ; « Collecte » met en EP un tronçon sans réseau ;
    « Infiltration » le laisse sans réseau (il disperse dans le sol). Le drain prend un peigne à l'écran, au PDF et au DXF, d'un côté (collecte) ou
    des deux (infiltration) ; la légende dit « Drain » ou « Drain d'infiltration ». Jusqu'à m122 et m123, il s'analyse comme un tronçon.
  - Test : nouveau vm/drain.js (tests/tout.sh:14) : d1 defautsLn garde 'collecte' et 'infiltration', écarte toute autre valeur, ne change pas un
    tronçon sans drain (échoue avant : p.drain perdu) ; d2 sur le canevas factice, environ L / 1 m dents, toutes à droite du tracé pour la collecte,
    des deux côtés pour l'infiltration ; d3 de même au PDF ; d4 DXF : VEDE-DRAINS déclaré seulement avec un drain, polyligne dessus, nombre de LINE,
    drain « projet » et « à supprimer » sur leur calque ; d5 légende : « Drain » et « Drain d'infiltration » une fois chacune. Nouveau
    navigateur/drain.js (tests/tout.sh:19) : f1 « Collecte » pose p.drain 'collecte' et p.res 'EP' en un pas d'annulation ; Réseau EU puis Déduit
    gardent p.drain ; « Infiltration » pose 'infiltration' et p.res '', sans puces Réseau ; « Collecte » y remet EP ; « Non » retire p.drain et garde
    p.res.
  - Risques : fiche du tronçon plus haute (navigateur/mise-en-page.js) [p] ; légende qui déborde du cadre [p] ; au 1/500, 1 m = 2 mm, peigne serré
    [p] ; unité du fond (u) au DXF ; peigne et hachures sur un drain « à supprimer ».
- **m122 Drains (2) : drain d'infiltration, exutoire linéaire, étiquette** (consigne du 13 nov. ; D1, D4, D5, D7, D8).
  - Fichiers (CJ) : EXU.DISP ; analyser (sommets tenus vers 'D:<id>', segments hors des pièces, comme le collecteur ; resPt 'EP' d'un objet tenu,
    pendant de CJ:1292) et terminal ; lecteurs de 'C:' relus (CJ:1106, 4045) ; resLigne ; texteEtiquette ; controles (bouts sautés) ; raccInfo,
    constatDeduit. croquis/LISEZMOI.txt (l. 15, 51).
  - Pour l'utilisateur : une descente (grille…) reliée à un drain d'infiltration est conforme, « Rejet : dispersion dans le sol », case « Infiltration
    diffuse » au constat ; un WC relié est NC (« WC : rejet au sol (infiltration) »). Le drain est vert et porte l'étiquette « Dispersion dans le
    sol » ; ses bouts libres ne donnent ni « exutoire non dessiné », ni « À compléter », ni « extrémité libre ».
  - Test (vm/drain.js) : d6 descente → tronçon → drain d'infiltration à bouts libres : et 's=ok:DISP', presume false, a [], c 'conformes', aucun
    contrôle 'libre:<drain>' (échoue sur m121 : 's=sansexu', 'incomplet') ; d7 un WC à sa place : a [['eu-sol:s', true, 'WC : rejet au sol
    (infiltration)']], 'non_conformes' ; d8 descente posée sur le 1er sommet, sans tronçon : ok:DISP ; deux sources sur deux sommets : ok ; regard au
    tampon béton sur un sommet : « Regard EP : tampon béton » en réserve [p] ; d9 constatDeduit : ligne de la descente sans code, ok true, case infil,
    « Drain d'infiltration (dispersion dans le sol) » ; étiquette « Dispersion dans le sol », « Dispersion dans le sol Ø100 » avec un diamètre ;
    resLigne 'EP', relié ou non ; DXF : couleur 3 sur VEDE-DRAINS, étiquette sur VEDE-ETIQUETTES. Témoin vert sur m121 : sans p.drain, le même tracé
    reste sansexu.
  - Risques : un lecteur qui prend 'D:<id>' pour un objet [p] ; un drain d'infiltration prolongé par un tuyau vers un réseau : deux exutoires,
    « multiple » [p] ; un drain d'infiltration à p.res 'EP' (fichier fait à la main) : ignoré ici, présumé au réseau EP par une v1.7.0 [p].
- **m123 Drains (3) : drain de collecte, source linéaire, constat** (Q3 b, Q4 b ; D4, D6, D7).
  - Fichiers (CJ) : analyser (nœud 'dr:<id>' et pièces virtuelles : variante 2 de la sonde `sonde-q4-drain-source.js`) ; srcObj et ses lecteurs
    (resObj, fiche, constat, page 2 du PDF) ; controles (bouts sautés ; sources parcourues par srcObj : méthode, sansexu et multiple d'un drain, nommé
    « Drain ») ; constatDeduit (« Autres : Drain », méthodes p.meth) ; fiche du tronçon (méthodes d'un drain de collecte). vm/constat.js (garde :
    chaque point « Drain » compte). croquis/LISEZMOI.txt.
  - Pour l'utilisateur : chaque drain de collecte compte au constat (« Autres : Drain »), sans point à poser ; sa sortie non dessinée est présumée au
    réseau EP, sans message ; jusqu'à m129, un équipement qui y est relié y est présumé aussi (Q6).
  - Test (vm/drain.js) : d10 drain de collecte seul (p.res 'EP', bouts libres) : ok, EP présumé, a [], 'conformes', aucun contrôle 'libre:<drain>',
    une ligne « Autres : Drain », « Réseau EP départemental (présumé) », « oui » (échoue sur m122 : aucune ligne, contrôle 'libre') ; « Déduit »
    (p.res '') : sansexu, contrôle « Drain : exutoire non dessiné », 'incomplet' ; d11 vers un puisard : case puisard ; vers un Tronçon EU et une
    boîte EU : ep-eu NC, 'non_conformes' ; d12 un point « Drain » sur un sommet : une seule ligne, 's=ok:EP', presume true, 'conformes', aucune aide
    ni 'manque' ; d13 témoin : 800 analyses tirées, aucun écart sur les sources ponctuelles ni sur les pièces.
  - Risques : un lecteur qui suppose un objet (an.objs[id]) ; double compte avec un point « Drain » ; p.sens d'un drain [p].
- **m124 Drains (4) : outils, générateur, documentation** (souhait 4, 2e et 3e parties du cadrage ; D10).
  - Fichiers : CJ OUTILS_LN, PALETTES.tr, drainSvg, aide, terminerTrace et ajouterPointTrace (toast, prolongation), fa.lp. vm/generateur.js : option
    `drains` (sans tirage de plus quand elle manque), passée par aleatoire.js. LISEZMOI.txt (mode d'emploi des drains, consigne de D11).
  - Pour l'utilisateur : deux outils « Drain » et « Drain d'infiltration » dans la palette Tracés, après « Projet » ; « Drain ajouté » en fin de
    tracé ; aucun point posé avec le drain.
  - Test (navigateur/drain.js) : o1 « Drain » et « Drain d'infiltration » juste après « Projet », « Complément du fond » et « Escalier » toujours
    voisins (échoue avant : outils absents) ; o2 drain entre deux points libres : p.drain 'collecte', p.res 'EP', aucun objet ajouté, toast « Drain
    ajouté », une ligne « Autres : Drain », une annulation rend le JSON d'avant ; o3 drain d'infiltration depuis une descente : p.res '', étiquette
    « Dispersion dans le sol » placée, descente ok:DISP ; o4 tracé trop court : ni tracé ni pas d'annulation ; drain prolongeant un Tronçon EP : deux
    lignes. vm/aleatoire.js 8000 avec `drains` : aucune exception ; sans l'option, mêmes 30 croquis (compat.js:91).
  - Risques : flèche à l'envers d'un tuyau tracé depuis son exutoire (défaut connu, hors lot) : p.sens d'un drain de collecte [p].
- **m125 Destinations (1) : modèle, analyse, règles, constat**, hors palette (souhait 2, 1re partie du cadrage, l. 116 ; D3, D5 à D7).
  - Fichiers (CJ) : def('exutoire'), hors de FAMILLES pour l'instant (ni palette, ni sélecteur « Type », CJ:4840) ; defautsPt ; destDe ; terminal et
    an.exu ; libExu ; eu-exu et ep-exu ; REGLES_LIGNE ; controles (CJ:1379, 1382) ; raccInfo, constatDeduit ; conclusion et CONCL ('exu', avant
    'boite') ; texteEtiquette ; filtre de l'avant-projet (ep-exu).
  - Pour l'utilisateur : rien encore (palette en m127).
  - Test :
    - vm/regles.js : descente → étang ('conforme', 'autre') : a [], 'conformes' ; 'reserve' : ep-exu nc false, 'reserves' ; 'nc' : 'non_conformes' ;
      'arbitrer' : ep-exu nc true, st 'arbitrer', 'exu' (échoue sur m124 : type inconnu, 'incomplet') ; WC → destination sans champ (p {}) : et
      's=ok:X:AUTRE DESTINATION:arbitrer:autre', « WC : rejet dans l'autre destination », 'non_conformes' ; une descente : ep-exu à arbitrer, 'exu',
      même nommée « Puits » (fichier fait à la main) ; descente → regard (tampon béton, sans cunette) → étang conforme : « Regard EP : tampon béton »
      en réserve, 'reserves' (regles.js prend les champs facultatifs mode, pt, pc et sans ; FAM, l. 55, prend 'cunette' ; témoin vert sur m124 : vers
      un puisard) ; un WC sur ce regard : la même réserve et eu-exu NC ;
    - vm/rejets.js : x1 constatDeduit, étang 'nc' retenu : ok null, case 'autre', « Étang (rejet des EP) » ; écartée ou 'conforme' : ok true ; à
      arbitrer : ok null, rows[].arbitrer (m119), contrôle 'manque' (aucun une fois décidée) ; case MILIEU : code MILIEU ; WC vers un étang à case
      GARG : MILIEU, codes ['raccEUsep'] ; x2 deux étangs identiques : ok ; un étang et un puisard : multiple ; deux « Étang » de jugements
      différents : le message de D5 ; x3 quatre ordres du dessin, même an.exu ; x5 avant-projet qui garde l'étang NC : ep-exu au tableau du PDF, cat
      'autre' ;
    - navigateur/dossier.js, cas nouveau : étang 'nc' à case MILIEU : ligne de la descente « non », gestEP, préconisation « Suppression du rejet dans
      l'étang ; … » ; réserve choisie au dossier : « oui », sans rappel.
  - Risques : une règle qui compare r.res à 'X' (D1) ; clé et ordre de an.exu (D5).
- **m126 Destinations (2) : symbole, PDF, DXF, textes libres, réparation au chargement** (souhait 2, 3e partie du cadrage ; D3, D8, D9).
  - Fichiers : CJ primitives (forme 'exutoire'), symboleSvg, légende (clé nom et ab ; it.p jusqu'à l'échantillon, CJ:5827), blocs et INSERT,
    échappement (esc à l'écran, pdfTxt au PDF, dxfTxtSortie au DXF). IX planValide (IX:4286-4314) écrit dans p.nom, p.ab, p.art, p.ep et p.cst les
    replis de D3, et retire un p.drain invalide [p].
  - Pour l'utilisateur : rien avant m127.
  - Test : vm/rejets.js x4 : « Étang » (Ét) et « Fossé » (Fo) : blocs VEDE_EXUTOIRE_ET et VEDE_EXUTOIRE_FO (échoue avant : VEDE_OBJET), deux lignes de
    légende, « étang » en page 2 ; nom « Étang <b> & "x" » échappé en HTML, intact au PDF et au DXF (CP1252) ; ab « Ét » et « Et » : VEDE_EXUTOIRE_ET
    et VEDE_EXUTOIRE_ET_2 ; sans nom ni ab : « Autre destination (Au) », VEDE_EXUTOIRE_AU. navigateur/constat-boite.js, cas 11 nouveau : une
    sauvegarde dont le plan porte deux destinations aux champs faux (ep 'x', cst 7, noms de 300 caractères et blanc) et un tronçon à p.drain 'oui' est
    restaurée sans erreur, champs réparés (ep 'arbitrer', cst 'autre', nom coupé à 40 ou « Autre destination »), p.drain retiré.
  - Risques : un échappement oublié dans l'un des trois rendus ; planValide répare au lieu de refuser [p].
- **m127 Destinations (3) : palette et fiche** (souhait 2, 2e partie du cadrage, côté éditeur ; D10).
  - Fichiers (CJ) : FAMILLES 'equ' ('exutoire' après 'puits'), choisirOutil (S.outil.modele), poserObjet, pose par cotes (entrerCotes, poserParCotes,
    aperçu, aides), ficheHtml (CJ:4831 : les cinq champs, nom qui contient « puits » refusé), changement de type (D10).
  - Pour l'utilisateur : « Autre destination » dans la palette Équipements, après « Puits ». La fiche règle nom, abréviation, article, jugement des EP
    (« à arbitrer » au départ) et case du constat ; les EU y sont toujours non conformes. Une case autre que Milieu naturel ou Gargouille laisse,
    comme l'infiltration, le raccordement à cocher.
  - Test : navigateur/rejets.js p1 : poser « Autre destination », y relier une descente : ep-exu à arbitrer, fiche de la descente en 'att', « À
    compléter : rejet des eaux pluviales à arbitrer » (échoue avant : pas d'item) ; nom « Étang », article « l' », jugement « Non conforme » :
    « Descente EP : rejet dans l'étang » retenue NC ; « Conforme » : plus d'anomalie, une annulation la rend ; nom vidé ou « Puits du jardin » :
    refusé, toast du puits ; un WC relié : « WC : rejet dans l'étang ». p2 : outil choisi avec un modèle « Étang » à arbitrer (C.outil,
    navigateur/commun.js:105), posé par « Cotes » sur le fond de démonstration (comme navigateur/cotes.js) : nom, abréviation et jugement gardés,
    « Étang » à l'aide et au panneau.
  - Risques : le sélecteur « Type » des exutoires propose « Autre destination » (CJ:4840) ; les tests choisissent un outil par son type (C.outil), pas
    par son rang [p].
- **m128 Destinations (4) : modèles de la tablette, documentation** (souhait 2, 2e et 4e parties du cadrage : Réglages, LISEZMOI, générateur ; D3, D10
  à D12).
  - Fichiers : IX : CROQ_DEF (IX:3143), croqCfgLire et croqCfgEcrire (IX:3146-3147) gardent `exutoires` ; vcEditeur (IX:3353) et ed.ouvrir (IX:3416)
    passent les options `exutoires` et `enregistrerExutoires(liste)`, comme les aides ; croqReglagesHtml (IX:3523-3529) : liste « Destinations
    ajoutées » (modifier, retirer ; D12) ; actions près de IX:3551. CJ : ouvrirPalette (items 'pt:exutoire:<id>'), « + Nouvelle destination » (D10).
    Labo : localStorage 'vcl-exutoires', comme 'vcl-aides' (croquis/index.html:267-268). vm/generateur.js : option `exutoires` avec 'exutoire'.
    LISEZMOI.txt (texte de D3, consigne de D11), croquis/LISEZMOI.txt (l. 11, 26-29, 51 : règle des autres destinations).
  - Pour l'utilisateur : ses destinations (étang, fossé…) restent dans la palette d'un croquis à l'autre ; les Réglages les listent.
  - Test (navigateur/rejets.js) : m1 « + Nouvelle destination » : fiche de départ (nom vide ou qui contient « puits » refusé, « le », « à arbitrer »,
    « autre ») ; « Étang » (Ét, l', NC, autre) enregistrée dans croquisConfig.exutoires (échoue avant : pas d'item), posée depuis la palette rouverte
    sans recharger puis par « Cotes », gardée au rechargement ; m2 modèle changé dans les Réglages : l'objet déjà posé ne change pas (même analyse) ;
    m3 sauvegarde restaurée sur un profil neuf, sans modèles : même analyse, même constat.
  - Garde : un croquis du lot ouvert sur une copie de 22df7f2 (v1.6.3) : plan PDF et fiche, pour la consigne de D11 [p].
  - Risques : croqCfgEcrire n'écrit aujourd'hui que {actif, aides} (IX:3147 ; retour en arrière : D11).
- **m129 Drains (5) : équipement relié à un drain de collecte sans sortie** (Q6 ; D4, D10) : (b), recommandée, sauf avis contraire ; avec (c), il n'a
  pas lieu.
  - Fichiers (CJ) : libresDe ; avec (a), controles (aide du sansexu). croquis/LISEZMOI.txt.
  - Avec (b) : au bout libre d'un drain de collecte (libresDe, CJ:1212), une source autre que le drain et le point « Drain » qu'il tient prend
    ok:DISP, comme au drain d'infiltration (m122) ; la coupure se fait au bout, après tout Tronçon EP qui y mène (versExtremite, CJ:1019-1025) ; le
    drain lui-même (étiquette, ligne du constat) [p : à fixer]. Avec (a) : ch.res = null pour ces sources.
  - Pour l'utilisateur, avec (b) : une descente reliée à un drain de collecte sans sortie dessinée est conforme, « Rejet : dispersion dans le sol »,
    case « Infiltration diffuse » au constat ; un WC relié : « WC : rejet au sol (infiltration) », NC. Avec (a) : « exutoire non dessiné » et « À
    compléter » (Q6).
  - Test (vm/drain.js) : d14 descente reliée au drain sans sortie, directement puis par un Tronçon EP : avec (b), ok:DISP, presume false,
    'conformes' ; un WC : eu-sol (échoue sur m128 : ok:EP présumé ; le WC y prend eu-ep) ; d10 et d12 restent verts.
  - Risques : sur le même tuyau, drain de collecte et dispersion pour l'équipement [p] ; différentiel : écarts sur ces seuls équipements.

## Questions qui restent
- Q1 à Q5 : tranchées le 13 nov. (Q1 : D6, m119 ; Q2 : D8, m121 ; Q3 : D4, m122, m123 ; Q4 : D4, D7, m123 ; Q5 : D3, D6, m120).
- Q6 Un équipement relié à un drain de collecte dont la sortie n'est pas dessinée.
  Ce qu'on voit : le drain de collecte (outil « Drain ») recueille l'eau du sol ; sans sortie dessinée, il est présumé raccordé au réseau EP (Q3).
  Quand une descente, une grille ou un WC y est aussi relié, la règle du 13 nov. dit qu'il disperse dans le sol, sans exutoire attendu ; mais le
  technicien l'a dessiné en drain de collecte.
  Choix : (a) « À compléter » : l'équipement reçoit « exutoire non dessiné », avec l'aide « dessiner la sortie du drain ou le passer en drain
  d'infiltration » ; (a) s'écarte de la règle écrite, qui n'attend aucun exutoire ; (b) dispersion d'office : le drain est lu en drain d'infiltration
  dès qu'un équipement y est relié (étiquette « Dispersion dans le sol », EP gérées à la parcelle, WC non conforme) ; (b) suit la règle écrite ; (c)
  réseau EP présumé pour l'équipement aussi, comme pour le drain. (b) et (c) donnent les mêmes jugements (descente conforme, WC non conforme) ; seuls
  l'étiquette, le raccordement et la case du constat changent.
  Recommandation : (b), soumise à l'utilisateur le 14 nov. et codée en m129 sauf avis contraire : la lettre de la consigne du 13 nov. (D4). Le
  relecteur recommandait (a) : le plan PDF n'imprime ni gestion à la parcelle ni réseau EP que le technicien n'a pas choisis, et un toucher dans la
  fiche du drain lève le doute ; son coût : ce geste sur le terrain, et un WC relié reste « À compléter ». Avec (c), m129 n'a pas lieu.
