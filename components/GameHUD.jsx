'use client';
import { useGame } from '../lib/gameContext';

export default function GameHUD() {
  const { state, actions } = useGame();
  const { strikes, maxStrikes, defused } = state;

  return (
    <div className="hud hud--defuser-minimal">
      <div className="strikes strikes--icon-only" aria-label={`Strikes: ${strikes} of ${maxStrikes}`}>
        <div className="strikes-pips">
          {Array.from({ length: maxStrikes }).map((_, i) => (
            <div key={i} className={`pip ${i < strikes ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      {defused && (
        <div className="end-state end-state--over-scene defused">
          <div className="end-icon">💚</div>
          <div className="end-congrats">Congratulations</div>
          <div className="end-title">BOMB DEFUSED</div>
          <div className="end-sub">Red → Black → J → H → G — sequence confirmed.</div>
          <button type="button" className="reset-btn" onClick={actions.reset}>
            PLAY AGAIN
          </button>
        </div>
      )}

    </div>
  );
}
