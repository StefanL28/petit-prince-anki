# Le Petit Prince · Cards

A spaced-repetition flashcard app (Anki-style) for the vocabulary of *Le Petit Prince*,
one deck per chapter. Plain HTML/CSS/JS — no build step, no framework.

**Design:** "Soft Cloud" — Quicksand + Nunito, pastel palette, SM-2-style grading
(Again / Hard / Good / Easy), streak, progress ring, confetti, and a round little mascot.

## Using it

- **Laptop:** open the GitHub Pages URL (or run `python3 -m http.server` in this folder and open `http://localhost:8000`).
- **Phone:** open the same URL, then *Add to Home Screen* — it installs like an app and works offline (service worker).

Tap a card to flip it, then grade yourself. Grades feed a simplified SM-2 scheduler:
*Again* repeats within minutes, *Good/Easy* push the card days-to-months into the future.

The decks hold **~1,235 cards** — a near-complete extraction of the book's vocabulary
(function words and inflections excluded), each with a real sentence from the book.

**Reverse mode** (Settings → *Reverse cards EN→FR*): each word gets a second, independently
scheduled card in the English→French direction. A reverse card only enters rotation once its
forward card has been learned (graduated to review), so enabling it never floods the queue.
Reverse cards share the forward card's mnemonic note.

## Syncing laptop ↔ phone

Progress (review schedule, stats) **and your mnemonic notes** are stored in a **secret GitHub Gist**:

1. Create a token at <https://github.com/settings/tokens/new?scopes=gist&description=Petit+Prince+Anki>
   — a **classic** token with only the **gist** scope (fine-grained tokens don't support the Gist API).
2. In the app: **Settings → Sync**, paste the token, tap **Sync now**. Do this once per device.
3. The app creates/finds the gist (`petit-prince-anki-sync.json`) automatically and syncs
   on app open and after every study session. Merging is per-card by timestamp, so studying
   on both devices won't clobber anything.

No token? **Settings → Data → Export/Import backup** moves the same JSON by hand.

## Importing / editing cards (with Claude Code)

All cards live in **`decks.js`**. Ask Claude Code to add chapters' words, more phrases, etc.
Rules:

- Card shape: `{ id, fr, en, ph }` — `fr` front, `en` back, `ph` example phrase from the book.
- **Never change an existing card's `id`** — progress and notes are keyed on it.
  Removing a card is fine (its progress record just goes dormant).
- Mnemonic notes are *not* in this file; they live in the synced state, so re-importing decks
  never loses notes or progress.

After editing app files, bump `CACHE` in `sw.js` (e.g. `ppa-v1` → `ppa-v2`) so phones pick up
the update, then push to GitHub — Pages redeploys automatically.

## Settings

In-app (Settings tab): name, daily review goal, new cards per day.
Defaults are in `app.js` (`state.settings`).

## Files

| file | what |
|---|---|
| `index.html` | shell, fonts, PWA meta |
| `style.css` | Soft Cloud theme |
| `app.js` | scheduler, screens, gist sync, mascot/confetti |
| `decks.js` | **the cards** — edit me |
| `sw.js` | offline cache (bump `CACHE` on deploy) |
| `manifest.webmanifest`, `icon*.png/svg` | PWA install bits |
