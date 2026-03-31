/**
 * Spline `.splinecode` URLs for the bomb WebGL views.
 * Override in `.env.local`:
 *   NEXT_PUBLIC_SPLINE_SCENE_1 — gameplay bomb (all /game routes)
 *   NEXT_PUBLIC_SPLINE_SCENE_2 — time-up when timer hits 00:00 (not defused)
 *
 * Use the full URL ending in `/scene.splinecode` from Spline → Export.
 */

/** Gameplay bomb — prod export (Spline → Export → Copy scene URL). */
export const SPLINE_SCENE_GAMEPLAY_URL =
  'https://prod.spline.design/oJXwgbnEpjzYApSL/scene.splinecode';

function splineSceneFromEnv(key, fallback) {
  const raw = process.env[key];
  if (typeof raw !== 'string') return fallback;
  const trimmed = raw.trim();
  if (!trimmed || !/^https?:\/\//i.test(trimmed)) return fallback;
  return trimmed;
}

export const SPLINE_SCENE_GAMEPLAY = splineSceneFromEnv(
  'NEXT_PUBLIC_SPLINE_SCENE_1',
  SPLINE_SCENE_GAMEPLAY_URL
);

/** Time’s up scene (portrait-friendly export recommended). */
export const SPLINE_SCENE_TIME_UP = splineSceneFromEnv(
  'NEXT_PUBLIC_SPLINE_SCENE_2',
  'https://prod.spline.design/fcNFFneq28QhJdTD/scene.splinecode'
);
