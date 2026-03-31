'use client';
import { useGame } from '../lib/gameContext';

export default function GameHUD() {
  const { state, actions } = useGame();
  const { strikes, maxStrikes, defused, exploded, defuseStep } = state;

  return (
    <div className="hud">
      <div className="strikes">
        <div className="strikes-label">STRIKES</div>
        <div className="strikes-pips">
          {Array.from({ length: maxStrikes }).map((_, i) => (
            <div key={i} className={`pip ${i < strikes ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      <div className="modules-status hud-defuse-only">
        <div className="modules-label">DEFUSE</div>
        <div className="defuse-keys-hint">
          <div className="defuse-key-row">
            <span className="defuse-key">A</span>
            <span className="defuse-key-label">Red Button</span>
          </div>
          <div className="defuse-key-row">
            <span className="defuse-key">Space</span>
            <span className="defuse-key-label">Black Button</span>
          </div>
          <div className="defuse-key-row">
            <span className="defuse-key">J</span>
            <span className="defuse-key-label">then H, then G</span>
          </div>
        </div>
        <p className="defuse-sequence-hint">
          {defuseStep === 0 && 'Step 1: Red (A), then Black, then J → H → G.'}
          {defuseStep === 1 && 'Step 2: Black (Space).'}
          {defuseStep === 2 && 'Step 3: Press J (key or 3D key).'}
          {defuseStep === 3 && 'Step 4: Press H.'}
          {defuseStep === 4 && 'Step 5: Press G to defuse.'}
        </p>
      </div>

      {defused && (
        <div className="end-state defused">
          <div className="end-icon">💚</div>
          <div className="end-congrats">Congratulations</div>
          <div className="end-title">BOMB DEFUSED</div>
          <div className="end-sub">Red → Black → J → H → G — sequence confirmed.</div>
          <button type="button" className="reset-btn" onClick={actions.reset}>
            PLAY AGAIN
          </button>
        </div>
      )}

      {exploded && (
        <div className="end-state exploded">
          <div className="end-icon">💥</div>
          <div className="end-title">BOOM</div>
          <div className="end-sub">
            The bomb exploded. {strikes >= maxStrikes ? 'Too many strikes.' : 'Time ran out.'}
          </div>
          <button type="button" className="reset-btn" onClick={actions.reset}>
            TRY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}
