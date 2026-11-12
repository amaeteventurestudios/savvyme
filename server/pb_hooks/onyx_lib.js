// Shared by onyx.pb.js (PocketBase runs each route in its own context, so the routes load this with require).
// Sign-in through Onyx, the studio's shared accounts: Google, or a 6-digit code by email, on SavvyMe's own screen. When
// Onyx says who the person is, SavvyMe finds their account here (by Onyx id, then by the email they already used) or
// makes one, and hands the app the same { token, record } a password sign-in gives, so the rest of the app is unchanged.
//   ONYX_CLIENT_SECRET  SavvyMe's secret with Onyx (made by Onyx's deploy; server/install.sh puts it in the service)
//   ONYX_CORE_URL       Onyx for server-to-server calls (default http://127.0.0.1:8200, it runs on the same server)
//   ONYX_PUBLIC_URL     Onyx for the browser (default https://accounts.noveniqe.com)
const CLIENT = "savvyme";
const secret = () => $os.getenv("ONYX_CLIENT_SECRET") || "";
const core = () => ($os.getenv("ONYX_CORE_URL") || "http://127.0.0.1:8200").replace(/\/$/, "");
const pub = () => ($os.getenv("ONYX_PUBLIC_URL") || "https://accounts.noveniqe.com").replace(/\/$/, "");
const on = () => secret().length >= 16;

function call(path, body) {
  const r = $http.send({ url: core() + path, method: "POST", timeout: 15,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...body, client_id: CLIENT, client_secret: secret() }) });
  return { status: r.statusCode, body: r.json || {} };
}
function token(fields) {  // the authorization-code exchange takes a form
  const form = Object.entries({ ...fields, client_id: CLIENT, client_secret: secret() })
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v)).join("&");
  const r = $http.send({ url: core() + "/token", method: "POST", timeout: 15,
    headers: { "content-type": "application/x-www-form-urlencoded" }, body: form });
  return { status: r.statusCode, body: r.json || {} };
}

// base64url of the SHA-256 of a string (PKCE), from $security.sha256's hex
function challenge(verifier) {
  const hex = $security.sha256(verifier), A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  const b = []; for (let i = 0; i < hex.length; i += 2) b.push(parseInt(hex.substr(i, 2), 16));
  let out = "";
  for (let i = 0; i < b.length; i += 3) {
    const n = (b[i] << 16) | ((b[i + 1] || 0) << 8) | (b[i + 2] || 0);
    out += A[(n >> 18) & 63] + A[(n >> 12) & 63] + (i + 1 < b.length ? A[(n >> 6) & 63] : "") + (i + 2 < b.length ? A[n & 63] : "");
  }
  return out;
}
const sign = (payload, use, seconds) => $security.createJWT(payload, secret() + ":" + use, seconds);
function check(jwt, use) { try { return $security.parseJWT(String(jwt || ""), secret() + ":" + use); } catch (_) { return null; } }

// The SavvyMe account for an Onyx person: by Onyx id, else by the email they signed up with here, else a new one.
function accountFor(user) {
  const email = String(user.email || "").trim().toLowerCase();
  let rec = null;
  try { rec = $app.findFirstRecordByData("users", "onyx_id", user.id); } catch (_) {}
  if (!rec && email) { try { rec = $app.findAuthRecordByEmail("users", email); } catch (_) {} }
  if (!rec) {
    if (!email) throw new BadRequestError("Your account has no email we can use. Try the email code instead.");
    rec = new Record($app.findCollectionByNameOrId("users"));
    rec.setEmail(email);
    rec.setRandomPassword();
    rec.set("name", String(user.display_name || "").slice(0, 60));
    rec.set("plan", "free");
  }
  if (!rec.get("onyx_id") && !rec.isNew() && !rec.verified()) {
    // An older password account nobody ever proved owns this email: from now on only this person (who just proved it
    // through Onyx) can get in, so a stranger who signed up first with their address can't read their progress.
    rec.setRandomPassword();
  }
  rec.set("onyx_id", user.id);
  if (email && String(rec.email()).toLowerCase() === email) rec.setVerified(true);
  $app.save(rec);
  return rec;
}
function session(rec) {
  return { token: rec.newAuthToken(), record: rec.ignoreEmailVisibility(true).publicExport() };
}
// What a finished step from Onyx turns into for the app
function after(r) {
  if (r.status !== 200) return { status: r.status, body: r.body };
  if (r.body.needs_profile) return { status: 200, body: { needs_profile: true, ticket: r.body.ticket, suggest: (r.body.user && r.body.user.display_name) || "" } };
  return { status: 200, body: session(accountFor(r.body.user)) };
}

module.exports = { CLIENT, on, pub, call, token, challenge, sign, check, accountFor, session, after };
