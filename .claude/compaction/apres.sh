#!/bin/sh
# Hook SessionStart (ouverture, reprise, après un résumé) : remet l'état des travaux dans le contexte.
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" 2>/dev/null || exit 0
echo "État des travaux (.claude/etat-travaux.md, à tenir à jour à chaque envoi) :"; cat .claude/etat-travaux.md 2>/dev/null
echo; echo "Derniers commits :"; git log --oneline -6 2>/dev/null; git status --short 2>/dev/null | head -15
exit 0
