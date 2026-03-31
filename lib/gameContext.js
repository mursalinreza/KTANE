'use client';
import { createContext, useContext, useReducer, useEffect, useRef, useCallback, useState } from 'react';
import {
  createInitialGameState,
  createHydrationSafeInitialState,
  checkWireCut,
  checkKeypadPress,
  solveButton,
  solveButtonRelease,
  isGameLost,
} from './gameLogic';

const GameContext = createContext(null);

function gameReducer(state, action) {
  if (state.defused || state.exploded) return state;

  switch (action.type) {
    case 'TICK': {
      const timeLeft = Math.max(0, state.timeLeft - 1);
      return { ...state, timeLeft };
    }

    case 'ADD_STRIKE': {
      const strikes = state.strikes + 1;
      return { ...state, strikes };
    }

    case 'CUT_WIRE': {
      const { slot } = action;
      const wires = state.wires.map(w =>
        w.slot === slot ? { ...w, cut: true } : w
      );
      const correct = checkWireCut(state.wires, slot, state.serial);
      if (correct) {
        const solved = { ...state.solved, wires: true };
        return { ...state, wires, solved };
      }
      return { ...state, wires, strikes: state.strikes + 1 };
    }

    case 'BUTTON_TAP': {
      const solution = solveButton(state.button, state.batteries);
      if (solution === 'tap') {
        return { ...state, solved: { ...state.solved, button: true } };
      }
      return { ...state, strikes: state.strikes + 1 };
    }

    case 'BUTTON_HOLD_START': {
      return { ...state, buttonHolding: true, buttonHoldStart: Date.now() };
    }

    case 'BUTTON_HOLD_RELEASE': {
      const { timerDigit } = action;
      const solution = solveButton(state.button, state.batteries);
      if (solution === 'hold') {
        const releaseDigit = solveButtonRelease(state.button.stripColor);
        if (timerDigit === releaseDigit) {
          return { ...state, buttonHolding: false, solved: { ...state.solved, button: true } };
        }
        return { ...state, buttonHolding: false, strikes: state.strikes + 1 };
      }
      return { ...state, buttonHolding: false, strikes: state.strikes + 1 };
    }

    case 'KEYPAD_PRESS': {
      const { symbol } = action;
      const keypadPressed = [...state.keypadPressed, symbol];
      
      if (keypadPressed.length === state.keypad.correctOrder.length) {
        const correct = checkKeypadPress(state.keypad, keypadPressed);
        if (correct) {
          return { ...state, keypadPressed, solved: { ...state.solved, keypad: true } };
        }
        return { ...state, keypadPressed: [], strikes: state.strikes + 1 };
      }
      
      // Check partial sequence is still valid
      const partialValid = keypadPressed.every(
        (s, i) => s === state.keypad.correctOrder[i]
      );
      if (!partialValid) {
        return { ...state, keypadPressed: [], strikes: state.strikes + 1 };
      }
      
      return { ...state, keypadPressed };
    }

    case 'DEFUSE_RED':
      if (state.defuseStep !== 0) return state;
      return { ...state, defuseStep: 1 };

    case 'DEFUSE_BLACK':
      if (state.defuseStep !== 1) return state;
      return { ...state, defuseStep: 2 };

    case 'DEFUSE_SEQUENCE_KEY': {
      const key = action.key;
      if (key !== 'J' && key !== 'H' && key !== 'G') return state;
      const { defuseStep } = state;
      if (defuseStep === 2 && key === 'J') return { ...state, defuseStep: 3 };
      if (defuseStep === 3 && key === 'H') return { ...state, defuseStep: 4 };
      if (defuseStep === 4 && key === 'G') return { ...state, defused: true, defuseStep: 0 };
      return state;
    }

    case 'SET_DEFUSED': return { ...state, defused: true };
    case 'SET_EXPLODED': return { ...state, exploded: true };
    case 'RESET': return createInitialGameState();

    default: return state;
  }
}

export function GameProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [state, dispatch] = useReducer(gameReducer, null, createHydrationSafeInitialState);
  const timerRef = useRef(null);

  useEffect(() => {
    dispatch({ type: 'RESET' });
    setMounted(true);
  }, []);

  // Lose on strikes / timer only (defuse is Red → Black → J → H → G)
  useEffect(() => {
    if (!mounted) return;
    if (isGameLost(state) && !state.exploded && !state.defused) {
      dispatch({ type: 'SET_EXPLODED' });
    }
  }, [state, mounted]);

  // Timer tick (only after client init — avoids ticking SSR placeholder)
  useEffect(() => {
    if (!mounted || state.defused || state.exploded) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [mounted, state.defused, state.exploded]);

  const actions = {
    cutWire: useCallback((slot) => dispatch({ type: 'CUT_WIRE', slot }), []),
    tapButton: useCallback(() => dispatch({ type: 'BUTTON_TAP' }), []),
    holdButton: useCallback(() => dispatch({ type: 'BUTTON_HOLD_START' }), []),
    releaseButton: useCallback((timerDigit) => dispatch({ type: 'BUTTON_HOLD_RELEASE', timerDigit }), []),
    pressKeypad: useCallback((symbol) => dispatch({ type: 'KEYPAD_PRESS', symbol }), []),
    defuseRed: useCallback(() => dispatch({ type: 'DEFUSE_RED' }), []),
    defuseBlack: useCallback(() => dispatch({ type: 'DEFUSE_BLACK' }), []),
    defuseSequenceKey: useCallback(
      (key) => dispatch({ type: 'DEFUSE_SEQUENCE_KEY', key }),
      []
    ),
    reset: useCallback(() => dispatch({ type: 'RESET' }), []),
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {mounted ? (
        children
      ) : (
        <div
          className="hydration-boot"
          style={{
            width: '100vw',
            height: '100vh',
            background: '#0a0a0a',
          }}
        />
      )}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
