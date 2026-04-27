import { bossImagesPaths } from "./constants.js";
import { MoveableObject } from "./moveable-object.class.js";

export class Endboss extends MoveableObject {
  x = 700;
  y = 160;
  height = 280;
  width = 120;
  currentImage = 0;
  speed = 0.3 + Math.random() * 0.2;

  constructor() {
    super();
    this.loadImages(bossImagesPaths);
    this.img = this.images[bossImagesPaths[0]];
    this.animate(bossImagesPaths);
  }
}
