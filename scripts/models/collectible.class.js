import { MoveableObject } from "./moveable-object.class.js";

/**
 * Base class for all collectible items (coins, bottles).
 */
export class Collectible extends MoveableObject {
  collected = false;

  hitbox = { offsetX: 10, offsetY: 10, width: 50, height: 50 };

  /**
   * Marks the item as collected so it is removed from the level.
   */
  collect() {
    this.collected = true;
  }
}
