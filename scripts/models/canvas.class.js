import { BackgroundObject } from "./background.object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { Keyboard } from "./keyboard.class.js";

export class Canvas {
  kamera_x = 0;
  constructor() {
    this.character = new Character(this);
    this.cloud = [];
    this.enemies = [];
    this.backgroundObjects = [];
    for (let i = 0; i < 5; i++) {
      const x = 720 * i;
      const imageNumber = (i % 2) + 1;
      this.backgroundObjects.push(
        new BackgroundObject("assets/img/5_background/layers/air.png", x, 480),
        new BackgroundObject(
          `assets/img/5_background/layers/3_third_layer/${imageNumber}.png`,
          x,
          400,
        ),
        new BackgroundObject(
          `assets/img/5_background/layers/2_second_layer/${imageNumber}.png`,
          x,
          400,
        ),
        new BackgroundObject(
          `assets/img/5_background/layers/1_first_layer/${imageNumber}.png`,
          x,
          400,
        ),
      );
      this.cloud.push(
        new Cloud(50 + Math.random() * 100, 720 * i + Math.random() * 200),
      );
      this.enemies.push(new Chicken());
    }
    this.keyboard = new Keyboard();
  }

  init() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.drawImages([
      ...this.backgroundObjects,
      ...this.cloud,
      this.character,
      ...this.enemies,
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
