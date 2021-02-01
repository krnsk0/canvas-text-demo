import { Request, Response } from 'express';
import { createCanvas } from 'canvas';
import { drawText } from '../shared/drawText';
import { TextOptions } from '../shared/types';

export const handleFetch = (req: Request, res: Response) => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  ctx.textDrawingMode = 'path'; // matches frontend a bit better than 'glyph' mode?
  ctx.antialias = 'default'; // seems to match frontend best

  drawText(ctx, req.body as TextOptions);

  const pngStream = canvas.createPNGStream();

  res.setHeader('Content-Type', 'image/png');

  pngStream.pipe(res);
};
