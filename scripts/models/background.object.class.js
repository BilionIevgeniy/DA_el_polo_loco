import { MoveableObject } from "./moveable-object.class.js";

export class BackgroundObject extends MoveableObject {
  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 500;
  }

  loadImage(imagePath) {
    this.img = new Image();
    this.img.src = imagePath;
  }
}
