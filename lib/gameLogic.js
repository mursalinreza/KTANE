// ============================================================
// KEEP TALKING AND NOBODY EXPLODES — Game Logic Core
// ============================================================

// --- Serial Number Generator ---
export function generateSerialNumber() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let serial = '';
  for (let i = 0; i < 6; i++) {
    serial += chars[Math.floor(Math.random() * chars.length)];
  }
  return serial;
}

export function serialHasVowel(serial) {
  return /[AEIOU]/i.test(serial);
}

export function serialLastDigitOdd(serial) {
  const digits = serial.match(/\d/g);
  if (!digits) return false;
  return parseInt(digits[digits.length - 1]) % 2 !== 0;
}

export function serialLastDigitEven(serial) {
  return !serialLastDigitOdd(serial);
}

// --- Battery Generator ---
export function generateBatteries() {
  return Math.floor(Math.random() * 5) + 1; // 1–5
}

// ============================================================
// WIRES MODULE
// Rules from the Keep Talking manual (exact logic)
// ============================================================
export const WIRE_COLORS = ['red', 'blue', 'yellow', 'black', 'white'];

export function generateWires() {
  const count = Math.floor(Math.random() * 3) + 3; // 3–5 wires (we have 4 holders, so 3–4)
  const wires = [];
  const usedSlots = [0, 1, 2, 3].slice(0, count === 3 ? 3 : 4);
  for (let i = 0; i < usedSlots.length; i++) {
    wires.push({
      slot: i + 1,
      color: WIRE_COLORS[Math.floor(Math.random() * WIRE_COLORS.length)],
      cut: false,
      present: true,
    });
  }
  return wires;
}

export function solveWires(wires, serial) {
  const present = wires.filter(w => w.present);
  const count = present.length;
  const colors = present.map(w => w.color);

  const countOf = (c) => colors.filter(x => x === c).length;
  const lastOf = (c) => {
    const matches = present.filter(w => w.color === c);
    return matches.length ? matches[matches.length - 1].slot : null;
  };
  const last = present[present.length - 1];
  const odd = serialLastDigitOdd(serial);

  if (count === 3) {
    if (countOf('red') === 0) return 2;
    if (last.color === 'white') return present.length;
    if (countOf('blue') > 1) return lastOf('blue');
    return present.length;
  }

  if (count === 4) {
    if (countOf('red') > 1 && odd) return lastOf('red');
    if (last.color === 'yellow' && countOf('red') === 0) return 1;
    if (countOf('blue') === 1) return 1;
    if (countOf('yellow') > 1) return present.length;
    return 2;
  }

  // fallback
  return 1;
}

export function checkWireCut(wires, slotCut, serial) {
  const correctSlot = solveWires(wires, serial);
  return slotCut === correctSlot;
}

/** First present, uncut yellow wire slot, or null if none. */
export function findUncutYellowWireSlot(wires) {
  const w = wires.find((x) => x.present && x.color === 'yellow' && !x.cut);
  return w ? w.slot : null;
}

// ============================================================
// THE BUTTON MODULE
// ============================================================
export const BUTTON_COLORS = ['blue', 'white', 'red', 'yellow'];
export const BUTTON_LABELS = ['Abort', 'Detonate', 'Hold', 'Press'];
export const STRIP_COLORS = ['blue', 'white', 'yellow', 'red'];

export function generateButton() {
  return {
    color: BUTTON_COLORS[Math.floor(Math.random() * BUTTON_COLORS.length)],
    label: BUTTON_LABELS[Math.floor(Math.random() * BUTTON_LABELS.length)],
    stripColor: STRIP_COLORS[Math.floor(Math.random() * STRIP_COLORS.length)],
  };
}

// Returns 'tap' or 'hold'
export function solveButton(button, batteries) {
  const { color, label } = button;
  if (color === 'blue' && label === 'Abort') return 'hold';
  if (batteries > 1 && label === 'Detonate') return 'tap';
  if (color === 'white') return 'hold';
  if (batteries > 2 && color === 'yellow') return 'tap';
  if (color === 'red' && label === 'Hold') return 'tap';
  return 'hold';
}

// When holding, what timer digit to release on
export function solveButtonRelease(stripColor) {
  if (stripColor === 'blue') return 4;
  if (stripColor === 'white') return 1;
  if (stripColor === 'yellow') return 5;
  return 1; // any other
}

