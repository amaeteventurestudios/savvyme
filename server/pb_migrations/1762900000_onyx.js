/// <reference path="../pb_data/types.d.ts" />
// Sign-in through Onyx: each SavvyMe account remembers the Onyx person it belongs to (pb_hooks/onyx_lib.js), so the same
// person lands on the same account whichever way they sign in. Password accounts made before keep working.
migrate((app) => {
  const users = app.findCollectionByNameOrId("users");
  if (!users.fields.getByName("onyx_id")) users.fields.add(new Field({ name: "onyx_id", type: "text", max: 40, hidden: true }));
  users.addIndex("idx_users_onyx_id", true, "onyx_id", "onyx_id != ''");
  app.save(users);
}, (app) => {
  const users = app.findCollectionByNameOrId("users");
  users.removeIndex("idx_users_onyx_id");
  users.fields.removeByName("onyx_id");
  app.save(users);
});
