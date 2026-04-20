import { MoveableObject } from "./moveable-object.class.js";

export class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;
  constructor(imagePath, x, height) {
    super();
    height && (this.height = height);
    this.loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }

  loadImage(imagePath) {
    this.img = new Image();
    this.img.src = imagePath;
  }
}
