import { MoveableObject } from "../moveable-object.class.js";
import { CHICKEN_WALK, CHICKEN_DEAD } from "../constants.js";

/**
 * A normal-sized chicken enemy that walks left and can be killed by a jump or bottle.
 */
export class Chicken extends MoveableObject {
  y = 360;
  height = 60;
  width = 60;
  isDying = false;
  deathAnimDone = false;

  hitbox = { offsetX: 5, offsetY: 5, width: 50, height: 50 };

  constructor() {
    super();
    this.x = 200 + Math.random() * 1500;
    this.speed = 0.3 + Math.random() * 0.3;
    this.loadImagesByPath([...CHICKEN_WALK, ...CHICKEN_DEAD]);
    this.img = this.imagesCacheByPaths[CHICKEN_WALK[0]];
    this.startAnimation();
  }

  /** Starts the combined movement + animation loop. */
  startAnimation() {
    this.animInterval = setInterval(() => this.updateFrame(), 1000 / 60);
    this.imgInterval = setInterval(() => this.updateImage(), 150);
  }

  /** Moves left each frame while alive. */
  updateFrame() {
    if (!this.isDying) this.moveLeft();
  }

  /** Switches to the correct animation frame. */
  updateImage() {
    if (this.isDying) {
      this.changeMovementImg(CHICKEN_DEAD);
    } else {
      this.changeMovementImg(CHICKEN_WALK);
    }
  }

  /** Triggers the death sequence and cleans up movement after a delay. */
  die() {
    if (this.isDying) return;
    this.isDying = true;
    this.energy = 0;
    setTimeout(() => {
      this.deathAnimDone = true;
      clearInterval(this.animInterval);
      clearInterval(this.imgInterval);
    }, 600);
  }
}
