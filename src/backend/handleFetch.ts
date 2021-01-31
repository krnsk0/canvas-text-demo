import { Request, Response } from 'express';
import { createCanvas } from 'canvas';
import { drawText } from '../shared/drawText';
import { TextOptions } from '../shared/types';
import { writeFileSync } from 'fs';

export const handleFetch = (req: Request, res: Response) => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  drawText(ctx, req.body as TextOptions);

  const buffer = canvas.toBuffer('image/png');
  writeFileSync('./test.png', buffer);

  console.log(req.body);
  res.sendStatus(200);
};
