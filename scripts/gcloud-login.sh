#!/bin/bash

# GCP login for alocare-app-web (Secret Manager + gcloud CLI).
# Usage: ./scripts/gcloud-login.sh [--login]
#   --login   Run gcloud auth login (and ADC login if needed). Uses --no-launch-browser.
# Without --login: only sets project/quota and prints commands (no terminal password prompts).
#
# Uses project-local gcloud config (.credentials/gcloud).

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_GCLOUD_DIR="$REPO_ROOT/.credentials/gcloud"
PROJECT_ADC_FILE="$PROJECT_GCLOUD_DIR/application_default_credentials.json"

read_env_kv() {
  local key="$1"
  local envfile="$2"
  { grep -E "^${key}=" "$envfile" 2>/dev/null || true; } | cut -d= -f2- | tr -d '\r' | sed 's/^["'\''"]//;s/["'\''"]$//'
}

load_env_file() {
  local envfile="$1"
  [ -f "$envfile" ] || return 0
  local _gmail _proj _quota _sa_secret _sa_id
  _gmail=$(read_env_kv GCLOUD_ACCOUNT_EMAIL "$envfile")
  _proj=$(read_env_kv GOOGLE_CLOUD_PROJECT_ID "$envfile")
  _quota=$(read_env_kv GOOGLE_CLOUD_QUOTA_PROJECT "$envfile")
  _sa_secret=$(read_env_kv LOCAL_DEV_GCP_SA_SECRET_NAME "$envfile")
  _sa_id=$(read_env_kv LOCAL_DEV_GCP_SA_ID "$envfile")
  if [ -n "$_gmail" ]; then export GCLOUD_ACCOUNT_EMAIL="$_gmail"; fi
  if [ -n "$_proj" ]; then export GOOGLE_CLOUD_PROJECT_ID="$_proj"; fi
  if [ -n "$_quota" ]; then export GOOGLE_CLOUD_QUOTA_PROJECT="$_quota"; fi
  if [ -n "$_sa_secret" ]; then export LOCAL_DEV_GCP_SA_SECRET_NAME="$_sa_secret"; fi
  if [ -n "$_sa_id" ]; then export LOCAL_DEV_GCP_SA_ID="$_sa_id"; fi
}

cd "$REPO_ROOT"
for envfile in ".env.example" ".env"; do
  load_env_file "$envfile"
done

PROJECT_ID="${GOOGLE_CLOUD_PROJECT_ID:-personal-suherman}"
QUOTA_PROJECT="${GOOGLE_CLOUD_QUOTA_PROJECT:-$PROJECT_ID}"
ACCOUNT_EMAIL="${GCLOUD_ACCOUNT_EMAIL:-}"

RUN_LOGIN=false
for arg in "$@"; do
  if [ "$arg" = "--login" ]; then
    RUN_LOGIN=true
    break
  fi
done

mkdir -p "$PROJECT_GCLOUD_DIR"
export CLOUDSDK_CONFIG="$PROJECT_GCLOUD_DIR"

gcloud_repo() {
  CLOUDSDK_CONFIG="$PROJECT_GCLOUD_DIR" gcloud "$@"
}

echo "🔧 Setting up GCP project configuration for alocare-app-web..."
echo "📦 Project ID: ${PROJECT_ID}"
echo "📂 gcloud config: ${PROJECT_GCLOUD_DIR}"
if [ -n "$ACCOUNT_EMAIL" ]; then
  echo "👤 Account: ${ACCOUNT_EMAIL}"
else
  echo "👤 Account: (not fixed — use browser / paste code to choose any Google account)"
fi
echo ""

echo "1️⃣  Setting active project..."
if gcloud_repo config set project "${PROJECT_ID}" --quiet 2>&1; then
  echo "✅ Active project set to ${PROJECT_ID}"
else
  echo "⚠️  Could not set project yet (may succeed after login)."
fi

echo ""
echo "2️⃣  Checking current authentication..."
CURRENT_ACCOUNT=$(gcloud_repo config get-value account 2>/dev/null || echo "")

if [ "$RUN_LOGIN" = true ]; then
  echo "   gcloud auth login — open the link, sign in, paste the verification code."
  echo ""
  if [ -n "$ACCOUNT_EMAIL" ]; then
    if gcloud_repo auth login "${ACCOUNT_EMAIL}" --no-launch-browser; then
      echo "✅ gcloud auth login succeeded"
      CURRENT_ACCOUNT="${ACCOUNT_EMAIL}"
    else
      echo "⚠️  gcloud auth login did not complete."
    fi
  else
    if gcloud_repo auth login --no-launch-browser; then
      echo "✅ gcloud auth login succeeded"
      CURRENT_ACCOUNT=$(gcloud_repo config get-value account 2>/dev/null || echo "")
    else
      echo "⚠️  gcloud auth login did not complete."
    fi
  fi
