'use client';
import { useGame } from '../lib/gameContext';

export default function OverlyPanel() {
  const { state } = useGame();
  const { strikes, maxStrikes, defuseStep, defused } = state;

  return (
    <div className="overly-panel" id="overly-panel">
      <div className="overly-header">
        <div className="overly-logo">
          <span className="overly-logo-dot" />
          OVERLY GUIDE
        </div>
      </div>

      <div className="overly-sections">
        <section className="overly-section">
          <div className="overly-section-title">🎯 DEFUSE PROTOCOL</div>
          <div className="overly-instruction">
            <div className="overly-inst-label">SEQUENCE (IN ORDER):</div>
            <ol className="overly-defuse-list">
              <li>
                <strong>Red</strong> — key <kbd>A</kbd> or click <strong>Red Button</strong> in the 3D view
              </li>
              <li>
                <strong>Black</strong> — key <kbd>Space</kbd> or click <strong>Black Button</strong>
              </li>
              <li>
                <strong>J</strong>, then <strong>H</strong>, then <strong>G</strong> — keys or matching 3D keys (in that order)
              </li>
            </ol>
            {!defused && (
              <p className="overly-inst-text">
                {defuseStep === 0 && 'Expert: defuser presses Red (A) first.'}
                {defuseStep === 1 && 'Red done. Tell defuser: Black (Space) next.'}
                {defuseStep === 2 && 'Black done. Tell defuser: J next.'}
                {defuseStep === 3 && 'J done. Tell defuser: H next.'}
                {defuseStep === 4 && 'H done. Tell defuser: G last — completes defusal.'}
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="overly-strikes">
        {Array.from({ length: maxStrikes }).map((_, i) => (
          <div key={i} className={`overly-strike-pip ${i < strikes ? 'hit' : ''}`}>
            {i < strikes ? '✗' : '○'}
          </div>
        ))}
        <span className="overly-strikes-label">STRIKES</span>
      </div>
    </div>
  );
}
