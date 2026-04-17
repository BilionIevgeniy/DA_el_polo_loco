import { MoveableObject } from "./moveable-object.class.js";

export class BackgroundObject extends MoveableObject {
  width = 720;

  constructor(imagePath, x,height) {
    super();
    this.height = height;
    this.loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }

  loadImage(imagePath) {
    this.img = new Image();
    this.img.src = imagePath;
  }
}
