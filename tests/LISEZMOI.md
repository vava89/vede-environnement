# Tests de VÉDÉ Terrain

Ces tests vérifient l'application avant chaque mise à jour. Ils restent dans le dépôt mais ne sont pas publiés : la mise en ligne
(`.github/workflows/mise-en-ligne.yml`) copie le dépôt sans le dossier `tests/`, la tablette ne les reçoit donc jamais.

## Données : uniquement fictives

Aucun fichier réel ne doit entrer ici : ni Excel, ni export, ni fiche, ni photo, ni plan cadastral, ni dossier de commune.
Les croquis de test sont construits dans le code, avec des valeurs fictives : « 12 rue Fictive », « Ville-Exemple », « Nom Fictif »,
adresses en `exemple.org`, téléphones en 06 39 98 xx xx ou 01 99 00 xx xx. Pour un fond de plan, utiliser `VCroquis.demoDxf()`.

## Lancer les tests

Il faut Node.js 18 ou plus récent ; les tests du navigateur demandent aussi Playwright et Chromium.

```sh
sh tests/tout.sh                 # tests sans navigateur
sh tests/tout.sh --navigateur    # et ceux du navigateur
sh tests/tout.sh -v              # détail de chaque cas
node tests/vm/analyse.js --app=../autre-version   # une autre version de l'application (comparaison)
```

Chaque fichier affiche son bilan (« analyse : 68/68 ») et sort en erreur au premier cas faux.

## Contenu

