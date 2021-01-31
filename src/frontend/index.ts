import { setupCanvas } from './setupCanvas';
import { drawText } from '../shared/drawText';
import { addPrintMouseCoordsListener } from './addPrintMouseCoordsListener';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// TODO: use window.matchMedia() to rescale canvas if monitor changes

setupCanvas(canvas, ctx, 200, 200);
addPrintMouseCoordsListener(canvas);

drawText(ctx, 30, 30, 'hello world', {
  font: 'Arial',
  fontSize: 'large',
  backgroundColor: 'limegreen',
  textColor: 'red',
  bold: true,
  italic: false,
  underline: true,
  alignment: 'left',
});
