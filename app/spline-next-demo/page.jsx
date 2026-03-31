import Link from 'next/link';
import Spline from '@splinetool/react-spline/next';
import { SPLINE_SCENE_GAMEPLAY } from '../../lib/splineScenes';

export default async function SplineNextDemoPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <p style={{ margin: 0, padding: '12px 20px', color: '#888', fontSize: 11 }}>
        Same Spline Next setup as <Link href="/" style={{ color: '#fa0' }}>/</Link> — full game:{' '}
        <Link href="/game" style={{ color: '#fa0' }}>
          /game
        </Link>
      </p>
      <Spline scene={SPLINE_SCENE_GAMEPLAY} width={1920} height={1080} />
    </main>
  );
}
