#!/usr/bin/env bash
# Upload GitHub Actions secrets and variables from root .env.
#
# Prerequisites:
#   gh auth login
#   .env with PORTAL_GOOGLE_* and optional API URLs
#
# Usage:
#   npm run seed-github-config
#   GITHUB_REPO=owner/alocare-app-web npm run seed-github-config

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${REPO_ROOT}/.env"
MAP_FILE="${SCRIPT_DIR}/github-env-map.json"

read_env_kv() {
  local key="$1"
  local file="$2"
  if [[ ! -f "$file" ]]; then
    return 1
  fi
  local line
  line="$(grep -E "^${key}=" "$file" | tail -1 || true)"
  [[ -n "$line" ]] || return 1
  local value="${line#*=}"
  value="${value%$'\r'}"
  value="${value#\"}"
  value="${value%\"}"
  value="${value#\'}"
  value="${value%\'}"
  printf '%s' "$value"
}

require_gh() {
  command -v gh >/dev/null 2>&1 || {
    echo "error: gh CLI not found. Install: https://cli.github.com/" >&2
    exit 1
  }
  gh auth status >/dev/null 2>&1 || {
    echo "error: gh not authenticated. Run: gh auth login" >&2
    exit 1
  }
}

json_get() {
  local file="$1"
  local path="$2"
  node -e "
    const data = require('${file}');
    const parts = '${path}'.split('.');
    let cur = data;
    for (const p of parts) cur = cur?.[p];
    if (cur == null) process.exit(1);
    process.stdout.write(String(cur));
  "
}

[[ -f "$ENV_FILE" ]] || {
  echo "error: missing ${ENV_FILE}" >&2
  echo "       Copy .env.example to .env and add PORTAL_GOOGLE_CLIENT_ID / PORTAL_GOOGLE_CLIENT_SECRET." >&2
  exit 1
}

require_gh

GITHUB_REPO="${GITHUB_REPO:-}"
if [[ -z "$GITHUB_REPO" ]]; then
  if git -C "$REPO_ROOT" remote get-url origin >/dev/null 2>&1; then
    origin="$(git -C "$REPO_ROOT" remote get-url origin)"
    if [[ "$origin" =~ github.com[:/](.+/.+)(\.git)?$ ]]; then
      GITHUB_REPO="${BASH_REMATCH[1]%.git}"
    fi
  fi
fi
[[ -n "$GITHUB_REPO" ]] || {
  echo "error: set GITHUB_REPO=owner/alocare-app-web" >&2
  exit 1
}

echo "Seeding GitHub Actions config for ${GITHUB_REPO} from ${ENV_FILE}"

map_keys() {
  local section="$1"
  node -e "
    const data = require('${MAP_FILE}');
    const keys = Object.keys(data.${section} || {});
    console.log(keys.join(' '));
  "
}

for gh_name in $(map_keys secrets); do
  env_key="$(json_get "$MAP_FILE" "secrets.${gh_name}.env")"
  required="$(json_get "$MAP_FILE" "secrets.${gh_name}.required")"
  value="$(read_env_kv "$env_key" "$ENV_FILE" || true)"
  if [[ -z "$value" ]]; then
    if [[ "$required" == "true" ]]; then
      echo "error: ${env_key} is missing in ${ENV_FILE}" >&2
      exit 1
    fi
    echo "Skipping secret ${gh_name} (empty)"
    continue
  fi
  echo "Setting secret ${gh_name}..."
  printf '%s' "$value" | gh secret set "$gh_name" --repo "$GITHUB_REPO"
done

for gh_name in $(map_keys variables); do
  env_key="$(json_get "$MAP_FILE" "variables.${gh_name}.env")"
  default_value="$(json_get "$MAP_FILE" "variables.${gh_name}.default" 2>/dev/null || true)"
  value="$(read_env_kv "$env_key" "$ENV_FILE" || true)"
  value="${value:-$default_value}"
  if [[ "$gh_name" == NEXT_PUBLIC_* || "$gh_name" == "API_PROXY_URL" ]]; then
    if [[ "$value" == *localhost* || "$value" == *127.0.0.1* ]]; then
      value="$default_value"
    fi
  fi
  if [[ -z "$value" ]]; then
    echo "Skipping variable ${gh_name} (empty, no default)"
    continue
  fi
  echo "Setting variable ${gh_name}=${value}..."
  gh variable set "$gh_name" --body "$value" --repo "$GITHUB_REPO"
done

echo ""
echo "Done. Verify in GitHub → Settings → Secrets and variables → Actions"
