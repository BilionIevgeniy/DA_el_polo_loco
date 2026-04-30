import { Collectible } from "./collectible.class.js";

const BOTTLE_GROUND = [
  "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
  "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
];

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
    this.img = this.imagesByPaths[BOTTLE_GROUND[0]];
    this.animateImageMovement(BOTTLE_GROUND, 400);
  }
}
