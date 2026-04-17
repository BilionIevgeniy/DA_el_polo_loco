import { BackgroundObject } from "./background.object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";

export class World {
  constructor(canvas) {
    this.character = new Character();
    this.cloud = [new Cloud()];
    this.enemies = [new Chicken(), new Chicken(), new Chicken()];
    this.backgroundObjects = [
      new BackgroundObject(
        "assets/img/5_background/layers/1_first_layer/1.png",
      ),
    ];
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backgroundObjects.forEach((backgroundObject) => {
      this.drawImage(backgroundObject);
    });
    this.cloud.forEach((cloud) => {
      this.drawImage(cloud);
    });
    this.drawImage(this.character);
    this.enemies.forEach((enemy) => {
      this.drawImage(enemy);
    });
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  drawImage(obj) {
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
  }
}
