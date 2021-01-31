export const addPrintMouseCoordsListener = (canvas: HTMLCanvasElement) => {
  canvas.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    console.log({ x, y });
  });
};
