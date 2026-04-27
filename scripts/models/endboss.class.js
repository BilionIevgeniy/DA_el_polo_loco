import { bossImagesPaths } from "./constants.js";
import { MoveableObject } from "./moveable-object.class.js";

export class Endboss extends MoveableObject {
  x = 720;
  y = 160;
  height = 280;
  width = 120;
  currentImage = 0;
  speed = 0.3 + Math.random() * 0.2;

  constructor() {
    super();
    this.x = 200 + Math.random() * 500;
    this.loadImages(bossImagesPaths);
    this.animate();
  }

  animate() {
    this.changeImage();
    setInterval(() => {
      this.changeImage();
    }, 200);
    this.moveLeft();
  }

  changeImage() {
    let i = this.currentImage % bossImagesPaths.length;
    let path = bossImagesPaths[i];
    this.img = this.images[path];
    this.currentImage++;
  }
}
