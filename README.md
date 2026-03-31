# 💣 Keep Talking & Nobody Explodes — Web Clone

A full browser clone with split-screen layout and Overly-ready right panel.

---

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` — redirects to `/game`

---

## Routes

| Route | Purpose |
|---|---|
| `/game` | Main split-screen game |
| `/manual` | Expert manual (open in new tab for Player 2) |

---

## Architecture

```
app/
  game/page.jsx       ← Main split screen (GameProvider wraps everything)
  manual/page.jsx     ← Expert manual
  layout.jsx          ← Fonts, Spline viewer script
  globals.css         ← All styles

components/
  BombScene.jsx       ← Spline embed + all mouse event hooks
  GameHUD.jsx         ← Left panel: timer, strikes, module status
  OverlyPanel.jsx     ← Right panel: expert guide, fixed layout for Overly

lib/
  gameLogic.js        ← All module rules (wires, button, keypad), serial, batteries
  gameContext.js      ← React context + useReducer game state, timer
```

---

## Spline Object → Game Action Mapping

| Object Name | Action |
|---|---|
| `1st wire holder` | Cut wire slot 1 |
| `2nd wire holder` | Cut wire slot 2 |
| `3rd wire holder` | Cut wire slot 3 |
| `4th wire holder` | Cut wire slot 4 |
| `Black Button` | mousedown = start hold timer (400ms), mouseup = tap or release hold |
| `Screen` | Timer display (visual only, game owns the timer) |
| `J H G F S D K L Z X C V` | Keypad symbol presses (only visible symbols are active) |

---

## 3-Player Setup

**Player 1 — Defuser**
- Watches the LEFT side of the screen
- Clicks wires, button, keypad symbols on the 3D Spline bomb
- Cannot see the HUD solution hints (or you hide the `overly-instruction` divs)

**Player 2 — Expert**
- Opens `/manual` in a separate tab or device
- Listens to Player 1 describe the bomb, reads the correct rules

**Player 3 — Overly Observer**
- Watches the RIGHT side of the screen
- Overly records over the `#overly-panel` div
- Fixed layout ensures Overly's click overlays stay anchored

---

## Overly Integration

The right panel (`#overly-panel`) is designed for Overly recording:

- **Fixed IDs on key sections:**
  - `#overly-edgework` — bomb info (serial, batteries)
  - `#overly-wires` — wires module with solution
  - `#overly-button` — button module with solution
  - `#overly-keypad` — keypad module with solution

- All layout is **deterministic** — positions don't shift based on game state, sections just change their content in place

- The `overly-instruction` boxes with amber borders are the primary recording targets — Overly can point to these for each module walkthrough

**Recommended Overly recording flow:**
1. Record edgework section — "Here's the serial number, here's the battery count"
2. Record wires section — "Read this instruction aloud to the defuser"
3. Record button section — "Check color and label, then follow this instruction"
4. Record keypad section — "Tell defuser to press symbols in this exact order"

---

## Game Rules Implemented

### Wires (3–4 wires)
Full manual logic from Keep Talking — color counting, last digit odd/even from serial, last wire color checks.

### The Button
Full tap vs hold logic — blue+Abort, Detonate with batteries, yellow with batteries, red+Hold rules. Hold release logic by strip color (blue→4, white→1, yellow→5).

### Keypad
4 columns of 6 symbols each. Finds the column containing all 4 visible symbols, outputs correct press order.

---

## Customization

**Change bomb timer:** Edit `timeLeft: 300` in `lib/gameLogic.js` (`createInitialGameState`)

**Change max strikes:** Edit `maxStrikes: 3` in same function

**Add more modules:** Add state to `createInitialGameState`, new cases to `gameReducer`, new section to `OverlyPanel`, new section to manual page

**Hide solution hints from Player 1:** Add CSS to hide `.overly-instruction` from the left panel (they're only in the right panel anyway by design)
