import { MoveableObject } from "../moveable-object.class.js";
import { SMALL_CHICKEN_WALK, SMALL_CHICKEN_DEAD } from "../constants.js";

/**
 * A smaller, faster chicken enemy — the second enemy type.
 */
export class SmallChicken extends MoveableObject {
  y = 375;
  height = 40;
  width = 40;
  isDying = false;
  isSmall = true;
  deathAnimDone = false;

  hitbox = { offsetX: 3, offsetY: 3, width: 34, height: 34 };

  constructor() {
    super();
    this.x = 400 + Math.random() * 1500;
    this.speed = 0.5 + Math.random() * 0.4;
    this.loadImagesByPath([...SMALL_CHICKEN_WALK, ...SMALL_CHICKEN_DEAD]);
    this.img = this.imagesByPaths[SMALL_CHICKEN_WALK[0]];
    this.startAnimation();
  }

  /** Starts the combined movement + animation loop. */
  startAnimation() {
    this.animInterval = setInterval(() => this.updateFrame(), 1000 / 60);
    this.imgInterval = setInterval(() => this.updateImage(), 120);
  }

  /** Moves left each frame while alive. */
  updateFrame() {
    if (!this.isDying) this.moveLeft();
  }

  /** Switches to the correct animation frame. */
  updateImage() {
    if (this.isDying) {
      this.changeMovementImg(SMALL_CHICKEN_DEAD);
    } else {
      this.changeMovementImg(SMALL_CHICKEN_WALK);
    }
  }

  /** Triggers the death sequence. */
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
