export class Level {
  level_end_x = 720 * 3;
  constructor(enemies, cloud, backgroundObjects) {
    this.enemies = enemies;
    this.cloud = cloud;
    this.backgroundObjects = backgroundObjects;
  }
}
