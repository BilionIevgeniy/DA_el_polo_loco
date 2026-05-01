import { MoveableObject } from "../moveable-object.class.js";

/**
 * Represents a static parallax background layer tile.
 */
export class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;

  /**
   * @param {string} imagePath - Path to the layer image
   * @param {number} x - Horizontal position
   * @param {number} [height=480] - Layer height
   */
  constructor(imagePath, x, height = 480) {
    super();
    this.height = height;
    this.loadImageByPath(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
