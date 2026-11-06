#!/bin/sh
# Hook PreCompact : consignes données au résumé du fil (manuel ou automatique), suivies de l'état des travaux.
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" 2>/dev/null || exit 0
cat <<'TXT'
Résumé du fil de travail sur VÉDÉ Terrain. Garder précisément :
- les consignes permanentes de l'utilisateur et ses décisions (mot pour mot quand elles sont courtes) ;
- l'état des travaux : version, correctifs depuis la dernière fusion (numéros, compte sur 20), commits (empreintes) et leur contenu, ce qui est envoyé ou non ;
- la tâche en cours, la prochaine étape, ce qui attend un résultat ou une réponse (relectures, workflows, questions posées) ;
- les défauts trouvés et leur statut (corrigé, à corriger, écarté et pourquoi) ;
- les chemins des fichiers et scripts utiles, les commandes de test et leur dernier résultat ;
- les contraintes de données (fictives uniquement) et de sécurité.
Laisser de côté : les sorties brutes des outils, le contenu des fichiers déjà dans le dépôt, les essais abandonnés, les traces de débogage.
TXT
echo; echo "État des travaux au moment du résumé (.claude/etat-travaux.md) :"; cat .claude/etat-travaux.md 2>/dev/null
echo; echo "Derniers commits :"; git log --oneline -6 2>/dev/null; git status --short 2>/dev/null | head -15
exit 0
