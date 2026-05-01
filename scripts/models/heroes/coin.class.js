import { Collectible } from "./collectible.class.js";
import { COIN_IMAGES } from "./constants.js";

/**
 * A coin that the character can pick up to increase the coin status bar.
 */
export class Coin extends Collectible {
  width = 80;
  height = 80;

  /**
   * @param {number} x - World x position
   * @param {number} y - World y position
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImagesByPath(COIN_IMAGES);
    this.img = this.imagesByPaths[COIN_IMAGES[0]];
    this.animateImageMovement(COIN_IMAGES, 300);
  }
}
