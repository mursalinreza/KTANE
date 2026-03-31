'use client';

import { useGame } from '../lib/gameContext';

/** BOOM + TRY AGAIN in a card docked below the 3D viewport (explosion stays visible above). */
export default function ExplosionTryAgainDock() {
  const { state, actions } = useGame();
  const { strikes, maxStrikes, exploded } = state;

  if (!exploded) return null;

  return (
    <div className="explosion-dock-outer" role="status" aria-live="polite">
      <div className="explosion-dock-card">
        <div className="explosion-dock-card-main">
          <div className="explosion-dock-card-icon">💥</div>
          <div className="explosion-dock-card-body">
            <div className="explosion-dock-card-title">BOOM</div>
            <div className="explosion-dock-card-sub">
              {strikes >= maxStrikes ? 'Too many strikes.' : 'Time ran out.'}
            </div>
          </div>
          <button type="button" className="explosion-dock-card-btn" onClick={actions.reset}>
            TRY AGAIN
          </button>
        </div>
        <div className="explosion-dock-overly-pitch">
          <img
            src="/overly-logo.png"
            alt="Overly"
            width={237}
            height={81}
            className="explosion-dock-overly-logo"
            decoding="async"
          />
          <p className="explosion-dock-overly-text">
            The bomb exploded — but you can stop it with <strong>Overly</strong>. Use Overly before time runs out.
          </p>
        </div>
      </div>
    </div>
  );
}
