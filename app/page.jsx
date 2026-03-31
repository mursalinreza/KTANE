import Link from 'next/link';

export default function Home() {
  return (
    <main className="home-simple">
      <h1 className="home-simple-title">KTANE Web</h1>
      <p className="home-simple-lead">Keep Talking &amp; Nobody Explodes — pick a view, open the manual on a second screen.</p>
      <nav className="home-simple-nav" aria-label="Game modes">
        <Link className="home-simple-btn home-simple-btn--primary" href="/game">
          Play with guidance
        </Link>
        <span className="home-simple-hint">Amber ring on the bomb, minimal HUD (strike pips)</span>
        <Link className="home-simple-btn" href="/game/clean">
          Play without guidance
        </Link>
        <span className="home-simple-hint">3D bomb only — no overlay or side panel</span>
        <Link className="home-simple-btn home-simple-btn--manual" href="/manual">
          Expert manual
        </Link>
        <span className="home-simple-hint">Full defuse sequence for the expert</span>
      </nav>
    </main>
  );
}
