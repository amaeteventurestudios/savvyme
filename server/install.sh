#!/usr/bin/env bash
# Puts SavvyMe on the shared server, next to the other projects there: the static site, plus its own PocketBase
# (accounts and saved progress) on 127.0.0.1:8196, reached through the app host at /api and /_/ (the dashboard).
# Run by .github/workflows/deploy.yml with SAVVYME_DOMAIN (the home page's names, main one first) and SPARE (a free
# sslip.io name for the server's IP). The quiz answers on start.<name> and the app on app.<name> for every name.
# Never touches /etc/caddy/Caddyfile or another project's site file.
set -euo pipefail
WEB=/var/www/savvyme
if [ ! -x /usr/local/bin/caddy ] || [ ! -d /etc/caddy/sites ]; then
  echo 'The shared Caddy web server is missing (the Agent Grand Prix deploy installs it).'; exit 1
fi
sudo mkdir -p "$WEB.new"
sudo tar -xzf /tmp/savvyme.tgz -C "$WEB.new"
sudo rm -rf "$WEB.old"; [ -d "$WEB" ] && sudo mv "$WEB" "$WEB.old"; sudo mv "$WEB.new" "$WEB"
sudo chmod -R a+rX "$WEB"; rm -f /tmp/savvyme.tgz

# ---- PocketBase: its own binary, data, user and service (never shared with another project) ----
PBV=0.40.5; OPT=/opt/savvyme; DATA=/var/lib/savvyme-pb
sudo mkdir -p "$OPT" "$DATA"
id savvyme >/dev/null 2>&1 || sudo useradd --system --no-create-home --shell /usr/sbin/nologin savvyme
if [ "$("$OPT/pocketbase" --version 2>/dev/null | awk '{print $3}')" != "$PBV" ]; then
  command -v unzip >/dev/null || sudo apt-get install -y -qq unzip >/dev/null
  case "$(uname -m)" in aarch64|arm64) ARCH=arm64;; *) ARCH=amd64;; esac
  curl -fsSL -o /tmp/savvyme-pb.zip "https://github.com/pocketbase/pocketbase/releases/download/v$PBV/pocketbase_${PBV}_linux_$ARCH.zip"
  sudo rm -rf /tmp/savvyme-pb && mkdir -p /tmp/savvyme-pb && unzip -oq /tmp/savvyme-pb.zip -d /tmp/savvyme-pb && sudo install -m 755 /tmp/savvyme-pb/pocketbase "$OPT/pocketbase"
  rm -rf /tmp/savvyme-pb /tmp/savvyme-pb.zip
fi
# migrations and hooks come from the repo; the site folder never serves them
sudo rm -rf "$OPT/server"; sudo mv "$WEB/server" "$OPT/server"
sudo chown -R savvyme:savvyme "$DATA"
sudo tee /etc/systemd/system/savvyme-pb.service >/dev/null <<UNIT
[Unit]
Description=SavvyMe accounts (PocketBase)
After=network.target
[Service]
User=savvyme
ExecStart=$OPT/pocketbase serve --http 127.0.0.1:8196 --dir $DATA --migrationsDir $OPT/server/pb_migrations --hooksDir $OPT/server/pb_hooks
Restart=always
RestartSec=3
LimitNOFILE=4096
[Install]
WantedBy=multi-user.target
UNIT
sudo systemctl daemon-reload
sudo systemctl stop savvyme-pb 2>/dev/null || true
sudo -u savvyme "$OPT/pocketbase" migrate up --dir "$DATA" --migrationsDir "$OPT/server/pb_migrations" >/dev/null
# the admin sign-in (the same email and password open /admin/ and the PocketBase dashboard), when the secrets are set
if [ -n "${PB_ADMIN_EMAIL:-}" ] && [ -n "${PB_ADMIN_PASSWORD:-}" ]; then
  sudo -u savvyme "$OPT/pocketbase" superuser upsert "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD" --dir "$DATA" >/dev/null && echo 'Admin sign-in set.'
fi
sudo systemctl enable savvyme-pb >/dev/null 2>&1; sudo systemctl restart savvyme-pb
# a nightly copy of the data (kept 14 days), made with SQLite's online backup so it is consistent
sudo tee /etc/cron.d/savvyme-backup >/dev/null <<CRON
17 3 * * * root mkdir -p /var/backups/savvyme && sqlite3 $DATA/data.db ".backup '/var/backups/savvyme/data-\$(date +\%F).db'" 2>/dev/null; find /var/backups/savvyme -name 'data-*.db' -mtime +14 -delete
CRON
command -v sqlite3 >/dev/null || sudo apt-get install -y -qq sqlite3 >/dev/null 2>&1 || true

NAMES=($SAVVYME_DOMAIN $SPARE)
HOME_N=() START_N=() APP_N=() WWW_N=()
for n in "${NAMES[@]}"; do
  case "$n" in www.*) WWW_N+=("$n"); continue;; esac
  HOME_N+=("$n"); START_N+=("start.$n"); APP_N+=("app.$n")
done
join() { local IFS=,; echo "$*" | sed 's/,/, /g'; }
part() { # $1 = folder for this host's own pages
  cat <<BLOCK
	encode zstd gzip
	header /vendor/* Cache-Control "public, max-age=31536000, immutable"
	@html path *.html /
	header @html Cache-Control "no-cache"
BLOCK
  if [ "$1" = app ]; then cat <<BLOCK
	handle /api/* {
		reverse_proxy 127.0.0.1:8196
	}
	handle /_/* {
		reverse_proxy 127.0.0.1:8196
	}
BLOCK
  fi
  cat <<BLOCK
	handle {
		root * $WEB
		try_files /$1{path} /$1{path}/index.html {path}
		file_server
	}
BLOCK
}
{
  echo "$(join "${HOME_N[@]}") {"
  echo "	root * $WEB"; echo "	encode zstd gzip"; echo '	header /vendor/* Cache-Control "public, max-age=31536000, immutable"'; echo "	file_server"; echo "}"
  echo "$(join "${START_N[@]}") {"; part start; echo "}"
  echo "$(join "${APP_N[@]}") {"; part app; echo "}"
  if [ ${#WWW_N[@]} -gt 0 ]; then echo "$(join "${WWW_N[@]}") {"; echo "	redir https://${HOME_N[0]}{uri} permanent"; echo "}"; fi
} | sudo tee /etc/caddy/sites/savvyme.caddy >/dev/null
if ! sudo /usr/local/bin/caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null; then
  sudo rm -f /etc/caddy/sites/savvyme.caddy; echo 'The SavvyMe site file did not validate, so it was taken out again. The other sites are untouched.'; exit 1
fi
sudo systemctl reload caddy
echo "SavvyMe is up: $(printf 'https://%s ' "${HOME_N[@]}")"
