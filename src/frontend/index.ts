import { setupCanvas } from './setupCanvas';
import { addPrintMouseCoordsListener } from './addPrintMouseCoordsListener';
import { fetchImage } from './fetchImage';
import { drawText } from '../shared/drawText';
import { TextOptions } from '../shared/types';
import { CanvasRenderingContext2D } from 'canvas';

// TODO: use window.matchMedia() to rescale canvas if monitor changes

// global elements refs
const getEl = <T>(selector: string) => {
  return (document.getElementById(selector) as unknown) as T;
};
const canvas = getEl<HTMLCanvasElement>('canvas');
const serverResponseStatus = getEl<HTMLElement>('server-response-status');
const serverResponseImage = getEl<HTMLImageElement>('server-response-image');
const textInput = getEl<HTMLInputElement>('text-input');
const xInput = getEl<HTMLInputElement>('x-input');
const yInput = getEl<HTMLInputElement>('y-input');
const fontsSelect = getEl<HTMLInputElement>('fonts-select');
const italicInput = getEl<HTMLInputElement>('italic-input');
const boldInput = getEl<HTMLInputElement>('bold-input');
const underlineInput = getEl<HTMLInputElement>('underline-input');
const colorInput = getEl<HTMLInputElement>('color-input');
const backgroundColorInput = getEl<HTMLInputElement>('background-color-input');

// set up canvas
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
setupCanvas(canvas, ctx, 200, 200);
addPrintMouseCoordsListener(canvas);

// initialize global state var
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

// update func called when anything changes
const update = () => {
  drawText(ctx, textState);
  serverResponseStatus.innerText = 'loading...';
  fetchImage(textState)
    .then((res) => res.blob())
    .then((blob) => {
      serverResponseImage.src = URL.createObjectURL(blob);
      serverResponseStatus.innerText = '';
    })
    .catch(() => {
      serverResponseStatus.innerText = 'error!';
    });
};

// event listeners for controls

// initial canvas update call
update();
