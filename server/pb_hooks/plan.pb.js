/// <reference path="../pb_data/types.d.ts" />
// A learner can't make themselves Pro: on sign-up the plan is always "free", and an update from anyone but a superuser
// keeps the plan the record already had. Stripe (later) sets it as a superuser.
onRecordCreateRequest((e) => {
  if (!e.hasSuperuserAuth()) e.record.set("plan", "free");
  e.next();
}, "users");

onRecordUpdateRequest((e) => {
  if (!e.hasSuperuserAuth()) e.record.set("plan", e.record.original().get("plan"));
  e.next();
}, "users");
