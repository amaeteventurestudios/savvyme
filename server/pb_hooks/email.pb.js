/// <reference path="../pb_data/types.d.ts" />
// Email through Onyx (the logic is in email_lib.js).
// Learners, signed in:
//   GET  /api/email/me                  { on, status: none | pending | active | unsubscribed }
//   POST /api/email/me   { join }       join or leave "SavvyMe tips and news"
// The owner, signed in as a PocketBase superuser (the admin page's Email tab):
//   GET|POST|DELETE /api/email/admin/<rest>   passed to Onyx's /v1/email/<rest> with SavvyMe's secret

routerAdd("GET", "/api/email/me", (e) => {
  const E = require(`${__hooks}/email_lib.js`);
  return e.json(200, E.mine(e.auth));
}, $apis.requireAuth("users"));

routerAdd("POST", "/api/email/me", (e) => {
  const E = require(`${__hooks}/email_lib.js`);
  const b = e.requestInfo().body || {};
  const r = E.choose(e.auth, !!b.join);
  if (r.status >= 400) return e.json(r.status, { message: (r.body.error && r.body.error.message) || "Email isn't open yet." });
  const p = r.body.person;
  return e.json(200, { on: true, status: p ? p.status : "none", confirm_sent: !!r.body.confirm_sent });
}, $apis.requireAuth("users"));

function pass(e) {
  const E = require(`${__hooks}/email_lib.js`);
  const rest = String(e.request.pathValue("rest") || "");
  if (!/^[a-z0-9\/]{0,80}$/.test(rest)) return e.json(400, { message: "Bad path" });
  const raw = e.request.url.rawQuery;
  const path = "/v1/email" + (rest ? "/" + rest : "") + (raw ? "?" + raw : "");
  const method = e.request.method;
  const r = E.onyx(method, path, method === "GET" ? undefined : (e.requestInfo().body || {}));
  return e.json(r.status || 502, r.body);
}
routerAdd("GET", "/api/email/admin/{rest...}", pass, $apis.requireSuperuserAuth());
routerAdd("POST", "/api/email/admin/{rest...}", pass, $apis.requireSuperuserAuth());
routerAdd("DELETE", "/api/email/admin/{rest...}", pass, $apis.requireSuperuserAuth());
