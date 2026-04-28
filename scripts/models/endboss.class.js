import { bossImagesPaths } from "./constants.js";
import { MoveableObject } from "./moveable-object.class.js";

export class Endboss extends MoveableObject {
  y = 60;
  height = 400;
  width = 250;

  constructor() {
    super();
    this.x = 720 * 2 + 380;
    this.loadImages(bossImagesPaths);
    this.img = this.imagesByPaths[bossImagesPaths[0]];
    this.animateImageMovement(bossImagesPaths);
  }
}
