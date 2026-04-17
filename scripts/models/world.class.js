import { BackgroundObject } from "./background.object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";

export class World {
  character = new Character();
  cloud = [new Cloud()];
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  backgroundObjects = [
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

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawImage([
      ...this.backgroundObjects,
      ...this.cloud,
      this.character,
      ...this.enemies,
    ]);
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  drawImage(objArray) {
    objArray.forEach((obj) => {
      this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    });
  }
}
