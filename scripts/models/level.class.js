export class Level {
  level_end_left_x = -720 * 2;
  level_end_right_x = 720 * 2;
  constructor(enemies, cloud, backgroundObjects) {
    this.enemies = enemies;
    this.cloud = cloud;
    this.backgroundObjects = backgroundObjects;
  }
}
