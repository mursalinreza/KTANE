/**
 * Spline object names to show when the yellow wire is cut (keyboard X / U).
 * Name your hidden mesh in Spline to match one of these, or set NEXT_PUBLIC_SPLINE_YELLOW_CUT_NAME.
 */
export const SPLINE_YELLOW_WIRE_CUT_NAMES = [
  process.env.NEXT_PUBLIC_SPLINE_YELLOW_CUT_NAME,
  'Cut yellow wire',
  'Cut Yellow Wire',
  'yellow wire cut',
  'Yellow Wire Cut',
].filter(Boolean);
