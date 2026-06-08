#!/usr/bin/env bash
# Upload alocare-app-web secrets from root .env into GCP Secret Manager.
#
# 1. Put PORTAL_GOOGLE_* and API URLs in .env
# 2. npm run login
# 3. npm run seed-secrets
# 4. npm run generate-env

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${REPO_ROOT}/.env"
PROJECT_GCLOUD_DIR="$REPO_ROOT/.credentials/gcloud"

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

gcloud_repo() {
  CLOUDSDK_CONFIG="$PROJECT_GCLOUD_DIR" gcloud "$@"
}

upsert_secret() {
  local name="$1"
  local value="$2"
  if [[ -z "$value" ]]; then
    echo "error: ${name} source value is empty in ${ENV_FILE}" >&2
    exit 1
  fi
  if ! gcloud_repo secrets describe "$name" --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Creating secret ${name}..."
    gcloud_repo secrets create "$name" \
      --project="$PROJECT_ID" \
      --replication-policy="automatic" \
      --labels="app=alocare-app-web"
  else
    echo "Updating secret ${name}..."
  fi
  printf '%s' "$value" | gcloud_repo secrets versions add "$name" \
    --project="$PROJECT_ID" \
    --data-file=-
}

upsert_secret_optional() {
  local name="$1"
  local value="$2"
  if [[ -z "$value" ]]; then
    echo "Skipping optional ${name} (empty in .env)"
    return 0
  fi
  upsert_secret "$name" "$value"
}

[[ -f "$ENV_FILE" ]] || {
  echo "error: missing ${ENV_FILE}" >&2
  echo "       Copy .env.example to .env, add portal OAuth credentials, then retry." >&2
  exit 1
}

PROJECT_ID="$(read_env_kv GOOGLE_CLOUD_PROJECT_ID "$ENV_FILE" || true)"
PROJECT_ID="${PROJECT_ID:-personal-suherman}"

echo "Seeding Secret Manager in project ${PROJECT_ID} from ${ENV_FILE}"
gcloud_repo config set project "${PROJECT_ID}" --quiet 2>/dev/null || true

PORTAL_GOOGLE_CLIENT_ID="$(read_env_kv PORTAL_GOOGLE_CLIENT_ID "$ENV_FILE" || true)"
PORTAL_GOOGLE_CLIENT_SECRET="$(read_env_kv PORTAL_GOOGLE_CLIENT_SECRET "$ENV_FILE" || true)"

for pair in \
  "PORTAL_GOOGLE_CLIENT_ID:${PORTAL_GOOGLE_CLIENT_ID}" \
  "PORTAL_GOOGLE_CLIENT_SECRET:${PORTAL_GOOGLE_CLIENT_SECRET}"; do
  key="${pair%%:*}"
  val="${pair#*:}"
  if [[ -z "$val" ]]; then
    echo "error: ${key} is missing or empty in ${ENV_FILE}" >&2
    exit 1
  fi
done

upsert_secret "alocare-app-web-portal-google-oauth-client-id" "$PORTAL_GOOGLE_CLIENT_ID"
upsert_secret "alocare-app-web-portal-google-oauth-client-secret" "$PORTAL_GOOGLE_CLIENT_SECRET"

upsert_secret_optional "alocare-app-web-next-public-api-url" "$(read_env_kv NEXT_PUBLIC_API_URL "$ENV_FILE" || true)"
upsert_secret_optional "alocare-app-web-next-public-app-url" "$(read_env_kv NEXT_PUBLIC_APP_URL "$ENV_FILE" || true)"
upsert_secret_optional "alocare-app-web-api-proxy-url" "$(read_env_kv API_PROXY_URL "$ENV_FILE" || true)"

SA_SECRET="${LOCAL_DEV_GCP_SA_SECRET_NAME:-alocare-app-web-local-dev-sa-key}"
if ! gcloud_repo secrets describe "$SA_SECRET" --project="$PROJECT_ID" >/dev/null 2>&1; then
  echo "Creating optional SA key secret ${SA_SECRET} (upload JSON via npm run login)..."
  gcloud_repo secrets create "$SA_SECRET" \
    --project="$PROJECT_ID" \
    --replication-policy="automatic" \
    --labels="app=alocare-app-web"
fi

echo ""
echo "Done. Run: npm run generate-env"
