'use client';

import { useEffect, useState, useRef } from 'react';
import { useGame } from '../lib/gameContext';
import { DEFUSE_STEP_SPLINE_NAMES, DEFUSE_STEP_FALLBACK_PCT } from '../lib/defuseStepTargets';
import { projectSplineNameOntoWrapper } from '../lib/projectSplineObject';

const STEP_LABELS = ['RED', 'BLACK', 'J', 'H', 'G'];
const STEP_KEYS = ['A', 'Space', 'J', 'H', 'G'];

export default function DefuseHighlightOverlay({ splineAppRef, wrapperRef, active }) {
  const { state } = useGame();
  const { defuseStep, defused, exploded, timeLeft } = state;
  const [pos, setPos] = useState(null);
  const rafRef = useRef(0);

  const show =
    active &&
    !defused &&
    !exploded &&
    timeLeft > 0 &&
    defuseStep >= 0 &&
    defuseStep < DEFUSE_STEP_SPLINE_NAMES.length;

  useEffect(() => {
    if (!show) {
      setPos(null);
      return;
    }

    const tick = () => {
      const app = splineAppRef.current;
      const wrap = wrapperRef.current;
      const name = DEFUSE_STEP_SPLINE_NAMES[defuseStep];
      let next = null;
      if (app && wrap) {
        next = projectSplineNameOntoWrapper(app, name, wrap);
      }
      if (!next && DEFUSE_STEP_FALLBACK_PCT[defuseStep]) {
        const f = DEFUSE_STEP_FALLBACK_PCT[defuseStep];
        const w = wrap?.clientWidth ?? 1;
        const h = wrap?.clientHeight ?? 1;
        next = { left: (f.left / 100) * w, top: (f.top / 100) * h };
      }
      setPos(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [show, defuseStep, splineAppRef, wrapperRef]);

  if (!show || !pos) return null;

  const label = STEP_LABELS[defuseStep];
  const keyHint = STEP_KEYS[defuseStep];

  return (
    <div className="defuse-highlight-overlay" aria-hidden>
      <div
        className="defuse-highlight-spot"
        style={{ left: pos.left, top: pos.top }}
      >
        <div className="defuse-highlight-ring-wrap">
          <div className="defuse-highlight-ring" />
          <div className="defuse-highlight-core" />
        </div>
        <div className="defuse-highlight-tag">
          <span className="defuse-highlight-tag-label">{label}</span>
          <span className="defuse-highlight-tag-key">{keyHint}</span>
        </div>
      </div>
    </div>
  );
}
