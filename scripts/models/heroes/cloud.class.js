import { MoveableObject } from "../moveable-object.class.js";

/**
 * A slowly drifting cloud in the background.
 */
export class Cloud extends MoveableObject {
  speed = 0.15;
  width = 500;
  height = 300;

  /**
   * @param {number} y - Vertical position
   * @param {number} x - Horizontal start position
   */
  constructor(y, x) {
    super();
    this.loadImageByPath("assets/img/5_background/layers/4_clouds/1.png");
    this.y = y;
    this.x = x;
    this.animateMovementLeft();
  }
}
