import { Collectible } from "../collectible.class.js";

import { BOTTLE_GROUND } from "../constants.js";

/**
 * A salsa bottle lying on the ground that the character can collect.
 */
export class Bottle extends Collectible {
  width = 60;
  height = 80;

  /**
   * @param {number} x - World x position
   * @param {number} y - World y position
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImagesByPath(BOTTLE_GROUND);
    this.img = this.imagesCacheByPaths[BOTTLE_GROUND[0]];
    this.animateImageMovement(BOTTLE_GROUND, 400);
  }
}
