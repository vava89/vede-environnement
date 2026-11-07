#!/bin/sh
# Lance les tests de VÉDÉ Terrain : sans navigateur (tests/vm), puis, avec --navigateur, ceux du navigateur (tests/navigateur).
# Options transmises à chaque test : -v (détail de chaque cas), --app=<dossier> (une autre version de l'application, pour comparer).
# Code de sortie : 0 si tout passe, 1 sinon.
cd "$(dirname "$0")/.." || exit 2
nav=0; opts=""
for a in "$@"; do
  case "$a" in
    --navigateur) nav=1 ;;
    *) opts="$opts $a" ;;
  esac
done
ec=0
for t in analyse regles sens constat fosse-contournee fosse-oracle copie avant-projet aleatoire dessin compat boite escalier; do
  # shellcheck disable=SC2086
  node "tests/vm/$t.js" $opts || ec=1
done
if [ "$nav" = 1 ]; then
  for t in fumee gestes dossier souris dessin boite escalier cotes constat-boite; do
    if [ ! -e "tests/navigateur/$t.js" ]; then echo "$t : fichier absent"; ec=1; continue; fi
    # shellcheck disable=SC2086
    node "tests/navigateur/$t.js" $opts || ec=1
  done
fi
[ "$ec" = 0 ] && echo "Tous les tests passent." || echo "Des tests échouent."
exit "$ec"
