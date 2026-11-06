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
| `vm/copie.js` | fiche et dossier : une anomalie retirée puis revenue garde la retouche du technicien, ou reprend le texte du dessin |
| `vm/avant-projet.js` | avant-projet : sortie laissée libre après travaux (Contrôles et plan PDF), ouvrage « À supprimer » entre deux tuyaux |
| `vm/aleatoire.js` | croquis aléatoires (`vm/generateur.js`) : aucune exception, même résultat quel que soit l'ordre du dessin, dossier stable |
| `vm/fosse-contournee.js` | fosse septique contournée par un by-pass : **en attente de décision** (« toujours » ou « jamais »), non lancé par `tout.sh` |
| `navigateur/` | l'application dans Chromium : ouverture, étude fictive, croquis, gestes de l'éditeur |

## À refaire

Les cas m, o, p, s, t, n3 à n9 et u1 à u3 de l'ancienne matrice d'analyse ont été perdus avec le dossier de travail, le 6 novembre 2026.
Leurs règles restent couvertes en partie par `analyse.js` et `aleatoire.js` ; ils sont à réécrire.
