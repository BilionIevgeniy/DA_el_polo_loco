import { level1 } from "../levels.js/level1.js";
import { Character } from "./character.class.js";
import { Keyboard } from "./keyboard.class.js";

export class Canvas {
  kamera_x = 0;
  level = level1;
  constructor() {
    this.character = new Character(this);
    this.keyboard = new Keyboard();
  }

  init() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.drawImages([
      ...this.level.backgroundObjects,
      ...this.level.cloud,
      this.character,
      ...this.level.enemies,
    ]);
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  drawImages(objArray) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.kamera_x, 0);
    objArray.forEach((obj) => {
      if (obj.flipped) {
        this.flipImage(obj);
      } else {
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
      }
    });
    this.ctx.translate(-this.kamera_x, 0);
  }

  flipImage(obj) {
    // Save the current context state
    this.ctx.save();
    this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(
      obj.img,
      -obj.width / 2,
      -obj.height / 2,
      obj.width,
      obj.height,
    );
    // Restore the context to its original state
    this.ctx.restore();
  }
}
