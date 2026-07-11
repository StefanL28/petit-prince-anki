/* ============================================================
   Le Petit Prince — Anki clone
   Vanilla JS · SM-2-style scheduling · GitHub Gist sync
   ============================================================ */

"use strict";

const APP_VERSION = "3";
const MIN = 60000, DAY = 86400000;
const GIST_FILE = "petit-prince-anki-sync.json";
const STATE_KEY = "ppa.state";
const DEVICE_KEY = "ppa.device";

// pastel rotation for decks: [tint, accent, dark]
const PALETTE = [
  ["#FBE4E3", "#F2A5A0", "#B4645F"],
  ["#E3F2EA", "#A8D8C5", "#4C8067"],
  ["#FBF1DC", "#F5D68B", "#8C712F"],
  ["#E4EBF7", "#A9C6EC", "#4A659C"],
];
const deckColors = deck => PALETTE[(deck.n - 1) % PALETTE.length];

const $ = sel => document.querySelector(sel);
const esc = s => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const dayKey = ts => {
  const d = new Date(ts);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};

// ---------- persistent state ----------------------------------

// synced across devices (lives in localStorage + the gist)
let state = {
  settings: { name: "Stefan", dailyGoal: 20, newPerDay: 10, dir: "fr", su: 0 },
  cards: {},     // id -> {st,step,iv,ef,due,reps,lapses,relearn,u, note,nu}
  reviews: [],   // [ts, cardId, grade 0..3]
};
// per-device only (never synced)
let device = { token: "", gistId: "", lastSync: 0 };

function loadAll() {
  try { const s = JSON.parse(localStorage.getItem(STATE_KEY)); if (s && s.cards) state = { ...state, ...s, settings: { ...state.settings, ...s.settings } }; } catch (e) {}
  try { const d = JSON.parse(localStorage.getItem(DEVICE_KEY)); if (d) device = { ...device, ...d }; } catch (e) {}
}
function saveState() { localStorage.setItem(STATE_KEY, JSON.stringify(state)); }
function saveDevice() { localStorage.setItem(DEVICE_KEY, JSON.stringify(device)); }

const allCards = (() => {
  let cache = null;
  return () => {
    if (!cache) {
      cache = new Map();
      for (const deck of LPP_DECKS) for (const c of deck.cards) cache.set(c.id, { ...c, deck });
    }
    return cache;
  };
})();

// Study direction is a global switch (Home screen): FR→EN or EN→FR.
// Same card, same schedule — only which side is shown first changes.
// (baseId tolerates legacy ":r" ids from the old reverse experiment.)
const isRev = id => id.endsWith(":r");
const baseId = id => (isRev(id) ? id.slice(0, -2) : id);
function getStudyCard(id) {
  const b = allCards().get(baseId(id));
  if (!b) return null;
  const rev = state.settings.dir === "en";
  return rev
    ? { ...b, front: b.en, back: b.fr, rev: true }
    : { ...b, front: b.fr, back: b.en, rev: false };
}

// ---------- scheduler (simplified SM-2 / Anki-style) ----------

// grades: 0 Again · 1 Hard · 2 Good · 3 Easy
function schedule(rec, g, now) {
  const r = rec ? { ...rec } : {};
  if (!r.st) { r.st = "learn"; r.step = 0; r.iv = 0; r.ef = 2.5; r.reps = 0; r.lapses = 0; }
  r.reps = (r.reps || 0) + 1;
  r.ef = r.ef || 2.5;

  if (r.st === "learn") {
    if (g === 0) { r.step = 0; r.due = now + 1 * MIN; }
    else if (g === 1) { r.due = now + 5 * MIN; }
    else if (g === 2) {
      if (!r.relearn && (r.step || 0) === 0) { r.step = 1; r.due = now + 10 * MIN; }
      else { r.st = "review"; r.iv = r.relearn ? Math.max(1, r.iv) : 1; r.relearn = false; r.due = now + r.iv * DAY; }
    } else {
      r.st = "review"; r.iv = r.relearn ? Math.max(1, Math.round(r.iv * 1.5)) : 4; r.relearn = false; r.due = now + r.iv * DAY;
    }
  } else { // review
    if (g === 0) {
      r.lapses = (r.lapses || 0) + 1;
      r.ef = Math.max(1.3, r.ef - 0.2);
      r.st = "learn"; r.relearn = true; r.step = 1;
      r.iv = Math.max(1, Math.round(r.iv * 0.5));
      r.due = now + 10 * MIN;
    } else if (g === 1) { r.ef = Math.max(1.3, r.ef - 0.15); r.iv = Math.max(r.iv + 1, Math.round(r.iv * 1.2)); r.due = now + r.iv * DAY; }
    else if (g === 2) { r.iv = Math.max(r.iv + 1, Math.round(r.iv * r.ef)); r.due = now + r.iv * DAY; }
    else { r.ef = Math.min(2.8, r.ef + 0.15); r.iv = Math.max(r.iv + 2, Math.round(r.iv * r.ef * 1.3)); r.due = now + r.iv * DAY; }
  }
  r.u = now;
  return r;
}

