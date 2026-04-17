import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";

export class World {
  constructor(canvas) {
    this.character = new Character();
    this.enemies = [new Chicken(), new Chicken(), new Chicken()];
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height,
    );
    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(
        enemy.img,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height,
      );
    });
    requestAnimationFrame(() => {
      this.draw();
    });
  }
}
