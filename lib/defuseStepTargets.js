/**
 * Spline outliner names (case-sensitive, must match exactly).
 * Step 0 — confirmed: object name `Red Button`, local Position (0, 0.49, 0), Scale (1,1,1), Rotation (0,0,0).
 * The highlight overlay does not use these numbers directly: at runtime we use the object’s world position
 * and the active camera (`lib/projectSplineObject.js`) so the ring tracks the mesh as the camera moves.
 */
export const DEFUSE_STEP_SPLINE_NAMES = [
  'Red Button',
  'Black Button',
  'J',
  'H',
  'G',
];

/** Fallback positions (% of bomb viewport) if 3D projection fails. Tune for your layout. */
export const DEFUSE_STEP_FALLBACK_PCT = [
  { left: 42, top: 48 },
  { left: 58, top: 48 },
  { left: 44, top: 72 },
  { left: 50, top: 72 },
  { left: 56, top: 72 },
];
