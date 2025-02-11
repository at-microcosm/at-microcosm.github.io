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


const TOTAL_LINES = (HEIGHT + WIDTH) / 3;
const TOTAL_DURATION = 1200;
const SHAPE_POW = 0.5;

let drawnSoFar = 0;
requestAnimationFrame(function drawSome(t) {
  const normalized_progress = Math.min(1, t / TOTAL_DURATION);
  const shaped_progress = Math.pow(normalized_progress, SHAPE_POW);
  const target = TOTAL_LINES * shaped_progress;
  const todo = Math.floor(target - drawnSoFar);
  for (let i = 0; i < todo; i++) {
    drawSomeLines();
  }
  drawnSoFar += todo;
  if (t < TOTAL_DURATION) {
    requestAnimationFrame(drawSome);
  }
});

stars.classList.add('ready');
