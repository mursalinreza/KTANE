/**
 * Spline scene URLs — use with `import Spline from '@splinetool/react-spline'` in client components.
 * Override in `.env.local`:
 *   NEXT_PUBLIC_SPLINE_SCENE_1=...   gameplay / bomb (home + /game)
 *   NEXT_PUBLIC_SPLINE_SCENE_2=...   time-up when timer hits 00:00 (not defused)
 */

/** Latest prod gameplay export (same as Spline editor “Copy scene URL”). */
export const SPLINE_SCENE_GAMEPLAY_URL =
  'https://prod.spline.design/oJXwgbnEpjzYApSL/scene.splinecode';

export const SPLINE_SCENE_GAMEPLAY =
  process.env.NEXT_PUBLIC_SPLINE_SCENE_1 || SPLINE_SCENE_GAMEPLAY_URL;

/** Shown when countdown hits 00:00 and the bomb is not defused. Replace with your “time’s up” export. */
export const SPLINE_SCENE_TIME_UP =
  process.env.NEXT_PUBLIC_SPLINE_SCENE_2 ||
  'https://prod.spline.design/fcNFFneq28QhJdTD/scene.splinecode';
