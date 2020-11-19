import React, { useRef, useEffect } from "react";

const LINES = 12;
const LENGTH = window.innerWidth / (LINES + 1);
const VERTICAL_LINES = Math.floor(window.innerHeight / LENGTH);
const TOTAL_POINTS = LENGTH * VERTICAL_LINES;
const DEGREES = (TOTAL_POINTS / 720); // i have no idea why this is 720, just looks cooler
const SECONDS_PER_ROTATION = 12;
const FPS = 60; // have to just assume 60 fsp
const UNIT_PER_FRAME = (360 / FPS) / SECONDS_PER_ROTATION;
const LENGTH_OFFSET = 0;
const STROKE = 4;
let j = 0;

function rgb(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}

function drawLine(ctx, y, x, length, degree) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  // https://stackoverflow.com/questions/17125632/html5-canvas-rotate-object-without-moving-coordinates
  ctx.rotate(degree * Math.PI/180);
  ctx.rect(-(STROKE / 2), -(length / 2), STROKE, length - LENGTH_OFFSET);
  ctx.fillStyle = rgb(40, 40, 40);
  ctx.fill();
  ctx.restore();
}

// function init() {
//   ctx.canvas.width  = window.innerWidth;
//   ctx.canvas.height = window.innerHeight;
//   window.requestAnimationFrame(draw);
// }

function draw(ctx) {
  j += UNIT_PER_FRAME;

  let i = 0;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = rgb(255, 255, 255);
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (let r = 0; r <= VERTICAL_LINES + 1; r++) {
    for (let c = 0; c <= LINES + 1; c++) {
      i++;
      drawLine(ctx, r * LENGTH, c * LENGTH, LENGTH, i * DEGREES + j);
    }
  }
  window.requestAnimationFrame(() => draw(ctx));
}

const Canvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    window.requestAnimationFrame(() => draw(ctx));
  }, []);

  return <canvas ref={ref} id="main" />;
};
export default Canvas;
