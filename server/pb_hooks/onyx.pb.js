/// <reference path="../pb_data/types.d.ts" />
// Sign-in through Onyx (Google or an email code) for the app's Me tab. The logic is in onyx_lib.js.
//   GET  /api/onyx/config                    { on }
//   POST /api/onyx/email-start   { email }    Onyx emails a 6-digit code, under SavvyMe's name
//   POST /api/onyx/email-verify  { email, code } -> { token, record } or { needs_profile, ticket }
//   POST /api/onyx/profile       { ticket, name, handle } -> { token, record }
//   GET  /api/onyx/google?back=/app/          to Google through Onyx and back to /api/onyx/return
//   GET  /api/onyx/return                     -> /app/#signin=<claim> (or #profile=<ticket>)
//   POST /api/onyx/claim         { t }        -> { token, record } (the claim lasts two minutes)

routerAdd("GET", "/api/onyx/config", (e) => {
  const O = require(`${__hooks}/onyx_lib.js`);
  return e.json(200, { on: O.on() });
});

routerAdd("POST", "/api/onyx/email-start", (e) => {
  const O = require(`${__hooks}/onyx_lib.js`);
  if (!O.on()) return e.json(503, { message: "Sign-in isn't switched on yet." });
  const b = e.requestInfo().body || {};
  const r = O.call("/v1/signin/email/start", { email: String(b.email || ""), ip: e.realIP() });
  return e.json(r.status, r.body);
});

routerAdd("POST", "/api/onyx/email-verify", (e) => {
  const O = require(`${__hooks}/onyx_lib.js`);
  if (!O.on()) return e.json(503, { message: "Sign-in isn't switched on yet." });
  const b = e.requestInfo().body || {};
  const r = O.after(O.call("/v1/signin/email/verify", { email: String(b.email || ""), code: String(b.code || ""), ip: e.realIP() }));
  return e.json(r.status, r.body);
});

routerAdd("POST", "/api/onyx/profile", (e) => {
  const O = require(`${__hooks}/onyx_lib.js`);
  if (!O.on()) return e.json(503, { message: "Sign-in isn't switched on yet." });
  const b = e.requestInfo().body || {};
  const r = O.after(O.call("/v1/signin/profile", { ticket: String(b.ticket || ""), display_name: String(b.name || ""), handle: String(b.handle || "") }));
  return e.json(r.status, r.body);
});

routerAdd("GET", "/api/onyx/google", (e) => {
  const O = require(`${__hooks}/onyx_lib.js`);
  if (!O.on()) return e.redirect(303, "/app/#signin=off");
  let back = String(e.request.url.query().get("back") || "/app/");
  if (!/^\/(?!\/)[A-Za-z0-9\/_.-]{0,100}$/.test(back)) back = "/app/";
  const verifier = $security.randomString(64), state = $security.randomString(20);
  const ret = `https://${e.request.host}/api/onyx/return`;
  e.setCookie(new Cookie({ name: "sm_onyx", value: O.sign({ v: verifier, s: state, b: back, r: ret }, "flow", 900),
    path: "/api/onyx/", httpOnly: true, secure: true, sameSite: 2, maxAge: 900 }));
  const q = { response_type: "code", client_id: O.CLIENT, redirect_uri: ret, state, via: "google",
    code_challenge: O.challenge(verifier), code_challenge_method: "S256" };
  return e.redirect(303, O.pub() + "/authorize?" + Object.entries(q).map(([k, v]) => k + "=" + encodeURIComponent(v)).join("&"));
});

routerAdd("GET", "/api/onyx/return", (e) => {
  const O = require(`${__hooks}/onyx_lib.js`);
  let raw = ""; try { raw = e.request.cookie("sm_onyx").value; } catch (_) {}
  const f = O.check(raw, "flow");
  e.setCookie(new Cookie({ name: "sm_onyx", value: "", path: "/api/onyx/", httpOnly: true, secure: true, maxAge: -1 }));
  const back = (f && f.b) || "/app/", q = e.request.url.query();
  if (!f || q.get("state") !== f.s || !q.get("code")) return e.redirect(303, back + "#signin=failed");
  const r = O.token({ grant_type: "authorization_code", code: q.get("code"), redirect_uri: f.r, code_verifier: f.v });
  if (r.status !== 200 || !r.body.user) return e.redirect(303, back + "#signin=failed");
  if (r.body.needs_profile) return e.redirect(303, back + "#profile=" + encodeURIComponent(r.body.ticket));
  const rec = O.accountFor(r.body.user);
  return e.redirect(303, back + "#signin=" + encodeURIComponent(O.sign({ u: rec.id }, "claim", 120)));
});

routerAdd("POST", "/api/onyx/claim", (e) => {
  const O = require(`${__hooks}/onyx_lib.js`);
  const c = O.check((e.requestInfo().body || {}).t, "claim");
  if (!c || !c.u) return e.json(400, { message: "That sign-in link has run out. Please try again." });
  let rec = null; try { rec = $app.findRecordById("users", c.u); } catch (_) {}
  if (!rec) return e.json(404, { message: "That account is gone." });
  return e.json(200, O.session(rec));
});

// Only these routes link an account to an Onyx person; a learner can never set onyx_id themselves.
onRecordCreateRequest((e) => { if (!e.hasSuperuserAuth()) e.record.set("onyx_id", ""); e.next(); }, "users");
onRecordUpdateRequest((e) => { if (!e.hasSuperuserAuth()) e.record.set("onyx_id", e.record.original().get("onyx_id")); e.next(); }, "users");
