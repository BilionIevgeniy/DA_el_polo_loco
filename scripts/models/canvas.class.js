import { level1 } from "../levels.js/level1.js";
import { Character } from "./character.class.js";
import { Keyboard } from "./keyboard.class.js";

export class Canvas {
  kamera_x = 0;
  level = level1;
  keyboard;
  character;

  constructor() {
    this.character = new Character(this);
    this.keyboard = new Keyboard();
    this.renderQueue = [
      ...this.level.backgroundObjects,
      ...this.level.cloud,
      this.character,
      ...this.level.enemies,
    ];
  }

  init() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.draw();
  }

  draw() {
    const { ctx, canvas, kamera_x } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(kamera_x, 0);
    this.renderQueue.forEach((obj) => obj.draw(ctx));
    ctx.restore();
    requestAnimationFrame(() => this.draw());
  }
}
