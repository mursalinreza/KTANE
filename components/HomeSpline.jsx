'use client';

import Spline from '@splinetool/react-spline';
import { SPLINE_SCENE_GAMEPLAY } from '../lib/splineScenes';

/** Client-side Spline (same import as Spline docs). Scene URL: `NEXT_PUBLIC_SPLINE_SCENE_1` or default in `lib/splineScenes.js`. */
export default function HomeSpline() {
  return (
    <Spline
      scene={SPLINE_SCENE_GAMEPLAY}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
