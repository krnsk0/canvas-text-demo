import { setupCanvas } from './setupCanvas';
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
const fontsSelect = getEl<HTMLSelectElement>('fonts-select');
const fontSizeSelect = getEl<HTMLSelectElement>('font-size-select');
const italicInput = getEl<HTMLInputElement>('italic-input');
const boldInput = getEl<HTMLInputElement>('bold-input');
const underlineInput = getEl<HTMLInputElement>('underline-input');
const colorInput = getEl<HTMLInputElement>('color-input');
const backgroundColorInput = getEl<HTMLInputElement>('background-color-input');

// set up canvas
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
setupCanvas(canvas, ctx, 200, 200);

// initialize global state var
const textState: TextOptions = {
  text: 'hello world!',
  x: 20,
  y: 20,
  font: 'Arial',
  fontSize: 'normal',
  backgroundColor: '#00ff33',
  textColor: '#ff0000',
  bold: false,
  italic: false,
  underline: false,
};

// update func called when anything changes
const update = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 200, 200);
  drawText(ctx, textState);
  serverResponseStatus.innerText = 'loading...';
  serverResponseImage.style.display = 'none';
  fetchImage(textState)
    .then((res) => res.blob())
    .then((blob) => {
      serverResponseImage.src = URL.createObjectURL(blob);
      serverResponseImage.style.display = 'inherit';
      serverResponseStatus.innerText = '';
    })
    .catch(() => {
      serverResponseStatus.innerText = 'error!';
    });
};

// set initial values for controls based on state
textInput.value = textState.text;
xInput.value = String(textState.x);
yInput.value = String(textState.y);
fontsSelect.value = textState.font;
fontSizeSelect.value = textState.fontSize;
italicInput.checked = textState.italic;
boldInput.checked = textState.bold;
underlineInput.checked = textState.underline;
colorInput.value = textState.textColor;
backgroundColorInput.value = textState.backgroundColor;

// event listeners for controls
textInput.addEventListener('input', (e) => {
  textState.text = (e.target as HTMLInputElement).value;
  update();
});
xInput.addEventListener('input', (e) => {
  textState.x = +(e.target as HTMLInputElement).value;
  update();
});
yInput.addEventListener('input', (e) => {
  textState.y = +(e.target as HTMLInputElement).value;
  update();
});
fontsSelect.addEventListener('input', (e) => {
  textState.font = (e.target as HTMLInputElement)
    .value as typeof textState.font;
  update();
});
fontSizeSelect.addEventListener('input', (e) => {
  textState.fontSize = (e.target as HTMLInputElement)
    .value as typeof textState.fontSize;
  update();
});
italicInput.addEventListener('input', (e) => {
  textState.italic = !!(e.target as HTMLInputElement).checked;
  update();
});
boldInput.addEventListener('input', (e) => {
  textState.bold = !!(e.target as HTMLInputElement).checked;
  update();
});
underlineInput.addEventListener('input', (e) => {
  textState.underline = !!(e.target as HTMLInputElement).checked;
  update();
});
colorInput.addEventListener('input', (e) => {
  textState.textColor = (e.target as HTMLInputElement).value;
  update();
});
backgroundColorInput.addEventListener('input', (e) => {
  textState.backgroundColor = (e.target as HTMLInputElement).value;
  update();
});

// initialize everything
update();