function intervalLabel(rec, g, now) {
  const r = schedule(rec, g, now);
  const ms = r.due - now;
  if (ms < 55 * MIN) return "<" + Math.max(1, Math.round(ms / MIN)) + "m";
  if (ms < DAY) return "<1d";
  const d = Math.round(ms / DAY);
  if (d < 31) return d + "d";
  const mo = d / 30.4;
  return (mo < 10 ? mo.toFixed(1).replace(/\.0$/, "") : Math.round(mo)) + "mo";
}

// ---------- derived stats --------------------------------------

function firstSeenMap() {
  const m = new Map();
  for (const [ts, id] of state.reviews) if (!m.has(id) || ts < m.get(id)) m.set(id, ts);
  return m;
}
function newIntroducedToday(now) {
  const today = dayKey(now);
  let n = 0;
  for (const ts of firstSeenMap().values()) if (dayKey(ts) === today) n++;
  return n;
}
function reviewsOn(day) { return state.reviews.filter(r => dayKey(r[0]) === day).length; }
function streak(now) {
  let s = 0, t = now;
  if (reviewsOn(dayKey(t)) > 0) { s = 1; t -= DAY; }
  else t -= DAY; // today not studied yet: streak continues from yesterday
  while (reviewsOn(dayKey(t)) > 0) { s++; t -= DAY; }
  return s;
}
function retention30(now) {
  const cut = now - 30 * DAY;
  const recent = state.reviews.filter(r => r[0] >= cut);
  if (!recent.length) return null;
  return Math.round(100 * recent.filter(r => r[2] > 0).length / recent.length);
}
function deckCounts(deck, now) {
  let due = 0, fresh = 0, learned = 0;
  for (const c of deck.cards) {
    const rec = state.cards[c.id];
    if (!rec || !rec.st) fresh++;
    else {
      if (rec.due <= now) due++;
      if (rec.st === "review") learned++;
    }
  }
  return { due, fresh, learned, total: deck.cards.length };
}

// ---------- study session --------------------------------------

let session = null;

function buildSession(deckN) {
  const now = Date.now();
  const scope = deckN ? LPP_DECKS.filter(d => d.n === deckN) : LPP_DECKS;
  const due = [], fresh = [];
  let newBudget = Math.max(0, (state.settings.newPerDay || 0) - newIntroducedToday(now));
  for (const deck of scope) {
    for (const c of deck.cards) {
      const rec = state.cards[c.id];
      if (rec && rec.st) { if (rec.due <= now) due.push(c.id); }
      else fresh.push(c.id);
    }
  }
  due.sort((a, b) => state.cards[a].due - state.cards[b].due);
  const queue = due.concat(fresh.slice(0, newBudget));
  session = {
    deckN, queue, later: [], done: 0,
    counts: { again: 0, hard: 0, good: 0, easy: 0 },
    flipped: false, busy: false,
  };
  return queue.length > 0;
}

function currentCardId() {
  if (!session) return null;
  if (session.queue.length) return session.queue[0];
  if (session.later.length) {
    session.later.sort((a, b) => state.cards[a].due - state.cards[b].due);
    session.queue.push(session.later.shift());
    return session.queue[0];
  }
  return null;
}

function gradeCurrent(g) {
  if (!session || session.busy) return;
  const id = session.queue[0];
  if (!id) return;
  session.busy = true;
  const now = Date.now();
  const rec = schedule(state.cards[id], g, now);
  // keep note fields
  const old = state.cards[id] || {};
  rec.note = old.note; rec.nu = old.nu;
  state.cards[id] = rec;
  state.reviews.push([now, id, g]);
  session.counts[["again", "hard", "good", "easy"][g]]++;
  session.done++;
  saveState();

  const advance = () => {
    session.queue.shift();
    if (rec.st === "learn" && rec.due <= now + 15 * MIN) session.later.push(id);
    session.flipped = false;
    session.busy = false;
    if (!currentCardId()) { finishSession(); } else { renderStudy(); }
  };
  if (g >= 2) { spawnConfetti(); setTimeout(advance, 750); }
  else { setTimeout(advance, 220); }
}

