# What is this?

This repo demonstrates isomorphic text rendering using `node-canvas`. The client application has controls allowing the user to paint formatted text to a canvas. Every time the client-side canvas is updated, json describing the text is POSTed to a small express server which calls the same functions the client app uses to wrap `<canvas>`, except the drawing context is a server-side canvas from `node-canvas`. The resulting drawing is streamed back to the client and displayed in an `<image>` element.

# Quickstart

This uses `node-canvas`, which depends on `cairo`. On OSX:

```
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```


To get started:

```
npm i
npm run dev
```

And then open http://localhost:7777.


# Articles
https://medium.com/miro-engineering/how-we-learned-to-draw-text-on-html5-canvas-9f5613e64f5
https://konvajs.org/docs/sandbox/Editable_Text.html
