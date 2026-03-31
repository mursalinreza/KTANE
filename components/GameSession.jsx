'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { GameProvider } from '../lib/gameContext';
import GameHUD from './GameHUD';
import GameEndMinimal from './GameEndMinimal';
import ExplosionTryAgainDock from './ExplosionTryAgainDock';

const BombScene = dynamic(() => import('./BombScene'), { ssr: false });

/**
 * @param {{ variant: 'full' | 'clean' }} props
 */
export default function GameSession({ variant }) {
  return (
    <GameProvider>
      {variant === 'full' && <FullLayout />}
      {variant === 'clean' && <CleanLayout />}
    </GameProvider>
  );
}

function FullLayout() {
  return (
    <div className="app-root app-root--guided-solo">
      <div className="side defuser-side defuser-side--guided-solo">
        <div className="guided-scene-stack">
          <div className="bomb-container guided-scene-viewport">
            <BombScene showHighlightOverlay />
          </div>
          <ExplosionTryAgainDock />
        </div>
        <div className="hud-container">
          <GameHUD />
        </div>
      </div>
    </div>
  );
}

function CleanLayout() {
  return (
    <div className="game-clean-root">
      <header className="game-clean-bar">
        <Link href="/" className="game-clean-back">
          ← Home
        </Link>
        <Link href="/game" className="game-clean-link">
          Switch to guided view
        </Link>
        <Link href="/manual" target="_blank" className="game-clean-link" rel="noreferrer">
          Manual
        </Link>
      </header>
      <div className="game-defuser-only-root">
        <div className="game-defuser-only-scene">
          <div className="game-defuser-only-viewport">
            <BombScene showHighlightOverlay={false} />
          </div>
          <GameEndMinimal />
        </div>
      </div>
    </div>
  );
}
