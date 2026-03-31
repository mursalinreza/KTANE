# 💣 Keep Talking & Nobody Explodes — Web Clone

Browser clone with two play modes: **guided** (HUD, amber ring, expert panel) and **clean** (3D bomb only), plus an **expert manual** page.

---

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` — home with links to each mode.

---

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Home — links to guided play, clean play, and manual |
| `/game` | Guided: defuser HUD, amber highlight ring, expert panel |
| `/game/clean` | 3D bomb only (thin top bar to switch mode); timer still switches to scene 2 |
| `/manual` | Expert manual — full defuse sequence for this build |

---

## Architecture

```
app/
  page.jsx            ← Home (links only)
  game/page.jsx       ← Guided layout (HUD + ring + Overly)
  game/clean/page.jsx ← Clean layout (3D only)
  manual/page.jsx     ← Expert manual
  layout.jsx          ← Fonts, global styles
  globals.css         ← All styles

components/
  BombScene.jsx       ← Spline embed + mouse / keyboard hooks
  GameSession.jsx     ← full vs clean variants
  GameHUD.jsx         ← Timer, strikes, module status
  OverlyPanel.jsx     ← Expert guide panel

lib/
  splineScenes.js     ← Spline `.splinecode` URLs (env overrides)
  gameLogic.js        ← Module rules, serial, batteries
  gameContext.js      ← React context + reducer, timer
```

---

## Spline scenes

Configure in `.env.local`:

- `NEXT_PUBLIC_SPLINE_SCENE_1` — gameplay bomb (default in `lib/splineScenes.js`)
- `NEXT_PUBLIC_SPLINE_SCENE_2` — time-up view when the timer hits 00:00 (not defused)

---

## Spline object → game action (reference)

| Object name | Action |
|-------------|--------|
| Wire holders / yellow wire | Wire cuts (see game logic) |
| `Black Button` | Hold / tap |
| `Red Button` | Red step |
| Key labels in scene | Matching keyboard shortcuts |

---

## 2-player setup

**Defuser** — `/game` or `/game/clean`, interacts with the 3D bomb.

**Expert** — `/manual` on a second screen; reads the sequence and coaches the defuser.

---

## Game rules implemented

Defuse order for this build: Red → Black → J → H → G → yellow wire (see manual). Wrong cuts add strikes; three strikes or time at 00:00 ends the run.

Classic modules (wires, button, keypad) follow KTANE manual logic where wired into state — see `lib/gameLogic.js` and `components/OverlyPanel.jsx`.

---

## Customization

**Bomb timer / max strikes:** `lib/gameLogic.js` (`createInitialGameState`).

**Spline URLs:** `lib/splineScenes.js` or env vars above.
