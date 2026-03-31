'use client';
import dynamic from 'next/dynamic';
import { GameProvider } from '../../lib/gameContext';
import GameHUD from '../../components/GameHUD';
import OverlyPanel from '../../components/OverlyPanel';

const BombScene = dynamic(() => import('../../components/BombScene'), { ssr: false });

export default function GamePage() {
  return (
    <GameProvider>
      <div className="app-root">

        <div className="side defuser-side">
          <div className="side-label defuser-label">
            <span className="label-dot red" />
            DEFUSER VIEW
          </div>
          <div className="bomb-container">
            <BombScene />
          </div>
          <div className="hud-container">
            <GameHUD />
          </div>
          <div className="side-footer">
            <a href="/manual" target="_blank" className="manual-link" rel="noreferrer">
              📖 Open Expert Manual
            </a>
          </div>
        </div>

        <div className="split-divider">
          <div className="divider-line" />
          <div className="divider-icon">💣</div>
          <div className="divider-line" />
        </div>

        <div className="side overly-side">
          <div className="side-label overly-label">
            <span className="label-dot green" />
            OVERLY GUIDE VIEW
          </div>
          <OverlyPanel />
        </div>

      </div>
    </GameProvider>
  );
}
