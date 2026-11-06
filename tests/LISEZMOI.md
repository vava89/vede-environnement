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
| `vm/regles.js` | règles du constat : siphon de garage en EU, siphon de sol en EP, rejets interdits, descente non visitable (NC), tampon béton (NC en EU, réserve en EP), fosse traversée, en cul-de-sac, hors fonction grâce à un by-pass ou vers un autre exutoire, deux fosses en parallèle, boîte sur le mauvais collecteur, conclusion |
| `vm/copie.js` | fiche et dossier : une anomalie retirée puis revenue garde la retouche du technicien, ou reprend le texte du dessin |
| `vm/avant-projet.js` | avant-projet : sortie(s) laissée(s) libre(s) après travaux (Contrôles et plan PDF), ouvrage « À supprimer » entre deux tuyaux ; état des lieux : ouvrage « Projet » où se rejoignent, où finit ou que traverse un tuyau existant |
| `vm/sens.js` | sens de l'eau des pièces (flèches du plan, du PDF et du DXF) : une flèche suit l'eau d'une source sur les pièces que tous ses chemins empruntent, jamais vers la maison sur une arrivée laissée libre ni à rebours après une boîte ; mêmes flèches dans quatre ordres du dessin |
| `vm/constat.js` | lignes du constat déduites du croquis : chaque objet dessiné compte pour une installation, sans regroupement (deux objets voisins font deux salles de bain ou deux cuisines) ; un lavabo compte sur la ligne « Évier », jamais en « Autres » |
| `vm/fosse-contournee.js` | fosse septique contournée par un by-pass : hors fonction, elle ne donne pas d'anomalie (règle du 6 novembre 2026) ; fosse en série, en cul-de-sac, en amont ; même résultat dans quatre ordres du dessin |
| `vm/aleatoire.js` | croquis aléatoires (`vm/generateur.js`) : aucune exception, même résultat quel que soit l'ordre du dessin (fosse et flèches du plan comprises), dossier stable |
| `navigateur/commun.js` | outils communs : serveur local, application dans un profil neuf, étude et dossier fictifs, fond fictif, touchers au doigt sur le plan |
| `navigateur/fumee.js` | parcours complet : étude et dossier créés à la main, croquis sur le fond fictif, anomalie reprise dans le dossier, plan PDF, réouverture hors connexion |
| `navigateur/gestes.js` | gestes de l'éditeur corrigés en v1.6.2 : ouvrage posé sur un raccord (puis passé « Projet », supprimé, ou touché sur un bout libre ; clapet orienté), coude libre vu de près, descente près d'une façade, triple toucher quand la fiche fait glisser le plan |
| `navigateur/dossier.js` | croquis et dossier : la nature (NC ou réserve) choisie à la main reste celle du technicien quand une anomalie écartée revient et que le dessin change ; « Reprendre du croquis » : un lavabo seul sur la ligne « Évier » |

Les tests du navigateur ne changent rien à l'application : ils gardent l'éditeur du croquis qu'elle crée (`window.__vcEd`) et les fichiers
qu'elle enregistre (`window.__VT_SAVE`), dans un profil neuf de Chromium. Chaque scénario de `gestes.js` échoue sur la version d'avant
sa correction (19cbe31 pour m80, 46cf8fe pour m82, c6b999a pour m83, 24ce104 pour m84) et passe sur la version corrigée.

## À refaire

Les cas m, o, p, s, t, n3 à n9 et u1 à u3 de l'ancienne matrice d'analyse ont été perdus avec le dossier de travail, le 6 novembre 2026.
Leurs règles restent couvertes en partie par `analyse.js` et `aleatoire.js` ; ils sont à réécrire.
