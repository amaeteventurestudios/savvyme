/// <reference path="../pb_data/types.d.ts" />
// SavvyMe accounts. Each learner is one record in the built-in users collection. Their whole progress travels as one
// JSON blob (`state`, the same shape shared/store.js keeps in the browser), and a few fields are copied out of it so the
// admin page can count and sort without opening every blob. `plan` is billing truth: only a superuser (later Stripe)
// sets it; pb_hooks/plan.pb.js stops learners from changing it.
migrate((app) => {
  const users = app.findCollectionByNameOrId("users");
  const add = f => { if (!users.fields.getByName(f.name)) users.fields.add(new Field(f)); };
  add({ name: "state", type: "json", maxSize: 2000000 });
  add({ name: "quiz", type: "json", maxSize: 20000 });
  add({ name: "course", type: "text", max: 40 });
  add({ name: "plan", type: "select", values: ["free", "trial", "pro", "family"], maxSelect: 1 });
  add({ name: "sparks", type: "number", onlyInt: true, min: 0 });
  add({ name: "streak", type: "number", onlyInt: true, min: 0 });
  add({ name: "lessons", type: "number", onlyInt: true, min: 0 });
  add({ name: "goal", type: "number", onlyInt: true, min: 0, max: 7 });
  add({ name: "last_day", type: "text", max: 10 });
  // learners see and change only themselves, and may delete their own account
  users.listRule = "id = @request.auth.id";
  users.viewRule = "id = @request.auth.id";
  users.updateRule = "id = @request.auth.id";
  users.deleteRule = "id = @request.auth.id";
  users.createRule = "";
  users.passwordAuth.enabled = true;
  app.save(users);

  const s = app.settings();
  s.meta.appName = "SavvyMe";
  s.rateLimits.enabled = true;
  s.trustedProxy.headers = ["X-Forwarded-For"];
  s.trustedProxy.useLeftmostIP = true;
  app.save(s);
}, (app) => {
  const users = app.findCollectionByNameOrId("users");
  for (const n of ["state", "quiz", "course", "plan", "sparks", "streak", "lessons", "goal", "last_day"]) users.fields.removeByName(n);
  app.save(users);
});
