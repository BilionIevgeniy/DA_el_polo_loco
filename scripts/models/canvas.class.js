import { BackgroundObject } from "./background.object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { Keyboard } from "./keyboard.class.js";

export class Canvas {
  constructor() {
    this.character = new Character();
    this.cloud = [new Cloud(50, 0), new Cloud(100, 250), new Cloud(150, 500)];
    this.enemies = [new Chicken(), new Chicken(), new Chicken()];
    this.backgroundObjects = [
      new BackgroundObject("assets/img/5_background/layers/air.png", 0, 480),
      new BackgroundObject(
        "assets/img/5_background/layers/3_third_layer/1.png",
        0,
        400,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/2_second_layer/1.png",
        0,
        400,
      ),
      new BackgroundObject(
        "assets/img/5_background/layers/1_first_layer/1.png",
        0,
        400,
      ),
    ];
    this.keyboard = new Keyboard();
  }

  init() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.draw();
    this.setKeyboard();
  }

  setKeyboard() {
    this.character.setKeyboard = this.keyboard;
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
    objArray.forEach((obj) => {
      if (obj.flipped) {
        this.flipImage(obj);
      } else {
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
      }
    });
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
