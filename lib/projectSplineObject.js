import * as THREE from 'three';

function getThreeCamera(camEntity) {
  if (!camEntity) return null;
  const p = camEntity.perspCamera;
  const o = camEntity.orthoCamera;
  if (p?.isPerspectiveCamera) return p;
  if (o?.isOrthographicCamera) return o;
  return null;
}

/**
 * Projects a named scene object to coordinates relative to wrapperEl (pixels).
 * Uses Spline Application internals (_scene) — may need updates if @splinetool/runtime changes.
 */
export function projectSplineNameOntoWrapper(app, objectName, wrapperEl) {
  if (!app || !objectName || !wrapperEl || !app.canvas) return null;

  const scene = app._scene;
  if (!scene?.getObjectByName) return null;

  const obj = scene.getObjectByName(objectName);
  if (!obj || obj.visible === false) return null;

  const camEntity = scene.activeCamera;
  const camera = getThreeCamera(camEntity);
  if (!camera?.isCamera) return null;

  scene.updateMatrixWorld?.(true);
  camera.updateProjectionMatrix?.();
  camera.updateMatrixWorld?.(true);

  const v = new THREE.Vector3();
  if (typeof obj.getWorldPosition !== 'function') return null;
  obj.getWorldPosition(v);
  v.project(camera);

  if (v.z < -1 || v.z > 1) return null;

  const wrap = wrapperEl.getBoundingClientRect();
  const crect = app.canvas.getBoundingClientRect();
  const xCanvas = (v.x * 0.5 + 0.5) * crect.width;
  const yCanvas = (-v.y * 0.5 + 0.5) * crect.height;
  const left = crect.left - wrap.left + xCanvas;
  const top = crect.top - wrap.top + yCanvas;

  if (left < -80 || top < -80 || left > wrap.width + 80 || top > wrap.height + 80) return null;

  return { left, top };
}
