import { setupCanvas } from './setupCanvas';
import { addPrintMouseCoordsListener } from './addPrintMouseCoordsListener';
import { fetchImage } from './fetchImage';
import { drawText } from '../shared/drawText';
import { TextOptions } from '../shared/types';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const serverResponse = document.getElementById(
  'server-response',
) as HTMLElement;

// TODO: use window.matchMedia() to rescale canvas if monitor changes

const textState: TextOptions = {
  text: 'hello world',
  x: 30,
  y: 30,
  font: 'Arial',
  fontSize: 'normal',
  backgroundColor: 'limegreen',
  textColor: 'red',
  bold: true,
  italic: false,
  underline: true,
};

const update = () => {
  drawText(ctx, textState);
  serverResponse.innerText = 'loading...';
  fetchImage(textState)
    .then((res) => {
      serverResponse.innerText = 'loaded';
    })
    .catch(() => {
      serverResponse.innerText = 'error!';
    });
};

setupCanvas(canvas, ctx, 200, 200);
addPrintMouseCoordsListener(canvas);
update();
