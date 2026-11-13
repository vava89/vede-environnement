# VÉDÉ Terrain : consignes de travail

## Réponses
- En français. Une réponse factuelle commence par « - Fiabilité XX % - ». Signaler les présomptions.

## Données et sécurité (dépôt public)
- Jamais de données réelles dans le dépôt, les tests, les captures ou les PR (Excel, export, fiche, photo, dossier de commune, formulaire,
  plan DXF). Données fictives seulement : « 12 rue Fictive », « Ville-Exemple », « Nom Fictif », exemple.org, 06 39 98 xx xx, 01 99 00 xx xx ;
  fond de plan : `VCroquis.demoDxf()`. Les fichiers réels envoyés par l'utilisateur restent hors du dépôt ; les agents de relecture ne les ouvrent pas.
- Jamais de mot de passe, clé ou secret dans le code ou le fil (la clé d'envoi des mails reste sur la tablette).
- Aucune commune réelle comme valeur par défaut ; le logo VÉDÉ est le logo par défaut.
- Ne jamais afficher les lignes 370-371 d'`index.html` (images base64). Ne jamais tuer un processus qu'on n'a pas lancé. Pas de `rm -rf` sur une variable.

## Règles métier
- Descente non visitable = NC. Tampon béton : NC en EU, réserve en EP. Siphon de garage → EU ; siphon de sol → EP.
- Fosse septique hors fonction grâce à un by-pass : pas d'anomalie (elle ne compte que si l'eau ne peut pas l'éviter).
- Rejet des EP dans un puits = NC, non modifiable dans la fiche ni les Réglages, sans exception aux gestes généraux de Contrôles ; un puits perdu
  se dessine en puisard. Une anomalie à arbitrer n'est jamais comptée conforme. Un drain qui reçoit un équipement EP disperse dans le sol (gestion
  des EP à la parcelle, aucun exutoire attendu, étiquette « dispersion dans le sol ») (décisions du 13 nov. 2026).
- Le PDF est le livrable. Un constat signé n'est jamais modifié. Croquis désactivé ou absent : comportement de la v1.5.1, sauf une anomalie
  saisie à la main qui nomme un lavabo : ligne « Évier », comme sur le croquis (décision du 7 nov. 2026).

## Façon de travailler
- Correctifs numérotés (m76, m77…), au plus 20 sans fusion ; la fusion ne bloque pas le travail. Pour chaque correctif : un test qui
  reproduit le défaut, la batterie verte (`sh tests/tout.sh --navigateur`), un commit en français, l'envoi sur la branche de travail.
- Pas d'identifiant de modèle dans les commits ni les PR.
- Relectures économes : deux relecteurs, contre-vérification seulement des défauts majeurs ou bloquants.
- Tenir à jour `.claude/etat-travaux.md` à chaque envoi : il est remis dans le contexte après chaque résumé du fil (hooks de `.claude/settings.json`).
- Économie de contexte : sorties courtes (`head`, `cut`, recherche ciblée) ; jamais `croquis/croquis.js` (400 ko) ni `index.html` en entier.

# Compact instructions
Garder les consignes ci-dessus, l'état des travaux, la tâche en cours et la prochaine étape, les commits et les défauts en cours ;
laisser les sorties brutes des outils et le contenu des fichiers déjà dans le dépôt.
