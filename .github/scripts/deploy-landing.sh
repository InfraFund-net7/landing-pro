#!/usr/bin/env bash
# Deploy a pre-loaded landing image with docker compose (server stack + override, or standalone file).
set -euo pipefail

COMPOSE_PATH="${COMPOSE_PATH:?COMPOSE_PATH is required}"
OVERRIDE_PATH="${OVERRIDE_PATH:-}"
LANDING_IMAGE="${LANDING_IMAGE:-infra-landing:dev}"
SERVICE_NAME="${SERVICE_NAME:-landing}"
COMPOSE_FILES=(-f "$COMPOSE_PATH")

if [[ -n "$OVERRIDE_PATH" && -f "$OVERRIDE_PATH" ]]; then
  COMPOSE_FILES+=(-f "$OVERRIDE_PATH")
fi

if [[ ! -f "$COMPOSE_PATH" ]]; then
  echo "ERROR: compose file not found: $COMPOSE_PATH" >&2
  exit 1
fi

if ! docker image inspect "$LANDING_IMAGE" >/dev/null 2>&1; then
  echo "ERROR: Docker image not loaded: $LANDING_IMAGE" >&2
  docker images | head -20 || true
  exit 1
fi

# Common alternate tags used in older compose files
docker tag "$LANDING_IMAGE" landing-infrafund:latest 2>/dev/null || true

echo "Compose files: ${COMPOSE_FILES[*]}"
docker compose "${COMPOSE_FILES[@]}" config --services

if ! docker compose "${COMPOSE_FILES[@]}" config --services | grep -qx "$SERVICE_NAME"; then
  echo "ERROR: service '$SERVICE_NAME' not found in compose project" >&2
  exit 1
fi

export LANDING_IMAGE

docker compose "${COMPOSE_FILES[@]}" up -d "$SERVICE_NAME" --force-recreate --no-build --pull never

echo "Waiting for container health..."
cid=""
deadline=$((SECONDS + 120))
while (( SECONDS < deadline )); do
  cid="$(docker compose "${COMPOSE_FILES[@]}" ps -q "$SERVICE_NAME" 2>/dev/null | head -1 || true)"
  if [[ -z "$cid" ]]; then
    sleep 5
    continue
  fi
  state="$(docker inspect -f '{{.State.Status}}' "$cid" 2>/dev/null || true)"
  health="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{end}}' "$cid" 2>/dev/null || true)"
  if [[ "$health" == "healthy" ]]; then
    echo "Service $SERVICE_NAME is healthy"
    docker compose "${COMPOSE_FILES[@]}" ps "$SERVICE_NAME"
    exit 0
  fi
  if [[ "$state" == "running" && -z "$health" ]]; then
    echo "Service $SERVICE_NAME is running (no healthcheck configured)"
    docker compose "${COMPOSE_FILES[@]}" ps "$SERVICE_NAME"
    exit 0
  fi
  if [[ "$state" == "exited" || "$state" == "dead" ]]; then
    echo "ERROR: $SERVICE_NAME entered state: $state" >&2
    break
  fi
  sleep 5
done

echo "ERROR: $SERVICE_NAME did not become healthy within 120s" >&2
docker compose "${COMPOSE_FILES[@]}" ps "$SERVICE_NAME" || true
docker compose "${COMPOSE_FILES[@]}" logs --tail=50 "$SERVICE_NAME" || true
exit 1
