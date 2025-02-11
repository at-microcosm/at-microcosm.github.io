"use strict";

const bg = document.querySelector("#bg");
const stars = document.querySelector("#stars");
const rect = bg.getBoundingClientRect();
stars.width = rect.width;
stars.height = rect.height;
const WIDTH = rect.width;
const HEIGHT = rect.height;
const AREA = WIDTH * HEIGHT;
const RATIO = HEIGHT / (HEIGHT + WIDTH);

const ctx = stars.getContext("2d");

const choice = arr => arr[Math.floor(Math.random() * arr.length)];
const lineColor = (options => () => choice(options))([
  'hsl(286, 71%, 19%)',
  'hsl(285, 72%, 18%)',
  'hsl(284, 72%, 18%)',
]);

let frame;

let tb = 0;
let lr = 0;

const drawAcross = () => {
  ctx.beginPath();
  ctx.strokeStyle = lineColor();

  for (let i = 0; i < 2; i++) {
    if (RATIO < Math.random()) {
      // top to bottom
      ctx.moveTo(WIDTH * Math.random(), 0);
      ctx.lineTo(WIDTH * Math.random(), HEIGHT);
      tb += 1;
    } else {
      // left to right
      ctx.moveTo(0, HEIGHT * Math.random());
      ctx.lineTo(WIDTH, HEIGHT * Math.random());
      lr += 1;
    }
  }
  ctx.stroke();
  ctx.closePath();
}

const drawSomeLines = () => {
  drawAcross();
  drawAcross();

  ctx.beginPath();
  ctx.strokeStyle = lineColor();

  // left to top
  ctx.moveTo(0, HEIGHT * Math.random());
  ctx.lineTo(WIDTH * Math.random(), 0);

  // top to right
  ctx.moveTo(WIDTH * Math.random(), 0);
  ctx.lineTo(WIDTH, HEIGHT * Math.random());

  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = lineColor();

  // right to bottom
  ctx.moveTo(WIDTH, HEIGHT * Math.random());
  ctx.lineTo(WIDTH * Math.random(), HEIGHT);

  // bottom to left
  ctx.moveTo(WIDTH * Math.random(), HEIGHT);
  ctx.lineTo(0, HEIGHT * Math.random());

  ctx.stroke();
  ctx.closePath();
}


for (let i = 0; i < ((HEIGHT + WIDTH) / 3); i++) {
  drawSomeLines();
}

// (function drawLine() {
//   drawSomeLines();
//   frame = requestAnimationFrame(drawLine);
// })();

setTimeout(() => stars.classList.add('ready'), 400);

setTimeout(() => cancelAnimationFrame(frame), 4000);

