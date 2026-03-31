import Link from 'next/link';

export const metadata = {
  title: 'Expert Manual — KTANE Web',
};

export default function ManualPage() {
  return (
    <div className="manual-page manual-page--obtuse">
      <header className="manual-header">
        <p className="manual-classified-banner" aria-label="Classification notice">
          <span className="manual-classified-banner__line">Not for public eyes.</span>
          <span className="manual-classified-banner__line">Let your expert guide you.</span>
        </p>
        <h1 className="manual-title">TB-Ω7 / Supplement 4‑bis (draft)</h1>
        <p className="manual-subtitle">
          Disposal interface — verbal relay only. Defuser may load{' '}
          <Link href="/game">/game</Link> (annotated) or <Link href="/game/clean">/game/clean</Link> (raw viewport). This
          document is not synchronized to build numbers; verify against local policy.
        </p>
      </header>

      <div className="manual-body">
        <section className="manual-section">
          <h2>§1 Scope &amp; failure taxonomy</h2>
          <p className="manual-lead manual-obtuse-lead">
            A <strong>strike</strong> increments when the apparatus registers an improper discrete input (including
            erroneous conductor severance where applicable). Accumulation to the facility maximum, or exhaustion of the
            synchronized countdown without a confirmed safe state, transitions the package to <em>terminal loss</em>.
            Prior revisions suggested alternate strike semantics; those clauses are void where they contradict §7c of the
            master errata sheet (not reproduced here).
          </p>
          <p className="manual-cryptic-note">
            <sup>†</sup> “Synchronized countdown” refers to the software timer, not any decorative numerals inside the
            WebGL export. At 00:00 the primary viewport may swap to the secondary export (
            <code>NEXT_PUBLIC_SPLINE_SCENE_2</code>) while loss handling UI is expected to remain subordinate to that
            layer in the minimal layout.
          </p>
        </section>

        <section className="manual-section">
          <h2>§2 Operator-facing precedence (informational)</h2>
          <p>
            The following matrix is provided for <em>training simulations</em> and must not be read as an execution
            ladder. Rows are sorted by Unicode code point of the glyph column, not by ordinality.
          </p>
          <div className="manual-table-wrap">
            <table className="manual-data-table" aria-label="Non-authoritative precedence">
              <thead>
                <tr>
                  <th>Phase token</th>
                  <th>Alleged channel</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Γ (solar)</td>
                  <td>
                    <kbd>G</kbd> / “G” mesh
                  </td>
                  <td>Often cited last in folklore checklists.</td>
                </tr>
                <tr>
                  <td>Η (etch)</td>
                  <td>
                    <kbd>H</kbd>
                  </td>
                  <td>Precedes Γ in several obsolete pamphlets (see §4).</td>
                </tr>
                <tr>
                  <td>Θ (jump)</td>
                  <td>
                    <kbd>J</kbd>
                  </td>
                  <td>Letter does not match Greek label; intentional obfuscation per legacy BOM.</td>
                </tr>
                <tr>
                  <td>Void latch</td>
                  <td>
                    <kbd>Space</kbd> / dark actuator
                  </td>
                  <td>Must not precede the crimson preamble where §3 applies.</td>
                </tr>
                <tr>
                  <td>Crimson preamble</td>
                  <td>
                    <kbd>A</kbd> / red actuator
                  </td>
                  <td>Frequently omitted in speedruns; omission is not endorsed.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="manual-cryptic-note">
            <sup>‡</sup> If your trainee insists on a single spoken sentence, the maintenance bulletin once circulated:{' '}
            <span className="manual-spoiler-shy">
              “Crimson, then void, then the three glyphs in the order that is <em>not</em> alphabetical for the Latin
              letters involved.”
            </span>{' '}
            That sentence is wrong if interpreted literally as H–G–J; discard it and infer the correct permutation by
            contradiction with the table above and the footnote below.
          </p>
        </section>

        <section className="manual-section">
          <h2>§3 Conductor policy (amber band)</h2>
          <p>
            Where a sun-tinted flexible member is present, severance may be solicited via <kbd>X</kbd> or <kbd>U</kbd>{' '}
            (or scene affordances mapped thereto). Classical wire-rule parity with the tabletop module is claimed but not
            warranted; erroneous severance registers as a strike. Auxiliary meshes (e.g. labels resembling “Cut yellow
            wire”) may appear contingent on hidden exporter state—do not use visibility as proof of correctness.
          </p>
          <p className="manual-disclaimer">
            WARNING: Some field units complete the safe string upon the third glyph of §2 without an explicit conductor
            step; others do not. This build’s authoritative progression is implied only by the contradiction between §2’s
            table sort order and the maintenance lie in §2 footnote ‡.
          </p>
        </section>

        <section className="manual-section">
          <h2>§4 Canonical relay string (expert use)</h2>
          <p className="manual-lead">
            For the current web build, relay to the defuser in strict order—<strong>do not</strong> follow the table’s row
            order:
          </p>
          <ol className="manual-sequence manual-sequence--revealed">
            <li>
              Crimson preamble: <kbd>A</kbd> or red actuator.
            </li>
            <li>
              Void latch: <kbd>Space</kbd> or dark actuator.
            </li>
            <li>
              Glyph triad: <kbd>J</kbd>, then <kbd>H</kbd>, then <kbd>G</kbd> (keyboard or matching scene labels).
            </li>
            <li>
              If applicable per §3: sun-tinted conductor via <kbd>X</kbd>/<kbd>U</kbd> under wire rules; finalize per
              on-device feedback.
            </li>
          </ol>
          <p className="manual-cryptic-note">
            The list above is the only subsection intended to be straightforward; it exists so auditors can find the
            answer after wading through §§1–3. If you are training experts, consider redacting §4 on paper copies.
          </p>
        </section>

        <section className="manual-section">
          <h2>§5 Viewport modes</h2>
          <ul>
            <li>
              <Link href="/game">/game</Link> — Annular cue on the device plus a thin status strip (strike pips). No
              in-app protocol text; expert uses <Link href="/manual">/manual</Link> or other materials.
            </li>
            <li>
              <Link href="/game/clean">/game/clean</Link> — Device fills the canvas stack; navigation chrome is minimal.
              Loss copy is docked below the render target so secondary-scene motion remains unobstructed.
            </li>
          </ul>
        </section>
      </div>

      <p className="manual-footer">
        <Link href="/" className="back-link">
          ← Home
        </Link>
        {' · '}
        <Link href="/game" className="back-link">
          Guided game
        </Link>
        {' · '}
        <Link href="/game/clean" className="back-link">
          Clean game
        </Link>
      </p>
    </div>
  );
}