export function checkButtonPress(button, batteries, action, timerDigit) {
  const solution = solveButton(button, batteries);
  if (solution === 'tap') return action === 'tap';
  if (solution === 'hold') {
    if (action === 'tap') return false;
    const releaseDigit = solveButtonRelease(button.stripColor);
    return timerDigit === releaseDigit;
  }
  return false;
}

// ============================================================
// KEYPAD MODULE
// 12 symbols mapped to letters in Spline: J H G F S D K L Z X C V
// 4 columns from manual, each with 6 symbols
// Player must press 4 visible symbols in column order
// ============================================================

// Map Spline object names to symbol display names
export const SYMBOL_MAP = {
  J: 'ϑ',  // Theta-like
  H: 'Ϙ',  // Koppa
  G: 'λ',  // Lambda
  F: '϶',  // Reversed epsilon
  S: 'Ѽ',  // Ot
  D: 'ҋ',  // Variant
  K: 'ψ',  // Psi
  L: 'Ω',  // Omega
  Z: '☆',  // Star
  X: 'ƛ',  // Lambda bar
  C: 'Ϟ',  // Koppa variant
  V: 'Ѧ',  // Little yus
};

// 4 columns, each is an ordered list of symbol keys
export const KEYPAD_COLUMNS = [
  ['G', 'Z', 'J', 'H', 'F', 'V'],   // Column 1
  ['Z', 'S', 'F', 'D', 'L', 'G'],   // Column 2
  ['D', 'K', 'C', 'J', 'X', 'V'],   // Column 3
  ['X', 'H', 'S', 'C', 'L', 'K'],   // Column 4
];

export function generateKeypad() {
  // Find a column that works, pick 4 symbols from it
  const colIndex = Math.floor(Math.random() * 4);
  const col = KEYPAD_COLUMNS[colIndex];
  // Pick 4 random symbols from this column (order preserved)
  const shuffled = [...col].sort(() => Math.random() - 0.5).slice(0, 4);
  return {
    visibleSymbols: shuffled, // what appears on keypad (unordered display)
    correctOrder: col.filter(s => shuffled.includes(s)), // correct press order
    columnIndex: colIndex,
  };
}

export function checkKeypadPress(keypad, pressedSequence) {
  if (pressedSequence.length !== keypad.correctOrder.length) return null; // incomplete
  return pressedSequence.every((s, i) => s === keypad.correctOrder[i]);
}

// ============================================================
// GAME STATE FACTORY
// ============================================================
export function createInitialGameState() {
  const serial = generateSerialNumber();
  const batteries = generateBatteries();
  const wires = generateWires();
  const button = generateButton();
  const keypad = generateKeypad();

  return {
    serial,
    batteries,
    wires,
    button,
    keypad,
    timeLeft: 15, // seconds (sync with Spline / design)
    strikes: 0,
    maxStrikes: 3,
    solved: {
      wires: false,
      button: false,
      keypad: false,
    },
    exploded: false,
    defused: false,
    /**
     * Defuse sequence: 0 = Red, 1 = Black, 2 = J, 3 = H, 4 = G (then defused).
     */
    defuseStep: 0,
    buttonHolding: false,
    buttonHoldStart: null,
    keypadPressed: [],
  };
}

/** Fixed state for SSR + first client paint — avoids Math.random() hydration mismatch. Real game starts after `RESET` in useEffect. */
export function createHydrationSafeInitialState() {
  return {
    serial: 'PLACE0',
    batteries: 1,
    wires: [
      { slot: 1, color: 'red', cut: false, present: true },
      { slot: 2, color: 'blue', cut: false, present: true },
      { slot: 3, color: 'yellow', cut: false, present: true },
    ],
    button: {
      color: 'white',
      label: 'Hold',
      stripColor: 'blue',
    },
    keypad: {
      visibleSymbols: ['J', 'H', 'G', 'F'],
      correctOrder: ['G', 'J', 'H', 'F'],
      columnIndex: 0,
    },
    timeLeft: 15,
    strikes: 0,
    maxStrikes: 3,
    solved: {
      wires: false,
      button: false,
      keypad: false,
    },
    exploded: false,
    defused: false,
    defuseStep: 0,
    buttonHolding: false,
    buttonHoldStart: null,
    keypadPressed: [],
  };
}

export function isGameWon(state) {
  return Object.values(state.solved).every(Boolean);
}

export function isGameLost(state) {
  return state.strikes >= state.maxStrikes || state.timeLeft <= 0;
}
