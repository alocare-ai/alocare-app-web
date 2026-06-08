#!/usr/bin/env bash
# Sync GitHub Actions / CI env vars into the linked Vercel project before build.
#
# Usage (from vercel-deploy workflow):
#   bash scripts/deploy/sync-vercel-env.sh production
#   bash scripts/deploy/sync-vercel-env.sh preview
#
# Required env:
#   VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
#   PORTAL_GOOGLE_CLIENT_ID, PORTAL_GOOGLE_CLIENT_SECRET
#   NEXT_PUBLIC_API_URL, NEXT_PUBLIC_APP_URL, API_PROXY_URL

set -euo pipefail

TARGET="${1:-production}"

if [[ "$TARGET" != "production" && "$TARGET" != "preview" ]]; then
  echo "error: target must be production or preview (got: ${TARGET})" >&2
  exit 1
fi

for name in VERCEL_TOKEN VERCEL_ORG_ID VERCEL_PROJECT_ID; do
  if [[ -z "${!name:-}" ]]; then
    echo "error: ${name} is required" >&2
    exit 1
  fi
done

export VERCEL_ORG_ID VERCEL_PROJECT_ID

sync_var() {
  local key="$1"
  local value="$2"
  local sensitive="${3:-false}"

  if [[ -z "$value" ]]; then
    echo "Skipping empty ${key}"
    return 0
  fi

  echo "Syncing ${key} → Vercel (${TARGET})..."
  vercel env rm "$key" "$TARGET" --yes --token="$VERCEL_TOKEN" >/dev/null 2>&1 || true

  local args=(env add "$key" "$TARGET" --force --token="$VERCEL_TOKEN")
  if [[ "$sensitive" == "true" ]]; then
    args+=(--sensitive)
  fi

  printf '%s' "$value" | vercel "${args[@]}"
}

echo "Syncing environment variables to Vercel (${TARGET})..."

sync_var "PORTAL_GOOGLE_CLIENT_ID" "${PORTAL_GOOGLE_CLIENT_ID:-}" false
sync_var "PORTAL_GOOGLE_CLIENT_SECRET" "${PORTAL_GOOGLE_CLIENT_SECRET:-}" true
sync_var "NEXT_PUBLIC_API_URL" "${NEXT_PUBLIC_API_URL:-https://api.alocare.net}" false
sync_var "NEXT_PUBLIC_APP_URL" "${NEXT_PUBLIC_APP_URL:-https://app.alocare.net}" false
sync_var "API_PROXY_URL" "${API_PROXY_URL:-https://api.alocare.net}" false

echo "Done syncing Vercel env for ${TARGET}."
