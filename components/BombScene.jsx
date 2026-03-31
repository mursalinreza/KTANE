'use client';
import { useRef, useCallback, useMemo, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { useGame } from '../lib/gameContext';
import { SPLINE_SCENE_GAMEPLAY, SPLINE_SCENE_TIME_UP } from '../lib/splineScenes';
import { SPLINE_YELLOW_WIRE_CUT_NAMES } from '../lib/splineWireVisuals';
import DefuseHighlightOverlay from './DefuseHighlightOverlay';

function syncYellowWireCutVisuals(app, yellowWireIsCut) {
  if (!app?.findObjectByName) return;
  const seen = new Set();
  for (const name of SPLINE_YELLOW_WIRE_CUT_NAMES) {
    if (!name || seen.has(name)) continue;
    seen.add(name);
    const obj = app.findObjectByName(name);
    if (!obj) continue;
    if (yellowWireIsCut) {
      obj.show?.();
    } else {
      obj.hide?.();
    }
  }
}

function inputEnabledForState(s) {
  const timeUp = !s.defused && s.timeLeft <= 0;
  return !s.defused && !s.exploded && !timeUp;
}

export default function BombScene({ showHighlightOverlay = true } = {}) {
  const { state, actions } = useGame();
  const wrapperRef = useRef(null);
  const splineAppRef = useRef(null);
  const removeSplineListenersRef = useRef(null);
  const stateRef = useRef(state);
  const actionsRef = useRef(actions);

  stateRef.current = state;
  actionsRef.current = actions;

  const showTimeUpScene = !state.defused && state.timeLeft <= 0;
  const sceneUrl = showTimeUpScene ? SPLINE_SCENE_TIME_UP : SPLINE_SCENE_GAMEPLAY;

  const yellowWireCut = state.wires.some((w) => w.color === 'yellow' && w.cut);

  useEffect(() => {
    const app = splineAppRef.current;
    if (!app || showTimeUpScene) return;
    syncYellowWireCutVisuals(app, yellowWireCut);
  }, [yellowWireCut, showTimeUpScene, sceneUrl]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.repeat) return;
      const s = stateRef.current;
      if (!inputEnabledForState(s)) return;
      const a = actionsRef.current;
      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        a.defuseRed();
      } else if (e.key === ' ') {
        e.preventDefault();
        a.defuseBlack();
      } else if (e.key === 'x' || e.key === 'X' || e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        a.cutYellowWire();
      } else if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        a.defuseSequenceKey('J');
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        a.defuseSequenceKey('H');
      } else if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        a.defuseSequenceKey('G');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const onSplineLoad = useCallback((app) => {
    splineAppRef.current = app;

    if (removeSplineListenersRef.current) {
      removeSplineListenersRef.current();
      removeSplineListenersRef.current = null;
    }

    const onMouseDown = (e) => {
      const s = stateRef.current;
      if (!inputEnabledForState(s)) return;
      const name = e.target?.name;
      if (!name) return;

      const a = actionsRef.current;
      if (name === 'Red Button') {
        a.defuseRed();
      } else if (name === 'Black Button') {
        a.defuseBlack();
      } else {
        const k = typeof name === 'string' ? name.toUpperCase() : '';
        if (k === 'J' || k === 'H' || k === 'G') {
          a.defuseSequenceKey(k);
        }
      }
    };

    app.addEventListener('mouseDown', onMouseDown);

    syncYellowWireCutVisuals(
      app,
      stateRef.current.wires.some((w) => w.color === 'yellow' && w.cut)
    );

    removeSplineListenersRef.current = () => {
      app.removeEventListener('mouseDown', onMouseDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (removeSplineListenersRef.current) {
        removeSplineListenersRef.current();
        removeSplineListenersRef.current = null;
      }
      splineAppRef.current = null;
    };
  }, []);

  const splineProps = useMemo(
    () => ({
      scene: sceneUrl,
      style: { width: '100%', height: '100%' },
      onLoad: onSplineLoad,
      /* Avoid blank canvas until first input (common with flex + ResizeObserver). */
      renderOnDemand: false,
    }),
    [sceneUrl, onSplineLoad]
  );

  const wrapperClass = showTimeUpScene
    ? 'bomb-scene-wrapper bomb-scene-wrapper--time-up'
    : 'bomb-scene-wrapper';

  return (
    <div ref={wrapperRef} className={wrapperClass}>
      <Spline key={sceneUrl} {...splineProps} />
      {showHighlightOverlay && (
        <DefuseHighlightOverlay
          splineAppRef={splineAppRef}
          wrapperRef={wrapperRef}
          active={!showTimeUpScene}
        />
      )}
    </div>
  );
}
