import { TextOptions } from './types';

const fontSizeMap = {
  small: 12,
  normal: 16,
  large: 22,
  huge: 30,
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  {
    text,
    x,
    y,
    font,
    fontSize,
    backgroundColor,
    textColor,
    bold,
    italic,
    underline,
  }: TextOptions,
) => {
  // set up typography
  const fontInPx = fontSizeMap[fontSize];
  const fontString = `${italic ? 'italic' : ''} ${
    bold ? 'bold' : ''
  } ${fontInPx}px ${font}`;
  console.log('fontString: ', fontString);
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
