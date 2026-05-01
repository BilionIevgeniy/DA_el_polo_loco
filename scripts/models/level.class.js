/**
 * Holds all objects that make up a game level.
 */
export class Level {
  level_end_left_x = -720 * 2;
  level_end_right_x = 720 * 4;

  /**
   * @param {MoveableObject[]} enemies
   * @param {Cloud[]}          cloud
   * @param {BackgroundObject[]} backgroundObjects
   * @param {Coin[]}           coins
   * @param {Bottle[]}         bottles
   */
  constructor(enemies, cloud, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.cloud = cloud;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
