import { chickenImagesPaths } from "./constants.js";
import { MoveableObject } from "./moveable-object.class.js";

export class Chicken extends MoveableObject {
  y = 360;
  height = 60;
  width = 60;
  speed = 0.3 + Math.random() * 0.2;
  showBoundingBox = true;

  constructor() {
    super();
    this.x = 200 + Math.random() * 500;
    this.loadImages(chickenImagesPaths);
    this.img = this.imagesByPaths[chickenImagesPaths[0]];
    this.animateImageMovement(chickenImagesPaths);
    this.animateMovementLeft();
  }
}