function finishSession() {
  renderSessionDone();
  scheduleSync();
}

// ---------- mascot / confetti / toast ---------------------------

function mascotHTML(color, mood, size) {
  const happy = mood === "happy";
  return `<span class="mascot" style="width:${size}px;height:${size}px;background:${color}">
    <span class="eye l"></span><span class="eye r"></span>
    ${happy ? '<span class="smile-big"></span><span class="shine"></span>' : '<span class="smile-small"></span>'}
  </span>`;
}

function spawnConfetti() {
  const zone = $(".flip-zone");
  const host = $(".study-body");
  if (!zone || !host) return;
  const zr = zone.getBoundingClientRect(), hr = host.getBoundingClientRect();
  const cx = zr.left - hr.left + zr.width / 2, cy = zr.top - hr.top + zr.height / 2;
  const colors = ["#F2A5A0", "#F5D68B", "#A8D8C5", "#A9C6EC"];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("div");
    p.className = "confetti";
    const angle = (i * 63) % 360, rad = angle * Math.PI / 180, dist = 80 + (i % 3) * 22;
    p.style.cssText = `left:${cx + (i % 2 ? 16 : -16)}px;top:${cy + (i % 3) * 6 - 10}px;background:${colors[i % 4]};` +
      `--tx:${Math.round(Math.cos(rad) * dist)}px;--ty:${Math.round(Math.sin(rad) * dist - 50)}px;--rot:${(i * 47) % 360}deg;`;
    host.appendChild(p);
    setTimeout(() => p.remove(), 850);
  }
}

let toastTimer = null;
function toast(msg) {
  document.querySelectorAll(".toast").forEach(t => t.remove());
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg;
  $("#app").appendChild(t);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.remove(), 2600);
}

// ---------- GitHub Gist sync ------------------------------------

let syncing = false, syncTimer = null;

