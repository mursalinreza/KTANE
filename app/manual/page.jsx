import Link from 'next/link';

export const metadata = {
  title: 'Expert Manual — KTANE Web',
};

export default function ManualPage() {
  return (
    <div className="manual-page">
      <header className="manual-header">
        <h1 className="manual-title">Expert manual</h1>
        <p className="manual-subtitle">Defuser uses /game — you use this page</p>
      </header>

      <div className="manual-body">
      <section className="manual-section">
        <p>
          Open this in a separate tab or device while the defuser plays at{' '}
          <Link href="/game">/game</Link>.
        </p>
      </section>
      <section className="manual-section">
        <h2>Wires (3–4 wires)</h2>
        <p>Use the defuser’s wire colors and count. Rules match the classic manual: count by color, use serial last digit odd/even, and “last wire” conditions.</p>
      </section>

      <section className="manual-section">
        <h2>The button</h2>
        <p>Read button color and label, batteries, and FRK indicator if shown. Decide tap vs hold; on hold, release timing depends on the strip color (blue → 4, white → 1, yellow → 5, other → 1 in this clone).</p>
      </section>

      <section className="manual-section">
        <h2>Keypad</h2>
        <p>Four symbols are lit. Find which of the six columns contains all four, then press symbols in the order they appear in that column.</p>
      </section>
      </div>

      <p className="manual-footer">
        <Link href="/game" className="back-link">← Back to game</Link>
      </p>
    </div>
  );
}
