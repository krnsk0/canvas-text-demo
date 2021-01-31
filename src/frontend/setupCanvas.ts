/**
 * Scales canvas and context to the device's
 * DPR, ensuring nothing appears blurry
 */
export const setupCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
): void => {
  // default to 1 if absent
  const dpr = window.devicePixelRatio || 1;

  // scale canvas to match DPR
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // scale the ctx
  ctx.scale(dpr, dpr);
};
