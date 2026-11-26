#!/usr/bin/env bash
set -euo pipefail

MESSAGE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -m|--message)
      if [[ $# -lt 2 ]]; then
        echo "Error: $1 requires a commit message argument." >&2
        exit 1
      fi
      MESSAGE="$2"
      shift 2
      ;;
    -h|--help)
      echo "Usage: $(basename "$0") [-m \"commit message\" | \"commit message\"]"
      exit 0
      ;;
    --)
      shift
      break
      ;;
    -*)
      echo "Error: Unknown option: $1" >&2
      exit 1
      ;;
    *)
      if [[ -z "$MESSAGE" ]]; then
        MESSAGE="$1"
      else
        MESSAGE="$MESSAGE $1"
      fi
      shift
      ;;
  esac
done

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

CYAN='\033[0;36m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

trap 'echo -e "\n${RED}Deploy failed with exit code $?.${NC}" >&2' ERR

echo -e "${CYAN}==> [1/5] Running course linter...${NC}"
pnpm lint

echo -e "${CYAN}==> [2/5] Building Astro site...${NC}"
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build

echo -e "${CYAN}==> [3/5] Exporting LLM study artifacts...${NC}"
pnpm export-llm

echo -e "${CYAN}==> [4/5] Committing changes...${NC}"
if [[ -z "$(git status --porcelain)" ]]; then
  echo -e "${YELLOW}No uncommitted changes to commit.${NC}"
else
  if [[ -z "$MESSAGE" ]]; then
    ts="$(date +"%Y-%m-%d %H:%M")"
    MESSAGE="chore: update courses ($ts)"
  fi
  git add -A
  git commit -m "$MESSAGE"
fi

echo -e "${CYAN}==> [5/5] Pushing to remote (triggers GitHub Pages deploy)...${NC}"
git push

echo -e "${GREEN}Done! Pushed to remote; GitHub Actions will deploy to GitHub Pages.${NC}"

