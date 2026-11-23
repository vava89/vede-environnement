# Conception de la v1.7.3

Lot ouvert après la fusion de la v1.7.2 (PR #14, 23 nov. 2026). Ordre (fil du 17 nov., réponses du 23 nov.) : le constat délesté d'abord ; puis la boîte « mêlée » comptée comme une boîte unitaire et le tuyau d'un WC vers un drain d'infiltration rouge passé en rouge (réponses du 23 nov. ; .claude/conception-v172.md, « Souhaits restants ») ; puis l'aperçu du plan (.claude/conception-apercu.md) ; puis les souhaits 14, 5 et 6, 1, 13 (ordre présumé).

## Constat délesté (souhait 9 de la v1.7.0, élargi par S1 et S4)

Conçu les 23 et 24 nov. 2026, en lecture seule sur 5004fa4 : deux lectures du code (ce que le constat imprime ; données, écran, croquis et tests), deux conceptions indépendantes (A, le formulaire allégé en place ; B, le constat coulé), une synthèse (A retenue, avec des greffes de B), deux relectures (exactitude et conformité : 20 défauts, dont 7 majeurs, contre-vérifiés) et une correction finale. Le chef a ensuite vérifié dans le code : constatMep et la marque que pose la signature (index.html:2983-2986, 4531) ; les tests « < 2 » (1561, 2061) ; les traits du tableau (3076-3077) ; les seules méthodes de dessin à coordonnées, de 2939 à 3282 (text, line, rect, addImage) ; l'en-tête des fiches, qui remplace S.etude.fiche en entier (5043) ; les textes de l'écran (1526, 2209) ; le filtre du panneau « Constat déduit » (croquis/croquis.js:6989) ; les avertissements avant la signature (2152, 2157, 2164, 2168, 2169) ; vcPret (3309) ; la liste des suites (tests/tout.sh:19) ; --app (tests/navigateur/commun.js:11) ; premierEcart (tests/navigateur/constat-boite.js:244) ; la mise en ligne depuis main seulement (.github/workflows/mise-en-ligne.yml:6-9).

Légende : IX = index.html, CJ = croquis/croquis.js ; CB, DO, CM = tests/navigateur/constat-boite.js, dossier.js, commun.js ; CA = .claude/cadrage-v170.md ; [p] = présomption ; les textes fixes d'organismes sont désignés par leur ligne et leur rôle. Croquis de terrain : le module VCroquis et son réglage propre à la tablette (vcPret, IX:3309) ; croquis de position : c.croquis, de l'éditeur de l'application (IX:2557).


### 0. Demande (mot pour mot)
- Souhait 9 : « constat et listing des équipements sans les lignes non cochées ou absentes ».
- 17 nov. : S1 d « le rapport final doit être délesté de toutes les informations non nécessaires et tous les éléments non utilisés » ; S4 a « Penser à supprimer les colonnes inutiles pour que n'apparaissent que les colonnes ayant été cochées ».
- 16 nov. : « Barème permissif refusé, constat abrégé admis » ; « Le constat pdf n'est pas un standard du département mais une production de ma société ».
- Sans croquis : 16 nov., « Oui, avec des valeurs par défaut identiques à la v1.5.1 » (CA:278, point 3) ; 17 nov., S2 b « Oui, toutes, comme avec le croquis » (nouveautés de la v1.7.2) ; S13 c (photo de la façade) « Oui, sur le constat complet comme sur l'abrégé ».

### 1. Principe
DL1. Le délesté est la présentation 2 (v1.7.2) dont on retire, élément par élément, ce qui n'est ni rempli, ni coché, ni présent ; le reste garde primitives (IX:2941-2977), polices, couleurs et coordonnées, et remonte. Pourquoi : S1 d, S4 a ; document reconnaissable ; ordonnées testables. constatEval (2054) et constatIssues (2141) ne changent pas ; le complet (3002, 3059, 3194) n'est qu'extrait sans effet (DL6) ; drawConstatDeleste(doc, v, E, first) dessine le délesté.

### 2. Option et défaut
DL2. Option par étude « Constat imprimé » dans « En-tête des fiches » (ficheHeaderForm 5034-5044), liste #m-cforme : '' « Par défaut (…) » en tête, comme le logo (5040), puis 'deleste' « Délesté : seulement ce qui est rempli ou coché » et 'complet' « Formulaire complet ». collect (5041) rend constatForme ; '' = aucun choix : enregistrer l'en-tête pour la commune ou le logo ne range aucune forme. En 5043, e.fiche = Object.assign({}, e.fiche || {}, res) ; rangée dans S.etude.fiche, l'option suit la sauvegarde de l'étude (4841). Ni par dossier, ni à l'impression. Pourquoi : retenu le 7 nov. (CA:299-316 : par étude, figé à la signature) ; S13 c suppose les deux formes ; le complet pare au risque de CA:303 (case vide = attestation d'absence).

DL3. CST_FORME_DEFAUT : 'complet' de m158 à m160, puis selon Q1 en m161 ; le libellé « Par défaut » le suit.

### 3. Gel et constats signés
DL4. Une marque, c.fige.mep, lue par une table : absente → 1 (v1.7.1), 2 → complet, 3 → délesté. Elle désigne une forme telle que sa version la dessine ; une forme nouvelle ou retouchée après la fusion (photo de la façade : DL18) prend le numéro libre suivant. Seul c-lock l'écrit (ni constatFigeCalc 2122, ni constatGeler 2132 et 3567) : dès m159, constatMepEtude() y remplace le littéral 2 (4531). En place de constatMep (2983-2986), en ES5 :
```
var CST_FORME_DEFAUT = 'complet';
function constatMepEtude(){ var f = (S.etude && S.etude.fiche && S.etude.fiche.constatForme) || CST_FORME_DEFAUT; return f === 'deleste' ? 3 : 2; }
function constatMep(c){ if (!c || !c.signeLe) return constatMepEtude(); var m = Number(c.fige && c.fige.mep); return m === 3 ? 3 : m === 2 ? 2 : 1; }
```
Les tests « < 2 » (1561, 2061) traitent 3 comme 2 ; S11 : aucune marque inconnue à lire. Seul un non signé suit l'option de l'étude ouverte (constatPdfBlob 3284, mail 4396) ; fichePdfDoc (1885), exportEtude (4826) et exportFichesPdf (4895) n'impriment que des signés. « Modifier » (c-unlock 4534) efface c.fige ; la signature suivante note la forme du jour.

DL5. drawConstat (3275-3282), après la transformation de la visite non effectuée (3277-3279) : marque 3 → drawConstatDeleste, puis sortie. Le complet ne voit que 1 et 2 : ses tests (3064, 3076, 3084, 3102, 3199) et constatRowsForPrint (2987-3001) restent.

DL6. Extractions sans effet, sous le témoin : cstEntete (3004-3012), cstLibelle (3113-3119), boiteVal (3172-3181, règle de CLAUDE.md tenue), cstPosition (3048-3057), cstParagPriv (3213-3216), cstObservations (3240-3253), cstSignatures (3254-3263), cstMentions (3264-3273), CST_LEG_METH (texte de 3038).

DL7. cstDecale(doc, dy, dessin) ajoute dy aux ordonnées de text (3e argument), line (2e et 4e), rect (2e) et addImage (4e), qu'il remet dans un finally ; de 2939 à 3282, le dessin n'emploie que ces quatre méthodes (vérifié) ; les interceptions des tests (CB:204-216) voient les ordonnées finales.

### 4. Inventaire
DL8. Ni pointillé (cDots 2964 ; cFill sur une valeur non vide seulement) ni gabarit de date, sauf DL11. Un champ vide part avec son libellé, une rubrique vide avec son titre, sauf « Conclusion : » et le paragraphe de DL10 ; un texte fixe gardé l'est mot pour mot. Sur une ligne à cases, les cochées seules, dans l'ordre du formulaire, prennent les premières places, ou se suivent là où le formulaire les enchaîne (cOptsCoches). « * raccordement des » (3231-3232), un libellé pour deux lignes de cases, devient une ligne à quatre places (170,2 et 382,9 sur 432,5, puis sur 447,3), libellé gardé dès qu'une case est cochée : raccEPep seul (cas courant : precosAuto 2044, EP sur EU) s'imprime en 170,2 sur 432,5. La suite d'une case la suit : « puisard… » et sa note (3227-3228) pour gestEP, la note de gargCr (3230).

DL9. Page 1 (v = constatFige(v)) :

| Élément (IX) | Gardé si | Délesté |
|---|---|---|
| Cadre, logos, titres (3004-3012) | toujours | fixe (15-155) |
| « Demande du », « Visite du » (3013-3014) | c.demande ; visite effectuée et datée | sans gabarit |
| Motif (3015-3016) | visite non effectuée | libellé, case cochée |
| Absences (3017) | déjà conditionnel | inchangé |
| Identification, type, logements (3018-3025) | valeur non vide | libellé, cFill à leur x |
| Catégorie (3026-3034) | categorie et categorieNb | seule case (85 × 23,5 en 49,5 ; 254,5) |
| Contrôle (3035-3036) | une méthode | titre ; cochées en 70,9, 170,2, 269,4, 368,7, 453,8 |
| Description, légende, tableau (3037-3039) | une ligne active | § 5 |
| Récupération des EP (3040-3041) | une case, visite effectuée | libellé souligné, cochées dès 245,6 |
| Désagréments (3042-3047) | c.desagr, visite effectuée | textes fixes, case choisie, desagrLoc si « oui » |
| Position (3048-3057) | croquis de position, visite effectuée | cstPosition |

DL10. Page 2 :

| Élément (IX) | Gardé si | Délesté |
|---|---|---|
| Cadre (3196) | toujours | gardé |
| Boîte (3159-3193) | une valeur EU ou EP | rangées et colonnes à valeur (EP seule à la place d'EU), sans colonnes vides (446,5-565,5) ; côté : case cochée, centrée ; boiteVal ; en-tête 17,5, rangées 13,25 |
| « Conclusion : » (3200) | visite effectuée ; sinon avec le réseau ou la rue | titre |
| Réseau, rue (3201-3205) | reseau ou reseauRue | option choisie en 249,5, gestionnaire si rempli ; rue si remplie |
| Installations considérées (3206-3211) | visite effectuée | case choisie en 184,3 ; 162,3, réserves sur sa ligne (cFill 9 pt jusqu'à 554,5) ; sans conclusion, les trois cases vides |
| Préconisations privées (3212-3232) | titre et paragraphe : non-conformité mentionnée (E.conclusion 'non_conformes' ou rangée imprimée à « Non ») ou clé de PRECO_PRIV (1914) cochée | lignes cochées (DL8) ; sous-ligne de « création de boîte » : libellé de tête sans cases |
| Préconisations publiques (3233-3239) | clé de PRECO_PUB (1921) | titre, rangées cochées (269,4 et 358) ; note D (3238) ou T (3239) avec une case de sa colonne |
| Observations (3240-3253) | E.obsText | cstObservations |
| Signatures, mentions, glossaires (3254-3273) | toujours | inchangés, sauf DL20 ; Q2 |

Pourquoi : le paragraphe annonce la suite d'un rapport non conforme, qui peut n'avoir aucune préconisation privée (descente non visitable, CJ:2074 ; tampon béton en EU, CJ:2081 ; rien dans precosAuto 2048-2050 ; 2164 ne prévient pas).

DL11. « Je, soussigné » sans nom (visite effectuée) garde ses pointillés de 140 pt (3258), seul pointillé du délesté ; constatIssues l'annonce (2168).

### 5. Tableau
DL12. Rangées : constatRowsForPrint(c, 2) filtré par rowActive (1956), visite effectuée ; EU puis EP, lignes du formulaire puis lignes ajoutées sous leur seul libellé. Ligne vide ou à « 0 » retirée ; groupe vide sans trace. Ligne inactive liée à une anomalie NC (2070 ; déjà sans Nb ni croix, 3109, 3123-3127) : retirée ; l'anomalie reste dans la conclusion et les observations (2157 prévient). Aucune ligne active : titre, légende et tableau partent (2152 prévient).

DL13. Hauteurs : 17,5 si le libellé tient sur une ligne (lsz 9,5, ou 8 au-delà de 14 rangées, 3104) dans la largeur des libellés moins 7,5 et les codes (au formulaire 100 − mw, 3111), sinon 21,5 ; puis cstLibelle. Codes en x_Nb − 1,5, Nb centré en x_Nb + 11,5 (171 et 184 au formulaire, 3122). Trop de rangées : hauteurs × place / Σh (place ≥ 234,5 pt) ; Nb et croix en min(10,5 ; (h − 1) / 0,72) pt.

DL14. cstColonnes(rangs, mesure), pure, exposée par __VT (5251) → x, largeurs, en-têtes. Largeurs du formulaire (3076-3077) ; Installation et Nb toujours ; une sous-colonne reste si une rangée imprimée l'emploie (COLX[r.raccord], 3101-3102, aucune pour 'plusieurs' ; conformité 'oui' ou 'non', F.conf d'un signé, 2109). Groupe = max(somme des sous-colonnes ; en-tête + 4) ; région (« Raccordée sur », « Conforme ») = max(somme des groupes ; en-tête + 4), dans la police de l'en-tête (3079-3098), surplus partagé. Libellés = 479 − 23 − régions (au moins 107,5) ; tout gardé, on retrouve les x de la présentation 2 [p]. « Conforme » peut ne garder que Oui ou Non ; sans croix, Installation et Nb seuls.

DL15. cstTableDeleste(doc, E, haut, place) : en-tête de 42 pt comme au formulaire (polices, couleurs, textes centrés ; traits violets de 0,6 en 360, 371, 391 et 402, 3071-3072 ; fond jaune sous « Conforme », 3070), limité aux colonnes gardées ; trait sous chaque rangée (3078) ; « X » au centre de sa sous-colonne ; codes de méthode dans la case du libellé. La légende (3038) ne garde, dans l'ordre de METH (1906), que les codes imprimés ; sans code imprimé (r.methodes est facultatif), elle part.

### 6. Mise en page
DL16. Boîtes du formulaire ; l'écart d'un élément est celui qui le sépare du précédent au formulaire. Page 1 : nom et réf. 153,8-164,8 ; adresses 174,1-185,1 et 194,4-205,4 ; tél. et mail 214,6-225,6 ; type et logements 238,2-249,2 ; catégorie 254,5-301 ; contrôle 308,9-336,4 ; description et tableau 343,2-(402 + Σh) ; récupération 627,2-638,2 ; désagréments 644,8-655,8 ; position 662,6-800. Page 2 : boîte 22,5-93 ; conclusion 101-183,9 ; privées 191,1-450,3 ; publiques 457,3-543,4 ; observations 550,4-581 [p] ; pied 584,5-816, fixe. Limite basse 816 (cadre 15-826, 3004). Le premier élément gardé d'une page se pose en haut (153,8 ; 22,5), chaque suivant au bas du précédent gardé plus son écart ; un élément retiré emporte son écart, un raccourci prend sa hauteur délestée ; une ligne gardée se pose à la ligne de base de la précédente gardée plus son interligne ; ce qui précède le premier changement ne bouge pas. Calcul pur : constatDeleste(v, E, mesure) → [{id, page, dy, h}], par __VT.

DL17. Pages (Q3) : une seule si tout le flux finit à 580,5 au plus (écart de 8 entre les pages [p]) ; sinon le partage du formulaire, sans couper un élément ; le pied reste en 584,5-816 sur la dernière page. Pourquoi : pied fixe, test simple, jamais pire que la présentation 2. Rien ne compte les pages (ni getNumberOfPages ni setPage) ; fichePdfDoc ajoute sa page après drawConstat (1886).

DL18. Débordements : identification, gestionnaire et réserves par cFill (7 pt puis « … ») ; observations par cstObservations (10 à 6 pt puis « … (suite sur la fiche) » ; 2169 prévient) ; préconisations : au plus les lignes du formulaire ; boîte : boiteVal. Photo de la façade (lot ultérieur) [p] : un élément de plus en page 1, un nouveau numéro par forme (DL4).

### 7. Croquis de terrain désactivé ou absent
DL19. Le croquis de position (éditeur de l'application, IX:2240, 2557 ; écrit en 2424, imprimé en 3057) ne lit ni le module ni son réglage : il s'imprime dès qu'il existe, dans les deux formes, croquis de terrain actif, désactivé ou absent. Le croquis de terrain (réglage vc-actif de la tablette, croquisConfig 3306-3307) change déjà le contenu d'un non signé (arbitrage, 2066, 3866), pas sa forme. Les réponses tirent dans deux sens (Q1) : le 16 nov. (§ 0) et CLAUDE.md (« comportement de la v1.5.1 »), complet par défaut sans croquis de terrain ; S1 d et S4 a (17 nov.), délesté sans distinguer le croquis, S2 b ayant étendu au cas sans croquis les nouveautés de la v1.7.2 (indice [p]) ; le 16 nov., le complet était le défaut avec ou sans croquis (7 nov., DL2). Sous Q1 a, la forme ne dépend que du constat et de l'étude. Sous b, constatMepEtude rend 2 si !vcPret() et que l'étude n'a rien choisi ; un choix explicite l'emporte ; l'entrée '' devient « Par défaut (délesté ; formulaire complet si le croquis est désactivé ou absent) » ; la signature note la forme de la tablette qui signe.

### 8. Visite non effectuée
DL20. E est transformé comme aujourd'hui (3277-3279). S'impriment : en-tête sans « Visite du », motif, absences ; identification, type, logements, catégorie remplis ; réseau et rue remplis, sous « Conclusion : », qui ne vient qu'avec eux ; observations ; signature du technicien, sa légende, « Signé sur tablette le » ; mentions. Partent : contrôle, tableau, récupération, désagréments, position, boîte, « Installations considérées », préconisations, « Je, soussigné… » et la légende du propriétaire (cstSignatures(doc, v, E, {deleste: true})). En pratique, une page.

### 9. Onglet « Constat déduit »
DL21. constatHtml (CJ:6988) : filtre r.nb au lieu de r.nb || r.std (6989) ; sans rangée, « Aucune installation dessinée. » ; l'introduction (6990) dit « Seules les installations dessinées sont listées. » ; classe 'vide' (6993) et son style (7725) retirés. Pas d'option. constatDeduit (CJ:2554) et l'écran de saisie (IX:2206) ne changent pas.

### 10. Mentions, écran, documentation
DL22. Aucun texte fixe du PDF ne change (image de droite de l'en-tête, 3007, comprise), sauf réponse à Q2 ; nom du fichier (3283) et propriétés du PDF (3286, 4826, 4895) non plus.

DL23. Écran (m160) : carte du dossier (1526) « Installations, raccordements, méthodes de contrôle, conclusion et signatures. » ; éditeur (2209) « Constat « Contrôle de Branchement Particulier », rempli ici puis signé sur la tablette. », puis, selon constatMep(c), « Le PDF n'imprime que ce qui est rempli ou coché » (3) ou « Le PDF reprend la mise en page du formulaire » (1, 2), suivi de « (« En-tête des fiches »). » pour un non signé, ou de « (présentation figée à la signature). » pour un signé. Commentaires 1904, 2939 et 2978-2982 mis à jour. Pourquoi : le constat « n'est pas un standard du département ».

DL24. Dernier correctif : LISEZMOI.txt 45-56 et 409-433 ; .claude/etat-travaux.md à chaque envoi. CLAUDE.md, avec l'accord de l'utilisateur, après « colonne « Puits » (réponses du 17 nov. 2026) » : a « ; le constat délesté de la v1.7.3 y vaut aussi : délesté par défaut, formulaire complet au choix de l'étude, quel que soit le croquis » ; b « ; croquis désactivé ou absent, le constat imprimé est le formulaire complet, sauf si l'étude demande le délesté » ; c « ; le constat délesté de la v1.7.3, au choix de l'étude, y vaut aussi » ; d « ; le constat non signé s'imprime délesté (v1.7.3), quel que soit le croquis ».

### 11. Tests
DL25. Outils (m158) : tests/navigateur/constat-deleste.js (liste de tests/tout.sh, l. 19), C.formeConstat(p, forme) dans CM, relevePdf(p) qui enveloppe jsPDF comme CB:204-216, toutes pages, au millième. Textes fixes comparés par empreinte ou aux appels du complet, jamais en clair ; seuls les textes saisis, fictifs, en clair.
Témoin T0 : cinq dossiers fictifs (« Nom Fictif », « 12 rue Fictive », « Ville-Exemple », téléphone fictif de CLAUDE.md), dont quatre signés par c-lock en 'complet' : (1) marque retirée, 12 rangées ; (2) marque 2 : « Puits », boîte et côté, réserves, préconisations (boîte et gargouille à créer, D et T), désagréments « oui », « propriété publique » ; (3) gel retiré ; (4) marque 2, refus ; (5) non signé ; les signés réimprimés en 'deleste'. Empreintes, identifiants « ID », signeLe et fuseau fixés [p] ; relevé sur 5004fa4 (--app, CM:11, drapeau --relever) dans tests/navigateur/temoins/constat-signe.json, comparé appel par appel (premierEcart, CB:244) à chaque correctif.
m158, échouent sur 5004fa4 (ni liste, dix rangées, toutes les colonnes) :
- D1 liste, '' en tête ; enregistrer sans y toucher ne range aucune forme ; « Délesté » range 'deleste' ; département, commune, logo et un champ posé avant restent.
- D2 non signé en 'deleste', WC (1, EU D, oui) et « Fontaine » (EP, 1, Gargouille, oui) : ces deux rangées seules ; en-têtes Installation, Nb, Raccordée sur, Réseau EU, D, « Gar- » « gouille », Conforme, Oui, sans autre ; croix centrées (0,1 pt) ; largeurs = cstColonnes (somme 479).
- D3 aucune ligne active ; aucune croix ; Oui seul ; EP dans un puits (Puits et Non) ; tout coché (x de la présentation 2) ; 30 rangées (8 pt).
m159, échouent sur m158 :
- D4 c-lock pose 3 en 'deleste', 2 en 'complet' ou sans choix, constatGeler aucune ; un signé en 3 reste identique après passage à 'complet' ; « Modifier » puis signature en 'complet' : 2.
- D5 dossier minimal (propriétaire « Nom Fictif », une ligne sans méthode) : textes attendus, aucun setLineDash([0.6, 1.8]), ni légende ni rubrique vide.
- D6 dossier complet : ordre et écarts de DL16 ; position, paragraphe et observations = appels du complet décalés de dy ; légende réduite aux codes imprimés.
- D7 une page (minimal sans croquis de position ; non effectué ; pied en 584,5) ; deux pages (croquis de position ; 30 rangées ; 15 lignes actives, toutes les préconisations cochées, D et T compris, 600 caractères d'observations : préconisations et observations = appels du complet décalés) ; rien sous 816.
- D8 refus de visite, avec puis sans rue (« Conclusion : » présent, puis absent).
- D9 dossier sans plan de terrain, avec croquis de position, en 'deleste', imprimé module présent, absent (sansModule, CB:204-217) et désactivé (vc-actif, CB:314) : trois relevés identiques, position comprise.
- D10 boîte EP seule, côté en une case, valeur en 7 pt sur sa ligne.
- D11 conclusion vide (« Conclusion : », trois cases vides, sans pointillé) ; réserves sur la ligne ; réseau seul ; rue seule.
- D12 « sur branchement à créer » seule ; raccEPep seul (libellé, une ligne, 170,2 sur 432,5) ; notes, D et T ; non conforme sans préconisation (anomalie EU « tampon béton » saisie à la main) : titre et paragraphe sans ligne ; conforme sans préconisation : rubrique absente.
m160, échouent sur m159 : P1 panneau (WC et lavabo dessinés : WC et Évier seuls ; rien de dessiné : la phrase) ; P2 textes de 1526 et 2209, non signé et signé.
m161 (Q1 a, b, d), échouent sur m160 : F1 étude neuve, croquis de terrain actif : délesté, marque 3 à la signature ; F2 (a) croquis de terrain coupé : délesté ; F4 (d) 'complet' rangé : délesté. Gardes : F2 (b) croquis coupé, en-tête enregistré sans choix : complet ; F3 (a, b) 'complet' = dossier 5 de T0 ; T3 témoin d'un signé en marque 3. Migration vers C.formeConstat(p, 'complet') (sous d : délesté, ou signé en marque 2 [p]) : DO 519-532, 1104-1110, 1140-1146, 1185-1191, 1347-1353, 1431-1449, 1650-1663 ; mep === 2 (DO:642, 698, 1541, 1565, 1785) ; CB:204-216, 503-524, 698 ; rejets.js:513-519. Sous Q1 c, F2 et F3 sont des gardes de m160.

### 12. Découpage (4 correctifs sur 20 ; 3 sous Q1 c)
- m158 : option, constatMepEtude, marque 3 d'un non signé seulement (c-lock écrit encore 2), tableau délesté (cstLibelle, cstColonnes, cstTableDeleste), T0 ; en 3039, la marque 3 dessine ce tableau dans la place du formulaire (360-620,5) ; en 3199, la boîte de la présentation 2 pour 2 et 3.
- m159 : c-lock note constatMepEtude() ; rubriques, remontée, page unique, visite non effectuée ; drawConstat aiguille la marque 3 ; 3039 et 3199 reviennent à 5004fa4 ; un signé en marque 3 se dessine dès lors comme dans la version livrée.
- m160 : onglet du croquis, textes de l'écran ; sous Q1 c, la documentation et T3.
- m161 (Q1 a, b, d) : défaut (sous d, la liste disparaît), CLAUDE.md (avec accord), LISEZMOI, migration des tests, T3.
m158 à m160 ne dépendent d'aucune réponse et ne changent pas le livrable d'une étude sans choix. Condition : la mise en ligne ne part que de main (mise-en-ligne.yml : push sur main ou lancement manuel) ; avant la fusion, ni lancement manuel depuis la branche, ni version d'essai sur une tablette de terrain ; un signé en marque 3 n'y est qu'un essai fictif, et une retouche du délesté avant la fusion garde la marque 3.

### 13. Risques [p]
- Sans les lignes à « 0 », le constat ne prouve plus qu'un appareil a été vu absent (CA:303) ; parade : le formulaire complet.
- Témoin et largeurs dépendent des polices (IX:1769-1776), du fuseau et de jsPDF : relever de nouveau après une mise à jour (comme MEP1, CB:236-243), qui changerait aussi les signés en marque 3 (déjà vrai pour cFit).
- Une étude sans choix (sauvegarde ancienne, restoreZip 4908) suit le défaut de la version ; toute écriture future de S.etude.fiche doit garder constatForme.
- Une page 2 courte laisse un blanc au-dessus du pied ; peu de colonnes : libellés jusqu'à 456 pt ; au-delà d'environ 27 rangées, Nb et croix rapetissent.

### 14. Questions pour l'utilisateur
À poser à l'utilisateur ; m158 à m160 n'en dépendent pas (DL3 : le formulaire complet reste le défaut jusqu'à m161). Réponses : à venir.

Q1. Quand un constat n'est pas encore signé et que l'étude n'a rien choisi dans « En-tête des fiches », quelle forme prend le PDF, avec ou sans croquis de terrain ? Vos réponses vont dans deux sens. Le 16 nov., pour le croquis désactivé ou absent : « Oui, avec des valeurs par défaut identiques à la v1.5.1 », donc le formulaire complet par défaut (c'était alors aussi le défaut avec le croquis, choix du 7 nov.). Le 17 nov., S1 d (« le rapport final doit être délesté de toutes les informations non nécessaires et tous les éléments non utilisés ») et S4 a (« que n'apparaissent que les colonnes ayant été cochées ») demandent un rapport délesté, sans parler du croquis. Le croquis de position du constat s'imprime dans tous les cas.
   - a. Délesté par défaut pour toutes les études, avec ou sans croquis de terrain ; le formulaire complet reste au choix de l'étude, dans « En-tête des fiches » (recommandé).
   - b. Délesté par défaut quand le croquis de terrain est actif, formulaire complet par défaut quand il est désactivé ou absent ; un choix de l'étude l'emporte toujours.
   - c. Formulaire complet par défaut ; le délesté reste au choix de l'étude.
   - d. Délesté seulement : le formulaire complet ne peut plus être imprimé.
   Recommandation : a. S1 d et S4 a, vos réponses les plus récentes, demandent un rapport délesté sans distinguer le croquis, et le même jour S2 b a voulu les nouveautés du constat « comme avec le croquis ». a s'écarte de la lettre de votre réponse du 16 nov. (« valeurs par défaut identiques à la v1.5.1 ») et ajoute une exception à la règle de CLAUDE.md « Croquis désactivé ou absent : comportement de la v1.5.1 » : c'est ce que vous confirmeriez en choisissant a. La forme ne dépend alors d'aucun réglage de la tablette. Le formulaire complet reste disponible quand une case vide doit prouver une absence.
   Effet : a : le délesté devient le défaut au dernier correctif (m161) ; la règle de CLAUDE.md est complétée (texte a de DL24). b : suit la lettre du 16 nov. ; pour une étude sans choix, la forme d'un constat non signé dépend du réglage du croquis de la tablette (croquisConfig, IX:3306-3307), et la signature note celle de la tablette qui signe (texte b). c : rien ne change par défaut ; m161 disparaît et sa documentation passe dans m160 (3 correctifs, texte c). d : la liste disparaît en m161 ; S13 c (« sur le constat complet comme sur l'abrégé ») perd son objet et il n'y a plus de recours quand une case vide doit prouver une absence ; les constats déjà signés gardent leur forme (texte d). Sous a, b et d, les tests qui supposent le complet par défaut passent au complet explicite (m161).

Q2. Dans le constat délesté, que faire des textes fixes propres à un organisme, qui le nomment ou donnent son numéro ? Ce sont l'image de droite de l'en-tête (IX:3007), le paragraphe des préconisations privées (3214-3216), la note D des préconisations publiques (3238), la dernière phrase de la mention de responsabilité (3267-3268), la ligne de contact (3271) et le glossaire des sigles (3272). La mention de caducité, le reste de la mention de responsabilité et le glossaire du tableau (3273) restent imprimés quelle que soit la réponse.
   - a. Les garder mot pour mot dans les deux formes ; dans le délesté, le paragraphe paraît dès qu'une non-conformité est mentionnée ou qu'une préconisation privée est cochée, et la note D avec une préconisation publique de sa colonne (recommandé).
   - b. Les retirer du délesté seulement ; le formulaire complet les garde.
   - c. Les remplacer dans le délesté par des textes et un logo que vous fournirez (lot ultérieur).
   Recommandation : a. Rien n'est inventé et aucune mention qui peut avoir une portée légale n'est retirée. Le paragraphe, qui annonce la suite donnée à un rapport non conforme, reste dès qu'il s'applique, même pour un constat non conforme sans préconisation (descente non visitable, par exemple). Aucun code de plus.
   Effet : a : la conception reste telle quelle (DL10, DL22). b : le délesté perd l'image de droite de l'en-tête, l'annonce de la suite d'un rapport non conforme, l'explication de la colonne D, la fin de la mention de responsabilité, le contact et le glossaire des sigles ; il faut un correctif de plus [p] ; le pied, plus court, laisse plus de place au-dessus de lui [p]. c : un lot ultérieur avec vos textes ; les constats signés gardent les leurs grâce à la marque notée à la signature, et la nouvelle forme prend le prochain numéro de marque (DL4).

Q3. Sur combien de pages s'imprime le constat délesté ?
   - a. Une page quand tout tient au-dessus du pied (signatures et mentions à leur place, en bas de page) ; sinon deux pages, partagées comme le formulaire (recommandé).
   - b. Toujours deux pages, comme le formulaire.
   - c. Deux pages remplies au plus juste : la page 1 reçoit le haut de la page 2 tant qu'il tient, et le pied reste en bas de la dernière page.
   Recommandation : a. Un constat court tient sur une feuille. Le pied reste au même endroit sur chaque constat. Aucune rubrique n'est coupée entre deux pages, et la mise en page n'est jamais moins bonne qu'aujourd'hui.
   Effet : a : la conception reste telle quelle (DL17 ; test D7 : une ou deux pages). b : plus simple, sans calcul de place, mais une visite non effectuée ou un petit dossier garde une page 2 presque vide. c : il faut une règle de plus dans le calcul de la mise en page (constatDeleste) et des tests de partage en plus ; la page 2 peut ne contenir presque que le pied.

### 15. Notes de la synthèse
NOTES SUR 10 (A | B)
- Respect des réponses de l'utilisateur : 8,5 | 7,5
- Tenue du livrable : 8 | 7,5
- Constats signés réimprimés à l'identique : 8 | 8,5
- Croquis désactivé ou absent : 8,5 | 8,5
- Risque et quantité de code : 7,5 | 5,5
- Testabilité : 8,5 | 7
- Total : A 49/60 (moyenne 8,2) ; B 44,5/60 (moyenne 7,4).

RAISONS
1. Réponses de l'utilisateur.
   - A applique S1 d et S4 a à la lettre : une colonne sans croix part, et « Conforme » peut ne garder que Oui ou que Non. Il suit aussi S13 c (les deux formes, d'où l'option), S2 b et la réponse « sans croquis » (même comportement avec ou sans croquis).
   - A ne touche ni à constatEval ni aux contrôles. Il garde la règle de la boîte de CLAUDE.md (valeur de 9,5 à 7 pt sur la ligne de son libellé) en réemployant le même code.
   - B modifie un contrôle (l'avertissement des observations longues, IX:2169) pour un besoin qu'il crée lui-même, puisqu'il imprime les observations en entier.
   - B filtre aussi les glossaires en découpant des textes fixes, ce que personne n'a demandé.
   - B laisse « Je, soussigné … reconnaît… » sans nom ni pointillés : la phrase devient bancale.
2. Tenue du livrable.
   - A reste au plus près du formulaire, sans trou, sur une ou deux pages, avec un pied fixe. Ses défauts : la page 1 peut rester à moitié vide, et les observations restent coupées (« suite sur la fiche ») comme aujourd'hui.
   - B imprime en entier les réserves et les observations, ce qui est un avantage. Mais il produit d'une à trois pages ou plus et numérote les pages « k/n ». Il coupe le tableau d'une page à l'autre. Son pied est insécable (231,5 pt) et peut se retrouver seul sur sa page.
3. Constats signés.
   - Les deux notent la forme dans c.fige.mep et choisissent le dessin d'après elle.
   - A découpe drawConstatP1 et drawConstatP2 en fonctions d'élément : tout le formulaire complet passe alors par du code neuf.
   - B se limite à des extractions ciblées et réimprime son témoin avec l'option délestée. Il protège donc mieux les constats signés.
4. Croquis désactivé ou absent : égalité. Dans les deux, la forme ne dépend pas du réglage de la tablette, et la rubrique de position part quand il n'y a pas d'image.
5. Risque et quantité de code.
   - B demande un moteur de mise en page en flux : mesures, pagination, tableau coupé avec en-têtes répétés, coupes de texte, découpe des glossaires. Cela fait plus de code et plus de cas.
   - A tire ses ordonnées de celles du formulaire par un calcul pur.
6. Testabilité.
   - A : positions déterministes, fonctions pures (colonnes, remontée), témoin.
   - B : beaucoup de cas de pagination, et des positions qui dépendent des mesures de police.

CHOIX
A sert de base. Greffes de B :
- Object.assign dans ficheHeaderForm, pour que la fiche ne soit plus remplacée en entier (IX:5043) ;
- extractions ciblées sans effet, au lieu du découpage de P1 et P2 ;
- témoin des constats signés réimprimé avec l'option délestée ;
- légende des méthodes tirée d'une constante ;
- ligne du réseau et rue gardées pour une visite non effectuée ;
- une sous-ligne cochée garde le libellé de sa ligne de tête ;
- dans la boîte, EP seule prend la place d'EU ;
- aide de test C.formeConstat ;
- une seule question pour le défaut et le croquis.

Ajout propre à la synthèse : cstDecale. Il remplace quatre méthodes de dessin le temps d'un dessin, sans Object.create : this reste le document, et les interceptions des tests voient les ordonnées finales.

Écarté de B : les observations et réserves imprimées en entier (l'algorithme du formulaire et l'avertissement de 2169 restent), le filtrage des glossaires, les constats de trois pages ou plus, les numéros de page.
Écarté de A : la réécriture de P1 et P2.

VÉRIFICATIONS ET PRÉCISIONS APPORTÉES EN RÉDIGEANT
- exportFichesPdf commence en IX:4863 et n'imprime que des constats signés (4895). Un constat non signé ne s'imprime que pour l'étude ouverte (3284, et pièce jointe du mail en 4396).
- Dans les tests, le croquis absent se simule par le paramètre sansModule de boitePdf (CB:204-217), le croquis désactivé par vc-actif (CB:314).
- Les largeurs de colonnes viennent des verticales IX:3076-3077. Le cadre de page va de 15 à 826 (3005).
- Une ligne inactive liée à une anomalie NC vaut « non » pour constatEval (2070), mais elle s'imprime déjà sans Nb ni croix (3109, 3123-3127).
- index.html n'emploie ni getNumberOfPages ni setPage.

QUESTIONS
Il y en a trois : le défaut et le croquis, les textes fixes qui nomment un organisme, le nombre de pages.
Restent hors des questions, car le code ou les réponses les tranchent :
- les observations en entier : on garde l'algorithme du formulaire ;
- les pointillés de « Je, soussigné » : l'avertissement 2168 existe déjà ;
- la ligne à « 0 » : retirée, d'après le souhait 9 (« sans les lignes non cochées ou absentes »).

La conception fait environ 21 700 caractères. Elle ne contient ni nom d'organisme, ni sigle, ni numéro tiré des textes fixes du PDF, et seulement des données fictives.

### 16. Relecture : défauts appliqués
- E1 (DL8, DL10, D12) : « * raccordement des » (3231-3232) devient une seule ligne à quatre places ; le libellé reste dès qu'une case est cochée, et raccEPep seul s'imprime en 170,2 sur 432,5 ; la suite d'une case (3227-3228, 3230) part ou reste avec elle ; test « raccEPep seul » dans D12.
- E2 et R4 (DL9, DL19, D7, D9) : le croquis de position (c.croquis, éditeur de l'application) est distingué du croquis de terrain (module et réglage de la tablette) ; il s'imprime dès qu'il existe, dans les deux formes ; D9 imprime un même dossier module présent, absent et désactivé : trois relevés identiques, position comprise.
- E3 et R1 (Q1, DL19) : les deux sens des réponses sont exposés (16 nov. et CLAUDE.md : complet sans croquis de terrain ; S1 d, S4 a et S2 b : délesté) ; a reste recommandé, avec l'écart à la lettre du 16 nov. et à la règle de CLAUDE.md écrit en clair ; « même PDF quelle que soit la tablette » n'est plus dit que de la forme, et l'argument tiré de DL19 est retiré (le contenu d'un non signé dépend déjà du croquis : 2066, 3866).
- E4 et R3 (DL2, D1, F2) : #m-cforme commence par une entrée '' (aucun choix), comme le logo ; enregistrer l'en-tête sans toucher la liste ne range aucune forme (D1) ; F2 (b) devient une garde ; le risque d'un en-tête enregistré entre m158 et m160 qui figerait 'complet' disparaît.
- R2 (DL8, DL10, Q2, D12) : le titre (3212) et le paragraphe (3214-3216) des préconisations privées restent dès qu'une non-conformité est mentionnée (E.conclusion 'non_conformes' ou rangée imprimée à « Non ») ou qu'une préconisation privée est cochée ; test : non conforme sans préconisation, titre et paragraphe sans ligne.
- E5 (DL10, DL15, DL20 ; D5, D6, D8, D11) : « Conclusion : » devient une rangée à part, gardée si la visite est effectuée, sinon avec le réseau ou la rue ; la légende des méthodes part quand aucun code n'est imprimé.
- E6 (D5, DL25) : le dossier minimal a un propriétaire « Nom Fictif » ; ses textes fixes se comparent par empreinte.
- E7 et R6 (DL25, § 12) : F3, T3 et F2 sous b deviennent des gardes ; sous Q1 c, pas de m161 (3 correctifs ; documentation et T3 dans m160, F2 et F3 gardes de m160) ; F4 ajouté pour d.
- E8 et R7 (DL4, D4, § 12) : c-lock n'écrit la marque 3 qu'à partir de m159 (D4 passe en m159) ; en m158, seul un non signé suit l'option ; la condition sur la mise en ligne est écrite (main seulement ; avant la fusion, ni lancement manuel depuis la branche ni version d'essai sur une tablette de terrain).
- E9 (D7) : le cas à deux pages prend 15 lignes actives, toutes les préconisations cochées (D et T compris) et 600 caractères d'observations, comparés aux appels du complet décalés.
- E10 (DL16) : le cadre est situé en 3004 (15-826) ; limite basse 816.
- R5 (Q2) : Q2 n'énumère que les textes en cause (3007, 3214-3216, 3238, 3267-3268, 3271, 3272) et dit ce qui reste imprimé quelle que soit la réponse ; l'effet de b est corrigé (il nomme tout ce que le délesté perdrait).
- R8 (DL4, DL18) : les marques sont lues par une table ; toute forme nouvelle ou retouchée après la fusion prend le numéro libre suivant ; DL4 et DL18 sont d'accord (photo de la façade : un numéro par forme).
- R9 (DL25) : les textes fixes se comparent par empreinte ou aux appels du complet, jamais en clair ; seuls les textes saisis, fictifs, s'écrivent en clair.
- R10 (DL23, P2) : le non signé renvoie à « En-tête des fiches », le signé à la « présentation figée à la signature » ; P2 vérifie les deux.

### 17. Relecture : défauts écartés
- E7, en partie : faire échouer F2 sur m160 sous Q1 b n'est pas suivi. Sous b, F2 attend le formulaire complet, que m160 imprime déjà (R6) : F2 n'échoue que sous a et reste une garde sous b et c.
- E3 et R1, en partie : la piste « recommander b » n'est pas suivie. a reste recommandé : S1 d et S4 a sont plus récents et plus généraux, et S2 b a déjà étendu les nouveautés du constat au cas sans croquis. L'écart à la réponse du 16 nov. et à la règle de CLAUDE.md est écrit en clair dans Q1 et DL19, comme ces défauts l'admettent, et la règle ne change qu'avec l'accord de l'utilisateur.