elif [ -z "$CURRENT_ACCOUNT" ]; then
  echo "⚠️  Not authenticated. To log in: npm run login"
elif [ -n "$ACCOUNT_EMAIL" ] && [ "$CURRENT_ACCOUNT" != "$ACCOUNT_EMAIL" ]; then
  echo "⚠️  Currently authenticated as: ${CURRENT_ACCOUNT}"
  echo "   Expected (from env): ${ACCOUNT_EMAIL}"
  echo "   To switch: npm run login"
elif [ -n "$ACCOUNT_EMAIL" ]; then
  echo "✅ Already authenticated as ${ACCOUNT_EMAIL}"
else
  echo "✅ gcloud CLI account: ${CURRENT_ACCOUNT}"
fi

if [ -n "$CURRENT_ACCOUNT" ] && [ -n "$ACCOUNT_EMAIL" ]; then
  gcloud_repo config set account "${ACCOUNT_EMAIL}" --quiet 2>/dev/null || true
fi

gcloud_repo config set project "${PROJECT_ID}" --quiet 2>/dev/null || true

echo ""
echo "3️⃣  Application Default Credentials (project-local)..."
echo "   ADC file: ${PROJECT_ADC_FILE}"
if [ "$RUN_LOGIN" = true ]; then
  if gcloud_repo auth application-default login --no-launch-browser; then
    echo "✅ Application Default Credentials saved"
  else
    echo "⚠️  ADC login did not complete."
  fi
  echo ""
  if gcloud_repo auth application-default set-quota-project "${QUOTA_PROJECT}" 2>&1; then
    echo "✅ Quota project set to ${QUOTA_PROJECT}"
  else
    echo "⚠️  Could not set quota project."
  fi
elif [ -f "$PROJECT_ADC_FILE" ]; then
  echo "✅ Found project-local ADC"
  gcloud_repo auth application-default set-quota-project "${QUOTA_PROJECT}" 2>/dev/null || true
else
  echo "   Project-local ADC not set up. Run: npm run login"
fi

echo ""
echo "4️⃣  Long-lived service account key (Secret Manager → .credentials/keys/)..."
if [ "$RUN_LOGIN" = true ]; then
  SA_SECRET_NAME="${LOCAL_DEV_GCP_SA_SECRET_NAME:-alocare-app-web-local-dev-sa-key}"
  SA_KEY_BASENAME="${LOCAL_DEV_GCP_SA_ID:-alocare-app-web-local}"
  SA_KEY_FILE="$REPO_ROOT/.credentials/keys/${SA_KEY_BASENAME}.json"
  mkdir -p "$REPO_ROOT/.credentials/keys"
  if gcloud_repo secrets describe "$SA_SECRET_NAME" --project="$PROJECT_ID" &>/dev/null; then
    TMP=$(mktemp "${SA_KEY_FILE}.tmp.XXXXXX")
    if gcloud_repo secrets versions access latest --secret="$SA_SECRET_NAME" --project="$PROJECT_ID" >"$TMP" 2>/dev/null; then
      if grep -q '"type"[[:space:]]*:[[:space:]]*"service_account"' "$TMP" 2>/dev/null; then
        mv "$TMP" "$SA_KEY_FILE"
        chmod 600 "$SA_KEY_FILE" 2>/dev/null || true
        echo "   ✅ Wrote ${SA_KEY_FILE}"
      else
        rm -f "$TMP"
        echo "   ⚠️  Secret ${SA_SECRET_NAME} is not valid service_account JSON."
      fi
    else
      rm -f "$TMP"
      echo "   ⚠️  Could not read secret (need roles/secretmanager.secretAccessor)."
    fi
  else
    echo "   ℹ️  No secret named ${SA_SECRET_NAME} — skipped."
    echo "      Run: npm run seed-secrets (after uploading SA key to Secret Manager)"
  fi
elif [ -f "$REPO_ROOT/.credentials/keys/${LOCAL_DEV_GCP_SA_ID:-alocare-app-web-local}.json" ]; then
  echo "   Found existing key (run npm run login to refresh)."
else
  echo "   (Skipped — run npm run login to download from Secret Manager.)"
fi

echo ""
echo "✅ GCP project setup complete!"
echo ""
echo "💡 Next steps:"
echo "   1. npm run seed-secrets   # upload portal OAuth + API URLs from .env"
echo "   2. npm run generate-env   # pull secrets into .env"
echo "   3. npm run dev"
echo ""
