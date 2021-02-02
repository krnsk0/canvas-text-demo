import { Request, Response } from 'express';
import { createCanvas } from 'canvas';
import { TextOptions } from '../shared/types';
import puppeteer from 'puppeteer';

// FIXME: keeping a module-scoped variable to hold the puppeteer
//        page instance is **great** for local performance
//        but almost certain to be buggy-as-hell.
let page: puppeteer.Page;
const getPage = async () => {
  if (page) return
  const browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('about:blank');
  // FIXME: hard-coded server location for injected drawText function
  await page.addScriptTag({ url: 'http://localhost:7777/shared-bundle.js' });
}

export const handleFetch = async (req: Request, res: Response) => {
  await getPage();
  const imageData = await page.evaluate((textOptions: TextOptions) => {
    const canvas = document.createElement('canvas');
    const devicePixelRatio = textOptions.devicePixelRatio;
    const size = 200 * devicePixelRatio;
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.scale(devicePixelRatio, devicePixelRatio);
    // FIXME: Not sure how to best go about getting type checking for scripts
    //        loaded by puppeteer that infect the global object.
    (window as any).drawText(ctx, textOptions);
    const dataURL = canvas.toDataURL();
    const base64String = dataURL.substr(dataURL.indexOf(',') + 1);
    return base64String;
  }, req.body as TextOptions);

  res.setHeader('Content-Type', 'image/png');

  res.send(Buffer.from(imageData as string, 'base64'));
};
