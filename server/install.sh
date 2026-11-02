#!/usr/bin/env bash
# Puts SavvyMe (a static site) on the shared server, next to the other projects there.
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

NAMES=($SAVVYME_DOMAIN $SPARE)
HOME_N=() START_N=() APP_N=() WWW_N=()
for n in "${NAMES[@]}"; do
  case "$n" in www.*) WWW_N+=("$n"); continue;; esac
  HOME_N+=("$n"); START_N+=("start.$n"); APP_N+=("app.$n")
done
join() { local IFS=,; echo "$*" | sed 's/,/, /g'; }
part() { # $1 = folder for this host's own pages
  cat <<BLOCK
	root * $WEB
	encode zstd gzip
	try_files /$1{path} /$1{path}/index.html {path}
	header /vendor/* Cache-Control "public, max-age=31536000, immutable"
	@html path *.html /
	header @html Cache-Control "no-cache"
	file_server
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
