#!/bin/sh
set -e
mkdir -p /opt/palitra-site/certs /opt/palitra-site/data
docker cp palitra-bot:/app/certs/russian-trusted-ca.pem /opt/palitra-site/certs/russian-trusted-ca.pem
TOKEN=$(docker inspect palitra-bot --format '{{range .Config.Env}}{{println .}}{{end}}' | sed -n 's/^BOT_TOKEN=//p' | head -n1)
CHATS=$(docker inspect palitra-bot --format '{{range .Config.Env}}{{println .}}{{end}}' | sed -n 's/^ADMIN_CHAT_IDS=//p' | head -n1)
docker rm -f palitra-site >/dev/null 2>&1 || true
docker run -d --name palitra-site --restart unless-stopped -p 8088:80 \
  -e RP_DATA=/data \
  -e MAX_BOT_TOKEN="$TOKEN" \
  -e MAX_ADMIN_CHAT_IDS="$CHATS" \
  -e MAX_CA_FILE=/certs/russian-trusted-ca.pem \
  -v /opt/palitra-site/current:/app:ro \
  -v /opt/palitra-site/data:/data \
  -v /opt/palitra-site/certs:/certs:ro \
  python:3.12-alpine python -u /app/server.py
sleep 2
docker ps --filter name=palitra-site --format '{{.Names}} {{.Status}} {{.Ports}}'
docker logs palitra-site --tail 8
