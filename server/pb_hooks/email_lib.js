// Shared by email.pb.js. SavvyMe's mailing list lives in Onyx's email block (onyx repo, core/lib/email.mjs): Onyx keeps
// the list, sends the confirmation, newsletters and automations under SavvyMe's name, counts opens and clicks, and runs
// the unsubscribe page. This file is SavvyMe's server talking to it with SavvyMe's Onyx client secret (onyx_lib.js).
const O = require(`${__hooks}/onyx_lib.js`);
const LIST = "news";   // the list in Onyx's core/deploy/clients.json ("SavvyMe tips and news")

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function b64(s) {  // ASCII only (the client id and secret are)
  let out = "";
  for (let i = 0; i < s.length; i += 3) {
    const a = s.charCodeAt(i), b = s.charCodeAt(i + 1), c = s.charCodeAt(i + 2);
    const n = (a << 16) | ((b || 0) << 8) | (c || 0);
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63] + (i + 1 < s.length ? B64[(n >> 6) & 63] : "=") + (i + 2 < s.length ? B64[n & 63] : "=");
  }
  return out;
}
const secret = () => $os.getenv("ONYX_CLIENT_SECRET") || "";
const core = () => ($os.getenv("ONYX_CORE_URL") || "http://127.0.0.1:8200").replace(/\/$/, "");

/** One call to Onyx's /v1/email API: { status, body }. */
function onyx(method, path, body) {
  const r = $http.send({ url: core() + path, method, timeout: 20,
    headers: { "content-type": "application/json", authorization: "Basic " + b64(O.CLIENT + ":" + secret()) },
    body: body === undefined ? "" : JSON.stringify(body) });
  return { status: r.statusCode, body: r.json || {} };
}

/** What a learner sees on the Me tab: whether email is on, and their own status on the list. */
function mine(rec) {
  if (!O.on()) return { on: false };
  const all = onyx("GET", "/v1/email");
  if (all.status !== 200 || !all.body.on) return { on: false };
  const r = onyx("GET", "/v1/email/people?list=" + LIST + "&email=" + encodeURIComponent(rec.email()));
  const p = r.status === 200 ? r.body.person : null;
  return { on: true, status: p ? p.status : "none" };
}

/** The learner's own choice from the Me tab. A verified email (signed in through Onyx) joins at once; others confirm by email. */
function choose(rec, join) {
  if (join) {
    const tags = [rec.get("course") ? "course " + rec.get("course") : "", "plan " + (rec.get("plan") || "free")].filter(Boolean);
    return onyx("POST", "/v1/email/people", { list: LIST, email: rec.email(), name: String(rec.get("name") || ""), user_id: rec.get("onyx_id") || undefined,
      verified: !!rec.verified(), tags, source: "app" });
  }
  return onyx("POST", "/v1/email/people/unsubscribe", { list: LIST, email: rec.email() });
}

module.exports = { LIST, onyx, mine, choose };
