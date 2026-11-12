// SavvyMe admin, Email tab: the "SavvyMe tips and news" list, newsletters and automations. Everything is kept and sent by
// Onyx's email block; this page talks to it through SavvyMe's server (/api/email/admin/*, superusers only). Nothing is
// sent to anyone until Onyx has email switched on for SavvyMe.
const LIST = 'news';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const pct = (n, of) => (of ? Math.round(n / of * 100) + '%' : '–');
const when = s => (s ? new Date(String(s).replace(' ', 'T')).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : '');
const HELP = '# Heading · ## Smaller heading · **bold** · [link text](https://...) · - list item · > quote · --- line · [[Button text](https://...)] · {name|friend}';
const STARTER = '# This week on SavvyMe\n\nHi {name|friend},\n\nHere is something worth five minutes today.\n\n[[Open SavvyMe](https://savvyme.amaete.com/app/)]\n\nSee you tomorrow.';

export function emailTab(view, call) {
  const api = (path, opt) => call('/api/email/admin/' + path, opt);
  const post = (path, body) => api(path, { method: 'POST', body: JSON.stringify(body) });
  const $ = s => view.querySelector(s);
  let O = null;

  async function home(msg = '') {
    view.innerHTML = '<p class="muted">Loading…</p>';
    try { O = await api(''); } catch (e) { view.innerHTML = `<div class="card panel"><h2>Email</h2><p class="err">${esc(e.message)}</p></div>`; return; }
    const L = O.lists.find(l => l.id === LIST) || { active: 0, pending: 0, unsubscribed: 0, tags: [] };
    view.innerHTML = `${msg ? `<p class="ok">${esc(msg)}</p>` : ''}
      ${O.on ? '' : '<div class="card panel note"><b>Email is switched off.</b> You can write and preview, but nothing is sent to anyone until it is switched on in Onyx.</div>'}
      <div class="kpis">
        <div class="card kpi"><span>On the list</span><b>${L.active}</b><small>${esc(L.name || 'SavvyMe tips and news')}</small></div>
        <div class="card kpi"><span>Waiting to confirm</span><b>${L.pending}</b><small>sent a confirmation link</small></div>
        <div class="card kpi"><span>Unsubscribed</span><b>${L.unsubscribed}</b><small>never emailed again</small></div>
        <div class="card kpi"><span>Sent this month</span><b>${O.month.used}</b><small>of ${O.month.limit}</small></div>
      </div>
      <div class="card panel tbl"><div class="row"><h2>Newsletters</h2><button class="btn primary sm" id="newsend">New newsletter</button></div>
        <table><thead><tr><th>Subject</th><th>Status</th><th>Sent to</th><th>Opened</th><th>Clicked</th><th>When</th></tr></thead><tbody>
        ${O.sends.map(s => `<tr class="go" data-send="${s.id}"><td>${esc(s.subject || '(no subject)')}</td><td><span class="pl">${esc(s.status)}</span></td><td>${s.recipients || ''}</td>
          <td>${s.status === 'sent' ? pct(s.opens, s.delivered) : ''}</td><td>${s.status === 'sent' ? pct(s.clicks, s.delivered) : ''}</td><td>${esc(when(s.sent_at || s.scheduled_for || s.updated))}</td></tr>`).join('')
          || '<tr><td colspan="6" class="muted">No newsletters yet.</td></tr>'}</tbody></table></div>
      <div class="card panel tbl"><div class="row"><h2>Automations</h2><button class="btn ghost sm" id="newauto">New automation</button></div>
        <table><thead><tr><th>Name</th><th>Starts when</th><th>Live</th><th>Started</th><th>Emails sent</th><th>Opened</th><th>Clicked</th></tr></thead><tbody>
        ${O.autos.map(a => `<tr class="go" data-auto="${a.id}"><td>${esc(a.name)}</td><td>${trig(a)}</td><td>${a.active ? 'yes' : 'no'}</td><td>${a.enrolled}</td><td>${a.sent}</td><td>${pct(a.opens, a.sent)}</td><td>${pct(a.clicks, a.sent)}</td></tr>`).join('')
          || '<tr><td colspan="7" class="muted">None yet. A welcome email for people who join is a good first one.</td></tr>'}</tbody></table></div>
      <div class="card panel"><div class="row"><h2>Tags</h2><button class="btn ghost sm" id="csv">Download the list (CSV)</button></div>
        <p class="muted">${L.tags.length ? L.tags.map(t => `${esc(t.tag)} (${t.count})`).join(' · ') : 'People get a tag for their course and plan when they join from the app.'}</p></div>`;
    $('#newsend').onclick = () => editSend(null);
    $('#newauto').onclick = () => editAuto(null);
    $('#csv').onclick = csv;
    view.querySelectorAll('[data-send]').forEach(r => (r.onclick = () => editSend(r.dataset.send)));
    view.querySelectorAll('[data-auto]').forEach(r => (r.onclick = () => editAuto(r.dataset.auto)));
  }
  const trig = a => a.trigger === 'join' ? 'Someone joins' : a.trigger === 'tag' ? `Tagged “${esc(a.value)}”` : `Event “${esc(a.value)}”`;

  async function csv() {
    const rows = [['email', 'name', 'status', 'tags', 'joined', 'source']];
    for (let page = 1; page < 1000; page++) {
      const r = await api(`people?list=${LIST}&page=${page}`);
      for (const p of r.people) rows.push([p.email, p.name, p.status, p.tags.join(' | '), p.joined, p.source]);
      if (!r.more) break;
    }
    const text = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' })); a.download = 'savvyme-email-list.csv'; a.click();
  }

  // ---- a newsletter ----
  async function editSend(id) {
    let s = { subject: '', preheader: '', body: STARTER, audience: { tags: [], exclude: [], match: 'any' }, status: 'draft' }, info = null;
    if (id) { info = await api('sends/' + id); s = info.send; }
    const locked = !['draft', 'scheduled'].includes(s.status);
    view.innerHTML = `<button class="link" id="back">← Email</button>
      <div class="ed"><form class="card panel form" id="f">
        <h2>${locked ? 'Newsletter' : id ? 'Edit newsletter' : 'New newsletter'} <span class="pl">${esc(s.status)}</span></h2>
        ${locked ? `<div class="kpis small"><div class="kpi"><span>Sent to</span><b>${s.delivered}</b></div><div class="kpi"><span>Opened</span><b>${pct(s.opens, s.delivered)}</b><small>${s.opens} people</small></div>
          <div class="kpi"><span>Clicked</span><b>${pct(s.clicks, s.delivered)}</b><small>${s.clicks} people</small></div></div>
          ${info.links.length ? `<h3>Most clicked links</h3><ul class="plain">${info.links.map(l => `<li>${l.people} · ${esc(l.url)}</li>`).join('')}</ul>` : ''}` : ''}
        <label>Subject<input name="subject" maxlength="150" required value="${esc(s.subject)}" ${locked ? 'disabled' : ''}></label>
        <label>Preview line <small class="muted">(shown after the subject in the inbox)</small><input name="preheader" maxlength="150" value="${esc(s.preheader)}" ${locked ? 'disabled' : ''}></label>
        <label>Email<textarea name="body" rows="14" ${locked ? 'disabled' : ''}>${esc(s.body)}</textarea><small class="muted">${esc(HELP)}</small></label>
        <label>Only people tagged <small class="muted">(comma separated; empty means everyone on the list)</small><input name="tags" value="${esc(s.audience.tags.join(', '))}" ${locked ? 'disabled' : ''}></label>
        <label>Leave out people tagged<input name="exclude" value="${esc(s.audience.exclude.join(', '))}" ${locked ? 'disabled' : ''}></label>
        ${id && !locked ? `<p class="muted" id="count">${info.audience_count} people match.</p>` : ''}
        <div class="err" id="err"></div><div class="ok" id="ok"></div>
        ${locked ? '' : `<div class="acts"><button class="btn ghost" data-do="save">Save draft</button>${id ? '<button type="button" class="btn ghost" data-do="del">Delete</button>' : ''}</div>
        ${id ? `<div class="acts"><input name="to" type="email" placeholder="Send a test to (your email)"><button class="btn ghost" data-do="test">Send test</button></div>
        <div class="acts"><input name="when" type="datetime-local"><button class="btn ghost" data-do="schedule">Schedule</button>${s.status === 'scheduled' ? '<button class="btn ghost" data-do="unschedule">Cancel schedule</button>' : ''}</div>
        <div class="acts"><button class="btn primary" data-do="send">Send now</button></div>` : '<p class="muted">Save the draft to test, schedule or send it.</p>'}`}
      </form><div class="card prev"><iframe id="pv" title="Preview" sandbox=""></iframe></div></div>`;
    $('#back').onclick = () => home();
    const f = $('#f');
    const data = () => { const d = new FormData(f); const split = k => String(d.get(k) || '').split(',').map(x => x.trim()).filter(Boolean);
      return { id, list: LIST, subject: d.get('subject') ?? s.subject, preheader: d.get('preheader') ?? s.preheader, body: d.get('body') ?? s.body, audience: { tags: split('tags'), exclude: split('exclude'), match: 'any' } }; };
    let t; const preview = async () => { const r = await post('preview', { ...data(), name: 'Ada' }).catch(() => null); if (r) $('#pv').srcdoc = r.html; };
    f.oninput = () => { clearTimeout(t); t = setTimeout(preview, 400); };
    preview();
    f.onsubmit = async ev => {
      ev.preventDefault();
      const act = ev.submitter?.dataset.do || 'save'; $('#err').textContent = ''; $('#ok').textContent = '';
      try {
        const saved = (await post('sends', data())).send;
        if (act === 'save') { if (!id) return editSend(saved.id); $('#ok').textContent = 'Saved.'; return; }
        if (act === 'test') { const to = new FormData(f).get('to'); await post(`sends/${saved.id}/test`, { to, name: 'Ada' }); $('#ok').textContent = `Test sent to ${to}.`; return; }
        if (act === 'unschedule') { await post(`sends/${saved.id}/unschedule`, {}); return editSend(saved.id); }
        if (act === 'schedule') { const w = new FormData(f).get('when'); if (!w) throw new Error('Pick a date and time.'); await post(`sends/${saved.id}/send`, { when: new Date(w).toISOString() }); return home('Scheduled.'); }
        if (act === 'send') { const n = (await api('sends/' + saved.id)).audience_count; if (!confirm(`Send “${saved.subject}” to ${n} people now? This can't be undone.`)) return; await post(`sends/${saved.id}/send`, {}); return home('Sending now. The numbers fill in as it goes.'); }
      } catch (e) { $('#err').textContent = e.message; }
    };
    const del = view.querySelector('[data-do="del"]');
    if (del) del.onclick = async () => { if (confirm('Delete this draft?')) { await api('sends/' + id, { method: 'DELETE' }); home('Deleted.'); } };
  }

  // ---- an automation ----
  async function editAuto(id) {
    let a = { name: 'Welcome', trigger: 'join', value: '', active: false, steps: [{ delay: 0, unit: 'minutes', subject: 'Welcome to SavvyMe tips, {name|friend}', body: STARTER }] }, stats = [];
    if (id) { const r = await api('autos/' + id); a = r.auto; stats = r.steps; }
    const step = (s, i) => `<fieldset class="step" data-i="${i}"><legend>Email ${i + 1}${stats[i] ? ` <small class="muted">sent ${stats[i].sent} · waiting ${stats[i].waiting} · opened ${stats[i].opens} · clicked ${stats[i].clicks}</small>` : ''}</legend>
      <div class="acts"><span>${i ? 'Wait' : 'Send after'}</span><input name="delay" type="number" min="0" max="365" value="${s.delay}" style="width:90px"><select name="unit">${['minutes', 'hours', 'days'].map(u => `<option${u === s.unit ? ' selected' : ''}>${u}</option>`).join('')}</select>
        <button type="button" class="link" data-rm="${i}">Remove</button></div>
      <label>Subject<input name="subject" maxlength="150" value="${esc(s.subject)}"></label>
      <label>Email<textarea name="body" rows="8">${esc(s.body)}</textarea></label></fieldset>`;
    const draw = () => {
      view.innerHTML = `<button class="link" id="back">← Email</button><form class="card panel form" id="f">
        <h2>${id ? 'Automation' : 'New automation'}</h2>
        <label>Name<input name="name" maxlength="80" value="${esc(a.name)}"></label>
        <label>Starts when<select name="trigger"><option value="join"${a.trigger === 'join' ? ' selected' : ''}>Someone joins the list</option>
          <option value="tag"${a.trigger === 'tag' ? ' selected' : ''}>Someone gets a tag</option><option value="event"${a.trigger === 'event' ? ' selected' : ''}>The app sends an event</option></select></label>
        <label id="val"${a.trigger === 'join' ? ' hidden' : ''}>Tag or event name<input name="value" value="${esc(a.value)}"></label>
        ${a.steps.map(step).join('')}
        <button type="button" class="btn ghost sm" id="add"${a.steps.length >= 10 ? ' disabled' : ''}>Add an email</button>
        <label class="chk"><input type="checkbox" name="active"${a.active ? ' checked' : ''}> Live: start it for people from now on</label>
        <small class="muted">${esc(HELP)}</small>
        <div class="err" id="err"></div><div class="ok" id="ok"></div>
        <div class="acts"><button class="btn primary">Save</button>${id ? '<button type="button" class="btn ghost" id="del">Delete</button>' : ''}</div></form>`;
      $('#back').onclick = () => home();
      $('#f [name=trigger]').onchange = e => { read(); a.trigger = e.target.value; draw(); };
      $('#add').onclick = () => { read(); a.steps.push({ delay: 1, unit: 'days', subject: '', body: '' }); draw(); };
      view.querySelectorAll('[data-rm]').forEach(b => (b.onclick = () => { read(); a.steps.splice(+b.dataset.rm, 1); draw(); }));
      $('#f').onsubmit = async ev => {
        ev.preventDefault(); read(); $('#err').textContent = '';
        try { const r = await post('autos', { id, list: LIST, ...a }); if (!id) return editAuto(r.auto.id); $('#ok').textContent = 'Saved.'; }
        catch (e) { $('#err').textContent = e.message; }
      };
      if (id) $('#del').onclick = async () => { if (confirm('Delete this automation? People part way through it get no more of its emails.')) { await api('autos/' + id, { method: 'DELETE' }); home('Deleted.'); } };
    };
    const read = () => {
      const f = $('#f'); const d = new FormData(f);
      a.name = d.get('name'); a.trigger = d.get('trigger'); a.value = d.get('value') || ''; a.active = !!d.get('active');
      a.steps = [...f.querySelectorAll('.step')].map(fs => ({ delay: +fs.querySelector('[name=delay]').value || 0, unit: fs.querySelector('[name=unit]').value,
        subject: fs.querySelector('[name=subject]').value, body: fs.querySelector('[name=body]').value }));
    };
    draw();
  }

  home();
}
