import { TextOptions } from './types';

const sizeMap = {
  small: 12,
  normal: 16,
  large: 22,
  huge: 30,
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  {
    font,
    fontSize,
    backgroundColor,
    textColor,
    bold,
    italic,
    underline,
    alignment,
  }: TextOptions,
) => {
  // set up typography
  const fontInPx = sizeMap[fontSize];
  const fontString = `${italic ? 'italic' : ''} ${
    bold ? 'bold' : ''
  } ${fontInPx}px ${font}`;
  console.log('fontString: ', fontString);
  ctx.textAlign = alignment;
  ctx.font = fontString;

  // draw background
  const { width } = ctx.measureText(text);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(x, y - fontInPx, width, fontInPx);

  // draw text
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, y);

  // draw underline
  if (underline) {
    ctx.fillRect(x, y, width, 2);
  }
};
