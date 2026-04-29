import { chickenImagesPaths } from "./constants.js";
import { MoveableObject } from "./moveable-object.class.js";

export class Chicken extends MoveableObject {
  y = 360;
  height = 60;
  width = 60;
  speed = 0.3 + Math.random() * 0.2;
  showBoundingBox = true;
  hitbox = {
    offsetX: 0,
    offsetY: 5,
    width: 60,
    height: 50,
  };

  constructor() {
    super();
    this.x = 200 + Math.random() * 500;
    this.loadImagesByPath(chickenImagesPaths);
    this.img = this.imagesByPaths[chickenImagesPaths[0]];
    this.animateImageMovement(chickenImagesPaths);
    this.animateMovementLeft();
  }
}