async function ghApi(method, path, body) {
  const res = await fetch("https://api.github.com" + path, {
    method,
    headers: {
      "Authorization": "Bearer " + device.token,
      "Accept": "application/vnd.github+json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const t = res.status === 401 ? "bad token" : res.status === 404 ? "not found" : "HTTP " + res.status;
    throw new Error(t);
  }
  return res.json();
}

function exportState() {
  return { version: 1, exported: Date.now(), settings: state.settings, cards: state.cards, reviews: state.reviews };
}

function mergeRemote(remote) {
  if (!remote || typeof remote !== "object") return;
  if (remote.settings && (remote.settings.su || 0) > (state.settings.su || 0)) {
    state.settings = { ...state.settings, ...remote.settings };
  }
  for (const [id, rc] of Object.entries(remote.cards || {})) {
    const lc = state.cards[id];
    if (!lc) { state.cards[id] = rc; continue; }
    const sched = (rc.u || 0) > (lc.u || 0) ? rc : lc;
    const noter = (rc.nu || 0) > (lc.nu || 0) ? rc : lc;
    state.cards[id] = { ...sched, note: noter.note, nu: noter.nu };
  }
  const key = r => r[0] + "|" + r[1];
  const have = new Set(state.reviews.map(key));
  for (const r of remote.reviews || []) if (Array.isArray(r) && !have.has(key(r))) state.reviews.push(r);
  state.reviews.sort((a, b) => a[0] - b[0]);
}

async function syncNow(silent) {
  if (!device.token) { if (!silent) toast("Add a GitHub token in Settings first"); return; }
  if (syncing) return;
  syncing = true;
  updateSyncUI("Syncing…");
  try {
    let id = device.gistId;
    if (!id) {
      const gists = await ghApi("GET", "/gists?per_page=100");
      const hit = gists.find(g => g.files && g.files[GIST_FILE]);
      if (hit) { id = hit.id; }
      else {
        const created = await ghApi("POST", "/gists", {
          description: "Le Petit Prince — Anki progress sync",
          public: false,
          files: { [GIST_FILE]: { content: JSON.stringify(exportState()) } },
        });
        id = created.id;
      }
      device.gistId = id;
    }
    const g = await ghApi("GET", "/gists/" + id);
    const f = g.files && g.files[GIST_FILE];
    if (f) {
      let raw = f.content;
      if (f.truncated) raw = await (await fetch(f.raw_url)).text();
      try { mergeRemote(JSON.parse(raw)); } catch (e) { /* corrupt remote: overwrite below */ }
    }
    await ghApi("PATCH", "/gists/" + id, { files: { [GIST_FILE]: { content: JSON.stringify(exportState()) } } });
    device.lastSync = Date.now();
    saveDevice(); saveState();
    updateSyncUI();
    if (!silent) toast("Synced ✓");
    if (view.name === "home" || view.name === "stats") render();
  } catch (e) {
    updateSyncUI("Sync failed: " + e.message, true);
    if (!silent) toast("Sync failed — " + e.message);
  } finally {
    syncing = false;
  }
}

function scheduleSync() {
  if (!device.token) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => syncNow(true), 2000);
}

function updateSyncUI(msg, isErr) {
  const el = $("#sync-status");
  if (!el) return;
  if (msg) { el.textContent = msg; el.className = "sync-status" + (isErr ? " err" : ""); }
  else {
    el.textContent = device.lastSync ? "Last synced " + new Date(device.lastSync).toLocaleString() : "Not synced yet";
    el.className = "sync-status ok";
  }
}

// ---------- views ------------------------------------------------

let view = { name: "home" };

function navHTML(active) {
  const icons = {
    home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
    stats: '<svg viewBox="0 0 24 24"><path d="M5 20V12"/><path d="M12 20V4"/><path d="M19 20v-7"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  };
  const tab = (id, label) =>
    `<button data-nav="${id}" class="${active === id ? "active" : ""}">${icons[id]}<span>${label}</span></button>`;
  return `<nav>${tab("home", "Home")}${tab("stats", "Stats")}${tab("settings", "Settings")}</nav>`;
}

function bindNav() {
  document.querySelectorAll("[data-nav]").forEach(b =>
    b.addEventListener("click", () => { view = { name: b.dataset.nav }; render(); }));
}

// --- home ---

function renderHome() {
  const now = Date.now();
  const h = new Date(now).getHours();
  const greet = h < 5 ? "Bonsoir" : h < 12 ? "Bonjour" : h < 18 ? "Bon après-midi" : "Bonsoir";
  const st = streak(now);
  let totalDue = 0, totalNew = 0;

  const rows = LPP_DECKS.map(deck => {
    const [tint, accent] = deckColors(deck);
    const c = deckCounts(deck, now);
    totalDue += c.due; totalNew += c.fresh;
    const parts = [];
    if (c.due) parts.push(c.due + " due");
    if (c.fresh) parts.push(c.fresh + " new");
    if (!parts.length) parts.push(c.learned === c.total ? "all learned ✓" : "done for now ✓");
    return `<button class="deck-row" data-deck="${deck.n}">
      <div class="deck-emoji" style="background:${tint}">${deck.emoji}</div>
      <div class="deck-info">
        <div class="deck-name">${esc(deck.title)}</div>
        <div class="deck-sub">${parts.join(" · ")}</div>
      </div>
      <div class="deck-dot" style="background:${c.due || c.fresh ? accent : "#E8E5F0"}"></div>
    </button>`;
  }).join("");

  const dir = state.settings.dir === "en" ? "en" : "fr";
  $("#app").innerHTML = `
    <div class="screen">
      <div class="topbar">
        <h1 class="greet">${greet}, ${esc(state.settings.name || "ami")}</h1>
        <button class="icon-btn" id="sync-btn" title="Sync">⇅</button>
      </div>
      <div class="topbar" style="margin-top:12px">
        <div class="chip" style="margin-top:0"><span class="flame"><i></i><i></i></span>${st} day streak</div>
        <div class="dir-toggle" title="Study direction">
          <button id="dir-fr" class="${dir === "fr" ? "active" : ""}">FR→EN</button>
          <button id="dir-en" class="${dir === "en" ? "active" : ""}">EN→FR</button>
        </div>
      </div>
      <div class="ver-note">v${APP_VERSION} · updates install in the background — a popup will confirm when a new version is ready</div>
      <div class="section-label">Le Petit Prince · your decks</div>
      ${rows}
      <button class="btn-primary" id="study-all" ${totalDue + totalNew ? "" : "disabled"}>
        ${totalDue + totalNew ? "Study now →" : "Nothing due — reviens demain ✨"}
      </button>
    </div>
    ${navHTML("home")}`;

  bindNav();
  $("#sync-btn").addEventListener("click", () => syncNow(false));
  const setDir = d => {
    state.settings.dir = d; state.settings.su = Date.now();
    saveState(); scheduleSync(); renderHome();
    toast(d === "en" ? "Studying English → French" : "Studying French → English");
  };
  $("#dir-fr").addEventListener("click", () => setDir("fr"));
  $("#dir-en").addEventListener("click", () => setDir("en"));
  $("#study-all").addEventListener("click", () => { if (buildSession(null)) { view = { name: "study" }; renderStudy(); } });
  document.querySelectorAll("[data-deck]").forEach(b =>
    b.addEventListener("click", () => { view = { name: "deck", deckN: +b.dataset.deck }; render(); }));
}

// --- deck detail ---

function renderDeck() {
  const deck = LPP_DECKS.find(d => d.n === view.deckN);
  if (!deck) { view = { name: "home" }; return renderHome(); }
  const [tint, accent, dark] = deckColors(deck);
  const now = Date.now();
  const c = deckCounts(deck, now);

  const rows = deck.cards.map(card => {
    const rec = state.cards[card.id];
    const status = !rec || !rec.st ? "#E8E5F0" : rec.st === "learn" ? "#F5D68B" : rec.due <= now ? "#F2A5A0" : "#A8D8C5";
    const open = view.openCard === card.id;
    const dueTxt = !rec || !rec.st ? "new — not studied yet"
      : rec.due <= now ? "due now"
      : "due " + new Date(rec.due).toLocaleDateString() + (rec.st === "review" ? ` · interval ${rec.iv}d` : " (learning)");
    return `<div class="card-row" data-card="${card.id}">
      <div class="card-row-top">
        <span class="card-status" style="background:${status}"></span>
        <span class="card-fr">${esc(card.fr)}</span>
        ${rec && rec.note ? "💡" : ""}
      </div>
      ${open ? `<div class="card-detail">
        <div class="card-en">${esc(card.en)}</div>
        ${card.ph ? `<div class="card-ph">« ${esc(card.ph)} »</div>` : ""}
        <div class="card-due">${dueTxt}</div>
        <textarea class="note-box" placeholder="Mnemonic / note… (synced across devices)" data-note="${card.id}">${esc(rec && rec.note || "")}</textarea>
        <div class="note-actions"><button class="note-save" data-save="${card.id}">Save note</button></div>
      </div>` : ""}
    </div>`;
  }).join("");

  $("#app").innerHTML = `
    <div class="screen">
      <div class="topbar">
        <button class="icon-btn" id="back">←</button>
        <button class="icon-btn" id="sync-btn" title="Sync">⇅</button>
      </div>
      <div class="deck-head">
        <div class="deck-emoji" style="background:${tint}">${deck.emoji}</div>
        <div>
          <h2>${esc(deck.title)}</h2>
          <div class="deck-sub">${c.total} cards · ${c.due} due · ${c.fresh} new · ${c.learned} learned</div>
        </div>
      </div>
      <button class="btn-primary" id="study-deck" ${c.due + c.fresh ? "" : "disabled"} style="margin:16px 0 18px">
        ${c.due + c.fresh ? "Study this deck →" : "Done for now ✓"}
      </button>
      ${rows}
    </div>
    ${navHTML("home")}`;

  bindNav();
  $("#back").addEventListener("click", () => { view = { name: "home" }; render(); });
  $("#sync-btn").addEventListener("click", () => syncNow(false));
  $("#study-deck").addEventListener("click", () => { if (buildSession(deck.n)) { view = { name: "study", deckN: deck.n }; renderStudy(); } });
  document.querySelectorAll(".card-row").forEach(row => {
    row.addEventListener("click", e => {
      if (e.target.closest(".note-box, .note-save")) return;
      const id = row.dataset.card;
      view.openCard = view.openCard === id ? null : id;
      renderDeck();
    });
  });
  document.querySelectorAll("[data-save]").forEach(b =>
    b.addEventListener("click", () => {
      const id = b.dataset.save;
      saveNote(id, document.querySelector(`[data-note="${id}"]`).value);
      toast("Note saved 💡");
      renderDeck();
    }));
}

function saveNote(id, text) {
  const rec = state.cards[id] || {};
  rec.note = text.trim() || undefined;
  rec.nu = Date.now();
  state.cards[id] = rec;
  saveState();
  scheduleSync();
}

// --- study ---

function renderStudy() {
  const id = currentCardId();
  if (!id) return finishSession();
  const card = getStudyCard(id);
  const rec = state.cards[id];
  const note = (state.cards[baseId(id)] || {}).note;
  const now = Date.now();
  const deckTitle = session.deckN ? card.deck.title : "All decks";
  const stateTxt = (!rec || !rec.st ? "new card" : rec.st === "learn" ? "learning" : "review")
    + (card.rev ? " · EN→FR" : "");
  const remaining = session.queue.length + session.later.length;
  const pct = session.done + remaining ? Math.round(100 * session.done / (session.done + remaining)) : 100;

  const grades = [
    { g: 0, label: "Again", bg: "#FBE4E3", fg: "#B4645F" },
    { g: 1, label: "Hard", bg: "#FBF1DC", fg: "#8C712F" },
    { g: 2, label: "Good", bg: "#E3F2EA", fg: "#4C8067" },
    { g: 3, label: "Easy", bg: "#E4EBF7", fg: "#4A659C" },
  ].map(b => `<button class="grade" data-grade="${b.g}" style="background:${b.bg}">
      <b style="color:${b.fg}">${b.label}</b><i style="color:${b.fg}">${intervalLabel(rec, b.g, now)}</i>
    </button>`).join("");

  $("#app").innerHTML = `
    <div class="screen" style="display:flex;flex-direction:column;padding-bottom:20px">
      <div class="study-top">
        <button class="icon-btn" id="quit">×</button>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="study-hint">${esc(deckTitle)} · ${card.deck.emoji} · ${stateTxt}</div>
      <div class="study-body">
        <div class="flip-zone">
          <div class="flip-inner ${session.flipped ? "flipped" : ""}" id="flipper">
            <div class="face front"><div class="word">${esc(card.front)}</div></div>
            <div class="face back">
              <div class="fr-small">${esc(card.front)}</div>
              <div class="word">${esc(card.back)}</div>
              ${card.ph ? `<div class="phrase">« ${esc(card.ph)} »</div>` : ""}
              ${note ? `<div class="note">💡 ${esc(note)}</div>` : ""}
            </div>
          </div>
        </div>
        <div id="pre-flip" style="${session.flipped ? "display:none" : ""}">
          <div class="tap-hint">Tap the card to flip</div>
        </div>
        <div id="post-flip" style="width:100%;max-width:400px;display:${session.flipped ? "block" : "none"}">
          <div class="grade-prompt">${mascotHTML("#A9C6EC", "neutral", 34)}<span>How well did you know it?</span></div>
          <div class="grades">${grades}</div>
          <div style="text-align:center"><button class="note-link" id="edit-note">${note ? "✎ edit mnemonic" : "＋ add mnemonic"}</button></div>
        </div>
      </div>
    </div>`;

  $("#quit").addEventListener("click", () => { session = null; view = { name: view.deckN ? "deck" : "home", deckN: view.deckN }; render(); });
  $("#flipper").addEventListener("click", () => {
    session.flipped = !session.flipped;
    $("#flipper").classList.toggle("flipped", session.flipped);
    $("#pre-flip").style.display = session.flipped ? "none" : "";
    $("#post-flip").style.display = session.flipped ? "block" : "none";
  });
  document.querySelectorAll("[data-grade]").forEach(b =>
    b.addEventListener("click", () => gradeCurrent(+b.dataset.grade)));
  $("#edit-note").addEventListener("click", () => openNoteModal(baseId(id)));
}

function openNoteModal(id) {
  const card = allCards().get(id);
  const rec = state.cards[id] || {};
  const veil = document.createElement("div");
  veil.className = "modal-veil";
  veil.innerHTML = `<div class="modal">
    <h3>💡 Mnemonic</h3>
    <div class="modal-word">${esc(card.fr)} — ${esc(card.en)}</div>
    <textarea class="note-box" id="modal-note" placeholder="e.g. « avaler » — think 'a-VAL-anche' swallows everything…">${esc(rec.note || "")}</textarea>
    <div class="note-actions">
      <button class="btn-ghost" id="modal-cancel">Cancel</button>
      <button class="note-save" id="modal-save">Save</button>
    </div>
  </div>`;
  $("#app").appendChild(veil);
  const ta = $("#modal-note"); ta.focus();
  veil.addEventListener("click", e => { if (e.target === veil) veil.remove(); });
  $("#modal-cancel").addEventListener("click", () => veil.remove());
  $("#modal-save").addEventListener("click", () => {
    saveNote(id, ta.value);
    veil.remove();
    toast("Mnemonic saved 💡");
    if (view.name === "study" && session) renderStudy();
  });
}

function renderSessionDone() {
  const c = session ? session.counts : { again: 0, hard: 0, good: 0, easy: 0 };
  const total = c.again + c.hard + c.good + c.easy;
  session = null;
  $("#app").innerHTML = `
    <div class="screen" style="display:flex;flex-direction:column">
      <div class="done-wrap">
        ${mascotHTML("#A9C6EC", "happy", 84)}
        <h2>Session terminée !</h2>
        <p>${total} card${total === 1 ? "" : "s"} reviewed · ${c.good + c.easy} knew it · ${c.again} to see again</p>
        <div class="tiles" style="width:100%;max-width:340px">
          <div class="tile"><b style="color:#B4645F">${c.again}</b><span>Again</span></div>
          <div class="tile"><b style="color:#8C712F">${c.hard}</b><span>Hard</span></div>
          <div class="tile"><b style="color:#4C8067">${c.good}</b><span>Good</span></div>
          <div class="tile"><b style="color:#4A659C">${c.easy}</b><span>Easy</span></div>
        </div>
        <button class="btn-primary" id="home-btn" style="max-width:340px">Back home</button>
      </div>
    </div>
    ${navHTML("home")}`;
  bindNav();
  $("#home-btn").addEventListener("click", () => { view = { name: "home" }; render(); });
}

// --- stats ---

function renderStats() {
  const now = Date.now();
  const goal = state.settings.dailyGoal || 20;
  const today = reviewsOn(dayKey(now));
  const pct = Math.min(100, Math.round(100 * today / goal));
  const st = streak(now);
  const ret = retention30(now);
  const learned = Object.entries(state.cards).filter(([id, r]) => r.st === "review" && !isRev(id)).length;
  const totalReviews = state.reviews.length;

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const t = now - i * DAY;
    days.push({ n: reviewsOn(dayKey(t)), label: "SMTWTFS"[new Date(t).getDay()], today: i === 0 });
  }
  const max = Math.max(1, ...days.map(d => d.n));
  const bars = days.map(d =>
    `<div class="bar-col"><div class="bar" style="height:${Math.round(3 + 67 * d.n / max)}px;background:${d.today ? "#F2A5A0" : "#F3E9E8"}"></div><span>${d.label}</span></div>`
  ).join("");

  const ringTitle = today >= goal ? "Goal reached ! 🎉" : today > 0 ? "Almost there!" : "Ready when you are";
  const ringSub = today >= goal ? "Daily goal complete — bravo" : `${goal - today} card${goal - today === 1 ? "" : "s"} left in today's goal`;

  $("#app").innerHTML = `
    <div class="screen">
      <h1 class="greet">Your progress</h1>
      <div class="ring-card">
        <div class="ring" style="background:conic-gradient(#F2A5A0 0% ${pct}%, #F3E9E8 ${pct}% 100%)">
          <div class="ring-hole">${today}/${goal}</div>
        </div>
        <div>
          <div class="ring-title">${ringTitle}</div>
          <div class="ring-sub">${ringSub}</div>
        </div>
      </div>
      <div class="tiles">
        <div class="tile"><b style="color:#F2A5A0">${st}</b><span>Streak</span></div>
        <div class="tile"><b style="color:#A8D8C5">${ret == null ? "—" : ret + "%"}</b><span>Retention</span></div>
        <div class="tile"><b style="color:#A9C6EC">${learned}</b><span>Learned</span></div>
      </div>
      <div class="section-label">Last 7 days</div>
      <div class="bars">${bars}</div>
      <div class="mascot-card">
        ${mascotHTML("#A9C6EC", totalReviews > 0 ? "happy" : "neutral", 40)}
        <div>${totalReviews > 0
          ? `You've reviewed ${totalReviews} card${totalReviews === 1 ? "" : "s"} total — keep going!`
          : "Study your first card and I'll start counting!"}</div>
      </div>
    </div>
    ${navHTML("stats")}`;
  bindNav();
}

// --- settings ---

function renderSettings() {
  const s = state.settings;
  $("#app").innerHTML = `
    <div class="screen">
      <h1 class="greet">Settings</h1>

      <div class="set-card" style="margin-top:16px">
        <h3>Study</h3>
        <div class="set-row"><label>Your name</label><input class="set-input" id="set-name" value="${esc(s.name)}"></div>
        <div class="set-row"><label>Daily goal<span class="hint-sub">reviews per day</span></label><input class="set-input" id="set-goal" type="number" min="1" value="${s.dailyGoal}"></div>
        <div class="set-row"><label>New cards / day<span class="hint-sub">across all decks</span></label><input class="set-input" id="set-new" type="number" min="0" value="${s.newPerDay}"></div>
      </div>

      <div class="set-card">
        <h3>Sync (laptop ↔ phone)</h3>
        <input class="set-input wide" id="set-token" type="password" placeholder="GitHub token (classic, gist scope)" value="${esc(device.token)}">
        <div class="note-actions" style="justify-content:space-between;align-items:center">
          <div id="sync-status" class="sync-status"></div>
          <button class="note-save" id="do-sync">Sync now</button>
        </div>
        <p class="set-note">Progress + mnemonics are stored in a <b>secret GitHub Gist</b>. Create a token at
        <a href="https://github.com/settings/tokens/new?scopes=gist&description=Petit+Prince+Anki" target="_blank" rel="noopener">github.com/settings/tokens</a>
        (classic token, only the <b>gist</b> scope), paste it here on each device, then tap Sync now.
        The app also syncs automatically after each study session.</p>
      </div>

      <div class="set-card">
        <h3>Data</h3>
        <div class="note-actions" style="justify-content:flex-start">
          <button class="btn-ghost" id="do-export">Export backup</button>
          <button class="btn-ghost" id="do-import">Import backup</button>
          <button class="btn-ghost danger" id="do-reset">Reset progress</button>
        </div>
        <input type="file" id="import-file" accept=".json" style="display:none">
        <p class="set-note">Cards live in <b>decks.js</b> — edit that file (with Claude Code) to import new words.
        Progress and notes are separate, so editing decks never loses your reviews.</p>
      </div>
    </div>
    ${navHTML("settings")}`;

  bindNav();
  updateSyncUI(device.token ? undefined : "No token yet", !device.token);

  const saveSettings = () => {
    s.name = $("#set-name").value.trim() || "ami";
    s.dailyGoal = Math.max(1, +$("#set-goal").value || 20);
    s.newPerDay = Math.max(0, +$("#set-new").value || 0);
    s.su = Date.now();
    saveState(); scheduleSync();
  };
  ["set-name", "set-goal", "set-new"].forEach(id => $("#" + id).addEventListener("change", saveSettings));

  $("#set-token").addEventListener("change", () => {
    device.token = $("#set-token").value.trim();
    device.gistId = ""; // re-discover with new token
    saveDevice();
    updateSyncUI(device.token ? "Token saved — tap Sync now" : "No token yet", !device.token);
  });
  $("#do-sync").addEventListener("click", () => syncNow(false));

  $("#do-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(exportState(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "petit-prince-anki-backup-" + dayKey(Date.now()) + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
  });
  $("#do-import").addEventListener("click", () => $("#import-file").click());
  $("#import-file").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try { mergeRemote(JSON.parse(reader.result)); saveState(); toast("Backup merged ✓"); renderSettings(); }
      catch (err) { toast("Import failed — not a valid backup"); }
    };
    reader.readAsText(file);
  });
  $("#do-reset").addEventListener("click", () => {
    if (!confirm("Reset ALL progress and notes on this device? (A synced gist will restore them on next sync — clear the token first if you really want a clean slate.)")) return;
    state = { settings: { ...state.settings, su: Date.now() }, cards: {}, reviews: [] };
    saveState();
    toast("Progress reset");
    renderSettings();
  });
}

// ---------- router / init ----------------------------------------

function render() {
  ({ home: renderHome, deck: renderDeck, study: renderStudy, stats: renderStats, settings: renderSettings }[view.name] || renderHome)();
}

loadAll();
render();
if (device.token) syncNow(true);

// Update flow: sw.js installs the new version in the background (skipWaiting +
// clients.claim), so once the fresh worker reaches "activated" a reload serves
// the new files. Pop a confirmation banner instead of leaving the user guessing.
function showUpdateBanner() {
  if ($("#update-banner")) return;
  const b = document.createElement("button");
  b.id = "update-banner";
  b.className = "update-banner";
  b.textContent = "✨ New version downloaded — tap to reload";
  b.addEventListener("click", () => location.reload());
  $("#app").appendChild(b);
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").then(reg => {
    if (reg.waiting && navigator.serviceWorker.controller) showUpdateBanner();
    reg.addEventListener("updatefound", () => {
      const nw = reg.installing;
      if (!nw || !navigator.serviceWorker.controller) return; // first install, nothing to announce
      nw.addEventListener("statechange", () => {
        if (nw.state === "activated" || nw.state === "installed") showUpdateBanner();
      });
    });
  }).catch(() => {});
}
