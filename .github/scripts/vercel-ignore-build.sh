#!/usr/bin/env bash
# Vercel: exit 0 = skip build, exit 1 = build.
# infrafund-agents deploys only to the Azure VM via GitHub Actions.

set -euo pipefail

branch="${VERCEL_GIT_COMMIT_REF:-}"

if [ "$branch" = "infrafund-agents" ]; then
  echo "Skipping Vercel build for agent-only branch: infrafund-agents"
  exit 0
fi

exit 1
