'use client';

import { useGame } from '../lib/gameContext';
import ExplosionTryAgainDock from './ExplosionTryAgainDock';

/**
 * Win/loss + reset when GameHUD is not mounted (e.g. /game/clean).
 */
export default function GameEndMinimal() {
  const { state, actions } = useGame();
  const { defused, exploded } = state;

  if (!defused && !exploded) return null;

  if (defused) {
    return (
      <div className="game-end-minimal">
        <div className="game-end-minimal-panel defused">
          <div className="game-end-minimal-icon">💚</div>
          <div className="game-end-minimal-congrats">Congratulations</div>
          <div className="game-end-minimal-title">BOMB DEFUSED</div>
          <button type="button" className="reset-btn" onClick={actions.reset}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return <ExplosionTryAgainDock />;
}