| Fichier | Ce qui est vérifié |
| --- | --- |
| `vm/charger.js` | outils communs : chargement de `croquis/croquis.js` hors navigateur, croquis fictifs en abrégé, ordres du dessin |
| `vm/analyse.js` | matrice d'analyse : exutoire, réseau (présumé ou non), messages « manque », conclusion proposée, même résultat dans quatre ordres du dessin |
| `vm/regles.js` | règles du constat : siphon de garage en EU, siphon de sol en EP, rejets interdits, descente non visitable (NC), tampon béton (NC en EU, réserve en EP), fosse traversée, en cul-de-sac, hors fonction grâce à un by-pass ou vers un autre exutoire, deux fosses en parallèle (une fosse d'un chemin qui en traverse le moins, jamais une fosse contournée en aval), boîte sur le mauvais collecteur, conclusion |
| `vm/copie.js` | fiche et dossier : une anomalie retirée puis revenue garde la retouche du technicien, ou reprend le texte du dessin |
| `vm/avant-projet.js` | avant-projet : sortie(s) laissée(s) libre(s) après travaux (Contrôles et plan PDF), ouvrage « À supprimer » entre deux tuyaux ; état des lieux : ouvrage « Projet » où se rejoignent, où finit ou que traverse un tuyau existant ; raccord au milieu d'un tuyau existant, d'où part un tuyau « Projet » (état des lieux) ou une branche « À supprimer » (avant-projet) : même analyse que sans lui (échoue sur ba2d32a) ; conclusion choisie dans le constat, donnée par l'hôte : imprimée sur le plan de l'état des lieux, ignorée si le constat ne peut pas la choisir, absente de l'avant-projet (échoue sur 0a317cc) |
| `vm/sens.js` | sens de l'eau des pièces (flèches du plan, du PDF et du DXF) : une flèche suit l'eau d'une source sur les pièces que tous ses chemins empruntent, jamais vers la maison sur une arrivée laissée libre ni à rebours après une boîte ; mêmes flèches dans quatre ordres du dessin |
| `vm/constat.js` | lignes du constat déduites du croquis : chaque objet dessiné compte pour une installation, sans regroupement (deux objets voisins font deux salles de bain ou deux cuisines) ; un lavabo compte sur la ligne « Évier », jamais en « Autres » ; une anomalie posée sur un objet (bibliothèque ou saisie libre) va sur la ligne de cet objet, un lavabo sur « Évier » (échoue sur 26ad292), et un enregistrement intact d'un dossier de la v1.6.2 la suit |
| `vm/fosse-contournee.js` | fosse septique contournée par un by-pass : hors fonction, elle ne donne pas d'anomalie (règle du 6 novembre 2026) ; fosse en série, en cul-de-sac, en amont ; fosse évitée seulement vers une extrémité libre qui peut être une arrivée : « à arbitrer », sans conformité proposée, la décision de l'opérateur (retenue, écartée) fait foi (échoue sur c5496dd) ; même résultat dans quatre ordres du dessin |
| `vm/fosse-oracle.js` | fosse septique désignée sur des croquis aléatoires (WC, regards, fosses, boîtes EU, tuyaux parfois orientés) : la même que celle d'un oracle qui énumère les chemins simples (sur tout chemin, sinon d'un chemin qui en traverse le moins ; échoue sur c5496dd) |
| `vm/aleatoire.js` | croquis aléatoires (`vm/generateur.js`) : aucune exception, même résultat quel que soit l'ordre du dessin (fosse et flèches du plan comprises), dossier stable ; un raccord posé au milieu d'un tuyau, d'où part un tuyau absent du plan, ne change rien (échoue sur ba2d32a) |
| `navigateur/commun.js` | outils communs : serveur local, application dans un profil neuf, étude et dossier fictifs, fond fictif, touchers au doigt sur le plan |
| `navigateur/fumee.js` | parcours complet : étude et dossier créés à la main, croquis sur le fond fictif, anomalie reprise dans le dossier, plan PDF, réouverture hors connexion |
| `navigateur/gestes.js` | gestes de l'éditeur corrigés en v1.6.2 : ouvrage posé sur un raccord (puis passé « Projet », supprimé, ou touché sur un bout libre ; clapet orienté dans le sens de l'eau, y compris sur un branchement tracé depuis le collecteur et sur le trop-plein d'un puisard), coude libre vu de près, descente près d'une façade, triple toucher quand la fiche fait glisser le plan |
| `navigateur/dossier.js` | croquis et dossier : la nature (NC ou réserve) choisie à la main reste celle du technicien quand une anomalie écartée revient et que le dessin change ; « Reprendre du croquis » : un lavabo seul sur la ligne « Évier » ; dossier commencé en v1.6.2 : la ligne reprise de l'ancien croquis suit le croquis à l'ouverture du constat, une anomalie que le dessin met à jour est rappelée (ouvrir puis refermer le croquis la reporte), un constat signé ne rappelle aucun écart (échoue sur 48f611c) ; une ligne que le croquis juge non conforme (évier relié directement, lavabo par une fosse) et que le constat dit conforme est rappelée (échoue sur b0ef508) ; une ligne « Autres » saisie à la main pour un appareil dessiné (« Lavabos », « Lavabo de la salle d'eau ») est rappelée comme un double compte possible (échoue sur be1d749) ; une anomalie saisie à la main, hors croquis, qui nomme un lavabo va sur la ligne « Évier », plus « Salle de bain » quand le texte la nomme aussi, et sur aucune ligne sans évier compté ; une douche reste en salle de bain (échoue sur 22df7f2) ; plan PDF de l'état des lieux (plan du dossier, de l'export, bouton du croquis, constat signé) : « Conclusion du constat » quand le technicien l'a choisie, sinon « Conclusion proposée » (choix retiré, visite non effectuée ; échoue sur 0a317cc) |

Les tests du navigateur ne changent rien à l'application : ils gardent l'éditeur du croquis qu'elle crée (`window.__vcEd`) et les fichiers
qu'elle enregistre (`window.__VT_SAVE`), dans un profil neuf de Chromium. Chaque scénario de `gestes.js` échoue sur la version d'avant
sa correction (19cbe31 pour m80, 46cf8fe pour m82, c6b999a pour m83, 24ce104 pour m84, fe67eef pour m88) et passe sur la version
corrigée ; le clapet sur le trop-plein d'un puisard est un témoin (il passe sur les deux).

## À refaire

Les cas m, o, p, s, t, n3 à n9 et u1 à u3 de l'ancienne matrice d'analyse ont été perdus avec le dossier de travail, le 6 novembre 2026.
Leurs règles restent couvertes en partie par `analyse.js` et `aleatoire.js` ; ils sont à réécrire.
